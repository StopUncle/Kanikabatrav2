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
  authorName: z.string().min(1).max(120).optional(),
  authorRole: z.string().max(200).nullable().optional(),
  displayOrder: z.number().int().optional(),
  published: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  try {
    const updated = await prisma.testimonial.update({
      where: { id },
      data: body,
    });
    revalidateTag("testimonials");
    return NextResponse.json({ testimonial: updated });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidateTag("testimonials");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
