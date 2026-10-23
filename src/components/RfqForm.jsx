import React, { useId, useRef, useState } from "react";
import { ArrowUpRight, AlertCircle, CheckCircle2, Check, Mail, ShieldCheck } from "lucide-react";
import { submitQuote, submitRfqWithFiles, rfqUploadEnabled } from "@/lib/api";
import { SITE, RFQ_FILES, RFQ_QUANTITIES, RFQ_TURNAROUNDS, DFA_REVIEW } from "@/lib/site";
import { FileDropzone, formatBytes } from "@/components/FileDropzone";
import { useI18n } from "@/i18n";

const fieldBase =
  "mt-2 w-full border rounded-none bg-white px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";
const labelCls = "text-sm md:text-[15px] tracking-widest uppercase font-bold text-gray-900";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = { name: "", email: "", company: "", quantity: "", turnaround: "", notes: "" };

// Values are message keys under rfq.errors.
const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "name";
  if (!form.email.trim()) errors.email = "emailRequired";
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = "emailInvalid";
  if (!form.quantity) errors.quantity = "quantity";
  if (!form.turnaround) errors.turnaround = "turnaround";
  return errors;
};

// Order matters: focus moves to the first invalid field in this order.
const FIELD_ORDER = ["name", "email", "quantity", "turnaround"];

const ChoiceGroup = ({ name, legend, options, value, onChange, error, errorId }) => (
  <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)}>
    <legend className={labelCls}>{legend} *</legend>
    <div className={`mt-2 grid gap-2 ${options.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}>
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            className={`relative flex flex-col items-center justify-center text-center border px-3 py-3 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-red-600/30 ${
              checked ? "border-red-600 bg-red-50 text-red-700" : error ? "border-red-400 bg-white" : "border-gray-300 bg-white hover:border-gray-500"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={checked}
              onChange={() => onChange(o.value)}
              data-field={name}
              data-testid={`rfq-${name}-${o.value}`}
              className="sr-only"
            />
            <span className="text-[15px] font-semibold">{o.label}</span>
            {o.hint && <span className={`text-xs ${checked ? "text-red-600" : "text-gray-500"}`}>{o.hint}</span>}
          </label>
        );
      })}
    </div>
    {error && (
      <p id={errorId} className="mt-2 text-sm text-red-700 flex items-center gap-1.5">
        <AlertCircle size={14} aria-hidden="true" /> {error}
      </p>
    )}
  </fieldset>
);

