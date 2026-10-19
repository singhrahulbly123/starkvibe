"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/catalogue";
import {
  defaultShopFilters,
  matchesFilters,
  shopColours,
  sortProducts,
  sortOptions,
  weightOptions,
  type ShopFilters,
} from "@/lib/shop";
import { ShopFiltersPanel } from "./shop-filters";
import { ShopProductCard } from "./shop-product-card";
import { Reveal } from "./reveal";

const guide = [
  {
    gsm: 180,
    title: "Light and easy",
    text: "Breathable everyday tees and kids wear. The lightest weight in the range.",
  },
  {
    gsm: 220,
    title: "The everyday standard",
    text: "Real body without the bulk. Our oversized tee and the Matty polo.",
  },
  {
    gsm: 240,
    title: "Structured and soft",
    text: "French Terry for a denser hand-feel and a sharper streetwear drape.",
  },
  {
    gsm: 350,
    title: "Warm and substantial",
    text: "Cotton fleece sweatshirts and hoodies built for cold days and branding.",
  },
];
const featuredCatalogueOrder = ["polo", "kids", "sweatshirt", "hoodie", "oversized", "regular", "terry"];
const featuredPreviewColours: Record<string, string> = {
  polo: "white",
  kids: "orange",
  sweatshirt: "off-white",
  hoodie: "coffee-brown",
  oversized: "brown",
  regular: "sea-green",
  terry: "beige",
};

function BrandingBanner() {
  return (
    <div className="grid items-center gap-8 bg-gold p-7 sm:grid-cols-2 lg:px-14 lg:py-12">
      <div>
        <p className="mb-4 text-xs font-bold tracking-[.18em] uppercase">
          Custom printing
        </p>
        <h2 className="font-display text-[clamp(40px,4.2vw,64px)] leading-[.88] font-black uppercase">
          Your design.
          <br />
          Any of these.
        </h2>
      </div>
      <div>
        <p className="mb-6 max-w-[360px] text-base leading-[1.6]">
          Every piece here is made to take custom printing and branding. Send an
          enquiry for a quote.
        </p>
        <Link
          href="/#custom"
          className="inline-flex h-14 items-center bg-ink px-8 text-sm font-bold text-paper transition-colors hover:bg-olive"
        >
          Request a quote
        </Link>
      </div>
    </div>
  );
}

