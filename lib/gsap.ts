import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Registered once and imported by any section that needs scroll-linked
// animation (timeline fills, pinned reveals, parallax). Guarded so repeated
// imports during Fast Refresh don't re-register the plugin.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Respect prefers-reduced-motion globally: rather than disabling every
  // GSAP tween individually across a dozen section files, compress all
  // GSAP-driven motion to near-instant. Content still reaches its final
  // state (nothing stays hidden/offset), it just doesn't sweep.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.globalTimeline.timeScale(30);
  }
}

export { gsap, ScrollTrigger };
