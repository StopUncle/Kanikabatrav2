# THE CLEAN BREAK

## Story Design Document
**Status:** Ready for Implementation
**Difficulty:** Advanced
**Estimated Scenes:** 30-35
**Estimated Playtime:** 15-20 minutes
**Tier:** Premium

**PLACEMENT: UNISEX - Include in both men's and women's scenario lists**

---

## LOGLINE

You've decided it's over. They haven't. Between the tears, the rage, the promises, and the threats - you have to get out. Your stuff is at their place. You share friends. They know where you work. How do you leave someone who won't let you go?

---

## THEME

**Leaving is not a negotiation.** This scenario teaches:
- Breakups don't require the other person's agreement
- Recognizing manipulation tactics during breakups (DARVO, hoovering, threats)
- Safety planning when leaving difficult partners
- Managing flying monkeys (friends/family they recruit)
- The hoover attempt and how to resist it
- Practical extraction (belongings, shared accounts, keys)

---

## THE PSYCHOLOGY

Breaking up with a manipulator is not like a normal breakup. They will use:
- **Tears and promises** to get "one more chance"
- **DARVO** (Deny, Attack, Reverse Victim and Offender)
- **Flying monkeys** (recruiting others to pressure you)
- **Threats** (self-harm, exposing secrets, "you'll regret this")
- **Hoovering** (sucking you back in weeks/months later)
- **Practical traps** (your stuff, shared finances, keys)

The player learns: **You don't need their permission to leave. You just need a plan.**

---

## CHARACTERS

### DREW (The Ex Who Won't Let Go)
- **Age:** 28-32
- **Role:** Your partner of 8 months. You've decided it's over. They haven't accepted that.
- **Traits:** manipulative, cycling (tears/rage/promises), can't accept rejection, escalates
- **Default Emotion:** sad (performing), angry (when losing control)
- **Character ID:** `drew`

**The Cycle:**
They will rotate through these phases, sometimes in a single conversation:
1. **Denial** - "You don't mean that. We can work this out."
2. **Bargaining** - "I'll change. Tell me what you want. I'll do anything."
3. **Guilt** - "After everything I've done for you? After everything we've been through?"
4. **Anger** - "Fine. Go. You'll never find anyone who loves you like I do."
5. **Threats** - "If you leave me, I'll [hurt myself / tell everyone / make your life hell]"
6. **Love** - (later) "I miss you. I've been thinking about us. Remember when..."

**Voice Notes:**
- Never accepts a "no" - always has a counter
- Uses "we" language even after you've said "I'm done"
- Weaponizes good memories
- Subtle threats disguised as predictions
- When nothing else works: rage

**Sample Dialog (Denial):**
```
"You don't mean that. You're just stressed."
"Let's not make any decisions right now. Sleep on it."
"This isn't you talking. Something else is going on."
```

**Sample Dialog (Bargaining):**
```
"Tell me what I did wrong. I'll fix it."
"I'll go to therapy. I'll change. Just give me a chance."
"What about couples counseling? We owe it to ourselves to try."
```

**Sample Dialog (Guilt):**
```
"After eight months, you're just going to throw it all away?"
"I gave you everything. EVERYTHING."
"My family loves you. How am I supposed to tell them?"
```

**Sample Dialog (Anger):**
```
"You're making a huge mistake."
"No one will ever love you like I do. You'll see."
"You're going to regret this. I promise you that."
```

**Sample Dialog (Threats):**
```
"If you leave, I don't know what I'll do to myself."
"I have those photos, remember. Think about that."
"You think you can just walk away? I'll make sure everyone knows what you did."
```

**Sample Dialog (Hoover - weeks later):**
```
"I was thinking about that trip we took. Remember how happy we were?"
"I've changed. I've been working on myself. Can we talk?"
"I just miss my best friend. I'm not asking for anything. Just coffee."
```

---

### MORGAN (Best Friend)
- **Age:** Similar to player
- **Role:** Your ride-or-die who's helping you get out
- **Traits:** protective, practical, has been waiting for this, supportive
- **Default Emotion:** concerned
- **Character ID:** `morgan`

**Voice Notes:**
- Has seen this coming
- Offers practical help (place to stay, help getting stuff)
- Will not let you backslide
- Direct but loving

**Sample Dialog:**
```
"About fucking time. How can I help?"
"You're staying at my place tonight. Non-negotiable."
"They're texting me now. Asking about you. What do I say?"
"You want me to come with you to get your stuff?"
"It's been two weeks and you're thinking about texting them back? No. Absolutely not."
```

---

### QUINN (Flying Monkey)
- **Age:** Similar to player
- **Role:** Drew's friend who gets recruited to pressure you
- **Traits:** well-meaning but manipulated, thinks they're helping
- **Default Emotion:** concerned
- **Character ID:** `quinn`

