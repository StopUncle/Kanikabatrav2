# The Dark Mirror - App Development Guide

## Character Psychology Guide (MUST READ)

**Full behavioral reference for writing authentic personality disorder portrayals:**
```
C:\AutonomousEmpire\Apps\SocialApp\content\simulator\psychology\CHARACTER-PSYCHOLOGY-GUIDE.md
```

This guide contains:
- Detailed reaction patterns for each personality type (NPD, ASPD, BPD, HPD, attachment styles)
- Situational responses: abandonment, threats, insults, validation, compliments, being caught in lies
- Player manipulation tactics with risk levels
- Compliments that backfire for each type
- Maris-specific rules (no "always watching" - appears strategically, causes chaos)
- NPD injury rules (DARVO sequence, smear campaigns, never accepts being caught)
- Dialogue patterns and physical tells

**CRITICAL:** Reference this guide when writing any diagnosed character dialogue.

---

## Content Source

Course content is derived from book material located at:
```
C:\AutonomousEmpire\Websites-Directory\KanikaBatrav2\content\pillars\book-chunks\
```

Book chapters (part0.md through part12.md):
- Part 0: Introduction, Holy Grail Doctrine
- Part 1-2: The Doctrine of Cold, Holy Grail Doctrine (continued)
- Part 3-4: The Rotation, Transformation Protocol
- Part 5-6: Predator's Gaze (weakness detection), Architecture of Control
- Part 7-8: Advanced Tactics, Family Dynamics
- Part 9-10: Digital Strategies, The Beige Protocol
- Part 11-12: Advanced Case Studies, Closing Doctrine

**PDF Addendums:**
- `Addendum_Part_1_Narcissists_SAVAGE_INTEGRATED.pdf` - Narcissist neutralization tactics
- `Addendum_Part_2_Avoidants_COMPLETE.pdf` - Avoidant neutralization tactics

## App Content Structure

### Courses (`/content/courses/`)
| Course | Tier | Source Chapters |
|--------|------|-----------------|
| Dark Psychology 101 | Free | Parts 1, 5 (fundamentals) |
| Art of Influence | Premium | Parts 3, 6 (persuasion) |
| Emotional Armor | Premium | Parts 5, 6 (protection) |

### Key Files
- `/content/courses/` - All course content
- `/lib/dailyContent.ts` - Daily rotating content
- `/services/manipulationScannerService.ts` - Text analysis
- `/app/(tools)/manipulation-scanner.tsx` - Scanner UI

## Tier Structure
- **Free**: Basic psychology concepts, fundamentals
- **Premium**: Influence techniques, protection strategies, scanner
- **VIP**: Direct access, advanced tactics, 1:1 coaching

---

## Dual Platform Content Strategy

**Android (Play Store):** Full dating game content with original framing
**iOS (Apple Store):** Apple-safe version with educational framing

Dating scenarios have two versions:
- `content/simulator/scenarios/dating/` - Full version (Android)
- `content/simulator/scenarios/dating-apple-safe/` - Compliant version (iOS)

Platform detection in scenario loader determines which to use.
Apple-safe version reframes "predator" language as "recognition" language:
- "target" → "connection"
- "apex predator" → "pattern mastery"
- "player to predator" → "observer to protector"
- "control" → "boundaries"

**Current priority:** Android build with full content (no Mac for iOS submission yet).

---

# Relationship Simulator - Technical Reference

## Philosophy

**Teach psychology through EXPERIENCE, not explanation.** Players feel the manipulation, recognize it in their gut, then get clinical validation through type labels.

The simulator is educational first - showing DSM personality types upfront so players can practice responses with full awareness.

---

## Visual System Architecture

### Character Portraits (`/components/simulator/CharacterPortrait.tsx`)

Silhouette-based character system with:
- Dynamic eye colors based on emotion
- Breathing animations
- Speaking mouth animations
- Glow effects based on personality theme
- Entry/exit animations per personality type

### Personality Type System (`/lib/immersion/characterThemes.ts`)

