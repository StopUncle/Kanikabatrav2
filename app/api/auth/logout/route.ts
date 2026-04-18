import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Bump tokenVersion server-side so ALL outstanding tokens (access +
    // refresh) for this user become invalid immediately. Without this,
    // a stolen token captured before logout stays valid for up to 7 days.
    const refreshToken = request.cookies.get("refreshToken")?.value;
    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken);
        await prisma.user.update({
          where: { id: payload.userId },
          data: { tokenVersion: { increment: 1 } },
        });
      } catch {
        // Token already expired/invalid — clearing cookies is sufficient
      }
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
