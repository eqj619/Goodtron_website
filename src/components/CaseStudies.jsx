import React from "react";
import { Quote } from "lucide-react";
import { CASE_STUDIES, TESTIMONIAL } from "@/lib/site";

const showTestimonial = TESTIMONIAL.approved || import.meta.env.DEV;

const Metric = ({ value, label, dark }) => (
  <div className="border-l-2 border-red-600 pl-3">
    <div className={`font-display text-2xl font-bold leading-none ${dark ? "text-white" : "text-gray-900"}`}>{value}</div>
    <div className={`mt-1 text-xs uppercase tracking-widest font-semibold ${dark ? "text-gray-400" : "text-gray-500"}`}>{label}</div>
  </div>
);

const TestimonialCard = () => (
  <figure className="bg-[#0A0A0A] text-white p-8 flex flex-col" data-testid="case-testimonial">
    {!TESTIMONIAL.approved && (
      <div className="mb-4 self-start bg-yellow-300 text-black text-[11px] font-bold uppercase tracking-wider px-2 py-1">
        Draft — replace with an approved customer quote (hidden in production)
      </div>
    )}
    <Quote size={28} className="text-red-500" aria-hidden="true" />
    <blockquote className="mt-5 text-lg leading-relaxed flex-1">&ldquo;{TESTIMONIAL.quote}&rdquo;</blockquote>
    <figcaption className="mt-6 text-sm text-gray-400">
      <span className="text-white font-semibold">{TESTIMONIAL.name}</span> · {TESTIMONIAL.company}
    </figcaption>
    <div className="mt-6 pt-6 border-t border-white/10">
      <Metric {...TESTIMONIAL.metric} dark />
    </div>
  </figure>
);

export const CaseStudies = ({ compact = false }) => {
  const cards = (
    <div className={`grid grid-cols-1 gap-6 ${showTestimonial ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {CASE_STUDIES.map((c) => (
        <article key={c.key} className="gt-card flex flex-col" data-testid={`case-${c.key}`}>
          {!compact && (
            <figure className="aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100">
              <img src={c.img} alt={c.alt} loading="lazy" className="w-full h-full object-cover" />
            </figure>
          )}
          <div className="p-7 flex flex-col flex-1">
            <div className="text-xs tracking-[0.18em] uppercase text-red-600 font-bold">{c.sector}</div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">{c.title}</h3>
            <p className="mt-3 text-[15px] text-gray-600 leading-relaxed flex-1">{c.body}</p>
            <div className="mt-6 pt-5 border-t border-gray-200 grid grid-cols-2 gap-4">
              {c.metrics.map((m) => (
                <Metric key={m.label} {...m} />
              ))}
            </div>
          </div>
        </article>
      ))}
      {showTestimonial && <TestimonialCard />}
    </div>
  );

  if (compact) return cards;

  return (
    <section id="case-studies" data-testid="section-case-studies" className="border-b border-gray-200 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl mb-14">
          <div className="text-sm md:text-[15px] tracking-widest text-red-600 uppercase font-bold mb-4">
            Case Studies
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight font-semibold text-gray-900 leading-[1.1]">
            Real builds. Measured results.
          </h2>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            How hardware teams use Goodtron for fast prototypes and complex SMT — in their numbers.
          </p>
        </div>
        {cards}
      </div>
    </section>
  );
};
