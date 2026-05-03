/**
 * GET  /api/instincts/handle           current user's handle + profilePublic
 * POST /api/instincts/handle           claim/update handle, set public flag
 *
 * Handle rules: lowercase a-z, 0-9, hyphens. 3-30 chars. Cannot start
 * or end with a hyphen. Reserved words rejected ("admin", "kanika",
 * etc) so members cannot impersonate the platform.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { prisma } from "@/lib/prisma";

const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;

const RESERVED = new Set([
  "admin",
  "api",
  "app",
  "blog",
  "consilium",
  "kanika",
  "kanikabatra",
  "kanika-batra",
  "kanikarose",
  "login",
  "press",
  "register",
  "support",
  "tell",
  "tells",
  "u",
  "user",
  "users",
  "www",
]);

const Body = z.object({
  handle: z.string().min(3).max(30).optional(),
  profilePublic: z.boolean().optional(),
});

export async function GET() {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }
  const me = await prisma.user.findUnique({
    where: { id: ctx.userId },
    select: { handle: true, profilePublic: true },
  });
  return NextResponse.json({
    handle: me?.handle ?? null,
    profilePublic: me?.profilePublic ?? false,
  });
}

export async function POST(request: NextRequest) {
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  // Validate handle if provided.
  if (body.handle !== undefined) {
    const h = body.handle.toLowerCase().trim();
    if (!HANDLE_RE.test(h)) {
      return NextResponse.json(
        {
          error:
            "Handle must be 3-30 characters, lowercase a-z, 0-9, or hyphens. Cannot start or end with a hyphen.",
        },
        { status: 400 },
      );
    }
    if (RESERVED.has(h)) {
      return NextResponse.json(
        { error: "That handle is reserved. Pick another." },
        { status: 400 },
      );
    }
    // Uniqueness check that excludes the current user (so they can
    // re-save their own existing handle without a conflict).
    const taken = await prisma.user.findFirst({
      where: { handle: h, id: { not: ctx.userId } },
      select: { id: true },
    });
    if (taken) {
      return NextResponse.json(
        { error: "That handle is taken." },
        { status: 409 },
      );
    }
    body.handle = h;
  }

  const updated = await prisma.user.update({
    where: { id: ctx.userId },
    data: {
      ...(body.handle !== undefined ? { handle: body.handle } : {}),
      ...(body.profilePublic !== undefined
        ? { profilePublic: body.profilePublic }
        : {}),
    },
    select: { handle: true, profilePublic: true },
  });

  return NextResponse.json(updated);
}
