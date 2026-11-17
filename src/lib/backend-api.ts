export type BackendUser = { id: number; name: string; email: string; phone?: string; is_admin?: boolean };
export type BackendOrder = {
  id: number; order_number: string; customer: { name: string; email: string; phone: string; address?: string };
  items: Array<{ name: string; colour: string; size: string; quantity: number; unit_price: number }>;
  subtotal: string; shipping_charge?: string; coupon_code?: string; discount_amount?: string; shipping_method: string; payment_method: string; status: string; created_at: string;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/api";
export const AUTH_TOKEN_KEY = "starkvibe-api-token";

export async function backendFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || "Something went wrong. Please try again.");
  return body as T;
}

export async function login(email: string, password: string) {
  return backendFetch<{ token: string; user: BackendUser }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function register(payload: { name: string; email: string; phone: string; password: string }) {
  return backendFetch<{ token: string; user: BackendUser }>("/auth/register", { method: "POST", body: JSON.stringify(payload) });
}

export function getMe() { return backendFetch<{ user: BackendUser }>("/auth/me"); }
export function getOrders() { return backendFetch<{ orders: BackendOrder[] }>("/account/orders"); }
export function cancelOrder(id: number) { return backendFetch<{ order: BackendOrder }>(`/account/orders/${id}/cancel`, { method: "POST" }); }
export function submitReview(payload: { product_slug: string; product_name: string; name: string; email?: string; rating: number; review: string }) {
  return backendFetch<{ message: string }>("/reviews", { method: "POST", body: JSON.stringify(payload) });
}
export function validateCoupon(code: string, subtotal: number) {
  return backendFetch<{ code: string; discount: number; discount_percentage: number | null }>("/coupons/validate", { method: "POST", body: JSON.stringify({ code, subtotal }) });
}
export function getAdminSummary() { return backendFetch<{ orders: number; pending: number; revenue: number }>("/admin/summary"); }
export function getAdminOrders() { return backendFetch<{ orders: BackendOrder[] }>("/admin/orders"); }
export function updateAdminOrder(id: number, status: string) { return backendFetch<{ order: BackendOrder }>(`/admin/orders/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }); }

export function saveAuth(token: string, user: BackendUser): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem("starkvibe-user-email", user.email);
}

export function clearAuth(): void { localStorage.removeItem(AUTH_TOKEN_KEY); localStorage.removeItem("starkvibe-user-email"); }
