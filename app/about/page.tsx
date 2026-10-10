import React from "react";
import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${companyConfig.name} — ${companyConfig.positioningSummary}`,
};

export default function AboutPlaceholderPage() {
  return (
    <section className="py-16 sm:py-24 bg-steel-light/50 min-h-[70vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-silver bg-white p-6 sm:p-10 shadow-card">
          <span className="inline-flex items-center rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
            Coming Soon
          </span>

          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-navy">
            About {companyConfig.name}
          </h1>

          <p className="mt-4 text-base text-steel leading-relaxed">
            {companyConfig.name} is an industrial products manufacturing, trading and export company based in Mumbai, India. Full company profile content is coming soon in the next phase.
          </p>

          <p className="mt-3 text-base font-semibold text-navy">
            &ldquo;{companyConfig.tagline}&rdquo;
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Button href="/rfq" variant="primary" size="lg">
              Get a Quote
            </Button>
            <Button href="/contact" variant="outline-dark" size="lg">
              Contact Details
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
