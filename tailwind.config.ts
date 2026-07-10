import type { Config } from "tailwindcss";

/**
 * DESIGN TOKEN SYSTEM
 * ---------------------------------------------------------------------------
 * Palette is built around a "deep space control room" concept:
 * pure-black voids, charcoal instrument panels, deep-navy depth layers,
 * and three glow accents (electric blue / royal blue / soft violet) that
 * behave like light sources rather than flat fills.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#050507", // Pure Black — page background
          950: "#020203",
        },
        charcoal: {
          DEFAULT: "#0D0F12", // Dark Charcoal — surfaces / panels
          light: "#15181D",
          border: "#1E2229",
        },
        navy: {
          DEFAULT: "#0A1128", // Deep Navy — accent depth layer
          light: "#101A3D",
        },
        glow: {
          blue: "#3E8EFF", // Electric Blue
          royal: "#274DFF", // Royal Blue
          violet: "#8B7CFF", // Soft Violet
        },
        ink: {
          DEFAULT: "#F5F6FA", // primary text (White)
          muted: "#9BA1AC", // secondary text (Light Gray)
          faint: "#5B616C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 9vw, 8.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-3": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "aurora": "linear-gradient(120deg, #274DFF 0%, #3E8EFF 45%, #8B7CFF 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(62,142,255,0.45)",
        "glow-violet": "0 0 40px -8px rgba(139,124,255,0.45)",
        panel: "0 8px 40px -12px rgba(0,0,0,0.6)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
