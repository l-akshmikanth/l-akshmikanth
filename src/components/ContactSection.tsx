"use client";

import { useEffect, useRef, useState } from "react";
import { Locale, translations } from "@/lib/i18n";

const CONTACT = {
  email: "lkgowda2012@gmail.com",
  whatsapp: "https://wa.me/917892484857",
};

interface ContactSectionProps {
  locale: Locale;
}

export default function ContactSection({ locale }: ContactSectionProps) {
  const t = translations[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: "var(--fg)",
        borderRadius: "28px 28px 0 0",
        padding: "72px 0 64px",
      }}
    >
      {/* section-container handles responsive padding */}
      <div className="section-container">

        {/* Availability badge */}
        <div
          className={`${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "100px",
            border: "1px solid rgba(16,185,129,0.35)",
            background: "rgba(16,185,129,0.1)",
            color: "#34d399",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#10b981", display: "inline-block",
            boxShadow: "0 0 8px #10b981",
          }} />
          {t.contactAvailability}
        </div>

        {/* Heading */}
        <h2
          className={`${visible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 9vw, 5rem)",
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "14px",
            wordBreak: "break-word",
          }}
        >
          {t.contactHeading.split(" ").slice(0, -1).join(" ")}{" "}
          <span style={{
            fontFamily: "'Playfair Display', var(--font-playfair), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
            color: "var(--accent)",
          }}>
            {t.contactHeading.split(" ").slice(-1)[0]}
          </span>
        </h2>

        {/* Sub */}
        <p
          className={`${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.875rem, 2vw, 1.0625rem)",
            maxWidth: "540px",
            lineHeight: 1.7,
            marginBottom: "32px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {t.contactSub}
        </p>

        {/* CTAs — contact-btns stacks on mobile */}
        <div
          className={`contact-btns ${visible ? "animate-fade-in-up delay-300" : "opacity-0"}`}
          style={{ marginBottom: "24px" }}
        >
          <a
            href={`mailto:${CONTACT.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "100px",
              background: "#fff",
              color: "var(--fg)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.22s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--accent)";
              el.style.color = "#fff";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#fff";
              el.style.color = "var(--fg)";
              el.style.transform = "translateY(0)";
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {t.contactEmailLabel}
          </a>

          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.contactWaLabel}
          </a>
        </div>

        {/* Email display */}
        <p style={{
          color: "rgba(255,255,255,0.28)",
          fontSize: "0.8125rem",
          fontFamily: "monospace",
          wordBreak: "break-all",
        }}>
          {CONTACT.email}
        </p>
      </div>
    </section>
  );
}
