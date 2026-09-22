import { renderWithProviders, screen, userEvent } from "@/__tests__/render";
import { conversations } from "@/data/messages";
import Messages from "@/pages/app/Messages";
import { describe, expect, it } from "vitest";

const first = conversations[0];

/** The thread container is marked with a data-ocid attribute, not data-testid. */
function getThread(container: HTMLElement): HTMLElement {
  const thread = container.querySelector<HTMLElement>(
    '[data-ocid="messages.thread"]',
  );
  if (!thread) throw new Error("messages thread not found");
  return thread;
}

describe("Messages", () => {
  it("renders the conversation list and the active thread", () => {
    const { container } = renderWithProviders(<Messages />, {
      route: "/app/messages",
    });

    expect(
      screen.getByRole("heading", { name: /conversations/i }),
    ).toBeInTheDocument();
    // The participant name appears in both the list and the thread header.
    expect(screen.getAllByText(first.participantName).length).toBeGreaterThan(
      0,
    );
    // The active thread renders its messages.
    expect(getThread(container)).toHaveTextContent(first.messages[0].text);
  });

  it("switches the active conversation when another is selected", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Messages />, {
      route: "/app/messages",
    });

    const second = conversations[1];
    await user.click(
      screen.getByRole("button", {
        name: new RegExp(second.participantName, "i"),
      }),
    );

    expect(getThread(container)).toHaveTextContent(second.messages[0].text);
  });

  it("sends a message into the active thread", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Messages />, {
      route: "/app/messages",
    });

    const input = screen.getByLabelText(/write a message/i);
    await user.type(input, "See you Thursday at nine.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(getThread(container)).toHaveTextContent("See you Thursday at nine.");
    expect(input).toHaveValue("");
  });

  it("filters conversations by search term", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Messages />, { route: "/app/messages" });

    await user.type(
      screen.getByRole("searchbox", { name: /search conversations/i }),
      "zzzznomatch",
    );

    expect(
      screen.getByText(/no conversations match that search/i),
    ).toBeInTheDocument();
  });
});
