/**
 * Subscription and Pact checkout routes.
 *
 * Written after the 2026-08-05 outage in which every one-time checkout 500'd
 * for days because `consent_collection.promotions` is refused for this
 * account's country. Nothing caught it, so these tests exist to catch the
 * whole class rather than that one line:
 *
 *   - no account-restricted parameter reaches Stripe from any of these routes
 *   - no payment-mode-only parameter is sent on a subscription session
 *   - `discounts` and `allow_promotion_codes` never ship together
 *   - a subscription is only ever mutated for the caller who owns it, never
 *     for an id taken off the request body
 *   - an unconfigured price produces a clean 503, not a Stripe 400
 */

import { NextResponse } from "next/server";

// Parameters Stripe refuses outright for this account, or refuses in
// subscription mode. Any of them reaching sessions.create is the outage.
const FORBIDDEN_ALWAYS = ["consent_collection"];
const FORBIDDEN_IN_SUBSCRIPTION_MODE = ["expires_at", "after_expiration"];

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findUnique: jest.fn() },
    communityMembership: { findUnique: jest.fn(), update: jest.fn() },
    pactMembership: { findUnique: jest.fn() },
    pact: { findFirst: jest.fn(), create: jest.fn() },
    quizResult: { findFirst: jest.fn() },
    referral: { findUnique: jest.fn() },
    emailQueue: {
      findFirst: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}));

// requireAuth is the ownership boundary for every route here: it resolves the
// caller from their cookies and hands the handler a user the request body
// cannot influence. Standing it in for a fixed user is what lets the
// ownership tests below pass a hostile body and assert it is ignored.
jest.mock("@/lib/auth/middleware", () => ({
  requireAuth: jest.fn(),
}));

// The SDK itself, so the REAL createCheckoutSession can be exercised against
// a fake Stripe and the exact parameter object it builds can be inspected.
const sdkSessionsCreate = jest.fn();
jest.mock("stripe", () =>
  jest.fn().mockImplementation(() => ({
    checkout: { sessions: { create: sdkSessionsCreate } },
  })),
);

// Everything except createCheckoutSession stays real: STRIPE_PRICES has to be
// the genuine object, both because the price-id assertions below are only
// meaningful against the live ids and because the 503 tests mutate it.
jest.mock("@/lib/stripe", () => ({
  ...jest.requireActual("@/lib/stripe"),
  getStripe: jest.fn(),
  stripe: {},
  createCheckoutSession: jest.fn(),
}));

