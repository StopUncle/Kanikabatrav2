import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import {
  parseSignatureData,
  type SignatureStrokes,
} from "@/lib/pact/signature";
import { parsePactGoals } from "@/lib/pact/presets";

/**
 * Attach the drawn signature and the three goals to the live pact. The
 * paid path collects both BEFORE Stripe checkout, but the Pact row is only
 * created by the webhook once money moves, so the sign page stashes them
 * client-side and posts them here from the sealed page. Set-once, both:
 * a signature that could be overwritten later is not a signature, and the
 * pact was signed against exactly the goals that were on screen.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const body = (await req.json().catch(() => null)) as {
      signatureData?: unknown;
      goals?: unknown;
    } | null;
    const signatureData = parseSignatureData(body?.signatureData);
    const goals = parsePactGoals(body?.goals);
    if (!signatureData && !goals) {
      return NextResponse.json({ error: "Nothing to attach" }, { status: 400 });
    }

    const pact = await prisma.pact.findFirst({
      where: { userId: user.id, brokenAt: null },
      select: { id: true, signatureData: true, goals: true },
    });
    if (!pact) {
      return NextResponse.json({ error: "No pact to sign" }, { status: 404 });
    }

    const data: { signatureData?: SignatureStrokes; goals?: string[] } = {};
    if (signatureData && pact.signatureData === null) {
      data.signatureData = signatureData;
    }
    if (goals && pact.goals === null) {
      data.goals = goals;
    }
    if (Object.keys(data).length > 0) {
      await prisma.pact.update({ where: { id: pact.id }, data });
    }
    return NextResponse.json({ success: true });
  });
}
