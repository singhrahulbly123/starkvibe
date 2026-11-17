import { CustomPrintingPage } from "@/components/custom-printing-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Anniversary T-Shirts & Gifts — StarkVibe",
  description:
    "Celebrate anniversaries with personalised cotton T-shirts, hoodies and custom printed gifts for couples, families and meaningful shared moments. Plan together.",
  path: "/custom-printing/anniversary",
});

export default function AnniversaryPrintingRoute() {
  return <CustomPrintingPage page="anniversary" />;
}
