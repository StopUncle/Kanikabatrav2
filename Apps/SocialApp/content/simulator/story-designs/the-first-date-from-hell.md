# THE FIRST DATE FROM HELL

## Story Design Document
**Status:** Ready for Implementation
**Difficulty:** Intermediate
**Estimated Scenes:** 18-22
**Estimated Playtime:** 10-12 minutes
**Tier:** Free (gateway scenario)

**PLACEMENT: UNISEX - Include in both men's and women's scenario lists**

---

## LOGLINE

Twenty minutes in and you already know this is wrong. But you're stuck at a restaurant. They drove. They're getting weird. How do you get out safely - without "being rude"? A crash course in trusting your gut and making your exit.

---

## THEME

**Politeness is not more important than safety.** This scenario teaches:
- Recognizing early red flags (interrupting, boundary testing, intensity)
- Trusting discomfort even when you can't articulate why
- Practical exit strategies for uncomfortable situations
- The myth of "giving them a chance" when your gut says no
- How predators use social pressure to keep you in place

---

## THE PSYCHOLOGY

First dates are assessment opportunities. Manipulators know this and:
- **Test boundaries early** (touching, personal questions, insisting on plans)
- **Use logistics as leverage** (they drove, they picked the place, you're far from home)
- **Weaponize politeness** ("Don't be rude," "Just give me a chance")
- **Escalate gradually** (each overstep is small, the pattern is alarming)

The player learns: **Your discomfort is data. Act on it.**

---

## CHARACTERS

### BLAKE (The Date from Hell)
- **Age:** 28-35
- **Role:** Your first date. Met on an app. Seemed normal. Isn't.
- **Traits:** boundary-pusher, dismissive, escalating, uses charm as cover
- **Default Emotion:** seductive (charm), smirking (dismissive), angry (when defied)
- **Character ID:** `blake`

**The Red Flag Progression:**
1. Small things (interrupting, dismissing your opinions)
2. Medium things (touching without permission, commenting on your body)
3. Big things (anger when challenged, blocking your exit, insisting you can't leave)

**Voice Notes:**
- Starts charming and attentive
- Interrupts and redirects conversations to themselves
- Makes "jokes" that are actually assessments
- Gets cold or aggressive when boundaries are set
- Uses "you're overreacting" and "relax" frequently

**Sample Dialog (Early):**
```
"Wow, you're even more attractive in person."
"I knew from your profile we'd click. I'm never wrong about these things."
"You seem tense. Relax. I'm not going to bite." (smirk)
```

**Sample Dialog (Escalating):**
```
"You don't really want to go, do you? We're just getting started."
"I drove all the way out here to meet you. The least you can do is stay for another drink."
"You're being so uptight. It's just a compliment."
"What's the rush? You got a better offer?" (hand on your arm)
```

**Sample Dialog (Challenged):**
```
"Wow. Okay. I was trying to be nice but fine."
"Every woman/guy says they want someone confident, then they act like this."
"You're making a big deal out of nothing."
"Fine. Go. Good luck finding someone who puts up with your attitude."
```

---

### INNER VOICE
- **Character ID:** `inner-voice`
- **Role:** Your gut. Registering red flags before you can name them.

**Sample Inner Voice:**
```
"Something's off. You can't name it yet, but it's there."
"They haven't let you finish a sentence."
"That touch was uninvited."
"Your stomach just dropped. That's information."
"Politeness is not worth your safety."
```

---

### THE BARTENDER/SERVER (Optional Ally)
- **Role:** A potential escape route
- **Character ID:** `server`

**Sample Dialog:**
```
"Everything okay over here?"
"Can I get you anything else?" (pointed look)
"The bathroom is just down that hall. To the left."
```

---

## STAT TRACKING

```typescript
// Core stats
GUT_TRUST: 0-5           // Are you listening to yourself?
BOUNDARY_FIRM: 0-5       // How clearly have you set limits?
SAFETY_AWARENESS: 0-5    // Are you tracking exits and logistics?

// Flags
NOTICED_RED_FLAGS: number  // How many did you clock?
TOUCHED_WITHOUT_CONSENT: boolean  // Did they cross this line?
CALLED_FRIEND: boolean    // Did you use the phone-a-friend exit?
USED_CODE_WORD: boolean   // Did you use the bartender escape?
CONFRONTED_DIRECTLY: boolean  // Did you call out the behavior?
LEFT_SAFELY: boolean      // Did you get out?
```

---

## STRUCTURE OVERVIEW

### PART 1: THE ARRIVAL (Scenes 1-5)
- First impression (they're already there, watching)
- Small red flags (interrupting, intensity, dismissiveness)
- The first boundary test (touching, insistence)

### PART 2: THE ESCALATION (Scenes 6-12)
- Bigger red flags (comments about your body, controlling behavior)
- The realization this is wrong
- Weighing exit options (they drove, you're far from home)

### PART 3: THE EXIT (Scenes 13-20)
- Executing your exit strategy
- Their reaction (charm, guilt, or anger)
- Getting out safely

---

## DETAILED SCENE BREAKDOWN

### PART 1: THE ARRIVAL

---

#### SCENE 1: ARRIVING
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake (waiting)

**Setup:**
You arrive at the restaurant. Blake is already seated. They see you before you see them. Something about their expression...

**Dialog Flow:**
1. Narration: The restaurant is nice. Your choice - they insisted on "somewhere you'd be comfortable." You spot them at a table in the corner. They're watching the door. They were watching you walk in.
2. Blake stands: "There you are. Wow." Their eyes travel down, then up. Slowly.
3. Blake: "You're even better in person."
4. Inner voice: "They looked you up and down. Like they were appraising something they already own."

**Choices:**

**A) Accept the compliment, sit down**
- Text: "Thanks! Good to finally meet you."
- Effect: Neutral opening
- Feedback: "You're being polite. But file that look away."
- Leads to: Scene 2

**B) Notice but don't address the look**
- Text: Sit down. "Hey, nice to meet you."
- Effect: GUT_TRUST: +1 (you noticed)
- Feedback: "You saw it. You didn't like it. You're already tracking."
- Leads to: Scene 2

**C) Deflect the comment**
- Text: "Ha, yeah. Have you been here before? How's the food?"
- Effect: Neutral
- Feedback: "You redirected. They'll try again."
- Leads to: Scene 2

**D) Address it directly**
- Text: "That's... kind of a lot. Can we start with hello?"
- Effect: BOUNDARY_FIRM: +1, triggers Blake's first reaction
- Feedback: "You set a boundary immediately. Now watch their reaction."
- Leads to: Scene 1B (Blake's Reaction)

---

#### SCENE 1B: BLAKE'S FIRST REACTION
**Type:** Transition Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You set a small boundary. Blake's face flickers.

**Dialog Flow:**
1. Blake: "Whoa, okay. Didn't mean to offend."
2. Blake: "I was just complimenting you. It's a good thing."
3. Narration: They're smiling, but there's something underneath. Annoyance? You're not sure.
4. Blake: "Anyway. Sit, sit. Let's order some drinks."

**Next Scene:** Scene 2

---

#### SCENE 2: THE CONVERSATION PATTERN
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You've been talking for ten minutes. You've noticed a pattern.

**Dialog Flow:**
1. Narration: Every time you start a story, they interrupt. Every time you mention an opinion, they correct it or pivot to themselves.
2. You're saying: "So at my job, we've been working on—"
3. Blake: "Oh yeah, that reminds me of my job. So basically what happened was—"
4. Narration: They've been talking for five minutes straight. You haven't finished a single thought.
5. Inner voice: "They haven't let you complete a sentence."

**Choices:**

**A) Let them keep talking**
- Text: Nod. Smile. Wait for it to end.
- Effect: GUT_TRUST: -1
- Feedback: "You're being polite. They're monopolizing the conversation."
- Leads to: Scene 3

