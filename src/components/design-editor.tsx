"use client";

import { ChangeEvent, PointerEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Download, ImagePlus, Redo2, RotateCcw, Send, Undo2 } from "lucide-react";
import { ThankYouModal } from "./thank-you-modal";

type Side = "front" | "back";
type Garment = "tee" | "polo" | "kids" | "sweatshirt" | "hoodie";
type Layer = {
  id: string;
  type: "text" | "image";
  value: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  colour: string;
  fontSize: number;
};
type DesignState = Record<Side, Layer[]>;
type DragState = { id: string; side: Side; before: DesignState };

const colours = [
  { name: "Black", value: "black", image: "/branding/custom-tee-black.png", backImage: "/branding/custom-tee-black-back.png" },
  { name: "Sea Green", value: "sea-green", image: "/branding/custom-tee-sea-green.png", backImage: "/branding/custom-tee-sea-green-back.png" },
  { name: "Maroon", value: "maroon", image: "/branding/custom-tee-maroon.png", backImage: "/branding/custom-tee-maroon-back.png" },
  { name: "Navy", value: "navy", image: "/branding/custom-tee-navy.png", backImage: "/branding/custom-tee-navy-back.png" },
  { name: "White", value: "white", image: "/branding/custom-tee-white.png", backImage: "/branding/custom-tee-white-back.png" },
];

const garmentImages: Record<Garment, Record<string, string>> = {
  tee: Object.fromEntries(colours.map((item) => [item.value, item.image])),
  polo: {
    black: "/products/starkvibe/catalogue-detail/220-gsm-polo/black-detail.webp",
    white: "/products/starkvibe/catalogue-detail/220-gsm-polo/white-detail.webp",
  },
  kids: {
    black: "/products/starkvibe/catalogue-detail/180-gsm-kids-regular-tee/black-detail.webp",
    "sea-green": "/products/starkvibe/catalogue-detail/180-gsm-kids-regular-tee/sea-green-detail.webp",
    white: "/products/starkvibe/catalogue-detail/180-gsm-kids-regular-tee/white-detail.webp",
  },
  sweatshirt: {
    black: "/products/starkvibe/catalogue-detail/350-gsm-sweatshirt/black-generated-v1.webp",
    maroon: "/products/starkvibe/catalogue-detail/350-gsm-sweatshirt/maroon-generated-v1.webp",
    navy: "/products/starkvibe/catalogue-detail/350-gsm-sweatshirt/navy-blue-generated-v1.webp",
  },
  hoodie: {
    black: "/products/starkvibe/catalogue-detail/350-gsm-hoodie/black-generated-v1.webp",
    maroon: "/products/starkvibe/catalogue-detail/350-gsm-hoodie/coffee-brown-generated-v1.webp",
    navy: "/products/starkvibe/catalogue-detail/350-gsm-hoodie/off-white-generated-v1.webp",
    white: "/products/starkvibe/catalogue-detail/350-gsm-hoodie/beige-generated-v1.webp",
  },
};

const garmentOptions: { value: Garment; label: string; note: string }[] = [
  { value: "tee", label: "T-shirt", note: "180–240 GSM" },
  { value: "polo", label: "Polo", note: "220 GSM Matty" },
  { value: "kids", label: "Kids", note: "Kids regular fit" },
  { value: "sweatshirt", label: "Sweatshirt", note: "350 GSM fleece" },
  { value: "hoodie", label: "Hoodie", note: "350 GSM fleece" },
];

