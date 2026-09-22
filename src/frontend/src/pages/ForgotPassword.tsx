import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Enter the email address associated with your account.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle px-4 py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card p-8 shadow-elevated-lg"
      >
        <motion.div variants={staggerItem}>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>
        </motion.div>

        {sent ? (
          <motion.div variants={staggerItem} className="mt-8 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/12 text-success">
              <CheckCircle2 className="size-7" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Check your inbox
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We have sent a password reset link to{" "}
              <span className="font-medium text-foreground">{email}</span>. The
              link expires in thirty minutes.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-6 w-full"
              onClick={() => setSent(false)}
              data-ocid="forgot_password.retry_button"
            >
              Use a different email
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div variants={staggerItem} className="mt-8">
              <h1 className="font-display text-2xl font-bold tracking-tight">
                Reset your password
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter your email address and we will send you a link to choose a
                new password.
              </p>
            </motion.div>

            <motion.form
              variants={staggerItem}
              onSubmit={submit}
              className="mt-6 space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="pl-10"
                    data-ocid="forgot_password.email_input"
                  />
                </div>
              </div>

              {error ? (
                <p
                  role="alert"
                  data-ocid="forgot_password.error_state"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
                >
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                data-ocid="forgot_password.submit_button"
              >
                Send reset link
              </Button>
            </motion.form>
          </>
        )}
      </motion.div>
    </div>
  );
}
