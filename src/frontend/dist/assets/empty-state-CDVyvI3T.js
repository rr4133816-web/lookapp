import { j as jsxRuntimeExports, m as motion, e as cn } from "./index-Dpq2E7IO.js";
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      className: cn(
        "flex flex-col items-center justify-center rounded-[var(--radius)] border border-dashed border-border bg-card/60 px-6 py-14 text-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-14 place-items-center rounded-full bg-primary-soft text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg font-semibold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground", children: description }),
        action ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: action }) : null
      ]
    }
  );
}
export {
  EmptyState as E
};
