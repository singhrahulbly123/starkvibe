import { DesignEditor } from "@/components/design-editor";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Create Your Own Custom Print — StarkVibe",
  description: "Design your own custom printed t-shirt or hoodie with text, artwork, colours and front or back placement.",
  path: "/design-your-own",
});

export default function DesignYourOwnPage() {
  return <DesignEditor />;
}
