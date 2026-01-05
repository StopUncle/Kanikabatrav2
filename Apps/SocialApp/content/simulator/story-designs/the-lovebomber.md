# THE LOVEBOMBER

## Story Design Document
**Status:** Ready for Implementation
**Difficulty:** Intermediate
**Estimated Scenes:** 25-30
**Estimated Playtime:** 12-15 minutes
**Tier:** Premium

**PLACEMENT: UNISEX - Include in both men's and women's scenario lists**

---

## LOGLINE

Three weeks in and they're already talking about forever. The texts never stop. The gifts keep coming. Your friends say you're lucky. Your gut says something's wrong. Learn to recognize the difference between love and a trap.

---

## THEME

**Intensity is not intimacy.** This scenario teaches:
- Recognizing lovebombing as a manipulation tactic, not romance
- The difference between genuine connection and manufactured intensity
- How to set boundaries early without feeling guilty
- What happens when you pull back from a lovebomber
- Trusting your gut when everyone else says you're "lucky"

---

## THE PSYCHOLOGY

Lovebombing is the opening play of narcissists and manipulators. It creates:
- **Emotional debt** ("After everything I've done for you...")
- **Rapid attachment** (oxytocin flooding from constant contact)
- **Isolation from reality checks** (you're too busy with them to see friends)
- **Baseline for future withdrawal** (once you're hooked, they pull back)

The player needs to learn: **Real love builds slowly. Manufactured intensity is a red flag.**

---

## CHARACTERS

### JORDAN (The Lovebomber)
- **Age:** 28-32
- **Role:** The person you've been dating for 3 weeks. Intense. Overwhelming. "Perfect."
- **Traits:** charming, attentive, possessive (hidden), controlling (hidden), easily wounded
- **Default Emotion:** seductive (the performance), cold (when mask slips)
- **Character ID:** `jordan`

**The Mask:**
- Remembers every detail you've ever mentioned
- Always available, always texting, always thinking of you
- Grand romantic gestures constantly
- Talks about the future as if it's already decided
- Makes you feel like the center of the universe

**Behind the Mask:**
- Can't handle any boundary without taking it personally
- Subtly dismisses your friends and family
- Gets wounded/angry when you're not available
- Uses guilt as a weapon ("I just love you so much")
- The "perfect" behavior is a performance, not a personality

**Voice Notes:**
- Early: overwhelming sweetness, constant affirmations
- When challenged: wounded victim, guilt trips, subtle anger
- When rejected: cold, cutting, the mask fully off

**Sample Dialog (Early):**
```
"I've never felt this way about anyone. You're different."
"I cancelled my plans. I just wanted to see you."
"I know it's only been three weeks but... I think I'm falling for you."
"I got you something. I saw it and thought of you immediately."
```

**Sample Dialog (Challenged):**
```
"I'm just trying to show you how much I care. Why is that a problem?"
"After everything I've done, you can't make time for me?"
"I guess I just love too hard. That's my flaw."
"Fine. I'll back off. I didn't realize I was being 'too much.'" (wounded)
```

**Sample Dialog (Mask Off):**
```
"You're going to regret this."
"No one will ever love you like I do."
"I gave you everything and this is how you treat me?"
"You're just like everyone else."
```

---

### CASEY (Best Friend)
- **Age:** Similar to player
- **Role:** Your best friend who's trying to be supportive but is getting concerned
- **Traits:** loyal, observant, initially excited for you, increasingly worried
- **Default Emotion:** concerned
- **Character ID:** `casey`

**Voice Notes:**
- Starts enthusiastic ("This sounds amazing!")
- Grows concerned as details emerge
- Doesn't want to be the buzzkill but can't stay quiet
- The voice of reason you need to hear

**Sample Dialog:**
```
"Wait, they showed up at your work? That's... a lot."
"When's the last time we hung out? Just us?"
"I'm not saying it's bad, I'm just saying it's fast."
"I looked them up. Did you know about the ex situation?"
"You seem different lately. More anxious. Is everything okay?"
```

---

### INNER VOICE
- **Character ID:** `inner-voice`
- **Role:** Your gut. Getting quieter as Jordan's intensity drowns it out.

**Sample Inner Voice:**
```
"This is a lot. Is it too much?"
"When did you last have a night to yourself?"
"That wasn't a gift. That was a test."
"Your phone anxiety is new. That's not nothing."
"Trust yourself. You know something's off."
```

---

## STAT TRACKING

```typescript
// Core stats
BOUNDARY_STRENGTH: 0-5      // Have you held your boundaries?
JORDAN_ATTACHMENT: 0-5      // How hooked are you?
GUT_TRUST: 0-5              // Are you listening to yourself?
ISOLATION_LEVEL: 0-3        // How cut off from friends are you?

// Flags
CASEY_WARNING: boolean      // Did Casey express concern?
SAW_MASK_SLIP: boolean      // Did you witness Jordan's real face?
ACCEPTED_KEY: boolean       // Did you take the apartment key?
MET_THE_EX: boolean         // Did you learn about the ex situation?
```

---

## STRUCTURE OVERVIEW

### WEEK 3 - PART 1: THE HONEYMOON (Scenes 1-8)
- The constant texts (flattering but overwhelming)
- The surprise at work (romantic or boundary violation?)
- The "I cancelled my plans for you" moment
- Casey's first hint of concern

### WEEK 3 - PART 2: THE CRACKS (Scenes 9-16)
- Jordan's reaction when you're busy
- The gift that's too much
- Meeting the ex (or hearing about them)
- The first real boundary test

### WEEK 4: THE TRUTH (Scenes 17-25+)
- The mask slips
- Casey's intervention
- The confrontation
- Getting out (or getting pulled deeper)

---

## DETAILED SCENE BREAKDOWN

---

### WEEK 3 - PART 1: THE HONEYMOON

---

#### SCENE 1: THE MORNING TEXT FLOOD
**Type:** Choice Scene
**Background:** text-screen
**Characters:** Jordan (via text)

**Setup:**
You wake up. Before you've even opened your eyes, your phone is buzzing. Jordan. Again. You have 14 unread messages from last night and this morning.

**Dialog Flow:**
1. Narration: Your phone screen lights up. Again. 14 messages from Jordan since midnight.
2. Show message preview: "Good morning beautiful/handsome" / "Thinking about you" / "Can't wait to see you" / "You up?" / "Hope you slept well" / "I had a dream about you"
3. Narration: It's 7:03am. They've been texting since 6.
4. Inner voice: "This is... a lot. Right?"

**Choices:**

**A) Reply warmly to all of them**
- Text: Heart emojis, "Good morning!", match their energy
- Effect: JORDAN_ATTACHMENT: +1, GUT_TRUST: -1
- Feedback: "You're rewarding the behavior. It will continue."
- Leads to: Scene 2

**B) Reply briefly but kindly**
- Text: "Morning! Busy day ahead, talk later?"
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "Neutral. Sets a small boundary without drama."
- Leads to: Scene 2

