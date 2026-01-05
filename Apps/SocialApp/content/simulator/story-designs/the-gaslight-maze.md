# THE GASLIGHT MAZE

## Story Design Document
**Status:** Ready for Implementation
**Difficulty:** Advanced
**Estimated Scenes:** 28-32
**Estimated Playtime:** 15-18 minutes
**Tier:** Premium

**PLACEMENT: UNISEX - Include in both men's and women's scenario lists**

---

## LOGLINE

You KNOW you saw what you saw. They KNOW you didn't. Somehow, every argument ends with you apologizing for something you're not even sure you did. Your memory feels unreliable. Your confidence is shot. How do you escape a maze where someone keeps moving the walls?

---

## THEME

**Reality is not negotiable.** This scenario teaches:
- Recognizing gaslighting tactics (denial, minimization, DARVO)
- The difference between genuine misunderstanding and deliberate reality distortion
- How gaslighters erode your trust in yourself over time
- Documentation as a survival tool
- Trusting external reality checks (friends, evidence)
- Leaving when your reality is under attack

---

## THE PSYCHOLOGY

Gaslighting is systematic reality manipulation designed to make you:
- **Doubt your memory** ("That never happened")
- **Doubt your perception** ("You're imagining things")
- **Doubt your sanity** ("You're being crazy")
- **Depend on them for reality** ("I'm the only one who tells you the truth")

The gaslighter maintains control by making you unable to trust yourself.

**Key insight:** Gaslighting is about POWER, not truth. They know what happened. They're lying deliberately.

---

## CHARACTERS

### AVERY (The Gaslighter)
- **Age:** 29-34
- **Role:** Your partner of 8 months. Smart. Charming. Making you feel insane.
- **Traits:** reality-distorting, confident, never wrong, calm when lying
- **Default Emotion:** neutral (calm denial), concerned (fake worry), cold (when cornered)
- **Character ID:** `avery`

**The Gaslighting Toolkit:**
1. **Flat denial** - "That never happened"
2. **Minimization** - "You're making a big deal out of nothing"
3. **Deflection** - "Why are you bringing this up now?"
4. **Reversal** - "Actually, YOU'RE the one who..."
5. **Concern trolling** - "I'm worried about you. This isn't normal."
6. **Isolation** - "Your friends are putting ideas in your head"

**Voice Notes:**
- Always calm, even when lying
- Makes YOU sound irrational for questioning them
- Uses "we" and "us" to create false alliance
- Expresses fake concern about your mental state
- Never admits fault, never apologizes authentically

**Sample Dialog (Denial):**
```
"I never said that. You must have misheard me."
"That conversation didn't happen. I think you dreamed it."
"I was home all night. I don't know what you think you saw."
```

**Sample Dialog (Minimization):**
```
"Even if I did say that, it's not a big deal."
"You're blowing this way out of proportion."
"This is such a small thing. Why are you so upset?"
```

**Sample Dialog (Reversal/DARVO):**
```
"Actually, YOU'RE the one who said that."
"I'm not the one with trust issues here."
"You're always accusing me of things. It's exhausting."
```

**Sample Dialog (Concern Trolling):**
```
"I'm genuinely worried about you. This paranoia isn't healthy."
"Maybe you should talk to someone. A professional."
"Have you been sleeping? You seem really off lately."
```

**Sample Dialog (Isolation):**
```
"Your friends have never liked me. They're poisoning you against me."
"You've been different since you started hanging out with them again."
"I'm the only one who really knows you. Why do you trust them over me?"
```

---

### RILEY (Best Friend)
- **Age:** Similar to player
- **Role:** The external reality check. Increasingly concerned.
- **Traits:** loyal, observant, worried, won't be gaslit themselves
- **Default Emotion:** concerned
- **Character ID:** `riley`

**Voice Notes:**
- Notices you've changed
- Provides external verification of reality
- Doesn't tell you what to do, asks questions that make you think
- Won't participate in gaslighting even to keep the peace

**Sample Dialog:**
```
"You keep apologizing for things that weren't your fault."
"I was there. That IS what happened. Don't let them rewrite it."
"When's the last time you felt confident about your own memory?"
"You used to know what you thought. What happened?"
```

---

### INNER VOICE
- **Character ID:** `inner-voice`
- **Role:** Your gut. Getting quieter as Avery's voice gets louder.

