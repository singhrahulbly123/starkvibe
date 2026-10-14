import { Checkout } from "@/components/checkout";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
  title: "Checkout — StarkVibe",
  description:
    "Your bag, delivery details and preferred payment method, all in one place.",
  path: "/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <Checkout />;
}