Each character has a `personalityType` that maps to:
1. **Theme colors** - Primary, secondary, glow, text colors
2. **Display label** - Clinical term shown on main portrait (e.g., "ASPD (Factor 1)")
3. **Short code** - Compact code for presence strip (e.g., "ASPD-1")
4. **Danger flag** - Whether character triggers danger vignette

---

## Complete Type Reference

### Personality Types (DSM-Based)

#### Cluster B - Dramatic/Erratic
| personalityType | Full Label | Short Code | Color | Danger |
|-----------------|------------|------------|-------|--------|
| `narcissist` | NPD | NPD | Purple #8B5CF6 | Yes |
| `borderline` | BPD | BPD | Pink #EC4899 | Yes |
| `histrionic` | HPD | HPD | Light Pink #F472B6 | No |
| `antisocial` | ASPD | ASPD | Dark Red #991B1B | Yes |
| `psychopath` | ASPD (Factor 1) | ASPD-1 | Darker Red #7F1D1D | Yes |
| `sociopath` | ASPD (Factor 2) | ASPD-2 | Bright Red #B91C1C | Yes |

#### Cluster A - Odd/Eccentric
| personalityType | Full Label | Short Code | Color | Danger |
|-----------------|------------|------------|-------|--------|
| `paranoid` | PPD | PPD | Dark Amber #854D0E | No |
| `schizoid` | SPD | SPD | Cool Gray #475569 | No |
| `schizotypal` | STPD | STPD | Indigo #6366F1 | No |

#### Cluster C - Anxious/Fearful
| personalityType | Full Label | Short Code | Color | Danger |
|-----------------|------------|------------|-------|--------|
| `avoidant` | AvPD | AvPD | Slate #64748B | No |
| `dependent` | DPD | DPD | Cyan #0891B2 | No |
| `obsessive` | OCPD | OCPD | Teal #0F766E | No |

#### Mood Disorders
| personalityType | Full Label | Short Code | Color | Danger |
|-----------------|------------|------------|-------|--------|
| `bipolar` | Bipolar | BD | Amber #FBBF24 | No |
| `depressive` | MDD | MDD | Dark Gray #4B5563 | No |

#### Attachment Styles
| personalityType | Full Label | Short Code | Color | Danger |
|-----------------|------------|------------|-------|--------|
| `anxious-attached` | Anxious Attachment | AP | Amber #F59E0B | No |
| `fearful-avoidant` | Fearful Avoidant | FA | Stone #78716C | No |
| `dismissive-avoidant` | Dismissive Avoidant | DA | Dark Stone #57534E | No |
| `secure` | Secure | SECURE | Green #16A34A | No |

#### Non-Clinical Roles
| personalityType | Full Label | Short Code | Color | Danger |
|-----------------|------------|------------|-------|--------|
| `predator` | Predator | PRED | Deep Red #DC2626 | Yes |
| `healthy` | Ally | ALLY | Green #22C55E | No |
| `friend` | Friend | FRIEND | Gold #C9A961 | No |
| `authority` | Authority | AUTH | Blue #3B82F6 | No |
| `competitor` | Rival | RIVAL | Orange #F97316 | No |
| `neutral` | Unknown | ??? | Gray #A1A1AA | No |

**Keyword Aliases:** The system also recognizes keywords like `npd`, `bpd`, `covert`, `grandiose`, `malignant`, etc. See `PERSONALITY_KEYWORDS` in `characterThemes.ts`.

---

### Silhouette Types (`/lib/silhouettes.ts`)

Body shape configurations for visual differentiation:

| silhouetteType | Description | Head Shape | Shoulders |
|----------------|-------------|------------|-----------|
| `male-athletic` | Strong build, broad shoulders | Square | 1.4x wide |
| `male-lean` | Tall, narrow frame | Oval | 0.9x |
| `male-imposing` | Large, intimidating | Square | 1.6x wide |
| `female-elegant` | Slim, long neck | Oval | 0.82x |
| `female-athletic` | Balanced, athletic | Oval | 1.0x |
| `female-soft` | Rounded, softer features | Circle | 0.88x |
| `authority-cap` | With cap/hat overlay | Oval | 1.05x |
| `hair-styled` | Asymmetric hair volume | Oval | 0.88x |
| `hair-ponytail` | Ponytail/bun style | Oval | 0.85x |
| `hair-short` | Short spiky hair | Oval | 0.95x |
| `default` | Standard proportions | Oval | 1.0x |

