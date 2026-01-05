import type { ForkScene } from '../../../types';

/**
 * Mission 14: The Ghost Returns - Casey Variant
 * Casey Chen reveals Kai's true loyalties. Tests genuine vs transactional.
 * Triggered if: Player had clean L2 (default path)
 */
export const caseyGhostScenes: ForkScene[] = [
  {
    id: 'casey-ghost-appearance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Mission 14: The Ghost Returns', index: 1, total: 4 },
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey Chen. Kai\'s cousin. The genuine one.',
      },
      {
        text: 'She approaches with warmth. Real warmth, not performance.',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: '"Hey! I was hoping you\'d be here. Kai mentioned you might come."',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'Blake relaxes. Finally, someone who doesn\'t feel like a threat.',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: 'But why is she seeking you out specifically?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'casey-friendly-intro',
  },
  {
    id: 'casey-friendly-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'peaceful',
    dialog: [
      {
        text: '"How are you holding up? These events can be... a lot."',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: '"I saw you talking to Maris earlier. That looked intense."',
        speakerId: 'casey',
        emotion: 'curious',
      },
      {
        text: 'She seems genuinely interested. Not calculating. Not probing.',
      },
      {
        text: '"I know Kai threw you into the deep end. I wanted to check you weren\'t drowning."',
        speakerId: 'casey',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'casey-history',
  },
  {
    id: 'casey-history',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'peaceful',
    dialog: [
      {
        text: '"Can I be honest with you? About Kai?"',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: 'She glances around. Making sure they\'re not overheard.',
      },
      {
        text: '"She\'s my cousin. I love her. But she... operates differently than most people."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"People are projects to her. Investments. She doesn\'t do relationships the way we do."',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: 'She\'s warning you. About her own family.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'casey-history-trap',
        text: '"I know exactly what Kai is. I\'m not naive."',
        nextSceneId: 'casey-probes',
        isOptimal: false,
        tactic: 'defensive',
        reaction: {
          text: '"I didn\'t say you were naive. I said..." She pauses. Recalibrating.',
          emotion: 'concerned',
          bodyLanguage: 'You got defensive. She was trying to help.',
          scoreImpact: -10,
        },
      },
      {
        id: 'casey-history-subtle',
        text: '"Thanks for the warning. I appreciate you looking out for me."',
        nextSceneId: 'casey-probes',
        isOptimal: false,
        tactic: 'polite-dismiss',
        reaction: {
          text: '"It\'s not just a warning. It\'s..." She hesitates.',
          emotion: 'neutral',
          bodyLanguage: 'She has more to say. You didn\'t ask.',
          scoreImpact: 0,
        },
      },
      {
        id: 'casey-history-close',
        text: '"Why are you telling me this? What do you want me to do with it?"',
        nextSceneId: 'casey-probes',
        isOptimal: false,
        tactic: 'direct-question',
        reaction: {
          text: '"I want you to be careful. And maybe... remember who you are."',
          emotion: 'serious',
          bodyLanguage: 'She cares about you as a person. That\'s rare tonight.',
          scoreImpact: 10,
        },
      },
      {
        id: 'casey-history-optimal',
        text: '"What happened to you? With Kai? You\'re speaking from experience."',
        nextSceneId: 'casey-probes',
        isOptimal: true,
        tactic: 'see-her',
        reaction: {
          text: 'She looks surprised. "You\'re the first person to ask me that."',
          emotion: 'sad',
          bodyLanguage: 'You saw past the warning to the person. She opens up.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'casey-probes',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'cold',
    dialog: [
      {
        text: '"Kai used to bring me to things like this. When we were younger."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"I thought we were partners. Turns out I was... useful."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"When I stopped being useful, she found someone new. That\'s how she works."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'She looks at you. Direct. Honest.',
      },
      {
        text: '"So. Which are you? Genuine... or useful?"',
        speakerId: 'casey',
        emotion: 'curious',
      },
      {
        text: 'The real test. Not from Maris. From someone who actually cares.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'casey-test-trap',
        text: '"I\'m using her as much as she\'s using me. It\'s mutual."',
        nextSceneId: 'casey-reckoning',
        isOptimal: false,
        tactic: 'transactional',
        reaction: {
          text: 'Her face falls. "That\'s what everyone says. Right before they lose themselves."',
          emotion: 'sad',
          bodyLanguage: 'She was hoping for different. You disappointed her.',
          scoreImpact: -15,
        },
      },
      {
        id: 'casey-test-subtle',
        text: '"I don\'t know yet. I\'m still figuring out what I want from all this."',
        nextSceneId: 'casey-reckoning',
        isOptimal: false,
        tactic: 'uncertain',
        reaction: {
          text: '"That\'s honest. At least you\'re not pretending."',
          emotion: 'neutral',
          bodyLanguage: 'Honesty about uncertainty. She respects that.',
          scoreImpact: 5,
        },
      },
      {
        id: 'casey-test-close',
        text: '"I want both. To succeed AND stay myself. Is that naive?"',
        nextSceneId: 'casey-reckoning',
        isOptimal: false,
        tactic: 'ambitious-authentic',
        reaction: {
          text: '"Not naive. Just... hard." She smiles sadly. "I tried too."',
          emotion: 'concerned',
          bodyLanguage: 'She sees herself in you. That worries her.',
          scoreImpact: 10,
        },
      },
      {
        id: 'casey-test-optimal',
        text: '"I think the question isn\'t which I am. It\'s which I choose to be, moment by moment."',
        nextSceneId: 'casey-reckoning',
        isOptimal: true,
        tactic: 'conscious-choice',
        reaction: {
          text: 'She stares. Then smiles. Really smiles. "That might be the best answer I\'ve ever heard."',
          emotion: 'happy',
          bodyLanguage: 'You showed self-awareness without cynicism. She has hope.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'casey-reckoning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey takes a breath. Makes a decision.',
      },
      {
        text: '"Here\'s what Kai doesn\'t know I know."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"Harrison has a list. People he\'s watching for recruitment. You\'re on it."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"But so was I, once. The list isn\'t an honor. It\'s a trap."',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: 'She grips your hand.',
      },
      {
        text: '"Whatever happens tonight—remember you can still walk away. Not everyone gets that choice."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: 'She moves away. The first genuine person you\'ve met tonight.',
      },
      {
        text: 'Blake watches her go. "She seemed... real."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'She was. Hold onto that feeling.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-convergence-intro',
  },
];
