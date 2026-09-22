import { j as jsxRuntimeExports, m as motion, A as Avatar, B as Badge, L as Link, e as cn } from "./index-Dpq2E7IO.js";
import { a as staggerItem } from "./motion-DSc3ayC3.js";
import { C as CalendarDays } from "./calendar-days-RrFnZuq5.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { V as Video } from "./video-CeS3okxd.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
const STATUS_VARIANT = {
  pending: "neutral",
  confirmed: "primary",
  "in-progress": "accent",
  completed: "success",
  cancelled: "destructive"
};
const STATUS_LABEL = {
  pending: "Pending",
  confirmed: "Confirmed",
  "in-progress": "In progress",
  completed: "Completed",
  cancelled: "Cancelled"
};
function BookingCard({
  booking,
  counterpartName,
  counterpartAvatar,
  counterpartRole,
  actions,
  className,
  index = 0
}) {
  const isRemote = booking.location.toLowerCase().includes("video");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      variants: staggerItem,
      initial: "hidden",
      animate: "visible",
      whileHover: { y: -3 },
      className: cn(
        "flex flex-col gap-4 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated transition-smooth hover:shadow-elevated-lg",
        className
      ),
      "data-ocid": `booking.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: counterpartAvatar, name: counterpartName, size: "md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-base font-semibold leading-tight", children: counterpartName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: counterpartRole })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[booking.status], children: STATUS_LABEL[booking.status] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold", children: booking.serviceName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
              (/* @__PURE__ */ new Date(`${booking.date}T00:00:00`)).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
              booking.time,
              " · ",
              booking.durationMinutes,
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              isRemote ? /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: booking.location })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: booking.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-semibold", children: [
              "$",
              booking.price
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: actions ?? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/app/messages",
              "data-ocid": `booking.message_button.${index + 1}`,
              className: "inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary",
              children: "Message"
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  BookingCard as B
};
