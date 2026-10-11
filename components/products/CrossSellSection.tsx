"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProductCategory } from "@/config/company";
import { CategoryCard } from "@/components/cards/CategoryCard";

interface CrossSellSectionProps {
  heading?: string;
  subtitle?: string;
  categories: ProductCategory[];
}

export function CrossSellSection({
  heading = "Also needed for the same project?",
  subtitle = "Combine multiple categories into a single consolidated enquiry.",
  categories,
}: CrossSellSectionProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="mt-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
        className="mb-6"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-amber-accent">
          Consolidated Supply
        </span>
        <h2 className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-navy">
          {heading}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-steel">{subtitle}</p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.36,
              delay: Math.min(idx * 0.06, 0.2),
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: "transform, opacity" }}
            className="h-full"
          >
            <CategoryCard category={cat} enable3D={false} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
