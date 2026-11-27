import type { Product } from "./catalogue";
import { productMetaDescription } from "./seo";

export function productSku(product: Product, colour?: string, size?: string) {
  return product.variants?.find((variant) => variant.colour === colour && variant.size === size)?.sku;
}

export function productMaterial(product: Product) {
  return product.material || "";
}

export function productSeoDescription(product: Product) {
  return productMetaDescription(product);
}

export function productSeoKeywords(product: Product) {
  return [product.name, `${product.gsm} GSM`, productMaterial(product), "StarkVibe"].filter(Boolean);
}
