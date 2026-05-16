import { NextRequest, NextResponse } from "next/server";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth/jwt";
import { PrismaUserDatabase } from "@/lib/auth/prisma-database";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 },
      );
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 },
      );
    }

    const user = await PrismaUserDatabase.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Reject tokens signed before the last password reset or logout.
    if (payload.v !== undefined && payload.v !== user.tokenVersion) {
      return NextResponse.json(
        { error: "Token has been revoked" },
        { status: 401 },
      );
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      v: user.tokenVersion,
    };

    // Rotate: issue BOTH a new access token AND a new refresh token.
    // The old refresh token is still cryptographically valid until its
    // TTL expires, but the tokenVersion check above prevents replaying
    // it after a logout or password change.
    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    const response = NextResponse.json({ success: true });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // Best-effort lastSeenAt stamp. Fires every ~15min for any
    // active session (accessToken TTL), making this the most
    // reliable activity signal we have for the dormant-member cron.
    // Non-blocking, a DB hiccup here must not fail the refresh.
    prisma.user
      .update({
        where: { id: user.id },
        data: { lastSeenAt: new Date() },
      })
      .catch((err) => console.error("[auth/refresh] lastSeenAt update failed:", err));

    return response;
  } catch (error: unknown) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