**Voice Evolution:**
- Early: "You know what you saw."
- Middle: "Did you though? Maybe they're right."
- Late (recovery): "Write it down. Your memory is fine."

**Sample Inner Voice:**
```
"You know what happened. Don't let them rewrite it."
"Why do you always end up apologizing?"
"Your memory was fine before you met them."
"That's the third time they've denied something you witnessed."
```

---

## STAT TRACKING

```typescript
// Core stats
SELF_TRUST: 0-5           // Do you trust your own perception?
REALITY_ANCHOR: 0-5       // Do you have external verification?
DOCUMENTATION: 0-3        // Are you writing things down?

// Flags
RILEY_CONSULTED: boolean     // Have you talked to Riley?
FOUND_EVIDENCE: boolean      // Did you find proof?
STARTED_DOCUMENTING: boolean // Did you begin keeping records?
CONFRONTED_WITH_PROOF: boolean // Did you confront with evidence?
AVERY_ADMITTED: boolean      // Did they slip up?
LEFT_RELATIONSHIP: boolean   // Did you get out?
```

---

## STRUCTURE OVERVIEW

### PART 1: THE INCIDENT (Scenes 1-8)
- Something happens (you witness it clearly)
- Avery denies it happened
- The first crack in your reality
- You start to doubt yourself

### PART 2: THE PATTERN (Scenes 9-18)
- More incidents, more denials
- You start documenting (or don't)
- Riley expresses concern
- The erosion of self-trust

### PART 3: THE PROOF (Scenes 19-28)
- You find evidence (or don't)
- Confrontation with proof (or without)
- Avery's reaction
- Your choice: stay in the maze or find the exit

---

## DETAILED SCENE BREAKDOWN

### PART 1: THE INCIDENT

---

#### SCENE 1: THE RESTAURANT
**Type:** Transition Scene
**Background:** restaurant
**Characters:** You, Avery, Server

**Setup:**
Dinner with Avery. Something happens that you witness clearly.

**Dialog Flow:**
1. Narration: Nice restaurant. Avery's choice. You're having a good time.
2. Server approaches with the bill.
3. Avery: (to server, charming) "Could we get a discount? The steak was overcooked."
4. Server: "I'm sorry, but you ate the entire—"
5. Avery: (voice drops, cold) "I'd like to speak to your manager. Now."
6. Narration: You watch them berate the server for five minutes. Get a 40% discount. Leave no tip.
7. Avery turns to you, warm again: "Ready to go?"

**Next Scene:** Scene 2

---

#### SCENE 2: IN THE CAR
**Type:** Choice Scene
**Background:** apartment (car stand-in)
**Characters:** Avery

**Setup:**
You're driving home. You're uncomfortable about what just happened.

**Dialog Flow:**
1. Narration: The car is quiet. You're thinking about the server's face.
2. You: "That was... kind of intense back there."
3. Avery: "What do you mean?"
4. Inner voice: "You know what you saw."

**Choices:**

**A) Be specific about what bothered you**
- Text: "The way you talked to that server. It was harsh."
- Effect: SELF_TRUST: +1
- Feedback: "You named it. Let's see how they respond."
- Leads to: Scene 3 (Avery's Denial)

**B) Soften it**
- Text: "Just... the whole thing with the bill. It felt uncomfortable."
- Effect: Neutral
- Feedback: "Vague enough to be redirected."
- Leads to: Scene 3

**C) Ask a question**
- Text: "Did you really think the steak was overcooked?"
- Effect: SELF_TRUST: +1
- Feedback: "You're questioning the premise."
- Leads to: Scene 3B (Avery's Justification)

**D) Drop it**
- Text: "Never mind. It's fine."
- Effect: SELF_TRUST: -1
- Feedback: "You're already editing yourself."
- Leads to: Scene 4

---

#### SCENE 3: AVERY'S DENIAL
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
You brought it up. Avery is rewriting what happened.

**Dialog Flow:**
1. Avery: "Harsh? I wasn't harsh."
2. Avery: "I was polite. I just asked for what we deserved."
3. Avery: "If anything, THEY were rude to US."
4. Narration: That's... not what happened. Is it?
5. Inner voice: "You watched them berate a server for five minutes."

**Choices:**

**A) Push back - you saw what you saw**
- Text: "Avery, you raised your voice. The server looked like they were going to cry."
- Effect: SELF_TRUST: +2
- Feedback: "You're holding onto reality."
- Leads to: Scene 3C (Avery escalates denial)

