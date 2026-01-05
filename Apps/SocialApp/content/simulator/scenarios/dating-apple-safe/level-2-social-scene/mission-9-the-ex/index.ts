// Mission 9: The Ex (Apple-Safe Version)
// DEFENSIVE: Recognize NPD hoovering and DARVO patterns. Protect your new connection.
import type { Scene } from '../../../../types';
import type { DatingScenario, MissionRewards } from '../../types';
import { characters } from '../metadata';

export const MISSION_ID = 'mission-9-the-ex';

export const missionMetadata = {
  id: MISSION_ID,
  number: 9,
  title: 'The Ex',
  objective: 'Recognize NPD hoovering tactics. Protect yourself and your new connection.',
  tier: 'premium' as const,
  estimatedMinutes: 12,
  difficulty: 'advanced' as const,
};

export const rewards: MissionRewards = {
  power: 20,
  mask: 25,
  vision: 20,
  unlocks: 'mission-10-social-proof',
};

// Scene 9A: The Sighting
const scene9a: Scene = {
  id: 'scene-9a-sighting',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'A social event. You\'re with Jamie. Things are going well.',
    },
    {
      text: 'Then you see them. Drew. Your narcissist ex. The one who nearly broke you.',
      speakerId: 'drew',
      emotion: 'smirking',
    },
    {
      text: 'They\'ve spotted you. That smile. The calculated one you remember too well.',
    },
    {
      speakerId: 'inner-voice',
      text: 'The hoover. They\'ll try to suck you back in. This was not a coincidence.',
      emotion: 'concerned',
    },
  ],
  choices: [
    {
      id: 'choice-9a-grey-rock',
      text: 'Stay calm. Continue your conversation with Jamie as if nothing happened.',
      nextSceneId: 'scene-9a-grey-rock-result',
      isOptimal: true,
      xpBonus: 15,
      feedback: 'Grey rock. No reaction. They feed on your emotional response.',
    },
    {
      id: 'choice-9a-warn-jamie',
      text: 'Quietly tell Jamie: "My ex is here. It might get weird."',
      nextSceneId: 'scene-9a-warn-jamie-result',
      xpBonus: 10,
      feedback: 'Honest. Jamie deserves to know what might happen.',
    },
    {
      id: 'choice-9a-leave',
      text: 'Suggest leaving immediately.',
      nextSceneId: 'scene-9a-leave-result',
      xpBonus: 5,
      feedback: 'Running is valid. But they saw you run.',
    },
    {
      id: 'choice-9a-panic',
      text: 'Freeze. The memories flooding back.',
      nextSceneId: 'scene-9a-panic-result',
      xpBonus: 0,
      feedback: 'The trauma response. They\'ll see it. They\'ll use it.',
    },
  ],
};

// Scene 9B: The Hoover
const scene9b: Scene = {
  id: 'scene-9b-hoover',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Drew approaches. The mask is on. Charm dialed to maximum.',
    },
    {
      text: '"Hey! What a surprise! You look amazing. I\'ve missed you. Who\'s your friend?"',
      speakerId: 'drew',
      emotion: 'smirking',
    },
    {
      speakerId: 'inner-voice',
      text: 'Hoovering 101: act like nothing happened, pretend you\'re still close, triangulate with Jamie.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-9b-minimal',
      text: '"Drew. This is Jamie." Keep it short. Offer nothing.',
      nextSceneId: 'scene-9b-minimal-result',
      isOptimal: true,
      xpBonus: 20,
      feedback: 'Minimal engagement. You gave them nothing to work with.',
    },
    {
      id: 'choice-9b-cold',
      text: '"We\'re in the middle of something." Turn back to Jamie.',
      nextSceneId: 'scene-9b-cold-result',
      xpBonus: 15,
      feedback: 'Clear boundary. They\'ll hate it. Good.',
    },
    {
      id: 'choice-9b-polite',
      text: 'Be polite. Make small talk. Don\'t want to be rude.',
      nextSceneId: 'scene-9b-polite-result',
      xpBonus: 0,
      feedback: 'You opened the door. They\'ll walk right through it.',
    },
    {
      id: 'choice-9b-explain',
      text: 'Start explaining to Jamie: "This is Drew, we used to..."',
      nextSceneId: 'scene-9b-explain-result',
      xpBonus: 5,
      feedback: 'You\'re giving Drew exactly what they want: airtime.',
    },
  ],
};

