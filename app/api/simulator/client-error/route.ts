/**
 * POST /api/simulator/client-error
 *
 * Backend ingest for client-side simulator crashes captured by
 * SimulatorErrorBoundary. Without this, "the simulator crashes
 * midway" reports leave no server-side trace and we have to guess
 * at the cause from in-progress SimulatorProgress rows.
 *
 * What we record:
 *   - userId (from session)
 *   - scenarioId + currentSceneId (from the runner state)
 *   - error name + message + first 2KB of stack
 *   - userAgent + viewport (helps narrow down browser-specific bugs)
 *
 * What we DON'T record:
 *   - The full state object (privacy + storage cost)
 *   - PII beyond the user id (email, name, etc — that's joined
 *     downstream when needed)
 *
 * Persistence: appended to console.error with a structured prefix
 * so Railway logs surface them grep-ably. Not currently a DB row —
 * intentional, so that an error storm can't write-amplify a DB
 * outage. If volume justifies a dedicated table later, the prefix
 * makes log-shipping trivial.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

const ClientErrorBody = z.object({
  scenarioId: z.string().min(1).max(100),
  currentSceneId: z.string().max(200).optional(),
  errorName: z.string().max(200),
  errorMessage: z.string().max(2000),
  errorStack: z.string().max(2000).optional(),
  componentStack: z.string().max(2000).optional(),
  userAgent: z.string().max(500).optional(),
  viewportWidth: z.number().int().min(0).max(10_000).optional(),
  viewportHeight: z.number().int().min(0).max(10_000).optional(),
  url: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  let body: z.infer<typeof ClientErrorBody>;
  try {
    body = ClientErrorBody.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  // User id is best-effort. We accept anonymous reports because the
  // crash may have logged the user out, or the session token may be
  // the thing that crashed the runner. Don't require auth.
  let userId: string | null = null;
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      const payload = verifyAccessToken(accessToken);
      userId = payload?.userId ?? null;
    }
  } catch {
    // Token verify failed (expired / invalid); fall through anonymous.
  }

  // Structured log so Railway / future log-shipper can split fields
  // cleanly. The prefix `[SIM-CRASH]` is the grep marker.
  logger.error(
    `[SIM-CRASH] ${body.scenarioId}@${body.currentSceneId ?? "?"} ${body.errorName}: ${body.errorMessage}`,
    new Error(body.errorStack ?? body.errorMessage),
    {
      userId: userId ?? "anonymous",
      scenarioId: body.scenarioId,
      currentSceneId: body.currentSceneId,
      componentStack: body.componentStack?.slice(0, 500),
      userAgent: body.userAgent,
      viewport:
        body.viewportWidth && body.viewportHeight
          ? `${body.viewportWidth}x${body.viewportHeight}`
          : undefined,
      url: body.url,
    },
  );

  return NextResponse.json({ recorded: true });
}
