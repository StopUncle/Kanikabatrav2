import { NextRequest, NextResponse } from "next/server";
import { sendQuizResultsEmailForResult } from "@/lib/quiz-results-email";
import { prisma } from "@/lib/prisma";

interface SendResultsRequest {
  quizResultId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendResultsRequest = await request.json();

    if (!body.quizResultId) {
      return NextResponse.json(
        { error: "Missing quizResultId" },
        { status: 400 },
      );
    }

    const status = await sendQuizResultsEmailForResult(body.quizResultId);

    switch (status) {
      case "not_found":
        return NextResponse.json(
          { error: "Quiz result not found" },
          { status: 404 },
        );
      case "not_paid":
        return NextResponse.json(
          { error: "Payment required to send results" },
          { status: 403 },
        );
      case "no_email":
        return NextResponse.json(
          { error: "No email address on file" },
          { status: 400 },
        );
      case "already_sent": {
        const existing = await prisma.quizResult.findUnique({
          where: { id: body.quizResultId },
          select: { email: true },
        });
        return NextResponse.json({
          success: true,
          message: "Email already sent",
          email: existing?.email,
        });
      }
      case "sent": {
        const sentTo = await prisma.quizResult.findUnique({
          where: { id: body.quizResultId },
          select: { email: true },
        });
        return NextResponse.json({
          success: true,
          email: sentTo?.email,
          message: "Results sent successfully",
        });
      }
      case "failed":
      default:
        // Email transport failed. Returning 200 with success:false meant
        // client code calling `response.ok` would treat it as success, user
        // told to check inbox, no email actually sent. Return 502 so the UI
        // can retry or surface a real error to the user.
        return NextResponse.json(
          {
            success: false,
            message: "Email delivery failed. Please try again or contact support.",
          },
          { status: 502 },
        );
    }
  } catch (error) {
    console.error("Error sending quiz results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
