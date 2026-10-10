import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCategoriesSection } from "@/components/home/ProductCategoriesSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { WhyBuyersSection } from "@/components/home/WhyBuyersSection";
import { WorldSupplySection } from "@/components/home/WorldSupplySection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 2. Intro (Hero) */}
      <HeroSection />

      {/* 3. Product Categories + Client Search */}
      <ProductCategoriesSection />

      {/* 4. How We Work (5 steps) */}
      <HowWeWorkSection />

      {/* 5. Why Buyers Work With Us (4 cards) */}
      <WhyBuyersSection />

      {/* 6. Supply Across the World (2D SVG Map) */}
      <WorldSupplySection />

      {/* 7. Final Call to Action */}
      <FinalCtaSection />
    </>
  );
}
