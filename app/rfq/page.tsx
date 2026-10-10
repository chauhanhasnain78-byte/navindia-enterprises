import React from "react";
import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Request a Quote (RFQ)",
  description: `Send your industrial product specifications to ${companyConfig.name} for a quotation.`,
};

export default function RfqPlaceholderPage() {
  return (
    <section className="py-16 sm:py-24 bg-steel-light/50 min-h-[70vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-silver bg-white p-6 sm:p-10 shadow-card">
          <span className="inline-flex items-center rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
            Phase 1 Placeholder
          </span>

          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-navy">
            RFQ form coming soon
          </h1>

          <p className="mt-3 text-base text-steel leading-relaxed">
            Our interactive multi-item online quotation form is being prepared for the next phase. In the meantime, please send your product specifications, drawings, and quantities directly via WhatsApp or email.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-silver/80 bg-steel-light/35 p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-steel">
                WhatsApp / Phone
              </span>
              <a
                href={companyConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-base font-bold text-navy hover:text-amber-accent transition-colors"
              >
                {companyConfig.phone}
              </a>
            </div>

            <div className="rounded-xl border border-silver/80 bg-steel-light/35 p-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-steel">
                Email Enquiry
              </span>
              <a
                href={`mailto:${companyConfig.email}?subject=${encodeURIComponent(
                  "RFQ Enquiry - NAV INDIA ENTERPRISES"
                )}`}
                className="mt-1 inline-block text-base font-bold text-navy hover:text-amber-accent transition-colors break-all"
              >
                {companyConfig.email}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Button href={companyConfig.whatsappUrl} external variant="primary" size="lg">
              Send Requirement on WhatsApp
            </Button>
            <Button
              href={`mailto:${companyConfig.email}?subject=${encodeURIComponent(
                "RFQ Enquiry - NAV INDIA ENTERPRISES"
              )}`}
              variant="outline-dark"
              size="lg"
            >
              Email Your Specification
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
