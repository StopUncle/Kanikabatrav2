import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { checkAccessTier } from "@/lib/community/access";
import { getViewerGender } from "@/lib/community/gender-filter";
import PostDetail from "@/components/community/forum/PostDetail";
import AccessGate from "@/components/community/access/AccessGate";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ categorySlug: string; postId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { postId } = await params;
  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    select: { title: true, content: true },
  });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Forum | Kanika Batra`,
    description: post.content.substring(0, 160),
  };
}

export default async function PostPage({ params }: Props) {
  const { categorySlug, postId } = await params;

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

  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          displayName: true,
          avatarUrl: true,
          gender: true,
          role: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          accessTier: true,
        },
      },
      _count: {
        select: { replies: true, likes: true },
      },
    },
  });

  if (!post) {
    notFound();
  }

  if (post.category.slug !== categorySlug) {
    notFound();
  }

  // Gender-split: a member of the opposite gender shouldn't be able to deep-
  // link into a same-tier forum post by an opposite-gender author. Admin/mod
  // posts stay visible to everyone. Legacy users (no gender set) see all.
  const viewerGender = await getViewerGender(userId);
  if (viewerGender) {
    const authorIsAdmin = post.author.role === "ADMIN" || post.author.role === "MODERATOR";
    if (!authorIsAdmin && post.author.gender !== viewerGender) {
      notFound();
    }
  }

  const access = await checkAccessTier(userId, post.category.accessTier);

  if (!access.hasAccess) {
    return (
      <AccessGate
        hasAccess={false}
        requiredTier={post.category.accessTier}
        reason={access.reason}
        upgradeUrl={access.upgradeUrl}
      />
    );
  }

  await prisma.forumPost.update({
    where: { id: postId },
    data: { viewCount: { increment: 1 } },
  });

  let userLiked = false;
  if (userId) {
    const like = await prisma.postLike.findUnique({
      where: {
        postId_userId: { postId, userId },
      },
    });
    userLiked = !!like;
  }

  const formattedPost = {
    id: post.id,
    title: post.title,
    content: post.content,
    viewCount: post.viewCount,
    replyCount: post._count.replies,
    likeCount: post._count.likes,
    userLiked,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    author: post.author,
    category: {
      id: post.category.id,
      name: post.category.name,
      slug: post.category.slug,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
      <Link
        href={`/inner-circle/forum/${categorySlug}`}
        className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-accent-gold transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {post.category.name}
      </Link>

      <PostDetail post={formattedPost} currentUserId={userId} />
    </div>
  );
}
