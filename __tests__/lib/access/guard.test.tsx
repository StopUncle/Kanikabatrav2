import { memberGate } from "@/lib/access/guard";
import { getAccess } from "@/lib/access/tier";

jest.mock("@/lib/access/tier", () => ({
  ...jest.requireActual("@/lib/access/tier"),
  getAccess: jest.fn(),
}));

// The wall is a client component that reaches for posthog and the checkout
// route on mount. memberGate only ever constructs the element, so a stub is
// enough and keeps this test about the decision, not the rendering.
jest.mock("@/components/app-shell/upgrade/UpgradeWall", () => ({
  __esModule: true,
  default: function StubWall() {
    return null;
  },
}));

const mockAccess = getAccess as jest.MockedFunction<typeof getAccess>;

function access(over: Partial<Awaited<ReturnType<typeof getAccess>>> = {}) {
  return {
    tier: "free" as const,
    userId: "u1",
    isMember: false,
    isBanned: false,
    status: null,
    membership: null,
    reason: null,
    ...over,
  };
}

beforeEach(() => jest.clearAllMocks());

describe("memberGate", () => {
  it("lets a live member through", async () => {
    mockAccess.mockResolvedValue(access({ tier: "member", isMember: true, status: "ACTIVE" }));

    expect(await memberGate("u1")).toBeNull();
  });

  it("walls a free account", async () => {
    mockAccess.mockResolvedValue(access());

    expect(await memberGate("u1")).not.toBeNull();
  });

  it("walls a banned account even when the membership is live", async () => {
    // A ban must beat a paid membership, otherwise the wall becomes the only
    // thing standing between a banned member and the surfaces they were
    // banned from.
    mockAccess.mockResolvedValue(
      access({ tier: "member", isMember: true, isBanned: true, status: "ACTIVE" }),
    );

    expect(await memberGate("u1")).not.toBeNull();
  });

  it("passes the caller's trigger and return href to the wall", async () => {
    mockAccess.mockResolvedValue(access());

    const gate = (await memberGate("u1", {
      trigger: "standing-frozen",
      returnHref: "/app/feed",
    })) as React.ReactElement;

    expect(gate.props).toMatchObject({
      trigger: "standing-frozen",
      returnHref: "/app/feed",
    });
  });

  it("defaults the return href into the app, never to /consilium", async () => {
    // Bouncing a free account to the sales page is the behaviour the free
    // tier replaced. The wall must hand them back to a surface they still own.
    mockAccess.mockResolvedValue(access());

    const gate = (await memberGate("u1")) as React.ReactElement;

    expect(gate.props.returnHref).toBe("/app");
  });
});
