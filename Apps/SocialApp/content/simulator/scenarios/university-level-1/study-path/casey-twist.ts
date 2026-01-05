import type { ForkScene } from '../../../types';

/**
 * Study Hall Path - The Casey Twist
 * Casey doesn't have the access everyone thinks she has.
 * She lost it when her supervisor changed. She's been letting people
 * believe otherwise because it's the only reason anyone talks to her.
 */
export const caseyTwistScenes: ForkScene[] = [
  {
    id: 'study-the-confession',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    chapter: {
      name: 'The Confession',
      index: 5,
      total: 6,
    },
    dialog: [
      {
        text: 'Casey takes a breath. Then another. She looks like she\'s about to throw up.',
      },
      {
        text: '"I have to tell you something." Her voice is barely a whisper. "And you\'re going to hate me."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'Something\'s wrong.',
      },
      {
        text: '"The guest list access... the tickets..." She won\'t meet your eyes. "I don\'t have it anymore."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"My supervisor changed three weeks ago. The new one locked everything down. I\'m just... data entry now. I check names against a list I can\'t edit."',
        speakerId: 'casey',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'study-the-lie',
  },
  {
    id: 'study-the-lie',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: '"Then why did you—"',
      },
      {
        text: '"Because it\'s the only reason anyone talks to me!" The words explode out of her.',
        speakerId: 'casey',
        emotion: 'angry',
      },
      {
        text: 'Her eyes are wet now. She\'s shaking.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"Do you know what it\'s like? Being invisible. Then suddenly everyone wants to be your friend because of what you can DO for them. And when they found out I couldn\'t... they just... stopped."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"So I kept letting people think. Because at least they still SAT with me. Even if it was fake."',
        speakerId: 'casey',
        emotion: 'pleading',
      },
      {
        text: 'She used loneliness as a trap. Because loneliness was the trap she was already in.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    dialogueChoices: [
      {
        id: 'lie-stay',
        text: 'Don\'t move. Don\'t leave. "Okay."',
        reaction: {
          text: 'Casey blinks. "Okay? That\'s... that\'s it?" She looks confused, almost suspicious.',
          emotion: 'confused',
          bodyLanguage: 'She expected you to walk away. You didn\'t.',
          scoreImpact: 30,
        },
        nextSceneId: 'study-you-stayed',
        isOptimal: true,
        tactic: 'unconditional-presence',
      },
      {
        id: 'lie-angry',
        text: '"So this whole time... you were using me too."',
        reaction: {
          text: 'Casey flinches like you hit her. "I know. I\'m sorry. I just..." She can\'t finish.',
          emotion: 'sad',
          bodyLanguage: 'Fair. But not kind.',
          scoreImpact: -10,
        },
        nextSceneId: 'study-fair-point',
      },
      {
        id: 'lie-leave',
        text: 'Stand up. "I should go."',
        reaction: {
          text: 'Casey nods, unsurprised. "Yeah. I knew you would." She doesn\'t look up as you gather your things.',
          emotion: 'sad',
          bodyLanguage: 'Another one who left when she couldn\'t deliver.',
          scoreImpact: -50,
        },
        nextSceneId: 'casey-abandoned-exit',
      },
      {
        id: 'lie-understand',
        text: '"I get it. I really do. Loneliness makes you do stupid things."',
        reaction: {
          text: 'Casey looks at you like you\'re an alien. "You\'re not... mad?"',
          emotion: 'confused',
          bodyLanguage: 'Empathy when she expected anger. That\'s new.',
          scoreImpact: 25,
        },
        nextSceneId: 'study-you-stayed',
      },
    ],
  },
  {
    id: 'study-you-stayed',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey wipes her eyes. Takes a shaky breath. Then another. She looks at you like you\'re a mirage.',
      },
      {
        text: '"You\'re still here." Her voice cracks. "You stayed. You actually stayed."',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
      {
        text: 'She\'s staring at you like you just performed a miracle.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"I can\'t believe you\'re real." She laughs—watery, disbelieving. "Why? Why are you still here?"',
        speakerId: 'casey',
        emotion: 'pleading',
      },
      {
        text: 'Careful. This much gratitude is a hook too.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'stayed-honest',
        text: '"Because the gala wasn\'t the only reason I sat down."',
        reaction: {
          text: 'Casey\'s breath catches. Her eyes fill again—but different now. Hope, not shame. "Nobody\'s ever... I mean, NOBODY has ever said that. And meant it." She reaches for your hand. Holds tight.',
          emotion: 'happy',
          bodyLanguage: 'Instant attachment. You just became her anchor.',
          scoreImpact: 20,
        },
        nextSceneId: 'study-alternative-path',
        isOptimal: true,
        tactic: 'authentic-connection',
      },
      {
        id: 'stayed-practical',
        text: '"Because maybe there\'s another way to get in. Together."',
        reaction: {
          text: 'The light in her eyes dims slightly. "Oh. Right. The gala." She swallows. "At least you\'re still talking to me. That\'s... that\'s more than most."',
          emotion: 'sad',
          bodyLanguage: 'Transaction confirmed. The moment for more is slipping away.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-alternative-path',
      },
      {
        id: 'stayed-deflect',
        text: '"I don\'t know. It seemed like the right thing to do."',
        reaction: {
          text: 'Casey studies you. "The right thing." She nods slowly. "I\'ll take it. I don\'t get a lot of people doing the right thing around me."',
          emotion: 'neutral',
          bodyLanguage: 'Not the intensity she was offering. But not rejection either.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-alternative-path',
      },
    ],
  },
  {
    id: 'study-fair-point',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'Casey hugs herself, arms wrapped tight.',
      },
      {
        text: '"You\'re right. I was." She swallows hard. "I used the only thing I had. And now I don\'t even have that."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"I understand if you want to leave. Everyone else did."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'Your call. Walk away, or see what she\'s worth without the leverage.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'fair-stay-anyway',
        text: '"I\'m not everyone else."',
        reaction: {
          text: 'Casey looks up, startled. "What?"',
          emotion: 'confused',
          bodyLanguage: 'She expected abandonment. Not this.',
          scoreImpact: 25,
        },
        nextSceneId: 'study-alternative-path',
        isOptimal: true,
      },
      {
        id: 'fair-conditional',
        text: '"Maybe. But first—is there any other way you can help?"',
        reaction: {
          text: 'Casey\'s face falls. "Of course. Still about the gala." She sighs. "At least you asked nicely."',
          emotion: 'sad',
          bodyLanguage: 'Transactional to the end. But she\'s used to it.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-alternative-path',
      },
      {
        id: 'fair-leave',
        text: '"Yeah. I think I do want to leave."',
        reaction: {
          text: 'Casey nods slowly. "Thanks for being honest. Most people just ghost."',
          emotion: 'cold',
          bodyLanguage: 'She\'s already gone somewhere else. Somewhere safe.',
          scoreImpact: -30,
        },
        nextSceneId: 'casey-abandoned-exit',
      },
    ],
  },
  {
    id: 'study-alternative-path',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey sits back down. The tension bleeds out of her shoulders.',
      },
      {
        text: '"You know..." She hesitates. "I might not have access to the guest list. But I know things."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"Like Maris Caldwell\'s schedule. Her patterns. When she arrives, when she leaves, who she talks to. I\'ve been watching for two years."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'Intel. Sometimes that\'s more valuable than access.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"And... there\'s a guy. Jordan. He\'s the RA in Whitfield Hall. He knows people who want to... document what Maris does. What she really does."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"They call themselves The Watchers. He might be able to help you get in. If you tell him I sent you."',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
    ],
    dialogueChoices: [
      {
        id: 'alt-watchers',
        text: '"The Watchers? Tell me more."',
        reaction: {
          text: '"I don\'t know everything. But Jordan has a list. People Maris has..." She trails off. "They keep records. For when someone finally listens."',
          emotion: 'serious',
          bodyLanguage: 'This is real. Bigger than tickets.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-casey-intel',
        isOptimal: true,
        tactic: 'information-gathering',
      },
      {
        id: 'alt-schedule',
        text: '"The schedule could be useful. What do you know?"',
        reaction: {
          text: '"She always arrives at 8:15. Takes photos with donors until 9. Then disappears to the library wing for \'private meetings.\' Nobody knows what happens there."',
          emotion: 'neutral',
          bodyLanguage: 'Two years of observation compressed into facts.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-casey-intel',
      },
      {
        id: 'alt-appreciate',
        text: '"Casey. Thank you. Seriously."',
        reaction: {
          text: 'She ducks her head, embarrassed. "Don\'t thank me yet. You still need to get in the door."',
          emotion: 'happy',
          bodyLanguage: 'Gratitude. Simple and real. She\'s not used to it.',
          scoreImpact: 20,
        },
        nextSceneId: 'study-casey-intel',
      },
    ],
  },
  {
    id: 'study-casey-intel',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey writes something on a napkin. A phone number. A name.',
      },
      {
        text: '"Text Jordan. Tell him Casey Chen sent you. Tell him you want to know about the gala."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"And... if you do get in." She looks at you. "Maybe come find me during my break? I\'ll be at the registration desk until midnight."',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
      {
        text: 'She gave you a path forward. And asked for nothing but company.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'intel-promise',
        text: '"I\'ll find you. That\'s a promise."',
        reaction: {
          text: 'Casey\'s smile is small but real. "I\'ll hold you to that."',
          emotion: 'happy',
          bodyLanguage: 'A connection that survived the truth. That\'s rare.',
          scoreImpact: 15,
        },
        nextSceneId: 'ending-casey-connection',
        isOptimal: true,
      },
      {
        id: 'intel-practical',
        text: '"I\'ll do my best. Thanks for the contact."',
        reaction: {
          text: '"Good luck." She gathers her things. "I hope you get what you\'re looking for."',
          emotion: 'neutral',
          bodyLanguage: 'Professional. The moment for more has passed.',
          scoreImpact: 5,
        },
        nextSceneId: 'ending-casey-connection',
      },
    ],
  },
  // Exit for abandonment
  {
    id: 'casey-abandoned-exit',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    mood: 'cold',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'Another One Who Left',
    endingSummary:
      'Casey couldn\'t deliver what she promised. You left. Just like everyone else. She\'ll be more careful about what she claims next time. And more alone.',
    dialog: [
      {
        text: 'You gather your things. Casey doesn\'t watch you go.',
      },
      {
        text: '"Thanks for the conversation." Her voice is hollow. "Most people don\'t even say goodbye."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'The common room door closes behind you. The night air is cold.',
      },
      {
        text: 'You didn\'t get the gala. You didn\'t get a connection. You got nothing.',
      },
      {
        text: 'And Casey? She learned another lesson about what happens when she can\'t deliver.',
      },
    ],
  },
  // New ending for staying with Casey
  {
    id: 'ending-casey-connection',
    backgroundId: 'common-room',
    sceneType: 'ending',
    pathId: 'study-hall',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'More Than A Ticket',
    endingSummary:
      'Casey couldn\'t give you the gala access everyone thought she had. But she gave you something better: the truth, intel on Maris, and a connection to The Watchers. You stayed when she had nothing to offer. That meant more than any ticket.',
    dialog: [
      {
        text: 'Casey waves once from the common room doorway, then disappears into the night.',
      },
      {
        text: 'You look at the napkin. Jordan\'s number. A new path.',
      },
      {
        text: 'Casey couldn\'t get you into the gala. But she gave you something else. A map. Allies. And maybe a reason to come back.',
      },
      {
        text: 'The registration desk. Midnight. You\'ll be there.',
      },
      {
        text: 'She was worth more than her access. And now you both know it.',
      },
    ],
  },
];
