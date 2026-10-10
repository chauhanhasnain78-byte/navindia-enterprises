import React from "react";
import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${companyConfig.name} in Mumbai, India for industrial product quotations and export enquiries.`,
};

export default function ContactPlaceholderPage() {
  return (
    <section className="py-16 sm:py-24 bg-steel-light/50 min-h-[70vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-silver bg-white p-6 sm:p-10 shadow-card">
          <span className="inline-flex items-center rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
            Contact &bull; Full Page Coming Soon
          </span>

          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-navy">
            Contact {companyConfig.name}
          </h1>

          <p className="mt-3 text-base text-steel leading-relaxed">
            Reach us directly via phone, WhatsApp, or email with your industrial product specifications.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-silver/80 bg-steel-light/35 p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-steel">
                Phone / WhatsApp
              </span>
              <a
                href={`tel:${companyConfig.phoneRaw}`}
                className="mt-1 inline-block text-base font-bold text-navy hover:text-amber-accent transition-colors"
              >
                {companyConfig.phone}
              </a>
            </div>

            <div className="rounded-xl border border-silver/80 bg-steel-light/35 p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-steel">
                Email
              </span>
              <a
                href={`mailto:${companyConfig.email}`}
                className="mt-1 inline-block text-base font-bold text-navy hover:text-amber-accent transition-colors break-all"
              >
                {companyConfig.email}
              </a>
            </div>

            <div className="rounded-xl border border-silver/80 bg-steel-light/35 p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-steel">
                Registered Address
              </span>
              <address className="mt-1 not-italic text-sm sm:text-base font-medium text-navy leading-relaxed">
                {companyConfig.address}
              </address>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Button href="/rfq" variant="primary" size="lg">
              Get a Quote
            </Button>
            <Button href={companyConfig.whatsappUrl} external variant="outline-dark" size="lg">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
