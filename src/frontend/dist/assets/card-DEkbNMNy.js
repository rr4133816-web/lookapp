import { j as jsxRuntimeExports, m as motion, e as cn } from "./index-Dpq2E7IO.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      "data-slot": "card",
      className: cn(
        "flex flex-col rounded-[var(--radius)] border border-border/60 bg-card text-card-foreground shadow-elevated",
        className
      ),
      ...props
    }
  );
}
function CardHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn("flex flex-col gap-1.5 p-5 pb-0", className),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h3",
    {
      "data-slot": "card-title",
      className: cn(
        "font-display text-lg font-semibold leading-tight",
        className
      ),
      ...props
    }
  );
}
function CardDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      "data-slot": "card-description",
      className: cn("text-sm leading-relaxed text-muted-foreground", className),
      ...props
    }
  );
}
function CardContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-slot": "card-content", className: cn("p-5", className), ...props });
}
export {
  Card as C,
  CardHeader as a,
  CardTitle as b,
  CardContent as c,
  CardDescription as d
};
