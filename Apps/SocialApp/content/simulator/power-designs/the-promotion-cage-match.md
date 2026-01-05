# The Promotion Cage Match

## Meta Information
- **Tier**: Premium
- **Difficulty**: Advanced
- **Estimated Scenes**: 30-38
- **Category**: Internal competition, alliance building, strategic positioning

---

## Logline

One Director position. Two candidates. You and Riley have worked side by side for three years. Now you're competing for the same promotion. Only one of you gets it. The other watches them succeed—or leaves. This isn't about being good at your job anymore. This is about winning.

---

## Core Theme

**Internal competition is a different game than external performance.** This scenario teaches:
- How promotions are actually decided (hint: not just merit)
- Building alliances with decision-makers
- The ethics and tactics of competing with a colleague
- When to play clean and when to play dirty
- Managing the aftermath—win or lose

---

## Psychology Being Taught

### The Promotion Reality
Promotions aren't given to the best performer. They're given to the person who:
1. Has the strongest advocate in the room
2. Is most visible to decision-makers
3. Has positioned themselves as the obvious choice
4. Made it easy for leadership to say yes

### Key Frameworks

**1. The Sponsorship Gap**
Performance gets you considered. Sponsorship gets you promoted. A sponsor actively argues for you when you're not in the room. Do you have one?

**2. The Visibility Principle**
The work doesn't speak for itself. YOU speak for your work. Decision-makers can't promote what they don't see.

**3. Internal Competition Ethics**
There's a line between strategic positioning and sabotage. The first is smart. The second destroys trust and relationships you'll need later.

**4. The Zero-Sum Trap**
You can win without Riley losing, or win by making Riley lose. The first builds a career. The second builds enemies.

**5. The Aftermath Matters**
Whether you win or lose, you'll likely still work here. How you compete determines what happens next.

### Professional vs. Dark Arts

| Situation | Professional Approach | Dark Arts Approach |
|-----------|----------------------|-------------------|
| Building visibility | Share wins broadly, volunteer for visible projects | Make sure decision-makers see YOUR wins, not Riley's |
| Handling Riley | Friendly competition, may the best person win | Subtle positioning that makes Riley look less ready |
| Stakeholder relationships | Build genuine connections | Strategic schmoozing, find out what they value and mirror it |
| Interview/presentation | Prepare thoroughly, be authentic | Research what happened to the last person in this role, address their failure |
| If you lose | Graceful acceptance, learn and grow | Use the loss as leverage for something else |

---

## Characters

### You (The Contender)
Three years in. Ready for the next level. So is your competition.

### Riley - The Other Candidate
**Role**: Your colleague. Your competition. Maybe your friend.
**Complexity**: Riley isn't a villain. They're just also trying to win.

**Voice Example** (Friendly):
> "May the best person win, right? Whatever happens,
> we've both earned this shot."

**Voice Example** (Competitive edge showing):
> "I heard you're meeting with Marcus. Smart move.
> I've already had three conversations with him."

---

### Marcus - The Decision Maker
**Role**: VP who makes the final call. His opinion matters most.
**Style**: Values results, but also "leadership presence." Plays politics himself.

**Voice Example**:
> "I'm looking for someone who can represent this team at the executive level.
> Not just someone who does the work—someone who can lead the work."

---

### Chen - Your Current Manager
**Role**: Knows your work best. May or may not advocate strongly.
**Variable**: Do they want to lose you from their team?

**Voice Example** (Supportive):
> "I'll go to bat for you. You've earned this."

**Voice Example** (Conflicted):
> "I'll support whoever leadership chooses. You're both great."

---

### Priya - The Insider
**Role**: Someone who knows how decisions actually get made. Intel source.

**Voice Example**:
> "Marcus had lunch with Riley yesterday. Just saying.
> Also, he mentioned 'executive presence' twice in the last meeting."

---

### Jordan - HR Partner
**Role**: Manages the process. Theoretically neutral. Actually has influence.

**Voice Example**:
> "The decision will be based on the panel interview,
> leadership input, and overall fit for the role."

---

## Stat Tracking

### Core Stats

```typescript
stats: {
  POSITIONING: 0-100,         // How well you've set up the win
  MARCUS_SUPPORT: 0-100,      // Decision-maker alignment
  CHEN_ADVOCACY: 0-100,       // Manager sponsorship
  VISIBILITY: 0-100,          // Leadership awareness of your work
  RELATIONSHIP_WITH_RILEY: 0-100, // Post-competition viability
  INTEGRITY: 0-100            // Did you play clean?
}
```

### Flags

