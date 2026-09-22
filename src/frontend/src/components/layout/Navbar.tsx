import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/hooks/use-app";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const ROLE_LABEL: Record<Role, string> = {
  customer: "Customer",
  professional: "Professional",
  admin: "Admin",
};

const ROLE_HOME: Record<Role, string> = {
  customer: "/app",
  professional: "/pro",
  admin: "/admin",
};

const PUBLIC_LINKS = [
  { to: "/", label: "Home" },
  { to: "/app/discover", label: "Discover" },
  { to: "/app/bookings", label: "Bookings" },
  { to: "/app/messages", label: "Messages" },
];

export interface NavbarProps {
  onOpenMobileMenu: () => void;
}

/** Sticky glass header with role switcher, theme toggle and account menu. */
export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const { role, setRole, unreadNotificationCount } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const switchRole = (next: Role) => {
    setRole(next);
    setMenuOpen(false);
    navigate(ROLE_HOME[next]);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 surface-glass">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-4 md:px-8">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={onOpenMobileMenu}
          className="grid size-10 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <Link
          to={ROLE_HOME[role]}
          className="flex shrink-0 items-center gap-2"
          aria-label="LookApp home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-primary-foreground shadow-primary-glow">
            LA
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight sm:block">
            Look<span className="text-gradient">App</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-4 hidden items-center gap-1 lg:flex"
        >
          {PUBLIC_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "signal-rule relative rounded-full px-3.5 py-2 text-sm font-medium transition-smooth",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
              data-active={undefined}
            >
              {({ isActive }) => (
                <span data-active={isActive ? "true" : "false"}>
                  {link.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            to="/app/discover"
            aria-label="Search professionals"
            className="hidden size-10 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground sm:grid"
          >
            <Search className="size-4.5" />
          </Link>

          <button
            type="button"
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            onClick={toggleTheme}
            data-ocid="theme.toggle"
            className="grid size-10 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            {isDark ? (
              <Sun className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </button>

          <Link
            to="/app/notifications"
            aria-label={`Notifications, ${unreadNotificationCount} unread`}
            data-ocid="notifications.link"
            className="relative grid size-10 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            <Bell className="size-4.5" />
            {unreadNotificationCount > 0 ? (
              <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-accent font-mono text-[9px] font-semibold text-accent-foreground">
                {unreadNotificationCount}
              </span>
            ) : null}
          </Link>

          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              data-ocid="account.menu_button"
              className="flex items-center gap-2 rounded-full border border-border/60 bg-card py-1 pl-1 pr-2.5 transition-smooth hover:border-primary/40"
            >
              <Avatar name="Alex Morgan" size="sm" />
              <span className="hidden text-sm font-medium sm:block">
                Alex Morgan
              </span>
              <ChevronDown
                className={cn(
                  "size-3.5 text-muted-foreground transition-smooth",
                  menuOpen && "rotate-180",
                )}
              />
            </button>

            {menuOpen ? (
              <>
                <button
                  type="button"
                  aria-label="Close account menu"
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                  className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-[var(--radius)] border border-border/60 bg-popover p-1.5 shadow-elevated-lg"
                >
                  <div className="flex items-center gap-3 rounded-lg p-2.5">
                    <Avatar name="Alex Morgan" size="md" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        Alex Morgan
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        alex.morgan@lookapp.io
                      </p>
                    </div>
                  </div>

                  <div className="my-1.5 border-t border-border/60" />
                  <p className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Switch experience
                  </p>
                  {(["customer", "professional", "admin"] as Role[]).map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        role="menuitem"
                        onClick={() => switchRole(option)}
                        data-ocid={`role.${option}_button`}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-smooth",
                          role === option
                            ? "bg-primary-soft text-primary"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        {ROLE_LABEL[option]}
                        {role === option ? (
                          <Badge variant="primary">Active</Badge>
                        ) : null}
                      </button>
                    ),
                  )}

                  <div className="my-1.5 border-t border-border/60" />
                  <Link
                    to="/app/profile"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-smooth hover:bg-muted"
                  >
                    <User className="size-4 text-muted-foreground" />
                    Profile
                  </Link>
                  <Link
                    to="/app/settings"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-smooth hover:bg-muted"
                  >
                    <Settings className="size-4 text-muted-foreground" />
                    Settings
                  </Link>
                  <Link
                    to={ROLE_HOME[role]}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-smooth hover:bg-muted"
                  >
                    <LayoutDashboard className="size-4 text-muted-foreground" />
                    Dashboard
                  </Link>
                  <Link
                    to="/login"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-destructive transition-smooth hover:bg-destructive/10"
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </Link>
                </motion.div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
