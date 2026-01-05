import type { Scene } from '../../types';

// PATH A: THE NICE GUY
// He's perfect on paper but wrong for you
// Teaching: Good enough for someone isn't good enough for you

export const niceGuyScenes: Scene[] = [
  {
    id: 'nice-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Perfect on paper.' Maya repeats it. 'That's what people say about houses they don't want to live in.' She's right. David checks every box. Kind. Stable. Responsible. Remembers birthdays. Texts back.",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        text: "'But you don't light up when he walks in,' Maya says. 'You don't miss him when he's gone. You're grateful—not excited.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "Gratitude is not love. Compatibility is not connection.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'nice-1a',
        text: '"Maybe I\'m being unrealistic. Not everyone gets butterflies."',
        nextSceneId: 'nice-2-doubt',
        feedback: 'Are you settling, or adjusting expectations? Important to know.',
      },
      {
        id: 'nice-1b',
        text: '"I feel guilty. He\'s a good person. Why isn\'t that enough?"',
        nextSceneId: 'nice-2-guilt',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Guilt is honest. It means you know you\'re not all in.',
      },
    ],
  },
  {
    id: 'nice-2-doubt',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Not everyone gets butterflies?' Maya laughs. 'Babe. That's what people say when they're settling. You're not asking for butterflies. You're asking for a pulse when you're with him.'",
        speakerId: 'maya',
        emotion: 'smirking',
      },
      {
        text: "'I've seen you excited about things. About people. You're not excited about him. You're just... not upset.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'nice-2-guilt',
  },
  {
    id: 'nice-2-guilt',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the thing about guilt.' Maya leans back. 'You feel guilty because he's doing everything right and you're still not happy. That's not your failure. That's compatibility.'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        speakerId: 'inner-voice',
        text: "He's right for someone. Just not for you.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'nice-2a',
        text: '"But breaking his heart feels worse than being unhappy."',
        nextSceneId: 'nice-3-sacrifice',
        feedback: 'So you\'ll stay unhappy forever to protect his feelings?',
      },
      {
        id: 'nice-2b',
        text: '"I\'m not doing him any favors by staying, am I?"',
        nextSceneId: 'nice-3-clarity',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Exactly. He deserves someone who wants him. Not just tolerates him.',
      },
    ],
  },
  {
    id: 'nice-3-sacrifice',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'So you'll be miserable for the next forty years to protect him from two months of pain?' Maya's blunt. 'That's not love. That's martyrdom with a nice face.'",
        speakerId: 'maya',
        emotion: 'cold',
      },
      {
        text: "'And honestly? It's insulting to him. You're treating him like he can't survive a breakup. Like your 'yes' is the only thing between him and destruction. Give him some credit.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'nice-3-clarity',
  },
  {
    id: 'nice-3-clarity',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That night. David is on the couch, scrolling his phone. Comfortable. Easy. Nothing wrong with this picture. Except everything feels gray.",
      },
      {
        text: "'Want to order dinner?' he asks without looking up. 'Sure.' 'Thai?' 'Sure.' The conversation of people who've run out of things to say.",
        speakerId: 'david',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "This is the rest of your life if you stay. Nice. Safe. Beige.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'nice-3a',
        text: '"Actually—we need to talk."',
        nextSceneId: 'nice-4-truth',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Here it is. The moment of honesty.',
      },
      {
        id: 'nice-3b',
        text: 'Say nothing. Order Thai. Keep coasting.',
        nextSceneId: 'nice-4-coast',
        feedback: 'Another night. Another year. Another decade of "sure."',
      },
    ],
  },
  {
    id: 'nice-4-coast',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You order Thai. You watch TV. You go to bed. The pattern continues. Weeks turn into months. The conversation never happens. You're still here. Still gray.",
      },
      {
        text: "Maya stops asking. She knows.",
      },
    ],
    nextSceneId: 'nice-bad-ending',
  },
  {
    id: 'nice-4-truth',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "David looks up. Sets his phone down. Something in your voice. 'What's up?' You take a breath. This is going to hurt him. But staying hurts you both.",
      },
      {
        text: "'I don't think I'm happy. And I don't think that's fair to either of us.'",
        speakerId: 'david',
        emotion: 'confused',
      },
      {
        speakerId: 'inner-voice',
        text: "Truth is the beginning. Not the end.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'nice-4a',
        text: '"You haven\'t done anything wrong. That\'s what makes this so hard."',
        nextSceneId: 'nice-5-honest',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Honest and kind. The hardest combination.',
      },
      {
        id: 'nice-4b',
        text: 'Start listing things that bother you to justify leaving.',
        nextSceneId: 'nice-5-blame',
        feedback: 'Manufacturing reasons to feel less guilty. It won\'t work.',
      },
    ],
  },
  {
    id: 'nice-5-blame',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You list things. Small things. The way he chews. The shows he watches. It sounds petty because it is petty. You're not leaving because of these things. You're leaving because you don't want to stay.",
      },
      {
        text: "'So I'm just... annoying?' He looks hurt. 'That's it?' You made it about his flaws. Now he has something to defend. The conversation spirals.",
        speakerId: 'david',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'nice-neutral-ending',
  },
  {
    id: 'nice-5-honest',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'You're a good person. This is a good relationship. And somehow that's still not enough—for me, specifically. That's not your fault.'",
      },
      {
        text: "David's quiet for a long time. 'You're saying it's not me. But it is me. Just... not in the way I can fix.' He gets it. That makes it harder. And easier.",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "He understands. That's the kindness of clarity.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'nice-5a',
        text: '"I hope we can both find what we\'re looking for."',
        nextSceneId: 'nice-good-ending',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Grace in goodbye. This is how adults end things.',
      },
      {
        id: 'nice-5b',
        text: '"Maybe we can still be friends?"',
        nextSceneId: 'nice-neutral-ending',
        feedback: 'Noble sentiment. Rarely realistic.',
      },
    ],
  },
];
