import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { requireAdminSession } from "@/lib/admin/auth";
import { getAdminUserId } from "@/lib/auth/server-auth";
import { isR2Configured, uploadToR2 } from "@/lib/storage/r2";
import { transcodeToMp3 } from "@/lib/audio/transcode";
import { notifyAskerOfAnswer } from "@/lib/questions/notify-asker";
import { sendPushToUsers } from "@/lib/push";

/**
 * Answer a member question from Studio, by voice or in writing.
 *
 * One request does the whole job, because the alternative is a phone
 * holding three sequential fetches together over a patchy connection:
 * upload the audio, create the answering FeedPost, link it to the
 * question, notify the asker, and (for a voice note) tell the members.
 *
 * Auth is the admin PIN session, not the member JWT that
 * /api/consilium/voice-notes/upload uses. Studio is a separate app with a
 * separate door, so it carries its own upload rather than borrowing one
 * that would force a second login.
 *
 * A written answer is posted as ANNOUNCEMENT, whose push category is
 * opt-in only, so text answers reach the asker (always) and the members
 * who asked to hear about everything. A voice note fans out to every
 * active member exactly as a voice note posted from /admin does.
 */

const MAX_AUDIO_BYTES = 50 * 1024 * 1024;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const { id } = await params;

  const question = await prisma.memberQuestion.findUnique({
    where: { id },
    select: { id: true, userId: true, content: true, status: true },
  });
  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form body" }, { status: 400 });
  }

  const content = String(form.get("content") ?? "").trim();
  const audio = form.get("audio");
  const hasAudio = audio instanceof File && audio.size > 0;

  // A voice note still needs a line of text: it is the feed headline and
  // the only thing a member sees before pressing play.
  if (!content) {
    return NextResponse.json(
      { error: hasAudio ? "Add a line describing the answer." : "Write an answer." },
      { status: 400 },
    );
  }

  let voiceNoteUrl: string | null = null;

  if (hasAudio) {
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: "Storage is not configured, so voice notes cannot be saved." },
        { status: 503 },
      );
    }
    if (audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: "That recording is too long (max 50MB)." },
        { status: 400 },
      );
    }

    // Browsers disagree about what they record: Chrome gives webm/opus,
    // iOS Safari gives mp4/aac. Everything becomes mp3 so the member-side
    // player has one format to deal with.
    const raw = Buffer.from(await audio.arrayBuffer());
    let mp3: Buffer;
    try {
      mp3 = await transcodeToMp3(raw);
    } catch (err) {
      logger.error("[studio/answer] transcode failed", err as Error, {
        questionId: id,
        size: raw.length,
      });
      return NextResponse.json(
        { error: "Could not convert that recording. Try again." },
        { status: 422 },
      );
    }

    const key = `voice-notes/vn-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.mp3`;
    try {
      const uploaded = await uploadToR2(key, mp3, "audio/mpeg");
      voiceNoteUrl = uploaded.url;
    } catch (err) {
      logger.error("[studio/answer] R2 upload failed", err as Error, {
        questionId: id,
        key,
      });
      return NextResponse.json(
        { error: "Upload failed. Try again." },
        { status: 502 },
      );
    }
  }

  const authorId = await getAdminUserId();
  const type = voiceNoteUrl ? ("VOICE_NOTE" as const) : ("ANNOUNCEMENT" as const);
  // The headline is the answer's first line for text, or the caption she
  // typed for a voice note. Trimmed to the column's limit.
  const title = content.slice(0, 200);

  // The post and the link are one transaction: a FeedPost that no question
  // points at is an orphan the member is never told about.
  const post = await prisma.$transaction(async (tx) => {
    const created = await tx.feedPost.create({
      data: {
        title,
        content,
        type,
        voiceNoteUrl,
        authorId: authorId ?? undefined,
      },
      select: { id: true, title: true, type: true },
    });
    await tx.memberQuestion.update({
      where: { id },
      data: {
        status: "ANSWERED",
        answerPostId: created.id,
        answeredAt: new Date(),
      },
    });
    return created;
  });

  // The asker's email and push. Fire-and-forget: she has already answered,
  // and a mail failure must not read to her as a failure to publish.
  void notifyAskerOfAnswer({
    questionId: question.id,
    userId: question.userId,
    questionContent: question.content,
    answerPostId: post.id,
  }).catch((err) =>
    logger.error("[studio/answer] asker notify failed", err as Error, {
      questionId: id,
    }),
  );

  // A voice note is new media for everyone, not just the asker, and is
  // announced exactly as one posted from /admin would be.
  if (type === "VOICE_NOTE") {
    void (async () => {
      const members = await prisma.user.findMany({
        where: { isBot: false, communityMembership: { status: "ACTIVE" } },
        select: { id: true },
      });
      await sendPushToUsers(
        members.map((m) => m.id),
        "voiceNote",
        {
          title: "New voice note from Kanika",
          body: post.title,
          url: `/consilium/feed/${post.id}`,
          tag: "feed-drop",
        },
      );
    })().catch((err) =>
      logger.error("[studio/answer] fan-out failed", err as Error, {
        postId: post.id,
      }),
    );
  }

  return NextResponse.json({ success: true, postId: post.id }, { status: 201 });
}
