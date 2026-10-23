import React, { useState } from "react";
import { CloudUpload, FileArchive, FileText, X } from "lucide-react";
import { useI18n } from "@/i18n";

const ACCEPTED_EXT = [
  "zip", "7z", "rar", "tgz", "gz",
  "gerber", "gbr", "ger", "gtl", "gbl", "gto", "gbo", "gts", "gbs", "gtp", "gbp", "gko", "gm1", "drl", "xln",
  "csv", "xls", "xlsx", "txt", "pos",
  "pdf", "dxf", "dwg",
];
const MAX_FILES = 10;
const MAX_BYTES = 25 * 1024 * 1024;

export const formatBytes = (n) =>
  n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;

const extOf = (name) => name.split(".").pop().toLowerCase();

export const FileDropzone = ({ id, files, onChange, describedBy }) => {
  const { t } = useI18n();
  const [dragging, setDragging] = useState(false);
  const [rejected, setRejected] = useState([]);

  const addFiles = (incoming) => {
    const next = [...files];
    const problems = [];
    for (const f of incoming) {
      if (!ACCEPTED_EXT.includes(extOf(f.name))) {
        problems.push(t("rfq.dropzone.unsupported", { name: f.name }));
      } else if (f.size > MAX_BYTES) {
        problems.push(t("rfq.dropzone.tooLarge", { name: f.name }));
      } else if (next.length >= MAX_FILES) {
        problems.push(t("rfq.dropzone.tooMany", { name: f.name, max: MAX_FILES }));
      } else if (!next.some((x) => x.name === f.name && x.size === f.size)) {
        next.push(f);
      }
    }
    setRejected(problems);
    onChange(next);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div>
      <label
        htmlFor={id}
        data-testid="rfq-dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center text-center gap-3 border-2 border-dashed px-6 py-10 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-red-600/30 focus-within:border-red-600 ${
          dragging ? "border-red-600 bg-red-50" : "border-gray-300 bg-[#F9FAFB] hover:border-gray-500"
        }`}
      >
        <CloudUpload size={30} className={dragging ? "text-red-600" : "text-gray-500"} aria-hidden="true" />
        <span className="text-[15px] text-gray-900">
          <span className="font-semibold">{t("rfq.dropzone.drag")}</span> {t("rfq.dropzone.or")}{" "}
          <span className="text-red-600 underline">{t("rfq.dropzone.browse")}</span>
        </span>
        <span className="text-xs text-gray-500 font-mono tracking-wide">
          {t("rfq.dropzone.limits", { types: ".zip · Gerber · .csv · .xlsx · .pdf", max: MAX_FILES })}
        </span>
        <input
          id={id}
          type="file"
          multiple
          accept={ACCEPTED_EXT.map((x) => `.${x}`).join(",")}
          aria-describedby={describedBy}
          className="sr-only"
          onChange={(e) => {
            addFiles(Array.from(e.target.files));
            e.target.value = "";
          }}
        />
      </label>

      {rejected.length > 0 && (
        <ul role="alert" className="mt-3 space-y-1 text-sm text-red-700" data-testid="rfq-file-errors">
          {rejected.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-gray-200 border border-gray-200" aria-label={t("rfq.dropzone.attached")} data-testid="rfq-file-list">
          {files.map((f) => {
            const Icon = ["zip", "7z", "rar", "tgz", "gz"].includes(extOf(f.name)) ? FileArchive : FileText;
            return (
              <li key={f.name + f.size} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <Icon size={16} className="text-gray-500 shrink-0" aria-hidden="true" />
                <span className="flex-1 truncate text-gray-900">{f.name}</span>
                <span className="text-xs text-gray-500 font-mono">{formatBytes(f.size)}</span>
                <button
                  type="button"
                  onClick={() => onChange(files.filter((x) => x !== f))}
                  aria-label={t("rfq.dropzone.remove", { name: f.name })}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
