import { type Colour, type Product, productImage } from "./catalogue";

export function productFit(product: Product) {
  return product.fit || "Regular fit";
}

export function galleryImage(product: Product, colour: Colour, view: string) {
  if (view.startsWith("Gallery ")) {
    const index = Number(view.replace("Gallery ", "")) - 1;
    if (colour.gallery?.length) return colour.gallery[index] ?? colour.image ?? productImage(product, colour);
    if (index === 0 && colour.image) return colour.image;
    if (product.gallery?.[index]) return product.gallery[index];
  }
  return productImage(product, colour);
}

export function galleryImages(product: Product, colour: Colour) {
  const images = colour.gallery?.length ? colour.gallery : [colour.image, ...(product.gallery ?? [])];
  return [...new Set(images.filter((image): image is string => Boolean(image)))];
}

export const adultSizes = ["S", "M", "L", "XL"];
export const kidsSizes = ["5–6 years", "7–8 years", "9–10 years", "11–12 years", "13–14 years"];

export function sizesFor(product: Product) {
  return product.sizes?.length ? product.sizes : product.id === "kids" ? kidsSizes : adultSizes;
}

export type SizeMeasurement = {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
  sleeve: string;
};

const regularMeasurements = [
  [38, 26.25, 17, 7.65],
  [40, 27.25, 17.5, 8.25],
  [42, 28.25, 18, 8.75],
  [44, 29.25, 18.5, 9.25],
];
const oversizedMeasurements = [
  [42, 27.25, 20.5, 8.75],
  [44, 28.25, 21, 9.15],
  [46, 29.25, 21.5, 9.75],
  [48, 30.25, 22, 10.15],
];
const poloMeasurements = [
  [38, 25.5, 16, 8.5],
  [40, 26.5, 16.5, 9],
  [42, 27.5, 17, 9.5],
  [44, 28.5, 17.5, 10],
];
const fleeceMeasurements = [
  [40, 27, 18, 24],
  [42, 28, 19, 25],
  [44, 29, 20, 26],
  [46, 30, 21, 26.5],
];
const kidsMeasurements = [
  [26, 17, 10.5, 5.5],
  [28, 18.5, 11.5, 6],
  [30, 20, 12.5, 6.5],
  [32, 21.5, 13.5, 7],
  [34, 23, 14.5, 7.5],
];

export function sizeGuideFor(product: Product): SizeMeasurement[] {
  if (product.size_chart?.length) return product.size_chart;

  const measurements = product.id === "kids"
    ? kidsMeasurements
    : product.id === "polo"
      ? poloMeasurements
      : product.category === "fleece"
        ? fleeceMeasurements
        : product.id === "oversized" || product.id === "terry"
          ? oversizedMeasurements
          : regularMeasurements;

  return sizesFor(product).flatMap((size, index) => {
    const row = measurements[index];
    if (!row) return [];
    const [chest, length, shoulder, sleeve] = row;
    return [{ size, chest: `${chest}`, length: `${length}`, shoulder: `${shoulder}`, sleeve: `${sleeve}` }];
  });
}
