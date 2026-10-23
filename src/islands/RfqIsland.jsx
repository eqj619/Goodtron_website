import React from "react";
import { I18nProvider } from "@/i18n";
import { RfqForm } from "@/components/RfqForm";

export default function RfqIsland({ lang, ...props }) {
  return (
    <I18nProvider lang={lang}>
      <RfqForm {...props} />
    </I18nProvider>
  );
}
