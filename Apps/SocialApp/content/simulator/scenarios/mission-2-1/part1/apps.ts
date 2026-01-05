import type { ForkScene } from '../../../types';

export const appScenes: ForkScene[] = [
  {
    id: 'app-swipe',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'Three new matches. Three very different energies.', emotion: 'neutral' },
      { speakerId: null, text: 'Jordan: "Hey! Saw you like hiking. What\'s your favorite trail?"', emotion: 'neutral' },
      { speakerId: null, text: 'Sam: "You\'re absolutely stunning. We need to meet. Tonight?"', emotion: 'neutral' },
      { speakerId: null, text: 'Riley: "What do you do? Where do you live? What\'s your story?"', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'One genuine. One rushing. One interrogating.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'reply-jordan', text: 'Reply to Jordan first', nextSceneId: 'jordan-convo', feedback: 'The measured approach. Start with genuine.', isOptimal: true },
      { id: 'reply-sam', text: 'Reply to Sam first', nextSceneId: 'sam-convo', feedback: 'Flattery is intoxicating. Be careful.' },
      { id: 'reply-riley', text: 'Reply to Riley first', nextSceneId: 'riley-convo', feedback: 'Engaging with the interrogator. Interesting choice.' },
    ],
  },
  {
    id: 'jordan-convo',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'YOU: "The trails up by the lake are great. You?"', emotion: 'neutral' },
      { speakerId: null, text: 'JORDAN: "Same! I did the ridge loop last weekend. Beautiful views."', emotion: 'neutral' },
      { speakerId: null, text: 'JORDAN: "Do you usually go solo or with friends?"', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Normal conversation. Building connection. No pressure.', emotion: 'hopeful' },
    ],
    choices: [
      { id: 'continue-jordan', text: 'Keep chatting with Jordan', nextSceneId: 'jordan-build', feedback: 'Slow build. Healthy.' },
      { id: 'check-others', text: 'Check the other matches too', nextSceneId: 'sam-check', feedback: 'Keeping options open. Smart or scattered?' },
    ],
  },
  {
    id: 'jordan-build',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'The conversation flows naturally. Shared interests. Light humor.', emotion: 'neutral' },
      { speakerId: null, text: 'JORDAN: "Would you want to grab coffee sometime? No pressure."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: '"No pressure." Good sign. Respecting boundaries.', emotion: 'hopeful' },
    ],
    choices: [
      { id: 'accept-coffee', text: '"Sure, that sounds nice"', nextSceneId: 'ending-genuine', feedback: 'A real connection starts slow.', isOptimal: true },
      { id: 'hesitate', text: '"Let me think about it"', nextSceneId: 'jordan-patient', feedback: 'Caution is fine. See how they handle delay.' },
    ],
  },
  {
    id: 'jordan-patient',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'JORDAN: "Of course! No rush. Just let me know."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Patient. Respectful. Green flag.', emotion: 'hopeful' },
    ],
    nextSceneId: 'ending-genuine',
  },
  {
    id: 'sam-convo',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'YOU: "Tonight is a bit fast. Maybe this weekend?"', emotion: 'neutral' },
      { speakerId: null, text: 'SAM: "Come on, life is short! I can tell we have chemistry. Let\'s not waste it."', emotion: 'neutral' },
      { speakerId: null, text: 'SAM: "Send me your address. I\'ll pick you up at 8."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Your address. Before a first date. Before a first conversation, really.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'give-address', text: 'Send your address', nextSceneId: 'ending-unsafe', feedback: 'TRAP: Never share address with strangers.', isOptimal: false },
      { id: 'suggest-public', text: '"Let\'s meet somewhere public first"', nextSceneId: 'sam-pushback', feedback: 'Boundaries. Good.' },
      { id: 'unmatch', text: 'This is too pushy. Unmatch.', nextSceneId: 'sam-unmatched', feedback: 'Trust your instincts.', isOptimal: true },
    ],
  },
  {
    id: 'sam-pushback',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'SAM: "Ugh, you\'re one of those paranoid types?"', emotion: 'neutral' },
      { speakerId: null, text: 'SAM: "Fine. If you don\'t trust me, maybe this won\'t work."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Angry because you asked to meet in public. That tells you everything.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'apologize', text: '"Sorry, I didn\'t mean to offend..."', nextSceneId: 'ending-manipulation', feedback: 'TRAP: You\'re apologizing for having boundaries.', isOptimal: false },
      { id: 'stand-firm', text: '"Take care then"', nextSceneId: 'sam-unmatched', feedback: 'Firm. Healthy.', isOptimal: true },
    ],
  },
  {
    id: 'sam-unmatched',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'You unmatch. The pressure vanishes instantly.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Real connection doesn\'t feel like a sales pitch.', emotion: 'knowing' },
    ],
    nextSceneId: 'back-to-jordan',
  },
  {
    id: 'sam-check',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'SAM: "Hello?? Are you there? You\'re online, I can see it."', emotion: 'neutral' },
      { speakerId: null, text: 'SAM: "Don\'t leave me hanging. We have something special."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'They\'re watching when you\'re online. Demanding answers. Already.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'engage-sam', text: 'Reply to Sam', nextSceneId: 'sam-convo', feedback: 'Engaging with the pressure.' },
      { id: 'ignore-sam', text: 'Ignore Sam, check Riley', nextSceneId: 'riley-convo', feedback: 'Sometimes silence is the answer.' },
    ],
  },
  {
    id: 'riley-convo',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'YOU: "I work in marketing. What about you?"', emotion: 'neutral' },
      { speakerId: null, text: 'RILEY: "Cool cool. What company? What\'s your salary range? Just curious."', emotion: 'neutral' },
      { speakerId: null, text: 'RILEY: "Also where did you grow up? Family situation?"', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Interview mode. Information extraction. Not connection.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'answer-riley', text: 'Answer the questions', nextSceneId: 'ending-overshare', feedback: 'TRAP: Too much too fast.', isOptimal: false },
      { id: 'redirect-riley', text: '"That\'s a lot of questions. What about you?"', nextSceneId: 'riley-deflects', feedback: 'Turn it around. See their response.', isOptimal: true },
    ],
  },
  {
    id: 'riley-deflects',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'RILEY: "Oh I\'m just curious! I like to get to know people fast."', emotion: 'neutral' },
      { speakerId: null, text: 'RILEY: "Anyway, so your family...?"', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Didn\'t answer. Just pivoted back to you. Why?', emotion: 'knowing' },
    ],
    choices: [
      { id: 'unmatch-riley', text: 'This isn\'t a match. Unmatch.', nextSceneId: 'back-to-jordan', feedback: 'Good instincts.', isOptimal: true },
      { id: 'give-something', text: 'Give a small answer to be polite', nextSceneId: 'riley-escalates', feedback: 'Politeness can be exploited.' },
    ],
  },
  {
    id: 'riley-escalates',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'You share a little. Riley wants more.', emotion: 'neutral' },
      { speakerId: null, text: 'RILEY: "That\'s interesting. So your parents are divorced? Tell me more."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Feeding frenzy. Time to exit.', emotion: 'concerned' },
    ],
    nextSceneId: 'ending-overshare',
  },
  {
    id: 'back-to-jordan',
    backgroundId: 'text-screen',
    dialog: [
      { speakerId: null, text: 'You return to Jordan\'s conversation. Still measured. Still genuine.', emotion: 'neutral' },
      { speakerId: null, text: 'JORDAN: "Took a break? No worries. So about that coffee..."', emotion: 'neutral' },
    ],
    nextSceneId: 'jordan-build',
  },
];
