/**
 * Email open + click tracking. Server-only.
 *
 * The queue processor calls instrumentMarketingHtml() on marketing rows
 * before sending: it appends a 1x1 open pixel and rewrites our own links
 * to route through the click redirect. Both endpoints decode the payload
 * and record an EmailEvent. The payload is base64url JSON, not signed:
 * a forged open/click only pollutes analytics, it carries no privilege,
 * so signing would be cost without benefit.
 */

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export interface TrackingContext {
  email: string;
  sequence?: string | null;
  step?: number | null;
}

function baseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
}

export function encodeTrackingPayload(ctx: TrackingContext): string {
  const json = JSON.stringify({
    e: ctx.email,
    s: ctx.sequence ?? null,
    n: ctx.step ?? null,
  });
  return Buffer.from(json, "utf8").toString("base64url");
}

export function decodeTrackingPayload(token: string): TrackingContext | null {
  try {
    const json = Buffer.from(token, "base64url").toString("utf8");
    const obj = JSON.parse(json) as { e?: unknown; s?: unknown; n?: unknown };
    if (typeof obj.e !== "string" || !obj.e) return null;
    return {
      email: obj.e,
      sequence: typeof obj.s === "string" ? obj.s : null,
      step: typeof obj.n === "number" ? obj.n : null,
    };
  } catch {
    return null;
  }
}

/**
 * Record an open or click. Fire-and-forget at the call sites: tracking must
 * never block or break the pixel response or the click redirect.
 */
export async function recordEmailEvent(
  type: "OPEN" | "CLICK",
  ctx: TrackingContext,
  url?: string,
): Promise<void> {
  try {
    await prisma.emailEvent.create({
      data: {
        email: ctx.email.toLowerCase(),
        sequence: ctx.sequence ?? null,
        step: ctx.step ?? null,
        type,
        url: url ?? null,
      },
    });
  } catch (err) {
    logger.warn("[email-tracking] failed to record event", {
      type,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * Only rewrite links to our own host, and never the unsubscribe / profile /
 * API links (rewriting those would break one-click unsubscribe). Restricting
 * the click redirect to our own host also closes the open-redirect hole.
 */
function isTrackableLink(href: string, ownHost: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(href);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
  if (parsed.host !== ownHost) return false;
  const lower = href.toLowerCase();
  if (
    lower.includes("unsubscribe") ||
    lower.includes("/api/") ||
    lower.includes("token=") ||
    parsed.pathname.startsWith("/profile")
  ) {
    return false;
  }
  return true;
}

/**
 * Append the open pixel and route our own links through the click tracker.
 * Returns the original html unchanged on any failure.
 */
export function instrumentMarketingHtml(
  html: string,
  ctx: TrackingContext,
): string {
  try {
    const base = baseUrl();
    let ownHost: string;
    try {
      ownHost = new URL(base).host;
    } catch {
      return html;
    }
    const token = encodeTrackingPayload(ctx);

    let out = html.replace(
      /href="(https?:\/\/[^"]+)"/gi,
      (match, href: string) => {
        if (!isTrackableLink(href, ownHost)) return match;
        const wrapped = `${base}/api/email/click?d=${token}&u=${encodeURIComponent(href)}`;
        return `href="${wrapped}"`;
      },
    );

    const pixel = `<img src="${base}/api/email/open?d=${token}" width="1" height="1" alt="" style="display:none;max-height:0;overflow:hidden" />`;
    out = out.includes("</body>")
      ? out.replace("</body>", `${pixel}</body>`)
      : `${out}${pixel}`;

    return out;
  } catch {
    return html;
  }
}

/** 1x1 transparent GIF for the open pixel. */
export const TRACKING_PIXEL_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64",
);

/* -------------------------------------------------------------------------- */
/* Segmentation: engagement stats                                             */
/* -------------------------------------------------------------------------- */

export interface SequenceEngagement {
  sequence: string;
  sent: number;
  uniqueOpens: number;
  uniqueClicks: number;
  openRate: number; // 0..1
  clickRate: number; // 0..1
}

/**
 * Per-sequence open/click engagement. Sends come from SENT queue rows;
 * opens/clicks are counted by unique recipient (so the rates are
 * unique-open-rate / unique-click-rate, the numbers people actually mean).
 */
export async function getEmailEngagementStats(): Promise<SequenceEngagement[]> {
  const [sends, distinctEvents] = await Promise.all([
    prisma.emailQueue.groupBy({
      by: ["sequence"],
      where: { status: "SENT" },
      _count: { _all: true },
    }),
    prisma.emailEvent.findMany({
      distinct: ["email", "sequence", "type"],
      select: { email: true, sequence: true, type: true },
    }),
  ]);

  const sentMap = new Map<string, number>();
  for (const s of sends) sentMap.set(s.sequence, s._count._all);

  const openMap = new Map<string, number>();
  const clickMap = new Map<string, number>();
  for (const e of distinctEvents) {
    if (!e.sequence) continue;
    const target = e.type === "OPEN" ? openMap : clickMap;
    target.set(e.sequence, (target.get(e.sequence) ?? 0) + 1);
  }

  const sequences = new Set<string>([
    ...Array.from(sentMap.keys()),
    ...Array.from(openMap.keys()),
    ...Array.from(clickMap.keys()),
  ]);

  return Array.from(sequences)
    .map((sequence) => {
      const sent = sentMap.get(sequence) ?? 0;
      const uniqueOpens = openMap.get(sequence) ?? 0;
      const uniqueClicks = clickMap.get(sequence) ?? 0;
      return {
        sequence,
        sent,
        uniqueOpens,
        uniqueClicks,
        openRate: sent > 0 ? uniqueOpens / sent : 0,
        clickRate: sent > 0 ? uniqueClicks / sent : 0,
      };
    })
    .sort((a, b) => b.sent - a.sent);
}

/**
 * The distinct recipients who opened or clicked a given sequence. This is
 * the segmentation primitive: feed the list into a targeted campaign (e.g.
 * everyone who clicked the coaching nurture but has not booked).
 */
export async function getEngagedEmails(
  sequence: string,
  type: "OPEN" | "CLICK",
): Promise<string[]> {
  const rows = await prisma.emailEvent.findMany({
    where: { sequence, type },
    distinct: ["email"],
    select: { email: true },
    take: 5000,
  });
  return rows.map((r) => r.email);
}
