import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaUserDatabase } from "@/lib/auth/prisma-database";
import { hashPassword } from "@/lib/auth/password";

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
  iat: number;
  exp: number;
}

export async function POST(request: NextRequest) {
  try {
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
      payload = jwt.verify(token, getJwtSecret()) as ResetTokenPayload;
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

    const user = await PrismaUserDatabase.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    const hashedPassword = await hashPassword(password);
    await PrismaUserDatabase.updateUser(user.id, {
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
