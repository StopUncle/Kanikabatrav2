import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

const ALLOWED_TIERS = ["STANDARD", "STRONG", "LEGENDARY"];
const ALLOWED_PLACEMENTS = ["HOOK", "TAIL", "DEEPENING"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = await request.json();
  const { category, text, tier, placement, notes, incrementUse } = body;

  const data: Record<string, unknown> = {};
  if (category !== undefined)
    data.category = String(category).trim().toUpperCase().replace(/\s+/g, "_");
  if (text !== undefined) data.text = String(text).trim();
  if (tier !== undefined) {
    if (typeof tier === "string" && ALLOWED_TIERS.includes(tier))
      data.tier = tier;
  }
  if (placement !== undefined) {
    if (placement === null || placement === "") data.placement = null;
    else if (typeof placement === "string" && ALLOWED_PLACEMENTS.includes(placement))
      data.placement = placement;
  }
  if (notes !== undefined) data.notes = notes || null;

  // "Mark as used", increments usedCount and stamps lastUsedAt.
  // Single-shot from the UI button on the line card.
  if (incrementUse) {
    const current = await prisma.contentConfession.findUnique({ where: { id } });
    if (!current) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    data.usedCount = (current.usedCount || 0) + 1;
    data.lastUsedAt = new Date();
  }

  const confession = await prisma.contentConfession.update({
    where: { id },
    data,
  });

  return NextResponse.json({ confession });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  await prisma.contentConfession.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
