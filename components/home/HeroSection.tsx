"use client";

import React from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-dark text-white py-20 sm:py-28 lg:py-32 border-b border-white/10">
      {/* Subtle Brushed Steel / Industrial Grid Gradient Background ( strictly 2D ) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(91, 107, 124, 0.45) 0%, transparent 55%),
            radial-gradient(circle at 80% 75%, rgba(245, 165, 36, 0.12) 0%, transparent 45%),
            linear-gradient(135deg, #071428 0%, #0B1F3A 50%, #071428 100%)
          `,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C9D1D9 1px, transparent 1px), linear-gradient(to bottom, #C9D1D9 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-silver/25 bg-navy/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-steel-light">
            <span
              className="h-2 w-2 rounded-full bg-amber-accent"
              aria-hidden="true"
            />
            <span>{companyConfig.cityCountry} &bull; Manufacturing &amp; Export</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            {companyConfig.tagline}
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-steel-light/90 leading-relaxed max-w-2xl">
            {companyConfig.heroSupportingLine}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <Button href="/rfq" variant="primary" size="lg">
              Get a Quote
            </Button>
            <Button href="/rfq" variant="outline" size="lg">
              Tell Us What You Need
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
