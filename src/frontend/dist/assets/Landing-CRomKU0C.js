import { r as reactExports, u as useNavigate, j as jsxRuntimeExports, L as Link, m as motion, B as Badge, a as BadgeCheck, S as Search$1, b as ShieldCheck, c as Star, U as Users, C as CalendarCheck, M as MessageSquare, d as CreditCard, e as cn } from "./index-Dpq2E7IO.js";
import { P as ProfessionalCard } from "./ProfessionalCard-DaAKIw2R.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { c as categories } from "./categories-B5CYdEVc.js";
import { p as professionals } from "./professionals-CzEAapSV.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { A as ArrowRight } from "./arrow-right-DW2zjr6j.js";
import { T as TrendingUp } from "./trending-up-CkPWbVpI.js";
import { S as Sparkles } from "./sparkles-Cggxsg4G.js";
import "./rating-BsnzBB4p.js";
import "./heart-D0Yirsmd.js";
import "./map-pin-Db--45lR.js";
const STEPS = [
  {
    icon: Search$1,
    title: "Search with intent",
    body: "Filter by category, price, rating and availability. Every profile shows verified credentials before you commit."
  },
  {
    icon: CalendarCheck,
    title: "Book in minutes",
    body: "Pick a service, choose a slot and confirm. You get a written summary of what will happen in the session."
  },
  {
    icon: MessageSquare,
    title: "Work together",
    body: "Message your professional before and after the booking. Everything stays in one thread."
  },
  {
    icon: CreditCard,
    title: "Pay when it is done",
    body: "Funds are held until the session is complete. If something goes wrong, our disputes team steps in."
  }
];
const TRUST = [
  { icon: ShieldCheck, label: "Identity verified", value: "100%" },
  { icon: Star, label: "Average rating", value: "4.9" },
  { icon: Users, label: "Active professionals", value: "18" },
  { icon: TrendingUp, label: "Sessions completed", value: "6.4k" }
];
function Landing() {
  const [query, setQuery] = reactExports.useState("");
  const navigate = useNavigate();
  const featured = reactExports.useMemo(
    () => [...professionals].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 6),
    []
  );
  const submitSearch = (event) => {
    event.preventDefault();
    navigate(
      query.trim() ? `/app/discover?q=${encodeURIComponent(query.trim())}` : "/app/discover"
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-card/80 surface-glass", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "flex items-center gap-2",
          "aria-label": "LookApp home",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 place-items-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-primary-foreground shadow-primary-glow", children: "LA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold tracking-tight", children: [
              "Look",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "App" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          "aria-label": "Primary",
          className: "ml-6 hidden items-center gap-1 md:flex",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#how-it-works",
                className: "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground",
                children: "How it works"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#categories",
                className: "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground",
                children: "Categories"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#professionals",
                className: "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground",
                children: "Professionals"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "hidden h-10 items-center rounded-full px-4 text-sm font-medium text-foreground transition-smooth hover:bg-muted sm:inline-flex",
            children: "Sign in"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/register",
            "data-ocid": "landing.get_started_button",
            className: "inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92",
            children: [
              "Get started",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-gradient-subtle", children: [
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
            className: "orb -left-24 top-0 size-72 bg-primary/40",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "orb right-0 top-32 size-80 bg-accent/30",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: staggerContainer,
              initial: "hidden",
              animate: "visible",
              className: "max-w-2xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", className: "px-3 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3.5" }),
                  "Every professional identity-verified"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    variants: staggerItem,
                    className: "mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl",
                    children: [
                      "Find the right professional.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-gradient", children: "Book with confidence." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    variants: staggerItem,
                    className: "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg",
                    children: "LookApp connects you with verified specialists across ten fields — from cloud architects and accountants to architects, tutors and electricians. Transparent pricing, real reviews, no guesswork."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.form,
                  {
                    variants: staggerItem,
                    onSubmit: submitSearch,
                    className: "mt-8 flex flex-col gap-3 sm:flex-row",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Search,
                        {
                          value: query,
                          onChange: (event) => setQuery(event.target.value),
                          onClear: () => setQuery(""),
                          placeholder: "Try “cloud architect” or “tax advisor”",
                          "aria-label": "Search professionals",
                          containerClassName: "flex-1",
                          "data-ocid": "landing.search_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "submit",
                          size: "lg",
                          "data-ocid": "landing.search_button",
                          className: "shrink-0",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { className: "size-4" }),
                            "Search"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    variants: staggerItem,
                    className: "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3",
                    children: TRUST.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-4 text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold", children: item.value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.label })
                    ] }, item.label))
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96, y: 20 },
              animate: { opacity: 1, scale: 1, y: 0 },
              transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15
              },
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[calc(var(--radius)+6px)] border border-border/60 bg-card shadow-elevated-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/hero-marketplace.dim_1400x900.jpg",
                    alt: "Professionals collaborating in a bright modern workspace",
                    className: "aspect-[14/9] w-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5, duration: 0.5 },
                    className: "absolute -bottom-5 left-4 flex items-center gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-3.5 shadow-elevated-lg sm:left-6",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-10 place-items-center rounded-xl bg-accent-soft text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-5" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Verification complete" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Credentials checked in 24 hours" })
                      ] })
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          id: "categories",
          className: "border-t border-border/60 py-16 md:py-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-4 md:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-end md:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Browse by field" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl", children: "Ten categories, one standard" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/app/discover",
                  className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5",
                  children: [
                    "Browse all professionals",
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
                whileInView: "visible",
                viewport: { once: true, margin: "-80px" },
                className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
                children: categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: `/app/discover?category=${category.slug}`,
                    className: "group flex h-full flex-col gap-2 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated-lg",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-10 place-items-center rounded-xl bg-primary-soft text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-sm font-semibold leading-tight", children: category.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: category.tagline }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-auto pt-2 font-mono text-xs text-muted-foreground", children: [
                        category.professionalCount,
                        " professionals"
                      ] })
                    ]
                  }
                ) }, category.slug))
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          id: "how-it-works",
          className: "border-y border-border/60 bg-muted/40 py-16 md:py-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-4 md:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "How it works" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl", children: "Four steps from search to session" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base leading-relaxed text-muted-foreground", children: "No sales calls, no hidden fees, no waiting for a quote. You see the price and the credentials before you book." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.ol,
              {
                variants: staggerContainer,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-80px" },
                className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4",
                children: STEPS.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.li,
                  {
                    variants: staggerItem,
                    className: "relative flex flex-col gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-6 shadow-elevated",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                        "0",
                        index + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-primary-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "size-5" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: step.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: step.body })
                    ]
                  },
                  step.title
                ))
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "professionals", className: "py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-4 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-end md:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Top rated this month" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl", children: "Professionals worth your time" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/app/discover",
              className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5",
              children: [
                "See all 18",
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
            whileInView: "visible",
            viewport: { once: true, margin: "-80px" },
            className: "mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
            children: featured.map((professional, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProfessionalCard,
              {
                professional,
                index
              },
              professional.id
            ))
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-16 md:pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-[1400px] px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[calc(var(--radius)+6px)] bg-gradient-primary px-6 py-14 text-center shadow-elevated-lg md:px-16 md:py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "orb -left-16 -top-16 size-64 bg-primary-foreground/20",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "orb -bottom-20 right-0 size-72 bg-primary-foreground/15",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold tracking-tight text-primary-foreground md:text-4xl", children: "Ready to book your first session?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-relaxed text-primary-foreground/85", children: "Create a free account and browse all eighteen verified professionals. No card required until you book." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/register",
                "data-ocid": "landing.create_account_button",
                className: "inline-flex h-12 items-center gap-2 rounded-full bg-card px-7 text-sm font-medium text-primary shadow-elevated-lg transition-smooth hover:-translate-y-0.5",
                children: [
                  "Create free account",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app/discover",
                className: "inline-flex h-12 items-center rounded-full border border-primary-foreground/40 px-7 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary-foreground/10",
                children: "Explore professionals"
              }
            )
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border/60 bg-muted/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-12 md:grid-cols-4 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-8 place-items-center rounded-lg bg-gradient-primary font-display text-xs font-bold text-primary-foreground", children: "LA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sm font-semibold", children: [
              "Look",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "App" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs leading-relaxed text-muted-foreground", children: "A marketplace for verified professional services. All data shown is illustrative." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app/discover",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Discover"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app/bookings",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Bookings"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app/favorites",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Favourites"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "For professionals" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/pro",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Professional portal"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/pro/verification",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Get verified"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/pro/earnings",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Earnings"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Sign in"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/register",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Create account"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/forgot-password",
                className: "text-muted-foreground transition-smooth hover:text-primary",
                children: "Reset password"
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " LookApp. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window === "undefined" ? "" : window.location.hostname
            )}`,
            target: "_blank",
            rel: "noreferrer",
            className: cn("transition-smooth hover:text-primary"),
            children: "Built with love using caffeine.ai"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  Landing as default
};
