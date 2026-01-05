# The Hostile Offer

## Meta Information
- **Tier**: VIP
- **Difficulty**: Expert
- **Estimated Scenes**: 28-35
- **Category**: M&A defense, negotiation under pressure, strategic decision-making

---

## Logline

9 AM Monday. A letter arrives from Sterling Capital. They're offering $4.2 billion for your company—a 35% premium to the stock price. The board has 48 hours to respond. As CEO, you have three options: accept and become wealthy, fight and risk everything, or find a white knight. The clock is ticking, and everyone—shareholders, employees, board members—is watching what you do.

---

## Core Theme

**When predators circle, leaders show their true nature.** This scenario teaches:
- M&A defense strategies (poison pills, white knights, pac-man defense)
- Fiduciary duty to shareholders vs. company preservation
- Negotiating under extreme time pressure
- Managing multiple stakeholders with conflicting interests
- The personal calculus of deal vs. fight

---

## Psychology Being Taught

### The Hostile Takeover Reality
A hostile offer isn't just a business transaction—it's an existential threat that tests:
1. Your commitment to the company vs. personal gain
2. Your ability to think strategically under pressure
3. Your negotiation skills at the highest stakes
4. Your relationship with the board and shareholders
5. Your willingness to fight for what you've built

### Key Defense Strategies

| Strategy | Description | Risk Level |
|----------|-------------|------------|
| **Poison Pill** | Make acquisition prohibitively expensive | Medium - can deter but not block |
| **White Knight** | Find a friendlier acquirer | Medium - lose independence anyway |
| **Pac-Man Defense** | Counter-offer to acquire THEM | Very High - need resources |
| **Crown Jewel Defense** | Sell key assets to make company less attractive | High - may anger shareholders |
| **Staggered Board** | Delay proxy fight across multiple years | Medium - buying time |
| **Just Say No** | Reject and defend publicly | High - depends on shareholder support |

### The Personal Calculation

| Factor | Accept | Fight |
|--------|--------|-------|
| Personal wealth | Guaranteed payout | Uncertain |
| Career legacy | "Sold the company" | "Defended the company" (or "lost it") |
| Employee impact | Likely layoffs under new owner | Jobs preserved (for now) |
| Shareholder value | Premium today | Uncertain future value |
| Personal risk | Low | Very high |

---

## Characters

### You (The CEO)
You built this. Now someone wants to take it. What's it worth to you?

### Victor Sterling - Hostile Acquirer
**Role**: CEO of Sterling Capital. The predator.
**Style**: Charming but ruthless. Uses premium as leverage.

**Voice Example**:
> "This is a generous offer. Your shareholders deserve to decide.
> Don't let your ego stand in the way of their value."

---

### Victoria - Board Chair
**Role**: Represents fiduciary duty. Must balance your vision with shareholder interests.

**Voice Example**:
> "I'm with you emotionally. But I have a fiduciary duty.
> If we can't present a better alternative,
> the shareholders may force our hand."

---

### Marcus - CFO
**Role**: Numbers person. Can model scenarios. Critical for defense.

**Voice Example**:
> "At $4.2 billion, that's 12x EBITDA.
> To justify rejection, we need to show a path to higher value."

---

### Chen - General Counsel
**Role**: Legal implications. Knows the defense playbook.

**Voice Example**:
> "We have a poison pill in place. That buys time.
> But it won't stop a proxy fight if shareholders want the premium."

---

### Sarah - Board Member (Shareholder Advocate)
**Role**: Represents the shareholder perspective. Will push for premium.

**Voice Example**:
> "35% premium is real money. Our job is to maximize shareholder value.
> We need to seriously consider this."

---

### Potential White Knight (Alexandra Chen, CEO of TechCorp)
**Role**: Possible friendly acquirer. Better than Sterling, but still an exit.

**Voice Example**:
> "I'd consider a friendly merger. But I need exclusivity to negotiate.
> You can't play me against Sterling."

---

## Stat Tracking

### Core Stats

```typescript
stats: {
  BOARD_UNITY: 0-100,           // Is the board with you?
  SHAREHOLDER_SUPPORT: 0-100,   // Will shareholders back you?
  DEFENSE_STRENGTH: 0-100,      // How strong is your position?
  ALTERNATIVE_VALUE: 0-100,     // Can you show better path?
  TIME_PRESSURE: 0-100,         // How much time do you have?
  PERSONAL_STAKE: 0-100         // What are you personally risking?
}
```

