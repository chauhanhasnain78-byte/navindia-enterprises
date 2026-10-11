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
  introPhase: "complete",
  isIntroComplete: true,
  prefersReducedMotion: false,
  hasLogoImage: false,
  skipIntro: () => {},
});

export function useIntroMotion() {
  return useContext(IntroMotionContext);
}

const SESSION_STORAGE_KEY = "nie_brand_intro_played_v1";

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
        onError={onImageError}
        className={
          size === "intro"
            ? "h-16 sm:h-20 w-auto object-contain select-none"
            : "h-9 sm:h-10 w-auto object-contain select-none"
        }
      />
    );
  }

  // Fallback when /public/logo.png is missing: clean text wordmark / monogram
  if (size === "intro") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-amber-accent/50 bg-navy px-5 py-3 shadow-lg select-none">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded bg-amber-accent text-navy-dark font-extrabold text-sm tracking-tighter">
          NIE
        </span>
        <span className="font-extrabold tracking-tight text-base sm:text-xl text-white whitespace-nowrap">
          {companyConfig.name}
        </span>
      </div>
    );
  }

  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded bg-amber-accent text-navy-dark font-extrabold text-xs tracking-tighter select-none"
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
  const [introPhase, setIntroPhase] = useState<IntroPhase>("complete");
  const [hasLogoImage, setHasLogoImage] = useState(false);

  // Check if /public/logo.png exists
  useEffect(() => {
    let isMounted = true;
    const img = new window.Image();
    img.onload = () => {
      if (isMounted && img.naturalWidth > 0) {
        setHasLogoImage(true);
      }
    };
    img.onerror = () => {
      if (isMounted) {
        setHasLogoImage(false);
      }
    };
    img.src = companyConfig.logo.path;
    return () => {
      isMounted = false;
    };
  }, []);

  const skipIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors in restricted browsing modes
    }
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
      return;
    }

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(SESSION_STORAGE_KEY) === "1";
    } catch {
      alreadyPlayed = false;
    }

    if (alreadyPlayed) {
      setIntroPhase("complete");
      return;
    }

    // Mark as played for this session right away
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
    } catch {
      // Ignore
    }

    // Start under-3-second intro sequence:
    // 0.00s -> 0.45s: fade-in & scale at centre
    // 0.45s -> 1.60s: spin twice on Y axis like a coin (1.15s)
    // 1.60s -> 2.25s: travel to header logo position while overlay fades out (0.65s)
    // 2.25s -> 2.75s: company name reveals to the right of logo (0.50s)
    // 2.75s: complete (total 2.75s < 3.0s)
    setIntroPhase("fade-in");
    document.body.style.overflow = "hidden";

    const tSpin = window.setTimeout(() => {
      setIntroPhase((prev) => (prev === "complete" ? "complete" : "spin"));
    }, 450);

    const tTravel = window.setTimeout(() => {
      setIntroPhase((prev) => (prev === "complete" ? "complete" : "travel"));
    }, 1600);

    const tWordmark = window.setTimeout(() => {
      setIntroPhase((prev) => (prev === "complete" ? "complete" : "wordmark"));
      document.body.style.overflow = "";
    }, 2250);

    const tComplete = window.setTimeout(() => {
      setIntroPhase("complete");
      document.body.style.overflow = "";
    }, 2750);

    return () => {
      window.clearTimeout(tSpin);
      window.clearTimeout(tTravel);
      window.clearTimeout(tWordmark);
      window.clearTimeout(tComplete);
      document.body.style.overflow = "";
    };
  }, [reducedMotionHook]);

  // Skip immediately on any click, tap, or key press while intro is playing
  useEffect(() => {
    if (introPhase === "complete") return;

    const handleUserSkip = () => {
      skipIntro();
    };

    window.addEventListener("keydown", handleUserSkip, { passive: true });
    window.addEventListener("mousedown", handleUserSkip, { passive: true });
    window.addEventListener("touchstart", handleUserSkip, { passive: true });

    return () => {
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
          {/* Full-screen deep navy intro overlay (only during intro sequence) */}
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
                onClick={skipIntro}
                aria-hidden="true"
                className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark pointer-events-auto"
                style={{ perspective: "1000px" }}
              >
                {isCenterLogoMounted && (
                  <motion.div
                    layoutId="nie-brand-logo-shared"
                    initial={{ opacity: 0, scale: 0.76, rotateY: 0 }}
                    animate={
                      introPhase === "fade-in"
                        ? { opacity: 1, scale: 1, rotateY: 0 }
                        : { opacity: 1, scale: 1, rotateY: 720 }
                    }
                    transition={
                      introPhase === "fade-in"
                        ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
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
