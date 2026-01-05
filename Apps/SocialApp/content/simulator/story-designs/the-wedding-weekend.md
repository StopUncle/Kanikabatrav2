# THE WEDDING WEEKEND

## Story Design Document
**Status:** Ready for Implementation
**Difficulty:** Advanced
**Estimated Scenes:** 45-55
**Estimated Playtime:** 20-30 minutes
**Tier:** Premium

---

## LOGLINE

Three days at his best friend's destination wedding. The bride hates you. The ex is a bridesmaid. The alpha friend is testing you. His sister could save you or destroy you. Ethan won't protect you. Survive the weekend or lose everything.

---

## THEME

**Power dynamics in hostile social territory.** This scenario teaches:
- Friend group infiltration (ignoring the alpha, targeting the others)
- Family navigation (the matriarch problem, sibling alliances)
- Ex-partner management (when they're still in the picture)
- Self-respect preservation under social pressure
- Strategic silence vs. confrontation timing

---

## CHARACTERS

### ETHAN (The Boyfriend)
- **Age:** 29
- **Role:** Your boyfriend of 6 months. Conflict-avoidant. Loves you but won't rock the boat.
- **Traits:** passive, people-pleaser, caught between worlds
- **Default Emotion:** neutral
- **Character ID:** `ethan`

**Voice Notes:**
- Never takes a hard stance in conflict
- Uses phrases like "babe, it's not that serious" and "can we talk about this later?"
- Squeezes your hand under tables instead of speaking up
- Gets defensive when you point out his friends' behavior
- Genuinely cares about you but hasn't learned to prioritize you yet

**Sample Dialog:**
```
"Marcus is just being Marcus. He doesn't mean anything by it."
"Babe, please. Not here. Not this weekend."
"I know they can be a lot. But they're my people. They'll warm up."
"Why does everything have to be a thing with you?"
```

---

### SOPHIA (The Bride)
- **Age:** 31
- **Role:** The bride. Queen of this friend group. Sees you as a threat to the established order.
- **Traits:** territorial, strategic, passive-aggressive, socially dominant
- **Default Emotion:** cold
- **Character ID:** `sophia`

**Voice Notes:**
- Never directly attacks - always plausible deniability
- Uses weaponized hospitality ("Oh, you made it")
- Speaks in implications and subtext
- Controls rooms through seating arrangements, introductions, who gets included
- Loved Danielle. Sees you as a downgrade.

**Sample Dialog:**
```
"Oh, you're joining us? Ethan usually keeps his girlfriends closer."
"Danielle, you remember where the extra glasses are, right? You've been here so many times."
"I tried to warn you. This group... we're tight."
"I'm going to be direct. You don't belong here."
```

---

### MARCUS (The Groom / Alpha Friend)
- **Age:** 32
- **Role:** Ethan's best friend. The alpha of the group. His approval is everything.
- **Traits:** dominant, testing, competitive, respects strength
- **Default Emotion:** smirking
- **Character ID:** `marcus`

**Voice Notes:**
- Speaks with casual authority
- Tests people constantly - shots, questions, challenges
- Respects people who push back (not pushovers)
- Makes "jokes" that are actually assessments
- Will acknowledge strength if you earn it

**Sample Dialog:**
```
"Ethan's girl drinks, right?"
"Let's hope this one sticks." (during toast)
"You've got spine. I didn't expect that."
"Ethan's a good guy. He needs someone who can handle... this."
```

---

### DANIELLE (The Ex)
- **Age:** 28
- **Role:** Ethan's ex-girlfriend of 3 years. Bridesmaid. Still beloved by the group.
- **Traits:** charming, graceful, ambiguous intentions, still has feelings
- **Default Emotion:** happy (surface), sad (underneath)
- **Character ID:** `danielle`

**Voice Notes:**
- Genuinely nice on the surface (which makes it harder)
- Uses phrases that subtly mark territory ("Ethan and I used to...")
- May actually be trying to be decent OR may be playing you
- The player should never be 100% sure of her intentions
- Lingers on hugs with Ethan just a beat too long

**Sample Dialog:**
```
"I've heard so much about you! It's so nice to finally meet Ethan's... girlfriend."
"Look, I know this is weird. Me being here, being in the wedding. I don't want it to be weird."
"We're just friends now. I promise."
"He talked about marrying me once. Did he tell you that?"
```

---

### LILY (The Sister)
- **Age:** 24
- **Role:** Ethan's younger sister. Wildcard. Could be your greatest ally or loudest critic.
- **Traits:** observant, honest, messy, loyal to her brother but sees his flaws
- **Default Emotion:** neutral
- **Character ID:** `lily`

**Voice Notes:**
- Speaks directly, no bullshit
- Uses casual language ("that was fucked up", "girl", etc.)
- Texts a lot - side commentary on what's happening
- Has seen Ethan's girlfriends come and go
- Respects women who don't take shit but aren't try-hards

**Sample Dialog:**
```
"Shouldn't you be with my brother?"
"That was bullshit. Marcus is an asshole."
"Sophia hates everyone Ethan dates. It's not personal. Well, it's a little personal."
"You're not what I expected. I thought you'd be another doormat."
```

---

### PRIYA (Best Friend - Texts Only)
- **Age:** 28
- **Role:** Your best friend back home. Voice of reason via text.
- **Traits:** protective, practical, doesn't sugarcoat
- **Default Emotion:** concerned
- **Character ID:** `priya`

**Voice Notes:**
- Only appears in text messages
- Tells you what you need to hear, not what you want
- "Get out of there" type energy
- Grounds you when you're spiraling

**Sample Texts:**
```
"Wait she said WHAT"
"babe that is not normal friend group behavior"
"you do not have to prove anything to these people"
"if he won't defend you there, he won't defend you anywhere"
```

---

### INNER VOICE
- **Character ID:** `inner-voice`
- **Role:** Your gut. Short, punchy observations. Never lectures.

**Voice Notes:**
- 1-2 lines maximum
- Questions work well
- Notices what others miss
- Never uses clinical terms or labels

**Sample Inner Voice:**
```
"That pause before 'girlfriend.' Intentional."
"He squeezed your hand. But he didn't speak."
"Three years together. You're competing with a ghost."
"The whole table saw that. The whole table."
```

---

## STAT TRACKING

```typescript
// Boolean flags
LILY_ALLY: boolean           // Did you win Lily over?
CONFRONTATION_PATH: boolean  // Did you go nuclear at any point?
INTEL_PACKAGE: boolean       // Did you gather key information?

// Scales
SOPHIA_HOSTILITY: 0-5        // How much does Sophia hate you?
MARCUS_RESPECT: -3 to +5     // Does Marcus respect you?
DANIELLE_OPINION: -2 to +2   // Where does Danielle stand?
ETHAN_TENSION: 0-3           // How strained is the relationship?
SELF_RESPECT: 0-2            // Have you been absorbing too many hits?
DRUNK_STATUS: 0-4            // If 4+, automatic bad ending
```

---

## STRUCTURE OVERVIEW

### DAY 1: FRIDAY (Scenes 1-12)
- Arrival at hotel
- Meeting Lily (first impression)
- Welcome drinks (first contact with full group)
- Welcome dinner (the seating trap, toast incident)

### DAY 2: SATURDAY (Scenes 13-25)
- Morning recovery/ally check-in
- The rehearsal (pairing dig, Danielle confrontation optional)
- Rehearsal dinner (slideshow incident, Marcus speech, private Ethan confrontation)

### DAY 3: SUNDAY (Scenes 26-45+)
- Wedding morning (Sophia ultimatum optional, Lily intel)
- The ceremony (the look between Ethan and Danielle)
- The reception (final confrontations, endings)

---

## DETAILED SCENE BREAKDOWN

### DAY 1

---

#### SCENE 1: THE ARRIVAL
**Type:** Choice Scene
**Background:** hotel-lobby
**Characters:** You, Ethan, Lily

**Setup:**
You arrive at the hotel. Ethan is tense - you can feel him bracing for the weekend. At the front desk, his younger sister Lily spots you both. This is your first impression with family.

**Dialog Flow:**
1. Narration: Describe the hotel lobby. Destination wedding energy. Ethan's grip on your hand is tight.
2. Narration: Lily approaches. Describe her - 24, messy ponytail, bridesmaid dress bag over her shoulder, appraising eyes.
3. Ethan: Awkward greeting to his sister.
4. Inner voice: "She's sizing you up. They all will."

**Choices:**

**A) Warm and effusive**
- Text: "You must be Lily! I've heard so much about you."
- Effect: LILY_STATUS: -1
- Feedback: "Too eager. She's seen this performance before."
- Leads to: Scene 2