### Flags

```typescript
flags: {
  poison_pill_activated: boolean,
  white_knight_engaged: boolean,
  counter_offer_made: boolean,
  shareholder_revolt: boolean,
  hostile_defeated: boolean,
  friendly_deal_done: boolean,
  company_sold_hostile: boolean,
  independence_maintained: boolean
}
```

---

## Structure Overview

### Part 1: The Shock (Scenes 1-8)
The offer arrives. Assessment begins.

**Key Moments**:
- The letter
- Board emergency meeting
- Personal calculation
- Initial strategy

### Part 2: The Defense (Scenes 9-20)
Executing your chosen strategy.

**Key Moments**:
- Poison pill deployment
- White knight conversations
- Sterling's escalation
- Shareholder pressure
- The board meeting

### Part 3: The Resolution (Scenes 21-35)
The outcome—however it falls.

**Key Moments**:
- Final board vote
- Shareholder decision
- Deal or no deal
- The aftermath

---

## Detailed Scene Breakdown

### PART 1: THE SHOCK

#### Scene 1: The Letter
**Location**: office

```
[Monday, 9:14 AM. Your assistant interrupts.]

ASSISTANT:
"This was hand-delivered. Marked urgent."

[Sterling Capital letterhead]

INNER VOICE:
Your stomach drops before you read it.

[The letter:]
"Dear Board of Directors,

Sterling Capital is pleased to submit this proposal
to acquire 100% of [Company] for $4.2 billion in cash,
representing a 35% premium to Friday's closing price.

This offer is subject to board recommendation
and standard regulatory approval.

We expect a response within 48 hours."

INNER VOICE:
A hostile bid. This is real.
Everything changes now.
```

---

#### Scene 2: The Emergency Board Call
**Location**: meeting-room (video conference)

```
[Board convenes within the hour]

VICTORIA:
"I've distributed the Sterling letter.
We have 48 hours to respond.
What are our options?"

CHEN: [General Counsel]
"Legally, we have several defenses available.
Our poison pill makes a hostile acquisition very expensive.
But it won't stop a proxy fight."

MARCUS: [CFO]
"At $4.2 billion, they're offering 12x EBITDA.
That's a premium. Our stock hasn't hit this level in two years."

SARAH:
"My fiduciary duty is to shareholders.
35% premium is significant. We need to take this seriously."

[All eyes turn to you]

VICTORIA:
"What's your recommendation?"
```

**Choice 1 - SETS STRATEGY**:
1. **Fight**: "We reject this offer. This company is worth more." (+20 DEFENSE_STRENGTH, -10 SHAREHOLDER_SUPPORT)
2. **Explore options**: "We evaluate all alternatives—including the offer." (+10 BOARD_UNITY, balanced)
3. **Find a white knight**: "We find a better partner than Sterling." (+15 ALTERNATIVE_VALUE)
4. **Accept**: "The premium is real. We should recommend acceptance." (→ Quick ending path)

---

#### Scene 3: The Personal Calculation
**Location**: office (alone)

```
[After the call. You do the math.]

INNER VOICE:
Your equity stake: $85 million at this premium.
Guaranteed.

If you fight and lose, that could drop to half.
If you fight and win, maybe it doubles in five years.
Or maybe it doesn't.

[You think about what you've built]

INNER VOICE:
Twelve years. From startup to this.
If Sterling takes over, 30% of employees go.
The culture dies.
Everything you built—gone.

But $85 million is life-changing money.
And this fight could destroy you.

NARRATION:
What's driving your decision?
```

**Choice 2**:
1. "This is about the company. The people. What we built." (+15 personal conviction)
2. "This is about winning. I don't lose to people like Sterling." (+10 competitive drive)
3. "The money would be nice, but I'm not done yet." (+10 ambition)
4. "I need to think about my family. The security." (+10 personal consideration)

---

### PART 2: THE DEFENSE

#### Scene 4: Activating Defenses
**Location**: meeting-room

```
[If chose to fight]

CHEN: [General Counsel]
"I've activated the poison pill.
If Sterling acquires more than 15% without board approval,
existing shareholders can purchase stock at 50% discount."

[pause]

CHEN:
"It makes the acquisition prohibitively expensive.
But it's not permanent. They can still run a proxy fight
to replace the board with directors who will deactivate it."

YOU:
"How long do we have?"

CHEN:
"Proxy season is 60 days.
If shareholders are unhappy enough, they vote us out
and vote Sterling in."

INNER VOICE:
The clock is ticking.
You have 60 days to prove this company is worth more.
```

