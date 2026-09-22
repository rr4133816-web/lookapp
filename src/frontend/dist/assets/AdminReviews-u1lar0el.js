import { l as createLucideIcon, f as useApp, r as reactExports, c as Star, b as ShieldCheck, j as jsxRuntimeExports, m as motion, e as cn, T as TableSkeleton, I as AnimatePresence, A as Avatar, B as Badge, i as CircleCheck } from "./index-Dpq2E7IO.js";
import { S as StatCard } from "./StatCard-lEGjDQVJ.js";
import { P as PageTransition, a as PageHeader } from "./PageTransition-Be_zghKv.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, c as CardContent } from "./card-DEkbNMNy.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { M as Modal } from "./modal-D-p7CZsN.js";
import { R as Rating } from "./rating-BsnzBB4p.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import { r as reviews } from "./reviews-FMWslMCP.js";
import { s as staggerContainer } from "./motion-DSc3ayC3.js";
import { S as SearchX } from "./search-x-CTqGfHE3.js";
import { T as Trash2 } from "./trash-2-CzJTn4uE.js";
import "./arrow-up-right-DCzabt5c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
];
const Flag = createLucideIcon("flag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M8 12a2 2 0 0 0 2-2V8H8", key: "1jfesj" }],
  ["path", { d: "M14 12a2 2 0 0 0 2-2V8h-2", key: "1dq9mh" }]
];
const MessageSquareQuote = createLucideIcon("message-square-quote", __iconNode);
const STATUS_VARIANT = {
  published: "success",
  flagged: "warning",
  removed: "destructive"
};
const STATUS_LABEL = {
  published: "Published",
  flagged: "Flagged",
  removed: "Removed"
};
const ACTION_COPY = {
  flag: {
    title: "Flag this review?",
    description: "Flagged reviews stay visible but are queued for a second moderator to inspect.",
    confirm: "Flag review",
    variant: "accent"
  },
  remove: {
    title: "Remove this review?",
    description: "Removing hides the review from the professional's public profile. This can be reversed from the removed tab.",
    confirm: "Remove review",
    variant: "destructive"
  },
  approve: {
    title: "Approve this review?",
    description: "Approving publishes the review and clears any flag raised against it.",
    confirm: "Approve review",
    variant: "primary"
  }
};
const FILTERS = [
  { value: "all", label: "All" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars & below" }
];
function formatDate(value) {
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function AdminReviews() {
  const { pushToast } = useApp();
  const [entries, setEntries] = reactExports.useState(
    () => reviews.map((review, index) => ({
      review,
      status: index % 11 === 5 ? "flagged" : "published"
    }))
  );
  const [tab, setTab] = reactExports.useState("all");
  const [ratingFilter, setRatingFilter] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [pending, setPending] = reactExports.useState(null);
  const [isLoading] = reactExports.useState(false);
  const counts = reactExports.useMemo(() => {
    const published = entries.filter(
      (entry) => entry.status === "published"
    ).length;
    const flagged = entries.filter(
      (entry) => entry.status === "flagged"
    ).length;
    const removed = entries.filter(
      (entry) => entry.status === "removed"
    ).length;
    const average = entries.length === 0 ? 0 : entries.reduce((sum, entry) => sum + entry.review.rating, 0) / entries.length;
    return { published, flagged, removed, average };
  }, [entries]);
  const visible = reactExports.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (tab !== "all" && entry.status !== tab) return false;
      if (ratingFilter === "5" && entry.review.rating !== 5) return false;
      if (ratingFilter === "4" && entry.review.rating !== 4) return false;
      if (ratingFilter === "3" && entry.review.rating > 3) return false;
      if (!needle) return true;
      const professional = getProfessional(entry.review.professionalId);
      return [
        entry.review.authorName,
        entry.review.serviceName,
        entry.review.comment,
        (professional == null ? void 0 : professional.name) ?? ""
      ].join(" ").toLowerCase().includes(needle);
    });
  }, [entries, tab, ratingFilter, query]);
  const applyAction = (entry, action) => {
    const nextStatus = action === "flag" ? "flagged" : action === "remove" ? "removed" : "published";
    setEntries(
      (current) => current.map(
        (item) => item.review.id === entry.review.id ? { ...item, status: nextStatus } : item
      )
    );
    pushToast({
      variant: action === "remove" ? "error" : "success",
      title: action === "flag" ? "Review flagged" : action === "remove" ? "Review removed" : "Review approved",
      description: `${entry.review.authorName}'s review is now ${STATUS_LABEL[nextStatus].toLowerCase()}.`
    });
  };
  const confirmPending = () => {
    if (!pending) return;
    applyAction(pending.entry, pending.action);
    setPending(null);
  };
  const tabs = [
    { value: "all", label: "All reviews", count: entries.length },
    { value: "published", label: "Published", count: counts.published },
    { value: "flagged", label: "Flagged", count: counts.flagged },
    { value: "removed", label: "Removed", count: counts.removed }
  ];
  const stats = [
    {
      label: "Total reviews",
      value: entries.length.toString(),
      icon: MessageSquareQuote,
      hint: "Across every category",
      tone: "primary"
    },
    {
      label: "Average rating",
      value: counts.average.toFixed(2),
      icon: Star,
      hint: "Weighted across all reviews",
      tone: "accent"
    },
    {
      label: "Flagged",
      value: counts.flagged.toString(),
      icon: Flag,
      hint: "Awaiting a second opinion",
      tone: "warning"
    },
    {
      label: "Published",
      value: counts.published.toString(),
      icon: ShieldCheck,
      hint: "Live on professional profiles",
      tone: "success"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { className: "space-y-8", "data-ocid": "admin.reviews.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Admin console",
        title: "Reviews moderation",
        description: "Keep the marketplace trustworthy. Search, filter and act on customer reviews before they shape a professional's reputation."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-4",
        "aria-label": "Review moderation metrics",
        children: stats.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: stat.label,
            value: stat.value,
            icon: stat.icon,
            hint: stat.hint,
            tone: stat.tone,
            index
          },
          stat.label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "admin.reviews.panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs,
          {
            items: tabs,
            value: tab,
            onValueChange: (value) => setTab(value),
            className: "lg:max-w-2xl"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              value: query,
              onChange: (event) => setQuery(event.target.value),
              onClear: () => setQuery(""),
              placeholder: "Search reviewer, service or professional",
              "aria-label": "Search reviews",
              containerClassName: "sm:w-72",
              "data-ocid": "admin.reviews.search_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 rounded-full border border-border/60 bg-muted/60 p-1", children: FILTERS.map((filter) => {
            const active = ratingFilter === filter.value;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-pressed": active,
                onClick: () => setRatingFilter(filter.value),
                "data-ocid": `admin.reviews.rating_filter.${filter.value}`,
                className: cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-smooth",
                  active ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                ),
                children: filter.label
              },
              filter.value
            );
          }) })
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 6 }) : visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: SearchX,
          title: "No reviews match these filters",
          description: "Try a different status tab, clear the rating filter, or search for another reviewer or service.",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => {
                setTab("all");
                setRatingFilter("all");
                setQuery("");
              },
              "data-ocid": "admin.reviews.reset_button",
              children: "Reset filters"
            }
          )
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden overflow-hidden rounded-[var(--radius)] border border-border/60 lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-muted/70 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-3 font-semibold", children: "Reviewer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-3 font-semibold", children: "Professional" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-3 font-semibold", children: "Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-3 font-semibold", children: "Review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-3 font-semibold", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                scope: "col",
                className: "px-4 py-3 text-right font-semibold",
                children: "Actions"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: visible.map((entry, index) => {
            const professional = getProfessional(
              entry.review.professionalId
            );
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.tr,
              {
                layout: true,
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "border-t border-border/60 align-top transition-smooth hover:bg-muted/40",
                "data-ocid": `admin.reviews.row.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Avatar,
                      {
                        src: entry.review.authorAvatar,
                        name: entry.review.authorName,
                        size: "sm"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: entry.review.authorName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-xs text-muted-foreground", children: formatDate(entry.review.date) })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: (professional == null ? void 0 : professional.name) ?? "Unknown professional" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: entry.review.serviceName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Rating,
                    {
                      value: entry.review.rating,
                      showValue: false,
                      size: "sm"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-xs px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-muted-foreground", children: entry.review.comment }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[entry.status], children: STATUS_LABEL[entry.status] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon-sm",
                        "aria-label": `Approve review by ${entry.review.authorName}`,
                        disabled: entry.status === "published",
                        onClick: () => setPending({ entry, action: "approve" }),
                        "data-ocid": `admin.reviews.approve_button.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon-sm",
                        "aria-label": `Flag review by ${entry.review.authorName}`,
                        disabled: entry.status === "flagged",
                        onClick: () => setPending({ entry, action: "flag" }),
                        "data-ocid": `admin.reviews.flag_button.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon-sm",
                        "aria-label": `Remove review by ${entry.review.authorName}`,
                        disabled: entry.status === "removed",
                        onClick: () => setPending({ entry, action: "remove" }),
                        className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                        "data-ocid": `admin.reviews.remove_button.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {})
                      }
                    )
                  ] }) })
                ]
              },
              entry.review.id
            );
          }) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: visible.map((entry, index) => {
          const professional = getProfessional(
            entry.review.professionalId
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.li,
            {
              layout: true,
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              className: "rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-xs",
              "data-ocid": `admin.reviews.item.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Avatar,
                      {
                        src: entry.review.authorAvatar,
                        name: entry.review.authorName,
                        size: "sm"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: entry.review.authorName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: (professional == null ? void 0 : professional.name) ?? "Unknown professional" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[entry.status], children: STATUS_LABEL[entry.status] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Rating,
                    {
                      value: entry.review.rating,
                      showValue: false,
                      size: "sm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: formatDate(entry.review.date) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: entry.review.comment }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "secondary",
                      size: "sm",
                      disabled: entry.status === "published",
                      onClick: () => setPending({ entry, action: "approve" }),
                      "data-ocid": `admin.reviews.approve_button.${index + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, {}),
                        "Approve"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "secondary",
                      size: "sm",
                      disabled: entry.status === "flagged",
                      onClick: () => setPending({ entry, action: "flag" }),
                      "data-ocid": `admin.reviews.flag_button.${index + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, {}),
                        "Flag"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      disabled: entry.status === "removed",
                      onClick: () => setPending({ entry, action: "remove" }),
                      className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                      "data-ocid": `admin.reviews.remove_button.${index + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {}),
                        "Remove"
                      ]
                    }
                  )
                ] })
              ]
            },
            entry.review.id
          );
        }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: pending !== null,
        onClose: () => setPending(null),
        title: pending ? ACTION_COPY[pending.action].title : "",
        description: pending ? ACTION_COPY[pending.action].description : void 0,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "secondary",
              onClick: () => setPending(null),
              "data-ocid": "admin.reviews.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: pending ? ACTION_COPY[pending.action].variant : "primary",
              onClick: confirmPending,
              "data-ocid": "admin.reviews.confirm_button",
              children: pending ? ACTION_COPY[pending.action].confirm : "Confirm"
            }
          )
        ] }),
        children: pending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-border/60 bg-muted/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Avatar,
              {
                src: pending.entry.review.authorAvatar,
                name: pending.entry.review.authorName,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: pending.entry.review.authorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                pending.entry.review.serviceName,
                " ·",
                " ",
                formatDate(pending.entry.review.date)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: pending.entry.review.comment })
        ] }) : null
      }
    )
  ] });
}
export {
  AdminReviews as default
};
