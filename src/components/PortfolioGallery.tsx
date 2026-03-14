"use client";

import { useState, useEffect, useRef } from "react";
import { EnrichedProject } from "@/lib/og-fetcher";
import { translations, Locale } from "@/lib/i18n";
import BrowserPreviewCard from "./BrowserPreviewCard";

interface PortfolioGalleryProps {
  projects: EnrichedProject[];
  locale: Locale;
}

type Filter = "all" | "college" | "invitation";

export default function PortfolioGallery({ projects, locale }: PortfolioGalleryProps) {
  const t = translations[locale];
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.filterAll },
    { key: "college", label: t.filterCollege },
    { key: "invitation", label: t.filterInvitation },
  ];

  const filtered = projects.filter((p) =>
    activeFilter === "all" ? true : p.category === activeFilter
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ background: "var(--bg)", padding: "72px 0" }}
    >
      {/* section-container handles responsive padding */}
      <div className="section-container">

        {/* Section label */}
        <div className={`section-label ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span style={{ color: "var(--accent)" }}>●</span>
          {locale === "en" ? "Handpicked Selection" : "ಆಯ್ಕೆ ಮಾಡಲಾದ ಕೆಲಸಗಳು"}
        </div>

        {/* Heading */}
        <div className={`${visible ? "animate-fade-in-up delay-100" : "opacity-0"}`} style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.75rem, 5vw, 3rem)",
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            margin: "0 0 8px",
          }}>
            {t.projectsHeading.split(" ").slice(0, -1).join(" ")}{" "}
            <span style={{
              fontFamily: "'Playfair Display', var(--font-playfair), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
              color: "var(--accent)",
            }}>
              {t.projectsHeading.split(" ").slice(-1)[0]}
            </span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9375rem", fontFamily: "'Inter', sans-serif" }}>
            {t.projectsSubheading}
          </p>
        </div>

        {/* Filter tabs — wraps on mobile naturally */}
        <div
          className={`${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}
          style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: "7px 18px",
                borderRadius: "100px",
                border: activeFilter === f.key ? "1.5px solid var(--fg)" : "1.5px solid var(--border-strong)",
                background: activeFilter === f.key ? "var(--fg)" : "var(--card-bg)",
                color: activeFilter === f.key ? "#fff" : "var(--muted)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid — projects-grid CSS class handles responsive columns */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`${visible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.3 + i * 0.08}s`, animationFillMode: "both" }}
            >
              <BrowserPreviewCard
                id={project.id}
                url={project.url}
                name={locale === "en" ? project.nameEn : project.nameKa}
                tags={locale === "en" ? project.tagsEn : project.tagsKa}
                previewUrl={project.previewUrl}
                useIframe={project.useIframe}
                locale={locale}
                category={project.category}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
