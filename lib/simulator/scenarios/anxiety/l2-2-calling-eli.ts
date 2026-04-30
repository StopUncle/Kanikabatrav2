/**
 * anxiety-2-2 — "Calling Eli"
 *
 * Anxiety track, Level 2, order 2. The wrong-source-reassurance
 * scenario. Tuesday evening, 8:11 p.m. The Mia text-gap from L2-1
 * resolved at 4 p.m. but the body has a low-grade leftover anxiety
 * that has now attached to a smaller new object — the upcoming
 * family Christmas at Ellen's, three weeks away. Sam reaches for
 * the phone and is about to call Eli.
 *
 * What this scene teaches:
 *   - Reassurance-seeking from the wrong source. Eli loves Sam.
 *     Eli is also dismissal-coded — his coping style is aggressive
 *     non-introspection, the 'just don't think about it' brother.
 *     Each of his typical reassurance moves (dismissal, bright-side,
 *     comparison, the fix) resolves Sam's body for 12-25 minutes,
 *     but at the cost of skipping the actual feeling and adding a
 *     small undigested resentment toward the person who provided
 *     the dismissal Sam invited.
 *   - Routing the anxiety to the right witness. Mia is the right
 *     witness, AND the cleanest way to use her is to ASK for a
 *     witness moment on a calendar instead of dropping the anxiety
 *     on her unannounced. The skill is "schedule the witness." Body
 *     de-escalates through the act of having something on the
 *     calendar.
 *   - Worry-postponement reaches its limits. Three weeks is far
 *     enough away that the body protests harder than at 3 a.m. The
 *     skill is the same; the body has to learn that postponement
 *     scales — three days, three weeks, three months — and the
 *     mechanic is the same.
 *   - The hello-frame call as a substitute for the venting-frame
 *     call. Eli is fine to call ABOUT NOTHING. Eli is bad to call
 *     about anxiety content. The skill is to keep the relationship
 *     alive in shapes that respect what Eli can actually offer.
 *
 * Voice: home-evening register. Slightly sluggish from the day,
 * the body in the leftover-shape from L2-1. Eli's voice is loving
 * and dismissive at the same time, which is the texture this scene
 * teaches the player to recognise.
 *
 * Cast: SAM (player), ELI (on speakerphone), MIA (off-page in
 * texts), INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. At home. Tuesday 8:11 p.m. Body in the leftover-shape from the afternoon's text-gap, now attaching to the family Christmas three weeks away.",
  traits: ["sensitive", "in-treatment", "post-spiral"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const ELI: Character = {
  id: "eli",
  name: "Eli",
  description:
    "33. Sam's older brother. Senior accountant in Connecticut. Married to Lauren, 2-year-old daughter Maeve. Loves Sam. Wrong-relates by reflex — 'just don't think about it' is his lifelong coping strategy and he is offering it as care.",
  traits: ["dismissive-affectionate", "bright-side-coded"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "friend",
  silhouetteType: "male-suit",
};

const MIA: Character = {
  id: "mia",
  name: "Mia",
  description: "30. Sam's partner. Off-page; on her way home, ETA 9:15.",
  traits: ["calm", "grounded"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME — wrong-source reassurance
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Tuesday, 8:11 p.m. You are home. The Mia text-gap resolved at 4 p.m. — she replied with the meeting note, the day proceeded, you came home, you ate the lentil soup. Mia is on her way back from a client call, ETA 9:15.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The afternoon spiral did not fully discharge. The body has a low-grade leftover activation that has, in the absence of a current target, attached to a smaller new object — the family Christmas at Ellen's, three weeks away. The Christmas is going to be hard. Ellen will be Ellen. Eli will be Eli. The cousins. The ham. The four hours during which all of you pretend the divorce was sixteen years ago.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Your phone is in your hand. You are about to call Eli. The reach-for-Eli is the wrong-source-reassurance move. Eli loves you. Eli is also coded for dismissal — his lifelong coping strategy is aggressive non-introspection, and he offers it as care because he genuinely believes it is care. Each of his typical responses (dismissal, bright-side, comparison, the fix) will resolve your body for 12-25 minutes. The cost is paid in a small undigested resentment afterward toward the person whose dismissal you invited.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Five available moves. Two of them complete the wrong-source reach, with different sub-results. Three of them route the anxiety somewhere it can actually be metabolised.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The phone in your hand.",
        tactic: "The scene opens.",
        nextSceneId: "the-reach",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE REACH — Eli's contact, the framing choice
  // ===================================================================
  {
    id: "the-reach",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You are on the couch. Phone in hand. Eli's contact is up. He is in the car — you can tell from the location-share he leaves on for Lauren — driving from a client in Greenwich back home to Stamford. About twenty-two minutes of drive.",
      },
      {
        speakerId: null,
        text: "You have not consciously decided to call. The reach is reflex. The phone is up. The thumb is hovering over the call button.",
      },
      {
        speakerId: null,
        text: "Whatever you decide in the next eight seconds will set the FRAME of this call. The frame is the thing that determines whether this is a venting call (which Eli is bad at receiving and which you will pay for in twenty-five minutes) or a hello call (which Eli is fine at) or no call at all. The body is reaching for venting. The skill is to either notice the reach and redirect, or to do the venting consciously and pay the cost knowing what it is.",
      },
      {
        speakerId: "inner-voice",
        text: "The most common version of this move, in clinical anxiety, is to call the loved one whose voice the body is hungry for, in a frame the loved one cannot actually meet. The body is hungry for Mia. Eli is the available substitute. Substituting Eli for Mia produces 25 minutes of his version of relief and adds the resentment as a tax. Substituting Eli for nothing — calling Eli ABOUT his life — produces a different conversation that does not feed the loop. Substituting Eli for Mia by waiting for Mia is the third option, which is harder because the body protests at having to wait.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "vent-frame-absorb",
        text: "Call Eli. Vent-frame. Tell him about Mom and Christmas. Let his dismissal land and don't push back.",
        tactic: "The most common version. Eli's reflexive 'just don't think about it' will resolve your body for 18 minutes. You will hang up at 8:34 with the resentment as a tax — and the body still has the underlying Christmas activation, which has just been suppressed rather than addressed.",
        nextSceneId: "vent-absorb-1",
        isOptimal: false,
      },
      {
        id: "vent-frame-push",
        text: "Call Eli. Vent-frame. Push back when he dismisses. 'Eli, I'm not overthinking it. I need you to actually hear this.'",
        tactic: "The escalation version. Eli will get defensive — 'I AM hearing it, you're being weird about it.' The call will end with both of you irritated and your body more activated than before. Eli is not the sibling who can rise to a request to be a better listener; that is also not his fault.",
        nextSceneId: "vent-push-1",
        isOptimal: false,
      },
      {
        id: "hello-frame",
        text: "Call Eli. Hello-frame. Ask about Maeve, ask about Lauren's mother who was sick, just talk. Don't bring up Christmas.",
        tactic: "The substitution. Calls Eli about Eli's life. The body that wanted a witness gets the second-best alternative — ordinary brother conversation. The Christmas anxiety stays in your body, but is not metabolised by being thrown at the wrong witness, which means it remains available for the right witness later.",
        nextSceneId: "hello-1",
        isOptimal: true,
      },
      {
        id: "mia-frame",
        text: "Don't call Eli. Text Mia: 'Building up about Christmas. Can we talk about it tonight when you're home?'",
        tactic: "Routing the anxiety to the right witness, on a frame that respects her arrival. Mia replies within two minutes: 'yeah, of course. 9:15.' The body now has a scheduled witness moment. Anxiety not solved yet, but held — something is on the calendar. Body de-escalates through the next hour.",
        nextSceneId: "mia-frame-1",
        isOptimal: true,
      },
      {
        id: "postponement",
        text: "Don't call anyone. Open the notebook. Write: 'Christmas — Ellen — three weeks. Worry-time tomorrow at 5 p.m.'",
        tactic: "Worry-postponement applied to a 3-week-out worry. The body protests harder than at 3 a.m. or 2:47 p.m. — Christmas is far away and the body does not understand why now isn't a good time. The skill is the same. The protest is louder. Holds on the second try.",
        nextSceneId: "postponement-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // VENT-ABSORB PATH (loop-feeder)
  // ===================================================================
  {
    id: "vent-absorb-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["eli"],
    dialog: [
      {
        speakerId: null,
        text: "He picks up on the second ring. Highway noise behind his voice.",
      },
      {
        speakerId: "eli",
        text: "Hey. What's up.",
        emotion: "neutral",
      },
      {
        speakerId: "sam",
        text: "Hey — are you driving? I just wanted to talk for a sec. About Christmas. Mom's. I'm getting in my head about it.",
        emotion: "concerned",
      },
      {
        speakerId: "eli",
        text: "Oh god. Don't. Don't go down that road. It's three weeks. It's a couple of hours. Dad's not even alive anymore so the worst part isn't there. Just show up, eat some ham, leave by 4. You always do this and it's fine every year.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "The dismissal lands. The body, which had been holding low-grade Christmas activation since the afternoon, gets the message that the activation is unjustified. Within ninety seconds the body has dropped two notches. The relief is real — Eli's voice, the steady highway noise, the verdict that you are 'doing this' (where 'this' is the lifelong shape of being the brother who gets in their head).",
      },
      {
        speakerId: "sam",
        text: "Yeah. Yeah, you're right. I just — Mom is going to ask about Mia again, and last year she —",
        emotion: "concerned",
      },
      {
        speakerId: "eli",
        text: "Don't engage. Mom is Mom. She's going to ask. You say 'Mia is great, thanks for asking' and you change the subject. Sam. Listen. You're an adult. You can handle a four-hour holiday lunch. Don't make it bigger than it is.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "The body drops further. The relief now includes the deeper shape Eli is offering — you are an adult, you can handle this, you are bigger than the disorder is making you feel. The shape feels true. The body believes it. The conversation continues for another six minutes. Eli tells you about Maeve learning to say 'no.' You laugh. You hang up at 8:34.",
      },
      {
        speakerId: null,
        text: "By 8:36 the resentment arrives. It is not big. It is small and undigested. He didn't HEAR you. He didn't ask what you were actually scared of. He delivered the verdict, which was the verdict he has been delivering since you were nine years old, and it landed because it always does. The body got its 25 minutes of relief. Tomorrow the Christmas anxiety will be back at the same level it was at 8:11 p.m., except now you cannot call Eli about it again because you already used him today.",
      },
      {
        speakerId: "inner-voice",
        text: "Eli is offering what he has. What he has is dismissal-as-care. Most family members who wrong-relate to anxiety are doing exactly this — offering their own coping strategy as a gift. Eli's coping is non-introspection. He has run his life on it. It works for him. He is not lying when he says it should work for you. He is offering you the only tool he has. The cost on your side is real. The cost on his side is also real, because he leaves the call thinking he did something good, when in fact he provided a 25-minute analgesic that ate the actual signal.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The repair, if you want to make one, is not a fight with Eli about how he listens. The repair is a calibration of WHAT YOU ASK ELI FOR. Hello-frame calls preserve the relationship. Vent-frame calls erode it on both sides. This calibration is the skill — and most people do not learn it until their fourth or fifth wrong-source-reassurance cycle with a wrong-source family member.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-vent-absorb-end",
        text: "End scene.",
        tactic: "The vent-absorb ending.",
        nextSceneId: "ending-vent-absorb",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // VENT-PUSH PATH (loop-feeder, escalates)
  // ===================================================================
  {
    id: "vent-push-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["eli"],
    dialog: [
      {
        speakerId: "eli",
        text: "Hey. What's up.",
        emotion: "neutral",
      },
      {
        speakerId: "sam",
        text: "Hey. Christmas. Mom's. I'm getting in my head about it. I need to actually talk about it, not just be told to not think about it.",
        emotion: "concerned",
      },
      {
        speakerId: "eli",
        text: "Okay. Okay. What do you want me to do.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "His voice has gotten a degree colder. Not hostile. Just slightly steeled. He is preparing for the version of the call where you are about to ask something of him that he is not sure how to provide.",
      },
      {
        speakerId: "sam",
        text: "I just need you to listen. Not fix. Not tell me it's going to be fine. Just hear it.",
        emotion: "concerned",
      },
      {
        speakerId: "eli",
        text: "Sam. I AM listening. Don't tell me I'm not listening. I'm in the car after a ten-hour day. I picked up. I'm here.",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "The defensive note has arrived. The push from your side ('I need you to listen') landed in his nervous system as a critique of his listening. He is not wrong that he picked up. He is not wrong that he is here. He is also not the brother who can hear 'I need you to listen' and not register it as criticism.",
      },
      {
        speakerId: "sam",
        text: "I'm not saying you're not — okay, look, never mind. I'll talk to Mia about it. Forget I called.",
        emotion: "concerned",
      },
      {
        speakerId: "eli",
        text: "Don't do that. Don't shut me down because I asked you to be specific.",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "The call ends at 8:21 with both of you saying 'love you' in the brittle tone people use when they don't mean the love-you, they mean the not-fighting-anymore version of love-you. You hang up. Your body is more activated than it was at 8:11.",
      },
      {
        speakerId: "inner-voice",
        text: "The push-back is a reasonable request. It is also a request Eli's body is not currently equipped to receive. There is a version of this conversation that produces growth between the two of you over time — but it is not a version that happens in one call, with him in his car after a ten-hour day, with you mid-spiral. The skill of choosing WHICH SIBLING gets WHICH REQUEST is its own piece of the work. Eli can grow. The growing happens slowly, in low-stakes moments, not in mid-spiral asks.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-vent-push-end",
        text: "End scene.",
        tactic: "The vent-push ending.",
        nextSceneId: "ending-vent-push",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // HELLO-FRAME PATH (skill)
  // ===================================================================
  {
    id: "hello-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["eli"],
    dialog: [
      {
        speakerId: "eli",
        text: "Hey. What's up.",
        emotion: "neutral",
      },
      {
        speakerId: "sam",
        text: "Hey — just calling to say hi. How was the Greenwich client.",
        emotion: "neutral",
      },
      {
        speakerId: "eli",
        text: "Oh man. Brutal. They're getting audited and they're trying to back-fill three years of receipts in the next four weeks. I'm going to be in their conference room until February. Anyway. How are you.",
        emotion: "neutral",
      },
      {
        speakerId: "sam",
        text: "Tired. Tuesday is Tuesday. Tell me about Maeve. Lauren said she has a new word.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He launches into the story. Maeve has learned to say 'NO' and is using it about everything — the bath, the broccoli, the cat. Lauren is half-amused, half-exhausted. He laughs as he tells it. The highway noise is steady behind him.",
      },
      {
        speakerId: null,
        text: "You let him have the story. You ask follow-up questions. You ask about Lauren's mother, who was sick last month, and Eli says she is mostly recovered but slow. You ask if they need anything. He says no. The conversation continues for fourteen minutes and is, in its texture, indistinguishable from the calls you used to have when you were both in your early twenties and neither of you had figured out yet that you were anxious-coded and dismissive-coded and that neither of you should call the other one mid-spiral.",
      },
      {
        speakerId: null,
        text: "The Christmas anxiety stays in your body throughout. You do not bring it up. You also do not feel relieved of it — it is still there, low-grade, waiting. What HAS happened is that you remembered Eli is a person whose life you are interested in. The hello-frame does not metabolise the anxiety, but it preserves the relationship in a shape that protects both of you from the venting-frame harm.",
      },
      {
        speakerId: null,
        text: "You hang up at 8:25. You text Mia: 'Building up about Christmas. Want to talk about it when you get home.' Mia replies in 90 seconds: 'yeah of course. 9:15. Love you.'",
      },
      {
        speakerId: "inner-voice",
        text: "The hello-frame call is the substitution that most people with anxious-dismissive sibling pairs never figure out. The body that reaches for the brother is reaching for a brother-shaped relational hit, which the brother CAN provide — in the shape of ordinary brother content, not in the shape of anxiety processing. Calling Eli about Maeve is one of the small skills that lets the brother relationship survive your treatment, instead of the relationship eroding under the weight of repeated wrong-source asks.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The Christmas anxiety, which is still in your body, is now correctly routed. Mia is the right witness. 9:15 is the right time. The hour between now and 9:15 is the body's holding-time — the body does not love it, but the calendar holds it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-hello-end",
        text: "End scene.",
        tactic: "The hello-frame ending.",
        nextSceneId: "ending-hello",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // MIA-FRAME PATH (skill)
  // ===================================================================
  {
    id: "mia-frame-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You set the phone down without calling Eli. You open the thread with Mia.",
      },
      {
        speakerId: null,
        text: "YOU: 'Building up about Christmas. Can we talk about it tonight when you're home?'",
      },
      {
        speakerId: null,
        text: "You hit send at 8:13 p.m. Three dots come up within forty seconds.",
      },
      {
        speakerId: "mia",
        text: "yeah of course. 9:15. love you. would tea help while you wait? i'll pick up the chamomile if so",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "The 'would tea help' is the kind of small calibration Mia does without thinking — she is not asking 'what do you need from me,' which is the high-burden form of the offer; she is asking 'is THIS specific thing a thing,' which lets you say yes or no without performing the coordination of your own state.",
      },
      {
        speakerId: "sam",
        text: "yeah tea would. thank you. love you.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You set the phone down. The Christmas anxiety is still in your body, but the body now has something on the calendar — 9:15, Mia, the named topic, the chamomile that is being picked up on the way home. The body does not love the hour between now and 9:15. It is not, however, spiralling the way it would have been at 8:14 if you had instead called Eli.",
      },
      {
        speakerId: null,
        text: "You spend the hour reading. You make rice. You do not Google anything. The body is not soothed but it is held. At 9:14 the front door opens. Mia is carrying a small bag from the bodega — chamomile and something else, you can't tell what. She walks in. She says 'hi.' She sets the bag down. She comes over to the couch and sits next to you and puts her hand on your leg.",
      },
      {
        speakerId: "mia",
        text: "Okay. Tell me.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The scheduled witness is one of the most under-deployed relational anxiety skills, mostly because anxious bodies want their witness IMMEDIATELY and the act of accepting a calendar slot feels like denial of need. The opposite is true. Scheduling the witness routes the anxiety to the right person at the right time — preserving Mia's nervous system from being woken up to a low-grade evening leftover, preserving your body's experience that anxiety can be CONTAINED rather than just discharged, and producing a 9:15 conversation that is calmer and more useful than an 8:13 one would have been.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The 'would tea help' offer is what right-relating looks like in 2026 from a partner who has been doing this work intuitively for two years. It is the question that does not require you to articulate a state. It is the question that gives you a yes/no. Most partners of anxious people, with no training, do not ask this question — they ask the high-burden version, 'what do you need.' Mia stumbled into the calibrated version. She does not know it is calibrated. She just knows it works.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-mia-frame-end",
        text: "End scene.",
        tactic: "The Mia-frame ending.",
        nextSceneId: "ending-mia-frame",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // POSTPONEMENT PATH (skill)
  // ===================================================================
  {
    id: "postponement-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You put the phone down. You walk to the kitchen. You take the notebook from where it lives, on top of the fridge between the cookbooks. You open to today's page.",
      },
      {
        speakerId: null,
        text: "You write: 'Christmas at Ellen's. Three weeks out. Body says: I will collapse there and ruin it. Worry-time tomorrow at 5 p.m.'",
      },
      {
        speakerId: null,
        text: "You close the notebook. You whisper the postponement promise. We will worry about Christmas at 5 p.m. tomorrow.",
      },
      {
        speakerId: null,
        text: "The body protests. The protest is louder than at 3 a.m. or 2:47 p.m. — three weeks is far enough away that the body does not understand why now isn't a good time, and 'too far away' is itself a feature of the protest. 'But it's three WEEKS, what if waiting until tomorrow makes it worse, what if I forget to use worry-time, what if the worry needs more than 20 minutes —'",
      },
      {
        speakerId: "inner-voice",
        text: "The body's protest is the body's standard move. The shape of the protest is 'this worry is special.' The body has not yet learned that worry-postponement scales — three days, three weeks, three months. The mechanic is identical. The skill is to hold the postponement against the protest WITHOUT arguing, and to trust that the worry-time tomorrow will absorb whatever the body still has at 5 p.m.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "First try doesn't fully hold. You pick the notebook back up at 8:18. You re-read the entry. You add: 'Body protesting that 3-weeks-out is too important for postponement. Postponement scales. Hold.'",
      },
      {
        speakerId: null,
        text: "You close the notebook again. You make rice. By the time the rice is done, the body has dropped a notch. The protest is still there but smaller. By the time Mia gets home at 9:15, the body has held the postponement for an hour. You will tell Mia about the postponement, not about the Christmas. The skill is the topic.",
      },
      {
        speakerId: null,
        text: "Tomorrow at 5 p.m. you will sit down with the notebook. You will write under the entry: 'Christmas worry-time. 20 minutes. Concrete fears: 1) Ellen will ask about Mia and I will tense up. 2) Eli will be Eli. 3) Four hours is long. Concrete actions: 1) Tell Mia what to say if Ellen asks something invasive. 2) Plan to leave by 4. 3) Schedule a walk between 2 and 2:30 with Maeve, which gets me out of the house and gives me a kid to talk to.' By 5:20 the worry will be CONCRETE. Concrete worries de-fuse better than abstract ones. The disorder loses one of its most reliable engines, which is operating at the abstraction level.",
      },
      {
        speakerId: "inner-voice",
        text: "Worry-postponement applied to a 3-week-out trigger is the proof-of-concept that the skill scales. Once the body has experienced postponement working on a 3-week timescale, the body has the foundation to use it on 3-month and 6-month timescales. The fortieth entry teaches the body more than the first one. The hundredth makes postponement automatic across all timescales.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-postponement-end",
        text: "End scene.",
        tactic: "The postponement-on-3-weeks-out ending.",
        nextSceneId: "ending-postponement",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-vent-absorb",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Verdict",
    endingLearnPrompt:
      "You called Eli with a venting-frame and absorbed his dismissal. The 25 minutes of relief were real. The resentment that arrived at 8:36 was also real. You can no longer call him about Christmas this week because you have used your call. The Christmas anxiety remains in your body at the same level it was at 8:11, with a small new layer of brother-resentment on top. The skill substitution is one of the three named — hello-frame call (preserves the relationship without paying the cost), Mia-frame text (routes to right witness), or worry-postponement notebook (containment without involving anyone). Eli is not the problem. The frame was. The frame is choosable.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Eli is offering the only tool he has. His coping is non-introspection. He runs his life on it. He is not lying when he gives it to you. He is offering care in the shape he can produce. The skill on your side is not to fight him about that shape; it is to call him about things that match the shape — Maeve, Lauren, his work, the highway he is on. The brother relationship is preservable in years of hello-frame calls. It erodes in years of vent-frame calls. The calibration is yours.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-vent-push",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Pushback",
    endingLearnPrompt:
      "You pushed Eli to listen better mid-spiral, in his car, after his ten-hour day. He defended. The call ended at 8:21 with both of you using the brittle 'love you.' Your body is more activated than it was at 8:11. Eli is, separately, replaying the call on the rest of his drive home and feeling defensive in a way that will leak into his evening with Lauren. You are also separately replaying it. The pushback was not unreasonable. The pushback was just delivered at the wrong time, to the wrong sibling, in the wrong frame. There is a version of this conversation that produces growth between you across time. It does not happen in one mid-spiral call.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Some siblings can absorb the request 'I need you to listen, not fix.' Most siblings cannot — not because they are bad siblings, but because the request itself reads as a critique of their listening. Eli reads it that way. The skill is to know which sibling can grow into which request and at what tempo. Eli can grow. The growing happens in low-stakes moments — a Sunday-morning catch-up call, a holiday dinner, a co-walk during a future visit. Not in his car after Greenwich.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-hello",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Hello",
    endingLearnPrompt:
      "You called Eli about Maeve. The conversation was indistinguishable from the calls you used to have at 22 and worked. The Christmas anxiety stayed in your body — not metabolised, but not thrown at the wrong witness either, which means it remains available for the right witness later. You also remembered Eli is a person whose life you are interested in. The hello-frame is the skill that lets the brother relationship survive your treatment instead of eroding under repeated wrong-source asks. Then you texted Mia and routed the actual anxiety to her, on a scheduled frame, which is the second skill of the evening.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The hello-frame is one of the most under-taught family-relational skills in clinical anxiety, partly because clinical anxiety literature focuses on individual interior work and the family-system literature is a separate field. The integration is: not all loved ones can hold all topics. The skill is matching topic to witness. Some loved ones can hold the work topics. Some can hold the family-of-origin topics. Some can hold ordinary life. Knowing which sibling holds which topic — and respecting the brother whose topic-shape is 'Maeve, my work, the cat, the highway' — is itself a form of love.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-mia-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "9:15",
    endingLearnPrompt:
      "You routed the anxiety to the right witness on a scheduled frame. Mia replied within forty seconds. The chamomile was already on the way. The hour between 8:13 and 9:14 was the body's holding-time — not soothed, but contained. At 9:14 the front door opened. Mia sat down. Said 'okay, tell me.' This is what right-relating with an anxious partner looks like in its sustainable shape. Most anxious bodies want their witness immediately and read the act of scheduling as denial of need. The opposite is true: scheduling preserves Mia's ground, gives the anxiety a real container, and produces a 9:15 conversation that is calmer and more useful than an 8:13 one would have been.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The 'would tea help' offer is the calibrated version of partner-availability that most untrained partners do not produce. Mia, who has been intuitively right-relating for two years, has converged on the question that gives a yes/no without forcing the anxious partner to articulate state. This is the move you will see again in L4-2, in a heavier shape, when she has to choose between providing reassurance and holding a line. Tonight is the easy version of the skill. The next one is the hard version.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-postponement",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Three Weeks Out",
    endingLearnPrompt:
      "You wrote the worry down for a 3-week-out trigger. The body protested harder than at 3 a.m. or 2:47 p.m. — abstraction-level worries protest against postponement more loudly than acute ones, because the body cannot easily believe that something three weeks away can actually wait until 5 p.m. tomorrow. You held it. By 5 p.m. tomorrow the worry-time will produce concrete fears (Ellen, Eli, four hours) and concrete actions (the kid-walk, the leave-by-4 plan, the Mia-script if Ellen asks). Concrete fears de-fuse better than abstract ones. The disorder loses one of its most reliable engines, which is operating at the abstraction level.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Worry-postponement deployed on 3-week timescales is the proof that the skill scales. The body that can postpone a 3-week worry can postpone a 3-month one. The body that can convert a 3-week abstraction into 5-p.m.-tomorrow concrete actions has just learned to do something most CBT clients do not learn until their second year. The notebook on top of the fridge is one of the most under-priced anxiety instruments available — it costs $12 and an evening of practice, and across enough entries it becomes the body's external memory for what worries actually do versus what worries say they will do.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety22: Scenario = {
  id: "anx-2-2",
  title: "Calling Eli",
  tagline: "8:11 p.m. The phone is in your hand. Eli is in his car. Five framings of the call you are about to make.",
  description:
    "The wrong-source-reassurance scenario. Sam at home Tuesday evening with leftover anxiety from the afternoon, now attached to the family Christmas three weeks away. The reach for the older brother Eli — who loves Sam, who is dismissal-coded, whose lifelong coping strategy is non-introspection offered as care. Five framings of the call: vent-and-absorb (loop-feeder, 25 minutes of relief plus undigested resentment); vent-and-push (escalates Eli into defensiveness; both bodies more activated); hello-frame (preserves the brother relationship by calling about Eli's life); Mia-frame text (routes the anxiety to the right witness on a scheduled frame); worry-postponement notebook (containment without involving anyone, 3-week timescale). Five endings.",
  tier: "premium",
  track: "anxiety",
  level: 2,
  order: 2,
  estimatedMinutes: 13,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 380,
  badgeId: "wrong-source",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Wrong-source reassurance recognised — the loved one whose voice the body is hungry for is not always the loved one who can hold the topic",
    "Hello-frame substitution — calling the dismissal-coded sibling about ordinary life preserves the relationship while routing anxiety elsewhere",
    "Scheduled witness — routing anxiety to the right partner on a calendar frame; preserves their ground, contains your body, produces a calmer 9:15 conversation than 8:13 would have been",
    "Worry-postponement scales — 3-week-out triggers postpone on the same mechanic as 3-hour-out ones; abstract worries become concrete by 5 p.m. tomorrow",
    "The 'would tea help' calibrated offer — yes/no questions that don't require state-articulation are what right-relating partners produce; below-conscious-threshold skill",
  ],
  redFlagsTaught: [
    "The vent-and-absorb call — Eli's dismissal lands as relief, costs 25 minutes of underlying anxiety being suppressed plus a brother-resentment tax that compounds across years",
    "The vent-and-push call — pushing the dismissal-coded sibling to listen better mid-spiral reads as critique of their listening; defensive escalation; both bodies more activated than before",
    "Calling the wrong sibling for the wrong topic — Eli is the right call about Maeve; he is the wrong call about anxiety; the calibration is yours",
  ],
  characters: [INNER_VOICE, SAM, ELI, MIA],
  scenes,
};

export default anxiety22;
