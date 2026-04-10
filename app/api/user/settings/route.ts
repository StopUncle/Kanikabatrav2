import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";

// Defaults applied when a user has never saved their preferences. The
// weekly digest is opt-OUT (default true) — active members are auto-
// enrolled when the cron lands, and can opt out from settings or via the
// one-click unsubscribe link in the digest email itself.
const DEFAULT_PREFERENCES = {
  marketing: true,
  productUpdates: true,
  sessionReminders: true,
  weeklyDigest: true,
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload;
    try {
      payload = verifyAccessToken(accessToken);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const rawPreferences = (user as Record<string, unknown>).emailPreferences;
    const emailPreferences = rawPreferences
      ? typeof rawPreferences === "string"
        ? JSON.parse(rawPreferences)
        : rawPreferences
      : DEFAULT_PREFERENCES;

    return NextResponse.json({ emailPreferences });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload;
    try {
      payload = verifyAccessToken(accessToken);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { emailPreferences } = body;

    if (!emailPreferences || typeof emailPreferences !== "object") {
      return NextResponse.json(
        { error: "Invalid preferences" },
        { status: 400 },
      );
    }

    await prisma.$executeRaw`
      UPDATE "User"
      SET "emailPreferences" = ${JSON.stringify(emailPreferences)}::jsonb,
          "updatedAt" = NOW()
      WHERE id = ${payload.userId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
