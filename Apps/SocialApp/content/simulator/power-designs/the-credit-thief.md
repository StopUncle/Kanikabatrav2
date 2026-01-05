# The Credit Thief

## Meta Information
- **Tier**: Free
- **Difficulty**: Intermediate
- **Estimated Scenes**: 22-28
- **Category**: Credit reclamation, documentation, strategic confrontation

---

## Logline

You built the solution. You stayed late. You figured out the thing no one else could. And in the meeting with the VP, your colleague smiled and said "we" while looking directly at the camera. Except there was no "we." There was you. Now everyone thinks it was them. What do you do?

---

## Core Theme

**Credit is currency—and someone just picked your pocket.** This scenario teaches:
- Why credit theft happens and who does it
- How to document and protect your work preemptively
- The art of reclaiming credit without looking petty
- When to confront privately vs. publicly
- The long game: making yourself impossible to steal from

---

## Psychology Being Taught

### Why Credit Theft Works
Most people are too polite to call it out. The thief knows this. They count on your discomfort. Your silence is their profit.

### Key Frameworks

**1. The Documentation Defense**
Paper trails are armor. If you can prove it was yours before they claim it, you win. If you can't, it's your word against theirs—and they spoke first.

**2. The Public vs. Private Calculation**
- Public confrontation: High risk, high visibility, can look petty
- Private confrontation: Lower risk, no witnesses, they may deny
- Strategic correction: Reframe without direct accusation—cleanest

**3. The "We" Weapon**
Thieves use "we" and "the team" to blur ownership. Counter by being specific: "The approach I designed," "The solution I developed."

**4. Credit Compounding**
One stolen credit might seem small. But credit compounds. Stolen credit becomes their promotion, their raise, their reputation. Your silence is their career.

**5. The Repeat Offender Pattern**
Credit thieves rarely steal once. If you let it slide, you've marked yourself as a target. They will do it again.

### Professional vs. Dark Arts

| Situation | Professional Approach | Dark Arts Approach |
|-----------|----------------------|-------------------|
| In the moment | "Just to add context—I developed that approach when..." | Let them take credit, then correct the record in writing after |
| Private confrontation | "I noticed you presented my work as yours. Can we discuss?" | "I'm sure you didn't mean to, but the VP now thinks you did X. I need to make sure the record is clear." |
| Documentation | Keep personal records, share progress updates | BCC key stakeholders on all deliverables |
| Long-term | Build direct relationships with leadership | Make sure your name is on everything before it leaves your hands |
| Reputation | Be known for quality work | Be known as someone impossible to steal from |

---

## Characters

### You (The Victim... For Now)
You did the work. They took the credit. Time to decide what kind of person you are.

### Alex - The Credit Thief
**Role**: Colleague. Smooth talker. Knows exactly what they're doing.
**Type**: Serial credit thief—this isn't their first time.

**Voice Example** (In the meeting):
> "So what WE realized was that the legacy system was the bottleneck.
> Once WE redesigned the workflow, the efficiency gains were immediate."

**Voice Example** (When confronted):
> "I said 'we' because it was a team effort. I didn't realize
> you wanted individual recognition. That's kind of... territorial."

---

### Priya - Your Manager
**Role**: Can either help you or make things worse.
**Variables**: Does she know who actually did the work? Does she care?

**Voice Example** (Supportive):
> "I was a little confused by that presentation. I thought you led that?"

**Voice Example** (Dismissive):
> "Does it really matter who gets credit? The work got done."

---

### Marcus - The VP Who Witnessed It
**Role**: The audience that matters. Currently thinks Alex did the work.
**Importance**: His perception affects your future.

---

### Jordan - Trusted Colleague/Witness
**Role**: Was in the room. Saw what happened. Potential ally.

**Voice Example**:
> "That was messed up. Alex literally used your slides.
> Want me to say something?"

---

## Stat Tracking

### Core Stats

```typescript
stats: {
  CREDIT_RECOVERED: 0-100,     // How much credit you've reclaimed
  RELATIONSHIP_WITH_ALEX: 0-100, // (Low = hostile, High = resolved)
  MANAGER_AWARENESS: 0-100,    // Does Priya know the truth
  VP_PERCEPTION: 0-100,        // Does Marcus know you're the one
  DOCUMENTATION_STRENGTH: 0-100 // How provable is your case
}
```

### Flags

