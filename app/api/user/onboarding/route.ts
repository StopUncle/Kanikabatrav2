import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { z } from "zod";

/**
 * Marks the current user's Consilium onboarding tour as seen, and
 * optionally captures the gender + displayName fields the application
 * form used to collect. After the application gate was removed
 * (2026-04-19), these fields are captured by the welcome modal on
 * first feed visit instead.
 *
 * Idempotent. Bare POST with no body still works for legacy callers —
 * the body fields are all optional.
 */
const Body = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, "At least 2 characters")
      .max(30, "Keep it under 30 characters")
      .regex(
        /^[a-zA-Z0-9_.\- ]+$/,
        "Letters, numbers, spaces, hyphens, underscores",
      )
      .optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
  })
  .partial();

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    let parsed: z.infer<typeof Body> = {};
    try {
      const text = await req.text();
      if (text.trim().length > 0) {
        const result = Body.safeParse(JSON.parse(text));
        if (!result.success) {
          return NextResponse.json(
            { error: "Invalid input", detail: result.error.flatten() },
            { status: 400 },
          );
        }
        parsed = result.data;
      }
    } catch {
      // Bad JSON — tolerate. The timestamp still updates.
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        onboardingSeenAt: new Date(),
        ...(parsed.displayName ? { displayName: parsed.displayName } : {}),
        ...(parsed.gender ? { gender: parsed.gender } : {}),
      },
    });

    return NextResponse.json({ success: true });
  });
}
