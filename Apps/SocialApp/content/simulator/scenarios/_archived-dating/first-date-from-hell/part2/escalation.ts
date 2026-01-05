// Part 2: The Escalation
// Scenes 4-8: Bigger red flags and exit planning

import type { Scene } from '../../../types';

export const escalationScenes: Scene[] = [
  // SCENE 4: THE COMMENT
  {
    id: 'scene-4-comment',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: '{date} leans in closer. "You know what I like about you?"',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        text: '"You\'ve got this thing. Like you don\'t even know how hot you are." Their eyes travel down again. "That body in that outfit. You knew what you were doing when you picked it."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        
        text: "That was not a compliment. That was a claim.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-4a',
        text: '"Ha, yeah, okay..."',
        nextSceneId: 'scene-5-logistics',
        xpBonus: 0,
        feedback: "You laughed off something that made you uncomfortable.",
        tactic: 'laugh_off',
      },
      {
        id: 'choice-4b',
        text: '"Anyway. What\'s good on the menu here?"',
        nextSceneId: 'scene-5-logistics',
        xpBonus: 8,
        feedback: "You didn't engage with the comment.",
        tactic: 'redirect',
      },
      {
        id: 'choice-4c',
        text: '"I\'d rather you didn\'t comment on my body like that."',
        nextSceneId: 'scene-4-escalate',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Direct. Clear. Their reaction will tell you everything.",
        tactic: 'direct_boundary',
      },
      {
        id: 'choice-4d',
        text: '"Okay." Start thinking about how to leave.',
        nextSceneId: 'scene-6-planning',
        xpBonus: 10,
        feedback: "You're done. Now you're planning.",
        tactic: 'exit_mode',
      },
    ],
  },

  // SCENE 4B: BLAKE ESCALATES
  {
    id: 'scene-4-escalate',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You told them not to comment on your body. {date}\'s smile freezes.',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: '"It was a COMPLIMENT. Most people would say thank you."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"You\'re really uptight, you know that? I\'m trying to be nice here."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        
        text: "They're angry you didn't accept being objectified. That's your answer.",
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-6-planning',
  },

  // SCENE 5: THE LOGISTICS TRAP
  {
    id: 'scene-5-logistics',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You want out. The feeling is clear now. But then you remember the logistics.",
      },
      {
        text: "They drove. The restaurant was their choice - thirty minutes from your place. Your phone is almost dead. If you say you're leaving, you'll need to explain. Get a ride. Maybe wait outside alone.",
      },
      {
        
        text: "They chose this place for a reason.",
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'scene-6-planning',
  },

  // SCENE 6: EXIT PLANNING
  {
    id: 'scene-6-planning',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{date} is telling another story. You're nodding automatically. But your brain is elsewhere. Mapping exits. Weighing options.",
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        
        text: "Options: Bathroom phone call. Fake emergency. Direct confrontation. Waiting it out.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-6a',
        text: '"I need to use the restroom. Be right back."',
        nextSceneId: 'scene-7-bathroom',
        xpBonus: 10,
        feedback: "Classic move. Call for backup.",
        tactic: 'bathroom_escape',
      },
      {
        id: 'choice-6b',
        text: 'Endure. Get through dinner. Leave as soon as acceptable.',
        nextSceneId: 'scene-8-worse',
        xpBonus: 0,
        feedback: "Waiting it out means absorbing more. Is it worth it?",
        tactic: 'wait_it_out',
      },
      {
        id: 'choice-6c',
        text: 'Try to catch the server\'s eye.',
        nextSceneId: 'scene-7-server',
        xpBonus: 8,
        feedback: "Staff can be allies.",
        tactic: 'server_ally',
      },
      {
        id: 'choice-6d',
        text: 'Take a breath. You\'re going to say you\'re leaving.',
        nextSceneId: 'scene-10-direct',
        xpBonus: 12,
        isOptimal: true,
        feedback: "No games. No excuses. Just done.",
        tactic: 'direct_exit',
      },
    ],
  },

  // SCENE 7: THE BATHROOM CALL
  {
    id: 'scene-7-bathroom',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You're in the bathroom. Phone in hand. Calling your emergency contact.",
      },
      {
        text: '{friend} answers: "Hey! How\'s it going?"',
        speakerId: 'friend',
        emotion: 'happy',
      },
      {
        text: '"Not great. I need an exit."',
      },
      {
        text: '"Oh shit. Where are you?"',
        speakerId: 'friend',
        emotion: 'concerned',
      },
      {
        
        text: "Backup secured. Now how do you use it?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-7a',
        text: '"Call me back in 5 minutes. Sound urgent."',
        nextSceneId: 'scene-9-fake-emergency',
        xpBonus: 10,
        feedback: "Classic extraction. It works.",
        tactic: 'fake_emergency',
      },
      {
        id: 'choice-7b',
        text: '"Can you come get me? I\'ll send you the location."',
        nextSceneId: 'scene-10-waiting',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Real exit. You'll still have to say you're leaving.",
        tactic: 'real_pickup',
      },
      {
        id: 'choice-7c',
        text: '"Maybe I\'m overreacting. They\'re just... a lot."',
        nextSceneId: 'scene-7-reality-check',
        xpBonus: 3,
        feedback: "Your friend can hear the discomfort. Trust it.",
        tactic: 'doubt_self',
      },
    ],
  },

  // SCENE 7B: SERVER CONNECTION
  {
    id: 'scene-7-server',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You catch the server's eye. Something in your face must register.",
        speakerId: 'server',
        emotion: 'concerned',
      },
      {
        text: '"Everything okay over here?" They\'re looking at you, not {date}. A pointed look.',
        speakerId: 'server',
        emotion: 'neutral',
      },
      {
        text: '{date} waves dismissively. "We\'re fine. Just waiting on entrees."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        
        text: "The server saw something. Use them if you need to.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-7s-a',
        text: '"Actually, could I get the check? I\'m not feeling well."',
        nextSceneId: 'scene-11-standing',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You're signaling to staff and ending the meal officially.",
        tactic: 'server_exit',
      },
      {
        id: 'choice-7s-b',
        text: '"We\'re fine, thanks."',
        nextSceneId: 'scene-8-worse',
        xpBonus: 0,
        feedback: "You missed the lifeline.",
        tactic: 'miss_opportunity',
      },
      {
        id: 'choice-7s-c',
        text: 'Follow them to the counter. Ask for help quietly.',
        nextSceneId: 'scene-7-server-help',
        xpBonus: 10,
        feedback: "Smart. Private ask for assistance.",
        tactic: 'private_help',
      },
    ],
  },

  // SCENE 7C: FRIEND'S REALITY CHECK
  {
    id: 'scene-7-reality-check',
    backgroundId: 'apartment',
    dialog: [
      {
        text: '{friend}\'s voice goes firm.',
        speakerId: 'friend',
        emotion: 'neutral',
      },
      {
        text: '"You\'re calling me from the bathroom on a first date. You\'re not overreacting. What did they do?"',
        speakerId: 'friend',
        emotion: 'concerned',
      },
      {
        text: 'You explain: the interrupting, the touching, the comment about your body.',
      },
      {
        text: '"Yeah, you need to leave. What do you need from me?"',
        speakerId: 'friend',
        emotion: 'neutral',
      },
      {
        
        text: "They're right. You know they're right.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-7r-a',
        text: '"Okay. Call me back in 5."',
        nextSceneId: 'scene-9-fake-emergency',
        xpBonus: 10,
        feedback: "You're getting out.",
        tactic: 'accept_help',
      },
      {
        id: 'choice-7r-b',
        text: '"Can you come? Please?"',
        nextSceneId: 'scene-10-waiting',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Help is on the way.",
        tactic: 'request_pickup',
      },
      {
        id: 'choice-7r-c',
        text: '"No, I\'ve got it. I just needed to hear someone say it."',
        nextSceneId: 'scene-10-direct',
        xpBonus: 10,
        feedback: "You trusted yourself. Now act on it.",
        tactic: 'self_handle',
      },
    ],
  },

  // SCENE 7D: SERVER HELPS PRIVATELY
  {
    id: 'scene-7-server-help',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You follow the server to the counter. Speak quietly: "I need to leave but they drove me. Can you help?"',
        speakerId: 'server',
        emotion: 'concerned',
      },
      {
        text: '"Absolutely. I can call you a cab. There\'s a back exit through the kitchen if you need it."',
        speakerId: 'server',
        emotion: 'neutral',
      },
      {
        
        text: "Staff know. Staff help. Remember this.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-7h-a',
        text: '"Yes. Back exit. Please."',
        nextSceneId: 'ending-trusted-gut',
        xpBonus: 15,
        isOptimal: true,
        feedback: "Clean extraction. Well executed.",
        tactic: 'back_exit',
      },
      {
        id: 'choice-7h-b',
        text: '"I\'ll tell them I\'m leaving first. Then the cab."',
        nextSceneId: 'scene-10-direct',
        xpBonus: 12,
        feedback: "You want to face it directly. Brave.",
        tactic: 'face_direct',
      },
    ],
  },

  // SCENE 8: DINNER CONTINUES (It Gets Worse)
  {
    id: 'scene-8-worse',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You decided to wait it out. It\'s getting worse.',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        text: '"So I was thinking. After this, we could go back to my place." Their hand is on your knee under the table now. "I have wine. Better than this stuff. We could... get to know each other better."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        
        text: "Get out. Now.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-8a',
        text: '"I\'m going to go. This isn\'t working for me."',
        nextSceneId: 'scene-10-direct',
        xpBonus: 12,
        isOptimal: true,
        feedback: "No more politeness. You're done.",
        tactic: 'hard_no',
      },
      {
        id: 'choice-8b',
        text: '"I have an early morning. I should head out soon."',
        nextSceneId: 'scene-8-pushback',
        xpBonus: 5,
        feedback: "Exit signaled. Let's see if they accept it.",
        tactic: 'soft_exit',
      },
      {
        id: 'choice-8c',
        text: 'Take their hand off your knee. "I didn\'t say you could touch me."',
        nextSceneId: 'scene-8-touch-reaction',
        xpBonus: 12,
        feedback: "Direct physical boundary. Their reaction will be telling.",
        tactic: 'remove_hand',
      },
      {
        id: 'choice-8d',
        text: '"I need to use the restroom."',
        nextSceneId: 'scene-7-bathroom',
        xpBonus: 8,
        feedback: "You're getting space to think.",
        tactic: 'late_bathroom',
      },
    ],
  },

  // SCENE 8B: BLAKE PUSHES BACK
  {
    id: 'scene-8-pushback',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You said you needed to leave. {date} isn\'t accepting that.',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: '"Come on. The night\'s just getting started. One more drink. I drove all the way out here."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        text: '"You\'re not going to make me drink alone, are you?" Their hand finds your knee again.',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        
        text: "They're not hearing you. They're negotiating.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-8b-a',
        text: '"I\'m leaving. Thank you for dinner." Stand up.',
        nextSceneId: 'scene-11-standing',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You removed yourself from the table. Good.",
        tactic: 'stand_up',
      },
      {
        id: 'choice-8b-b',
        text: '"I really do need to go. It was nice meeting you."',
        nextSceneId: 'scene-8-keeps-pushing',
        xpBonus: 3,
        feedback: "Polite. But will they let you?",
        tactic: 'polite_repeat',
      },
      {
        id: 'choice-8b-c',
        text: '"Excuse me, could we get the check please?"',
        nextSceneId: 'scene-11-standing',
        xpBonus: 10,
        feedback: "You're signaling to staff and ending the meal officially.",
        tactic: 'call_check',
      },
    ],
  },

  // SCENE 8C: TOUCH REACTION
  {
    id: 'scene-8-touch-reaction',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You physically removed their hand. {date}\'s face darkens.',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Jesus. Relax. It\'s not a big deal."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: '"You\'re really wound tight, aren\'t you? I\'m trying to show you I\'m interested."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        
        text: "You said no. They're angry you enforced it. Everything you need to know.",
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-10-direct',
  },

  // SCENE 8D: KEEPS PUSHING
  {
    id: 'scene-8-keeps-pushing',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: '{date} leans back, shaking their head.',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: '"What, you got a better offer? Someone else waiting?" They laugh but it\'s not friendly. "Come on. Stay. I\'ll make it worth your while."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        
        text: "They don't hear 'no.' That's the whole problem.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-8d-a',
        text: 'Stand up. Walk away. Don\'t explain.',
        nextSceneId: 'scene-11-standing',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Actions speak when words aren't heard.",
        tactic: 'just_leave',
      },
      {
        id: 'choice-8d-b',
        text: 'One more attempt to leave politely.',
        nextSceneId: 'scene-10-direct',
        xpBonus: 5,
        feedback: "You've been polite enough.",
        tactic: 'final_polite',
      },
    ],
  },
];