**B) Try to steer back to your topic**
- Text: "That's interesting. So anyway, what I was saying about—"
- Effect: BOUNDARY_FIRM: +1
- Feedback: "You tried to reclaim space. Let's see if they let you."
- Leads to: Scene 2B (Blake interrupts again)

**C) Ask a question about them (strategic)**
- Text: "How long have you been doing that?" (gather intel while seeming engaged)
- Effect: Neutral
- Feedback: "You're keeping them talking while you assess."
- Leads to: Scene 3

**D) Name the pattern**
- Text: "I've noticed you interrupt a lot. Can I finish my thought?"
- Effect: BOUNDARY_FIRM: +2, CONFRONTED_DIRECTLY: true
- Feedback: "Direct. They won't like it."
- Leads to: Scene 2C (Blake gets defensive)

---

#### SCENE 2C: BLAKE GETS DEFENSIVE
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You called out the interrupting. Blake's smile tightens.

**Dialog Flow:**
1. Blake: "I'm just excited to talk to you. Is that a crime?"
2. Blake: "Sorry for being engaged in the conversation."
3. Narration: Their tone has shifted. Sarcasm. Maybe irritation.
4. Blake: "Some people would appreciate someone who's actually interested."
5. Inner voice: "Red flag. They're defensive about basic manners."

