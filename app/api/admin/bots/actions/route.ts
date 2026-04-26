import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import type { BotActionStatus } from "@prisma/client";

const VALID_STATUSES: BotActionStatus[] = ["PENDING", "EXECUTED", "FAILED", "SKIPPED"];

export async function GET(req: NextRequest) {
  const u = await requireAdminSession();
  if (u) return u;

  const sp = req.nextUrl.searchParams;
  const statusParam = sp.get("status");
  const cursor = sp.get("cursor") ?? undefined;
  const status =
    statusParam && (VALID_STATUSES as string[]).includes(statusParam)
      ? (statusParam as BotActionStatus)
      : undefined;

  const rows = await prisma.botAction.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 51,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    include: {
      bot: { select: { displayName: true, email: true } },
      post: { select: { id: true, title: true, type: true } },
    },
  });

  const hasMore = rows.length > 50;
  return NextResponse.json({
    actions: hasMore ? rows.slice(0, 50) : rows,
    nextCursor: hasMore ? rows[49].id : null,
  });
}
