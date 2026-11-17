import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { blogMetaDescription, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

const blogSocialImages: Record<string, string> = {
  "how-to-choose-the-right-gsm-t-shirt": "/blog/cotton-gsm-guide.png",
  "custom-t-shirt-printing-order-checklist": "/blog/custom-printing-order-checklist.png",
  "how-to-care-for-cotton-t-shirts-and-fleece": "/blog/care-cotton-fleece.png",
  "how-to-choose-a-premium-cotton-t-shirt": "/blog/premium-cotton-tshirt.png",
  "cotton-clothing-styling-tips": "/blog/cotton-styling-tips.png",
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return buildMetadata({ title: "Guide not found — StarkVibe", description: "The requested StarkVibe guide could not be found.", path: "/blog" });
  const metadata = buildMetadata({ title: `${post.title} — StarkVibe Journal`, description: blogMetaDescription(post.slug, post.description), path: `/blog/${post.slug}`, image: post.image || blogSocialImages[post.slug] });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.published } };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, image: `https://starkvibe.com${post.image || blogSocialImages[post.slug] || "/branding/starkvibe-wordmark-premium.png"}`, datePublished: post.published, dateModified: post.updated, author: { "@type": "Organization", name: "StarkVibe", url: "https://starkvibe.com" }, publisher: { "@type": "Organization", name: "StarkVibe", url: "https://starkvibe.com" }, mainEntityOfPage: `https://starkvibe.com/blog/${post.slug}` };
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Journal", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  return (
    <>
      <Storefront hideRange>{null}</Storefront>
      <div className="mx-auto max-w-[900px] px-5 pt-4 text-sm text-[#5d5b55] lg:px-0">
        Updated <time dateTime={post.updated}>{new Date(post.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>
      </div>
      <JsonLd data={breadcrumbSchema} />
      <main className="bg-paper text-ink"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><article className="mx-auto max-w-[900px] px-5 pt-16 pb-24 lg:pt-24"><nav aria-label="Breadcrumb" className="mb-14 text-sm text-[#5d5b55]"><Link href="/">Home</Link><span className="mx-3">/</span><Link href="/blog">Journal</Link><span className="mx-3">/</span><span>{post.category}</span></nav><p className="text-xs font-bold tracking-[.2em] text-olive uppercase">{post.category} · {post.readTime}</p><h1 className="mt-5 font-display text-[clamp(52px,8vw,110px)] leading-[.84] font-black uppercase">{post.title}</h1><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5d5b55]"><span>By StarkVibe</span><span aria-hidden="true">·</span><time dateTime={post.published}>{new Date(post.published).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></div><p className="mt-8 max-w-[720px] text-xl leading-8 text-[#494842]">{post.intro}</p>{post.image && <Image src={post.image} alt={`${post.title} — StarkVibe editorial cover`} width={1200} height={630} priority sizes="(max-width: 900px) 100vw, 900px" className="mt-12 aspect-[1200/630] w-full object-cover" />}<div className="mt-16 space-y-12 border-t border-ink pt-12">{post.sections.map((section) => <section key={section.heading}><h2 className="font-display text-4xl leading-none font-black uppercase">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 max-w-[760px] leading-8 text-[#55544f]">{paragraph}</p>)}{section.bullets && <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-[#55544f]">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div><div className="mt-16 border-t border-ink pt-8"><p className="mb-4 text-xs font-bold tracking-[.18em] text-olive uppercase">Continue exploring</p><div className="flex flex-wrap gap-x-7 gap-y-3">{post.related.map((link) => <Link key={link.href} href={link.href} className="font-bold underline decoration-1 underline-offset-4 hover:text-olive">{link.label} →</Link>)}</div></div></article></main>
      <SiteFooter />
    </>
  );
}
