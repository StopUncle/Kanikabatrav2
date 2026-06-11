"use client";

import Pusher from "pusher-js";

let pusherClient: Pusher | null = null;

export function getPusherClient(): Pusher | null {
  if (typeof window === "undefined") return null;

  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!key || !cluster) {
    console.warn("Pusher client keys not configured");
    return null;
  }

  if (!pusherClient) {
    pusherClient = new Pusher(key, {
      cluster,
      authEndpoint: "/api/community/pusher/auth",
    });
  }

  return pusherClient;
}

export function subscribeToChatRoom(
  roomSlug: string,
  isPremium: boolean,
  callbacks: {
    onMessage?: (data: ChatMessageEvent) => void;
    onUserJoin?: (data: UserPresenceEvent) => void;
    onUserLeave?: (data: UserPresenceEvent) => void;
    onTyping?: (data: TypingEvent) => void;
  },
) {
  const client = getPusherClient();
  if (!client) return null;

  const channelName = isPremium
    ? `private-premium-${roomSlug}`
    : `presence-chat-${roomSlug}`;

  const channel = client.subscribe(channelName);

  if (callbacks.onMessage) {
    channel.bind("message", callbacks.onMessage);
  }

  if (callbacks.onUserJoin) {
    channel.bind("pusher:member_added", callbacks.onUserJoin);
  }

  if (callbacks.onUserLeave) {
    channel.bind("pusher:member_removed", callbacks.onUserLeave);
  }

  if (callbacks.onTyping) {
    channel.bind("typing", callbacks.onTyping);
  }

  return {
    channel,
    unsubscribe: () => {
      client.unsubscribe(channelName);
    },
  };
}

export function subscribeToUserNotifications(
  userId: string,
  onNotification: (data: NotificationEvent) => void,
) {
  const client = getPusherClient();
  if (!client) return null;

  const channel = client.subscribe(`private-user-${userId}`);
  channel.bind("notification", onNotification);

  return {
    channel,
    unsubscribe: () => {
      client.unsubscribe(`private-user-${userId}`);
    },
  };
}

/**
 * Subscribe to a 1-on-1 direct-message thread. Used by both the admin inbox
 * and the member messages page. The "message" event carries { message } with
 * the same DTO the initial fetch returns, so a new message can be appended
 * without a refetch. Authorisation (owning member OR admin) is enforced
 * server-side in the pusher auth route.
 */
export function subscribeToDirectMessages(
  conversationId: string,
  onMessage: (data: { message: DirectMessageWireEvent }) => void,
) {
  const client = getPusherClient();
  if (!client) return null;

  const channelName = `private-dm-${conversationId}`;
  const channel = client.subscribe(channelName);
  channel.bind("message", onMessage);

  return {
    channel,
    unsubscribe: () => {
      client.unsubscribe(channelName);
    },
  };
}

export interface DirectMessageWireEvent {
  id: string;
  conversationId: string;
  fromAdmin: boolean;
  content: string;
  voiceNoteUrl: string | null;
  createdAt: string;
  readAt: string | null;
}

export interface ChatMessageEvent {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  type: "TEXT" | "IMAGE" | "SYSTEM";
}

export interface UserPresenceEvent {
  id: string;
  info: {
    name: string;
    avatar?: string;
  };
}

export interface TypingEvent {
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface NotificationEvent {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  createdAt: string;
}
