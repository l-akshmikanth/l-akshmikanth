import { EnrichedProject } from "@/lib/og-fetcher";
import BrowserPreviewCard from "./BrowserPreviewCard";

interface PortfolioGalleryProps {
  projects: EnrichedProject[];
  locale: "en" | "ka";
}

export default function PortfolioGallery({
  projects,
  locale,
}: PortfolioGalleryProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <BrowserPreviewCard
            key={project.id}
            id={project.id}
            url={project.url}
            name={locale === "en" ? project.nameEn : project.nameKa}
            tags={locale === "en" ? project.tagsEn : project.tagsKa}
            previewUrl={project.previewUrl}
            useIframe={project.useIframe}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
