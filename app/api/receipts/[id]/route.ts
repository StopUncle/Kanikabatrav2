/**
 * GET    /api/receipts/[id] — fetch a single Receipt the user owns.
 * DELETE /api/receipts/[id] — delete a Receipt.
 */

import { NextResponse, type NextRequest } from "next/server";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { deleteReceipt, getReceipt } from "@/lib/receipts/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }
  const row = await getReceipt(ctx.userId, id);
  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    receipt: {
      id: row.id,
      label: row.label,
      response: row.response,
      createdAt: row.createdAt,
    },
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ctx = await resolveTellContext();
  if (!ctx.userId) {
    return NextResponse.json({ error: "Auth required" }, { status: 401 });
  }
  await deleteReceipt(ctx.userId, id);
  return NextResponse.json({ ok: true });
}
