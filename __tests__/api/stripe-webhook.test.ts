/**
 * The Stripe webhook is the only place a payment turns into something the
 * buyer can use. A checkout that 500s is loud; a webhook that drops an event
 * is silent, and the money is already taken. These tests cover the three
 * failure shapes that cost real money:
 *
 *   1. A productKey that reaches checkout with no fulfilment branch.
 *   2. A replayed event that grants twice, or a thrown error after the
 *      idempotency row is written, which makes the retry a no-op.
 *   3. A refund or a lifecycle event that leaves the entitlement standing.
 *
 * Several tests below are marked DEFECT. They pin today's behaviour so the
 * gap is visible and a fix has something to flip, not because the behaviour
 * is correct.
 */

import { POST } from "@/app/api/webhooks/stripe/route";
import { prisma } from "@/lib/prisma";
import { stripe, STRIPE_PRICES } from "@/lib/stripe";
import {
  sendBookDelivery,
  sendInnerCircleWelcomeNewUser,
  sendMembershipRenewed,
  sendMembershipSuspended,
  sendMembershipCancelled,
} from "@/lib/email";
import { createQuizConsiliumCredit } from "@/lib/stripe-credits";
import {
  handlePactCheckoutCompleted,
  handlePactInvoicePaid,
  handlePactInvoiceFailed,
  handlePactSubscriptionDeleted,
  handlePactRefund,
} from "@/lib/pact/billing";
import type { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    purchase: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    communityMembership: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    quizResult: {
      findFirst: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    emailQueue: {
      findFirst: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      updateMany: jest.fn(),
    },
    user: { findUnique: jest.fn(), create: jest.fn() },
    coachingSession: { create: jest.fn() },
    $transaction: jest.fn(),
  },
}));

jest.mock("@/lib/stripe", () => ({
  ...jest.requireActual("@/lib/stripe"),
  stripe: {
    webhooks: { constructEvent: jest.fn() },
    subscriptions: { retrieve: jest.fn(), cancel: jest.fn() },
    checkout: { sessions: { list: jest.fn() } },
  },
}));

jest.mock("@/lib/email", () => ({
  sendBookDelivery: jest.fn(),
  sendInnerCircleWelcomeNewUser: jest.fn(),
  sendMembershipRenewed: jest.fn(),
  sendMembershipSuspended: jest.fn(),
  sendMembershipCancelled: jest.fn(),
  sendEmail: jest.fn(),
  sendDonationThankYou: jest.fn(),
}));

jest.mock("@/lib/stripe-credits", () => ({
  createQuizConsiliumCredit: jest.fn(),
}));

jest.mock("@/lib/pact/billing", () => ({
  // The router's own partitioning logic stays real; only the handlers it
  // delegates to are stubbed, so "did the pact lane get the event" is a
  // genuine assertion rather than a restatement of the mock.
  isPactProductKey: jest.requireActual("@/lib/pact/billing").isPactProductKey,
  handlePactCheckoutCompleted: jest.fn(),
  handlePactInvoicePaid: jest.fn(),
  handlePactInvoiceFailed: jest.fn(),
  handlePactSubscriptionDeleted: jest.fn(),
  handlePactSubscriptionPaused: jest.fn(),
  handlePactSubscriptionUpdated: jest.fn(),
  handlePactRefund: jest.fn(),
}));

jest.mock("@/lib/analytics/server", () => ({ captureServerAsync: jest.fn() }));

