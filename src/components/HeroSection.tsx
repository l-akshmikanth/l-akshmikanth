"use client";

import { useState, useEffect } from "react";
import { translations, Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
}

const ROLES = ["Web Developer", "Invitation Designer", "UI Craftsman"];
const ROLES_KA = ["ವೆಬ್ ಡೆವಲಪರ್", "ಆಮಂತ್ರಣ ವಿನ್ಯಾಸಕ", "UI ಕ್ರಾಫ್ಟ್ಸ್‌ಮ್ಯಾನ್"];

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = translations[locale];
  const roles = locale === "en" ? ROLES : ROLES_KA;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 38);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, roles]);

  return (
    <section
      className="grid-bg"
      style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: 0 }}
    >
      {/* Use CSS class for responsive padding */}
      <div className="hero-container">

        {/* Role label */}
        <div
          className={`label-caps ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ marginBottom: "32px", color: "var(--muted)" }}
        >
          {t.heroRole}
        </div>

        {/* Name — huge display, clamp handles all screen sizes */}
        <div
          className={`${visible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
          style={{ marginBottom: "36px" }}
        >
          <h1
            style={{
              fontFamily: "'Inter', var(--font-inter), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 13vw, 7.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              margin: 0,
              wordBreak: "break-word",
            }}
          >
            {locale === "en" ? "LAKSHMI" : "ಲಕ್ಷ್ಮೀ"}
          </h1>
          {/* Second line: KANTH + italic orange word */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
            <h1
              style={{
                fontFamily: "'Inter', var(--font-inter), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 13vw, 7.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                margin: 0,
              }}
            >
              {locale === "en" ? "KANTH" : "ಕಾಂತ"}
            </h1>
            <span
              style={{
                fontFamily: "'Playfair Display', var(--font-playfair), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 10vw, 6rem)",
                lineHeight: 0.95,
                color: "var(--accent)",
              }}
            >
              {locale === "en" ? "crafts." : "ತಯಾರಿಸುತ್ತೇನೆ."}
            </span>
          </div>
        </div>

        {/* Tagline + CTA */}
        <div className={`${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>

          {/* Typing indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", minHeight: "2rem" }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.9rem, 2.5vw, 1.0625rem)",
              color: "var(--fg)",
              letterSpacing: "-0.01em",
            }}>
              {displayed}
            </span>
            <span
              className="animate-blink"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.2em",
                background: "var(--accent)",
                borderRadius: "1px",
                verticalAlign: "middle",
              }}
            />
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.875rem, 2vw, 1.0625rem)",
            color: "var(--muted)",
            lineHeight: 1.7,
            margin: "0 0 20px",
            maxWidth: "580px",
          }}>
            {t.heroSubTagline}
          </p>

          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "28px" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {t.heroLocation}
          </div>

          {/* CTA buttons — uses CSS class for mobile stacking */}
          <div className="btn-group" style={{ marginBottom: "24px" }}>
            <a href="#projects" className="btn-black">
              {t.viewProjects} ↘
            </a>
            <a href="#contact" className="btn-outline">
              {t.contactBtn}
            </a>
          </div>

          {/* Social icons */}
          <div className="social-row" style={{ marginBottom: "36px" }}>
            <a href="https://github.com/l-akshmikanth" target="_blank" rel="noopener noreferrer" className="icon-pill" title="GitHub">
              <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:lkgowda2012@gmail.com" className="icon-pill" title="Email">
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
            <a href="https://wa.me/917892484857" target="_blank" rel="noopener noreferrer" className="icon-pill" title="WhatsApp">
              <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          {/* Stats — CSS class handles wrap + gap on mobile */}
          <div className="hero-stats">
            {[
              { value: "5+", label: locale === "en" ? "Projects" : "ಯೋಜನೆಗಳು" },
              { value: "2+", label: locale === "en" ? "Colleges" : "ಕಾಲೇಜ್‌ಗಳು" },
              { value: "3+", label: locale === "en" ? "Invitations" : "ಆಮಂತ್ರಣಗಳು" },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem, 4vw, 1.75rem)",
                  color: "var(--fg)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--muted)",
                  marginTop: "4px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
