import type { Metadata } from "next";
import { DesignEditor } from "@/components/design-editor";

export const metadata: Metadata = {
  title: "Create Your Own Custom Print — StarkVibe",
  description: "Design your own custom printed t-shirt or hoodie with text, artwork, colours and front or back placement.",
};

export default function DesignYourOwnPage() {
  return <DesignEditor />;
}