**Choices:**

**A) Backpedal to keep the peace**
- Text: "No, I didn't mean— I'm just used to— never mind."
- Effect: BOUNDARY_FIRM: -1
- Feedback: "You retreated. They learned your boundary is negotiable."
- Leads to: Scene 3

**B) Hold firm but de-escalate**
- Text: "I appreciate the energy. Just want to make sure we're both getting to talk."
- Effect: BOUNDARY_FIRM: +1
- Feedback: "You held without escalating."
- Leads to: Scene 3

**C) Note this is a yellow flag**
- Text: Stay neutral. File it away. Keep watching.
- Effect: GUT_TRUST: +1, NOTICED_RED_FLAGS: +1
- Feedback: "You're building a picture."
- Leads to: Scene 3

---

#### SCENE 3: THE FIRST TOUCH
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
Blake reaches across the table and puts their hand on yours. You didn't invite this.

**Dialog Flow:**
1. Blake: (mid-sentence, telling a story) "...and that's when I knew."
2. Narration: Their hand is on yours. Warm. Firm. Uninvited.
3. Blake: "Sorry, I'm a physical person. I can't help it."
4. Inner voice: "You didn't reach for them. They just took."

**Choices:**

**A) Let it happen - don't want to be weird**
- Text: Leave your hand there. Keep listening.
- Effect: GUT_TRUST: -1, TOUCHED_WITHOUT_CONSENT: true
- Feedback: "You're overriding your discomfort to be polite."
- Leads to: Scene 4

**B) Casually move your hand away**
- Text: Reach for your water. Natural movement. Hand removed.
- Effect: GUT_TRUST: +1
- Feedback: "Subtle reclaiming of your space."
- Leads to: Scene 4

**C) Say something**
- Text: "I'd prefer if we didn't do the touching thing yet."
- Effect: BOUNDARY_FIRM: +2, TOUCHED_WITHOUT_CONSENT: true (it happened)
- Feedback: "You named it. Directly."
- Leads to: Scene 3B (Blake's reaction to touch boundary)

**D) Move hand and change topic**
- Text: Pull hand back. "So what do you do for fun outside of work?"
- Effect: GUT_TRUST: +1, BOUNDARY_FIRM: +1
- Feedback: "You removed the touch and redirected."
- Leads to: Scene 4

---

#### SCENE 3B: BLAKE'S REACTION TO TOUCH BOUNDARY
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You asked them not to touch you. Blake's face changes.

**Dialog Flow:**
1. Blake: "Wow. Okay."
2. Blake: "I was just being friendly. It's not like I grabbed you."
3. Narration: They're sitting back now. Arms crossed. Something cold in their eyes.
4. Blake: "Sorry for being attracted to you, I guess."
5. Inner voice: "They made your boundary about THEIR feelings."

**Choices:**

**A) Apologize to smooth it over**
- Text: "No, it's fine, I just— I didn't mean to make it weird."
- Effect: BOUNDARY_FIRM: -2
- Feedback: "TRAP: You're apologizing for having a boundary."
- Leads to: Scene 4

**B) Don't apologize - let the silence sit**
- Text: Just look at them. Don't fill the awkward pause.
- Effect: BOUNDARY_FIRM: +1
- Feedback: "You're not responsible for their reaction to your boundary."
- Leads to: Scene 4

**C) Acknowledge but hold**
- Text: "I just like to take things slow. It's not personal."
- Effect: BOUNDARY_FIRM: +1
- Feedback: "You softened without abandoning the boundary."
- Leads to: Scene 4

**D) Recognize this as a red flag**
- Text: This reaction to a simple boundary. File it.
- Effect: NOTICED_RED_FLAGS: +1, GUT_TRUST: +1
- Feedback: "Someone respectful would have just said 'no problem.' This isn't that."
- Leads to: Scene 4

---

### PART 2: THE ESCALATION

---

#### SCENE 4: THE COMMENT
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
The conversation continues. Blake makes a comment about your appearance that crosses a line.

**Dialog Flow:**
1. Blake: "You know what I like about you?"
2. You: "What?"
3. Blake: "You've got this thing. Like you don't even know how hot you are."
4. Blake: (leaning in) "That body in that outfit. You knew what you were doing when you picked it."
5. Inner voice: "That was not a compliment. That was a claim."