export const RfqForm = ({ defaultDfa = false, testId = "rfq-form" }) => {
  const { t } = useI18n();
  const uid = useId();
  const id = (k) => `${uid}-${k}`;
  const formRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [dfa, setDfa] = useState(defaultDfa);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [sent, setSent] = useState(null);

  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      setStatus({ state: "invalid", msg: "" });
      formRef.current.querySelector(`[data-field="${first}"]`)?.focus();
      return;
    }

    const turnaround = RFQ_TURNAROUNDS.find((t) => t.value === form.turnaround);
    const timeline = `${turnaround.label} (${turnaround.hint})`;
    const message = [
      `Turnaround: ${timeline}`,
      `Target quantity: ${form.quantity}`,
      `Free BOM & DFA review: ${dfa ? "requested" : "not requested"}`,
      files.length
        ? `Files (${files.length}): ${files.map((f) => `${f.name} (${formatBytes(f.size)})`).join(", ")}`
        : "Files: none attached",
      form.notes.trim() && `Notes: ${form.notes.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      phone: null,
      project_type: dfa ? "Quick-Turn RFQ + BOM & DFA Review" : "Quick-Turn RFQ",
      quantity: form.quantity,
      timeline,
      message,
    };

    setStatus({ state: "loading", msg: "" });
    try {
      if (rfqUploadEnabled && files.length) await submitRfqWithFiles(payload, files);
      else await submitQuote(payload);
      setSent({ name: payload.name, files: rfqUploadEnabled ? [] : files });
      setStatus({ state: "success", msg: "" });
      setForm(EMPTY);
      setFiles([]);
      setDfa(defaultDfa);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setStatus({
        state: "error",
        msg: detail ? String(detail) : t("rfq.sendError", { email: SITE.email }),
      });
    }
  };

  if (status.state === "success") {
    const pending = sent.files;
    return (
      <div data-testid={`${testId}-success`} className="border border-green-600 bg-green-50 p-8 lg:p-10" role="status">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={22} className="text-green-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{t("rfq.success.title", { name: sent.name })}</h3>
            <p className="mt-2 text-[15px] text-gray-700 leading-relaxed">
              {t("rfq.success.body", { hours: t("site.hours", { defaultValue: SITE.hours }) })}
            </p>
            {pending.length > 0 && (
              <div className="mt-6 border border-gray-300 bg-white p-5">
                <div className="font-semibold text-gray-900">{t("rfq.success.filesTitle", { count: pending.length })}</div>
                <p className="mt-1 text-sm text-gray-600">{t("rfq.success.filesBody")}</p>
                <ul className="mt-3 text-sm font-mono text-gray-800 space-y-1">
                  {pending.map((f) => (
                    <li key={f.name + f.size}>{f.name}</li>
                  ))}
                </ul>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(`RFQ files — ${sent.name}`)}`}
                  className="btn-primary mt-4 text-sm"
                >
                  <Mail size={14} /> {t("rfq.success.emailFiles", { email: SITE.email })}
                </a>
              </div>
            )}
            <button
              type="button"
              onClick={() => setStatus({ state: "idle", msg: "" })}
              className="mt-6 text-sm text-gray-700 underline hover:text-red-600"
            >
              {t("rfq.success.another")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const fieldCls = (k) => `${fieldBase} ${errors[k] ? "border-red-500" : "border-gray-300"}`;
  const errText = (k) =>
    errors[k] && (
      <p id={id(`${k}-error`)} className="mt-2 text-sm text-red-700 flex items-center gap-1.5">
        <AlertCircle size={14} aria-hidden="true" /> {t(`rfq.errors.${errors[k]}`)}
      </p>
    );

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      data-testid={testId}
      aria-label={t("rfq.aria")}
      className="border border-gray-200 bg-white p-6 lg:p-10"
    >
      {status.state === "invalid" && errorCount > 0 && (
        <div role="alert" className="mb-8 flex items-start gap-3 border border-red-600 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
          <div>{t("rfq.errorSummary", { count: errorCount })}</div>
        </div>
      )}

      {/* 1 · Files */}
      <section aria-labelledby={id("files-h")}>
        <h3 id={id("files-h")} className="font-display text-xl font-semibold text-gray-900">
          <span className="font-mono text-red-600 mr-2">01</span>{t("rfq.files.heading")}
        </h3>
        <p id={id("files-help")} className="mt-1 text-sm text-gray-600">
          {t("rfq.files.help")}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" data-testid="rfq-file-checklist">
          {RFQ_FILES.map((f) => (
            <li
              key={f.label}
              className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[13px] font-mono ${
                f.required ? "border-gray-900 text-gray-900" : "border-dashed border-gray-400 text-gray-600"
              }`}
            >
              <Check size={13} className={f.required ? "text-red-600" : "text-gray-400"} aria-hidden="true" />
              {t(`rfq.files.items.${f.key}`, { defaultValue: f.label })}
              {!f.required && <span className="text-gray-500">{t("rfq.files.optional")}</span>}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <FileDropzone id={id("files")} files={files} onChange={setFiles} describedBy={id("files-help")} />
        </div>
      </section>

      {/* 2 · Build */}
      <section aria-labelledby={id("build-h")} className="mt-10 pt-8 border-t border-gray-200">
        <h3 id={id("build-h")} className="font-display text-xl font-semibold text-gray-900">
          <span className="font-mono text-red-600 mr-2">02</span>{t("rfq.build.heading")}
        </h3>
        <div className="mt-5 space-y-6">
          <ChoiceGroup
            name="quantity"
            legend={t("rfq.build.quantity")}
            options={RFQ_QUANTITIES.map((q) => ({ value: q, label: q, hint: t("rfq.build.boards") }))}
            value={form.quantity}
            onChange={set("quantity")}
            error={errors.quantity && t(`rfq.errors.${errors.quantity}`)}
            errorId={id("quantity-error")}
          />
          <ChoiceGroup
            name="turnaround"
            legend={t("rfq.build.turnaround")}
            options={RFQ_TURNAROUNDS.map((o) => ({
              value: o.value,
              label: t(`rfq.turnarounds.${o.value}.label`, { defaultValue: o.label }),
              hint: t(`rfq.turnarounds.${o.value}.hint`, { defaultValue: o.hint }),
            }))}
            value={form.turnaround}
            onChange={set("turnaround")}
            error={errors.turnaround && t(`rfq.errors.${errors.turnaround}`)}
            errorId={id("turnaround-error")}
          />
          <label
            className="flex items-start gap-3 border border-gray-200 bg-[#F9FAFB] p-4 cursor-pointer"
            data-testid="rfq-dfa-toggle"
          >
            <input
              type="checkbox"
              checked={dfa}
              onChange={(e) => setDfa(e.target.checked)}
              className="mt-1 h-4 w-4 accent-red-600"
            />
            <span>
              <span className="flex items-center gap-2 font-semibold text-gray-900">
                <ShieldCheck size={16} className="text-red-600" aria-hidden="true" />
                {t("rfq.build.dfaAdd", { title: t("dfa.title", { defaultValue: DFA_REVIEW.title }) })}
              </span>
              <span className="block mt-1 text-sm text-gray-600">
                {t("rfq.build.dfaDesc")}
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* 3 · Contact */}
      <section aria-labelledby={id("contact-h")} className="mt-10 pt-8 border-t border-gray-200">
        <h3 id={id("contact-h")} className="font-display text-xl font-semibold text-gray-900">
          <span className="font-mono text-red-600 mr-2">03</span>{t("rfq.contact.heading")}
        </h3>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor={id("name")} className={labelCls}>{t("rfq.contact.name")} *</label>
            <input
              id={id("name")}
              data-field="name"
              data-testid="rfq-name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? id("name-error") : undefined}
              aria-required="true"
              className={fieldCls("name")}
            />
            {errText("name")}
          </div>
          <div>
            <label htmlFor={id("email")} className={labelCls}>{t("rfq.contact.email")} *</label>
            <input
              id={id("email")}
              type="email"
              data-field="email"
              data-testid="rfq-email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? id("email-error") : undefined}
              aria-required="true"
              placeholder="you@company.com"
              className={fieldCls("email")}
            />
            {errText("email")}
          </div>
          <div className="md:col-span-2">
            <label htmlFor={id("company")} className={labelCls}>{t("rfq.contact.company")}</label>
            <input
              id={id("company")}
              data-testid="rfq-company"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => set("company")(e.target.value)}
              placeholder={t("rfq.contact.optional")}
              className={fieldCls("company")}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor={id("notes")} className={labelCls}>{t("rfq.contact.notes")}</label>
            <textarea
              id={id("notes")}
              data-testid="rfq-notes"
              value={form.notes}
              onChange={(e) => set("notes")(e.target.value)}
              placeholder={t("rfq.contact.notesPlaceholder")}
              className={`${fieldCls("notes")} min-h-[110px] resize-y`}
            />
          </div>
        </div>
      </section>

      {status.state === "error" && (
        <div
          role="alert"
          data-testid={`${testId}-error`}
          className="mt-8 flex items-start gap-3 border border-red-600 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
          <div>{status.msg}</div>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          data-testid={`${testId}-submit`}
          disabled={status.state === "loading"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status.state === "loading" ? t("rfq.sending") : t("rfq.submit")}
          <ArrowUpRight size={16} />
        </button>
        <span className="text-xs text-gray-500 font-mono tracking-wider">
          {t("rfq.footnote")}
        </span>
      </div>
    </form>
  );
};
