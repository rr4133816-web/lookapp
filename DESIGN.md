# Design Brief

## Direction

LookApp — Calm Confidence: a premium professional-services marketplace where deep indigo authority meets a teal "verified" signal on clean, airy surfaces.

## Tone

Refined modern SaaS — restrained and confident, closer to Linear/Stripe than to a decorative marketing page; whitespace and type hierarchy do the work, not ornament.

## Differentiation

A 3px indigo→teal gradient "signal rule" that animates under active nav items and card hovers — one consistent signature gesture that reads as professional verification.

## Color Palette

| Token      | OKLCH (light)   | Role   |
| ---------- | --------------- | ------ |
| background | 0.985 0.004 265 | cool off-white page base so white cards lift |
| foreground | 0.19 0.02 265   | primary text, near-ink indigo-black |
| card       | 1 0 0           | pure-white elevated surfaces |
| primary    | 0.48 0.19 267   | deep indigo — CTAs, active nav, links |
| accent     | 0.62 0.13 192   | teal — verified badges, ratings, secondary CTAs |
| muted      | 0.96 0.006 265  | section alternation, inactive chips, skeletons |
| destructive| 0.55 0.21 27    | errors, cancel booking |
| success    | 0.6 0.15 155    | confirmed bookings, availability |

Dark mode mirrors these with L inverted (bg 0.165, primary 0.7, accent 0.74) — tuned, not auto-inverted.

## Typography

- Display: Space Grotesk — headings, hero, section titles, logo wordmark
- Body: DM Sans — paragraphs, UI labels, buttons, forms
- Mono: JetBrains Mono — prices, ratings counts, booking IDs, stats
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-2xl md:text-4xl font-bold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase text-muted-foreground`, body `text-base leading-relaxed`

## Elevation & Depth

Three-tier surface hierarchy — page (off-white) → card (white + `shadow-elevated`) → popover (white + `shadow-elevated-lg`); shadows are soft, diffuse and indigo-tinted, never hard or glowing.

## Structural Zones

| Zone    | Background                  | Border        | Notes                                            |
| ------- | --------------------------- | ------------- | ------------------------------------------------ |
| Header  | `bg-card/80` + `surface-glass` | `border-b` | sticky, blurs on scroll, logo + nav + CTA pill   |
| Content | `bg-background`             | —             | alternate `bg-muted/40` bands; `bg-gradient-subtle` hero |
| Sidebar | `bg-sidebar`                | `border-r`    | filter rail on desktop, sheet on mobile          |
| Footer  | `bg-muted/40`               | `border-t`    | 4-column link grid + newsletter, muted text      |

## Spacing & Rhythm

Sections breathe at `py-16 md:py-24`; content blocks group at `space-y-6`; micro-spacing uses `gap-2`/`gap-3`; container is centered with `px-4 md:px-8` and a `1400px` max width.

## Component Patterns

- Buttons: `rounded-full` pills; primary = indigo fill + `shadow-primary-glow` + hover lift `-translate-y-0.5`; secondary = white with `border`; ghost = transparent hover `bg-muted`
- Cards: `rounded-[var(--radius)]` (14px), white, `border border-border/60`, `shadow-elevated`, hover raises to `shadow-elevated-lg` and `-translate-y-1`
- Badges: `rounded-full` pills; teal `accent-soft` for "Verified"/"Top rated", `primary-soft` for categories, `muted` for neutral tags
- Inputs: `rounded-lg` (8px), `border-input`, focus ring `ring-2 ring-ring/40`, generous `h-11` targets

## Motion

- Entrance: sections fade + rise 14px over 0.6s `cubic-bezier(0.16,1,0.3,1)`, staggered 60ms per child
- Hover: cards lift 4px + shadow deepen 0.3s; buttons press to `scale-0.98`; signal rule scales X from left 0.35s
- Decorative: slow 6s floating gradient orbs in hero, soft pulse on live/available indicators
- All motion disabled under `prefers-reduced-motion: reduce`

## Constraints

- Frontend-only: mock data and local state, no backend/auth/payment calls
- Semantic tokens only — no hex, `rgb()`, or arbitrary `bg-[#...]` in components
- Light-first with a fully tuned dark theme; both must pass AA+ contrast
- Lucide icons exclusively, 1.5px stroke; `motion` (Framer Motion) for animation

## Signature Detail

The animated indigo→teal gradient signal rule — a 3px underline that sweeps in on hover/active across nav items, cards, and tabs, unifying the whole product around one "verified professional" gesture.
