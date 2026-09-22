import { bookings as seedBookings } from "@/data/bookings";
import { conversations as seedConversations } from "@/data/messages";
import { notifications as seedNotifications } from "@/data/notifications";
import type {
  AppNotification,
  Booking,
  Conversation,
  Message,
  Role,
  ToastMessage,
} from "@/types";
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const THEME_KEY = "lookapp-theme";
const ROLE_KEY = "lookapp-role";

export interface AppContextValue {
  role: Role;
  setRole: (role: Role) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  favorites: string[];
  toggleFavorite: (professionalId: string) => void;
  isFavorite: (professionalId: string) => boolean;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  markConversationRead: (conversationId: string) => void;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (toastId: string) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

function readStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "dark" ? "dark" : "light";
}

function readStoredRole(): Role {
  if (typeof window === "undefined") return "customer";
  const stored = window.localStorage.getItem(ROLE_KEY);
  if (stored === "professional" || stored === "admin") return stored;
  return "customer";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(readStoredRole);
  const [theme, setTheme] = useState<"light" | "dark">(readStoredTheme);
  const [favorites, setFavorites] = useState<string[]>([
    "p-08",
    "p-12",
    "p-16",
  ]);
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [conversations, setConversations] =
    useState<Conversation[]>(seedConversations);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(seedNotifications);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(ROLE_KEY, role);
  }, [role]);

  const setRole = useCallback((next: Role) => setRoleState(next), []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const toggleFavorite = useCallback((professionalId: string) => {
    setFavorites((current) =>
      current.includes(professionalId)
        ? current.filter((id) => id !== professionalId)
        : [...current, professionalId],
    );
  }, []);

  const isFavorite = useCallback(
    (professionalId: string) => favorites.includes(professionalId),
    [favorites],
  );

  const addBooking = useCallback((booking: Booking) => {
    setBookings((current) => [booking, ...current]);
  }, []);

  const updateBookingStatus = useCallback(
    (bookingId: string, status: Booking["status"]) => {
      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking,
        ),
      );
    },
    [],
  );

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const message: Message = {
      id: `m-${Date.now()}`,
      sender: "me",
      text,
      timestamp: new Date().toISOString(),
    };
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, message],
              lastMessage: text,
              lastMessageAt: message.timestamp,
            }
          : conversation,
      ),
    );
  }, []);

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unread: 0 }
          : conversation,
      ),
    );
  }, []);

  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  }, []);

  const pushToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((current) => [...current, { ...toast, id }]);
  }, []);

  const dismissToast = useCallback((toastId: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  }, []);

  const unreadNotificationCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      role,
      setRole,
      theme,
      toggleTheme,
      favorites,
      toggleFavorite,
      isFavorite,
      bookings,
      addBooking,
      updateBookingStatus,
      conversations,
      sendMessage,
      markConversationRead,
      notifications,
      unreadNotificationCount,
      markNotificationRead,
      markAllNotificationsRead,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      role,
      setRole,
      theme,
      toggleTheme,
      favorites,
      toggleFavorite,
      isFavorite,
      bookings,
      addBooking,
      updateBookingStatus,
      conversations,
      sendMessage,
      markConversationRead,
      notifications,
      unreadNotificationCount,
      markNotificationRead,
      markAllNotificationsRead,
      toasts,
      pushToast,
      dismissToast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
