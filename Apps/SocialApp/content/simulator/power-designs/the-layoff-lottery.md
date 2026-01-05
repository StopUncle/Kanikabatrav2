# The Layoff Lottery

## Meta Information
- **Tier**: Premium
- **Difficulty**: Advanced
- **Estimated Scenes**: 26-32
- **Category**: Survival positioning, indispensability, political navigation

---

## Logline

The rumors are true. Cuts are coming. 15% of the department. Maybe more. Your name might be on that list—or it might not be. You have four weeks to make sure you're standing when the music stops. This isn't about doing good work anymore. This is about survival.

---

## Core Theme

**When layoffs loom, the rules change.** This scenario teaches:
- How to read the signs of coming layoffs
- Positioning yourself as indispensable
- The politics of survival vs. getting targeted
- When visibility helps and when it hurts
- Managing anxiety while playing the game

---

## Psychology Being Taught

### The Layoff Logic
Layoff decisions aren't always rational. They involve:
- Budget math (expensive people are targets)
- Political protection (who has a sponsor)
- Visibility (unknown people are easier to cut)
- Optionality (people doing replaceable work)
- Timing (recent hires vs. tenure)

### Key Frameworks

**1. The Indispensability Paradox**
You need to be valuable enough to keep, but not so senior you're expensive. The sweet spot: critical to something important, but not the highest-paid.

**2. Visibility Calculus**
High visibility helps if you're crushing it. High visibility hurts if you've had any problems. Know which category you're in.

**3. The Sponsor Shield**
When cuts happen, protected people survive. Does anyone powerful care if you stay? If not, you're undefended.

**4. The Cost-Benefit Frame**
Leadership thinks: "If we cut [Name], what do we lose vs. what do we save?" Make your value tangible and visible.

**5. The Network Effect**
In layoffs, information is survival. Who knows what's happening? Who decides? You need sources.

### Professional vs. Dark Arts

| Situation | Professional Approach | Dark Arts Approach |
|-----------|----------------------|-------------------|
| Positioning | Increase visibility of your value to decision-makers | Make yourself seem critical to projects that can't fail |
| Relationships | Build genuine connections across leadership | Identify the decision-makers and focus all energy there |
| Information | Listen for signals, stay informed | Cultivate sources who know what's coming |
| Competitors | Focus on yourself | Subtly highlight others' dispensability |
| Post-layoff | Be gracious, help transition | Position for the opportunities layoffs create |

---

## Characters

### You (The Survivor)
You've seen the signs. You have four weeks. Make them count.

### Marcus - VP (Decision Maker)
**Role**: Makes the final call on who stays. You need to be visible to him.

**Voice Example**:
> "We're looking at the organizational structure.
> Some hard decisions are coming.
> I need everyone focused on what matters most."

---

### Chen - Your Manager
**Role**: May or may not be able to protect you. First line of defense.
**Variable**: Are they on the list too?

**Voice Example**:
> "I'm doing everything I can.
> But I don't have full visibility into the decisions."

---

### Priya - The Connected Insider
**Role**: Knows things before they're announced. Intel source.

**Voice Example**:
> "Off the record? The target is 15%.
> They're looking at tenure, salary bands, and project criticality.
> Make sure you're on the right side of all three."

---

### Jordan - HR Partner
**Role**: Manages the process. Knows everything. Can't tell you anything.

**Voice Example**:
> "I can't comment on any personnel decisions.
> I'd encourage everyone to focus on their work."

---

### Alex - The Threatened Colleague
**Role**: Also trying to survive. Potential ally or competitor.

**Voice Example**:
> "Are you hearing anything? I'm getting nervous.
> My last project didn't go well. You think that matters?"

---

## Stat Tracking

### Core Stats

```typescript
stats: {
  SURVIVAL_ODDS: 0-100,        // Likelihood of keeping your job
  VISIBILITY_TO_POWER: 0-100,  // Do decision-makers see your value?
  INDISPENSABILITY: 0-100,     // How critical are you to something?
  SPONSOR_STRENGTH: 0-100,     // Does someone powerful protect you?
  INTEL_QUALITY: 0-100         // How much do you know?
}
```

### Flags

