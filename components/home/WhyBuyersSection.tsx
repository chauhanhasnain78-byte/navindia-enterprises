"use client";

import React from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/cards/FeatureCard";

export function WhyBuyersSection() {
  return (
    <section className="py-16 sm:py-24 bg-steel-light/55 border-b border-silver/60">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Why Buyers Work With Us"
            title="Built Around Industrial Buyer Requirements"
            subtitle="Focused on specification accuracy, multi-item consolidation, and reliable export coordination."
          />
        </motion.div>

        {/* 1 col on mobile, 2 on tablet, 4 on large screens */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companyConfig.whyBuyersWorkWithUs.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              className="h-full"
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
