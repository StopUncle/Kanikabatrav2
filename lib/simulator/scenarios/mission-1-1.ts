/**
 * Mission 1-1 — "The Morning After"
 *
 * Ported from SocialApp/content/simulator/scenarios/mission-1-1/.
 * Original structure was one metadata + morning + coffee + 3 endings files.
 * Consolidated into one export here because there's no runtime benefit to
 * splitting, and it makes future scenario porting a single-file job.
 *
 * Teaches: managing post-event social capital, information discipline.
 * Level 1, tier: free (public demo + Consilium open).
 */

import type { Scenario, Scene } from "../types";
import { ALEX, DANA, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — Morning (apartment)
  // ---------------------------------------------------------------------
  {
    id: "wake-up",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Morning light filters through the blinds. Your phone is already buzzing.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "7 new messages. 3 friend requests. 1 missed call from an unknown number.",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The gala opened doors. Question is — which ones do you walk through?",
        emotion: "curious",
      },
    ],
    choices: [
      {
        id: "check-messages",
        text: "Check the messages first",
        nextSceneId: "phone-messages",
        feedback: "Information first. Smart.",
      },
      {
        id: "ignore-phone",
        text: "Shower first, phone later",
        nextSceneId: "alex-ambush",
        feedback: "Sometimes delay is strategic. Sometimes it costs you.",
      },
    ],
  },

  {
    id: "phone-messages",
    backgroundId: "text-screen",
    dialog: [
      { speakerId: null, text: 'PRIYA: "Hey! Great meeting you last night. Coffee later?"' },
      { speakerId: null, text: 'UNKNOWN: "Saw you talking to Maris. Impressive. We should connect."' },
      { speakerId: null, text: 'ALEX: "Bro where did you disappear to?? Heard you were at THE gala??"' },
      {
        speakerId: "inner-voice",
        text: "Priya seems genuine. Unknown is fishing. Alex is... Alex.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-priya",
        text: "Reply to Priya first",
        nextSceneId: "priya-text",
        feedback: "Start with the genuine connection.",
      },
      {
        id: "reply-unknown",
        text: "Reply to the unknown number",
        nextSceneId: "unknown-trap",
        feedback: "Curiosity. It killed the cat.",
      },
    ],
  },

  {
    id: "alex-ambush",
    backgroundId: "apartment",
    dialog: [
      {
        speakerId: "alex",
        text: "\"DUDE. You're awake. I've been waiting for like an hour.\"",
        emotion: "happy",
      },
      {
        speakerId: "alex",
        text: '"The gala. Spill. Everything. I heard you were talking to Maris freaking Caldwell?"',
        emotion: "curious",
      },
      {
        speakerId: "inner-voice",
        text: "He didn't get in. He's hungry for details. Careful.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "brag-alex",
        text: "\"Yeah, Maris and I really hit it off actually\"",
        nextSceneId: "brag-disaster",
        feedback: "Exaggerating to impress. Alex will tell everyone by lunch.",
        isOptimal: false,
      },
      {
        id: "deflect-alex",
        text: "\"It was just networking. Nothing special.\"",
        nextSceneId: "alex-deflected",
        feedback: "Downplay. Give him nothing to spread.",
        isOptimal: true,
      },
      {
        id: "honest-alex",
        text: "\"Brief conversation. She's intense. That's all I know.\"",
        nextSceneId: "alex-satisfied",
        feedback: "Truth without detail. Balanced.",
      },
    ],
  },

  {
    id: "priya-text",
    backgroundId: "text-screen",
    dialog: [
      { speakerId: null, text: 'YOU: "Coffee sounds great. When and where?"' },
      {
        speakerId: null,
        text: 'PRIYA: "Campus Bean, 11am? I have some thoughts about last night you might want to hear."',
      },
      {
        speakerId: "inner-voice",
        text: "She has intel. That's worth a coffee.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "alex-enters",
  },

  {
    id: "unknown-trap",
    backgroundId: "text-screen",
    dialog: [
      { speakerId: null, text: 'YOU: "Thanks. Who is this?"' },
      {
        speakerId: null,
        text: 'UNKNOWN: "Someone who knows how things work around here. What did Maris say to you exactly?"',
      },
      {
        speakerId: "inner-voice",
        text: "Fishing expedition. They want specifics.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "share-details",
        text: "Share what Maris said",
        nextSceneId: "info-leaked",
        feedback: "Ammunition handed to an unknown player. This will haunt you.",
        isOptimal: false,
      },
      {
        id: "deflect-unknown",
        text: "\"Nothing interesting. Why do you ask?\"",
        nextSceneId: "alex-enters",
        feedback: "Good. Turn the question around. Reveal nothing.",
        isOptimal: true,
      },
    ],
  },

  {
    id: "alex-enters",
    backgroundId: "apartment",
    dialog: [
      {
        speakerId: "alex",
        text: "\"Finally! You're up. So... the gala. How was it?\"",
        emotion: "curious",
      },
      {
        speakerId: "inner-voice",
        text: "Here we go. He's been waiting.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        id: "brag-alex-2",
        text: "\"Amazing. Maris basically invited me to her inner circle.\"",
        nextSceneId: "brag-disaster",
        feedback: "This version of events will reach Maris. And it won't match hers.",
        isOptimal: false,
      },
      {
        id: "minimal-alex",
        text: "\"Good networking. Met some people. You know how it is.\"",
        nextSceneId: "alex-satisfied",
        feedback: "Vague but not dismissive. Well played.",
        isOptimal: true,
      },
    ],
  },

  {
    id: "alex-satisfied",
    backgroundId: "apartment",
    dialog: [
      {
        speakerId: "alex",
        text: "\"Man, I wish I could've been there. Next time you gotta get me in.\"",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He seems satisfied with your answer. The interrogation is over.",
      },
    ],
    nextSceneId: "head-to-coffee",
  },

  {
    id: "alex-deflected",
    backgroundId: "apartment",
    dialog: [
      {
        speakerId: "alex",
        text: "\"Nothing special? Dude, it's the Caldwell Gala.\"",
        emotion: "confused",
      },
      {
        speakerId: "alex",
        text: "\"Whatever. If you don't want to share...\"",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "He backs off, slightly offended but not suspicious.",
      },
    ],
    nextSceneId: "head-to-coffee",
  },

  {
    id: "head-to-coffee",
    backgroundId: "park",
    mood: "peaceful",
    dialog: [
      { speakerId: null, text: "You head across campus to meet Priya. The morning air is crisp." },
      { speakerId: null, text: "A few people nod at you. Word travels fast." },
    ],
    nextSceneId: "coffee-arrival",
  },

  {
    id: "brag-disaster",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: "alex",
        text: '"Wait, REALLY? Maris Caldwell? Her inner circle?"',
        emotion: "happy",
      },
      {
        speakerId: "alex",
        text: "\"Bro, that's insane. I gotta tell everyone about this.\"",
        emotion: "happy",
      },
      { speakerId: "inner-voice", text: "No. No no no.", emotion: "concerned" },
    ],
    nextSceneId: "brag-spreads",
  },

  {
    id: "brag-spreads",
    backgroundId: "park",
    mood: "danger",
    immersionTrigger: "red-flag-revealed",
    shakeOnEntry: "shock",
    dialog: [
      { speakerId: null, text: "By noon, half the campus has heard. By evening, it reaches Maris." },
      { speakerId: null, text: "Your phone buzzes. A text from an unknown number." },
      {
        speakerId: null,
        text: "\"Heard you've been telling people we're close friends. Interesting. —M\"",
      },
    ],
    nextSceneId: "ending-brag-fail",
  },

  {
    id: "info-leaked",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      { speakerId: null, text: "You share the details of your conversation with Maris." },
      { speakerId: null, text: "The unknown number goes silent. No reply." },
      {
        speakerId: "inner-voice",
        text: "That information is now a weapon. And you don't know who's holding it.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "info-weaponized",
  },

  {
    id: "info-weaponized",
    backgroundId: "coffee-shop",
    mood: "danger",
    immersionTrigger: "red-flag-revealed",
    dialog: [
      { speakerId: null, text: "Two days later. You're at the coffee shop when you overhear two people talking." },
      {
        speakerId: null,
        text: "\"...yeah, apparently they told everyone what Maris said. Total breach of trust.\"",
      },
      {
        speakerId: null,
        text: "They're talking about you. The story is twisted beyond recognition.",
      },
    ],
    nextSceneId: "ending-info-fail",
  },

  // ---------------------------------------------------------------------
  // PART 2 — Coffee (coffee shop)
  // ---------------------------------------------------------------------
  {
    id: "coffee-arrival",
    backgroundId: "coffee-shop",
    dialog: [
      { speakerId: null, text: "Campus Bean is busy. Students huddle over laptops and lattes." },
      { speakerId: "priya", text: '"Hey! Over here."', emotion: "happy" },
      {
        speakerId: null,
        text: "Priya waves from a corner booth. She's already got two coffees.",
      },
    ],
    nextSceneId: "priya-intel",
  },

  {
    id: "priya-intel",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "priya",
        text: '"So. Last night. You handled Maris better than most."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: "\"I watched the whole thing. You didn't chase. That's rare.\"",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She was watching. Interesting.",
        emotion: "curious",
      },
    ],
    choices: [
      {
        id: "ask-priya-why",
        text: '"Why were you watching me?"',
        nextSceneId: "priya-explains",
        feedback: "Direct. Get her cards on the table.",
      },
      {
        id: "accept-compliment",
        text: '"Thanks. Learned it the hard way."',
        nextSceneId: "priya-bond",
        feedback: "Humble acknowledgment builds rapport.",
      },
    ],
  },

  {
    id: "priya-explains",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "priya",
        text: '"Because I tried to crack that circle last year. Failed spectacularly."',
        emotion: "sad",
      },
      {
        speakerId: "priya",
        text: "\"Maris made me look desperate in front of everyone. I was watching to see if you'd make the same mistakes.\"",
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: "\"You didn't. That makes you worth knowing.\"",
        emotion: "knowing",
      },
    ],
    nextSceneId: "dana-approaches",
  },

  {
    id: "priya-bond",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "priya",
        text: '"We all do. The hard way is the only teacher that sticks."',
      },
      {
        speakerId: "priya",
        text: "\"Look, I'm going to be straight with you. Maris noticed you. That's good and bad.\"",
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"Good because doors open. Bad because her attention has a cost."',
        emotion: "concerned",
      },
    ],
    nextSceneId: "dana-approaches",
  },

  {
    id: "dana-approaches",
    backgroundId: "coffee-shop",
    mood: "tense",
    dialog: [
      { speakerId: null, text: "A shadow falls across the table. Someone is standing there." },
      {
        speakerId: "dana",
        text: "\"Mind if I join? I'm Dana. Caleb's sister.\"",
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Caleb. Maris's shadow. His sister just happens to find you?",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "welcome-dana",
        text: '"Sure, have a seat."',
        nextSceneId: "dana-sits",
        feedback: "Keep friends close, potential enemies closer.",
      },
      {
        id: "polite-decline",
        text: '"Actually, we were just finishing up."',
        nextSceneId: "dana-deflected",
        feedback: "Trust your instincts.",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-sits",
    backgroundId: "coffee-shop",
    mood: "tense",
    dialog: [
      {
        speakerId: "dana",
        text: '"Thanks! So I heard you made quite an impression last night."',
        emotion: "happy",
      },
      {
        speakerId: "dana",
        text: "\"Maris doesn't talk to just anyone, you know. What's your secret?\"",
        emotion: "curious",
      },
      { speakerId: "priya", text: "...", emotion: "concerned" },
      {
        speakerId: "inner-voice",
        text: "Priya went quiet. She knows something about Dana.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "share-with-dana",
        text: '"No secret. Just being myself."',
        nextSceneId: "dana-probes",
        feedback: "Safe answer. But she'll keep digging.",
      },
      {
        id: "redirect-dana",
        text: "\"How's Caleb doing? He seemed... stressed.\"",
        nextSceneId: "dana-deflects",
        feedback: "Turn the spotlight. See how she handles it.",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-deflected",
    backgroundId: "coffee-shop",
    dialog: [
      { speakerId: "dana", text: '"Oh. Sure. Another time then."', emotion: "sad" },
      {
        speakerId: "dana",
        text: '"I was only trying to help. Not everyone can see that, I suppose."',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "She walks away with a sigh. Somehow you feel like the bad guy.",
      },
      {
        speakerId: "priya",
        text: "\"Good call. That one's trouble.\"",
        emotion: "serious",
      },
    ],
    nextSceneId: "priya-warning",
  },

  {
    id: "dana-probes",
    backgroundId: "coffee-shop",
    mood: "tense",
    dialog: [
      {
        speakerId: "dana",
        text: '"Just being yourself? Come on, there has to be more to it."',
        emotion: "curious",
      },
      {
        speakerId: "dana",
        text: "\"Did Maris mention anything about upcoming events? She's so secretive with me.\"",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "She wants information. About Maris. Through you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "give-info-dana",
        text: '"She mentioned something about a private gathering..."',
        nextSceneId: "dana-gotcha",
        feedback: "She'll have this on group chat before you finish your coffee.",
        isOptimal: false,
      },
      {
        id: "nothing-dana",
        text: '"Nothing I can share. You understand."',
        nextSceneId: "dana-retreats",
        feedback: "Firm but polite. Perfect.",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dana-deflects",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "dana",
        text: "\"Caleb? He's fine. He loves being around Maris.\"",
        emotion: "neutral",
      },
      { speakerId: null, text: "Her tone is clipped. You hit a nerve." },
      {
        speakerId: "dana",
        text: "\"Anyway, I should go. We should hang out sometime. I'll text you.\"",
        emotion: "happy",
      },
    ],
    nextSceneId: "priya-warning",
  },

  {
    id: "dana-gotcha",
    backgroundId: "coffee-shop",
    mood: "danger",
    dialog: [
      {
        speakerId: "dana",
        text: "\"A private gathering? Oh that's so exciting! When is it?\"",
        emotion: "happy",
      },
      { speakerId: null, text: "She's pulling out her phone. Typing." },
      {
        speakerId: "priya",
        text: '"Dana, who are you texting?"',
        emotion: "concerned",
      },
      { speakerId: "dana", text: '"Just... a friend. Gotta run!"', emotion: "happy" },
    ],
    nextSceneId: "ending-info-fail",
  },

  {
    id: "dana-retreats",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "dana",
        text: '"Of course. Discretion. I respect that."',
        emotion: "neutral",
      },
      { speakerId: null, text: "Something flickers behind her eyes. Calculation." },
      {
        speakerId: "dana",
        text: "\"Well, I won't keep you. See you around.\"",
        emotion: "happy",
      },
    ],
    nextSceneId: "priya-warning",
  },

  {
    id: "priya-warning",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "priya",
        text: '"Okay, real talk. Dana Morrison is not your friend."',
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: "\"She collects information. Uses it. Caleb's the same way — just more obvious about it.\"",
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: '"You handled that well. Keep your cards close."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Allies and enemies. The lines are clearer now.",
      },
    ],
    choices: [
      {
        id: "thank-priya",
        text: '"Thanks for the heads up. I owe you one."',
        nextSceneId: "ending-success",
        feedback: "Building trust with the right people.",
        isOptimal: true,
      },
      {
        id: "ask-more",
        text: '"What else should I know about this world?"',
        nextSceneId: "priya-final-advice",
        feedback: "Wisdom from experience is valuable.",
      },
    ],
  },

  {
    id: "priya-final-advice",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "priya",
        text: '"First rule — never brag about access. The second you do, you become a mark."',
        emotion: "serious",
      },
      { speakerId: null, text: "She sips her coffee. Waits for that to land." },
      {
        speakerId: "priya",
        text: '"Second — what someone tells you in private stays private. Even if it seems harmless."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "That's how Dana works. Collect the harmless. Use it later.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "third-rule",
        text: '"And the third?"',
        nextSceneId: "priya-third-rule",
        feedback: "She's got one more. Listen.",
        isOptimal: true,
      },
      {
        id: "got-it",
        text: "\"Makes sense. I'll remember.\"",
        nextSceneId: "ending-success",
        feedback: "Cut it short. You have the essentials.",
      },
    ],
  },

  {
    id: "priya-third-rule",
    backgroundId: "coffee-shop",
    dialog: [
      {
        speakerId: "priya",
        text: '"Never trust anyone who approaches you right after a win."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: "\"That's Dana's whole strategy. Find the person who just leveled up. Be their new best friend. Extract.\"",
        emotion: "serious",
      },
      {
        speakerId: "priya",
        text: "\"You passed her test today. That's worth something.\"",
        emotion: "happy",
      },
    ],
    nextSceneId: "ending-success",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-success",
    backgroundId: "coffee-shop",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Reputation Intact",
    endingSummary:
      "You navigated the post-gala attention without self-sabotage. You didn't brag, didn't leak information, and made a genuine ally in Priya. Dana Morrison has you on her radar — but you gave her nothing to use.",
    dialog: [
      { speakerId: null, text: "You walk back to your dorm, mind clear." },
      {
        speakerId: null,
        text: "The gala opened doors. Today, you learned which ones lead somewhere — and which ones are traps.",
      },
      {
        speakerId: "inner-voice",
        text: "Information is currency. You didn't spend any today. Wise.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-brag-fail",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Word Travels Fast",
    endingSummary:
      "You bragged about your connection to Maris. By evening, the story had grown, twisted, and reached her ears. You've been marked as someone who talks too much. That reputation will cost you.",
    dialog: [
      { speakerId: null, text: "Maris's text burns in your memory." },
      { speakerId: null, text: "\"Heard you've been telling people we're close friends. Interesting.\"" },
      {
        speakerId: "inner-voice",
        text: "You wanted to feel important. Now you feel exposed.",
        emotion: "sad",
      },
      { speakerId: null, text: "The doors that opened last night just slammed shut." },
    ],
  },

  {
    id: "ending-info-fail",
    backgroundId: "coffee-shop",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Information Weaponized",
    endingSummary:
      "You shared private information with someone who shouldn't have it. Whether it was the unknown texter or Dana Morrison, the result is the same — your words have been twisted and spread. You're now known as someone who can't keep secrets.",
    dialog: [
      { speakerId: null, text: "Within days, a distorted version of what you said is campus gossip." },
      { speakerId: null, text: "People look at you differently now. Not with respect — with caution." },
      { speakerId: null, text: 'Dana texts with fake sympathy: "OMG I heard! That\'s SO unfair."' },
      { speakerId: null, text: "Maris unfollowed you. Three months of careful positioning — gone." },
      {
        speakerId: "inner-voice",
        text: "You handed them the knife. They didn't hesitate.",
        emotion: "sad",
      },
    ],
  },
];

export const mission11: Scenario = {
  id: "mission-1-1",
  title: "The Morning After",
  tagline: "The gala is over. The game has just begun.",
  description:
    "You wake up the day after the Caldwell Gala. Your phone is buzzing with messages from people you met — and people you didn't know were watching. How you handle this attention will define your next move.",
  tier: "free",
  level: 1,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "beginner",
  category: "social-dynamics",
  xpReward: 75,
  badgeId: "morning-survivor",
  startSceneId: "wake-up",
  tacticsLearned: [
    "Managing post-event social capital",
    "Information as currency",
    "Strategic silence vs. engagement",
  ],
  redFlagsTaught: ["People fishing for information", "False friendliness with ulterior motives"],
  reward: {
    id: "campus-credibility",
    name: "Campus Credibility",
    description: "You handled the aftermath without self-sabotage.",
    unlocksScenarioId: "mission-1-2",
  },
  characters: [
    ALEX,
    PRIYA,
    DANA,
    INNER_VOICE,
    {
      id: "stranger",
      name: "Unknown Number",
      description: "Someone from the gala. You don't recognize the number.",
      traits: ["mysterious", "probing"],
      defaultEmotion: "neutral",
      gender: "male",
      personalityType: "neutral",
      silhouetteType: "male-lean",
    },
  ],
  scenes,
};

export default mission11;