---

### Emotion Types (`/content/simulator/types.ts`)

Controls character eye color and expression:

| Emotion | Eye Color | Use When |
|---------|-----------|----------|
| `neutral` | Gray | Default, observing, stating facts |
| `happy` | Warm gold | Genuine warmth, real smiles |
| `seductive` | Pink/magenta | Love-bombing, calculated charm, flirtation |
| `angry` | Red | Mask slipping, real frustration |
| `sad` | Blue | Vulnerability (real or performed) |
| `cold` | Ice blue | Withdrawal, flat affect, threat |
| `confused` | Purple haze | Genuine uncertainty, caught off guard |
| `smirking` | Gold glint | Knowing, playful, subtle mockery |
| `concerned` | Soft blue | Worry, care |
| `knowing` | Sharp gold | Calculated awareness |
| `serious` | Deep gray | Gravity, importance |
| `pleading` | Watery blue | Desperation, begging |
| `curious` | Bright | Interest, questioning |
| `hopeful` | Warm | Optimism, anticipation |

**Key distinction:** `happy` is genuine, `seductive` is calculated. Love-bombing uses `seductive`, not `happy`.

---

### Background Types (`/content/simulator/types.ts`)

Scene locations:

| backgroundId | Description |
|--------------|-------------|
| `apartment` | Modern apartment living room |
| `bar` | Dimly lit cocktail bar |
| `restaurant` | Upscale restaurant at night |
| `coffee-shop` | Cozy coffee shop with warm lighting |
| `office` | Corporate office environment |
| `park` | Sunny park with trees |
| `text-screen` | Phone screen showing text messages |

---

### Mood Types (Particle Effects)

Ambient particle configurations for atmosphere:

| Mood | Particle Style | Colors |
|------|---------------|--------|
| `romantic` | Floating sparkles | Gold, pink, cream |
| `danger` | Falling ash | Dark grays |
| `party` | Sparkle burst | Multi-color |
| `cold` | Slow drift | Ice blue, white |
| `peaceful` | Gentle float | Greens |
| `tense` | Slow pulse | Reds |
| `mysterious` | Drifting motes | Purples |
| `professional` | Subtle drift | Slate grays |

---

### Immersion Effects

#### Screen Shake Presets (`/components/simulator/effects/ScreenShake.tsx`)
| Preset | Intensity | When to Use |
|--------|-----------|-------------|
| `impact` | Heavy | Angry outbursts, confrontation |
| `threat` | Medium | Cold threats, intimidation |
| `heartbeat` | Subtle (repeating) | Romantic/seductive moments |
| `nervousness` | Subtle (repeating) | Anxiety, confusion |
| `revelation` | Medium | Smirking, knowing moments |
| `victory` | Medium | Happy/triumphant moments |
| `defeat` | Heavy | Sad, heavy emotional moments |
| `danger` | Heavy | Predator threats |

#### Haptic Patterns (`/lib/immersion/hapticPatterns.ts`)
- `optimalChoice()` - Satisfying confirmation
- `trapChoice()` - Warning pattern
- `dangerEscalation()` - Threatening moment
- `intimate()` - Romantic tension
- `victory()` - Triumph
- `coldMoment()` - Emotional withdrawal
- `heartRacing()` - Anxiety

---

## Scenario Structure

### Character Definition

```typescript
{
  id: 'marcus',                    // Unique ID for speakerId
  name: 'Marcus',                  // Display name (fixed, not template)
  description: 'Senior Director',  // Role description
  traits: ['powerful', 'cold'],    // Personality traits
  defaultEmotion: 'neutral',       // Starting emotion
  personalityType: 'narcissist',   // Maps to theme colors + labels
  silhouetteType: 'male-imposing', // Body shape
}
```

### Scene Types (3 total)