```typescript
flags: {
  secured_sponsor: boolean,
  had_marcus_conversation: boolean,
  undermined_riley: boolean,
  riley_undermined_you: boolean,
  won_promotion: boolean,
  lost_gracefully: boolean,
  lost_bitterly: boolean,
  negotiated_alternative: boolean,
  discovered_intel: boolean
}
```

---

## Structure Overview

### Part 1: The Announcement (Scenes 1-10)
The position opens. You and Riley are both in the running.

**Key Moments**:
- Learning about the opportunity
- Assessing the competition (Riley)
- Initial positioning moves
- Finding a sponsor

### Part 2: The Campaign (Scenes 11-24)
Active competition. Building visibility, relationships, and your case.

**Key Moments**:
- Marcus conversations
- The "executive presence" question
- Riley's counter-moves
- The temptation to go dark
- The panel interview

### Part 3: The Decision (Scenes 25-38)
The choice is made. Managing the outcome.

**Key Moments**:
- The announcement
- If you won: the aftermath with Riley
- If you lost: the decision—stay or go
- Long-term implications

---

## Detailed Scene Breakdown

### PART 1: THE ANNOUNCEMENT

#### Scene 1: The Email
**Location**: office

```
[Email notification - All Department]

SUBJECT: Director of Operations - Internal Opportunity

"We're pleased to announce an internal search for Director of Operations.
This is a critical leadership role reporting to Marcus Webb, VP.
Interested candidates should..."

INNER VOICE:
This is it. The next level.
You've been waiting for this opening.

[Your phone buzzes - text from Riley]

RILEY:
"You seeing this email? 👀"

INNER VOICE:
So is Riley.
```

---

#### Scene 2: The Competition Assessment
**Location**: office

```
NARRATION:
You've worked with Riley for three years.
Time to honestly assess the competition.

[Mental comparison]

RILEY:
- Strong operational results, similar to yours
- Better relationship with Marcus (they golf)
- More visible in leadership meetings
- Weaker on strategy, stronger on execution

YOU:
- Stronger strategic thinking
- Less face time with Marcus
- Deeper technical expertise
- Need to increase visibility

INNER VOICE:
Riley isn't better than you.
But Riley is better positioned.

That has to change.
```

---

#### Scene 3: The First Move
**Location**: office

```
INNER VOICE:
The race started the moment that email went out.
What's your first move?

NARRATION:
Options:
```

**Choice 1**:
1. **Request meeting with Marcus**: Go directly to decision-maker (+15 MARCUS_SUPPORT attempt, visible move)
2. **Secure Chen's sponsorship**: Make sure your manager will advocate hard (+20 CHEN_ADVOCACY)
3. **Research the role**: Learn what they're really looking for (+15 POSITIONING)
4. **Connect with Riley**: "May the best person win" - feel out their strategy (+10 intel, maintains relationship)

---

#### Scene 4: The Sponsor Question
**Location**: meeting-room (with Chen)

```
CHEN:
"So you're going for the Director role."

YOU:
"Yes. I think I'm ready."

CHEN: [pause]
"You probably are. But here's the thing—
being ready isn't enough."

[Chen leans in]

CHEN:
"You need someone in that room fighting for you.
When the decision is made, you won't be there.
Who's going to argue your case?"

INNER VOICE:
The sponsorship question.
The thing no one tells you about promotions.

CHEN:
"I can support you. But Marcus is making this call.
Does Marcus know you? Does he know what you've done?"

INNER VOICE:
Be honest with yourself.
Does he?
```

**Choice 2**:
1. **Ask Chen to advocate to Marcus**: "Can you set up a conversation about my readiness?" (+15 CHEN_ADVOCACY, +10 MARCUS_SUPPORT)
2. **Go direct to Marcus yourself**: "I'll build that relationship directly." (+10 MARCUS_SUPPORT attempt)
3. **Ask who else could sponsor**: "Who else has influence in this decision?" (+15 POSITIONING, political awareness)
4. **Focus on the work**: "I'll let my results speak for themselves." (-15 POSITIONING, wrong strategy)

---

#### Scene 5: The Intel
**Location**: coffee-shop

```
[Coffee with Priya, who always knows what's really happening]

PRIYA:
"So you're in the Director race. Good luck."

[sips coffee]

PRIYA:
"You know Marcus had lunch with Riley last week, right?"

INNER VOICE:
Riley is already ahead.

PRIYA:
"Also, I heard Marcus used the phrase 'executive presence'
twice in the leadership meeting. Twice."

[meaningful look]

PRIYA:
"The last Director, the one who got pushed out?
They were great at operations.
Terrible at presenting to the board."

INNER VOICE:
'Executive presence.'
That's the test you didn't know about.
```

