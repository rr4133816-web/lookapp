import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  online?: boolean;
}

const SIZES = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-xl",
} as const;

function initials(name: string): string {
  return name
    .replace(/^Dr\.\s+/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Avatar with a deterministic initials fallback and optional presence dot. */
export function Avatar({
  src,
  name,
  size = "md",
  className,
  online,
}: AvatarProps) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "grid place-items-center overflow-hidden rounded-full border border-border/60 bg-primary-soft font-display font-semibold text-primary",
          SIZES[size],
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          initials(name)
        )}
      </span>
      {online ? (
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-success"
        />
      ) : null}
    </span>
  );
}
