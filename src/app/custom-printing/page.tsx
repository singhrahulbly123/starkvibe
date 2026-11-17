import { CustomPrintingPage } from "@/components/custom-printing-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Printing for Every Occasion — StarkVibe",
  description:
    "Plan custom printed T-shirts, hoodies and polos for birthdays, office teams, anniversaries, events and personalised gifts with StarkVibe. Start your enquiry.",
  path: "/custom-printing",
  image: "/heroslider/Custom%20Printing%20for%20Every%20Occasion.png",
});

export default function CustomPrintingRoute() {
  return <CustomPrintingPage page="overview" />;
}
