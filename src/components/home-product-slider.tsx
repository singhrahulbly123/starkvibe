"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";
import { mrpPrice, productImage, products, productSlug, salePrice } from "@/lib/catalogue";
import { sizesFor } from "@/lib/product-details";

export function HomeProductSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="home-product-slider-title" className="bg-[#e8e2d7] py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-5 sm:mb-9">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[.22em] text-olive uppercase sm:text-xs">The StarkVibe collection</p>
            <h2 id="home-product-slider-title" className="font-display text-[clamp(30px,4vw,52px)] leading-none font-black uppercase">Made to wear. Made to last.</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" aria-label="Previous products" onClick={() => scroll(-1)} className="flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper">
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next products" onClick={() => scroll(1)} className="flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper">
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div ref={trackRef} className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-5 sm:px-0">
          {products.map((product) => {
            const colour = product.colours[0];
            return (
              <article
                key={product.id}
                className="group flex min-w-[78vw] snap-start flex-col sm:min-w-[calc((100%-1.25rem)/2)] xl:min-w-[calc((100%-3.75rem)/4)]"
              >
                <Link href={`/products/${productSlug(product)}`} aria-label={`View ${product.name}`} className="relative block aspect-[.78] overflow-hidden bg-[#f4f1e9]">
                  <Image
                    src={productImage(product, colour)}
                    alt={`${product.name} in ${colour.name}`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 78vw"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 left-3 bg-ink px-3 py-1.5 text-[10px] font-bold tracking-[.12em] text-paper uppercase">{product.gsm} GSM</span>
                  <span className="absolute right-3 bottom-3 bg-gold px-3 py-1.5 text-[10px] font-bold tracking-[.1em] text-ink uppercase">{colour.name}</span>
                </Link>
                <div className="border-x border-b border-ink/15 bg-[#f4f1e9] p-4 sm:p-5">
                  <Link href={`/products/${productSlug(product)}`} title={product.name} className="block truncate whitespace-nowrap font-display text-lg leading-tight font-bold uppercase hover:text-olive sm:text-xl">{product.name}</Link>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-ink/65">{product.note}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3">
                    <span className="flex items-baseline gap-2"><del className="text-xs text-ink/45">₹{mrpPrice(product)}</del><span className="font-bold">₹{salePrice(product)}</span></span>
                  </div>
                  <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                    <label className="sr-only" htmlFor={`home-product-size-${product.id}`}>Choose size for {product.name}</label>
                    <select
                      id={`home-product-size-${product.id}`}
                      value={selectedSizes[product.id] || sizesFor(product)[2]}
                      onChange={(event) => setSelectedSizes((current) => ({ ...current, [product.id]: event.target.value }))}
                      className="h-11 min-w-0 border border-ink/20 bg-transparent px-3 text-sm"
                    >
                      {sizesFor(product).map((size) => <option key={size} value={size}>{size}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const size = selectedSizes[product.id] || sizesFor(product)[2];
                        window.dispatchEvent(new CustomEvent("starkvibe-add-to-bag", {
                          detail: { key: `${product.id}-0-${size}`, product, colour: 0, size, quantity: 1 },
                        }));
                        setAddedProduct(product.id);
                        window.setTimeout(() => setAddedProduct((current) => current === product.id ? null : current), 1600);
                      }}
                      className="flex h-11 items-center gap-2 bg-ink px-3 text-xs font-bold tracking-[.08em] text-paper uppercase transition-colors hover:bg-olive sm:px-4"
                    >
                      {addedProduct === product.id ? <Check size={16} aria-hidden="true" /> : <ShoppingBag size={16} aria-hidden="true" />}
                      <span>{addedProduct === product.id ? "Added" : "Add to cart"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-1 flex justify-center gap-2 sm:hidden">
          <button type="button" aria-label="Previous products" onClick={() => scroll(-1)} className="flex size-10 items-center justify-center rounded-full border border-ink/25"><ChevronLeft size={18} aria-hidden="true" /></button>
          <button type="button" aria-label="Next products" onClick={() => scroll(1)} className="flex size-10 items-center justify-center rounded-full border border-ink/25"><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
