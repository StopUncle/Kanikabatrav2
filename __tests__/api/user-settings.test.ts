/**
 * The write half of the re-subscribe bug.
 *
 * PUT /api/user/settings replaced `emailPreferences` wholesale with
 * whatever the client posted, with no key validation. Any client that knew
 * fewer keys than the server deleted the rest, and since every gate reads
 * an absent key as opted-IN, deleting a key put the user back on the list.
 *
 * The endpoint now merges over what is stored and whitelists to the known
 * keys. These tests hold that contract at the HTTP boundary, because the
 * pure-function tests in email-preferences.test.ts cannot see a route that
 * stops calling the helper.
 */

import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findUnique: jest.fn(), update: jest.fn() },
  },
}));

jest.mock("@/lib/auth/resolve-user", () => ({
  resolveActiveUserId: jest.fn(),
  resolveActiveUserIdFromRequest: jest.fn(),
}));

jest.mock("@/lib/logger", () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

import { prisma } from "@/lib/prisma";
import {
  resolveActiveUserId,
  resolveActiveUserIdFromRequest,
} from "@/lib/auth/resolve-user";
import { GET, PUT } from "@/app/api/user/settings/route";

const mockPrisma = prisma as unknown as {
  user: { findUnique: jest.Mock; update: jest.Mock };
};
const mockResolve = resolveActiveUserId as jest.Mock;
const mockResolveFromRequest = resolveActiveUserIdFromRequest as jest.Mock;

const USER_ID = "user_1";

/**
 * The handler reads exactly two things off the request: `json()`, and its
 * identity via the mocked `resolveActiveUserIdFromRequest`. A real
 * NextRequest cannot be constructed here anyway, because jest.setup.ts
 * installs its own Request stub whose url is a plain assignment and
 * NextRequest's is a getter.
 */
function put(body: unknown): NextRequest {
  return {
    json: async () => JSON.parse(JSON.stringify(body)),
  } as unknown as NextRequest;
}

/** The object actually written to the column on the last update call. */
function written(): Record<string, boolean> {
  return mockPrisma.user.update.mock.calls.at(-1)?.[0].data.emailPreferences;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockResolve.mockResolvedValue(USER_ID);
  mockResolveFromRequest.mockResolvedValue(USER_ID);
  mockPrisma.user.update.mockResolvedValue({});
});

describe("PUT merges rather than replaces", () => {
  it("keeps a key the client never sent", async () => {
    // THE BUG, at the boundary. A four-key client saves; the fifth
    // switch must survive at the value the user chose.
    mockPrisma.user.findUnique.mockResolvedValue({
      emailPreferences: { questionAnswered: false, marketing: true },
    });

    const res = await PUT(
      put({
        emailPreferences: {
          marketing: true,
          productUpdates: true,
          sessionReminders: true,
          weeklyDigest: true,
        },
      }),
    );

    expect(res.status).toBe(200);
    expect(written().questionAnswered).toBe(false);
  });

  it("applies a single-key patch without disturbing the others", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      emailPreferences: {
        marketing: true,
        productUpdates: false,
        sessionReminders: false,
        weeklyDigest: false,
        questionAnswered: false,
      },
    });

    await PUT(put({ emailPreferences: { marketing: false } }));

    expect(written()).toEqual({
      marketing: false,
      productUpdates: false,
      sessionReminders: false,
      weeklyDigest: false,
      questionAnswered: false,
    });
  });

  it("writes all five keys every time, so absence stops recurring", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ emailPreferences: null });
    await PUT(put({ emailPreferences: { marketing: false } }));
    expect(Object.keys(written()).sort()).toEqual([
      "marketing",
      "productUpdates",
      "questionAnswered",
      "sessionReminders",
      "weeklyDigest",
    ]);
  });

  it("refuses to persist unknown keys", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ emailPreferences: {} });
    await PUT(
      put({ emailPreferences: { marketing: false, isAdmin: true, evil: 1 } }),
    );
    expect(written()).not.toHaveProperty("isAdmin");
    expect(written()).not.toHaveProperty("evil");
  });

  it("echoes the stored result so the client settles on the truth", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ emailPreferences: {} });
    const res = await PUT(put({ emailPreferences: { marketing: false } }));
    const body = await res.json();
    expect(body.emailPreferences.marketing).toBe(false);
    expect(body.emailPreferences.questionAnswered).toBe(true);
  });
});

describe("PUT input handling", () => {
  it("rejects a missing or non-object payload", async () => {
    for (const payload of [
      {},
      { emailPreferences: null },
      { emailPreferences: "marketing" },
      { emailPreferences: [] },
    ]) {
      const res = await PUT(put(payload));
      expect(res.status).toBe(400);
    }
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });

  it("401s an unauthenticated caller and writes nothing", async () => {
    mockResolveFromRequest.mockResolvedValue(null);
    const res = await PUT(put({ emailPreferences: { marketing: false } }));
    expect(res.status).toBe(401);
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });

  it("404s when the session points at a user that is gone", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    const res = await PUT(put({ emailPreferences: { marketing: false } }));
    expect(res.status).toBe(404);
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });
});

describe("GET", () => {
  it("returns all five keys even when nothing was ever saved", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ emailPreferences: null });
    const res = await GET();
    const body = await res.json();
    expect(Object.keys(body.emailPreferences).sort()).toEqual([
      "marketing",
      "productUpdates",
      "questionAnswered",
      "sessionReminders",
      "weeklyDigest",
    ]);
  });

  it("fills in the missing keys of a partial stored row", async () => {
    // Exactly the shape the old modal left behind in production.
    mockPrisma.user.findUnique.mockResolvedValue({
      emailPreferences: { marketing: false },
    });
    const res = await GET();
    const body = await res.json();
    expect(body.emailPreferences.marketing).toBe(false);
    expect(body.emailPreferences.questionAnswered).toBe(true);
  });

  it("401s an unauthenticated caller", async () => {
    mockResolve.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });
});
