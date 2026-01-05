import type { ForkScene } from '../../../types';

/**
 * Mission 15: The Final Choice - The Revelation
 * Hidden loyalties exposed. The truth comes out.
 */
export const revelationScenes: ForkScene[] = [
  {
    id: 'climax-revelation-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: '"Victoria. Would you share what you\'ve learned about our candidates?"',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Victoria steps forward. A folder in her hands. This doesn\'t feel good.',
      },
      {
        text: '"I\'ve done my research. As always."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: 'She opens the folder. Pages of information. Names. Dates. Events.',
      },
      {
        text: 'Is that about you?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-exposure',
  },
  {
    id: 'climax-exposure',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: '"Candidate one: financial irregularities. Candidate two: fabricated credentials."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'The other two candidates pale. They\'re done.',
      },
      {
        text: 'Victoria turns to you. The moment stretches.',
      },
      {
        text: '"And candidate three..."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'She pauses. Dramatic effect.',
      },
      {
        text: '"...made some very interesting choices getting here tonight."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'climax-your-record',
  },
  {
    id: 'climax-your-record',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: '"Dana Morrison shared quite a story. So did a few others."',
        speakerId: 'victoria',
        emotion: 'seductive',
      },
      {
        text: '"Strategic networking. Calculated relationships. Using people as stepping stones."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'The crowd murmurs. Judgment in their eyes.',
      },
      {
        text: '"The question is: does that disqualify you? Or qualify you?"',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: 'She\'s not destroying you. She\'s testing the room\'s reaction.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'exposure-trap',
        text: '"That\'s not fair! You\'re taking things out of context!"',
        nextSceneId: 'climax-maris-intervenes',
        isOptimal: false,
        tactic: 'defensive',
        reaction: {
          text: '"Fair." Victoria laughs. "How charmingly naive."',
          emotion: 'smirking',
          bodyLanguage: 'You defended. You showed weakness.',
          scoreImpact: -20,
        },
      },
      {
        id: 'exposure-subtle',
        text: 'Stay silent. Let the accusation hang. Don\'t dignify it.',
        nextSceneId: 'climax-maris-intervenes',
        isOptimal: false,
        tactic: 'stone-wall',
        reaction: {
          text: 'Victoria raises an eyebrow. "No defense? Interesting."',
          emotion: 'knowing',
          bodyLanguage: 'Silence can be read as guilt. Or strength.',
          scoreImpact: 5,
        },
      },
      {
        id: 'exposure-close',
        text: '"Everything I did, I did to get here. To this moment. I\'d do it again."',
        nextSceneId: 'climax-maris-intervenes',
        isOptimal: false,
        tactic: 'own-it',
        reaction: {
          text: 'A ripple through the crowd. Respect? Disgust? Both?',
          emotion: 'neutral',
          bodyLanguage: 'Bold. Maybe too bold.',
          scoreImpact: 10,
        },
      },
      {
        id: 'exposure-optimal',
        text: '"I played the game with the rules I was given. If that\'s disqualifying, this room should be empty."',
        nextSceneId: 'climax-maris-intervenes',
        isOptimal: true,
        tactic: 'mirror-back',
        reaction: {
          text: 'Harrison actually smiles. Several people shift uncomfortably.',
          emotion: 'smirking',
          bodyLanguage: 'You called out the hypocrisy. They can\'t argue.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'climax-maris-intervenes',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: '"If I may."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Maris steps forward. The room goes quiet. She commands attention without raising her voice.',
      },
      {
        text: '"I brought this candidate to your attention. I\'ll vouch for them."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Victoria\'s expression flickers. She didn\'t expect this.',
      },
      {
        text: 'Maris is putting her reputation on the line. For you.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-maris-defense',
  },
  {
    id: 'climax-maris-defense',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: '"What Victoria calls \'using people\'... I call understanding leverage."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"What she calls \'calculated relationships\'... I call efficient networking."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She turns to the crowd. Direct challenge.',
      },
      {
        text: '"How many of you got here through pure merit? Without a single strategic alliance?"',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'No one answers. Because they can\'t.',
      },
      {
        text: '"This candidate did what we all did. They just did it faster."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'climax-decision-intro',
  },
];
