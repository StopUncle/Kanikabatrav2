/**
 * Ask Kanika, app skin.
 *
 * The port had two chances to go wrong beyond the paint. First, the old
 * modal hardcoded a 500 character limit while the server reads it from
 * MemberQuestionSettings, so raising the cap in the database did nothing
 * on the client. Second, the modal linked answers to /consilium/feed/[id];
 * carried into the app unchanged, every answer link would be a door out of
 * the shell, which is exactly how the app leaked into production once
 * before.
 *
 * Both are asserted here, along with the states a member actually meets:
 * the cooldown, the anonymity toggle, and an upvote that fails.
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AskKanikaClient, {
  type CooldownView,
  type MyQuestionView,
  type QueueView,
} from "@/components/app-shell/ask/AskKanikaClient";

const refresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh, push: jest.fn() }),
  usePathname: () => "/app/ask",
}));

jest.mock("@/lib/haptics", () => ({ haptic: jest.fn() }));

const OPEN: CooldownView = {
  allowed: true,
  nextAvailableAt: null,
  remainingToday: 1,
  dailyCap: 1,
};

function setup(over: Partial<Parameters<typeof AskKanikaClient>[0]> = {}) {
  return render(
    <AskKanikaClient
      initialCooldown={OPEN}
      initialMine={[]}
      initialQueue={[]}
      maxLength={500}
      isAdmin={false}
      {...over}
    />,
  );
}

const queueItem = (over: Partial<QueueView> = {}): QueueView => ({
  id: "q1",
  content: "How do I tell rehearsed charm from the real thing?",
  upvoteCount: 4,
  createdAt: new Date().toISOString(),
  hasUpvoted: false,
  isMine: false,
  author: "Vera",
  ...over,
});

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, cooldown: { ...OPEN, allowed: false } }),
  }) as unknown as typeof fetch;
});

describe("the composer", () => {
  it("respects the server-configured length, not a hardcoded 500", async () => {
    const user = userEvent.setup();
    setup({ maxLength: 40 });
    const box = screen.getByLabelText("Your question");
    await user.type(box, "x".repeat(60));
    expect((box as HTMLTextAreaElement).value).toHaveLength(40);
    expect(screen.getByText("40/40")).toBeInTheDocument();
  });

  it("will not send anything shorter than the server's minimum", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText("Your question"), "too short");
    expect(screen.getByText(/Send it to Kanika/i)).toBeDisabled();
    expect(screen.getByText(/characters minimum/i)).toBeInTheDocument();
  });

  it("posts the question and the anonymity choice together", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(
      screen.getByLabelText("Your question"),
      "How do I read a room faster than I do now?",
    );
    await user.click(screen.getByRole("switch", { name: /anonymously/i }));
    await user.click(screen.getByText(/Send it to Kanika/i));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/consilium/questions",
      expect.objectContaining({ method: "POST" }),
    );
    const body = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body as string,
    );
    expect(body.isAnonymous).toBe(true);
    expect(body.content).toMatch(/read a room/);
  });

  it("explains what anonymous actually means before they rely on it", async () => {
    // It hides the name from other members, not from Kanika. Saying so is
    // the difference between a feature and a false promise.
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("switch", { name: /anonymously/i }));
    expect(screen.getByText(/Kanika can still see who asked/i)).toBeInTheDocument();
  });

  it("confirms receipt instead of silently clearing the box", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(
      screen.getByLabelText("Your question"),
      "How do I read a room faster than I do now?",
    );
    await user.click(screen.getByText(/Send it to Kanika/i));
    expect(await screen.findByText(/in front of her/i)).toBeInTheDocument();
    expect(refresh).toHaveBeenCalled();
  });

  it("surfaces a rejection rather than looking like it worked", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Daily limit reached" }),
    }) as unknown as typeof fetch;

    setup();
    await user.type(
      screen.getByLabelText("Your question"),
      "How do I read a room faster than I do now?",
    );
    await user.click(screen.getByText(/Send it to Kanika/i));
    expect(await screen.findByRole("alert")).toHaveTextContent(/Daily limit/i);
  });
});

describe("the cooldown", () => {
  const locked: CooldownView = {
    allowed: false,
    nextAvailableAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    remainingToday: 0,
    dailyCap: 1,
  };

  it("replaces the composer with a countdown", () => {
    setup({ initialCooldown: locked });
    expect(screen.queryByLabelText("Your question")).toBeNull();
    expect(screen.getByText(/Next one opens in/i)).toBeInTheDocument();
  });

  it("says why the limit exists rather than just refusing", () => {
    setup({ initialCooldown: locked });
    expect(screen.getByText(/One a day is the whole point/i)).toBeInTheDocument();
  });

  it("shows the remaining allowance when the cap is above one", () => {
    setup({ initialCooldown: { ...OPEN, dailyCap: 3, remainingToday: 2 } });
    expect(screen.getByText(/2 left today/i)).toBeInTheDocument();
  });
});

describe("the queue", () => {
  it("shows Anonymous rather than a blank byline", () => {
    // Exact match: /Anonymous/i also catches the composer's own
    // "Ask anonymously" toggle sitting further up the page.
    setup({ initialQueue: [queueItem({ author: null })] });
    expect(screen.getByText("Anonymous")).toBeInTheDocument();
  });

  it("refuses to let someone upvote their own question", async () => {
    setup({ initialQueue: [queueItem({ isMine: true })] });
    expect(
      screen.getByRole("button", { name: /cannot upvote your own/i }),
    ).toBeDisabled();
  });

  it("takes the server's count over the optimistic one", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ upvoted: true, upvoteCount: 99 }),
    }) as unknown as typeof fetch;

    setup({ initialQueue: [queueItem({ upvoteCount: 4 })] });
    await user.click(screen.getByRole("button", { name: /Upvote/i }));

    // 5 was the optimistic guess; the route reconciles double-taps and is
    // authoritative.
    expect(await screen.findByText("99")).toBeInTheDocument();
  });

  it("puts the vote back when the request fails", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockRejectedValue(new Error("offline")) as unknown as typeof fetch;

    setup({ initialQueue: [queueItem({ upvoteCount: 4 })] });
    await user.click(screen.getByRole("button", { name: /Upvote/i }));

    await waitFor(() => expect(screen.getByText("4")).toBeInTheDocument());
  });

  it("offers itself when the queue is empty", () => {
    setup();
    expect(screen.getByText(/Yours would be first/i)).toBeInTheDocument();
  });
});

describe("answers", () => {
  const answered: MyQuestionView = {
    id: "q9",
    content: "What do I do when they cry on cue?",
    status: "ANSWERED",
    answeredAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    answerPost: {
      id: "post_1",
      title: "On performed tears",
      type: "VOICE_NOTE",
      voiceNoteUrl: "https://example.com/a.mp3",
      videoUrl: null,
    },
  };

  it("links the answer INSIDE the app, never back to the old shell", () => {
    // The shell-leak trap: a hardcoded /consilium/feed/... here would take
    // a member out of the app they are standing in.
    setup({ initialMine: [answered] });
    const link = screen.getByRole("link", { name: /Listen to the answer/i });
    expect(link).toHaveAttribute("href", "/app/feed/post_1");
    expect(link.getAttribute("href")).not.toContain("/consilium");
  });

  it("names the medium so the tap is predictable", () => {
    setup({
      initialMine: [
        { ...answered, answerPost: { ...answered.answerPost!, type: "VIDEO" } },
      ],
    });
    expect(screen.getByText(/Watch the answer/i)).toBeInTheDocument();
  });

  it("puts a fresh answer above the composer", () => {
    const { container } = setup({ initialMine: [answered] });
    const text = container.textContent ?? "";
    expect(text.indexOf("She answered you")).toBeLessThan(
      text.indexOf("Your question"),
    );
  });

  it("stops showing an answer once it is no longer new", () => {
    const old = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString();
    setup({ initialMine: [{ ...answered, answeredAt: old }] });
    expect(screen.queryByText(/She answered you/i)).toBeNull();
  });

  it("shows a pending question so it does not look lost", () => {
    setup({
      initialMine: [{ ...answered, status: "PENDING", answerPost: null }],
    });
    // Exact: the empty-state copy below reads "Nothing in the queue".
    expect(screen.getByText("In the queue")).toBeInTheDocument();
  });
});

describe("admin", () => {
  it("offers the queue shortcut only to Kanika", () => {
    const { unmount } = setup({ isAdmin: true });
    expect(screen.getByRole("link", { name: /Manage/i })).toHaveAttribute(
      "href",
      "/admin/questions",
    );
    unmount();
    setup({ isAdmin: false });
    expect(screen.queryByRole("link", { name: /Manage/i })).toBeNull();
  });
});