**Voice Notes:**
- "Just wants you to talk"
- Shares Drew's side of the story
- Doesn't realize they're being used
- May be genuine, may be a spy

**Sample Dialog:**
```
"Hey, I don't want to get in the middle, but Drew is really struggling."
"They said you just left without explanation. That doesn't sound like you."
"I think they deserve a conversation at least. Don't you?"
"Drew asked me to give you this letter. Please just read it."
```

---

### DREW'S MOTHER (optional Flying Monkey)
- **Role:** Recruited to guilt you
- **Character ID:** `drew-mom`

**Sample Dialog (if included):**
```
"Sweetheart, Drew is a mess. I've never seen them like this."
"Whatever happened, can't you two work it out? For the family?"
"You were like a son/daughter to me. Doesn't that mean anything?"
```

---

### INNER VOICE
- **Character ID:** `inner-voice`
- **Role:** Your gut. Keeping you grounded when the manipulation intensifies.

**Sample Inner Voice:**
```
"You don't need their permission to leave."
"The tears worked before. They're trying again."
"That's not love. That's a threat."
"Stay the course. You know why you left."
"This is the hoover. You knew it was coming."
```

---

## STAT TRACKING

```typescript
// Core stats
RESOLVE: 0-5              // How firm are you in your decision?
SAFETY_AWARENESS: 0-5     // Are you taking safety precautions?
EXTRACTION_PROGRESS: 0-3  // Have you retrieved stuff, changed locks, etc.?

// Flags
MORGAN_SUPPORT: boolean   // Is Morgan actively helping?
STUFF_RETRIEVED: boolean  // Did you get your belongings back?
LOCKS_CHANGED: boolean    // Did you secure your space?
TOLD_WORK: boolean        // Did you inform workplace for safety?
FLYING_MONKEY_HANDLED: boolean  // Did you manage Quinn?
WENT_BACK: boolean        // Did you cave at any point?
HOOVER_RESISTED: boolean  // Did you resist the hoover attempt?
```

---

## STRUCTURE OVERVIEW

### PHASE 1: THE DECISION (Scenes 1-8)
- The breakup conversation
- Drew's denial and bargaining
- The anger phase
- Leaving their place

### PHASE 2: THE AFTERMATH (Scenes 9-18)
- The text flood
- Flying monkey (Quinn's intervention)
- Getting your stuff back
- Safety planning (locks, work notification)

### PHASE 3: THE HOOVER (Scenes 19-30+)
- Two weeks of silence
- The "I've changed" message
- The mutual friend encounter
- Staying free or getting sucked back in

---

## DETAILED SCENE BREAKDOWN

### PHASE 1: THE DECISION

---

#### SCENE 1: THE CONVERSATION
**Type:** Choice Scene
**Background:** apartment (Drew's place)
**Characters:** You, Drew

**Setup:**
You've rehearsed this. You know what you're going to say. Drew is sitting across from you, oblivious to what's coming.

**Dialog Flow:**
1. Narration: Drew is relaxed. Normal evening. They don't know their world is about to end.
2. You: "We need to talk."
3. Narration: Their face changes. They know that tone.
4. Drew: "Okay... what's going on?"
5. Inner voice: "You know what you have to say. Say it."

**Choices:**

**A) Be direct and clear**
- Text: "I'm ending this. We're done."
- Effect: RESOLVE: +2
- Feedback: "OPTIMAL: Clear. No room for misinterpretation."
- Leads to: Scene 2 (Drew's Denial)

**B) Soften it - cite "growing apart"**
- Text: "I think we've grown apart. We should see other people."
- Effect: RESOLVE: +1
- Feedback: "Softer, but gives them room to argue. 'Growing apart' sounds fixable."
- Leads to: Scene 2 (Drew has more to argue against)

**C) Make it about you**
- Text: "I need to work on myself. I'm not ready for a relationship."
- Effect: RESOLVE: 0
- Feedback: "TRAP: Now they'll offer to 'wait' or 'support your growth.' Not a clean break."
- Leads to: Scene 2B (Drew's bargaining intensifies)

**D) Over-explain and justify**
- Text: Launch into all the reasons why this isn't working.
- Effect: RESOLVE: -1
- Feedback: "Every reason is something they'll try to argue or fix. Less is more."
- Leads to: Scene 2 (longer argument)

---

#### SCENE 2: DREW'S DENIAL
**Type:** Choice Scene
**Background:** apartment
**Characters:** Drew

**Setup:**
Drew's face shifts. They're not accepting this.