---

#### Scene 5: The White Knight Option
**Location**: phone-call

```
[If pursuing white knight strategy]

[Call with Alexandra Chen, TechCorp CEO]

ALEXANDRA:
"I've seen the Sterling offer.
I might be interested in a friendly alternative."

YOU:
"What are you thinking?"

ALEXANDRA:
"I'd need exclusivity. Can't waste time if you're
playing me against Sterling.

And I'll need real diligence.
If the numbers support it, I could potentially go higher."

INNER VOICE:
Higher than $4.2 billion?
But you'd still lose control.

Is a friendly buyer actually better?
Or is it just different packaging on the same loss?
```

**Choice 3**:
1. "Let's discuss terms. I'm open to the right partnership." (+25 ALTERNATIVE_VALUE, -20 independence)
2. "I want to explore this while keeping options open." (+15 ALTERNATIVE_VALUE, may lose her)
3. "I'm not interested in any sale. We're staying independent." (+20 DEFENSE_STRENGTH, closes this path)

---

#### Scene 6: Sterling Escalates
**Location**: office (letter/call)

```
[Sterling's next move]

[Letter to shareholders - leaked to press]

"To the shareholders of [Company]:

Your board has rejected our $4.2 billion offer—
a 35% premium that would deliver immediate, certain value.

We believe shareholders, not management, should decide.
If the board does not reconsider,
we will pursue all available options,
including a proxy contest to replace them with
directors who respect shareholder value."

[Press coverage: "Sterling Goes Hostile"]

INNER VOICE:
They're going directly to shareholders.
Over your head.

Your phone is ringing.
Investors want answers.
```

---

#### Scene 7: Shareholder Pressure
**Location**: phone-call (investor)

```
[Call from major shareholder - 8% stake]

INVESTOR:
"I need to understand why you're rejecting a 35% premium.
My clients are asking."

YOU:
"We believe the company is worth more.
Our standalone plan creates more value."

INVESTOR:
"'Believe' isn't a number.
Show me the model. Show me the path to higher value.

Because right now, my fiduciary duty says
I vote for the premium."

INNER VOICE:
This is the real fight.
Board support means nothing if shareholders revolt.

NARRATION:
How do you handle investor pressure?
```

**Choice 4**:
1. "We'll present our value creation plan to shareholders." (+20 SHAREHOLDER_SUPPORT attempt)
2. "Trust the management team. We've delivered before." (-10 SHAREHOLDER_SUPPORT, too vague)
3. "We're exploring alternatives that may exceed this offer." (+15 SHAREHOLDER_SUPPORT)
4. "The offer undervalues our strategic assets." (+10 SHAREHOLDER_SUPPORT)

---

#### Scene 8: The Value Case
**Location**: meeting-room

```
[You present to the board the standalone value case]

YOU:
"If we execute on Q4, plus the new product launch,
plus the cost synergies from last year's acquisition—
we get to $6 billion valuation in 36 months."

MARCUS: [CFO]
"These projections are defensible.
Aggressive, but defensible."

SARAH: [skeptical]
"You're asking shareholders to wait three years
for a 40% increase—with execution risk.

Sterling is offering 35% today, guaranteed."

VICTORIA:
"The question is whether shareholders
trust management to deliver."

[Silence]

INNER VOICE:
That IS the question.
Do they trust you?
```

---

### PART 3: THE RESOLUTION

#### Scene 9: The Final Board Meeting
**Location**: meeting-room (board room)

```
[60 days later. Proxy deadline approaching.]

VICTORIA:
"We need to make a final recommendation.
Sterling's proxy campaign is gaining support.

Latest shareholder polling shows:
- 45% support Sterling
- 35% support management
- 20% undecided"

[The math is tight]

VICTORIA:
"If we recommend rejection and shareholders override us,
this entire board will be replaced.

If we recommend acceptance, we're selling the company.

The choice is yours."

NARRATION:
What do you recommend?
```

**Choice 5 - FINAL DECISION**:
1. **Fight to the end**: "We recommend rejection. Let shareholders decide." (+30 DEFENSE_STRENGTH, all-in)
2. **Negotiate surrender**: "Let's re-engage Sterling. See if we can get better terms." (+20 ALTERNATIVE_VALUE)
3. **White knight close**: "Alexandra's offer at $4.5B is the recommendation." (+25 ALTERNATIVE_VALUE)
4. **Accept Sterling**: "The shareholder support isn't there. We recommend acceptance." (→ Sold ending)

