"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Sort + filter controls for the ranked board. State lives in the URL
 * query string, so the server re-renders the ranked list (SEO-friendly,
 * shareable, no client-side data fetching). Changing a control just
 * rewrites the query and lets the server component do the work.
 */

const SORTS: { value: string; label: string }[] = [
  { value: "composite", label: "Composite" },
  { value: "factor1", label: "Factor 1" },
  { value: "factor2", label: "Factor 2" },
  { value: "contested", label: "Most Contested" },
  { value: "recent", label: "Recently Scored" },
];

const TIERS: { value: string; label: string }[] = [
  { value: "", label: "All tiers" },
  { value: "HIGH", label: "High" },
  { value: "ELEVATED", label: "Elevated" },
  { value: "MODERATE", label: "Moderate" },
  { value: "LOW", label: "Low" },
  { value: "NEGLIGIBLE", label: "Negligible" },
];

const ARCHETYPES: { value: string; label: string }[] = [
  { value: "", label: "All types" },
  { value: "OPERATOR", label: "Operator" },
  { value: "TRAINWRECK", label: "Trainwreck" },
];

function Select({
  label,
  param,
  value,
  options,
}: {
  label: string;
  param: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set(param, next);
      else params.delete(param);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams, param],
  );

  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.2em] text-text-gray/60">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-text-light outline-none transition-colors focus:border-warm-gold/40"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-deep-black">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function BoardControls({
  sort,
  tier,
  archetype,
}: {
  sort: string;
  tier: string;
  archetype: string;
}) {
  return (
    <div className="flex flex-wrap items-end gap-3 sm:gap-4">
      <Select label="Sort by" param="sort" value={sort} options={SORTS} />
      <Select label="Tier" param="tier" value={tier} options={TIERS} />
      <Select label="Type" param="archetype" value={archetype} options={ARCHETYPES} />
    </div>
  );
}