**B) Casual and cool**
- Text: "Hey. Lily, right? Ethan's mentioned you."
- Effect: LILY_STATUS: 0
- Feedback: "Neutral. Acceptable. She's still watching."
- Leads to: Scene 2

**C) Let Ethan handle it, but hold eye contact with Lily**
- Text: Stay quiet. Confident half-smile. Let him introduce you.
- Effect: LILY_STATUS: +1
- Feedback: "Interesting. You're not desperate to be liked. She notices."
- Leads to: Scene 2

**D) Light joke at Ethan's expense**
- Text: "So you're the one who taught him his terrible taste in music."
- Effect: HIGH RISK - if she laughs, LILY_STATUS: +2. If she doesn't, LILY_STATUS: -2
- Feedback (good): "She laughs. You're funny. You fit."
- Feedback (bad): "Nothing. You swung and missed. Ethan looks uncomfortable."
- Leads to: Scene 2

---

#### SCENE 2: WELCOME DRINKS - ENTRANCE
**Type:** Choice Scene
**Background:** bar
**Characters:** Full cast - Sophia, Marcus, Danielle, other wedding guests

**Setup:**
The hotel bar. Wedding party is already gathered. You see them before they see you - Sophia holding court, Marcus with his arm around her, Danielle laughing at something someone said. They look like a magazine spread. You're the intruder.

**Dialog Flow:**
1. Narration: Describe the scene. The easy intimacy of old friends. The way you're clearly the outsider.
2. Sophia spots you. Cold smile. "Oh, you made it."
3. Marcus: Firm handshake. Holds eye contact a beat too long.
4. Danielle: Warm hug for Ethan that lingers. Then to you with a pause: "So nice to finally meet Ethan's... girlfriend."
5. Inner voice: "That pause before 'girlfriend.' Intentional."

**Choices:**

**A) Stay close to Ethan**
- Text: Keep your hand in his. Let him navigate.
- Effect: MARCUS_RESPECT: -1
- Feedback: "Safe but weak. You look dependent."
- Leads to: Scene 3A (Sophia's Test)

**B) Walk into the women's circle**
- Text: "Sophia, congratulations. The venue is stunning."
- Effect: Begins Scene 3B (The Women's Circle)
- Feedback: "Bold. Walking into hostile territory."
- Leads to: Scene 3B

**C) Find Lily, start a side conversation**
- Text: Drift toward Lily at the edge of the group.
- Effect: Depends on LILY_STATUS from Scene 1
- Feedback (if positive): "Smart. Build an ally before you need one."
- Feedback (if negative): "She's curt. 'Shouldn't you be with my brother?'"
- Leads to: Scene 3C (Lily Conversation) or Scene 3A if rebuffed

**D) Approach Marcus directly**
- Text: "Marcus. The man himself. Ethan says you're the one I need to impress."
- Effect: MARCUS_RESPECT: +1 or -1 depending on delivery
- Feedback: "Power move. He either respects the directness or sees you as trying too hard."
- Leads to: Scene 3D (The Marcus Test)

---

#### SCENE 3A: SOPHIA'S TEST
**Type:** Choice Scene
**Background:** bar
**Characters:** You, Sophia, (Ethan exits)

**Setup:**
Sophia approaches you and Ethan. Sweet smile that doesn't reach her eyes.