jest.mock("@/lib/access/tier", () => ({ getAccess: jest.fn() }));
jest.mock("@/lib/analytics/server", () => ({ captureServerAsync: jest.fn() }));
jest.mock("@/lib/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));
jest.mock("@/lib/email", () => ({
  sendCancellationScheduled: jest.fn().mockResolvedValue(undefined),
  sendMembershipPaused: jest.fn().mockResolvedValue(undefined),
  sendMembershipResumed: jest.fn().mockResolvedValue(undefined),
  sendMembershipReactivated: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("@/lib/email-sequences", () => ({
  buildConsiliumAbandonmentDrip: jest.fn().mockReturnValue([]),
  buildPactAbandonmentDrip: jest.fn().mockReturnValue([]),
  buildPactWelcomeEntry: jest.fn().mockReturnValue({}),
}));
jest.mock("@/lib/referrals", () => ({
  REFERRAL_COOKIE_NAME: "kb_ref",
  resolveReferralCode: jest.fn(),
}));
jest.mock("@/lib/stripe-credits", () => ({
  ensureRefereeReferralCoupon: jest.fn(),
  resolveQuizCreditPromotionCode: jest.fn(),
}));

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { createCheckoutSession, getStripe, STRIPE_PRICES } from "@/lib/stripe";
import { getAccess } from "@/lib/access/tier";

/** The genuine factory, run against the mocked SDK above. */
const realCreateCheckoutSession = (
  jest.requireActual("@/lib/stripe") as typeof import("@/lib/stripe")
).createCheckoutSession;

const mockRequireAuth = requireAuth as jest.Mock;
const mockCreateCheckoutSession = createCheckoutSession as jest.Mock;
const mockGetStripe = getStripe as jest.Mock;
const mockGetAccess = getAccess as jest.Mock;
const db = prisma as unknown as Record<string, Record<string, jest.Mock>>;

const CALLER = { id: "user_caller", email: "caller@example.com" };

/**
 * A request the routes can read a body and cookies from. NextRequest's real
 * constructor needs the edge runtime, and these handlers only ever touch
 * `.json()`, `.cookies.get()` and `.nextUrl`.
 */
function req(body: unknown = {}, url = "http://localhost/api/test") {
  return {
    json: async () => body,
    cookies: { get: () => undefined },
    nextUrl: new URL(url),
  } as never;
}

/** The Stripe subscription shape the SDK's pinned API version returns. */
function stripeSub(periodEndSec: number, extra: Record<string, unknown> = {}) {
  return {
    id: "sub_live",
    customer: "cus_live",
    // `current_period_end` lives on the ITEM, not the root, on API version
    // 2026-03-25.dahlia. A route reading only the root silently gets
    // undefined, which is how the resume route lost every paid-through date.
    items: { data: [{ id: "si_1", current_period_end: periodEndSec }] },
    metadata: {},
    ...extra,
  };
}

function activeMembership(over: Record<string, unknown> = {}) {
  return {
    id: "cm_1",
    userId: CALLER.id,
    status: "ACTIVE",
    billingCycle: "monthly",
    paypalSubscriptionId: "ST-sub_live",
    expiresAt: new Date("2026-09-01T00:00:00Z"),
    applicationData: null,
    suspendReason: null,
    ...over,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
  sdkSessionsCreate.mockResolvedValue({ id: "cs", url: "https://x" });
  // Run the handler with a fixed caller, exactly as an authenticated request
  // would. Overridden per-test to assert the unauthenticated path.
  mockRequireAuth.mockImplementation(
    async (request: never, handler: (r: never, u: typeof CALLER) => unknown) =>
      handler(request, CALLER),
  );
  mockCreateCheckoutSession.mockResolvedValue({
    id: "cs_test_1",
    url: "https://checkout.stripe.com/pay/cs_test_1",
  });
  db.user.findUnique.mockResolvedValue({
    email: CALLER.email,
    name: "Caller",
    displayName: null,
  });
  db.emailQueue.findFirst.mockResolvedValue({ id: "eq_1" });
  db.emailQueue.createMany.mockResolvedValue({ count: 0 });
  db.emailQueue.updateMany.mockResolvedValue({ count: 0 });
});

describe("Stripe parameters: nothing account- or mode-restricted is sent", () => {
  it("the shared checkout factory sends no consent_collection in either mode", async () => {
    // The factory is the single place both subscription routes go through,
    // so proving it here covers consilium and pact at once. The real one, so
    // this asserts the actual object handed to Stripe.
    for (const mode of ["payment", "subscription"] as const) {
      sdkSessionsCreate.mockClear();
      await realCreateCheckoutSession({
        priceId: "price_1",
        mode,
        successUrl: "https://x/ok",
        cancelUrl: "https://x/no",
      });
      const params = sdkSessionsCreate.mock.calls[0][0];

      for (const key of FORBIDDEN_ALWAYS) {
        expect(params).not.toHaveProperty(key);
      }
      if (mode === "subscription") {
        // expires_at / after_expiration are payment-mode only; Stripe 400s
        // the session if they arrive on a subscription.
        for (const key of FORBIDDEN_IN_SUBSCRIPTION_MODE) {
          expect(params).not.toHaveProperty(key);
        }
      } else {
        expect(params).toHaveProperty("expires_at");
      }
    }
  });

  it("the factory never sends discounts and allow_promotion_codes together", async () => {
    // Stripe rejects the pair outright. Every combination the callers can
    // produce has to land on one side or the other.
    const cases = [
      {},
      { discountCouponId: "coupon_referee" },
      { discountPromotionCodeId: "promo_quiz" },
    ];
    for (const extra of cases) {
      sdkSessionsCreate.mockClear();
      await realCreateCheckoutSession({
        priceId: "price_1",
        mode: "subscription",
        successUrl: "https://x/ok",
        cancelUrl: "https://x/no",
        ...extra,
      });
      const params = sdkSessionsCreate.mock.calls[0][0];
      const hasDiscounts = "discounts" in params;
      const hasPromoBox = params.allow_promotion_codes === true;
      expect(hasDiscounts && hasPromoBox).toBe(false);
      // ...and exactly one of the two is always present, so a discount is
      // never silently dropped.
      expect(hasDiscounts || hasPromoBox).toBe(true);
    }
  });

  it("the donation route sends no consent_collection", async () => {
    // This route builds its session by hand instead of going through the
    // factory, so the 1f6924d fix never reached it and every donation 500'd.
    const create = jest.fn().mockResolvedValue({ id: "cs", url: "https://x" });
    mockGetStripe.mockReturnValue({ checkout: { sessions: { create } } });

    const { POST } = await import("@/app/api/donate/create-session/route");
    const res = await POST(req({ isAnonymous: false }));

    expect(res.status).toBe(200);
    const params = create.mock.calls[0][0];
    expect(params).not.toHaveProperty("consent_collection");
    // Payment mode, so the recovery pair is legal and should still be there.
    expect(params.mode).toBe("payment");
    expect(params).toHaveProperty("expires_at");
    expect(params.after_expiration.recovery.enabled).toBe(true);
    // A donation shows no promo box, and no discounts to conflict with it.
    expect(params.allow_promotion_codes).toBe(false);
    expect(params).not.toHaveProperty("discounts");
  });

  it("consilium checkout is subscription mode with the monthly price", async () => {
    db.communityMembership.findUnique.mockResolvedValue(null);
    const { POST } = await import(
      "@/app/api/consilium/subscription/create/route"
    );
    const res = await POST(req({}));

    expect(res.status).toBe(200);
    expect(mockCreateCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        priceId: "price_1TJug1Jv9vx5CHTwjPYeSm7E",
        mode: "subscription",
        metadata: expect.objectContaining({
          userId: CALLER.id,
          product_key: "INNER_CIRCLE",
          billing_cycle: "monthly",
        }),
      }),
    );
    // The route must not hand the factory a discount AND expect the promo
    // box; it passes neither here, so the factory opens the box.
    const opts = mockCreateCheckoutSession.mock.calls[0][0];
    expect(opts).not.toHaveProperty("discountCouponId");
    expect(opts).not.toHaveProperty("discountPromotionCodeId");
  });

  it("consilium annual checkout uses the annual price", async () => {
    db.communityMembership.findUnique.mockResolvedValue(null);
    const { POST } = await import(
      "@/app/api/consilium/subscription/create/route"
    );
    await POST(req({ billingCycle: "annual" }));

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        priceId: "price_1TY0ggJv9vx5CHTw87YoIcZn",
        mode: "subscription",
        metadata: expect.objectContaining({
          product_key: "INNER_CIRCLE_ANNUAL",
          billing_cycle: "annual",
        }),
      }),
    );
  });
});

