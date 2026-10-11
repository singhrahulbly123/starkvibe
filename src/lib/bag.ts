"use client";
import { useEffect, useState } from "react";
import { products, salePrice, type Product } from "./catalogue";

export type BagItem = {
  key: string;
  product: Product;
  colour: number;
  size: string;
  quantity: number;
};
const bagKey = "starkvibe-bag";
const savedKey = "starkvibe-saved-bag";
const changed = "starkvibe-bag-changed";

function readItems(key: string): BagItem[] {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.flatMap((item) => {
      const product = products.find((p) => p.id === item.product?.id);
      if (
        !product ||
        !Number.isInteger(item.colour) ||
        !product.colours[item.colour] ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        typeof item.size !== "string"
      )
        return [];
      return [
        {
          key: `${product.id}-${item.colour}-${item.size}`,
          product,
          colour: item.colour,
          size: item.size,
          quantity: Math.min(item.quantity, 99),
        },
      ];
    });
  } catch {
    return [];
  }
}
function writeItems(key: string, items: BagItem[]) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new Event(changed));
}
export function addBagItem(item: BagItem) {
  const items = readItems(bagKey);
  const existing = items.find((i) => i.key === item.key);
  writeItems(
    bagKey,
    existing
      ? items.map((i) =>
          i.key === item.key
            ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) }
            : i,
        )
      : [...items, item],
  );
}
export function useBag() {
  const [items, setItems] = useState<BagItem[]>([]);
  const [saved, setSaved] = useState<BagItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const refresh = () => {
      setItems(readItems(bagKey));
      setSaved(readItems(savedKey));
      setReady(true);
    };
    refresh();
    window.addEventListener(changed, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(changed, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  function remove(key: string) {
    writeItems(
      bagKey,
      readItems(bagKey).filter((i) => i.key !== key),
    );
  }
  function changeQuantity(key: string, quantity: number) {
    writeItems(
      bagKey,
      readItems(bagKey).map((i) =>
        i.key === key
          ? { ...i, quantity: Math.max(1, Math.min(99, quantity)) }
          : i,
      ),
    );
  }
  function saveForLater(key: string) {
    const item = readItems(bagKey).find((i) => i.key === key);
    if (!item) return;
    const savedItems = readItems(savedKey);
    const existing = savedItems.find((i) => i.key === key);
    writeItems(
      savedKey,
      existing
        ? savedItems.map((i) =>
            i.key === key
              ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) }
              : i,
          )
        : [...savedItems, item],
    );
    remove(key);
  }
  function restore(key: string) {
    const item = readItems(savedKey).find((i) => i.key === key);
    if (!item) return;
    addBagItem(item);
    writeItems(
      savedKey,
      readItems(savedKey).filter((i) => i.key !== key),
    );
  }
  return {
    items,
    saved,
    ready,
    remove,
    changeQuantity,
    saveForLater,
    restore,
    removeSaved: (key: string) =>
      writeItems(
        savedKey,
        readItems(savedKey).filter((i) => i.key !== key),
      ),
    count: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: items.reduce((sum, i) => sum + i.quantity * salePrice(i.product), 0),
  };
}
export function prepareBagEnquiry(items: BagItem[], note: string) {
  const text = items
    .map(
      (i) =>
        `${i.quantity} × ${i.product.name}, ${i.product.colours[i.colour].name}, size ${i.size}`,
    )
    .join("\n");
  sessionStorage.setItem(
    "starkvibe-enquiry",
    `${text}${note ? `\nOrder note: ${note}` : ""}`,
  );
}
export const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;
