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
  useReducedMotion,
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
            ? "h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover aspect-square shadow-2xl select-none"
            : "h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover aspect-square select-none"
        }
      />
    );
  }

  // Fallback emblem if /public/logo.png ever fails to load (circular logo mark only)
  return (
    <span
      className={
        size === "intro"
          ? "inline-flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-full bg-amber-accent text-navy-dark font-extrabold text-2xl tracking-tighter shadow-2xl select-none"
          : "inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-amber-accent text-navy-dark font-extrabold text-xs tracking-tighter select-none"
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
  const reducedMotionHook = useReducedMotion();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Start in "fade-in" immediately so the intro plays every time the user opens the site without initial page flash
  const [introPhase, setIntroPhase] = useState<IntroPhase>("fade-in");
  const [hasLogoImage, setHasLogoImage] = useState(true);

  const skipIntro = useCallback(() => {
    setIntroPhase("complete");
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    const mediaReduced =
      Boolean(reducedMotionHook) ||
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

    setPrefersReducedMotion(mediaReduced);

    if (mediaReduced) {
      setIntroPhase("complete");
      document.body.style.overflow = "";
      return;
    }

    // Play intro every time the website is opened:
    // 0.00s -> 0.65s: Logo fades & scales in (0.4s) and settles clearly for a moment (0.25s)
    // 0.65s -> 1.80s: ONLY the logo spins twice on its Y axis like a coin (1.15s)
    // 1.80s -> 2.45s: Logo travels to top-left header while overlay fades out (0.65s)
    // 2.45s -> 2.95s: Company name "NAV INDIA ENTERPRISES" slides/clips out to the right of logo (0.50s)
    // 2.95s: Complete — hero content animates in
    setIntroPhase("fade-in");
    document.body.style.overflow = "hidden";

    const tSpin = window.setTimeout(() => {
      setIntroPhase((prev) => (prev === "complete" ? "complete" : "spin"));
    }, 650);

    const tTravel = window.setTimeout(() => {
      setIntroPhase((prev) => (prev === "complete" ? "complete" : "travel"));
    }, 1800);

    const tWordmark = window.setTimeout(() => {
      setIntroPhase((prev) => (prev === "complete" ? "complete" : "wordmark"));
      document.body.style.overflow = "";
    }, 2450);

    const tComplete = window.setTimeout(() => {
      setIntroPhase("complete");
      document.body.style.overflow = "";
    }, 2950);

    return () => {
      window.clearTimeout(tSpin);
      window.clearTimeout(tTravel);
      window.clearTimeout(tWordmark);
      window.clearTimeout(tComplete);
      document.body.style.overflow = "";
    };
  }, [reducedMotionHook]);

  // Allow skipping on click/tap/keypress after a tiny 450ms guard so opening taps don't accidentally cancel it
  useEffect(() => {
    if (introPhase === "complete") return;

    let active = false;
    const enableSkipTimer = window.setTimeout(() => {
      active = true;
    }, 450);

    const handleUserSkip = () => {
      if (active) {
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleUserSkip, { passive: true });
    window.addEventListener("mousedown", handleUserSkip, { passive: true });
    window.addEventListener("touchstart", handleUserSkip, { passive: true });

    return () => {
      window.clearTimeout(enableSkipTimer);
      window.removeEventListener("keydown", handleUserSkip);
      window.removeEventListener("mousedown", handleUserSkip);
      window.removeEventListener("touchstart", handleUserSkip);
    };
  }, [introPhase, skipIntro]);

  const isOverlayVisible =
    !prefersReducedMotion &&
    (introPhase === "fade-in" ||
      introPhase === "spin" ||
      introPhase === "travel");

  const isCenterLogoMounted =
    !prefersReducedMotion &&
    (introPhase === "fade-in" || introPhase === "spin");

  return (
    <MotionConfig reducedMotion="user">
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
                        ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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
              </motion.div>
            )}
          </AnimatePresence>

          {children}
        </LayoutGroup>
      </IntroMotionContext.Provider>
    </MotionConfig>
  );
}
