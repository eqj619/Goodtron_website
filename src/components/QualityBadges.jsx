import React from "react";
import { ScanSearch, ScanLine, Microscope, BadgeCheck, HeartPulse, Shield } from "lucide-react";
import { QUALITY_BADGES } from "@/lib/site";
import { useI18n } from "@/i18n";

const ICONS = {
  aoi: ScanSearch,
  xray: ScanLine,
  visual: Microscope,
  ipc: BadgeCheck,
  iso13485: HeartPulse,
  itar: Shield,
};

// Compact strip directly under the homepage hero.
export const TrustBar = () => {
  const { t } = useI18n();
  return (
    <section aria-label={t("trust.aria")} data-testid="trust-bar" className="border-b border-gray-200 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6">
          {QUALITY_BADGES.map((b) => {
            const Icon = ICONS[b.key];
            return (
              <li key={b.key} className="flex items-start gap-3" data-testid={`trust-${b.key}`}>
                <div className="w-10 h-10 shrink-0 border border-gray-300 bg-white flex items-center justify-center text-gray-900">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-bold text-gray-900 leading-tight">
                    {t(`trust.${b.key}.label`, { defaultValue: b.label })}
                  </div>
                  <div className="mt-1 text-xs text-gray-600 leading-snug">
                    {t(`trust.${b.key}.micro`, { defaultValue: b.micro })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

// Detailed cards for the Services page, grouped by Inspection / Standards.
export const QualitySection = () => {
  const groups = ["Inspection", "Standards"];
  return (
    <section id="quality" data-testid="section-quality" className="border-b border-gray-200 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
        <div className="max-w-3xl mb-14">
          <div className="text-sm md:text-[15px] tracking-widest text-red-600 uppercase font-bold mb-4">
            Quality &amp; Inspection
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight font-semibold text-black leading-[1.1]">
            Every board inspected. Standards you can specify.
          </h2>
          <p className="mt-5 text-lg text-black/80 leading-relaxed">
            Prototype speed doesn&apos;t mean skipping inspection. Tell us the class and
            compliance context on your RFQ and we build and inspect to it.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g} className="mb-10 last:mb-0">
            <h3 className="text-xs tracking-[0.18em] uppercase text-black/70 font-semibold mb-4">{g}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {QUALITY_BADGES.filter((b) => b.group === g).map((b) => {
                const Icon = ICONS[b.key];
                return (
                  <article key={b.key} className="bg-white p-7 lg:p-8" data-testid={`quality-${b.key}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 border border-gray-300 flex items-center justify-center text-red-600">
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">{b.label}</span>
                    </div>
                    <h4 className="mt-5 text-lg font-semibold text-black">{b.title}</h4>
                    <p className="mt-2 text-[15px] text-black/80 leading-relaxed">{b.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