// Scene 9C: The DARVO
const scene9c: Scene = {
  id: 'scene-9c-darvo',
  backgroundId: 'bar',
  dialog: [
    {
      text: 'Drew\'s smile tightens. The mask is slipping.',
    },
    {
      text: '"Wow, okay. Cold. I was trying to be friendly. I guess some people never change. I was the one who got hurt, remember? You left ME."',
      speakerId: 'drew',
      emotion: 'cold',
    },
    {
      speakerId: 'inner-voice',
      text: 'DARVO in real time: Deny, Attack, Reverse Victim and Offender. They\'re the victim now. Classic.',
      emotion: 'knowing',
    },
  ],
  choices: [
    {
      id: 'choice-9c-disengage',
      text: '"Take care, Drew." Walk away. Don\'t engage.',
      nextSceneId: 'scene-9c-disengage-result',
      isOptimal: true,
      xpBonus: 25,
      feedback: 'You refused to play. The only winning move.',
    },
    {
      id: 'choice-9c-defend',
      text: 'Start defending yourself: "That\'s not what happened—"',
      nextSceneId: 'scene-9c-defend-result',
      xpBonus: 0,
      feedback: 'You took the bait. Now you\'re debating history in front of Jamie.',
    },
    {
      id: 'choice-9c-laugh',
      text: 'Laugh. "Same old Drew. Jamie, let\'s get a drink."',
      nextSceneId: 'scene-9c-laugh-result',
      xpBonus: 15,
      feedback: 'Dismissive but controlled. You didn\'t let them rattle you.',
    },
    {
      id: 'choice-9c-apologize',
      text: 'Start apologizing to keep the peace.',
      nextSceneId: 'scene-9c-apologize-result',
      xpBonus: 0,
      feedback: 'You apologized for their behavior. They\'ve won.',
    },
  ],
};

// Scene 9A Results
const scene9aGreyRockResult: Scene = {
  id: 'scene-9a-grey-rock-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You continue talking to Jamie as if nothing happened.' },
    { text: 'Jamie asks something. You answer. Natural conversation.', speakerId: 'jamie', emotion: 'happy' },
    { speakerId: 'inner-voice', text: 'Grey rock. Boring. Flat. No emotional reaction for Drew to work with.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-9b-hoover',
};

const scene9aWarnJamieResult: Scene = {
  id: 'scene-9a-warn-jamie-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Jamie nods. "Thanks for telling me. I\'ve got you."', speakerId: 'jamie', emotion: 'serious' },
    { text: 'They subtly shift closer. Protective.' },
    { speakerId: 'inner-voice', text: 'Honest. Now Jamie knows what they might witness.', emotion: 'neutral' },
  ],
  nextSceneId: 'scene-9b-hoover',
};

const scene9aLeaveResult: Scene = {
  id: 'scene-9a-leave-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"Actually, want to get out of here?" You try to sound casual.' },
    { text: 'Jamie looks surprised but agrees. As you leave, you catch Drew\'s eye.' },
    { text: 'They\'re smirking. They saw you run.', speakerId: 'drew', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'You got out, but they know they still have power over you.', emotion: 'concerned' },
  ],
  isEnding: true,
  outcomeType: 'neutral',
  endingTitle: 'The Tactical Retreat',
  endingSummary: 'You left. Smart in the moment. But Drew knows they still affect you.',
};

// EARLY FAILURE - Trauma response
const scene9aPanicResult: Scene = {
  id: 'scene-9a-panic-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You freeze. The anxiety rising. The memories crashing in.' },
    { text: 'Jamie notices something\'s wrong. "Hey, are you okay?"', speakerId: 'jamie', emotion: 'concerned' },
    { text: 'Drew is already walking over. They saw the opening.' },
    { speakerId: 'inner-voice', text: 'They feed on your distress. You just gave them a feast.', emotion: 'sad' },
  ],
  nextSceneId: 'scene-9b-hoover-panic',
};

