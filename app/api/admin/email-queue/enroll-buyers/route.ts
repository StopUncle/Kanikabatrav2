import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { REAL_BOOK_VARIANT_FILTER } from "@/lib/book/ownership";
import { buildBookBuyerSequence } from "@/lib/email-sequences";
import { requireAdminSession } from "@/lib/admin/auth";

export async function POST(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    // Variant-filtered: subscription and Ask rows also carry type "BOOK",
    // and without the filter this bulk-enrolled every subscriber into the
    // book-buyer welcome sequence for a book they never bought.
    const buyers = await prisma.purchase.findMany({
      where: { type: "BOOK", status: "COMPLETED", ...REAL_BOOK_VARIANT_FILTER },
      select: { customerEmail: true, customerName: true },
      distinct: ["customerEmail"],
    });

    let enrolled = 0;
    let skipped = 0;

    for (const buyer of buyers) {
      const existing = await prisma.emailQueue.findFirst({
        where: {
          recipientEmail: buyer.customerEmail,
          sequence: "book-buyer-welcome",
        },
      });

      if (existing) {
        skipped++;
        continue;
      }

      const trialToken = crypto.randomBytes(24).toString("hex");
      const entries = buildBookBuyerSequence(
        buyer.customerEmail,
        buyer.customerName,
        trialToken,
      );

      await prisma.emailQueue.createMany({ data: entries });
      enrolled++;
    }

    return NextResponse.json({
      success: true,
      enrolled,
      skipped,
      total: buyers.length,
    });
  } catch (error) {
    console.error("Error enrolling buyers:", error);
    return NextResponse.json(
      { error: "Failed to enroll buyers into email sequence" },
      { status: 500 },
    );
  }
}
