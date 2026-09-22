import { renderWithProviders, screen } from "@/__tests__/render";
import { adminUsers, disputes, verificationRequests } from "@/data/admin";
import { bookings } from "@/data/bookings";
import { transactions } from "@/data/transactions";
import AdminOverview from "@/pages/admin/AdminOverview";
import { describe, expect, it } from "vitest";

describe("AdminOverview", () => {
  it("renders the animated statistics derived from the mock data", () => {
    renderWithProviders(<AdminOverview />, { route: "/admin" });

    expect(
      screen.getByRole("heading", { name: /platform overview/i }),
    ).toBeInTheDocument();

    const totalUsers = adminUsers.length + 1840;
    expect(screen.getByText(totalUsers.toLocaleString())).toBeInTheDocument();

    const pending = verificationRequests.filter(
      (request) => request.status === "pending",
    ).length;
    expect(screen.getByText("Pending verifications")).toBeInTheDocument();
    expect(screen.getByText(pending.toString())).toBeInTheDocument();

    const openDisputes = disputes.filter(
      (dispute) => dispute.status !== "resolved",
    ).length;
    expect(screen.getByText("Open disputes")).toBeInTheDocument();
    expect(screen.getByText(openDisputes.toString())).toBeInTheDocument();

    const activeBookings = bookings.filter(
      (booking) =>
        booking.status === "confirmed" || booking.status === "in-progress",
    ).length;
    expect(screen.getByText("Active bookings")).toBeInTheDocument();
    expect(screen.getByText(activeBookings.toString())).toBeInTheDocument();

    const gross = transactions.reduce((sum, t) => sum + t.amount, 0);
    expect(screen.getByText("Gross revenue")).toBeInTheDocument();
    expect(
      screen.getByText(
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(gross),
      ),
    ).toBeInTheDocument();
  });

  it("renders the charts and the recent activity feed", () => {
    renderWithProviders(<AdminOverview />, { route: "/admin" });

    expect(screen.getByText(/bookings & revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/category distribution/i)).toBeInTheDocument();
    expect(screen.getByText(/recent platform activity/i)).toBeInTheDocument();
    expect(screen.getByText(/verification queue/i)).toBeInTheDocument();
  });
});
