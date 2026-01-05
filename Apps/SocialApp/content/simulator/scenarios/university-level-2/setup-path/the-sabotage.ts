import type { ForkScene } from '../../../types';

/**
 * Setup Path - The Sabotage
 * Dana's covert tactics in action
 */
export const sabotageScenes: ForkScene[] = [
  {
    id: 'setup-the-date',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'romantic',
    dialog: [
      {
        text: 'Nice restaurant. Dana picked it. Derek is already there.',
      },
      {
        text: 'Handsome. Polished. He stands when you arrive. Good sign.',
      },
      {
        text: '"You must be the one Dana keeps raving about."',
      },
      {
        text: 'Keeps raving. So they\'ve been talking. A lot.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-derek-intro',
  },
  {
    id: 'setup-maybe',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'You leave coffee with a maybe. Dana texts three times that night.',
      },
      {
        text: '"Just checking if you decided! No pressure!" "Did I mention he has a yacht?" "Okay that was a joke but he IS really successful!"',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'Desperation underneath the casual tone. She needs this to happen.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-the-date',
  },
  {
    id: 'setup-confrontation',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I\'ve told you everything."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: 'Beat.',
      },
      {
        text: '"Okay, there\'s one thing. Derek... mentioned he might get back together with someone. But I\'m SURE he didn\'t mean me."',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'She\'s using you to make him jealous. You\'re the bait.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-the-date',
  },
  {
    id: 'setup-power-shift',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'romantic',
    dialog: [
      {
        text: 'You picked the restaurant. Set the time. Arrived first.',
      },
      {
        text: 'Derek walks in. Looks around. Seems genuinely surprised to see you.',
      },
      {
        text: '"Oh. Hey. Dana said this was casual..."',
      },
      {
        text: 'He was told something different. She\'s playing both of you.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-derek-confused',
  },
  // Derek interaction scenes
  {
    id: 'setup-derek-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Dana says you\'re amazing. Smart. Driven. Her exact words were \'finally someone who can handle themselves.\'"',
      },
      {
        text: 'He seems genuine. But the conversation keeps circling back to Dana.',
      },
      {
        text: '"She always knew the best people. We used to..."',
      },
      {
        text: 'He catches himself. Changes subject.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'derek-trap',
        text: '"You used to what? I\'d love to know more about Dana."',
        nextSceneId: 'setup-derek-wary',
        isOptimal: false,
        tactic: 'prying',
        reaction: {
          text: '"She didn\'t tell you?" He looks uncomfortable. "We dated. Briefly."',
          emotion: 'neutral',
          bodyLanguage: 'You showed too much interest in her. Red flag for him.',
          scoreImpact: -10,
        },
      },
      {
        id: 'derek-subtle',
        text: '"Let\'s talk about something other than Dana. What do YOU like?"',
        nextSceneId: 'setup-derek-relaxes',
        isOptimal: false,
        tactic: 'redirect',
        reaction: {
          text: 'He visibly relaxes. "Thank god. I was worried this would be weird."',
          emotion: 'happy',
          bodyLanguage: 'He wanted to move past it too.',
          scoreImpact: 5,
        },
      },
      {
        id: 'derek-close',
        text: '"She mentioned you two dated. What\'s the real story?"',
        nextSceneId: 'setup-derek-opens',
        isOptimal: false,
        tactic: 'direct',
        reaction: {
          text: '"Short version? She was... a lot. Sweet, but jealous. Controlling in small ways."',
          emotion: 'neutral',
          bodyLanguage: 'He\'s describing covert narcissism. He doesn\'t have the words for it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'derek-optimal',
        text: '"Interesting. What did Dana tell YOU about tonight?"',
        nextSceneId: 'setup-derek-reveals',
        isOptimal: true,
        tactic: 'information-asymmetry',
        reaction: {
          text: '"She said you were interested in me. That you\'d been asking about me."',
          emotion: 'knowing',
          bodyLanguage: 'She lied to both of you. Classic triangulation.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'setup-derek-confused',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Wait. Dana told me this was like... a group thing. That you needed advice about work or something."',
      },
      {
        text: 'He\'s as confused as you are. But now you both know.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'confused-trap',
        text: '"That\'s weird. She definitely said it was a date..."',
        nextSceneId: 'setup-derek-awkward',
        isOptimal: false,
        tactic: 'blame-dana',
        reaction: {
          text: '"Uh... this is really uncomfortable." He signals for the check.',
          emotion: 'neutral',
          bodyLanguage: 'You made it about the deception. He just wants out.',
          scoreImpact: -10,
        },
      },
      {
        id: 'confused-subtle',
        text: '"Doesn\'t matter what she said. What do YOU want to do now?"',
        nextSceneId: 'setup-derek-choice',
        isOptimal: false,
        tactic: 'present-focus',
        reaction: {
          text: 'He pauses. Considers. "...actually, you\'re right. Let\'s see where this goes."',
          emotion: 'curious',
          bodyLanguage: 'You took control of the situation.',
          scoreImpact: 10,
        },
      },
      {
        id: 'confused-close',
        text: '"So we\'re both here under false pretenses. That\'s almost romantic."',
        nextSceneId: 'setup-derek-laughs',
        isOptimal: false,
        tactic: 'humor',
        reaction: {
          text: 'He laughs. Genuinely. "You know what? I like you."',
          emotion: 'happy',
          bodyLanguage: 'Breaking the tension. Turning manipulation into connection.',
          scoreImpact: 15,
        },
      },
      {
        id: 'confused-optimal',
        text: '"Let\'s order anyway. Dana plays games. We don\'t have to."',
        nextSceneId: 'setup-derek-alliance',
        isOptimal: true,
        tactic: 'alliance',
        reaction: {
          text: '"I like the way you think." He puts the menu down. Really looks at you.',
          emotion: 'knowing',
          bodyLanguage: 'You\'re on the same team now. Against the manipulator.',
          scoreImpact: 20,
        },
      },
    ],
  },
  // Derek branch outcomes
  {
    id: 'setup-derek-wary',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The conversation stays surface. He checks his phone a lot.',
      },
      {
        text: '"This was nice. But I should head out. Early morning."',
      },
      {
        text: 'Dana sabotaged this before it started. And you helped.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-aftermath',
  },
  {
    id: 'setup-derek-relaxes',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The conversation flows. He\'s actually interesting once Dana isn\'t the topic.',
      },
      {
        text: '"This is nice. Better than I expected, honestly."',
      },
      {
        text: 'Connection forming. Despite the setup.',
        speakerId: 'inner-voice',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'setup-interrupted',
  },
  {
    id: 'setup-derek-opens',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"She was never overtly mean. Just... little things. Comments that made me question myself."',
      },
      {
        text: '"I didn\'t realize it was manipulation until after. Is that crazy?"',
      },
      {
        text: 'He\'s describing covert abuse. You recognize the pattern now.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-interrupted',
  },
  {
    id: 'setup-derek-reveals',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"She told me you\'d been asking about me for weeks. That you were nervous to meet."',
      },
      {
        text: 'You blink. "I didn\'t even know you existed until three days ago."',
      },
      {
        text: 'The manipulation is crystal clear now. To both of you.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-interrupted',
  },
  {
    id: 'setup-derek-awkward',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The date ends early. Awkward handshake.',
      },
      {
        text: '"This was... yeah. Tell Dana I said hi."',
      },
      {
        text: 'Dana wins. She wanted this to fail. It did.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'setup-aftermath',
  },
  {
    id: 'setup-derek-choice',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"You know what? Let\'s start over. Hi. I\'m Derek."',
      },
      {
        text: 'You shake hands. For real this time.',
      },
      {
        text: 'Reclaiming the narrative. Dana\'s script, rewritten.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-interrupted',
  },
  {
    id: 'setup-derek-laughs',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Seriously though. She does this. I should have known."',
      },
      {
        text: '"But I\'m glad I came. You\'re not what I expected."',
      },
      {
        text: 'Genuine interest. Despite everything.',
        speakerId: 'inner-voice',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'setup-interrupted',
  },
  {
    id: 'setup-derek-alliance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Can I tell you something? She texted me before you arrived."',
      },
      {
        text: '"Said to \'take it slow\' because you\'re \'fragile.\' You don\'t seem fragile."',
      },
      {
        text: 'She was undermining you before you even sat down.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"I\'m starting to see why we didn\'t work out."',
      },
    ],
    nextSceneId: 'setup-interrupted',
  },
  // The sabotage event
  {
    id: 'setup-interrupted',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'tense',
    dialog: [
      {
        text: 'Mid-conversation. Your phone buzzes. Dana.',
      },
      {
        text: '"Omg I\'m SO sorry to interrupt but there\'s an emergency. Can you step outside for a sec? 😰"',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'Emergency. Right when things are going well. Convenient.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'interrupt-trap',
        text: '"Sorry, I need to check on Dana. One second."',
        nextSceneId: 'setup-dana-emergency',
        isOptimal: false,
        tactic: 'compliance',
        reaction: {
          text: 'Derek\'s face falls slightly. "Sure. Take your time."',
          emotion: 'sad',
          bodyLanguage: 'You prioritized her. Over the actual date.',
          scoreImpact: -15,
        },
      },
      {
        id: 'interrupt-subtle',
        text: 'Text back: "In the middle of something. Is it urgent-urgent?"',
        nextSceneId: 'setup-dana-escalates',
        isOptimal: false,
        tactic: 'boundary-test',
        reaction: {
          text: '"YES it\'s urgent please I need you 😭"',
          emotion: 'sad',
          bodyLanguage: 'Escalation on demand. Classic manipulation.',
          scoreImpact: 5,
        },
      },
      {
        id: 'interrupt-close',
        text: '"Dana emergency. Probably nothing. But mind if I check quickly?"',
        nextSceneId: 'setup-dana-emergency',
        isOptimal: false,
        tactic: 'explain',
        reaction: {
          text: '"Go ahead. I know how she can be."',
          emotion: 'neutral',
          bodyLanguage: 'He knows. But you still went.',
          scoreImpact: -5,
        },
      },
      {
        id: 'interrupt-optimal',
        text: 'Silence the phone. "Where were we?"',
        nextSceneId: 'setup-dana-ignored',
        isOptimal: true,
        tactic: 'prioritize',
        reaction: {
          text: 'Derek smiles. Relief. "Thank you for that."',
          emotion: 'happy',
          bodyLanguage: 'You chose the present over the manipulator.',
          scoreImpact: 20,
        },
      },
    ],
  },
];
