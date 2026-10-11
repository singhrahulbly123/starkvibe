"use client";
import { useState } from "react";
import type { Product } from "@/lib/catalogue";

export function ProductReviews({ product }: { product: Product }) {
  const [writing, setWriting] = useState(false);
  const [message, setMessage] = useState("");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
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
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const text = `${product.name}\nName: ${data.get("name")}\nRating: ${data.get("rating")}/5\n${data.get("review")}`;
              if (email) {
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Review: ${product.name}`)}&body=${encodeURIComponent(text)}`;
                setMessage(
                  "Your review is ready in your email app. Send it there to share it with the team.",
                );
              } else {
                const url = URL.createObjectURL(
                  new Blob([text], { type: "text/plain" }),
                );
                const link = document.createElement("a");
                link.href = url;
                link.download = "starkvibe-review.txt";
                link.click();
                URL.revokeObjectURL(url);
                setMessage(
                  "Your review has been downloaded. Direct submission will be available once the brand contact is connected.",
                );
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
            <button className="h-14 bg-ink px-8 font-bold text-paper">
              Share your review
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
