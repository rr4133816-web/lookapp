import { cn } from "@/lib/utils";
import type * as React from "react";

/** LookApp text input — 8px radius, generous 44px target, soft focus ring. */
export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-lg border border-input bg-card px-3.5 py-2 text-sm text-foreground shadow-xs transition-smooth outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-smooth outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: label association is provided by consumers via htmlFor
    <label
      data-slot="label"
      className={cn(
        "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
