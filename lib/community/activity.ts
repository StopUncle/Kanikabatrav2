/**
 * Recent activity feed for the sidebar's "Live in the Council" strip.
 *
 * Pulls real signals from comments, likes, new members, and simulator
 * completions, merges them into a single timeline, then pads with a
 * deterministic time-of-day mock if real activity is thin so the strip
 * never reads empty.
 *
 * The mocks rotate by hour-of-day so the strip changes naturally as
 * the day goes on. They use generic verbs ("reacted", "joined the
 * Council", "completed a Mission") and fictional handles consistent
 * with the leaderboard cohort — no fake quotes or specific actions
 * that could mislead a member.
 */

import { prisma } from "@/lib/prisma";
import { memberSafeName } from "@/lib/community/privacy";

export type ActivityKind =
  | "comment"
  | "like"
  | "joined"
  | "simulator";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  /** Display name of whoever did the thing. Already privacy-safe. */
  who: string;
  /** Short context — post title, scenario name, etc. May be empty. */
  what: string;
  /** ISO timestamp for the relative-time renderer. */
  at: string;
  /** True for synthesized rows so the UI can render them without a
   *  link target (we don't want to deep-link a fake action). */
  isMock: boolean;
}

const MOCK_HANDLES = [
  "Vesper",
  "Praxis",
  "Mistress Quiet",
  "Initiate #084",
  "Calm Threat",
  "Kestrel",
  "ForkedTongue",
  "Sable",
  "Ivory_K",
  "Wren",
];

const MOCK_TEMPLATES: Array<{
  kind: ActivityKind;
  what: string;
}> = [
  { kind: "like", what: "reacted to a post" },
  { kind: "comment", what: "left a comment" },
  { kind: "simulator", what: "completed Mission 1" },
  { kind: "joined", what: "joined the Council" },
  { kind: "simulator", what: "completed a Mission" },
  { kind: "like", what: "reacted to a voice note" },
];

/**
 * Deterministic mock generator. Rotates handles + actions by hour and
 * day so the strip shifts as time passes, but never jiggles within a
 * single hour (so a refresh doesn't look broken).
 */
function buildMocks(count: number): ActivityItem[] {
  const out: ActivityItem[] = [];
  const now = Date.now();
  const hour = new Date(now).getUTCHours();
  const day = Math.floor(now / (24 * 60 * 60 * 1000));

  for (let i = 0; i < count; i++) {
    const handle =
      MOCK_HANDLES[(hour + day + i * 3) % MOCK_HANDLES.length];
    const template =
      MOCK_TEMPLATES[(day + i * 2) % MOCK_TEMPLATES.length];
    // Stagger timestamps: most recent ~6 minutes ago, oldest ~3 hours.
    const minutesAgo = 6 + i * 31 + ((hour + i) % 17);
    out.push({
      id: `mock-${day}-${hour}-${i}`,
      kind: template.kind,
      who: handle,
      what: template.what,
      at: new Date(now - minutesAgo * 60 * 1000).toISOString(),
      isMock: true,
    });
  }
  return out;
}

/**
 * Get the most recent N activity items. Real signals are pulled in
 * parallel and unioned by timestamp; if fewer than N real items
 * exist, the rest is padded with mocks.
 */
export async function getRecentActivity(
  limit: number,
): Promise<ActivityItem[]> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Wider net than `limit` per source so the timestamp-merge has
  // material to work with. We slice to `limit` after the merge.
  const PER_SOURCE = Math.max(limit, 5);

  const [comments, likes, members, simRuns] = await Promise.all([
    prisma.feedComment.findMany({
      where: { createdAt: { gte: since }, status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: PER_SOURCE,
      select: {
        id: true,
        createdAt: true,
        author: { select: { displayName: true, name: true, role: true } },
        post: { select: { title: true } },
      },
    }),
    prisma.feedPostLike.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: PER_SOURCE,
      select: {
        id: true,
        createdAt: true,
        user: { select: { displayName: true, name: true, role: true } },
        post: { select: { title: true } },
      },
    }),
    prisma.communityMembership.findMany({
      where: { status: "ACTIVE", activatedAt: { gte: since } },
      orderBy: { activatedAt: "desc" },
      take: PER_SOURCE,
      select: {
        id: true,
        activatedAt: true,
        user: { select: { displayName: true, name: true, role: true } },
      },
    }),
    prisma.simulatorProgress.findMany({
      where: { completedAt: { gte: since }, outcome: "good" },
      orderBy: { completedAt: "desc" },
      take: PER_SOURCE,
      select: {
        id: true,
        completedAt: true,
        scenarioId: true,
        user: { select: { displayName: true, name: true, role: true } },
      },
    }),
  ]);

  const real: ActivityItem[] = [];

  for (const c of comments) {
    real.push({
      id: `cmt-${c.id}`,
      kind: "comment",
      who: memberSafeName(c.author),
      what: c.post?.title
        ? `commented on "${c.post.title.slice(0, 40)}"`
        : "left a comment",
      at: c.createdAt.toISOString(),
      isMock: false,
    });
  }

  for (const l of likes) {
    real.push({
      id: `lik-${l.id}`,
      kind: "like",
      who: memberSafeName(l.user),
      what: l.post?.title
        ? `reacted to "${l.post.title.slice(0, 40)}"`
        : "reacted to a post",
      at: l.createdAt.toISOString(),
      isMock: false,
    });
  }

  for (const m of members) {
    if (!m.activatedAt) continue;
    real.push({
      id: `mem-${m.id}`,
      kind: "joined",
      who: memberSafeName(m.user),
      what: "joined the Council",
      at: m.activatedAt.toISOString(),
      isMock: false,
    });
  }

  for (const s of simRuns) {
    if (!s.completedAt) continue;
    real.push({
      id: `sim-${s.id}`,
      kind: "simulator",
      who: memberSafeName(s.user),
      what: "completed a Mission",
      at: s.completedAt.toISOString(),
      isMock: false,
    });
  }

  real.sort((a, b) => b.at.localeCompare(a.at));

  if (real.length >= limit) return real.slice(0, limit);

  const padding = buildMocks(limit - real.length);
  // Mocks come last so anything real always wins the top slots.
  return [...real, ...padding].slice(0, limit);
}
