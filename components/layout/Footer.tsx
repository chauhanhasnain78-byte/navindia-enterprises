import React from "react";
import Link from "next/link";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-steel-light border-t border-white/10 pb-24 md:pb-12">
      <Container className="pt-14 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand, Tagline & CTA (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo theme="dark" />
            <p className="text-base font-semibold text-white tracking-tight">
              {companyConfig.tagline}
            </p>
            <p className="text-sm text-steel-light/80 leading-relaxed max-w-sm">
              {companyConfig.positioningSummary}
            </p>
            <div className="pt-2">
              <Button href="/rfq" variant="primary" size="md">
                Get a Quote
              </Button>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {companyConfig.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-steel-light/80 transition-colors hover:text-amber-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/rfq"
                  className="text-amber-accent font-medium transition-colors hover:underline"
                >
                  Request a Quote (RFQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Product Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {companyConfig.categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-steel-light/80 transition-colors hover:text-amber-accent line-clamp-1"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Details
            </h3>
            <div className="space-y-3 text-sm text-steel-light/85">
              <div>
                <span className="block text-xs uppercase tracking-wider text-steel">
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${companyConfig.phoneRaw}`}
                  className="mt-0.5 inline-block font-medium text-white hover:text-amber-accent transition-colors"
                >
                  {companyConfig.phone}
                </a>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider text-steel">
                  Email
                </span>
                <a
                  href={`mailto:${companyConfig.email}`}
                  className="mt-0.5 inline-block font-medium text-white hover:text-amber-accent transition-colors break-all"
                >
                  {companyConfig.email}
                </a>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider text-steel">
                  Address
                </span>
                <address className="mt-0.5 not-italic leading-relaxed text-steel-light/85">
                  {companyConfig.address}
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Marked Placeholder Area for Registration / Certification Details */}
        <div className="mt-12 rounded-lg border border-dashed border-white/15 bg-navy/60 px-4 py-3 text-xs text-steel-light/75">
          <span className="font-semibold text-amber-accent uppercase tracking-wider mr-2">
            Official Details:
          </span>
          <span>{companyConfig.registrationPlaceholder}</span>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-steel-light/65">
          <p>
            &copy; {new Date().getFullYear()} {companyConfig.name}. All rights reserved.
          </p>
          <p>{companyConfig.worldSupplyNote}</p>
        </div>
      </Container>
    </footer>
  );
}
