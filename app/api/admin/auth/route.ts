import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { logger } from "@/lib/logger";
import { enforceRateLimit, getClientIp, limits } from "@/lib/rate-limit";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL: JWT_SECRET is required in production");
    }
    return "dev-only-secret-do-not-use-in-production";
  }
  return secret;
}

export async function POST(request: NextRequest) {
  try {
    // The 6-digit PIN is trivially brute-forceable (1M combinations) without
    // rate limiting. 5 attempts per hour per IP turns that into a realistic
    // 22,800-year timeline for a single IP. Attackers using distributed IPs
    // are a separate problem; this is the floor.
    const ip = getClientIp(request);
    const rateLimited = await enforceRateLimit(limits.adminPin, ip);
    if (rateLimited) {
      logger.warn("[admin-auth] rate limit hit", { ip });
      return rateLimited;
    }

    const { pin } = await request.json();

    if (!pin || typeof pin !== "string" || pin.length !== 6) {
      return NextResponse.json(
        { error: "Invalid code format" },
        { status: 400 },
      );
    }

    // Resolve the correct PIN.
    //
    // Production: must come from the ADMIN_PIN env var. If it's unset we
    // refuse to authenticate, returning 503 rather than silently falling
    // back to a default prevents a missing env var from accidentally
    // turning a predictable PIN into the admin password.
    //
    // Development: a missing ADMIN_PIN falls back to "000000" so local
    // work doesn't require env plumbing. This is gated strictly on
    // NODE_ENV !== "production" so the dev default can never leak to
    // the live site regardless of how the code is deployed.
    let correctPin = process.env.ADMIN_PIN;
    if (!correctPin) {
      if (process.env.NODE_ENV === "production") {
        console.error("CRITICAL: ADMIN_PIN environment variable not set in production");
        return NextResponse.json(
          { error: "Authentication is unavailable" },
          { status: 503 },
        );
      }
      console.warn("ADMIN_PIN not set, using dev default 000000");
      correctPin = "000000";
    }

    if (correctPin.length !== 6) {
      console.error("ADMIN_PIN must be exactly 6 digits");
      return NextResponse.json(
        { error: "Authentication is misconfigured" },
        { status: 503 },
      );
    }

    const isValid = crypto.timingSafeEqual(
      Buffer.from(pin),
      Buffer.from(correctPin),
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid code" }, { status: 401 });
    }

    const sessionToken = jwt.sign(
      { role: "admin", iat: Math.floor(Date.now() / 1000) },
      getJwtSecret(),
      { expiresIn: "24h" },
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    // Was an empty catch, admin would get locked out with no clue why.
    // Now logged so JWT misconfig / crypto errors / JSON parse issues
    // surface in the server logs.
    logger.error("[admin-auth] PIN authentication failed", error as Error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
