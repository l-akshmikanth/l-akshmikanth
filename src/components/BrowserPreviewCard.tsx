"use client";

import { useState } from "react";
import PreviewSkeleton from "./PreviewSkeleton";

interface BrowserPreviewCardProps {
  id: string;
  url: string;
  name: string;
  tags: string[];
  previewUrl: string | null;
  useIframe: boolean;
  locale: "en" | "ka";
  category?: string;
}

function getDomain(url: string): string {
  try { return new URL(url).hostname; } catch { return url; }
}

export default function BrowserPreviewCard({
  url,
  name,
  tags,
  previewUrl,
  useIframe,
  locale,
  category = "default",
}: BrowserPreviewCardProps) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const domain = getDomain(url);
  const showIframe = useIframe || imageError;
  const showImage = !showIframe && previewUrl;

  // Category→color mapping (orange for all; subtle variations)
  const tagColor = category === "invitation" ? "#b45309" : "var(--accent)";
  const tagBg = category === "invitation" ? "rgba(180,83,9,0.07)" : "rgba(232,98,26,0.07)";
  const tagBorder = category === "invitation" ? "rgba(180,83,9,0.2)" : "rgba(232,98,26,0.2)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card-bg)",
        borderRadius: "20px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        boxShadow: hovered ? "var(--card-shadow-hover)" : "var(--card-shadow)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: "#f7f7f9",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "block" }} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "6px",
            background: "#fff",
            border: "1px solid var(--border)",
            margin: "0 8px",
            fontSize: "0.6875rem",
            fontFamily: "monospace",
            color: "var(--muted)",
            overflow: "hidden",
          }}
        >
          <svg style={{ width: 9, height: 9, color: "#28c840", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{domain}</span>
        </div>
      </div>

      {/* Preview */}
      <div style={{ position: "relative", width: "100%", height: "220px", overflow: "hidden", background: "#f7f7f9" }}>
        {showImage && (
          <img
            src={previewUrl!}
            alt={`${name} preview`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        {showIframe && (
          <>
            <PreviewSkeleton isLoading={iframeLoading} />
            <iframe
              src={url}
              sandbox="allow-same-origin"
              title={`${name} preview`}
              style={{
                border: 0,
                transform: "scale(0.5)",
                transformOrigin: "top left",
                width: "200%",
                height: "200%",
                opacity: iframeLoading ? 0 : 1,
                transition: "opacity 0.5s ease",
              }}
              onLoad={() => setIframeLoading(false)}
            />
          </>
        )}

        {/* Hover overlay with button */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-black"
            style={{ fontSize: "0.75rem", padding: "10px 22px" }}
          >
            {locale === "en" ? "View Live" : "ನೇರ ವೀಕ್ಷಿಸಿ"} ↗
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 18px", borderTop: "1px solid var(--border)", flex: 1 }}>
        {/* Category label */}
        <div className="label-caps-accent" style={{ marginBottom: "6px" }}>
          ● {category === "college"
            ? (locale === "en" ? "College" : "ಕಾಲೇಜ್")
            : category === "invitation"
            ? (locale === "en" ? "Invitation" : "ಆಮಂತ್ರಣ")
            : ""}
        </div>

        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.9375rem",
            color: "var(--fg)",
            marginBottom: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </h3>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "3px 10px",
                borderRadius: "100px",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                background: tagBg,
                color: tagColor,
                border: `1px solid ${tagBorder}`,
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--fg)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)"; }}
        >
          {locale === "en" ? "View Live" : "ನೇರ ವೀಕ್ಷಿಸಿ"} →
        </a>
      </div>
    </div>
  );
}