jest.mock("@/lib/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

jest.mock("@/lib/email-sequences", () => ({
  buildBookBuyerSequence: jest.fn(() => [{ id: "seq" }]),
  buildQuizBuyerSequence: jest.fn(() => [{ id: "seq" }]),
  buildConsiliumWelcomeSeries: jest.fn(() => [{ id: "seq" }]),
  buildConsiliumWinbackDrip: jest.fn(() => [{ id: "seq" }]),
  buildPurchaseConfirmationEmail: jest.fn(() => ({
    subject: "s",
    html: "<p>h</p>",
  })),
  buildCheckoutRecoveryEntry: jest.fn(() => ({ id: "seq" })),
}));

jest.mock("@/lib/quiz-results-email", () => ({
  sendQuizResultsEmailForResult: jest.fn(async () => "sent"),
}));

jest.mock("@/lib/referrals/conversion", () => ({
  recordReferralConversion: jest.fn(async () => ({ ok: true })),
}));

jest.mock("@/lib/auth/password", () => ({
  hashPassword: jest.fn(async () => "hashed"),
}));

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = prisma as any;
const stripeMock = stripe as any;
const constructEvent = stripeMock.webhooks.constructEvent as jest.Mock;

/** The route only ever reads `.text()` and the signature header. */
function webhookRequest(rawBody: string, signature: string | null): NextRequest {
  return {
    text: async () => rawBody,
    headers: new Headers(
      signature === null ? {} : { "stripe-signature": signature },
    ),
  } as unknown as NextRequest;
}

/** Hand the route a verified event; the raw body is what Stripe would post. */
async function fire(event: unknown, rawBody?: string) {
  constructEvent.mockReturnValue(event);
  return POST(webhookRequest(rawBody ?? JSON.stringify(event), "t=1,v1=sig"));
}

function checkoutEvent(
  productKey: string,
  overrides: Record<string, unknown> = {},
) {
  return {
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_1",
        customer_email: "Buyer@Example.com",
        customer_details: { name: "Buyer", email: "Buyer@Example.com" },
        amount_total: 2499,
        subscription: "sub_test_1",
        metadata: { product_key: productKey },
        ...overrides,
      },
    },
  };
}

const FUTURE = new Date(Date.now() + 30 * 86_400_000);
const PAST = new Date(Date.now() - 30 * 86_400_000);

beforeEach(() => {
  jest.clearAllMocks();

  db.purchase.findUnique.mockResolvedValue(null);
  db.purchase.findFirst.mockResolvedValue(null);
  db.purchase.create.mockResolvedValue({ id: "pur_1" });
  db.purchase.update.mockResolvedValue({ id: "pur_1" });
  db.communityMembership.findUnique.mockResolvedValue(null);
  db.communityMembership.findFirst.mockResolvedValue(null);
  db.communityMembership.upsert.mockResolvedValue({ id: "cm_1" });
  db.communityMembership.update.mockResolvedValue({ id: "cm_1" });
  db.communityMembership.updateMany.mockResolvedValue({ count: 1 });
  db.quizResult.findFirst.mockResolvedValue(null);
  db.quizResult.update.mockResolvedValue({ id: "qr_1" });
  db.quizResult.updateMany.mockResolvedValue({ count: 1 });
  db.emailQueue.findFirst.mockResolvedValue(null);
  db.emailQueue.create.mockResolvedValue({ id: "eq_1" });
  db.emailQueue.createMany.mockResolvedValue({ count: 1 });
  db.emailQueue.updateMany.mockResolvedValue({ count: 0 });
  db.user.findUnique.mockResolvedValue({
    id: "user_1",
    email: "buyer@example.com",
    name: "Buyer",
  });
  db.user.create.mockResolvedValue({
    id: "user_new",
    email: "buyer@example.com",
    name: "Buyer",
  });
  db.coachingSession.create.mockResolvedValue({ id: "cs_1" });
  db.$transaction.mockImplementation(async (fn: (tx: unknown) => unknown) =>
    fn(db),
  );

  stripeMock.subscriptions.retrieve.mockResolvedValue({
    id: "sub_test_1",
    trial_end: null,
    items: { data: [{ current_period_end: 1893456000 }] },
  });
  stripeMock.subscriptions.cancel.mockResolvedValue({ id: "sub_test_1" });
  stripeMock.checkout.sessions.list.mockResolvedValue({
    data: [{ id: "cs_test_1" }],
  });

  (sendBookDelivery as jest.Mock).mockResolvedValue(true);
  (sendInnerCircleWelcomeNewUser as jest.Mock).mockResolvedValue(true);
  (sendMembershipRenewed as jest.Mock).mockResolvedValue(true);
  (sendMembershipSuspended as jest.Mock).mockResolvedValue(true);
  (sendMembershipCancelled as jest.Mock).mockResolvedValue(true);
  (createQuizConsiliumCredit as jest.Mock).mockResolvedValue({
    code: "QUIZ-ABCD1234",
    expiresAt: FUTURE,
  });
});

/* -------------------------------------------------------------------------- */
/* Signature verification and raw body                                        */
/* -------------------------------------------------------------------------- */

