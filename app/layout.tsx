import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";
import { SITE_URL, PROFILE } from "@/constants/data";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import "./globals.css";

const TITLE = "Muskan Vishwakarma — Software Developer & AI Engineer";
const DESCRIPTION = PROFILE.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Muskan Vishwakarma",
  },
  description: DESCRIPTION,
  keywords: [
    "Muskan Vishwakarma",
    "AI Engineer",
    "Software Developer",
    "Machine Learning",
    "Java Developer",
    "Portfolio",
  ],
  authors: [{ name: "Muskan Vishwakarma", url: SITE_URL }],
  creator: "Muskan Vishwakarma",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Muskan Vishwakarma",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD structured data (schema.org Person) — helps search engines
// understand this is a personal portfolio, not a generic business site.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.roles,
  description: DESCRIPTION,
  email: PROFILE.email,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-void text-ink antialiased">
        <SmoothScrollProvider>
          <CursorGlow />
          <div className="noise-overlay" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