**Dialog Flow:**
1. Sophia: "Ethan, Marcus needs you for groomsman stuff. You don't mind if I steal him, do you?"
2. Narration: It's not a question. Ethan looks at you, uncertain.
3. Inner voice: "She's separating you. On purpose."

**Choices:**

**A) Let him go gracefully**
- Text: "Go ahead. I'll be fine."
- Effect: You're alone with Sophia now
- Feedback: "He leaves. Now it's just you and her."
- Leads to: Scene 4 (Sophia's Interrogation)

**B) Touch his arm possessively**
- Text: "I'll come find you in a bit." (hand on his arm)
- Effect: SOPHIA_HOSTILITY: +1
- Feedback: "She clocks the possessiveness. Files it away."
- Leads to: Scene 4

**C) Refuse the separation**
- Text: "Actually, I'd love to see the venue. Mind if I tag along?"
- Effect: SOPHIA_HOSTILITY: +2, but you avoided the solo interrogation
- Feedback: "You just refused her power play. She won't forget that."
- Leads to: Scene 3D (The Marcus Test - you're with the guys now)

---

#### SCENE 3B: THE WOMEN'S CIRCLE
**Type:** Choice Scene
**Background:** bar
**Characters:** You, Sophia, Danielle, other bridesmaids

**Setup:**
You've inserted yourself into their conversation. The temperature drops three degrees.

**Dialog Flow:**
1. Sophia: "Oh, you're joining us? Ethan usually keeps his girlfriends closer."
2. Narration: The word 'girlfriends' - plural - lands like a slap.
3. Danielle: "Sophia, be nice." But she's smiling.
4. Inner voice: "Two against one. Or is it?"

**Choices:**

**A) Laugh it off**
- Text: "I don't need a leash. He knows where to find me."
- Effect: SOPHIA_HOSTILITY: unchanged, MARCUS (overhearing): +1
- Feedback: "Confident but not aggressive. You didn't flinch."
- Leads to: Scene 5 (Danielle's Probe)

**B) Deflect to Danielle**
- Text: "You must be Danielle. Ethan mentioned you were in the wedding party."
- Effect: Neutral - changes subject but acknowledges the ex
- Feedback: "Acknowledging the elephant. Interesting choice."
- Leads to: Scene 5B (Danielle Response Branch)

**C) Match Sophia's energy**
- Text: "And Sophia usually keeps her claws sheathed at her own wedding. Guess we're both making exceptions."
- Effect: SOPHIA_HOSTILITY: +3, MARCUS (overhearing): +2, CONFRONTATION_PATH: true
- Feedback: "Nuclear option. You just made an enemy. But Marcus bark-laughs from across the room."
- Leads to: Scene 6 (Confrontation Path activated)

**D) Retreat**
- Text: "I was actually just looking for the bathroom."
- Effect: SOPHIA_HOSTILITY: +1, MARCUS_RESPECT: -2
- Feedback: "Weak. Everyone notices. Blood in the water."
- Leads to: Scene 3A (you're isolated now)

---

#### SCENE 3D: THE MARCUS TEST
**Type:** Choice Scene
**Background:** bar
**Characters:** You, Marcus, Ethan, groomsmen

**Setup:**
You're with the guys. They're doing shots. Marcus is assessing whether you can hang.

**Dialog Flow:**
1. Marcus: "Ethan's girl drinks, right?"
2. Narration: The other groomsmen are watching. This is a test.
3. Inner voice: "Trap. But which kind?"

**Choices:**

**A) Take the shot without hesitation**
- Text: Take it. Slam the glass down. Don't wince.
- Effect: MARCUS_RESPECT: +1, DRUNK_STATUS: +1
- Feedback: "You're in. For now."
- Leads to: Scene 5D (The Story Test)

**B) Decline with confidence**
- Text: "I pace myself. Someone has to remember tonight."
- Effect: MARCUS_RESPECT: 0 or -1 depending on delivery
- Feedback: "Could read as confident or buzzkill. Depends on your smirk."
- Leads to: Scene 5D

**C) Challenge him back**
- Text: "Only if you can keep up."
- Effect: MARCUS_RESPECT: +2, DRUNK_STATUS tracking begins (multiple shots)
- Feedback: "He grins. You've got balls. But now you're in a drinking contest."
- Leads to: Scene 5E (The Drinking Game) - WARNING: risk of DRUNK_STATUS: 4+

**D) Redirect with a question**
- Text: "What's the story with you and Ethan? How'd you two meet?"
- Effect: INTEL_PACKAGE: progress, MARCUS_RESPECT: 0
- Feedback: "Deflection. But you're gathering intel now."
- Leads to: Scene 5D (with added context)

---

#### SCENE 5: DANIELLE'S PROBE
**Type:** Choice Scene
**Background:** bar
**Characters:** You, Danielle

**Setup:**
Sophia has drifted away. It's just you and Danielle now. She's being... nice? Too nice?

**Dialog Flow:**
1. Danielle: "So how did you and Ethan meet? He's been so secretive about you."
2. Narration: Her smile is warm. Her eyes are searching.
3. Inner voice: "She's fishing. The question is what for."

**Choices:**

**A) Keep it vague**
- Text: "Mutual friends. The usual."
- Effect: DANIELLE_OPINION: 0
- Feedback: "You're not giving her anything. She notices."
- Leads to: Scene 7 (Welcome Dinner)

**B) Be warm and open**
- Text: Share the story genuinely. Make it sound romantic.
- Effect: DANIELLE_OPINION: +1
- Feedback: "She's listening. Hard to tell if she's happy for him or jealous."
- Leads to: Scene 7

**C) Turn it around**
- Text: "What about you? How long were you two together?"
- Effect: DANIELLE_OPINION: -1, but INTEL_PACKAGE: progress
- Feedback: "Direct. She wasn't expecting that."
- Leads to: Scene 5B (Danielle reveals something)