**Choices:**

**A) Laugh it off**
- Text: "Ha, yeah, okay..."
- Effect: GUT_TRUST: -1
- Feedback: "You laughed off something that made you uncomfortable."
- Leads to: Scene 5

**B) Redirect away from your body**
- Text: "Anyway. What's good on the menu here?"
- Effect: GUT_TRUST: +1
- Feedback: "You didn't engage with the comment."
- Leads to: Scene 5

**C) Call it out**
- Text: "I'd rather you didn't comment on my body like that."
- Effect: BOUNDARY_FIRM: +2, CONFRONTED_DIRECTLY: true
- Feedback: "Direct. Clear. Their reaction will tell you everything."
- Leads to: Scene 4B (Blake escalates or backs down)

**D) Note it and start planning your exit**
- Text: "Okay." (start thinking about how to leave)
- Effect: GUT_TRUST: +2, SAFETY_AWARENESS: +1
- Feedback: "You're done. Now you're planning."
- Leads to: Scene 6 (Exit Planning)

---

#### SCENE 5: THE LOGISTICS TRAP
**Type:** Transition Scene
**Background:** restaurant
**Characters:** You (internal)

**Setup:**
You realize you want to leave. Then you remember the logistics.

**Dialog Flow:**
1. Narration: You want out. The feeling is clear now.
2. Narration: But: they drove. The restaurant was their choice - thirty minutes from your place. Your phone is almost dead.
3. Narration: If you say you're leaving, you'll need to explain. Get a ride. Maybe wait outside alone.
4. Inner voice: "They chose this place for a reason."

**Next Scene:** Scene 6

---

#### SCENE 6: EXIT PLANNING
**Type:** Choice Scene
**Background:** restaurant
**Characters:** You (internal), Blake (oblivious)

**Setup:**
Blake is talking. You're not listening. You're planning.

**Dialog Flow:**
1. Narration: Blake is telling another story. You're nodding automatically.
2. Narration: But your brain is elsewhere. Mapping exits. Weighing options.
3. Inner voice: "Options: Bathroom phone call. Fake emergency. Direct confrontation. Waiting it out."

**Choices:**

**A) Excuse yourself - bathroom phone call**
- Text: "I need to use the restroom. Be right back."
- Effect: CALLED_FRIEND: setup
- Feedback: "Classic move. Call for backup."
- Leads to: Scene 7 (Bathroom Scene)

**B) Try to wait it out until end of meal**
- Text: Endure. Get through dinner. Leave as soon as socially acceptable.
- Effect: GUT_TRUST: -1
- Feedback: "Waiting it out means absorbing more. Is it worth it?"
- Leads to: Scene 8 (Dinner Continues - it gets worse)

**C) Look for the server/bartender**
- Text: Try to catch someone's eye. Maybe they can help.
- Effect: SAFETY_AWARENESS: +1
- Feedback: "Staff can be allies."
- Leads to: Scene 7B (Server Connection)

**D) Prepare for direct exit**
- Text: Take a breath. You're going to say you're leaving.
- Effect: BOUNDARY_FIRM: +2, CONFRONTED_DIRECTLY: true
- Feedback: "No games. No excuses. Just done."
- Leads to: Scene 10 (The Direct Exit)

---

#### SCENE 7: THE BATHROOM CALL
**Type:** Choice Scene
**Background:** apartment (bathroom stand-in)
**Characters:** You, Friend (via phone)

**Setup:**
You're in the bathroom. Phone in hand. Calling your emergency contact.

**Dialog Flow:**
1. Friend answers: "Hey! How's it going?"
2. You: "Not great. I need an exit."
3. Friend: "Oh shit. Where are you?"
4. Inner voice: "Backup secured. Now how do you use it?"

**Choices:**

**A) Fake emergency**
- Text: "Call me back in 5 minutes. Sound urgent. I'll act like something's wrong."
- Effect: CALLED_FRIEND: true
- Feedback: "Classic extraction. It works."
- Leads to: Scene 9 (The Fake Emergency)

**B) Ask them to pick you up**
- Text: "Can you come get me? I'll send you the location."
- Effect: CALLED_FRIEND: true, SAFETY_AWARENESS: +2
- Feedback: "Real exit. You'll still have to say you're leaving."
- Leads to: Scene 10B (Waiting for Ride)

