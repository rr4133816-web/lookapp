import { j as jsxRuntimeExports, S as Search$1, e as cn, X } from "./index-Dpq2E7IO.js";
function Search({
  className,
  containerClassName,
  value,
  onClear,
  ...props
}) {
  const hasValue = typeof value === "string" && value.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative flex items-center", containerClassName), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search$1,
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "search",
        "data-slot": "search",
        value,
        className: cn(
          "h-11 w-full rounded-full border border-input bg-card pl-10 pr-10 text-sm text-foreground shadow-xs transition-smooth outline-none",
          "placeholder:text-muted-foreground",
          "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
          "[&::-webkit-search-cancel-button]:appearance-none",
          className
        ),
        ...props
      }
    ),
    hasValue && onClear ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        onClick: onClear,
        className: "absolute right-3 grid size-6 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
      }
    ) : null
  ] });
}
export {
  Search as S
};
