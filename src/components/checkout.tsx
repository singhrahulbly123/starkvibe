"use client";

import {
  useEffect,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, Mail } from "lucide-react";
import { useBag, formatPrice } from "@/lib/bag";
import { productImage, salePrice } from "@/lib/catalogue";

const paymentMethods = [
  "Cash on delivery",
] as const;

function Field({
  label,
  icon,
  ...input
}: InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={input.id} className="mb-2 block text-sm font-bold">
        {label}
      </label>
      <div className="relative">
        <input
          {...input}
          className={`h-14 w-full border-[1.5px] border-ink bg-transparent px-4 text-base placeholder:text-[#7a776e] ${icon ? "pr-12" : ""}`}
        />
        {icon && <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-olive">{icon}</span>}
      </div>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="mb-14 min-w-0 border-0 p-0">
      <legend className="mb-6 flex w-full items-center gap-4">
        <span className="inline-flex size-10 shrink-0 items-center justify-center bg-ink text-base font-extrabold text-paper">
          {number}
        </span>
        <span className="font-display text-[36px] leading-none font-black uppercase sm:text-[44px]">
          {title}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

export function Checkout() {
  const { items, ready, subtotal, count } = useBag();
  const [business, setBusiness] = useState(false);
  const [shipping, setShipping] = useState("Standard delivery");
  const [payment, setPayment] =
    useState<(typeof paymentMethods)[number]>("Cash on delivery");
  const [prepared, setPrepared] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("starkvibe-user-email") || "");
  }, []);

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;
    const data = new FormData(event.currentTarget);
    const orderId = `SV-${Date.now().toString().slice(-8)}`;
    const orderRecord = {
      id: orderId,
      createdAt: new Date().toLocaleDateString("en-IN"),
      summary: items
        .map(
          (item) =>
            `${item.quantity} × ${item.product.name} (${item.product.colours[item.colour].name}, ${item.size})`,
        )
        .join(", "),
      total: formatPrice(subtotal),
      status: "Order request" as const,
    };
    try {
      const previous = JSON.parse(
        localStorage.getItem("starkvibe-account-orders") || "[]",
      );
      localStorage.setItem(
        "starkvibe-account-orders",
        JSON.stringify([orderRecord, ...(Array.isArray(previous) ? previous : [])]),
      );
      localStorage.setItem(
        "starkvibe-account-user",
        JSON.stringify({
          name: `${data.get("first")} ${data.get("last")}`.trim(),
          email: data.get("email"),
          phone: data.get("phone"),
        }),
      );
      localStorage.setItem("starkvibe-user-email", String(data.get("email") || ""));
    } catch {
      // The WhatsApp order flow still works if browser storage is unavailable.
    }
    const order = [
      `StarkVibe order request ${orderId} — awaiting confirmation`,
      ...items.map(
        (item) =>
          `${item.quantity} × ${item.product.name}, ${item.product.colours[item.colour].name}, size ${item.size}: ${formatPrice(item.quantity * salePrice(item.product))}`,
      ),
      `Subtotal: ${formatPrice(subtotal)} (shipping to be confirmed)`,
      `Name: ${data.get("first")} ${data.get("last")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `WhatsApp updates: ${data.has("whatsapp") ? "Yes" : "No"}`,
      `Address: ${["address", "apartment", "city", "state", "pin"]
        .map((name) => data.get(name))
        .filter(Boolean)
        .join(", ")}`,
      ...(business
        ? [`Business: ${data.get("business")}`, `GSTIN: ${data.get("gstin")}`]
        : []),
      `Delivery preference: ${shipping}`,
      `Payment preference: ${payment}`,
      `Order note: ${localStorage.getItem("starkvibe-order-note") || "None"}`,
    ].join("\n");
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "917060421033";
    if (phone) {
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(order)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const url = URL.createObjectURL(
        new Blob([order], { type: "text/plain;charset=utf-8" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "starkvibe-order-request.txt";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    setPrepared(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <a
        href="#checkout"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:p-4"
      >
        Skip to checkout
      </a>
      <header className="border-b-[1.5px] border-ink">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 items-center gap-4 px-5 py-6 sm:grid-cols-3 sm:px-8 lg:px-12">
          <Link
            href="/cart"
            className="inline-flex min-h-10 items-center gap-2.5 text-sm font-bold sm:text-[15px]"
          >
            <ArrowLeft size={18} />
            Back to bag
          </Link>
          <Link
            href="/"
            aria-label="StarkVibe home"
            className="flex items-center justify-end sm:justify-center"
          >
            <Image
              src="/branding/starkvibe-wordmark-premium.png"
              alt="StarkVibe"
              width={280}
              height={88}
              className="h-auto w-[150px] sm:w-[190px]"
            />
          </Link>
          <span className="col-span-2 flex items-center justify-end gap-2.5 text-sm font-semibold sm:col-span-1">
            <LockKeyhole size={18} className="text-olive" />
            Secure checkout
          </span>
        </div>
      </header>
      <main
        id="checkout"
        className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-8 lg:px-12"
      >
        {!ready ? (
          <p className="py-20" role="status">
            Loading your bag…
          </p>
        ) : !items.length ? (
          <section className="py-16">
            <h1 className="font-display text-7xl font-black uppercase">
              Your bag is empty.
            </h1>
            <p className="mt-6">Pick your pieces before you check out.</p>
            <Link
              href="/shop"
              className="mt-8 inline-flex h-14 items-center gap-4 bg-gold px-8 font-bold"
            >
              Explore the range <ArrowRight size={18} />
            </Link>
          </section>
        ) : prepared ? (
          <section className="bg-ink p-8 text-paper sm:p-16" role="status">
            <p className="mb-6 flex items-center gap-3 text-sm font-bold tracking-[.18em] text-gold uppercase">
              <Check size={22} />
              Ready for the next step
            </p>
            <h1 className="font-display text-[clamp(64px,10vw,144px)] leading-[.84] font-black uppercase">
              Order request
              <br />
              <span className="text-gold">prepared.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">
              {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
                ? "Your request is ready in WhatsApp. Send it there so the team can confirm availability, delivery and payment."
                : "Your order request has been downloaded. No payment has been taken and your order is not confirmed yet."}
            </p>
            <p className="mt-5 font-bold">
              {count} {count === 1 ? "piece" : "pieces"} ·{" "}
              {formatPrice(subtotal)} before shipping
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cart"
                className="bg-gold px-7 py-4 font-bold text-ink"
              >
                Back to bag
              </Link>
              <Link
                href="/shop"
                className="border border-paper px-7 py-4 font-semibold"
              >
                Continue shopping
              </Link>
              <button
                onClick={() => setPrepared(false)}
                className="px-2 py-4 underline underline-offset-4"
              >
                Edit checkout details
              </button>
            </div>
          </section>
        ) : (
          <>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <h1 className="font-display text-[clamp(68px,10vw,160px)] leading-[.84] font-black tracking-[-.01em] uppercase">
                Almost <span className="text-olive">there.</span>
              </h1>
              <ol
                aria-label="Checkout steps"
                className="flex flex-wrap gap-x-7 gap-y-3 pb-2 text-[15px] font-semibold"
              >
                {["Bag", "Details", "Payment"].map((step, index) => (
                  <li key={step} className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex size-[30px] items-center justify-center rounded-full text-[13px] font-extrabold text-paper ${index === 0 ? "bg-olive" : "bg-ink"}`}
                    >
                      {index === 0 ? <Check size={14} /> : index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid items-start gap-x-16 gap-y-14 lg:grid-cols-[1.5fr_1fr]">
              <form
                id="checkout-form"
                onSubmit={placeOrder}
                className="min-w-0"
              >
                <Section number={1} title="Contact">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Email"
                      icon={<Mail size={19} />}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                    <Field
                      label="Phone / WhatsApp"
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Your phone number"
                      pattern="[+0-9 ()-]{8,20}"
                      required
                    />
                  </div>
                  <label className="mt-[18px] flex min-h-11 cursor-pointer items-center gap-3.5 text-[15px]">
                    <input
                      type="checkbox"
                      name="whatsapp"
                      defaultChecked
                      className="size-[22px] shrink-0 accent-ink"
                    />
                    Send order updates on WhatsApp
                  </label>
                </Section>
                <Section number={2} title="Delivery address">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="First name"
                      id="first"
                      name="first"
                      autoComplete="given-name"
                      required
                    />
                    <Field
                      label="Last name"
                      id="last"
                      name="last"
                      autoComplete="family-name"
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <Field
                      label="Address"
                      id="address"
                      name="address"
                      autoComplete="address-line1"
                      placeholder="House number, street"
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <Field
                      label="Apartment, landmark (optional)"
                      id="apartment"
                      name="apartment"
                      autoComplete="address-line2"
                    />
                  </div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-3">
                    <Field
                      label="City"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      required
                    />
                    <Field
                      label="State"
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      required
                    />
                    <Field
                      label="PIN code"
                      id="pin"
                      name="pin"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      pattern="[1-9][0-9]{5}"
                      maxLength={6}
                      title="Enter a six-digit Indian PIN code"
                      required
                    />
                  </div>
                  <div
                    className={`mt-6 border-[1.5px] border-ink p-5 ${business ? "bg-[#e2dfd6]" : ""}`}
                  >
                    <label className="flex min-h-11 cursor-pointer items-center gap-3.5 font-bold">
                      <input
                        type="checkbox"
                        checked={business}
                        onChange={(event) => setBusiness(event.target.checked)}
                        className="size-[22px] shrink-0 accent-ink"
                      />
                      This is a business order
                    </label>
                    <p className="mt-0.5 ml-9 text-sm text-[#55544f]">
                      Add your GSTIN to request a tax invoice.
                    </p>
                    {business && (
                      <div className="mt-[18px] grid gap-5 sm:grid-cols-2">
                        <Field
                          label="GSTIN"
                          id="gstin"
                          name="gstin"
                          placeholder="Your 15-character GSTIN"
                          minLength={15}
                          maxLength={15}
                          pattern="[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z][1-9A-Za-z][Zz][0-9A-Za-z]"
                          required
                        />
                        <Field
                          label="Business name"
                          id="business"
                          name="business"
                          autoComplete="organization"
                          required
                        />
                      </div>
                    )}
                  </div>
                </Section>
                <Section number={3} title="Shipping method">
                  <div className="flex flex-col gap-2.5">
                    {["Standard delivery", "Express delivery"].map((method) => (
                      <label
                        key={method}
                        className={`flex min-h-[72px] cursor-pointer items-center gap-4 border-[1.5px] border-ink px-5 py-3.5 ${shipping === method ? "bg-[#e2dfd6]" : ""}`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method}
                          checked={shipping === method}
                          onChange={() => setShipping(method)}
                          className="size-[22px] shrink-0 accent-ink"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[17px] font-bold">
                            {method}
                          </span>
                          <span className="mt-0.5 block text-sm text-[#55544f]">
                            Timing confirmed for your PIN code
                          </span>
                        </span>
                        <span className="text-right text-sm font-bold">
                          To be
                          <br className="sm:hidden" /> confirmed
                        </span>
                      </label>
                    ))}
                  </div>
                </Section>
                <Section number={4} title="Payment">
                  <div
                    role="group"
                    aria-label="Payment method"
                    className="mb-6 grid grid-cols-2 gap-2.5 xl:grid-cols-4"
                  >
                    {paymentMethods.map((method) => (
                      <button
                        key={method}
                        type="button"
                        aria-pressed={payment === method}
                        onClick={() => setPayment(method)}
                        className={`min-h-16 border-[1.5px] border-ink px-3 py-3 text-base font-bold transition-colors ${payment === method ? "bg-ink text-paper" : "hover:bg-ink/5"}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                  <div className="border-[1.5px] border-ink p-5 sm:p-8">
                    <>
                      <h3 className="mb-2 font-bold">Cash on delivery</h3>
                      <p className="text-[15px] leading-relaxed text-[#3f3e3a]">
                        Pay when your order arrives. The team will confirm COD availability for your delivery address before dispatch.
                      </p>
                    </>
                  </div>
                </Section>
                <p className="max-w-[520px] text-sm leading-relaxed text-[#55544f]">
                  Placing an order prepares a request for the team.
                  Availability, shipping charges and payment are confirmed
                  before your order is accepted.
                </p>
              </form>
              <aside
                aria-label="Your order"
                className="min-w-0 bg-ink p-6 text-paper sm:p-10"
              >
                <div className="mb-6 flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-[44px] leading-[.95] font-black uppercase">
                    Your order
                  </h2>
                  <Link
                    href="/cart"
                    className="border-b-[1.5px] border-gold py-2.5 text-sm font-bold text-gold"
                  >
                    Edit bag
                  </Link>
                </div>
                <ul className="border-t border-[#2e2e2a]">
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className="flex items-center gap-4 border-b border-[#2e2e2a] py-4"
                    >
                      <div className="relative h-[88px] w-[72px] shrink-0 bg-[#e4e2da]">
                        <Image
                          src={productImage(
                            item.product,
                            item.product.colours[item.colour],
                          )}
                          alt={`${item.product.name} in ${item.product.colours[item.colour].name}`}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                        <span className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-gold px-1.5 text-[13px] font-extrabold text-ink">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[15px] leading-[1.3] font-bold">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-[13px] text-[#b9b7ae]">
                          {item.product.colours[item.colour].name} · Size{" "}
                          {item.size}
                        </p>
                      </div>
                      <span className="text-[15px] font-bold whitespace-nowrap">
                        {formatPrice(item.quantity * salePrice(item.product))}
                      </span>
                    </li>
                  ))}
                </ul>
                <dl>
                  <div className="flex justify-between gap-4 border-b border-[#2e2e2a] py-4">
                    <dt className="text-[#c9c7be]">Subtotal</dt>
                    <dd className="font-bold">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[#2e2e2a] py-4">
                    <dt className="text-[#c9c7be]">Shipping</dt>
                    <dd className="text-right font-semibold text-[#c9c7be]">
                      {shipping}
                      <span className="block text-xs font-normal">
                        Rate to be confirmed
                      </span>
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-4 pt-[22px] pb-1.5">
                    <dt className="font-semibold">Total before shipping</dt>
                    <dd className="font-display text-[54px] leading-none font-black text-gold">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                </dl>
                <p className="mb-7 text-[13px] leading-relaxed text-[#9a988f]">
                  Your selected delivery method will be included in your order
                  request.
                </p>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex h-16 w-full items-center justify-center gap-3 bg-gold px-4 text-[17px] font-extrabold text-ink transition-colors hover:bg-paper"
                >
                  Place order <ArrowRight size={18} />
                </button>
                <ul className="mt-6 space-y-3 text-sm text-[#c9c7be]">
                  {[
                    "No payment collected on this page",
                    "Delivery details confirmed with you",
                    "Your bag stays saved until confirmation",
                  ].map((text) => (
                    <li key={text} className="flex items-center gap-3">
                      <Check size={18} className="shrink-0 text-gold" />
                      {text}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </>
        )}
      </main>
      <footer className="mt-28 bg-ink text-paper">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 py-10 text-sm sm:px-8 lg:px-12">
          <Link
            href="/"
            className="inline-flex"
          >
            <Image
              src="/branding/starkvibe-wordmark-premium.png"
              alt="StarkVibe"
              width={280}
              height={88}
              className="h-auto w-[150px] brightness-0 invert"
            />
          </Link>
          <nav
            aria-label="Checkout footer"
            className="flex flex-wrap gap-x-7 gap-y-1"
          >
            <Link href="/cart" className="py-2.5 text-[#c9c7be]">
              Back to bag
            </Link>
            <Link href="/shop" className="py-2.5 text-[#c9c7be]">
              Shop
            </Link>
            <Link href="/#custom" className="py-2.5 text-[#c9c7be]">
              Contact
            </Link>
          </nav>
          <p className="text-[#8f8d84]">
            © 2026 StarkVibe. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
