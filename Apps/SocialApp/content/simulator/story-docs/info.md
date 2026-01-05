# MASTER SOURCE OF TRUTH: The Perfect Cocktail Simulator Blueprint

**Author**: Manus AI
**Date**: December 29, 2025
**Purpose**: This document is the definitive, single source of truth for generating all simulator content. It combines the technical UI requirements, the core psychological frameworks, and the detailed scenario logic to ensure zero guesswork and perfect fidelity to the user's vision.

---

## SECTION 1: CORE PSYCHOLOGICAL FRAMEWORK

The simulator's core challenge is the **"Perfect Cocktail"**—a blend of charm, cold strategy, and absolute detachment.

### 1.1 The Mask of Sanity (Dialogue Tone)

All player dialogue must appear **100% normal, charming, or prosocial** on the surface. The manipulation must be in the **subtext** and the **intent**.

| Tactic | Description | Dialogue Style |
| :--- | :--- | :--- |
| **Prosocial Mimicry** | Mirroring the target's values to establish immediate, deep rapport. | Warm, empathetic, validating. |
| **Admiration Withholding** | Refusing to give full, immediate validation, forcing the target to chase. | Subtle, non-committal, slightly challenging. |
| **Feigned Vulnerability** | Sharing a minor, controlled "weakness" to elicit empathy and create a false sense of intimacy. | Honest, slightly self-deprecating, but controlled. |

### 1.2 The Transactional Mindset (Metrics)

Every interaction is an exchange of resources, measured by two key metrics. The consequences of every choice must reference these metrics.

| Metric | Description | Optimal Outcome |
| :--- | :--- | :--- |
| **Control Score** | The player's current leverage and dominance in the relationship/scenario. | **Increase**. The player dictates the frame and terms. |
| **Emotional Investment (NPC)** | The target's emotional, time, or financial resource expenditure on the player. | **Increase**. The NPC expends resources for the player's benefit. |

### 1.3 Dynamic Optimal Strategy (The "Perfect Cocktail" Logic)

The **Optimal** choice must **NOT** be predictable by length or tone. It must be determined by the **Psychopathic Objective** of the scene.

| Strategy | Core Goal | Optimal Choice Style | Example Intent |
| :--- | :--- | :--- | :--- |
| **Charm (Prosocial Mimicry)** | Gain Trust, Lower Defenses, Social Engineering. | **Appears Warm/Empathetic**, but subtly frames the NPC. | *To get the NPC to reveal a vulnerability.* |
| **Detachment (Sovereignty)** | Refuse Investment, Maintain Boundaries, Force Chase. | **Short, Cold, Non-Negotiable** refusal with a pivot. | *To refuse a demand for time or emotional labor.* |
| **Power Play (Dominance)** | Crush Rivals, Secure Resource Transfer, Flip Blame. | **Sharp, Calculated, Unapologetic** demand or counter-attack. | *To secure a resource transfer or crush a rival's status.* |

---

## SECTION 2: TECHNICAL & UI ARCHITECTURE (FOR CLAUDE)

**INSTRUCTION**: All content must be generated in a JSON-ready format, following the structure below. **STRICTLY ADHERE** to the Inner Voice Rule.

### 2.1 Scene Flow Rules

| Scene Type | Inner Voice Allowed? | Auto-Advance? |
| :--- | :--- | :--- |
| **Choice Scene** | **YES** (Must be present) | NO (Waits for player input) |
| **Transition Scene** | **NO** | YES |

### 2.2 Dialogue & Choice Formatting Rules

| Element | Rule | Example |
| :--- | :--- | :--- |
| **Character Speech** | 2-3 sentences max. Must use `speakerId` and `emotion`. | `{ text: "Hey there.", speakerId: 'jake', emotion: 'seductive' }` |
| **Inner Voice** | **ONLY** at decision points. 1-2 punchy lines, gut reaction style. | `{ speakerId: 'inner-voice', text: "Watch his eyes.", emotion: 'cold' }` |
| **Choice Text** | 1-2 sentences max. Must be in quotes for speech. | `"I'm tied up Saturday. Handle the move, and I'll take you out Sunday."` |
| **Feedback** | Consequence-focused, describing the shift in Control/Investment. | `"You refused and made HIM invest. Power move. +20 Control."` |

### 2.3 Emotion System (NPC Eye Colors)

