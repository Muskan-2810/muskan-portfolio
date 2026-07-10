"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

/**
 * Renders a stat value, animating any leading numeric portion from 0 up to
 * its target once scrolled into view (e.g. "100+" counts 0 -> 100, then
 * appends the "+"; non-numeric values like "Selected" simply fade in).
 */
export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(numeric === null ? value : "0" + suffix);

  useEffect(() => {
    if (!isInView || numeric === null) return;
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${Math.floor(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [isInView, numeric, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
