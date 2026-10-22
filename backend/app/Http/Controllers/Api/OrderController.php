<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Coupon;
use App\Support\OrderConfirmationMailer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request, OrderConfirmationMailer $mailer): JsonResponse
    {
        $data = $request->validate(['customer' => ['required', 'array'], 'customer.name' => ['required', 'string', 'max:160'], 'customer.email' => ['required', 'email', 'max:255'], 'customer.phone' => ['required', 'string', 'max:30'], 'items' => ['required', 'array', 'min:1'], 'subtotal' => ['required', 'numeric', 'min:0'], 'shipping_method' => ['required', 'string', 'max:80'], 'shipping_charge' => ['required', 'numeric', 'min:0'], 'coupon_code' => ['nullable', 'string', 'max:40'], 'payment_method' => ['required', 'string', 'max:80'], 'business_details' => ['nullable', 'array'], 'note' => ['nullable', 'string', 'max:1000']]);
        $coupon = null;
        $discount = 0;
        if (! empty($data['coupon_code'])) {
            $coupon = Coupon::where('code', strtoupper(trim($data['coupon_code'])))->where('active', true)->first();
            if (! $coupon || ($coupon->starts_at && $coupon->starts_at->isFuture()) || ($coupon->expires_at && $coupon->expires_at->isPast())) {
                return response()->json(['message' => 'This coupon code is invalid or expired.'], 422);
            }
            $discount = $coupon->type === 'percentage' ? round(((float) $data['subtotal'] * (float) $coupon->value) / 100, 2) : min((float) $coupon->value, (float) $data['subtotal']);
            $data['coupon_code'] = $coupon->code;
        }
        $data['discount_amount'] = $discount;
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
