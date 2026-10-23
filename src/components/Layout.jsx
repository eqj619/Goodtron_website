import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Layout = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const skipNextRef = useRef(false);

  useEffect(() => {
    // Skip the scroll pass triggered by our own hash-cleanup navigate()
    if (skipNextRef.current) {
      skipNextRef.current = false;
      return;
    }

    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // Clear the hash from the URL so future Home / Logo clicks don't re-anchor
          setTimeout(() => {
            skipNextRef.current = true;
            navigate(pathname, { replace: true });
          }, 800);
          return;
        }
        if (attempts++ < 20) {
          setTimeout(tryScroll, 50);
        }
      };
      tryScroll();
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, navigate]);

  return (
    <div className="App min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
