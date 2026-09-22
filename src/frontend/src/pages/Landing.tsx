import { ProfessionalCard } from "@/components/ProfessionalCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search as SearchField } from "@/components/ui/search";
import { categories } from "@/data/categories";
import { professionals } from "@/data/professionals";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const STEPS = [
  {
    icon: Search,
    title: "Search with intent",
    body: "Filter by category, price, rating and availability. Every profile shows verified credentials before you commit.",
  },
  {
    icon: CalendarCheck,
    title: "Book in minutes",
    body: "Pick a service, choose a slot and confirm. You get a written summary of what will happen in the session.",
  },
  {
    icon: MessageSquare,
    title: "Work together",
    body: "Message your professional before and after the booking. Everything stays in one thread.",
  },
  {
    icon: CreditCard,
    title: "Pay when it is done",
    body: "Funds are held until the session is complete. If something goes wrong, our disputes team steps in.",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "Identity verified", value: "100%" },
  { icon: Star, label: "Average rating", value: "4.9" },
  { icon: Users, label: "Active professionals", value: "18" },
  { icon: TrendingUp, label: "Sessions completed", value: "6.4k" },
];

export default function Landing() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const featured = useMemo(
    () =>
      [...professionals]
        .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
        .slice(0, 6),
    [],
  );

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(
      query.trim()
        ? `/app/discover?q=${encodeURIComponent(query.trim())}`
        : "/app/discover",
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 surface-glass">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-4 md:px-8">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="LookApp home"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-primary-foreground shadow-primary-glow">
              LA
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Look<span className="text-gradient">App</span>
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="ml-6 hidden items-center gap-1 md:flex"
          >
            <a
              href="#how-it-works"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#categories"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
            >
              Categories
            </a>
            <a
              href="#professionals"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
            >
              Professionals
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/login"
              className="hidden h-10 items-center rounded-full px-4 text-sm font-medium text-foreground transition-smooth hover:bg-muted sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              data-ocid="landing.get_started_button"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5 hover:bg-primary/92"
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-subtle">
          <div
            className="hairline-grid absolute inset-0 opacity-40"
            aria-hidden="true"
          />
          <div
            className="orb -left-24 top-0 size-72 bg-primary/40"
            aria-hidden="true"
          />
          <div
            className="orb right-0 top-32 size-80 bg-accent/30"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div variants={staggerItem}>
                <Badge variant="accent" className="px-3 py-1">
                  <BadgeCheck className="size-3.5" />
                  Every professional identity-verified
                </Badge>
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
              >
                Find the right professional.
                <span className="block text-gradient">
                  Book with confidence.
                </span>
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                LookApp connects you with verified specialists across ten fields
                — from cloud architects and accountants to architects, tutors
                and electricians. Transparent pricing, real reviews, no
                guesswork.
              </motion.p>

              <motion.form
                variants={staggerItem}
                onSubmit={submitSearch}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <SearchField
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onClear={() => setQuery("")}
                  placeholder="Try “cloud architect” or “tax advisor”"
                  aria-label="Search professionals"
                  containerClassName="flex-1"
                  data-ocid="landing.search_input"
                />
                <Button
                  type="submit"
                  size="lg"
                  data-ocid="landing.search_button"
                  className="shrink-0"
                >
                  <Search className="size-4" />
                  Search
                </Button>
              </motion.form>

              <motion.div
                variants={staggerItem}
                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                {TRUST.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="size-4 text-accent" />
                    <span className="font-mono text-sm font-semibold">
                      {item.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              }}
              className="relative"
            >
              <div className="overflow-hidden rounded-[calc(var(--radius)+6px)] border border-border/60 bg-card shadow-elevated-lg">
                <img
                  src="/assets/generated/hero-marketplace.dim_1400x900.jpg"
                  alt="Professionals collaborating in a bright modern workspace"
                  className="aspect-[14/9] w-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-3.5 shadow-elevated-lg sm:left-6"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Verification complete</p>
                  <p className="text-xs text-muted-foreground">
                    Credentials checked in 24 hours
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section
          id="categories"
          className="border-t border-border/60 py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Browse by field
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
                  Ten categories, one standard
                </h2>
              </div>
              <Link
                to="/app/discover"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
              >
                Browse all professionals
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            >
              {categories.map((category) => (
                <motion.div key={category.slug} variants={staggerItem}>
                  <Link
                    to={`/app/discover?category=${category.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated-lg"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                      <Sparkles className="size-5" />
                    </span>
                    <p className="mt-1 font-display text-sm font-semibold leading-tight">
                      {category.name}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {category.tagline}
                    </p>
                    <p className="mt-auto pt-2 font-mono text-xs text-muted-foreground">
                      {category.professionalCount} professionals
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-y border-border/60 bg-muted/40 py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                How it works
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
                Four steps from search to session
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                No sales calls, no hidden fees, no waiting for a quote. You see
                the price and the credentials before you book.
              </p>
            </div>

            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
            >
              {STEPS.map((step, index) => (
                <motion.li
                  key={step.title}
                  variants={staggerItem}
                  className="relative flex flex-col gap-3 rounded-[var(--radius)] border border-border/60 bg-card p-6 shadow-elevated"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-primary-glow">
                    <step.icon className="size-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>

        {/* Featured professionals */}
        <section id="professionals" className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Top rated this month
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
                  Professionals worth your time
                </h2>
              </div>
              <Link
                to="/app/discover"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
              >
                See all 18
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {featured.map((professional, index) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
            <div className="relative overflow-hidden rounded-[calc(var(--radius)+6px)] bg-gradient-primary px-6 py-14 text-center shadow-elevated-lg md:px-16 md:py-20">
              <div
                className="orb -left-16 -top-16 size-64 bg-primary-foreground/20"
                aria-hidden="true"
              />
              <div
                className="orb -bottom-20 right-0 size-72 bg-primary-foreground/15"
                aria-hidden="true"
              />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-display text-2xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                  Ready to book your first session?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/85">
                  Create a free account and browse all eighteen verified
                  professionals. No card required until you book.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/register"
                    data-ocid="landing.create_account_button"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-card px-7 text-sm font-medium text-primary shadow-elevated-lg transition-smooth hover:-translate-y-0.5"
                  >
                    Create free account
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/app/discover"
                    className="inline-flex h-12 items-center rounded-full border border-primary-foreground/40 px-7 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary-foreground/10"
                  >
                    Explore professionals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-primary font-display text-xs font-bold text-primary-foreground">
                LA
              </span>
              <span className="font-display text-sm font-semibold">
                Look<span className="text-gradient">App</span>
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              A marketplace for verified professional services. All data shown
              is illustrative.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/app/discover"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  to="/app/bookings"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/app/favorites"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Favourites
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              For professionals
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/pro"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Professional portal
                </Link>
              </li>
              <li>
                <Link
                  to="/pro/verification"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Get verified
                </Link>
              </li>
              <li>
                <Link
                  to="/pro/earnings"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Earnings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Account
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Create account
                </Link>
              </li>
              <li>
                <Link
                  to="/forgot-password"
                  className="text-muted-foreground transition-smooth hover:text-primary"
                >
                  Reset password
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
            <p>© {new Date().getFullYear()} LookApp. All rights reserved.</p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window === "undefined" ? "" : window.location.hostname,
              )}`}
              target="_blank"
              rel="noreferrer"
              className={cn("transition-smooth hover:text-primary")}
            >
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
