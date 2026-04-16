import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { checkAccessTier } from "@/lib/community/access";
import CategoryCard from "@/components/community/forum/CategoryCard";

export const metadata = {
  title: "Forum | Community | Kanika Batra",
  description: "Browse forum categories and join discussions",
};

export default async function ForumPage() {
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

  const categories = await prisma.forumCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  const categoriesWithAccess = await Promise.all(
    categories.map(async (category) => {
      const access = await checkAccessTier(userId, category.accessTier);
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        accessTier: category.accessTier,
        postCount: category._count.posts,
        hasAccess: access.hasAccess,
        accessReason: access.reason,
      };
    }),
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
          Forum
        </h1>
        <p className="text-text-gray text-sm">
          Browse categories and join discussions with other members.
        </p>
      </div>

      {categoriesWithAccess.length === 0 ? (
        <div className="text-center py-16 bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-2xl">
          <p className="text-text-gray">No forum categories yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {categoriesWithAccess.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
