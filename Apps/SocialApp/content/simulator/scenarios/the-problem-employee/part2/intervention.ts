// Part 2: Intervention - Taking Action

import type { Scene } from '../../../types';

export const interventionScenes: Scene[] = [
  // Scene 6: HR Baseline
  {
    id: 'emp-6-hr',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'So, Casey. Walk me through what\'s happening.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'You explain the situation.',
      },
      {
        text: 'And what documentation do you have?',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'The question that reveals whether you\'re ready.',
        
      },
    ],
    nextSceneId: 'emp-6-hr-guidance',
  },
  {
    id: 'emp-6-hr-guidance',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Before we take any formal action, we need a paper trail. Performance issues documented in writing. Expectations set clearly. Opportunities to improve.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Without that, we\'re exposed. They could claim unfair treatment. We need to do this right.',
        speakerId: 'jordan',
        emotion: 'concerned',
      },
      {
        text: 'What approach do you want to take?',
        
      },
    ],
    choices: [
      {
        id: 'emp-6-a',
        text: '"Help me set up a formal Performance Improvement Plan."',
        nextSceneId: 'emp-7-difficult',
        feedback: 'OPTIMAL: The formal process protects everyone.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'emp-6-b',
        text: '"What do I need to have to move to termination?"',
        nextSceneId: 'emp-7-difficult',
        feedback: 'Direct. You\'re building the exit case.',
        xpBonus: 12,
      },
      {
        id: 'emp-6-c',
        text: '"I want to try coaching before formal steps."',
        nextSceneId: 'emp-7-difficult',
        feedback: 'Delays the timeline. May work for underperformers.',
        xpBonus: 8,
      },
      {
        id: 'emp-6-d',
        text: '"Is there a role change option? Or exit package?"',
        nextSceneId: 'emp-7-difficult',
        feedback: 'Exploring alternatives. Good to know your options.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 7: The Difficult Conversation
  {
    id: 'emp-7-difficult',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'The formal performance conversation with Casey.',
      },
      {
        text: 'I want to talk about your performance. This is a serious conversation.',
      },
      {
        text: 'Casey\'s face shifts. They know this is different.',
      },
      {
        text: 'I\'ve documented specific concerns. I need to see meaningful improvement in the next 30 days.',
      },
      {
        text: 'This is where management gets real. Clear expectations. Documented. Witnessed if possible.',
        
      },
    ],
    nextSceneId: 'emp-7-warning',
  },
  {
    id: 'emp-7-warning',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I want you to succeed here. But I need to be honest—if things don\'t change, we\'ll need to discuss next steps.',
      },
      {
        text: 'I understand. I\'ll do better.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'You\'ve set the line. Now you document everything that follows.',
        
      },
    ],
    nextSceneId: 'emp-8-paper-trail',
  },

  // Scene 8: Building the Trail
  {
    id: 'emp-8-paper-trail',
    backgroundId: 'office',
    dialog: [
      {
        text: 'After the conversation, you write the summary email.',
      },
      {
        text: 'Email to Casey, CC to HR file:',
      },
      {
        text: '"Per our conversation today, summarizing expectations: Specific deliverable due by date. Specific behavior change expected immediately. Weekly check-ins to assess progress. 30-day formal review of performance. Please reply to confirm you\'ve received and understood these expectations."',
      },
      {
        text: 'Paper. Trail. Everything.',
        
      },
    ],
    nextSceneId: 'emp-8-receipt',
  },
  {
    id: 'emp-8-receipt',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Casey replies: "Got it."',
      },
      {
        text: 'Receipt confirmed. Two words that might save you later.',
        
      },
    ],
    nextSceneId: 'emp-9-team-management',
  },

  // Scene 9: The Team Management
  {
    id: 'emp-9-team-management',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Morgan approaches.',
      },
      {
        text: 'Is something happening with Casey?',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'The team always knows.',
        
      },
      {
        text: 'People are noticing things are... different. Casey seems tense. You\'ve been having a lot of meetings.',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'You can\'t discuss personnel matters. But you need to acknowledge reality.',
        
      },
    ],
    choices: [
      {
        id: 'emp-9-a',
        text: '"I can\'t discuss individual situations, but I hear the team\'s concerns."',
        nextSceneId: 'emp-10-check',
        feedback: 'OPTIMAL: Professional wall. Protects everyone.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'emp-9-b',
        text: '"Things are being addressed. I need the team\'s patience."',
        nextSceneId: 'emp-10-check',
        feedback: 'Implicit confirmation. Boosts team morale.',
        xpBonus: 12,
      },
      {
        id: 'emp-9-c',
        text: '"I\'m not aware of any situation. Is there something specific?"',
        nextSceneId: 'emp-10-check',
        feedback: 'They know you\'re deflecting. Trust erodes.',
        xpBonus: 3,
      },
      {
        id: 'emp-9-d',
        text: '"The team\'s experience matters. Keep documenting specific incidents."',
        nextSceneId: 'emp-10-check',
        feedback: 'Asking for support. Builds your case.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 10: The 30-Day Check
  {
    id: 'emp-10-check',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'It\'s been 30 days. Time to review.',
      },
      {
        text: 'You look at the metrics. The feedback. The documentation.',
      },
      {
        text: 'The moment of truth. Did anything change?',
        
      },
    ],
    choices: [
      {
        id: 'emp-10-a',
        text: 'Improvement shown - deadlines met, quality improved',
        nextSceneId: 'emp-10-improved',
        feedback: 'Something clicked. The coaching worked.',
        xpBonus: 15,
      },
      {
        id: 'emp-10-b',
        text: 'No improvement - still missing deadlines, same issues',
        nextSceneId: 'emp-10-no-improvement',
        feedback: 'Effort without results isn\'t enough.',
        xpBonus: 10,
      },
    ],
  },

  // Branch A: Improvement
  {
    id: 'emp-10-improved',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Deadlines met. Quality improved. Attitude engaged. Something clicked.',
      },
      {
        text: 'I\'ve been working really hard on the feedback. How am I doing?',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'They turned it around. The coaching worked.',
        
      },
      {
        text: 'How do you respond?',
        
      },
    ],
    choices: [
      {
        id: 'emp-10i-a',
        text: '"I\'ve noticed real improvement. Let\'s keep building on this."',
        nextSceneId: 'ending-rehabilitation',
        feedback: 'OPTIMAL: Acknowledge progress. Keep coaching.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'emp-10i-b',
        text: '"Good progress. But we\'re still in the evaluation period."',
        nextSceneId: 'ending-unresolved',
        feedback: 'Cautious. Maybe too cautious.',
        xpBonus: 8,
      },
    ],
  },

  // Branch B: No Improvement
  {
    id: 'emp-10-no-improvement',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Two more missed deadlines. Quality still poor. The coaching didn\'t take.',
      },
      {
        text: 'I know it\'s not where you wanted. I\'m still trying to figure it out.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'Effort without results isn\'t enough. Time for the next step.',
        
      },
    ],
    nextSceneId: 'emp-11-pip',
  },

  // Scene 11: The PIP
  {
    id: 'emp-11-pip',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Jordan from HR is present.',
      },
      {
        text: 'Casey, we\'re implementing a formal Performance Improvement Plan. Your manager will walk you through the specifics.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'You present the PIP document: 30 days. Specific measurable goals. Weekly checkpoints. Consequences clearly stated.',
      },
    ],
    nextSceneId: 'emp-11-pip-reaction',
  },
  {
    id: 'emp-11-pip-reaction',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I understand. I\'ll give everything I have.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'Please sign acknowledging receipt.',
      },
      {
        text: 'Casey signs.',
      },
      {
        text: 'The clock is now running. 30 days to improve—or 30 days of documentation to exit.',
        
      },
    ],
    choices: [
      {
        id: 'emp-11-a',
        text: 'Continue to the PIP conclusion',
        nextSceneId: 'emp-12-pip-end',
        feedback: 'The formal process plays out.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 12: PIP Conclusion
  {
    id: 'emp-12-pip-end',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: '30 days later. Final PIP review.',
      },
      {
        text: 'You review the documentation. The metrics. The pattern.',
      },
      {
        text: 'The evidence is clear. What\'s the outcome?',
        
      },
    ],
    choices: [
      {
        id: 'emp-12-a',
        text: 'PIP goals met - Casey stays',
        nextSceneId: 'ending-rehabilitation',
        feedback: 'They pulled it off. Rare but possible.',
        xpBonus: 15,
      },
      {
        id: 'emp-12-b',
        text: 'PIP goals not met - proceed to termination',
        nextSceneId: 'emp-13-termination',
        feedback: 'The documentation supports the decision.',
        xpBonus: 12,
      },
      {
        id: 'emp-12-c',
        text: 'Casey resigned during PIP',
        nextSceneId: 'ending-resignation',
        feedback: 'They saw the writing on the wall.',
        xpBonus: 15,
      },
    ],
  },
];
