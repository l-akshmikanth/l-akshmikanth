import { translations, Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = translations[locale];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-2">
          © {new Date().getFullYear()} Lakshmikanth. {t.footer}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/l-akshmikanth"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
