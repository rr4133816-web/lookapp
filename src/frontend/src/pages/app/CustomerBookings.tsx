import { BookingCard } from "@/components/BookingCard";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Search as SearchField } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tabs";
import { professionals } from "@/data/professionals";
import { useApp } from "@/hooks/use-app";
import { staggerContainer } from "@/lib/motion";
import type { BookingStatus } from "@/types";
import { motion } from "framer-motion";
import { CalendarX, Compass, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const TAB_ITEMS = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function CustomerBookings() {
  const { bookings, updateBookingStatus, pushToast } = useApp();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const professional = professionals.find(
        (item) => item.id === booking.professionalId,
      );
      const matchesTerm =
        !term ||
        booking.serviceName.toLowerCase().includes(term) ||
        booking.id.toLowerCase().includes(term) ||
        (professional?.name.toLowerCase().includes(term) ?? false);
      const matchesTab =
        tab === "all" ||
        (tab === "upcoming" &&
          ["pending", "confirmed", "in-progress"].includes(booking.status)) ||
        (tab === "completed" && booking.status === "completed") ||
        (tab === "cancelled" && booking.status === "cancelled");
      return matchesTerm && matchesTab;
    });
  }, [bookings, tab, query]);

  const counts = useMemo(
    () => ({
      all: bookings.length,
      upcoming: bookings.filter((booking) =>
        ["pending", "confirmed", "in-progress"].includes(booking.status),
      ).length,
      completed: bookings.filter((booking) => booking.status === "completed")
        .length,
      cancelled: bookings.filter((booking) => booking.status === "cancelled")
        .length,
    }),
    [bookings],
  );

  const cancel = (bookingId: string) => {
    updateBookingStatus(bookingId, "cancelled" as BookingStatus);
    pushToast({
      title: "Booking cancelled",
      description:
        "Any payment held will be refunded within five business days.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Bookings
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Your sessions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Track upcoming sessions, revisit completed work and manage anything
            you have cancelled.
          </p>
        </div>

        <SearchField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search by service, professional or reference"
          aria-label="Search bookings"
          containerClassName="max-w-md"
          data-ocid="bookings.search_input"
        />

        <Tabs
          items={TAB_ITEMS.map((item) => ({
            ...item,
            count: counts[item.value as keyof typeof counts],
          }))}
          value={tab}
          onValueChange={setTab}
        />
      </header>

      {filtered.length === 0 ? (
        <EmptyState
          icon={tab === "cancelled" ? CalendarX : Search}
          title={
            query.trim() ? "No bookings match that search" : "Nothing here yet"
          }
          description={
            query.trim()
              ? "Try a different service name, professional or booking reference."
              : "When you book a session it will appear here with its status and schedule."
          }
          action={
            <Link
              to="/app/discover"
              data-ocid="bookings.empty_discover_button"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5"
            >
              <Compass className="size-4" />
              Find a professional
            </Link>
          }
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 lg:grid-cols-2"
        >
          {filtered.map((booking, index) => {
            const professional = professionals.find(
              (item) => item.id === booking.professionalId,
            );
            const canCancel = ["pending", "confirmed"].includes(booking.status);
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                counterpartName={professional?.name ?? "Professional"}
                counterpartAvatar={professional?.avatar ?? ""}
                counterpartRole={professional?.profession ?? ""}
                index={index}
                actions={
                  <>
                    <Link
                      to="/app/messages"
                      className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary"
                    >
                      Message
                    </Link>
                    {canCancel ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => cancel(booking.id)}
                        data-ocid={`booking.cancel_button.${index + 1}`}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </>
                }
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