**C) Don't reply yet - get ready first**
- Text: Put the phone down. Shower. Coffee. Life.
- Effect: BOUNDARY_STRENGTH: +1, leads to Scene 1B (Jordan's reaction)
- Feedback: "You prioritized yourself. Let's see how they handle it."
- Leads to: Scene 1B

**D) Text Casey instead**
- Text: Screenshot and send to Casey: "Is this normal??"
- Effect: CASEY_WARNING: progress, GUT_TRUST: +1
- Feedback: "You're reality-checking. Smart."
- Leads to: Scene 1C (Casey's response)

---

#### SCENE 1B: JORDAN'S REACTION TO SILENCE
**Type:** Transition Scene
**Background:** text-screen
**Characters:** Jordan (via text)

**Setup:**
30 minutes pass. You haven't responded. Your phone buzzes again.

**Dialog Flow:**
1. Jordan text: "Hey, you okay?"
2. Jordan text: "Did I do something wrong?"
3. Jordan text: "I'm getting worried..."
4. Narration: Three messages in 30 minutes because you didn't respond immediately.

**Next Scene:** Scene 2

---

#### SCENE 1C: CASEY'S RESPONSE
**Type:** Choice Scene
**Background:** text-screen
**Characters:** Casey (via text)

**Setup:**
Casey responds to your screenshot.

**Dialog Flow:**
1. Casey: "Okay that's... intense"
2. Casey: "But also kind of sweet??"
3. Casey: "How long have you been dating again?"
4. You tell them: "Three weeks."
5. Casey: "...oh"

**Choices:**

**A) "I know, it's a lot"**
- Effect: GUT_TRUST: +1, CASEY_WARNING: true
- Feedback: "You're acknowledging it."
- Leads to: Scene 2

**B) "It's romantic though right?"**
- Effect: GUT_TRUST: -1
- Feedback: "You're looking for permission to ignore your gut."
- Leads to: Scene 2

**C) "They're just really into me"**
- Effect: JORDAN_ATTACHMENT: +1
- Feedback: "You're reframing the red flag as flattery."
- Leads to: Scene 2

---

#### SCENE 2: THE SURPRISE AT WORK
**Type:** Choice Scene
**Background:** office
**Characters:** Jordan (in person)

**Setup:**
Lunch time. You walk out of your building and Jordan is standing there. With flowers. And lunch from your favorite place. They weren't invited. You didn't tell them where you work.

