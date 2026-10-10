import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          dark: "#071428",
        },
        steel: {
          DEFAULT: "#5B6B7C",
          light: "#E6EBF0",
        },
        amber: {
          accent: "#F5A524",
        },
        silver: {
          DEFAULT: "#C9D1D9",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(11, 31, 58, 0.06), 0 2px 6px -1px rgba(11, 31, 58, 0.04)",
        "card-hover": "0 12px 28px -4px rgba(11, 31, 58, 0.12), 0 4px 10px -2px rgba(11, 31, 58, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
