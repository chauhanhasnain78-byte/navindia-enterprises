import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { companyConfig } from "@/config/company";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { IntroMotionProvider } from "@/components/motion/IntroMotionProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F3A",
};

export const metadata: Metadata = {
  title: {
    default: `${companyConfig.name} | ${companyConfig.tagline}`,
    template: `%s | ${companyConfig.name}`,
  },
  description: `${companyConfig.name} — ${companyConfig.positioningSummary} ${companyConfig.heroSupportingLine}`,
  keywords: [
    "NAV INDIA ENTERPRISES",
    "industrial products export Mumbai",
    "industrial hoses",
    "industrial fasteners",
    "seals and o-rings",
    "industrial abrasives",
    "lifting products",
    "MS SS industrial products",
    "Gulf industrial supply",
    "UAE Qatar Bahrain industrial export",
  ],
  icons: {
    icon: [
      { url: companyConfig.logo.path, type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: companyConfig.logo.path,
    apple: companyConfig.logo.path,
  },
  openGraph: {
    title: `${companyConfig.name} | ${companyConfig.tagline}`,
    description: companyConfig.heroSupportingLine,
    siteName: companyConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${companyConfig.name} | ${companyConfig.tagline}`,
    description: companyConfig.heroSupportingLine,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <meta property="og:image" content={companyConfig.logo.path} />
        <meta property="og:image:alt" content={companyConfig.name} />
        <meta name="twitter:image" content={companyConfig.logo.path} />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-navy selection:bg-amber-accent selection:text-navy-dark">
        <IntroMotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </IntroMotionProvider>
      </body>
    </html>
  );
}
