/**
 * Regression tests for the Checkout Session payload itself.
 *
 * These exist because of a real outage. Every one-time checkout (book,
 * coaching, quiz, Ask) returned 500 for days: `createCheckoutSession` sent
 * `consent_collection.promotions`, which Stripe refuses for this account's
 * country, so `sessions.create` 400'd before a customer could ever pay.
 *
 * The checkout ROUTE test passed green throughout, because it mocks
 * `createCheckoutSession` and therefore never sees the object Stripe is
 * actually handed. This file tests the layer below that mock: the exact
 * argument passed to `stripe.checkout.sessions.create`.
 */

const mockSessionsCreate = jest.fn();

jest.mock("stripe", () =>
  jest.fn().mockImplementation(() => ({
    checkout: { sessions: { create: mockSessionsCreate } },
  })),
);

process.env.STRIPE_SECRET_KEY = "sk_test_dummy_for_unit_tests";

import { createCheckoutSession } from "@/lib/stripe";

type SessionParams = Record<string, unknown>;

/**
 * Every top-level Checkout Session parameter this codebase is allowed to
 * send, and the reason it is safe.
 *
 * This is a deliberate tripwire rather than a description. Stripe accepts
 * hundreds of parameters and a meaningful number of them are gated on the
 * account's country, capabilities, or session mode, which means they fail
 * at `sessions.create` time in production and nowhere else. Adding a
 * parameter to `createCheckoutSession` must therefore break this test, so
 * that "is this available on OUR account, in THIS mode?" is answered by a
 * person before it ships, not by customers hitting a 500.
 *
 * `consent_collection` is the one that already did that. Do not re-add it
 * without confirming Stripe supports it for this account's country.
 */
const ALLOWED_SESSION_PARAMS = new Set([
  "payment_method_types",
  "line_items",
  "mode",
  "success_url",
  "cancel_url",
  "customer_email",
  "metadata",
  "expires_at",
  "after_expiration",
  "discounts",
  "allow_promotion_codes",
  "subscription_data",
]);

/** Parameters Stripe rejects outright on a subscription-mode session. */
const PAYMENT_MODE_ONLY_PARAMS = ["expires_at", "after_expiration"];

const BASE = {
  successUrl: "https://kanikarose.com/success",
  cancelUrl: "https://kanikarose.com/book",
};

function lastSessionParams(): SessionParams {
  expect(mockSessionsCreate).toHaveBeenCalled();
  return mockSessionsCreate.mock.calls[
    mockSessionsCreate.mock.calls.length - 1
  ][0] as SessionParams;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSessionsCreate.mockResolvedValue({
    id: "cs_test_123",
    url: "https://checkout.stripe.com/pay/cs_test_123",
  });
});

describe("createCheckoutSession — parameter allowlist", () => {
  it("sends only reviewed parameters in payment mode", async () => {
    await createCheckoutSession({
      priceId: "price_book",
      mode: "payment",
      ...BASE,
    });

    const unexpected = Object.keys(lastSessionParams()).filter(
      (key) => !ALLOWED_SESSION_PARAMS.has(key),
    );

    expect(unexpected).toEqual([]);
  });

  it("sends only reviewed parameters in subscription mode", async () => {
    await createCheckoutSession({
      priceId: "price_inner_circle",
      mode: "subscription",
      ...BASE,
    });

    const unexpected = Object.keys(lastSessionParams()).filter(
      (key) => !ALLOWED_SESSION_PARAMS.has(key),
    );

    expect(unexpected).toEqual([]);
  });
});

describe("createCheckoutSession — the outage that took every one-time checkout down", () => {
  it.each(["payment", "subscription"] as const)(
    "never sends consent_collection in %s mode",
    async (mode) => {
      await createCheckoutSession({ priceId: "price_x", mode, ...BASE });

      expect(lastSessionParams()).not.toHaveProperty("consent_collection");
    },
  );

  it("still creates a session for every one-time product", async () => {
    for (const priceId of [
      "price_book",
      "price_quiz",
      "price_coaching_single",
      "price_ask_written_1q",
      "price_donation",
    ]) {
      mockSessionsCreate.mockClear();
      const session = await createCheckoutSession({
        priceId,
        mode: "payment",
        ...BASE,
      });

      expect(session.id).toBe("cs_test_123");
      expect(lastSessionParams().line_items).toEqual([{ price: priceId, quantity: 1 }]);
    }
  });
});