// Alternative 9B for panic path - worse outcome
const scene9bHooverPanic: Scene = {
  id: 'scene-9b-hoover-panic',
  backgroundId: 'bar',
  dialog: [
    { text: '"Oh no, are you alright? You look pale." Drew is all concern now.', speakerId: 'drew', emotion: 'happy' },
    { text: 'To Jamie: "They always got like this. I used to take care of them."' },
    { text: 'Drew is triangulating already. Painting themselves as the caretaker.' },
    { speakerId: 'inner-voice', text: 'They\'re rewriting history in front of Jamie. And you can\'t speak.', emotion: 'concerned' },
  ],
  choices: [
    {
      id: 'choice-9b-panic-snap',
      text: 'Snap out of it: "I\'m fine. Drew, we\'re done here."',
      nextSceneId: 'scene-9c-darvo',
      xpBonus: 10,
      feedback: 'You recovered. But they got what they wanted first.',
    },
    {
      id: 'choice-9b-panic-jamie',
      text: 'Let Jamie handle it: "I need some air."',
      nextSceneId: 'scene-9b-panic-jamie-result',
      xpBonus: 5,
      feedback: 'You left Jamie alone with your ex. Risky.',
    },
    {
      id: 'choice-9b-panic-accept',
      text: 'Accept Drew\'s "concern" - maybe they\'ve changed.',
      nextSceneId: 'scene-9b-panic-accept-result',
      xpBonus: 0,
      feedback: 'They haven\'t changed. They never do.',
    },
  ],
};

// Scene 9B Results
const scene9bMinimalResult: Scene = {
  id: 'scene-9b-minimal-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Drew blinks. Not the warm reception they expected.' },
    { text: '"Oh. Nice to meet you, Jamie." Their charm pivots to Jamie now.', speakerId: 'drew', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: 'Now they\'ll try to win Jamie. Classic triangulation. Watch.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-9c-darvo',
};

const scene9bColdResult: Scene = {
  id: 'scene-9b-cold-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Drew\'s face hardens for a moment. Then the mask is back.', speakerId: 'drew', emotion: 'cold' },
    { text: '"Wow, okay. I was just being friendly. Clearly still some baggage there."' },
    { speakerId: 'inner-voice', text: 'Already spinning it. You\'re the problem, not them. Predictable.', emotion: 'knowing' },
  ],
  nextSceneId: 'scene-9c-darvo',
};

// EARLY FAILURE - Polite engagement
const scene9bPoliteResult: Scene = {
  id: 'scene-9b-polite-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You make small talk. Asking about their life. Being pleasant.' },
    { text: 'Drew lights up. "Things are great! Well, mostly. I\'ve been thinking about you a lot actually..."', speakerId: 'drew', emotion: 'seductive' },
    { text: 'Forty minutes later, you\'ve barely spoken to Jamie. Drew dominated the evening.' },
    { speakerId: 'inner-voice', text: 'You were polite. They saw it as an invitation. Back to square one.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Old Pattern',
  endingSummary: 'You tried to be nice. Drew saw an opening and took it. Jamie watched you get absorbed back into their orbit.',
};

const scene9bExplainResult: Scene = {
  id: 'scene-9b-explain-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"This is Drew, we used to—" You start explaining.' },
    { text: 'Drew jumps in: "We were together for two years. Best time of my life."', speakerId: 'drew', emotion: 'happy' },
    { text: 'Jamie looks uncomfortable. Drew is now controlling the narrative.' },
    { speakerId: 'inner-voice', text: 'You opened the door to the past. Drew walked right through it.', emotion: 'concerned' },
  ],
  nextSceneId: 'scene-9c-darvo',
};

// Panic path results
const scene9bPanicJamieResult: Scene = {
  id: 'scene-9b-panic-jamie-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You step away. When you return, Jamie looks uncomfortable.', speakerId: 'jamie', emotion: 'confused' },
    { text: '"Your ex is... interesting. They said some things about you."' },
    { text: 'Drew has been talking. Spinning. You don\'t know what lies they\'ve told.' },
    { speakerId: 'inner-voice', text: 'You left Jamie alone with a narcissist. Damage done.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Smear Campaign',
  endingSummary: 'Drew got alone time with Jamie. Whatever they said, you\'ll be cleaning it up for weeks.',
};