```typescript
flags: {
  caught_in_the_moment: boolean,
  confronted_privately: boolean,
  confronted_publicly: boolean,
  documented_evidence: boolean,
  manager_involved: boolean,
  vp_corrected: boolean,
  alex_apologized: boolean,
  alex_retaliated: boolean,
  let_it_slide: boolean,
  built_future_protection: boolean
}
```

---

## Structure Overview

### Part 1: The Theft (Scenes 1-8)
It happens. You watch it happen. What now?

**Key Moments**:
- The meeting where Alex takes credit
- Your internal reaction
- Jordan's observation
- The immediate decision

### Part 2: The Response (Scenes 9-18)
Confrontation, documentation, escalation options.

**Key Moments**:
- Gathering evidence
- The private confrontation
- Alex's response
- Manager involvement
- VP correction attempt

### Part 3: The Resolution (Scenes 19-28)
Outcomes and future-proofing.

**Key Moments**:
- Credit recovered (or not)
- Relationship aftermath
- Building protection for the future

---

## Detailed Scene Breakdown

### PART 1: THE THEFT

#### Scene 1: The Setup
**Location**: office (your desk)

```
NARRATION:
Three weeks ago. The legacy system was breaking down.
No one could figure out why.

You stayed late. You dug through the code.
You found the bottleneck. You designed the fix.

[Email on screen: "Great work on the solution! - Priya"]

INNER VOICE:
You built this. Everyone knew.

Or so you thought.
```

---

#### Scene 2: The Meeting
**Location**: meeting-room

```
[Department meeting. Marcus (VP) on screen.]

MARCUS: [on video]
"So who can walk me through this efficiency win?"

[Alex stands up. Confidently.]

ALEX: [smiling, polished]
"Sure, I can cover that."

[Alex clicks to YOUR slides.]

ALEX:
"So what WE realized was that the legacy system
was the bottleneck. Once WE redesigned the workflow..."

INNER VOICE:
We?

ALEX:
"...the efficiency gains were immediate.
It was a lot of late nights, but worth it."

INNER VOICE:
Late nights. YOUR late nights.

[Marcus nods, impressed]

MARCUS:
"Great work, Alex. This is exactly what we need."

[You feel the heat rising in your face]

INNER VOICE:
They're taking credit. Right now. In front of everyone.

What do you do?
```

**Choice 1 - CRITICAL MOMENT**:
1. **Interrupt immediately**: "Just to clarify—I developed that solution. Alex is presenting, but the work was mine." (+25 CREDIT_RECOVERED, +30 VP_PERCEPTION, -40 RELATIONSHIP_WITH_ALEX, FLAG: caught_in_the_moment)
2. **Wait for opening**: Let them finish, then add "Just to add context on the development process..." (+15 CREDIT_RECOVERED, +15 VP_PERCEPTION)
3. **Stay silent**: Don't make a scene. Handle this later. (-20 CREDIT_RECOVERED, FLAG: let_it_slide initially)
4. **Look to Jordan**: Make eye contact, gauge if you should say something (+10 DOCUMENTATION_STRENGTH with witness)

---

#### Scene 3: The Aftermath (If Silent)
**Location**: meeting-room → office

```
[Meeting ends. People disperse. Alex shakes Marcus's hand.]

MARCUS: [to Alex]
"Impressive stuff. Let's talk about you taking on
the Q3 integration project."

[They walk out together. You sit there.]

INNER VOICE:
That was YOUR moment. Your work.
And now it's Alex's career move.

[Jordan approaches]

JORDAN: [lowered voice, concerned]
"Did... did Alex just take credit for your work?"

[You don't need to answer. They saw it.]

JORDAN:
"That was messed up. You want me to say something?"
```

**Choice 2**:
1. "Not yet. I need to figure out how to handle this." (+10 DOCUMENTATION_STRENGTH)
2. "Yes. Back me up if I say something." (+10 DOCUMENTATION_STRENGTH, +ally established)
3. "No. It's not worth the drama." (-15 CREDIT_RECOVERED, -10 VP_PERCEPTION)
4. "I'm going to confront Alex right now." (+5 CREDIT_RECOVERED, -5 planning)

---

#### Scene 4: The Evidence Gathering
**Location**: office (your desk)

```
INNER VOICE:
Before you say anything, you need proof.

[You start compiling:]
- Emails showing YOU on the project
- Slack messages where YOU discussed the solution
- The original file with YOUR name as creator
- Priya's "great work" email to YOU

NARRATION:
Do you have a paper trail?
```

