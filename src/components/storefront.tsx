"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addBagItem, useBag, type BagItem } from "@/lib/bag";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  House,
  Menu,
  Palette,
  Search,
  ShoppingBag,
  Shirt,
  UserRound,
  X,
} from "lucide-react";
import { filters, getProductBySlug, mrpPrice, productImage, products, productSlug, salePrice } from "@/lib/catalogue";
import { Reveal } from "./reveal";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

const fullRangePreviewColours: Record<string, string> = {
  oversized: "brown",
  regular: "sea-green",
  terry: "beige",
  polo: "white",
  kids: "orange",
  sweatshirt: "off-white",
  hoodie: "coffee-brown",
};
const fullRangeOrder = ["polo", "kids", "sweatshirt", "hoodie", "oversized", "regular", "terry"];

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
  const rangeTrackRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const shown = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  ).sort(
    (a, b) => fullRangeOrder.indexOf(a.id) - fullRangeOrder.indexOf(b.id),
  );
  const links = [
    ["Shop", "/shop"],
    ["Birthday printing", "/custom-printing/birthday"],
    ["Office & bulk", "/custom-printing/office-bulk"],
    ["Anniversary wear", "/custom-printing/anniversary"],
    ["Custom gifting", "/custom-printing/gifting"],
    ["Campaign merchandise", "/custom-printing/political-campaigns"],
  ];
  const desktopLinks = links.filter(([label]) => label !== "My account");
  const ownBreadcrumbPages = ["/about", "/blog", "/contact", "/editorial-policy"];
  const showSharedBreadcrumb =
    pathname !== "/" &&
    !ownBreadcrumbPages.includes(pathname) &&
    !pathname.startsWith("/blog/") &&
    !pathname.startsWith("/products/") &&
    !pathname.startsWith("/locations/");
  const breadcrumbOnDark = pathname.startsWith("/custom-printing");
  const titleCase = (value: string) =>
    value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
      .replace("T Shirts", "T-shirts");
  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = [{ name: "Home", path: "/" }];
  if (pathname.startsWith("/products/")) {
    const product = getProductBySlug(pathParts[1]);
    breadcrumbItems.push({ name: "Shop", path: "/shop" });
    breadcrumbItems.push({
      name: product?.name || "Product",
      path: pathname.split("?")[0],
    });
  } else if (pathParts[0] === "locations") {
    breadcrumbItems.push({ name: "Locations", path: "/locations" });
    if (pathParts[1]) breadcrumbItems.push({ name: titleCase(pathParts[1]), path: pathname });
  } else if (pathParts[0] === "custom-printing") {
    breadcrumbItems.push({ name: "Custom Printing", path: "/custom-printing" });
    if (pathParts[1]) breadcrumbItems.push({ name: titleCase(pathParts[1]), path: pathname });
  } else if (pathParts[0] === "shop") {
    breadcrumbItems.push({ name: "Shop", path: "/shop" });
    if (pathParts[1]) breadcrumbItems.push({ name: titleCase(pathParts[1]), path: pathname });
  } else if (pathname === "/cart") {
    breadcrumbItems.push({ name: "Your bag", path: "/cart" });
  } else if (pathname === "/my-account") {
    breadcrumbItems.push({ name: "Account", path: "/my-account" });
  } else if (pathParts[0]) {
    breadcrumbItems.push({ name: titleCase(pathParts[pathParts.length - 1]), path: pathname });
  }
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] isolate mx-auto flex h-[60px] w-full flex-nowrap items-center gap-2 border-b border-ink/15 bg-paper/95 px-5 py-2 shadow-[0_6px_18px_rgba(13,13,12,.08)] backdrop-blur-md lg:h-[76px] lg:gap-3 lg:px-12">
        <nav
          aria-label="Main navigation"
          className="hidden gap-6 whitespace-nowrap text-[13px] font-semibold tracking-[.02em] uppercase lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2"
        >
          {desktopLinks.map(([label, href]) => (
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
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="order-3 flex size-11 shrink-0 items-center justify-center border border-ink/15 bg-paper transition-colors hover:bg-ink hover:text-paper lg:hidden"
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
        <div className="order-2 ml-auto flex items-center justify-end gap-1 lg:flex-1">
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 lg:p-3"
          >
            <Search size={22} />
          </button>
          <Link
            href="/my-account"
            aria-label="My account"
            aria-current={pathname === "/my-account" ? "page" : undefined}
            className={`hidden size-11 shrink-0 items-center justify-center border border-ink/15 transition-colors hover:bg-ink hover:text-paper lg:flex ${pathname === "/my-account" ? "bg-ink text-paper" : ""}`}
          >
            <UserRound size={20} />
          </Link>
          <Link
            href="/cart"
            aria-label={`Open cart (${count} items)`}
            className="relative flex size-11 shrink-0 items-center justify-center bg-ink text-paper lg:h-11 lg:w-auto lg:gap-2 lg:px-4 lg:text-sm"
          >
            <ShoppingBag size={18} />
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-ink lg:static lg:size-auto lg:rounded-none lg:bg-transparent lg:text-sm lg:font-semibold lg:text-paper">
              <span className="lg:hidden">{count}</span>
              <span className="hidden lg:inline">Bag ({count})</span>
            </span>
          </Link>
        </div>
        <div
          aria-hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 z-[80] bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        />
        <aside
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          className={`fixed inset-y-0 left-0 z-[90] flex w-[min(88vw,380px)] flex-col bg-paper px-6 pb-8 pt-5 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-ink/15 pb-5">
            <Image
              src="/branding/starkvibe-wordmark-premium.png"
              alt="StarkVibe"
              width={280}
              height={88}
              className="h-auto w-[145px]"
            />
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex size-11 items-center justify-center border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
            >
              <X size={21} />
            </button>
          </div>
          <p className="mt-8 text-[11px] font-bold tracking-[.2em] text-olive uppercase">
            Explore StarkVibe
          </p>
          <nav className="mt-3 flex flex-col" aria-label="Mobile navigation links">
            {links.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center justify-between border-b border-ink/10 py-4 text-[17px] font-semibold transition-colors hover:text-olive ${href === pathname ? "text-olive" : ""}`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-sm text-ink/35">0{index + 1}</span>
                  {label}
                </span>
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-ink/15 pt-5 text-sm text-ink/65">
            <p className="font-semibold text-ink">Premium cotton. Honest finish.</p>
            <p className="mt-1">Custom prints for moments worth keeping.</p>
          </div>
        </aside>
        {searchOpen && (
          <div
            className="fixed inset-0 z-[75] bg-ink/45 px-4 pt-20 backdrop-blur-sm sm:pt-28"
            role="presentation"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="mx-auto w-full max-w-2xl overflow-hidden border border-ink bg-paper shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Search products"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center border-b border-ink/20 px-4">
                <Search size={20} className="shrink-0 text-olive" />
                <label className="sr-only" htmlFor="search">
                  Search the range
                </label>
                <input
                  autoFocus
                  id="search"
                  value={query}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setSearchOpen(false);
                  }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    document
                      .getElementById("range")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  placeholder="Search tees, polos, fleece…"
                  className="h-16 w-full bg-transparent px-3 outline-none"
                />
                <button
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="flex size-9 shrink-0 items-center justify-center border border-ink/15 text-sm transition-colors hover:bg-ink hover:text-paper"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              {hideRange && (
                <div className="border-x border-b border-ink bg-paper p-3">
                  {shown.map((product) => (
                    <a
                      key={product.id}
                      href={`/products/${productSlug(product)}`}
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
          </div>
        )}
      </header>
      {/* <div aria-hidden="true" className="h-[60px] lg:h-[76px]" /> */}
      {showSharedBreadcrumb && (
        <Breadcrumbs items={breadcrumbItems} dark={breadcrumbOnDark} emitJsonLd={false} />
      )}
      {children}
      {!hideRange && (
        <section
          id="range"
          className="mx-auto max-w-[1400px] px-5 pt-20 lg:px-12"
        >
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="mb-[18px] text-[13px] font-semibold tracking-[.18em] text-olive uppercase">
                  The full range
                </p>
                <h2 className="whitespace-nowrap font-display text-[clamp(24px,4vw,60px)] leading-none font-black uppercase">
                  Seven pieces. No filler.
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
                <button
                  type="button"
                  aria-label="Previous products"
                  onClick={() => rangeTrackRef.current?.scrollBy({ left: -rangeTrackRef.current.clientWidth * 0.8, behavior: "smooth" })}
                  className="flex size-[46px] items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <ChevronLeft size={19} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next products"
                  onClick={() => rangeTrackRef.current?.scrollBy({ left: rangeTrackRef.current.clientWidth * 0.8, behavior: "smooth" })}
                  className="flex size-[46px] items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
          <p aria-live="polite" className="mb-6 text-sm text-[#55544f]">
            Showing {shown.length} {shown.length === 1 ? "piece" : "pieces"} ·
          </p>
          <div ref={rangeTrackRef} className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
            {shown.map((p) => {
              const preferredColour = fullRangePreviewColours[p.id];
              const selected = Math.max(
                0,
                p.colours.findIndex((colour) => colour.file === preferredColour),
              );
              return (
                <article key={p.id} className="group flex min-w-[84vw] snap-start flex-col border border-ink/15 bg-[#eeece5] p-3 transition-shadow duration-300 hover:shadow-[0_16px_35px_rgba(13,13,12,.1)] sm:min-w-[calc((100%-1.25rem)/2)] xl:min-w-[calc((100%-3.75rem)/4)]">
                  <div className="relative">
                    <button
                      aria-label={`View ${p.name}`}
                      onClick={() => {
                        router.push(
                          `/products/${productSlug(p)}?colour=${p.colours[selected].file}`,
                        );
                      }}
                      className="relative h-[400px] w-full overflow-hidden border border-ink/10 bg-gradient-to-br from-[#e4e2da] via-[#f4f1e9] to-[#d8d3c7] p-1 text-left"
                    >
                      <Image
                        src={productImage(p, p.colours[selected])}
                        alt={`StarkVibe ${p.name} 100% cotton in ${p.colours[selected].name}`}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                      <span className="absolute top-4 left-4 bg-ink px-3 py-2 text-xs font-bold tracking-[.1em] text-paper uppercase">
                        {p.gsm} GSM
                      </span>
                    </button>
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
                        `/products/${productSlug(p)}?colour=${p.colours[selected].file}`,
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
      <nav
        aria-label="Mobile quick navigation"
        className="fixed inset-x-0 bottom-0 z-[70] flex h-[68px] w-full max-w-full items-stretch overflow-hidden border-t border-ink/15 bg-paper/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_25px_rgba(13,13,12,.08)] backdrop-blur-md lg:hidden"
      >
        {[
          ["Home", "/", House],
          ["Shop", "/shop", Shirt],
          ["Custom", "/custom-printing", Palette],
          ["Bag", "/cart", ShoppingBag],
        ].map(([label, href, Icon]) => (
          <Link
            key={href as string}
            href={href as string}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-[.04em] transition-colors ${pathname === href ? "text-olive" : "text-ink/65 hover:text-ink"}`}
          >
            <Icon size={19} strokeWidth={pathname === href ? 2.5 : 1.8} />
            <span>{label as string}{label === "Bag" ? ` (${count})` : ""}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
