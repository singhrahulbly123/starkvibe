"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { productImage, salePrice } from "@/lib/catalogue";
import { formatPrice, type BagItem } from "@/lib/bag";

export function CartItem({
  item,
  onQuantityChange,
  onRemove,
  onSave,
}: {
  item: BagItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onSave: () => void;
}) {
  const colour = item.product.colours[item.colour];
  const href = `/products/${item.product.id}?colour=${colour.file}`;
  return (
    <article className="flex flex-wrap items-start gap-x-7 gap-y-5 border-b border-ink/60 py-7">
      <Link
        href={href}
        aria-label={item.product.name}
        className="relative h-[148px] w-[120px] shrink-0 overflow-hidden bg-[#e4e2da] sm:h-[184px] sm:w-[150px]"
      >
        <Image
          src={productImage(item.product, colour)}
          alt={`${item.product.name} in ${colour.name}`}
          fill
          sizes="150px"
          className="object-cover"
        />
      </Link>
      <div className="min-w-0 flex-[1_1_180px]">
        <span className="mb-3 inline-block bg-ink px-2.5 py-[5px] text-[11px] font-bold tracking-[.1em] text-paper">
          {item.product.gsm} GSM
        </span>
        <h2 className="mb-2.5 text-xl leading-tight font-bold">
          <Link href={href}>{item.product.name}</Link>
        </h2>
        <div className="mb-1.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[15px] text-[#3f3e3a]">
          <span className="flex items-center gap-2">
            <span
              style={{ backgroundColor: colour.hex }}
              className="size-4 rounded-full border border-ink/30"
            />
            {colour.name}
          </span>
          <span>Size {item.size}</span>
        </div>
        <p className="mb-2.5 text-sm text-[#55544f]">
          {formatPrice(salePrice(item.product))} each
        </p>
        <div className="flex flex-wrap gap-x-5">
          <button
            onClick={onSave}
            className="h-11 text-sm font-bold underline underline-offset-2"
          >
            Save for later
          </button>
          <button
            aria-label={`Remove ${item.product.name}`}
            onClick={onRemove}
            className="h-11 text-sm font-bold text-[#8a2a12] underline underline-offset-2"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="ml-auto flex shrink-0 flex-col items-end gap-[18px]">
        <div className="flex h-[52px] items-center border border-ink/70">
          <button
            aria-label={`Decrease ${item.product.name} quantity`}
            disabled={item.quantity === 1}
            onClick={() => onQuantityChange(item.quantity - 1)}
            className="flex h-[50px] w-11 items-center justify-center disabled:cursor-default disabled:opacity-30"
          >
            <Minus size={16} />
          </button>
          <span aria-live="polite" className="w-9 text-center font-bold">
            {item.quantity}
          </span>
          <button
            aria-label={`Increase ${item.product.name} quantity`}
            disabled={item.quantity === 99}
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="flex h-[50px] w-11 items-center justify-center disabled:opacity-30"
          >
            <Plus size={16} />
          </button>
        </div>
        <p className="text-2xl font-bold">
          {formatPrice(salePrice(item.product) * item.quantity)}
        </p>
      </div>
    </article>
  );
}
