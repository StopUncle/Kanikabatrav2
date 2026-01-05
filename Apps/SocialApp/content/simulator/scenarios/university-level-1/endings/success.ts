import type { ForkScene } from '../../../types';

/**
 * Success Endings
 * The player successfully obtained a gala ticket
 */
export const successEndings: ForkScene[] = [
  // Party Path Success - Maris gives you the ticket
  {
    id: 'ending-party-success',
    backgroundId: 'apartment',
    sceneType: 'ending',
    pathId: 'party',
    mood: 'mysterious',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Inner Circle',
    endingSummary: 'You navigated Maris Caldwell\'s games and held her attention. The gala ticket isn\'t just admission—it\'s an invitation into a world of power and influence. But Maris never gives anything for free. This is the beginning of a longer game.',
    dialog: [
      {
        text: 'The ticket feels heavier than paper should. The Caldwell crest catches the balcony light.',
      },
      {
        text: 'Maris is already walking back inside. At the door, she pauses. Glances over her shoulder.',
      },
      {
        text: '"Most people who come to my parties want something. Most people I can read in five minutes." Her smile curves. "You took all night."',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: '"I don\'t know if that makes you interesting or dangerous." She tilts her head. "I guess we\'ll find out."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'The glass door slides shut. You\'re alone with the city lights and a ticket worth more than money.',
      },
      {
        text: 'The gala is just the beginning. Maris Caldwell doesn\'t make friends. She collects people. You just became part of her collection.',
      },
    ],
  },

  // Study Path Success - Casey invites you to the gala
  {
    id: 'ending-study-success',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Quiet Win',
    endingSummary: 'You built a genuine connection with Casey Chen. The gala access came as a gift, not a transaction. You got what you needed—and maybe something more. Casey doesn\'t know she just gave a stranger a ticket to the most exclusive event of the year. Or maybe she does.',
    dialog: [
      {
        text: 'Casey waves once from the common room doorway, then disappears into the night.',
      },
      {
        text: 'You have what you came for. A ticket to the Caldwell Gala. But somewhere along the way, the extraction became something else.',
      },
      {
        text: 'She was lonely. You saw that immediately. Used it, maybe. But also... recognized it.',
      },
      {
        text: 'The common room is quiet now. Just the hum of the vending machines and the soft glow of exit signs.',
      },
      {
        text: 'Saturday. The fountain. 6pm. You\'ll be there. But for the gala? Or for her?',
      },
      {
        text: 'Maybe it doesn\'t matter. You got what you needed. And Casey got something she needed too.',
      },
    ],
  },

  // Secret Path Success - The Watchers gave you the ticket and intel
  {
    id: 'ending-secret-success',
    backgroundId: 'hallway',
    sceneType: 'ending',
    pathId: 'secret',
    mood: 'mysterious',
    isEnding: true,
    outcomeType: 'excellent',
    endingTitle: 'The Watchers',
    endingSummary: 'You found the hidden path. Jordan and The Watchers have armed you with more than a ticket—you have intel, allies, and knowledge of Maris\'s playbook. Most people walk into the gala blind. You\'ll walk in with a map.',
    dialog: [
      {
        text: 'The common room is empty now. The Watchers scattered like smoke.',
      },
      {
        text: 'You have the ticket. Gold-embossed, your name already printed. But that\'s not what matters.',
      },
      {
        text: 'Love bomb. Idealize. Test. Isolate. Discard. Smear. You know the pattern now. You\'ll see it coming.',
      },
      {
        text: 'And when Maris makes her move? You won\'t be alone.',
      },
      {
        text: 'The burner phone is heavy in your pocket. A lifeline. A weapon. Twelve victims, Jordan said. You won\'t be number thirteen.',
      },
      {
        text: 'The gala awaits. And for the first time, Maris Caldwell won\'t be the only one playing games.',
      },
    ],
  },

  // Study Path Partial Success - You have a connection but no clear ticket
  {
    id: 'ending-study-partial',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Unfinished Business',
    endingSummary: 'Casey offered coffee. Not the gala. The connection is there, but you pushed too hard or not hard enough. There might still be a path to the ticket, but it requires more work. Tomorrow. 10am. The coffee cart.',
    dialog: [
      {
        text: 'Casey is gone. The common room slowly empties.',
      },
      {
        text: 'You don\'t have the ticket. Not yet. But you have something almost as valuable: a second chance.',
      },
      {
        text: 'Tomorrow. Coffee. The cart by the library. She gave you that much.',
      },
      {
        text: 'The gala is in a week. That\'s seven days to turn a tentative connection into a real one. Seven days to prove you\'re not just another person who wants something from her.',
      },
      {
        text: 'Or seven days to figure out another way in.',
      },
      {
        text: 'Either way—the night wasn\'t wasted. Just... incomplete.',
      },
    ],
  },
];
