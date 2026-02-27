export interface Project {
  id: string;
  url: string;
  nameEn: string;
  nameKa: string;
  screenshotPath: string | null;
  tagsEn: string[];
  tagsKa: string[];
  category: string;
}

export interface EnrichedProject extends Project {
  previewUrl: string | null;
  useIframe: boolean;
  ogTitle?: string;
  ogDescription?: string;
}

/**
 * Fetch the OG image URL from a website's HTML
 */
export async function fetchOGImage(url: string): Promise<string | null> {
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

    if (!response.ok) return null;

    const html = await response.text();

    // Extract og:image
    const ogImageMatch = html.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*\/?>/i
    ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*\/?>/i
      );

    if (ogImageMatch?.[1]) {
      let imageUrl = ogImageMatch[1];
      // Handle relative URLs
      if (imageUrl.startsWith("/")) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.origin}${imageUrl}`;
      }
      return imageUrl;
    }

    return null;
  } catch (error) {
    console.warn(`Failed to fetch OG image for ${url}:`, error);
    return null;
  }
}

/**
 * Extract OG title and description from HTML
 */
export async function fetchOGMeta(
  url: string
): Promise<{ title?: string; description?: string; image?: string }> {
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

    const getMetaContent = (property: string): string | undefined => {
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
  } catch {
    return {};
  }
}

/**
 * Enrich all projects with OG metadata at build time
 */
export async function enrichProjects(
  projects: Project[]
): Promise<EnrichedProject[]> {
  return Promise.all(
    projects.map(async (p) => {
      let previewUrl: string | null = null;
      let ogTitle: string | undefined;
      let ogDescription: string | undefined;

      // Try OG first (priority 1)
      try {
        const meta = await fetchOGMeta(p.url);
        if (meta.image) {
          previewUrl = meta.image;
        }
        ogTitle = meta.title;
        ogDescription = meta.description;
        console.log(
          `✓ OG fetch for ${p.id}: image=${!!meta.image}, title=${!!meta.title}`
        );
      } catch (e) {
        console.log(`✗ OG fetch failed for ${p.id}:`, e);
      }

      // Fall back to screenshot (priority 2)
      if (!previewUrl && p.screenshotPath) {
        previewUrl = p.screenshotPath;
        console.log(`  → Using screenshot for ${p.id}: ${p.screenshotPath}`);
      }

      // Mark iframe-only (priority 3)
      const useIframe = !previewUrl;
      if (useIframe) {
        console.log(`  → Will use iframe for ${p.id}`);
      }

      return { ...p, previewUrl, useIframe, ogTitle, ogDescription };
    })
  );
}
