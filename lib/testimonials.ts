import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface PublicTestimonial {
  id: string;
  videoUrl: string | null;
  posterUrl: string | null;
  durationSeconds: number | null;
  quoteText: string | null;
  transcript: string | null;
  authorName: string;
  authorRole: string | null;
}

/**
 * Published testimonials in display order. Cached 5 minutes to match the
 * social-proof ticker rhythm so a landing-page request hits at most one
 * DB query per 5 minutes per process.
 */
export const getPublishedTestimonials = unstable_cache(
  async (): Promise<PublicTestimonial[]> => {
    // Degrade gracefully. The testimonials grid is supporting social
    // proof, not load-bearing: a DB hiccup or a not-yet-migrated table
    // (common in a fresh local/dev database) must not take down the whole
    // sales page. On any error we return an empty list and the consuming
    // sections render nothing rather than throwing into the error
    // boundary.
    try {
      return await prisma.testimonial.findMany({
        where: { published: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
        select: {
          id: true,
          videoUrl: true,
          posterUrl: true,
          durationSeconds: true,
          quoteText: true,
          transcript: true,
          authorName: true,
          authorRole: true,
        },
      });
    } catch (err) {
      console.error("[testimonials] fetch failed, returning empty list", err);
      return [];
    }
  },
  ["testimonials-published-v1"],
  { revalidate: 300, tags: ["testimonials"] },
);

/** Subset for landing-page embed. Top N. */
export async function getFeaturedTestimonials(
  limit = 3,
): Promise<PublicTestimonial[]> {
  const all = await getPublishedTestimonials();
  return all.slice(0, limit);
}
