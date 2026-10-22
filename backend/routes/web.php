<?php

use App\Http\Controllers\AdminDashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/login', [AdminDashboardController::class, 'login'])->name('admin.login');
Route::post('/admin/login', [AdminDashboardController::class, 'authenticate'])->name('admin.authenticate');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function (): void {
    Route::get('/dashboard', [AdminDashboardController::class, 'dashboard'])->name('dashboard');
    Route::patch('/orders/{order}', [AdminDashboardController::class, 'updateOrder'])->name('orders.update');
    Route::post('/coupons', [AdminDashboardController::class, 'storeCoupon'])->name('coupons.store');
    Route::post('/payment-settings', [AdminDashboardController::class, 'updatePaymentSettings'])->name('payment-settings.update');
    Route::delete('/payment-settings', [AdminDashboardController::class, 'deletePaymentSettings'])->name('payment-settings.delete');
    Route::patch('/coupons/{coupon}', [AdminDashboardController::class, 'updateCoupon'])->name('coupons.update');
    Route::delete('/coupons/{coupon}', [AdminDashboardController::class, 'destroyCoupon'])->name('coupons.destroy');
    Route::post('/products', [AdminDashboardController::class, 'storeProduct'])->name('products.store');
    Route::patch('/products/{product}', [AdminDashboardController::class, 'updateProduct'])->name('products.update');
    Route::delete('/products/{product}', [AdminDashboardController::class, 'destroyProduct'])->name('products.destroy');
    Route::get('/products', [AdminDashboardController::class, 'products'])->name('products.index');
    Route::get('/products/create', [AdminDashboardController::class, 'createProduct'])->name('products.create');
    Route::get('/products/{product}/edit', [AdminDashboardController::class, 'editProduct'])->name('products.edit');
    Route::post('/logout', [AdminDashboardController::class, 'logout'])->name('logout');
});
