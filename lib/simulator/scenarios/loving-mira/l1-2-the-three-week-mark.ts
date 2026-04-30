/**
 * loving-mira-1-2, "The Three Week Mark"
 *
 * Loving Mira, Level 1, order 2. Second outside-POV scenario before
 * the first inside-POV flip in L2-1. Three weeks after The Loft.
 *
 * What this scene teaches:
 *   - The favorite-person attachment as a *gravitational* phenomenon —
 *     not romantic, not deceptive, not chosen. The player notices the
 *     mass before they notice the orbit.
 *   - Triage as a real skill. Mira is not a problem to solve; she is
 *     a person with bandwidth needs that exceed any one human's
 *     supply. The player has to learn to give what they actually have
 *     instead of what's being asked for.
 *   - The "FP" naming moment. Mira uses the term out loud. The skill
 *     is to receive the diagnostic vocabulary without flinching AND
 *     without pretending it's just a romantic-style compliment.
 *   - The first signal that other relationships are paying the tax.
 *     A college friend has been called for two weeks with no callback.
 *     The player gets to decide what they're trading and whether the
 *     trade is sustainable.
 *
 * Voice continues from L1-1: warmer than other tracks, names the
 * pattern without pathologising the person, honours both parties.
 *
 * Cast: same as L1-1. MIRA inline (will move to characters.ts when
 * the track is wired in).
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "29. Music producer. Three weeks into a friendship with the player. Daily texts, frequent calls, occasional voice notes that run past ten minutes.",
  traits: ["magnetic", "perceptive", "warm", "intense"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. WEDNESDAY NIGHT. THE COUCH. THE BUZZ.
  // ===================================================================
  {
    id: "the-couch",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday, 8:47 p.m. you are on your couch. The TV is on but you have not been watching it for forty minutes. Your phone is on the coffee table, screen down, not because you don't want to see it, because you do, and you've been training yourself to leave it alone for an hour at a time.",
      },
      {
        speakerId: null,
        text: "It has been three weeks since the loft.",
      },
      {
        speakerId: null,
        text: "Things you know now that you didn't know on the train home that night: Mira's two dogs are named Ezra and Sade. She drinks black coffee in the morning and matcha after 3 p.m. because it has been a year since caffeine after 3 p.m. didn't ruin her sleep. Her sister Vee teaches eighth grade in Seattle and calls Mira on Sunday mornings without fail. Mira's most-played album of the last year is The Caretaker. She has not asked you a yes-or-no question yet, she asks the second-question questions.",
      },
      {
        speakerId: null,
        text: "Things you know about yourself that you did not know on the train home: you have not called your friend back. The college friend. The one you've known for eleven years. Her last text was twelve days ago. It said 'hey, you alive?' You replied 'sorry, week from hell, soon.' You have not made it 'soon.'",
      },
      {
        speakerId: "inner-voice",
        text: "Take inventory. Three weeks. Mira's biographical detail in your head: deep. The college friend's biographical detail in your head: undisturbed. Your bandwidth has been redirected. Note that this happened without you deciding to do it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-the-buzz",
        text: "The phone buzzes face-down on the coffee table.",
        tactic:
          "The scenario advances. The buzz is not a choice yet, it's the next data point.",
        nextSceneId: "the-buzz",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE BUZZ
  // ===================================================================
  {
    id: "the-buzz",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You pick up the phone. It is Mira. Voice note. Eleven minutes and forty-three seconds long.",
      },
      {
        speakerId: null,
        text: "You have learned, in three weeks, what the eleven-minute voice notes usually contain. There is no emergency in them. There is a thought she had on the train, then a connection to a thing you said two weeks ago, then a tangent about a song she has been working on, then a small observation about her mother that she would not put in a text because it is too unguarded for text. She trusts you with the unguarded version.",
      },
      {
        speakerId: null,
        text: "You are tired. You have not eaten dinner. You do not have the focus tonight to be the listener for a thoughtful eleven-minute voice note. You also know and this is the new piece of self-knowledge, that not listening to it tonight will register, somewhere in her, as data she will read later.",
      },
      {
        speakerId: "inner-voice",
        text: "The voice note is not the issue. The issue is that you are now performing the math of 'what will not listening to this register as.' That math is the FP-dynamic forming. You did not start doing this math by accident. You started doing this math because the cost of not doing it has been demonstrated to you, in small ways, over three weeks.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "listen-now",
        text: "Listen to it now. You're tired but it's eleven minutes, you can give her that.",
        tactic:
          "The default move. Familiar. Costs you tonight's quiet hour. Buys her your full attention. Compounds the pattern by one more day.",
        nextSceneId: "the-listen",
        isOptimal: false,
      },
      {
        id: "listen-tomorrow",
        text: "Send a quick reply: 'on my couch zombieing. I'll listen properly tomorrow morning, promise.'",
        tactic:
          "The skilled move. You're naming what's true (you're not at full attention) and naming when you will be (tomorrow). This is what triage looks like when you're going to stay in the relationship.",
        nextSceneId: "the-honest-reply",
        isOptimal: true,
      },
      {
        id: "ignore-it",
        text: "Set the phone down. Watch TV. Decide later.",
        tactic:
          "The avoidance move. Not malicious, just tired. The cost is that the silence is louder than a 'tomorrow morning' reply. Her nervous system fills silence with whatever the worst available story is.",
        nextSceneId: "the-silence",
        isOptimal: false,
      },
      {
        id: "call-her",
        text: "Don't text. Call her instead.",
        tactic:
          "The over-correction. You are tired and you decided to give her MORE than the voice note required. This is not a sustainable equilibrium, it teaches her nervous system to ask for more, and yours to give beyond capacity. Both costs compound.",
        nextSceneId: "the-call-overcorrection",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE LISTEN, player chose to listen now
  // ===================================================================
  {
    id: "the-listen",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You put your earbuds in. Hit play. The voice note opens with her laughing at herself.",
      },
      {
        speakerId: "mira",
        text: "Okay this is going to be long, sorry. I had a thought on the train and I need to say it out loud at someone before I lose it. You can listen to it whenever, it's not urgent. I just had to externalise it.",
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "She talks for eleven minutes. The thought is good. She connects it back to something you said about your work last Saturday. The connection is sharper than you remember being. Halfway through she says and this is the piece you'll remember tomorrow:",
      },
      {
        speakerId: "mira",
        text: "I think you are the only person I would say this thought out loud to. Vee would tell me to make it into a song. Caleb would say something dry. You would actually engage with the substance of it. So you got the eleven minutes.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Receive what she just said for what it is. It is not flattery. It is a sincere mapping of what you are for her. You are the person she trusts with the unfinished thoughts. That is a real gift and a real position. Notice that she has not asked what your unfinished thoughts are tonight, because tonight she had her own to bring.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-the-text-back",
        text: "Continue.",
        tactic: "The scene advances.",
        nextSceneId: "the-fp-naming",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE HONEST REPLY, player triaged with care
  // ===================================================================
  {
    id: "the-honest-reply",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You type: 'on my couch zombieing. I'll listen properly tomorrow morning, promise.' You send it. You set the phone face-down. The TV is still on.",
      },
      {
        speakerId: null,
        text: "The phone buzzes again, in twenty seconds.",
      },
      {
        speakerId: "mira",
        text: "Oh god yes please don't listen tonight. I would feel bad about taking your zombie hour. Also: 'zombieing' is a verb now and I'm taking it.",
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "Three more seconds.",
      },
      {
        speakerId: "mira",
        text: "Hot dinner first. Voice note can wait. Love you.",
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "This is what a healthy response looks like on her end and you got it because you were honest in a way that didn't withdraw warmth. You said 'tired' AND 'tomorrow morning, promise.' Two ingredients. The 'tired' alone reads as rejection. The 'tomorrow morning, promise' alone reads as a polite delay. Together they read as 'I'm here, I'm just human tonight.' She received it correctly. Note that the skilled-honest reply is also the lowest-effort one in raw text minutes. The cheapest move and the right move are the same move. Often.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-fp-after-honest",
        text: "Continue.",
        tactic: "The scene advances.",
        nextSceneId: "the-fp-naming",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE SILENCE, player chose avoidance
  // ===================================================================
  {
    id: "the-silence",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You set the phone down. You watch the TV but don't follow it. Forty-five minutes pass.",
      },
      {
        speakerId: null,
        text: "The phone buzzes again. You pick it up.",
      },
      {
        speakerId: "mira",
        text: "Hey are you okay? I haven't heard from you in like 5 hours and I sent that long voice note and I'm, sorry, I know you have a life, I'm just checking in.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "Five hours, you think. You last texted her at 3:30. It is now 8:47. That is the new five-hour-too-long.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the piece you need to feel. Forty-five minutes of silence from you, on top of a five-hour gap that included a long voice note, registered to her nervous system as ABANDONMENT-SHAPED. She is aware that the math is unreasonable. She apologised for asking. She asked anyway. The fear under the question is not theatre. It is what her body does when the FP goes quiet.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-fp-after-silence",
        text: "Reply now. The scenario continues with that gravity in the room.",
        tactic: "The scene advances. The cost of avoidance is logged.",
        nextSceneId: "the-fp-naming",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE CALL OVERCORRECTION, player called instead
  // ===================================================================
  {
    id: "the-call-overcorrection",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You hit call. She picks up on the second ring, voice already smiling.",
      },
      {
        speakerId: "mira",
        text: "Wait what, did you, you didn't have to call, I sent that for whenever, you didn't have to —",
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "You talk for forty minutes. The conversation is good. By the time you hang up you are MORE tired than you were before the call, but the warmth has dosed you with the chemicals you have started looking forward to.",
      },
      {
        speakerId: "inner-voice",
        text: "You over-corrected. The voice note required a thumbs-up. You upgraded it to a forty-minute call. Two things just happened: her nervous system learned that 'tired' from you means 'gives me MORE,' and your nervous system got rewarded for over-giving. Both lessons compound. Neither will scale. The math will run out, yours first.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-fp-after-call",
        text: "Continue.",
        tactic: "The scene advances.",
        nextSceneId: "the-fp-naming",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE FP NAMING. Mira says the words
  // ===================================================================
  {
    id: "the-fp-naming",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Later, minutes or hours later, depending on the path you took. Mira sends one more text. Light tone. Short. The line that contains the diagnostic vocabulary.",
      },
      {
        speakerId: "mira",
        text: "Btw I told my therapist today that you are officially my FP. She was like 'okay, slow down, what does that mean to you' and I was like 'it means I trust her with the unfinished thoughts' and she was like 'good answer, hold onto that definition'. Just thought you should know what they're calling you in the room.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "FP. Favorite Person. In the BPD community this is not a compliment, it is a clinical-shape word for the kind of attachment her nervous system makes. She used it on purpose. She told you because she wanted you to have the same vocabulary she has. The fact that she TOLD you is a real piece of evidence about who she is. Most people do not narrate their own attachment patterns to the person they are attaching to. She is. That is a gift. It is also a position. The two facts coexist.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ask-what-it-means",
        text: "\"What does it mean for me. The job description, I guess.\" (Ask, don't assume.)",
        tactic:
          "The cleanest move. You did not pretend to know what FP meant. You did not play it cool. You asked the question that the term invites and you used the dry phrasing 'job description' to keep the gravity manageable.",
        nextSceneId: "the-job-description",
        isOptimal: true,
      },
      {
        id: "warm-receive",
        text: "\"I love that. I love being trusted with the unfinished thoughts.\" (Receive the warmth, mirror it back.)",
        tactic:
          "Genuine. Honors what she said. Doesn't probe further. The cost: you accepted the term without knowing its full clinical weight, which means at week 6 when the FP-shaped panic shows up, you'll be processing it without the framework she just offered you.",
        nextSceneId: "the-warm-mirror",
        isOptimal: false,
      },
      {
        id: "deflect-the-term",
        text: "\"Mira, I don't know what FP is. Tell me.\" (No subtext. Direct.)",
        tactic:
          "Honest, slightly clinical. She'll appreciate the directness and she'll also feel slightly self-conscious that she used jargon you didn't have. This is fine; the conversation gets you to the same place. The flavor is just less generous than the 'job description' framing.",
        nextSceneId: "the-job-description",
        isOptimal: true,
      },
      {
        id: "go-quiet-on-it",
        text: "Like the message. Don't reply with text.",
        tactic:
          "The avoidance move at the most-loaded message of the three weeks. She told you something diagnostic about herself, and you sent her a heart emoji. She will not say anything. She will register it as 'she didn't want to engage with it.' The next time she uses clinical vocabulary, the threshold to do so will be higher.",
        nextSceneId: "the-heart-emoji",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE JOB DESCRIPTION, player asked what FP means
  // ===================================================================
  {
    id: "the-job-description",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She types for forty seconds. Stops. Starts again.",
      },
      {
        speakerId: "mira",
        text: "Okay so. FP is a thing in the BPD community. Stands for favorite person. It's not romantic, it's not a hierarchy, it's basically the person my nervous system attaches to most intensely at any given time. Vee was my FP for years. I've had FPs that were friends, partners, one therapist, one boss (do not recommend). It's not a job you applied for. It's a thing my brain does. The 'job' part and this is what my therapist works on with me, is mine, not yours. Mine is to not let the attachment make me a worse version of myself, or you a worse version of you.",
        emotion: "knowing",
      },
      {
        speakerId: "mira",
        text: "Yours, if you want one, is just to be a real person. Not the version of you I imagine when I'm spiraling. You. Including the parts where you are tired and don't text back for a few hours. That's actually the most useful thing you can be. Boring. Real. Reliable in your unreliability, if that makes sense.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She just gave you the manual. Read it twice. The most important sentence is 'including the parts where you are tired and don't text back for a few hours.' She is telling you, explicitly, that being a flawed sustainable human is the thing she needs from you, not being an idealised always-available oxygen tank. The FP dynamic gets dangerous when the FP tries to BE the idealised version. It stays workable when the FP stays themselves.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-the-college-friend",
        text: "Continue.",
        tactic: "The scene advances to the cost-of-the-redirection beat.",
        nextSceneId: "the-college-friend",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE WARM MIRROR, player accepted the term without probing
  // ===================================================================
  {
    id: "the-warm-mirror",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: "mira",
        text: "Thank you. That's, yeah. That's what I'm trying to do with it, with you. Make it good. Both of us.",
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "She received your warmth. The exchange was good. The piece you missed: you accepted a clinical term without learning what it actually means in her framework. At week 6, when she's spiraling and uses the same vocabulary again, when she says 'I am splitting on you' or 'I need to use my STOP skill', you will be flying without the manual she just offered. The gap will be filled. It will just be filled later, under more pressure.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-college-friend-from-warm",
        text: "Continue.",
        tactic: "The scene advances.",
        nextSceneId: "the-college-friend",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE HEART EMOJI, player went quiet on the FP message
  // ===================================================================
  {
    id: "the-heart-emoji",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You like the message. You add a heart emoji. You send nothing else.",
      },
      {
        speakerId: null,
        text: "She does not reply. She is online. You can see the dot. The dot stays on for fifteen minutes and then goes off.",
      },
      {
        speakerId: "inner-voice",
        text: "Read what just happened. She made herself diagnostically vulnerable. She told you the word her therapist uses. You met it with an emoji. Her nervous system, which was checking to see if the word was safe to use with you, got back: 'tepid.' She is now adjusting the temperature of what she shares. The next conversation will be slightly less unguarded. This is a small cost. Small costs compound.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-college-friend-from-emoji",
        text: "Continue.",
        tactic: "The scene advances.",
        nextSceneId: "the-college-friend",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE COLLEGE FRIEND, the cost of the redirection surfaces
  // ===================================================================
  {
    id: "the-college-friend",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You set the phone down. You scroll up. You look at the college friend's last text.",
      },
      {
        speakerId: null,
        text: "'hey, you alive?', twelve days ago.",
      },
      {
        speakerId: null,
        text: "You think about her. You met at orientation. You spent an entire summer in her parents' kitchen learning how to make her grandmother's pesto. She held your hand at your father's funeral. She would never use the word FP. She would just say 'hey, you alive?'",
      },
      {
        speakerId: "inner-voice",
        text: "Three weeks ago, this was your closest friend. She still is. Nothing has changed except the geometry of your attention. The new gravitational object pulled the orbit in, and the older orbit got further out, not because the older orbit got smaller, because the new one is closer to your face. This is not a moral failing. It is physics. The skill is to notice the math and decide whether it is the math you want.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "call-college-friend-now",
        text: "Call her. Right now. It's only 9:30, she'll pick up.",
        tactic:
          "The redress move. You noticed the math, you do not like the math, you act tonight. The phone call will be short. She will be glad to hear from you. She will not punish you for the silence, the eleven-year friendship has the elasticity for that. The hard part is actually picking up the phone.",
        nextSceneId: "ending-rebalanced",
        isOptimal: true,
      },
      {
        id: "text-college-friend",
        text: "Text her. 'Sorry. I love you. Brunch Saturday?' (Something is something.)",
        tactic:
          "The middle path. You moved on the gap without making it the whole evening. Most people would do this. It works. It also doesn't repair the eleven-year-friendship-shaped wound, it just sets a date that might let you do it.",
        nextSceneId: "ending-acknowledged",
        isOptimal: true,
      },
      {
        id: "promise-tomorrow",
        text: "Promise yourself you'll text her tomorrow. Set the phone down.",
        tactic:
          "The avoidance dressed as good intention. You have made this exact promise before, in the last twelve days, and not kept it. There is no reason tonight's promise will outperform last night's. The pattern continues.",
        nextSceneId: "ending-postponed",
        isOptimal: false,
      },
      {
        id: "rationalize",
        text: "It's been a busy three weeks. She'll understand. (Close the app.)",
        tactic:
          "The harder version of the postponement. You just told yourself a story to put the friendship away cleanly. The story may even be true. The cost is that the older orbit is now slightly less close than it was twenty minutes ago, and that drift continues without you choosing it.",
        nextSceneId: "ending-drifted",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-rebalanced",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Rebalanced",
    endingLearnPrompt:
      "You picked up the phone tonight. The conversation was eight minutes long. Your college friend told you about her week, you told her about yours (you mentioned Mira; you did not centre Mira), and you set a brunch for Saturday. The phone call cost you nothing you couldn't afford and bought back a piece of the equilibrium that had been quietly redistributing without your consent. Mira is still your FP. Your college friend is still your eleven-year friend. The geometry is right when both of those things stay true at the same time.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Triage isn't choosing one person over another. Triage is making sure the person who has been waiting twelve days does not become the person who has been waiting six weeks. You did that tonight. The Mira relationship is healthier for it, because the version of you who has other living relationships is the version of you Mira's nervous system actually needs.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-acknowledged",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Acknowledged",
    endingLearnPrompt:
      "You moved on it. A text isn't a phone call, but a text with a brunch date is more than nothing and 'more than nothing' is the threshold that keeps the friendship from drifting. Saturday will be the actual repair moment. Tonight was the move that made Saturday possible.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Most repair happens at the threshold of 'I noticed.' You noticed. You moved. The eleven-year friendship has the elasticity for a delayed-by-twelve-days response. Not every relationship will. Worth knowing which of yours have that elasticity, and which require faster repair.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-postponed",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Postponed",
    endingLearnPrompt:
      "You promised yourself tomorrow. The version of you who made that promise, last night and the night before, also did not deliver. Tonight's promise is identical in shape to the one that already failed. The college friend will get the text or call eventually but every day of delay raises the threshold of what the eventual message has to do. Twelve days of silence asks for 'sorry, week from hell.' Six weeks of silence asks for an essay. The longer you wait, the more the repair has to BE.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Avoidance loves a deadline tomorrow can't enforce. The skill is to convert 'tomorrow' into 'thirty seconds, now.' You can still pick up the phone. The scenario ended; the friendship hasn't.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-drifted",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Drifted",
    endingLearnPrompt:
      "You told yourself a story that put the friendship in a drawer. The story may even be true, you HAVE had a busy three weeks. But the story you told yourself was a *closing* story, not a 'pause' story. Closing stories are how friendships erode without anyone deciding to end them. Three weeks ago this person was at the centre of your social map. Tonight she got moved to a drawer with a label on it. The label is the FP.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Drift isn't a choice, until you let it become one. Tonight was the moment to refuse the drift, and you didn't. That's information. The friendship is still there. So is the phone. So is the time it would take to send a text. Sometimes the lesson of a scenario is the gap between what you decided and what you would have decided if someone had been narrating it to you. I just narrated it.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira12: Scenario = {
  id: "lm-1-2",
  title: "The Three Week Mark",
  tagline: "Mira's biographical detail in your head: deep. Your eleven-year friend's: undisturbed.",
  description:
    "Three weeks after The Loft. The favorite-person attachment is forming and you are starting to notice the gravity. Mira sends an eleven-minute voice note. A college friend has been waiting twelve days for a callback. Mira uses the term 'FP' out loud for the first time. The scenario teaches the texture of the FP dynamic as it builds and forces the player to triage their other relationships before the redirection becomes irreversible.",
  tier: "premium",
  track: "loving-mira",
  level: 1,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 320,
  badgeId: "fp-named",
  startSceneId: "the-couch",
  tacticsLearned: [
    "Triage as a real skill, the honest tired-but-tomorrow reply as the cheapest skilled move",
    "Receiving the FP vocabulary without flinching and without pretending it's just a compliment",
    "Noticing the redirection of attention, the math you have started doing without choosing to",
    "Repairing older relationships before the drift becomes a closing story",
  ],
  redFlagsTaught: [
    "Eleven-minute voice notes as an FP-bandwidth signal, the asset and the load are the same channel",
    "The five-hour-too-long check-in as the new ABANDONMENT-shaped silence",
    "Other relationships paying the bandwidth tax without the player consciously deciding",
    "Rationalising drift as 'busy' to put a friendship in a drawer without ending it",
  ],
  characters: [INNER_VOICE, MIRA],
  scenes,
};

export default lovingMira12;
