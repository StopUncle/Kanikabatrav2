import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";

export async function POST() {
  const u = await requireAdminSession();
  if (u) return u;

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kanikarose.com";
  const url = new URL("/api/cron/bot-actions", base);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "x-cron-secret": process.env.CRON_SECRET ?? "" },
  });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}
