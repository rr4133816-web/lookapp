import { j as jsxRuntimeExports, m as motion, B as Badge, e as cn, o as useParams, f as useApp, r as reactExports, L as Link, A as Avatar, a as BadgeCheck, c as Star, M as MessageSquare, C as CalendarCheck, h as Briefcase } from "./index-Dpq2E7IO.js";
import { R as ReviewCard } from "./ReviewCard-DgXGsHuK.js";
import { a as staggerItem, s as staggerContainer } from "./motion-DSc3ayC3.js";
import { S as Sparkles } from "./sparkles-Cggxsg4G.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { R as Rating } from "./rating-BsnzBB4p.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import { g as getReviewsForProfessional } from "./reviews-FMWslMCP.js";
import NotFound from "./NotFound-DoqJ5km9.js";
import { A as ArrowLeft } from "./arrow-left-BCNZdNCL.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
import { H as Heart } from "./heart-D0Yirsmd.js";
import { A as Award } from "./award-DDAKV61F.js";
import { G as Globe } from "./globe-B8DKmQcX.js";
function ServiceCard({
  service,
  selected = false,
  onSelect,
  className,
  index = 0
}) {
  const interactive = Boolean(onSelect);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: staggerItem,
      initial: "hidden",
      animate: "visible",
      whileHover: interactive ? { y: -3 } : void 0,
      className: cn(
        "flex flex-col gap-3 rounded-[var(--radius)] border bg-card p-5 shadow-elevated transition-smooth",
        selected ? "border-primary ring-2 ring-ring/25" : "border-border/60 hover:border-primary/40",
        className
      ),
      "data-ocid": `service.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base font-semibold leading-tight", children: service.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-muted-foreground", children: service.description })
          ] }),
          service.popular ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", className: "shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3" }),
            "Popular"
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-semibold", children: [
              "$",
              service.price
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
              service.durationMinutes,
              " min"
            ] })
          ] }),
          interactive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-pressed": selected,
              onClick: () => onSelect == null ? void 0 : onSelect(service),
              "data-ocid": `service.select_button.${index + 1}`,
              className: cn(
                "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-smooth",
                selected ? "bg-primary text-primary-foreground shadow-primary-glow" : "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary"
              ),
              children: selected ? "Selected" : "Select"
            }
          ) : null
        ] })
      ]
    }
  );
}
function ProfessionalDetail() {
  const { id } = useParams();
  const professional = id ? getProfessional(id) : void 0;
  const { isFavorite, toggleFavorite, pushToast } = useApp();
  const [tab, setTab] = reactExports.useState("services");
  const reviews = reactExports.useMemo(
    () => professional ? getReviewsForProfessional(professional.id) : [],
    [professional]
  );
  if (!professional) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {});
  }
  const favorite = isFavorite(professional.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/app/discover",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
          "Back to discover"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card shadow-elevated",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 bg-gradient-primary md:h-36" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-6 md:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mt-12 flex flex-col gap-5 md:-mt-14 md:flex-row md:items-end md:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    src: professional.avatar,
                    name: professional.name,
                    size: "xl",
                    className: "ring-4 ring-card"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 pb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight md:text-3xl", children: professional.name }),
                    professional.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" }),
                      "Verified"
                    ] }) : null,
                    professional.topRated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "primary", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3" }),
                      "Top rated"
                    ] }) : null
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground md:text-base", children: professional.profession }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Rating,
                      {
                        value: professional.rating,
                        count: professional.reviewCount,
                        size: "md"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
                      professional.location
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
                      "Replies ",
                      professional.responseTime
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "secondary",
                    onClick: () => {
                      toggleFavorite(professional.id);
                      pushToast({
                        title: favorite ? `${professional.name} removed from favourites` : `${professional.name} saved to favourites`,
                        variant: favorite ? "default" : "success"
                      });
                    },
                    "data-ocid": "professional.favorite_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Heart,
                        {
                          className: favorite ? "fill-destructive text-destructive" : ""
                        }
                      ),
                      favorite ? "Saved" : "Save"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/app/messages",
                    className: "inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4" }),
                      "Message"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: `/app/book/${professional.id}`,
                    "data-ocid": "professional.book_button",
                    className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
                      "Book a session"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-4", children: [
              {
                label: "Experience",
                value: `${professional.yearsExperience} years`,
                icon: Briefcase
              },
              {
                label: "Sessions completed",
                value: `${professional.completedJobs}`,
                icon: CalendarCheck
              },
              {
                label: "Starting price",
                value: `$${professional.startingPrice}`,
                icon: Award
              },
              {
                label: "Languages",
                value: professional.languages.join(", "),
                icon: Globe
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: item.value })
              ] })
            ] }, item.label)) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          items: [
            {
              value: "services",
              label: "Services",
              count: professional.services.length
            },
            { value: "about", label: "About" },
            {
              value: "portfolio",
              label: "Portfolio",
              count: professional.portfolio.length
            },
            { value: "reviews", label: "Reviews", count: reviews.length }
          ],
          value: tab,
          onValueChange: setTab,
          children: (active) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
            active === "services" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                variants: staggerContainer,
                initial: "hidden",
                animate: "visible",
                className: "grid gap-4 sm:grid-cols-2",
                children: professional.services.map((service, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ServiceCard,
                  {
                    service,
                    index
                  },
                  service.id
                ))
              }
            ) : null,
            active === "about" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
                  "About ",
                  professional.name.split(" ")[0]
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: professional.bio }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Credentials" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: professional.credentials.map((credential) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-3 rounded-lg bg-muted/50 p-3.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-4" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: credential.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                          credential.issuer,
                          " · ",
                          credential.year
                        ] })
                      ] })
                    ]
                  },
                  credential.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Availability" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                  ].map((day) => {
                    const available = professional.availability.includes(day);
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: available ? "rounded-full bg-success/12 px-3 py-1.5 text-xs font-medium text-success" : "rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground",
                        children: day
                      },
                      day
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
                    "Times shown in ",
                    professional.timezone,
                    ". Exact slots are confirmed at booking."
                  ] })
                ] })
              ] })
            ] }) : null,
            active === "portfolio" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                variants: staggerContainer,
                initial: "hidden",
                animate: "visible",
                className: "grid gap-5 sm:grid-cols-2",
                children: professional.portfolio.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.article,
                  {
                    variants: staggerItem,
                    className: "overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated transition-smooth hover:-translate-y-1 hover:shadow-elevated-lg",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: item.image,
                          alt: item.title,
                          loading: "lazy",
                          className: "aspect-[3/2] w-full object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: item.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: item.description })
                      ] })
                    ]
                  },
                  item.id
                ))
              }
            ) : null,
            active === "reviews" ? reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: Star,
                title: "No reviews yet",
                description: "This professional has not received a review from a completed session yet."
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                variants: staggerContainer,
                initial: "hidden",
                animate: "visible",
                className: "grid gap-4 sm:grid-cols-2",
                children: reviews.map((review, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReviewCard,
                  {
                    review,
                    index
                  },
                  review.id
                ))
              }
            ) : null
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Starting from" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-3xl font-semibold leading-none", children: [
              "$",
              professional.startingPrice,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "/session" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: `/app/book/${professional.id}`,
              "data-ocid": "professional.sidebar_book_button",
              className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
                "Book a session"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Free cancellation up to 24 hours before" })
        ] }) }),
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
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ProfessionalDetail as default
};
