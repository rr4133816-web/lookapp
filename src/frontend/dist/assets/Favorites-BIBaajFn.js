import { f as useApp, j as jsxRuntimeExports, L as Link, k as Compass, m as motion } from "./index-Dpq2E7IO.js";
import { P as ProfessionalCard } from "./ProfessionalCard-DaAKIw2R.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { p as professionals } from "./professionals-CzEAapSV.js";
import { s as staggerContainer } from "./motion-DSc3ayC3.js";
import { H as Heart } from "./heart-D0Yirsmd.js";
import "./rating-BsnzBB4p.js";
import "./map-pin-Db--45lR.js";
function Favorites() {
  const { favorites } = useApp();
  const saved = professionals.filter(
    (professional) => favorites.includes(professional.id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Favourites" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Saved professionals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: saved.length > 0 ? `You have saved ${saved.length} ${saved.length === 1 ? "professional" : "professionals"}. Book directly or compare them side by side.` : "Save professionals you are considering and they will appear here." })
    ] }),
    saved.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Heart,
        title: "No saved professionals yet",
        description: "Tap the heart on any profile to save it here for later.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/app/discover",
            "data-ocid": "favorites.empty_discover_button",
            className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "size-4" }),
              "Browse professionals"
            ]
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
        children: saved.map((professional, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProfessionalCard,
          {
            professional,
            index
          },
          professional.id
        ))
      }
    )
  ] });
}
export {
  Favorites as default
};
