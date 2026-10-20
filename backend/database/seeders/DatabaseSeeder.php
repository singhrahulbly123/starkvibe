<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Coupon;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if ($email && $password) {
            User::updateOrCreate(
                ['email' => $email],
                ['name' => env('ADMIN_NAME', 'StarkVibe Admin'), 'password' => Hash::make($password), 'is_admin' => true],
            );
        }

        Coupon::updateOrCreate(['code' => 'WINTER20'], ['type' => 'percentage', 'value' => 20, 'active' => true]);

        $colour = static fn (string $name, string $hex, string $file, string $image): array => compact('name', 'hex', 'file', 'image');
        $products = [
            ['slug' => 'oversized-220-gsm-tee', 'name' => 'Oversized 220 GSM Tee', 'gsm' => 220, 'price' => 260, 'sale_price' => 860, 'category' => 'tees', 'note' => '100% cotton. Double bio-washed, silicon washed, double stitched.', 'sort_order' => 5, 'colours' => [
                $colour('Black', '#000000', 'black', '/products/oversized-220-gsm-tee/starkvibe-oversized-t-shirt-advertisement.png'),
                $colour('Brown', '#1b0d00', 'brown', '/products/oversized-220-gsm-tee/starkvibe-oversized-t-shirt-editorial-ad.png'),
                $colour('Avocado Green', '#336000', 'avocado-green', '/products/oversized-220-gsm-tee/starkvibe-avocado-oversized-t-shirt.png'),
                $colour('Beige', '#e6c173', 'beige', '/products/oversized-220-gsm-tee/starkvibe-oversized-t-shirt-editorial-poster.png'),
                $colour('White', '#ffffff', 'white', '/products/oversized-220-gsm-tee/starkvibe-oversized-t-shirt-poster.png'),
            ]],
            ['slug' => 'regular-fit-180-gsm-tee', 'name' => 'Regular Fit 180 GSM Tee', 'gsm' => 180, 'price' => 200, 'sale_price' => 800, 'category' => 'tees', 'note' => 'Everyday comfort and breathability in a clean, structured look.', 'sort_order' => 6, 'colours' => [
                $colour('Black', '#000000', 'black', '/products/regular-fit-180-gsm/starkvibe-mens-black-t-shirt-promo.png'),
                $colour('Sea Green', '#baffd1', 'sea-green', '/products/regular-fit-180-gsm/mint-t-shirt-editorial-advertisement.png'),
                $colour('Wine Maroon', '#8f292b', 'maroon', '/products/regular-fit-180-gsm/starkvibe-maroon-t-shirt-showcase.png'),
                $colour('Midnight Navy', '#020629', 'navy', '/products/regular-fit-180-gsm/starkvibe-navy-t-shirt-feature-poster.png'),
                $colour('White', '#ffffff', 'white', '/products/regular-fit-180-gsm/starkvibe-mens-t-shirt-editorial-poster.png'),
            ]],
            ['slug' => 'oversized-240-gsm-french-terry-tee', 'name' => 'Oversized 240 GSM French Terry Tee', 'gsm' => 240, 'price' => 280, 'sale_price' => 1149, 'category' => 'tees', 'note' => 'French Terry for softness, structure and a refined streetwear look.', 'sort_order' => 7, 'colours' => [
                $colour('Black', '#000000', 'black', '/products/oversized-240-gsm-french-terry/starkvibe-oversized-tee-editorial-ad.png'),
                $colour('Smokey Grey', '#303030', 'smokey-grey', '/products/oversized-240-gsm-french-terry/starkvibe-oversized-t-shirt-lookbook.png'),
                $colour('Camel Beige', '#b8943d', 'beige', '/products/oversized-240-gsm-french-terry/starkvibe-oversized-beige-t-shirt-poster.png'),
                $colour('White', '#ffffff', 'white', '/products/oversized-240-gsm-french-terry/starkvibe-oversized-t-shirt-campaign.png'),
            ]],
            ['slug' => 'polo-220-gsm-matty-tee', 'name' => 'Polo 220 GSM Matty Tee', 'gsm' => 220, 'price' => 300, 'sale_price' => 900, 'category' => 'polo', 'note' => 'Matty fabric. Comfort, breathability and a polished everyday look.', 'sort_order' => 1, 'colours' => [
                $colour('Black', '#000000', 'black', '/products/polo-220-gsm-matty-tee/starkvibe-black-polo-advertisement.png'),
                $colour('White', '#ffffff', 'white', '/products/polo-220-gsm-matty-tee/starkvibe-premium-white-polo-poster.png'),
            ]],
            ['slug' => 'kids-regular-180-gsm-tee', 'name' => 'Kids Regular 180 GSM Tee', 'gsm' => 180, 'price' => 145, 'sale_price' => 745, 'category' => 'kids', 'note' => 'Soft, flexible and built for active days and custom printing.', 'sort_order' => 2, 'colours' => [
                $colour('Black', '#000000', 'black', '/products/180-gsm-kids-cotton-t-shirt/starkvibe-kids-t-shirt-poster.png'),
                $colour('White', '#ffffff', 'white', '/products/180-gsm-kids-cotton-t-shirt/starkvibe-kids-cotton-t-shirt-ad.png'),
                $colour('Pink', '#bf4b76', 'pink', '/products/180-gsm-kids-cotton-t-shirt/pink-starkvibe-kids-t-shirt-poster.png'),
                $colour('Sea Green', '#baffd1', 'sea-green', '/products/180-gsm-kids-cotton-t-shirt/starkvibe-kids-t-shirt-campaign.png'),
                $colour('Orange', '#ff6800', 'orange', '/products/180-gsm-kids-cotton-t-shirt/starkvibe-kids-orange-t-shirt-ad.png'),
            ]],
            ['slug' => '350-gsm-fleece-sweatshirt', 'name' => '350 GSM Fleece Sweatshirt', 'gsm' => 350, 'price' => 480, 'sale_price' => 1470, 'category' => 'fleece', 'note' => 'Cotton fleece with serious warmth, softness and durability.', 'sort_order' => 3, 'colours' => [
                $colour('Black', '#000000', 'black', '/products/350-gsm-fleece-sweatshirt/starkvibe-mens-sweatshirt-showcase.png'),
                $colour('Navy Blue', '#000b27', 'navy-blue', '/products/350-gsm-fleece-sweatshirt/starkvibe-premium-navy-sweatshirt-ad.png'),
                $colour('Off-white', '#fffded', 'off-white', '/products/350-gsm-fleece-sweatshirt/starkvibe-mens-sweatshirt-editorial-ad.png'),
                $colour('Deep Maroon', '#890d0f', 'maroon', '/products/350-gsm-fleece-sweatshirt/starkvibe-maroon-sweatshirt-showcase.png'),
                $colour('Lavender', '#c382e6', 'lavender', '/products/350-gsm-fleece-sweatshirt/lavender-sweatshirt-premium-feature-showcase.png'),
            ]],
            ['slug' => '350-gsm-fleece-hoodie', 'name' => '350 GSM Fleece Hoodie', 'gsm' => 350, 'price' => 505, 'sale_price' => 1570, 'category' => 'fleece', 'note' => 'Cotton fleece for all seasons. Made for streetwear and branding.', 'sort_order' => 4, 'colours' => [
                $colour('Black', '#000000', 'black', '/products/350-gsm-fleece-hoodie/starkvibe-mens-hoodie-feature-poster.png'),
                $colour('Coffee Brown', '#541501', 'coffee-brown', '/products/350-gsm-fleece-hoodie/starkvibe-coffee-brown-hoodie-advertisement.png'),
                $colour('Off-white', '#fffded', 'off-white', '/products/350-gsm-fleece-hoodie/starkvibe-premium-cotton-hoodie-advertisement.png'),
                $colour('Olive Green', '#7ca83d', 'olive-green', '/products/350-gsm-fleece-hoodie/starkvibe-premium-olive-hoodie-poster.png'),
                $colour('Dark Beige', '#d5aa59', 'beige', '/products/350-gsm-fleece-hoodie/premium-camel-hoodie-catalogue.png'),
            ]],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['slug' => $product['slug']], $product + [
                'gallery' => array_values(array_map(static fn (array $colour): string => $colour['image'], $product['colours'])),
                'long_description' => $product['note'].' Designed for repeat wear, custom printing and coordinated group orders. Choose your colour and size, then share your artwork or ordering requirement with the StarkVibe team.',
                'material' => $product['category'] === 'fleece' ? '100% cotton fleece' : '100% premium cotton',
                'fit' => str_contains($product['slug'], 'oversized') ? 'Oversized' : (str_contains($product['slug'], 'kids') ? 'Kids regular' : 'Regular fit'),
                'finish' => 'Double bio-washed and silicon washed for a soft, smooth surface.',
                'construction' => 'Double stitched seams',
                'washing' => 'Wash gently with similar colours. Turn printed garments inside out before washing.',
                'best_for' => 'Everyday wear, custom printing, teams, events and gifting.',
                'care_instructions' => 'Use a mild detergent, avoid direct high heat and do not iron directly over printed artwork.',
                'shipping_info' => 'Standard delivery usually takes 5–7 working days across India. Express delivery usually takes 3–4 working days where available.',
                'benefits' => ['Premium cotton fabric', 'Double bio-washed', 'Silicon washed', 'Double stitched seams'],
                'active' => true,
                'meta_title' => $product['name'].' | StarkVibe',
                'meta_description' => $product['note'].' Shop online from StarkVibe.',
            ]);
        }
    }
}
