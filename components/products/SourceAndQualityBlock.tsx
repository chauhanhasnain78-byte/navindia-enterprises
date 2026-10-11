"use client";

import React from "react";
import { motion } from "framer-motion";
import { companyConfig, ProductCategory } from "@/config/company";

interface SourceAndQualityBlockProps {
  category: ProductCategory;
  standards: string[];
}

export function SourceAndQualityBlock({
  category,
  standards,
}: SourceAndQualityBlockProps) {
  const { trust } = companyConfig;
  const visibleDocuments = trust.showPending
    ? [...trust.confirmedDocuments, ...trust.pendingDocuments]
    : trust.confirmedDocuments;

  const rows = [
    {
      label: "Manufacturing",
      value: category.manufacturingStatus,
    },
    {
      label: "Origin",
      value: category.origin || trust.defaultOrigin,
    },
    {
      label: "Inspection",
      value: trust.inspectionNote,
    },
    {
      label: "Documents",
      value: visibleDocuments.join(" • "),
    },
    {
      label: trust.standardsHeading,
      value:
        standards && standards.length > 0
          ? standards.join(" • ")
          : "As per your requirement",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="mt-12 rounded-2xl border border-silver bg-white p-6 sm:p-8 shadow-card"
    >
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-silver/60 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-accent">
            Supply &amp; Documentation
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-navy">
            Source and Quality
          </h2>
        </div>
        <span className="inline-flex self-start sm:self-auto items-center rounded-full bg-steel-light px-3 py-1 text-xs font-semibold text-navy">
          {category.manufacturingStatus}
        </span>
      </div>

      <dl className="divide-y divide-silver/50">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1.5 py-3.5 sm:grid-cols-12 sm:gap-4"
          >
            <dt className="text-xs sm:text-sm font-bold uppercase tracking-wider text-steel sm:col-span-4">
              {row.label}
            </dt>
            <dd className="text-sm sm:text-base font-medium text-navy sm:col-span-8">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 rounded-lg bg-steel-light/50 px-4 py-2.5 text-xs font-medium text-steel">
        {trust.indicativeSpecNotice}
      </p>
    </motion.div>
  );
}
