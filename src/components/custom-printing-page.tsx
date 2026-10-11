import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CustomDesignForm } from "./custom-design-form";
import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { Storefront } from "./storefront";

const container = "mx-auto max-w-[1400px] px-5 lg:px-12";

type CustomPageKey =
  | "overview"
  | "birthday"
  | "office-bulk"
  | "anniversary"
  | "gifting"
  | "political-campaigns";

type CustomPageContent = {
  label: string;
  title: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  introTitle: string;
  intro: string;
  benefits: string[];
  productLinks: { title: string; text: string; href: string }[];
};

const pages: Record<CustomPageKey, CustomPageContent> = {
  overview: {
    label: "Custom printing",
    title: (
      <>
        Make it
        
        yours.
      </>
    ),
    description:
      "Custom printed t-shirts, hoodies and polos for the moments people remember. Share your idea, choose your pieces and let us help bring the design to life.",
    image: "/products/t-adda/180-gsm-regular-tee-black.webp",
    imageAlt: "Black custom-printing t-shirt",
    introTitle: "Print the moment, not just the garment.",
    intro:
      "StarkVibe custom printing is made for real occasions: birthday groups, office teams, family celebrations, anniversaries, college events and thoughtful gifts. Choose a comfortable cotton base, send your artwork or idea, and we will help you plan the right colour, size mix and quantity.",
    benefits: [
      "Birthday and party t-shirts with names, dates or inside jokes",
      "Office and bulk orders for teams, employees and company events",
      "Anniversary and family designs made for a shared memory",
      "Personalised gifts that feel considered, useful and easy to wear",
    ],
    productLinks: [
      { title: "Birthday printing", text: "For the whole crew.", href: "/custom-printing/birthday" },
      { title: "Office & bulk", text: "For teams that move together.", href: "/custom-printing/office-bulk" },
      { title: "Anniversary wear", text: "For your shared story.", href: "/custom-printing/anniversary" },
      { title: "Custom gifting", text: "For a gift with meaning.", href: "/custom-printing/gifting" },
      { title: "Campaign merchandise", text: "For organised public teams.", href: "/custom-printing/political-campaigns" },
    ],
  },
  birthday: {
    label: "Birthday printing",
    title: (
      <>
        Wear the
        good time.
      </>
    ),
    description:
      "Matching birthday t-shirts and hoodies for the people who make the day special. One idea, many sizes, a memory everyone can wear.",
    image: "/products/t-adda/180-gsm-kids-regular-tee-sea-green.webp",
    imageAlt: "Custom birthday t-shirt for a group celebration",
    introTitle: "From first birthdays to big ones.",
    intro:
      "Create a birthday look that feels personal without making the planning complicated. Add a name, age, date, phrase, illustration or matching theme to comfortable cotton t-shirts and hoodies. We can help you organise adult and kids sizes, mixed colours and the quantity you need for the celebration.",
    benefits: [
      "Matching family and friends t-shirts for birthday photos",
      "Kids birthday designs with playful names, numbers and themes",
      "Bridesmaid-style group looks for parties and pre-wedding events",
      "Small or larger orders with a clear size and colour breakdown",
    ],
    productLinks: [
      { title: "Kids cotton tees", text: "Soft bases for little guests.", href: "/products/kids" },
      { title: "Regular fit tees", text: "An easy group uniform.", href: "/products/regular" },
      { title: "Oversized tees", text: "Relaxed party energy.", href: "/products/oversized" },
      { title: "Request a birthday quote", text: "Tell us the plan.", href: "/custom-printing#enquiry" },
    ],
  },
  "office-bulk": {
    label: "Office & bulk printing",
    title: (
      <>
        Built for
        the team.
      </>
    ),
    description:
      "Professional custom t-shirts, polos, sweatshirts and hoodies for employees, events, campaigns and bulk team orders.",
    image: "/products/t-adda/350-gsm-hoodie-black.webp",
    imageAlt: "Custom office and bulk order hoodie",
    introTitle: "A better uniform for the people behind the work.",
    intro:
      "Your team does not need a loud uniform to look connected. A well-chosen cotton tee, polo or hoodie with a clean print can work at an office event, launch, workshop, campus drive or company offsite. Share your logo, artwork, preferred garments and size list, and we will help shape a practical bulk order.",
    benefits: [
      "Employee t-shirts and hoodies for company culture and offsites",
      "Polos for a cleaner, more polished event uniform",
      "Bulk size planning with adult and mixed-colour options",
      "Artwork and production details confirmed before the order begins",
    ],
    productLinks: [
      { title: "Cotton polos", text: "Smart, breathable teamwear.", href: "/products/polo" },
      { title: "Fleece hoodies", text: "Warm layers for your crew.", href: "/products/hoodie" },
      { title: "Fleece sweatshirts", text: "A clean event essential.", href: "/products/sweatshirt" },
      { title: "Start a bulk enquiry", text: "Share your quantity.", href: "/custom-printing#enquiry" },
    ],
  },
  anniversary: {
    label: "Anniversary printing",
    title: (
      <>
        Keep the
       
        story close.
      </>
    ),
    description:
      "Personalised anniversary t-shirts, hoodies and keepsakes for couples, families and the milestones worth celebrating together.",
    image: "/products/t-adda/350-gsm-sweatshirt-maroon.webp",
    imageAlt: "Custom anniversary sweatshirt",
    introTitle: "Make the date wearable.",
    intro:
      "An anniversary design can be understated or full of personality. Use a date, initials, a line from your story, a small illustration or a shared reference. We print your idea on comfortable everyday pieces so the gift feels meaningful on the day and useful afterwards.",
    benefits: [
      "Couple t-shirts and hoodies with dates, initials or personal messages",
      "Family anniversary designs for parents and grandparents",
      "Coordinated colours for photos, dinners and celebration trips",
      "Gift-ready custom pieces designed around your story",
    ],
    productLinks: [
      { title: "Premium sweatshirts", text: "A warmer anniversary gift.", href: "/products/sweatshirt" },
      { title: "Regular fit tees", text: "Simple, personal and wearable.", href: "/products/regular" },
      { title: "Oversized hoodies", text: "Comfort with character.", href: "/products/hoodie" },
      { title: "Plan an anniversary print", text: "Send the story.", href: "/custom-printing#enquiry" },
    ],
  },
  gifting: {
    label: "Personalised gifting",
    title: (
      <>
        Give them
       
        something real.
      </>
    ),
    description:
      "Custom printed clothing for thoughtful gifts: a design they will recognise, in a garment they will actually wear.",
    image: "/products/t-adda/220-gsm-polo-white.webp",
    imageAlt: "Personalised custom printed polo gift",
    introTitle: "A good gift has a point of view.",
    intro:
      "Personalised gifting works best when it feels specific. Choose a phrase only your friend understands, a family illustration, a hobby reference or a clean monogram. We can help you select a suitable garment, colour and size before turning the idea into a considered custom print.",
    benefits: [
      "Personalised birthday and festival gifts for friends and family",
      "Custom couple, family and hobby designs with a personal touch",
      "Useful cotton garments instead of one-time novelty products",
      "Single gifts or coordinated sets for a group of recipients",
    ],
    productLinks: [
      { title: "Premium polos", text: "A polished gift choice.", href: "/products/polo" },
      { title: "Everyday cotton tees", text: "Easy to personalise.", href: "/products/regular" },
      { title: "Warm fleece layers", text: "Comfort they can keep.", href: "/products/sweatshirt" },
      { title: "Create a gift enquiry", text: "Tell us who it is for.", href: "/custom-printing#enquiry" },
    ],
  },
  "political-campaigns": {
    label: "Campaign merchandise",
    title: (
      <>
        Made for
        <br />
        the movement.
      </>
    ),
    description:
      "Custom printed t-shirts, polos and hoodies for campaign teams, volunteers, public events and organised community programmes.",
    image: "/products/t-adda/180-gsm-regular-tee-navy.webp",
    imageAlt: "Custom campaign merchandise t-shirt",
    introTitle: "One team. One clear identity.",
    intro:
      "When a campaign, community programme or public event needs a coordinated look, custom apparel helps teams be easy to recognise. Choose comfortable cotton garments, share your approved artwork and plan the right colour and size mix for volunteers, organisers and event staff. We support practical bulk printing for lawful, transparent campaign merchandise and public-facing events.",
    benefits: [
      "Volunteer and campaign team t-shirts for rallies, meetings and public events",
      "Polos and hoodies for organisers, coordinators and field teams",
      "Bulk size planning with clear colour and quantity breakdowns",
      "Artwork review before production so names, symbols and details are clear",
    ],
    productLinks: [
      { title: "Regular fit tees", text: "A reliable campaign base.", href: "/products/regular" },
      { title: "Cotton polos", text: "A polished organiser layer.", href: "/products/polo" },
      { title: "Fleece hoodies", text: "For long event days.", href: "/products/hoodie" },
      { title: "Start a campaign enquiry", text: "Share your approved artwork.", href: "/custom-printing#enquiry" },
    ],
  },
};

