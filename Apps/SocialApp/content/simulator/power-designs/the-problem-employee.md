# The Problem Employee

## Meta Information
- **Tier**: Premium
- **Difficulty**: Advanced
- **Estimated Scenes**: 26-32
- **Category**: Managing down, documentation, performance management, termination

---

## Logline

You're a manager now. And one of your direct reports is a problem. Maybe they're underperforming. Maybe they're toxic. Maybe they're both. Everyone knows it. Nothing has been done about it. Now it's your job. Coach them up or manage them out—but do something, because the whole team is watching.

---

## Core Theme

**Managing difficult employees is one of the hardest parts of leadership.** This scenario teaches:
- The difference between underperformance and toxicity (different problems, different solutions)
- When to coach and when to cut
- Building a documentation trail that protects you and the company
- Having difficult conversations without making things worse
- The impact of inaction on the rest of your team

---

## Psychology Being Taught

### The Leadership Test
How you handle your worst performer reveals your leadership. Ignore them, and you lose your good people. Mishandle them, and you face legal and HR nightmares. Get it right, and you earn the team's respect.

### Key Frameworks

**1. The Two Types of Problem Employees**

| Underperformer | Toxic High Performer |
|----------------|---------------------|
| Doesn't deliver | Delivers but destroys |
| May want to improve | Believes they're above rules |
| Needs coaching first | Needs immediate boundaries |
| Often can be fixed | Rarely worth the cost |

**2. The Documentation Imperative**
Every conversation. Every warning. Every expectation set. In writing. Summarized. Filed. HR will ask for this. So will lawyers. Protect yourself.

**3. The Performance Improvement Plan (PIP)**
The formal process that either rehabilitates or exits the employee. Some PIPs are genuine coaching. Some are paper trails to termination. Know which one you're doing.

**4. The Team Is Watching**
Your other employees see everything. If you tolerate bad behavior, you're implicitly endorsing it. Your A-players will leave before your problem employee does.

**5. The Compassion vs. Accountability Balance**
Being kind doesn't mean being permissive. You can fire someone with dignity. You can set hard boundaries with empathy. These aren't contradictions.

### Professional vs. Dark Arts

| Situation | Professional Approach | Dark Arts Approach |
|-----------|----------------------|-------------------|
| First warning | Private conversation, clear expectations | Document everything, build the exit case from day one |
| Ongoing issues | Coaching, feedback, support | Assign impossible tasks, let them fail visibly |
| The PIP | Genuine improvement plan | 30-day paper trail to termination |
| Termination | Clear, compassionate, fair | Make them want to leave first |
| Team management | Shield team, handle privately | Let team pressure contribute to exit |

---

## Characters

### You (The Manager)
New-ish to management. Inherited this situation. Time to handle it.

### Casey - The Problem Employee (Two Versions)
The scenario adapts based on which type of problem you're facing.

#### Version A: Casey the Underperformer
- Misses deadlines, quality issues, doesn't take ownership
- Seems like they want to do well, just can't deliver
- May be in the wrong role, lack skills, or have personal issues
- Potentially coachable

**Voice Example**:
> "I'm really trying. I just can't seem to get ahead of the workload.
> Can we talk about prioritization?"

---

#### Version B: Casey the Toxic Star
- Delivers results but toxic to everyone around them
- Dismissive, condescending, takes credit, throws others under the bus
- Believes their performance protects them
- Believes they're irreplaceable

**Voice Example**:
> "I hit every target. I'm the top performer on this team.
> If some people can't handle direct feedback, that's their problem."

---

### Jordan - HR Partner
**Role**: Guides the process. Protects the company (not necessarily you).

**Voice Example**:
> "Before we take any action, we need documentation.
> What do you have in writing?"

---

### Morgan - Team Member (Affected by Casey)
**Role**: Represents the collateral damage. The team's frustration personified.

**Voice Example** (About underperformer):
> "We all know Casey isn't pulling their weight.
> We've been covering for them for months."

**Voice Example** (About toxic star):
> "Casey called my work 'amateur hour' in front of the client.
> How is that acceptable?"

---

### Alex - Your Manager
**Role**: Sets expectations. Wants the problem solved. May or may not support you.

**Voice Example**:
> "The Casey situation has gone on long enough.
> I need you to handle it. What's your plan?"

---

## Stat Tracking

### Core Stats

