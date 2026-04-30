/**
 * anxiety-1-1, "The 3 a.m. Slack"
 *
 * Anxiety track, Level 1, order 1. Cold open of the arc. Player is
 * Sam Ruiz at 3:14 a.m. lying in bed next to a sleeping partner,
 * carrying a context-free Slack message from a senior partner that
 * has been firing the alarm for ten hours.
 *
 * What this scene teaches:
 *   - The body-before-mind sequence. The chest tightens, the breath
 *     goes shallow, the heart-rate climbs, and THEN the cognitive
 *     content arrives. By the time you're trying to "think
 *     differently," the chemistry has been running for an hour.
 *     This is why "just don't worry about it" is the wrong
 *     intervention.
 *   - The catastrophising staircase. Each cognitive step is 30%
 *     longer and 50% more vivid than the previous one. The body
 *     responds to the vividness as if it were evidence.
 *   - Five named available skills at the choice point: cognitive
 *     defusion (ACT), worry postponement (CBT), grounding (5-4-3-
 *     2-1), reassurance-seeking from partner (the loop-feeder), and
 *     reassurance-seeking via phone (the other loop-feeder). Three
 *     of the five extinguish the loop; two reinforce it.
 *   - 3 a.m. cognitive style as a different brain. Cortisol peaks
 *     around 3-4 a.m., prefrontal regulation is reduced under
 *     sleep deprivation, and the absence of distracting stimuli
 *     means the brain has no scaffolding. The body that
 *     catastrophises at 3 a.m. Is not the same body that will
 *     evaluate the same Slack message at 11 a.m. both are real;
 *     the 11 a.m. one is more accurate.
 *
 * Voice: thin narration during the body-in-bed beats; let the
 * sparse text communicate the absence of cognitive scaffolding.
 * Kanika in italic between beats, naming the cognitive distortions
 * as they happen so the player learns the vocabulary in real time.
 *
 * Cast: SAM (player, second-person), MIA (asleep), INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. Senior copywriter at a Brooklyn ad agency. Eight months into CBT for GAD with social-anxiety overlap. The body in bed at 3:14 a.m.",
  traits: ["sensitive", "in-treatment", "self-aware-in-calm"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const MIA: Character = {
  id: "mia",
  name: "Mia",
  description:
    "30. Sam's partner of two years. Asleep next to you. Breathing even. Has a way of saying 'okay' that lands as full-presence.",
  traits: ["calm", "grounded", "loving"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, body-before-mind, 3 a.m. brain
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You are Sam. 28. Brooklyn copywriter. Eight months into CBT with Dr. Lin for what the DSM calls Generalised Anxiety Disorder with Social Anxiety overlap. The diagnosis is real. The work is working. The body is still the body.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "It is 3:14 a.m. Mia is asleep next to you. The body has been awake for ninety minutes. The mind has been running scenarios for at least sixty of those. The cognitive content arrived AFTER the body had already started, the chest, the breath, the heart-rate, all of those came online about forty minutes before the brain produced its first sentence about why.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is the order. Body first. Mind second. Most clinical anxiety education skips this and tells you to 'think differently.' By the time you are trying to think, the chemistry has been running for an hour. The skill is not better thinking. The skill is recognising the chemistry, naming it, and giving the body something to do that is not a loop-feeder.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You will have five available moves in about three minutes. Two of them will feed the loop. Three of them will eventually let you sleep. The 3 a.m. brain will tell you the loop-feeders are the rational moves. The 3 a.m. brain is wrong. The 11 a.m. brain, the one that will read this same Slack message tomorrow morning, is the brain whose verdict is more reliable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The bed.",
        tactic: "The scene opens.",
        nextSceneId: "the-bed",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE BED, the body in it
  // ===================================================================
  {
    id: "the-bed",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "3:14 a.m.",
      },
      {
        speakerId: null,
        text: "The room is the colour of a streetlamp behind a curtain. The radiator is doing the small clicking thing it does. Mia is breathing the steady four-second breath she does when she is in the deep middle of sleep, the breath you have, in calmer moments, found anchoring. Tonight you can hear it but it is not anchoring you.",
      },
      {
        speakerId: null,
        text: "Your chest is tight. Not metaphorically, physically tight, the way it gets after a long run when you have not warmed up. Your breath is shallow. You can feel your heart in your sternum, and the rhythm is fast, maybe 95, maybe 105. You don't know. You haven't checked.",
      },
      {
        speakerId: null,
        text: "Your phone is face-down on the nightstand. The Slack thread is open in the app. You have looked at it eleven times since 5:02 p.m.",
      },
      {
        speakerId: null,
        text: "The message: 'we need to talk about the Henderson copy on Monday'. David Park, Senior Partner, sent at 4:48 p.m. yesterday. No follow-up. No emoji. No period.",
      },
      {
        speakerId: "inner-voice",
        text: "Notice what the body is doing without the mind's permission. This is the somatic profile of clinical anxiety, chest, breath, heart, gut, running before any narrative arrives. The narrative will arrive next. The narrative will feel like cause. It is not the cause. The body started this.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-the-staircase",
        text: "The mind catches up.",
        tactic: "The narrative arrives.",
        nextSceneId: "the-staircase",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE STAIRCASE, catastrophising in real time, named
  // ===================================================================
  {
    id: "the-staircase",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Step one. He wants to talk about the Henderson copy.",
      },
      {
        speakerId: null,
        text: "Step two. He has never used the phrase 'we need to talk' before.",
      },
      {
        speakerId: null,
        text: "Step three. 'We need to talk' is what people say when they are about to deliver bad news. Personal-relationship bad news. He is using the personal-relationship phrasing for a work message. That is significant.",
      },
      {
        speakerId: null,
        text: "Step four. He didn't put a period. He puts periods. He has put periods on every Slack message he has sent in the last seven months. The missing period means he was rushed. He was rushed because he was upset. He was upset because the copy is bad enough to be upset about.",
      },
      {
        speakerId: null,
        text: "Step five. The copy isn't bad. You re-read the copy at 5:14 p.m. yesterday. It is not bad copy. It is good copy. But what if it is not good copy. What if you have been wrong about the copy for the entire campaign. What if you have been wrong about the work for years.",
      },
      {
        speakerId: null,
        text: "Step six. He is going to fire you on Monday.",
      },
      {
        speakerId: null,
        text: "Step seven. He is going to fire you on Monday in front of the team. Which means he has been talking to the team about firing you for weeks. Which means everyone at work knows you are being fired and you are the only one who doesn't know.",
      },
      {
        speakerId: null,
        text: "Step eight. Mia is going to find out. The rent on this apartment is $3,400. You have $4,100 in checking. The freelance pipeline is dry. Mia will pretend it is fine and then resent you slowly across six months until she leaves.",
      },
      {
        speakerId: null,
        text: "Step nine —",
      },
      {
        speakerId: "inner-voice",
        text: "Stop. Notice what the brain just did. Step one was 'we need to talk about the Henderson copy', the actual content of the message, neutral. Step nine was 'Mia leaves you.' Eight cognitive moves got you from a Slack message to an end-of-relationship narrative. Each move was 30% longer and 50% more vivid than the previous one. This is the catastrophising staircase. It is mechanical. It has a name.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Three other distortions ran inside the staircase. Mind-reading: 'he was upset.' Fortune-telling: 'he is going to fire you on Monday.' Probability inflation: weighting an unlikely outcome as if it were certain. None of them are evidence. All of them are the same brain, doing the same trick, on a body that is already tachycardic at 3 a.m. the brain is not the problem. The brain is doing what brains do at 3 a.m. the body is running the chemistry.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Five available moves. Two will feed the loop. Three will eventually let you sleep.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wake-mia",
        text: "Wake Mia. Quietly. 'I'm spinning. Tell me it's going to be okay.'",
        tactic: "Reassurance-seeking from partner. Will work in the next 40 minutes. Mia is good at this in her sleep. Body will calm. The body will also learn that 3 a.m. spirals are solved by waking Mia, which means the next one will arrive sooner and reach louder. Mia's nervous system, over months, will start to wake at 2:50 in anticipation. The cost compounds slowly and it compounds.",
        nextSceneId: "wake-mia-1",
        isOptimal: false,
      },
      {
        id: "phone",
        text: "Reach for the phone. Reread the message. Google 'can a slack message mean firing.' Draft three versions of a Sunday-afternoon proactive message.",
        tactic: "Reassurance-seeking via the device. Will soothe for 12 minutes per cycle. By 5:30 a.m. you have been through four cycles. You have not slept. You have spent 90 minutes drafting messages you will not send and reading Reddit threads from 2017. Same loop-feeder mechanism as A, your body has now learned that 3 a.m. spirals are solved by phone-content. Fastest path to sleeplessness.",
        nextSceneId: "phone-1",
        isOptimal: false,
      },
      {
        id: "defusion",
        text: "Cognitive defusion. Lie still. Name each thought as a thought. 'I am having the thought that David is going to fire me.'",
        tactic: "ACT skill. The thoughts continue to arrive, defusion does not eliminate them. It changes the relationship to them from felt-fact to observed-content. Repeated, the thoughts lose their grip. About 50 minutes of practice. Sleep at approximately 4:08 a.m.",
        nextSceneId: "defusion-1",
        isOptimal: true,
      },
      {
        id: "postponement",
        text: "Worry postponement. Whisper to yourself: we will worry about this at 5 p.m. tomorrow during worry-time. Write it on the notebook on the nightstand.",
        tactic: "CBT skill. The body protests because the body wants to act NOW. The notebook gives the worry an external container. The body's first try doesn't work, the body doesn't believe the postponement promise. Second try works. Sleep at approximately 3:48 a.m.",
        nextSceneId: "postponement-1",
        isOptimal: true,
      },
      {
        id: "grounding",
        text: "Grounding. Get out of bed quietly. Walk to the kitchen. Run the 5-4-3-2-1 sweep, 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
        tactic: "The trauma-and-anxiety standard exteroceptive intervention. Pulls the brain from interoceptive (looking inward at body sensations) to exteroceptive (looking outward at environment). Body calms within 10 minutes. Sleep at approximately 3:55 a.m.",
        nextSceneId: "grounding-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // WAKE MIA PATH (loop-feeder)
  // ===================================================================
  {
    id: "wake-mia-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: null,
        text: "You touch her shoulder. She doesn't startle, she has been woken at 3 a.m. enough times in the past two years that her body has stopped being afraid of it.",
      },
      {
        speakerId: "mia",
        text: "...mmh. Baby. What.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Her voice is the sleep-voice. She is mostly awake within four seconds. She has done this before.",
      },
      {
        speakerId: null,
        text: "You tell her about the Slack message. You compress eight cognitive steps into about thirty-five seconds. She listens. She makes the small humming sound she makes when she is processing a thing without judging it.",
      },
      {
        speakerId: "mia",
        text: "...Sam. It's three a.m. David didn't fire you. He's going to give you copy notes. Like he did in February. You're going to be fine. Come here.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She pulls you against her chest. You can hear her heartbeat, slower than yours. Within forty minutes, your body is dropping. Within forty-five, you are asleep.",
      },
      {
        speakerId: "inner-voice",
        text: "The bleed stopped in forty minutes. That is the function of the move and it is real. Mia loves you. Mia is also a person whose nervous system is now learning, with each repetition, that 3 a.m. wakings are part of her sleep architecture. Across the next year. At the rate this is currently happening, which is approximately twice a month, the wakings will start to arrive at 2:50 in anticipation. Mia's own cortisol curves will start to scan for them. Mia will not name this for at least six more months.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "More importantly: your body just learned, again, that 3 a.m. spirals are solved by waking Mia. The next spiral will arrive sooner. The next one will reach louder. The body's tolerance for uncertainty is being trained downward by every successful reassurance.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "There is a different version of this exchange you will find in Level 4. In it, Mia does not provide the reassurance. The body does not get the immediate calm. The body learns, instead, that uncertainty is survivable. That move is harder for both of you. It is also the move that, across years, lets the friendship stay alive while the disorder shrinks.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-mia-end",
        text: "End scene.",
        tactic: "The reassurance-via-Mia ending.",
        nextSceneId: "ending-mia",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // PHONE PATH (loop-feeder)
  // ===================================================================
  {
    id: "phone-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You pick up the phone. The brightness adjusts down because you set it to do that. The Slack thread is still where you left it.",
      },
      {
        speakerId: null,
        text: "You read the message. Eleventh time. Twelfth.",
      },
      {
        speakerId: null,
        text: "You open Safari. You type: 'can a slack message mean firing.' The first results are corporate-blog content from 2019 and a 2017 Reddit thread titled 'My boss said we need to talk on Monday' with 247 replies.",
      },
      {
        speakerId: null,
        text: "You read the Reddit thread. The top reply says 'I got fired the next Monday.' The second reply says 'I got promoted the next Monday.' The body soothes for 12 minutes per relevant data point and then re-fires.",
      },
      {
        speakerId: null,
        text: "By 4:11 a.m. you have read the entire Reddit thread, three Glassdoor reviews of your own company, and the Wikipedia article on at-will employment in New York State. You have drafted, in your head, a Sunday-afternoon proactive message to David. You have rejected eight versions of it.",
      },
      {
        speakerId: null,
        text: "By 5:30 a.m. you have not slept. The room is the colour of pre-dawn. Your eyes are dry. The body has now spent five hours running the chemistry that the body is supposed to spend in slow-wave sleep. Your tomorrow has been damaged before tomorrow has begun.",
      },
      {
        speakerId: "inner-voice",
        text: "The phone at 3 a.m. Is the most reliable loop-feeder available to a modern anxious body. Each piece of content soothes for 12 minutes by giving the brain the SHAPE of resolution, a specific outcome, a specific scenario, a specific data point. Then the brain notices the resolution was not a resolution and re-fires. Each cycle trains the body that anxiety is solved by content. Each cycle is shorter than the last.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Compounding cost: a body that has been awake from 3 a.m. cannot do the cognitive work the next day that catches the catastrophising staircase early. The 3 a.m. all-night phone session installs the conditions for the next 3 a.m. all-night phone session. This is the maintenance shape of chronic GAD in 2026, built by phone, kept alive by phone, broken (in treatment) by giving the phone less access to the bed.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-phone-end",
        text: "End scene.",
        tactic: "The phone-loop ending.",
        nextSceneId: "ending-phone",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // DEFUSION PATH (skill)
  // ===================================================================
  {
    id: "defusion-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You stay still. You do not pick up the phone. You do not wake Mia.",
      },
      {
        speakerId: null,
        text: "The next thought arrives within twelve seconds. 'David is going to fire me on Monday.' You name it. Not in argument with it, just naming.",
      },
      {
        speakerId: null,
        text: "I am having the thought that David is going to fire me on Monday.",
      },
      {
        speakerId: null,
        text: "The next one. 'Mia is going to leave when I lose my job.' You name it.",
      },
      {
        speakerId: null,
        text: "I am having the thought that Mia is going to leave when I lose my job.",
      },
      {
        speakerId: null,
        text: "The next one. 'The whole team has been talking about firing me for weeks.' Name.",
      },
      {
        speakerId: null,
        text: "I am having the thought that the whole team has been talking about firing me for weeks.",
      },
      {
        speakerId: null,
        text: "The thoughts keep coming. Defusion does not stop them. What it changes is the relationship, the thought is not THE TRUTH, it is AN EVENT in your head. The brain is producing them. The brain is not lying, exactly; the brain is doing what 3 a.m. brains do, which is pattern-completing on minimal evidence in the direction of threat.",
      },
      {
        speakerId: "inner-voice",
        text: "The skill is doing this without arguing with the thoughts. Argument re-engages them. Defusion just observes them. Each named thought is a leaf going past on a stream, you watch it, you don't grab it, you don't push it under. The next one arrives. You name it. You don't grab it. You don't push it under. The river keeps running.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Around 3:48 a.m. the gaps between the thoughts get longer. By 3:52 there is a 90-second silence. Your chest is still tight but the rhythm has dropped from 105 to 80. Your eyelids are heavy.",
      },
      {
        speakerId: null,
        text: "By 4:08 a.m. you are asleep.",
      },
      {
        speakerId: "inner-voice",
        text: "You did not solve the Slack message. The Slack message is the same as it was at 3:14. You did not produce certainty. The certainty is unavailable until 9 a.m. tomorrow when David arrives. What you did was hold the body through ninety minutes of unresolved cognitive content without feeding the loop. The body learned that the unresolved-thought condition does not require an emergency response. The body slept.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-defusion-end",
        text: "End scene.",
        tactic: "The defusion ending.",
        nextSceneId: "ending-defusion",
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
        text: "You reach for the notebook on the nightstand. The pen is clipped to the cover. You do not turn on the lamp; you write by the streetlamp behind the curtain.",
      },
      {
        speakerId: null,
        text: "You write: 'David Slack message. We need to talk about Henderson Monday. Body says: he's firing me. Catastrophising staircase. Worry-time tomorrow at 5 p.m.'",
      },
      {
        speakerId: null,
        text: "You close the notebook. You whisper, in your own head, the postponement promise: we will worry about this at 5 p.m. tomorrow.",
      },
      {
        speakerId: null,
        text: "The body protests. The body wants to act NOW. The body's protest is the next eight thoughts in succession, each one slightly louder than the previous one, each one trying to convince the postponement-promiser that this particular worry is too important to wait.",
      },
      {
        speakerId: null,
        text: "Each thought is the same shape. 'But what if he's already drafted the email.' 'But what if you should send a message tonight.' 'But what if waiting is the wrong move.' The shape is: this worry is special. The skill is to recognise that all worries say they are special. Most are not.",
      },
      {
        speakerId: null,
        text: "The first try does not hold. The body re-reaches for the phone at 3:34. You catch the reach.",
      },
      {
        speakerId: "inner-voice",
        text: "The body protesting the postponement is the body's standard move. The skill is to hold the postponement WITHOUT arguing with the body. You wrote the worry down. The notebook is the container. The notebook is real. 5 p.m. Is real. The reach for the phone is the body trying to bypass the container.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Second try. You whisper the postponement again. We will worry about this at 5 p.m. we will. We have a containment strategy that the body is not used to but that the brain, the 11 a.m. brain, the one that drew this notebook plan up in Lin's office last Thursday, knows works.",
      },
      {
        speakerId: null,
        text: "By 3:42 the gaps lengthen. By 3:48 you are asleep.",
      },
      {
        speakerId: "inner-voice",
        text: "The next afternoon you will sit down at 5 p.m. and open the notebook. By that point David will have already, at 9:07 a.m., walked over to your desk and said the copy was great, just tighten the second paragraph. The 5 p.m. worry-time will be empty. The notebook will say 'David Slack message,' and you will write next to it: 'resolved 9:07 a.m. by him saying it was fine.' This will be the third notebook entry this month that resolved itself before worry-time. Across enough entries, the body learns that worry-postponement does not just delay worries, it sometimes reveals that the worry was never load-bearing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-postponement-end",
        text: "End scene.",
        tactic: "The postponement ending.",
        nextSceneId: "ending-postponement",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // GROUNDING PATH (skill)
  // ===================================================================
  {
    id: "grounding-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You slide your legs out of the bed. The wood floor is cold. You take the comforter off your side and drape it around your shoulders. Mia does not stir.",
      },
      {
        speakerId: null,
        text: "The kitchen is six steps from the bedroom door. You don't turn on the overhead. You turn on the small under-cabinet light over the sink. The light is the colour of an old amber.",
      },
      {
        speakerId: null,
        text: "You start the sweep. Five things you see.",
      },
      {
        speakerId: null,
        text: "1. The fridge magnet shaped like a slice of pizza. Mia's mother sent it from Phoenix two months ago.",
      },
      {
        speakerId: null,
        text: "2. The half-empty bottle of olive oil on the counter, the label peeling at the corner.",
      },
      {
        speakerId: null,
        text: "3. The stack of mail on top of the microwave, top envelope addressed to a previous tenant named ALEJANDRO REYES.",
      },
      {
        speakerId: null,
        text: "4. The small ceramic dish where Mia keeps her keys, currently holding two keys, a hair tie, and a paperclip.",
      },
      {
        speakerId: null,
        text: "5. The window over the sink. The curtain moving slightly because you cracked the window before bed.",
      },
      {
        speakerId: null,
        text: "Four things you can touch. The rim of the sink, cold steel. The tile floor through the comforter, cool. The wooden countertop, slightly tacky from the dishwashing. The handle of the kettle, room temperature.",
      },
      {
        speakerId: null,
        text: "Three things you can hear. The radiator clicking in the bedroom. A car passing on Manhattan Avenue. The hum of the fridge motor.",
      },
      {
        speakerId: null,
        text: "Two things you can smell. The olive-oil-and-garlic residue from dinner. The candle Mia lit at 8 p.m., still faintly present.",
      },
      {
        speakerId: null,
        text: "One thing you can taste. Stale toothpaste mint.",
      },
      {
        speakerId: null,
        text: "By the end of the sweep, the body has dropped two notches. The chest tightness is still there but it is a 4 instead of a 7. The breath has lengthened. You drink half a glass of water. You walk back to the bed.",
      },
      {
        speakerId: "inner-voice",
        text: "Grounding pulls the brain from interoceptive, the inward scan of body-sensation that is the chemistry of anxiety, to exteroceptive, the outward scan of the room. The skill works because the brain cannot run both attention modes at high resolution simultaneously. The pizza fridge magnet does not solve your Slack message. It does occupy the cognitive bandwidth that, two minutes ago, was running the catastrophising staircase. By the time you are on smell-and-taste, the staircase has lost the cognitive bandwidth it needs to escalate.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "By 3:55 a.m. you are asleep.",
      },
    ],
    choices: [
      {
        id: "to-grounding-end",
        text: "End scene.",
        tactic: "The grounding ending.",
        nextSceneId: "ending-grounding",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-mia",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Reach",
    endingLearnPrompt:
      "You woke Mia. Mia did the right thing in the moment, gathered you, slowed your heart with hers, walked you down. The bleed stopped in forty minutes. The cost is paid not tonight but across months, because the body just learned, again, that 3 a.m. spirals are solved by waking the partner. The next spiral will arrive sooner. Mia's sleep architecture will start to scan for them. Mia will not name this for several months. The skill that would have produced the same calm without the structural cost is one of the three named in the choice list and is what Lin has been training you toward for eight months. Tonight you reached for the easier shape. The repair tomorrow is to tell Mia, calmly at breakfast, what happened, that you reached, and that you noticed yourself doing it. The naming is itself part of the skill.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The reassurance-from-partner move is not a moral failure. It is the most reliable loop-feeder available to a modern anxious body in a partnered apartment, and almost everyone with chronic anxiety in a long relationship has done it many, many times. The work is not about never reaching for it. The work is about reaching for it less often as the alternative skills compound. Tonight was a one-trial cost. The trial cost compounds. The compounding is the disorder.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-phone",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Phone",
    endingLearnPrompt:
      "You spent two hours and sixteen minutes on the phone. You read a Reddit thread, a Glassdoor review, the Wikipedia article on at-will employment. You drafted eight versions of a Sunday-afternoon proactive message you will not send. You did not sleep. By 5:30 a.m. the room was the colour of pre-dawn and you had spent the night training your nervous system that anxiety is solved by content. Your tomorrow has been pre-damaged. The 11 a.m. brain that would otherwise have caught the catastrophising staircase early will be running on four hours of broken sleep and three espressos by 9 a.m., which is the conditions that produce the next 3 a.m. spiral. The phone-in-bed is the maintenance shape of chronic anxiety in 2026. The first piece of leverage is mechanical, phone in another room, charger in the kitchen, alarm clock instead of phone. The mechanical piece works because the body cannot reach what it cannot reach.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The phone is not the problem. The phone is the most efficient delivery system humanity has ever built for the loop-feeder shape that the body was already going to reach for. Removing the phone from the bedroom does not solve the underlying disorder; it removes a 12-minute cycle and replaces it with a body that, at 3 a.m., has fewer escape options and is forced to either feed the loop in slower shapes or use one of the three named skills. Most clinicians who treat severe anxiety in 2026 make the phone-out-of-bedroom move a non-negotiable.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-defusion",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Leaves",
    endingLearnPrompt:
      "You named the thoughts as thoughts. You did not argue with them. You watched them go past. By the time the gaps between them stretched to 90 seconds, your body had dropped two notches. By 4:08 you were asleep. You did not solve the Slack message. The Slack message will resolve itself at 9:07 a.m. tomorrow. What you did was hold the body through ninety minutes of unresolved cognitive content without feeding the loop. The body learned, in one trial, that the unresolved-thought condition does not require an emergency response. Across hundreds of trials over months and years, this is the mechanism by which the disorder shrinks.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Cognitive defusion is one of the simplest and least dramatic skills in the anxiety toolkit, which is part of why it is underused. There is no acronym to perform. There is no ritual. There is just the small grammatical move of converting 'I am going to be fired' into 'I am having the thought that I am going to be fired.' The eight extra words do all the work. Across a year of practice, the eight extra words become automatic. The disorder becomes one notch quieter for every month they are.",
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
    endingTitle: "The Notebook",
    endingLearnPrompt:
      "You wrote the worry down and named the worry-time at 5 p.m. tomorrow. The body protested. You held the postponement without arguing with the protest. The first try did not hold; the second one did. By 3:48 you were asleep. Tomorrow at 5 p.m. you will sit down with the notebook and discover that the worry resolved itself at 9:07 a.m. when David told you the copy was great. The worry-time will be empty. This is the third entry this month that resolved itself before worry-time. Across enough entries, the body learns that worry-postponement does not just defer worries, it sometimes reveals that the worry was never load-bearing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Worry postponement is one of the highest-leverage CBT skills in the GAD toolkit because it works with the body's natural tendency to attend to whatever is most active. Giving the worry an external container, the notebook, the worry-time, gives the body a structurally honest answer to its protest. The protest is 'this is important and we need to act now.' The container's answer is 'we will act on this at 5 p.m.; the act has not been refused, it has been scheduled.' The body cannot effectively argue against scheduled action. The disorder loses one of its most reliable engines.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-grounding",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Pizza Fridge Magnet",
    endingLearnPrompt:
      "You got out of bed quietly. You walked to the kitchen. You ran the 5-4-3-2-1 sweep through what was actually in front of you, the pizza magnet, the olive oil, the previous tenant's mail, Mia's keys, the window. By the time you finished, the chest tightness had dropped from a 7 to a 4. By 3:55 you were asleep. The sweep does not solve the Slack message. The sweep occupies the cognitive bandwidth that two minutes earlier had been running the catastrophising staircase. The body cannot run both interoceptive scanning and exteroceptive attention at high resolution simultaneously. Grounding works on this asymmetry.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Grounding is the skill of last resort that often works better than any of the more sophisticated cognitive moves, because it bypasses cognition entirely. There is no thinking required. There is just the small physical action of cataloguing what is actually in the room. Most clinicians teach it as the first-line panic intervention; it works equally well as a 3 a.m. spiral-interrupt. Across the toolkit, grounding is the move you reach for when the brain is too tired or too activated to do the cognitive work. The pizza fridge magnet does not care that David sent a Slack message. The pizza fridge magnet is just on the fridge. That uncomplicated thereness is the medicine.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety11: Scenario = {
  id: "anx-1-1",
  title: "The 3 a.m. Slack",
  tagline: "3:14 a.m. the body is in it. The mind catches up. Five available moves; two feed the loop; three let you sleep.",
  description:
    "Cold open of the long-form anxiety arc. Player is Sam Ruiz at 3:14 a.m. lying in bed next to a sleeping partner, carrying a context-free Slack message from a senior partner that has been firing the alarm for ten hours. Teaches: the body-before-mind sequence, the catastrophising staircase named in real time, and five available moves at the choice point, two loop-feeders (waking the partner, reaching for the phone) and three skills (cognitive defusion, worry postponement, 5-4-3-2-1 grounding). Five endings, two cautionary, three optimal versions of the right move.",
  tier: "premium",
  track: "anxiety",
  level: 1,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "beginner",
  category: "narcissist",
  xpReward: 320,
  badgeId: "the-3am-skill",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Body-before-mind sequence, recognising that somatic activation precedes cognitive content by 30-60 minutes",
    "Catastrophising staircase named. Each cognitive step is 30% longer and 50% more vivid; the brain does this mechanically",
    "Cognitive defusion (ACT), 'I am having the thought that X' as the eight extra words that do the work",
    "Worry postponement (CBT), the notebook as container, scheduled worry-time as the body's structurally honest answer to its protest",
    "5-4-3-2-1 grounding, exteroceptive attention as the cognitive-bandwidth competitor to interoceptive scanning",
  ],
  redFlagsTaught: [
    "Reassurance-seeking from the sleeping partner, works in 40 minutes, costs across months as the partner's nervous system learns to scan for the wakings",
    "The phone-in-bed loop-feeder, 12-minute soothing cycles that train the body that anxiety is solved by content; the maintenance shape of chronic GAD in 2026",
    "Believing the 3 a.m. brain, the cognitive output of a sleep-deprived high-cortisol low-PFC-regulation brain is not the verdict to act on",
  ],
  characters: [INNER_VOICE, SAM, MIA],
  scenes,
};

export default anxiety11;
