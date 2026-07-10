"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FileDown } from "lucide-react";
import { NAV_LINKS, RESUME_URL } from "@/constants/data";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

/** A nav link that leans toward the cursor within its bounds. */
function MagneticLink({ href, label }: { href: string; label: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative px-1 py-2 font-body text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
    >
      {label}
    </motion.a>
  );
}

/**
 * Animated wordmark logo: "Muskan()" — the parentheses double as a nod to
 * "she's a developer" without resorting to a literal code-bracket cliche.
 * The parentheses breathe open/closed on a slow loop.
 */
function AnimatedLogo() {
  const openParen = useRef<HTMLSpanElement>(null);
  const closeParen = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1.4 });
    tl.to(openParen.current, { x: -2, duration: 1.1, ease: "sine.inOut" }, 0).to(
      closeParen.current,
      { x: 2, duration: 1.1, ease: "sine.inOut" },
      0
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <a
      href="#hero"
      className="group font-display text-lg tracking-tight text-ink"
      aria-label="Muskan Vishwakarma — home"
    >
      Muskan
      <span ref={openParen} className="inline-block text-glow-blue transition-colors">
        (
      </span>
      <span ref={closeParen} className="inline-block text-glow-blue transition-colors">
        )
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance: navbar drops in from above once the loader hands off.
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.4, ease: "power4.out" }
    );
  }, []);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 transition-all duration-500",
          scrolled ? "glass-panel mx-4 py-3 shadow-panel md:mx-auto" : "py-2"
        )}
      >
        <AnimatedLogo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <MagneticLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            href={RESUME_URL}
            download="Muskan-Vishwakarma-Resume.pdf"
            variant="outline"
            className="!px-5 !py-2 !text-xs uppercase tracking-widest"
            aria-label="Download resume"
          >
            <FileDown size={14} />
            Resume
          </MagneticButton>
        </div>

        <button
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "h-px w-6 bg-ink transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-ink transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </div>

      {open && (
        <div className="glass-panel mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 font-body text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            download="Muskan-Vishwakarma-Resume.pdf"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-glow-blue/40 px-4 py-3 font-mono text-xs uppercase tracking-widest text-glow-blue"
          >
            <FileDown size={14} />
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