**Dialog Flow:**
1. Drew: "Wait, what? No. You don't mean that."
2. Drew: "We had a fight, okay, but we can work through this."
3. Drew: "Where is this coming from? What happened?"
4. Inner voice: "They're trying to negotiate. There's nothing to negotiate."

**Choices:**

**A) Stay firm - no negotiation**
- Text: "This isn't a negotiation. My decision is made."
- Effect: RESOLVE: +2
- Feedback: "Clear. They'll escalate, but you're not giving ground."
- Leads to: Scene 3 (Drew's Bargaining)

**B) Explain your reasons**
- Text: Start listing the problems, the patterns, the incidents.
- Effect: RESOLVE: 0
- Feedback: "Every reason is a debate topic. You're extending a conversation that should be over."
- Leads to: Scene 2C (The Argument)

**C) Apologize while ending it**
- Text: "I'm sorry. I know this hurts. But it's over."
- Effect: RESOLVE: +1
- Feedback: "Apologizing is fine. But don't let sorry become a door they can push through."
- Leads to: Scene 3

**D) Get drawn into "what happened"**
- Text: "It's a lot of things. I've been feeling..."
- Effect: RESOLVE: -1
- Feedback: "Now you're in a therapy session about the relationship, not ending it."
- Leads to: Scene 2C

---

#### SCENE 3: DREW'S BARGAINING
**Type:** Choice Scene
**Background:** apartment
**Characters:** Drew

**Setup:**
Denial didn't work. Now comes the bargaining.

**Dialog Flow:**
1. Drew: "Tell me what I did wrong. I'll fix it. I swear."
2. Drew: "We can go to therapy. Couples counseling. Whatever you want."
3. Drew: "Just give me one more chance. One more. That's all I'm asking."
4. Narration: Tears are forming. Their voice is cracking.
5. Inner voice: "The tears. You've seen these tears before. They work on you."

**Choices:**

**A) Hold the line**
- Text: "I've made my decision. I don't want couples counseling. I want out."
- Effect: RESOLVE: +2
- Feedback: "Clear. Final. The only answer that matters."
- Leads to: Scene 4 (Drew's Guilt Trip)

**B) Soften but stay firm**
- Text: "I'm not saying you're a bad person. But this relationship isn't right for me."
- Effect: RESOLVE: +1
- Feedback: "Kind, but be careful. Kindness can become an opening."
- Leads to: Scene 4

**C) Consider the therapy offer**
- Text: "Maybe... maybe counseling could help?"
- Effect: RESOLVE: -2, WENT_BACK: possible
- Feedback: "TRAP: You just opened a door. They'll kick it wide open."
- Leads to: Scene 3B (Drew doubles down on counseling)

**D) Get emotional too**
- Text: Start crying yourself. "This is so hard..."
- Effect: RESOLVE: -1
- Feedback: "Your pain is valid but they'll use it. They'll comfort you. The breakup becomes a cuddle session."
- Leads to: Scene 3C (The Dynamic Flips)

---

#### SCENE 4: DREW'S GUILT TRIP
**Type:** Choice Scene
**Background:** apartment
**Characters:** Drew

**Setup:**
Bargaining failed. Now comes the guilt.

**Dialog Flow:**
1. Drew: "Eight months. Eight months and you're just... done?"
2. Drew: "After everything I've done for you? After everything we've been through?"
3. Drew: "My mother loves you. How am I supposed to tell her?"
4. Drew: "You're destroying us. You know that, right?"
5. Inner voice: "Guilt. The favorite weapon."

**Choices:**

**A) Don't engage with the guilt**
- Text: "I understand you're hurt. But my decision stands."
- Effect: RESOLVE: +2
- Feedback: "You acknowledged the emotion without taking responsibility for it."
- Leads to: Scene 5 (Drew's Anger)

**B) Apologize excessively**
- Text: "I know, I'm so sorry. I feel terrible about this."
- Effect: RESOLVE: -1
- Feedback: "Sorry is fine. Too much sorry becomes a weapon they can use."
- Leads to: Scene 5

**C) Get drawn into justifying**
- Text: "It's not about what you did or didn't do, it's..."
- Effect: RESOLVE: -1
- Feedback: "Now you're explaining again. The breakup is becoming a debate."
- Leads to: Scene 4B (Extended Guilt)

