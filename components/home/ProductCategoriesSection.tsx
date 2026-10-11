"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Button } from "@/components/ui/Button";

export function ProductCategoriesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scrollHorizontal = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const distance = direction === "left" ? -290 : 290;
    scrollContainerRef.current.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };

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

        {/* Categories: Horizontally swipeable on mobile (<768px), 2 cols on tablet, 4 cols on desktop */}
        {filteredCategories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div
              ref={scrollContainerRef}
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x pan-y",
              }}
              className="flex flex-nowrap md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full overflow-x-auto md:overflow-visible pb-4 pt-1 snap-x snap-mandatory"
            >
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="w-[78vw] max-w-[290px] flex-none snap-start md:w-auto md:max-w-none md:flex-initial"
                >
                  <CategoryCard category={category} enable3D={true} />
                </div>
              ))}
            </div>

            {/* Mobile Swipe Controls (<768px) */}
            <div className="mt-3 flex items-center justify-between md:hidden">
              <p className="text-xs font-semibold text-steel">
                Swipe left/right or tap arrows ({filteredCategories.length} categories)
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollHorizontal("left")}
                  aria-label="Scroll categories left"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-silver bg-white text-navy font-bold shadow-sm active:scale-95"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => scrollHorizontal("right")}
                  aria-label="Scroll categories right"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-silver bg-white text-navy font-bold shadow-sm active:scale-95"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </motion.div>
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
                placeholder="Search product categories (e.g., hoses, bolts, O-rings, abrasives, lifting, MS/SS)..."
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
