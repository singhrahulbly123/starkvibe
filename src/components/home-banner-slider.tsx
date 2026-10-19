"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  { image: "/heroslider/Starkvibe%20Winter%20Fleece%20Sale.png", alt: "StarkVibe winter fleece sale", href: "/shop/hoodies" },
  { image: "/heroslider/Oversized%20Hoodie%20Colour%20Collection.png", alt: "StarkVibe oversized hoodie colour collection", href: "/shop/hoodies" },
  { image: "/heroslider/Starkvibe%20Everyday%20Premium%20Comfort.png", alt: "StarkVibe everyday premium cotton comfort", href: "/shop/t-shirts" },
  { image: "/heroslider/Custom%20Printing%20for%20Every%20Occasion.png", alt: "Custom printing for birthdays, anniversaries, teams and gifting", href: "/custom-printing" },
  { image: "/heroslider/Starkvibe%20Premium%20Fleece%20Sweatshirts.png", alt: "StarkVibe premium fleece sweatshirt collection", href: "/shop/sweatshirts" },
];

export function HomeBannerSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const goTo = useCallback((index: number) => setActive((index + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive((current) => (current + 1) % slides.length);
      }
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      aria-label="StarkVibe featured campaigns"
      className="relative mt-[30px] w-full overflow-hidden bg-[#e8e2d7] lg:mt-[36px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
    >
      <div className="relative mx-auto w-full max-w-none overflow-hidden">
        <div className="flex transition-transform duration-700 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((slide, index) => (
            <Link key={slide.image} href={slide.href} aria-label={slide.alt} className="relative block min-w-full bg-[#e8e2d7]">
              <Image src={slide.image} alt={slide.alt} width={2056} height={765} priority={index === 0} sizes="100vw" className="block h-auto w-full" />
            </Link>
          ))}
        </div>
        <button type="button" aria-label="Previous banner" onClick={() => goTo(active - 1)} className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/80 text-paper shadow-lg backdrop-blur-sm transition-colors hover:bg-olive sm:left-5 sm:size-12"><ChevronLeft size={22} strokeWidth={2.2} aria-hidden="true" /></button>
        <button type="button" aria-label="Next banner" onClick={() => goTo(active + 1)} className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/80 text-paper shadow-lg backdrop-blur-sm transition-colors hover:bg-olive sm:right-5 sm:size-12"><ChevronRight size={22} strokeWidth={2.2} aria-hidden="true" /></button>
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 sm:bottom-5" role="group" aria-label="Choose featured banner">
          {slides.map((slide, index) => (
            <button key={slide.image} type="button" aria-label={`Show banner ${index + 1}`} aria-pressed={active === index} onClick={() => goTo(index)} className={`h-2 rounded-full transition-all ${active === index ? "w-7 bg-olive" : "w-2 bg-ink/35 hover:bg-ink/65"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
