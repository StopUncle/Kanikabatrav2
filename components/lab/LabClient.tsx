"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FlaskConical, Send, Flag } from "lucide-react";

type PersonaCard = {
  key: string;
  name: string;
  title: string;
  hook: string;
  brief: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

type TranscriptMessage = { role: "user" | "persona"; text: string; at: string };

type LabScore = {
  axes: {
    recognition: number;
    boundaries: number;
    composure: number;
    exit: number;
  };
  outcome: "held" | "mixed" | "played";
  verdict: string;
};

type ActiveSession = {
  id: string;
  personaKey: string;
  transcript: TranscriptMessage[];
  turnCount: number;
  maxTurns: number;
};

type LabState = {
  personas: PersonaCard[];
  active: ActiveSession | null;
  quota: { used: number; cap: number; remaining: number };
  recent: {
    id: string;
    personaKey: string;
    score: LabScore | null;
    createdAt: string;
  }[];
};

type View =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "catalog" }
  | { kind: "brief"; persona: PersonaCard }
  | { kind: "chat" }
  | { kind: "score"; score: LabScore | null; personaKey: string };

const DIFFICULTY_STYLE: Record<PersonaCard["difficulty"], string> = {
  beginner: "text-emerald-300/80 border-emerald-300/30",
  intermediate: "text-accent-gold/90 border-accent-gold/40",
  advanced: "text-red-300/90 border-red-300/40",
};

const OUTCOME_COPY: Record<LabScore["outcome"], { label: string; tone: string }> = {
  held: { label: "You held the line", tone: "text-accent-gold" },
  mixed: { label: "Ground given", tone: "text-white/80" },
  played: { label: "You got played", tone: "text-red-300/90" },
};

const AXIS_LABELS: { key: keyof LabScore["axes"]; label: string }[] = [
  { key: "recognition", label: "Recognition" },
  { key: "boundaries", label: "Boundaries" },
  { key: "composure", label: "Composure" },
  { key: "exit", label: "Exit control" },
];

