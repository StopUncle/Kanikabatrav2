/**
 * loving-mira-4-1 — "Therapy" (INSIDE)
 *
 * Loving Mira, Level 4, order 1. POV is Mira again. Tuesday
 * afternoon, two weeks after the L3-2 devaluation text. Forty-five
 * minutes in Dr. Alana Reyes's office. The first session in which
 * the pattern Mira has been living inside gets named OUT LOUD by
 * someone with the authority to name it accurately.
 *
 * What this scene teaches:
 *   - Receiving clinical feedback without splitting on the
 *     messenger. The BPD-default move when handed a hard mirror is
 *     to recategorise the mirror-holder as bad. Reyes is the test:
 *     can Mira hear "your Tuesday text was a reassurance-seeking
 *     loop" without flipping Reyes into the antagonist column?
 *   - DEAR MAN as the structured reframe of the SAME underlying
 *     need. The 'are we okay?' text was not the wrong reach — it
 *     was the wrong shape of the right reach. DEAR MAN gives Mira
 *     the shape: Describe, Express, Assert, Reinforce / Mindful,
 *     Appear confident, Negotiate. Same need, met-able request.
 *   - Curiosity as the receptive stance. Defensiveness, collapse,
 *     and protest are three different versions of the same
 *     non-receptive stance. Curiosity is the fourth move and the
 *     only one through which the DEAR MAN lesson can land.
 *   - Splitting in real time, observed and named. When Mira's body
 *     starts to flip Reyes from 'safe person' to 'attacking me,'
 *     Reyes has the option to interrupt the flip BEFORE it
 *     consolidates. This is one of the hardest interventions in
 *     DBT and Mira's body's response to it is the gating mechanism
 *     for the whole session.
 *
 * Voice: inside POV. Mira's perception of Reyes is part of the
 * scene — what she notices about the office, about Reyes's voice,
 * about the moments she wants to leave. Kanika in italics
 * occasionally to call out the splitting move as it tries to
 * happen.
 *
 * Cast: MIRA (POV), DR. REYES, INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "29. Music producer. Two weeks past the L3-2 devaluation Tuesday. Sitting in the chair across from Dr. Reyes for the 47th time.",
  traits: ["sensitive", "intense", "in-treatment"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const REYES: Character = {
  id: "reyes",
  name: "Dr. Reyes",
  description:
    "Mira's DBT therapist for the past two years. Mid-thirties, Sri Lankan-American, never wears makeup, keeps a small ceramic owl on her desk that her daughter made.",
  traits: ["calm", "calibrated", "non-reactive"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME — POV switch + receiving-feedback skill
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "POV is Mira again. The 'you' from here on is her body, her chair, her therapist, her two weeks of trying to integrate the Tuesday text she sent at 6:42 p.m. The session is the 47th she has had with Dr. Reyes over the past two years.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What this scene is about is the harder half of recovery. The first half is impulse control in the moment — the GIVE-and-TIPP work the previous scenes tested. The second half is metabolising clinical feedback ABOUT the moments after they happen. Most BPD relapse is not a failure of in-the-moment skill. It is a failure to receive the named pattern without splitting on the namer.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Reyes is about to use the phrase 'reassurance-seeking loop' to describe Mira's Tuesday text. Mira's body has four available stances at the moment of the naming. Three of them protect her from the feedback. One of them lets the feedback land. The skill of this scene is choosing the fourth one — and, when one of the first three accidentally fires first, catching it inside two minutes and switching to the fourth.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Mira. The office.",
        tactic: "The session begins.",
        nextSceneId: "the-office",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE OFFICE
  // ===================================================================
  {
    id: "the-office",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 3:14 p.m.",
      },
      {
        speakerId: null,
        text: "The office is the same office. Same square of light through the south window. Same ceramic owl on the desk that her daughter made when she was six. Same lamp in the corner that Reyes never turns on, which Mira finds reassuring, the way she finds the lamp's not-being-on a reliable feature of the space.",
      },
      {
        speakerId: null,
        text: "Reyes is wearing a grey cardigan and the small wooden earrings she has had for at least the last fourteen sessions. She is not wearing makeup. She never wears makeup. Mira has cataloged this over two years and finds it useful — Reyes's face is the face it is, every time.",
      },
      {
        speakerId: null,
        text: "You have just spent the first eleven minutes of the session running through the Tuesday text, the second wave, and the version of the call you nearly made at 7:09 before your phone rang because it was your sister. You have been mostly accurate. You have softened two of the messages by about 15% from how they actually read on the screen.",
      },
      {
        speakerId: "reyes",
        text: "Okay. I want to step back. Before we go to the second wave, can I name what I'm noticing about the first text?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You feel your spine adjust slightly in the chair. You did not move. The adjustment was internal. Your body just did the small bracing thing it does when the next sentence is going to be the one you have been running from for two weeks.",
      },
      {
        speakerId: "inner-voice",
        text: "The bracing is the body's prediction. It is not always right. It is right today.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "say-yes",
        text: "Say yes.",
        tactic: "She is asking permission. The asking-permission move from the therapist is itself a calibration — she is not going to deliver the feedback into a body that hasn't consented to receiving it. Saying yes is the first piece of the skill.",
        nextSceneId: "the-naming",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE NAMING
  // ===================================================================
  {
    id: "the-naming",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "You say yes. You do not say it gracefully. You say it with the particular texture of someone braced for a verdict.",
      },
      {
        speakerId: "reyes",
        text: "The first text on Tuesday — 'you've been weird with me for days, you're pulling away, I knew you would, don't lie to me' — that's a reassurance-seeking loop. The fact-base for it was about two hours of slow reply on Thursday. The text wasn't connection. It was a request for reassurance, dressed as an accusation.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She doesn't say it gently. She doesn't say it harshly either. She says it the way a doctor says a diagnosis — accurate, bounded, not flinching from the words but also not loading them up with extra weight.",
      },
      {
        speakerId: null,
        text: "The first thing your body does, in the next half-second, is heat. The chest, the jaw, the place behind the eyes. The heat says: this is not fair. The heat says: she doesn't know what it actually feels like. The heat says: the feeling was real.",
      },
      {
        speakerId: null,
        text: "The second thing your body does, immediately under the heat, is collapse. The chest goes hollow under the heat. The collapse says: oh. oh god. I am a monster. I have been doing this for two years. She thinks I'm broken. Everyone thinks I'm broken.",
      },
      {
        speakerId: null,
        text: "The third thing your body does — slower, more available the longer you stay still — is the protest. The protest is different from the heat. The protest says: but I had a REAL feeling. What was I supposed to do?",
      },
      {
        speakerId: null,
        text: "There is also a fourth thing. It is the slowest of the four. It is the one that requires not deploying the first three. It is the curiosity move.",
      },
      {
        speakerId: "inner-voice",
        text: "Four stances are available in the next ten seconds. Three of them protect you from the feedback. One of them lets the feedback land. Defense moves Reyes into the antagonist column. Collapse moves you into the unsalvageable column, which is also a way of avoiding the work of integration. Protest moves the conversation to whether the feeling was real, which is not the actual question — the question is what shape the feeling went out the door wearing. Curiosity is the only stance through which what Reyes is about to teach you can actually land.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "defensive",
        text: "Defensive. 'That's not what I was doing. I was being honest about my feelings.'",
        tactic: "The hot move. Most clinically common stance with new feedback. Will not produce a fight with Reyes — she is too calibrated for that — but will burn most of the session on her interrupting the splitting move that is now starting to flip her into the antagonist column.",
        nextSceneId: "defensive-1",
        isOptimal: false,
      },
      {
        id: "collapse",
        text: "Collapse. 'Oh god, I'm a monster. I should never text anyone again. I'm doing it to her.'",
        tactic: "The hollow move. Looks like remorse, functions as a different version of reassurance-seeking — now from Reyes. Reyes will not provide the reassurance. The session goes to the work of recognising the move as a move.",
        nextSceneId: "collapse-1",
        isOptimal: false,
      },
      {
        id: "protest",
        text: "Protest. 'But the feeling was REAL. I wasn't making it up. So what was I supposed to do?'",
        tactic: "The middle move. Different from defense. The protest accepts that something happened — it just contests whether the feeling was illegitimate. Reyes can work with this. Validates the feeling, then redirects to the question of expression-shape. Lands close to curiosity.",
        nextSceneId: "protest-1",
        isOptimal: false,
      },
      {
        id: "curiosity",
        text: "Curiosity. 'Okay. Say more. What does that actually look like — what's the difference between the loop and connection?'",
        tactic: "The receptive move. Hardest to produce because the body is hot and hollow at the same time and curiosity is a slower thing than either. The cleanest run available — opens directly into the DEAR MAN teaching.",
        nextSceneId: "curiosity-1",
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
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "The hot version of the sentence comes out before you can edit it.",
      },
      {
        speakerId: null,
        text: "YOU: 'That's not what I was doing. I was being honest about my feelings.'",
      },
      {
        speakerId: null,
        text: "Reyes does not flinch. Her face does not change. She lets a beat pass. She does the thing she does where she sits with the sentence for two seconds before responding to it, which is the thing about her that Mira sometimes finds reassuring and sometimes finds infuriating, and right now finds infuriating.",
      },
      {
        speakerId: "reyes",
        text: "Mira. Pause for me. I want to name something happening in the room right now, with both of us. Are you available for that?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Your body has, in the last forty seconds, started to do the small move it does where Reyes flips from 'the person who has helped me' to 'the person who is now cornering me, which is who she has actually been all along, I just couldn't see it.' You have been here before. You recognise it.",
      },
      {
        speakerId: "inner-voice",
        text: "This is splitting in real time. The brain you have, when it receives feedback that produces hot AND hollow simultaneously, recategorises the feedback-giver. Reyes is being flipped from 'safe' to 'attacking.' If the flip consolidates, the rest of the session is unsalvageable; you will leave at 4 p.m. having burned the room. Reyes is offering you a hand BEFORE the flip consolidates. The hand is the question 'are you available for that.' The available answer is yes.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "double-down",
        text: "Double down. 'I'm available for it but I think you're being unfair right now.'",
        tactic: "The flip consolidates. Reyes will not chase. The session ends ten minutes from now with you walking out at 3:42, telling yourself she has lost the plot. By 8 p.m. tonight you will be in the empty room with no therapist available because you just unloaded on her.",
        nextSceneId: "defensive-walkout",
        isOptimal: false,
      },
      {
        id: "yes-tell-me",
        text: "Take a breath. 'Yeah. Okay. Tell me what you're noticing.'",
        tactic: "The interrupt-the-flip move. Hardest piece of in-session DBT — letting the therapist name what your body is doing while your body is doing it. The flip de-consolidates. The session is recoverable.",
        nextSceneId: "interrupt-the-flip",
        isOptimal: true,
      },
    ],
  },

  {
    id: "defensive-walkout",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "You leave at 3:42. You tell yourself she has lost the plot. By 8 p.m. you are in the empty room with no therapist available because you just unloaded on her.",
      },
      {
        speakerId: null,
        text: "By Thursday, the splitting move has begun to soften. By Saturday, the body that walked out has produced enough remorse to make the apology email difficult to write. You write it on Sunday. Reyes responds, calmly, on Monday morning: 'See you Tuesday at the usual time.' She does not punish. She also does not pretend it didn't happen. The next session opens with the same question.",
      },
      {
        speakerId: "inner-voice",
        text: "The splitting walkout is not catastrophic. It is expensive — a week of in-room work, a Sunday-afternoon repair email, a delayed metabolisation of the actual lesson. Reyes is calibrated enough that the relationship survives. Most therapists are. The cost is borne by you, not by her — a week of additional spiralling that the in-session interrupt would have prevented.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-walkout-end",
        text: "End scene.",
        tactic: "The defensive-walkout ending.",
        nextSceneId: "ending-walkout",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // INTERRUPT THE FLIP — recovery from defense
  // ===================================================================
  {
    id: "interrupt-the-flip",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: "reyes",
        text: "What I'm noticing is that something I said about the Tuesday text just produced heat in your face and a stiffening in your posture. That heat is information — your body is registering that the feedback I gave is unfair, or attacking, or wrong. I want to ask you to do something hard, which is to hold the heat without acting on it for ninety seconds. We can come back to whether it was unfair. I want the heat to be visible to both of us first.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She does not say 'you are splitting on me.' That is not the move. She names the body data — the heat, the posture — without naming the clinical pattern. The clinical pattern is for later, after the body has come down. Naming the pattern while the body is hot is itself a heat-producing event.",
      },
      {
        speakerId: "inner-voice",
        text: "This is what good DBT looks like in the room. It is not insight-delivery. It is body-tracking with a calibrated witness. The witness names what the body is doing in language the body can hear. Two years of this work has built the muscle that lets you, today, take her offered hand and stay in the chair.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You hold the heat. It does not get quieter on its own. It does get less THICK. By the second minute, the bracing thing in your spine has unclipped one notch. Reyes does not fill the silence. The room does the work the silence was always going to do.",
      },
      {
        speakerId: "reyes",
        text: "Okay. Tell me what's there now.",
        emotion: "knowing",
      },
      {
        speakerId: "mira",
        text: "I'm scared you're going to tell me I'm broken.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "The sentence comes out flatter than you meant it. It is also accurate. It is the actual content of the heat-and-collapse you have been holding for ninety seconds. You did not know it was the content until the silence produced the room you needed to know it.",
      },
      {
        speakerId: "reyes",
        text: "I'm not going to tell you you're broken. I'm going to tell you the Tuesday text was a reassurance-seeking loop, which is a SHAPE, not an identity. The work is on the shape. Want to look at the shape with me?",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "look-at-the-shape",
        text: "Yeah. Show me.",
        tactic: "The recovery is complete. Heat held, named, validated. The session opens into the DEAR MAN teaching from a recovered position rather than a clean one.",
        nextSceneId: "dear-man-teach",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // COLLAPSE PATH
  // ===================================================================
  {
    id: "collapse-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "The hollow move comes out at the volume your body is producing it at, which is small.",
      },
      {
        speakerId: null,
        text: "YOU: 'Oh god. I'm a monster. I'm doing it to her. I should just... I should never text anyone again.'",
      },
      {
        speakerId: null,
        text: "Your eyes are wet without your permission. You are 80% sincere. The other 20% is the part of your body that is reaching for Reyes to come fix this — to say 'no, you're not a monster, you're not broken, you're a good person who's working on a hard pattern.' The 20% is recognisable to you because you have done this exact move with Vee and with Cameron and with the FP, and Reyes has named it before.",
      },
      {
        speakerId: "reyes",
        text: "Pause. I'm noticing what you just did.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Her voice is the voice she uses when she is about to say a hard thing softly. Not the warm voice. Not the cold voice. The third voice.",
      },
      {
        speakerId: "reyes",
        text: "I gave you a piece of feedback about a SHAPE. You converted it, in twenty seconds, into a global self-verdict — 'I'm a monster, I should never text anyone again.' That conversion is its own version of the loop we were just talking about. You're asking me to come comfort the verdict. I'm not going to do that, because the verdict is not the truth, and even if I came to comfort it, the comfort would last about an hour. We have a different option. Want me to name it?",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She just refused the reach. This is the most important move a DBT therapist makes when the client deploys collapse. She is not abandoning you. She is not punishing the move. She is also not participating in it. The refusal of reach is itself the next layer of the same skill.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "double-collapse",
        text: "Double down on the collapse. 'No I really am, you don't understand, I was awful to her —'",
        tactic: "The collapse-spiral consolidates. Reyes stays calm, doesn't chase, waits it out. The session ends with you having burned 30 minutes on the spiral instead of the lesson. The body learns that collapse with Reyes does not produce comfort — which is itself useful, but it is the slow version of the lesson.",
        nextSceneId: "collapse-spiral",
        isOptimal: false,
      },
      {
        id: "name-it",
        text: "Stop. 'Yeah. I'm doing it. Name it.'",
        tactic: "The interrupt-the-collapse move. Says: I see myself reaching, I know it is a reach, I am not going to make you fight me to redirect. Opens directly into the DEAR MAN teaching from a recovered position.",
        nextSceneId: "interrupt-the-collapse",
        isOptimal: true,
      },
    ],
  },

  {
    id: "collapse-spiral",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "You spend the next thirty minutes on the spiral. Reyes interrupts gently three more times. Each time you slide back. By 4 p.m. the session is over. You have learned, again, that Reyes will not provide the reassurance the collapse reaches for. You have not learned, this week, the DEAR MAN reframe that was waiting on the other side of the collapse.",
      },
      {
        speakerId: "inner-voice",
        text: "The spiral is not a wasted session — body learning that collapse-with-Reyes does not produce comfort is itself a slow piece of the recovery. It is also not the cleanest run available. The DEAR MAN teaching is on the calendar for next week now. You will arrive on Tuesday slightly more ready to receive it because of today, but slightly less integrated than the version of you that interrupted the collapse at minute three.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-collapse-end",
        text: "End scene.",
        tactic: "The collapse-spiral ending.",
        nextSceneId: "ending-collapse",
        isOptimal: false,
      },
    ],
  },

  {
    id: "interrupt-the-collapse",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: "reyes",
        text: "Good. Here's the option. The text on Tuesday — 'you've been weird with me for days' — that's the wrong shape of a real need. The need is real. The need was 'I am scared you are slipping; I would like a small reassurance.' The shape your nervous system produced was an accusation, because the accusation gives your body the activation it knows. There is a different shape. It is called DEAR MAN. Want to look at the shape?",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The collapse, in saying 'name it' and meaning it, has lost about 60% of its hold on your chest. The hollow has not fully unclipped. It is sittable now, instead of consuming.",
      },
    ],
    choices: [
      {
        id: "to-dear-man-from-collapse",
        text: "Yeah. Show me.",
        tactic: "Recovery from collapse complete. The DEAR MAN teaching opens.",
        nextSceneId: "dear-man-teach",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // PROTEST PATH
  // ===================================================================
  {
    id: "protest-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "The protest is closer to honest than the defense was. It comes out clean.",
      },
      {
        speakerId: null,
        text: "YOU: 'But the feeling was REAL. I wasn't making it up. So what was I supposed to do?'",
      },
      {
        speakerId: "reyes",
        text: "The feeling was real. I'm not contesting the feeling. The feeling was: 'I am scared she is slipping.' That is a legitimate feeling that arrived in your body on Tuesday afternoon, and there are several ways it could have left your body when it did. The shape it left in was an accusation. The accusation is what we're looking at — not the feeling. The feeling is welcome here.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The protest deflates by about half. Not because she contradicted it — because she did not contradict it. The thing the protest was trying to defend turned out not to be under attack. The protest had been bracing against an attack on the legitimacy of feelings. The actual feedback was about expression-shape, which is a different thing.",
      },
      {
        speakerId: "inner-voice",
        text: "Most BPD clients land on protest before they land on curiosity. The protest comes from a body that has spent decades being told its feelings were too big, too inappropriate, too intense — so when feedback arrives that LOOKS like 'your feeling was wrong,' the protest fires reflexively to defend the feeling. The skill is recognising that 'the shape was off' is not the same statement as 'the feeling was wrong.' Most therapists who specialise in this work spend whole months on this distinction.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-curiosity-from-protest",
        text: "Lean in. 'Okay. So what's the shape supposed to look like?'",
        tactic: "The protest converts to curiosity. Same posture as the curiosity-from-start path; the path just took an extra beat.",
        nextSceneId: "dear-man-teach",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // CURIOSITY PATH
  // ===================================================================
  {
    id: "curiosity-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: null,
        text: "The curiosity comes out at the volume of someone who has been doing this work for two years and recognises, faster than her body wants to recognise it, that the receptive move is the one that produces useful information.",
      },
      {
        speakerId: null,
        text: "YOU: 'Okay. Say more. What's actually different about a reassurance-seeking loop versus connection? I want to see the shape.'",
      },
      {
        speakerId: "reyes",
        text: "Good. That's the move. Let me draw it for you.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She picks up the small notebook she keeps on the side table for the times when shapes have to be drawn. She draws two columns. She labels them.",
      },
      {
        speakerId: null,
        text: "LEFT COLUMN: 'Reassurance-Seeking Loop.' Underneath: accusation as the wrapper, the response is asked to disprove the accusation, the disproof briefly soothes the body, the body returns to the same state in 12 minutes, the cycle repeats with a bigger claim.",
      },
      {
        speakerId: null,
        text: "RIGHT COLUMN: 'DEAR MAN.' Underneath: the same need, expressed in a way the other person can actually meet. Six letters. She walks you through them.",
      },
    ],
    choices: [
      {
        id: "to-dear-man",
        text: "Lean in.",
        tactic: "The curiosity-from-start ending opens directly into the DEAR MAN teaching, with the most metabolisable body-state available.",
        nextSceneId: "dear-man-teach",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // DEAR MAN TEACH — the convergence point
  // ===================================================================
  {
    id: "dear-man-teach",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: "reyes",
        text: "Describe. Just the facts. 'I noticed I haven't heard from you since Thursday afternoon.' That's it. No interpretation. No 'you're being weird.' Just the observable thing.",
        emotion: "knowing",
      },
      {
        speakerId: "reyes",
        text: "Express. Your feeling, owned as yours. 'I'm feeling anxious, and I'm noticing my nervous system is starting to spin a story.' Not 'you are making me feel.' Yours.",
        emotion: "knowing",
      },
      {
        speakerId: "reyes",
        text: "Assert. The thing you actually want, said directly. 'I'd like to hear from you, even if it's just a quick message.' Not implied. Not extracted through accusation. Said.",
        emotion: "knowing",
      },
      {
        speakerId: "reyes",
        text: "Reinforce. Why it would help. 'It would help me settle, and I think it would also keep me from spinning a story that probably isn't true.' This piece is what most people skip. It is the piece that tells the other person why the request is worth fulfilling — not as a guilt trip, but as a real piece of information about effect.",
        emotion: "knowing",
      },
      {
        speakerId: "reyes",
        text: "Mindful. Stay on the topic. Don't pull in the unanswered text from three weeks ago. Don't pull in the dinner she was late to. One topic, one request, one beat.",
        emotion: "knowing",
      },
      {
        speakerId: "reyes",
        text: "Appear confident. Not in performance — in posture. Not whiny. Not desperate. Calibrated. A request from a steady self, not a panicked self. You can be panicked AND express the request from steadiness; the body work is in the second half.",
        emotion: "knowing",
      },
      {
        speakerId: "reyes",
        text: "Negotiate. Open to her response. She might not be able to do exactly what you asked. The DEAR MAN is a starting point, not an ultimatum.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She tears off the page from the notebook. She hands it to you. She does not say 'now go do this.' She says one more thing.",
      },
      {
        speakerId: "reyes",
        text: "The same need that produced Tuesday's accusation can produce a DEAR MAN message. The need is identical. The shape is different. Your body is going to want to deploy the loop because the loop is faster — it produces activation, which the body reads as relief, which trains the body to produce loops. DEAR MAN is slower. It also gets met. The accusation almost never gets met, even when the other person tries to meet it, because the shape itself rejects being met.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is the lesson. It is not about changing the feeling. It is about changing the shape the feeling leaves the body in. Same need, different shape. The DEAR MAN message her FP would have received instead of 'you've been weird with me for days' would have produced a 90-second response that actually MET the underlying need. The accusation produced a fight that did not meet anything.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "the-rewrite",
        text: "Rewrite Tuesday's text using the shape.",
        tactic: "Reyes asks Mira to draft the DEAR MAN version of the text she actually sent, in real time, in the room. This is the integration step.",
        nextSceneId: "the-rewrite",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-rewrite",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["reyes"],
    dialog: [
      {
        speakerId: "reyes",
        text: "Take a minute. Write the version of Tuesday's text that uses the shape. Don't send it — Saturday already happened, and the friendship survived. Just write it. I want you to feel what it would have been like to send.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You take the page. You write four sentences. You read them back. You change one word.",
      },
      {
        speakerId: "mira",
        text: "Hey. I noticed I haven't heard from you much since Thursday afternoon, and my nervous system is starting to spin a story that you're slipping. I'd love a quick message — even something tiny — just to settle me. I know it's probably my anxiety, not you.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You read it back. You feel — and this is the moment that the lesson lands in the body, not in the head — what it would have been like to RECEIVE that text instead of the accusation. From the FP's side, the DEAR MAN version is met-able. The accusation version is a thing she has to defend against.",
      },
      {
        speakerId: "reyes",
        text: "That's it. You wrote it cleanly. The shape that would have changed the entire week.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The DEAR MAN message you just wrote is identical in NEED to the message you sent on Tuesday. It is different in SHAPE. The shape difference is the entire lesson of this scene. Most BPD recovery is teaching the body, over hundreds of trials, to produce the right shape for the right need. It is not glamorous work. It is also the work that produces the 93% remission across ten years that the research describes.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "session-end",
        text: "Session ends. The page goes in your bag.",
        tactic: "The integration is complete enough. The work continues outside the room.",
        nextSceneId: "ending-curiosity",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-curiosity",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Shape Learned",
    endingLearnPrompt:
      "You stayed in the chair. You held the heat-and-hollow long enough for the curiosity stance to be available. You took Reyes's drawn columns and you wrote the DEAR MAN version of Tuesday's text in real time. The page is in your bag now. The lesson is one you will need to deploy maybe forty times before your body produces the right shape on the first reach instead of the loop. Tonight you will probably catch yourself reaching for the loop with someone — your sister, the FP, even Reyes herself — and you will catch it inside two sentences and switch shapes. That switching is what 18-month recovery looks like in practice. Same need, different shape. The accusation almost never gets met. The DEAR MAN message gets met about 80% of the time. The math, over years, is the entire game.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You did the harder half today. The first half is impulse-control in the moment — TIPP, urge-surfing, the cold water at 11:14 p.m. The second half is metabolising the named pattern AFTER the fact, without splitting on the namer. The second half is what most BPD clients quit before they finish, because the second half feels like being told you are broken. It is not that. It is being told there is a different shape for the same need. You heard the difference today.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-walkout",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Walkout",
    endingLearnPrompt:
      "You let the splitting move consolidate. You walked out at 3:42, told yourself Reyes had lost the plot, and spent the evening alone with no clinical scaffolding to receive the spiral. By Saturday the apology email is the work in front of you, which you do not want to do, because the body still has 20% of the splitting move active. You write it on Sunday. Reyes responds calmly on Monday. The next session opens with the same question the last session ended with. The cost of the walkout is one week of additional spiralling — not catastrophic, but expensive. The lesson you needed today gets delayed by seven days, and your nervous system is now seven days more familiar with the splitting-on-Reyes pattern, which means the next time the heat-and-hollow lands in session, it will fire slightly faster.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Splitting on the therapist is the most common reason BPD clients drop out of treatment before recovery. Reyes is calibrated enough that the relationship survives one walkout, two walkouts, probably even five — but each one is a piece of the work that did not get done in the room. The available next move is the apology email. Write it short. Don't make it a five-paragraph self-flagellation. Three sentences: 'I left in a heat I now recognise. I want to come back Tuesday at the usual time. I'd like to pick up where we left off.' That email gets the room back. Five-paragraph emails are themselves a version of the loop.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-collapse",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Spiral",
    endingLearnPrompt:
      "You spent thirty minutes of the session inside the collapse spiral. Reyes interrupted gently three times. Each time you slid back. By 4 p.m. the session ended without the DEAR MAN reframe ever being delivered. The body learned, again, that Reyes will not provide the reassurance the collapse reaches for — which is itself a slow piece of recovery, but it is not the cleanest version available. The DEAR MAN lesson is on the calendar for next week. You will arrive Tuesday slightly more ready, slightly less integrated than the version of you who interrupted the collapse at minute three. The cost of the unprocessed week: probably one to two more loop-shaped messages to people you love, which you will then bring back to next Tuesday's session.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Collapse is itself a reassurance-seeking shape. The accusation reaches for reassurance through accusation. The collapse reaches for reassurance through self-verdict. Both reach. The shape is different; the underlying mechanism is identical. The skill of collapse-recovery is the same skill as accusation-recovery: notice the reach, name it, switch shape. Reyes will keep being there. She is calibrated for it.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira41: Scenario = {
  id: "lm-4-1",
  title: "Therapy",
  tagline: "Tuesday, 3:14 p.m. Reyes is about to use the phrase 'reassurance-seeking loop.' Curiosity is the only stance through which the lesson lands.",
  description:
    "POV is Mira inside Dr. Reyes's office, two weeks after the L3-2 devaluation. Reyes names the Tuesday text as a reassurance-seeking loop. Four available stances at the moment of the naming — defense, collapse, protest, curiosity — three of which protect against the feedback and one of which lets it land. The scenario teaches: receiving clinical feedback without splitting on the therapist (the most common BPD treatment-dropout mechanism); recognising defense and collapse as two shapes of the same non-receptive move; the DEAR MAN reframe (Linehan) as the structured way to express the same need that produced the accusation; the page-in-the-bag rewrite of the actual Tuesday text. Six endings.",
  tier: "premium",
  track: "loving-mira",
  level: 4,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 420,
  badgeId: "shape-learned",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Receiving clinical feedback without splitting on the messenger — the in-session interrupt move",
    "Recognising defense and collapse as two shapes of the same non-receptive stance",
    "DEAR MAN structure (Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate) as a met-able alternative to the reassurance-seeking accusation",
    "Same need, different shape — most BPD recovery is teaching the body to produce the right shape for the right underlying need",
    "Curiosity as the receptive stance — the body work of holding heat-and-hollow long enough for curiosity to become available",
    "The integration rewrite — re-drafting a past loop-shaped message in DEAR MAN form, in the room, to feel the difference",
  ],
  redFlagsTaught: [
    "Splitting on the therapist as the leading cause of BPD treatment dropout — the heat that recategorises the feedback-giver as the antagonist",
    "Collapse as a different shape of the same reassurance-seeking move — reaching for the therapist to provide the reassurance the loop usually extracts from a partner",
    "Five-paragraph apology emails as themselves a version of the loop — long-form remorse extracts more reassurance than short-form repair",
    "Confusing 'the shape was off' with 'the feeling was wrong' — the reflexive protest that defends a feeling that was never under attack",
  ],
  characters: [INNER_VOICE, MIRA, REYES],
  scenes,
};

export default lovingMira41;