describe("signature verification", () => {
  it("refuses an unsigned request without touching the database", async () => {
    const res = await POST(webhookRequest("{}", null));

    expect(res.status).toBe(401);
    expect(constructEvent).not.toHaveBeenCalled();
    expect(db.purchase.create).not.toHaveBeenCalled();
  });

  it("refuses a request whose signature does not verify", async () => {
    constructEvent.mockImplementation(() => {
      throw new Error("No signatures found matching the expected signature");
    });

    const res = await POST(webhookRequest("{}", "t=1,v1=forged"));

    expect(res.status).toBe(401);
    expect(db.purchase.create).not.toHaveBeenCalled();
  });

  it("verifies against the raw body, byte for byte", async () => {
    // Re-serializing parsed JSON changes whitespace and key order, which
    // invalidates the HMAC. The route must hand Stripe exactly what arrived.
    const raw = '{\n  "type": "ping",\n  "data": { "object": {} }\n}';
    await fire({ type: "ping", data: { object: {} } }, raw);

    expect(constructEvent).toHaveBeenCalledWith(
      raw,
      "t=1,v1=sig",
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  });

  it("acknowledges an event type it does not handle instead of erroring", async () => {
    const res = await fire({
      type: "payment_intent.created",
      data: { object: {} },
    });

    expect(res.status).toBe(200);
  });
});

/* -------------------------------------------------------------------------- */
/* Every sellable productKey has a fulfilment branch                          */
/* -------------------------------------------------------------------------- */

describe("productKey fulfilment coverage", () => {
  /**
   * Keys that must write a Purchase row when their checkout completes. The
   * Purchase row is both the receipt and the idempotency anchor, so "no
   * Purchase" is the exact shape of "the customer paid and got nothing".
   */
  const WRITES_A_PURCHASE = [
    "BOOK",
    "QUIZ",
    "DARK_MIRROR",
    "COACHING_SINGLE",
    "COACHING_CLARITY",
    "COACHING_INTENSIVE",
    "COACHING_CAREER",
    "COACHING_RETAINER",
    "ASK_WRITTEN_1Q",
    "ASK_WRITTEN_3Q",
    "ASK_VOICE_1Q",
    "ASK_VOICE_3Q",
    "BOOK_CONSILIUM_1MO",
    "BOOK_CONSILIUM_3MO",
    "DONATION",
    "INNER_CIRCLE",
    "INNER_CIRCLE_ANNUAL",
  ];

  it.each(WRITES_A_PURCHASE)("fulfils %s", async (productKey) => {
    const res = await fire(checkoutEvent(productKey));

    expect(res.status).toBe(200);
    // Coaching writes a second row: the included book (variant COACHING).
    expect(db.purchase.create).toHaveBeenCalledTimes(
      productKey.startsWith("COACHING") ? 2 : 1,
    );
    expect(db.purchase.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          paypalOrderId: "ST-cs_test_1",
          status: "COMPLETED",
        }),
      }),
    );
  });

  it.each(["PACT_WEEKLY", "PACT_ANNUAL"])(
    "routes %s to the pact lane",
    async (productKey) => {
      const res = await fire(checkoutEvent(productKey));

      expect(res.status).toBe(200);
      expect(handlePactCheckoutCompleted).toHaveBeenCalledWith(
        expect.objectContaining({ productKey, subscriptionId: "sub_test_1" }),
      );
    },
  );

  it("leaves no price in STRIPE_PRICES without a fulfilment branch", async () => {
    /**
     * /api/stripe/checkout accepts any key present in STRIPE_PRICES except
     * INNER_CIRCLE and BOOK_MEMBER, and stamps it verbatim as product_key.
     * A key added there but not here is a paid checkout with no fulfilment.
     */
    const handled = new Set([...WRITES_A_PURCHASE, "PACT_WEEKLY", "PACT_ANNUAL"]);
    const knownUnhandled = new Set([
      // Server-only swap; the session still carries product_key "BOOK".
      "BOOK_MEMBER",
      // Created for the $19.99 reset, pointed at by nothing. When the reset
      // ships these ids move into INNER_CIRCLE / INNER_CIRCLE_ANNUAL rather
      // than becoming product_keys of their own. If either name ever reaches
      // session metadata, the webhook silently fulfils nothing.
      "INNER_CIRCLE_NEW_9",
      "INNER_CIRCLE_ANNUAL_NEW_90",
    ]);

    const orphans = Object.keys(STRIPE_PRICES).filter(
      (key) => !handled.has(key) && !knownUnhandled.has(key),
    );

    expect(orphans).toEqual([]);
  });

  it("drops a session that carries no product_key, silently and with a 200", async () => {
    // DEFECT (latent). Every current checkout creator stamps product_key, so
    // nothing hits this today. Anything that does not (a payment link, a
    // dashboard-created session, a future route) is paid for and never
    // fulfilled, and Stripe is told the event was handled.
    const res = await fire(checkoutEvent("BOOK", { metadata: {} }));

    expect(res.status).toBe(200);
    expect(db.purchase.create).not.toHaveBeenCalled();
  });

  it("lowercases the buyer email before matching an account", async () => {
    await fire(checkoutEvent("BOOK"));

    expect(db.purchase.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ customerEmail: "buyer@example.com" }),
      }),
    );
  });
});

