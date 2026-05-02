/**
 * POST /api/admin/tells — create a Tell.
 *
 * Auth: admin session cookie.
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

const ChoiceSchema = z.object({
  id: z.string().min(1).max(60),
  text: z.string().min(1).max(500),
  isCorrect: z.boolean(),
  why: z.string().min(1).max(800),
});

const Body = z.object({
  number: z.number().int().min(1).max(100_000),
  track: z.enum([
    "DARK_PSYCH",
    "RED_FLAGS",
    "CROSS_SEX",
    "POWER",
    "REFUSAL",
    "SELF_REG",
  ]),
  axes: z
    .array(z.enum(["READ", "SPOT", "REPLY", "REFUSE", "CALIBRATE", "HOLD"]))
    .min(1)
    .max(2),
  difficulty: z.number().int().min(1).max(5),
  artifact: z.unknown(),
  question: z.string().min(1).max(500),
  choices: z.array(ChoiceSchema).length(4),
  reveal: z.string().min(1).max(2000),
  scheduleDate: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
});

function slugify(s: string, n: number): string {
  const base = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return base ? `${base}-${n}` : `tell-${n}`;
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  if (body.choices.filter((c) => c.isCorrect).length !== 1) {
    return NextResponse.json(
      { error: "Exactly one choice must be marked correct." },
      { status: 400 },
    );
  }

  const slug = slugify(body.question, body.number);

  try {
    const tell = await prisma.tell.create({
      data: {
        number: body.number,
        slug,
        format: "DIAGNOSE",
        track: body.track,
        axes: body.axes,
        difficulty: body.difficulty,
        artifact: body.artifact as Prisma.InputJsonValue,
        question: body.question,
        choices: body.choices as unknown as Prisma.InputJsonValue,
        reveal: body.reveal,
        scheduleDate: body.scheduleDate
          ? new Date(body.scheduleDate)
          : null,
        status: body.status,
      },
    });
    return NextResponse.json({ id: tell.id });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not create Tell", detail: (err as Error).message },
      { status: 400 },
    );
  }
}
