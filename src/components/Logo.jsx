import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ size = "md", onClick, variant = "light" }) => {
  const h = size === "lg" ? "h-14" : "h-11";
  const tailColor = variant === "dark" ? "text-white" : "text-gray-900";
  const handleClick = (e) => {
    // If already on the home page, force a smooth scroll to top since
    // react-router won't re-fire the location effect for same-location clicks.
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onClick?.(e);
  };
  return (
    <Link
      to="/"
      onClick={handleClick}
      data-testid="brand-logo"
      className="flex items-center gap-3 select-none"
      aria-label="Goodtron Electronics"
    >
      <img
        src="/assets/logo-mark.png?v=6"
        alt=""
        aria-hidden="true"
        draggable="false"
        className={`${h} w-auto`}
      />
      <span className="font-display leading-none flex items-baseline gap-2">
        <span
          className="font-bold tracking-tight text-xl lg:text-[22px]"
          style={{ color: "#DC2626" }}
        >
          GOODTRON
        </span>
        <span className={`${tailColor} text-[11px] lg:text-xs font-semibold tracking-[0.18em] uppercase`}>
          Electronics
        </span>
      </span>
    </Link>
  );
};
