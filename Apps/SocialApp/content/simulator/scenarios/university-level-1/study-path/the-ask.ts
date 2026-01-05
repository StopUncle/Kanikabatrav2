import type { ForkScene } from '../../../types';

/**
 * Study Hall Path - Scene 5: The Ask
 * Casey decides whether to offer the ticket
 */
export const theAskScenes: ForkScene[] = [
  {
    id: 'study-the-ask',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    chapter: {
      name: 'The Ask',
      index: 5,
      total: 5,
    },
    dialog: [
      {
        text: 'Casey taps her pen against her notebook. The common room lights flicker—almost closing time.',
      },
      {
        text: '"I have two spots. On the list." She says it casually, but she\'s watching your reaction carefully.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"One for me—not that I\'ll use it. And one for a plus-one."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'She\'s offering. But don\'t jump.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'ask-wait',
        text: 'Stay quiet. Let her finish.',
        reaction: {
          text: 'Casey takes a breath. "I was thinking... if you\'re not doing anything next Saturday..."',
          emotion: 'confused',
          bodyLanguage: 'You didn\'t pounce. That means something to her.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-her-offer',
        isOptimal: true,
        tactic: 'patient-reception',
      },
      {
        id: 'ask-encourage',
        text: '"That sounds like you have something in mind."',
        reaction: {
          text: 'She half-smiles. "Maybe. If you\'re interested."',
          emotion: 'happy',
          bodyLanguage: 'Gentle encouragement without grabbing.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-her-offer',
      },
      {
        id: 'ask-forward',
        text: '"Are you asking me to come with you?"',
        reaction: {
          text: 'Casey blinks. "I... was going to work up to it."',
          emotion: 'confused',
          bodyLanguage: 'You jumped ahead. She lost control of the moment.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-her-offer',
      },
    ],
  },
  {
    id: 'study-her-offer',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey sets down her pen. Looks at you directly for the first time all night.',
      },
      {
        text: '"Look. I don\'t know if you actually want to hang out with me, or if you\'re just being nice. But..." She trails off, then pushes through.',
        speakerId: 'casey',
        emotion: 'confused',
      },
      {
        text: '"The gala is going to be miserable. I\'ll be stuck at the door while everyone inside networks and drinks champagne. But if you came, at least I\'d have someone to complain to during my breaks."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She\'s not offering a ticket. She\'s offering company.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'offer-accept-genuine',
        text: '"That sounds like the best possible way to spend a Saturday night."',
        reaction: {
          text: 'Casey\'s face transforms. A real smile, bright and surprised. "Wait, really?"',
          emotion: 'happy',
          bodyLanguage: 'You chose HER over the event. She didn\'t expect that.',
          scoreImpact: 20,
        },
        nextSceneId: 'ending-study-success',
        isOptimal: true,
        tactic: 'value-demonstration',
      },
      {
        id: 'offer-accept-excited',
        text: '"I would love to go. This is really generous of you."',
        reaction: {
          text: '"Generous..." Something dims slightly in her expression. "Right. The ticket."',
          emotion: 'neutral',
          bodyLanguage: 'You focused on the ticket, not the company.',
          scoreImpact: 5,
        },
        nextSceneId: 'ending-study-success',
      },
      {
        id: 'offer-clarify',
        text: '"So I\'d be coming as your date, or just a friend?"',
        reaction: {
          text: 'Casey flushes red. "I—that\'s—I didn\'t mean—" She\'s flustered. Too much pressure.',
          emotion: 'confused',
          bodyLanguage: 'You made it weird. She wasn\'t ready for that.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-awkward-recovery',
      },
      {
        id: 'offer-betray',
        text: '"Actually, I was hoping to bring someone else. Can you just add me to the list?"',
        reaction: {
          text: 'Casey stares at you. "Wow." A long pause. "Okay."',
          emotion: 'cold',
          bodyLanguage: 'The light goes out of her eyes.',
          scoreImpact: -50,
        },
        nextSceneId: 'casey-betray-exit',
      },
    ],
  },
  {
    id: 'study-awkward-recovery',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'Casey is gathering her things, movements quick and embarrassed.',
      },
      {
        text: '"Sorry. I shouldn\'t have—it was stupid. Forget I said anything."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She\'s retreating. Fix this or lose her.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'awkward-save',
        text: '"Hey. Stop. I was being an idiot. Of course I want to come. With you. As whatever you want to call it."',
        reaction: {
          text: 'Casey pauses, bag half-zipped. "You\'re sure? Because you don\'t have to—"',
          emotion: 'confused',
          bodyLanguage: 'Directness. She needs that.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-final-confirmation',
        isOptimal: true,
      },
      {
        id: 'awkward-backpedal',
        text: '"I just meant—like, for logistics. Where should I meet you?"',
        reaction: {
          text: '"Oh. Right. Logistics." She doesn\'t look at you. "I\'ll text you."',
          emotion: 'sad',
          bodyLanguage: 'Deflecting with practicality. The warmth is gone.',
          scoreImpact: 0,
        },
        nextSceneId: 'ending-study-partial',
      },
      {
        id: 'awkward-let-go',
        text: '"If you\'ve changed your mind, I understand."',
        reaction: {
          text: '"Changed my—" Casey looks hurt. "I didn\'t change my mind. You made things weird."',
          emotion: 'sad',
          bodyLanguage: 'Passive response. You put the burden on her.',
          scoreImpact: -10,
        },
        nextSceneId: 'ending-study-partial',
      },
    ],
  },
  {
    id: 'study-final-confirmation',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey sets her bag back down. Takes a breath.',
      },
      {
        text: '"Okay. Saturday. 6pm. Meet me at the fountain in front of Caldwell Hall." She\'s trying to sound businesslike, but a smile keeps breaking through.',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: '"And dress nice. It\'s black tie. I\'ll be in a pantsuit because I\'ll be working, but you should look good."',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'Mission accomplished. But you might have gained more than a ticket.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'final-warmth',
        text: '"I\'ll be there. And Casey? Thanks. Not for the ticket. For tonight."',
        reaction: {
          text: 'She ducks her head, pleased. "Yeah. Me too." She waves once, then disappears into the night.',
          emotion: 'happy',
          bodyLanguage: 'You left her feeling valued. That\'s rare for her.',
          scoreImpact: 15,
        },
        nextSceneId: 'ending-study-success',
        isOptimal: true,
      },
      {
        id: 'final-practical',
        text: '"Black tie. Fountain. 6pm. Got it. See you Saturday."',
        reaction: {
          text: '"See you Saturday." She\'s still smiling as she leaves.',
          emotion: 'happy',
          bodyLanguage: 'Efficient. The connection is there, if slightly cooled.',
          scoreImpact: 5,
        },
        nextSceneId: 'ending-study-success',
      },
    ],
  },
];
