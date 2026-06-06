"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewFigurePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [descriptor, setDescriptor] = useState("");
  const [archetype, setArchetype] = useState("");
  const [status, setStatus] = useState("MOST_REQUESTED");
  const [isCalibration, setIsCalibration] = useState(false);
  const [featuredRequest, setFeaturedRequest] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          descriptor: descriptor.trim() || null,
          archetype: archetype || null,
          status,
          isCalibration,
          featuredRequest,
          photoUrl: photoUrl.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not create figure");
      }
      const data = await res.json();
      router.push(`/admin/board/${data.slug}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <Link href="/admin/board" className="mb-6 inline-block text-[11px] uppercase tracking-[0.25em] text-text-gray/60 hover:text-text-light">
        &larr; Figures
      </Link>
      <h1 className="mb-8 text-3xl font-extralight uppercase tracking-wider text-text-light">
        New figure
      </h1>

      <div className="space-y-5">
        <Field label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Real name or archetype label" />
        </Field>
        <Field label="Descriptor">
          <input value={descriptor} onChange={(e) => setDescriptor(e.target.value)} className={inputCls} placeholder="Tech founder, daytime host..." />
        </Field>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Archetype">
            <select value={archetype} onChange={(e) => setArchetype(e.target.value)} className={inputCls}>
              <option value="" className="bg-deep-black">None yet</option>
              <option value="OPERATOR" className="bg-deep-black">Operator</option>
              <option value="TRAINWRECK" className="bg-deep-black">Trainwreck</option>
            </select>
          </Field>
          <Field label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
              <option value="MOST_REQUESTED" className="bg-deep-black">Most requested</option>
              <option value="ON_BOARD" className="bg-deep-black">On board</option>
              <option value="RESCORE_PENDING" className="bg-deep-black">Re-score pending</option>
            </select>
          </Field>
        </div>
        <Field label="Photo URL (optional)">
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className={inputCls} placeholder="https://..." />
        </Field>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-text-gray">
            <input type="checkbox" checked={isCalibration} onChange={(e) => setIsCalibration(e.target.checked)} className="accent-warm-gold" />
            Calibration anchor (off the ranking)
          </label>
          <label className="flex items-center gap-2 text-sm text-text-gray">
            <input type="checkbox" checked={featuredRequest} onChange={(e) => setFeaturedRequest(e.target.checked)} className="accent-warm-gold" />
            Pin to Most Requested
          </label>
        </div>

        {error && <p className="text-sm text-accent-burgundy">{error}</p>}

        <button onClick={submit} disabled={saving} className="rounded-full bg-accent-gold px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-deep-black hover:bg-accent-gold/90 disabled:opacity-50">
          {saving ? "Creating..." : "Create figure"}
        </button>
        <p className="text-xs text-text-gray/50">
          Add the first score on the next screen to put this figure on the board.
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-sm border border-gray-700 bg-white/[0.03] px-3 py-2 text-sm text-text-light outline-none focus:border-accent-gold/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-text-gray/60">{label}</span>
      {children}
    </label>
  );
}
