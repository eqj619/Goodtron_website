import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import path from "node:path";

const REDIRECTS = {
  "/capabilities": "/services/",
  "/process": "/services/",
  "/industries": "/",
  "/faq": "/",
  "/careers": "/",
  "/join-us": "/",
  "/quote-form": "/quote/",
};

export default defineConfig({
  site: "https://goodtronsmt.com",
  trailingSlash: "always",
  redirects: REDIRECTS,
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", ja: "ja", zh: "zh-CN" } },
      filter: (page) => !Object.keys(REDIRECTS).some((from) => new URL(page).pathname.startsWith(from)),
    }),
  ],
  vite: {
    resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  },
});
