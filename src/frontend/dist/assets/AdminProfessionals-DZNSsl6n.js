import { f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, U as Users, a as BadgeCheck, c as Star, A as Avatar, B as Badge, p as ChevronLeft, D as Drawer, h as Briefcase, T as TableSkeleton, e as cn } from "./index-Dpq2E7IO.js";
import { S as StatCard } from "./StatCard-lEGjDQVJ.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, c as CardContent } from "./card-DEkbNMNy.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { R as Rating } from "./rating-BsnzBB4p.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { c as categories, g as getCategory } from "./categories-B5CYdEVc.js";
import { p as professionals } from "./professionals-CzEAapSV.js";
import { g as getTransactionsForProfessional } from "./transactions-CyvY5dO5.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { T as TrendingUp } from "./trending-up-CkPWbVpI.js";
import { D as DollarSign } from "./dollar-sign-CT6YfWrz.js";
import { R as RotateCcw } from "./rotate-ccw-Dz415nOQ.js";
import { S as ShieldAlert } from "./shield-alert-4JvmpJY8.js";
import { C as ChevronRight } from "./chevron-right-DcIi2rwK.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { A as Award } from "./award-DDAKV61F.js";
import { A as ArrowUpDown } from "./arrow-up-down-o9n8Rq9h.js";
import "./arrow-up-right-DCzabt5c.js";
const PAGE_SIZE = 8;
function formatCurrency(value) {
  return `$${value.toLocaleString()}`;
}
function SortHeader({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  align = "left"
}) {
  const isActive = activeKey === sortKey;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      scope: "col",
      className: cn(
        "px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
        align === "right" ? "text-right" : "text-left"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSort(sortKey),
          "aria-label": `Sort by ${label}`,
          className: cn(
            "inline-flex items-center gap-1.5 rounded-md transition-smooth hover:text-foreground",
            isActive && "text-foreground",
            align === "right" && "flex-row-reverse"
          ),
          children: [
            label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArrowUpDown,
              {
                className: cn(
                  "size-3.5 transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground/60"
                )
              }
            ),
            isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: direction === "asc" ? "ascending" : "descending" }) : null
          ]
        }
      )
    }
  );
}
function AdminProfessionals() {
  const { pushToast } = useApp();
  const [query, setQuery] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState(
    "all"
  );
  const [verificationFilter, setVerificationFilter] = reactExports.useState("all");
  const [ratingFilter, setRatingFilter] = reactExports.useState("all");
  const [sortKey, setSortKey] = reactExports.useState("rating");
  const [sortDirection, setSortDirection] = reactExports.useState("desc");
  const [page, setPage] = reactExports.useState(1);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [verificationOverrides, setVerificationOverrides] = reactExports.useState({});
  const roster = reactExports.useMemo(
    () => professionals.map(
      (professional) => professional.id in verificationOverrides ? {
        ...professional,
        verified: verificationOverrides[professional.id]
      } : professional
    ),
    [verificationOverrides]
  );
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    const rows = roster.filter((professional) => {
      const matchesTerm = !term || professional.name.toLowerCase().includes(term) || professional.profession.toLowerCase().includes(term) || professional.location.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === "all" || professional.category === categoryFilter;
      const matchesVerification = verificationFilter === "all" || (verificationFilter === "verified" ? professional.verified : !professional.verified);
      const matchesRating = ratingFilter === "all" || professional.rating >= Number(ratingFilter);
      return matchesTerm && matchesCategory && matchesVerification && matchesRating;
    });
    const sorted = [...rows].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "completedJobs") return a.completedJobs - b.completedJobs;
      if (sortKey === "startingPrice") return a.startingPrice - b.startingPrice;
      return a.rating - b.rating;
    });
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [
    roster,
    query,
    categoryFilter,
    verificationFilter,
    ratingFilter,
    sortKey,
    sortDirection
  ]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const selected = reactExports.useMemo(
    () => roster.find((professional) => professional.id === selectedId) ?? null,
    [roster, selectedId]
  );
  const stats = reactExports.useMemo(() => {
    const verified = roster.filter(
      (professional) => professional.verified
    ).length;
    const avgRating = roster.reduce((total, professional) => total + professional.rating, 0) / Math.max(1, roster.length);
    const avgPrice = roster.reduce(
      (total, professional) => total + professional.startingPrice,
      0
    ) / Math.max(1, roster.length);
    return {
      total: roster.length,
      verified,
      unverified: roster.length - verified,
      avgRating,
      avgPrice
    };
  }, [roster]);
  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
    setPage(1);
  };
  const setVerified = (professional, verified) => {
    setVerificationOverrides((current) => ({
      ...current,
      [professional.id]: verified
    }));
    pushToast({
      title: verified ? `${professional.name} verified` : `${professional.name} verification revoked`,
      description: verified ? "Their verified badge is now visible to customers." : "Their profile is flagged for a fresh document review.",
      variant: verified ? "success" : "error"
    });
  };
  const resetFilters = () => {
    setQuery("");
    setCategoryFilter("all");
    setVerificationFilter("all");
    setRatingFilter("all");
    setPage(1);
  };
  const hasFilters = query.trim().length > 0 || categoryFilter !== "all" || verificationFilter !== "all" || ratingFilter !== "all";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin_professionals.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Admin console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Professionals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "The supply side of the marketplace. Review credentials, compare performance and manage verification status." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "secondary",
          onClick: () => pushToast({
            title: "Roster exported",
            description: "A CSV of the current view has been prepared.",
            variant: "success"
          }),
          "data-ocid": "admin_professionals.export_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }),
            "Export roster"
          ]
        }
      )
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
              label: "Professionals",
              value: stats.total.toLocaleString(),
              icon: Users,
              trend: 5,
              hint: "Active on the marketplace",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Verified",
              value: stats.verified.toLocaleString(),
              icon: BadgeCheck,
              trend: 8,
              hint: "Credentials confirmed",
              tone: "accent",
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Average rating",
              value: stats.avgRating.toFixed(2),
              icon: Star,
              trend: 2,
              hint: "Across all categories",
              tone: "success",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Avg. starting price",
              value: formatCurrency(Math.round(stats.avgPrice)),
              icon: DollarSign,
              hint: "Per session",
              tone: "warning",
              index: 3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            value: query,
            onChange: (event) => {
              setQuery(event.target.value);
              setPage(1);
            },
            onClear: () => {
              setQuery("");
              setPage(1);
            },
            placeholder: "Search by name, profession or location",
            "aria-label": "Search professionals",
            containerClassName: "w-full lg:max-w-md",
            "data-ocid": "admin_professionals.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "admin-pros-category", children: "Filter by category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-pros-category",
              value: categoryFilter,
              onChange: (event) => {
                setCategoryFilter(event.target.value);
                setPage(1);
              },
              "data-ocid": "admin_professionals.category_select",
              className: "h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All categories" }),
                categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: category.slug, children: category.name }, category.slug))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "admin-pros-verification", children: "Filter by verification" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-pros-verification",
              value: verificationFilter,
              onChange: (event) => {
                setVerificationFilter(
                  event.target.value
                );
                setPage(1);
              },
              "data-ocid": "admin_professionals.verification_select",
              className: "h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Any verification" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "verified", children: "Verified only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unverified", children: "Unverified only" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "admin-pros-rating", children: "Filter by rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-pros-rating",
              value: ratingFilter,
              onChange: (event) => {
                setRatingFilter(event.target.value);
                setPage(1);
              },
              "data-ocid": "admin_professionals.rating_select",
              className: "h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Any rating" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4.5", children: "4.5 and above" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4.8", children: "4.8 and above" })
              ]
            }
          ),
          hasFilters ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: resetFilters,
              "data-ocid": "admin_professionals.reset_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4" }),
                "Reset"
              ]
            }
          ) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          items: [
            { value: "all", label: "All", count: roster.length },
            {
              value: "verified",
              label: "Verified",
              count: roster.filter((professional) => professional.verified).length
            },
            {
              value: "unverified",
              label: "Unverified",
              count: roster.filter((professional) => !professional.verified).length
            }
          ],
          value: verificationFilter,
          onValueChange: (value) => {
            setVerificationFilter(value);
            setPage(1);
          },
          listClassName: "max-w-md"
        }
      ),
      pageRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: ShieldAlert,
          title: "No professionals match these filters",
          description: "Try another category or verification state, or clear the search to see the full roster.",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: resetFilters,
              "data-ocid": "admin_professionals.empty_reset_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4" }),
                "Clear filters"
              ]
            }
          )
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden overflow-hidden rounded-[var(--radius)] border border-border/60 md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full border-collapse text-sm",
            "data-ocid": "admin_professionals.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-muted/70 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortHeader,
                  {
                    label: "Professional",
                    sortKey: "name",
                    activeKey: sortKey,
                    direction: sortDirection,
                    onSort: handleSort
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    scope: "col",
                    className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                    children: "Category"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    scope: "col",
                    className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                    children: "Verification"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortHeader,
                  {
                    label: "Rating",
                    sortKey: "rating",
                    activeKey: sortKey,
                    direction: sortDirection,
                    onSort: handleSort
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortHeader,
                  {
                    label: "Jobs",
                    sortKey: "completedJobs",
                    activeKey: sortKey,
                    direction: sortDirection,
                    onSort: handleSort,
                    align: "right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortHeader,
                  {
                    label: "From",
                    sortKey: "startingPrice",
                    activeKey: sortKey,
                    direction: sortDirection,
                    onSort: handleSort,
                    align: "right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Actions" }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pageRows.map((professional, index) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.tr,
                  {
                    variants: staggerItem,
                    initial: "hidden",
                    animate: "visible",
                    className: "border-b border-border/40 transition-smooth last:border-0 hover:bg-muted/40",
                    "data-ocid": `admin_professionals.row.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Avatar,
                          {
                            src: professional.avatar,
                            name: professional.name,
                            size: "sm"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium text-foreground", children: professional.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: professional.profession })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neutral", children: ((_a = getCategory(professional.category)) == null ? void 0 : _a.name) ?? professional.category }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: professional.verified ? "success" : "warning",
                          children: professional.verified ? "Verified" : "Pending"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Rating,
                        {
                          value: professional.rating,
                          count: professional.reviewCount,
                          size: "sm"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-sm", children: professional.completedJobs.toLocaleString() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-sm", children: formatCurrency(professional.startingPrice) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "sm",
                          onClick: () => setSelectedId(professional.id),
                          "data-ocid": `admin_professionals.view_button.${index + 1}`,
                          children: "View"
                        }
                      ) })
                    ]
                  },
                  professional.id
                );
              }) })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.ul,
          {
            variants: staggerContainer,
            initial: "hidden",
            animate: "visible",
            className: "space-y-3 md:hidden",
            "data-ocid": "admin_professionals.list",
            children: pageRows.map((professional, index) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.li,
                {
                  variants: staggerItem,
                  className: "rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-elevated",
                  "data-ocid": `admin_professionals.item.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Avatar,
                        {
                          src: professional.avatar,
                          name: professional.name,
                          size: "md"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: professional.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: professional.profession }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: professional.verified ? "success" : "warning",
                              children: professional.verified ? "Verified" : "Pending"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neutral", children: ((_a = getCategory(professional.category)) == null ? void 0 : _a.name) ?? professional.category })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between border-t border-border/40 pt-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Rating,
                        {
                          value: professional.rating,
                          count: professional.reviewCount,
                          size: "sm"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: formatCurrency(professional.startingPrice) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "secondary",
                        size: "sm",
                        className: "mt-3 w-full",
                        onClick: () => setSelectedId(professional.id),
                        "data-ocid": `admin_professionals.view_button.${index + 1}`,
                        children: "View profile"
                      }
                    )
                  ]
                },
                professional.id
              );
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-4 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
              (safePage - 1) * PAGE_SIZE + 1,
              "–",
              Math.min(safePage * PAGE_SIZE, filtered.length)
            ] }),
            " ",
            "of",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: filtered.length }),
            " ",
            "professionals"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                disabled: safePage <= 1,
                onClick: () => setPage((current) => Math.max(1, current - 1)),
                "data-ocid": "admin_professionals.pagination_prev",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }),
                  "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
              safePage,
              " / ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                disabled: safePage >= totalPages,
                onClick: () => setPage((current) => Math.min(totalPages, current + 1)),
                "data-ocid": "admin_professionals.pagination_next",
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Drawer,
      {
        open: selected !== null,
        onClose: () => setSelectedId(null),
        title: (selected == null ? void 0 : selected.name) ?? "Professional",
        description: selected == null ? void 0 : selected.profession,
        className: "max-w-md",
        children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-6",
            "data-ocid": "admin_professionals.detail_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: selected.avatar, name: selected.name, size: "xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-lg font-semibold", children: selected.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-muted-foreground", children: selected.profession }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: selected.verified ? "success" : "warning", children: selected.verified ? "Verified" : "Pending review" }),
                    selected.topRated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", children: "Top rated" }) : null
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
                  selected.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
                  "Replies ",
                  selected.responseTime
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-3.5" }),
                  selected.yearsExperience,
                  " yrs experience"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Rating" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Rating,
                    {
                      value: selected.rating,
                      count: selected.reviewCount,
                      size: "sm"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Completed jobs" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-mono text-sm", children: selected.completedJobs.toLocaleString() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Starting price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-mono text-sm", children: formatCurrency(selected.startingPrice) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Lifetime earnings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-mono text-sm", children: formatCurrency(
                    getTransactionsForProfessional(selected.id).reduce(
                      (total, transaction) => total + transaction.net,
                      0
                    ) || selected.completedJobs * 118
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Services" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: selected.services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "li",
                  {
                    className: "rounded-[var(--radius)] border border-border/60 bg-card p-3",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: service.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                          service.durationMinutes,
                          " min"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-mono text-sm", children: formatCurrency(service.price) })
                    ] })
                  },
                  service.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Credentials" }),
                selected.credentials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No credentials submitted yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: selected.credentials.map((credential) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-4" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: credential.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      credential.issuer,
                      " · ",
                      credential.year
                    ] })
                  ] })
                ] }, credential.id)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Verification actions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  selected.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "destructive",
                      size: "sm",
                      onClick: () => setVerified(selected, false),
                      "data-ocid": "admin_professionals.revoke_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-4" }),
                        "Revoke verification"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      onClick: () => setVerified(selected, true),
                      "data-ocid": "admin_professionals.approve_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-4" }),
                        "Approve verification"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "secondary",
                      size: "sm",
                      onClick: () => pushToast({
                        title: "Profile flagged for review",
                        description: `${selected.name} will be re-checked within 24 hours.`,
                        variant: "default"
                      }),
                      "data-ocid": "admin_professionals.flag_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-4" }),
                        "Flag profile"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 4 })
      }
    )
  ] });
}
export {
  AdminProfessionals as default
};