**B) Second-guess yourself**
- Text: "Maybe I misread it..."
- Effect: SELF_TRUST: -1
- Feedback: "The seed of doubt is planted."
- Leads to: Scene 4

**C) Seek clarification**
- Text: "You don't think asking for a manager and getting a discount was... a lot?"
- Effect: SELF_TRUST: +1
- Feedback: "You're still questioning, but softer."
- Leads to: Scene 3D (Avery normalizes)

**D) Let it go**
- Text: "Okay. Maybe I saw it wrong."
- Effect: SELF_TRUST: -2
- Feedback: "You just abandoned your reality for theirs."
- Leads to: Scene 4

---

#### SCENE 3C: AVERY ESCALATES DENIAL
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
You pushed back. Avery is now questioning YOUR perception.

**Dialog Flow:**
1. Avery: "Raised my voice? I never raised my voice."
2. Avery: "Babe, I think you're misremembering."
3. Avery: (concerned face) "Are you okay? You've been stressed lately."
4. Avery: "Maybe the stress is affecting how you see things."
5. Inner voice: "They're making this about you. About your perception. Not about what they did."

**Choices:**

**A) Hold your ground**
- Text: "I'm not misremembering. I was right there."
- Effect: SELF_TRUST: +2
- Feedback: "You're not letting them rewrite it."
- Leads to: Scene 5 (Avery changes tactics)

**B) Start to doubt**
- Text: "I... I was right there. I thought..."
- Effect: SELF_TRUST: -1
- Feedback: "The hesitation is what they wanted."
- Leads to: Scene 4

**C) Get frustrated**
- Text: "Don't do that. Don't make this about my stress."
- Effect: SELF_TRUST: +1
- Feedback: "You named the deflection."
- Leads to: Scene 5

**D) Accept their framing**
- Text: "Maybe you're right. I have been stressed."
- Effect: SELF_TRUST: -2
- Feedback: "You just agreed that your perception is unreliable."
- Leads to: Scene 4

---

#### SCENE 5: AVERY CHANGES TACTICS
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
You didn't back down. Avery shifts to a new approach.

**Dialog Flow:**
1. Avery: (sighs) "Okay, even IF I was a little short with them—"
2. Avery: "They were rude first. You didn't see how they looked at me."
3. Avery: "And honestly, you're making a way bigger deal of this than it needs to be."
4. Avery: "It's a restaurant. It's over. Why are you still on this?"
5. Inner voice: "First it didn't happen. Now it happened but it was justified. Notice the shift."

**Choices:**

**A) Name the shift**
- Text: "First you said you weren't harsh. Now you're saying it was justified. Which is it?"
- Effect: SELF_TRUST: +2, CONFRONTED_WITH_PROOF: partial
- Feedback: "You caught the inconsistency."
- Leads to: Scene 6 (Avery gets angry)

**B) Accept the minimization**
- Text: "You're right, it's not a big deal. Forget I said anything."
- Effect: SELF_TRUST: -1
- Feedback: "You let them shrink it."
- Leads to: Scene 7

**C) Disengage but remember**
- Text: "Fine. Let's drop it."
- Effect: SELF_TRUST: 0 (neutral - you're not agreeing, just stopping)
- Feedback: "You're not buying it. But you're not fighting either."
- Leads to: Scene 7

**D) Apologize to end the conflict**
- Text: "I'm sorry. I shouldn't have brought it up."
- Effect: SELF_TRUST: -2
- Feedback: "You apologized for noticing something real."
- Leads to: Scene 7

---

#### SCENE 6: AVERY GETS ANGRY
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
You caught the inconsistency. Avery's mask slips.

**Dialog Flow:**
1. Avery: (cold) "You know what? I don't like what you're implying."
2. Avery: "You're basically calling me a liar."
3. Avery: "After everything I do for this relationship, THIS is what I get?"
4. Narration: The warmth is gone. This is the other Avery.
5. Inner voice: "DARVO. Deny, Attack, Reverse Victim and Offender."

**Choices:**

**A) Don't back down**
- Text: "I'm not calling you a liar. I'm telling you what I saw."
- Effect: SELF_TRUST: +2
- Feedback: "You held. They won't forget this."
- Leads to: Scene 7

**B) Apologize to de-escalate**
- Text: "I'm not trying to attack you. I'm sorry."
- Effect: SELF_TRUST: -1
- Feedback: "You apologized for standing your ground."
- Leads to: Scene 7

