import { prisma } from "@/lib/prisma";

export interface QuestionSettings {
  dailyCap: number;
  maxLength: number;
}

// 60s cache. Settings rarely change; this saves a query per /ask page load
// without making the kill-switch slower than the cron tick anyway.
let cached: { value: QuestionSettings; expiresAt: number } | null = null;
const CACHE_MS = 60_000;

export async function getQuestionSettings(): Promise<QuestionSettings> {
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const row = await prisma.memberQuestionSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
    select: { dailyCap: true, maxLength: true },
  });
  cached = { value: row, expiresAt: Date.now() + CACHE_MS };
  return row;
}

export function clearQuestionSettingsCache(): void {
  cached = null;
}
