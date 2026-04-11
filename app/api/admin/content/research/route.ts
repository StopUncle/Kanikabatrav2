import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const notes = await prisma.researchNote.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ notes });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const { content, source, tags } = body;

  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 },
    );
  }

  const note = await prisma.researchNote.create({
    data: {
      content,
      source: source || null,
      tags: tags || [],
    },
  });

  return NextResponse.json({ note });
}
