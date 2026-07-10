"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BOOT_SEQUENCE } from "@/constants/data";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Cinematic pre-loader: cycles through AI "boot sequence" lines while a
 * counter climbs 0 -> 100 and a hairline rule fills, then the whole panel
 * splits open (clip-path) to reveal the hero. This is the curtain-rise
 * moment that sets the "entering an AI universe" tone in the first frame.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  // Cycle boot-sequence copy independently of the GSAP progress timeline.
  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => (i + 1) % BOOT_SEQUENCE.length);
    }, 550);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const counterObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        setProgress(val);
        if (counterRef.current) counterRef.current.textContent = String(val);
      },
    }).to(barRef.current, { scaleX: 1, duration: 2.2, ease: "power2.inOut" }, "<");

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="eyebrow h-4 transition-opacity duration-300">
          {BOOT_SEQUENCE[lineIndex]}
        </p>
        <div className="font-display text-6xl font-medium text-ink">
          <span ref={counterRef}>{progress}</span>
          <span className="text-glow-blue">%</span>
        </div>
        <div className="h-px w-64 overflow-hidden bg-charcoal-border">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-aurora" />
        </div>
      </div>
    </div>
  );
}
