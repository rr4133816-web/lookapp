import { renderWithProviders, screen, userEvent } from "@/__tests__/render";
import { professionals } from "@/data/professionals";
import Discover from "@/pages/app/Discover";
import { describe, expect, it } from "vitest";

function renderDiscover(route = "/app/discover") {
  return renderWithProviders(<Discover />, {
    route,
    path: "/app/discover",
  });
}

/** The results count is split across a <span> and text, so match the paragraph. */
function expectResultCount(count: number) {
  const pattern = new RegExp(`^${count}\\s+professionals? found$`);
  const node = screen.getByText((_content, element) => {
    if (!element || element.tagName !== "P") return false;
    return pattern.test(element.textContent?.trim() ?? "");
  });
  expect(node).toBeInTheDocument();
}

describe("Discover", () => {
  it("renders every seeded professional by default", () => {
    renderDiscover();

    expectResultCount(professionals.length);
  });

  it("filters by category and reflects it in the URL", async () => {
    const user = userEvent.setup();
    renderDiscover();

    await user.click(screen.getByRole("button", { name: "IT & Software" }));

    expect(screen.getByTestId("location")).toHaveTextContent("category=it");
    const expected = professionals.filter((p) => p.category === "it").length;
    expectResultCount(expected);
  });

  it("restores filters from the URL on load", () => {
    renderDiscover("/app/discover?category=it&verified=1");

    const expected = professionals.filter(
      (p) => p.category === "it" && p.verified,
    ).length;
    expectResultCount(expected);
    expect(screen.getByText(/active filters/i)).toBeInTheDocument();
  });

  it("filters by search term and reflects it in the URL", async () => {
    const user = userEvent.setup();
    renderDiscover();

    await user.type(
      screen.getByRole("searchbox", { name: /search professionals/i }),
      "cloud architect",
    );

    expect(screen.getByTestId("location")).toHaveTextContent("q=cloud");
    expect(screen.getByText("Amara Okafor")).toBeInTheDocument();
  });

  it("shows an empty state and resets filters when nothing matches", async () => {
    const user = userEvent.setup();
    renderDiscover("/app/discover?q=zzzznomatch");

    expect(
      screen.getByText(/no professionals match those filters/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reset filters/i }));

    expect(screen.getByTestId("location")).not.toHaveTextContent("q=");
    expectResultCount(professionals.length);
  });

  it("sorts by price ascending and reflects it in the URL", async () => {
    const user = userEvent.setup();
    renderDiscover();

    await user.selectOptions(
      screen.getByLabelText(/sort results/i),
      "price-asc",
    );

    expect(screen.getByTestId("location")).toHaveTextContent("sort=price-asc");
  });
});
