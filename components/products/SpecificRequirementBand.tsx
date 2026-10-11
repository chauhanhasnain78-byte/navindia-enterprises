"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface SpecificRequirementBandProps {
  categoryName?: string;
}

export function SpecificRequirementBand({
  categoryName,
}: SpecificRequirementBandProps) {
  const rfqHref = categoryName
    ? `/rfq?category=${encodeURIComponent(categoryName)}`
    : "/rfq";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="mt-14 rounded-2xl border border-navy/15 bg-navy px-6 py-8 sm:px-10 sm:py-10 text-white shadow-card"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Looking for something specific? Tell us what you need.
          </h2>
          <p className="text-sm sm:text-base text-steel-light/85">
            Share your required sizes, grades, drawings, or item list and we will review it for quotation.
          </p>
        </div>
        <div className="shrink-0">
          <Button href={rfqHref} variant="primary" size="lg">
            Tell us what you need
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
