// Part 2: Adaptation - Strategy Implementation for Each Boss Type

import type { Scene } from '../../../types';

export const adaptationScenes: Scene[] = [
  // === MICROMANAGER ADAPTATION ===

  // Proactive approach (optimal)
  {
    id: 'boss-4-micro-proactive',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Monday morning. You\'re trying the proactive approach.',
      },
      {
        text: 'You send an email at 8:55 AM:',
      },
      {
        text: '"Morning! Quick status update: Henderson final review today, delivery Wednesday. Q3 planning meeting tomorrow. Team sync Thursday. Let me know if you want to adjust priorities."',
      },
    ],
    nextSceneId: 'boss-4m-proactive-result',
  },
  {
    id: 'boss-4m-proactive-result',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Perfect. Thanks for the heads up.',
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: 'No follow-up. No status check. No anxiety cascade.',
      },
      {
        text: 'That\'s... different. You fed the beast before it got hungry.',
        
      },
    ],
    nextSceneId: 'boss-5-micro-oneonone',
  },

  // Conflict approach
  {
    id: 'boss-4-micro-conflict',
    backgroundId: 'office',
    dialog: [
      {
        text: 'I\'ll update you when there\'s something to report.',
      },
      {
        text: 'Jordan\'s reply comes in 47 seconds.',
      },
      {
        text: 'I need to stay informed. Please send updates at minimum twice daily. Thanks.',
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        text: 'You just escalated their anxiety. Now it\'s a rule.',
        
      },
    ],
    nextSceneId: 'boss-5-micro-oneonone',
  },

  // Exhausting approach
  {
    id: 'boss-4-micro-exhausting',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You reply to every email within minutes. Status updates flow constantly.',
      },
      {
        text: 'By Thursday, you\'ve sent 73 emails. Your actual work? Behind.',
      },
      {
        text: 'You\'re feeding the cycle instead of breaking it. This isn\'t sustainable.',
        
      },
    ],
    nextSceneId: 'boss-5-micro-oneonone',
  },

  // Document approach
  {
    id: 'boss-4-micro-document',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You create a tracking document. Every email, every request, every timestamp.',
      },
      {
        text: 'After two weeks: 147 status requests. 23 "just checking in" emails. Average response time demanded: 12 minutes.',
      },
      {
        text: 'The pattern is undeniable. But you\'re still living in it every day.',
        
      },
    ],
    nextSceneId: 'boss-5-micro-oneonone',
  },

  // Scene 5M: One-on-One
  {
    id: 'boss-5-micro-oneonone',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'One-on-one with Jordan.',
      },
      {
        text: 'I appreciate the updates. It helps me feel connected to what\'s happening.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'I know I can be... detail-oriented.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'That\'s one word for it.',
        
      },
      {
        text: 'My last team had some issues. Surprised me with problems. I\'m trying to make sure that doesn\'t happen here.',
        speakerId: 'jordan',
        emotion: 'sad',
      },
      {
        text: 'Their anxiety makes sense now. It\'s not about you. It\'s about someone before you.',
        
      },
    ],
    choices: [
      {
        id: 'boss-5m-a',
        text: '"That sounds frustrating. I\'m committed to keeping you informed."',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'OPTIMAL: Acknowledge and commit. You\'re building trust.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-5m-b',
        text: '"I hear you. Can we find a rhythm that works for both of us?"',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Good. Setting a boundary while staying collaborative.',
        xpBonus: 12,
      },
      {
        id: 'boss-5m-c',
        text: '"What would help you feel most confident in the team?"',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Smart. Making them part of the solution.',
        xpBonus: 10,
      },
      {
        id: 'boss-5m-d',
        text: 'Note the intel, don\'t engage emotionally',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Protected. But you missed a chance to build connection.',
        xpBonus: 5,
      },
    ],
  },

  // === CREDIT THIEF ADAPTATION ===

  // Skip-level approach (optimal)
  {
    id: 'boss-4-credit-skip',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You find reasons to interact with Casey directly.',
      },
      {
        text: 'A question about the Q4 strategy. Volunteering for a cross-functional initiative. Casual coffee when paths cross.',
      },
      {
        text: 'Slow. Careful. Professional. Building the relationship without attacking Jordan.',
        
      },
    ],
    nextSceneId: 'boss-5-credit-meeting',
  },

  // Visibility approach
  {
    id: 'boss-4-credit-visible',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You start CCing leadership on key deliverables. Before Jordan can present.',
      },
      {
        text: '"Attaching the Henderson analysis for review..."',
      },
      {
        text: 'Jordan notices. Their next email to you is... cooler.',
        
      },
    ],
    nextSceneId: 'boss-5-credit-meeting',
  },

  // Confront approach
  {
    id: 'boss-4-credit-confront',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I\'d like to present my own work going forward. To get exposure to leadership.',
      },
      {
        text: 'That makes sense. Let me think about the right opportunities.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'They\'re smiling. But their eyes aren\'t.',
        
      },
      {
        text: 'Two weeks later: you\'re still not presenting.',
      },
    ],
    nextSceneId: 'boss-5-credit-meeting',
  },

  // Exit approach
  {
    id: 'boss-4-credit-exit',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You accept the situation. Focus on what you can control.',
      },
      {
        text: 'Resume updated. LinkedIn optimized. Recruiter calls returned.',
      },
      {
        text: 'Practical. But every meeting still stings when your work becomes their credit.',
        
      },
    ],
    nextSceneId: 'boss-5-credit-meeting',
  },

  // Scene 5C: Next Meeting
  {
    id: 'boss-5-credit-meeting',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Another leadership presentation. Jordan at the front again.',
      },
      {
        text: 'This Henderson solution is really coming together. Great team effort.',
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: '"Team effort." Better than "I did this." Progress?',
        
      },
      {
        text: 'Casey catches your eye. Nods slightly.',
      },
      {
        text: 'They know. The question is what you do with that.',
        
      },
    ],
    choices: [
      {
        id: 'boss-5c-a',
        text: 'After the meeting, approach Casey casually',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'OPTIMAL: Build on that recognition. Carefully.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-5c-b',
        text: 'Let the moment pass. Don\'t push it.',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Safe. But moments like this don\'t come often.',
        xpBonus: 5,
      },
      {
        id: 'boss-5c-c',
        text: 'Speak up in the meeting: "Happy to answer questions on Henderson"',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Bold. You just claimed your work publicly.',
        xpBonus: 10,
      },
      {
        id: 'boss-5c-d',
        text: 'Document this for your file',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Protection. But documentation won\'t build visibility.',
        xpBonus: 8,
      },
    ],
  },

  // === ABSENT MANAGER ADAPTATION ===

  // Structure approach (optimal)
  {
    id: 'boss-4-absent-structure',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You create your own operating system.',
      },
      {
        text: 'Weekly priorities you set yourself. Mentors from other teams. Regular check-ins with stakeholders.',
      },
      {
        text: 'Jordan is absent. Fine. You\'ll build around them.',
        
      },
    ],
    nextSceneId: 'boss-5-absent-results',
  },

  // Fill vacuum approach
  {
    id: 'boss-4-absent-fill',
    backgroundId: 'office',
    dialog: [
      {
        text: 'When no one\'s steering, someone has to.',
      },
      {
        text: 'You start making calls. Priority decisions. Resource allocations. Cross-team coordination.',
      },
      {
        text: 'The team looks to you now. But you\'re doing Jordan\'s job. For your salary.',
        
      },
    ],
    nextSceneId: 'boss-5-absent-results',
  },

  // Escalate approach
  {
    id: 'boss-4-absent-escalate',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You find time with Casey.',
      },
      {
        text: 'I need guidance on priorities, and my one-on-ones keep getting canceled. What would you suggest?',
      },
      {
        text: 'Casey\'s face is carefully neutral.',
      },
      {
        text: 'I appreciate you bringing this up. Let me look into it.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'You just threw Jordan under the bus. Was it worth it?',
        
      },
    ],
    nextSceneId: 'boss-5-absent-results',
  },

  // Force approach
  {
    id: 'boss-4-absent-force',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You book the meetings. Mark them urgent. Follow up persistently.',
      },
      {
        text: 'Jordan finally shows up. Distracted. Checking their phone. Clearly wants to be elsewhere.',
      },
      {
        text: 'Can you give me 15 minutes? I really need direction here.',
      },
      {
        text: 'Sorry, I\'ve got a conflict. Let\'s... reschedule.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'You can\'t force presence. They\'re already gone.',
        
      },
    ],
    nextSceneId: 'boss-5-absent-results',
  },

  // Scene 5A: Results
  {
    id: 'boss-5-absent-results',
    backgroundId: 'office',
    dialog: [
      {
        text: 'A month passes. Henderson ships. Successfully.',
      },
      {
        text: 'Nice work on Henderson. I knew you\'d handle it.',
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: 'You want credit for trusting. When you were just absent.',
        
      },
      {
        text: 'The question: do you need their guidance? Or just their absence?',
        
      },
    ],
    choices: [
      {
        id: 'boss-5a-a',
        text: '"Thanks. I\'d love your input on the next phase when you have time."',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Gracious. Leaving the door open.',
        xpBonus: 10,
      },
      {
        id: 'boss-5a-b',
        text: '"The team really stepped up. Morgan especially."',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Spreading credit. Good leadership.',
        xpBonus: 12,
      },
      {
        id: 'boss-5a-c',
        text: 'Just nod. You don\'t need their validation.',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Independent. You\'ve built your own engine.',
        xpBonus: 8,
      },
      {
        id: 'boss-5a-d',
        text: '"I had to figure it out. Some guidance would have helped."',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Honest but risky. They might hear criticism.',
        xpBonus: 5,
      },
    ],
  },

  // === HOSTILE MANAGER ADAPTATION ===

  // Document approach (optimal)
  {
    id: 'boss-4-hostile-document',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You start building the file.',
      },
      {
        text: 'Date, time, incident, witnesses. Every public criticism. Every impossible deadline. Every moved goalpost.',
      },
      {
        text: 'Screenshot of the Slack message: saved. Morgan\'s witness statement: noted.',
      },
      {
        text: 'You\'re building a case. Hopefully you never need it.',
        
      },
    ],
    nextSceneId: 'boss-5-hostile-pattern',
  },

  // HR approach (risky)
  {
    id: 'boss-4-hostile-hr',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You go to Sam in HR.',
      },
      {
        text: 'I appreciate you bringing this to me. These are serious concerns.',
        speakerId: 'sam',
        emotion: 'neutral',
      },
      {
        text: 'Have you documented specific incidents? Dates, times, witnesses?',
        speakerId: 'sam',
        emotion: 'neutral',
      },
      {
        text: 'I... no. Not formally.',
      },
      {
        text: 'I\'d recommend starting there. It helps us understand the pattern.',
        speakerId: 'sam',
        emotion: 'neutral',
      },
      {
        text: 'They\'re not going to do anything. And now there\'s a record of your complaint.',
        
      },
    ],
    nextSceneId: 'boss-5-hostile-pattern',
  },

  // Alliance approach
  {
    id: 'boss-4-hostile-alliance',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You connect with others on the team. Carefully.',
      },
      {
        text: 'It\'s not just you. Everyone feels it. We just don\'t know what to do.',
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: 'Two others come forward. Similar experiences. Similar documentation.',
      },
      {
        text: 'Strength in numbers. A pattern is harder to dismiss than a complaint.',
        
      },
    ],
    nextSceneId: 'boss-5-hostile-pattern',
  },

  // Grey rock approach
  {
    id: 'boss-4-hostile-grey',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You become boring. Unreactive. A grey rock.',
      },
      {
        text: 'Yes. Understood. I\'ll address that.',
      },
      {
        text: 'No emotion. No reaction. Nothing for them to feed on.',
      },
      {
        text: 'Jordan\'s attacks become less frequent. Less satisfying when you don\'t flinch.',
        
      },
      {
        text: 'But you\'re still there. Still under their thumb.',
      },
    ],
    nextSceneId: 'boss-5-hostile-pattern',
  },

  // Scene 5H: The Pattern Continues
  {
    id: 'boss-5-hostile-pattern',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Team meeting. Jordan is reviewing performance.',
      },
      {
        text: 'Most of you are on track. Some of you... need to step up.',
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        text: 'They look directly at you.',
      },
      {
        text: 'Public. Again. The pattern continues.',
        
      },
      {
        text: 'But now you have options.',
        
      },
    ],
    choices: [
      {
        id: 'boss-5h-a',
        text: 'Stay calm. Document this moment. Add it to the file.',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'OPTIMAL: Keep building the case.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-5h-b',
        text: 'Ask for specific feedback after the meeting',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Professional. Creates a paper trail of your good faith.',
        xpBonus: 12,
      },
      {
        id: 'boss-5h-c',
        text: 'Lock eyes. Don\'t look away.',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Defiant. They\'ll notice. Could escalate or deter.',
        xpBonus: 8,
      },
      {
        id: 'boss-5h-d',
        text: 'Grey rock. No reaction at all.',
        nextSceneId: 'boss-6-skip-level',
        feedback: 'Defensive. Survival mode.',
        xpBonus: 5,
      },
    ],
  },

  // === SHARED SKIP-LEVEL SCENE ===

  {
    id: 'boss-6-skip-level',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Hallway. Casey, Jordan\'s boss, is walking toward you.',
      },
      {
        text: 'Hey - how\'s everything going? I like to check in with the team.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'Skip-level opportunity. Careful.',
        
      },
      {
        text: 'Complaining about Jordan = political suicide. Being honest about your work = visibility. Building the relationship = protection.',
        
      },
    ],
    choices: [
      {
        id: 'boss-6-a',
        text: '"Things are going well. I\'m learning a lot."',
        nextSceneId: 'boss-7-long-game',
        feedback: 'Safe. Forgettable. You didn\'t use the opportunity.',
        xpBonus: 5,
      },
      {
        id: 'boss-6-b',
        text: '"Really enjoying the Henderson work. I led the redesign."',
        nextSceneId: 'boss-7-long-game',
        feedback: 'Smart. Claiming your credit where it matters.',
        xpBonus: 12,
      },
      {
        id: 'boss-6-c',
        text: '"Jordan keeps me busy! I\'m grateful for the autonomy."',
        nextSceneId: 'boss-7-long-game',
        feedback: 'Subtle signal. Casey might read between the lines.',
        xpBonus: 10,
      },
      {
        id: 'boss-6-d',
        text: '"I\'d love to get your perspective sometime, if you have 15 minutes."',
        nextSceneId: 'boss-7-long-game',
        feedback: 'OPTIMAL: Building the skip-level relationship.',
        xpBonus: 15,
        isOptimal: true,
      },
    ],
  },
];
