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
  "dailyTell",
] as const;
type Category = (typeof VALID_CATEGORIES)[number];

const DEFAULTS: Record<Category, boolean> = {
  questionAnswered: true,
  voiceNote: true,
  forumReply: true,
  mention: true,
  broadcast: false,
  dailyTell: false,
};

const DEFAULT_DAILY_TELL_HOUR = 8; // 8am local default if user enables without picking

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

/** Pull dailyTellHour from the JSON, defaulting if missing or invalid. */
function resolveDailyTellHour(raw: unknown): number {
  if (raw && typeof raw === "object") {
    const v = (raw as Record<string, unknown>).dailyTellHour;
    if (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 23) {
      return v;
    }
  }
  return DEFAULT_DAILY_TELL_HOUR;
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
    dailyTellHour: resolveDailyTellHour(user?.pushPreferences),
  });
}

/** Parse + validate the incoming PATCH body. Returns either a valid
 *  payload or an error response keyed for the caller to short-circuit on. */
function parsePatchBody(body: unknown):
  | {
      ok: true;
      categoryUpdates: Record<string, boolean>;
      hourUpdate: number | undefined;
    }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid_body" };
  }
  const b = body as {
    preferences?: Partial<Record<string, unknown>>;
    dailyTellHour?: unknown;
  };

  // dailyTellHour: optional, but if present must be 0-23 integer.
  let hourUpdate: number | undefined;
  if (b.dailyTellHour !== undefined) {
    const h = b.dailyTellHour;
    const valid =
      typeof h === "number" && Number.isInteger(h) && h >= 0 && h <= 23;
    if (!valid) return { ok: false, error: "invalid_hour" };
    hourUpdate = h as number;
  }

  // categoryUpdates: whitelist incoming categories, drop unknowns silently.
  const categoryUpdates: Record<string, boolean> = {};
  if (b.preferences && typeof b.preferences === "object") {
    for (const cat of VALID_CATEGORIES) {
      if (cat in b.preferences) {
        const v = b.preferences[cat];
        if (typeof v === "boolean") categoryUpdates[cat] = v;
      }
    }
  }

  if (Object.keys(categoryUpdates).length === 0 && hourUpdate === undefined) {
    return { ok: false, error: "no_valid_fields" };
  }

  return { ok: true, categoryUpdates, hourUpdate };
}

export async function PATCH(req: NextRequest) {
  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parsePatchBody(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  // Merge with whatever's there (or DEFAULTS if null). Persist the
  // FULL resolved object so future reads don't have to redo the
  // null-as-default math — column shape is the same whether the user
  // has ever toggled or not.
  const current = await prisma.user.findUnique({
    where: { id: userId },
    select: { pushPreferences: true },
  });
  const merged = {
    ...resolveDefaults(current?.pushPreferences),
    ...parsed.categoryUpdates,
    dailyTellHour:
      parsed.hourUpdate ?? resolveDailyTellHour(current?.pushPreferences),
  };

  await prisma.user.update({
    where: { id: userId },
    data: { pushPreferences: merged },
  });

  return NextResponse.json({
    ok: true,
    preferences: resolveDefaults(merged),
    dailyTellHour: merged.dailyTellHour,
  });
}