/* -------------------------------------------------------------------------- */
/* Idempotency                                                                */
/* -------------------------------------------------------------------------- */

describe("idempotency on replay", () => {
  it("does not re-deliver the book when the Purchase row already exists", async () => {
    db.purchase.findUnique.mockResolvedValue({ id: "pur_existing" });

    const res = await fire(checkoutEvent("BOOK"));

    expect(res.status).toBe(200);
    expect(db.purchase.create).not.toHaveBeenCalled();
    expect(sendBookDelivery).not.toHaveBeenCalled();
  });

  it("does not mint a second quiz credit on a replayed QUIZ event", async () => {
    db.purchase.findUnique.mockResolvedValue({ id: "pur_existing" });

    await fire(checkoutEvent("QUIZ"));

    expect(createQuizConsiliumCredit).not.toHaveBeenCalled();
    expect(db.quizResult.update).not.toHaveBeenCalled();
  });

  it("does not create a second coaching session on replay", async () => {
    db.purchase.findUnique.mockResolvedValue({ id: "pur_existing" });

    await fire(checkoutEvent("COACHING_INTENSIVE"));

    expect(db.coachingSession.create).not.toHaveBeenCalled();
    expect(sendBookDelivery).not.toHaveBeenCalled();
  });

  it("a coaching purchase delivers the included book", async () => {
    await fire(checkoutEvent("COACHING_SINGLE"));

    expect(db.purchase.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          type: "BOOK",
          productVariant: "COACHING",
          amount: 0,
          paypalOrderId: "ST-cs_test_1-BOOK",
          downloadToken: expect.any(String),
        }),
      }),
    );
    expect(sendBookDelivery).toHaveBeenCalledWith(
      "buyer@example.com",
      "Buyer",
      expect.any(String),
      null,
      expect.any(Date),
    );
  });

  it("flags the coaching book row when the delivery email fails", async () => {
    (sendBookDelivery as jest.Mock).mockResolvedValue(false);

    await fire(checkoutEvent("COACHING_SINGLE"));

    expect(db.purchase.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { paypalOrderId: "ST-cs_test_1-BOOK" },
        data: expect.objectContaining({
          metadata: expect.objectContaining({ emailDeliveryFailed: true }),
        }),
      }),
    );
  });

  it("writes the coaching Purchase and session in one transaction", async () => {
    await fire(checkoutEvent("COACHING_CAREER"));

    expect(db.$transaction).toHaveBeenCalledTimes(1);
    expect(db.coachingSession.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ sessionCount: 4 }),
      }),
    );
  });

  it("does not extend a renewal that is not newer than the current expiry", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "ACTIVE",
      expiresAt: FUTURE,
    });

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          subscription: "sub_test_1",
          lines: {
            data: [{ period: { end: Math.floor(FUTURE.getTime() / 1000) } }],
          },
        },
      },
    });

    expect(db.communityMembership.update).not.toHaveBeenCalled();
  });

  it("cancels a duplicate subscription instead of double-billing the member", async () => {
    db.communityMembership.findUnique.mockResolvedValue({
      id: "cm_1",
      status: "ACTIVE",
      paypalSubscriptionId: "ST-sub_other",
    });

    await fire(checkoutEvent("INNER_CIRCLE"));

    expect(stripeMock.subscriptions.cancel).toHaveBeenCalledWith("sub_test_1");
    expect(db.communityMembership.upsert).not.toHaveBeenCalled();
    // The Purchase row is still written so the retry of this event is a no-op.
    expect(db.purchase.create).toHaveBeenCalledTimes(1);
  });
});

/* -------------------------------------------------------------------------- */
/* Failure isolation after the first write                                    */
/* -------------------------------------------------------------------------- */

