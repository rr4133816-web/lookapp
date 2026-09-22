import { cn } from "@/lib/utils";
import { Search as SearchIcon, X } from "lucide-react";
import type * as React from "react";

export interface SearchProps
  extends Omit<React.ComponentProps<"input">, "onSubmit"> {
  onClear?: () => void;
  containerClassName?: string;
}

/** Search field with a leading icon and an optional clear affordance. */
export function Search({
  className,
  containerClassName,
  value,
  onClear,
  ...props
}: SearchProps) {
  const hasValue = typeof value === "string" && value.length > 0;

  return (
    <div className={cn("relative flex items-center", containerClassName)}>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
      />
      <input
        type="search"
        data-slot="search"
        value={value}
        className={cn(
          "h-11 w-full rounded-full border border-input bg-card pl-10 pr-10 text-sm text-foreground shadow-xs transition-smooth outline-none",
          "placeholder:text-muted-foreground",
          "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
          "[&::-webkit-search-cancel-button]:appearance-none",
          className,
        )}
        {...props}
      />
      {hasValue && onClear ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="absolute right-3 grid size-6 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}
