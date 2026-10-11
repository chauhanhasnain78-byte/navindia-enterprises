"use client";

import React from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

export function WhyBuyersSection() {
  const { prefersReducedMotion } = useIntroMotion();

  return (
    <section className="py-16 sm:py-24 bg-steel-light/55 border-b border-silver/60">
      <Container>
        <SectionHeading
          eyebrow="Why Buyers Work With Us"
          title="Built Around Industrial Buyer Requirements"
          subtitle="Focused on specification accuracy, multi-item consolidation, and reliable export coordination."
        />

        {/* 1 col on mobile, 2 on tablet, 4 on large screens */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companyConfig.whyBuyersWorkWithUs.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: "transform, opacity" }}
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
