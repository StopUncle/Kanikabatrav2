import type { ForkScene } from '../../../../types';

/**
 * Party Path - Scene 4: The Test
 * Maris tests the player to see if they're useful or discardable
 * DEFENSIVE VERSION: Learning to recognize manipulation tests and maintain boundaries
 */
export const theTestScenes: ForkScene[] = [
  {
    id: 'party-the-test',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    chapter: {
      name: 'The Party',
      index: 3,
      total: 5,
    },
    dialog: [
      {
        text: 'Maris finds you again. This time, her approach is different. More deliberate. She\'s alone.',
      },
      {
        text: '"I\'ve been watching you." She leans against the wall beside you, casual. Intimate. "You\'re not like the others here."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: '"You\'re different. Special." Classic line.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'test-call-out',
        text: '"That\'s a line. What do you actually want?"',
        reaction: {
          text: 'Her smile freezes for a fraction of a second. Then she laughs—genuine or performed, impossible to tell. "Direct. I like that." Her eyes sharpen. "Most people just take the compliment."',
          emotion: 'smirking',
          bodyLanguage: 'You didn\'t fall for the love-bomb. She\'s recalibrating.',
          scoreImpact: 20,
        },
        nextSceneId: 'party-test-direct',
        isOptimal: true,
        tactic: 'see-through',
      },
      {
        id: 'test-accept',
        text: '"Different how?"',
        reaction: {
          text: '"You watch. You think. You don\'t just react." She moves closer. "I could use someone like you on my team."',
          emotion: 'seductive',
          bodyLanguage: 'She\'s making you feel special. That\'s the trap.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-test-offer',
      },
      {
        id: 'test-deflect',
        text: '"Everyone\'s different. That\'s kind of the point."',
        reaction: {
          text: 'She tilts her head, studying you. "Philosophical. Interesting." She doesn\'t sound interested. She sounds like she\'s filing you away.',
          emotion: 'neutral',
          bodyLanguage: 'You deflected but didn\'t engage. She\'s losing interest.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-test-offer',
      },
    ],
  },
  {
    id: 'party-test-direct',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Maris leans back, giving you space. Reassessing.',
      },
      {
        text: '"Okay. Cards on the table." She spreads her hands. "I\'m putting together a team for the case competition. Smart people. The kind who can actually execute. I think you might be one of them."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'She dropped the seduction act. This is the real ask.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'direct-questions',
        text: '"What\'s in it for me? Specifically."',
        reaction: {
          text: '"Connections. Introductions. Doors that stay closed for most people." She shrugs. "Or you can grind alone like everyone else."',
          emotion: 'neutral',
          bodyLanguage: 'Transactional. At least she\'s being honest about it now.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-decision',
        isOptimal: true,
        tactic: 'negotiate',
      },
      {
        id: 'direct-skeptical',
        text: '"And what do you get?"',
        reaction: {
          text: '"I get to win." She doesn\'t blink. "I don\'t lose. Ever. And I need people who can help me not lose."',
          emotion: 'cold',
          bodyLanguage: 'At least she\'s not pretending it\'s about friendship.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-decision',
      },
      {
        id: 'direct-agree',
        text: '"Tell me more."',
        reaction: {
          text: 'She smiles—genuine this time, or close to it. "Now we\'re talking." She pulls out her phone. "Let me get your number."',
          emotion: 'happy',
          bodyLanguage: 'You showed interest. She\'s moving to lock you in.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-decision',
      },
    ],
  },
  {
    id: 'party-test-offer',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Maris studies you for a long moment. Then she makes her move.',
      },
      {
        text: '"I\'m hosting a smaller gathering next weekend. Very exclusive. The people who actually matter." She pulls out a card. "Consider this your invitation."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'The golden ticket. But what\'s the price?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'offer-question',
        text: '"Why me?"',
        reaction: {
          text: '"Because you\'re interesting." She shrugs. "Or because I\'m curious what you\'d do with access. Either way—you\'re invited."',
          emotion: 'smirking',
          bodyLanguage: 'Vague. She didn\'t actually answer.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-decision',
      },
      {
        id: 'offer-hesitate',
        text: '"I\'ll think about it."',
        reaction: {
          text: 'Her smile doesn\'t waver. "Of course. It\'s an opportunity, not an obligation." But something in her eyes says she expected you to say yes.',
          emotion: 'neutral',
          bodyLanguage: 'Good. Don\'t jump at opportunities just because they\'re offered.',
          scoreImpact: 15,
        },
        nextSceneId: 'party-decision',
        isOptimal: true,
        tactic: 'don\'t-chase',
      },
      {
        id: 'offer-accept',
        text: '"I\'m in."',
        reaction: {
          text: '"Perfect." She pockets the card instead of giving it to you. "I\'ll have someone send you the details." She\'s already looking at someone else over your shoulder.',
          emotion: 'happy',
          bodyLanguage: 'You said yes too fast. Now she controls the next move.',
          scoreImpact: -10,
        },
        nextSceneId: 'party-decision',
      },
    ],
  },
  {
    id: 'party-decision',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    chapter: {
      name: 'The Party',
      index: 4,
      total: 5,
    },
    dialog: [
      {
        text: 'The party is winding down. Maris has moved on to other people, other prospects. But you feel her awareness of you like a heat on your back.',
      },
      {
        text: 'You have a choice to make. Not about Maris—about yourself.',
      },
      {
        text: 'What did you learn tonight?',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'decision-boundaries',
        text: 'The red flags were there. I saw them.',
        reaction: {
          text: 'Love-bombing. Instant intimacy. Treating people as supply. The mask slipping when challenged. You saw it all.',
          emotion: 'neutral',
          bodyLanguage: 'Pattern recognition. That\'s what keeps you safe.',
          scoreImpact: 25,
        },
        nextSceneId: 'ending-party-aware',
        isOptimal: true,
        tactic: 'pattern-mastery',
      },
      {
        id: 'decision-opportunity',
        text: 'Maris could be useful. Play it carefully.',
        reaction: {
          text: 'Maybe. But people like Maris rarely give without taking more. The question is: what will you pay?',
          emotion: 'neutral',
          bodyLanguage: 'Eyes open. That\'s what matters.',
          scoreImpact: 10,
        },
        nextSceneId: 'ending-party-cautious',
      },
      {
        id: 'decision-connection',
        text: 'Maybe I misjudged her. She seemed genuine sometimes.',
        reaction: {
          text: 'That\'s the trap. The moments that feel genuine. The hope that THIS time is different.',
          emotion: 'sad',
          bodyLanguage: 'Watch. Wait. Don\'t commit based on hope.',
          scoreImpact: -10,
        },
        nextSceneId: 'ending-party-hopeful',
      },
    ],
  },
];