**C) Name the DARVO**
- Text: "You're turning this around on me. I just stated a fact."
- Effect: SELF_TRUST: +2, CONFRONTED_WITH_PROOF: partial
- Feedback: "You see the tactic. That's powerful."
- Leads to: Scene 6B (Avery denies DARVO)

**D) Walk away**
- Text: "I'm not doing this right now." Leave the room.
- Effect: SELF_TRUST: +1
- Feedback: "You refused to participate in the distortion."
- Leads to: Scene 7

---

### PART 2: THE PATTERN

---

#### SCENE 7: TIME SKIP - THE PATTERN
**Type:** Transition Scene
**Background:** apartment
**Characters:** You (internal)

**Setup:**
Weeks pass. The restaurant was just the beginning.

**Dialog Flow:**
1. Narration: That wasn't the last time.
2. Narration: There was the time they said they'd call and didn't. "I never said I'd call."
3. Narration: The plans they made and forgot. "We never made those plans."
4. Narration: The thing they said that hurt you. "I never said that. You're putting words in my mouth."
5. Narration: Each time, you know what happened. Each time, they convince you that you don't.
6. Inner voice: "Your memory was fine before you met them."

**Next Scene:** Scene 8

---

#### SCENE 8: THE CONFIDENCE EROSION
**Type:** Choice Scene
**Background:** apartment
**Characters:** You (internal)

**Setup:**
You're noticing changes in yourself.

**Dialog Flow:**
1. Narration: You've started second-guessing everything.
2. Narration: Did you really send that text? Better check.
3. Narration: Did that conversation actually happen? Maybe you imagined it.
4. Narration: You used to be confident. Now you're not sure of anything.
5. Inner voice: "This isn't you. This is what they've done to you."

**Choices:**

**A) Start writing things down**
- Text: Open notes app. Start documenting what happens.
- Effect: DOCUMENTATION: +1, STARTED_DOCUMENTING: true
- Feedback: "Anchor to reality. Smart."
- Leads to: Scene 9

**B) Talk to Riley**
- Text: "I need to talk to someone."
- Effect: RILEY_CONSULTED: true
- Feedback: "External reality check. Critical."
- Leads to: Scene 10 (Riley Conversation)

**C) Try to be more careful**
- Text: Maybe if you pay better attention, you'll stop "misremembering."
- Effect: SELF_TRUST: -1
- Feedback: "You're buying their framing. Your memory isn't the problem."
- Leads to: Scene 11

**D) Confront Avery about the pattern**
- Text: "We need to talk about something."
- Effect: SELF_TRUST: +1
- Feedback: "Direct approach. Risky without evidence."
- Leads to: Scene 12 (Confrontation without Proof)

---

#### SCENE 9: DOCUMENTATION BEGINS
**Type:** Transition Scene
**Background:** text-screen (notes app)
**Characters:** You

**Setup:**
You've started keeping records.

**Dialog Flow:**
1. Your notes:
   - "Tuesday: A said they'd pick up groceries. They didn't. Claimed they never said they would."
   - "Thursday: A said my dress was 'too much' for dinner. Later said they 'never said that.'"
   - "Saturday: A flirted with server. I mentioned it. They said I was 'imagining things.'"
2. Narration: In writing, the pattern is undeniable.
3. Inner voice: "Your memory is fine. They're lying."

**Next Scene:** Scene 11

---

#### SCENE 10: RILEY CONVERSATION
**Type:** Choice Scene
**Background:** coffee-shop
**Characters:** Riley

**Setup:**
You're with Riley. For the first time, you're talking about what's been happening.

**Dialog Flow:**
1. Riley: "Hey, you've seemed off lately. Everything okay?"
2. You explain: the denials, the things that didn't happen, the feeling of going crazy.
3. Riley: "Wait. They're saying things didn't happen that definitely happened?"
4. Riley: "That's... that's gaslighting. You know that, right?"
5. Inner voice: "Someone else sees it."

**Choices:**

**A) Feel validated**
- Text: "Is it? I thought maybe I was just... misremembering."
- Effect: RILEY_CONSULTED: true, REALITY_ANCHOR: +2
- Feedback: "The relief of being believed."
- Leads to: Scene 10B (Riley's Reality Check)

**B) Defend Avery**
- Text: "I don't know if it's that serious. Maybe we just communicate differently."
- Effect: RILEY_CONSULTED: true, REALITY_ANCHOR: +1
- Feedback: "You're not ready to name it yet."
- Leads to: Scene 10C (Riley pushes back)

