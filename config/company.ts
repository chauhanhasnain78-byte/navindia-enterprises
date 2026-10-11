export type CategoryShapeType =
  | "hose"
  | "fastener"
  | "seal"
  | "abrasive"
  | "lifting"
  | "clamp"
  | "bearing"
  | "metal"
  | "general";


export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortTitle?: string;
  description: string;
  shapeType: CategoryShapeType;
  /** Path to studio product image in /public/products/ */
  imagePath: string;
  /** Path to .glb 3D model in /public/models/ */
  modelPath: string;
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
      id: "industrial-hoses",
      slug: "hoses",
      name: "Industrial Hoses (Pipes & Tubes)",
      description:
        "Industrial hoses, pipes, and tubes arranged to your required size and duty.",
      shapeType: "hose",
      imagePath: "/products/hoses.jpg",
      modelPath: "/models/hoses.glb",
      keywords: ["hose", "hoses", "industrial hoses", "pipes", "tubes"],
    },
    {
      id: "fasteners",
      slug: "fasteners",
      name: "Fasteners (Bolts, Nuts & Studs)",
      description:
        "Fasteners including bolts, nuts, and studs arranged to your required size, grade, and specification.",
      shapeType: "fastener",
      imagePath: "/products/fasteners.jpg",
      modelPath: "/models/fasteners.glb",
      keywords: [
        "fasteners",
        "bolts",
        "nuts",
        "studs",
        "washers",
        "eye bolts",
      ],
    },
    {
      id: "seals-and-o-rings",
      slug: "seals-and-o-rings",
      name: "Seals & O-Rings",
      description:
        "O-rings and sealing products arranged to your dimensions and material.",
      shapeType: "seal",
      imagePath: "/products/seals-and-o-rings.jpg",
      modelPath: "/models/seals-and-o-rings.glb",
      keywords: ["seals", "o-rings", "orings", "sealing", "gaskets"],
    },
    {
      id: "abrasives",
      slug: "abrasives",
      name: "Abrasives (Grinding Wheels & Discs)",
      description:
        "Grinding wheels, cutting discs, and industrial abrasives arranged to your application and specification.",
      shapeType: "abrasive",
      imagePath: "/products/abrasives.jpg",
      modelPath: "/models/abrasives.glb",
      keywords: [
        "abrasives",
        "abrasive",
        "grinding wheels",
        "discs",
        "flap discs",
      ],
    },
    {
      id: "lifting-products",
      slug: "lifting-products",
      name: "Lifting & Rigging Products (Slings, Chains & Shackles)",
      description:
        "Slings, chains, shackles, and lifting products arranged to your specification.",
      shapeType: "lifting",
      imagePath: "/products/lifting-products.jpg",
      modelPath: "/models/lifting-products.glb",
      keywords: [
        "lifting",
        "rigging",
        "slings",
        "chains",
        "shackles",
        "lifting products",
      ],
    },
    {
      id: "industrial-clamps",
      slug: "industrial-clamps",
      name: "Industrial Clamps",
      description:
        "Heavy-duty hose, pipe, and mounting clamps arranged to your required size and material.",
      shapeType: "clamp",
      imagePath: "/products/industrial-clamps.jpg",
      modelPath: "/models/industrial-clamps.glb",
      keywords: [
        "clamps",
        "industrial clamps",
        "hose clamps",
        "pipe clamps",
        "u-bolt clamps",
        "t-bolt clamps",
      ],
    },
    {
      id: "bearings",
      slug: "bearings",
      name: "Bearings (Roller & Ball Bearings)",
      description:
        "Roller bearings and ball bearings arranged to your required series, dimensions, and specification.",
      shapeType: "bearing",
      imagePath: "/products/bearings.jpg",
      modelPath: "/models/bearings.glb",
      keywords: [
        "bearings",
        "roller bearings",
        "ball bearings",
        "bearing",
      ],
    },
    {
      id: "ms-ss-industrial-products",
      slug: "ms-ss-industrial-products",
      name: "MS/SS Industrial Products",
      description:
        "Mild steel and stainless steel industrial products arranged to your requirement.",
      shapeType: "metal",
      imagePath: "/products/ms-ss-industrial-products.jpg",
      modelPath: "/models/ms-ss-industrial-products.glb",
      keywords: ["ms", "ss", "mild steel", "stainless steel", "flanges", "fittings"],
    },
    {
      id: "other-industrial-supplies",
      slug: "other-industrial-supplies",
      name: "Other Industrial Supplies",
      description:
        "Other industrial items arranged against your enquiry list.",
      shapeType: "general",
      imagePath: "/products/other-industrial-supplies.jpg",
      modelPath: "/models/other-industrial-supplies.glb",
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
