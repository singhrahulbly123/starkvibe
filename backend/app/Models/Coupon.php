<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = ['code', 'type', 'value', 'active', 'starts_at', 'expires_at'];

    protected function casts(): array
    {
        return ['value' => 'decimal:2', 'active' => 'boolean', 'starts_at' => 'datetime', 'expires_at' => 'datetime'];
    }
}
