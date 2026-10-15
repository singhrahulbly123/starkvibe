"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const images = [
  {
    src: "/slider/Custom%20Birthday%20Prints%20Celebration.png",
    alt: "Custom birthday prints celebration",
    color: "#f1d5d0",
  },
  {
    src: "/slider/Anniversary%20Vibes,%20Custom%20Together.png",
    alt: "Custom anniversary printing",
    color: "#dcd6ed",
  },
  {
    src: "/slider/Custom%20Printing%20for%20College%20Moments.png",
    alt: "Custom printing for college moments",
    color: "#d2dfc8",
  },
  {
    src: "/slider/Personalised%20Gifts%20Made%20for%20Moments.png",
    alt: "Personalised gifts made for moments",
    color: "#f0dfaa",
  },
  {
    src: "/slider/Starkvibe%20Wear%20Your%20Vibe%20Campaign.png",
    alt: "Starkvibe wear your vibe campaign",
    color: "#e4d7c8",
  },
];

export function CustomBrandingImageSlider() {
  const [active, setActive] = useState(0);
  const move = useCallback((step: number) => {
    setActive((current) => (current + step + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => move(1), 5500);
    return () => window.clearInterval(timer);
  }, [move]);

  return (
    <section className="relative w-full py-4" aria-label="Custom branding image slider">
      <div className="relative aspect-[2.69] w-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "z-10 opacity-100" : "z-0 opacity-0"}`}
            aria-hidden={index !== active}
          >
            <div className="absolute inset-0" style={{ backgroundColor: image.color }} />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-contain object-center"
            />
          </div>
        ))}
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => move(-1)}
          className="absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink shadow-sm transition hover:bg-paper sm:left-5"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => move(1)}
          className="absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink shadow-sm transition hover:bg-paper sm:right-5"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-2" role="group" aria-label="Choose image">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show image ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`size-2 rounded-full transition-colors ${active === index ? "bg-olive" : "bg-ink/20 hover:bg-ink/45"}`}
          />
        ))}
      </div>
    </section>
  );
}
