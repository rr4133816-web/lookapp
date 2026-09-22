import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { useApp } from "@/hooks/use-app";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import {
  Bell,
  Globe,
  Lock,
  Moon,
  Palette,
  Shield,
  Sun,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface ToggleRowProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        data-ocid={`settings.${id}_switch`}
        className={cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-smooth",
          checked ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-card shadow-xs transition-smooth",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

export default function CustomerSettings() {
  const { theme, toggleTheme } = useTheme();
  const { pushToast } = useApp();
  const [bookingEmails, setBookingEmails] = useState(true);
  const [messageEmails, setMessageEmails] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Settings
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Preferences
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Control how LookApp looks, how it contacts you and who can see your
          profile.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="size-4 text-primary" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Currently using the {theme} theme. Your choice is remembered
                  on this device.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={toggleTheme}
                data-ocid="settings.theme_toggle"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="size-4" />
                    Light
                  </>
                ) : (
                  <>
                    <Moon className="size-4" />
                    Dark
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="size-4 text-primary" />
              Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="settings-timezone"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Time zone
              </label>
              <select
                id="settings-timezone"
                defaultValue="America/New_York"
                data-ocid="settings.timezone_select"
                className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="settings-currency"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Currency
              </label>
              <select
                id="settings-currency"
                defaultValue="USD"
                data-ocid="settings.currency_select"
                className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-xs transition-smooth outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">Pound Sterling (GBP)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="size-4 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/60">
            <ToggleRow
              id="booking-emails"
              label="Booking updates by email"
              description="Confirmations, reminders and cancellations."
              checked={bookingEmails}
              onChange={setBookingEmails}
            />
            <ToggleRow
              id="message-emails"
              label="Message notifications"
              description="An email when a professional replies to you."
              checked={messageEmails}
              onChange={setMessageEmails}
            />
            <ToggleRow
              id="push-notifications"
              label="In-app notifications"
              description="Show the activity badge in the header."
              checked={pushEnabled}
              onChange={setPushEnabled}
            />
            <ToggleRow
              id="marketing-emails"
              label="Product news"
              description="Occasional updates about new categories and features."
              checked={marketingEmails}
              onChange={setMarketingEmails}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="size-4 text-primary" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/60">
            <ToggleRow
              id="profile-visible"
              label="Public profile"
              description="Let professionals see your name and review history."
              checked={profileVisible}
              onChange={setProfileVisible}
            />
            <div className="flex items-start justify-between gap-4 py-3.5">
              <div>
                <p className="text-sm font-medium">Password</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Last changed 4 months ago.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  pushToast({
                    title: "Password reset link sent",
                    description: "Check your inbox to choose a new password.",
                    variant: "success",
                  })
                }
                data-ocid="settings.change_password_button"
              >
                <Lock className="size-4" />
                Change
              </Button>
            </div>
            <div className="flex items-start justify-between gap-4 py-3.5">
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Permanently remove your account and booking history.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => setDeleteOpen(true)}
                data-ocid="settings.delete_account_button"
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius)] border border-border/60 bg-muted/40 p-4">
        <Badge variant="neutral">Demo environment</Badge>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Preferences are stored locally in your browser. No data leaves this
          device.
        </p>
      </div>

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete your account?"
        description="This removes your profile, bookings and saved professionals. This cannot be undone."
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDeleteOpen(false)}
              data-ocid="settings.cancel_delete_button"
            >
              Keep my account
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setDeleteOpen(false);
                pushToast({
                  title: "Account deletion is disabled",
                  description:
                    "This is a demonstration environment, so nothing was removed.",
                  variant: "default",
                });
              }}
              data-ocid="settings.confirm_delete_button"
            >
              Delete account
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          In a live environment this would permanently delete your account. Here
          it simply shows the confirmation flow.
        </p>
      </Modal>
    </div>
  );
}
