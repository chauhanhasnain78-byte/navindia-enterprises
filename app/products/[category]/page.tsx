import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { companyConfig } from "@/config/company";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getRelatedCategories,
} from "@/data/catalog";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { CrossSellSection } from "@/components/products/CrossSellSection";
import { SpecificRequirementBand } from "@/components/products/SpecificRequirementBand";

export const dynamicParams = false;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return companyConfig.categories.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.name,
    description: `${category.description} Request a quotation from ${companyConfig.name}.`,
    alternates: {
      canonical: `${companyConfig.siteUrl}/products/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | ${companyConfig.name}`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);
  const relatedCategories = getRelatedCategories(category.slug);

  return (
    <section className="py-12 sm:py-20 bg-steel-light/50 min-h-[75vh]">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: category.name },
          ]}
        />

        {/* Category Header */}
        <div className="rounded-2xl border border-silver bg-white p-6 sm:p-8 shadow-card">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
              {category.manufacturingStatus}
            </span>
            <span className="inline-flex items-center rounded-full bg-steel-light px-3 py-1 text-xs font-semibold text-steel">
              {products.length} {products.length === 1 ? "Product Group" : "Product Groups"}
            </span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-navy">
            {category.name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm sm:text-base text-steel leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              shapeType={category.shapeType}
              index={index}
            />
          ))}
        </div>

        {/* Related Categories Cross-Sell */}
        <CrossSellSection
          heading="Also needed for the same project?"
          subtitle="Combine related industrial product categories into a single quotation request."
          categories={relatedCategories}
        />

        {/* Looking for something specific? Tell us what you need. */}
        <SpecificRequirementBand categoryName={category.name} />
      </Container>
    </section>
  );
}
