import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "framer-motion";
import type * as React from "react";

/** Card surface — 14px radius, hairline border, soft elevated shadow. */
export function Card({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-slot="card"
      className={cn(
        "flex flex-col rounded-[var(--radius)] border border-border/60 bg-card text-card-foreground shadow-elevated",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-5 pb-0", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-display text-lg font-semibold leading-tight",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("p-5", className)} {...props} />
  );
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-3 p-5 pt-0", className)}
      {...props}
    />
  );
}
