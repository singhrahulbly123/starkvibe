"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Variant = "control" | "variant";
const cookieName = "starkvibe-ab-home-hero";

function getCookieVariant(): Variant | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie.split("; ").find((item) => item.startsWith(`${cookieName}=`))?.split("=")[1];
  return value === "control" || value === "variant" ? value : null;
}

export function AbHeroCopy() {
  const [variant, setVariant] = useState<Variant>("control");

  useEffect(() => {
    const assigned = getCookieVariant() || (Math.random() < 0.5 ? "control" : "variant");
    document.cookie = `${cookieName}=${assigned}; max-age=2592000; path=/; SameSite=Lax`;
    setVariant(assigned);
    trackEvent("ab_test_exposure", {
      experiment_id: "home_hero_copy_v1",
      variant: assigned,
    });
  }, []);

  const isVariant = variant === "variant";
  const trackCta = (cta: string) => {
    trackEvent("ab_test_cta_click", {
      experiment_id: "home_hero_copy_v1",
      variant,
      cta,
    });
  };

  return (
    <div>
      <h1 className="font-display text-[clamp(36px,4.2vw,60px)] leading-[.95] font-black uppercase">
        {isVariant ? (
          <>Premium cotton.<br /><span className="text-gold">Made</span> to be worn.</>
        ) : (
          <>Heavy.<br />cotton.<br /><span className="text-gold">Honest</span> finish.</>
        )}
      </h1>
      <p className="mb-9 max-w-[480px] text-lg leading-[1.6] text-[#c9c7be]">
        {isVariant
          ? "Premium cotton tees, polos, sweatshirts and hoodies with a comfortable fit, honest construction and room for your own branding."
          : "Tees, polos, sweatshirts and hoodies in 100% cotton. Double bio-washed, silicon washed and double stitched, ready for everyday wear or your own branding."}
      </p>
      <div className="flex flex-wrap gap-3.5">
        <a
          href="/shop"
          onClick={() => trackCta("shop_the_range")}
          className="flex h-[58px] items-center bg-gold px-[34px] font-bold text-ink transition-colors hover:bg-paper"
        >
          {isVariant ? "Find your fit" : "Shop the range"}
        </a>
        <a
          href="#custom"
          onClick={() => trackCta("custom_printing")}
          className="flex h-[58px] items-center border border-paper px-[34px] font-semibold transition-colors hover:bg-paper hover:text-ink"
        >
          Custom printing
        </a>
      </div>
    </div>
  );
}