describe("failure isolation", () => {
  it("flags the Purchase when book delivery reports failure", async () => {
    (sendBookDelivery as jest.Mock).mockResolvedValue(false);

    const res = await fire(checkoutEvent("BOOK"));

    expect(res.status).toBe(200);
    expect(db.purchase.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          metadata: expect.objectContaining({ emailDeliveryFailed: true }),
        }),
      }),
    );
  });

  it("DEFECT: a THROWN book-delivery failure 500s after the Purchase is written", async () => {
    // The flag path above only fires on a returned `false`. A throw skips it,
    // 500s the handler, and Stripe retries into the idempotency guard, which
    // finds the Purchase and stops. Net result: paid, recorded, never
    // delivered, and never flagged for /api/cron/retry-emails.
    (sendBookDelivery as jest.Mock).mockRejectedValue(new Error("resend down"));

    const res = await fire(checkoutEvent("BOOK"));

    expect(res.status).toBe(500);
    expect(db.purchase.create).toHaveBeenCalledTimes(1);
    expect(db.purchase.update).not.toHaveBeenCalled();
  });

  it("DEFECT: a stale quizResultId loses the unlock permanently", async () => {
    // The Purchase row is written before this update, so the P2025 throw
    // 500s the handler and the retry short-circuits on the row it just made.
    db.quizResult.update.mockRejectedValue(new Error("P2025 record not found"));

    const res = await fire(
      checkoutEvent("QUIZ", {
        metadata: { product_key: "QUIZ", quizResultId: "gone" },
      }),
    );

    expect(res.status).toBe(500);
    expect(db.purchase.create).toHaveBeenCalledTimes(1);
    expect(createQuizConsiliumCredit).not.toHaveBeenCalled();
  });

  it("still unlocks the quiz when the Stripe credit cannot be minted", async () => {
    (createQuizConsiliumCredit as jest.Mock).mockResolvedValue(null);
    db.quizResult.findFirst.mockResolvedValue({ id: "qr_1" });

    const res = await fire(checkoutEvent("QUIZ"));

    expect(res.status).toBe(200);
    expect(db.quizResult.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "qr_1" },
        data: expect.objectContaining({ paid: true }),
      }),
    );
  });

  it("survives a coaching confirmation email that throws", async () => {
    const { sendEmail } = jest.requireMock("@/lib/email");
    (sendEmail as jest.Mock).mockRejectedValue(new Error("smtp down"));

    const res = await fire(checkoutEvent("COACHING_SINGLE"));

    expect(res.status).toBe(200);
    expect(db.$transaction).toHaveBeenCalledTimes(1);
  });

  it("survives a failed welcome-series enqueue on a Consilium join", async () => {
    db.emailQueue.createMany.mockRejectedValue(new Error("db blip"));

    const res = await fire(checkoutEvent("INNER_CIRCLE"));

    expect(res.status).toBe(200);
    expect(db.communityMembership.upsert).toHaveBeenCalled();
    expect(db.purchase.create).toHaveBeenCalledTimes(1);
  });

  it("writes the Consilium membership before the idempotency row", async () => {
    // Ordering matters: the Purchase row suppresses every retry, so it has to
    // be the LAST thing written. If it landed first, a throw in between would
    // leave a paid member with no access and no second chance.
    const order: string[] = [];
    db.communityMembership.upsert.mockImplementation(async () => {
      order.push("membership");
      return { id: "cm_1" };
    });
    db.purchase.create.mockImplementation(async () => {
      order.push("purchase");
      return { id: "pur_1" };
    });

    await fire(checkoutEvent("INNER_CIRCLE"));

    expect(order).toEqual(["membership", "purchase"]);
  });

  it("DEFECT: the bundle writes its idempotency row before granting access", async () => {
    // The mirror image of the test above. BOOK_CONSILIUM_* creates the
    // Purchase first, so a throw at the membership upsert is terminal: the
    // buyer keeps the book and never gets the Consilium half they paid for.
    const order: string[] = [];
    db.purchase.create.mockImplementation(async () => {
      order.push("purchase");
      return { id: "pur_1" };
    });
    db.communityMembership.upsert.mockImplementation(async () => {
      order.push("membership");
      return { id: "cm_1" };
    });

    await fire(checkoutEvent("BOOK_CONSILIUM_1MO"));

    expect(order).toEqual(["purchase", "membership"]);
  });
});

/* -------------------------------------------------------------------------- */
/* Renewal, suspension, and the Stripe API version                            */
/* -------------------------------------------------------------------------- */

