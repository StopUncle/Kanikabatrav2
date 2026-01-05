import type { ForkScene } from '../../../types';

/**
 * Mission 11: The Entrance - Arrival
 * Red carpet, first impressions, reading the room
 */
export const arrivalScenes: ForkScene[] = [
  {
    id: 'gala-arrival-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    chapter: { name: 'The Entrance', index: 2, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'The Whitmore Estate. Old money architecture. Manicured hedges. Valets in white gloves.',
      },
      {
        text: 'The line of cars ahead. Mercedes. Bentley. Rolls-Royce.',
      },
      {
        text: 'Your car fits in. Barely.',
      },
      {
        text: '"Holy shit." Blake stares out the window.',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'Holy shit is right. This is a different world.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-arrival-exit',
  },
  {
    id: 'gala-arrival-exit',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    mood: 'professional',
    dialog: [
      {
        text: 'The car stops. Door opens. A sea of photographers.',
      },
      {
        text: 'Flash. Flash. Flash.',
      },
      {
        text: 'Nobody knows who you are. But they photograph everyone.',
      },
      {
        text: '"Walk like you belong here." Blake mutters.',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'First test. How do you enter?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'arrival-trap',
        text: 'Hurry past the cameras. Avoid eye contact.',
        nextSceneId: 'gala-arrival-rushed',
        isOptimal: false,
        tactic: 'avoidance',
        reaction: {
          text: 'You practically run up the steps. The photographers lose interest immediately.',
          emotion: 'neutral',
          bodyLanguage: 'You looked like someone who doesn\'t belong.',
          scoreImpact: -10,
        },
      },
      {
        id: 'arrival-subtle',
        text: 'Walk steadily. Neutral expression. Don\'t engage.',
        nextSceneId: 'gala-arrival-neutral',
        isOptimal: false,
        tactic: 'neutral-presence',
        reaction: {
          text: 'You pass through unnoticed. Neither good nor bad.',
          emotion: 'neutral',
          bodyLanguage: 'Invisible. Sometimes that\'s useful.',
          scoreImpact: 5,
        },
      },
      {
        id: 'arrival-close',
        text: 'Pause for photos. Smile. Give them something.',
        nextSceneId: 'gala-arrival-posed',
        isOptimal: false,
        tactic: 'attention-seeking',
        reaction: {
          text: 'A few cameras turn. Then turn away. You\'re nobody to them.',
          emotion: 'neutral',
          bodyLanguage: 'You tried too hard. They noticed.',
          scoreImpact: -5,
        },
      },
      {
        id: 'arrival-optimal',
        text: 'Walk with purpose. Unhurried. Eyes forward. Own the moment.',
        nextSceneId: 'gala-arrival-confident',
        isOptimal: true,
        tactic: 'presence',
        reaction: {
          text: 'A few photographers linger on you. Who is that? The question in their eyes.',
          emotion: 'neutral',
          bodyLanguage: 'You looked like someone worth remembering.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'gala-arrival-rushed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'Blake catches up. Slightly out of breath.',
      },
      {
        text: '"Okay, that was... fast."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Just wanted to get inside."',
      },
      {
        text: '"Right. Well. We\'re here." He looks around nervously.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Already on the back foot. Not ideal.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-entrance-hall',
  },
  {
    id: 'gala-arrival-neutral',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'You pass through the gauntlet. Unremarkable.',
      },
      {
        text: '"Nice. Blend in until you need to stand out."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"That\'s the plan."',
      },
      {
        text: 'Conservation of attention. Spend it wisely.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-entrance-hall',
  },
  {
    id: 'gala-arrival-posed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'The cameras turn away. Someone more interesting arrived behind you.',
      },
      {
        text: '"That was..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Don\'t."',
      },
      {
        text: 'Lesson learned. Don\'t try to be seen. Just be worth seeing.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-entrance-hall',
  },
  {
    id: 'gala-arrival-confident',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'Inside, Blake exhales.',
      },
      {
        text: '"Did you see how they looked at you? Like you were someone."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"I am someone."',
      },
      {
        text: '"Yeah. You are." He grins.',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: 'First impression: handled. Now the real work begins.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-entrance-hall',
  },
  {
    id: 'gala-entrance-hall',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    mood: 'professional',
    dialog: [
      {
        text: 'The entrance hall. Marble floors. Crystal chandeliers. Paintings worth more than your apartment.',
      },
      {
        text: 'A woman stands at the check-in desk. Professional smile. Eyes that miss nothing.',
      },
      {
        text: '"Name, please?"',
      },
      {
        text: 'She already has a list. She already knows everyone on it.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-checkin',
  },
];
