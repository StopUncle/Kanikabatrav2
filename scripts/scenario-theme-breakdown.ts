import { ALL_SCENARIOS } from "../lib/simulator/scenarios";
import { getTrack } from "../lib/simulator/scenarios";

type Theme = "dating" | "family" | "career" | "social" | "other";

function classify(s: {
  id: string;
  title: string;
  category: string;
  track?: string;
}): Theme {
  const track = s.track ?? "female";
  if (track === "male-dating") return "dating";
  if (track === "male-business") return "career";

  const c = s.category;
  if (c === "dating" || c === "dating-tactics") return "dating";
  if (c === "business" || c === "professional") return "career";
  // Female track — look at mission IDs for family-arc scenarios
  if (/^mission-8|^mission-11|^mission-12/.test(s.id)) return "family";
  if (c === "social-dynamics" || c === "power") return "social";
  if (c === "narcissist" || c === "avoidant" || c === "gaslighter") {
    // Narcissist/etc. scenarios are dating-adjacent unless they're the family arc (handled above)
    return "dating";
  }
  return "other";
}

const rows = ALL_SCENARIOS.map((s) => ({
  id: s.id,
  title: s.title,
  track: getTrack(s),
  category: s.category,
  theme: classify({ id: s.id, title: s.title, category: s.category, track: getTrack(s) }),
}));

const counts: Record<Theme, number> = {
  dating: 0,
  family: 0,
  career: 0,
  social: 0,
  other: 0,
};
for (const r of rows) counts[r.theme]++;

const total = rows.length;
console.log(`Total scenarios: ${total}\n`);
console.log("By theme:");
for (const theme of ["dating", "family", "career", "social", "other"] as Theme[]) {
  const pct = ((counts[theme] / total) * 100).toFixed(0);
  console.log(`  ${theme.padEnd(8)}  ${String(counts[theme]).padStart(2)}  (${pct}%)`);
}

console.log("\nDetail:");
for (const theme of ["dating", "family", "career", "social", "other"] as Theme[]) {
  const inTheme = rows.filter((r) => r.theme === theme);
  if (inTheme.length === 0) continue;
  console.log(`\n[${theme.toUpperCase()}]`);
  for (const r of inTheme) {
    console.log(`  ${r.id.padEnd(22)} ${r.track.padEnd(14)} ${r.category.padEnd(18)} ${r.title}`);
  }
}
