"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Package, UserRound } from "lucide-react";
import { AUTH_TOKEN_KEY, BackendOrder, BackendUser, cancelOrder, clearAuth, getMe, getOrders, login, register, saveAuth } from "@/lib/backend-api";

export function MyAccountApiPage() {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(AUTH_TOKEN_KEY)) { setLoading(false); return; }
    Promise.all([getMe(), getOrders()]).then(([me, result]) => { setUser(me.user); setOrders(result.orders); }).catch(() => clearAuth()).finally(() => setLoading(false));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    try { const result = mode === "login" ? await login(form.email, form.password) : await register(form); saveAuth(result.token, result.user); setUser(result.user); setOrders((await getOrders()).orders); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to continue."); } finally { setLoading(false); }
  }

  async function requestCancellation(id: number) {
    try { const result = await cancelOrder(id); setOrders((current) => current.map((order) => order.id === id ? result.order : order)); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to update this order."); }
  }

  if (loading && !user) return <main className="mx-auto max-w-[1200px] px-5 py-24">Loading your account…</main>;
  if (!user) return <main className="mx-auto max-w-[760px] px-5 py-16 lg:py-28"><p className="mb-4 text-xs font-bold tracking-[.2em] text-olive uppercase">StarkVibe account</p><h1 className="font-display text-[clamp(58px,9vw,120px)] leading-[.86] font-black uppercase">Your account.</h1><p className="mt-7 text-lg leading-relaxed text-[#55544f]">Sign in to see your orders, or create an account during checkout.</p><form onSubmit={submit} className="mt-10 border border-ink/20 bg-[#eeece5] p-6 sm:p-8">{mode === "register" && <><label className="block text-sm font-bold">Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-14 w-full border border-ink bg-transparent px-4" /></label><label className="mt-5 block text-sm font-bold">Phone<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 h-14 w-full border border-ink bg-transparent px-4" /></label></>}<label className="mt-5 block text-sm font-bold">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 h-14 w-full border border-ink bg-transparent px-4" /></label><label className="mt-5 block text-sm font-bold">Password<input required type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-2 h-14 w-full border border-ink bg-transparent px-4" /></label>{error && <p className="mt-4 text-sm font-semibold text-red-800">{error}</p>}<button disabled={loading} className="mt-7 h-14 bg-ink px-8 font-bold text-paper disabled:opacity-60">{loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button><button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="ml-5 text-sm font-bold underline">{mode === "login" ? "Create account" : "I already have an account"}</button></form></main>;

  return <main className="mx-auto max-w-[1200px] px-5 py-12 lg:py-20"><div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-8"><div><p className="mb-3 text-xs font-bold tracking-[.2em] text-olive uppercase">Welcome back</p><h1 className="font-display text-[clamp(58px,8vw,112px)] leading-[.86] font-black uppercase">My account.</h1></div><button onClick={() => { clearAuth(); setUser(null); setOrders([]); }} className="flex items-center gap-2 border border-ink px-4 py-3 text-sm font-bold"><LogOut size={16} /> Sign out</button></div><div className="mt-10 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><section className="border border-ink/20 bg-[#eeece5] p-6 sm:p-8"><div className="flex items-center gap-3"><UserRound className="text-olive" /><h2 className="font-display text-3xl font-black uppercase">Profile</h2></div><dl className="mt-7 space-y-4 text-sm"><div><dt className="text-ink/55">Name</dt><dd className="font-bold">{user.name}</dd></div><div><dt className="text-ink/55">Email</dt><dd className="font-bold break-all">{user.email}</dd></div><div><dt className="text-ink/55">Phone</dt><dd className="font-bold">{user.phone || "—"}</dd></div></dl></section><section><div className="flex items-center gap-3"><Package className="text-olive" /><h2 className="font-display text-3xl font-black uppercase">Your orders</h2></div>{error && <p className="mt-4 text-sm font-semibold text-red-800">{error}</p>}{orders.length ? <div className="mt-6 space-y-4">{orders.map((order) => <article key={order.id} className="border border-ink/20 bg-[#eeece5] p-5"><div className="flex flex-wrap justify-between gap-3"><div><p className="font-bold">{order.order_number}</p><p className="mt-1 text-sm text-[#55544f]">{new Date(order.created_at).toLocaleDateString("en-IN")}</p></div><span className="bg-gold px-3 py-1 text-xs font-bold uppercase">{order.status.replaceAll("_", " ")}</span></div><p className="mt-4 text-sm">{order.items.map((item) => `${item.quantity} × ${item.name} (${item.colour}, ${item.size})`).join(", ")}</p><div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-4"><strong>₹{Number(order.subtotal).toLocaleString("en-IN")}</strong>{!["cancelled", "cancellation_requested", "delivered"].includes(order.status) && <button onClick={() => requestCancellation(order.id)} className="text-sm font-bold underline">Request cancellation</button>}</div></article>)}</div> : <p className="mt-6 border border-ink/20 p-6 text-[#55544f]">No orders yet. <Link href="/shop" className="font-bold underline">Explore the collection.</Link></p>}</section></div></main>;
}
