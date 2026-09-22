import { StatCard } from "@/components/StatCard";
import { PageHeader, PageTransition } from "@/components/layout/PageTransition";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminUsers, disputes, verificationRequests } from "@/data/admin";
import { bookings } from "@/data/bookings";
import { transactions } from "@/data/transactions";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CircleDollarSign,
  Scale,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const CHART_COLORS = [
  "oklch(var(--chart-1))",
  "oklch(var(--chart-2))",
  "oklch(var(--chart-3))",
  "oklch(var(--chart-4))",
  "oklch(var(--chart-5))",
];

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"] as const;

const BOOKINGS_SERIES = [186, 214, 248, 231, 276, 312];
const REVENUE_SERIES = [24800, 28600, 33100, 30900, 37400, 42600];

const growthData = MONTHS.map((month, index) => ({
  month,
  bookings: BOOKINGS_SERIES[index],
  revenue: REVENUE_SERIES[index],
}));

const categoryData = [
  { name: "IT & Software", value: 34 },
  { name: "Accounting", value: 21 },
  { name: "Healthcare", value: 17 },
  { name: "Design", value: 15 },
  { name: "Other", value: 13 },
];

interface ActivityEntry {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "primary" | "accent" | "success" | "warning";
  icon: typeof Activity;
}

const activityFeed: ActivityEntry[] = [
  {
    id: "act-1",
    title: "Verification approved",
    detail: "Hannah Lindqvist — Forensic Accountant credentials cleared.",
    time: "12 minutes ago",
    tone: "success",
    icon: BadgeCheck,
  },
  {
    id: "act-2",
    title: "New dispute raised",
    detail: "DSP-2038 opened against Amara Okafor for $260.",
    time: "48 minutes ago",
    tone: "warning",
    icon: Scale,
  },
  {
    id: "act-3",
    title: "Payout batch settled",
    detail: "42 professional payouts totalling $18,420 released.",
    time: "3 hours ago",
    tone: "primary",
    icon: CircleDollarSign,
  },
  {
    id: "act-4",
    title: "Booking volume spike",
    detail: "Cloud Architecture Audit bookings up 24% week over week.",
    time: "6 hours ago",
    tone: "accent",
    icon: CalendarCheck,
  },
  {
    id: "act-5",
    title: "Account suspended",
    detail: "Elias Bergström suspended pending a compliance review.",
    time: "Yesterday",
    tone: "warning",
    icon: ShieldAlert,
  },
];

const TONE_CLASSES = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning-foreground dark:text-warning",
} as const;

const STATUS_VARIANT = {
  pending: "warning",
  approved: "success",
  rejected: "destructive",
} as const;

function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: { value?: number | string; name?: string }[];
  label?: string;
  formatter?: (value: number) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  const raw =
    typeof entry.value === "number" ? entry.value : Number(entry.value ?? 0);

  return (
    <div className="rounded-lg border border-border/60 bg-card px-3 py-2 shadow-elevated">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-sm font-semibold">
        {formatter ? formatter(raw) : raw.toLocaleString()}
      </p>
    </div>
  );
}