const garmentBackImages: Record<Garment, Record<string, string>> = {
  tee: Object.fromEntries(colours.map((item) => [item.value, item.backImage])),
  polo: {
    black: "/products/starkvibe/design-editor/polo-black-back-generated.png",
    white: "/products/starkvibe/design-editor/polo-black-back-generated.png",
  },
  kids: {
    black: "/products/starkvibe/design-editor/kids-black-back-generated.png",
    "sea-green": "/products/starkvibe/design-editor/kids-black-back-generated.png",
    white: "/products/starkvibe/design-editor/kids-black-back-generated.png",
  },
  sweatshirt: {
    black: "/products/starkvibe/catalogue-detail/350-gsm-sweatshirt/black-original-style-v2.webp",
    maroon: "/products/starkvibe/design-editor/sweatshirt-maroon-back-generated.png",
    navy: "/products/starkvibe/catalogue-detail/350-gsm-sweatshirt/navy-blue-original-style-v2.webp",
  },
  hoodie: {
    black: "/products/starkvibe/design-editor/hoodie-black-back-generated.png",
    maroon: "/products/starkvibe/design-editor/hoodie-black-back-generated.png",
    navy: "/products/starkvibe/design-editor/hoodie-black-back-generated.png",
    white: "/products/starkvibe/design-editor/hoodie-black-back-generated.png",
  },
};

const blankDesign: DesignState = { front: [], back: [] };
const cloneDesign = (design: DesignState): DesignState => ({
  front: design.front.map((layer) => ({ ...layer })),
  back: design.back.map((layer) => ({ ...layer })),
});

