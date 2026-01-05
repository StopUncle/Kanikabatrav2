import type { ForkScene } from '../../../types';

/**
 * Secret Path - Scene 2 & 3: The Predator's Circle
 * Jordan reveals the underground network that tracks Maris's victims.
 * The player learns critical intel that will help in later levels.
 */
export const circleScenes: ForkScene[] = [
  {
    id: 'secret-the-circle',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'mysterious',
    chapter: {
      name: 'The Circle',
      index: 1,
      total: 4,
    },
    dialog: [
      {
        text: 'You sit. Jordan leans forward.',
      },
      {
        text: '"We call ourselves The Watchers. Dramatic, I know. But it fits."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: 'One of the strangers speaks. Dark hair, tired eyes. "Maris Caldwell destroyed my sister. Junior year. She was valedictorian material. Now she\'s on medical leave."',
      },
      {
        text: '"And she\'s not the only one," Jordan adds. "We\'ve been tracking this for two years. Twelve confirmed. Three still haven\'t recovered."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: 'Twelve. In two years.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'circle-believe',
        text: '"I believe you. I saw her work the room tonight."',
        reaction: {
          text: 'Jordan nods slowly. "Then you understand why we need people who can get close. And not break."',
          emotion: 'neutral',
          bodyLanguage: 'Respect in those eyes. You passed the first test.',
          scoreImpact: 15,
        },
        nextSceneId: 'secret-the-intel',
        isOptimal: true,
        interactionType: 'validation',
      },
      {
        id: 'circle-skeptical',
        text: '"Twelve victims? That sounds like gossip, not data."',
        reaction: {
          text: 'The dark-haired stranger pulls out a folder. Photos. Medical records. "We document everything. Want proof? Pick a name."',
          emotion: 'cold',
          bodyLanguage: 'These people are serious. And thorough.',
          scoreImpact: 5,
        },
        nextSceneId: 'secret-the-intel',
        tactic: 'verify',
      },
      {
        id: 'circle-dangerous',
        text: '"This sounds like you\'re planning something illegal."',
        reaction: {
          text: '"We\'re planning exposure," Jordan says flatly. "When the time is right. With evidence that can\'t be ignored."',
          emotion: 'serious',
          bodyLanguage: 'Patient. They\'ve heard this objection before.',
          scoreImpact: 0,
        },
        nextSceneId: 'secret-the-intel',
      },
    ],
  },
  {
    id: 'secret-the-intel',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'mysterious',
    chapter: {
      name: 'The Circle',
      index: 2,
      total: 4,
    },
    dialog: [
      {
        text: 'Jordan slides a thin folder across the table. "Her playbook. We\'ve mapped it."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'You open it. Inside: a flowchart. Love bomb → Idealize → Test loyalty → Isolate → Discard → Smear.',
      },
      {
        text: '"She has a twin sister," the other stranger adds. "Millie. Borderline. Maris uses her as a hatchet when she needs plausible deniability."',
      },
      {
        text: 'Twin. That\'s why you heard whispers about "the other Caldwell" at the party.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'intel-absorb',
        text: 'Study the flowchart. Memorize the stages.',
        reaction: {
          text: 'Love bomb. Idealize. Test. Isolate. Discard. Smear. You burn it into memory.',
          emotion: 'neutral',
          bodyLanguage: 'Knowledge is armor.',
          scoreImpact: 20,
        },
        nextSceneId: 'secret-the-offer',
        isOptimal: true,
        interactionType: 'neutral',
      },
      {
        id: 'intel-millie',
        text: '"Tell me more about Millie."',
        reaction: {
          text: '"BPD. Intense. Desperate for validation. Maris exploits that." Jordan pauses. "She might help you. But she\'ll always side with her sister in the end."',
          emotion: 'serious',
          bodyLanguage: 'A warning. Filed away.',
          scoreImpact: 15,
        },
        nextSceneId: 'secret-the-offer',
        tactic: 'gather-intel',
      },
      {
        id: 'intel-dismiss',
        text: '"I don\'t need a manual. I can read people."',
        reaction: {
          text: 'The dark-haired stranger laughs bitterly. "My sister said the same thing. Word for word."',
          emotion: 'cold',
          bodyLanguage: 'Silence falls. Heavy.',
          scoreImpact: -15,
        },
        nextSceneId: 'secret-the-offer',
        triggersMaskSlip: true,
      },
    ],
  },
  {
    id: 'secret-the-offer',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'tense',
    chapter: {
      name: 'The Circle',
      index: 3,
      total: 4,
    },
    dialog: [
      {
        text: 'Jordan stands. "Here\'s the deal. We can get you into the gala. Back channels."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"But we need something in return. Information. What she says. Who she targets. When her mask slips."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: 'Spy work. With Maris as the mark.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'offer-accept',
        text: '"Deal. I was going in anyway. Now I have backup."',
        reaction: {
          text: 'Jordan extends a hand. "Welcome to The Watchers. We\'ll be in touch."',
          emotion: 'neutral',
          bodyLanguage: 'A handshake that means something. Allies.',
          scoreImpact: 25,
        },
        nextSceneId: 'secret-the-ticket',
        isOptimal: true,
        interactionType: 'supply',
      },
      {
        id: 'offer-negotiate',
        text: '"What do I get beyond the ticket?"',
        reaction: {
          text: '"Protection. If she targets you, we expose her. Mutually assured destruction." Jordan\'s smile is thin. "It\'s worked before."',
          emotion: 'smirking',
          bodyLanguage: 'A safety net. That\'s worth something.',
          scoreImpact: 15,
        },
        nextSceneId: 'secret-the-ticket',
        tactic: 'negotiate',
      },
      {
        id: 'offer-refuse',
        text: '"I\'m not a spy. I\'ll find my own way in."',
        reaction: {
          text: 'Jordan shrugs. "Your choice. But when she turns on you—and she will—don\'t say we didn\'t offer."',
          emotion: 'cold',
          bodyLanguage: 'No anger. Just... patience. They\'ve seen this before.',
          scoreImpact: -10,
        },
        nextSceneId: 'the-fork',
      },
    ],
  },
  {
    id: 'secret-the-ticket',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'secret',
    mood: 'peaceful',
    chapter: {
      name: 'The Circle',
      index: 4,
      total: 4,
    },
    dialog: [
      {
        text: 'The other stranger reaches into a bag. Pulls out an envelope. "Registration desk owed me a favor."',
      },
      {
        text: 'Inside: a gold-embossed ticket. THE CALDWELL GALA. Your name is already on it.',
      },
      {
        text: '"One more thing." Jordan holds up a phone. "Encrypted. Burner. If you see something, send it here. We\'ll do the rest."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'A ticket. A network. And intel about the enemy. Not bad for skipping the party.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'ticket-confident',
        text: 'Pocket the ticket. "See you at the gala."',
        reaction: {
          text: 'Jordan nods. "Watch your back in there. She\'ll be hunting." The meeting disperses. You walk out armed.',
          emotion: 'neutral',
          bodyLanguage: 'A new game. And now you know the rules.',
          scoreImpact: 15,
        },
        nextSceneId: 'ending-secret-success',
        isOptimal: true,
      },
      {
        id: 'ticket-cautious',
        text: '"What if she finds out about The Watchers?"',
        reaction: {
          text: '"She already knows we exist. She just doesn\'t know who." Jordan pauses. "Keep it that way."',
          emotion: 'serious',
          bodyLanguage: 'A reminder. Secrecy is survival.',
          scoreImpact: 10,
        },
        nextSceneId: 'ending-secret-success',
      },
      {
        id: 'ticket-grateful',
        text: '"Thank you. For all of this."',
        reaction: {
          text: '"Don\'t thank us yet." The dark-haired stranger stands. "Thank us when Maris is exposed. And you\'re still standing."',
          emotion: 'neutral',
          bodyLanguage: 'A sobering reminder. This is just the beginning.',
          scoreImpact: 5,
        },
        nextSceneId: 'ending-secret-success',
      },
    ],
  },
];
