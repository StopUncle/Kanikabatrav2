import type { Scene } from '../../types';

// PATH C: JEALOUSY GAMES
// When they find out about each other
// Teaching: Own your choices. Don't apologize for dating.

export const caughtScenes: Scene[] = [
  {
    id: 'caught-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Wait. How did he find out?' Sarah's leaning forward now. This is drama. 'Chris saw me with David at a restaurant. Texted me immediately. Now David knows something's up too.'",
        speakerId: 'sarah',
        emotion: 'curious',
      },
      {
        text: "'And Marcus?' 'Still texting. Oblivious.' Sarah snorts. 'Of course he is. Okay, what's the damage?'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "This was bound to happen eventually.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'caught-1a',
        text: '"Chris is pissed. Said I made him feel like a fool."',
        nextSceneId: 'caught-2-chris',
        xpBonus: 5,
        feedback: 'His ego is hurt. Understandable but not your problem.',
      },
      {
        id: 'caught-1b',
        text: '"David asked me directly if I\'m seeing other people."',
        nextSceneId: 'caught-2-david',
        xpBonus: 5,
        feedback: 'Direct question. Requires a direct answer.',
      },
      {
        id: 'caught-1c',
        text: '"I don\'t know what to tell either of them."',
        nextSceneId: 'caught-2-both',
        isOptimal: true,
        xpBonus: 10,
        feedback: 'Time to figure out your story—and stick to it.',
      },
    ],
  },
  {
    id: 'caught-2-chris',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Here's the thing,' Sarah says. 'You're not exclusive with anyone. You're allowed to date. If Chris expected monogamy after two dates, that's his assumption, not your promise.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: "'But you do need to address it. Ignoring it makes you look guilty. Explain calmly. If he can't handle it, he self-selects out.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'caught-3-text',
  },
  {
    id: 'caught-2-david',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'David asked directly? That's actually good.' Sarah nods. 'Means he wants information, not just to be angry. Be honest. You're dating, you haven't committed to anyone. Simple.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: "'Don't apologize for dating. Do acknowledge his feelings. There's a difference.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'caught-3-call',
  },
  {
    id: 'caught-2-both',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Okay, here's your story. Simple and consistent: You're dating. You haven't made promises to anyone. When you're ready for exclusivity, you'll be clear about it. That's it.'",
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: "'No apologies. No groveling. No lies. Just facts. The ones who can handle adult dating stay. The ones who can't—goodbye.'",
        speakerId: 'sarah',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: "Don't apologize for dating. Just be honest.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'caught-2a',
        text: '"Handle Chris first. He\'s the angry one."',
        nextSceneId: 'caught-3-text',
        xpBonus: 10,
        feedback: 'Address the fire before it spreads.',
      },
      {
        id: 'caught-2b',
        text: '"Call David. He deserves a conversation."',
        nextSceneId: 'caught-3-call',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'More investment = more care required.',
      },
    ],
  },
  {
    id: 'caught-3-text',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "Chris's texts are waiting. 'So you're seeing other guys.' 'Were you ever planning to tell me?' 'I feel like an idiot.'",
        speakerId: 'chris',
        emotion: 'angry',
      },
      {
        speakerId: 'inner-voice',
        text: "His hurt is valid. Doesn't mean you owe him exclusivity.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'caught-3a',
        text: '"We never talked about being exclusive. I enjoy spending time with you, but I\'m not ready to commit to anyone yet."',
        nextSceneId: 'caught-4-chris-honest',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Facts. No apology. Clear.',
      },
      {
        id: 'caught-3b',
        text: '"I\'m sorry. I should have told you."',
        nextSceneId: 'caught-4-chris-apologize',
        xpBonus: 5,
        feedback: 'Apologizing implies you did something wrong. Did you?',
      },
      {
        id: 'caught-3c',
        text: 'Don\'t respond. Let him cool off.',
        nextSceneId: 'caught-4-chris-ghost',
        feedback: 'Silence looks like guilt.',
      },
    ],
  },
  {
    id: 'caught-3-call',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You call David. He picks up on the second ring. 'Hey. I think we need to talk.' His voice is calm but careful.",
        speakerId: 'david',
        emotion: 'neutral',
      },
      {
        text: "'Chris told you?' 'He didn't need to. I saw his face at the restaurant. I'm not stupid.' Pause. 'Are you seeing other people?'",
        speakerId: 'david',
        emotion: 'serious',
      },
    ],
    choices: [
      {
        id: 'caught-3d',
        text: '"Yes. I\'ve been dating. I haven\'t committed to anyone. I really like you, David."',
        nextSceneId: 'caught-4-david-honest',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Full truth. Let him decide what to do with it.',
      },
      {
        id: 'caught-3e',
        text: '"It\'s not what it looks like. Chris and I are just friends."',
        nextSceneId: 'caught-4-david-lie',
        feedback: 'Lies have short shelf lives.',
      },
      {
        id: 'caught-3f',
        text: '"I don\'t owe you an explanation. We\'re not exclusive."',
        nextSceneId: 'caught-4-david-cold',
        xpBonus: 8,
        feedback: 'Technically true. Emotionally cold. He\'ll remember this.',
      },
    ],
  },
  {
    id: 'caught-4-chris-honest',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "Thirty minutes of silence. Then: 'Fair enough. I guess I assumed.' Another pause. 'I still want to see you. But I need to know where I stand.'",
        speakerId: 'chris',
        emotion: 'neutral',
      },
      {
        text: "He handled it. Not great, but he handled it. Some men respect honesty even when it stings.",
      },
    ],
    nextSceneId: 'caught-good-ending',
  },
  {
    id: 'caught-4-chris-apologize',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "'You SHOULD be sorry. I can't believe you did this.' Chris is typing more. More. More. 'I thought we had something real. You made me feel like a fool in front of that guy.'",
        speakerId: 'chris',
        emotion: 'angry',
      },
      {
        text: "Your apology gave him permission to be a victim. Now everything is your fault. See how that works?",
      },
    ],
    nextSceneId: 'caught-neutral-ending',
  },
  {
    id: 'caught-4-chris-ghost',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Chris texts three more times. Then: 'Really? You're not even going to respond? Wow. Guess I dodged a bullet.'",
        speakerId: 'chris',
        emotion: 'angry',
      },
      {
        text: "He's telling everyone now. His version. Meanwhile, David's asking questions too. This is spreading.",
      },
    ],
    nextSceneId: 'caught-bad-ending',
  },
  {
    id: 'caught-4-david-honest',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Thank you for telling me.' David's voice is quiet. 'I'm not going to pretend I'm thrilled. But at least I know.' A pause. 'So where do I stand?'",
        speakerId: 'david',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "He's asking a fair question.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'caught-5a',
        text: '"You\'re the one I see myself with. I just wasn\'t ready to close doors yet."',
        nextSceneId: 'caught-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Honest and validating. He can work with this.',
      },
      {
        id: 'caught-5b',
        text: '"I don\'t know yet. I\'m still figuring it out."',
        nextSceneId: 'caught-neutral-ending',
        xpBonus: 10,
        feedback: 'Honest but not encouraging.',
      },
    ],
  },
  {
    id: 'caught-4-david-lie',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Just friends. Right.' David's tone hardens. 'You know I saw you together, right? He had his hand on your back. Friends don't do that.' The lie collapsed in seconds.",
        speakerId: 'david',
        emotion: 'angry',
      },
      {
        text: "'I don't mind that you're dating. I mind that you lied. Goodnight.' Click.",
        speakerId: 'david',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'caught-bad-ending',
  },
  {
    id: 'caught-4-david-cold',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "'Wow. Okay.' David's voice changes. 'You're right. You don't owe me anything. I guess I just thought... never mind. I know where I stand now.'",
        speakerId: 'david',
        emotion: 'cold',
      },
      {
        text: "Click. You were technically right. But you were also cold. He won't forget that.",
      },
    ],
    nextSceneId: 'caught-neutral-ending',
  },
];
