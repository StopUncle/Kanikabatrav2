import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const status = request.nextUrl.searchParams.get("status") || "PENDING";
  const source = request.nextUrl.searchParams.get("source");

  const where: Record<string, unknown> = {};
  if (status !== "ALL") where.status = status;
  if (source) where.source = source;

  const ideas = await prisma.contentIdea.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const counts = await prisma.contentIdea.groupBy({
    by: ["status"],
    _count: true,
  });

  return NextResponse.json({
    ideas,
    counts: Object.fromEntries(counts.map((c) => [c.status, c._count])),
  });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const { title, hook, format, source, category } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const idea = await prisma.contentIdea.create({
    data: {
      title,
      hook: hook || null,
      format: format || null,
      source: source || "manual",
      category: category || null,
    },
  });

  return NextResponse.json({ idea });
}
