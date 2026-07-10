"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SKILL_CATEGORIES } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";
import NeuralSkillNetwork from "@/components/sections/NeuralSkillNetwork";
import { cn } from "@/lib/utils";

/**
 * Secondary, fully-accessible listing of the same categories shown in the
 * network above — keyboard/screen-reader users get the complete skill list
 * without depending on hovering small network nodes.
 */
function SkillCard({ category, index }: { category: (typeof SKILL_CATEGORIES)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="skill-card group relative overflow-hidden rounded-3xl border border-charcoal-border bg-charcoal/40 p-6 transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      tabIndex={0}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: category.accent }}
      />

      <div className="relative flex items-center justify-between">
        <h3 className="font-display text-lg font-medium text-ink">{category.label}</h3>
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: category.accent, boxShadow: `0 0 12px ${category.accent}` }}
        />
      </div>

      <div
        className={cn(
          "relative mt-4 flex flex-wrap gap-2 transition-all duration-500",
          expanded ? "gap-2.5" : "gap-2"
        )}
      >
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border px-3 py-1.5 font-mono text-xs text-ink-muted transition-all duration-300 group-hover:text-ink"
            style={{ borderColor: expanded ? `${category.accent}66` : "rgba(30,34,41,1)" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".skill-network-wrap", {
      scrollTrigger: { trigger: ".skill-network-wrap", start: "top 85%" },
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    // TEMPORARILY DISABLED
    // gsap.from(".skill-card", {
    //   scrollTrigger: { trigger: ".skills-grid", start: "top 88%" },
    //   y: 40,
    //   opacity: 0,
    //   duration: 0.7,
    //   ease: "power3.out",
    //   stagger: 0.08,
    // });
  }, rootRef);

  return () => ctx.revert();
}, []);
  return (
    <section id="skills" ref={rootRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Chapter Three — Skills"
        title="Engineering Intelligence"
        description="Grouped by where each tool lives in a system, and how they connect — hover any node to see what's inside."
      />

      <div className="skill-network-wrap">
        <NeuralSkillNetwork />
      </div>

      <div className="skills-grid mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category, i) => (
          <SkillCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </section>
  );
}
