import { l as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, A as Avatar, e as cn } from "./index-Dpq2E7IO.js";
import { R as Rating } from "./rating-BsnzBB4p.js";
import { a as staggerItem } from "./motion-DSc3ayC3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
function ReviewCard({ review, className, index = 0 }) {
  const [helpful, setHelpful] = reactExports.useState(review.helpful);
  const [marked, setMarked] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      variants: staggerItem,
      initial: "hidden",
      animate: "visible",
      className: cn(
        "flex flex-col gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated",
        className
      ),
      "data-ocid": `review.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Avatar,
              {
                src: review.authorAvatar,
                name: review.authorName,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: review.authorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: review.serviceName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-mono text-xs text-muted-foreground", children: (/* @__PURE__ */ new Date(`${review.date}T00:00:00`)).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rating, { value: review.rating, showValue: false, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: review.comment }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": marked,
            onClick: () => {
              setMarked((current) => !current);
              setHelpful((current) => marked ? current - 1 : current + 1);
            },
            "data-ocid": `review.helpful_button.${index + 1}`,
            className: cn(
              "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-smooth",
              marked ? "border-accent/40 bg-accent-soft text-accent" : "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: cn("size-3.5", marked && "fill-accent") }),
              "Helpful · ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: helpful })
            ]
          }
        )
      ]
    }
  );
}
export {
  ReviewCard as R,
  ThumbsUp as T
};
