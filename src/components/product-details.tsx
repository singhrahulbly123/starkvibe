"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { mrpPrice, products, productImage, salePrice, type Product } from "@/lib/catalogue";
import { productFit, sizeGuideFor, sizesFor } from "@/lib/product-details";
import { productMaterial, productSeoDescription, productSku } from "@/lib/product-seo";
import { trackEvent } from "@/lib/analytics";
import { ProductGallery } from "./product-gallery";
import { ProductReviews } from "./product-reviews";
import { Reveal } from "./reveal";
import { ShopProductCard } from "./shop-product-card";

const container = "mx-auto max-w-[1400px] px-5 lg:px-12";
const sectionHeading =
  "font-display text-[clamp(46px,6vw,92px)] leading-[.88] font-black uppercase";
const eyebrow = "mb-[18px] text-[13px] font-bold tracking-[.18em] uppercase";
const comparisonOrder = [
  "regular",
  "kids",
  "oversized",
  "polo",
  "terry",
  "sweatshirt",
  "hoodie",
];
const comparisonNames: Record<string, string> = {
  regular: "Regular Fit Tee",
  kids: "Kids Tee",
  oversized: "Oversized Tee",
  polo: "Polo, Matty",
  terry: "Oversized French Terry Tee",
  sweatshirt: "Fleece Sweatshirt",
  hoodie: "Fleece Hoodie",
};
const benefits = [
  "100% premium cotton",
  "Double bio-washed",
  "Silicon washed",
  "Double stitched seams",
];

