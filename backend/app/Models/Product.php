<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'slug', 'name', 'gsm', 'price', 'sale_price', 'category', 'note',
        'long_description', 'material', 'fit', 'finish', 'construction', 'washing',
        'best_for', 'care_instructions', 'shipping_info', 'benefits',
        'colours', 'gallery', 'active', 'sort_order', 'meta_title', 'meta_description',
        'canonical_url', 'labels', 'variants',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'colours' => 'array',
            'gallery' => 'array',
            'benefits' => 'array',
            'labels' => 'array',
            'variants' => 'array',
            'active' => 'boolean',
        ];
    }
}
