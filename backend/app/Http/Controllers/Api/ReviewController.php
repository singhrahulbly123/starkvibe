<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_slug' => ['required', 'string', 'max:160'],
            'product_name' => ['required', 'string', 'max:200'],
            'name' => ['required', 'string', 'max:160'],
            'email' => ['nullable', 'email', 'max:255'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'review' => ['required', 'string', 'min:10', 'max:2000'],
        ]);

        Review::create([...$data, 'status' => 'pending']);

        return response()->json([
            'message' => 'Thank you. Your review is awaiting moderation.',
        ], 201);
    }

    public function published(string $productSlug): JsonResponse
    {
        return response()->json([
            'reviews' => Review::where('product_slug', $productSlug)
                ->where('status', 'published')
                ->latest()
                ->get(['id', 'product_slug', 'name', 'rating', 'review', 'created_at']),
        ]);
    }
}
