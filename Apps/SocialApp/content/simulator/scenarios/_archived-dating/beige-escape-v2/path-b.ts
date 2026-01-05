import type { Scene } from '../../types';

// PATH B: THE COMFORTABLE RUT
// Too settled to leave - when comfort becomes a cage
// Teaching: Comfort isn't love. Easy isn't right.

export const rutScenes: Scene[] = [
  {
    id: 'rut-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Too comfortable.' Maya's eyebrows rise. 'Explain.' You try. The routine. Wake up. Work. Dinner. Netflix. Sleep. Repeat. Nothing bad. Nothing exciting. Just... existence.",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'When's the last time you felt excited about seeing him? Not relieved. Not comfortable. Actually excited.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "You can't remember. That's the answer.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'rut-1a',
        text: '"Excitement fades in every relationship. That\'s normal, right?"',
        nextSceneId: 'rut-2-justify',
        feedback: 'Normal doesn\'t mean acceptable. Some things should be fought for.',
      },
      {
        id: 'rut-1b',
        text: '"I don\'t know. Maybe I\'m just bored with my whole life."',
        nextSceneId: 'rut-2-deflect',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Honest uncertainty. That\'s a starting point.',
      },
    ],
  },
  {
    id: 'rut-2-justify',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Excitement fades. Sure. But does it get replaced with something? Deep connection? Partnership? Growth? Or just... inertia?'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        text: "'There's a difference between comfortable and dead. Which one are you?'",
        speakerId: 'maya',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'rut-2-deflect',
  },
  {
    id: 'rut-2-deflect',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Let me ask you this.' Maya leans forward. 'If he broke up with you tomorrow—how would you feel? Devastated? Or... relieved?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "The truth lives in that answer. You know it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'rut-2a',
        text: '"Honestly? I might be relieved. And that terrifies me."',
        nextSceneId: 'rut-3-truth',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'The truth. Relief means you already want out.',
      },
      {
        id: 'rut-2b',
        text: '"I\'d be sad. He\'s my whole life."',
        nextSceneId: 'rut-3-enmesh',
        feedback: 'Is he your life? Or just your routine?',
      },
    ],
  },
  {
    id: 'rut-3-enmesh',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'He's your whole life.' Maya repeats it slowly. 'Is he? Or is he just the structure you've built everything around? There's a difference between love and logistics.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        text: "'Would you miss HIM? Or would you miss the apartment, the shared Netflix, the not having to start over?'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'rut-3-truth',
  },
  {
    id: 'rut-3-truth',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That weekend. David suggests a hike. Something different. You say yes because saying no requires explanation. On the trail, he's talking about work. You're thinking about the conversation with Maya.",
      },
      {
        text: "'You seem far away,' he says. And he's right. You've been far away for months. Maybe years.",
        speakerId: 'david',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: "He notices. He always notices. He just doesn't push.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'rut-3a',
        text: '"I\'ve been thinking about us. Whether we\'re still... us."',
        nextSceneId: 'rut-4-open',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Opening the door. The conversation has to start somewhere.',
      },
      {
        id: 'rut-3b',
        text: '"Just work stuff. I\'m fine."',
        nextSceneId: 'rut-4-close',
        feedback: 'Another dodge. Another month of pretending.',
      },
    ],
  },
  {
    id: 'rut-4-close',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "He accepts the excuse. You finish the hike. Go home. Fall back into the routine. Netflix. Dinner. Bed. The conversation doesn't happen. Again.",
      },
      {
        text: "Months pass. The rut deepens. You're not unhappy. You're just not anything.",
      },
    ],
    nextSceneId: 'rut-bad-ending',
  },
  {
    id: 'rut-4-open',
    backgroundId: 'park',
    dialog: [
      {
        text: "David stops walking. Turns to face you. 'I've been feeling it too. The distance. I just... didn't want to be the one to say it.'",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        text: "'We're roommates who kiss sometimes. We're not... we're not what we used to be.'",
        speakerId: 'david',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "He knows. He's been waiting for you to say it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'rut-4a',
        text: '"So what do we do? Try harder? Or admit it\'s over?"',
        nextSceneId: 'rut-5-question',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'The real question. On the table. Finally.',
      },
      {
        id: 'rut-4b',
        text: '"Maybe we just need a vacation. Something to shake things up."',
        nextSceneId: 'rut-5-bandaid',
        feedback: 'A vacation doesn\'t fix a broken foundation.',
      },
    ],
  },
  {
    id: 'rut-5-bandaid',
    backgroundId: 'park',
    dialog: [
      {
        text: "'A vacation.' David's smile is sad. 'We went to Hawaii last year. Remember? We spent half of it on our phones. Different rooms.'",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        text: "'A new location doesn't create a new relationship. We'd just be bored somewhere prettier.'",
        speakerId: 'david',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'rut-5-question',
  },
  {
    id: 'rut-5-question',
    backgroundId: 'park',
    dialog: [
      {
        text: "You sit on a bench. Trail empty. Just you two and a conversation that's been waiting for years.",
      },
      {
        text: "'I don't want to try harder at something that's not working,' he says quietly. 'And I don't think you do either. Do you?'",
        speakerId: 'david',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "He's asking for permission. To let go. Are you ready?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'rut-5a',
        text: '"No. I don\'t. I think we\'ve been done for a while."',
        nextSceneId: 'rut-good-ending',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Mutual acknowledgment. The cleanest ending.',
      },
      {
        id: 'rut-5b',
        text: '"Maybe we should try therapy first. Give it a real shot."',
        nextSceneId: 'rut-neutral-ending',
        feedback: 'Honorable attempt. But you both know the answer.',
      },
    ],
  },
];
