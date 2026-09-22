import { l as createLucideIcon, f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, e as cn, B as Badge, b as ShieldCheck, a as BadgeCheck, X } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { F as FileText } from "./file-text-CyPRTlyH.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { C as Check } from "./check-CeudopQg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const DOCUMENTS = [
  { id: "d-1", label: "Government-issued ID", status: "approved" },
  { id: "d-2", label: "Professional licence", status: "approved" },
  { id: "d-3", label: "Liability insurance", status: "pending" },
  { id: "d-4", label: "Portfolio evidence", status: "missing" }
];
const STATUS_META = {
  approved: { label: "Approved", variant: "success", icon: Check },
  pending: { label: "Under review", variant: "warning", icon: Clock },
  missing: { label: "Not uploaded", variant: "neutral", icon: Upload }
};
function ProVerification() {
  const { pushToast } = useApp();
  const [documents, setDocuments] = reactExports.useState(DOCUMENTS);
  const upload = (id) => {
    setDocuments(
      (current) => current.map(
        (document) => document.id === id ? { ...document, status: "pending" } : document
      )
    );
    pushToast({
      title: "Document uploaded",
      description: "Our team will review it within one business day.",
      variant: "success"
    });
  };
  const approved = documents.filter(
    (document) => document.status === "approved"
  ).length;
  const progress = Math.round(approved / documents.length * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Verification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Get verified" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Verified professionals appear higher in search results and convert more bookings. Upload each document once and we handle the rest." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-4 lg:grid-cols-[1fr_320px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-primary" }),
                "Required documents"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: documents.map((document, index) => {
                const meta = STATUS_META[document.status];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    variants: staggerItem,
                    className: "flex items-center justify-between gap-4 rounded-lg border border-border/60 p-4",
                    "data-ocid": `pro_verification.document.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: cn(
                              "grid size-9 shrink-0 place-items-center rounded-lg",
                              document.status === "approved" ? "bg-success/12 text-success" : document.status === "pending" ? "bg-warning/15 text-warning-foreground dark:text-warning" : "bg-muted text-muted-foreground"
                            ),
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(meta.icon, { className: "size-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: document.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PDF, JPG or PNG up to 10 MB" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: meta.variant, children: meta.label }),
                        document.status !== "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            type: "button",
                            variant: "secondary",
                            size: "sm",
                            onClick: () => upload(document.id),
                            "data-ocid": `pro_verification.upload_button.${index + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4" }),
                              "Upload"
                            ]
                          }
                        ) : null
                      ] })
                    ]
                  },
                  document.id
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Review timeline" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: [
                {
                  title: "Documents received",
                  body: "We have your ID and professional licence.",
                  done: true
                },
                {
                  title: "Manual review",
                  body: "A verification specialist checks each document against the issuing body.",
                  done: false
                },
                {
                  title: "Verification badge issued",
                  body: "Your profile shows the teal verified badge and ranks higher in search.",
                  done: false
                }
              ].map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold",
                        step.done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                      ),
                      children: step.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) : index + 1
                    }
                  ),
                  index < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 h-full w-px flex-1 bg-border" }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm leading-relaxed text-muted-foreground", children: step.body })
                ] })
              ] }, step.title)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-11 place-items-center rounded-xl bg-accent-soft text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold", children: "Verification progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                    approved,
                    " of ",
                    documents.length,
                    " approved"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "block h-full rounded-full bg-gradient-signal transition-smooth",
                  style: { width: `${progress}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: "Complete every document to receive the verified badge." })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold", children: "Verified profiles book 3× more" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-primary-foreground/85", children: "Customers filter for verified professionals first. It is the single biggest lever on your booking rate." })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Need help?" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: "If a document was rejected, the review notes explain exactly what to change before resubmitting." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "secondary",
                    className: "w-full",
                    onClick: () => pushToast({
                      title: "Support request sent",
                      description: "A verification specialist will reply within a day.",
                      variant: "default"
                    }),
                    "data-ocid": "pro_verification.support_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
                      "Contact verification support"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  ProVerification as default
};
