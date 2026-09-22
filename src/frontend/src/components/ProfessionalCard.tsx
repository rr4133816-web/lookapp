import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useApp } from "@/hooks/use-app";
import { cardHover, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Professional } from "@/types";
import { motion } from "framer-motion";
import { BadgeCheck, Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface ProfessionalCardProps {
  professional: Professional;
  className?: string;
  index?: number;
}

/** Marketplace professional card — media, identity, metadata, action. */
export function ProfessionalCard({
  professional,
  className,
  index = 0,
}: ProfessionalCardProps) {
  const { isFavorite, toggleFavorite, pushToast } = useApp();
  const favorite = isFavorite(professional.id);

  return (
    <motion.article
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated transition-smooth hover:shadow-elevated-lg",
        className,
      )}
      data-ocid={`professional.card.${index + 1}`}
    >
      <motion.div variants={cardHover} className="flex flex-1 flex-col">
        <div className="flex items-start gap-3 p-5 pb-3">
          <Avatar
            src={professional.avatar}
            name={professional.name}
            size="lg"
            online={professional.availability.length >= 5}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate font-display text-base font-semibold leading-tight">
                  <Link
                    to={`/app/professionals/${professional.id}`}
                    className="transition-smooth hover:text-primary"
                  >
                    {professional.name}
                  </Link>
                </h3>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {professional.profession}
                </p>
              </div>
              <button
                type="button"
                aria-label={
                  favorite
                    ? `Remove ${professional.name} from favourites`
                    : `Save ${professional.name} to favourites`
                }
                aria-pressed={favorite}
                onClick={() => {
                  toggleFavorite(professional.id);
                  pushToast({
                    title: favorite
                      ? `${professional.name} removed from favourites`
                      : `${professional.name} saved to favourites`,
                    variant: favorite ? "default" : "success",
                  });
                }}
                className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
              >
                <Heart
                  className={cn(
                    "size-4",
                    favorite && "fill-destructive text-destructive",
                  )}
                />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Rating
                value={professional.rating}
                count={professional.reviewCount}
                size="sm"
              />
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
          </div>
        </div>

        <p className="line-clamp-2 px-5 text-sm leading-relaxed text-muted-foreground">
          {professional.bio}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {professional.location}
          </span>
          <span className="font-mono">
            {professional.yearsExperience} yrs exp
          </span>
          <span className="font-mono">{professional.completedJobs} jobs</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 p-5 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              From
            </p>
            <p className="font-mono text-lg font-semibold leading-none">
              ${professional.startingPrice}
              <span className="text-xs font-normal text-muted-foreground">
                /session
              </span>
            </p>
          </div>
          <Link
            to={`/app/professionals/${professional.id}`}
            data-ocid={`professional.view_button.${index + 1}`}
            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92"
          >
            View profile
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
}
