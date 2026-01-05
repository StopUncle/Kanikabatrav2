import type { Scene } from '../../types';

export const endings: Scene[] = [
  // ========== PATH A (BUILD) ENDINGS ==========
  {
    id: 'build-good-ending',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Two months later. You're with David. Not because you caved to pressure—because he consistently showed up. Chris was fun but faded. Marcus texts sometimes. You don't check anymore.",
      },
      {
        text: "You chose from abundance. That changes everything. You're not afraid to be alone. You could rebuild the rotation tomorrow if needed. That's freedom, not games.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Options Queen',
    endingSummary: "You broke the fixation through options, not willpower. Comparison created clarity. You chose from abundance—and that changes everything.",
  },
  {
    id: 'build-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You texted Marcus back. He flaked. Again. David's still around, but your attention was split. He noticed. Started pulling back.",
      },
      {
        text: "You're not fixated like before—but you're not free either. Old habits are stubborn. The lesson continues.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Half Measure',
    endingSummary: "Progress, not perfection. You built options but couldn't fully let go of the inconsistent one. Better than before—but the work isn't done.",
    endingLearnReference: 'rotation-101',
    endingLearnPrompt: 'Learn why three options is the minimum.',
  },
  {
    id: 'build-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You left David at the table to text Marcus. He noticed. 'I see how it is.' He paid the check and left. That was three months ago.",
      },
      {
        text: "Marcus? Still texting every few days. Still inconsistent. Chris met someone else. David blocked you. And you're right back where you started—staring at your phone. Waiting.",
      },
      {
        text: "You had options. Real ones. People who showed up. And you chose the ghost over the substance.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Ghost Chaser',
    endingSummary: "You had freedom in your hands—two men who actually tried. And you threw it away for someone who couldn't even text back consistently. The fixation won.",
    endingLearnReference: 'rotation-101',
    endingLearnPrompt: 'Learn to recognize consistent effort vs. crumbs.',
  },

  // ========== PATH B (SERIOUS) ENDINGS ==========
  {
    id: 'serious-good-ending',
    backgroundId: 'park',
    dialog: [
      {
        text: "A month later, you told David you were ready. Not because he pressured you—because you'd finished comparing. Chris was fun. Marcus was nothing. David was real.",
      },
      {
        text: "'What made you decide?' he asked. 'You waited without getting weird about it. That told me everything.' He smiled. 'Worth the wait.'",
        speakerId: 'david',
        emotion: 'happy',
      },
      {
        text: "You chose on your timeline. That's the whole point.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Your Terms',
    endingSummary: "You didn't cave to pressure. You took the time you needed, and when you chose, it was real. That's how exclusivity should happen.",
  },
  {
    id: 'serious-neutral-ending',
    backgroundId: 'bar',
    dialog: [
      {
        text: "David's still around. But the energy shifted after that conversation. He's uncertain. You're uncertain. Nobody's fully in.",
      },
      {
        text: "Maybe you should have been clearer. Maybe he should have been more patient. Either way, you're in limbo. Not together, not apart. Just... waiting.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Gray Zone',
    endingSummary: "You didn't say yes. You didn't say no. Now you're in relationship purgatory. Sometimes clarity is kinder than ambiguity.",
    endingLearnReference: 'rotation-101',
    endingLearnPrompt: 'Learn how to communicate your timeline clearly.',
  },
  {
    id: 'serious-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Three months of 'exclusive.' You resented every second. Couldn't stop thinking about the options you closed. Started picking fights. Made excuses to avoid him.",
      },
      {
        text: "David finally said it: 'You're not here. You never were.' He was right. You said yes when you meant no. And it poisoned everything.",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        text: "Now you're single again—but so is he. And he's not coming back.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Forced Yes',
    endingSummary: "You said yes to avoid discomfort and created months of it instead. A 'yes' from obligation isn't commitment—it's a countdown to collapse.",
    endingLearnReference: 'rotation-101',
    endingLearnPrompt: 'Learn why saying no is sometimes kindness.',
  },

  // ========== PATH C (CAUGHT) ENDINGS ==========
  {
    id: 'caught-good-ending',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "It was messy. But you owned it. Chris backed off—wasn't ready for someone with a full life. David stuck around. 'You were honest when it mattered. I can work with honest.'",
        speakerId: 'david',
        emotion: 'happy',
      },
      {
        text: "A month later, you're exclusive—by choice, not by force. The discovery didn't end things. Your honesty saved them.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Damage Control',
    endingSummary: "They found out. You owned it. The ones who couldn't handle adult dating left. The one who could stayed. Honesty wins.",
  },
  {
    id: 'caught-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Chris never texted again. David's around but guarded now. The trust took a hit. You handled it okay—not great. Honest, but late.",
      },
      {
        text: "Next time, get ahead of it. Don't wait to be discovered. Proactive honesty beats reactive truth every time.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Late Truth',
    endingSummary: "You told the truth—eventually. It saved one connection but damaged trust. Next time, be honest before they have to ask.",
    endingLearnReference: 'rotation-101',
    endingLearnPrompt: 'Learn proactive communication strategies.',
  },
  {
    id: 'caught-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Chris is telling everyone you're a player. David blocked you. Marcus heard about the drama and faded. In trying to keep all options open, you lost them all.",
      },
      {
        text: "Worse—your reputation precedes you now. Jake's party next month? Chris will be there. With stories. Small worlds get smaller.",
      },
      {
        text: "You didn't lie. But you hid. And when the truth came out without you controlling it, it looked like deception. Silence isn't neutral.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Burned Bridges',
    endingSummary: "They all found out. You handled it badly. Now you're single AND you have a reputation. Honesty upfront is easier than damage control after.",
    endingLearnReference: 'rotation-101',
    endingLearnPrompt: 'Learn how to communicate about multi-dating proactively.',
  },
];
