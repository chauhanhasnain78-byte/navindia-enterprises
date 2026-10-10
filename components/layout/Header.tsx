"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchClick = () => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const searchSection = document.getElementById("product-search");
      const searchInput = document.getElementById(
        "category-search-input"
      ) as HTMLInputElement | null;
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 350);
      }
    } else {
      router.push("/#product-search");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <Container>
        <div className="flex h-16 sm:h-20 items-center justify-between gap-3">
          {/* Logo / Wordmark */}
          <Logo theme="dark" />

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {companyConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-steel-light/90 transition-colors hover:text-amber-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent rounded px-1 py-0.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Search Icon + Get a Quote + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleSearchClick}
              aria-label="Search product categories"
              title="Search product categories"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-steel-light transition-colors hover:border-amber-accent hover:text-amber-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <div className="hidden sm:block">
              <Button href="/rfq" variant="primary" size="sm">
                Get a Quote
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:border-amber-accent hover:text-amber-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent"
            >
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-navy-dark"
          >
            <Container className="py-4">
              <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
                {companyConfig.navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-steel-light transition-colors hover:bg-white/5 hover:text-amber-accent"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-3">
                  <Button
                    href="/rfq"
                    variant="primary"
                    fullWidth
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get a Quote
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
