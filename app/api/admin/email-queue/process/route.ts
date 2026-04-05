import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

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
    const body = await request.json().catch(() => ({}));
    const dryRun = body.dryRun !== false;

    const pendingEmails = await prisma.emailQueue.findMany({
      where: {
        status: "PENDING",
        scheduledAt: { lte: new Date() },
      },
      orderBy: { scheduledAt: "asc" },
      take: 50,
    });

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        processed: pendingEmails.length,
        sent: 0,
        failed: 0,
        emails: pendingEmails.map((e) => ({
          id: e.id,
          recipientEmail: e.recipientEmail,
          subject: e.subject,
          sequence: e.sequence,
          step: e.step,
          scheduledAt: e.scheduledAt,
        })),
      });
    }

    let sent = 0;
    let failed = 0;

    for (const email of pendingEmails) {
      try {
        await sendEmail({
          to: email.recipientEmail,
          subject: email.subject,
          html: email.htmlBody,
        });

        await prisma.emailQueue.update({
          where: { id: email.id },
          data: { status: "SENT", sentAt: new Date() },
        });

        sent++;
      } catch (error) {
        console.error(
          `Failed to send email ${email.id} to ${email.recipientEmail}:`,
          error,
        );

        await prisma.emailQueue.update({
          where: { id: email.id },
          data: { status: "FAILED" },
        });

        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      dryRun: false,
      processed: pendingEmails.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Error processing email queue:", error);
    return NextResponse.json(
      { error: "Failed to process email queue" },
      { status: 500 },
    );
  }
}