```typescript
stats: {
  DOCUMENTATION: 0-100,        // Paper trail strength
  CASEY_PERFORMANCE: 0-100,    // If coachable, are they improving?
  TEAM_MORALE: 0-100,          // How the rest of the team feels
  HR_ALIGNMENT: 0-100,         // Is HR supporting your approach?
  LEADERSHIP_CREDIBILITY: 0-100 // How Alex sees your handling
}
```

### Flags

```typescript
flags: {
  casey_type: 'underperformer' | 'toxic_star',
  first_warning_given: boolean,
  pip_initiated: boolean,
  coaching_attempted: boolean,
  improvement_shown: boolean,
  termination_executed: boolean,
  casey_resigned: boolean,
  team_mutiny_risk: boolean,
  legal_risk_created: boolean
}
```

---

## Structure Overview

### Part 1: Diagnosis (Scenes 1-8)
Understanding the problem—underperformance or toxicity?

**Key Moments**:
- Inheriting the situation
- Team feedback
- First direct observation
- Casey's self-perception
- HR baseline conversation

### Part 2: Intervention (Scenes 9-20)
Taking action—coaching, warning, or PIP.

**Key Moments**:
- The first difficult conversation
- Setting expectations in writing
- Casey's response
- Documentation building
- Team management

### Part 3: Resolution (Scenes 21-32)
Outcome—improvement, termination, or resignation.

**Key Moments**:
- Progress check (or lack thereof)
- The final conversation
- The termination (if applicable)
- Team aftermath
- Leadership reflection

---

## Detailed Scene Breakdown

### PART 1: DIAGNOSIS

#### Scene 1: The Situation
**Location**: meeting-room (with Alex, your manager)

```
ALEX:
"Let's talk about Casey."

[You knew this was coming]

ALEX:
"This has been going on for a while.
The last manager kicked it down the road.
Now it's on your desk."

INNER VOICE:
You inherited this mess.
But it's your problem now.

ALEX:
"I need a plan within two weeks.
And I need this resolved within 60 days."

INNER VOICE:
Sixty days to fix or exit an employee.
No pressure.
```

---

#### Scene 2: The Team's Perspective
**Location**: office-kitchen

```
[Casual conversation with Morgan, team member]

MORGAN: [lowered voice]
"So you're going to do something about Casey, right?"

[You don't respond directly]

MORGAN:
"Because honestly, we've been covering for them for months.
And the good people on this team are starting to look around."

INNER VOICE:
Morgan just told you the real stakes.
Your A-players will leave before your problem employee does.

MORGAN:
"We all want you to succeed. But we also want to work
with people who pull their weight."

[Morgan walks away. Point made.]
```

---

#### Scene 3: Choose Your Problem
**Location**: office

```
NARRATION:
Time to assess what you're actually dealing with.

[Based on observations, feedback, and data:]
```

**Choice 1 - SETS CASEY TYPE**:
1. **Underperformer**: Casey misses deadlines, quality is low, seems to struggle with the role
2. **Toxic Star**: Casey hits numbers but destroys everyone around them, condescending, takes credit

---

### UNDERPERFORMER PATH

#### Scene 4U: First Observation
**Location**: office

```
[You review Casey's work from the past month]

INNER VOICE:
Three missed deadlines.
Two projects requiring major rework.
One client complaint.

[You check their calendar - they seem busy]

[You check their emails - they work late sometimes]

INNER VOICE:
They're trying. That's not the issue.
They're just... not succeeding.

NARRATION:
Why are they underperforming?
- Wrong role / skill mismatch?
- Personal issues affecting work?
- Poor time management?
- Lack of clear expectations?

INNER VOICE:
Before you can fix it, you need to understand it.
```

---

#### Scene 5U: Casey's Self-Perception
**Location**: meeting-room (1:1)

```
YOU:
"How do you think things are going?"

CASEY: [hesitant]
"Honestly? I feel like I'm always behind.
Like no matter how hard I work, I can't catch up."

[pause]

CASEY:
"I want to do better. I really do.
I just... I don't know what I'm doing wrong."

INNER VOICE:
They're aware. That's actually a good sign.
Unaware underperformers are harder to fix.

CASEY:
"Is there something specific you think I should focus on?"

INNER VOICE:
They're asking for help.
The question is: can coaching fix this?
Or is this a fundamental mismatch?
```

**Choice 2U**:
1. **Coach first**: "Let's identify the key issues and build a plan together." (+15 CASEY_PERFORMANCE potential, +10 DOCUMENTATION)
2. **Set expectations**: "Here's what success looks like. I need to see improvement in 30 days." (+20 DOCUMENTATION)
3. **Reality check**: "I'll be direct—your performance isn't meeting requirements. Let's discuss options." (+10 DOCUMENTATION, harsh but clear)
4. **Explore fit**: "I'm wondering if this role is the right fit. What do you think?" (Opens role change conversation)

