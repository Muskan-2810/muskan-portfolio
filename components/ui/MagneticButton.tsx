"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

/**
 * A button/link that leans toward the cursor (magnetic pull) and tilts
 * slightly in 3D on hover (perspective + rotateX/rotateY), then glows.
 * Used for every primary CTA so the interaction language stays consistent.
 */
export default function MagneticButton({
  href,
  onClick,
  children,
  variant = "solid",
  className,
  target,
  rel,
  download,
  type = "button",
  disabled,
  ...aria
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });
  const rotateX = useTransform(springY, [-30, 30], [8, -8]);
  const rotateY = useTransform(springX, [-30, 30], [-8, 8]);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.4);
    y.set(relY * 0.4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-body text-sm font-medium transition-shadow duration-300",
    variant === "solid" && "bg-aurora text-void shadow-glow",
    variant === "outline" &&
      "border border-charcoal-border text-ink hover:border-glow-blue/50 hover:text-glow-blue",
    className
  );

  const motionProps = {
    style: { x: springX, y: springY, rotateX, rotateY, transformPerspective: 600 },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={baseClasses}
        {...motionProps}
        {...aria}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseClasses, disabled && "cursor-not-allowed opacity-60")}
      {...motionProps}
      {...aria}
    >
      {children}
    </motion.button>
  );
}