describe("Unconfigured prices fail closed with a 503", () => {
  // STRIPE_PRICES resolves the two pact ids from the environment at module
  // load, so the env vars are already baked in by the time a test runs.
  // Mutating the exported object is what the route actually reads, and it
  // avoids jest.resetModules(), which would hand the routes fresh mock
  // instances this file no longer holds references to.
  const PACT_KEYS = ["PACT_WEEKLY", "PACT_ANNUAL"] as const;
  let saved: Record<string, string>;

  beforeEach(() => {
    saved = Object.fromEntries(PACT_KEYS.map((k) => [k, STRIPE_PRICES[k]]));
  });
  afterEach(() => {
    for (const k of PACT_KEYS) STRIPE_PRICES[k] = saved[k];
  });

  it("pact checkout 503s when the price env vars are unset", async () => {
    // The pact prices are the only two read from the environment, because
    // they do not exist on the account yet. Unset must mean "not open yet",
    // never an empty `price` reaching Stripe as a 400.
    for (const k of PACT_KEYS) STRIPE_PRICES[k] = "";

    const { POST } = await import("@/app/api/pact/subscription/create/route");
    const res = await POST(req({ preset: "confidence" }));

    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("The Pact is not open yet");
    expect(mockCreateCheckoutSession).not.toHaveBeenCalled();
  });

  it("pact checkout 503s on a placeholder that is not a real price id", async () => {
    STRIPE_PRICES.PACT_WEEKLY = "TODO_PASTE_ME";
    STRIPE_PRICES.PACT_ANNUAL = "TODO_PASTE_ME";

    const { POST } = await import("@/app/api/pact/subscription/create/route");
    const res = await POST(req({ preset: "confidence" }));

    expect(res.status).toBe(503);
    expect(mockCreateCheckoutSession).not.toHaveBeenCalled();
  });

  it("pact checkout goes to Stripe once the prices are configured", async () => {
    STRIPE_PRICES.PACT_WEEKLY = "price_pact_weekly_live";
    STRIPE_PRICES.PACT_ANNUAL = "price_pact_annual_live";
    db.pactMembership.findUnique.mockResolvedValue(null);

    const { POST } = await import("@/app/api/pact/subscription/create/route");
    const res = await POST(req({ preset: "confidence", billingCycle: "annual" }));

    expect(res.status).toBe(200);
    expect(mockCreateCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        priceId: "price_pact_annual_live",
        mode: "subscription",
        metadata: expect.objectContaining({
          userId: CALLER.id,
          product_key: "PACT_ANNUAL",
          pact_preset: "confidence",
        }),
      }),
    );
  });

  it("pact checkout rejects an unknown preset before touching Stripe", async () => {
    STRIPE_PRICES.PACT_WEEKLY = "price_pact_weekly_live";
    STRIPE_PRICES.PACT_ANNUAL = "price_pact_annual_live";

    const { POST } = await import("@/app/api/pact/subscription/create/route");
    const res = await POST(req({ preset: "depression" }));

    expect(res.status).toBe(400);
    expect(mockCreateCheckoutSession).not.toHaveBeenCalled();
  });
});

