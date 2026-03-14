import { Metadata } from "next";
import { translations } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
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
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Header locale="en" />
      <main className="flex-1">
        <HeroSection locale="en" />
        <SkillsSection locale="en" />
        <PortfolioGallery projects={projects} locale="en" />
        <ContactSection locale="en" />
      </main>
      <Footer locale="en" />
    </div>
  );
}
