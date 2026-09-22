import { l as createLucideIcon, f as useApp, r as reactExports, j as jsxRuntimeExports, e as cn, m as motion, B as Badge, D as Drawer, M as MessageSquare, i as CircleCheck } from "./index-Dpq2E7IO.js";
import { P as PageTransition, a as PageHeader } from "./PageTransition-Be_zghKv.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { M as Modal } from "./modal-D-p7CZsN.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { d as disputes } from "./admin-CMLMmJb-.js";
import { a as staggerItem } from "./motion-DSc3ayC3.js";
import { S as ShieldAlert } from "./shield-alert-4JvmpJY8.js";
import { F as FileText } from "./file-text-CyPRTlyH.js";
import { A as ArrowUpRight } from "./arrow-up-right-DCzabt5c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8", key: "15492f" }],
  ["path", { d: "m16 16 6-6", key: "vzrcl6" }],
  ["path", { d: "m8 8 6-6", key: "18bi4p" }],
  ["path", { d: "m9 7 8 8", key: "5jnvq1" }],
  ["path", { d: "m21 11-8-8", key: "z4y7zo" }]
];
const Gavel = createLucideIcon("gavel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const STATUS_VARIANT = {
  open: "warning",
  "under-review": "primary",
  resolved: "success"
};
const PRIORITY_VARIANT = {
  high: "destructive",
  medium: "warning",
  low: "neutral"
};
const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "under-review", label: "Under review" },
  { value: "resolved", label: "Resolved" }
];
const PRIORITY_TABS = [
  { value: "all", label: "Any priority" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" }
];
function priorityOf(dispute) {
  if (dispute.status === "resolved") return "low";
  if (dispute.amount >= 300) return "high";
  if (dispute.amount >= 100) return "medium";
  return "low";
}
function formatDate(value) {
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatLongDate(value) {
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
function AdminDisputes() {
  const { pushToast } = useApp();
  const [disputes$1, setDisputes] = reactExports.useState(disputes);
  const [tab, setTab] = reactExports.useState("all");
  const [priority, setPriority] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [pendingAction, setPendingAction] = reactExports.useState(null);
  const counts = reactExports.useMemo(() => {
    const base = { all: disputes$1.length };
    for (const status of [
      "open",
      "under-review",
      "resolved"
    ]) {
      base[status] = disputes$1.filter(
        (dispute) => dispute.status === status
      ).length;
    }
    return base;
  }, [disputes$1]);
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    return disputes$1.filter((dispute) => {
      const matchesTab = tab === "all" || dispute.status === tab;
      const matchesPriority = priority === "all" || priorityOf(dispute) === priority;
      const matchesTerm = !term || dispute.id.toLowerCase().includes(term) || dispute.bookingId.toLowerCase().includes(term) || dispute.raisedBy.toLowerCase().includes(term) || dispute.against.toLowerCase().includes(term) || dispute.reason.toLowerCase().includes(term);
      return matchesTab && matchesPriority && matchesTerm;
    });
  }, [disputes$1, tab, priority, query]);
  const confirmAction = () => {
    if (!pendingAction) return;
    const { dispute, resolution } = pendingAction;
    setDisputes(
      (current) => current.map(
        (item) => item.id === dispute.id ? {
          ...item,
          status: resolution === "resolve" ? "resolved" : "under-review"
        } : item
      )
    );
    pushToast({
      title: resolution === "resolve" ? "Dispute resolved" : "Dispute escalated",
      description: resolution === "resolve" ? `${dispute.id} closed and both parties notified.` : `${dispute.id} moved to the senior review queue.`,
      variant: resolution === "resolve" ? "success" : "default"
    });
    setSelected(null);
    setPendingAction(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Trust & Safety",
        title: "Disputes",
        description: "Investigate payment and service disputes, review the evidence thread and record a resolution."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          value: query,
          onChange: (event) => setQuery(event.target.value),
          onClear: () => setQuery(""),
          placeholder: "Search by dispute, booking or party",
          "aria-label": "Search disputes",
          containerClassName: "w-full lg:max-w-md",
          "data-ocid": "admin_disputes.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs,
          {
            items: STATUS_TABS.map((item) => ({
              value: item.value,
              label: item.label,
              count: counts[item.value]
            })),
            value: tab,
            onValueChange: setTab,
            className: "xl:flex-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs,
          {
            items: PRIORITY_TABS,
            value: priority,
            onValueChange: setPriority,
            className: "xl:w-auto",
            listClassName: "xl:w-auto"
          }
        )
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: ShieldAlert,
        title: "No disputes match these filters",
        description: "Try another status or priority, or clear the search to see every case.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            onClick: () => {
              setTab("all");
              setPriority("all");
              setQuery("");
            },
            "data-ocid": "admin_disputes.reset_button",
            children: "Reset filters"
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[820px] text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-left", children: [
        "Dispute",
        "Booking",
        "Raised by",
        "Against",
        "Opened",
        "Amount",
        "Priority",
        "Status",
        ""
      ].map((heading) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          scope: "col",
          className: cn(
            "px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
            heading === "Amount" && "text-right"
          ),
          children: heading
        },
        heading || "actions"
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((dispute, index) => {
        const level = priorityOf(dispute);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            variants: staggerItem,
            initial: "hidden",
            animate: "visible",
            className: "border-t border-border/60 transition-smooth hover:bg-muted/40",
            "data-ocid": `admin_disputes.row.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: dispute.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: dispute.bookingId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-[150px] truncate px-4 py-3", children: dispute.raisedBy }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-[150px] truncate px-4 py-3", children: dispute.against }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: formatDate(dispute.openedAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono", children: dispute.amount > 0 ? `$${dispute.amount}` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: PRIORITY_VARIANT[level], children: level }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[dispute.status], children: dispute.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setSelected(dispute),
                  "data-ocid": `admin_disputes.open_modal_button.${index + 1}`,
                  children: "Review"
                }
              ) })
            ]
          },
          dispute.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Drawer,
      {
        open: selected !== null,
        onClose: () => setSelected(null),
        title: selected ? `Dispute ${selected.id}` : "Dispute",
        description: selected ? `Booking ${selected.bookingId}` : void 0,
        footer: selected && selected.status !== "resolved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              className: "flex-1",
              onClick: () => setPendingAction({
                dispute: selected,
                resolution: "escalate"
              }),
              "data-ocid": "admin_disputes.escalate_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" }),
                "Escalate"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "flex-1",
              onClick: () => setPendingAction({ dispute: selected, resolution: "resolve" }),
              "data-ocid": "admin_disputes.resolve_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
                "Resolve"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            className: "w-full",
            onClick: () => setSelected(null),
            "data-ocid": "admin_disputes.close_button",
            children: "Close"
          }
        ),
        children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[selected.status], children: selected.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: PRIORITY_VARIANT[priorityOf(selected)], children: [
              priorityOf(selected),
              " priority"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: formatLongDate(selected.openedAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Case summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Raised by" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate font-medium", children: selected.raisedBy })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Against" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate font-medium", children: selected.against })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Amount in dispute" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono font-semibold", children: selected.amount > 0 ? `$${selected.amount}` : "No financial impact" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Thread" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-warning/15 text-warning-foreground dark:text-warning", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 rounded-lg border border-border/60 bg-muted/40 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold", children: [
                    selected.raisedBy,
                    " opened the dispute"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-muted-foreground", children: selected.reason }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 font-mono text-[11px] text-muted-foreground", children: formatDate(selected.openedAt) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 rounded-lg border border-border/60 bg-muted/40 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold", children: [
                    selected.against,
                    " responded"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-muted-foreground", children: selected.status === "resolved" ? "Both parties agreed on the outcome and the case was closed without further action." : "Response received and attached to the case file. Awaiting a resolution decision." })
                ] })
              ] }),
              selected.status === "under-review" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "size-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 rounded-lg border border-border/60 bg-muted/40 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: "Trust & Safety review" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-muted-foreground", children: "A specialist is reviewing the payment record and the session notes before issuing a decision." })
                ] })
              ] }) : null
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Evidence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
              `Booking record ${selected.bookingId}`,
              "Payment receipt and fee breakdown",
              "Session notes and message history"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 shrink-0 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", children: item })
                ]
              },
              item
            )) })
          ] })
        ] }) : null
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: pendingAction !== null,
        onClose: () => setPendingAction(null),
        title: (pendingAction == null ? void 0 : pendingAction.resolution) === "resolve" ? "Resolve this dispute?" : "Escalate this dispute?",
        description: pendingAction ? `${pendingAction.dispute.id} · ${pendingAction.dispute.raisedBy} vs ${pendingAction.dispute.against}` : void 0,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: () => setPendingAction(null),
              "data-ocid": "admin_disputes.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: (pendingAction == null ? void 0 : pendingAction.resolution) === "resolve" ? "primary" : "accent",
              onClick: confirmAction,
              "data-ocid": "admin_disputes.confirm_button",
              children: (pendingAction == null ? void 0 : pendingAction.resolution) === "resolve" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
                "Resolve dispute"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" }),
                "Escalate dispute"
              ] })
            }
          )
        ] }),
        children: pendingAction ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: pendingAction.resolution === "resolve" ? "Resolving closes the case and notifies both parties with the recorded outcome. This cannot be undone from this screen." : "Escalating moves the case to the senior review queue and keeps it open until a specialist issues a decision." }) : null
      }
    )
  ] });
}
export {
  AdminDisputes as default
};
