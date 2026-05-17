"use client";

import { useState } from "react";
import { Loader2, Trash2, Plus, Save, Eye, EyeOff } from "lucide-react";

interface Testimonial {
  id: string;
  videoUrl: string | null;
  posterUrl: string | null;
  durationSeconds: number | null;
  quoteText: string | null;
  transcript: string | null;
  authorName: string;
  authorRole: string | null;
  displayOrder: number;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface Props {
  initial: Testimonial[];
}

const EMPTY_DRAFT = {
  videoUrl: "",
  posterUrl: "",
  durationSeconds: "",
  quoteText: "",
  transcript: "",
  authorName: "",
  authorRole: "",
  displayOrder: 0,
  published: false,
};

export default function TestimonialAdminClient({ initial }: Props) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setError(null);
    setCreating(true);
    try {
      const payload = {
        videoUrl: draft.videoUrl || null,
        posterUrl: draft.posterUrl || null,
        durationSeconds: draft.durationSeconds
          ? Number(draft.durationSeconds)
          : null,
        quoteText: draft.quoteText || null,
        transcript: draft.transcript || null,
        authorName: draft.authorName,
        authorRole: draft.authorRole || null,
        displayOrder: Number(draft.displayOrder) || 0,
        published: draft.published,
      };
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setItems([data.testimonial, ...items]);
      setDraft(EMPTY_DRAFT);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setCreating(false);
    }
  }

  async function togglePublish(t: Testimonial) {
    const res = await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !t.published }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems(items.map((i) => (i.id === t.id ? data.testimonial : i)));
    }
  }

  async function remove(t: Testimonial) {
    if (!confirm(`Delete testimonial from ${t.authorName}?`)) return;
    const res = await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems(items.filter((i) => i.id !== t.id));
    }
  }

  async function updateOrder(t: Testimonial, displayOrder: number) {
    const res = await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayOrder }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems(items.map((i) => (i.id === t.id ? data.testimonial : i)));
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl font-light tracking-wider uppercase mb-6">
        Testimonials
      </h1>
      <p className="text-text-gray text-sm mb-8">
        Both video (R2 URL) and text-only quotes work. Either fill in
        videoUrl + transcript, or quoteText. Author name shows under
        each card; author role is an optional second line (e.g. &ldquo;Member
        since March&rdquo;). Lower displayOrder sorts first.
      </p>

      <div className="bg-deep-black/40 border border-warm-gold/20 rounded-2xl p-6 mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Plus size={16} className="text-warm-gold" />
          <h2 className="text-sm uppercase tracking-[0.2em] text-warm-gold">
            New testimonial
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Video URL (R2 or VideoAsk)"
            value={draft.videoUrl}
            onChange={(v) => setDraft({ ...draft, videoUrl: v })}
            placeholder="https://kanika-media.r2.dev/..."
          />
          <Input
            label="Poster image URL (optional)"
            value={draft.posterUrl}
            onChange={(v) => setDraft({ ...draft, posterUrl: v })}
          />
          <Textarea
            label="Quote text (use for text-only testimonials)"
            value={draft.quoteText}
            onChange={(v) => setDraft({ ...draft, quoteText: v })}
            rows={3}
          />
          <Textarea
            label="Transcript (for video, also acts as SEO text)"
            value={draft.transcript}
            onChange={(v) => setDraft({ ...draft, transcript: v })}
            rows={3}
          />
          <Input
            label="Author name *"
            value={draft.authorName}
            onChange={(v) => setDraft({ ...draft, authorName: v })}
            placeholder="Sarah M."
          />
          <Input
            label="Author role (optional)"
            value={draft.authorRole}
            onChange={(v) => setDraft({ ...draft, authorRole: v })}
            placeholder="Member since March 2026"
          />
          <Input
            label="Display order"
            value={String(draft.displayOrder)}
            onChange={(v) => setDraft({ ...draft, displayOrder: Number(v) || 0 })}
            type="number"
          />
          <Input
            label="Duration (seconds, video only)"
            value={draft.durationSeconds}
            onChange={(v) => setDraft({ ...draft, durationSeconds: v })}
            type="number"
          />
        </div>
        <label className="flex items-center gap-2 mt-5 text-sm text-text-gray">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
          />
          Publish immediately
        </label>
        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
        <button
          onClick={handleCreate}
          disabled={creating || !draft.authorName || (!draft.videoUrl && !draft.quoteText)}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2 bg-warm-gold text-deep-black text-sm uppercase tracking-wider rounded-full font-medium hover:bg-warm-gold/90 transition-all disabled:opacity-50"
        >
          {creating ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save size={14} />
              Create
            </>
          )}
        </button>
      </div>

      <h2 className="text-sm uppercase tracking-[0.2em] text-text-gray mb-3">
        Existing ({items.length})
      </h2>
      {items.length === 0 ? (
        <p className="text-text-gray/60 text-sm">No testimonials yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <div
              key={t.id}
              className="p-4 bg-deep-black/40 border border-warm-gold/10 rounded-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-text-light font-light">
                      {t.authorName}
                    </span>
                    {t.authorRole && (
                      <span className="text-text-gray/60 text-xs">
                        · {t.authorRole}
                      </span>
                    )}
                    {t.published ? (
                      <span className="text-emerald-400 text-[10px] uppercase tracking-wider ml-2">
                        published
                      </span>
                    ) : (
                      <span className="text-amber-400 text-[10px] uppercase tracking-wider ml-2">
                        draft
                      </span>
                    )}
                  </div>
                  {t.videoUrl && (
                    <p className="text-text-gray/80 text-xs truncate">
                      Video: {t.videoUrl}
                    </p>
                  )}
                  {t.quoteText && (
                    <p className="text-text-gray text-sm mt-2 line-clamp-2">
                      &ldquo;{t.quoteText}&rdquo;
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    defaultValue={t.displayOrder}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      if (!Number.isNaN(v) && v !== t.displayOrder) {
                        updateOrder(t, v);
                      }
                    }}
                    className="w-16 px-2 py-1 bg-deep-black/60 border border-warm-gold/20 rounded text-text-light text-sm text-center"
                  />
                  <button
                    onClick={() => togglePublish(t)}
                    className="p-2 text-text-gray hover:text-warm-gold transition-colors"
                    title={t.published ? "Unpublish" : "Publish"}
                  >
                    {t.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => remove(t)}
                    className="p-2 text-text-gray hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-text-gray text-xs uppercase tracking-wider mb-1 block">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-deep-black/60 border border-warm-gold/20 rounded-lg text-text-light text-sm focus:outline-none focus:border-warm-gold/40"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block sm:col-span-2">
      <span className="text-text-gray text-xs uppercase tracking-wider mb-1 block">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 bg-deep-black/60 border border-warm-gold/20 rounded-lg text-text-light text-sm focus:outline-none focus:border-warm-gold/40"
      />
    </label>
  );
}
