# Bonus Season

## Meta Information
- **Tier**: VIP
- **Difficulty**: Expert
- **Estimated Scenes**: 26-32
- **Category**: Compensation negotiation, client leverage, retention politics

---

## Logline

It's December. Bonus numbers come out in two weeks. You control $40 million in client relationships. A competitor has made you an offer—30% more than you make now. Your manager is lobbying for you, but the pool is tight. How much of your leverage do you show? How hard do you play? In bonus season, the meek get what's left over.

---

## Core Theme

**Those who don't ask, don't get.** This scenario teaches:
- Compensation negotiation at senior levels
- The art of the retention conversation
- Using outside offers as leverage
- The delicate balance between threat and value
- How firms really think about compensation

---

## Psychology Being Taught

### The Bonus Reality
At senior levels, compensation is a negotiation, not a grade. Understanding:
1. Your value is what you can credibly threaten to take elsewhere
2. Firms pay to retain revenue, not loyalty
3. The squeaky wheel often gets the grease
4. Leaving money on the table is a choice
5. How you negotiate signals how you'll fight for the firm

### The Leverage Equation

| Asset | Value | Risk |
|-------|-------|------|
| **Client relationships** | Highest - portable revenue | Can be seen as hostage-taking |
| **Outside offer** | High - market validation | Calls your bluff |
| **Team loyalty** | Medium - institutional knowledge | Hard to quantify |
| **Active deals** | Medium - timing leverage | Temporary |
| **Political capital** | Variable - depends on sponsors | Invisible to outsiders |

### Professional vs Dark Arts

| Situation | Professional | Dark Arts |
|-----------|--------------|-----------|
| Discussing compensation | "I'd like to discuss my contribution" | "I have an offer I need to respond to" |
| Client leverage | "I've built strong relationships" | "Marcus followed me from my last firm" |
| Team dynamics | "The team respects my leadership" | "Three analysts will leave if I do" |
| Deadline pressure | "I need clarity for planning" | "They need an answer by Friday" |
| Walking away | "This is disappointing" | "I'll need to tell them yes" |

---

## Characters

### You (The Rainmaker)
Senior VP at an investment bank/consulting firm. You control $40M in client revenue. A competitor wants you—and your clients.

### Marcus - Your Manager
**Role**: Group Head. Wants to keep you but has limited pool.
**Style**: Supportive but constrained by politics above.

**Voice Example**:
> "I'm fighting for you. But the committee sees a lot of asks.
> Give me ammunition—what do I tell them you bring?"

---

### Victoria - Division Head
**Role**: Controls the bonus pool. Makes final calls.
**Style**: Transactional. Respects strength. Disdains weakness.

**Voice Example**:
> "Everyone thinks they're underpaid.
> Tell me why you specifically deserve more than your peers."

---

### David Chen - Competitor Recruiter
**Role**: The outside offer. Your BATNA.
**Style**: Persistent, flattering, tactical.

**Voice Example**:
> "We'd bring you in as Managing Director.
> 30% above current comp, guaranteed for two years.
> But I need an answer by the 15th."

---

### Elena - Peer (Competitor)
**Role**: Also fighting for the same limited pool. Similar credentials.
**Style**: Friendly but competitive.

**Voice Example**:
> "I heard comp is tight this year.
> You going to push back?"

---

### Jordan - Key Client
**Role**: $15 million relationship. Your ace card.
**Style**: Loyal to you, not the firm.

**Voice Example**:
> "I work with you because of YOU, not your firm.
> If you moved, I'd take your call."

---

## Stat Tracking

### Core Stats

```typescript
stats: {
  LEVERAGE_DEMONSTRATED: 0-100,    // How much value have you shown?
  RELATIONSHIP_PRESERVED: 0-100,   // Is the relationship with firm intact?
  OFFER_CREDIBILITY: 0-100,        // Does your outside offer seem real?
  SPONSOR_SUPPORT: 0-100,          // Is Marcus fighting for you?
  NEGOTIATION_POSITION: 0-100      // How strong is your stance?
}
```

