"use client";

import { useEffect, useState } from "react";
import ProgressRing from "@/components/app-shell/juice/ProgressRing";
import StatTile from "@/components/app-shell/juice/StatTile";
import Sheen from "@/components/app-shell/juice/Sheen";
import Ceremony from "@/components/app-shell/juice/Ceremony";
import EmberBurst from "@/components/app-shell/juice/EmberBurst";
import { useCountUp } from "@/lib/hooks/use-count-up";
import { haptic, hapticsSupported } from "@/lib/haptics";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <p className="mb-2.5 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
        {title}
      </p>
      {children}
    </section>
  );
}

function CeremonyHeadline({ score }: { score: number }) {
  const shown = useCountUp(score, { delayMs: 700, durationMs: 1100 });
  return (
    <>
      {shown}
      <span className="text-[24px] text-[var(--app-dim)]">/10</span>
    </>
  );
}

export default function JuiceGallery() {
  const [ceremony, setCeremony] = useState<null | "drill" | "rank" | "quiet">(
    null,
  );
  // A counter rather than a boolean: bumping it remounts the burst, so a
  // re-fire is guaranteed even if the previous run has not finished settling.
  const [burstKey, setBurstKey] = useState(0);
  const [ringValue, setRingValue] = useState(0.4);

  // Support is a client-only fact, so it has to land after mount or the
  // server and client disagree about this sentence.
  const [canVibrate, setCanVibrate] = useState<boolean | null>(null);
  useEffect(() => setCanVibrate(hapticsSupported()), []);

  return (
    <div className="px-5 pb-8 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Juice gallery
      </h1>
      <p className="mb-7 mt-1 text-[13px] text-[var(--app-muted)]">
        Dev only. Every primitive, every state.
      </p>

      <Section title="Progress ring">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <ProgressRing key={v} value={v} size={48} label={`${v * 100}%`}>
              <span className="text-[10px] tabular-nums text-[var(--app-dim)]">
                {Math.round(v * 100)}
              </span>
            </ProgressRing>
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-4 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <ProgressRing value={ringValue} size={72} strokeWidth={4}>
            <span className="text-[15px] tabular-nums">
              {Math.round(ringValue * 100)}%
            </span>
          </ProgressRing>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={100}
              value={ringValue * 100}
              onChange={(e) => setRingValue(Number(e.target.value) / 100)}
              className="w-full accent-[var(--app-gold)]"
              aria-label="Ring value"
            />
            <p className="mt-1 text-[11px] text-[var(--app-dim)]">
              Drag to check the transition on later changes.
            </p>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-2.5">
          {[
            { c: "var(--app-rose)", n: "rose" },
            { c: "var(--app-green)", n: "green" },
            { c: "var(--app-muted)", n: "muted" },
            { c: "var(--app-gold)", n: "gold" },
          ].map((t, i) => (
            <div
              key={t.n}
              className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-3 text-center"
            >
              <ProgressRing
                value={0.66}
                size={40}
                color={t.c}
                delayMs={i * 120}
                className="mx-auto"
              />
              <p className="mt-1.5 text-[10px] text-[var(--app-dim)]">{t.n}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Stat tile (staggered count-up)">
        <div className="grid grid-cols-3 gap-2.5">
          <StatTile value={1847} label="Standing" delayMs={0} />
          <StatTile value={14} label="day streak" tone="rose" delayMs={120} />
          <StatTile
            value={92}
            label="accuracy"
            suffix="%"
            tone="green"
            delayMs={240}
            hint="best 96"
          />
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <StatTile value={7} label="of 10 correct" ring={{ value: 0.7 }} />
          <StatTile
            value={0}
            label="empty state"
            tone="muted"
            hint="never played"
          />
        </div>
      </Section>

      <Section title="Sheen">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-5">
          <Sheen delayMs={300} />
          <p className="relative text-[15px]">Sweeps once on mount</p>
        </div>
        <div className="group relative mt-2.5 cursor-pointer overflow-hidden rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-5">
          <Sheen trigger="hover" />
          <p className="relative text-[15px]">Sweeps on hover</p>
        </div>
      </Section>

      <Section title="Ember burst (standalone)">
        <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-black)]">
          <EmberBurst key={burstKey} active={burstKey > 0} />
          <div className="relative flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setBurstKey((k) => k + 1)}
              className="rounded-full border border-[var(--app-line)] px-5 py-2 text-[12px] uppercase tracking-[0.16em] text-[var(--app-gold)]"
            >
              Fire
            </button>
            <p className="max-w-[210px] text-center text-[10px] leading-snug text-[var(--app-dim)]">
              One run lasts 1.6s, which is shorter than a screenshot round
              trip. To capture a frame, poll the canvas and stub out
              requestAnimationFrame once it lights up.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Haptics">
        <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <p className="mb-3 text-[11.5px] text-[var(--app-dim)]">
            {canVibrate === null
              ? "Checking support..."
              : canVibrate
                ? "Supported on this device."
                : "Not supported here (expected on iOS Safari)."}
          </p>
          <div className="flex flex-wrap gap-2">
            {(["tick", "select", "success", "warn", "fail", "moment"] as const).map(
              (p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => haptic(p)}
                  className="rounded-full border border-[var(--app-line)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-[var(--app-muted)]"
                >
                  {p}
                </button>
              ),
            )}
          </div>
        </div>
      </Section>

      <Section title="Ceremony">
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => setCeremony("drill")}
            className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-left text-[14.5px]"
          >
            Drill result (count-up headline, stat row)
          </button>
          <button
            type="button"
            onClick={() => setCeremony("rank")}
            className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-left text-[14.5px]"
          >
            Rank up (secondary action)
          </button>
          <button
            type="button"
            onClick={() => setCeremony("quiet")}
            className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5 text-left text-[14.5px]"
          >
            No burst, minimal
          </button>
        </div>
      </Section>

      <Ceremony
        open={ceremony === "drill"}
        onDismiss={() => setCeremony(null)}
        eyebrow="Speed drill"
        headline={<CeremonyHeadline score={9} />}
        subline="Your best yet. The last one nearly had you."
        voice="Speed is the whole point. Thinking gives them time to work."
        action={{ label: "See the misses" }}
        secondary={{ label: "Run it again" }}
      >
        <div className="grid grid-cols-3 gap-2.5">
          <StatTile value={90} label="accuracy" suffix="%" delayMs={1200} />
          <StatTile value={6} label="best combo" tone="rose" delayMs={1300} />
          <StatTile value={20} label="Standing" tone="green" delayMs={1400} />
        </div>
      </Ceremony>

      <Ceremony
        open={ceremony === "rank"}
        onDismiss={() => setCeremony(null)}
        eyebrow="You moved inward"
        headline="Analyst"
        subline="The second ring. Two tracks just opened."
        voice="Most people never get past the door. You did it in nine days."
        action={{ label: "See what opened" }}
        secondary={{ label: "Later" }}
      />

      <Ceremony
        open={ceremony === "quiet"}
        onDismiss={() => setCeremony(null)}
        burst={false}
        haptic={null}
        headline="Day 7"
        subline="A week without missing."
        action={{ label: "Good" }}
      />
    </div>
  );
}
