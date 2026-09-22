import { f as useApp, r as reactExports, u as useNavigate, j as jsxRuntimeExports, m as motion, B as Badge, S as Search$1, C as CalendarCheck, M as MessageSquare, c as Star, L as Link, k as Compass, a as BadgeCheck } from "./index-Dpq2E7IO.js";
import { B as BookingCard } from "./BookingCard-CjymmSnR.js";
import { P as ProfessionalCard } from "./ProfessionalCard-DaAKIw2R.js";
import { S as StatCard } from "./StatCard-lEGjDQVJ.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { c as categories } from "./categories-B5CYdEVc.js";
import { p as professionals } from "./professionals-CzEAapSV.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { S as Sparkles } from "./sparkles-Cggxsg4G.js";
import { H as Heart } from "./heart-D0Yirsmd.js";
import { A as ArrowRight } from "./arrow-right-DW2zjr6j.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import "./calendar-days-RrFnZuq5.js";
import "./video-CeS3okxd.js";
import "./map-pin-Db--45lR.js";
import "./rating-BsnzBB4p.js";
import "./arrow-up-right-DCzabt5c.js";
function CustomerHome() {
  const { bookings, favorites, conversations, pushToast } = useApp();
  const [query, setQuery] = reactExports.useState("");
  const navigate = useNavigate();
  const upcoming = reactExports.useMemo(
    () => bookings.filter((booking) => booking.status !== "cancelled").slice(0, 2),
    [bookings]
  );
  const recommended = reactExports.useMemo(
    () => [...professionals].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 3),
    []
  );
  const unreadMessages = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0
  );
  const submitSearch = (event) => {
    event.preventDefault();
    navigate(
      query.trim() ? `/app/discover?q=${encodeURIComponent(query.trim())}` : "/app/discover"
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "relative overflow-hidden rounded-[calc(var(--radius)+4px)] bg-gradient-subtle p-6 md:p-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "hairline-grid absolute inset-0 opacity-40",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "orb -right-16 -top-16 size-64 bg-accent/30",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", className: "px-3 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }),
              "Good morning, Alex"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                variants: staggerItem,
                className: "mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl",
                children: "What do you need help with today?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                variants: staggerItem,
                className: "mt-3 text-sm leading-relaxed text-muted-foreground md:text-base",
                children: "Eighteen verified professionals across ten fields, ready when you are."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.form,
              {
                variants: staggerItem,
                onSubmit: submitSearch,
                className: "mt-6 flex flex-col gap-3 sm:flex-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      value: query,
                      onChange: (event) => setQuery(event.target.value),
                      onClear: () => setQuery(""),
                      placeholder: "Search by skill, name or category",
                      "aria-label": "Search professionals",
                      containerClassName: "flex-1",
                      "data-ocid": "home.search_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "lg", "data-ocid": "home.search_button", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { className: "size-4" }),
                    "Search"
                  ] })
                ]
              }
            )
          ] })
        ]
      }
    ),
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
              label: "Upcoming sessions",
              value: `${bookings.filter((b) => b.status === "confirmed").length}`,
              icon: CalendarCheck,
              hint: "Next: 28 September",
              tone: "primary",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Saved professionals",
              value: `${favorites.length}`,
              icon: Heart,
              hint: "Across 3 categories",
              tone: "accent",
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Unread messages",
              value: `${unreadMessages}`,
              icon: MessageSquare,
              hint: "2 professionals replied",
              tone: "success",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Average rating given",
              value: "4.9",
              icon: Star,
              trend: 4,
              hint: "From 6 completed sessions",
              tone: "warning",
              index: 3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Your upcoming sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Everything you have booked, in one place." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/app/bookings",
            className: "inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5",
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
          className: "grid gap-4 lg:grid-cols-2",
          children: upcoming.map((booking, index) => {
            const professional = professionals.find(
              (item) => item.id === booking.professionalId
            );
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              BookingCard,
              {
                booking,
                counterpartName: (professional == null ? void 0 : professional.name) ?? "Professional",
                counterpartAvatar: (professional == null ? void 0 : professional.avatar) ?? "",
                counterpartRole: (professional == null ? void 0 : professional.profession) ?? "",
                index
              },
              booking.id
            );
          })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Browse by category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Ten fields, each with verified specialists." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/app/discover",
            className: "inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5",
            children: [
              "Discover",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "size-4" })
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
          className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
          children: categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: `/app/discover?category=${category.slug}`,
              className: "group flex h-full flex-col gap-1.5 rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-elevated transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 place-items-center rounded-lg bg-primary-soft text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-sm font-semibold leading-tight", children: category.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                  category.professionalCount,
                  " pros"
                ] })
              ]
            }
          ) }, category.slug))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Recommended for you" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Based on your recent bookings and saved searches." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          variants: staggerContainer,
          initial: "hidden",
          animate: "visible",
          className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
          children: recommended.map((professional, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfessionalCard,
            {
              professional,
              index
            },
            professional.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Why professionals get verified" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: [
          {
            icon: BadgeCheck,
            title: "Credentials checked by hand",
            body: "Licences, certifications and identity documents are reviewed before a profile goes live."
          },
          {
            icon: Clock,
            title: "Response times you can plan around",
            body: "Every profile shows the typical reply time, so you know when to expect an answer."
          },
          {
            icon: Star,
            title: "Reviews from completed sessions only",
            body: "Only customers who booked and attended can leave a review."
          }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-4.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm leading-relaxed text-muted-foreground", children: item.body })
          ] })
        ] }, item.title)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex h-full flex-col justify-between gap-6 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Need something specific?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-primary-foreground/85", children: "Tell us what you are looking for and we will match you with the right professional." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            className: "w-full",
            onClick: () => pushToast({
              title: "Request received",
              description: "A matching specialist will be suggested within the hour.",
              variant: "success"
            }),
            "data-ocid": "home.request_button",
            children: "Request a match"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  CustomerHome as default
};
