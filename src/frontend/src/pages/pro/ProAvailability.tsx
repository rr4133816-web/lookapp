import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarClock, Check, Clock, Save } from "lucide-react";
import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const INITIAL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const INITIAL_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function ProAvailability() {
  const { pushToast } = useApp();
  const [activeDays, setActiveDays] = useState<string[]>(INITIAL_DAYS);
  const [activeSlots, setActiveSlots] = useState<string[]>(INITIAL_SLOTS);
  const [buffer, setBuffer] = useState("30");
  const [leadTime, setLeadTime] = useState("24");

  const toggleDay = (day: string) => {
    setActiveDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  };

  const toggleSlot = (slot: string) => {
    setActiveSlots((current) =>
      current.includes(slot)
        ? current.filter((item) => item !== slot)
        : [...current, slot],
    );
  };

  const weeklyHours = activeDays.length * activeSlots.length;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Availability
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            When you work
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Customers can only book inside the windows you open here.
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            pushToast({
              title: "Availability saved",
              description: `${weeklyHours} bookable slots per week.`,
              variant: "success",
            })
          }
          data-ocid="pro_availability.save_button"
        >
          <Save className="size-4" />
          Save availability
        </Button>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-3"
      >
        {[
          {
            label: "Working days",
            value: `${activeDays.length}`,
            hint: "per week",
          },
          {
            label: "Daily slots",
            value: `${activeSlots.length}`,
            hint: "bookable hours",
          },
          {
            label: "Weekly capacity",
            value: `${weeklyHours}`,
            hint: "sessions available",
          },
        ].map((item) => (
          <motion.div key={item.label} variants={staggerItem}>
            <Card>
              <CardContent className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.hint}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarClock className="size-4 text-primary" />
            Working days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const isActive = activeDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleDay(day)}
                  data-ocid={`pro_availability.day_${day.toLowerCase()}_button`}
                  className={cn(
                    "inline-flex h-11 min-w-[64px] items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-smooth",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-primary-glow"
                      : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {isActive ? <Check className="size-3.5" /> : null}
                  {day}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="size-4 text-primary" />
            Bookable time slots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {SLOTS.map((slot) => {
              const isActive = activeSlots.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleSlot(slot)}
                  data-ocid={`pro_availability.slot_${slot.replace(":", "")}_button`}
                  className={cn(
                    "inline-flex h-11 items-center justify-center rounded-lg border font-mono text-xs transition-smooth",
                    isActive
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border/60 bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground",
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Slots are shown in your local time zone. Customers see them
            converted to theirs.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Booking rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="buffer-time"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Buffer between sessions
              </label>
              <select
                id="buffer-time"
                value={buffer}
                onChange={(event) => setBuffer(event.target.value)}
                data-ocid="pro_availability.buffer_select"
                className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="0">No buffer</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lead-time"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Minimum notice
              </label>
              <select
                id="lead-time"
                value={leadTime}
                onChange={(event) => setLeadTime(event.target.value)}
                data-ocid="pro_availability.lead_select"
                className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="2">2 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">This week at a glance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {DAYS.map((day) => {
              const isActive = activeDays.includes(day);
              return (
                <div
                  key={day}
                  className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 px-3.5 py-2.5"
                >
                  <span className="text-sm font-medium">{day}</span>
                  {isActive ? (
                    <Badge variant="success">
                      {activeSlots.length} slots open
                    </Badge>
                  ) : (
                    <Badge variant="neutral">Unavailable</Badge>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
