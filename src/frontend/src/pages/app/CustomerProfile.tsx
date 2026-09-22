import { StatCard } from "@/components/StatCard";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarCheck,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CustomerProfile() {
  const { bookings, favorites, conversations, pushToast } = useApp();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.morgan@lookapp.io");
  const [phone, setPhone] = useState("+1 (614) 555-0142");
  const [location, setLocation] = useState("Columbus, OH");

  const completed = bookings.filter(
    (booking) => booking.status === "completed",
  ).length;
  const unread = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0,
  );

  const save = () => {
    setEditOpen(false);
    pushToast({
      title: "Profile updated",
      description: "Your contact details have been saved.",
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Profile
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Your account
        </h1>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card shadow-elevated"
      >
        <div className="h-24 bg-gradient-primary" />
        <div className="px-5 pb-6 md:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Avatar name={name} size="xl" className="ring-4 ring-card" />
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-bold tracking-tight">
                    {name}
                  </h2>
                  <Badge variant="accent">
                    <BadgeCheck className="size-3" />
                    Verified customer
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Member since March 2025
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditOpen(true)}
              data-ocid="profile.edit_button"
            >
              <Pencil className="size-4" />
              Edit profile
            </Button>
          </div>

          <div className="mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Mail, label: "Email", value: email },
              { icon: Phone, label: "Phone", value: phone },
              { icon: MapPin, label: "Location", value: location },
              { icon: Star, label: "Average rating given", value: "4.9 / 5" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  <item.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="truncate text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Total bookings"
          value={`${bookings.length}`}
          icon={CalendarCheck}
          hint="Across 6 professionals"
          index={0}
        />
        <StatCard
          label="Completed sessions"
          value={`${completed}`}
          icon={BadgeCheck}
          tone="success"
          hint="All rated 4 stars or above"
          index={1}
        />
        <StatCard
          label="Saved professionals"
          value={`${favorites.length}`}
          icon={Heart}
          tone="accent"
          hint="Ready to book"
          index={2}
        />
        <StatCard
          label="Unread messages"
          value={`${unread}`}
          icon={MessageSquare}
          tone="warning"
          hint="Replies waiting"
          index={3}
        />
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.slice(0, 4).map((booking) => (
              <motion.div
                key={booking.id}
                variants={staggerItem}
                className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {booking.serviceName}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {booking.id} · {booking.date}
                  </p>
                </div>
                <Badge
                  variant={
                    booking.status === "completed"
                      ? "success"
                      : booking.status === "cancelled"
                        ? "destructive"
                        : "primary"
                  }
                >
                  {booking.status}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { to: "/app/bookings", label: "Manage your bookings" },
              { to: "/app/favorites", label: "Review saved professionals" },
              {
                to: "/app/settings",
                label: "Notification and privacy settings",
              },
              { to: "/app/discover", label: "Find a new professional" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between gap-4 rounded-lg border border-border/60 p-3.5 text-sm transition-smooth hover:border-primary/40 hover:bg-secondary"
              >
                {link.label}
                <span className="text-muted-foreground">→</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit profile"
        description="Update the contact details on your account."
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditOpen(false)}
              data-ocid="profile.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={save}
              data-ocid="profile.save_button"
            >
              Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Full name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              data-ocid="profile.name_input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">Email address</Label>
            <Input
              id="profile-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              data-ocid="profile.email_input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-phone">Phone number</Label>
            <Input
              id="profile-phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              data-ocid="profile.phone_input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-location">Location</Label>
            <Input
              id="profile-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              data-ocid="profile.location_input"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