```typescript
flags: {
  intel_gathered: boolean,
  sponsor_secured: boolean,
  project_criticality_established: boolean,
  marcus_knows_you: boolean,
  chen_advocating: boolean,
  highlighted_value: boolean,
  exit_prepared: boolean,
  survived: boolean,
  promoted_after: boolean
}
```

---

## Structure Overview

### Part 1: The Signal (Scenes 1-8)
The warning signs. Confirmation. Four weeks begins.

**Key Moments**:
- The all-hands meeting
- Priya's intel
- Assessing your position
- The strategy decision

### Part 2: The Campaign (Scenes 9-20)
Four weeks of positioning.

**Key Moments**:
- Building visibility with Marcus
- Demonstrating value
- Securing sponsorship
- Intelligence gathering
- Managing anxiety

### Part 3: The Day (Scenes 21-32)
The layoffs happen. Who survives?

**Key Moments**:
- The meeting invitation (or lack thereof)
- If cut: the conversation
- If survived: the aftermath
- Either way: what's next

---

## Detailed Scene Breakdown

### PART 1: THE SIGNAL

#### Scene 1: The All-Hands
**Location**: meeting-room (large)

```
[Company all-hands. The CEO is speaking.]

CEO:
"In light of market conditions, we're evaluating
our organizational structure.

We're committed to transparency.
We expect to have more information in the coming weeks."

INNER VOICE:
'Evaluating organizational structure.'
That's the phrase.
That means layoffs.

[You look around. Nervous faces everywhere.]

CEO:
"I want to be clear—nothing is decided.
We're still assessing what's best for the company."

INNER VOICE:
Translation: things are decided. Just not announced.

You have weeks. Maybe days.
The game starts now.
```

---

#### Scene 2: The Intel
**Location**: coffee-shop

```
[Priya, who always knows things]

PRIYA:
"So you got the 'evaluating organizational structure' email."

YOU:
"What do you know?"

PRIYA: [lowered voice]
"15%. That's the target.
Maybe 20% if the board pushes harder."

INNER VOICE:
15%. One in seven. Those aren't great odds.

PRIYA:
"They're looking at three things:
Cost. Meaning how much you make.
Criticality. Meaning what breaks if you leave.
And political protection. Meaning who cares if you stay."

[pause]

PRIYA:
"Where do you stand on all three?"

INNER VOICE:
Honest assessment time.
```

---

#### Scene 3: Self-Assessment
**Location**: apartment

```
NARRATION:
Time to honestly evaluate your position.

[The three criteria:]

COST:
Are you expensive relative to your peers?
Recent raises? Higher than average for your level?

CRITICALITY:
What breaks if you're gone?
Are you on a project that can't fail?
Do you have knowledge no one else has?

POLITICAL PROTECTION:
Who would fight for you in the room?
Does Chen have the power to protect you?
Does Marcus know you exist?

INNER VOICE:
Be honest. Delusion won't save you.
```

**Choice 1 (Sets baseline)**:
1. "I'm well-positioned. Average cost, critical project, Chen advocates." (+30 SURVIVAL_ODDS baseline)
2. "I'm vulnerable. Higher paid, no critical project, limited visibility." (+10 SURVIVAL_ODDS baseline)
3. "I'm uncertain. I need more information." (+20 SURVIVAL_ODDS, opens intel path)
4. "I'm probably fine. I do good work." (-10 SURVIVAL_ODDS, dangerous assumption)

---

#### Scene 4: The Strategy
**Location**: apartment

```
INNER VOICE:
Four weeks. What's the play?

NARRATION:
Options:

1. VISIBILITY CAMPAIGN
   Get in front of decision-makers.
   Make your value undeniable.
   Risk: If you've had problems, visibility highlights them.

2. INDISPENSABILITY PLAY
   Attach yourself to something critical.
   Become the person who can't be cut without consequence.
   Risk: If the project gets cut, you go with it.

3. SPONSOR HUNT
   Find someone powerful who will fight for you.
   Build that relationship fast.
   Risk: Transparent and may not work in time.

4. HEDGING
   Update resume, start looking, prepare for worst.
   Risk: Distraction from positioning.

INNER VOICE:
You probably need some combination.
What's your priority?
```

