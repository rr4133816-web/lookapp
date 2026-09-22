import { PageHeader, PageTransition } from "@/components/layout/PageTransition";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Modal } from "@/components/ui/modal";
import { Search as SearchField } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tabs";
import { verificationRequests as seedRequests } from "@/data/admin";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { VerificationRequest } from "@/types";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Check,
  Clock,
  FileText,
  ShieldCheck,
  ShieldX,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Decision = "approved" | "rejected";

const STATUS_VARIANT: Record<
  VerificationRequest["status"],
  "warning" | "success" | "destructive"
> = {
  pending: "warning",
  approved: "success",
  rejected: "destructive",
};

const DOCUMENT_KIND: Record<string, string> = {
  "Government ID": "Identity",
  "PE License": "License",
  "State License": "License",
  "CFE Certificate": "Certification",
  "NCIDQ Certification": "Certification",
  "NN/g Certification": "Certification",
  "CSCS Certificate": "Certification",
  "DELF Examiner Accreditation": "Certification",
  "Liability Insurance": "Insurance",
  "Professional References": "Experience",
  "Portfolio PDF": "Experience",
};

function documentKind(document: string): string {
  return DOCUMENT_KIND[document] ?? "Supporting";
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

export default function AdminVerification() {
  const { pushToast } = useApp();
  const [requests, setRequests] = useState<VerificationRequest[]>(seedRequests);
  const [tab, setTab] = useState("pending");
  const [query, setQuery] = useState("");
  const [pendingDecision, setPendingDecision] = useState<{
    request: VerificationRequest;
    decision: Decision;
  } | null>(null);

  const counts = useMemo(
    () => ({
      pending: requests.filter((request) => request.status === "pending")
        .length,
      approved: requests.filter((request) => request.status === "approved")
        .length,
      rejected: requests.filter((request) => request.status === "rejected")
        .length,
    }),
    [requests],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesTab = request.status === tab;
      const matchesTerm =
        !term ||
        request.name.toLowerCase().includes(term) ||
        request.profession.toLowerCase().includes(term) ||
        request.id.toLowerCase().includes(term);
      return matchesTab && matchesTerm;
    });
  }, [requests, tab, query]);

  const confirmDecision = () => {
    if (!pendingDecision) return;
    const { request, decision } = pendingDecision;
    setRequests((current) =>
      current.map((item) =>
        item.id === request.id ? { ...item, status: decision } : item,
      ),
    );
    pushToast({
      title:
        decision === "approved"
          ? "Professional approved"
          : "Application rejected",
      description:
        decision === "approved"
          ? `${request.name} is now a verified professional.`
          : `${request.name} has been notified with the review notes.`,
      variant: decision === "approved" ? "success" : "error",
    });
    setPendingDecision(null);
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        eyebrow="Trust & Safety"
        title="Verification queue"
        description="Review identity, licence and certification documents before a professional can accept bookings."
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search by name, profession or reference"
          aria-label="Search verification requests"
          containerClassName="w-full lg:max-w-md"
          data-ocid="admin_verification.search_input"
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-accent" />
          {counts.pending} awaiting review
        </div>
      </div>

      <Tabs
        items={[
          { value: "pending", label: "Pending", count: counts.pending },
          { value: "approved", label: "Approved", count: counts.approved },
          { value: "rejected", label: "Rejected", count: counts.rejected },
        ]}
        value={tab}
        onValueChange={setTab}
      >
        {() =>
          filtered.length === 0 ? (
            <EmptyState
              icon={tab === "pending" ? Clock : BadgeCheck}
              title={
                tab === "pending"
                  ? "Queue is clear"
                  : tab === "approved"
                    ? "No approved applications yet"
                    : "No rejected applications"
              }
              description={
                tab === "pending"
                  ? "New submissions will appear here as soon as professionals upload their documents."
                  : "Switch tabs or clear the search to review other applications."
              }
            />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 xl:grid-cols-2"
            >
              {filtered.map((request, index) => (
                <motion.div key={request.id} variants={staggerItem}>
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <Avatar
                          src={request.avatar}
                          name={request.name}
                          size="lg"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate font-display text-base font-semibold">
                              {request.name}
                            </h2>
                            <Badge variant={STATUS_VARIANT[request.status]}>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="mt-0.5 truncate text-sm text-muted-foreground">
                            {request.profession}
                          </p>
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {request.id} · submitted{" "}
                            {formatDate(request.submittedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Submitted documents
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {request.documents.map((document) => (
                            <li
                              key={document}
                              className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2"
                            >
                              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                                <FileText className="size-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium">
                                  {document}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                  {documentKind(document)}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {request.status === "pending" ? (
                        <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setPendingDecision({
                                request,
                                decision: "rejected",
                              })
                            }
                            data-ocid={`admin_verification.reject_button.${index + 1}`}
                          >
                            <X className="size-4" />
                            Reject
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              setPendingDecision({
                                request,
                                decision: "approved",
                              })
                            }
                            data-ocid={`admin_verification.approve_button.${index + 1}`}
                          >
                            <Check className="size-4" />
                            Approve
                          </Button>
                        </div>
                      ) : (
                        <p className="mt-auto inline-flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                          {request.status === "approved" ? (
                            <ShieldCheck className="size-4 text-success" />
                          ) : (
                            <ShieldX className="size-4 text-destructive" />
                          )}
                          {request.status === "approved"
                            ? "Documents verified and professional published."
                            : "Application closed — professional may resubmit."}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )
        }
      </Tabs>

      <Modal
        open={pendingDecision !== null}
        onClose={() => setPendingDecision(null)}
        title={
          pendingDecision?.decision === "approved"
            ? "Approve this professional?"
            : "Reject this application?"
        }
        description={
          pendingDecision
            ? `${pendingDecision.request.name} · ${pendingDecision.request.profession}`
            : undefined
        }
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setPendingDecision(null)}
              data-ocid="admin_verification.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={
                pendingDecision?.decision === "approved"
                  ? "primary"
                  : "destructive"
              }
              onClick={confirmDecision}
              data-ocid="admin_verification.confirm_button"
            >
              {pendingDecision?.decision === "approved" ? (
                <>
                  <Check className="size-4" />
                  Approve professional
                </>
              ) : (
                <>
                  <X className="size-4" />
                  Reject application
                </>
              )}
            </Button>
          </>
        }
      >
        {pendingDecision ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pendingDecision.decision === "approved"
                ? "Approving publishes the profile in search results and unlocks booking requests. Make sure every document below has been checked."
                : "Rejecting closes the application and notifies the professional. They can correct the documents and resubmit."}
            </p>
            <ul className="space-y-2">
              {pendingDecision.request.documents.map((document) => (
                <li
                  key={document}
                  className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm"
                >
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate">{document}</span>
                  <span className="text-xs text-muted-foreground">
                    {documentKind(document)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
    </PageTransition>
  );
}