```typescript
// TYPE 1: CHOICE SCENE - Has choices array
{
  id: 'scene-1',
  backgroundId: 'office',
  dialog: [...],
  choices: [...]  // Player picks an option
}

// TYPE 2: TRANSITION SCENE - Has nextSceneId
{
  id: 'scene-2',
  backgroundId: 'office',
  dialog: [...],
  nextSceneId: 'scene-3'  // Auto-advances
}

// TYPE 3: ENDING SCENE - Has isEnding: true
{
  id: 'ending-good',
  backgroundId: 'park',
  dialog: [...],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Victory',
  endingSummary: 'Summary text.'
}
```

---

## Critical Rules

### The Blank Screen Rule

**`speakerId: 'inner-voice'` can ONLY appear in CHOICE SCENES as the LAST dialog item.**

```typescript
// CORRECT: Inner voice in choice scene, last position
{
  dialog: [
    { text: '"What do you think?"', speakerId: 'marcus', emotion: 'cold' },
    { speakerId: 'inner-voice', text: 'Testing you.', emotion: 'concerned' },
  ],
  choices: [...]  // Has choices = OK
}

// WRONG: Inner voice in transition scene = BLANK SCREEN
{
  dialog: [
    { text: 'He walks away.' },
    { speakerId: 'inner-voice', text: 'Good riddance.' },  // BLANK SCREEN!
  ],
  nextSceneId: 'next'  // No choices = inner voice won't render
}
```

### Character Name Rule

Character names must be **fixed strings**, not templates:

```typescript
// CORRECT
{ id: 'marcus', name: 'Marcus', ... }

// WRONG - displays as "{name}" literally
{ id: 'marcus', name: '{manager_name}', ... }
```

---

## File Structure

### Scenarios Location
```
/content/simulator/scenarios/
├── [scenario-name]/
│   ├── index.ts           # Main export
│   ├── metadata.ts        # Characters, config
│   ├── part1/             # Scene groups
│   ├── part2/
│   └── endings/
│       ├── good.ts
│       ├── neutral.ts
│       └── bad.ts
```

### Key Files
| File | Purpose |
|------|---------|
| `/content/simulator/types.ts` | All TypeScript types |
| `/lib/silhouettes.ts` | Silhouette configurations |
| `/lib/immersion/characterThemes.ts` | Personality themes, labels, colors |
| `/lib/immersion/hapticPatterns.ts` | Haptic feedback patterns |
| `/components/simulator/CharacterPortrait.tsx` | Character rendering |
| `/components/simulator/SceneBackground.tsx` | Background rendering |
| `/components/simulator/effects/ScreenShake.tsx` | Screen shake effects |
| `/components/simulator/effects/MoodParticles.tsx` | Ambient particles |
| `/app/(simulator)/test-visuals.tsx` | Visual testing page |

---

## Writing Guidelines

### Inner Voice Style

The inner voice is your GUT, not a textbook. Short, punchy, instinctive.

**GOOD:**
```typescript
'When you didn\'t chase, they pursued. Interesting.'
'That flicker in his eyes. Irritation.'
'Wait. How did this become about YOUR trust issues?'
```

**BAD:**
```typescript
'This is classic avoidant attachment behavior.'
'DARVO in real time: Deny, Attack, Reverse Victim/Offender.'
```

**Rules:**
- 1-2 lines maximum
- No ALL CAPS labels
- No clinical terminology in dialogue
- Questions work well
- Observations, not explanations

### Choice Feedback Style

Brief, punchy, consequence-focused.

```typescript
feedback: 'Match their energy. They took three days. You take a few hours.'
feedback: 'TRAP: You just showed you were waiting by the phone.'
```

---

## Pre-Commit Checklist

1. Every scene has exactly ONE of: `choices[]`, `nextSceneId`, or `isEnding: true`
2. Inner voice ONLY in scenes with `choices[]`, as LAST dialog item
3. Every `nextSceneId` points to an existing scene
4. Character names are fixed strings, not templates
5. All strings properly escaped
6. Run `npx tsc --noEmit` to check for TypeScript errors
