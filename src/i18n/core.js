import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import zh from "@/locales/zh.json";

export const LANGUAGES = [
  { code: "en", htmlLang: "en", label: "EN", name: "English" },
  { code: "ja", htmlLang: "ja", label: "日本語", name: "日本語" },
  { code: "zh", htmlLang: "zh-CN", label: "中文", name: "简体中文" },
];
export const DEFAULT_LANG = "en";
export { PREF_STORAGE_KEY } from "@/i18n/constants";

const DICTS = { en, ja, zh };

const lookup = (dict, key) => key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), dict);
const interpolate = (s, vars) => s.replace(/\{\{(\w+)\}\}/g, (m, k) => (vars[k] != null ? String(vars[k]) : m));

// Fallback chain: requested language → English → defaultValue → "" (never a raw key).
// `count` selects `key_one` / `key_other` before plain `key`.
export const translate = (lang, key, vars = {}) => {
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

export const translateList = (lang, key) => {
  const v = lookup(DICTS[lang], key);
  if (Array.isArray(v)) return v;
  const fallback = lookup(en, key);
  return Array.isArray(fallback) ? fallback : [];
};

export const getI18n = (lang) => ({
  lang,
  htmlLang: LANGUAGES.find((l) => l.code === lang).htmlLang,
  t: (key, vars) => translate(lang, key, vars),
  tl: (key) => translateList(lang, key),
  // English lives at the root; other languages under /ja, /zh.
  href: (path = "/") => localePath(lang, path),
});

// Page URLs always end in "/" (matches the built directories and the sitemap).
const withSlash = (path) => (path.includes("#") || path.endsWith("/") ? path : `${path}/`);
export const localePath = (lang, path = "/") => withSlash(lang === DEFAULT_LANG ? path : `/${lang}${path}`);

// For src/pages/[...lang]/*: English uses an undefined param (no prefix).
export const localeStaticPaths = () =>
  LANGUAGES.map((l) => ({ params: { lang: l.code === DEFAULT_LANG ? undefined : l.code } }));

export const langFromParams = (params) => params.lang ?? DEFAULT_LANG;
