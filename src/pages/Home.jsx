import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  CircuitBoard,
  Cpu,
  Layers,
  Boxes,
  MessageSquare,
  Zap,
  ClipboardCheck,
  ShieldCheck,
  Headphones,
  Wrench,
  Phone,
  Mail,
  Timer,
} from "lucide-react";
import { PCB_IMAGES, SITE, QUICK_TURN, DFA_REVIEW } from "@/lib/site";
import { TrustBar } from "@/components/QualityBadges";
import { DfaReviewBanner } from "@/components/DfaReviewBanner";
import { CaseStudies } from "@/components/CaseStudies";
import { RfqForm } from "@/components/RfqForm";

const CORE_SERVICES = [
  {
    icon: CircuitBoard,
    title: "SMT Assembly",
    body: "Surface-mount assembly on populated boards — from 0402 passives to fine-pitch ICs.",
    img: PCB_IMAGES.lowvolume,
    alt: "Close-up of a densely populated SMT board",
  },
  {
    icon: Cpu,
    title: "PCB Assembly",
    body: "Full PCB assembly with careful BOM review and clear build documentation.",
    img: PCB_IMAGES.pcb,
    alt: "Fully assembled printed circuit board",
  },
  {
    icon: Layers,
    title: "Prototype Builds",
    body: "First-article and rev-A/rev-B prototypes handled with real engineering care.",
    img: PCB_IMAGES.prototype,
    alt: "Prototype electronics board with components",
  },
  {
    icon: Boxes,
    title: "Low-Volume Production",
    body: "Small and mid-batch builds with consistent process notes and inspection.",
    img: PCB_IMAGES.smt,
    alt: "Multiple assembled circuit boards ready for production",
  },
];

const WHY = [
  {
    icon: MessageSquare,
    t: "Responsive communication",
    d: "Direct replies from the people actually coordinating your build — no ticket queues, no sales funnel.",
    img: PCB_IMAGES.whyCommunication,
    alt: "Two engineers working together on an electronics build",
  },
  {
    icon: Zap,
    t: "Prototype & low-volume focus",
    d: "Small runs and single-board prototypes are what we're built for — not squeezed in around larger orders.",
    img: PCB_IMAGES.whyPrototype,
    alt: "Prototype board with components laid out for a small-batch build",
  },
  {
    icon: ClipboardCheck,
    t: "Practical assembly support",
    d: "BOM review, footprint sanity checks, and honest flags on risk items before they become problems.",
    img: PCB_IMAGES.whyReview,
    alt: "Engineer reviewing a design at a workstation with a laptop and electronics",
  },
  {
    icon: ShieldCheck,
    t: "Quality-minded workflow",
    d: "Documented process notes, visual inspection, and a careful handoff on every build we ship.",
    img: PCB_IMAGES.whyInspection,
    alt: "Close-up inspection of a populated printed circuit board",
  },
];