**D) Call out the manipulation**
- Text: "Trying to guilt me isn't going to change my mind."
- Effect: RESOLVE: +2, triggers anger faster
- Feedback: "Direct. They won't like being called out."
- Leads to: Scene 5 (Drew's Anger - escalated)

---

#### SCENE 5: DREW'S ANGER
**Type:** Choice Scene
**Background:** apartment
**Characters:** Drew

**Setup:**
Nothing has worked. The mask slips. Rage surfaces.

**Dialog Flow:**
1. Narration: Drew's face changes. The tears are gone. Something colder is there now.
2. Drew: "Fine. You want to go? Go."
3. Drew: "But you're making a huge mistake. You'll never find anyone who loved you like I did."
4. Drew: "Good luck finding someone who puts up with your shit."
5. Inner voice: "There it is. The real them."

**Choices:**

**A) Don't engage - prepare to leave**
- Text: "I'm going to get my things."
- Effect: RESOLVE: +2, SAFETY_AWARENESS: +1
- Feedback: "OPTIMAL: You're not engaging with the anger. You're leaving."
- Leads to: Scene 6 (Getting Your Stuff)

**B) Defend yourself**
- Text: "That's not fair. I never said—"
- Effect: RESOLVE: -1
- Feedback: "You're defending yourself to someone who's attacking you. They don't want to understand. They want to hurt."
- Leads to: Scene 5B (The Argument Escalates)

**C) Return the anger**
- Text: Match their energy. Fire back.
- Effect: RESOLVE: 0, SAFETY_AWARENESS: -1
- Feedback: "Escalation. This could get dangerous."
- Leads to: Scene 5C (Full Argument)

**D) Leave immediately - stuff later**
- Text: "I'm leaving. I'll get my things another time."
- Effect: RESOLVE: +1, SAFETY_AWARENESS: +2
- Feedback: "Safety first. Smart. But your stuff is still there."
- Leads to: Scene 7 (Out the Door)

---

#### SCENE 6: GETTING YOUR STUFF
**Type:** Choice Scene
**Background:** apartment
**Characters:** Drew (watching)

**Setup:**
You're packing. Drew is watching. The silence is heavy.

**Dialog Flow:**
1. Narration: You're pulling clothes from the closet. Your charger from the nightstand. Drew is standing in the doorway, watching.
2. Drew: "So that's it? You're really doing this?"
3. Narration: Your toothbrush. That book they borrowed. The hoodie.
4. Drew: "Can we at least talk about this tomorrow? When we've both calmed down?"
5. Inner voice: "Don't leave anything behind. You don't want to have to come back."

**Choices:**

**A) Keep packing, minimal response**
- Text: "No. I've said what I needed to say."
- Effect: RESOLVE: +2, EXTRACTION_PROGRESS: +1
- Feedback: "Focused. Don't get drawn back in."
- Leads to: Scene 7

**B) Agree to talk tomorrow (trap)**
- Text: "Fine. We can talk tomorrow."
- Effect: RESOLVE: -2
- Feedback: "TRAP: Tomorrow they'll be calm, sweet, promising change. The cycle continues."
- Leads to: Scene 6B (You've left a door open)

**C) Rush - leave things behind**
- Text: Grab the essentials. Get out. Leave the rest.
- Effect: SAFETY_AWARENESS: +1, EXTRACTION_PROGRESS: 0
- Feedback: "You got out. But your stuff is still there. That's a tie that binds."
- Leads to: Scene 7

**D) Ask Morgan to come help**
- Text: "My friend is going to help me get the rest."
- Effect: SAFETY_AWARENESS: +2, MORGAN_SUPPORT: true
- Feedback: "Witness. Backup. Smart."
- Leads to: Scene 6C (Morgan arrives)

---

#### SCENE 7: OUT THE DOOR
**Type:** Transition Scene
**Background:** apartment (hallway/outside)
**Characters:** You

**Setup:**
You're leaving. It's done. Almost.

**Dialog Flow:**
1. Narration: The door closes behind you. The hallway is quiet.
2. Narration: Your phone is already buzzing. You don't have to look to know who it is.
3. Narration: You did it. The hard part is supposed to be over.
4. Narration: It's not.

**Next Scene:** Scene 8

---

### PHASE 2: THE AFTERMATH

---

#### SCENE 8: THE TEXT FLOOD
**Type:** Choice Scene
**Background:** text-screen
**Characters:** Drew (via text)

**Setup:**
You're home. Or at Morgan's. Safe. Your phone won't stop.

**Dialog Flow:**
1. Show message flood:
   - "Please come back"
   - "I didn't mean what I said"
   - "I'm so sorry"
   - "Can we please talk?"
   - "I love you"
   - "Why won't you answer me?"
   - "Fine. Ignore me."
   - "You're really going to do this to me?"
2. Inner voice: "The cycle. In text form."

**Choices:**

**A) Block immediately**
- Text: Block their number. Breathe.
- Effect: RESOLVE: +2
- Feedback: "Clean cut. The silence will be strange. Then it will be peace."
- Leads to: Scene 10

