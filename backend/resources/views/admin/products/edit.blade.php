@extends('admin.layout')

@section('title', 'Edit Product — StarkVibe Admin')
@section('content')
<header class="top"><div><p class="eyebrow">Catalogue manager</p><h1>Edit product.</h1></div><a class="top-link" href="{{ route('admin.products.index') }}">← Product list</a></header>
@include('admin.products._form', ['action' => route('admin.products.update', $product), 'method' => 'PATCH', 'submitLabel' => 'Save product', 'product' => $product])
@endsection
