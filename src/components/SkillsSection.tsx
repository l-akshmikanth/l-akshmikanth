"use client";

import { useEffect, useRef, useState } from "react";
import { translations, Locale } from "@/lib/i18n";

interface SkillsSectionProps {
  locale: Locale;
}

const SKILL_CHIPS = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "Responsive Design", "WhatsApp Invitations", "Educational Portals", "SEO", "Git",
];

export default function SkillsSection({ locale }: SkillsSectionProps) {
  const t = translations[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const specs = [
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t.skillsCollegeTitle,
      desc: t.skillsCollegeDesc,
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: t.skillsInviteTitle,
      desc: t.skillsInviteDesc,
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t.skillsLandingTitle,
      desc: t.skillsLandingDesc,
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: "var(--bg-white)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "72px 0",
      }}
    >
      {/* section-container handles responsive padding */}
      <div className="section-container">

        {/* Section label */}
        <div className={`section-label ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span style={{ color: "var(--accent)" }}>●</span>
          {locale === "en" ? "Specializations" : "ವಿಶೇಷತೆಗಳು"}
        </div>

        {/* Heading */}
        <h2
          className={`${visible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.75rem, 5vw, 3rem)",
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "40px",
          }}
        >
          {t.skillsHeading.split(" ").slice(0, -1).join(" ")}{" "}
          <span style={{
            fontFamily: "'Playfair Display', var(--font-playfair), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
            color: "var(--accent)",
          }}>
            {t.skillsHeading.split(" ").slice(-1)[0]}
          </span>
        </h2>

        {/* Spec cards — skills-grid CSS class handles responsive columns */}
        <div className={`skills-grid ${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          {specs.map((spec, i) => (
            <div key={i} className="card" style={{ padding: "24px" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "10px",
                background: "rgba(232,98,26,0.08)",
                border: "1px solid rgba(232,98,26,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--accent)",
                marginBottom: "18px",
              }}>
                {spec.icon}
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: "var(--fg)",
                marginBottom: "8px",
              }}>
                {spec.title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                {spec.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Skill chips */}
        <div
          className={`${visible ? "animate-fade-in-up delay-300" : "opacity-0"}`}
          style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
        >
          {SKILL_CHIPS.map((chip) => (
            <span
              key={chip}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1.5px solid var(--border-strong)",
                background: "var(--card-bg)",
                color: "var(--muted)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: "default",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLSpanElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
                el.style.background = "rgba(232,98,26,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLSpanElement;
                el.style.borderColor = "var(--border-strong)";
                el.style.color = "var(--muted)";
                el.style.background = "var(--card-bg)";
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
