import { StatCard } from "@/components/StatCard";
import { PageHeader, PageTransition } from "@/components/layout/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { Search as SearchField } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tabs";
import { transactions as seedTransactions } from "@/data/transactions";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Transaction, TransactionStatus } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  CreditCard,
  DollarSign,
  Receipt,
  RotateCcw,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

const STATUS_VARIANT: Record<
  TransactionStatus,
  "success" | "primary" | "neutral" | "destructive"
> = {
  paid: "success",
  pending: "primary",
  refunded: "neutral",
  failed: "destructive",
};

const STATUS_TABS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
  { value: "failed", label: "Failed" },
];

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatLongDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function money(value: number): string {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function AdminTransactions() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Transaction | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: seedTransactions.length };
    for (const status of [
      "paid",
      "pending",
      "refunded",
      "failed",
    ] as TransactionStatus[]) {
      base[status] = seedTransactions.filter(
        (item) => item.status === status,
      ).length;
    }
    return base;
  }, []);

  const totals = useMemo(() => {
    const paid = seedTransactions.filter((item) => item.status === "paid");
    const gross = paid.reduce((total, item) => total + item.amount, 0);
    const fees = paid.reduce((total, item) => total + item.fee, 0);
    const net = paid.reduce((total, item) => total + item.net, 0);
    const refunded = seedTransactions
      .filter((item) => item.status === "refunded")
      .reduce((total, item) => total + item.amount, 0);
    return { gross, fees, net, refunded };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return seedTransactions.filter((transaction) => {
      const matchesTab = tab === "all" || transaction.status === tab;
      const matchesTerm =
        !term ||
        transaction.id.toLowerCase().includes(term) ||
        transaction.bookingId.toLowerCase().includes(term) ||
        transaction.professionalName.toLowerCase().includes(term) ||
        transaction.method.toLowerCase().includes(term);
      return matchesTab && matchesTerm;
    });
  }, [tab, query]);

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        eyebrow="Finance"
        title="Transactions"
        description="Every payment captured on the marketplace, with the platform fee and net payout for each booking."
      />

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Gross volume"
          value={money(totals.gross)}
          icon={DollarSign}
          trend={9}
          hint="Paid transactions"
          index={0}
        />
        <StatCard
          label="Platform fees"
          value={money(totals.fees)}
          icon={Receipt}
          hint="10% of gross"
          tone="warning"
          index={1}
        />
        <StatCard
          label="Net to professionals"
          value={money(totals.net)}
          icon={Wallet}
          trend={11}
          hint="After fees"
          tone="success"
          index={2}
        />
        <StatCard
          label="Refunded"
          value={money(totals.refunded)}
          icon={RotateCcw}
          hint="Returned to customers"
          tone="accent"
          index={3}
        />
      </motion.section>

      <div className="flex flex-col gap-4">
        <SearchField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search by transaction, booking, professional or card"
          aria-label="Search transactions"
          containerClassName="w-full lg:max-w-md"
          data-ocid="admin_transactions.search_input"
        />

        <Tabs
          items={STATUS_TABS.map((item) => ({
            value: item.value,
            label: item.label,
            count: counts[item.value],
          }))}
          value={tab}
          onValueChange={setTab}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No transactions match these filters"
          description="Try another status tab or clear the search to see the full ledger."
          action={
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setTab("all");
                setQuery("");
              }}
              data-ocid="admin_transactions.reset_button"
            >
              Reset filters
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="sticky top-0 z-10 bg-muted/60">
                <tr className="text-left">
                  {[
                    "Transaction",
                    "Booking",
                    "Professional",
                    "Method",
                    "Date",
                    "Gross",
                    "Fee",
                    "Net",
                    "Status",
                    "",
                  ].map((heading) => (
                    <th
                      key={heading || "actions"}
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
                    data-ocid={`admin_transactions.row.${index + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {transaction.bookingId}
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3">
                      {transaction.professionalName}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {transaction.method}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {money(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      −{money(transaction.fee)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">
                      {money(transaction.net)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[transaction.status]}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelected(transaction)}
                        data-ocid={`admin_transactions.open_modal_button.${index + 1}`}
                      >
                        Details
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `Transaction ${selected.id}` : "Transaction"}
        description={selected ? `Booking ${selected.bookingId}` : undefined}
        footer={
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => setSelected(null)}
            data-ocid="admin_transactions.close_button"
          >
            Close
          </Button>
        }
      >
        {selected ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <Badge variant={STATUS_VARIANT[selected.status]}>
                {selected.status}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {formatLongDate(selected.date)}
              </span>
            </div>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Payment breakdown
              </h3>
              <dl className="space-y-2.5 rounded-lg border border-border/60 bg-muted/40 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Service amount</dt>
                  <dd className="font-mono">{money(selected.amount)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <ArrowDownRight className="size-3.5" />
                    Platform fee (10%)
                  </dt>
                  <dd className="font-mono text-muted-foreground">
                    −{money(selected.fee)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-border/60 pt-2.5">
                  <dt className="font-medium">Net to professional</dt>
                  <dd className="font-mono text-base font-semibold">
                    {money(selected.net)}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Payment details
              </h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Professional</dt>
                  <dd className="truncate font-medium">
                    {selected.professionalName}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Booking</dt>
                  <dd className="font-mono text-xs">{selected.bookingId}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <CreditCard className="size-3.5" />
                    Method
                  </dt>
                  <dd className="font-mono text-xs">{selected.method}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Captured</dt>
                  <dd className="font-mono text-xs">
                    {formatDate(selected.date)}
                  </dd>
                </div>
              </dl>
            </section>

            <p className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
              {selected.status === "paid"
                ? "Funds settled to the professional's payout account on the next payout cycle."
                : selected.status === "pending"
                  ? "Authorisation held — capture completes when the session is confirmed."
                  : selected.status === "refunded"
                    ? "Full amount returned to the customer's original payment method."
                    : "Payment failed at the processor. The customer was asked to retry."}
            </p>
          </div>
        ) : null}
      </Drawer>
    </PageTransition>
  );
}