describe("Ownership: a subscription id in the body is never honoured", () => {
  /**
   * The bug this guards against is the classic one: taking subscriptionId
   * from the request and mutating it. Every route here must resolve the
   * subscription from the CALLER's own membership row instead, so a body
   * naming someone else's subscription changes nothing.
   */
  const HOSTILE = {
    subscriptionId: "sub_victim",
    membershipId: "cm_victim",
    userId: "user_victim",
  };

  it("cancel only ever touches the caller's own subscription", async () => {
    db.communityMembership.findUnique.mockResolvedValue(activeMembership());
    const update = jest
      .fn()
      .mockResolvedValue(stripeSub(1790000000, { cancel_at_period_end: true }));
    mockGetStripe.mockReturnValue({ subscriptions: { update } });
    db.communityMembership.update.mockResolvedValue({});

    const { POST } = await import(
      "@/app/api/consilium/subscription/cancel/route"
    );
    const res = await POST(req(HOSTILE));

    expect(res.status).toBe(200);
    // Looked up by the authenticated user, not by anything in the body.
    expect(db.communityMembership.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: CALLER.id } }),
    );
    expect(update).toHaveBeenCalledWith("sub_live", {
      cancel_at_period_end: true,
    });
    expect(update).not.toHaveBeenCalledWith(
      "sub_victim",
      expect.anything(),
    );
    expect(db.communityMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "cm_1" } }),
    );
  });

  it("pause only ever pauses the caller's own subscription", async () => {
    db.communityMembership.findUnique.mockResolvedValue(activeMembership());
    const update = jest.fn().mockResolvedValue(stripeSub(1790000000));
    jest.requireMock("@/lib/stripe").stripe.subscriptions = { update };
    db.communityMembership.update.mockResolvedValue({});

    const { POST } = await import(
      "@/app/api/consilium/subscription/pause/route"
    );
    const res = await POST(req({ ...HOSTILE, days: 30 }));

    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith("sub_live", {
      pause_collection: { behavior: "void" },
    });
    expect(update).not.toHaveBeenCalledWith("sub_victim", expect.anything());
  });

  it("pause refuses a days value that is not one of the presets", async () => {
    db.communityMembership.findUnique.mockResolvedValue(activeMembership());
    const update = jest.fn().mockResolvedValue(stripeSub(1790000000));
    jest.requireMock("@/lib/stripe").stripe.subscriptions = { update };
    db.communityMembership.update.mockResolvedValue({});

    const { POST } = await import(
      "@/app/api/consilium/subscription/pause/route"
    );
    // 3650 days would be a decade of free access; it must fall back to 30.
    const res = await POST(req({ days: 3650 }));

    expect((await res.json()).days).toBe(30);
  });

  it("upgrade-to-annual swaps the price on the caller's own subscription", async () => {
    db.communityMembership.findUnique.mockResolvedValue(activeMembership());
    const retrieve = jest.fn().mockResolvedValue(stripeSub(1790000000));
    const update = jest.fn().mockResolvedValue(stripeSub(1790000000));
    mockGetStripe.mockReturnValue({ subscriptions: { retrieve, update } });
    db.communityMembership.update.mockResolvedValue({});

    const { POST } = await import(
      "@/app/api/consilium/subscription/upgrade-to-annual/route"
    );
    const res = await POST(req(HOSTILE));

    expect(res.status).toBe(200);
    expect(retrieve).toHaveBeenCalledWith("sub_live");
    expect(update).toHaveBeenCalledWith(
      "sub_live",
      expect.objectContaining({
        items: [{ id: "si_1", price: "price_1TY0ggJv9vx5CHTw87YoIcZn" }],
      }),
    );
  });

  it("the portal opens for the caller's own customer only", async () => {
    db.communityMembership.findUnique.mockResolvedValue(activeMembership());
    const retrieve = jest.fn().mockResolvedValue(stripeSub(1790000000));
    const create = jest
      .fn()
      .mockResolvedValue({ url: "https://billing.stripe.com/p/session/x" });
    jest.requireMock("@/lib/stripe").stripe.subscriptions = { retrieve };
    jest.requireMock("@/lib/stripe").stripe.billingPortal = {
      sessions: { create },
    };

    const { POST } = await import(
      "@/app/api/consilium/subscription/portal/route"
    );
    const res = await POST(req(HOSTILE));

    expect(res.status).toBe(200);
    expect(retrieve).toHaveBeenCalledWith("sub_live");
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({ customer: "cus_live" }),
    );
  });

  it("every mutating route refuses an unauthenticated caller", async () => {
    mockRequireAuth.mockImplementation(async () =>
      NextResponse.json({ error: "Authentication required" }, { status: 401 }),
    );

    const routes = await Promise.all([
      import("@/app/api/consilium/subscription/create/route"),
      import("@/app/api/consilium/subscription/cancel/route"),
      import("@/app/api/consilium/subscription/pause/route"),
      import("@/app/api/consilium/subscription/resume/route"),
      import("@/app/api/consilium/subscription/reactivate/route"),
      import("@/app/api/consilium/subscription/portal/route"),
      import("@/app/api/consilium/subscription/upgrade-to-annual/route"),
      import("@/app/api/consilium/subscription/activate/route"),
      import("@/app/api/pact/subscription/create/route"),
      import("@/app/api/pact/sign/route"),
    ]);

    for (const route of routes) {
      const res = await route.POST(req(HOSTILE));
      expect(res.status).toBe(401);
    }
    expect(mockCreateCheckoutSession).not.toHaveBeenCalled();
  });
});

