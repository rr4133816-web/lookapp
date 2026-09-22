import { StatCard } from "@/components/StatCard";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { Rating } from "@/components/ui/rating";
import { Search as SearchField } from "@/components/ui/search";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { categories, getCategory } from "@/data/categories";
import { professionals } from "@/data/professionals";
import { getTransactionsForProfessional } from "@/data/transactions";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CategorySlug, Professional } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
  RotateCcw,
  ShieldAlert,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 8;

type SortKey = "rating" | "completedJobs" | "startingPrice" | "name";
type SortDirection = "asc" | "desc";
type VerificationFilter = "all" | "verified" | "unverified";
type RatingFilter = "all" | "4.5" | "4.8";

function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`;
}

function SortHeader({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}) {
  const isActive = activeKey === sortKey;
  return (
    <th
      scope="col"
      className={cn(
        "px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
        align === "right" ? "text-right" : "text-left",
      )}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        aria-label={`Sort by ${label}`}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md transition-smooth hover:text-foreground",
          isActive && "text-foreground",
          align === "right" && "flex-row-reverse",
        )}
      >
        {label}
        <ArrowUpDown
          className={cn(
            "size-3.5 transition-smooth",
            isActive ? "text-primary" : "text-muted-foreground/60",
          )}
        />
        {isActive ? (
          <span className="sr-only">
            {direction === "asc" ? "ascending" : "descending"}
          </span>
        ) : null}
      </button>
    </th>
  );
}

export default function AdminProfessionals() {
  const { pushToast } = useApp();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | CategorySlug>(
    "all",
  );
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>("all");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [verificationOverrides, setVerificationOverrides] = useState<
    Record<string, boolean>
  >({});

  const roster = useMemo(
    () =>
      professionals.map((professional) =>
        professional.id in verificationOverrides
          ? {
              ...professional,
              verified: verificationOverrides[professional.id],
            }
          : professional,
      ),
    [verificationOverrides],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const rows = roster.filter((professional) => {
      const matchesTerm =
        !term ||
        professional.name.toLowerCase().includes(term) ||
        professional.profession.toLowerCase().includes(term) ||
        professional.location.toLowerCase().includes(term);
      const matchesCategory =
        categoryFilter === "all" || professional.category === categoryFilter;
      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified"
          ? professional.verified
          : !professional.verified);
      const matchesRating =
        ratingFilter === "all" || professional.rating >= Number(ratingFilter);
      return (
        matchesTerm && matchesCategory && matchesVerification && matchesRating
      );
    });

    const sorted = [...rows].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "completedJobs") return a.completedJobs - b.completedJobs;
      if (sortKey === "startingPrice") return a.startingPrice - b.startingPrice;
      return a.rating - b.rating;
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [
    roster,
    query,
    categoryFilter,
    verificationFilter,
    ratingFilter,
    sortKey,
    sortDirection,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const selected = useMemo(
    () => roster.find((professional) => professional.id === selectedId) ?? null,
    [roster, selectedId],
  );

  const stats = useMemo(() => {
    const verified = roster.filter(
      (professional) => professional.verified,
    ).length;
    const avgRating =
      roster.reduce((total, professional) => total + professional.rating, 0) /
      Math.max(1, roster.length);
    const avgPrice =
      roster.reduce(
        (total, professional) => total + professional.startingPrice,
        0,
      ) / Math.max(1, roster.length);
    return {
      total: roster.length,
      verified,
      unverified: roster.length - verified,
      avgRating,
      avgPrice,
    };
  }, [roster]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
    setPage(1);
  };

  const setVerified = (professional: Professional, verified: boolean) => {
    setVerificationOverrides((current) => ({
      ...current,
      [professional.id]: verified,
    }));
    pushToast({
      title: verified
        ? `${professional.name} verified`
        : `${professional.name} verification revoked`,
      description: verified
        ? "Their verified badge is now visible to customers."
        : "Their profile is flagged for a fresh document review.",
      variant: verified ? "success" : "error",
    });
  };

  const resetFilters = () => {
    setQuery("");
    setCategoryFilter("all");
    setVerificationFilter("all");
    setRatingFilter("all");
    setPage(1);
  };

  const hasFilters =
    query.trim().length > 0 ||
    categoryFilter !== "all" ||
    verificationFilter !== "all" ||
    ratingFilter !== "all";

  return (
    <div className="space-y-6" data-ocid="admin_professionals.page">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Admin console
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Professionals
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The supply side of the marketplace. Review credentials, compare
            performance and manage verification status.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            pushToast({
              title: "Roster exported",
              description: "A CSV of the current view has been prepared.",
              variant: "success",
            })
          }
          data-ocid="admin_professionals.export_button"
        >
          <TrendingUp className="size-4" />
          Export roster
        </Button>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Professionals"
          value={stats.total.toLocaleString()}
          icon={Users}
          trend={5}
          hint="Active on the marketplace"
          index={0}
        />
        <StatCard
          label="Verified"
          value={stats.verified.toLocaleString()}
          icon={BadgeCheck}
          trend={8}
          hint="Credentials confirmed"
          tone="accent"
          index={1}
        />
        <StatCard
          label="Average rating"
          value={stats.avgRating.toFixed(2)}
          icon={Star}
          trend={2}
          hint="Across all categories"
          tone="success"
          index={2}
        />
        <StatCard
          label="Avg. starting price"
          value={formatCurrency(Math.round(stats.avgPrice))}
          icon={DollarSign}
          hint="Per session"
          tone="warning"
          index={3}
        />
      </motion.section>

      <Card>
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <SearchField
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              onClear={() => {
                setQuery("");
                setPage(1);
              }}
              placeholder="Search by name, profession or location"
              aria-label="Search professionals"
              containerClassName="w-full lg:max-w-md"
              data-ocid="admin_professionals.search_input"
            />
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="admin-pros-category">
                Filter by category
              </label>
              <select
                id="admin-pros-category"
                value={categoryFilter}
                onChange={(event) => {
                  setCategoryFilter(event.target.value as "all" | CategorySlug);
                  setPage(1);
                }}
                data-ocid="admin_professionals.category_select"
                className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="admin-pros-verification">
                Filter by verification
              </label>
              <select
                id="admin-pros-verification"
                value={verificationFilter}
                onChange={(event) => {
                  setVerificationFilter(
                    event.target.value as VerificationFilter,
                  );
                  setPage(1);
                }}
                data-ocid="admin_professionals.verification_select"
                className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="all">Any verification</option>
                <option value="verified">Verified only</option>
                <option value="unverified">Unverified only</option>
              </select>
              <label className="sr-only" htmlFor="admin-pros-rating">
                Filter by rating
              </label>
              <select
                id="admin-pros-rating"
                value={ratingFilter}
                onChange={(event) => {
                  setRatingFilter(event.target.value as RatingFilter);
                  setPage(1);
                }}
                data-ocid="admin_professionals.rating_select"
                className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="all">Any rating</option>
                <option value="4.5">4.5 and above</option>
                <option value="4.8">4.8 and above</option>
              </select>
              {hasFilters ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  data-ocid="admin_professionals.reset_button"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              ) : null}
            </div>
          </div>

          <Tabs
            items={[
              { value: "all", label: "All", count: roster.length },
              {
                value: "verified",
                label: "Verified",
                count: roster.filter((professional) => professional.verified)
                  .length,
              },
              {
                value: "unverified",
                label: "Unverified",
                count: roster.filter((professional) => !professional.verified)
                  .length,
              },
            ]}
            value={verificationFilter}
            onValueChange={(value) => {
              setVerificationFilter(value as VerificationFilter);
              setPage(1);
            }}
            listClassName="max-w-md"
          />

          {pageRows.length === 0 ? (
            <EmptyState
              icon={ShieldAlert}
              title="No professionals match these filters"
              description="Try another category or verification state, or clear the search to see the full roster."
              action={
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetFilters}
                  data-ocid="admin_professionals.empty_reset_button"
                >
                  <RotateCcw className="size-4" />
                  Clear filters
                </Button>
              }
            />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-[var(--radius)] border border-border/60 md:block">
                <div className="overflow-x-auto">
                  <table
                    className="w-full border-collapse text-sm"
                    data-ocid="admin_professionals.table"
                  >
                    <thead className="sticky top-0 z-10 bg-muted/70 backdrop-blur">
                      <tr className="border-b border-border/60">
                        <SortHeader
                          label="Professional"
                          sortKey="name"
                          activeKey={sortKey}
                          direction={sortDirection}
                          onSort={handleSort}
                        />
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                        >
                          Verification
                        </th>
                        <SortHeader
                          label="Rating"
                          sortKey="rating"
                          activeKey={sortKey}
                          direction={sortDirection}
                          onSort={handleSort}
                        />
                        <SortHeader
                          label="Jobs"
                          sortKey="completedJobs"
                          activeKey={sortKey}
                          direction={sortDirection}
                          onSort={handleSort}
                          align="right"
                        />
                        <SortHeader
                          label="From"
                          sortKey="startingPrice"
                          activeKey={sortKey}
                          direction={sortDirection}
                          onSort={handleSort}
                          align="right"
                        />
                        <th scope="col" className="px-4 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((professional, index) => (
                        <motion.tr
                          key={professional.id}
                          variants={staggerItem}
                          initial="hidden"
                          animate="visible"
                          className="border-b border-border/40 transition-smooth last:border-0 hover:bg-muted/40"
                          data-ocid={`admin_professionals.row.${index + 1}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <Avatar
                                src={professional.avatar}
                                name={professional.name}
                                size="sm"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-medium text-foreground">
                                  {professional.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {professional.profession}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="neutral">
                              {getCategory(professional.category)?.name ??
                                professional.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                professional.verified ? "success" : "warning"
                              }
                            >
                              {professional.verified ? "Verified" : "Pending"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Rating
                              value={professional.rating}
                              count={professional.reviewCount}
                              size="sm"
                            />
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-sm">
                            {professional.completedJobs.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-sm">
                            {formatCurrency(professional.startingPrice)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedId(professional.id)}
                              data-ocid={`admin_professionals.view_button.${index + 1}`}
                            >
                              View
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile card list */}
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3 md:hidden"
                data-ocid="admin_professionals.list"
              >
                {pageRows.map((professional, index) => (
                  <motion.li
                    key={professional.id}
                    variants={staggerItem}
                    className="rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-elevated"
                    data-ocid={`admin_professionals.item.${index + 1}`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={professional.avatar}
                        name={professional.name}
                        size="md"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                          {professional.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {professional.profession}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <Badge
                            variant={
                              professional.verified ? "success" : "warning"
                            }
                          >
                            {professional.verified ? "Verified" : "Pending"}
                          </Badge>
                          <Badge variant="neutral">
                            {getCategory(professional.category)?.name ??
                              professional.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
                      <Rating
                        value={professional.rating}
                        count={professional.reviewCount}
                        size="sm"
                      />
                      <span className="font-mono text-sm">
                        {formatCurrency(professional.startingPrice)}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => setSelectedId(professional.id)}
                      data-ocid={`admin_professionals.view_button.${index + 1}`}
                    >
                      View profile
                    </Button>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-4 sm:flex-row">
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-mono text-foreground">
                    {(safePage - 1) * PAGE_SIZE + 1}–
                    {Math.min(safePage * PAGE_SIZE, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-mono text-foreground">
                    {filtered.length}
                  </span>{" "}
                  professionals
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={safePage <= 1}
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    data-ocid="admin_professionals.pagination_prev"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>
                  <span className="font-mono text-xs text-muted-foreground">
                    {safePage} / {totalPages}
                  </span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={safePage >= totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    data-ocid="admin_professionals.pagination_next"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Drawer
        open={selected !== null}
        onClose={() => setSelectedId(null)}
        title={selected?.name ?? "Professional"}
        description={selected?.profession}
        className="max-w-md"
      >
        {selected ? (
          <div
            className="space-y-6"
            data-ocid="admin_professionals.detail_panel"
          >
            <div className="flex items-center gap-4">
              <Avatar src={selected.avatar} name={selected.name} size="xl" />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold">
                  {selected.name}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {selected.profession}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge variant={selected.verified ? "success" : "warning"}>
                    {selected.verified ? "Verified" : "Pending review"}
                  </Badge>
                  {selected.topRated ? (
                    <Badge variant="accent">Top rated</Badge>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {selected.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                Replies {selected.responseTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="size-3.5" />
                {selected.yearsExperience} yrs experience
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Rating
                </dt>
                <dd className="mt-1">
                  <Rating
                    value={selected.rating}
                    count={selected.reviewCount}
                    size="sm"
                  />
                </dd>
              </div>
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Completed jobs
                </dt>
                <dd className="mt-1 font-mono text-sm">
                  {selected.completedJobs.toLocaleString()}
                </dd>
              </div>
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Starting price
                </dt>
                <dd className="mt-1 font-mono text-sm">
                  {formatCurrency(selected.startingPrice)}
                </dd>
              </div>
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Lifetime earnings
                </dt>
                <dd className="mt-1 font-mono text-sm">
                  {formatCurrency(
                    getTransactionsForProfessional(selected.id).reduce(
                      (total, transaction) => total + transaction.net,
                      0,
                    ) || selected.completedJobs * 118,
                  )}
                </dd>
              </div>
            </dl>

            <section className="space-y-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Services
              </h3>
              <ul className="space-y-2">
                {selected.services.map((service) => (
                  <li
                    key={service.id}
                    className="rounded-[var(--radius)] border border-border/60 bg-card p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {service.name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {service.durationMinutes} min
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-sm">
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Credentials
              </h3>
              {selected.credentials.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No credentials submitted yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {selected.credentials.map((credential) => (
                    <li key={credential.id} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Award className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {credential.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {credential.issuer} · {credential.year}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Verification actions
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.verified ? (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setVerified(selected, false)}
                    data-ocid="admin_professionals.revoke_button"
                  >
                    <ShieldAlert className="size-4" />
                    Revoke verification
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setVerified(selected, true)}
                    data-ocid="admin_professionals.approve_button"
                  >
                    <BadgeCheck className="size-4" />
                    Approve verification
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    pushToast({
                      title: "Profile flagged for review",
                      description: `${selected.name} will be re-checked within 24 hours.`,
                      variant: "default",
                    })
                  }
                  data-ocid="admin_professionals.flag_button"
                >
                  <ShieldAlert className="size-4" />
                  Flag profile
                </Button>
              </div>
            </section>
          </div>
        ) : (
          <TableSkeleton rows={4} />
        )}
      </Drawer>
    </div>
  );
}
