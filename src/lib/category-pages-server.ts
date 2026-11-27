export type CategoryPageContent = {
  slug: string;
  heading: string;
  short_intro: string;
  intro_title: string;
  intro_paragraphs: string[];
};

export async function getCategoryPageContent(slug: string): Promise<CategoryPageContent | null> {
  const defaultApiUrl = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api" : "https://api.starkvibe.com/api";
  const apiUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || defaultApiUrl).replace(/\/$/, "");

  try {
    const response = await fetch(`${apiUrl}/category-pages/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { category_page?: CategoryPageContent };
    return body.category_page ?? null;
  } catch {
    return null;
  }
}
