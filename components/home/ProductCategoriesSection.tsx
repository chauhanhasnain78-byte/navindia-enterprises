"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Button } from "@/components/ui/Button";

export function ProductCategoriesSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return companyConfig.categories;
    return companyConfig.categories.filter((cat) => {
      const inName = cat.name.toLowerCase().includes(query);
      const inDesc = cat.description.toLowerCase().includes(query);
      const inKeywords = cat.keywords.some((k) =>
        k.toLowerCase().includes(query)
      );
      return inName || inDesc || inKeywords;
    });
  }, [searchQuery]);

  return (
    <section
      id="products"
      className="py-16 sm:py-24 bg-steel-light/50 border-b border-silver/60"
    >
      <Container>
        <SectionHeading
          eyebrow="Product Categories"
          title="Industrial Supplies Arranged to Your Specification"
          subtitle="Browse our core industrial product groups or search below to send us your custom requirement."
        />

        {/* Categories: 2 side-by-side on mobile & tablet, 4 per row on desktop */}
        {filteredCategories.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredCategories.map((category, index) => {
              // If odd total on mobile/tablet (e.g. 7 categories), let the last card span 2 columns in landscape style on mobile so the grid is completely balanced
              const isLastOddCard =
                filteredCategories.length % 2 === 1 &&
                index === filteredCategories.length - 1;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.06, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ willChange: "transform, opacity" }}
                  className={
                    isLastOddCard
                      ? "col-span-2 lg:col-span-1 h-full"
                      : "col-span-1 h-full"
                  }
                >
                  <CategoryCard category={category} enable3D={true} />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 rounded-xl border border-silver bg-white p-8 text-center shadow-card"
          >
            <p className="text-base font-semibold text-navy">
              No matching category found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="mt-1.5 text-sm text-steel">
              Share your item details or specification directly and we will review it.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button href="/rfq" variant="primary" size="md">
                Tell us what you need
              </Button>
              <Button
                type="button"
                variant="outline-dark"
                size="md"
                onClick={() => setSearchQuery("")}
              >
                Reset Search
              </Button>
            </div>
          </motion.div>
        )}

        {/* Search Bar directly below categories: Search input box above the "Can't find your product?" message */}
        <motion.div
          id="product-search"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="mt-10 rounded-xl border border-silver bg-white p-5 sm:p-6 shadow-card"
        >
          <div className="mx-auto max-w-3xl space-y-4">
            {/* Search Input Box (above message) */}
            <div className="relative w-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="category-search-input"
                type="search"
                aria-label="Can't find your product? Search or tell us what you need."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search product categories (e.g., hoses, fasteners, seals, abrasives, lifting, clamps, bearings, MS/SS)..."
                className="h-12 w-full rounded-md border border-silver bg-steel-light/35 pl-10 pr-4 text-sm sm:text-base text-navy placeholder:text-steel focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-accent"
              />
            </div>

            {/* "Can't find your product?" message and action below the search input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <label
                htmlFor="category-search-input"
                className="text-sm sm:text-base font-bold text-navy"
              >
                Can&apos;t find your product? Search or tell us what you need.
              </label>
              <Button href="/rfq" variant="primary" size="md" className="shrink-0">
                Tell us what you need
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
