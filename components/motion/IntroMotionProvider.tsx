"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "framer-motion";
import { companyConfig } from "@/config/company";

export type IntroPhase =
  | "fade-in"
  | "spin"
  | "travel"
  | "wordmark"
  | "complete";

interface IntroMotionContextValue {
  introPhase: IntroPhase;
  isIntroComplete: boolean;
  prefersReducedMotion: boolean;
  hasLogoImage: boolean;
  skipIntro: () => void;
}

const IntroMotionContext = createContext<IntroMotionContextValue>({
  introPhase: "fade-in",
  isIntroComplete: false,
  prefersReducedMotion: false,
  hasLogoImage: true,
  skipIntro: () => {},
});

export function useIntroMotion() {
  return useContext(IntroMotionContext);
}

/**
 * Renders ONLY the logo emblem (/public/logo.png).
 * Never renders the full company name here so only the logo spins during the intro.
 */
export function BrandMarkVisual({
  hasLogoImage,
  size = "header",
  onImageError,
}: {
  hasLogoImage: boolean;
  size?: "intro" | "header";
  onImageError?: () => void;
}) {
  if (hasLogoImage) {
    return (
      <img
        src={companyConfig.logo.path}
        alt={companyConfig.logo.alt}
        decoding="sync"
        loading="eager"
        onError={onImageError}
        className={
          size === "intro"
            ? "h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-contain shadow-2xl select-none"
            : "h-9 w-9 sm:h-10 sm:w-10 rounded-md object-contain select-none"
        }
      />
    );
  }

  // Fallback emblem if /public/logo.png ever fails to load (logo mark only, no company name)
  return (
    <span
      className={
        size === "intro"
          ? "inline-flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-xl bg-amber-accent text-navy-dark font-extrabold text-2xl tracking-tighter shadow-2xl select-none"
          : "inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md bg-amber-accent text-navy-dark font-extrabold text-xs tracking-tighter select-none"
      }
      aria-hidden="true"
    >
      NIE
    </span>
  );
}

export function IntroMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always keep animations enabled even on Windows laptops where OS visual effects are off
  const prefersReducedMotion = false;
  const [introPhase, setIntroPhase] = useState<IntroPhase>("fade-in");
  const [hasLogoImage, setHasLogoImage] = useState(true);

  const skipIntro = useCallback(() => {
    setIntroPhase("complete");
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let tSpin: number | undefined;
    let tTravel: number | undefined;
    let tWordmark: number | undefined;
    let tComplete: number | undefined;

    setIntroPhase("fade-in");
    document.body.style.overflow = "hidden";

    const startSequence = () => {
      if (isCancelled) return;

      // 0.00s -> 0.70s: Logo fades & scales in and stays still so user clearly sees the logo first
      // 0.70s -> 1.90s: ONLY the logo spins twice on its Y axis like a coin (1.20s)
      // 1.90s -> 2.55s: Logo travels to top-left header while overlay fades out (0.65s)
      // 2.55s -> 3.00s: Company name "NAV INDIA ENTERPRISES" slides out to the right of logo (0.45s)
      tSpin = window.setTimeout(() => {
        if (!isCancelled) {
          setIntroPhase((prev) => (prev === "complete" ? "complete" : "spin"));
        }
      }, 700);

      tTravel = window.setTimeout(() => {
        if (!isCancelled) {
          setIntroPhase((prev) =>
            prev === "complete" ? "complete" : "travel"
          );
        }
      }, 1900);

      tWordmark = window.setTimeout(() => {
        if (!isCancelled) {
          setIntroPhase((prev) =>
            prev === "complete" ? "complete" : "wordmark"
          );
          document.body.style.overflow = "";
        }
      }, 2550);

      tComplete = window.setTimeout(() => {
        if (!isCancelled) {
          setIntroPhase("complete");
          document.body.style.overflow = "";
        }
      }, 3000);
    };

    // Wait for first painted frame on laptop/mobile so timers never lag behind hydration
    const raf1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        startSequence();
      });
    });

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(raf1);
      if (tSpin) window.clearTimeout(tSpin);
      if (tTravel) window.clearTimeout(tTravel);
      if (tWordmark) window.clearTimeout(tWordmark);
      if (tComplete) window.clearTimeout(tComplete);
      document.body.style.overflow = "";
    };
  }, []);

  const isOverlayVisible =
    introPhase === "fade-in" ||
    introPhase === "spin" ||
    introPhase === "travel";

  const isCenterLogoMounted =
    introPhase === "fade-in" || introPhase === "spin";

  return (
    <MotionConfig reducedMotion="never">
      <IntroMotionContext.Provider
        value={{
          introPhase,
          isIntroComplete: introPhase === "complete",
          prefersReducedMotion,
          hasLogoImage,
          skipIntro,
        }}
      >
        <LayoutGroup id="nie-brand-intro-group">
          {/* Full-screen deep navy intro overlay */}
          <AnimatePresence>
            {isOverlayVisible && (
              <motion.div
                key="nie-intro-overlay"
                initial={{ opacity: 1 }}
                animate={{
                  opacity: introPhase === "travel" ? 0 : 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: introPhase === "travel" ? 0.65 : 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden="true"
                className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark pointer-events-auto"
                style={{ perspective: "1000px" }}
              >
                {isCenterLogoMounted && (
                  <motion.div
                    layoutId="nie-brand-logo-shared"
                    initial={{ opacity: 0, scale: 0.72, rotateY: 0 }}
                    animate={
                      introPhase === "fade-in"
                        ? { opacity: 1, scale: 1, rotateY: 0 }
                        : { opacity: 1, scale: 1, rotateY: 720 }
                    }
                    transition={
                      introPhase === "fade-in"
                        ? { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
                        : {
                            rotateY: {
                              duration: 1.15,
                              ease: [0.33, 1, 0.68, 1],
                            },
                            layout: {
                              duration: 0.65,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          }
                    }
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    className="flex items-center justify-center"
                  >
                    <BrandMarkVisual
                      hasLogoImage={hasLogoImage}
                      size="intro"
                      onImageError={() => setHasLogoImage(false)}
                    />
                  </motion.div>
                )}

                {/* Subtle explicit Skip button in corner so accidental mouse clicks don't abort the intro */}
                <button
                  type="button"
                  onClick={skipIntro}
                  className="absolute bottom-6 right-6 rounded-md border border-white/15 bg-navy/80 px-3 py-1.5 text-xs font-medium text-steel-light/80 hover:text-white transition-colors"
                >
                  Skip
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {children}
        </LayoutGroup>
      </IntroMotionContext.Provider>
    </MotionConfig>
  );
}
