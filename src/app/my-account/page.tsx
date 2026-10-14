import { Storefront } from "@/components/storefront";
import { MyAccountPage } from "@/components/my-account-page";
import { SiteFooter } from "@/components/site-footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
  title: "My Account — StarkVibe",
  description: "View your StarkVibe profile, order requests and cancellation status.",
  path: "/my-account",
  }),
  robots: { index: false, follow: false },
};

export default function MyAccount() {
  return <><Storefront hideRange><MyAccountPage /></Storefront><SiteFooter /></>;
}
