import { NextRequest, NextResponse } from "next/server";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";

/**
 * Read and write per-category push notification preferences for the
 * authenticated member. Mirrors the lib/push DEFAULT_OPT_IN map: when
 * `pushPreferences` is null in the DB, the helper treats the user as
 * opted in to everything except broadcast.
 *
 * GET  → { preferences: { questionAnswered, voiceNote, forumReply, mention, broadcast } }
 *        Returns the *effective* values (nulls resolved against defaults)
 *        so the UI never has to know about the null-as-default rule.
 *
 * PATCH { preferences: Partial<Record<Category, boolean>> } → { ok: true }
 *        Merges into existing JSON. Partial updates supported, so the
 *        UI can fire one toggle at a time without first reading the
 *        full object back.
 *
 * Auth: 401 if not logged in. No tier-gating (push is a member feature
 * but the preferences endpoint itself is identity-bound, not
 * subscription-bound — we keep the same row available even if a
 * member's subscription lapses, so when they resubscribe their old
 * toggles are still there).
 */

const VALID_CATEGORIES = [
  "questionAnswered",
  "voiceNote",
  "forumReply",
  "mention",
  "broadcast",
] as const;
type Category = (typeof VALID_CATEGORIES)[number];

const DEFAULTS: Record<Category, boolean> = {
  questionAnswered: true,
  voiceNote: true,
  forumReply: true,
  mention: true,
  broadcast: false,
};

function resolveDefaults(
  raw: unknown,
): Record<Category, boolean> {
  const out: Record<Category, boolean> = { ...DEFAULTS };
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    for (const cat of VALID_CATEGORIES) {
      if (cat in obj && typeof obj[cat] === "boolean") {
        out[cat] = obj[cat] as boolean;
      }
    }
  }
  return out;
}

export async function GET() {
  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { pushPreferences: true },
  });
  return NextResponse.json({
    preferences: resolveDefaults(user?.pushPreferences),
  });
}

export async function PATCH(req: NextRequest) {
  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  let body: { preferences?: Partial<Record<string, unknown>> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.preferences || typeof body.preferences !== "object") {
    return NextResponse.json({ error: "missing_preferences" }, { status: 400 });
  }

  // Whitelist + type-check the incoming categories. Anything else is
  // silently dropped — we don't want a stray unknown field landing in
  // the JSON column and surfacing later.
  const incoming: Record<string, boolean> = {};
  for (const cat of VALID_CATEGORIES) {
    if (cat in body.preferences) {
      const v = body.preferences[cat];
      if (typeof v === "boolean") incoming[cat] = v;
    }
  }
  if (Object.keys(incoming).length === 0) {
    return NextResponse.json(
      { error: "no_valid_categories" },
      { status: 400 },
    );
  }

  // Merge with whatever's there (or DEFAULTS if null). Persist the
  // FULL resolved object so future reads don't have to redo the
  // null-as-default math — this means the column shape is the same
  // whether the user has ever toggled or not. Cleaner.
  const current = await prisma.user.findUnique({
    where: { id: userId },
    select: { pushPreferences: true },
  });
  const merged = {
    ...resolveDefaults(current?.pushPreferences),
    ...incoming,
  };

  await prisma.user.update({
    where: { id: userId },
    data: { pushPreferences: merged },
  });

  return NextResponse.json({ ok: true, preferences: merged });
}
