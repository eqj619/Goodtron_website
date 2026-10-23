import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarClock, PackageSearch, Ruler, Clock } from "lucide-react";
import { DFA_REVIEW } from "@/lib/site";

const BENEFIT_ICONS = [CalendarClock, Ruler, PackageSearch];

export const DfaReviewBanner = () => (
  <section
    id="dfa-review"
    aria-labelledby="dfa-review-title"
    data-testid="section-dfa-review"
    className="relative overflow-hidden bg-[#0A0A0A] text-white scroll-mt-32"
  >
    <div className="absolute inset-0 gt-grid-bg-dark opacity-40 pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 border border-red-500 text-red-400 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Free · No order required
          </div>
          <h2 id="dfa-review-title" className="mt-6 font-display text-3xl lg:text-[44px] tracking-tight font-semibold leading-[1.1]">
            {DFA_REVIEW.title}
          </h2>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed">{DFA_REVIEW.pitch}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/quote?review=dfa" data-testid="dfa-cta" className="btn-primary">
              {DFA_REVIEW.cta} <ArrowUpRight size={16} />
            </Link>
            <span className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Clock size={14} aria-hidden="true" /> Results within 24 hours
            </span>
          </div>
        </div>
        <ul className="lg:col-span-6 grid grid-cols-1 gap-px bg-white/10 border border-white/10">
          {DFA_REVIEW.benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[i];
            return (
              <li key={b.t} className="bg-[#0A0A0A] p-6 flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-white/20 flex items-center justify-center text-red-500">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-white">{b.t}</div>
                  <div className="mt-1 text-[15px] text-gray-400 leading-relaxed">{b.d}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);
