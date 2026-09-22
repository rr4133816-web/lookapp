import { useApp } from "@/hooks/use-app";
import { cn } from "@/lib/utils";
import type { ToastMessage } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";

const ICONS = {
  default: Info,
  success: CheckCircle2,
  error: AlertCircle,
} as const;

const TONES = {
  default: "text-primary",
  success: "text-success",
  error: "text-destructive",
} as const;

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) {
  const Icon = ICONS[toast.variant];

  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), 5000);
    return () => window.clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto flex w-full items-start gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-elevated-lg"
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", TONES[toast.variant])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug">{toast.title}</p>
        {toast.description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {toast.description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="grid size-6 shrink-0 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
      >
        <X className="size-3.5" />
      </button>
    </motion.li>
  );
}

/** Global toast viewport, driven by the app context. */
export function ToastViewport() {
  const { toasts, dismissToast } = useApp();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-24 right-4 z-[60] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2 md:bottom-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
