import { companyConfig, ProductCategory } from "@/config/company";

export type RequirementFieldType = "select" | "text";

export interface RequirementField {
  id: string;
  label: string;
  type: RequirementFieldType;
  unit?: string;
  placeholder?: string;
  /** Options for 'select' fields. "Not sure" is always appended automatically by the UI. */
  options?: string[];
  /** When true on a 'select' field, an "Other (type here)" option is included with a custom text input. */
  allowOther?: boolean;
  /** Optional helper/guide text displayed below or beside the field */
  guideText?: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  /** One neutral sentence using only genuine specification data */
  summary: string;
  /** Path to illustrative image: /products/<category>/<product>.webp */
  imagePath: string;
  /** Dynamic specification fields for the Requirement Box */
  fields: RequirementField[];
  /** Standards listed in the Source and Quality block under "Standards (as per your requirement)" */
  standards: string[];
  /** Optional guidance note shown on the product page */
  pageNote?: string;
  /** Quantity unit options for this product */
  quantityUnits?: string[];
  defaultQuantityUnit?: string;
}

const HOSE_ID_GUIDE =
  'ID guide: small bore 1/8" to 1" (3 to 25 mm), medium 1-1/4" to 3" (32 to 76 mm), large 4" to 12" (102 to 300 mm), extra large 14" to 36"+ (350 to 900 mm+).';

const HOSE_COMMON_FIELDS: RequirementField[] = [
  {
    id: "inner_diameter",
    label: "Inner Diameter (ID)",
    type: "select",
    unit: "mm / inch",
    options: [
      'Small bore: 1/8" to 1" (3 to 25 mm)',
      'Medium bore: 1-1/4" to 3" (32 to 76 mm)',
      'Large bore: 4" to 12" (102 to 300 mm)',
      'Extra large bore: 14" to 36"+ (350 to 900 mm+)',
    ],
    allowOther: true,
    guideText: HOSE_ID_GUIDE,
  },
  {
    id: "exact_id",
    label: "Exact ID Size (if known)",
    type: "text",
    unit: "mm or inch",
    placeholder: 'e.g. 1/2" (12.7 mm) or 50 mm',
  },
  {
    id: "length",
    label: "Length",
    type: "text",
    unit: "m / ft",
    placeholder: "e.g. 10 meters per coil or cut length",
  },
  {
    id: "working_pressure",
    label: "Working Pressure",
    type: "text",
    unit: "bar / PSI",
    placeholder: "e.g. 20 bar or 3000 PSI",
  },
  {
    id: "material",
    label: "Material / Braid",
    type: "select",
    options: [
      "NBR",
      "EPDM",
      "PTFE",
      "UHMWPE",
      "PVC",
      "Polyurethane / PU",
      "SS304 braid",
      "SS316 / SS316L braid",
      "MS wire braid",
    ],
    allowOther: true,
  },
  {
    id: "reinforcement",
    label: "Reinforcement",
    type: "select",
    options: ["Single wire braid", "Double wire braid"],
    allowOther: true,
  },
  {
    id: "end_fittings",
    label: "End Fittings",
    type: "text",
    placeholder: "e.g. BSP female swivel, flange end, camlock, or plain end",
  },
  {
    id: "standard",
    label: "Standard",
    type: "select",
    options: [
      "SAE 100R1 (single wire)",
      "SAE 100R2 (double wire)",
      "DIN EN 853",
      "ISO 1436",
      "FDA / USP Class VI (where applicable)",
    ],
    allowOther: true,
  },
];

const HOSE_STANDARDS = [
  "SAE 100R1 (single wire)",
  "SAE 100R2 (double wire)",
  "DIN EN 853",
  "ISO 1436",
  "Food Grade: FDA / USP Class VI (where applicable)",
];

const ABRASIVE_GRIT_GUIDE =
  "Grit guide: extra coarse 16/24/36, coarse 40/50/60, medium 80/100/120, fine 150/180/220, ultra fine 320/600/1000+.";

const BEARING_COMMON_FIELDS: RequirementField[] = [
  {
    id: "bearing_number",
    label: "Bearing Number (if known)",
    type: "text",
    placeholder: "e.g. 6205, 32210, 22212, UCP208 (or leave blank)",
  },
  {
    id: "bore_id",
    label: "Bore Inner Diameter (ID)",
    type: "text",
    unit: "mm / inch",
    placeholder: "e.g. 25 mm (or Not sure)",
  },
  {
    id: "outer_diameter",
    label: "Outer Diameter (OD)",
    type: "text",
    unit: "mm / inch",
    placeholder: "e.g. 52 mm (or Not sure)",
  },
  {
    id: "width",
    label: "Width",
    type: "text",
    unit: "mm / inch",
    placeholder: "e.g. 15 mm (or Not sure)",
  },
  {
    id: "material",
    label: "Material",
    type: "select",
    options: [
      "52100 chrome steel",
      "440C stainless",
      "Ceramic / silicon nitride",
    ],
    allowOther: true,
  },
  {
    id: "cage",
    label: "Cage",
    type: "select",
    options: ["Steel", "Brass", "Nylon"],
    allowOther: true,
  },
  {
    id: "precision",
    label: "Precision",
    type: "select",
    options: ["ABEC-1", "ABEC-3", "ABEC-5", "ABEC-7", "ABEC-9"],
    allowOther: true,
  },
  {
    id: "seals",
    label: "Seals / Closures",
    type: "select",
    options: ["Open", "Shielded", "Sealed"],
    allowOther: true,
  },
];

