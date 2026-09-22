import { staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  hint?: string;
  tone?: "primary" | "accent" | "success" | "warning";
  className?: string;
  index?: number;
}

const TONES = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning-foreground dark:text-warning",
} as const;

/** Compact metric tile with an optional trend indicator. */
export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  hint,
  tone = "primary",
  className,
  index = 0,
}: StatCardProps) {
  const positive = typeof trend === "number" && trend >= 0;

  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3 }}
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated transition-smooth hover:shadow-elevated-lg",
        className,
      )}
      data-ocid={`stat.card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-xl",
            TONES[tone],
          )}
        >
          <Icon className="size-5" />
        </span>
        {typeof trend === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-xs",
              positive
                ? "bg-success/12 text-success"
                : "bg-destructive/12 text-destructive",
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(trend)}%
          </span>
        ) : null}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-mono text-2xl font-semibold leading-none">
          {value}
        </p>
        {hint ? (
          <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </motion.div>
  );
}
