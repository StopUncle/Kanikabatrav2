import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { checkAccessTier } from "@/lib/community/access";
import { memberSafeName } from "@/lib/community/privacy";
import ChatRoom from "@/components/community/chat/ChatRoom";
import AccessGate from "@/components/community/access/AccessGate";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ roomSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { roomSlug } = await params;
  const room = await prisma.chatRoom.findUnique({
    where: { slug: roomSlug },
    select: { name: true, description: true },
  });

  if (!room) {
    return { title: "Room Not Found" };
  }

  return {
    title: `${room.name} | Chat | Kanika Batra`,
    description: room.description || `Join the ${room.name} chat room`,
  };
}

export default async function ChatRoomPage({ params }: Props) {
  const { roomSlug } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let userId: string | null = null;

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);
      if (payload) userId = payload.userId;
    } catch {
      /* fall through to admin check */
    }
  }
  if (!userId) {
    userId = await getAdminUserId();
  }

  const room = await prisma.chatRoom.findUnique({
    where: { slug: roomSlug },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              displayName: true,
              avatarUrl: true,
              role: true,
            },
          },
        },
        orderBy: { joinedAt: "desc" },
        take: 50,
      },
      _count: {
        select: { members: true },
      },
    },
  });

  if (!room) {
    notFound();
  }

  if (!room.isActive) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <div className="text-center py-16 bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-2xl">
          <p className="text-text-gray">This chat room is currently inactive</p>
          <Link
            href="/inner-circle/chat"
            className="text-accent-gold hover:underline mt-4 inline-block"
          >
            Back to Chat Rooms
          </Link>
        </div>
      </div>
    );
  }

  const access = await checkAccessTier(userId, room.accessTier);

  if (!access.hasAccess) {
    return (
      <AccessGate
        hasAccess={false}
        requiredTier={room.accessTier}
        reason={access.reason}
        upgradeUrl={access.upgradeUrl}
      />
    );
  }

  let isMember = false;
  let memberRole = null;
  if (userId) {
    const membership = room.members.find((m) => m.user.id === userId);
    if (membership) {
      isMember = true;
      memberRole = membership.role;
    }
  }

  const formattedRoom = {
    id: room.id,
    name: room.name,
    slug: room.slug,
    description: room.description,
    accessTier: room.accessTier,
    memberCount: room._count.members,
    members: room.members.map((m) => ({
      id: m.user.id,
      name: memberSafeName(m.user),
      avatar: m.user.avatarUrl || undefined,
      role: m.role,
    })),
    isMember,
    memberRole,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
      <Link
        href="/inner-circle/chat"
        className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-accent-gold transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Chat Rooms
      </Link>

      <ChatRoom room={formattedRoom} currentUserId={userId} />
    </div>
  );
}
