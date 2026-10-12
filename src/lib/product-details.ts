import { type Colour, type Product, productImage } from "./catalogue";

export function productFit(product: Product) {
  if (product.id === "oversized" || product.id === "terry") return "Oversized";
  if (product.id === "regular" || product.id === "kids") return "Regular";
  return "Comfort";
}
export function detailImage(product: Product, colour: Colour) {
  const folders: Record<string, string> = {
    oversized: "220-gsm-oversized-tee",
    regular: "180-gsm-regular-tee",
    polo: "220-gsm-polo",
    kids: "180-gsm-kids-regular-tee",
    sweatshirt: "350-gsm-sweatshirt",
    hoodie: "350-gsm-hoodie",
  };
  if (product.id === "terry")
    return `/products/starkvibe/french-terry-240-gsm/${colour.file}-detail-v3.webp`;
  const suffix = product.category === "fleece" ? "polo-style-v3" : "detail";
  if (product.id === "regular" && colour.file === "black")
    return "/products/starkvibe/catalogue-detail/180-gsm-regular-tee/black-starkvibe-print.webp";
  return `/products/starkvibe/catalogue-detail/${folders[product.id]}/${colour.file}-${suffix}.webp`;
}

const titleImage: Record<string, string> = {
  oversized:
    "/products/starkvibe/catalogue-detail/240-gsm-oversized-tee/starkvibe-oversized-poster.png",
  regular:
    "/products/RegularFit180GSM/Starkvibe Men’s T-Shirt Editorial Poster.png",
  polo: "/products/Polo220GSMMatty/StarkVibe Premium White Polo Poster.png",
  kids: "/products/180GSMKidsCottonT-Shirt/Starkvibe Kids T-Shirt Poster.png",
  sweatshirt:
    "/products/350GSMSweatshirt/Starkvibe Maroon Sweatshirt Showcase.png",
  hoodie:
    "/products/350GSMHoodie/Starkvibe Premium Cotton Hoodie Advertisement.png",
};

export function galleryImage(product: Product, colour: Colour, view: string) {
  if (view === "Front") return productImage(product, colour);
  if (view === "Detail" && titleImage[product.id]) {
    return titleImage[product.id];
  }
  return detailImage(product, colour);
}
export const adultSizes = ["S", "M", "L", "XL", "XXL"];
export const kidsSizes = [
  "2–4 years",
  "4–6 years",
  "6–8 years",
  "8–10 years",
  "10–12 years",
];
export function sizesFor(product: Product) {
  return product.id === "kids" ? kidsSizes : adultSizes;
}

export type SizeMeasurement = {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
  sleeve: string;
};

const regularAdultMeasurements = [
  [38, 27, 16, 8],
  [40, 28, 17, 8.5],
  [42, 29, 18, 9],
  [44, 30, 19, 9.5],
  [46, 31, 20, 10],
];
const oversizedAdultMeasurements = [
  [40, 28, 17, 8.5],
  [42, 29, 18, 9],
  [44, 30, 19, 9.5],
  [46, 31, 20, 10],
  [48, 32, 21, 10.5],
];
const fleeceMeasurements = [
  [40, 27, 17, 23.5],
  [42, 28, 18, 24],
  [44, 29, 19, 24.5],
  [46, 30, 20, 25],
  [48, 31, 21, 25.5],
];
const kidsMeasurements = [
  [24, 17, 10, 5.5],
  [26, 18, 11, 6],
  [28, 19, 12, 6.5],
  [30, 20, 13, 7],
  [32, 21, 14, 7.5],
];

export function sizeGuideFor(product: Product): SizeMeasurement[] {
  const measurements = product.id === "kids"
    ? kidsMeasurements
    : product.category === "fleece"
      ? fleeceMeasurements
      : product.id === "oversized" || product.id === "terry"
        ? oversizedAdultMeasurements
        : regularAdultMeasurements;

  return sizesFor(product).map((size, index) => {
    const [chest, length, shoulder, sleeve] = measurements[index];
    return {
      size,
      chest: `${chest}`,
      length: `${length}`,
      shoulder: `${shoulder}`,
      sleeve: `${sleeve}`,
    };
  });
}
