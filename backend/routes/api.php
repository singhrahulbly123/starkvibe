<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RazorpayController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('orders', [OrderController::class, 'store']);
Route::post('payment/razorpay-order', [RazorpayController::class, 'createOrder']);
Route::post('payment/razorpay-verify', [RazorpayController::class, 'verifyPayment']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{slug}', [ProductController::class, 'show']);
Route::post('reviews', [ReviewController::class, 'store']);
Route::get('reviews/{productSlug}', [ReviewController::class, 'published']);
Route::post('coupons/validate', [CouponController::class, 'validateCoupon']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('account/orders', [OrderController::class, 'index']);
    Route::post('account/orders/{order}/cancel', [OrderController::class, 'cancel']);

    Route::middleware('admin')->prefix('admin')->group(function (): void {
        Route::get('summary', [OrderController::class, 'summary']);
        Route::get('orders', [OrderController::class, 'adminIndex']);
        Route::patch('orders/{order}', [OrderController::class, 'update']);
    });
});
