"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Package, UserRound } from "lucide-react";

type AccountUser = { name: string; email: string; phone: string };
type AccountOrder = {
  id: string;
  createdAt: string;
  summary: string;
  total: string;
  status: "Order request" | "Cancellation requested";
};

const USER_KEY = "starkvibe-account-user";
const ORDERS_KEY = "starkvibe-account-orders";

export function MyAccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem(USER_KEY) || "null");
      const savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      if (savedUser?.email) {
        setUser(savedUser);
        setForm(savedUser);
      }
      if (Array.isArray(savedOrders)) setOrders(savedOrders);
    } catch {
      // Start with a signed-out account if browser storage is unavailable.
    }
  }, []);

  function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { ...form, name: form.name.trim(), email: form.email.trim() };
    localStorage.setItem(USER_KEY, JSON.stringify(next));
    localStorage.setItem("starkvibe-user-email", next.email);
    setUser(next);
  }

  function cancelOrder(id: string) {
    const next = orders.map((order) =>
      order.id === id ? { ...order, status: "Cancellation requested" as const } : order,
    );
    setOrders(next);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  }

  function signOut() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("starkvibe-user-email");
    setUser(null);
    setForm({ name: "", email: "", phone: "" });
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-[760px] px-5 py-16 lg:py-28">
        <p className="mb-4 text-xs font-bold tracking-[.2em] text-olive uppercase">My account</p>
        <h1 className="font-display text-[clamp(58px,9vw,120px)] leading-[.86] font-black uppercase">Your account.</h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#55544f]">Sign in with your email and phone number to view your profile, order requests and cancellation status.</p>
        <form onSubmit={saveAccount} className="mt-10 border border-ink/20 bg-[#eeece5] p-6 sm:p-8">
          <label className="block text-sm font-bold">Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-14 w-full border border-ink bg-transparent px-4" /></label>
          <label className="mt-5 block text-sm font-bold">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 h-14 w-full border border-ink bg-transparent px-4" /></label>
          <label className="mt-5 block text-sm font-bold">Phone / WhatsApp<input required type="tel" pattern="[+0-9 ()-]{8,20}" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 h-14 w-full border border-ink bg-transparent px-4" /></label>
          <button className="mt-7 h-14 bg-ink px-8 font-bold text-paper">Continue to my account</button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-12 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-8">
        <div><p className="mb-3 text-xs font-bold tracking-[.2em] text-olive uppercase">Welcome back</p><h1 className="font-display text-[clamp(58px,8vw,112px)] leading-[.86] font-black uppercase">My account.</h1></div>
        <button onClick={signOut} className="flex items-center gap-2 border border-ink px-4 py-3 text-sm font-bold"><LogOut size={16} /> Sign out</button>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <section className="border border-ink/20 bg-[#eeece5] p-6 sm:p-8"><div className="flex items-center gap-3"><UserRound className="text-olive" /><h2 className="font-display text-3xl font-black uppercase">Profile</h2></div><dl className="mt-7 space-y-4 text-sm"><div><dt className="text-ink/55">Name</dt><dd className="font-bold">{user.name}</dd></div><div><dt className="text-ink/55">Email</dt><dd className="font-bold break-all">{user.email}</dd></div><div><dt className="text-ink/55">Phone</dt><dd className="font-bold">{user.phone}</dd></div></dl></section>
        <section><div className="flex items-center gap-3"><Package className="text-olive" /><h2 className="font-display text-3xl font-black uppercase">Your orders</h2></div>{orders.length ? <div className="mt-6 space-y-4">{orders.map((order) => <article key={order.id} className="border border-ink/20 bg-[#eeece5] p-5"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs text-ink/55">Order {order.id} · {order.createdAt}</p><p className="mt-2 font-bold">{order.summary}</p></div><p className="font-bold">{order.total}</p></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-4"><span className="text-sm font-bold text-olive">{order.status}</span>{order.status === "Order request" && <button onClick={() => cancelOrder(order.id)} className="border border-ink px-4 py-2 text-xs font-bold">Request cancellation</button>}</div></article>)}</div> : <div className="mt-6 border border-dashed border-ink/30 p-8 text-[#55544f]">No orders yet. <Link href="/shop" className="font-bold text-ink underline">Explore the range</Link></div>}</section>
      </div>
    </main>
  );
}
