# Alex Torres

## Overview

| Field | Value |
|-------|-------|
| **ID** | `alex` |
| **Full Name** | Alex Torres |
| **Role** | Exposition / Catalyst |
| **Path** | Act 1 Setup |
| **Personality Type** | `competitor` |
| **DSM Classification** | Non-clinical (Competitor personality, underlying insecurity) |
| **Default Emotion** | `happy` |
| **Silhouette** | `male-athletic` |
| **Gender** | Male |

---

## Clinical Profile

### Personality Markers
- Competitive drive masking insecurity
- Eager to prove himself
- Loud, energetic, ambitious
- First-generation college student (hidden)
- Bravado as defense mechanism

### Hidden Depths
- Never mentions family background
- Fear of failure drives ambition
- Wants to belong to elite circles
- May become ally OR rival based on player choices

---

## Character Arc

### Level 1 Role
1. **Catalyst**: Introduces the gala objective
2. **Exposition**: Explains Maris and ticket system
3. **Options**: Presents party vs. study hall choice
4. **Background**: Sets stakes and social context

### Potential Betrayal (Level 2 Seed)
- If player succeeds via Party Path while excluding Alex
- Alex may sabotage player's position with Maris in Level 2
- Tracked via `alexExcluded` flag

---

## Locations

| Scene | Location | Context |
|-------|----------|---------|
| dorm-room-intro | Dorm Room | Bursts in with gala news |
| dorm-room-explanation | Dorm Room | Explains gala importance |
| dorm-room-the-problem | Dorm Room | Reveals ticket difficulty |
| dorm-room-options | Dorm Room | Presents path choices |

---

## Dialogue Analysis

### Total Lines
- **~12 spoken dialogue lines** in Act 1
- Pure exposition/catalyst role

### Voice Patterns

#### Excited Mode (Default)
```
"Dude. DUDE. The Caldwell Gala is next Friday. Do you know what that IS?"
"The Caldwell family owns half the hotels in the country."
"People have gotten internships, jobs, FUNDING from conversations at that party."
"One guy started a billion-dollar company from a handshake there."
```
- High energy
- Emphatic, uses caps-worthy statements
- Enthusiastic about opportunity
- Sells the dream

#### Defeated Mode
```
"That's the thing. Tickets are invitation-only. The Caldwell heir—Maris—she controls who gets in."
"I've been trying to get her attention all week. Nothing. She doesn't even see people like us."
"Everything! Tried to talk to her at the quad. Commented on her posts. Even brought her coffee."
"She just... looked through me."
```
- Deflates when facing reality
- Admits failure honestly
- Frustrated by invisibility
- Vulnerable beneath bravado

#### Hopeful Mode
```
"Maris is throwing a party tonight at her place. Supposedly it's where she picks her gala guests."
"But there's also this girl Casey who works the gala registration desk."
"So what do you want to do? Maris's party is starting in an hour."
```
- Bounces back quickly
- Always looking for angles
- Presents options
- Competitive optimism

### Key Dialogue Moments

#### The Hook (dorm-room-intro)
> "Dude. DUDE. The Caldwell Gala is next Friday. Do you know what that IS?"

Function: Grabs attention, sets stakes.

#### The Stakes (dorm-room-explanation)
> "One guy started a billion-dollar company from a handshake there."

Function: Establishes gala as life-changing opportunity.

#### The Failure (dorm-room-the-problem)
> "She doesn't even see people like us."

Function: Shows what doesn't work, motivates strategy.

---

## Relationship Tracking

### Score Range
`-100 to +100`

| Score | Status |
|-------|--------|
| < -50 | Rival (active antagonism) |
| -50 to 0 | Excluded (resentful) |
| 0 to 50 | Neutral (parallel paths) |
| > 50 | Friend (shared success) |

### Betrayal Conditions (Level 2)
If player:
- Succeeds at party WITHOUT including Alex
- Gets Maris's attention while Alex fails
- Doesn't share success/strategy

Result: Alex may sabotage in Level 2.

---

## Seeds for Future

### Hidden Background
- First-generation college student
- Family sacrificed for his education
- More pressure than he shows
- Bravado masks genuine fear

### Ally Potential
- If player shares success, becomes loyal friend
- Can be source of social proof in Level 2
- Knows people, works the scene

### Rival Potential
- If player excludes, becomes bitter
- May feed info to Maris about player
- Competitive sabotage

---

## Notes for Dialogue Writing

- **High energy** - uses emphasis, exclamations
- **Bounces between extremes** - excited to defeated quickly
- **Competitive but not malicious** - wants to win WITH you
- **Bravado as armor** - vulnerability leaks through
- Speaks in lists (evidence, options)
- References "people like us" - outsider mentality
