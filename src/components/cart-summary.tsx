"use client";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice, prepareBagEnquiry, type BagItem } from "@/lib/bag";

export function CartSummary({
  items,
  count,
  subtotal,
  note,
}: {
  items: BagItem[];
  count: number;
  subtotal: number;
  note: string;
}) {
  return (
    <aside
      aria-label="Order summary"
      className="min-w-0 bg-ink p-6 text-paper lg:p-10"
    >
      <h2 className="mb-7 font-display text-[44px] leading-[.95] font-black uppercase">
        Order summary
      </h2>
      <dl>
        <div className="flex justify-between gap-4 border-b border-[#2e2e2a] py-3.5">
          <dt className="text-[#c9c7be]">
            Subtotal ({count} {count === 1 ? "piece" : "pieces"})
          </dt>
          <dd className="font-bold">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-[#2e2e2a] py-3.5">
          <dt className="text-[#c9c7be]">Shipping</dt>
          <dd className="text-right font-semibold text-[#c9c7be]">
            Confirmed with your order
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 pt-[22px] pb-2">
          <dt className="font-semibold">Estimated total</dt>
          <dd
            aria-live="polite"
            className="font-display text-[56px] leading-none font-black text-gold"
          >
            {formatPrice(subtotal)}
          </dd>
        </div>
      </dl>
      <p className="mb-7 text-[13px] leading-relaxed text-[#9a988f]">
        Shipping and payment options are confirmed before your order is placed.
      </p>
      <Link
        href="/checkout"
        className="flex min-h-[62px] items-center justify-center gap-3 bg-gold px-4 text-center text-[17px] font-extrabold text-ink transition-colors hover:bg-paper"
      >
        Proceed to checkout
        <ArrowRight size={18} />
      </Link>
      <p className="mt-3 text-xs leading-relaxed text-[#9a988f]">
        Add your delivery details and choose your preferred payment method.
      </p>
      <ul className="mt-7 space-y-3 text-sm text-[#c9c7be]">
        {[
          "Your selected colours, sizes and quantities",
          "Delivery and return terms confirmed with you",
          "Real human support for your order",
        ].map((text) => (
          <li key={text} className="flex items-start gap-3">
            <Check size={18} className="shrink-0 text-gold" />
            {text}
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t border-[#2e2e2a] pt-6">
        <h3 className="mb-1.5 font-bold">Ordering for a team or brand?</h3>
        <p className="mb-3.5 text-sm leading-[1.55] text-[#c9c7be]">
          Every piece takes custom printing and branding. Get a quote before you
          check out.
        </p>
        <Link
          href="/#custom"
          onClick={() => prepareBagEnquiry(items, note)}
          className="inline-block border-b border-gold py-2.5 text-sm font-bold text-gold"
        >
          Request a quote →
        </Link>
      </div>
    </aside>
  );
}
