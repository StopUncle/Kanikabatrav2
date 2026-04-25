import { prisma } from "@/lib/prisma";

export interface BotSettings {
  enabled: boolean;
  dryRun: boolean;
}

let cached: { value: BotSettings; expiresAt: number } | null = null;
const CACHE_MS = 30_000;

export async function getBotSettings(): Promise<BotSettings> {
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const row = await prisma.botEngagementSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
    select: { enabled: true, dryRun: true },
  });

  cached = { value: row, expiresAt: Date.now() + CACHE_MS };
  return row;
}

export function clearBotSettingsCache(): void {
  cached = null;
}
