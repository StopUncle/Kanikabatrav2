import type { ForkScene } from '../../../../types';

/**
 * Study Path - Scene 3: The Reveal
 * Casey's patterns become clearer. Learning about healthy connection vs. anxious attachment.
 * DEFENSIVE VERSION: Understanding that over-giving often masks insecurity
 */
export const theRevealScenes: ForkScene[] = [
  {
    id: 'study-the-reveal',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    chapter: {
      name: 'The Study Hall',
      index: 3,
      total: 5,
    },
    dialog: [
      {
        text: 'The conversation takes a turn. Casey mentions she heard about Maris\'s party.',
      },
      {
        text: '"You didn\'t go, right? To her party?" Her voice is careful. Testing.',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: 'Why does she care?',
        speakerId: 'inner-voice',
        emotion: 'curious',
      },
    ],
    dialogueChoices: [
      {
        id: 'reveal-honest-went',
        text: '"I did, actually. Briefly."',
        reaction: {
          text: 'Her face falls, then recovers. "Oh. How was it?" She sounds casual. She\'s not.',
          emotion: 'neutral',
          bodyLanguage: 'She\'s disappointed but hiding it. She wanted you to be different.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-casey-warning',
      },
      {
        id: 'reveal-honest-skipped',
        text: '"No. Wasn\'t really my scene."',
        reaction: {
          text: 'Relief floods her face. "Good. I mean—not good. Just..." She fumbles. "Maris isn\'t what she seems."',
          emotion: 'hopeful',
          bodyLanguage: 'She knows something. And she\'s relieved you\'re not in her orbit.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-casey-warning',
        isOptimal: true,
      },
      {
        id: 'reveal-deflect',
        text: '"Why do you ask?"',
        reaction: {
          text: 'She hesitates. "No reason. Just..." She looks down. "I used to know some of her people."',
          emotion: 'sad',
          bodyLanguage: 'There\'s a story there. She\'s deciding whether to tell it.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-casey-warning',
      },
    ],
  },
  {
    id: 'study-casey-warning',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey takes a deep breath. She\'s about to share something.',
      },
      {
        text: '"My roommate last year. She got pulled into Maris\'s circle." Casey\'s voice is flat. "She dropped out second semester. Completely burned out. Said she couldn\'t trust anyone anymore."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"She gave everything to those people. And when they got what they needed..." Casey shrugs. "They just moved on."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She\'s warning you. Or maybe warning herself.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'warning-listen',
        text: '"That sounds awful. Thank you for telling me."',
        reaction: {
          text: 'Casey nods. "I just don\'t want—" She stops. "I know we just met. It\'s not my place."',
          emotion: 'neutral',
          bodyLanguage: 'She\'s protecting you. Even though it\'s not her job.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-casey-pattern',
        isOptimal: true,
      },
      {
        id: 'warning-probe',
        text: '"And you? Did Maris\'s people ever come after you?"',
        reaction: {
          text: 'She laughs, but it\'s hollow. "Me? No. I\'m invisible, remember? Not worth the effort."',
          emotion: 'sad',
          bodyLanguage: 'She believes this. That\'s the problem.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-casey-pattern',
      },
      {
        id: 'warning-dismiss',
        text: '"I can handle myself. But thanks for the concern."',
        reaction: {
          text: 'She pulls back. "Right. Of course. Sorry. I didn\'t mean to—" She\'s already apologizing.',
          emotion: 'confused',
          bodyLanguage: 'You dismissed her concern. She\'s reverting to "I shouldn\'t have spoken."',
          scoreImpact: -10,
        },
        nextSceneId: 'study-casey-pattern',
      },
    ],
  },
  {
    id: 'study-casey-pattern',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Something clicks as you talk to Casey. Her patterns are clearer now.',
      },
      {
        text: 'The over-offering. The self-deprecation. The instant bonding. The fear of being too much.',
      },
      {
        text: 'She\'s not trying to manipulate. She\'s terrified of being alone.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'pattern-gentle',
        text: '"Casey. Can I ask you something personal?"',
        reaction: {
          text: 'She tenses slightly. "Sure. I guess. What?"',
          emotion: 'neutral',
          bodyLanguage: 'Bracing for criticism. That\'s her default.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-deeper-conversation',
        isOptimal: true,
      },
      {
        id: 'pattern-observe',
        text: 'Keep talking. Let her show more of herself.',
        reaction: {
          text: 'You nod, let her continue. She talks about classes, about her family, about feeling invisible. It all connects.',
          emotion: 'neutral',
          bodyLanguage: 'She\'s showing you who she is. Pay attention.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-decision',
      },
      {
        id: 'pattern-redirect',
        text: 'Change the subject. This is getting heavy.',
        reaction: {
          text: 'You pivot to lighter topics. Casey follows your lead. Relief in her eyes—but also a flash of disappointment.',
          emotion: 'neutral',
          bodyLanguage: 'She was opening up. You closed the door. Maybe that\'s right. Maybe not.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-decision',
      },
    ],
  },
  {
    id: 'study-deeper-conversation',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'You ask her the question: "Why do you give so much to people you just met?"',
      },
      {
        text: 'Casey is quiet for a long moment. Then:',
      },
      {
        text: '"Because if I don\'t... what reason would anyone have to stay?"',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She said it like it\'s obvious. Like friendship is a transaction she can only pay with service.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'deeper-affirm',
        text: '"Being yourself is enough. You don\'t have to earn connection."',
        reaction: {
          text: 'She stares at you. "That\'s..." Her eyes are wet. "Nobody\'s ever said that to me."',
          emotion: 'hopeful',
          bodyLanguage: 'You gave her something real. Not validation—truth.',
          scoreImpact: 25,
        },
        nextSceneId: 'study-decision',
        isOptimal: true,
        tactic: 'genuine-connection',
      },
      {
        id: 'deeper-honest',
        text: '"That sounds exhausting. Constantly proving yourself."',
        reaction: {
          text: '"It is." A small laugh. "God, it really is." Something loosens in her.',
          emotion: 'neutral',
          bodyLanguage: 'She\'s been seen. That\'s powerful.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-decision',
      },
      {
        id: 'deeper-withdraw',
        text: '"I don\'t know what to say to that."',
        reaction: {
          text: 'She nods quickly. "Sorry. That was heavy. Forget I said anything." She\'s retreating.',
          emotion: 'sad',
          bodyLanguage: 'She took a risk. You didn\'t catch her.',
          scoreImpact: -10,
        },
        nextSceneId: 'study-decision',
      },
    ],
  },
  {
    id: 'study-decision',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    chapter: {
      name: 'The Study Hall',
      index: 4,
      total: 5,
    },
    dialog: [
      {
        text: 'The library is closing soon. You and Casey have been talking for hours.',
      },
      {
        text: 'She\'s not like Maris. Not predatory. Not calculating. Just... scared. And compensating.',
      },
      {
        text: 'Different red flag. Same lesson: people give off signals. Reading them is protection for both of you.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'decision-healthy',
        text: '"Let\'s do this again. But slowly. No lists. Just coffee."',
        reaction: {
          text: 'Casey\'s smile is small but real. "Just coffee. I can do that."',
          emotion: 'happy',
          bodyLanguage: 'You\'re teaching her a different pattern. Connection without transaction.',
          scoreImpact: 25,
        },
        nextSceneId: 'ending-study-healthy',
        isOptimal: true,
        tactic: 'model-healthy-connection',
      },
      {
        id: 'decision-cautious',
        text: '"I should get going. But it was nice to meet you."',
        reaction: {
          text: 'She nods, already pulling back. "You too. Maybe I\'ll see you around." She doesn\'t believe it.',
          emotion: 'neutral',
          bodyLanguage: 'Standard farewell. She\'ll assume you\'re gone.',
          scoreImpact: 5,
        },
        nextSceneId: 'ending-study-neutral',
      },
      {
        id: 'decision-utilize',
        text: '"That campus tour actually sounds great. When are you free?"',
        reaction: {
          text: 'Her eyes light up. "Really? I have time tomorrow—or whenever works for you!"',
          emotion: 'happy',
          bodyLanguage: 'Back to the pattern. She\'s useful, so she has value.',
          scoreImpact: -10,
        },
        nextSceneId: 'ending-study-transactional',
      },
    ],
  },
  {
    id: 'study-solo-path',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'You settle into your own table. Casey stays at hers, head down, shoulders hunched.',
      },
      {
        text: 'You get some work done. It\'s peaceful. But you notice Casey packing up early, slipping out without looking back.',
      },
      {
        text: 'Another missed connection. But sometimes that\'s okay.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-study-solo',
  },
];
