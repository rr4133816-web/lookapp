import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Check,
  Clock,
  FileText,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";

const DOCUMENTS = [
  { id: "d-1", label: "Government-issued ID", status: "approved" as const },
  { id: "d-2", label: "Professional licence", status: "approved" as const },
  { id: "d-3", label: "Liability insurance", status: "pending" as const },
  { id: "d-4", label: "Portfolio evidence", status: "missing" as const },
];

const STATUS_META = {
  approved: { label: "Approved", variant: "success" as const, icon: Check },
  pending: { label: "Under review", variant: "warning" as const, icon: Clock },
  missing: { label: "Not uploaded", variant: "neutral" as const, icon: Upload },
};

export default function ProVerification() {
  const { pushToast } = useApp();
  const [documents, setDocuments] = useState(DOCUMENTS);

  const upload = (id: string) => {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? { ...document, status: "pending" as const }
          : document,
      ),
    );
    pushToast({
      title: "Document uploaded",
      description: "Our team will review it within one business day.",
      variant: "success",
    });
  };

  const approved = documents.filter(
    (document) => document.status === "approved",
  ).length;
  const progress = Math.round((approved / documents.length) * 100);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Verification
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Get verified
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Verified professionals appear higher in search results and convert
          more bookings. Upload each document once and we handle the rest.
        </p>
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 lg:grid-cols-[1fr_320px]"
      >
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="size-4 text-primary" />
                Required documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((document, index) => {
                const meta = STATUS_META[document.status];
                return (
                  <motion.div
                    key={document.id}
                    variants={staggerItem}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border/60 p-4"
                    data-ocid={`pro_verification.document.${index + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg",
                          document.status === "approved"
                            ? "bg-success/12 text-success"
                            : document.status === "pending"
                              ? "bg-warning/15 text-warning-foreground dark:text-warning"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        <meta.icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{document.label}</p>
                        <p className="text-xs text-muted-foreground">
                          PDF, JPG or PNG up to 10 MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={meta.variant}>{meta.label}</Badge>
                      {document.status !== "approved" ? (
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => upload(document.id)}
                          data-ocid={`pro_verification.upload_button.${index + 1}`}
                        >
                          <Upload className="size-4" />
                          Upload
                        </Button>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Documents received",
                  body: "We have your ID and professional licence.",
                  done: true,
                },
                {
                  title: "Manual review",
                  body: "A verification specialist checks each document against the issuing body.",
                  done: false,
                },
                {
                  title: "Verification badge issued",
                  body: "Your profile shows the teal verified badge and ranks higher in search.",
                  done: false,
                },
              ].map((step, index) => (
                <div key={step.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold",
                        step.done
                          ? "bg-success text-success-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step.done ? <Check className="size-3.5" /> : index + 1}
                    </span>
                    {index < 2 ? (
                      <span className="mt-1 h-full w-px flex-1 bg-border" />
                    ) : null}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold">
                    Verification progress
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {approved} of {documents.length} approved
                  </p>
                </div>
              </div>
              <span className="block h-2 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-gradient-signal transition-smooth"
                  style={{ width: `${progress}%` }}
                />
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Complete every document to receive the verified badge.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="space-y-3 p-5">
              <BadgeCheck className="size-5" />
              <p className="font-display text-base font-semibold">
                Verified profiles book 3× more
              </p>
              <p className="text-xs leading-relaxed text-primary-foreground/85">
                Customers filter for verified professionals first. It is the
                single biggest lever on your booking rate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Need help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                If a document was rejected, the review notes explain exactly
                what to change before resubmitting.
              </p>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() =>
                  pushToast({
                    title: "Support request sent",
                    description:
                      "A verification specialist will reply within a day.",
                    variant: "default",
                  })
                }
                data-ocid="pro_verification.support_button"
              >
                <X className="size-4" />
                Contact verification support
              </Button>
            </CardContent>
          </Card>
        </aside>
      </motion.section>
    </div>
  );
}
