"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { galleryImage } from "@/lib/product-details";
import { productImage } from "@/lib/catalogue";
import type { Product, Colour } from "@/lib/catalogue";

export function ProductGallery({
  product,
  colour,
  view,
  onViewChange,
  onColourChange,
}: {
  product: Product;
  colour: Colour;
  view: string;
  onViewChange: (view: string) => void;
  onColourChange: (index: number) => void;
}) {
  const mainImage = galleryImage(product, colour, view);

  return (
    <div className="min-w-0">
      <div className="grid gap-1.5 sm:grid-cols-[104px_minmax(0,1fr)]">
        <div
          role="group"
          aria-label="Choose a product colour"
          className="order-2 flex gap-1.5 overflow-x-auto pb-1 sm:order-1 sm:max-h-[540px] sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden sm:pb-0"
        >
          {product.colours.map((thumbnailColour, index) => (
            <button
              key={thumbnailColour.file}
              type="button"
              aria-label={`Show ${thumbnailColour.name} image`}
              aria-pressed={colour.file === thumbnailColour.file}
              onClick={() => {
                onColourChange(index);
                onViewChange("Front");
              }}
              className={`relative h-[96px] min-w-[96px] overflow-hidden rounded-[4px] border bg-[#f4f3ef] transition-all sm:h-[108px] sm:min-w-0 ${colour.file === thumbnailColour.file ? "border-ink ring-1 ring-ink" : "border-black/20 hover:border-ink/60"}`}
            >
              <Image
                src={productImage(product, thumbnailColour)}
                alt={`StarkVibe ${product.name} 100% cotton in ${thumbnailColour.name}`}
                fill
                sizes="108px"
                className="object-contain"
              />
              <span className="absolute inset-x-0 bottom-0 bg-ink/75 px-1 py-1 text-[10px] font-bold text-paper">
                {thumbnailColour.name}
              </span>
            </button>
          ))}
          {(product.gallery || []).map((image, index) => (
            <button
              key={"gallery-" + image}
              type="button"
              aria-label={"Show gallery image " + (index + 1)}
              aria-pressed={view === "Gallery " + (index + 1)}
              onClick={() => onViewChange("Gallery " + (index + 1))}
              className={"relative h-[96px] min-w-[96px] overflow-hidden rounded-[4px] border bg-[#f4f3ef] transition-all sm:h-[108px] sm:min-w-0 " + (view === "Gallery " + (index + 1) ? "border-ink ring-1 ring-ink" : "border-black/20 hover:border-ink/60")}
            >
              <Image src={image} alt={product.name + " gallery image " + (index + 1)} fill sizes="108px" className="object-contain" />
              <span className="absolute inset-x-0 bottom-0 bg-ink/75 px-1 py-1 text-[10px] font-bold text-paper">Gallery {index + 1}</span>
            </button>
          ))}
        </div>

        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[4px] border border-black/15 bg-[#f4f3ef] sm:order-2 sm:aspect-[3/4]">
          <Image
            key={`${colour.file}-${view}`}
            src={mainImage}
            alt={`StarkVibe ${product.name} 100% cotton in ${colour.name}, ${view.toLowerCase()} view`}
            fill
            priority={view === "Front"}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-0 transition-transform duration-700"
          />
          <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-paper/95 text-ink shadow-sm">
            <Maximize2 size={15} strokeWidth={2.25} aria-hidden="true" />
            <span className="sr-only">Expand image</span>
          </span>
        </div>
      </div>
    </div>
  );
}