**C) Ask for examples from Riley**
- Text: "Have you noticed anything? From the outside?"
- Effect: RILEY_CONSULTED: true, REALITY_ANCHOR: +2
- Feedback: "External data."
- Leads to: Scene 10D (Riley's Observations)

**D) Minimize**
- Text: "I'm probably overreacting."
- Effect: SELF_TRUST: -1
- Feedback: "You're gaslighting yourself now."
- Leads to: Scene 11

---

#### SCENE 10D: RILEY'S OBSERVATIONS
**Type:** Choice Scene
**Background:** coffee-shop
**Characters:** Riley

**Setup:**
Riley has been watching. They have observations.

**Dialog Flow:**
1. Riley: "Actually, yeah. Remember Sarah's party?"
2. Riley: "Avery told you that you'd embarrassed them. That you were 'too loud.'"
3. Riley: "I was there. You weren't loud. You were having fun. For the first time in months."
4. Riley: "They pulled you aside and you came back... smaller. Quieter."
5. Inner voice: "Riley was there. Riley saw it."

**Choices:**

**A) Trust Riley's account**
- Text: "I remember that. I thought I was being embarrassing."
- Effect: REALITY_ANCHOR: +2, FOUND_EVIDENCE: partial
- Feedback: "External verification. Your memory was right."
- Leads to: Scene 13

**B) Doubt Riley too**
- Text: "Maybe you saw it differently than it was."
- Effect: REALITY_ANCHOR: -1
- Feedback: "The gaslighting has gone deep. You're doubting everyone now."
- Leads to: Scene 11

**C) Ask for more examples**
- Text: "What else have you noticed?"
- Effect: REALITY_ANCHOR: +2, FOUND_EVIDENCE: true
- Feedback: "Building a case."
- Leads to: Scene 10E (More Examples)

**D) Realize the pattern**
- Text: "Oh god. They've been doing this the whole time."
- Effect: SELF_TRUST: +2, REALITY_ANCHOR: +2
- Feedback: "The fog is lifting."
- Leads to: Scene 13

---

#### SCENE 12: CONFRONTATION WITHOUT PROOF
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
You're confronting Avery about the pattern. But you don't have documentation or external backup.

**Dialog Flow:**
1. You: "We need to talk. About the way you deny things that happened."
2. Avery: (calm) "What are you talking about?"
3. You: "You keep saying things didn't happen when they did. You're making me feel crazy."
4. Avery: "Making you feel crazy? Babe, I think you need to hear yourself right now."
5. Inner voice: "They're doing it again. Right now."

**Choices:**

**A) Give examples**
- Text: "Like the restaurant. You yelled at that server and then said you didn't."
- Effect: SELF_TRUST: +1
- Feedback: "Specific. But it's your word against theirs."
- Leads to: Scene 12B (Avery denies restaurant)

**B) Stay general**
- Text: "It's a pattern. Every time I bring something up, you say it didn't happen."
- Effect: SELF_TRUST: +1
- Feedback: "Naming the pattern. But without proof, they'll slip away."
- Leads to: Scene 12C (Avery plays concerned)

**C) Back down**
- Text: "Maybe... maybe I'm just stressed."
- Effect: SELF_TRUST: -2
- Feedback: "You abandoned the confrontation. They won."
- Leads to: Scene 14

**D) Walk away to regroup**
- Text: "I need to think about this."
- Effect: SELF_TRUST: 0
- Feedback: "You're not caving. But you're not breaking through either."
- Leads to: Scene 13

---

#### SCENE 12C: AVERY PLAYS CONCERNED
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
You confronted them. They're now "worried" about you.

**Dialog Flow:**
1. Avery: (soft, concerned voice) "Babe, I'm really worried about you."
2. Avery: "You've been saying things like this a lot lately."
3. Avery: "Maybe we should get you to talk to someone. A therapist."
4. Avery: "I just want you to be okay."
5. Inner voice: "They're pathologizing you for seeing the truth."

**Choices:**

**A) Reject the concern trolling**
- Text: "I don't need therapy. I need you to stop lying to me."
- Effect: SELF_TRUST: +2
- Feedback: "You didn't take the bait."
- Leads to: Scene 15 (Avery escalates)

