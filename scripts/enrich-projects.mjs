/**
 * Build-time script to enrich projects with OG metadata.
 * Reads src/data/projects.json, fetches OG images, writes src/data/enriched-projects.json.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const projectsPath = resolve(ROOT, "src/data/projects.json");
const outputPath = resolve(ROOT, "src/data/enriched-projects.json");

/**
 * Fetch OG metadata from a URL
 */
async function fetchOGMeta(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://l-akshmikanth.github.io)",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) return {};

    const html = await response.text();

    const getMetaContent = (property) => {
      const match =
        html.match(
          new RegExp(
            `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["'][^>]*\\/?>`,
            "i"
          )
        ) ||
        html.match(
          new RegExp(
            `<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["'][^>]*\\/?>`,
            "i"
          )
        );
      return match?.[1];
    };

    let image = getMetaContent("og:image");
    if (image?.startsWith("/")) {
      const urlObj = new URL(url);
      image = `${urlObj.origin}${image}`;
    }

    return {
      title: getMetaContent("og:title"),
      description: getMetaContent("og:description"),
      image,
    };
  } catch (e) {
    console.warn(`  Fetch error for ${url}:`, e.message);
    return {};
  }
}

async function main() {
  console.log("🔍 Enriching projects with OG metadata...\n");

  const projects = JSON.parse(readFileSync(projectsPath, "utf-8"));
  const enriched = [];

  for (const p of projects) {
    let previewUrl = null;
    let ogTitle;
    let ogDescription;

    // Try OG first (priority 1)
    const meta = await fetchOGMeta(p.url);
    if (meta.image) {
      previewUrl = meta.image;
    }
    ogTitle = meta.title;
    ogDescription = meta.description;
    console.log(
      `  ${meta.image ? "✓" : "✗"} OG for ${p.id}: image=${!!meta.image}, title="${meta.title || "N/A"}"`
    );

    // Fall back to screenshot (priority 2)
    if (!previewUrl && p.screenshotPath) {
      previewUrl = p.screenshotPath;
      console.log(`    → Falling back to screenshot: ${p.screenshotPath}`);
    }

    // Mark iframe-only (priority 3)
    const useIframe = !previewUrl;
    if (useIframe) {
      console.log(`    → Will use iframe fallback`);
    }

    enriched.push({
      ...p,
      previewUrl,
      useIframe,
      ogTitle,
      ogDescription,
    });
  }

  writeFileSync(outputPath, JSON.stringify(enriched, null, 2));
  console.log(`\n✅ Enriched ${enriched.length} projects → ${outputPath}`);
}

main().catch(console.error);
