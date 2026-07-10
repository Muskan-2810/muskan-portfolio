"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { EXPERIENCE_TIMELINE } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";
import OrgMark from "@/components/ui/OrgMark";
import { cn } from "@/lib/utils";

// Badge color per achievement — kept as a lookup rather than inline ternary
// chains so adding a future achievement only means adding one line here.
const BADGE_STYLES: Record<string, string> = {
  gdgoc: "border-glow-blue/40 bg-glow-blue/10 text-glow-blue",
  pragati: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  ecell: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

/**
 * Achievements presented as recognitions, not raw counters — same
 * underlying data as the Experience timeline, restyled here as compact,
 * badge-forward cards (mirrors how Google/Infosys treat "credential" UI).
 */
export default function Achievements() {
   console.log(EXPERIENCE_TIMELINE);
  const rootRef = useRef<HTMLDivElement>(null);

  /*
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".achievement-card", {
      scrollTrigger: { trigger: ".achievement-grid", start: "top 85%" },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
    });
  }, rootRef);
  return () => ctx.revert();
}, []);
*/
  return (
    <section id="achievements" ref={rootRef} className="section-padding relative overflow-hidden">
      <SectionHeading
        eyebrow="Chapter Six — Achievements"
        title="Recognition along the way."
        description="Not a scoreboard — a record of the moments where the work was noticed beyond my own judgment of it."
      />

      <div className="achievement-grid grid grid-cols-1 gap-5 md:grid-cols-3">
        {EXPERIENCE_TIMELINE.map((item) => (
          <div
            key={item.id}
            className="achievement-card glass-panel group relative flex flex-col gap-4 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-charcoal-border bg-charcoal">
                  <OrgMark type={item.logo} />
                </span>
                <div>
                  <h3 className="font-display text-base font-medium leading-snug text-ink md:text-lg">
                    {item.org}
                  </h3>
                </div>
              </div>
            </div>

            <p className="flex-1 font-body text-sm leading-relaxed text-ink-muted">
              {item.description}
            </p>

            <div className="flex items-center justify-between border-t border-charcoal-border pt-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                {item.period}
              </span>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest",
                  BADGE_STYLES[item.id]
                )}
              >
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
