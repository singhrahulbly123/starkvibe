<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function validateCoupon(Request $request): JsonResponse
    {
        $data = $request->validate(['code' => ['required', 'string', 'max:40'], 'subtotal' => ['required', 'numeric', 'min:0']]);
        $code = strtoupper(trim($data['code']));
        $coupon = Coupon::where('code', $code)->where('active', true)->first();

        if (! $coupon || ($coupon->starts_at && $coupon->starts_at->isFuture()) || ($coupon->expires_at && $coupon->expires_at->isPast())) {
            return response()->json(['message' => 'This coupon code is invalid or expired.'], 422);
        }

        $discount = $coupon->type === 'percentage'
            ? round(((float) $data['subtotal'] * (float) $coupon->value) / 100, 2)
            : min((float) $coupon->value, (float) $data['subtotal']);

        return response()->json(['code' => $coupon->code, 'discount' => $discount, 'discount_percentage' => $coupon->type === 'percentage' ? (float) $coupon->value : null]);
    }
}
