"use client";
import { useEffect, useState } from "react";
import { ThankYouModal } from "./thank-you-modal";
import { trackEvent } from "@/lib/analytics";
export function QuoteForm() {
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState("");
  const [thankYou, setThankYou] = useState(false);
  useEffect(() => {
    const pending = sessionStorage.getItem("starkvibe-enquiry");
    if (pending) {
      setNeed(pending);
      sessionStorage.removeItem("starkvibe-enquiry");
    }
    const receive = (event: Event) =>
      setNeed((event as CustomEvent<string>).detail);
    window.addEventListener("starkvibe-enquiry", receive);
    return () => window.removeEventListener("starkvibe-enquiry", receive);
  }, []);
  return (
    <div className="bg-paper p-6 text-ink lg:p-11">
      <h3 className="mb-6 font-display text-4xl leading-none font-black uppercase">
        Request a quote
      </h3>
      <form
        className="flex flex-col gap-[18px]"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const text = `Hi StarkVibe, I'd like a quote.\nName: ${data.get("name")}\nWhatsApp: ${data.get("phone")}\n${need}`;
          trackEvent("custom_print_enquiry", { enquiry_type: "quote", has_brief: Boolean(need.trim()) });
          const emailResponse = await fetch("/api/enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject: `Quote enquiry from ${data.get("name")}`, message: text }),
          });
          if (emailResponse.ok) setThankYou(true);
          const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
            /\D/g,
            "",
          ) || "917060421033";
          if (phone) {
            window.open(
              `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
              "_blank",
              "noopener,noreferrer",
            );
            setMessage(
              "Your enquiry is ready in WhatsApp. Send it there to contact StarkVibe.",
            );
          } else {
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "starkvibe-enquiry.txt";
            link.click();
            URL.revokeObjectURL(url);
            setMessage(
              "Enquiry downloaded. Direct sending will be available once the brand contact is connected.",
            );
          }
        }}
      >
        <div>
          <label
            htmlFor="quote-name"
            className="mb-2 block text-sm font-semibold"
          >
            Your name
          </label>
          <input
            id="quote-name"
            name="name"
            required
            autoComplete="name"
            className="h-[52px] w-full border border-ink bg-transparent px-3.5"
          />
        </div>
        <div>
          <label
            htmlFor="quote-phone"
            className="mb-2 block text-sm font-semibold"
          >
            WhatsApp number
          </label>
          <input
            id="quote-phone"
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            pattern="[+0-9 ()-]{8,20}"
            className="h-[52px] w-full border border-ink bg-transparent px-3.5"
          />
        </div>
        <div>
          <label
            htmlFor="quote-need"
            className="mb-2 block text-sm font-semibold"
          >
            What are you making?
          </label>
          <textarea
            id="quote-need"
            required
            rows={3}
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            className="w-full resize-y border border-ink bg-transparent p-3"
          />
        </div>
        <button
          type="submit"
          className="h-[58px] bg-ink font-bold text-paper transition-colors hover:bg-olive"
        >
          Send enquiry
        </button>
        <p role="status" className="text-sm text-[#55544f]">
          {message ||
            "Tell us your quantity, preferred pieces and branding requirements."}
        </p>
      </form>
      <ThankYouModal open={thankYou} onClose={() => setThankYou(false)} />
    </div>
  );
}
