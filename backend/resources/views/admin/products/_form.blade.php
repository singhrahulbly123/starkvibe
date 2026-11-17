@php
    $editing = isset($product);
    $imageUrl = static function ($image) {
        if (! $image) return '';
        return str_starts_with($image, '/')
            ? rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/').$image
            : $image;
    };
    $savedColours = old('colours_json');
    $colours = is_string($savedColours) ? json_decode($savedColours, true) : ($product->colours ?? [['name' => '', 'hex' => '#000000', 'file' => '', 'image' => '']]);
    $savedGallery = old('gallery_json');
    $gallery = is_string($savedGallery) ? json_decode($savedGallery, true) : ($product->gallery ?? []);
    $savedVariants = old('variants_json');
    $variants = is_string($savedVariants) ? json_decode($savedVariants, true) : ($product->variants ?? []);
    $labels = old('labels_text', isset($product) ? implode("\n", $product->labels ?? []) : '');
@endphp
@if ($errors->any())<div class="error">@foreach ($errors->all() as $error)<p>{{ $error }}</p>@endforeach</div>@endif
<form class="editor" method="POST" action="{{ $action }}" enctype="multipart/form-data" data-product-form>
    @csrf
    @if ($method !== 'POST') @method($method) @endif
    <nav class="editor-tabs" aria-label="Product editor sections">
        <button type="button" class="editor-tab active" data-editor-tab="data">Product data</button>
        <button type="button" class="editor-tab" data-editor-tab="colours">Colours</button>
        <button type="button" class="editor-tab" data-editor-tab="images">Images</button>
        <button type="button" class="editor-tab" data-editor-tab="variants">Variants</button>
        <button type="button" class="editor-tab" data-editor-tab="seo">SEO & URLs</button>
    </nav>
    <div class="tab-panel active" data-tab-panel="data">
    <div class="grid">
        <label>Product name<input name="name" value="{{ old('name', $product->name ?? '') }}" placeholder="Oversized 220 GSM Tee" required></label>
        <label>URL slug<input name="slug" value="{{ old('slug', $product->slug ?? '') }}" placeholder="oversized-220-gsm-tee" required></label>
        <label>Category<input name="category" value="{{ old('category', $product->category ?? '') }}" placeholder="tees" required></label>
        <label>GSM<input name="gsm" type="number" min="1" value="{{ old('gsm', $product->gsm ?? '') }}" required></label>
        <label>Base price<input name="price" type="number" min="0" step="0.01" value="{{ old('price', $product->price ?? '') }}" required></label>
        <label>Sale price<input name="sale_price" type="number" min="0" step="0.01" value="{{ old('sale_price', $product->sale_price ?? '') }}" required></label>
        <label>Sort order<input name="sort_order" type="number" min="0" value="{{ old('sort_order', $product->sort_order ?? 0) }}"></label>
        <label class="check"><input type="checkbox" name="active" value="1" @checked(old('active', $product->active ?? true))> Publish product</label>
    </div>
    <label class="wide">Short description<textarea name="note" rows="4" data-rich-editor placeholder="Write a unique product description..." required>{{ old('note', $product->note ?? '') }}</textarea></label>
    <label class="wide">Long description<textarea name="long_description" rows="8" data-rich-editor placeholder="Write the complete product description shown on the product details page...">{{ old('long_description', $product->long_description ?? '') }}</textarea></label>
    <div class="grid">
        <label>Material<input name="material" value="{{ old('material', $product->material ?? '') }}" placeholder="100% premium cotton"></label>
        <label>Fit<input name="fit" value="{{ old('fit', $product->fit ?? '') }}" placeholder="Oversized / Regular fit"></label>
        <label>Construction<input name="construction" value="{{ old('construction', $product->construction ?? '') }}" placeholder="Double stitched seams"></label>
        <label>Best for<input name="best_for" value="{{ old('best_for', $product->best_for ?? '') }}" placeholder="Everyday wear, teams, events"></label>
    </div>
    <div class="seo">
        <label>Finish<textarea name="finish" rows="3" placeholder="Fabric finish details">{{ old('finish', $product->finish ?? '') }}</textarea></label>
        <label>Washing<textarea name="washing" rows="3" placeholder="Washing summary">{{ old('washing', $product->washing ?? '') }}</textarea></label>
        <label>Care instructions<textarea name="care_instructions" rows="3" placeholder="Full care instructions">{{ old('care_instructions', $product->care_instructions ?? '') }}</textarea></label>
        <label>Shipping and printing<textarea name="shipping_info" rows="3" placeholder="Delivery, printing and order information">{{ old('shipping_info', $product->shipping_info ?? '') }}</textarea></label>
    </div>
    <label class="wide">Benefits <span class="muted">One benefit per line</span><textarea name="benefits_text" rows="5" placeholder="Premium cotton fabric&#10;Double bio-washed&#10;Double stitched seams">{{ old('benefits_text', isset($product) ? implode("\n", $product->benefits ?? []) : '') }}</textarea></label>
    <input type="hidden" name="benefits_json" data-benefits-json>
    </div>
    <div class="tab-panel" data-tab-panel="seo">
        <label>SEO title<input name="meta_title" value="{{ old('meta_title', $product->meta_title ?? '') }}" placeholder="Unique product title"></label>
        <label>SEO description<textarea name="meta_description" rows="2" placeholder="Unique meta description">{{ old('meta_description', $product->meta_description ?? '') }}</textarea></label>
        <label>Canonical URL<input name="canonical_url" type="url" value="{{ old('canonical_url', $product->canonical_url ?? '') }}" placeholder="https://starkvibe.com/products/product-slug"></label>
        <label>Product labels <span class="muted">One label per line</span><textarea name="labels_text" rows="3" placeholder="Best seller&#10;New&#10;Limited">{{ $labels }}</textarea></label>
        <input type="hidden" name="labels_json" data-labels-json>
    </div>
    <div class="tab-panel" data-tab-panel="colours">
    <div class="section-title"><h3>Colour variants and swatch images</h3><button class="small-button" type="button" data-add-colour>Add colour</button></div>
    <div data-colour-list>
        @foreach ($colours as $colour)
            <div class="colour-row">
                <input class="colour-name" value="{{ $colour['name'] ?? '' }}" placeholder="Colour name" aria-label="Colour name">
                <input class="colour-hex" type="color" value="{{ $colour['hex'] ?? '#000000' }}" aria-label="Colour hex">
                <input class="colour-file" value="{{ $colour['file'] ?? '' }}" placeholder="black" aria-label="Colour key">
                <input type="hidden" class="colour-image" value="{{ $colour['image'] ?? '' }}" aria-label="Product image">
                <div class="media-field"><img class="colour-preview" src="{{ $imageUrl($colour['image'] ?? '') }}" alt="Colour product preview" onerror="this.hidden=true"><input class="colour-upload" type="file" name="colour_image_files[]" accept="image/*" aria-label="Upload or replace colour image"></div>
                <button class="small-button" type="button" data-remove-colour>Remove</button>
            </div>
        @endforeach
    </div>
    <input type="hidden" name="colours_json" data-colours-json>
    </div>
    <div class="tab-panel" data-tab-panel="images">
    <div class="section-title"><h3>Product gallery</h3><button class="small-button" type="button" data-add-gallery>Add gallery image</button></div>
    <div data-gallery-list>
        @foreach ($gallery as $image)
            <div class="gallery-row"><input type="hidden" class="gallery-image" value="{{ $image }}" aria-label="Gallery image"><div class="media-field"><img class="gallery-preview" src="{{ $imageUrl($image) }}" alt="Gallery preview" onerror="this.hidden=true"><input class="gallery-upload" type="file" name="gallery_files[]" accept="image/*" aria-label="Upload or replace gallery image"></div><button class="small-button" type="button" data-remove-gallery>Remove</button></div>
        @endforeach
    </div>
    <input type="hidden" name="gallery_json" data-gallery-json>
    </div>
    <div class="tab-panel" data-tab-panel="variants">
        <div class="section-title"><h3>Sellable variants</h3><button class="small-button" type="button" data-add-variant>Add variant</button></div>
        <p class="muted">Manage SKU, colour, size, price, stock and optional variant image for each sellable combination.</p>
        <div data-variant-list>
            @foreach ($variants as $variant)
                <div class="variant-row">
                    <input class="variant-field" data-key="sku" value="{{ $variant['sku'] ?? '' }}" placeholder="SKU" aria-label="Variant SKU">
                    <input class="variant-field" data-key="colour" value="{{ $variant['colour'] ?? '' }}" placeholder="Colour" aria-label="Variant colour">
                    <input class="variant-field" data-key="size" value="{{ $variant['size'] ?? '' }}" placeholder="Size" aria-label="Variant size">
                    <input class="variant-field" data-key="price" type="number" min="0" step="0.01" value="{{ $variant['price'] ?? '' }}" placeholder="Price" aria-label="Variant price">
                    <input class="variant-field" data-key="stock" type="number" min="0" value="{{ $variant['stock'] ?? 0 }}" placeholder="Stock" aria-label="Variant stock">
                    <input class="variant-field" data-key="image" value="{{ $variant['image'] ?? '' }}" placeholder="Image URL (optional)" aria-label="Variant image URL">
                    <button class="small-button" type="button" data-remove-variant>Remove</button>
                </div>
            @endforeach
        </div>
        <input type="hidden" name="variants_json" data-variants-json>
    </div>
    <div class="editor-actions"><a class="back" href="{{ route('admin.products.index') }}">Cancel</a><button class="primary gold" type="submit">{{ $submitLabel }}</button></div>
