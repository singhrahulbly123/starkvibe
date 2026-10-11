import type { Metadata } from "next";
import { CustomPrintingPage } from "@/components/custom-printing-page";

export const metadata: Metadata = {
  title: "Custom Anniversary T-Shirts & Gifts — StarkVibe",
  description:
    "Celebrate anniversaries with personalised cotton t-shirts, hoodies and custom printed gifts for couples and families.",
};

export default function AnniversaryPrintingRoute() {
  return <CustomPrintingPage page="anniversary" />;
}
