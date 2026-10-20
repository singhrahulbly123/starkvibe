import { type Colour, type Product, productImage } from "./catalogue";

export function productFit(product: Product) {
  return product.fit || "Regular fit";
}

export function galleryImage(product: Product, colour: Colour, view: string) {
  if (view.startsWith("Gallery ")) {
    const index = Number(view.replace("Gallery ", "")) - 1;
    if (product.gallery?.[index]) return product.gallery[index];
  }
  if (view === "Front") return productImage(product, colour);
  return productImage(product, colour);
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