**B) Mute but don't block**
- Text: Mute notifications. Don't block. Just in case.
- Effect: RESOLVE: +1
- Feedback: "You're keeping a door cracked. Why?"
- Leads to: Scene 9 (Temptation)

**C) Respond once to end it**
- Text: "Please don't contact me. It's over. I need space."
- Effect: RESOLVE: 0
- Feedback: "You gave them a response. They'll view that as an opening."
- Leads to: Scene 9

**D) Read them all**
- Text: Read every message. Don't respond. But read.
- Effect: RESOLVE: -1
- Feedback: "You're still tethered. Each message pulls at you."
- Leads to: Scene 9

---

#### SCENE 10: THE FLYING MONKEY
**Type:** Choice Scene
**Background:** text-screen (then coffee-shop)
**Characters:** Quinn

**Setup:**
Two days later. You get a text from Quinn, Drew's friend.

**Dialog Flow:**
1. Quinn (text): "Hey, can we talk? I'm worried about Drew."
2. Quinn (text): "They're really struggling. I just want to understand what happened."
3. Inner voice: "They've been recruited."

**Choices:**

**A) Don't engage**
- Text: "I'd rather not discuss my relationship. It's between me and Drew."
- Effect: FLYING_MONKEY_HANDLED: true, RESOLVE: +2
- Feedback: "Clean boundary. This isn't their business."
- Leads to: Scene 12

**B) Explain your side**
- Text: Agree to meet. Tell them what really happened.
- Effect: RESOLVE: 0
- Feedback: "You're now relitigating the breakup through a third party. Anything you say goes back to Drew."
- Leads to: Scene 10B (Coffee with Quinn)

**C) Ask what Drew told them**
- Text: "What did Drew say happened?"
- Effect: Gather intel, RESOLVE: +1
- Feedback: "Good to know what narrative is being spun."
- Leads to: Scene 10C (Drew's Version)

**D) Ignore completely**
- Text: Don't respond. Delete.
- Effect: RESOLVE: +1
- Feedback: "You don't owe explanations to flying monkeys."
- Leads to: Scene 12

---

#### SCENE 10C: DREW'S VERSION
**Type:** Choice Scene
**Background:** text-screen
**Characters:** Quinn

**Setup:**
You asked what Drew said. Quinn tells you.

**Dialog Flow:**
1. Quinn: "They said you just left without warning. No explanation."
2. Quinn: "They said you'd been pulling away for weeks and then just blindsided them."
3. Quinn: "They're devastated. They don't understand what they did wrong."
4. Inner voice: "That's not what happened. But of course that's what they said."

**Choices:**

**A) Correct the record**
- Text: "That's not what happened. I was very clear about why I was leaving."
- Effect: RESOLVE: +1
- Feedback: "You're on record. But will Quinn believe you?"
- Leads to: Scene 11

**B) Don't engage with the narrative**
- Text: "I'm not going to argue about Drew's version of events. The relationship is over."
- Effect: FLYING_MONKEY_HANDLED: true, RESOLVE: +2
- Feedback: "You're not playing this game."
- Leads to: Scene 12

**C) Ask Quinn to stay out of it**
- Text: "I appreciate your concern, but this is between me and Drew."
- Effect: FLYING_MONKEY_HANDLED: true, RESOLVE: +1
- Feedback: "Boundary set."
- Leads to: Scene 12

**D) Get frustrated**
- Text: "Of COURSE that's what they said. They're lying, Quinn."
- Effect: RESOLVE: -1
- Feedback: "You sound bitter. Quinn might report this back as 'unstable.'"
- Leads to: Scene 11

---

#### SCENE 14: GETTING YOUR STUFF BACK
**Type:** Choice Scene
**Background:** apartment (Drew's)
**Characters:** You, (Morgan optional), Drew

**Setup:**
You still have things at Drew's place. You need to get them. This is a safety situation.

**Dialog Flow:**
1. Narration: There's still a box of your stuff at Drew's. Clothes. That one photo. Your extra keys.
2. Narration: You need it back. But going there alone feels risky.
3. Inner voice: "Don't go alone."

**Choices:**

**A) Bring Morgan as backup**
- Text: Text Morgan. "Can you come with me to get my stuff?"
- Effect: SAFETY_AWARENESS: +2, MORGAN_SUPPORT: true
- Feedback: "Witness. Protection. Smart."
- Leads to: Scene 14B (The Pickup with Morgan)

**B) Go alone but during daytime**
- Text: Go during the day. Keep it short. In and out.
- Effect: SAFETY_AWARENESS: +1
- Feedback: "Daytime is safer. But you're still alone."
- Leads to: Scene 14C (Alone with Drew)

