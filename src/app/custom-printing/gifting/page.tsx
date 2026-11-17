import { CustomPrintingPage } from "@/components/custom-printing-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Personalised Custom Printed Gifts — StarkVibe",
  description:
    "Choose personalised cotton T-shirts, polos, sweatshirts and hoodies as custom printed gifts for birthdays, family, friends and special occasions. Shop ideas.",
  path: "/custom-printing/gifting",
});

export default function GiftingPrintingRoute() {
  return <CustomPrintingPage page="gifting" />;
}
