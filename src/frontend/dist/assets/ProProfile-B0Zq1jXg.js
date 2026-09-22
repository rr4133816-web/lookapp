import { f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, A as Avatar, B as Badge, a as BadgeCheck } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { L as Label, T as Textarea, I as Input } from "./input-ndI6bRbf.js";
import { M as Modal } from "./modal-D-p7CZsN.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { S as Save } from "./save-DSPJupqj.js";
import { P as Pencil } from "./pencil-DPfpyJyl.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
import { G as Globe } from "./globe-B8DKmQcX.js";
import { A as Award } from "./award-DDAKV61F.js";
import { P as Plus } from "./plus-Cat3_AZo.js";
import { T as Trash2 } from "./trash-2-CzJTn4uE.js";
const PRO_ID = "p-01";
function ProProfile() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const [editing, setEditing] = reactExports.useState(false);
  const [bio, setBio] = reactExports.useState((professional == null ? void 0 : professional.bio) ?? "");
  const [location, setLocation] = reactExports.useState((professional == null ? void 0 : professional.location) ?? "");
  const [price, setPrice] = reactExports.useState(`${(professional == null ? void 0 : professional.startingPrice) ?? 0}`);
  const [credentialOpen, setCredentialOpen] = reactExports.useState(false);
  const [credentialTitle, setCredentialTitle] = reactExports.useState("");
  const [credentialIssuer, setCredentialIssuer] = reactExports.useState("");
  const [credentials, setCredentials] = reactExports.useState(
    (professional == null ? void 0 : professional.credentials) ?? []
  );
  if (!professional) return null;
  const save = () => {
    setEditing(false);
    pushToast({
      title: "Profile saved",
      description: "Your public profile has been updated.",
      variant: "success"
    });
  };
  const addCredential = () => {
    if (!credentialTitle.trim() || !credentialIssuer.trim()) return;
    setCredentials((current) => [
      ...current,
      {
        id: `c-new-${Date.now()}`,
        title: credentialTitle.trim(),
        issuer: credentialIssuer.trim(),
        year: (/* @__PURE__ */ new Date()).getFullYear()
      }
    ]);
    setCredentialTitle("");
    setCredentialIssuer("");
    setCredentialOpen(false);
    pushToast({
      title: "Credential added",
      description: "It will appear on your public profile.",
      variant: "success"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Your public profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "This is what customers see when they find you in search results." })
      ] }),
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "secondary",
            onClick: () => setEditing(false),
            "data-ocid": "pro_profile.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: save,
            "data-ocid": "pro_profile.save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
              "Save changes"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => setEditing(true),
          "data-ocid": "pro_profile.edit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }),
            "Edit profile"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card shadow-elevated",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-gradient-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-6 md:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  src: professional.avatar,
                  name: professional.name,
                  size: "xl",
                  className: "ring-4 ring-card"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: professional.name }),
                  professional.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" }),
                    "Verified"
                  ] }) : null,
                  professional.topRated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "primary", children: "Top rated" }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: professional.profession })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-4", children: [
              { icon: MapPin, label: "Location", value: location },
              {
                icon: Globe,
                label: "Languages",
                value: professional.languages.join(", ")
              },
              {
                icon: Award,
                label: "Experience",
                value: `${professional.yearsExperience} years`
              },
              {
                icon: BadgeCheck,
                label: "Completed",
                value: `${professional.completedJobs} sessions`
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: item.value })
              ] })
            ] }, item.label)) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Professional bio" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pro-bio", children: "Bio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pro-bio",
              value: bio,
              onChange: (event) => setBio(event.target.value),
              rows: 6,
              "data-ocid": "pro_profile.bio_input"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: bio }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Contact and pricing" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pro-location", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pro-location",
                value: location,
                onChange: (event) => setLocation(event.target.value),
                disabled: !editing,
                "data-ocid": "pro_profile.location_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pro-price", children: "Starting price (USD)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pro-price",
                type: "number",
                value: price,
                onChange: (event) => setPrice(event.target.value),
                disabled: !editing,
                "data-ocid": "pro_profile.price_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: "Your starting price is shown on search cards. Individual services can be priced separately." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Credentials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "secondary",
            size: "sm",
            onClick: () => setCredentialOpen(true),
            "data-ocid": "pro_profile.add_credential_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
              "Add credential"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: credentials.map((credential, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          variants: staggerItem,
          initial: "hidden",
          animate: "visible",
          className: "flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3.5",
          "data-ocid": `pro_profile.credential.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: credential.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  credential.issuer,
                  " · ",
                  credential.year
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon-sm",
                "aria-label": `Remove ${credential.title}`,
                className: "text-destructive hover:bg-destructive/10",
                onClick: () => setCredentials(
                  (current) => current.filter((item) => item.id !== credential.id)
                ),
                "data-ocid": `pro_profile.remove_credential_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
              }
            )
          ]
        },
        credential.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: credentialOpen,
        onClose: () => setCredentialOpen(false),
        title: "Add a credential",
        description: "Credentials appear on your public profile once verified.",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: () => setCredentialOpen(false),
              "data-ocid": "pro_profile.cancel_credential_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: addCredential,
              "data-ocid": "pro_profile.save_credential_button",
              children: "Add credential"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "credential-title", children: "Credential name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "credential-title",
                value: credentialTitle,
                onChange: (event) => setCredentialTitle(event.target.value),
                placeholder: "AWS Solutions Architect Professional",
                "data-ocid": "pro_profile.credential_title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "credential-issuer", children: "Issuing body" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "credential-issuer",
                value: credentialIssuer,
                onChange: (event) => setCredentialIssuer(event.target.value),
                placeholder: "Amazon Web Services",
                "data-ocid": "pro_profile.credential_issuer_input"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ProProfile as default
};
