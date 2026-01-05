import type { ForkScene } from '../../../types';

/**
 * Ghost Path: Kai Chen
 * Your sponsor - loyal or distancing?
 */
export const kaiScenes: ForkScene[] = [
  {
    id: 'ghost-kai-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Ghosts', index: 1, total: 4 },
    mood: 'tense',
    dialog: [
      {
        text: 'Lunch in the main house. Smaller group. More intimate.',
      },
      {
        text: 'Kai Chen sits at the far end. She hasn\'t acknowledged you since arrival.',
      },
      {
        text: 'Blake notices. "Isn\'t that your... mentor? The one who brought you in?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"She\'s avoiding us."',
      },
      {
        text: 'Strategic distance. Or something worse.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-kai-approach',
  },
  {
    id: 'ghost-kai-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: 'After lunch. You catch Kai in the hallway.',
      },
      {
        text: '"Kai."',
      },
      {
        text: 'She stops. Doesn\'t turn immediately.',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: 'Then: "Not here." She whispers.',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"Garden pavilion. Fifteen minutes. Alone."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: 'She walks away before you can respond.',
      },
      {
        text: 'Something\'s wrong. Very wrong.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-kai-pavilion',
  },
  {
    id: 'ghost-kai-pavilion',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: 'The garden pavilion. Hidden from the main house.',
      },
      {
        text: 'Kai paces. Nervous. You\'ve never seen her nervous.',
      },
      {
        text: '"I shouldn\'t be talking to you." She starts without preamble.',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"Harrison\'s watching everything. Everyone. And after what happened at the gala..."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"What happened at the gala?"',
      },
      {
        text: 'Her eyes dart. "You don\'t know?"',
        speakerId: 'kai',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-kai-revelation',
  },
  {
    id: 'ghost-kai-revelation',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"Someone told Harrison about your... performance. At the gala."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"They made it sound like you were manipulating Maris. Playing both sides."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"Harrison doesn\'t like players he didn\'t create."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: '"Someone? Who?"',
      },
      {
        text: 'She hesitates. Fear in her eyes.',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: 'Someone betrayed us. Before we even arrived.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'kai-trap',
        text: '"Was it you? Did you tell him?"',
        nextSceneId: 'ghost-kai-accused',
        isOptimal: false,
        tactic: 'accusation',
        reaction: {
          text: 'Hurt flashes across her face. Then cold. "If you believe that, we\'re done."',
          emotion: 'angry',
          bodyLanguage: 'You insulted her. Even if justified, she\'s wounded.',
          scoreImpact: -15,
        },
      },
      {
        id: 'kai-millicent',
        text: '"Millicent already warned me. She\'s been helping me navigate this."',
        nextSceneId: 'ghost-kai-abandoned',
        isOptimal: false,
        tactic: 'honesty',
        reaction: {
          text: 'Her face goes white. Then red. "Millicent. You went to MILLICENT?"',
          emotion: 'angry',
          bodyLanguage: 'Abandonment trigger. Full force.',
          scoreImpact: -25,
        },
      },
      {
        id: 'kai-subtle',
        text: '"Why are you warning me? What\'s in it for you?"',
        nextSceneId: 'ghost-kai-motive',
        isOptimal: false,
        tactic: 'suspicion',
        reaction: {
          text: '"Because I brought you in. If you fall, I fall."',
          emotion: 'neutral',
          bodyLanguage: 'Self-interest. At least it\'s honest.',
          scoreImpact: 5,
        },
      },
      {
        id: 'kai-close',
        text: '"Tell me what you know. All of it. I need to protect myself."',
        nextSceneId: 'ghost-kai-intel',
        isOptimal: false,
        tactic: 'direct-request',
        reaction: {
          text: 'She nods. "That\'s the smart response."',
          emotion: 'knowing',
          bodyLanguage: 'You prioritized information. She respects that.',
          scoreImpact: 15,
        },
      },
      {
        id: 'kai-optimal',
        text: '"Whatever happened, we face it together. You brought me in—I won\'t let you go down alone."',
        nextSceneId: 'ghost-kai-ally',
        isOptimal: true,
        tactic: 'loyalty',
        reaction: {
          text: 'Something breaks in her expression. Relief. "You mean that?"',
          emotion: 'hopeful',
          bodyLanguage: 'You offered loyalty in a moment of fear. That matters.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-kai-accused',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Done." She steps back. Wall going up.',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: '"I risked everything bringing you here. And this is what you think of me."',
        speakerId: 'kai',
        emotion: 'angry',
      },
      {
        text: '"Figure out who your enemy is on your own."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: 'She walks away. Bridge burned.',
      },
      {
        text: 'We pushed too hard. Lost an ally.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-casey-intro',
  },
  {
    id: 'ghost-kai-abandoned',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: 'Kai\'s whole body goes rigid. Her breathing changes.',
      },
      {
        text: '"I sponsored you." Her voice shakes. "I believed in you. I put my NECK on the line for you. And you went to HER?"',
        speakerId: 'kai',
        emotion: 'angry',
      },
      {
        text: '"Kai, I was just—"',
      },
      {
        text: '"Don\'t." She holds up a hand. Tears are forming but her face is fury. "Don\'t you DARE explain. After everything I did for you."',
        speakerId: 'kai',
        emotion: 'angry',
      },
      {
        text: 'Panic and rage. Fused together. Indistinguishable.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: '"You know what? I should\'ve seen it. You\'re just like everyone else. Using people. Climbing. You never cared about me. Not really."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: 'She\'s rewriting everything. Every moment between you. Turning it all dark.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: '"Millicent will eat you alive. And when she does, don\'t come crawling back to me."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: 'She walks away. Not sad. Destroyed. You were supposed to be different.',
      },
    ],
    nextSceneId: 'ghost-casey-intro',
  },
  {
    id: 'ghost-kai-motive',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"If you fall, I fall." Kai steadies herself.',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"My credibility is tied to you now. Harrison\'s watching to see if my judgment was good."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"So yes, self-interest. But also... I believe in you."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: 'She looks away. Embarrassed by the admission.',
      },
      {
        text: 'Transactional trust. It\'s something.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-kai-warning',
  },
  {
    id: 'ghost-kai-intel',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"What I know." Kai speaks quickly. Quietly.',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"The report reached Harrison through Victoria\'s people. But Victoria didn\'t write it."',
        speakerId: 'kai',
        emotion: 'knowing',
      },
      {
        text: '"Someone at the gala. Someone who was watching you. Someone close."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"Think. Who was close to you that night?"',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: 'Close to us. Blake? No. Someone else.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-kai-warning',
  },
  {
    id: 'ghost-kai-ally',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"You mean that." Kai\'s voice cracks slightly.',
        speakerId: 'kai',
        emotion: 'hopeful',
      },
      {
        text: '"I\'ve been in this network for years. No one\'s ever said that to me."',
        speakerId: 'kai',
        emotion: 'sad',
      },
      {
        text: '"It\'s always transaction. Exchange. What can you do for me."',
        speakerId: 'kai',
        emotion: 'neutral',
      },
      {
        text: '"You just offered... loyalty. Real loyalty."',
        speakerId: 'kai',
        emotion: 'hopeful',
      },
      {
        text: 'We found something genuine. In a world of performance.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-kai-warning',
  },
  {
    id: 'ghost-kai-warning',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"One more thing." Kai looks around. Ensuring privacy.',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"Harrison\'s planning something tonight. A test. Not for everyone."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"Just for the new people. You, your friend, and Tyler."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: '"I don\'t know what it is. But be ready for anything."',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: 'Tonight. A test for the newcomers. Be ready.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ghost-casey-intro',
  },
];
