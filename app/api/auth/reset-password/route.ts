import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { enforceRateLimit, getClientIp, limits } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL: JWT_SECRET environment variable is required in production",
      );
    }
    return "dev-only-secret-do-not-use-in-production";
  }
  return secret;
}

interface ResetTokenPayload {
  userId: string;
  type: string;
  v?: number; // tokenVersion at issue time, used to invalidate after reset
  iat: number;
  exp: number;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit before any work: every request carrying a valid token
    // reaches bcrypt at cost 12, so this bounds both token guessing and
    // the CPU a single leaked link can burn.
    const rateLimited = await enforceRateLimit(
      limits.authReset,
      getClientIp(request),
    );
    if (rateLimited) return rateLimited;

    const body = await request.json();
    const { token, password } = body as { token: string; password: string };

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    let payload: ResetTokenPayload;
    try {
      // Pin the algorithm so `none`/asymmetric-swap attacks can't forge
      // a reset token. Reset tokens are signed with HS256 in the
      // webhook + forgot-password routes.
      payload = jwt.verify(token, getJwtSecret(), {
        algorithms: ["HS256"],
      }) as ResetTokenPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired reset link" },
        { status: 400 },
      );
    }

    if (payload.type !== "password-reset") {
      return NextResponse.json(
        { error: "Invalid reset token" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, tokenVersion: true },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    // Single-use check: if the token was issued against an older
    // tokenVersion, it's been used already (or superseded by a later reset).
    // Legacy tokens with no `v` field are rejected to force a fresh request.
    //
    // The wording stays vague about WHICH of those happened on purpose,
    // because tokenVersion is also bumped by signing out: a user who
    // requests a reset and then logs out of a stale session elsewhere
    // invalidates their own unused link, and telling them it was "already
    // used" sends them hunting for an intruder. Making the link genuinely
    // single-use without this side effect needs its own id persisted per
    // token, which is a schema change; until then, say less.
    if (payload.v === undefined || payload.v !== user.tokenVersion) {
      return NextResponse.json(
        {
          error:
            "This reset link is no longer valid. Signing out or resetting again cancels an older link. Request a new one.",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);
    // Atomically update the password AND increment tokenVersion so the
    // current token (and any other outstanding ones for this user) can't be
    // reused.
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        tokenVersion: { increment: 1 },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error: unknown) {
    logger.error("[reset-password] error", error as Error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
