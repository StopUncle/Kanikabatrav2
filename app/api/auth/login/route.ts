import { NextRequest, NextResponse } from "next/server";
import { markSeen } from "@/lib/analytics/seen";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { PrismaUserDatabase } from "@/lib/auth/prisma-database";
import { generateTokenPair } from "@/lib/auth/jwt";
import { LoginCredentials } from "@/lib/auth/types";
import { enforceRateLimit, getClientIp, limits } from "@/lib/rate-limit";
import { checkMembership } from "@/lib/community/membership";
import { claimGuestPurchases } from "@/lib/purchases/claim";

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP BEFORE parsing the body, denies brute-force floods
    // without doing any real work.
    const ip = getClientIp(request);
    const rateLimited = await enforceRateLimit(limits.authLogin, ip);
    if (rateLimited) return rateLimited;

    const body: LoginCredentials = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Normalize email, register stores lowercase, so login must lowercase
    // too or `User@Example.com` will fail to find the account.
    const normalizedEmail = body.email.toLowerCase().trim();

    // Validate user credentials
    const user = await PrismaUserDatabase.validateUser(
      normalizedEmail,
      body.password,
    );
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Refuse a banned account here, at the door, and say so.
    // Without this the password check passes, a fresh cookie pair is
    // issued, and the ban is only enforced on the next page render
    // (lib/auth/server-auth.ts), which bounces them to /login?banned=1.
    // Nothing reads that param, so the user saw a working sign-in
    // followed by an unexplained ejection, forever.
    if (user.isBanned) {
      return NextResponse.json(
        {
          error:
            user.banReason?.trim() ||
            "This account has been suspended. Reply to any email from us if you think that is a mistake.",
        },
        { status: 403 },
      );
    }

    // Generate tokens, embed tokenVersion so password resets and logouts
    // invalidate outstanding tokens immediately.
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      v: user.tokenVersion,
    });

    // Membership state rides along so the login form can land ACTIVE
    // members in the Chamber (the member home) instead of the dashboard.
    // checkMembership, not a raw status read: it counts a cancelled
    // membership still inside its paid period as a member, and an ACTIVE
    // row past its expiry as not one, matching what /consilium enforces.
    const membershipCheck = await checkMembership(user.id);

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      isActiveMember: membershipCheck.isMember,
    });

    // Set cookies
    response.cookies.set("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Stamp lastSeenAt at login. The refresh route keeps it fresh
    // every ~15min while a session is active; login covers the
    // long-dormancy case where refresh tokens have expired and the
    // user is signing in cold. Non-blocking. markSeen also notices the
    // first return on or after day 7 and reports it once.
    void markSeen(user.id);
    captureServerAsync(user.id, ANALYTICS_EVENTS.LOGIN);

    // Sweep up guest purchases made under this email while signed out.
    // Idempotent, only touches rows with no userId yet.
    void claimGuestPurchases(user.id, user.email);

    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
