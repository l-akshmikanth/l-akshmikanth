import { translations, Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = translations[locale];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        {/* Location badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium mb-6">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {t.heroLocation}
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
          {t.heroName}
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-medium text-blue-600 dark:text-blue-400 mb-5 italic">
          — {t.heroTagline}
        </p>

        {/* Sub-tagline */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
          {t.heroSubTagline}
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-gray-300 dark:bg-gray-700 mx-auto mb-5" />

        {/* About paragraph */}
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 leading-relaxed mb-10">
          {t.heroAbout}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 w-full sm:w-auto justify-center"
          >
            {t.viewProjects}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t.contactBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
