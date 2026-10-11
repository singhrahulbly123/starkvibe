import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "./reveal";
const container = "mx-auto max-w-[1400px] px-5 lg:px-12";
export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-paper lg:mt-36">
      <div className={`${container} pt-20 pb-10 lg:pt-24`}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[#2e2e2a] pb-[72px]">
            <h2 className="font-display text-[clamp(52px,8vw,128px)] leading-[.86] font-black uppercase">
              Let us build
              <br />
              <span className="text-gold">your line.</span>
            </h2>
            <a
              href="/#custom"
              className="flex h-[60px] items-center gap-4 bg-gold px-[38px] font-bold text-ink transition-colors hover:bg-paper"
            >
              Start an enquiry
              <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 max-w-[400px] lg:col-span-1">
            <a
              href="/#top"
              className="inline-flex"
            >
              <Image
                src="/branding/starkvibe-wordmark-premium.png"
                alt="StarkVibe"
                width={280}
                height={88}
                className="h-auto w-[190px] brightness-0 invert"
              />
            </a>
            <p className="mt-5 leading-[1.6] text-[#b9b7ae]">
              Premium 100% cotton wear, from 180 to 350 GSM. Built heavy,
              finished honest.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[.18em] text-gold uppercase">
              Shop
            </h3>
            <div className="flex flex-col text-[15px]">
              {[
                "T-shirts",
                "Polo",
                "Kids",
                "Sweatshirt and hoodie",
                "Colour library",
              ].map((label) => (
                <a
                  key={label}
                  href={
                    label === "Colour library"
                      ? "/shop/colours"
                      : `/shop?category=${label === "T-shirts" ? "tees" : label === "Polo" ? "polo" : label === "Kids" ? "kids" : "fleece"}`
                  }
                  className="py-2 transition-colors hover:text-gold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[.18em] text-gold uppercase">
              Help
            </h3>
            <div className="flex flex-col text-[15px]">
              {[
                "Custom printing",
                "Shipping",
                "Returns",
                "Size guide",
                "Contact",
              ].map((label) => (
                <a
                  key={label}
                  href={
                    label === "Custom printing" || label === "Contact"
                      ? "/custom-printing"
                      : label === "Shipping"
                        ? "/shipping-policy"
                        : label === "Returns"
                          ? "/returns-policy"
                          : "/#faq"
                  }
                  className="py-2 transition-colors hover:text-gold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[.18em] text-gold uppercase">
              Reach us
            </h3>
            <a
              href="/#custom"
              className="text-[15px] leading-[1.8] text-[#c9c7be]"
            >
              Custom printing & bulk orders
              <br />
              Request a quote →
            </a>
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
              <a
                className="mt-3 block text-sm"
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
              >
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-[#2e2e2a] pt-6 text-[13px] text-[#8f8d84]">
          <p>© 2026 StarkVibe. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/privacy-policy" className="transition-colors hover:text-gold">Privacy policy</a>
            <a href="/terms-and-conditions" className="transition-colors hover:text-gold">Terms &amp; conditions</a>
            <span>Built heavy. Finished honest.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
