import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import {
  computeFingerprint,
  resolveFingerprintFromUsers,
} from "@/lib/community/fingerprint";

/**
 * Admin-only: reverse-lookup a Consilium SID fingerprint to a user.
 *
 * Given a leaked 8-char hex code from an external screen recording, returns
 * the owning userId + enough identity fields for the admin to ban the
 * correct account.
 *
 * POST body:   { fingerprint: "a1b2c3d4" }
 * Response:    { match: { id, email, name, displayName, isBanned, role } }
 *              or { match: null } if no user matched.
 */
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let payload: { fingerprint?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw = (payload.fingerprint ?? "").trim().toLowerCase();
  if (!/^[0-9a-f]{8}$/.test(raw)) {
    return NextResponse.json(
      { error: "Fingerprint must be 8 lowercase hex characters" },
      { status: 400 },
    );
  }

  // Pull every userId and brute-force the match. At low-hundreds scale this
  // is ~1ms; at 100k users it would be ~100ms — still fine for an admin
  // tool. When the member count grows past that, switch to a pre-computed
  // index table.
  const users = await prisma.user.findMany({
    select: { id: true },
  });
  const matchedId = resolveFingerprintFromUsers(
    raw,
    users.map((u) => u.id),
  );

  if (!matchedId) {
    return NextResponse.json({ match: null });
  }

  const matched = await prisma.user.findUnique({
    where: { id: matchedId },
    select: {
      id: true,
      email: true,
      name: true,
      displayName: true,
      role: true,
      isBanned: true,
      banReason: true,
      createdAt: true,
      communityMembership: {
        select: { status: true, billingCycle: true, activatedAt: true },
      },
    },
  });

  return NextResponse.json({
    match: matched
      ? { ...matched, fingerprint: computeFingerprint(matched.id) }
      : null,
  });
}