**D) Mark territory subtly**
- Text: "He's been secretive because he wanted to keep me to himself a little longer."
- Effect: DANIELLE_OPINION: -1, but establishes position
- Feedback: "You claimed him. She heard it."
- Leads to: Scene 7

---

#### SCENE 7: THE WELCOME DINNER
**Type:** Transition Scene (setup)
**Background:** restaurant
**Characters:** Full cast, seated

**Setup:**
Private room at an upscale restaurant. Seating chart puts you between a groomsman you don't know and... Danielle. Sophia arranged this.

**Dialog Flow:**
1. Narration: Describe the room, the long table, the name cards. You find yours. See who's next to you.
2. Narration: Ethan is across the table. Too far to touch. Close enough to watch.
3. Narration: You sit. Danielle sits beside you. "Looks like we're neighbors."

---

#### SCENE 8: THE SEATING TRAP
**Type:** Choice Scene
**Background:** restaurant
**Characters:** You, Danielle, (table in background)

**Setup:**
Dinner has begun. Danielle is being charming. The conversation is easy. Then she drops it.

**Dialog Flow:**
1. Danielle: "Ethan and I used to come to places like this all the time."
2. Narration: It lands softly. Casually. Like it means nothing.
3. Inner voice: "Used to."

**Choices:**

**A) Neutral and classy**
- Text: "He has good taste."
- Effect: DANIELLE_OPINION: +1
- Feedback: "Unbothered. She can't get a read on you."
- Leads to: Scene 9

**B) Mark territory**
- Text: "'Used to.'" (let the implication hang)
- Effect: DANIELLE_OPINION: -1
- Feedback: "Pointed. She got the message."
- Leads to: Scene 9

**C) Redirect entirely**
- Text: "So what do you do? Ethan mentioned you're in design?"
- Effect: DANIELLE_OPINION: 0
- Feedback: "You're not playing her game. She can't read you."
- Leads to: Scene 9

**D) Lean in**
- Text: "Tell me about it. I want to know everything."
- Effect: DANIELLE_OPINION: +1, INTEL_PACKAGE: progress
- Feedback: "Unexpected move. She talks. You learn."
- Leads to: Scene 9 (with added intel)

---

#### SCENE 9: THE TOAST INCIDENT
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Full cast, Marcus standing

**Setup:**
Marcus stands to make a toast. He tells a story about Ethan - "the best summer of our lives." It becomes clear that summer was when Ethan and Danielle were together. He toasts to "old friends, new beginnings, and the people who make life worth living." He looks at Sophia. Then Danielle. Not at you.

**Dialog Flow:**
1. Marcus: [Toast as described above]
2. Narration: The table clinks glasses. Ethan squeezes your hand under the table. He doesn't look at you.
3. Narration: The omission was public. Everyone felt it.
4. Inner voice: "The whole table saw that. The whole table."

**Choices:**

**A) Absorb it. Survive the night.**
- Text: Smile. Clink. Swallow it.
- Effect: SELF_RESPECT: -1
- Feedback: "You played along. At what cost?"
- Leads to: Scene 10 (End of Day 1)

**B) Excuse yourself**
- Text: Stand up quietly. "I need some air."
- Effect: Leads to bathroom encounter
- Feedback: "You remove yourself. Dignified, but noticed."
- Leads to: Scene 9B (Bathroom - Lily encounter if LILY_ALLY possible)

**C) After dinner, tell Ethan privately**
- Text: Wait. Pull him aside later. "That hurt."
- Effect: Leads to Scene 9C (Private Ethan confrontation)
- Feedback: "You're addressing it. The question is how he responds."
- Leads to: Scene 9C

**D) Make your own toast**
- Text: Stand. "I'd like to add something."
- Effect: HIGH RISK - CONFRONTATION_PATH possible
- Feedback: "All eyes on you. What do you say?"
- Leads to: Scene 9D (Your Toast - sub-choices)

---

#### SCENE 9B: THE BATHROOM (Lily Encounter)
**Type:** Choice Scene
**Background:** apartment (or generic interior)
**Characters:** You, Lily

**Setup:**
You're in the bathroom. Trying to breathe. The door opens. It's Lily.

**Dialog Flow:**
1. Lily: "That was bullshit."
2. Narration: She's leaning against the counter, arms crossed.
3. Lily: "Marcus is an asshole. And my brother is a coward for not saying anything."
4. Inner voice: "She sees it. Finally, someone sees it."

**Choices:**

**A) Agree openly**
- Text: "Yeah. It was."
- Effect: LILY_ALLY: true
- Feedback: "She nods. You have an ally now."
- Leads to: Scene 10

**B) Defend the group**
- Text: "It's fine. I'm probably overreacting."
- Effect: LILY_ALLY: false
- Feedback: "She looks disappointed. 'If you say so.'"
- Leads to: Scene 10

**C) Deflect**
- Text: "I didn't notice."
- Effect: LILY pushes back
- Feedback: "She doesn't buy it. 'I saw your face.'"
- Leads to: Sub-choice (admit or keep deflecting)

**D) Ask for intel**
- Text: "Is it always like this?"
- Effect: INTEL_PACKAGE: true, LILY_ALLY: possible
- Feedback: "She tells you. Everything."
- Leads to: Scene 10 (with context)

---

#### SCENE 9C: PRIVATE ETHAN CONFRONTATION
**Type:** Choice Scene
**Background:** hotel-lobby (or exterior)
**Characters:** You, Ethan

**Setup:**
After dinner. You've pulled him aside. He already knows why.

**Dialog Flow:**
1. You: "That toast. Marcus didn't even look at me."
2. Ethan: "Babe, that's just Marcus. He didn't mean anything."
3. Inner voice: "He's deflecting. Already."

**Choices:**

**A) Accept his framing**
- Text: "Maybe you're right. I'm probably being sensitive."
- Effect: SELF_RESPECT: -1, ETHAN_TENSION: 0
- Feedback: "Peace preserved. At what cost?"
- Leads to: Scene 10

