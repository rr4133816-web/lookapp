import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs } from "@/components/ui/tabs";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { NotificationKind } from "@/types";
import { motion } from "framer-motion";
import {
  Bell,
  BellOff,
  CalendarCheck,
  CheckCheck,
  CreditCard,
  MessageSquare,
  Settings,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const KIND_META: Record<
  NotificationKind,
  { icon: typeof Bell; tone: string; label: string }
> = {
  booking: {
    icon: CalendarCheck,
    tone: "bg-primary-soft text-primary",
    label: "Booking",
  },
  message: {
    icon: MessageSquare,
    tone: "bg-accent-soft text-accent",
    label: "Message",
  },
  payment: {
    icon: CreditCard,
    tone: "bg-success/12 text-success",
    label: "Payment",
  },
  review: {
    icon: Star,
    tone: "bg-warning/15 text-warning-foreground dark:text-warning",
    label: "Review",
  },
  system: {
    icon: Settings,
    tone: "bg-muted text-muted-foreground",
    label: "System",
  },
};

function relativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Notifications() {
  const {
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useApp();
  const [tab, setTab] = useState("all");

  const filtered = useMemo(
    () =>
      notifications.filter((notification) =>
        tab === "all"
          ? true
          : tab === "unread"
            ? !notification.read
            : notification.kind === tab,
      ),
    [notifications, tab],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Notifications
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Activity
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Booking updates, replies, payments and review requests in one feed.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={markAllNotificationsRead}
          disabled={unreadNotificationCount === 0}
          data-ocid="notifications.mark_all_button"
        >
          <CheckCheck className="size-4" />
          Mark all as read
        </Button>
      </header>

      <Tabs
        items={[
          { value: "all", label: "All", count: notifications.length },
          { value: "unread", label: "Unread", count: unreadNotificationCount },
          { value: "booking", label: "Bookings" },
          { value: "message", label: "Messages" },
          { value: "payment", label: "Payments" },
        ]}
        value={tab}
        onValueChange={setTab}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="Nothing to catch up on"
          description="You are all caught up. New activity will appear here as it happens."
        />
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filtered.map((notification, index) => {
            const meta = KIND_META[notification.kind];
            return (
              <motion.li
                key={notification.id}
                variants={staggerItem}
                className={cn(
                  "flex items-start gap-4 rounded-[var(--radius)] border p-4 shadow-elevated transition-smooth",
                  notification.read
                    ? "border-border/60 bg-card"
                    : "border-primary/30 bg-primary-soft/40",
                )}
                data-ocid={`notifications.item.${index + 1}`}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl",
                    meta.tone,
                  )}
                >
                  <meta.icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <Badge variant="neutral">{meta.label}</Badge>
                    {!notification.read ? (
                      <span
                        className="size-2 rounded-full bg-accent"
                        aria-label="Unread"
                      />
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {notification.body}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                    {relativeTime(notification.timestamp)}
                  </p>
                </div>
                {!notification.read ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => markNotificationRead(notification.id)}
                    data-ocid={`notifications.mark_read_button.${index + 1}`}
                  >
                    Mark read
                  </Button>
                ) : null}
              </motion.li>
            );
          })}
        </motion.ul>
      )}

      <div className="flex items-center gap-2 rounded-[var(--radius)] border border-border/60 bg-muted/40 p-4">
        <Bell className="size-4 shrink-0 text-muted-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Notification preferences can be adjusted in{" "}
          <Link
            to="/app/settings"
            className="font-medium text-primary hover:underline"
          >
            settings
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
