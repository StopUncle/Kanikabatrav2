import type { ForkScene } from '../../../types';

/**
 * Mission 19: Maris Evolution
 * Maris reveals her true nature on the island
 */
export const marisScenes: ForkScene[] = [
  {
    id: 'maris-appears',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'network',
    chapter: { name: 'The Tests', index: 2, total: 5 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'You and Blake walk toward the main house. Lunch awaits.',
      },
      {
        text: 'A voice behind you. Familiar. Changed.',
      },
      {
        text: '"Survived Harrison. I\'m impressed."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'Maris. She looks different in daylight. Sharper. Less performance.',
      },
      {
        text: '"Walk with me. Both of you."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Not a request. An instruction.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-garden-walk',
  },
  {
    id: 'maris-garden-walk',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'mysterious',
    dialog: [
      {
        text: 'She leads you through a garden. Away from the main house. Away from witnesses.',
      },
      {
        text: '"I want to show you something." She doesn\'t look back.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Blake walks beside you. Nervous but curious.',
      },
      {
        text: 'A clearing opens. A stone bench overlooking the ocean.',
      },
      {
        text: '"This is where Harrison made me who I am." She finally turns.',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Made her. Millicent\'s words echo.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-revelation',
  },
  {
    id: 'maris-revelation',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'tense',
    dialog: [
      {
        text: '"I was like you once." She sits on the bench. Gestures for you to join.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Smart. Ambitious. But naive. I didn\'t understand power."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Harrison taught me. Not gently. But effectively."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Blake stays standing. Watching her like a predator.',
      },
      {
        text: 'She\'s telling us her origin story. Why?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-choice-offered',
  },
  {
    id: 'maris-choice-offered',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'tense',
    dialog: [
      {
        text: '"You have a choice." She looks at you directly.',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: '"Learn from Harrison—slowly, painfully, breaking and rebuilding."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"Or learn from me. Faster. Still painful. But I know the shortcuts."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Millicent would tell you to refuse both. She\'s wrong."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'Two paths. Harrison\'s way or Maris\'s way. Both dangerous.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'maris-trap',
        text: '"What\'s the catch? There\'s always a catch."',
        nextSceneId: 'maris-catch-revealed',
        isOptimal: false,
        tactic: 'suspicion',
        reaction: {
          text: '"Catch?" She laughs. Cold. "The catch is becoming like me."',
          emotion: 'cold',
          bodyLanguage: 'Honest answer. That\'s the cost.',
          scoreImpact: 5,
        },
      },
      {
        id: 'maris-subtle',
        text: '"Why would you help us? What do you get?"',
        nextSceneId: 'maris-motivation',
        isOptimal: false,
        tactic: 'probing',
        reaction: {
          text: '"Legacy. Harrison has me. I want someone better."',
          emotion: 'knowing',
          bodyLanguage: 'She wants to create what Harrison created. Us.',
          scoreImpact: 10,
        },
      },
      {
        id: 'maris-close',
        text: '"What would your shortcuts teach me that Harrison wouldn\'t?"',
        nextSceneId: 'maris-teaching',
        isOptimal: false,
        tactic: 'value-assessment',
        reaction: {
          text: '"Speed. Protection. And how to survive being watched by gods."',
          emotion: 'smirking',
          bodyLanguage: 'Practical benefits. She knows what we need.',
          scoreImpact: 15,
        },
      },
      {
        id: 'maris-optimal',
        text: '"Show me. One lesson. Here. Now. Then I\'ll decide."',
        nextSceneId: 'maris-demonstration',
        isOptimal: true,
        tactic: 'proof-demand',
        reaction: {
          text: 'Her eyes light up. "Demanding. Good. That\'s lesson one."',
          emotion: 'happy',
          bodyLanguage: 'You showed you don\'t accept promises. You want proof.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'maris-catch-revealed',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Becoming like me." She lets the words hang.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"I don\'t sleep well. I don\'t trust anyone. I see weakness everywhere."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"But I never lose. I never depend. I never break."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Blake shifts beside you. Uncomfortable with the honesty.',
      },
      {
        text: 'The price of power. Is it worth paying?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-blake-challenge',
  },
  {
    id: 'maris-motivation',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Legacy." She looks at the ocean.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Harrison built this network. I\'m next in line. But I want my own... additions."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"People I found. People I shaped. Not his hand-me-downs."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: '"You could be my first. My prototype."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'Prototype. Like she was for Harrison. The cycle continues.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-blake-challenge',
  },
  {
    id: 'maris-teaching',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Speed." Maris ticks off fingers.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Harrison takes years to develop someone. I can do it in months."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Protection. I know his blind spots. Where he doesn\'t look."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: '"And survival. How to stay useful without becoming... disposable."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Disposable. She\'s seen people disposed. Probably helped.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-blake-challenge',
  },
  {
    id: 'maris-demonstration',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Lesson one." She stands. Circling slowly.',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: '"Never accept without verification. You just passed."',
        speakerId: 'maris',
        emotion: 'happy',
      },
      {
        text: '"Most people are so eager for mentorship they forget to ask: is this mentor worth following?"',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"You demanded proof. That\'s instinct. We can work with instinct."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'We turned her test back on her. She respects that.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-blake-challenge',
  },
  {
    id: 'maris-blake-challenge',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'tense',
    dialog: [
      {
        text: 'Maris turns to Blake. Her expression shifts. Harder.',
      },
      {
        text: '"And you. The loyal friend."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"What do you want from all this? Really?"',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Blake stiffens. "I\'m here to support—"',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"No." She cuts him off. "That\'s what you tell yourself. What do you WANT?"',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She\'s probing Blake. Testing the foundation.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-blake-exposed',
  },
  {
    id: 'maris-blake-exposed',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: 'Blake\'s jaw tightens. Then something breaks.',
      },
      {
        text: '"I want to stop being invisible." He says it quietly. Raw.',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"I want someone to see me as... more. Not just the nice friend. The safe one."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: 'Maris smiles. Cold satisfaction.',
      },
      {
        text: '"There it is. The wound that drives you."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'She found Blake\'s pressure point. First move.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-departure',
  },
  {
    id: 'maris-departure',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    mood: 'mysterious',
    dialog: [
      {
        text: '"We\'ll talk more. Soon." Maris walks away.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Think about my offer. But not too long. Others are watching."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'She disappears into the garden. Blake stares after her.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"I... I didn\'t mean to say that."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"It just came out."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: 'She extracted something. Blake\'s weakness is now known.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'blake-comfort-trap',
        text: '"Don\'t worry about it. Everyone has wounds."',
        nextSceneId: 'maris-blake-dismissed',
        isOptimal: false,
        tactic: 'dismissal',
        reaction: {
          text: 'He nods. But the openness fades. You minimized his vulnerability.',
          emotion: 'neutral',
          bodyLanguage: 'He needed acknowledgment. You gave platitudes.',
          scoreImpact: -5,
        },
      },
      {
        id: 'blake-comfort-subtle',
        text: '"She\'s good at finding pressure points. It\'s not your fault."',
        nextSceneId: 'maris-blake-defended',
        isOptimal: false,
        tactic: 'blame-shift',
        reaction: {
          text: '"Yeah. She is." He relaxes slightly. Grateful for the excuse.',
          emotion: 'neutral',
          bodyLanguage: 'You gave him cover. Helpful but not bonding.',
          scoreImpact: 10,
        },
      },
      {
        id: 'blake-comfort-close',
        text: '"I don\'t see you as invisible. You know that, right?"',
        nextSceneId: 'maris-blake-seen',
        isOptimal: false,
        tactic: 'reassurance',
        reaction: {
          text: 'He looks at you. Something vulnerable in his eyes. "Thanks."',
          emotion: 'hopeful',
          bodyLanguage: 'You addressed the wound directly. He needed that.',
          scoreImpact: 20,
        },
      },
      {
        id: 'blake-comfort-optimal',
        text: '"Now she knows your wound. That\'s dangerous. But it can also be a weapon."',
        nextSceneId: 'maris-blake-empowered',
        isOptimal: true,
        tactic: 'reframing',
        reaction: {
          text: 'He stares. "A weapon? How?"',
          emotion: 'curious',
          bodyLanguage: 'You transformed his vulnerability into strategy. He\'s engaged.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'maris-blake-dismissed',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Everyone has wounds." Blake echoes. His voice flat.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Sure. Let\'s just... get lunch."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: 'He walks ahead. Distance growing.',
      },
      {
        text: 'We minimized something important. Hairline crack in the friendship.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-kai-intro',
  },
  {
    id: 'maris-blake-defended',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"She\'s good." Blake shakes his head.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"I need to be more careful. Watch what I say."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"Let\'s go. I\'m starving."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Deflection accepted. He\'s composing himself.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-kai-intro',
  },
  {
    id: 'maris-blake-seen',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"Thanks." Blake\'s voice is quiet. Genuine.',
        speakerId: 'blake',
        emotion: 'hopeful',
      },
      {
        text: '"That\'s... that\'s why I\'m here, you know? You see me."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"These people don\'t. They see tools. Assets."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"But you... you\'re different."',
        speakerId: 'blake',
        emotion: 'hopeful',
      },
      {
        text: 'His trust. Real and fragile. Handle with care.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-kai-intro',
  },
  {
    id: 'maris-blake-empowered',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'network',
    dialog: [
      {
        text: '"A weapon." You explain. "She thinks she knows your weak point now."',
      },
      {
        text: '"But if you\'re aware of what she found—you can control how it\'s used."',
      },
      {
        text: 'Blake\'s expression shifts. Processing.',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"So... if she tries to use my invisibility thing against me..."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: '"You saw it coming. You prepared a response."',
      },
      {
        text: '"That\'s... actually brilliant."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: 'He\'s learning. Turning weakness into preparation.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-kai-intro',
  },
];
