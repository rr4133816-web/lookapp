import { motion } from "framer-motion";
import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card p-10 text-center shadow-elevated-lg"
      >
        <p className="font-mono text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
          This page does not exist
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The link may be out of date, or the page may have moved. Let us get
          you back to something useful.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            data-ocid="not_found.home_button"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5"
          >
            <Home className="size-4" />
            Back to home
          </Link>
          <Link
            to="/app/discover"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium transition-smooth hover:border-primary/40 hover:bg-secondary"
          >
            <Compass className="size-4" />
            Browse professionals
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
