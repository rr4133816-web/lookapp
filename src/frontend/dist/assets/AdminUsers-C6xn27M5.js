import { l as createLucideIcon, f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, U as Users, b as ShieldCheck, A as Avatar, B as Badge, p as ChevronLeft, D as Drawer, i as CircleCheck, T as TableSkeleton, e as cn } from "./index-Dpq2E7IO.js";
import { S as StatCard } from "./StatCard-lEGjDQVJ.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, c as CardContent } from "./card-DEkbNMNy.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { a as adminUsers } from "./admin-CMLMmJb-.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { M as Mail } from "./mail-DIoUC0NZ.js";
import { C as CalendarDays } from "./calendar-days-RrFnZuq5.js";
import { R as RotateCcw } from "./rotate-ccw-Dz415nOQ.js";
import { C as ChevronRight } from "./chevron-right-DcIi2rwK.js";
import { A as ArrowUpDown } from "./arrow-up-down-o9n8Rq9h.js";
import "./arrow-up-right-DCzabt5c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
const UserRound = createLucideIcon("user-round", __iconNode);
const PAGE_SIZE = 8;
const ROLE_LABEL = {
  customer: "Customer",
  professional: "Professional",
  admin: "Admin"
};
const ROLE_VARIANT = {
  customer: "neutral",
  professional: "primary",
  admin: "accent"
};
const STATUS_VARIANT = {
  active: "success",
  pending: "warning",
  suspended: "destructive"
};
const STATUS_LABEL = {
  active: "Active",
  pending: "Pending",
  suspended: "Suspended"
};
function formatDate(value) {
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
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
function AdminUsers() {
  const { pushToast } = useApp();
  const [query, setQuery] = reactExports.useState("");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [sortKey, setSortKey] = reactExports.useState("joinedAt");
  const [sortDirection, setSortDirection] = reactExports.useState("desc");
  const [page, setPage] = reactExports.useState(1);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [statusOverrides, setStatusOverrides] = reactExports.useState({});
  const users = reactExports.useMemo(
    () => adminUsers.map(
      (user) => statusOverrides[user.id] ? { ...user, status: statusOverrides[user.id] } : user
    ),
    [statusOverrides]
  );
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    const rows = users.filter((user) => {
      const matchesTerm = !term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term) || user.id.toLowerCase().includes(term);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesTerm && matchesRole && matchesStatus;
    });
    const sorted = [...rows].sort((a, b) => {
      if (sortKey === "bookings") return a.bookings - b.bookings;
      if (sortKey === "name") return a.name.localeCompare(b.name);
      return a.joinedAt.localeCompare(b.joinedAt);
    });
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [users, query, roleFilter, statusFilter, sortKey, sortDirection]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const selected = reactExports.useMemo(
    () => users.find((user) => user.id === selectedId) ?? null,
    [users, selectedId]
  );
  const stats = reactExports.useMemo(
    () => ({
      total: users.length,
      professionals: users.filter((user) => user.role === "professional").length,
      suspended: users.filter((user) => user.status === "suspended").length,
      pending: users.filter((user) => user.status === "pending").length
    }),
    [users]
  );
  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
    setPage(1);
  };
  const setStatus = (user, status) => {
    setStatusOverrides((current) => ({ ...current, [user.id]: status }));
    pushToast({
      title: status === "suspended" ? `${user.name} suspended` : status === "active" ? `${user.name} reinstated` : `${user.name} marked pending`,
      description: status === "suspended" ? "Their listings are hidden and new bookings are blocked." : "The change is visible across the marketplace immediately.",
      variant: status === "suspended" ? "error" : "success"
    });
  };
  const resetFilters = () => {
    setQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
    setPage(1);
  };
  const hasFilters = query.trim().length > 0 || roleFilter !== "all" || statusFilter !== "all";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin_users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Admin console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Every account on LookApp — customers, professionals and staff. Search, filter and open a profile to review activity or change access." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "secondary",
          onClick: () => pushToast({
            title: "Invite link copied",
            description: "Share it with a teammate to grant console access.",
            variant: "success"
          }),
          "data-ocid": "admin_users.invite_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
            "Invite user"
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
              label: "Total accounts",
              value: stats.total.toLocaleString(),
              icon: Users,
              trend: 6,
              hint: "Across all roles",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Professionals",
              value: stats.professionals.toLocaleString(),
              icon: ShieldCheck,
              trend: 4,
              hint: "Verified and pending",
              tone: "accent",
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Pending review",
              value: stats.pending.toLocaleString(),
              icon: CalendarDays,
              hint: "Awaiting onboarding",
              tone: "warning",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Suspended",
              value: stats.suspended.toLocaleString(),
              icon: Ban,
              trend: -2,
              hint: "Access currently blocked",
              tone: "success",
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
            placeholder: "Search by name, email or account ID",
            "aria-label": "Search users",
            containerClassName: "w-full lg:max-w-md",
            "data-ocid": "admin_users.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "admin-users-role", children: "Filter by role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-users-role",
              value: roleFilter,
              onChange: (event) => {
                setRoleFilter(event.target.value);
                setPage(1);
              },
              "data-ocid": "admin_users.role_select",
              className: "h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All roles" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "customer", children: "Customers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "professional", children: "Professionals" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admins" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "admin-users-status", children: "Filter by status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-users-status",
              value: statusFilter,
              onChange: (event) => {
                setStatusFilter(
                  event.target.value
                );
                setPage(1);
              },
              "data-ocid": "admin_users.status_select",
              className: "h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All statuses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suspended", children: "Suspended" })
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
              "data-ocid": "admin_users.reset_button",
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
            { value: "all", label: "All", count: users.length },
            {
              value: "customer",
              label: "Customers",
              count: users.filter((user) => user.role === "customer").length
            },
            {
              value: "professional",
              label: "Professionals",
              count: users.filter((user) => user.role === "professional").length
            },
            {
              value: "admin",
              label: "Admins",
              count: users.filter((user) => user.role === "admin").length
            }
          ],
          value: roleFilter,
          onValueChange: (value) => {
            setRoleFilter(value);
            setPage(1);
          },
          listClassName: "max-w-2xl"
        }
      ),
      pageRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: Users,
          title: "No accounts match these filters",
          description: "Try a different role or status, or clear the search to see every account again.",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: resetFilters,
              "data-ocid": "admin_users.empty_reset_button",
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
            "data-ocid": "admin_users.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-muted/70 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortHeader,
                  {
                    label: "Account",
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
                    children: "Role"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    scope: "col",
                    className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                    children: "Status"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortHeader,
                  {
                    label: "Joined",
                    sortKey: "joinedAt",
                    activeKey: sortKey,
                    direction: sortDirection,
                    onSort: handleSort
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortHeader,
                  {
                    label: "Bookings",
                    sortKey: "bookings",
                    activeKey: sortKey,
                    direction: sortDirection,
                    onSort: handleSort,
                    align: "right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Actions" }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pageRows.map((user, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.tr,
                {
                  variants: staggerItem,
                  initial: "hidden",
                  animate: "visible",
                  className: "border-b border-border/40 transition-smooth last:border-0 hover:bg-muted/40",
                  "data-ocid": `admin_users.row.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Avatar,
                        {
                          src: user.avatar,
                          name: user.name,
                          size: "sm"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium text-foreground", children: user.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: user.email })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: ROLE_VARIANT[user.role], children: ROLE_LABEL[user.role] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[user.status], children: STATUS_LABEL[user.status] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: formatDate(user.joinedAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-sm", children: user.bookings.toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: () => setSelectedId(user.id),
                        "data-ocid": `admin_users.view_button.${index + 1}`,
                        children: "View"
                      }
                    ) })
                  ]
                },
                user.id
              )) })
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
            "data-ocid": "admin_users.list",
            children: pageRows.map((user, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.li,
              {
                variants: staggerItem,
                className: "rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-elevated",
                "data-ocid": `admin_users.item.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: user.avatar, name: user.name, size: "md" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: user.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: user.email }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: ROLE_VARIANT[user.role], children: ROLE_LABEL[user.role] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[user.status], children: STATUS_LABEL[user.status] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-3 grid grid-cols-2 gap-3 border-t border-border/40 pt-3 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Joined" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-mono", children: formatDate(user.joinedAt) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Bookings" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-mono", children: user.bookings.toLocaleString() })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "secondary",
                      size: "sm",
                      className: "mt-3 w-full",
                      onClick: () => setSelectedId(user.id),
                      "data-ocid": `admin_users.view_button.${index + 1}`,
                      children: "View profile"
                    }
                  )
                ]
              },
              user.id
            ))
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
            "accounts"
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
                "data-ocid": "admin_users.pagination_prev",
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
                "data-ocid": "admin_users.pagination_next",
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
        title: (selected == null ? void 0 : selected.name) ?? "Account",
        description: selected ? ROLE_LABEL[selected.role] : void 0,
        className: "max-w-md",
        children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin_users.detail_panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: selected.avatar, name: selected.name, size: "xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-lg font-semibold", children: selected.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-muted-foreground", children: selected.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: ROLE_VARIANT[selected.role], children: ROLE_LABEL[selected.role] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[selected.status], children: STATUS_LABEL[selected.status] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Account ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-mono text-sm", children: selected.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Joined" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-mono text-sm", children: formatDate(selected.joinedAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Bookings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-mono text-sm", children: selected.bookings.toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Lifetime value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "mt-1 font-mono text-sm", children: [
                "$",
                (selected.bookings * 96).toLocaleString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Recent activity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: [
              {
                icon: CalendarDays,
                title: "Booked a session",
                detail: "Confirmed for next Tuesday at 10:00",
                when: "2 days ago"
              },
              {
                icon: CircleCheck,
                title: "Completed a session",
                detail: "Left a five-star review for the professional",
                when: "1 week ago"
              },
              {
                icon: UserRound,
                title: "Updated profile details",
                detail: "Changed contact email and timezone",
                when: "3 weeks ago"
              }
            ].map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(entry.icon, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: entry.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: entry.detail }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-[11px] text-muted-foreground", children: entry.when })
              ] })
            ] }, entry.title)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Account actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: () => pushToast({
                    title: "Password reset sent",
                    description: `A reset link was emailed to ${selected.email}.`,
                    variant: "success"
                  }),
                  "data-ocid": "admin_users.reset_password_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
                    "Send reset link"
                  ]
                }
              ),
              selected.status === "suspended" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: () => setStatus(selected, "active"),
                  "data-ocid": "admin_users.reinstate_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
                    "Reinstate account"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  onClick: () => setStatus(selected, "suspended"),
                  "data-ocid": "admin_users.suspend_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "size-4" }),
                    "Suspend account"
                  ]
                }
              )
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 4 })
      }
    )
  ] });
}
export {
  AdminUsers as default
};
