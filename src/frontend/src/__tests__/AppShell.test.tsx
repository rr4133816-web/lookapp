import {
  renderWithProviders,
  screen,
  userEvent,
  within,
} from "@/__tests__/render";
import { AppShell } from "@/components/layout/AppShell";
import { describe, expect, it } from "vitest";

function renderShell(route: string) {
  return renderWithProviders(<AppShell />, { route, path: "*" });
}

describe("App shell", () => {
  it("renders the navbar and mobile bottom navigation for the customer area", () => {
    renderShell("/app");

    expect(
      screen.getByRole("navigation", { name: /mobile navigation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
  });

  it("shows the portal sidebar on professional and admin routes", () => {
    renderShell("/pro");

    expect(
      screen.getByRole("complementary", { name: /portal navigation/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /earnings/i })).toBeInTheDocument();
  });

  it("toggles dark mode and persists the choice to localStorage", async () => {
    const user = userEvent.setup();
    renderShell("/app");

    await user.click(
      screen.getByRole("button", { name: /switch to dark theme/i }),
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("lookapp-theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: /switch to light theme/i }),
    ).toBeInTheDocument();
  });

  it("restores a persisted dark theme on load", () => {
    window.localStorage.setItem("lookapp-theme", "dark");
    renderShell("/app");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("switches role from the account menu and navigates to that role's home", async () => {
    const user = userEvent.setup();
    renderShell("/app");

    await user.click(screen.getByRole("button", { name: /alex morgan/i }));
    await user.click(screen.getByRole("menuitem", { name: /^admin$/i }));

    expect(window.localStorage.getItem("lookapp-role")).toBe("admin");
    // Admin bottom navigation replaces the customer one. "Overview" also
    // appears in the portal sidebar, so scope the query to the mobile nav.
    const mobileNav = screen.getByRole("navigation", {
      name: /mobile navigation/i,
    });
    expect(
      within(mobileNav).getByRole("link", { name: /overview/i }),
    ).toBeInTheDocument();
    expect(
      within(mobileNav).queryByRole("link", { name: /^home$/i }),
    ).not.toBeInTheDocument();
  });
});
