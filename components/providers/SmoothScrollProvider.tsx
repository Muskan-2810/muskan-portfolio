"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Wraps the app in a Lenis smooth-scroll instance and drives it from
 * requestAnimationFrame. GSAP ScrollTrigger (used deeper in sections)
 * listens to native scroll events, so we keep Lenis's default DOM sync on.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