**Dialog Flow:**
1. Narration: You step outside for lunch. Jordan is standing there. Flowers. Food. Big smile.
2. Jordan: "Surprise! I wanted to see you. I found out where you work from your Instagram."
3. Narration: Your coworkers are watching. Some look impressed. Some look concerned.
4. Inner voice: "You never told them where you work."

**Choices:**

**A) Be thrilled - this is so romantic**
- Text: "Oh my god! This is amazing!"
- Effect: JORDAN_ATTACHMENT: +2, GUT_TRUST: -1
- Feedback: "You've rewarded a boundary violation as romance."
- Leads to: Scene 3

**B) Be pleased but mention the boundary**
- Text: "This is sweet, but... how did you find my office?"
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "You're noticing the red flag while accepting the gesture."
- Leads to: Scene 2B (Jordan's justification)

**C) Be uncomfortable - express it**
- Text: "Jordan, I didn't tell you where I work. This is a lot."
- Effect: BOUNDARY_STRENGTH: +2, SAW_MASK_SLIP: possible
- Feedback: "Direct. Let's see how they handle it."
- Leads to: Scene 2C (Jordan's reaction - first mask slip)

**D) Play it cool, process later**
- Text: Accept lunch, be polite, think about this tonight.
- Effect: Neutral - delays but doesn't address
- Feedback: "You're buying time. But you'll need to deal with this."
- Leads to: Scene 3

---

#### SCENE 2B: JORDAN'S JUSTIFICATION
**Type:** Choice Scene
**Background:** office
**Characters:** Jordan

**Setup:**
You asked how they found your office. They have an answer ready.

**Dialog Flow:**
1. Jordan: "I just wanted to surprise you! Your Instagram had that photo from the coffee cart, I recognized the building."
2. Jordan: "I'm sorry, is this not okay? I thought you'd be happy."
3. Narration: They look hurt. Wounded. Like YOU did something wrong by asking.
4. Inner voice: "Why do you feel guilty for asking a reasonable question?"

**Choices:**

**A) Backpedal - apologize for questioning them**
- Text: "No, no, it's fine! I was just surprised. This is really sweet."
- Effect: BOUNDARY_STRENGTH: -1, JORDAN_ATTACHMENT: +1
- Feedback: "You just apologized for having a boundary."
- Leads to: Scene 3

**B) Hold the line gently**
- Text: "It IS sweet. But next time, maybe just ask? I like knowing when to expect you."
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "Boundary set. Kindly but clearly."
- Leads to: Scene 3

**C) Let it go for now**
- Text: "Let's just eat. The food smells amazing."
- Effect: Neutral
- Feedback: "Deflection. The issue isn't resolved, just postponed."
- Leads to: Scene 3

---

#### SCENE 2C: FIRST MASK SLIP
**Type:** Choice Scene
**Background:** office
**Characters:** Jordan

**Setup:**
You expressed discomfort. Jordan's face changes for just a second.

**Dialog Flow:**
1. Narration: Something flickers across their face. Cold. Gone as fast as it came.
2. Jordan: "Wow. I try to do something nice and this is the reaction I get."
3. Jordan: "I guess I just care too much. That's my problem."
4. Inner voice: "That flash of anger. You saw it."

**Choices:**

**A) Apologize immediately**
- Text: "I'm sorry, I didn't mean—"
- Effect: BOUNDARY_STRENGTH: -2, GUT_TRUST: -1
- Feedback: "You abandoned your boundary the moment they got upset."
- Leads to: Scene 3

**B) Name what you saw**
- Text: "You looked angry for a second there."
- Effect: SAW_MASK_SLIP: true, BOUNDARY_STRENGTH: +2
- Feedback: "You called it out. They'll deny it, but you know what you saw."
- Leads to: Scene 2D (Jordan's denial)

**C) Hold firm without escalating**
- Text: "I appreciate the gesture. I'm just asking for a heads up next time."
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "Steady. You didn't attack and didn't retreat."
- Leads to: Scene 3

**D) Change the subject**
- Text: "Look, let's just have lunch, okay?"
- Effect: Neutral, SAW_MASK_SLIP: true (you noticed even if you didn't address it)
- Feedback: "You're filing it away. You won't forget."
- Leads to: Scene 3

---

#### SCENE 3: THE CANCELLED PLANS
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan (via text, then in person)

**Setup:**
That evening. You had plans with Casey. You mentioned this to Jordan yesterday. They show up at your door anyway.

**Dialog Flow:**
1. Narration: You're getting ready to meet Casey. Your doorbell rings.
2. Jordan at door: "Hey! I know you said you had plans, but I cancelled mine just to see you. I missed you."
3. Narration: They're standing there with wine and takeout. Looking hopeful.
4. Inner voice: "You told them you were busy tonight. They came anyway."

**Choices:**

**A) Cancel on Casey, let Jordan in**
- Text: Text Casey some excuse. Open the door wider.
- Effect: ISOLATION_LEVEL: +1, JORDAN_ATTACHMENT: +1, BOUNDARY_STRENGTH: -1
- Feedback: "You just chose Jordan over your friend. They'll remember that."
- Leads to: Scene 4A (Night with Jordan)

