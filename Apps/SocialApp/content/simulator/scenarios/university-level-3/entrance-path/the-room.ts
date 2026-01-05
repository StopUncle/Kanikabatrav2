import type { ForkScene } from '../../../types';

/**
 * Mission 11: The Entrance - The Room
 * Reading the power structure, spotting key players
 */
export const roomScenes: ForkScene[] = [
  {
    id: 'gala-room-scan',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    chapter: { name: 'The Entrance', index: 2, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'Charles moves on to greet other guests. You\'re alone in the crowd.',
      },
      {
        text: 'Blake returns with champagne. "Okay. I did recon."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"Victoria Ashworth. Far corner. Holding court."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Harrison Cole. By the bar. Talking to nobody. Everyone talking about him."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"And..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'He doesn\'t need to finish. You already see her.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-maris-spotted',
  },
  {
    id: 'gala-maris-spotted',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    mood: 'tense',
    dialog: [
      {
        text: 'Maris Caldwell. Center of the room. Everyone orbiting her gravity.',
      },
      {
        text: 'She\'s wearing white. Everyone else is in black. Of course she is.',
      },
      {
        text: 'And she\'s already looking at you.',
      },
      {
        text: 'Not surprised. Not curious. Calculating.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'maris-spotted-trap',
        text: 'Look away. Not ready for that yet.',
        nextSceneId: 'gala-maris-avoid',
        isOptimal: false,
        tactic: 'avoidance',
        reaction: {
          text: 'You feel her gaze follow you. She saw you flinch.',
          emotion: 'cold',
          bodyLanguage: 'Never show weakness to a predator.',
          scoreImpact: -15,
        },
      },
      {
        id: 'maris-spotted-subtle',
        text: 'Acknowledge with a nod. Then look elsewhere.',
        nextSceneId: 'gala-maris-acknowledge',
        isOptimal: false,
        tactic: 'polite-distance',
        reaction: {
          text: 'She nods back. Minimal. Noncommittal.',
          emotion: 'neutral',
          bodyLanguage: 'Neutral exchange. No ground lost.',
          scoreImpact: 5,
        },
      },
      {
        id: 'maris-spotted-close',
        text: 'Raise your glass to her. A silent toast.',
        nextSceneId: 'gala-maris-toast',
        isOptimal: false,
        tactic: 'bold-gesture',
        reaction: {
          text: 'Her eyebrow rises. Amused? Or annoyed? Hard to tell.',
          emotion: 'smirking',
          bodyLanguage: 'You drew attention. From her. From others watching her.',
          scoreImpact: 10,
        },
      },
      {
        id: 'maris-spotted-optimal',
        text: 'Hold her gaze. Three seconds. Then smile slightly and turn away first.',
        nextSceneId: 'gala-maris-controlled',
        isOptimal: true,
        tactic: 'power-play',
        reaction: {
          text: 'You feel her attention sharpen. You didn\'t flinch. But you didn\'t challenge. Interesting.',
          emotion: 'knowing',
          bodyLanguage: 'You controlled the interaction. She noticed.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'gala-maris-avoid',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"You okay?" Blake frowns.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Fine. Just... mapping the room."',
      },
      {
        text: 'He doesn\'t believe you. Neither do you.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-tyler-approaches',
  },
  {
    id: 'gala-maris-acknowledge',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'She returns to her conversation. You return to yours.',
      },
      {
        text: '"Was that her? THE Maris Caldwell?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"That was her."',
      },
      {
        text: '"She didn\'t eat you alive. That\'s good, right?"',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'The night is young.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-tyler-approaches',
  },
  {
    id: 'gala-maris-toast',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'A woman near Maris leans in. Whispers something. Maris laughs.',
      },
      {
        text: 'At you? With you? Impossible to tell.',
      },
      {
        text: '"Bold move." Blake sounds nervous.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Bold or stupid. We\'ll find out.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-tyler-approaches',
  },
  {
    id: 'gala-maris-controlled',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'You turn away on your terms. Not hers.',
      },
      {
        text: '"What just happened?" Blake whispers.',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Nothing. Everything. Hard to explain."',
      },
      {
        text: 'She\'ll come to you now. You set the hook.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-tyler-approaches',
  },
  {
    id: 'gala-tyler-approaches',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    mood: 'professional',
    dialog: [
      {
        text: '"Well, well, well. Look who made it to the big leagues."',
      },
      {
        text: 'Tyler. Club promoter Tyler. In a tuxedo now. Still loud.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: '"I told Elena you\'d show up eventually. She didn\'t believe me."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"Elena?"',
      },
      {
        text: '"My sister. You\'ll meet her. Everyone meets Elena."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
    ],
    dialogueChoices: [
      {
        id: 'tyler-trap',
        text: '"Good to see you, Tyler. How\'s the club scene?"',
        nextSceneId: 'gala-tyler-nostalgic',
        isOptimal: false,
        tactic: 'familiarity',
        reaction: {
          text: '"Oh, that\'s ancient history. I\'ve moved up." He gestures grandly.',
          emotion: 'happy',
          bodyLanguage: 'You reminded him of lesser times. He\'ll resent that.',
          scoreImpact: -5,
        },
      },
      {
        id: 'tyler-subtle',
        text: '"This is Blake. He\'s with me."',
        nextSceneId: 'gala-tyler-blake',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Nice to meet you." Tyler barely glances at Blake. His focus stays on you.',
          emotion: 'neutral',
          bodyLanguage: 'Tyler only cares about people who matter. To him, Blake doesn\'t.',
          scoreImpact: 0,
        },
      },
      {
        id: 'tyler-close',
        text: '"Tell me about Elena. What should I know?"',
        nextSceneId: 'gala-tyler-intel',
        isOptimal: false,
        tactic: 'information-seeking',
        reaction: {
          text: '"Oh, you\'ll find out. She has a way of... finding things out." He winks.',
          emotion: 'smirking',
          bodyLanguage: 'Cryptic. But useful.',
          scoreImpact: 10,
        },
      },
      {
        id: 'tyler-optimal',
        text: '"I remember you have interesting connections. Who should I avoid tonight?"',
        nextSceneId: 'gala-tyler-warns',
        isOptimal: true,
        tactic: 'strategic-use',
        reaction: {
          text: 'His eyes light up. Someone asking for his insight. He loves this.',
          emotion: 'happy',
          bodyLanguage: 'You made him feel important. He\'ll be useful now.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'gala-tyler-nostalgic',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"The clubs were stepping stones. This is where the real game is played."',
        speakerId: 'tyler',
        emotion: 'serious',
      },
      {
        text: 'He gestures around the room. "Networks. Information. Power."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"And where does Elena fit in?"',
      },
      {
        text: '"Elena IS the network." He laughs. "But you\'ll see."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'gala-entrance-complete',
  },
  {
    id: 'gala-tyler-blake',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'Blake takes the dismissal in stride. He\'s used to it.',
      },
      {
        text: '"I\'ll grab us drinks." He fades into the crowd.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Smart. Keeps his head down."',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: '"Unlike you?"',
      },
      {
        text: '"Unlike me, unlike you, unlike anyone who matters."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'gala-entrance-complete',
  },
  {
    id: 'gala-tyler-intel',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: '"Elena collects secrets. Trade. Leverage. That\'s her business."',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: '"Everyone has something they want kept quiet. Elena knows what it is."',
        speakerId: 'tyler',
        emotion: 'serious',
      },
      {
        text: '"Sounds dangerous."',
      },
      {
        text: '"Only if you have secrets." He grins. "You have secrets?"',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
      {
        text: 'Everyone has secrets.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-entrance-complete',
  },
  {
    id: 'gala-tyler-warns',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    dialog: [
      {
        text: 'Tyler leans in. Conspiratorial.',
      },
      {
        text: '"Victoria Ashworth thinks she runs this place. She doesn\'t. Harrison Cole does."',
        speakerId: 'tyler',
        emotion: 'serious',
      },
      {
        text: '"Dana Morrison is here. She\'s been talking to Victoria. A lot."',
        speakerId: 'tyler',
        emotion: 'concerned',
      },
      {
        text: '"And Maris..."',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: '"What about Maris?"',
      },
      {
        text: '"Maris doesn\'t need to be avoided. She decides if you\'re worth talking to. Not the other way around."',
        speakerId: 'tyler',
        emotion: 'serious',
      },
      {
        text: 'Hierarchy. Maris is at the top. Even Tyler knows it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-entrance-complete',
  },
  {
    id: 'gala-entrance-complete',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'entrance',
    chapter: { name: 'Mission Complete: The Entrance', index: 2, total: 5 },
    dialog: [
      {
        text: 'Tyler excuses himself. "Elena\'s calling. Good luck tonight."',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: 'He disappears into the crowd.',
      },
      {
        text: 'Blake returns. "Status report: we\'re alive. Victoria hasn\'t murdered us. Maris hasn\'t... whatever she does."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: 'Entrance: complete. Now the real games begin.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-approach-intro',
  },
];
