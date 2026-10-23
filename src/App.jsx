import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import ContactForm from "@/pages/ContactForm";
import QuoteForm from "@/pages/QuoteForm";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/quote-form" element={<QuoteForm />} />
          {/* Legacy paths → Home */}
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/capabilities" element={<Navigate to="/services" replace />} />
          <Route path="/process" element={<Navigate to="/services" replace />} />
          <Route path="/industries" element={<Navigate to="/" replace />} />
          <Route path="/faq" element={<Navigate to="/" replace />} />
          <Route path="/careers" element={<Navigate to="/" replace />} />
          <Route path="/join-us" element={<Navigate to="/" replace />} />
          <Route path="/quote" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
