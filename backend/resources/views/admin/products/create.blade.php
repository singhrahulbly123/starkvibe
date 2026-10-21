@extends('admin.layout')

@section('title', 'Add Product — StarkVibe Admin')
@section('content')
<header class="top"><div><p class="eyebrow">Catalogue manager</p><h1>Add product.</h1></div><a class="top-link" href="{{ route('admin.products.index') }}">← Product list</a></header>
@include('admin.products._form', ['action' => route('admin.products.store'), 'method' => 'POST', 'submitLabel' => 'Create product'])
@endsection
