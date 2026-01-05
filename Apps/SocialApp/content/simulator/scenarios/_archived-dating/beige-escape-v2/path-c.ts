import type { Scene } from '../../types';

// PATH C: THE SUNK COST
// Years invested - weighing the exit against the investment
// Teaching: Time spent doesn't equal time owed

export const sunkCostScenes: Scene[] = [
  {
    id: 'sunk-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Years.' Maya repeats it. 'How many?' 'Five.' You say it like a prison sentence. Because it kind of is. Five years. A whole chapter of your twenties. Friends. Moves. Jobs. All intertwined with David.",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'And now you're wondering if leaving means all that time was wasted?' Maya cuts right to it.",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        speakerId: 'inner-voice',
        text: "The sunk cost fallacy. Time invested feels like time owed.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'sunk-1a',
        text: '"Five years is a lot to throw away. What if I\'m making a mistake?"',
        nextSceneId: 'sunk-2-fear',
        feedback: 'The fear of waste. But are you really throwing it away?',
      },
      {
        id: 'sunk-1b',
        text: '"Everyone says it gets easier after this long. When does it get easier?"',
        nextSceneId: 'sunk-2-myth',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'The long-term myth. Time doesn\'t create compatibility.',
      },
    ],
  },
  {
    id: 'sunk-2-fear',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Throw away.' Maya shakes her head. 'You learned things. Grew. Had experiences. None of that disappears because you leave. The relationship wasn't worthless—it was a chapter. Chapters end.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        text: "'The only waste is staying in something dead because you've already invested. That's not loyalty. That's hostage mentality.'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'sunk-2-myth',
  },
  {
    id: 'sunk-2-myth',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Easier.' Maya laughs. 'Who told you that? The same people who say marriage fixes problems? Time doesn't create love. It just makes habits more comfortable.'",
        speakerId: 'maya',
        emotion: 'smirking',
      },
      {
        speakerId: 'inner-voice',
        text: "Year five feels a lot like year three. Just more intertwined.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'sunk-2a',
        text: '"But what about everything we\'ve built? The apartment? Our friends?"',
        nextSceneId: 'sunk-3-logistics',
        feedback: 'Logistics aren\'t love. They\'re just logistics.',
      },
      {
        id: 'sunk-2b',
        text: '"I keep thinking: if not him, then who? At my age?"',
        nextSceneId: 'sunk-3-fear',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'The scarcity mindset. Fear of alone dressed as practicality.',
      },
    ],
  },
  {
    id: 'sunk-3-logistics',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'The apartment. The friends.' Maya counts on her fingers. 'Those are logistics. You can find another apartment. Real friends don't disappear. Are you staying for love or for convenience?'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        text: "'Because if you're staying to avoid the hassle of untangling your life, that's not a relationship. That's a shared lease with benefits.'",
        speakerId: 'maya',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'sunk-3-fear',
  },
  {
    id: 'sunk-3-fear',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'At your age.' Maya's voice softens. 'You're in your late twenties. You're not dying. The fear of being alone is real—but it's not a reason to stay with the wrong person.'",
        speakerId: 'maya',
        emotion: 'concerned',
      },
      {
        text: "'Would you rather be unhappy with someone, or hopeful alone? Because those are your real options.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "Alone is scary. But miserable together is worse.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'sunk-3a',
        text: '"I need to actually picture my life without him."',
        nextSceneId: 'sunk-4-imagine',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Visualization. What does freedom actually look like?',
      },
      {
        id: 'sunk-3b',
        text: '"Maybe I just need to appreciate what I have."',
        nextSceneId: 'sunk-4-settle',
        feedback: 'Gratitude for what you have. Or settling for what you\'re scared to lose?',
      },
    ],
  },
  {
    id: 'sunk-4-settle',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Appreciate what you have.' Maya's quiet for a moment. 'Or convince yourself you should be grateful so you don't have to make a scary decision?'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        text: "'I'm not telling you to leave. I'm telling you to be honest about why you're staying. If it's love—great. If it's fear—that's not fair to either of you.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'sunk-4-imagine',
  },
  {
    id: 'sunk-4-imagine',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That night. David's asleep. You're awake. Imagining. Your own apartment. Smaller, but yours. Quiet mornings. No one to check in with. The freedom is terrifying. And exciting.",
      },
      {
        text: "Five years. You've grown in that time. But not together. You've grown apart and just... kept living in the same space.",
      },
      {
        speakerId: 'inner-voice',
        text: "The five years are gone either way. The next five don't have to be.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'sunk-4a',
        text: 'Wake him. Start the conversation tonight.',
        nextSceneId: 'sunk-5-now',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'The conversation won\'t get easier. Might as well start.',
      },
      {
        id: 'sunk-4b',
        text: 'Wait for "the right moment."',
        nextSceneId: 'sunk-5-wait',
        feedback: 'The right moment doesn\'t exist. It\'s a delay tactic.',
      },
    ],
  },
  {
    id: 'sunk-5-wait',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You wait. His birthday passes. Then the holidays. Then your anniversary. Each milestone becomes a reason not to ruin it. A year passes. You're still waiting.",
      },
      {
        text: "Six years now. The right moment never comes because there is no right moment. Just excuses stacking up.",
      },
    ],
    nextSceneId: 'sunk-bad-ending',
  },
  {
    id: 'sunk-5-now',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'David.' He stirs. Blinks. 'What's wrong?' 'Nothing's wrong. But something isn't right either. And I think we need to talk about it.'",
      },
      {
        text: "He sits up. Awake now. 'Is this... is this what I think it is?' He's not surprised. Part of you expected more shock.",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "He knew. You both knew. This is just the naming of it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'sunk-5a',
        text: '"We\'ve been holding on to something that ended a while ago."',
        nextSceneId: 'sunk-6-truth',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Honest framing. Past tense. Already done.',
      },
      {
        id: 'sunk-5b',
        text: '"I think I need to be alone for a while."',
        nextSceneId: 'sunk-6-alone',
        feedback: 'True. But vague. Is this a break or a breakup?',
      },
    ],
  },
  {
    id: 'sunk-6-alone',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Alone for a while?' He's hopeful. 'Like a break? We can do that.' A break. With expectation of return. That's not what you meant.",
        speakerId: 'david',
        emotion: 'hopeful',
      },
      {
        text: "You take a breath. Be clear. Don't leave room for false hope.",
      },
    ],
    nextSceneId: 'sunk-6-truth',
  },
  {
    id: 'sunk-6-truth',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Five years is a long time. It meant something. But I think we've been done for a while and just... kept going because stopping felt too hard.'",
      },
      {
        text: "David's quiet. Then: 'I knew. I think I knew for a while. I just hoped you didn't.' He looks relieved and devastated at once. The truth does that.",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "The sunk cost was already sunk. This is just stopping the bleed.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'sunk-6a',
        text: '"Thank you for five years. They mattered. But it\'s time."',
        nextSceneId: 'sunk-good-ending',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Honoring the past while choosing the future.',
      },
      {
        id: 'sunk-6b',
        text: '"Maybe we can stay friends?"',
        nextSceneId: 'sunk-neutral-ending',
        feedback: 'Maybe. But not right away.',
      },
    ],
  },
];
