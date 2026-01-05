import type { ForkScene } from '../../../../types';

/**
 * Party Path - Scene 3: Caleb Encounter
 * A cautionary tale - seeing what happens to someone who gave everything
 * DEFENSIVE VERSION: Learning to recognize codependency and one-sided dynamics
 */
export const calebEncounterScenes: ForkScene[] = [
  {
    id: 'party-caleb-observation',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'The guy hovering at Maris\'s edge finally gets acknowledged. Maris snaps her fingers, and the guy rushes over with a fresh drink.',
      },
      {
        text: '"Thanks, Caleb." Maris doesn\'t look at him. Takes the drink. Keeps talking to someone else.',
      },
      {
        text: 'Caleb beams anyway. Like being used is a privilege.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'caleb-observe',
        text: 'Watch Caleb. Study the dynamic.',
        reaction: {
          text: 'Caleb positions himself at Maris\'s periphery, always available, never included. When Maris laughs, Caleb laughs. When Maris frowns, Caleb looks worried.',
          emotion: 'neutral',
          bodyLanguage: 'He mirrors everything. His identity is tied to Maris\'s approval.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-caleb-talk',
        isOptimal: true,
        tactic: 'pattern-recognition',
      },
      {
        id: 'caleb-approach-quick',
        text: 'Approach Caleb directly. See what he knows.',
        reaction: {
          text: 'Caleb eyes you suspiciously. "Can I help you?" His eyes keep darting to Maris, checking if he\'s being watched.',
          emotion: 'neutral',
          bodyLanguage: 'Territorial. You\'re a potential threat to his position.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-caleb-defensive',
      },
      {
        id: 'caleb-ignore',
        text: 'Move on. Not your problem.',
        reaction: {
          text: 'You turn away. Caleb stays in position, waiting for the next command. Some lessons you learn by watching. Some by experiencing.',
          emotion: 'neutral',
          bodyLanguage: 'He\'s a warning. Whether you take it is up to you.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-the-test',
      },
    ],
  },
  {
    id: 'party-caleb-talk',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'You wait until Maris is distracted, then approach Caleb. He\'s refilling a snack bowl, anticipating needs no one asked him to meet.',
      },
      {
        text: '"Hey. You\'re one of Maris\'s people, right?"',
      },
      {
        text: 'Caleb lights up at being acknowledged. "Yeah! I mean—we\'re friends. Good friends. She\'s helped me so much."',
        speakerId: 'caleb',
        emotion: 'happy',
      },
      {
        text: 'He sounds like he\'s convincing himself.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'caleb-probe',
        text: '"How did you two meet?"',
        reaction: {
          text: '"She noticed me freshman year. Said I had potential." Caleb\'s eyes go distant. "No one had ever said that before. She believed in me when no one else did."',
          emotion: 'hopeful',
          bodyLanguage: 'Classic. Found him vulnerable. Made him feel seen. Now owns him.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-caleb-reality',
        isOptimal: true,
        tactic: 'gather-intel',
      },
      {
        id: 'caleb-challenge',
        text: '"Seems like she treats you more like staff than a friend."',
        reaction: {
          text: 'Caleb\'s face flickers—hurt, then defensive. "She\'s just... intense. That\'s how she shows she trusts you. With responsibility."',
          emotion: 'sad',
          bodyLanguage: 'He knows. Somewhere deep down, he knows.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-caleb-reality',
      },
      {
        id: 'caleb-validate',
        text: '"Must be nice to have someone believe in you."',
        reaction: {
          text: '"It is." Caleb relaxes. "She\'s demanding, but that\'s because she sees what I could be. Not what I am now."',
          emotion: 'happy',
          bodyLanguage: 'He\'s rationalizing. Convincing himself the investment will pay off.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-caleb-reality',
      },
    ],
  },
  {
    id: 'party-caleb-defensive',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Caleb positions himself between you and Maris\'s line of sight.',
      },
      {
        text: '"If you\'re trying to get to Maris through me, it won\'t work." His voice is sharp. "I\'ve seen people try."',
        speakerId: 'caleb',
        emotion: 'cold',
      },
      {
        text: 'He\'s protecting his territory. His access.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'caleb-defensive-honest',
        text: '"I\'m just trying to understand how things work here."',
        reaction: {
          text: 'His shoulders drop slightly. "Oh." He looks embarrassed. "Sorry. People use me to get to him sometimes. It\'s... tiring."',
          emotion: 'sad',
          bodyLanguage: 'He\'s been used. Often. And he knows it.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-caleb-reality',
        isOptimal: true,
      },
      {
        id: 'caleb-defensive-back-off',
        text: '"Relax. I\'m just being friendly."',
        reaction: {
          text: '"Right. Friendly." He doesn\'t believe you. "Maris said I should be careful. New people always want something."',
          emotion: 'neutral',
          bodyLanguage: 'Maris\'s voice in his head. Even when Maris isn\'t around.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-caleb-reality',
      },
      {
        id: 'caleb-defensive-push',
        text: '"Sounds exhausting. Being on guard all the time."',
        reaction: {
          text: 'Something cracks in his expression. "It is." The admission seems to surprise him. "But it\'s worth it. For the access."',
          emotion: 'sad',
          bodyLanguage: 'He admitted it. Progress.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-caleb-reality',
      },
    ],
  },
  {
    id: 'party-caleb-reality',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'From across the room, Maris snaps her fingers again. Doesn\'t even look in Caleb\'s direction.',
      },
      {
        text: '"Sorry—gotta go." Caleb straightens instantly, like a soldier hearing a command. "Nice talking to you."',
        speakerId: 'caleb',
        emotion: 'neutral',
      },
      {
        text: 'He rushes off. You watch him reach Maris, who still doesn\'t acknowledge him. Just takes the fresh drink Caleb anticipated she\'d want.',
      },
      {
        text: 'That\'s what emotional exhaustion looks like. That\'s what you could become.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'reality-learn',
        text: 'Remember this. File it away.',
        reaction: {
          text: 'You watch Caleb hover, wait, serve. No thanks. No acknowledgment. Just the privilege of proximity.',
          emotion: 'neutral',
          bodyLanguage: 'This is the end state. Invisible. Useful. Disposable.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-the-test',
        isOptimal: true,
        tactic: 'pattern-recognition',
      },
      {
        id: 'reality-pity',
        text: 'Feel bad for him. That could be anyone.',
        reaction: {
          text: 'You watch Caleb with new eyes. Smart guy, probably. Capable. Reduced to fetching drinks for scraps of attention.',
          emotion: 'sad',
          bodyLanguage: 'Pity is appropriate. But don\'t let it blind you.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-the-test',
      },
      {
        id: 'reality-different',
        text: 'Think: I\'d never let that happen to me.',
        reaction: {
          text: 'You\'re sure. Everyone is, at first.',
          emotion: 'neutral',
          bodyLanguage: 'Caleb probably thought the same thing once.',
          scoreImpact: -5,
        },
        nextSceneId: 'party-the-test',
      },
    ],
  },
];
