import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  slots?: string[];
  label?: string;
  className?: string;
}

const DEFAULT_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function formatSlot(slot: string): string {
  const [hours, minutes] = slot.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${`${minutes}`.padStart(2, "0")} ${suffix}`;
}

/** Time slot picker rendered as a responsive chip grid. */
export function TimePicker({
  value,
  onChange,
  slots = DEFAULT_SLOTS,
  label = "Select a time",
  className,
}: TimePickerProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => {
          const isActive = slot === value;
          return (
            <button
              key={slot}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(slot)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 font-mono text-xs transition-smooth",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-primary-glow"
                  : "border-border/60 bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
              )}
            >
              <Clock className="size-3" />
              {formatSlot(slot)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
