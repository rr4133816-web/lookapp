import { f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, y as CalendarClock, e as cn, B as Badge } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-DEkbNMNy.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { S as Save } from "./save-DSPJupqj.js";
import { C as Check } from "./check-CeudopQg.js";
import { C as Clock } from "./clock-m4hju-8B.js";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"
];
const INITIAL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const INITIAL_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
function ProAvailability() {
  const { pushToast } = useApp();
  const [activeDays, setActiveDays] = reactExports.useState(INITIAL_DAYS);
  const [activeSlots, setActiveSlots] = reactExports.useState(INITIAL_SLOTS);
  const [buffer, setBuffer] = reactExports.useState("30");
  const [leadTime, setLeadTime] = reactExports.useState("24");
  const toggleDay = (day) => {
    setActiveDays(
      (current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day]
    );
  };
  const toggleSlot = (slot) => {
    setActiveSlots(
      (current) => current.includes(slot) ? current.filter((item) => item !== slot) : [...current, slot]
    );
  };
  const weeklyHours = activeDays.length * activeSlots.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Availability" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "When you work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Customers can only book inside the windows you open here." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => pushToast({
            title: "Availability saved",
            description: `${weeklyHours} bookable slots per week.`,
            variant: "success"
          }),
          "data-ocid": "pro_availability.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
            "Save availability"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-4 sm:grid-cols-3",
        children: [
          {
            label: "Working days",
            value: `${activeDays.length}`,
            hint: "per week"
          },
          {
            label: "Daily slots",
            value: `${activeSlots.length}`,
            hint: "bookable hours"
          },
          {
            label: "Weekly capacity",
            value: `${weeklyHours}`,
            hint: "sessions available"
          }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-2xl font-semibold", children: item.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: item.hint })
        ] }) }) }, item.label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "size-4 text-primary" }),
        "Working days"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: DAYS.map((day) => {
        const isActive = activeDays.includes(day);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": isActive,
            onClick: () => toggleDay(day),
            "data-ocid": `pro_availability.day_${day.toLowerCase()}_button`,
            className: cn(
              "inline-flex h-11 min-w-[64px] items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-smooth",
              isActive ? "border-primary bg-primary text-primary-foreground shadow-primary-glow" : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            ),
            children: [
              isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) : null,
              day
            ]
          },
          day
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-4 text-primary" }),
        "Bookable time slots"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6", children: SLOTS.map((slot) => {
          const isActive = activeSlots.includes(slot);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-pressed": isActive,
              onClick: () => toggleSlot(slot),
              "data-ocid": `pro_availability.slot_${slot.replace(":", "")}_button`,
              className: cn(
                "inline-flex h-11 items-center justify-center rounded-lg border font-mono text-xs transition-smooth",
                isActive ? "border-accent bg-accent-soft text-accent" : "border-border/60 bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground"
              ),
              children: slot
            },
            slot
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs leading-relaxed text-muted-foreground", children: "Slots are shown in your local time zone. Customers see them converted to theirs." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Booking rules" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "buffer-time",
                className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                children: "Buffer between sessions"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "buffer-time",
                value: buffer,
                onChange: (event) => setBuffer(event.target.value),
                "data-ocid": "pro_availability.buffer_select",
                className: "h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "No buffer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "15", children: "15 minutes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "30 minutes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60", children: "1 hour" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "lead-time",
                className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                children: "Minimum notice"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "lead-time",
                value: leadTime,
                onChange: (event) => setLeadTime(event.target.value),
                "data-ocid": "pro_availability.lead_select",
                className: "h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "2 hours" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "12", children: "12 hours" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "24", children: "24 hours" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "48", children: "48 hours" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "This week at a glance" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2.5", children: DAYS.map((day) => {
          const isActive = activeDays.includes(day);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-4 rounded-lg bg-muted/50 px-3.5 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: day }),
                isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", children: [
                  activeSlots.length,
                  " slots open"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neutral", children: "Unavailable" })
              ]
            },
            day
          );
        }) })
      ] })
    ] })
  ] });
}
export {
  ProAvailability as default
};
