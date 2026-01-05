import type { ForkScene } from '../../../types';

/**
 * Mission 16: The Aftermath
 * Post-gala fallout - what everyone is saying
 */
export const aftermathScenes: ForkScene[] = [
  {
    id: 'aftermath-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'The Aftermath', index: 1, total: 6 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'Three days since the gala. The silence is deafening.',
      },
      {
        text: 'No calls from Kai. No messages from Maris. Nothing from Harrison Cole.',
      },
      {
        text: 'Blake paces your living room. He hasn\'t stopped since that night.',
      },
      {
        text: '"Something\'s wrong. They\'re talking about us. I can feel it."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'The waiting. The uncertainty. Classic pressure tactic.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'aftermath-blake-worry',
  },
  {
    id: 'aftermath-blake-worry',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I shouldn\'t have come to that gala. I was out of my depth."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"Those people... they looked at me like I was furniture. Expensive furniture, but still."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"And now silence? That\'s worse than rejection."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'He\'s scared. Maybe he should be.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'worry-trap',
        text: '"You\'re right to be worried. Those people are dangerous."',
        nextSceneId: 'aftermath-blake-panic',
        isOptimal: false,
        tactic: 'validation',
        reaction: {
          text: '"Dangerous?" His eyes widen. "What did you get us into?"',
          emotion: 'concerned',
          bodyLanguage: 'You confirmed his fears. Now he\'s spiraling.',
          scoreImpact: -10,
        },
      },
      {
        id: 'worry-subtle',
        text: '"Silence means they\'re deciding. That\'s not necessarily bad."',
        nextSceneId: 'aftermath-blake-uncertain',
        isOptimal: false,
        tactic: 'neutral',
        reaction: {
          text: '"Not necessarily bad. That\'s not exactly reassuring."',
          emotion: 'neutral',
          bodyLanguage: 'Neutral response. He\'s still anxious.',
          scoreImpact: 5,
        },
      },
      {
        id: 'worry-close',
        text: '"You held your own at that gala. They noticed."',
        nextSceneId: 'aftermath-blake-hopeful',
        isOptimal: false,
        tactic: 'reassurance',
        reaction: {
          text: '"Did they? I felt invisible." But he straightens slightly.',
          emotion: 'hopeful',
          bodyLanguage: 'Reassurance works. A little.',
          scoreImpact: 10,
        },
      },
      {
        id: 'worry-optimal',
        text: '"The silence is the test. They\'re watching how we handle uncertainty."',
        nextSceneId: 'aftermath-blake-insight',
        isOptimal: true,
        tactic: 'pattern-recognition',
        reaction: {
          text: 'He stops pacing. "A test? You think they\'re still... evaluating us?"',
          emotion: 'curious',
          bodyLanguage: 'You reframed the anxiety. He\'s thinking now.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'aftermath-blake-panic',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'tense',
    dialog: [
      {
        text: '"Dangerous. You said dangerous."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'He sinks onto the couch. Puts his head in his hands.',
      },
      {
        text: '"I knew it. I knew that world was bad news. And now we\'re in it."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: 'Your phone buzzes. Unknown number.',
      },
      {
        text: 'The silence just ended.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'aftermath-phone-rings',
  },
  {
    id: 'aftermath-blake-uncertain',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Deciding what, though?" Blake runs a hand through his hair.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Whether we\'re useful? Whether we\'re threats? Whether we\'re... nothing?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Your phone buzzes. Unknown number.',
      },
      {
        text: 'The answer arrives.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'aftermath-phone-rings',
  },
  {
    id: 'aftermath-blake-hopeful',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Maybe." He doesn\'t sound convinced. "I just... felt like a prop."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"But if you think it went okay..."',
        speakerId: 'blake',
        emotion: 'hopeful',
      },
      {
        text: 'Your phone buzzes. Unknown number.',
      },
      {
        text: 'The verdict arrives.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'aftermath-phone-rings',
  },
  {
    id: 'aftermath-blake-insight',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Still evaluating." Blake processes this. "So everything since the gala..."',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"...is data. They\'re watching how we behave when we think no one\'s looking."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: 'Smart. He understands now.',
      },
      {
        text: 'Your phone buzzes. Unknown number.',
      },
      {
        text: 'Phase one complete. Phase two begins.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'aftermath-phone-rings',
  },
  {
    id: 'aftermath-phone-rings',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'tense',
    dialog: [
      {
        text: 'Unknown number. You answer.',
      },
      {
        text: '"This is a courtesy call."',
      },
      {
        text: 'A voice you don\'t recognize. Male. Calm. Professional.',
      },
      {
        text: '"Mr. Cole would like to extend an invitation. Transportation details will follow."',
      },
      {
        text: 'The line goes dead before you can respond.',
      },
      {
        text: 'Harrison Cole. The Architect himself.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'summons-intro',
  },
];
