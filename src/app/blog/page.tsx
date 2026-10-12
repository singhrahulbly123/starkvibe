import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "StarkVibe Journal | Cotton Wear & Custom Printing Guides",
  description: "Helpful guides from StarkVibe on GSM, cotton fabric, custom T-shirt printing, bulk apparel orders and garment care.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Storefront hideRange>{null}</Storefront>
      <main className="bg-paper text-ink">
        <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-24 lg:px-12 lg:pt-24">
          <nav aria-label="Breadcrumb" className="mb-14 text-sm text-[#5d5b55]"><Link href="/">Home</Link><span className="mx-3">/</span><span>Journal</span></nav>
          <div className="mb-16 max-w-[850px]"><p className="mb-5 text-xs font-bold tracking-[.22em] text-olive uppercase">StarkVibe journal</p><h1 className="font-display text-[clamp(58px,9vw,132px)] leading-[.84] font-black uppercase">Wear it<br /><span className="text-olive">well.</span></h1><p className="mt-7 max-w-[650px] text-lg leading-8 text-[#494842]">Useful guides for choosing cotton clothing, planning custom printing and getting more life from the pieces you wear.</p></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{blogPosts.map((post, index) => <article key={post.slug} className="flex min-h-[360px] flex-col border border-ink bg-[#e9e7df] p-7 lg:p-9"><p className="text-xs font-bold tracking-[.18em] text-olive uppercase">0{index + 1} · {post.category}</p><h2 className="mt-8 font-display text-4xl leading-[.92] font-black uppercase">{post.title}</h2><p className="mt-5 leading-7 text-[#55544f]">{post.description}</p><div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/30 pt-5 text-sm"><span>{post.readTime}</span><Link href={`/blog/${post.slug}`} className="font-bold hover:text-olive">Read guide →</Link></div></article>)}</div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
