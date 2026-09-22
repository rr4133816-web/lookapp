import { l as createLucideIcon, j as jsxRuntimeExports, m as motion, e as cn } from "./index-Dpq2E7IO.js";
import { a as staggerItem } from "./motion-DSc3ayC3.js";
import { A as ArrowUpRight } from "./arrow-up-right-DCzabt5c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
];
const ArrowDownRight = createLucideIcon("arrow-down-right", __iconNode);
const TONES = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning-foreground dark:text-warning"
};
function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  hint,
  tone = "primary",
  className,
  index = 0
}) {
  const positive = typeof trend === "number" && trend >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: staggerItem,
      initial: "hidden",
      animate: "visible",
      whileHover: { y: -3 },
      className: cn(
        "flex flex-col gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated transition-smooth hover:shadow-elevated-lg",
        className
      ),
      "data-ocid": `stat.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "grid size-10 place-items-center rounded-xl",
                TONES[tone]
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" })
            }
          ),
          typeof trend === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-xs",
                positive ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive"
              ),
              children: [
                positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "size-3" }),
                Math.abs(trend),
                "%"
              ]
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-2xl font-semibold leading-none", children: value }),
          hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: hint }) : null
        ] })
      ]
    }
  );
}
export {
  ArrowDownRight as A,
  StatCard as S
};
