import type { ForkScene } from '../../../types';

/**
 * Study Hall Path - Scene 4: The Discovery
 * Learning Casey has access to gala tickets - the real test begins
 */
export const discoveryScenes: ForkScene[] = [
  {
    id: 'study-discovery',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    chapter: {
      name: 'The Discovery',
      index: 4,
      total: 5,
    },
    dialog: [
      {
        text: 'Casey\'s phone buzzes. She glances at it and sighs.',
      },
      {
        text: '"My boss. Again." She holds up the screen. "I work part-time for the Events Office. The Caldwell Gala is next weekend and everything is chaos."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'The gala. She works for the Events Office.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: '"I\'m on registration duty. Twelve hours of checking names against a list while everyone else is inside having the time of their lives." She laughs, but there\'s an edge to it.',
        speakerId: 'casey',
        emotion: 'sad',
      },
    ],
    dialogueChoices: [
      {
        id: 'disc-empathy',
        text: '"That sounds rough. Watching everyone else have fun while you\'re stuck at the door."',
        reaction: {
          text: '"Right?" She seems relieved someone gets it. "They keep saying I can \'pop in\' between shifts. As if."',
          emotion: 'sad',
          bodyLanguage: 'You didn\'t immediately pivot to what you want. She noticed.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-ticket-info',
        isOptimal: true,
        interactionType: 'validation',
        obsessionImpact: 10, // Empathy deepens attachment
      },
      {
        id: 'disc-curious',
        text: '"The Caldwell Gala? I\'ve heard about that. Pretty exclusive, right?"',
        reaction: {
          text: 'Her expression shifts slightly. Testing. "Yeah. Very. Why, trying to get in?"',
          emotion: 'neutral',
          bodyLanguage: 'Too direct. She\'s assessing your motives now.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-ticket-info',
        claimType: 'interested-in-gala',
        contradicts: ['just-looking-for-quiet', 'no-ticket-interest'],
        interactionType: 'supply',
      },
      {
        id: 'disc-redirect',
        text: '"At least it\'s good for your resume, right?"',
        reaction: {
          text: '"That\'s what they tell me." Her voice is flat. Corporate optimism isn\'t what she needs.',
          emotion: 'sad',
          bodyLanguage: 'Dismissive response. You just told her it\'s fine she\'s overlooked.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-ticket-info',
        interactionType: 'rejection', // Dismissing her feelings
      },
    ],
  },
  {
    id: 'study-ticket-info',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey taps on her phone, responding to the message.',
      },
      {
        text: '"The ironic thing? I have access to the guest list. I could technically add anyone I want." She pauses. "Not that I have anyone to add."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'There it is. She has the power. She just doesn\'t know what to do with it.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: 'She looks at you, then quickly away. Was that a hint? A test?',
      },
    ],
    dialogueChoices: [
      {
        id: 'info-ignore',
        text: 'Don\'t take the bait. "That sounds like a lot of responsibility. They must really trust you."',
        reaction: {
          text: 'Casey blinks, surprised. "Yeah. I guess they do." She seems thrown off that you didn\'t jump at the opening.',
          emotion: 'confused',
          bodyLanguage: 'You didn\'t pursue the obvious. That\'s... rare.',
          scoreImpact: 20,
        },
        nextSceneId: 'study-her-move',
        isOptimal: true,
        tactic: 'strategic-withdrawal',
        claimType: 'not-pursuing-tickets', // Deliberately ignoring the opportunity
        interactionType: 'validation',
        obsessionImpact: 15, // Standing out from others increases attachment
      },
      {
        id: 'info-subtle',
        text: '"No friends you want to bring? That seems like a waste."',
        reaction: {
          text: 'She hesitates. "I mean... I barely know anyone here. And the people I know..." She trails off.',
          emotion: 'sad',
          bodyLanguage: 'Gentle probe. She\'s considering the question seriously.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-her-move',
        interactionType: 'neutral',
        obsessionImpact: 5,
      },
      {
        id: 'info-ask',
        text: '"Wait, so you could get people in? That\'s actually kind of a big deal."',
        reaction: {
          text: 'Casey\'s face goes still. "Yeah. It is." A long pause. "Everyone figures that out eventually."',
          emotion: 'cold',
          bodyLanguage: 'The warmth vanishes. She saw this coming.',
          scoreImpact: -15,
        },
        nextSceneId: 'study-damage-control',
        claimType: 'wants-gala-access',
        contradicts: ['just-looking-for-quiet', 'no-ticket-interest', 'not-pursuing-tickets'],
        interactionType: 'supply',
        triggersMaskSlip: true, // Causes emotional withdrawal
      },
      {
        id: 'info-greedy',
        text: '"Wait, so how many people can you get in? Could you add like five?"',
        reaction: {
          text: 'Casey slams her notebook shut. "Are you serious right now?"',
          emotion: 'angry',
          bodyLanguage: 'Her hands are shaking. You\'ve seen this anger before.',
          scoreImpact: -50,
        },
        nextSceneId: 'casey-greedy-exit',
        interactionType: 'rejection',
        triggersMaskSlip: true,
      },
    ],
  },
  {
    id: 'study-her-move',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'The common room is emptying out. Just the two of you now, surrounded by the quiet hum of vending machines.',
      },
      {
        text: 'Casey closes her notebook. Takes a breath.',
      },
      {
        text: '"You\'re not like the others." She says it quietly, almost to herself. "Everyone who finds out about my job suddenly wants to be my best friend."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"But you... you didn\'t even ask."',
        speakerId: 'casey',
        emotion: 'curious',
      },
      {
        text: 'The test is flipping. She\'s about to make an offer.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'move-honest',
        text: '"I\'d be lying if I said I wasn\'t curious about the gala. But that\'s not why I sat down."',
        reaction: {
          text: 'Casey smiles. A real one. "I know. That\'s why I\'m telling you this."',
          emotion: 'happy',
          bodyLanguage: 'Honesty with boundaries. She respects that.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-the-confession',
        isOptimal: true,
        tactic: 'calibrated-honesty',
      },
      {
        id: 'move-humble',
        text: '"I figured if you wanted to talk about it, you would."',
        reaction: {
          text: '"See? That." She gestures at you. "That\'s what I mean. You actually listen."',
          emotion: 'happy',
          bodyLanguage: 'Respecting her agency. She\'s not used to that.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-the-confession',
      },
      {
        id: 'move-deflect',
        text: '"The gala doesn\'t matter. I just wanted to study somewhere quiet."',
        reaction: {
          text: 'Casey tilts her head. "Really? Because everyone else..." She trails off, not quite believing you.',
          emotion: 'confused',
          bodyLanguage: 'Complete denial seems suspicious. She\'s smart enough to see through it.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-the-confession',
      },
    ],
  },
  {
    id: 'study-damage-control',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'The warmth drains from the conversation. Casey is gathering her books, movements sharp.',
      },
      {
        text: '"You know, for a second there, I actually thought..." She doesn\'t finish.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'You\'re losing her. Fast.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'damage-honest',
        text: '"Wait. Yes, I want to go to the gala. But that\'s not why I stayed this long."',
        reaction: {
          text: 'Casey pauses, books half in her bag. "Then why?" Her voice is flat but there\'s a crack in it.',
          emotion: 'sad',
          bodyLanguage: 'Owning it without begging. She\'s listening.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-recovery-ask',
        isOptimal: true,
      },
      {
        id: 'damage-deny',
        text: '"No, I didn\'t mean it like that. I was just curious about your job."',
        reaction: {
          text: '"Sure." She doesn\'t believe you. The bag zips shut.',
          emotion: 'cold',
          bodyLanguage: 'Backpedaling. She\'s heard this before.',
          scoreImpact: -10,
        },
        nextSceneId: 'study-recovery-ask',
      },
      {
        id: 'damage-apologize',
        text: '"I\'m sorry. That came out wrong. Can we start over?"',
        reaction: {
          text: '"Start over?" Casey laughs, but it\'s hollow. "This always happens."',
          emotion: 'sad',
          bodyLanguage: 'Apologies are just damage control. She knows the pattern.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-recovery-ask',
      },
    ],
  },
  {
    id: 'study-recovery-ask',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'Casey stands by the table, bag on her shoulder. Not quite leaving, but not sitting back down.',
      },
      {
        text: '"Okay. Let\'s say I believe you. What would you do differently?"',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'A test within a test. Choose carefully.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'recask-action',
        text: '"Tomorrow. Coffee. No agenda. I\'ll prove I\'m not just another user."',
        reaction: {
          text: 'Casey considers this. "The cart by the library. 10am." She doesn\'t smile, but she doesn\'t leave either.',
          emotion: 'neutral',
          bodyLanguage: 'Action over words. She\'s giving you one more chance.',
          scoreImpact: 15,
        },
        nextSceneId: 'ending-study-partial',
        isOptimal: true,
        tactic: 'commitment-demonstration',
      },
      {
        id: 'recask-explain',
        text: '"I\'d explain that I genuinely enjoyed talking to you. The gala is secondary."',
        reaction: {
          text: '"Secondary." She repeats the word. "At least you\'re honest about it still being on your mind."',
          emotion: 'neutral',
          bodyLanguage: 'Words aren\'t enough anymore. But she\'s not leaving yet.',
          scoreImpact: 5,
        },
        nextSceneId: 'ending-study-partial',
      },
      {
        id: 'recask-accept',
        text: '"I don\'t know. Maybe there\'s nothing I can say that would change your mind."',
        reaction: {
          text: '"Maybe not." She adjusts her bag strap. "Thanks for the conversation, though. It was... nice. For a while."',
          emotion: 'sad',
          bodyLanguage: 'Resignation. You gave up too easily.',
          scoreImpact: -5,
        },
        nextSceneId: 'ending-study-fail',
      },
    ],
  },
];
