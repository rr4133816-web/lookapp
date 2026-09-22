import { renderWithProviders, screen, userEvent } from "@/__tests__/render";
import { getProfessional } from "@/data/professionals";
import BookService from "@/pages/app/BookService";
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

/** Advance from Step 1 to Step 5 (Review) using only stable controls. */
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

describe("BookService 7-step flow", () => {
  it("blocks advancing until a service is chosen", async () => {
    const user = userEvent.setup();
    renderBooking();

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      /choose a service to continue/i,
    );
  });

  it("advances through all seven steps and confirms a booking", async () => {
    const user = userEvent.setup();
    renderBooking();

    await advanceToFinalStep(user);

    // Step 6 — Review & confirm: a neutral summary with a single non-payment
    // control. No card, CVV, expiry or payment-method surface is present.
    expect(
      screen.getByRole("heading", { name: /review & confirm/i }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/cvc/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/expiry/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/name on card/i)).not.toBeInTheDocument();

    const confirmButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton).not.toHaveTextContent(/\$/);
    expect(confirmButton).not.toHaveTextContent(/pay/i);

    await user.click(confirmButton);

    // Step 7 — Confirmation
    expect(
      screen.getByRole("heading", { name: /booking confirmed/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/booking reference/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view my bookings/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /book another service/i }),
    ).toBeInTheDocument();
  });

  it("shows the confirmed booking details on the Confirmation step", async () => {
    const user = userEvent.setup();
    renderBooking();

    await advanceToFinalStep(user);
    await user.click(screen.getByRole("button", { name: /confirm booking/i }));

    // The success state echoes the service, professional, date, time and
    // location that were chosen through the flow.
    expect(screen.getAllByText(firstService.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(professional.name).length).toBeGreaterThan(0);
    expect(screen.getByText("08:00")).toBeInTheDocument();
    expect(screen.getByText("Video call")).toBeInTheDocument();
    // A booking reference is rendered in the summary.
    expect(screen.getByText(/^BK-\d+$/)).toBeInTheDocument();
  });

  it("requires an address when the in-person format is chosen", async () => {
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

    // Step 4 — switch to in person and try to continue without an address.
    await user.click(screen.getByRole("button", { name: /in person/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      /enter the service address/i,
    );
  });

  it("supports going back a step", async () => {
    const user = userEvent.setup();
    renderBooking();

    await user.click(
      screen.getByRole("button", { name: new RegExp(firstService.name, "i") }),
    );
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(
      screen.getByRole("heading", { name: /pick a date/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(
      screen.getByRole("heading", { name: /choose a service/i }),
    ).toBeInTheDocument();
  });
});
