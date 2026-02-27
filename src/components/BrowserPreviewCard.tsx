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
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function BrowserPreviewCard({
  url,
  name,
  tags,
  previewUrl,
  useIframe,
  locale,
}: BrowserPreviewCardProps) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const domain = getDomain(url);

  // If image fails to load, fall back to iframe
  const showIframe = useIframe || imageError;
  const showImage = !showIframe && previewUrl;

  return (
    <div className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        {/* Address bar */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 font-mono truncate mx-2">
          <svg
            className="w-3 h-3 text-green-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate">{domain}</span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden bg-gray-50 dark:bg-gray-800">
        {showImage && (
          <img
            src={previewUrl!}
            alt={`${name} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
              className={`w-full h-full border-0 transition-opacity duration-500 ${
                iframeLoading ? "opacity-0" : "opacity-100"
              }`}
              style={{
                transform: "scale(0.5)",
                transformOrigin: "top left",
                width: "200%",
                height: "200%",
              }}
              onLoad={() => setIframeLoading(false)}
            />
          </>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2 truncate">
          {name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Live Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {locale === "en" ? "View Live" : "ನೇರ ವೀಕ್ಷಿಸಿ"}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
