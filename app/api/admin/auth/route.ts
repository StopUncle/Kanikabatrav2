import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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
    const { pin } = await request.json();

    if (!pin || typeof pin !== "string" || pin.length !== 6) {
      return NextResponse.json(
        { error: "Invalid code format" },
        { status: 400 },
      );
    }

    const correctPin = process.env.ADMIN_PIN || "000000";

    const isValid = crypto.timingSafeEqual(
      Buffer.from(pin.padEnd(6, "0")),
      Buffer.from(correctPin.padEnd(6, "0")),
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
  } catch {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
