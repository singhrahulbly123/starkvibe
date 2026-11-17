"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { mrpPrice, plainRichText, productImage, productSlug, salePrice, type Product } from "@/lib/catalogue";
import { productFit, sizeGuideFor, sizesFor } from "@/lib/product-details";
import { productMaterial, productSeoDescription, productSku } from "@/lib/product-seo";
import { trackEvent } from "@/lib/analytics";
import { ProductGallery } from "./product-gallery";
import { ProductReviews } from "./product-reviews";
import { Reveal } from "./reveal";
import { ShopProductCard } from "./shop-product-card";
import { Breadcrumbs } from "./breadcrumbs";
import { JsonLd } from "./json-ld";
import { faqPageJsonLd } from "@/lib/structured-data";

const container = "mx-auto max-w-[1400px] px-5 lg:px-12";
const sectionHeading =
  "font-display text-[clamp(46px,6vw,92px)] leading-[.88] font-black uppercase";
const eyebrow = "mb-[18px] text-[13px] font-bold tracking-[.18em] uppercase";

export function ProductDetails({
  product,
  initialColour,
  relatedProducts = [],
}: {
  product: Product;
  initialColour: number;
  relatedProducts?: Product[];
}) {
  const [colourIndex, setColourIndex] = useState(initialColour);
  const [view, setView] = useState("Front");
  const [size, setSize] = useState(sizesFor(product)[2]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeFaq, setActiveFaq] = useState("Product details");
  const [relatedColours, setRelatedColours] = useState<Record<string, number>>({});
  const colour = product.colours[colourIndex];
  const fit = product.fit || productFit(product);
  const sizeGuide = sizeGuideFor(product);
  const sizeLabel = product.id === "kids" ? "Age group" : "Size";
  const fabric = product.material || "";
  const description = product.note + " Available sizes: " + sizesFor(product).join(", ") + ".";
  const productDescription = product.long_description || description;
  const detailFabric = product.material || fabric;
  const detailConstruction = product.construction || "";
  const detailWashing = product.washing || "";
  const detailBestFor = product.best_for || "";
  const weightPosition = ((product.gsm - 180) / 170) * 100;
  const related = relatedProducts.filter((item) => item.id !== product.id).slice(0, 4);
  const comparison = [product, ...relatedProducts.filter((item) => item.id !== product.id)].slice(0, 7);
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
    setView("Front");
    setAdded(false);
    const url = new URL(window.location.href);
    if (product.colours.length > 1) {
      url.searchParams.set("colour", product.colours[index].file);
    } else {
      url.searchParams.delete("colour");
    }
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
  const variantSku = productSku(product, colour.name, size);
  const specs = [
    ["Material", detailFabric],
    ["SKU", variantSku || ""],
    ["GSM", product.gsm + " GSM"],
    ["Fit", fit],
    ["Neckline / collar", product.neckline || ""],
    ["Sleeve", product.sleeve || ""],
    ["Construction", detailConstruction],
    ["Colour options", product.colours.map((item) => item.name).join(", ")],
    ["Washing", detailWashing],
    ["Best for", detailBestFor],
  ].filter(([, value]) => Boolean(value));
  const colourNames = product.colours.map((item) => item.name).join(", ");
  const accordion: [string, string][] = [
    ["Product details", productDescription],
    ["Fabric and fit", [detailFabric, product.gsm + " GSM", fit, product.neckline, product.sleeve].filter(Boolean).join(". ")],
    ["Care", product.care_instructions || ""],
    ["Shipping and printing", product.shipping_info || ""],
  ].filter(([, content]) => Boolean(content)) as [string, string][];
  const faqPoints: Record<string, string[]> = {
    "Product details": [detailFabric, product.gsm + " GSM", fit, product.neckline || "", product.sleeve || "", "Colours: " + colourNames, "Sizes: " + sizesFor(product).join(", ")].filter(Boolean),
    "Fabric and fit": [detailFabric, product.gsm + " GSM", fit, product.neckline || "", product.sleeve || ""].filter(Boolean),
    Care: product.care_instructions ? [product.care_instructions] : [],
    "Shipping and printing": product.shipping_info ? [product.shipping_info] : [],
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: productSeoDescription(product),
    ...(product.variants?.length ? { sku: product.variants[0].sku } : {}),
    brand: { "@type": "Brand", name: "StarkVibe" },
    category: `${product.category} clothing`,
    material: detailFabric || productMaterial(product),
    audience: {
      "@type": "PeopleAudience",
    },
    image: product.colours.map(
      (item) => `https://starkvibe.com${productImage(product, item)}`,
    ),
    color: product.colours.map((item) => item.name),
    size: sizesFor(product),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Fabric weight", value: `${product.gsm} GSM` },
      { "@type": "PropertyValue", name: "Fit", value: fit },
      ...(product.neckline ? [{ "@type": "PropertyValue", name: "Neckline or collar", value: product.neckline }] : []),
      ...(product.sleeve ? [{ "@type": "PropertyValue", name: "Sleeve", value: product.sleeve }] : []),
    ],
    offers: {
      "@type": "Offer",
      url: `https://starkvibe.com/products/${productSlug(product)}`,
      priceCurrency: "INR",
      price: salePrice(product),
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnLink: "https://starkvibe.com/returns-policy",
      },
    },
  };
  const faqSchema = faqPageJsonLd(
    accordion.map(([question, answer]) => ({ question, answer })),
  );
  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumbs
        compact
        className="pt-1 pb-6"
        items={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: product.name, path: `/products/${productSlug(product)}` },
        ]}
      />
      <div className={`${container} flex justify-end pb-6`}>
        <Link
          href="/shop"
          className="border-b border-ink py-2.5 font-bold text-ink"
        >
          ← Back to the range
        </Link>
      </div>
      <section
        id="product"
        className={`${container} grid items-start gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,1fr)] lg:gap-12 xl:gap-[72px]`}
      >
        <ProductGallery
          product={product}
          colour={colour}
          view={view}
          onViewChange={setView}
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
          <h1 className="mb-5 font-display text-[clamp(30px,4vw,60px)] leading-[.88] font-black uppercase">
            {product.id === "oversized" ? (
              <>
                Oversized 220 GSM cotton tee
              </>
            ) : product.id === "terry" ? (
              <>
                Oversized 240 GSM French Terry
              </>
            ) : product.id === "regular" ? (
              <>
                Regular fit 180 GSM cotton tee
              </>
            ) : product.id === "polo" ? (
              <>
                Polo 220 GSM Matty tee
              </>
            ) : product.id === "kids" ? (
              <>
                Kids regular 180 GSM cotton tee
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
              {mrpPrice(product) && <del className="text-lg text-ink/55">₹{mrpPrice(product)}</del>}
              <span className="text-[34px] font-bold">₹{salePrice(product)}</span>
            </span>
            <span className="text-sm text-[#55544f]">100% cotton</span>
          </div>
          <div className="mb-7 text-[17px] leading-[1.6] text-[#3f3e3a]">
            {plainRichText(productDescription).split(/\n+/).map((paragraph) => (
              <p key={paragraph} className="mb-3 last:mb-0">{paragraph}</p>
            ))}
          </div>
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
          {product.colours.length > 1 ? (
            <>
              <p className="mb-3.5 text-sm font-bold">
                Colour — <span className="font-medium">{colour.name}</span>
              </p>
              <div role="group" aria-label="Choose colour" className="mb-[30px] flex flex-wrap gap-1.5">
                {product.colours.map((c, i) => (
                  <button key={c.file} aria-label={c.name} aria-pressed={i === colourIndex} onClick={() => selectColour(i)} className="flex size-12 items-center justify-center">
                    <span style={{ backgroundColor: c.hex }} className={`size-[34px] rounded-full border border-ink/30 ${i === colourIndex ? "ring-2 ring-ink ring-offset-[3px] ring-offset-paper" : ""}`} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="mb-[30px] text-sm font-bold">Colour: <span className="font-medium">{colour.name}</span></p>
          )}
          <div className="mb-3.5 flex items-baseline justify-between">
            <span className="text-sm font-bold">
              {sizeLabel} — <span className="font-medium">{size}</span>
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
                aria-label={`${sizeLabel} ${s}`}
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
            href="/custom-printing"
            onClick={prepareQuote}
            className="mb-7 flex h-14 w-full items-center justify-center border border-ink px-3 text-center text-[15px] font-bold transition-colors hover:bg-ink hover:text-paper"
          >
            Need it custom printed? Get a quote
          </Link>
          {product.benefits?.length ? <div className="mb-8 grid grid-cols-1 gap-x-5 gap-y-3 text-sm font-semibold sm:grid-cols-2">
            {product.benefits.map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <Check
                  size={20}
                  strokeWidth={2.2}
                  className="shrink-0 text-olive"
                />
                {text}
              </div>
            ))}
          </div> : null}
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
                {(faqPoints[activeFaq] || []).map((point) => (
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
                  .map((paragraph) => (
                    <p key={paragraph}>{plainRichText(paragraph)}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${container} pt-16`}>
        <div className="border-t border-ink pt-8">
          <p className="text-xs font-bold tracking-[.2em] text-olive uppercase">Helpful guides</p>
          <h2 className="mt-4 font-display text-4xl leading-none font-black uppercase">Read before you order.</h2>
          <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-[#55544f]">
            Learn how fabric weight, care and artwork planning can affect the way
            your {product.name.toLowerCase()} feels and performs.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold">
            <Link href="/blog/how-to-choose-the-right-gsm-t-shirt" className="underline decoration-1 underline-offset-4 hover:text-olive">
              How to choose the right GSM T-shirt →
            </Link>
            {product.category === "fleece" && (
              <Link href="/blog/how-to-care-for-cotton-t-shirts-and-fleece" className="underline decoration-1 underline-offset-4 hover:text-olive">
                How to care for cotton and fleece →
              </Link>
            )}
            <Link href="/blog/custom-t-shirt-printing-order-checklist" className="underline decoration-1 underline-offset-4 hover:text-olive">
              Custom printing order checklist →
            </Link>
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
          {comparison.map((p) => {
            return (
              <div
                key={p.id}
                className="grid items-center gap-2 sm:grid-cols-[200px_1fr] sm:gap-4"
              >
                <Link
                  href={`/products/${productSlug(p)}`}
                  className={`text-sm ${p.id === product.id ? "font-extrabold" : "font-medium"}`}
                >
                  {p.name}
                  {p.id === product.id ? " (this)" : ""}
                </Link>
                <div className="min-w-0">
                  <div
                    style={{ width: `${(p.gsm / 350) * 100}%` }}
                    className={`flex h-11 min-w-[76px] items-center justify-end px-3.5 text-sm font-extrabold ${p.id === product.id ? "bg-gold text-ink" : "bg-ink text-paper"}`}
                  >
                    {p.gsm} GSM
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {product.colours.length > 1 && <section className={`${container} pt-20 lg:pt-[136px]`}>
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
      </section>}
      <section id="sizes" className={`${container} pt-20 lg:pt-[136px]`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(44px,5vw,76px)] leading-[.9] font-black uppercase">
            {product.category === "fleece"
              ? "Sweatshirt aur Hoodie — 350 GSM"
              : product.id === "polo"
                ? "Polo T-Shirt — 220 GSM"
                : product.id === "oversized" || product.id === "terry"
                  ? "Oversized T-Shirt — 220 GSM aur French Terry — 240 GSM"
                : product.id === "regular"
                  ? "Regular Fit T-Shirt — 180 GSM"
                : "Size guide"}
          </h2>
          <p className="text-sm text-[#55544f]">
            {product.name} · {fit} fit · Available sizes: {sizesFor(product).join(", ")}
          </p>
        </div>
        {product.category === "fleece" && (
          <p className="mb-5 text-sm text-[#55544f]">
            Supplier ke dono products ke liye catalogue measurements same hain.
          </p>
        )}
        {(product.id === "oversized" || product.id === "terry") && (
          <p className="mb-5 text-sm text-[#55544f]">
            Dono products ke catalogue mein same measurements hain.
          </p>
        )}
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
                {[sizeLabel, "Chest (in)", "Shoulder (in)", "Length (in)", "Sleeve (in)"].map(
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
                  {[measurement.chest, measurement.shoulder, measurement.length, measurement.sleeve].map((value, i) => (
                    <td key={`measurement-${i}`} className="px-3 py-[18px] text-[#55544f]">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[#55544f]">
          Measurements are in inches. Please confirm with the supplier whether
          chest measurements are flat or garment circumference before using them to assess fit.
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
              href="/custom-printing"
              onClick={prepareQuote}
              className="flex h-[60px] items-center bg-gold px-9 font-bold text-ink transition-colors hover:bg-paper"
            >
              Request a quote
            </Link>
            <a
              href={
                whatsapp
                  ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi StarkVibe, I'd like to customise ${product.name}.`)}`
                  : "/custom-printing"
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
            const selectedColour = relatedColours[p.id] ?? 0;
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
