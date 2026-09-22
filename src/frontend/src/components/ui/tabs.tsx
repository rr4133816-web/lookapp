import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode, useId, useState } from "react";

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: (activeValue: string) => ReactNode;
  className?: string;
  listClassName?: string;
}

/** Segmented tabs with an animated indigo→teal indicator. */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  listClassName,
}: TabsProps) {
  const [internal, setInternal] = useState(
    defaultValue ?? items[0]?.value ?? "",
  );
  const active = value ?? internal;
  const groupId = useId();

  const select = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div
        role="tablist"
        aria-label="Section tabs"
        className={cn(
          "no-scrollbar flex w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-muted/60 p-1",
          listClassName,
        )}
      >
        {items.map((item) => {
          const isActive = item.value === active;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`${groupId}-tab-${item.value}`}
              aria-selected={isActive}
              aria-controls={`${groupId}-panel-${item.value}`}
              onClick={() => select(item.value)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId={`${groupId}-indicator`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-primary shadow-primary-glow"
                />
              ) : null}
              <span className="relative z-10 inline-flex items-center gap-2">
                {item.icon}
                {item.label}
                {typeof item.count === "number" ? (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {item.count}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
      {children ? (
        <div
          role="tabpanel"
          id={`${groupId}-panel-${active}`}
          aria-labelledby={`${groupId}-tab-${active}`}
        >
          {children(active)}
        </div>
      ) : null}
    </div>
  );
}
