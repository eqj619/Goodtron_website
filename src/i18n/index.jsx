import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import zh from "@/locales/zh.json";

export const LANGUAGES = [
  { code: "en", htmlLang: "en", label: "EN", name: "English" },
  { code: "ja", htmlLang: "ja", label: "日本語", name: "日本語" },
  { code: "zh", htmlLang: "zh-CN", label: "中文", name: "简体中文" },
];

const DICTS = { en, ja, zh };
const STORAGE_KEY = "gt-lang";

const lookup = (dict, key) => key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), dict);
const interpolate = (s, vars) => s.replace(/\{\{(\w+)\}\}/g, (m, k) => (vars[k] != null ? String(vars[k]) : m));

// Fallback chain: current language → English → defaultValue → "" (never a raw key).
// `count` selects `key_one` / `key_other` before plain `key`.
const translate = (lang, key, vars = {}) => {
  const keys = vars.count == null ? [key] : [`${key}_${vars.count === 1 ? "one" : "other"}`, key];
  for (const dict of [DICTS[lang], en]) {
    for (const k of keys) {
      const v = lookup(dict, k);
      if (typeof v === "string") return interpolate(v, vars);
    }
  }
  if (vars.defaultValue != null) return interpolate(vars.defaultValue, vars);
  if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${key}`);
  return "";
};

const translateList = (lang, key) => {
  const v = lookup(DICTS[lang], key);
  if (Array.isArray(v)) return v;
  const fallback = lookup(en, key);
  return Array.isArray(fallback) ? fallback : [];
};

const readStored = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return DICTS[v] ? v : "en";
  } catch {
    return "en";
  }
};

const I18nContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readStored);

  const setLang = useCallback((code) => {
    if (!DICTS[code]) return;
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage blocked (private mode etc.) — the choice still applies for this visit.
    }
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      tl: (key) => translateList(lang, key),
    }),
    [lang, setLang],
  );

  useEffect(() => {
    document.documentElement.lang = LANGUAGES.find((l) => l.code === lang).htmlLang;
    document.title = translate(lang, "meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(lang, "meta.description"));
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
