import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

export async function GET(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { type: "BOOK" },
      select: {
        id: true,
        customerEmail: true,
        customerName: true,
        amount: true,
        status: true,
        productVariant: true,
        downloadCount: true,
        maxDownloads: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to 50 most recent
    });

    const stats = {
      total: purchases.length,
      premium: purchases.filter((p) => p.productVariant === "PREMIUM").length,
      standard: purchases.filter((p) => p.productVariant !== "PREMIUM").length,
      revenue: purchases.reduce((sum, p) => sum + (p.amount || 0), 0),
    };

    return NextResponse.json({
      success: true,
      purchases,
      stats,
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 },
    );
  }
}
