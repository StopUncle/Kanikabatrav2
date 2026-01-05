// Part 1: The Theft
// The moment it happens and immediate aftermath

import type { Scene } from '../../../types';

export const theftScenes: Scene[] = [
  // Scene 1: Setup
  {
    id: 'theft-setup-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Three weeks ago. The legacy system was breaking down. No one could figure out why.',
      },
      {
        text: 'You stayed late. You dug through the code. You found the bottleneck. You designed the fix.',
      },
      {
        text: 'Priya sent you an email: "Great work on the solution!"',
      },
      {
        text: 'You built this. Everyone knew.',
      },
      {
        text: 'Or so you thought.',
      },
    ],
    nextSceneId: 'theft-meeting-1',
  },

  // Scene 2: The Meeting
  {
    id: 'theft-meeting-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Department meeting. Marcus, the VP, is on the call.',
      },
      {
        text: '"So who can walk me through this efficiency win?"',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Alex stands up. Confidently.',
      },
      {
        text: '"Sure, I can cover that."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: 'Alex clicks to YOUR slides.',
      },
    ],
    nextSceneId: 'theft-meeting-2',
  },

  // Scene 3: The Theft Happens
  {
    id: 'theft-meeting-2',
    backgroundId: 'office',
    dialog: [
      {
        text: '"So what WE realized was that the legacy system was the bottleneck. Once WE redesigned the workflow..."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: 'We?',
      },
      {
        text: '"...the efficiency gains were immediate. It was a lot of late nights, but worth it."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: 'Late nights. YOUR late nights.',
      },
      {
        text: 'Marcus nods, impressed.',
      },
      {
        text: '"Great work, Alex. This is exactly what we need."',
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: 'They\'re taking credit. Right now. In front of everyone.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'theft-2-a',
        text: 'Interrupt: "Just to clarify—I developed that solution."',
        nextSceneId: 'theft-interrupt',
        xpBonus: 15,
        feedback: 'Direct and clear. Alex\'s smile freezes. Marcus looks confused.',
      },
      {
        id: 'theft-2-b',
        text: 'Wait, then add: "Just to add context on development..."',
        nextSceneId: 'theft-wait-context',
        xpBonus: 12,
        isOptimal: true,
        feedback: 'OPTIMAL: You add context without direct confrontation.',
      },
      {
        id: 'theft-2-c',
        text: 'Stay silent. Handle this later.',
        nextSceneId: 'theft-silent',
        xpBonus: 5,
        feedback: 'You let the moment pass. The narrative is now set.',
      },
      {
        id: 'theft-2-d',
        text: 'Make eye contact with Jordan. Gauge the room.',
        nextSceneId: 'theft-jordan-look',
        xpBonus: 8,
        feedback: 'Jordan sees. Their expression confirms: yes, that just happened.',
      },
    ],
  },

  // Scene 4a: Interrupt Path
  {
    id: 'theft-interrupt',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The room goes quiet. Alex\'s smile tightens.',
      },
      {
        text: '"Oh, of course! I should clarify—I was presenting, but the original work was collaborative."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Collaborative. Still dodging.',
      },
      {
        text: 'Marcus looks between you both.',
      },
      {
        text: '"Let\'s... move on for now. We can discuss attribution offline."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'You made your point. But now there\'s tension.',
      },
    ],
    nextSceneId: 'theft-aftermath-1',
  },

  // Scene 4b: Context Path
  {
    id: 'theft-wait-context',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex finishes. You raise your hand.',
      },
      {
        text: '"Just to add some context on the development process—I did the initial analysis and designed the solution architecture."',
      },
      {
        text: 'Alex\'s expression flickers.',
      },
      {
        text: '"Right, right. Thanks for that context."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Marcus nods.',
      },
      {
        text: '"Good to know. Team effort, then."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Better than nothing. But "team effort" still blurs the truth.',
      },
    ],
    nextSceneId: 'theft-aftermath-1',
  },

  // Scene 4c: Silent Path
  {
    id: 'theft-silent',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Meeting ends. People disperse. Alex shakes Marcus\'s hand.',
      },
      {
        text: '"Impressive stuff. Let\'s talk about you taking on the Q3 integration project."',
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: 'They walk out together.',
      },
      {
        text: 'That was YOUR moment. Your work. And now it\'s Alex\'s career move.',
      },
    ],
    nextSceneId: 'theft-jordan-1',
  },

  // Scene 4d: Jordan Look Path
  {
    id: 'theft-jordan-look',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Jordan\'s eyes are wide. They saw it.',
      },
      {
        text: 'A small shake of their head. "That was messed up."',
      },
      {
        text: 'At least someone noticed. But the meeting moves on.',
      },
    ],
    nextSceneId: 'theft-aftermath-1',
  },

  // Scene 5: Jordan Approach
  {
    id: 'theft-jordan-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Jordan approaches after the meeting.',
      },
      {
        text: '"Did... did Alex just take credit for your work?"',
        speakerId: 'jordan',
        emotion: 'concerned',
      },
      {
        text: 'You don\'t need to answer. They saw it.',
      },
      {
        text: '"That was messed up. Alex literally used your slides. Want me to say something?"',
        speakerId: 'jordan',
        emotion: 'concerned',
      },
      {
        text: 'An ally. Valuable.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'jordan-1-a',
        text: '"Not yet. I need to figure out how to handle this."',
        nextSceneId: 'theft-aftermath-1',
        xpBonus: 12,
        isOptimal: true,
        feedback: 'OPTIMAL: Strategic. Gather evidence before making moves.',
      },
      {
        id: 'jordan-1-b',
        text: '"Yes. Back me up if I say something."',
        nextSceneId: 'theft-aftermath-1',
        xpBonus: 10,
        feedback: 'Ally secured. They\'ll support your version.',
      },
      {
        id: 'jordan-1-c',
        text: '"No. It\'s not worth the drama."',
        nextSceneId: 'theft-aftermath-1',
        xpBonus: 0,
        feedback: 'TRAP: Drama? Someone stole your work. This isn\'t drama.',
      },
    ],
  },

  // Scene 6: Aftermath
  {
    id: 'theft-aftermath-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Back at your desk. The meeting\'s over. The damage is done.',
      },
      {
        text: 'But it\'s not too late to fix it.',
      },
      {
        text: 'Before you say anything, you need proof.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'aftermath-1-a',
        text: 'Compile evidence: emails, files, timestamps.',
        nextSceneId: 'evidence-strong',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Paper trails are armor.',
      },
      {
        id: 'aftermath-1-b',
        text: 'Check what documentation you have.',
        nextSceneId: 'evidence-partial',
        xpBonus: 10,
        feedback: 'You have some evidence. Not as strong as you\'d like.',
      },
      {
        id: 'aftermath-1-c',
        text: 'Ask Priya to confirm your contribution in writing.',
        nextSceneId: 'evidence-priya',
        xpBonus: 12,
        feedback: 'Smart. Get your manager on record.',
      },
    ],
  },

  // Scene 7a: Strong Evidence
  {
    id: 'evidence-strong',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You compile everything:',
      },
      {
        text: '• Emails showing YOU on the project',
      },
      {
        text: '• Slack messages where YOU discussed the solution',
      },
      {
        text: '• The original file with YOUR name as creator',
      },
      {
        text: '• Priya\'s "great work" email to YOU',
      },
      {
        text: 'An airtight case. Now you need to decide how to use it.',
      },
    ],
    nextSceneId: 'confrontation-choice',
  },

  // Scene 7b: Partial Evidence
  {
    id: 'evidence-partial',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Some emails. A few Slack messages. Not as definitive as you\'d like.',
      },
      {
        text: 'Next time: document everything. In writing. With timestamps.',
      },
      {
        text: 'For now, you work with what you have.',
      },
    ],
    nextSceneId: 'confrontation-choice',
  },

  // Scene 7c: Priya Evidence
  {
    id: 'evidence-priya',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You send Priya a quick message:',
      },
      {
        text: '"Hey—can you confirm in writing that I led the legacy system fix? Need it for my records."',
      },
      {
        text: 'She responds within minutes.',
      },
      {
        text: '"Of course. You did great work on that project. I\'ll send a formal note."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'Documentation secured. Your manager is on record.',
      },
    ],
    nextSceneId: 'confrontation-choice',
  },

  // Scene 8: Confrontation Choice
  {
    id: 'confrontation-choice',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Now the question: what do you do with this evidence?',
      },
      {
        text: 'Direct confrontation is clear but risky. Going through Priya is cleaner but slower.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'confront-choice-a',
        text: 'Confront Alex directly. Private conversation.',
        nextSceneId: 'confront-alex-1',
        xpBonus: 10,
        feedback: 'Face to face. Let\'s see how they respond.',
      },
      {
        id: 'confront-choice-b',
        text: 'Go to Priya first. Get her advice.',
        nextSceneId: 'manager-route-1',
        xpBonus: 12,
        isOptimal: true,
        feedback: 'OPTIMAL: Strategic escalation path. Smart.',
      },
      {
        id: 'confront-choice-c',
        text: 'Email Marcus directly with documentation.',
        nextSceneId: 'vp-direct-1',
        xpBonus: 8,
        feedback: 'High risk. Could look petty if not handled carefully.',
      },
    ],
  },
];
