<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin dashboard — StarkVibe</title>
    <style>
        :root{font-family:Arial,sans-serif;color:#111;background:#f2f0e9}*{box-sizing:border-box}body{margin:0}.shell{display:grid;grid-template-columns:260px minmax(0,1fr);min-height:100vh}.sidebar{position:sticky;top:0;height:100vh;background:#111;color:#fff;padding:28px 20px;display:flex;flex-direction:column}.brand{font-size:20px;font-weight:900;letter-spacing:.04em}.brand small{display:block;margin-top:7px;color:#e8bc63;font-size:10px;letter-spacing:.2em;text-transform:uppercase}.side-nav{display:grid;gap:7px;margin-top:52px}.side-nav a{padding:14px 15px;color:#c9c7be;text-decoration:none;font-weight:700}.side-nav a.active,.side-nav a:hover{background:#e8bc63;color:#111}.side-footer{margin-top:auto;border-top:1px solid #373633;padding-top:18px;color:#9a988f;font-size:13px}.side-footer strong{display:block;color:#fff;margin-bottom:4px}.side-footer button{margin-top:15px;padding:0;background:transparent;border:0;color:#e8bc63;text-decoration:underline;cursor:pointer;font-weight:700}.content{min-width:0;padding:34px 38px 70px}.top{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;border-bottom:1px solid #111;padding-bottom:26px}.eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#436d16;font-weight:700}h1{font-size:clamp(54px,8vw,110px);line-height:.85;text-transform:uppercase;margin:14px 0 0;font-weight:900}.top-right{display:flex;align-items:center;gap:18px;font-weight:700}.logout{background:transparent;border:0;text-decoration:underline;cursor:pointer;font-weight:700}.overview-hero{margin-top:32px;padding:clamp(28px,5vw,70px);background:#111;color:#fff;position:relative;overflow:hidden}.overview-hero:after{content:'✦';position:absolute;right:6%;top:8%;font-size:180px;color:#e8bc63;opacity:.16}.overview-hero h2{max-width:680px;margin:0;font-size:clamp(42px,6vw,92px);line-height:.9;text-transform:uppercase}.overview-hero p{max-width:520px;margin:26px 0 0;color:#c9c7be;line-height:1.6}.overview-hero strong{color:#e8bc63}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}.stat{padding:24px;background:#eeece5;border:1px solid #bdbbb3}.stat.gold{background:#e8bc63;border-color:#e8bc63}.stat p{margin:0;font-size:14px}.stat strong{display:block;font-size:30px;margin-top:18px}.panel{margin-top:36px;border:1px solid #bdbbb3;background:#eeece5;padding:24px}.panel h2{margin:0 0 18px;font-size:28px}.coupon-form,.coupon-row{display:grid;grid-template-columns:1.2fr .8fr .7fr 1fr 1fr auto;gap:10px;align-items:center}.coupon-form{border-bottom:1px solid #d1cec4;padding-bottom:20px}.coupon-row{padding:14px 0;border-bottom:1px solid #d1cec4}.coupon-row:last-child{border-bottom:0}.coupon-form input,.coupon-form select,.coupon-row input,.coupon-row select{width:100%;min-width:0;padding:11px;border:1px solid #111;background:transparent}.check{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700}.check input{width:auto}.orders{margin-top:36px;border:1px solid #bdbbb3;background:#eeece5;overflow:auto}table{width:100%;min-width:940px;border-collapse:collapse;text-align:left;font-size:14px}th{background:#111;color:#fff;padding:15px}td{padding:15px;border-top:1px solid #d1cec4;vertical-align:top}td strong{display:block}td small{display:block;color:#68665f;margin-top:5px}select{padding:9px;border:1px solid #111;background:transparent;font-weight:700}button.save,button.dark{background:#111;color:#fff;border:0;padding:10px 12px;font-weight:700;margin-left:5px;cursor:pointer}button.delete{background:#8a2a12;color:#fff;border:0;padding:10px 12px;font-weight:700;cursor:pointer}.notice{margin-top:18px;color:#436d16;font-weight:700}.error{margin-top:18px;color:#8a2a12;font-weight:700}.empty{padding:30px;text-align:center;color:#68665f}@media(max-width:1000px){.shell{grid-template-columns:210px 1fr}.content{padding:28px 22px}.coupon-form,.coupon-row{grid-template-columns:1fr 1fr}.coupon-form button,.coupon-row button{grid-column:1/-1}}@media(max-width:700px){.shell{display:block}.sidebar{position:relative;height:auto;padding:18px 16px}.side-nav{display:flex;overflow:auto;margin-top:20px}.side-nav a{white-space:nowrap}.side-footer{display:none}.content{padding:24px 16px 50px}.top{align-items:flex-start;flex-direction:column}.cards{grid-template-columns:1fr}.top-right{width:100%;justify-content:space-between}}
        .coupon-table-wrap{margin-top:24px;overflow:auto;border:1px solid #bdbbb3}.coupon-table{min-width:980px}.coupon-table input,.coupon-table select{width:100%;padding:9px;border:1px solid #bdbbb3;background:#f7f5ef}.coupon-table .actions{white-space:nowrap}.coupon-table .actions button{margin:0 0 6px 0}.coupon-table td input+input{margin-top:6px}
        .product-table-wrap{margin-top:24px;overflow:auto;border:1px solid #bdbbb3}.product-table{min-width:1280px}.product-table input,.product-table select,.product-table textarea{width:100%;padding:9px;border:1px solid #bdbbb3;background:#f7f5ef}.product-table textarea{min-height:130px;resize:vertical;font:12px monospace}.product-table .actions{white-space:nowrap}.product-table .actions button{margin:0 0 6px 0}.product-table td{vertical-align:top}
        .panel-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:20px}.panel-count,.product-card-status{font-size:12px;font-weight:700;color:#436d16;text-transform:uppercase;letter-spacing:.08em}.product-create{margin-top:20px;border:1px solid #bdbbb3;background:#f7f5ef}.product-create summary,.product-card summary{cursor:pointer;list-style:none;padding:18px 20px;font-weight:800}.product-create summary::-webkit-details-marker,.product-card summary::-webkit-details-marker{display:none}.product-create summary:after,.product-card summary:after{content:'+';float:right;font-size:22px}.product-create[open] summary:after,.product-card[open] summary:after{content:'−'}.product-editor{border-top:1px solid #d1cec4;padding:22px}.editor-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px}.product-editor label{display:grid;gap:7px;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}.product-editor input,.product-editor textarea{font:inherit;font-size:14px;font-weight:400;letter-spacing:0;text-transform:none;border:1px solid #bdbbb3;background:#fff;padding:11px}.product-editor textarea{resize:vertical}.product-editor .wide-field{margin-top:15px}.seo-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:15px}.editor-section-title{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:12px}.editor-section-title h3{margin:0;font-size:17px}.colour-editor{margin-top:22px;border-top:1px solid #d1cec4;padding-top:18px}.colour-list{display:grid;gap:9px}.colour-row{display:grid;grid-template-columns:1fr 80px 1fr 2fr auto;gap:9px;align-items:center}.colour-row input{min-width:0}.colour-row input[type=color]{height:42px;padding:3px}.add-colour,.remove-colour{border:1px solid #111;background:transparent;padding:10px 12px;font-size:12px;font-weight:800;cursor:pointer}.add-colour:hover,.remove-colour:hover{background:#111;color:#fff}.remove-colour{color:#8a2a12;border-color:#8a2a12}.primary-action{margin-top:20px;border:0;background:#111;color:#fff;padding:13px 18px;font-weight:800;cursor:pointer}.product-edit-list{display:grid;gap:12px;margin-top:24px}.product-card{border:1px solid #bdbbb3;background:#eeece5}.product-card summary{display:flex;justify-content:space-between;gap:20px}.product-card summary strong{display:block;font-size:17px}.product-card summary small{display:block;margin-top:5px;color:#68665f;font-weight:400}.product-card[open] summary{background:#111;color:#fff}.product-card[open] summary small{color:#c9c7be}.product-card .delete{margin:0 22px 22px}@media(max-width:1000px){.editor-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.colour-row{grid-template-columns:1fr 70px 1fr 1fr}.colour-row .remove-colour{grid-column:1/-1;justify-self:start}}@media(max-width:600px){.editor-grid,.seo-grid{grid-template-columns:1fr}.colour-row{grid-template-columns:1fr 70px}.colour-row .colour-file,.colour-row .colour-image{grid-column:1/-1}}
    </style>
</head>
<body>
<main class="shell">
    <aside class="sidebar" aria-label="Admin navigation">
        <div class="brand">STARKVIBE<small>Admin workspace</small></div>
        <nav class="side-nav">
            <a class="{{ $section === 'overview' ? 'active' : '' }}" href="{{ route('admin.dashboard', ['section' => 'overview']) }}">Overview</a>
            <a href="{{ route('admin.products.index') }}">Products</a>
            <a class="{{ $section === 'coupons' ? 'active' : '' }}" href="{{ route('admin.dashboard', ['section' => 'coupons']) }}">Coupons</a>
            <a class="{{ $section === 'orders' ? 'active' : '' }}" href="{{ route('admin.dashboard', ['section' => 'orders']) }}">Orders</a>
        </nav>
        <div class="side-footer">
            <strong>{{ auth()->user()->name }}</strong>
            {{ auth()->user()->email }}
            <form method="POST" action="{{ route('admin.logout') }}">@csrf<button type="submit">Sign out</button></form>
        </div>
    </aside>
    <div class="content">
    <header class="top" id="overview">
        <div><p class="eyebrow">StarkVibe operations</p><h1>{{ ucfirst($section) }}.</h1></div>
        <div class="top-right"><span>{{ auth()->user()->name }}</span><form method="POST" action="{{ route('admin.logout') }}">@csrf<button class="logout" type="submit">Sign out</button></form></div>
    </header>
    @if (session('status'))<p class="notice">{{ session('status') }}</p>@endif
    @if ($errors->any())<div class="error">@foreach ($errors->all() as $error)<p>{{ $error }}</p>@endforeach</div>@endif
    @if ($section === 'overview')
    <section class="overview-hero" aria-label="Admin welcome">
        <h2>Build a sharper <strong>StarkVibe.</strong></h2>
        <p>Your premium operations workspace is ready. Use the navigation to manage the store securely and keep every customer touchpoint consistent.</p>
    </section>
    <section class="cards" aria-label="Order summary">
        <article class="stat"><p>Total orders</p><strong>{{ $orderCount }}</strong></article>
        <article class="stat gold"><p>Pending orders</p><strong>{{ $pendingCount }}</strong></article>
        <article class="stat"><p>Delivered</p><strong>{{ $deliveredCount }}</strong></article>
        <article class="stat"><p>Cancelled</p><strong>{{ $cancelledCount }}</strong></article>
        <article class="stat gold"><p>Net revenue</p><strong>₹{{ number_format((float) $revenue) }}</strong></article>
    </section>
    @endif
    @if ($section === 'products')
    <section class="panel" id="products" aria-label="Product management">
        <div class="panel-heading"><div><p class="eyebrow">Catalogue manager</p><h2>Products</h2></div><span class="panel-count">{{ $products->count() }} products</span></div>
        <details class="product-create" open>
            <summary>+ Add new product</summary>
            <form class="product-editor" method="POST" action="{{ route('admin.products.store') }}">
                @csrf
                <div class="editor-grid">
                    <label>Product name<input name="name" placeholder="Oversized 220 GSM Tee" required></label>
                    <label>URL slug<input name="slug" placeholder="oversized-220-gsm-tee" required></label>
                    <label>Category<input name="category" placeholder="tees" required></label>
                    <label>GSM<input name="gsm" type="number" min="1" placeholder="220" required></label>
                    <label>Base price<input name="price" type="number" min="0" step="0.01" placeholder="1200" required></label>
                    <label>Sale price<input name="sale_price" type="number" min="0" step="0.01" placeholder="900" required></label>
                    <label>Sort order<input name="sort_order" type="number" min="0" placeholder="1"></label>
                    <label class="check"><input type="checkbox" name="active" value="1" checked> Publish product</label>
                </div>
                <label class="wide-field">Short description<textarea name="note" rows="3" placeholder="Write a unique product description..." required></textarea></label>
                <div class="seo-grid">
                    <label>SEO title<input name="meta_title" placeholder="Product title for Google"></label>
                    <label>SEO description<textarea name="meta_description" rows="2" placeholder="Unique meta description"></textarea></label>
                </div>
                <div class="colour-editor" data-colour-editor>
                    <div class="editor-section-title"><h3>Colours and product images</h3><button type="button" class="add-colour" data-add-colour>Add colour</button></div>
                    <div class="colour-list" data-colour-list>
                        <div class="colour-row">
                            <input class="colour-name" placeholder="Colour name" aria-label="Colour name">
                            <input class="colour-hex" type="color" value="#000000" aria-label="Colour hex">
                            <input class="colour-file" placeholder="black" aria-label="Colour file key">
                            <input class="colour-image" placeholder="/products/black.png" aria-label="Image URL">
                            <button type="button" class="remove-colour" data-remove-colour>Remove</button>
                        </div>
                    </div>
                    <input type="hidden" name="colours_json" data-colours-json>
                </div>
                <button class="primary-action" type="submit">Create product</button>
            </form>
        </details>
        @if ($products->isEmpty())
            <p class="empty">No products created yet.</p>
        @else
            <div class="product-edit-list">
            @foreach ($products as $product)
                <details class="product-card">
                    <summary><span><strong>{{ $product->name }}</strong><small>{{ $product->slug }} · {{ $product->category }} · {{ $product->gsm }} GSM</small></span><span class="product-card-status">{{ $product->active ? 'Published' : 'Draft' }}</span></summary>
                    <form id="product-update-{{ $product->id }}" class="product-editor" method="POST" action="{{ route('admin.products.update', $product) }}">
                        @csrf @method('PATCH')
                        <div class="editor-grid">
                            <label>Product name<input name="name" value="{{ $product->name }}" required></label>
                            <label>URL slug<input name="slug" value="{{ $product->slug }}" required></label>
                            <label>Category<input name="category" value="{{ $product->category }}" required></label>
                            <label>GSM<input name="gsm" type="number" min="1" value="{{ $product->gsm }}" required></label>
                            <label>Base price<input name="price" type="number" min="0" step="0.01" value="{{ $product->price }}" required></label>
                            <label>Sale price<input name="sale_price" type="number" min="0" step="0.01" value="{{ $product->sale_price }}" required></label>
                            <label>Sort order<input name="sort_order" type="number" min="0" value="{{ $product->sort_order }}"></label>
                            <label class="check"><input type="checkbox" name="active" value="1" @checked($product->active)> Published</label>
                        </div>
                        <label class="wide-field">Short description<textarea name="note" rows="3" required>{{ $product->note }}</textarea></label>
                        <div class="seo-grid">
                            <label>SEO title<input name="meta_title" value="{{ $product->meta_title }}"></label>
                            <label>SEO description<textarea name="meta_description" rows="2">{{ $product->meta_description }}</textarea></label>
                        </div>
                        <div class="colour-editor" data-colour-editor>
                            <div class="editor-section-title"><h3>Colours and product images</h3><button type="button" class="add-colour" data-add-colour>Add colour</button></div>
                            <div class="colour-list" data-colour-list>
                                @foreach ($product->colours as $colour)
                                <div class="colour-row">
                                    <input class="colour-name" value="{{ $colour['name'] ?? '' }}" placeholder="Colour name" aria-label="Colour name">
                                    <input class="colour-hex" type="color" value="{{ $colour['hex'] ?? '#000000' }}" aria-label="Colour hex">
                                    <input class="colour-file" value="{{ $colour['file'] ?? '' }}" placeholder="black" aria-label="Colour file key">
                                    <input class="colour-image" value="{{ $colour['image'] ?? '' }}" placeholder="/products/black.png" aria-label="Image URL">
                                    <button type="button" class="remove-colour" data-remove-colour>Remove</button>
                                </div>
                                @endforeach
                            </div>
                            <input type="hidden" name="colours_json" data-colours-json>
                        </div>
                        <div class="editor-actions"><button class="primary-action" type="submit">Save product</button></div>
                    </form>
                    <form method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Delete {{ $product->name }}?')">@csrf @method('DELETE')<button class="delete" type="submit">Delete product</button></form>
                </details>
            @endforeach
            </div>
        @endif
    </section>
    @endif
    @if ($section === 'coupons')
    <section class="panel" id="coupons" aria-label="Coupon management">
        <h2>Coupons</h2>
        <form class="coupon-form" method="POST" action="{{ route('admin.coupons.store') }}">
            @csrf
            <input name="code" placeholder="Code e.g. WINTER20" value="{{ old('code') }}" required>
            <select name="type" aria-label="Discount type"><option value="percentage">Percentage</option><option value="fixed">Fixed amount</option></select>
            <input name="value" type="number" min="0.01" step="0.01" placeholder="Value" required>
            <input name="starts_at" type="datetime-local" aria-label="Starts at">
            <input name="expires_at" type="datetime-local" aria-label="Expires at">
            <button class="dark" type="submit">Create</button>
        </form>
        @if ($coupons->isEmpty())
            <p class="empty">No coupons created yet.</p>
        @else
            <div class="coupon-table-wrap">
                <table class="coupon-table">
                    <thead><tr><th>Code</th><th>Type</th><th>Discount</th><th>Validity</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                    @foreach ($coupons as $coupon)
                        <tr>
                            <td><input form="coupon-update-{{ $coupon->id }}" name="code" value="{{ $coupon->code }}" required></td>
                            <td><select form="coupon-update-{{ $coupon->id }}" name="type" aria-label="Discount type"><option value="percentage" @selected($coupon->type === 'percentage')>Percentage</option><option value="fixed" @selected($coupon->type === 'fixed')>Fixed amount</option></select></td>
                            <td><input form="coupon-update-{{ $coupon->id }}" name="value" type="number" min="0.01" step="0.01" value="{{ $coupon->value }}" required></td>
                            <td>
                                <input form="coupon-update-{{ $coupon->id }}" name="starts_at" type="datetime-local" value="{{ $coupon->starts_at?->format('Y-m-d\TH:i') }}" aria-label="Starts at">
                                <input form="coupon-update-{{ $coupon->id }}" name="expires_at" type="datetime-local" value="{{ $coupon->expires_at?->format('Y-m-d\TH:i') }}" aria-label="Expires at">
                            </td>
                            <td><label class="check"><input form="coupon-update-{{ $coupon->id }}" type="checkbox" name="active" value="1" @checked($coupon->active)> Active</label></td>
                            <td class="actions">
                                <form id="coupon-update-{{ $coupon->id }}" method="POST" action="{{ route('admin.coupons.update', $coupon) }}">@csrf @method('PATCH')</form>
                                <button class="dark" form="coupon-update-{{ $coupon->id }}" type="submit">Save</button>
                                <form method="POST" action="{{ route('admin.coupons.destroy', $coupon) }}" onsubmit="return confirm('Delete {{ $coupon->code }}?')">@csrf @method('DELETE')<button class="delete" type="submit">Delete</button></form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </section>
    @endif
    @if ($section === 'orders')
    <section class="orders" id="orders" aria-label="Orders">
        @if ($orders->isEmpty())
            <p class="empty">No orders have been placed yet.</p>
        @else
            <table><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>
            @foreach ($orders as $order)
                <tr><td><strong>{{ $order->order_number }}</strong><small>{{ $order->created_at->format('d M Y, H:i') }}</small></td><td><strong>{{ $order->customer['name'] ?? '—' }}</strong><small>{{ $order->customer['email'] ?? '—' }}</small><small>{{ $order->customer['phone'] ?? '—' }}</small></td><td>@foreach ($order->items as $item)<div>{{ $item['quantity'] ?? 1 }} × {{ $item['name'] ?? 'Product' }} · {{ $item['colour'] ?? '—' }} · {{ $item['size'] ?? '—' }}</div>@endforeach</td><td><strong>₹{{ number_format((float) $order->subtotal + (float) $order->shipping_charge - (float) $order->discount_amount) }}</strong><small>{{ $order->coupon_code ? $order->coupon_code.' · ' : '' }}{{ $order->shipping_method }} · {{ $order->payment_method }}</small></td><td><form method="POST" action="{{ route('admin.orders.update', $order) }}">@csrf @method('PATCH')<select name="status" aria-label="Order status">@foreach (['received','confirmed','processing','shipped','delivered','cancellation_requested','cancelled'] as $status)<option value="{{ $status }}" @selected($order->status === $status)>{{ str_replace('_', ' ', $status) }}</option>@endforeach</select><button class="save" type="submit">Save</button></form></td></tr>
            @endforeach
            </tbody></table>
        @endif
    </section>
    @endif
    </div>
</main>
<script>
(() => {
    const addRow = (editor, values = {}) => {
        const row = document.createElement("div");
        row.className = "colour-row";
        row.innerHTML = '<input class="colour-name" placeholder="Colour name" aria-label="Colour name"><input class="colour-hex" type="color" value="#000000" aria-label="Colour hex"><input class="colour-file" placeholder="black" aria-label="Colour file key"><input class="colour-image" placeholder="/products/black.png" aria-label="Image URL"><button type="button" class="remove-colour" data-remove-colour>Remove</button>';
        row.querySelector(".colour-name").value = values.name || "";
        row.querySelector(".colour-hex").value = values.hex || "#000000";
        row.querySelector(".colour-file").value = values.file || "";
        row.querySelector(".colour-image").value = values.image || "";
        editor.querySelector("[data-colour-list]").appendChild(row);
        row.querySelector("[data-remove-colour]").addEventListener("click", () => {
            const list = editor.querySelector("[data-colour-list]");
            if (list.children.length > 1) row.remove();
            sync(editor);
        });
    };
    const sync = (editor) => {
        const colours = [...editor.querySelectorAll(".colour-row")].map((row) => ({
            name: row.querySelector(".colour-name").value.trim(),
            hex: row.querySelector(".colour-hex").value,
            file: row.querySelector(".colour-file").value.trim(),
            image: row.querySelector(".colour-image").value.trim(),
        })).filter((colour) => colour.name && colour.file && colour.image);
        editor.querySelector("[data-colours-json]").value = JSON.stringify(colours);
    };
    document.querySelectorAll("[data-colour-editor]").forEach((editor) => {
        editor.querySelectorAll("[data-remove-colour]").forEach((button) => {
            button.addEventListener("click", () => {
                const list = editor.querySelector("[data-colour-list]");
                if (list.children.length > 1) button.closest(".colour-row").remove();
                sync(editor);
            });
        });
        editor.querySelector("[data-add-colour]").addEventListener("click", () => {
            addRow(editor);
            sync(editor);
        });
        const form = editor.closest("form");
        form.addEventListener("submit", () => sync(editor));
        sync(editor);
    });
})();
</script>
</body>
</html>
