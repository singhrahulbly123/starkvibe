<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('order_number')->unique();
            $table->json('customer');
            $table->json('items');
            $table->decimal('subtotal', 10, 2);
            $table->string('shipping_method');
            $table->string('payment_method');
            $table->json('business_details')->nullable();
            $table->text('note')->nullable();
            $table->string('status')->default('received')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
