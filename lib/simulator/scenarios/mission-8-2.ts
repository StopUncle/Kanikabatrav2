/**
 * Mission 8-2 — "No Contact"
 *
 * Level 8, order 2. The hardest scenario in the game. Setting no-contact
 * with a narcissistic parent knowing the smear campaign will follow.
 * How you exit determines what the story becomes.
 */

import type { Scenario, Scene } from "../types";
import { THE_MOTHER, GOLDEN_SIBLING, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "the-decision",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You've been building toward this for six months. Therapy. Conversations with Ren. Reading. Watching your own reactions decay into the same shape every Sunday.",
      },
      {
        speakerId: null,
        text: "Today you're deciding to stop. The question is how.",
      },
      {
        speakerId: "inner-voice",
        text: "No contact is not about winning. It's about ending a recurring cost. The cleanest cut leaves the least room for re-entry.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "big-letter",
        text: "Write a long letter itemizing every wound. Send it.",
        tactic: "Turns your exit into ammunition for her smear campaign. She'll selectively quote you for years.",
        nextSceneId: "ending-letter-weaponized",
        isOptimal: false,
      },
      {
        id: "brief-text",
        text: "Short text: 'I'm taking space. Please don't contact me.'",
        tactic: "Clean and unambiguous. Minimal material for her to work with.",
        nextSceneId: "priya-reviews-text",
        isOptimal: true,
      },
      {
        id: "disappear",
        text: "Block everywhere. Say nothing.",
        tactic: "The smear will still happen; you'll have no record of why.",
        nextSceneId: "disappear-consequences",
      },
      {
        id: "in-person",
        text: "Tell her in person, once, calmly.",
        tactic: "Gives her a live audience to perform grief at. Risky.",
        nextSceneId: "in-person-attempt",
      },
    ],
  },

  {
    id: "priya-reviews-text",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"Can I read what you wrote?"',
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "You show her the phone. She reads it slowly.",
      },
      {
        speakerId: "priya",
        text: '"Too much reason. Cut \'taking space.\' Just \'I\'m not going to be in contact.\' And cut \'please\' — she\'ll mine that for politeness-as-weakness."',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-edits",
        text: "Edit to \"I'm not going to be in contact. Don't reach out.\"",
        tactic: "Clean. Final. No emotional hook for her to grab.",
        nextSceneId: "send-the-text",
        isOptimal: true,
      },
      {
        id: "resist",
        text: "\"I need to say 'please' — she's my mother.\"",
        tactic: "Politeness she'll weaponize, affection she hasn't earned. Still an option.",
        nextSceneId: "send-with-please",
      },
      {
        id: "add-more",
        text: "\"I want her to know this is about specific behaviors.\"",
        tactic: "You just volunteered material for the smear. Every specific becomes a 'see, they admit this is the REAL reason' in her story.",
        nextSceneId: "ending-letter-weaponized",
        isOptimal: false,
      },
    ],
  },

  {
    id: "send-the-text",
    backgroundId: "text-screen",
    mood: "mysterious",
    shakeOnEntry: "revelation",
    dialog: [
      {
        speakerId: null,
        text: "You send it. Phone goes dark. Seven minutes pass.",
      },
      {
        speakerId: null,
        text: "Phone lights up. She's typing. She's typing for a long time.",
      },
      {
        speakerId: null,
        text: "The message arrives — 400 words. You read the first two. Your thumb hovers over the block button.",
      },
      {
        speakerId: "inner-voice",
        text: "Reading her reply is optional. Responding isn't.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "read-and-block",
        text: "Read it. Don't respond. Block after.",
        tactic: "Absorbs the blow without the engagement. Costly emotionally.",
        nextSceneId: "read-reply",
      },
      {
        id: "block-unread",
        text: "Block without reading.",
        tactic: "Cleanest. Whatever she wrote, it was designed to pull you back or plant material for her narrative.",
        nextSceneId: "block-clean",
        isOptimal: true,
      },
      {
        id: "respond-once",
        text: "Respond: \"I said don't reach out.\"",
        tactic: "You just confirmed the channel is open if she pushes hard enough.",
        nextSceneId: "ending-channel-reopened",
        isOptimal: false,
      },
    ],
  },

  {
    id: "send-with-please",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You send the softer version. Her reply takes 90 seconds.",
      },
      {
        speakerId: null,
        text: 'MOM: "please? I\'m your mother. I deserve more than \'please don\'t contact me\'."',
      },
      {
        speakerId: "inner-voice",
        text: "Politeness miscategorized as negotiability. Priya warned you.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "send-the-text",
  },

  {
    id: "read-reply",
    backgroundId: "text-screen",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Her message: 'I have tried SO HARD to be a good mother. Every mother makes mistakes. You are choosing to abandon me.' Then: 'When I'm gone you'll regret this.'",
      },
      {
        speakerId: "inner-voice",
        text: "Guilt ('tried so hard'), minimization ('mistakes'), abandonment framing, and the mortality threat. Four tools in one message.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "block-after-reading",
        text: "Block. Put the phone face-down.",
        tactic: "Took the damage, refused the dance.",
        nextSceneId: "ending-no-contact-clean",
        isOptimal: true,
      },
      {
        id: "explain",
        text: '"I\'m not abandoning you. I\'m choosing my wellbeing. I love you."',
        tactic: "You just responded. Channel reopened. She'll push harder.",
        nextSceneId: "ending-channel-reopened",
        isOptimal: false,
      },
      {
        id: "rage-back",
        text: '"You have no idea what you\'ve done to me."',
        tactic: "Cathartic. Now she has a screenshot for the smear campaign.",
        nextSceneId: "ending-smear-fueled",
        isOptimal: false,
      },
    ],
  },

  {
    id: "block-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You block. Phone numbers, every platform. You put the phone on silent.",
      },
      {
        speakerId: null,
        text: "You message Ren: 'I told Mom I'm going no-contact. Whatever she tells you about it, I love you.'",
      },
      {
        speakerId: "inner-voice",
        text: "Preemptive narrative to Ren. The smear will find them. You got there first.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ren-responds-to-nc",
  },

  {
    id: "ren-responds-to-nc",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Two minutes.",
      },
      {
        speakerId: "sibling",
        text: '"I was wondering when this would happen. Proud of you. She\'ll call me tonight crying. I won\'t answer."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Your sibling held. That's the outcome of Mission 8-1 becoming the foundation for this one.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-no-contact-clean",
  },

  {
    id: "in-person-attempt",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: null,
        text: "Her living room. Tuesday afternoon. You said one sentence and she's already crying.",
      },
      {
        speakerId: "mother",
        text: "\"After everything I've done for you. Is this what I raised? Is this who you are?\"",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "She's performing. She'd be performing if the living room were empty. Don't mistake it for real.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "one-sentence-exit",
        text: "\"I said what I came to say. I'm going now.\" Leave.",
        tactic: "One sentence, one exit. Don't stay to watch the performance.",
        nextSceneId: "ending-in-person-held",
        isOptimal: true,
      },
      {
        id: "stay-to-comfort",
        text: "Sit down. Try to comfort her.",
        tactic: "You just rescinded the boundary. She won.",
        nextSceneId: "ending-rescinded",
        isOptimal: false,
      },
      {
        id: "argue-her-frame",
        text: "\"That's not what I said. Let me explain —\"",
        tactic: "Now you're in a 90-minute debate. The boundary dissolves in the defense.",
        nextSceneId: "ending-rescinded",
        isOptimal: false,
      },
    ],
  },

  {
    id: "disappear-consequences",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Three weeks later. Ren messages.",
      },
      {
        speakerId: "sibling",
        text: '"Mom\'s telling everyone you had a mental breakdown. I\'m getting questions. What should I say?"',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Vanishing without a note left the narrative vacuum. She filled it.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "belated-explain",
        text: "Tell Ren the real reason. Let them circulate it.",
        tactic: "Late but usable. Gives allies truth to counter with.",
        nextSceneId: "ending-belated-narrative",
        isOptimal: true,
      },
      {
        id: "stay-silent",
        text: "\"I don't want to talk about it.\"",
        tactic: "Ren is on your side. Denying them info forces them to improvise defenses.",
        nextSceneId: "ending-smear-lands",
        isOptimal: false,
      },
      {
        id: "one-line-answer",
        text: "\"Say: I chose distance. That's all you owe anyone.\"",
        tactic: "Hand Ren one sentence that works for every follow-up. A clean line travels faster than a long truth.",
        nextSceneId: "ending-belated-narrative",
        isOptimal: true,
      },
      {
        id: "meet-ren-in-person",
        text: "\"Can we get coffee this week? Not over text.\"",
        tactic: "The story lives in the relationship with Ren. Invest in it in person; everything else follows.",
        nextSceneId: "ending-belated-narrative",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-no-contact-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "No Contact, Clean",
    endingSummary:
      "You sent the minimum-viable message, blocked immediately, told Ren first. The smear campaign will start by Saturday. It'll reach the extended family, some of whom will call you, some of whom will be weaponized. The cost is real. It's less than the cost of Sundays.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The smear after no-contact is the tax on freedom. It's still cheaper than the subscription it replaces.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-in-person-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Said It Once, Left",
    endingSummary:
      "One sentence, one exit. She'll tell the story as 'they came into MY house and said terrible things then STORMED OUT.' The story is untrue but sticky. Some relatives will believe it. The ones worth keeping will call to ask, and you'll be able to explain once — because you only gave them one sentence to mishear.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The story she tells is cheaper to counter when you only gave her one line of source material.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-belated-narrative",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Belated Narrative",
    endingSummary:
      "You disappeared, the smear ran for three weeks unchallenged, and now you're feeding Ren the real story to counter. They'll help, but you're on defense. The no-contact holds — the narrative management will be ongoing for six to twelve months.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Silence after a cut is a vacuum. Vacuums fill fast with whoever's willing to speak loudest.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-letter-weaponized",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "Your Own Words, Weaponized",
    endingSummary:
      "You wrote the long letter. Itemized every wound. Meant to be read and absorbed. Instead, it's being selectively quoted to every aunt, cousin, and family friend. 'Look what they said about me — their own mother.' Your carefully written grievances have become a marketing kit for her narrative.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Never write a narcissist anything you wouldn't want screenshotted.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-channel-reopened",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering, Explained",
    endingTitle: "Channel Reopened",
    endingSummary:
      "You replied once. The channel is now negotiable. Next week she'll send a 'just checking in' message. You'll reply, because you already did. In three months you'll be having Sunday dinners again, wondering why nothing changed. Nothing changed because you reopened the channel.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A single reply after no-contact declares the rule negotiable. The rule is only real when it's not.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-smear-fueled",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "family-colonisation-why-winning-his-mother-matters-more",
    failureBlogTitle: "Family Colonisation: Why Winning His Mother Matters More",
    endingTitle: "You Fueled the Smear",
    endingSummary:
      "'You have no idea what you've done to me.' — screenshotted, shared to the whole family group chat. The smear now has a villain quote. You're the aggressor in every retelling, because she has evidence. The rage was valid; the delivery fueled her campaign for a year.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Catharsis on record is ammunition donated.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-rescinded",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "The Boundary Rescinded Itself",
    endingSummary:
      "You stayed to comfort her. By 5pm you were helping with dinner. The boundary didn't just fail — it now exists as a story she tells: 'they tried to cut me off, and then apologized and came home.' You'll be cited with that story for years.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A boundary you rescind on the same day is a script they own.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-smear-lands",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "The Smear Landed",
    endingSummary:
      "Three weeks of silence gave her a narrative monopoly. By the time you explain to Ren, other relatives have absorbed the 'mental breakdown' story. They're calling each other about it, not you. The truth will reach some of them eventually. Most won't ask.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Don't leave silence where your narrative should live.",
        emotion: "sad",
      },
    ],
  },
];

export const mission82: Scenario = {
  id: "mission-8-2",
  title: "No Contact",
  tagline: "How you cut determines what the story becomes.",
  description:
    "Six months of building toward this decision. Today you're cutting. The smear will follow — the only variable is how much material you hand her on the way out. The cleanest exit is the one she can't quote.",
  tier: "premium",
  level: 8,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 350,
  badgeId: "no-contact-held",
  startSceneId: "the-decision",
  tacticsLearned: [
    "Minimum-viable exit message",
    "Block before reading the counter",
    "Preemptive narrative to allies (Ren first)",
    "Guilt/mortality framing: recognized, not responded to",
  ],
  redFlagsTaught: [
    "Long letters as future ammunition",
    "Replying once as channel-reopening",
    "In-person endings as performance stages",
    "Silence as narrative vacuum",
  ],
  reward: {
    id: "no-contact-held",
    name: "No Contact Held",
    description: "You cut. You didn't fuel the campaign that followed.",
    unlocksScenarioId: "mission-9-1",
  },
  prerequisites: ["mission-8-1"],
  characters: [THE_MOTHER, GOLDEN_SIBLING, PRIYA, INNER_VOICE],
  scenes,
};

export default mission82;
