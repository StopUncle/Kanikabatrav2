/**
 * Welcome-post body for The Consilium.
 *
 * Shared between the auto-activation path (/api/consilium/subscription/
 * activate) and the admin one-click refresh endpoint. Bump WELCOME_VERSION
 * whenever the copy changes so existing rows get upgraded in-place
 * instead of leaving pre-v2 text sitting pinned on the feed forever.
 */

export const WELCOME_VERSION = 2;

export const WELCOME_TITLE = "Welcome to The Consilium — Read Before Posting";

export function buildWelcomeContent(): string {
  return [
    "This is your space. A private community navigating power dynamics, dark psychology, and the realities no one else talks about.",
    "",
    "**What's inside**",
    "",
    "• **The Feed** — posts, discussions, and announcements from Kanika.",
    "• **Voice Notes** — raw, unfiltered insights you won't hear on the podcast.",
    "• **The Classroom** — courses on dark psychology, pattern recognition, and career strategy.",
    "• **The Dark Mirror Simulator** — interactive scenarios that teach you what the manipulation feels like from the inside.",
    "• **Forum + Chat** — members-only threads and real-time rooms.",
    "",
    "**House rules — read these**",
    "",
    "This community is vetted, moderated, and watermarked. Breaking any of the below earns a warning first, a permanent ban and IP-level block on the second offense.",
    "",
    "• **No sexual talk.** Zero. This is a strategy community, not a personal ads board. Flirting with other members, sexually-explicit commentary, or DM sliding gets you removed immediately.",
    "• **No insults toward other members.** Disagree hard if you want — attack the idea, never the person. Name-calling, mockery, and pile-ons are bannable.",
    "• **No filming, screen-recording, or screenshotting what's inside.** What Kanika shares here stays here. Every page is watermarked with your account's unique session ID. If content from the Consilium appears on TikTok, Twitter, YouTube, Discord, or a podcast, we will identify the exact account that recorded it and permanently ban it — along with IP-level blocks.",
    "• **No doxxing or sharing other members' private information.** Their email, real name, DMs to you, what they said in chat — all off-limits outside the walls.",
    "• **No recruiting members to outside paid services.** Your coaching business / OnlyFans / newsletter isn't welcome here. This is Kanika's room. Build your own elsewhere.",
    "• **No spam, self-promotion, or affiliate links.** The feed is for conversation, not conversion.",
    "• **No harassment — DMs or otherwise.** Members are free to say no, ignore, or block. If someone tells you to stop, stop.",
    "• **No impersonation.** Don't pretend to be Kanika, another member, or someone with credentials you don't have.",
    "• **No sharing the book, course videos, or voice notes.** Piracy gets the account banned and the content revoked.",
    "",
    "Every comment is reviewed. Every post is watermarked. Every ban is permanent.",
    "",
    "Welcome to the other side.",
  ].join("\n");
}
