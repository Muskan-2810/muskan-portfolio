"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { EDUCATION, COURSEWORK } from "@/constants/data";

/**
 * A single, premium education card — not a plain info list. Tilts in 3D
 * toward the cursor and reveals relevant coursework as a secondary layer.
 */
export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-40, 40], [6, -6]);
  const rotateY = useTransform(springX, [-40, 40], [-6, 6]);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="glass-panel relative overflow-hidden rounded-3xl p-8 shadow-panel transition-shadow duration-500 hover:shadow-glow md:p-10"
    >
      {/* Corner glow accent */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-glow-blue/10 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-glow-blue/30 bg-glow-blue/10 p-3 text-glow-blue">
            <GraduationCap size={26} />
          </div>
          <div>
            <p className="eyebrow mb-2">Education</p>
            <h3 className="font-display text-xl font-medium text-ink md:text-2xl">
              {EDUCATION.institution}
            </h3>
            <p className="mt-1 font-body text-sm text-ink-muted">
              {EDUCATION.degree} · {EDUCATION.specialization}
            </p>
          </div>
        </div>

        <div className="flex gap-8 font-mono">
          <div className="text-right">
            <p className="text-2xl font-medium text-glow-blue">{EDUCATION.cgpa}</p>
            <p className="text-[11px] uppercase tracking-widest text-ink-faint">CGPA</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-medium text-ink">{EDUCATION.year}</p>
            <p className="text-[11px] uppercase tracking-widest text-ink-faint">Standing</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8 border-t border-charcoal-border pt-6">
        <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
          <BookOpen size={14} />
          Relevant Coursework
        </p>
        <div className="flex flex-wrap gap-2">
          {COURSEWORK.map((course) => (
            <span
              key={course}
              className="rounded-full border border-charcoal-border px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors duration-300 hover:border-glow-blue/40 hover:text-glow-blue"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
