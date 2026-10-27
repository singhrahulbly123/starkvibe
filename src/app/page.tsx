import { SiteFooter } from "@/components/site-footer";
import Image from "next/image";
import Link from "next/link";
import { Storefront } from "@/components/storefront";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd } from "@/lib/structured-data";
import { HomeBannerSlider } from "@/components/home-banner-slider";
import { CustomPrintingOfferSlider } from "@/components/custom-printing-offer-slider";
import { HomeOfferBanner } from "@/components/prepaid-offer-banner";
import { CustomBrandingImageSlider } from "@/components/custom-branding-image-slider";
import { HomeProductSlider } from "@/components/home-product-slider";
import { getCatalogueProducts } from "@/lib/catalogue-server";

export const metadata = buildMetadata({
  title: "Premium Cotton T-Shirts & Custom Printing India | StarkVibe",
  description:
    "100% cotton tees, polos, sweatshirts and hoodies from 180 to 350 GSM. Custom printing for birthdays, offices and teams. Prices from ₹745.",
  path: "/",
});

const container = "mx-auto max-w-[1400px] px-5 lg:px-12";
const heading =
  "font-display text-[clamp(22px,4.2vw,60px)] leading-none font-black uppercase";
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
    image: "/coastmore/Pastel%20T-Shirt%20Patio%20Portrait.png",
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
    image: "/coastmore/Spring%20Bicycle%20Portrait%20with%20Wildflowers.png",
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
    image: "/coastmore/Pastel%20T-Shirt%20Patio%20Portrait.png",
    description: "Clean fits, premium cotton and easy everyday comfort.",
    href: "/shop/t-shirts",
    cardClass:
      "col-span-2 min-h-[320px] sm:col-span-2 lg:col-span-1 lg:min-h-[295px]",
  },
  {
    label: "Polos",
    eyebrow: "Polished comfort",
    image: "/coastmore/Spring%20Bicycle%20Portrait%20with%20Wildflowers.png",
    description: "Breathable Matty fabric with a sharper everyday finish.",
    href: "/shop/polos",
    cardClass: "min-h-[280px] sm:min-h-[320px] lg:col-span-1 lg:min-h-[295px]",
  },
  {
    label: "Kids",
    eyebrow: "Made to move",
    image: "/coastmore/Joyful%20Friends%E2%80%99%20Bicycle%20Ride.png",
    description: "Soft, flexible pieces for active days and special moments.",
    href: "/shop/kids",
    cardClass: "min-h-[280px] sm:min-h-[320px] lg:col-span-1 lg:min-h-[295px]",
  },
  {
    label: "Sweatshirts",
    eyebrow: "Warm layers",
    image: "/coastmore/Maroon%20Hoodie%20Urban%20Chic.png",
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
    cardClass:
      "col-span-2 min-h-[300px] sm:col-span-3 lg:col-span-1 lg:min-h-[295px]",
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
    "Standard delivery usually takes 5–7 working days across India. Express delivery usually takes 3–4 working days where available. Shipping charges are shown at checkout before you place the order. Unused, unworn standard products can be requested for return within 7 days of delivery; personalised, custom-printed and made-to-order products are not returnable unless they arrive damaged or have a production defect. Contact us with your order number and photos within 48 hours for damaged or incorrect items.",
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
    email: "info@starkvibe.com",
  },
  areaServed: [
    "Delhi NCR",
    "Mumbai",
    "Bengaluru",
    "Jaipur",
    "Lucknow",
    "Hyderabad",
    "India",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi NCR",
    addressCountry: "IN",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StarkVibe",
  url: "https://starkvibe.com",
};