export default function LabClient() {
  const [state, setState] = useState<LabState | null>(null);
  const [view, setView] = useState<View>({ kind: "loading" });
  const [session, setSession] = useState<ActiveSession | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [ending, setEnding] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/consilium/lab");
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setView({ kind: "error", message: data.error ?? "Could not load the Lab." });
          return;
        }
        setState(data);
        if (data.active) {
          setSession(data.active);
          setView({ kind: "chat" });
        } else {
          setView({ kind: "catalog" });
        }
      } catch {
        if (!cancelled)
          setView({ kind: "error", message: "Could not load the Lab." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.transcript.length, sending]);

  const personaFor = useCallback(
    (key: string): PersonaCard | undefined =>
      state?.personas.find((p) => p.key === key),
    [state],
  );

  const start = useCallback(
    async (persona: PersonaCard) => {
      setChatError(null);
      try {
        const res = await fetch("/api/consilium/lab", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ personaKey: persona.key }),
        });
        const data = await res.json();
        if (!res.ok) {
          setView({ kind: "catalog" });
          setChatError(data.error ?? "Could not start the session.");
          if (data.quota && state) setState({ ...state, quota: data.quota });
          return;
        }
        setSession(data.session);
        if (state) setState({ ...state, quota: data.quota });
        setView({ kind: "chat" });
      } catch {
        setChatError("Could not start the session.");
        setView({ kind: "catalog" });
      }
    },
    [state],
  );

  const send = useCallback(async () => {
    if (!session || sending) return;
    const text = input.trim();
    if (!text) return;
    setChatError(null);
    setSending(true);
    setInput("");
    const optimistic: ActiveSession = {
      ...session,
      transcript: [
        ...session.transcript,
        { role: "user", text, at: new Date().toISOString() },
      ],
    };
    setSession(optimistic);
    try {
      const res = await fetch(`/api/consilium/lab/${session.id}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSession(session);
        setInput(text);
        setChatError(data.error ?? "Message failed. Try again.");
        return;
      }
      setSession({
        ...optimistic,
        turnCount: data.turnCount,
        maxTurns: data.maxTurns,
        transcript: [
          ...optimistic.transcript,
          { role: "persona", text: data.reply, at: new Date().toISOString() },
        ],
      });
    } catch {
      setSession(session);
      setInput(text);
      setChatError("Connection dropped. Try again.");
    } finally {
      setSending(false);
    }
  }, [session, sending, input]);

  const end = useCallback(async () => {
    if (!session || ending) return;
    setEnding(true);
    setChatError(null);
    try {
      const res = await fetch(`/api/consilium/lab/${session.id}/end`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setChatError(data.error ?? "Could not end the session.");
        return;
      }
      setView({ kind: "score", score: data.score, personaKey: session.personaKey });
      setSession(null);
    } catch {
      setChatError("Could not end the session.");
    } finally {
      setEnding(false);
    }
  }, [session, ending]);

  /* ---------------------------------------------------------------- */

  if (view.kind === "loading") {
    return (
      <div className="py-20 text-center text-text-gray/60 font-light animate-pulse">
        Opening the Lab
      </div>
    );
  }

  if (view.kind === "error") {
    return (
      <div className="py-20 text-center text-text-gray/70 font-light">
        {view.message}
      </div>
    );
  }

  if (view.kind === "chat" && session) {
    const persona = personaFor(session.personaKey);
    const turnsLeft = session.maxTurns - session.turnCount;
    return (
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between border-b border-accent-gold/15 pb-3 mb-4">
          <div>
            <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] font-light">
              The Lab
            </p>
            <h1 className="text-white font-light text-lg">
              {persona ? `${persona.name}. ${persona.title}` : "Session"}
            </h1>
          </div>
          <button
            onClick={() => void end()}
            disabled={ending}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-light text-text-gray/70 hover:text-accent-gold border border-white/15 hover:border-accent-gold/50 rounded-lg px-3 py-2 transition-colors disabled:opacity-50"
          >
            <Flag size={12} aria-hidden />
            {ending ? "Scoring..." : "End session"}
          </button>
        </div>

        <div className="space-y-3 min-h-[40vh]">
          {session.transcript.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm sm:text-base font-light leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent-gold/10 border border-accent-gold/25 text-white"
                    : "bg-white/[0.04] border border-white/10 text-white/90"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-2.5 bg-white/[0.04] border border-white/10 text-text-gray/60 text-sm font-light animate-pulse">
                {persona?.name ?? "..."} is typing
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {chatError && (
          <p className="text-red-400/80 text-xs font-light mt-3 text-center">
            {chatError}
          </p>
        )}

        <div className="mt-4 rounded-xl border border-accent-gold/25 bg-deep-black/70 p-3 focus-within:border-accent-gold/60 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 400))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            disabled={sending || turnsLeft <= 0}
            rows={2}
            placeholder={
              turnsLeft > 0
                ? "Your move"
                : "Turn limit reached. End the session for your score."
            }
            className="w-full bg-transparent text-white font-light text-sm sm:text-base placeholder:text-text-gray/40 resize-none focus:outline-none disabled:opacity-60"
            aria-label="Your message"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-text-gray/40 text-[10px] tracking-wider">
              {turnsLeft} {turnsLeft === 1 ? "move" : "moves"} left
            </span>
            <button
              onClick={() => void send()}
              disabled={sending || !input.trim() || turnsLeft <= 0}
              className="inline-flex items-center gap-1.5 text-accent-gold text-xs uppercase tracking-[0.2em] font-light hover:text-white transition-colors disabled:opacity-40 py-1.5 px-3 border border-accent-gold/40 rounded-lg hover:border-accent-gold"
            >
              <Send size={12} aria-hidden />
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view.kind === "score") {
    const persona = personaFor(view.personaKey);
    return (
      <div className="max-w-xl mx-auto px-4 pb-8 text-center">
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] font-light mt-2">
          Session complete
        </p>
        <h1 className="text-white font-extralight text-2xl mt-2 uppercase tracking-wide">
          {persona ? persona.title : "The Lab"}
        </h1>
        {view.score ? (
          <>
            <p
              className={`mt-4 text-lg font-light ${OUTCOME_COPY[view.score.outcome].tone}`}
            >
              {OUTCOME_COPY[view.score.outcome].label}
            </p>
            <div className="mt-6 space-y-3 text-left">
              {AXIS_LABELS.map(({ key, label }) => {
                const value = view.score ? view.score.axes[key] : 0;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs font-light mb-1">
                      <span className="text-text-gray/80 uppercase tracking-[0.2em]">
                        {label}
                      </span>
                      <span className="text-white/80">{value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-gold/60 to-accent-gold"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative pl-5 mt-8 text-left">
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-accent-gold/60"
              />
              <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] mb-1.5 font-light">
                The read
              </p>
              <p className="text-white/85 font-light leading-relaxed">
                {view.score.verdict}
              </p>
            </div>
          </>
        ) : (
          <p className="mt-6 text-text-gray/70 font-light">
            Session ended before there was enough to score. Your daily slot
            resets tomorrow.
          </p>
        )}
        <button
          onClick={() => setView({ kind: "catalog" })}
          className="mt-8 text-accent-gold text-xs uppercase tracking-[0.25em] font-light border border-accent-gold/40 rounded-lg px-5 py-2.5 hover:border-accent-gold transition-colors"
        >
          Back to the Lab
        </button>
      </div>
    );
  }

  if (view.kind === "brief") {
    const p = view.persona;
    return (
      <div className="max-w-xl mx-auto px-4 pb-8">
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] font-light">
          The Lab
        </p>
        <h1 className="text-white font-extralight text-2xl mt-2 uppercase tracking-wide">
          {p.name}. {p.title}
        </h1>
        <span
          className={`inline-block mt-3 text-[10px] uppercase tracking-[0.25em] font-light border rounded-full px-3 py-1 ${DIFFICULTY_STYLE[p.difficulty]}`}
        >
          {p.difficulty}
        </span>
        <p className="text-white/80 font-light leading-relaxed mt-5">{p.brief}</p>
        <p className="text-text-gray/60 font-light text-sm mt-4">
          One session per day. {`You get a scored read when it ends.`} Type to
          {" "}{p.name} the way you would type to a real person.
        </p>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => setView({ kind: "catalog" })}
            className="text-text-gray/70 hover:text-white text-xs uppercase tracking-[0.25em] font-light border border-white/15 rounded-lg px-5 py-2.5 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => void start(p)}
            className="flex-1 text-deep-black bg-accent-gold hover:bg-accent-gold/90 text-xs uppercase tracking-[0.25em] font-normal rounded-lg px-5 py-2.5 transition-colors"
          >
            Enter the Lab
          </button>
        </div>
      </div>
    );
  }

  // Catalog
  const quota = state?.quota;
  const locked = (quota?.remaining ?? 0) <= 0;
  return (
    <div className="max-w-2xl mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.35em] font-light inline-flex items-center gap-2">
          <FlaskConical size={12} aria-hidden />
          The Lab
        </p>
        <h1 className="text-white font-extralight text-2xl sm:text-3xl mt-2 uppercase tracking-wide">
          Live Sparring
        </h1>
        <p className="text-text-gray/70 font-light text-sm mt-3 max-w-md mx-auto">
          A live conversation against a manipulator archetype. No script, no
          choice cards. One session a day; you get a scored read when it ends.
        </p>
        {locked && (
          <p className="text-accent-gold/80 font-light text-xs mt-3 uppercase tracking-[0.2em]">
            Today&apos;s session is used. The cap is part of the training.
          </p>
        )}
        {chatError && (
          <p className="text-red-400/80 text-xs font-light mt-3">{chatError}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {state?.personas.map((p) => (
          <button
            key={p.key}
            onClick={() => !locked && setView({ kind: "brief", persona: p })}
            disabled={locked}
            className={`text-left p-5 rounded-xl border bg-deep-black/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold ${
              locked
                ? "border-white/10 opacity-50 cursor-not-allowed"
                : "border-accent-gold/25 hover:border-accent-gold/70 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.35)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-light text-lg">{p.name}</p>
              <span
                className={`text-[9px] uppercase tracking-[0.2em] font-light border rounded-full px-2.5 py-0.5 ${DIFFICULTY_STYLE[p.difficulty]}`}
              >
                {p.difficulty}
              </span>
            </div>
            <p className="text-accent-gold/80 text-xs uppercase tracking-[0.2em] font-light mt-1">
              {p.title}
            </p>
            <p className="text-text-gray/70 font-light text-sm mt-3 leading-relaxed">
              {p.hook}
            </p>
          </button>
        ))}
      </div>

      {state && state.recent.length > 0 && (
        <div className="mt-10">
          <p className="text-text-gray/50 text-[10px] uppercase tracking-[0.35em] font-light mb-3">
            Past sessions
          </p>
          <div className="space-y-2">
            {state.recent.map((s) => {
              const p = personaFor(s.personaKey);
              const outcome = s.score?.outcome;
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-deep-black/50 px-4 py-3"
                >
                  <span className="text-white/80 font-light text-sm">
                    {p ? `${p.name}. ${p.title}` : s.personaKey}
                  </span>
                  <span
                    className={`text-xs font-light ${
                      outcome ? OUTCOME_COPY[outcome].tone : "text-text-gray/50"
                    }`}
                  >
                    {outcome ? OUTCOME_COPY[outcome].label : "Unscored"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
