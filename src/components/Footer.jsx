import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#0A0A0A] text-gray-300 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo-mark.png?v=6"
                alt=""
                aria-hidden="true"
                className="h-11 w-auto"
              />
              <div className="font-display text-2xl font-bold tracking-tight">
                <span style={{ color: "#DC2626" }}>GOODTRON</span>{" "}
                <span className="text-white text-sm font-medium">Electronics</span>
              </div>
            </div>
            <p className="mt-5 text-gray-400 text-[15px] leading-relaxed max-w-md">
              SMT & PCB assembly, prototype builds, and low-volume production —
              from Vista, California.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-sm md:text-[15px] tracking-widest text-red-500 uppercase font-bold mb-4">
              Navigate
            </div>
            <ul className="space-y-2 text-[15px]">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    data-testid={`footer-link-${n.label.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-sm md:text-[15px] tracking-widest text-red-500 uppercase font-bold mb-4">
              Contact
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="footer-email"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-red-500" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  data-testid="footer-phone"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-red-500" />
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300" data-testid="footer-address">
                <MapPin size={14} className="text-red-500 mt-1 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300" data-testid="footer-hours">
                <Clock size={14} className="text-red-500 mt-1 shrink-0" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Goodtron Electronics. All rights reserved.</div>
          <div className="font-mono tracking-wider">PCB · SMT · PROTOTYPE · LOW-VOLUME</div>
        </div>
      </div>
    </footer>
  );
};
