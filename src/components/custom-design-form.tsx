"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ThankYouModal } from "./thank-you-modal";

export function CustomDesignForm({
  pageLabel,
  previewImage,
}: {
  pageLabel: string;
  previewImage: string;
}) {
  const defaultOrderType = /bulk|office|team/i.test(pageLabel) ? "bulk" : "single";
  const [orderType, setOrderType] = useState<"single" | "bulk">(defaultOrderType);
  const isBulk = orderType === "bulk";
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(isBulk ? "10" : "1");
  const [sizeBreakdown, setSizeBreakdown] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [thankYou, setThankYou] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = [
      `Hi StarkVibe, I want a ${orderType} custom print order.`,
      `Order type: ${isBulk ? "Bulk order" : "Single order"}`,
      `Name: ${name}`,
      ...(isBulk ? [`Company/team: ${teamName}`] : []),
      `WhatsApp: ${phone}`,
      `Quantity: ${quantity}`,
      `Size breakdown: ${sizeBreakdown}`,
      `Artwork/photo: ${file?.name || "Not attached yet"}`,
    ].join("\n");
    const emailResponse = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: `${isBulk ? "Bulk order" : "Custom print"} enquiry from ${name}`, message: text }),
    });
    if (emailResponse.ok) setThankYou(true);
    else setMessage("WhatsApp enquiry is ready. Email delivery needs to be checked by the team.");
    const contact = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "917060421033";
    if (contact) {
      window.open(
        `https://wa.me/${contact}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setMessage("Your details are ready in WhatsApp. Please attach the selected image there as well.");
    } else {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "starkvibe-custom-print-enquiry.txt";
      link.click();
      URL.revokeObjectURL(url);
      setMessage("Your enquiry was downloaded. Keep the selected image ready to share with the enquiry.");
    }
  }

  return (
    <>
    <div className="grid gap-8 bg-paper p-6 text-ink lg:grid-cols-[.9fr_1.1fr] lg:p-10">
      <div>
        <p className="mb-3 text-[12px] font-bold tracking-[.18em] text-olive uppercase">
          Live design preview
        </p>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e2dfd6]">
          <Image
            src={previewImage}
            alt="Custom print product preview"
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/10 p-5 text-center">
            {preview && (
              <img
                src={preview}
                alt="Uploaded artwork preview"
                className="max-h-32 max-w-[65%] rounded-sm object-contain mix-blend-multiply"
              />
            )}
            <span className="bg-paper/80 px-3 py-1 font-display text-2xl font-black uppercase backdrop-blur-sm">
              {name || "Your name here"}
            </span>
          </div>
        </div>
      </div>

      <form className="flex flex-col gap-5" onSubmit={submit}>
        <div>
          <p className="mb-2 text-[12px] font-bold tracking-[.18em] text-olive uppercase">{isBulk ? "Bulk order enquiry" : "Send a custom print enquiry"}</p>
          <h3 className="font-display text-4xl leading-none font-black uppercase">{isBulk ? "Plan your team order." : "Tell us what to print."}</h3>
        </div>
        <label className="text-sm font-semibold">
          Order type
          <select
            value={orderType}
            onChange={(event) => {
              const nextType = event.target.value as "single" | "bulk";
              setOrderType(nextType);
              setQuantity(nextType === "bulk" ? "10" : "1");
            }}
            className="mt-2 h-13 w-full border border-ink bg-transparent px-3.5 font-normal outline-none focus:ring-2 focus:ring-olive"
          >
            <option value="single">Single order</option>
            <option value="bulk">Bulk order</option>
          </select>
        </label>
        {isBulk && (
          <label className="text-sm font-semibold">
            Company or team name
            <input
              required
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              placeholder="Your company, office or team"
              className="mt-2 h-13 w-full border border-ink bg-transparent px-3.5 font-normal outline-none focus:ring-2 focus:ring-olive"
            />
          </label>
        )}
        <label className="text-sm font-semibold">
          Your name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name or the name to print"
            className="mt-2 h-13 w-full border border-ink bg-transparent px-3.5 font-normal outline-none focus:ring-2 focus:ring-olive"
          />
        </label>
        <label className="text-sm font-semibold">
          WhatsApp number
          <input
            required
            type="tel"
            pattern="[+0-9 ()-]{8,20}"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+91 98765 43210"
            className="mt-2 h-13 w-full border border-ink bg-transparent px-3.5 font-normal outline-none focus:ring-2 focus:ring-olive"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Quantity
            <input
              required
              min={isBulk ? "10" : "1"}
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="mt-2 h-13 w-full border border-ink bg-transparent px-3.5 font-normal outline-none focus:ring-2 focus:ring-olive"
            />
          </label>
          <label className="text-sm font-semibold">
            Size breakdown
            <input
              required
              value={sizeBreakdown}
              onChange={(event) => setSizeBreakdown(event.target.value)}
              placeholder={isBulk ? "S-5, M-10, L-8" : "Example: M or 1-M"}
              className="mt-2 h-13 w-full border border-ink bg-transparent px-3.5 font-normal outline-none focus:ring-2 focus:ring-olive"
            />
          </label>
          <label className="text-sm font-semibold">
            Upload artwork or photo
            <input
              required
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="mt-2 block h-13 w-full border border-ink bg-transparent px-2 py-3 text-xs font-normal"
            />
          </label>
        </div>
        <p className="text-xs leading-[1.5] text-[#55544f]">
          Upload a clear photo, logo, name design or reference artwork. The preview is for planning; final print size and placement will be confirmed before production.
        </p>
        <button type="submit" className="h-14 bg-ink font-bold text-paper transition-colors hover:bg-olive">
          Send custom print enquiry
        </button>
        <p role="status" className="min-h-5 text-sm text-[#55544f]">{message}</p>
      </form>
    </div>
    <ThankYouModal open={thankYou} onClose={() => setThankYou(false)} />
    </>
  );
}