**B) Invite Jordan but keep Casey plans**
- Text: "I have plans with Casey in an hour. But you can hang until then?"
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "Compromise. You're not cancelling your life for them."
- Leads to: Scene 4B (Jordan's reaction to time limit)

**C) Don't let them in**
- Text: "Jordan, I told you I had plans tonight. I'll see you tomorrow, okay?"
- Effect: BOUNDARY_STRENGTH: +2, leads to guilt trip
- Feedback: "Firm boundary. Let's see how they handle it."
- Leads to: Scene 3B (Jordan's guilt trip)

**D) Ask them to leave, but feel guilty**
- Text: "I... I can't tonight. I'm sorry."
- Effect: BOUNDARY_STRENGTH: +1, GUT_TRUST: -1 (you feel bad)
- Feedback: "You held the line. But why do you feel like the bad guy?"
- Leads to: Scene 3B (Jordan's guilt trip)

---

#### SCENE 3B: THE GUILT TRIP
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan

**Setup:**
You said no. Jordan's face crumbles.

**Dialog Flow:**
1. Jordan: "Oh. Okay. No, that's fine."
2. Jordan: "I just... I cancelled everything to see you. But it's fine."
3. Jordan: "I guess I'll just go home alone."
4. Narration: They look devastated. Like you've wounded them deeply.
5. Inner voice: "You didn't ask them to cancel their plans."

**Choices:**

**A) Cave - let them in**
- Text: "Wait, okay, come in. Casey won't mind."
- Effect: BOUNDARY_STRENGTH: -2, JORDAN_ATTACHMENT: +1
- Feedback: "The guilt trip worked. It will work again."
- Leads to: Scene 4A

**B) Hold firm but soften**
- Text: "I'm sorry you cancelled your plans, but I can't change mine. Tomorrow?"
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "You're apologizing for something you didn't cause. But you held the line."
- Leads to: Scene 5

**C) Call out the manipulation**
- Text: "Jordan, I didn't ask you to cancel your plans. You can't show up and guilt me."
- Effect: BOUNDARY_STRENGTH: +2, SAW_MASK_SLIP: true
- Feedback: "Direct. They won't like it. But you needed to say it."
- Leads to: Scene 3C (Jordan's defensive reaction)

**D) Compromise against your will**
- Text: "...Fine. But just for an hour."
- Effect: BOUNDARY_STRENGTH: -1, resentment building
- Feedback: "You caved. And you're already resenting it."
- Leads to: Scene 4B

---

#### SCENE 5: CASEY DINNER
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Casey

**Setup:**
You made it to dinner with Casey. Your phone keeps buzzing. It's Jordan.

**Dialog Flow:**
1. Casey: "Hey! I feel like I haven't seen you in forever."
2. Narration: Your phone buzzes. Jordan. Again.
3. Casey: "You gonna get that?"
4. Narration: Three more buzzes while you're deciding.
5. Inner voice: "You're with your friend. You can respond later."

**Choices:**

**A) Check the phone, respond**
- Text: "Sorry, one sec—" Start texting back.
- Effect: ISOLATION_LEVEL: +1, JORDAN_ATTACHMENT: +1
- Feedback: "You're physically here but mentally with Jordan."
- Leads to: Scene 5B (Casey's disappointment)

**B) Silence the phone**
- Text: Put it face down. "Sorry. You were saying?"
- Effect: BOUNDARY_STRENGTH: +1, GUT_TRUST: +1
- Feedback: "Present. Good."
- Leads to: Scene 6 (Casey conversation)

**C) Show Casey the messages**
- Text: "Look at this. They've been like this all day."
- Effect: CASEY_WARNING: true, GUT_TRUST: +1
- Feedback: "You're getting a reality check."
- Leads to: Scene 6B (Casey's real talk)

**D) Apologize for Jordan's behavior**
- Text: "Sorry, they're just really attached. It's sweet, kind of."
- Effect: JORDAN_ATTACHMENT: +1
- Feedback: "You're defending the red flags to your friend."
- Leads to: Scene 6

---

#### SCENE 6B: CASEY'S REAL TALK
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Casey

**Setup:**
Casey has seen the messages. Their face is concerned.

**Dialog Flow:**
1. Casey: "Okay, can I be honest with you?"
2. Casey: "This is... a lot for three weeks. Like, a LOT."
3. Casey: "When's the last time you had an evening to yourself? Or saw anyone who isn't Jordan?"
4. Inner voice: "When WAS the last time?"

