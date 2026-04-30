import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserIdFromRequest } from "@/lib/auth/resolve-user";
import { getAllPosts } from "@/lib/mdx";
import { feedPostGenderWhere } from "@/lib/community/gender-filter";
import { checkMembership } from "@/lib/community/membership";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

/**
 * Site-wide search. Accepts ?q=<query>, returns grouped results across:
 *   - Public blog posts (MDX, via lib/mdx)
 *   - Courses (ACTIVE only, any logged-in viewer can see them)
 *   - Inner Circle feed posts. ONLY if the caller is an ACTIVE member,
 *     and gender-filtered to match the live feed rules
 *
 * Non-members searching will see blog + course results; trying to hit
 * feed posts without an active membership returns an empty feed section.
 * No info leak because courses and blog are public-adjacent content.
 *
 * Uses ILIKE for fuzzy matching. Postgres trigrams (pg_trgm) would be
 * better at scale but require a migration. For the current content volume
 * (20 blog posts, dozens of courses, hundreds of feed posts) ILIKE is
 * plenty fast.
 */

const MAX_RESULTS_PER_GROUP = 10;

// Rate limit search separately from the auth/comment limits, 30/min per
// IP is generous but prevents scraping.
const SEARCH_LIMIT = {
  action: "search",
  max: 30,
  windowMs: 60_000,
} as const;

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimited = await enforceRateLimit(SEARCH_LIMIT, ip);
  if (rateLimited) return rateLimited;

  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json(
      { error: "Query must be at least 2 characters" },
      { status: 400 },
    );
  }
  if (q.length > 100) {
    return NextResponse.json(
      { error: "Query too long" },
      { status: 400 },
    );
  }

  // Look up the viewer (if any), determines whether feed results are
  // included and what gender filter applies. ResolveActiveUserIdFromRequest
  // returns null for banned / tokenVersion-revoked sessions, so banned
  // users drop to the anonymous-viewer path (blog + courses only).
  const viewerUserId = await resolveActiveUserIdFromRequest(request);
  let viewerIsActiveMember = false;
  if (viewerUserId) {
    const { isMember } = await checkMembership(viewerUserId);
    viewerIsActiveMember = isMember;
  }

  try {
    // Build the case-insensitive contains pattern once.
    const contains = { contains: q, mode: "insensitive" } as const;

    // ---------- Courses ----------
    const courses = await prisma.course.findMany({
      where: {
        isActive: true,
        OR: [{ title: contains }, { description: contains }],
      },
      orderBy: { sortOrder: "asc" },
      take: MAX_RESULTS_PER_GROUP,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
      },
    });

    // ---------- Feed posts (members only) ----------
    let feedPosts: Array<{
      id: string;
      title: string;
      excerpt: string;
      type: string;
      createdAt: string;
    }> = [];

    if (viewerIsActiveMember && viewerUserId) {
      const viewer = await prisma.user.findUnique({
        where: { id: viewerUserId },
        select: { gender: true },
      });
      const genderWhere = feedPostGenderWhere(viewer?.gender ?? null);

      const feedRows = await prisma.feedPost.findMany({
        where: {
          ...genderWhere,
          OR: [{ title: contains }, { content: contains }],
        },
        orderBy: { createdAt: "desc" },
        take: MAX_RESULTS_PER_GROUP,
        select: {
          id: true,
          title: true,
          content: true,
          type: true,
          createdAt: true,
        },
      });
      feedPosts = feedRows.map((row) => {
        const stripped = row.content
          .replace(/[*_#`>\[\]]/g, "")
          .replace(/\s+/g, " ")
          .trim();
        return {
          id: row.id,
          title: row.title,
          excerpt: stripped.slice(0, 200) + (stripped.length > 200 ? "…" : ""),
          type: row.type,
          createdAt: row.createdAt.toISOString(),
        };
      });
    }

    // ---------- Blog posts ----------
    // MDX is read from disk; getAllPosts returns metadata only, which is
    // enough to search title + excerpt + tags. Content-body search would
    // need a full read of every MDX file, skipped for now since the
    // frontmatter is the high-signal text.
    const allBlog = getAllPosts();
    const qLower = q.toLowerCase();
    const blogPosts = allBlog
      .filter((post) => {
        const fm = post.frontmatter;
        const hay =
          `${fm.title} ${fm.excerpt} ${fm.category} ${(fm.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(qLower);
      })
      .slice(0, MAX_RESULTS_PER_GROUP)
      .map((post) => ({
        slug: post.slug,
        title: post.frontmatter.title,
        excerpt: post.frontmatter.excerpt,
        category: post.frontmatter.category,
        publishedAt: post.frontmatter.publishedAt,
      }));

    const totalHits =
      courses.length + feedPosts.length + blogPosts.length;

    return NextResponse.json({
      query: q,
      totalHits,
      results: {
        courses: courses.map((c) => ({
          id: c.id,
          title: c.title,
          slug: c.slug,
          excerpt: c.description?.slice(0, 200) ?? "",
        })),
        feedPosts,
        blogPosts,
      },
      viewer: {
        isActiveMember: viewerIsActiveMember,
      },
    });
  } catch (err) {
    logger.error("[search] query failed", err as Error, { query: q });
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 },
    );
  }
}
