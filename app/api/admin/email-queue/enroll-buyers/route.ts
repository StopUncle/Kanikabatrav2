import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { buildBookBuyerSequence } from "@/lib/email-sequences";

function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    console.error("ADMIN_SECRET environment variable not configured");
    return false;
  }

  const providedSecret = request.headers.get("x-admin-secret");
  return providedSecret === adminSecret;
}

export async function POST(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json(
      { error: "Unauthorized - valid admin credentials required" },
      { status: 401 },
    );
  }

  try {
    const buyers = await prisma.purchase.findMany({
      where: { type: "BOOK", status: "COMPLETED" },
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
