import React from "react";
import { useSearchParams } from "react-router-dom";
import { Zap, Mail, Phone, Clock } from "lucide-react";
import { SITE, QUICK_TURN, DFA_REVIEW } from "@/lib/site";
import { RfqForm } from "@/components/RfqForm";
import { CaseStudies } from "@/components/CaseStudies";
import { useI18n } from "@/i18n";

export default function Quote() {
  const [params] = useSearchParams();
  const { t, tl } = useI18n();
  const dfa = params.get("review") === "dfa";

  return (
    <div data-testid="page-quote">
      <section className="relative border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-sm font-bold mb-6">
            <Zap size={16} aria-hidden="true" /> {t("quickTurn.headline", { defaultValue: QUICK_TURN.headline })}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[60px] leading-[1.05] tracking-tight font-semibold text-gray-900 max-w-4xl">
            {dfa ? t("dfa.title", { defaultValue: DFA_REVIEW.title }) : t("quote.title")}
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
            {dfa ? t("dfa.pitch", { defaultValue: DFA_REVIEW.pitch }) : t("quote.body")}
          </p>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-[#F9FAFB]" aria-labelledby="quote-proof">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <h2 id="quote-proof" className="text-xs tracking-[0.18em] uppercase text-gray-600 font-semibold mb-6">
            {t("quote.proof")}
          </h2>
          <CaseStudies compact />
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <RfqForm key={dfa ? "dfa" : "rfq"} defaultDfa={dfa} testId="quote-rfq" />
            </div>
            <aside className="lg:col-span-4 space-y-6">
              <div className="border border-gray-200 p-7">
                <h2 className="text-sm tracking-widest uppercase font-bold text-red-600 mb-5">{t("quote.nextHeading")}</h2>
                <ol className="space-y-5">
                  {tl("quote.next").map(([title, d], i) => (
                    <li key={title} className="flex gap-4">
                      <span className="font-mono text-sm text-red-600 pt-0.5">0{i + 1}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{title}</div>
                        <div className="mt-1 text-sm text-gray-600 leading-relaxed">{d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="border border-gray-200 bg-[#F9FAFB] p-7 space-y-3 text-[15px]">
                <h2 className="text-sm tracking-widest uppercase font-bold text-red-600 mb-2">{t("quote.talk")}</h2>
                <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3 text-gray-900 hover:text-red-600">
                  <Phone size={15} className="text-red-600" aria-hidden="true" /> {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-gray-900 hover:text-red-600">
                  <Mail size={15} className="text-red-600" aria-hidden="true" /> {SITE.email}
                </a>
                <div className="flex items-start gap-3 text-gray-700">
                  <Clock size={15} className="text-red-600 mt-1 shrink-0" aria-hidden="true" />{" "}
                  {t("site.hours", { defaultValue: SITE.hours })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
