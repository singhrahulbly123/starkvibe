@extends('admin.layout')

@section('title', 'Products — StarkVibe Admin')
@section('content')
@php
    $imageUrl = static function ($image) {
        if (! $image) return '';
        return str_starts_with($image, '/')
            ? rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/').$image
            : $image;
    };
@endphp
<header class="top"><div><p class="eyebrow">Catalogue manager</p><h1>Products.</h1></div><a class="top-link" href="{{ route('admin.dashboard') }}">Back to overview</a></header>
@if (session('status'))<p class="notice">{{ session('status') }}</p>@endif
@if ($errors->any())<div class="error">@foreach ($errors->all() as $error)<p>{{ $error }}</p>@endforeach</div>@endif
<section class="panel">
    <div class="panel-heading"><div><h2>Product catalogue</h2><p class="muted">{{ $products->count() }} products in database</p></div><a class="primary gold" href="{{ route('admin.products.create') }}">+ Add product</a></div>
    @if ($products->isEmpty())
        <p class="muted">No products created yet.</p>
    @else
        <div class="product-list">
            <table><thead><tr><th>Product</th><th>Price</th><th>Category</th><th>Colours</th><th>Variants</th><th>Status</th><th>Actions</th></tr></thead><tbody>
            @foreach ($products as $product)
                <tr>
                    @php
                        $images = collect($product->colours ?? [])->pluck('image')->filter()->merge($product->gallery ?? [])->unique()->values();
                    @endphp
                    <td><div style="display:flex;gap:12px;align-items:center"><div class="thumbs">@forelse($images as $image)<img class="thumb" src="{{ $imageUrl($image) }}" alt="{{ $product->name }} product image" onerror="this.hidden=true">@empty<span class="thumb empty">No image</span>@endforelse</div><div><strong>{{ $product->name }}</strong><span class="muted">{{ $product->slug }}</span><span class="muted">{{ $images->count() }} images</span></div></div></td>
                    <td><strong>₹{{ number_format((float) $product->sale_price) }}</strong><span class="muted">Base ₹{{ number_format((float) $product->price) }}</span></td>
                    <td>{{ ucfirst($product->category) }}<span class="muted">{{ $product->gsm }} GSM</span></td>
                    <td>{{ count($product->colours ?? []) }} colours<span class="muted">{{ count($product->gallery ?? []) }} gallery images</span></td>
                    <td>{{ count($product->variants ?? []) }} variants<span class="muted">{{ count($product->labels ?? []) }} labels</span></td>
                    <td>{{ $product->active ? 'Published' : 'Draft' }}</td>
                    <td class="actions"><a class="primary" href="{{ route('admin.products.edit', $product) }}">Edit</a><form method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Delete {{ $product->name }}?')">@csrf @method('DELETE')<button class="delete" type="submit">Delete</button></form></td>
                </tr>
            @endforeach
            </tbody></table>
        </div>
    @endif
</section>
@endsection