---

### PART 2: THE CAMPAIGN

#### Scene 6: The Marcus Meeting
**Location**: meeting-room (Marcus's office)

```
[You secured a 30-minute conversation]

MARCUS:
"Thanks for making time. Tell me why you're interested
in the Director role."

INNER VOICE:
This isn't a casual chat. This is an audition.

NARRATION:
How do you position yourself?
```

**Choice 3**:
1. **Results-focused**: Lead with your track record, specific wins, measurable impact (+15 MARCUS_SUPPORT)
2. **Vision-focused**: Share your vision for the department, where you'd take it (+20 MARCUS_SUPPORT if compelling, -10 if too vague)
3. **Relationship-focused**: Build personal connection, ask about his priorities (+15 MARCUS_SUPPORT, relationship building)
4. **Comparison-subtle**: Hint at capabilities Riley lacks without naming them (Risky: +20 or -20 depending on execution)

---

#### Scene 7: The Executive Presence Test
**Location**: meeting-room

```
MARCUS:
"Let me ask you something direct.
In board meetings, I need someone who can hold the room.
Command respect. Present with confidence."

[He's watching you carefully]

MARCUS:
"How would you describe your... presence... in those settings?"

INNER VOICE:
The test Priya warned you about.

NARRATION:
This is about confidence, not competence.
How do you show 'executive presence' in this moment?
```

**Choice 4**:
1. **Confident acknowledgment**: "I've presented to leadership before. Here's an example where I commanded the room." (+20 MARCUS_SUPPORT)
2. **Honest with growth**: "It's an area I've been developing. Let me tell you about my progress." (+10 MARCUS_SUPPORT, honesty points)
3. **Flip the question**: "What does executive presence look like to you? I want to make sure we're aligned." (+15 MARCUS_SUPPORT, shows sophistication)
4. **Overconfidence**: "That's never been an issue for me." (-10 MARCUS_SUPPORT, sounds defensive)

---

#### Scene 8: Riley's Move
**Location**: office

```
[You hear about Riley's latest move from a colleague]

COLLEAGUE:
"Did you hear? Riley just volunteered to present
the quarterly results to the board."

INNER VOICE:
The board presentation. The highest-visibility opportunity.
And Riley just took it.

[You check your email - the invitation already went out]

COLLEAGUE:
"They must have asked Marcus directly.
Pretty smart move, actually."

INNER VOICE:
Riley is playing to win.
Are you?
```

**Choice 5**:
1. **Counter-move**: Find your own high-visibility opportunity (+15 VISIBILITY, +10 POSITIONING)
2. **Support Riley**: "Great, they'll do well" - focus on your own path (+5 RELATIONSHIP_WITH_RILEY)
3. **Compete directly**: Ask to co-present or present a different section (+20 VISIBILITY, -10 RELATIONSHIP_WITH_RILEY)
4. **Undermine subtly**: Mention to Marcus that the board presentation should be reviewed carefully (Dark arts: -20 INTEGRITY, uncertain outcome)

---

#### Scene 9: The Temptation
**Location**: office

```
[Private conversation with a colleague who dislikes Riley]

COLLEAGUE:
"You know Riley inflated their Q3 numbers, right?
The Henderson savings weren't really $400K.
It was maybe $250K."

[They look at you meaningfully]

COLLEAGUE:
"Just saying. If someone mentioned that to Marcus..."

INNER VOICE:
Information that could sink Riley's candidacy.
Real or exaggerated?
Does it matter?

NARRATION:
What do you do with this?
```

**Choice 6 - INTEGRITY TEST**:
1. **Decline to use it**: "That's not how I want to win." (+20 INTEGRITY, +10 RELATIONSHIP_WITH_RILEY)
2. **Verify first**: Check if it's true before deciding (+10 INTEGRITY, gathering information)
3. **Use it subtly**: Mention "concerns about Q3 methodology" to Marcus (-30 INTEGRITY, +20 POSITIONING if believed)
4. **Report to HR**: "I'm hearing concerns about data accuracy" (Nuclear option, unpredictable outcome)

---

#### Scene 10: The Panel Interview
**Location**: meeting-room

```
[The formal interview. Marcus, Chen, Jordan, and another VP.]

MARCUS:
"Thank you for being here. This is your chance to make
your case for the Director role. You have 30 minutes."

INNER VOICE:
Everything you've done has led to this.

[You look at the panel. Four faces. Four agendas.]

MARCUS:
"Start by telling us: why should you be Director?"

NARRATION:
This is it. How do you open?
```

**Choice 7**:
1. **Strong opening**: "I should be Director because I've already been operating at that level. Here's the evidence." (+25 POSITIONING)
2. **Vision opening**: "I should be Director because I see where this department needs to go—and I can get us there." (+20 POSITIONING)
3. **Team opening**: "I should be Director because I know how to elevate everyone around me." (+15 POSITIONING, +10 with certain panel members)
4. **Humble opening**: "I'm grateful for this opportunity to share my qualifications." (-10 POSITIONING, too weak)

---

### PART 3: THE DECISION

#### Scene 11: The Wait
**Location**: office

```
NARRATION:
Three days since the panel interview.
No news. Every email notification makes your heart jump.

[Text from Riley]

RILEY:
"Heard anything yet?"

YOU:
"Radio silence."

RILEY:
"Same. This wait is killing me."

INNER VOICE:
Are they nervous? Or fishing for intel?

[Email notification - Jordan HR]

"Hi [Name], can you come by my office at 3pm today?"

INNER VOICE:
This is it.
```

---

#### Scene 12: The Outcome - You Won
**Location**: meeting-room (Jordan's office)

```
[If POSITIONING and MARCUS_SUPPORT high enough]

JORDAN:
"Congratulations. You've been selected for the Director role."

[The words land]

JORDAN:
"Marcus was impressed with your interview.
Chen advocated strongly. The panel agreed."

INNER VOICE:
You won.

JORDAN:
"We'll announce tomorrow. You might want to
talk to Riley before then."

INNER VOICE:
Riley. Your colleague. Your friend?
They didn't get the job.
And they're going to find out soon.
```

**Choice 8**:
1. **Tell Riley personally**: "I wanted you to hear it from me first." (+20 RELATIONSHIP_WITH_RILEY)
2. **Let the announcement happen**: Avoid the awkward conversation (-10 RELATIONSHIP_WITH_RILEY)
3. **Offer something**: "I'll advocate for you when the next opportunity comes." (+15 RELATIONSHIP_WITH_RILEY)
4. **Ask Jordan to tell them**: "Can HR deliver the news to Riley?" (-15 RELATIONSHIP_WITH_RILEY, avoidant)

---

#### Scene 13: The Outcome - You Lost
**Location**: meeting-room (Jordan's office)

```
[If POSITIONING or MARCUS_SUPPORT insufficient]

JORDAN:
"Thank you for going through this process.
The decision was very difficult.
We've decided to offer the Director role to Riley."

[Silence]

JORDAN:
"This doesn't reflect on your value to the company.
We want to talk about your path forward."

INNER VOICE:
You lost.
To Riley.

NARRATION:
How do you respond?
```

**Choice 9**:
1. **Graceful acceptance**: "I understand. What feedback can you share?" (+20 INTEGRITY, FLAG: lost_gracefully)
2. **Seek leverage**: "I appreciate the transparency. Can we discuss my compensation and development path?" (+15 POSITIONING for future)
3. **Express disappointment**: "I'm disappointed. I thought I was the stronger candidate." (Neutral, honest)
4. **Consider leaving**: "Thank you. I need to think about whether this is still the right place for me." (Opens exit negotiation)

---

#### Scene 14: The Aftermath - If You Won
**Location**: office

```
[Next day. You're the new Director. Riley is at their desk.]

INNER VOICE:
You have to navigate this.
Riley is still on your team. And you just beat them.

[Riley approaches]

RILEY: [measured, professional]
"Congratulations. You earned it."

[Pause]

RILEY:
"I need some time to figure out my next move."

INNER VOICE:
Translation: I might leave.
And honestly, you might if you were them.
```

---

#### Scene 15: The Aftermath - If You Lost
**Location**: office

```
[Next day. Riley got announced as Director. You're at your desk.]

COLLEAGUE:
"Sorry, I heard. You okay?"

INNER VOICE:
Everyone knows. Everyone's watching how you handle this.

[Riley approaches]

RILEY: [careful]
"Hey. This is awkward. I wanted to check on you."

INNER VOICE:
They're being gracious. Which almost makes it worse.

NARRATION:
What do you do?
```

**Choice 10**:
1. **Take the high road**: "Congratulations. You'll do great. Let me know how I can support the transition." (+25 INTEGRITY, +20 RELATIONSHIP_WITH_RILEY)
2. **Be honest**: "I'm disappointed, but I'll be fine. I need some time." (+15 INTEGRITY)
3. **Use it**: "Thanks. I've actually been approached by [competitor]. Might be time to explore." (Leverage move)
4. **Frost**: "Thanks for checking. I've got work to do." (-10 RELATIONSHIP_WITH_RILEY)

---

## Endings

### IF YOU WON

**1. The Clean Win**
**Trigger**: INTEGRITY > 70, good relationship with Riley maintained

```
NARRATION:
You got the promotion. And you got it clean.

No sabotage. No manipulation.
Just positioning, performance, and presence.

RILEY:
[Six months later]
"You've been a good boss, actually.
Better than I expected."

INNER VOICE:
Winning without making enemies.
That's the real victory.

LESSON:
You can win competitive situations
without destroying relationships.
It just takes more skill.
```

---

**2. The Pyrrhic Victory**
**Trigger**: Won but INTEGRITY low, undermined Riley

```
NARRATION:
You're Director.
But Riley left. And they told people why.

COLLEAGUE:
"I heard you sandbagged their Q3 numbers to Marcus."

INNER VOICE:
The truth has a way of surfacing.

NARRATION:
You have the title.
But the trust is gone.

LESSON:
Some wins cost more than they're worth.
Reputation takes years to build, seconds to destroy.
```

---

### IF YOU LOST

**3. The Graceful Loss**
**Trigger**: lost_gracefully, maintained relationships, found new path

```
NARRATION:
You didn't get the Director role.
But you got something else.

Chen: "HR is opening a new senior role.
I recommended you."

Marcus: "I was impressed with your interview.
Let's find the right opportunity."

INNER VOICE:
Losing well is a skill.
You just demonstrated it.

LESSON:
How you lose determines what happens next.
Graceful losers get second chances.
```

---

**4. The Strategic Exit**
**Trigger**: Lost, leveraged for external opportunity

```
NARRATION:
You didn't win here. So you won somewhere else.

The competitor offer came through.
Director level. 40% increase.

INNER VOICE:
Sometimes not getting what you want
shows you what you actually needed.

LESSON:
Internal loss can be external leverage.
The market pays for what your company won't.
```

---

**5. The Bitter Stay**
**Trigger**: Lost, stayed bitter, no resolution

```
NARRATION:
Riley is Director. You're... here.

Every meeting, you see them at the front of the room.
Every success they have reminds you it could have been yours.

INNER VOICE:
Staying without moving on.
The slowest form of failure.

LESSON:
If you can't get past the loss, leave.
Resentment is a career killer.
```

---

## Technical Implementation Notes

### Dual-Path Structure
```typescript
// Major branch at decision point
if (POSITIONING > 70 && MARCUS_SUPPORT > 60) {
  path = 'won'
} else {
  path = 'lost'
}

// Each path has its own resolution scenes
```

### Key Dialogue Patterns

```typescript
// Positioning
"I've already been operating at Director level. Here's the evidence..."

// Executive presence
"I commanded the room when I presented to the board last quarter..."

// Graceful loss
"I understand. What feedback can you share for next time?"

// Maintaining relationship
"Congratulations. You earned it. Let me know how I can support you."
```

### Integrity Tracking
```typescript
// Integrity affects long-term reputation
if (undermined_riley && won) {
  reputation_damage = true
  riley_tells_others = true
}

if (lost_gracefully) {
  future_opportunities_increase = true
}
```

---

## Inner Voice Style Guide

### Early Competition
```
'Riley isn't better than you. But Riley is better positioned.'
'Being ready isn't enough. You need someone fighting for you.'
'The race started the moment that email went out.'
```

### During Campaign
```
'Executive presence. That's the test you didn't know about.'
'Riley is playing to win. Are you?'
'That's not how I want to win.'
```

### At Decision
```
'You won. Riley didn't. And they're going to find out soon.'
'You lost. To Riley. Everyone's watching how you handle this.'
'Losing well is a skill. You just demonstrated it.'
```

---

## Teaching Moments Summary

1. **Promotions aren't about merit alone** - positioning and sponsorship matter
2. **Get a sponsor** - someone who argues for you when you're not in the room
3. **Build decision-maker relationships** - Marcus needs to know you, not just your work
4. **"Executive presence" is a real factor** - learn what it means to your leadership
5. **Visibility is essential** - the work doesn't speak for itself
6. **There's a line between strategy and sabotage** - know where it is
7. **Integrity matters long-term** - reputation outlasts any single promotion
8. **How you lose matters** - graceful losers get second chances
9. **Internal loss can be external leverage** - use it wisely
10. **Relationships survive competition** - if you play it right

---

*Document created for implementation. This scenario teaches that internal competition is a different game than job performance—and winning requires positioning, relationships, and knowing how to compete without destroying what comes after.*