describe("subscription lifecycle", () => {
  it("extends an active membership to the invoiced period end", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "ACTIVE",
      expiresAt: PAST,
    });
    const end = Math.floor((Date.now() + 40 * 86_400_000) / 1000);

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          subscription: "sub_test_1",
          lines: { data: [{ period: { end } }] },
        },
      },
    });

    expect(db.communityMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "cm_1" },
        data: expect.objectContaining({
          status: "ACTIVE",
          expiresAt: new Date(end * 1000),
          suspendReason: null,
        }),
      }),
    );
  });

  it("revives a lazily EXPIRED member whose payment landed late", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "EXPIRED",
      expiresAt: PAST,
    });
    const end = Math.floor((Date.now() + 40 * 86_400_000) / 1000);

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          subscription: "sub_test_1",
          lines: { data: [{ period: { end } }] },
        },
      },
    });

    expect(db.communityMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: "ACTIVE" }),
      }),
    );
  });

  it("never extends a CANCELLED membership on a late invoice", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "CANCELLED",
      expiresAt: PAST,
    });

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          subscription: "sub_test_1",
          lines: {
            data: [
              { period: { end: Math.floor(Date.now() / 1000) + 86_400 } },
            ],
          },
        },
      },
    });

    expect(db.communityMembership.update).not.toHaveBeenCalled();
  });

  it("does not push a member-requested pause forward on a stray invoice", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "SUSPENDED",
      suspendReason: "member-requested-pause",
      expiresAt: PAST,
    });

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          subscription: "sub_test_1",
          lines: {
            data: [
              { period: { end: Math.floor(Date.now() / 1000) + 86_400 } },
            ],
          },
        },
      },
    });

    expect(db.communityMembership.update).not.toHaveBeenCalled();
  });

  it("DEFECT: a Stripe-paused member who resumes pays and stays SUSPENDED", async () => {
    // subscription.paused stamps suspendReason "payment-paused". Nothing
    // clears it: there is no customer.subscription.resumed handler, the
    // auto-resume cron only touches "member-requested-pause", and this
    // reason is absent from shouldReactivate. The renewal is charged and
    // the member keeps seeing the paywall.
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "SUSPENDED",
      suspendReason: "payment-paused",
      expiresAt: PAST,
    });

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          subscription: "sub_test_1",
          lines: {
            data: [
              { period: { end: Math.floor(Date.now() / 1000) + 86_400 } },
            ],
          },
        },
      },
    });

    expect(db.communityMembership.update).not.toHaveBeenCalled();
  });

  it("suspends an active membership when the renewal payment fails", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "ACTIVE",
      expiresAt: FUTURE,
    });

    await fire({
      type: "invoice.payment_failed",
      data: { object: { subscription: "sub_test_1" } },
    });

    expect(db.communityMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "SUSPENDED",
          suspendReason: "payment-failed",
        }),
      }),
    );
    expect(sendMembershipSuspended).toHaveBeenCalled();
  });

  it("hands an unknown subscription to the pact lane rather than dropping it", async () => {
    db.communityMembership.findFirst.mockResolvedValue(null);

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          subscription: "sub_pact_1",
          lines: {
            data: [
              { period: { end: Math.floor(Date.now() / 1000) + 86_400 } },
            ],
          },
        },
      },
    });
    await fire({
      type: "invoice.payment_failed",
      data: { object: { subscription: "sub_pact_1" } },
    });
    await fire({
      type: "customer.subscription.deleted",
      data: { object: { id: "sub_pact_1" } },
    });

    expect(handlePactInvoicePaid).toHaveBeenCalledWith(
      "sub_pact_1",
      expect.any(Date),
    );
    expect(handlePactInvoiceFailed).toHaveBeenCalledWith("sub_pact_1");
    expect(handlePactSubscriptionDeleted).toHaveBeenCalledWith("sub_pact_1");
  });

  it("cancels the membership and queues winback on a voluntary deletion", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "ACTIVE",
      expiresAt: FUTURE,
      suspendedAt: null,
      suspendReason: null,
    });

    await fire({
      type: "customer.subscription.deleted",
      data: { object: { id: "sub_test_1" } },
    });

    expect(db.communityMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: "CANCELLED" }),
      }),
    );
    expect(sendMembershipCancelled).toHaveBeenCalled();
    expect(db.emailQueue.createMany).toHaveBeenCalled();
  });

  it("does not send a winback to someone whose refund cancelled them", async () => {
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "CANCELLED",
      expiresAt: FUTURE,
      suspendedAt: null,
      suspendReason: "refunded",
    });

    await fire({
      type: "customer.subscription.deleted",
      data: { object: { id: "sub_test_1" } },
    });

    expect(db.emailQueue.createMany).not.toHaveBeenCalled();
  });

  it("DEFECT: an invoice in the current Stripe shape is dropped entirely", async () => {
    /**
     * `Invoice.subscription` was removed in the 2025-03-31 API version and
     * lives at `parent.subscription_details.subscription`. The installed SDK
     * (stripe@22, pinned to 2026-03-25.dahlia) has no `subscription` field on
     * Invoice at all. If the webhook endpoint renders events at anything past
     * basil, both invoice handlers read undefined and break out: renewals
     * never extend, failed payments never suspend, and every paying member
     * lazily EXPIRES. The `customer.subscription.updated` handler already
     * carries a post-basil fallback, which is what makes this shape likely.
     */
    db.communityMembership.findFirst.mockResolvedValue({
      id: "cm_1",
      userId: "user_1",
      status: "ACTIVE",
      expiresAt: PAST,
    });

    await fire({
      type: "invoice.payment_succeeded",
      data: {
        object: {
          parent: {
            type: "subscription_details",
            subscription_details: { subscription: "sub_test_1" },
          },
          lines: {
            data: [
              { period: { end: Math.floor(Date.now() / 1000) + 86_400 } },
            ],
          },
        },
      },
    });

    expect(db.communityMembership.findFirst).not.toHaveBeenCalled();
    expect(db.communityMembership.update).not.toHaveBeenCalled();
    expect(handlePactInvoicePaid).not.toHaveBeenCalled();
    expect(sendMembershipRenewed).not.toHaveBeenCalled();
  });

  it("DEFECT: the retrieved subscription no longer exposes current_period_end", async () => {
    // lib/stripe.ts builds the client with no apiVersion, so retrieves come
    // back in dahlia shape where the period sits on the item, not the
    // subscription. Both this branch and lib/pact/billing read only
    // sub.current_period_end, so the paid-through date is always the local
    // fallback rather than what Stripe actually billed.
    stripeMock.subscriptions.retrieve.mockResolvedValue({
      id: "sub_test_1",
      trial_end: null,
      items: { data: [{ current_period_end: 1893456000 }] },
    });

    await fire(checkoutEvent("INNER_CIRCLE_ANNUAL"));

    const upsert = db.communityMembership.upsert.mock.calls[0][0];
    expect(upsert.create.expiresAt.getTime()).not.toBe(1893456000 * 1000);
    // A year out from now, computed locally, not read from Stripe.
    expect(upsert.create.expiresAt.getFullYear()).toBe(
      new Date().getFullYear() + 1,
    );
  });
});

