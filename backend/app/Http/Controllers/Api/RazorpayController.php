<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Product;
use App\Models\RazorpaySetting;
use App\Support\OrderConfirmationMailer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class RazorpayController extends Controller
{
    public function config(): JsonResponse
    {
        $settings = RazorpaySetting::current();

        return response()->json(['enabled' => filled($settings->key_id) && filled($settings->key_secret)]);
    }

    public function createOrder(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer' => ['required', 'array'],
            'customer.name' => ['required', 'string', 'max:160'],
            'customer.email' => ['required', 'email', 'max:255'],
            'customer.phone' => ['required', 'string', 'max:30'],
            'customer.address' => ['required', 'string', 'max:1000'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_slug' => ['required', 'string', 'max:180'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:20'],
            'items.*.colour' => ['required', 'string', 'max:80'],
            'items.*.size' => ['required', 'string', 'max:20'],
            'shipping_method' => ['required', 'in:Standard delivery,Express delivery'],
            'coupon_code' => ['nullable', 'string', 'max:40'],
            'business_details' => ['nullable', 'array'],
            'business_details.name' => ['required_with:business_details', 'string', 'max:180'],
            'business_details.gstin' => ['required_with:business_details', 'string', 'size:15'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        $settings = RazorpaySetting::current();
        if (! filled($settings->key_id) || ! filled($settings->key_secret)) {
            return response()->json(['message' => 'Razorpay is not configured. Please contact the store.'], 503);
        }

        $slugs = collect($data['items'])->pluck('product_slug')->unique();
        $products = Product::where('active', true)->whereIn('slug', $slugs)->get()->keyBy('slug');
        if ($products->count() !== $slugs->count()) {
            return response()->json(['message' => 'One or more products are unavailable. Refresh your bag and try again.'], 422);
        }

        $items = collect($data['items'])->map(function (array $item) use ($products): array {
            $product = $products->get($item['product_slug']);
            $price = (float) $product->sale_price;
            if ($price <= 0) {
                $price = (float) $product->price;
            }

            return ['id' => $product->slug, 'name' => $product->name, 'colour' => $item['colour'], 'size' => $item['size'], 'quantity' => $item['quantity'], 'unit_price' => $price];
        });
        $subtotal = (float) $items->sum(fn (array $item): float => $item['quantity'] * $item['unit_price']);
        $shippingCharge = 0;
        $couponCode = null;
        $discount = 0;
        if (! empty($data['coupon_code'])) {
            $coupon = Coupon::where('code', strtoupper(trim($data['coupon_code'])))->where('active', true)->first();
            if (! $coupon || ($coupon->starts_at && $coupon->starts_at->isFuture()) || ($coupon->expires_at && $coupon->expires_at->isPast())) {
                return response()->json(['message' => 'This coupon code is invalid or expired.'], 422);
            }
            $couponCode = $coupon->code;
            $discount = $coupon->type === 'percentage' ? round(($subtotal * (float) $coupon->value) / 100, 2) : min((float) $coupon->value, $subtotal);
        }

        $amount = (int) round(($subtotal + $shippingCharge - $discount) * 100);
        if ($amount < 100) {
            return response()->json(['message' => 'The payment amount must be at least ₹1.'], 422);
        }

        $orderNumber = 'SV-'.now()->format('ymd').'-'.strtoupper(Str::random(5));
        $response = Http::withBasicAuth($settings->key_id, $settings->key_secret)
            ->acceptJson()
            ->timeout(20)
            ->post('https://api.razorpay.com/v1/orders', [
                'amount' => $amount,
                'currency' => 'INR',
                'receipt' => $orderNumber,
                'notes' => ['store_order_number' => $orderNumber],
            ]);

        if ($response->status() === 401) {
            return response()->json(['message' => 'Razorpay rejected the saved API credentials. Check the dashboard settings.'], 401);
        }
        if (! $response->successful() || ! $response->json('id')) {
            return response()->json(['message' => 'Razorpay could not create the payment order. Please try again.'], 502);
        }

        $order = Order::create([
            'order_number' => $orderNumber,
            'customer' => $data['customer'],
            'items' => $items->all(),
            'subtotal' => $subtotal,
            'shipping_method' => $data['shipping_method'],
            'shipping_charge' => $shippingCharge,
            'coupon_code' => $couponCode,
            'discount_amount' => $discount,
            'payment_method' => 'Razorpay',
            'payment_status' => 'pending',
            'razorpay_order_id' => $response->json('id'),
            'business_details' => $data['business_details'] ?? null,
            'note' => $data['note'] ?? null,
            'status' => 'awaiting_payment',
        ]);

        return response()->json([
            'key_id' => $settings->key_id,
            'order_id' => $response->json('id'),
            'amount' => $response->json('amount'),
            'currency' => $response->json('currency'),
            'order_number' => $order->order_number,
        ], 201);
    }

    public function verifyPayment(Request $request, OrderConfirmationMailer $mailer): JsonResponse
    {
        $data = $request->validate([
            'razorpay_order_id' => ['required', 'string', 'max:80'],
            'razorpay_payment_id' => ['required', 'string', 'max:80'],
            'razorpay_signature' => ['required', 'string', 'size:64'],
        ]);
        $order = Order::where('razorpay_order_id', $data['razorpay_order_id'])->first();
        if (! $order) {
            return response()->json(['message' => 'The payment order was not found.'], 404);
        }
        if ($order->payment_status === 'paid') {
            return response()->json(['verified' => true, 'order_number' => $order->order_number]);
        }

        $settings = RazorpaySetting::current();
        if (! filled($settings->key_secret)) {
            return response()->json(['message' => 'Razorpay is not configured. Please contact the store.'], 503);
        }
        $expected = hash_hmac('sha256', $data['razorpay_order_id'].'|'.$data['razorpay_payment_id'], $settings->key_secret);
        if (! hash_equals($expected, $data['razorpay_signature'])) {
            return response()->json(['message' => 'Payment signature could not be verified.'], 400);
        }

        $order->update([
            'payment_status' => 'paid',
            'razorpay_payment_id' => $data['razorpay_payment_id'],
            'status' => 'received',
        ]);
        $mailer->send($order);

        return response()->json(['verified' => true, 'order_number' => $order->order_number]);
    }
}
