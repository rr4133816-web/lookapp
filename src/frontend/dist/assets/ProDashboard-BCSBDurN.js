import { f as useApp, r as reactExports, x as getBookingsForProfessional, j as jsxRuntimeExports, L as Link, m as motion, C as CalendarCheck, U as Users, c as Star, A as Avatar, B as Badge, a as BadgeCheck, M as MessageSquare } from "./index-Dpq2E7IO.js";
import { B as BookingCard } from "./BookingCard-CjymmSnR.js";
import { S as StatCard } from "./StatCard-lEGjDQVJ.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import { g as getReviewsForProfessional } from "./reviews-FMWslMCP.js";
import { g as getTransactionsForProfessional } from "./transactions-CyvY5dO5.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { A as ArrowRight } from "./arrow-right-DW2zjr6j.js";
import { D as DollarSign } from "./dollar-sign-CT6YfWrz.js";
import { T as TrendingUp } from "./trending-up-CkPWbVpI.js";
import "./calendar-days-RrFnZuq5.js";
import "./video-CeS3okxd.js";
import "./map-pin-Db--45lR.js";
import "./arrow-up-right-DCzabt5c.js";
const PRO_ID = "p-01";
function ProDashboard() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const bookings = reactExports.useMemo(() => getBookingsForProfessional(PRO_ID), []);
  const transactions = reactExports.useMemo(
    () => getTransactionsForProfessional(PRO_ID),
    []
  );
  const reviews = reactExports.useMemo(() => getReviewsForProfessional(PRO_ID), []);
  const earnings = transactions.filter((transaction) => transaction.status === "paid").reduce((total, transaction) => total + transaction.net, 0);
  const pending = bookings.filter(
    (booking) => ["pending", "confirmed", "in-progress"].includes(booking.status)
  );
  if (!professional) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Professional portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: [
          "Welcome back, ",
          professional.name.split(" ")[0]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Here is how your practice is performing this month." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/pro/availability",
            className: "inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-4" }),
              "Availability"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/pro/services",
            "data-ocid": "pro_dashboard.manage_services_button",
            className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5",
            children: [
              "Manage services",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
            ]
          }
        )
      ] })
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
              label: "Net earnings",
              value: `$${earnings.toLocaleString()}`,
              icon: DollarSign,
              trend: 12,
              hint: "Last 30 days",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Active bookings",
              value: `${pending.length}`,
              icon: CalendarCheck,
              trend: 8,
              hint: "2 awaiting confirmation",
              tone: "accent",
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Profile views",
              value: "1,284",
              icon: Users,
              trend: -3,
              hint: "Down slightly this week",
              tone: "warning",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Average rating",
              value: professional.rating.toFixed(1),
              icon: Star,
              hint: `From ${professional.reviewCount} reviews`,
              tone: "success",
              index: 3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_340px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Upcoming bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/pro/bookings",
              className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5",
              children: [
                "All bookings",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: staggerContainer,
            initial: "hidden",
            animate: "visible",
            className: "grid gap-4",
            children: pending.slice(0, 3).map((booking, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              BookingCard,
              {
                booking,
                counterpartName: booking.customerName,
                counterpartAvatar: booking.customerAvatar,
                counterpartRole: "Customer",
                index,
                actions: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    onClick: () => pushToast({
                      title: "Booking accepted",
                      description: `${booking.customerName} has been notified.`,
                      variant: "success"
                    }),
                    "data-ocid": `pro_dashboard.accept_button.${index + 1}`,
                    children: "Accept"
                  }
                )
              },
              booking.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Profile strength" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  src: professional.avatar,
                  name: professional.name,
                  size: "lg"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: professional.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: professional.profession }),
                professional.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", className: "mt-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" }),
                  "Verified"
                ] }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Completeness" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: "92%" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-full w-[92%] rounded-full bg-gradient-signal" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: [
              { label: "Identity verified", done: true },
              { label: "Credentials uploaded", done: true },
              { label: "Portfolio added", done: true },
              { label: "Availability set", done: false }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: item.done ? "grid size-5 place-items-center rounded-full bg-success/12 text-success" : "grid size-5 place-items-center rounded-full bg-muted text-muted-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: item.done ? "text-foreground" : "text-muted-foreground",
                  children: item.label
                }
              )
            ] }, item.label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/pro/availability",
                className: "inline-flex h-10 w-full items-center justify-center rounded-full border border-border bg-card text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary",
                children: "Complete your profile"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Recent reviews" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            reviews.slice(0, 2).map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                variants: staggerItem,
                className: "rounded-lg bg-muted/50 p-3.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: review.authorName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-mono text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3 fill-accent text-accent" }),
                      review.rating,
                      ".0"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground", children: review.comment })
                ]
              },
              review.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/pro/reviews",
                className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5",
                children: [
                  "All reviews",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold", children: "You are in the top 10% this month" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-primary-foreground/85", children: "Your response time and completion rate are both above the platform average." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/pro/earnings",
              className: "inline-flex h-10 items-center gap-2 rounded-full bg-card px-5 text-sm font-medium text-primary transition-smooth hover:-translate-y-0.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4" }),
                "View earnings"
              ]
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}
export {
  ProDashboard as default
};
