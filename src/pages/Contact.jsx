import React, { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { submitQuote } from "@/lib/api";
import { SITE } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROJECT_TYPES = [
  "SMT Assembly",
  "PCB Assembly",
  "Prototype Assembly",
  "Through-Hole Assembly",
  "Low-Volume Production",
  "Box Build",
  "Other / General inquiry",
];

const fieldBase =
  "mt-2 w-full border border-gray-300 rounded-none bg-white px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";

const overline = "text-sm md:text-[15px] tracking-widest uppercase font-bold text-red-600";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project_type: "",
    quantity: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.project_type || !form.message) {
      setStatus({ state: "error", msg: "Please fill in the required fields." });
      return;
    }
    setStatus({ state: "loading", msg: "" });
    try {
      await submitQuote({
        ...form,
        company: form.company || null,
        phone: form.phone || null,
        quantity: form.quantity || null,
        timeline: form.timeline || null,
      });
      setStatus({
        state: "success",
        msg: "Thanks — your request was received. We'll reply directly, usually within one business day.",
      });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        project_type: "",
        quantity: "",
        timeline: "",
        message: "",
      });
    } catch (err) {
      const detail =
        err?.response?.data?.detail || "Something went wrong. Please try again.";
      setStatus({ state: "error", msg: String(detail) });
    }
  };

  return (
    <div data-testid="page-contact">
      {/* HERO */}
      <section className="relative border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-4xl">
            <div className={overline + " mb-6"}>Contact · Request a Quote</div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight font-semibold text-gray-900">
              Ready to discuss your PCB assembly or prototype project?
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Send us your project details below and we'll follow up directly.
              Whether it's a formal RFQ or a general question, use the same
              form — most inquiries are answered within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + CONTACT INFO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="border border-gray-200 p-8 bg-white">
                <div className={overline + " mb-6"}>Reach us directly</div>

                <div className="space-y-6">
                  <a
                    href={`mailto:${SITE.email}`}
                    data-testid="contact-info-email"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Email
                      </div>
                      <div className="mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {SITE.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`tel:${SITE.phoneHref}`}
                    data-testid="contact-info-phone"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Phone
                      </div>
                      <div className="mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {SITE.phone}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4" data-testid="contact-info-address">
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Address
                      </div>
                      <div className="mt-1 text-gray-900">{SITE.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-info-hours">
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Working Hours
                      </div>
                      <div className="mt-1 text-gray-900">{SITE.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border border-gray-200 p-7 bg-[#F9FAFB]">
                <div className={overline + " mb-3"}>What to include</div>
                <ul className="space-y-3 text-[15px] text-gray-800">
                  {[
                    "Gerber files or design package",
                    "BOM with manufacturer part numbers",
                    "Pick-and-place file (if available)",
                    "Quantity and timeline expectations",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="text-red-600 font-mono">›</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                  Files too large for the form? After submitting, email them to{" "}
                  <a href={`mailto:${SITE.email}`} className="text-red-600 underline">
                    {SITE.email}
                  </a>{" "}
                  and reference your name.
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8 order-1 lg:order-2">
              <form
                onSubmit={submit}
                data-testid="contact-form"
                className="border border-gray-200 p-6 lg:p-10 bg-white"
                noValidate
              >
                <div className={overline + " mb-6"}>Project details</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className={overline}>Name *</Label>
                    <Input
                      id="name"
                      data-testid="contact-name"
                      value={form.name}
                      onChange={update("name")}
                      className={fieldBase}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className={overline}>Company</Label>
                    <Input
                      id="company"
                      data-testid="contact-company"
                      value={form.company}
                      onChange={update("company")}
                      className={fieldBase}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className={overline}>Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      data-testid="contact-email"
                      value={form.email}
                      onChange={update("email")}
                      className={fieldBase}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className={overline}>Phone</Label>
                    <Input
                      id="phone"
                      data-testid="contact-phone"
                      value={form.phone}
                      onChange={update("phone")}
                      className={fieldBase}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label className={overline}>Project Type *</Label>
                    <Select value={form.project_type} onValueChange={update("project_type")}>
                      <SelectTrigger
                        data-testid="contact-project-type"
                        className="mt-2 w-full rounded-none border-gray-300 bg-white py-6 focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                      >
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROJECT_TYPES.map((t) => (
                          <SelectItem key={t} value={t} data-testid={`contact-ptype-${t}`}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity" className={overline}>Quantity</Label>
                    <Input
                      id="quantity"
                      data-testid="contact-quantity"
                      value={form.quantity}
                      onChange={update("quantity")}
                      className={fieldBase}
                      placeholder="e.g. 5, 50, 250"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="timeline" className={overline}>Timeline</Label>
                    <Input
                      id="timeline"
                      data-testid="contact-timeline"
                      value={form.timeline}
                      onChange={update("timeline")}
                      className={fieldBase}
                      placeholder="e.g. First article in 3 weeks, pilot run Q2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="message" className={overline}>Project Details / Message *</Label>
                    <Textarea
                      id="message"
                      data-testid="contact-message"
                      value={form.message}
                      onChange={update("message")}
                      className={`${fieldBase} min-h-[160px] resize-y`}
                      placeholder="Describe your project: board size, complexity, mixed technology, anything unusual. You can email BOM/Gerber files after submitting."
                      required
                    />
                  </div>
                </div>

                {status.state === "error" && (
                  <div
                    data-testid="contact-error"
                    className="mt-6 flex items-start gap-3 border border-red-600 bg-red-50 p-4 text-sm text-red-700"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <div>{status.msg}</div>
                  </div>
                )}
                {status.state === "success" && (
                  <div
                    data-testid="contact-success"
                    className="mt-6 flex items-start gap-3 border border-green-600 bg-green-50 p-5 text-sm text-green-800"
                  >
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <div>{status.msg}</div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    data-testid="contact-submit"
                    disabled={status.state === "loading"}
                    className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status.state === "loading" ? "Submitting…" : "Send Request"}
                    <ArrowUpRight size={16} />
                  </button>
                  <span className="text-xs text-gray-500 font-mono tracking-wider">
                    We typically reply within one business day.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