**Choices:**

**A) Defend Jordan**
- Text: "They're just really into me. It's intense but it's nice to feel wanted."
- Effect: GUT_TRUST: -1, CASEY_WARNING: true but dismissed
- Feedback: "Casey tried. You're not ready to hear it."
- Leads to: Scene 7

**B) Admit it's a lot**
- Text: "I know. It's... I don't know. It feels like a lot but also good?"
- Effect: GUT_TRUST: +1
- Feedback: "You're conflicted. That's honest."
- Leads to: Scene 7

**C) Ask for advice**
- Text: "What would you do?"
- Effect: CASEY_WARNING: true, GUT_TRUST: +1
- Feedback: "You're open to input."
- Leads to: Scene 6C (Casey's advice)

**D) Change the subject**
- Text: "I don't want to talk about Jordan all night. What's going on with you?"
- Effect: Neutral
- Feedback: "Deflection. But at least you're not defending the behavior."
- Leads to: Scene 7

---

### WEEK 3 - PART 2: THE CRACKS

---

#### SCENE 8: THE GIFT
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan

**Setup:**
Jordan shows up with a gift. It's expensive. Way too expensive for three weeks. A designer item you mentioned ONCE in passing.

**Dialog Flow:**
1. Jordan: "I got you something. I remembered you said you loved this brand."
2. Narration: It's a [watch/bag/piece of jewelry]. You mentioned the brand once, weeks ago, in passing.
3. Jordan: "I just want you to know how special you are to me."
4. Inner voice: "This costs more than your rent. You've been dating for three weeks."

**Choices:**

**A) Accept with excitement**
- Text: "Oh my god, this is incredible! You didn't have to do this!"
- Effect: JORDAN_ATTACHMENT: +2, BOUNDARY_STRENGTH: -1
- Feedback: "You're now emotionally indebted. That's the point."
- Leads to: Scene 9

**B) Accept with hesitation**
- Text: "This is... wow. This is really expensive. Are you sure?"
- Effect: Neutral - you noticed but accepted
- Feedback: "You're uncomfortable but you took it anyway."
- Leads to: Scene 9

**C) Try to refuse**
- Text: "Jordan, I can't accept this. It's too much."
- Effect: BOUNDARY_STRENGTH: +2
- Feedback: "Let's see if they accept your 'no.'"
- Leads to: Scene 8B (Jordan's reaction to refusal)

**D) Accept but set a boundary**
- Text: "This is beautiful, but please don't spend this much on me. It makes me uncomfortable."
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "You took it but named the discomfort. Okay."
- Leads to: Scene 9

---

#### SCENE 8B: JORDAN WON'T TAKE NO
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan

**Setup:**
You tried to refuse the gift. Jordan won't accept that.

**Dialog Flow:**
1. Jordan: "Don't be ridiculous. I want you to have it."
2. Jordan: "It makes me happy to give you things. Why won't you let me make you happy?"
3. Narration: They're pushing it toward you. Their smile doesn't reach their eyes.
4. Inner voice: "Why does 'no' feel like it's not an option?"

**Choices:**

**A) Take it to end the discomfort**
- Text: "...Okay. Thank you."
- Effect: BOUNDARY_STRENGTH: -1
- Feedback: "You couldn't maintain 'no.' They know that now."
- Leads to: Scene 9

**B) Be firm - no means no**
- Text: "Jordan, I said no. I'm not comfortable. Please take it back."
- Effect: BOUNDARY_STRENGTH: +2, SAW_MASK_SLIP: true
- Feedback: "You held. Their reaction will tell you everything."
- Leads to: Scene 8C (Mask slip - wounded rage)

**C) Compromise - accept conditionally**
- Text: "I'll keep it, but please don't do this again without asking me first."
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "You took it but set a limit. We'll see if they respect it."
- Leads to: Scene 9

---

#### SCENE 10: THE KEY
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan

**Setup:**
Jordan pulls out a key. To their apartment. They want you to have it. After three weeks.

**Dialog Flow:**
1. Jordan: "I want you to have this."
2. Narration: They press a key into your palm. Their apartment key.
3. Jordan: "I want you to feel like you can come over whenever. My home is your home."
4. Inner voice: "Three weeks. They're giving you a key after three weeks."

**Choices:**

**A) Accept - this is a big step!**
- Text: "Wow... this is huge. Thank you."
- Effect: JORDAN_ATTACHMENT: +2, ACCEPTED_KEY: true
- Feedback: "You just accepted a massive escalation as normal."
- Leads to: Scene 11

