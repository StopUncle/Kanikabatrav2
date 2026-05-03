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

// Reserved handles. Two categories worth keeping separate:
// 1. Route segments (anything that maps to a top-level path on this app)
//    so a profile URL can never shadow a real route.
// 2. Brand + impersonation guard (Kanika's name, the platform name,
//    moderator/admin variants).
// Keep this list in sync with the Next.js app/ tree as new routes ship.
const RESERVED = new Set([
  // Routes / app surface
  "_next",
  "about",
  "admin",
  "api",
  "app",
  "auth",
  "blog",
  "book",
  "cancel",
  "checkout",
  "coaching",
  "community",
  "consilium",
  "contact",
  "dashboard",
  "download",
  "favicon.ico",
  "forum",
  "help",
  "instincts",
  "login",
  "logout",
  "manifest",
  "manifest.webmanifest",
  "media",
  "members",
  "press",
  "privacy",
  "profile",
  "public",
  "quiz",
  "receipts",
  "register",
  "robots.txt",
  "settings",
  "signin",
  "signout",
  "signup",
  "sitemap.xml",
  "static",
  "success",
  "support",
  "tell",
  "tells",
  "terms",
  "u",
  "user",
  "users",
  "webhooks",
  "www",
  // Brand + impersonation guard
  "anonymous",
  "guest",
  "kanika",
  "kanika-batra",
  "kanikabatra",
  "kanikarose",
  "kbatra",
  "mod",
  "moderator",
  "official",
  "owner",
  "root",
  "staff",
  "system",
  "team",
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
    // Reserved + already-taken collapse into a single "unavailable"
    // error with status 409 so the client cannot enumerate which list a
    // handle is on. The message is the same in both cases.
    if (RESERVED.has(h)) {
      return NextResponse.json(
        { error: "Handle unavailable. Pick another." },
        { status: 409 },
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
        { error: "Handle unavailable. Pick another." },
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
