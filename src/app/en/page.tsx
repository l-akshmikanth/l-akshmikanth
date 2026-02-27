import { Metadata } from "next";
import { translations } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioGallery from "@/components/PortfolioGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { EnrichedProject } from "@/lib/og-fetcher";

// Try to load enriched data; fall back to raw projects
let projects: EnrichedProject[];
try {
  projects = require("@/data/enriched-projects.json");
} catch {
  const raw = require("@/data/projects.json");
  projects = raw.map((p: EnrichedProject) => ({
    ...p,
    previewUrl: p.screenshotPath || null,
    useIframe: !p.screenshotPath,
  }));
}

export const metadata: Metadata = {
  title: translations.en.title,
  description: translations.en.heroDesc,
};

export default function EnglishPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header locale="en" />
      <main className="flex-1">
        <HeroSection locale="en" />
        <div id="projects">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              {translations.en.heading}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
              {translations.en.subtitle}
            </p>
          </div>
          <PortfolioGallery projects={projects} locale="en" />
        </div>
        <ContactSection locale="en" />
      </main>
      <Footer locale="en" />
    </div>
  );
}
