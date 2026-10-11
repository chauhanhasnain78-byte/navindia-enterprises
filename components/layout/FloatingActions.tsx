"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Button } from "@/components/ui/Button";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

export function FloatingActions() {
  const { prefersReducedMotion } = useIntroMotion();
  const pathname = usePathname();

  // Check if current route is a product detail page: /products/[category]/[product]
  const isProductPage = /^\/products\/[^/]+\/[^/]+\/?$/.test(pathname || "");

  const handleMobileProductQuoteClick = () => {
    const reqBox = document.getElementById("requirement-box");
    if (reqBox) {
      reqBox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button (positioned above mobile sticky bar) */}
      <motion.a
        href={companyConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NAV INDIA ENTERPRISES on WhatsApp"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.05, 1],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 0.9,
                repeat: Infinity,
                repeatDelay: 4.2,
                ease: "easeInOut",
              }
        }
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06, y: -2 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        style={{ willChange: "transform" }}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-navy-dark shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent"
      >
        {/* Gentle pulse halo every few seconds */}
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.38],
              opacity: [0.45, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 3.7,
              ease: "easeOut",
            }}
            style={{ willChange: "transform, opacity" }}
            className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
          />
        )}

        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative z-10 h-5 w-5 shrink-0"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c0.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.126.556 4.122 1.529 5.854l-1.529 5.582 5.716-1.499c1.693.924 3.635 1.451 5.702 1.451 6.627 0 12-5.373 12-12s-5.373-12-11.418-11.388z" />
        </svg>
        <span className="relative z-10 hidden sm:inline">WhatsApp Us</span>
      </motion.a>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/15 bg-navy-dark/95 p-3 backdrop-blur-md md:hidden">
        {isProductPage ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onClick={handleMobileProductQuoteClick}
          >
            Request Quote
          </Button>
        ) : (
          <Button href="/rfq" variant="primary" size="md" fullWidth>
            Get a Quote
          </Button>
        )}
      </div>
    </>
  );
}
