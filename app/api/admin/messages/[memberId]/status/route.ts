import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";
import type { ConversationStatus } from "@prisma/client";

const VALID: ConversationStatus[] = ["OPEN", "DONE", "ARCHIVED"];

/**
 * POST /api/admin/messages/[memberId]/status  { status }
 *
 * Move a conversation between OPEN / DONE / ARCHIVED. "Done" clears it from
 * the needs-reply queue; a later member reply flips it back to OPEN (handled
 * in the member send route), so nothing gets permanently buried.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> },
) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { memberId } = await params;

  let body: { status?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = body.status as ConversationStatus;
  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const convo = await prisma.conversation.findUnique({
    where: { memberId },
    select: { id: true },
  });
  if (!convo) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 },
    );
  }

  await prisma.conversation.update({
    where: { id: convo.id },
    data: { status },
  });

  return NextResponse.json({ status });
}
