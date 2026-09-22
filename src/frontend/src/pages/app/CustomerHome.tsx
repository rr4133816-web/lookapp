import { BookingCard } from "@/components/BookingCard";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search as SearchField } from "@/components/ui/search";
import { categories } from "@/data/categories";
import { professionals } from "@/data/professionals";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Clock,
  Compass,
  Heart,
  MessageSquare,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerHome() {
  const { bookings, favorites, conversations, pushToast } = useApp();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const upcoming = useMemo(
    () =>
      bookings.filter((booking) => booking.status !== "cancelled").slice(0, 2),
    [bookings],
  );

  const recommended = useMemo(
    () =>
      [...professionals]
        .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
        .slice(0, 3),
    [],
  );

  const unreadMessages = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0,
  );

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(
      query.trim()
        ? `/app/discover?q=${encodeURIComponent(query.trim())}`
        : "/app/discover",
    );
  };

  return (
    <div className="space-y-8">
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-[calc(var(--radius)+4px)] bg-gradient-subtle p-6 md:p-10"
      >
        <div
          className="hairline-grid absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div
          className="orb -right-16 -top-16 size-64 bg-accent/30"
          aria-hidden="true"
        />
        <div className="relative max-w-2xl">
          <motion.div variants={staggerItem}>
            <Badge variant="accent" className="px-3 py-1">
              <Sparkles className="size-3.5" />
              Good morning, Alex
            </Badge>
          </motion.div>
          <motion.h1
            variants={staggerItem}
            className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl"
          >
            What do you need help with today?
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Eighteen verified professionals across ten fields, ready when you
            are.
          </motion.p>
          <motion.form
            variants={staggerItem}
            onSubmit={submitSearch}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <SearchField
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClear={() => setQuery("")}
              placeholder="Search by skill, name or category"
              aria-label="Search professionals"
              containerClassName="flex-1"
              data-ocid="home.search_input"
            />
            <Button type="submit" size="lg" data-ocid="home.search_button">
              <Search className="size-4" />
              Search
            </Button>
          </motion.form>
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Upcoming sessions"
          value={`${bookings.filter((b) => b.status === "confirmed").length}`}
          icon={CalendarCheck}
          hint="Next: 28 September"
          tone="primary"
          index={0}
        />
        <StatCard
          label="Saved professionals"
          value={`${favorites.length}`}
          icon={Heart}
          hint="Across 3 categories"
          tone="accent"
          index={1}
        />
        <StatCard
          label="Unread messages"
          value={`${unreadMessages}`}
          icon={MessageSquare}
          hint="2 professionals replied"
          tone="success"
          index={2}
        />
        <StatCard
          label="Average rating given"
          value="4.9"
          icon={Star}
          trend={4}
          hint="From 6 completed sessions"
          tone="warning"
          index={3}
        />
      </motion.section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">
              Your upcoming sessions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything you have booked, in one place.
            </p>
          </div>
          <Link
            to="/app/bookings"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
          >
            All bookings
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 lg:grid-cols-2"
        >
          {upcoming.map((booking, index) => {
            const professional = professionals.find(
              (item) => item.id === booking.professionalId,
            );
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                counterpartName={professional?.name ?? "Professional"}
                counterpartAvatar={professional?.avatar ?? ""}
                counterpartRole={professional?.profession ?? ""}
                index={index}
              />
            );
          })}
        </motion.div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ten fields, each with verified specialists.
            </p>
          </div>
          <Link
            to="/app/discover"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
          >
            Discover
            <Compass className="size-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={staggerItem}>
              <Link
                to={`/app/discover?category=${category.slug}`}
                className="group flex h-full flex-col gap-1.5 rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-elevated transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated-lg"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <Sparkles className="size-4" />
                </span>
                <p className="mt-1 font-display text-sm font-semibold leading-tight">
                  {category.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {category.professionalCount} pros
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">
              Recommended for you
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on your recent bookings and saved searches.
            </p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {recommended.map((professional, index) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              index={index}
            />
          ))}
        </motion.div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Why professionals get verified</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: BadgeCheck,
                title: "Credentials checked by hand",
                body: "Licences, certifications and identity documents are reviewed before a profile goes live.",
              },
              {
                icon: Clock,
                title: "Response times you can plan around",
                body: "Every profile shows the typical reply time, so you know when to expect an answer.",
              },
              {
                icon: Star,
                title: "Reviews from completed sessions only",
                body: "Only customers who booked and attended can leave a review.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <item.icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
            <div>
              <h3 className="font-display text-lg font-semibold">
                Need something specific?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                Tell us what you are looking for and we will match you with the
                right professional.
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() =>
                pushToast({
                  title: "Request received",
                  description:
                    "A matching specialist will be suggested within the hour.",
                  variant: "success",
                })
              }
              data-ocid="home.request_button"
            >
              Request a match
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
