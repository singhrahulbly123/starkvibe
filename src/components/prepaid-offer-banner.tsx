"use client";

import { useState } from "react";

const offers = [
  {
    headline: "Custom printing · 10% off",
    subline: "10 × 10 front · ₹300 → ₹270",
    eyebrow: "Front print",
    highlight: "₹270",
  },
  {
    headline: "Print on both sides",
    subline: "10 × 10 front + back · ₹500 → ₹450",
    eyebrow: "Front + back",
    highlight: "₹450",
  },
  {
    headline: "Make the moment yours",
    subline: "Birthday · anniversary · teams · gifting",
    eyebrow: "Custom prints",
    highlight: "10% OFF",
  },
  {
    headline: "Get flat ₹100 off",
    subline: "On prepaid orders above ₹1,199",
    eyebrow: "Use code:",
    highlight: "PREPAID100",
  },
];

export function HomeOfferBanner() {
  const [active, setActive] = useState(0);
  const offer = offers[active];

  return (
    <section aria-label="StarkVibe offers" className="bg-white px-4 pb-4 pt-8 sm:px-8 sm:pb-5">
      <div className="relative mx-auto grid min-h-[104px] max-w-[1240px] grid-cols-1 overflow-hidden bg-ink text-white shadow-sm sm:min-h-[118px] sm:grid-cols-[1.2fr_.8fr] lg:min-h-[132px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-[radial-gradient(circle_at_left,white_0_5px,transparent_5.5px)] bg-[length:12px_14px] sm:w-4" />
        <div className="flex flex-col justify-center px-7 py-4 sm:px-9 lg:px-12">
          <p className="font-display text-[clamp(23px,4vw,43px)] leading-none font-black tracking-[.01em] uppercase">{offer.headline}</p>
          <p className="mt-1.5 text-[clamp(14px,2vw,23px)] leading-tight text-white/90">{offer.subline}</p>
        </div>
        <a href="/custom-printing#pricing-minimums-heading" className="offer-banner-panel relative flex min-h-[68px] items-center bg-gold px-7 py-3 text-ink sm:px-8 lg:px-10">
          <div className="absolute inset-y-0 left-0 w-5 bg-[radial-gradient(circle_at_left,white_0_5px,transparent_5.5px)] bg-[length:12px_14px]" />
          <div className="pl-2 sm:pl-4">
            <p className="text-[11px] font-bold tracking-[.12em] uppercase sm:text-sm">{offer.eyebrow}</p>
            <p className="font-display text-[clamp(25px,3.4vw,40px)] leading-none font-black uppercase">{offer.highlight}</p>
            <p className="mt-1 text-[10px] font-bold tracking-[.1em] uppercase">View offer</p>
          </div>
          <span aria-hidden="true" className="absolute right-5 top-1/2 -translate-y-1/2 rotate-12 text-5xl font-black text-[#e84f5b] drop-shadow-[2px_3px_0_rgba(13,13,12,.2)] sm:right-8 sm:text-6xl">%</span>
        </a>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-[radial-gradient(circle_at_right,white_0_5px,transparent_5.5px)] bg-[length:12px_14px] sm:w-4" />
      </div>
      <div className="mt-2.5 flex justify-center gap-2" role="group" aria-label="Offer banner pages">
        {offers.map((_, dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Show offer ${dot + 1}`}
            aria-pressed={active === dot}
            onClick={() => setActive(dot)}
            className={`size-1.5 rounded-full transition-colors ${active === dot ? "bg-[#1680ef]" : "bg-ink/20 hover:bg-ink/45"}`}
          />
        ))}
      </div>
    </section>
  );
}
