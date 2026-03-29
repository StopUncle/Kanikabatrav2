import { NextRequest, NextResponse } from "next/server";
import { sendCoachingQuestionnaire } from "@/lib/email";
import { prisma } from "@/lib/prisma";

interface QuestionnaireData {
  // Basic Information
  preferredName: string;
  age: string;
  timezone: string;
  availability: string[];
  urgency: string;

  // Background & Context
  currentSituation: string;
  primaryChallenges: string;
  previousTherapy: string;

  // Mental Health Screening
  mentalHealthHistory: string;
  currentMedication: string;
  suicidalThoughts: string;
  substanceUse: string;
  traumaHistory: string;

  // Goals & Expectations
  specificGoals: string;
  successMeasures: string;
  expectations: string;
  timeCommitment: string;

  // Dark Psychology Interest
  psychologyInterest: string;
  manipulationExperience: string;
  ethicalUse: string;

  // Additional Information
  additionalInfo: string;
  consentAgreement: boolean;
  understandingConfirmation: boolean;
}

interface RequestBody {
  packageName: string;
  customerName: string;
  customerEmail: string;
  orderId: string;
  questionnaire: QuestionnaireData;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    // Validate required fields
    if (
      !body.packageName ||
      !body.customerName ||
      !body.customerEmail ||
      !body.questionnaire
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { questionnaire } = body;

    // Validate essential questionnaire fields
    const requiredFields = [
      "preferredName",
      "age",
      "timezone",
      "urgency",
      "currentSituation",
      "primaryChallenges",
      "mentalHealthHistory",
      "suicidalThoughts",
      "specificGoals",
      "timeCommitment",
    ];

    for (const field of requiredFields) {
      if (!questionnaire[field as keyof QuestionnaireData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Check consent agreements
    if (
      !questionnaire.consentAgreement ||
      !questionnaire.understandingConfirmation
    ) {
      return NextResponse.json(
        { error: "Both consent agreements must be accepted" },
        { status: 400 },
      );
    }

    // Check for mental health crisis indicators
    if (questionnaire.suicidalThoughts === "Currently") {
      return NextResponse.json(
        {
          error:
            "This coaching program is not suitable for individuals currently experiencing suicidal thoughts. Please seek immediate professional help.",
        },
        { status: 400 },
      );
    }

    // Store questionnaire data in DB as backup (so it's never lost even if email fails)
    try {
      const purchase = await prisma.purchase.findFirst({
        where: { paypalOrderId: body.orderId },
        include: { sessions: true },
      });

      if (purchase?.sessions?.length) {
        await prisma.coachingSession.update({
          where: { id: purchase.sessions[0].id },
          data: { questionnaireData: JSON.parse(JSON.stringify(questionnaire)) },
        });
        console.log("Questionnaire data saved to DB for session:", purchase.sessions[0].id);
      } else {
        console.warn("No coaching session found for order:", body.orderId);
      }
    } catch (dbError) {
      console.error("Failed to save questionnaire to DB (email will still be attempted):", dbError);
    }

    // Send email notification to Kanika
    const emailSent = await sendCoachingQuestionnaire({
      packageName: body.packageName,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      orderId: body.orderId,
      questionnaire,
    });

    if (!emailSent) {
      console.error("Failed to send questionnaire email for order:", body.orderId);
    }

    // Log the submission for tracking
    console.log("Coaching questionnaire submitted:", {
      orderId: body.orderId,
      customerEmail: body.customerEmail,
      packageName: body.packageName,
      urgency: questionnaire.urgency,
      mentalHealthRisk: questionnaire.suicidalThoughts,
      traumaLevel: questionnaire.traumaHistory,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Questionnaire submitted successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Questionnaire submission error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
