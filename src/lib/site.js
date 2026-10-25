export const SITE = {
  name: "Goodtron Electronics",
  brand: { red: "GOODTRON", tail: "Electronics" },
  email: "info@goodtronsmt.com",
  directEmail: "raymond@goodtron.com",
  phone: "+1 909-871-5566",
  phoneHref: "+19098715566",
  address: "943 Poinsettia Ave, Suite 402, Vista, CA 92081",
  hours: "Mon – Fri · 8:00 AM – 4:30 PM (PST)",
  tagline:
    "Responsive PCB Assembly & SMT support for prototype and low-volume projects.",
};

// `key` selects the translated label (nav.<key>) and the data-testid.
export const NAV = [
  { to: "/", key: "home", label: "Home" },
  { to: "/services", key: "services", label: "Services" },
  { to: "/#support", key: "support", label: "Support" },
  { to: "/contact", key: "contact", label: "Contact Us" },
];

export const PCB_IMAGES = {
  hero: "/assets/hero-smt.jpg",
  smt: "/assets/pcb-1.jpg",
  pcb: "/assets/pcb-2.jpg",
  prototype: "/assets/pcb-4.jpg",
  lowvolume: "/assets/pcb-3.jpg",
  detail1: "/assets/pcb-1.jpg",
  detail2: "/assets/pcb-4.jpg",
  detail3: "/assets/pcb-2.jpg",
  whyCommunication: "/assets/why-communication.jpg",
  whyPrototype: "/assets/why-prototype.jpg",
  whyReview: "/assets/why-review.jpg",
  whyInspection: "/assets/pcb-4.jpg",
  aboutHero: "/assets/about-1.jpg",
  aboutPrototype: "/assets/about-2.jpg",
  aboutHands: "/assets/about-3.jpg",
};

export const EQUIPMENT = [
  {
    img: "/assets/facility-1.jpg",
    name: "Yamaha YS12 & YS12F Placement",
    role: "Mid-speed component placement",
    body: "Our Yamaha YS12 and YS12F mid-speed placement machines handle a broad component range — from 0402 passives to fine-pitch ICs — well-suited to prototype and low-volume PCB assembly.",
  },
  {
    img: "/assets/facility-reflow.jpg",
    name: "Vitronics Soltec Reflow Oven",
    role: "Lead-free reflow soldering",
    body: "Our Vitronics Soltec reflow oven provides controlled, lead-free-compatible reflow profiles for reliable solder joints on both prototype and small-batch builds.",
  },
];

export const GALLERY = [
  { img: "/assets/facility-1.jpg", caption: "Yamaha YS12 SMT line" },
  { img: "/assets/facility-reflow.jpg", caption: "Vitronics Soltec reflow oven" },
];

export const SERVICES = [
  {
    slug: "smt-assembly",
    title: "SMT Assembly",
    summary:
      "Surface-mount assembly for modern board designs — fine-pitch ICs, passives, and mixed-technology builds.",
    for: "Hardware teams needing dependable SMT placement for prototype boards and early production runs.",
    solves: "Replaces slow, error-prone manual assembly for modern SMD designs with a coordinated, reviewed build flow.",
  },
  {
    slug: "pcb-assembly",
    title: "PCB Assembly",
    summary:
      "Full PCB assembly support with careful BOM review, part sourcing coordination, and clear build planning.",
    for: "Engineers and OEM teams who need a responsive partner that treats a small order seriously.",
    solves: "Removes friction between design intent and a working, assembled board — without large-factory overhead.",
  },
  {
    slug: "prototype-assembly",
    title: "Prototype Assembly",
    summary:
      "First-article and prototype builds with attention to footprints, polarity, and documentation accuracy.",
    for: "Early-stage hardware teams iterating from rev A → rev B with tight timelines.",
    solves: "Reduces the gap between your schematic and a testable board in hand.",
  },
  {
    slug: "through-hole-assembly",
    title: "Through-Hole Assembly",
    summary:
      "Mixed and hand-soldered through-hole support — connectors, power components, and reworked legacy designs.",
    for: "Products that combine THT and SMT, or legacy assemblies that still depend on through-hole parts.",
    solves: "Keeps mixed-technology boards buildable without fragmenting vendors across multiple shops.",
  },
  {
    slug: "low-volume-production",
    title: "Low-Volume Production",
    summary:
      "Small and medium batches built with consistent process notes, traveler documentation, and visual inspection.",
    for: "Founders and product teams scaling from prototype runs toward early market pilots.",
    solves: "Gives you production-grade repeatability without being pushed to the end of a large factory queue.",
  },
  {
    slug: "box-build",
    title: "Box Build Support",
    summary:
      "Sub-assembly, cabling, enclosure fit-up, and basic electromechanical integration support.",
    for: "Teams shipping devices, not just bare boards — IoT products, control units, small appliances.",
    solves: "Moves you from an assembled PCBA to a closer-to-finished device in one coordinated flow.",
  },
];

