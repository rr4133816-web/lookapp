import { f as useApp, r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-DEkbNMNy.js";
import { L as Label, I as Input, T as Textarea } from "./input-ndI6bRbf.js";
import { M as Modal } from "./modal-D-p7CZsN.js";
import { g as getProfessional } from "./professionals-CzEAapSV.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { P as Plus } from "./plus-Cat3_AZo.js";
import { S as Sparkles } from "./sparkles-Cggxsg4G.js";
import { C as Clock } from "./clock-m4hju-8B.js";
import { P as Pencil } from "./pencil-DPfpyJyl.js";
import { T as Trash2 } from "./trash-2-CzJTn4uE.js";
const PRO_ID = "p-01";
function ProServices() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const [services, setServices] = reactExports.useState(
    (professional == null ? void 0 : professional.services) ?? []
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("200");
  const [duration, setDuration] = reactExports.useState("60");
  if (!professional) return null;
  const openCreate = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("200");
    setDuration("60");
    setModalOpen(true);
  };
  const openEdit = (service) => {
    setEditingId(service.id);
    setName(service.name);
    setDescription(service.description);
    setPrice(`${service.price}`);
    setDuration(`${service.durationMinutes}`);
    setModalOpen(true);
  };
  const save = () => {
    if (!name.trim() || !description.trim()) return;
    if (editingId) {
      setServices(
        (current) => current.map(
          (service) => service.id === editingId ? {
            ...service,
            name: name.trim(),
            description: description.trim(),
            price: Number(price) || 0,
            durationMinutes: Number(duration) || 60
          } : service
        )
      );
      pushToast({ title: "Service updated", variant: "success" });
    } else {
      setServices((current) => [
        ...current,
        {
          id: `s-new-${Date.now()}`,
          name: name.trim(),
          description: description.trim(),
          price: Number(price) || 0,
          durationMinutes: Number(duration) || 60
        }
      ]);
      pushToast({
        title: "Service added",
        description: "It is now bookable from your profile.",
        variant: "success"
      });
    }
    setModalOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "What you offer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Each service has its own price and duration. Customers book directly from this list." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: openCreate,
          "data-ocid": "pro_services.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
            "Add service"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-4 lg:grid-cols-2",
        children: services.map((service, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex h-full flex-col gap-4 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: service.name }),
              service.popular ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3" }),
                "Popular"
              ] }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: service.description })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-semibold", children: [
                "$",
                service.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
                service.durationMinutes,
                " min"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon-sm",
                  "aria-label": `Edit ${service.name}`,
                  onClick: () => openEdit(service),
                  "data-ocid": `pro_services.edit_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon-sm",
                  "aria-label": `Delete ${service.name}`,
                  className: "text-destructive hover:bg-destructive/10",
                  onClick: () => {
                    setServices(
                      (current) => current.filter((item) => item.id !== service.id)
                    );
                    pushToast({
                      title: "Service removed",
                      description: `${service.name} is no longer bookable.`,
                      variant: "default"
                    });
                  },
                  "data-ocid": `pro_services.delete_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                }
              )
            ] })
          ] })
        ] }) }) }, service.id))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Pricing guidance" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid gap-4 sm:grid-cols-3", children: [
        {
          label: "Your average",
          value: `$${Math.round(services.reduce((total, service) => total + service.price, 0) / Math.max(services.length, 1))}`
        },
        { label: "Category average", value: "$310" },
        { label: "Top earners", value: "$480" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-xl font-semibold", children: item.value })
      ] }, item.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        title: editingId ? "Edit service" : "Add a service",
        description: "Customers see this exactly as you write it.",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: () => setModalOpen(false),
              "data-ocid": "pro_services.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: save,
              "data-ocid": "pro_services.save_button",
              children: editingId ? "Save changes" : "Add service"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "service-name", children: "Service name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "service-name",
                value: name,
                onChange: (event) => setName(event.target.value),
                placeholder: "Cloud Architecture Audit",
                "data-ocid": "pro_services.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "service-description", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "service-description",
                value: description,
                onChange: (event) => setDescription(event.target.value),
                placeholder: "What the customer gets from this session.",
                "data-ocid": "pro_services.description_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "service-price", children: "Price (USD)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "service-price",
                  type: "number",
                  value: price,
                  onChange: (event) => setPrice(event.target.value),
                  "data-ocid": "pro_services.price_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "service-duration", children: "Duration (minutes)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "service-duration",
                  type: "number",
                  value: duration,
                  onChange: (event) => setDuration(event.target.value),
                  "data-ocid": "pro_services.duration_input"
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  ProServices as default
};
