import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

/**
 * GET /api/admin/messages/search?q=...
 *
 * Member lookup for the "New message" composer, so Kanika can start a thread
 * with anyone by name or email. Bots and training bots are excluded — they're
 * not real people to message. Returns at most 12 matches.
 */
export async function GET(req: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const q = (req.nextUrl.searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ members: [] });
  }

  const members = await prisma.user.findMany({
    where: {
      isBot: false,
      isTrainingBot: false,
      OR: [
        { displayName: { contains: q, mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      displayName: true,
      name: true,
      email: true,
      avatarUrl: true,
      communityMembership: { select: { status: true } },
      conversation: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return NextResponse.json({
    members: members.map((m) => ({
      id: m.id,
      name: m.displayName || m.name || "Member",
      email: m.email,
      avatarUrl: m.avatarUrl,
      membershipStatus: m.communityMembership?.status ?? null,
      hasConversation: m.conversation !== null,
    })),
  });
}
