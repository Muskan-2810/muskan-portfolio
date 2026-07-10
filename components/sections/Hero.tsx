"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { FileDown, Eye, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { PROFILE, HERO_TAGLINE, HERO_INTRO, CODING_PROFILES, RESUME_URL } from "@/constants/data";
import MagneticButton from "@/components/ui/MagneticButton";

// The 3D rig is GPU-heavy and client-only — keep it out of the server bundle
// and defer its mount until after hydration.
const AIRobotScene = dynamic(() => import("@/components/canvas/AIRobotScene"), {
  ssr: false,
});

/** Splits text into span-wrapped characters for GSAP stagger reveals. */
function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="reveal-char inline-block will-change-transform"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char}
    </span>
  ));
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");

  // Typing effect cycling through the two roles.
  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentRole = PROFILE.roles[roleIndex]?? "";
      if (!deleting) {
        charIndex++;
        setTyped(currentRole.slice(0, charIndex));
        if (charIndex === currentRole.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        setTyped(currentRole.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % PROFILE.roles.length;
        }
      }
      timeoutId = setTimeout(tick, deleting ? 40 : 80);
    };

    timeoutId = setTimeout(tick, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Orchestrated entrance, timed to land right after the loader's curtain lifts.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 });
      tl.set(".reveal-char", { yPercent: 120, opacity: 0 })
        .set(
          [".hero-eyebrow", ".hero-sub", ".hero-actions", ".hero-socials", ".hero-scene"],
          { y: 24, opacity: 0 }
        )
        .to(".hero-eyebrow", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(
          ".reveal-char",
          { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.02 },
          "-=0.3"
        )
        .to(".hero-sub", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(".hero-actions", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(".hero-socials", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .to(
          ".hero-scene",
          { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          "-=0.9"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* ---------------------------------------------------------------- */}
        {/* Left: typography-led introduction                                */}
        {/* ---------------------------------------------------------------- */}
        <div className="text-left">
          <p className="hero-eyebrow eyebrow mb-6">Software Developer · AI Engineer</p>

          <h1 className="font-display text-display-1 font-semibold text-ink leading-[1.08]">
  <div className="block">Muskan</div>

  <div className="mt-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
    Vishwakarma
  </div>
</h1>

          <div className="hero-sub mt-8 flex flex-col items-start gap-5">
            <p className="font-mono text-lg text-glow-blue md:text-xl">
              {typed}
              <span className="animate-pulse-glow">_</span>
            </p>
            <p className="max-w-lg text-balance font-display text-xl font-medium text-ink md:text-2xl">
              {HERO_TAGLINE}
            </p>
            <p className="max-w-lg font-body text-base leading-relaxed text-ink-muted">
              {HERO_INTRO}
            </p>
          </div>

          <div className="hero-actions mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              variant="solid"
              aria-label="Preview resume in a new tab"
            >
              <Eye size={16} />
              Preview Resume
            </MagneticButton>
            <MagneticButton
              href={RESUME_URL}
              download="Muskan-Vishwakarma-Resume.pdf"
              variant="outline"
              aria-label="Download resume PDF"
              className="!px-6"
            >
              <FileDown size={16} />
              Download Resume
            </MagneticButton>
            <MagneticButton href="#projects" variant="outline">
              Explore Projects
              <ArrowUpRight size={16} />
            </MagneticButton>
          </div>

          <div className="hero-socials mt-10 flex items-center gap-4">
            <a
              href={CODING_PROFILES[0].url}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-full border border-charcoal-border p-3 text-ink-muted transition-colors duration-300 hover:border-glow-blue/50 hover:text-glow-blue"
            >
              <Github size={18} />
            </a>
            <a
              href={CODING_PROFILES[1].url}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full border border-charcoal-border p-3 text-ink-muted transition-colors duration-300 hover:border-glow-blue/50 hover:text-glow-blue"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Right: 3D holographic AI robot scene                              */}
        {/* ---------------------------------------------------------------- */}
        <div className="hero-scene relative">
          <AIRobotScene />
        </div>
      </div>
    </section>
  );
}