export function DesignEditor() {
  const [side, setSide] = useState<Side>("front");
  const [garment, setGarment] = useState<Garment>("tee");
  const [colour, setColour] = useState(colours[0]);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState("1");
  const [phone, setPhone] = useState("");
  const [design, setDesign] = useState<DesignState>(blankDesign);
  const [past, setPast] = useState<DesignState[]>([]);
  const [future, setFuture] = useState<DesignState[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [thankYou, setThankYou] = useState(false);

  const layers = design[side];
  const selected = layers.find((layer) => layer.id === selectedId) ?? null;
  const garmentImage = (side === "back" ? garmentBackImages[garment] : garmentImages[garment])[colour.value]
    ?? garmentImages[garment].black;
  const availableColours = colours.filter((item) => garmentImages[garment][item.value]);
  const selectedGarment = garmentOptions.find((item) => item.value === garment)!;
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  function commit(next: DesignState) {
    setPast((items) => [...items.slice(-29), cloneDesign(design)]);
    setDesign(next);
    setFuture([]);
  }

  function addText() {
    const value = text.trim();
    if (!value) return;
    const id = `text-${Date.now()}`;
    commit({
      ...cloneDesign(design),
      [side]: [...layers, { id, type: "text", value, x: 50, y: 48, scale: 1, rotation: 0, colour: "#ffffff", fontSize: 7 }],
    });
    setSelectedId(id);
    setText("");
  }

  function changeGarment(next: Garment) {
    setGarment(next);
    const firstAvailable = colours.find((item) => garmentImages[next][item.value]);
    if (firstAvailable) setColour(firstAvailable);
    setSelectedId(null);
  }

  function addImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const id = `image-${Date.now()}`;
      commit({
        ...cloneDesign(design),
        [side]: [...layers, { id, type: "image", value: String(reader.result), x: 50, y: 48, scale: 1, rotation: 0, colour: "#ffffff", fontSize: 7 }],
      });
      setSelectedId(id);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function updateSelected(changes: Partial<Layer>) {
    if (!selected) return;
    commit({
      ...cloneDesign(design),
      [side]: layers.map((layer) => (layer.id === selected.id ? { ...layer, ...changes } : layer)),
    });
  }

  function startMove(event: PointerEvent<HTMLDivElement>, layer: Layer) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(layer.id);
    setDragging({ id: layer.id, side, before: cloneDesign(design) });
  }

  function moveLayer(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!bounds) return;
    const x = Math.max(12, Math.min(88, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.max(12, Math.min(88, ((event.clientY - bounds.top) / bounds.height) * 100));
    setDesign((current) => ({
      ...current,
      [dragging.side]: current[dragging.side].map((layer) => (layer.id === dragging.id ? { ...layer, x, y } : layer)),
    }));
  }

  function endMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setPast((items) => [...items.slice(-29), dragging.before]);
    setFuture([]);
    setDragging(null);
  }

  function alignSelected(x: number, y: number) {
    if (!selected) return;
    updateSelected({ x, y });
  }

  function undo() {
    const previous = past.at(-1);
    if (!previous) return;
    setFuture((items) => [cloneDesign(design), ...items]);
    setDesign(previous);
    setPast((items) => items.slice(0, -1));
    setSelectedId(null);
  }

  function redo() {
    const next = future[0];
    if (!next) return;
    setPast((items) => [...items, cloneDesign(design)]);
    setDesign(next);
    setFuture((items) => items.slice(1));
    setSelectedId(null);
  }

  function reset() {
    commit(blankDesign);
    setSelectedId(null);
  }

  async function sendEnquiry() {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "917060421033";
    const details = [
      "Hello StarkVibe, I created a custom design.",
      `Garment: ${selectedGarment.label}`,
      `Colour: ${colour.name}`,
      `Size: ${size}`,
      `Quantity: ${quantity}`,
      phone ? `My WhatsApp: ${phone}` : "",
      `Front layers: ${design.front.length}`,
      `Back layers: ${design.back.length}`,
      "I will share/confirm the final preview for quotation.",
    ].filter(Boolean).join("\n");
    const emailResponse = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "Custom design enquiry", message: details }),
    });
    if (emailResponse.ok) setThankYou(true);
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
  }

  async function savePreview() {
    const canvas = document.createElement("canvas");
    const width = 1200;
    const height = 1500;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;

    const loadImage = (source: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = source;
    });

    try {
      const garment = await loadImage(garmentImage);
      context.drawImage(garment, 0, 0, width, height);
      const printArea = { left: width * 0.22, top: height * 0.18, width: width * 0.56, height: height * 0.62 };

      for (const layer of layers) {
        const x = printArea.left + (layer.x / 100) * printArea.width;
        const y = printArea.top + (layer.y / 100) * printArea.height;
        context.save();
        context.translate(x, y);
        context.rotate((layer.rotation * Math.PI) / 180);
        context.scale(layer.scale, layer.scale);
        if (layer.type === "text") {
          context.fillStyle = layer.colour;
          context.font = `800 ${Math.round((layer.fontSize / 100) * printArea.width)}px Arial, sans-serif`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(layer.value, 0, 0);
        } else {
          const artwork = await loadImage(layer.value);
          const maxWidth = printArea.width * 0.45;
          const maxHeight = printArea.height * 0.35;
          const ratio = Math.min(maxWidth / artwork.width, maxHeight / artwork.height);
          context.drawImage(artwork, -(artwork.width * ratio) / 2, -(artwork.height * ratio) / 2, artwork.width * ratio, artwork.height * ratio);
        }
        context.restore();
      }

      const link = document.createElement("a");
      link.download = `starkvibe-${colour.value}-${side}-custom-design.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      window.alert("Preview save nahi ho paaya. Please try again.");
    }
  }

  const layerCount = useMemo(() => design.front.length + design.back.length, [design]);

  return (
    <>
    <main className="min-h-screen bg-[#e7e4dc] text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-8 lg:px-12 lg:py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/custom-printing" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold hover:text-olive"><ArrowLeft size={16} /> Back to custom printing</Link>
            <p className="text-xs font-bold tracking-[.18em] text-olive uppercase">StarkVibe Design Studio</p>
            <h1 className="mt-3 font-display text-[clamp(48px,7vw,100px)] leading-[.84] font-black uppercase">Create your own.</h1>
          </div>
          <div className="max-w-[340px] text-sm leading-[1.6] text-[#55544f]">Build a print-ready idea yourself. Add your artwork, arrange the front and back, then send the brief for a final quote.</div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)]">
          <section className="border border-ink bg-paper p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-ink/20 pb-4">
              <div className="flex gap-2">
                {(["front", "back"] as Side[]).map((item) => <button key={item} onClick={() => { setSide(item); setSelectedId(null); }} className={`border px-4 py-2 text-xs font-bold tracking-[.1em] uppercase ${side === item ? "border-ink bg-ink text-paper" : "border-ink/30"}`}>{item}</button>)}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#66645e]"><span className="h-2 w-2 rounded-full bg-olive" /> {layerCount} design layers</div>
            </div>
            <div className="mx-auto max-w-[620px]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#dedbd2]">
                <img src={garmentImage} alt={`StarkVibe ${colour.name} ${garment} cotton garment preview`} className="absolute inset-0 h-full w-full object-contain" />
                <div className="absolute inset-[18%_22%_20%] overflow-hidden">
                  {layers.map((layer) => <div key={layer.id} onPointerDown={(event) => startMove(event, layer)} onPointerMove={moveLayer} onPointerUp={endMove} onClick={() => setSelectedId(layer.id)} className={`absolute max-w-[80%] cursor-grab touch-none select-none active:cursor-grabbing ${selectedId === layer.id ? "outline outline-2 outline-olive outline-offset-4" : ""}`} style={{ left: `${layer.x}%`, top: `${layer.y}%`, transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scale})`, color: layer.colour, fontSize: `${layer.fontSize}cqw`, lineHeight: 1, fontWeight: 800 }}>
                    {layer.type === "text" ? <span className="whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,.35)]">{layer.value}</span> : <img src={layer.value} alt="Uploaded design" className="max-h-32 max-w-40 object-contain" />}
                  </div>)}
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-[#77756d]">Click or drag a layer on the garment to select and position it.</p>
            </div>
          </section>

          <aside className="border border-ink bg-paper p-5 sm:p-7">
            <div className="mb-7 flex items-center justify-between border-b border-ink pb-4"><h2 className="font-display text-3xl font-black uppercase">Design controls</h2><div className="flex gap-1"><button onClick={undo} disabled={!canUndo} aria-label="Undo" className="p-2 disabled:opacity-30"><Undo2 size={18} /></button><button onClick={redo} disabled={!canRedo} aria-label="Redo" className="p-2 disabled:opacity-30"><Redo2 size={18} /></button><button onClick={reset} aria-label="Reset design" className="p-2"><RotateCcw size={18} /></button></div></div>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-[.12em] uppercase">Choose product</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {garmentOptions.map((item) => {
                    const preview = garmentImages[item.value].black || garmentImages[item.value][Object.keys(garmentImages[item.value])[0]];
                    return (
                      <button
                        key={item.value}
                        onClick={() => changeGarment(item.value)}
                        className={`group overflow-hidden border text-left transition-colors ${garment === item.value ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"}`}
                      >
                        <span className="relative block aspect-[4/3] overflow-hidden bg-[#dedbd2]">
                          <img src={preview} alt={`StarkVibe ${item.label} cotton product preview`} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                        </span>
                        <span className="block px-2.5 py-2">
                          <span className="block text-sm font-bold">{item.label}</span>
                          <span className={`mt-0.5 block text-[10px] ${garment === item.value ? "text-paper/70" : "text-ink/55"}`}>{item.note}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div><label className="mb-2 block text-xs font-bold tracking-[.12em] uppercase">Colour</label><div className="flex flex-wrap gap-2">{availableColours.map((item) => <button key={item.value} onClick={() => setColour(item)} title={item.name} className={`h-9 w-9 rounded-full border-2 ${colour.value === item.value ? "border-ink ring-2 ring-olive ring-offset-2" : "border-ink/20"}`} style={{ background: item.value === "sea-green" ? "#9ce6bd" : item.value === "maroon" ? "#8d2d32" : item.value === "navy" ? "#0c1235" : item.value }} />)}</div></div>
              <div className="grid grid-cols-2 gap-3"><label className="text-sm font-semibold">Size<select value={size} onChange={(event) => setSize(event.target.value)} className="mt-2 h-11 w-full border border-ink/40 bg-paper px-3"><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option></select></label><label className="text-sm font-semibold">Quantity<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="mt-2 h-11 w-full border border-ink/40 bg-paper px-3" /></label></div>
              <div className="border-t border-ink/20 pt-5"><label className="mb-2 block text-xs font-bold tracking-[.12em] uppercase">Add text</label><div className="flex gap-2"><input value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addText()} placeholder="Name, quote or number" className="h-11 min-w-0 flex-1 border border-ink/40 bg-paper px-3 text-sm" /><button onClick={addText} className="bg-ink px-4 text-sm font-bold text-paper">Add</button></div></div>
              <label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-ink/50 p-4 text-sm font-bold hover:bg-ink/5"><ImagePlus size={18} /> Upload image / logo<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={addImage} className="hidden" /></label>
              {selected && <div className="space-y-4 border-t border-ink/20 pt-5"><p className="text-xs font-bold tracking-[.12em] uppercase">Selected layer</p><div><p className="mb-2 text-sm">Alignment</p><div className="grid grid-cols-3 gap-1.5"><button onClick={() => alignSelected(18, selected.y)} className="border border-ink/30 px-2 py-2 text-xs font-semibold">Left</button><button onClick={() => alignSelected(50, selected.y)} className="border border-ink/30 px-2 py-2 text-xs font-semibold">Center</button><button onClick={() => alignSelected(82, selected.y)} className="border border-ink/30 px-2 py-2 text-xs font-semibold">Right</button><button onClick={() => alignSelected(selected.x, 18)} className="border border-ink/30 px-2 py-2 text-xs font-semibold">Top</button><button onClick={() => alignSelected(selected.x, 50)} className="border border-ink/30 px-2 py-2 text-xs font-semibold">Middle</button><button onClick={() => alignSelected(selected.x, 82)} className="border border-ink/30 px-2 py-2 text-xs font-semibold">Bottom</button></div></div><label className="block text-sm">Layer size<input type="range" min="0.5" max="2.2" step=".05" value={selected.scale} onChange={(event) => updateSelected({ scale: Number(event.target.value) })} className="mt-2 w-full accent-olive" /></label>{selected.type === "text" && <label className="block text-sm">Font size<input type="range" min="3" max="12" step=".5" value={selected.fontSize} onChange={(event) => updateSelected({ fontSize: Number(event.target.value) })} className="mt-2 w-full accent-olive" /></label>}<label className="block text-sm">Rotation<input type="range" min="-180" max="180" value={selected.rotation} onChange={(event) => updateSelected({ rotation: Number(event.target.value) })} className="mt-2 w-full accent-olive" /></label>{selected.type === "text" && <label className="block text-sm">Text colour<input type="color" value={selected.colour} onChange={(event) => updateSelected({ colour: event.target.value })} className="ml-3 h-8 w-12 align-middle" /></label>}<button onClick={() => { commit({ ...cloneDesign(design), [side]: layers.filter((layer) => layer.id !== selected.id) }); setSelectedId(null); }} className="text-sm font-bold text-red-700 underline">Remove selected layer</button></div>}
              <div><label className="mb-2 block text-xs font-bold tracking-[.12em] uppercase">WhatsApp number</label><input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your WhatsApp number" className="h-11 w-full border border-ink/40 bg-paper px-3 text-sm" /></div>
              <button onClick={sendEnquiry} className="flex w-full items-center justify-center gap-2 bg-olive px-5 py-4 text-sm font-bold text-paper"><Send size={17} /> Send design enquiry on WhatsApp</button>
              <button onClick={savePreview} className="flex w-full items-center justify-center gap-2 border border-ink px-5 py-3 text-sm font-bold"><Download size={16} /> Save custom design</button>
            </div>
          </aside>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-[#55544f] sm:grid-cols-3"><p className="flex gap-2 border-t border-ink/30 pt-3"><Check size={17} className="shrink-0 text-olive" /> Front and back design control</p><p className="flex gap-2 border-t border-ink/30 pt-3"><Check size={17} className="shrink-0 text-olive" /> Artwork stays visible in your preview</p><p className="flex gap-2 border-t border-ink/30 pt-3"><Check size={17} className="shrink-0 text-olive" /> Final quote confirmed before printing</p></div>
      </div>
    </main>
    <ThankYouModal open={thankYou} onClose={() => setThankYou(false)} />
    </>
  );
}
