import { SiteFooter } from "@/components/site-footer";
import Image from "next/image";
import Link from "next/link";
import { Storefront } from "@/components/storefront";
import { Reveal } from "@/components/reveal";
import { QuoteForm } from "@/components/quote-form";
import { swatches } from "@/lib/catalogue";
import { AbHeroCopy } from "@/components/ab-hero-copy";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Premium Cotton T-Shirts & Custom Printing India | StarkVibe",
  description:
    "100% cotton tees, polos, sweatshirts and hoodies from 180 to 350 GSM. Custom printing for birthdays, offices and teams. Prices from ₹745.",
  path: "/",
});

const container = "mx-auto max-w-[1400px] px-5 lg:px-12";
const heading =
  "font-display text-[clamp(48px,7vw,112px)] leading-[.88] font-black uppercase";
const eyebrow =
  "mb-[18px] text-[13px] font-semibold tracking-[.18em] uppercase";
const specs = [
  ["100% Cotton", "Breathable, honest fibre in every piece."],
  ["Double bio-washed", "Smoother surface, longer-lasting colour."],
  ["Silicon washed", "A soft, smooth finish from day one."],
  ["Double stitched", "Strong seams and a clean, structured fit."],
];
const weights = [
  {
    gsm: 180,
    label: "Light and easy",
    image: "/categories/starkvibe-premium-t-shirt-combo.png",
    name: (
      <>
        Regular Fit Tee
        <br />
        Kids Tee
      </>
    ),
    price: "From ₹800",
    className: "bg-[#e2dfd6] lg:h-[440px]",
    number: "lg:text-[150px]",
  },
  {
    gsm: 220,
    label: "Everyday standard",
    image: "/categories/starkvibe-premium-polo-combo-pack.png",
    name: (
      <>
        Oversized Tee
        <br />
        Polo, Matty fabric
      </>
    ),
    price: "From ₹860",
    className: "bg-[#cbc6b8] lg:h-[530px]",
    number: "lg:text-[170px]",
  },
  {
    gsm: 240,
    label: "Structured and soft",
    image: "/categories/starkvibe-premium-t-shirt-combo.png",
    name: <>Oversized French Terry Tee</>,
    price: "₹1149",
    className: "bg-[#3b3a36] text-paper lg:h-[620px]",
    number: "lg:text-[170px]",
  },
  {
    gsm: 350,
    label: "Cotton fleece",
    image: "/categories/starkvibe-sweatshirts-combo-pack.png",
    name: (
      <>
        Fleece Sweatshirt
        <br />
        Fleece Hoodie
      </>
    ),
    price: "From ₹1470",
    className: "bg-ink text-paper lg:h-[720px]",
    number: "text-gold lg:text-[170px]",
  },
];
const categories = [
  {
    label: "T-shirts",
    eyebrow: "Everyday essentials",
    image: "/categories/starkvibe-premium-t-shirt-combo.png",
    description: "Clean fits, premium cotton and easy everyday comfort.",
    href: "/shop/t-shirts",
    cardClass: "col-span-2 min-h-[320px] sm:col-span-2 lg:col-span-1 lg:min-h-[295px]",
  },
  {
    label: "Polos",
    eyebrow: "Polished comfort",
    image: "/categories/starkvibe-premium-polo-combo-pack.png",
    description: "Breathable Matty fabric with a sharper everyday finish.",
    href: "/shop/polos",
    cardClass: "min-h-[280px] sm:min-h-[320px] lg:col-span-1 lg:min-h-[295px]",
  },
  {
    label: "Kids",
    eyebrow: "Made to move",
    image: "/categories/starkvibe-kids-combo-pack.png",
    description: "Soft, flexible pieces for active days and special moments.",
    href: "/shop/kids",
    cardClass: "min-h-[280px] sm:min-h-[320px] lg:col-span-1 lg:min-h-[295px]",
  },
  {
    label: "Sweatshirts",
    eyebrow: "Warm layers",
    image: "/categories/starkvibe-sweatshirts-combo-pack.png",
    description: "350 GSM fleece with warmth, softness and structure.",
    href: "/shop/sweatshirts",
    cardClass: "min-h-[280px] sm:min-h-[320px] lg:col-span-1 lg:min-h-[295px]",
  },
  {
    label: "Hoodies",
    eyebrow: "Heavy cotton fleece",
    image: "/categories/starkvibe-premium-hoodie-combo.png",
    description: "Substantial layers built for streetwear and custom prints.",
    href: "/shop/hoodies",
    cardClass: "col-span-2 min-h-[300px] sm:col-span-3 lg:col-span-1 lg:min-h-[295px]",
  },
];
const steps = [
  [
    "Premium 100% cotton",
    "From light 180 GSM jersey to dense 350 GSM fleece, the fabric breathes, wears in and holds up.",
  ],
  [
    "Double bio-wash",
    "Enzyme washing clears loose surface fibres for a smoother fabric and colour that stays richer for longer.",
  ],
  [
    "Silicon wash",
    "A soft finishing wash that gives the smooth, settled hand-feel you notice the moment you pick it up.",
  ],
  [
    "Double stitched seams",
    "Extra strength where garments wear first, with a clean, structured fit that suits daily wear and branding.",
  ],
];
const faqs = [
  [
    "What does GSM mean?",
    "GSM is grams per square metre, the weight of the fabric. A higher GSM means a heavier, denser and more structured garment. Our range runs from 180 GSM tees to 350 GSM fleece.",
  ],
  [
    "What are bio-wash and silicon wash?",
    "Bio-washing clears loose surface fibres for a smoother fabric and helps colour last. Silicon washing adds a soft finish. Every piece here is double bio-washed and silicon washed.",
  ],
  [
    "Can I get my own branding or print on these?",
    "Yes. These pieces are chosen for custom printing. Send your design, quantities and preferred garments using the enquiry form. Minimum quantities and turnaround will be confirmed in your quote.",
  ],
  [
    "How do I pick a size?",
    "Choose your usual size as a starting point. Oversized tees have a relaxed silhouette. Ask for garment measurements before placing an order so we can help you find the right fit.",
  ],
  [
    "Delivery and returns",
    "TODO: Add confirmed delivery days, shipping charge, free-shipping threshold, returns window and return conditions.",
  ],
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StarkVibe",
  url: "https://starkvibe.com",
  logo: "https://starkvibe.com/branding/starkvibe-wordmark-premium.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7060421033",
    contactType: "customer service",
    areaServed: "IN",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StarkVibe",
  url: "https://starkvibe.com",
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd
        data={faqPageJsonLd(
          faqs.map(([question, answer]) => ({ question, answer })),
        )}
      />
      <a
        href="#range"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-gold focus:p-4"
      >
        Skip to products
      </a>
      <div className="flex flex-wrap justify-between gap-2 bg-ink px-5 py-[11px] text-[13px] text-paper lg:px-12">
        <span>
          Custom printing and bulk enquiries —{" "}
          <a href="#custom" className="font-semibold text-gold">
            Get in touch
          </a>
        </span>
        <span className="text-[#b9b7ae]">Sale prices from ₹745</span>
      </div>
      <main>
        <Storefront>
          <section id="top" className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col justify-between gap-10 bg-ink px-5 py-10 text-paper sm:px-10 lg:px-[5vw] lg:py-[4vw]">
              <p className={`${eyebrow} mb-0 text-gold`}>
                Premium cotton wear · 180 to 350 GSM
              </p>
              <AbHeroCopy />
            </div>
            <div className="relative min-h-[460px] overflow-hidden bg-[#e2dfd6] lg:min-h-[620px]">
              <span
                aria-hidden="true"
                className="absolute -top-8 left-[2%] font-display text-[clamp(240px,34vw,540px)] leading-[.82] font-black tracking-[-.02em] text-[#d2cec2]"
              >
                180
              </span>
              <div className="absolute top-[7%] -right-[2%] w-[58%] rotate-[7deg] overflow-hidden shadow-xl transition-transform duration-700 hover:rotate-0">
                <Image
                  src="/products/regular-fit-180-gsm/mint-t-shirt-editorial-advertisement.png"
                  width={600}
                  height={900}
                  alt="Mint regular fit 180 GSM cotton tee"
                  priority
                  sizes="(min-width: 1024px) 34vw, 58vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute top-[23%] left-[4%] w-[62%] -rotate-[8deg] overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-0">
                <Image
                  src="/products/regular-fit-180-gsm/starkvibe-mens-black-t-shirt-promo.png"
                  width={600}
                  height={900}
                  alt="Black regular fit 180 GSM cotton tee"
                  sizes="(min-width: 1024px) 36vw, 62vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute bottom-[3%] left-[28%] w-[48%] -rotate-2 overflow-hidden shadow-xl transition-transform duration-700 hover:rotate-0">
                <Image
                  src="/products/regular-fit-180-gsm/starkvibe-maroon-t-shirt-showcase.png"
                  width={600}
                  height={900}
                  alt="Maroon regular fit 180 GSM cotton tee"
                  sizes="(min-width: 1024px) 28vw, 48vw"
                  className="h-auto w-full"
                />
              </div>
              <a
                href="#range"
                className="absolute top-6 left-6 bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper"
              >
                Regular fit 180 GSM · ₹800
              </a>
              <span className="absolute right-5 bottom-[18px] bg-paper/80 px-2 py-1 text-[10px] tracking-[.14em] uppercase">
                Heavy cotton. Everyday character.
              </span>
            </div>
          </section>
          <section className="bg-gold">
            <div
              className={`${container} grid grid-cols-2 gap-x-8 gap-y-7 py-9 lg:grid-cols-4`}
            >
              {specs.map(([title, note]) => (
                <div key={title}>
                  <h2 className="font-display text-3xl leading-none font-black uppercase">
                    {title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-snug">{note}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="categories" className={`${container} pt-20 lg:pt-32`}>
            <Reveal>
              <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
                <div>
                  <p className={`${eyebrow} text-olive`}>Explore the collection</p>
                  <h2 className={heading}>
                    Find your
                    <br />
                    everyday piece.
                  </h2>
                </div>
                <p className="max-w-[400px] text-[17px] leading-[1.6] text-[#3f3e3a]">
                  From clean everyday tees to substantial fleece layers, choose
                  the shape that fits your wardrobe, your team or your next
                  custom print.
                </p>
              </div>
            </Reveal>
            <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
              {categories.map((category) => (
                <a
                  key={category.label}
                  href={category.href}
                  className={`group relative flex min-h-[390px] min-w-[84vw] snap-start flex-col justify-end overflow-hidden bg-[#e4e2da] p-5 text-paper shadow-[0_10px_30px_rgba(13,13,12,.12)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(13,13,12,.22)] sm:min-h-0 sm:min-w-0 sm:snap-none sm:p-6 lg:p-7 ${category.cardClass}`}
                >
                  <Image
                    src={category.image}
                    alt={`StarkVibe ${category.label} 100% cotton clothing collection`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent transition-opacity duration-500 group-hover:via-ink/35" aria-hidden="true" />
                  <div className="relative z-10">
                    <p className="mb-2 text-[10px] font-semibold tracking-[.18em] text-gold uppercase lg:text-[11px]">
                      {category.eyebrow}
                    </p>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display text-[clamp(24px,1vw,28px)] leading-[.88] font-black uppercase">
                          {category.label}
                        </h3>
                        <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-paper/80 sm:text-sm">
                          {category.description}
                        </p>
                      </div>
                     
                    </div>
                  </div>
                  <div className="hidden">
                    <div className="mt-2.5 flex justify-end text-xs lg:text-sm">
                      <span className="font-bold">Shop →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </Storefront>
        <section className="border-y border-ink/20 bg-[#eeece5] py-20 lg:py-28" aria-labelledby="who-starkvibe-is-for">
          <div className={`${container} grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24`}>
            <Reveal>
              <p className={`${eyebrow} text-olive`}>A clearer way to choose</p>
              <h2 id="who-starkvibe-is-for" className="font-display text-[clamp(50px,6vw,88px)] leading-[.88] font-black uppercase">Built for the people who wear it.</h2>
            </Reveal>
            <div className="space-y-9 text-[16px] leading-[1.7] text-[#3f3e3a]">
              <div>
                <h3 className="mb-2 text-2xl font-bold">For groups, teams and thoughtful gifts</h3>
                <p>StarkVibe is for college groups, offices, families, event crews and people looking for a personal gift. Start with an everyday T-shirt, a polished polo, a kids tee or a warmer fleece layer, then choose the colour and fit that make sense for the people wearing it. The range is designed to work for a single favourite piece as well as coordinated clothing for a shared occasion.</p>
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">Why cotton, and which GSM?</h3>
                <p>Every piece is made from 100% cotton, with options from 180 to 350 GSM. Choose 180 GSM for a light, breathable everyday tee or kids tee. Move to 220–240 GSM when you want more body, a structured feel or an oversized and French Terry look. At 350 GSM, cotton fleece gives sweatshirts and hoodies a warmer, more substantial layer. Our <Link href="/shop/t-shirts" className="font-bold underline underline-offset-4 hover:text-olive">T-shirts</Link> and <Link href="/shop/hoodies" className="font-bold underline underline-offset-4 hover:text-olive">hoodies</Link> pages make those choices easier to compare.</p>
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">From enquiry to finished order</h3>
                <p>For custom printed t-shirts and bulk t-shirt orders, the process starts with an enquiry. Share the occasion, garment preference, colours, sizes, quantity and artwork—or describe the idea if the design is not ready. The next steps are artwork review, a quote, and production after the final details are approved. Visit <Link href="/custom-printing" className="font-bold underline underline-offset-4 hover:text-olive">custom printing</Link> to begin, or check the <Link href="/size-guide" className="font-bold underline underline-offset-4 hover:text-olive">size guide</Link> before sending your size list.</p>
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">A practical place to start</h3>
                <p>Choose the occasion first, then the garment weight and fit. A regular fit is a straightforward daily base, while an oversized tee gives a relaxed streetwear shape. Polos bring a sharper everyday look, kids tees keep group dressing simple, and fleece adds warmth for cooler days. If the order includes different ages or preferences, make a clear size and colour list before sharing the enquiry. That gives the artwork and product choices a useful starting point without making the brief complicated.</p>
              </div>
              <div className="border-t border-ink/20 pt-6">
                <p>Want a little more context? Read our guides on <Link href="/blog/how-to-choose-the-right-gsm-t-shirt" className="font-bold underline underline-offset-4 hover:text-olive">choosing the right GSM</Link> and the <Link href="/blog/custom-t-shirt-printing-order-checklist" className="font-bold underline underline-offset-4 hover:text-olive">custom printing order checklist</Link>.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="fabric" className="mt-20 bg-ink text-paper lg:mt-36">
          <div
            className={`${container} grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:py-32`}
          >
            <Reveal className="relative flex min-h-[450px] flex-col justify-between overflow-hidden bg-[#e2dfd6] p-8 text-ink lg:min-h-[680px]">
              <Image
                src="/branding/cotton-process-bg.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover opacity-65"
              />
              <div className="absolute inset-0 bg-[#e2dfd6]/25" aria-hidden="true" />
              <p className="relative z-10 font-display text-[clamp(120px,15vw,220px)] leading-[.8] font-black">
                100%
              </p>
              <div className="relative z-10">
                <h2 className="font-display text-[44px] leading-[.95] font-black uppercase">
                  Cotton,
                  <br />
                  start to finish.
                </h2>
                <p className="mt-6 text-[11px] tracking-[.12em] text-[#6e6b62] uppercase">
                  Pure fibre · Nothing to hide
                </p>
              </div>
            </Reveal>
            <Reveal>
              <p className={`${eyebrow} text-gold`}>How it is made</p>
              <h2 className="mb-14 font-display text-[clamp(44px,6vw,92px)] leading-[.9] font-black uppercase">
                Four steps to a<br className="hidden xl:block" /> finish that
                lasts.
              </h2>
              <div className="border-t border-[#3a3a36]">
                {steps.map(([title, note], i) => (
                  <div
                    key={title}
                    className="flex gap-7 border-b border-[#3a3a36] py-[30px]"
                  >
                    <span className="w-14 shrink-0 font-display text-[44px] leading-none font-black text-gold">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="mb-2 text-[22px] font-bold">{title}</h3>
                      <p className="text-base leading-[1.6] text-[#b9b7ae]">
                        {note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <section id="colours" className={`${container} pt-20 lg:pt-36`}>
          <Reveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={`${eyebrow} text-olive`}>Colour library</p>
                <h2 className={heading}>
                  Nineteen shades.
                  <br />
                  Exact hex.
                </h2>
              </div>
              <p className="max-w-[380px] text-[17px] leading-[1.6] text-[#3f3e3a]">
                Every colour in the range, shown with its code. Not every shade
                is available on every piece, so check the product.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {swatches.map((c) => {
              const h = c.hex.slice(1);
              const lum =
                (0.299 * parseInt(h.slice(0, 2), 16) +
                  0.587 * parseInt(h.slice(2, 4), 16) +
                  0.114 * parseInt(h.slice(4, 6), 16)) /
                255;
              return (
                <span
                  key={c.hex}
                  style={{
                    backgroundColor: c.hex,
                    color: lum > 0.55 ? "#0d0d0c" : "#f1f0eb",
                  }}
                  className="flex h-[168px] flex-col justify-end border border-black/10 p-3.5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="text-[15px] leading-tight font-bold">
                    {c.name}
                  </span>
                  <span className="mt-1 text-[11px] tracking-[.08em]">
                    {c.hex.toUpperCase()}
                  </span>
                </span>
              );
            })}
          </div>
        </section>
        <section id="custom" className="mt-20 bg-[#2a4f00] text-paper lg:mt-36">
          <div
            className={`${container} grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-24 lg:py-[120px]`}
          >
            <Reveal>
              <p className={`${eyebrow} text-gold`}>Custom printing</p>
              <h2 className="mb-7 font-display text-[clamp(52px,7.4vw,120px)] leading-[.88] font-black uppercase">
                Made for every
                <br />
                celebration.
              </h2>
              <p className="mb-9 max-w-[500px] text-lg leading-[1.6] text-[#d8e2c8]">
                From birthdays and parties to special events and thoughtful
                gifts, get your favourite designs printed on tees, hoodies and
                more. Tell us what you are celebrating and we will take it from
                there.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Birthday gifts",
                  "Party groups",
                  "Event orders",
                  "Custom gifts",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#6f8f47] px-[18px] py-2.5 text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
            <QuoteForm />
          </div>
        </section>
        <section
          id="faq"
          className={`${container} grid gap-12 pt-20 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:pt-36`}
        >
          <Reveal>
            <p className={`${eyebrow} text-olive`}>Good to know</p>
            <h2 className="mb-6 font-display text-[clamp(48px,6vw,67px)] leading-[.88] font-black uppercase">
              Questions,
              <br />
              answered.
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#3f3e3a]">
              Cannot find what you need? Send us an enquiry and a real person
              will reply.
            </p>
          </Reveal>
          <div className="border-t border-ink">
            {faqs.map(([title, answer], i) => (
              <details
                key={title}
                open={i === 0}
                className="group border-b border-ink"
              >
                <summary className="flex list-none items-center justify-between gap-5 py-[26px] text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {title}
                  <span className="text-3xl font-normal group-open:hidden">
                    +
                  </span>
                  <span className="hidden text-3xl font-normal group-open:block">
                    −
                  </span>
                </summary>
                <p className="max-w-[620px] pb-7 leading-[1.65] text-[#3f3e3a]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