**C) Ask Drew to leave it outside**
- Text: "Can you leave my things in the lobby? I'll pick them up."
- Effect: SAFETY_AWARENESS: +2
- Feedback: "No contact. Clean."
- Leads to: Scene 14D (Drew's Response)

**D) Write it off - just leave the stuff**
- Text: Nothing there is worth it. Start fresh.
- Effect: EXTRACTION_PROGRESS: ends incomplete, but SAFETY_AWARENESS: +1
- Feedback: "Sometimes belongings aren't worth the risk."
- Leads to: Scene 15

---

#### SCENE 14D: DREW'S RESPONSE TO LOBBY REQUEST
**Type:** Choice Scene
**Background:** text-screen
**Characters:** Drew

**Setup:**
You asked them to leave your stuff in the lobby. They responded.

**Dialog Flow:**
1. Drew (text): "Really? You won't even see me?"
2. Drew (text): "I'm not going to leave your stuff in a lobby like you're a stranger."
3. Drew (text): "If you want your things, you can come get them like an adult."
4. Inner voice: "They're using your stuff as leverage."

**Choices:**

**A) Don't negotiate - bring backup**
- Text: "I'll be there Saturday at 2pm with a friend."
- Effect: SAFETY_AWARENESS: +2
- Feedback: "You're not asking permission. You're informing them."
- Leads to: Scene 14B

**B) Cave - agree to go alone**
- Text: "Fine. I'll come by tomorrow."
- Effect: SAFETY_AWARENESS: -1
- Feedback: "They got what they wanted - you, alone, in their space."
- Leads to: Scene 14C

**C) Involve a third party**
- Text: "If you won't put them in the lobby, I'll have someone else pick them up."
- Effect: SAFETY_AWARENESS: +2
- Feedback: "Taking yourself out of the equation."
- Leads to: Scene 14E (Morgan goes alone)

**D) Let it go**
- Text: "Keep it. I don't need it."
- Effect: EXTRACTION_PROGRESS: incomplete
- Feedback: "You're free of the trap. But they still have your things."
- Leads to: Scene 15

---

#### SCENE 16: SAFETY PLANNING
**Type:** Choice Scene
**Background:** apartment (yours)
**Characters:** You, Morgan (via call)

**Setup:**
You're home. Processing. Morgan calls to check in.

**Dialog Flow:**
1. Morgan: "Hey. How are you doing? Seriously."
2. You talk about the last few days.
3. Morgan: "Do they still have a key to your place?"
4. Inner voice: "They do. Shit."

**Choices:**

**A) Change the locks immediately**
- Text: "I need to call my landlord. Tomorrow."
- Effect: LOCKS_CHANGED: true, SAFETY_AWARENESS: +2
- Feedback: "Smart. Take control of your space."
- Leads to: Scene 17

**B) Ask for the key back**
- Text: "Maybe I should just ask them to return it."
- Effect: SAFETY_AWARENESS: -1
- Feedback: "You're trusting them to respect your boundaries. They haven't so far."
- Leads to: Scene 17

**C) It's probably fine**
- Text: "They wouldn't actually use it... right?"
- Effect: SAFETY_AWARENESS: -2
- Feedback: "Hope is not a safety plan."
- Leads to: Scene 17

**D) Stay at Morgan's for a few days**
- Text: "Can I crash with you? Until I sort this out?"
- Effect: SAFETY_AWARENESS: +2, MORGAN_SUPPORT: true
- Feedback: "Creating distance. Wise."
- Leads to: Scene 17

---

### PHASE 3: THE HOOVER

---

#### SCENE 20: TWO WEEKS LATER
**Type:** Transition Scene
**Background:** apartment
**Characters:** You

**Setup:**
It's been two weeks. The constant contact has stopped. It's quiet. Too quiet.

**Dialog Flow:**
1. Narration: Two weeks of relative silence. A few texts you ignored. Then nothing.
2. Narration: You're starting to feel normal again. The constant anxiety is fading.
3. Narration: Your phone buzzes. Unknown number. But you know who it is.
4. Inner voice: "Here it comes."

---

#### SCENE 21: THE HOOVER
**Type:** Choice Scene
**Background:** text-screen
**Characters:** Drew (via text)

**Setup:**
The hoover attempt. Classic format.

**Dialog Flow:**
1. Drew (new number): "Hey. I know you don't want to hear from me."
2. Drew: "I've been doing a lot of thinking. Working on myself."
3. Drew: "I'm not asking for anything. I just wanted to say I'm sorry. For everything."
4. Drew: "I miss my best friend."
5. Inner voice: "The hoover. Exactly what you read about. Exactly what Morgan warned you about."

**Choices:**

**A) Don't respond - block this number too**
- Text: Block. Breathe. Move on.
- Effect: HOOVER_RESISTED: true, RESOLVE: +3
- Feedback: "OPTIMAL: You recognized it. You didn't engage. That's growth."
- Leads to: ENDING - Good

