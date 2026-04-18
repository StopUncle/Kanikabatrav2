/**
 * Mission 3-2 — "The Guilt Loop"
 *
 * Level 3, order 2. Teaches non-rescue under induced guilt.
 * Maris returns — NOT with charm this time, but with apparent
 * vulnerability. She's been crying. She needs "someone who gets it."
 * The test: do you rescue a predator performing fragility?
 */

import type { Scenario, Scene } from "../types";
import { MARIS, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "maris-unexpected",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "10:32pm. A DM from a number you haven't heard from in six weeks.",
      },
      {
        speakerId: null,
        text: "MARIS: \"hey. i know this is weird. are you up?\"",
      },
      {
        speakerId: "inner-voice",
        text: "She has never texted you at 10pm. She has never admitted anything was 'weird'. Both of those are today's data.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "reply-curious",
        text: '"yeah, what\'s up"',
        tactic: "Door open. Reasonable but she'll pour through.",
        nextSceneId: "maris-opens-vulnerability",
      },
      {
        id: "delay",
        text: "Don't reply until morning.",
        tactic: "11pm vulnerability that can wait until 9am wasn't real.",
        nextSceneId: "maris-morning-after",
        isOptimal: true,
      },
      {
        id: "hard-no",
        text: '"not tonight. is it urgent?"',
        tactic: "Available for emergencies. Not for scripts.",
        nextSceneId: "maris-claims-urgent",
        isOptimal: true,
      },
      {
        id: "block",
        text: "Don't reply. Mute the thread.",
        tactic: "Aggressive but valid. You owe her nothing.",
        nextSceneId: "ending-muted-clean",
      },
    ],
  },

  {
    id: "maris-opens-vulnerability",
    backgroundId: "text-screen",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "MARIS: \"i'm sorry, this is so out of nowhere. i've been having a really hard week.\"",
      },
      {
        speakerId: null,
        text: "MARIS: \"you're the only person i could think of who wouldn't just feed me platitudes\"",
      },
      {
        speakerId: "inner-voice",
        text: "Flattery embedded in vulnerability: 'you're different from everyone else.' She used this on you at the gala.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "bite-fully",
        text: '"of course, what\'s going on"',
        tactic: "You opened the therapy door at 10pm for someone who hurt you. She'll live in it.",
        nextSceneId: "maris-unloads",
        isOptimal: false,
      },
      {
        id: "cautious-help",
        text: "\"I can listen. Short though, I'm heading to sleep.\"",
        tactic: "Scoped help. If she respects the scope, maybe she's human. (She won't.)",
        nextSceneId: "maris-bleeds-scope",
      },
      {
        id: "decline-warmly",
        text: '"that sounds really hard. i\'m not the right person for this one."',
        tactic: "Warm decline. Names the ask; names your limit. No justification for the limit.",
        nextSceneId: "maris-guilt-attempt",
        isOptimal: true,
      },
      {
        id: "name-history",
        text: '"the last time we talked, you were running a game. i\'m not available for this."',
        tactic: "Direct history call-out. She can't pretend you haven't met.",
        nextSceneId: "maris-denies-history",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-unloads",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Paragraphs. She's been 'so alone'. People 'don't understand her'. Her 'father issues' are flaring. She had 'dark thoughts tonight'.",
      },
      {
        speakerId: null,
        text: "MARIS: \"i haven't told anyone this but you always felt safe somehow\"",
      },
      {
        speakerId: "inner-voice",
        text: "She's installing herself. The more you absorb, the more you're obligated to continue.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "validate-heavily",
        text: '"i\'m so sorry. i\'m here. talk to me."',
        tactic: "Full therapist mode. You just took on a job she won't let you quit.",
        nextSceneId: "ending-therapist-forever",
        isOptimal: false,
      },
      {
        id: "refer-out",
        text: "\"This sounds beyond what I can hold over text. Please call a crisis line or your therapist.\"",
        tactic: "Redirect to actual resources. Takes the rescue card off the table.",
        nextSceneId: "maris-rejects-referral",
        isOptimal: true,
      },
      {
        id: "pull-back",
        text: "\"I'm going to step back. I'm not the right person for this.\"",
        tactic: "Late but not too late. Withdraw before the contract finalizes.",
        nextSceneId: "maris-rejects-withdrawal",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-bleeds-scope",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Twenty minutes pass. She hasn't stopped typing. You said 'short' — she heard 'start'.",
      },
      {
        speakerId: "maris",
        text: '"sorry i know i\'m dumping. can we hop on a call? text is hard for this"',
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "Scope has been ignored. Call would be the install.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "take-call",
        text: "\"Okay. Short call.\"",
        tactic: "Scope will keep getting violated. The pattern was already set.",
        nextSceneId: "ending-therapist-forever",
        isOptimal: false,
      },
      {
        id: "exit",
        text: "\"I'm heading to bed. Call a friend or crisis line if you need voice tonight.\"",
        tactic: "Reassert scope. Offer real resources. Exit.",
        nextSceneId: "maris-rejects-referral",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-guilt-attempt",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "MARIS: \"i understand. i'm sorry for reaching out.\"",
      },
      {
        speakerId: null,
        text: "MARIS: \"i just don't have anyone else who sees me clearly.\"",
      },
      {
        speakerId: null,
        text: "MARIS: \"forget it. i'll figure it out.\"",
      },
      {
        speakerId: "inner-voice",
        text: "Three messages escalating martyrdom. The final one is a fishing line.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "feel-bad-rescue",
        text: '"okay, let\'s talk. i\'m here."',
        tactic: "You cracked. She got the hook back in on the second attempt.",
        nextSceneId: "maris-unloads",
        isOptimal: false,
      },
      {
        id: "silent-dismiss",
        text: "Put the phone down. Don't reply.",
        tactic: "Silence is the right response to a fishing line.",
        nextSceneId: "ending-guilt-held",
        isOptimal: true,
      },
      {
        id: "offer-referral",
        text: "\"I hope you do. Therapists and crisis lines exist for this.\"",
        tactic: "Redirected AND stayed out. Perfect.",
        nextSceneId: "ending-guilt-held",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-denies-history",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "MARIS: \"i have no idea what you're talking about. i thought we connected.\"",
      },
      {
        speakerId: null,
        text: "MARIS: \"if that's how you remember it, wow.\"",
      },
      {
        speakerId: "inner-voice",
        text: "Gaslighting the history. She'll rewrite what happened between you if you engage.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "argue-history",
        text: "\"You ran a love-bombing script on me.\"",
        tactic: "Arguing with a rewrite is engaging with a rewrite. She'll loop.",
        nextSceneId: "maris-gaslight-loop",
      },
      {
        id: "end-thread",
        text: "\"Okay. Take care.\"",
        tactic: "Don't fight the rewrite. Exit. Her narrative doesn't need you in it.",
        nextSceneId: "ending-no-audience",
        isOptimal: true,
      },
      {
        id: "block",
        text: "Block.",
        tactic: "Hard exit. Appropriate for confirmed bad-faith contact.",
        nextSceneId: "ending-blocked",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-rejects-referral",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: "maris",
        text: '"a CRISIS LINE? really?"',
        emotion: "angry",
      },
      {
        speakerId: "maris",
        text: '"i\'m not some stranger. i thought we had something"',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "If the crisis were real, she'd take the crisis resource. She rejected it because rescue is the point.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold-referral",
        text: "\"The resources I shared are real. I hope you use them. Goodnight.\"",
        tactic: "Broken record + exit. She has nothing to escalate into.",
        nextSceneId: "ending-referral-held",
        isOptimal: true,
      },
      {
        id: "apologize",
        text: '"sorry, i didn\'t mean to make you feel that way, we can talk"',
        tactic: "You apologized for her manipulation. You're in it now.",
        nextSceneId: "ending-therapist-forever",
        isOptimal: false,
      },
    ],
  },

  {
    id: "maris-rejects-withdrawal",
    backgroundId: "text-screen",
    mood: "danger",
    immersionTrigger: "shock",
    shakeOnEntry: "revelation",
    dialog: [
      {
        speakerId: "maris",
        text: '"wow. okay."',
        emotion: "cold",
      },
      {
        speakerId: "maris",
        text: '"i open up for the first time in MONTHS and this is the response."',
        emotion: "angry",
      },
      {
        speakerId: "maris",
        text: '"i won\'t forget this."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "She's dropped the mask. 'I won't forget this' is the real her. The vulnerability was scaffolding.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold",
        text: "Don't respond. Save screenshots.",
        tactic: "The threat just told you who she was. Document it.",
        nextSceneId: "ending-mask-dropped",
        isOptimal: true,
      },
      {
        id: "defend",
        text: '"i\'m sorry you feel that way, but i\'m allowed to say no"',
        tactic: "Still trying to be reasonable with a threat. Just walk.",
        nextSceneId: "ending-no-audience",
      },
      {
        id: "reconcile",
        text: "\"Wait, I didn't mean it like that, let me explain\"",
        tactic: "Rescue under threat. Worst possible move.",
        nextSceneId: "ending-therapist-forever",
        isOptimal: false,
      },
    ],
  },

  {
    id: "maris-morning-after",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "9:03am. You open your phone.",
      },
      {
        speakerId: null,
        text: "MARIS: \"nvm, i worked it out. hope you're good.\"",
      },
      {
        speakerId: "inner-voice",
        text: "Eleven hours was enough for the 'crisis' to resolve itself. That's everything you need to know.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-time-exposed",
  },

  {
    id: "maris-claims-urgent",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "MARIS: \"no, not emergency. just... rough. needed a voice.\"",
      },
      {
        speakerId: "inner-voice",
        text: "She just told you it's not urgent. You're off the hook she tried to set.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-door",
        text: "\"Sleep well. Tomorrow's a new day.\"",
        tactic: "Warm exit. No appointment, no rescue.",
        nextSceneId: "ending-filtered",
        isOptimal: true,
      },
      {
        id: "offer-call",
        text: '"we can hop on a quick call if u want"',
        tactic: "You just volunteered after she told you it wasn\'t an emergency.",
        nextSceneId: "ending-therapist-forever",
        isOptimal: false,
      },
    ],
  },

  {
    id: "maris-gaslight-loop",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: "maris",
        text: '"love-bombing? wow. you\'re twisting every nice moment into something sinister. that says a lot about you."',
        emotion: "angry",
      },
      {
        speakerId: "inner-voice",
        text: "Classic DARVO: Deny, Attack, Reverse Victim and Offender. Don't stay in the ring.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-no-audience",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-guilt-held",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Guilt Held Without Absorbing",
    endingSummary:
      "She aimed guilt at you. You noticed it land and didn't metabolize it. The fishing line dangled for thirty minutes with no bite. Tomorrow she'll either try a different approach or move to a different target. Either way, you held.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Guilt is data. It tells you what they wanted you to do. It doesn't tell you what to do.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-time-exposed",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Sunlight Test",
    endingSummary:
      "A crisis that's over by morning was never a crisis. Eleven hours of sleep was apparently sufficient treatment. You didn't do anything — and nothing bad happened. That's the whole lesson.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Urgency manufactured at 10pm is never urgency. Test it with time.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-filtered",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Filtered Contact",
    endingSummary:
      "She admitted it wasn't an emergency. You declined the replacement rescue. Clean, warm, brief. No obligation installed. Next time she reaches out, she'll have to be honest about what she actually wants.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Available for emergencies, not for scripts.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-muted-clean",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Muted Without Drama",
    endingSummary:
      "You muted the thread and slept. Whatever she sent after tonight sits in a folder you don't open. She can't manipulate what she can't reach.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Access is a permission, not a default.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-mask-dropped",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Saw the Mask Drop",
    endingSummary:
      "'I won't forget this' — when you wouldn't be her therapist. That's not vulnerability. That's a predator told 'no.' You kept the screenshots. Now you have documentation for when she tries to rewrite you to other people.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "When the mask slips, believe it the first time.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-no-audience",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "No Audience for the Rewrite",
    endingSummary:
      "She tried to gaslight the history. You didn't argue. You exited. Her rewrite may reach other people — but it won't reach you back, and you don't need to live inside anyone else's false version.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You don't have to win the argument you refuse to have.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-referral-held",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Resources Over Rescue",
    endingSummary:
      "You gave her real resources. She rejected them, because she didn't want help — she wanted you. That refusal was the tell. The referral stayed the answer.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "If the crisis is real, they'll take the crisis resource.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-blocked",
    backgroundId: "apartment",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Blocked",
    endingSummary:
      "Clean exit. She can try through mutuals — but the direct channel is closed, and closed channels don't install anything. The weight is off you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You don't owe anyone a channel.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-therapist-forever",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "beige-protocol-strategic-boredom-weapon",
    failureBlogTitle: "The Beige Protocol: Strategic Boredom as Weapon",
    endingTitle: "You Were Hired",
    endingSummary:
      "She needed someone who 'gets it' at 10pm. You volunteered. Now the job has no hours, no pay, and no exit clause — every time you try to step back, the crisis escalates. You didn't save her. You got assigned.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Rescuers don't get promoted. They get the next shift.",
        emotion: "sad",
      },
    ],
  },
];

