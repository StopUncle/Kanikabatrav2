import type { Scene } from '../../types';

// PATH C: FUTURE INVESTMENT
// He talks about the future constantly - testing if it's real
// Teaching: Future promises are the highest form of investment... if backed by present action.

export const futureScenes: Scene[] = [
  {
    id: 'future-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Trips. Family. Moving in.' Maya's eyebrows rise. 'After three weeks? That's a lot of future talk.' You nod. He's mentioned a vacation to Italy. Meeting his mom. 'When we get a place together.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "'So what's he doing NOW?' Maya asks. 'Is he actually building toward those futures? Or just... talking about them?'",
        speakerId: 'maya',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "Future promises. Present delivery. The gap is everything.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'future-1a',
        text: '"He\'s really excited about our future. Isn\'t that good?"',
        nextSceneId: 'future-2-naive',
        feedback: 'Excitement is cheap. Action is expensive.',
      },
      {
        id: 'future-1b',
        text: '"Actually... he hasn\'t followed through on anything yet."',
        nextSceneId: 'future-2-clarity',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'You\'re starting to see the gap. Future talk, present emptiness.',
      },
    ],
  },
  {
    id: 'future-2-naive',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Excited about your future.' Maya repeats it slowly. 'But what's he doing TODAY? It's easy to promise Paris when you're not buying the tickets.'",
        speakerId: 'maya',
        emotion: 'cold',
      },
      {
        text: "'Future-faking is a classic manipulation tactic. Keep you hooked with promises. Never deliver. You're too invested in the vision to notice the present is empty.'",
        speakerId: 'maya',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'future-2-clarity',
  },
  {
    id: 'future-2-clarity',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's what I want you to do.' Maya sets down her coffee. 'When he brings up the future, ask for specifics. When is Italy? What dates? Is he looking at flights? Real plans have details.'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        speakerId: 'inner-voice',
        text: "Visions are vapor. Details are real.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'future-2a',
        text: '"That\'s smart. I\'ll test if the future is real."',
        nextSceneId: 'future-3-test',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'The specificity test. Futures without plans are fantasies.',
      },
      {
        id: 'future-2b',
        text: '"Won\'t that seem pushy? Like I\'m rushing him?"',
        nextSceneId: 'future-3-doubt',
        feedback: 'HE brought up the future. You\'re just asking if it\'s real.',
      },
    ],
  },
  {
    id: 'future-3-doubt',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Pushy? He's the one talking about moving in together. You're just asking if that's a plan or a daydream.' Maya laughs. 'A man who means it welcomes the details. A man who's faking deflects.'",
        speakerId: 'maya',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'future-3-test',
  },
  {
    id: 'future-3-test',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That night. Jake's on your couch, talking about 'our' apartment. The view you'll have. The brunch spot down the street. It's vivid. Romantic. Completely hypothetical.",
      },
      {
        text: "'That sounds amazing.' You keep your voice neutral. 'When are you thinking? Have you looked at any listings?'",
        speakerId: 'jake',
        emotion: 'happy',
      },
      {
        speakerId: 'inner-voice',
        text: "Here it comes. Watch how he handles specifics.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'future-3a',
        text: 'Wait silently for his answer.',
        nextSceneId: 'future-4-answer',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'Let him fill the silence. Don\'t rescue him.',
      },
      {
        id: 'future-3b',
        text: '"No pressure! Just curious."',
        nextSceneId: 'future-4-rescue',
        feedback: 'You gave him an escape hatch. He\'ll take it.',
      },
    ],
  },
  {
    id: 'future-4-rescue',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Oh, you know, just dreaming out loud.' He laughs it off. The future evaporates. It was never real—just bait. And you helped him avoid accountability.",
      },
      {
        text: "The pattern repeats. Futures mentioned. Details avoided. The vision is always 'someday.' Someday never comes.",
      },
    ],
    nextSceneId: 'future-neutral-ending',
  },
  {
    id: 'future-4-answer',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "His smile wavers. 'Listings? I mean, it's early to look at actual places.' 'You mentioned moving in. I assumed you meant... eventually. Soon?' 'Soon. Yeah. Definitely soon.'",
        speakerId: 'jake',
        emotion: 'confused',
      },
      {
        text: "Soon. The most meaningless word in the English language. No date. No plan. Just... soon.",
      },
      {
        speakerId: 'inner-voice',
        text: "He's been talking about Italy for two weeks. Has he googled a single flight?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'future-4a',
        text: '"What about Italy? You mentioned spring. Have you looked at dates?"',
        nextSceneId: 'future-5-press',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Keep pressing. Watch the castle crumble.',
      },
      {
        id: 'future-4b',
        text: '"You\'re right, it\'s early. Sorry for pushing."',
        nextSceneId: 'future-4-rescue',
        feedback: 'You apologized for expecting substance. Classic trap.',
      },
    ],
  },
  {
    id: 'future-5-press',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Italy? Yeah, I was thinking spring. We should look at flights soon.' 'Spring is five months away. What month? Do you have PTO?' 'I mean... I haven't checked yet.'",
        speakerId: 'jake',
        emotion: 'confused',
      },
      {
        text: "'Meeting your mom—when were you thinking? Does she know about me?' 'Not... officially. But I've mentioned you.' 'Mentioned isn't introduced.'",
      },
      {
        speakerId: 'inner-voice',
        text: "Italy: no flights. Mom: not informed. Apartment: no listings. Just words.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'future-5a',
        text: '"You talk a lot about the future. But none of it seems real."',
        nextSceneId: 'future-6-truth',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Direct confrontation. Let\'s see what happens.',
      },
      {
        id: 'future-5b',
        text: '"Maybe I\'m being too intense. Forget I asked."',
        nextSceneId: 'future-neutral-ending',
        feedback: 'You backed off. The fantasy continues.',
      },
    ],
  },
  {
    id: 'future-6-truth',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'What do you mean not real?' His voice gets defensive. 'I'm serious about you!' 'Then show me. One concrete thing you're actually doing to build this future you keep describing.'",
      },
      {
        text: "Silence. Long silence. 'I... I just talk about it because I'm excited about us.' 'Being excited isn't the same as building.'",
        speakerId: 'jake',
        emotion: 'confused',
      },
      {
        speakerId: 'inner-voice',
        text: "He has no answer. Because there is no answer.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'future-6a',
        text: '"Call me when you\'ve booked a flight. Or a dinner with your mom. Anything real."',
        nextSceneId: 'future-good-ending',
        isOptimal: true,
        xpBonus: 25,
        feedback: 'Perfect. Put the ball in his court. Action required for entry.',
      },
      {
        id: 'future-6b',
        text: '"I believe you\'re excited. Let\'s just take it slow."',
        nextSceneId: 'future-neutral-ending',
        feedback: 'You let him off the hook. The fantasy will continue.',
      },
    ],
  },
];
