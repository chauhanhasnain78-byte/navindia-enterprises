import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { companyConfig } from "@/config/company";
import {
  catalogProducts,
  getCategoryBySlug,
  getProductBySlugs,
  getRelatedCategories,
} from "@/data/catalog";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { ProductVisual } from "@/components/products/ProductVisual";
import { RequirementBox } from "@/components/products/RequirementBox";
import { SourceAndQualityBlock } from "@/components/products/SourceAndQualityBlock";
import { CrossSellSection } from "@/components/products/CrossSellSection";
import { SpecificRequirementBand } from "@/components/products/SpecificRequirementBand";

export const dynamicParams = false;

interface ProductPageProps {
  params: {
    category: string;
    product: string;
  };
}

export function generateStaticParams() {
  return catalogProducts.map((item) => ({
    category: item.categorySlug,
    product: item.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlugs(params.category, params.product);
  const category = getCategoryBySlug(params.category);

  if (!product || !category) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: `${product.summary} ${companyConfig.trust.indicativeSpecNotice}`,
    alternates: {
      canonical: `${companyConfig.siteUrl}/products/${category.slug}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${companyConfig.name}`,
      description: product.summary,
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const category = getCategoryBySlug(params.category);
  const product = getProductBySlugs(params.category, params.product);

  if (!category || !product) {
    notFound();
  }

  const relatedCategories = getRelatedCategories(category.slug);

  // Product structured data without price (no "manufacturer" property for non-in-house categories)
  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: category.name,
    image: `${companyConfig.siteUrl}${product.imagePath}`,
    brand: {
      "@type": "Brand",
      name: companyConfig.name,
    },
    ...(category.manufacturingStatus === "Manufactured in-house"
      ? {
          manufacturer: {
            "@type": "Organization",
            name: companyConfig.name,
          },
        }
      : {}),
  };

  return (
    <section className="py-12 sm:py-20 bg-steel-light/50 min-h-[75vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Container>
        {/* 1. Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: category.name, href: `/products/${category.slug}` },
            { label: product.name },
          ]}
        />

        {/* 2. Two Columns (stacked on mobile, visual first) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: ProductVisual (swappable slot) + Product Overview */}
          <div className="lg:col-span-6 space-y-6">
            <ProductVisual
              productName={product.name}
              imagePath={product.imagePath}
              shapeType={category.shapeType}
            />

            <div className="rounded-2xl border border-silver bg-white p-5 sm:p-7 shadow-card space-y-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                  {category.manufacturingStatus}
                </span>
                <span className="inline-flex items-center rounded-full bg-steel-light px-3 py-1 text-xs font-semibold text-steel">
                  {category.name}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-steel leading-relaxed">
                {product.summary}
              </p>

              {product.pageNote && (
                <div className="rounded-xl border border-amber-accent/40 bg-amber-accent/10 px-4 py-3 text-xs sm:text-sm font-medium text-navy leading-relaxed">
                  {product.pageNote}
                </div>
              )}

              <p className="border-t border-silver/60 pt-3 text-xs font-semibold text-steel">
                {companyConfig.trust.indicativeSpecNotice}
              </p>
            </div>
          </div>

          {/* Right Column: Requirement Box */}
          <div className="lg:col-span-6">
            <RequirementBox product={product} categoryName={category.name} />
          </div>
        </div>

        {/* 3. Source and Quality Block */}
        <SourceAndQualityBlock
          category={category}
          standards={product.standards}
        />

        {/* 4. Cross-sell: Also needed for the same project? */}
        <CrossSellSection
          heading="Also needed for the same project?"
          subtitle="Combine related categories into a single consolidated enquiry."
          categories={relatedCategories}
        />

        {/* 5. Looking for something specific? Tell us what you need. */}
        <SpecificRequirementBand categoryName={category.name} />
      </Container>
    </section>
  );
}