export const mission32: Scenario = {
  id: "mission-3-2",
  title: "The Guilt Loop",
  tagline: "Predators perform fragility. Don't take the job.",
  description:
    "Six weeks of silence. Then a 10pm DM from Maris — 'hey. i know this is weird. are you up?' Fragility, confession, flattery, escalation. The only way out is to refuse the contract before it's offered.",
  tier: "free",
  level: 3,
  order: 2,
  estimatedMinutes: 12,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 150,
  badgeId: "guilt-held",
  startSceneId: "maris-unexpected",
  tacticsLearned: [
    "Refusing to rescue performed vulnerability",
    "Redirecting to real crisis resources",
    "The sunlight test (if it can wait 'til morning, it wasn't urgent)",
    "Exiting DARVO instead of arguing with it",
  ],
  redFlagsTaught: [
    "Late-night 'reaching out' after extended silence",
    "Flattery embedded in fragility ('you're the only one who gets it')",
    "Rejecting crisis resources when offered",
    "Mask slipping to threat when rescue is declined",
  ],
  reward: {
    id: "guilt-held",
    name: "The Guilt Held",
    description: "You saw the fragility performance and didn't audition for the rescue role.",
    unlocksScenarioId: "mission-4-1",
  },
  prerequisites: ["mission-3-1"],
  characters: [MARIS, PRIYA, INNER_VOICE],
  scenes,
};

export default mission32;
