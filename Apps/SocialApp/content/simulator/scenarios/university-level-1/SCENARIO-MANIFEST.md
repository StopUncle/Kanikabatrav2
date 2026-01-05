# University Level 1: The Caldwell Gala
## Scenario Manifest

### OBJECTIVE
Get a ticket to the Caldwell Gala by any means necessary.

---

### CHARACTERS

#### Primary Characters
| ID | Name | Personality Type | DSM Basis | Default Emotion | Arc |
|----|------|------------------|-----------|-----------------|-----|
| maris | Maris Caldwell | psychopath | ASPD Factor 1 | seductive | Tests → Collects → Uses |
| casey | Casey Chen | anxious-attached | Anxious Preoccupied | neutral | Invisible → Seen → Valued |
| jordan | Jordan Park | authority | Secure | neutral | Gatekeeper → Ally → Handler |

#### Secondary Characters
| ID | Name | Personality Type | Default Emotion | Function |
|----|------|------------------|-----------------|----------|
| alex | Alex Torres | competitor | happy | Exposition, possible rival |
| caleb | Caleb Morrison | dependent | neutral | Cautionary tale |
| priya | Priya | friend | neutral | Intel source |

---

### PATHS

#### Setup (Act 1)
- **Start:** dorm-room-intro
- **Fork:** the-fork
- **Scenes:** 4

#### Party Path (Hard)
- **Entry:** party-arrival
- **Target NPC:** Maris Caldwell
- **Scenes:** 25+
- **Endings:** 4 (1 success, 3 failure)

#### Study Path (Easy)
- **Entry:** study-hall-arrival
- **Target NPC:** Casey Chen
- **Scenes:** 30+
- **Endings:** 4 (2 success, 2 failure)

#### Secret Path (Medium, Locked)
- **Entry:** secret-path-start
- **Unlock:** Notice board hint OR Millie mention
- **Scenes:** 6
- **Endings:** 1 (excellent)

---

### DIALOGUE RECIPE

Each scene follows:
1. **SETTING + CONTEXT** - Location, who's present
2. **INNER VOICE** - Describes dynamic, NOT instruction
3. **NPC DIALOGUE** - Creates the test/trap
4. **FOUR CHOICES:**
   - TRAP: Longest, falls into NPC frame
   - SUBTLE: Safe but passive
   - CLOSE: Good strategy, reveals too much
   - OPTIMAL: Shortest, redirects dynamic
5. **RESULT NARRATION** - Consequence + principle learned

---

### CHARACTER VOICE GUIDES

#### Maris (Psychopath)
- **Charm Mode:** Warm, honeyed, calculated vulnerability
- **Testing Mode:** Direct questions, watching reactions
- **Cold Mode:** Flat, dismissive, mask drops
- **Never:** Genuine emotion, true vulnerability
- **Tells:** Prolonged eye contact (assessing), sharing "secrets" (false intimacy), white knuckles (mask stressed)

#### Casey (Anxious-Attached)
- **Default:** Hedged speech, seeks validation
- **Opening Up:** Shares then panics, tests if you're different
- **Hurt:** Withdraws, self-blames
- **Never:** Confident assertions, demands
- **Tells:** "Is that weird?", retreats into books, eyes go wet briefly

#### Caleb (Dependent)
- **Default:** Apologetic, self-diminishing, rationalizes abuse
- **Explaining:** Logic-based defense of servitude
- **Honest:** Brief flashes of awareness, then back to acceptance
- **Never:** Self-advocacy, anger at Maris
- **Tells:** Flinches at sharp words, smiles after insults, checks if Maris is watching

#### Inner Voice (Player's Gut)
- **Style:** Short, punchy, observational
- **Always:** Describes dynamic, feeling, or observation
- **Never:** Clinical labels, explicit tactics, long explanations
- **Examples:**
  - "Too perfect." (NOT: "She's love-bombing you.")
  - "He laughed. Why did he laugh?" (NOT: "This is Stockholm syndrome.")
  - "That's what supply looks like." (NOT: "He has Dependent Personality Disorder.")

---

### TACTICS TAUGHT

| Path | Tactics |
|------|---------|
| Party | Frame Matching, Strategic Vulnerability, Gray Rock, Deflect-Flip, Bold Honesty |
| Study | Patient Reception, Validation Exchange, Calibrated Relating, Boundary Without Rejection |
| Secret | Pattern Recognition, Alliance Building, Intel Gathering |

