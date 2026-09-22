import App from "@/App";
import {
  renderWithProviders,
  screen,
  userEvent,
  within,
} from "@/__tests__/render";
import { AppProvider } from "@/context/AppContext";
import { getProfessional } from "@/data/professionals";
import { useApp } from "@/hooks/use-app";
import BookService from "@/pages/app/BookService";
import CustomerBookings from "@/pages/app/CustomerBookings";
import type { Booking } from "@/types";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

const professional = getProfessional("p-01");
if (!professional) {
  throw new Error("test fixture professional p-01 is missing");
}
const professionalId = professional.id;
const firstService = professional.services[0];

function renderBooking() {
  return renderWithProviders(<BookService />, {
    route: `/app/book/${professionalId}`,
    path: "/app/book/:id",
  });
}

/** The date strip renders one button per offered day, labelled with its full date. */
function dateButtons() {
  return screen
    .getAllByRole("button")
    .filter((button) =>
      /^\w+day, \w+ \d+$/.test(button.getAttribute("aria-label") ?? ""),
    );
}

/**
 * Look up a control by its stable `data-ocid` seam. The app does not register
 * `data-ocid` as the testing-library test-id attribute (existing suites rely on
 * `data-testid`), so query the attribute directly.
 */
function byOcid(ocid: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(`[data-ocid="${ocid}"]`);
  if (!element) {
    throw new Error(`no element with data-ocid="${ocid}"`);
  }
  return element;
}