**Choice 3**:
1. **Strong documentation**: You have emails, files, timestamps—everything (+30 DOCUMENTATION_STRENGTH, FLAG: documented_evidence)
2. **Partial documentation**: Some emails, but nothing definitive (+15 DOCUMENTATION_STRENGTH)
3. **Weak documentation**: It was mostly verbal, hallway conversations (-10 DOCUMENTATION_STRENGTH, "lesson for next time")
4. **Check with Priya**: Ask her to confirm your contribution in writing (+20 DOCUMENTATION_STRENGTH, +20 MANAGER_AWARENESS)

---

### PART 2: THE RESPONSE

#### Scene 5: The Private Confrontation
**Location**: office-hallway (quiet corner)

```
[You catch Alex alone]

YOU:
"Alex. We need to talk about the presentation."

ALEX: [smile, slight wariness]
"Oh, that? It went great, right? Marcus loved it."

YOU:
"You presented my work as yours."

[Beat. Alex's face flickers. Then recovers.]

ALEX: [dismissive, slightly defensive]
"I said 'we.' It was a team effort.
I didn't realize you wanted individual recognition."

[pause]

ALEX:
"That's kind of... territorial, don't you think?"

INNER VOICE:
The flip. Now YOU'RE the problem for noticing.

Classic.
```

**Choice 4**:
1. **Hold firm**: "There was no 'we.' I built the solution. You need to correct the record with Marcus." (+20 CREDIT_RECOVERED, -30 RELATIONSHIP_WITH_ALEX)
2. **Provide evidence**: "I have emails showing it was my work. Would you like to handle this, or should I?" (+25 CREDIT_RECOVERED, +15 DOCUMENTATION_STRENGTH used)
3. **Accept the framing**: "Maybe I'm overreacting. Let's just move on." (-30 CREDIT_RECOVERED, FLAG: let_it_slide)
4. **Propose compromise**: "I need you to clarify my contribution to Marcus. You keep the visibility, I get the credit." (+10 CREDIT_RECOVERED, -15 RELATIONSHIP_WITH_ALEX)

---

#### Scene 6: Alex's Response
**Location**: office-hallway

```
[Alex's mask slips slightly]

ALEX: [cold undercurrent]
"Look. I don't know what you want me to do.
I'm not going to walk into Marcus's office and say
'Actually, that was someone else's idea.'"

[pause]

ALEX:
"It would look ridiculous. And it wouldn't
change anything anyway."

INNER VOICE:
Translation: I'm not giving this back.

ALEX: [softer, diplomatic]
"Tell you what. Next project, I'll make sure
you get the spotlight. We'll call it even."

INNER VOICE:
"Even." As if they're offering you something.
They're offering you your own work back, next time.
```

**Choice 5**:
1. **Reject the offer**: "That's not how this works. You need to fix this now." (+15 CREDIT_RECOVERED, -20 RELATIONSHIP_WITH_ALEX)
2. **Accept with conditions**: "Fine. But I want it in writing that the next presentation is mine." (+5 CREDIT_RECOVERED, some protection)
3. **Escalate warning**: "If you don't correct this, I'll have to take it to Priya." (+10 CREDIT_RECOVERED, +20 DOCUMENTATION_STRENGTH, FLAG: escalation_threatened)
4. **Walk away**: "I'll handle this my own way." (Opens other paths)

---

