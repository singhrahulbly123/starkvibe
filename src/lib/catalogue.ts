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
      colour("Maroon", "#8f292b", "maroon"),
      colour("Navy", "#020629", "navy"),
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
      colour("Beige", "#b8943d", "beige"),
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
      colour("Maroon", "#890d0f", "maroon"),
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
      colour("Beige", "#d5aa59", "beige"),
    ],
  },
];
const suppliedProductImages: Record<string, Record<string, string>> = {
  oversized: {
    black: "Oversized220GSMTee/Starkvibe Oversized T-Shirt Advertisement.png",
    brown: "Oversized220GSMTee/Starkvibe Oversized T-Shirt Editorial Ad.png",
    "avocado-green": "Oversized220GSMTee/Starkvibe Avocado Oversized T-Shirt.png",
    beige: "Oversized220GSMTee/Starkvibe Oversized T-Shirt Editorial Poster.png",
    white: "Oversized220GSMTee/Starkvibe Oversized T-Shirt Poster.png",
  },
  terry: {
    black: "Oversized240GSMFrenchTerry/Starkvibe Oversized Tee Editorial Ad.png",
    "smokey-grey": "Oversized240GSMFrenchTerry/Starkvibe Oversized T-Shirt Lookbook.png",
    beige: "Oversized240GSMFrenchTerry/Starkvibe Oversized Beige T-Shirt Poster.png",
    white: "Oversized240GSMFrenchTerry/Starkvibe Oversized T-Shirt Campaign.png",
  },
  regular: {
    black: "RegularFit180GSM/Starkvibe Men’s Black T-Shirt Promo.png",
    "sea-green": "RegularFit180GSM/Mint T-Shirt Editorial Advertisement.png",
    maroon: "RegularFit180GSM/Starkvibe Maroon T-Shirt Showcase.png",
    navy: "RegularFit180GSM/Starkvibe Navy T-Shirt Feature Poster.png",
    white: "RegularFit180GSM/Starkvibe Men’s T-Shirt Editorial Poster.png",
  },
  polo: {
    black: "Polo220GSMMattyTee/StarkVibe Black Polo Advertisement.png",
    white: "Polo220GSMMattyTee/StarkVibe Premium White Polo Poster.png",
  },
  kids: {
    black: "180GSMKidsCottonT-Shirt/Starkvibe Kids T-Shirt Poster.png",
    white: "180GSMKidsCottonT-Shirt/Starkvibe Kids Cotton T-Shirt Ad.png",
    pink: "180GSMKidsCottonT-Shirt/Pink Starkvibe Kids T-Shirt Poster.png",
    "sea-green": "180GSMKidsCottonT-Shirt/Starkvibe Kids T-Shirt Campaign.png",
    orange: "180GSMKidsCottonT-Shirt/Starkvibe Kids’ Orange T-Shirt Ad.png",
  },
  sweatshirt: {
    black: "350GSMFleeceSweatshirt/Starkvibe Men’s Sweatshirt Showcase.png",
    "navy-blue": "350GSMFleeceSweatshirt/Starkvibe Premium Navy Sweatshirt Ad.png",
    "off-white": "350GSMFleeceSweatshirt/Starkvibe Men’s Sweatshirt Editorial Ad.png",
    maroon: "350GSMFleeceSweatshirt/Starkvibe Maroon Sweatshirt Showcase.png",
    lavender: "350GSMFleeceSweatshirt/Lavender Sweatshirt Premium Feature Showcase.png",
  },
  hoodie: {
    black: "350GSMFleeceHoodie/Starkvibe Men’s Hoodie Feature Poster.png",
    "coffee-brown": "350GSMFleeceHoodie/Starkvibe Coffee-Brown Hoodie Advertisement.png",
    "off-white": "350GSMFleeceHoodie/Starkvibe Premium Cotton Hoodie Advertisement.png",
    "olive-green": "350GSMFleeceHoodie/Starkvibe Premium Olive Hoodie Poster.png",
    beige: "350GSMFleeceHoodie/Premium Camel Hoodie Catalogue.png",
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
