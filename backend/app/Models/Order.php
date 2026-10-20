<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'order_number', 'customer', 'items', 'subtotal',
        'shipping_method', 'shipping_charge', 'coupon_code', 'discount_amount', 'payment_method', 'business_details', 'note', 'status',
    ];

    protected function casts(): array
    {
        return ['customer' => 'array', 'items' => 'array', 'business_details' => 'array', 'subtotal' => 'decimal:2', 'shipping_charge' => 'decimal:2', 'discount_amount' => 'decimal:2'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
