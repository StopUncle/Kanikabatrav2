import type { Scene } from '../../types';

// ENDINGS FOR EMPRESS-MOVE SCENARIO
// Real consequences for each path

// PATH A: WALK AWAY ENDINGS
export const walkEndings: Scene[] = [
  {
    id: 'walk-good-ending',
    backgroundId: 'park',
    dialog: [
      {
        text: "You moved out that night. He called. Texted. Showed up with flowers and a ring three days later. 'I should have done this years ago. Please.'",
      },
      {
        text: "'You're right. You should have.' You didn't go back. Not because you didn't love him—but because you loved yourself more.",
      },
      {
        text: "Six months later. You're thriving. Dating again when you feel like it. No desperation. The walk away wasn't the end. It was the beginning of choosing yourself.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Sovereign Exit',
    endingSummary: "You walked away from four years because you knew your worth. The panicked proposal proved it was never about him not being ready—it was about him not being scared to lose you. Now you know: you're the one who decides when you're done waiting.",
  },
  {
    id: 'walk-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Things are better. For now. He's more attentive. Makes more effort. But you catch yourself wondering: is this permanent? Or is he just waiting for you to relax?",
      },
      {
        text: "You didn't walk away. Not really. You threatened to. And he soothed you. The pattern held. Maybe it's enough. Maybe it isn't.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Holding Pattern',
    endingSummary: "You almost walked away. Almost found your power. But emotions or hesitation pulled you back. He knows now that your threats pass. The question: will you find the strength to really leave? Or keep accepting almost-enough?",
    endingLearnReference: 'walk-4a',
    endingLearnPrompt: 'What if you had delivered the exit with composure and preparation?',
  },
  {
    id: 'walk-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Year five. Still not engaged. 'I just need a little more time.' You've heard this song before. Different verse, same melody.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "You asked him why you weren't enough. He learned you'd wait forever. So he keeps waiting too. Your twenties are behind you now. The throne sits empty. The crown gathers dust.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Forever Girlfriend',
    endingSummary: "You begged for what should be freely given. He saw you'd stay regardless of his answer. Why propose to someone who's already yours? Your love became a cage you built yourself. Year after year, waiting for a moment that may never come.",
    endingLearnReference: 'walk-3a',
    endingLearnPrompt: 'What if you had stated your worth instead of asking for his validation?',
  },
  {
    id: 'walk-trapped-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "He proposes right there. Panicked. Desperate. You say yes because you wanted this for so long. But something feels wrong.",
      },
      {
        text: "The wedding is beautiful. But you know the truth: he proposed because you were leaving, not because he chose you. Every time you fight, you'll wonder: would he have stayed if you hadn't threatened to go?",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Desperate Win',
    endingSummary: "You got the ring. But at what cost? A proposal born from fear of loss, not joy of commitment. You'll spend your marriage wondering if he actually wanted you—or just didn't want to start over. The doubt never leaves.",
    endingLearnReference: 'walk-5a',
    endingLearnPrompt: 'What if you had recognized that a panicked proposal isn\'t love?',
  },
];

// PATH B: ULTIMATUM ENDINGS
export const ultimatumEndings: Scene[] = [
  {
    id: 'ultimatum-good-ending',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Three months later. The calendar is real. Date nights are sacred. When something comes up, he tells you first—not after. The ultimatum worked because you meant it.",
      },
      {
        text: "'I didn't realize how checked out I'd gotten,' he admits over dinner. 'You scared me straight. Thank you for not just... leaving.'",
        speakerId: 'marcus',
        emotion: 'serious',
      },
      {
        text: "You didn't beg. You stated terms. He met them. This is what partnership looks like: clear expectations, enforced with love.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Reset',
    endingSummary: "You delivered an ultimatum the right way: specific, enforceable, delivered from power not pain. He rose to meet it because he believed you'd leave if he didn't. The relationship is better now. Not because he changed overnight—but because he finally understood the stakes.",
  },
  {
    id: 'ultimatum-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Things got a little better. He tries harder sometimes. Forgets sometimes. The cycle continues, just... smaller. Less dramatic. But the pattern is still there.",
      },
      {
        text: "You didn't deliver the ultimatum cleanly. It became a fight, or a plea, or something vague. He learned that your limits are flexible. And flexible limits aren't limits at all.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Almost',
    endingSummary: "You tried to set boundaries but didn't hold them firmly. The ultimatum became negotiable. He improved just enough to calm you down, not enough to actually change. Next time, be specific. Be immovable. Mean it.",
    endingLearnReference: 'ultimatum-4a',
    endingLearnPrompt: 'What if you had stated terms without emotion or explanation?',
  },
  {
    id: 'ultimatum-bad-ending',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "The fight ended in exhaustion. You both apologized. Nothing changed. Three months later, same anniversary. Same forgotten date. Same tears.",
      },
      {
        text: "'You said you'd leave if I didn't change.' He shrugs. 'But you're still here.' He called your bluff. And now he knows: your ultimatums are just noise.",
        speakerId: 'marcus',
        emotion: 'cold',
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Empty Threat',
    endingSummary: "Your ultimatum meant nothing because you weren't willing to enforce it. He saw the gap between your words and actions. Now every boundary you set is a question, not a statement. You taught him that your threats are just drama. He'll never take you seriously again.",
    endingLearnReference: 'ultimatum-2a',
    endingLearnPrompt: 'What if you had truly been willing to lose him to get what you deserved?',
  },
];

// PATH C: UPGRADE ENDINGS
export const upgradeEndings: Scene[] = [
  {
    id: 'upgrade-good-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Beside you.' He's quiet for a moment. 'I want that. I just... I'm used to being the one who provides, you know? This is new for me.'",
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: "'We can figure it out together. But I won't shrink to fit your comfort zone.' He nods slowly. 'I don't want you to.'",
      },
      {
        text: "The adjustment takes work. But he rises to it. A year later, he's started his own project—inspired, he says, by watching you go after what you want. Two crowns. One kingdom.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Equal Partnership',
    endingSummary: "You refused to dim your light, but you also gave him room to grow. He confronted his insecurity instead of making it your problem. Some men crumble when their partner succeeds. He rose. Together, you're more than the sum of your parts.",
  },
  {
    id: 'upgrade-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The tension around your success becomes a permanent undercurrent. He's supportive in words, cold in energy. He's not sabotaging you—but he's not celebrating you either.",
      },
      {
        text: "You succeed anyway. But every win comes with a silent cost. His resentment grows alongside your achievements. This might work forever. Or it might not. The ceiling is lower than it should be.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Unspoken Ceiling',
    endingSummary: "He couldn't handle your success gracefully. You succeeded anyway—but with a partner who dims your light instead of reflecting it. The relationship survives. But it never thrives. Some people can't celebrate what they envy.",
    endingLearnReference: 'upgrade-5a',
    endingLearnPrompt: 'What if you had reclaimed your space without abandoning the partnership?',
  },
  {
    id: 'upgrade-bad-ending',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You shrank yourself to fit his comfort zone. Downplayed achievements. Apologized for success. He relaxed. You suffocated.",
      },
      {
        text: "A year later, you're passed over for promotion. 'You seemed less engaged,' your boss says. He's right. You were managing your boyfriend's ego instead of your career.",
      },
      {
        text: "Marcus is comfortable now. Happy, even. But you're a shadow of the woman who earned that director title. You gave up your crown to save his feelings. It wasn't worth it.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Dimmed Light',
    endingSummary: "You shrunk to fit his comfort zone. Your career stalled. Your ambition died. He's comfortable and you're invisible. The lesson: never make yourself smaller for someone who can't handle your size. The right partner wants you at full brightness.",
    endingLearnReference: 'upgrade-1b',
    endingLearnPrompt: 'What if you had refused to manage his insecurity?',
  },
];

export const allEndings: Scene[] = [
  ...walkEndings,
  ...ultimatumEndings,
  ...upgradeEndings,
];
