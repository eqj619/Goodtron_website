import React from "react";
import { Globe } from "lucide-react";
import { LANGUAGES, useI18n } from "@/i18n";

export const LanguageSwitcher = ({ className = "", testId = "lang-switcher", dark = false }) => {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("lang.select")} data-testid={testId} className={`flex items-center gap-1.5 ${className}`}>
      <Globe size={15} className={`shrink-0 ${dark ? "text-gray-400" : "text-gray-500"}`} aria-hidden="true" />
      <div className={`flex border ${dark ? "border-white/25" : "border-gray-300"}`}>
        {LANGUAGES.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              lang={l.htmlLang}
              aria-pressed={active}
              aria-label={l.name}
              data-testid={`${testId}-${l.code}`}
              onClick={() => setLang(l.code)}
              className={`px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 ${
                dark
                  ? active
                    ? "bg-white text-gray-900"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                  : active
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