**B) Consider it**
- Text: "Maybe... maybe I should talk to someone."
- Effect: SELF_TRUST: -1
- Feedback: "You just agreed that you're the problem."
- Leads to: Scene 14

**C) Flip it**
- Text: "Maybe WE should see a therapist. Together."
- Effect: SELF_TRUST: +1
- Feedback: "If there's a problem, it's between you - not just in you."
- Leads to: Scene 12D (Avery's reaction to couples therapy)

**D) End the conversation**
- Text: "I'm done talking about this right now."
- Effect: SELF_TRUST: 0
- Feedback: "Stalemate."
- Leads to: Scene 13

---

### PART 3: THE PROOF

---

#### SCENE 16: FINDING EVIDENCE
**Type:** Choice Scene
**Background:** apartment
**Characters:** You

**Setup:**
You've been documenting. Or you find something unexpected.

**Dialog Flow (Documentation Path):**
1. Narration: Three weeks of notes. Every denial, every reversal, every "that didn't happen."
2. Narration: In black and white, it's undeniable.
3. Inner voice: "Your memory is fine. You have proof now."

**Dialog Flow (Accidental Discovery):**
1. Narration: You find something. A text thread Avery left open. Them telling a friend what actually happened at the restaurant.
2. Narration: "Yeah, I went off on the waiter. Got us a huge discount though lol"
3. Narration: They knew. They always knew.
4. Inner voice: "They lied. Deliberately. They KNOW what they did."

**Choices:**

**A) Confront with evidence**
- Text: "I need to show them. They can't deny this."
- Effect: FOUND_EVIDENCE: true, CONFRONTED_WITH_PROOF: true
- Feedback: "Proof in hand. Let's see what happens."
- Leads to: Scene 17 (Confrontation with Proof)

**B) Keep gathering**
- Text: More evidence. Build an undeniable case.
- Effect: DOCUMENTATION: +1
- Feedback: "You're being thorough. But when is enough enough?"
- Leads to: Scene 18

**C) Show Riley**
- Text: Share what you've found with Riley.
- Effect: RILEY_CONSULTED: true, REALITY_ANCHOR: +2
- Feedback: "Witness. Verification. Support."
- Leads to: Scene 16B (Riley sees evidence)

**D) Use it to leave quietly**
- Text: You don't need to confront. You just need to leave.
- Effect: SELF_TRUST: +2
- Feedback: "You don't owe them a trial. You can just go."
- Leads to: Scene 20 (Planning Exit)

---

#### SCENE 17: CONFRONTATION WITH PROOF
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
You have evidence. You're confronting them.

**Dialog Flow:**
1. You: "I need to show you something."
2. You show them: the notes, the texts, the documentation.
3. You: "You said the restaurant thing didn't happen. Here's you telling someone it did."
4. Narration: Their face cycles through several expressions. Surprise. Calculation. Then...
5. Inner voice: "Watch what they do. This tells you everything."

**Choices:**

**A) Wait for their response**
- Text: Let them speak first.
- Effect: CONFRONTED_WITH_PROOF: true
- Feedback: "See how they handle being caught."
- Leads to: Scene 17B (Avery's Response to Proof)

**B) State what you know**
- Text: "You've been lying to me. Deliberately. For months."
- Effect: SELF_TRUST: +2
- Feedback: "You're not asking. You're telling."
- Leads to: Scene 17B

**C) Ask why**
- Text: "Why? Why would you make me think I was crazy?"
- Effect: Seeks explanation
- Feedback: "You want to understand. You might not get a real answer."
- Leads to: Scene 17C (Avery's "Explanation")

**D) State you're done**
- Text: "I'm not here for an explanation. I'm here to tell you it's over."
- Effect: SELF_TRUST: +3, LEFT_RELATIONSHIP: progress
- Feedback: "You don't need their confession. You have yours."
- Leads to: Scene 19

---

#### SCENE 17B: AVERY'S RESPONSE TO PROOF
**Type:** Choice Scene
**Background:** apartment
**Characters:** Avery

**Setup:**
Avery has been confronted with evidence. Watch what they do.

**Branch A: Continued Denial**
1. Avery: "This is taken out of context."
2. Avery: "I was joking in that text. Obviously."
3. Avery: "I can't believe you're going through my phone."
4. Inner voice: "Caught red-handed and still lying."

