import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, AlertCircle, ArrowLeft, FileText, Clock } from "lucide-react";
import { submitQuote } from "@/lib/api";
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
import { SITE } from "@/lib/site";

const QUOTE_TYPES = [
  "Assembly",
  "SMT Assembly",
  "PCB Assembly",
  "Prototype Assembly",
  "Through-Hole Assembly",
  "Low-Volume Production",
  "Box Build",
];

const ATTACHMENTS = [
  "Gerber Data",
  "Schematic (Orcad .DSN, Power Logic, DxDesigner, Altium or PDF)",
  "Assembly Drawings (DWG, DXF or PDF)",
  "BOM (Bill of Materials) with Footprint Data Sheets",
  "All Other Relevant Information",
];

const fieldBase =
  "mt-2 w-full border border-gray-300 rounded-none bg-white px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";

const overline = "text-sm md:text-[15px] tracking-widest uppercase font-bold text-red-600";

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quote_type: "",
    quantity: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.quote_type || !form.message) {
      setStatus({ state: "error", msg: "Please fill in the required fields." });
      return;
    }
    setStatus({ state: "loading", msg: "" });
    try {
      await submitQuote({
        ...form,
        project_type: form.quote_type, // required by backend
        company: form.company || null,
        phone: form.phone || null,
        quantity: form.quantity || null,
        timeline: form.timeline || null,
      });
      setStatus({
        state: "success",
        msg: "Thanks — your quote request was received. We'll return a quote within a few hours (based on product type).",
      });
      setForm({ name: "", company: "", email: "", phone: "", quote_type: "", quantity: "", timeline: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail || "Something went wrong. Please try again.";
      setStatus({ state: "error", msg: String(detail) });
    }
  };

  return (
    <div data-testid="page-quote-form">
      <section className="relative border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <Link
            to="/"
            data-testid="quote-form-back"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 mb-8"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className={overline + " mb-4"}>Customer Service · Quote Form</div>
          <h1 className="font-display text-4xl lg:text-5xl leading-tight tracking-tight font-semibold text-gray-900">
            Request a Quote
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-3xl">
            Please fill out this Quote Form and we will return a quote to you
            within a few hours (based on the type of product being quoted).
          </p>
          <div
            data-testid="quote-form-hours"
            className="mt-6 inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 text-[14px] text-gray-800"
          >
            <Clock size={14} className="text-red-600" />
            <span className="font-semibold text-gray-900">Working Hours:</span>
            <span>{SITE.hours}</span>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <div className="border border-gray-200 p-6 lg:p-8 bg-[#F9FAFB] flex items-start gap-4">
            <div className="w-10 h-10 border border-gray-200 bg-white flex items-center justify-center text-red-600 shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <div className={overline + " mb-3"}>Please attach any of the following for an accurate quote</div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[15px] text-gray-800">
                {ATTACHMENTS.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="text-red-600 font-mono mt-0.5">›</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Attach files by emailing them to{" "}
                <a href={`mailto:${SITE.email}`} className="text-red-600 underline">
                  {SITE.email}
                </a>{" "}
                after submitting this form, and reference your name.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-20">
          <form
            onSubmit={submit}
            noValidate
            data-testid="quote-form"
            className="border border-gray-200 p-6 lg:p-10 bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className={overline}>Quote Type *</Label>
                <Select value={form.quote_type} onValueChange={update("quote_type")}>
                  <SelectTrigger
                    data-testid="quote-type"
                    className="mt-2 w-full rounded-none border-gray-300 bg-white py-6 focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                  >
                    <SelectValue placeholder="Select quote type" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUOTE_TYPES.map((t) => (
                      <SelectItem key={t} value={t} data-testid={`quote-type-${t.toLowerCase().replace(/\s+/g,'-')}`}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="qf-quantity" className={overline}>Quantity</Label>
                <Input
                  id="qf-quantity"
                  data-testid="quote-quantity"
                  value={form.quantity}
                  onChange={update("quantity")}
                  className={fieldBase}
                  placeholder="e.g. 5, 50, 250"
                />
              </div>
              <div>
                <Label htmlFor="qf-name" className={overline}>Name *</Label>
                <Input
                  id="qf-name"
                  data-testid="quote-name"
                  value={form.name}
                  onChange={update("name")}
                  className={fieldBase}
                  required
                />
              </div>
              <div>
                <Label htmlFor="qf-company" className={overline}>Company</Label>
                <Input
                  id="qf-company"
                  data-testid="quote-company"
                  value={form.company}
                  onChange={update("company")}
                  className={fieldBase}
                />
              </div>
              <div>
                <Label htmlFor="qf-email" className={overline}>Email *</Label>
                <Input
                  id="qf-email"
                  type="email"
                  data-testid="quote-email"
                  value={form.email}
                  onChange={update("email")}
                  className={fieldBase}
                  required
                />
              </div>
              <div>
                <Label htmlFor="qf-phone" className={overline}>Phone</Label>
                <Input
                  id="qf-phone"
                  data-testid="quote-phone"
                  value={form.phone}
                  onChange={update("phone")}
                  className={fieldBase}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="qf-timeline" className={overline}>Timeline</Label>
                <Input
                  id="qf-timeline"
                  data-testid="quote-timeline"
                  value={form.timeline}
                  onChange={update("timeline")}
                  className={fieldBase}
                  placeholder="e.g. First article in 3 weeks"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="qf-message" className={overline}>Project Details / Message *</Label>
                <Textarea
                  id="qf-message"
                  data-testid="quote-message"
                  value={form.message}
                  onChange={update("message")}
                  className={`${fieldBase} min-h-[160px] resize-y`}
                  placeholder="Describe the product being quoted — board size, complexity, mixed technology, anything unusual."
                  required
                />
              </div>
            </div>

            {status.state === "error" && (
              <div
                data-testid="quote-error"
                className="mt-6 flex items-start gap-3 border border-red-600 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div>{status.msg}</div>
              </div>
            )}
            {status.state === "success" && (
              <div
                data-testid="quote-success"
                className="mt-6 flex items-start gap-3 border border-green-600 bg-green-50 p-5 text-sm text-green-800"
              >
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <div>{status.msg}</div>
              </div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                data-testid="quote-submit"
                disabled={status.state === "loading"}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.state === "loading" ? "Submitting…" : "Submit Quote Request"}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
