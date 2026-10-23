import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "@/components/Logo";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Custom active-state resolver so hash-anchor items (e.g. Support -> /#support)
  // don't light up whenever pathname is "/". Hash items are only active when the
  // URL hash matches; path-only items ignore hash entirely.
  const isNavActive = (to) => {
    const [targetPath, targetHash = ""] = to.split("#");
    if (targetHash) {
      return location.pathname === (targetPath || "/") && location.hash === `#${targetHash}`;
    }
    // Exact match for "/" home, prefix match for others (matches NavLink default)
    if (targetPath === "/") return location.pathname === "/" && !location.hash;
    return location.pathname === targetPath || location.pathname.startsWith(targetPath + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-gray-200"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.filter((n) => n.to !== "/").map((item) => {
              const active = isNavActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-red-600" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/quote"
              data-testid="header-cta-quote"
              className="btn-primary text-sm"
            >
              Request a Quote
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-gray-900"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden border-t border-gray-200 bg-white"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = isNavActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    if (item.to === "/" && window.location.pathname === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  className={`py-3 border-b border-gray-100 text-base font-medium ${
                    active ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/quote"
              data-testid="mobile-cta-quote"
              className="btn-primary mt-4 justify-center"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
