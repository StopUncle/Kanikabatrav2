import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ThreadView from "@/components/studio/ThreadView";

/**
 * One private thread. `id` is the member's id, matching the shared
 * /api/admin/messages/[memberId] contract the thread reads and writes on.
 */
export const dynamic = "force-dynamic";

export default async function StudioThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.user.findUnique({
    where: { id },
    select: { id: true, displayName: true, name: true },
  });
  if (!member) notFound();

  const name = member.displayName || member.name || "Member";

  return (
    <main className="px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <Link
        href="/studio"
        className="mb-4 inline-block text-[13px] font-light text-[#7a6f60]"
      >
        ‹ Inbox
      </Link>
      <h1 className="mb-5 text-[20px] font-light text-[#f5f0ed]">{name}</h1>
      <ThreadView memberId={member.id} memberName={name} />
    </main>
  );
}
