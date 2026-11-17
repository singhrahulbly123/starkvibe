import { CustomPrintingPage } from "@/components/custom-printing-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Office Teamwear & Bulk Custom Printing — StarkVibe",
  description:
    "Order custom printed T-shirts, polos, sweatshirts and hoodies for employees, office events and coordinated bulk teamwear from StarkVibe. Plan your order.",
  path: "/custom-printing/office-bulk",
});

export default function OfficeBulkPrintingRoute() {
  return <CustomPrintingPage page="office-bulk" />;
}
