"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2 } from "lucide-react";

/**
 * In-browser voice recorder for Kanika's admin panel.
 *
 * Uses the MediaRecorder API — no SDK, no external tooling. Records
 * webm/opus at browser-native quality, which is ~40 KB/sec (2.4 MB/min).
 * That stays well under the 50MB upload limit for any reasonable
 * voice note length (20+ minutes).
 *
 * On stop, calls onRecorded with a File object. The parent form then
 * uploads it the same way it uploads a drag-dropped file — no special
 * server handling needed since the upload endpoint already accepts
 * webm MIME type.
 */

interface Props {
  onRecorded: (file: File) => void;
  disabled?: boolean;
}

export default function VoiceRecorder({ onRecorded, disabled }: Props) {
  const [status, setStatus] = useState<"idle" | "recording" | "stopped">("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef<number>(0);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stop mic track when component unmounts — prevents the browser's
  // red "recording" indicator from sticking around after navigation.
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (tickerRef.current) clearInterval(tickerRef.current);
    };
  }, []);

  async function start() {
    setError(null);

    if (typeof MediaRecorder === "undefined") {
      setError(
        "This browser can't record audio. On iPhone, use Safari 14.5+ or tap \"Upload File\" and record with the Voice Memos app.",
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });
      streamRef.current = stream;

      // Let the browser pick the format. Chrome/Edge prefer webm/opus, iOS
      // Safari prefers audio/mp4 (AAC). On iOS, isTypeSupported sometimes
      // lies — we try in order and let the MediaRecorder constructor throw
      // if the type isn't actually supported, then fall back to unspecified.
      const candidates = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/aac",
      ];
      const preferred = candidates.find(
        (t) =>
          typeof MediaRecorder.isTypeSupported === "function" &&
          MediaRecorder.isTypeSupported(t),
      );

      let recorder: MediaRecorder;
      try {
        recorder = preferred
          ? new MediaRecorder(stream, { mimeType: preferred })
          : new MediaRecorder(stream);
      } catch {
        // iOS Safari sometimes reports a type as supported then rejects it.
        // Retry with no mimeType and accept whatever the browser gives us.
        recorder = new MediaRecorder(stream);
      }

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/mp4";
        const blob = new Blob(chunksRef.current, { type });
        // Pick extension from the actual recorded MIME. iOS returns
        // "audio/mp4;codecs=mp4a.40.2" → m4a. Others: webm → webm, ogg → ogg.
        // The server re-sniffs magic bytes regardless, so a wrong guess
        // still uploads — this just gives a sensible filename.
        const lower = type.toLowerCase();
        const ext = lower.includes("mp4") || lower.includes("aac") || lower.includes("mpeg")
          ? "m4a"
          : lower.includes("ogg")
            ? "ogg"
            : lower.includes("wav")
              ? "wav"
              : "webm";
        const file = new File([blob], `voice-note-${Date.now()}.${ext}`, { type });
        onRecorded(file);
        setStatus("stopped");
      };

      recorder.start();
      startedAtRef.current = Date.now();
      setStatus("recording");
      setElapsed(0);
      tickerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startedAtRef.current) / 1000));
      }, 250);
    } catch (err) {
      const msg =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Microphone permission denied. Allow mic access in your browser and try again."
          : "Couldn't access the microphone. Check that it's plugged in and not used by another app.";
      setError(msg);
    }
  }

  function stop() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (tickerRef.current) {
      clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  }

  function reset() {
    stop();
    setStatus("idle");
    setElapsed(0);
    setError(null);
  }

  const mm = Math.floor(elapsed / 60)
    .toString()
    .padStart(2, "0");
  const ss = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-lg">
      {status === "idle" && (
        <>
          <button
            type="button"
            onClick={start}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2 bg-accent-burgundy/20 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-burgundy/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mic size={16} />
            <span className="text-sm tracking-wide">Record</span>
          </button>
          <span className="text-xs text-text-gray/60">
            Click to record directly in the browser
          </span>
        </>
      )}

      {status === "recording" && (
        <>
          <button
            type="button"
            onClick={stop}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/40 rounded hover:bg-red-500/30 transition-all"
          >
            <Square size={14} className="fill-red-300" />
            <span className="text-sm tracking-wide">Stop</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-mono text-text-light">{mm}:{ss}</span>
          </div>
          <span className="text-xs text-text-gray/60">Recording...</span>
        </>
      )}

      {status === "stopped" && (
        <>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-text-gray border border-white/10 rounded hover:bg-white/10 transition-all"
          >
            <Trash2 size={14} />
            <span className="text-sm tracking-wide">Discard &amp; re-record</span>
          </button>
          <span className="text-xs text-emerald-400">
            Recording ready &mdash; {mm}:{ss}
          </span>
        </>
      )}

      {error && (
        <span className="text-xs text-red-400 ml-auto">{error}</span>
      )}
    </div>
  );
}
