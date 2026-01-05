import type { ForkScene } from '../../../types';

/**
 * Failure Endings
 * The player failed to obtain a gala ticket
 */
export const failureEndings: ForkScene[] = [
  // Party Path Failure - Maris rejects you
  {
    id: 'ending-party-fail',
    backgroundId: 'party',
    sceneType: 'ending',
    pathId: 'party',
    mood: 'cold',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Forgotten',
    endingSummary: 'You failed to hold Maris Caldwell\'s interest. In her world, that\'s not punished—it\'s simply... erased. The gala doors are closed to you. But worse than rejection is irrelevance. People like Maris don\'t hate you. They just stop seeing you entirely.',
    dialog: [
      {
        text: 'The party continues inside. The bass still throbs. The beautiful people still laugh.',
      },
      {
        text: 'But you\'re on the wrong side of the glass now.',
      },
      {
        text: 'You can feel eyes sliding past you as you walk through the apartment. Not hostile. Not curious. Just... empty.',
      },
      {
        text: 'Maris said "maybe next time." That warmth in her voice was perfect. Perfectly meaningless. There is no next time with someone like her. You had one chance to be interesting. You weren\'t.',
      },
      {
        text: 'The elevator down takes forever. Your reflection in the mirrored doors looks smaller than it should.',
      },
      {
        text: 'The gala will happen without you. And Maris Caldwell has already forgotten your name.',
      },
    ],
  },

  // Study Path Failure - Casey loses trust
  {
    id: 'ending-study-fail',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    mood: 'cold',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Pattern Recognition',
    endingSummary: 'Casey saw through you. Or worse—she saw in you exactly what she expected to find. Another person who only cared about what she could offer. The ticket is gone. The connection is gone. And Casey Chen will never trust a stranger in the common room again.',
    dialog: [
      {
        text: 'Casey\'s footsteps fade down the hallway. She doesn\'t look back.',
      },
      {
        text: 'The common room feels emptier than it should. Just books and vending machines and the echo of a conversation that went wrong.',
      },
      {
        text: 'You replayed it in your head. Where did you push too hard? Or not hard enough? Where did she see through the performance?',
      },
      {
        text: 'It doesn\'t matter now. Casey Chen has learned one more lesson about people: they only want what she can give them.',
      },
      {
        text: 'And you? You learned that some targets are smarter than they look.',
      },
      {
        text: 'The gala is in a week. You\'ll need to find another way in. Or accept that some doors don\'t open.',
      },
    ],
  },

  // Complete Failure - Both paths closed
  {
    id: 'ending-both-fail',
    backgroundId: 'campus-quad',
    sceneType: 'ending',
    pathId: 'none',
    mood: 'cold',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Back to Zero',
    endingSummary: 'Both paths closed. Maris lost interest. Casey saw through you. The Caldwell Gala will happen without you, and all those connections, all those opportunities—they\'ll go to someone else. Someone who played the game better.',
    dialog: [
      {
        text: 'It\'s late. The campus is quiet. Just the occasional student walking between buildings.',
      },
      {
        text: 'You tried the party. You tried the study hall. Both doors closed.',
      },
      {
        text: 'Maris Caldwell saw someone not worth her time. Casey Chen saw someone who wanted her for what she had, not who she was.',
      },
      {
        text: 'Different conclusions. Same result.',
      },
      {
        text: 'The Caldwell Gala is next weekend. Everyone who matters will be there. You won\'t.',
      },
      {
        text: 'This isn\'t the end. There are other paths, other opportunities, other levels. But tonight? Tonight was a lesson. And lessons have costs.',
      },
    ],
  },

  // Gave up - Player chose to leave early
  {
    id: 'ending-gave-up',
    backgroundId: 'dorm-room',
    sceneType: 'ending',
    pathId: 'none',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Another Night',
    endingSummary: 'You chose not to play. The party went on without you. The study hall closed. Maybe you\'ll try again tomorrow. Or maybe you\'ll find a different angle entirely. The gala isn\'t for a week. There\'s still time.',
    dialog: [
      {
        text: 'Back in the dorm room. Alex is still out—probably at the party you left. Or never went to.',
      },
      {
        text: 'The ceiling is familiar. The bed is comfortable. And the Caldwell Gala still feels very far away.',
      },
      {
        text: 'Tomorrow there will be other opportunities. Other conversations. Other people with access to things you need.',
      },
      {
        text: 'Tonight was just reconnaissance. That\'s what you tell yourself.',
      },
      {
        text: 'The problem is—opportunity doesn\'t wait. While you\'re resting, someone else is building relationships. Making connections. Getting tickets.',
      },
      {
        text: 'But that\'s tomorrow\'s problem. Tonight, you rest.',
      },
    ],
  },
];
