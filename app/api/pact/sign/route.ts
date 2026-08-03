import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getAccess } from "@/lib/access/tier";
import { isPactPreset, parsePactGoals } from "@/lib/pact/presets";
import { parseSignatureData } from "@/lib/pact/signature";

/**
 * Sign a pact WITHOUT checkout, for accounts whose billing is already
 * covered: active Consilium members (the Pact is included in their $29) and
 * pact subscribers whose covenant row is somehow missing. Everyone else
 * goes through /api/pact/subscription/create and gets their Pact row from
 * the Stripe webhook.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const body = (await req.json().catch(() => null)) as {
      preset?: unknown;
      signatureData?: unknown;
      goals?: unknown;
    } | null;

    const preset = typeof body?.preset === "string" ? body.preset : "";
    if (!isPactPreset(preset)) {
      return NextResponse.json(
        { error: "Choose a track before signing" },
        { status: 400 },
      );
    }
    const goals = parsePactGoals(body?.goals);
    if (!goals) {
      return NextResponse.json(
        { error: "Write all three goals before signing" },
        { status: 400 },
      );
    }
    const signatureData = parseSignatureData(body?.signatureData);

    const access = await getAccess(user.id);
    if (!access.pactEntitled) {
      return NextResponse.json(
        { error: "The Pact starts at the door" },
        { status: 403 },
      );
    }

    const active = await prisma.pact.findFirst({
      where: { userId: user.id, brokenAt: null },
      select: { id: true },
    });
    if (active) {
      return NextResponse.json(
        { error: "Your pact is already signed" },
        { status: 400 },
      );
    }

    const last = await prisma.pact.findFirst({
      where: { userId: user.id },
      orderBy: { number: "desc" },
      select: { number: true },
    });
    const pact = await prisma.pact.create({
      data: {
        userId: user.id,
        number: (last?.number ?? 0) + 1,
        preset,
        signedAt: new Date(),
        goals,
        ...(signatureData ? { signatureData } : {}),
      },
    });

    return NextResponse.json({ success: true, pactId: pact.id });
  });
}
