import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const u = await requireAdminSession();
  if (u) return u;
  const { botId, active } = (await req.json()) as { botId: string; active: boolean };

  const bot = await prisma.user.findUnique({
    where: { id: botId },
    select: { isBot: true },
  });
  if (!bot || !bot.isBot) {
    return NextResponse.json({ error: "Not a bot" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: botId },
    data: { botActive: active },
  });
  return NextResponse.json({ ok: true });
}
