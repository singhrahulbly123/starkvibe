import { Checkout } from "@/components/checkout";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
  title: "Checkout — StarkVibe",
  description:
    "Review your bag, delivery details and preferred payment method before sending a StarkVibe order request for confirmation. Shipping is confirmed separately.",
  path: "/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <Checkout />;
}
