import { f as useApp, r as reactExports, j as jsxRuntimeExports, S as Search$1, L as Link, k as Compass, m as motion } from "./index-Dpq2E7IO.js";
import { B as BookingCard } from "./BookingCard-CjymmSnR.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { p as professionals } from "./professionals-CzEAapSV.js";
import { s as staggerContainer } from "./motion-DSc3ayC3.js";
import { C as CalendarX } from "./calendar-x-3VEi3syt.js";
import "./calendar-days-RrFnZuq5.js";
import "./clock-m4hju-8B.js";
import "./video-CeS3okxd.js";
import "./map-pin-Db--45lR.js";
const TAB_ITEMS = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" }
];
function CustomerBookings() {
  const { bookings, updateBookingStatus, pushToast } = useApp();
  const [tab, setTab] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const professional = professionals.find(
        (item) => item.id === booking.professionalId
      );
      const matchesTerm = !term || booking.serviceName.toLowerCase().includes(term) || booking.id.toLowerCase().includes(term) || ((professional == null ? void 0 : professional.name.toLowerCase().includes(term)) ?? false);
      const matchesTab = tab === "all" || tab === "upcoming" && ["pending", "confirmed", "in-progress"].includes(booking.status) || tab === "completed" && booking.status === "completed" || tab === "cancelled" && booking.status === "cancelled";
      return matchesTerm && matchesTab;
    });
  }, [bookings, tab, query]);
  const counts = reactExports.useMemo(
    () => ({
      all: bookings.length,
      upcoming: bookings.filter(
        (booking) => ["pending", "confirmed", "in-progress"].includes(booking.status)
      ).length,
      completed: bookings.filter((booking) => booking.status === "completed").length,
      cancelled: bookings.filter((booking) => booking.status === "cancelled").length
    }),
    [bookings]
  );
  const cancel = (bookingId) => {
    updateBookingStatus(bookingId, "cancelled");
    pushToast({
      title: "Booking cancelled",
      description: "Any payment held will be refunded within five business days.",
      variant: "default"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Your sessions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Track upcoming sessions, revisit completed work and manage anything you have cancelled." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          value: query,
          onChange: (event) => setQuery(event.target.value),
          onClear: () => setQuery(""),
          placeholder: "Search by service, professional or reference",
          "aria-label": "Search bookings",
          containerClassName: "max-w-md",
          "data-ocid": "bookings.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          items: TAB_ITEMS.map((item) => ({
            ...item,
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
        icon: tab === "cancelled" ? CalendarX : Search$1,
        title: query.trim() ? "No bookings match that search" : "Nothing here yet",
        description: query.trim() ? "Try a different service name, professional or booking reference." : "When you book a session it will appear here with its status and schedule.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/app/discover",
            "data-ocid": "bookings.empty_discover_button",
            className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "size-4" }),
              "Find a professional"
            ]
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-4 lg:grid-cols-2",
        children: filtered.map((booking, index) => {
          const professional = professionals.find(
            (item) => item.id === booking.professionalId
          );
          const canCancel = ["pending", "confirmed"].includes(booking.status);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            BookingCard,
            {
              booking,
              counterpartName: (professional == null ? void 0 : professional.name) ?? "Professional",
              counterpartAvatar: (professional == null ? void 0 : professional.avatar) ?? "",
              counterpartRole: (professional == null ? void 0 : professional.profession) ?? "",
              index,
              actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/app/messages",
                    className: "inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary",
                    children: "Message"
                  }
                ),
                canCancel ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => cancel(booking.id),
                    "data-ocid": `booking.cancel_button.${index + 1}`,
                    className: "text-destructive hover:bg-destructive/10",
                    children: "Cancel"
                  }
                ) : null
              ] })
            },
            booking.id
          );
        })
      }
    )
  ] });
}
export {
  CustomerBookings as default
};
