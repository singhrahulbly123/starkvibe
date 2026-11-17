export const CUSTOM_PRINT_DISCOUNT_PERCENT = 10;
export const CUSTOM_PRINT_AREA = "10 × 10";

export const customPrintOptions = {
  front: { label: "Front design + print", regularPrice: 300 },
  both: { label: "Front + back design and print", regularPrice: 500 },
} as const;

export function customPrintDiscountedPrice(regularPrice: number) {
  return Math.round(regularPrice * (1 - CUSTOM_PRINT_DISCOUNT_PERCENT / 100));
}
