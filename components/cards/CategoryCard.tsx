"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCategory } from "@/config/company";
import { CategoryStaticIcon } from "./CategoryStaticIcon";

interface CategoryCardProps {
  category: ProductCategory;
  enable3D?: boolean;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform" }}
      className="h-full w-full"
    >
      <Link
        href={`/products/${category.slug}`}
        className="group relative flex h-full w-full flex-col justify-between rounded-xl border border-silver bg-white p-3.5 sm:p-6 shadow-card transition-colors duration-300 hover:border-amber-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent overflow-hidden"
      >
        {/* Soft border glow overlay on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-amber-accent/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative z-10">
          {/* 360-degree Rotating Real Product Showcase */}
          <div
            className="relative mb-3.5 sm:mb-5 flex h-32 sm:h-44 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#EDF2F7] to-[#DCE4EE] border border-silver/50 p-2 sm:p-3"
            style={{ perspective: "900px" }}
          >
            {/* Subtle Studio Floor Shadow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1.5 h-3 w-3/5 rounded-full bg-navy/15 blur-md"
            />

            {!imageError && category.imagePath ? (
              <div className="product-spin-360 relative h-full w-full">
                {/* Front Face (0 deg) */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-md border border-white/80 bg-[#E6ECF2] shadow-md"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={category.imagePath}
                    alt={category.name}
                    loading="lazy"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Back Face (180 deg) so 360 spin always shows crisp non-mirrored real product */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-md border border-white/80 bg-[#E6ECF2] shadow-md"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <img
                    src={category.imagePath}
                    alt={category.name}
                    loading="lazy"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <CategoryStaticIcon
                shapeType={category.shapeType}
                className="h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 group-hover:scale-105"
              />
            )}

            <span className="pointer-events-none absolute right-2 top-2 z-20 rounded bg-white/90 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-navy border border-silver/60 shadow-sm">
              360&deg; Spin
            </span>
          </div>

          {/* Category Title */}
          <h3 className="text-sm sm:text-lg font-bold tracking-tight text-navy group-hover:text-navy-dark leading-snug">
            {category.name}
          </h3>

          {/* Neutral One-Line Description */}
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-steel">
            {category.description}
          </p>
        </div>

        {/* Bottom Link Indicator */}
        <div className="relative z-10 mt-3.5 sm:mt-5 flex items-center justify-between border-t border-silver/50 pt-2.5 sm:pt-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-navy">
          <span>View Category</span>
          <span
            className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-steel-light text-navy transition-transform transition-colors duration-200 group-hover:translate-x-0.5 group-hover:bg-amber-accent group-hover:text-navy-dark"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
