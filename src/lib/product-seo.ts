import type { Product } from "./catalogue";

const productLabels: Record<string, string> = {
  oversized: "oversized cotton t-shirt",
  regular: "regular fit cotton t-shirt",
  terry: "French Terry cotton t-shirt",
  polo: "cotton polo t-shirt",
  kids: "kids cotton t-shirt",
  sweatshirt: "cotton fleece sweatshirt",
  hoodie: "cotton fleece hoodie",
};

const productUses: Record<string, string> = {
  oversized: "streetwear, everyday outfits and custom event printing",
  regular: "daily wear, birthday groups, team clothing and personalised gifts",
  terry: "refined streetwear, casual layering and custom merchandise",
  polo: "office teamwear, events, smart casual outfits and bulk printing",
  kids: "school days, playtime, birthday parties and family events",
  sweatshirt: "cool weather, travel, office events and custom group orders",
  hoodie: "streetwear, winter layering, teamwear and custom printed gifts",
};

export function productSku(product: Product) {
  return `SV-${product.id.toUpperCase()}-${product.gsm}`;
}

export function productMaterial(product: Product) {
  if (product.id === "polo") return "100% cotton Matty fabric";
  if (product.id === "terry") return "100% cotton French Terry";
  if (product.category === "fleece") return "100% cotton fleece";
  return "100% premium cotton";
}

export function productSeoDescription(product: Product) {
  const label = productLabels[product.id] || "cotton clothing";
  return `${product.name} is a ${product.gsm} GSM ${label} made from ${productMaterial(product).toLowerCase()}. ${product.note} Available in ${product.colours.length} colours and sizes for everyday wear, custom printing and ${productUses[product.id] || "special occasions"}.`;
}

export function productSeoKeywords(product: Product) {
  const label = productLabels[product.id] || "cotton clothing";
  return [
    product.name,
    `${product.gsm} GSM ${label}`,
    `${label} India`,
    `custom printed ${label}`,
    "StarkVibe",
  ];
}
