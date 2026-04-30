/**
 * loving-mira-1-1, "The Loft"
 *
 * Loving Mira, Level 1, order 1. Opens the BPD narrative track.
 *
 * Track purpose (see reference/TRACK-bpd-design.md): the only track
 * where the antagonist is also a victim. The player learns to stay in
 * love with someone they can't fix without losing themselves. POV
 * switches across the arc, outside scenarios are FP perspective,
 * inside scenarios put the player INSIDE Mira's experience. Scene 1
 * is outside (FP / player-meets-Mira) so the player attaches to her
 * before the inside scenes flip them.
 *
 * What this scene teaches:
 *   - Idealization is real and felt, not a calculated trick. Drinking
 *     the dopamine is not a moral failing; staying yourself while it
 *     happens is the skill.
 *   - The shape of the BPD "favorite person" attachment as it forms.
 *     Hour-1 you're a stranger. Hour-6 you're being introduced as her
 *     favorite person of the year. The intensity is the data, the
 *     player should feel the gravitational pull and recognise it as
 *     pull, not as fate.
 *   - Stay-present-without-losing-center. The choice between three
 *     postures (drink it / deflect / meet it) plays out the cost of
 *     each in the same evening, so the player gets a calibrated read
 *     on what each posture buys.
 *
 * Voice: reference/KANIKA-VOICE.md, with the warmer tone notes from
 * TRACK-bpd-design.md. This track teaches grace, not threat-spotting.
 *
 * NOTE: Mira and the rest of the loving-mira cast will be moved into
 * lib/simulator/characters.ts once the track is wired in. For Scene 1
 * draft we keep them inline so the file ships as a complete artifact.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "29. Music producer working out of a converted warehouse loft in Williamsburg. Two song placements in indie films, a small but rabid SoundCloud following. Sleeve tattoo of stars on her left arm. Loves dogs more than people. Magnetic to the point of disorienting. Diagnosed BPD at 24, in DBT for two years. Knows what she does. Cannot always stop the part of herself that does it.",
  traits: ["magnetic", "perceptive", "warm", "intense"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  // ===================================================================
  // OPENING. THE PARTY, THE CORNER, THE FIRST 90 SECONDS
  // ===================================================================
  {
    id: "the-corner",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 9:14 p.m. a friend's 30th. Your friend's apartment is too small for the number of people who showed up. You don't know most of them. You parked yourself in the corner by the bookshelf because the corner has a view of the door and a glass of wine within reach.",
      },
      {
        speakerId: null,
        text: "You are one drink in. You are reading a spine on the bookshelf. Joan Didion, the Year of Magical Thinking, when someone steps into your peripheral and says, without preamble:",
      },
      {
        speakerId: "mira",
        text: "She's the only writer I trust to actually mean what she says. Most of them are lying. She's just typing.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You turn. The woman who said it is small, dark-haired, sleeve-tattoo, holding a beer she clearly hasn't drunk from in twenty minutes. She is looking at you like she has been waiting for you to turn.",
      },
      {
        speakerId: "mira",
        text: "Sorry. I should. I'm Mira. I came with Caleb. I've been watching you stand there reading bookshelves for fifteen minutes and I decided either you're the most interesting person here or you're trying to disappear. Which is it.",
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "Note the velocity. She has been observing you. She names the observation. She offers you a binary, both flattering. This is hour zero. This is how it starts.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "match-her",
        text: "\"Trying to disappear. You ruined it.\" (Match the energy. See where it goes.)",
        tactic:
          "Honest, dry, returns the volley. The right answer for a stranger you find interesting. No commitment yet, just a real exchange.",
        nextSceneId: "the-conversation",
        isOptimal: true,
      },
      {
        id: "polite-deflect",
        text: "\"Just enjoying the quiet.\" (Polite. Closes the loop.)",
        tactic:
          "The wall. Mira will respect it for ninety seconds and move on. You will spend the rest of the night wondering what the conversation would have been.",
        nextSceneId: "the-deflection",
        isOptimal: false,
      },
      {
        id: "drink-it",
        text: "\"Most interesting person here, definitely.\" (Lean into the flattery. Big smile.)",
        tactic:
          "She offered the binary as a joke. You took the flattering option as truth. This is fine but read what it teaches her: you accept big claims at face value. Useful information for what comes later.",
        nextSceneId: "the-conversation",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE DEFLECTION PATH, short branch, returns to main
  // ===================================================================
  {
    id: "the-deflection",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "mira",
        text: "Got it. Apologies for the intrusion. The Didion is the right pick, by the way.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She steps away. You watch her cross the room and engage someone else with the same observational opening. By eleven you're at the door with your coat on. You'll think about her on the train home for reasons you can't articulate.",
      },
      {
        speakerId: "inner-voice",
        text: "The wall worked. You preserved your evening. You also said no to a person who would have remembered you and at hour zero, there was no cost to saying yes that you knew about yet. This is one valid posture. Note that you used it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "deflection-ending",
        text: "Leave the party. Go home.",
        tactic:
          "You closed a door before it opened. Sometimes that's the move. There's no failure here but there's no scenario either. End.",
        nextSceneId: "ending-walked-early",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE CONVERSATION, minutes 5-30
  // ===================================================================
  {
    id: "the-conversation",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Twenty minutes pass before either of you notices. She has pulled up the chair from the corner. You have set the wine down. The party noise has receded, not because it got quieter, because your attention narrowed.",
      },
      {
        speakerId: "mira",
        text: "Okay so, what do you actually do when you're not standing in corners. The serious answer, not the cocktail one.",
        emotion: "curious",
      },
      {
        speakerId: null,
        text: "You give the serious one. Halfway through she puts her beer down, leans her elbow on her knee, and starts asking the second-question questions, the ones that would only come up if she'd already understood the first answer.",
      },
      {
        speakerId: "mira",
        text: "Wait, does that thing you do, does it make you like the people you do it for, or does it just pay rent. Because the way you said the second part, that wasn't a complaint. That sounded like a thing you wanted me to ask you about.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She just read a sub-text in your voice that took most of your closest friends a year to notice. People with BPD are often hyper-attuned to interpersonal cues, the same hyper-attunement that makes them magnetic in conversation makes them devastating when triggered. The asset and the wound are the same circuit.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "open-up",
        text: "Answer the second-question. Tell her the actual thing about your work.",
        tactic:
          "She earned it. The conversation has leveled up. Honesty here builds something real and makes you visible to someone who's now paying full attention.",
        nextSceneId: "the-hour-three",
        isOptimal: true,
      },
      {
        id: "redirect",
        text: "\"Your turn. What about you.\" (Genuine curiosity, but redirect the spotlight.)",
        tactic:
          "Healthy reciprocity. Doesn't reject what she just did, just asks her to also be visible. Most people would stop there with a stranger. She's about to make that hard.",
        nextSceneId: "the-redirect",
        isOptimal: true,
      },
      {
        id: "joke-out",
        text: "\"You missed your calling as a therapist.\" (Compliment-deflect. Don't go deeper yet.)",
        tactic:
          "A soft wall. She'll register it. The conversation continues but she'll log that you don't go below a certain depth on first meeting. This is fine, it's also the moment she starts watching for when you do.",
        nextSceneId: "the-hour-three",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE REDIRECT. Mira's turn to be visible
  // ===================================================================
  {
    id: "the-redirect",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She laughs, a real one, not a performance. Then she goes still for a beat.",
      },
      {
        speakerId: "mira",
        text: "Fair. Okay. I make music nobody pays for, I have two dogs that I love more than I love most humans, my therapist would tell you I'm 'in a building phase,' and I think I came tonight specifically because Caleb said you'd be here and he described you in a way that made me curious. There it is.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "It is the most honest thing anyone has said to you in six weeks. You feel the small vertigo of being shown something that wasn't earned yet and the larger pull of being shown that thing FIRST, before she had to.",
      },
      {
        speakerId: "inner-voice",
        text: "Honesty as accelerant. She gave you four pieces of real biography in one sentence, including the part where she came tonight to meet you specifically. Most people would not say that out loud at hour 0.5. The skill is to receive it as the gift it is without confusing 'she trusted me fast' for 'we are now close.' Trust is a shape that gets built. What just happened is a deposit, not the bridge.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "honor-it",
        text: "Match her honesty without matching her speed. (Tell her something true, but smaller.)",
        tactic:
          "The skilled answer. Honor the deposit. Don't pretend you're now in the same emotional gear she is, you're not, and the lie would compound.",
        nextSceneId: "the-hour-three",
        isOptimal: true,
      },
      {
        id: "match-her-fully",
        text: "Match her speed. Tell her the big thing about your last year. (You feel it. Why not.)",
        tactic:
          "You drank the dopamine. Not a moral failing but you just synced your nervous system to hers, which is exactly what she needed. The cost is invisible at hour 0.5. The cost shows up later.",
        nextSceneId: "the-hour-three",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // HOUR THREE, the conversation has run for hours
  // ===================================================================
  {
    id: "the-hour-three",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Three hours have passed. People have left. Caleb has been by twice to check on Mira and walked away smiling. The two of you are still in the corner. You have not eaten. Your phone has been face-down on your thigh for ninety minutes.",
      },
      {
        speakerId: null,
        text: "She is telling you about her sister now. Vee, three years older, lives in Seattle. The way Mira talks about Vee is the way someone talks about the person who keeps them tethered to the ground.",
      },
      {
        speakerId: "mira",
        text: "She'd like you. She'd be careful with you, because she's careful with everyone, but she'd like you. I'm going to tell her about you tomorrow.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You haven't agreed to a second conversation. You haven't agreed to anything. She is talking like the second conversation is a foregone conclusion. The strange thing is: it is. You also know it is.",
      },
      {
        speakerId: "inner-voice",
        text: "Watch the verb tense. She just future-paced the relationship, 'I'm going to tell her about you tomorrow.' This is how the FP attachment forms in real time. She's not asking your permission to think about you tomorrow. She's announcing that she will. The room you have, right now, is in how you respond to the announcement.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "naming-it",
        text: "\"Wait, you don't know me yet.\" (Soft, smiling. Name the speed without rejecting it.)",
        tactic:
          "The cleanest skilled response. You're not killing the warmth, you're naming the velocity. This gives her the chance to feel seen by you in a way that includes her pattern, not despite it.",
        nextSceneId: "the-naming",
        isOptimal: true,
      },
      {
        id: "match-the-future",
        text: "\"What are you going to tell her?\" (Lean into the future-pacing.)",
        tactic:
          "You accepted the frame. From this moment forward, the speed of the relationship is set by her and you've shown her you're willing to ride at that speed. The next two months will move very fast.",
        nextSceneId: "the-future-set",
        isOptimal: false,
      },
      {
        id: "go-quiet",
        text: "Smile. Don't answer. Take a sip of wine.",
        tactic:
          "Avoidance dressed as cool. She'll register that you went silent and read it as either restraint or rejection, likely the latter. The cycle that activates when she reads rejection is the one we're trying to teach you to be ready for. You're not ready yet.",
        nextSceneId: "the-future-set",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE NAMING, player chose to gently name the velocity
  // ===================================================================
  {
    id: "the-naming",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She holds your eyes for a second. Then she laughs, short, real, embarrassed.",
      },
      {
        speakerId: "mira",
        text: "I do this. Sorry. I get. I get all the way in, fast, and I forget to ask if anyone else is ready. My therapist has homework about it. I'm working on it. Slow me down whenever you want.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "It is the answer of someone who has been to a therapist about this exact thing. It does not reduce the warmth in the corner. If anything, it makes the warmth feel safer, because she knows the pattern, names it, asks for help with it.",
      },
      {
        speakerId: "inner-voice",
        text: "She just gave you the user manual. She told you the bug, the workaround, and the way you can help. Most people in any pattern, manipulative, anxious, avoidant, BPD, none-of-the-above, will not do this. The fact that she did is a real piece of evidence about who she is. Bank it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "thank-her",
        text: "\"Thanks for telling me. I will.\" (Receive it. Move on.)",
        tactic:
          "Clean. You named the velocity, she explained it, you accepted the explanation. This is what skilled mutual disclosure looks like at hour 3.",
        nextSceneId: "the-favorite",
        isOptimal: true,
      },
      {
        id: "ask-about-it",
        text: "\"Is your therapist any good?\" (Soft curiosity. Doesn't make it a Big Deal.)",
        tactic:
          "Skilled. Doesn't pathologize her, doesn't avoid the topic, treats therapy the way most people treat going to the gym, a thing you do for yourself, casually mentionable.",
        nextSceneId: "the-favorite",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE FUTURE-SET, player chose to ride the speed
  // ===================================================================
  {
    id: "the-future-set",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She lights up. Tells you what she's going to tell Vee. The story she tells Vee is generous about you in a way that exceeds the data. Three hours is not enough time to know that you are kind, brave, and 'the kind of person who waits her turn before she speaks.' She believes it. She's seeing the version of you she has already constructed.",
      },
      {
        speakerId: "inner-voice",
        text: "This is what idealization looks like when it lands. The portrait she just painted of you is not based on you. It's based on the part of you she could see in three hours, projected forward into a full person. The portrait is flattering. It is also fragile, because the actual you will not always match it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-favorite",
        text: "Continue.",
        tactic: "The scene proceeds.",
        nextSceneId: "the-favorite",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE FAVORITE, minute 240. The naming moment.
  // ===================================================================
  {
    id: "the-favorite",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "It is 1:08 a.m. the party is mostly empty. Caleb is on the couch saying goodbye to the last guest. Mira is putting her coat on. She turns to you, holding her phone, and says it lightly, the way you'd announce the weather:",
      },
      {
        speakerId: "mira",
        text: "Okay. So you're my favorite person of the year. Possibly the decade. I'm putting my number in your phone. I'm gonna text you tomorrow at noon.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She holds out her hand for your phone. Her smile is real. The line was rehearsed exactly never, she just said the thing she was thinking. There is no manipulation in her face, because there is no manipulation in her. There is just a woman who has decided, in four hours, that you are someone she wants to keep.",
      },
      {
        speakerId: "inner-voice",
        text: "She just used the words. 'Favorite person.' In the BPD community this is not a compliment, it is a diagnostic term. It names the kind of attachment her nervous system is forming with you. You did not apply for this job. You were also not coerced into it. It is happening to her, and through her, to you. The choice you have, right now, is what posture you take inside it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "give-number-warmly",
        text: "Hand her your phone. \"Text me. But warning. I'm not great at noon texts.\" (Receive the warmth. Set one tiny boundary in plain sight.)",
        tactic:
          "The held line. You said yes to the relationship and yes to being yourself inside it. The boundary is not a wall, it's a calibration. She'll either match it or she won't, and you'll have data either way.",
        nextSceneId: "ending-held",
        isOptimal: true,
      },
      {
        id: "give-number-fully",
        text: "Hand her your phone. \"Favorite person, huh. No pressure.\" (Smile. Take it as flattery. Match her energy fully.)",
        tactic:
          "The bent path. You accepted both the title and the pace. Nothing wrong with it, you're an adult, this is your call but you have not given her any signal about what your equilibrium looks like. The first time you fail to match her speed will read, to her, as withdrawal.",
        nextSceneId: "ending-bent",
        isOptimal: false,
      },
      {
        id: "deflect-the-title",
        text: "\"That's a lot, Mira. Let's see how the noon text goes.\" (Hand her the phone but name the over-claim.)",
        tactic:
          "The cooled hand. You accepted the practical (number exchanged) and pushed back on the frame (favorite person of the decade). She'll register the pushback. With most people, this is healthy calibration and with her, this is a small first split-trigger. Both can be true.",
        nextSceneId: "ending-cooled",
        isOptimal: false,
      },
      {
        id: "decline-number",
        text: "\"I don't think I can be that for you. Sorry.\" (Walk it back before the bridge gets built.)",
        tactic:
          "The early walk. There's nothing wrong with this answer. Three hours is not a contract. But there is a cost: she came tonight specifically to meet you, and you just told her, in the friendliest way possible, that the answer is no. She'll be okay. The version of the relationship that was about to start will not.",
        nextSceneId: "ending-walked",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-held",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Held the Line",
    endingLearnPrompt:
      "You said yes to the relationship and yes to yourself in the same gesture. The 'I'm not great at noon texts' line was not a rejection, it was a calibration. She now has a small piece of real you to work with, instead of the imagined you she had been building. This is the foundation that lets the relationship survive the first time you fail to text back fast enough. There will be such a time. You are slightly more ready for it now than you were ten minutes ago.",
    dialog: [
      {
        speakerId: "mira",
        text: "Noted. I am extremely a noon-texter. We're going to have to negotiate.",
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "She types her number into your phone, hands it back, walks out with Caleb. You are at the door three minutes later. The night is cold. You are sober. Your nervous system is, there's no other word for it, lit up.",
      },
      {
        speakerId: "inner-voice",
        text: "Idealization is real. The love is real. The trick is staying yourself while it's happening to you. You did. This was Hour Zero. The next conversation is the one where the pattern starts to show.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-bent",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Bent",
    endingLearnPrompt:
      "You met her at her speed. There is no failure in this, adults make this choice with each other every weekend. The thing you didn't do is leave any of yourself visible above the surface of the warmth. The next time she texts at midnight expecting noon-Mira-energy back, you will either deliver it (compounding) or you won't (and she will register the dip). The relationship that starts here is real. It is also already running on a faster clock than yours.",
    dialog: [
      {
        speakerId: "mira",
        text: "Tomorrow at noon. You're already my favorite.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She walks out. You are at the door three minutes later. On the train home you draft a text to her three times and don't send it because it's already past 1 a.m. and you don't know what the rules are yet. There aren't rules yet. The rules are about to get written, and you have already given her the pen.",
      },
      {
        speakerId: "inner-voice",
        text: "Drinking the dopamine is not a moral failing. It is a calibration choice. The cost of it shows up at week three, when she has built a version of you that does not include the part of you that needs to disappear sometimes. The good news: that conversation can still be had. The bad news: it will be harder than it would have been tonight.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-cooled",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Cooled",
    endingLearnPrompt:
      "You named the over-claim. With most people this is the healthy move, calibrate the frame, keep the relationship. With Mira, the same move triggers a tiny split, because for her the over-claim wasn't an over-claim, it was the truth as she felt it in that moment. She's not going to text you tomorrow at noon. She might text you in three days, or never. Either way, you taught her something true about you, and the cost was the version of the relationship that needed her to be uncalibrated. Both of you are okay. It is just a different story now.",
    dialog: [
      {
        speakerId: "mira",
        text: "Yeah. Yeah, okay. We'll see how the noon text goes.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "She types her number in. The smile is still there but smaller. She walks out. The energy in the corner deflates, not in a bad way, just in the way the air leaves a balloon that was over-inflated. You are at the door three minutes later. You will not be sure for two days whether you handled this well.",
      },
      {
        speakerId: "inner-voice",
        text: "You can be right and still cause a small wound. That doesn't make you wrong. But it's worth noticing the wound. With Mira specifically, the things that feel obvious to you about how relationships pace themselves are the things her nervous system processes as rejection. This is not your problem to solve, it is hers. But knowing about it lets you choose your tone for the next time. There will be a next time, in some form.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-walked",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Walked",
    endingLearnPrompt:
      "You walked. Three hours is not a contract, you owe no one your phone number. There is also no scoreboard for which posture is 'right.' Some people are not for you, even when they're magnetic. Some patterns you can see at hour zero and can't pay the cost of, even if the cost would have been worth paying. Both can be true. The story that was about to start, now isn't. The version of you that walked is real and gets to make this call.",
    dialog: [
      {
        speakerId: "mira",
        text: "Oh, okay. No, that's, that's fine. Sorry for the intensity. Take care.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "She gives you the smallest smile of the night, picks up her coat, and leaves with Caleb. You sit in the corner for another twenty minutes before going home. You think about what just happened on the train. You will think about it again next week. You will not text Caleb to ask about her. The story closes.",
      },
      {
        speakerId: "inner-voice",
        text: "You're allowed to leave. You're allowed to stay. There's no scoreboard for which is 'right.' There's just whether you stayed yourself while you were choosing. You did. The track continues with someone else's relationship next time or you can replay this and try the other ending. Both are real options.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-walked-early",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Closed the Door",
    endingLearnPrompt:
      "You closed a door before it opened. Sometimes that's the move. There's no failure here but there's no scenario either. If you're curious about the rest of the track, replay and try the other opening. The door is still there.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Hour zero. No deposit, no debt. Sometimes the right move is to read a bookshelf alone and go home. That was tonight.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira11: Scenario = {
  id: "lm-1-1",
  title: "The Loft",
  tagline: "Hour zero. The favorite person of the decade.",
  description:
    "Opens the Loving Mira track. You meet Mira at a friend's birthday, magnetic, perceptive, fast. By the end of the night she's calling you her favorite person of the year. The scenario teaches the texture of BPD idealization at the moment it forms: not a manipulator's trick, a nervous system reaching for an attachment object at full intensity. The skill is to stay yourself while it's happening.",
  tier: "premium",
  track: "loving-mira",
  level: 1,
  order: 1,
  estimatedMinutes: 9,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 280,
  badgeId: "fp-recognised",
  startSceneId: "the-corner",
  tacticsLearned: [
    "Idealization at hour zero, recognising the favorite-person attachment as it forms",
    "Match-her-honesty-without-matching-her-speed as the skilled posture for fast disclosers",
    "Naming the velocity without rejecting the warmth (the calibration move)",
  ],
  redFlagsTaught: [
    "Future-pacing the relationship at hour 3 ('I'm going to tell my sister about you tomorrow')",
    "Constructing a flattering portrait of you that exceeds what three hours of data can support",
    "Using 'favorite person' as a compliment when the term is diagnostic in the BPD community",
    "The hyper-attunement asset (reading sub-text in your voice) as the same circuit as the wound",
  ],
  characters: [INNER_VOICE, MIRA],
  scenes,
};

export default lovingMira11;
