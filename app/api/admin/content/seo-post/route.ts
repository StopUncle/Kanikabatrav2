/**
 * POST /api/admin/content/seo-post — generate a full SEO blog post (MDX)
 * from a keyword/topic. Auth: admin session.
 *
 * Returns a complete, publish-ready MDX file (frontmatter + body) plus a
 * suggested filename slug. Kanika finishes it and saves it to
 * content/posts/<slug>.mdx. Drafting only; nothing is written here.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin/auth";
import { generateSeoPost, SeoPostInputError } from "@/lib/content/seo-post";
import { logger } from "@/lib/logger";

export const maxDuration = 300;

const Body = z.object({ topic: z.string().min(1).max(400) });

export async function POST(request: NextRequest) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: (err as Error).message },
      { status: 400 },
    );
  }

  const dateISO = new Date().toISOString().slice(0, 10);
  try {
    const result = await generateSeoPost(body.topic, dateISO);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof SeoPostInputError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    logger.error(
      "[content/seo-post] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json(
      { error: "Could not generate the post. Try again." },
      { status: 502 },
    );
  }
}
