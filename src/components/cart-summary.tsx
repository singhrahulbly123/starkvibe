"use client";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice, prepareBagEnquiry, type BagItem } from "@/lib/bag";

export function CartSummary({
  items,
  count,
  subtotal,
  note,
  couponCode,
  couponDiscount = 0,
  couponError,
  couponLoading = false,
  onCouponCodeChange,
  onApplyCoupon,
  onRemoveCoupon,
}: {
  items: BagItem[];
  count: number;
  subtotal: number;
  note: string;
  couponCode: string;
  couponDiscount?: number;
  couponError?: string;
  couponLoading?: boolean;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
}) {
  const total = Math.max(0, subtotal - couponDiscount);
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
        <div className="border-b border-[#2e2e2a] py-4">
          <label htmlFor="cart-coupon" className="block text-sm font-bold text-paper">
            Coupon code
          </label>
          <div className="mt-3 flex gap-2">
            <input
              id="cart-coupon"
              value={couponCode}
              onChange={(event) => onCouponCodeChange(event.target.value.toUpperCase())}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onApplyCoupon();
                }
              }}
              placeholder="WINTER20"
              className="min-w-0 flex-1 border border-[#69675f] bg-transparent px-3 py-2.5 text-sm text-paper placeholder:text-[#9a988f]"
            />
            <button
              type="button"
              onClick={onApplyCoupon}
              disabled={couponLoading || !couponCode.trim()}
              className="bg-paper px-4 py-2.5 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {couponLoading ? "Checking…" : "Apply"}
            </button>
          </div>
          {couponDiscount > 0 && (
            <p className="mt-2 text-sm font-semibold text-gold">
              {couponCode} applied — {formatPrice(couponDiscount)} off. {" "}
              <button type="button" onClick={onRemoveCoupon} className="underline">
                Remove
              </button>
            </p>
          )}
          {couponError && <p className="mt-2 text-sm font-semibold text-[#ff9d8d]" role="alert">{couponError}</p>}
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between gap-4 border-b border-[#2e2e2a] py-3.5">
            <dt className="text-[#c9c7be]">Coupon discount</dt>
            <dd className="font-bold text-gold">−{formatPrice(couponDiscount)}</dd>
          </div>
        )}
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
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
      <p className="mb-7 text-[13px] leading-relaxed text-[#9a988f]">
        Shipping and payment options are confirmed before your order is placed.
      </p>
      <Link
        href="/checkout"
        aria-label="Proceed to checkout"
        className="flex min-h-[64px] items-center justify-center gap-3 rounded-sm bg-[#e8bc63] px-4 text-center text-[17px] font-extrabold text-ink shadow-[0_5px_0_rgba(232,188,99,0.35)] ring-2 ring-[#e8bc63] ring-offset-2 ring-offset-ink transition-all hover:-translate-y-0.5 hover:bg-[#dca94c] hover:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-paper"
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
          href="/custom-printing"
          onClick={() => prepareBagEnquiry(items, note)}
          className="inline-block border-b border-gold py-2.5 text-sm font-bold text-gold"
        >
          Request a quote →
        </Link>
      </div>
    </aside>
  );
}
