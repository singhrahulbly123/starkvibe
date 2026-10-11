import type { Product } from "./catalogue";

export const weightOptions = [0, 180, 220, 240, 350];
export const shopCategories = [
  { value: "all", label: "All pieces" },
  { value: "tees", label: "T-shirts" },
  { value: "polo", label: "Polo" },
  { value: "kids", label: "Kids" },
  { value: "fleece", label: "Fleece" },
];
export const shopColours = [
  { name: "Black", hex: "#000000", files: ["black"] },
  { name: "White", hex: "#ffffff", files: ["white", "off-white"] },
  { name: "Navy", hex: "#020629", files: ["navy", "navy-blue"] },
  { name: "Maroon", hex: "#8f292b", files: ["maroon"] },
  {
    name: "Green",
    hex: "#336000",
    files: ["avocado-green", "olive-green", "sea-green"],
  },
  { name: "Beige", hex: "#e6c173", files: ["beige"] },
  { name: "Brown", hex: "#541501", files: ["brown", "coffee-brown"] },
  { name: "Grey", hex: "#303030", files: ["smokey-grey"] },
  { name: "Pink", hex: "#bf4b76", files: ["pink"] },
  { name: "Lavender", hex: "#c382e6", files: ["lavender"] },
  { name: "Orange", hex: "#ff6800", files: ["orange"] },
];
export const priceOptions = [
  { value: "any", label: "Any price" },
  { value: "under200", label: "Up to ₹200" },
  { value: "200to300", label: "₹201 – ₹300" },
  { value: "over300", label: "Above ₹300" },
];
export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "priceAsc", label: "Price ↑" },
  { value: "priceDesc", label: "Price ↓" },
  { value: "lightest", label: "Lightest" },
  { value: "heaviest", label: "Heaviest" },
];
export type ShopFilters = {
  weight: number;
  category: string;
  colour: string;
  price: string;
  sort: string;
  savedOnly: boolean;
};
export const defaultShopFilters: ShopFilters = {
  weight: 0,
  category: "all",
  colour: "",
  price: "any",
  sort: "featured",
  savedOnly: false,
};

export function matchesFilters(
  product: Product,
  filters: ShopFilters,
  saved: string[],
) {
  if (filters.weight && product.gsm !== filters.weight) return false;
  if (filters.category !== "all" && product.category !== filters.category)
    return false;
  if (filters.savedOnly && !saved.includes(product.id)) return false;
  const colour = shopColours.find((c) => c.name === filters.colour);
  if (colour && !product.colours.some((c) => colour.files.includes(c.file)))
    return false;
  if (filters.price === "under200" && product.price > 200) return false;
  if (
    filters.price === "200to300" &&
    (product.price <= 200 || product.price > 300)
  )
    return false;
  if (filters.price === "over300" && product.price <= 300) return false;
  return true;
}
export function sortProducts(products: Product[], sort: string) {
  return [...products].sort((a, b) => {
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    if (sort === "lightest") return a.gsm - b.gsm;
    if (sort === "heaviest") return b.gsm - a.gsm;
    return 0;
  });
}
