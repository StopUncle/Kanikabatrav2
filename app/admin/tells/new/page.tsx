import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TellForm from "@/components/admin/TellForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewTellPage() {
  // Pick the next available number so the form auto-suggests it.
  const max = await prisma.tell.aggregate({ _max: { number: true } });
  const nextNumber = (max._max.number ?? 0) + 1;

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
          New Tell
        </p>
        <h1 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
          Author
        </h1>
      </header>
      <TellForm
        mode="new"
        initial={{
          id: "",
          number: nextNumber,
          slug: "",
          track: "DARK_PSYCH",
          axes: ["READ"],
          difficulty: 3,
          artifact: {
            kind: "voicemail",
            speakerLabel: "",
            durationLabel: "",
            transcript: "",
          },
          question: "",
          choices: [
            { id: "a", text: "", isCorrect: true, why: "" },
            { id: "b", text: "", isCorrect: false, why: "" },
            { id: "c", text: "", isCorrect: false, why: "" },
            { id: "d", text: "", isCorrect: false, why: "" },
          ],
          reveal: "",
          scheduleDate: null,
          status: "DRAFT",
        }}
      />
    </div>
  );
}
