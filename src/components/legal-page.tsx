import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { Storefront } from "./storefront";

type Section = { title: string; body: string };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return (
    <>
      <Storefront hideRange>
        <main className="mx-auto max-w-[1100px] px-5 py-16 lg:px-12 lg:py-28">
          <Link href="/" className="text-sm font-bold text-olive hover:underline">← Back to home</Link>
          <p className="mt-12 text-xs font-bold tracking-[.18em] text-olive uppercase">StarkVibe policies</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(64px,9vw,132px)] leading-[.82] font-black uppercase">{title}</h1>
          <p className="mt-10 max-w-3xl text-lg leading-[1.7] text-[#55544f]">{intro}</p>
          <div className="mt-16 border-t border-ink">
            {sections.map((section) => (
              <section key={section.title} className="grid gap-5 border-b border-ink/30 py-9 md:grid-cols-[.35fr_1fr] md:gap-12">
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="whitespace-pre-line text-[16px] leading-[1.75] text-[#55544f]">{section.body}</p>
              </section>
            ))}
          </div>
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
