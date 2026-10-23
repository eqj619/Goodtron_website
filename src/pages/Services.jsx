import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  CircuitBoard,
  Cpu,
  Layers,
  Boxes,
  Wrench,
} from "lucide-react";

const SERVICE_BLOCKS = [
  {
    slug: "smt-assembly",
    tag: "01",
    icon: CircuitBoard,
    title: "SMT Assembly",
    intro:
      "Surface-mount assembly for modern board designs — from 0402 passives through fine-pitch ICs. Handled with careful setup, documented process notes, and post-reflow inspection.",
    bullets: [
      "0402 passives through fine-pitch ICs",
      "DEK stencil printing for solder paste",
      "Lead-free reflow soldering",
      "Documented setup and process notes",
      "Post-reflow visual inspection",
    ],
    img: "/assets/pcb-3.jpg",
    imgAlt: "Close-up of a densely populated SMT board with fine-pitch components",
  },
  {
    slug: "pcb-assembly",
    tag: "02",
    icon: Cpu,
    title: "PCB Assembly",
    intro:
      "Full PCBA support — from receiving your BOM and Gerber files to shipping a working, inspected board. We review carefully up front, so you don't get surprises later.",
    bullets: [
      "BOM validation & footprint sanity checks",
      "Long-lead part flagging on quote",
      "Mixed SMT + through-hole builds",
      "Visual inspection on every board",
      "Clear traveler documentation",
    ],
    img: "/assets/pcb-1.jpg",
    imgAlt: "Fully assembled printed circuit board with populated components",
  },
  {
    slug: "prototype-builds",
    tag: "03",
    icon: Layers,
    title: "Prototype Builds",
    intro:
      "First-article and early-revision prototypes handled seriously — the same review, sourcing, and inspection process we apply to larger runs.",
    bullets: [
      "Single-board and small first-article runs",
      "Fast iteration between rev A → rev B",
      "Engineering-aware questions on your BOM",
      "Honest feedback on manufacturability",
    ],
    img: "/assets/about-2.jpg",
    imgAlt: "Prototype board with jumper wires and multimeter during an early build",
  },
  {
    slug: "low-volume-production",
    tag: "04",
    icon: Boxes,
    title: "Low-Volume Production",
    intro:
      "Consistent small and mid-volume runs — the same process notes, documentation, and inspection on every board, so quality stays repeatable as you scale.",
    bullets: [
      "Small and mid-batch production",
      "Repeatable process notes & travelers",
      "Coordinated build planning",
      "Visual inspection & final QC",
    ],
    img: "/assets/about-1.jpg",
    imgAlt: "Close-up of a production-quality assembled PCB with a large IC in focus",
  },
  {
    slug: "through-hole-mixed",
    tag: "05",
    icon: Wrench,
    title: "Through-Hole & Mixed-Technology Support",
    intro:
      "Mixed and hand-soldered assembly — connectors, power components, and boards that combine SMT with through-hole parts on the same build.",
    bullets: [
      "Hand-soldered through-hole assembly",
      "Mixed SMT + THT builds",
      "Hot-air rework on populated boards",
      "Microscope inspection for fine-pitch",
    ],
    img: "/assets/about-3.jpg",
    imgAlt: "Hand soldering a through-hole component onto a populated PCB",
  },
];

const EQUIPMENT = [
  {
    name: "Yamaha YS12",
    role: "Mid-speed SMT placement",
    body: "Handles a broad component range from 0402 passives to fine-pitch ICs — well-suited to prototype and low-volume PCB assembly runs.",
    img: "/assets/facility-1.jpg",
    alt: "Yamaha YS12 SMT placement machine",
  },
  {
    name: "Yamaha YS12F",
    role: "Flexible SMT placement",
    body: "Second placement head paired with the YS12 to support mixed builds and give us flexibility across different board sizes and setups.",
    img: "/assets/facility-ys12f.jpg",
    alt: "Yamaha YS12F flexible SMT placement machine",
  },
  {
    name: "Vitronics Soltec Reflow",
    role: "Lead-free reflow soldering",
    body: "Controlled, lead-free-compatible reflow profiles for reliable solder joints on both prototype and small-batch builds.",
    img: "/assets/facility-reflow.jpg",
    alt: "Vitronics Soltec reflow oven",
  },
  {
    name: "Inspection & Rework",
    role: "Microscope inspection and rework",
    body: "Digital microscope stations for fine-pitch inspection and a hot-air rework setup for touch-ups on populated boards.",
    img: "/assets/facility-4.jpg",
    alt: "Microscope inspection and rework workstation",
  },
];

