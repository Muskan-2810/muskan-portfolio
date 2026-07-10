"use client";

import { Github, Linkedin, Code2, FileCode2, ArrowUp, FileDown } from "lucide-react";
import {
  NAV_LINKS,
  CODING_PROFILES,
  RESUME_URL,
  SITE_BUILT_WITH,
  PROFILE,
} from "@/constants/data";
import MagneticButton from "@/components/ui/MagneticButton";

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code2,
  GeeksforGeeks: FileCode2,
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-charcoal-border">
      <div className="glass-panel section-padding !py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Identity + closing statement */}
          <div>
            <a href="#hero" className="font-display text-lg text-ink">
              Muskan<span className="text-glow-blue">()</span>
            </a>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink-muted">
              {PROFILE.tagline}
            </p>
            <MagneticButton
              href={RESUME_URL}
              download="Muskan-Vishwakarma-Resume.pdf"
              variant="outline"
              className="!px-5 !py-2.5 !text-xs mt-6 uppercase tracking-widest"
            >
              <FileDown size={14} />
              Resume
            </MagneticButton>
          </div>

          {/* Quick navigation */}
          <div>
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-ink-muted transition-colors duration-300 hover:text-glow-blue"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <p className="eyebrow mb-5">Elsewhere</p>
            <div className="flex flex-wrap gap-3">
              {CODING_PROFILES.map((profile) => {
                const Icon = SOCIAL_ICONS[profile.name as keyof typeof SOCIAL_ICONS] ?? Code2;
                return (
                  <a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={profile.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-border text-ink-muted transition-colors duration-300 hover:border-glow-blue/50 hover:text-glow-blue"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-charcoal-border pt-8 sm:flex-row">
          <p className="font-mono text-xs text-ink-faint">
            © {year} Muskan Vishwakarma. All rights reserved.
          </p>
          <p className="font-mono text-xs text-ink-faint">
            Built with {SITE_BUILT_WITH.slice(0, 4).join(", ")} &amp; more.
          </p>
        </div>
      </div>

      <a
        href="#hero"
        aria-label="Back to top"
        className="absolute -top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-charcoal-border bg-charcoal text-ink-muted shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-glow-blue/50 hover:text-glow-blue hover:shadow-glow md:right-12"
      >
        <ArrowUp size={18} />
      </a>
    </footer>
  );
}
