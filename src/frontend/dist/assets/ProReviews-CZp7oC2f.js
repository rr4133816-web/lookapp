import { f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, c as Star, M as MessageSquare } from "./index-Dpq2E7IO.js";
import { T as ThumbsUp, R as ReviewCard } from "./ReviewCard-DgXGsHuK.js";
import { S as StatCard } from "./StatCard-lEGjDQVJ.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import { g as getReviewsForProfessional } from "./reviews-FMWslMCP.js";
import { s as staggerContainer } from "./motion-DSc3ayC3.js";
import "./rating-BsnzBB4p.js";
import "./arrow-up-right-DCzabt5c.js";
const PRO_ID = "p-01";
function ProReviews() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const reviews = reactExports.useMemo(() => getReviewsForProfessional(PRO_ID), []);
  const [tab, setTab] = reactExports.useState("all");
  const filtered = reactExports.useMemo(
    () => reviews.filter(
      (review) => tab === "all" ? true : tab === "five" ? review.rating === 5 : review.rating < 5
    ),
    [reviews, tab]
  );
  if (!professional) return null;
  const fiveStar = reviews.filter((review) => review.rating === 5).length;
  const helpfulTotal = reviews.reduce(
    (total, review) => total + review.helpful,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Reviews" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "What clients say" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Only customers who completed a session can leave a review, so every rating here reflects real work." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Average rating",
              value: professional.rating.toFixed(1),
              icon: Star,
              hint: `From ${professional.reviewCount} reviews`,
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Five-star reviews",
              value: `${fiveStar}`,
              icon: Star,
              tone: "accent",
              hint: `${Math.round(fiveStar / Math.max(reviews.length, 1) * 100)}% of recent`,
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Helpful votes",
              value: `${helpfulTotal}`,
              icon: ThumbsUp,
              tone: "success",
              hint: "Across all reviews",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Response rate",
              value: "98%",
              icon: MessageSquare,
              tone: "warning",
              hint: "Replies within 24 hours",
              index: 3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs,
          {
            items: [
              { value: "all", label: "All reviews", count: reviews.length },
              { value: "five", label: "Five star", count: fiveStar },
              {
                value: "other",
                label: "Four star and below",
                count: reviews.length - fiveStar
              }
            ],
            value: tab,
            onValueChange: setTab
          }
        ),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: Star,
            title: "No reviews in this view",
            description: "Try another tab to see the rest of your feedback."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: staggerContainer,
            initial: "hidden",
            animate: "visible",
            className: "grid gap-4 sm:grid-cols-2",
            children: filtered.map((review, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review, index }, review.id))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Rating breakdown" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2.5", children: [5, 4, 3, 2, 1].map((star) => {
            const share = star === 5 ? 82 : star === 4 ? 14 : star === 3 ? 3 : star === 2 ? 1 : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex w-8 items-center gap-1 font-mono text-xs text-muted-foreground", children: [
                star,
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3 fill-accent text-accent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 flex-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "block h-full rounded-full bg-gradient-signal",
                  style: { width: `${share}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-8 text-right font-mono text-xs text-muted-foreground", children: [
                share,
                "%"
              ] })
            ] }, star);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Reply to a review" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: "A short, specific reply shows prospective customers how you handle feedback." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                className: "w-full",
                onClick: () => pushToast({
                  title: "Reply drafted",
                  description: "Your response will appear under the review.",
                  variant: "success"
                }),
                "data-ocid": "pro_reviews.reply_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4" }),
                  "Write a reply"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProReviews as default
};
