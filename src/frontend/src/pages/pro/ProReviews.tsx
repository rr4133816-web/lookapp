import { ReviewCard } from "@/components/ReviewCard";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs } from "@/components/ui/tabs";
import { getProfessional } from "@/data/professionals";
import { getReviewsForProfessional } from "@/data/reviews";
import { useApp } from "@/hooks/use-app";
import { staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import { useMemo, useState } from "react";

const PRO_ID = "p-01";

export default function ProReviews() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const reviews = useMemo(() => getReviewsForProfessional(PRO_ID), []);
  const [tab, setTab] = useState("all");

  const filtered = useMemo(
    () =>
      reviews.filter((review) =>
        tab === "all"
          ? true
          : tab === "five"
            ? review.rating === 5
            : review.rating < 5,
      ),
    [reviews, tab],
  );

  if (!professional) return null;

  const fiveStar = reviews.filter((review) => review.rating === 5).length;
  const helpfulTotal = reviews.reduce(
    (total, review) => total + review.helpful,
    0,
  );

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Reviews
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          What clients say
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Only customers who completed a session can leave a review, so every
          rating here reflects real work.
        </p>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Average rating"
          value={professional.rating.toFixed(1)}
          icon={Star}
          hint={`From ${professional.reviewCount} reviews`}
          index={0}
        />
        <StatCard
          label="Five-star reviews"
          value={`${fiveStar}`}
          icon={Star}
          tone="accent"
          hint={`${Math.round((fiveStar / Math.max(reviews.length, 1)) * 100)}% of recent`}
          index={1}
        />
        <StatCard
          label="Helpful votes"
          value={`${helpfulTotal}`}
          icon={ThumbsUp}
          tone="success"
          hint="Across all reviews"
          index={2}
        />
        <StatCard
          label="Response rate"
          value="98%"
          icon={MessageSquare}
          tone="warning"
          hint="Replies within 24 hours"
          index={3}
        />
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-4">
          <Tabs
            items={[
              { value: "all", label: "All reviews", count: reviews.length },
              { value: "five", label: "Five star", count: fiveStar },
              {
                value: "other",
                label: "Four star and below",
                count: reviews.length - fiveStar,
              },
            ]}
            value={tab}
            onValueChange={setTab}
          />

          {filtered.length === 0 ? (
            <EmptyState
              icon={Star}
              title="No reviews in this view"
              description="Try another tab to see the rest of your feedback."
            />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2"
            >
              {filtered.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </motion.div>
          )}
        </div>

        <aside className="space-y-4">
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

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reply to a review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A short, specific reply shows prospective customers how you
                handle feedback.
              </p>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() =>
                  pushToast({
                    title: "Reply drafted",
                    description: "Your response will appear under the review.",
                    variant: "success",
                  })
                }
                data-ocid="pro_reviews.reply_button"
              >
                <MessageSquare className="size-4" />
                Write a reply
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
