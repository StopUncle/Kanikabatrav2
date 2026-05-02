/**
 * GET /api/tells/today
 *
 * Returns today's main Tell plus up to two bonus Tells (the
 * non-completed Tells published before today).
 *
 * Anonymous-friendly. If the visitor has no anon cookie yet, one is
 * minted and set on the response.
 *
 * Falls back to the seed pool if no PUBLISHED Tells exist yet (the
 * first deploy state).
 */

import { NextResponse } from "next/server";
import {
  resolveTellContext,
  setAnonCookie,
} from "@/lib/tells/auth-context";
import { getBonusTells, getTodaysTellRow } from "@/lib/tells/db";
import { getTodaysTell as getTodaysSeed } from "@/lib/tells/seed-tells";

export async function GET() {
  const ctx = await resolveTellContext();

  let main = await getTodaysTellRow();
  let usedSeed = false;
  if (!main) {
    main = getTodaysSeed();
    usedSeed = true;
  }

  const bonus = usedSeed
    ? []
    : await getBonusTells({
        excludeId: main.id,
        excludeUserId: ctx.userId,
        excludeAnonId: ctx.userId ? null : ctx.anonId,
        limit: 2,
      });

  const res = NextResponse.json({
    main,
    bonus,
    usedSeed,
    isAuth: ctx.userId !== null,
  });

  if (ctx.anonIdMinted) setAnonCookie(res, ctx.anonId);
  return res;
}
