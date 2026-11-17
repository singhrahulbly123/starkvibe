import { spawn } from "node:child_process";

const port = 3100 + (process.pid % 1000);
const baseUrl = `http://localhost:${port}`;
const nextCommand = process.execPath;
const server = spawn(nextCommand, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
});

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function metadataFromHtml(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  const description =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ||
    html.match(/<meta\s+content="([^"]*)"\s+name="description"/i)?.[1];
  return {
    title: title ? decodeEntities(title.trim()) : "",
    description: description ? decodeEntities(description.trim()) : "",
  };
}

async function waitForServer() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/sitemap.xml`);
      if (response.ok) return response.text();
    } catch {
      // The dev server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Timed out waiting for the Next.js dev server.");
}

try {
  const sitemap = await waitForServer();
  const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const route = new URL(decodeEntities(match[1]));
    return baseUrl + route.pathname + route.search;
  });
  const routes = [
    ...new Set([
      ...sitemapRoutes,
      `${baseUrl}/cart`,
      `${baseUrl}/checkout`,
      `${baseUrl}/my-account`,
    ]),
  ];
  const pages = [];

  for (const url of routes) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
    pages.push({ url, ...metadataFromHtml(await response.text()) });
  }

  const errors = [];
  const titles = new Map();
  const descriptions = new Map();
  for (const page of pages) {
    if (!page.title) errors.push(`${page.url}: missing title`);
    if (!page.description) errors.push(`${page.url}: missing description`);
    if (page.title.length > 65) errors.push(`${page.url}: title is ${page.title.length} characters`);
    if (page.description.length > 160) errors.push(`${page.url}: description is ${page.description.length} characters`);
    if (titles.has(page.title)) errors.push(`${page.url}: duplicate title with ${titles.get(page.title)}`);
    if (descriptions.has(page.description)) errors.push(`${page.url}: duplicate description with ${descriptions.get(page.description)}`);
    titles.set(page.title, page.url);
    descriptions.set(page.description, page.url);
  }

  console.table(
    pages.map(({ url, title, description }) => ({
      url: new URL(url).pathname,
      title,
      titleLength: title.length,
      descriptionLength: description.length,
    })),
  );
  console.log(`Checked ${pages.length} routes.`);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("SEO metadata check passed.");
  }
} finally {
  server.kill();
}
