import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Returns Policy — StarkVibe", description: "StarkVibe returns, exchange and custom print policy." };

export default function ReturnsPolicyPage() {
  return <LegalPage title="Returns policy." intro="We want you to receive the right product and size. Please review the order details carefully before confirmation, especially for custom printing." sections={[
    { title: "Standard products", body: "If a standard product arrives damaged, defective or materially different from the confirmed order, contact us with your order details and clear photos as soon as possible so we can review the issue." },
    { title: "Custom printed products", body: "Personalised, printed and made-to-order products are generally not eligible for return due to a change of mind, incorrect customer-provided artwork or incorrect size selection. Print issues caused by our production error will be reviewed and resolved fairly." },
    { title: "Size and colour", body: "Please use the size guide and confirm colour, quantity and size breakdown before production. Minor colour variation can occur between screens and fabric, so final production references should be confirmed before approval." },
    { title: "How to contact us", body: "Email singhrahulbly123@gmail.com with your order number, issue description and photos. Do not send a parcel back without receiving return instructions from the team." },
  ]} />;
}
