"use client";

import { useMemo, useState } from "react";
import { SKILL_CATEGORIES } from "@/constants/data";
import { cn } from "@/lib/utils";

const RADIUS = 230; // px, measured within the fixed 620x620 layout box below
const CENTER = 310;

/**
 * Interactive AI neural network: a central "Core" node connects to one node
 * per skill category, arranged in a circle. Hovering/focusing a node lights
 * its connection, brightens the node, and expands its real skill list —
 * replacing the previous orbiting-icon visualization with something that
 * reads as an actual network rather than decoration.
 */
export default function NeuralSkillNetwork() {
  const [active, setActive] = useState<string | null>(null);

  const nodes = useMemo(
    () =>
      SKILL_CATEGORIES.map((category, i) => {
        const angle = (i / SKILL_CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
        const x = CENTER + Math.cos(angle) * RADIUS;
        const y = CENTER + Math.sin(angle) * RADIUS;
        return { ...category, x, y };
      }),
    []
  );

  return (
    <div className="relative mx-auto h-[350px] sm:h-[450px] lg:h-[620px]" style={{ width: "100%" }}>
      {/* Fixed-geometry layout box, scaled down responsively via Tailwind
          transform utilities so the trigonometry above never has to be
          recalculated per breakpoint — only the CSS scale changes. */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.55] sm:scale-[0.72] lg:scale-100"
        style={{ width: CENTER * 2, height: CENTER * 2 }}
      >
        {/* Connection lines (SVG, sits beneath the nodes) */}
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
          aria-hidden
        >
          {nodes.map((node) => (
            <line
              key={node.id}
              x1={CENTER}
              y1={CENTER}
              x2={node.x}
              y2={node.y}
              stroke={active === node.id ? node.accent : "#1E2229"}
              strokeWidth={active === node.id ? 2 : 1}
              className="transition-all duration-500"
            />
          ))}
        </svg>

        {/* Core node */}
        <div
          className="absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-aurora text-center shadow-glow"
          style={{ left: CENTER, top: CENTER }}
        >
          <span className="font-display text-sm font-semibold text-void">AI</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-void/70">
            Core
          </span>
        </div>

        {/* Category nodes */}
        {nodes.map((node) => {
          const isActive = active === node.id;
          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
                aria-expanded={isActive}
                className={cn(
                  "flex w-40 flex-col items-center gap-2 rounded-2xl border bg-charcoal/70 px-4 py-4 text-center backdrop-blur-md transition-all duration-300",
                  isActive ? "-translate-y-1 shadow-glow" : "border-charcoal-border"
                )}
                style={{
                  borderColor: isActive ? node.accent : undefined,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: node.accent, boxShadow: `0 0 10px ${node.accent}` }}
                />
                <span className="font-body text-sm font-medium text-ink">{node.label}</span>

                <div
                  className={cn(
                    "grid gap-1 overflow-hidden transition-all duration-300",
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="flex min-h-0 flex-wrap justify-center gap-1 overflow-hidden pt-1">
                    {node.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-charcoal-border px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
