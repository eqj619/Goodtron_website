import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      data-testid="page-notfound"
      className="max-w-3xl mx-auto px-6 py-32 text-center"
    >
      <div className="overline mb-6">404</div>
      <h1 className="font-display text-5xl font-semibold text-gray-900">
        Page not found.
      </h1>
      <p className="mt-4 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary mt-10 inline-flex" data-testid="notfound-home">
        Back to Home
      </Link>
    </div>
  );
}
