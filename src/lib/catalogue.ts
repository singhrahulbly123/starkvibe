export type Colour = { name: string; hex: string; file: string };
export type Product = {
  id: string;
  name: string;
  gsm: number;
  price: number;
  category: string;
  note: string;
  colours: Colour[];
};
export function productSlug(product: Pick<Product, "name">) {
  return product.name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function salePrice(product: Product) {
  if (product.gsm === 350) return product.id === "hoodie" ? 1570 : 1470;
  if (product.gsm === 240) return 1149;
  return product.price + 600;
}
export function mrpPrice(product: Product) {
  if (product.gsm === 350) return 3230;
  if (product.gsm === 240) return 1899;
  return product.price + 1500;
}
const colour = (name: string, hex: string, file: string): Colour => ({
  name,
  hex,
  file,
});
export const products: Product[] = [
  {
    id: "oversized",
    name: "Oversized 220 GSM Tee",
    gsm: 220,
    price: 260,
    category: "tees",
    note: "100% cotton. Double bio-washed, silicon washed, double stitched.",
    colours: [
      colour("Black", "#000000", "black"),
      colour("Brown", "#1b0d00", "brown"),
      colour("Avocado Green", "#336000", "avocado-green"),
      colour("Beige", "#e6c173", "beige"),
      colour("White", "#ffffff", "white"),
    ],
  },
  {
    id: "regular",
    name: "Regular Fit 180 GSM Tee",
    gsm: 180,
    price: 200,
    category: "tees",
    note: "Everyday comfort and breathability in a clean, structured look.",
    colours: [
      colour("Black", "#000000", "black"),
      colour("Sea Green", "#baffd1", "sea-green"),
      colour("Wine Maroon", "#8f292b", "maroon"),
      colour("Midnight Navy", "#020629", "navy"),
      colour("White", "#ffffff", "white"),
    ],
  },
  {
    id: "terry",
    name: "Oversized 240 GSM French Terry Tee",
    gsm: 240,
    price: 280,
    category: "tees",
    note: "French Terry for softness, structure and a refined streetwear look.",
    colours: [
      colour("Black", "#000000", "black"),
      colour("Smokey Grey", "#303030", "smokey-grey"),
      colour("Camel Beige", "#b8943d", "beige"),
      colour("White", "#ffffff", "white"),
    ],
  },
  {
    id: "polo",
    name: "Polo 220 GSM Matty Tee",
    gsm: 220,
    price: 300,
    category: "polo",
    note: "Matty fabric. Comfort, breathability and a polished everyday look.",
    colours: [
      colour("Black", "#000000", "black"),
      colour("White", "#ffffff", "white"),
    ],
  },
  {
    id: "kids",
    name: "Kids Regular 180 GSM Tee",
    gsm: 180,
    price: 145,
    category: "kids",
    note: "Soft, flexible and built for active days and custom printing.",
    colours: [
      colour("Black", "#000000", "black"),
      colour("White", "#ffffff", "white"),
      colour("Pink", "#bf4b76", "pink"),
      colour("Sea Green", "#baffd1", "sea-green"),
      colour("Orange", "#ff6800", "orange"),
    ],
  },
  {
    id: "sweatshirt",
    name: "350 GSM Fleece Sweatshirt",
    gsm: 350,
    price: 480,
    category: "fleece",
    note: "Cotton fleece with serious warmth, softness and durability.",
    colours: [
      colour("Black", "#000000", "black"),
      colour("Navy Blue", "#000b27", "navy-blue"),
      colour("Off-white", "#fffded", "off-white"),
      colour("Deep Maroon", "#890d0f", "maroon"),
      colour("Lavender", "#c382e6", "lavender"),
    ],
  },
  {
    id: "hoodie",
    name: "350 GSM Fleece Hoodie",
    gsm: 350,
    price: 505,
    category: "fleece",
    note: "Cotton fleece for all seasons. Made for streetwear and branding.",
    colours: [
      colour("Black", "#000000", "black"),
      colour("Coffee Brown", "#541501", "coffee-brown"),
      colour("Off-white", "#fffded", "off-white"),
      colour("Olive Green", "#7ca83d", "olive-green"),
      colour("Dark Beige", "#d5aa59", "beige"),
    ],
  },
];
export function getProductBySlug(slug: string) {
  return products.find((product) => product.id === slug || productSlug(product) === slug);
}
const suppliedProductImages: Record<string, Record<string, string>> = {
  oversized: {
    black: "oversized-220-gsm-tee/starkvibe-oversized-t-shirt-advertisement.png",
    brown: "oversized-220-gsm-tee/starkvibe-oversized-t-shirt-editorial-ad.png",
    "avocado-green": "oversized-220-gsm-tee/starkvibe-avocado-oversized-t-shirt.png",
    beige: "oversized-220-gsm-tee/starkvibe-oversized-t-shirt-editorial-poster.png",
    white: "oversized-220-gsm-tee/starkvibe-oversized-t-shirt-poster.png",
  },
  terry: {
    black: "oversized-240-gsm-french-terry/starkvibe-oversized-tee-editorial-ad.png",
    "smokey-grey": "oversized-240-gsm-french-terry/starkvibe-oversized-t-shirt-lookbook.png",
    beige: "oversized-240-gsm-french-terry/starkvibe-oversized-beige-t-shirt-poster.png",
    white: "oversized-240-gsm-french-terry/starkvibe-oversized-t-shirt-campaign.png",
  },
  regular: {
    black: "regular-fit-180-gsm/starkvibe-mens-black-t-shirt-promo.png",
    "sea-green": "regular-fit-180-gsm/mint-t-shirt-editorial-advertisement.png",
    maroon: "regular-fit-180-gsm/starkvibe-maroon-t-shirt-showcase.png",
    navy: "regular-fit-180-gsm/starkvibe-navy-t-shirt-feature-poster.png",
    white: "regular-fit-180-gsm/starkvibe-mens-t-shirt-editorial-poster.png",
  },
  polo: {
    black: "polo-220-gsm-matty-tee/starkvibe-black-polo-advertisement.png",
    white: "polo-220-gsm-matty-tee/starkvibe-premium-white-polo-poster.png",
  },
  kids: {
    black: "180-gsm-kids-cotton-t-shirt/starkvibe-kids-t-shirt-poster.png",
    white: "180-gsm-kids-cotton-t-shirt/starkvibe-kids-cotton-t-shirt-ad.png",
    pink: "180-gsm-kids-cotton-t-shirt/pink-starkvibe-kids-t-shirt-poster.png",
    "sea-green": "180-gsm-kids-cotton-t-shirt/starkvibe-kids-t-shirt-campaign.png",
    orange: "180-gsm-kids-cotton-t-shirt/starkvibe-kids-orange-t-shirt-ad.png",
  },
  sweatshirt: {
    black: "350-gsm-fleece-sweatshirt/starkvibe-mens-sweatshirt-showcase.png",
    "navy-blue": "350-gsm-fleece-sweatshirt/starkvibe-premium-navy-sweatshirt-ad.png",
    "off-white": "350-gsm-fleece-sweatshirt/starkvibe-mens-sweatshirt-editorial-ad.png",
    maroon: "350-gsm-fleece-sweatshirt/starkvibe-maroon-sweatshirt-showcase.png",
    lavender: "350-gsm-fleece-sweatshirt/lavender-sweatshirt-premium-feature-showcase.png",
  },
  hoodie: {
    black: "350-gsm-fleece-hoodie/starkvibe-mens-hoodie-feature-poster.png",
    "coffee-brown": "350-gsm-fleece-hoodie/starkvibe-coffee-brown-hoodie-advertisement.png",
    "off-white": "350-gsm-fleece-hoodie/starkvibe-premium-cotton-hoodie-advertisement.png",
    "olive-green": "350-gsm-fleece-hoodie/starkvibe-premium-olive-hoodie-poster.png",
    beige: "350-gsm-fleece-hoodie/premium-camel-hoodie-catalogue.png",
  },
};

export function productImage(product: Product, colour: Colour) {
  const supplied = suppliedProductImages[product.id]?.[colour.file];
  if (supplied) return `/products/${supplied}`;
  if (product.id === "terry") {
    return `/products/starkvibe/french-terry-240-gsm/${colour.file}-detail-v3-reference-logo.webp`;
  }
  return `/products/starkvibe/catalogue-detail/220-gsm-oversized-tee/${colour.file}-detail-reference-logo.webp`;
}
const swatchOrder = [
  "#000000",
  "#1b0d00",
  "#541501",
  "#8f292b",
  "#890d0f",
  "#303030",
  "#020629",
  "#000b27",
  "#336000",
  "#7ca83d",
  "#baffd1",
  "#e6c173",
  "#b8943d",
  "#d5aa59",
  "#fffded",
  "#ffffff",
  "#bf4b76",
  "#c382e6",
  "#ff6800",
];
const allColours = products.flatMap((p) => p.colours);
export const swatches = swatchOrder.map((hex) =>
  allColours.find((c) => c.hex === hex)!,
);
export const filters = [
  ["all", "All"],
  ["tees", "T-shirts"],
  ["polo", "Polo"],
  ["kids", "Kids"],
  ["fleece", "Fleece"],
];
