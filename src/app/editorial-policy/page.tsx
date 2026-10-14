import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Editorial Policy | StarkVibe Journal",
  description: "How StarkVibe creates, reviews and updates educational content about cotton wear and custom printing.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <>
      <Storefront hideRange>{null}</Storefront>
      <main className="bg-paper text-ink">
        <section className="mx-auto max-w-[1000px] px-5 pt-16 pb-24 lg:px-12 lg:pt-24">
          <nav aria-label="Breadcrumb" className="mb-14 text-sm text-[#5d5b55]"><Link href="/">Home</Link><span className="mx-3">/</span><span>Editorial policy</span></nav>
          <p className="mb-5 text-xs font-bold tracking-[.2em] text-olive uppercase">Trust and transparency</p>
          <h1 className="font-display text-[clamp(56px,9vw,120px)] leading-[.84] font-black uppercase">Useful words.<br /><span className="text-olive">Honest claims.</span></h1>
          <p className="mt-8 max-w-[700px] text-xl leading-8 text-[#494842]">StarkVibe publishes practical information to help customers choose fabric weights, plan custom printing and care for their garments.</p>
          <div className="mt-16 space-y-12 border-t border-ink pt-12 text-[#55544f]">
            <section><h2 className="font-display text-4xl font-black uppercase text-ink">Our content standard</h2><p className="mt-4 leading-8">We write for people making real apparel decisions. Product and service information is based on the StarkVibe range, the details shown on product pages and the requirements shared through customer enquiries. We avoid unsupported claims, copied text and artificial reviews.</p></section>
            <section><h2 className="font-display text-4xl font-black uppercase text-ink">Updates and corrections</h2><p className="mt-4 leading-8">Product availability, colours, pricing, delivery estimates and printing recommendations can change. We review important content when the range or service changes. If you find an outdated detail, contact us at <a className="font-semibold text-ink underline" href="mailto:singhrahulbly123@gmail.com">singhrahulbly123@gmail.com</a>.</p></section>
            <section><h2 className="font-display text-4xl font-black uppercase text-ink">About the publisher</h2><p className="mt-4 leading-8">StarkVibe is the publisher and source of the product and custom printing information on this website. For questions about a product, size, bulk order or custom artwork, use the <Link className="font-semibold text-ink underline" href="/contact">Contact page</Link> so the team can help with the specific requirement.</p></section>
            <div className="flex flex-wrap gap-3 pt-2"><Link href="/blog" className="bg-ink px-6 py-3 font-bold text-paper hover:bg-olive">Read the journal</Link><Link href="/about" className="border border-ink px-6 py-3 font-bold hover:bg-gold">About StarkVibe</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
