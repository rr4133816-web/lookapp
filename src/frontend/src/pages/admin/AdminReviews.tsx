import { StatCard } from "@/components/StatCard";
import { PageHeader, PageTransition } from "@/components/layout/PageTransition";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Modal } from "@/components/ui/modal";
import { Rating } from "@/components/ui/rating";
import { Search } from "@/components/ui/search";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { getProfessional } from "@/data/professionals";
import { reviews as seedReviews } from "@/data/reviews";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Review } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Flag,
  MessageSquareQuote,
  SearchX,
  ShieldCheck,
  Star,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

type ModerationStatus = "published" | "flagged" | "removed";

interface ModerationEntry {
  review: Review;
  status: ModerationStatus;
}

type PendingAction = "flag" | "remove" | "approve";

const STATUS_VARIANT = {
  published: "success",
  flagged: "warning",
  removed: "destructive",
} as const;

const STATUS_LABEL: Record<ModerationStatus, string> = {
  published: "Published",
  flagged: "Flagged",
  removed: "Removed",
};

const ACTION_COPY: Record<
  PendingAction,
  {
    title: string;
    description: string;
    confirm: string;
    variant: "primary" | "destructive" | "accent";
  }
> = {
  flag: {
    title: "Flag this review?",
    description:
      "Flagged reviews stay visible but are queued for a second moderator to inspect.",
    confirm: "Flag review",
    variant: "accent",
  },
  remove: {
    title: "Remove this review?",
    description:
      "Removing hides the review from the professional's public profile. This can be reversed from the removed tab.",
    confirm: "Remove review",
    variant: "destructive",
  },
  approve: {
    title: "Approve this review?",
    description:
      "Approving publishes the review and clears any flag raised against it.",
    confirm: "Approve review",
    variant: "primary",
  },
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars & below" },
] as const;

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminReviews() {
  const { pushToast } = useApp();
  const [entries, setEntries] = useState<ModerationEntry[]>(() =>
    seedReviews.map((review, index) => ({
      review,
      status: index % 11 === 5 ? "flagged" : "published",
    })),
  );
  const [tab, setTab] = useState<"all" | ModerationStatus>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<{
    entry: ModerationEntry;
    action: PendingAction;
  } | null>(null);
  const [isLoading] = useState(false);

  const counts = useMemo(() => {
    const published = entries.filter(
      (entry) => entry.status === "published",
    ).length;
    const flagged = entries.filter(
      (entry) => entry.status === "flagged",
    ).length;
    const removed = entries.filter(
      (entry) => entry.status === "removed",
    ).length;
    const average =
      entries.length === 0
        ? 0
        : entries.reduce((sum, entry) => sum + entry.review.rating, 0) /
          entries.length;
    return { published, flagged, removed, average };
  }, [entries]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (tab !== "all" && entry.status !== tab) return false;
      if (ratingFilter === "5" && entry.review.rating !== 5) return false;
      if (ratingFilter === "4" && entry.review.rating !== 4) return false;
      if (ratingFilter === "3" && entry.review.rating > 3) return false;
      if (!needle) return true;
      const professional = getProfessional(entry.review.professionalId);
      return [
        entry.review.authorName,
        entry.review.serviceName,
        entry.review.comment,
        professional?.name ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [entries, tab, ratingFilter, query]);

  const applyAction = (entry: ModerationEntry, action: PendingAction) => {
    const nextStatus: ModerationStatus =
      action === "flag"
        ? "flagged"
        : action === "remove"
          ? "removed"
          : "published";
    setEntries((current) =>
      current.map((item) =>
        item.review.id === entry.review.id
          ? { ...item, status: nextStatus }
          : item,
      ),
    );
    pushToast({
      variant: action === "remove" ? "error" : "success",
      title:
        action === "flag"
          ? "Review flagged"
          : action === "remove"
            ? "Review removed"
            : "Review approved",
      description: `${entry.review.authorName}'s review is now ${STATUS_LABEL[nextStatus].toLowerCase()}.`,
    });
  };

  const confirmPending = () => {
    if (!pending) return;
    applyAction(pending.entry, pending.action);
    setPending(null);
  };

  const tabs = [
    { value: "all", label: "All reviews", count: entries.length },
    { value: "published", label: "Published", count: counts.published },
    { value: "flagged", label: "Flagged", count: counts.flagged },
    { value: "removed", label: "Removed", count: counts.removed },
  ];

  const stats = [
    {
      label: "Total reviews",
      value: entries.length.toString(),
      icon: MessageSquareQuote,
      hint: "Across every category",
      tone: "primary" as const,
    },
    {
      label: "Average rating",
      value: counts.average.toFixed(2),
      icon: Star,
      hint: "Weighted across all reviews",
      tone: "accent" as const,
    },
    {
      label: "Flagged",
      value: counts.flagged.toString(),
      icon: Flag,
      hint: "Awaiting a second opinion",
      tone: "warning" as const,
    },
    {
      label: "Published",
      value: counts.published.toString(),
      icon: ShieldCheck,
      hint: "Live on professional profiles",
      tone: "success" as const,
    },
  ];

  return (
    <PageTransition className="space-y-8" data-ocid="admin.reviews.page">
      <PageHeader
        eyebrow="Admin console"
        title="Reviews moderation"
        description="Keep the marketplace trustworthy. Search, filter and act on customer reviews before they shape a professional's reputation."
      />

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Review moderation metrics"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            hint={stat.hint}
            tone={stat.tone}
            index={index}
          />
        ))}
      </motion.section>

      <Card data-ocid="admin.reviews.panel">
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs
              items={tabs}
              value={tab}
              onValueChange={(value) =>
                setTab(value as "all" | ModerationStatus)
              }
              className="lg:max-w-2xl"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Search
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onClear={() => setQuery("")}
                placeholder="Search reviewer, service or professional"
                aria-label="Search reviews"
                containerClassName="sm:w-72"
                data-ocid="admin.reviews.search_input"
              />
              <div className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/60 p-1">
                {FILTERS.map((filter) => {
                  const active = ratingFilter === filter.value;
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setRatingFilter(filter.value)}
                      data-ocid={`admin.reviews.rating_filter.${filter.value}`}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-smooth",
                        active
                          ? "bg-card text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} />
          ) : visible.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No reviews match these filters"
              description="Try a different status tab, clear the rating filter, or search for another reviewer or service."
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setTab("all");
                    setRatingFilter("all");
                    setQuery("");
                  }}
                  data-ocid="admin.reviews.reset_button"
                >
                  Reset filters
                </Button>
              }
            />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-[var(--radius)] border border-border/60 lg:block">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-muted/70 backdrop-blur">
                    <tr className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Reviewer
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Professional
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Rating
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Review
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right font-semibold"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {visible.map((entry, index) => {
                        const professional = getProfessional(
                          entry.review.professionalId,
                        );
                        return (
                          <motion.tr
                            key={entry.review.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="border-t border-border/60 align-top transition-smooth hover:bg-muted/40"
                            data-ocid={`admin.reviews.row.${index + 1}`}
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={entry.review.authorAvatar}
                                  name={entry.review.authorName}
                                  size="sm"
                                />
                                <div className="min-w-0">
                                  <p className="truncate font-medium">
                                    {entry.review.authorName}
                                  </p>
                                  <p className="truncate font-mono text-xs text-muted-foreground">
                                    {formatDate(entry.review.date)}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="truncate font-medium">
                                {professional?.name ?? "Unknown professional"}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {entry.review.serviceName}
                              </p>
                            </td>
                            <td className="px-4 py-4">
                              <Rating
                                value={entry.review.rating}
                                showValue={false}
                                size="sm"
                              />
                            </td>
                            <td className="max-w-xs px-4 py-4">
                              <p className="line-clamp-2 text-muted-foreground">
                                {entry.review.comment}
                              </p>
                            </td>
                            <td className="px-4 py-4">
                              <Badge variant={STATUS_VARIANT[entry.status]}>
                                {STATUS_LABEL[entry.status]}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  aria-label={`Approve review by ${entry.review.authorName}`}
                                  disabled={entry.status === "published"}
                                  onClick={() =>
                                    setPending({ entry, action: "approve" })
                                  }
                                  data-ocid={`admin.reviews.approve_button.${index + 1}`}
                                >
                                  <CheckCircle2 />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  aria-label={`Flag review by ${entry.review.authorName}`}
                                  disabled={entry.status === "flagged"}
                                  onClick={() =>
                                    setPending({ entry, action: "flag" })
                                  }
                                  data-ocid={`admin.reviews.flag_button.${index + 1}`}
                                >
                                  <Flag />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  aria-label={`Remove review by ${entry.review.authorName}`}
                                  disabled={entry.status === "removed"}
                                  onClick={() =>
                                    setPending({ entry, action: "remove" })
                                  }
                                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                  data-ocid={`admin.reviews.remove_button.${index + 1}`}
                                >
                                  <Trash2 />
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <ul className="space-y-3 lg:hidden">
                <AnimatePresence initial={false}>
                  {visible.map((entry, index) => {
                    const professional = getProfessional(
                      entry.review.professionalId,
                    );
                    return (
                      <motion.li
                        key={entry.review.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-xs"
                        data-ocid={`admin.reviews.item.${index + 1}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <Avatar
                              src={entry.review.authorAvatar}
                              name={entry.review.authorName}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {entry.review.authorName}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {professional?.name ?? "Unknown professional"}
                              </p>
                            </div>
                          </div>
                          <Badge variant={STATUS_VARIANT[entry.status]}>
                            {STATUS_LABEL[entry.status]}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <Rating
                            value={entry.review.rating}
                            showValue={false}
                            size="sm"
                          />
                          <span className="font-mono text-xs text-muted-foreground">
                            {formatDate(entry.review.date)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {entry.review.comment}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={entry.status === "published"}
                            onClick={() =>
                              setPending({ entry, action: "approve" })
                            }
                            data-ocid={`admin.reviews.approve_button.${index + 1}`}
                          >
                            <CheckCircle2 />
                            Approve
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={entry.status === "flagged"}
                            onClick={() =>
                              setPending({ entry, action: "flag" })
                            }
                            data-ocid={`admin.reviews.flag_button.${index + 1}`}
                          >
                            <Flag />
                            Flag
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={entry.status === "removed"}
                            onClick={() =>
                              setPending({ entry, action: "remove" })
                            }
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            data-ocid={`admin.reviews.remove_button.${index + 1}`}
                          >
                            <Trash2 />
                            Remove
                          </Button>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </>
          )}
        </CardContent>
      </Card>

      <Modal
        open={pending !== null}
        onClose={() => setPending(null)}
        title={pending ? ACTION_COPY[pending.action].title : ""}
        description={
          pending ? ACTION_COPY[pending.action].description : undefined
        }
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setPending(null)}
              data-ocid="admin.reviews.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant={
                pending ? ACTION_COPY[pending.action].variant : "primary"
              }
              onClick={confirmPending}
              data-ocid="admin.reviews.confirm_button"
            >
              {pending ? ACTION_COPY[pending.action].confirm : "Confirm"}
            </Button>
          </>
        }
      >
        {pending ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/40 p-3">
              <Avatar
                src={pending.entry.review.authorAvatar}
                name={pending.entry.review.authorName}
                size="sm"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {pending.entry.review.authorName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {pending.entry.review.serviceName} ·{" "}
                  {formatDate(pending.entry.review.date)}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pending.entry.review.comment}
            </p>
          </div>
        ) : null}
      </Modal>
    </PageTransition>
  );
}
