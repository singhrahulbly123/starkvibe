"use client";
import { useState } from "react";
import type { Product } from "@/lib/catalogue";
import { submitReview } from "@/lib/backend-api";

export function ProductReviews({ product }: { product: Product }) {
  const [writing, setWriting] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  return (
    <section
      id="reviews"
      className="mx-auto grid max-w-[1400px] gap-12 px-5 pt-20 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:px-12 lg:pt-[136px]"
    >
      <div>
        <p className="mb-4 text-[13px] font-bold tracking-[.18em] text-olive uppercase">
          Reviews
        </p>
        <p className="font-display text-[clamp(110px,12vw,170px)] leading-[.8] font-black">
          —
        </p>
        <p className="mt-4 mb-7 text-[15px] text-[#55544f]">
          No published reviews yet
        </p>
        <button
          onClick={() => setWriting(!writing)}
          aria-expanded={writing}
          className="h-14 bg-ink px-8 text-[15px] font-bold text-paper transition-colors hover:bg-olive"
        >
          Write a review
        </button>
      </div>
      <div className="border-t border-ink">
        {writing ? (
          <form
            className="grid gap-4 border-b border-ink py-7"
            onSubmit={async (e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setSubmitting(true);
              setMessage("");
              try {
                await submitReview({
                  product_slug: product.id,
                  product_name: product.name,
                  name: String(data.get("name") || ""),
                  email: String(data.get("email") || "") || undefined,
                  rating: Number(data.get("rating")),
                  review: String(data.get("review") || ""),
                });
                setMessage(
                  "Thank you. Your review has been submitted and will be published after moderation.",
                );
                e.currentTarget.reset();
              } catch {
                setMessage(
                  "We could not submit the review right now. Please try again.",
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <h3 className="text-xl font-bold">How does it feel?</h3>
            <label className="text-sm font-semibold">
              Your name
              <input
                name="name"
                required
                autoComplete="name"
                className="mt-2 h-12 w-full border border-ink bg-transparent px-3"
              />
            </label>
            <label className="text-sm font-semibold">
              Email (optional)
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2 h-12 w-full border border-ink bg-transparent px-3"
              />
            </label>
            <label className="text-sm font-semibold">
              Rating
              <select
                name="rating"
                className="mt-2 h-12 w-full border border-ink bg-transparent px-3"
                defaultValue="5"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} out of 5
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Your review
              <textarea
                name="review"
                required
                rows={4}
                className="mt-2 w-full border border-ink bg-transparent p-3"
              />
            </label>
            <button disabled={submitting} className="h-14 bg-ink px-8 font-bold text-paper disabled:cursor-wait disabled:opacity-60">
              {submitting ? "Submitting…" : "Share your review"}
            </button>
            <p role="status" className="text-sm text-[#55544f]">
              {message}
            </p>
          </form>
        ) : (
          [
            [
              "The fabric",
              "Tell us how the weight feels, from the first wear to your everyday routine.",
            ],
            [
              "The fit",
              "Share your usual size and how this piece sits on you.",
            ],
            [
              "The finish",
              "Let us know what you notice about the softness, stitching and colour.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="border-b border-ink py-7">
              <p className="text-xs tracking-wider text-[#55544f] uppercase">
                What would you like to know?
              </p>
              <h3 className="mt-3.5 mb-2 text-xl font-bold">{title}</h3>
              <p className="max-w-[640px] leading-[1.6] text-[#3f3e3a]">
                {body}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
