import { r as reactExports, j as jsxRuntimeExports, I as AnimatePresence, m as motion, X, e as cn } from "./index-Dpq2E7IO.js";
import { o as overlayVariants } from "./motion-DSc3ayC3.js";
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className
}) {
  const panelRef = reactExports.useRef(null);
  const titleId = reactExports.useId();
  const descriptionId = reactExports.useId();
  reactExports.useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    const panel = panelRef.current;
    const focusable = panel == null ? void 0 : panel.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable == null ? void 0 : focusable.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const nodes = Array.from(
        panel.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused == null ? void 0 : previouslyFocused.focus();
    };
  }, [open, onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        onClick: onClose,
        className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ref: panelRef,
        "aria-modal": "true",
        "aria-labelledby": titleId,
        "aria-describedby": description ? descriptionId : void 0,
        variants: overlayVariants,
        initial: "hidden",
        animate: "visible",
        exit: "exit",
        className: cn(
          "relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated-lg",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  id: titleId,
                  className: "font-display text-lg font-semibold leading-tight",
                  children: title
                }
              ),
              description ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: descriptionId,
                  className: "mt-1 text-sm text-muted-foreground",
                  children: description
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Close dialog",
                onClick: onClose,
                className: "grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-5", children }),
          footer ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col-reverse gap-2 border-t border-border/60 p-5 sm:flex-row sm:justify-end", children: footer }) : null
        ]
      }
    )
  ] }) : null });
}
export {
  Modal as M
};
