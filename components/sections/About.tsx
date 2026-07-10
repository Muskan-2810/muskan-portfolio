"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PROFILE, INTERESTS, PERSONALITY } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * About section, redesigned as a short story rather than a paragraph block:
 * a large opening statement, a two-panel "why I build / how I think" split,
 * and a floating tag cloud of interests + personality traits. Each piece
 * fades/slides/blurs in independently as it enters the viewport.
 */
export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-statement-line", {
        scrollTrigger: { trigger: ".about-statement", start: "top 80%" },
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      });

      gsap.utils.toArray<HTMLElement>(".about-panel").forEach((panel, i) => {
        gsap.from(panel, {
          scrollTrigger: { trigger: panel, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.1,
        });
      });

      gsap.from(".about-tag", {
        scrollTrigger: { trigger: ".about-tags", start: "top 90%" },
        scale: 0.85,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.04,
      });

      gsap.to(".about-orb", {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -80,
        ease: "none",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const [philosophyOpen, philosophyClose] = PROFILE.aboutPhilosophy.split(". ");

  return (
    <section id="about" ref={rootRef} className="section-padding relative overflow-hidden">
      {/* Ambient floating glow orbs — purely decorative depth layer */}
      <div className="about-orb pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-glow-royal/10 blur-[100px]" />
      <div className="about-orb pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-glow-violet/10 blur-[120px]" />

      <SectionHeading eyebrow="Chapter One — About" title="Not just someone who codes." />

      {/* Large opening statement */}
      <div className="about-statement mx-auto mb-20 max-w-4xl">
        <p className="font-display text-display-3 leading-[1.3] text-ink">
          <span className="about-statement-line block">{philosophyOpen}.</span>
          <span className="about-statement-line mt-2 block text-ink-muted">
            {philosophyClose}
          </span>
        </p>
      </div>

      {/* Two-panel split: why I build / how I think */}
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <div className="about-panel glass-panel rounded-2xl p-8 transition-all duration-500 hover:border-glow-blue/40 hover:shadow-glow">
          <p className="eyebrow mb-4">Why I Build</p>
          <p className="font-body text-base leading-relaxed text-ink-muted">{PROFILE.intro}</p>
        </div>

        <div className="about-panel glass-panel rounded-2xl p-8 transition-all duration-500 hover:border-glow-violet/40 hover:shadow-glow-violet">
          <p className="eyebrow mb-4">How I Think</p>
          <p className="font-body text-base leading-relaxed text-ink-muted">
            I&apos;d rather spend an extra hour understanding a problem than ship
            the first version of a fix that half-works. Most of what I know
            now came from debugging something I built wrong the first time —
            so I&apos;ve learned to treat mistakes as the fastest tuition I can
            pay.
          </p>
        </div>
      </div>

      {/* Interests + personality as a floating tag cloud */}
      <div className="about-tags mx-auto mt-16 max-w-4xl">
        <p className="eyebrow mb-6 text-center">What Drives Me</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {INTERESTS.map((interest) => (
            <span
              key={interest}
              className="about-tag rounded-full border border-charcoal-border bg-charcoal/40 px-4 py-2 font-mono text-xs text-ink-muted transition-colors duration-300 hover:border-glow-blue/50 hover:text-glow-blue"
            >
              {interest}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {PERSONALITY.map((trait) => (
            <span
              key={trait}
              className="about-tag rounded-full border border-glow-violet/20 bg-glow-violet/5 px-4 py-2 font-mono text-xs text-glow-violet transition-colors duration-300 hover:border-glow-violet/50"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
