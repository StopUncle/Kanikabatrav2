/**
 * Dating Line. Mission 1 "Frame Under Challenge"
 *
 * Teaches: the calm reframe. Silence as weapon. Public negging as a
 * frame test, not a personal attack, not a joke. Handling an
 * alpha-tester in front of a group without matching aggression,
 * deflecting nervously, or freezing.
 *
 * Why it matters: every young man meets this once. The rooftop moment.
 * A higher-status man cuts you in front of the people whose opinion
 * of you is being written in real time. The insult isn't the damage.
 * Your reaction is. Handle it wrong and the room brands you reactive,
 * soft, or political and that brand hardens inside ninety seconds
 * and lasts years. Handle it right and you bank permanent status in
 * rooms you didn't know were scoring you.
 *
 * Failure routes → "Ignore the Alpha, Target the Omega"
 * Secondary    → "Predator's Gaze: How Sociopaths Detect Weakness"
 */

import type { Scenario, Scene } from "../../types";
import { CHASE, COLE, LIV, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1, the rooftop
  // ---------------------------------------------------------------------
  {
    id: "the-cut",
    backgroundId: "rooftop-bar",
    mood: "tense",
    presentCharacterIds: ["chase", "liv", "cole"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "Rooftop bar. Friday, 9:47pm. Six people in a loose half-circle. You've been talking to Liv for twenty minutes, the conversation is going well, she's leaned in twice, her drink is almost gone and she hasn't looked for another.",
      },
      {
        speakerId: null,
        text: "Chase walks up. You've met him once, three months ago. Old money, knows the bartender by name, knows half the rooftop by first name. He doesn't say hello to you.",
      },
      {
        speakerId: "chase",
        text: "\"Oh, this guy? Liv, tell me he's finally let you pay for a drink.\"",
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "Laughter. Not loud. The worst kind, the small, reflexive laugh of people who don't know if it was a joke and are covering either way. Everyone turns. Liv's smile flickers. Cole's jaw tightens. The other woman glances at you, then at Chase, then back at you.",
      },
      {
        speakerId: "inner-voice",
        text: "Frame test. He's not joking. This is alpha-testing, public negging as status protection. He saw you had the room and he came to take it. You have three seconds. Every person here is reading you right now, and whatever you do in the next three seconds is what they'll remember about you for a year.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "calm-reframe",
        text: "Hold his eye. Small smile. \"Chase doing Chase.\" Turn back to Liv like nothing happened.",
        tactic: "The calm reframe. You don't elevate the remark by engaging it. You label him without heat, then remove attention. Silence is the weapon.",
        nextSceneId: "the-pivot",
        isOptimal: true,
      },
      {
        id: "match-aggression",
        text: "\"At least I can afford the drinks I buy, Chase.\" Same volume as him. Eye contact.",
        tactic: "Matching aggression. You just entered a contest on his terms, he's been running this move his whole life.",
        nextSceneId: "the-contest",
      },
      {
        id: "nervous-denial",
        text: "\"No, no, I got the first round, actually, it's fine, \"",
        tactic: "Nervous denial. You just confirmed the remark landed. Now the room knows it worked.",
        nextSceneId: "the-denial",
      },
      {
        id: "awkward-laugh",
        text: "Laugh along. \"Haha yeah, gotta work on that.\"",
        tactic: "Awkward agreement. You just co-signed his frame of you. The room writes it down.",
        nextSceneId: "the-laugh",
      },
      {
        id: "freeze",
        text: "Say nothing. Look at your drink.",
        tactic: "Freezing is the loudest signal of all. Silence without composure reads as collapse.",
        nextSceneId: "the-freeze",
      },
      {
        id: "pull-aside",
        text: "\"Hey, can I talk to you for a sec?\" Gesture toward the corner.",
        tactic: "Pulling him aside treats his move as worth a sidebar, legitimises it, and removes you from the audience he insulted you in front of.",
        nextSceneId: "the-sidebar",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2A, optimal: the pivot
  // ---------------------------------------------------------------------
  {
    id: "the-pivot",
    backgroundId: "rooftop-bar",
    mood: "mysterious",
    presentCharacterIds: ["chase", "liv", "cole"],
    dialog: [
      {
        speakerId: null,
        text: "Three words. No heat. You don't break eye contact first but you don't hold it long enough to make it a duel either. Then you turn, fully, back to Liv.",
      },
      {
        speakerId: null,
        text: "\"You were saying, about Lisbon.\"",
      },
      {
        speakerId: null,
        text: "Half a second of silence across the half-circle. The longest half-second of Chase's month.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the fork. The group has to decide whether to follow the man who cut, or the man who didn't flinch. Most people follow whoever seems most at ease. You just handed them a choice and made the easy option very, very obvious.",
        emotion: "knowing",
      },
      {
        speakerId: "liv",
        text: "\"Right so the cab driver in Alfama, \"",
        emotion: "curious",
      },
      {
        speakerId: null,
        text: "She picks up mid-sentence like the interruption didn't happen. The other woman leans in too. Cole exhales, very slightly, and turns his shoulder toward you.",
      },
      {
        speakerId: null,
        text: "Chase is still standing there. The laugh didn't come. He has a choice now, escalate and look like he's chasing, or retreat and look like he backed off. Neither is clean. He makes a small noise, lifts his glass in a half-toast nobody returns, and drifts toward the bar.",
      },
    ],
    choices: [
      {
        id: "stay-with-liv",
        text: "Stay exactly where you are. Keep the conversation on Liv. Don't acknowledge the retreat.",
        tactic: "Don't narrate the victory. The room already saw it, narrating weakens it.",
        nextSceneId: "the-room-re-orients",
        isOptimal: true,
      },
      {
        id: "check-the-room",
        text: "Let your eyes flick around the group to see how it landed.",
        tactic: "Status-checking after a win signals you needed the confirmation. Costs some of what you just earned.",
        nextSceneId: "the-room-re-orients",
      },
      {
        id: "follow-up-jab",
        text: "Quiet aside to Liv: \"He always like that?\"",
        tactic: "Following up the cut with your own small jab is the amateur mistake after a pro move. You spent the gain.",
        nextSceneId: "the-amateur-followup",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3A, optimal continues: the room re-orients
  // ---------------------------------------------------------------------
  {
    id: "the-room-re-orients",
    backgroundId: "rooftop-bar",
    mood: "peaceful",
    presentCharacterIds: ["liv", "cole"],
    dialog: [
      {
        speakerId: null,
        text: "Forty minutes later. The half-circle has quietly re-formed around you and Liv. The other woman has pulled up a stool. Cole is holding court on his left with a story you've heard four times but is funnier every telling.",
      },
      {
        speakerId: null,
        text: "Chase is at the bar. Twice he's looked over. Once he's started walking back and thought better of it.",
      },
      {
        speakerId: "liv",
        text: "\"So, what actually happened with you two? You guys hate each other or something?\"",
        emotion: "curious",
      },
      {
        speakerId: "inner-voice",
        text: "Trap and opportunity. You could land the final blow on Chase here, detail his behaviour, explain the history, make the case. The room would enjoy it. It would also cost you everything you just built. Men who dominate without needing to narrate the domination are the rarest kind. She's testing whether you're that kind.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "elegant-non-answer",
        text: "\"Not really. He runs a bit hot. It's fine.\" Change subject.",
        tactic: "Elegant non-answer. You don't explain the enemy. You don't gossip. You signal: handled, not held.",
        nextSceneId: "ending-recovered",
        isOptimal: true,
      },
      {
        id: "full-story",
        text: "Tell her the full history with Chase. Why he's like this. The last time it happened.",
        tactic: "You just turned your composure into a grievance-recount. She'll feel the shift, solid man became explaining man.",
        nextSceneId: "ending-diluted",
      },
      {
        id: "rage-reveal",
        text: "\"Honestly? He's a prick who's been doing that since we were 22. I should have decked him.\"",
        tactic: "Late-venting. You held the room, then spent the winnings narrating what you were really feeling the whole time.",
        nextSceneId: "ending-diluted",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2B, bad: matching aggression
  // ---------------------------------------------------------------------
  {
    id: "the-contest",
    backgroundId: "rooftop-bar",
    mood: "danger",
    presentCharacterIds: ["chase", "liv", "cole"],
    shakeOnEntry: "threat",
    dialog: [
      {
        speakerId: null,
        text: "The half-circle tightens. The other woman takes a step back without meaning to. Cole's eyes close for a fraction of a second.",
      },
      {
        speakerId: "chase",
        text: "\"Oh, oh, okay, tough guy. Easy. We're just having fun. Liv, is he always like this?\"",
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "He just reframed you as hostile and him as the relaxed one. Watch. This is the move. He escalated, you matched, now he softens and you look like the problem. Alpha-testers have been running this exchange since middle school.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "Liv laughs, small and nervous. Not at you. Not for you. The kind of laugh that resolves tension by siding with whoever caused less of it.",
      },
    ],
    choices: [
      {
        id: "double-down",
        text: "\"No, we're not 'just having fun.' You walked up and threw a shot.\"",
        tactic: "Doubling down in public. Correct, but the room doesn't score correct, it scores composed.",
        nextSceneId: "ending-volatile",
      },
      {
        id: "try-to-recover",
        text: "\"Yeah, look, sorry, that came out wrong. Let's start over.\"",
        tactic: "Apologising after matching aggression reads as both reactive and insecure. The worst two-step.",
        nextSceneId: "ending-volatile",
      },
      {
        id: "walk-off",
        text: "Set your drink down. \"Enjoy your night.\" Walk to the other side of the rooftop.",
        tactic: "Walking off after engaging looks like retreating under fire. If you were going to leave, you should have never engaged.",
        nextSceneId: "ending-volatile",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2C, bad: nervous denial
  // ---------------------------------------------------------------------
  {
    id: "the-denial",
    backgroundId: "rooftop-bar",
    mood: "tense",
    presentCharacterIds: ["chase", "liv", "cole"],
    dialog: [
      {
        speakerId: null,
        text: "The sentence doesn't land. It comes out a half-second too fast. Your voice is a quarter-step higher than it was two minutes ago, and everyone can hear it.",
      },
      {
        speakerId: "chase",
        text: "\"Whoa whoa whoa, buddy. Relax. I'm kidding. Jesus.\"",
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "He just did the second half of the move. Accuse you of overreacting to something he deliberately said to provoke a reaction. This is peer-coordinated humiliation, he said it, they laughed, now he gets to reframe you as the one who can't take a joke. Defending yourself against the first cut opened the door for the second.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "Liv's expression settles into something polite and distant. The kind of face women put on when they're cataloguing a man as a fixer-upper they don't have the energy for.",
      },
    ],
    nextSceneId: "ending-branded",
  },

  // ---------------------------------------------------------------------
  // PART 2D, bad: awkward laugh
  // ---------------------------------------------------------------------
  {
    id: "the-laugh",
    backgroundId: "rooftop-bar",
    mood: "tense",
    presentCharacterIds: ["chase", "liv", "cole"],
    dialog: [
      {
        speakerId: null,
        text: "The laugh comes out wrong. Half-second too loud. You hear it leave your mouth and you already know.",
      },
      {
        speakerId: "chase",
        text: "\"See. I like this guy. He knows.\"",
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "Chase claps a hand on your shoulder. Friendly, on the surface. A claim, underneath. He's not standing next to you as an equal. He's standing next to you the way a man stands next to a dog that's just performed.",
      },
      {
        speakerId: "inner-voice",
        text: "You just co-signed his frame of you. 'Gotta work on that' is an admission that the thing he accused you of is real and you're trying to improve. The group now files you as: good-natured, one-down, amiable. All three are status-lowering words.",
        emotion: "sad",
      },
      {
        speakerId: "liv",
        text: "\"I'm gonna grab another drink. Back in a sec.\"",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She doesn't come back to you.",
      },
    ],
    nextSceneId: "ending-agreed",
  },

  // ---------------------------------------------------------------------
  // PART 2E, bad: freeze
  // ---------------------------------------------------------------------
  {
    id: "the-freeze",
    backgroundId: "rooftop-bar",
    mood: "cold",
    presentCharacterIds: ["chase", "liv", "cole"],
    shakeOnEntry: "shock",
    dialog: [
      {
        speakerId: null,
        text: "Two seconds. Three. Four. You look at the ice in your glass. Someone coughs. Chase's smirk widens, he wasn't even sure the move would land this hard.",
      },
      {
        speakerId: "inner-voice",
        text: "Freezing is the loudest signal of all. Status theatre has one rule: silence with composure is dominant, silence without composure is collapse. You just broadcast collapse on a rooftop with six witnesses. The room will remember this for years. Cole already is, that's why he just looked at the floor.",
        emotion: "sad",
      },
      {
        speakerId: "chase",
        text: "\"Anyway. Liv, I was going to ask you about Capri next month. You still thinking about it?\"",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He pivots past you like you're furniture. Liv answers him. You're still holding your drink. The conversation continues around you in a way that has already decided you're not in it.",
      },
    ],
    nextSceneId: "ending-omega",
  },

  // ---------------------------------------------------------------------
  // PART 2F, bad: pull-aside
  // ---------------------------------------------------------------------
  {
    id: "the-sidebar",
    backgroundId: "rooftop-bar",
    mood: "tense",
    presentCharacterIds: ["chase"],
    dialog: [
      {
        speakerId: null,
        text: "Chase follows you, amused. Not threatened, amused. Thirty feet from the group, next to a potted olive tree, you turn to face him.",
      },
      {
        speakerId: null,
        text: "You're about to say something measured. 'That wasn't cool, man. Don't do that in front of people.' Calm, adult, direct. On paper, a perfectly reasonable sentence.",
      },
      {
        speakerId: "inner-voice",
        text: "On paper. The problem isn't the words, it's that pulling him aside just told the whole rooftop the cut was worth a sidebar. You legitimised his move. He got your attention, private attention, within sixty seconds of making you feel bad. From his perspective this is a win, not a confrontation. He'll walk back with that small smile that tells the group the conversation went exactly how he hoped it would.",
        emotion: "sad",
      },
      {
        speakerId: "chase",
        text: "\"Whoa, hey man, I'm sorry, it was a joke, we're good. Let's get back over there. Really, we're good.\"",
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "He means it the way a tax collector means 'thanks for your time.' You walk back together. Liv is talking to someone else.",
      },
    ],
    nextSceneId: "ending-political",
  },

  // ---------------------------------------------------------------------
  // PART 3B, optimal's amateur follow-up (near-miss)
  // ---------------------------------------------------------------------
  {
    id: "the-amateur-followup",
    backgroundId: "rooftop-bar",
    mood: "tense",
    presentCharacterIds: ["liv", "cole"],
    dialog: [
      {
        speakerId: "liv",
        text: "\"Oh, yeah, I don't know him well. Seems intense.\"",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She gave you a clean exit. Take it. Any more is you still fighting the fight you already won.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Cole catches your eye. Very small shake of the head. The mirror.",
      },
    ],
    nextSceneId: "ending-near-miss",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-recovered",
    backgroundId: "rooftop-bar",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Held the Frame",
    endingSummary:
      "Three words, no heat, and a clean pivot back to the conversation you were already winning. The rooftop re-oriented to you inside ninety seconds. Liv asks for your number two drinks later, her phrasing: 'in case I need another Lisbon recommendation.' Cole texts you the next day: 'That was a clinic.' Chase nods at you across a different bar six weeks later and doesn't come over. You didn't win a fight. You refused to enter one, and the refusal itself was the win, because alpha-testers only collect rank from men who engage. The men who don't flinch get routed around forever.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Silence without explanation is the cleanest display of status. You just banked permanent rank in a room that didn't know it was scoring you.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-near-miss",
    backgroundId: "rooftop-bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "You Won, Then Spent It",
    endingSummary:
      "The reframe landed. The room came back to you. Then you took one free swing too many and converted 'composed man' into 'man who's still thinking about Chase.' Liv stays in the conversation but doesn't ask for your number. Cole doesn't mention it the next day. You handled the first ninety seconds like a pro and the next five minutes like someone who needed the scoreboard updated. Next time: don't narrate the win. Let the room write it for you, they were going to, and your version is always smaller than theirs.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The calm reframe is a complete sentence. Adding to it is you asking for credit you already had.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-volatile",
    backgroundId: "rooftop-bar",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Branded Volatile",
    endingSummary:
      "You matched his volume and he softened his. That single exchange branded you the hot one in a room where he was the smooth one. The rooftop talks. Two weeks later a woman you haven't met yet mentions 'the guy who went off at Chase' at a dinner party. The brand hardens the longer it's uncontested. You could handle Chase at full volume every Friday for a year and still be losing the rooms he's already in by Sunday. The lesson: don't fight the man who's been rehearsing this exchange since he was twelve. Refuse the terms.",
    failureBlogSlug: "ignore-the-alpha-target-the-omega",
    failureBlogTitle: "Ignore the Alpha, Target the Omega",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Matching aggression is entering a contest on his terms. The only winning move is to refuse the frame, not defeat it.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-branded",
    backgroundId: "rooftop-bar",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Denial Confirmed It",
    endingSummary:
      "You defended yourself against a premise that didn't deserve defending. Explaining that you paid for the drink told the room the remark landed, defenders only defend real hits. Liv's face changed. You didn't see the change in real time, which is part of what made it worse. She leaves the rooftop at 11:14pm. You don't see her again. For the next eighteen months you'll wonder if you said something wrong afterwards. You didn't. You said it in the three seconds you thought you were recovering.",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The moment you defend the detail, you've agreed the premise is worth a defence. Don't answer the question he asked. Refuse that the question was asked.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-agreed",
    backgroundId: "rooftop-bar",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Signed His Frame",
    endingSummary:
      "'Gotta work on that', a three-word admission you'll replay in your head for a week. The self-deprecating laugh is the universal male tell for 'I hope this defuses it.' It doesn't defuse anything. It just tells the room the frame he offered was a frame you could agree with. Liv filed you as likeable, pliable, and not serious. Two weeks later at a mutual friend's thing she'll be warm to you and also, somehow, never quite free for the drink you suggest. You'll blame the timing. It wasn't the timing.",
    failureBlogSlug: "ignore-the-alpha-target-the-omega",
    failureBlogTitle: "Ignore the Alpha, Target the Omega",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Co-signing a cut is not humility. It's status surrender dressed as good humour.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-omega",
    backgroundId: "rooftop-bar",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Room Picked Its Omega",
    endingSummary:
      "Four seconds of silence and a look at your ice. That's all it took. Predators and alpha-testers are trained by ten thousand hours of rooms to read exactly that moment, the freeze and file you as the one who can be cut without cost. You will now be cut, subtly, at every rooftop, dinner, and house party you share with any of these six people for the next two years. Not because you deserve it. Because predators' gaze is cheap to give and reputations are expensive to undo. Cole looked at the floor because he's seen this happen to men before. It's survivable. You rebuild by training the calm reframe until it's muscle memory so the next rooftop goes differently.",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The freeze isn't weakness. It's an untrained reflex. Train the reframe and the reflex changes.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-political",
    backgroundId: "rooftop-bar",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Legitimised",
    endingSummary:
      "The private apology meant nothing. The sidebar meant everything. You took a public cut and responded with a private conversation, which told the rooftop the cut was worth a private conversation. Chase collected the exact reward he was hunting: your focused, exclusive attention, inside one minute. He walks back to the group with the small, satisfied look of a man whose move worked. The next morning two of the six people on that rooftop will repeat the story. In their version you pulled him aside to complain. That's the version that sticks. Pulling him aside was politically correct and socially catastrophic.",
    failureBlogSlug: "ignore-the-alpha-target-the-omega",
    failureBlogTitle: "Ignore the Alpha, Target the Omega",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Private correction of public status moves grants the move legitimacy. The reframe has to happen in the room where the cut happened.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-diluted",
    backgroundId: "rooftop-bar",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "You Explained the Enemy",
    endingSummary:
      "You held the frame, and then, offered an opening, you walked into it. Detailing Chase turned the composed man she was interested in into an explaining man she was already half done with. Liv is polite for another fifteen minutes and then she has to find her friend. No number. No follow-up. Cole, the next day: 'You had him until you kept having him.' The finishing move of the calm reframe is never giving the cutter another appearance in your story. Once you defeat the frame, he's supposed to disappear from your mouth. You kept him alive by narrating him.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The villain's only power after a failed cut is your willingness to keep casting him. Recast the scene without him.",
        emotion: "sad",
      },
    ],
  },
];

export const datingMission1: Scenario = {
  id: "d1-frame-challenge",
  title: "Frame Under Challenge",
  tagline:
    "A cutting remark in front of six people. Status is lost in the reaction, not the insult.",
  description:
    "Rooftop bar. You've been talking to the woman you came to meet. A higher-status man you've met once walks up and cuts you in front of the group, not loudly, not cruelly, just surgically. Three seconds of silence. Everyone turns. Every young man meets this moment once. Handle it with matched aggression and the room brands you volatile. Handle it with nervous denial and you confirm the hit landed. Freeze and the room picks its omega in front of you. There's exactly one clean move, the calm reframe and it has to land inside ninety seconds or the brand hardens and lasts years.",
  tier: "free",
  track: "male-dating",
  level: 1,
  order: 1,
  estimatedMinutes: 6,
  difficulty: "beginner",
  category: "dating",
  xpReward: 100,
  badgeId: "frame-held",
  startSceneId: "the-cut",
  tacticsLearned: [
    "The calm reframe, labelling the cutter without heat",
    "Silence as status weapon when paired with composure",
    "Refusing the frame instead of fighting it",
    "Not narrating your own win after the reframe lands",
  ],
  redFlagsTaught: [
    "Public negging as status-protection (alpha-testing)",
    "Peer-coordinated humiliation, the laugh chain",
    "'Just kidding' as the second half of the move",
    "Private sidebars that legitimise public cuts",
  ],
  characters: [CHASE, COLE, LIV, INNER_VOICE_M],
  scenes,
};

export default datingMission1;