**B) Push back gently**
- Text: "He meant something. You just don't want to see it."
- Effect: ETHAN_TENSION: +1
- Feedback: "He gets defensive. But he knows you're right."
- Leads to: Scene 10

**C) Ask him to defend you**
- Text: "I need you to say something. Once. Just once."
- Effect: Branches based on his response
- Feedback: "Vulnerable. Honest. Now it's on him."
- Leads to: Scene 9C-2 (Ethan's choice)

**D) Ultimatum**
- Text: "If this is how this weekend goes, I'm leaving."
- Effect: HIGH RISK - possible early exit ending
- Feedback: "All cards on the table."
- Leads to: Scene 9C-3 (Ultimatum branch)

---

[CONTINUED IN PART 2 - Day 2 and Day 3 scenes...]

---

## DAY 2: SATURDAY

---

#### SCENE 13: MORNING STATUS CHECK
**Type:** Transition Scene
**Background:** apartment (hotel room)

**Setup:**
You wake up. The events of last night hang in the air. How you feel depends on what happened.

**Dialog Flow:**
Branch based on stats:
- If LILY_ALLY: Text from Lily inviting you to coffee
- If CONFRONTATION_PATH: Ethan is cold, needs to "talk"
- If SELF_RESPECT = 0: Dark inner monologue

---

#### SCENE 14: LILY COFFEE (if LILY_ALLY)
**Type:** Choice Scene
**Background:** coffee-shop
**Characters:** You, Lily

**Setup:**
Just you and Lily. She's giving you the playbook.

**Dialog Flow:**
1. Lily: "Okay, here's the deal. Sophia hates everyone Ethan dates. It's not personal. Okay, it's a little personal."
2. Lily: "Danielle is actually nice. But she's still in love with him. Obviously."
3. Lily: "Marcus respects strength. Stop trying to be liked. Be interesting."
4. Inner voice: "Finally. Someone speaking plainly."

**Choices:**

**A) Ask about Danielle**
- Text: "How serious were they?"
- Effect: INTEL_PACKAGE: complete
- Feedback: "She tells you everything. Three years. Engagement talks. She broke it off."
- Leads to: Scene 15

**B) Ask about Sophia**
- Text: "Why does Sophia hate me specifically?"
- Effect: Context about Sophia's history
- Feedback: "Lily laughs. 'Because you're a threat. You're actually pretty. And you're not kissing her ass.'"
- Leads to: Scene 15

**C) Ask what you should do**
- Text: "How do I survive this weekend?"
- Effect: LILY gives strategy
- Feedback: "'Stop apologizing. Stop explaining. They can smell weakness.'"
- Leads to: Scene 15

**D) Thank her and ask nothing**
- Text: "I appreciate you telling me this."
- Effect: LILY_ALLY: solidified
- Feedback: "She nods. 'I've got your back. Don't make me regret it.'"
- Leads to: Scene 15

---

#### SCENE 15: THE REHEARSAL
**Type:** Transition Scene
**Background:** park (or wedding venue exterior)
**Characters:** Full wedding party

**Setup:**
The ceremony venue. Everyone's walking through their positions. The groomsmen pair with bridesmaids for the processional.

---

#### SCENE 16: THE PAIRING DIG
**Type:** Choice Scene
**Background:** park
**Characters:** Full cast, Sophia speaking

**Setup:**
Sophia makes a comment while arranging the processional.

**Dialog Flow:**
1. Sophia: "Dani and Ethan, you two walk together so naturally. Almost muscle memory, right?"
2. Narration: Everyone laughs. Except you.
3. Danielle looks uncomfortable. Or does she?
4. Inner voice: "She did that on purpose. In front of everyone."

**Choices:**

**A) Laugh along**
- Text: Force a smile. Play along.
- Effect: SELF_RESPECT: -1
- Feedback: "You passed the 'cool girl' test. But you feel sick."
- Leads to: Scene 17

**B) Don't react at all**
- Text: Stone face. Watch.
- Effect: MARCUS_RESPECT: +1
- Feedback: "The room feels the tension. You held it."
- Leads to: Scene 17

**C) Walk away**
- Text: "I need to take a call."
- Effect: Danielle follows you later
- Feedback: "You removed yourself. Danielle noticed."
- Leads to: Scene 16B (Danielle finds you)

**D) Counter-joke**
- Text: "Muscle memory from three years ago? That's a long time. Things atrophy."
- Effect: SOPHIA_HOSTILITY: +2, MARCUS_RESPECT: +2, CONFRONTATION_PATH: true
- Feedback: "Marcus bark-laughs. Sophia is furious. You just implied their relationship is dead."
- Leads to: Scene 17 (but dynamics shifted)

---

#### SCENE 16B: DANIELLE FINDS YOU
**Type:** Choice Scene
**Background:** park
**Characters:** You, Danielle

**Setup:**
Away from the group. Danielle approaches.

**Dialog Flow:**
1. Danielle: "Look, I know this is weird. Me being here, being in the wedding. I don't want it to be weird."
2. Narration: She seems genuine. Or she's very good.
3. Inner voice: "What does she actually want?"

**Choices:**

**A) Clear and confident**
- Text: "It's not weird. You're his past. I'm his present."
- Effect: DANIELLE_OPINION: +1
- Feedback: "She nods. 'Fair enough.' Truce established."
- Leads to: Scene 17

**B) Ask directly**
- Text: "Are you still in love with him?"
- Effect: HIGH STAKES - she either admits it or lies
- Feedback: "Her face flickers. 'I...' She doesn't finish."
- Leads to: Scene 16C (Danielle Admission)

**C) Be cold**
- Text: "I don't trust you."
- Effect: DANIELLE_OPINION: -1, but respect established
- Feedback: "She blinks. 'I haven't given you a reason not to.' You: 'You haven't given me a reason to.'"
- Leads to: Scene 17

**D) Shut it down**
- Text: "Let's not pretend we're going to be friends."
- Effect: DANIELLE exits as active character
- Feedback: "She withdraws. No more games. No more intel either."
- Leads to: Scene 17