**C) Just needed to hear a friendly voice**
- Text: "I don't know. Maybe I'm overreacting. They're just... a lot."
- Effect: GUT_TRUST: -1
- Feedback: "Your friend can hear the discomfort. Trust it."
- Leads to: Scene 7C (Friend's Reality Check)

**D) Ask for advice**
- Text: "What do I do? They drove me here. I'm 30 minutes from home."
- Effect: Friend provides strategies
- Feedback: "Your friend has ideas."
- Leads to: Scene 7D (Friend's Tactical Advice)

---

#### SCENE 7C: FRIEND'S REALITY CHECK
**Type:** Choice Scene
**Background:** apartment (bathroom)
**Characters:** Friend (phone)

**Setup:**
Your friend hears the uncertainty in your voice.

**Dialog Flow:**
1. Friend: "You're calling me from the bathroom on a first date. You're not overreacting."
2. Friend: "What did they do?"
3. You explain: the interrupting, the touching, the comment about your body.
4. Friend: "Yeah, you need to leave. What do you need from me?"
5. Inner voice: "They're right. You know they're right."

**Choices:**

**A) Fake emergency plan**
- Text: "Okay. Call me back in 5."
- Effect: CALLED_FRIEND: true
- Feedback: "You're getting out."
- Leads to: Scene 9

**B) Ask them to come get you**
- Text: "Can you come? Please?"
- Effect: CALLED_FRIEND: true, SAFETY_AWARENESS: +2
- Feedback: "Help is on the way."
- Leads to: Scene 10B

**C) Decide to handle it yourself**
- Text: "No, I've got it. I just needed to hear someone say it."
- Effect: GUT_TRUST: +2
- Feedback: "You trusted yourself. Now act on it."
- Leads to: Scene 10

---

#### SCENE 8: DINNER CONTINUES (It Gets Worse)
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You decided to wait it out. It's getting worse.

**Dialog Flow:**
1. Blake: "So I was thinking. After this, we could go back to my place."
2. Blake: "I have wine. Better than this stuff."
3. Narration: Their hand is on your knee under the table now.
4. Blake: "We could... get to know each other better."
5. Inner voice: "Get out. Now."

**Choices:**

**A) Hard no, immediate exit**
- Text: "I'm going to go. This isn't working for me."
- Effect: BOUNDARY_FIRM: +3, CONFRONTED_DIRECTLY: true
- Feedback: "No more politeness. You're done."
- Leads to: Scene 10 (The Direct Exit)

**B) Soft decline, start extracting**
- Text: "I have an early morning. I should probably head out soon."
- Effect: BOUNDARY_FIRM: +1
- Feedback: "Exit signaled. Let's see if they accept it."
- Leads to: Scene 8B (Blake pushes back)

**C) Physically remove their hand**
- Text: Take their hand off your knee. "I didn't say you could touch me."
- Effect: BOUNDARY_FIRM: +3, TOUCHED_WITHOUT_CONSENT: true
- Feedback: "Direct physical boundary. Their reaction will be telling."
- Leads to: Scene 8C (Blake's Reaction)

**D) Use the bathroom excuse now**
- Text: "I need to use the restroom."
- Effect: Escape to make a plan
- Feedback: "You're getting space to think."
- Leads to: Scene 7 (Bathroom Scene)

---

#### SCENE 8B: BLAKE PUSHES BACK
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You said you needed to leave. Blake isn't accepting that.

**Dialog Flow:**
1. Blake: "Come on. The night's just getting started."
2. Blake: "One more drink. I drove all the way out here."
3. Blake: "You're not going to make me drink alone, are you?"
4. Narration: Their hand finds your knee again.
5. Inner voice: "They're not hearing you. They're negotiating."

**Choices:**

**A) Firm no, physically stand up**
- Text: "I'm leaving. Thank you for dinner." Stand up.
- Effect: BOUNDARY_FIRM: +3, LEFT_SAFELY: progress
- Feedback: "You removed yourself from the table. Good."
- Leads to: Scene 11 (Standing Up)

**B) One more attempt to leave politely**
- Text: "I really do need to go. It was nice meeting you."
- Effect: BOUNDARY_FIRM: +1
- Feedback: "Polite. But will they let you?"
- Leads to: Scene 8D (Blake continues pushing)

**C) Call for server**
- Text: "Excuse me, could we get the check please?"
- Effect: Involves third party, SAFETY_AWARENESS: +1
- Feedback: "You're signaling to staff and ending the meal officially."
- Leads to: Scene 11B (Server as Ally)

**D) Text friend under the table**
- Text: Pretend to check phone. Actually text: "HELP"
- Effect: CALLED_FRIEND: true
- Feedback: "Silent SOS."
- Leads to: Scene 9 (Friend calls back)

