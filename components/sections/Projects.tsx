"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, Cpu, Layers, Rocket, Target } from "lucide-react";
import { PROJECTS } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";

const grovio = PROJECTS.find((p) => p.id === "grovio")!;
const secondary = PROJECTS.filter((p) => p.id !== "grovio");

// Case-study beats for the featured project. Kept alongside the component
// (rather than in the shared data file) since this level of narrative detail
// is specific to how Grovio is presented, not raw project metadata.
const GROVIO_CASE_STUDY = [
  {
    icon: Target,
    label: "Problem",
    copy: "Students searching for internships were matching on keywords, not fit — sifting through listings with no sense of which ones actually suited their skills or interests.",
  },
  {
    icon: Rocket,
    label: "Solution",
    copy: "Grovio reads a student's resume, profile, and stated interests, then recommends internships ranked by actual relevance instead of raw keyword overlap.",
  },
  {
    icon: Layers,
    label: "Architecture",
    copy: "A Python service handles resume parsing and the recommendation model, Supabase manages auth and structured data, and a REST layer connects the two to the client.",
  },
  {
    icon: Cpu,
    label: "Challenges",
    copy: "Resumes are messy and inconsistent by nature — most of the engineering effort went into normalizing that input before the recommendation model ever sees it.",
  },
];

export default function Projects() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const ctx = gsap.context(() => {

    // gsap.from(".case-study-beat", {
    //   scrollTrigger: { trigger: ".case-study-grid", start: "top 85%" },
    //   y: 40,
    //   opacity: 0,
    //   duration: 0.7,
    //   ease: "power3.out",
    //   stagger: 0.1,
    // });

    gsap.from(".project-secondary", {
      scrollTrigger: { trigger: ".project-secondary", start: "top 90%" },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });

  }, rootRef);

  return () => ctx.revert();
}, []);

  return (
    <section id="projects" ref={rootRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Featured Work"
        title={grovio.name}
        description={grovio.description}
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {grovio.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-charcoal-border px-3 py-1.5 font-mono text-xs text-ink-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="case-study-grid grid grid-cols-1 gap-5 sm:grid-cols-2">
        {GROVIO_CASE_STUDY.map((beat) => (
          <div
            key={beat.label}
            className="case-study-beat glass-panel rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
          >
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-glow-blue/30 bg-glow-blue/10 text-glow-blue">
              <beat.icon size={18} />
            </span>
            <p className="eyebrow mb-2">{beat.label}</p>
            <p className="font-body text-sm leading-relaxed text-ink-muted">{beat.copy}</p>
          </div>
        ))}
      </div>

      {/* Secondary project(s) — presented smaller, deliberately less detailed
          than the featured case study above. */}
      {secondary.map((project) => (
        <div
          key={project.id}
          className="project-secondary glass-panel mt-8 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-medium text-ink">{project.name}</h3>
              <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ink-muted">
                {project.description}
              </p>
            </div>
            <ArrowUpRight size={20} className="flex-none text-ink-faint" aria-hidden />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-charcoal-border px-3 py-1 font-mono text-[11px] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