export const PROCESS_STEPS = [
  { n: "01", t: "Send RFQ / BOM / Gerber", d: "Share your BOM, Gerber, assembly drawings and any notes. We treat every inquiry seriously — even single-board prototypes." },
  { n: "02", t: "Project Review", d: "We review the design, flag footprint or BOM issues early, and ask clarifying questions before quoting." },
  { n: "03", t: "Quote Confirmation", d: "You receive a clear, itemized quote with assumptions stated. No hidden surprises, no aggressive sales pressure." },
  { n: "04", t: "Build Planning", d: "We coordinate parts, confirm long-lead items, and align on the build schedule with you directly." },
  { n: "05", t: "Assembly Coordination", d: "Boards are assembled with documented process notes, visual inspection, and progress updates during the run." },
  { n: "06", t: "Delivery Support", d: "Packaged, labeled, and shipped with clear traveler information — with follow-up on first-article feedback." },
];

export const INDUSTRIES = [
  { t: "Industrial Electronics", d: "Control boards, sensor interfaces, and supporting assemblies for industrial equipment." },
  { t: "Consumer Electronics", d: "Small-batch builds for early consumer hardware iterations before scaling." },
  { t: "Smart Devices / IoT", d: "Connected product prototypes with mixed-technology boards and sub-assemblies." },
  { t: "Early-Stage Hardware", d: "Founders validating a first product — from first article to a short pilot run." },
  { t: "Control Systems", d: "Purpose-built PCBA for monitoring, automation, and instrumentation projects." },
];

export const FAQ_ITEMS = [
  {
    q: "What files do I need to send for a quote?",
    a: "At minimum, your BOM (with manufacturer part numbers), Gerber files, a pick-and-place file if available, and any assembly drawings or notes. If you're early in the design phase, send what you have and we'll work from there.",
  },
  {
    q: "Do you support prototype builds?",
    a: "Yes — prototype and early-revision builds are a core part of what we do. We treat single-board and small prototype runs with the same care as larger orders.",
  },
  {
    q: "Can you help with low-volume production?",
    a: "Yes. We support low-volume production runs with consistent process notes, visual inspection, and traveler documentation so builds stay repeatable as you scale.",
  },
  {
    q: "What kinds of projects are a good fit?",
    a: "Prototype PCBA, low-to-mid volume SMT and mixed-technology assemblies, box-build sub-assemblies, and teams that value direct, engineering-aware communication over a sales-heavy process.",
  },
  {
    q: "How do I get started?",
    a: "Send a quote request via our Request a Quote page with a short description and your files — or email us directly. We'll respond with questions or a structured quote.",
  },
  {
    q: "Are you a large factory?",
    a: "No — and we're upfront about that. Goodtron Electronics is a small, founder-led team focused on responsive communication and practical project coordination for prototype and low-volume work.",
  },
];

