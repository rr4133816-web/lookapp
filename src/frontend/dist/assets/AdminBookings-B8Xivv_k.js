import { r as reactExports, E as bookings, j as jsxRuntimeExports, e as cn, m as motion, A as Avatar, B as Badge, D as Drawer, i as CircleCheck, y as CalendarClock, g as User, W as Wallet } from "./index-Dpq2E7IO.js";
import { P as PageTransition, a as PageHeader } from "./PageTransition-Be_zghKv.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { L as Label, I as Input } from "./input-ndI6bRbf.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import { a as staggerItem } from "./motion-DSc3ayC3.js";
import { C as CalendarX } from "./calendar-x-3VEi3syt.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
const STATUS_VARIANT = {
  pending: "warning",
  confirmed: "primary",
  "in-progress": "accent",
  completed: "success",
  cancelled: "destructive"
};
const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" }
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
function AdminBookings() {
  const [tab, setTab] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [from, setFrom] = reactExports.useState("");
  const [to, setTo] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const counts = reactExports.useMemo(() => {
    const base = { all: bookings.length };
    for (const status of [
      "pending",
      "confirmed",
      "in-progress",
      "completed",
      "cancelled"
    ]) {
      base[status] = bookings.filter(
        (booking) => booking.status === status
      ).length;
    }
    return base;
  }, []);
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const professional = getProfessional(booking.professionalId);
      const matchesTab = tab === "all" || booking.status === tab;
      const matchesTerm = !term || booking.id.toLowerCase().includes(term) || booking.customerName.toLowerCase().includes(term) || booking.serviceName.toLowerCase().includes(term) || ((professional == null ? void 0 : professional.name.toLowerCase().includes(term)) ?? false);
      const matchesFrom = !from || booking.date >= from;
      const matchesTo = !to || booking.date <= to;
      return matchesTab && matchesTerm && matchesFrom && matchesTo;
    });
  }, [tab, query, from, to]);
  const selectedProfessional = selected ? getProfessional(selected.professionalId) : void 0;
  const timeline = selected ? [
    {
      label: "Requested",
      value: formatDate(selected.createdAt),
      done: true
    },
    {
      label: "Confirmed",
      value: selected.status === "pending" ? "Awaiting professional" : formatDate(selected.date),
      done: selected.status !== "pending"
    },
    {
      label: "Session",
      value: `${formatDate(selected.date)} · ${selected.time}`,
      done: ["in-progress", "completed"].includes(selected.status)
    },
    {
      label: "Completed",
      value: selected.status === "completed" ? "Session delivered" : selected.status === "cancelled" ? "Cancelled" : "Not yet",
      done: selected.status === "completed"
    }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Operations",
        title: "Bookings",
        description: "Every session across the marketplace — filter by status or date, then open a booking for the full timeline."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            value: query,
            onChange: (event) => setQuery(event.target.value),
            onClear: () => setQuery(""),
            placeholder: "Search by reference, customer, professional or service",
            "aria-label": "Search bookings",
            containerClassName: "w-full lg:max-w-md",
            "data-ocid": "admin_bookings.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bookings-from", children: "From" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bookings-from",
                type: "date",
                value: from,
                max: to || void 0,
                onChange: (event) => setFrom(event.target.value),
                className: "w-full sm:w-40",
                "data-ocid": "admin_bookings.date_from_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bookings-to", children: "To" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bookings-to",
                type: "date",
                value: to,
                min: from || void 0,
                onChange: (event) => setTo(event.target.value),
                className: "w-full sm:w-40",
                "data-ocid": "admin_bookings.date_to_input"
              }
            )
          ] }),
          from || to ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => {
                setFrom("");
                setTo("");
              },
              "data-ocid": "admin_bookings.clear_dates_button",
              children: "Clear dates"
            }
          ) : null
        ] })
      ] }),
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
        icon: CalendarX,
        title: "No bookings match these filters",
        description: "Adjust the status tab, widen the date range or clear the search to see more sessions.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            onClick: () => {
              setTab("all");
              setQuery("");
              setFrom("");
              setTo("");
            },
            "data-ocid": "admin_bookings.reset_button",
            children: "Reset filters"
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[860px] text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-left", children: [
        "Reference",
        "Customer",
        "Professional",
        "Service",
        "Schedule",
        "Amount",
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((booking, index) => {
        const professional = getProfessional(booking.professionalId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            variants: staggerItem,
            initial: "hidden",
            animate: "visible",
            className: "border-t border-border/60 transition-smooth hover:bg-muted/40",
            "data-ocid": `admin_bookings.row.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: booking.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    src: booking.customerAvatar,
                    name: booking.customerName,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: booking.customerName })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    src: professional == null ? void 0 : professional.avatar,
                    name: (professional == null ? void 0 : professional.name) ?? "Unassigned",
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: (professional == null ? void 0 : professional.name) ?? "Unassigned" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-[200px] truncate px-4 py-3", children: booking.serviceName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-mono text-xs", children: formatDate(booking.date) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-xs text-muted-foreground", children: [
                  booking.time,
                  " · ",
                  booking.durationMinutes,
                  " min"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono font-semibold", children: [
                "$",
                booking.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[booking.status], children: booking.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setSelected(booking),
                  "data-ocid": `admin_bookings.open_modal_button.${index + 1}`,
                  children: "Details"
                }
              ) })
            ]
          },
          booking.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Drawer,
      {
        open: selected !== null,
        onClose: () => setSelected(null),
        title: selected ? `Booking ${selected.id}` : "Booking",
        description: selected ? selected.serviceName : void 0,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            className: "w-full",
            onClick: () => setSelected(null),
            "data-ocid": "admin_bookings.close_button",
            children: "Close"
          }
        ),
        children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[selected.status], children: selected.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: formatDate(selected.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: timeline.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                    step.done ? "bg-success/12 text-success" : "bg-muted text-muted-foreground"
                  ),
                  children: step.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-medium", children: step.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: step.value })
              ] })
            ] }, step.label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Parties" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  src: selected.customerAvatar,
                  name: selected.customerName,
                  size: "md"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: selected.customerName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Customer" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  src: selectedProfessional == null ? void 0 : selectedProfessional.avatar,
                  name: (selectedProfessional == null ? void 0 : selectedProfessional.name) ?? "Unassigned",
                  size: "md"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: (selectedProfessional == null ? void 0 : selectedProfessional.name) ?? "Unassigned" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (selectedProfessional == null ? void 0 : selectedProfessional.profession) ?? "Professional" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Session" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "sr-only", children: "Schedule" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: formatLongDate(selected.date) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "text-xs text-muted-foreground", children: [
                    selected.time,
                    " · ",
                    selected.durationMinutes,
                    " minutes"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "sr-only", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: selected.location })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "sr-only", children: "Service" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: selected.serviceName })
                ] })
              ] })
            ] }),
            selected.notes ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-border/60 bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground", children: selected.notes }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex items-center justify-between rounded-lg border border-border/60 bg-primary-soft/60 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-medium text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-4" }),
              "Booking amount"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-semibold", children: [
              "$",
              selected.price
            ] })
          ] })
        ] }) : null
      }
    )
  ] });
}
export {
  AdminBookings as default
};
