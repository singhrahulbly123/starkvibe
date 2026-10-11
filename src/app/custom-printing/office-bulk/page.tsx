import type { Metadata } from "next";
import { CustomPrintingPage } from "@/components/custom-printing-page";

export const metadata: Metadata = {
  title: "Office Teamwear & Bulk Custom Printing — StarkVibe",
  description:
    "Order custom printed t-shirts, polos, sweatshirts and hoodies for employees, office events and bulk team orders.",
};

export default function OfficeBulkPrintingRoute() {
  return <CustomPrintingPage page="office-bulk" />;
}
