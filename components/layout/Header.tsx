"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [mobileProductsExpanded, setMobileProductsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { prefersReducedMotion } = useIntroMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 24;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className="sticky top-0 z-50 w-full h-16 sm:h-20">
      {/* Base Header Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-navy/90 backdrop-blur-md border-b border-white/10"
        aria-hidden="true"
      />
      {/* Compact Scrolled Blurred Backdrop Overlay (animates opacity only for 60fps & zero layout shift) */}
      <div
        className={`pointer-events-none absolute inset-0 bg-navy-dark/95 backdrop-blur-lg border-b border-amber-accent/20 shadow-lg transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <Container className="relative z-10 h-full">
        <motion.div
          animate={
            prefersReducedMotion
              ? { scale: 1, y: 0 }
              : isScrolled
              ? { scale: 0.97, y: -1 }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform" }}
          className="flex h-full items-center justify-between gap-3 origin-center"
        >
          {/* Logo / Wordmark with shared layoutId landing */}
          <Logo theme="dark" location="header" />

          {/* Desktop Navigation with Products Dropdown */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {companyConfig.navigation.map((item) => {
              if (item.label === "Products") {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setProductsMenuOpen(true)}
                    onMouseLeave={() => setProductsMenuOpen(false)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={productsMenuOpen}
                      className="group relative inline-flex items-center gap-1.5 py-1 text-sm font-medium text-steel-light/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent rounded px-1"
                    >
                      <span>{item.label}</span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          productsMenuOpen ? "rotate-180 text-amber-accent" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 left-1 right-1 h-[2px] origin-left scale-x-0 rounded-full bg-amber-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </Link>

                    <AnimatePresence>
                      {productsMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          style={{ willChange: "transform, opacity" }}
                          className="absolute left-0 top-full pt-2 w-80 z-50"
                        >
                          <div className="rounded-xl border border-white/15 bg-navy-dark/95 backdrop-blur-xl p-2 shadow-xl">
                            <div className="border-b border-white/10 px-3 py-2 flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-accent">
                                9 Product Categories
                              </span>
                              <Link
                                href="/products"
                                onClick={() => setProductsMenuOpen(false)}
                                className="text-[11px] font-semibold text-steel-light hover:text-white transition-colors"
                              >
                                View All &rarr;
                              </Link>
                            </div>
                            <ul className="mt-1 space-y-0.5">
                              {companyConfig.categories.map((cat) => (
                                <li key={cat.id}>
                                  <Link
                                    href={`/products/${cat.slug}`}
                                    onClick={() => setProductsMenuOpen(false)}
                                    className="block rounded-lg px-3 py-2 text-xs font-medium text-steel-light transition-colors hover:bg-white/10 hover:text-amber-accent"
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative py-1 text-sm font-medium text-steel-light/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent rounded px-1"
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-1 right-1 h-[2px] origin-left scale-x-0 rounded-full bg-amber-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search Icon + Get a Quote + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleSearchClick}
              aria-label="Search product categories"
              title="Search product categories"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-steel-light transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:border-amber-accent hover:text-amber-accent active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent"
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
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white transition-transform transition-colors duration-200 active:scale-95 hover:border-amber-accent hover:text-amber-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent"
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
        </motion.div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="lg:hidden absolute left-0 right-0 top-full max-h-[82vh] overflow-y-auto border-t border-white/10 bg-navy-dark shadow-xl"
          >
            <Container className="py-4">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col space-y-1"
              >
                {companyConfig.navigation.map((item) => {
                  if (item.label === "Products") {
                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-steel-light hover:bg-white/5">
                          <Link
                            href="/products"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex-1 hover:text-amber-accent"
                          >
                            Products
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setMobileProductsExpanded((prev) => !prev)
                            }
                            aria-expanded={mobileProductsExpanded}
                            aria-label="Toggle product categories list"
                            className="p-1 text-steel-light hover:text-amber-accent"
                          >
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`h-5 w-5 transition-transform ${
                                mobileProductsExpanded ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>

                        {mobileProductsExpanded && (
                          <div className="ml-3 border-l border-white/15 pl-3 space-y-1">
                            {companyConfig.categories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products/${cat.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-md px-2.5 py-2 text-xs font-medium text-steel-light/90 hover:bg-white/5 hover:text-amber-accent"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-md px-3 py-3 text-base font-medium text-steel-light transition-colors hover:bg-white/5 hover:text-amber-accent"
                    >
                      {item.label}
                    </Link>
                  );
                })}
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