---

### PART 3: THE EXIT

---

#### SCENE 9: THE FAKE EMERGENCY
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake, Phone (friend calling)

**Setup:**
Your phone rings. Your friend, right on cue.

**Dialog Flow:**
1. You: "Sorry, I have to take this." Answer.
2. Friend (loud enough Blake might hear): "Oh my god, are you okay??"
3. You: "What? What happened?"
4. Friend: "I need you to come RIGHT NOW. It's an emergency."
5. You hang up. "I'm so sorry. I have to go. Friend emergency."

**Choices:**

**A) Leave immediately**
- Text: "I have to go. Right now. I'm so sorry."
- Effect: LEFT_SAFELY: true
- Feedback: "Clean extraction. Well executed."
- Leads to: Scene 12 (The Exit - Getting Home)

**B) Offer to reschedule (lie)**
- Text: "We'll have to do this again. I'm really sorry."
- Effect: LEFT_SAFELY: true but connection left open
- Feedback: "You're out. But you left a door cracked."
- Leads to: Scene 12

**C) Wait for their reaction**
- Text: Watch Blake's face. See if they accept this.
- Effect: Information gathering
- Feedback: "Their reaction tells you everything."
- Leads to: Scene 9B (Blake's Reaction)

---

#### SCENE 9B: BLAKE'S REACTION TO EMERGENCY
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You said you have to leave. Blake reacts.

**Dialog Flow:**
1. Blake: "Seriously? Right now?"
2. Blake: "That's... really convenient timing."
3. Narration: They're not buying it. Or they are and they're pissed anyway.
4. Blake: "Fine. But you're really going to leave me here?"
5. Inner voice: "A normal person would say 'I hope your friend is okay.'"

**Choices:**

**A) Don't engage - just leave**
- Text: "I'm sorry. I have to go." Start walking.
- Effect: LEFT_SAFELY: true, BOUNDARY_FIRM: +2
- Feedback: "You don't owe them an argument."
- Leads to: Scene 12

**B) Notice the red flag in their response**
- Text: "You didn't ask if my friend was okay."
- Effect: CONFRONTED_DIRECTLY: true
- Feedback: "You named it. The mask slips further."
- Leads to: Scene 9C (Blake's mask slips)

**C) Over-apologize to escape**
- Text: "I'm SO sorry, I'll make it up to you, I promise."
- Effect: LEFT_SAFELY: true but BOUNDARY_FIRM: -1
- Feedback: "You're out. But you're apologizing for leaving an uncomfortable situation."
- Leads to: Scene 12

---

#### SCENE 10: THE DIRECT EXIT
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
No fake emergency. No bathroom call. You're just telling them you're leaving.

**Dialog Flow:**
1. You: "I'm going to head out. This isn't working for me."
2. Narration: Blake's face shifts. Surprise. Then something else.
3. Inner voice: "Don't explain. Don't negotiate. Just go."

**Choices:**

**A) Leave it at that - start to stand**
- Text: Stand up. Reach for your jacket.
- Effect: BOUNDARY_FIRM: +3, CONFRONTED_DIRECTLY: true
- Feedback: "Clean. Clear. You don't owe explanations."
- Leads to: Scene 11

**B) Explain why (optional)**
- Text: "The interrupting, the touching, the comments about my body. It's too much."
- Effect: BOUNDARY_FIRM: +2, CONFRONTED_DIRECTLY: true
- Feedback: "You told them. They probably won't hear it. But you said it."
- Leads to: Scene 10C (Blake defends/attacks)

**C) Wait for their response**
- Text: Pause. See what they do.
- Effect: Information gathering
- Feedback: "Their response will confirm everything."
- Leads to: Scene 10B (Blake's reaction)

---

#### SCENE 10B: BLAKE'S REACTION TO DIRECT EXIT
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake

**Setup:**
You said you're leaving. Blake reacts.

**Branch A: Blake tries charm**
- Blake: "Wait, wait. I'm sorry if I came on too strong."
- Blake: "Just stay for one more drink. I'll dial it back."
- Blake: "Give me another chance. Please."

**Branch B: Blake gets angry**
- Blake: "Are you serious right now?"
- Blake: "I drove thirty minutes to meet you and you're leaving after one drink?"
- Blake: "You're unbelievable. You know that?"

**Choices:**

**A) Leave regardless of reaction**
- Text: "I wish you well. Goodbye."
- Effect: LEFT_SAFELY: true, BOUNDARY_FIRM: +3
- Feedback: "You're not negotiating. You're gone."
- Leads to: Scene 12

