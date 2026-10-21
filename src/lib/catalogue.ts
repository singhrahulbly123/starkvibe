export type Colour = { name: string; hex: string; file: string; image?: string };
export type Product = {
  id: string;
  name: string;
  gsm: number;
  price: number;
  category: string;
  note: string;
  long_description?: string;
  material?: string;
  fit?: string;
  finish?: string;
  construction?: string;
  washing?: string;
  best_for?: string;
  care_instructions?: string;
  shipping_info?: string;
  benefits?: string[];
  canonical_url?: string;
  labels?: string[];
  variants?: ProductVariant[];
  colours: Colour[];
  gallery?: string[];
  sale_price?: number;
};
export type ProductVariant = {
  sku: string;
  colour?: string;
  size?: string;
  price?: string | number;
  stock?: string | number;
  image?: string;
};
const richTextTags = new Set(["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h2", "h3", "blockquote"]);
export function sanitizeRichText(value: string) {
  return value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?([a-z0-9]+)(?:\s[^>]*)?>/gi, (tag, name: string) => {
      const lower = name.toLowerCase();
      if (!richTextTags.has(lower)) return "";
      return tag.startsWith("</") ? `</${lower}>` : `<${lower}>`;
    });
}
export function plainRichText(value: string) {
  return sanitizeRichText(value).replace(/<[^>]+>/g, "");
}
export function productSlug(product: Pick<Product, "name">) {
  return product.name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function salePrice(product: Product) {
  return product.sale_price ?? product.price;
}

export function mrpPrice(product: Pick<Product, "id">) {
  const prices: Record<string, number> = {
    oversized: 1350,
    regular: 1350,
    terry: 1750,
    polo: 1450,
    kids: 1250,
    sweatshirt: 3230,
    hoodie: 3230,
  };
  return prices[product.id];
}

export function prioritizeFleeceProducts<T extends Pick<Product, "id">>(products: T[]) {
  const priority: Record<string, number> = { sweatshirt: 0, hoodie: 1 };
  return [...products].sort((a, b) => (priority[a.id] ?? 2) - (priority[b.id] ?? 2));
}

export function productFromApi(value: {
  slug: string;
  name: string;
  gsm: number;
  price: string | number;
  sale_price: string | number;
  category: string;
  note: string;
  colours: Colour[];
  gallery?: string[];
  long_description?: string;
  material?: string;
  fit?: string;
  finish?: string;
  construction?: string;
  washing?: string;
  best_for?: string;
  care_instructions?: string;
  shipping_info?: string;
  benefits?: string[];
  canonical_url?: string;
  labels?: string[];
  variants?: ProductVariant[];
}): Product {
  const legacyIds: Record<string, string> = {
    "oversized-220-gsm-tee": "oversized",
    "regular-fit-180-gsm-tee": "regular",
    "oversized-240-gsm-french-terry-tee": "terry",
    "polo-220-gsm-matty-tee": "polo",
    "kids-regular-180-gsm-tee": "kids",
    "350-gsm-fleece-sweatshirt": "sweatshirt",
    "350-gsm-fleece-hoodie": "hoodie",
  };
  return {
    id: legacyIds[value.slug] || value.slug,
    name: value.name,
    gsm: value.gsm,
    price: Number(value.price),
    sale_price: Number(value.sale_price),
    category: value.category,
    note: value.note,
    colours: value.colours,
    gallery: value.gallery,
    long_description: value.long_description,
    material: value.material,
    fit: value.fit,
    finish: value.finish,
    construction: value.construction,
    washing: value.washing,
    best_for: value.best_for,
    care_instructions: value.care_instructions,
    shipping_info: value.shipping_info,
    benefits: value.benefits,
    canonical_url: value.canonical_url,
    labels: value.labels,
    variants: value.variants,
  };
}
export const products: Product[] = [];
export function getProductBySlug(_slug: string) {
  return undefined;
}

export function productImage(product: Product, colour: Colour) {
  return colour.image || product.gallery?.[0] || "";
}

const collectionImagePrefix: Record<string, string> = {
  oversized: "220-gsm-oversized-tee",
  regular: "180-gsm-regular-tee",
  terry: "240-gsm-oversized-tee",
  polo: "220-gsm-polo",
  kids: "180-gsm-kids-regular-tee",
  sweatshirt: "350-gsm-sweatshirt",
  hoodie: "350-gsm-hoodie",
};

const collectionVariantFiles: Record<string, Record<string, string>> = {
  oversized: { "avocado green": "avocado-green", beige: "beige", brown: "brown", black: "black", white: "white" },
  regular: { black: "black", maroon: "maroon", navy: "navy", "sea green": "sea-green", white: "white" },
  terry: { beige: "beige", black: "black", "smokey grey": "smokey-grey", white: "white" },
  polo: { black: "black", white: "white" },
  kids: { black: "black", orange: "orange", pink: "pink", "sea green": "sea-green", white: "white" },
  sweatshirt: { black: "black", lavender: "lavender", maroon: "maroon", "navy blue": "navy-blue", "off white": "off-white" },
  hoodie: { beige: "beige", "dark beige": "beige", black: "black", "coffee brown": "coffee-brown", "off white": "off-white", "olive green": "olive-green" },
};

const defaultCollectionColours: Record<string, string> = {
  oversized: "avocado green",
  regular: "sea green",
  terry: "beige",
  polo: "white",
  kids: "orange",
  sweatshirt: "off white",
  hoodie: "olive green",
};

function normalizeColourName(name: string) {
  return name.trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");
}

export function collectionDefaultColourIndex(product: Product, fallbackIndex = 0) {
  const preferred = defaultCollectionColours[product.id];
  const preferredIndex = preferred
    ? product.colours.findIndex((colour) => normalizeColourName(colour.name) === preferred)
    : -1;
  return preferredIndex >= 0 ? preferredIndex : fallbackIndex % product.colours.length;
}

export function collectionProductImage(product: Product, colour: Colour) {
  const prefix = collectionImagePrefix[product.id];
  const normalizedName = normalizeColourName(colour.name);
  const colourFile = collectionVariantFiles[product.id]?.[normalizedName];
  if (prefix && colourFile) {
    return `/products/starkvibe-custom-apparel/${prefix}-${colourFile}.webp`;
  }
  return productImage(product, colour);
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
export const filters = [
  ["all", "All"],
  ["tees", "T-shirts"],
  ["polo", "Polo"],
  ["kids", "Kids"],
  ["fleece", "Fleece"],
];
