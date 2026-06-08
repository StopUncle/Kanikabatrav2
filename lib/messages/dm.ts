/**
 * Shared helpers for the 1-on-1 Kanika <-> member direct-message channel.
 *
 * Both sides (admin panel and member feed) talk over the same Pusher
 * channel and exchange the same message shape, so the channel name, event
 * name, and serialiser live here rather than being duplicated in each route.
 */

import type { DirectMessage } from "@prisma/client";

/** Pusher channel for a single conversation. Private — only the member it
 *  belongs to and an authenticated admin may subscribe (see the pusher auth
 *  route). */
export function dmChannel(conversationId: string): string {
  return `private-dm-${conversationId}`;
}

/** Event name a new message is published under, both directions. */
export const DM_MESSAGE_EVENT = "message";

/** The wire shape sent to clients and over Pusher. Dates are ISO strings so
 *  it survives JSON without a Date round-trip mismatch between the realtime
 *  payload and the initial fetch. */
export interface DirectMessageDTO {
  id: string;
  conversationId: string;
  fromAdmin: boolean;
  content: string;
  /** R2 URL when this is a voice message, else null. */
  voiceNoteUrl: string | null;
  createdAt: string;
  readAt: string | null;
}

export function serializeMessage(m: DirectMessage): DirectMessageDTO {
  return {
    id: m.id,
    conversationId: m.conversationId,
    fromAdmin: m.fromAdmin,
    content: m.content,
    voiceNoteUrl: m.voiceNoteUrl ?? null,
    createdAt: m.createdAt.toISOString(),
    readAt: m.readAt ? m.readAt.toISOString() : null,
  };
}

/** Hard cap on a single message body. Long enough for a real reply, short
 *  enough to keep the thread a conversation and not an essay dump. */
export const DM_MAX_LENGTH = 4000;