describe("Membership state guards", () => {
  it("an active subscriber cannot buy a second consilium subscription", async () => {
    db.communityMembership.findUnique.mockResolvedValue(activeMembership());
    const { POST } = await import(
      "@/app/api/consilium/subscription/create/route"
    );
    const res = await POST(req({}));

    expect(res.status).toBe(400);
    expect(mockCreateCheckoutSession).not.toHaveBeenCalled();
  });

  it("a dunning subscriber is sent to the portal, not to a double charge", async () => {
    db.communityMembership.findUnique.mockResolvedValue(
      activeMembership({
        status: "SUSPENDED",
        suspendReason: "payment-failed",
      }),
    );
    const { POST } = await import(
      "@/app/api/consilium/subscription/create/route"
    );
    const res = await POST(req({}));

    expect(res.status).toBe(409);
    expect((await res.json()).action).toBe("portal");
    expect(mockCreateCheckoutSession).not.toHaveBeenCalled();
  });

  it("a gift or bundle member gets a 422 on cancel, not a Stripe error", async () => {
    // No ST- prefix means there is no Stripe subscription to cancel. The
    // route must say so rather than slicing a garbage id and 500ing.
    db.communityMembership.findUnique.mockResolvedValue(
      activeMembership({ paypalSubscriptionId: null }),
    );
    const update = jest.fn();
    mockGetStripe.mockReturnValue({ subscriptions: { update } });

    const { POST } = await import(
      "@/app/api/consilium/subscription/cancel/route"
    );
    const res = await POST(req({}));

    expect(res.status).toBe(422);
    expect((await res.json()).isAutoRenewing).toBe(false);
    expect(update).not.toHaveBeenCalled();
  });

  it("a Stripe failure on cancel surfaces a 502, not a silent success", async () => {
    db.communityMembership.findUnique.mockResolvedValue(activeMembership());
    const update = jest.fn().mockRejectedValue(new Error("Stripe is down"));
    mockGetStripe.mockReturnValue({ subscriptions: { update } });

    const { POST } = await import(
      "@/app/api/consilium/subscription/cancel/route"
    );
    const res = await POST(req({}));

    expect(res.status).toBe(502);
    // The local row must not be stamped cancelled when Stripe never was.
    expect(db.communityMembership.update).not.toHaveBeenCalled();
  });

  it("only a member-requested pause can be self-resumed", async () => {
    // A ban or a payment failure is also SUSPENDED. Neither may be lifted
    // by the member themselves.
    db.communityMembership.findUnique.mockResolvedValue(
      activeMembership({ status: "SUSPENDED", suspendReason: "banned" }),
    );
    const { POST } = await import(
      "@/app/api/consilium/subscription/resume/route"
    );
    const res = await POST(req({}));

    expect(res.status).toBe(403);
    expect(db.communityMembership.update).not.toHaveBeenCalled();
  });
});

