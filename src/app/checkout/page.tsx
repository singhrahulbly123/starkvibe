import type { Metadata } from "next";
import { Checkout } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout — StarkVibe",
  description:
    "Your bag, delivery details and preferred payment method, all in one place.",
};

export default function CheckoutPage() {
  return <Checkout />;
}
