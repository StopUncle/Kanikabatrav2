import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

const Body = z.object({
  videoUrl: z.string().url().nullable().optional(),
  posterUrl: z.string().url().nullable().optional(),
  durationSeconds: z.number().int().positive().nullable().optional(),
  quoteText: z.string().max(4000).nullable().optional(),
  transcript: z.string().max(8000).nullable().optional(),
  authorName: z.string().min(1).max(120),
  authorRole: z.string().max(200).nullable().optional(),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(false),
});

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ testimonials });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  // Either videoUrl OR quoteText must be set — a testimonial with neither
  // would render as an empty card on the wall.
  if (!body.videoUrl && !body.quoteText) {
    return NextResponse.json(
      { error: "Provide either a video URL or a quote text" },
      { status: 400 },
    );
  }

  const created = await prisma.testimonial.create({ data: body });
  revalidateTag("testimonials");
  return NextResponse.json({ testimonial: created }, { status: 201 });
}
