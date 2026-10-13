import type { Product } from "./catalogue";

export function productMetaTitle(product: Product) {
  return `${product.name} | StarkVibe Pure Cotton Clothing`;
}

export function productMetaDescription(product: Product) {
  return `Shop StarkVibe ${product.name} in ${product.gsm} GSM 100% cotton with a comfortable fit, durable finish and colour options for everyday wear or custom printing.`;
}

export function categoryMetaTitle(category: string) {
  return `${category} - StarkVibe`;
}

export function categoryMetaDescription(category: string) {
  return `Explore the StarkVibe ${category.toLowerCase()} collection in high-quality 100% cotton clothing. Comfortable, stylish designs for everyday wear, teams and custom printing.`;
}

export function locationMetaTitle(city: string) {
  return `100% Cotton Clothing in ${city} | StarkVibe Online`;
}

export function locationMetaDescription(city: string) {
  return `Shop StarkVibe online in ${city} for premium 100% cotton T-shirts, polos, sweatshirts and hoodies, with custom printing for teams, events and gifting.`;
}
