import { l as createLucideIcon, f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, A as Avatar, B as Badge, a as BadgeCheck, c as Star, C as CalendarCheck, M as MessageSquare, L as Link } from "./index-Dpq2E7IO.js";
import { S as StatCard } from "./StatCard-lEGjDQVJ.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkbNMNy.js";
import { L as Label, I as Input } from "./input-ndI6bRbf.js";
import { M as Modal } from "./modal-D-p7CZsN.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { P as Pencil } from "./pencil-DPfpyJyl.js";
import { M as Mail } from "./mail-DIoUC0NZ.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
import { H as Heart } from "./heart-D0Yirsmd.js";
import "./arrow-up-right-DCzabt5c.js";
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function CustomerProfile() {
  const { bookings, favorites, conversations, pushToast } = useApp();
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("Alex Morgan");
  const [email, setEmail] = reactExports.useState("alex.morgan@lookapp.io");
  const [phone, setPhone] = reactExports.useState("+1 (614) 555-0142");
  const [location, setLocation] = reactExports.useState("Columbus, OH");
  const completed = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;
  const unread = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0
  );
  const save = () => {
    setEditOpen(false);
    pushToast({
      title: "Profile updated",
      description: "Your contact details have been saved.",
      variant: "success"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Your account" })
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name, size: "xl", className: "ring-4 ring-card" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" }),
                      "Verified customer"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Member since March 2025" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  onClick: () => setEditOpen(true),
                  "data-ocid": "profile.edit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }),
                    "Edit profile"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-4", children: [
              { icon: Mail, label: "Email", value: email },
              { icon: Phone, label: "Phone", value: phone },
              { icon: MapPin, label: "Location", value: location },
              { icon: Star, label: "Average rating given", value: "4.9 / 5" }
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total bookings",
              value: `${bookings.length}`,
              icon: CalendarCheck,
              hint: "Across 6 professionals",
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Completed sessions",
              value: `${completed}`,
              icon: BadgeCheck,
              tone: "success",
              hint: "All rated 4 stars or above",
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Saved professionals",
              value: `${favorites.length}`,
              icon: Heart,
              tone: "accent",
              hint: "Ready to book",
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Unread messages",
              value: `${unread}`,
              icon: MessageSquare,
              tone: "warning",
              hint: "Replies waiting",
              index: 3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Recent activity" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: bookings.slice(0, 4).map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            variants: staggerItem,
            className: "flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: booking.serviceName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                  booking.id,
                  " · ",
                  booking.date
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: booking.status === "completed" ? "success" : booking.status === "cancelled" ? "destructive" : "primary",
                  children: booking.status
                }
              )
            ]
          },
          booking.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Quick links" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: [
          { to: "/app/bookings", label: "Manage your bookings" },
          { to: "/app/favorites", label: "Review saved professionals" },
          {
            to: "/app/settings",
            label: "Notification and privacy settings"
          },
          { to: "/app/discover", label: "Find a new professional" }
        ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: link.to,
            className: "flex items-center justify-between gap-4 rounded-lg border border-border/60 p-3.5 text-sm transition-smooth hover:border-primary/40 hover:bg-secondary",
            children: [
              link.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" })
            ]
          },
          link.to
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: editOpen,
        onClose: () => setEditOpen(false),
        title: "Edit profile",
        description: "Update the contact details on your account.",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: () => setEditOpen(false),
              "data-ocid": "profile.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: save,
              "data-ocid": "profile.save_button",
              children: "Save changes"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Full name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-name",
                value: name,
                onChange: (event) => setName(event.target.value),
                "data-ocid": "profile.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-email", children: "Email address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-email",
                type: "email",
                value: email,
                onChange: (event) => setEmail(event.target.value),
                "data-ocid": "profile.email_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-phone", children: "Phone number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-phone",
                value: phone,
                onChange: (event) => setPhone(event.target.value),
                "data-ocid": "profile.phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-location", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profile-location",
                value: location,
                onChange: (event) => setLocation(event.target.value),
                "data-ocid": "profile.location_input"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  CustomerProfile as default
};
