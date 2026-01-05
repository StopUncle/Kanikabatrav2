import type { Scene } from '../../types';

// PATH C: THE SAVIOR
// "I just want to help you" - control disguised as care
// Teaching: Their help isn't free. It comes with strings and superiority.

export const saviorScenes: Scene[] = [
  {
    id: 'savior-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Maya leans forward. 'The Savior. Let me guess—they're always fixing you. Giving advice you didn't ask for. Making you feel like a project?'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        text: "You think of Taylor. 'I just want what's best for you.' Said while criticizing your friends, your job, your choices. Every 'suggestion' is a correction.",
      },
      {
        speakerId: 'inner-voice',
        text: "They're not helping. They're installing themselves as essential.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'savior-1a',
        text: '"But they really do have good advice sometimes."',
        nextSceneId: 'savior-2-doubt',
        xpBonus: 5,
        feedback: 'Good advice doesn\'t require you to become dependent.',
      },
      {
        id: 'savior-1b',
        text: '"I feel like I can\'t make a decision without them anymore."',
        nextSceneId: 'savior-2-aware',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'That dependency is the goal. You just named the trap.',
      },
      {
        id: 'savior-1c',
        text: '"Maybe I do need fixing. They see things I don\'t."',
        nextSceneId: 'savior-2-trap',
        feedback: 'You\'ve started to believe their version of you. That\'s the danger.',
      },
    ],
  },
  {
    id: 'savior-2-doubt',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Let me ask you something,' Maya says. 'When you take their advice and it works—who gets the credit? And when you ignore it and succeed—how do they react?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You think back. When you took Taylor's advice, it was 'See? You needed me.' When you succeeded alone, it was 'I still think you should have done it my way.'",
      },
    ],
    nextSceneId: 'savior-3-test',
  },
  {
    id: 'savior-2-aware',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'That's the play,' Maya says. 'They make themselves essential. You stop trusting your own judgment. Then you NEED them. What happens when you disagree with their advice?'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You feel a chill. Last time you disagreed, Taylor got quiet. Cold. 'Fine. Do it your way. Don't come crying to me when it fails.' It felt like a threat.",
      },
    ],
    nextSceneId: 'savior-3-strategy',
  },
  {
    id: 'savior-2-trap',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Stop.' Maya's voice is sharp. 'Who were you before Taylor? Did you make decisions? Did you have opinions? What happened to that person?'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        text: "You try to remember. You used to be decisive. Confident. Now everything feels uncertain unless Taylor approves.",
      },
    ],
    nextSceneId: 'savior-3-strategy',
  },
  {
    id: 'savior-3-test',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That night, you tell Taylor you're thinking of changing jobs. Something you've been considering for months. You want to see their reaction.",
      },
      {
        text: "'Hmm.' Taylor looks concerned. 'Are you sure you're ready for that? I mean, I love that you're ambitious, but maybe we should look at this together first. I know the job market.'",
        speakerId: 'taylor',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: "You shared an idea. They're already taking the steering wheel.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'savior-3a',
        text: '"Actually, I\'ve already started applying. Wanted to tell you, not ask."',
        nextSceneId: 'savior-4-assert',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Inform, don\'t ask. Watch how they handle it.',
      },
      {
        id: 'savior-3b',
        text: '"You\'re probably right. Can you help me think it through?"',
        nextSceneId: 'savior-4-defer',
        xpBonus: 5,
        feedback: 'You handed over the wheel. Again.',
      },
      {
        id: 'savior-3c',
        text: '"Never mind. It was just a thought."',
        nextSceneId: 'savior-trap-ending',
        feedback: 'You killed your own idea before they had to.',
      },
    ],
  },
  {
    id: 'savior-3-strategy',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's what you do,' Maya says. 'Make a decision without them. Something small. Don't ask their opinion. Don't tell them until after. See how they handle not being consulted.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You buy a new jacket. Just pick it out yourself. Don't send Taylor photos asking for approval. Wear it when you see them.",
      },
    ],
    nextSceneId: 'savior-4-small',
  },
  {
    id: 'savior-4-assert',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Taylor's face shifts. Surprise. Then something harder. 'Oh. You already applied. Without telling me.' A pause. 'I just hope you know what you're doing. I could have helped you avoid some mistakes.'",
        speakerId: 'taylor',
        emotion: 'cold',
      },
      {
        speakerId: 'inner-voice',
        text: "You made a decision alone. Now they're predicting failure.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'savior-4a',
        text: '"I\'m comfortable making this mistake myself if it is one."',
        nextSceneId: 'savior-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'You reclaimed your right to fail. That\'s freedom.',
      },
      {
        id: 'savior-4b',
        text: '"What mistakes? Tell me what you think."',
        nextSceneId: 'savior-neutral-ending',
        xpBonus: 5,
        feedback: 'You invited them back in. The control continues.',
      },
    ],
  },
  {
    id: 'savior-4-defer',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Taylor brightens immediately. 'Of course! Let me look at your resume. And your LinkedIn—when did you update it last? Okay, sit down. We have work to do.'",
        speakerId: 'taylor',
        emotion: 'happy',
      },
      {
        text: "Three hours later, you've rewritten your resume to Taylor's specifications, questioned every career choice you've made, and feel more confused than when you started.",
      },
    ],
    nextSceneId: 'savior-neutral-ending',
  },
  {
    id: 'savior-4-small',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You wear the jacket to dinner. Taylor looks you up and down. 'Is that... new?' 'Yeah. Got it yesterday.' A pause. 'Hmm. It's... a choice. Did you not want my opinion?'",
        speakerId: 'taylor',
        emotion: 'cold',
      },
      {
        speakerId: 'inner-voice',
        text: "A jacket. You bought a jacket. And that's a problem.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'savior-small-a',
        text: '"Nope. I just liked it. That\'s enough."',
        nextSceneId: 'savior-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'You trusted yourself. They don\'t know how to handle it.',
      },
      {
        id: 'savior-small-b',
        text: '"Do you not like it?"',
        nextSceneId: 'savior-neutral-ending',
        xpBonus: 5,
        feedback: 'You asked for approval after all.',
      },
      {
        id: 'savior-small-c',
        text: '"I can return it if you think it\'s wrong."',
        nextSceneId: 'savior-trap-ending',
        feedback: 'A jacket. You offered to return a jacket because of their reaction.',
      },
    ],
  },
];
