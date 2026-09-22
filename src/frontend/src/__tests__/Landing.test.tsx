import { renderWithProviders, screen, userEvent } from "@/__tests__/render";
import Landing from "@/pages/Landing";
import { describe, expect, it } from "vitest";

describe("Landing page", () => {
  it("renders the hero headline and primary calls to action", () => {
    renderWithProviders(<Landing />, { route: "/", path: "/" });

    expect(
      screen.getByRole("heading", {
        name: /find the right professional/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /get started/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /create free account/i }),
    ).toBeInTheDocument();
  });

  it("renders the declared landing sections with realistic content", () => {
    renderWithProviders(<Landing />, { route: "/", path: "/" });

    expect(
      screen.getByRole("heading", { name: /ten categories, one standard/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /four steps from search to session/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /professionals worth your time/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /ready to book your first session/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("routes a typed search into Discover with the query in the URL", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Landing />, { route: "/", path: "/" });

    const input = screen.getByRole("searchbox", {
      name: /search professionals/i,
    });
    await user.type(input, "cloud architect");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(screen.getByTestId("location")).toHaveTextContent(
      "/app/discover?q=cloud%20architect",
    );
  });

  it("routes an empty search into Discover without a query string", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Landing />, { route: "/", path: "/" });

    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("/app/discover");
  });

  it("shows featured professional cards with names", () => {
    renderWithProviders(<Landing />, { route: "/", path: "/" });

    expect(screen.getByText("Amara Okafor")).toBeInTheDocument();
  });
});