---

#### SCENE 20: REHEARSAL DINNER - SLIDESHOW
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Full cast

**Setup:**
Rehearsal dinner. Marcus plays a slideshow of memories. Photos from college, vacations, milestones. Multiple photos of Ethan and Danielle together. Then: a photo of them kissing on New Year's Eve.

**Dialog Flow:**
1. Narration: The photo appears on screen. Ethan and Danielle, midnight, lips locked.
2. Marcus: "Oops, how'd that get in there?" He's not sorry.
3. Narration: The room laughs awkwardly. You're sitting right there.
4. Inner voice: "Breathe."

**Choices:**

**A) Pretend you didn't see it**
- Text: Look at your phone. Act distracted.
- Effect: SELF_RESPECT: -1
- Feedback: "Everyone notices you pretending. Lily texts you: 'That was fucked up. You okay?'"
- Leads to: Scene 21

**B) Excuse yourself**
- Text: Stand up. Walk out quietly.
- Effect: Ethan may or may not follow
- Feedback: "Dignified exit. The question is who follows."
- Leads to: Scene 20B (Hallway - who follows?)

**C) Laugh loudly and roast the photo**
- Text: "God, you look so YOUNG. Was that before skincare, Dani?"
- Effect: DANIELLE_OPINION: -2, MARCUS_RESPECT: +2
- Feedback: "The room laughs WITH you now. You flipped it."
- Leads to: Scene 21

**D) Lock eyes with Marcus**
- Text: Hold his gaze. Don't blink. Raise your glass to him slowly.
- Effect: MARCUS_RESPECT: +1
- Feedback: "He gets the message. You saw what he did. You're not forgetting."
- Leads to: Scene 21

---

#### SCENE 22: MARCUS'S SPEECH
**Type:** Choice Scene
**Background:** restaurant
**Characters:** Full cast, Marcus standing

**Setup:**
Best man speech. Marcus talks about his friendship with Ethan. Then pivots.

**Dialog Flow:**
1. Marcus: "And to Ethan's relationships... he's had some great ones."
2. Narration: He looks at Danielle. Then at you.
3. Marcus: "Let's hope this one sticks."
4. Narration: The room is silent.
5. Inner voice: "He said that. Out loud. In front of everyone."

**Choices:**

**A) Let it pass**
- Text: Don't react. Survive.
- Effect: SELF_RESPECT: -2
- Feedback: "The moment is remembered forever as you being small."
- Leads to: Scene 23

**B) Raise your glass**
- Text: "I intend to." (direct eye contact with Marcus)
- Effect: MARCUS_RESPECT: +2
- Feedback: "The room exhales. You handled it."
- Leads to: Scene 23

**C) Veiled threat**
- Text: "Careful, Marcus. You're about to be married. Wouldn't want bad luck."
- Effect: UNCERTAINTY - what did you mean?
- Feedback: "Marcus blinks. He's not sure what you meant. Good."
- Leads to: Scene 22B (Ethan asks what you meant)

**D) Leave**
- Text: Stand up. Walk out.
- Effect: DRAMATIC EXIT - Ethan follows
- Feedback: "You're done pretending."
- Leads to: Scene 22C (Private Confrontation)

---

#### SCENE 22C: THE PRIVATE CONFRONTATION
**Type:** Choice Scene
**Background:** apartment (hotel exterior or hallway)
**Characters:** You, Ethan

**Setup:**
Outside. Night. Just the two of you.

**Dialog Flow:**
1. Ethan: "What do you want me to do? He's my best friend. It's his wedding weekend."
2. Narration: He's frustrated. Cornered.
3. Inner voice: "Watch what he chooses."

**Choices:**

**A) Ask for defense**
- Text: "I want you to defend me. Once. Just once."
- Effect: Branches based on his response
- Feedback: "Vulnerable. Real. Now it's on him."
- Leads to: Scene 22D (Ethan's Response)

**B) Ask for acknowledgment**
- Text: "I don't need you to fight. I need you to SEE it."
- Effect: Different dynamic - asking for validation, not action
- Feedback: "Harder for him. He can't hide behind 'it wasn't that bad.'"
- Leads to: Scene 22D

**C) Threaten to leave**
- Text: "I'm leaving tomorrow. Before the wedding."
- Effect: ULTIMATUM - he begs or lets you go
- Feedback: "All in."
- Leads to: Scene 22E (Ultimatum Branch)

**D) Ask about Danielle**
- Text: "Tell me about her. Everything. Now."
- Effect: INTEL - he tells you the truth
- Feedback: "He's surprised. But he talks. Three years. She wanted marriage. He wasn't ready. She still texts."
- Leads to: Scene 23 (with full context)

---

## DAY 3: SUNDAY (THE WEDDING)

---

#### SCENE 26: WEDDING MORNING
**Type:** Transition Scene (branching)
**Background:** apartment (hotel room)

**Setup:**
Wedding day. The energy is different. Everything that happened leads to this.

**Branches:**
- If LILY_ALLY: Lily invites you to get ready with her (safe space, intel)
- If CONFRONTATION_PATH: Sophia texts asking to talk
- If SELF_RESPECT = 0: Dark mirror moment

---

#### SCENE 27: SOPHIA'S ULTIMATUM (if CONFRONTATION_PATH or she requests meeting)
**Type:** Choice Scene
**Background:** apartment (private location)
**Characters:** You, Sophia

**Setup:**
Just the two of you. No witnesses. She drops the mask.

**Dialog Flow:**
1. Sophia: "I'm going to be direct. You don't belong here. Not with this group. Not with Ethan."
2. Sophia: "You're a temporary distraction and everyone knows it. Including him."
3. Inner voice: "She's trying to break you. Don't let her."

**Choices:**

**A) Call out her fear**
- Text: "If I was temporary, you wouldn't be threatened."
- Effect: SOPHIA_HOSTILITY: -2 (she respects strength)
- Feedback: "Check. She has no comeback. You leave her shaken."
- Leads to: Scene 28

