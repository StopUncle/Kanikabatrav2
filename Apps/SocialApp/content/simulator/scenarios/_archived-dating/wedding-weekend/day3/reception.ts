// Day 3: The Reception
// Scenes 31-35 - Final confrontations and paths to endings

import type { Scene } from '../../../types';

export const receptionScenes: Scene[] = [
  {
    id: 'scene-31-reception',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The reception. The weekend comes down to tonight.",
      },
      {
        text: "{boyfriend} finds you, takes your hand. \"Dance with me?\" The first song is slow. Couples swaying. {ex} is watching from the bar.",
        speakerId: 'ethan',
        emotion: 'happy',
      },
      {
        
        text: "Last act.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-31-1',
        text: 'Dance with him. This is what you fought for.',
        nextSceneId: 'scene-32-dance',
        xpBonus: 10,
        feedback: 'You chose the relationship over the politics. Time will tell.',
        tactic: 'romantic_choice',
      },
      {
        id: 'choice-31-2',
        text: 'Find {groom}. Time to settle the score.',
        nextSceneId: 'scene-33-marcus-finale',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'You\'re not waiting for acceptance. You\'re demanding it.',
        tactic: 'power_claim',
      },
      {
        id: 'choice-31-3',
        text: 'Find {sister}. Consolidate the alliance.',
        nextSceneId: 'scene-34-lily-finale',
        xpBonus: 10,
        feedback: 'Smart. Allies first, then strategy.',
        tactic: 'alliance_build',
      },
      {
        id: 'choice-31-4',
        text: 'Excuse yourself. Find a quiet corner to think.',
        nextSceneId: 'scene-35-mirror',
        xpBonus: 5,
        feedback: 'You need a moment. But moments alone can go dark.',
        tactic: 'strategic_pause',
      },
    ],
  },
  // Dance path
  {
    id: 'scene-32-dance',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You dance. His arms around you. The world fades. For a moment, it's just the two of you.",
        speakerId: 'ethan',
        emotion: 'happy',
      },
      {
        text: "\"I know this weekend was hard,\" he says into your hair. \"I know I wasn't... I wasn't good enough. But I want to be. If you'll let me try.\"",
        speakerId: 'ethan',
        emotion: 'neutral',
      },
      {
        
        text: "This is the moment. What do you say?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-32-1',
        text: '"For now."',
        nextSceneId: 'ending-clean-win',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Two words. Maximum uncertainty. Maximum power. You earned this.',
        tactic: 'precision_strike',
      },
      {
        id: 'choice-32-2',
        text: '"We need to talk about {ex}."',
        nextSceneId: 'scene-32-talk',
        xpBonus: 10,
        feedback: 'The conversation that needs to happen.',
        tactic: 'direct_communication',
      },
      {
        id: 'choice-32-3',
        text: '"I don\'t know if trying is enough."',
        nextSceneId: 'ending-uncertain',
        feedback: 'Honest. Brutal. Necessary.',
        tactic: 'honest_uncertainty',
      },
    ],
  },
  {
    id: 'scene-32-talk',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{boyfriend} tenses. Then relaxes. \"You're right. We do.\" He leads you to a quiet corner. \"Ask me anything. I'll tell you the truth.\"",
        speakerId: 'ethan',
        emotion: 'neutral',
      },
      {
        text: "\"Are you still in love with her?\" The question hangs. He doesn't look away. \"No. But I'm not good at letting go of people. It's a flaw.\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'ending-honest-start',
  },
  // Marcus path
  {
    id: 'scene-33-marcus-finale',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You find {groom} at the bar. He sees you coming and raises his glass. \"Survivor.\" There's something like respect in his voice.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: "\"You've got spine. I didn't expect that.\" He signals for another drink. \"{boyfriend}'s a good guy. He needs someone who can handle...\" He gestures at the room. \"All this.\"",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        
        text: "He's being respectful. That's new.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-33-1',
        text: '"Don\'t need it."',
        nextSceneId: 'ending-grudging-respect',
        xpBonus: 10,
        feedback: 'No gratitude. No explanation. Just fact.',
        tactic: 'independence',
      },
      {
        id: 'choice-33-2',
        text: '"I\'m not here for your group. I\'m here for him."',
        nextSceneId: 'ending-clean-win',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Clear. Simple. True.',
        tactic: 'clear_priority',
      },
      {
        id: 'choice-33-3',
        text: '"Buy me a drink and call it even."',
        nextSceneId: 'ending-unexpected-alliance',
        xpBonus: 10,
        feedback: 'An olive branch. He takes it.',
        tactic: 'peace_offering',
      },
      {
        id: 'choice-33-4',
        text: '"What really happened with {ex}?"',
        nextSceneId: 'scene-33-truth',
        xpBonus: 5,
        feedback: 'One last piece of intel.',
        tactic: 'intel_request',
      },
    ],
  },
  {
    id: 'scene-33-truth',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{groom} sighs. \"She wanted forever. He wasn't ready. Classic story.\" He takes a drink. \"But here's what nobody tells you - she's the one who ended it. She saw what he was and walked away.\"",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "\"The question is whether he's different now.\" {groom} meets your eyes. \"I think he might be. Because of you.\" It's the closest thing to a blessing you're going to get.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-full-picture',
  },
  // Lily path
  {
    id: 'scene-34-lily-finale',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{sister} finds you on the dance floor. \"You survived.\" She's grinning. \"Was there doubt?\" \"So much doubt. You have no idea.\"",
        speakerId: 'lily',
        emotion: 'happy',
      },
      {
        text: "\"Look, my brother is an idiot. His friends are worse. But you... you're not what I expected. I thought you'd be another doormat. You're not.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        
        text: "Useful.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-34-1',
        text: '"I had a good ally."',
        nextSceneId: 'ending-inside-woman',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Acknowledging the alliance.',
        tactic: 'alliance_acknowledgment',
      },
      {
        id: 'choice-34-2',
        text: '"That was close."',
        nextSceneId: 'ending-stronger',
        xpBonus: 10,
        feedback: 'Honest. She respects it.',
        tactic: 'vulnerability',
      },
      {
        id: 'choice-34-3',
        text: '"Now I need help with your mother."',
        nextSceneId: 'ending-campaign-continues',
        xpBonus: 5,
        feedback: 'The next battle. She laughs.',
        tactic: 'forward_thinking',
      },
    ],
  },
  // Mirror moment (low self-respect path)
  {
    id: 'scene-35-mirror',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The bathroom. Alone. You stare at yourself in the mirror. You made it through. But at what cost?",
      },
      {
        text: "The toast. The slideshow. The speech. Each one hurt. And you took them. All of them.",
      },
      {
        
        text: "This doesn't feel like winning.",
        emotion: 'sad',
      },
    ],
    choices: [
      {
        id: 'choice-35-1',
        text: '"This isn\'t worth it. I\'m done."',
        nextSceneId: 'ending-walk-away',
        feedback: 'Sometimes leaving is winning.',
        tactic: 'self_respect',
      },
      {
        id: 'choice-35-2',
        text: '"I can rebuild."',
        nextSceneId: 'ending-long-road',
        xpBonus: 5,
        feedback: 'It\'s not over yet.',
        tactic: 'resilience',
      },
      {
        id: 'choice-35-3',
        text: '"He needs to see what he almost lost."',
        nextSceneId: 'ending-reset',
        xpBonus: 10,
        feedback: 'Time for a reckoning.',
        tactic: 'reset_request',
      },
      {
        id: 'choice-35-4',
        text: 'Cry. Let it out.',
        nextSceneId: 'scene-35-lily-finds',
        feedback: 'Sometimes you need to break to rebuild.',
        tactic: 'release',
      },
    ],
  },
  {
    id: 'scene-35-lily-finds',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The door opens. {sister}. She takes one look at you and closes the door behind her.",
        speakerId: 'lily',
        emotion: 'concerned',
      },
      {
        text: "\"Hey. Hey.\" She pulls you into a hug. \"You made it. You hear me? You made it.\" She holds you while you cry. When you're done, she hands you tissues. \"Ready to go back out there and show them what you're made of?\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-survivor',
  },
];