**B) Respond to the charm attempt**
- Text: "I appreciate that, but I've made my decision."
- Effect: BOUNDARY_FIRM: +2
- Feedback: "You heard them. You're still leaving."
- Leads to: Scene 12

**C) Respond to the anger**
- Text: "Your reaction right now is exactly why I'm leaving."
- Effect: BOUNDARY_FIRM: +3, CONFRONTED_DIRECTLY: true
- Feedback: "You named it. They're proving your point."
- Leads to: Scene 12

---

#### SCENE 11: STANDING UP
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Blake (may follow)

**Setup:**
You're standing. Getting your things. Blake is sitting there.

**Dialog Flow:**
1. Narration: You're up. Jacket in hand. The table feels like a boundary now.
2. Blake: "So that's it?"
3. Narration: Other diners might be looking. You don't care.
4. Inner voice: "Walk to the door. Don't look back."

**Choices:**

**A) Walk to the exit**
- Text: "Goodbye." Walk to the door.
- Effect: LEFT_SAFELY: true
- Feedback: "You're out."
- Leads to: Scene 12

**B) Stop at the server station**
- Text: Stop. Catch a server's eye. "Could you call me a cab?"
- Effect: SAFETY_AWARENESS: +2
- Feedback: "Smart. Safe. Staff can help."
- Leads to: Scene 12B (Server helps)

**C) Check if Blake is following**
- Text: Glance back. Is Blake staying seated or getting up?
- Effect: SAFETY_AWARENESS: +1
- Feedback: "Situational awareness."
- Leads to: Scene 11B (Blake follows or doesn't)

---

#### SCENE 12: THE EXIT
**Type:** Choice Scene
**Background:** restaurant (outside)
**Characters:** You, (potentially Blake following)

**Setup:**
You're outside. The fresh air hits you. Now you need to get home.

**Dialog Flow:**
1. Narration: You're out. The night air is cool. Your heart is pounding.
2. Narration: You pull out your phone. Rideshare. Friend pickup. Something.
3. Inner voice: "You did it. You trusted yourself. You got out."

**Choices (based on earlier setup):**

**A) Friend is coming**
- Text: Friend is already on the way. Wait somewhere safe.
- Effect: LEFT_SAFELY: true
- Feedback: "Backup is coming."
- Leads to: ENDING (varies based on stats)

**B) Call a rideshare**
- Text: Order a car. Wait in a well-lit area.
- Effect: LEFT_SAFELY: true, SAFETY_AWARENESS: +1
- Feedback: "You're handling it."
- Leads to: ENDING

**C) Go back inside to wait**
- Text: Wait in the restaurant lobby. Safer than outside alone.
- Effect: SAFETY_AWARENESS: +1
- Feedback: "Public space. Witnesses. Smart."
- Leads to: ENDING

**D) Start walking**
- Text: Start walking. Put distance between you and this.
- Effect: LEFT_SAFELY: true but SAFETY_AWARENESS: -1
- Feedback: "You want away from here. Just stay aware."
- Leads to: ENDING

---

#### SCENE 13: BLAKE FOLLOWS YOU OUT
**Type:** Choice Scene (optional - only if Blake followed)
**Background:** restaurant (outside)
**Characters:** Blake

**Setup:**
Blake has followed you outside. They're not done.

**Dialog Flow:**
1. Blake: "Okay, wait. Can we talk about this?"
2. Blake: "I drove you here. At least let me drive you home."
3. Narration: They're between you and the street now.
4. Inner voice: "Don't get in that car."

**Choices:**

**A) Refuse the ride firmly**
- Text: "I'm getting my own ride. Thank you."
- Effect: BOUNDARY_FIRM: +2
- Feedback: "Clear. Final."
- Leads to: Scene 13B (Blake persists or accepts)

**B) Go back inside**
- Text: Turn around. Go back into the restaurant. Public space.
- Effect: SAFETY_AWARENESS: +2
- Feedback: "You removed yourself from the isolated space."
- Leads to: ENDING (Safe)

**C) Call out the positioning**
- Text: "You're blocking my exit. Please move."
- Effect: BOUNDARY_FIRM: +2, CONFRONTED_DIRECTLY: true
- Feedback: "You named the threat behavior."
- Leads to: Scene 13C (Blake's response)

**D) Loudly say you're leaving**
- Text: "I AM LEAVING. MY FRIEND IS PICKING ME UP." (loud)
- Effect: Creates witnesses, SAFETY_AWARENESS: +2
- Feedback: "Volume is a tool. Other people are now watching."
- Leads to: ENDING (Blake backs off)