describe("Resume restores the real paid-through date", () => {
  it("reads current_period_end from the subscription ITEM", async () => {
    // On the API version this SDK pins, current_period_end exists only on
    // the item. Reading the root alone left expiresAt at the fabricated
    // pause deadline, so a resumed member's access ended on the wrong day.
    const periodEnd = 1790000000;
    db.communityMembership.findUnique.mockResolvedValue(
      activeMembership({
        status: "SUSPENDED",
        suspendReason: "member-requested-pause",
        expiresAt: new Date("2026-08-20T00:00:00Z"),
      }),
    );
    const update = jest.fn().mockResolvedValue(stripeSub(periodEnd));
    const retrieve = jest.fn().mockResolvedValue(stripeSub(periodEnd));
    jest.requireMock("@/lib/stripe").stripe.subscriptions = {
      update,
      retrieve,
    };
    db.communityMembership.update.mockResolvedValue({});

    const { POST } = await import(
      "@/app/api/consilium/subscription/resume/route"
    );
    const res = await POST(req({}));

    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith("sub_live", { pause_collection: null });
    expect(db.communityMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "ACTIVE",
          expiresAt: new Date(periodEnd * 1000),
        }),
      }),
    );
  });
});

describe("The free pact entitlement cannot be taken by a free account", () => {
  // Three goals, ordered change / proof / cost, as parsePactGoals expects.
  const SIGN_BODY = {
    preset: "confidence",
    goals: [
      "Stop rehearsing conversations before I have them.",
      "I speak first in the meeting, three weeks running.",
      "The evenings I spend avoiding it.",
    ],
  };

  it("refuses a body whose goals are not three non-empty strings", async () => {
    mockGetAccess.mockResolvedValue({ tier: "member", pactEntitled: true });

    const { POST } = await import("@/app/api/pact/sign/route");
    const res = await POST(req({ preset: "confidence", goals: ["only one"] }));

    expect(res.status).toBe(400);
    expect(db.pact.create).not.toHaveBeenCalled();
  });

  it("refuses a signed-in account with no paid rung", async () => {
    // /api/pact/sign creates a Pact with no payment at all. Entitlement is
    // the only thing standing between a free account and the paid product.
    mockGetAccess.mockResolvedValue({ tier: "free", pactEntitled: false });

    const { POST } = await import("@/app/api/pact/sign/route");
    const res = await POST(req(SIGN_BODY));

    expect(res.status).toBe(403);
    expect(db.pact.create).not.toHaveBeenCalled();
  });

  it("lets an entitled consilium member sign with no checkout", async () => {
    mockGetAccess.mockResolvedValue({ tier: "member", pactEntitled: true });
    db.pact.findFirst.mockResolvedValue(null);
    db.pact.create.mockResolvedValue({ id: "pact_1" });

    const { POST } = await import("@/app/api/pact/sign/route");
    const res = await POST(req(SIGN_BODY));

    expect(res.status).toBe(200);
    expect(db.pact.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: CALLER.id, number: 1 }),
      }),
    );
    expect(mockCreateCheckoutSession).not.toHaveBeenCalled();
  });

  it("checks entitlement even when the goals and preset are valid", async () => {
    // Ordering matters: a 400 on the body must not be the only thing
    // stopping an unentitled caller, or a well-formed body walks through.
    mockGetAccess.mockResolvedValue({ tier: "pact", pactEntitled: false });
    db.pact.findFirst.mockResolvedValue(null);

    const { POST } = await import("@/app/api/pact/sign/route");
    const res = await POST(req(SIGN_BODY));

    expect(res.status).toBe(403);
    expect(db.pact.create).not.toHaveBeenCalled();
  });

  it("refuses a second concurrent pact for the same account", async () => {
    mockGetAccess.mockResolvedValue({ tier: "member", pactEntitled: true });
    db.pact.findFirst.mockResolvedValue({ id: "pact_existing" });

    const { POST } = await import("@/app/api/pact/sign/route");
    const res = await POST(req(SIGN_BODY));

    expect(res.status).toBe(400);
    expect(db.pact.create).not.toHaveBeenCalled();
  });
});
