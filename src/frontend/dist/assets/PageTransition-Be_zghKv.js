import { j as jsxRuntimeExports, m as motion, e as cn } from "./index-Dpq2E7IO.js";
import { p as pageVariants } from "./motion-DSc3ayC3.js";
function PageTransition({ children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      variants: pageVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      className: cn("w-full", className),
      children
    }
  );
}
function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: cn(
        "flex flex-col gap-4 border-b border-border/60 pb-6 md:flex-row md:items-end md:justify-between",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          eyebrow ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: eyebrow }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: title }),
          description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: description }) : null
        ] }),
        actions ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: actions }) : null
      ]
    }
  );
}
export {
  PageTransition as P,
  PageHeader as a
};
