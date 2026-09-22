import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input, Label, Textarea } from "@/components/ui/input";
import { TimePicker } from "@/components/ui/time-picker";
import { getProfessional } from "@/data/professionals";
import { useApp } from "@/hooks/use-app";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";
import type { Booking, Service } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  Clock,
  MapPin,
  ShieldCheck,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Date" },
  { id: 3, label: "Time" },
  { id: 4, label: "Details" },
  { id: 5, label: "Review" },
  { id: 6, label: "Confirm" },
  { id: 7, label: "Confirmation" },
];

function formatLongDate(value: string) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function BookService() {
  const { id } = useParams<{ id: string }>();
  const professional = id ? getProfessional(id) : undefined;
  const { addBooking, pushToast } = useApp();

  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<"video" | "in-person">("video");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [confirmedId, setConfirmedId] = useState("");

  const total = service ? service.price : 0;
  const locationLabel = mode === "video" ? "Video call" : address.trim();

  const summaryRows = useMemo(
    () => [
      { label: "Service", value: service?.name ?? "Not selected" },
      { label: "Professional", value: professional?.name ?? "" },
      { label: "Date", value: formatLongDate(date) || "Not selected" },
      { label: "Time", value: time || "Not selected" },
      { label: "Location", value: locationLabel || "Not provided" },
    ],
    [service, professional, date, time, locationLabel],
  );

  if (!professional) {
    return <NotFound />;
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
        step === 1
          ? "Choose a service to continue."
          : step === 2
            ? "Pick a date to continue."
            : step === 3
              ? "Pick a time slot to continue."
              : "Enter the service address to continue.",
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
    const bookingId = `BK-${Math.floor(5000 + Math.random() * 900)}`;
    const booking: Booking = {
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
      createdAt: new Date().toISOString().slice(0, 10),
    };
    addBooking(booking);
    setConfirmedId(bookingId);
    setStep(7);
    pushToast({
      title: "Booking confirmed",
      description: `${professional.name} is booked for ${service.name} on ${formatLongDate(date)}.`,
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      <Link
        to={`/app/professionals/${professional.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to profile
      </Link>

      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Book a session
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Book with {professional.name}
        </h1>
      </header>

      <ol className="flex items-center gap-2 overflow-x-auto pb-1">
        {STEPS.map((item, index) => {
          const isDone = step > item.id;
          const isActive = step === item.id;
          return (
            <li key={item.id} className="flex shrink-0 items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-smooth",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-primary-glow"
                    : isDone
                      ? "bg-success/12 text-success"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {isDone ? (
                  <Check className="size-3.5" />
                ) : (
                  <span className="font-mono">{item.id}</span>
                )}
                {item.label}
              </span>
              {index < STEPS.length - 1 ? (
                <span className="h-px w-6 bg-border" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>

      {step === 7 ? (
        <div className="mx-auto max-w-xl py-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card p-8 text-center shadow-elevated-lg"
            data-ocid="booking.success_state"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="mx-auto grid size-16 place-items-center rounded-full bg-success/12 text-success"
            >
              <Check className="size-8" />
            </motion.span>
            <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
              Booking confirmed
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your session for{" "}
              <span className="font-medium text-foreground">
                {service?.name}
              </span>{" "}
              with {professional.name} is confirmed. A calendar invite and the
              session link are on their way.
            </p>

            <div className="mt-6 space-y-2.5 rounded-[var(--radius)] bg-muted/50 p-5 text-left">
              {[
                { label: "Booking reference", value: confirmedId },
                { label: "Service", value: service?.name ?? "" },
                { label: "Professional", value: professional.name },
                { label: "Date", value: formatLongDate(date) },
                { label: "Time", value: time },
                { label: "Location", value: locationLabel },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="max-w-[60%] text-right font-mono text-sm font-medium">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/app/bookings"
                data-ocid="booking.view_bookings_button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5"
              >
                View my bookings
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/app/discover"
                data-ocid="booking.book_another_button"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary"
              >
                Book another service
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 1 ? (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">
                    Choose a service
                  </h2>
                  <div className="space-y-3">
                    {professional.services.map((item) => {
                      const isActive = service?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => {
                            setService(item);
                            setError("");
                          }}
                          data-ocid={`booking.service_option.${professional.services.indexOf(item) + 1}`}
                          className={cn(
                            "flex w-full items-start justify-between gap-4 rounded-[var(--radius)] border p-5 text-left transition-smooth",
                            isActive
                              ? "border-primary bg-primary-soft ring-2 ring-ring/25"
                              : "border-border/60 bg-card hover:border-primary/40",
                          )}
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-display text-base font-semibold">
                                {item.name}
                              </p>
                              {item.popular ? (
                                <Badge variant="accent">Popular</Badge>
                              ) : null}
                            </div>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                              {item.description}
                            </p>
                            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="size-3.5" />
                              {item.durationMinutes} minutes
                            </p>
                          </div>
                          <span className="shrink-0 font-mono text-lg font-semibold">
                            ${item.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-6">
                  <h2 className="font-display text-lg font-semibold">
                    Pick a date
                  </h2>
                  <DatePicker value={date} onChange={setDate} />
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-6">
                  <h2 className="font-display text-lg font-semibold">
                    Pick a time
                  </h2>
                  <TimePicker value={time} onChange={setTime} />
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-6">
                  <h2 className="font-display text-lg font-semibold">
                    Session details
                  </h2>

                  <fieldset className="space-y-2.5">
                    <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      How should this session happen?
                    </legend>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {[
                        {
                          value: "video" as const,
                          label: "Video call",
                          body: "A link is sent once confirmed.",
                          icon: Video,
                        },
                        {
                          value: "in-person" as const,
                          label: "In person",
                          body: "At an address you provide.",
                          icon: MapPin,
                        },
                      ].map((option) => {
                        const isActive = mode === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setMode(option.value)}
                            data-ocid={`booking.mode_${option.value}_button`}
                            className={cn(
                              "flex flex-col gap-1.5 rounded-[var(--radius)] border p-4 text-left transition-smooth",
                              isActive
                                ? "border-primary bg-primary-soft ring-2 ring-ring/25"
                                : "border-border/60 bg-card hover:border-primary/40",
                            )}
                          >
                            <option.icon
                              className={cn(
                                "size-4.5",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground",
                              )}
                            />
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {option.body}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {mode === "in-person" ? (
                    <div className="space-y-2">
                      <Label htmlFor="booking-address">Service address</Label>
                      <Input
                        id="booking-address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="1420 Maple Grove Ave, Columbus, OH"
                        data-ocid="booking.address_input"
                      />
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="booking-notes">
                      Notes for the professional
                    </Label>
                    <Textarea
                      id="booking-notes"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Anything they should know or prepare before the session."
                      data-ocid="booking.notes_input"
                    />
                  </div>
                </div>
              ) : null}

              {step === 5 ? (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">
                    Review your booking
                  </h2>
                  <Card>
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={professional.avatar}
                          name={professional.name}
                          size="md"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {professional.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {professional.profession}
                          </p>
                        </div>
                        {professional.verified ? (
                          <Badge variant="accent" className="ml-auto">
                            <BadgeCheck className="size-3" />
                            Verified
                          </Badge>
                        ) : null}
                      </div>

                      <div className="space-y-2.5 border-t border-border/60 pt-4">
                        {[
                          { label: "Service", value: service?.name ?? "" },
                          { label: "Date", value: formatLongDate(date) },
                          { label: "Time", value: time },
                          {
                            label: "Format",
                            value: mode === "video" ? "Video call" : address,
                          },
                          {
                            label: "Duration",
                            value: `${service?.durationMinutes ?? 0} minutes`,
                          },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="flex items-start justify-between gap-4"
                          >
                            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                              {row.label}
                            </span>
                            <span className="max-w-[60%] text-right text-sm font-medium">
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {notes.trim() ? (
                        <div className="rounded-lg bg-muted/50 p-3.5">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Your notes
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed">
                            {notes}
                          </p>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>

                  <div className="flex items-start gap-3 rounded-[var(--radius)] border border-accent/30 bg-accent-soft p-4">
                    <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-accent" />
                    <p className="text-xs leading-relaxed text-foreground">
                      Free cancellation up to 24 hours before the session. Your
                      booking is confirmed the moment you place it.
                    </p>
                  </div>
                </div>
              ) : null}

              {step === 6 ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-lg font-semibold">
                      Review &amp; confirm
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Check the details below, then confirm your booking.
                    </p>
                  </div>

                  <Card>
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={professional.avatar}
                          name={professional.name}
                          size="md"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {professional.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {professional.profession}
                          </p>
                        </div>
                        {professional.verified ? (
                          <Badge variant="accent" className="ml-auto">
                            <BadgeCheck className="size-3" />
                            Verified
                          </Badge>
                        ) : null}
                      </div>

                      <div className="space-y-2.5 border-t border-border/60 pt-4">
                        {summaryRows.map((row) => (
                          <div
                            key={row.label}
                            className="flex items-start justify-between gap-4"
                          >
                            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                              {row.label}
                            </span>
                            <span className="max-w-[60%] text-right text-sm font-medium">
                              {row.value}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
                          <span className="font-display text-sm font-semibold">
                            Total
                          </span>
                          <span className="font-mono text-lg font-semibold">
                            ${total}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-start gap-3 rounded-[var(--radius)] border border-accent/30 bg-accent-soft p-4">
                    <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-accent" />
                    <p className="text-xs leading-relaxed text-foreground">
                      No payment is taken now. This booking is confirmed
                      immediately and you can cancel free of charge up to 24
                      hours before the session.
                    </p>
                  </div>
                </div>
              ) : null}

              {error ? (
                <p
                  role="alert"
                  data-ocid="booking.error_state"
                  className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
                >
                  {error}
                </p>
              ) : null}

              <div className="mt-6 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={back}
                  disabled={step === 1}
                  data-ocid="booking.back_button"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                {step < 6 ? (
                  <Button
                    type="button"
                    onClick={next}
                    data-ocid="booking.continue_button"
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={confirm}
                    data-ocid="booking.confirm_button"
                  >
                    <CalendarCheck className="size-4" />
                    Confirm booking
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          <aside className="space-y-4">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Booking summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="max-w-[60%] text-right font-medium">
                      {service?.name ?? "Not selected"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-mono">
                      {service ? `${service.durationMinutes} min` : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-mono">{date || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-mono">{time || "—"}</span>
                  </div>

                  <div className="space-y-2 border-t border-border/60 pt-3">
                    <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-2.5">
                      <span className="font-display text-sm font-semibold">
                        Total
                      </span>
                      <span className="font-mono text-lg font-semibold">
                        ${total}
                      </span>
                    </div>
                  </div>

                  <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5" />
                    No payment taken — confirmed instantly
                  </p>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
