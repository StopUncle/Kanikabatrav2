/**
 * PATCH /api/admin/generated-scenarios/[id] — publish or reject a draft.
 *
 * Publish re-runs the structural validator as a final gate (the JSON
 * could predate a validator fix) and stamps publishedAt. Reject keeps
 * the row for the record; rejected ids never resolve on the play
 * surface.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { validateScenarioGraph } from "@/lib/simulator/generated";

const Body = z.object({
  action: z.enum(["publish", "reject"]),
});

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const { id } = await context.params;

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  const row = await prisma.generatedScenario.findUnique({ where: { id } });
  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.action === "reject") {
    const updated = await prisma.generatedScenario.update({
      where: { id },
      data: { status: "REJECTED", publishedAt: null },
      select: { id: true, status: true },
    });
    return NextResponse.json({ item: updated });
  }

  const { failures } = validateScenarioGraph(row.json);
  if (failures.length > 0) {
    await prisma.generatedScenario.update({
      where: { id },
      data: { status: "REJECTED", notes: failures.join("\n") },
    });
    return NextResponse.json(
      { error: "Failed validation on publish", failures },
      { status: 422 },
    );
  }

  const updated = await prisma.generatedScenario.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date(), notes: null },
    select: { id: true, status: true, publishedAt: true },
  });
  return NextResponse.json({ item: updated });
}
