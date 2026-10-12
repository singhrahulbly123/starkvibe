import { Storefront } from "@/components/storefront";
import { MyAccountPage } from "@/components/my-account-page";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "My Account — StarkVibe",
  description: "View your StarkVibe profile, order requests and cancellation status.",
  robots: { index: false, follow: false },
};

export default function MyAccount() {
  return <><Storefront hideRange><MyAccountPage /></Storefront><SiteFooter /></>;
}
