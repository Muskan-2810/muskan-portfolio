"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Github, Linkedin, Code2, FileCode2, ArrowUpRight } from "lucide-react";
import { CODING_PROFILES, CODING_STATS } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code2,
  GeeksforGeeks: FileCode2,
} as const;

export default function CodingProfiles() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".profile-card", {
        scrollTrigger: { trigger: ".profile-grid", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="coding-profiles" ref={rootRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Elsewhere Online"
        title="Where the practice lives."
        description="Consistency shows up better in a problem-solving streak than in a resume line."
      />

      {/* Quantitative practice stats */}
      <div className="mb-10 grid grid-cols-2 gap-5 sm:max-w-md">
        {CODING_STATS.map((stat) => (
          <div key={stat.label} className="glass-panel rounded-2xl px-5 py-6 text-center">
            <AnimatedCounter
              value={stat.value}
              className="font-display text-2xl font-medium text-gradient-aurora"
            />
            <p className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-widest text-ink-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="profile-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CODING_PROFILES.map((profile) => {
          const Icon = ICONS[profile.name as keyof typeof ICONS] ?? Code2;
          return (
            <a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              className="profile-card glass-panel group flex flex-col gap-4 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-charcoal-border bg-charcoal/60 text-ink-muted transition-colors duration-300 group-hover:border-glow-blue/40 group-hover:text-glow-blue">
                  <Icon size={20} />
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-ink-faint transition-colors duration-300 group-hover:text-glow-blue"
                  aria-hidden
                />
              </div>
              <div>
                <h3 className="font-display text-base font-medium text-ink">{profile.name}</h3>
                <p className="mt-1 truncate font-mono text-xs text-ink-muted">
                  @{profile.handle}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
