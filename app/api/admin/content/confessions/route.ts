import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

const ALLOWED_TIERS = ["STANDARD", "STRONG", "LEGENDARY"];
const ALLOWED_PLACEMENTS = ["HOOK", "TAIL", "DEEPENING"];

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const category = request.nextUrl.searchParams.get("category");
  const tier = request.nextUrl.searchParams.get("tier");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (tier) where.tier = tier;

  const confessions = await prisma.contentConfession.findMany({
    where,
    orderBy: [{ category: "asc" }, { createdAt: "desc" }],
  });

  const counts = await prisma.contentConfession.groupBy({
    by: ["category"],
    _count: true,
  });

  const tierCounts = await prisma.contentConfession.groupBy({
    by: ["tier"],
    _count: true,
  });

  return NextResponse.json({
    confessions,
    categoryCounts: Object.fromEntries(counts.map((c) => [c.category, c._count])),
    tierCounts: Object.fromEntries(tierCounts.map((c) => [c.tier, c._count])),
  });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const { category, text, tier, placement, notes } = body;

  if (!category || !text) {
    return NextResponse.json(
      { error: "category and text are required" },
      { status: 400 },
    );
  }

  const data: Record<string, unknown> = {
    category: String(category).trim().toUpperCase().replace(/\s+/g, "_"),
    text: String(text).trim(),
  };
  if (tier && ALLOWED_TIERS.includes(tier)) data.tier = tier;
  if (placement && ALLOWED_PLACEMENTS.includes(placement))
    data.placement = placement;
  if (notes !== undefined) data.notes = notes || null;

  const confession = await prisma.contentConfession.create({
    data: data as {
      category: string;
      text: string;
      tier?: string;
      placement?: string;
      notes?: string | null;
    },
  });

  return NextResponse.json({ confession });
}