// ---------------------------------------------------------------------------
// Conversion content. Every capability / certification claim on the site is
// defined here so it can be verified in one place before publishing.
// ---------------------------------------------------------------------------

export const QUICK_TURN = {
  headline: "24–72 Hour Quick-Turn SMT & Prototype Assembly",
  short: "24–72h Quick-Turn SMT",
  detail: "Fast turns on ECOs and Rev-A / Rev-B builds",
  cta: "Get a Fast Quote in 24h",
};

export const QUALITY_BADGES = [
  {
    key: "aoi",
    group: "Inspection",
    label: "AOI",
    title: "Automated Optical Inspection",
    micro: "Checks placement, polarity & solder joints",
    body: "Automated optical inspection after reflow catches missing, shifted, or reversed parts and solder defects before boards leave the line.",
  },
  {
    key: "xray",
    group: "Inspection",
    label: "X-Ray",
    title: "X-Ray Inspection",
    micro: "Verifies hidden BGA / QFN joints",
    body: "X-ray verification of BGA, QFN, and other bottom-terminated packages where solder joints can't be seen optically.",
  },
  {
    key: "visual",
    group: "Inspection",
    label: "Visual QC",
    title: "High-Magnification Visual QC",
    micro: "Microscope review of fine-pitch work",
    body: "Digital-microscope inspection of fine-pitch leads, 0201 passives, and reworked joints by the people who built the board.",
  },
  {
    key: "ipc",
    group: "Standards",
    label: "IPC-A-610",
    title: "IPC-A-610 Class 2 & Class 3",
    micro: "Workmanship to Class 2 or Class 3 on request",
    body: "Builds inspected to IPC-A-610 acceptability criteria — Class 2 by default, Class 3 for high-reliability products when specified on the RFQ.",
  },
  {
    key: "iso13485",
    group: "Standards",
    label: "ISO 13485",
    title: "ISO 13485-Aligned Process",
    micro: "MedTech-ready documentation & traceability",
    body: "Process documentation, lot traceability, and travelers aligned with ISO 13485 expectations for medical-device prototypes.",
  },
  {
    key: "itar",
    group: "Standards",
    label: "ITAR",
    title: "ITAR / Defense Prototyping Readiness",
    micro: "U.S.-based build & controlled data handling",
    body: "U.S.-only facility and staff with controlled handling of design data for defense and aerospace prototype work.",
  },
];

export const DFA_REVIEW = {
  title: "Free Pre-Build BOM & DFA Risk Review",
  pitch:
    "Avoid costly assembly delays before placing your order. Submit your BOM and receive a Free Pre-Build BOM & DFA (Design for Assembly) Risk Review from our engineering team within 24 hours.",
  benefits: [
    { t: "Obsolescence & lifecycle check", d: "EOL, NRND, and last-time-buy parts flagged against your BOM." },
    { t: "Footprint / package mismatch detection", d: "Land patterns compared with the MPN's package before parts are bought." },
    { t: "Local procurement lead-time flags", d: "Long-lead and allocation-risk parts identified, with alternates suggested." },
  ],
  cta: "Get My Free BOM & DFA Review",
  short: "Free BOM & DFA Check",
};

export const RFQ_FILES = [
  { key: "gerber", label: "Gerber (RS-274X) / ODB++", required: true },
  { key: "bom", label: "BOM (CSV/Excel with MPN)", required: true },
  { key: "centroid", label: "Centroid / Pick & Place (XY)", required: true },
  { key: "drawings", label: "Assembly Drawings / Notes", required: false },
];

export const RFQ_QUANTITIES = ["1–5", "5–25", "25–100", "100+"];

export const RFQ_TURNAROUNDS = [
  { value: "24h", label: "24 Hours", hint: "Quick-turn" },
  { value: "3-day", label: "3 Days", hint: "Expedited" },
  { value: "standard", label: "Standard", hint: "1–2 weeks" },
];
