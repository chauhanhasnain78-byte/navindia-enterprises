"use client";

import React from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

export function HeroSection() {
  const { isIntroComplete, prefersReducedMotion } = useIntroMotion();
  const headlineWords = companyConfig.tagline.split(" ");
  const shouldShowHero = prefersReducedMotion || isIntroComplete;

  return (
    <section className="relative overflow-hidden bg-navy-dark text-white py-20 sm:py-28 lg:py-32 border-b border-white/10">
      {/* Static Base Navy/Steel Gradient Background ( strictly 2D ) */}
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

      {/* Very slow, subtle moving metallic sheen (GPU transform only for 60fps) */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ x: "-12%", y: "-4%", opacity: 0.45 }}
          animate={{
            x: ["-12%", "12%", "-12%"],
            y: ["-4%", "4%", "-4%"],
            opacity: [0.38, 0.62, 0.38],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            willChange: "transform, opacity",
            background:
              "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(201, 209, 217, 0.14) 0%, rgba(91, 107, 124, 0.06) 45%, transparent 75%)",
          }}
          className="pointer-events-none absolute -inset-[20%]"
        />
      )}

      {/* Subtle Brushed Industrial Grid Overlay */}
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
        <div className="max-w-3xl">
          {/* Eyebrow pill */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            animate={
              shouldShowHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-silver/25 bg-navy/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-steel-light"
          >
            <span
              className="h-2 w-2 rounded-full bg-amber-accent"
              aria-hidden="true"
            />
            <span>
              {companyConfig.cityCountry} &bull; Manufacturing &amp; Export
            </span>
          </motion.div>

          {/* Headline: words reveal one by one (staggered fade and rise) */}
          <h1
            aria-label={companyConfig.tagline}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] flex flex-wrap gap-x-[0.28em] gap-y-1"
          >
            {headlineWords.map((word, idx) => (
              <motion.span
                key={`${word}-${idx}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                animate={
                  shouldShowHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                }
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ willChange: "transform, opacity" }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Supporting line follows headline words */}
          <motion.p
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            animate={
              shouldShowHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            transition={{
              duration: 0.45,
              delay: prefersReducedMotion ? 0 : 0.58,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: "transform, opacity" }}
            className="mt-5 text-lg sm:text-xl text-steel-light/90 leading-relaxed max-w-2xl"
          >
            {companyConfig.heroSupportingLine}
          </motion.p>

          {/* Buttons follow supporting line */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            animate={
              shouldShowHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            transition={{
              duration: 0.45,
              delay: prefersReducedMotion ? 0 : 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: "transform, opacity" }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
          >
            <Button href="/rfq" variant="primary" size="lg" ambientGlow>
              Get a Quote
            </Button>
            <Button href="/rfq" variant="outline" size="lg">
              Tell Us What You Need
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