---

#### Scene 10: The Vote
**Location**: meeting-room (board room)

```
[If fought to the end - shareholder vote]

NARRATION:
The proxy vote is counted.

[Results:]

[BRANCH: Victory]
"53% of shareholders voted to support the board.
Sterling's proxy campaign has failed."

INNER VOICE:
You won.
Against a hostile acquirer with billions.
You kept your company.

[BRANCH: Defeat]
"57% of shareholders voted for Sterling's slate.
The current board has been removed.
Sterling will proceed with acquisition."

INNER VOICE:
You lost.
The shareholders chose the premium.
The company you built will be dismantled.
```

---

## Endings

### FOUGHT AND WON

**1. Independence Preserved**
**Trigger**: Shareholder vote supported board

```
NARRATION:
Six months later.
Sterling has moved on to other targets.
Your stock is up 15% since the fight.

EMPLOYEE:
"We heard what happened. Thank you for fighting."

INNER VOICE:
You risked everything to keep this independent.
And it worked.

LESSON:
Some things are worth fighting for.
Even when the odds say you shouldn't.
```

---

**2. Pyrrhic Victory**
**Trigger**: Won but company weakened by fight

```
NARRATION:
You kept independence.
But the fight cost two quarters of focus.
Key executives left for stability elsewhere.
The product launch was delayed.

INNER VOICE:
You won the battle.
The war isn't over.

LESSON:
Even victories have costs.
The fight doesn't end when you win.
```

---

### SOLD (VARIOUS PATHS)

**3. The White Knight Save**
**Trigger**: Friendly acquisition completed

```
NARRATION:
TechCorp closes the acquisition at $4.5 billion.
10% more than Sterling offered.

Alexandra keeps most of the team.
You become "President, [Company] Division."

INNER VOICE:
It's not independence.
But it's not destruction either.
A soft landing.

LESSON:
Sometimes the best defense
is choosing your own buyer.
```

---

**4. Hostile Success**
**Trigger**: Sterling won proxy fight

```
NARRATION:
Sterling's slate takes the board seats.
They accept their own offer.
Acquisition closes 90 days later.

You receive your $85 million.
And a non-compete.
And a lot of time to think.

INNER VOICE:
They took what you built.
You got paid.
It doesn't feel like winning.

LESSON:
Money is not the same as victory.
Sometimes you lose even when the check clears.
```

---

**5. Golden Parachute**
**Trigger**: Sold but negotiated strong terms

```
NARRATION:
Part of the deal: 24-month employment guarantee.
Retention bonus. Advisory role.

You walk away with $100 million.

INNER VOICE:
You couldn't stop the sale.
But you maximized what you got.

LESSON:
If you're going to lose,
lose with the best terms possible.
```

---

## Technical Notes

### Key Defense Moves
```typescript
defenseOptions = {
  poison_pill: { time_bought: 60_days, stops_hostile: false },
  white_knight: { premium_possible: '+10%', independence: false },
  proxy_fight: { win_threshold: 50%, risk: 'total' },
  negotiate: { premium_possible: '+5%', dignity: 'low' }
}
```

### Dialogue Patterns

```typescript
// Defending to board
"We believe the company is worth more. Here's the path."

// To shareholders
"This offer undervalues our potential. Trust the plan."

// To hostile bidder
"Your offer is inadequate and not in shareholder interests."

// White knight
"We're interested in the right partnership."
```

---

## Teaching Moments Summary

1. **Hostile offers test everything** - your conviction, strategy, relationships
2. **Poison pills buy time** - but don't stop proxy fights
3. **Shareholders ultimately decide** - not the board
4. **White knights mean losing control** - just to a friendlier buyer
5. **Personal wealth vs. company preservation** - real tension
6. **Time pressure forces decisions** - 48-hour deadlines are weapons
7. **Fiduciary duty constrains options** - boards must consider offers
8. **Investor support is essential** - can't fight without shareholders
9. **Even victories have costs** - fighting consumes resources
10. **Know when to negotiate exit** - if you're going to lose, lose well

---

*Document created for implementation. This scenario teaches the highest-stakes corporate defense—where careers, legacies, and billions of dollars hang in the balance of a few decisions.*
