import { StatCard } from "@/components/StatCard";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { Search as SearchField } from "@/components/ui/search";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { adminUsers } from "@/data/admin";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { AdminUser, Role } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Ban,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  RotateCcw,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 8;

type SortKey = "name" | "joinedAt" | "bookings";
type SortDirection = "asc" | "desc";

const ROLE_LABEL: Record<Role, string> = {
  customer: "Customer",
  professional: "Professional",
  admin: "Admin",
};

const ROLE_VARIANT: Record<Role, "primary" | "accent" | "neutral"> = {
  customer: "neutral",
  professional: "primary",
  admin: "accent",
};

const STATUS_VARIANT: Record<
  AdminUser["status"],
  "success" | "warning" | "destructive"
> = {
  active: "success",
  pending: "warning",
  suspended: "destructive",
};

const STATUS_LABEL: Record<AdminUser["status"], string> = {
  active: "Active",
  pending: "Pending",
  suspended: "Suspended",
};

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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

export default function AdminUsers() {
  const { pushToast } = useApp();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | AdminUser["status"]>(
    "all",
  );
  const [sortKey, setSortKey] = useState<SortKey>("joinedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, AdminUser["status"]>
  >({});

  const users = useMemo(
    () =>
      adminUsers.map((user) =>
        statusOverrides[user.id]
          ? { ...user, status: statusOverrides[user.id] }
          : user,
      ),
    [statusOverrides],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const rows = users.filter((user) => {
      const matchesTerm =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toLowerCase().includes(term);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      return matchesTerm && matchesRole && matchesStatus;
    });

    const sorted = [...rows].sort((a, b) => {
      if (sortKey === "bookings") return a.bookings - b.bookings;
      if (sortKey === "name") return a.name.localeCompare(b.name);
      return a.joinedAt.localeCompare(b.joinedAt);
    });

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [users, query, roleFilter, statusFilter, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const selected = useMemo(
    () => users.find((user) => user.id === selectedId) ?? null,
    [users, selectedId],
  );

  const stats = useMemo(
    () => ({
      total: users.length,
      professionals: users.filter((user) => user.role === "professional")
        .length,
      suspended: users.filter((user) => user.status === "suspended").length,
      pending: users.filter((user) => user.status === "pending").length,
    }),
    [users],
  );

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
    setPage(1);
  };

  const setStatus = (user: AdminUser, status: AdminUser["status"]) => {
    setStatusOverrides((current) => ({ ...current, [user.id]: status }));
    pushToast({
      title:
        status === "suspended"
          ? `${user.name} suspended`
          : status === "active"
            ? `${user.name} reinstated`
            : `${user.name} marked pending`,
      description:
        status === "suspended"
          ? "Their listings are hidden and new bookings are blocked."
          : "The change is visible across the marketplace immediately.",
      variant: status === "suspended" ? "error" : "success",
    });
  };

  const resetFilters = () => {
    setQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
    setPage(1);
  };

  const hasFilters =
    query.trim().length > 0 || roleFilter !== "all" || statusFilter !== "all";

  return (
    <div className="space-y-6" data-ocid="admin_users.page">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Admin console
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Users
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every account on LookApp — customers, professionals and staff.
            Search, filter and open a profile to review activity or change
            access.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            pushToast({
              title: "Invite link copied",
              description: "Share it with a teammate to grant console access.",
              variant: "success",
            })
          }
          data-ocid="admin_users.invite_button"
        >
          <Mail className="size-4" />
          Invite user
        </Button>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Total accounts"
          value={stats.total.toLocaleString()}
          icon={Users}
          trend={6}
          hint="Across all roles"
          index={0}
        />
        <StatCard
          label="Professionals"
          value={stats.professionals.toLocaleString()}
          icon={ShieldCheck}
          trend={4}
          hint="Verified and pending"
          tone="accent"
          index={1}
        />
        <StatCard
          label="Pending review"
          value={stats.pending.toLocaleString()}
          icon={CalendarDays}
          hint="Awaiting onboarding"
          tone="warning"
          index={2}
        />
        <StatCard
          label="Suspended"
          value={stats.suspended.toLocaleString()}
          icon={Ban}
          trend={-2}
          hint="Access currently blocked"
          tone="success"
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
              placeholder="Search by name, email or account ID"
              aria-label="Search users"
              containerClassName="w-full lg:max-w-md"
              data-ocid="admin_users.search_input"
            />
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="admin-users-role">
                Filter by role
              </label>
              <select
                id="admin-users-role"
                value={roleFilter}
                onChange={(event) => {
                  setRoleFilter(event.target.value as "all" | Role);
                  setPage(1);
                }}
                data-ocid="admin_users.role_select"
                className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="all">All roles</option>
                <option value="customer">Customers</option>
                <option value="professional">Professionals</option>
                <option value="admin">Admins</option>
              </select>
              <label className="sr-only" htmlFor="admin-users-status">
                Filter by status
              </label>
              <select
                id="admin-users-status"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(
                    event.target.value as "all" | AdminUser["status"],
                  );
                  setPage(1);
                }}
                data-ocid="admin_users.status_select"
                className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              {hasFilters ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  data-ocid="admin_users.reset_button"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              ) : null}
            </div>
          </div>

          <Tabs
            items={[
              { value: "all", label: "All", count: users.length },
              {
                value: "customer",
                label: "Customers",
                count: users.filter((user) => user.role === "customer").length,
              },
              {
                value: "professional",
                label: "Professionals",
                count: users.filter((user) => user.role === "professional")
                  .length,
              },
              {
                value: "admin",
                label: "Admins",
                count: users.filter((user) => user.role === "admin").length,
              },
            ]}
            value={roleFilter}
            onValueChange={(value) => {
              setRoleFilter(value as "all" | Role);
              setPage(1);
            }}
            listClassName="max-w-2xl"
          />

          {pageRows.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No accounts match these filters"
              description="Try a different role or status, or clear the search to see every account again."
              action={
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetFilters}
                  data-ocid="admin_users.empty_reset_button"
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
                    data-ocid="admin_users.table"
                  >
                    <thead className="sticky top-0 z-10 bg-muted/70 backdrop-blur">
                      <tr className="border-b border-border/60">
                        <SortHeader
                          label="Account"
                          sortKey="name"
                          activeKey={sortKey}
                          direction={sortDirection}
                          onSort={handleSort}
                        />
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                        >
                          Status
                        </th>
                        <SortHeader
                          label="Joined"
                          sortKey="joinedAt"
                          activeKey={sortKey}
                          direction={sortDirection}
                          onSort={handleSort}
                        />
                        <SortHeader
                          label="Bookings"
                          sortKey="bookings"
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
                      {pageRows.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          variants={staggerItem}
                          initial="hidden"
                          animate="visible"
                          className="border-b border-border/40 transition-smooth last:border-0 hover:bg-muted/40"
                          data-ocid={`admin_users.row.${index + 1}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <Avatar
                                src={user.avatar}
                                name={user.name}
                                size="sm"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-medium text-foreground">
                                  {user.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={ROLE_VARIANT[user.role]}>
                              {ROLE_LABEL[user.role]}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={STATUS_VARIANT[user.status]}>
                              {STATUS_LABEL[user.status]}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                            {formatDate(user.joinedAt)}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-sm">
                            {user.bookings.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedId(user.id)}
                              data-ocid={`admin_users.view_button.${index + 1}`}
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
                data-ocid="admin_users.list"
              >
                {pageRows.map((user, index) => (
                  <motion.li
                    key={user.id}
                    variants={staggerItem}
                    className="rounded-[var(--radius)] border border-border/60 bg-card p-4 shadow-elevated"
                    data-ocid={`admin_users.item.${index + 1}`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar src={user.avatar} name={user.name} size="md" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <Badge variant={ROLE_VARIANT[user.role]}>
                            {ROLE_LABEL[user.role]}
                          </Badge>
                          <Badge variant={STATUS_VARIANT[user.status]}>
                            {STATUS_LABEL[user.status]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-border/40 pt-3 text-xs">
                      <div>
                        <dt className="text-muted-foreground">Joined</dt>
                        <dd className="mt-0.5 font-mono">
                          {formatDate(user.joinedAt)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Bookings</dt>
                        <dd className="mt-0.5 font-mono">
                          {user.bookings.toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => setSelectedId(user.id)}
                      data-ocid={`admin_users.view_button.${index + 1}`}
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
                  accounts
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
                    data-ocid="admin_users.pagination_prev"
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
                    data-ocid="admin_users.pagination_next"
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
        title={selected?.name ?? "Account"}
        description={selected ? ROLE_LABEL[selected.role] : undefined}
        className="max-w-md"
      >
        {selected ? (
          <div className="space-y-6" data-ocid="admin_users.detail_panel">
            <div className="flex items-center gap-4">
              <Avatar src={selected.avatar} name={selected.name} size="xl" />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold">
                  {selected.name}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {selected.email}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge variant={ROLE_VARIANT[selected.role]}>
                    {ROLE_LABEL[selected.role]}
                  </Badge>
                  <Badge variant={STATUS_VARIANT[selected.status]}>
                    {STATUS_LABEL[selected.status]}
                  </Badge>
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Account ID
                </dt>
                <dd className="mt-1 font-mono text-sm">{selected.id}</dd>
              </div>
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Joined
                </dt>
                <dd className="mt-1 font-mono text-sm">
                  {formatDate(selected.joinedAt)}
                </dd>
              </div>
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Bookings
                </dt>
                <dd className="mt-1 font-mono text-sm">
                  {selected.bookings.toLocaleString()}
                </dd>
              </div>
              <div className="rounded-[var(--radius)] border border-border/60 bg-muted/40 p-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Lifetime value
                </dt>
                <dd className="mt-1 font-mono text-sm">
                  ${(selected.bookings * 96).toLocaleString()}
                </dd>
              </div>
            </dl>

            <section className="space-y-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Recent activity
              </h3>
              <ol className="space-y-3">
                {[
                  {
                    icon: CalendarDays,
                    title: "Booked a session",
                    detail: "Confirmed for next Tuesday at 10:00",
                    when: "2 days ago",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Completed a session",
                    detail: "Left a five-star review for the professional",
                    when: "1 week ago",
                  },
                  {
                    icon: UserRound,
                    title: "Updated profile details",
                    detail: "Changed contact email and timezone",
                    when: "3 weeks ago",
                  },
                ].map((entry) => (
                  <li key={entry.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                      <entry.icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{entry.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.detail}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                        {entry.when}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Account actions
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    pushToast({
                      title: "Password reset sent",
                      description: `A reset link was emailed to ${selected.email}.`,
                      variant: "success",
                    })
                  }
                  data-ocid="admin_users.reset_password_button"
                >
                  <Mail className="size-4" />
                  Send reset link
                </Button>
                {selected.status === "suspended" ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setStatus(selected, "active")}
                    data-ocid="admin_users.reinstate_button"
                  >
                    <CheckCircle2 className="size-4" />
                    Reinstate account
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setStatus(selected, "suspended")}
                    data-ocid="admin_users.suspend_button"
                  >
                    <Ban className="size-4" />
                    Suspend account
                  </Button>
                )}
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
