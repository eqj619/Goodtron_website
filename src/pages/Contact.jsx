import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { RfqForm } from "@/components/RfqForm";

const overline = "text-sm md:text-[15px] tracking-widest uppercase font-bold text-red-600";

export default function Contact() {
  return (
    <div data-testid="page-contact">
      {/* HERO */}
      <section className="relative border-b border-gray-200 bg-white">
        <div className="absolute inset-0 gt-grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-4xl">
            <div className={overline + " mb-6"}>Contact · Request a Quote</div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight font-semibold text-gray-900">
              Ready to discuss your PCB assembly or prototype project?
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Drop your design files, choose a quantity and turnaround, and an
              engineer will reply with a quote or questions within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + CONTACT INFO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="border border-gray-200 p-8 bg-white">
                <div className={overline + " mb-6"}>Reach us directly</div>

                <div className="space-y-6">
                  <a
                    href={`mailto:${SITE.email}`}
                    data-testid="contact-info-email"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Email
                      </div>
                      <div className="mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {SITE.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`tel:${SITE.phoneHref}`}
                    data-testid="contact-info-phone"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Phone
                      </div>
                      <div className="mt-1 text-gray-900 group-hover:text-red-600 transition-colors">
                        {SITE.phone}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4" data-testid="contact-info-address">
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Address
                      </div>
                      <div className="mt-1 text-gray-900">{SITE.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-info-hours">
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-red-600 shrink-0">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm tracking-widest text-gray-500 uppercase font-semibold">
                        Working Hours
                      </div>
                      <div className="mt-1 text-gray-900">{SITE.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border border-gray-200 p-7 bg-[#F9FAFB]">
                <div className={overline + " mb-3"}>Not a quote?</div>
                <p className="text-[15px] text-gray-700 leading-relaxed">
                  For order status, paperwork, or general questions, use our
                  general contact form instead.
                </p>
                <Link to="/contact-form" className="btn-secondary mt-5 text-sm">
                  General Contact Form <ArrowUpRight size={14} />
                </Link>
              </div>
            </aside>

            <div className="lg:col-span-8 order-1 lg:order-2">
              <RfqForm testId="contact-form" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
