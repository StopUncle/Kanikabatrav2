import { NextRequest, NextResponse } from "next/server";
import { PrismaUserDatabase } from "@/lib/auth/prisma-database";
import { generateTokenPair } from "@/lib/auth/jwt";
import { LoginCredentials } from "@/lib/auth/types";
import { enforceRateLimit, getClientIp, limits } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

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

    // Generate tokens, embed tokenVersion so password resets and logouts
    // invalidate outstanding tokens immediately.
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      v: user.tokenVersion,
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
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
    // user is signing in cold. Non-blocking.
    prisma.user
      .update({
        where: { id: user.id },
        data: { lastSeenAt: new Date() },
      })
      .catch((err) => console.error("[auth/login] lastSeenAt update failed:", err));

    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
