"use client";

import React from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/cards/StepCard";

export function HowWeWorkSection() {
  const steps = companyConfig.howWeWorkSteps;

  return (
    <section
      id="how-we-work"
      className="py-16 sm:py-24 bg-white border-b border-silver/60"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="How We Work"
            title="Clear, Structured Enquiry-to-Shipment Process"
            subtitle="Five straightforward steps from your initial technical requirement to export dispatch."
          />
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.stepNumber}
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
              <StepCard
                step={step}
                index={index}
                totalSteps={steps.length}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
