/**
 * loving-mira-3-1, "The Numb Day" (INSIDE)
 *
 * Loving Mira, Level 3, order 1. Second inside-POV scenario. Player
 * is Mira. Saturday. Chronic emptiness, the BPD symptom that doesn't
 * make the news.
 *
 * What this scene teaches:
 *   - Emptiness as DISTINCT from depression. Depression has texture
 *     (sad, hopeless, distressing thoughts). Emptiness is the absence
 *     of feeling itself. Many people with BPD describe it as worse
 *     than pain, because the absence is worse than the presence of
 *     suffering. The player has to FEEL this distinction to teach it.
 *   - Feeling-generators as the underlying mechanism. People with BPD
 *     don't pick fights, drink, text exes, or hurt themselves because
 *     of "drama", they do these things to escape the numbness. The
 *     behavior is ANTI-emptiness, not anti-anything-rational.
 *   - Behavioral activation as the boring, unsexy, skilled choice.
 *     Walk the dog. Make coffee. Call your sister. The skill is to
 *     WAIT THROUGH the numbness without filling it with poison.
 *
 * NSSI handling:
 *   The lived experience of BPD emptiness includes the impulse to
 *   self-harm as a feeling-generator. We acknowledge this without
 *   making it a depicted action. The kitchen-scene names the impulse
 *   as one Mira notices in herself, names it as a known pattern, and
 *   the EXTERNAL choices the scenario presents are four non-NSSI
 *   feeling-generators (three poisons, one skill). If a player wants
 *   to read the NSSI impulse acknowledgement as their own current
 *   experience, the inner-voice gives the 988 / Crisis Text Line
 *   resources at the kitchen beat. No path in the scenario depicts
 *   self-harm.
 *
 * Voice: continuing the inside-POV pattern from L2-1. Sparse
 * narration during the body-on-couch frozen beat, let the absence
 * of internal voice itself communicate the absence of feeling. Then
 * tighter narration at the choice points and at endings.
 *
 * Cast: MIRA (POV), VEE (referenced and called in one path), Ezra
 * (the dog, non-character but present), INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "29. Music producer. Saturday morning, eight weeks into the friendship with her FP. Two hours into a frozen body and an empty head.",
  traits: ["sensitive", "intense", "self-aware-in-calm"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const VEE: Character = {
  id: "vee",
  name: "Vee",
  description: "Mira's older sister.",
  traits: ["grounded", "loving", "patient"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME. POV SWITCH + emptiness vs depression
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You are Mira again. This scene is about something the BPD criterion list calls 'chronic feelings of emptiness.' Most people read that as 'feeling sad.' It is not feeling sad. It is the absence of feeling itself.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Depression has texture, heavy, dull, distressing. Emptiness has no texture at all. Research participants describe it as numbness, as 'a sense of not-being,' as a dead leg you can see but not sense. Many people with BPD say emptiness is worse than pain. They will do destabilising things to feel ANYTHING, pick fights, drink, text exes, hurt themselves, because the absence is worse than the presence of suffering.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The skill is not to escape the emptiness. The skill is to wait it out without filling it with poison. This is the hardest skill in BPD recovery, because the emptiness will outlast your willpower. You will need behavioral architecture, not white-knuckle resistance.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "If reading this scene activates your own current experience of self-harm impulses or suicidal ideation: you can leave the scenario at any point. In the United States: 988 (call or text). Crisis Text Line: text HOME to 741741. Both are free, confidential, and answer immediately. If you stay, the scenario will not depict self-harm. It will treat the impulse the way it actually shows up, as an option Mira sees and chooses what to do with.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin-numb",
        text: "Become Mira. Begin.",
        tactic: "The scene opens.",
        nextSceneId: "the-couch-frozen",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE COUCH FROZEN, the absence
  // ===================================================================
  {
    id: "the-couch-frozen",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Saturday. 11:23 a.m.",
      },
      {
        speakerId: null,
        text: "You have been on the couch for two hours.",
      },
      {
        speakerId: null,
        text: "The TV is on the menu screen of a movie you started last night and did not watch. The screen has been showing the same trailer-on-loop for the entire two hours. The volume is low. You did not turn it down, you turned it on at this volume last night and the volume has been the volume since then.",
      },
      {
        speakerId: null,
        text: "Ezra is curled at your feet. Sade is on the back of the couch, sleeping. Your phone is face-down on the coffee table. You have not picked it up since you woke up. You do not remember consciously deciding not to pick it up.",
      },
      {
        speakerId: null,
        text: "There is nothing in your head.",
      },
      {
        speakerId: null,
        text: "Not 'I am sad.' Not 'I am tired.' Not 'I should get up.' There is no thought to interrupt. There is no feeling to identify. If someone walked into the apartment right now and asked you what's wrong, you would be unable to answer the question, because the question presupposes a thing-that-is-wrong, and there is no thing.",
      },
      {
        speakerId: null,
        text: "There is just the absence.",
      },
      {
        speakerId: "inner-voice",
        text: "This is it. This is the symptom. Notice how little narration there is right now. That is on purpose. There is no inner monologue inside the empty body, because the inner monologue is a feature of feeling, and feeling is what is absent.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-the-itch",
        text: "Eventually, something starts.",
        tactic: "The body has to move. The first signal will be small.",
        nextSceneId: "the-itch",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE ITCH, first stirring of the feeling-generator urge
  // ===================================================================
  {
    id: "the-itch",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "11:51 a.m.",
      },
      {
        speakerId: null,
        text: "Something starts. It is not a thought. It is closer to an itch, a low-grade body-restlessness that announces itself in the chest first. You do not know what it is. Then it announces itself again, slightly louder.",
      },
      {
        speakerId: null,
        text: "Do something. Do something. Do something that makes me feel.",
      },
      {
        speakerId: null,
        text: "The body has decided that the absence is no longer tolerable. The body wants ANYTHING, a fight, a song, a fuck, a drink, a cold shower, a phone call, an injury. The body is not picky. The body is asking for evidence that there is a body.",
      },
      {
        speakerId: null,
        text: "You sit up. Ezra adjusts. You become aware that your phone is on the coffee table. You become aware that the kitchen is in the next room. You become aware of the impulses your body is generating, the impulses that, in the past, have been the path out of the empty room.",
      },
      {
        speakerId: null,
        text: "They are familiar.",
      },
      {
        speakerId: null,
        text: "1) Pick a fight. Text the FP. Find the thing she did this week that bothered you and inflate it to verdict-size. The drama-feeling that follows will be terrible and it will be A FEELING.",
      },
      {
        speakerId: null,
        text: "2) Text Cameron. The previous FP. He left without saying goodbye. Texting him will produce a response. The response will produce humiliation, anger, longing, regret. All of which are FEELINGS.",
      },
      {
        speakerId: null,
        text: "3) The bottle of whiskey on top of the fridge. Drinking at noon will not be relaxing. It will be a chemical violation of the morning. The violation IS A FEELING.",
      },
      {
        speakerId: null,
        text: "4) The fourth option. The one that lives one shelf in from the others. The body knows where it is. The body does not need to name it. You do not name it now.",
      },
      {
        speakerId: "inner-voice",
        text: "The fourth option is the one that does not appear as a clickable choice in this scene, on purpose. It is the option that has, at some point in the last six years, been one of the options. It is named here because lying about its existence would be a worse teaching than acknowledging it. The skill we are building is the one that refuses every feeling-generator that costs more than the empty room costs. The fourth one costs the most. It is also, at this exact moment, NOT what your body is reaching for hardest. The first three are louder.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "There is also a fifth path. It is the only path the empty body resists, because it does not deliver a feeling. It delivers an action. Action is not feeling. Action is what generates feeling, eventually, by accident, after you have stopped chasing it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "pick-the-fight",
        text: "Pick up the phone. Open the FP's thread. Find the thing this week. Type it.",
        tactic: "The drama-feeling generator. Cheapest, fastest, will produce hours of feeling. Will also damage the relationship by lunch. The cost is not in the next thirty minutes, it is in tomorrow's repair morning.",
        nextSceneId: "the-fight-picked",
        isOptimal: false,
      },
      {
        id: "text-cameron",
        text: "Open Cameron's thread. He hasn't been texted in eleven months. Type 'hi.'",
        tactic: "The boundary-violation feeling generator. Will produce shame, longing, the sting of his response (or his silence). All three are feelings. They are also the kind of feelings that take weeks to walk back. He is also engaged now, you saw it on Instagram. The harm is not abstract.",
        nextSceneId: "the-cameron-text",
        isOptimal: false,
      },
      {
        id: "the-bottle",
        text: "Stand up. Walk to the kitchen. Reach for the bottle.",
        tactic: "The chemical feeling generator. Slowest of the three drama-paths. The drink at noon will not produce relief, it will produce slowness. By 4 p.m. the slowness will have produced its own depression-shaped feeling, which the body will then mistake for an ending of the empty episode. It is not an ending. It is a swap.",
        nextSceneId: "the-bottle-reached",
        isOptimal: false,
      },
      {
        id: "walk-ezra",
        text: "Get up. Find Ezra's leash. Put on shoes. Take Ezra outside.",
        tactic: "Behavioral activation. The boring skill. It does not deliver a feeling. It delivers a sequence of actions: leash, shoes, door, sidewalk, ten minutes of cold air. By minute eight, Ezra will pull on the leash to greet a dog you do not know. The unknown dog will produce a small, unexpected feeling. That feeling, accidental, unrequested, is what walking through the empty room produces.",
        nextSceneId: "the-walk",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE FIGHT PICKED, drama-feeling generator
  // ===================================================================
  {
    id: "the-fight-picked",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You find the thing this week. It is real, she did do it, she did say something dismissive about your work on Tuesday and you let it go. You let it go because at the time it was a small thing in a good week.",
      },
      {
        speakerId: null,
        text: "You inflate it. You write three drafts. The third draft is the one. You read it back. It is the most articulate thing you have written this week. Every sentence is a knife.",
      },
      {
        speakerId: null,
        text: "You hit send.",
      },
      {
        speakerId: null,
        text: "The relief is immediate. THE BODY HAS A FEELING. The feeling is rage, clean, articulate, justified-feeling rage. The empty room is gone. You are now in a different room.",
      },
      {
        speakerId: null,
        text: "Three dots appear. Then disappear. Then appear. She is composing a response. You are vibrating with the anticipation of the fight.",
      },
      {
        speakerId: "inner-voice",
        text: "You generated the feeling. The feeling came from the place you knew it would come from, a real grievance, inflated. The cost is now coming for you. The fight will run for two hours, possibly four. By the time it ends, you will have feelings of regret and shame to add to the rage, which is more feelings, which is the goal but the FP will have moved one inch closer to the conclusion that this is unsustainable. The empty room you escaped is still there. It will be there next Saturday.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-fight",
        text: "Continue.",
        tactic: "The damage is logged.",
        nextSceneId: "ending-fight",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE CAMERON TEXT, boundary-violation feeling generator
  // ===================================================================
  {
    id: "the-cameron-text",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Cameron's thread is still there. Last message: eleven months ago. 'I'll always love you. I just can't.' His reply was a heart emoji. Then silence.",
      },
      {
        speakerId: null,
        text: "You type 'hi.'",
      },
      {
        speakerId: null,
        text: "Forty-three seconds. He's typing.",
      },
      {
        speakerId: "inner-voice",
        text: "Cameron is engaged. You saw the post in October. The fact that he is typing back at 11:51 on a Saturday means his fiancée is not in the room. The fact that you texted him in the empty room means part of you knew that.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "His message: 'mira. You can't text me. You know you can't text me. Are you okay.'",
      },
      {
        speakerId: null,
        text: "The feelings arrive in sequence. Humiliation first. Then anger. Then a thin, grieving longing. Then the small, sick triumph of having generated this much in twelve seconds of composition.",
      },
      {
        speakerId: null,
        text: "You are out of the empty room. The feeling-generator worked. You are now in a different room, one that will require you to lie to your therapist on Tuesday, to keep this from your FP forever, and to live for the next nine days with the knowledge that you texted an engaged man because you needed to feel something.",
      },
      {
        speakerId: "inner-voice",
        text: "The cost compounds. Most BPD damage runs on this engine: the empty room is so unbearable that you reach for any feeling-generator, including the ones that violate other people. Cameron just had to choose between answering his ex's 'hi' and ignoring it. He chose to answer, kindly. You also just dropped a small bomb in his Saturday morning. The bomb is not abstract. It is in his actual marriage.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-cameron",
        text: "Continue.",
        tactic: "The damage compounds.",
        nextSceneId: "ending-cameron",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE BOTTLE REACHED, chemical feeling generator
  // ===================================================================
  {
    id: "the-bottle-reached",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You stand up. Ezra looks at you. You walk to the kitchen. The bottle of whiskey is on top of the fridge. You take it down. You open it.",
      },
      {
        speakerId: null,
        text: "You pour an inch into a coffee mug, because at noon on a Saturday you cannot use a glass, using a glass would be admitting it.",
      },
      {
        speakerId: null,
        text: "You drink it. It is warm and unpleasant. It generates the feeling of having done something. The feeling is small. The body wants more.",
      },
      {
        speakerId: null,
        text: "You pour a second inch.",
      },
      {
        speakerId: "inner-voice",
        text: "By 4 p.m. you will have had four ounces. You will be slow but not drunk. The slowness will have replaced the empty room with a different room. The new room is depression-shaped. It is also a feeling, which is what the body asked for. The body did not ask for a NICE feeling. The body asked for ANY feeling.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The cost: tomorrow morning will be one of the bad ones. You will not be hungover (four ounces is not enough), but the body will have learned, again, that whiskey at noon is a tool it can use. The tool will be used again. Each use makes the next use cheaper. Most BPD addiction does not start as recreation. It starts as feeling-generation in empty rooms.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-bottle",
        text: "Continue.",
        tactic: "The slowness arrives.",
        nextSceneId: "ending-bottle",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE WALK, behavioral activation
  // ===================================================================
  {
    id: "the-walk",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You stand up. Ezra reads it instantly, his head comes up, ears forward. You go to the door. Pick up the leash. Find your shoes.",
      },
      {
        speakerId: null,
        text: "Each action is harder than it should be. The body is registering 'this is not what I asked for.' The body asked for a feeling. The body got a sequence of small mechanical actions instead.",
      },
      {
        speakerId: null,
        text: "Door. Stairs. Sidewalk. The cold air on your face is not a feeling, it is a sensation. There is a difference. You are aware of the difference.",
      },
      {
        speakerId: null,
        text: "Block one. Block two. Ezra stops to sniff a tree. You stand still and let him. There is no thought yet. The body is still mostly empty.",
      },
      {
        speakerId: null,
        text: "Block three. Ezra pulls toward a small dog you do not know. The owner is a man in his sixties with a kind face. He says 'oh she's friendly' and Ezra and the small dog do the sniff-and-determine ritual. The man asks Ezra's name. You tell him. The man says 'good name.' He smiles. You smile back, automatically, before you have time to decide whether you want to smile.",
      },
      {
        speakerId: null,
        text: "The smile produces a small feeling. It is not engineered. It is a byproduct. It is the first real feeling you have had today.",
      },
      {
        speakerId: "inner-voice",
        text: "This is what walking through the empty room produces. Not a curing, a small, unrequested feeling that arrives by accident, on the sidewalk, because of a dog you don't know and a man with a kind face. The skill of behavioral activation is not 'distract yourself from the emptiness.' It is 'put your body in motion in places where small unrequested feelings can find you.' The feelings find you. They are quieter than the ones the feeling-generators produce. They are also not poison.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "keep-walking",
        text: "Keep walking. Loop the long way home.",
        tactic: "Skilled. The walk is not over yet. More small feelings will accumulate. None will be the size of a fight or a chemical violation. All will be sustainable.",
        nextSceneId: "ending-walk",
        isOptimal: true,
      },
      {
        id: "call-vee-on-walk",
        text: "Take out the phone. Call Vee. Tell her about the morning.",
        tactic: "Skilled. The walk made the call possible. You are no longer paralysed; you can now reach for the witness without the shame of saying 'I am paralysed.' You can say instead 'I had a numb morning. I'm walking it off. Hi.' That is a different first sentence than the L2-1 emergency one.",
        nextSceneId: "the-vee-on-walk",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE VEE ON WALK, calling Vee mid-walk
  // ===================================================================
  {
    id: "the-vee-on-walk",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["vee"],
    dialog: [
      {
        speakerId: null,
        text: "She picks up.",
      },
      {
        speakerId: "vee",
        text: "Hi baby. What's the weather over there.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She does not ask 'how are you.' She asks about the weather. She is reading your tone in three syllables. She knows.",
      },
      {
        speakerId: "mira",
        text: "Cold and clear. I had a numb morning. I'm walking Ezra. I just wanted to hear a voice.",
        emotion: "neutral",
      },
      {
        speakerId: "vee",
        text: "Good. Did you eat.",
        emotion: "knowing",
      },
      {
        speakerId: "mira",
        text: "Not yet. I'll get a bagel after.",
        emotion: "neutral",
      },
      {
        speakerId: "vee",
        text: "Okay. I'm gonna talk to you about my dog and my landlord and a thing my coworker said and you can be quiet and just listen, and then we'll hang up, and you'll get the bagel. Sound okay?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She talks. You walk. She tells you about her landlord wanting to repaint the hallway, her dog refusing to eat his new food, a thing her coworker said about a parent meeting. None of it requires a response. None of it is asking you to be okay. It is just human voice in your ear during a cold walk.",
      },
      {
        speakerId: null,
        text: "By minute fourteen you laugh at something she says about the landlord. The laugh is small. It is also a real feeling. It is the second one of the morning.",
      },
      {
        speakerId: "inner-voice",
        text: "Vee just modeled the highest form of witnessing, the form where she is not trying to fix anything. She didn't ask 'what triggered this' or 'do you need to talk to Alana.' She just talked through a Saturday with a sister who was walking it off. Most attempts to help during emptiness fail because they ASK something of the empty body. Vee asked nothing. She gave a voice. The voice produced a laugh. The laugh produced a feeling. None of it was engineered.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-vee-walk",
        text: "Continue.",
        tactic: "The scene closes on the cleanest available outcome.",
        nextSceneId: "ending-vee-walk",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-fight",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Fight",
    endingLearnPrompt:
      "You generated the feeling. It worked. The empty room is gone. The cost is now landing. The fight will run for hours. By tonight you will have rage, shame, regret, exhaustion, the full menu of feelings the body asked for. You will also have spent a piece of relational capital that takes weeks to rebuild. Most BPD relationships die from cumulative use of THIS feeling-generator: the manufactured grievance during the empty room. Your therapist has a name for it. The skill is to recognise the empty room as the trigger BEFORE the feeling-generator deploys, because once it deploys, the architecture of the cascade does the rest. Tomorrow you can repair this, small, honest, no five-paragraph apology. Today: drink water, walk Ezra, sleep early.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The fight produced what it always produces. The empty room is the underlying problem. The fight is what the empty room reaches for when behavioral architecture is not in place. Reach for behavioral architecture. The empty room cannot be fought. It can only be walked through.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-cameron",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Cameron",
    endingLearnPrompt:
      "You generated the feeling. It worked. The cost compounds across other people. Cameron is now carrying a small piece of damage in his marriage. You are now carrying a secret from your FP and a lie you will need to maintain at therapy on Tuesday. The empty room is still there. You also just confirmed for yourself that you are the kind of person who reaches for old wounds when the empty room is loud. The empty room does not care that the feeling-generator hurt three people. The empty room is solved by being filled. The skill is to fill it with cold air, dog walks, and sister-voice instead of with shrapnel.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The empty room is not Cameron-shaped. It is empty. Every time it is filled with Cameron-shaped pain, it teaches the body that Cameron-shaped pain is the antidote to emptiness. He is not the antidote. The walk is. Tell your therapist about this on Tuesday. Don't lie. The lie compounds. The truth, told in DBT, gets metabolised.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-bottle",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Whiskey at Noon",
    endingLearnPrompt:
      "You generated the feeling. It worked. By 4 p.m. you have had four ounces and the slowness has replaced the emptiness. The body did not ask for a nice feeling, it asked for any feeling. It got one. The cost is that the body just learned, again, that whiskey at noon is a tool it can use. Each use makes the next use cheaper. Most BPD addiction does not start as recreation. It starts as feeling-generation in empty rooms. Tomorrow's empty room and there will be one, will be slightly more whiskey-shaped than today's was. The skill is to break the engine before it becomes architecture.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The chemical feeling-generator is the slowest poison of the three. It does not damage relationships in the next six hours; it damages the body's relationship to feeling-generation across years. Tomorrow: pour the bottle out. Tell your therapist. Replace the whiskey-on-the-fridge with something that is not a tool the empty room can reach for.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-walk",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Long Way Home",
    endingLearnPrompt:
      "You walked through it. The empty room did not get cured, it got walked through. By the time you got home, Ezra was tired, you had picked up a bagel from the place around the corner, the cold air had produced four small feelings in forty-five minutes, none of them engineered. None of them were the size of a fight or a chemical violation. All of them were sustainable. You will have empty mornings again. The skill is to know what to reach for next time. You just practiced. The next empty morning will be slightly easier, because today's body learned that the walk produced what the feeling-generators promised, without the cost.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Behavioral activation is the most underrated skill in BPD recovery. It is boring. It does not deliver feelings. It puts the body in places where small unrequested feelings can find it. The walking, the dog, the bagel, the man with the kind face. None of it was engineered. All of it was the skill working. Most healthy mornings, including for people without BPD, look like this.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-vee-walk",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Voice in the Ear",
    endingLearnPrompt:
      "You walked. You called Vee. She gave you a voice without asking you to be okay. You laughed twice in fifteen minutes. Both times at things her landlord did. You bought a bagel. By 1 p.m. you were home. The empty room was not cured; it was filled by accident, with cold air and dog leash and a sister telling a story about a hallway color. This is what witness-relationships are for. They do not solve the symptom. They make it possible to walk through the symptom without filling it with poison. Most people with BPD do not have a Vee. You do. Use her every time the cascade tries to convince you that you don't need her.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The first sentence on the call was three words: 'I had a numb morning.' That sentence is the skill. The shame about saying it is what most empty bodies will not do. You did. The bagel got bought. The morning got walked. The pattern got broken without anyone seeing it break, including you, until afterwards. That is what 93% remission across ten years actually looks like, in the wild.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira31: Scenario = {
  id: "lm-3-1",
  title: "The Numb Day",
  tagline: "Saturday. Two hours frozen. The fourth option lives one shelf in from the others.",
  description:
    "Second inside-POV scenario. The player is Mira on a Saturday morning, two hours into chronic emptiness. The scenario teaches the BPD-specific symptom of emptiness as DISTINCT from depression, the absence of feeling itself, often described as worse than pain. Four feeling-generator paths play out the cost of each: the manufactured fight with the FP, the boundary-violating text to an old FP, the bottle on top of the fridge, and the walking-with-the-dog skill. NSSI is acknowledged in the kitchen-impulse beat without being depicted; crisis resources are surfaced in the opening frame.",
  tier: "premium",
  track: "loving-mira",
  level: 3,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 380,
  badgeId: "emptiness-walked",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Emptiness as distinct from depression, absence of feeling, not heavy feeling",
    "Behavioral activation as the boring skilled choice, the only path that does not deliver a feeling but DOES produce sustainable feelings by accident",
    "The first-sentence-out-loud move ('I had a numb morning') as the witness-relationship skill",
    "Recognising the empty room as the trigger before the feeling-generator deploys",
  ],
  redFlagsTaught: [
    "The manufactured fight as drama-feeling-generator, fastest, most relationally expensive",
    "Reaching for old FPs as boundary-violation feeling-generator, costs cascade across other people",
    "Whiskey at noon as chemical feeling-generator, slowest poison, becomes architecture across years",
    "The fourth-option (NSSI) named-not-depicted, acknowledged as part of lived experience without instruction",
  ],
  characters: [INNER_VOICE, MIRA, VEE],
  scenes,
};

export default lovingMira31;
