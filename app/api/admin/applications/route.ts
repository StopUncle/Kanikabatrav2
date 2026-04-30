import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MembershipStatus, Prisma } from "@prisma/client";
import { requireAdminSession } from "@/lib/admin/auth";

/**
 * Admin Applications API.
 *
 * Scope: only returns rows where `applicationData` is not null, i.e. the
 * member filled out the apply form. Gift-campaign claims, manual comps,
 * and any other back-door paths skip the form so they never appear here.
 * This is what Kanika asked for: the "Applications" view should be a
 * review surface, not a membership dashboard.
 *
 * Status tabs:
 *   - PENDING  , just submitted, waiting for Kanika's approval
 *   - APPROVED , approved, not yet paid (Stripe checkout outstanding)
 *   - ACTIVE   , approved + paid (what used to vanish into "All")
 *   - ALL      . Every application regardless of state
 *
 * Every response also includes a `counts` block so the admin UI can
 * show "Pending (3) / Approved (1) / Active (12)" without firing three
 * separate requests.
 */
export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") || "PENDING";

    // Only rows with a submitted application, removes gift claims and
    // manual back-door memberships from every tab, since those aren't
    // applications. `not: Prisma.JsonNull` matches any JSON value.
    const hasApplication: Prisma.CommunityMembershipWhereInput = {
      applicationData: { not: Prisma.JsonNull },
    };

    const where: Prisma.CommunityMembershipWhereInput =
      statusParam === "ALL"
        ? hasApplication
        : { ...hasApplication, status: statusParam as MembershipStatus };

    // Single groupBy for the tab counts. Faster + fewer round-trips than
    // four separate count() calls, and stays in sync with the
    // applicationData filter above.
    const [applications, grouped] = await Promise.all([
      prisma.communityMembership.findMany({
        where,
        select: {
          id: true,
          userId: true,
          status: true,
          applicationData: true,
          appliedAt: true,
          approvedAt: true,
          activatedAt: true,
          billingCycle: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              displayName: true,
            },
          },
        },
        orderBy: { appliedAt: "desc" },
        take: 100,
      }),
      prisma.communityMembership.groupBy({
        by: ["status"],
        where: hasApplication,
        _count: { _all: true },
      }),
    ]);

    // Normalise the groupBy into a tab-count shape the UI can read by key.
    const counts = {
      PENDING: 0,
      APPROVED: 0,
      ACTIVE: 0,
      ALL: 0,
    };
    for (const row of grouped) {
      if (row.status in counts) {
        counts[row.status as keyof typeof counts] = row._count._all;
      }
      counts.ALL += row._count._all;
    }

    return NextResponse.json({
      success: true,
      applications,
      count: applications.length,
      counts,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
