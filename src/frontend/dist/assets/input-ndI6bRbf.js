import { j as jsxRuntimeExports, e as cn } from "./index-Dpq2E7IO.js";
function Input({
  className,
  type,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "flex h-11 w-full min-w-0 rounded-lg border border-input bg-card px-3.5 py-2 text-sm text-foreground shadow-xs transition-smooth outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      ),
      ...props
    }
  );
}
function Textarea({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "flex min-h-24 w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-smooth outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Label({ className, ...props }) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: label association is provided by consumers via htmlFor
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        "data-slot": "label",
        className: cn(
          "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
          className
        ),
        ...props
      }
    )
  );
}
export {
  Input as I,
  Label as L,
  Textarea as T
};