</form>
<script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js"></script>
<script>
(() => {
    const form = document.querySelector("[data-product-form]");
    const richEditors = [];
    const colourList = form.querySelector("[data-colour-list]");
    const galleryList = form.querySelector("[data-gallery-list]");
    const variantList = form.querySelector("[data-variant-list]");
    const sync = () => {
        const colours = [...colourList.querySelectorAll(".colour-row")].map((row) => ({
            name: row.querySelector(".colour-name").value.trim(),
            hex: row.querySelector(".colour-hex").value,
            file: row.querySelector(".colour-file").value.trim(),
            image: row.querySelector(".colour-image").value.trim(),
        })).filter((item) => item.name && item.file);
        form.querySelector("[data-colours-json]").value = JSON.stringify(colours);
        form.querySelector("[data-gallery-json]").value = JSON.stringify([...galleryList.querySelectorAll(".gallery-image")].map((input) => input.value.trim()).filter(Boolean));
        form.querySelector("[data-benefits-json]").value = JSON.stringify(form.querySelector("[name=benefits_text]").value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean));
        form.querySelector("[data-labels-json]").value = JSON.stringify(form.querySelector("[name=labels_text]").value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean));
        form.querySelector("[data-variants-json]").value = JSON.stringify([...variantList.querySelectorAll(".variant-row")].map((row) => Object.fromEntries([...row.querySelectorAll("[data-key]")].map((input) => [input.dataset.key, input.value.trim()]))).filter((item) => item.sku));
    };
    const colourRow = () => {
        const row = document.createElement("div");
        row.className = "colour-row";
        row.innerHTML = '<input class="colour-name" placeholder="Colour name" aria-label="Colour name"><input class="colour-hex" type="color" value="#000000" aria-label="Colour hex"><input class="colour-file" placeholder="black" aria-label="Colour key"><input type="hidden" class="colour-image" aria-label="Product image"><div class="media-field"><img class="colour-preview" alt="Colour product preview" hidden><input class="colour-upload" type="file" name="colour_image_files[]" accept="image/*" aria-label="Upload colour image"></div><button class="small-button" type="button" data-remove-colour>Remove</button>';
        row.querySelector("[data-remove-colour]").addEventListener("click", () => { row.remove(); sync(); });
        colourList.appendChild(row);
        return row;
    };
    const galleryRow = () => {
        const row = document.createElement("div");
        row.className = "gallery-row";
        row.innerHTML = '<input type="hidden" class="gallery-image" aria-label="Gallery image"><div class="media-field"><img class="gallery-preview" alt="Gallery preview" hidden><input class="gallery-upload" type="file" name="gallery_files[]" accept="image/*" aria-label="Upload gallery image"></div><button class="small-button" type="button" data-remove-gallery>Remove</button>';
        row.querySelector("[data-remove-gallery]").addEventListener("click", () => { row.remove(); sync(); });
        galleryList.appendChild(row);
        return row;
    };
    const variantRow = () => {
        const row = document.createElement("div");
        row.className = "variant-row";
        row.innerHTML = '<input class="variant-field" data-key="sku" placeholder="SKU" aria-label="Variant SKU"><input class="variant-field" data-key="colour" placeholder="Colour" aria-label="Variant colour"><input class="variant-field" data-key="size" placeholder="Size" aria-label="Variant size"><input class="variant-field" data-key="price" type="number" min="0" step="0.01" placeholder="Price" aria-label="Variant price"><input class="variant-field" data-key="stock" type="number" min="0" value="0" placeholder="Stock" aria-label="Variant stock"><input class="variant-field" data-key="image" placeholder="Image URL (optional)" aria-label="Variant image URL"><button class="small-button" type="button" data-remove-variant>Remove</button>';
        row.querySelector("[data-remove-variant]").addEventListener("click", () => { row.remove(); sync(); });
        variantList.appendChild(row);
    };
    const bindPreview = (row, fileSelector, imageSelector) => {
        const upload = row.querySelector(fileSelector);
        const preview = row.querySelector(imageSelector);
        if (!upload || !preview) return;
        upload.addEventListener("change", () => {
            const file = upload.files[0];
            if (!file) return;
            preview.src = URL.createObjectURL(file);
            preview.hidden = false;
            sync();
        });
    };
    form.querySelectorAll(".colour-row").forEach((row) => bindPreview(row, ".colour-upload", ".colour-preview"));
    form.querySelectorAll(".gallery-row").forEach((row) => bindPreview(row, ".gallery-upload", ".gallery-preview"));
    form.querySelector("[data-add-colour]").addEventListener("click", () => { const row = colourRow(); bindPreview(row, ".colour-upload", ".colour-preview"); sync(); });
    form.querySelector("[data-add-gallery]").addEventListener("click", () => { const row = galleryRow(); bindPreview(row, ".gallery-upload", ".gallery-preview"); sync(); });
    form.querySelector("[data-add-variant]").addEventListener("click", () => { variantRow(); sync(); });
    form.querySelectorAll("[data-remove-colour]").forEach((button) => button.addEventListener("click", () => { button.closest(".colour-row").remove(); sync(); }));
    form.querySelectorAll("[data-remove-gallery]").forEach((button) => button.addEventListener("click", () => { button.closest(".gallery-row").remove(); sync(); }));
    form.querySelectorAll("[data-remove-variant]").forEach((button) => button.addEventListener("click", () => { button.closest(".variant-row").remove(); sync(); }));
    form.querySelectorAll("[data-editor-tab]").forEach((button) => button.addEventListener("click", () => {
        form.querySelectorAll("[data-editor-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
        form.querySelectorAll("[data-tab-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.tabPanel === button.dataset.editorTab));
    }));
    document.querySelectorAll("[data-rich-editor]").forEach((textarea) => {
        if (!window.ClassicEditor) return;
        window.ClassicEditor.create(textarea, {
            toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
        }).then((editor) => richEditors.push(editor)).catch(() => undefined);
    });
    form.addEventListener("submit", () => {
        richEditors.forEach((editor) => editor.updateSourceElement());
        sync();
    });
    sync();
})();
</script>
