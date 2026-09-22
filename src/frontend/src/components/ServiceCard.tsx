import { Badge } from "@/components/ui/badge";
import { staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";

export interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  onSelect?: (service: Service) => void;
  className?: string;
  index?: number;
}

/** Selectable service offering with price and duration. */
export function ServiceCard({
  service,
  selected = false,
  onSelect,
  className,
  index = 0,
}: ServiceCardProps) {
  const interactive = Boolean(onSelect);

  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      whileHover={interactive ? { y: -3 } : undefined}
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius)] border bg-card p-5 shadow-elevated transition-smooth",
        selected
          ? "border-primary ring-2 ring-ring/25"
          : "border-border/60 hover:border-primary/40",
        className,
      )}
      data-ocid={`service.card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-display text-base font-semibold leading-tight">
            {service.name}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {service.description}
          </p>
        </div>
        {service.popular ? (
          <Badge variant="accent" className="shrink-0">
            <Sparkles className="size-3" />
            Popular
          </Badge>
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-lg font-semibold">
            ${service.price}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {service.durationMinutes} min
          </span>
        </div>
        {interactive ? (
          <button
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect?.(service)}
            data-ocid={`service.select_button.${index + 1}`}
            className={cn(
              "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-smooth",
              selected
                ? "bg-primary text-primary-foreground shadow-primary-glow"
                : "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
            )}
          >
            {selected ? "Selected" : "Select"}
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
