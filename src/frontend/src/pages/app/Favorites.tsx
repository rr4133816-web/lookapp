import { ProfessionalCard } from "@/components/ProfessionalCard";
import { EmptyState } from "@/components/ui/empty-state";
import { professionals } from "@/data/professionals";
import { useApp } from "@/hooks/use-app";
import { staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { Compass, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites } = useApp();
  const saved = professionals.filter((professional) =>
    favorites.includes(professional.id),
  );

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Favourites
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Saved professionals
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {saved.length > 0
            ? `You have saved ${saved.length} ${saved.length === 1 ? "professional" : "professionals"}. Book directly or compare them side by side.`
            : "Save professionals you are considering and they will appear here."}
        </p>
      </header>

      {saved.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved professionals yet"
          description="Tap the heart on any profile to save it here for later."
          action={
            <Link
              to="/app/discover"
              data-ocid="favorites.empty_discover_button"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-primary-glow transition-smooth hover:-translate-y-0.5"
            >
              <Compass className="size-4" />
              Browse professionals
            </Link>
          }
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {saved.map((professional, index) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
