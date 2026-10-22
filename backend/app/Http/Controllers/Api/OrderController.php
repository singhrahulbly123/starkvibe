<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Coupon;
use App\Models\Product;
use App\Support\OrderConfirmationMailer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request, OrderConfirmationMailer $mailer): JsonResponse
    {
        $data = $request->validate(['customer' => ['required', 'array'], 'customer.name' => ['required', 'string', 'max:160'], 'customer.email' => ['required', 'email', 'max:255'], 'customer.phone' => ['required', 'string', 'max:30'], 'items' => ['required', 'array', 'min:1'], 'items.*.id' => ['required', 'string', 'max:180'], 'items.*.quantity' => ['required', 'integer', 'min:1', 'max:20'], 'items.*.colour' => ['required', 'string', 'max:80'], 'items.*.size' => ['required', 'string', 'max:20'], 'shipping_method' => ['required', 'in:Standard delivery,Express delivery'], 'coupon_code' => ['nullable', 'string', 'max:40'], 'payment_method' => ['required', 'in:Cash on delivery'], 'business_details' => ['nullable', 'array'], 'note' => ['nullable', 'string', 'max:1000']]);
        $productSlugs = collect($data['items'])->pluck('id')->unique();
        $products = Product::where('active', true)->whereIn('slug', $productSlugs)->get()->keyBy('slug');
        if ($products->count() !== $productSlugs->count()) {
            return response()->json(['message' => 'One or more products are unavailable. Refresh your bag and try again.'], 422);
        }
        $items = collect($data['items'])->map(function (array $item) use ($products): array {
            $product = $products->get($item['id']);
            $price = (float) $product->sale_price;
            if ($price <= 0) {
                $price = (float) $product->price;
            }

            return ['id' => $product->slug, 'name' => $product->name, 'colour' => $item['colour'], 'size' => $item['size'], 'quantity' => $item['quantity'], 'unit_price' => $price];
        });
        $subtotal = (float) $items->sum(fn (array $item): float => $item['quantity'] * $item['unit_price']);
        $data['items'] = $items->all();
        $data['subtotal'] = $subtotal;
        $coupon = null;
        $discount = 0;
        if (! empty($data['coupon_code'])) {
            $coupon = Coupon::where('code', strtoupper(trim($data['coupon_code'])))->where('active', true)->first();
            if (! $coupon || ($coupon->starts_at && $coupon->starts_at->isFuture()) || ($coupon->expires_at && $coupon->expires_at->isPast())) {
                return response()->json(['message' => 'This coupon code is invalid or expired.'], 422);
            }
            $discount = $coupon->type === 'percentage' ? round(($subtotal * (float) $coupon->value) / 100, 2) : min((float) $coupon->value, $subtotal);
            $data['coupon_code'] = $coupon->code;
        }
        $data['discount_amount'] = $discount;
        $data['shipping_charge'] = 50;
        $user = $request->user();
        $order = Order::create([...$data, 'user_id' => $user?->id, 'order_number' => 'SV-'.now()->format('ymd').'-'.strtoupper(Str::random(5)), 'payment_status' => 'cod', 'status' => 'received']);
        $mailer->send($order);

        return response()->json(['order' => $order], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)
            ->orWhereJsonContains('customer', ['email' => $user->email])
            ->latest()
            ->get();

        return response()->json(['orders' => $orders]);
    }

    public function cancel(Request $request, Order $order): JsonResponse
    {
        abort_unless($order->user_id === $request->user()->id || ($order->customer['email'] ?? null) === $request->user()->email, 403);
        $order->update(['status' => 'cancellation_requested']);

        return response()->json(['order' => $order->fresh()]);
    }

    public function adminIndex(): JsonResponse
    {
        return response()->json(['orders' => Order::with('user')->latest()->get()]);
    }

    public function update(Request $request, Order $order): JsonResponse
    {
        $data = $request->validate(['status' => ['required', 'in:awaiting_payment,received,confirmed,processing,shipped,delivered,cancellation_requested,cancelled']]);
        $order->update($data);

        return response()->json(['order' => $order->fresh('user')]);
    }

    public function summary(): JsonResponse
    {
        $activeOrders = Order::whereNotIn('status', ['cancelled', 'awaiting_payment']);
        return response()->json(['orders' => Order::count(), 'pending' => Order::whereIn('status', ['awaiting_payment', 'received', 'cancellation_requested'])->count(), 'revenue' => (float) ($activeOrders->sum('subtotal') + $activeOrders->sum('shipping_charge') - $activeOrders->sum('discount_amount'))]);
    }
}
