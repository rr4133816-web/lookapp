import { useApp } from "@/hooks/use-app";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Compass,
  Home,
  LayoutDashboard,
  MessageSquare,
  User,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface BottomItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const CUSTOMER_ITEMS: BottomItem[] = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/discover", label: "Discover", icon: Compass },
  { to: "/app/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/app/messages", label: "Messages", icon: MessageSquare },
  { to: "/app/profile", label: "Profile", icon: User },
];

const PROFESSIONAL_ITEMS: BottomItem[] = [
  { to: "/pro", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/pro/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/pro/messages", label: "Messages", icon: MessageSquare },
  { to: "/pro/earnings", label: "Earnings", icon: Wallet },
  { to: "/pro/profile", label: "Profile", icon: User },
];

const ADMIN_ITEMS: BottomItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: User },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/disputes", label: "Disputes", icon: MessageSquare },
  { to: "/admin/transactions", label: "Payments", icon: Wallet },
];

const ITEMS_BY_ROLE: Record<Role, BottomItem[]> = {
  customer: CUSTOMER_ITEMS,
  professional: PROFESSIONAL_ITEMS,
  admin: ADMIN_ITEMS,
};

/** Mobile bottom navigation — role aware, hidden from tablet up. */
export function BottomNavigation() {
  const { role, conversations } = useApp();
  const items = ITEMS_BY_ROLE[role];
  const unreadMessages = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0,
  );

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-card/90 surface-glass pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {items.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="bottom-nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-x-3 top-0 h-[3px] rounded-full bg-gradient-signal"
                    />
                  ) : null}
                  <span className="relative">
                    <item.icon className="size-5" />
                    {item.to.endsWith("/messages") && unreadMessages > 0 ? (
                      <span className="absolute -right-1.5 -top-1 grid size-3.5 place-items-center rounded-full bg-accent font-mono text-[8px] font-semibold text-accent-foreground">
                        {unreadMessages}
                      </span>
                    ) : null}
                  </span>
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
