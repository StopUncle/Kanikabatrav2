import type { Scene } from '../../types';

// PATH C: MEETING FRIENDS/FAMILY
// Healthy integration vs. enmeshment or isolation
// Teaching: Meeting people is normal. The question is how.

export const familyScenes: Scene[] = [
  {
    id: 'family-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'He wants you to meet his friends after a month? That's... normal.' Maya shrugs. 'Unless he's pressuring you or making it weird. What's the concern?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'I don't know. What if they don't like me? What if it's too much too soon? What if I'm just another girl he introduces?'",
      },
      {
        speakerId: 'inner-voice',
        text: "Fear of being seen. Fear of meaning something.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'family-1a',
        text: '"The last guy who introduced me to friends ghosted a week later."',
        nextSceneId: 'family-2-past',
        xpBonus: 10,
        feedback: 'Past pain coloring present opportunity.',
      },
      {
        id: 'family-1b',
        text: '"What if I\'m not ready? But saying that pushes him away?"',
        nextSceneId: 'family-2-ready',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Honest about your feelings. That\'s the first step.',
      },
      {
        id: 'family-1c',
        text: '"I just don\'t want to make a big deal out of it."',
        nextSceneId: 'family-2-dismiss',
        xpBonus: 5,
        feedback: 'Minimizing something that clearly matters to you.',
      },
    ],
  },
  {
    id: 'family-2-past',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'That guy was a mess. Michael isn't him.' Maya's direct. 'You can't protect yourself from future pain by never letting anyone in. That's just loneliness with extra steps.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        text: "'Go. Meet the friends. Be charming. If it's meant to work, it will.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'family-3-event',
  },
  {
    id: 'family-2-ready',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the thing. If he's healthy, he can handle you saying \"I'm nervous\" or \"I need more time.\" You don't have to perform readiness you don't feel.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'But also—sometimes the only way through is through. You might be more ready than you think.'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'family-3-event',
  },
  {
    id: 'family-2-dismiss',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'You're literally making it a big deal by pretending it's not.' Maya laughs. 'Just go. Be yourself. If his friends suck, that's information. If they're great, also information.'",
        speakerId: 'maya',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'family-3-event',
  },
  {
    id: 'family-3-event',
    backgroundId: 'bar',
    dialog: [
      {
        text: "Friday night. His friend's birthday. Michael picks you up. 'They're going to love you. But if you get overwhelmed, just squeeze my hand. We can leave whenever.'",
        speakerId: 'michael',
        emotion: 'happy',
      },
      {
        text: "He gave you an exit. Unprompted. He's thinking about your comfort, not just his excitement to show you off.",
      },
      {
        speakerId: 'inner-voice',
        text: "He thought about what you might need. That's care.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'family-3a',
        text: '"Thank you. That means a lot."',
        nextSceneId: 'family-4-open',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Acknowledging thoughtfulness. Letting him know it landed.',
      },
      {
        id: 'family-3b',
        text: '"I\'ll be fine. Don\'t worry about me."',
        nextSceneId: 'family-4-brave',
        xpBonus: 10,
        feedback: 'Self-sufficient. But he was trying to connect.',
      },
      {
        id: 'family-3c',
        text: '"Maybe this was a bad idea."',
        nextSceneId: 'family-4-bail',
        feedback: 'Last-minute anxiety. He\'s already nervous for you.',
      },
    ],
  },
  {
    id: 'family-4-open',
    backgroundId: 'bar',
    dialog: [
      {
        text: "The night goes well. His friends are warm. They ask about you—your job, your interests. Not interrogating, just... curious. Welcoming. Michael keeps checking in without hovering.",
      },
      {
        text: "Near midnight, his best friend pulls you aside. 'He talks about you a lot. In a good way. I haven't seen him like this in a while.'",
      },
    ],
    nextSceneId: 'family-good-ending',
  },
  {
    id: 'family-4-brave',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You handle the night with composure. Charming, funny, polished. Everyone likes you. But Michael seems... slightly distant by the end.",
      },
      {
        text: "Later, in the car: 'You were great in there. But... you know you can lean on me, right? You don't always have to be \"fine.\"'",
        speakerId: 'michael',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'family-neutral-ending',
  },
  {
    id: 'family-4-bail',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Hey, it's okay.' Michael's calm. 'We can skip it. Or just stay for an hour. Whatever you need.' He doesn't push. Doesn't guilt. Just holds space.",
        speakerId: 'michael',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: "He's letting you decide. No pressure. Is that... okay?",
        emotion: 'confused',
      },
    ],
    choices: [
      {
        id: 'family-4d',
        text: '"Let\'s go. One hour. I want to try."',
        nextSceneId: 'family-good-ending',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Pushing through with support. That\'s growth.',
      },
      {
        id: 'family-4e',
        text: '"I\'m sorry. I just can\'t tonight."',
        nextSceneId: 'family-neutral-ending',
        xpBonus: 5,
        feedback: 'Honest. He\'ll understand. But you\'ll have to try eventually.',
      },
    ],
  },
];