// WORST FAILURE - Believing they changed
const scene9bPanicAcceptResult: Scene = {
  id: 'scene-9b-panic-accept-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'Drew sits down with you. Ordering drinks. Taking over.' },
    { text: '"I\'ve grown so much. I\'ve been in therapy. I understand what I did wrong now."', speakerId: 'drew', emotion: 'seductive' },
    { text: 'Jamie quietly leaves. You don\'t even notice until it\'s too late.' },
    { speakerId: 'inner-voice', text: 'They said the words you wanted to hear. You forgot they\'re just words.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Hoover Complete',
  endingSummary: 'You believed they changed. They didn\'t. Jamie is gone. You\'re back where you started.',
};

// Scene 9C Results - Endings
const scene9cDisengageResult: Scene = {
  id: 'scene-9c-disengage-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You walk away. Drew calls after you but you don\'t turn.' },
    { text: 'Jamie catches up. "That was intense. You okay?"', speakerId: 'jamie', emotion: 'concerned' },
    { text: '"Better now. Thank you for being there."' },
    { speakerId: 'inner-voice', text: 'You didn\'t take the bait. The DARVO didn\'t work. You\'re free.', emotion: 'happy' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Grey Rock Victory',
  endingSummary: 'You recognized every tactic—the hoover, the triangulation, the DARVO. You gave them nothing. Jamie saw your strength.',
};

// EARLY FAILURE - Took the bait
const scene9cDefendResult: Scene = {
  id: 'scene-9c-defend-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"That\'s not what happened! You were the one who—"' },
    { text: 'Drew interrupts: "See? Always attacking. I\'m just trying to be civil."', speakerId: 'drew', emotion: 'cold' },
    { text: 'Jamie watches. Neither of you look good right now.' },
    { speakerId: 'inner-voice', text: 'You\'re arguing with someone who will never admit fault. You can\'t win.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Debate Trap',
  endingSummary: 'You tried to defend yourself. Drew twisted everything. Jamie doesn\'t know who to believe.',
};

const scene9cLaughResult: Scene = {
  id: 'scene-9c-laugh-result',
  backgroundId: 'bar',
  dialog: [
    { text: 'You laugh. Genuine. "Same old Drew." Take Jamie\'s hand.' },
    { text: 'Drew\'s face flickers. Rage, then the mask again. "Whatever. Enjoy your night."', speakerId: 'drew', emotion: 'cold' },
    { text: 'They leave. You exhale.' },
    { speakerId: 'inner-voice', text: 'You didn\'t give them the reaction they wanted. They couldn\'t feed.', emotion: 'knowing' },
  ],
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'The Unbothered',
  endingSummary: 'You laughed at the manipulation. Drew couldn\'t stand it. You\'re finally free of their power.',
};

// WORST FAILURE - Apologizing
const scene9cApologizeResult: Scene = {
  id: 'scene-9c-apologize-result',
  backgroundId: 'bar',
  dialog: [
    { text: '"You\'re right, I\'m sorry. I didn\'t mean to be cold—"' },
    { text: 'Drew\'s smile returns. Victorious. "See? That\'s all I wanted."', speakerId: 'drew', emotion: 'smirking' },
    { text: 'Jamie watches you apologize for... what exactly?' },
    { speakerId: 'inner-voice', text: 'You apologized for having boundaries. They won. Again.', emotion: 'sad' },
  ],
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'The Apology',
  endingSummary: 'You apologized for being mistreated. Classic DARVO success. Drew got exactly what they came for.',
};

export const mission9Scenes: Scene[] = [
  scene9a, scene9aGreyRockResult, scene9aWarnJamieResult, scene9aLeaveResult, scene9aPanicResult,
  scene9bHooverPanic,
  scene9b, scene9bMinimalResult, scene9bColdResult, scene9bPoliteResult, scene9bExplainResult,
  scene9bPanicJamieResult, scene9bPanicAcceptResult,
  scene9c, scene9cDisengageResult, scene9cDefendResult, scene9cLaughResult, scene9cApologizeResult,
];

export const mission9Scenario: DatingScenario = {
  id: MISSION_ID,
  levelId: 'social-scene',
  missionNumber: 9,
  title: missionMetadata.title,
  tagline: 'The past never stays buried.',
  description: missionMetadata.objective,
  objective: missionMetadata.objective,
  tier: missionMetadata.tier,
  estimatedMinutes: missionMetadata.estimatedMinutes,
  difficulty: missionMetadata.difficulty,
  characters,
  scenes: mission9Scenes,
  rewards,
  startSceneId: 'scene-9a-sighting',
};

export default mission9Scenario;
