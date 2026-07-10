"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { JOURNEY } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Education from "@/components/sections/Education";
import { cn } from "@/lib/utils";

/**
 * Vertical milestone timeline. A track line sits behind the cards; a second,
 * glowing "progress" line is scrubbed to scroll position via GSAP so it
 * visually illuminates as the reader descends through the story.
 */
export default function Journey() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line fill, scrubbed to how far the track has scrolled through view.
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );

      // Each milestone card floats/fades in as it enters.
      gsap.utils.toArray<HTMLElement>(".journey-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      gsap.from(".education-block", {
        scrollTrigger: { trigger: ".education-block", start: "top 88%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={rootRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Chapter Two — My Journey"
        title="Every milestone, in order."
        description="Not a resume timeline — the actual sequence of decisions that got me here, each one building on the last."
      />

      <div ref={trackRef} className="relative mx-auto max-w-3xl">
        {/* Base track line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-charcoal-border md:left-1/2 md:-translate-x-1/2" />
        {/* Scroll-scrubbed glowing progress line */}
        <div
          ref={progressRef}
          className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-aurora shadow-glow md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="relative flex flex-col gap-10">
          {JOURNEY.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            return (
              <li
                key={milestone.id}
                className={cn(
                  "journey-item relative pl-8 md:w-1/2 md:pl-0",
                  isLeft ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
                )}
              >
                {/* Node dot */}
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-glow-blue bg-void md:left-auto",
                    isLeft ? "md:-right-1.5 md:translate-x-1/2" : "md:-left-1.5 md:-translate-x-1/2",
                    milestone.isFuture && "border-glow-violet"
                  )}
                />

                <div
                  className={cn(
                    "glass-panel inline-block w-full max-w-md rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow",
                    milestone.isFuture && "border-glow-violet/30 hover:shadow-glow-violet"
                  )}
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-glow-blue">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-medium text-ink md:text-xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    {milestone.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Education presented as the next natural beat in the story */}
      <div className="education-block mx-auto mt-20 max-w-3xl">
        <Education />
      </div>
    </section>
  );
}
