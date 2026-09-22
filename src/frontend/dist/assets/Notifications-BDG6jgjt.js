import { l as createLucideIcon, f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, q as Settings, c as Star, d as CreditCard, M as MessageSquare, C as CalendarCheck, e as cn, B as Badge, s as Bell, L as Link } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode);
const KIND_META = {
  booking: {
    icon: CalendarCheck,
    tone: "bg-primary-soft text-primary",
    label: "Booking"
  },
  message: {
    icon: MessageSquare,
    tone: "bg-accent-soft text-accent",
    label: "Message"
  },
  payment: {
    icon: CreditCard,
    tone: "bg-success/12 text-success",
    label: "Payment"
  },
  review: {
    icon: Star,
    tone: "bg-warning/15 text-warning-foreground dark:text-warning",
    label: "Review"
  },
  system: {
    icon: Settings,
    tone: "bg-muted text-muted-foreground",
    label: "System"
  }
};
function relativeTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / 36e5);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function Notifications() {
  const {
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();
  const [tab, setTab] = reactExports.useState("all");
  const filtered = reactExports.useMemo(
    () => notifications.filter(
      (notification) => tab === "all" ? true : tab === "unread" ? !notification.read : notification.kind === tab
    ),
    [notifications, tab]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Booking updates, replies, payments and review requests in one feed." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "secondary",
          onClick: markAllNotificationsRead,
          disabled: unreadNotificationCount === 0,
          "data-ocid": "notifications.mark_all_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "size-4" }),
            "Mark all as read"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        items: [
          { value: "all", label: "All", count: notifications.length },
          { value: "unread", label: "Unread", count: unreadNotificationCount },
          { value: "booking", label: "Bookings" },
          { value: "message", label: "Messages" },
          { value: "payment", label: "Payments" }
        ],
        value: tab,
        onValueChange: setTab
      }
    ),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: BellOff,
        title: "Nothing to catch up on",
        description: "You are all caught up. New activity will appear here as it happens."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.ul,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "space-y-3",
        children: filtered.map((notification, index) => {
          const meta = KIND_META[notification.kind];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.li,
            {
              variants: staggerItem,
              className: cn(
                "flex items-start gap-4 rounded-[var(--radius)] border p-4 shadow-elevated transition-smooth",
                notification.read ? "border-border/60 bg-card" : "border-primary/30 bg-primary-soft/40"
              ),
              "data-ocid": `notifications.item.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl",
                      meta.tone
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(meta.icon, { className: "size-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: notification.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neutral", children: meta.label }),
                    !notification.read ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "size-2 rounded-full bg-accent",
                        "aria-label": "Unread"
                      }
                    ) : null
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-muted-foreground", children: notification.body }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 font-mono text-xs text-muted-foreground", children: relativeTime(notification.timestamp) })
                ] }),
                !notification.read ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => markNotificationRead(notification.id),
                    "data-ocid": `notifications.mark_read_button.${index + 1}`,
                    children: "Mark read"
                  }
                ) : null
              ]
            },
            notification.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-[var(--radius)] border border-border/60 bg-muted/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-4 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-relaxed text-muted-foreground", children: [
        "Notification preferences can be adjusted in",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/app/settings",
            className: "font-medium text-primary hover:underline",
            children: "settings"
          }
        ),
        "."
      ] })
    ] })
  ] });
}
export {
  Notifications as default
};
