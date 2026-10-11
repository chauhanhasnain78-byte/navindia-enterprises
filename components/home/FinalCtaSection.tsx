"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

export function FinalCtaSection() {
  const { prefersReducedMotion } = useIntroMotion();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-silver/60">
      <Container>
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="rounded-2xl bg-navy px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-card border border-navy-dark"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-amber-accent">
            Ready for Quotation
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Send us your requirement
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base sm:text-lg text-steel-light/85 leading-relaxed">
            Share your product specifications, sizes, and quantities for a clear quotation.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/rfq" variant="primary" size="lg">
              Get a Quote
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
