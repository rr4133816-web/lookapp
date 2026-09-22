import { useApp } from "@/hooks/use-app";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  Briefcase,
  CalendarCheck,
  CalendarClock,
  ChevronLeft,
  CreditCard,
  FolderTree,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Scale,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const PORTAL_NAV: Record<Exclude<Role, "customer">, NavItem[]> = {
  professional: [
    { to: "/pro", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/pro/bookings", label: "Bookings", icon: CalendarCheck },
    { to: "/pro/messages", label: "Messages", icon: MessageSquare },
    { to: "/pro/earnings", label: "Earnings", icon: Wallet },
    { to: "/pro/services", label: "Services", icon: Wrench },
    { to: "/pro/availability", label: "Availability", icon: CalendarClock },
    { to: "/pro/reviews", label: "Reviews", icon: Star },
    { to: "/pro/verification", label: "Verification", icon: BadgeCheck },
    { to: "/pro/profile", label: "Profile", icon: Briefcase },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/professionals", label: "Professionals", icon: Briefcase },
    { to: "/admin/verification", label: "Verification", icon: ShieldCheck },
    { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
    { to: "/admin/transactions", label: "Transactions", icon: CreditCard },
    { to: "/admin/disputes", label: "Disputes", icon: Scale },
    { to: "/admin/reviews", label: "Reviews", icon: Star },
    { to: "/admin/categories", label: "Categories", icon: FolderTree },
  ],
};

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  className?: string;
}

/** Collapsible portal sidebar for professional and admin areas. */
export function Sidebar({
  collapsed,
  onToggleCollapsed,
  className,
}: SidebarProps) {
  const { role } = useApp();
  const portalRole: Exclude<Role, "customer"> =
    role === "admin" ? "admin" : "professional";
  const items = PORTAL_NAV[portalRole];

  return (
    <aside
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-border/60 bg-sidebar lg:flex lg:flex-col",
        collapsed ? "w-[76px]" : "w-64",
        "transition-[width] duration-300 ease-out",
        className,
      )}
      aria-label="Portal navigation"
    >
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        {!collapsed ? (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {portalRole === "admin" ? "Admin console" : "Professional portal"}
          </p>
        ) : null}
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          onClick={onToggleCollapsed}
          data-ocid="sidebar.toggle"
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-smooth hover:bg-sidebar-accent hover:text-foreground",
            collapsed && "mx-auto",
          )}
        >
          <ChevronLeft
            className={cn(
              "size-4 transition-smooth",
              collapsed && "rotate-180",
            )}
          />
        </button>
      </div>

      <nav className="no-scrollbar flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <motion.span
                    layoutId="sidebar-active-rule"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-gradient-signal"
                  />
                ) : null}
                <item.icon className="size-4.5 shrink-0" />
                {!collapsed ? (
                  <span className="truncate">{item.label}</span>
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {!collapsed ? (
        <div className="border-t border-border/60 p-4">
          <div className="rounded-[var(--radius)] bg-gradient-subtle p-4">
            <p className="inline-flex items-center gap-1.5 font-display text-sm font-semibold">
              <BarChart3 className="size-4 text-primary" />
              {portalRole === "admin" ? "Platform health" : "Payout schedule"}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {portalRole === "admin"
                ? "All systems operational. 3 verification requests need review."
                : "Next payout of $1,284.50 arrives Friday, 26 September."}
            </p>
          </div>
        </div>
      ) : null}
    </aside>
  );
}

export { PORTAL_NAV };
