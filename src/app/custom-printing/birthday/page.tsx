import { CustomPrintingPage } from "@/components/custom-printing-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Birthday T-Shirts & Hoodies — StarkVibe",
  description:
    "Create custom birthday t-shirts, hoodies and group outfits for friends, family and party celebrations.",
  path: "/custom-printing/birthday",
});

export default function BirthdayPrintingRoute() {
  return <CustomPrintingPage page="birthday" />;
}
