import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
  title: "Page Not Found — StarkVibe",
  description: "The StarkVibe page you requested could not be found. Explore the collection or start a custom printing enquiry, then return to the shop for cotton clothing.",
  path: "/404",
  }),
  robots: { index: true, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Storefront hideRange>
        <main className="bg-paper text-ink">
          <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-24 lg:px-12 lg:pt-24">
            <p className="text-xs font-bold tracking-[.22em] text-olive uppercase">Error 404 · StarkVibe</p>
            <h1 className="mt-6 max-w-[900px] font-display text-[clamp(72px,13vw,190px)] leading-[.78] font-black uppercase">
              This page
              <br />
              walked off.
            </h1>
            <p className="mt-10 max-w-[560px] text-lg leading-8 text-[#55544f]">
              The link may be old, the address may have changed, or this piece is
              not in the range right now. Start again from somewhere useful.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex h-14 items-center gap-3 bg-ink px-7 text-sm font-bold text-paper transition-colors hover:bg-olive"
              >
                Shop the range
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/custom-printing"
                className="inline-flex h-14 items-center gap-3 border border-ink px-7 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
              >
                Custom printing
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
