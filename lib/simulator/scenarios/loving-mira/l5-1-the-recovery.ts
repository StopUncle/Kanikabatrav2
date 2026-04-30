/**
 * loving-mira-5-1, "The Recovery" (OUTSIDE)
 *
 * Loving Mira, Level 5, order 1. Closing scene of the arc. Time
 * skip, 18 months past the L1-1 loft party. POV is the friend.
 * Tuesday evening at Mira's loft. Pasta. Ezra at her feet. The
 * cycle that opened with "are we okay?" closes with Mira telling
 * the FP, calmly over the stove, about a week in which the same
 * trigger fired and she used the skill instead of the loop.
 *
 * What this scene teaches:
 *   - Witnessing the recovery without converting it into praise
 *     that infantilises. The line between 'I see you' and 'I'm
 *     proud of you' is thin and structural, pride positions you
 *     as evaluator, witness positions you as peer.
 *   - The structural shift is in the absences. Mira does not
 *     describe the spiral she could have had, she describes the
 *     skill she used. The thing the friend did NOT receive that
 *     week (the 9 p.m. accusation text) is the thing being
 *     celebrated, except not by celebrating it. By naming it.
 *   - The recovery is not a graduation. There will be hard weeks.
 *     The cycle will fire again. Mira knows this and says it. The
 *     friend has to receive the saying-it without flinching, which
 *     is its own skill.
 *   - The right close is small and ordinary. Not a triumphant
 *     speech. Not a big embrace. The two of them on the couch with
 *     the dog, eating pasta, watching nothing in particular,
 *     having the kind of evening that 18-month recovery actually
 *     produces, quiet, available, real.
 *
 * Voice: outside POV. Sparse Kanika narration. Let the moment do
 * its own work. The closing scene of the arc earns the right to
 * trust the texture instead of explaining it.
 *
 * Cast: MIRA, FP (player), INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "30 now. Eighteen months past the loft party. Almost four years into DBT. The body that walks across the kitchen tonight is recognisably the same body but the relationship the body has to its own activation cycles has shifted, slowly, across hundreds of small moments.",
  traits: ["sensitive", "intense", "in-recovery"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, eighteen months
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Eighteen months.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Forty hard weeks, sixty-two ordinary ones, eight that were openly bad. Three near-misses on the relationship. One blow-up around month ten that required a five-day repair. You did not move out of New York. She did not stop seeing Reyes. You did go to Lisbon for the trip you almost cancelled. You came back. The friendship was still there. Vee texted you twice in the year, both times at 1 a.m., both times for fires, both times the fires were real and the texts were short.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What you are about to walk into is the closing scene of the arc. It is not triumphant. It is small, ordinary, and earned. The skill of receiving it is its own skill, a different one from the skills the rest of the arc taught. This one is about witness. About the line between 'I see you' and 'I'm proud of you,' which is thinner than most people think. About letting Mira be the adult who used the tools, not the kid who needed the approval.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Tuesday, 7:11 p.m. you are at Mira's loft.",
        tactic: "Walk in.",
        nextSceneId: "the-loft",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE LOFT, texture, present, small
  // ===================================================================
  {
    id: "the-loft",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira"],
    dialog: [
      {
        speakerId: null,
        text: "The loft is the same loft. The Hockney print is in a slightly different spot, she had the wall painted last spring and rehung the frames a few inches lower. The kitchen has gained a copper pan that hangs off the side of the stove. The candle on the counter is the same candle she has been buying for three years.",
      },
      {
        speakerId: null,
        text: "Ezra is at her feet. Sade is on the back of the couch, the way she always is on the back of the couch. The window is cracked. The light is the soft late-October light that makes the loft look exactly like the loft you walked into the first time, eighteen months ago.",
      },
      {
        speakerId: null,
        text: "Mira is at the stove. She is wearing the grey sweater. Her hair is in a loose knot. She is stirring pasta water without looking at it, the way she does, because she has made this pasta forty times and the muscle has the timing.",
      },
      {
        speakerId: "mira",
        text: "Hi. Drop your bag wherever. Wine's on the counter. I poured you a glass. Pasta's in eight minutes.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You drop your bag. You pick up the wine. You sit on the stool at the counter, the one you always sit on. Ezra looks up at you with the half-interested look of a dog that has known you long enough to not need to greet you anymore. You scratch behind his ear. He resettles.",
      },
      {
        speakerId: null,
        text: "Most of what is true about this evening is true in the absences. The body she has tonight is not the body that texted you 'are we okay?' It is the body that has been integrating the work across eighteen months. Same body. Different relationship to its own cycles.",
      },
      {
        speakerId: "inner-voice",
        text: "Watch what she says next. She is going to tell you something about last week. Listen for what is in it. Listen also for what is not in it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wait",
        text: "Drink the wine. Let her get to it.",
        tactic: "Don't fill the silence. Let her open the topic. The skill of the evening is not your skill of asking the right questions, it is your skill of being available to receive what arrives.",
        nextSceneId: "the-telling",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE TELLING, what Mira says
  // ===================================================================
  {
    id: "the-telling",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira"],
    dialog: [
      {
        speakerId: "mira",
        text: "I had a hard week last week. I want to tell you about it.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She does not say it dramatically. She says it the way someone reports a fact about Tuesday. She does not turn around to face you. She is still stirring.",
      },
      {
        speakerId: "mira",
        text: "Thursday, work blew up. The label thing I told you about. Anya said something on the call that I read as her dropping me. I was wrong about the read but I didn't know that until Friday morning. Then in the afternoon, Maddie ghosted me. I had reached out about the gallery thing and she just didn't answer. I'm pretty sure she was busy and not ghosting me, but in the moment Thursday afternoon, I had two pieces of evidence that I was being dropped from two directions at once.",
        emotion: "neutral",
      },
      {
        speakerId: "mira",
        text: "By 5 p.m. I was in the empty room. By 6 p.m. the urge had fired. Old urge. The empty-room urge, the manufactured-fight urge, the text-Cameron urge. All of them got loud at once. The fourth urge tried to come in too. I noticed it.",
        emotion: "neutral",
      },
      {
        speakerId: "mira",
        text: "I walked Ezra for an hour. I called Vee from a bench in the park. I told her, first sentence, 'I had a numb afternoon and the urges all fired.' She said the thing she always says, which is mostly nothing. I came home, I emailed Reyes for an extra session, I took a bath, I drafted the work email three times before sending it, and I went to sleep at 9:30. Friday morning I woke up okay.",
        emotion: "neutral",
      },
      {
        speakerId: "mira",
        text: "I want you to know. I noticed I didn't text you. I noticed it as a choice. The Mira who texted 'are we okay?' on a Tuesday last year would have texted you Thursday at 6 p.m. with something twice as bad. I love you, and I noticed I had a hard week, and I held the line on what shape I sent through the door. I wanted you to know that.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She turns around now. The pasta water has gone in. She is leaning on the counter behind her with both hands. She is looking at you with the calm look of someone who has rehearsed the sentence quietly to herself a few times across the weekend, but is delivering it for real for the first time.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the moment. She has just handed you something the entire arc has been building toward. The structure of what she said is the recovery. She did not describe the spiral she avoided. She described the skill she used. The thing she did NOT send through the door is the entire shape of the gift. Six available stances on how to receive it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "overpraise",
        text: "Pride. 'Mira, I am SO PROUD of you. Holy shit. That is huge.'",
        tactic: "Well-meaning. Lands the wrong way. Pride positions you as evaluator. The version of Mira she has worked four years to become is the adult who used tools, not the kid who needed your approval. Doesn't break the evening. Lands one register off.",
        nextSceneId: "ending-overpraise",
        isOptimal: false,
      },
      {
        id: "diminish",
        text: "Diminish. 'That just sounds like... a normal week, honestly. You're being too hard on yourself.'",
        tactic: "Accidentally erases the magnitude. The week was not a normal week. Treating it as one means missing the structural shift. Lands as not-seeing.",
        nextSceneId: "ending-diminish",
        isOptimal: false,
      },
      {
        id: "self-centered",
        text: "Make it about you. 'God, I'm so glad. That would have been such a hard text for me to get on Thursday.'",
        tactic: "Pulls the spotlight. Mira just gave you a gift; the move converts the gift into a thing about your difficulty receiving its absent shadow. Lands as self-referential.",
        nextSceneId: "ending-self-centered",
        isOptimal: false,
      },
      {
        id: "fragile-careful",
        text: "Treat her carefully. 'Are you okay? Do you need to talk about it more? Whatever you need.'",
        tactic: "Over-careful. Treats the new Mira as fragile. The careful posture, deployed across months, slowly converts the friendship into one where she is the patient and you are the caretaker. The arc just produced a peer adult; the careful response refuses to receive her as one.",
        nextSceneId: "ending-careful",
        isOptimal: false,
      },
      {
        id: "engaged-questions",
        text: "Engaged. 'What did Vee say? What did you draft for the work email?'",
        tactic: "Curious, peer-to-peer, treats her as the adult who used tools. Lands well. Slightly less perfect than the witness move, because it routes the moment toward content rather than letting the moment be the moment.",
        nextSceneId: "engaged-1",
        isOptimal: false,
      },
      {
        id: "witness",
        text: "Quiet witness. 'I see you. I noticed I didn't get a text on Thursday. I'd been wondering. Thank you for telling me what was on the other side of it.'",
        tactic: "Names the absence directly. Receives the gift on the terms it was offered. Does not fill the moment with extra reaction. Treats her as peer. The cleanest run available, earned by eighteen months of watching her become someone who can deliver this sentence over a stove.",
        nextSceneId: "witness-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENGAGED, close-but-not-quite
  // ===================================================================
  {
    id: "engaged-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira"],
    dialog: [
      {
        speakerId: "mira",
        text: "Vee said almost nothing. She told me about the new ceramic pot her landlord broke and how she is mildly enraged about it. That was the call. I think it was forty minutes. I laughed at the landlord story. I came home and ate cheese and crackers and drafted the email. I made the email shorter each time. The third draft was four sentences.",
        emotion: "neutral",
      },
      {
        speakerId: "mira",
        text: "Anya replied Friday morning with, basically, 'oh no, I think there was a misunderstanding, of course we're keeping you on the project, can we talk Monday.' Maddie replied Friday afternoon with 'sorry, hectic week, gallery thing yes please, when are you free.' Both of them were not dropping me. The body that read both as drops on Thursday is the body that reads everything as drops, which I know now and which is part of what I have been working on with Reyes for four years.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She has answered the questions. She is willing to answer them. The questions also kept the conversation in the territory of content, what was said, what was drafted, what came back, instead of in the territory of the moment, which was the un-sent text and what its absence meant.",
      },
      {
        speakerId: "inner-voice",
        text: "This is a good ending, not the cleanest one. Engaged questions kept Mira in adult-peer register; the gift she handed you got received with curiosity rather than witness. The friendship is well. The specific resonance of the moment over the stove was slightly diluted by routing it toward content.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-engaged-end",
        text: "Pasta is ready. You move to the couch.",
        tactic: "End scene.",
        nextSceneId: "ending-engaged",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // WITNESS, the cleanest run
  // ===================================================================
  {
    id: "witness-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira"],
    dialog: [
      {
        speakerId: null,
        text: "She watches you for a beat. The watch is calm. She is checking, with her body, whether the sentence you said is the sentence you said, whether the witness is real or whether it has the small over-careful shape that looked like witness from the outside.",
      },
      {
        speakerId: null,
        text: "It is real. She registers it. The thing that happens in her shoulders is the thing that happens when someone has been seen on the terms they actually offered.",
      },
      {
        speakerId: "mira",
        text: "Yeah. Thank you. That's exactly the right thing to say. Thank you.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She turns back to the pasta. The kitchen smells like garlic. Ezra adjusts at her feet. You drink your wine. There is a brief silence, not heavy, not awkward. The kind of silence that happens between two people who have been around each other for eighteen months and do not need to fill the spaces.",
      },
      {
        speakerId: "mira",
        text: "One more thing. Then we eat.",
        emotion: "neutral",
      },
      {
        speakerId: "mira",
        text: "I'm not always going to be like this. There are going to be weeks where the cycle fires and I send you the wrong shape. I want you to know I know. When it happens I'll repair fast. I will probably not always repair on Saturday at 11. Sometimes I'll repair on Wednesday, badly, in three text messages. I want you to know that the wrong-shape weeks are not the absence of this work. They are part of it. Reyes calls it the seventy-thirty, seventy percent of the time the body produces the right shape, thirty percent it doesn't. The thirty is not failure. The seventy is not graduation. Both are true.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She is not asking for reassurance. She is delivering information. Same body that, eighteen months ago, would have asked the same content as a question, 'are we okay if I sometimes mess up?' and the question would have been an instance of the same loop.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the second thing she handed you. She just told you the recovery is not a graduation. There is no available answer that is wrong here, but there is a graceful one. It is small. It does not promise anything she did not ask you to promise.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "promise-too-much",
        text: "Promise. 'I'll be here for all of it. I'm not going anywhere. Whatever shape it comes in.'",
        tactic: "Well-meaning. Slightly too much. Promises a level of availability that is not yours to promise, that's the absorption move Vee warned about. Lands warmly, costs slowly across years.",
        nextSceneId: "ending-promise-too-much",
        isOptimal: false,
      },
      {
        id: "soft-real",
        text: "Soft and real. 'Yeah. I know. Seventy-thirty. I'll do my own seventy-thirty too.'",
        tactic: "The peer answer. Names that you also are a person who will sometimes get it wrong. Mutual seventy-thirty as the actual shape of friendship. The cleanest available close, small, true, undefended.",
        nextSceneId: "ending-witness",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-witness",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Pasta Was Good",
    endingLearnPrompt:
      "She nodded. She said 'yeah. Mutual seventy-thirty. Eat.' The pasta was good. You ate it on the couch. Ezra eventually moved off the floor and put his head on your knee. You watched half of a movie neither of you was committed to. You stayed until 10:40. You walked home through the cold. Most of what was true about the evening was true in the absences, the spiral that did not happen on Thursday, the loop-text that did not arrive on Friday, the over-careful evening that did not develop, the speech that did not get given. You were her friend tonight. She was yours. Eighteen months ago you walked out of this loft for the first time at 1:08 a.m. holding a sentence about being someone's favorite person of the decade. Tonight you walked out at 10:40 holding nothing in particular. The arc of the friendship is the difference. The recovery is real. The friendship is real. You did the harder thing, which is to receive the recovered friend on her own terms, peer to peer, without converting her into a project, a kid, or a patient. Most FPs do not arrive here. Some do.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The skills you used in this scene are the skills the whole arc has been building toward, not impulse-control in a heat, not in-session interrupt of splitting, not GIVE on a Tuesday night, not the survival-geometry call. Those were prerequisite skills. The skill of THIS scene is witness. Witness is small. Witness is harder than it looks. Witness is also, structurally, what 18-month BPD recovery PRODUCES on the other end, the friend who can receive the recovered friend without converting the recovery into a thing. You did that. The pasta was good. The dog was good. The friendship, today, on Tuesday at 7:11 p.m. and again at 10:40 when you walked home, is good. Which is what 'good' looks like in the wild, after the work. Quiet. Available. Real.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-overpraise",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Praise",
    endingLearnPrompt:
      "She smiled and said 'thanks' and turned back to the pasta. The evening was fine. The pasta was good. You watched the movie. You walked home. Most of the evening was good. There was one register-off beat, the moment you said 'I'm SO PROUD of you' and her body, briefly, did the thing it does when she is trying to find a graceful way to receive a sentence that has positioned her as the kid in the room. The moment passed. It did not break anything. It also was not the moment she was offering you. The moment she was offering was peer-to-peer adult witness; you returned approval. The arc of the evening is one notch below the cleanest version. Most FPs land here, not below. The skill upgrade you can practice and which gets easier with reps, is the small grammatical move of replacing 'I'm proud of you' with 'I see you.' Same warmth. Different posture. Pride is from above. Witness is from beside.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Pride from a friend lands different than pride from a parent but not different enough. The tonal residue is parent-shaped. Mira has spent four years working out from under parental approval as her metric, and most of the work is mechanical: it is the practice of being seen rather than evaluated. Friends who use 'I'm proud of you' liberally are not making a moral mistake. They are using a phrase that, in the BPD-recovery context, accidentally re-installs the parental frame. The substitution is small. Worth practicing.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-diminish",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Just A Normal Week",
    endingLearnPrompt:
      "Her face did the small thing it does when something is being missed. She did not push back. She said 'yeah, you're probably right' and turned back to the pasta. The pasta was good. The evening was fine. The thing she had handed you, the un-sent text, the walked dog, the un-emailed Reyes, the four-sentence work email, was a real piece of work she had done across a real bad afternoon, and you renamed it 'a normal week' to spare her the discomfort of being seen doing it. The renaming was unintentional. The cost is slow. Across the next year, two more 'I had a hard week' sentences will not arrive at all, because the first one got renamed. The thing your body was trying to do, keep her from feeling abnormal, produced the opposite of what it was reaching for. The recovery is invisible if you keep telling her it was not a recovery.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The instinct to normalise is well-meaning. It is also one of the most common ways FPs accidentally erase the work of someone in BPD recovery. The work of recovery is, structurally, an abnormal thing, the rebuilding of a body's response to its own activation. Calling that work 'just a normal week' is not validating; it is dismissing under the guise of validating. The skill is to call the work what it is, work, without making it weird. 'I see you' is the version. 'It was just normal' is not.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-self-centered",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Spotlight Pull",
    endingLearnPrompt:
      "Her face did not change much, which is itself a kind of report. She said 'yeah, I know it would have been hard for you' and turned back to the pasta. The evening proceeded. The pasta was good. The moment she had built, peer-to-peer adult delivering a structural report about a piece of recovery, got converted, in your one sentence, into a moment about your difficulty receiving the absent shadow of a text that did not arrive. The conversion was small and reflexive. Across years, the conversion accumulates. FPs who route their friend's recovery through their own difficulty receiving it install a low-grade dynamic where the friend's recovery becomes another thing she has to manage your feelings about. Mira already manages many feelings. Yours, in the recovery context, are not hers to manage. The substitution is to receive without referencing yourself.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The spotlight-pull move is harder to notice than overpraise or normalising, because it sounds like emotional honesty, 'I'm telling you my real feeling.' It is also, in this specific context, a category error. The moment she handed you was about her work, not your reception. Your difficulty receiving the absent text is real and worth talking about, somewhere, with your own therapist, with Vee in a fire-call, with a journal entry. Not in the moment Mira hands you the recovery report. The moment is hers to own. You are a witness, not the protagonist.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-careful",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Too Careful",
    endingLearnPrompt:
      "She paused. She said 'I'm okay. We can just have dinner.' The evening proceeded carefully. The pasta was good. You found yourself, across the rest of the evening, monitoring her, was she okay, was she tired, did she want to talk about more and the monitoring was visible to her in your posture, in the small adjustments you made when she moved. The monitoring is the thing the new Mira has been working four years not to need. Receiving it from you, on this evening, was a slight disappointment she did not name and could not fully suppress. The careful posture, deployed across months, slowly converts the friendship into one where she is the patient and you are the caretaker. Vee's geometry was specifically about this. The skill is to receive the recovered friend as the peer she has become, which means letting her have her own evening, her own pasta, her own pace, without the careful frame.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The careful response is well-meaning, harder to give up than overpraise, and structurally the same move as the over-eager Vee call response. Both treat Mira as fragile rather than as adult. The new Mira is sometimes still fragile. So is everyone. The shape of friendship between two adults includes both being sometimes fragile, and neither defaulting to caretaker. Reset by next Tuesday, show up with a movie pick and an unrelated story about your week. The careful posture dissolves under ordinary peer behavior faster than under any direct correction.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-engaged",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Questions",
    endingLearnPrompt:
      "You asked. She told you. Vee's landlord story made you laugh too. The pasta was good. The evening was real. The arc of the friendship is well. The specific moment over the stove, the moment where she handed you the recovery report on terms designed to be received as report, got received slightly through the lens of curiosity about content rather than witness of the moment. The two are close. Curiosity is good. Curiosity treats her as the adult who used tools. Curiosity also routes the moment toward what was said and drafted rather than toward what was not sent and what its absence meant. The next time she hands you a moment of this shape, the cleaner move is the witness one, name the absence directly, then let the moment be the moment, then let the conversation move organically from there. Curiosity arrives later in the evening, not in the first sentence after the gift.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Engaged questions are not a bad ending. They are the right move at minute eleven of the conversation. They are slightly off-tempo at minute one, when the gift is fresh and the cleanest reception is to name what was given before exploring its content. Most relationships do not require this level of tempo-discrimination. BPD-recovery relationships sometimes do, because the gift is structural rather than narrative, it lives in the absence, not in the content and content-questions accidentally redirect attention away from where the gift actually is.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-promise-too-much",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Promise",
    endingLearnPrompt:
      "She smiled and said 'thank you' and turned back to the pasta. The evening was good. You ate. You watched. You walked home at 10:40 holding the small soft thing in your chest of the warm promise you made over the stove. The pasta was good. The promise was warm. The promise was also, technically, the absorption move Vee warned you about across a 50-minute airport call. 'I'll be here for all of it, whatever shape it comes in' is a sentence that, in the long run, you cannot keep without losing your own life, which is the thing you have to keep in order to be useful to her. The promise will not crack tonight. It might crack at month thirty-two, the way Vee's did. The substitution: 'I'll be here for the work. I'll be one of your people. I will sometimes need to call back tomorrow.' Same love. Different math.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Vee's geometry was specific about the difference between presence and total presence. 'I'll be here for all of it' is the latter and is structurally unsupportable. 'I'll be one of your people' is the former and is supportable across decades. The promise tonight does not have to be retracted to be recalibrated. The recalibration happens slowly, in small choices over months, saying no to a request, taking the trip, ending the call when it's time. Mira will register the recalibration as the actual shape of friendship. She will not register it as withdrawal. Vee did not. Mira won't.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira51: Scenario = {
  id: "lm-5-1",
  title: "The Recovery",
  tagline: "Eighteen months later. Tuesday at her loft. Pasta on the stove. The cycle that opened with 'are we okay?' closes here.",
  description:
    "Closing scene of the arc. Time skip, 18 months past the L1-1 loft party. POV is the friend. Tuesday evening at Mira's loft over pasta, Mira tells the FP about a hard week last week, the trigger fired, the urge came up, and she walked Ezra, called Vee, did not text the FP, drafted a four-sentence work email, slept early, and woke up okay on Friday. The scenario teaches the skill of WITNESSING the recovery without converting it into praise that infantilises, normalising that erases, spotlight-pull that re-centers, careful posture that re-installs the patient-caretaker dynamic, or absorption-promise that breaks the survival geometry. The cleanest run is small, peer-to-peer, ordinary, earned. Eight endings.",
  tier: "premium",
  track: "loving-mira",
  level: 5,
  order: 1,
  estimatedMinutes: 15,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 480,
  badgeId: "the-witness",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Witnessing the recovery without converting it into praise that infantilises, 'I see you' beats 'I'm proud of you' on grammatical posture",
    "Naming the absence directly, receiving the un-sent text as the actual gift it was",
    "Peer-to-peer adult reception, letting the recovered friend be the adult who used tools rather than the kid who needed approval",
    "Receiving the seventy-thirty disclosure, accepting that recovery is not graduation and that wrong-shape weeks are part of the work, not the absence of it",
    "Mutual seventy-thirty as the shape of friendship, naming that you also will sometimes get it wrong, peer-symmetrical with her",
    "Letting the small ordinary close be the close, not converting the moment into a speech, an embrace, or a project",
  ],
  redFlagsTaught: [
    "Pride-language ('I'm so proud of you') as accidental parent-frame re-installation in BPD-recovery context",
    "Normalising ('it was just a normal week') as accidental erasure of the work being celebrated",
    "Spotlight-pull ('that would have been hard for me to receive') as conversion of the gift into management of your own feelings",
    "Over-careful posture as slow reinstallation of the patient-caretaker dynamic the recovery has been working out from under",
    "Absorption-promise ('I'll be here for all of it') as the structurally-unsupportable form of presence Vee specifically warned about",
    "Content-questions at minute one ('what did Vee say?') as accidental tempo-mismatch, the gift lives in the absence, not the content",
  ],
  characters: [INNER_VOICE, MIRA],
  scenes,
};

export default lovingMira51;
