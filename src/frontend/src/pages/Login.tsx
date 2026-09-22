import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("alex.morgan@lookapp.io");
  const [password, setPassword] = useState("lookapp-demo");
  const [error, setError] = useState("");
  const { setRole, pushToast } = useApp();
  const navigate = useNavigate();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter both your email address and password to continue.");
      return;
    }
    setError("");
    setRole("customer");
    pushToast({
      title: "Welcome back, Alex",
      description: "You are signed in to the customer experience.",
      variant: "success",
    });
    navigate("/app");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-primary p-10 lg:flex">
        <div
          className="orb -left-20 top-10 size-72 bg-primary-foreground/20"
          aria-hidden="true"
        />
        <div
          className="orb bottom-0 right-0 size-80 bg-primary-foreground/15"
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
            The right professional, verified before you book.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
            Eighteen specialists across ten fields, each with credentials
            checked and reviews from real sessions.
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-[var(--radius)] border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur">
            <BadgeCheck className="size-5 shrink-0 text-primary-foreground" />
            <p className="text-xs leading-relaxed text-primary-foreground/90">
              This is a demonstration environment. No real accounts, payments or
              personal data are involved.
            </p>
          </div>
        </div>
        <p className="relative text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} LookApp
        </p>
      </div>

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
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sign in to manage your bookings, messages and saved professionals.
            </p>
          </motion.div>

          <motion.form
            variants={staggerItem}
            onSubmit={submit}
            className="mt-8 space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="login-email">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="pl-10"
                  data-ocid="login.email_input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-primary transition-smooth hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  data-ocid="login.password_input"
                />
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                data-ocid="login.error_state"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              data-ocid="login.submit_button"
            >
              Sign in
            </Button>
          </motion.form>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            New to LookApp?{" "}
            <Link
              to="/register"
              className="font-medium text-primary transition-smooth hover:underline"
            >
              Create an account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