### Flags

```typescript
flags: {
  outside_offer_revealed: boolean,
  client_loyalty_demonstrated: boolean,
  team_leverage_mentioned: boolean,
  deadline_set: boolean,
  walked_away: boolean,
  counter_received: boolean,
  deal_accepted: boolean,
  burned_bridge: boolean
}
```

---

## Structure Overview

### Part 1: The Setup (Scenes 1-8)
The offer arrives. You assess your leverage.

**Key Moments**:
- The recruiter call
- Evaluating your position
- Sounding out your manager
- Reading the political landscape

### Part 2: The Negotiation (Scenes 9-20)
You execute your strategy.

**Key Moments**:
- The compensation conversation
- Using (or hiding) the offer
- Client loyalty signals
- The counter-offer dance

### Part 3: The Resolution (Scenes 21-32)
Numbers come out. Decision time.

**Key Moments**:
- Final number revealed
- Accept or leave
- The aftermath

---

## Detailed Scene Breakdown

### PART 1: THE SETUP

#### Scene 1: The Recruiter
**Location**: office (phone call)

```
[December 1st. Your phone buzzes.]

DAVID CHEN: [Recruiter]
"I've been trying to reach you.
We want to talk about something significant."

[Pause]

DAVID:
"MD role. 30% above current comp.
Guaranteed for two years.
Your clients would follow—we both know it."

INNER VOICE:
An offer. Real leverage.
The question is how to use it.

DAVID:
"I need an answer by the 15th.
That's two weeks. Take your time—but not too much."
```

---

#### Scene 2: Assessing Your Position
**Location**: office (alone)

```
[You take stock of your leverage]

NARRATION:
Your assets:
- $40M in client relationships
- Three key clients who would follow you
- A team of 6 who trust you
- 15 years of institutional knowledge

Your vulnerabilities:
- You've never actually left before
- The firm doesn't know you're in play
- Your manager is supportive but junior in politics

INNER VOICE:
The offer is real.
The question is: do you use it as a weapon,
or as an exit plan?

NARRATION:
What's your strategy?
```

**Choice 1 - SETS STRATEGY**:
1. **Full transparency**: Tell Marcus about the offer, work together (+25 SPONSOR_SUPPORT, -10 LEVERAGE_DEMONSTRATED)
2. **Strategic hints**: Signal you're in play without revealing details (+20 LEVERAGE_DEMONSTRATED, +10 SPONSOR_SUPPORT)
3. **Play it close**: Say nothing, wait for the number, then decide (+15 LEVERAGE_DEMONSTRATED, -15 SPONSOR_SUPPORT)
4. **Accept the offer**: This is the push you needed. Time to leave. (→ Exit path)

---

#### Scene 3: Reading the Political Landscape
**Location**: conference-room (informal)

```
[Lunch with Elena, your peer]

ELENA:
"December. My favorite month.
The month where they tell us what we're worth."

[She studies your face]

ELENA:
"You seem calm. Either you know something,
or you don't care."

INNER VOICE:
Elena's fighting for the same pool.
Everything you say can be used.

ELENA:
"I'm pushing back this year.
Are you?"
```

**Choice 2**:
1. "We'll see what the numbers look like." (+10 plays it close)
2. "I'm confident in my position." (+5 signals strength)
3. "I've been approached by some interesting opportunities." (+15 LEVERAGE_DEMONSTRATED, -10 reveals info)
4. "What are you hearing about the pool?" (+10 gathers intel)

---

#### Scene 4: The Manager Conversation
**Location**: marcus-office

```
[You meet with Marcus]

MARCUS:
"Bonus numbers go to committee next week.
I'm advocating for you—strongly."

[He pauses]

MARCUS:
"But it's competitive. Victoria has a fixed pool.
Everyone thinks they deserve more."

YOU:
[Based on earlier choice]
"I want to make sure my contribution is recognized."

MARCUS:
"Give me specific ammunition.
What do I tell the committee that separates you?"
```

