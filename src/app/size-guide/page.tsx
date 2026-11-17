import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Size Guide for StarkVibe Cotton Clothing",
  description: "Use the StarkVibe size guide to compare regular, oversized, kids, polo and fleece garment measurements before placing an order.",
  path: "/size-guide",
});

const fits = ["Regular", "Oversized", "Kids", "Polo", "Sweatshirt / Hoodie"];

export default function SizeGuidePage() {
  return (
    <>
      <Storefront hideRange>
        <main className="mx-auto max-w-[1400px] px-5 pt-16 pb-24 lg:px-12 lg:pt-24">
          <p className="text-xs font-bold tracking-[.22em] text-olive uppercase">Fit and measurements</p>
          <h1 className="mt-5 max-w-[900px] font-display text-[clamp(58px,9vw,132px)] leading-[.84] font-black uppercase">Size guide.</h1>
          <p className="mt-8 max-w-[720px] text-lg leading-8 text-[#494842]">
            Use the garment measurements below to compare the fit before ordering. TODO: Replace each placeholder with the confirmed StarkVibe size chart measurements.
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {fits.map((fit) => (
              <section key={fit} className="border border-ink p-5 lg:p-7" aria-labelledby={`${fit}-size-heading`}>
                <h2 id={`${fit}-size-heading`} className="font-display text-4xl font-black uppercase">{fit}</h2>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <caption className="sr-only">{fit} fit measurements</caption>
                    <thead className="border-b border-ink/25 text-xs uppercase">
                      <tr><th className="py-3 pr-4">Measurement</th><th className="py-3">Confirmed values</th></tr>
                    </thead>
                    <tbody>
                      {["Chest", "Length", "Shoulder", "Sleeve"].map((measurement) => (
                        <tr key={measurement} className="border-b border-ink/10 last:border-0">
                          <th scope="row" className="py-3 pr-4 font-semibold">{measurement}</th>
                          <td className="py-3 text-[#55544f]">TODO: Add {fit.toLowerCase()} {measurement.toLowerCase()} measurements.</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
          <section className="mt-16 max-w-[780px] border-t border-ink pt-8" aria-labelledby="how-to-measure">
            <h2 id="how-to-measure" className="font-display text-5xl font-black uppercase">How to measure.</h2>
            <ol className="mt-6 space-y-4 text-[16px] leading-7 text-[#55544f]">
              <li><strong>1. Chest:</strong> Measure around the fullest part of the chest, keeping the tape level.</li>
              <li><strong>2. Length:</strong> Measure from the highest shoulder point to the bottom hem.</li>
              <li><strong>3. Compare:</strong> Compare your measurements with the confirmed garment chart before ordering.</li>
            </ol>
            <p className="mt-6 border-l-4 border-gold pl-4 text-sm text-[#55544f]">TODO: Add the confirmed size labels, units and measurement tolerance supplied by StarkVibe.</p>
          </section>
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
