import { f as useApp, j as jsxRuntimeExports, m as motion, A as Avatar, L as Link, e as cn, B as Badge, a as BadgeCheck, c as Star } from "./index-Dpq2E7IO.js";
import { R as Rating } from "./rating-BsnzBB4p.js";
import { a as staggerItem, c as cardHover } from "./motion-DSc3ayC3.js";
import { H as Heart } from "./heart-D0Yirsmd.js";
import { M as MapPin } from "./map-pin-Db--45lR.js";
function ProfessionalCard({
  professional,
  className,
  index = 0
}) {
  const { isFavorite, toggleFavorite, pushToast } = useApp();
  const favorite = isFavorite(professional.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      variants: staggerItem,
      initial: "hidden",
      animate: "visible",
      whileHover: "hover",
      className: cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card shadow-elevated transition-smooth hover:shadow-elevated-lg",
        className
      ),
      "data-ocid": `professional.card.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: cardHover, className: "flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-5 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Avatar,
            {
              src: professional.avatar,
              name: professional.name,
              size: "lg",
              online: professional.availability.length >= 5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-base font-semibold leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: `/app/professionals/${professional.id}`,
                    className: "transition-smooth hover:text-primary",
                    children: professional.name
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-sm text-muted-foreground", children: professional.profession })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": favorite ? `Remove ${professional.name} from favourites` : `Save ${professional.name} to favourites`,
                  "aria-pressed": favorite,
                  onClick: () => {
                    toggleFavorite(professional.id);
                    pushToast({
                      title: favorite ? `${professional.name} removed from favourites` : `${professional.name} saved to favourites`,
                      variant: favorite ? "default" : "success"
                    });
                  },
                  className: "grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: cn(
                        "size-4",
                        favorite && "fill-destructive text-destructive"
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Rating,
                {
                  value: professional.rating,
                  count: professional.reviewCount,
                  size: "sm"
                }
              ),
              professional.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3" }),
                "Verified"
              ] }) : null,
              professional.topRated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3" }),
                "Top rated"
              ] }) : null
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 px-5 text-sm leading-relaxed text-muted-foreground", children: professional.bio }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
            professional.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            professional.yearsExperience,
            " yrs exp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            professional.completedJobs,
            " jobs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between gap-3 border-t border-border/60 p-5 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "From" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-lg font-semibold leading-none", children: [
              "$",
              professional.startingPrice,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "/session" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: `/app/professionals/${professional.id}`,
              "data-ocid": `professional.view_button.${index + 1}`,
              className: "inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92",
              children: "View profile"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  ProfessionalCard as P
};
