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

export type ManufacturingStatus =
  | "Manufactured in-house"
  | "Arranged to your specification";

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortTitle?: string;
  description: string;
  shapeType: CategoryShapeType;
  manufacturingStatus: ManufacturingStatus;
  origin: string;
  /** Path to studio category image in /public/products/ */
  imagePath: string;
  /** Path to .glb 3D model in /public/models/ */
  modelPath: string;
  keywords: string[];
  relatedCategorySlugs: string[];
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

export interface TrustConfig {
  defaultOrigin: string;
  inspectionNote: string;
  indicativeSpecNotice: string;
  illustrativeImageNotice: string;
  standardsHeading: string;
  confirmedDocuments: string[];
  pendingDocuments: string[];
  /** Set to true only when pendingDocuments should be displayed publicly */
  showPending: boolean;
  destinationSuggestions: string[];
}

export const companyConfig = {
  name: "NAV INDIA ENTERPRISES",
  siteUrl: "https://navindiaenterprises.com",
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
  trust: {
    defaultOrigin: "Assembled in India",
    inspectionNote: "Inspection can be arranged",
    indicativeSpecNotice:
      "Specifications are indicative. Final specification is confirmed in your quotation.",
    illustrativeImageNotice: "Illustrative image. Actual product may vary.",
    standardsHeading: "Standards (as per your requirement)",
    confirmedDocuments: [
      "Commercial Invoice",
      "Packing List",
      "Certificate of Origin (where applicable)",
    ],
    pendingDocuments: [
      "Material Test Certificate (MTC)",
      "Test Certificate",
      "Inspection Report",
    ],
    showPending: false,
    destinationSuggestions: [
      "UAE",
      "Qatar",
      "Bahrain",
      "Saudi Arabia",
      "Oman",
      "Kuwait",
      "Other",
    ],
  } as TrustConfig,
  navigation: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
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
      name: "Industrial Hoses (Pipes & Tubes)",
      description:
        "Industrial hoses, pipes, and tubes manufactured in-house to your required bore size, working pressure, and duty.",
      shapeType: "hose",
      manufacturingStatus: "Manufactured in-house",
      origin: "Assembled in India",
      imagePath: "/products/hoses.jpg",
      modelPath: "/models/hoses.glb",
      keywords: [
        "hose",
        "hoses",
        "industrial hoses",
        "pipes",
        "tubes",
        "hydraulic hose",
        "oil hose",
        "chemical hose",
        "steam hose",
      ],
      relatedCategorySlugs: ["clamps", "fasteners", "seals-o-rings"],
    },
    {
      id: "fasteners",
      slug: "fasteners",
      name: "Fasteners (Bolts, Nuts & Studs)",
      description:
        "Industrial bolts, nuts, studs, washers, and eye bolts manufactured in-house to your required size, thread, and grade.",
      shapeType: "fastener",
      manufacturingStatus: "Manufactured in-house",
      origin: "Assembled in India",
      imagePath: "/products/fasteners.jpg",
      modelPath: "/models/fasteners.glb",
      keywords: [
        "fasteners",
        "bolts",
        "nuts",
        "studs",
        "washers",
        "eye bolts",
        "hex bolts",
        "allen bolts",
        "anchor bolts",
        "u-bolts",
      ],
      relatedCategorySlugs: [
        "seals-o-rings",
        "lifting-rigging",
        "other-supplies",
      ],
    },
    {
      id: "seals-o-rings",
      slug: "seals-o-rings",
      name: "Seals & O-Rings",
      description:
        "O-rings, rotary shaft seals, hydraulic seals, mechanical seals, and gaskets arranged to your dimensions and material.",
      shapeType: "seal",
      manufacturingStatus: "Arranged to your specification",
      origin: "Assembled in India",
      imagePath: "/products/seals-and-o-rings.jpg",
      modelPath: "/models/seals-and-o-rings.glb",
      keywords: [
        "seals",
        "o-rings",
        "orings",
        "oil seals",
        "mechanical seals",
        "hydraulic seals",
        "gaskets",
      ],
      relatedCategorySlugs: ["fasteners", "hoses", "bearings"],
    },
    {
      id: "abrasives",
      slug: "abrasives",
      name: "Abrasives (Grinding Wheels & Discs)",
      description:
        "Bonded grinding wheels, cutting discs, coated flap discs, and superabrasive tools arranged to your specification.",
      shapeType: "abrasive",
      manufacturingStatus: "Arranged to your specification",
      origin: "Assembled in India",
      imagePath: "/products/abrasives.jpg",
      modelPath: "/models/abrasives.glb",
      keywords: [
        "abrasives",
        "grinding wheels",
        "cutting discs",
        "flap discs",
        "sandpaper",
        "emery cloth",
        "diamond tools",
      ],
      relatedCategorySlugs: ["other-supplies", "ms-ss-products"],
    },
    {
      id: "lifting-rigging",
      slug: "lifting-rigging",
      name: "Lifting & Rigging Products (Slings, Chains & Shackles)",
      description:
        "Wire rope slings, chain slings, webbing slings, shackles, hooks, turnbuckles, and hoists arranged to your specification.",
      shapeType: "lifting",
      manufacturingStatus: "Arranged to your specification",
      origin: "Assembled in India",
      imagePath: "/products/lifting-products.jpg",
      modelPath: "/models/lifting-products.glb",
      keywords: [
        "lifting",
        "rigging",
        "slings",
        "chains",
        "shackles",
        "hooks",
        "turnbuckles",
        "hoists",
      ],
      relatedCategorySlugs: ["fasteners", "clamps"],
    },
    {
      id: "clamps",
      slug: "clamps",
      name: "Industrial Clamps",
      description:
        "Worm-drive, T-bolt, ear hose clamps, and heavy-duty pipe mounting clamps arranged to your required size and grade.",
      shapeType: "clamp",
      manufacturingStatus: "Arranged to your specification",
      origin: "Assembled in India",
      imagePath: "/products/industrial-clamps.jpg",
      modelPath: "/models/industrial-clamps.glb",
      keywords: [
        "clamps",
        "industrial clamps",
        "hose clamps",
        "pipe clamps",
        "t-bolt",
        "jubilee",
        "u-clamp",
      ],
      relatedCategorySlugs: ["hoses", "fasteners"],
    },
    {
      id: "bearings",
      slug: "bearings",
      name: "Bearings (Roller & Ball Bearings)",
      description:
        "Ball bearings, roller bearings, thrust bearings, and pillow block units arranged to your required series and dimensions.",
      shapeType: "bearing",
      manufacturingStatus: "Arranged to your specification",
      origin: "Assembled in India",
      imagePath: "/products/bearings.jpg",
      modelPath: "/models/bearings.glb",
      keywords: [
        "bearings",
        "roller bearings",
        "ball bearings",
        "pillow block",
        "tapered roller",
        "spherical roller",
      ],
      relatedCategorySlugs: ["seals-o-rings", "fasteners"],
    },
    {
      id: "ms-ss-products",
      slug: "ms-ss-products",
      name: "MS/SS Industrial Products",
      description:
        "Mild steel and stainless steel industrial products arranged to your requirement and technical specification.",
      shapeType: "metal",
      manufacturingStatus: "Arranged to your specification",
      origin: "Assembled in India",
      imagePath: "/products/ms-ss-industrial-products.jpg",
      modelPath: "/models/ms-ss-industrial-products.glb",
      keywords: [
        "ms",
        "ss",
        "mild steel",
        "stainless steel",
        "ss304",
        "ss316",
      ],
      relatedCategorySlugs: ["fasteners", "other-supplies"],
    },
    {
      id: "other-supplies",
      slug: "other-supplies",
      name: "Other Industrial Supplies",
      description:
        "Industrial valves and custom specification items arranged against your project enquiry list.",
      shapeType: "general",
      manufacturingStatus: "Arranged to your specification",
      origin: "Assembled in India",
      imagePath: "/products/other-industrial-supplies.jpg",
      modelPath: "/models/other-industrial-supplies.glb",
      keywords: [
        "other",
        "industrial",
        "supplies",
        "items",
        "valves",
        "gate valve",
        "ball valve",
        "custom",
      ],
      relatedCategorySlugs: ["fasteners", "hoses"],
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
      title:
        "Manufacturing and supply capability, built around your specification",
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
