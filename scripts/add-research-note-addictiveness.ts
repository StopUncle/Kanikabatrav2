/**
 * Insert the Simulator Addictiveness research dossier as a pinned note in
 * /admin/content → Research Hub. Full version lives at reference/RESEARCH-addictiveness.md.
 *
 * Run: DATABASE_URL=<prod> npx tsx scripts/add-research-note-addictiveness.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTE = `SIMULATOR ADDICTIVENESS & IMMERSION — RESEARCH + GAP ANALYSIS

THE SCIENCE (compressed)

Hooked Model: trigger → action → variable reward → investment. Variable reward is the under-used lever.
Self-Determination Theory: autonomy + competence + relatedness. We have first two, third is thin.
Flow: clear goals + immediate feedback + challenge≈skill. Friction kills flow.
Variable-ratio reinforcement (Skinner): unpredictable rewards beat predictable ones every time.
Loss aversion (Kahneman): losing a streak hurts ~2x more than gaining new XP. Persistent counters are retention machines.
Zeigarnik effect: open loops occupy more cognitive space than closed ones. Cliffhangers, "X of N endings found."
Compulsion loop: short loop (60-90s) for fun, long loop (days) for retention. Both must run in parallel and be visible.

WHAT WE ALREADY HAVE (already strong, 22 mechanics)
- 3-star verdict (replaced binary pass/fail)
- Mastery percent + optimal/total ratio
- XP count-up animation
- Previous-best comparison + NEW BEST badge
- In-run streak XP bonuses (3/5/7 consecutive optimal)
- Server-authoritative XP replay (anti-cheat)
- 85 per-scenario badges + meta-achievements with progress bars
- Scenario unlock prerequisites (progression gating)
- Boss levels at L5/L6/L10
- LevelJourney unlock-path UI (Candy Crush style)
- Cinematic immersion (mood, shake, ImmersionOverlay - 7 triggers)
- Length-aware typewriter pacing
- Reduced-motion support
- Last-line echo above choice cards
- Resume mid-scenario from server state
- Recommended-reading CTA on failure
- 9 tracks, 33+ scenarios
- Custom CTA hook for /try → Consilium
- Event-tag instrumentation
- Leaderboard + Achievements + Stats screens
- Scenario audit pre-build

This is well above mobile-game median.

TIER 1 — SHIP THIS WEEK (highest leverage, half-to-two-day each)

GAP 1: DAILY STREAK — single biggest DAU lever in mobile games. We have none.
- Add simulatorStreakDays + simulatorLastSessionDate to User
- Reset to 0 if today - lastSession > 1 day
- Top-of-page banner: "🔥 Day N — don't break it"
- Optional: 1 streak freeze per week
- Build: ~half day. HIGHEST-IMPACT SHIP IN THIS LIST.

GAP 2: ENDINGS-FOUND COUNTER — Zeigarnik replay loop.
- Most scenarios have 2-4 endings; player doesn't know they exist.
- Aggregate distinct outcome+endSceneId from choicesMade per scenario.
- Catalog card: "1 / 3 endings found"
- Ending screen: "You found the ___ ending. 2 more paths exist."
- Converts "completed" scenarios from graveyard into hunting ground.
- Build: ~1 day.

GAP 3: AUTO-ADVANCE TO NEXT SCENARIO — Netflix loop.
- Currently passive "Next →" button. Players who feel done click X.
- 5-second countdown bar after ending reveal: "Next: [title] · 5s →"
- Auto-advances unless dismissed. Only on completed-good/passed (don't auto-advance into another loss).
- Build: ~2 hours.

GAP 4: CHOICE-POPULARITY REVEAL — social proof + Bandersnatch hook.
- We log every choice in choicesMade. Aggregating per-scene-per-choice pick rates is one query.
- After choice resolves, brief in-line: "Only 23% of players chose this." Fades after 2s.
- Two simultaneous pulls: identity ("I'm in the rare 23%") + curiosity ("what did the other 77% do?")
- Build: ~1 day. Aggregation endpoint cached 1h + UI overlay.

GAP 5: SOFT CHOICE TIMER ON DANGER BEATS
- On mood:danger choices, render slim 12s progress bar that fills but DOESN'T auto-pick.
- Manufactures embodied pressure without changing outcome.
- Faster choices = more scenes/session = more dopamine cycles.
- Build: ~2 hours.

TIER 2 — SHIP THIS MONTH

GAP 6: NPC MEMORY ACROSS SCENARIOS — "Marcus glances at you. He remembers." Even one line per cross-reference has outsized impact. ~3-5 days. Highly defensible — almost no text game does this well.

GAP 7: IDENTITY PROFILE / "YOUR DARK MIRROR" — every 5 completions, recompute archetype card from choicesMade. Screenshot-shareable. "COLD STRATEGIST · empathy: low · confrontation: high · triangulation: rare · restraint: 73%". ~3 days. Drives organic IG/TikTok.

GAP 8: LOCKED-BUT-VISIBLE LORE DROPS — at level boundaries, dim card "🔒 Kanika's Field Note — unlocks at 5/5 in this level." 60s voice memo on unlock. Bridges to Consilium feed. ~2 days code; content production by Kanika.

GAP 9: CLIFFHANGERS BETWEEN ADJACENT SCENARIOS — pure content edit. Pick 1-2 per level, end on unresolved beat. Next scenario opens on resolution. Pair with the BPD expansion the other Claude is doing.

GAP 10: SOUNDSCAPE PASS — dialog tick, low ambient drone on mood:danger, sting on ImmersionOverlay triggers. Free royalty-free assets exist. Mute toggle. ~1 day. Outsized polish lift.

TIER 3 — DOCUMENT, BUILD LATER
- Push notification storytelling (Lifeline model) — massive but high build
- Variable consequence injection (5-10% of choices unpredictable) — risk to teaching mission, use carefully
- Real-time pacing on long arcs (multi-session, real time gates)
- Cross-scenario unlock paths (Reigns model)
- Replay variants ("play as different archetype")

ON MISSION 1-1's 50% BOUNCE
The cold-open rewrite addressed quality. The bounce will move when L1-1 is the FIRST scenario where multiple Tier 1 mechanics fire together — choice popularity on first hard pick + visible endings counter + soft timer + (eventually) daily streak. M1-1 doesn't need better content; it needs the first minute of a really sticky game.

Full version: reference/RESEARCH-addictiveness.md`;

async function main() {
  const note = await prisma.researchNote.create({
    data: {
      content: NOTE,
      source: 'simulator-research',
      tags: ['simulator', 'addictiveness', 'retention', 'gap-analysis', 'pinned'],
    },
  });
  console.log(`✓ Inserted research note: ${note.id}`);
  console.log(`  Tags: ${note.tags.join(', ')}`);
  console.log(`  Length: ${note.content.length} chars`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
