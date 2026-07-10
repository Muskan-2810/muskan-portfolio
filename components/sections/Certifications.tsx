"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { ShieldCheck } from "lucide-react";
import { CERTIFICATIONS_DETAILED } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";
import OrgMark from "@/components/ui/OrgMark";
import CertificateModal from "@/components/ui/CertificateModal";

type Certification = (typeof CERTIFICATIONS_DETAILED)[number];

/** A single certificate card: 3D tilt toward the cursor, a soft glass
 * reflection sheen that sweeps on hover, and a verified badge. Clicking
 * opens the fullscreen preview modal. */
function CertCard({ cert, onOpen }: { cert: Certification; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-40, 40], [8, -8]);
  const rotateY = useTransform(springX, [-40, 40], [-8, 8]);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="cert-card group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal/40 p-6 text-left transition-shadow duration-500 hover:border-glow-blue/40 hover:shadow-glow"
    >
      {/* Reflection sheen sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-glow-blue/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-charcoal-border bg-charcoal/60">
        <OrgMark type={cert.logo} />
      </div>

      <div className="relative min-w-0 flex-1">
        <h3 className="truncate font-display text-base font-medium text-ink md:text-lg">
          {cert.name}
        </h3>
        <p className="mt-1 font-body text-sm text-ink-muted">
          {cert.issuer} · {cert.year}
        </p>
      </div>

      <ShieldCheck
        size={18}
        className="relative flex-none text-ink-faint transition-colors duration-300 group-hover:text-glow-blue"
        aria-hidden
      />
    </motion.button>
  );
}

export default function Certifications() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Certification | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-card", {
        scrollTrigger: { trigger: ".cert-grid", start: "top 85%" },
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={rootRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Chapter Five — Certifications"
        title="Formal proof, alongside the practical kind."
        description="Click any certificate for a closer look."
      />

      <div className="cert-grid grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CERTIFICATIONS_DETAILED.map((cert) => (
          <CertCard key={cert.id} cert={cert} onOpen={() => setActive(cert)} />
        ))}
      </div>

      <CertificateModal certification={active} onClose={() => setActive(null)} />
    </section>
  );
}