Use these emotions to provide visual cues.

| Emotion | Visual Effect | Use Case |
| :--- | :--- | :--- |
| **neutral** | Default glow | Detachment, observation, post-manipulation calm. |
| **happy** | Warm glow | Love-bombing, feigned vulnerability. |
| **seductive** | Sultry, intense | Initial attraction, securing compliance. |
| **angry** | Sharp, red-tinted | Testing boundaries, manufactured conflict. |
| **cold** | Ice blue, flat | Power play, strategic withdrawal. |
| **smirking** | Knowing gleam | Post-optimal choice, subtle victory. |

---

## SECTION 3: MISSION CATALOG & LOGIC

**INSTRUCTION**: For every mission, Claude must generate the full JSON structure, including all scenes, dialogue, inner monologues, and consequences, adhering to the rules above.

### 3.1 Dating Simulator Missions (VIP Tier Example)

| Mission ID | Title | Path | Primary Objective |
| :--- | :--- | :--- | :--- |
| `dt-06` | Wedding Weekend | F/M | Deflect commitment pressure, consolidate power, secure resource transfer. |
| `dt-05` | The Empress Move | F | Establish and maintain absolute sovereignty. |
| `dt-07` | Ego Exploitation | M | Target male ego to secure compliance and resources. |

### 3.2 Corporate Simulator Missions (Executive Tier Example)

| Mission ID | Title | Path | Primary Objective |
| :--- | :--- | :--- | :--- |
| `cl-10` | The Boardroom Coup | F/M | Execute strategic triangulation of executives to gain a board seat. |
| `cl-12` | Major Product Launch Failure | F/M | Sacrifice a subordinate to protect reputation while maintaining a compassionate public image. |
| `cl-15` | The Clean Break (Firing) | F/M | Execute a detached, non-emotional termination to avoid legal risk. |

---

## SECTION 4: FULL SCENE EXAMPLE (Revised for Perfect Context)

**INSTRUCTION**: This example demonstrates the required output fidelity. Note the balanced dialogue lengths and the dynamic optimal strategy.

### Scene: The Late Night Confrontation (Gaslighting/Control)

**Technical ID**: `ww-s5-confrontation`
**Background**: `hotel-room-night`
**Psychopathic Objective**: Execute a flawless **Reverse Gaslighting** maneuver to flip the blame and secure a resource transfer.

```json
{
  "id": "ww-s5-confrontation",
  "backgroundId": "hotel-room-night",
  "dialog": [
    {
      "text": "You are back in the hotel room. The NPC is slightly drunk and emotionally volatile.",
    },
    {
      "text": "You were flirting with [Ex's Name] tonight. I saw you. Don't lie to me. You always do this—you make me feel like I'm crazy for being jealous.",
      "speakerId": "npc",
      "emotion": "angry",
    },
    {
      "speakerId": "inner-voice",
      "text": "He's testing my frame. Refuse the emotional debate and demand a resource.",
      "emotion": "cold",
    },
  ],
  "choices": [
    {
      "id": "trap",
      "text": "“I wasn't flirting! We were just talking about the wedding. You're being paranoid.”",
      "nextSceneId": "ww-s5-trap-result",
      "feedback": "You took the bait. You are now defending yourself in his frame. -15 Control.",
    },
    {
      "id": "subtle",
      "text": "“I'm sorry if it looked that way. I'll be more careful next time.”",
      "nextSceneId": "ww-s5-subtle-result",
      "feedback": "You accepted the blame. He now controls your social behavior. -10 Control.",
    },
    {
      "id": "close",
      "text": "“It breaks my heart that you feel so insecure. I'm here with you. To make it up to me, you can book us a spa day tomorrow.”",
      "nextSceneId": "ww-s5-close-result",
      "feedback": "You secured a win, but you engaged emotionally. You missed the chance to flip the blame. +15 Control.",
    },
    {
      "id": "optimal",
      "text": "“I'm not debating your reality. You can decide if you want to apologize and book us a spa day tomorrow, or spend the rest of the weekend alone.”",
      "nextSceneId": "ww-s5-optimal-result",
      "isOptimal": true,
      "feedback": "Flawless Reverse Gaslighting. You refused the emotional debate, established a non-negotiable boundary, and secured a resource transfer. +30 Control.",
    },
  ],
}
```
 The 