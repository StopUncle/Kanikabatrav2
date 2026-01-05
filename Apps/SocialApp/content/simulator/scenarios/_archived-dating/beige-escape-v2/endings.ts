import type { Scene } from '../../types';

// ENDINGS FOR BEIGE-ESCAPE SCENARIO
// Each path has good/neutral/bad outcomes

// PATH A: NICE GUY ENDINGS
export const niceGuyEndings: Scene[] = [
  {
    id: 'nice-good-ending',
    backgroundId: 'park',
    dialog: [
      {
        text: "You move out the following month. No drama. No villains. Just two people who cared about each other but weren't right together.",
      },
      {
        text: "Maya calls to check in. 'How do you feel?' 'Sad. Relieved. Both.' 'That's exactly how it should feel. You did the hard thing. The right thing.'",
        speakerId: 'maya',
        emotion: 'happy',
      },
      {
        text: "Six months later, you hear David is dating someone new. She seems excited about him in a way you never were. Good. He deserved that. So did you.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Clean Break',
    endingSummary: "You left because leaving was right—not because he was wrong. No villain. No drama. Just clarity that good enough for someone isn't good enough for you. He'll find his person. So will you.",
  },
  {
    id: 'nice-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The breakup happens. But messy. You listed reasons. He defended himself. It became about who was right instead of what was true.",
      },
      {
        text: "You're out. That matters. But the exit left scars that didn't need to be there. Clean exits are kinder—for everyone.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Messy Exit',
    endingSummary: "You left—but not cleanly. The manufactured reasons created unnecessary pain. Next time: honesty without blame. 'It's not working' is enough. You don't need to build a case.",
    endingLearnReference: 'nice-4a',
    endingLearnPrompt: 'What if you had been honest without manufacturing reasons?',
  },
  {
    id: 'nice-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Three years later. Still with David. Still gray. Still ordering Thai and saying 'sure.' Nothing has changed because you never changed it.",
      },
      {
        text: "Maya stopped asking. She knows you won't leave. You've made peace with beige. But peace isn't happiness. And 'sure' isn't love.",
      },
      {
        text: "The life you could have had drifts further away. The comfort you chose becomes the cage you earned.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Forever Beige',
    endingSummary: "You stayed because leaving was hard. Years pass. The gray becomes your normal. You're not unhappy—you're nothing. The cost of avoiding one hard conversation is a lifetime of 'sure.'",
    endingLearnReference: 'nice-3a',
    endingLearnPrompt: 'What if you had started the conversation that night?',
  },
];

// PATH B: COMFORTABLE RUT ENDINGS
export const rutEndings: Scene[] = [
  {
    id: 'rut-good-ending',
    backgroundId: 'park',
    dialog: [
      {
        text: "'I think we've been done for a while.' You say it. He agrees. Two people who let something end instead of fighting to keep a corpse alive.",
      },
      {
        text: "The walk back to the car is quiet. Peaceful. There's grief, but also relief. You don't hate each other. You just... stopped.",
        speakerId: 'david',
        emotion: 'neutral',
      },
      {
        text: "Later, Maya asks: 'How did it go?' 'We agreed. Mutually.' 'That's the dream breakup. Most people don't get that.' She's right. You're grateful.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Mutual Release',
    endingSummary: "You both saw what was true and chose to name it. No blame. No drama. Just acknowledgment that comfort became a cage. The rut ends where honesty begins.",
  },
  {
    id: 'rut-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You try therapy. Three months of talking about communication and love languages. The therapist is good. The relationship is still dead.",
      },
      {
        text: "Eventually, you end it anyway. 'We tried,' David says. 'At least we tried.' He's right. But you both knew. The trying was just prolonging.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Extended Goodbye',
    endingSummary: "You tried therapy. It confirmed what you already knew. Sometimes the honorable thing is to try; sometimes it's just delay. You're out now. That's what matters.",
    endingLearnReference: 'rut-5a',
    endingLearnPrompt: 'What if you had acknowledged the truth on that hike?',
  },
  {
    id: 'rut-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Years pass. The conversation never happens. You're still on the couch. Still watching Netflix. Still saying 'sure' when he suggests dinner.",
      },
      {
        text: "You're not unhappy. You're just not anything. The rut became a groove became a grave. Comfortable. Quiet. Dead.",
      },
      {
        text: "Maya's married now. Has kids. Lives a life. You're still exactly where you were. Waiting for something to change without changing anything.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Comfortable Grave',
    endingSummary: "The rut became permanent. You stayed because starting over was scary. Now you're too deep to dig out. Comfort can be a slow death. You chose safety over living.",
    endingLearnReference: 'rut-3a',
    endingLearnPrompt: 'What if you had opened up on that hike?',
  },
];

// PATH C: SUNK COST ENDINGS
export const sunkCostEndings: Scene[] = [
  {
    id: 'sunk-good-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Thank you for five years.' You mean it. He does too. The goodbye is tender. Real. You both grew in those years—just not together.",
      },
      {
        text: "A month later. Your own apartment. Smaller. Yours. The quiet that terrified you now feels like possibility.",
        speakerId: 'david',
        emotion: 'neutral',
      },
      {
        text: "The five years weren't wasted. They taught you who you are, what you need, and when to leave. That education was worth the tuition.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Honorable Ending',
    endingSummary: "Five years honored. Not wasted. The sunk cost fallacy is just math—time spent doesn't equal time owed. You left with gratitude, not regret. That's the cleanest exit.",
  },
  {
    id: 'sunk-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Maybe we can stay friends?' He smiles sadly. 'Maybe. Just... not right now.' Fair. Space is needed. The entanglement has to untangle.",
      },
      {
        text: "You're out. That matters. But the exit could have been cleaner. The 'friends' hope creates an anchor. He'll wait longer than he should.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Loose End',
    endingSummary: "You left, but with threads dangling. 'Friends' sounds kind but often prolongs pain. Clean breaks heal faster. Next time: clarity over comfort.",
    endingLearnReference: 'sunk-6a',
    endingLearnPrompt: 'What if you had thanked him and closed the chapter fully?',
  },
  {
    id: 'sunk-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Year six. Seven. Eight. The 'right moment' never came because there is no right moment. You waited through birthdays, holidays, anniversaries. Each one became a reason to delay.",
      },
      {
        text: "Now you're too deep. The logistics are impossible. The shared everything is everything. The sunk cost became an anchor.",
      },
      {
        text: "You stopped calling Maya. She stopped asking. Everyone knows. Nobody says. The life you wanted drifts further away with each 'right moment' you're waiting for.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Endless Wait',
    endingSummary: "You waited for the perfect exit. It never came. Year after year, you added to the sunk cost instead of cutting it. Now the investment is so large it feels impossible to walk away. The trap snapped closed.",
    endingLearnReference: 'sunk-4a',
    endingLearnPrompt: 'What if you had started the conversation that night?',
  },
];

export const allEndings: Scene[] = [
  ...niceGuyEndings,
  ...rutEndings,
  ...sunkCostEndings,
];
