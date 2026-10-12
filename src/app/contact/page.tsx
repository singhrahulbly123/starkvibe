import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/quote-form";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";

export const metadata: Metadata = {
  title: "Contact StarkVibe | Custom Printing & Bulk Orders",
  description:
    "Contact StarkVibe for custom printed T-shirts, polos, hoodies, teamwear, birthday orders and bulk apparel quotes.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact StarkVibe | Custom Printing & Bulk Orders",
    description: "Request a custom printing or bulk apparel quote from StarkVibe.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const faqs = [
    ["Do you handle orders across India?", "Yes. Share your city, required date and order details in the enquiry form so delivery timing can be confirmed for your location."],
    ["Can I place a single custom order?", "Yes. Single personalised gifts and larger birthday, office, team and event orders can be discussed through the same enquiry flow."],
    ["How do I send artwork?", "Upload your logo, photo or reference design through the custom printing enquiry, or describe the idea and we will help plan the next step."],
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact StarkVibe",
    url: "https://starkvibe.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "StarkVibe",
      url: "https://starkvibe.com",
      email: "singhrahulbly123@gmail.com",
      areaServed: { "@type": "Country", name: "India" },
      serviceType: ["Custom apparel printing", "Bulk T-shirt printing", "Personalised clothing"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+91-7060421033",
        email: "singhrahulbly123@gmail.com",
        availableLanguage: ["English", "Hindi"],
      },
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <Storefront hideRange>{null}</Storefront>
      <main className="bg-paper text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-32">
          <nav aria-label="Breadcrumb" className="mb-14 text-sm text-[#5d5b55]"><Link href="/" className="hover:text-olive">Home</Link><span className="mx-3">/</span><span>Contact</span></nav>
          <div className="mb-14 max-w-[850px]"><p className="mb-5 text-xs font-bold tracking-[.22em] text-olive uppercase">We are here to help</p><h1 className="font-display text-[clamp(58px,9vw,132px)] leading-[.84] font-black uppercase">Let&apos;s make it<br /><span className="text-olive">wearable.</span></h1><p className="mt-7 max-w-[650px] text-lg leading-8 text-[#494842]">Tell us what you need, from one custom T-shirt to a complete office, birthday or campaign order. Share the details and we&apos;ll help you choose the right product, size and print approach.</p></div>
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
            <aside className="border border-ink bg-[#e9e7df] p-7 lg:p-10"><h2 className="font-display text-4xl font-black uppercase">Talk to StarkVibe</h2><div className="mt-8 space-y-6 text-[#4e4d47]"><div><p className="text-xs font-bold tracking-[.16em] text-olive uppercase">Email</p><a href="mailto:singhrahulbly123@gmail.com" className="mt-1 block font-semibold hover:text-olive">singhrahulbly123@gmail.com</a></div><div><p className="text-xs font-bold tracking-[.16em] text-olive uppercase">WhatsApp</p><a href="https://wa.me/917060421033" className="mt-1 block font-semibold hover:text-olive">+91 70604 21033</a></div><div><p className="text-xs font-bold tracking-[.16em] text-olive uppercase">Service area</p><p className="mt-1">Custom apparel enquiries and delivery support across India.</p></div><div><p className="text-xs font-bold tracking-[.16em] text-olive uppercase">Best for</p><p className="mt-1">Custom printing, bulk orders, product questions and sizing help.</p></div></div><Link href="/design-your-own" className="mt-10 inline-block border-b border-ink pb-1 font-bold hover:text-olive">Create your own design →</Link></aside>
            <QuoteForm />
          </div>
          <section className="mt-20 border-t border-ink pt-12" aria-labelledby="local-faq-heading">
            <p className="mb-4 text-xs font-bold tracking-[.2em] text-olive uppercase">India-wide support</p>
            <h2 id="local-faq-heading" className="font-display text-5xl leading-none font-black uppercase">Questions before you order?</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {faqs.map(([question, answer]) => <details key={question} className="border border-ink p-5"><summary className="cursor-pointer font-bold">{question}</summary><p className="mt-3 leading-7 text-[#55544f]">{answer}</p></details>)}
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