export const catalogProducts: CatalogProduct[] = [
  // ============================================================================
  // 1. INDUSTRIAL HOSES (PIPES & TUBES) [slug: hoses]
  // ============================================================================
  {
    id: "hydraulic-hoses",
    slug: "hydraulic-hoses",
    categorySlug: "hoses",
    name: "Hydraulic Hoses",
    summary:
      "High-pressure hydraulic hoses with single or double steel wire braid reinforcement manufactured to your required bore size, length, and end fitting specification.",
    imagePath: "/products/hoses/hydraulic-hoses.webp",
    fields: HOSE_COMMON_FIELDS,
    standards: [
      "SAE 100R1 (single wire)",
      "SAE 100R2 (double wire)",
      "DIN EN 853",
      "ISO 1436",
    ],
    pageNote: HOSE_ID_GUIDE,
    quantityUnits: ["meters", "feet", "assemblies", "coils", "pcs"],
    defaultQuantityUnit: "meters",
  },
  {
    id: "oil-fuel-hoses",
    slug: "oil-fuel-hoses",
    categorySlug: "hoses",
    name: "Oil & Fuel Hoses",
    summary:
      "Oil-resistant NBR industrial hoses manufactured to your required inner diameter, length, working pressure, and reinforcement.",
    imagePath: "/products/hoses/oil-fuel-hoses.webp",
    fields: HOSE_COMMON_FIELDS,
    standards: HOSE_STANDARDS,
    pageNote: HOSE_ID_GUIDE,
    quantityUnits: ["meters", "feet", "assemblies", "coils", "pcs"],
    defaultQuantityUnit: "meters",
  },
  {
    id: "chemical-hoses",
    slug: "chemical-hoses",
    categorySlug: "hoses",
    name: "Chemical Hoses",
    summary:
      "Industrial chemical hoses featuring a chemical-resistant inner layer such as PTFE or UHMWPE arranged to your required bore size and pressure rating.",
    imagePath: "/products/hoses/chemical-hoses.webp",
    fields: HOSE_COMMON_FIELDS,
    standards: HOSE_STANDARDS,
    pageNote: HOSE_ID_GUIDE,
    quantityUnits: ["meters", "feet", "assemblies", "coils", "pcs"],
    defaultQuantityUnit: "meters",
  },
  {
    id: "water-hoses",
    slug: "water-hoses",
    categorySlug: "hoses",
    name: "Water Hoses",
    summary:
      "Industrial water suction and discharge hoses manufactured across small, medium, large, and extra-large bore diameters.",
    imagePath: "/products/hoses/water-hoses.webp",
    fields: HOSE_COMMON_FIELDS,
    standards: HOSE_STANDARDS,
    pageNote: HOSE_ID_GUIDE,
    quantityUnits: ["meters", "feet", "coils", "pcs"],
    defaultQuantityUnit: "meters",
  },
  {
    id: "air-pneumatic-hoses",
    slug: "air-pneumatic-hoses",
    categorySlug: "hoses",
    name: "Air & Pneumatic Hoses",
    summary:
      "Industrial air and pneumatic hoses manufactured to your required inner diameter, working pressure, material, and end connections.",
    imagePath: "/products/hoses/air-pneumatic-hoses.webp",
    fields: HOSE_COMMON_FIELDS,
    standards: HOSE_STANDARDS,
    pageNote: HOSE_ID_GUIDE,
    quantityUnits: ["meters", "feet", "coils", "pcs"],
    defaultQuantityUnit: "meters",
  },
  {
    id: "steam-hoses",
    slug: "steam-hoses",
    categorySlug: "hoses",
    name: "Steam Hoses",
    summary:
      "Heat-resistant EPDM industrial steam hoses manufactured with wire braid reinforcement for your required bore size and operating pressure.",
    imagePath: "/products/hoses/steam-hoses.webp",
    fields: HOSE_COMMON_FIELDS,
    standards: HOSE_STANDARDS,
    pageNote: HOSE_ID_GUIDE,
    quantityUnits: ["meters", "feet", "assemblies", "coils"],
    defaultQuantityUnit: "meters",
  },
  {
    id: "food-grade-hoses",
    slug: "food-grade-hoses",
    categorySlug: "hoses",
    name: "Food Grade Hoses",
    summary:
      "Non-toxic food grade hoses manufactured to your required inner diameter, material specification, and FDA / USP Class VI requirement where applicable.",
    imagePath: "/products/hoses/food-grade-hoses.webp",
    fields: HOSE_COMMON_FIELDS,
    standards: [
      "FDA / USP Class VI (where applicable)",
      "SAE 100R1 (single wire)",
      "SAE 100R2 (double wire)",
      "DIN EN 853",
      "ISO 1436",
    ],
    pageNote: HOSE_ID_GUIDE,
    quantityUnits: ["meters", "feet", "assemblies", "coils"],
    defaultQuantityUnit: "meters",
  },

  // ============================================================================
  // 2. FASTENERS (BOLTS, NUTS & STUDS) [slug: fasteners]
  // ============================================================================
  {
    id: "hex-bolts",
    slug: "hex-bolts",
    categorySlug: "fasteners",
    name: "Hex Bolts",
    summary:
      'Hex head bolts in metric sizes M3 to M64+ and inch sizes 1/4" to 3"+ across grades 4.6, 8.8, 10.9, 12.9, A2/SS304, and A4/SS316 in full or half thread.',
    imagePath: "/products/fasteners/hex-bolts.webp",
    fields: [
      {
        id: "size",
        label: "Size (Metric or Inch)",
        type: "select",
        unit: "M / inch",
        options: [
          "M3 to M10",
          "M12 to M24",
          "M27 to M48",
          "M52 to M64+",
          '1/4" to 3/4"',
          '7/8" to 2"',
          '2-1/4" to 3"+',
        ],
        allowOther: true,
        guideText: 'Range: M3 to M64+ or 1/4" to 3"+.',
      },
      {
        id: "length",
        label: "Length",
        type: "text",
        unit: "mm / inch",
        placeholder: 'e.g. 50 mm or 2"',
      },
      {
        id: "grade",
        label: "Grade / Material",
        type: "select",
        options: [
          "4.6",
          "8.8",
          "10.9",
          "12.9",
          "A2 / SS304",
          "A4 / SS316",
        ],
        allowOther: true,
      },
      {
        id: "thread",
        label: "Thread Type",
        type: "select",
        options: ["Full thread (DIN 933)", "Half thread (DIN 931)"],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["DIN 933 (full thread)", "DIN 931 (half thread)"],
        allowOther: true,
      },
    ],
    standards: ["DIN 933 (full thread)", "DIN 931 (half thread)"],
    quantityUnits: ["pcs", "sets", "kg", "boxes"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "allen-bolts",
    slug: "allen-bolts",
    categorySlug: "fasteners",
    name: "Allen Bolts (Socket Head)",
    summary:
      'Socket head Allen bolts manufactured in sizes M3 to M64+ or 1/4" to 3"+ across carbon steel, alloy steel, and stainless steel grades.',
    imagePath: "/products/fasteners/allen-bolts.webp",
    fields: [
      {
        id: "size",
        label: "Size (Metric or Inch)",
        type: "select",
        unit: "M / inch",
        options: [
          "M3 to M10",
          "M12 to M24",
          "M27 to M64+",
          '1/4" to 1"',
          '1-1/8" to 3"+',
        ],
        allowOther: true,
        guideText: 'Range: M3 to M64+ or 1/4" to 3"+.',
      },
      {
        id: "length",
        label: "Length",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 40 mm",
      },
      {
        id: "grade",
        label: "Grade / Material",
        type: "select",
        options: [
          "4.6",
          "8.8",
          "10.9",
          "12.9",
          "A2 / SS304",
          "A4 / SS316",
        ],
        allowOther: true,
      },
      {
        id: "thread",
        label: "Thread Type",
        type: "select",
        options: ["Full thread", "Half thread"],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["DIN 912"],
        allowOther: true,
      },
    ],
    standards: ["DIN 912"],
    quantityUnits: ["pcs", "sets", "kg", "boxes"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "carriage-bolts",
    slug: "carriage-bolts",
    categorySlug: "fasteners",
    name: "Carriage Bolts",
    summary:
      "Carriage bolts manufactured to your required diameter, length, and material grade.",
    imagePath: "/products/fasteners/carriage-bolts.webp",
    fields: [
      {
        id: "size",
        label: "Size",
        type: "text",
        unit: "mm / inch",
        placeholder: 'e.g. M10 or 3/8"',
      },
      {
        id: "length",
        label: "Length",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 60 mm",
      },
      {
        id: "grade",
        label: "Grade / Material",
        type: "select",
        options: [
          "4.6",
          "8.8",
          "10.9",
          "12.9",
          "A2 / SS304",
          "A4 / SS316",
        ],
        allowOther: true,
      },
    ],
    standards: ["As per your requirement"],
    quantityUnits: ["pcs", "sets", "kg"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "anchor-bolts",
    slug: "anchor-bolts",
    categorySlug: "fasteners",
    name: "Anchor Bolts (J or L Shape)",
    summary:
      "J-shape and L-shape foundation anchor bolts manufactured to your required thread size, embedment length, and steel grade.",
    imagePath: "/products/fasteners/anchor-bolts.webp",
    fields: [
      {
        id: "shape",
        label: "Shape",
        type: "select",
        options: ["J-Shape", "L-Shape"],
        allowOther: true,
      },
      {
        id: "size",
        label: "Diameter / Thread Size",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. M20 or M24",
      },
      {
        id: "length",
        label: "Length / Bend Dimensions",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 500 mm total length x 100 mm bend",
      },
      {
        id: "grade",
        label: "Grade / Material",
        type: "select",
        options: [
          "4.6",
          "8.8",
          "10.9",
          "A2 / SS304",
          "A4 / SS316",
        ],
        allowOther: true,
      },
    ],
    standards: ["As per drawing / project specification"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "sets",
  },
  {
    id: "u-bolts",
    slug: "u-bolts",
    categorySlug: "fasteners",
    name: "U-Bolts (Pipe Support)",
    summary:
      "Pipe support U-bolts manufactured to your required rod diameter, nominal pipe size, and material grade.",
    imagePath: "/products/fasteners/u-bolts.webp",
    fields: [
      {
        id: "size",
        label: "Rod / Thread Diameter",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. M10 or M12",
      },
      {
        id: "pipe_size",
        label: "Nominal Pipe Size (NB / OD)",
        type: "text",
        unit: "inch / mm",
        placeholder: 'e.g. 2" NB (60.3 mm OD)',
      },
      {
        id: "grade",
        label: "Grade / Material",
        type: "select",
        options: [
          "4.6 (MS)",
          "8.8 (High Tensile)",
          "A2 / SS304",
          "A4 / SS316",
          "Hot Dip Galvanized (HDG)",
        ],
        allowOther: true,
      },
    ],
    standards: ["As per pipe support specification"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "sets",
  },
  {
    id: "stud-bolts",
    slug: "stud-bolts",
    categorySlug: "fasteners",
    name: "Stud Bolts",
    summary:
      'Continuous thread, tap-end, and double-end stud bolts in sizes M6 to M100+ or 1/4" to 4"+ and grades B7, B8/B8M, and L7.',
    imagePath: "/products/fasteners/stud-bolts.webp",
    fields: [
      {
        id: "type",
        label: "Stud Type",
        type: "select",
        options: ["Continuous thread", "Tap end", "Double end"],
        allowOther: true,
      },
      {
        id: "size",
        label: "Diameter Size",
        type: "select",
        unit: "M / inch",
        options: [
          "M6 to M20",
          "M22 to M48",
          "M52 to M100+",
          '1/4" to 1"',
          '1-1/8" to 2"',
          '2-1/4" to 4"+',
        ],
        allowOther: true,
        guideText: 'Range: M6 to M100+ or 1/4" to 4"+.',
      },
      {
        id: "length",
        label: "Length (Custom)",
        type: "text",
        unit: "mm / inch",
        placeholder: 'e.g. 120 mm or 1000 mm threaded rod',
      },
      {
        id: "grade",
        label: "Grade",
        type: "select",
        options: ["B7", "B8 / B8M", "L7"],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["ASME B16.5", "ASTM A193", "DIN 975", "DIN 976"],
        allowOther: true,
      },
    ],
    standards: ["ASME B16.5", "ASTM A193", "DIN 975 / 976"],
    quantityUnits: ["pcs", "sets", "meters"],
    defaultQuantityUnit: "sets",
  },
  {
    id: "nuts",
    slug: "nuts",
    categorySlug: "fasteners",
    name: "Nuts",
    summary:
      "Hex, heavy hex, nyloc, flange, dome/acorn, and wing nuts in grades 4, 8, 10, and 2H (with B7 studs).",
    imagePath: "/products/fasteners/nuts.webp",
    fields: [
      {
        id: "type",
        label: "Nut Type",
        type: "select",
        options: [
          "Hex",
          "Heavy hex",
          "Nyloc",
          "Flange",
          "Dome / Acorn",
          "Wing",
        ],
        allowOther: true,
      },
      {
        id: "size",
        label: "Thread Size",
        type: "text",
        unit: "M / inch",
        placeholder: 'e.g. M16 or 5/8"',
      },
      {
        id: "grade",
        label: "Grade / Material",
        type: "select",
        options: [
          "Grade 4",
          "Grade 8",
          "Grade 10",
          "Grade 2H (with B7 studs)",
          "A2 / SS304",
          "A4 / SS316",
        ],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["DIN 934", "DIN 985", "ASME B18.2.2"],
        allowOther: true,
      },
    ],
    standards: ["DIN 934", "DIN 985", "ASME B18.2.2"],
    quantityUnits: ["pcs", "kg", "boxes"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "washers",
    slug: "washers",
    categorySlug: "fasteners",
    name: "Washers",
    summary:
      "Plain/flat, spring/split, star/toothed, and Belleville washers in MS, EN8 high tensile, SS A2/A4, PTFE, and Nylon.",
    imagePath: "/products/fasteners/washers.webp",
    fields: [
      {
        id: "type",
        label: "Washer Type",
        type: "select",
        options: [
          "Plain / Flat",
          "Spring / Split",
          "Star / Toothed",
          "Belleville",
        ],
        allowOther: true,
      },
      {
        id: "size",
        label: "Size (Bolt Size or ID x OD x Thickness)",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. M12 or 13 x 24 x 2.5 mm",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: [
          "MS",
          "EN8 high tensile",
          "SS A2 / SS304",
          "SS A4 / SS316",
          "PTFE",
          "Nylon",
        ],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["DIN 125", "DIN 127", "ASTM F436"],
        allowOther: true,
      },
    ],
    standards: ["DIN 125", "DIN 127", "ASTM F436"],
    quantityUnits: ["pcs", "kg", "boxes"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "eye-bolts",
    slug: "eye-bolts",
    categorySlug: "fasteners",
    name: "Eye Bolts",
    summary:
      "Collared/shouldered and plain/uncollared eye bolts in forged carbon steel C15/C15E, alloy steel, and SS316 to DIN 580.",
    imagePath: "/products/fasteners/eye-bolts.webp",
    fields: [
      {
        id: "type",
        label: "Eye Bolt Type",
        type: "select",
        options: [
          "Collared / Shouldered (for angular lifting)",
          "Plain / Uncollared (straight vertical lifting only)",
        ],
        allowOther: true,
      },
      {
        id: "size",
        label: "Thread Size",
        type: "text",
        unit: "M / inch",
        placeholder: "e.g. M16, M20, M24",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: [
          "Forged carbon steel C15 / C15E",
          "Alloy steel",
          "SS316",
        ],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["DIN 580"],
        allowOther: true,
      },
    ],
    standards: ["DIN 580"],
    pageNote:
      "Application note: Collared (shouldered) eye bolts are used for angular lifting; plain (uncollared) eye bolts are for straight vertical lifting only.",
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },

  // ============================================================================
  // 3. SEALS & O-RINGS [slug: seals-o-rings]
  // ============================================================================
  {
    id: "o-rings",
    slug: "o-rings",
    categorySlug: "seals-o-rings",
    name: "O-Rings",
    summary:
      "O-rings arranged by metric inner diameter x cross-section (1 mm to 1000 mm+) or AS568 dash number in NBR, Viton/FKM, EPDM, Silicone, and PTFE.",
    imagePath: "/products/seals-o-rings/o-rings.webp",
    fields: [
      {
        id: "dimensions",
        label: "ID x Cross-Section (CS) or AS568 Dash Number",
        type: "text",
        unit: "mm / AS568",
        placeholder: "e.g. 50 mm ID x 3.5 mm CS or AS568-214",
        guideText: "Range: 1 mm to 1000 mm+ or standard AS568 dash numbers.",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["NBR", "Viton / FKM", "EPDM", "Silicone", "PTFE"],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["AS568", "ISO 3601"],
        allowOther: true,
      },
    ],
    standards: ["AS568", "ISO 3601"],
    quantityUnits: ["pcs", "sets", "kits"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "oil-seals",
    slug: "oil-seals",
    categorySlug: "seals-o-rings",
    name: "Oil Seals (Rotary Shaft Seals)",
    summary:
      "Rotary shaft oil seals arranged by shaft ID x bore OD x width in NBR, Viton, and PU to ISO 6194.",
    imagePath: "/products/seals-o-rings/oil-seals.webp",
    fields: [
      {
        id: "dimensions",
        label: "Shaft ID x Bore OD x Width",
        type: "text",
        unit: "mm",
        placeholder: "e.g. 50 x 72 x 8 mm",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["NBR", "Viton", "PU"],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["ISO 6194"],
        allowOther: true,
      },
    ],
    standards: ["ISO 6194"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "hydraulic-pneumatic-seals",
    slug: "hydraulic-pneumatic-seals",
    categorySlug: "seals-o-rings",
    name: "Hydraulic & Pneumatic Seals",
    summary:
      "Piston seals, rod seals, and wiper seals arranged to your cylinder dimensions in NBR, Viton, and PU.",
    imagePath: "/products/seals-o-rings/hydraulic-pneumatic-seals.webp",
    fields: [
      {
        id: "type",
        label: "Seal Type",
        type: "select",
        options: ["Piston seal", "Rod seal", "Wiper seal"],
        allowOther: true,
      },
      {
        id: "dimensions",
        label: "Dimensions (ID x OD x Height/Width)",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 60 x 75 x 10 mm",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["NBR", "Viton", "PU"],
        allowOther: true,
      },
    ],
    standards: ["As per cylinder groove specification"],
    quantityUnits: ["pcs", "sets", "kits"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "mechanical-seals",
    slug: "mechanical-seals",
    categorySlug: "seals-o-rings",
    name: "Mechanical Seals",
    summary:
      "Mechanical shaft seals arranged by shaft size and face material (Ceramic, Carbon, Silicon Carbide) to API 682.",
    imagePath: "/products/seals-o-rings/mechanical-seals.webp",
    fields: [
      {
        id: "shaft_size",
        label: "Shaft Size",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 35 mm or 1.5 inch",
      },
      {
        id: "face_material",
        label: "Face Material",
        type: "select",
        options: ["Ceramic", "Carbon", "Silicon Carbide"],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["API 682"],
        allowOther: true,
      },
    ],
    standards: ["API 682"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "gaskets",
    slug: "gaskets",
    categorySlug: "seals-o-rings",
    name: "Gaskets",
    summary:
      "Flat industrial gaskets arranged to your required size, flange specification, and sealing material.",
    imagePath: "/products/seals-o-rings/gaskets.webp",
    fields: [
      {
        id: "type",
        label: "Gasket Type",
        type: "select",
        options: ["Flat"],
        allowOther: true,
      },
      {
        id: "size_or_flange",
        label: "Size or Flange Specification",
        type: "text",
        placeholder: 'e.g. DN100 / 4" Class 150 or custom dimensions',
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: [
          "Non-asbestos sheet",
          "EPDM",
          "NBR",
          "PTFE",
          "Graphite",
          "Silicone",
        ],
        allowOther: true,
      },
    ],
    standards: ["As per flange / drawing specification"],
    quantityUnits: ["pcs", "sets", "sheets"],
    defaultQuantityUnit: "pcs",
  },

  // ============================================================================
  // 4. ABRASIVES (GRINDING WHEELS & DISCS) [slug: abrasives]
  // ============================================================================
  {
    id: "bonded-abrasives",
    slug: "bonded-abrasives",
    categorySlug: "abrasives",
    name: "Bonded Abrasives (Grinding Wheels & Cutting Discs)",
    summary:
      "Grinding wheels and cutting discs arranged by diameter x thickness x bore, grit size, and abrasive grain.",
    imagePath: "/products/abrasives/bonded-abrasives.webp",
    fields: [
      {
        id: "dimensions",
        label: "Diameter x Thickness x Bore",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 115 x 1.0 x 22.23 mm or 180 x 6 x 22.23 mm",
      },
      {
        id: "grit",
        label: "Grit",
        type: "select",
        options: [
          "Extra coarse (16 / 24 / 36)",
          "Coarse (40 / 50 / 60)",
          "Medium (80 / 100 / 120)",
          "Fine (150 / 180 / 220)",
          "Ultra fine (320 / 600 / 1000+)",
        ],
        allowOther: true,
        guideText: ABRASIVE_GRIT_GUIDE,
      },
      {
        id: "grain",
        label: "Abrasive Grain",
        type: "select",
        options: [
          "Aluminium Oxide",
          "Silicon Carbide",
          "Zirconia Alumina",
          "Ceramic",
        ],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["FEPA (F-grade for wheels)", "ANSI / CAMI", "ISO 525"],
        allowOther: true,
      },
    ],
    standards: ["FEPA (F-grade for wheels)", "ANSI / CAMI", "ISO 525"],
    pageNote: ABRASIVE_GRIT_GUIDE,
    quantityUnits: ["pcs", "boxes"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "coated-abrasives",
    slug: "coated-abrasives",
    categorySlug: "abrasives",
    name: "Coated Abrasives (Sandpaper, Flap Discs & Emery Cloth)",
    summary:
      "Sandpaper, flap discs, and emery cloth arranged by form, size, grit, grain, and paper or cloth backing.",
    imagePath: "/products/abrasives/coated-abrasives.webp",
    fields: [
      {
        id: "form",
        label: "Form",
        type: "select",
        options: ["Flap disc", "Sandpaper", "Emery cloth"],
        allowOther: true,
      },
      {
        id: "size",
        label: "Size / Dimensions",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 115 mm flap disc or 230 x 280 mm sheet",
      },
      {
        id: "grit",
        label: "Grit",
        type: "select",
        options: [
          "Extra coarse (16 / 24 / 36)",
          "Coarse (40 / 50 / 60)",
          "Medium (80 / 100 / 120)",
          "Fine (150 / 180 / 220)",
          "Ultra fine (320 / 600 / 1000+)",
        ],
        allowOther: true,
        guideText: ABRASIVE_GRIT_GUIDE,
      },
      {
        id: "grain",
        label: "Abrasive Grain",
        type: "select",
        options: [
          "Aluminium Oxide",
          "Silicon Carbide",
          "Zirconia Alumina",
          "Ceramic",
        ],
        allowOther: true,
      },
      {
        id: "backing",
        label: "Backing",
        type: "select",
        options: ["Paper", "Cloth"],
        allowOther: true,
      },
    ],
    standards: ["FEPA (P-grade for coated)", "ANSI / CAMI", "ISO 6344"],
    pageNote: ABRASIVE_GRIT_GUIDE,
    quantityUnits: ["pcs", "rolls", "sheets", "boxes"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "superabrasives",
    slug: "superabrasives",
    categorySlug: "abrasives",
    name: "Superabrasives (Diamond & CBN Tools)",
    summary:
      "Diamond and CBN superabrasive grinding and cutting tools arranged to your tool type, dimensions, and grit specification.",
    imagePath: "/products/abrasives/superabrasives.webp",
    fields: [
      {
        id: "type",
        label: "Tool Type",
        type: "select",
        options: ["Diamond tool", "CBN (Cubic Boron Nitride) tool"],
        allowOther: true,
      },
      {
        id: "size",
        label: "Size / Dimensions",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 150 mm diameter x 10 mm rim",
      },
      {
        id: "grit",
        label: "Grit",
        type: "select",
        options: [
          "Extra coarse (16 / 24 / 36)",
          "Coarse (40 / 50 / 60)",
          "Medium (80 / 100 / 120)",
          "Fine (150 / 180 / 220)",
          "Ultra fine (320 / 600 / 1000+)",
        ],
        allowOther: true,
        guideText: ABRASIVE_GRIT_GUIDE,
      },
    ],
    standards: ["FEPA", "ANSI / CAMI", "ISO 525"],
    pageNote: ABRASIVE_GRIT_GUIDE,
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },

  // ============================================================================
  // 5. LIFTING & RIGGING PRODUCTS [slug: lifting-rigging]
  // ============================================================================
  {
    id: "wire-rope-slings",
    slug: "wire-rope-slings",
    categorySlug: "lifting-rigging",
    name: "Wire Rope Slings",
    summary:
      "Wire rope slings arranged to your working load limit (up to 100+ tons), effective length, and rope diameter.",
    imagePath: "/products/lifting-rigging/wire-rope-slings.webp",
    fields: [
      {
        id: "wll",
        label: "Working Load Limit (WLL)",
        type: "text",
        unit: "tons",
        placeholder: "e.g. 5 tons (range up to 100+ tons)",
      },
      {
        id: "length",
        label: "Length",
        type: "text",
        unit: "meters / feet",
        placeholder: "e.g. 6 meters",
      },
      {
        id: "rope_diameter",
        label: "Rope Diameter",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 16 mm or 20 mm",
      },
    ],
    standards: ["As per lifting specification"],
    quantityUnits: ["pcs", "sets", "pairs"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "chain-slings",
    slug: "chain-slings",
    categorySlug: "lifting-rigging",
    name: "Chain Slings",
    summary:
      "Alloy steel Grade 80 and Grade 100 chain slings arranged to your required working load limit, length, and number of legs.",
    imagePath: "/products/lifting-rigging/chain-slings.webp",
    fields: [
      {
        id: "grade",
        label: "Alloy Steel Grade",
        type: "select",
        options: ["Grade 80", "Grade 100"],
        allowOther: true,
      },
      {
        id: "wll",
        label: "Working Load Limit (WLL)",
        type: "text",
        unit: "tons",
        placeholder: "e.g. 3.15 tons or 8 tons",
      },
      {
        id: "length",
        label: "Effective Length",
        type: "text",
        unit: "meters",
        placeholder: "e.g. 3 meters",
      },
      {
        id: "legs",
        label: "Number of Legs",
        type: "select",
        options: ["1-leg", "2-leg", "3-leg", "4-leg"],
        allowOther: true,
      },
    ],
    standards: ["Grade 80 / Grade 100 chain sling specification"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "sets",
  },
  {
    id: "webbing-slings",
    slug: "webbing-slings",
    categorySlug: "lifting-rigging",
    name: "Webbing Slings",
    summary:
      "Polyester webbing slings arranged by working load limit, colour code, and length.",
    imagePath: "/products/lifting-rigging/webbing-slings.webp",
    fields: [
      {
        id: "wll",
        label: "Working Load Limit (WLL) & Colour Code",
        type: "select",
        unit: "tons",
        options: [
          "Violet — 1 Ton",
          "Green — 2 Ton",
          "Yellow — 3 Ton",
          "Grey — 4 Ton",
          "Red — 5 Ton",
        ],
        allowOther: true,
        guideText:
          "Colour code guide: Violet 1T, Green 2T, Yellow 3T, Grey 4T, Red 5T.",
      },
      {
        id: "length",
        label: "Length",
        type: "text",
        unit: "meters",
        placeholder: "e.g. 4 meters",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["Polyester"],
        allowOther: true,
      },
    ],
    standards: ["Standard polyester webbing colour code"],
    pageNote:
      "Colour code guide: Violet 1T, Green 2T, Yellow 3T, Grey 4T, Red 5T.",
    quantityUnits: ["pcs", "pairs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "shackles",
    slug: "shackles",
    categorySlug: "lifting-rigging",
    name: "Shackles",
    summary:
      "Bow/omega and D-shackles with screw pin or nut-bolt cotter pin in drop forged carbon steel or alloy steel to US Fed Spec RR-C-271.",
    imagePath: "/products/lifting-rigging/shackles.webp",
    fields: [
      {
        id: "type",
        label: "Shackle Type",
        type: "select",
        options: ["Bow / Omega shackle", "D-shackle"],
        allowOther: true,
      },
      {
        id: "pin",
        label: "Pin Type",
        type: "select",
        options: ["Screw pin", "Nut-bolt with cotter pin"],
        allowOther: true,
      },
      {
        id: "wll",
        label: "Working Load Limit (WLL)",
        type: "text",
        unit: "tons",
        placeholder: "e.g. 3.25T, 4.75T, 6.5T, 9.5T",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["Drop forged carbon steel", "Alloy steel"],
        allowOther: true,
      },
    ],
    standards: ["US Fed Spec RR-C-271"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "lifting-hooks",
    slug: "lifting-hooks",
    categorySlug: "lifting-rigging",
    name: "Lifting Hooks",
    summary:
      "Eye, clevis, and swivel lifting hooks with safety latches arranged to your working load limit.",
    imagePath: "/products/lifting-rigging/lifting-hooks.webp",
    fields: [
      {
        id: "type",
        label: "Hook Type",
        type: "select",
        options: ["Eye hook", "Clevis hook", "Swivel hook"],
        allowOther: true,
      },
      {
        id: "wll",
        label: "Working Load Limit (WLL)",
        type: "text",
        unit: "tons",
        placeholder: "e.g. 2T, 3.15T, 5.3T",
      },
      {
        id: "safety_latch",
        label: "Safety Latch",
        type: "select",
        options: ["With safety latch", "Self-locking", "Without latch"],
        allowOther: true,
      },
    ],
    standards: ["As per rigging requirement"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "turnbuckles",
    slug: "turnbuckles",
    categorySlug: "lifting-rigging",
    name: "Turnbuckles (Rigging Screws)",
    summary:
      "Hot-dip galvanized rigging screws and turnbuckles with eye-eye, hook-hook, or jaw-jaw end fittings.",
    imagePath: "/products/lifting-rigging/turnbuckles.webp",
    fields: [
      {
        id: "ends",
        label: "End Configuration",
        type: "select",
        options: ["Eye-Eye", "Hook-Hook", "Jaw-Jaw", "Hook-Eye", "Jaw-Eye"],
        allowOther: true,
      },
      {
        id: "size",
        label: "Thread Size / Take-Up",
        type: "text",
        unit: "mm / inch",
        placeholder: 'e.g. M16 or 5/8" x 6"',
      },
      {
        id: "finish",
        label: "Finish",
        type: "select",
        options: ["Hot dip galvanized"],
        allowOther: true,
      },
    ],
    standards: ["As per rigging specification"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "hoists",
    slug: "hoists",
    categorySlug: "lifting-rigging",
    name: "Hoists (Chain Pulley Blocks)",
    summary:
      "Chain hoists for vertical lifting and lever hoists for horizontal pulling in capacities from 0.5 ton to 20+ ton.",
    imagePath: "/products/lifting-rigging/hoists.webp",
    fields: [
      {
        id: "type",
        label: "Hoist Type",
        type: "select",
        options: [
          "Chain hoist (for vertical lift)",
          "Lever hoist (for horizontal pull)",
        ],
        allowOther: true,
      },
      {
        id: "capacity",
        label: "Capacity",
        type: "select",
        unit: "tons",
        options: [
          "0.5 ton",
          "1 ton",
          "1.5 ton",
          "2 ton",
          "3 ton",
          "5 ton",
          "10 ton",
          "20+ ton",
        ],
        allowOther: true,
        guideText: "Range: 0.5 ton to 20+ ton.",
      },
      {
        id: "lift_height",
        label: "Lift Height",
        type: "text",
        unit: "meters",
        placeholder: "e.g. 3 meters or 6 meters",
      },
    ],
    standards: ["As per lifting capacity requirement"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },

  // ============================================================================
  // 6. INDUSTRIAL CLAMPS [slug: clamps]
  // ============================================================================
  {
    id: "hose-clamps",
    slug: "hose-clamps",
    categorySlug: "clamps",
    name: "Hose Clamps",
    summary:
      "Worm drive (Jubilee), T-bolt, and ear (Oetiker) hose clamps arranged across W1, W2, W4, and W5 material grades.",
    imagePath: "/products/clamps/hose-clamps.webp",
    fields: [
      {
        id: "type",
        label: "Clamp Type",
        type: "select",
        options: [
          "Worm drive / Jubilee",
          "T-bolt",
          "Ear / Oetiker",
        ],
        allowOther: true,
      },
      {
        id: "size_range",
        label: "Clamping Size Range",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. 32–50 mm or 60–68 mm",
      },
      {
        id: "grade",
        label: "Material Grade",
        type: "select",
        options: [
          "W1 (zinc-plated MS)",
          "W2 (band SS430, screw MS)",
          "W4 (100% SS304)",
          "W5 (100% SS316)",
        ],
        allowOther: true,
      },
    ],
    standards: ["DIN 3017 (worm drive)"],
    quantityUnits: ["pcs", "boxes", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "pipe-mounting-clamps",
    slug: "pipe-mounting-clamps",
    categorySlug: "clamps",
    name: "Pipe Mounting Clamps",
    summary:
      "Saddle/U-clamps, hydraulic block clamps, clevis hangers, and EPDM rubber-lined pipe mounting clamps arranged by pipe size and grade.",
    imagePath: "/products/clamps/pipe-mounting-clamps.webp",
    fields: [
      {
        id: "type",
        label: "Mounting Clamp Type",
        type: "select",
        options: [
          "Saddle / U-clamp",
          "Hydraulic block (DIN 3015)",
          "Clevis hanger",
          "Rubber-lined with EPDM",
        ],
        allowOther: true,
      },
      {
        id: "pipe_size",
        label: "Pipe Size (OD / NB)",
        type: "text",
        unit: "mm / inch",
        placeholder: 'e.g. 25 mm OD or 2" NB',
      },
      {
        id: "material",
        label: "Material / Grade",
        type: "select",
        options: [
          "W1 (zinc-plated MS)",
          "W2 (band SS430, screw MS)",
          "W4 (100% SS304)",
          "W5 (100% SS316)",
        ],
        allowOther: true,
      },
    ],
    standards: ["DIN 3015 (hydraulic blocks)", "MSS SP-58", "DIN 3017"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },

  // ============================================================================
  // 7. BEARINGS (ROLLER & BALL BEARINGS) [slug: bearings]
  // ============================================================================
  {
    id: "deep-groove-ball-bearings",
    slug: "deep-groove-ball-bearings",
    categorySlug: "bearings",
    name: "Deep Groove Ball Bearings",
    summary:
      "Deep groove ball bearings arranged by bearing number, bore ID, OD, width, cage type, and open, shielded, or sealed configuration to ISO 15.",
    imagePath: "/products/bearings/deep-groove-ball-bearings.webp",
    fields: BEARING_COMMON_FIELDS,
    standards: ["ISO 15"],
    quantityUnits: ["pcs", "sets", "boxes"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "angular-contact-ball-bearings",
    slug: "angular-contact-ball-bearings",
    categorySlug: "bearings",
    name: "Angular Contact Ball Bearings",
    summary:
      "Angular contact ball bearings arranged by bearing number, dimensions, cage material, and ABEC precision grade to ISO 15.",
    imagePath: "/products/bearings/angular-contact-ball-bearings.webp",
    fields: BEARING_COMMON_FIELDS,
    standards: ["ISO 15"],
    quantityUnits: ["pcs", "pairs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "cylindrical-roller-bearings",
    slug: "cylindrical-roller-bearings",
    categorySlug: "bearings",
    name: "Cylindrical Roller Bearings",
    summary:
      "Cylindrical roller bearings arranged by bearing series, bore ID, outer diameter, width, and steel, brass, or nylon cage to ISO 15.",
    imagePath: "/products/bearings/cylindrical-roller-bearings.webp",
    fields: BEARING_COMMON_FIELDS,
    standards: ["ISO 15"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "tapered-roller-bearings",
    slug: "tapered-roller-bearings",
    categorySlug: "bearings",
    name: "Tapered Roller Bearings",
    summary:
      "Tapered roller bearings arranged by bearing number, bore ID, outer diameter, width, and material specification to ISO 15.",
    imagePath: "/products/bearings/tapered-roller-bearings.webp",
    fields: BEARING_COMMON_FIELDS,
    standards: ["ISO 15"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "spherical-roller-bearings",
    slug: "spherical-roller-bearings",
    categorySlug: "bearings",
    name: "Spherical Roller Bearings",
    summary:
      "Spherical roller bearings arranged by bearing series, bore ID, OD, width, and brass or steel cage specification to ISO 15.",
    imagePath: "/products/bearings/spherical-roller-bearings.webp",
    fields: BEARING_COMMON_FIELDS,
    standards: ["ISO 15"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "thrust-bearings",
    slug: "thrust-bearings",
    categorySlug: "bearings",
    name: "Thrust Bearings",
    summary:
      "Ball and roller thrust bearings arranged by bearing number, bore ID, outer diameter, width, and material grade to ISO 15.",
    imagePath: "/products/bearings/thrust-bearings.webp",
    fields: BEARING_COMMON_FIELDS,
    standards: ["ISO 15"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "pillow-block-bearings",
    slug: "pillow-block-bearings",
    categorySlug: "bearings",
    name: "Pillow Block (Plummer Block) Bearings",
    summary:
      "Pillow block (plummer block) bearing units arranged by unit designation, shaft bore ID, housing dimensions, and sealing option.",
    imagePath: "/products/bearings/pillow-block-bearings.webp",
    fields: BEARING_COMMON_FIELDS,
    standards: ["ISO 15"],
    quantityUnits: ["pcs", "sets", "units"],
    defaultQuantityUnit: "pcs",
  },

  // ============================================================================
  // 8. MS/SS INDUSTRIAL PRODUCTS [slug: ms-ss-products]
  // ============================================================================
  {
    id: "ms-ss-industrial-products",
    slug: "ms-ss-industrial-products",
    categorySlug: "ms-ss-products",
    name: "MS/SS Industrial Products",
    summary:
      "Mild steel and stainless steel (SS304, SS316) industrial products arranged to your dimensions, standard, and technical drawing.",
    imagePath: "/products/ms-ss-products/ms-ss-industrial-products.webp",
    fields: [
      {
        id: "item_description",
        label: "Item Description",
        type: "text",
        placeholder:
          "e.g. Flanges, pipe fittings, round/hex bars, plates, channels, or custom fabricated part",
      },
      {
        id: "material",
        label: "Material",
        type: "select",
        options: ["MS (Mild Steel)", "SS304", "SS316"],
        allowOther: true,
      },
      {
        id: "size_or_dimensions",
        label: "Size or Dimensions",
        type: "text",
        unit: "mm / inch",
        placeholder: "e.g. DN50 Class 150 or 25 mm diameter x 3000 mm length",
      },
      {
        id: "standard",
        label: "Standard (if applicable)",
        type: "text",
        placeholder: "e.g. ASME B16.5, ASTM A105, ASTM A182, EN / DIN",
      },
      {
        id: "drawing_mention",
        label: "Technical Drawing (Optional)",
        type: "select",
        options: [
          "Drawing available (will share via WhatsApp / Email)",
          "Standard catalogue dimension (no drawing needed)",
        ],
        allowOther: true,
      },
    ],
    standards: ["As per your drawing or material standard"],
    quantityUnits: ["pcs", "kg", "tons", "meters", "sets"],
    defaultQuantityUnit: "pcs",
  },

  // ============================================================================
  // 9. OTHER INDUSTRIAL SUPPLIES [slug: other-supplies]
  // ============================================================================
  {
    id: "industrial-valves",
    slug: "industrial-valves",
    categorySlug: "other-supplies",
    name: "Industrial Valves",
    summary:
      'Gate, globe, ball, butterfly, check (NRV), and diaphragm valves in sizes from 1/4" (6 mm) to 72" (1800 mm)+ across cast iron, WCB, A105, and SS304/316.',
    imagePath: "/products/other-supplies/industrial-valves.webp",
    fields: [
      {
        id: "type",
        label: "Valve Type",
        type: "select",
        options: [
          "Gate valve",
          "Globe valve",
          "Ball valve",
          "Butterfly valve",
          "Check / NRV valve",
          "Diaphragm valve",
        ],
        allowOther: true,
      },
      {
        id: "size",
        label: "Size (NB / DN)",
        type: "text",
        unit: "inch / mm",
        placeholder: 'e.g. 2" (50 mm) or 6" (150 mm)',
        guideText: 'Size range: 1/4" (6 mm) to 72" (1800 mm)+.',
      },
      {
        id: "body_material",
        label: "Body Material",
        type: "select",
        options: [
          "Cast iron",
          "WCB cast steel",
          "Forged steel A105",
          "SS304",
          "SS316",
        ],
        allowOther: true,
      },
      {
        id: "seat_seal",
        label: "Seat / Seal Material",
        type: "select",
        options: ["PTFE", "EPDM", "Metal-to-metal"],
        allowOther: true,
      },
      {
        id: "standard",
        label: "Standard",
        type: "select",
        options: ["API 600", "API 6D", "ASME B16.34", "BS / DIN"],
        allowOther: true,
      },
    ],
    standards: ["API 600", "API 6D", "ASME B16.34", "BS / DIN"],
    quantityUnits: ["pcs", "sets"],
    defaultQuantityUnit: "pcs",
  },
  {
    id: "custom-item-enquiry",
    slug: "custom-item-enquiry",
    categorySlug: "other-supplies",
    name: "Custom Item Enquiry",
    summary:
      "Submit your item name, technical specification, and quantity for any industrial supply requirement not listed separately.",
    imagePath: "/products/other-supplies/custom-item-enquiry.webp",
    fields: [
      {
        id: "item_name",
        label: "Item Name",
        type: "text",
        placeholder: "e.g. Pressure gauge, strainer, expansion bellows, or packing gland",
      },
      {
        id: "specification_text",
        label: "Specification / Size / Material Details",
        type: "text",
        placeholder: "Enter sizes, material grades, pressure ratings, or part numbers",
      },
    ],
    standards: ["As per your project specification"],
    quantityUnits: ["pcs", "sets", "meters", "kg", "lots"],
    defaultQuantityUnit: "pcs",
  },
];

// ============================================================================
// HELPER FUNCTIONS FOR ROUTES & LOOKUPS
// ============================================================================

export function getCategoryBySlug(
  categorySlug: string
): ProductCategory | undefined {
  return companyConfig.categories.find((c) => c.slug === categorySlug);
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  return catalogProducts.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlugs(
  categorySlug: string,
  productSlug: string
): CatalogProduct | undefined {
  return catalogProducts.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );
}

export function getRelatedCategories(categorySlug: string): ProductCategory[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return category.relatedCategorySlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is ProductCategory => Boolean(c));
}