---

### TOXIC STAR PATH

#### Scene 4T: The Evidence
**Location**: office

```
[You review the situation]

INNER VOICE:
Casey's numbers are strong. Top 10% on the team.
That's not the problem.

[Slack message from six months ago]
CASEY to junior colleague: "Did you even look at this before sending?
This is embarrassing. Fix it."

[Performance review comment from Morgan]
"Casey dismissed my ideas in front of the client
as 'not strategic enough.'"

[HR file - two informal complaints, no action taken]

INNER VOICE:
They deliver. But at what cost?

The team dreads working with them.
The good people are updating their resumes.
```

---

#### Scene 5T: Casey's Self-Perception
**Location**: meeting-room (1:1)

```
YOU:
"I want to talk about how things are going on the team."

CASEY: [confident, slightly defensive]
"The team? I think we're doing well.
I'm hitting all my numbers."

YOU:
"I've gotten some feedback about communication style."

CASEY: [dismissive]
"Let me guess. Someone's feelings got hurt?

Look, I'm direct. Some people can't handle that.
But my results speak for themselves."

INNER VOICE:
There it is. The star's shield.
"I deliver, therefore I'm untouchable."

CASEY:
"If people can't handle honest feedback,
that's a them problem, not a me problem."

INNER VOICE:
This won't be a coaching conversation.
This is about boundaries and consequences.
```

**Choice 2T**:
1. **Set immediate boundaries**: "Delivering results doesn't excuse how you treat people. That changes now." (+20 DOCUMENTATION, -10 CASEY relationship)
2. **Explain the impact**: "Your results are valued. But the team damage is costing more than your wins provide." (+15 DOCUMENTATION)
3. **Give examples**: "Let me share specific feedback I've received." (+20 DOCUMENTATION, risk of deflection)
4. **HR warning**: "I'm putting you on notice. Another complaint and we start a formal process." (+25 DOCUMENTATION, clear line)

---

### PART 2: INTERVENTION

#### Scene 6: HR Baseline
**Location**: meeting-room (with Jordan, HR)

```
JORDAN:
"So, Casey. Walk me through what's happening."

[You explain the situation]

JORDAN:
"And what documentation do you have?"

INNER VOICE:
The question that reveals whether you're ready.

JORDAN:
"Before we take any formal action, we need a paper trail.
Performance issues documented in writing.
Expectations set clearly.
Opportunities to improve."

[pause]

JORDAN:
"Without that, we're exposed.
They could claim unfair treatment.
We need to do this right."
```

**Choice 3**:
1. **Request PIP guidance**: "Help me set up a formal performance improvement plan." (+20 HR_ALIGNMENT, +15 DOCUMENTATION)
2. **Ask about termination path**: "What do I need to have to move to termination?" (+15 HR_ALIGNMENT, +20 DOCUMENTATION focus)
3. **Coaching first**: "I want to try coaching before formal steps." (+10 HR_ALIGNMENT, delays timeline)
4. **Explore alternatives**: "Is there a role change option? Or exit package?" (+10 HR_ALIGNMENT, explores options)

---

#### Scene 7: The Difficult Conversation
**Location**: meeting-room

```
[The formal performance conversation with Casey]

YOU:
"I want to talk about your performance.
This is a serious conversation."

[If Underperformer - Casey looks worried]
[If Toxic Star - Casey looks annoyed]

YOU:
"I've documented specific concerns.
I need to see meaningful improvement in the next 30 days."

INNER VOICE:
This is where management gets real.
Clear expectations. Documented. Witnessed if possible.

YOU:
"I want you to succeed here. But I need to be honest—
if things don't change, we'll need to discuss next steps."

CASEY:
[Underperformer]: "I understand. I'll do better."
[Toxic Star]: "Is this about those complaints? I thought we discussed this."

INNER VOICE:
You've set the line.
Now you document everything that follows.
```

---

#### Scene 8: Building the Trail
**Location**: office (your desk)

```
[After the conversation]

NARRATION:
You write the summary email.

[Email to Casey, CC to HR file:]

"Per our conversation today, summarizing expectations:
- [Specific deliverable] due by [date]
- [Specific behavior change] expected immediately
- Weekly check-ins to assess progress
- 30-day formal review of performance

Please reply to confirm you've received and understood
these expectations.

Let me know if you have questions."

INNER VOICE:
Paper. Trail. Everything.

[Casey replies: "Got it."]

INNER VOICE:
Receipt confirmed.
```

