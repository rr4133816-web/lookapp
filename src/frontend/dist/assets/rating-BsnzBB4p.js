import { j as jsxRuntimeExports, c as Star, e as cn } from "./index-Dpq2E7IO.js";
const STAR_SIZES = { sm: "size-3", md: "size-3.5", lg: "size-4" };
const TEXT_SIZES = { sm: "text-xs", md: "text-sm", lg: "text-base" };
function Rating({
  value,
  count,
  size = "md",
  showValue = true,
  className
}) {
  const rounded = Math.round(value * 2) / 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1.5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex items-center gap-0.5",
        role: "img",
        "aria-label": `Rated ${value.toFixed(1)} out of 5`,
        children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            "aria-hidden": "true",
            className: cn(
              STAR_SIZES[size],
              star <= rounded ? "fill-accent text-accent" : "fill-transparent text-border"
            )
          },
          star
        ))
      }
    ),
    showValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "font-mono font-medium text-foreground",
          TEXT_SIZES[size]
        ),
        children: value.toFixed(1)
      }
    ) : null,
    typeof count === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-muted-foreground", TEXT_SIZES[size]), children: [
      "(",
      count,
      ")"
    ] }) : null
  ] });
}
export {
  Rating as R
};
