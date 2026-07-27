import type { TellArtifact as Artifact } from "@/lib/tells/types";

/**
 * The evidence. Four shapes, each rendered as the thing it actually is
 * rather than as a paragraph in a box: a text exchange gets real chat
 * bubbles, a voicemail gets a transcript under a speaker label, a scene
 * gets set in the display face.
 *
 * This is most of the atmosphere in the Daily Tell. A wall of body copy
 * reads like homework; a screenshot of a conversation reads like something
 * that happened to somebody.
 */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10.5px] uppercase tracking-[0.22em] text-[var(--app-dim)]">
      {children}
    </p>
  );
}

export default function TellArtifact({ artifact }: { artifact: Artifact }) {
  if (artifact.kind === "text-exchange") {
    return (
      <div>
        {artifact.label && <Label>{artifact.label}</Label>}
        <div className="flex flex-col gap-2">
          {artifact.lines.map((line, i) => {
            const mine = line.from === "you";
            return (
              <div
                key={i}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[80%] px-3.5 py-2.5 text-[14px] leading-snug ${
                    mine
                      ? "rounded-[16px] rounded-br-[5px] bg-[rgba(212,175,55,0.14)] text-[var(--app-text)]"
                      : "rounded-[16px] rounded-bl-[5px] bg-[var(--app-card-2)] text-[var(--app-text)]"
                  }`}
                >
                  {line.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (artifact.kind === "voicemail") {
    return (
      <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(183,110,121,0.15)]">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="var(--app-rose)"
                strokeWidth="1.6"
              >
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </span>
            <span className="text-[12.5px] text-[var(--app-muted)]">
              {artifact.speakerLabel}
            </span>
          </span>
          {artifact.durationLabel && (
            <span className="text-[11.5px] tabular-nums text-[var(--app-dim)]">
              {artifact.durationLabel}
            </span>
          )}
        </div>
        <p
          className="text-[15.5px] leading-relaxed text-[var(--app-text)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {artifact.transcript}
        </p>
      </div>
    );
  }

  // paragraph and scene: both are prose, but a scene is narration and reads
  // better set in the display face.
  const scene = artifact.kind === "scene";
  return (
    <div>
      {artifact.label && <Label>{artifact.label}</Label>}
      <p
        className={
          scene
            ? "text-[16.5px] leading-relaxed text-[var(--app-text)]"
            : "text-[15px] leading-relaxed text-[var(--app-text)]"
        }
        style={scene ? { fontFamily: "var(--font-display)" } : undefined}
      >
        {artifact.text}
      </p>
    </div>
  );
}
