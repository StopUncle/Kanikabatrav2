import type { Scene } from '../../types';

// PATH B: THE ULTIMATUM
// Demanding what you deserve without begging
// Teaching: The difference between an ultimatum and a request is willingness to walk

export const ultimatumScenes: Scene[] = [
  {
    id: 'ultimatum-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Forgot your anniversary. Again.' Cate's expression is unreadable. 'What did he do instead?' You tell her. Watched the game. Came home late. Said 'Oh shit, was that today?' like it was a dentist appointment.",
        speakerId: 'cate',
        emotion: 'cold',
      },
      {
        text: "'And what did you do?' She already knows. You cried. He apologized. You forgave. Same dance every time.",
      },
      {
        speakerId: 'inner-voice',
        text: "He knows forgiveness is guaranteed. So why would he change?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'ultimatum-1a',
        text: '"I don\'t want to be the nagging girlfriend."',
        nextSceneId: 'ultimatum-2-fear',
        feedback: 'So you\'d rather be the doormat girlfriend?',
      },
      {
        id: 'ultimatum-1b',
        text: '"I\'m tired of teaching a grown man how to treat me."',
        nextSceneId: 'ultimatum-2-clarity',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Exactly. You\'re not his mother. He knows how to treat you. He\'s choosing not to.',
      },
    ],
  },
  {
    id: 'ultimatum-2-fear',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Nagging girlfriend.' Cate laughs. 'That's what men call women who have standards they don't want to meet. Demanding basic respect isn't nagging. It's self-preservation.'",
        speakerId: 'cate',
        emotion: 'serious',
      },
      {
        text: "'He forgot your anniversary because there's no consequence. You'll be upset, then you'll forgive. He's trained you. Or you've trained him. Same result.'",
        speakerId: 'cate',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'ultimatum-2-clarity',
  },
  {
    id: 'ultimatum-2-clarity',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the thing about ultimatums.' Cate signals the waiter. 'They only work if you mean them. An ultimatum you won't enforce is just a really dramatic request.'",
        speakerId: 'cate',
        emotion: 'knowing',
      },
      {
        text: "'Are you ready to lose him if he doesn't change?' She's watching you closely. This is the test.",
      },
      {
        speakerId: 'inner-voice',
        text: "If you can't walk away, you can't negotiate. That's the truth.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'ultimatum-2a',
        text: '"Yes. I\'d rather be alone than disrespected."',
        nextSceneId: 'ultimatum-3-frame',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'That\'s the power position. Willing to lose to get what you deserve.',
      },
      {
        id: 'ultimatum-2b',
        text: '"I don\'t know. I love him."',
        nextSceneId: 'ultimatum-3-weak',
        feedback: 'Love without self-respect is just pain with company.',
      },
    ],
  },
  {
    id: 'ultimatum-3-weak',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'You can love him and still leave him.' Cate's voice softens. 'Love doesn't mean tolerance. Love doesn't mean erasure. The woman who loves herself more than she fears loneliness—that's the woman who gets treated right.'",
        speakerId: 'cate',
        emotion: 'concerned',
      },
      {
        text: "'He's not going to change because you love him. He's going to change because he's afraid to lose you. And right now? He's not afraid.'",
        speakerId: 'cate',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ultimatum-3-frame',
  },
  {
    id: 'ultimatum-3-frame',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'The frame matters.' Cate pulls out her phone, types something. 'An ultimatum delivered as begging: Please change or I'll leave. An ultimatum delivered as power: This is what I need. Meet it or I'm gone.'",
        speakerId: 'cate',
        emotion: 'knowing',
      },
      {
        speakerId: 'inner-voice',
        text: "Same words, different energy. One asks. One states.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'ultimatum-3a',
        text: '"So I don\'t explain. I just state."',
        nextSceneId: 'ultimatum-4-deliver',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Exactly. No justification. No pleading. Just clarity.',
      },
      {
        id: 'ultimatum-3b',
        text: '"But shouldn\'t I tell him how hurt I am?"',
        nextSceneId: 'ultimatum-4-emotional',
        feedback: 'He knows you\'re hurt. He saw it. He\'s counting on forgiveness.',
      },
    ],
  },
  {
    id: 'ultimatum-4-emotional',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'He KNOWS how hurt you are. He saw you cry every time he forgot. Every time he canceled. Every time he chose something else.' Cate's eyes are fierce.",
        speakerId: 'cate',
        emotion: 'cold',
      },
      {
        text: "'The question isn't whether he knows. The question is whether he cares more about your feelings or his convenience. And you're about to find out.'",
        speakerId: 'cate',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ultimatum-4-deliver',
  },
  {
    id: 'ultimatum-4-deliver',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That night. Marcus is watching TV when you sit down across from him. 'We need to talk.' He mutes it, annoyed. 'About the anniversary thing? I said I was sorry.'",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "Here it is. The moment. No tears. No pleading. Just truth.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'ultimatum-4a',
        text: '"This isn\'t about sorry. This is about whether you can meet my standard. If not, I need to know now."',
        nextSceneId: 'ultimatum-5-response',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Perfect. No accusation. No emotion. Just the line.',
      },
      {
        id: 'ultimatum-4b',
        text: '"You always do this! You never prioritize me!"',
        nextSceneId: 'ultimatum-5-fight',
        feedback: 'And now it\'s a fight, not an ultimatum. He can dismiss fights.',
      },
      {
        id: 'ultimatum-4c',
        text: 'Start explaining all the times he hurt you.',
        nextSceneId: 'ultimatum-5-defend',
        feedback: 'Building a case means he gets to argue. You\'re not a prosecutor. You\'re the judge.',
      },
    ],
  },
  {
    id: 'ultimatum-5-fight',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Here we go.' He rolls his eyes. 'The victim mode. I forgot ONE thing and suddenly I'm the worst boyfriend ever.' He's fighting now. Defensive. This became an argument, not a negotiation.",
        speakerId: 'marcus',
        emotion: 'angry',
      },
      {
        text: "You're shouting. He's shouting. Later, you'll both be exhausted and nothing will have changed. Classic cycle.",
      },
    ],
    nextSceneId: 'ultimatum-neutral-ending',
  },
  {
    id: 'ultimatum-5-defend',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Okay but remember when—' You list the times. The canceled plans. The forgotten birthdays. Each one he has an excuse for. Traffic. Work. 'You never mentioned it bothered you.'",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "By building a case, you invited him to be a defense attorney. Now you're relitigating the past instead of establishing the future.",
      },
    ],
    nextSceneId: 'ultimatum-neutral-ending',
  },
  {
    id: 'ultimatum-5-response',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "He's quiet. The TV stays muted. 'What exactly are you saying?' 'I'm saying I need consistency. Planning. Being a priority—not when it's convenient, but always. Can you do that, or not?'",
      },
      {
        text: "He's not used to this version of you. The one who doesn't cry. Doesn't beg. Just... waits.",
        speakerId: 'marcus',
        emotion: 'confused',
      },
      {
        speakerId: 'inner-voice',
        text: "His next words tell you everything. Listen carefully.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'ultimatum-5a',
        text: 'Stay silent. Let him fill the space.',
        nextSceneId: 'ultimatum-6-silence',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'The power of silence. He has to commit, not just soothe.',
      },
      {
        id: 'ultimatum-5b',
        text: '"I love you, but I can\'t keep doing this."',
        nextSceneId: 'ultimatum-6-soften',
        feedback: 'You added the soft landing. He\'ll take it.',
      },
    ],
  },
  {
    id: 'ultimatum-6-soften',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'I love you too. We'll figure it out. I promise.' He reaches for your hand. Warm. Familiar. You want to believe him. But you've believed him before.",
        speakerId: 'marcus',
        emotion: 'concerned',
      },
      {
        text: "The moment passes. No concrete plan. No specific commitment. Just... reassurance. The same reassurance that never leads anywhere.",
      },
    ],
    nextSceneId: 'ultimatum-neutral-ending',
  },
  {
    id: 'ultimatum-6-silence',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The silence stretches. Finally: 'What do you need? Specifically.' He's not dismissing. He's asking. A small shift, but significant.",
        speakerId: 'marcus',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "He's engaging. Not defending. That's new.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'ultimatum-6a',
        text: '"Dates on the calendar. Non-negotiable. Miss one without real reason, I\'m gone."',
        nextSceneId: 'ultimatum-good-ending',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Specific. Measurable. Enforceable. This is how you set terms.',
      },
      {
        id: 'ultimatum-6b',
        text: '"I just need you to try harder."',
        nextSceneId: 'ultimatum-neutral-ending',
        feedback: 'Vague demands get vague compliance. Be specific.',
      },
    ],
  },
];
