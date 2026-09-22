import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const STAR_SIZES = { sm: "size-3", md: "size-3.5", lg: "size-4" } as const;
const TEXT_SIZES = { sm: "text-xs", md: "text-sm", lg: "text-base" } as const;

/** Star rating with a teal accent for the filled state. */
export function Rating({
  value,
  count,
  size = "md",
  showValue = true,
  className,
}: RatingProps) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className="inline-flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${value.toFixed(1)} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            aria-hidden="true"
            className={cn(
              STAR_SIZES[size],
              star <= rounded
                ? "fill-accent text-accent"
                : "fill-transparent text-border",
            )}
          />
        ))}
      </span>
      {showValue ? (
        <span
          className={cn(
            "font-mono font-medium text-foreground",
            TEXT_SIZES[size],
          )}
        >
          {value.toFixed(1)}
        </span>
      ) : null}
      {typeof count === "number" ? (
        <span className={cn("text-muted-foreground", TEXT_SIZES[size])}>
          ({count})
        </span>
      ) : null}
    </span>
  );
}
