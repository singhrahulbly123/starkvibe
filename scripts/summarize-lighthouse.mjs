import { appendFileSync, existsSync, readdirSync, readFileSync } from "node:fs";

const reportDirectory = "lighthouse-reports";
const summaryFile = process.env.GITHUB_STEP_SUMMARY;
const jsonReports = existsSync(reportDirectory)
  ? readdirSync(reportDirectory).filter((file) => file.endsWith(".json"))
  : [];

if (!jsonReports.length) {
  const message = "## Lighthouse audit\n\nNo JSON reports were generated. Check the Lighthouse step logs.\n";
  if (summaryFile) appendFileSync(summaryFile, message);
  console.error(message);
  process.exitCode = 1;
} else {
  const minimums = { performance: 0.6, accessibility: 0.8, "best-practices": 0.8, seo: 0.9 };
  const rows = [];
  let failed = false;

  for (const file of jsonReports.sort()) {
    const report = JSON.parse(readFileSync(`${reportDirectory}/${file}`, "utf8"));
    const scores = Object.fromEntries(
      Object.entries(report.categories || {}).map(([name, category]) => [name, Math.round((category.score || 0) * 100)]),
    );
    for (const [category, minimum] of Object.entries(minimums)) {
      if ((scores[category] || 0) < minimum * 100) failed = true;
    }
    rows.push(`| ${file.replace(/\.json$/, "")} | ${scores.performance ?? "—"} | ${scores.accessibility ?? "—"} | ${scores["best-practices"] ?? "—"} | ${scores.seo ?? "—"} |`);
  }

  const message = [
    "## Lighthouse audit",
    "",
    "Scores are percentages. Minimums: performance 60, accessibility 80, best-practices 80, SEO 90.",
    "",
    "| Route | Performance | Accessibility | Best practices | SEO |",
    "|---|---:|---:|---:|---:|",
    ...rows,
    "",
  ].join("\n");
  if (summaryFile) appendFileSync(summaryFile, message);
  console.log(message);
  if (failed) process.exitCode = 1;
}
