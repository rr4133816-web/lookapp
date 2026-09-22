import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Briefcase, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ACCOUNT_TYPES: {
  value: Extract<Role, "customer" | "professional">;
  label: string;
  body: string;
  icon: typeof User;
}[] = [
  {
    value: "customer",
    label: "I need a professional",
    body: "Browse, book and manage sessions.",
    icon: User,
  },
  {
    value: "professional",
    label: "I am a professional",
    body: "Offer services and manage bookings.",
    icon: Briefcase,
  },
];

export default function Register() {
  const [accountType, setAccountType] = useState<"customer" | "professional">(
    "customer",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setRole, pushToast } = useApp();
  const navigate = useNavigate();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 8) {
      setError(
        "Enter your name, a valid email address and a password of at least 8 characters.",
      );
      return;
    }
    setError("");
    setRole(accountType);
    pushToast({
      title: "Account created",
      description:
        accountType === "professional"
          ? "Your professional portal is ready. Add your services next."
          : "Your customer account is ready. Start exploring professionals.",
      variant: "success",
    });
    navigate(accountType === "professional" ? "/pro" : "/app");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center bg-background px-4 py-12 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div variants={staggerItem}>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-8">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Free to join. You only pay when you book a session.
            </p>
          </motion.div>

          <motion.form
            variants={staggerItem}
            onSubmit={submit}
            className="mt-8 space-y-5"
            noValidate
          >
            <fieldset className="space-y-2.5">
              <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Account type
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {ACCOUNT_TYPES.map((type) => {
                  const isActive = accountType === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setAccountType(type.value)}
                      data-ocid={`register.${type.value}_button`}
                      className={cn(
                        "flex flex-col gap-1.5 rounded-[var(--radius)] border p-4 text-left transition-smooth",
                        isActive
                          ? "border-primary bg-primary-soft ring-2 ring-ring/25"
                          : "border-border/60 bg-card hover:border-primary/40",
                      )}
                    >
                      <type.icon
                        className={cn(
                          "size-4.5",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {type.body}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="register-name">Full name</Label>
              <Input
                id="register-name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Alex Morgan"
                data-ocid="register.name_input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email">Email address</Label>
              <Input
                id="register-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                data-ocid="register.email_input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                data-ocid="register.password_input"
              />
            </div>

            {error ? (
              <p
                role="alert"
                data-ocid="register.error_state"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              data-ocid="register.submit_button"
            >
              Create account
            </Button>
          </motion.form>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary transition-smooth hover:underline"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>

      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-primary p-10 lg:flex">
        <div
          className="orb -right-20 top-10 size-72 bg-primary-foreground/20"
          aria-hidden="true"
        />
        <div
          className="orb bottom-0 left-0 size-80 bg-primary-foreground/15"
          aria-hidden="true"
        />
        <Link
          to="/"
          className="relative inline-flex items-center gap-2 text-primary-foreground"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary-foreground/15 font-display text-sm font-bold backdrop-blur">
            LA
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            LookApp
          </span>
        </Link>
        <div className="relative max-w-md">
          <h2 className="font-display text-3xl font-bold leading-tight text-primary-foreground">
            Join a marketplace built on verification.
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Credentials checked before a profile goes live",
              "Transparent pricing on every service",
              "Funds held until the session is complete",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-primary-foreground/90"
              >
                <BadgeCheck className="mt-0.5 size-4 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} LookApp
        </p>
      </div>
    </div>
  );
}
