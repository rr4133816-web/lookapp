import { ProfessionalCard } from "@/components/ProfessionalCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { Search as SearchField } from "@/components/ui/search";
import { ProfessionalCardSkeleton } from "@/components/ui/skeleton";
import { categories } from "@/data/categories";
import { professionals } from "@/data/professionals";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Compass, SearchX, SlidersHorizontal, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SORT_OPTIONS = [
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "experience", label: "Most experienced" },
] as const;

const PRICE_BANDS = [
  { value: "any", label: "Any price" },
  { value: "under-120", label: "Under $120" },
  { value: "120-200", label: "$120 – $200" },
  { value: "over-200", label: "Over $200" },
] as const;

const RATING_OPTIONS = [
  { value: "any", label: "Any rating" },
  { value: "4.5", label: "4.5 and up" },
  { value: "4.8", label: "4.8 and up" },
  { value: "4.9", label: "4.9 and up" },
] as const;

const EXPERIENCE_OPTIONS = [
  { value: "any", label: "Any experience" },
  { value: "5", label: "5+ years" },
  { value: "8", label: "8+ years" },
  { value: "10", label: "10+ years" },
] as const;

const AVAILABILITY_OPTIONS = [
  { value: "any", label: "Any day" },
  { value: "Mon", label: "Mondays" },
  { value: "Tue", label: "Tuesdays" },
  { value: "Wed", label: "Wednesdays" },
  { value: "Thu", label: "Thursdays" },
  { value: "Fri", label: "Fridays" },
  { value: "Sat", label: "Saturdays" },
  { value: "Sun", label: "Sundays" },
] as const;

const LOCATION_OPTIONS = [
  { value: "any", label: "Anywhere" },
  { value: "Austin, TX", label: "Austin, TX" },
  { value: "Seattle, WA", label: "Seattle, WA" },
  { value: "New York, NY", label: "New York, NY" },
  { value: "Chicago, IL", label: "Chicago, IL" },
  { value: "Denver, CO", label: "Denver, CO" },
  { value: "Remote", label: "Remote" },
] as const;

const SELECT_CLASS =
  "h-11 w-full rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30";

