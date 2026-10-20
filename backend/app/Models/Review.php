<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'product_slug', 'product_name', 'name', 'email', 'rating', 'review', 'status',
    ];
}
