import { cn } from "@/lib/utils";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

export interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  /** Number of upcoming days to offer, starting today. */
  days?: number;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function toIso(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Horizontal date strip picker — no external date library required. */
export function DatePicker({
  value,
  onChange,
  label = "Select a date",
  className,
  days = 14,
}: DatePickerProps) {
  const [offset, setOffset] = useState(0);

  const options = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: days }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index + offset);
      return {
        iso: toIso(date),
        weekday: WEEKDAYS[date.getDay()],
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        full: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      };
    });
  }, [days, offset]);

  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Show earlier dates"
            disabled={offset === 0}
            onClick={() => setOffset((current) => Math.max(0, current - 7))}
            className="grid size-7 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground disabled:opacity-40"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Show later dates"
            onClick={() => setOffset((current) => current + 7)}
            className="grid size-7 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {options.map((option) => {
          const isActive = option.iso === value;
          return (
            <button
              key={option.iso}
              type="button"
              aria-pressed={isActive}
              aria-label={option.full}
              onClick={() => onChange(option.iso)}
              className={cn(
                "flex w-14 shrink-0 flex-col items-center gap-0.5 rounded-xl border px-2 py-2.5 transition-smooth",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-primary-glow"
                  : "border-border/60 bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider",
                  isActive
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {option.weekday}
              </span>
              <span className="font-mono text-base font-semibold leading-none">
                {option.day}
              </span>
              <span
                className={cn(
                  "text-[10px]",
                  isActive
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {option.month}
              </span>
            </button>
          );
        })}
      </div>
      {value ? (
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      ) : null}
    </div>
  );
}
