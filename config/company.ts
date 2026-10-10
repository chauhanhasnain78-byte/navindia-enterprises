export type CategoryShapeType =
  | "hose"
  | "fastener"
  | "seal"
  | "abrasive"
  | "lifting"
  | "metal"
  | "general";

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortTitle?: string;
  description: string;
  shapeType: CategoryShapeType;
  keywords: string[];
}

export interface WorkStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface BuyerFeature {
  id: string;
  title: string;
  description: string;
  iconName: "capability" | "consolidation" | "documentation" | "gulf";
}

export interface HighlightedCountry {
  id: string;
  name: string;
  region: string;
  /** SVG map coordinates (viewBox 0 0 1000 480) */
  coordinates: { x: number; y: number };
  labelOffset: { dx: number; dy: number };
}

export const companyConfig = {
  name: "NAV INDIA ENTERPRISES",
  tagline: "You Specify. We Source. We Supply.",
  heroSupportingLine:
    "Industrial products arranged to your specification and supplied worldwide.",
  positioningSummary:
    "Industrial products manufacturing, trading and export company based in Mumbai, India.",
  phone: "+91 83559 66364",
  phoneRaw: "+918355966364",
  whatsappNumber: "918355966364",
  whatsappPrefilledMessage:
    "Hello NAV INDIA ENTERPRISES, we would like to share an industrial product requirement for quotation.",
  get whatsappUrl(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
      this.whatsappPrefilledMessage
    )}`;
  },
  email: "chauhanhasnain78@gmail.com",
  address:
    "295/296, Atlaswala Estate, 81, Morland Rd, Nagpada, Mumbai Central, Mumbai, Maharashtra 400008",
  cityCountry: "Mumbai, India",
  logo: {
    /** Place "NIE logo.png" as /public/logo.png. Automatically falls back to text wordmark if file is absent. */
    path: "/logo.png",
    originalFileName: "NIE logo.png",
    alt: "NAV INDIA ENTERPRISES",
  },
  registrationPlaceholder:
    "[Placeholder: GST / IEC / Registration & Certification Details — To Be Added]",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "How We Work", href: "/#how-we-work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  originPoint: {
    name: "Mumbai, India",
    coordinates: { x: 678, y: 245 },
  },
  highlightedCountries: [
    {
      id: "uae",
      name: "UAE",
      region: "Gulf Region",
      coordinates: { x: 616, y: 222 },
      labelOffset: { dx: 12, dy: 16 },
    },
    {
      id: "qatar",
      name: "Qatar",
      region: "Gulf Region",
      coordinates: { x: 602, y: 215 },
      labelOffset: { dx: -44, dy: 14 },
    },
    {
      id: "bahrain",
      name: "Bahrain",
      region: "Gulf Region",
      coordinates: { x: 596, y: 208 },
      labelOffset: { dx: -56, dy: -10 },
    },
  ] as HighlightedCountry[],
  worldSupplyNote: "Tell us your country, we will confirm.",
  categories: [
    {
      id: "hoses",
      slug: "hoses",
      name: "Hoses",
      description:
        "Industrial hoses arranged to your required size and duty.",
      shapeType: "hose",
      keywords: ["hose", "hoses"],
    },
    {
      id: "fasteners",
      slug: "fasteners",
      name: "Fasteners (bolts, nuts, washers, studs, eye bolts)",
      description:
        "Fasteners arranged to your required size, grade, and specification.",
      shapeType: "fastener",
      keywords: [
        "fasteners",
        "bolts",
        "nuts",
        "washers",
        "studs",
        "eye bolts",
      ],
    },
    {
      id: "seals-and-o-rings",
      slug: "seals-and-o-rings",
      name: "Seals and O-Rings",
      description:
        "O-rings and sealing products arranged to your dimensions and material.",
      shapeType: "seal",
      keywords: ["seals", "o-rings", "orings", "sealing"],
    },
    {
      id: "abrasives",
      slug: "abrasives",
      name: "Abrasives",
      description:
        "Industrial abrasives arranged to your application and specification.",
      shapeType: "abrasive",
      keywords: ["abrasives", "abrasive"],
    },
    {
      id: "lifting-products",
      slug: "lifting-products",
      name: "Lifting Products",
      description:
        "Lifting-related products arranged to your specification.",
      shapeType: "lifting",
      keywords: ["lifting", "lifting products"],
    },
    {
      id: "ms-ss-industrial-products",
      slug: "ms-ss-industrial-products",
      name: "MS/SS Industrial Products",
      description:
        "Mild steel and stainless steel industrial products arranged to your requirement.",
      shapeType: "metal",
      keywords: ["ms", "ss", "mild steel", "stainless steel"],
    },
    {
      id: "other-industrial-supplies",
      slug: "other-industrial-supplies",
      name: "Other Industrial Supplies",
      description:
        "Other industrial items arranged against your enquiry list.",
      shapeType: "general",
      keywords: ["other", "industrial", "supplies", "items"],
    },
  ] as ProductCategory[],
  howWeWorkSteps: [
    {
      stepNumber: "01",
      title: "Send your requirement",
      description:
        "Share your item list, sizes, grades, quantities, or technical drawings along with destination details.",
    },
    {
      stepNumber: "02",
      title: "We review it",
      description:
        "We verify every line item against your technical specification and clarify any required details.",
    },
    {
      stepNumber: "03",
      title: "Quotation",
      description:
        "Receive a clear quotation outlining product details, pricing, lead time, and dispatch terms.",
    },
    {
      stepNumber: "04",
      title: "Order confirmation",
      description:
        "Once you approve the offer and terms, we schedule and coordinate your order for fulfillment.",
    },
    {
      stepNumber: "05",
      title: "Shipment and export documents",
      description:
        "Your cargo is packed and dispatched with required export documentation for customs clearance.",
    },
  ] as WorkStep[],
  whyBuyersWorkWithUs: [
    {
      id: "capability",
      title: "Manufacturing and supply capability, built around your specification",
      description:
        "Products are arranged strictly around your technical drawings, material grades, and application requirements.",
      iconName: "capability",
    },
    {
      id: "consolidation",
      title: "Multiple products in one enquiry",
      description:
        "Combine items across multiple industrial categories into a single streamlined quotation request.",
      iconName: "consolidation",
    },
    {
      id: "documentation",
      title:
        "Export documentation support (commercial invoice, packing list, certificate of origin where applicable)",
      description:
        "Structured export paperwork prepared carefully to support smooth international freight and customs handling.",
      iconName: "documentation",
    },
    {
      id: "gulf-focus",
      title: "Gulf focus",
      description:
        "Dedicated focus on industrial buyers in the UAE, Qatar, and Bahrain, while welcoming enquiries from other markets.",
      iconName: "gulf",
    },
  ] as BuyerFeature[],
};
