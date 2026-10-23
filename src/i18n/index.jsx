import React, { createContext, useContext, useMemo } from "react";
import { getI18n } from "@/i18n/core";

// React islands (forms) receive the page language from Astro as a prop.
const I18nContext = createContext(getI18n("en"));

export const I18nProvider = ({ lang, children }) => {
  const value = useMemo(() => getI18n(lang), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
