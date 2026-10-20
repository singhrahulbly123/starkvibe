<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Coupon;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class AdminDashboardController extends Controller
{
    public function login(): View
    {
        return view('admin.login');
    }

    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt([...$credentials, 'is_admin' => true], $request->boolean('remember'))) {
            return back()->withErrors(['email' => 'The admin email or password is incorrect.'])->withInput();
        }

        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard'));
    }

    public function dashboard(): View
    {
        $orders = Order::with('user')->latest()->get();
        $coupons = Coupon::latest()->get();
        $section = in_array(request('section'), ['overview', 'coupons', 'products', 'orders'], true) ? request('section') : 'overview';
        $products = Product::orderBy('sort_order')->orderBy('id')->get();

        return view('admin.dashboard', [
            'orders' => $orders,
            'orderCount' => $orders->count(),
            'pendingCount' => $orders->whereIn('status', ['received', 'cancellation_requested'])->count(),
            'cancelledCount' => $orders->where('status', 'cancelled')->count(),
            'deliveredCount' => $orders->where('status', 'delivered')->count(),
            'revenue' => $orders->where('status', '!=', 'cancelled')->sum(fn ($order) => (float) $order->subtotal + (float) $order->shipping_charge - (float) $order->discount_amount),
            'coupons' => $coupons,
            'section' => $section,
            'products' => $products,
        ]);
    }

    public function storeCoupon(Request $request): RedirectResponse
    {
        $data = $this->validateCoupon($request);
        Coupon::create($data);

        return back()->with('status', "Coupon {$data['code']} created.");
    }

    public function updateCoupon(Request $request, Coupon $coupon): RedirectResponse
    {
        $data = $this->validateCoupon($request, $coupon);
        $coupon->update($data);

        return back()->with('status', "Coupon {$data['code']} updated.");
    }

    public function destroyCoupon(Coupon $coupon): RedirectResponse
    {
        $code = $coupon->code;
        $coupon->delete();

        return back()->with('status', "Coupon {$code} deleted.");
    }

    public function storeProduct(Request $request): RedirectResponse
    {
        $data = $this->validateProduct($request);
        Product::create($data);

        return back()->with('status', "Product {$data['name']} created.");
    }

    public function products(): View
    {
        return view('admin.products.index', ['products' => Product::orderBy('sort_order')->orderBy('id')->get()]);
    }

    public function createProduct(): View
    {
        return view('admin.products.create');
    }

    public function editProduct(Product $product): View
    {
        return view('admin.products.edit', ['product' => $product]);
    }

    public function updateProduct(Request $request, Product $product): RedirectResponse
    {
        $data = $this->validateProduct($request, $product);
        $product->update($data);

        return back()->with('status', "Product {$data['name']} updated.");
    }

    public function destroyProduct(Product $product): RedirectResponse
    {
        $name = $product->name;
        $product->delete();

        return back()->with('status', "Product {$name} deleted.");
    }

    private function validateProduct(Request $request, ?Product $product = null): array
    {
        $uniqueSlug = 'unique:products,slug'.($product ? ','.$product->id : '');
        $data = $request->validate([
            'slug' => ['required', 'string', 'max:100', 'regex:/^[a-z0-9-]+$/', $uniqueSlug],
            'name' => ['required', 'string', 'max:160'],
            'gsm' => ['required', 'integer', 'min:1', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0'],
            'sale_price' => ['required', 'numeric', 'min:0'],
            'category' => ['required', 'string', 'max:40'],
            'note' => ['required', 'string', 'max:1000'],
            'long_description' => ['nullable', 'string', 'max:10000'],
            'material' => ['nullable', 'string', 'max:160'],
            'fit' => ['nullable', 'string', 'max:100'],
            'finish' => ['nullable', 'string', 'max:1000'],
            'construction' => ['nullable', 'string', 'max:255'],
            'washing' => ['nullable', 'string', 'max:1000'],
            'best_for' => ['nullable', 'string', 'max:1000'],
            'care_instructions' => ['nullable', 'string', 'max:10000'],
            'shipping_info' => ['nullable', 'string', 'max:10000'],
            'benefits_json' => ['nullable', 'json'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'active' => ['nullable', 'boolean'],
            'colours_json' => ['required', 'json'],
            'gallery_json' => ['nullable', 'json'],
            'colour_image_files' => ['nullable', 'array'],
            'colour_image_files.*' => ['nullable', 'image', 'max:5120'],
            'gallery_files' => ['nullable', 'array'],
            'gallery_files.*' => ['nullable', 'image', 'max:5120'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'canonical_url' => ['nullable', 'url', 'max:500'],
            'labels_json' => ['nullable', 'json'],
            'variants_json' => ['nullable', 'json'],
        ]);
        $colours = json_decode($data['colours_json'], true);
        if (! is_array($colours) || count($colours) < 1) {
            throw \Illuminate\Validation\ValidationException::withMessages(['colours_json' => 'Add at least one valid colour object.']);
        }
        $colourFiles = $request->file('colour_image_files', []);
        foreach ($colours as $index => &$colour) {
            if (! is_array($colour) || ! isset($colour['name'], $colour['hex'], $colour['file'])) {
                throw \Illuminate\Validation\ValidationException::withMessages(['colours_json' => 'Each colour needs name, hex, file and image.']);
            }
            if (isset($colourFiles[$index])) {
                $colour['image'] = $this->storeProductImage($colourFiles[$index]);
            }
            if (empty($colour['image'])) {
                throw \Illuminate\Validation\ValidationException::withMessages(['colours_json' => 'Each colour needs a product image.']);
            }
        }
        unset($colour);
        $data['colours'] = $colours;
        $gallery = $data['gallery_json'] ? json_decode($data['gallery_json'], true) : [];
        if (! is_array($gallery)) {
            throw \Illuminate\Validation\ValidationException::withMessages(['gallery_json' => 'Gallery images must be valid image URLs.']);
        }
        $data['gallery'] = array_values(array_filter($gallery, static fn ($image): bool => is_string($image) && trim($image) !== ''));
        foreach ($request->file('gallery_files', []) as $file) {
            $data['gallery'][] = $this->storeProductImage($file);
        }
        $data['gallery'] = array_values(array_unique($data['gallery']));
        $benefits = $data['benefits_json'] ? json_decode($data['benefits_json'], true) : [];
        $data['benefits'] = is_array($benefits)
            ? array_values(array_filter($benefits, 'is_string'))
            : [];
        $labels = $data['labels_json'] ? json_decode($data['labels_json'], true) : [];
        $data['labels'] = is_array($labels)
            ? array_values(array_filter($labels, 'is_string'))
            : [];
        $variants = $data['variants_json'] ? json_decode($data['variants_json'], true) : [];
        $data['variants'] = is_array($variants)
            ? array_values(array_filter($variants, static fn ($variant): bool => is_array($variant) && ! empty($variant['sku'])))
            : [];
        unset($data['colours_json']);
        unset($data['gallery_json']);
        unset($data['benefits_json']);
        unset($data['labels_json']);
        unset($data['variants_json']);
        $data['active'] = $request->boolean('active');
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        return $data;
    }

    private function storeProductImage($file): string
    {
        $path = $file->store('products', 'public');

        return rtrim(config('app.url'), '/').Storage::url($path);
    }

    private function validateCoupon(Request $request, ?Coupon $coupon = null): array
    {
        $uniqueCode = 'unique:coupons,code'.($coupon ? ','.$coupon->id : '');
        $data = $request->validate([
            'code' => ['required', 'string', 'max:40', 'regex:/^[A-Za-z0-9_-]+$/', $uniqueCode],
            'type' => ['required', 'in:percentage,fixed'],
            'value' => ['required', 'numeric', 'min:0.01'],
            'active' => ['nullable', 'boolean'],
            'starts_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);
        if ($data['type'] === 'percentage' && (float) $data['value'] > 100) {
            throw \Illuminate\Validation\ValidationException::withMessages(['value' => 'Percentage discount cannot exceed 100.']);
        }
        $data['code'] = strtoupper($data['code']);
        $data['active'] = $request->boolean('active');

        return $data;
    }

    public function updateOrder(Request $request, Order $order): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:received,confirmed,processing,shipped,delivered,cancellation_requested,cancelled'],
        ]);
        $order->update($data);

        return back()->with('status', "Order {$order->order_number} updated.");
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
