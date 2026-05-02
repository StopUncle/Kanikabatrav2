import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TellForm from "@/components/admin/TellForm";
import { prisma } from "@/lib/prisma";
import type {
  InstinctAxis,
  InstinctTrack,
  TellArtifact,
} from "@/lib/tells/types";

export const dynamic = "force-dynamic";

export default async function EditTellPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tell = await prisma.tell.findUnique({ where: { id } });
  if (!tell) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/tells"
        className="inline-flex items-center gap-2 text-text-gray hover:text-accent-gold text-sm mb-6"
      >
        <ArrowLeft size={14} /> Back to Tells
      </Link>
      <header className="mb-10">
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
          Tell {String(tell.number).padStart(3, "0")}
        </p>
        <h1 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
          Edit
        </h1>
      </header>
      <TellForm
        mode="edit"
        tellId={tell.id}
        initial={{
          id: tell.id,
          number: tell.number,
          slug: tell.slug,
          track: tell.track as InstinctTrack,
          axes: tell.axes as InstinctAxis[],
          difficulty: tell.difficulty,
          artifact: tell.artifact as unknown as TellArtifact,
          question: tell.question,
          choices: tell.choices as unknown as {
            id: string;
            text: string;
            isCorrect: boolean;
            why: string;
          }[],
          reveal: tell.reveal,
          scheduleDate: tell.scheduleDate
            ? tell.scheduleDate.toISOString().slice(0, 10)
            : null,
          status: tell.status,
        }}
      />
    </div>
  );
}
