import type { ForkScene } from '../../../types';

/**
 * Mission 13: The Power Play - The Leverage
 * Elena's intel. Millicent encounter. Information as currency.
 */
export const leverageScenes: ForkScene[] = [
  {
    id: 'power-leverage-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'mysterious',
    dialog: [
      {
        text: 'Elena links her arm through yours. Proprietary. Calculated.',
      },
      {
        text: '"Walk with me. I\'ll give you the real tour."',
        speakerId: 'elena',
        emotion: 'seductive',
      },
      {
        text: 'She guides you through the crowd. People part for her like water.',
      },
      {
        text: '"Victoria Ashworth. Old money. Husband\'s a sweetheart, she\'s a viper. Currently at war with Maris."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-intel',
  },
  {
    id: 'elena-intel',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'party',
    dialog: [
      {
        text: '"That man in the corner? Hedge fund. Three affairs. Wife knows about two."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: '"The woman in red? Art dealer. Launders money. Good client of Harrison\'s."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'She\'s showing off. But also teaching.',
      },
      {
        text: '"Everyone here has secrets. The question is: what do you do with them?"',
        speakerId: 'elena',
        emotion: 'seductive',
      },
      {
        text: 'She\'s asking what you\'d do with this kind of power.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'secrets-trap',
        text: '"Expose them? People deserve to know the truth."',
        nextSceneId: 'elena-disappointed',
        isOptimal: false,
        tactic: 'idealist',
        reaction: {
          text: '"Expose them." She laughs. "And become the most hated person in the room? No."',
          emotion: 'smirking',
          bodyLanguage: 'Naive. She expected better.',
          scoreImpact: -15,
        },
      },
      {
        id: 'secrets-subtle',
        text: '"Keep them safe. Information is only valuable if it\'s private."',
        nextSceneId: 'elena-adequate',
        isOptimal: false,
        tactic: 'vault',
        reaction: {
          text: '"A vault. Safe but static. Information wants to move."',
          emotion: 'neutral',
          bodyLanguage: 'Conservative. Not wrong, but not ambitious.',
          scoreImpact: 5,
        },
      },
      {
        id: 'secrets-close',
        text: '"Trade them. Build a network of favors and obligations."',
        nextSceneId: 'elena-impressed',
        isOptimal: false,
        tactic: 'transactional',
        reaction: {
          text: '"A trader. Like me." She smiles. "But trades have limits."',
          emotion: 'seductive',
          bodyLanguage: 'She sees herself in you. That\'s dangerous.',
          scoreImpact: 10,
        },
      },
      {
        id: 'secrets-optimal',
        text: '"Never use them unless necessary. But make sure everyone knows I could."',
        nextSceneId: 'elena-delighted',
        isOptimal: true,
        tactic: 'deterrent',
        reaction: {
          text: 'Her eyes light up. "The threat is more valuable than the act. Perfect."',
          emotion: 'happy',
          bodyLanguage: 'You understand leverage. Real leverage.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'elena-disappointed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"Truth-telling is for people who can\'t afford strategy."',
        speakerId: 'elena',
        emotion: 'cold',
      },
      {
        text: '"But I\'ll give you credit for honesty. Most people pretend to be more calculating."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'She glances across the room. Someone\'s caught her attention.',
      },
      {
        text: '"Interesting. The other Caldwell just arrived."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'millicent-introduction',
  },
  {
    id: 'elena-adequate',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Vaults are useful. But they don\'t change anything."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"Still. Discretion is valuable. Harrison likes discretion."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'She pauses. Looks across the room.',
      },
      {
        text: '"Oh. This is going to be interesting. Millicent\'s here."',
        speakerId: 'elena',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'millicent-introduction',
  },
  {
    id: 'elena-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'party',
    dialog: [
      {
        text: '"Traders survive. Some even thrive."',
        speakerId: 'elena',
        emotion: 'seductive',
      },
      {
        text: '"But every trade leaves a record. Someone always knows what you bought and sold."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'She spots something. Someone.',
      },
      {
        text: '"Speaking of records—Maris\'s twin just walked in. This should be educational."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'millicent-introduction',
  },
  {
    id: 'elena-delighted',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'romantic',
    dialog: [
      {
        text: '"You might actually be worth my time."',
        speakerId: 'elena',
        emotion: 'seductive',
      },
      {
        text: '"That\'s the philosophy that keeps this network running. The credible threat."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'Her attention shifts. Something\'s changed.',
      },
      {
        text: '"Oh, this is perfect timing. Come. You need to meet someone."',
        speakerId: 'elena',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'millicent-introduction',
  },
  {
    id: 'millicent-introduction',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'peaceful',
    dialog: [
      {
        text: 'A woman enters. And for a moment, you think Maris came back.',
      },
      {
        text: 'Same face. Same posture. But... different. Softer somehow.',
      },
      {
        text: '"Millicent Caldwell. Maris\'s twin. The good one, they say."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'She\'s scanning the room. Her eyes find you. Pause.',
      },
      {
        text: 'Same eyes as Maris. But warm instead of cold.',
        speakerId: 'inner-voice',
        emotion: 'curious',
      },
    ],
    nextSceneId: 'millicent-approach',
  },
  {
    id: 'millicent-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Millicent approaches. Her smile is genuine. Unsettling in its similarity.',
      },
      {
        text: '"You must be the person my sister was interrogating earlier."',
        speakerId: 'millicent',
        emotion: 'happy',
      },
      {
        text: '"I\'m Millie. The non-terrifying Caldwell."',
        speakerId: 'millicent',
        emotion: 'smirking',
      },
      {
        text: 'Elena drifts away. Giving you space. Or just watching from a distance.',
      },
    ],
    nextSceneId: 'millicent-conversation',
  },
  {
    id: 'millicent-conversation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'peaceful',
    dialog: [
      {
        text: '"I saw you talking to her. Most people can\'t hold a conversation that long."',
        speakerId: 'millicent',
        emotion: 'curious',
      },
      {
        text: '"She either liked you or she\'s planning something. Possibly both."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: 'Warmth. Genuine concern. So different from Maris.',
      },
      {
        text: '"Can I ask—why are you here? What did Kai tell you about tonight?"',
        speakerId: 'millicent',
        emotion: 'curious',
      },
      {
        text: 'Why is she asking? What does she know?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'millicent-trap',
        text: '"Kai didn\'t tell me much. Just that there were... opportunities here."',
        nextSceneId: 'millicent-worried',
        isOptimal: false,
        tactic: 'vague',
        reaction: {
          text: '"Opportunities." Her face falls. "That\'s what they call it."',
          emotion: 'sad',
          bodyLanguage: 'She was hoping you weren\'t involved. You are.',
          scoreImpact: -10,
        },
      },
      {
        id: 'millicent-subtle',
        text: '"Networking. Making connections. Isn\'t that what these events are for?"',
        nextSceneId: 'millicent-cautious',
        isOptimal: false,
        tactic: 'deflect',
        reaction: {
          text: '"Connections. Right." She doesn\'t believe you, but lets it go.',
          emotion: 'neutral',
          bodyLanguage: 'She\'s protecting herself now. The warmth dims.',
          scoreImpact: 0,
        },
      },
      {
        id: 'millicent-close',
        text: '"Honestly? I don\'t entirely know. But your sister seems to have a plan for me."',
        nextSceneId: 'millicent-opens-up',
        isOptimal: false,
        tactic: 'honest-partial',
        reaction: {
          text: '"Maris always has a plan." She looks worried. Genuinely worried.',
          emotion: 'concerned',
          bodyLanguage: 'She knows something about Maris\'s plans.',
          scoreImpact: 10,
        },
      },
      {
        id: 'millicent-optimal',
        text: '"I\'m still figuring that out. But you seem concerned. Should I be worried?"',
        nextSceneId: 'millicent-reveals',
        isOptimal: true,
        tactic: 'redirect-care',
        reaction: {
          text: 'She hesitates. Looks around. "Can we talk somewhere quieter?"',
          emotion: 'concerned',
          bodyLanguage: 'She wants to tell you something. Something important.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'millicent-worried',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"Just... be careful. The network Harrison runs—it changes people."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: '"Maris wasn\'t always... like this. Before she got involved. Before our mother—"',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: 'She stops. Someone\'s watching. Victoria.',
      },
      {
        text: '"I should go. Good luck. You\'ll need it."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'power-choice-intro',
  },
  {
    id: 'millicent-cautious',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Networking. Sure." She doesn\'t push.',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: '"If you need... if things get complicated... I\'m not like them."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: 'She hands you a card. Simple. Just a number.',
      },
      {
        text: '"My sister has her plans. I have mine. Take care of yourself."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'power-choice-intro',
  },
  {
    id: 'millicent-opens-up',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"Maris\'s plans." Millicent\'s voice tightens.',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: '"She recruits people. For Harrison. They think they\'re joining something exclusive."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: '"By the time they realize what they\'ve become..."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: 'She looks at you. Really looks.',
      },
      {
        text: '"You still have a choice. They won\'t tell you that. But you do."',
        speakerId: 'millicent',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'power-choice-intro',
  },
  {
    id: 'millicent-reveals',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: 'She guides you toward a quieter alcove. Checks that no one\'s listening.',
      },
      {
        text: '"I loved my sister. Past tense."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: '"What Harrison does—what she does for him—it destroys people."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: '"Not always visibly. But something breaks inside them. Something that doesn\'t heal."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'millicent-warning',
  },
  {
    id: 'millicent-warning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"Our mother did this to her. Raised her to be... what she is."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: '"I got out. Different schools. Different path. But Maris..."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: 'She grips your arm. Urgently.',
      },
      {
        text: '"You seem decent. Don\'t let them take that. Whatever they offer—there\'s always a price."',
        speakerId: 'millicent',
        emotion: 'serious',
      },
      {
        text: 'She\'s the only one here who\'s told you the truth.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'power-choice-intro',
  },
];
