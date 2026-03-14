"use client";

import { useState, useEffect } from "react";
import { translations, Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = translations[locale];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#skills", label: t.navSkills },
    { href: "#projects", label: t.navProjects },
    { href: "#contact", label: t.navContact },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(243, 244, 247, 0.92)" : "rgba(243, 244, 247, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <a
          href={`/${locale}`}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "2px" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "1.125rem",
              color: "var(--fg)",
              letterSpacing: "-0.01em",
            }}
          >
            LK
          </span>
          <span style={{ color: "var(--accent)", fontSize: "1.4rem", lineHeight: 1, fontWeight: 800 }}>.</span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ alignItems: "center", gap: "8px" }} className="hide-mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "100px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "8px" }}>
            <a href="#contact" className="btn-black" style={{ padding: "8px 20px", fontSize: "0.75rem" }}>
              {t.contactLabel}
            </a>
            <LanguageSwitcher label={t.switchLang} href={t.switchLangHref} />
          </div>
        </nav>

        {/* Mobile */}
        <div className="show-mobile" style={{ alignItems: "center", gap: "8px" }}>
          <LanguageSwitcher label={t.switchLang} href={t.switchLangHref} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid var(--border-strong)",
              background: "var(--card-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--fg)",
              cursor: "pointer",
            }}
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="show-mobile"
          style={{
            background: "var(--bg)",
            borderTop: "1px solid var(--border)",
            padding: "12px 24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "10px 12px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "color 0.2s, background 0.2s",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-black"
            style={{ marginTop: "8px", justifyContent: "center", fontSize: "0.75rem", padding: "10px 24px" }}
          >
            {t.contactLabel}
          </a>
        </div>
      )}
    </header>
  );
}
