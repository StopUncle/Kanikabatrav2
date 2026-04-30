import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCoachingQuestionnaire, sendEmail } from "@/lib/email";
import { requireAdminSession } from "@/lib/admin/auth";

// GET: List all coaching purchases and their session/questionnaire status
export async function GET(_request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    // Find all coaching purchases, plus any high-amount purchases that might be miscategorized
    const purchases = await prisma.purchase.findMany({
      where: {
        OR: [
          { type: "COACHING" },
          { amount: { gte: 200 } },
        ],
      },
      include: {
        sessions: {
          select: {
            id: true,
            packageName: true,
            status: true,
            questionnaireData: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      purchases: purchases.map((p) => ({
        id: p.id,
        type: p.type,
        customerEmail: p.customerEmail,
        customerName: p.customerName,
        amount: p.amount,
        paypalOrderId: p.paypalOrderId,
        createdAt: p.createdAt,
        sessions: p.sessions,
        hasQuestionnaire: p.sessions.some((s) => s.questionnaireData !== null),
      })),
    });
  } catch (error) {
    console.error("Admin resend-coaching GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Fix a purchase and send coaching notification
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { purchaseId, sendTo, fixType, packageName } = body as {
      purchaseId: string;
      sendTo: string[];
      fixType?: boolean;
      packageName?: string;
    };

    if (!purchaseId) {
      return NextResponse.json({ error: "purchaseId is required" }, { status: 400 });
    }

    if (!sendTo || !sendTo.length) {
      return NextResponse.json({ error: "sendTo array of emails is required" }, { status: 400 });
    }

    // Find the purchase
    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: { sessions: true },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    // Fix the purchase type if requested
    if (fixType && purchase.type !== "COACHING") {
      await prisma.purchase.update({
        where: { id: purchaseId },
        data: { type: "COACHING" },
      });
    }

    // Create CoachingSession if none exists
    let session = purchase.sessions[0];
    if (!session) {
      session = await prisma.coachingSession.create({
        data: {
          purchaseId: purchase.id,
          packageName: packageName || "Single Session",
          sessionCount: 1,
          status: "PENDING_SCHEDULING",
        },
      });
    }

    // Check if there's questionnaire data stored
    const questionnaireData = session.questionnaireData as Record<string, unknown> | null;

    // Send notification to each email address
    const results: { email: string; sent: boolean }[] = [];

    for (const email of sendTo) {
      if (questionnaireData) {
        // Send full questionnaire email to specified address
        const sent = await sendCoachingQuestionnaire({
          packageName: session.packageName,
          customerName: purchase.customerName,
          customerEmail: purchase.customerEmail,
          orderId: purchase.paypalOrderId || purchase.id,
          sendTo: email,
          questionnaire: questionnaireData as Parameters<typeof sendCoachingQuestionnaire>[0]["questionnaire"],
        });
        results.push({ email, sent });
      } else {
        // No questionnaire data, send coaching purchase notification with available info
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Coaching Purchase. Questionnaire Not Yet Submitted</h1>
            </div>
            <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
              <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #d4af37; margin-top: 0;">Client Details</h2>
                <p style="color: #94a3b8;"><strong style="color: #d4af37;">Name:</strong> ${purchase.customerName}</p>
                <p style="color: #94a3b8;"><strong style="color: #d4af37;">Email:</strong> ${purchase.customerEmail}</p>
                <p style="color: #94a3b8;"><strong style="color: #d4af37;">Package:</strong> ${session.packageName}</p>
                <p style="color: #94a3b8;"><strong style="color: #d4af37;">Amount:</strong> $${purchase.amount}</p>
                <p style="color: #94a3b8;"><strong style="color: #d4af37;">PayPal Order:</strong> ${purchase.paypalOrderId || "N/A"}</p>
                <p style="color: #94a3b8;"><strong style="color: #d4af37;">Purchase Date:</strong> ${purchase.createdAt.toLocaleString()}</p>
              </div>
              <div style="background: #2d1b1b; padding: 20px; border-radius: 8px; border: 1px solid #8b0000;">
                <h3 style="color: #ff6b6b; margin-top: 0;">Note</h3>
                <p style="color: #ffccd5;">The pre-session questionnaire has not been submitted through the website form. The client may have experienced a technical issue, the purchase was initially miscategorized as a book purchase, preventing the questionnaire modal from appearing.</p>
                <p style="color: #ffccd5;">The client sent a contact form message saying: <em>"I have filled the questionnaire. Waiting for the call. Best, NM..."</em></p>
                <p style="color: #ffccd5;"><strong>Recommended action:</strong> Reach out to the client at ${purchase.customerEmail} to schedule the session and optionally collect questionnaire responses directly.</p>
              </div>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #666; font-size: 12px;">Sent by admin resend tool on ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        `;

        const sent = await sendEmail({
          to: email,
          subject: `Coaching Purchase, ${purchase.customerName} ($${purchase.amount}). Action Required`,
          html,
          replyTo: purchase.customerEmail,
        });
        results.push({ email, sent });
      }
    }

    // success only when EVERY email actually went out. Returning success:true
    // unconditionally meant the admin UI showed a green toast even when no
    // emails left the building.
    const allSent = results.length > 0 && results.every((r) => r.sent);
    return NextResponse.json(
      {
        success: allSent,
        purchaseId: purchase.id,
        purchaseType: fixType ? "COACHING" : purchase.type,
        sessionId: session.id,
        hasQuestionnaire: !!questionnaireData,
        emailResults: results,
        message: allSent
          ? "All coaching emails resent."
          : "Some or all email deliveries failed, check emailResults.",
      },
      { status: allSent ? 200 : 207 },
    );
  } catch (error) {
    console.error("Admin resend-coaching POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
