# Dark Mirror — Story & Character Arc Document

> **Purpose.** Single source of truth for the simulator's narrative architecture.
> Covers character arcs, scenario-to-scenario connective tissue, tactical/red-flag
> coverage, visual immersion audit, and the plan for L11–L15.
>
> **Generated from:** `npx ts-node scripts/audit-simulator.ts --report`
> (20 scenarios · 342 scenes · 712 dialog lines · 349 choices · 129 endings)

---

## 1. Headline numbers

| Metric | Count | Notes |
|---|---|---|
| Scenarios | 20 | 2 per level × 10 levels |
| Total scenes | 342 | median ~17 per scenario |
| Dialog lines | 712 | ~2.1 per scene — dense but not wordy |
| Choices presented | 349 | avg 4 per decision point |
| Endings authored | 129 | ~6.5 per scenario |
| Distinct tactics taught | 83 | **no repetition** — every tactic unique across the arc |
| Distinct red flags | 79 | **no repetition** — every red flag unique |
| Group scenes | 20 | one per scenario avg — room to grow |
| Immersion triggers used | 9 | low — only 2.6% of scenes |
| Scene shakes used | 5 | very low — only 1.5% of scenes |
| XP total authorable | 5,175 | L1 175 → L10 950 (monotonic) |

**Takeaway.** Content depth is strong (every tactic + red flag unique), but
visual immersion is under-used — only 14 scenes out of 342 have a trigger or
shake. The flash/streak/XP-floater layer runs per-choice, so the baseline is
fine, but major story beats (Maris revealed, DARVO moment, eclipse line at L10)
should earn a full-screen effect.

---

## 2. Character roster & appearance arcs

Recurring speakers are the connective tissue — they turn 20 standalone scenarios
into one decade-long story. Below is each character's arc, ordered by first
appearance.

### Priya — the constant witness (L1-1 → L9-2)

| L1-1 | L1-2 | L2-1 | L2-2 | L3-1 | L3-2 | L4-1 | L4-2 | L5-1 | L5-2 | L7-1 | L7-2 | L8-2 | L9-2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ● | ● | ● | ● | ○ | ○ | ● | ● | ○ | ○ | ● | ● | ○ | ○ |

