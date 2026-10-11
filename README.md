# StarkVibe

Next.js App Router storefront, implemented from the supplied weight-led HTML and PNG references. Styling uses Tailwind CSS. Motion adds restrained, reduced-motion-aware section reveals; supplied product photography replaces the reference illustrations.

Product detail pages follow the supplied product HTML/PNG reference. Open `/products/oversized` for the 220 GSM tee. All seven catalogue pieces have their own page, reached from the home product cards and related products.

The shop is at `/shop`, built from the supplied shop PNG. It includes fabric weight tabs, category/colour/price filters, sorting, saved products, colour variants, a branding banner and a GSM guide. Filter choices are reflected in the URL, and saved products persist in the browser. Header navigation, home shopping links, product back links and footer categories lead to the shop.

The cart is at `/cart`, built from `StarkVibe — Cart-html/Cart-New.dc.html` and the supplied PNG. It uses the existing bag data, with quantity controls, removal, saved-for-later variants, order notes, totals and quick-add recommendations. Bag quantities and saved variants persist locally; the header count updates immediately. New bags start empty. The cart screenshots use the reference's three sample lines only for verification.

The checkout CTA passes the bag and order note into the existing enquiry form. The team confirms stock, shipping and payment; no payment gateway or order-processing backend is connected. No shipping threshold, payment availability or return promise has been invented from the reference placeholders.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm start`.

## Brand contact

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the full international number (digits only). The quote form opens a prepared WhatsApp message. Without a configured contact it downloads the enquiry and clearly tells the customer it has not been sent. No payment, order processing or mail service is connected.

Product data and prices are in `src/lib/catalogue.ts`. Supplied assets are served from `public/products`, `public/categories` and `public/branding`. Category assets remain available for future collection pages; the home page follows the reference's seven-piece product grid.

The gallery, buy box, specifications, weight comparison, colour tiles, size guide, branding banner, reviews and related products use Tailwind. Big Shoulders and Hanken Grotesk are hosted locally in `src/app/fonts` with their OFL licenses, so builds do not need to download fonts.

Back-view photography, size measurements and published customer reviews were not supplied. The page shows clear empty states for these. The fabric tab uses an enlarged supplied detail photograph. Review submissions open a prepared email when `NEXT_PUBLIC_CONTACT_EMAIL` is set; otherwise they download a review draft. Bag contents persist in the browser and are passed into the quote form when requested.

## Checks

```sh
npm run typecheck
npm run build
```

Desktop (1440px) and mobile (390px) browser checks passed for product filters, colour variants, product details, bag persistence, order-to-enquiry transfer and mobile navigation. Screenshots and the verification result are saved in `artifacts/`.

Product checks cover all seven routes, gallery views, colour URL persistence, sizes, quantity totals, shared bag, quote transfer, review form, product search and mobile navigation. Unknown product URLs return 404.

Shop checks cover combined filters, price and weight sorting, saved product persistence, selected colour handoff to product pages, filter URLs and layout at mobile, tablet and desktop widths. Shop screenshots and results are saved as `artifacts/shop-*`.

Cart checks cover the reference subtotal (₹1,225 for four pieces), quantity recalculation, header count, removal, save/restore, persistence, quick add, order notes, enquiry transfer, product-to-cart navigation and the empty state. Screenshots and results are in `artifacts/cart-*`; layouts were checked at 320, 390, 768, 1024 and 1440 pixels.
