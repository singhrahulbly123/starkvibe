import type { Product } from "./catalogue";

export function productMetaTitle(product: Product) {
  return `${product.name} | StarkVibe Pure Cotton Clothing`;
}

export function productMetaDescription(product: Product) {
  return `Shop StarkVibe ${product.name} in ${product.gsm} GSM 100% cotton with a comfortable fit, durable finish and colour options for everyday wear or custom printing.`;
}

export function productMetaKeywords(product: Product) {
  return [
    `${product.name} premium cotton clothing`,
    `${product.gsm} GSM cotton ${product.category}`,
    "comfortable cotton fabric",
    "best fit cotton clothing",
    "custom printed cotton clothing",
    "StarkVibe India",
  ];
}

export function categoryMetaTitle(category: string) {
  return `${category} - StarkVibe`;
}

export function categoryMetaDescription(category: string) {
  return `Explore the StarkVibe ${category.toLowerCase()} collection in high-quality 100% cotton clothing. Comfortable, stylish designs for everyday wear, teams and custom printing.`;
}

export function categoryMetaKeywords(category: string) {
  return [
    category,
    "cotton t-shirts",
    "100% cotton clothing",
    "comfortable fabric",
    "best fit everyday wear",
    "custom printing India",
    "StarkVibe",
  ];
}

export function locationMetaTitle(city: string) {
  return `100% Cotton Clothing in ${city} | StarkVibe Online`;
}

export function locationMetaDescription(city: string) {
  return `Shop StarkVibe online in ${city} for premium 100% cotton T-shirts, polos, sweatshirts and hoodies, with custom printing for teams, events and gifting.`;
}

export function locationMetaKeywords(city: string) {
  return [
    `${city} cotton clothing`,
    `cotton T-shirts in ${city}`,
    `${city} custom printed T-shirts`,
    `${city} bulk teamwear`,
    "comfortable cotton fabric",
    "best fit cotton clothing",
    "StarkVibe online",
  ];
}
