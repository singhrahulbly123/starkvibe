"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const occasions = [
  "College & events",
  "Birthday prints",
  "Anniversary wear",
  "Office & team",
  "Personalised gifts",
];

export function CustomPrintingOfferSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive((current) => (current + 1) % occasions.length);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      aria-label="Custom printing occasions"
      className="mx-auto max-w-[1400px] px-5 pt-[30px] pb-6 sm:px-8 lg:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <Link
        href="/custom-printing"
        className="group relative grid min-h-[180px] overflow-hidden bg-[#e8e2d7] text-ink transition-colors hover:bg-[#e2dacb] sm:min-h-[210px] lg:min-h-[250px] lg:grid-cols-[1fr_auto_1fr]"
      >
        <div className="flex flex-col justify-center px-6 py-7 sm:px-10 lg:px-12">
          <p className="text-[10px] font-bold tracking-[.2em] text-olive uppercase sm:text-xs">
            Custom printing · made for your moment
          </p>
          <h2
            aria-live="polite"
            className="mt-2 max-w-[480px] font-display text-[clamp(36px,4.2vw,60px)] leading-[.9] font-black uppercase"
          >
            {occasions[active]}
          </h2>
          <p className="mt-2 text-sm text-ink/70">Made for you. Made to last.</p>
        </div>
        <div className="flex items-center border-y border-dashed border-ink/25 px-6 py-4 sm:px-10 lg:border-x lg:border-y-0 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-[#d93432] px-3 py-1 font-display text-3xl leading-none font-black text-white uppercase sm:text-4xl">
              10% off
            </span>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/70 sm:text-sm">
              10 × 10 print area<br />discount applied
            </p>
          </div>
        </div>
        <div className="relative flex min-h-[170px] items-center justify-between gap-2 overflow-hidden bg-gold px-6 py-5 sm:px-10 lg:min-h-0 lg:bg-transparent lg:px-8">
          <div className="relative z-10 max-w-[260px]">
            <p className="font-display text-2xl leading-none font-black uppercase sm:text-3xl">
              Front ₹270<br />Front + back ₹450
            </p>
            <p className="mt-2 text-[11px] font-medium">
              After 10% off · garment price separate
            </p>
            <span className="mt-3 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-xs font-bold tracking-[.12em] uppercase transition-all group-hover:gap-4">
              Start designing <span aria-hidden="true">→</span>
            </span>
          </div>
          <Image
            src="/categories/starkvibe-premium-t-shirt-combo.png"
            alt="StarkVibe premium cotton T-shirt colour options"
            width={360}
            height={280}
            sizes="(min-width: 1024px) 25vw, 40vw"
            className="absolute right-0 bottom-0 h-full w-[48%] object-contain object-bottom sm:w-[42%] lg:right-2 lg:w-[52%]"
          />
        </div>
      </Link>
      <div className="mt-2 flex justify-center gap-2.5" role="group" aria-label="Choose custom printing occasion">
        {occasions.map((occasion, index) => (
          <button
            key={occasion}
            type="button"
            aria-label={`Show ${occasion}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`size-2 rounded-full transition-all ${active === index ? "scale-110 bg-olive" : "bg-ink/20 hover:bg-ink/45"}`}
          />
        ))}
      </div>
    </section>
  );
}
