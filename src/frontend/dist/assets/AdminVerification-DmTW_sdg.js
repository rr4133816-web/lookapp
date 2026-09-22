import { l as createLucideIcon, f as useApp, r as reactExports, j as jsxRuntimeExports, b as ShieldCheck, a as BadgeCheck, m as motion, A as Avatar, B as Badge, X } from "./index-Dpq2E7IO.js";
import { P as PageTransition, a as PageHeader } from "./PageTransition-Be_zghKv.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, c as CardContent } from "./card-DEkbNMNy.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { M as Modal } from "./modal-D-p7CZsN.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { T as Tabs } from "./tabs-BYUaIO-b.js";
import { v as verificationRequests } from "./admin-CMLMmJb-.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { F as FileText } from "./file-text-CyPRTlyH.js";
import { C as Check } from "./check-CeudopQg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
];
const ShieldX = createLucideIcon("shield-x", __iconNode);
const STATUS_VARIANT = {
  pending: "warning",
  approved: "success",
  rejected: "destructive"
};
const DOCUMENT_KIND = {
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
  "Portfolio PDF": "Experience"
};
function documentKind(document) {
  return DOCUMENT_KIND[document] ?? "Supporting";
}
function formatDate(value) {
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function AdminVerification() {
  const { pushToast } = useApp();
  const [requests, setRequests] = reactExports.useState(verificationRequests);
  const [tab, setTab] = reactExports.useState("pending");
  const [query, setQuery] = reactExports.useState("");
  const [pendingDecision, setPendingDecision] = reactExports.useState(null);
  const counts = reactExports.useMemo(
    () => ({
      pending: requests.filter((request) => request.status === "pending").length,
      approved: requests.filter((request) => request.status === "approved").length,
      rejected: requests.filter((request) => request.status === "rejected").length
    }),
    [requests]
  );
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesTab = request.status === tab;
      const matchesTerm = !term || request.name.toLowerCase().includes(term) || request.profession.toLowerCase().includes(term) || request.id.toLowerCase().includes(term);
      return matchesTab && matchesTerm;
    });
  }, [requests, tab, query]);
  const confirmDecision = () => {
    if (!pendingDecision) return;
    const { request, decision } = pendingDecision;
    setRequests(
      (current) => current.map(
        (item) => item.id === request.id ? { ...item, status: decision } : item
      )
    );
    pushToast({
      title: decision === "approved" ? "Professional approved" : "Application rejected",
      description: decision === "approved" ? `${request.name} is now a verified professional.` : `${request.name} has been notified with the review notes.`,
      variant: decision === "approved" ? "success" : "error"
    });
    setPendingDecision(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageTransition, { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Trust & Safety",
        title: "Verification queue",
        description: "Review identity, licence and certification documents before a professional can accept bookings."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          value: query,
          onChange: (event) => setQuery(event.target.value),
          onClear: () => setQuery(""),
          placeholder: "Search by name, profession or reference",
          "aria-label": "Search verification requests",
          containerClassName: "w-full lg:max-w-md",
          "data-ocid": "admin_verification.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-accent" }),
        counts.pending,
        " awaiting review"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        items: [
          { value: "pending", label: "Pending", count: counts.pending },
          { value: "approved", label: "Approved", count: counts.approved },
          { value: "rejected", label: "Rejected", count: counts.rejected }
        ],
        value: tab,
        onValueChange: setTab,
        children: () => filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: tab === "pending" ? Clock : BadgeCheck,
            title: tab === "pending" ? "Queue is clear" : tab === "approved" ? "No approved applications yet" : "No rejected applications",
            description: tab === "pending" ? "New submissions will appear here as soon as professionals upload their documents." : "Switch tabs or clear the search to review other applications."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: staggerContainer,
            initial: "hidden",
            animate: "visible",
            className: "grid gap-4 xl:grid-cols-2",
            children: filtered.map((request, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex h-full flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    src: request.avatar,
                    name: request.name,
                    size: "lg"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate font-display text-base font-semibold", children: request.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: STATUS_VARIANT[request.status], children: request.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-sm text-muted-foreground", children: request.profession }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-xs text-muted-foreground", children: [
                    request.id,
                    " · submitted",
                    " ",
                    formatDate(request.submittedAt)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Submitted documents" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: request.documents.map((document) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-8 shrink-0 place-items-center rounded-md bg-primary-soft text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-medium", children: document }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: documentKind(document) })
                      ] })
                    ]
                  },
                  document
                )) })
              ] }),
              request.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    className: "text-destructive hover:bg-destructive/10",
                    onClick: () => setPendingDecision({
                      request,
                      decision: "rejected"
                    }),
                    "data-ocid": `admin_verification.reject_button.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
                      "Reject"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    onClick: () => setPendingDecision({
                      request,
                      decision: "approved"
                    }),
                    "data-ocid": `admin_verification.approve_button.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }),
                      "Approve"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-auto inline-flex items-center gap-2 pt-1 text-xs text-muted-foreground", children: [
                request.status === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: "size-4 text-destructive" }),
                request.status === "approved" ? "Documents verified and professional published." : "Application closed — professional may resubmit."
              ] })
            ] }) }) }, request.id))
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: pendingDecision !== null,
        onClose: () => setPendingDecision(null),
        title: (pendingDecision == null ? void 0 : pendingDecision.decision) === "approved" ? "Approve this professional?" : "Reject this application?",
        description: pendingDecision ? `${pendingDecision.request.name} · ${pendingDecision.request.profession}` : void 0,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: () => setPendingDecision(null),
              "data-ocid": "admin_verification.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: (pendingDecision == null ? void 0 : pendingDecision.decision) === "approved" ? "primary" : "destructive",
              onClick: confirmDecision,
              "data-ocid": "admin_verification.confirm_button",
              children: (pendingDecision == null ? void 0 : pendingDecision.decision) === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }),
                "Approve professional"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
                "Reject application"
              ] })
            }
          )
        ] }),
        children: pendingDecision ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: pendingDecision.decision === "approved" ? "Approving publishes the profile in search results and unlocks booking requests. Make sure every document below has been checked." : "Rejecting closes the application and notifies the professional. They can correct the documents and resubmit." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: pendingDecision.request.documents.map((document) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", children: document }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: documentKind(document) })
              ]
            },
            document
          )) })
        ] }) : null
      }
    )
  ] });
}
export {
  AdminVerification as default
};
