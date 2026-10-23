import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Zap,
  ClipboardCheck,
  Layers,
  MessageSquare,
  Timer,
  ShieldCheck,
} from "lucide-react";
import { DFA_REVIEW } from "@/lib/site";
import { useI18n } from "@/i18n";

const ATTRIBUTE_ICONS = [MapPin, Zap, ClipboardCheck, Layers];
const VALUE_ICONS = [MessageSquare, Timer, ShieldCheck];

const overline = "text-sm md:text-[15px] tracking-widest text-red-600 uppercase font-bold";

export default function About() {
  const { t, tl } = useI18n();

  return (
    <div data-testid="page-about">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-7 gt-reveal">
              <div className={`${overline} mb-6`}>{t("about.overline")}</div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[60px] leading-[1.05] tracking-tight font-semibold text-gray-900">
                {t("about.title")}
              </h1>
              <p className="mt-7 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">{t("about.subtitle")}</p>
            </div>
            <figure className="lg:col-span-5 gt-reveal delay-2 border border-gray-200">
              <img
                src="/assets/facility-1.jpg"
                alt={t("about.heroAlt")}
                className="w-full h-[320px] lg:h-[440px] object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="border-b border-gray-200 bg-white" data-testid="about-mission">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className={`${overline} mb-4`}>{t("about.mission.overline")}</div>
              <h2 className="font-display text-3xl lg:text-[44px] tracking-tight font-semibold text-gray-900 leading-[1.1]">
                {t("about.mission.title")}
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-lg text-gray-600 leading-relaxed">
              {tl("about.mission.paragraphs").map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {tl("about.mission.attributes").map(([title, d], i) => {
              const Icon = ATTRIBUTE_ICONS[i];
              return (
                <li key={title} className="bg-white p-7">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 text-[15px] text-gray-600 leading-relaxed">{d}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="border-b border-gray-200 bg-[#F9FAFB]" data-testid="about-leadership" aria-labelledby="leader-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
          <div className={`${overline} mb-4`}>{t("about.leader.overline")}</div>
          <h2 id="leader-heading" className="font-display text-3xl lg:text-[44px] tracking-tight font-semibold text-gray-900 leading-[1.1] mb-12">
            {t("about.leader.heading")}
          </h2>
          <article className="bg-white border border-gray-200 grid grid-cols-1 md:grid-cols-12" data-testid="leader-card">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-gray-200 p-8 lg:p-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div
                role="img"
                aria-label={t("about.leader.photoLabel")}
                className="w-40 h-40 bg-gray-900 gt-grid-bg-dark flex items-center justify-center"
              >
                <span className="font-display text-5xl font-semibold text-white tracking-tight" aria-hidden="true">
                  DC
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold text-gray-900">{t("about.leader.name")}</h3>
              <p className="mt-1 text-[15px] font-medium text-red-600">{t("about.leader.title")}</p>
            </div>
            <div className="md:col-span-8 p-8 lg:p-10">
              <div className="space-y-4 text-[17px] text-gray-700 leading-relaxed">
                {tl("about.leader.bio").map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <h4 className="mt-8 text-xs tracking-[0.18em] uppercase text-gray-500 font-semibold">
                {t("about.leader.expertise")}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tl("about.leader.tags").map((tag) => (
                  <li key={tag} className="border border-gray-900 px-3 py-1.5 text-[13px] font-medium text-gray-900">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-b border-gray-200 bg-white" data-testid="about-values">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
          <div className={`${overline} mb-4`}>{t("about.values.overline")}</div>
          <h2 className="font-display text-3xl lg:text-[44px] tracking-tight font-semibold text-gray-900 leading-[1.1] mb-12">
            {t("about.values.heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tl("about.values.items").map(([title, d], i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <article key={title} className="gt-card p-8">
                  <div className="w-12 h-12 border border-gray-300 flex items-center justify-center text-red-600">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div className="mt-6 font-mono text-xs tracking-widest text-red-600">0{i + 1}</div>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
                  <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">{d}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="absolute inset-0 gt-grid-bg-dark opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl lg:text-5xl tracking-tight font-semibold leading-tight">
                {t("about.cta.title")}
              </h2>
              <p className="mt-5 text-gray-400 text-lg leading-relaxed max-w-2xl">{t("about.cta.body")}</p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <Link to="/quote" data-testid="about-cta-quote" className="btn-primary w-full lg:w-auto justify-center">
                {t("common.getQuote")} <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/quote?review=dfa"
                data-testid="about-cta-dfa"
                className="btn-secondary w-full lg:w-auto justify-center bg-white text-gray-900 border-white hover:bg-gray-100"
              >
                {t("dfa.short", { defaultValue: DFA_REVIEW.short })} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
