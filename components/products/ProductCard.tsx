"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CategoryShapeType } from "@/config/company";
import { CatalogProduct } from "@/data/catalog";
import { CategoryStaticIcon } from "@/components/cards/CategoryStaticIcon";

interface ProductCardProps {
  product: CatalogProduct;
  shapeType: CategoryShapeType;
  index?: number;
}

export function ProductCard({
  product,
  shapeType,
  index = 0,
}: ProductCardProps) {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      style={{ willChange: "transform, opacity" }}
      className="h-full w-full"
    >
      <Link
        href={`/products/${product.categorySlug}/${product.slug}`}
        className="group relative flex h-full w-full flex-col justify-between rounded-xl border border-silver bg-white p-4 sm:p-6 shadow-card transition-colors duration-300 hover:border-amber-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent overflow-hidden"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-amber-accent/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative z-10">
          {/* 4:3 Illustrative Product Image or Neutral Gradient Placeholder with Icon (zero layout shift) */}
          <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-silver/50 bg-gradient-to-br from-[#142948] via-[#1E3658] to-[#2B466B] flex items-center justify-center">
            {!imageMissing ? (
              <img
                src={product.imagePath}
                alt={product.name}
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
                onError={() => setImageMissing(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                <div className="rounded-xl bg-white/90 p-3 shadow-sm">
                  <CategoryStaticIcon
                    shapeType={shapeType}
                    className="h-12 w-12 sm:h-14 sm:w-14 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-steel-light/70">
                  Illustrative Preview
                </span>
              </div>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-bold tracking-tight text-navy group-hover:text-navy-dark leading-snug">
            {product.name}
          </h2>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-steel">
            {product.summary}
          </p>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between border-t border-silver/50 pt-3.5 text-xs font-semibold uppercase tracking-wider text-navy">
          <span>View and enquire</span>
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-steel-light text-navy transition-transform transition-colors duration-200 group-hover:translate-x-0.5 group-hover:bg-amber-accent group-hover:text-navy-dark"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
