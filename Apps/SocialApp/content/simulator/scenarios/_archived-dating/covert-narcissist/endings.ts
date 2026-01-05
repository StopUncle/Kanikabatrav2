import type { Scene } from '../../types';

export const endings: Scene[] = [
  // ========== PATH A (VICTIM) ENDINGS ==========
  {
    id: 'victim-good-ending',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "A week later, you're back with Maya. 'I ended it. They called me heartless. Said I abandoned them. Classic.' Maya raises her coffee. 'To abandoning people who drain you.'",
        speakerId: 'maya',
        emotion: 'happy',
      },
      {
        text: "You feel lighter than you have in months. Their pain was real. But so was yours. And you stopped being their unpaid therapist.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Clean Break',
    endingSummary: "You recognized the pattern and walked away. Their suffering was real—but using you as their only support system wasn't love. It was consumption.",
  },
  {
    id: 'victim-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're still with Alex. Things are... fine. You've gotten better at deflecting, at not giving as much. But you're tired. Watching. Waiting for the next crisis.",
      },
      {
        text: "You know the pattern now. You just haven't left yet. Sometimes awareness without action is just suffering with open eyes.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Eyes Open, Feet Stuck',
    endingSummary: "You see what they are now. But seeing isn't leaving. You manage the pattern instead of ending it. How long can you keep this up?",
    endingLearnReference: 'covert-narc-101',
    endingLearnPrompt: 'Learn strategies to exit the victim trap.',
  },
  {
    id: 'victim-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Six months later. You haven't seen Maya in weeks—Alex always has a crisis when you try to make plans. Your other friends stopped calling. You forgot what your hobbies were.",
      },
      {
        text: "One night, you mention feeling lonely. Alex bursts into tears. 'You think YOU'RE lonely? You have ME. I have NO ONE. God, you're so selfish sometimes.'",
        speakerId: 'alex',
        emotion: 'angry',
      },
      {
        text: "You apologize. Again. Later, you find a text on their phone. They've been venting to their ex about how 'exhausting' you are. While you gave them everything, they were painting you as the burden.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Empty Shell',
    endingSummary: "You gave everything. They took it and complained about you to someone else. You became their supply, their scapegoat, their emotional punching bag. And they never saw you as anything more.",
    endingLearnReference: 'covert-narc-101',
    endingLearnPrompt: 'Learn to spot the victim player before they drain you.',
  },

  // ========== PATH B (HUMBLE BRAGGER) ENDINGS ==========
  {
    id: 'humble-good-ending',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'I'm done,' you tell Maya. 'Every conversation was a competition I didn't sign up for. My wins made them uncomfortable. That's not a partner. That's an opponent.'",
        speakerId: 'maya',
        emotion: 'happy',
      },
      {
        text: "Jordan texted three times after you ended it. All humble brags disguised as apologies. 'I'm SO grateful for what we had. I've grown SO much from this.' Even the goodbye was about them.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'No More Competition',
    endingSummary: "You stopped playing a game that only they could win. Someone who can't celebrate you doesn't deserve you.",
  },
  {
    id: 'humble-neutral-ending',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You're still with Jordan. You've learned to shrink your wins, pad their ego, never shine too bright. It's exhausting, but it keeps the peace.",
      },
      {
        text: "Last week you got an award at work. You didn't tell them. It was easier that way.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Small Life',
    endingSummary: "You've made yourself smaller to fit in their world. Your wins live in silence. Your growth happens in secret. Is this what love looks like?",
    endingLearnReference: 'covert-narc-101',
    endingLearnPrompt: 'Learn why hiding your success isn\'t sustainable.',
  },
  {
    id: 'humble-trap-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You stayed. Kept playing small. Then one night, Jordan announces they're leaving. 'I've outgrown this relationship. You're just not ambitious enough for me. No offense.'",
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        text: "You gave them the spotlight for a year. Shrank yourself so they could shine. And when they found someone more impressive to stand next to, they discarded you without a second thought.",
      },
      {
        text: "A month later, you see their Instagram. New partner. 'SO blessed to have found someone who matches my energy.' The cycle continues. Just not with you.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Outgrown',
    endingSummary: "You made yourself smaller, and they still left—because they were never looking for a partner. They were looking for an audience. And you got replaced by a better seat filler.",
    endingLearnReference: 'covert-narc-101',
    endingLearnPrompt: 'Learn why shrinking yourself never works.',
  },
  {
    id: 'humble-confront-ending',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Jordan's eyes widen. 'Condescending? I was being SUPPORTIVE. Wow. I try to celebrate you and THIS is what I get.' They're standing now. Other diners are looking.",
        speakerId: 'jordan',
        emotion: 'angry',
      },
      {
        text: "'You know what? I don't need this negativity. I'm going to go be with people who appreciate me.' They leave. Check unpaid. Everyone staring.",
      },
      {
        text: "You pay. You leave. And by the next morning, Jordan has posted about 'toxic people who can't handle confident partners.' Guess who that is.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Public Exit',
    endingSummary: "You called it out. They made a scene. Now you're the villain in their story. But at least you're out—even if the exit was messy.",
    endingLearnReference: 'covert-narc-101',
    endingLearnPrompt: 'Learn to time your confrontations strategically.',
  },

  // ========== PATH C (SAVIOR) ENDINGS ==========
  {
    id: 'savior-good-ending',
    backgroundId: 'park',
    dialog: [
      {
        text: "You ended it last week. Taylor was... confused. 'But I've done so much for you. I helped you become who you are.' That sentence told you everything.",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You're walking in the park. Making your own decisions. Wearing what you want. It feels strange. Unfamiliar. But good. Like remembering how to breathe.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Your Own Voice',
    endingSummary: "You stopped being their project and became your own person again. The 'help' was a cage. Now you're free to make your own mistakes—and that's everything.",
  },
  {
    id: 'savior-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're still with Taylor. You've gotten better at pretending to take their advice while doing what you want. It's exhausting. Every decision is a secret negotiation.",
      },
      {
        text: "Sometimes you catch yourself asking 'What would Taylor think?' before you think for yourself. You hate that. But you stay.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Managed Life',
    endingSummary: "You're navigating around them instead of living freely. It works. But is this how you want to spend your life? Constantly managing someone else's need to control you?",
    endingLearnReference: 'covert-narc-101',
    endingLearnPrompt: 'Learn why workarounds aren\'t solutions.',
  },
  {
    id: 'savior-trap-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Two years later. Taylor controls everything. Your job, your friends, your clothes, your diet. 'I just want what's best for you' became the cage you live in.",
        speakerId: 'taylor',
        emotion: 'concerned',
      },
      {
        text: "One day you make a decision alone. Book a flight to visit your family. Taylor finds out. 'Without asking me? After everything I've done? You're so ungrateful.'",
      },
      {
        text: "That night, Taylor threatens to leave. 'If you can't appreciate me, maybe I should find someone who will.' You apologize. Cancel the flight. Maya stops calling after that. You don't blame her.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Broken Bird',
    endingSummary: "They 'helped' you until you couldn't function without them. Now you don't trust your own judgment. You don't have your own friends. You barely have your own thoughts. This is what control dressed as love looks like.",
    endingLearnReference: 'covert-narc-101',
    endingLearnPrompt: 'Learn to spot control disguised as care.',
  },
];
