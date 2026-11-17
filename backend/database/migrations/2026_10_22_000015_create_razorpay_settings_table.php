<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('razorpay_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('key_id')->nullable();
            $table->text('key_secret')->nullable();
            $table->timestamps();
        });

        Schema::table('orders', function (Blueprint $table): void {
            $table->string('payment_status')->default('pending')->after('payment_method');
            $table->string('razorpay_order_id')->nullable()->unique()->after('payment_status');
            $table->string('razorpay_payment_id')->nullable()->after('razorpay_order_id');
        });

        DB::table('orders')->where('payment_method', 'Cash on delivery')->update(['payment_status' => 'cod']);
        DB::table('orders')->where('payment_method', 'Razorpay')->whereNotNull('note')->where('note', 'like', '%Razorpay payment:%')->update(['payment_status' => 'paid']);
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->dropUnique(['razorpay_order_id']);
            $table->dropColumn(['payment_status', 'razorpay_order_id', 'razorpay_payment_id']);
        });

        Schema::dropIfExists('razorpay_settings');
    }
};
