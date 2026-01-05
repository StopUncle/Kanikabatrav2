import type { Scene } from '../../types';

export const openingScenes: Scene[] = [
  {
    id: 'opening-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You're meeting Maya for coffee. You've been dating someone new for two months. On paper, they're perfect. But something feels... off. You can't explain it.",
      },
      {
        text: "'You look tired,' Maya says, sliding into the booth. 'Spill. What's going on with this new person?'",
        speakerId: 'maya',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'opening-2',
  },
  {
    id: 'opening-2',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "You try to find the words. They're not mean. They're not aggressive. They're actually very... nice. Too nice? You can't pinpoint what's wrong, but you feel drained after every interaction.",
      },
      {
        text: "'Tell me about them. What are they like?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "How do you describe someone who seems perfect but leaves you empty?",
        emotion: 'confused',
      },
    ],
    choices: [
      {
        id: 'fork-victim',
        text: '"They\'re always going through something. Every conversation becomes about their pain."',
        nextSceneId: 'victim-1',
        xpBonus: 5,
        feedback: 'The Victim Player. Their suffering is a strategy.',
      },
      {
        id: 'fork-humble',
        text: '"They\'re so humble about how amazing their life is. Constantly."',
        nextSceneId: 'humble-1',
        xpBonus: 5,
        feedback: 'The Humble Bragger. Modesty as a weapon.',
      },
      {
        id: 'fork-savior',
        text: '"They\'re always trying to help me. Fix me. Even when I don\'t ask."',
        nextSceneId: 'savior-1',
        xpBonus: 5,
        feedback: 'The Savior. Control disguised as care.',
      },
    ],
  },
];
