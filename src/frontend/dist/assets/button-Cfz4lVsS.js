import { j as jsxRuntimeExports, m as motion, e as cn, J as cva } from "./index-Dpq2E7IO.js";
const lookButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-smooth outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-primary-glow hover:bg-primary/92 hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-card text-foreground border border-border shadow-xs hover:border-primary/40 hover:bg-secondary hover:-translate-y-0.5 active:translate-y-0",
        accent: "bg-accent text-accent-foreground shadow-accent-glow hover:bg-accent/92 hover:-translate-y-0.5 active:translate-y-0",
        ghost: "text-foreground hover:bg-muted",
        outline: "border border-primary/30 text-primary bg-transparent hover:bg-primary-soft",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline rounded-md"
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-12 px-8 text-base [&_svg]:size-5",
        icon: "size-10 [&_svg]:size-4",
        "icon-sm": "size-8 [&_svg]:size-3.5"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);
function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type,
      whileTap: { scale: 0.98 },
      className: cn(lookButtonVariants({ variant, size }), className),
      ...props
    }
  );
}
export {
  Button as B
};
