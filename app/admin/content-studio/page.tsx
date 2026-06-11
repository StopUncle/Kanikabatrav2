"use client";

import { useCallback, useState } from "react";
import { Sparkles, RefreshCw, Send, Check, Copy } from "lucide-react";

type Asset = { title: string; body: string };
type Result = {
  insight: Asset;
  prompt: Asset;
  quizAngle: string;
  scenarioSeed: string;
};

/**
 * Content Studio: the repurposing flywheel. Kanika pastes one hook (a reel
 * script, a tactic, an observation) and gets on-brand Consilium assets she
 * edits and publishes. One creative act becomes a feed insight, a
 * discussion prompt, a quiz angle, and a simulator seed, so subs stop
 * depending on net-new daily creativity.
 */
export default function ContentStudio() {
  const [mode, setMode] = useState<"repurpose" | "seo">("repurpose");
  const [hook, setHook] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const generate = useCallback(async () => {
    if (hook.trim().length < 8) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed.");
        return;
      }
      setResult(data.result);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setGenerating(false);
    }
  }, [hook]);

  const update = useCallback(
    (key: "insight" | "prompt", field: "title" | "body", value: string) => {
      setResult((r) =>
        r ? { ...r, [key]: { ...r[key], [field]: value } } : r,
      );
    },
    [],
  );

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-white font-extralight text-2xl uppercase tracking-wide">
          Content Studio
        </h1>
        <p className="text-text-gray/60 font-light text-sm mt-1">
          Turn one hook into Consilium content, or a full SEO blog post. The
          content engine, off the experience only you have.
        </p>
      </div>

      <div className="flex gap-1 p-1 mb-6 bg-deep-black/60 border border-white/10 rounded-full w-fit">
        {(
          [
            ["repurpose", "Repurpose to feed"],
            ["seo", "SEO blog post"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-light transition-colors ${
              mode === key
                ? "bg-accent-gold/20 text-white"
                : "text-text-gray/60 hover:text-text-light"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "seo" ? (
        <SeoPanel />
      ) : (
        <RepurposeBody
          hook={hook}
          setHook={setHook}
          generating={generating}
          generate={generate}
          error={error}
          result={result}
          update={update}
        />
      )}
    </div>
  );
}

function RepurposeBody({
  hook,
  setHook,
  generating,
  generate,
  error,
  result,
  update,
}: {
  hook: string;
  setHook: (v: string) => void;
  generating: boolean;
  generate: () => void;
  error: string | null;
  result: Result | null;
  update: (k: "insight" | "prompt", f: "title" | "body", v: string) => void;
}) {
  return (
    <>
      <div className="rounded-xl border border-accent-gold/25 bg-deep-black/60 p-4 focus-within:border-accent-gold/50 transition-colors">
        <textarea
          value={hook}
          onChange={(e) => setHook(e.target.value.slice(0, 4000))}
          rows={4}
          placeholder="e.g. The love bomber who says 'I've never felt this way' on date three. Intensity is a tell, not romance."
          className="w-full resize-none bg-transparent text-white font-light text-base leading-relaxed placeholder:text-text-gray/40 focus:outline-none"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-text-gray/40 text-[10px] tabular-nums">
            {hook.length}/4000
          </span>
          <button
            onClick={() => void generate()}
            disabled={generating || hook.trim().length < 8}
            className="inline-flex items-center gap-2 text-accent-gold text-xs uppercase tracking-[0.2em] font-light border border-accent-gold/40 rounded-lg px-4 py-2.5 hover:border-accent-gold transition-colors disabled:opacity-40"
          >
            {generating ? (
              <RefreshCw size={13} className="animate-spin" aria-hidden />
            ) : (
              <Sparkles size={13} aria-hidden />
            )}
            {generating ? "Writing..." : result ? "Regenerate" : "Generate"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400/90 text-sm font-light mt-4">{error}</p>
      )}

      {result && (
        <div className="mt-8 space-y-5">
          <PublishableCard
            label="Feed insight"
            note="Publishes as an announcement post on the member feed."
            type="ANNOUNCEMENT"
            asset={result.insight}
            onChange={(f, v) => update("insight", f, v)}
          />
          <PublishableCard
            label="Discussion prompt"
            note="Publishes as a discussion prompt to pull comments."
            type="DISCUSSION_PROMPT"
            asset={result.prompt}
            onChange={(f, v) => update("prompt", f, v)}
          />
          <CopyCard label="Quiz angle" text={result.quizAngle} />
          <CopyCard label="Simulator seed" text={result.scenarioSeed} />
        </div>
      )}
    </>
  );
}

function PublishableCard({
  label,
  note,
  type,
  asset,
  onChange,
}: {
  label: string;
  note: string;
  type: "ANNOUNCEMENT" | "DISCUSSION_PROMPT";
  asset: Asset;
  onChange: (field: "title" | "body", value: string) => void;
}) {
  const [state, setState] = useState<"idle" | "publishing" | "done">("idle");
  const [err, setErr] = useState<string | null>(null);

  const publish = useCallback(async () => {
    setState("publishing");
    setErr(null);
    try {
      const res = await fetch("/api/consilium/feed/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: asset.title, content: asset.body, type }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setErr(d.error ?? "Publish failed.");
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setErr("Network error.");
      setState("idle");
    }
  }, [asset, type]);

  return (
    <div className="rounded-xl border border-white/10 bg-deep-black/50 p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-accent-gold/80 text-[10px] uppercase tracking-[0.25em]">
            {label}
          </p>
          <p className="text-text-gray/50 text-xs font-light mt-0.5">{note}</p>
        </div>
        {state === "done" ? (
          <span className="inline-flex items-center gap-1.5 text-emerald-300 text-xs uppercase tracking-[0.15em]">
            <Check size={13} /> Published
          </span>
        ) : (
          <button
            onClick={() => void publish()}
            disabled={state === "publishing"}
            className="inline-flex items-center gap-1.5 text-warm-gold text-xs uppercase tracking-[0.15em] font-light border border-warm-gold/40 rounded-lg px-3 py-1.5 hover:border-warm-gold transition-colors disabled:opacity-50"
          >
            <Send size={12} aria-hidden />
            {state === "publishing" ? "Publishing..." : "Publish to feed"}
          </button>
        )}
      </div>
      <input
        value={asset.title}
        onChange={(e) => onChange("title", e.target.value)}
        disabled={state === "done"}
        className="w-full bg-deep-black/60 border border-white/10 rounded-lg px-3 py-2 text-white font-light text-sm mb-2 focus:outline-none focus:border-accent-gold/40 disabled:opacity-60"
      />
      <textarea
        value={asset.body}
        onChange={(e) => onChange("body", e.target.value)}
        disabled={state === "done"}
        rows={5}
        className="w-full bg-deep-black/60 border border-white/10 rounded-lg px-3 py-2 text-white/90 font-light text-sm leading-relaxed resize-none focus:outline-none focus:border-accent-gold/40 disabled:opacity-60"
      />
      {err && <p className="text-red-400/80 text-xs font-light mt-2">{err}</p>}
    </div>
  );
}

function CopyCard({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-deep-black/40 p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-accent-gold/80 text-[10px] uppercase tracking-[0.25em]">
          {label}
        </p>
        <button
          onClick={() => {
            void navigator.clipboard?.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="inline-flex items-center gap-1.5 text-text-gray/60 hover:text-accent-gold text-xs font-light transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-white/80 font-light text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function SeoPanel() {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ mdx: string; slug: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(async () => {
    if (topic.trim().length < 4) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content/seo-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed.");
        return;
      }
      setOut(data);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setGenerating(false);
    }
  }, [topic]);

  return (
    <>
      <p className="text-text-gray/60 font-light text-sm mb-3">
        Target a keyword or query. Out comes a complete, publish-ready MDX
        post in your voice, written from first-hand experience (the E-E-A-T
        edge). Finish it, then save it to{" "}
        <code className="text-accent-gold/80">content/posts/&lt;slug&gt;.mdx</code>.
      </p>
      <div className="rounded-xl border border-accent-gold/25 bg-deep-black/60 p-4 focus-within:border-accent-gold/50 transition-colors">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value.slice(0, 400))}
          placeholder="e.g. how to spot a covert narcissist"
          className="w-full bg-transparent text-white font-light text-base placeholder:text-text-gray/40 focus:outline-none"
        />
        <div className="flex items-center justify-end mt-3">
          <button
            onClick={() => void generate()}
            disabled={generating || topic.trim().length < 4}
            className="inline-flex items-center gap-2 text-accent-gold text-xs uppercase tracking-[0.2em] font-light border border-accent-gold/40 rounded-lg px-4 py-2.5 hover:border-accent-gold transition-colors disabled:opacity-40"
          >
            {generating ? (
              <RefreshCw size={13} className="animate-spin" aria-hidden />
            ) : (
              <Sparkles size={13} aria-hidden />
            )}
            {generating ? "Writing the post..." : "Generate SEO post"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400/90 text-sm font-light mt-4">{error}</p>
      )}

      {out && (
        <div className="mt-6 rounded-xl border border-white/10 bg-deep-black/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-text-gray/70 text-xs font-light">
              Save as{" "}
              <code className="text-accent-gold/80">
                content/posts/{out.slug}.mdx
              </code>
            </p>
            <button
              onClick={() => {
                void navigator.clipboard?.writeText(out.mdx);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="inline-flex items-center gap-1.5 text-warm-gold text-xs uppercase tracking-[0.15em] font-light border border-warm-gold/40 rounded-lg px-3 py-1.5 hover:border-warm-gold transition-colors"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy MDX"}
            </button>
          </div>
          <pre className="max-h-[60vh] overflow-auto rounded-lg bg-black/40 p-4 text-text-gray/90 text-xs leading-relaxed whitespace-pre-wrap font-mono">
            {out.mdx}
          </pre>
        </div>
      )}
    </>
  );
}