export function CustomPrintingPage({ page }: { page: CustomPageKey }) {
  const content = pages[page];
  return (
    <>
      <Storefront hideRange>
        <main>
          <section className="bg-ink text-paper">
            <div className={`${container} py-10 lg:py-16`}>
              <Reveal className="mb-10">
                <p className="mb-5 text-[13px] font-bold tracking-[.18em] text-gold uppercase">
                  {content.label}
                </p>
                <h1 className="font-display text-[clamp(64px,9vw,100px)] leading-[.82] font-black uppercase">
                  {content.title}
                </h1>
                <p className="mt-8 max-w-[720px] text-lg leading-[1.6] text-[#c9c7be]">
                  {content.description}
                </p>
                <Link href="/design-your-own" className="mt-7 inline-flex items-center gap-2 bg-gold px-5 py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5">
                  Create your own design <ArrowUpRight size={17} />
                </Link>
              </Reveal>
              <Reveal>
                <CustomDesignForm
                  pageLabel={content.label}
                  previewImage={content.image}
                />
              </Reveal>
            </div>
          </section>

          <section className={`${container} grid gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:py-32`}>
            <Reveal>
              <p className="mb-5 text-[13px] font-bold tracking-[.18em] text-olive uppercase">
                Why custom print
              </p>
              <h2 className="font-display text-[clamp(48px,6vw,67px)] leading-[.88] font-black uppercase">
                {content.introTitle}
              </h2>
            </Reveal>
            <Reveal>
              <p className="max-w-[680px] text-[18px] leading-[1.7] text-[#3f3e3a]">
                {content.intro}
              </p>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {content.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 border-t border-ink/25 pt-4 text-[15px] font-semibold leading-[1.5]">
                    <Check className="mt-0.5 shrink-0 text-olive" size={19} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <section className="bg-[#e2dfd6] py-20 lg:py-28">
            <div className={container}>
              <Reveal>
                <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="mb-4 text-[13px] font-bold tracking-[.18em] text-olive uppercase">Explore the options</p>
                    <h2 className="font-display text-[clamp(48px,6vw,88px)] leading-[.88] font-black uppercase">Choose your moment.</h2>
                  </div>
                  <p className="max-w-[350px] text-[16px] leading-[1.6] text-[#55544f]">Start with the occasion, then choose the garment, colour, artwork and quantity that make sense for it.</p>
                </div>
              </Reveal>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {content.productLinks.map((link, index) => (
                  <Link key={link.title} href={link.href} className="group flex min-h-[190px] flex-col justify-between border border-ink bg-paper p-5 transition-transform hover:-translate-y-1">
                    <span className="font-display text-5xl font-black text-olive">0{index + 1}</span>
                    <span>
                      <span className="flex items-center justify-between gap-3 text-lg font-bold">{link.title}<ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
                      <span className="mt-1 block text-sm text-[#55544f]">{link.text}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="enquiry" className={`${container} py-20 lg:py-32`}>
            <Reveal>
              <p className="mb-5 text-[13px] font-bold tracking-[.18em] text-olive uppercase">The simple process</p>
              <h2 className="font-display text-[clamp(52px,6vw,92px)] leading-[.88] font-black uppercase">Idea in.<br />Print out.</h2>
              <div className="mt-10 space-y-5 border-t border-ink pt-5 text-[16px] leading-[1.6]">
                <p><strong>01. Tell us the occasion.</strong><br />Birthday, office event, anniversary, gift or something entirely your own.</p>
                <p><strong>02. Share the details.</strong><br />Send your artwork, preferred garments, colours, sizes and quantity.</p>
                <p><strong>03. Confirm the plan.</strong><br />We review the design and confirm the quote, production timeline and delivery details.</p>
              </div>
            </Reveal>
          </section>
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
