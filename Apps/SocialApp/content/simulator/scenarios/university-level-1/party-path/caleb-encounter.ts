import type { ForkScene } from '../../../types';

/**
 * Party Path - Caleb Encounter (Cautionary Tale)
 * The player observes Caleb being humiliated by Maris.
 * Optional dialogue reveals his worldview - a warning of what "supply" looks like.
 */
export const calebEncounterScenes: ForkScene[] = [
  {
    id: 'party-caleb-observation',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'A soft-spoken guy approaches Maris with a drink. He moves like he\'s trying not to take up space.',
      },
      {
        text: '"Here\'s your martini. Extra olives, like you said." His voice is almost apologetic.',
        speakerId: 'caleb',
        emotion: 'neutral',
      },
      {
        text: 'Maris takes the glass without looking at him. Sniffs it. Her nose wrinkles.',
      },
      {
        text: '"I said dirty. Does this look dirty to you, Caleb?"',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"I—I\'m sorry. I can get another—"',
        speakerId: 'caleb',
        emotion: 'sad',
      },
      {
        text: '"It\'s fine." Maris sighs dramatically for her audience. "It\'s cute how hard he tries." She pats his cheek like he\'s a dog who failed a trick. "He does my homework too. Isn\'t that sweet?"',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'The group laughs. Caleb laughs too.',
      },
      {
        text: 'He laughed. Why did he laugh?',
        speakerId: 'inner-voice',
        emotion: 'confused',
      },
    ],
    dialogueChoices: [
      {
        id: 'caleb-observe-more',
        text: 'Keep watching. There\'s more here.',
        reaction: {
          text: 'Maris waves Caleb away. He retreats to the edge of the room, watching her from a distance. His expression isn\'t hurt. It\'s... content.',
          emotion: 'neutral',
          bodyLanguage: 'He\'s waiting for his next chance to be useful. To be seen.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-caleb-talk-option',
        isOptimal: true,
        tactic: 'strategic-observation',
      },
      {
        id: 'caleb-intervene',
        text: '"Hey, that was a bit harsh, wasn\'t it?"',
        reaction: {
          text: 'Maris\'s smile doesn\'t waver. "Was it?" She looks at Caleb. "Caleb, honey, was I harsh?" He shakes his head quickly. "See? He doesn\'t think so." Her eyes return to you, colder now. "And neither should you."',
          emotion: 'cold',
          bodyLanguage: 'You just challenged her in public. She won\'t forget.',
          scoreImpact: -20,
        },
        nextSceneId: 'party-the-test',
      },
      {
        id: 'caleb-ignore',
        text: 'Not my business. Focus on Maris.',
        reaction: {
          text: 'You turn your attention back to Maris. She\'s already moved on to the next conversation, the next person to charm. Caleb is forgotten. By everyone but himself.',
          emotion: 'neutral',
          bodyLanguage: 'Maybe that\'s what it takes to stay in her orbit. Accepting less.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-the-test',
      },
    ],
  },
  {
    id: 'party-caleb-talk-option',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Caleb is at the drinks table, carefully preparing another martini. His hands are steady despite the earlier humiliation.',
      },
      {
        text: 'You could talk to him. Or you could get back to Maris.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'caleb-approach',
        text: 'Approach Caleb. "Hey. That was pretty rough back there."',
        reaction: {
          text: 'He looks up, surprised anyone would talk to him. "Oh, that? She didn\'t mean it." He smiles—genuine, almost peaceful. "She just has high standards."',
          emotion: 'neutral',
          bodyLanguage: 'He really believes that. Or he\'s made himself believe it.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-caleb-dialogue',
        isOptimal: true,
      },
      {
        id: 'caleb-skip',
        text: 'Skip the side quest. Back to Maris.',
        reaction: {
          text: 'You head back toward Maris\'s orbit. Behind you, Caleb carefully adds the right amount of vermouth.',
          emotion: 'neutral',
          bodyLanguage: 'Some lessons you only learn by watching.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-the-test',
      },
    ],
  },
  {
    id: 'party-caleb-dialogue',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: '"You... do her homework?" You don\'t hide the disbelief.',
      },
      {
        text: 'Caleb shrugs, still focused on the drink. "I\'m good at it. And she\'s busy with... everything else. It makes sense."',
        speakerId: 'caleb',
        emotion: 'neutral',
      },
      {
        text: '"What do you get out of it?"',
      },
      {
        text: 'He looks at you like you\'ve asked something strange. Obvious.',
        speakerId: 'caleb',
        emotion: 'confused',
      },
      {
        text: '"She needs me." He picks up the glass, checking the olive placement. "Who else is going to do this right?"',
        speakerId: 'caleb',
        emotion: 'neutral',
      },
      {
        text: '"But the way she talks to you—"',
      },
      {
        text: '"That\'s just how she is." He shrugs, genuinely unbothered. "She has a lot on her mind. The party. Her classes. Me, I don\'t have anywhere else to be. So I help."',
        speakerId: 'caleb',
        emotion: 'neutral',
      },
      {
        text: 'He doesn\'t see it. He genuinely doesn\'t see it.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'caleb-try-help',
        text: '"That\'s not healthy. You know that, right?"',
        reaction: {
          text: 'Caleb blinks at you. Genuinely confused. "What do you mean?" He picks up the drink carefully. "She needs me. I like being needed. What\'s wrong with that?"',
          emotion: 'confused',
          bodyLanguage: 'He really doesn\'t understand the question.',
          scoreImpact: 0,
        },
        nextSceneId: 'party-caleb-warning',
      },
      {
        id: 'caleb-accept',
        text: '"I guess everyone finds their own way."',
        reaction: {
          text: 'Caleb nods, relieved you\'re not judging. "Exactly. She needs me. I need her." He heads back toward Maris. "Good luck tonight. She likes you. I can tell."',
          emotion: 'neutral',
          bodyLanguage: 'He said it like a blessing. It felt like a curse.',
          scoreImpact: 5,
        },
        nextSceneId: 'party-caleb-warning',
      },
      {
        id: 'caleb-curious',
        text: '"How did you two meet?"',
        reaction: {
          text: '"Freshman orientation. She was lost, looking for her dorm." His face softens at the memory. "I knew the whole campus by then. She needed me. Right from the start."',
          emotion: 'happy',
          bodyLanguage: 'He tells it like a love story. He doesn\'t see the setup.',
          scoreImpact: 10,
        },
        nextSceneId: 'party-caleb-warning',
        isOptimal: true,
        tactic: 'information-gathering',
      },
    ],
  },
  {
    id: 'party-caleb-warning',
    backgroundId: 'party',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'party',
    dialog: [
      {
        text: 'Caleb heads back toward Maris with the new drink. She takes it without acknowledgment, but her hand brushes his for just a moment.',
      },
      {
        text: 'He lights up. That single touch—probably accidental—sustains him for hours.',
      },
      {
        text: 'A single accidental touch. That\'s all it takes to keep him coming back.',
      },
      {
        text: 'You could end up just like him. If you\'re not careful.',
      },
    ],
    nextSceneId: 'party-the-test',
  },
];
