import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Centralised admin authentication for API routes.
 *
 * BACKGROUND: Earlier code authenticated admin endpoints with an
 * `x-admin-secret` header populated from `NEXT_PUBLIC_ADMIN_SECRET` —
 * which Next.js inlines into the client bundle. That meant any visitor
 * could extract the secret from devtools and call admin endpoints. This
 * helper replaces that pattern with the existing httpOnly `admin_session`
 * cookie set by `/api/admin/auth/route.ts` after PIN login.
 *
 * Usage:
 *
 *   export async function POST(request: NextRequest) {
 *     const unauthorized = await requireAdminSession();
 *     if (unauthorized) return unauthorized;
 *     // ...handler logic
 *   }
 *
 * Returns `null` on success (caller proceeds) or a 401 NextResponse on
 * failure (caller short-circuits).
 */

interface AdminSessionPayload {
  role: string;
  iat: number;
}

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

export async function requireAdminSession(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized — admin session required" },
      { status: 401 },
    );
  }

  try {
    const payload = jwt.verify(token, getJwtSecret()) as AdminSessionPayload;
    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized — admin role required" },
        { status: 401 },
      );
    }
    return null;
  } catch {
    return NextResponse.json(
      { error: "Unauthorized — invalid or expired session" },
      { status: 401 },
    );
  }
}
