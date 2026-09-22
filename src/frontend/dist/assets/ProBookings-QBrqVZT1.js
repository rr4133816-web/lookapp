import { f as useApp, r as reactExports, x as getBookingsForProfessional, j as jsxRuntimeExports, m as motion, X } from "./index-Dpq2E7IO.js";
import { B as BookingCard } from "./BookingCard-CjymmSnR.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { s as staggerContainer } from "./motion-DSc3ayC3.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { C as CalendarX } from "./calendar-x-3VEi3syt.js";
import { C as Check } from "./check-CeudopQg.js";
import "./calendar-days-RrFnZuq5.js";
import "./video-CeS3okxd.js";
import "./map-pin-Db--45lR.js";
const PRO_ID = "p-01";
function ProBookings() {
  const { updateBookingStatus, pushToast } = useApp();
  const [tab, setTab] = reactExports.useState("requests");
  const [query, setQuery] = reactExports.useState("");
  const bookings = reactExports.useMemo(() => getBookingsForProfessional(PRO_ID), []);
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesTerm = !term || booking.customerName.toLowerCase().includes(term) || booking.serviceName.toLowerCase().includes(term) || booking.id.toLowerCase().includes(term);
      const matchesTab = tab === "requests" ? booking.status === "pending" : tab === "upcoming" ? ["confirmed", "in-progress"].includes(booking.status) : tab === "completed" ? booking.status === "completed" : booking.status === "cancelled";
      return matchesTerm && matchesTab;
    });
  }, [bookings, tab, query]);
  const counts = reactExports.useMemo(
    () => ({
      requests: bookings.filter((booking) => booking.status === "pending").length,
      upcoming: bookings.filter(
        (booking) => ["confirmed", "in-progress"].includes(booking.status)
      ).length,
      completed: bookings.filter((booking) => booking.status === "completed").length,
      cancelled: bookings.filter((booking) => booking.status === "cancelled").length
    }),
    [bookings]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Manage your sessions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Accept requests, track confirmed sessions and review completed work." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          value: query,
          onChange: (event) => setQuery(event.target.value),
          onClear: () => setQuery(""),
          placeholder: "Search by customer, service or reference",
          "aria-label": "Search bookings",
          containerClassName: "max-w-md",
          "data-ocid": "pro_bookings.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          items: [
            { value: "requests", label: "Requests", count: counts.requests },
            { value: "upcoming", label: "Upcoming", count: counts.upcoming },
            { value: "completed", label: "Completed", count: counts.completed },
            { value: "cancelled", label: "Cancelled", count: counts.cancelled }
          ],
          value: tab,
          onValueChange: setTab
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: tab === "requests" ? Clock : CalendarX,
        title: tab === "requests" ? "No pending requests" : "Nothing in this view",
        description: tab === "requests" ? "New booking requests will appear here for you to accept or decline." : "Try another tab or clear your search to see more bookings."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-4 lg:grid-cols-2",
        children: filtered.map((booking, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingCard,
          {
            booking,
            counterpartName: booking.customerName,
            counterpartAvatar: booking.customerAvatar,
            counterpartRole: "Customer",
            index,
            actions: booking.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "text-destructive hover:bg-destructive/10",
                  onClick: () => {
                    updateBookingStatus(booking.id, "cancelled");
                    pushToast({
                      title: "Request declined",
                      description: `${booking.customerName} has been notified.`,
                      variant: "default"
                    });
                  },
                  "data-ocid": `pro_bookings.decline_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
                    "Decline"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: () => {
                    updateBookingStatus(booking.id, "confirmed");
                    pushToast({
                      title: "Booking confirmed",
                      description: `${booking.customerName} has been notified.`,
                      variant: "success"
                    });
                  },
                  "data-ocid": `pro_bookings.accept_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }),
                    "Accept"
                  ]
                }
              )
            ] }) : booking.status === "confirmed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => {
                  updateBookingStatus(booking.id, "completed");
                  pushToast({
                    title: "Session marked complete",
                    description: "The customer can now leave a review.",
                    variant: "success"
                  });
                },
                "data-ocid": `pro_bookings.complete_button.${index + 1}`,
                children: "Mark complete"
              }
            ) : void 0
          },
          booking.id
        ))
      }
    )
  ] });
}
export {
  ProBookings as default
};
