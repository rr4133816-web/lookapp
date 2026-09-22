import { AppShell } from "@/components/layout/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { AppProvider } from "@/context/AppContext";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

/* Public */
const Landing = lazy(() => import("@/pages/Landing"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));

/* Customer */
const CustomerHome = lazy(() => import("@/pages/app/CustomerHome"));
const Discover = lazy(() => import("@/pages/app/Discover"));
const ProfessionalDetail = lazy(() => import("@/pages/app/ProfessionalDetail"));
const BookService = lazy(() => import("@/pages/app/BookService"));
const CustomerBookings = lazy(() => import("@/pages/app/CustomerBookings"));
const Messages = lazy(() => import("@/pages/app/Messages"));
const Notifications = lazy(() => import("@/pages/app/Notifications"));
const Favorites = lazy(() => import("@/pages/app/Favorites"));
const CustomerProfile = lazy(() => import("@/pages/app/CustomerProfile"));
const CustomerSettings = lazy(() => import("@/pages/app/CustomerSettings"));

/* Professional */
const ProDashboard = lazy(() => import("@/pages/pro/ProDashboard"));
const ProBookings = lazy(() => import("@/pages/pro/ProBookings"));
const ProMessages = lazy(() => import("@/pages/pro/ProMessages"));
const ProEarnings = lazy(() => import("@/pages/pro/ProEarnings"));
const ProProfile = lazy(() => import("@/pages/pro/ProProfile"));
const ProServices = lazy(() => import("@/pages/pro/ProServices"));
const ProAvailability = lazy(() => import("@/pages/pro/ProAvailability"));
const ProVerification = lazy(() => import("@/pages/pro/ProVerification"));
const ProReviews = lazy(() => import("@/pages/pro/ProReviews"));

/* Admin */
const AdminOverview = lazy(() => import("@/pages/admin/AdminOverview"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminProfessionals = lazy(
  () => import("@/pages/admin/AdminProfessionals"),
);
const AdminVerification = lazy(() => import("@/pages/admin/AdminVerification"));
const AdminBookings = lazy(() => import("@/pages/admin/AdminBookings"));
const AdminTransactions = lazy(() => import("@/pages/admin/AdminTransactions"));
const AdminDisputes = lazy(() => import("@/pages/admin/AdminDisputes"));
const AdminReviews = lazy(() => import("@/pages/admin/AdminReviews"));
const AdminCategories = lazy(() => import("@/pages/admin/AdminCategories"));

const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return (
    <div className="space-y-6" data-ocid="page.loading_state">
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => `fallback-${index}`).map(
          (id) => (
            <Skeleton
              key={id}
              className="h-56 w-full rounded-[var(--radius)]"
            />
          ),
        )}
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense key={location.pathname} fallback={<RouteFallback />}>
        <Routes location={location}>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Customer */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<CustomerHome />} />
            <Route path="discover" element={<Discover />} />
            <Route path="professionals/:id" element={<ProfessionalDetail />} />
            <Route path="book/:id" element={<BookService />} />
            <Route path="bookings" element={<CustomerBookings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="settings" element={<CustomerSettings />} />
          </Route>

          {/* Professional */}
          <Route path="/pro" element={<AppShell />}>
            <Route index element={<ProDashboard />} />
            <Route path="bookings" element={<ProBookings />} />
            <Route path="messages" element={<ProMessages />} />
            <Route path="earnings" element={<ProEarnings />} />
            <Route path="profile" element={<ProProfile />} />
            <Route path="services" element={<ProServices />} />
            <Route path="availability" element={<ProAvailability />} />
            <Route path="verification" element={<ProVerification />} />
            <Route path="reviews" element={<ProReviews />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AppShell />}>
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="professionals" element={<AdminProfessionals />} />
            <Route path="verification" element={<AdminVerification />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="disputes" element={<AdminDisputes />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="categories" element={<AdminCategories />} />
          </Route>

          <Route path="/app/*" element={<Navigate to="/app" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
