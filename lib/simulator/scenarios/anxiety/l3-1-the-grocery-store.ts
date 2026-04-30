/**
 * anxiety-3-1, "The Grocery Store"
 *
 * Anxiety track, Level 3, order 1. The hardest scene in the arc.
 * The bottom of the trough. Sam at the Trader Joe's on Court Street
 * on a Sunday morning, with bad sleep and three coffees. In the
 * cereal aisle, the body fires. Real panic attack. The cognitive
 * content arrives in the recognised shape: 'I am having a heart
 * attack' / 'I need to leave right now' / 'what if I collapse here'
 * / 'what if everyone sees' / 'what if I go crazy in public.'
 *
 * What this scene teaches:
 *   - The phenomenology of an actual panic attack, rendered with
 *     enough somatic precision that a player who has had one
 *     recognises it and a player who has not understands what it
 *     is. DSM-5-TR symptom set: palpitations, sweating, trembling,
 *     shortness of breath, chest tightness, dizziness, derealisation,
 *     fear of dying.
 *   - The minute-by-minute toolkit. Choices are not 'what do I
 *     think', they are 'what do I do with my body in the next
 *     30 seconds.' Each path produces a different arc for the
 *     next 4-6 minutes.
 *   - The avoidance trap. Leaving the store immediately resolves
 *     the body's tension AND installs the maintenance fear: by
 *     tomorrow the body will associate Trader Joe's with panic. By
 *     next month, all grocery stores. By month four, Instacart for
 *     everything. The avoidance trap opens in this scene.
 *   - The right move set. Stay AND ride it via box breathing.
 *     Stay AND call Mia for ground without certainty-granting. The
 *     body learns that panic CAN be witnessed and ridden in public.
 *     The maintenance picture for the next month is meaningfully
 *     different on the ride-it path versus the avoidance paths.
 *   - Naming the cognitive content of panic ('I'm dying') as a
 *     known clinical feature, not a moral failing. The body's
 *     belief that it is dying during a panic attack is not a
 *     peripheral symptom; it is part of the disorder.
 *
 * NSSI/crisis policy: Per the design doc, this scene surfaces 988
 * and Crisis Text Line resources in the opening Kanika frame for
 * any player whose own body is in crisis while reading. The
 * scenario itself does not depict self-harm impulse or planning;
 * it depicts the 'I am dying' content of panic, which is clinically
 * normative to render.
 *
 * Voice: minute-by-minute, body-first, present-tense thick. Sparse
 * Kanika narration during the panic itself; the absence of cognitive
 * scaffolding IS the texture. Heavier narration at the choice points
 * and at endings.
 *
 * Cast: SAM (player), MIA (on phone, one path), STRANGERS (passing
 * in the aisle), INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. Sunday morning, 11:23 a.m. at the Trader Joe's on Court Street. The body has been firing low-grade activation since Friday evening; this is when it produces a real panic attack.",
  traits: ["sensitive", "in-treatment", "in-acute-state"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const MIA: Character = {
  id: "mia",
  name: "Mia",
  description: "30. Sam's partner. Home in the apartment when the call comes in.",
  traits: ["calm", "grounded"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, what panic actually is, crisis resources
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "This is the hardest scene in the arc. The body is going to produce a real panic attack in the next ninety seconds, not the catastrophising staircase you have been working with at 3 a.m. and 2:47 p.m. and 8:11 p.m. those were cognitive worry-loops, body-amplified. This is the somatic event itself, the one the DSM lists with thirteen possible symptoms and the criterion 'abrupt surge of intense fear or discomfort reaching peak within minutes.' This is what the disorder feels like at peak.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The cognitive content the body will produce during the attack will include: 'I am having a heart attack.' 'I need to leave right now.' 'What if I collapse.' 'What if everyone sees.' 'What if I go crazy in public.' These are recognised clinical features of panic, not moral failings. The body's belief that it is dying during a panic attack is part of the disorder. The body is wrong. The body's chemistry, in the moment, is producing the symptoms of dying without the actual condition of dying. EKGs done in ERs on people who have just had panic attacks are uniformly normal. This is what the medical literature spent forty years establishing.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "If reading the scene activates your own current crisis: in the United States, dial or text 988. Crisis Text Line: text HOME to 741741. Both are free, confidential, answer immediately. Outside the US, your country's equivalent. You can leave the scenario at any moment. The scenario does not depict self-harm. It depicts what panic is, on the inside, in enough detail to teach the toolkit that lets you ride it. If you have never had a panic attack, this scene is research into what your loved one has been describing. If you have had one, this scene is a witness.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Five available moves at the choice point. Two are the avoidance trap. Three are the work.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. Sunday morning. The store.",
        tactic: "The scene opens.",
        nextSceneId: "the-store",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE STORE, context, the body's pre-conditions
  // ===================================================================
  {
    id: "the-store",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 11:23 a.m.",
      },
      {
        speakerId: null,
        text: "The Trader Joe's on Court Street. The store is full but not packed. The fluorescent ceiling-strips are doing the slightly-too-bright thing they do. The Hawaiian-shirted staff are stocking the back wall. There is a song playing that you cannot identify but that has been the soundtrack of every grocery store since 2019.",
      },
      {
        speakerId: null,
        text: "The body's pre-conditions: five hours of mediocre Friday sleep, four hours of bad Saturday sleep. Three coffees this morning instead of two. You skipped breakfast. The Christmas worry-time on Wednesday at 5 p.m. produced its concrete fears and concrete actions and the body has been carrying low-grade activation about Christmas across the entire weekend that the worry-time was supposed to discharge. The discharge worked partially. The activation is not gone.",
      },
      {
        speakerId: null,
        text: "Cart, half-full. Eggs, oat milk, the small jar of harissa Mia likes, three bananas, a bag of frozen edamame, the bagged salad. You are pushing the cart down the cereal aisle.",
      },
      {
        speakerId: null,
        text: "And then, in approximately eight seconds, the body starts.",
      },
    ],
    choices: [
      {
        id: "to-the-onset",
        text: "Continue.",
        tactic: "The body fires.",
        nextSceneId: "the-onset",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE ONSET, the panic begins, somatic profile
  // ===================================================================
  {
    id: "the-onset",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Chest tightening. Real this time, physically tight, the way it gets after running uphill, except you have not been running.",
      },
      {
        speakerId: null,
        text: "Breath shorter. You are now noticeably aware of breathing, which is a sign you are having to make an effort to do it.",
      },
      {
        speakerId: null,
        text: "Heart rate spike. You can feel each beat in your sternum. The rhythm is fast in a way that is not the fast of nervous-system-aroused; it is the fast of something-medical-happening.",
      },
      {
        speakerId: null,
        text: "Your hands are cold. The temperature in the store has not changed.",
      },
      {
        speakerId: null,
        text: "The lights are too bright. Brighter than they were thirty seconds ago. The bright is wrong. It is the kind of bright that means you are about to faint.",
      },
      {
        speakerId: null,
        text: "And the cognitive content arrives.",
      },
      {
        speakerId: null,
        text: "I am having a heart attack.",
      },
      {
        speakerId: null,
        text: "I need to leave right now.",
      },
      {
        speakerId: null,
        text: "What if I collapse in the cereal aisle.",
      },
      {
        speakerId: null,
        text: "What if everyone sees.",
      },
      {
        speakerId: null,
        text: "What if I go crazy.",
      },
      {
        speakerId: null,
        text: "You stop the cart. You are halfway between the granola and the cold cereal. There is a woman with a stroller about ten feet ahead of you and a man in a Pratt sweatshirt about six feet behind you. Both of them are doing their shopping. Neither has noticed.",
      },
      {
        speakerId: "inner-voice",
        text: "What just happened in the last ninety seconds, in clinical language: amygdala-driven sympathetic-nervous-system activation, producing the symptom set the DSM lists for panic. The chest, breath, heart, hands, lights, cognitive 'I'm dying' content. ALL OF IT is the chemistry of panic. None of it is what the cognitive content says it is. Your heart is fine. Your lungs are fine. You are not collapsing. You are not going crazy. The body is producing the somatic signature of acute threat in the absence of acute threat, and the cognitive content is the body's interpretation of the somatic signature.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Five available moves in the next thirty seconds. Two of them install the maintenance fear, by tomorrow your body will associate Trader Joe's with panic. By next month all grocery stores. By month four, Instacart for everything. The avoidance trap is opening. Three of the moves close it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "leave",
        text: "Leave immediately. Abandon the cart in the aisle. Drive home.",
        tactic: "The escape. Body's tension drops 60% within ninety seconds of being out of the store. The drop is real and the relief is psychoactive. The cost lands tomorrow, the body has now associated Trader Joe's with panic, which is the conditioning step for the maintenance fear. Across the next month, the avoidance generalises.",
        nextSceneId: "leave-1",
        isOptimal: false,
      },
      {
        id: "leave-pull-over",
        text: "Leave. Make it to the car. Pull over after one block; panic in the parked car for six minutes.",
        tactic: "The partial escape. The panic continues in the car, naturally peaks at minute 3, falls. By minute 6 it is functional. The avoidance is partial, the conditioning is weaker than abandoning the store outright but it is still present.",
        nextSceneId: "leave-pull-over-1",
        isOptimal: false,
      },
      {
        id: "dissociate",
        text: "Stay; dissociate. The body floats. The next ten minutes happen on autopilot. Ring up. Drive home.",
        tactic: "The autopilot path. Body completes the shopping but does not consciously process the panic. The maintenance fear is mid, present but blunted. You will not remember much of the next ten minutes when you replay them later.",
        nextSceneId: "dissociate-1",
        isOptimal: false,
      },
      {
        id: "ride-it",
        text: "Stay. Stop the cart. Pretend to read a label. Box breathing, 4 in, 4 hold, 4 out, 4 hold. Five cycles.",
        tactic: "The ride. The body does NOT instantly calm. The panic peaks at minute 3 of the cycle, then begins to descend. By aisle 7 the body has dropped two notches. By checkout, shaky but functional. The body learned, in one trial, that panic CAN be ridden in public. Most powerful single intervention available in this moment.",
        nextSceneId: "ride-it-1",
        isOptimal: true,
      },
      {
        id: "call-mia",
        text: "Phone in hand. Call Mia. 'I'm having a panic attack at Trader Joe's. I'm going to keep shopping. Can you stay on the line?'",
        tactic: "The witness call. Mia picks up. She does NOT say 'you're not having a heart attack', she does the right thing, which is to stay on the line and talk about the cart. The body is held by an external presence. By checkout, body is functional. The panic was witnessed. The body learned that public panic + witness on the phone is survivable.",
        nextSceneId: "call-mia-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // LEAVE PATH (avoidance trap)
  // ===================================================================
  {
    id: "leave-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You leave the cart in the aisle. You walk fast, fast enough that the woman with the stroller looks up. You walk past the registers without looking at them. You push the door. The cold air hits you on the sidewalk.",
      },
      {
        speakerId: null,
        text: "Within ninety seconds of being out of the store, the chest tightness drops. The breath comes back. The heart rate, still elevated, has stopped feeling like dying.",
      },
      {
        speakerId: null,
        text: "You drive home. You park. You sit in the car in the parking spot for another four minutes before going up. The relief is real and the relief is psychoactive, your body has just received the strongest possible signal that LEAVING WAS THE RIGHT MOVE.",
      },
      {
        speakerId: null,
        text: "It was not the right move. The body cannot tell.",
      },
      {
        speakerId: "inner-voice",
        text: "The body's relief on exiting the store is the conditioning event. In the body's pattern-matching system, the sequence was: aisle → panic → leave → relief. The body just learned that grocery stores produce panic and that leaving solves it. By tomorrow, the body will fire low-grade anticipatory anxiety at the thought of any grocery store. By next week, you will have ordered Instacart twice. By month two, the Instacart will have become regular. By month four, you will not remember the last time you went to a Trader Joe's, and the IDEA of a Trader Joe's will produce stomach-tightening at home in your kitchen.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is the avoidance trap. It is one of the most reliable engines of chronic panic disorder. It is also one of the cleanest examples in clinical anxiety of why the obvious move is the wrong move. The repair, when you go to therapy on Wednesday and tell Lin what happened, will be exposure therapy, which is the structured re-entry into the avoided environment, with the body deliberately remaining in the panic-triggering condition until the panic peaks and falls without leaving. The exposure work is hard. It is also one of the highest-effect-size treatments in mental health.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-leave-end",
        text: "End scene.",
        tactic: "The avoidance ending.",
        nextSceneId: "ending-leave",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // LEAVE-PULL-OVER PATH (partial avoidance)
  // ===================================================================
  {
    id: "leave-pull-over-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You leave. You make it to the car. You pull out of the spot. You drive one block. The panic is still happening. You pull over by the laundromat on Smith.",
      },
      {
        speakerId: null,
        text: "You sit. Hands on the wheel. Hazards on. The chest tightness peaks at minute three of being parked. You can hear yourself breathing. A man walks past the car carrying a small dog. The dog looks at you.",
      },
      {
        speakerId: null,
        text: "By minute six, the panic has descended on its own. The body's chemistry has burned through the activation. You are tired in a specific somatic flavour. You drive home. You unpack the half-cart-worth of groceries you actually got out of the store. The eggs are not among them. You will need to go back for eggs. You order the eggs from Instacart.",
      },
      {
        speakerId: "inner-voice",
        text: "The pull-over version is structurally similar to the full-leave version, with the somewhat saving grace that the panic was experienced through to its natural peak-and-fall in the car. The body learned partial good news, panic ends on its own when not interrupted but the body also learned that you LEFT before doing this, which means the conditioning between Trader Joe's and panic is still present. The maintenance picture for the next month is somewhat better than the full-leave path, somewhat worse than the ride-it path.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The eggs-from-Instacart move at the end is the small first instance of avoidance generalising. It is not a moral failing. It is a structural feature of how the body conditions. The repair, on Wednesday in Lin's office, will be the same, exposure work. Lin will likely propose returning to Trader Joe's specifically, with a structured graded plan, first time, in and out for one item, possibly with Mia present, possibly during a less-busy hour. Over weeks of structured re-entry, the conditioning extinguishes.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-pull-over-end",
        text: "End scene.",
        tactic: "The pull-over ending.",
        nextSceneId: "ending-pull-over",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // DISSOCIATE PATH (autopilot)
  // ===================================================================
  {
    id: "dissociate-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Something happens in your body that is not a decision. The body floats. The chest is still tight but the tightness has become distant, like you are watching the chest tighten on someone else's body. The lights stop being too bright because you have stopped being present to the lights.",
      },
      {
        speakerId: null,
        text: "The next ten minutes happen on autopilot. You finish the shopping. You add a thing to the cart that you do not need, a small jar of olives, because some part of you is still operating but it is operating at the level of acquiring objects, not at the level of integrating what is happening.",
      },
      {
        speakerId: null,
        text: "You ring up. The cashier is a man with kind eyes whose name tag says SCOTT. He says something pleasant. You produce a smile that uses the muscles correctly. You pay. You bag.",
      },
      {
        speakerId: null,
        text: "You walk to the car. You drive home. You unpack the groceries. You realise, midway through unpacking, that you do not remember choosing the olives. You also do not remember the drive.",
      },
      {
        speakerId: "inner-voice",
        text: "Dissociation during panic is one of the listed DSM symptoms (derealisation / depersonalisation). It is not a separate event from the panic; it IS the panic, in a different shape. The body's chemistry is the same; the body's protective response has shifted from fight-or-flight to a third option, which is functional-but-not-present. The maintenance fear from this path is mid, your body did the shopping, which gave the body weak counter-evidence to the avoidance conditioning, but the body did not consciously witness either the panic or its descent, which means the body did not get the lesson available on the ride-it path.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Dissociation paths often look fine from the outside and feel fine in the immediate aftermath. The cost lands the next time the body is in a similar trigger condition, the body has not learned that panic is rideable, just that panic can be skipped via floating. The trigger condition will produce another float, which is itself a slow draw on the body's reserve. Across years, dissociation as a panic-management strategy hollows the body out.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-dissociate-end",
        text: "End scene.",
        tactic: "The dissociate ending.",
        nextSceneId: "ending-dissociate",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // RIDE-IT PATH (skill, the work)
  // ===================================================================
  {
    id: "ride-it-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You stop the cart. You pretend to read a cereal label. Honey Bunches of Oats. You have not bought Honey Bunches of Oats in your life. You stare at the label.",
      },
      {
        speakerId: null,
        text: "Box breathing. 4 in, 4 hold, 4 out, 4 hold. The shape of the breath matters less than the slowness. You inhale to a count of four. You hold to a count of four. You exhale to a count of four. You hold empty to a count of four.",
      },
      {
        speakerId: null,
        text: "Cycle one. The body does not calm. The body still thinks it is dying. The breath count is the only thing competing with the dying thought.",
      },
      {
        speakerId: null,
        text: "Cycle two. The body still does not calm. The cognitive content is loud, 'this isn't working, you should leave, you are about to faint, leave NOW.'",
      },
      {
        speakerId: null,
        text: "Cycle three. The peak. This is where the panic is at its loudest and the body is most certain that leaving is the only option. The cycle holds. You stay with the breath. You do not leave.",
      },
      {
        speakerId: null,
        text: "Cycle four. Something starts to descend. Not all at once. A 5% drop. The chest tightness is at a 9 instead of a 10.",
      },
      {
        speakerId: null,
        text: "Cycle five. 8 instead of 9.",
      },
      {
        speakerId: "inner-voice",
        text: "What just happened, mechanically: the parasympathetic nervous system, recruited by slow exhalation, has begun to compete with the sympathetic activation that was producing the panic. The body cannot run both at high resolution simultaneously. The breath is a mechanical lever on the autonomic nervous system. The cycle three peak is the test. Most people leave at cycle three because cycle three is when the body is most sure that the breath is not working. Cycle three is when the breath is doing its hardest work.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You move the cart. You do not pick up the Honey Bunches of Oats. You go on to the next aisle. By aisle 7, frozen, the body has dropped to a 6. By the checkout, 5. Shaky, but functional.",
      },
      {
        speakerId: null,
        text: "The cashier is the same SCOTT from the dissociate version, except in this version you are present to him. He says 'how's your Sunday going.' You produce a smile. You say 'it's been a Sunday.' He laughs. You pay. You bag. You walk to the car.",
      },
      {
        speakerId: null,
        text: "You drive home. You unpack the eggs and the oat milk and the harissa and the bananas and the edamame and the salad. You did not buy the olives, because you were present and the olives were not on the list.",
      },
      {
        speakerId: null,
        text: "You sit on the couch. Your body is tired in the specific way bodies are tired after riding panic, the post-adrenaline crash flavour. You text Mia: 'I had a panic attack at Trader Joe's. I rode it. I want to tell you about it when I'm less wobbly.' Mia replies: 'I love you. Tea is on the way.'",
      },
      {
        speakerId: "inner-voice",
        text: "What you just learned, in one trial, is the most important lesson available in the entire arc. Panic CAN be ridden in public. Panic descends on its own when not interrupted by leaving. Box breathing is a mechanical lever that competes with the sympathetic activation. The body, having learned this once, has the foundation for learning it forty more times, which is the structural shape of recovery from panic disorder. Across forty trials, the body's conditioning of grocery-store-equals-panic gets overwritten by grocery-store-equals-rideable, and the avoidance trap closes back up.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-ride-end",
        text: "End scene.",
        tactic: "The ride-it ending.",
        nextSceneId: "ending-ride",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // CALL MIA PATH (skill, witness)
  // ===================================================================
  {
    id: "call-mia-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: null,
        text: "Phone in your hand. Mia's contact. Two rings. She picks up.",
      },
      {
        speakerId: "mia",
        text: "Hi babe. What's up.",
        emotion: "neutral",
      },
      {
        speakerId: "sam",
        text: "I'm having a panic attack at Trader Joe's. I'm going to keep shopping. Can you stay on the line.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "There is a half-second pause. You can hear her shifting on the couch. She does not say 'are you okay.' She does not say 'do you need to leave.' She does not say 'you're not having a heart attack', which would be the most well-meaning wrong thing for her to say, and which most untrained partners would say within the first fifteen seconds of this kind of call.",
      },
      {
        speakerId: "mia",
        text: "Yeah. I'm here. Tell me what's in your cart.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She is doing the right thing. The right thing is small and unflashy. She is giving you something concrete to attend to that is not your dying body. She is not asking you to articulate state. She is not promising anything. She is saying she is there and asking about the cart.",
      },
      {
        speakerId: "sam",
        text: "Eggs. Oat milk. Harissa. Bananas. Edamame. Salad.",
        emotion: "concerned",
      },
      {
        speakerId: "mia",
        text: "Okay. We need cilantro for the dal. Are you near produce. Can you get me a bunch.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You walk to produce. The walking is itself a body-doing-something-that-is-not-dying. You find the cilantro. You pick up a bunch. You smell it. The smell is bright and green.",
      },
      {
        speakerId: "sam",
        text: "Got it.",
        emotion: "concerned",
      },
      {
        speakerId: "mia",
        text: "Cool. The 90-cent Persian limes in the bin near the avocados. Get four. Do you remember where the cumin is. Do we need cumin.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She walks you through the rest of the list, item by item, in a calm voice that has zero emergency in it. By the time you are at the checkout, the body has dropped from a 10 to a 4. The panic was held by an external presence. She did not solve it. She just stayed.",
      },
      {
        speakerId: "sam",
        text: "I'm at the register. Hanging up. Love you. Be home in twenty.",
        emotion: "concerned",
      },
      {
        speakerId: "mia",
        text: "I love you. Tea will be ready.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What Mia just did is the partner-side version of the witness-without-certainty-granting move, applied to acute panic. She did NOT say 'you're not having a heart attack', that sentence, while medically true, would have been received by your panicked body as a denial of what your body was experiencing, and would have escalated the panic. She did not promise that anything would be okay. She gave you a concrete external task, items in produce, items by the avocados, that competed with the interoceptive scanning your body was doing. The cilantro and the limes did the work that two minutes of unfocused 'are you okay' would not have done.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is what right-relating looks like in acute panic. Most untrained partners cannot produce it on the first try; Mia's calibration is the result of two years of accidental practice plus her own intuitive temperament. In L4-2 you will see her produce a similar move under harder conditions, when she is tired and you are spiralling and the easy move is to provide reassurance and the right move is to hold the line. Today she had the easy version.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-call-end",
        text: "End scene.",
        tactic: "The witness-call ending.",
        nextSceneId: "ending-call-mia",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-leave",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Avoidance Trap",
    endingLearnPrompt:
      "You left. The body's relief on the sidewalk was real and the relief was psychoactive. The relief was also the conditioning event, your body just learned that grocery stores produce panic and that leaving solves it. By tomorrow the body will fire low-grade anticipatory anxiety at the thought of any grocery store. By next week, two Instacart orders. By month two, regular Instacart. By month four, the IDEA of a Trader Joe's produces stomach-tightening at home in your kitchen. The repair on Wednesday in Lin's office will be exposure therapy, structured graded re-entry, possibly with Mia present, possibly during a less-busy hour. The exposure work is hard. It is also one of the highest-effect-size treatments in mental health, with response rates in the 60-80% range across well-conducted studies.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Avoidance is the single most reliable predictor of chronic panic disorder. The bodies whose avoidance is most thorough are the bodies whose disorder persists most stably across years. The bodies that re-enter the avoided environments, uncomfortable, deliberate, with a structured plan, are the bodies whose disorder shrinks. Today you got a clean lesson in the trap. Wednesday's session will name it and give you the protocol for closing it. The protocol works. The protocol is also non-negotiable in a way that most CBT for anxiety is not.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-pull-over",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Laundromat",
    endingLearnPrompt:
      "You left, but the panic continued in the parked car, and you experienced its natural peak-and-fall. The body learned partial good news, panic ends on its own when not interrupted and partial bad news, leaving was the move that produced the relief. The maintenance picture for the next month is somewhat better than the full-leave path, somewhat worse than the ride-it path. The eggs-from-Instacart move at the end is the first small instance of avoidance generalising. It is structural, not a moral failing. Lin's likely Wednesday plan will be graded re-entry to Trader Joe's specifically, first time, one item, possibly with Mia, possibly off-peak.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Pull-over panic in the car is the mid-grade version of the avoidance trap. The body has gotten the panic-ends-on-its-own lesson but in a context that still permits the avoidance conditioning to install. The repair via exposure is the same as the full-leave path; the body is one notch closer to the foundation of the work because of the partial peak-and-fall experience. Across forty exposure trials over six months, the conditioning extinguishes.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-dissociate",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Float",
    endingLearnPrompt:
      "You stayed in the store. The body did the shopping, which gave the body weak counter-evidence to the avoidance conditioning. The body did not consciously witness either the panic or its descent, which means the body did not get the lesson available on the ride-it path. Dissociation is not a separate event from panic; it is panic in a different shape, the body's third option after fight-or-flight. Dissociation paths look fine from the outside and feel fine in the immediate aftermath. The cost lands the next time the body is in a similar trigger condition, your body has not learned that panic is rideable, just that panic can be skipped via floating. Across years, dissociation as a panic-management strategy hollows the body out.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The treatment plan for dissociative panic management is similar to the avoidance treatment plan, with one addition, the early sessions of exposure focus on STAYING PRESENT during the panic, not just staying physically in the environment. Lin will introduce grounding-during-panic specifically (5-4-3-2-1 deployed mid-attack, the hand on the cart handle as the touch-anchor). The skill is to not float. The float is the disorder. The presence is the work.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-ride",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Cycle Four",
    endingLearnPrompt:
      "You stopped the cart. You stared at Honey Bunches of Oats. You ran five cycles of box breathing while panic peaked at cycle three. The body did not instantly calm. The body learned, in one trial, that panic CAN be ridden in public, that box breathing recruits parasympathetic activation as a mechanical lever on the autonomic nervous system, and that staying through cycle three is what the work requires. By the checkout your body was at a 5, shaky but functional. SCOTT the cashier got a real smile and a real sentence. You did not buy the olives. You drove home present. You sent Mia a text that named the event and asked for nothing. She replied with tea. The body has the foundation, after this trial, for learning it forty more times. That is the structural shape of recovery from panic.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The ride-it path is the single most powerful panic-management skill available, and it is also the hardest to deploy on the first attempt. The reason it is hard is that cycle three is the moment the body is most certain the breath is not working and most people leave at cycle three because the body's certainty is overwhelming. Cycle three is when the breath is doing its hardest work. Knowing this in advance is most of what makes cycle three survivable. You just gave your body the proof. Across the next year of treatment, this proof becomes the foundation for the interoceptive exposure work Lin will introduce in L4-1, deliberately producing the somatic sensations of panic in controlled settings, with the body learning that the sensations themselves are not dangerous. The ride-it experience today is what makes the L4-1 homework possible.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-call-mia",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Cilantro",
    endingLearnPrompt:
      "You called Mia. She did the right thing, did NOT say 'you're not having a heart attack,' did NOT promise everything would be okay, did NOT ask 'what do you need.' She gave you a concrete external task, items in produce, items by the avocados, that competed with your interoceptive scanning. The cilantro and the limes did the work that two minutes of unfocused reassurance would not have done. By the checkout your body was at a 4. The panic was held by an external presence. The body learned that public panic plus witness on the phone is survivable. This is the partner-side of right-relating to panic, applied in acute conditions, and Mia's calibration is the result of two years of accidental practice plus her own intuitive temperament. The L4-2 scene shows what this same calibration looks like under harder conditions.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The witness-call path produces a slightly different body-learning than the ride-it-alone path. Both are good. The ride-it-alone path teaches the body that panic is rideable WITHOUT external scaffolding, which is the foundation for solo recovery. The witness-call path teaches the body that panic is rideable WITH calibrated witness, which is the foundation for partnered recovery. Most people who recover from panic disorder use both, solo skills for the surprise attacks, partner-witness for the bigger ones. The toolkit is fuller for having both.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety31: Scenario = {
  id: "anx-3-1",
  title: "The Grocery Store",
  tagline: "Sunday, 11:23 a.m. cereal aisle. The body fires. Real panic, the somatic event itself.",
  description:
    "The hardest scene in the arc. Sam at the Trader Joe's on Court Street on a Sunday morning, with bad sleep, three coffees, and lingering Christmas activation. In the cereal aisle, the body produces a real panic attack, the somatic event with the recognised DSM symptom set: chest tightness, shallow breath, tachycardia, cold hands, derealised lights, and the cognitive 'I am dying' content. Five available moves: leave immediately (avoidance trap, conditioning event); leave and pull over (partial avoidance, partial peak-and-fall lesson); stay-but-dissociate (autopilot, body skips the lesson); stay-and-ride-it via box breathing (the skill, cycle three peak, cycle four descent, body learns panic is rideable in public); call Mia for witness-without-certainty-granting (the partner-side of the right-relating move, applied in acute panic). Five endings, with crisis resources surfaced in opening Kanika frame.",
  tier: "premium",
  track: "anxiety",
  level: 3,
  order: 1,
  estimatedMinutes: 16,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 480,
  badgeId: "rode-the-panic",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Box breathing as autonomic lever, 4 in, 4 hold, 4 out, 4 hold; recruits parasympathetic activation; cycle three is the peak where most people leave; cycle four is when the breath is doing its hardest work",
    "Witness-call protocol, partner gives concrete external tasks (cilantro, limes) instead of reassurance; competes with interoceptive scanning; does NOT promise certainty",
    "Panic phenomenology recognised as clinical event, chest, breath, heart, lights, dying-thought are the chemistry of panic, not the condition of dying",
    "The body learns in one trial, panic ridden once becomes the foundation for forty more; structural shape of panic recovery",
    "Crisis resources surfaced, 988 / Crisis Text Line as live tools at the moment they may be needed",
  ],
  redFlagsTaught: [
    "The avoidance trap, leaving the store conditions the body that grocery-stores-produce-panic and leaving-solves-it; generalises to all grocery stores within a month, all public places within a year",
    "The pull-over partial-avoidance, body learns partial good news (panic ends on its own) and partial bad news (leaving was the move that produced the relief)",
    "Dissociation as panic-management, looks fine from outside, feels fine immediately; body did not consciously witness panic or descent; the float is the disorder, the presence is the work",
    "The well-meaning wrong sentence, 'you're not having a heart attack' from a partner mid-panic reads as denial of what the body is experiencing and escalates the attack; medical truth at the wrong moment is the wrong intervention",
  ],
  characters: [INNER_VOICE, SAM, MIA],
  scenes,
};

export default anxiety31;
