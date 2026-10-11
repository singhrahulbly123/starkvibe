"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addBagItem, useBag, type BagItem } from "@/lib/bag";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, ArrowUpRight } from "lucide-react";
import { filters, mrpPrice, productImage, products, salePrice } from "@/lib/catalogue";
import { Reveal } from "./reveal";

export function Storefront({
  children,
  hideRange = false,
}: {
  children: React.ReactNode;
  hideRange?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [colours, setColours] = useState<Record<string, number>>({});
  const { count } = useBag();
  useEffect(() => {
    function receiveOrder(event: Event) {
      addBagItem((event as CustomEvent<BagItem>).detail);
      router.push("/cart");
    }
    window.addEventListener("starkvibe-add-to-bag", receiveOrder);
    return () =>
      window.removeEventListener("starkvibe-add-to-bag", receiveOrder);
  }, [router]);
  const shown = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );
  const links = [
    ["Shop", "/shop"],
    ["Birthday printing", "/birthday"],
    ["Office & bulk", "/office-bulk"],
    ["Anniversary wear", "/anniversary"],
    ["Custom gifting", "/gifting"],
    ["Campaign merchandise", "/political-campaigns"],
  ];
  return (
    <>
      <header className="relative mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 lg:flex-nowrap">
        <nav
          aria-label="Main navigation"
          className="hidden gap-6 whitespace-nowrap text-[13px] font-semibold tracking-[.02em] uppercase lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2"
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={href === pathname ? "page" : undefined}
              className={`whitespace-nowrap transition-colors hover:text-olive ${href === pathname ? "border-b border-ink pb-2" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="order-2 p-2 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <a
          href="/#top"
          aria-label="StarkVibe home"
          className="order-first flex items-center"
        >
          <Image
            src="/branding/starkvibe-wordmark-premium.png"
            alt="StarkVibe"
            width={280}
            height={88}
            className="h-auto w-[150px] lg:w-[190px]"
          />
        </a>
        <div className="order-3 flex items-center justify-end gap-1 lg:flex-1">
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 lg:p-3"
          >
            <Search size={22} />
          </button>
          <Link
            href="/cart"
            className="flex h-11 items-center gap-2 bg-ink px-3 text-xs font-semibold text-paper lg:px-4 lg:text-sm"
          >
            <ShoppingBag size={18} />
            <span>Bag ({count})</span>
          </Link>
        </div>
        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="flex w-full flex-wrap gap-5 border-t border-ink/15 pt-4 text-sm lg:hidden"
          >
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        )}
        {searchOpen && (
          <div className="w-full lg:absolute lg:top-[120px] lg:right-12 lg:z-20 lg:w-96">
            <label className="sr-only" htmlFor="search">
              Search the range
            </label>
            <input
              autoFocus
              id="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                document
                  .getElementById("range")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              placeholder="Search tees, polos, fleece…"
              className="h-14 w-full border border-ink bg-paper px-4"
            />
            {hideRange && (
              <div className="border-x border-b border-ink bg-paper p-3">
                {shown.map((product) => (
                  <a
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="block px-2 py-3 text-sm font-semibold transition-colors hover:bg-ink/5"
                  >
                    {product.name}
                  </a>
                ))}
                {!shown.length && (
                  <p className="px-2 py-3 text-sm text-ink/60">
                    No matching pieces. Try another name.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </header>
      {children}
      {!hideRange && (
        <section
          id="range"
          className="mx-auto max-w-[1400px] px-5 pt-20 lg:px-12 lg:pt-36"
        >
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="mb-[18px] text-[13px] font-semibold tracking-[.18em] text-olive uppercase">
                  The full range
                </p>
                <h2 className="font-display text-[clamp(48px,7vw,112px)] leading-[.88] font-black uppercase">
                  Seven pieces.
                  <br />
                  No filler.
                </h2>
              </div>
              <div
                role="group"
                aria-label="Filter products"
                className="flex flex-wrap gap-2"
              >
                {filters.map(([key, label]) => (
                  <button
                    key={key}
                    aria-pressed={filter === key}
                    onClick={() => setFilter(key)}
                    className={`h-[46px] border border-ink px-5 text-[15px] font-semibold transition-colors ${filter === key ? "bg-ink text-paper" : "hover:bg-ink/10"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <p aria-live="polite" className="mb-6 text-sm text-[#55544f]">
            Showing {shown.length} {shown.length === 1 ? "piece" : "pieces"} ·
            Tap a colour to see it on the piece
          </p>
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {shown.map((p) => {
              const selected = colours[p.id] || 0;
              return (
                <article key={p.id} className="group flex flex-col">
                  <div className="relative">
                    <button
                      aria-label={`View ${p.name}`}
                      onClick={() => {
                        router.push(
                          `/products/${p.id}?colour=${p.colours[selected].file}`,
                        );
                      }}
                      className="relative h-[400px] w-full overflow-hidden bg-[#e4e2da] text-left"
                    >
                    <Image
                      src={productImage(p, p.colours[selected])}
                      alt={`${p.name} in ${p.colours[selected].name}`}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 bg-ink px-3 py-2 text-xs font-bold tracking-[.1em] text-paper uppercase">
                      {p.gsm} GSM
                    </span>
                    <span className="absolute bottom-3 left-4 bg-paper/90 px-2 py-1 text-[11px] tracking-[.12em] uppercase">
                      {p.colours[selected].name}
                    </span>
                    </button>
                    <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center rounded-md bg-paper/85 px-2 py-1 backdrop-blur-sm">
                      {p.colours.map((c, i) => (
                        <button
                          key={c.hex}
                          aria-label={`${p.name}: ${c.name}`}
                          aria-pressed={selected === i}
                          onClick={() => setColours({ ...colours, [p.id]: i })}
                          className="flex size-9 items-center justify-center"
                        >
                          <span
                            style={{ backgroundColor: c.hex }}
                            className={`size-5 rounded-full border border-ink/20 ${selected === i ? "ring-2 ring-ink ring-offset-1 ring-offset-paper" : ""}`}
                          />
                        </button>
                      ))}
                      <span className="ml-1 text-xs font-semibold text-[#55544f]">
                        {p.colours.length} colours
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col items-start gap-2 text-[19px] leading-tight font-bold">
                    <h3 className="min-w-0 max-w-full truncate">{p.name}</h3>
                    <span className="flex items-baseline gap-2">
                      <del className="text-xs font-normal text-[#77756c]">MRP ₹{mrpPrice(p)}</del>
                      <span>₹{salePrice(p)}</span>
                    </span>
                  </div>
                  <p className="mt-1.5 min-h-[42px] text-sm leading-relaxed text-[#55544f]">
                    {p.note}
                  </p>
                  <button
                    onClick={() => {
                      router.push(
                        `/products/${p.id}?colour=${p.colours[selected].file}`,
                      );
                    }}
                    className="mt-3 flex h-[52px] items-center justify-center gap-2 border border-ink text-[15px] font-bold transition-colors hover:bg-ink hover:text-paper"
                  >
                    View product
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </button>
                </article>
              );
            })}
          </div>
          {!shown.length && (
            <div className="py-16">
              <p>No pieces match your search.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-4 underline"
              >
                Show all pieces
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
