/**
 * Mission 3-1 — "The Favor"
 *
 * Level 3, order 1. Teaches asymmetric-ask recognition and the
 * broken-record no. Jordan (BPD features) escalates asks — each one
 * slightly bigger, each framed as "just this once". The only win is
 * saying no without justifying it.
 */

import type { Scenario, Scene } from "../types";
import { JORDAN, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "jordan-text",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Friday night. 11:14 pm. You are on your couch. Your phone lights up — Jordan, who is a perfectly fine acquaintance you have known for about seven months, and who has escalated in the last three weeks from weekly texts to daily ones.",
      },
      {
        speakerId: null,
        text: 'JORDAN: "hey omg i know this is so random but can u help me out with smth"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "like rly urgent"',
      },
      {
        speakerId: "inner-voice",
        text: "The word 'urgent' from someone who is not in your actual emergency contact list means, almost without exception, 'I decided this was urgent approximately four minutes ago.' Real urgency does not text at 11:14 on a Friday to a medium-close acquaintance. Real urgency calls someone who can solve the problem directly.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Note also the construction 'hey omg i know this is so random' — a pre-emptive apology for an ask she has not made yet. People who are apologising before they ask know the ask is going to feel inappropriate. The apology is there to launder the inappropriateness.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ask-what",
        text: '"what\'s up"',
        tactic: "Neutral. Information gather before committing.",
        nextSceneId: "jordan-asks",
        isOptimal: true,
      },
      {
        id: "immediate-yes",
        text: '"of course, what do you need"',
        tactic: "You agreed before knowing. She'll escalate.",
        nextSceneId: "jordan-asks-bigger",
        isOptimal: false,
      },
      {
        id: "dont-reply",
        text: "Don't reply until morning.",
        tactic: "Urgency that can wait 8 hours wasn't real urgency.",
        nextSceneId: "jordan-tests-silence",
        isOptimal: true,
      },
      {
        id: "busy-tonight",
        text: '"out rn, what\'s happening?"',
        tactic: "Soft pre-no. Anchors that you're unavailable before the ask.",
        nextSceneId: "jordan-asks",
        isOptimal: true,
      },
    ],
  },

  {
    id: "jordan-asks",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "okay so. my cousin\'s party is tomorrow and the uber is SO much"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "any chance u could drive me? like just drop off and pick up"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "i\'ll literally love u forever"',
      },
      {
        speakerId: "inner-voice",
        text: 'The ask doubled while you were typing. "Drop off and pick up" is a 4-hour commitment, not a favor.',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "plain-no",
        text: '"can\'t, sorry"',
        tactic: "Two words. No reason offered. Hardest move, most durable.",
        nextSceneId: "jordan-pushes",
        isOptimal: true,
      },
      {
        id: "explain-no",
        text: '"sorry i have a thing with priya tomorrow night"',
        tactic: "Reason is negotiable. She'll find a workaround.",
        nextSceneId: "jordan-negotiates",
        isOptimal: false,
      },
      {
        id: "half-yes",
        text: '"i can drop off maybe, pickup is tough"',
        tactic: "You compromised a boundary. She'll extend it.",
        nextSceneId: "jordan-extends",
        isOptimal: false,
      },
      {
        id: "redirect",
        text: '"have u checked the bus"',
        tactic: "Useful deflection. Redirects to a real solution that isn\'t you.",
        nextSceneId: "jordan-doesnt-want-solution",
      },
    ],
  },

  {
    id: "jordan-asks-bigger",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "omg thank u so so much"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "ok so tmrw i need a ride to and from my cousin\'s place AND can u also maybe stop at target on the way"',
      },
      {
        speakerId: "inner-voice",
        text: "This is scope widening in its most basic form. You said yes to 'help me out with something' — an unspecified ask — and she is now filling in the specification in a way you never would have agreed to if she had asked plainly. The pattern has a name: the camel-nose ask. Get the nose under the tent first; the camel follows.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "This same move, exactly, will be run on you in every decade of your adult life by landlords, employers, people you are dating, and your own family. Learn to recognise it here, on a cheap ride, before someone runs it on you for something more expensive.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "cancel-yes",
        text: '"ah wait actually i can\'t"',
        tactic: "Walking back a yes is harder than never giving one — but it's still the right call.",
        nextSceneId: "jordan-guilt",
      },
      {
        id: "honor-original",
        text: '"i can do the ride, not target"',
        tactic: "Partial hold. She'll push the ride longer.",
        nextSceneId: "jordan-extends",
      },
      {
        id: "all-in",
        text: '"ofc, no problem"',
        tactic: "You just agreed to be her Saturday chauffeur.",
        nextSceneId: "ending-used-as-utility",
        isOptimal: false,
      },
    ],
  },

  {
    id: "jordan-tests-silence",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Saturday morning. 8am. Three new messages.",
      },
      {
        speakerId: null,
        text: 'JORDAN: "??"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "u there"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "wow ok"',
      },
      {
        speakerId: "inner-voice",
        text: "Three messages in 8 hours. Classic escalation when silence isn't tolerated.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "respond-finally",
        text: '"sorry phone was off. what\'s up"',
        tactic: "You just apologized for not replying immediately. Don't.",
        nextSceneId: "jordan-asks",
      },
      {
        id: "no-apology",
        text: '"hey. what\'s up"',
        tactic: "No apology, no explanation. Your time isn't hers.",
        nextSceneId: "jordan-asks",
        isOptimal: true,
      },
      {
        id: "still-dont-respond",
        text: "Leave it. Go to your morning.",
        tactic: "Urgent-by-default only works on people who accept the default.",
        nextSceneId: "ending-pattern-uninstalled",
        isOptimal: true,
      },
    ],
  },

  {
    id: "jordan-pushes",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "wait why"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "like is everything ok"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "did i do something"',
      },
      {
        speakerId: "inner-voice",
        text: "She's deployed three different frames in one minute: confusion, concern, self-blame. Looking for a thread to pull.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "broken-record",
        text: '"just can\'t tomorrow, all good tho"',
        tactic: "Broken record. Same no, slightly rephrased.",
        nextSceneId: "jordan-final-push",
        isOptimal: true,
      },
      {
        id: "reassure",
        text: '"no no u didn\'t do anything i just have stuff"',
        tactic: "Now you're explaining AND reassuring. She'll extract both.",
        nextSceneId: "jordan-extends",
      },
      {
        id: "pull-thread",
        text: '"why would u have done smth"',
        tactic: "Took the bait. Conversation is now about her feelings instead of the no.",
        nextSceneId: "jordan-bpd-spiral",
        isOptimal: false,
      },
    ],
  },

  {
    id: "jordan-negotiates",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "omg what time is ur thing w priya"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "if its late i can probs be back by 7 we could still make it"',
      },
      {
        speakerId: "inner-voice",
        text: "Told you. She solved your reason. Now the no is gone.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "invent-another-reason",
        text: '"actually priya also wanted to do morning, so whole day"',
        tactic: "Reason stacking. Each lie is another thing she'll disprove.",
        nextSceneId: "jordan-catches-lie",
        isOptimal: false,
      },
      {
        id: "stop-explaining",
        text: '"sorry can\'t, have a good time tho"',
        tactic: "Kill the reason. Return to the no.",
        nextSceneId: "jordan-final-push",
        isOptimal: true,
      },
      {
        id: "give-in",
        text: '"ugh ok fine but only if we\'re back by 7"',
        tactic: "She beat the reason, so the no collapsed. Classic trap.",
        nextSceneId: "ending-used-as-utility",
        isOptimal: false,
      },
    ],
  },

  {
    id: "jordan-extends",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "omg ur a lifesaver"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "also i might stay a little later than planned, is that ok"',
      },
      {
        speakerId: "inner-voice",
        text: "Scope creep. The favor you agreed to is no longer the favor.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "hard-stop",
        text: '"no, i said drop off only"',
        tactic: "Reassert the boundary. Stays grounded in what you agreed.",
        nextSceneId: "jordan-bpd-spiral",
        isOptimal: true,
      },
      {
        id: "ok-sure",
        text: '"ugh ok"',
        tactic: "Boundary collapsed in one DM. She'll keep extending.",
        nextSceneId: "ending-used-as-utility",
        isOptimal: false,
      },
      {
        id: "name-the-drift",
        text: '"we agreed drop-off. if pickup\'s changing, find another ride."',
        tactic: "Name the deviation. A clean pre-agreement makes scope creep visible to both parties.",
        nextSceneId: "jordan-bpd-spiral",
        isOptimal: true,
      },
      {
        id: "counter-constraint",
        text: '"pickup only works if ur out by 10. past 10 i can\'t."',
        tactic: "Trade flex for a constraint. Creates a discipline that's hers to keep, not yours to enforce.",
        nextSceneId: "jordan-bpd-spiral",
      },
    ],
  },

  {
    id: "jordan-doesnt-want-solution",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "the bus is so gross and takes forever"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "u know what nvm forget it"',
      },
      {
        speakerId: "inner-voice",
        text: "She didn't want a solution. She wanted YOU.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "let-her-go",
        text: "Send a thumbs up. Put the phone down.",
        tactic: "Let the drama have no audience. The move is yours.",
        nextSceneId: "ending-pattern-uninstalled",
        isOptimal: true,
      },
      {
        id: "rescue",
        text: '"no wait, i\'ll drive u"',
        tactic: "Classic rescue. She got exactly what she wanted.",
        nextSceneId: "ending-rescued",
        isOptimal: false,
      },
      {
        id: "silent-no-reply",
        text: "Don't reply at all. Leave it on 'read'.",
        tactic: "A 'never mind' that doesn't get a response dies quietly. Reward her nothing.",
        nextSceneId: "ending-pattern-uninstalled",
        isOptimal: true,
      },
      {
        id: "redirect-solution",
        text: '"the party bus does a cousin\'s-house drop for $8. book it."',
        tactic: "Solve the stated problem concretely. If the ask was real, this closes it. If it was about you, she\'ll refuse.",
        nextSceneId: "ending-pattern-uninstalled",
      },
    ],
  },

  {
    id: "jordan-final-push",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "k. good to know where i stand ig"',
      },
      {
        speakerId: "inner-voice",
        text: "The final guilt move. Don't argue with the framing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "dont-engage",
        text: "Don't respond. Don't defend. Leave it.",
        tactic: "Let the guilt trip dissolve into silence.",
        nextSceneId: "ending-no-held",
        isOptimal: true,
      },
      {
        id: "reassure-final",
        text: '"noo that\'s not fair i love u u know that"',
        tactic: "You just repaired a breach she manufactured. She'll use this playbook every week now.",
        nextSceneId: "ending-rescued",
        isOptimal: false,
      },
      {
        id: "match-energy",
        text: '"ok 🤷"',
        tactic: "The shrug is louder than an argument.",
        nextSceneId: "ending-no-held",
      },
    ],
  },

  {
    id: "jordan-bpd-spiral",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "fine. forget it. forget i said anything."',
      },
      {
        speakerId: null,
        text: 'JORDAN: "clearly i\'m alone"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "always am"',
      },
      {
        speakerId: "inner-voice",
        text: "Escalation to existential-abandonment language. Designed to make you rescue. Don't.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "grey-rock",
        text: "Don't respond. At all.",
        tactic: "Grey rock. Remove the reward she's fishing for.",
        nextSceneId: "ending-no-held",
        isOptimal: true,
      },
      {
        id: "panic-rescue",
        text: '"please don\'t say that, i\'ll be there ok"',
        tactic: "She just trained you. Every 'no' from you will end this way from now on.",
        nextSceneId: "ending-training-complete",
        isOptimal: false,
      },
      {
        id: "refer-out",
        text: '"that sounds heavy, maybe text priya or ur therapist"',
        tactic: "Redirect without rescuing. Clean.",
        nextSceneId: "ending-no-held",
        isOptimal: true,
      },
    ],
  },

  {
    id: "jordan-catches-lie",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Three hours later.",
      },
      {
        speakerId: null,
        text: 'JORDAN: "i just saw priya\'s story she\'s at her parents\' for the weekend"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "so what\'s actually going on"',
      },
      {
        speakerId: "inner-voice",
        text: "Lies have a search engine. Now you owe her an explanation for the lie, not just the no.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-lie-caught",
  },

  {
    id: "jordan-guilt",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: 'JORDAN: "seriously? u just said yes 10 min ago"',
      },
      {
        speakerId: null,
        text: 'JORDAN: "this is why i don\'t ask anyone for anything"',
      },
    ],
    nextSceneId: "jordan-bpd-spiral",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-no-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The No That Held",
    endingSummary:
      "You said no. She escalated. She guilt-tripped. She tried abandonment language. You didn't rescue, didn't explain, didn't give ground. By Sunday she's moved on, and the next time she needs a favor, she'll try someone else first. You just taught her that your no is real.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The first no costs you. Every no after is free.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-pattern-uninstalled",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Pattern Uninstalled",
    endingSummary:
      "You didn't respond on her schedule. You didn't rescue when she performed distress. The 'urgent' died on its own, as urgency always does when nobody plays along. The whole operation only runs on your participation — and you withdrew it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Drama has no audience requirement until you become one.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-used-as-utility",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "beige-protocol-strategic-boredom-weapon",
    failureBlogTitle: "The Beige Protocol: Strategic Boredom as Weapon",
    endingTitle: "You Became the Uber",
    endingSummary:
      "Saturday: five hours driving. One stop at Target became three. The 'be back by 7' became 11. Next Tuesday she'll ask for something bigger. The week after, bigger still. You didn't fail a favor — you signed a contract.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Every extended yes is a subscription she'll keep renewing until you cancel it.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-rescued",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "You Rescued the Performance",
    endingSummary:
      "She performed distress and you arrived to heal it. The performance worked. Every week from now on, when she wants something, distress will appear on cue — because you trained it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The reward shapes the behavior.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-training-complete",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "You Completed Her Training",
    endingSummary:
      "The pattern is locked in. Every 'no' from you from now on will trigger escalation, abandonment language, and eventually your collapse. She didn't design this consciously — but the loop works and it'll run forever.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "This isn't about her. It's about which behaviors you reinforce.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-lie-caught",
    backgroundId: "text-screen",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "how-to-leave-without-being-villain",
    failureBlogTitle: "How to Leave Without Being the Villain",
    endingTitle: "Your Lie Got Checked",
    endingSummary:
      "The alibi was disprovable and she disproved it in three hours. Now the conversation isn't about a favor — it's about why you lied. You spent more capital defending the excuse than the favor would have cost.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'I can't' is free. 'I'm busy with X' is an audit.",
        emotion: "sad",
      },
    ],
  },
];

export const mission31: Scenario = {
  id: "mission-3-1",
  title: "The Favor",
  tagline: "Every 'no' you skip is a contract you signed.",
  description:
    "Friday night, 11:14pm. Jordan wants an 'urgent' favor for tomorrow. By tomorrow evening, that favor will have tripled — unless you learn to say no without a reason attached.",
  tier: "free",
  level: 3,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "intermediate",
  category: "dating-tactics",
  xpReward: 140,
  badgeId: "boundary-held",
  startSceneId: "jordan-text",
  tacticsLearned: [
    "No without justification",
    "Broken-record technique",
    "Grey-rock under emotional escalation",
    "Redirecting to real solutions",
  ],
  redFlagsTaught: [
    "Manufactured urgency at inconvenient hours",
    "Scope creep on agreed favors",
    "Abandonment language in response to 'no'",
    "Solving your reasons instead of accepting the no",
  ],
  reward: {
    id: "boundary-held",
    name: "Boundary Held",
    description: "You said no and it stayed no.",
    unlocksScenarioId: "mission-3-2",
  },
  prerequisites: ["mission-2-2"],
  characters: [JORDAN, PRIYA, INNER_VOICE],
  scenes,
};

export default mission31;
