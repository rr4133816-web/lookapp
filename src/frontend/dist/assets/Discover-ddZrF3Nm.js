import { l as createLucideIcon, n as useSearchParams, r as reactExports, j as jsxRuntimeExports, e as cn, B as Badge, X, c as Star, P as ProfessionalCardSkeleton, k as Compass, m as motion, D as Drawer } from "./index-Dpq2E7IO.js";
import { P as ProfessionalCard } from "./ProfessionalCard-DaAKIw2R.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { c as categories } from "./categories-B5CYdEVc.js";
import { p as professionals } from "./professionals-CzEAapSV.js";
import { s as staggerContainer } from "./motion-DSc3ayC3.js";
import { S as SearchX } from "./search-x-CTqGfHE3.js";
import "./rating-BsnzBB4p.js";
import "./heart-D0Yirsmd.js";
import "./map-pin-Db--45lR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const SORT_OPTIONS = [
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "experience", label: "Most experienced" }
];
const PRICE_BANDS = [
  { value: "any", label: "Any price" },
  { value: "under-120", label: "Under $120" },
  { value: "120-200", label: "$120 – $200" },
  { value: "over-200", label: "Over $200" }
];
const RATING_OPTIONS = [
  { value: "any", label: "Any rating" },
  { value: "4.5", label: "4.5 and up" },
  { value: "4.8", label: "4.8 and up" },
  { value: "4.9", label: "4.9 and up" }
];
const EXPERIENCE_OPTIONS = [
  { value: "any", label: "Any experience" },
  { value: "5", label: "5+ years" },
  { value: "8", label: "8+ years" },
  { value: "10", label: "10+ years" }
];
const AVAILABILITY_OPTIONS = [
  { value: "any", label: "Any day" },
  { value: "Mon", label: "Mondays" },
  { value: "Tue", label: "Tuesdays" },
  { value: "Wed", label: "Wednesdays" },
  { value: "Thu", label: "Thursdays" },
  { value: "Fri", label: "Fridays" },
  { value: "Sat", label: "Saturdays" },
  { value: "Sun", label: "Sundays" }
];
const LOCATION_OPTIONS = [
  { value: "any", label: "Anywhere" },
  { value: "Austin, TX", label: "Austin, TX" },
  { value: "Seattle, WA", label: "Seattle, WA" },
  { value: "New York, NY", label: "New York, NY" },
  { value: "Chicago, IL", label: "Chicago, IL" },
  { value: "Denver, CO", label: "Denver, CO" },
  { value: "Remote", label: "Remote" }
];
const SELECT_CLASS = "h-11 w-full rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30";
function Discover() {
  var _a, _b, _c, _d, _e;
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = reactExports.useState(false);
  const [loading] = reactExports.useState(false);
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const location = params.get("location") ?? "any";
  const rating = params.get("rating") ?? "any";
  const priceBand = params.get("price") ?? "any";
  const availability = params.get("availability") ?? "any";
  const experience = params.get("experience") ?? "any";
  const verifiedOnly = params.get("verified") === "1";
  const sort = params.get("sort") ?? "rating";
  const updateParams = (updates) => {
    const nextParams = new URLSearchParams(params);
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "" || value === "any") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    }
    setParams(nextParams, { replace: true });
  };
  const results = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = professionals.filter((professional) => {
      const matchesTerm = !term || professional.name.toLowerCase().includes(term) || professional.profession.toLowerCase().includes(term) || professional.bio.toLowerCase().includes(term) || professional.location.toLowerCase().includes(term) || professional.services.some(
        (service) => service.name.toLowerCase().includes(term)
      );
      const matchesCategory = category === "all" || professional.category === category;
      const matchesLocation = location === "any" || professional.location === location;
      const matchesRating = rating === "any" || professional.rating >= Number(rating);
      const matchesVerified = !verifiedOnly || professional.verified;
      const matchesPrice = priceBand === "any" || priceBand === "under-120" && professional.startingPrice < 120 || priceBand === "120-200" && professional.startingPrice >= 120 && professional.startingPrice <= 200 || priceBand === "over-200" && professional.startingPrice > 200;
      const matchesAvailability = availability === "any" || professional.availability.includes(availability);
      const matchesExperience = experience === "any" || professional.yearsExperience >= Number(experience);
      return matchesTerm && matchesCategory && matchesLocation && matchesRating && matchesVerified && matchesPrice && matchesAvailability && matchesExperience;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.startingPrice - b.startingPrice;
      if (sort === "price-desc") return b.startingPrice - a.startingPrice;
      if (sort === "experience") return b.yearsExperience - a.yearsExperience;
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    });
    return list;
  }, [
    query,
    category,
    location,
    rating,
    sort,
    priceBand,
    availability,
    experience,
    verifiedOnly
  ]);
  const activeFilterCount = (category !== "all" ? 1 : 0) + (location !== "any" ? 1 : 0) + (rating !== "any" ? 1 : 0) + (priceBand !== "any" ? 1 : 0) + (availability !== "any" ? 1 : 0) + (experience !== "any" ? 1 : 0) + (verifiedOnly ? 1 : 0);
  const resetFilters = () => {
    setParams({}, { replace: true });
  };
  const filterPanel = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-pressed": category === "all",
            onClick: () => updateParams({ category: null }),
            className: cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-smooth",
              category === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            ),
            children: "All fields"
          }
        ),
        categories.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-pressed": category === item.slug,
            onClick: () => updateParams({ category: item.slug }),
            className: cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-smooth",
              category === item.slug ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            ),
            children: item.name
          },
          item.slug
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "discover-location",
          className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
          children: "Location"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "discover-location",
          value: location,
          onChange: (event) => updateParams({ location: event.target.value }),
          "data-ocid": "discover.location_select",
          className: cn(SELECT_CLASS, "mt-3"),
          children: LOCATION_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "discover-rating",
          className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
          children: "Minimum rating"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "discover-rating",
          value: rating,
          onChange: (event) => updateParams({ rating: event.target.value }),
          "data-ocid": "discover.rating_select",
          className: cn(SELECT_CLASS, "mt-3"),
          children: RATING_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Starting price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: PRICE_BANDS.map((band) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex cursor-pointer items-center gap-2.5 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "price-band",
                checked: priceBand === band.value,
                onChange: () => updateParams({ price: band.value }),
                className: "size-4 accent-[oklch(var(--primary))]"
              }
            ),
            band.label
          ]
        },
        band.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "discover-availability",
          className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
          children: "Availability"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "discover-availability",
          value: availability,
          onChange: (event) => updateParams({ availability: event.target.value }),
          "data-ocid": "discover.availability_select",
          className: cn(SELECT_CLASS, "mt-3"),
          children: AVAILABILITY_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "discover-experience",
          className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
          children: "Experience"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "discover-experience",
          value: experience,
          onChange: (event) => updateParams({ experience: event.target.value }),
          "data-ocid": "discover.experience_select",
          className: cn(SELECT_CLASS, "mt-3"),
          children: EXPERIENCE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Trust" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-3 flex cursor-pointer items-center gap-2.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: verifiedOnly,
            onChange: (event) => updateParams({ verified: event.target.checked ? "1" : null }),
            className: "size-4 accent-[oklch(var(--primary))]"
          }
        ),
        "Verified professionals only"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "secondary",
        className: "w-full",
        onClick: resetFilters,
        "data-ocid": "discover.reset_button",
        children: "Reset all filters"
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Discover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Find your professional" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Filter by field, price and verification status. Every profile shows real credentials and reviews from completed sessions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            value: query,
            onChange: (event) => updateParams({ q: event.target.value }),
            onClear: () => updateParams({ q: null }),
            placeholder: "Search by skill, name or location",
            "aria-label": "Search professionals",
            containerClassName: "flex-1",
            "data-ocid": "discover.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "discover-sort", children: "Sort results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "discover-sort",
              value: sort,
              onChange: (event) => updateParams({ sort: event.target.value }),
              "data-ocid": "discover.sort_select",
              className: "h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30",
              children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: () => setFiltersOpen(true),
              className: "lg:hidden",
              "data-ocid": "discover.filters_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "size-4" }),
                "Filters",
                activeFilterCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "primary", className: "ml-1", children: activeFilterCount }) : null
              ]
            }
          )
        ] })
      ] }),
      activeFilterCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Active filters:" }),
        category !== "all" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => updateParams({ category: null }),
            className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15",
            children: [
              (_a = categories.find((item) => item.slug === category)) == null ? void 0 : _a.name,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            ]
          }
        ) : null,
        location !== "any" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => updateParams({ location: null }),
            className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15",
            children: [
              location,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            ]
          }
        ) : null,
        rating !== "any" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => updateParams({ rating: null }),
            className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15",
            children: [
              (_b = RATING_OPTIONS.find((option) => option.value === rating)) == null ? void 0 : _b.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            ]
          }
        ) : null,
        priceBand !== "any" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => updateParams({ price: null }),
            className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15",
            children: [
              (_c = PRICE_BANDS.find((band) => band.value === priceBand)) == null ? void 0 : _c.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            ]
          }
        ) : null,
        availability !== "any" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => updateParams({ availability: null }),
            className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15",
            children: [
              (_d = AVAILABILITY_OPTIONS.find(
                (option) => option.value === availability
              )) == null ? void 0 : _d.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            ]
          }
        ) : null,
        experience !== "any" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => updateParams({ experience: null }),
            className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition-smooth hover:bg-primary/15",
            children: [
              (_e = EXPERIENCE_OPTIONS.find(
                (option) => option.value === experience
              )) == null ? void 0 : _e.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            ]
          }
        ) : null,
        verifiedOnly ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => updateParams({ verified: null }),
            className: "inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent transition-smooth hover:bg-accent/15",
            children: [
              "Verified only",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            ]
          }
        ) : null
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold", children: "Filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-4 text-accent" })
        ] }),
        filterPanel
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: results.length }),
          " ",
          results.length === 1 ? "professional" : "professionals",
          " found"
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3", children: Array.from(
          { length: 6 },
          (_, index) => `discover-skeleton-${index}`
        ).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProfessionalCardSkeleton, {}, id)) }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: SearchX,
            title: "No professionals match those filters",
            description: "Try widening the price range, choosing a different field, or clearing your search term.",
            action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: resetFilters,
                "data-ocid": "discover.empty_reset_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "size-4" }),
                  "Reset filters"
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
            children: results.map((professional, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProfessionalCard,
              {
                professional,
                index
              },
              professional.id
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Drawer,
      {
        open: filtersOpen,
        onClose: () => setFiltersOpen(false),
        title: "Filters",
        description: "Narrow down the professionals you see.",
        side: "left",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "w-full",
            onClick: () => setFiltersOpen(false),
            "data-ocid": "discover.apply_filters_button",
            children: [
              "Show ",
              results.length,
              " results"
            ]
          }
        ),
        children: filterPanel
      }
    )
  ] });
}
export {
  Discover as default
};
