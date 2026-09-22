import { j as jsxRuntimeExports, m as motion, L as Link, K as House, k as Compass } from "./index-Dpq2E7IO.js";
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-subtle px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      className: "w-full max-w-lg rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card p-10 text-center shadow-elevated-lg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold text-primary", children: "404" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-3xl font-bold tracking-tight", children: "This page does not exist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: "The link may be out of date, or the page may have moved. Let us get you back to something useful." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              "data-ocid": "not_found.home_button",
              className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "size-4" }),
                "Back to home"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/app/discover",
              className: "inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "size-4" }),
                "Browse professionals"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  NotFound as default
};
