import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { PORTAL_NAV } from "@/components/layout/Sidebar";
import { Drawer } from "@/components/ui/drawer";
import { ToastViewport } from "@/components/ui/toast";
import { useApp } from "@/hooks/use-app";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

/** Global application shell: navbar, portal sidebar, mobile nav and footer. */
export function AppShell() {
  const { role } = useApp();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPortal =
    location.pathname.startsWith("/pro") ||
    location.pathname.startsWith("/admin");
  const portalRole = role === "admin" ? "admin" : "professional";
  const portalItems = PORTAL_NAV[portalRole];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1">
        {isPortal ? (
          <Sidebar
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed((current) => !current)}
          />
        ) : null}

        <main
          className={cn(
            "min-w-0 flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-16 md:pt-8",
            !isPortal && "mx-auto max-w-[1400px]",
          )}
        >
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-primary font-display text-xs font-bold text-primary-foreground">
              LA
            </span>
            <span className="font-display text-sm font-semibold">
              Look<span className="text-gradient">App</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            A marketplace for verified professional services. All data shown is
            illustrative.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window === "undefined" ? "" : window.location.hostname,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground transition-smooth hover:text-primary"
          >
            © {new Date().getFullYear()}. Built with love using caffeine.ai
          </a>
        </div>
      </footer>

      <BottomNavigation />
      <ToastViewport />

      <Drawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Navigation"
        description="Jump to any area of LookApp."
        side="left"
      >
        <nav className="space-y-1">
          {portalItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-foreground hover:bg-muted",
                )
              }
            >
              <item.icon className="size-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </div>
  );
}