/* -------------------------------------------------------------------------- */
/* Refunds                                                                    */
/* -------------------------------------------------------------------------- */

describe("refunds", () => {
  function refundEvent(overrides: Record<string, unknown> = {}) {
    return {
      type: "charge.refunded",
      data: {
        object: {
          id: "ch_1",
          payment_intent: "pi_1",
          refunded: true,
          amount: 2900,
          amount_refunded: 2900,
          ...overrides,
        },
      },
    };
  }

  it("cancels Consilium access on a full membership refund", async () => {
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "COMPLETED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: null,
      metadata: { productKey: "INNER_CIRCLE" },
    });

    await fire(refundEvent());

    expect(db.purchase.update).toHaveBeenCalledWith({
      where: { id: "pur_1" },
      data: { status: "REFUNDED" },
    });
    expect(db.communityMembership.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "CANCELLED",
          suspendReason: "refunded",
        }),
      }),
    );
  });

  it("leaves a partial refund alone", async () => {
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "COMPLETED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: null,
      metadata: { productKey: "INNER_CIRCLE" },
    });

    await fire(refundEvent({ refunded: false, amount_refunded: 100 }));

    expect(db.purchase.update).not.toHaveBeenCalled();
    expect(db.communityMembership.updateMany).not.toHaveBeenCalled();
  });

  it("does not re-cancel on a replayed refund", async () => {
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "REFUNDED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: null,
      metadata: { productKey: "INNER_CIRCLE" },
    });

    await fire(refundEvent());

    expect(db.purchase.update).not.toHaveBeenCalled();
    expect(db.communityMembership.updateMany).not.toHaveBeenCalled();
  });

  it("revokes the download token and re-locks the quiz on a book refund", async () => {
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "COMPLETED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: "tok",
      metadata: { productKey: "BOOK" },
    });

    await fire(refundEvent({ amount: 2499, amount_refunded: 2499 }));

    expect(db.purchase.update).toHaveBeenCalledWith({
      where: { id: "pur_1" },
      data: { downloadToken: null },
    });
    expect(db.quizResult.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { paid: false } }),
    );
  });

  it("keeps the book unlocked when another completed purchase covers it", async () => {
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "COMPLETED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: "tok",
      metadata: { productKey: "BOOK" },
    });
    db.purchase.findFirst.mockResolvedValue({ id: "pur_other" });

    await fire(refundEvent({ amount: 2499, amount_refunded: 2499 }));

    expect(db.quizResult.updateMany).not.toHaveBeenCalled();
  });

  it("breaks the pact when a pact purchase is refunded", async () => {
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "COMPLETED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: null,
      metadata: { productKey: "PACT_WEEKLY" },
    });

    await fire(refundEvent({ amount: 499, amount_refunded: 499 }));

    expect(handlePactRefund).toHaveBeenCalledWith("user_1");
    expect(db.communityMembership.updateMany).not.toHaveBeenCalled();
  });

  it("DEFECT: a refunded QUIZ purchase keeps its unlocked results", async () => {
    // The re-lock is nested inside `if (purchase.downloadToken)`, and a QUIZ
    // purchase never has one. The buyer is refunded and keeps the paywalled
    // results forever.
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "COMPLETED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: null,
      metadata: { productKey: "QUIZ" },
    });

    await fire(refundEvent({ amount: 999, amount_refunded: 999 }));

    expect(db.purchase.update).toHaveBeenCalledWith({
      where: { id: "pur_1" },
      data: { status: "REFUNDED" },
    });
    expect(db.quizResult.updateMany).not.toHaveBeenCalled();
  });

  it("DEFECT: refunding never cancels the Stripe subscription behind it", async () => {
    // Access is revoked locally, the subscription is left billing. Next
    // period Stripe charges again, the renewal handler sees a CANCELLED row
    // and refuses to restore access: the customer pays monthly for nothing.
    db.purchase.findUnique.mockResolvedValue({
      id: "pur_1",
      status: "COMPLETED",
      userId: "user_1",
      customerEmail: "buyer@example.com",
      downloadToken: null,
      metadata: { productKey: "INNER_CIRCLE", subscriptionId: "sub_test_1" },
    });

    await fire(refundEvent());

    expect(db.communityMembership.updateMany).toHaveBeenCalled();
    expect(stripeMock.subscriptions.cancel).not.toHaveBeenCalled();
  });

  it("DEFECT: a refunded renewal charge revokes nothing", async () => {
    // Only the FIRST invoice of a subscription has a payment_intent that
    // belongs to a Checkout Session. Refund month three and the session
    // lookup returns empty, so the handler gives up before it ever finds the
    // Purchase: money back, access intact.
    stripeMock.checkout.sessions.list.mockResolvedValue({ data: [] });

    await fire(refundEvent());

    expect(db.purchase.findUnique).not.toHaveBeenCalled();
    expect(db.communityMembership.updateMany).not.toHaveBeenCalled();
    expect(handlePactRefund).not.toHaveBeenCalled();
  });
});

