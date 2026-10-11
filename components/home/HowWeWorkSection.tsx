"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/cards/StepCard";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

export function HowWeWorkSection() {
  const steps = companyConfig.howWeWorkSteps;
  const gridRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useIntroMotion();

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 82%", "end 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-we-work"
      className="py-16 sm:py-24 bg-white border-b border-silver/60"
    >
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="Clear, Structured Enquiry-to-Shipment Process"
          subtitle="Five straightforward steps from your initial technical requirement to export dispatch."
        />

        <div ref={gridRef} className="relative mt-10">
          {/* Desktop Horizontal Connecting Line (draws via scaleX transform on scroll) */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:block absolute left-8 right-8 top-11 h-[3px] rounded-full bg-steel-light overflow-hidden"
          >
            <motion.div
              style={{
                scaleX: prefersReducedMotion ? 1 : smoothProgress,
                willChange: "transform",
              }}
              className="h-full w-full origin-left bg-amber-accent"
            />
          </div>

          {/* Mobile Vertical Connecting Line (draws via scaleY transform on scroll) */}
          <div
            aria-hidden="true"
            className="pointer-events-none sm:hidden absolute left-6 top-6 bottom-6 w-[3px] rounded-full bg-steel-light overflow-hidden"
          >
            <motion.div
              style={{
                scaleY: prefersReducedMotion ? 1 : smoothProgress,
                willChange: "transform",
              }}
              className="h-full w-full origin-top bg-amber-accent"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.stepNumber}
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
                <StepCard
                  step={step}
                  index={index}
                  totalSteps={steps.length}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
