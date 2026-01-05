import type { ForkScene } from '../../../types';

/**
 * The Preparation - Research and planning before the island
 */
export const preparationScenes: ForkScene[] = [
  {
    id: 'preparation-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'The Preparation', index: 3, total: 6 },
    mood: 'professional',
    dialog: [
      {
        text: 'Two days until departure. Research mode.',
      },
      {
        text: 'You and Blake spread everything across the table. News articles. Social media. Financial records.',
      },
      {
        text: '"The Whitmore Foundation." Blake reads. "Charity work, education grants, environmental causes."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"On paper, they\'re saints."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: 'On paper.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'preparation-guest-list',
  },
  {
    id: 'preparation-guest-list',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'professional',
    dialog: [
      {
        text: '"I found last year\'s guest list. Leaked by a tabloid."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'He turns the laptop. Names you recognize. Names that make you pause.',
      },
      {
        text: '"Victor Ashworth. Victoria\'s father. Old money."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"Dominic Reyes. Tech billionaire. Called \'The Algorithm\' by his employees."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Isabelle Laurent. French financier. Rumored to have destroyed three corporations from the inside."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'And us. Two university-adjacent nobodies.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'preparation-kai-calls',
  },
  {
    id: 'preparation-kai-calls',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'tense',
    dialog: [
      {
        text: 'Your phone rings. Kai.',
      },
      {
        text: '"You got the invitation." Not a question.',
        speakerId: 'kai',
        emotion: 'serious',
      },
      {
        text: '"I did too. Which means they\'re watching both of us."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"Listen carefully. Don\'t trust anyone on that island. Not even me."',
        speakerId: 'kai',
        emotion: 'cold',
      },
      {
        text: 'She hangs up before you can respond.',
      },
      {
        text: 'Not even her. That\'s either paranoia or a warning.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'preparation-blake-concern',
  },
  {
    id: 'preparation-blake-concern',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Who was that?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Kai. Warning us not to trust anyone."',
      },
      {
        text: '"Including her?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Especially her, apparently."',
      },
      {
        text: 'Blake sits back. The weight of it hitting him.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'concern-trap',
        text: '"Maybe we shouldn\'t go."',
        nextSceneId: 'preparation-too-late',
        isOptimal: false,
        tactic: 'retreat',
        reaction: {
          text: '"And have Harrison Cole think we\'re cowards? That\'s worse than whatever\'s waiting."',
          emotion: 'serious',
          bodyLanguage: 'He\'s right. Retreat isn\'t an option.',
          scoreImpact: -5,
        },
      },
      {
        id: 'concern-subtle',
        text: '"We\'ll be careful."',
        nextSceneId: 'preparation-careful',
        isOptimal: false,
        tactic: 'cautious',
        reaction: {
          text: '"Careful." He nods. "That\'s all we can do."',
          emotion: 'neutral',
          bodyLanguage: 'Reasonable but passive.',
          scoreImpact: 5,
        },
      },
      {
        id: 'concern-close',
        text: '"If everyone\'s a potential threat, everyone\'s also a potential opportunity."',
        nextSceneId: 'preparation-opportunity',
        isOptimal: false,
        tactic: 'reframing',
        reaction: {
          text: '"That\'s... actually a good point." He straightens.',
          emotion: 'knowing',
          bodyLanguage: 'Strategic thinking. He\'s adapting.',
          scoreImpact: 15,
        },
      },
      {
        id: 'concern-optimal',
        text: '"We need our own advantage. Information they don\'t know we have."',
        nextSceneId: 'preparation-advantage',
        isOptimal: true,
        tactic: 'strategic',
        reaction: {
          text: '"Intel they don\'t expect." His eyes light up. "I might have an idea."',
          emotion: 'happy',
          bodyLanguage: 'You activated his problem-solving mode.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'preparation-too-late',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"It\'s too late to back out." Blake stands. Pacing again.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"The invitation wasn\'t a question. It was a summons."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'He\'s right. The door closed behind us when we entered the gala.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'preparation-final',
  },
  {
    id: 'preparation-careful',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Careful." Blake repeats. Testing the word.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"I guess that\'s the best we can hope for."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: 'Not inspiring. But honest.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'preparation-final',
  },
  {
    id: 'preparation-opportunity',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Threat and opportunity." Blake turns back to the laptop.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"If we can figure out what they want, maybe we can be useful. And useful people survive."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: 'He\'s learning to think like them.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'preparation-final',
  },
  {
    id: 'preparation-advantage',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"An idea." Blake grabs his phone. Scrolling.',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"My cousin works at a financial firm. Does due diligence on ultra-wealthy clients."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: '"He owes me. And he might have files on some of these people."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: 'Hidden asset. Blake has more value than he knows.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'preparation-final',
  },
  {
    id: 'preparation-final',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'tense',
    dialog: [
      {
        text: 'The night before departure. Bags packed. Research compiled.',
      },
      {
        text: 'Blake stands at the window, looking at the city lights.',
      },
      {
        text: '"This is it, isn\'t it? The point of no return."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Whatever happens on that island... we\'re not coming back the same."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'He\'s right. The only question is what we become.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'jet-boarding',
  },
];