/* -------------------------------------------------------------------------- */
/* Abandoned checkout recovery                                                */
/* -------------------------------------------------------------------------- */

describe("checkout.session.expired", () => {
  function expiredEvent(overrides: Record<string, unknown> = {}) {
    return {
      type: "checkout.session.expired",
      data: {
        object: {
          id: "cs_expired_1",
          created: Math.floor(Date.now() / 1000) - 3600,
          customer_email: "Buyer@Example.com",
          customer_details: { name: "Buyer", email: "Buyer@Example.com" },
          metadata: { product_key: "BOOK" },
          after_expiration: { recovery: { url: "https://stripe/recover" } },
          ...overrides,
        },
      },
    };
  }

  it("queues one recovery email for an abandoned checkout", async () => {
    await fire(expiredEvent());

    expect(db.emailQueue.create).toHaveBeenCalledTimes(1);
  });

  it("stays quiet when the buyer already paid since abandoning", async () => {
    db.purchase.findFirst.mockResolvedValue({ id: "pur_paid" });

    await fire(expiredEvent());

    expect(db.emailQueue.create).not.toHaveBeenCalled();
  });

  it("stays quiet when an internal drip already owns this address", async () => {
    db.emailQueue.findFirst.mockResolvedValue({ id: "eq_pending" });

    await fire(expiredEvent());

    expect(db.emailQueue.create).not.toHaveBeenCalled();
  });

  it("respects an explicit promotions opt-out", async () => {
    await fire(expiredEvent({ consent: { promotions: "opt_out" } }));

    expect(db.emailQueue.create).not.toHaveBeenCalled();
  });
});