#### Scene 7: The Manager Route
**Location**: meeting-room (Priya's office)

```
[If you chose to involve Priya]

PRIYA: [listening]
"So you're saying Alex presented your work as theirs?"

YOU:
"Yes. I have emails and documentation showing I led the solution."

PRIYA: [thoughtful pause]
"That's... concerning."

[She pulls up her own records]

PRIYA:
"I do remember you leading this. I even sent you
that 'great work' email."

[pause]

PRIYA:
"The question is how to handle it."

INNER VOICE:
Does she help? Or does she make it "go away"?
```

**Choice 6**:
1. **Ask her to intervene**: "Can you clarify with Marcus who actually did the work?" (+30 MANAGER_AWARENESS, +20 VP_PERCEPTION, FLAG: manager_involved)
2. **Ask for coaching**: "What would you recommend I do?" (+20 MANAGER_AWARENESS, gets her perspective)
3. **Protect yourself only**: "I just want you to know what happened. For my records." (+15 MANAGER_AWARENESS)
4. **Minimize**: "Maybe I'm making too big a deal of this." (-20 CREDIT_RECOVERED, Priya drops it)

---

#### Scene 8: The VP Correction
**Location**: email/meeting-room

```
[If you or Priya decide to correct the record with Marcus]

NARRATION:
There are several ways to correct the VP's perception:

1. Direct email from you with documentation
2. Priya mentions it casually to Marcus
3. You find a reason to present something else to Marcus
4. You let it go and prove yourself on the next thing

INNER VOICE:
Each path has costs and benefits.
Direct is clear but looks petty.
Indirect is subtle but might not land.

What's your play?
```

**Choice 7**:
1. **Direct correction**: Email Marcus with context and documentation (+35 VP_PERCEPTION, high risk of looking petty)
2. **Through Priya**: Have her mention "just wanted to clarify who led that project" (+25 VP_PERCEPTION, cleaner)
3. **Prove on next project**: Volunteer for Q3, show Marcus directly (+15 VP_PERCEPTION, slower)
4. **Let it go with VP**: Focus on internal clarity only (-10 VP_PERCEPTION)

---

### PART 3: THE RESOLUTION

#### Scene 9: Alex's Retaliation (If Confronted Hard)
**Location**: office

```
[If RELATIONSHIP_WITH_ALEX is very low]

[You notice changes:]
- Alex is CCing leadership on small criticisms of your work
- In meetings, Alex "just has a few concerns" about your approach
- Suddenly, there are questions about your project timelines

INNER VOICE:
Retaliation. Subtle but clear.

You won the battle. They're trying to win the war.

NARRATION:
How do you respond?
```

**Choice 8**:
1. **Document everything**: Keep records of every interaction (+20 DOCUMENTATION_STRENGTH)
2. **Escalate to HR**: "I'm experiencing retaliation after raising a credit issue" (Nuclear option)
3. **Kill with excellence**: Deliver perfect work, make criticism look petty (+15 CREDIT_RECOVERED)
4. **Build counter-alliances**: Strengthen relationships with others who see Alex clearly (+10 NETWORK)

---

#### Scene 10: Building Future Protection
**Location**: office (your desk)

```
NARRATION:
Whether you recovered the credit or not,
you've learned something.

INNER VOICE:
Never again.

[You start implementing new practices:]
- Send progress updates with YOUR name in the subject
- BCC key stakeholders on deliverables
- Make sure your contributions are documented in writing
- Build direct relationships with leadership

NARRATION:
Some lessons cost. This one did.
But you won't pay this price again.
```

**Choice 9**:
1. **Implement full protection system**: Regular updates, documentation, stakeholder relationships (+30 DOCUMENTATION_STRENGTH, FLAG: built_future_protection)
2. **Selective protection**: Protect big projects, skip small ones (+15 DOCUMENTATION_STRENGTH)
3. **Trust and hope**: Assume it won't happen again (HIGH RISK)

---

## Endings

### EXCELLENT OUTCOMES

**1. Full Recovery**
**Trigger**: VP_PERCEPTION > 80, CREDIT_RECOVERED > 80, documented_evidence

```
NARRATION:
Marcus knows the truth. Priya confirmed it.
The Q3 project? That went to you, not Alex.

INNER VOICE:
You spoke up. You had receipts.
And you got what was yours.

ALEX:
[In a meeting, now credits you properly]
"...building on [Name]'s earlier work..."

INNER VOICE:
Interesting. They remember how to say your name now.

LESSON:
Credit thieves count on your silence.
Don't give it to them.
```

---

**2. The Warning Shot**
**Trigger**: Confronted Alex, they backed down, uneasy peace

```
NARRATION:
Alex didn't apologize. But they also stopped.

Every time there's a presentation now,
they're careful to be specific about attribution.

INNER VOICE:
You marked yourself as someone who notices.
Someone who won't be an easy target.

That's a form of victory.

LESSON:
Sometimes you don't need to win the battle.
You just need them to know there WILL be a battle.
```

---

### GOOD OUTCOMES

**3. The Long Game Win**
**Trigger**: Let first theft slide, crushed next project, VP noticed

```
NARRATION:
You lost that round. You won the next one.

When Marcus saw you present the Q3 solution yourself,
there was no ambiguity.

MARCUS: [after meeting]
"That was impressive. I'm seeing a pattern here."

INNER VOICE:
He's connecting dots. Better late than never.

LESSON:
If you can't recover stolen credit,
make the next credit impossible to steal.
```

---

**4. The Manager Save**
**Trigger**: Priya intervened, corrected record, protected you

```
NARRATION:
Priya went to bat for you.

She casually mentioned to Marcus that "there was some confusion
about attribution" and made sure your name was in the right place.

INNER VOICE:
Good managers protect their people.
Remember that when you're a manager.

LESSON:
Building trust with your manager is insurance.
When you need it, it pays off.
```

---

### NEUTRAL OUTCOMES

**5. The Lesson Learned**
**Trigger**: Credit partially recovered, future protection built

```
NARRATION:
You got some credit back. Not all of it.
Alex still got the shine with Marcus.

But you learned.

INNER VOICE:
Now you document everything.
Now your name is on everything before it leaves your hands.
Now you have direct relationships with the people who matter.

Expensive lesson. But you only pay it once.

LESSON:
Every theft is tuition for the next project.
Just don't pay the same tuition twice.
```

---

### BAD OUTCOMES

**6. The Silent Treatment**
**Trigger**: let_it_slide, didn't confront, didn't document

```
NARRATION:
Alex got the credit. And the Q3 project.
And the promotion conversation with Marcus.

You watched it happen. You said nothing.

INNER VOICE:
Silence is acceptance.
You accepted being stolen from.

And now they know you'll accept it again.

LESSON:
The first theft sets the pattern.
If you don't fight the first one, expect more.
```

---

**7. The Petty Look**
**Trigger**: Confronted publicly/poorly, looked like sour grapes

```
MARCUS: [to Priya, later]
"Is [Name] okay? They seemed really focused on
getting credit for that project. Kind of territorial."

INNER VOICE:
You fought for credit. And now you look petty.

Not because you were wrong.
Because you did it wrong.

LESSON:
How you reclaim matters as much as whether you reclaim.
Proof + diplomacy. Not emotion.
```

---

**8. The Ongoing War**
**Trigger**: Confronted, Alex retaliated, no resolution

```
NARRATION:
You and Alex are now in an undeclared war.

Every meeting is a battlefield.
Every project is a competition.
Every email is carefully worded.

INNER VOICE:
You won the credit fight. Lost the working relationship.

Was it worth it?

LESSON:
Sometimes the cost of recovery is higher than the theft.
Know when to fight and when to leave.
```

---

## Technical Implementation Notes

### Backgrounds Needed
- office (desk scenes)
- meeting-room (the theft, confrontations)
- office-hallway (private Alex conversation)

### Dynamic Response Based on Choices
```typescript
// Alex's behavior changes based on confrontation style
if (confronted_publicly) {
  alex_retaliation_risk = HIGH
} else if (confronted_privately_with_evidence) {
  alex_may_back_down = true
} else if (let_it_slide) {
  alex_repeats_behavior = true
}
```

### Key Dialogue Patterns

```typescript
// The moment correction
"Just to clarify—I developed that solution. Alex is presenting, but..."

// The private confrontation
"You presented my work as yours. I have documentation."

// The diplomatic correction
"I wanted to make sure the attribution on that project was clear..."

// The future protection
"Per the approach I developed for this project..."
```

---

## Inner Voice Style Guide

### During the Theft
```
'We? There was no we. There was you.'
'They're taking your work. Right now. In front of everyone.'
'Your silence is their profit.'
```

### During Confrontation
```
'The flip. Now YOU'RE the problem for noticing.'
'They're offering you your own work back. Next time.'
'Translation: I'm not giving this back.'
```

### During Resolution
```
'Credit compounds. So does stolen credit.'
'Never again. Paper trail everything.'
'Silence is acceptance. You accepted being stolen from.'
```

---

## Teaching Moments Summary

1. **Document everything** - paper trails are armor
2. **The "we" weapon** - thieves use team language to blur ownership
3. **Confront early** - waiting makes it harder to reclaim
4. **Have evidence before confronting** - he said/she said favors the thief
5. **Public correction is risky** - can make you look petty
6. **Involve your manager strategically** - they can correct things you can't
7. **Thieves retaliate** - be prepared for the counter-attack
8. **Build protection for the future** - BCC stakeholders, send updates, own your name
9. **First theft sets the pattern** - if you let it slide, expect more
10. **How you reclaim matters** - proof + diplomacy, not emotion

---

*Document created for implementation. This scenario teaches that credit is currency—and protecting it is a professional survival skill.*
