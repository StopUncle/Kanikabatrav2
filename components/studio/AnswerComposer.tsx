"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Answer a question by writing or by recording. Two modes, one publish.
 *
 * Recording uses MediaRecorder straight from the browser, so there is no
 * file picker and no separate voice-memo app to route through. Browsers
 * disagree on the container (Chrome webm/opus, iOS Safari mp4/aac) and we
 * do not try to reconcile that here: the server transcodes whatever
 * arrives to mp3, so the only job on this side is to hand over the bytes.
 *
 * The caption is required in both modes because it becomes the feed
 * headline, and a voice note with no headline is a grey box members
 * scroll past.
 */
export default function AnswerComposer({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"write" | "record">("write");
  const [content, setContent] = useState("");
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const tickRef = useRef<number | undefined>(undefined);

  // Releasing the mic matters: on iOS an unreleased track leaves the
  // recording indicator lit and blocks the next getUserMedia call.
  const releaseMic = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (tickRef.current) window.clearInterval(tickRef.current);
  }, []);

  useEffect(() => releaseMic, [releaseMic]);

  const start = useCallback(async () => {
    setError("");
    setBlob(null);
    setSeconds(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        setBlob(new Blob(chunksRef.current, { type: rec.mimeType }));
        releaseMic();
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
      tickRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setError("No microphone access. Allow it in your browser settings.");
    }
  }, [releaseMic]);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
    setRecording(false);
    if (tickRef.current) window.clearInterval(tickRef.current);
  }, []);

  async function publish() {
    setError("");
    if (!content.trim()) {
      setError(
        mode === "record" ? "Add a line describing it." : "Write an answer.",
      );
      return;
    }
    if (mode === "record" && !blob) {
      setError("Record something first.");
      return;
    }
    setBusy(true);
    try {
      const form = new FormData();
      form.append("content", content.trim());
      if (mode === "record" && blob) {
        form.append("audio", blob, "answer.webm");
      }
      const res = await fetch(`/api/studio/questions/${questionId}/answer`, {
        method: "POST",
        body: form,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not publish. Try again.");
        return;
      }
      router.push("/studio");
      router.refresh();
    } catch {
      setError("Connection problem. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {(["write", "record"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setError("");
            }}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
              mode === m
                ? "bg-[#d4af37] text-[#0a0908]"
                : "border border-[#d4af37]/25 text-[#d4af37]"
            }`}
          >
            {m === "write" ? "Write" : "Record"}
          </button>
        ))}
      </div>

      {mode === "record" && (
        <div className="mb-4 rounded-2xl border border-[#d4af37]/20 bg-[#141110] p-5 text-center">
          {!recording && !blob && (
            <button
              onClick={start}
              className="rounded-full bg-[#722139] px-7 py-3 text-sm text-[#f5f0ed]"
            >
              Start recording
            </button>
          )}
          {recording && (
            <div>
              <p className="mb-3 text-2xl font-light tabular-nums text-[#d4af37]">
                {mmss}
              </p>
              <button
                onClick={stop}
                className="rounded-full bg-[#d4af37] px-7 py-3 text-sm font-medium text-[#0a0908]"
              >
                Stop
              </button>
            </div>
          )}
          {blob && !recording && (
            <div>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                controls
                src={URL.createObjectURL(blob)}
                className="mx-auto mb-3 w-full"
              />
              <button
                onClick={start}
                className="text-xs uppercase tracking-[0.16em] text-[#d4af37]"
              >
                Record again
              </button>
            </div>
          )}
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={mode === "record" ? 2 : 8}
        placeholder={
          mode === "record"
            ? "One line describing this answer"
            : "Your answer"
        }
        className="w-full rounded-2xl border border-[#d4af37]/20 bg-[#141110] p-4 text-[15px] font-light leading-relaxed text-[#f5f0ed] placeholder:text-[#7a6f60] focus:border-[#d4af37]/50 focus:outline-none"
      />

      {error && <p className="mt-3 text-sm text-[#e0796f]">{error}</p>}

      <button
        onClick={publish}
        disabled={busy}
        className="mt-4 w-full rounded-full bg-[#d4af37] py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-[#0a0908] disabled:opacity-50"
      >
        {busy ? "Publishing…" : "Publish answer"}
      </button>
    </div>
  );
}
