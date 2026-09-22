import { BookingCard } from "@/components/BookingCard";
import { StatCard } from "@/components/StatCard";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookingsForProfessional } from "@/data/bookings";
import { getProfessional } from "@/data/professionals";
import { getReviewsForProfessional } from "@/data/reviews";
import { getTransactionsForProfessional } from "@/data/transactions";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Clock,
  DollarSign,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const PRO_ID = "p-01";

export default function ProDashboard() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const bookings = useMemo(() => getBookingsForProfessional(PRO_ID), []);
  const transactions = useMemo(
    () => getTransactionsForProfessional(PRO_ID),
    [],
  );
  const reviews = useMemo(() => getReviewsForProfessional(PRO_ID), []);

  const earnings = transactions
    .filter((transaction) => transaction.status === "paid")
    .reduce((total, transaction) => total + transaction.net, 0);

  const pending = bookings.filter((booking) =>
    ["pending", "confirmed", "in-progress"].includes(booking.status),
  );

  if (!professional) return null;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Professional portal
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Welcome back, {professional.name.split(" ")[0]}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Here is how your practice is performing this month.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/pro/availability"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary"
          >
            <Clock className="size-4" />
            Availability
          </Link>
          <Link
            to="/pro/services"
            data-ocid="pro_dashboard.manage_services_button"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5"
          >
            Manage services
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Net earnings"
          value={`$${earnings.toLocaleString()}`}
          icon={DollarSign}
          trend={12}
          hint="Last 30 days"
          index={0}
        />
        <StatCard
          label="Active bookings"
          value={`${pending.length}`}
          icon={CalendarCheck}
          trend={8}
          hint="2 awaiting confirmation"
          tone="accent"
          index={1}
        />
        <StatCard
          label="Profile views"
          value="1,284"
          icon={Users}
          trend={-3}
          hint="Down slightly this week"
          tone="warning"
          index={2}
        />
        <StatCard
          label="Average rating"
          value={professional.rating.toFixed(1)}
          icon={Star}
          hint={`From ${professional.reviewCount} reviews`}
          tone="success"
          index={3}
        />
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Upcoming bookings
            </h2>
            <Link
              to="/pro/bookings"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
            >
              All bookings
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4"
          >
            {pending.slice(0, 3).map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                counterpartName={booking.customerName}
                counterpartAvatar={booking.customerAvatar}
                counterpartRole="Customer"
                index={index}
                actions={
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      pushToast({
                        title: "Booking accepted",
                        description: `${booking.customerName} has been notified.`,
                        variant: "success",
                      })
                    }
                    data-ocid={`pro_dashboard.accept_button.${index + 1}`}
                  >
                    Accept
                  </Button>
                }
              />
            ))}
          </motion.div>
        </section>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile strength</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar
                  src={professional.avatar}
                  name={professional.name}
                  size="lg"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {professional.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {professional.profession}
                  </p>
                  {professional.verified ? (
                    <Badge variant="accent" className="mt-1.5">
                      <BadgeCheck className="size-3" />
                      Verified
                    </Badge>
                  ) : null}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Completeness</span>
                  <span className="font-mono font-semibold">92%</span>
                </div>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full w-[92%] rounded-full bg-gradient-signal" />
                </span>
              </div>

              <ul className="space-y-2 text-sm">
                {[
                  { label: "Identity verified", done: true },
                  { label: "Credentials uploaded", done: true },
                  { label: "Portfolio added", done: true },
                  { label: "Availability set", done: false },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    <span
                      className={
                        item.done
                          ? "grid size-5 place-items-center rounded-full bg-success/12 text-success"
                          : "grid size-5 place-items-center rounded-full bg-muted text-muted-foreground"
                      }
                    >
                      <BadgeCheck className="size-3" />
                    </span>
                    <span
                      className={
                        item.done ? "text-foreground" : "text-muted-foreground"
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/pro/availability"
                className="inline-flex h-10 w-full items-center justify-center rounded-full border border-border bg-card text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary"
              >
                Complete your profile
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reviews.slice(0, 2).map((review) => (
                <motion.div
                  key={review.id}
                  variants={staggerItem}
                  className="rounded-lg bg-muted/50 p-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium">
                      {review.authorName}
                    </p>
                    <span className="inline-flex items-center gap-1 font-mono text-xs">
                      <Star className="size-3 fill-accent text-accent" />
                      {review.rating}.0
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
              <Link
                to="/pro/reviews"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
              >
                All reviews
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="space-y-3 p-5">
              <TrendingUp className="size-5" />
              <p className="font-display text-base font-semibold">
                You are in the top 10% this month
              </p>
              <p className="text-xs leading-relaxed text-primary-foreground/85">
                Your response time and completion rate are both above the
                platform average.
              </p>
              <Link
                to="/pro/earnings"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-card px-5 text-sm font-medium text-primary transition-smooth hover:-translate-y-0.5"
              >
                <MessageSquare className="size-4" />
                View earnings
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
