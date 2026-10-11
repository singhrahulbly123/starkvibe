"use client";

export function ThankYouModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-5" role="dialog" aria-modal="true" aria-labelledby="thank-you-title">
      <div className="w-full max-w-md bg-paper p-8 text-center text-ink shadow-2xl">
        <p className="mb-3 text-xs font-bold tracking-[.18em] text-olive uppercase">Enquiry received</p>
        <h2 id="thank-you-title" className="font-display text-5xl leading-none font-black uppercase">Thank you.</h2>
        <p className="mt-4 text-sm leading-6 text-[#55544f]">Your details have been sent to our team. We will contact you shortly with the next steps and quotation.</p>
        <button onClick={onClose} className="mt-7 bg-ink px-8 py-3 text-sm font-bold text-paper">Close</button>
      </div>
    </div>
  );
}