export default function AdminOverview() {
  const totalUsers = adminUsers.length + 1840;
  const professionalCount = adminUsers.filter(
    (user) => user.role === "professional",
  ).length;
  const pendingVerifications = verificationRequests.filter(
    (request) => request.status === "pending",
  ).length;
  const openDisputes = disputes.filter(
    (dispute) => dispute.status !== "resolved",
  ).length;
  const grossRevenue = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );
  const activeBookings = bookings.filter(
    (booking) =>
      booking.status === "confirmed" || booking.status === "in-progress",
  ).length;

  const stats = [
    {
      label: "Total users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      trend: 8.4,
      hint: `${professionalCount} verified professionals`,
      tone: "primary" as const,
    },
    {
      label: "Active bookings",
      value: activeBookings.toString(),
      icon: CalendarCheck,
      trend: 12.1,
      hint: "Confirmed and in progress",
      tone: "accent" as const,
    },
    {
      label: "Gross revenue",
      value: currency.format(grossRevenue),
      icon: CircleDollarSign,
      trend: 6.7,
      hint: "Last 30 days, all methods",
      tone: "success" as const,
    },
    {
      label: "Pending verifications",
      value: pendingVerifications.toString(),
      icon: BadgeCheck,
      trend: -3.2,
      hint: "Awaiting document review",
      tone: "warning" as const,
    },
    {
      label: "Open disputes",
      value: openDisputes.toString(),
      icon: Scale,
      trend: -1.8,
      hint: "Open or under review",
      tone: "primary" as const,
    },
    {
      label: "Platform health",
      value: "99.98%",
      icon: Activity,
      trend: 0.2,
      hint: "Uptime across the last 30 days",
      tone: "accent" as const,
    },
  ];

  const recentVerifications = verificationRequests.slice(0, 4);

  return (
    <PageTransition className="space-y-8" data-ocid="admin.overview.page">
      <PageHeader
        eyebrow="Admin console"
        title="Platform overview"
        description="A live read on marketplace growth, revenue and the moderation queue that keeps quality high."
        actions={
          <>
            <Button variant="secondary" size="sm" asChild={false}>
              <Link
                to="/admin/verification"
                data-ocid="admin.overview.verification_link"
              >
                Review queue
              </Link>
            </Button>
            <Button size="sm" asChild={false}>
              <Link
                to="/admin/transactions"
                data-ocid="admin.overview.revenue_link"
              >
                Revenue report
              </Link>
            </Button>
          </>
        }
      />

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        aria-label="Key platform metrics"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            hint={stat.hint}
            tone={stat.tone}
            index={index}
          />
        ))}
      </motion.section>

      <section className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2" data-ocid="admin.overview.growth_chart">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Bookings &amp; revenue</CardTitle>
              <CardDescription>
                Six-month trend across confirmed bookings and gross volume.
              </CardDescription>
            </div>
            <Badge variant="success">+12.1% MoM</Badge>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthData}
                  margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="adminRevenueFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="oklch(var(--chart-1))"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="oklch(var(--chart-1))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="oklch(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    tickFormatter={(value: number) =>
                      `$${Math.round(value / 1000)}k`
                    }
                  />
                  <Tooltip
                    content={
                      <ChartTooltip
                        formatter={(value) => currency.format(value)}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="oklch(var(--chart-1))"
                    strokeWidth={2.5}
                    fill="url(#adminRevenueFill)"
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card data-ocid="admin.overview.category_chart">
          <CardHeader>
            <CardTitle>Category distribution</CardTitle>
            <CardDescription>
              Share of bookings by service category this quarter.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="oklch(var(--border))"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    tickFormatter={(value: number) => `${value}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={92}
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <Tooltip
                    cursor={{ fill: "oklch(var(--muted) / 0.5)" }}
                    content={
                      <ChartTooltip formatter={(value) => `${value}%`} />
                    }
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          data-ocid="admin.overview.activity_feed"
        >
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Recent platform activity</CardTitle>
              <CardDescription>
                Moderation, payouts and marketplace signals as they happen.
              </CardDescription>
            </div>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-5">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {activityFeed.map((entry, index) => (
                <motion.li
                  key={entry.id}
                  variants={staggerItem}
                  className="flex items-start gap-3 rounded-lg px-2 py-3 transition-smooth hover:bg-muted/50"
                  data-ocid={`admin.overview.activity.${index + 1}`}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl",
                      TONE_CLASSES[entry.tone],
                    )}
                  >
                    <entry.icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">
                      {entry.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {entry.detail}
                    </p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-mono text-xs text-muted-foreground">
                    {entry.time}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>

        <Card data-ocid="admin.overview.verification_queue">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Verification queue</CardTitle>
              <CardDescription>Latest submitted credentials.</CardDescription>
            </div>
            <Badge variant="warning">{pendingVerifications} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {recentVerifications.map((request, index) => (
              <div
                key={request.id}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-3"
                data-ocid={`admin.overview.verification.${index + 1}`}
              >
                <Avatar src={request.avatar} name={request.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{request.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {request.profession}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANT[request.status]}>
                  {request.status}
                </Badge>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              asChild={false}
            >
              <Link
                to="/admin/verification"
                className="inline-flex items-center gap-1.5"
                data-ocid="admin.overview.verification_open_button"
              >
                Open full queue
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageTransition>
  );
}