export function ShopCatalogue({
  introTitle,
  introParagraphs,
  heading = "The range.",
  breadcrumbLabel = "Shop",
  fixedCategory,
  productIds,
}: {
  introTitle: string;
  introParagraphs: string[];
  heading?: string;
  breadcrumbLabel?: string;
  fixedCategory?: ShopFilters["category"];
  productIds?: string[];
}) {
  const [filters, setFilters] = useState<ShopFilters>(defaultShopFilters);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [colours, setColours] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setFiltersOpen(window.matchMedia("(min-width: 1024px)").matches);
    const params = new URLSearchParams(window.location.search);
    setFilters({
      ...defaultShopFilters,
      weight: weightOptions.includes(Number(params.get("weight")))
        ? Number(params.get("weight"))
        : 0,
      category: fixedCategory || ["all", "tees", "polo", "kids", "fleece"].includes(
        params.get("category") || "",
      )
        ? fixedCategory || params.get("category")!
        : fixedCategory || "all",
      colour: shopColours.some((c) => c.name === params.get("colour"))
        ? params.get("colour")!
        : "",
      price: ["any", "under200", "200to300", "over300"].includes(
        params.get("price") || "",
      )
        ? params.get("price")!
        : "any",
      sort: sortOptions.some((s) => s.value === params.get("sort"))
        ? params.get("sort")!
        : "featured",
      savedOnly: params.get("saved") === "true",
    });
    try {
      const stored = JSON.parse(
        localStorage.getItem("starkvibe-saved") || "[]",
      );
      if (Array.isArray(stored))
        setSaved(stored.filter((id) => products.some((p) => p.id === id)));
    } catch {
      /* Start with an empty saved list if browser storage is unavailable. */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem("starkvibe-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  function changeFilters(change: Partial<ShopFilters>) {
    const next = { ...filters, ...change };
    setFilters(next);
    const params = new URLSearchParams();
    if (next.weight) params.set("weight", String(next.weight));
    if (next.category !== "all") params.set("category", next.category);
    if (next.colour) params.set("colour", next.colour);
    if (next.price !== "any") params.set("price", next.price);
    if (next.sort !== "featured") params.set("sort", next.sort);
    if (next.savedOnly) params.set("saved", "true");
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${params.size ? `?${params}` : ""}`,
    );
  }
  function toggleSaved(id: string) {
    setSaved((current) =>
      current.includes(id) ? current.filter((p) => p !== id) : [...current, id],
    );
  }
  const filteredProducts = products
    .filter(
      (p) =>
        (!productIds || filters.category !== fixedCategory || productIds.includes(p.id)) &&
        matchesFilters(p, filters, saved),
    )
    .sort(
      (a, b) =>
        featuredCatalogueOrder.indexOf(a.id) - featuredCatalogueOrder.indexOf(b.id),
    );
  const shown = sortProducts(filteredProducts, filters.sort);
  const colourFilter = shopColours.find((c) => c.name === filters.colour);
  const activeFilters = !!(
    filters.weight ||
    filters.category !== "all" ||
    filters.colour ||
    filters.price !== "any" ||
    filters.savedOnly
  );
  const renderCard = (product: (typeof products)[number]) => {
    const matchingColour = colourFilter
      ? product.colours.findIndex((c) => colourFilter.files.includes(c.file))
      : 0;
    const preferredColour = featuredPreviewColours[product.id];
    const variedDefault = Math.max(
      0,
      product.colours.findIndex((colour) => colour.file === preferredColour),
    );
    const selected = colourFilter
      ? Math.max(0, matchingColour)
      : (colours[product.id] ?? variedDefault);
    return (
      <ShopProductCard
        key={product.id}
        product={product}
        colourIndex={selected}
        onColourChange={(index) =>
          setColours((current) => ({ ...current, [product.id]: index }))
        }
        saved={saved.includes(product.id)}
        onSave={() => toggleSaved(product.id)}
        showColourVariants={false}
      />
    );
  };
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-7 lg:px-12 lg:pt-9">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-7">
        <h1 className="font-display text-[clamp(64px,10vw,156px)] leading-[.85] font-black tracking-[-.015em] uppercase">
          {heading}
        </h1>
        <div className="max-w-[420px]">
          <p className="text-[17px] leading-[1.6] text-[#55544f]">
            Seven pieces in 100% cotton, from 180 GSM tees to 350 GSM fleece.
            All double bio-washed, silicon washed and double stitched.
          </p>
          <p className="mt-4 text-xs font-bold tracking-[.18em] text-olive uppercase">
            Start by picking a weight
          </p>
        </div>
      </div>
      <section className="mb-12 max-w-[920px] border-y border-ink/20 py-8" aria-labelledby="catalogue-intro">
        <h2 id="catalogue-intro" className="font-display text-4xl leading-none font-black uppercase">
          {introTitle}
        </h2>
        <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#55544f]">
          {introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <div
        role="group"
        aria-label="Filter by fabric weight"
        className="mb-10 grid grid-cols-2 gap-2.5 sm:grid-cols-5"
      >
        {weightOptions.map((weight) => (
          <button
            type="button"
            key={weight}
            aria-pressed={filters.weight === weight}
            onClick={() => changeFilters({ weight })}
            className={`flex h-[112px] flex-col items-start justify-between border border-ink/50 px-[18px] py-4 text-left first:col-span-2 sm:first:col-span-1 transition-colors ${filters.weight === weight ? "border-ink bg-ink text-paper" : "hover:border-ink hover:bg-ink/5"}`}
          >
            <span className="font-display text-[52px] leading-[.9] font-black uppercase">
              {weight || "All"}
            </span>
            <span className="text-xs font-semibold">
              {products.filter((p) => !weight || p.gsm === weight).length}{" "}
              pieces{weight ? " · GSM" : ""}
            </span>
          </button>
        ))}
      </div>
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-y border-ink/60 py-[18px]">
        <div className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="shop-filters"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex h-11 items-center gap-3 bg-ink px-5 text-sm font-bold text-paper"
          >
            <SlidersHorizontal size={16} />
            {filtersOpen ? "Hide filters" : "Show filters"}
          </button>
          <span role="status" aria-live="polite" className="text-sm font-bold">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          </span>
          {saved.length > 0 && (
            <button
              type="button"
              aria-pressed={filters.savedOnly}
              onClick={() => changeFilters({ savedOnly: !filters.savedOnly })}
              className={`flex items-center gap-1.5 text-xs ${filters.savedOnly ? "font-bold text-olive" : "text-ink/60"}`}
            >
              <Heart
                size={14}
                fill={filters.savedOnly ? "currentColor" : "none"}
              />
              Saved ({saved.length})
            </button>
          )}
        </div>
        <div
          role="group"
          aria-label="Sort products"
          className="flex flex-wrap items-center gap-1.5"
        >
          <span className="mr-2 text-xs text-[#77756c]">Sort</span>
          {sortOptions.map((sort) => (
            <button
              type="button"
              key={sort.value}
              aria-pressed={filters.sort === sort.value}
              onClick={() => changeFilters({ sort: sort.value })}
              className={`h-10 border border-ink/40 px-3 text-xs font-semibold transition-colors ${filters.sort === sort.value ? "border-ink bg-ink text-paper" : "hover:bg-ink/10"}`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
      {activeFilters && (
        <div className="mb-7 flex flex-wrap items-center gap-2 text-xs">
          {filters.weight > 0 && (
            <span className="border border-ink/25 px-3 py-2">
              {filters.weight} GSM
            </span>
          )}
          {filters.category !== "all" && (
            <span className="border border-ink/25 px-3 py-2">
              {filters.category === "tees" ? "T-shirts" : filters.category}
            </span>
          )}
          {filters.colour && (
            <span className="border border-ink/25 px-3 py-2">
              {filters.colour}
            </span>
          )}
          {filters.price !== "any" && (
            <span className="border border-ink/25 px-3 py-2">
              {filters.price === "under200"
                ? "Up to ₹200"
                : filters.price === "over300"
                  ? "Above ₹300"
                  : "₹201 – ₹300"}
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              changeFilters(defaultShopFilters);
              setColours({});
            }}
            className="flex items-center gap-1.5 px-2 py-2 font-bold underline underline-offset-4"
          >
            <X size={13} />
            Clear filters
          </button>
        </div>
      )}
      <div
        className={`grid items-start gap-8 ${filtersOpen ? "lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12" : ""}`}
      >
        {filtersOpen && (
          <aside
            id="shop-filters"
            aria-label="Product filters"
            className="border-b border-ink/20 pb-8 lg:border-0 lg:pb-0"
          >
            <ShopFiltersPanel filters={filters} onChange={changeFilters} />
          </aside>
        )}
        <section id="shop-products" aria-label="Products" className="min-w-0">
          {shown.length ? (
            <>
              <div
                className={`grid gap-x-5 gap-y-10 sm:grid-cols-2 ${filtersOpen ? "xl:grid-cols-3" : "lg:grid-cols-3"}`}
              >
                {shown.slice(0, 3).map(renderCard)}
              </div>
              <div className="my-12">
                <BrandingBanner />
              </div>
              {shown.length > 3 && (
                <div
                  className={`grid gap-x-5 gap-y-12 sm:grid-cols-2 ${filtersOpen ? "xl:grid-cols-3" : "lg:grid-cols-3"}`}
                >
                  {shown.slice(3).map(renderCard)}
                </div>
              )}
            </>
          ) : (
            <div className="border border-ink/20 px-6 py-20 text-center">
              <h2 className="font-display text-5xl font-black uppercase">
                No pieces in this mix.
              </h2>
              <p className="mt-4 text-base text-[#55544f]">
                Try another weight, colour or price to find your next everyday
                favourite.
              </p>
              <button
                type="button"
                onClick={() => changeFilters(defaultShopFilters)}
                className="mt-7 h-12 bg-ink px-7 text-sm font-bold text-paper"
              >
                Show all pieces
              </button>
            </div>
          )}
        </section>
      </div>
      <section className="pt-24 lg:pt-[136px]">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-[18px] text-xs font-bold tracking-[.18em] text-olive uppercase">
                Not sure which weight?
              </p>
              <h2 className="font-display text-[clamp(48px,6.5vw,100px)] leading-[.88] font-black uppercase">
                A quick guide
                <br />
                to GSM.
              </h2>
            </div>
            <p className="max-w-[380px] text-[17px] leading-[1.6] text-[#55544f]">
              GSM is grams per square metre. Higher means denser, warmer and
              more structured.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 border-y border-ink/50 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {guide.map((item) => (
            <div key={item.gsm}>
              <p className="font-display text-[88px] leading-none font-black">
                {item.gsm}
              </p>
              <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 min-h-[66px] text-sm leading-[1.6] text-[#55544f]">
                {item.text}
              </p>
              <button
                type="button"
                onClick={() => {
                  changeFilters({ ...defaultShopFilters, weight: item.gsm });
                  document
                    .getElementById("shop-products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-4 border-b border-ink py-2 text-sm font-bold transition-colors hover:text-olive"
              >
                Shop {item.gsm} →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
