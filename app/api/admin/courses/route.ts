import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const courses = await prisma.course.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        modules: {
          orderBy: { sortOrder: "asc" },
          include: {
            _count: { select: { lessons: true } },
          },
        },
        _count: { select: { enrollments: true } },
      },
    });

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { title, description, thumbnailUrl, price, tier, isActive } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 },
      );
    }

    const slug = generateSlug(title);

    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A course with this title already exists" },
        { status: 409 },
      );
    }

    const course = await prisma.course.create({
      data: {
        title: title.trim(),
        slug,
        description: description?.trim() || null,
        thumbnailUrl: thumbnailUrl?.trim() || null,
        price: parseFloat(price) || 0,
        tier: tier || "standard",
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
