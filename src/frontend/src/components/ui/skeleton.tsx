import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse-soft rounded-lg bg-muted", className)}
      {...props}
    />
  );
}

/** Layout-matched skeleton for a professional card grid. */
export function ProfessionalCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated">
      <div className="flex items-center gap-3">
        <Skeleton className="size-14 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
}

/** Layout-matched skeleton for a data table. */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  const ids = Array.from(
    { length: rows },
    (_, index) => `table-skeleton-${index}`,
  );
  return (
    <div className="space-y-3">
      {ids.map((id) => (
        <Skeleton key={id} className="h-12 w-full" />
      ))}
    </div>
  );
}
