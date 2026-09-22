import { l as createLucideIcon, f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, W as Wallet, e as cn, B as Badge } from "./index-Dpq2E7IO.js";
import { S as StatCard, A as ArrowDownRight } from "./StatCard-lEGjDQVJ.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { g as getTransactionsForProfessional } from "./transactions-CyvY5dO5.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { D as DollarSign } from "./dollar-sign-CT6YfWrz.js";
import { A as ArrowUpRight } from "./arrow-up-right-DCzabt5c.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, b as Cell } from "./BarChart-BvU7Xiv0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
const PRO_ID = "p-01";
const MONTHLY = [
  { month: "Apr", net: 1180 },
  { month: "May", net: 1420 },
  { month: "Jun", net: 980 },
  { month: "Jul", net: 1640 },
  { month: "Aug", net: 1310 },
  { month: "Sep", net: 1876 }
];
const STATUS_VARIANT = {
  paid: "success",
  pending: "primary",
  refunded: "neutral",
  failed: "destructive"
};
function ProEarnings() {
  const { pushToast } = useApp();
  const [tab, setTab] = reactExports.useState("all");
  const transactions = reactExports.useMemo(
    () => getTransactionsForProfessional(PRO_ID),
    []
  );
  const filtered = reactExports.useMemo(
    () => transactions.filter(
      (transaction) => tab === "all" ? true : transaction.status === tab
    ),
    [transactions, tab]
  );
  const paid = transactions.filter(
    (transaction) => transaction.status === "paid"
  );
  const gross = paid.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const net = paid.reduce((total, transaction) => total + transaction.net, 0);
  const fees = paid.reduce((total, transaction) => total + transaction.fee, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Earnings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Your income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Every completed session, its fee and what lands in your account." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "secondary",
          onClick: () => pushToast({
            title: "Statement exported",
            description: "A CSV of this period has been prepared.",
            variant: "success"
          }),
          "data-ocid": "pro_earnings.export_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
            "Export statement"
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
              label: "Gross billed",
              value: `$${gross.toLocaleString()}`,
              icon: DollarSign,
              trend: 14,
              hint: "Last 30 days",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Net earnings",
              value: `$${net.toLocaleString()}`,
              icon: Wallet,
              trend: 12,
              hint: "After platform fees",
              tone: "success",
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Platform fees",
              value: `$${fees.toLocaleString()}`,
              icon: ArrowDownRight,
              hint: "10% of gross",
              tone: "warning",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Next payout",
              value: "$1,284",
              icon: ArrowUpRight,
              hint: "Friday, 26 September",
              tone: "accent",
              index: 3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Net earnings by month" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: MONTHLY,
          margin: { top: 8, right: 8, left: -16, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                vertical: false,
                stroke: "oklch(var(--border))"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "month",
                tickLine: false,
                axisLine: false,
                tick: {
                  fill: "oklch(var(--muted-foreground))",
                  fontSize: 12
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tickLine: false,
                axisLine: false,
                tick: {
                  fill: "oklch(var(--muted-foreground))",
                  fontSize: 12
                },
                tickFormatter: (value) => `$${value}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                cursor: { fill: "oklch(var(--muted) / 0.5)" },
                contentStyle: {
                  background: "oklch(var(--popover))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "oklch(var(--popover-foreground))"
                },
                formatter: (value) => [`$${value}`, "Net"]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "net", radius: [8, 8, 0, 0], children: MONTHLY.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Cell,
              {
                fill: index === MONTHLY.length - 1 ? "oklch(var(--accent))" : "oklch(var(--primary))"
              },
              entry.month
            )) })
          ]
        }
      ) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          items: [
            { value: "all", label: "All", count: transactions.length },
            {
              value: "paid",
              label: "Paid",
              count: transactions.filter((t) => t.status === "paid").length
            },
            {
              value: "pending",
              label: "Pending",
              count: transactions.filter((t) => t.status === "pending").length
            },
            {
              value: "refunded",
              label: "Refunded",
              count: transactions.filter((t) => t.status === "refunded").length
            }
          ],
          value: tab,
          onValueChange: setTab
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[720px] text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-left", children: [
          "Reference",
          "Client",
          "Date",
          "Gross",
          "Fee",
          "Net",
          "Status"
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
          heading
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((transaction, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            variants: staggerItem,
            initial: "hidden",
            animate: "visible",
            className: "border-t border-border/60 transition-smooth hover:bg-muted/40",
            "data-ocid": `pro_earnings.row.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: transaction.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: transaction.professionalName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: transaction.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono", children: [
                "$",
                transaction.amount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-muted-foreground", children: [
                "−$",
                transaction.fee
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono font-semibold", children: [
                "$",
                transaction.net
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[transaction.status], children: transaction.status }) })
            ]
          },
          transaction.id
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  ProEarnings as default
};
