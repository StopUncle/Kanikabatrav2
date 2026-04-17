import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import {
  sendApplicationConfirmation,
  sendAdminApplicationAlert,
} from "@/lib/email";
import { logger } from "@/lib/logger";
import { z } from "zod";

// Server-side age check. Defense in depth: the client also enforces this
// but a determined attacker can bypass the client, so we revalidate here.
function calculateAge(isoDate: string): number {
  const birth = new Date(isoDate);
  if (isNaN(birth.getTime())) return -1;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hadBirthdayThisYear) age--;
  return age;
}

const applicationSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine((s) => {
      const age = calculateAge(s);
      return age >= 18 && age <= 100;
    }, "Applicant must be 18 or older"),
  displayName: z
    .string()
    .trim()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Z0-9_.\- ]+$/),
  whyJoin: z.string().min(20).max(1000),
  whatHope: z.string().min(20).max(1000),
  howFound: z.string().min(1).max(500),
  confirmTruthful: z.literal(true),
  agreeToGuidelines: z.literal(true),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid application", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const existing = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (existing) {
      if (existing.status === "ACTIVE") {
        return NextResponse.json({ error: "Already an active member" }, { status: 400 });
      }
      if (existing.status === "SUSPENDED") {
        return NextResponse.json({ error: "Your membership has been suspended" }, { status: 403 });
      }
      if (existing.status === "PENDING") {
        return NextResponse.json({ error: "Application already submitted — we'll review it soon" }, { status: 400 });
      }
      if (existing.status === "APPROVED") {
        return NextResponse.json({ error: "Your application is already approved — complete payment to activate" }, { status: 400 });
      }
      if (existing.status === "CANCELLED") {
        // Allow re-application for rejected users — reset their membership
        // to PENDING so they go through the approval flow again. The admin
        // can see prior rejection history in applicationData.
        await prisma.communityMembership.update({
          where: { userId: user.id },
          data: { status: "EXPIRED" },
        });
        // Fall through to the upsert below, which will set it to PENDING
      }
      // EXPIRED falls through — natural expiration allows re-application
    }

    // Save gender + displayName on the user record. Gender drives the
    // gender-split content filter; displayName is what other members see
    // everywhere (posts, comments, forum, chat) — real name is never
    // exposed to other members.
    await prisma.user.update({
      where: { id: user.id },
      data: {
        gender: parsed.data.gender,
        displayName: parsed.data.displayName,
      },
    });

    const membership = await prisma.communityMembership.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        status: "PENDING",
        applicationData: parsed.data,
        appliedAt: new Date(),
      },
      update: {
        status: "PENDING",
        applicationData: parsed.data,
        appliedAt: new Date(),
      },
    });

    // Fire-and-forget notification emails (do not block the response)
    const userRecord = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true, email: true },
    });
    const applicantName = userRecord?.name || "Applicant";
    const applicantEmail = userRecord?.email || user.email;

    Promise.all([
      sendApplicationConfirmation(applicantEmail, applicantName).catch((err) =>
        logger.error("Failed to send applicant confirmation", err as Error),
      ),
      sendAdminApplicationAlert({
        applicantName,
        applicantEmail,
        whyJoin: parsed.data.whyJoin,
        whatHope: parsed.data.whatHope,
        howFound: parsed.data.howFound,
      }).catch((err) =>
        logger.error("Failed to send admin application alert", err as Error),
      ),
    ]).catch(() => {
      // Already handled per-promise above; this catch is just defensive
    });

    return NextResponse.json(
      { success: true, membershipId: membership.id, status: "PENDING" },
      { status: 201 },
    );
  });
}

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        status: true,
        appliedAt: true,
        approvedAt: true,
        activatedAt: true,
      },
    });

    return NextResponse.json({ success: true, membership });
  });
}