**B) Ask what she wants**
- Text: "What exactly are you asking me to do?"
- Effect: She reveals her demand (leave quietly)
- Feedback: "She wants you gone. No scene. Clean exit."
- Leads to: Scene 27B (Her Offer)

**C) Psychology bomb**
- Text: "You hate me because I remind you of yourself. You fought for Marcus once. You were the outsider too."
- Effect: She either softens or hardens completely
- Feedback: "Her face changes. You hit something real."
- Leads to: Scene 27C (Sophia softens or walls up)

**D) Walk away silently**
- Text: Turn. Leave. Don't give her a word.
- Effect: Ultimate power move
- Feedback: "She called this meeting. You ended it. She's furious but impotent."
- Leads to: Scene 28

---

#### SCENE 30: THE CEREMONY
**Type:** Choice Scene (subtle)
**Background:** park (ceremony venue)
**Characters:** Full cast, you in audience

**Setup:**
The ceremony. You're seated on the groom's side. Ethan is standing up front. Danielle is across from him. They share a look during the vows.

**Dialog Flow:**
1. Narration: Describe the ceremony. The vows. The emotion in the room.
2. Narration: You see Ethan glance at Danielle during "for better or worse." She glances back.
3. Inner voice: "You saw that. You can't unsee it."

**Choices:**

**A) Let it go**
- Text: Focus on the ceremony. Not on them.
- Effect: Internal - you're choosing to trust
- Feedback: "Maybe it meant nothing. Maybe."
- Leads to: Scene 31

**B) React visibly**
- Text: Your face falls. You can't help it.
- Effect: Lily (if ally) notices, squeezes your hand
- Feedback: "Ethan notices your expression after. Tension for the reception."
- Leads to: Scene 31

**C) Watch Sophia and Marcus instead**
- Text: Study the bride and groom.
- Effect: INTEL - you notice something off between them
- Feedback: "Sophia looks nervous. Marcus looks... bored? Interesting."
- Leads to: Scene 31

**D) Check out mentally**
- Text: Stare past the ceremony. Think.
- Effect: REFLECTION - is this what you want?
- Feedback: "The question forms: Is this your life? This group? These people?"
- Leads to: Scene 31 (with internal stakes raised)

---

#### SCENE 35: THE RECEPTION - FINAL CONFRONTATIONS
**Type:** Multiple branches based on stats

---

##### PATH A: SOPHIA SHOWDOWN (if CONFRONTATION_PATH or SOPHIA_HOSTILITY >= 4)

**Dialog Flow:**
1. Sophia finds you near the dance floor.
2. Sophia: "I tried to warn you. This group... we're tight. We've been through things together you'll never understand. Ethan will always put us first. You'll always be second."

**Choices:**

**A1) "Then why are you so worried about me?"**
- Leads to: ENDING - "The Outsider Who Stayed"

**A2) "Watch me prove you wrong."**
- Leads to: ENDING - "The War Begins"

**A3) "You're right. I'll never be one of you. Good."**
- Leads to: ENDING - "A Different Game"

**A4) Take Ethan and leave**
- Leads to: ENDING - "The Early Exit"

---

##### PATH B: MARCUS RESPECT (if MARCUS_RESPECT >= 3)

**Dialog Flow:**
1. Marcus finds you at the bar.
2. Marcus: "You've got spine. I didn't expect that."
3. Marcus: "Ethan's a good guy. He needs someone who can handle... this." (gestures at the chaos)
4. Marcus: "You might be able to."

**Choices:**

**B1) "I don't need your approval. But thanks."**
- Leads to: ENDING - "Grudging Respect"

**B2) "I'm not here for your group. I'm here for him."**
- Leads to: ENDING - "The Clean Win"

**B3) "Buy me a drink and call it even."**
- Leads to: ENDING - "The Unexpected Alliance"

**B4) "What really happened with Danielle?"**
- Leads to: ENDING - "The Full Picture"

---

##### PATH C: LILY BOND (if LILY_ALLY central)

**Dialog Flow:**
1. Lily finds you on the dance floor.
2. Lily: "You survived."
3. You: "Was there doubt?"
4. Lily: "So much doubt. You have no idea."
5. Lily: "Look, my brother is an idiot. His friends are worse. But you... you're not what I expected. I thought you'd be another doormat. You're not."

**Choices:**

**C1) "I had a good ally."**
- Leads to: ENDING - "The Inside Woman"

**C2) "I almost broke."**
- Leads to: ENDING - "Stronger Than Before"

**C3) "Now I need help with your mother."**
- Leads to: ENDING - "The Campaign Continues"

**C4) "Will you tell Ethan I'm worth it?"**
- Leads to: ENDING - "The Translation"

---

##### PATH D: BROKEN (if SELF_RESPECT <= 0)

**Dialog Flow:**
1. Narration: You're in the bathroom. Alone. Looking at yourself in the mirror.
2. Inner voice (as narration here - NO inner-voice speakerId): "You made it through. But at what cost?"

**Choices:**

**D1) "This isn't worth it. I'm done."**
- Leads to: ENDING - "The Walk Away"

**D2) "I can rebuild."**
- Leads to: ENDING - "The Long Road"

**D3) "He needs to see what he almost lost."**
- Leads to: ENDING - "The Reset"

**D4) Cry. Let it out. (Lily finds you if LILY_ALLY)**
- Leads to: ENDING - "The Survivor"

---

## ENDINGS (12 TOTAL)

### GOOD ENDINGS (4)

**1. "The Clean Win"**
- Trigger: MARCUS_RESPECT >= 3, chose "I'm here for him"
- Summary: "Marcus respects you. Sophia has been neutralized. You didn't win them over - you won despite them. Ethan watched you hold your own, and he's looking at you differently now. This group will never love you. But they can't dismiss you either. And that's enough."

**2. "The Inside Woman"**
- Trigger: LILY_ALLY = true, chose "I had a good ally"
- Summary: "Lily is your foothold in this family. She texts you the next week: 'Thanksgiving is going to be interesting. Mom already hates you. Want help?' You have an ally in hostile territory. That changes everything."