---

## ENDINGS (6 TOTAL)

### GOOD ENDINGS (3)

**1. "Trusted Your Gut"**
- Trigger: GUT_TRUST >= 4, LEFT_SAFELY: true, left early
- Summary: "Twenty minutes. That's all it took. You saw the interrupting, felt the uninvited touch, heard the comment about your body, and you knew. You didn't need more data. You didn't need to 'give them a chance.' Your gut said go, and you went. The fake emergency was clean. The exit was smooth. Later, you'll think about all the times you overrode that feeling. Not tonight. Tonight you listened."

**2. "Direct and Done"**
- Trigger: CONFRONTED_DIRECTLY: true, LEFT_SAFELY: true, BOUNDARY_FIRM >= 4
- Summary: "No fake emergency. No excuses. Just: 'This isn't working for me.' Their face was priceless - they really thought you were going to sit there and take it. You didn't explain. You didn't negotiate. You just left. They can think whatever they want. You know what you saw. You know why you left. And you'd do it again."

**3. "The Support System"**
- Trigger: CALLED_FRIEND: true, LEFT_SAFELY: true
- Summary: "That phone call from the bathroom saved you. Your friend didn't ask questions, didn't judge, just said 'I'm on my way.' By the time you got back to the table, you knew exactly what you were doing. The fake emergency was executed perfectly. Twenty minutes later, you were in their car, driving away from that restaurant, laughing and shaking with relief. That's what friends are for."

### NEUTRAL ENDINGS (2)

**4. "Stayed Too Long"**
- Trigger: LEFT_SAFELY: true but GUT_TRUST <= 2
- Summary: "You made it out. But not before the hand on your knee, the comment about going back to their place, the feeling of being hunted across a dinner table. You should have left earlier. You knew twenty minutes in. You stayed for ninety. Next time, you'll listen sooner. The discomfort was trying to tell you something. Trust it faster."

**5. "The Awkward Exit"**
- Trigger: LEFT_SAFELY: true, BOUNDARY_FIRM <= 2
- Summary: "You got out, but it wasn't clean. Over-apologizing. Making excuses. Leaving a door open for a 'reschedule' you know you'll never take. Blake will probably text you tomorrow, and you'll have to do this all over again. But for tonight - you're out. That's what matters. Next time, no maybe. Just no."

### BAD ENDINGS (1)

**6. "The Car Ride"**
- Trigger: Accepted ride home with Blake after expressing discomfort
- Summary: "You knew it was wrong. You got in anyway. The drive home was silent except for your pounding heart. They knew where you lived now. When you got out, they said 'I'll text you.' It wasn't a question. For the next two weeks, you'll be checking your locks, screening your calls, wondering if they're outside. Some lessons cost more than others."

---

## TECHNICAL NOTES FOR IMPLEMENTER

### Stat Tracking
```typescript
GUT_TRUST: number          // 0-5
BOUNDARY_FIRM: number      // 0-5
SAFETY_AWARENESS: number   // 0-5
NOTICED_RED_FLAGS: number  // Counter
TOUCHED_WITHOUT_CONSENT: boolean
CALLED_FRIEND: boolean
CONFRONTED_DIRECTLY: boolean
LEFT_SAFELY: boolean
```

### Templates for Unisex
```typescript
templates: {
  blake: ['Blake', 'Jordan', 'Taylor', 'Morgan'],
  friend: ['Friend', 'Alex', 'Sam', 'Jamie'],
}
```

### Background IDs
- restaurant (main scene)
- apartment (bathroom stand-in for phone calls)
- text-screen (if any texting needed)

### Key Pacing Notes
- FAST scenario - player should feel urgency
- Red flags escalate quickly
- Exit should feel earned and cathartic
- Keep scenes short - 2-3 dialog beats max

---

## TEACHING NOTES

This scenario explicitly teaches:

1. **Red flag recognition:**
   - Interrupting / dominating conversation
   - Touching without consent
   - Sexual comments early on
   - Dismissing boundaries
   - Using logistics as control

2. **Exit strategies:**
   - Bathroom phone call
   - Fake emergency
   - Direct exit
   - Involving staff
   - Making noise/creating witnesses

3. **Core message:**
   - Your discomfort is valid
   - You don't owe anyone more chances
   - Politeness is not worth your safety
   - Trust yourself faster

---

## END OF DESIGN DOCUMENT
