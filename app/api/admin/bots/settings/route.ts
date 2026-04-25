import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { clearBotSettingsCache } from "@/lib/bots/settings";

export async function GET() {
  const u = await requireAdminSession();
  if (u) return u;
  const row = await prisma.botEngagementSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });
  return NextResponse.json(row);
}

export async function PATCH(req: NextRequest) {
  const u = await requireAdminSession();
  if (u) return u;
  const body = (await req.json()) as { enabled?: boolean; dryRun?: boolean };
  const row = await prisma.botEngagementSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      enabled: body.enabled ?? false,
      dryRun: body.dryRun ?? true,
    },
    update: { enabled: body.enabled, dryRun: body.dryRun },
  });
  clearBotSettingsCache();
  return NextResponse.json(row);
}