**Choice 3**:
1. **Revenue focus**: "I brought in $40M in client revenue this year." (+20 SPONSOR_SUPPORT)
2. **Team angle**: "I've built a team that would follow me anywhere." (+15 SPONSOR_SUPPORT, signals mobility)
3. **Client loyalty**: "Jordan and Marcus specifically work with us because of me." (+20 LEVERAGE_DEMONSTRATED)
4. **Outside offer**: "I should tell you—I've been approached." (+25 LEVERAGE_DEMONSTRATED, -10 RELATIONSHIP_PRESERVED)

---

### PART 2: THE NEGOTIATION

#### Scene 5: The Signal
**Location**: office

```
[If you signaled you're in play]

MARCUS:
"I heard something interesting.
You're talking to people?"

INNER VOICE:
Word travels.
Either you meant it to, or you didn't.

MARCUS:
"If you're serious about other options,
I need to know now. Not after numbers come out."

[pause]

MARCUS:
"Victoria doesn't respond well to surprises."
```

**Choice 4**:
1. "I'm always open to conversations. Doesn't mean I'm leaving." (+10 ambiguous)
2. "I have an offer. It's significant. I wanted you to know." (+30 LEVERAGE_DEMONSTRATED, +15 OFFER_CREDIBILITY)
3. "I'm committed here—but I need to feel valued." (+15 RELATIONSHIP_PRESERVED)
4. "What would keep me from even considering it?" (+20 forces their hand)

---

#### Scene 6: Client Loyalty
**Location**: restaurant (client dinner)

```
[Dinner with Jordan, your key client]

JORDAN:
"I've been at this a long time.
I know what retention season looks like."

[He smiles]

JORDAN:
"Are you staying?"

INNER VOICE:
Jordan's $15 million.
And he's asking directly.

JORDAN:
"I work with you, not your firm.
You know that, right?"
```

**Choice 5**:
1. "I'm having conversations. Nothing decided." (+15 LEVERAGE_DEMONSTRATED)
2. "I'm committed here. Just the usual noise." (-10 LEVERAGE_DEMONSTRATED, +10 RELATIONSHIP_PRESERVED)
3. "If I moved, would you take my call?" (+25 CLIENT_LOYALTY, confirms your leverage)
4. "What would you need from me—or my next firm—to stay engaged?" (+20 plants seed)

---

#### Scene 7: The Deadline Play
**Location**: office

```
[The recruiter calls again]

DAVID:
"We're down to ten days.
My partners want an answer."

INNER VOICE:
Real or manufactured urgency?
Either way, it creates pressure.

DAVID:
"I can probably get you another week.
But I need something to tell them."

NARRATION:
How do you handle the deadline?
```

**Choice 6**:
1. "I need until the 20th—after our bonus numbers." (+15 buys time)
2. "Tell them I'm interested. I'll have an answer by the 15th." (+20 OFFER_CREDIBILITY, commits you)
3. "I'm still evaluating. No pressure changes that." (+10 maintains control)
4. "I'll need to see everything in writing before I decide." (+15 tests their seriousness)

---

#### Scene 8: Victoria's Office
**Location**: victoria-office

```
[Victoria wants to see you]

VICTORIA:
"Marcus tells me you're a priority.
I wanted to hear from you directly."

[She studies you]

VICTORIA:
"What are you looking for?"

INNER VOICE:
The decision maker. Finally.
Everything until now was prologue.

VICTORIA:
"And I want honesty.
Because I can smell when someone's playing games."
```

