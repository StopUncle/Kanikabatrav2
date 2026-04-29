"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Lightbulb,
  Check,
  X,
  Undo2,
  Search,
  RefreshCw,
  ExternalLink,
  Play,
  Loader2,
  Plus,
  ChevronDown,
  ChevronUp,
  Youtube,
  Instagram,
  FileText,
  Wand2,
  Flame,
  Camera,
  TrendingUp,
} from "lucide-react";
import DevelopTab from "./_components/DevelopTab";
import ConfessionsTab from "./_components/ConfessionsTab";
import FilmingQueueTab from "./_components/FilmingQueueTab";
import ShippedReportTab from "./_components/ShippedReportTab";

// ── Types ──

interface ContentIdea {
  id: string;
  title: string;
  hook: string | null;
  format: string | null;
  source: string;
  category: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  notes: string | null;
  createdAt: string;
}

interface ResearchNote {
  id: string;
  content: string;
  source: string | null;
  tags: string[];
  createdAt: string;
}

interface VideoAnalysisRecord {
  id: string;
  url: string;
  title: string | null;
  platform: string;
  transcript?: string | null;
  analysis: Record<string, unknown> | null;
  createdAt: string;
}

// ── Format Badge ──

function FormatBadge({ format }: { format: string | null }) {
  if (!format) return null;
  const colors: Record<string, string> = {
    reveal: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    confessional: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "cheat-code": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    test: "bg-green-500/10 text-green-400 border-green-500/20",
    debunk: "bg-red-500/10 text-red-400 border-red-500/20",
    reaction: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "book-tie-in": "bg-accent-gold/10 text-accent-gold border-accent-gold/20",
    experiment: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "book-extract": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };
  return (
    <span
      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors[format] || "bg-white/5 text-text-gray border-white/10"}`}
    >
      {format}
    </span>
  );
}

// ── Tab 1: Ideas Triage ──

function IdeasTab() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<"PENDING" | "APPROVED" | "REJECTED">(
    "PENDING",
  );
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newHook, setNewHook] = useState("");
  const [newFormat, setNewFormat] = useState("");

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: filter });
      if (sourceFilter) params.set("source", sourceFilter);
      const res = await fetch(`/api/admin/content/ideas?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setIdeas(data.ideas || []);
      setCounts(data.counts || {});
    } catch {
      setIdeas([]);
      setCounts({});
    }
    setLoading(false);
  }, [filter, sourceFilter]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  async function updateStatus(
    id: string,
    status: "APPROVED" | "REJECTED" | "PENDING",
  ) {
    setUpdating(id);
    await fetch(`/api/admin/content/ideas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setIdeas((prev) => prev.filter((i) => i.id !== id));
    setCounts((prev) => ({
      ...prev,
      [filter]: Math.max((prev[filter] || 0) - 1, 0),
      [status]: (prev[status] || 0) + 1,
    }));
    setUpdating(null);
  }

  async function addIdea() {
    if (!newTitle.trim()) return;
    await fetch("/api/admin/content/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        hook: newHook || null,
        format: newFormat || null,
        source: "manual",
      }),
    });
    setNewTitle("");
    setNewHook("");
    setNewFormat("");
    setShowAdd(false);
    fetchIdeas();
  }

  return (
    <div>
      {/* Status tabs */}
      <div className="flex gap-2 mb-6">
        {(["PENDING", "APPROVED", "REJECTED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              filter === s
                ? s === "APPROVED"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : s === "REJECTED"
                    ? "bg-red-500/10 text-red-400 border border-red-500/30"
                    : "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                : "text-text-gray hover:text-text-light bg-white/[0.02] border border-white/5"
            }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()} ({counts[s] || 0})
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm text-text-gray"
          >
            <option value="">All Sources</option>
            <option value="short-form">Short-Form Ideas</option>
            <option value="book">Book Extracts</option>
            <option value="manual">Manual</option>
          </select>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-accent-gold bg-accent-gold/5 border border-accent-gold/20 rounded-lg hover:bg-accent-gold/10 transition-all"
          >
            <Plus size={14} />
            Add Idea
          </button>
        </div>
      </div>

      {/* Add idea form */}
      {showAdd && (
        <div className="glass-card p-4 mb-6 space-y-3">
          <input
            type="text"
            placeholder="Idea title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-light placeholder-text-gray/50 focus:border-accent-gold/30 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Hook (first 3 seconds)..."
            value={newHook}
            onChange={(e) => setNewHook(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-light placeholder-text-gray/50 focus:border-accent-gold/30 focus:outline-none"
          />
          <div className="flex gap-3">
            <select
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-text-gray"
            >
              <option value="">Format...</option>
              <option value="reveal">Reveal</option>
              <option value="confessional">Confessional</option>
              <option value="cheat-code">Cheat Code</option>
              <option value="test">Test</option>
              <option value="debunk">Debunk</option>
              <option value="reaction">Reaction</option>
              <option value="book-tie-in">Book Tie-In</option>
              <option value="experiment">Experiment</option>
            </select>
            <button
              onClick={addIdea}
              className="px-4 py-2 text-sm bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90 transition-all"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Ideas list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={24} />
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-20 text-text-gray">
          No {filter.toLowerCase()} ideas
        </div>
      ) : (
        <div className="space-y-2">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="glass-card p-4 flex items-start gap-4 group hover:border-accent-gold/20 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FormatBadge format={idea.format} />
                  {idea.category && (
                    <span className="text-[10px] text-text-gray/60 uppercase tracking-wider">
                      {idea.category}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-text-light leading-snug">
                  {idea.title}
                </h3>
                {idea.hook && (
                  <p className="text-xs text-text-gray mt-1 leading-relaxed line-clamp-2">
                    {idea.hook}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {filter === "PENDING" ? (
                  <>
                    <button
                      onClick={() => updateStatus(idea.id, "APPROVED")}
                      disabled={updating === idea.id}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                      title="Approve"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => updateStatus(idea.id, "REJECTED")}
                      disabled={updating === idea.id}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
                      title="Reject"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => updateStatus(idea.id, "PENDING")}
                    disabled={updating === idea.id}
                    className="p-2 rounded-lg bg-white/5 text-text-gray hover:bg-white/10 transition-all disabled:opacity-50"
                    title="Move back to Pending"
                  >
                    <Undo2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tab 2: Research Hub ──

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    url: "https://www.youtube.com/@KanikaBatra",
    icon: Youtube,
    color: "text-red-400",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/kanikabatra/",
    icon: Instagram,
    color: "text-pink-400",
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@ogkanikabatra",
    icon: Play,
    color: "text-cyan-400",
  },
];

function ResearchTab() {
  const [notes, setNotes] = useState<ResearchNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content/research");
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setNotes(data.notes || []);
    } catch {
      setNotes([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  async function runScan() {
    setScanning(true);
    await fetch("/api/admin/content/research/scan", { method: "POST" });
    await fetchNotes();
    setScanning(false);
  }

  async function saveNote() {
    if (!newNote.trim()) return;
    await fetch("/api/admin/content/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote, source: "manual", tags: ["manual"] }),
    });
    setNewNote("");
    fetchNotes();
  }

  return (
    <div>
      {/* Social links */}
      <div className="flex gap-3 mb-6">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-4 py-3 flex items-center gap-2.5 hover:border-accent-gold/20 transition-all group"
          >
            <link.icon size={18} className={link.color} />
            <span className="text-sm text-text-gray group-hover:text-text-light transition-colors">
              {link.label}
            </span>
            <ExternalLink
              size={12}
              className="text-text-gray/40 group-hover:text-text-gray"
            />
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={runScan}
          disabled={scanning}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-lg hover:bg-accent-gold/20 transition-all disabled:opacity-50"
        >
          <RefreshCw
            size={14}
            className={scanning ? "animate-spin" : ""}
          />
          {scanning ? "Scanning..." : "Scan What's Working"}
        </button>
      </div>

      {/* Add note */}
      <div className="glass-card p-4 mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a research note... (what did you observe? what's trending? what worked this week?)"
          rows={3}
          className="w-full bg-transparent border-none text-sm text-text-light placeholder-text-gray/50 focus:outline-none resize-none"
        />
        {newNote.trim() && (
          <div className="flex justify-end mt-2">
            <button
              onClick={saveNote}
              className="px-4 py-1.5 text-sm bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90 transition-all"
            >
              Save Note
            </button>
          </div>
        )}
      </div>

      {/* Notes history */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={24} />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 text-text-gray">
          No research notes yet. Hit &quot;Scan What&apos;s Working&quot; or add
          a manual note.
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="glass-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/20"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] text-text-gray/50">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setExpanded(expanded === note.id ? null : note.id)
                  }
                  className="p-1 text-text-gray/50 hover:text-text-gray"
                >
                  {expanded === note.id ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </div>
              <div
                className={`text-sm text-text-gray whitespace-pre-wrap leading-relaxed ${expanded === note.id ? "" : "line-clamp-3"}`}
              >
                {note.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tab 3: Video Analysis ──

function AnalysisTab() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<VideoAnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchAnalyses = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content/analyze");
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setAnalyses(data.analyses || []);
    } catch {
      setAnalyses([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  async function analyzeVideo() {
    if (!url.trim()) return;
    setAnalyzing(true);
    await fetch("/api/admin/content/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    setUrl("");
    await fetchAnalyses();
    setAnalyzing(false);
  }

  function renderAnalysis(analysis: Record<string, unknown>) {
    if ("error" in analysis) {
      return (
        <p className="text-sm text-red-400">{analysis.error as string}</p>
      );
    }

    const hookAnalysis = analysis.hookAnalysis as Record<string, unknown>;
    const indicators = hookAnalysis?.indicators as Record<string, boolean>;
    const toneMarkers = analysis.toneMarkers as Record<string, number>;
    const topTopics = analysis.topTopics as Array<{
      topic: string;
      count: number;
    }>;

    return (
      <div className="space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/[0.02] rounded-lg p-3 text-center">
            <div className="text-lg font-light text-accent-gold">
              {analysis.wordCount as number}
            </div>
            <div className="text-[10px] text-text-gray uppercase tracking-wider">
              Words
            </div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-3 text-center">
            <div className="text-lg font-light text-accent-gold">
              {analysis.pacing as string}
            </div>
            <div className="text-[10px] text-text-gray uppercase tracking-wider">
              Pacing
            </div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-3 text-center">
            <div className="text-lg font-light text-accent-gold">
              {analysis.dominantTone as string}
            </div>
            <div className="text-[10px] text-text-gray uppercase tracking-wider">
              Tone
            </div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-3 text-center">
            <div
              className={`text-lg font-light ${
                (hookAnalysis?.hookStrength as string) === "strong"
                  ? "text-emerald-400"
                  : (hookAnalysis?.hookStrength as string) === "moderate"
                    ? "text-amber-400"
                    : "text-red-400"
              }`}
            >
              {hookAnalysis?.hookStrength as string}
            </div>
            <div className="text-[10px] text-text-gray uppercase tracking-wider">
              Hook
            </div>
          </div>
        </div>

        {/* Hook analysis */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-text-gray mb-2">
            First 30 Words
          </h4>
          <p className="text-sm text-text-light italic bg-white/[0.02] rounded-lg p-3">
            &quot;{hookAnalysis?.first30Words as string}&quot;
          </p>
          <div className="flex gap-2 mt-2">
            {indicators &&
              Object.entries(indicators)
                .filter(([, v]) => v)
                .map(([k]) => (
                  <span
                    key={k}
                    className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    {k}
                  </span>
                ))}
          </div>
        </div>

        {/* Tone markers */}
        {toneMarkers && (
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-gray mb-2">
              Tone Markers
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(toneMarkers).map(([key, val]) => (
                <div
                  key={key}
                  className="bg-white/[0.02] rounded-lg p-2 text-center"
                >
                  <div className="text-sm text-accent-gold">{val}</div>
                  <div className="text-[10px] text-text-gray capitalize">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top topics */}
        {topTopics && topTopics.length > 0 && (
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-gray mb-2">
              Top Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {topTopics.map((t) => (
                <span
                  key={t.topic}
                  className="text-xs px-2.5 py-1 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/20"
                >
                  {t.topic} ({t.count})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Analyze input */}
      <div className="glass-card p-4 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a YouTube URL to analyze..."
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-light placeholder-text-gray/50 focus:border-accent-gold/30 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && analyzeVideo()}
          />
          <button
            onClick={analyzeVideo}
            disabled={analyzing || !url.trim()}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-accent-gold text-deep-black rounded-lg font-medium hover:bg-accent-gold/90 transition-all disabled:opacity-50"
          >
            {analyzing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Search size={14} />
            )}
            {analyzing ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      {/* Analysis history */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={24} />
        </div>
      ) : analyses.length === 0 ? (
        <div className="text-center py-20 text-text-gray">
          No videos analyzed yet. Paste a YouTube URL above.
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((a) => (
            <div key={a.id} className="glass-card p-4">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() =>
                  setExpanded(expanded === a.id ? null : a.id)
                }
              >
                <Youtube size={18} className="text-red-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-light truncate">
                    {a.title || "Untitled"}
                  </h3>
                  <p className="text-[10px] text-text-gray/50 truncate">
                    {a.url}
                  </p>
                </div>
                <span className="text-[10px] text-text-gray/50 shrink-0">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
                {expanded === a.id ? (
                  <ChevronUp size={14} className="text-text-gray/50" />
                ) : (
                  <ChevronDown size={14} className="text-text-gray/50" />
                )}
              </div>
              {expanded === a.id && a.analysis && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  {renderAnalysis(a.analysis as Record<string, unknown>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ──

const TABS = [
  { id: "ideas", label: "Ideas Triage", icon: Lightbulb },
  { id: "develop", label: "Develop", icon: Wand2 },
  { id: "filming", label: "Filming Queue", icon: Camera },
  { id: "shipped", label: "Shipped", icon: TrendingUp },
  { id: "confessions", label: "Confessions", icon: Flame },
  { id: "research", label: "Research Hub", icon: Search },
  { id: "analysis", label: "Video Analysis", icon: FileText },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ContentDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("ideas");

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extralight tracking-wide text-text-light">
          Content Dashboard
        </h1>
        <p className="text-sm text-text-gray mt-1">
          Triage ideas, research what&apos;s working, analyze videos
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-8 bg-white/[0.02] rounded-lg p-1 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-all ${
              activeTab === id
                ? "bg-accent-gold/10 text-accent-gold"
                : "text-text-gray hover:text-text-light"
            }`}
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "ideas" && <IdeasTab />}
      {activeTab === "develop" && <DevelopTab />}
      {activeTab === "filming" && <FilmingQueueTab />}
      {activeTab === "shipped" && <ShippedReportTab />}
      {activeTab === "confessions" && <ConfessionsTab />}
      {activeTab === "research" && <ResearchTab />}
      {activeTab === "analysis" && <AnalysisTab />}
    </div>
  );
}
