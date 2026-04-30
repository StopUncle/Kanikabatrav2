/**
 * loving-mira-2-1, "Are We Okay?" (INSIDE)
 *
 * Loving Mira, Level 2, order 1. The first POV-switch scenario in the
 * track. Player IS Mira. The "you" in this scene refers to her body,
 * her kitchen, her dogs, her panic. Six weeks after The Loft. Three
 * hours after a perfect dinner.
 *
 * What this scene teaches:
 *   - Splitting from inside. The pedagogical core of the track.
 *     A neutral observation at dinner, he laughed at the joke but
 *     didn't quite meet your eyes for the second beat, escalates
 *     during the drive home into the THOUGHT: he's going to leave.
 *     The thought does not feel like a thought. It feels like a fact
 *     that has just been revealed. The player needs to FEEL this —
 *     not be told it.
 *   - The skill of TIPP (Temperature, Intense exercise, Paced
 *     breathing, Paired muscle relaxation). The player gets to choose
 *     it and feel how unnatural it is. Cold water on the face when
 *     every cell of your body is begging you to send the text. The
 *     skill is not to stop the thought. The skill is to delay the
 *     action that the thought wants to drive.
 *   - The cycle, in microcosm. The "are we okay?" path is allowed to
 *     play out the way it actually plays out, text sent, FP replies,
 *     panic resolves, morning brings shame. No punishment. Just the
 *     full lap of what that choice produces.
 *   - The Vee path, calling someone who has survived this. The
 *     hardest part is the first sentence: "I am spiraling and I need
 *     someone to talk me down."
 *
 * Voice direction for this scene specifically:
 *   - Kanika narration is SPARSE inside the splitting episode. Too
 *     much narration breaks the inside experience. She comes in at
 *     the opening (frames the POV switch), at choice points, and at
 *     the endings.
 *   - Mira's POV uses "you" but the "you" is her. The player will
 *     orient from context: the dogs are Ezra and Sade, the loft is
 *     Williamsburg, the FP is referred to as "her" or by the new
 *     name we'll need.
 *   - For this scene we'll call the FP "her" because the player's
 *     avatar in scenes 1-2 was open-coded female-default. If a male
 *     FP playthrough shipped, this scene would use "him." Track
 *     branching by player gender is a v2 concern.
 *
 * Cast: MIRA (now POV character), VEE (introduced here as voice on
 * phone), INNER_VOICE (Kanika narration). All inline for now.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "29. Music producer. Six weeks into the friendship with her FP. Tonight she is the POV. The 'you' is her body, her kitchen, her dogs, her panic.",
  traits: ["sensitive", "intense", "self-aware-in-calm"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const VEE: Character = {
  id: "vee",
  name: "Vee",
  description:
    "Mira's older sister. Three years older. Lives in Seattle. Has been on the receiving end of these calls for fifteen years. Has been through her own version of this and survived. The person Mira can call when she can't call the FP.",
  traits: ["grounded", "loving", "patient", "knowing"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME. POV SWITCH ANNOUNCEMENT
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Stop. Before this scene begins, you need to know something. For the next nine minutes you are not the friend. You are Mira.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The 'you' from here on is her body, her kitchen, her dogs, her panic. The FP, the person you played as in the loft and at the three-week mark, is now the person on the other end of the phone, asleep, three miles away.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "We do this because there is no way to teach what splitting feels like by describing it from outside. You have to be inside the body when the thought arrives. The choices you make in this scene are not what you would do, they are what she could do. The skill is to feel which ones are skilled.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin-inside",
        text: "Become Mira. Begin.",
        tactic: "The POV switch.",
        nextSceneId: "the-car",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE CAR, driving home, the thought arrives
  // ===================================================================
  {
    id: "the-car",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "10:47 p.m. you are driving home from her apartment. The dinner was three hours. Your hands are still warm from the bowl of pasta she handed you across the kitchen island. The radio is on low. You are happy in the specific way that can be located in the body, somewhere in the chest, behind the sternum, slightly to the left.",
      },
      {
        speakerId: null,
        text: "You are replaying the dinner. This is a thing you do, you replay good evenings the way other people replay good music. You replay the joke you told about the producer. You replay her laughing.",
      },
      {
        speakerId: null,
        text: "She did laugh. The first beat was real. The second beat she laughed but didn't quite meet your eyes for that second beat. She looked at her wine. Then back at you. Maybe one second. Maybe less than one second. You did not notice it at the table. You are noticing it now in the car.",
      },
      {
        speakerId: null,
        text: "Your stomach goes out from under you.",
      },
      {
        speakerId: null,
        text: "The thought arrives whole, like a sentence someone has handed you in a sealed envelope:",
      },
      {
        speakerId: null,
        text: "She's going to leave.",
      },
      {
        speakerId: null,
        text: "It does not feel like a thought. It feels like a fact you have just been informed of. It feels like the secret meaning of the second beat. It feels like the thing you should have known when you stood at her counter putting on your coat. It feels like you have been a fool for three hours.",
      },
      {
        speakerId: null,
        text: "Your hands on the steering wheel are cold.",
      },
    ],
    choices: [
      {
        id: "to-the-kitchen",
        text: "Drive home. The thought rides in the passenger seat.",
        tactic: "There is no choice yet. The body is in transit. The decision point is the kitchen.",
        nextSceneId: "the-kitchen",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE KITCHEN, home, body, decision point
  // ===================================================================
  {
    id: "the-kitchen",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "11:14 p.m. you are home. Ezra is at the door, tail going, eyes too bright. You crouch and put your face in his neck and stay there for ninety seconds. Sade is on the couch and does not get up. Sade only gets up for things that are calm.",
      },
      {
        speakerId: null,
        text: "You stand. The kitchen light is on because you left it on. Your phone is in your back pocket and feels like a heated stone. The thought is still riding you.",
      },
      {
        speakerId: null,
        text: "She's going to leave.",
      },
      {
        speakerId: null,
        text: "You know, you KNOW, that this thought is not necessarily a fact. You have done six weeks of work in your therapist's office about this thought. Dr. Reyes has named the shape of it. You can say the word for it: SPLITTING. You can say the words that come after it: AMYGDALA. PREFRONTAL. CASCADE.",
      },
      {
        speakerId: null,
        text: "Saying the words does not make the thought less true.",
      },
      {
        speakerId: null,
        text: "Your phone is heating up in your back pocket. There are four things you can do with this body in this kitchen at 11:14 p.m.",
      },
      {
        speakerId: "inner-voice",
        text: "She has the framework. She has the vocabulary. She is in the worst part of the cascade, the part where the framework feels like an academic exercise about a thought that, right now, feels indistinguishable from a fact. The skill she has been practicing is for this exact ten minutes. Notice that the skill is not to stop the thought. The skill is to delay the action.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "send-the-text",
        text: "Take out the phone. Open her thread. Type: 'are we okay?'",
        tactic: "The urge. The thing every cell in your body is asking for. The text will get a reply. The reply will resolve the panic, for tonight. The cost is tomorrow.",
        nextSceneId: "the-text-sent",
        isOptimal: false,
      },
      {
        id: "use-tipp",
        text: "Walk to the bathroom. Run the cold tap. Put your face in the sink for thirty seconds.",
        tactic: "TIPP. Temperature. The dive reflex slows the heart rate, redirects blood, gives the prefrontal cortex a half-second to come back online. The skill. It will not stop the thought. It will buy you the gap between the thought and the action.",
        nextSceneId: "the-tipp",
        isOptimal: true,
      },
      {
        id: "spiral-on-social",
        text: "Open Instagram. Look at her latest post. Scroll her stories. Look for evidence.",
        tactic: "The cascade. Every scroll generates more material to feed the thought. By minute twelve you will have seven new pieces of 'evidence' for an idea that began as a half-second of eye contact.",
        nextSceneId: "the-spiral",
        isOptimal: false,
      },
      {
        id: "call-vee",
        text: "Call Vee.",
        tactic: "The hardest one. Calling Vee requires saying out loud, to a person, that you are spiraling. The shame of saying it is what makes most people not call. The reason it is the skill is that Vee already knows. She has been there. She has the script.",
        nextSceneId: "the-vee-call",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE TEXT SENT, player chose the urge
  // ===================================================================
  {
    id: "the-text-sent",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You take the phone out. Your hands are shaking, not visibly, but you can feel them. You open her thread. The last message is from her, sent at 10:09: 'safe drive ❤️'.",
      },
      {
        speakerId: null,
        text: "You type. Then delete. Then type. Then delete.",
      },
      {
        speakerId: null,
        text: "are we okay?",
      },
      {
        speakerId: null,
        text: "You stare at the three words. You know what sending them will do. You know what it will MAKE her do. You also do not, at this exact second, care, because not sending them feels worse than the cost of sending them.",
      },
      {
        speakerId: null,
        text: "You hit send.",
      },
      {
        speakerId: null,
        text: "The relief is immediate and obscene. The act of sending released something. You realise, distantly, that the relief is the dopamine hit, that you have been training your nervous system, for six weeks, to associate sending the text with relief. You have just rewarded yourself for sending the text. You have just made it harder to not send the next one.",
      },
      {
        speakerId: null,
        text: "Three dots appear on her end. Almost immediately.",
      },
      {
        speakerId: null,
        text: "'yes baby of course we are. You good? did something happen?'",
      },
      {
        speakerId: null,
        text: "The panic, the THOUGHT, the SHE'S-GOING-TO-LEAVE, drains out of you in eight seconds. You can FEEL it draining, like a tub. By the time you type your reply your hands are warm again. The thought has not just been disproven; it has been retroactively erased. Of course she's not going to leave. You feel stupid for having thought it. You feel stupid for having sent the text.",
      },
    ],
    choices: [
      {
        id: "to-the-text-morning",
        text: "Reply: 'no, sorry, just got in my head. Love you. Sleep good.'",
        tactic: "The repair text. Already drafted in your head. You will say it. You will sleep. You will see what tomorrow morning brings.",
        nextSceneId: "the-text-morning",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE TEXT MORNING, the next morning, after the text path
  // ===================================================================
  {
    id: "the-text-morning",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "8:47 a.m. you wake up. You check the phone. There is no new message from her since last night's exchange. You expected one. The absence of one is its own data.",
      },
      {
        speakerId: null,
        text: "You re-read the thread. The 'are we okay?' looks small in daylight. Three words. They look like the three words of someone who is asking the universe to confirm she is loved at 11:14 p.m. which is what they were.",
      },
      {
        speakerId: null,
        text: "You feel the shame in your stomach now, not as panic, as a slower, heavier version of itself.",
      },
      {
        speakerId: null,
        text: "You have to send something this morning. The question is what.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the part of the cycle that is not photographed. The morning. The shame. The 'what do I say to clean this up.' The skill in the morning is to not over-correct. Big apologies put a load on her she will then have to manage. Small honest acknowledgments let the moment rest. The version of yourself that lives at 11:14 p.m. is real. The version that wakes up at 8:47 a.m. is also real. The repair is in admitting both, briefly, then continuing the day.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "small-repair",
        text: "Send: 'morning. Last night's text was me spiraling, you didn't do anything. Coffee?'",
        tactic: "The skilled morning move. Names what happened, takes the responsibility, moves the day forward. Doesn't make her your therapist. Doesn't apologise eight times.",
        nextSceneId: "ending-text-skilled",
        isOptimal: true,
      },
      {
        id: "big-apology",
        text: "Send a long apology. Five paragraphs. 'I'm so sorry, I know it's exhausting, I'm working on it, please tell me you're not pulling away…'",
        tactic: "The over-correction. You just put a 500-word emotional task on her plate before she has had her coffee. She will respond kindly. She will also be a little tired. The over-apology is its own ask.",
        nextSceneId: "ending-text-over-corrected",
        isOptimal: false,
      },
      {
        id: "go-quiet-in-shame",
        text: "Don't send anything. Wait for her to text first.",
        tactic: "Avoidance dressed as humility. You've made her last-night the responsibility for repairing this morning. She will text first, she always does and she'll wonder for an hour what changed. The shame becomes hers to manage.",
        nextSceneId: "ending-text-silent",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE TIPP, player chose the skill
  // ===================================================================
  {
    id: "the-tipp",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You walk to the bathroom. The thought walks with you. The thought gets louder when you turn the cold tap on, because the thought knows you are about to do something to it.",
      },
      {
        speakerId: null,
        text: "Cup the water in your hands. Lean into the sink. Put your face down.",
      },
      {
        speakerId: null,
        text: "The cold is shocking. Your body does the thing your therapist said it would do, the dive reflex, the slowing of the heart. You stay in the cold for thirty seconds. You count. You can hear yourself counting.",
      },
      {
        speakerId: null,
        text: "When you stand back up the thought is still there. SHE'S GOING TO LEAVE. It is still there in the same words. But the BODY around the thought is different. The hands are not shaking. The chest is not collapsing. The thought is now a sentence in your head instead of a fact in your stomach.",
      },
      {
        speakerId: null,
        text: "You can think the thought without obeying it.",
      },
      {
        speakerId: "inner-voice",
        text: "This is what skilled distress tolerance feels like. It is not the absence of the urge. It is the gap between the urge and the action. Thirty seconds of cold water did not cure splitting. It bought you the prefrontal cortex back. The thought is identical. Your relationship to it is not.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-to-bed",
        text: "Dry your face. Don't touch the phone. Go to bed.",
        tactic: "The cleanest aftermath. The skill worked. The skill produces a gap. You used the gap to do nothing, which, tonight, is the correct action.",
        nextSceneId: "ending-tipp-clean",
        isOptimal: true,
      },
      {
        id: "text-her-anyway",
        text: "Now that you can think clearly, send a message anyway but a clean one. Not 'are we okay.' Just: 'tonight was lovely. Sleep good.'",
        tactic: "Skilled. The TIPP gave you back the prefrontal cortex; you used it to send the text the calm version of you wanted to send. This is fine. This is not the same as the panic-text. Different chemistry, different intent.",
        nextSceneId: "ending-tipp-warm-text",
        isOptimal: true,
      },
      {
        id: "still-spiral",
        text: "The thought is quieter but still there. Open Instagram anyway.",
        tactic: "The 30 seconds of cold water bought you a window. You used the window to walk back into the cascade. The skill is not single-shot, it requires staying inside the gap until the gap becomes the new normal.",
        nextSceneId: "the-spiral",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE SPIRAL. Instagram cascade
  // ===================================================================
  {
    id: "the-spiral",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Instagram is open. Her grid is the same as it was this morning. Her latest post is from Sunday. You scroll the stories.",
      },
      {
        speakerId: null,
        text: "8:13 p.m., a photo of the pasta you ate together. Caption: 'Tuesday-night chef energy ❤️'",
      },
      {
        speakerId: null,
        text: "You feel the brief warmth of evidence-for-the-good. Then you look closer. The heart is red, not the warm gold one she usually uses. Why a red heart. She always uses the warm gold one with you. The red one is the one she uses for her family. Why has she demoted the heart.",
      },
      {
        speakerId: null,
        text: "You scroll back further. Last week. A story from a party you weren't at. A tagged friend you don't know. The friend is, you check, twenty-six, gorgeous, a producer. Oh. Mira mentioned this friend twice last week. You hadn't thought about it. You're thinking about it now.",
      },
      {
        speakerId: null,
        text: "The cascade is on. Every twenty seconds it generates a new piece of 'evidence.' By the time you have been scrolling for fourteen minutes, you have built a coherent case for the thought you started with. You have a list now. You could text it to her in numbered form.",
      },
      {
        speakerId: null,
        text: "Your hands are not warm. Your stomach is not under you. The thought is no longer a thought, it is a TIMELINE.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the cascade. The thought arrived as one half-second of eye contact and is now a fourteen-minute case. The cascade is not lying. It is also not seeing reality. It is selecting evidence for the verdict that was already announced. Pattern-matching looking for confirmation. Without intervention, the next move is the text. The cascade has built the case for it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "text-from-cascade",
        text: "Send her the case. All of it. 'I see what you're doing.'",
        tactic: "The full cycle. The case feels true. The text will be a paragraph. By morning you will have done damage that takes a week to repair. The 'are we okay' text route was a mercy compared to this.",
        nextSceneId: "ending-spiral-blew-up",
        isOptimal: false,
      },
      {
        id: "lock-the-phone",
        text: "Throw the phone on the bed. Walk into the bathroom. Run the cold water. Belated TIPP.",
        tactic: "Late skill. The cascade has done damage to your nervous system already, but you have stopped feeding it. Cold water at minute fourteen is harder than cold water at minute zero and still effective.",
        nextSceneId: "ending-spiral-stopped",
        isOptimal: true,
      },
      {
        id: "call-vee-from-cascade",
        text: "Call Vee. Tell her the case. Let her show you what's wrong with it.",
        tactic: "Asks for help mid-cascade. The shame of doing this is real, you are admitting to your sister that you have been spiraling for fifteen minutes. Vee will not punish you for that. Vee will know exactly what to do with it.",
        nextSceneId: "the-vee-call",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE VEE CALL
  // ===================================================================
  {
    id: "the-vee-call",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["vee"],
    dialog: [
      {
        speakerId: null,
        text: "You hit call before the part of you that doesn't want to hit call gets a vote. It rings twice. She picks up. It is 8:14 p.m. her time.",
      },
      {
        speakerId: "vee",
        text: "Hi, baby. What's going on.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She did not ask 'how are you.' She asked 'what's going on.' She knows you do not call at 11 p.m. her sister's time unless something is going on.",
      },
      {
        speakerId: null,
        text: "You start to talk. The first sentence comes out wrong. The second one is closer. The third one is: 'I am spiraling. I need someone to talk me down.'",
      },
      {
        speakerId: "vee",
        text: "Okay. I'm here. Tell me what your brain is telling you. The whole sentence. Don't dilute it.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You tell her the sentence. SHE'S GOING TO LEAVE. You tell her about the second beat at the dinner. About the eyes not quite meeting yours. You can hear how thin the evidence is when you say it out loud to a person who is not also riding the cascade.",
      },
      {
        speakerId: "vee",
        text: "Mm. Okay. I love you. I'm going to ask you three questions. Don't answer fast.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "One: when she dropped you off, did she kiss you.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "Two: did she say something specific about tomorrow.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "Three: have you eaten today.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You think. The kiss was at the door. The kiss was, your hand goes to your mouth, the kiss was a real one. She said 'I'll text you in the morning.' She said something about coffee. You ate at her house but you didn't eat lunch and you didn't eat between the dinner and now.",
      },
      {
        speakerId: "vee",
        text: "Okay. So we have: a real kiss, a forward-paced sentence about tomorrow, and a low-blood-sugar nervous system that has been on for sixteen hours. Mira. Listen to me. SHE'S GOING TO LEAVE is not a thought. It is a body alarm dressed as a thought. We have all three pieces of evidence pointing the other way. Drink water. Eat a piece of bread. I'm staying on the phone until you do.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Vee just modeled what level-5 validation looks like, validation in terms of present circumstances, not platitudes. She did not say 'you're being silly.' She did not say 'she loves you, of course.' She gathered the actual data. She named the body alarm. She gave you a one-step physical task. This is not magic. This is what every untrained nervous system needs and almost never gets.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "do-the-bread",
        text: "Walk to the kitchen. Get the bread. Eat it. Stay on the phone.",
        tactic: "Compliance. The skilled move. You did not have to be convinced. You just had to do the next physical thing.",
        nextSceneId: "ending-vee-saved",
        isOptimal: true,
      },
      {
        id: "argue-the-bread",
        text: "Try to argue the case. 'But the second beat, she really did look away, '",
        tactic: "The cascade resists. The skill is to NOT argue the case during the cascade. The case will be available to argue tomorrow, in daylight, with a glass of water. Don't argue it now.",
        nextSceneId: "ending-vee-resisted",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-text-skilled",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Cycle, In Microcosm",
    endingLearnPrompt:
      "You ran the full cycle in eleven hours. Trigger at 10:50, panic-text at 11:14, immediate relief, shame at 8:47, skilled morning repair. Your FP forgave it within fifteen seconds last night and accepted the morning repair without performance. The relationship survived. The cost was a small dose of relational debt, she knows now that you spiral, that you reach for her, that you can also clean it up. Some of that is intimacy. Some of it is load. Both can be true. The skill in the cycle is not preventing it; it is keeping the morning-repair cleaner than the panic-text. You did. The next time you'll have a chance to skip the panic-text entirely.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Splitting is not chosen. The thought arrived. You acted on it. You repaired well. Note that the part of this you have full control over is the morning, not the night. Don't try to be heroic about the night. Be skilled about the morning.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-text-over-corrected",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Five-Paragraph Apology",
    endingLearnPrompt:
      "The five-paragraph morning apology is its own ask. You handed her, before her coffee, an emotional task: please tell me you're not pulling away. She will perform that task, the relationship demands it of her and she will be slightly tired afterwards. The over-apology is the cousin of the panic-text. They share a parent: 'I cannot tolerate not knowing she still loves me.' Tomorrow's skill is to make the apology one sentence shorter. Then the next day, one sentence shorter again. Eventually it is a sentence.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Big apologies feel like accountability. Often they are accountability dressed as 'please regulate me.' The discipline is to take responsibility in fewer words. Fewer words, less load.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-text-silent",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Silent Morning",
    endingLearnPrompt:
      "Going quiet after a panic-text reverses the load. You sent the message that asked her to confirm the relationship; she confirmed it kindly; and now you have left her to wonder for an hour what changed. The shame became hers to manage. This is the move that erodes the FP slowly, they spend an hour decoding your silence, and the silence is louder than the panic-text was. Pick up the phone. Repair small. The silence is more expensive than the words.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Avoidance dressed as humility is still avoidance. The repair takes ten seconds and three words. 'Morning. Sorry. Coffee?' It does not have to be elegant. It has to be sent.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-tipp-clean",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Cold Water Worked",
    endingLearnPrompt:
      "You used the skill. The skill bought the gap. The gap held. You went to bed. Tomorrow morning will look like a normal Wednesday because you did not turn last night's body alarm into an event. This is what skilled distress tolerance produces, not a feeling of victory, but the absence of debris. There is no message to repair. There is no Instagram trail. There is no Vee-call to acknowledge. Your FP will text you in the morning the way she said she would, and the day will be the day. The skill is silent and durable. Most healthy nervous systems are.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "What you just did is the most underrated thing in BPD recovery. You felt the urge, used the skill, and produced no evidence of either. The pattern broke without anyone seeing it break. That is what 93% remission across ten years actually looks like, thousands of these silent wins.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-tipp-warm-text",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Tonight Was Lovely",
    endingLearnPrompt:
      "You used the skill, got the prefrontal cortex back, and used the new clarity to send the message the calm version of you wanted to send all along. This is the 'are we okay' text rewritten by someone who is no longer drowning. Same impulse to reach toward her. Different chemistry, different signal. She will read it as warmth. She will sleep with the smile on her face that the panic-text would have erased. You closed the day with care instead of with a body alarm.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The skill is not the absence of texting. The skill is texting from the calm body instead of the alarmed one. Same words sometimes. Different teeth.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-spiral-blew-up",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Case",
    endingLearnPrompt:
      "You sent the case. Numbered paragraphs. The red heart, the tagged friend, the second beat. Your FP woke up to it at 6 a.m. she did not respond for forty minutes. Then she called. The conversation was hard. She did not leave you, she does love you but tonight, when she goes to bed, she will think for the first time about whether this is sustainable. You have not lost her. You have moved the conversation about losing her from her side of the relationship to yours. This is the kind of cycle that can take weeks of small repairs to digest. The track will give you the chance to do that work in the next scene. Tonight: get water. Sleep.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The case felt like seeing reality. It was the cascade selecting evidence. There is no way to tell the difference from inside the cascade, that is the whole problem. The skill is to never argue the case while the cascade is running. Argue it tomorrow. The case will still be there. So will daylight.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-spiral-stopped",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Late Skill",
    endingLearnPrompt:
      "Fourteen minutes into the cascade, you stopped feeding it and walked into the bathroom. The skill at minute fourteen is harder than the skill at minute zero, your nervous system has already done damage to itself, your hands are colder, the thought has more architecture. The cold water still works. It does less than it would have at the start, but it is still better than the next fourteen minutes would have been. You went to bed. Your FP will not see what tonight almost was. The skill is real. So is the cost of having delayed it. Both are worth knowing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Late skill is still skill. The discipline is to recognise the cascade earlier next time, because the cost is not the action you avoid, it is the wear on the nervous system from the fourteen minutes you spent feeding it. The skill is cheaper at minute zero. Use it cheaper.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-vee-saved",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Vee",
    endingLearnPrompt:
      "You ate the bread. You stayed on the phone for twenty more minutes. By the end, the thought was a thought again, not a fact. Vee did not save you; she just reminded your nervous system how to be calm in the presence of a person who has been calm with you a thousand times. This is what a witness relationship is for. Most people with BPD do not have a Vee. You do. Use her every time the cascade tries to convince you that you don't need her. The next time it is not 11 p.m., it is just an hour where you wanted to call her and you did, before the cascade started, that's what maintenance looks like.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The hardest part of the Vee path is the first sentence. 'I am spiraling. I need someone to talk me down.' The shame of saying it out loud is what most nervous systems will not do. The reason it works is not Vee. It is that you said it out loud to a person who already knows. Witness is a real skill. So is being a person who has trained one Vee in their life to be it.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-vee-resisted",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Arguing the Case",
    endingLearnPrompt:
      "You called Vee. Then you tried to argue the case to her. She loves you, so she listened. She did not punish you for it. But the call did not do what it could have done, because you spent the call defending the cascade instead of receiving the calm. The skill of asking for help includes receiving the help once it is offered. Vee is still there. The case is still wrong. Tomorrow you can call her and acknowledge that you knew she was right and couldn't accept it in the moment. She will not be surprised. That is part of what loving someone with BPD looks like.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The cascade does not want to be talked out of the case. The cascade wants to recruit Vee into agreeing. When she doesn't, the cascade reads it as 'Vee is also against me now.' The discipline is to receive Vee's three questions, do the physical task, and argue the case tomorrow when you are both available to.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira21: Scenario = {
  id: "lm-2-1",
  title: "Are We Okay?",
  tagline: "11:14 p.m. three words. The thought is not a thought, it is a verdict.",
  description:
    "First inside-POV scenario in the track. The player IS Mira. Driving home from a perfect dinner, a half-second of eye contact she didn't quite register at the table compounds into the thought she's-going-to-leave. The scenario teaches splitting from inside, the cold water of TIPP, the panic-text and its repair morning, the cascade on Instagram, and the call to Vee who has the script. No path 'wins.' Each path delivers a real consequence the player can feel.",
  tier: "premium",
  track: "loving-mira",
  level: 2,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 380,
  badgeId: "splitting-survived",
  startSceneId: "the-frame",
  tacticsLearned: [
    "TIPP (Temperature) as the gap-buying skill, what it actually feels like in the body",
    "The panic-text-and-morning-repair cycle as a survivable pattern, not a relationship-ending one",
    "Calling a witness mid-cascade as the highest-skill move, first sentence carries the whole load",
    "Receiving validation level-5 (present-circumstances) instead of arguing the case",
  ],
  redFlagsTaught: [
    "Splitting cascade architecture, half-second of eye contact compounds to a fourteen-minute case",
    "Instagram as cascade fuel. Every scroll generates new 'evidence' for the verdict",
    "The panic-text dopamine loop, sending the text rewards the nervous system for sending the text",
    "The over-apology as a covert ask for regulation, the cousin of the panic-text",
  ],
  characters: [INNER_VOICE, MIRA, VEE],
  scenes,
};

export default lovingMira21;
