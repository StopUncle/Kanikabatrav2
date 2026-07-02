/**
 * Shared poll → client-shape formatter used by every site that builds
 * FeedPostData (feed page, paginated posts API, post detail page), so
 * counts/viewerVote math lives in exactly one place.
 */

export interface PollRow {
  question: string;
  options: string[];
  votes: { optionIndex: number; userId: string }[];
}

export interface FormattedPoll {
  question: string;
  options: string[];
  counts: number[];
  viewerVote: number | null;
}

export function formatPoll(
  poll: PollRow | null,
  viewerId: string | null,
): FormattedPoll | null {
  if (!poll) return null;
  const counts = poll.options.map(() => 0);
  let viewerVote: number | null = null;
  for (const vote of poll.votes) {
    if (vote.optionIndex >= 0 && vote.optionIndex < counts.length) {
      counts[vote.optionIndex] += 1;
    }
    if (viewerId !== null && vote.userId === viewerId) {
      viewerVote = vote.optionIndex;
    }
  }
  return { question: poll.question, options: poll.options, counts, viewerVote };
}

/** Prisma `include` fragment for the poll relation, matching PollRow. */
export const pollInclude = {
  select: {
    question: true,
    options: true,
    votes: { select: { optionIndex: true, userId: true } },
  },
} as const;
