import { Storefront } from "@/components/storefront";
import { MyAccountPage } from "@/components/my-account-page";
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

export default function MyAccount() {
  return <><Storefront hideRange><MyAccountPage /></Storefront><SiteFooter /></>;
}
