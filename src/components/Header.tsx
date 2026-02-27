import { translations, Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = translations[locale];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href={`/${locale}`} className="text-xl font-bold text-gray-900 dark:text-white">
          {"<LK />"}
        </a>

        <nav className="flex items-center gap-4">
          <a
            href="#projects"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:block"
          >
            {t.heading}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {t.contactLabel}
          </a>
          <LanguageSwitcher label={t.switchLang} href={t.switchLangHref} />
        </nav>
      </div>
    </header>
  );
}
