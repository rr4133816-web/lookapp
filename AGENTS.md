# Project Guidance

## User Preferences

- Frontend-only: all functionality simulated with mock data and local state
- React functional components and hooks, React Router, Tailwind CSS, Framer Motion, Lucide React icons
- Premium modern SaaS marketplace UI, not a generic admin template
- Minimal professional style: white/light-gray backgrounds, indigo/blue primary, teal/cyan accents, rounded cards, soft shadows, subtle gradients, generous spacing
- Optional dark mode toggle
- Butter-smooth Framer Motion animations with tasteful micro-interactions respecting prefers-reduced-motion
- Responsive desktop, tablet, and mobile layouts with mobile bottom navigation
- Reusable component architecture
- No Lorem Ipsum, no unfinished placeholder screens, no default browser styling, no broken navigation
- Must feel like a real premium startup product ready for a presentation demo
- Booking flow must be fully exercisable end to end by an automated tester
- No payment controls that trigger financial-control policy blocks

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Frontend stack: Vite + React 19 + TS + Tailwind 3. `motion` v12 is installed (import from 'motion/react'); framer-motion@13 is also installed. lucide-react, recharts, sonner, react-router-dom v7 are installed. Biome is the lint/format tool (double quotes, semicolons, 2-space).
- button.tsx exports `lookButtonVariants` (not `buttonVariants`) with sizes sm|md|lg|icon|icon-sm; there is no 'default' size.
- Design tokens live in src/frontend/src/index.css (indigo primary 0.48 0.19 267, teal accent 0.62 0.13 192, light + dark themes, motion utilities). Fonts: Space Grotesk / DM Sans / JetBrains Mono.
- Generated images live under src/frontend/public/assets/generated/ and must be referenced with their .dim_<W>x<H> suffix.
- Discover filter state is fully URL-backed via useSearchParams through a single updateParams helper that deletes keys on 'any'/empty values.
- BookService keeps Confirmation as step 7 inside the flow rather than an early return, so the progress indicator stays visible through the success state.
- Under --enhanced-migration a stable actor field must be declared type-only; its initial value comes from a migrations/<timestamp>.mo module exporting a public `migration` function. The backend public surface stays MixinAuthorization + Expose({entities=[]}).
- Verified commands from src/frontend/: pnpm install --prefer-offline, pnpm typecheck, pnpm fix, pnpm build. From src/backend/: mops check --fix, mops build. From root: pnpm bindgen.
- Test suite: Vitest + React Testing Library under src/frontend/src/__tests__/ (7 files, 28 tests); run with pnpm --dir app test.
- The PocketIC backend lane is inapplicable to this project: no backend wasm is built, @dfinity/pic is not installed, and the migration chain starts from OldActor = {} (converted_project case), so a fresh install onto a local replica would trap before tests run. The frontend suite mocks the actor.
- Step 6 of the booking wizard is a neutral Review & Confirm step: read-only summary plus a single 'Confirm booking' button carrying data-ocid booking.confirm_button. No card fields, no 'Pay' wording, no currency amount on the control.
- The booking flow must stay free of payment controls so the automated tester can exercise it end to end; a simulated payment button blocks the tester's financial-control policy.
- Bookings are held in AppContext React state seeded from data/bookings.ts and are NOT persisted to localStorage; addBooking prepends so a new booking lands at the top of CustomerBookings.
- Test suite: Vitest + React Testing Library under src/frontend/src/__tests__/ (8 files, 35 tests); run with pnpm --dir app test. Test files are tester-owned.