export function ProductDetails({
  product,
  initialColour,
}: {
  product: Product;
  initialColour: number;
}) {
  const [colourIndex, setColourIndex] = useState(initialColour);
  const [view, setView] = useState("Front");
  const [size, setSize] = useState(sizesFor(product)[2]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeFaq, setActiveFaq] = useState("Benefits");
  const [relatedColours, setRelatedColours] = useState<Record<string, number>>({});
  const colour = product.colours[colourIndex];
  const fit = productFit(product);
  const sizeGuide = sizeGuideFor(product);
  const fabric =
    product.category === "fleece"
      ? "100% cotton fleece"
      : product.id === "terry"
        ? "100% cotton French Terry"
        : "100% premium cotton";
  const description = `Crafted from ${fabric.toLowerCase()} for everyday comfort and durability. Double bio-washed and silicon washed for a soft, smooth finish and colour that lasts, with double stitched seams for strength and a clean, ${fit.toLowerCase()} fit.`;
  const finish = `${fabric} at ${product.gsm} GSM. Double bio-washed and silicon washed for a soft, smooth surface and long-lasting colour. Double stitched seams for strength and a clean, premium fit.`;
  const weightPosition = ((product.gsm - 180) / 170) * 100;
  const related = [
    "terry",
    "regular",
    "polo",
    "hoodie",
    "oversized",
    "sweatshirt",
    "kids",
  ]
    .filter((id) => id !== product.id)
    .slice(0, 4)
    .map((id) => products.find((p) => p.id === id)!);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "917060421033";

  useEffect(() => {
    trackEvent("view_item", {
      currency: "INR",
      value: salePrice(product),
      items: [{ item_id: product.id, item_name: product.name, price: salePrice(product) }],
    });
  }, [product]);

  function selectColour(index: number) {
    setColourIndex(index);
    setAdded(false);
    const url = new URL(window.location.href);
    url.searchParams.set("colour", product.colours[index].file);
    window.history.replaceState(null, "", url.toString());
  }
  function prepareQuote() {
    sessionStorage.setItem(
      "starkvibe-enquiry",
      `${quantity} × ${product.name}, ${colour.name}, size ${size}\nPrinting requirements: `,
    );
  }
  function addToBag() {
    trackEvent("add_to_cart", {
      currency: "INR",
      value: quantity * salePrice(product),
      items: [{ item_id: product.id, item_name: product.name, quantity, price: salePrice(product) }],
    });
    window.dispatchEvent(
      new CustomEvent("starkvibe-add-to-bag", {
        detail: {
          key: `${product.id}-${colourIndex}-${size}`,
          product,
          colour: colourIndex,
          size,
          quantity,
        },
      }),
    );
    setAdded(true);
  }
  const specs = [
    ["Fabric", fabric],
    ["SKU", productSku(product)],
    ["Weight", `${product.gsm} GSM`],
    ["Fit", fit],
    ["Finish", "Double bio-washed, silicon washed"],
    ["Construction", "Double stitched seams"],
    ["Colours", `${product.colours.length} shades`],
    [
      "Best for",
      product.id === "kids"
        ? "Active days, teams, custom printing"
        : "Everyday, streetwear, custom printing",
    ],
  ];
  const productLabel =
    product.id === "kids"
      ? "kids cotton t-shirt"
      : product.id === "polo"
        ? "cotton polo t-shirt"
        : product.category === "fleece"
          ? product.id === "hoodie"
            ? "cotton fleece hoodie"
            : "cotton fleece sweatshirt"
          : product.id === "terry"
            ? "French Terry t-shirt"
            : "cotton t-shirt";
  const useCases =
    product.id === "kids"
      ? "school days, playtime, family outings and custom birthday wear"
      : product.category === "fleece"
        ? "cool mornings, travel, casual layering and event merchandise"
        : "everyday outfits, streetwear looks, group events and custom gifts";
  const colourNames = product.colours.map((item) => item.name).join(", ");
  const accordion = [
    [
      "Benefits",
      `${product.name} is designed as a dependable ${productLabel} for people who want comfort, structure and an easy styling experience in one piece. At ${product.gsm} GSM, it gives you a clear sense of fabric weight without making the garment difficult to wear. The ${fit.toLowerCase()} shape works well on its own and also layers naturally with denim, trousers, jackets or seasonal outerwear. It is a practical choice for ${useCases}.\n\nThe garment is made for repeat wear rather than a one-time look. Double bio-washing and silicon washing help create a softer hand feel, while double stitched seams support the areas that experience regular movement. That balance makes it useful for personal wardrobes, family orders, team clothing, college groups, birthday celebrations and event gifting. If you are planning custom printing, the clean surface gives your artwork a clear base and lets the design remain the focus.\n\nThe available colour range includes ${colourNames}. This gives you room to create coordinated outfits, mixed-colour group orders or a simple everyday rotation. Choose a classic shade for maximum versatility, or select a brighter colour when the garment needs to feel more expressive. Every product detail, including size, shade and quantity, can be confirmed before a larger custom printing order is produced.`,
    ],
    [
      "Fabric and finish",
      `${finish} The fabric choice is intended to feel substantial while remaining comfortable across normal daily movement. The ${fit.toLowerCase()} fit gives the garment a clear silhouette, so it can work as a standalone piece without looking unfinished. It also leaves enough room for natural movement, making it suitable for active days, casual styling and planned group appearances.\n\nThe surface has been prepared for a smoother, cleaner finish. Double bio-washing helps reduce a rough hand feel and gives the fabric a more broken-in character, while silicon washing supports a soft touch. Double stitched seams add strength at important construction points and help the garment hold its shape through regular use. These details matter when you are buying one piece for yourself, ordering matching clothing for a party or preparing custom printed t-shirts and hoodies for an event.\n\nFor artwork, the flat front and clean construction provide a dependable starting point for custom printing. You can share your design, preferred colour, quantity and size breakdown before production. The team can then confirm the most suitable print approach, available quantities and expected turnaround. This makes the product useful not only as everyday clothing, but also as a considered base for birthday t-shirts, party outfits, event merchandise and thoughtful personalised gifts.`,
    ],
    [
      "Care",
      `To keep your ${productLabel} looking its best, wash it gently with similar colours and follow the care label attached to the garment. Turn printed garments inside out before washing to reduce unnecessary friction on the artwork. Use a mild detergent, avoid direct high heat and dry away from harsh sunlight when possible. These simple habits help preserve the colour, softness and overall finish for longer.\n\nAvoid using strong bleach or aggressive treatment unless the care label specifically allows it. Do not iron directly over a printed design. If ironing is needed, turn the garment inside out or place a thin cloth between the iron and the artwork. Store the piece folded or on a suitable hanger once fully dry. Proper care is especially useful for group orders because it helps different garments continue to look consistent after repeated wear.\n\nBefore ordering, check the size guide and compare the measurements with a garment you already like. For custom printing, confirm the artwork, print placement, colour, size range and quantity before production begins. This reduces errors and gives the team a clear brief for birthday clothing, party groups, event uniforms or personalised gifting. If you need help selecting a size, shade or print quantity, send an enquiry and the team can guide you before the order is confirmed.`,
    ],
    [
      "Shipping and printing",
      `Shipping charges, delivery timelines and return terms are confirmed before your order is placed. For a standard order, the team will confirm the selected product, colour, size and quantity. For custom printing, they will also review your artwork, print position, print method, order quantity and production timeline before approval. This keeps the process clear and helps avoid surprises at the final stage.\n\nThese garments are suitable for custom birthday t-shirts, party group clothing, school or college events, family celebrations, team activities and personalised gifts. You can order a single piece for a special present or discuss a larger quantity when several people need a coordinated look. Mixed colours may be possible depending on the order, so share your preferred colour plan and size breakdown when you contact the team.\n\nFor the best result, send a high-quality logo, illustration or text design and mention the intended garment colour. The team can confirm whether the artwork needs adjustment and whether the chosen design is suitable for the selected fabric. Production begins after the important details are agreed. If you are unsure what to order, tell us the occasion, number of people, preferred garments and delivery requirement. We will help shape the order around your event rather than treating it like a generic bulk purchase.`,
    ],
  ];
  const faqPoints: Record<string, string[]> = {
    Benefits: [
      `${product.gsm} GSM ${fabric.toLowerCase()} with a structured feel`,
      `${fit} fit for everyday styling and easy movement`,
      "Double stitched seams for dependable everyday wear",
      `Available in ${colourNames} for single pieces or coordinated groups`,
    ],
    "Fabric and finish": [
      fabric,
      `${product.gsm} GSM weight`,
      "Double bio-washed and silicon washed surface",
      "Clean base for custom birthday, party and event printing",
    ],
    Care: [
      "Wash gently with similar colours",
      "Turn printed garments inside out before washing",
      "Avoid strong bleach and direct high heat",
      "Do not iron directly over printed artwork",
    ],
    "Shipping and printing": [
      "Confirm product, colour, size and quantity before ordering",
      "Share artwork and print placement for custom orders",
      "Mention your event date and delivery requirement",
      "Suitable for birthdays, parties, events and personalised gifts",
    ],
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: productSeoDescription(product),
    sku: productSku(product),
    brand: { "@type": "Brand", name: "StarkVibe" },
    category: `${product.category} clothing`,
    material: productMaterial(product),
    audience: {
      "@type": "PeopleAudience",
      suggestedGender: "unisex",
      suggestedMinAge: product.id === "kids" ? 2 : undefined,
    },
    image: product.colours.map(
      (item) => `https://starkvibe.com${productImage(product, item)}`,
    ),
    color: product.colours.map((item) => item.name),
    size: sizesFor(product),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Fabric weight", value: `${product.gsm} GSM` },
      { "@type": "PropertyValue", name: "Fit", value: fit },
      { "@type": "PropertyValue", name: "Finish", value: "Double bio-washed and silicon washed" },
      { "@type": "PropertyValue", name: "Construction", value: "Double stitched seams" },
    ],
    offers: {
      "@type": "Offer",
      url: `https://starkvibe.com/products/${product.id}`,
      priceCurrency: "INR",
      price: salePrice(product),
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnLink: "https://starkvibe.com/returns-policy",
      },
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: accordion.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`${container} flex flex-wrap justify-between gap-x-6 gap-y-2 pt-1 pb-6 text-sm text-[#55544f]`}
      >
        <ol className="flex flex-wrap items-center gap-2.5">
          <li>
            <Link href="/" className="inline-block py-2.5">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/shop" className="inline-block py-2.5">
              {product.category === "fleece"
                ? "Fleece"
                : product.category === "polo"
                  ? "Polos"
                  : product.category === "kids"
                    ? "Kids"
                    : "T-shirts"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-bold text-ink">
            {product.name}
          </li>
        </ol>
        <Link
          href="/shop"
          className="border-b border-ink py-2.5 font-bold text-ink"
        >
          ← Back to the range
        </Link>
      </nav>
      <section
        id="product"
        className={`${container} grid items-start gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,1fr)] lg:gap-12 xl:gap-[72px]`}
      >
        <ProductGallery
          product={product}
          colour={colour}
          view={view}
          onViewChange={setView}
          onColourChange={selectColour}
        />
        <div className="min-w-0 max-w-[560px]">
          <p className="mb-3.5 text-[13px] font-bold tracking-[.18em] text-olive uppercase">
            {product.category === "fleece"
              ? "Cotton fleece"
              : product.category === "polo"
                ? "Polo"
                : product.category === "kids"
                  ? "Kids wear"
                  : "T-shirts"}{" "}
            · {fit} fit
          </p>
          <h1 className="mb-5 font-display text-[clamp(52px,6vw,96px)] leading-[.88] font-black uppercase">
            {product.id === "oversized" ? (
              <>
                Oversized
                <br />
                220 GSM
                <br />
                cotton tee
              </>
            ) : product.id === "terry" ? (
              <>
                Oversized
                <br />
                240 GSM
                <br />
                French Terry
              </>
            ) : product.id === "regular" ? (
              <>
                Regular fit
                <br />
                180 GSM
                <br />
                cotton tee
              </>
            ) : product.id === "polo" ? (
              <>
                Polo
                <br />
                220 GSM
                <br />
                Matty tee
              </>
            ) : product.id === "kids" ? (
              <>
                Kids regular
                <br />
                180 GSM
                <br />
                cotton tee
              </>
            ) : (
              <>
                {product.gsm} GSM
                <br />
                fleece
                <br />
                {product.id}
              </>
            )}
          </h1>
          <div className="mb-6 flex items-baseline gap-3.5">
            <span className="flex items-baseline gap-3.5">
              <del className="text-base text-[#77756c]">MRP ₹{mrpPrice(product)}</del>
              <span className="text-[34px] font-bold">₹{salePrice(product)}</span>
            </span>
            <span className="text-sm text-[#55544f]">100% cotton</span>
          </div>
          <p className="mb-7 text-[17px] leading-[1.6] text-[#3f3e3a]">
            {description}
          </p>
          <div className="mb-8 border border-ink px-5 pt-5 pb-4">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <span className="text-sm font-bold">Fabric weight</span>
              <span className="text-[13px] text-[#55544f]">
                Light to heavy across our range
              </span>
            </div>
            <div className="relative mb-3 h-2.5 bg-[#d6d3c9]">
              <div
                style={{ width: `${weightPosition}%` }}
                className="absolute inset-y-0 left-0 bg-ink"
              />
              <span
                style={{ left: `${weightPosition}%` }}
                className="absolute -top-[7px] -ml-0.5 h-6 w-1 bg-olive"
              />
            </div>
            <div className="flex justify-between text-[13px] font-semibold">
              <span>180</span>
              <span className="font-extrabold text-olive">
                {product.gsm} GSM
              </span>
              <span>350</span>
            </div>
          </div>
          <p className="mb-3.5 text-sm font-bold">
            Colour — <span className="font-medium">{colour.name}</span>
          </p>
          <div
            role="group"
            aria-label="Choose colour"
            className="mb-[30px] flex flex-wrap gap-1.5"
          >
            {product.colours.map((c, i) => (
              <button
                key={c.file}
                aria-label={c.name}
                aria-pressed={i === colourIndex}
                onClick={() => selectColour(i)}
                className="flex size-12 items-center justify-center"
              >
                <span
                  style={{ backgroundColor: c.hex }}
                  className={`size-[34px] rounded-full border border-ink/30 ${i === colourIndex ? "ring-2 ring-ink ring-offset-[3px] ring-offset-paper" : ""}`}
                />
              </button>
            ))}
          </div>
          <div className="mb-3.5 flex items-baseline justify-between">
            <span className="text-sm font-bold">
              Size — <span className="font-medium">{size}</span>
            </span>
            <a
              href="#sizes"
              className="border-b border-ink py-2.5 text-sm font-semibold"
            >
              Size guide
            </a>
          </div>
          <div
            role="group"
            aria-label="Choose size"
            className="mb-[30px] flex flex-wrap gap-2"
          >
            {sizesFor(product).map((s) => (
              <button
                key={s}
                aria-label={`Size ${s}`}
                aria-pressed={s === size}
                onClick={() => {
                  setSize(s);
                  setAdded(false);
                }}
                className={`h-[54px] min-w-[62px] border border-ink px-4 text-[15px] font-bold transition-colors ${s === size ? "bg-ink text-paper" : "hover:bg-ink/10"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mb-2.5 flex flex-wrap gap-2.5">
            <div className="flex h-[60px] items-center border border-ink">
              <button
                aria-label="Decrease quantity"
                disabled={quantity === 1}
                onClick={() => {
                  setQuantity((q) => Math.max(1, q - 1));
                  setAdded(false);
                }}
                className="flex h-14 w-12 items-center justify-center disabled:cursor-default disabled:opacity-30"
              >
                <Minus size={16} />
              </button>
              <span
                aria-live="polite"
                className="w-[38px] text-center font-bold"
              >
                {quantity}
              </span>
              <button
                aria-label="Increase quantity"
                disabled={quantity === 99}
                onClick={() => {
                  setQuantity((q) => Math.min(99, q + 1));
                  setAdded(false);
                }}
                className="flex h-14 w-12 items-center justify-center disabled:opacity-30"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={addToBag}
              className={`h-[60px] flex-[1_1_220px] font-bold transition-colors ${added ? "bg-gold text-ink" : "bg-ink text-paper hover:bg-olive"}`}
            >
              {added
                ? "Added to bag ✓"
                : `Add to bag — ₹${salePrice(product) * quantity}`}
            </button>
          </div>
          <Link
            href="/#custom"
            onClick={prepareQuote}
            className="mb-7 flex h-14 w-full items-center justify-center border border-ink px-3 text-center text-[15px] font-bold transition-colors hover:bg-ink hover:text-paper"
          >
            Need it custom printed? Get a quote
          </Link>
          <div className="mb-8 grid grid-cols-1 gap-x-5 gap-y-3 text-sm font-semibold sm:grid-cols-2">
            {benefits.map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <Check
                  size={20}
                  strokeWidth={2.2}
                  className="shrink-0 text-olive"
                />
                {text}
              </div>
            ))}
          </div>
          <div className="hidden w-full border-t border-ink" aria-label="Product FAQs">
            <div className="flex w-full overflow-x-auto border-b border-ink">
              {accordion.map(([title]) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActiveFaq(title)}
                  aria-selected={activeFaq === title}
                  role="tab"
                  className={`min-w-max border-b-2 px-4 py-4 text-left text-sm font-bold transition-colors first:pl-0 ${activeFaq === title ? "border-ink text-ink" : "border-transparent text-ink/50 hover:text-ink"}`}
                >
                  {title}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="w-full py-6">
              <p className="w-full text-[15px] leading-[1.65] text-[#3f3e3a]">
                {accordion.find(([title]) => title === activeFaq)?.[1]}
              </p>
            </div>
          </div>
          <div className="hidden border-t border-ink">
            {accordion.map(([title, body], i) => (
              <details
                key={title}
                open={i === 0}
                className="group border-b border-ink"
              >
                <summary className="flex list-none items-center justify-between gap-4 py-[22px] text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {title}
                  <span className="text-[28px] font-normal group-open:hidden">
                    +
                  </span>
                  <span className="hidden text-[28px] font-normal group-open:block">
                    −
                  </span>
                </summary>
                <p className="pb-6 text-[15px] leading-[1.65] text-[#3f3e3a]">
                  {body}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className={`${container} w-full pt-10`}>
        <div className="w-full border-t border-ink" aria-label="Product FAQs">
          <div className="flex w-full overflow-x-auto border-b border-ink">
            {accordion.map(([title]) => (
              <button
                key={title}
                type="button"
                onClick={() => setActiveFaq(title)}
                aria-selected={activeFaq === title}
                role="tab"
                className={`min-w-max border-b-2 px-5 py-5 text-left text-sm font-bold transition-colors first:pl-0 ${activeFaq === title ? "border-ink text-ink" : "border-transparent text-ink/50 hover:text-ink"}`}
              >
                {title}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="w-full py-8">
            <div className="space-y-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {faqPoints[activeFaq].map((point) => (
                  <li
                    key={point}
                    className="border-l-2 border-olive pl-4 text-[15px] leading-[1.5] font-semibold text-[#3f3e3a]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <div className="space-y-5 text-[15px] leading-[1.7] text-[#3f3e3a]">
                {accordion
                  .find(([title]) => title === activeFaq)?.[1]
                  .split("\n\n")
                  .map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20 bg-ink text-paper lg:mt-[136px]">
        <div
          className={`${container} grid items-end gap-14 py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:py-28`}
        >
          <Reveal>
            <p className={`${eyebrow} text-gold`}>Spec sheet</p>
            <p className="font-display text-[clamp(150px,22vw,330px)] leading-[.8] font-black text-gold">
              {product.gsm}
            </p>
            <h2 className="mt-3 font-display text-[44px] leading-none font-black uppercase">
              GSM of
              <br />
              honest cotton
            </h2>
          </Reveal>
          <dl className="border-t border-[#3a3a36]">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-6 border-b border-[#3a3a36] py-5 text-[17px]"
              >
                <dt className="text-[#b9b7ae]">{label}</dt>
                <dd className="text-right font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section
        className={`${container} grid gap-12 pt-20 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-24 lg:pt-[136px]`}
      >
        <Reveal>
          <p className={`${eyebrow} text-olive`}>Where it sits</p>
          <h2 className={`${sectionHeading} mb-6`}>
            {product.gsm === 220 ? (
              <>
                Right in
                <br />
                <span className="lg:whitespace-nowrap">the middle.</span>
              </>
            ) : product.gsm === 180 ? (
              <>
                Light on.
                <br />
                All day.
              </>
            ) : product.gsm === 240 ? (
              <>
                More body.
                <br />
                More structure.
              </>
            ) : (
              <>
                The heaviest.
                <br />
                The warmest.
              </>
            )}
          </h2>
          <p className="max-w-[440px] text-[17px] leading-[1.6] text-[#3f3e3a]">
            {product.gsm === 220
              ? "At 220 GSM this piece has real body without feeling heavy. Lighter tees sit below it in the range, French Terry and fleece sit above."
              : `At ${product.gsm} GSM, ${product.id === "terry" ? "French Terry brings softness and structure" : product.gsm === 180 ? "cotton stays light and easy for everyday wear" : "cotton fleece adds warmth and a substantial feel"}. Compare its fabric weight with the rest of the range.`}
          </p>
        </Reveal>
        <div className="flex flex-col gap-2.5">
          {comparisonOrder.map((id) => {
            const p = products.find((p) => p.id === id)!;
            return (
              <div
                key={id}
                className="grid items-center gap-2 sm:grid-cols-[200px_1fr] sm:gap-4"
              >
                <Link
                  href={`/products/${id}`}
                  className={`text-sm ${id === product.id ? "font-extrabold" : "font-medium"}`}
                >
                  {comparisonNames[id]}
                  {id === product.id ? " (this)" : ""}
                </Link>
                <div className="min-w-0">
                  <div
                    style={{ width: `${(p.gsm / 350) * 100}%` }}
                    className={`flex h-11 min-w-[76px] items-center justify-end px-3.5 text-sm font-extrabold ${id === product.id ? "bg-gold text-ink" : "bg-ink text-paper"}`}
                  >
                    {p.gsm} GSM
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className={`${container} pt-20 lg:pt-[136px]`}>
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${eyebrow} text-olive`}>
                {product.colours.length === 5
                  ? "Five"
                  : product.colours.length === 4
                    ? "Four"
                    : "Two"}{" "}
                colours
              </p>
              <h2 className={sectionHeading}>
                Pick your
                <br />
                shade.
              </h2>
            </div>
            <p className="max-w-[360px] text-[17px] leading-[1.6] text-[#3f3e3a]">
              Tap a tile to see it on the piece above. Hex codes shown so you
              can match your brand exactly.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {product.colours.map((c, i) => {
            const h = c.hex.slice(1);
            const light =
              (0.299 * parseInt(h.slice(0, 2), 16) +
                0.587 * parseInt(h.slice(2, 4), 16) +
                0.114 * parseInt(h.slice(4, 6), 16)) /
                255 >
              0.55;
            return (
              <button
                key={c.file}
                aria-label={`Pick ${c.name}`}
                aria-pressed={i === colourIndex}
                onClick={() => {
                  selectColour(i);
                  setView("Front");
                  document
                    .getElementById("product")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  backgroundColor: c.hex,
                  color: light ? "#0d0d0c" : "#f1f0eb",
                }}
                className={`flex h-[220px] flex-col items-start justify-between border-2 p-[18px] text-left transition-transform duration-300 hover:-translate-y-1 lg:h-[260px] ${i === colourIndex ? "border-ink" : "border-ink/15"}`}
              >
                <span className="text-xs font-extrabold tracking-[.12em] uppercase">
                  {i === colourIndex ? "Selected" : "Select"}
                </span>
                <span>
                  <span className="block font-display text-[34px] leading-none font-black uppercase lg:text-[30px] lg:whitespace-nowrap">
                    {c.name}
                  </span>
                  <span className="mt-1.5 block text-[13px] tracking-[.08em]">
                    {c.hex.toUpperCase()}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <section id="sizes" className={`${container} pt-20 lg:pt-[136px]`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(44px,5vw,76px)] leading-[.9] font-black uppercase">
            Size guide
          </h2>
          <p className="text-sm text-[#55544f]">
            {product.name} · {fit} fit · Available sizes: {sizesFor(product).join(", ")}
          </p>
        </div>
        <div
          role="region"
          aria-label="Size measurements"
          tabIndex={0}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[560px] border-collapse text-base">
            <caption className="sr-only">
              {product.name} size measurements in inches.
            </caption>
            <thead>
              <tr className="border-y border-ink text-left">
                {["Size", "Chest", "Length", "Shoulder", "Sleeve"].map(
                  (label) => (
                    <th
                      key={label}
                      scope="col"
                      className="px-3 py-[18px] font-extrabold first:pl-0"
                    >
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {sizeGuide.map((measurement) => (
                <tr
                  key={measurement.size}
                  className="border-b border-[#cfccc2] last:border-ink"
                >
                  <th
                    scope="row"
                    className="py-[18px] pr-3 text-left font-extrabold"
                  >
                    {measurement.size}
                  </th>
                  {[measurement.chest, measurement.length, measurement.shoulder, measurement.sleeve].map((value, i) => (
                    <Fragment key={i}>
                    <td key={`measurement-${i}`} className="px-3 py-[18px] text-[#55544f]">
                      {value}&quot;
                    </td>
                    <td key={i} className="hidden px-3 py-[18px] text-[#77756c]">
                      <span aria-label="Measurement pending">—</span>
                    </td>
                    </Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[#55544f]">
          Measurements are approximate garment dimensions in inches. Compare
          them with a similar garment you already own before ordering.
        </p>
      </section>
      <section
        id="custom"
        className="mt-20 bg-[#2a4f00] text-paper lg:mt-[136px]"
      >
        <div
          className={`${container} flex flex-wrap items-center justify-between gap-x-16 gap-y-10 py-20 lg:py-24`}
        >
          <Reveal className="min-w-0 flex-[1_1_420px]">
            <p className={`${eyebrow} mb-4 text-gold`}>Custom printing</p>
            <h2 className="mb-5 font-display text-[clamp(46px,6.4vw,100px)] leading-[.88] font-black uppercase">
              Your logo.
              <br />
              This fabric.
            </h2>
            <p className="max-w-[480px] text-[17px] leading-[1.6] text-[#d8e2c8]">
              This piece is made to take custom printing. Share
              your idea and we will come back with a quote.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#custom"
              onClick={prepareQuote}
              className="flex h-[60px] items-center bg-gold px-9 font-bold text-ink transition-colors hover:bg-paper"
            >
              Request a quote
            </Link>
            <a
              href={
                whatsapp
                  ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi StarkVibe, I'd like to customise ${product.name}.`)}`
                  : "/#custom"
              }
              onClick={prepareQuote}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noopener noreferrer" : undefined}
              className="flex h-[60px] items-center border border-paper px-9 font-semibold transition-colors hover:bg-paper hover:text-ink"
            >
              {whatsapp ? "WhatsApp us" : "Talk to the team"}
            </a>
          </div>
        </div>
      </section>
      <ProductReviews product={product} />
      <section className={`${container} pt-20 lg:pt-[136px]`}>
        <Reveal>
          <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className={`${eyebrow} text-olive`}>More from the range</p>
              <h2 className={sectionHeading}>
                Try another
                <br />
                weight.
              </h2>
            </div>
            <Link
              href="/shop"
              className="border-b border-ink py-2.5 text-[15px] font-bold"
            >
              See the full range
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => {
            const defaultColourIndex =
              p.id === "regular"
                ? 1
                : p.id === "hoodie"
                  ? 3
                  : p.id === "terry"
                    ? 1
                    : 0;
            const selectedColour = relatedColours[p.id] ?? defaultColourIndex;
            return (
              <ShopProductCard
                key={p.id}
                product={p}
                colourIndex={selectedColour}
                onColourChange={(index) =>
                  setRelatedColours((current) => ({ ...current, [p.id]: index }))
                }
                saved={false}
                onSave={() => undefined}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
