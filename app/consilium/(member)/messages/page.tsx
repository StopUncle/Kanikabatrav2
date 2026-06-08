import MemberMessagesClient from "./MemberMessagesClient";

export const dynamic = "force-dynamic";

/**
 * Member-side direct messages — the other end of Kanika's inbox.
 *
 * One thread, with Kanika. Members can't start it (the page fetches their
 * existing thread on mount and shows a quiet empty state until Kanika opens
 * one), they can only reply. Auth + membership are already enforced by the
 * (member) layout, so this page just mounts the client.
 */
export default function MemberMessagesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <MemberMessagesClient />
    </div>
  );
}