---

#### Scene 9: The Team Management
**Location**: office

```
[Morgan approaches]

MORGAN:
"Is something happening with Casey?"

INNER VOICE:
The team always knows.

MORGAN:
"People are noticing things are... different.
Casey seems tense. You've been having a lot of meetings."

INNER VOICE:
You can't discuss personnel matters.
But you need to acknowledge reality.

NARRATION:
What do you say?
```

**Choice 4**:
1. **Professional wall**: "I can't discuss individual situations, but I hear the team's concerns." (+10 LEADERSHIP_CREDIBILITY)
2. **Implicit confirmation**: "Things are being addressed. I need the team's patience." (+15 TEAM_MORALE)
3. **Full shield**: "I'm not aware of any situation. Is there something specific?" (-10 TEAM_MORALE, they know you're deflecting)
4. **Ask for support**: "The team's experience matters. Keep documenting specific incidents." (+10 DOCUMENTATION)

---

### PART 3: RESOLUTION

#### Scene 10: The 30-Day Check (Underperformer Path)
**Location**: meeting-room

```
[If coaching Underperformer]

YOU:
"It's been 30 days. Let's review."

[You look at the metrics]

[BRANCH A: Improvement Shown]
NARRATION:
Deadlines met. Quality improved. Attitude engaged.
Something clicked.

CASEY:
"I've been working really hard on the feedback.
How am I doing?"

INNER VOICE:
They turned it around.
The coaching worked.

[BRANCH B: No Improvement]
NARRATION:
Two more missed deadlines. Quality still poor.
The coaching didn't take.

CASEY:
"I know it's not where you wanted.
I'm still trying to figure it out."

INNER VOICE:
Effort without results isn't enough.
Time for the next step.
```

**If improved**: → Good Ending Path
**If no improvement**: → Continuation to PIP/Termination

---

#### Scene 11: The PIP
**Location**: meeting-room (HR present)

```
JORDAN: [HR]
"Casey, we're implementing a formal Performance Improvement Plan.
[Manager] will walk you through the specifics."

[You present the PIP document:]
- 30 days
- Specific measurable goals
- Weekly checkpoints
- Consequences clearly stated

CASEY: [Underperformer - scared]
"I understand. I'll give everything I have."

CASEY: [Toxic Star - defiant]
"Is this really necessary? I hit my numbers."

YOU:
"Please sign acknowledging receipt."

[They sign]

INNER VOICE:
The clock is now running.
30 days to improve—or 30 days of documentation to exit.
```

---

#### Scene 12: The Termination
**Location**: meeting-room (HR present)

```
[If PIP not met, or toxic behavior continued]

JORDAN:
"Casey, thank you for joining us.
Unfortunately, we're ending your employment effective today."

[CASEY's reaction varies:]

[Underperformer]: Sad but not surprised.
"I knew this was coming. Thank you for giving me a chance."

[Toxic Star]: Angry, defensive.
"This is ridiculous. I'm your top performer.
You're going to regret this."

JORDAN:
"We'll provide your final paycheck and benefits information.
Please return your equipment and badge by end of day."

[CASEY leaves]

INNER VOICE:
It's done.
Not easy. But necessary.
```

---

#### Scene 13: Team Aftermath
**Location**: office

```
[The day after Casey's departure]

MORGAN:
"I heard about Casey."

[pause]

MORGAN:
"Thank you. I know that wasn't easy."

INNER VOICE:
They noticed. They appreciate it.

MORGAN:
"For what it's worth—the team respects you for handling it.
Even if it took time."

INNER VOICE:
The A-players were watching.
And they're still here.
```

---

## Endings

### POSITIVE OUTCOMES

**1. Successful Rehabilitation**
**Trigger**: Underperformer improved, still on team

```
NARRATION:
Six months later.
Casey is hitting their targets.
The team has stabilized.

CASEY: [in 1:1]
"I know things were rough. Thank you for not giving up on me."

INNER VOICE:
Sometimes coaching works.
Sometimes people just need clarity and support.

LESSON:
Not every problem employee is a termination.
Some just need direction they never got before.
```

---

**2. Clean Exit**
**Trigger**: Termination executed professionally, team stabilized

```
NARRATION:
Casey is gone. The team is relieved.
No legal issues. No drama.

ALEX: [your manager]
"You handled that well. It's not easy,
but it's one of the most important parts of the job."

INNER VOICE:
Firing someone with dignity and documentation.
That's leadership.

LESSON:
Sometimes the kindest thing is a clean ending.
For them and for everyone around them.
```

---

**3. The Resignation**
**Trigger**: Casey chose to leave during PIP/warning process

```
NARRATION:
Casey resigned before the PIP concluded.

CASEY: [in exit conversation]
"I think this isn't the right fit. I'm going to try something else."

INNER VOICE:
They made the choice themselves.
That's often the best outcome for everyone.

LESSON:
Sometimes people just need permission to leave.
A hard conversation can give them that.
```

---

### PARTIAL OUTCOMES

**4. The Unresolved**
**Trigger**: Some improvement but still marginal

```
NARRATION:
Casey improved. Slightly. Enough to stay.
Not enough to thrive.

INNER VOICE:
They're not a crisis anymore.
But they're not a strength either.

LESSON:
Not every situation resolves cleanly.
Some become managed problems, not solved ones.
```

---

### NEGATIVE OUTCOMES

**5. The Botched Exit**
**Trigger**: Terminated without sufficient documentation

```
[Email from HR Legal]
"Casey has filed a complaint alleging wrongful termination.
We need to review your documentation."

INNER VOICE:
The paper trail wasn't strong enough.
Or the process wasn't clean enough.
Or both.

NARRATION:
Months of legal review ahead.
Your credibility with leadership is damaged.

LESSON:
Document everything. Follow the process.
HR and lawyers exist for a reason.
```

---

**6. Team Exodus**
**Trigger**: Delayed too long, A-players left

```
[Morgan's resignation letter]

MORGAN:
"I've enjoyed working here, but I've accepted
another opportunity. I hope the situation improves."

INNER VOICE:
They were waiting to see if you'd act.
You didn't act fast enough.
Now you've lost someone good to keep someone bad.

LESSON:
Inaction has a cost.
Your best people won't wait forever.
```

---

**7. The Retaliation**
**Trigger**: Toxic star terminated, they fight back

```
[Casey's LinkedIn post goes viral]

"Just got let go after 5 years at [Company].
My crime? Being 'too direct.'

Amazing how top performers get punished
for having standards."

INNER VOICE:
The narrative war begins.
They're positioning themselves as the victim.

LESSON:
Toxic stars don't go quietly.
Be prepared for the aftermath.
```

---

## Technical Implementation Notes

### Employee Type Selection
```typescript
// Early choice sets scenario path
casey_type: 'underperformer' | 'toxic_star'

// Affects dialogue, strategy options, outcomes
if (casey_type === 'underperformer') {
  coaching_likely_to_work = true
} else {
  boundaries_required_immediately = true
}
```

### Documentation Requirements
```typescript
// For termination to succeed legally/professionally
if (DOCUMENTATION > 70 && formal_warnings > 2 && pip_completed) {
  termination_clean = true
} else {
  legal_risk = high
}
```

### Key Dialogue Patterns

```typescript
// Setting expectations
"Here's what success looks like. I need to see improvement in 30 days."

// Documentation email
"Per our conversation today, summarizing expectations..."

// Termination
"Unfortunately, we're ending your employment effective today."

// Team management
"I can't discuss individual situations, but I hear the team's concerns."
```

---

## Inner Voice Style Guide

### Diagnosis Phase
```
'Your A-players will leave before your problem employee does.'
'They're trying. That's not the issue. They're just not succeeding.'
'They deliver. But at what cost?'
```

### Intervention Phase
```
'This is where management gets real.'
'Paper. Trail. Everything.'
'The team always knows.'
```

### Resolution Phase
```
'Sometimes coaching works. Sometimes people just need clarity.'
'Firing someone with dignity and documentation. That's leadership.'
'Inaction has a cost.'
```

---

## Teaching Moments Summary

1. **Diagnose the type** - underperformance vs toxicity require different approaches
2. **Document everything** - dates, specifics, written confirmations
3. **Set clear expectations** - in writing, with timelines
4. **HR is your partner** - involve them early, follow their process
5. **Coaching first for underperformers** - many can be saved with direction
6. **Boundaries first for toxic stars** - they won't self-correct
7. **The team is watching** - your response sets the culture
8. **Inaction costs you A-players** - they leave before the problem does
9. **PIPs can rehabilitate or exit** - know which one you're doing
10. **Termination with dignity is leadership** - it can be done right

---

*Document created for implementation. This scenario teaches that managing problem employees is one of the hardest and most important parts of leadership—and avoiding it costs more than confronting it.*
