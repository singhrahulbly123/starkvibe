import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { getLocation, locations } from "@/lib/locations";
import { locationMetaDescription, locationMetaTitle } from "@/lib/seo";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocation((await params).city);
  if (!location) return { title: "Location not found — StarkVibe" };
  return {
    title: locationMetaTitle(location.city),
    description: locationMetaDescription(location.city),
    keywords: [
      `${location.city} custom t-shirts`,
      `${location.city} cotton clothing`,
      `${location.city} bulk teamwear`,
      `online custom printing ${location.city}`,
    ],
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title: locationMetaTitle(location.city),
      description: locationMetaDescription(location.city),
      url: `https://starkvibe.com/locations/${location.slug}`,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const location = getLocation((await params).city);
  if (!location) notFound();
  const pageUrl = `https://starkvibe.com/locations/${location.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Online cotton wear and custom printing in ${location.city}`,
        serviceType: "Online clothing and custom printing",
        description: location.intro,
        url: pageUrl,
        provider: {
          "@type": "Organization",
          name: "StarkVibe",
          url: "https://starkvibe.com",
          email: "singhrahulbly123@gmail.com",
          telephone: "+91-7060421033",
        },
        areaServed: {
          "@type": "City",
          name: location.city,
          containedInPlace: { "@type": "AdministrativeArea", name: location.state },
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
          availableLanguage: ["English", "Hindi"],
        },
      },
      {
        "@type": "OnlineStore",
        name: `StarkVibe online service — ${location.city}`,
        url: pageUrl,
        areaServed: { "@type": "City", name: location.city },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://starkvibe.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://starkvibe.com/locations" },
          { "@type": "ListItem", position: 3, name: location.city, item: pageUrl },
        ],
      },
    ],
  };
  return (
    <>
      <Storefront hideRange>
        <main className="bg-paper text-ink">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
          <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-24 lg:px-12 lg:pt-24">
            <p className="text-xs font-bold tracking-[.22em] text-olive uppercase">Online service · {location.state}</p>
            <h1 className="mt-5 max-w-[1100px] font-display text-[clamp(58px,9vw,132px)] leading-[.84] font-black uppercase">
              StarkVibe
              <br />
              {location.city}.
            </h1>
            <p className="mt-8 max-w-[760px] text-xl leading-8 text-[#494842]">{location.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex h-14 items-center gap-3 bg-ink px-7 text-sm font-bold text-paper transition-colors hover:bg-olive">
                Shop cotton wear <ArrowUpRight size={18} />
              </Link>
              <Link href="/custom-printing" className="inline-flex h-14 items-center gap-3 border border-ink px-7 text-sm font-bold transition-colors hover:bg-gold">
                Plan custom printing <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <section className="border border-ink bg-ink p-7 text-paper lg:p-10">
                <p className="text-xs font-bold tracking-[.2em] text-gold uppercase">Local fit</p>
                <h2 className="mt-6 max-w-[650px] font-display text-5xl leading-[.9] font-black uppercase">Made to make sense in {location.city}.</h2>
                <p className="mt-7 max-w-[650px] text-lg leading-8 text-[#d5d1c6]">{location.usp}</p>
              </section>
              <section className="border border-ink/20 bg-[#eeece5] p-7 lg:p-10">
                <p className="text-xs font-bold tracking-[.2em] text-olive uppercase">Useful for</p>
                <h2 className="mt-6 font-display text-4xl leading-[.9] font-black uppercase">{location.occasions}.</h2>
                <ul className="mt-8 space-y-4 border-t border-ink/20 pt-6 text-sm leading-6 text-[#55544f]">
                  <li>• 100% cotton tees, polos and fleece layers</li>
                  <li>• Custom printing planned online</li>
                  <li>• Online ordering available 24/7</li>
                </ul>
              </section>
            </div>
            <section className="mt-16 max-w-[850px]">
              <p className="text-xs font-bold tracking-[.2em] text-olive uppercase">How it works</p>
              <h2 className="mt-5 font-display text-5xl leading-[.88] font-black uppercase">Pick the piece. Share the brief. We confirm the details.</h2>
              <p className="mt-7 text-lg leading-8 text-[#55544f]">Browse the range, choose the fabric weight and colour, then send your quantity, sizes and artwork through the online enquiry flow. StarkVibe will confirm availability, printing details and delivery expectations before the order is accepted.</p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold">
                <Link href="/contact" className="underline decoration-1 underline-offset-4 hover:text-olive">Contact the online team →</Link>
                <Link href="/design-your-own" className="underline decoration-1 underline-offset-4 hover:text-olive">Create your own design →</Link>
              </div>
            </section>
          </section>
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
