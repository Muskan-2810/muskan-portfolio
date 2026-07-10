"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { EXPERIENCE_TIMELINE } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";
import OrgMark from "@/components/ui/OrgMark";

/**
 * Experience as a single-column animated timeline — a scroll-lit connector
 * line runs down the left edge, each entry represented by an org mark
 * rather than a generic bullet, description written as a moment rather
 * than a duty list.
 */
export default function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-track",
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".experience-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 88%" },
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={rootRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Chapter Four — Experience"
        title="Where the work became real."
        description="Less a list of credentials, more a record of the times I had to prove something to myself."
      />

      <div className="experience-track relative mx-auto max-w-2xl">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-charcoal-border" />
        <div className="experience-progress absolute left-5 top-2 bottom-2 w-px origin-top bg-aurora shadow-glow" />

        <ol className="relative flex flex-col gap-10">
  {EXPERIENCE_TIMELINE
    .filter((exp) => exp.id !== "ecell")
    .map((exp) => (
    <li key={exp.id} className="experience-item relative pl-16">

              <div className="glass-panel rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-medium text-ink">{exp.org}</h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-glow-blue">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-1 font-body text-sm font-medium text-ink-muted">{exp.role}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                  {exp.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