**Choice 7 - KEY MOMENT**:
1. **Direct**: "I have an offer for MD at [Competitor]. 30% higher. I'd rather stay—but I need a reason." (+40 LEVERAGE_DEMONSTRATED, +30 OFFER_CREDIBILITY)
2. **Measured**: "I've had conversations. My preference is to grow here. I want to feel that's valued." (+25 LEVERAGE_DEMONSTRATED, +15 RELATIONSHIP_PRESERVED)
3. **Value focus**: "I want to be compensated at the level my contribution deserves. I'll let the numbers speak." (+15 RELATIONSHIP_PRESERVED, -10 LEVERAGE_DEMONSTRATED)
4. **Aggressive**: "I want to know if I'm a priority or a placeholder. Because others think I'm a priority." (+35 LEVERAGE_DEMONSTRATED, -20 RELATIONSHIP_PRESERVED)

---

#### Scene 9: Victoria's Response
**Location**: victoria-office (continued)

```
[Victoria processes]

[BRANCH: If revealed offer directly]
VICTORIA:
"30%. That's a real offer."

[Long pause]

VICTORIA:
"I'm not going to get into a bidding war.
But I also don't want to lose you.
Let me see what's possible."

[BRANCH: If played it measured]
VICTORIA:
"'Conversations.' Everyone has conversations.
What would it take to end those conversations?"

[BRANCH: If aggressive]
VICTORIA:
"Careful. I respect confidence.
I don't respect threats."
```

---

### PART 3: THE RESOLUTION

#### Scene 10: The Counter
**Location**: marcus-office

```
[Two days before bonus announcements]

MARCUS:
"I have news.
Victoria went to bat for you."

[He slides a paper across]

MARCUS:
"This is unofficial.
But this is what we're prepared to offer."

[The number: 20% increase from last year]

INNER VOICE:
More than typical.
Less than the outside offer.

MARCUS:
"It's the best I could do.
What do you want to tell them?"
```

**Choice 8 - CRITICAL DECISION**:
1. **Accept gratefully**: "This is meaningful. Thank you. I'm staying." (+20 RELATIONSHIP_PRESERVED, closes at 20%)
2. **Push back**: "This is a start. But it doesn't match what's on the table outside." (+15 pushes for more)
3. **Specific ask**: "I need 25% to make this work. Can we get there?" (+20 targeted negotiation)
4. **Decline**: "I appreciate the effort. But I have to take the other offer." (→ Exit path)

---

#### Scene 11: The Final Negotiation
**Location**: victoria-office

```
[If you pushed back]

VICTORIA:
"You want more.
Everyone wants more."

[She leans forward]

VICTORIA:
"Tell me what number makes this go away.
A real number. Not an opening position."

INNER VOICE:
She's asking you to name it.
Go too high, and you look greedy.
Go too low, and you left money on the table.

VICTORIA:
"I have one more move in me.
Make it count."
```

**Choice 9 - FINAL NUMBER**:
1. "25% increase. That's the number." (+10 NEGOTIATION_POSITION, realistic)
2. "Match the outside offer. 30%." (+15 LEVERAGE_DEMONSTRATED, risky)
3. "28% with an accelerated promotion timeline." (+20 creative ask)
4. "Whatever you think I'm worth. I trust your judgment." (-15 NEGOTIATION_POSITION, defers)

---

#### Scene 12: The Answer
**Location**: victoria-office

```
[Victoria's response]

[BRANCH: If asked 25%]
VICTORIA:
"25%. Done.
But I expect 25% more value next year."

[BRANCH: If asked 30%]
VICTORIA:
"30% is... aggressive.
I can do 27%. Final answer."

[BRANCH: If asked 28% with promotion]
VICTORIA:
"28% now. Promotion conversation in six months
if the numbers support it. That's my offer."

[BRANCH: If deferred]
VICTORIA:
"Your judgment is your problem.
22%. That's generous for someone who won't advocate for themselves."
```

---

## Endings

### STAYED AND WON

**1. Maximum Extraction**
**Trigger**: Negotiated 27-30% increase

```
NARRATION:
Bonus day. Your number is announced.
It's the highest percentage increase in the group.

Elena looks at you with something between
respect and resentment.

INNER VOICE:
You asked for what you wanted.
And you got it.

LESSON:
Those who don't ask, don't get.
The meek inherit the leftovers.
```

