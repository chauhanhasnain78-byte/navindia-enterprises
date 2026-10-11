import React, { Suspense } from "react";
import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { RfqSpecSummary } from "@/components/products/RfqSpecSummary";

export const metadata: Metadata = {
  title: "Request a Quote (RFQ)",
  description: `Send your industrial product specifications to ${companyConfig.name} for a quotation.`,
};

export default function RfqPage() {
  return (
    <section className="py-12 sm:py-20 bg-steel-light/50 min-h-[75vh]">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Request a Quote (RFQ)" },
          ]}
        />

        <Suspense
          fallback={
            <div className="mx-auto max-w-3xl rounded-2xl border border-silver bg-white p-8 shadow-card">
              <p className="text-sm font-semibold text-steel">
                Loading specification summary...
              </p>
            </div>
          }
        >
          <RfqSpecSummary />
        </Suspense>
      </Container>
    </section>
  );
}
