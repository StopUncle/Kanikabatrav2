import type { ForkScene } from '../../../types';

/**
 * App Path - Chat Interactions
 * Conversation dynamics reveal character
 */
export const chatScenes: ForkScene[] = [
  // JORDAN CHAT (The Catfish)
  {
    id: 'app-jordan-chat',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'You type: "Coffee sounds good. When works for you?"',
      },
      {
        text: '"Mmm, I\'m flexible. What about this cozy little place on 5th? I\'ll be the one you can\'t stop staring at 😏"',
        speakerId: 'match-1',
        emotion: 'seductive',
      },
      {
        text: 'Heavy on the charm. Light on the specifics.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'jordan-trap',
        text: '"Can\'t wait! I bet you look even better in person 😍"',
        nextSceneId: 'app-jordan-red-flags',
        isOptimal: false,
        tactic: 'mirror-charm',
        reaction: {
          text: '"You have no idea 😘" Zero substance. All flirtation.',
          emotion: 'seductive',
          bodyLanguage: 'Playing to your ego. Avoiding real conversation.',
          scoreImpact: -10,
        },
      },
      {
        id: 'jordan-subtle',
        text: '"What do you do for work?"',
        nextSceneId: 'app-jordan-vague',
        isOptimal: false,
        tactic: 'basic-screening',
        reaction: {
          text: '"A little of this, a little of that. I like to keep things interesting 😉"',
          emotion: 'smirking',
          bodyLanguage: 'Deflection. Won\'t pin down anything specific.',
          scoreImpact: 0,
        },
      },
      {
        id: 'jordan-close',
        text: '"Let\'s video call first. See if there\'s chemistry."',
        nextSceneId: 'app-jordan-dodge',
        isOptimal: false,
        tactic: 'verification',
        reaction: {
          text: '"Oh, I\'m more of an in-person connection type. Cameras are so... sterile, you know?"',
          emotion: 'neutral',
          bodyLanguage: 'Avoids video. Red flag #1.',
          scoreImpact: 10,
        },
      },
      {
        id: 'jordan-optimal',
        text: '"Quick question - what was the last thing that genuinely surprised you?"',
        nextSceneId: 'app-jordan-exposed',
        isOptimal: true,
        tactic: 'depth-test',
        reaction: {
          text: '...typing stops. Starts. Stops. Finally: "Hmm, that\'s deep. I\'ll have to think about it."',
          emotion: 'confused',
          bodyLanguage: 'Genuine question broke the script.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // Jordan branch scenes
  {
    id: 'app-jordan-red-flags',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'The conversation stays surface-level. Flirty emojis. Vague plans.',
      },
      {
        text: 'They suggest meeting at a hotel bar. "For privacy."',
        speakerId: 'match-1',
        emotion: 'seductive',
      },
      {
        text: 'Too fast. Too smooth. Too convenient.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'app-jordan-decision',
  },
  {
    id: 'app-jordan-vague',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Every question gets a charming non-answer.',
      },
      {
        text: '"Where are you from?" "Everywhere and nowhere 😜"',
        speakerId: 'match-1',
        emotion: 'smirking',
      },
      {
        text: 'Mystery isn\'t depth. It can be a mask.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'app-jordan-decision',
  },
  {
    id: 'app-jordan-dodge',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'They won\'t video call. Won\'t share social media. Always has a reason.',
      },
      {
        text: '"I like to keep my online life separate from real connections. Makes it more... special."',
        speakerId: 'match-1',
        emotion: 'seductive',
      },
      {
        text: 'Or makes it harder to verify. Catfish playbook.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-jordan-decision',
  },
  {
    id: 'app-jordan-exposed',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'The charm routine broke. They weren\'t ready for a real question.',
      },
      {
        text: 'Eventually: "Being asked something like that, actually."',
        speakerId: 'match-1',
        emotion: 'neutral',
      },
      {
        text: 'Safe answer. Recovery mode. But the facade cracked.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-jordan-decision',
  },
  {
    id: 'app-jordan-decision',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Jordan pushes for a meetup. Soon. Their place or somewhere "discreet."',
        speakerId: 'match-1',
        emotion: 'seductive',
      },
      {
        text: '"I promise you won\'t be disappointed 😈"',
        speakerId: 'match-1',
        emotion: 'seductive',
      },
      {
        text: 'Trust your read. Something\'s off here.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'jordan-meet-trap',
        text: '"Sure, I\'ll come over. Send me the address."',
        nextSceneId: 'app-jordan-catfish-reveal',
        isOptimal: false,
        tactic: 'trusting',
        reaction: {
          text: 'They send an address in a sketchy part of town.',
          emotion: 'neutral',
          bodyLanguage: 'This isn\'t adding up.',
          scoreImpact: -20,
        },
      },
      {
        id: 'jordan-meet-public',
        text: '"Let\'s meet somewhere public first. I like to feel safe."',
        nextSceneId: 'app-jordan-deflects',
        isOptimal: false,
        tactic: 'safety-first',
        reaction: {
          text: '"Aw, don\'t you trust me? I promise I\'m real 😇"',
          emotion: 'pleading',
          bodyLanguage: 'Guilt trip for basic safety request. Major red flag.',
          scoreImpact: 5,
        },
      },
      {
        id: 'jordan-reverse-image',
        text: 'Reverse image search their photos before responding.',
        nextSceneId: 'app-jordan-busted',
        isOptimal: true,
        tactic: 'verification',
        reaction: {
          text: 'Stock photos. Instagram model. The images are stolen.',
          emotion: 'knowing',
          bodyLanguage: 'Your instinct was right. Always verify.',
          scoreImpact: 20,
        },
      },
      {
        id: 'jordan-ghost',
        text: 'Stop responding. Trust the red flags.',
        nextSceneId: 'app-jordan-ghost-ending',
        isOptimal: false,
        tactic: 'withdrawal',
        reaction: {
          text: 'They message three more times, each more aggressive. Then silence.',
          emotion: 'knowing',
          bodyLanguage: 'Mask slipped when they didn\'t get what they wanted.',
          scoreImpact: 10,
        },
      },
    ],
  },
  // Jordan endings
  {
    id: 'app-jordan-catfish-reveal',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'app',
    mood: 'danger',
    dialog: [
      {
        text: 'You arrive. Wait. The person who shows up looks nothing like the photos.',
      },
      {
        text: '"Surprise. I\'m the real me. Thought you might not swipe right on... this."',
      },
      {
        text: 'Deception from the start. Whatever their reasons, trust is already broken.',
        speakerId: 'inner-voice',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'app-conclusion',
  },
  {
    id: 'app-jordan-deflects',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'They keep pushing back on public meetups. Always an excuse.',
      },
      {
        text: '"Fine. Forget it. You\'re clearly not adventurous enough for me."',
        speakerId: 'match-1',
        emotion: 'angry',
      },
      {
        text: 'Anger at boundaries = bullet dodged.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-conclusion',
  },
  {
    id: 'app-jordan-busted',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    mood: 'danger',
    dialog: [
      {
        text: 'The reverse image search hits. Instagram model from Miami. Photos stolen for years.',
      },
      {
        text: 'You screenshot. Report the profile. Block.',
      },
      {
        text: 'Digital verification saved you. Always trust, but verify.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-conclusion',
  },
  {
    id: 'app-jordan-ghost-ending',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'No response. Their messages escalate.',
      },
      {
        text: '"Fine, be that way." "You\'re missing out." "You\'re not even that cute anyway."',
        speakerId: 'match-1',
        emotion: 'angry',
      },
      {
        text: 'When charm fails, hostility emerges. The real personality.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-conclusion',
  },

  // SAM CHAT (Anxious but genuine)
  {
    id: 'app-sam-chat',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'You type: "I do read a lot! What\'s your favorite book?"',
      },
      {
        text: '"Omg yay! Okay so I have like three favorites and I can\'t choose. Is that weird? Sorry I\'m probably overthinking this haha"',
        speakerId: 'match-2',
        emotion: 'happy',
      },
      {
        text: 'Anxious energy. But underneath it—genuine enthusiasm.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'sam-trap',
        text: '"Haha yeah, you definitely are overthinking it 😂"',
        nextSceneId: 'app-sam-hurt',
        isOptimal: false,
        tactic: 'teasing',
        reaction: {
          text: '"Oh... haha yeah, I know. Sorry. I\'ll try to chill out."',
          emotion: 'sad',
          bodyLanguage: 'You confirmed her fear. She\'ll be guarded now.',
          scoreImpact: -10,
        },
      },
      {
        id: 'sam-subtle',
        text: '"All good! What are the three?"',
        nextSceneId: 'app-sam-opens-up',
        isOptimal: false,
        tactic: 'encouragement',
        reaction: {
          text: 'She lists them. Explains why. Gets excited. Real personality emerging.',
          emotion: 'happy',
          bodyLanguage: 'Given space, she\'s actually interesting.',
          scoreImpact: 5,
        },
      },
      {
        id: 'sam-close',
        text: '"I can\'t choose either. It\'s a sign of good taste, not overthinking."',
        nextSceneId: 'app-sam-validated',
        isOptimal: false,
        tactic: 'validation',
        reaction: {
          text: '"Really?? Okay that makes me feel better. You\'re nice."',
          emotion: 'happy',
          bodyLanguage: 'Anxiety decreasing. Trust building.',
          scoreImpact: 10,
        },
      },
      {
        id: 'sam-optimal',
        text: '"Three favorites just means you have range. Tell me about all of them."',
        nextSceneId: 'app-sam-blossoms',
        isOptimal: true,
        tactic: 'reframe-celebrate',
        reaction: {
          text: 'She lights up. Shares stories about each book. Why they matter.',
          emotion: 'happy',
          bodyLanguage: 'Her quirk became her strength. She noticed.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // Sam branch scenes
  {
    id: 'app-sam-hurt',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'The conversation continues, but Sam\'s messages get shorter.',
      },
      {
        text: '"Yeah" "haha" "maybe"',
        speakerId: 'match-2',
        emotion: 'sad',
      },
      {
        text: 'You broke the connection. She\'s protecting herself now.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'app-sam-decision',
  },
  {
    id: 'app-sam-opens-up',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'She talks about books for thirty minutes straight. No apologies now.',
      },
      {
        text: '"Wait, do you like that author too?? OMG okay we HAVE to meet."',
        speakerId: 'match-2',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'app-sam-decision',
  },
  {
    id: 'app-sam-validated',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'She relaxes. Messages become longer. She shares a dorky joke.',
      },
      {
        text: '"Okay that was terrible sorry. I\'m actually funnier in person I swear."',
        speakerId: 'match-2',
        emotion: 'happy',
      },
      {
        text: 'The nervous energy is charming now. Not desperate.',
        speakerId: 'inner-voice',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'app-sam-decision',
  },
  {
    id: 'app-sam-blossoms',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Something shifts. She stops apologizing. Starts just... being herself.',
      },
      {
        text: '"You know what, I\'m done pretending to be chill. I\'m excited to meet you. There, I said it."',
        speakerId: 'match-2',
        emotion: 'happy',
      },
      {
        text: 'The anxiety was armor. Underneath: confidence waiting for permission.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-sam-decision',
  },
  {
    id: 'app-sam-decision',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Sam suggests meeting. A bookstore café. Daytime.',
      },
      {
        text: '"No pressure though! If you\'re busy or whatever, totally understand!"',
        speakerId: 'match-2',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'app-conclusion',
  },

  // RILEY CHAT (Secure/Direct)
  {
    id: 'app-riley-chat',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'You type: "Friday works. Where?"',
      },
      {
        text: '"That bar on 7th. 8pm. I\'ll be the one not playing games."',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: 'Direct. Refreshing. Maybe too good to be true in a different way.',
        speakerId: 'inner-voice',
        emotion: 'curious',
      },
    ],
    dialogueChoices: [
      {
        id: 'riley-trap',
        text: '"Wow, straight to the point. Most people play it cooler."',
        nextSceneId: 'app-riley-unfazed',
        isOptimal: false,
        tactic: 'testing',
        reaction: {
          text: '"Cool is overrated. I know what I want."',
          emotion: 'neutral',
          bodyLanguage: 'Didn\'t take the bait. Not reactive.',
          scoreImpact: 0,
        },
      },
      {
        id: 'riley-subtle',
        text: '"Any topics off-limits for first date conversation?"',
        nextSceneId: 'app-riley-opens',
        isOptimal: false,
        tactic: 'boundaries-check',
        reaction: {
          text: '"Nope. Ask anything. I\'ll answer honestly."',
          emotion: 'neutral',
          bodyLanguage: 'Genuinely open. Rare.',
          scoreImpact: 5,
        },
      },
      {
        id: 'riley-close',
        text: '"What made you swipe right on me specifically?"',
        nextSceneId: 'app-riley-specific',
        isOptimal: false,
        tactic: 'direct-inquiry',
        reaction: {
          text: '"Your third photo. You looked like you were actually having fun. Not performing."',
          emotion: 'neutral',
          bodyLanguage: 'Noticed authenticity. Values it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'riley-optimal',
        text: '"I appreciate directness. What else should I know before Friday?"',
        nextSceneId: 'app-riley-transparent',
        isOptimal: true,
        tactic: 'match-energy',
        reaction: {
          text: '"I\'m recently out of something serious. Not looking to jump into another one. But I\'m open to seeing where things go."',
          emotion: 'neutral',
          bodyLanguage: 'Honesty about where they are. Rare and valuable.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // Riley branch scenes
  {
    id: 'app-riley-unfazed',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'They don\'t play push-pull. Don\'t try to hook you.',
      },
      {
        text: '"See you Friday. Or not. Either way, I\'ll survive."',
        speakerId: 'match-3',
        emotion: 'smirking',
      },
      {
        text: 'Secure attachment. No games needed.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-conclusion',
  },
  {
    id: 'app-riley-opens',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: '"Actually, one thing: I don\'t do the \'be mysterious to seem interesting\' thing."',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: '"If you ask, I answer. If that\'s too much, we can skip Friday."',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: 'Setting boundaries clearly. Respecting their own time.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-conclusion',
  },
  {
    id: 'app-riley-specific',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: '"Also noticed you didn\'t use a single filter. Everyone uses filters."',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: '"Made me curious what else is real about you."',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: 'They pay attention. Value substance over performance.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-conclusion',
  },
  {
    id: 'app-riley-transparent',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: '"That said, I don\'t do the rebound thing. If we click, cool. If not, also cool."',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: '"I\'d rather be honest now than disappoint you later."',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: 'This is what emotional availability actually looks like.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'app-conclusion',
  },
];
