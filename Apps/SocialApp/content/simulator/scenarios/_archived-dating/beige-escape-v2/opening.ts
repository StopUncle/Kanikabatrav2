import type { Scene } from '../../types';

export const openingScenes: Scene[] = [
  {
    id: 'opening-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'You're going to leave him.' Maya says it like a fact, not a question. You called her because you needed to say it out loud to someone. The thing you've been thinking for months.",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'I don't know. He hasn't done anything wrong. It's just...' You trail off. How do you explain wanting to leave someone who's done nothing wrong?",
      },
      {
        speakerId: 'inner-voice',
        text: "The absence of wrong isn't the presence of right.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'fork-niceguy',
        text: '"He\'s perfect on paper. I just don\'t feel it."',
        nextSceneId: 'nice-1',
        xpBonus: 5,
        feedback: 'The Nice Guy trap. Good enough for someone—just not for you.',
      },
      {
        id: 'fork-rut',
        text: '"We\'re so comfortable. Maybe too comfortable."',
        nextSceneId: 'rut-1',
        xpBonus: 5,
        feedback: 'The Comfort Trap. When staying is just easier than leaving.',
      },
      {
        id: 'fork-sunk',
        text: '"We\'ve been together for years. Is it too late to leave?"',
        nextSceneId: 'sunk-1',
        xpBonus: 5,
        feedback: 'The Sunk Cost Trap. Time invested doesn\'t equal time owed.',
      },
    ],
  },
];
