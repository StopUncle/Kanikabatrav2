import type { ForkScene } from '../../../types';

/**
 * Mission 17: Private Jet
 * Meet other players during the flight to the island
 */
export const jetScenes: ForkScene[] = [
  {
    id: 'jet-boarding',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    chapter: { name: 'The Journey', index: 4, total: 6 },
    mood: 'professional',
    dialog: [
      {
        text: 'Private airstrip. Dawn.',
      },
      {
        text: 'The jet is smaller than expected. Intimate. Maybe twelve seats.',
      },
      {
        text: 'A woman in a tailored uniform checks your names against a tablet.',
      },
      {
        text: '"You\'re the last to board. The others are waiting."',
      },
      {
        text: 'Others. Plural.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'jet-interior',
  },
  {
    id: 'jet-interior',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'tense',
    dialog: [
      {
        text: 'Inside. Leather seats arranged in facing pairs. Three people already seated.',
      },
      {
        text: 'You recognize Dominic Reyes immediately. Tech billionaire. Cold eyes behind designer glasses.',
      },
      {
        text: 'Beside him: Isabelle Laurent. French financier. Her smile doesn\'t reach her eyes.',
      },
      {
        text: 'And in the back: Tyler Vance. Elena\'s brother. Looking unexpectedly nervous.',
      },
      {
        text: 'Blake grips your arm. "That\'s... those are..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'The real players. And now we\'re sitting with them.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-dominic-intro',
  },
  {
    id: 'jet-dominic-intro',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'cold',
    dialog: [
      {
        text: 'Dominic looks up as you enter. His gaze is clinical.',
      },
      {
        text: '"The new additions." He doesn\'t stand. "Harrison mentioned you."',
        speakerId: 'dominic',
        emotion: 'cold',
      },
      {
        text: '"He mentioned your potential. And your... interesting connections."',
        speakerId: 'dominic',
        emotion: 'neutral',
      },
      {
        text: 'He\'s cataloging you. Every detail.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'dominic-trap',
        text: '"Thank you for having us, Mr. Reyes."',
        nextSceneId: 'jet-dominic-dismissive',
        isOptimal: false,
        tactic: 'deference',
        reaction: {
          text: '"Polite." He returns to his tablet. Dismissed.',
          emotion: 'cold',
          bodyLanguage: 'Deference bored him. You\'re furniture now.',
          scoreImpact: -10,
        },
      },
      {
        id: 'dominic-subtle',
        text: '"Harrison is generous with his recommendations."',
        nextSceneId: 'jet-dominic-curious',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Generous." A flicker of amusement. "That\'s one word for it."',
          emotion: 'smirking',
          bodyLanguage: 'You didn\'t grovel. Noted.',
          scoreImpact: 10,
        },
      },
      {
        id: 'dominic-close',
        text: '"I\'ve read about your work. The Algorithm, they call you."',
        nextSceneId: 'jet-dominic-interested',
        isOptimal: false,
        tactic: 'research',
        reaction: {
          text: 'His eyes sharpen. "You\'ve done homework. Most new guests don\'t bother."',
          emotion: 'neutral',
          bodyLanguage: 'You showed preparation. He respects data.',
          scoreImpact: 15,
        },
      },
      {
        id: 'dominic-optimal',
        text: '"Connections are assets. Harrison seems to collect them strategically."',
        nextSceneId: 'jet-dominic-impressed',
        isOptimal: true,
        tactic: 'network-thinking',
        reaction: {
          text: 'He actually looks at you now. Really looks. "You understand the architecture."',
          emotion: 'knowing',
          bodyLanguage: 'You spoke his language. Network. Systems. Strategy.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'jet-dominic-dismissive',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: 'Dominic returns to his tablet. Conversation over.',
      },
      {
        text: 'Isabelle watches the exchange with interest.',
      },
      {
        text: '"Don\'t take it personally." Her accent is precise. "Dominic dismisses most people."',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: '"Most." The word implies you\'re in that category.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'jet-isabelle-intro',
  },
  {
    id: 'jet-dominic-curious',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"One word for it." Dominic repeats. Almost smiling.',
        speakerId: 'dominic',
        emotion: 'smirking',
      },
      {
        text: '"Harrison is... strategic. As are his choices."',
        speakerId: 'dominic',
        emotion: 'neutral',
      },
      {
        text: 'Isabelle leans forward. "You didn\'t grovel. Interesting."',
        speakerId: 'isabelle',
        emotion: 'curious',
      },
      {
        text: 'First test passed. Barely.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-isabelle-intro',
  },
  {
    id: 'jet-dominic-interested',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"The Algorithm." He tilts his head. "A simplification. But accurate enough."',
        speakerId: 'dominic',
        emotion: 'neutral',
      },
      {
        text: '"Most people are predictable. I simply... predict faster."',
        speakerId: 'dominic',
        emotion: 'knowing',
      },
      {
        text: '"And you? What makes you predict?"',
        speakerId: 'dominic',
        emotion: 'curious',
      },
      {
        text: 'He\'s testing you already.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-isabelle-intro',
  },
  {
    id: 'jet-dominic-impressed',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"The architecture." He sets down his tablet. Fully engaged now.',
        speakerId: 'dominic',
        emotion: 'knowing',
      },
      {
        text: '"Yes. Networks within networks. Nodes of influence. Harrison as the hub."',
        speakerId: 'dominic',
        emotion: 'neutral',
      },
      {
        text: '"And you see that already. Most new guests take years."',
        speakerId: 'dominic',
        emotion: 'curious',
      },
      {
        text: 'You\'re on his radar now. For better or worse.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-isabelle-intro',
  },
  {
    id: 'jet-isabelle-intro',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'mysterious',
    dialog: [
      {
        text: 'Isabelle Laurent crosses her legs. Studies you with the precision of a surgeon.',
      },
      {
        text: '"I heard about the gala. The Caldwell girl took interest in you."',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: '"Maris doesn\'t take interest lightly. Neither does her twin."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: '"Tell me—which sister do you prefer?"',
        speakerId: 'isabelle',
        emotion: 'curious',
      },
      {
        text: 'Loaded question. Either answer reveals something.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'sisters-trap',
        text: '"I don\'t know them well enough to prefer either."',
        nextSceneId: 'jet-isabelle-skeptical',
        isOptimal: false,
        tactic: 'evasion',
        reaction: {
          text: '"Diplomatic. But evasion is still an answer."',
          emotion: 'smirking',
          bodyLanguage: 'She saw through it. Expected more.',
          scoreImpact: -5,
        },
      },
      {
        id: 'sisters-subtle',
        text: '"They\'re more alike than people assume."',
        nextSceneId: 'jet-isabelle-interested',
        isOptimal: false,
        tactic: 'insight',
        reaction: {
          text: '"Alike." Her eyes narrow. "Now that\'s an interesting observation."',
          emotion: 'curious',
          bodyLanguage: 'You noticed something others miss.',
          scoreImpact: 15,
        },
      },
      {
        id: 'sisters-close',
        text: '"Maris is more dangerous. Millicent is more interesting."',
        nextSceneId: 'jet-isabelle-approving',
        isOptimal: false,
        tactic: 'honesty',
        reaction: {
          text: '"Dangerous versus interesting." She laughs. "You might survive this weekend."',
          emotion: 'happy',
          bodyLanguage: 'Direct answer. She appreciates candor.',
          scoreImpact: 20,
        },
      },
      {
        id: 'sisters-optimal',
        text: '"The question itself is the test. You want to know my judgment, not my preference."',
        nextSceneId: 'jet-isabelle-delighted',
        isOptimal: true,
        tactic: 'meta-read',
        reaction: {
          text: 'She laughs. Genuine. "Oh, Harrison chose well. Very well."',
          emotion: 'happy',
          bodyLanguage: 'You read the game within the game.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'jet-isabelle-skeptical',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Evasion is comfortable. But it won\'t serve you on the island."',
        speakerId: 'isabelle',
        emotion: 'neutral',
      },
      {
        text: 'She turns to Tyler. "What about you, Tyler? Still chasing Elena\'s shadow?"',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: 'Tyler flinches. Isabelle moves on. Blood in the water.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'jet-tyler-aside',
  },
  {
    id: 'jet-isabelle-interested',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Alike." She considers this. "Most see them as opposites. Light and dark."',
        speakerId: 'isabelle',
        emotion: 'curious',
      },
      {
        text: '"But twins are never truly opposite, are they? They\'re mirrors."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: '"Remember that on the island."',
        speakerId: 'isabelle',
        emotion: 'serious',
      },
      {
        text: 'Cryptic advice. File it away.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-tyler-aside',
  },
  {
    id: 'jet-isabelle-approving',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Survive." She nods. "That\'s the first goal. Everything else is bonus."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: '"A word of advice? The island reveals who you really are."',
        speakerId: 'isabelle',
        emotion: 'serious',
      },
      {
        text: '"Don\'t let it reveal too much."',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: 'Warning received.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-tyler-aside',
  },
  {
    id: 'jet-isabelle-delighted',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Harrison chose well." She repeats it. Savoring it.',
        speakerId: 'isabelle',
        emotion: 'happy',
      },
      {
        text: '"Most new guests spend the whole weekend performing. You\'re already playing."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: '"I think we\'ll get along."',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: 'Ally or predator? Hard to tell with her.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-tyler-aside',
  },
  {
    id: 'jet-tyler-aside',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'tense',
    dialog: [
      {
        text: 'Tyler catches your eye. Gestures subtly to the seat beside him.',
      },
      {
        text: 'You excuse yourself. Sit next to Elena\'s brother.',
      },
      {
        text: '"Thank god." He whispers. "I hate these people."',
        speakerId: 'tyler',
        emotion: 'concerned',
      },
      {
        text: '"Elena made me come. Said I need to \'expand my network.\' Easy for her to say."',
        speakerId: 'tyler',
        emotion: 'sad',
      },
      {
        text: 'Tyler\'s terrified. And willing to talk.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-tyler-intel',
  },
  {
    id: 'jet-tyler-intel',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Listen." Tyler leans close. "I\'ve been to the island before. I know things."',
        speakerId: 'tyler',
        emotion: 'serious',
      },
      {
        text: '"Harrison tests everyone. Usually in ways you don\'t expect."',
        speakerId: 'tyler',
        emotion: 'concerned',
      },
      {
        text: '"And this year? He\'s brought in more new people than usual. Something\'s happening."',
        speakerId: 'tyler',
        emotion: 'knowing',
      },
      {
        text: '"What kind of something?"',
      },
      {
        text: '"The kind that changes everything. Or ends everything."',
        speakerId: 'tyler',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'landing-approach',
  },
];
