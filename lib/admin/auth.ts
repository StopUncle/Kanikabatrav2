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

/**
 * Boolean form of the admin check. Returns true when a valid `admin_session`
 * cookie is present and carries the admin role. Use this where a 401
 * NextResponse is the wrong return shape — e.g. inside a branch that must
 * fall through to another auth path (the Pusher DM channel, which accepts
 * EITHER the owning member OR an admin).
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  try {
    const payload = jwt.verify(token, getJwtSecret()) as AdminSessionPayload;
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function requireAdminSession(): Promise<NextResponse | null> {
  if (await verifyAdminSession()) return null;
  return NextResponse.json(
    { error: "Unauthorized — admin session required" },
    { status: 401 },
  );
}
