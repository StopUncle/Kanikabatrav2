import type { ForkScene } from '../../../types';

export const morningScenes: ForkScene[] = [
  // Scene 1: Wake up
  {
    id: 'wake-up',
    backgroundId: 'apartment',
    mood: 'peaceful',
    dialog: [
      {
        speakerId: null,
        text: 'Morning light filters through the blinds. Your phone is already buzzing.',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: '7 new messages. 3 friend requests. 1 missed call from an unknown number.',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: 'The gala opened doors. Question is—which ones do you walk through?',
        emotion: 'curious',
      },
    ],
    choices: [
      {
        id: 'check-messages',
        text: 'Check the messages first',
        nextSceneId: 'phone-messages',
        feedback: 'Information first. Smart.',
      },
      {
        id: 'ignore-phone',
        text: 'Shower first, phone later',
        nextSceneId: 'alex-ambush',
        feedback: 'Sometimes delay is strategic. Sometimes it costs you.',
      },
    ],
  },

  // Scene 2a: Phone messages
  {
    id: 'phone-messages',
    backgroundId: 'text-screen',
    dialog: [
      {
        speakerId: null,
        text: 'PRIYA: "Hey! Great meeting you last night. Coffee later?"',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'UNKNOWN: "Saw you talking to Maris. Impressive. We should connect."',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'ALEX: "Bro where did you disappear to?? Heard you were at THE gala??"',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: 'Priya seems genuine. Unknown is fishing. Alex is... Alex.',
        emotion: 'knowing',
      },
    ],
    choices: [
      {
        id: 'reply-priya',
        text: 'Reply to Priya first',
        nextSceneId: 'priya-text',
        feedback: 'Start with the genuine connection.',
      },
      {
        id: 'reply-unknown',
        text: 'Reply to the unknown number',
        nextSceneId: 'unknown-trap',
        feedback: 'Curiosity. It killed the cat.',
      },
    ],
  },

  // Scene 2b: Alex ambush (if ignored phone)
  {
    id: 'alex-ambush',
    backgroundId: 'apartment',
    dialog: [
      {
        speakerId: 'alex',
        text: '"DUDE. You\'re awake. I\'ve been waiting for like an hour."',
        emotion: 'happy',
      },
      {
        speakerId: 'alex',
        text: '"The gala. Spill. Everything. I heard you were talking to Maris freaking Caldwell?"',
        emotion: 'curious',
      },
      {
        speakerId: 'inner-voice',
        text: 'He didn\'t get in. He\'s hungry for details. Careful.',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'brag-alex',
        text: '"Yeah, Maris and I really hit it off actually"',
        nextSceneId: 'brag-disaster',
        feedback: 'Exaggerating to impress. Alex will tell everyone by lunch.',
        isOptimal: false,
      },
      {
        id: 'deflect-alex',
        text: '"It was just networking. Nothing special."',
        nextSceneId: 'alex-deflected',
        feedback: 'Downplay. Give him nothing to spread.',
        isOptimal: true,
      },
      {
        id: 'honest-alex',
        text: '"Brief conversation. She\'s intense. That\'s all I know."',
        nextSceneId: 'alex-satisfied',
        feedback: 'Truth without detail. Balanced.',
      },
    ],
  },

  // Scene 3: Priya text exchange
  {
    id: 'priya-text',
    backgroundId: 'text-screen',
    dialog: [
      {
        speakerId: null,
        text: 'YOU: "Coffee sounds great. When and where?"',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'PRIYA: "Campus Bean, 11am? I have some thoughts about last night you might want to hear."',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: 'She has intel. That\'s worth a coffee.',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'alex-enters',
  },

  // Scene 3b: Unknown trap
  {
    id: 'unknown-trap',
    backgroundId: 'text-screen',
    dialog: [
      {
        speakerId: null,
        text: 'YOU: "Thanks. Who is this?"',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'UNKNOWN: "Someone who knows how things work around here. What did Maris say to you exactly?"',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: 'Fishing expedition. They want specifics.',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'share-details',
        text: 'Share what Maris said',
        nextSceneId: 'info-leaked',
        feedback: 'Ammunition handed to an unknown player. This will haunt you.',
        isOptimal: false,
      },
      {
        id: 'deflect-unknown',
        text: '"Nothing interesting. Why do you ask?"',
        nextSceneId: 'alex-enters',
        feedback: 'Good. Turn the question around. Reveal nothing.',
        isOptimal: true,
      },
    ],
  },

  // Scene 4: Alex enters (convergence point)
  {
    id: 'alex-enters',
    backgroundId: 'apartment',
    dialog: [
      {
        speakerId: 'alex',
        text: '"Finally! You\'re up. So... the gala. How was it?"',
        emotion: 'curious',
      },
      {
        speakerId: 'inner-voice',
        text: 'Here we go. He\'s been waiting.',
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'brag-alex-2',
        text: '"Amazing. Maris basically invited me to her inner circle."',
        nextSceneId: 'brag-disaster',
        feedback: 'This version of events will reach Maris. And it won\'t match hers.',
        isOptimal: false,
      },
      {
        id: 'minimal-alex',
        text: '"Good networking. Met some people. You know how it is."',
        nextSceneId: 'alex-satisfied',
        feedback: 'Vague but not dismissive. Well played.',
        isOptimal: true,
      },
    ],
  },

  // Scene 5: Alex satisfied
  {
    id: 'alex-satisfied',
    backgroundId: 'apartment',
    dialog: [
      {
        speakerId: 'alex',
        text: '"Man, I wish I could\'ve been there. Next time you gotta get me in."',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'He seems satisfied with your answer. The interrogation is over.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'head-to-coffee',
  },

  // Scene 5b: Alex deflected
  {
    id: 'alex-deflected',
    backgroundId: 'apartment',
    dialog: [
      {
        speakerId: 'alex',
        text: '"Nothing special? Dude, it\'s the Caldwell Gala."',
        emotion: 'confused',
      },
      {
        speakerId: 'alex',
        text: '"Whatever. If you don\'t want to share..."',
        emotion: 'sad',
      },
      {
        speakerId: null,
        text: 'He backs off, slightly offended but not suspicious.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'head-to-coffee',
  },

  // Scene 6: Head to coffee
  {
    id: 'head-to-coffee',
    backgroundId: 'park',
    dialog: [
      {
        speakerId: null,
        text: 'You head across campus to meet Priya. The morning air is crisp.',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'A few people nod at you. Word travels fast.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'coffee-arrival',
  },

  // FAILURE BRANCH: Brag disaster
  {
    id: 'brag-disaster',
    backgroundId: 'apartment',
    dialog: [
      {
        speakerId: 'alex',
        text: '"Wait, REALLY? Maris Caldwell? Her inner circle?"',
        emotion: 'happy',
      },
      {
        speakerId: 'alex',
        text: '"Bro, that\'s insane. I gotta tell everyone about this."',
        emotion: 'happy',
      },
      {
        speakerId: 'inner-voice',
        text: 'No. No no no.',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'brag-spreads',
  },

  {
    id: 'brag-spreads',
    backgroundId: 'park',
    dialog: [
      {
        speakerId: null,
        text: 'By noon, half the campus has heard. By evening, it reaches Maris.',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'Your phone buzzes. A text from an unknown number.',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: '"Heard you\'ve been telling people we\'re close friends. Interesting. —M"',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-brag-fail',
  },

  // FAILURE BRANCH: Info leaked
  {
    id: 'info-leaked',
    backgroundId: 'text-screen',
    dialog: [
      {
        speakerId: null,
        text: 'You share the details of your conversation with Maris.',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'The unknown number goes silent. No reply.',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: 'That information is now a weapon. And you don\'t know who\'s holding it.',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'info-weaponized',
  },

  {
    id: 'info-weaponized',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: null,
        text: 'Two days later. You\'re at the coffee shop when you overhear two people talking.',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: '"...yeah, apparently they told everyone what Maris said. Total breach of trust."',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'They\'re talking about you. The story is twisted beyond recognition.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-info-fail',
  },
];
