import type { ForkScene } from '../../../types';

/**
 * Climax - The Event
 * Major social gathering where all paths converge
 */
export const eventScenes: ForkScene[] = [
  {
    id: 'climax-event-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    chapter: { name: 'Mission 5: Social Proof', index: 5, total: 5 },
    mood: 'party',
    dialog: [
      {
        text: 'Two weeks later. The biggest networking event of the quarter.',
      },
      {
        text: 'Tyler\'s there. Dana\'s there. Marcus is there. Blake is your plus-one.',
      },
      {
        text: 'Everyone you\'ve met. Everything you\'ve learned. It all comes together tonight.',
      },
    ],
    nextSceneId: 'climax-arrival',
  },
  {
    id: 'climax-arrival',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'party',
    dialog: [
      {
        text: 'The venue is stunning. Crystal chandeliers. Open bar. People who matter.',
      },
      {
        text: 'Tyler spots you immediately. Waves dramatically.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'Dana\'s in a corner, watching. She hasn\'t texted since the date.',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: 'Marcus nods from across the room. Cool. Distant. Interested.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'climax-navigation',
  },
  {
    id: 'climax-navigation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Work the room."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"Everyone\'s watching who you talk to first. It sets the tone."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: 'Social proof accumulates. Who do you build with?',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'navigate-tyler',
        text: 'Head straight to Tyler. Cement that VIP connection.',
        nextSceneId: 'climax-tyler-update',
        isOptimal: false,
        tactic: 'alliance',
        reaction: {
          text: 'Tyler beams. You\'ve chosen his camp. That means something here.',
          emotion: 'happy',
          bodyLanguage: 'Public endorsement. Valuable.',
          scoreImpact: 10,
        },
      },
      {
        id: 'navigate-alone',
        text: 'Work the room solo first. Let them come to you.',
        nextSceneId: 'climax-solo-power',
        isOptimal: true,
        tactic: 'independence',
        reaction: {
          text: 'You move through the crowd. Confident. Unhurried. People notice.',
          emotion: 'knowing',
          bodyLanguage: 'Not attached to anyone\'s orbit. Your own gravity.',
          scoreImpact: 15,
        },
      },
      {
        id: 'navigate-derek',
        text: 'Find Derek. See if the connection survived Dana\'s sabotage.',
        nextSceneId: 'climax-derek-reunion',
        isOptimal: false,
        tactic: 'follow-up',
        reaction: {
          text: 'He spots you. Genuine smile. Dana watches, stone-faced.',
          emotion: 'happy',
          bodyLanguage: 'The sabotage didn\'t work. She\'s furious.',
          scoreImpact: 10,
        },
      },
      {
        id: 'navigate-confront-dana',
        text: 'Walk directly to Dana. Clear the air before it gets worse.',
        nextSceneId: 'climax-dana-confrontation',
        isOptimal: false,
        tactic: 'direct',
        reaction: {
          text: 'Her smile freezes. Didn\'t expect you to approach first.',
          emotion: 'confused',
          bodyLanguage: 'Coverts prefer ambush. You just took that away.',
          scoreImpact: 10,
        },
      },
    ],
  },
  // Branch scenes
  {
    id: 'climax-tyler-update',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"My favorite person!"',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'He introduces you to everyone around him. By name. With stories.',
      },
      {
        text: '"This one gets it. Remember that night at Velvet? Legendary."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'Tyler\'s endorsement opens doors. HPD used correctly = network multiplier.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-maris-approaches',
  },
  {
    id: 'climax-solo-power',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'party',
    dialog: [
      {
        text: 'You move through the room. Not chasing anyone.',
      },
      {
        text: 'People approach YOU. Questions. Introductions. Interest.',
      },
      {
        text: 'Marcus watches from across the room. Tyler looks confused—you didn\'t go to him first.',
      },
      {
        text: 'Independence reads as value. You belong here.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-maris-approaches',
  },
  {
    id: 'climax-derek-reunion',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'romantic',
    dialog: [
      {
        text: '"You came."',
      },
      {
        text: '"Wouldn\'t miss it. Especially after... everything."',
      },
      {
        text: 'He glances at Dana. She\'s pretending not to watch.',
      },
      {
        text: '"She\'s been giving me the silent treatment since the date. Healthy."',
      },
    ],
    nextSceneId: 'climax-maris-approaches',
  },
  {
    id: 'climax-dana-confrontation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: '"Dana."',
      },
      {
        text: '"...hi." Her smile is tight. Fake.',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"About the other night—"',
      },
      {
        text: '"Oh, that? Water under the bridge! I\'m so happy you\'re here!"',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'The mask snaps back on. She\'ll never admit anything.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-maris-approaches',
  },
];
