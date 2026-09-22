import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Review } from "@/types";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export interface ReviewCardProps {
  review: Review;
  className?: string;
  index?: number;
}

/** Customer review with rating, service context and a helpful action. */
export function ReviewCard({ review, className, index = 0 }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [marked, setMarked] = useState(false);

  return (
    <motion.article
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated",
        className,
      )}
      data-ocid={`review.card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            src={review.authorAvatar}
            name={review.authorName}
            size="sm"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{review.authorName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {review.serviceName}
            </p>
          </div>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted-foreground">
          {new Date(`${review.date}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <Rating value={review.rating} showValue={false} size="sm" />

      <p className="text-sm leading-relaxed text-muted-foreground">
        {review.comment}
      </p>

      <button
        type="button"
        aria-pressed={marked}
        onClick={() => {
          setMarked((current) => !current);
          setHelpful((current) => (marked ? current - 1 : current + 1));
        }}
        data-ocid={`review.helpful_button.${index + 1}`}
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-smooth",
          marked
            ? "border-accent/40 bg-accent-soft text-accent"
            : "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-foreground",
        )}
      >
        <ThumbsUp className={cn("size-3.5", marked && "fill-accent")} />
        Helpful · <span className="font-mono">{helpful}</span>
      </button>
    </motion.article>
  );
}
