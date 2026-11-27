import Link from "next/link";

export function FleeceCategoryContent({ type }: { type: "hoodies" | "sweatshirts" }) {
  return <section className="mt-16 max-w-[920px] border-y border-ink/20 py-8 lg:mt-24 text-[15px] leading-7 text-[#55544f]">
    {type === "hoodies" ? <>
      <h2 className="font-display text-4xl leading-none font-black uppercase">350 GSM cotton fleece hoodies for winter</h2>
      <p className="mt-5">StarkVibe hoodies are made from 100% cotton fleece at 350 GSM. GSM means grams per square metre, so a higher number means a heavier and denser fabric. At 350 GSM, these hoodies give you a warm, substantial layer for cooler days, travel and everyday wear.</p>
      <h3 className="mt-6 text-xl font-bold">What you get</h3>
      <ul className="mt-3 list-disc pl-5"><li>100% cotton fleece, 350 GSM</li><li>Regular fit with a hood and a front kangaroo pocket</li><li>Full sleeves</li><li>Double bio-washed and silicon washed for a smoother, softer finish</li><li>Double stitched seams</li></ul>
      <h3 className="mt-6 text-xl font-bold">How to choose your hoodie</h3>
      <p className="mt-3">Start with your usual size and check the <Link href="/size-guide" className="font-bold underline">size chart</Link> on each product page for chest, shoulder, length and sleeve measurements. The fit is regular, so choose your normal size for a comfortable everyday fit. If you prefer a roomier look, think about going one size up.</p>
      <h3 className="mt-6 text-xl font-bold">Custom printing on hoodies</h3>
      <p className="mt-3">These hoodies are a good base for custom printing, whether for a college group, an office team, an event or a campaign. Share your design, quantity and sizes and we will send a quote. Visit our <Link href="/custom-printing" className="font-bold underline">custom printing page</Link> to start.</p>
      <h3 className="mt-6 text-xl font-bold">FAQ</h3>
      <p className="mt-3"><strong>What does 350 GSM mean?</strong> GSM is grams per square metre. It is the weight of the fabric. 350 GSM is a heavy, dense cotton fleece that feels substantial and warm.</p>
      <p className="mt-3"><strong>How should I wash my hoodie?</strong> Wash inside out with similar colours in cold or normal water with mild detergent. Do not bleach. Avoid harsh scrubbing. Dry in shade and iron at low temperature if required. Follow the garment care label.</p>
      <p className="mt-3"><strong>Can I get my own design printed?</strong> Yes. Send an enquiry with your design, quantity and sizes. Minimum quantities and turnaround are confirmed in your quote.</p>
    </> : <>
      <h2 className="font-display text-4xl leading-none font-black uppercase">350 GSM cotton fleece sweatshirts for winter</h2>
      <p className="mt-5">StarkVibe crewneck sweatshirts are made from 100% cotton fleece at 350 GSM, the heaviest weight in our range. They have long sleeves and a classic pullover shape that works for everyday wear, college days and cooler evenings.</p>
      <h3 className="mt-6 text-xl font-bold">What you get</h3>
      <ul className="mt-3 list-disc pl-5"><li>100% cotton fleece, 350 GSM</li><li>Crewneck pullover with long sleeves</li><li>Double bio-washed and silicon washed for a smoother, softer finish</li><li>Double stitched seams</li></ul>
      <h3 className="mt-6 text-xl font-bold">Sweatshirt or hoodie?</h3>
      <p className="mt-3">Choose a sweatshirt for a clean, simple look with no hood. Choose a <Link href="/shop/hoodies" className="font-bold underline">hoodie</Link> if you want a kangaroo pocket and a hood for extra coverage. Both use the same 350 GSM cotton fleece.</p>
      <h3 className="mt-6 text-xl font-bold">Custom printing on sweatshirts</h3>
      <p className="mt-3">Sweatshirts are a good choice for group clothing and branded winter wear. Share your design, quantity and sizes and we will send a quote.</p>
      <Link href="/custom-printing" className="mt-3 inline-block font-bold underline">custom printing</Link>
    </>}
  </section>;
}