export default async function Home() {
  const catalogueProducts = await getCatalogueProducts();
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
        <Storefront hideRange>
          <HomeBannerSlider />
          <section className="border-b border-ink/10 bg-paper px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
            <div className={`${container} max-w-[1100px]`}>
              <h1 className="font-display text-[clamp(20px,4vw,50px)] leading-[.9] font-black uppercase">
                Premium Cotton T-Shirts &amp; Custom Printing in India
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">
                Shop oversized T-shirts, polos, kidswear and fleece hoodies, or
                create custom printed clothing for teams, events and everyday
                wear.
              </p>
            </div>
          </section>
          <section className="border-y border-ink/10 bg-[#e8e2d7]">
            <div
              className={`${container} grid grid-cols-2 gap-x-6 gap-y-0 py-4 sm:gap-x-8 lg:grid-cols-4 lg:py-7`}
            >
              {specs.map(([title, note]) => (
                <div
                  key={title}
                  className="py-4 lg:border-l lg:border-ink/15 lg:py-2 lg:pl-7 first:lg:border-l-0 first:lg:pl-0"
                >
                  <span
                    className="mb-3 block h-[2px] w-8 bg-gold"
                    aria-hidden="true"
                  />
                  <h2 className="font-display text-[clamp(19px,2vw,26px)] leading-none font-black uppercase">
                    {title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/65">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <HomeOfferBanner />
          <section
            aria-labelledby="bestsellers-title"
            className="overflow-hidden bg-paper py-8 sm:py-11"
          >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
              <div className="mb-6 text-center sm:mb-8">
                <p className="text-[10px] font-bold tracking-[.22em] text-olive uppercase sm:text-xs">
                  The StarkVibe edit
                </p>
                <h2
                  id="bestsellers-title"
                  className="mt-1 font-display text-[clamp(34px,4.2vw,50px)] leading-none font-black uppercase"
                >
                  Premium cotton T-shirts <br /> &amp; everyday bestsellers
                </h2>
                <p className="mt-2 text-sm text-ink/65">
                  Find your fit. Make it yours.
                </p>
              </div>
              <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-6">
                {[
                  {
                    label: "Oversized",
                    image:
                      "/bestseller/Urban%20Starkvibe%20Streetwear%20Portrait.png",
                    href: "/shop/oversized-t-shirts",
                    alt: "StarkVibe oversized streetwear collection",
                  },
                  {
                    label: "Clean classics",
                    image:
                      "/bestseller/Sunlit%20Starkvibe%20Lifestyle%20Portrait.png",
                    href: "/shop/clean-classics",
                    alt: "StarkVibe clean classic T-shirt",
                  },
                  {
                    label: "Statement prints",
                    image:
                      "/bestseller/Modern%20Green%20Streetwear%20Portrait.png",
                    href: "/shop/statement-prints",
                    alt: "StarkVibe statement streetwear",
                  },
                  {
                    label: "French Terry",
                    image:
                      "/bestseller/Sunlit%20Starkvibe%20Streetwear%20Portrait.png",
                    href: "/shop/french-terry",
                    alt: "StarkVibe French Terry streetwear",
                  },
                  {
                    label: "Premium polos",
                    image:
                      "/bestseller/Sunlit%20Starkvibe%20Polo%20Portrait.png",
                    href: "/shop/polos",
                    alt: "StarkVibe premium polo",
                  },
                  {
                    label: "Explore all",
                    image:
                      "/bestseller/Modern%20Sunglasses%20Style%20Portrait.png",
                    href: "/shop",
                    alt: "Explore the StarkVibe apparel collection",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative h-[290px] min-w-[70vw] snap-start overflow-hidden rounded-[24px] border-[3px] border-gold bg-[#e7e2d8] shadow-[0_4px_0_rgba(13,13,12,.08)] transition-transform duration-300 hover:-translate-y-1 sm:h-[320px] sm:min-w-0 sm:rounded-[28px]"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 70vw"
                      className="object-cover object-center"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex min-h-12 items-center justify-center bg-ink/95 px-2 text-center text-[11px] font-bold tracking-[.1em] text-paper uppercase sm:text-xs">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
          <HomeProductSlider initialProducts={catalogueProducts} />
          <HomeProductSlider hoodiesOnly initialProducts={catalogueProducts} />
          <HomeProductSlider sweatshirtsOnly initialProducts={catalogueProducts} />
          <CustomPrintingOfferSlider />
          <section id="categories" className={`${container} pt-6 lg:pt-10`}>
            <Reveal>
              <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
                <div>
                  <p className={`${eyebrow} text-olive`}>
                    Explore the collection
                  </p>
                  <h2 className={heading}>
                    Shop oversized T-shirts, polos and fleece hoodies.
                  </h2>
                </div>
                <p className="max-w-[400px] text-[17px] leading-[1.6] text-[#3f3e3a]">
                  From clean everyday tees to substantial fleece layers, choose
                  the shape that fits your wardrobe, your team or your next
                  custom print.
                </p>
              </div>
            </Reveal>
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-x-auto sm:px-0 sm:pb-4 lg:flex lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:pb-5">
              {categories.map((category) => (
                <a
                  key={category.label}
                  href={category.href}
                  className="group relative flex h-[390px] min-w-[78vw] snap-start flex-col justify-end overflow-hidden rounded-[10px] bg-[#e4e2da] p-5 text-paper shadow-[0_10px_30px_rgba(13,13,12,.12)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(13,13,12,.22)] sm:h-[430px] sm:min-w-0 sm:p-6 lg:h-[500px] lg:flex-[0_0_calc((100%-3rem)/4)] lg:p-7"
                >
                  <Image
                    src={category.image}
                    alt={`StarkVibe ${category.label} 100% cotton clothing collection`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-ink/25 transition-opacity duration-500 group-hover:from-ink/85"
                    aria-hidden="true"
                  />
                  <div className="absolute top-5 right-5 left-5 z-10 text-right sm:top-7 sm:right-7 sm:left-7">
                    <p className="font-display text-[clamp(25px,2vw,38px)] leading-[.92] font-black uppercase">
                      {category.label}
                    </p>
                  </div>
                  <div className="relative z-10 text-center">
                    <span className="inline-flex border-b border-paper/80 pb-1 text-sm font-semibold tracking-wide uppercase">
                      Shop now
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </Storefront>
        <CustomBrandingImageSlider />
        <section
          className="border-y border-ink/20 bg-[#eeece5] py-10"
          aria-labelledby="who-starkvibe-is-for"
        >
          <div
            className={`${container} grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24`}
          >
            <Reveal>
              <p className={`${eyebrow} text-olive`}>A clearer way to choose</p>
              <h2
                id="who-starkvibe-is-for"
                className="font-display text-[clamp(36px,4.2vw,60px)] leading-[.88] font-black uppercase"
              >
                Custom T-shirt printing for teams, events and gifts.
              </h2>
            </Reveal>
            <div className="space-y-9 text-[16px] leading-[1.7] text-[#3f3e3a]">
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  Custom printed T-shirts for groups and teams
                </h3>
                <p>
                  StarkVibe is for college groups, offices, families, event
                  crews and people looking for a personal gift. Start with an
                  everyday T-shirt, a polished polo, a kids tee or a warmer
                  fleece layer, then choose the colour and fit that make sense
                  for the people wearing it. The range is designed to work for a
                  single favourite piece as well as coordinated clothing for a
                  shared occasion.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  How to choose cotton T-shirts, GSM and hoodies
                </h3>
                <p>
                  Every piece is made from 100% cotton, with options from 180 to
                  350 GSM. Choose 180 GSM for a light, breathable everyday tee
                  or kids tee. Move to 220–240 GSM when you want more body, a
                  structured feel or an oversized and French Terry look. At 350
                  GSM, cotton fleece gives sweatshirts and hoodies a warmer,
                  more substantial layer. Our{" "}
                  <Link
                    href="/shop/t-shirts"
                    className="font-bold underline underline-offset-4 hover:text-olive"
                  >
                    T-shirts
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/shop/hoodies"
                    className="font-bold underline underline-offset-4 hover:text-olive"
                  >
                    hoodies
                  </Link>{" "}
                  pages make those choices easier to compare.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  From custom printing enquiry to finished order
                </h3>
                <p>
                  For custom printed t-shirts and bulk t-shirt orders, the
                  process starts with an enquiry. Share the occasion, garment
                  preference, colours, sizes, quantity and artwork—or describe
                  the idea if the design is not ready. The next steps are
                  artwork review, a quote, and production after the final
                  details are approved. Visit{" "}
                  <Link
                    href="/custom-printing"
                    className="font-bold underline underline-offset-4 hover:text-olive"
                  >
                    custom printing
                  </Link>{" "}
                  to begin, or check the{" "}
                  <Link
                    href="/size-guide"
                    className="font-bold underline underline-offset-4 hover:text-olive"
                  >
                    size guide
                  </Link>{" "}
                  before sending your size list.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  A practical place to start
                </h3>
                <p>
                  Choose the occasion first, then the garment weight and fit. A
                  regular fit is a straightforward daily base, while an
                  oversized tee gives a relaxed streetwear shape. Polos bring a
                  sharper everyday look, kids tees keep group dressing simple,
                  and fleece adds warmth for cooler days. If the order includes
                  different ages or preferences, make a clear size and colour
                  list before sharing the enquiry. That gives the artwork and
                  product choices a useful starting point without making the
                  brief complicated.
                </p>
              </div>
              <div className="border-t border-ink/20 pt-6">
                <p>
                  Want a little more context? Read our guides on{" "}
                  <Link
                    href="/blog/how-to-choose-the-right-gsm-t-shirt"
                    className="font-bold underline underline-offset-4 hover:text-olive"
                  >
                    choosing the right GSM
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/blog/custom-t-shirt-printing-order-checklist"
                    className="font-bold underline underline-offset-4 hover:text-olive"
                  >
                    custom printing order checklist
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="custom" className="bg-ink text-paper">
          <div
            className={`${container} grid gap-12 py-10 lg:grid-cols-[1fr_1.1fr] lg:gap-24`}
          >
            <Reveal className="relative flex min-h-[450px] flex-col justify-between overflow-hidden bg-[#e2dfd6] p-8 text-ink lg:min-h-[680px]">
              <Image
                src="/branding/cotton-process-bg.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover opacity-65"
              />
              <div
                className="absolute inset-0 bg-[#e2dfd6]/25"
                aria-hidden="true"
              />
              <p className="relative z-10 font-display text-[clamp(120px,15vw,220px)] leading-[.8] font-black">
                100%
              </p>
              <div className="relative z-10">
                <h2 className="font-display text-[clamp(38px,4.2vw,60px)] leading-[.95] font-black uppercase">
                  Premium cotton T-shirts,
                  <br />
                  from 180 to 350 GSM.
                </h2>
                <p className="mt-6 text-[11px] tracking-[.12em] text-[#6e6b62] uppercase">
                  Pure fibre · Nothing to hide
                </p>
              </div>
            </Reveal>
            <Reveal>
              <p className={`${eyebrow} text-olive`}>How it is made</p>
              <h2 className="mb-14 font-display text-[clamp(36px,4.2vw,60px)] leading-[.9] font-black uppercase">
                How custom T-shirt printing
                <br className="hidden xl:block" /> works.
              </h2>
              <div className="border-t border-paper/20">
                {steps.map(([title, note], i) => (
                  <div
                    key={title}
                    className="flex gap-7 border-b border-paper/20 py-[30px]"
                  >
                    <span className="w-14 shrink-0 font-display text-[44px] leading-none font-black text-olive">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="mb-2 text-[22px] font-bold">{title}</h3>
                      <p className="text-base leading-[1.6] text-paper/70">
                        {note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <section
          id="faq"
          className={`${container} grid gap-12 py-10 lg:grid-cols-[1fr_2fr] lg:gap-24`}
        >
          <Reveal>
            <p className={`${eyebrow} text-olive`}>Good to know</p>
            <h2 className="mb-6 font-display text-[clamp(36px,4.2vw,60px)] leading-[.88] font-black uppercase">
              FAQ: T-shirts, hoodies,
              <br />
              custom printing and delivery.
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
