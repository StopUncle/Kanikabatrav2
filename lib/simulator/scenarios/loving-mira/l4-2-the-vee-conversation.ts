/**
 * loving-mira-4-2 — "The Vee Conversation" (OUTSIDE)
 *
 * Loving Mira, Level 4, order 2. POV is the FP again. The phone
 * call most FPs of someone with BPD never get — the older sibling
 * (who has been Mira's previous FP) calls during an airport
 * layover to deliver the survival-geometry talk.
 *
 * What this scene teaches:
 *   - You can love AND have a life. The two are not in tension.
 *     If the FP makes Mira their whole orientation, the friendship
 *     dies, because the FP becomes incapable of being the person
 *     Mira actually needs.
 *   - The ecosystem-node frame. The healthy long-term BPD support
 *     structure has multiple regulators — therapist, sibling,
 *     friend(s), partner. The FP's job is to be ONE node. Trying
 *     to be all nodes guarantees collapse for the FP and worse
 *     outcomes for Mira.
 *   - Plan for the misstep. The FP will misstep. Repair fast.
 *     Don't catastrophise the misstep into a global self-verdict
 *     (which is the same shape Mira does, and which the FP can
 *     develop adjacently to her if not careful).
 *   - Saying 'no' is not abandonment. The FP who says 'no' to one
 *     request keeps the friendship alive longer than the FP who
 *     absorbs everything until they collapse and disappear.
 *   - Receiving without bonding-against. Vee is not calling to
 *     give the FP an ally against Mira. The temptation to vent
 *     ABOUT Mira to Vee is the failure mode. The skill is
 *     receptive listening that does not convert into a parallel
 *     relationship that excludes Mira.
 *   - Receiving Vee's own boundary without flinching. Vee makes
 *     clear she is not the FP's regular call point. That sentence
 *     is itself a model of healthy involvement — and how the FP
 *     receives it gates whether the call lands.
 *
 * Voice: outside POV. Player is at home Wednesday night. Vee's
 * voice is gentle, calibrated, has a slight rasp from too much
 * coffee. Kanika in italics between beats.
 *
 * Cast: VEE, FP (player), INNER_VOICE. MIRA does not appear.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const VEE: Character = {
  id: "vee",
  name: "Vee",
  description:
    "Mira's older sister, 33. Was Mira's FP from age 22 to 26. Now four years past being the FP and still in the relationship. Calling from a 90-minute layover at LaGuardia.",
  traits: ["grounded", "loving", "calibrated", "boundaried"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME — receiving the older-sibling call
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "POV is yours again. The friend. The phone call you are about to receive is one most FPs never get. Vee — Mira's older sister — was Mira's FP from age 22 to 26. She walked through the cycle you are now four months into. She is on the other side. She has stayed in Mira's life. She has also kept her own.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She is calling, unsolicited, from an airport, to give you the survival-geometry talk. This is rare in the wild. Most older siblings of someone with BPD do not call the new FP. Most have been ground down by the role themselves and have no language for the talk. Vee has language, partly because she watched her sister get DBT-fluent, and partly because Vee has been in her own therapy for the last six years.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Receiving this call has its own skill set. Listen without bonding against Mira. Don't convert Vee into a parallel relationship that excludes Mira. Don't dismiss her. Don't catastrophise. Hear the survival geometry. Take what's true. The temptations that will arise during the call are: vent to Vee, defend Mira to Vee, bond with Vee against Mira, panic, agree to too much, reject the call. The skill is receptive ground.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Wednesday, 8:42 p.m. Phone buzzes.",
        tactic: "Vee's contact comes up.",
        nextSceneId: "the-call",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE CALL OPENS
  // ===================================================================
  {
    id: "the-call",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "VEE — you have her number from Mira's birthday three months ago, when she was in town for the weekend and you spent twenty minutes with her on the patio. She gave you her number then 'in case anything ever comes up.' You hadn't called it. She hadn't either. Until now.",
      },
      {
        speakerId: null,
        text: "You answer. Her voice is calibrated. There is a slight rasp from what is clearly a long travel day. You can hear the airport in the background — the muffled gate-announcement, the ambient murmur, the wheel-clack of someone's roller bag passing.",
      },
      {
        speakerId: "vee",
        text: "Hi. It's Vee. I want to talk to you about my sister. She doesn't know I'm calling. I'd like to tell her, after, that I called — I don't want to keep this a secret from her. Is that okay with you, both parts?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She has, in two opening sentences, calibrated the call. She has said: I am here. I am here on purpose. Mira does not know yet. I will tell her. I am asking you to receive this on those terms. The asking is the move. Most family members who reach out to FPs do not ask.",
      },
      {
        speakerId: "inner-voice",
        text: "Four available stances at the opening. Three of them close the call. One of them lets it land.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "neutral",
        text: "Neutral. 'Sure. What's up?'",
        tactic: "Defaults to small-talk register. Vee will adjust to it. The call will be slightly less useful because the register is wrong for what she's bringing — but it won't fail. Lands a moderate version of the survival geometry.",
        nextSceneId: "vee-the-frame",
        isOptimal: false,
      },
      {
        id: "defensive",
        text: "Defensive. 'Are you calling to tell me to leave her?'",
        tactic: "The body has read the call as criticism-of-Mira-by-proxy and the response is to defend Mira from the call before the call has happened. Vee is not calling for that. The defense will close the call.",
        nextSceneId: "defensive-1",
        isOptimal: false,
      },
      {
        id: "eager",
        text: "Eager. 'Oh my god, yes. I'm so glad you called. I've been needing to talk to someone who gets it.'",
        tactic: "The eager move. Sets up the call as venting space — Vee as ally, Mira as topic of complaint. Vee will not participate. The call will land soft but the FP's intent will install a co-dependent shape with Vee that will leak across months.",
        nextSceneId: "eager-1",
        isOptimal: false,
      },
      {
        id: "grounded",
        text: "Grounded. 'Yes to both parts. I'd like you to tell her you called. Tell me what you're going to tell me.'",
        tactic: "The receptive move. Validates Vee's calibration with reciprocal calibration. The call opens into the survival-geometry talk on the terms Vee asked for, which is the terms most likely to make the talk land.",
        nextSceneId: "vee-the-frame",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // DEFENSIVE PATH
  // ===================================================================
  {
    id: "defensive-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "vee",
        text: "I'm not calling to tell you to leave her. I'm calling because I was her FP for four years and there are about six things I wish someone had told me at month four that nobody told me until month thirty-eight. I want to tell you the six things. That's the call. Is the call still on?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Vee does not flinch. She does not soften the defense back at you. She also does not concede to the framing that the call was about leaving Mira. She restates her actual purpose. The asking is, again, the move.",
      },
      {
        speakerId: "inner-voice",
        text: "The defensive opening is not fatal. Vee is calibrated enough to absorb it and re-pose the question. The body she brings to the call is a body that has done this with Mira approximately ten thousand times. Your defense is small to her. The recovery is the same recovery as the L4-1 in-session interrupt: take the offered hand, drop the defense, open the call.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-defensive",
        text: "Stay defensive. 'I just don't think you know what we have.'",
        tactic: "The defense consolidates. Vee will say something kind, the call will end at minute four, and the survival geometry will not get delivered. You will spend the next eight months learning each piece of it the hard way, alone.",
        nextSceneId: "ending-defensive",
        isOptimal: false,
      },
      {
        id: "drop-defense",
        text: "Drop the defense. 'Sorry. That was reflexive. The call is on. Tell me the six things.'",
        tactic: "The drop. The call is recoverable. Vee will not punish the defense; she will, more or less, restart at the survival-geometry frame.",
        nextSceneId: "vee-the-frame",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // EAGER PATH
  // ===================================================================
  {
    id: "eager-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "vee",
        text: "I hear the relief in your voice. I want to be honest about what this call is and isn't. This is not a 'finally someone gets it' call about Mira. I'm not your venting partner. I love my sister and I'm careful with what I say about her. What I'm bringing is a piece of geometry I wish I'd had at month four. I want to tell you the geometry. I don't want to do the 'oh god she's so much, isn't she' thing. Can you take the call on those terms?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She has, with that sentence, refused the role. The eager opening offered her the role of confidante-against-Mira, and she has declined it cleanly, without shaming you for offering. The decline is one of the cleanest pieces of Vee's calibration in this call.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the move most family members of the BPD person cannot make. They are usually so depleted by the time someone offers them the venting role that they take it — and the parallel relationship that gets built then becomes its own dysfunction. Vee learned this in her own therapy. She is offering you the lesson by modeling the refusal, not by lecturing about it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-the-correction",
        text: "Accept the correction. 'Yeah. Sorry. You're right. Tell me the geometry.'",
        tactic: "The acceptance. Repositions the call. Vee will land the survival geometry on the recovered terms. The eager opening will be remembered by both of you, but as a moment that got recalibrated, not as the shape of the call.",
        nextSceneId: "vee-the-frame",
        isOptimal: true,
      },
      {
        id: "reject-the-correction",
        text: "Reject the correction. 'I just meant — I really do need someone to talk to about all this.'",
        tactic: "The rejection. The eager move consolidates. Vee will continue to refuse the role across the call, and the call will end with the survival-geometry partially delivered, partially absorbed, and the FP carrying a small undigested resentment toward Vee.",
        nextSceneId: "ending-eager",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // VEE THE FRAME — convergence point for grounded / recovered paths
  // ===================================================================
  {
    id: "vee-the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "vee",
        text: "Okay. Six things. I have about forty minutes before they start boarding. I'll go in order.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "ONE. You can love her AND have a life. That's not a tension. That's an arithmetic. The friendship works because you have a life. The day the friendship becomes your whole life is the day you start being unable to be the person she actually needs you to be — because the person she needs you to be is somebody who is not collapsed under the weight of her.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "I learned this at month thirty. By month thirty I had cancelled five trips, lost two friendships from neglect, and turned down a job because the office was an hour away. I thought I was being a good sister. I was being a sister who was disappearing. The Mira who loves me — she didn't want me to disappear. She would have rather I'd taken the trips. She just didn't know how to ask me to.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "TWO. You are one node. There are four other nodes in her ecosystem — her therapist, me, two friends besides you, and on the better months, her work. Your job is to be one node. Not all nodes. When she's spiralling at 11 p.m. and you're tired, the right move is sometimes 'I love you, I am not the right person for this tonight, can you call Reyes's emergency line, or me' — and you mean me, the older sister, not me, you. You are not the only person.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "I have made peace with being woken up at 1 a.m. about twelve nights a year for the rest of my life. Twelve. Not eighty. Twelve is sustainable. Eighty is not. The crisis line is for the rest. So is Reyes. So is the friend in Brooklyn whose name is Maya, who you should know about, and who is also one of her people.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "node-receptive",
        text: "Take it in. 'Okay. The ecosystem. I'd been thinking I had to be the whole thing.'",
        tactic: "The receptive admission. Vee will validate it. The lesson lands, partly because it has been named back and partly because Vee has been there.",
        nextSceneId: "vee-three-four",
        isOptimal: true,
      },
      {
        id: "node-resist",
        text: "Resist. 'But she said I'm her favorite person. She said it specifically.'",
        tactic: "The flag of the FP-language. Vee can work with this — it's not defensive in the same way as before, it's a real piece of the experience. She'll address it directly. Lands the lesson with one extra beat.",
        nextSceneId: "vee-favorite-person",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FAVORITE PERSON sub-conversation
  // ===================================================================
  {
    id: "vee-favorite-person",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "vee",
        text: "Yeah. She has said that to me too. She said it to Cameron. She said it to two of the people before me who left. The 'favorite person' is a real feeling — it's accurate to what's happening in her body — and it's also a function of the diagnosis. The intensity of the bond is not a measure of you being uniquely qualified to be her person. It's a measure of how her body forms attachment. The intensity is the symptom. The bond is real. Both are true.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "What she actually needs is multiple people. The FP framing makes it sound like one. The truth is: the FP is the person whose absence is most catastrophising for her in any given month. The job of long-term recovery is for her body to stop needing the catastrophic intensity around any one person, which means she needs MORE relationships, not fewer. Your willingness to be one of several is part of the recovery, not a betrayal of the bond.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is one of the harder pieces of the survival geometry. The FP language is intoxicating to receive. It is also, structurally, the inversion of what Mira's recovery actually requires. Vee is naming this without disenchanting the bond — she is just refusing the math of 'favorite means only.' Same need-for-bond, different shape.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-three-four",
        text: "Take that in. 'Okay. So loving her well includes not being her only.'",
        tactic: "The integration. Vee will move on.",
        nextSceneId: "vee-three-four",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // PIECES THREE AND FOUR
  // ===================================================================
  {
    id: "vee-three-four",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "vee",
        text: "THREE. Plan for the misstep. You will misstep. You will say the wrong thing in the wrong tone on a tired Tuesday. You will not text back fast enough on a day she's already activated. You will go on a trip and miss something that mattered to her. The misstep is mathematical — over five years it will happen probably forty times. The skill is repair. Repair fast, repair small, do not catastrophise the misstep into 'I am a bad friend.' That sentence — 'I am a bad friend' — is the same shape Mira is in therapy unlearning. Don't develop it adjacently to her.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "I was hard on myself for the first two years. I thought every time I said the wrong thing I was failing her. I was just being a person. People mis-step. The repair is what makes you a friend, not the absence of the misstep. The friend who never missteps is the friend who has stopped showing up.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "FOUR. Some moves are not yours. The therapy work is Reyes's. The crisis is the crisis line's. The family-of-origin work is mine. The medication conversation is her psychiatrist's. The friendship is yours. The friendship is in shape, in size, in tone of friendship — which means: shared meals, shared shows, shared bad jokes, witness to her actual life, the showing up that is friend-shaped.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "When she says 'you're the only person who really gets me,' your body will want to expand the friendship to fill the spaces that other people are supposed to occupy. Resist the expansion. You're not her therapist. You're not her family. You're not her crisis-line. You are her friend. Friend is a real shape with a real edge. Most FPs lose the edge by month eight and then lose the friendship by month thirty.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-five-six",
        text: "Take it in.",
        tactic: "Continue.",
        nextSceneId: "vee-five-six",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // PIECES FIVE AND SIX + VEE'S OWN BOUNDARY
  // ===================================================================
  {
    id: "vee-five-six",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "vee",
        text: "FIVE. Saying no is not abandonment. The friend who says no to one request keeps the friendship. The friend who absorbs every request collapses, then disappears. Mira has been disappeared on. Disappearing is the worst version. Saying no — calibrated, kind, bounded — is the version that keeps the friend in her life across years.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "The shape of a good no is: 'I love you. I'm not available for that tonight. Here's what I CAN do. Here's when I can be back.' That sentence is friendship doing its work. It is not abandonment. Her body will sometimes read it as abandonment in the first thirty seconds. Hold the line. The body recalibrates by the next morning. Mine did. Hers will.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "SIX. The recovery is real. I want to say this last because it is the easiest piece to forget on a hard Tuesday. She is not going to be at month four for the rest of her life. The cycles get smaller. The accusations land softer. The DEAR MAN messages start arriving instead of the loops. The therapist's tools become her own tools. I have watched it happen across four years. The research backs the lived version — 93% remission across ten years. The work is grueling and the work is also working.",
        emotion: "knowing",
      },
      {
        speakerId: "vee",
        text: "Last thing. About me. I'm available if it ever escalates to a crisis you can't hold. Don't text me to vent. I'm not your weekly call. I have my own life and I have my own boundary with the role of being a Mira-confidante for her people. I love her. I am not her caretaker. I will not be her caretaker for you either. If something is on fire — call. Otherwise, I'm on the other side of the friendship, not in the middle of yours.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Here is the piece most listeners flinch at. Vee is modeling a boundary, on the call, by stating it. The FP has a choice in the next ten seconds about how to receive it. Receiving the boundary as personal rejection is the failure mode. Receiving it as information about the shape of the available relationship is the skill.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "receive-boundary",
        text: "Receive it cleanly. 'Got it. For fires. Otherwise I leave you to your life. Thank you.'",
        tactic: "The clean reception. Vee just modeled a boundary, you just received it as information. The whole survival-geometry talk lands intact.",
        nextSceneId: "vee-the-mira-question",
        isOptimal: true,
      },
      {
        id: "wounded-by-boundary",
        text: "Slightly wounded. 'I mean — okay. I just figured if I had questions...'",
        tactic: "The wounded reception. Reads Vee's boundary as personal rejection. Vee will not soften further; she will gently restate. The call will end intact but you will carry a small, undigested resentment toward Vee for months.",
        nextSceneId: "ending-rejected",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE MIRA QUESTION — when do you tell her
  // ===================================================================
  {
    id: "vee-the-mira-question",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "vee",
        text: "Okay. Last actual question. I'd like you to tell her I called. I'm going to tell her too — probably tomorrow morning — but I want to not be the only one who tells her. When are you going to tell her?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The question is calibrated. Vee is not asking you to keep the call secret, and she is not asking you to surface it tonight in a heat. She is asking: what is the shape of how you're going to integrate this?",
      },
      {
        speakerId: "inner-voice",
        text: "Four available answers. Three of them install a small distortion. One of them is right.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hide",
        text: "Hide it. 'Maybe I won't tell her. It might just upset her.'",
        tactic: "The hidden version. Vee said tell her. You decide not to. The secret begins to rot from minute one — your interactions with Mira this week will be subtly off and she will read the offness as the splitting trigger she always reads off-ness as.",
        nextSceneId: "ending-hidden",
        isOptimal: false,
      },
      {
        id: "rush",
        text: "Rush it. 'I'll text her right now while we're on the phone.'",
        tactic: "The rushed version. Lands hot. Mira will receive a panicked-feeling text from you at 9:17 p.m. announcing 'Vee just called me' with no context. Her body will spiral within forty seconds. The integration was supposed to happen calmly, not in a rush.",
        nextSceneId: "ending-rushed",
        isOptimal: false,
      },
      {
        id: "saturday",
        text: "In person. 'Saturday brunch. I'll tell her in person, soft, when we have time.'",
        tactic: "The calibrated answer. Mira gets the news in a body-state where she can metabolise it, not in a panicked text-state. Vee's morning call will reach her first; your in-person follow-up confirms and grounds it.",
        nextSceneId: "ending-grounded",
        isOptimal: true,
      },
      {
        id: "tonight",
        text: "Tonight, but in a calibrated message. 'I'll text her tonight — but slow, with context, before I sleep.'",
        tactic: "The middle answer. Better than the rush, slightly worse than Saturday. Tonight-with-context can land okay if the message is well-drafted; the body that drafts it is a body that just got off a 50-minute heavy phone call, which is not the most regulated drafting body. Lands okay-ish.",
        nextSceneId: "ending-tonight-text",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-grounded",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Survival Geometry",
    endingLearnPrompt:
      "You took the call on the terms Vee offered. You let her name the six pieces. You received her boundary as information rather than rejection. You decided to tell Mira at Saturday brunch — the body-state most likely to let her metabolise the news cleanly. The call lasted forty-three minutes. You hung up at 9:25 p.m. with Vee's number saved under 'Vee — for fires only,' which is an honoring of the boundary she stated. The survival geometry is now in your head: love AND life, ecosystem-node not all-nodes, plan for the misstep, some moves are not yours, no is not abandonment, the recovery is real. Most FPs do not get this talk until they are too depleted to use it. You got it at month four. Use it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The call you just took is one of the highest-value moments available in the Mira-friendship across its first year. Older siblings of someone with BPD who have been the previous FP and have done their own work and have language for the talk and are willing to call the new FP — that intersection is small. You will not get a second one of these in the friendship. Take what Vee said and write it down somewhere. Re-read it during the bad weeks. It will all come true, in some shape, and the parts you forgot are the parts you will learn the hard way alone.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-tonight-text",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Tonight, With Context",
    endingLearnPrompt:
      "You drafted the message slowly. You said three things: Vee called me, the call was about her wanting me to be a good friend to you across years, I wanted you to know tonight rather than waiting. You sent it at 10:14 p.m. Mira read it inside ninety seconds and replied two minutes later with 'okay. I love you. Talk Saturday.' The body that drafted the message was tired and just off a heavy call. The message landed okay. Saturday in person would have been cleaner. Tonight-with-context did not break anything. The full lesson lands; the integration with Mira is one beat less elegant than the calibrated version.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The right call here is to know your own body. If you are a person who can draft a calm three-sentence message at 10 p.m. after a 50-minute heavy phone call, this version works. If you are a person whose drafts at 10 p.m. tend to come out hot, Saturday is the move. Knowing which kind of person you are at 10 p.m. is itself a skill, and most people overestimate their ability to draft calm at the end of long days.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-rushed",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Panicked Text",
    endingLearnPrompt:
      "You texted her at 9:17 p.m., still on the phone with Vee, with no context — 'Vee just called me.' Mira's body went straight into spiral within forty seconds. By 9:23 she was sending the second-wave version of the L3-2 accusation, this time with the new content of 'why is my sister talking to you behind my back.' The call with Vee ended at 9:25 with you handling Mira's spiral while still on speakerphone with Vee, who calmly waited it out. The next two hours were spent doing damage control on a piece of news that was supposed to be a gift. The lesson Vee just delivered to you is now competing for room in your head with the spiral you just produced.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Information delivery to a borderline nervous system has its own physics. Hot context-less text at 9:17 p.m. produces the spiral. Calibrated in-person delivery on Saturday morning produces the integration. The same information lands as either gift or detonation depending on shape and timing. You just learned this through the detonation version, which is recoverable but expensive. Saturday's brunch will now be repair-shaped instead of integration-shaped.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-hidden",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Secret",
    endingLearnPrompt:
      "You decided to keep the call from Mira. By Friday, your interactions with her have been subtly off — the off-ness you cannot help, because you are sitting on a 50-minute conversation with her sister that you have not told her about. Saturday brunch arrives and Vee — keeping her side of the agreement — has already told Mira she called you. Mira asks you about it across the table. You have to admit you didn't tell her. The conversation that follows is not about the survival geometry; it's about the secret. The whole gift of the call is now overlaid with a small structural betrayal. This is recoverable. It is also the version of this scene that costs the most.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Secrets in a friendship with someone with BPD do not stay small. The off-ness leaks before the secret surfaces, and the off-ness gets read by her body as the splitting-trigger her body always reads off-ness as. Vee told you to tell Mira partly because she knows this — she has lived inside the body that reads off-ness as betrayal. The hide-it move was an attempt at protection that produced exactly the harm it was trying to avoid.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-defensive",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Refused Call",
    endingLearnPrompt:
      "You refused the call. The defense consolidated. Vee said something kind, the call ended at minute four, and you spent the next eight months learning each piece of the survival geometry the hard way, alone. Some of the pieces you will not learn at all without the talk — the ecosystem-node frame in particular tends not to surface from inside the FP-bond, because the FP-bond is structurally hostile to the math 'I am one of several.' You will collapse around month nine, like Vee did at month thirty, but with eight months of momentum behind the collapse instead of thirty months of saved capacity. Vee's number is still in your phone. It is unlikely to ring twice.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Most FPs reject the older-sibling call when it arrives, because the FP-bond at month four is structurally hostile to outside framing. Vee got rejected and is not going to push. The lesson that was on offer is real. It is also recoverable across years if you produce the equivalent insights through your own collapse and reconstruction. Most do not, in time. Some do.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-eager",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Confidante Trap",
    endingLearnPrompt:
      "Vee declined the role twice; you continued offering it. The call landed, partly. You got pieces three through six of the geometry but the eager opening installed an undigested expectation across your relationship with Vee — that she will, eventually, be the person you call about Mira. She will not be. By month eight, when you reach for her in a hard week, she will respond kindly and decline, and you will read the decline as cold. The decline is not cold. It is the same decline she stated cleanly on the call. You did not metabolise it then. You will metabolise it slowly, with friction, across the next year.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Receiving a stated boundary requires the same skill as stating one. Vee gave you a clear shape — 'for fires only, not your weekly call' — and the eager body wanted a different shape. The mismatch did not produce a fight; it produced a slow erosion of the goodwill of the call. Most depleted family-of-the-BPD-person have learned to state these boundaries because they have been blown past too many times. Hearing the boundary as information, not as rejection, is the FP-side skill.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-rejected",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Wounded Reception",
    endingLearnPrompt:
      "You received Vee's stated boundary as personal rejection. The call ended intact, with the survival geometry mostly delivered, but with an undigested resentment toward Vee humming under the rest of it. Across the next six months you will not call her, because the wounded reception will quietly keep you from doing so. When you do eventually need her — at month ten, in a real fire — the dialing will feel harder than it should, because the resentment was never named or repaired. The lesson Vee delivered is half-undone by the way you metabolised the boundary that came with it. Repairable, with one short message: 'Rethought your boundary. It was clean. Thank you for stating it. Saving your number for fires.'",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Wounded receptions of stated boundaries are the most under-skilled piece of FP work. The body's reflex is to read 'I am not available for X' as 'I do not love you,' and the reflex is wrong almost every time. The repair sentence — three lines, sent flat — is small, fast, and undoes the mis-metabolisation cleanly. Send it tomorrow. It will land.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira42: Scenario = {
  id: "lm-4-2",
  title: "The Vee Conversation",
  tagline: "Wednesday, 8:42 p.m. The previous FP calls from a layover with the survival-geometry talk. Receiving it has its own skill set.",
  description:
    "POV is the friend. Vee — Mira's older sister and previous FP — calls during an airport layover to deliver the six-piece survival-geometry talk most FPs of someone with BPD never get. The scenario teaches: receiving the call without bonding-against, receiving Vee's stated boundary as information rather than rejection, and integrating the news with Mira on a body-state that lets her metabolise it. Six survival lessons — love AND life, ecosystem-node not all-nodes, plan for the misstep, some moves are not yours, no is not abandonment, the recovery is real. Seven endings.",
  tier: "premium",
  track: "loving-mira",
  level: 4,
  order: 2,
  estimatedMinutes: 16,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 440,
  badgeId: "survival-geometry",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Loving AND having a life — the friendship works because the FP has a life, not because the FP is consumed by it",
    "Ecosystem-node framing — the FP is one of several, not all; trying to be all guarantees collapse",
    "Plan for the misstep — repair fast and small; do not catastrophise the misstep into a global self-verdict",
    "Some moves are not yours — therapy is the therapist's, crisis is the crisis-line's, family-of-origin is family's; the friendship has its own real shape with its own real edge",
    "Saying no is not abandonment — the friend who says calibrated nos keeps the friendship; the friend who absorbs everything collapses and disappears",
    "The recovery is real — research-backed and lived: the cycles shrink, DEAR MAN messages start arriving instead of loops",
    "Receiving stated boundaries as information rather than rejection — the FP-side skill to Vee's modeled-boundary",
    "Calibrated information delivery to a BPD nervous system — the in-person Saturday morning beats the panicked context-less text",
  ],
  redFlagsTaught: [
    "The eager-confidante opening — offering Vee the role of venting partner installs a parallel relationship that excludes Mira and erodes across months",
    "The defensive opening — closing the call at minute four and learning each piece of the survival geometry alone over eight months instead",
    "The hidden secret — keeping the call from Mira leaks off-ness that her body reads as the splitting trigger it always reads",
    "The panicked text — context-less hot information delivery at 9:17 p.m. produces the spiral the in-person delivery on Saturday would have prevented",
    "The wounded reception of a stated boundary — reading 'I am not available for X' as 'I do not love you' and humming undigested resentment for six months",
  ],
  characters: [INNER_VOICE, VEE],
  scenes,
};

export default lovingMira42;
