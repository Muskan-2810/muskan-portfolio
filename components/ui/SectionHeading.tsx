import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared "chapter opener" heading used by every story section below the
 * hero — keeps the eyebrow / display-title / supporting-line rhythm
 * consistent so each section reads as the next chapter of one narrative.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "section-heading mb-16 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-display-2 font-medium text-ink">{title}</h2>
      {description && (
        <p className="mt-5 font-body text-base leading-relaxed text-ink-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