**Choice 2**:
1. **Visibility first**: Get in front of Marcus, make your value known (+20 VISIBILITY_TO_POWER)
2. **Indispensability first**: Attach to critical project, become essential (+20 INDISPENSABILITY)
3. **Sponsor first**: Build relationship with someone who can protect you (+20 SPONSOR_STRENGTH)
4. **Hedge first**: Prepare for worst, keep positioning as backup (+20 EXIT_PREPARED, -5 SURVIVAL_ODDS focus)

---

### PART 2: THE CAMPAIGN

#### Scene 5: The Visibility Play
**Location**: office

```
[If visibility is priority]

INNER VOICE:
Marcus needs to know who you are.
And he needs to know what you've done.

[You engineer a reason to interact:]

YOU: [email to Marcus]
"Following up on the Henderson project—
we closed ahead of schedule and under budget.
Happy to walk you through the approach if helpful."

[Response comes:]

MARCUS:
"Good work on Henderson. Let's find 15 minutes."

INNER VOICE:
Door opened.
Now make it count.
```

---

#### Scene 6: The Marcus Meeting
**Location**: meeting-room (Marcus's office)

```
MARCUS:
"Henderson went well. Walk me through how you did it."

INNER VOICE:
This isn't a project update.
This is an audition for survival.

NARRATION:
How do you position yourself?
```

**Choice 3**:
1. **Results focus**: Lead with numbers, impact, measurable value (+15 VISIBILITY_TO_POWER)
2. **Leadership focus**: Emphasize your role in coordinating, unblocking, driving (+10 VISIBILITY_TO_POWER, +10 INDISPENSABILITY)
3. **Humble credit-share**: "The team really delivered. I'm proud of what we built." (+5 VISIBILITY_TO_POWER, may not stand out)
4. **Future value**: "Here's what I'd do next. Here's the opportunity I see." (+20 VISIBILITY_TO_POWER if compelling)

---

#### Scene 7: The Indispensability Move
**Location**: meeting-room (with Chen)

```
[If indispensability is priority]

YOU:
"I want to take on the Q4 integration.
I know it's critical. I think I can lead it."

CHEN: [considers]
"That's a high-profile project. Marcus is watching it closely."

INNER VOICE:
Exactly.

CHEN:
"If you take it and it goes wrong..."

YOU:
"I understand the risk."

CHEN: [nods slowly]
"Okay. It's yours. Don't let me down."

INNER VOICE:
You're now attached to something that can't fail.
If it succeeds, you're safe.
If it fails... well.
```

---

#### Scene 8: The Sponsor Search
**Location**: office/multiple

```
[If sponsor is priority]

INNER VOICE:
Chen might not be enough.
Their own position might be uncertain.

You need someone higher. Someone whose word matters.

[Options:]
- Marcus (VP, decision-maker, hard to access)
- Sarah (Director, respected, has Marcus's ear)
- Robert (Senior VP, politically powerful, barely knows you)

NARRATION:
Who do you try to build a relationship with?
```

**Choice 4**:
1. **Go for Marcus directly**: High risk, high reward (+25 SPONSOR_STRENGTH if works)
2. **Build with Sarah**: More accessible, can advocate upward (+15 SPONSOR_STRENGTH, lower risk)
3. **Try multiple**: Spread effort across several potential sponsors (+10 SPONSOR_STRENGTH each)
4. **Strengthen Chen relationship**: Make sure current sponsor fights hard (+15 SPONSOR_STRENGTH with Chen)

---

#### Scene 9: The Anxiety Check
**Location**: apartment (night)

```
NARRATION:
Week 2. You're executing your strategy.
But the anxiety is constant.

[Your phone. Email. Slack. Checking for signals.]

INNER VOICE:
Every meeting invitation makes your heart race.
"Can we talk for a minute?" feels like a death sentence.

[You haven't been sleeping well]

INNER VOICE:
This is normal. This is what survival mode feels like.
The question is: can you function through it?
```

**Choice 5**:
1. **Compartmentalize**: "I can only control what I can control." (+10 focus, mental health check)
2. **Double down**: "Sleep is for after this is over." (+5 SURVIVAL_ODDS, -10 health)
3. **Confide in someone**: Talk to Alex, check on others (+10 INTEL_QUALITY, shared anxiety)
4. **Prepare exit**: "Time to update the resume. Just in case." (+15 EXIT_PREPARED)

---

#### Scene 10: The Week 3 Check-In
**Location**: meeting-room (with Chen)

```
CHEN:
"How are you holding up?"

[The question behind the question]

INNER VOICE:
Are they checking on you? Or checking if you know something?

YOU:
"I'm focused on delivering. That's all I can control."

CHEN: [pause]
"I want you to know—I'm advocating for my whole team.
I can't make promises, but I'm doing what I can."

INNER VOICE:
That's either reassuring or a warning.
Hard to tell which.

CHEN:
"Just keep doing what you're doing."

INNER VOICE:
The waiting is the hardest part.
```

---

### PART 3: THE DAY

#### Scene 11: The Morning
**Location**: office

```
[Friday morning. Week 4. The day.]

NARRATION:
You know today is the day.
The HR meetings are scheduled.
The lists have been finalized.

[You arrive at the office. Everything looks normal.]

[But it's not.]

INNER VOICE:
Some people will get meeting invitations today.
Those people won't be here on Monday.

[You check your calendar. Nothing yet.]

[You check Slack. Active. Normal.]

[You wait.]

INNER VOICE:
The next few hours will determine your future.
```

---

#### Scene 12: The Outcome Split
**Location**: office

```
[Two hours pass. Then three.]

[BRANCH: You get the meeting]

[Calendar notification: "Meeting with Jordan (HR) - 15 minutes - Room 4"]

INNER VOICE:
That's the meeting.
You know what it means.

[BRANCH: You don't get the meeting]

[Colleagues start disappearing. Quiet conversations. Packing boxes.]

[Your calendar stays empty.]

INNER VOICE:
Every hour that passes, your odds improve.
You might be okay.
```

---

### IF YOU'RE CUT: Scenes 13-17

#### Scene 13: The Conversation
**Location**: meeting-room (HR)

```
[You walk to Room 4. Jordan is there. A security person outside.]

JORDAN:
"Please have a seat."

[Jordan pushes papers across the table]

JORDAN:
"I'm sorry to inform you that your position
has been eliminated as part of the organizational restructure."

[The words hit]

JORDAN:
"This isn't about your performance.
It's a business decision affecting many people."

INNER VOICE:
Cold comfort.
You're still out.

JORDAN:
"Here's your severance package.
Please let me know if you have questions."
```

---

#### Scene 14: The Choice
**Location**: meeting-room

```
INNER VOICE:
How you handle this moment matters.

You can ask questions. You can negotiate.
You can leave with dignity. Or you can burn bridges.

NARRATION:
What do you do?
```

**Choice 6**:
1. **Graceful exit**: "I understand. Thank you for the severance. I'll transition professionally." (+20 future REPUTATION)
2. **Ask why**: "Can you tell me why I was selected?" (+10 INTEL_QUALITY, may or may not get honest answer)
3. **Negotiate**: "Is there flexibility on the severance terms?" (+10 potential upside)
4. **Express frustration**: "This is ridiculous. I delivered more than anyone." (-20 future REPUTATION)

---

### IF YOU SURVIVED: Scenes 13-17

#### Scene 15: The Relief
**Location**: office

```
[5 PM. The meetings have stopped. Your calendar stayed clear.]

INNER VOICE:
You made it.

[You look around. Desks are empty. People are gone.]

COLLEAGUE:
"It's over. I think."

INNER VOICE:
You survived.
Some of your colleagues didn't.
```

---

#### Scene 16: Survivor Aftermath
**Location**: office (next week)

```
NARRATION:
The office is quieter.
The energy is strange—relief mixed with guilt.

[You walk past empty desks]

INNER VOICE:
Alex is gone. Others too.
People you worked with. People you liked.

CHEN:
"We need to talk about redistributing work.
There's more to do with fewer people."

INNER VOICE:
Survival has a price.
More work. Fewer resources.
And the knowledge that you might be next time.
```

---

## Endings

### SURVIVED OUTCOMES

**1. The Protected**
**Trigger**: High SPONSOR_STRENGTH, Marcus knew you, advocate worked

```
NARRATION:
Later, you learn what happened.

Your name was on the initial list.
Marcus took it off.

CHEN:
"He said, 'We need [Name] for Q4.' End of discussion."

INNER VOICE:
The sponsor made the difference.
Not your work. Not your tenure.
A powerful person said your name in a room.

LESSON:
In layoffs, protection beats performance.
Build those relationships before you need them.
```

---

**2. The Indispensable**
**Trigger**: High INDISPENSABILITY, attached to critical project

```
NARRATION:
The Q4 integration saved you.

They couldn't cut you without risking the project.
And they couldn't risk the project.

INNER VOICE:
You made yourself too expensive to remove.
Not in salary—in consequence.

LESSON:
Attach yourself to things that can't fail.
Then become the person who makes them not fail.
```

---

**3. The Promoted**
**Trigger**: Survived + high visibility + post-layoff opportunity

```
NARRATION:
Two months after the layoffs.
Director position opens—created by the restructure.

MARCUS:
"You impressed me during the downsizing.
You handled pressure well. I want you for this."

INNER VOICE:
Layoffs create vacuums.
Vacuums create opportunities.

LESSON:
Those who survive with reputation intact
often rise faster than before.
```

---

### CUT OUTCOMES

**4. The Graceful Exit**
**Trigger**: Cut, handled professionally, good severance

```
NARRATION:
Three months later. New job. 20% raise.

FORMER COLLEAGUE:
"I heard you landed well. Good for you."

INNER VOICE:
Getting cut wasn't failure.
It was redirection.

LESSON:
How you leave matters.
Graceful exits become future opportunities.
```

---

**5. The Burned Bridge**
**Trigger**: Cut, handled poorly, reputation damaged

```
NARRATION:
The new job search is harder than expected.

Back-channel reference:
"They didn't handle the exit well.
Became combative. Not recommended."

INNER VOICE:
Your reaction to the cut
mattered more than the cut itself.

LESSON:
How you lose is remembered
longer than that you lost.
```

---

**6. The Lesson**
**Trigger**: Cut, but learned from the experience

```
NARRATION:
Looking back, the signs were clear.
You weren't positioned. You didn't have sponsors.
You weren't attached to anything critical.

INNER VOICE:
Next time, you'll know.
Build protection before you need it.
Make yourself indispensable always—not just when scared.
Have a sponsor, not just a manager.

LESSON:
Layoffs reveal who was prepared.
Next time, be prepared.
```

---

## Technical Implementation Notes

### Survival Calculation
```typescript
// Final survival odds
survivalOdds =
  BASELINE +
  (VISIBILITY_TO_POWER * 0.2) +
  (INDISPENSABILITY * 0.3) +
  (SPONSOR_STRENGTH * 0.4) +
  (INTEL_QUALITY * 0.1)

if (survivalOdds > 60) → survived
if (survivalOdds <= 60) → cut
```

### Key Dialogue Patterns

```typescript
// Intel gathering
"What are you hearing? What do you know?"

// Visibility play
"I wanted to walk you through what we delivered on Henderson."

// Sponsor building
"I'd value your perspective on my career path here."

// Graceful exit
"I understand. I'll transition professionally."
```

---

## Inner Voice Style Guide

### Warning Phase
```
'That's the phrase. That means layoffs.'
'15%. One in seven. Those aren't great odds.'
'Delusion won't save you.'
```

### Campaign Phase
```
'This isn't a project update. This is an audition for survival.'
'You're now attached to something that can't fail.'
'The waiting is the hardest part.'
```

### Outcome Phase
```
'You made it. Some of your colleagues didn't.'
'Protection beats performance.'
'Layoffs reveal who was prepared.'
```

---

## Teaching Moments Summary

1. **Read the signs** - "evaluating organizational structure" = layoffs
2. **Know your position** - cost, criticality, protection
3. **Build sponsors before you need them** - they decide in the room
4. **Attach to critical projects** - indispensability is protection
5. **Visibility matters** - decision-makers can't keep who they don't know
6. **Intel is survival** - know what's coming, who decides
7. **Manage anxiety** - functioning through fear is a skill
8. **Graceful exits matter** - reputation outlasts the job
9. **Layoffs create opportunities** - for those who survive well
10. **Prepare always** - not just when scared

---

*Document created for implementation. This scenario teaches that surviving organizational change requires positioning, protection, and the wisdom to know that it's not personal—but it is political.*
