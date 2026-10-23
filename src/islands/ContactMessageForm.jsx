import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/lib/api";

const FEEDBACK_TYPES = ["Suggestion", "Comment", "Question"];

const fieldBase =
  "mt-2 w-full border border-gray-300 rounded-none bg-white px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";

const overline = "text-sm md:text-[15px] tracking-widest uppercase font-bold text-red-600";

const EMPTY = { name: "", email: "", company: "", feedback_type: "", subject: "", message: "" };

export default function ContactMessageForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

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
      setStatus({ state: "success", msg: "Thanks — we received your message and will reply directly." });
      setForm(EMPTY);
    } catch (err) {
      const detail = err?.response?.data?.detail || "Something went wrong. Please try again.";
      setStatus({ state: "error", msg: String(detail) });
    }
  };

  return (
    <form onSubmit={submit} noValidate data-testid="contact-form" className="border border-gray-200 p-6 lg:p-10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-type" className={overline}>Feedback Type *</label>
          <select
            id="cf-type"
            data-testid="contact-feedback-type"
            value={form.feedback_type}
            onChange={update("feedback_type")}
            className={`${fieldBase} ${form.feedback_type ? "" : "text-gray-400"}`}
            required
          >
            <option value="" disabled>
              Select feedback type
            </option>
            {FEEDBACK_TYPES.map((t) => (
              <option key={t} value={t} className="text-gray-900">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-subject" className={overline}>Subject</label>
          <input id="cf-subject" data-testid="contact-subject" value={form.subject} onChange={update("subject")} className={fieldBase} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="cf-name" className={overline}>Name *</label>
          <input id="cf-name" data-testid="contact-name" autoComplete="name" value={form.name} onChange={update("name")} className={fieldBase} required />
        </div>
        <div>
          <label htmlFor="cf-email" className={overline}>Email *</label>
          <input id="cf-email" type="email" data-testid="contact-email" autoComplete="email" value={form.email} onChange={update("email")} className={fieldBase} required />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-company" className={overline}>Company</label>
          <input id="cf-company" data-testid="contact-company" autoComplete="organization" value={form.company} onChange={update("company")} className={fieldBase} placeholder="Optional" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-message" className={overline}>Message *</label>
          <textarea
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
        <div role="alert" data-testid="contact-error" className="mt-6 flex items-start gap-3 border border-red-600 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
          <div>{status.msg}</div>
        </div>
      )}
      {status.state === "success" && (
        <div role="status" data-testid="contact-success" className="mt-6 flex items-start gap-3 border border-green-600 bg-green-50 p-5 text-sm text-green-800">
          <CheckCircle2 size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
          <div>{status.msg}</div>
        </div>
      )}

      <div className="mt-8">
        <button type="submit" data-testid="contact-submit" disabled={status.state === "loading"} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
          {status.state === "loading" ? "Sending…" : "Send Message"}
          <ArrowUpRight size={16} />
        </button>
      </div>
    </form>
  );
}