---

**2. Strong Outcome**
**Trigger**: Negotiated 25-26% increase

```
NARRATION:
A good outcome.
Not maximum, but substantial.
And the relationship is intact.

MARCUS:
"You handled that well.
Victoria respects people who push back."

INNER VOICE:
You showed your leverage.
You didn't burn the bridge.
The balance held.

LESSON:
The best negotiations leave both sides satisfied.
```

---

**3. Modest Win**
**Trigger**: Accepted 20-22%

```
NARRATION:
You took the first offer.
It was more than typical.
Less than possible.

INNER VOICE:
Was there more there?
You'll never know.

But you didn't risk the relationship.
That's worth something.
Maybe.

LESSON:
Certainty has value.
So does unrealized potential.
```

---

### LEFT

**4. The Clean Exit**
**Trigger**: Took outside offer, handled professionally

```
NARRATION:
You told them.
They understood.
The transition was smooth.

Six months later, Jordan's business
is at your new firm.
So are two team members.

INNER VOICE:
You left well.
The relationships survived.
And you're 30% richer.

LESSON:
How you leave matters.
The world is small.
```

---

**5. The Burned Bridge**
**Trigger**: Left with animosity

```
NARRATION:
Victoria's final words weren't kind.
Neither were yours.

Jordan's business took six months to move.
Legal got involved.

INNER VOICE:
You got what you wanted.
You also made enemies.
Was it worth it?

LESSON:
Scorched earth feels powerful.
The smoke follows you.
```

---

### FAILED

**6. Called the Bluff**
**Trigger**: Threatened to leave, they let you

```
NARRATION:
"Then I wish you well."
Victoria's words still echo.

You overplayed.
They weren't bluffing.
Now you have to actually leave.

INNER VOICE:
Never make a threat you're not
prepared to execute.

LESSON:
Leverage only works if they believe you'll use it.
And if you actually will.
```

---

**7. Left Money on the Table**
**Trigger**: Didn't negotiate, regretted it

```
NARRATION:
Elena got 28%.
You got 18%.
Same clients. Same performance.

INNER VOICE:
She asked.
You didn't.
That's the difference.

LESSON:
The money doesn't care about your discomfort.
Ask, or accept what they give.
```

---

## Technical Notes

### Negotiation Dynamics
```typescript
leverageFactors = {
  outside_offer: { strength: 40, risk: 'call_the_bluff' },
  client_portability: { strength: 35, risk: 'seen_as_hostage' },
  team_loyalty: { strength: 20, risk: 'hard_to_prove' },
  timing: { strength: 15, risk: 'manufacturing_deadline' }
}
```

### Dialogue Patterns

```typescript
// Signaling leverage
"I've had conversations with interesting opportunities."

// Direct ask
"I have an offer for 30% more. I'd rather stay, but I need a reason."

// Value focus
"I want to be compensated at the level my contribution deserves."

// Walking away
"I appreciate the effort, but I have to take the other offer."
```

### Inner Voice Style
- Calculating: "The math is simple. What's the risk?"
- Observant: "Victoria respects people who push. She just told you."
- Strategic: "Every word is a signal. Choose carefully."

---

## Teaching Moments Summary

1. **The meek get leftovers** - You have to ask
2. **Leverage is useless if you won't use it** - Empty threats destroy credibility
3. **Outside offers are weapons** - Use carefully, they force decisions
4. **Client relationships are portable** - Know your true value
5. **Deadlines create urgency** - Real or manufactured, they work
6. **Relationship and negotiation can coexist** - Push without burning
7. **How you leave matters** - The world is small
8. **Timing is leverage** - December dynamics favor you
9. **Committee politics are real** - Sponsors matter
10. **The number you ask for is the ceiling** - Aim high but realistic

---

*Document created for implementation. This scenario teaches senior-level compensation negotiation—the high-stakes game where asking is the first step to receiving.*
