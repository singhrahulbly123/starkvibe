"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, productImage, salePrice } from "@/lib/catalogue";
import { addBagItem, formatPrice, useBag } from "@/lib/bag";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { Reveal } from "./reveal";

const container = "mx-auto max-w-[1400px] px-5 lg:px-12";
export function CartPageContent() {
  const {
    items,
    saved,
    ready,
    count,
    subtotal,
    remove,
    changeQuantity,
    saveForLater,
    restore,
    removeSaved,
  } = useBag();
  const [note, setNote] = useState("");
  const [noteReady, setNoteReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    setNote(localStorage.getItem("starkvibe-order-note") || "");
    setNoteReady(true);
  }, []);
  useEffect(() => {
    if (noteReady) localStorage.setItem("starkvibe-order-note", note);
  }, [note, noteReady]);
  const suggestions = [
    "terry",
    "polo",
    "kids",
    "regular",
    "sweatshirt",
    "oversized",
    "hoodie",
  ]
    .filter((id) => !items.some((i) => i.product.id === id))
    .slice(0, 3)
    .map((id) => products.find((p) => p.id === id)!);
  return (
    <>
      <section className={`${container} pt-7`}>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <h1 className="font-display text-[clamp(76px,12vw,190px)] leading-[.82] font-black tracking-[-.01em] uppercase">
            Your <span className="text-olive">bag.</span>
          </h1>
          <ol
            aria-label="Order progress"
            className="flex flex-wrap gap-x-7 gap-y-2.5 pb-2 text-[15px] font-semibold"
          >
            {["Bag", "Details", "Payment"].map((step, index) => (
              <li
                key={step}
                aria-current={index === 0 ? "step" : undefined}
                className={`flex items-center gap-2.5 ${index ? "text-[#6e6b62]" : ""}`}
              >
                <span
                  className={`flex size-[30px] items-center justify-center rounded-full text-[13px] font-extrabold ${index ? "border border-[#6e6b62]" : "bg-ink text-paper"}`}
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>
      {!ready ? (
        <div className={`${container} py-16`} role="status">
          Loading your bag…
        </div>
      ) : items.length ? (
        <section
          className={`${container} grid items-start gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16`}
        >
          <div id="cart-items" className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/60 pb-3.5">
              <p className="text-[13px] font-extrabold tracking-[.16em] uppercase">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                bag
              </p>
              <Link
                href="/shop"
                className="border-b border-ink py-2.5 text-sm font-bold"
              >
                Continue shopping
              </Link>
            </div>
            {items.map((item) => (
              <CartItem
                key={item.key}
                item={item}
                onQuantityChange={(quantity) =>
                  changeQuantity(item.key, quantity)
                }
                onRemove={() => {
                  remove(item.key);
                  setAnnouncement(
                    `${item.product.name} removed from your bag.`,
                  );
                }}
                onSave={() => {
                  saveForLater(item.key);
                  setAnnouncement(`${item.product.name} saved for later.`);
                }}
              />
            ))}
            <div className="mt-10">
              <label
                htmlFor="order-note"
                className="mb-2.5 block text-sm font-bold"
              >
                Order note{" "}
                <span className="font-medium text-[#55544f]">(optional)</span>
              </label>
              <textarea
                id="order-note"
                rows={3}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Anything we should know about this order?"
                className="w-full resize-y border border-ink/60 bg-transparent p-3.5 text-base"
              />
            </div>
          </div>
          <CartSummary
            items={items}
            count={count}
            subtotal={subtotal}
            note={note}
          />
        </section>
      ) : (
        <section id="cart-items" className={container}>
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 border border-ink p-8 lg:p-[7vw]">
            <div>
              <h2 className="mb-[18px] font-display text-[clamp(52px,7vw,110px)] leading-[.88] font-black uppercase">
                Nothing
                <br />
                in here yet.
              </h2>
              <p className="max-w-[420px] text-lg leading-[1.55] text-[#3f3e3a]">
                Pick a weight, pick a colour, and your first piece will show up
                here.
              </p>
            </div>
            <Link
              href="/shop"
              className="flex h-[60px] items-center bg-ink px-[38px] font-bold text-paper transition-colors hover:bg-olive"
            >
              Shop the range
            </Link>
          </div>
        </section>
      )}
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      {saved.length > 0 && (
        <section className={`${container} pt-24`}>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-[clamp(44px,5vw,76px)] leading-[.9] font-black uppercase">
              Saved for later
            </h2>
            <p className="text-sm text-[#55544f]">
              {saved.length} {saved.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <div className="border-t border-ink/60">
            {saved.map((item) => (
              <div
                key={item.key}
                className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-ink/60 py-[18px]"
              >
                <Link
                  href={`/products/${item.product.id}?colour=${item.product.colours[item.colour].file}`}
                >
                  <Image
                    src={productImage(
                      item.product,
                      item.product.colours[item.colour],
                    )}
                    alt={item.product.name}
                    width={84}
                    height={100}
                    className="h-[100px] w-[84px] object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-[1_1_220px]">
                  <h3 className="mb-1 text-lg font-bold">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-[#55544f]">
                    {item.product.colours[item.colour].name} · Size {item.size}{" "}
                    · {formatPrice(salePrice(item.product))}
                  </p>
                </div>
                <button
                  aria-label={`Move ${item.product.name} to bag`}
                  onClick={() => restore(item.key)}
                  className="h-12 border border-ink px-6 text-[15px] font-bold transition-colors hover:bg-ink hover:text-paper"
                >
                  Move to bag
                </button>
                <button
                  aria-label={`Remove saved ${item.product.name}`}
                  onClick={() => removeSaved(item.key)}
                  className="h-12 text-sm font-semibold text-[#8a2a12] underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className={`${container} pt-20 lg:pt-32`}>
        <Reveal>
          <div className="mb-11 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <p className="mb-[18px] text-[13px] font-bold tracking-[.18em] text-olive uppercase">
                Add to your order
              </p>
              <h2 className="font-display text-[clamp(46px,6vw,92px)] leading-[.88] font-black uppercase">
                Round out
                <br />
                the set.
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
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((product) => (
            <article key={product.id} className="flex min-w-0 flex-col">
              <Link
                href={`/products/${product.id}`}
                className="group relative h-[340px] overflow-hidden bg-[#e4e2da]"
              >
                <Image
                  src={productImage(product, product.colours[0])}
                  alt={`${product.name} in Black`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute top-3.5 left-3.5 bg-ink px-3 py-[7px] text-xs font-bold tracking-[.1em] text-paper">
                  {product.gsm} GSM
                </span>
              </Link>
              <div className="mt-[18px] flex items-start justify-between gap-4 text-lg leading-tight font-bold">
                <h3 className="min-w-0 max-w-full truncate">{product.name}</h3>
                <span className="shrink-0">{formatPrice(salePrice(product))}</span>
              </div>
              <p className="mt-1.5 text-sm text-[#55544f]">
                Black · Size {product.id === "kids" ? "6–8 years" : "M"}
              </p>
              <button
                aria-label={`Quick add ${product.name}`}
                onClick={() => {
                  const size = product.id === "kids" ? "6–8 years" : "M";
                  addBagItem({
                    key: `${product.id}-0-${size}`,
                    product,
                    colour: 0,
                    size,
                    quantity: 1,
                  });
                  setAnnouncement(`${product.name} added to your bag.`);
                }}
                className="mt-3.5 h-[52px] border border-ink text-[15px] font-bold transition-colors hover:bg-ink hover:text-paper"
              >
                Quick add
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
