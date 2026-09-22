import { PageHeader, PageTransition } from "@/components/layout/PageTransition";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Label } from "@/components/ui/input";
import { Search as SearchField } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tabs";
import { bookings as seedBookings } from "@/data/bookings";
import { getProfessional } from "@/data/professionals";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Booking, BookingStatus } from "@/types";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CalendarX,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

const STATUS_VARIANT: Record<
  BookingStatus,
  "warning" | "primary" | "accent" | "success" | "destructive"
> = {
  pending: "warning",
  confirmed: "primary",
  "in-progress": "accent",
  completed: "success",
  cancelled: "destructive",
};

const STATUS_TABS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatLongDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminBookings() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: seedBookings.length };
    for (const status of [
      "pending",
      "confirmed",
      "in-progress",
      "completed",
      "cancelled",
    ] as BookingStatus[]) {
      base[status] = seedBookings.filter(
        (booking) => booking.status === status,
      ).length;
    }
    return base;
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return seedBookings.filter((booking) => {
      const professional = getProfessional(booking.professionalId);
      const matchesTab = tab === "all" || booking.status === tab;
      const matchesTerm =
        !term ||
        booking.id.toLowerCase().includes(term) ||
        booking.customerName.toLowerCase().includes(term) ||
        booking.serviceName.toLowerCase().includes(term) ||
        (professional?.name.toLowerCase().includes(term) ?? false);
      const matchesFrom = !from || booking.date >= from;
      const matchesTo = !to || booking.date <= to;
      return matchesTab && matchesTerm && matchesFrom && matchesTo;
    });
  }, [tab, query, from, to]);

  const selectedProfessional = selected
    ? getProfessional(selected.professionalId)
    : undefined;

  const timeline = selected
    ? [
        {
          label: "Requested",
          value: formatDate(selected.createdAt),
          done: true,
        },
        {
          label: "Confirmed",
          value:
            selected.status === "pending"
              ? "Awaiting professional"
              : formatDate(selected.date),
          done: selected.status !== "pending",
        },
        {
          label: "Session",
          value: `${formatDate(selected.date)} · ${selected.time}`,
          done: ["in-progress", "completed"].includes(selected.status),
        },
        {
          label: "Completed",
          value:
            selected.status === "completed"
              ? "Session delivered"
              : selected.status === "cancelled"
                ? "Cancelled"
                : "Not yet",
          done: selected.status === "completed",
        },
      ]
    : [];

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Bookings"
        description="Every session across the marketplace — filter by status or date, then open a booking for the full timeline."
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SearchField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search by reference, customer, professional or service"
            aria-label="Search bookings"
            containerClassName="w-full lg:max-w-md"
            data-ocid="admin_bookings.search_input"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="space-y-1.5">
              <Label htmlFor="bookings-from">From</Label>
              <Input
                id="bookings-from"
                type="date"
                value={from}
                max={to || undefined}
                onChange={(event) => setFrom(event.target.value)}
                className="w-full sm:w-40"
                data-ocid="admin_bookings.date_from_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bookings-to">To</Label>
              <Input
                id="bookings-to"
                type="date"
                value={to}
                min={from || undefined}
                onChange={(event) => setTo(event.target.value)}
                className="w-full sm:w-40"
                data-ocid="admin_bookings.date_to_input"
              />
            </div>
            {from || to ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setFrom("");
                  setTo("");
                }}
                data-ocid="admin_bookings.clear_dates_button"
              >
                Clear dates
              </Button>
            ) : null}
          </div>
        </div>

        <Tabs
          items={STATUS_TABS.map((item) => ({
            value: item.value,
            label: item.label,
            count: counts[item.value],
          }))}
          value={tab}
          onValueChange={setTab}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title="No bookings match these filters"
          description="Adjust the status tab, widen the date range or clear the search to see more sessions."
          action={
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setTab("all");
                setQuery("");
                setFrom("");
                setTo("");
              }}
              data-ocid="admin_bookings.reset_button"
            >
              Reset filters
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="sticky top-0 z-10 bg-muted/60">
                <tr className="text-left">
                  {[
                    "Reference",
                    "Customer",
                    "Professional",
                    "Service",
                    "Schedule",
                    "Amount",
                    "Status",
                    "",
                  ].map((heading) => (
                    <th
                      key={heading || "actions"}
                      scope="col"
                      className={cn(
                        "px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                        heading === "Amount" && "text-right",
                      )}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking, index) => {
                  const professional = getProfessional(booking.professionalId);
                  return (
                    <motion.tr
                      key={booking.id}
                      variants={staggerItem}
                      initial="hidden"
                      animate="visible"
                      className="border-t border-border/60 transition-smooth hover:bg-muted/40"
                      data-ocid={`admin_bookings.row.${index + 1}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        {booking.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            src={booking.customerAvatar}
                            name={booking.customerName}
                            size="sm"
                          />
                          <span className="truncate">
                            {booking.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            src={professional?.avatar}
                            name={professional?.name ?? "Unassigned"}
                            size="sm"
                          />
                          <span className="truncate">
                            {professional?.name ?? "Unassigned"}
                          </span>
                        </div>
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3">
                        {booking.serviceName}
                      </td>
                      <td className="px-4 py-3">
                        <span className="block font-mono text-xs">
                          {formatDate(booking.date)}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {booking.time} · {booking.durationMinutes} min
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold">
                        ${booking.price}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={STATUS_VARIANT[booking.status]}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelected(booking)}
                          data-ocid={`admin_bookings.open_modal_button.${index + 1}`}
                        >
                          Details
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `Booking ${selected.id}` : "Booking"}
        description={selected ? selected.serviceName : undefined}
        footer={
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => setSelected(null)}
            data-ocid="admin_bookings.close_button"
          >
            Close
          </Button>
        }
      >
        {selected ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <Badge variant={STATUS_VARIANT[selected.status]}>
                {selected.status}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {formatDate(selected.createdAt)}
              </span>
            </div>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Timeline
              </h3>
              <ol className="space-y-3">
                {timeline.map((step) => (
                  <li key={step.label} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                        step.done
                          ? "bg-success/12 text-success"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step.done ? (
                        <CheckCircle2 className="size-3.5" />
                      ) : (
                        <Clock className="size-3.5" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {step.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {step.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Parties
              </h3>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-3">
                <Avatar
                  src={selected.customerAvatar}
                  name={selected.customerName}
                  size="md"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {selected.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-3">
                <Avatar
                  src={selectedProfessional?.avatar}
                  name={selectedProfessional?.name ?? "Unassigned"}
                  size="md"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {selectedProfessional?.name ?? "Unassigned"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedProfessional?.profession ?? "Professional"}
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Session
              </h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-start gap-3">
                  <CalendarClock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="sr-only">Schedule</dt>
                    <dd>{formatLongDate(selected.date)}</dd>
                    <dd className="text-xs text-muted-foreground">
                      {selected.time} · {selected.durationMinutes} minutes
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="sr-only">Location</dt>
                    <dd>{selected.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="sr-only">Service</dt>
                    <dd>{selected.serviceName}</dd>
                  </div>
                </div>
              </dl>
              {selected.notes ? (
                <p className="rounded-lg border border-border/60 bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground">
                  {selected.notes}
                </p>
              ) : null}
            </section>

            <section className="flex items-center justify-between rounded-lg border border-border/60 bg-primary-soft/60 p-4">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Wallet className="size-4" />
                Booking amount
              </span>
              <span className="font-mono text-lg font-semibold">
                ${selected.price}
              </span>
            </section>
          </div>
        ) : null}
      </Drawer>
    </PageTransition>
  );
}
