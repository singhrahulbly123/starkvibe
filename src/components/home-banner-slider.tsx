"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/herobanner/Premium%20Green%20Polo%20Sale%20Ad.png",
    alt: "Premium green polo collection",
    href: "/shop/polos",
    background: "#f1d5d0",
  },
  {
    image: "/herobanner/Streetwear%20Chaos%20Tee%20Campaign.png",
    alt: "StarkVibe streetwear T-shirt collection",
    href: "/shop/t-shirts",
    background: "#dcd6ed",
  },
  {
    image: "/herobanner/Oversized%20Good%20Vibes%20T-Shirt%20Ad.png",
    alt: "Oversized good vibes T-shirt collection",
    href: "/shop/t-shirts",
    background: "#d2dfc8",
  },
  {
    image: "/herobanner/350%20GSM%20Fleece%20Sweatshirt%20Duo.png",
    alt: "350 GSM fleece sweatshirt collection",
    href: "/shop/sweatshirts",
    background: "#f0dfaa",
  },
  {
    image: "/herobanner/Playful%20Kids%E2%80%99%20Tee%20Collection%20Advertisement.png",
    alt: "Playful kids T-shirt collection",
    href: "/shop/kids",
    background: "#c9e1ea",
  },
  {
    image: "/herobanner/Premium%20350%20GSM%20Fleece%20Hoodie.png",
    alt: "Premium 350 GSM fleece hoodie collection",
    href: "/shop/hoodies",
    background: "#e4d7c8",
  },
];

export function HomeBannerSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  const goTo = useCallback((index: number) => {
    const normalized = (index + slides.length) % slides.length;
    indexRef.current = normalized;
    setActive(normalized);
    const track = trackRef.current;
    const slide = track?.children[slides.length + normalized] as HTMLElement | undefined;
    if (track && slide) {
      const trackRect = track.getBoundingClientRect();
      const slideCenter = slide.getBoundingClientRect().left - trackRect.left + track.scrollLeft + slide.offsetWidth / 2;
      track.scrollTo({
        left: slideCenter - track.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => goTo(0), [goTo]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        goTo(indexRef.current + 1);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [goTo, paused]);

  function syncFromScroll() {
    const track = trackRef.current;
    if (!track) return;
    let nearest = 0;
    let distance = Infinity;
    const trackLeft = track.getBoundingClientRect().left;
    Array.from(track.children).forEach((child, position) => {
      const element = child as HTMLElement;
      const elementCenter = element.getBoundingClientRect().left - trackLeft + element.offsetWidth / 2;
      const nextDistance = Math.abs(elementCenter - track.clientWidth / 2);
      if (nextDistance < distance) {
        distance = nextDistance;
        nearest = position % slides.length;
      }
    });
    indexRef.current = nearest;
    setActive(nearest);
  }

  return (
    <section
      aria-label="T-shirt colour variants"
      className="relative overflow-hidden py-3 sm:py-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div
        ref={trackRef}
        onScroll={syncFromScroll}
        className="flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-[5vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:px-[7vw] lg:gap-[1vw] lg:px-[32vw]"
      >
        {Array.from({ length: slides.length * 3 }, (_, position) => {
          const index = position % slides.length;
          const slide = slides[index];
          return (
            <Link
              key={`${slide.href}-${position}`}
              href={slide.href}
              aria-label={slide.alt}
              aria-current={active === index ? "true" : undefined}
              className="flex min-w-[90vw] snap-center flex-col sm:min-w-[78vw] lg:min-w-[36vw]"
            >
              <span style={{ backgroundColor: slide.background }} className="relative isolate block aspect-[.82] overflow-hidden sm:aspect-[.95] lg:aspect-[.96]">
                <span className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={position === slides.length}
                    sizes="(min-width: 1024px) 30vw, 75vw"
                    className="object-cover object-center"
                  />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
      <div className="mx-auto mt-2 flex max-w-[1400px] items-center justify-center px-5 sm:mt-3">
        <div className="flex items-center gap-2.5" role="group" aria-label="Choose T-shirt colour">
          {slides.map((slide, index) => (
            <button
              key={slide.href + index}
              aria-label={`Show T-shirt colour variant ${index + 1}`}
              aria-pressed={active === index}
              onClick={() => goTo(index)}
              className={`size-2 rounded-full transition-all ${active === index ? "scale-110 bg-olive" : "bg-ink/20 hover:bg-ink/45"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
