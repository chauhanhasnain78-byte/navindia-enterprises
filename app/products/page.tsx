import React from "react";
import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { SpecificRequirementBand } from "@/components/products/SpecificRequirementBand";

export const metadata: Metadata = {
  title: "Industrial Product Categories",
  description:
    "Explore the 9 industrial product categories supplied by NAV INDIA ENTERPRISES — hoses, fasteners, seals & O-rings, abrasives, lifting & rigging, clamps, bearings, MS/SS products, and industrial supplies.",
};

export default function ProductsAllCategoriesPage() {
  return (
    <section className="py-12 sm:py-20 bg-steel-light/50 min-h-[75vh]">
      <Container>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Products" }]}
        />

        <SectionHeading
          eyebrow="Products Overview"
          title="Industrial Product Categories"
          subtitle="Select a product category below to browse specifications and submit your requirement for quotation."
          align="left"
        />

        {/* 3 per row on large screens (9 cards), 2 on tablet/mobile */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {companyConfig.categories.map((category, index) => {
            const isLastOddOnMobile =
              companyConfig.categories.length % 2 === 1 &&
              index === companyConfig.categories.length - 1;

            return (
              <div
                key={category.id}
                className={
                  isLastOddOnMobile
                    ? "col-span-2 lg:col-span-1 h-full"
                    : "col-span-1 h-full"
                }
              >
                <CategoryCard category={category} enable3D={false} />
              </div>
            );
          })}
        </div>

        <SpecificRequirementBand />
      </Container>
    </section>
  );
}
