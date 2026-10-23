import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, AlertCircle, ArrowLeft, Clock } from "lucide-react";
import { submitContact } from "@/lib/api";
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

const FEEDBACK_TYPES = ["Suggestion", "Comment", "Question"];

const fieldBase =
  "mt-2 w-full border border-gray-300 rounded-none bg-white px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";

const overline = "text-sm md:text-[15px] tracking-widest uppercase font-bold text-red-600";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    feedback_type: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.feedback_type || !form.message) {
      setStatus({ state: "error", msg: "Please fill in all required fields." });
      return;
    }
    setStatus({ state: "loading", msg: "" });
    try {
      await submitContact({
        ...form,
        company: form.company || null,
        subject: form.subject || null,
      });
      setStatus({
        state: "success",
        msg: "Thanks — we received your message and will reply directly.",
      });
      setForm({ name: "", email: "", company: "", feedback_type: "", subject: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail || "Something went wrong. Please try again.";
      setStatus({ state: "error", msg: String(detail) });
    }
  };

  return (
    <div data-testid="page-contact-form">
      <section className="relative border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <Link
            to="/"
            data-testid="contact-form-back"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 mb-8"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className={overline + " mb-4"}>Customer Service · Contact Form</div>
          <h1 className="font-display text-4xl lg:text-5xl leading-tight tracking-tight font-semibold text-gray-900">
            Send us a message.
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-2xl">
            Have a suggestion, a comment, or a question? Use this form and we'll
            reply directly.
          </p>
          <div
            data-testid="contact-form-hours"
            className="mt-6 inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 text-[14px] text-gray-800"
          >
            <Clock size={14} className="text-red-600" />
            <span className="font-semibold text-gray-900">Working Hours:</span>
            <span>{SITE.hours}</span>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <form
            onSubmit={submit}
            noValidate
            data-testid="contact-form"
            className="border border-gray-200 p-6 lg:p-10 bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className={overline}>Feedback Type *</Label>
                <Select value={form.feedback_type} onValueChange={update("feedback_type")}>
                  <SelectTrigger
                    data-testid="contact-feedback-type"
                    className="mt-2 w-full rounded-none border-gray-300 bg-white py-6 focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                  >
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FEEDBACK_TYPES.map((t) => (
                      <SelectItem
                        key={t}
                        value={t}
                        data-testid={`contact-feedback-${t.toLowerCase()}`}
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cf-subject" className={overline}>Subject</Label>
                <Input
                  id="cf-subject"
                  data-testid="contact-subject"
                  value={form.subject}
                  onChange={update("subject")}
                  className={fieldBase}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="cf-name" className={overline}>Name *</Label>
                <Input
                  id="cf-name"
                  data-testid="contact-name"
                  value={form.name}
                  onChange={update("name")}
                  className={fieldBase}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cf-email" className={overline}>Email *</Label>
                <Input
                  id="cf-email"
                  type="email"
                  data-testid="contact-email"
                  value={form.email}
                  onChange={update("email")}
                  className={fieldBase}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="cf-company" className={overline}>Company</Label>
                <Input
                  id="cf-company"
                  data-testid="contact-company"
                  value={form.company}
                  onChange={update("company")}
                  className={fieldBase}
                  placeholder="Optional"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="cf-message" className={overline}>Message *</Label>
                <Textarea
                  id="cf-message"
                  data-testid="contact-message"
                  value={form.message}
                  onChange={update("message")}
                  className={`${fieldBase} min-h-[160px] resize-y`}
                  placeholder="How can we help?"
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

            <div className="mt-8">
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={status.state === "loading"}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.state === "loading" ? "Sending…" : "Send Message"}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
