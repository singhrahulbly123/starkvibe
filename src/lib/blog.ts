export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  readTime: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  related: { label: string; href: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-gsm-t-shirt",
    title: "How to Choose the Right GSM T-Shirt",
    description: "A simple guide to GSM, fabric weight, comfort and choosing the right cotton T-shirt for everyday wear or custom printing.",
    category: "Fabric guide",
    published: "2026-10-01",
    readTime: "5 min read",
    intro: "GSM means grams per square metre, a practical way to understand how light or substantial a garment fabric feels. It is not a quality score on its own: the right GSM depends on the season, fit, activity and the kind of print you want.",
    sections: [
      { heading: "What does GSM mean?", paragraphs: ["A lower GSM usually feels lighter and more breathable, while a higher GSM usually has more body, structure and warmth. Cotton type, knitting, finishing and fit also affect the final feel, so compare the complete garment rather than choosing a number alone."] },
      { heading: "Which GSM is right for you?", paragraphs: ["For hot everyday wear and kidswear, 180 GSM is an easy, flexible choice. Around 220 GSM works well when you want a little more body without making the T-shirt feel heavy. At 240 GSM, French Terry brings a denser hand-feel and a more structured streetwear silhouette. For cool weather, 350 GSM fleece is the warmest option in the StarkVibe range."], bullets: ["180 GSM: light, breathable everyday tees and kidswear", "220 GSM: balanced comfort for regular or relaxed fits", "240 GSM: structured French Terry for a heavier T-shirt feel", "350 GSM: warm fleece for sweatshirts and hoodies"] },
      { heading: "GSM and custom printing", paragraphs: ["The garment and artwork should be considered together. A clean logo, name or small chest print can work across the range. For larger group artwork, share the print size, placement and colour requirements before ordering so the garment and production method can be matched properly."] },
      { heading: "A practical way to decide", paragraphs: ["Start with the use case, then choose the fit and colour. If the garment is for a summer event, prioritise breathability. If it is for an offsite in cool weather, choose fleece. For a group order, request a size breakdown and confirm one sample or artwork proof before production."] },
    ],
    related: [{ label: "Shop by fabric weight", href: "/shop/weight" }, { label: "Explore all products", href: "/shop" }, { label: "Request a custom quote", href: "/contact" }],
  },
  {
    slug: "custom-t-shirt-printing-order-checklist",
    title: "Custom T-Shirt Printing: An Order Checklist",
    description: "Planning custom printed T-shirts, polos or hoodies? Use this checklist for artwork, sizes, colours, quantity and delivery details.",
    category: "Custom printing",
    published: "2026-10-03",
    readTime: "6 min read",
    intro: "A custom apparel order becomes much easier when the important decisions are collected before the quote. Whether you need one personalised gift or a team order, these details help prevent last-minute changes and make the final result more predictable.",
    sections: [
      { heading: "1. Start with the occasion", paragraphs: ["Write down what the garments are for: a birthday, office event, family celebration, anniversary, campaign or gift. The occasion usually determines the best garment, print style, colour palette and quantity."] },
      { heading: "2. Choose the garment", paragraphs: ["Decide between a regular-fit tee, oversized tee, polo, kids tee, sweatshirt or hoodie. Think about the season, the people wearing it and whether the garment needs to look casual, polished or warm. Our range covers 180 to 350 GSM options."], bullets: ["T-shirts for everyday events, birthdays and gifts", "Polos for a cleaner office or event uniform", "Kids tees for family celebrations and children’s groups", "Sweatshirts and hoodies for winter, teams and streetwear"] },
      { heading: "3. Prepare the artwork", paragraphs: ["Share the clearest version of your logo, image or design. Tell us where it should go—front, back, chest or sleeve—and include the print colours you want. If you only have an idea, name or reference image, share that too; it is easier to plan a print when the brief is clear."] },
      { heading: "4. Confirm colours and sizes", paragraphs: ["Make a simple list of garment colours and sizes. For a bulk order, include the quantity beside each size, for example S-4, M-8, L-10 and XL-3. For mixed adult and kids orders, separate the lists so nothing is missed."] },
      { heading: "5. Send the right enquiry details", paragraphs: ["Include your name, WhatsApp number, quantity, preferred product, artwork and required date. Ask for a quote and confirm the artwork placement before production. A clear enquiry gives you a clearer answer."] },
    ],
    related: [{ label: "Start custom printing", href: "/custom-printing" }, { label: "Create your own design", href: "/design-your-own" }, { label: "Contact StarkVibe", href: "/contact" }],
  },
  {
    slug: "how-to-care-for-cotton-t-shirts-and-fleece",
    title: "How to Care for Cotton T-Shirts and Fleece",
    description: "Simple washing, drying and storage tips to help cotton T-shirts, polos, sweatshirts and hoodies keep their shape and finish.",
    category: "Care guide",
    published: "2026-10-05",
    readTime: "4 min read",
    intro: "Good care helps cotton garments stay comfortable and keeps custom prints looking cleaner for longer. Always check the garment label first, then use these simple habits for everyday maintenance.",
    sections: [
      { heading: "Wash with similar colours", paragraphs: ["Separate dark, light and strong colours when possible. Turn printed garments inside out before washing to reduce direct rubbing on the print and surface fabric."] },
      { heading: "Use a gentle wash", paragraphs: ["Choose a moderate wash cycle and avoid using more detergent than needed. Very hot water and harsh chemicals can place extra stress on cotton fibres, colour and printed areas."] },
      { heading: "Dry without unnecessary heat", paragraphs: ["Air drying is usually the gentlest option. Keep garments away from intense direct heat, and reshape tees, sweatshirts and hoodies while damp so they dry with a more natural fit."] },
      { heading: "Store fleece carefully", paragraphs: ["Fold sweatshirts and hoodies instead of leaving them on a thin hanger for long periods. Keep them dry and allow enough space for the fleece surface to stay smooth."] },
      { heading: "Iron and print care", paragraphs: ["If ironing is needed, turn the garment inside out and avoid placing a hot iron directly over the printed design. For a new custom print, follow the care guidance provided with the order."] },
    ],
    related: [{ label: "Shop cotton wear", href: "/shop/fabric" }, { label: "Browse colours", href: "/shop/colours" }, { label: "Read shipping policy", href: "/shipping-policy" }],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
