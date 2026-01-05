// Part 2: The Presentation - Fifteen minutes in the room

import type { Scene } from '../../../types';

export const presentationScenes: Scene[] = [
  // Scene 5: The Entrance (strong path)
  {
    id: 'exec-5-entrance',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You enter. Four faces turn toward you.',
      },
      {
        text: 'Victoria—CEO—at the head. Poker face.',
      },
      {
        text: 'Marcus—CFO—reviewing a document.',
      },
      {
        text: 'Elena—COO—checking email on phone.',
      },
      {
        text: 'Chen—your champion—gives a subtle nod.',
      },
    ],
    nextSceneId: 'exec-5b-entrance',
  },
  {
    id: 'exec-5-entrance-weak',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You enter. Four faces turn toward you.',
      },
      {
        text: 'You feel small. The room feels big. The executives feel... executive.',
        
      },
      {
        text: 'Chen gives you a look. Worried? Encouraging? Hard to tell.',
      },
    ],
    nextSceneId: 'exec-5b-entrance',
  },
  {
    id: 'exec-5b-entrance',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'We\'re ready when you are.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'This is it. The first 30 seconds set everything.',
        
      },
    ],
    choices: [
      {
        id: 'exec-5-a',
        text: 'Power opening: Pause. Eye contact. "I\'m here to show you how we capture $20M in 18 months."',
        nextSceneId: 'exec-6-power',
        feedback: 'OPTIMAL: You just told them you belong.',
        xpBonus: 20,
        isOptimal: true,
      },
      {
        id: 'exec-5-b',
        text: 'Confident but humble: "Thank you for the time. I know it\'s valuable. Here\'s what I want to share."',
        nextSceneId: 'exec-6-confident',
        feedback: 'Good. Respectful but not weak.',
        xpBonus: 12,
      },
      {
        id: 'exec-5-c',
        text: 'Jump to content: "Let me share my screen and walk you through the deck."',
        nextSceneId: 'exec-6-functional',
        feedback: 'Functional but forgettable. You\'re a presenter, not a presence.',
        xpBonus: 5,
      },
      {
        id: 'exec-5-d',
        text: 'Nervous opening: "Thanks for having me. I hope this is useful. Let me just..."',
        nextSceneId: 'exec-6-weak',
        feedback: 'TRAP: You just signaled uncertainty. They noticed.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 6: After Opening (varies by path)
  {
    id: 'exec-6-power',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You pause. Let the silence land.',
      },
      {
        text: 'Victoria\'s eyes lock on yours. She nods. Almost imperceptibly.',
        
      },
      {
        text: 'You have the room.',
        
      },
    ],
    nextSceneId: 'exec-7-reading',
  },
  {
    id: 'exec-6-confident',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Professional. Appropriate. They\'re listening.',
      },
      {
        text: 'Not electric, but solid. You\'re in the game.',
        
      },
    ],
    nextSceneId: 'exec-7-reading',
  },
  {
    id: 'exec-6-functional',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You dive into the slides. The executives watch.',
      },
      {
        text: 'You\'re presenting. But are you connecting?',
        
      },
      {
        text: 'Elena is back on her phone.',
        
      },
    ],
    nextSceneId: 'exec-7-reading',
  },
  {
    id: 'exec-6-weak',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You fumble with the screen sharing. Technical issues.',
      },
      {
        text: 'Marcus is already frowning. You haven\'t even started.',
        
      },
      {
        text: 'Recover. Now.',
        
      },
    ],
    nextSceneId: 'exec-7-reading',
  },

  // Scene 7: Reading the Room
  {
    id: 'exec-7-reading',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Five minutes in. You\'re presenting.',
      },
      {
        text: 'Scan the room. What are you seeing?',
        
      },
    ],
    nextSceneId: 'exec-7b-reading',
  },
  {
    id: 'exec-7b-reading',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Victoria—still poker face. Slight nod once. Good sign?',
      },
      {
        text: 'Marcus—frowning at a slide. Bad sign.',
      },
      {
        text: 'Elena—put down her phone. Now listening.',
      },
      {
        text: 'Chen—neutral. Won\'t help publicly.',
      },
    ],
    nextSceneId: 'exec-7c-reading',
  },
  {
    id: 'exec-7c-reading',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Marcus is skeptical. Address it before he asks. Elena is engaged. Keep her there. Victoria is unreadable.',
        
      },
      {
        text: 'Do you adjust your approach?',
        
      },
    ],
    choices: [
      {
        id: 'exec-7-a',
        text: 'Preemptive: "I can see some concern about the numbers. Let me address that directly."',
        nextSceneId: 'exec-8-preempt',
        feedback: 'OPTIMAL: You\'re reading the room and responding.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'exec-7-b',
        text: 'Stay the course - Keep presenting as planned',
        nextSceneId: 'exec-8-cfo',
        feedback: 'Neutral. You\'ll get there eventually.',
        xpBonus: 8,
      },
      {
        id: 'exec-7-c',
        text: 'Speed up - Get to the recommendation before they interrupt',
        nextSceneId: 'exec-8-rushed',
        feedback: 'Looks rushed. They\'ll sense you\'re running.',
        xpBonus: 3,
      },
      {
        id: 'exec-7-d',
        text: 'Ask: "Marcus, I see you reviewing the projections. Any immediate concerns?"',
        nextSceneId: 'exec-8-cfo',
        feedback: 'Risky. Inviting the challenge early. Could go either way.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 8: CFO Challenge
  {
    id: 'exec-8-preempt',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Let me address the projections directly.',
      },
      {
        text: 'Marcus looks up. You have his attention.',
        
      },
      {
        text: 'You walk through the assumptions. Data-backed. Defensible.',
      },
    ],
    nextSceneId: 'exec-8b-cfo',
  },
  {
    id: 'exec-8-rushed',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You speed through the analysis slides.',
      },
      {
        text: 'Wait.',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'Stop there.',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'Here it comes.',
        
      },
    ],
    nextSceneId: 'exec-8b-cfo',
  },
  {
    id: 'exec-8-cfo',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Marcus interrupts.',
      },
      {
        text: 'Stop there.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'exec-8b-cfo',
  },
  {
    id: 'exec-8b-cfo',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Your projections assume 15% growth. In this market, with these headwinds—walk me through why that\'s not wishful thinking.',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'The first hostile question. Not about information. About composure.',
        
      },
    ],
    choices: [
      {
        id: 'exec-8-a',
        text: 'Confident direct: "Fair question. Here\'s the evidence..." [specific data points]',
        nextSceneId: 'exec-9-strong',
        feedback: 'OPTIMAL: You didn\'t flinch. You answered.',
        xpBonus: 20,
        isOptimal: true,
      },
      {
        id: 'exec-8-b',
        text: 'Acknowledge and pivot: "It\'s aggressive. Here\'s why I think it\'s achievable, and here\'s the downside if we miss."',
        nextSceneId: 'exec-9-good',
        feedback: 'Good. Honest without being weak.',
        xpBonus: 15,
      },
      {
        id: 'exec-8-c',
        text: 'Defensive: "The methodology is standard. I can walk you through it..."',
        nextSceneId: 'exec-9-defensive',
        feedback: 'Defensive reads as uncertain. You\'re explaining instead of leading.',
        xpBonus: 5,
      },
      {
        id: 'exec-8-d',
        text: 'Defer: "I\'d be happy to follow up with the details after."',
        nextSceneId: 'exec-9-weak',
        feedback: 'TRAP: You just told them you don\'t know your own numbers.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 9: After CFO Challenge
  {
    id: 'exec-9-strong',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You walk through the evidence. Market data. Historical comparisons. Conservative vs. aggressive scenarios.',
      },
      {
        text: 'Marcus nods slowly. Not convinced, but not dismissing.',
        
      },
      {
        text: 'You held your ground.',
        
      },
    ],
    nextSceneId: 'exec-10-coo',
  },
  {
    id: 'exec-9-good',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You acknowledge the risk. Show you\'ve thought about it.',
      },
      {
        text: 'Marcus leans back. The frown softens.',
        
      },
      {
        text: 'Fair.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'exec-10-coo',
  },
  {
    id: 'exec-9-defensive',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You start explaining the methodology.',
      },
      {
        text: 'Marcus\'s expression doesn\'t change. You\'re losing him.',
        
      },
      {
        text: 'Move on.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'That wasn\'t a victory.',
        
      },
    ],
    nextSceneId: 'exec-10-coo',
  },
  {
    id: 'exec-9-weak',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Marcus writes something down. Not in a good way.',
      },
      {
        text: 'You just lost credibility with the CFO. That\'s hard to recover.',
        
      },
    ],
    nextSceneId: 'exec-10-coo',
  },

  // Scene 10: COO Challenge
  {
    id: 'exec-10-coo',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Elena leans forward.',
      },
      {
        text: 'I\'ve seen a lot of great strategies fail in execution.',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'How does this actually get done? Who does the work? What\'s the timeline?',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'Execution question. She doesn\'t trust vision without action.',
        
      },
    ],
    choices: [
      {
        id: 'exec-10-a',
        text: 'Concrete: "Phase one: [specific]. Phase two: [specific]. Resources: [specific]."',
        nextSceneId: 'exec-11-concrete',
        feedback: 'OPTIMAL: You gave her what she needed—specifics.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'exec-10-b',
        text: 'Framework: "I\'ve built an implementation framework that addresses resourcing, milestones, and dependencies."',
        nextSceneId: 'exec-11-framework',
        feedback: 'Good. Shows you\'ve thought about it.',
        xpBonus: 10,
      },
      {
        id: 'exec-10-c',
        text: 'Honest: "I have the high-level plan. Details would need to be worked out with ops."',
        nextSceneId: 'exec-11-honest',
        feedback: 'Honest but not what she wanted. You lost points.',
        xpBonus: 5,
      },
      {
        id: 'exec-10-d',
        text: 'Overpromise: "We can have this running in 60 days."',
        nextSceneId: 'exec-11-over',
        feedback: 'TRAP: She knows that\'s unrealistic. You just lost credibility.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 11: After COO
  {
    id: 'exec-11-concrete',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You walk through the phases. Resources. Timeline. Dependencies.',
      },
      {
        text: 'Elena nods. Makes a note.',
        
      },
      {
        text: 'You gave her something to work with.',
        
      },
    ],
    nextSceneId: 'exec-12-stumble',
  },
  {
    id: 'exec-11-framework',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You describe the framework. High-level but structured.',
      },
      {
        text: 'Elena looks moderately satisfied.',
        
      },
      {
        text: 'Not specific enough for her, but enough to move forward.',
        
      },
    ],
    nextSceneId: 'exec-12-stumble',
  },
  {
    id: 'exec-11-honest',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Elena\'s expression tightens.',
      },
      {
        text: 'So you don\'t have an execution plan.',
        speakerId: 'elena',
        emotion: 'cold',
      },
      {
        text: 'That was honest. But it hurt.',
        
      },
    ],
    nextSceneId: 'exec-12-stumble',
  },
  {
    id: 'exec-11-over',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Elena raises an eyebrow.',
      },
      {
        text: '60 days. Really.',
        speakerId: 'elena',
        emotion: 'cold',
      },
      {
        text: 'She doesn\'t believe you. Neither does anyone else in the room.',
        
      },
    ],
    nextSceneId: 'exec-12-stumble',
  },

  // Scene 12: The Stumble (CEO speaks)
  {
    id: 'exec-12-stumble',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Victoria speaks for the first time.',
      },
      {
        text: 'What about competitive response?',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'exec-12b-stumble',
  },
  {
    id: 'exec-12b-stumble',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'If this works, what do they do? And what do we do when they do it?',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'The question catches you off guard. You didn\'t prep for this angle.',
        
      },
      {
        text: 'You don\'t have a good answer. What do you do?',
        
      },
    ],
    choices: [
      {
        id: 'exec-12-a',
        text: 'Honest + thinking: "I don\'t have that fully mapped. Here\'s my initial thinking..." [genuine answer]',
        nextSceneId: 'exec-13-recover',
        feedback: 'OPTIMAL: You acknowledged the gap without losing composure.',
        xpBonus: 20,
        isOptimal: true,
      },
      {
        id: 'exec-12-b',
        text: 'Reframe: "That\'s a critical question. The scenarios I\'d consider are..." [give framework]',
        nextSceneId: 'exec-13-reframe',
        feedback: 'Good. You bought time and delivered something.',
        xpBonus: 15,
      },
      {
        id: 'exec-12-c',
        text: 'Bluff: Make up a confident-sounding answer',
        nextSceneId: 'exec-13-bluff',
        feedback: 'RISKY: If she calls you on it, you\'re done.',
        xpBonus: 5,
      },
      {
        id: 'exec-12-d',
        text: 'Freeze: "I... I\'m not sure. Let me get back to you."',
        nextSceneId: 'exec-13-freeze',
        feedback: 'TRAP: You just lost the room.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 13: After Stumble
  {
    id: 'exec-13-recover',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I don\'t have that fully mapped. Here\'s my initial thinking—',
      },
      {
        text: 'You walk through the logic. Not perfect. But honest and grounded.',
      },
      {
        text: 'Victoria listens. Nods once.',
        
      },
      {
        text: 'That\'s fair. Something to develop.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'You recovered. That might matter more than the stumble.',
        
      },
    ],
    nextSceneId: 'exec-14-close',
  },
  {
    id: 'exec-13-reframe',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You reframe the question. Give her a framework for thinking about competitive response.',
      },
      {
        text: 'Victoria considers.',
        
      },
      {
        text: 'Okay. Develop that.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Not a full answer, but you stayed in control.',
        
      },
    ],
    nextSceneId: 'exec-14-close',
  },
  {
    id: 'exec-13-bluff',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You make up an answer. Sounds confident enough.',
      },
      {
        text: 'Victoria stares at you for a long moment.',
        
      },
      {
        text: 'Hmm.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Did she buy it? Hard to tell.',
        
      },
    ],
    nextSceneId: 'exec-14-close',
  },
  {
    id: 'exec-13-freeze',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I... I\'m not sure. Let me get back to you.',
      },
      {
        text: 'Silence. Victoria\'s expression doesn\'t change.',
      },
      {
        text: 'Chen is looking at the table.',
        
      },
      {
        text: 'You lost the room.',
        
      },
    ],
    nextSceneId: 'exec-14-close',
  },

  // Scene 14: The Close
  {
    id: 'exec-14-close',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Fourteen minutes. Time to close.',
      },
      {
        text: 'The close matters. Weak close erases strong presentation. Strong close covers minor stumbles.',
        
      },
    ],
    choices: [
      {
        id: 'exec-14-a',
        text: 'Clear recommendation: "My recommendation is X. Here\'s why. I\'m asking for Y to proceed."',
        nextSceneId: 'exec-15-crisp',
        feedback: 'OPTIMAL: That\'s how you close.',
        xpBonus: 20,
        isOptimal: true,
      },
      {
        id: 'exec-14-b',
        text: 'Summarize and invite: "In summary: [three points]. I\'d value your direction on next steps."',
        nextSceneId: 'exec-15-good',
        feedback: 'Good. Clear and professional.',
        xpBonus: 12,
      },
      {
        id: 'exec-14-c',
        text: 'Open-ended: "So that\'s the proposal. Happy to answer any other questions."',
        nextSceneId: 'exec-15-open',
        feedback: 'Weak. No clear ask.',
        xpBonus: 5,
      },
      {
        id: 'exec-14-d',
        text: 'Fizzle: "That\'s... basically it. Let me know what you think."',
        nextSceneId: 'exec-15-fizzle',
        feedback: 'TRAP: You just erased whatever momentum you had.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 15: After Close
  {
    id: 'exec-15-crisp',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'My recommendation is to proceed with Phase 1. The ROI case is strong. I\'m asking for approval to begin in Q1.',
      },
      {
        text: 'Victoria nods.',
        
      },
      {
        text: 'Thank you. We\'ll discuss.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'That\'s the close. You asked. They\'ll decide.',
        
      },
    ],
    nextSceneId: 'exec-16-aftermath',
  },
  {
    id: 'exec-15-good',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You summarize the key points. Ask for direction.',
      },
      {
        text: 'We\'ll follow up.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Professional. Not electric, but solid.',
        
      },
    ],
    nextSceneId: 'exec-16-aftermath',
  },
  {
    id: 'exec-15-open',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You finish. The room is quiet.',
      },
      {
        text: 'Thank you.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'That\'s it. No clear next step.',
        
      },
    ],
    nextSceneId: 'exec-16-aftermath',
  },
  {
    id: 'exec-15-fizzle',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You trail off. The presentation fades.',
      },
      {
        text: '...Okay.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'That was a whimper, not a close.',
        
      },
    ],
    nextSceneId: 'exec-16-aftermath',
  },
];
