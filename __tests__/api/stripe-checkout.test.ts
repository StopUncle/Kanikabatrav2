import { POST } from "@/app/api/stripe/checkout/route";
import { createCheckoutSession } from "@/lib/stripe";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

jest.mock("@/lib/stripe", () => ({
  ...jest.requireActual("@/lib/stripe"),
  createCheckoutSession: jest.fn(),
}));

jest.mock("@/lib/auth/server-auth", () => ({
  optionalServerAuth: jest.fn(),
}));

jest.mock("@/lib/community/membership", () => ({
  checkMembership: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("@/lib/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

const mockCreateCheckoutSession = createCheckoutSession as jest.MockedFunction<
  typeof createCheckoutSession
>;
const mockOptionalServerAuth = optionalServerAuth as jest.MockedFunction<
  typeof optionalServerAuth
>;
const mockCheckMembership = checkMembership as jest.MockedFunction<
  typeof checkMembership
>;
const mockPrismaUserFindUnique = prisma.user.findUnique as jest.MockedFunction<
  typeof prisma.user.findUnique
>;

function createRequest(bodyObj: any) {
  const req = new Request("http://localhost/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObj),
  });
  return req as any;
}

describe("POST /api/stripe/checkout - Book & Product Checkout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOptionalServerAuth.mockResolvedValue(null);
    mockCreateCheckoutSession.mockResolvedValue({
      id: "cs_test_123",
      url: "https://checkout.stripe.com/pay/cs_test_123",
    } as any);
  });

  it("returns 400 for an invalid product key", async () => {
    const req = createRequest({ priceKey: "INVALID_PRODUCT" });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid product");
  });

  it("returns 400 when attempting to purchase INNER_CIRCLE directly", async () => {
    const req = createRequest({ priceKey: "INNER_CIRCLE" });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Membership checkout requires an approved application");
  });

  it("returns 400 when attempting to directly supply server-only BOOK_MEMBER key", async () => {
    const req = createRequest({ priceKey: "BOOK_MEMBER" });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid product");
  });

  it("creates a checkout session for standalone BOOK purchase at $24.99 for non-members", async () => {
    const req = createRequest({ priceKey: "BOOK", email: "reader@example.com" });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.sessionId).toBe("cs_test_123");
    expect(data.checkoutUrl).toBe("https://checkout.stripe.com/pay/cs_test_123");
    expect(data.memberDiscountApplied).toBe(false);

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        priceId: "price_1TJufzJv9vx5CHTwnijydfaY",
        mode: "payment",
        customerEmail: "reader@example.com",
        metadata: expect.objectContaining({
          product_key: "BOOK",
          member_discount: "false",
        }),
      }),
    );
  });

  it("swaps priceKey to BOOK_MEMBER ($9.99) when user is an active Consilium member", async () => {
    mockOptionalServerAuth.mockResolvedValue("user_member_1");
    mockCheckMembership.mockResolvedValue({
      isMember: true,
      status: "ACTIVE",
      membership: { id: "m1", status: "ACTIVE" } as any,
    });
    mockPrismaUserFindUnique.mockResolvedValue({
      id: "user_member_1",
      email: "member@example.com",
    } as any);

    const req = createRequest({ priceKey: "BOOK" });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.memberDiscountApplied).toBe(true);

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        priceId: "price_1TNS57Jv9vx5CHTw3Miq2KmS",
        mode: "payment",
        customerEmail: "member@example.com",
        metadata: expect.objectContaining({
          product_key: "BOOK",
          member_discount: "true",
        }),
      }),
    );
  });

  it("creates a subscription-mode session for BOOK_CONSILIUM_1MO bundle", async () => {
    const req = createRequest({ priceKey: "BOOK_CONSILIUM_1MO" });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        priceId: "price_1TJug1Jv9vx5CHTwjPYeSm7E", // INNER_CIRCLE
        bundleAddOnPriceId: "price_1TMpaDJv9vx5CHTwGzAnGrMz", // BOOK_CONSILIUM_1MO
        mode: "subscription",
        trialPeriodDays: 30,
        metadata: expect.objectContaining({
          product_key: "BOOK_CONSILIUM_1MO",
        }),
      }),
    );
  });

  it("creates a subscription-mode session for BOOK_CONSILIUM_3MO bundle", async () => {
    const req = createRequest({ priceKey: "BOOK_CONSILIUM_3MO" });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        priceId: "price_1TJug1Jv9vx5CHTwjPYeSm7E", // INNER_CIRCLE
        bundleAddOnPriceId: "price_1TMpaEJv9vx5CHTwfYMIfOik", // BOOK_CONSILIUM_3MO
        mode: "subscription",
        trialPeriodDays: 90,
        metadata: expect.objectContaining({
          product_key: "BOOK_CONSILIUM_3MO",
        }),
      }),
    );
  });
});

/**
 * The outage was not only a bad parameter, it was a bad parameter nobody was
 * told about. Sentry's automatic instrumentation only reports errors that
 * escape a route handler, and this handler catches its own, so the failure
 * reached Railway logs and stopped there. These tests hold the alarm wire in
 * place: a Stripe failure must go through `logger.error`, which forwards to
 * Sentry, and must carry enough context to name the dead product.
 */
describe("POST /api/stripe/checkout - failures are alertable", () => {
  const mockLoggerError = logger.error as jest.MockedFunction<typeof logger.error>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOptionalServerAuth.mockResolvedValue(null);
  });

  it("reports a Stripe failure to the Sentry-backed logger", async () => {
    mockCreateCheckoutSession.mockRejectedValue(
      new Error("consent_collection.promotions is not available in your country"),
    );

    const res = await POST(createRequest({ priceKey: "BOOK" }));

    expect(res.status).toBe(500);
    expect(mockLoggerError).toHaveBeenCalledTimes(1);

    const [message, error] = mockLoggerError.mock.calls[0];
    expect(message).toMatch(/checkout/i);
    expect((error as Error).message).toContain("consent_collection");
  });

  it("names the failing product so an alert is actionable without a repro", async () => {
    mockCreateCheckoutSession.mockRejectedValue(new Error("Stripe is down"));

    await POST(createRequest({ priceKey: "COACHING_INTENSIVE" }));

    const context = mockLoggerError.mock.calls[0][2] as Record<string, unknown>;
    expect(context).toMatchObject({
      priceKey: "COACHING_INTENSIVE",
      resolvedPriceKey: "COACHING_INTENSIVE",
      mode: "payment",
    });
  });

  it("still hides the Stripe error text from the customer", async () => {
    mockCreateCheckoutSession.mockRejectedValue(
      new Error("No such price: price_1TJufzJv9vx5CHTwnijydfaY"),
    );

    const res = await POST(createRequest({ priceKey: "BOOK" }));
    const data = await res.json();

    expect(data.error).toBe("Failed to create checkout session");
    expect(JSON.stringify(data)).not.toContain("price_1TJufz");
  });

  it("does not fire the alarm for an ordinary bad request", async () => {
    const res = await POST(createRequest({ priceKey: "NOT_A_PRODUCT" }));

    expect(res.status).toBe(400);
    expect(mockLoggerError).not.toHaveBeenCalled();
  });
});
