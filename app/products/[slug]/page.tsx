import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CategoryStaticIcon } from "@/components/cards/CategoryStaticIcon";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return companyConfig.categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = companyConfig.categories.find(
    (c) => c.slug === params.slug
  );
  if (!category) {
    return {
      title: "Category Coming Soon",
    };
  }
  return {
    title: `${category.name} — Coming Soon`,
    description: category.description,
  };
}

export default function ProductCategoryPlaceholderPage({
  params,
}: CategoryPageProps) {
  const category = companyConfig.categories.find(
    (c) => c.slug === params.slug
  );

  if (!category) {
    notFound();
  }

  return (
    <section className="py-16 sm:py-24 bg-steel-light/50 min-h-[70vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-silver bg-white p-6 sm:p-10 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
              Coming soon
            </span>
            <Link
              href="/#products"
              className="text-xs font-semibold uppercase tracking-wider text-steel hover:text-navy transition-colors"
            >
              &larr; All Categories
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-steel-light/70 border border-silver/60">
              <CategoryStaticIcon
                shapeType={category.shapeType}
                className="h-14 w-14"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy">
                {category.name}
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-steel">
                {category.description}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-silver/70 bg-steel-light/30 p-4 text-sm text-steel leading-relaxed">
            Detailed catalogue pages for <strong>{category.name}</strong> are coming soon. You can submit your required sizes, grades, drawings, and quantities right away for a tailored quotation.
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Button href="/rfq" variant="primary" size="lg">
              Get a Quote
            </Button>
            <Button href={companyConfig.whatsappUrl} external variant="outline-dark" size="lg">
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
