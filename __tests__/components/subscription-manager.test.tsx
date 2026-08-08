/**
 * The cancel surface on /app/profile, and the invariant behind it.
 *
 * The page this replaces queried CommunityMembership alone and rendered a
 * single Stripe-portal button gated on ACTIVE or SUSPENDED. So a member
 * paying weekly for the Pact saw the words "Free account" and no billing
 * at all, and a CANCELLED, EXPIRED or payment-failed member saw nothing
 * whatsoever: no status, no action, no explanation. That is the shape of
 * the "I couldn't find how to cancel" complaint, and of the chargeback
 * that follows it.
 *
 * The invariant, asserted below for every state in the matrix: each block
 * ends in either something to press or a sentence saying why there is
 * nothing to press. Never silence.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubscriptionManager, {
  type PactView,
  type SubscriptionView,
} from "@/components/app-shell/profile/SubscriptionManager";

const refresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh, push: jest.fn() }),
}));

const BASE: SubscriptionView = {
  status: "ACTIVE",
  billingCycle: "monthly",
  activatedAt: "2026-01-01T00:00:00.000Z",
  expiresAt: "2026-09-01T00:00:00.000Z",
  cancelledAt: null,
  autoRenewing: true,
  selfPaused: false,
  paymentFailed: false,
};

const PACT_BASE: PactView = {
  ...BASE,
  billingCycle: "weekly",
  entitledFree: false,
  covenantLive: true,
};

function consilium(over: Partial<SubscriptionView> = {}): SubscriptionView {
  return { ...BASE, ...over };
}
function pact(over: Partial<PactView> = {}): PactView {
  return { ...PACT_BASE, ...over };
}

/** A block is a dead end when it offers no control and no explanation. */
function assertNotADeadEnd(label: string) {
  const block = screen.getByText(label).closest("div")!.parentElement!;
  const controls = within(block).queryAllByRole("button").length;
  const links = within(block).queryAllByRole("link").length;
  const prose = block.textContent ?? "";
  expect(controls + links > 0 || prose.length > 60).toBe(true);
}

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, message: "Done." }),
  }) as unknown as typeof fetch;
});

describe("the Pact is visible at all", () => {
  it("renders a pact block for a weekly subscriber", () => {
    // The headline bug: this member saw nothing about the thing billing them.
    render(<SubscriptionManager consilium={null} pact={pact()} />);
    expect(screen.getByText("The Blood Pact")).toBeInTheDocument();
    expect(screen.getByText(/Break the pact/i)).toBeInTheDocument();
  });

  it("says the Consilium is carrying it when nothing is charged", () => {
    render(
      <SubscriptionManager
        consilium={null}
        pact={pact({ entitledFree: true, autoRenewing: false })}
      />,
    );
    expect(screen.getByText(/Included with your Consilium/i)).toBeInTheDocument();
    // Still breakable: the covenant is real even when the billing is not.
    expect(screen.getByText(/Break the pact/i)).toBeInTheDocument();
  });

  it("offers a way back for a broken pact instead of going quiet", () => {
    render(
      <SubscriptionManager
        consilium={null}
        pact={pact({ covenantLive: false, status: "CANCELLED" })}
      />,
    );
    expect(screen.getByText(/Sign again/i)).toBeInTheDocument();
    expect(screen.getByText(/nothing is being charged/i)).toBeInTheDocument();
  });
});

describe("no Consilium state is a dead end", () => {
  const states: Array<[string, SubscriptionView]> = [
    ["active auto-renewing", consilium()],
    ["cancellation scheduled", consilium({ cancelledAt: "2026-08-01T00:00:00.000Z" })],
    ["gift, no auto-renewal", consilium({ autoRenewing: false })],
    ["paused by the member", consilium({ status: "SUSPENDED", selfPaused: true })],
    ["suspended by a failed payment", consilium({ status: "SUSPENDED", paymentFailed: true })],
    ["suspended for some other reason", consilium({ status: "SUSPENDED" })],
    ["cancelled", consilium({ status: "CANCELLED" })],
    ["expired", consilium({ status: "EXPIRED" })],
    ["legacy pending row", consilium({ status: "PENDING" })],
  ];

  it.each(states)("%s offers an action or an explanation", (_label, view) => {
    render(<SubscriptionManager consilium={view} pact={null} />);
    assertNotADeadEnd("Consilium");
  });
});

describe("cancelling does not depend on the Stripe portal", () => {
  it("confirms first, then calls the app's own cancel route", async () => {
    const user = userEvent.setup();
    render(<SubscriptionManager consilium={consilium()} pact={null} />);

    await user.click(screen.getByText(/Cancel auto-renewal/i));
    // Destructive, so it asks, and says what is actually lost.
    expect(screen.getByText(/keep full access until/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();

    await user.click(screen.getByText(/Yes, cancel auto-renewal/i));
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/consilium/subscription/cancel",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("lets the member back out of the confirmation", async () => {
    const user = userEvent.setup();
    render(<SubscriptionManager consilium={consilium()} pact={null} />);
    await user.click(screen.getByText(/Cancel auto-renewal/i));
    await user.click(screen.getByText(/Keep it/i));
    expect(screen.queryByText(/Yes, cancel auto-renewal/i)).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("never offers a cancel button to a gift membership", async () => {
    // The route 422s these, so showing the button would be a promise the
    // server refuses.
    render(
      <SubscriptionManager consilium={consilium({ autoRenewing: false })} pact={null} />,
    );
    expect(screen.queryByText(/Cancel auto-renewal/i)).toBeNull();
    expect(screen.getByText(/does not auto-renew/i)).toBeInTheDocument();
  });

  it("offers reactivation once a cancellation is scheduled", async () => {
    const user = userEvent.setup();
    render(
      <SubscriptionManager
        consilium={consilium({ cancelledAt: "2026-08-01T00:00:00.000Z" })}
        pact={null}
      />,
    );
    expect(screen.getByText(/Auto-renewal is off/i)).toBeInTheDocument();
    await user.click(screen.getByText(/Turn auto-renewal back on/i));
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/consilium/subscription/reactivate",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("resumes a self-paused membership without the portal", async () => {
    const user = userEvent.setup();
    render(
      <SubscriptionManager
        consilium={consilium({ status: "SUSPENDED", selfPaused: true })}
        pact={null}
      />,
    );
    await user.click(screen.getByText(/Resume membership/i));
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/consilium/subscription/resume",
      expect.objectContaining({ method: "POST" }),
    );
  });
});

describe("failures are shown, not swallowed", () => {
  it("surfaces the route's own wording", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "This membership doesn't auto-renew. It expires on its scheduled end date.",
      }),
    }) as unknown as typeof fetch;

    render(<SubscriptionManager consilium={consilium()} pact={null} />);
    await user.click(screen.getByText(/Cancel auto-renewal/i));
    await user.click(screen.getByText(/Yes, cancel auto-renewal/i));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /doesn't auto-renew/i,
    );
  });

  it("says so when the network is gone rather than looking successful", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockRejectedValue(new Error("offline")) as unknown as typeof fetch;

    render(<SubscriptionManager consilium={consilium()} pact={null} />);
    await user.click(screen.getByText(/Cancel auto-renewal/i));
    await user.click(screen.getByText(/Yes, cancel auto-renewal/i));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /could not reach the server/i,
    );
  });
});

describe("nothing at all", () => {
  it("renders nothing when there is no subscription of either kind", () => {
    // The page itself owns the free-account copy; the manager staying
    // silent here is what stops two components describing the same tier.
    const { container } = render(
      <SubscriptionManager consilium={null} pact={null} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
