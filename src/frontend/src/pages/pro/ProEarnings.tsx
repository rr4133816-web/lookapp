import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { getTransactionsForProfessional } from "@/data/transactions";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Download,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PRO_ID = "p-01";

const MONTHLY = [
  { month: "Apr", net: 1180 },
  { month: "May", net: 1420 },
  { month: "Jun", net: 980 },
  { month: "Jul", net: 1640 },
  { month: "Aug", net: 1310 },
  { month: "Sep", net: 1876 },
];

const STATUS_VARIANT: Record<
  TransactionStatus,
  "success" | "primary" | "neutral" | "destructive"
> = {
  paid: "success",
  pending: "primary",
  refunded: "neutral",
  failed: "destructive",
};

export default function ProEarnings() {
  const { pushToast } = useApp();
  const [tab, setTab] = useState("all");
  const transactions = useMemo(
    () => getTransactionsForProfessional(PRO_ID),
    [],
  );

  const filtered = useMemo(
    () =>
      transactions.filter((transaction) =>
        tab === "all" ? true : transaction.status === tab,
      ),
    [transactions, tab],
  );

  const paid = transactions.filter(
    (transaction) => transaction.status === "paid",
  );
  const gross = paid.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );
  const net = paid.reduce((total, transaction) => total + transaction.net, 0);
  const fees = paid.reduce((total, transaction) => total + transaction.fee, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Earnings
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Your income
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every completed session, its fee and what lands in your account.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            pushToast({
              title: "Statement exported",
              description: "A CSV of this period has been prepared.",
              variant: "success",
            })
          }
          data-ocid="pro_earnings.export_button"
        >
          <Download className="size-4" />
          Export statement
        </Button>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Gross billed"
          value={`$${gross.toLocaleString()}`}
          icon={DollarSign}
          trend={14}
          hint="Last 30 days"
          index={0}
        />
        <StatCard
          label="Net earnings"
          value={`$${net.toLocaleString()}`}
          icon={Wallet}
          trend={12}
          hint="After platform fees"
          tone="success"
          index={1}
        />
        <StatCard
          label="Platform fees"
          value={`$${fees.toLocaleString()}`}
          icon={ArrowDownRight}
          hint="10% of gross"
          tone="warning"
          index={2}
        />
        <StatCard
          label="Next payout"
          value="$1,284"
          icon={ArrowUpRight}
          hint="Friday, 26 September"
          tone="accent"
          index={3}
        />
      </motion.section>

      <Card>
        <CardHeader>
          <CardTitle>Net earnings by month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="oklch(var(--border))"
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
                  tickFormatter={(value: number) => `$${value}`}
                />
                <Tooltip
                  cursor={{ fill: "oklch(var(--muted) / 0.5)" }}
                  contentStyle={{
                    background: "oklch(var(--popover))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "oklch(var(--popover-foreground))",
                  }}
                  formatter={(value: number) => [`$${value}`, "Net"]}
                />
                <Bar dataKey="net" radius={[8, 8, 0, 0]}>
                  {MONTHLY.map((entry, index) => (
                    <Cell
                      key={entry.month}
                      fill={
                        index === MONTHLY.length - 1
                          ? "oklch(var(--accent))"
                          : "oklch(var(--primary))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <Tabs
          items={[
            { value: "all", label: "All", count: transactions.length },
            {
              value: "paid",
              label: "Paid",
              count: transactions.filter((t) => t.status === "paid").length,
            },
            {
              value: "pending",
              label: "Pending",
              count: transactions.filter((t) => t.status === "pending").length,
            },
            {
              value: "refunded",
              label: "Refunded",
              count: transactions.filter((t) => t.status === "refunded").length,
            },
          ]}
          value={tab}
          onValueChange={setTab}
        />

        <div className="overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="sticky top-0 bg-muted/60">
                <tr className="text-left">
                  {[
                    "Reference",
                    "Client",
                    "Date",
                    "Gross",
                    "Fee",
                    "Net",
                    "Status",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className={cn(
                        "px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                        ["Gross", "Fee", "Net"].includes(heading) &&
                          "text-right",
                      )}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    variants={staggerItem}
                    initial="hidden"
                    animate="visible"
                    className="border-t border-border/60 transition-smooth hover:bg-muted/40"
                    data-ocid={`pro_earnings.row.${index + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-3">
                      {transaction.professionalName}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      ${transaction.amount}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      −${transaction.fee}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">
                      ${transaction.net}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[transaction.status]}>
                        {transaction.status}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
