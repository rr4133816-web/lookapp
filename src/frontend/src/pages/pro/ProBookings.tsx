import { BookingCard } from "@/components/BookingCard";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Search as SearchField } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tabs";
import { getBookingsForProfessional } from "@/data/bookings";
import { useApp } from "@/hooks/use-app";
import { staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { CalendarX, Check, Clock, X } from "lucide-react";
import { useMemo, useState } from "react";

const PRO_ID = "p-01";

export default function ProBookings() {
  const { updateBookingStatus, pushToast } = useApp();
  const [tab, setTab] = useState("requests");
  const [query, setQuery] = useState("");
  const bookings = useMemo(() => getBookingsForProfessional(PRO_ID), []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesTerm =
        !term ||
        booking.customerName.toLowerCase().includes(term) ||
        booking.serviceName.toLowerCase().includes(term) ||
        booking.id.toLowerCase().includes(term);
      const matchesTab =
        tab === "requests"
          ? booking.status === "pending"
          : tab === "upcoming"
            ? ["confirmed", "in-progress"].includes(booking.status)
            : tab === "completed"
              ? booking.status === "completed"
              : booking.status === "cancelled";
      return matchesTerm && matchesTab;
    });
  }, [bookings, tab, query]);

  const counts = useMemo(
    () => ({
      requests: bookings.filter((booking) => booking.status === "pending")
        .length,
      upcoming: bookings.filter((booking) =>
        ["confirmed", "in-progress"].includes(booking.status),
      ).length,
      completed: bookings.filter((booking) => booking.status === "completed")
        .length,
      cancelled: bookings.filter((booking) => booking.status === "cancelled")
        .length,
    }),
    [bookings],
  );

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Bookings
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Manage your sessions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Accept requests, track confirmed sessions and review completed work.
          </p>
        </div>

        <SearchField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search by customer, service or reference"
          aria-label="Search bookings"
          containerClassName="max-w-md"
          data-ocid="pro_bookings.search_input"
        />

        <Tabs
          items={[
            { value: "requests", label: "Requests", count: counts.requests },
            { value: "upcoming", label: "Upcoming", count: counts.upcoming },
            { value: "completed", label: "Completed", count: counts.completed },
            { value: "cancelled", label: "Cancelled", count: counts.cancelled },
          ]}
          value={tab}
          onValueChange={setTab}
        />
      </header>

      {filtered.length === 0 ? (
        <EmptyState
          icon={tab === "requests" ? Clock : CalendarX}
          title={
            tab === "requests" ? "No pending requests" : "Nothing in this view"
          }
          description={
            tab === "requests"
              ? "New booking requests will appear here for you to accept or decline."
              : "Try another tab or clear your search to see more bookings."
          }
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 lg:grid-cols-2"
        >
          {filtered.map((booking, index) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              counterpartName={booking.customerName}
              counterpartAvatar={booking.customerAvatar}
              counterpartRole="Customer"
              index={index}
              actions={
                booking.status === "pending" ? (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        updateBookingStatus(booking.id, "cancelled");
                        pushToast({
                          title: "Request declined",
                          description: `${booking.customerName} has been notified.`,
                          variant: "default",
                        });
                      }}
                      data-ocid={`pro_bookings.decline_button.${index + 1}`}
                    >
                      <X className="size-4" />
                      Decline
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        updateBookingStatus(booking.id, "confirmed");
                        pushToast({
                          title: "Booking confirmed",
                          description: `${booking.customerName} has been notified.`,
                          variant: "success",
                        });
                      }}
                      data-ocid={`pro_bookings.accept_button.${index + 1}`}
                    >
                      <Check className="size-4" />
                      Accept
                    </Button>
                  </>
                ) : booking.status === "confirmed" ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      updateBookingStatus(booking.id, "completed");
                      pushToast({
                        title: "Session marked complete",
                        description: "The customer can now leave a review.",
                        variant: "success",
                      });
                    }}
                    data-ocid={`pro_bookings.complete_button.${index + 1}`}
                  >
                    Mark complete
                  </Button>
                ) : undefined
              }
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