**Present in 14 of 20 scenarios** — by far the most-used character. Priya is the
reader's anchor: same friend across a decade. Her speaking appearances cluster
at L1–L4 (when you're still learning), and she fades to "cast member, silent" at
L5+ as your world gets more senior. **This is intentional and correct** — she
represents the part of your life that doesn't scale with your ambition. Keep
her silent-cast in L5+ so her absence has weight.

**Arc gap:** Priya never gets a callback line in L10. **Recommendation:** in
`mission-10-1` or `mission-10-2`, one inner-voice line referencing Priya's
absence at the gala (she's home with her kid now, say) — closes the loop.

### Maris — the primary antagonist (L1-2, L3-2, L5-1, L5-2)

Introduced in 1-2 as the charmer at a rooftop bar. Returns in 3-2 (guilt-trip
escalation), 5-1 (the power shift — you outrank her peer), and 5-2 (the throne
— you're offered her level, she tries to take it from you). After L5 she's
retired/gone, referenced in L10-2 ("two years after The Gatekeeper, Maris is
retired or gone").

**This is the cleanest arc in the script.** She's the villain who teaches you
the entire Cluster B playbook, and her defeat isn't a confrontation — it's you
walking past her at L5-2 and continuing up.

**Arc gap:** Between L3-2 and L5-1 there's a 4-level silence (L4 uses different
antagonists — Avery, unspecified DARVO abuser). **Recommendation:** in `mission-4-1`
(The Smear) or `mission-4-2` (DARVO), one scene where the smear is traced back
to Maris specifically — turns L4 from "random workplace abuser" into "Maris's
second campaign." Strongly strengthens continuity.

### Kaya — the senior mentor (L8-1, L8-2, L9-1, L9-2, L10-2)

Appears at L8, stays through L10. She's the version of you two tiers up — the
person who sees your game because she played it. In L10-2 she's retiring and
naming you her successor.

**Strong arc.** The handoff in L10-2 ("the final mastery is elevating the person
who'll surpass you") works because Kaya modeled it.

**Arc gap:** Kaya never appears at L10-1 (The Gatekeeper). She's the obvious
person to call you after you reject Elias's offer. **Recommendation:** add a
Kaya inner-voice reference in `mission-10-1` ending scenes — "Kaya would have
said the same thing" or similar.

### Lennox — rival-turned-ally (L5-2, L10-2)

Introduced as Maris's potential successor at L5-2, you recruit her instead of
beating her. Returns in L10-2 as the nomination you should make. **6-year gap
between appearances** — this is a feature, not a bug. Shows what coalition-
building actually compounds into.

### Devon — the protégé (L10-1, L10-2)

Introduced L10-1 (you choose whether to mentor). Returns L10-2 as the wrong
answer to the nomination (loyalty over judgment). This is tight — two
appearances, same person, perfect coda.

### Marcus — the zero-sum competitor (L6-1, L6-2)

Appears in both L6 scenarios. L6-1 he steals your credit; L6-2 he becomes
context for your salary negotiation. Arc is complete within L6.

### The Mother + Golden Sibling — the family (L8-1, L8-2)

Both appear in both L8 scenarios. L8-1 is the golden-child triangulation; L8-2
is the no-contact decision. Self-contained family arc. **Working as intended.**

### Aria — the protégé-before-Devon (L9-2 cast only, L10-1)

Aria appears silently in L9-2 then speaks in L10-1. Mentioned as having "left
for another company" in L10-2. Short but functional arc.

### Short-appearance characters (arc gaps)

| Character | Appears in | Issue |
|---|---|---|
| Alex | 1-1, 2-1 | Vanishes after L2 — was initially a candidate for long-term friend, replaced by Priya |
| Dana | 1-1, 2-2 | Peripheral — fine as-is |
| Morgan | 2-1 (silent) | Never returns — could be removed from cast |
| Jordan | 2-2 (silent) | Never returns — could be removed from cast |
| Avery | 4-1 (cast), 4-2 (speaker) | Limited to L4 — fine, L4 is "the workplace smear arc" |
| Sage | 6-1 (silent) | Never returns — consider re-using in L11+ |
| Elias | 7-1 (silent), 10-1 (speaker) | Interesting — the gatekeeper who shows up twice |
| Nova | 7-1 (silent), 7-2 (speaker) | Self-contained L7 arc |

**Recommendation — character economy:** Morgan and Jordan are listed in cast
but never speak and never return. Either drop them or bring them back as
silent callbacks in L11–L15. No need to clean them up now — low priority.

---

## 3. Visual story graph (level-by-level)

Each level has 2 scenarios. Below, the arc through decision space:

```
L1 — The First Frame (free, beginner, 175 XP)
  1-1 Morning After ─── peer gossip, info currency
  1-2 Charm Offensive ── MARIS introduced, love-bomb pattern

L2 — The Group (free, beginner, 235 XP)
  2-1 Group Chat ───────  public-private manipulation
  2-2 Proxy ─────────────  flying-monkey identification

L3 — The Ask (free, intermediate, 290 XP)
  3-1 Favor ─────────────  scope creep on "no"
  3-2 Guilt Loop ────────  MARIS RETURNS, performed crisis

L4 — The Attack (premium, intermediate→advanced, 375 XP)
  4-1 Smear ─────────────  covert smear response
  4-2 DARVO ─────────────  direct DARVO confrontation

L5 — The Power Shift (premium, advanced, 475 XP)
  5-1 Power Shift ───────  MARIS outranked
  5-2 Throne ────────────  MARIS final appearance, LENNOX recruited

L6 — The Workplace (premium, advanced, 575 XP)
  6-1 Credit Thief ──────  MARCUS steals attribution
  6-2 Raise ─────────────  salary negotiation post-attack

L7 — The Exit (premium, advanced, 600 XP)
  7-1 Rotation ──────────  fading romance diagnosed
  7-2 Exit ──────────────  leaving the shape, not the person

L8 — The Family (premium, advanced, 675 XP)
  8-1 Golden Child ──────  MOTHER+SIBLING triangulation
  8-2 No Contact ────────  family exit, minimum-viable message

L9 — The Covert Campaign (vip, advanced, 825 XP)
  9-1 Slow Bleed ────────  covert narc peer damaging pipeline
  9-2 Counter-Campaign ──  quiet-meeting response

L10 — The Legacy (vip, advanced, 950 XP)
  10-1 Gatekeeper ───────  ELIAS's offer to gatekeep
  10-2 Inheritance ──────  KAYA retires, LENNOX/DEVON nomination
```

**The arc is legible.** L1–L3 = personal learning (free tier). L4–L5 = first
major antagonist campaign (Maris). L6–L7 = workplace maturation. L8 = family.
L9 = covert adult operators. L10 = legacy. XP scales monotonically 175 → 950.
Difficulty scales beginner → intermediate → advanced. **No changes needed to
the macro structure.**

---

## 4. Tactical & red-flag coverage

**83 distinct tactics, 79 distinct red flags, zero repetition.** This is
remarkable — every scenario teaches a *different* lesson. Samples:

- **L1 tactics:** information as currency, silence vs. engagement, frame rejection
- **L5 tactics:** exit at peak not after peak, implied receipts without display
- **L8 tactics:** refusing to rescue the storm-out, siblings as allies not ammo
- **L10 tactics:** elevating someone who'll surpass you, judgment independent
  of your mentorship tree

**No gaps in the curriculum.** Every tactic used in the book appears somewhere.
The variety is the achievement here.

---

## 5. Visual immersion audit

### The gap

- **Immersion triggers used: 9 scenes / 342** (2.6%)
- **Scene shakes used: 5 scenes / 342** (1.5%)

This is the biggest improvement opportunity in the codebase. Baseline per-choice
effects (flash, streak, XP floater) are wired up, but major narrative beats
aren't amplified. A player hits L5-2 "the throne" with the same visual weight
as L1-1 scene 3.

### Scenes that should have a trigger (recommended)

| Scenario | Scene | Trigger | Why |
|---|---|---|---|
| 1-2 | First time Maris's tactic is named | `manipulation-detected` | First reveal |
| 3-2 | Maris crisis phone call | `shock` | Mask-drop moment |
| 4-2 | DARVO reversal moment | `red-flag-revealed` | Core lesson |
| 5-1 | Maris peer interaction after shift | `cold-moment` | Power has moved |
| 5-2 | Throne offer accepted | `victory` | End of Maris arc |
| 8-1 | Mother's crying performance | `manipulation-detected` | Family DARVO |
| 8-2 | Send the no-contact message | `cold-moment` | Irreversible |
| 9-1 | First name named in the counter-campaign | `shock` | Covert revealed |
| 10-1 | Reject gatekeeper offer | `victory` | Not joining the club |
| 10-2 | Name Lennox, knowing she'll eclipse | `victory` | **Arc conclusion** |

That's 10 new triggers — doubles the current count. **Priority: do 10-2 first**
(the eclipse line at the end of the entire simulator should be the biggest
visual moment in the game).

### Scenes that should have a shake

| Scenario | Scene | Preset | Why |
|---|---|---|---|
| 3-2 | Maris screams on call | `threat` | Physical beat |
| 4-2 | DARVO reversal lands | `revelation` | Realization |
| 5-1 | Public peer confrontation | `threat` | Hostility |
| 8-1 | Mother's storm-out | `shock` | Physical |
| 10-1 | Elias's veiled threat | `threat` | Power move |

### Group-scene density

- 20 group scenes across 20 scenarios = exactly 1 per scenario avg.
- The mini-silhouette rendering (55% size for supporting chars, full size for
  speaker) is implemented but **under-deployed**. L2-1 (Group Chat), L8-1
  (Family Dinner), L9-2 (Counter-Campaign allies meeting) should have 2-3
  supporting silhouettes visible throughout, not just in one scene.

---

## 6. Content-level improvements to ship

These are small, targeted edits — not rewrites. Each ~5 lines of changes.

1. **L4 → Maris continuity.** In `mission-4-1.ts` or `mission-4-2.ts`, add one
   inner-voice line: *"The phrasing. You've heard it before. From a rooftop
   bar, years ago."* Converts L4 from "a workplace abuser" to "Maris's second
   campaign."
2. **L9 → L10 Aria bridge.** In `mission-10-1.ts`, one reference line about
   Aria — *"Aria took the other offer. She said the right no. You were
   proud."* Closes her arc so L10-2's mention of her departure has weight.
3. **L10 → L1 callback.** In `mission-10-2.ts` Lennox ending, add one line
   referring back to the rooftop bar at L1-2. Already partially present ("The
   one who tried the Maris playbook on you six years ago") — strengthen with
   *"Eight years ago you were the one at the rooftop bar."* Mirrors the arc.
4. **Priya L10 coda.** One inner-voice line in L10-1 or L10-2: *"Priya is
   home with her daughter tonight. That's still the point, too."* Keeps the
   constant-friend arc alive into the finale.
5. **Devon self-awareness in L10-2 "revise-devon" branch.** The catch-your-
   own-bias ending is the best choice. One line: *"Devon will remember this
   as the time you taught them what judgment over loyalty looks like."*

---

## 7. L11–L15 plan

The existing L1–L10 arc is complete: *novice → power → legacy*. L11–L15 can't
be "more ambition" without feeling padded. **Proposal: widen the lens.** L11–15
covers parts of life that aren't about climbing — they're about what you do
with what you built.

### The hybrid design (5 levels, 10 scenarios)

| Level | Title | Scenario A | Scenario B | Theme |
|---|---|---|---|---|
| **L11** | The Reconciliation | 11-1 "The Letter" | 11-2 "The Return" | The person you cut off (family? ex-Maris protégé?) reaches out. Do you re-open? When is reconciliation real and when is it re-infiltration? |
| **L12** | The Coup | 12-1 "The Whisper" | 12-2 "The Counter" | You're now senior enough to be the target. A faction inside your org is organizing against you. Detect, respond, or absorb? |
| **L13** | The Crisis | 13-1 "The Allegation" | 13-2 "The Statement" | Public accusation (true-but-unfair, or false). Navigate PR, legal, allies, audience. Book-buyer territory Kanika knows well. |
| **L14** | The Partnership | 14-1 "The Proposal" | 14-2 "The Shareholder" | Someone proposes a merger / business partnership / marriage-equivalent. Align values at scale. Due-diligence on humans. |
| **L15** | The Mirror | 15-1 "The Protégé Fails" | 15-2 "The Final Letter" | Devon (or new protégé) makes the mistake you made at L1. Also: write your own letter to who you were at L1. Loop-closer. |

### Why this works

- **Widens without inflating.** L1–L10 is vertical (climb). L11–L15 is horizontal
  (what life does to someone at the top).
- **Reuses the cast.** No new cast members required — Maris's protégé, Kaya
  retired, Devon in trouble, Priya still there. Everyone we've already paid for
  gets one more appearance.
- **Ties back to the book.** L13 (The Crisis) is the most-requested real-world
  scenario in Kanika's DMs. L11 (The Reconciliation) is the hardest one people
  face after going no-contact.
- **XP arc.** L11 1,100 / L12 1,300 / L13 1,500 / L14 1,700 / L15 2,000 — keeps
  monotonic growth. Total authorable XP across L1–L15 ≈ 12,775.
- **Tier gating.** All L11–L15 = VIP tier (same as L9–L10). Makes the Consilium
  premium worth its own arc.

### Character returns in L11–L15

- **Priya:** Speaks again in L15-2 (final letter). Returns to center.
- **Lennox:** L14 (the partnership — she's the co-founder equivalent).
- **Devon:** L15-1 (the fall). Closes the protégé loop.
- **Kaya:** L15-2 (one-line benediction from retirement).
- **Maris's protégé (new, inherits Maris's tactics):** L11-2 and L12. The next
  generation of the same game.
- **A new character (crisis lawyer? PR operator?):** L13 only, one-and-done.

### Authorable risk

- L13 (The Crisis) is the highest-stakes write. The line between teaching
  crisis navigation and sounding like generic PR advice is narrow. Kanika's
  voice will sell it — draft should lean on specific Kanika-isms.
- L11 (The Reconciliation) is the easiest to get wrong. It has to teach *real*
  reconciliation as a rare outcome without endorsing open-door policies.

### Build order recommendation

1. **L15 first.** The final loop-closer is the north star — once it's written,
   L11–L14 write themselves as bridges to it.
2. **L13 second.** Highest content value and most-requested.
3. **L11 third.** Emotional difficulty up-front.
4. **L12 and L14 last.** Both are re-plays of familiar mechanics at new tiers.

---

## 8. Quick-audit checklist for new scenarios

When adding L11–L15, run:

```bash
npx ts-node scripts/audit-simulator.ts --report
```

Must pass:
- 0 errors, 0 warnings.
- Every new character speaks at least once (appears as ● not ○).
- No duplicate tactics vs. existing 83.
- No duplicate red flags vs. existing 79.
- At least 1 immersion trigger per scenario at a major beat.
- At least 1 group scene per scenario (most have this already).
- Endings count ≥ 4 per scenario; choice paths all terminate at an ending.

---

## 9. What's already tight (don't change)

- The **per-choice visual layer** (flash, streak, XP floater, scene progress pips).
- The **character silhouette role system** (speaker full-size, supporting 55%).
- The **macro XP/tier/difficulty curve** L1–L10.
- **Priya's deliberate silence at L5+** — her absence carries meaning.
- **Maris's L3-2 → L5-2 arc** — one of the cleanest antagonist exits in the corpus.
- **L10-2 as the finale** — the eclipse line is the right last line for L1–L10.

---

*Doc version: 2026-04-17. Regenerate on significant scenario additions.*
