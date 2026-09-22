import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Booking, BookingStatus } from "@/types";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Video } from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_VARIANT: Record<
  BookingStatus,
  "primary" | "accent" | "success" | "neutral" | "destructive"
> = {
  pending: "neutral",
  confirmed: "primary",
  "in-progress": "accent",
  completed: "success",
  cancelled: "destructive",
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  "in-progress": "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export interface BookingCardProps {
  booking: Booking;
  counterpartName: string;
  counterpartAvatar: string;
  counterpartRole: string;
  actions?: React.ReactNode;
  className?: string;
  index?: number;
}

/** Booking summary with status, schedule and counterpart identity. */
export function BookingCard({
  booking,
  counterpartName,
  counterpartAvatar,
  counterpartRole,
  actions,
  className,
  index = 0,
}: BookingCardProps) {
  const isRemote = booking.location.toLowerCase().includes("video");

  return (
    <motion.article
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3 }}
      className={cn(
        "flex flex-col gap-4 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated transition-smooth hover:shadow-elevated-lg",
        className,
      )}
      data-ocid={`booking.card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar src={counterpartAvatar} name={counterpartName} size="md" />
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold leading-tight">
              {counterpartName}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {counterpartRole}
            </p>
          </div>
        </div>
        <Badge variant={STATUS_VARIANT[booking.status]}>
          {STATUS_LABEL[booking.status]}
        </Badge>
      </div>

      <div className="rounded-lg bg-muted/50 p-3.5">
        <p className="font-display text-sm font-semibold">
          {booking.serviceName}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {new Date(`${booking.date}T00:00:00`).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono">
            <Clock className="size-3.5" />
            {booking.time} · {booking.durationMinutes} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            {isRemote ? (
              <Video className="size-3.5" />
            ) : (
              <MapPin className="size-3.5" />
            )}
            <span className="truncate">{booking.location}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            {booking.id}
          </span>
          <span className="font-mono text-base font-semibold">
            ${booking.price}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {actions ?? (
            <Link
              to="/app/messages"
              data-ocid={`booking.message_button.${index + 1}`}
              className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary"
            >
              Message
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