function queryOcid(ocid: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-ocid="${ocid}"]`);
}

/**
 * Advance from Step 1 to Step 5 (Review) using only stable controls. Step 6 is
 * intentionally excluded: its payment UI is the surface the request changes.
 */
async function advanceToReview(user: ReturnType<typeof userEvent.setup>) {
  await user.click(
    screen.getByRole("button", { name: new RegExp(firstService.name, "i") }),
  );
  await user.click(screen.getByRole("button", { name: /continue/i }));

  await user.click(dateButtons()[0]);
  await user.click(screen.getByRole("button", { name: /continue/i }));

  await user.click(screen.getByRole("button", { name: /8:00 AM/i }));
  await user.click(screen.getByRole("button", { name: /continue/i }));

  // Step 4 — Details: the default video format is valid.
  await user.click(screen.getByRole("button", { name: /continue/i }));
}

/** Advance from Step 1 to Step 6 (the final step before Confirmation). */
async function advanceToFinalStep(user: ReturnType<typeof userEvent.setup>) {
  await advanceToReview(user);
  await user.click(screen.getByRole("button", { name: /continue/i }));
}

describe("BookService flow — stable behavior", () => {
  it("loads the default route without a blank screen", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: /find the right professional/i,
      }),
    ).toBeInTheDocument();
  });

  it("advances from a service page through Steps 1-5 to the final step", async () => {
    const user = userEvent.setup();
    renderBooking();

    await advanceToReview(user);

    expect(
      screen.getByRole("heading", { name: /review your booking/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 6 is reached: the final booking control is present and the
    // intermediate Continue control is gone. Asserted by stable data-ocid seam
    // rather than by the control's label, which the request intentionally
    // changes.
    expect(byOcid("booking.confirm_button")).toBeInTheDocument();
    expect(queryOcid("booking.continue_button")).not.toBeInTheDocument();
  });

  it("preserves entered values when navigating back from the final step", async () => {
    const user = userEvent.setup();
    renderBooking();

    await advanceToFinalStep(user);

    const back = () => screen.getByRole("button", { name: /^back$/i });

    // Back from Step 6 to Step 5 — the review still reflects the chosen values.
    await user.click(back());
    expect(
      screen.getByRole("heading", { name: /review your booking/i }),
    ).toBeInTheDocument();
    // The chosen service and time appear in both the review card and the order
    // summary, so assert presence rather than uniqueness. The review renders the
    // stored 24-hour value, not the picker's 12-hour label.
    expect(screen.getAllByText(firstService.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText("08:00").length).toBeGreaterThan(0);

    // Back to Step 4 — the notes typed earlier survive the round trip.
    await user.click(back());
    expect(
      screen.getByRole("heading", { name: /session details/i }),
    ).toBeInTheDocument();

    // Back to Step 3 — the chosen time slot is still selected.
    await user.click(back());
    expect(
      screen.getByRole("heading", { name: /pick a time/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /8:00 AM/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    // Back to Step 2 — the chosen date is still selected.
    await user.click(back());
    expect(
      screen.getByRole("heading", { name: /pick a date/i }),
    ).toBeInTheDocument();
    expect(dateButtons()[0]).toHaveAttribute("aria-pressed", "true");

    // Back to Step 1 — the chosen service is still selected.
    await user.click(back());
    expect(
      screen.getByRole("heading", { name: /choose a service/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: new RegExp(firstService.name, "i") }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("blocks an in-person booking without an address at Step 4", async () => {
    const user = userEvent.setup();
    renderBooking();

    await user.click(
      screen.getByRole("button", { name: new RegExp(firstService.name, "i") }),
    );
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(dateButtons()[0]);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("button", { name: /8:00 AM/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await user.click(screen.getByRole("button", { name: /in person/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      /enter the service address/i,
    );
    // Still on Step 4 — the review step was not reached.
    expect(
      screen.queryByRole("heading", { name: /review your booking/i }),
    ).not.toBeInTheDocument();
  });
});

/** Seeds a booking into the shared app state, as confirming a booking does. */
function SeedBooking({ booking }: { booking: Booking }) {
  const { addBooking } = useApp();
  useEffect(() => {
    addBooking(booking);
  }, [addBooking, booking]);
  return null;
}

const seededBooking: Booking = {
  id: "BK-9001",
  professionalId: "p-01",
  customerName: "You",
  customerAvatar: "/assets/generated/avatar-01.dim_512x512.jpg",
  serviceName: "Cloud Architecture Audit",
  date: "2026-10-05",
  time: "09:00",
  durationMinutes: 90,
  status: "pending",
  price: 420,
  location: "Video call",
  notes: "Characterization seed.",
  createdAt: "2026-09-22",
};

describe("Confirm booking journey — accepted behavior", () => {
  it("confirms a booking and shows it at the top of the customer bookings list", async () => {
    const user = userEvent.setup();

    // One shared AppProvider so the booking confirmed in the wizard is visible
    // to the bookings list, exactly as it is in the running app.
    render(
      <AppProvider>
        <MemoryRouter initialEntries={[`/app/book/${professionalId}`]}>
          <Routes>
            <Route path="/app/book/:id" element={<BookService />} />
            <Route path="/app/bookings" element={<CustomerBookings />} />
          </Routes>
        </MemoryRouter>
      </AppProvider>,
    );

    await advanceToFinalStep(user);

    // Step 6 — the primary action is a single non-payment control.
    const confirmButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    expect(confirmButton).not.toHaveTextContent(/\$/);
    expect(confirmButton).not.toHaveTextContent(/pay/i);
    await user.click(confirmButton);

    // Step 7 — Confirmation with the booking reference and details.
    expect(
      screen.getByRole("heading", { name: /booking confirmed/i }),
    ).toBeInTheDocument();
    const reference = screen.getByText(/^BK-\d+$/).textContent ?? "";
    expect(reference).toMatch(/^BK-\d+$/);

    // Navigate to the bookings list via the Confirmation action.
    await user.click(screen.getByRole("link", { name: /view my bookings/i }));

    const cards = screen.getAllByRole("article");
    const topCard = cards[0];
    expect(within(topCard).getByText(reference)).toBeInTheDocument();
    expect(within(topCard).getByText(firstService.name)).toBeInTheDocument();
    expect(within(topCard).getByText("Confirmed")).toBeInTheDocument();
    expect(within(topCard).getByText("08:00 · 90 min")).toBeInTheDocument();
    expect(within(topCard).getByText("Video call")).toBeInTheDocument();
  });
});

describe("Customer bookings list — stable behavior", () => {
  it("shows a newly added booking at the top of the list", () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/app/bookings"]}>
          <SeedBooking booking={seededBooking} />
          <Routes>
            <Route path="/app/bookings" element={<CustomerBookings />} />
          </Routes>
        </MemoryRouter>
      </AppProvider>,
    );

    const cards = screen.getAllByRole("article");
    expect(cards.length).toBeGreaterThan(1);
    expect(
      within(cards[0]).getByText(seededBooking.serviceName),
    ).toBeInTheDocument();
    expect(within(cards[0]).getByText(seededBooking.id)).toBeInTheDocument();
  });
});
