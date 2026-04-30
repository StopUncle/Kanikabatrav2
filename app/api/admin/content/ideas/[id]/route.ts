import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

const ALLOWED_HOOK_TYPES = [
  "FIRST_PERSON_MECHANISM",
  "DIAGNOSTIC_CORRECTION",
  "INTERIOR_MONOLOGUE",
  "METHOD_EXPOSURE",
];
const ALLOWED_L2 = [
  "INVALIDATE",
  "SPECIFICITY_ESCALATION",
  "PERSONAL_STAKE",
  "REFRAME",
];
const ALLOWED_PAYOFF = [
  "SPECIFIC_MECHANISM",
  "DIAGNOSTIC",
  "PROTECTIVE_INVERSION",
  "CONTINUATION",
];
const ALLOWED_DEEPENING = [
  "SECOND_EXAMPLE",
  "OBJECTION_HANDLE",
  "PERSONAL_DISCLOSURE",
  "ESCALATION",
];
const ALLOWED_CLOSE = [
  "FRAMEWORK_SUMMARY",
  "PROTECTIVE_HANDOFF",
  "DIAGNOSTIC_QUESTION",
  "IMPLIED_CATALOGUE",
];
const ALLOWED_FRAMES = ["PROTECTIVE", "PREDATORY", "NEUTRAL"];
const ALLOWED_STAGES = [
  "CONCEPT",
  "HOOK_DRAFTED",
  "LINES_DRAFTED",
  "READY_TO_FILM",
  "FILMED",
  "PUBLISHED",
];
const ALLOWED_VIDEO_FORMATS = ["LONG", "SHORT"];

function pickEnum(val: unknown, allowed: string[]): string | null | undefined {
  if (val === undefined) return undefined; // not in body, don't touch
  if (val === null || val === "") return null;
  if (typeof val === "string" && allowed.includes(val)) return val;
  return undefined; // invalid value, silently ignore
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = await request.json();
  const {
    status,
    notes,
    title,
    hook,
    format,
    line2,
    line3,
    setup,
    deepening,
    closeBeat,
    tail,
    hookType,
    line2Mechanism,
    line3Mechanism,
    deepeningMechanism,
    closeMechanism,
    frame,
    developmentStage,
    videoFormat,
    confessionId,
  } = body;

  const data: Record<string, unknown> = {};

  // Plain text fields: undefined = no change, "" = clear, value = set.
  if (status !== undefined) data.status = status;
  if (notes !== undefined) data.notes = notes || null;
  if (title !== undefined) data.title = title;
  if (hook !== undefined) data.hook = hook || null;
  if (format !== undefined) data.format = format || null;
  if (line2 !== undefined) data.line2 = line2 || null;
  if (line3 !== undefined) data.line3 = line3 || null;
  if (setup !== undefined) data.setup = setup || null;
  if (deepening !== undefined) data.deepening = deepening || null;
  if (closeBeat !== undefined) data.closeBeat = closeBeat || null;
  if (tail !== undefined) data.tail = tail || null;

  // Constrained fields: only accept whitelisted values.
  const ht = pickEnum(hookType, ALLOWED_HOOK_TYPES);
  if (ht !== undefined) data.hookType = ht;
  const l2m = pickEnum(line2Mechanism, ALLOWED_L2);
  if (l2m !== undefined) data.line2Mechanism = l2m;
  const l3m = pickEnum(line3Mechanism, ALLOWED_PAYOFF);
  if (l3m !== undefined) data.line3Mechanism = l3m;
  const dm = pickEnum(deepeningMechanism, ALLOWED_DEEPENING);
  if (dm !== undefined) data.deepeningMechanism = dm;
  const cm = pickEnum(closeMechanism, ALLOWED_CLOSE);
  if (cm !== undefined) data.closeMechanism = cm;
  const fr = pickEnum(frame, ALLOWED_FRAMES);
  if (fr !== undefined) data.frame = fr;

  // Stage must be a valid value if provided (no nulls, defaults to CONCEPT).
  if (developmentStage !== undefined) {
    if (
      typeof developmentStage === "string" &&
      ALLOWED_STAGES.includes(developmentStage)
    ) {
      data.developmentStage = developmentStage;
    }
  }
  // Video format: LONG | SHORT, defaults to LONG.
  if (videoFormat !== undefined) {
    if (
      typeof videoFormat === "string" &&
      ALLOWED_VIDEO_FORMATS.includes(videoFormat)
    ) {
      data.videoFormat = videoFormat;
    }
  }

  // Confession link. When transitioning to a new non-null id, bump that
  // confession's usedCount + lastUsedAt so the picker can de-prioritize it.
  // We don't decrement when unlinking, usedCount tracks total link events.
  let bumpConfessionId: string | null = null;
  if (confessionId !== undefined) {
    if (confessionId === null || confessionId === "") {
      data.confessionId = null;
    } else if (typeof confessionId === "string") {
      const current = await prisma.contentIdea.findUnique({
        where: { id },
        select: { confessionId: true },
      });
      data.confessionId = confessionId;
      if (current && current.confessionId !== confessionId) {
        bumpConfessionId = confessionId;
      }
    }
  }

  const idea = await prisma.contentIdea.update({
    where: { id },
    data,
  });

  if (bumpConfessionId) {
    await prisma.contentConfession.update({
      where: { id: bumpConfessionId },
      data: {
        usedCount: { increment: 1 },
        lastUsedAt: new Date(),
      },
    }).catch((err) => {
      // Non-fatal, the FK might not resolve if the confession was deleted
      // mid-flight. Log but don't fail the idea update.
      console.error("Failed to bump confession usedCount:", err);
    });
  }

  return NextResponse.json({ idea });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  await prisma.contentIdea.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
