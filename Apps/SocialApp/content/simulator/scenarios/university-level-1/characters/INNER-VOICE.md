# Inner Voice

## Overview

| Field | Value |
|-------|-------|
| **ID** | `inner-voice` |
| **Full Name** | Inner Voice |
| **Role** | Player's Gut Instinct |
| **Path** | All Paths |
| **Personality Type** | N/A (Meta character) |
| **Default Emotion** | `neutral` |
| **Silhouette** | N/A (No visual) |
| **Gender** | N/A |

---

## Function

The Inner Voice represents the player's intuition—short, punchy observations that describe dynamics without clinical labels.

### Purpose
1. **Name the feeling** before the player can articulate it
2. **Describe dynamics** without explaining tactics
3. **Create dramatic irony** (player knows more than character shows)
4. **Teaching through observation** not instruction

---

## Critical Rule

### The Blank Screen Rule

**`speakerId: 'inner-voice'` can ONLY appear in CHOICE SCENES as the LAST dialog item.**

```typescript
// CORRECT: Inner voice in choice scene, last position
{
  dialog: [
    { text: 'NPC dialogue...', speakerId: 'npc' },
    { text: 'Observation.', speakerId: 'inner-voice' },
  ],
  dialogueChoices: [...]  // Has choices = OK
}

// WRONG: Inner voice in transition scene = BLANK SCREEN
{
  dialog: [
    { text: 'Narration...' },
    { text: 'Observation.', speakerId: 'inner-voice' },
  ],
  nextSceneId: 'next'  // No choices = inner voice won't render
}
```

**Fix for transition scenes:** Remove `speakerId: 'inner-voice'` to make it regular narration.

---

## Voice Style

### Formula
**Describe the dynamic or feeling, NOT the tactic.**

### Good Examples
```
"Too perfect."
"He laughed. Why did he laugh?"
"That's what supply looks like."
"Spotlight. Ready or not."
"She's handing you her blueprint. Handle with care."
"When you didn't chase, they pursued. Interesting."
"That flicker in his eyes. Irritation."
"Wait. How did this become about YOUR trust issues?"
```

### Bad Examples (NEVER use)
```
"This is classic avoidant attachment behavior."
"DARVO in real time: Deny, Attack, Reverse Victim/Offender."
"She's love-bombing you."
"He has Dependent Personality Disorder."
"This is a manipulation tactic called..."
```

---

## Rules

### Always
- 1-2 lines maximum
- Short, punchy delivery
- Observations, not explanations
- Questions work well
- Describe feelings/dynamics
- Match the scene's emotional temperature

### Never
- Clinical terminology in dialogue
- ALL CAPS labels
- Long explanations
- Explicit tactic names
- Instructional language ("You should...")
- Breaking the fourth wall

---

## Emotion Usage

| Emotion | When to Use |
|---------|-------------|
| `neutral` | Default observation |
| `knowing` | Pattern recognition moment |
| `concerned` | Warning about danger |
| `confused` | Genuine uncertainty |
| `sad` | Witnessing pain |
| `serious` | Gravity, importance |

---

## Dialogue Examples by Context

### Observation
```
"She makes them feel special. Chosen. Then moves on."
"There. That's what's underneath."
"Lonely. Waiting for someone to reach out."
"Careful. She bruises easy."
```

### Warning
```
"You're losing her. Fast."
"Something's wrong."
"The temperature just dropped twenty degrees."
"You could become that. If you're not careful."
```

### Realization
```
"She knew. Of course she knew. The whole game was leading here."
"She used loneliness as a trap. Because loneliness was the trap she was already in."
"Intel. Sometimes that's more valuable than access."
```

### Question
```
"Is this real? Or another game?"
"Did she just share something real? Or perfectly crafted intimacy?"
"He laughed. Why did he laugh?"
```

### Stakes
```
"Two paths. One loud, one quiet. Both lead to the same door."
"Spotlight. Ready or not."
"A test within a test. Choose carefully."
```

---

## Scene Placement

### In Choice Scenes
- Place as **last dialog item** before `dialogueChoices`
- Sets up the decision with intuitive framing
- Player reads gut feeling, then chooses

### In Transition Scenes
- **DO NOT USE** `speakerId: 'inner-voice'`
- Convert to regular narration (remove speakerId)
- Inner voice thoughts still appear, just as narration

---

## Teaching Function

The Inner Voice teaches pattern recognition by:
1. Naming what the player feels but can't articulate
2. Highlighting red flags through observation
3. Creating "aha" moments without lectures
4. Building intuition for manipulation patterns

### Example Teaching Moment

**Scene:** Maris shares "vulnerability" about her family

**Inner Voice:** "Strategic vulnerability. She's creating intimacy. But is any of it real?"

**What Player Learns:** Vulnerability can be a tactic, not just authenticity.

**What Inner Voice Avoids:** "This is a manipulation technique called 'false intimacy disclosure' commonly used by people with ASPD."

---

## Notes for Writing

- Write like a gut feeling, not a textbook
- If it sounds clinical, rewrite it
- Questions create engagement
- Short > long
- Feeling > explanation
- Show don't tell
- Trust the player to connect dots
