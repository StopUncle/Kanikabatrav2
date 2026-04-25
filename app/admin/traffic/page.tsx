"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Bucket {
  label: string;
  count: number;
}

interface TrafficData {
  window: { days: number; since: string };
  users: {
    total: number;
    bySource: Bucket[];
    byCampaign: Bucket[];
    byCountry: Bucket[];
    untagged: number;
  };
  quiz: {
    total: number;
    bySource: Bucket[];
    byCampaign: Bucket[];
    byCountry: Bucket[];
    untagged: number;
  };
}

const WINDOWS = [1, 7, 30] as const;

export default function TrafficSourcesPage() {
  const [days, setDays] = useState<number>(7);
  const [data, setData] = useState<TrafficData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/admin/traffic-sources?days=${days}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [days]);

  return (
    <div className="min-h-screen bg-deep-black text-text-light p-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-text-gray hover:text-accent-gold mb-6 text-sm"
        >
          <ArrowLeft size={14} /> Admin
        </Link>

        <h1 className="text-3xl font-extralight tracking-wide mb-2">
          Traffic Sources
        </h1>
        <p className="text-text-gray/70 text-sm mb-6">
          UTM + click-ID + country attribution captured at registration and
          quiz creation. Untagged rows are direct or organic with no referrer.
        </p>

        <div className="flex gap-2 mb-8">
          {WINDOWS.map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                days === d
                  ? "bg-accent-gold text-deep-black font-medium"
                  : "border border-accent-gold/30 text-accent-gold/70 hover:border-accent-gold/60"
              }`}
            >
              Last {d}d
            </button>
          ))}
        </div>

        {loading || !data ? (
          <p className="text-text-gray text-sm">Loading…</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <Panel
              title="Registrations"
              total={data.users.total}
              untagged={data.users.untagged}
              bySource={data.users.bySource}
              byCampaign={data.users.byCampaign}
              byCountry={data.users.byCountry}
            />
            <Panel
              title="Quiz takes"
              total={data.quiz.total}
              untagged={data.quiz.untagged}
              bySource={data.quiz.bySource}
              byCampaign={data.quiz.byCampaign}
              byCountry={data.quiz.byCountry}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  total,
  untagged,
  bySource,
  byCampaign,
  byCountry,
}: {
  title: string;
  total: number;
  untagged: number;
  bySource: Bucket[];
  byCampaign: Bucket[];
  byCountry: Bucket[];
}) {
  const tagged = total - untagged;
  const pct = total > 0 ? Math.round((tagged / total) * 100) : 0;

  return (
    <div className="bg-deep-black/40 border border-accent-gold/15 rounded-xl p-5">
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-lg font-light text-white">{title}</h2>
        <div className="text-right">
          <div className="text-2xl font-extralight text-accent-gold">{total}</div>
          <div className="text-text-gray/50 text-[10px] uppercase tracking-wider">
            total
          </div>
        </div>
      </div>

      <div className="text-xs text-text-gray/70 mb-4">
        {tagged} attributed · {untagged} untagged ({pct}% tagged)
      </div>

      <Bucketed title="By source" rows={bySource} total={total} />
      <Bucketed title="By campaign" rows={byCampaign} total={total} />
      <Bucketed title="By country" rows={byCountry} total={total} />
    </div>
  );
}

function Bucketed({
  title,
  rows,
  total,
}: {
  title: string;
  rows: Bucket[];
  total: number;
}) {
  if (rows.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-text-gray/60 mb-2">
          {title}
        </h3>
        <p className="text-text-gray/40 text-xs italic">No data</p>
      </div>
    );
  }
  const max = Math.max(...rows.map((r) => r.count));
  return (
    <div className="mb-4">
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-text-gray/60 mb-2">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {rows.slice(0, 8).map((r) => {
          const pct = total > 0 ? (r.count / total) * 100 : 0;
          const barW = max > 0 ? (r.count / max) * 100 : 0;
          return (
            <li key={r.label} className="flex items-center gap-2 text-xs">
              <span className="w-28 truncate text-text-light">{r.label}</span>
              <div className="flex-1 h-2 bg-deep-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-gold/70"
                  style={{ width: `${barW}%` }}
                />
              </div>
              <span className="w-12 text-right text-text-gray">
                {r.count}
              </span>
              <span className="w-10 text-right text-text-gray/50">
                {pct.toFixed(0)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