**Branch B: DARVO Escalation**
1. Avery: "You've been DOCUMENTING me? Like a criminal?"
2. Avery: "What kind of person does that?"
3. Avery: "This is such a betrayal. I can't believe you."
4. Inner voice: "You caught them lying and now YOU'RE the bad guy?"

**Branch C: Rare Admission**
1. Avery: (long pause) "Okay. Okay, you're right."
2. Avery: "I don't know why I do it. I'll get help."
3. Avery: "Just please don't leave. I'll change."
4. Inner voice: "They admitted it. But will they change? Or is this just the next tactic?"

**Choices:**

**A) To Denial: Call it out**
- Text: "You're still doing it. Even with proof in front of you."
- Effect: SELF_TRUST: +2
- Feedback: "You see it clearly now."
- Leads to: Scene 19

**B) To DARVO: Don't engage**
- Text: "I'm not defending documenting my own reality. We're done."
- Effect: SELF_TRUST: +3
- Feedback: "You're not taking the bait."
- Leads to: Scene 19

**C) To Admission: Consider staying**
- Text: "If you're really willing to get help..."
- Effect: SELF_TRUST: -1
- Feedback: "The admission might be real. It might be another trap."
- Leads to: Scene 18 (Testing the Promise)

**D) To Admission: Leave anyway**
- Text: "I'm glad you can admit it. But I can't trust you anymore."
- Effect: SELF_TRUST: +2, LEFT_RELATIONSHIP: true
- Feedback: "Admission doesn't equal change. You know that."
- Leads to: Scene 20

---

#### SCENE 19: THE EXIT
**Type:** Choice Scene
**Background:** apartment
**Characters:** You, (Avery in background)

**Setup:**
You're done. It's over. Now you leave.

**Dialog Flow:**
1. Narration: The fog has lifted. You see clearly now.
2. Narration: Every "misremembering," every "you're imagining things," every "that never happened."
3. Narration: It was all deliberate. You weren't crazy. You were being driven crazy.
4. Inner voice: "Your reality was never the problem. They were."

**Choices:**

**A) Leave now, figure out logistics later**
- Text: Walk out. Sort the rest tomorrow.
- Effect: LEFT_RELATIONSHIP: true
- Feedback: "Out. Safe. Free."
- Leads to: ENDING

**B) Clear exit with support**
- Text: Call Riley. "I'm leaving. Can I come to you?"
- Effect: LEFT_RELATIONSHIP: true, RILEY_CONSULTED: true
- Feedback: "You have somewhere to go and someone who believes you."
- Leads to: ENDING

**C) Have a final word**
- Text: "I know what you did. I know I'm not crazy. And I'm done."
- Effect: SELF_TRUST: +2, LEFT_RELATIONSHIP: true
- Feedback: "You said it out loud. For yourself."
- Leads to: ENDING

**D) Document this conversation too**
- Text: Hit record on your phone. Get their admission on tape.
- Effect: DOCUMENTATION: +1, FOUND_EVIDENCE: true
- Feedback: "For the record. For yourself. For proof."
- Leads to: ENDING

---

## ENDINGS (8 TOTAL)

### GOOD ENDINGS (3)

**1. "The Clear View"**
- Trigger: SELF_TRUST >= 4, FOUND_EVIDENCE: true, LEFT_RELATIONSHIP: true
- Summary: "You see it all now. Every lie, every denial, every time they made you question your own mind. It wasn't a communication problem. It wasn't stress. It wasn't your memory. It was them. Deliberately, systematically, making you doubt your own reality so you'd depend on theirs. You have the notes, the texts, the proof. But more importantly, you have yourself back. Your memory works fine. It always did. They just wanted you to forget that."

**2. "The Witness"**
- Trigger: RILEY_CONSULTED: true, REALITY_ANCHOR >= 4, LEFT_RELATIONSHIP: true
- Summary: "Riley believed you. When you couldn't trust yourself, they trusted you for you. They remembered what Avery did, even when Avery convinced you it never happened. That's what gaslighting steals - not just your confidence, but your connection to people who could tell you the truth. You almost lost that. Almost. But you reached out. You asked. And Riley was there with receipts, with memories, with 'I was there, and that DID happen.' You're not alone. You never were."

