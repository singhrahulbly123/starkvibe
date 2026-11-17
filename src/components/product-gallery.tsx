"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { galleryImage, galleryImages } from "@/lib/product-details";
import type { Product, Colour } from "@/lib/catalogue";

export function ProductGallery({
  product,
  colour,
  view,
  onViewChange,
}: {
  product: Product;
  colour: Colour;
  view: string;
  onViewChange: (view: string) => void;
}) {
  const mainImage = galleryImage(product, colour, view);
  const images = galleryImages(product, colour);
  const [zoomPoint, setZoomPoint] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="min-w-0">
      <div className="relative grid gap-1.5 sm:block">
        <div
          role="group"
          aria-label={`Photos of ${colour.name}`}
          className="order-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:absolute sm:inset-y-0 sm:left-0 sm:order-1 sm:w-[140px] sm:min-h-0 sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden sm:pb-0"
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show ${colour.name} photo ${index + 1}`}
              aria-pressed={(view === "Front" && index === 0) || view === `Gallery ${index + 1}`}
              onClick={() => onViewChange(index === 0 ? "Front" : `Gallery ${index + 1}`)}
              className={`relative h-[160px] min-w-[128px] shrink-0 overflow-hidden rounded-[4px] border bg-[#f4f3ef] transition-all sm:h-[180px] sm:min-w-0 ${((view === "Front" && index === 0) || view === `Gallery ${index + 1}`) ? "border-ink ring-1 ring-ink" : "border-black/20 hover:border-ink/60"}`}
            >
              <Image
                src={image}
                alt={`StarkVibe ${product.name} in ${colour.name}, photo ${index + 1}`}
                fill
                sizes="(min-width: 640px) 140px, 128px"
                className="object-contain"
              />
              <span className="absolute inset-x-0 bottom-0 bg-ink/75 px-1 py-1 text-[10px] font-bold text-paper">{index + 1}</span>
            </button>
          ))}
        </div>

        <div
          className="relative order-1 aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-[4px] border border-black/15 bg-[#f4f3ef] sm:ml-[146px] sm:aspect-[3/4] sm:w-[calc(100%_-_146px)]"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            setZoomPoint({
              x: Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)),
              y: Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)),
            });
          }}
          onMouseLeave={() => setZoomPoint(null)}
        >
          <Image
            key={`${colour.file}-${view}`}
            src={mainImage}
            alt={`StarkVibe ${product.name} 100% cotton in ${colour.name}, ${view.toLowerCase()} view`}
            fill
            priority={view === "Front"}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-0"
            style={zoomPoint ? { transform: "scale(2.25)", transformOrigin: `${zoomPoint.x}% ${zoomPoint.y}%` } : undefined}
          />
          <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-paper/95 text-ink shadow-sm">
            <Maximize2 size={15} strokeWidth={2.25} aria-hidden="true" />
            <span className="sr-only">Expand image</span>
          </span>
        </div>
      </div>
    </div>
  );
}
