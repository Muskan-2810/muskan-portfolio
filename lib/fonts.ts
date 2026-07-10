import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

/**
 * TYPE SYSTEM
 * ---------------------------------------------------------------------------
 * Display  -> Space Grotesk: geometric, slightly technical, used for the
 *             hero name, section titles — carries the "AI control room" tone.
 * Body     -> Inter: humanist, highly legible at small sizes, used for
 *             paragraphs and UI copy.
 * Mono     -> JetBrains Mono: used for labels, stats, coordinates, timestamps
 *             — reinforces the "engineering instrument panel" motif.
 */

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