**B) Accept hesitantly**
- Text: "This is... fast. But okay."
- Effect: JORDAN_ATTACHMENT: +1, ACCEPTED_KEY: true, GUT_TRUST: +1 (you noticed)
- Feedback: "You know it's fast. You took it anyway."
- Leads to: Scene 11

**C) Don't accept**
- Text: "Jordan, this is really sweet, but it's too soon for this."
- Effect: BOUNDARY_STRENGTH: +2
- Feedback: "Clear boundary. Now watch the reaction."
- Leads to: Scene 10B (Jordan's hurt reaction)

**D) Deflect with humor**
- Text: "What if I'm a secret slob? You don't know what you're signing up for."
- Effect: Delays decision
- Feedback: "You avoided the moment. They'll try again."
- Leads to: Scene 11

---

#### SCENE 12: THE EX REVELATION
**Type:** Choice Scene
**Background:** coffee-shop
**Characters:** Jordan, or via Casey's intel

**Two paths depending on earlier choices:**

**PATH A: Jordan mentions the ex**

**Dialog Flow:**
1. Jordan: "My ex was crazy. Like, actually crazy."
2. Jordan: "They couldn't handle how much I loved them. Some people just can't accept love."
3. Jordan: "You're not like that. You appreciate me."
4. Inner voice: "They said their ex was 'crazy.' What does that actually mean?"

**PATH B: Casey did some digging**

**Dialog Flow:**
1. Casey (text): "So I looked up Jordan. Found their ex on Instagram."
2. Casey: "There's a whole highlight called 'healing from narcissistic abuse.' It's about Jordan."
3. Casey: "I'm not saying it's true but... maybe be careful?"
4. Inner voice: "That could be a bitter ex. Or it could be a warning."

**Choices:**

**A) Ask Jordan about it directly**
- Text: "What actually happened with your ex?"
- Effect: MET_THE_EX: true (context), leads to Jordan's spin
- Feedback: "You're investigating. Good."
- Leads to: Scene 12B (Jordan's version)

**B) Dismiss it - exes are always complicated**
- Text: "Exes say all kinds of things. It doesn't mean anything."
- Effect: GUT_TRUST: -1
- Feedback: "You're choosing comfort over information."
- Leads to: Scene 13

**C) Do your own digging**
- Text: Look up the ex yourself. See what they posted.
- Effect: MET_THE_EX: true, GUT_TRUST: +1
- Feedback: "You're getting the other side of the story."
- Leads to: Scene 12C (What you find)

**D) Ask Casey for more info**
- Text: "What else did you find?"
- Effect: CASEY_WARNING: true, MET_THE_EX: true
- Feedback: "Casey has receipts."
- Leads to: Scene 12D (Casey's full report)

---

### WEEK 4: THE TRUTH

---

#### SCENE 15: THE BOUNDARY TEST
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan

**Setup:**
You made plans with Casey. Told Jordan in advance. They're not happy.

**Dialog Flow:**
1. Jordan: "You're seeing Casey again? You just saw them."
2. You: "It's been over a week."
3. Jordan: "It just feels like you'd rather be with them than me."
4. Inner voice: "They're jealous of your best friend."

**Choices:**

**A) Reassure them excessively**
- Text: "Of course not! You're the most important person to me."
- Effect: JORDAN_ATTACHMENT: +1, ISOLATION_LEVEL: +1
- Feedback: "You're prioritizing their feelings over your friendships."
- Leads to: Scene 16

**B) Hold the line calmly**
- Text: "Casey is my best friend. I'm allowed to have friends."
- Effect: BOUNDARY_STRENGTH: +2
- Feedback: "Clear. Calm. True."
- Leads to: Scene 15B (Jordan escalates)

**C) Get defensive**
- Text: "Why are you making this a thing? It's just dinner."
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "You're annoyed. You should be."
- Leads to: Scene 15B

**D) Compromise - invite Jordan**
- Text: "Do you want to come?"
- Effect: ISOLATION_LEVEL: +1
- Feedback: "Now Jordan comes to everything. Is that what you want?"
- Leads to: Scene 16

---

#### SCENE 15B: JORDAN ESCALATES
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan

**Setup:**
You held your boundary. Jordan doesn't accept it.

**Dialog Flow:**
1. Jordan: "Fine. Go. Have fun with Casey."
2. Jordan: "I'll just be here. Alone. Thinking about you."
3. Narration: Their voice is cold. This isn't hurt. This is punishment.
4. Inner voice: "This is manipulation. You know what this is."

**Choices:**

**A) Call it out**
- Text: "You're trying to make me feel guilty for having a life."
- Effect: BOUNDARY_STRENGTH: +2, SAW_MASK_SLIP: true
- Feedback: "You named it. Now watch them deny it."
- Leads to: Scene 17 (The Confrontation)

