import { renderWithProviders, screen, userEvent } from "@/__tests__/render";
import { conversations } from "@/data/messages";
import ProMessages from "@/pages/pro/ProMessages";
import { describe, expect, it } from "vitest";

const first = conversations[0];

/** The thread container is marked with a data-ocid attribute, not data-testid. */
function getThread(container: HTMLElement): HTMLElement {
  const thread = container.querySelector<HTMLElement>(
    '[data-ocid="pro_messages.thread"]',
  );
  if (!thread) throw new Error("pro messages thread not found");
  return thread;
}

describe("ProMessages", () => {
  it("renders the client conversation list and active thread", () => {
    const { container } = renderWithProviders(<ProMessages />, {
      route: "/pro/messages",
    });

    expect(
      screen.getByRole("heading", { name: /client conversations/i }),
    ).toBeInTheDocument();
    // The client name appears in both the list and the thread header.
    expect(screen.getAllByText(first.participantName).length).toBeGreaterThan(
      0,
    );
    expect(getThread(container)).toHaveTextContent(first.messages[0].text);
  });

  it("sends a reply into the active thread", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<ProMessages />, {
      route: "/pro/messages",
    });

    const input = screen.getByLabelText(/write a message/i);
    await user.type(input, "I have added the notes to your booking.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(getThread(container)).toHaveTextContent(
      "I have added the notes to your booking.",
    );
    expect(input).toHaveValue("");
  });
});
