"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { mrpPrice, productImage, salePrice, type Product } from "@/lib/catalogue";
import { sizesFor } from "@/lib/product-details";

export function ShopProductCard({
  product,
  colourIndex,
  onColourChange,
  saved,
  onSave,
}: {
  product: Product;
  colourIndex: number;
  onColourChange: (index: number) => void;
  saved: boolean;
  onSave: () => void;
}) {
  const colour = product.colours[colourIndex];
  const sizes = sizesFor(product);
  const href = `/products/${product.id}?colour=${colour.file}`;
  return (
    <article className="group flex min-w-0 flex-col border border-ink/15 bg-[#eeece5] p-3 transition-shadow duration-300 hover:shadow-[0_16px_35px_rgba(13,13,12,.1)]">
      <div className="relative h-[380px] overflow-hidden border border-ink/10 bg-gradient-to-br from-[#e4e2da] via-[#f4f1e9] to-[#d8d3c7] sm:h-[420px]">
        <Link
          href={href}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 p-1"
        >
          <Image
            src={productImage(product, colour)}
            alt={`${product.name} in ${colour.name}`}
            fill
            sizes="(min-width: 1024px) 27vw, (min-width: 640px) 45vw, 100vw"
            className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.025]"
          />
        </Link>
        <span className="pointer-events-none absolute top-4 left-4 bg-ink px-3 py-2 text-xs font-bold tracking-[.1em] text-paper">
          {product.gsm} GSM
        </span>
        <button
          aria-label={`${saved ? "Unsave" : "Save"} ${product.name}`}
          aria-pressed={saved}
          onClick={onSave}
          className="absolute top-2 right-2 flex size-11 items-center justify-center bg-paper/85 transition-colors hover:bg-paper"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-end justify-between gap-2">
          <span className="bg-paper/95 px-2.5 py-1.5 text-[11px] font-bold tracking-[.1em] text-[#55544f] uppercase">
            Colour: {colour.name}
          </span>
          <span className="bg-ink/90 px-2.5 py-1.5 text-[10px] font-bold tracking-[.08em] text-paper uppercase">
            Sizes: {sizes.join(" · ")}
          </span>
        </div>
      </div>
      <div className="mt-[18px] flex flex-col items-start gap-2 text-[17px] leading-tight font-bold">
        <h2 className="min-w-0 max-w-full truncate">
          <Link href={href}>{product.name}</Link>
        </h2>
        <span className="flex items-baseline gap-2">
          <del className="text-xs font-normal text-[#77756c]">MRP ₹{mrpPrice(product)}</del>
          <span>₹{salePrice(product)}</span>
        </span>
      </div>
      <p className="mt-2 min-h-[42px] text-sm leading-[1.5] text-[#55544f]">
        {product.note}
      </p>
      <div
        role="group"
        aria-label={`${product.name} colours`}
        className="-ml-1.5 mt-2 flex flex-wrap items-center"
      >
        {product.colours.map((c, index) => (
          <button
            key={c.file}
            aria-label={`${product.name}: ${c.name}`}
            aria-pressed={index === colourIndex}
            onClick={() => onColourChange(index)}
            className="flex size-10 items-center justify-center"
          >
            <span
              style={{ backgroundColor: c.hex }}
              className={`size-6 rounded-full border border-ink/20 ${index === colourIndex ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""}`}
            />
          </button>
        ))}
        <span className="ml-1 text-xs text-[#77756c]">
          {product.colours.length} colours
        </span>
      </div>
      <Link
        href={href}
        className="mt-3 flex h-[52px] items-center justify-center border border-ink text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
      >
        View product
      </Link>
    </article>
  );
}
