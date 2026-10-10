"use client";

import React from "react";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function WorldSupplySection() {
  const origin = companyConfig.originPoint;
  const destinations = companyConfig.highlightedCountries;

  return (
    <section className="py-16 sm:py-24 bg-navy text-white border-b border-white/10 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Supply Across the World"
            title="From Mumbai to the Gulf &amp; International Markets"
            subtitle="Focused export supply corridors to the UAE, Qatar, and Bahrain, with enquiries welcomed from buyers worldwide."
            theme="dark"
          />
        </motion.div>

        {/* Clean 2D World Map SVG Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-10 rounded-2xl border border-white/15 bg-navy-dark/90 p-4 sm:p-8 shadow-card"
        >
          <div className="relative w-full overflow-hidden rounded-xl bg-[#061122] border border-white/10">
            <svg
              viewBox="0 0 1000 480"
              fill="none"
              className="w-full h-auto block select-none"
              role="img"
              aria-label="2D world map highlighting export supply routes from Mumbai, India to UAE, Qatar, and Bahrain, plus global trade reach"
            >
              <defs>
                <pattern
                  id="world-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#5B6B7C"
                    strokeWidth="0.5"
                    strokeOpacity="0.22"
                  />
                </pattern>
                <radialGradient id="gulf-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F5A524" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#F5A524" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Lat/Long Grid */}
              <rect width="1000" height="480" fill="url(#world-grid)" />

              {/* Simplified Stylized 2D Continents Silhouette */}
              <g fill="#132B4C" stroke="#264773" strokeWidth="1.2">
                {/* North America */}
                <path d="M95,85 L220,75 L275,135 L245,195 L185,225 L140,185 L90,135 Z" />
                {/* South America */}
                <path d="M235,250 L295,270 L320,340 L285,425 L245,410 L225,315 Z" />
                {/* Europe */}
                <path d="M445,80 L555,70 L585,125 L540,160 L460,155 L435,120 Z" />
                {/* Africa */}
                <path d="M445,180 L545,175 L595,245 L575,355 L515,395 L475,315 L435,235 Z" />
                {/* Middle East / Arabian Peninsula (Highlighted Base) */}
                <path
                  d="M565,185 L625,185 L640,235 L595,255 L565,220 Z"
                  fill="#1B3B68"
                  stroke="#5B6B7C"
                  strokeWidth="1.5"
                />
                {/* Eurasia / Asia + India Subcontinent */}
                <path d="M585,75 L845,80 L885,165 L825,245 L755,265 L715,235 L680,290 L650,235 L625,185 L585,130 Z" />
                {/* Southeast Asia & Australia */}
                <path d="M765,280 L835,290 L850,325 L780,325 Z" />
                <path d="M785,350 L890,345 L905,415 L805,425 Z" />
              </g>

              {/* Soft Glow around Origin & Gulf Corridor */}
              <circle cx="640" cy="228" r="95" fill="url(#gulf-glow)" />

              {/* Soft Worldwide Feel: Subtle Secondary Dashed Arcs */}
              <g
                stroke="#5B6B7C"
                strokeWidth="1.4"
                strokeDasharray="5 6"
                opacity="0.55"
              >
                {/* India to Europe */}
                <path d="M 678 245 Q 590 130 505 125" />
                {/* India to East Africa */}
                <path d="M 678 245 Q 615 295 555 310" />
                {/* India to Southeast Asia */}
                <path d="M 678 245 Q 745 250 800 295" />
              </g>

              {/* Primary Animated Supply Arcs from Mumbai, India to UAE, Qatar, Bahrain */}
              {destinations.map((dest, idx) => {
                const midX = (origin.coordinates.x + dest.coordinates.x) / 2;
                const midY =
                  Math.min(origin.coordinates.y, dest.coordinates.y) -
                  (26 + idx * 14);
                const pathData = `M ${origin.coordinates.x} ${origin.coordinates.y} Q ${midX} ${midY} ${dest.coordinates.x} ${dest.coordinates.y}`;

                return (
                  <g key={dest.id}>
                    {/* Base subtle route line */}
                    <path
                      d={pathData}
                      stroke="#F5A524"
                      strokeOpacity="0.3"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Animated route pulse */}
                    <motion.path
                      d={pathData}
                      stroke="#F5A524"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 1.8,
                        delay: idx * 0.25,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1.2,
                        ease: "easeInOut",
                      }}
                    />
                  </g>
                );
              })}

              {/* Highlighted Gulf Destination Nodes (UAE, Qatar, Bahrain) */}
              {destinations.map((dest) => (
                <g key={`node-${dest.id}`}>
                  <circle
                    cx={dest.coordinates.x}
                    cy={dest.coordinates.y}
                    r="7"
                    fill="#F5A524"
                    fillOpacity="0.25"
                  />
                  <circle
                    cx={dest.coordinates.x}
                    cy={dest.coordinates.y}
                    r="3.8"
                    fill="#F5A524"
                    stroke="#071428"
                    strokeWidth="1.5"
                  />
                  <text
                    x={dest.coordinates.x + dest.labelOffset.dx}
                    y={dest.coordinates.y + dest.labelOffset.dy}
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="700"
                    className="tracking-wide"
                  >
                    {dest.name}
                  </text>
                </g>
              ))}

              {/* Origin Node: Mumbai, India */}
              <g>
                <circle
                  cx={origin.coordinates.x}
                  cy={origin.coordinates.y}
                  r="11"
                  fill="#F5A524"
                  fillOpacity="0.22"
                />
                <circle
                  cx={origin.coordinates.x}
                  cy={origin.coordinates.y}
                  r="5.5"
                  fill="#FFFFFF"
                  stroke="#F5A524"
                  strokeWidth="3"
                />
                <text
                  x={origin.coordinates.x + 12}
                  y={origin.coordinates.y + 5}
                  fill="#F5A524"
                  fontSize="13"
                  fontWeight="800"
                >
                  {origin.name} (Origin)
                </text>
              </g>
            </svg>
          </div>

          {/* Highlighted Countries Bar & Confirmation Note */}
          <div className="mt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-2">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-steel-light/80 mr-1">
                  Key Focus Markets:
                </span>
                {destinations.map((country) => (
                  <span
                    key={country.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-accent/40 bg-amber-accent/10 px-3 py-1 text-xs font-semibold text-white"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-amber-accent"
                      aria-hidden="true"
                    />
                    {country.name}
                  </span>
                ))}
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-light">
                  + International Enquiries
                </span>
              </div>

              <p className="text-base sm:text-lg font-medium text-white">
                {companyConfig.worldSupplyNote}
              </p>
            </div>

            <div className="w-full sm:w-auto shrink-0">
              <Button href="/rfq" variant="primary" size="lg">
                Get a Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