**B) Go anyway without engaging**
- Text: "I'll see you tomorrow." Leave.
- Effect: BOUNDARY_STRENGTH: +2
- Feedback: "You didn't fight. You just left. Power move."
- Leads to: Scene 18 (The Flood of Messages)

**C) Stay and fight**
- Text: "Why are you acting like this?"
- Effect: Leads to argument
- Feedback: "You engaged. That's what they wanted."
- Leads to: Scene 15C (The Argument)

**D) Cave - cancel on Casey**
- Text: "...Maybe I'll just stay in tonight."
- Effect: BOUNDARY_STRENGTH: -2, ISOLATION_LEVEL: +2
- Feedback: "They won. Casey loses. You lose."
- Leads to: Scene 16 (variant - you stayed)

---

#### SCENE 17: THE CONFRONTATION
**Type:** Choice Scene
**Background:** apartment
**Characters:** Jordan

**Setup:**
You've called out the manipulation. The mask is fully off now.

**Dialog Flow:**
1. Jordan: "Manipulation? I'M manipulating YOU?"
2. Jordan: "I'm the one who does everything for you. I've given you everything!"
3. Jordan: "And you call me manipulative because I want to spend time with you?"
4. Narration: Their voice is cold. Their eyes are colder.
5. Inner voice: "There it is. The real them."

**Choices:**

**A) Stand your ground**
- Text: "This isn't love. This is control. And I'm done."
- Effect: BOUNDARY_STRENGTH: +3
- Feedback: "OPTIMAL: Clear, final, true."
- Leads to: Scene 20 (The Exit)

**B) Try to de-escalate**
- Text: "I don't want to fight. Can we talk about this calmly?"
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "You're trying to reason with someone who isn't being reasonable."
- Leads to: Scene 17B (Jordan continues)

**C) DARVO yourself**
- Text: "Maybe I am being unfair. I'm sorry."
- Effect: BOUNDARY_STRENGTH: -2, JORDAN_ATTACHMENT: +1
- Feedback: "You just apologized to your manipulator for catching them."
- Leads to: Scene 19 (Deeper In)

**D) Leave without another word**
- Text: Turn around. Walk out. Don't look back.
- Effect: BOUNDARY_STRENGTH: +2
- Feedback: "You don't owe them a debate."
- Leads to: Scene 20 (The Exit)

---

#### SCENE 20: THE EXIT
**Type:** Choice Scene
**Background:** apartment (yours)
**Characters:** You, Casey (via text), Jordan (via text attempts)

**Setup:**
You've left. Or you've ended it. Your phone is exploding.

**Dialog Flow:**
1. Narration: You're home. Or at Casey's. Somewhere safe. Your phone won't stop.
2. Jordan texts: "I'm sorry" / "Please let me explain" / "You're making a mistake" / "No one will love you like I do" / "Fine. You're just like everyone else."
3. Narration: The cycle. Love. Guilt. Anger. Threat. In that order.
4. Inner voice: "Block. Breathe. You did the right thing."

**Choices:**

**A) Block immediately**
- Text: Block their number. Block on all platforms. Done.
- Effect: BOUNDARY_STRENGTH: +3
- Feedback: "Clean. Final. Healthy."
- Leads to: ENDING - "The Clean Break"

**B) Respond one last time**
- Text: "Please don't contact me again."
- Effect: BOUNDARY_STRENGTH: +1
- Feedback: "You gave them a response. They'll use it as an opening."
- Leads to: Scene 21 (The Hoover)

**C) Read but don't respond**
- Text: Watch the messages come in. Don't reply.
- Effect: Neutral
- Feedback: "You're still engaged. But you're not responding. It's something."
- Leads to: Scene 21

**D) Start doubting yourself**
- Text: "Maybe I overreacted..."
- Effect: BOUNDARY_STRENGTH: -1, GUT_TRUST: -1
- Feedback: "The doubt creeps in. Don't let it."
- Leads to: Scene 21 (vulnerable to hoover)

---

## ENDINGS (8 TOTAL)

### GOOD ENDINGS (3)

**1. "The Clean Break"**
- Trigger: BOUNDARY_STRENGTH >= 4, blocked Jordan
- Summary: "You saw the signs. The constant contact. The gifts you didn't ask for. The guilt trips disguised as love. You trusted your gut when everyone else said you were 'lucky.' You weren't lucky - you were targeted. And you got out before the trap closed. The silence feels strange at first. Then it feels like freedom."

**2. "Eyes Wide Open"**
- Trigger: SAW_MASK_SLIP: true, GUT_TRUST >= 3, ended relationship
- Summary: "You saw behind the mask. That flash of cold when you said no. The anger beneath the adoration. Most people don't see it until it's too late. You saw it in week three. You trusted what you saw, even when they told you it wasn't real. Your gut saved you."