describe("createCheckoutSession — mode-restricted parameters", () => {
  it("attaches abandoned-checkout recovery in payment mode", async () => {
    await createCheckoutSession({
      priceId: "price_book",
      mode: "payment",
      ...BASE,
    });

    const params = lastSessionParams();
    expect(params.after_expiration).toEqual({
      recovery: { enabled: true, allow_promotion_codes: true },
    });
    expect(typeof params.expires_at).toBe("number");
  });

  it("keeps expires_at inside Stripe's 30 minute floor and 24 hour ceiling", async () => {
    const before = Math.floor(Date.now() / 1000);
    await createCheckoutSession({
      priceId: "price_book",
      mode: "payment",
      ...BASE,
    });

    const expiresAt = lastSessionParams().expires_at as number;
    expect(expiresAt - before).toBeGreaterThanOrEqual(30 * 60);
    expect(expiresAt - before).toBeLessThanOrEqual(24 * 60 * 60);
  });

  it.each(PAYMENT_MODE_ONLY_PARAMS)(
    "never sends %s on a subscription session",
    async (param) => {
      await createCheckoutSession({
        priceId: "price_inner_circle",
        mode: "subscription",
        ...BASE,
      });

      expect(lastSessionParams()).not.toHaveProperty(param);
    },
  );
});

describe("createCheckoutSession — discounts", () => {
  it("offers the promo code box when no discount is applied", async () => {
    await createCheckoutSession({ priceId: "price_book", mode: "payment", ...BASE });

    const params = lastSessionParams();
    expect(params.allow_promotion_codes).toBe(true);
    expect(params).not.toHaveProperty("discounts");
  });

  it("applies a promotion code and suppresses the box, which Stripe forbids together", async () => {
    await createCheckoutSession({
      priceId: "price_inner_circle",
      mode: "subscription",
      discountPromotionCodeId: "promo_quiz_credit",
      ...BASE,
    });

    const params = lastSessionParams();
    expect(params.discounts).toEqual([{ promotion_code: "promo_quiz_credit" }]);
    expect(params).not.toHaveProperty("allow_promotion_codes");
  });

  it("applies a bare coupon and suppresses the box", async () => {
    await createCheckoutSession({
      priceId: "price_inner_circle",
      mode: "subscription",
      discountCouponId: "referee-reward",
      ...BASE,
    });

    const params = lastSessionParams();
    expect(params.discounts).toEqual([{ coupon: "referee-reward" }]);
    expect(params).not.toHaveProperty("allow_promotion_codes");
  });

  it("prefers the promotion code over a coupon when both are supplied", async () => {
    await createCheckoutSession({
      priceId: "price_inner_circle",
      mode: "subscription",
      discountPromotionCodeId: "promo_quiz_credit",
      discountCouponId: "referee-reward",
      ...BASE,
    });

    expect(lastSessionParams().discounts).toEqual([
      { promotion_code: "promo_quiz_credit" },
    ]);
  });

  it("does not offer a second promo code on the recovered copy of a discounted session", async () => {
    await createCheckoutSession({
      priceId: "price_quiz",
      mode: "payment",
      discountPromotionCodeId: "promo_single_use",
      ...BASE,
    });

    expect(lastSessionParams().after_expiration).toEqual({
      recovery: { enabled: true, allow_promotion_codes: false },
    });
  });
});

describe("createCheckoutSession — customer email", () => {
  it("passes a real email through", async () => {
    await createCheckoutSession({
      priceId: "price_book",
      mode: "payment",
      customerEmail: "reader@example.com",
      ...BASE,
    });

    expect(lastSessionParams().customer_email).toBe("reader@example.com");
  });

  it.each([undefined, ""])(
    "sends undefined rather than %p, which Stripe rejects",
    async (email) => {
      await createCheckoutSession({
        priceId: "price_book",
        mode: "payment",
        customerEmail: email,
        ...BASE,
      });

      expect(lastSessionParams().customer_email).toBeUndefined();
    },
  );
});

describe("createCheckoutSession — the book bundles", () => {
  it("bills the bundle premium today and the membership after the trial", async () => {
    await createCheckoutSession({
      priceId: "price_inner_circle",
      mode: "subscription",
      bundleAddOnPriceId: "price_bundle_1mo",
      trialPeriodDays: 30,
      metadata: { product_key: "BOOK_CONSILIUM_1MO" },
      ...BASE,
    });

    const params = lastSessionParams();
    expect(params.line_items).toEqual([
      { price: "price_inner_circle", quantity: 1 },
      { price: "price_bundle_1mo", quantity: 1 },
    ]);
    expect(params.subscription_data).toEqual({
      trial_period_days: 30,
      metadata: { product_key: "BOOK_CONSILIUM_1MO" },
    });
  });

  it("mirrors metadata onto the subscription so renewals stay attributable", async () => {
    await createCheckoutSession({
      priceId: "price_inner_circle",
      mode: "subscription",
      bundleAddOnPriceId: "price_bundle_3mo",
      trialPeriodDays: 90,
      metadata: { product_key: "BOOK_CONSILIUM_3MO", source: "book-page" },
      ...BASE,
    });

    const subscriptionData = lastSessionParams().subscription_data as {
      metadata: Record<string, string>;
    };
    expect(subscriptionData.metadata).toEqual({
      product_key: "BOOK_CONSILIUM_3MO",
      source: "book-page",
    });
  });

  it("omits subscription_data entirely when there is no trial", async () => {
    await createCheckoutSession({
      priceId: "price_inner_circle",
      mode: "subscription",
      ...BASE,
    });

    expect(lastSessionParams()).not.toHaveProperty("subscription_data");
  });
});
