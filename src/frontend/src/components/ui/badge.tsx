import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium transition-smooth [&_svg]:size-3 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary-soft text-primary",
        accent: "bg-accent-soft text-accent",
        neutral: "bg-muted text-muted-foreground",
        success: "bg-success/12 text-success",
        warning: "bg-warning/15 text-warning-foreground dark:text-warning",
        destructive: "bg-destructive/12 text-destructive",
        outline: "border border-border text-foreground",
        solid: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