**3. "The Support System"**
- Trigger: CASEY_WARNING: true, ISOLATION_LEVEL <= 1, ended relationship
- Summary: "Casey saw it when you couldn't. When you finally listened, they were right there. No 'I told you so' - just support. You learned something important: the people who love you want you to have space to breathe. Anyone who doesn't isn't love. They're a cage."

### NEUTRAL ENDINGS (2)

**4. "The Slow Fade"**
- Trigger: Ended relationship but BOUNDARY_STRENGTH: 2-3
- Summary: "You got out. But it was messy. There were texts you shouldn't have sent, calls you shouldn't have answered. You didn't block them for weeks. They kept trying. You kept almost going back. But you didn't. That's what matters. Next time, you'll recognize it faster."

**5. "The Doubt"**
- Trigger: Ended relationship but GUT_TRUST <= 2
- Summary: "You left, but part of you still wonders if you were wrong. They seemed so loving. So devoted. Was it really manipulation, or were you just scared of being loved? It will take time before you trust your own judgment again. But you made the right call. Even if you don't believe it yet."

### BAD ENDINGS (3)

**6. "The Trap"**
- Trigger: JORDAN_ATTACHMENT >= 4, BOUNDARY_STRENGTH <= 1
- Summary: "Six months later, you barely recognize yourself. You don't see Casey anymore - Jordan didn't like them. You check in constantly - Jordan worries. You apologize for things you didn't do, agree with things you don't believe, shrink yourself smaller every day. The lovebombing stopped months ago. Now there's just control. And you're too deep to see the way out."

**7. "The Cycle"**
- Trigger: Broke up but went back (hoover worked)
- Summary: "You left. They begged. You went back. 'It'll be different this time.' It's not different. It's the same cycle with new apologies. Love. Withdrawal. Guilt. Rage. Love again. You know you should leave. But the good moments feel so good. And the bad moments... you've learned to survive them. This is your life now."

**8. "Isolated"**
- Trigger: ISOLATION_LEVEL >= 3, still in relationship
- Summary: "When did you last talk to Casey? When did you last do anything without Jordan? You can't remember. They're your whole world now - because they've made sure of it. You tell yourself this is love. You have to. The alternative is admitting you've been trapped by someone who never loved you at all. They just wanted to own you."

---

## TECHNICAL NOTES FOR IMPLEMENTER

### Stat Tracking
```typescript
BOUNDARY_STRENGTH: number   // 0-5, key determinant of ending
JORDAN_ATTACHMENT: number   // 0-5, measures how hooked player is
GUT_TRUST: number           // 0-5, are they trusting themselves?
ISOLATION_LEVEL: number     // 0-3, how cut off from support?

CASEY_WARNING: boolean      // Did Casey raise concerns?
SAW_MASK_SLIP: boolean      // Did player witness Jordan's true face?
ACCEPTED_KEY: boolean       // Major escalation marker
MET_THE_EX: boolean         // Has player heard the other side?
```

### Templates for Unisex
```typescript
templates: {
  jordan: ['Jordan', 'Alex', 'Taylor', 'Riley'],  // Gender-neutral names
  casey: ['Casey', 'Morgan', 'Sam', 'Jamie'],      // Gender-neutral names
}
```

### Background IDs
- apartment (player's home, Jordan's home)
- text-screen (message floods)
- office (surprise at work)
- restaurant (Casey dinner)
- coffee-shop (conversations)

### Inner Voice Rules
- ONLY in choice scenes, LAST in dialog array
- Short: 1-2 lines max
- Gut feelings, not analysis
- Questions work well

### Key Pacing Notes
- Week 3 Part 1: The overwhelming "romance" phase
- Week 3 Part 2: Cracks start showing
- Week 4: Full revelation and choice

The progression should feel like slowly waking up from a dream. Early scenes should feel flattering-but-slightly-off. By the end, the player should clearly see the manipulation for what it is.

---

## VOICE GUIDE

### Jordan's Voice Evolution

**Early (lovebombing):**
- Overwhelming positivity
- "You're the most amazing person I've ever met"
- Constant availability signals
- Future-talk way too early

**Middle (cracks):**
- Wounded when boundaries set
- Guilt trips disguised as love
- "I just care too much"
- Starting to criticize friends/family

**Late (mask off):**
- Cold when defied
- "After everything I've done"
- Threats disguised as predictions
- "You'll regret this"

### Inner Voice Examples

**Good:**
```
"This is a lot. Right?"
"Why do you feel guilty for saying no?"
"That wasn't a gift. That was a test."
"When did you last have a night to yourself?"
```

**Bad (too clinical):**
```
"This is textbook lovebombing behavior."
"They're using intermittent reinforcement."
"Classic DARVO pattern detected."
```

---

## END OF DESIGN DOCUMENT