**3. "The Unexpected Alliance"**
- Trigger: MARCUS_RESPECT >= 4, chose "Buy me a drink"
- Summary: "You and Marcus close out the bar. By 2am, he's showing you photos of his first girlfriend, the one before Sophia. 'Don't tell her I told you this,' he says. You won't. But you will remember it. He's not your friend. But he's not your enemy anymore either."

**4. "Stronger Than Before"**
- Trigger: LILY_ALLY = true, SELF_RESPECT >= 1, chose "I almost broke"
- Summary: "You almost didn't make it. The toast. The slideshow. The speech. Each one landed like a body blow. But you're still standing. Lily sees it. 'You're tougher than you look,' she says. You are. You didn't know that before this weekend."

### NEUTRAL ENDINGS (4)

**5. "Grudging Respect"**
- Trigger: MARCUS_RESPECT >= 2, chose "I don't need your approval"
- Summary: "They don't love you. They probably never will. But there's something in the way Marcus nods at you now, the way Sophia doesn't openly attack. It's not acceptance. It's acknowledgment. You exist. You're not going anywhere. They'll have to deal with that."

**6. "The War Begins"**
- Trigger: CONFRONTATION_PATH = true, chose "Watch me prove you wrong"
- Summary: "You survived the wedding. But this isn't over. Sophia made that clear with her last look. 'See you at Christmas,' she said. It wasn't friendly. The battle for Ethan's world has just begun. You'd better be ready."

**7. "The Long Road"**
- Trigger: SELF_RESPECT = 0, chose "I can rebuild"
- Summary: "The drive home is quiet. Ethan knows something is different but he doesn't know what. You took hits this weekend that you shouldn't have taken. The relationship survived, but you're not sure you did. Something needs to change. You're just not sure what yet."

**8. "The Campaign Continues"**
- Trigger: LILY_ALLY = true, chose "Help with your mother"
- Summary: "Lily laughs. 'Oh god. Mom is a whole other war.' But she's game. She likes you. That's new for her - she's never liked one of Ethan's girlfriends before. The wedding was just the first battle. The family is next. You'll need Lily for that."

### BAD ENDINGS (4)

**9. "The Walk Away"**
- Trigger: SELF_RESPECT <= 0, chose "I'm done"
- Summary: "You find Ethan on the dance floor. 'We need to talk.' His face falls - he knows what's coming. 'I can't do this,' you tell him. 'Not the weekend. This. Us. I deserve someone who fights for me.' He doesn't argue. That tells you everything you need to know."

**10. "The Early Exit"**
- Trigger: Left before the wedding (ultimatum path)
- Summary: "You pack your bags Sunday morning. Ethan watches you go. 'I wish you'd stay,' he says. 'I wish you'd given me a reason to,' you reply. The Uber to the airport is the longest ride of your life. But you feel lighter with every mile."

**11. "The Coward"**
- Trigger: Let Sophia's ultimatum scare you into leaving
- Summary: "Sophia wins. You make up an excuse - family emergency, work crisis - and leave before the ceremony. Ethan is confused. You're ashamed. Some battles are worth fighting. You didn't even try."

**12. "The Mess"**
- Trigger: DRUNK_STATUS >= 4
- Summary: "You don't remember the toast. You don't remember the speech. You definitely don't remember what you said to Sophia on the dance floor. But based on everyone's faces at brunch the next morning, it wasn't good. Ethan isn't talking to you. This relationship might not survive the weekend. Neither might your dignity."

---

## TECHNICAL NOTES FOR IMPLEMENTER

### Stat Tracking
- Track all stats in scene-level logic
- Use feedback to reinforce stat changes ("SELF_RESPECT: -1" etc.)
- Final path selection based on stat thresholds at Scene 35

### Inner Voice Rules
- ONLY in choice scenes
- ALWAYS last in dialog array
- Keep to 1-2 punchy lines
- Never clinical language

### Scene Type Reminders
- Choice scenes: must have choices[]
- Transition scenes: must have nextSceneId, NO inner-voice
- Ending scenes: must have isEnding: true

### Templates
```typescript
templates: {
  ethan: ['Ethan', 'Ryan', 'Jake'],
  sophia: ['Sophia', 'Madison', 'Victoria'],
  marcus: ['Marcus', 'Brandon', 'Austin'],
  danielle: ['Danielle', 'Jessica', 'Lauren'],
  lily: ['Lily', 'Emma', 'Chloe'],
  priya: ['Priya', 'Maya', 'Jasmine'],
}
```

### Background IDs Available
- apartment (hotel room)
- bar (welcome drinks)
- restaurant (dinners)
- park (ceremony, outdoor scenes)
- coffee-shop (Lily conversation)
- text-screen (Priya texts)
- phone-call (if needed)

---

## VOICE GUIDE FOR DIALOG

### The Tone
Real people. Not therapy-speak. Not corporate. Not overly clever. People speak in fragments. They interrupt. They trail off. They say "like" and "I mean" and "whatever."

### Bad Dialog:
```
"I'm sensing some passive-aggressive behavior from you, Sophia."
"This is classic triangulation tactics."
"I need to establish boundaries with the alpha of the friend group."
```

### Good Dialog:
```
"Wow. Okay."
"I mean... sure. If that's what you want to call it."
"That's... a lot. I need a minute."
"Cool. Cool cool cool. Great. Love that for us."
```

### Inner Voice - BAD:
```
"This is intermittent reinforcement designed to create trauma bonding."
"DIAGNOSTIC TELL: flat affect indicates emotional dysregulation."
"THE MASK SLIP: narcissistic injury evident in micro-expression."
```

### Inner Voice - GOOD:
```
"She did that on purpose."
"Breathe."
"There it is. The crack in the mask."
"He squeezed your hand. But he didn't speak."
"Three years together. You're competing with a ghost."
```

---

## END OF DESIGN DOCUMENT
