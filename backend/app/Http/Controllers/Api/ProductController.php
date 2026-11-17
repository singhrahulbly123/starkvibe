<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'products' => Product::where('active', true)->orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::where('active', true)->where('slug', $slug)->firstOrFail();

        return response()->json(['product' => $product]);
    }
}
