import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { locations } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Online Custom Clothing Across India — StarkVibe Locations",
  description: "Explore StarkVibe online cotton clothing and custom printing pages for Delhi NCR, Bengaluru, Chennai, state capitals and cities across India. Browse locations.",
  path: "/locations",
});

export default function LocationsPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Storefront hideRange>
        <main className="bg-paper text-ink">
          <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-24 lg:px-12 lg:pt-24">
            <p className="text-xs font-bold tracking-[.22em] text-olive uppercase">Online service across India</p>
            <h1 className="mt-5 max-w-[1050px] font-display text-[clamp(58px,9vw,132px)] leading-[.84] font-black uppercase">
              Cotton wear,
              <br />
              wherever you are.
            </h1>
            <p className="mt-8 max-w-[700px] text-lg leading-8 text-[#55544f]">
              StarkVibe is an online-first cotton wear and custom printing brand.
              Choose your city to see locally relevant guidance for product weight,
              climate, group orders and custom apparel planning.
            </p>
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="group border border-ink/20 bg-[#eeece5] p-5 transition-colors hover:bg-gold"
                >
                  <p className="text-xs font-bold tracking-[.16em] text-olive uppercase">{location.state}</p>
                  <h2 className="mt-4 font-display text-3xl leading-none font-black uppercase">{location.city}</h2>
                  <span className="mt-8 inline-block text-sm font-bold underline decoration-1 underline-offset-4 group-hover:text-ink">
                    Explore {location.city} service →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