export default function Discover() {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading] = useState(false);

  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const location = params.get("location") ?? "any";
  const rating = params.get("rating") ?? "any";
  const priceBand = params.get("price") ?? "any";
  const availability = params.get("availability") ?? "any";
  const experience = params.get("experience") ?? "any";
  const verifiedOnly = params.get("verified") === "1";
  const sort = params.get("sort") ?? "rating";

  const updateParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(params);
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "" || value === "any") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    }
    setParams(nextParams, { replace: true });
  };

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = professionals.filter((professional) => {
      const matchesTerm =
        !term ||
        professional.name.toLowerCase().includes(term) ||
        professional.profession.toLowerCase().includes(term) ||
        professional.bio.toLowerCase().includes(term) ||
        professional.location.toLowerCase().includes(term) ||
        professional.services.some((service) =>
          service.name.toLowerCase().includes(term),
        );
      const matchesCategory =
        category === "all" || professional.category === category;
      const matchesLocation =
        location === "any" || professional.location === location;
      const matchesRating =
        rating === "any" || professional.rating >= Number(rating);
      const matchesVerified = !verifiedOnly || professional.verified;
      const matchesPrice =
        priceBand === "any" ||
        (priceBand === "under-120" && professional.startingPrice < 120) ||
        (priceBand === "120-200" &&
          professional.startingPrice >= 120 &&
          professional.startingPrice <= 200) ||
        (priceBand === "over-200" && professional.startingPrice > 200);
      const matchesAvailability =
        availability === "any" ||
        professional.availability.includes(availability);
      const matchesExperience =
        experience === "any" ||
        professional.yearsExperience >= Number(experience);
      return (
        matchesTerm &&
        matchesCategory &&
        matchesLocation &&
        matchesRating &&
        matchesVerified &&
        matchesPrice &&
        matchesAvailability &&
        matchesExperience
      );
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.startingPrice - b.startingPrice;
      if (sort === "price-desc") return b.startingPrice - a.startingPrice;
      if (sort === "experience") return b.yearsExperience - a.yearsExperience;
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    });

    return list;
  }, [
    query,
    category,
    location,
    rating,
    sort,
    priceBand,
    availability,
    experience,
    verifiedOnly,
  ]);

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    (location !== "any" ? 1 : 0) +
    (rating !== "any" ? 1 : 0) +
    (priceBand !== "any" ? 1 : 0) +
    (availability !== "any" ? 1 : 0) +
    (experience !== "any" ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const resetFilters = () => {
    setParams({}, { replace: true });
  };

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Category
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={category === "all"}
            onClick={() => updateParams({ category: null })}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-smooth",
              category === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            All fields
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={category === item.slug}
              onClick={() => updateParams({ category: item.slug })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-smooth",
                category === item.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="discover-location"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Location
        </label>
        <select
          id="discover-location"
          value={location}
          onChange={(event) => updateParams({ location: event.target.value })}
          data-ocid="discover.location_select"
          className={cn(SELECT_CLASS, "mt-3")}
        >
          {LOCATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="discover-rating"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Minimum rating
        </label>
        <select
          id="discover-rating"
          value={rating}
          onChange={(event) => updateParams({ rating: event.target.value })}
          data-ocid="discover.rating_select"
          className={cn(SELECT_CLASS, "mt-3")}
        >
          {RATING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Starting price
        </p>
        <div className="mt-3 space-y-2">
          {PRICE_BANDS.map((band) => (
            <label
              key={band.value}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <input
                type="radio"
                name="price-band"
                checked={priceBand === band.value}
                onChange={() => updateParams({ price: band.value })}
                className="size-4 accent-[oklch(var(--primary))]"
              />
              {band.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="discover-availability"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Availability
        </label>
        <select
          id="discover-availability"
          value={availability}
          onChange={(event) =>
            updateParams({ availability: event.target.value })
          }
          data-ocid="discover.availability_select"
          className={cn(SELECT_CLASS, "mt-3")}
        >
          {AVAILABILITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="discover-experience"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Experience
        </label>
        <select
          id="discover-experience"
          value={experience}
          onChange={(event) => updateParams({ experience: event.target.value })}
          data-ocid="discover.experience_select"
          className={cn(SELECT_CLASS, "mt-3")}
        >
          {EXPERIENCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trust
        </p>
        <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(event) =>
              updateParams({ verified: event.target.checked ? "1" : null })
            }
            className="size-4 accent-[oklch(var(--primary))]"
          />
          Verified professionals only
        </label>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={resetFilters}
        data-ocid="discover.reset_button"
      >
        Reset all filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Discover
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Find your professional
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Filter by field, price and verification status. Every profile shows
            real credentials and reviews from completed sessions.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchField
            value={query}
            onChange={(event) => updateParams({ q: event.target.value })}
            onClear={() => updateParams({ q: null })}
            placeholder="Search by skill, name or location"
            aria-label="Search professionals"
            containerClassName="flex-1"
            data-ocid="discover.search_input"
          />
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="discover-sort">
              Sort results
            </label>
            <select
              id="discover-sort"
              value={sort}
              onChange={(event) => updateParams({ sort: event.target.value })}
              data-ocid="discover.sort_select"
              className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden"
              data-ocid="discover.filters_button"
            >
              <SlidersHorizontal className="size-4" />
              Filters
              {activeFilterCount > 0 ? (
                <Badge variant="primary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              ) : null}
            </Button>
          </div>
        </div>

        {activeFilterCount > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Active filters:
            </span>
            {category !== "all" ? (
              <button
                type="button"
                onClick={() => updateParams({ category: null })}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15"
              >
                {categories.find((item) => item.slug === category)?.name}
                <X className="size-3" />
              </button>
            ) : null}
            {location !== "any" ? (
              <button
                type="button"
                onClick={() => updateParams({ location: null })}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15"
              >
                {location}
                <X className="size-3" />
              </button>
            ) : null}
            {rating !== "any" ? (
              <button
                type="button"
                onClick={() => updateParams({ rating: null })}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15"
              >
                {
                  RATING_OPTIONS.find((option) => option.value === rating)
                    ?.label
                }
                <X className="size-3" />
              </button>
            ) : null}
            {priceBand !== "any" ? (
              <button
                type="button"
                onClick={() => updateParams({ price: null })}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15"
              >
                {PRICE_BANDS.find((band) => band.value === priceBand)?.label}
                <X className="size-3" />
              </button>
            ) : null}
            {availability !== "any" ? (
              <button
                type="button"
                onClick={() => updateParams({ availability: null })}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15"
              >
                {
                  AVAILABILITY_OPTIONS.find(
                    (option) => option.value === availability,
                  )?.label
                }
                <X className="size-3" />
              </button>
            ) : null}
            {experience !== "any" ? (
              <button
                type="button"
                onClick={() => updateParams({ experience: null })}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15"
              >
                {
                  EXPERIENCE_OPTIONS.find(
                    (option) => option.value === experience,
                  )?.label
                }
                <X className="size-3" />
              </button>
            ) : null}
            {verifiedOnly ? (
              <button
                type="button"
                onClick={() => updateParams({ verified: null })}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent transition-smooth hover:bg-accent/15"
              >
                Verified only
                <X className="size-3" />
              </button>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Filters</p>
              <Star className="size-4 text-accent" />
            </div>
            {filterPanel}
          </div>
        </aside>

        <div className="min-w-0 space-y-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-mono font-semibold text-foreground">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "professional" : "professionals"} found
          </p>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from(
                { length: 6 },
                (_, index) => `discover-skeleton-${index}`,
              ).map((id) => (
                <ProfessionalCardSkeleton key={id} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No professionals match those filters"
              description="Try widening the price range, choosing a different field, or clearing your search term."
              action={
                <Button
                  type="button"
                  onClick={resetFilters}
                  data-ocid="discover.empty_reset_button"
                >
                  <Compass className="size-4" />
                  Reset filters
                </Button>
              }
            />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {results.map((professional, index) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        description="Narrow down the professionals you see."
        side="left"
        footer={
          <Button
            type="button"
            className="w-full"
            onClick={() => setFiltersOpen(false)}
            data-ocid="discover.apply_filters_button"
          >
            Show {results.length} results
          </Button>
        }
      >
        {filterPanel}
      </Drawer>
    </div>
  );
}
