import { r as reactExports, j as jsxRuntimeExports, p as ChevronLeft, e as cn, o as useParams, f as useApp, L as Link, m as motion, B as Badge, A as Avatar, a as BadgeCheck, b as ShieldCheck, C as CalendarCheck } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-DEkbNMNy.js";
import { C as ChevronRight } from "./chevron-right-DcIi2rwK.js";
import { C as CalendarDays } from "./calendar-days-RrFnZuq5.js";
import { L as Label, I as Input, T as Textarea } from "./input-ndI6bRbf.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import NotFound from "./NotFound-DoqJ5km9.js";
import { A as ArrowLeft } from "./arrow-left-BCNZdNCL.js";
import { C as Check } from "./check-CeudopQg.js";
import { A as ArrowRight } from "./arrow-right-DW2zjr6j.js";
import { V as Video } from "./video-CeS3okxd.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
function toIso(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function DatePicker({
  value,
  onChange,
  label = "Select a date",
  className,
  days = 14
}) {
  const [offset, setOffset] = reactExports.useState(0);
  const options = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: days }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index + offset);
      return {
        iso: toIso(date),
        weekday: WEEKDAYS[date.getDay()],
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        full: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        })
      };
    });
  }, [days, offset]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-2.5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Show earlier dates",
            disabled: offset === 0,
            onClick: () => setOffset((current) => Math.max(0, current - 7)),
            className: "grid size-7 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground disabled:opacity-40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Show later dates",
            onClick: () => setOffset((current) => current + 7),
            className: "grid size-7 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar flex gap-2 overflow-x-auto pb-1", children: options.map((option) => {
      const isActive = option.iso === value;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "aria-pressed": isActive,
          "aria-label": option.full,
          onClick: () => onChange(option.iso),
          className: cn(
            "flex w-14 shrink-0 flex-col items-center gap-0.5 rounded-xl border px-2 py-2.5 transition-smooth",
            isActive ? "border-primary bg-primary text-primary-foreground shadow-primary-glow" : "border-border/60 bg-card text-foreground hover:border-primary/40 hover:bg-secondary"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[10px] font-semibold uppercase tracking-wider",
                  isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                ),
                children: option.weekday
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-semibold leading-none", children: option.day }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[10px]",
                  isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                ),
                children: option.month
              }
            )
          ]
        },
        option.iso
      );
    }) }),
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
      (/* @__PURE__ */ new Date(`${value}T00:00:00`)).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    ] }) : null
  ] });
}
const DEFAULT_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30"
];
function formatSlot(slot) {
  const [hours, minutes] = slot.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${`${minutes}`.padStart(2, "0")} ${suffix}`;
}
function TimePicker({
  value,
  onChange,
  slots = DEFAULT_SLOTS,
  label = "Select a time",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-2.5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-4", children: slots.map((slot) => {
      const isActive = slot === value;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "aria-pressed": isActive,
          onClick: () => onChange(slot),
          className: cn(
            "inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 font-mono text-xs transition-smooth",
            isActive ? "border-primary bg-primary text-primary-foreground shadow-primary-glow" : "border-border/60 bg-card text-foreground hover:border-primary/40 hover:bg-secondary"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
            formatSlot(slot)
          ]
        },
        slot
      );
    }) })
  ] });
}
const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Date" },
  { id: 3, label: "Time" },
  { id: 4, label: "Details" },
  { id: 5, label: "Review" },
  { id: 6, label: "Confirm" },
  { id: 7, label: "Confirmation" }
];
function formatLongDate(value) {
  if (!value) return "";
  return (/* @__PURE__ */ new Date(`${value}T00:00:00`)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
}
function BookService() {
  const { id } = useParams();
  const professional = id ? getProfessional(id) : void 0;
  const { addBooking, pushToast } = useApp();
  const [step, setStep] = reactExports.useState(1);
  const [service, setService] = reactExports.useState(null);
  const [date, setDate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState("video");
  const [address, setAddress] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [confirmedId, setConfirmedId] = reactExports.useState("");
  const total = service ? service.price : 0;
  const locationLabel = mode === "video" ? "Video call" : address.trim();
  const summaryRows = reactExports.useMemo(
    () => [
      { label: "Service", value: (service == null ? void 0 : service.name) ?? "Not selected" },
      { label: "Professional", value: (professional == null ? void 0 : professional.name) ?? "" },
      { label: "Date", value: formatLongDate(date) || "Not selected" },
      { label: "Time", value: time || "Not selected" },
      { label: "Location", value: locationLabel || "Not provided" }
    ],
    [service, professional, date, time, locationLabel]
  );
  if (!professional) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {});
  }
  const canContinue = () => {
    if (step === 1) return Boolean(service);
    if (step === 2) return Boolean(date);
    if (step === 3) return Boolean(time);
    if (step === 4) return mode === "video" || address.trim().length > 0;
    return true;
  };
  const next = () => {
    if (!canContinue()) {
      setError(
        step === 1 ? "Choose a service to continue." : step === 2 ? "Pick a date to continue." : step === 3 ? "Pick a time slot to continue." : "Enter the service address to continue."
      );
      return;
    }
    setError("");
    setStep((current) => Math.min(7, current + 1));
  };
  const back = () => {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  };
  const confirm = () => {
    if (!service) return;
    if (!canContinue()) {
      setError("Enter the service address to continue.");
      return;
    }
    setError("");
    const bookingId = `BK-${Math.floor(5e3 + Math.random() * 900)}`;
    const booking = {
      id: bookingId,
      professionalId: professional.id,
      customerName: "You",
      customerAvatar: "/assets/generated/avatar-01.dim_512x512.jpg",
      serviceName: service.name,
      date,
      time,
      durationMinutes: service.durationMinutes,
      status: "confirmed",
      price: service.price,
      location: mode === "video" ? "Video call" : address.trim(),
      notes: notes.trim() || "No additional notes provided.",
      createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    };
    addBooking(booking);
    setConfirmedId(bookingId);
    setStep(7);
    pushToast({
      title: "Booking confirmed",
      description: `${professional.name} is booked for ${service.name} on ${formatLongDate(date)}.`,
      variant: "success"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: `/app/professionals/${professional.id}`,
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
          "Back to profile"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Book a session" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: [
        "Book with ",
        professional.name
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center gap-2 overflow-x-auto pb-1", children: STEPS.map((item, index) => {
      const isDone = step > item.id;
      const isActive = step === item.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-smooth",
              isActive ? "bg-primary text-primary-foreground shadow-primary-glow" : isDone ? "bg-success/12 text-success" : "bg-muted text-muted-foreground"
            ),
            children: [
              isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: item.id }),
              item.label
            ]
          }
        ),
        index < STEPS.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-6 bg-border", "aria-hidden": "true" }) : null
      ] }, item.id);
    }) }),
    step === 7 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-xl py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        className: "rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card p-8 text-center shadow-elevated-lg",
        "data-ocid": "booking.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              initial: { scale: 0.6, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: {
                delay: 0.15,
                type: "spring",
                stiffness: 260,
                damping: 18
              },
              className: "mx-auto grid size-16 place-items-center rounded-full bg-success/12 text-success",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-8" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-display text-2xl font-bold tracking-tight", children: "Booking confirmed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: [
            "Your session for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: service == null ? void 0 : service.name }),
            " ",
            "with ",
            professional.name,
            " is confirmed. A calendar invite and the session link are on their way."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-2.5 rounded-[var(--radius)] bg-muted/50 p-5 text-left", children: [
            { label: "Booking reference", value: confirmedId },
            { label: "Service", value: (service == null ? void 0 : service.name) ?? "" },
            { label: "Professional", value: professional.name },
            { label: "Date", value: formatLongDate(date) },
            { label: "Time", value: time },
            { label: "Location", value: locationLabel }
          ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start justify-between gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: row.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[60%] text-right font-mono text-sm font-medium", children: row.value })
              ]
            },
            row.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/app/bookings",
                "data-ocid": "booking.view_bookings_button",
                className: "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5",
                children: [
                  "View my bookings",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app/discover",
                "data-ocid": "booking.book_another_button",
                className: "inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary",
                children: "Book another service"
              }
            )
          ] })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 12 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          children: [
            step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Choose a service" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: professional.services.map((item) => {
                const isActive = (service == null ? void 0 : service.id) === item.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "aria-pressed": isActive,
                    onClick: () => {
                      setService(item);
                      setError("");
                    },
                    "data-ocid": `booking.service_option.${professional.services.indexOf(item) + 1}`,
                    className: cn(
                      "flex w-full items-start justify-between gap-4 rounded-[var(--radius)] border p-5 text-left transition-smooth",
                      isActive ? "border-primary bg-primary-soft ring-2 ring-ring/25" : "border-border/60 bg-card hover:border-primary/40"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold", children: item.name }),
                          item.popular ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", children: "Popular" }) : null
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: item.description }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
                          item.durationMinutes,
                          " minutes"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 font-mono text-lg font-semibold", children: [
                        "$",
                        item.price
                      ] })
                    ]
                  },
                  item.id
                );
              }) })
            ] }) : null,
            step === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Pick a date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { value: date, onChange: setDate })
            ] }) : null,
            step === 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Pick a time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TimePicker, { value: time, onChange: setTime })
            ] }) : null,
            step === 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Session details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "How should this session happen?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2.5 sm:grid-cols-2", children: [
                  {
                    value: "video",
                    label: "Video call",
                    body: "A link is sent once confirmed.",
                    icon: Video
                  },
                  {
                    value: "in-person",
                    label: "In person",
                    body: "At an address you provide.",
                    icon: MapPin
                  }
                ].map((option) => {
                  const isActive = mode === option.value;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "aria-pressed": isActive,
                      onClick: () => setMode(option.value),
                      "data-ocid": `booking.mode_${option.value}_button`,
                      className: cn(
                        "flex flex-col gap-1.5 rounded-[var(--radius)] border p-4 text-left transition-smooth",
                        isActive ? "border-primary bg-primary-soft ring-2 ring-ring/25" : "border-border/60 bg-card hover:border-primary/40"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          option.icon,
                          {
                            className: cn(
                              "size-4.5",
                              isActive ? "text-primary" : "text-muted-foreground"
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: option.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: option.body })
                      ]
                    },
                    option.value
                  );
                }) })
              ] }),
              mode === "in-person" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-address", children: "Service address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "booking-address",
                    value: address,
                    onChange: (event) => setAddress(event.target.value),
                    placeholder: "1420 Maple Grove Ave, Columbus, OH",
                    "data-ocid": "booking.address_input"
                  }
                )
              ] }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "booking-notes", children: "Notes for the professional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "booking-notes",
                    value: notes,
                    onChange: (event) => setNotes(event.target.value),
                    placeholder: "Anything they should know or prepare before the session.",
                    "data-ocid": "booking.notes_input"
                  }
                )
              ] })
            ] }) : null,
            step === 5 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Review your booking" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Avatar,
                    {
                      src: professional.avatar,
                      name: professional.name,
                      size: "md"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: professional.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: professional.profession })
                  ] }),
                  professional.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", className: "ml-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" }),
                    "Verified"
                  ] }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 border-t border-border/60 pt-4", children: [
                  { label: "Service", value: (service == null ? void 0 : service.name) ?? "" },
                  { label: "Date", value: formatLongDate(date) },
                  { label: "Time", value: time },
                  {
                    label: "Format",
                    value: mode === "video" ? "Video call" : address
                  },
                  {
                    label: "Duration",
                    value: `${(service == null ? void 0 : service.durationMinutes) ?? 0} minutes`
                  }
                ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start justify-between gap-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[60%] text-right text-sm font-medium", children: row.value })
                    ]
                  },
                  row.label
                )) }),
                notes.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-3.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Your notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed", children: notes })
                ] }) : null
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-[var(--radius)] border border-accent/30 bg-accent-soft p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 size-4.5 shrink-0 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-foreground", children: "Free cancellation up to 24 hours before the session. Your booking is confirmed the moment you place it." })
              ] })
            ] }) : null,
            step === 6 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Review & confirm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Check the details below, then confirm your booking." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Avatar,
                    {
                      src: professional.avatar,
                      name: professional.name,
                      size: "md"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: professional.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: professional.profession })
                  ] }),
                  professional.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", className: "ml-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" }),
                    "Verified"
                  ] }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 border-t border-border/60 pt-4", children: [
                  summaryRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start justify-between gap-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: row.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[60%] text-right text-sm font-medium", children: row.value })
                      ]
                    },
                    row.label
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 border-t border-border/60 pt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold", children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-semibold", children: [
                      "$",
                      total
                    ] })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-[var(--radius)] border border-accent/30 bg-accent-soft p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 size-4.5 shrink-0 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-foreground", children: "No payment is taken now. This booking is confirmed immediately and you can cancel free of charge up to 24 hours before the session." })
              ] })
            ] }) : null,
            error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                role: "alert",
                "data-ocid": "booking.error_state",
                className: "mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive",
                children: error
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  onClick: back,
                  disabled: step === 1,
                  "data-ocid": "booking.back_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
                    "Back"
                  ]
                }
              ),
              step < 6 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: next,
                  "data-ocid": "booking.continue_button",
                  children: [
                    "Continue",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: confirm,
                  "data-ocid": "booking.confirm_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-4" }),
                    "Confirm booking"
                  ]
                }
              )
            ] })
          ]
        },
        step
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Booking summary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[60%] text-right font-medium", children: (service == null ? void 0 : service.name) ?? "Not selected" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: service ? `${service.durationMinutes} min` : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: date || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: time || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 border-t border-border/60 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 border-t border-border/60 pt-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-semibold", children: [
              "$",
              total
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5" }),
            "No payment taken — confirmed instantly"
          ] })
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  BookService as default
};
