import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { blogPosts, getBlogPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return { title: "Guide not found — StarkVibe" };
  return { title: `${post.title} — StarkVibe Journal`, description: post.description, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.title, description: post.description, url: `/blog/${post.slug}`, type: "article", publishedTime: post.published } };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, datePublished: post.published, dateModified: post.published, author: { "@type": "Organization", name: "StarkVibe", url: "https://starkvibe.com" }, publisher: { "@type": "Organization", name: "StarkVibe", url: "https://starkvibe.com" }, mainEntityOfPage: `https://starkvibe.com/blog/${post.slug}` };
  const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://starkvibe.com/" },
    { "@type": "ListItem", position: 2, name: "Journal", item: "https://starkvibe.com/blog" },
    { "@type": "ListItem", position: 3, name: post.title, item: `https://starkvibe.com/blog/${post.slug}` },
  ] };
  return (
    <>
      <Storefront hideRange>{null}</Storefront>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="bg-paper text-ink"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><article className="mx-auto max-w-[900px] px-5 pt-16 pb-24 lg:pt-24"><nav aria-label="Breadcrumb" className="mb-14 text-sm text-[#5d5b55]"><Link href="/">Home</Link><span className="mx-3">/</span><Link href="/blog">Journal</Link><span className="mx-3">/</span><span>{post.category}</span></nav><p className="text-xs font-bold tracking-[.2em] text-olive uppercase">{post.category} · {post.readTime}</p><h1 className="mt-5 font-display text-[clamp(52px,8vw,110px)] leading-[.84] font-black uppercase">{post.title}</h1><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5d5b55]"><span>By StarkVibe</span><span aria-hidden="true">·</span><time dateTime={post.published}>{new Date(post.published).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></div><p className="mt-8 max-w-[720px] text-xl leading-8 text-[#494842]">{post.intro}</p><div className="mt-16 space-y-12 border-t border-ink pt-12">{post.sections.map((section) => <section key={section.heading}><h2 className="font-display text-4xl leading-none font-black uppercase">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 max-w-[760px] leading-8 text-[#55544f]">{paragraph}</p>)}{section.bullets && <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-[#55544f]">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div><div className="mt-16 border-t border-ink pt-8"><p className="mb-4 text-xs font-bold tracking-[.18em] text-olive uppercase">Continue exploring</p><div className="flex flex-wrap gap-x-7 gap-y-3">{post.related.map((link) => <Link key={link.href} href={link.href} className="font-bold underline decoration-1 underline-offset-4 hover:text-olive">{link.label} →</Link>)}</div></div></article></main>
      <SiteFooter />
    </>
  );
}
