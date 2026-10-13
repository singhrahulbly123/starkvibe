export type AnalyticsEvent =
  | "page_view"
  | "view_item"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase_request"
  | "custom_print_enquiry"
  | "search"
  | "ab_test_exposure"
  | "ab_test_cta_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, parameters);
  } else if (window.dataLayer) {
    window.dataLayer.push(["event", event, parameters]);
  }
}
