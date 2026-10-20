"use client";
import type { Product } from "@/lib/catalogue";
import {
  priceOptions,
  shopCategories,
  type ShopColour,
  type ShopFilters,
} from "@/lib/shop";

export function ShopFiltersPanel({
  filters,
  onChange,
  products,
  colours,
}: {
  filters: ShopFilters;
  onChange: (change: Partial<ShopFilters>) => void;
  products: Product[];
  colours: ShopColour[];
}) {
  return (
    <div className="space-y-8 text-sm">
      <fieldset className="border-b border-ink/40 pb-8">
        <legend className="mb-5 text-xs font-bold tracking-[.16em] uppercase">
          Category
        </legend>
        <div className="space-y-4">
          {shopCategories.map((category) => (
            <label
              key={category.value}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="shop-category"
                value={category.value}
                checked={filters.category === category.value}
                onChange={() => onChange({ category: category.value })}
                className="size-3.5 appearance-none border border-ink/60 checked:border-ink checked:bg-ink"
              />
              <span
                className={
                  filters.category === category.value ? "font-bold" : ""
                }
              >
                {category.label}
              </span>
              <span className="ml-auto text-xs text-ink/50">
                {
                  products.filter(
                    (p) =>
                      category.value === "all" || p.category === category.value,
                  ).length
                }
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="border-b border-ink/40 pb-8">
        <legend className="mb-5 text-xs font-bold tracking-[.16em] uppercase">
          Colour
        </legend>
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {colours.map((colour) => (
            <button
              key={colour.name}
              type="button"
              aria-label={`Filter by ${colour.name}`}
              aria-pressed={filters.colour === colour.name}
              onClick={() =>
                onChange({
                  colour: filters.colour === colour.name ? "" : colour.name,
                })
              }
              className={`flex min-w-0 w-full items-center gap-2.5 rounded-sm border border-transparent px-1.5 py-1 text-left text-[13px] transition-colors hover:border-ink/15 hover:bg-ink/5 ${filters.colour === colour.name ? "border-ink/20 bg-ink/5 font-bold" : ""}`}
            >
              <span
                style={{ backgroundColor: colour.hex }}
                className={`size-5 shrink-0 rounded-full border border-ink/20 ${filters.colour === colour.name ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""}`}
              />
              <span className="truncate">{colour.name}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-5 text-xs font-bold tracking-[.16em] uppercase">
          Price
        </legend>
        <div className="space-y-4">
          {priceOptions.map((price) => (
            <label
              key={price.value}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="shop-price"
                value={price.value}
                checked={filters.price === price.value}
                onChange={() => onChange({ price: price.value })}
                className="size-3.5 accent-ink"
              />
              <span
                className={filters.price === price.value ? "font-bold" : ""}
              >
                {price.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
