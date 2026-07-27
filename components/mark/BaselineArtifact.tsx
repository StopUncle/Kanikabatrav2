import type { TellArtifact } from "@/lib/tells/types";

/**
 * The thing you are reading: a message thread, a voicemail, a paragraph.
 * Same artifact shapes the Tells use, wearing the app skin instead of
 * the old member-site one.
 */
export default function BaselineArtifact({
  artifact,
}: {
  artifact: TellArtifact;
}) {
  if (artifact.kind === "voicemail") {
    return (
      <Frame label={`${artifact.speakerLabel}${artifact.durationLabel ? ` · ${artifact.durationLabel}` : ""}`}>
        <p className="text-[15.5px] font-light leading-relaxed text-[var(--app-text)]">
          &ldquo;{artifact.transcript}&rdquo;
        </p>
      </Frame>
    );
  }

  if (artifact.kind === "text-exchange") {
    return (
      <Frame label={artifact.label}>
        <div className="flex flex-col gap-2">
          {artifact.lines.map((line, i) => (
            <div
              key={i}
              className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-relaxed ${
                line.from === "them"
                  ? "rounded-bl-md bg-[var(--app-card-2)] text-[var(--app-text)]"
                  : "ml-auto rounded-br-md bg-[rgba(183,110,121,0.22)] text-[var(--app-text)]"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  return (
    <Frame label={artifact.label}>
      <p className="text-[15.5px] font-light leading-relaxed text-[var(--app-text)]">
        {artifact.text}
      </p>
    </Frame>
  );
}

function Frame({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
      {label && (
        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[var(--app-dim)]">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