export default function Home() {
  return (
    <div data-testid="page-home">
      {/* TOP CALL-OUT STRIP */}
      <div
        data-testid="home-callout"
        className="bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px] text-black font-medium">
            <span data-testid="home-callout-tagline" className="text-black">
              Direct SMT &amp; PCB Assembly Manufacturer in San Diego — call
            </span>
            <a
              href="tel:+19098715566"
              data-testid="home-callout-phone"
              className="inline-flex items-center gap-2 font-semibold text-black hover:underline"
            >
              <Phone size={14} />
              909-871-5566
            </a>
            <span className="text-black">for any question</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-6 gt-reveal">
              <div className="text-sm md:text-base tracking-widest text-red-600 uppercase font-bold mb-5">
                Electronics Manufacturing · Vista, CA
              </div>
              <p
                data-testid="hero-quick-turn"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-sm sm:text-[15px] font-bold mb-7"
              >
                <Zap size={16} aria-hidden="true" />
                {QUICK_TURN.headline}
              </p>
              <h1 className="font-display text-[44px] sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight font-semibold text-gray-900">
                SMT &amp; PCB Assembly for{" "}
                <span className="text-red-600">Prototype</span> and{" "}
                <span className="text-red-600">Low-Volume</span> Production.
              </h1>
              <p className="mt-8 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Goodtron Electronics is a U.S.-based electronics assembly
                partner offering SMT and PCB assembly, prototype builds, and
                small-batch production — with responsive communication and
                practical, engineering-aware project support.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/quote" data-testid="hero-cta-quote" className="btn-primary">
                  {QUICK_TURN.cta} <ArrowUpRight size={16} />
                </Link>
                <Link to="/quote?review=dfa" data-testid="hero-cta-dfa" className="btn-secondary">
                  {DFA_REVIEW.short} <ArrowRight size={16} />
                </Link>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-gray-600">
                <Timer size={15} className="text-red-600" aria-hidden="true" />
                {QUICK_TURN.detail} — quotes back within 24 hours.
              </p>
            </div>

            <div className="lg:col-span-6 gt-reveal delay-2">
              <div className="relative border border-gray-200">
                <img
                  src={PCB_IMAGES.hero}
                  alt="Close-up of a professionally assembled printed circuit board"
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* CORE SERVICES */}
      <section className="border-b border-gray-200 bg-white" data-testid="section-core-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <div className="text-sm md:text-[15px] tracking-widest text-red-600 uppercase font-bold mb-4">
                Our Services
              </div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-tight font-semibold text-gray-900 leading-[1.1]">
                A focused set of electronics assembly services.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                We concentrate on doing a small number of things carefully — SMT,
                PCB assembly, prototypes, and low-volume production runs — for
                hardware teams that want a responsive, engineering-aware partner.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {CORE_SERVICES.map((s, i) => (
              <div key={s.title} data-testid={`core-service-${i}`} className="bg-white flex flex-col">
                <div className="aspect-[4/3] overflow-hidden border-b border-gray-200">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600">
                      <s.icon size={18} />
                    </div>
                    <div className="font-mono text-xs tracking-widest text-red-600">
                      0{i + 1}
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-gray-900">
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-gray-600 mt-3 leading-relaxed flex-1">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/services"
              data-testid="core-services-link"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 hover:text-red-600 hover:border-red-600 transition-colors"
            >
              See full service details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <DfaReviewBanner />

      {/* WHY / CAPABILITIES */}
      <section className="border-b border-gray-200 bg-white" data-testid="section-why">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl mb-16">
            <div className="text-sm md:text-[15px] tracking-widest text-black uppercase font-bold mb-4">
              Why Choose Goodtron
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-tight font-semibold text-black leading-[1.1]">
              Small team. Serious about your build.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((v, i) => (
              <div
                key={v.t}
                data-testid={`why-${i}`}
                className="bg-white border border-gray-200 flex flex-col overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-gray-200 bg-gray-100">
                  <img
                    src={v.img}
                    alt={v.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-7 flex flex-col flex-1">
                  <div className="w-10 h-10 border border-gray-300 flex items-center justify-center text-black mb-5">
                    <v.icon size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-black leading-snug">
                    {v.t}
                  </h3>
                  <p className="text-[15px] text-black/80 mt-3 leading-relaxed flex-1">
                    {v.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudies />

      {/* SHORT COMPANY INTRO */}
      <section className="border-b border-gray-200 bg-white" data-testid="section-about">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-6">
              <div className="text-sm md:text-[15px] tracking-widest text-red-600 uppercase font-bold mb-4">
                About Goodtron
              </div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-tight font-semibold text-gray-900 leading-[1.1]">
                Built for small builds. Serious about the work.
              </h2>
              <div className="mt-8 space-y-5 text-lg text-gray-600 leading-relaxed">
                <p>
                  Goodtron Electronics is a small, founder-led electronics
                  assembly company based in Vista, California. We focus on SMT
                  and PCB assembly for prototype and low-volume production —
                  treating early-stage projects with the same care and
                  documentation we apply to larger runs.
                </p>
                <p>
                  What we commit to today is responsive communication, careful
                  project review, and practical execution on the builds we take
                  on.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  ["Location", "Vista, CA"],
                  ["Focus", "Prototype & LV"],
                  ["Team", "Founder-led"],
                ].map(([k, v]) => (
                  <div key={k} className="border-l-2 border-red-600 pl-4">
                    <div className="text-xs tracking-widest text-red-600 uppercase font-bold">{k}</div>
                    <div className="mt-1 text-gray-900 text-sm font-medium">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {[PCB_IMAGES.aboutHero, PCB_IMAGES.aboutPrototype, PCB_IMAGES.aboutHands].map(
                  (src, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden border border-gray-200 ${
                        i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                      }`}
                    >
                      <img
                        src={src}
                        alt="Goodtron Electronics — assembly workspace and PCB detail"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="border-b border-gray-200 bg-[#F9FAFB] scroll-mt-32" data-testid="section-support">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl mb-16">
            <div className="text-sm md:text-[15px] tracking-widest text-black uppercase font-bold mb-4">
              Support
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-tight font-semibold text-black leading-[1.1]">
              Two direct channels — customer service and technical support.
            </h2>
            <p className="mt-5 text-lg text-black/80 leading-relaxed">
              Reach the right person from the start. Whether you&apos;re following up
              on an order or need engineering input on a build, we keep both
              paths open and responsive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-testid="support-customer"
              className="bg-white border border-gray-200 p-10"
            >
              <div className="w-12 h-12 border border-gray-300 flex items-center justify-center text-black mb-8">
                <Headphones size={20} />
              </div>
              <div className="text-xs tracking-[0.18em] uppercase text-black/70 font-semibold mb-3">
                01 · Customer Service
              </div>
              <h3 className="text-2xl font-semibold text-black">
                Customer Service
              </h3>
              <p className="mt-4 text-[15px] text-black/80 leading-relaxed">
                Quote follow-ups, order status, delivery coordination, and any
                general inquiry about working with us. If you have a question
                about your project or paperwork, this is the right door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact-form"
                  data-testid="support-customer-contact"
                  className="btn-primary"
                >
                  Contact Form <ArrowUpRight size={14} />
                </Link>
                <Link
                  to="/quote"
                  data-testid="support-customer-quote"
                  className="btn-secondary"
                >
                  Quote Form <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="mt-6 pt-5 border-t border-gray-200 space-y-2">
                <a
                  href={`tel:${SITE.phoneHref}`}
                  data-testid="support-customer-phone"
                  className="flex items-center gap-3 text-[14px] text-black hover:underline"
                >
                  <Phone size={14} className="text-black" />
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="support-customer-email"
                  className="flex items-center gap-3 text-[14px] text-black hover:underline"
                >
                  <Mail size={14} className="text-black" />
                  {SITE.email}
                </a>
              </div>
            </div>

            <div
              data-testid="support-technical"
              className="bg-white border border-gray-200 p-10"
            >
              <div className="w-12 h-12 border border-gray-300 flex items-center justify-center text-black mb-8">
                <Wrench size={20} />
              </div>
              <div className="text-xs tracking-[0.18em] uppercase text-black/70 font-semibold mb-3">
                02 · Technical Support
              </div>
              <h3 className="text-2xl font-semibold text-black">
                Technical Support
              </h3>
              <p className="mt-4 text-[15px] text-black/80 leading-relaxed">
                BOM review questions, Gerber / design file issues, manufacturability
                feedback, and hands-on discussion of assembly, rework, or
                inspection details on your build.
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${SITE.phoneHref}`}
                  data-testid="support-technical-phone"
                  className="flex items-center gap-3 text-[15px] text-black hover:underline"
                >
                  <Phone size={16} className="text-black" />
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="support-technical-email"
                  className="flex items-center gap-3 text-[15px] text-black hover:underline"
                >
                  <Mail size={16} className="text-black" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMBEDDED RFQ */}
      <section id="rfq" className="bg-[#0A0A0A] relative overflow-hidden scroll-mt-32" data-testid="section-rfq">
        <div className="absolute inset-0 gt-grid-bg-dark opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 text-white">
              <div className="text-sm md:text-[15px] tracking-widest text-red-500 uppercase font-bold mb-4">
                Request a Quote
              </div>
              <h2 className="font-display text-3xl lg:text-5xl tracking-tight font-semibold leading-tight">
                Have a board to build? Get a quote in 24 hours.
              </h2>
              <p className="mt-5 text-gray-400 text-lg leading-relaxed">
                Drop your Gerber, BOM, and centroid files, pick a quantity and
                turnaround, and an engineer replies directly — no sales pressure.
              </p>
              <div className="mt-8 text-sm text-gray-400 font-mono tracking-wider space-y-1">
                <div>{SITE.email}</div>
                <div>{SITE.phone}</div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <RfqForm testId="home-rfq" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
