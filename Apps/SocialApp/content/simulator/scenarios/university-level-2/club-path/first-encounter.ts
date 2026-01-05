import type { ForkScene } from '../../../types';

/**
 * Club Path - First Encounter with Tyler
 * Tyler (HPD) tests your social proof and feeds on validation
 */
export const firstEncounterScenes: ForkScene[] = [
  // LOW STATUS PATH (from bouncer dismissal)
  {
    id: 'club-floor-low-status',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake waves from across the room. Points up at VIP. Mouths: "Come up!"',
      },
      {
        text: 'The stairs to VIP are guarded. Another bouncer. He saw you get sent to the back of the line.',
      },
      {
        text: 'Starting from a deficit. This will take work.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'club-vip-stairs-hard',
  },
  // NORMAL STATUS PATH
  {
    id: 'club-floor-normal',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'The club pulses around you. Bodies move. Drinks flow. VIP glitters above.',
      },
      {
        text: 'Blake catches your eye from the upper level. Gestures you up.',
      },
      {
        text: 'The VIP stairs. A velvet rope. Another gatekeeping moment.',
      },
    ],
    nextSceneId: 'club-vip-stairs',
  },
  // HIGH STATUS PATH (from optimal bouncer response)
  {
    id: 'club-floor-high-status',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'You move through the crowd. People step aside without you asking.',
      },
      {
        text: 'The energy you walked in with—calm, unhurried, certain—it\'s doing the work for you.',
      },
      {
        text: 'Blake spots you from VIP. Grins. The rope lifts before you reach it.',
      },
    ],
    nextSceneId: 'club-vip-entrance',
  },
  // VIP STAIRS SCENES
  {
    id: 'club-vip-stairs-hard',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'tense',
    dialog: [
      {
        text: 'The VIP guard looks at you. Recognition flickers. Not good recognition.',
        speakerId: 'bouncer',
        emotion: 'cold',
      },
      {
        text: '"VIP\'s full."',
        speakerId: 'bouncer',
        emotion: 'neutral',
      },
      {
        text: 'He saw your entrance. You\'re tagged as low-value now.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'stairs-hard-trap',
        text: '"Please, I\'m just trying to meet my friend Blake. He\'s up there waiting."',
        nextSceneId: 'club-denied-final',
        isOptimal: false,
        tactic: 'pleading',
        reaction: {
          text: '"Then he can come down." Arms don\'t uncross.',
          emotion: 'cold',
          bodyLanguage: 'Door closed.',
          scoreImpact: -20,
        },
      },
      {
        id: 'stairs-hard-subtle',
        text: 'Text Blake: "VIP won\'t let me up. Little help?"',
        nextSceneId: 'club-blake-rescue',
        isOptimal: false,
        tactic: 'delegation',
        reaction: {
          text: 'Blake appears a minute later. Talks to the guard. You\'re escorted up like cargo.',
          emotion: 'neutral',
          bodyLanguage: 'Functional, but you needed saving.',
          scoreImpact: -5,
        },
      },
      {
        id: 'stairs-hard-close',
        text: '"No worries. I\'ll grab a drink first. Let Tyler know I\'m here when he\'s ready."',
        nextSceneId: 'club-bar-reframe',
        isOptimal: false,
        tactic: 'reframe',
        reaction: {
          text: 'His expression shifts. Slight confusion. You didn\'t beg.',
          emotion: 'curious',
          bodyLanguage: 'Not what he expected.',
          scoreImpact: 5,
        },
      },
      {
        id: 'stairs-hard-optimal',
        text: 'Nod once. Walk to the bar. Order. Make yourself visible. Don\'t look back.',
        nextSceneId: 'club-bar-power-move',
        isOptimal: true,
        tactic: 'abundance',
        reaction: {
          text: 'You don\'t chase. You position. Let them come to you.',
          emotion: 'knowing',
          bodyLanguage: 'Frame shifted. You\'re not waiting—you\'re choosing.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'club-vip-stairs',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'The VIP guard glances at you. Neutral assessment.',
        speakerId: 'bouncer',
        emotion: 'neutral',
      },
      {
        text: '"Guest of?"',
        speakerId: 'bouncer',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'stairs-trap',
        text: '"Tyler Vance! He\'s expecting me. I\'m kind of a big deal to him."',
        nextSceneId: 'club-vip-entrance-awkward',
        isOptimal: false,
        tactic: 'overcompensation',
        reaction: {
          text: 'His lip twitches. Not a smile. "Sure you are."',
          emotion: 'smirking',
          bodyLanguage: 'You\'re in, but marked.',
          scoreImpact: -10,
        },
      },
      {
        id: 'stairs-subtle',
        text: '"Blake Rivera."',
        nextSceneId: 'club-vip-entrance',
        isOptimal: false,
        tactic: 'association',
        reaction: {
          text: '"Blake. Cool." Rope lifts.',
          emotion: 'neutral',
          bodyLanguage: 'Unremarkable entrance.',
          scoreImpact: 0,
        },
      },
      {
        id: 'stairs-close',
        text: '"Tyler invited me. Here\'s the text." Show phone casually.',
        nextSceneId: 'club-vip-entrance',
        isOptimal: false,
        tactic: 'proof',
        reaction: {
          text: 'He barely glances. "Go ahead."',
          emotion: 'neutral',
          bodyLanguage: 'You provided evidence. Unnecessary, but accepted.',
          scoreImpact: 0,
        },
      },
      {
        id: 'stairs-optimal',
        text: 'Meet his eyes. "Tyler." Nothing more.',
        nextSceneId: 'club-vip-entrance-strong',
        isOptimal: true,
        tactic: 'assumed-value',
        reaction: {
          text: 'He nods once. Rope lifts immediately.',
          emotion: 'neutral',
          bodyLanguage: 'You belong. He can tell.',
          scoreImpact: 10,
        },
      },
    ],
  },
  // VIP ENTRANCE SCENES
  {
    id: 'club-vip-entrance-awkward',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'VIP. Leather couches. Bottle service. Tyler holds court at the center.',
      },
      {
        text: 'Blake waves you over. Tyler clocks you. His eyes narrow for a split second.',
      },
      {
        text: 'He heard what you said to the guard. Word travels fast up here.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'club-tyler-intro-defensive',
  },
  {
    id: 'club-vip-entrance',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'VIP. The air changes. Less packed, more curated. Everyone here was selected.',
      },
      {
        text: 'Tyler spots you immediately. His face lights up—performative warmth.',
      },
      {
        text: '"There they are!"',
        speakerId: 'tyler',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'club-tyler-intro',
  },
  {
    id: 'club-vip-entrance-strong',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'VIP opens before you. Tyler sees you enter. His eyes widen—genuine interest.',
      },
      {
        text: 'He was watching the stairs. Saw how the guard responded to you.',
      },
      {
        text: '"FINALLY. Someone interesting tonight."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'He leaves his circle. Comes to YOU. That never happens.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'club-tyler-intro-advantage',
  },
  // RECOVERY SCENES
  {
    id: 'club-denied-final',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'cold',
    dialog: [
      {
        text: 'The VIP section stays closed. Blake eventually comes down, looking embarrassed for you.',
      },
      {
        text: '"Tyler\'s... particular about who comes up. Maybe next time?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'The night fizzles. No VIP. No Tyler. No connections made.',
      },
    ],
    nextSceneId: 'club-mission-failed',
  },
  {
    id: 'club-blake-rescue',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Blake vouches for you. The guard steps aside, barely.',
      },
      {
        text: 'Tyler watches the whole exchange. You needed help getting in. He saw.',
      },
      {
        text: '"Oh, you\'re Blake\'s friend."',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: 'Blake\'s friend. Not someone Tyler invited. The frame is set.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'club-tyler-intro-defensive',
  },
  {
    id: 'club-bar-reframe',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'You head to the bar. Order something good. Don\'t rush.',
      },
      {
        text: 'Twenty minutes later, Tyler himself appears at the bar. "Interesting approach."',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: '"Most people beg to get up there. You went and got a drink."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'club-tyler-intro',
  },
  {
    id: 'club-bar-power-move',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'The bar. You order. You wait. You make conversation with strangers who seem interesting.',
      },
      {
        text: 'Fifteen minutes later: "Mind if I join you?"',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: 'Tyler Vance. At the bar. Came to YOU.',
      },
      {
        text: '"You didn\'t come up to VIP. Everyone comes up to VIP."',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: 'Interest. Genuine interest. Because you didn\'t chase.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'club-tyler-intro-advantage',
  },
];