export default function Services() {
  return (
    <div data-testid="page-services">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="text-sm md:text-base tracking-widest text-black uppercase font-bold mb-6">
              Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight font-semibold text-black">
              Electronics assembly services built around{" "}
              <span className="text-red-600">your project</span>, not a production queue.
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-black/80 leading-relaxed max-w-3xl">
              Goodtron Electronics is a small, founder-led shop focused on SMT
              and PCB assembly for prototype and low-volume production. Below
              are the services we deliver in-house from Vista, California.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" data-testid="services-hero-cta" className="btn-primary">
                Request a Quote <ArrowUpRight size={16} />
              </Link>
              <a
                href="#smt-assembly"
                data-testid="services-hero-jump"
                className="btn-secondary"
              >
                Browse Services <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE OVERVIEW STRIP */}
      <section className="border-b border-gray-200 bg-white" data-testid="services-overview">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-200 border border-gray-200">
            {SERVICE_BLOCKS.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                data-testid={`services-overview-${s.slug}`}
                className="bg-white p-6 flex flex-col gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 border border-gray-300 flex items-center justify-center text-black">
                  <s.icon size={16} />
                </div>
                <div className="text-xs tracking-[0.18em] uppercase text-black/70 font-semibold">
                  Service {s.tag}
                </div>
                <div className="text-base font-semibold text-black leading-snug">
                  {s.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE BLOCKS — alternating image/content */}
      {SERVICE_BLOCKS.map((s, i) => {
        const reverse = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            data-testid={`service-block-${s.slug}`}
            className={`border-b border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"} scroll-mt-24`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-6">
                  <div className="border border-gray-200 overflow-hidden bg-white">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={s.img}
                        alt={s.imgAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 border border-gray-300 bg-white flex items-center justify-center text-black">
                      <s.icon size={20} />
                    </div>
                    <div className="text-xs tracking-[0.18em] uppercase text-black/70 font-semibold">
                      Service · {s.tag}
                    </div>
                  </div>
                  <h2 className="text-3xl lg:text-4xl tracking-tight font-semibold text-black leading-tight">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-lg text-black/80 leading-relaxed">
                    {s.intro}
                  </p>
                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] text-black">
                        <span className="text-black mt-0.5">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9">
                    <Link
                      to="/contact"
                      data-testid={`service-cta-${s.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-black border-b border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors"
                    >
                      Start a quote for {s.title} <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* EQUIPMENT SECTION — supporting capability, moved to bottom */}
      <section
        id="equipment"
        data-testid="section-equipment"
        className="border-b border-gray-200 bg-[#F5F5F5] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
          <div className="max-w-3xl mb-14">
            <div className="text-sm md:text-[15px] tracking-widest text-black uppercase font-bold mb-4">
              Production Capability
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-tight font-semibold text-black leading-[1.1]">
              Our SMT line &amp; equipment.
            </h2>
            <p className="mt-5 text-lg text-black/80 leading-relaxed">
              The equipment behind the services above — flexible enough for
              small prototype runs and repeatable enough for low-volume
              production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EQUIPMENT.map((e) => (
              <div
                key={e.name}
                data-testid={`equipment-${e.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="bg-white border border-gray-200 overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-gray-200 bg-gray-100">
                  <img
                    src={e.img}
                    alt={e.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  <div className="text-xs tracking-[0.18em] uppercase text-black/70 font-semibold mb-2">
                    {e.role}
                  </div>
                  <h3 className="text-xl font-semibold text-black">{e.name}</h3>
                  <p className="mt-3 text-[15px] text-black/80 leading-relaxed">
                    {e.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="absolute inset-0 gt-grid-bg-dark opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="text-sm md:text-[15px] tracking-widest text-red-500 uppercase font-bold mb-4">
                Not sure which service fits?
              </div>
              <h2 className="text-3xl lg:text-5xl tracking-tight font-semibold leading-tight">
                Send what you have. We&apos;ll help scope the right path.
              </h2>
              <p className="mt-5 text-gray-400 text-lg leading-relaxed max-w-2xl">
                BOM, Gerber files, a short description — anything works as a
                starting point. We reply directly, not through a sales funnel.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                data-testid="services-bottom-cta"
                className="btn-primary"
              >
                Request a Quote <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