**B) Read but don't respond**
- Text: Leave it on read. Let them wonder.
- Effect: RESOLVE: +1
- Feedback: "You didn't engage. But you read it all. Something's still pulling at you."
- Leads to: Scene 22

**C) Respond - set a boundary**
- Text: "I wish you well, but please don't contact me again."
- Effect: RESOLVE: 0
- Feedback: "You responded. They'll view that as a crack in the wall."
- Leads to: Scene 22B (Drew pushes)

**D) Feel the pull - consider responding**
- Text: "Maybe... they really have changed?"
- Effect: RESOLVE: -2
- Feedback: "This is exactly what the hoover is designed to do. Make you doubt."
- Leads to: Scene 22C (The Temptation)

---

#### SCENE 22C: THE TEMPTATION
**Type:** Choice Scene
**Background:** apartment
**Characters:** You, Morgan (call option)

**Setup:**
You're thinking about responding. About meeting for coffee. "Just to talk."

**Dialog Flow:**
1. Narration: Their words keep replaying. "I've changed." "I miss my best friend."
2. Narration: What if they really have changed? What if you're throwing away something real?
3. Your phone shows Morgan's contact. You could call. Get a reality check.
4. Inner voice: "You know what Morgan will say. Is that why you're hesitating to call?"

**Choices:**

**A) Call Morgan**
- Text: Call. "I need you to talk me out of something."
- Effect: RESOLVE: +2
- Feedback: "You asked for help. Smart."
- Leads to: Scene 23 (Morgan's Reality Check)

**B) Meet Drew - just coffee**
- Text: Respond: "Okay. Coffee. Just to talk."
- Effect: WENT_BACK: true, RESOLVE: -3
- Feedback: "You're walking back into the trap."
- Leads to: Scene 24 (The Cycle Restarts)

**C) Sit with the feeling - don't act**
- Text: Feel the pull. Don't respond. Let it pass.
- Effect: RESOLVE: +1
- Feedback: "The urge is real. So is your power to not act on it."
- Leads to: Scene 25

**D) Write a response, don't send**
- Text: Type everything you want to say. Then delete it.
- Effect: RESOLVE: +1
- Feedback: "You got it out. Without giving them anything."
- Leads to: Scene 25

---

#### SCENE 23: MORGAN'S REALITY CHECK
**Type:** Choice Scene
**Background:** phone-call
**Characters:** Morgan

**Setup:**
You called Morgan. They're giving you the truth.

**Dialog Flow:**
1. Morgan: "Tell me you're not thinking about going back."
2. You explain the text. The "I've changed." The "I miss my best friend."
3. Morgan: "That's the playbook. That's literally the playbook. They always 'change' during the hoover."
4. Morgan: "You know what happens if you go back, right? Three months of good behavior, then the same shit."
5. Inner voice: "They're right. You know they're right."

**Choices:**

**A) Listen - stay strong**
- Text: "You're right. I know you're right. I'm not going to respond."
- Effect: HOOVER_RESISTED: true, RESOLVE: +2
- Feedback: "Support system worked. That's what they're for."
- Leads to: Scene 25

**B) Push back - defend Drew**
- Text: "What if they really have changed though?"
- Effect: RESOLVE: -1
- Feedback: "You're looking for permission. Morgan won't give it."
- Leads to: Scene 23B (Morgan's harder truth)

**C) Ask Morgan to hold you accountable**
- Text: "Can you check on me tomorrow? Make sure I didn't do anything stupid?"
- Effect: MORGAN_SUPPORT: true, RESOLVE: +1
- Feedback: "Building in accountability. Smart."
- Leads to: Scene 25

**D) Admit you're struggling**
- Text: "I know it's stupid. But I miss them too sometimes."
- Effect: RESOLVE: 0 (honest but vulnerable)
- Feedback: "Honest. The missing is real. Doesn't mean going back is right."
- Leads to: Scene 25

---

## ENDINGS (8 TOTAL)

### GOOD ENDINGS (3)

**1. "The Clean Break"**
- Trigger: RESOLVE >= 4, HOOVER_RESISTED: true, SAFETY_AWARENESS >= 3
- Summary: "You did everything right. You said what needed to be said and didn't negotiate. You got your stuff, changed your locks, blocked their number. When the hoover came, you saw it for what it was. The silence feels strange at first - you're not used to a life without constant emotional chaos. Then you realize: this is what peace feels like. You'd forgotten."

