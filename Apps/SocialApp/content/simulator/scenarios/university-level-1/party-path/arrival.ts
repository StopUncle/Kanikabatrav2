import type { ForkScene } from '../../../types';

/**
 * Party Path - Scene 1: Arrival
 * Establishing the environment and first impressions of Maris Caldwell
 */
export const arrivalScenes: ForkScene[] = [
  {
    id: 'party-arrival',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    chapter: {
      name: 'The Party',
      index: 1,
      total: 5,
    },
    dialog: [
      {
        text: 'The bass hits you before you even open the door. Maris\'s off-campus house is massive—three stories of old money disguised as a student rental.',
      },
      {
        text: 'Inside, it\'s packed. Beautiful people everywhere, drinks in hand, laughing at things that probably aren\'t funny. The air smells like expensive perfume and desperation.',
      },
      {
        text: 'You spot Maris immediately. She\'s the center of the room without even trying—long dark hair, wearing something simple that probably costs more than your car. Everyone around her leans in like flowers toward the sun.',
      },
      {
        text: 'She laughs at something someone said. Warm. Musical. Perfect. Too perfect.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'arrival-observe',
        text: 'Find a spot with a good view. Watch how she operates.',
        reaction: {
          text: 'You lean against the wall near the drinks table. From here, you can see everything.',
          emotion: 'neutral',
          bodyLanguage: 'Maris hasn\'t noticed you. Good. You have time to study her.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-observation',
        isOptimal: true,
        tactic: 'strategic-observation',
      },
      {
        id: 'arrival-direct',
        text: 'Walk straight up to her. Confidence is key.',
        reaction: {
          text: 'You push through the crowd toward Maris. Her eyes find you—warm, curious, welcoming—then slide past. Like you were never there.',
          emotion: 'cold',
          bodyLanguage: 'Her body doesn\'t move, but somehow the circle closes.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-rejected-approach',
        tactic: 'direct-approach',
      },
      {
        id: 'arrival-mingle',
        text: 'Work the room first. Build some social proof.',
        reaction: {
          text: 'You start conversations with people on the periphery. Nothing deep, just establishing presence.',
          emotion: 'neutral',
          bodyLanguage: 'You notice Maris glancing your way. She notices everyone. Cataloging.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-social-proof',
        tactic: 'social-proof-building',
      },
    ],
  },
  {
    id: 'party-observation',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'From your vantage point, you watch Maris work the room. She\'s not just good. She\'s surgical.',
      },
      {
        text: 'She gives each person exactly what they need—the lonely guy gets her full attention, the insecure girl gets compliments, the ambitious one gets promises. Each interaction perfectly calibrated.',
      },
      {
        text: 'She makes them feel special. Chosen. Then moves on.',
      },
      {
        text: 'You notice something else. When she turns away from someone, for just a fraction of a second, her face goes completely blank. Empty. Like a mask being set aside.',
      },
      {
        text: 'There. That\'s what\'s underneath.',
      },
      {
        text: 'Then you notice someone else. A guy hovering at the edge of her circle, waiting to be useful.',
      },
    ],
    nextSceneId: 'party-caleb-observation',
  },
  {
    id: 'party-rejected-approach',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'You stand at the edge of her circle, waiting for an opening. The conversation flows around you like you\'re invisible.',
      },
      {
        text: 'After what feels like an eternity, Maris turns to you with the warmest smile you\'ve ever seen.',
      },
      {
        text: '"I\'m so sorry, I didn\'t see you there! Have we met?"',
        speakerId: 'maris',
        emotion: 'happy',
      },
      {
        text: 'Her tone is genuine. Her eyes are calculating.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'rejected-recover',
        text: '"Not yet. But I\'ve heard this is the place to be."',
        reaction: {
          text: 'Maris\'s smile widens. "Is that what they say?" She leans closer, conspiratorial. "They\'re not wrong." She gestures you into the circle.',
          emotion: 'seductive',
          bodyLanguage: 'She\'s giving you attention. It feels... intoxicating.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-first-encounter',
        isOptimal: true,
      },
      {
        id: 'rejected-defensive',
        text: '"Just trying to meet people. Isn\'t that what parties are for?"',
        reaction: {
          text: 'Maris tilts her head, sympathetic. "Of course! Let me introduce you to some people." She guides you toward the edge of the room. Away from her.',
          emotion: 'happy',
          bodyLanguage: 'She\'s delegating you. With a smile.',
          scoreImpact: -5,
        },
        nextSceneId: 'party-recovery-needed',
      },
      {
        id: 'rejected-honest',
        text: '"I\'m new here. Still figuring out how things work."',
        reaction: {
          text: 'Something flickers in Maris\'s eyes. Interest? "New is good. New means... possibilities." Her smile has an edge now.',
          emotion: 'curious',
          bodyLanguage: 'She\'s filing you away. For what, you don\'t know yet.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-first-encounter',
      },
    ],
  },
  {
    id: 'party-social-proof',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'You spend twenty minutes making connections. A girl from your psychology class. A guy who turns out to be on the debate team. A grad student who knows everyone.',
      },
      {
        text: 'Each conversation is brief but warm. You laugh at the right moments. Ask good questions. Leave before things get boring.',
      },
      {
        text: 'When you finally approach Maris\'s orbit, you\'re not a stranger anymore. You\'re someone people seem to like.',
      },
      {
        text: 'Maris notices. Her eyes track you, and when you\'re close enough, she reaches out to touch your arm.',
      },
      {
        text: '"You\'re the one everyone\'s been talking to." Her voice is honey. "I was starting to get jealous."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'party-first-encounter',
  },
  {
    id: 'party-recovery-needed',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'You\'ve been delegated. Maris handed you off to someone else with such grace that it almost felt like a gift. It wasn\'t.',
      },
      {
        text: 'She didn\'t reject you. She just... moved on. Like you weren\'t worth the effort.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: 'A girl near the drinks table is watching Maris with barely concealed frustration. She looks like she\'s been in your position before.',
      },
    ],
    dialogueChoices: [
      {
        id: 'recovery-ally',
        text: 'Approach the frustrated girl. Potential ally.',
        reaction: {
          text: 'She glances at you, then back at Maris. "Let me guess. The redirect?" Her voice is bitter. "She does it so nicely you don\'t even realize you\'ve been dismissed."',
          emotion: 'sad',
          bodyLanguage: 'She shifts to include you, grateful for company.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-ally-intel',
        isOptimal: true,
      },
      {
        id: 'recovery-wait',
        text: 'Wait for Maris\'s mood to shift. Try again later.',
        reaction: {
          text: 'You find a corner and watch. After fifteen minutes, you notice Maris\'s smile falter when someone mentions her brother. A crack.',
          emotion: 'neutral',
          bodyLanguage: 'She recovers instantly. But you saw it.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-second-chance',
      },
      {
        id: 'recovery-leave',
        text: 'This isn\'t working. Maybe the study hall is the better play.',
        reaction: {
          text: 'You slip out the back. The bass fades behind you. The common room is a ten-minute walk.',
          emotion: 'neutral',
          bodyLanguage: 'Sometimes retreat is strategy.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-hall-arrival',
      },
    ],
  },
];
