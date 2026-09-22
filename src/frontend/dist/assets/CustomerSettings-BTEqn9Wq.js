import { l as createLucideIcon, t as useTheme, f as useApp, r as reactExports, j as jsxRuntimeExports, v as Sun, w as Moon, s as Bell, B as Badge, e as cn } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { M as Modal } from "./modal-D-p7CZsN.js";
import { P as Palette } from "./palette--E6rNdvE.js";
import { G as Globe } from "./globe-B8DKmQcX.js";
import { L as Lock } from "./lock-COV5hqxd.js";
import { T as Trash2 } from "./trash-2-CzJTn4uE.js";
import "./motion-DSc3ayC3.js";
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
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-3.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, className: "text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm leading-relaxed text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        id,
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": label,
        onClick: () => onChange(!checked),
        "data-ocid": `settings.${id}_switch`,
        className: cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-smooth",
          checked ? "bg-primary" : "bg-muted"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "absolute top-0.5 size-5 rounded-full bg-card shadow-xs transition-smooth",
              checked ? "left-[22px]" : "left-0.5"
            )
          }
        )
      }
    )
  ] });
}
function CustomerSettings() {
  const { theme, toggleTheme } = useTheme();
  const { pushToast } = useApp();
  const [bookingEmails, setBookingEmails] = reactExports.useState(true);
  const [messageEmails, setMessageEmails] = reactExports.useState(true);
  const [marketingEmails, setMarketingEmails] = reactExports.useState(false);
  const [pushEnabled, setPushEnabled] = reactExports.useState(true);
  const [profileVisible, setProfileVisible] = reactExports.useState(true);
  const [deleteOpen, setDeleteOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Preferences" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Control how LookApp looks, how it contacts you and who can see your profile." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "size-4 text-primary" }),
          "Appearance"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Theme" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-sm text-muted-foreground", children: [
              "Currently using the ",
              theme,
              " theme. Your choice is remembered on this device."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: toggleTheme,
              "data-ocid": "settings.theme_toggle",
              children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4" }),
                "Light"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" }),
                "Dark"
              ] })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-4 text-primary" }),
          "Region"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "settings-timezone",
                className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                children: "Time zone"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "settings-timezone",
                defaultValue: "America/New_York",
                "data-ocid": "settings.timezone_select",
                className: "h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "America/New_York", children: "Eastern Time (ET)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "America/Chicago", children: "Central Time (CT)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "America/Denver", children: "Mountain Time (MT)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "America/Los_Angeles", children: "Pacific Time (PT)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "settings-currency",
                className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
                children: "Currency"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "settings-currency",
                defaultValue: "USD",
                "data-ocid": "settings.currency_select",
                className: "h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "USD", children: "US Dollar (USD)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "EUR", children: "Euro (EUR)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "GBP", children: "Pound Sterling (GBP)" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-4 text-primary" }),
          "Notifications"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "divide-y divide-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              id: "booking-emails",
              label: "Booking updates by email",
              description: "Confirmations, reminders and cancellations.",
              checked: bookingEmails,
              onChange: setBookingEmails
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              id: "message-emails",
              label: "Message notifications",
              description: "An email when a professional replies to you.",
              checked: messageEmails,
              onChange: setMessageEmails
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              id: "push-notifications",
              label: "In-app notifications",
              description: "Show the activity badge in the header.",
              checked: pushEnabled,
              onChange: setPushEnabled
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              id: "marketing-emails",
              label: "Product news",
              description: "Occasional updates about new categories and features.",
              checked: marketingEmails,
              onChange: setMarketingEmails
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-4 text-primary" }),
          "Privacy"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "divide-y divide-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              id: "profile-visible",
              label: "Public profile",
              description: "Let professionals see your name and review history.",
              checked: profileVisible,
              onChange: setProfileVisible
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "Last changed 4 months ago." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => pushToast({
                  title: "Password reset link sent",
                  description: "Check your inbox to choose a new password.",
                  variant: "success"
                }),
                "data-ocid": "settings.change_password_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-4" }),
                  "Change"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Delete account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "Permanently remove your account and booking history." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "text-destructive hover:bg-destructive/10",
                onClick: () => setDeleteOpen(true),
                "data-ocid": "settings.delete_account_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 rounded-[var(--radius)] border border-border/60 bg-muted/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neutral", children: "Demo environment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: "Preferences are stored locally in your browser. No data leaves this device." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: deleteOpen,
        onClose: () => setDeleteOpen(false),
        title: "Delete your account?",
        description: "This removes your profile, bookings and saved professionals. This cannot be undone.",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: () => setDeleteOpen(false),
              "data-ocid": "settings.cancel_delete_button",
              children: "Keep my account"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "destructive",
              onClick: () => {
                setDeleteOpen(false);
                pushToast({
                  title: "Account deletion is disabled",
                  description: "This is a demonstration environment, so nothing was removed.",
                  variant: "default"
                });
              },
              "data-ocid": "settings.confirm_delete_button",
              children: "Delete account"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: "In a live environment this would permanently delete your account. Here it simply shows the confirmation flow." })
      }
    )
  ] });
}
export {
  CustomerSettings as default
};
