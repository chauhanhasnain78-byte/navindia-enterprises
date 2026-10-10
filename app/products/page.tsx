import React from "react";
import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/cards/CategoryCard";

export const metadata: Metadata = {
  title: "Product Categories",
  description: `Explore the 7 industrial supply categories offered by ${companyConfig.name}.`,
};

export default function ProductsIndexPlaceholderPage() {
  return (
    <section className="py-16 sm:py-24 bg-steel-light/50 min-h-[70vh]">
      <Container>
        <SectionHeading
          eyebrow="Products Overview"
          title="Industrial Product Categories"
          subtitle="Select a category below or send us your custom specification for quotation."
        />
        {/* Flat 2D illustrations here since 3D is strictly reserved for the homepage cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companyConfig.categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              enable3D={false}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
