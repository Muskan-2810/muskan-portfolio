"use client";

import { useEffect, useRef } from "react";
import { lerp, prefersReducedMotion } from "@/lib/utils";

/**
 * A soft radial light that trails the cursor with easing, giving the
 * whole page a "torch through fog" feel. Purely additive (mix-blend: screen)
 * so it never washes out foreground content.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let rafId: number;

    const handleMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener("pointermove", handleMove);

    const tick = () => {
      pos.x = lerp(pos.x, target.x, 0.12);
      pos.y = lerp(pos.y, target.y, 0.12);
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen hidden md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(62,142,255,0.16) 0%, rgba(139,124,255,0.08) 45%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
