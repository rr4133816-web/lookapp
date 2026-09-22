import { PageHeader, PageTransition } from "@/components/layout/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { Modal } from "@/components/ui/modal";
import { Search as SearchField } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tabs";
import { disputes as seedDisputes } from "@/data/admin";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dispute, DisputeStatus } from "@/types";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Gavel,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import { useMemo, useState } from "react";

type Priority = "high" | "medium" | "low";
type Resolution = "resolve" | "escalate";

const STATUS_VARIANT: Record<DisputeStatus, "warning" | "primary" | "success"> =
  {
    open: "warning",
    "under-review": "primary",
    resolved: "success",
  };

const PRIORITY_VARIANT: Record<
  Priority,
  "destructive" | "warning" | "neutral"
> = {
  high: "destructive",
  medium: "warning",
  low: "neutral",
};

const STATUS_TABS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "under-review", label: "Under review" },
  { value: "resolved", label: "Resolved" },
];

const PRIORITY_TABS: { value: string; label: string }[] = [
  { value: "all", label: "Any priority" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function priorityOf(dispute: Dispute): Priority {
  if (dispute.status === "resolved") return "low";
  if (dispute.amount >= 300) return "high";
  if (dispute.amount >= 100) return "medium";
  return "low";
}

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

export default function AdminDisputes() {
  const { pushToast } = useApp();
  const [disputes, setDisputes] = useState<Dispute[]>(seedDisputes);
  const [tab, setTab] = useState("all");
  const [priority, setPriority] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    dispute: Dispute;
    resolution: Resolution;
  } | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: disputes.length };
    for (const status of [
      "open",
      "under-review",
      "resolved",
    ] as DisputeStatus[]) {
      base[status] = disputes.filter(
        (dispute) => dispute.status === status,
      ).length;
    }
    return base;
  }, [disputes]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return disputes.filter((dispute) => {
      const matchesTab = tab === "all" || dispute.status === tab;
      const matchesPriority =
        priority === "all" || priorityOf(dispute) === priority;
      const matchesTerm =
        !term ||
        dispute.id.toLowerCase().includes(term) ||
        dispute.bookingId.toLowerCase().includes(term) ||
        dispute.raisedBy.toLowerCase().includes(term) ||
        dispute.against.toLowerCase().includes(term) ||
        dispute.reason.toLowerCase().includes(term);
      return matchesTab && matchesPriority && matchesTerm;
    });
  }, [disputes, tab, priority, query]);

  const confirmAction = () => {
    if (!pendingAction) return;
    const { dispute, resolution } = pendingAction;
    setDisputes((current) =>
      current.map((item) =>
        item.id === dispute.id
          ? {
              ...item,
              status: resolution === "resolve" ? "resolved" : "under-review",
            }
          : item,
      ),
    );
    pushToast({
      title:
        resolution === "resolve" ? "Dispute resolved" : "Dispute escalated",
      description:
        resolution === "resolve"
          ? `${dispute.id} closed and both parties notified.`
          : `${dispute.id} moved to the senior review queue.`,
      variant: resolution === "resolve" ? "success" : "default",
    });
    setSelected(null);
    setPendingAction(null);
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        eyebrow="Trust & Safety"
        title="Disputes"
        description="Investigate payment and service disputes, review the evidence thread and record a resolution."
      />

      <div className="flex flex-col gap-4">
        <SearchField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search by dispute, booking or party"
          aria-label="Search disputes"
          containerClassName="w-full lg:max-w-md"
          data-ocid="admin_disputes.search_input"
        />

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <Tabs
            items={STATUS_TABS.map((item) => ({
              value: item.value,
              label: item.label,
              count: counts[item.value],
            }))}
            value={tab}
            onValueChange={setTab}
            className="xl:flex-1"
          />
          <Tabs
            items={PRIORITY_TABS}
            value={priority}
            onValueChange={setPriority}
            className="xl:w-auto"
            listClassName="xl:w-auto"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No disputes match these filters"
          description="Try another status or priority, or clear the search to see every case."
          action={
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setTab("all");
                setPriority("all");
                setQuery("");
              }}
              data-ocid="admin_disputes.reset_button"
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
                    "Dispute",
                    "Booking",
                    "Raised by",
                    "Against",
                    "Opened",
                    "Amount",
                    "Priority",
                    "Status",
                    "",
                  ].map((heading) => (
                    <th
                      key={heading || "actions"}
                      scope="col"
                      className={cn(
                        "px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                        heading === "Amount" && "text-right",
                      )}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((dispute, index) => {
                  const level = priorityOf(dispute);
                  return (
                    <motion.tr
                      key={dispute.id}
                      variants={staggerItem}
                      initial="hidden"
                      animate="visible"
                      className="border-t border-border/60 transition-smooth hover:bg-muted/40"
                      data-ocid={`admin_disputes.row.${index + 1}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        {dispute.id}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {dispute.bookingId}
                      </td>
                      <td className="max-w-[150px] truncate px-4 py-3">
                        {dispute.raisedBy}
                      </td>
                      <td className="max-w-[150px] truncate px-4 py-3">
                        {dispute.against}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {formatDate(dispute.openedAt)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {dispute.amount > 0 ? `$${dispute.amount}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={PRIORITY_VARIANT[level]}>{level}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={STATUS_VARIANT[dispute.status]}>
                          {dispute.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelected(dispute)}
                          data-ocid={`admin_disputes.open_modal_button.${index + 1}`}
                        >
                          Review
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `Dispute ${selected.id}` : "Dispute"}
        description={selected ? `Booking ${selected.bookingId}` : undefined}
        footer={
          selected && selected.status !== "resolved" ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() =>
                  setPendingAction({
                    dispute: selected,
                    resolution: "escalate",
                  })
                }
                data-ocid="admin_disputes.escalate_button"
              >
                <ArrowUpRight className="size-4" />
                Escalate
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={() =>
                  setPendingAction({ dispute: selected, resolution: "resolve" })
                }
                data-ocid="admin_disputes.resolve_button"
              >
                <CheckCircle2 className="size-4" />
                Resolve
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => setSelected(null)}
              data-ocid="admin_disputes.close_button"
            >
              Close
            </Button>
          )
        }
      >
        {selected ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={STATUS_VARIANT[selected.status]}>
                {selected.status}
              </Badge>
              <Badge variant={PRIORITY_VARIANT[priorityOf(selected)]}>
                {priorityOf(selected)} priority
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {formatLongDate(selected.openedAt)}
              </span>
            </div>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Case summary
              </h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Raised by</dt>
                  <dd className="truncate font-medium">{selected.raisedBy}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Against</dt>
                  <dd className="truncate font-medium">{selected.against}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Amount in dispute</dt>
                  <dd className="font-mono font-semibold">
                    {selected.amount > 0
                      ? `$${selected.amount}`
                      : "No financial impact"}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Thread
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-warning/15 text-warning-foreground dark:text-warning">
                    <AlertTriangle className="size-3.5" />
                  </span>
                  <div className="min-w-0 rounded-lg border border-border/60 bg-muted/40 p-3">
                    <p className="text-xs font-semibold">
                      {selected.raisedBy} opened the dispute
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {selected.reason}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                      {formatDate(selected.openedAt)}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <MessageSquare className="size-3.5" />
                  </span>
                  <div className="min-w-0 rounded-lg border border-border/60 bg-muted/40 p-3">
                    <p className="text-xs font-semibold">
                      {selected.against} responded
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {selected.status === "resolved"
                        ? "Both parties agreed on the outcome and the case was closed without further action."
                        : "Response received and attached to the case file. Awaiting a resolution decision."}
                    </p>
                  </div>
                </li>
                {selected.status === "under-review" ? (
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Gavel className="size-3.5" />
                    </span>
                    <div className="min-w-0 rounded-lg border border-border/60 bg-muted/40 p-3">
                      <p className="text-xs font-semibold">
                        Trust &amp; Safety review
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        A specialist is reviewing the payment record and the
                        session notes before issuing a decision.
                      </p>
                    </div>
                  </li>
                ) : null}
              </ol>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Evidence
              </h3>
              <ul className="space-y-2">
                {[
                  `Booking record ${selected.bookingId}`,
                  "Payment receipt and fee breakdown",
                  "Session notes and message history",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm"
                  >
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={pendingAction !== null}
        onClose={() => setPendingAction(null)}
        title={
          pendingAction?.resolution === "resolve"
            ? "Resolve this dispute?"
            : "Escalate this dispute?"
        }
        description={
          pendingAction
            ? `${pendingAction.dispute.id} · ${pendingAction.dispute.raisedBy} vs ${pendingAction.dispute.against}`
            : undefined
        }
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setPendingAction(null)}
              data-ocid="admin_disputes.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={
                pendingAction?.resolution === "resolve" ? "primary" : "accent"
              }
              onClick={confirmAction}
              data-ocid="admin_disputes.confirm_button"
            >
              {pendingAction?.resolution === "resolve" ? (
                <>
                  <CheckCircle2 className="size-4" />
                  Resolve dispute
                </>
              ) : (
                <>
                  <ArrowUpRight className="size-4" />
                  Escalate dispute
                </>
              )}
            </Button>
          </>
        }
      >
        {pendingAction ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {pendingAction.resolution === "resolve"
              ? "Resolving closes the case and notifies both parties with the recorded outcome. This cannot be undone from this screen."
              : "Escalating moves the case to the senior review queue and keeps it open until a specialist issues a decision."}
          </p>
        ) : null}
      </Modal>
    </PageTransition>
  );
}
