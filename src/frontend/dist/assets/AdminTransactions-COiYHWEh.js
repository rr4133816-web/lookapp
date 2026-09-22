import { l as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, W as Wallet, d as CreditCard, e as cn, B as Badge, D as Drawer } from "./index-Dpq2E7IO.js";
import { S as StatCard, A as ArrowDownRight } from "./StatCard-lEGjDQVJ.js";
import { P as PageTransition, a as PageHeader } from "./PageTransition-Be_zghKv.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { t as transactions } from "./transactions-CyvY5dO5.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { D as DollarSign } from "./dollar-sign-CT6YfWrz.js";
import { R as RotateCcw } from "./rotate-ccw-Dz415nOQ.js";
import "./arrow-up-right-DCzabt5c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
const STATUS_VARIANT = {
  paid: "success",
  pending: "primary",
  refunded: "neutral",
  failed: "destructive"
};
const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
  { value: "failed", label: "Failed" }
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
function money(value) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  })}`;
}
function AdminTransactions() {
  const [tab, setTab] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const counts = reactExports.useMemo(() => {
    const base = { all: transactions.length };
    for (const status of [
      "paid",
      "pending",
      "refunded",
      "failed"
    ]) {
      base[status] = transactions.filter(
        (item) => item.status === status
      ).length;
    }
    return base;
  }, []);
  const totals = reactExports.useMemo(() => {
    const paid = transactions.filter((item) => item.status === "paid");
    const gross = paid.reduce((total, item) => total + item.amount, 0);
    const fees = paid.reduce((total, item) => total + item.fee, 0);
    const net = paid.reduce((total, item) => total + item.net, 0);
    const refunded = transactions.filter((item) => item.status === "refunded").reduce((total, item) => total + item.amount, 0);
    return { gross, fees, net, refunded };
  }, []);
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesTab = tab === "all" || transaction.status === tab;
      const matchesTerm = !term || transaction.id.toLowerCase().includes(term) || transaction.bookingId.toLowerCase().includes(term) || transaction.professionalName.toLowerCase().includes(term) || transaction.method.toLowerCase().includes(term);
      return matchesTab && matchesTerm;
    });
  }, [tab, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Finance",
        title: "Transactions",
        description: "Every payment captured on the marketplace, with the platform fee and net payout for each booking."
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
              label: "Gross volume",
              value: money(totals.gross),
              icon: DollarSign,
              trend: 9,
              hint: "Paid transactions",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Platform fees",
              value: money(totals.fees),
              icon: Receipt,
              hint: "10% of gross",
              tone: "warning",
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Net to professionals",
              value: money(totals.net),
              icon: Wallet,
              trend: 11,
              hint: "After fees",
              tone: "success",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Refunded",
              value: money(totals.refunded),
              icon: RotateCcw,
              hint: "Returned to customers",
              tone: "accent",
              index: 3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          value: query,
          onChange: (event) => setQuery(event.target.value),
          onClear: () => setQuery(""),
          placeholder: "Search by transaction, booking, professional or card",
          "aria-label": "Search transactions",
          containerClassName: "w-full lg:max-w-md",
          "data-ocid": "admin_transactions.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          items: STATUS_TABS.map((item) => ({
            value: item.value,
            label: item.label,
            count: counts[item.value]
          })),
          value: tab,
          onValueChange: setTab
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: CreditCard,
        title: "No transactions match these filters",
        description: "Try another status tab or clear the search to see the full ledger.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            onClick: () => {
              setTab("all");
              setQuery("");
            },
            "data-ocid": "admin_transactions.reset_button",
            children: "Reset filters"
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[820px] text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-left", children: [
        "Transaction",
        "Booking",
        "Professional",
        "Method",
        "Date",
        "Gross",
        "Fee",
        "Net",
        "Status",
        ""
      ].map((heading) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          scope: "col",
          className: cn(
            "px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
            ["Gross", "Fee", "Net"].includes(heading) && "text-right"
          ),
          children: heading
        },
        heading || "actions"
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((transaction, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.tr,
        {
          variants: staggerItem,
          initial: "hidden",
          animate: "visible",
          className: "border-t border-border/60 transition-smooth hover:bg-muted/40",
          "data-ocid": `admin_transactions.row.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: transaction.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: transaction.bookingId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-[180px] truncate px-4 py-3", children: transaction.professionalName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: transaction.method }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: formatDate(transaction.date) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono", children: money(transaction.amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-muted-foreground", children: [
              "−",
              money(transaction.fee)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold", children: money(transaction.net) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[transaction.status], children: transaction.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => setSelected(transaction),
                "data-ocid": `admin_transactions.open_modal_button.${index + 1}`,
                children: "Details"
              }
            ) })
          ]
        },
        transaction.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Drawer,
      {
        open: selected !== null,
        onClose: () => setSelected(null),
        title: selected ? `Transaction ${selected.id}` : "Transaction",
        description: selected ? `Booking ${selected.bookingId}` : void 0,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            className: "w-full",
            onClick: () => setSelected(null),
            "data-ocid": "admin_transactions.close_button",
            children: "Close"
          }
        ),
        children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[selected.status], children: selected.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: formatLongDate(selected.date) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Payment breakdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2.5 rounded-lg border border-border/60 bg-muted/40 p-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Service amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono", children: money(selected.amount) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "inline-flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "size-3.5" }),
                  "Platform fee (10%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-mono text-muted-foreground", children: [
                  "−",
                  money(selected.fee)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border/60 pt-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-medium", children: "Net to professional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-base font-semibold", children: money(selected.net) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Payment details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Professional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate font-medium", children: selected.professionalName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Booking" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-xs", children: selected.bookingId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "inline-flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-3.5" }),
                  "Method"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-xs", children: selected.method })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Captured" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-xs", children: formatDate(selected.date) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-border/60 bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground", children: selected.status === "paid" ? "Funds settled to the professional's payout account on the next payout cycle." : selected.status === "pending" ? "Authorisation held — capture completes when the session is confirmed." : selected.status === "refunded" ? "Full amount returned to the customer's original payment method." : "Payment failed at the processor. The customer was asked to retry." })
        ] }) : null
      }
    )
  ] });
}
export {
  AdminTransactions as default
};
