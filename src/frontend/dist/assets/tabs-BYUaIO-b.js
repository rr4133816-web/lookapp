import { r as reactExports, j as jsxRuntimeExports, m as motion, e as cn } from "./index-Dpq2E7IO.js";
function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  listClassName
}) {
  var _a;
  const [internal, setInternal] = reactExports.useState(
    defaultValue ?? ((_a = items[0]) == null ? void 0 : _a.value) ?? ""
  );
  const active = value ?? internal;
  const groupId = reactExports.useId();
  const select = (next) => {
    if (value === void 0) setInternal(next);
    onValueChange == null ? void 0 : onValueChange(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "tablist",
        "aria-label": "Section tabs",
        className: cn(
          "no-scrollbar flex w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-muted/60 p-1",
          listClassName
        ),
        children: items.map((item) => {
          const isActive = item.value === active;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              id: `${groupId}-tab-${item.value}`,
              "aria-selected": isActive,
              "aria-controls": `${groupId}-panel-${item.value}`,
              onClick: () => select(item.value),
              className: cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              ),
              children: [
                isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    layoutId: `${groupId}-indicator`,
                    transition: { type: "spring", stiffness: 380, damping: 32 },
                    className: "absolute inset-0 rounded-full bg-primary shadow-primary-glow"
                  }
                ) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 inline-flex items-center gap-2", children: [
                  item.icon,
                  item.label,
                  typeof item.count === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none",
                        isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                      ),
                      children: item.count
                    }
                  ) : null
                ] })
              ]
            },
            item.value
          );
        })
      }
    ),
    children ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "tabpanel",
        id: `${groupId}-panel-${active}`,
        "aria-labelledby": `${groupId}-tab-${active}`,
        children: children(active)
      }
    ) : null
  ] });
}
export {
  Tabs as T
};