**3. "The Documentation"**
- Trigger: STARTED_DOCUMENTING: true, DOCUMENTATION >= 2, LEFT_RELATIONSHIP: true
- Summary: "You started writing things down. Just little notes at first. 'They said X. This is what actually happened.' It felt paranoid. Excessive. Crazy, even. But then you had three weeks of entries. Then two months. And in black and white, the pattern was undeniable. Your memory wasn't faulty. Your perception wasn't off. You were being lied to, systematically, by someone who smiled while they did it. The notes saved you. Your own words, in your own hand, anchoring you to reality when they tried to pull you loose."

### NEUTRAL ENDINGS (2)

**4. "The Fog"**
- Trigger: LEFT_RELATIONSHIP: true but SELF_TRUST <= 2
- Summary: "You left. But you're not sure if you should have. Maybe they were right. Maybe you DO misremember things. Maybe you ARE too sensitive. The fog hasn't lifted - you carried it with you. It will take time to clear. Months, maybe years, of learning to trust yourself again. The gaslighting didn't end when the relationship did. It just changed addresses - from them to the voice in your own head."

**5. "The Almost"**
- Trigger: AVERY_ADMITTED: true, stayed in relationship
- Summary: "They admitted it. They said they'd change. They started therapy. And maybe they meant it. Maybe they'll really stop. But you're watching now. Documenting. Checking with Riley. You didn't leave, but you're not lost in the maze anymore. You can see the walls. Whether they stop moving them - that's still to be determined. You gave them another chance. Now you're waiting to see if they deserve it."

### BAD ENDINGS (3)

**6. "The Maze"**
- Trigger: SELF_TRUST <= 1, LEFT_RELATIONSHIP: false
- Summary: "You can't remember what really happened anymore. Every memory has an asterisk, a 'but maybe I'm wrong,' a voice that sounds like theirs questioning everything you think you know. You've stopped talking to Riley - Avery said they were poisoning you against them. You've stopped writing things down - Avery found your notes and said they were 'disturbing.' You're still in the maze. And now you can't even see the walls."

**7. "The Apology"**
- Trigger: HIGH apologize count, SELF_TRUST <= 2
- Summary: "You apologize constantly now. For being suspicious. For 'accusing' them. For your faulty memory, your stress, your paranoia. Every time you notice something real, you apologize for noticing. You've been trained. Conditioned. Broken. The person you were before - the one who trusted themselves - is a stranger now. You're sorry for her too, probably. For something."

**8. "The Reversal"**
- Trigger: Accused Riley of lying, defended Avery completely
- Summary: "Riley tried to warn you. You cut them off. They were just jealous, Avery said. Trying to break you two up. Now it's just you and Avery, alone in your apartment, alone in your reality. They've won. Not just your trust - your entire world. When they say it didn't happen, it didn't happen. When they say you're wrong, you're wrong. The maze isn't something you're trying to escape anymore. It's just... home."

---

## TECHNICAL NOTES FOR IMPLEMENTER

### Stat Tracking
```typescript
SELF_TRUST: number         // 0-5, core stat
REALITY_ANCHOR: number     // 0-5, external verification
DOCUMENTATION: number      // 0-3, written records

RILEY_CONSULTED: boolean
FOUND_EVIDENCE: boolean
STARTED_DOCUMENTING: boolean
CONFRONTED_WITH_PROOF: boolean
AVERY_ADMITTED: boolean
LEFT_RELATIONSHIP: boolean
```

### Templates for Unisex
```typescript
templates: {
  avery: ['Avery', 'Jordan', 'Taylor', 'Morgan'],
  riley: ['Riley', 'Casey', 'Sam', 'Jamie'],
}
```

### Background IDs
- apartment (main setting)
- restaurant (incident scene)
- coffee-shop (Riley conversations)
- text-screen (documentation, evidence)

### Pacing Notes
- Part 1: The player should feel disoriented, questioning themselves
- Part 2: Pattern recognition, doubt increasing then decreasing
- Part 3: Clarity, power, choice

---

## TEACHING NOTES

This scenario explicitly teaches:

1. **Gaslighting tactics:**
   - Flat denial
   - Minimization
   - DARVO (Deny, Attack, Reverse Victim and Offender)
   - Concern trolling
   - Isolation from external reality checks

2. **Defense strategies:**
   - Documentation
   - External reality checks (trusted friends)
   - Trusting your own memory
   - Recognizing patterns over time

3. **Core message:**
   - Your memory is probably fine
   - If someone repeatedly denies your reality, that's data
   - You don't need them to admit it for it to be true
   - External verification is powerful

---

## END OF DESIGN DOCUMENT
