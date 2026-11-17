import { Storefront } from "@/components/storefront";
import { MyAccountApiPage } from "@/components/my-account-api-page";
import { SiteFooter } from "@/components/site-footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
  title: "My Account — StarkVibe",
  description: "View your StarkVibe profile, order requests and cancellation status while keeping your account details available for future shopping. Sign in to continue.",
  path: "/my-account",
  }),
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function MyAccount() {
  return <><Storefront hideRange><MyAccountApiPage /></Storefront><SiteFooter /></>;
}
