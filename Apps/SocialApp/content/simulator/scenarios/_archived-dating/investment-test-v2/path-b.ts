import type { Scene } from '../../types';

// PATH B: STATUS TEST - MEET MY EX (Scene 1.7)
export const statusScenes: Scene[] = [
  {
    id: 'status-test',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "His ex's birthday party. A 'career connection.' And he needs you there—to what? Prove something? Win something? The request drips with triangulation.",
      },
      {
        speakerId: 'inner-voice',
        text: "He wants to parade you in front of his ex. What exactly is he trying to prove?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'status-trap',
        text: '"I\'ll be there. I\'ll show him you upgraded."',
        nextSceneId: 'status-trap-result',
        feedback: "You walked into the triangulation. His ex drama is now YOUR drama. You're competing for someone who should be competing for you.",
      },
      {
        id: 'status-subtle',
        text: '"Fine, I\'ll go. But you owe me."',
        nextSceneId: 'status-subtle-result',
        xpBonus: 5,
        feedback: "You gave in but expressed displeasure. He knows it cost him social capital—but he still got what he wanted.",
      },
      {
        id: 'status-close',
        text: '"I\'m not going to your ex\'s party. But I\'ll pick you up after for a late dinner."',
        nextSceneId: 'status-close-result',
        xpBonus: 10,
        feedback: "You refused the triangulation but showed you were waiting. Mixed signals.",
      },
      {
        id: 'status-optimal',
        text: '"That\'s your thing. I\'m busy that night. You can be my plus-one at my work event next week instead."',
        nextSceneId: 'status-optimal-result',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'counter_triangulation',
        feedback: "You refused his frame and flipped it. Now HE invests in YOUR social world.",
      },
    ],
  },

  // STATUS CONSEQUENCES
  {
    id: 'status-trap-result',
    backgroundId: 'bar',
    dialog: [
      {
        text: "The party was excruciating. Jake's ex kept 'accidentally' mentioning their inside jokes. Jake watched you both like a tennis match. You felt like a prop in his ego play.",
      },
      {
        text: "On the drive home, he's glowing. 'Did you see his face when we walked in together?' His ex's reaction mattered more than yours. You're a tool for making him feel wanted.",
      },
    ],
    nextSceneId: 'identity-test-setup',
  },

  {
    id: 'status-subtle-result',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You went. It was awkward. Jake kept looking at his ex. You kept wondering why you were there. 'Thanks for coming,' he said after. 'You were perfect.'",
      },
      {
        text: "Perfect for what? His ego? His competition? You were an accessory to his unfinished business. Not a partner—a prop.",
      },
    ],
    nextSceneId: 'identity-test-setup',
  },

  {
    id: 'status-close-result',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "He went alone. Texted you at midnight: 'Wish you were here.' You weren't sure if that was sweet or another manipulation. The late dinner was nice though.",
      },
      {
        text: "He mentioned his ex three times during dinner. The party you missed loomed larger than the date you were on. Interesting.",
      },
    ],
    nextSceneId: 'identity-test-setup',
  },

  {
    id: 'status-optimal-result',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "He went to his ex's party alone. Your work event next week? He showed up nervous, charming your colleagues, out of his element. For once, HE was the plus-one.",
      },
      {
        text: "Afterward: 'Your work friends are intimidating.' Good. Now he knows what your world feels like. The power dynamic shifted, even slightly.",
      },
    ],
    nextSceneId: 'identity-test-setup',
  },

  // TRANSITION TO IDENTITY TEST
  {
    id: 'identity-test-setup',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Two months in. Jake's getting comfortable. Too comfortable. Tonight, he looks at your bookshelf and sighs.",
      },
      {
        text: "'Babe, I love you, but this whole self-help phase you're in... it's kind of intense. Your friends are always talking about 'boundaries' and 'red flags.' It's exhausting. Can you maybe... tone it down? For us?'",
        speakerId: 'jake',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: "He's asking you to change who you are. For 'us.' What has HE changed?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'identity-trap',
        text: '"You\'re right. I\'ll stop hanging out with Maya. I want to be the woman you need."',
        nextSceneId: 'identity-trap-ending',
        feedback: "You just gave up your identity and support network. He now controls who you're allowed to be.",
      },
      {
        id: 'identity-subtle',
        text: '"I\'ll try to balance it better. Maybe fewer books, more us-time?"',
        nextSceneId: 'identity-subtle-ending',
        xpBonus: 5,
        feedback: "You offered to shrink yourself. Not as bad as abandoning your identity, but still a compromise in the wrong direction.",
      },
      {
        id: 'identity-close',
        text: '"I love my books and my friends. They\'re not going anywhere."',
        nextSceneId: 'identity-close-ending',
        xpBonus: 10,
        feedback: "You maintained your ground. Clear but somewhat defensive.",
      },
      {
        id: 'identity-optimal',
        text: '"I\'m not changing who I am for anyone. If you want to evolve, you can join me at my book club. Otherwise, we might be incompatible."',
        nextSceneId: 'identity-optimal-ending',
        isOptimal: true,
        xpBonus: 25,
        tactic: 'identity_protection',
        feedback: "You refused to shrink, invited him to grow, and named the alternative: incompatibility. Power move.",
      },
    ],
  },
];
