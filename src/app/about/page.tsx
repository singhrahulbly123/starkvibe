import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata = buildMetadata({
  title: "About StarkVibe | Premium Cotton Wear",
  description:
    "Learn how StarkVibe makes premium cotton T-shirts, polos, kidswear, fleece and custom printed apparel for everyday wear, teams and special occasions too.",
  path: "/about",
});

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About StarkVibe",
    url: "https://starkvibe.com/about",
    about: {
      "@type": "Organization",
      name: "StarkVibe",
      url: "https://starkvibe.com",
      logo: "https://starkvibe.com/branding/starkvibe-wordmark-premium.png",
      email: "singhrahulbly123@gmail.com",
    },
  };

  return (
    <>
      <Storefront hideRange>{null}</Storefront>
      <main className="bg-paper text-ink">
        <JsonLd data={jsonLd} />
        <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-32">
          <nav aria-label="Breadcrumb" className="mb-14 text-sm text-[#5d5b55]">
            <Link href="/" className="hover:text-olive">Home</Link><span className="mx-3">/</span><span>About StarkVibe</span>
          </nav>
          <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold tracking-[.22em] text-olive uppercase">About the brand</p>
              <h1 className="max-w-[820px] font-display text-[clamp(58px,10vw,150px)] leading-[.82] font-black uppercase">Heavy cotton.<br /><span className="text-olive">Honest finish.</span></h1>
            </div>
            <p className="max-w-[520px] text-lg leading-8 text-[#494842]">StarkVibe makes dependable cotton wear for everyday life, teams and the moments people want to remember. We keep the choices clear: honest fabric weights, wearable fits and custom printing that feels made for you.</p>
          </div>
          <div className="mt-20 grid gap-px border border-ink bg-ink md:grid-cols-3">
            {[['180–350 GSM', 'Fabric weights for light everyday tees through warm fleece layers.'], ['100% cotton', 'Soft, breathable materials selected for comfort and repeat wear.'], ['Built to last', 'Bio-washed, silicon-washed and double-stitched finishes on selected pieces.']].map(([title, text]) => (
              <div key={title} className="bg-paper p-7 lg:p-10"><h2 className="font-display text-4xl font-black uppercase">{title}</h2><p className="mt-4 leading-7 text-[#55544f]">{text}</p></div>
            ))}
          </div>
          <div className="mt-20 grid gap-10 border-t border-ink pt-12 lg:grid-cols-2">
            <div><p className="mb-4 text-xs font-bold tracking-[.2em] text-olive uppercase">Made for real use</p><h2 className="font-display text-5xl leading-none font-black uppercase">From one favourite tee to a full team order.</h2></div>
            <div className="space-y-5 leading-7 text-[#55544f]"><p>Choose from T-shirts, polos, kidswear, sweatshirts and hoodies, then select the fabric weight, colour and fit that suit your day.</p><p>Need something personal? Our custom printing service helps with birthdays, gifting, office teams, anniversaries, campaigns and one-off designs.</p><div className="flex flex-wrap gap-3 pt-3"><Link href="/shop" className="bg-ink px-6 py-3 font-bold text-paper hover:bg-olive">Shop the range</Link><Link href="/custom-printing" className="border border-ink px-6 py-3 font-bold hover:bg-gold">Explore custom printing</Link></div></div>
          </div>
          <section className="mt-20 border-t border-ink pt-12" aria-labelledby="company-details-heading">
            <p className="mb-4 text-xs font-bold tracking-[.2em] text-olive uppercase">Company details</p>
            <h2 id="company-details-heading" className="font-display text-5xl leading-none font-black uppercase">The details behind the brand.</h2>
            <div className="mt-8 grid gap-4 text-[16px] leading-7 text-[#55544f] sm:grid-cols-2">
              <p><strong>Legal name:</strong> TODO: Add the confirmed legal name.</p>
              <p><strong>Registered address:</strong> TODO: Add the confirmed registered address.</p>
              <p><strong>GST:</strong> TODO: Add the confirmed GST details, if applicable.</p>
              <p><strong>Started:</strong> TODO: Add the confirmed year started.</p>
              <p><strong>Run by:</strong> TODO: Add the confirmed information about who runs StarkVibe.</p>
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
