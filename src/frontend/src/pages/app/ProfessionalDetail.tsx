import { ReviewCard } from "@/components/ReviewCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Rating } from "@/components/ui/rating";
import { Tabs } from "@/components/ui/tabs";
import { getProfessional } from "@/data/professionals";
import { getReviewsForProfessional } from "@/data/reviews";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import NotFound from "@/pages/NotFound";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  Clock,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProfessionalDetail() {
  const { id } = useParams<{ id: string }>();
  const professional = id ? getProfessional(id) : undefined;
  const { isFavorite, toggleFavorite, pushToast } = useApp();
  const [tab, setTab] = useState("services");

  const reviews = useMemo(
    () => (professional ? getReviewsForProfessional(professional.id) : []),
    [professional],
  );

  if (!professional) {
    return <NotFound />;
  }

  const favorite = isFavorite(professional.id);

  return (
    <div className="space-y-6">
      <Link
        to="/app/discover"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to discover
      </Link>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card shadow-elevated"
      >
        <div className="h-28 bg-gradient-primary md:h-36" />
        <div className="px-5 pb-6 md:px-8">
          <div className="-mt-12 flex flex-col gap-5 md:-mt-14 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Avatar
                src={professional.avatar}
                name={professional.name}
                size="xl"
                className="ring-4 ring-card"
              />
              <div className="min-w-0 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {professional.name}
                  </h1>
                  {professional.verified ? (
                    <Badge variant="accent">
                      <BadgeCheck className="size-3" />
                      Verified
                    </Badge>
                  ) : null}
                  {professional.topRated ? (
                    <Badge variant="primary">
                      <Star className="size-3" />
                      Top rated
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground md:text-base">
                  {professional.profession}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Rating
                    value={professional.rating}
                    count={professional.reviewCount}
                    size="md"
                  />
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {professional.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-3.5" />
                    Replies {professional.responseTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  toggleFavorite(professional.id);
                  pushToast({
                    title: favorite
                      ? `${professional.name} removed from favourites`
                      : `${professional.name} saved to favourites`,
                    variant: favorite ? "default" : "success",
                  });
                }}
                data-ocid="professional.favorite_button"
              >
                <Heart
                  className={
                    favorite ? "fill-destructive text-destructive" : ""
                  }
                />
                {favorite ? "Saved" : "Save"}
              </Button>
              <Link
                to="/app/messages"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary"
              >
                <MessageSquare className="size-4" />
                Message
              </Link>
              <Link
                to={`/app/book/${professional.id}`}
                data-ocid="professional.book_button"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92"
              >
                <CalendarCheck className="size-4" />
                Book a session
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Experience",
                value: `${professional.yearsExperience} years`,
                icon: Briefcase,
              },
              {
                label: "Sessions completed",
                value: `${professional.completedJobs}`,
                icon: CalendarCheck,
              },
              {
                label: "Starting price",
                value: `$${professional.startingPrice}`,
                icon: Award,
              },
              {
                label: "Languages",
                value: professional.languages.join(", "),
                icon: Globe,
              },
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

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <Tabs
            items={[
              {
                value: "services",
                label: "Services",
                count: professional.services.length,
              },
              { value: "about", label: "About" },
              {
                value: "portfolio",
                label: "Portfolio",
                count: professional.portfolio.length,
              },
              { value: "reviews", label: "Reviews", count: reviews.length },
            ]}
            value={tab}
            onValueChange={setTab}
          >
            {(active) => (
              <div className="pt-1">
                {active === "services" ? (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    {professional.services.map((service, index) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                      />
                    ))}
                  </motion.div>
                ) : null}

                {active === "about" ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          About {professional.name.split(" ")[0]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {professional.bio}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Credentials</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {professional.credentials.map((credential) => (
                          <div
                            key={credential.id}
                            className="flex items-start gap-3 rounded-lg bg-muted/50 p-3.5"
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                              <Award className="size-4" />
                            </span>
                            <div>
                              <p className="text-sm font-medium">
                                {credential.title}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {credential.issuer} · {credential.year}
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Availability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => {
                            const available =
                              professional.availability.includes(day);
                            return (
                              <span
                                key={day}
                                className={
                                  available
                                    ? "rounded-full bg-success/12 px-3 py-1.5 text-xs font-medium text-success"
                                    : "rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                                }
                              >
                                {day}
                              </span>
                            );
                          })}
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                          Times shown in {professional.timezone}. Exact slots
                          are confirmed at booking.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : null}

                {active === "portfolio" ? (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    {professional.portfolio.map((item) => (
                      <motion.article
                        key={item.id}
                        variants={staggerItem}
                        className="overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated transition-smooth hover:-translate-y-1 hover:shadow-elevated-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="aspect-[3/2] w-full object-cover"
                        />
                        <div className="p-5">
                          <h3 className="font-display text-base font-semibold">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                ) : null}

                {active === "reviews" ? (
                  reviews.length === 0 ? (
                    <EmptyState
                      icon={Star}
                      title="No reviews yet"
                      description="This professional has not received a review from a completed session yet."
                    />
                  ) : (
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid gap-4 sm:grid-cols-2"
                    >
                      {reviews.map((review, index) => (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          index={index}
                        />
                      ))}
                    </motion.div>
                  )
                ) : null}
              </div>
            )}
          </Tabs>
        </div>

        <aside className="space-y-4">
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardContent className="space-y-4 p-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Starting from
                  </p>
                  <p className="mt-1 font-mono text-3xl font-semibold leading-none">
                    ${professional.startingPrice}
                    <span className="text-sm font-normal text-muted-foreground">
                      /session
                    </span>
                  </p>
                </div>
                <Link
                  to={`/app/book/${professional.id}`}
                  data-ocid="professional.sidebar_book_button"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92"
                >
                  <CalendarCheck className="size-4" />
                  Book a session
                </Link>
                <p className="text-center text-xs text-muted-foreground">
                  Free cancellation up to 24 hours before
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Rating breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const share =
                    star === 5
                      ? 82
                      : star === 4
                        ? 14
                        : star === 3
                          ? 3
                          : star === 2
                            ? 1
                            : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="inline-flex w-8 items-center gap-1 font-mono text-xs text-muted-foreground">
                        {star}
                        <Star className="size-3 fill-accent text-accent" />
                      </span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-gradient-signal"
                          style={{ width: `${share}%` }}
                        />
                      </span>
                      <span className="w-8 text-right font-mono text-xs text-muted-foreground">
                        {share}%
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