**2. "The Support System"**
- Trigger: MORGAN_SUPPORT: true, HOOVER_RESISTED: true
- Summary: "You couldn't have done it alone. Every time you wavered, Morgan was there. Every time the guilt crept in, they reminded you why you left. The breakup was hard. The aftermath was harder. But you had someone in your corner who wouldn't let you backslide. That's not weakness - that's wisdom. Now, you're ready to be that person for someone else someday."

**3. "The Closed Door"**
- Trigger: LOCKS_CHANGED: true, all EXTRACTION complete, HOOVER_RESISTED: true
- Summary: "You left nothing behind. No stuff at their place. No key in their pocket. No crack in the door for them to push through. When they try to hoover, they're reaching for a ghost. You've rebuilt your life without them in it. The door isn't just closed - it's sealed. There's no way back in. That's not cruel. That's self-preservation."

### NEUTRAL ENDINGS (2)

**4. "The Long Goodbye"**
- Trigger: RESOLVE: 2-3, took too long but eventually stayed away
- Summary: "It wasn't clean. You responded to texts you shouldn't have. You almost met them for coffee. You spent too many nights reading old messages. But eventually, finally, you stopped. Not because you stopped caring, but because you started caring about yourself more. The wound is still healing. But at least you stopped reopening it."

**5. "The Open Window"**
- Trigger: Didn't block completely, HOOVER_RESISTED but still read messages
- Summary: "You didn't go back. But you didn't fully close the door either. Their messages still reach you, even if you don't respond. Part of you wants to keep that window cracked - just in case. Just to know you could. It's not freedom, not really. But it's not captivity either. Somewhere in between. You'll need to close that window eventually. You're just not ready yet."

### BAD ENDINGS (3)

**6. "The Cycle"**
- Trigger: WENT_BACK: true
- Summary: "Coffee turned into dinner. Dinner turned into 'let's try again.' Three months later, you're back in the same patterns, having the same fights, feeling the same emptiness. They changed just long enough to get you back. Now you're trapped again, except this time you know exactly what's happening. That makes it worse. You'll try to leave again someday. Maybe next time you'll make it."

**7. "The Lingering"**
- Trigger: EXTRACTION incomplete, SAFETY_AWARENESS low
- Summary: "They still have your things. Your books. That hoodie. The photos. Every few weeks, they text about it - an excuse to reach out, a tether they refuse to release. You could demand it back. You could write it off. Instead, you exist in this limbo, still connected, still entangled, still not free. It's been six months. The stuff isn't coming back. But you can't let go of what it represents."

**8. "The Flying Monkey Victory"**
- Trigger: FLYING_MONKEY_HANDLED: false, got sucked into the narrative war
- Summary: "Quinn was just the beginning. Then it was Drew's mother. Then mutual friends who 'just wanted to help.' Everyone has an opinion. Everyone has Drew's side of the story. You've spent so much energy fighting the narrative that you've forgotten to just live your life. Drew doesn't need to contact you anymore - their army does it for them. You're not in a relationship anymore, but you're still trapped in their orbit."

---

## TECHNICAL NOTES FOR IMPLEMENTER

### Stat Tracking
```typescript
RESOLVE: number              // 0-5, key determinant
SAFETY_AWARENESS: number     // 0-5, affects safety-related endings
EXTRACTION_PROGRESS: number  // 0-3, physical separation
MORGAN_SUPPORT: boolean      // Is Morgan active support?
STUFF_RETRIEVED: boolean     // Got belongings?
LOCKS_CHANGED: boolean       // Secured space?
TOLD_WORK: boolean           // Workplace notified?
FLYING_MONKEY_HANDLED: boolean // Managed Quinn?
WENT_BACK: boolean           // Failed and returned?
HOOVER_RESISTED: boolean     // Survived the hoover?
```

### Templates for Unisex
```typescript
templates: {
  drew: ['Drew', 'Jordan', 'Taylor', 'Riley'],
  morgan: ['Morgan', 'Casey', 'Sam', 'Alex'],
  quinn: ['Quinn', 'Jamie', 'Avery', 'Reese'],
}
```

### Background IDs
- apartment (yours and Drew's)
- text-screen (message floods)
- coffee-shop (conversations)
- phone-call (Morgan calls)

### Key Pacing Notes
- Phase 1: Intense, fast, emotional
- Phase 2: Practical, safety-focused, grounding
- Phase 3: Time skip, test of resolve

---

## SAFETY MESSAGING

**Important:** This scenario deals with leaving potentially dangerous relationships. Include:

**End screen resources:**
- National Domestic Violence Hotline (if US)
- Local equivalent resources
- "If you're in a similar situation, you're not alone. Help is available."

**In-scenario messaging:**
- Model asking for help
- Model safety planning
- Never blame the player for the partner's behavior

---

## END OF DESIGN DOCUMENT