---

### RED FLAGS TAUGHT

| Character | Red Flags |
|-----------|-----------|
| Maris | Instant intensity, "You're different", vulnerability too fast, everyone else is "boring" |
| Casey | Constant qualifiers, quick to offer value, "people only want..." |
| Caleb | Smiles after abuse, "she doesn't mean it", fears being alone more than being hurt |

---

### KEY PLOT TWISTS

#### Twist 1: The Casey Reversal
- **Setup:** Alex says Casey "works registration" and "has spare tickets"
- **Reveal:** Casey USED to have access but lost it when her supervisor changed
- **Test:** Does player abandon her when she can't deliver?
- **If Player Stays:** Casey finds alternative route (Watchers, schedule intel)
- **If Player Leaves:** Casey becomes bitter, potential Level 2 antagonist

#### Twist 2: Caleb the Mirror
- **Function:** Shows the end state of Maris's targets
- **Teaching Moment:** "This is what supply looks like. This is what you could become."

---

### ENDINGS SUMMARY

| ID | Title | Path | Type | Summary |
|----|-------|------|------|---------|
| ending-party-success | The Inner Circle | Party | Good | In Maris's collection. Dangerous position. |
| ending-study-success | The Quiet Win | Study | Good | Genuine connection with Casey |
| ending-casey-connection | More Than A Ticket | Study | Good | Survived Casey's twist, stronger bond |
| ending-secret-success | The Watchers | Secret | Excellent | Ticket + intel + allies |
| ending-study-partial | Unfinished Business | Study | Neutral | Second chance tomorrow |
| ending-party-fail | Forgotten | Party | Bad | Dismissed, invisible |
| ending-study-fail | Pattern Recognition | Study | Bad | Too eager, lost Casey |
| maris-disrespect-exit | Erased | Party | Bad | Attacked her identity |
| maris-challenge-exit | Reframed | Party | Bad | Called out, no evidence |
| maris-expose-exit | Marked | Party | Bad | Exposed without backup |
| casey-insult-exit | Cruelty Costs | Study | Bad | Cruelty has no recovery |
| casey-greedy-exit | Exposed | Study | Bad | Agenda too obvious |
| casey-mock-exit | Vulnerability Weaponized | Study | Bad | Dismissed her feelings |
| casey-abandoned-exit | Another One Who Left | Study | Bad | Left when she couldn't deliver |

---

### HIDDEN TRACKING SYSTEM

#### Relationship Scores (per NPC)
```
maris: -100 to +100 (Erased <-50, Collected >75)
casey: -100 to +100 (Betrayed <-50, Bonded >75)
jordan: -100 to +100 (Rejected <-50, Ally >50)
alex: -100 to +100 (Rival <-50, Friend >50)
```

#### Claim Tracking (Lie Detection)
Claims tracked:
- `no-agenda` / `just-looking-for-quiet`
- `no-ticket-interest`
- `has-analytics-skills`
- `no-connections`
- `not-pursuing-tickets`
- `gala-not-main-reason`

Contradicting earlier claims triggers defensive walls (Casey) or filing as "liar" (Maris).

---

### BLANK SCREEN RULE

**`speakerId: 'inner-voice'` can ONLY appear in CHOICE SCENES as the LAST dialog item.**

If a scene has `nextSceneId` (transition scene), inner-voice lines must have `speakerId` removed to become regular narration.

---

### FILE STRUCTURE

```
university-level-1/
├── index.ts              # Main export
├── metadata.ts           # Characters, config, paths
├── SCENARIO-MANIFEST.md  # This file
├── act1-setup/
│   ├── index.ts
│   ├── dorm-room.ts
│   └── the-fork.ts
├── study-path/
│   ├── index.ts
│   ├── arrival.ts
│   ├── meeting-casey.ts
│   ├── rapport.ts
│   ├── discovery.ts
│   ├── casey-twist.ts
│   ├── the-ask.ts
│   └── failure-branches.ts
├── party-path/
│   ├── index.ts
│   ├── arrival.ts
│   ├── first-encounter.ts
│   ├── caleb-encounter.ts
│   ├── the-test.ts
│   ├── escalation.ts
│   ├── ticket-moment.ts
│   └── failure-branches.ts
└── secret-path/
    └── index.ts
```
