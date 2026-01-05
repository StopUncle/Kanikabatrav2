import type { ForkScene } from '../../../../types';

/**
 * Study Path - Scene 2: Meeting Casey
 * Getting to know Casey and recognizing anxious attachment patterns
 * DEFENSIVE VERSION: Learning to identify over-giving and people-pleasing as warning signs
 */
export const meetingCaseyScenes: ForkScene[] = [
  {
    id: 'study-meeting-casey',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    chapter: {
      name: 'The Study Hall',
      index: 2,
      total: 5,
    },
    dialog: [
      {
        text: 'You end up at her table. She\'s nervous but trying to hide it.',
      },
      {
        text: '"I\'m Casey." She offers her hand, then pulls it back. "Sorry, is that weird? Handshakes. Nobody does handshakes anymore."',
        speakerId: 'casey',
        emotion: 'confused',
      },
      {
        text: 'Second-guessing. Every small action.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'casey-handshake',
        text: 'Take her hand. "I\'m new here. I appreciate the traditional approach."',
        reaction: {
          text: 'She relaxes visibly. Her handshake is surprisingly firm. "New? That must be overwhelming. Let me know if you need anything—I know where everything is."',
          emotion: 'happy',
          bodyLanguage: 'Already offering help. Already trying to be useful.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-casey-offers',
      },
      {
        id: 'casey-simple',
        text: '"Nice to meet you, Casey. What are you studying?"',
        reaction: {
          text: '"Biochem. I know, exciting, right?" She laughs self-deprecatingly. "What about you?"',
          emotion: 'neutral',
          bodyLanguage: 'Put-down before you could judge. Preemptive defense.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-casey-conversation',
        isOptimal: true,
      },
      {
        id: 'casey-tease',
        text: '"Handshakes are making a comeback. You\'re ahead of the curve."',
        reaction: {
          text: 'She laughs—surprised, pleased. "I like that. Ahead of the curve." She tests the phrase like it\'s new.',
          emotion: 'happy',
          bodyLanguage: 'A compliment she can believe. That\'s rare for her.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-casey-conversation',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'study-casey-conversation',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'The conversation flows easier than expected. Casey is smart—surprisingly so. Her insights are sharp, even when she undercuts them.',
      },
      {
        text: '"I mean, that\'s probably wrong. I don\'t know. Ignore me."',
        speakerId: 'casey',
        emotion: 'confused',
      },
      {
        text: 'She dismisses her own intelligence before you can evaluate it.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'conversation-validate',
        text: '"That was actually a really good point. Don\'t dismiss it."',
        reaction: {
          text: 'She stares at you for a moment. "You think so?" Her voice is small. Hopeful.',
          emotion: 'hopeful',
          bodyLanguage: 'She\'s not used to being taken seriously.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-casey-opens',
        isOptimal: true,
        tactic: 'genuine-validation',
      },
      {
        id: 'conversation-probe',
        text: '"Why do you do that? Undercut yourself?"',
        reaction: {
          text: 'She freezes. "Do I?" Then, quieter: "I guess I\'d rather be wrong first. Before someone else tells me."',
          emotion: 'sad',
          bodyLanguage: 'Defense mechanism. She beats others to the criticism.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-casey-opens',
      },
      {
        id: 'conversation-move-on',
        text: 'Let it slide. Change the subject.',
        reaction: {
          text: 'You shift topics. Casey follows your lead, but something in her eyes dims slightly.',
          emotion: 'neutral',
          bodyLanguage: 'She was testing if you\'d see her. You chose not to.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-casey-offers',
      },
    ],
  },
  {
    id: 'study-casey-offers',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'As the conversation continues, Casey starts offering things. Her notes. Her coffee. Her time.',
      },
      {
        text: '"I could tutor you, if you want. I\'m really good at explaining things. Or I could show you around campus. Or—"',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
      {
        text: 'Too much. Too fast. She\'s trying to make herself indispensable.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'offers-boundary',
        text: '"That\'s really generous. But I don\'t want to take advantage."',
        reaction: {
          text: 'She blinks. "You\'re not! I offered. I like helping." But something flickers—confusion at being stopped.',
          emotion: 'confused',
          bodyLanguage: 'She expected you to take. That\'s what people usually do.',
          scoreImpact: 20,
        },
        nextSceneId: 'study-casey-opens',
        isOptimal: true,
        tactic: 'boundary-setting',
      },
      {
        id: 'offers-accept-some',
        text: '"Campus tour sounds nice. But only if you actually want to."',
        reaction: {
          text: '"I do! I really do." She\'s already pulling out her phone. "When works for you?"',
          emotion: 'happy',
          bodyLanguage: 'Eager. Very eager. She\'s already investing.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-casey-opens',
      },
      {
        id: 'offers-accept-all',
        text: '"That would be great. All of it."',
        reaction: {
          text: 'Her face lights up. "Really? Okay, I\'ll make a list. I\'ll organize everything—" She\'s already planning.',
          emotion: 'happy',
          bodyLanguage: 'She\'ll exhaust herself trying to be valuable. Watch for that.',
          scoreImpact: -10,
        },
        nextSceneId: 'study-casey-overextends',
      },
    ],
  },
  {
    id: 'study-casey-opens',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Something shifts. Casey\'s walls lower slightly.',
      },
      {
        text: '"Can I tell you something weird?" She doesn\'t wait for an answer. "I don\'t usually talk to people. Like, at all. But you\'re... different. Easy to talk to."',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
      {
        text: 'Instant intimacy. Feels good. But remember—she just met you.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'opens-careful',
        text: '"We just met. Maybe take it slow?"',
        reaction: {
          text: 'She pulls back slightly. "You\'re right. Sorry. I do that—get attached too fast." At least she knows.',
          emotion: 'sad',
          bodyLanguage: 'She\'s aware of her pattern. That\'s good. Self-awareness is step one.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-the-reveal',
        isOptimal: true,
        tactic: 'gentle-boundary',
      },
      {
        id: 'opens-reciprocate',
        text: '"I feel the same way. This is easy."',
        reaction: {
          text: 'Her whole face transforms. Joy. Relief. "Really?" She leans forward. "I knew it. I knew we\'d click."',
          emotion: 'happy',
          bodyLanguage: 'Be careful. She\'s building castles on a foundation you just laid.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-the-reveal',
      },
      {
        id: 'opens-neutral',
        text: '"That\'s nice of you to say."',
        reaction: {
          text: 'She waits for more. When it doesn\'t come, she nods. "Yeah. I just... yeah." She goes quiet.',
          emotion: 'neutral',
          bodyLanguage: 'You didn\'t reject or accept. She\'s uncertain.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-the-reveal',
      },
    ],
  },
  {
    id: 'study-casey-overextends',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Over the next hour, Casey\'s list grows. Tours. Tutoring. Introducing you to people. Help with registration. Access to study groups.',
      },
      {
        text: 'She\'s giving everything. You\'ve known her for ninety minutes.',
      },
      {
        text: 'This isn\'t generosity. This is fear. Fear that without all this, you\'ll leave.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'overextends-stop',
        text: '"Casey. Stop. This is too much."',
        reaction: {
          text: 'She freezes mid-sentence. "Too much?" Confusion. Fear. "I just want to help."',
          emotion: 'confused',
          bodyLanguage: 'She doesn\'t know how else to connect. This is all she knows.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-the-reveal',
        isOptimal: true,
        tactic: 'boundary-setting',
      },
      {
        id: 'overextends-redirect',
        text: '"Let\'s just start with coffee. Right now. Just coffee."',
        reaction: {
          text: 'She pauses. "Just coffee?" Like it\'s a foreign concept. "That\'s... okay. That\'s nice, actually."',
          emotion: 'neutral',
          bodyLanguage: 'You simplified the transaction. She can breathe.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-the-reveal',
        isOptimal: true,
      },
      {
        id: 'overextends-accept',
        text: '"Sounds great. I appreciate it."',
        reaction: {
          text: 'She beams. "Perfect!" She\'s already texting herself reminders. Organizing her schedule around you.',
          emotion: 'happy',
          bodyLanguage: 'You just became her project. That never ends well.',
          scoreImpact: -15,
        },
        nextSceneId: 'study-the-reveal',
      },
    ],
  },
];
