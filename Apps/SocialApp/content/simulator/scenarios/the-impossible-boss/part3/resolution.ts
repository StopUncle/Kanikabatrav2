// Part 3: Resolution - Long Game and Final Outcomes

import type { Scene } from '../../../types';

export const resolutionScenes: Scene[] = [
  // Scene 7: The Long Game - 6 Months Later
  {
    id: 'boss-7-long-game',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Six months have passed.',
      },
      {
        text: 'You\'ve learned to manage Jordan. Or at least survive them.',
      },
      {
        text: 'But the question remains: what now?',
        
      },
    ],
    nextSceneId: 'boss-8-reflection',
  },

  // Scene 8: Reflection
  {
    id: 'boss-8-reflection',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Friday night. You\'re reviewing the last six months.',
      },
      {
        text: 'The strategies you developed. The relationships you built. The exit options you created.',
      },
      {
        text: 'Jordan is still Jordan. But you\'re different now.',
        
      },
      {
        text: 'What matters most going forward?',
        
      },
    ],
    choices: [
      {
        id: 'boss-8-a',
        text: 'I\'ve built enough trust. Time to push for growth here.',
        nextSceneId: 'boss-9-growth',
        feedback: 'Ambitious. You believe the relationship can improve.',
        xpBonus: 10,
      },
      {
        id: 'boss-8-b',
        text: 'I\'ve built visibility. Time to leverage skip-level connections.',
        nextSceneId: 'boss-9-skip-leverage',
        feedback: 'Strategic. Using the relationships you\'ve cultivated.',
        xpBonus: 12,
      },
      {
        id: 'boss-8-c',
        text: 'I\'ve built exit options. Time to explore them seriously.',
        nextSceneId: 'boss-9-exit-explore',
        feedback: 'Practical. You know when staying isn\'t worth it.',
        xpBonus: 10,
      },
      {
        id: 'boss-8-d',
        text: 'I\'ve built documentation. Time to escalate if needed.',
        nextSceneId: 'boss-9-escalation',
        feedback: 'Prepared. The file is ready if you need it.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 9A: Growth Path
  {
    id: 'boss-9-growth',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You request a development conversation with Jordan.',
      },
      {
        text: 'I want to talk about my growth path here. I\'ve been delivering consistently, and I\'m ready for more.',
      },
      {
        text: 'Jordan considers this. Their response will tell you everything.',
        
      },
    ],
    choices: [
      {
        id: 'boss-9g-a',
        text: 'Frame it as making their job easier',
        nextSceneId: 'boss-10-jordan-positive',
        feedback: 'OPTIMAL: Align your growth with their interests.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-9g-b',
        text: 'Be direct about what you want',
        nextSceneId: 'boss-10-jordan-neutral',
        feedback: 'Clear. But not necessarily compelling to them.',
        xpBonus: 10,
      },
      {
        id: 'boss-9g-c',
        text: 'Mention your options without threatening',
        nextSceneId: 'boss-10-jordan-cautious',
        feedback: 'Risky. They might hear this as a threat.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 9B: Skip-Level Leverage Path
  {
    id: 'boss-9-skip-leverage',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Casey requests a meeting. Not Jordan. Casey.',
      },
      {
        text: 'I\'ve been impressed with your work. Henderson especially.',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'There might be an opportunity opening up. Are you interested in a conversation?',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'Your skip-level relationship paid off.',
        
      },
    ],
    choices: [
      {
        id: 'boss-9s-a',
        text: '"Absolutely. I\'d love to hear more."',
        nextSceneId: 'ending-outlasted',
        feedback: 'OPTIMAL: The relationship you built is creating options.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-9s-b',
        text: '"I\'m interested. What about my current role?"',
        nextSceneId: 'boss-10-jordan-neutral',
        feedback: 'Cautious. Making sure you don\'t burn bridges.',
        xpBonus: 10,
      },
      {
        id: 'boss-9s-c',
        text: '"Can I think about it?"',
        nextSceneId: 'boss-10-jordan-cautious',
        feedback: 'Hesitant. Opportunities don\'t wait forever.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 9C: Exit Exploration Path
  {
    id: 'boss-9-exit-explore',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'The recruiter call goes well. Very well.',
      },
      {
        text: 'There\'s an offer on the table. 40% raise. Better title. Reports say the manager is excellent.',
      },
      {
        text: 'You couldn\'t fix Jordan. But you can fix your situation.',
        
      },
    ],
    choices: [
      {
        id: 'boss-9e-a',
        text: 'Take the offer. Leave professionally.',
        nextSceneId: 'ending-clean-exit',
        feedback: 'OPTIMAL: The exit you prepared for.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-9e-b',
        text: 'Use the offer to negotiate internally',
        nextSceneId: 'boss-10-negotiate',
        feedback: 'Risky. Counter-offers rarely work out long-term.',
        xpBonus: 8,
      },
      {
        id: 'boss-9e-c',
        text: 'Decline. You\'ve invested too much here.',
        nextSceneId: 'ending-trap',
        feedback: 'Sunk cost fallacy. The investment is gone either way.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 9D: Escalation Path
  {
    id: 'boss-9-escalation',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The documentation is ready. Dates, incidents, witnesses, patterns.',
      },
      {
        text: 'Morgan and two others have similar files. You\'re not alone.',
      },
      {
        text: 'Escalation is a nuclear option. Once you press the button, there\'s no going back.',
        
      },
    ],
    choices: [
      {
        id: 'boss-9d-a',
        text: 'Go to HR together. Collective complaint.',
        nextSceneId: 'boss-10-hr-collective',
        feedback: 'Strength in numbers. A pattern is hard to dismiss.',
        xpBonus: 12,
      },
      {
        id: 'boss-9d-b',
        text: 'Go to Casey first. Executive escalation.',
        nextSceneId: 'boss-10-casey-escalate',
        feedback: 'Risky. But faster than HR.',
        xpBonus: 10,
      },
      {
        id: 'boss-9d-c',
        text: 'Hold the file. Keep it as insurance.',
        nextSceneId: 'ending-protected-stagnant',
        feedback: 'Safe. But insurance doesn\'t solve the daily problem.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 10A: Jordan Positive Response
  {
    id: 'boss-10-jordan-positive',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You know, you\'re right. You\'ve been delivering.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Let me think about what that could look like. I want to support your growth.',
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: 'Genuine? Or managing you? Time will tell.',
        
      },
    ],
    nextSceneId: 'boss-11-outcome',
  },

  // Scene 10B: Jordan Neutral Response
  {
    id: 'boss-10-jordan-neutral',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'That\'s fair to discuss. Let\'s look at the timing.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'There might be something in Q3. No promises.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"No promises." The corporate way of saying probably not.',
        
      },
    ],
    nextSceneId: 'boss-11-outcome',
  },

  // Scene 10C: Jordan Cautious Response
  {
    id: 'boss-10-jordan-cautious',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Jordan\'s eyes narrow slightly.',
      },
      {
        text: 'That\'s... interesting timing to bring this up.',
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        text: 'They suspect something. You showed your hand.',
        
      },
    ],
    nextSceneId: 'boss-11-outcome',
  },

  // Scene 10D: Negotiate with Counter-Offer
  {
    id: 'boss-10-negotiate',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Jordan takes the news to Casey. A counter-offer is assembled.',
      },
      {
        text: 'We value you. Here\'s what we can do to keep you.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'The number is... close. Not quite as good, but close.',
      },
      {
        text: 'Counter-offers buy time. They rarely buy loyalty. From either side.',
        
      },
    ],
    choices: [
      {
        id: 'boss-10n-a',
        text: 'Take the counter-offer',
        nextSceneId: 'ending-survived-learned',
        feedback: 'You stayed. The dynamic hasn\'t changed. Just the salary.',
        xpBonus: 5,
      },
      {
        id: 'boss-10n-b',
        text: 'Leave anyway',
        nextSceneId: 'ending-clean-exit',
        feedback: 'OPTIMAL: Trust your original decision.',
        xpBonus: 12,
        isOptimal: true,
      },
    ],
  },

  // Scene 10E: HR Collective Complaint
  {
    id: 'boss-10-hr-collective',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Three of you meet with Sam in HR. Together.',
      },
      {
        text: 'We\'re here about a pattern of behavior from Jordan. We have documentation.',
      },
      {
        text: 'Sam listens. Takes notes. Their face gives nothing away.',
        
      },
      {
        text: 'I appreciate you bringing this forward together. This is... significant.',
        speakerId: 'sam',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'boss-11-hr-result',
  },

  // Scene 10F: Casey Escalation
  {
    id: 'boss-10-casey-escalate',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You request time with Casey. The conversation is careful.',
      },
      {
        text: 'I need to share something difficult. About the team dynamic.',
      },
      {
        text: 'Casey listens. Their expression shifts as you share the documentation.',
      },
      {
        text: 'Thank you for trusting me with this. I need to think about next steps.',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: 'Ball\'s in their court now. For better or worse.',
        
      },
    ],
    nextSceneId: 'boss-11-casey-result',
  },

  // Scene 11A: General Outcome
  {
    id: 'boss-11-outcome',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Three more months pass.',
      },
      {
        text: 'Jordan is still Jordan. But the edges have softened. Slightly.',
      },
      {
        text: 'You\'ve built visibility with Casey. Your exit options are ready if needed.',
      },
      {
        text: 'You haven\'t won. But you haven\'t lost either.',
        
      },
    ],
    choices: [
      {
        id: 'boss-11o-a',
        text: 'Stay and keep building. This is working.',
        nextSceneId: 'ending-boss-changed',
        feedback: 'Patient. You believe in the long game.',
        xpBonus: 10,
      },
      {
        id: 'boss-11o-b',
        text: 'Start looking. You\'ve learned what you can here.',
        nextSceneId: 'ending-clean-exit',
        feedback: 'Strategic exit. You leave on your terms.',
        xpBonus: 12,
      },
    ],
  },

  // Scene 11B: HR Result
  {
    id: 'boss-11-hr-result',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Two weeks later. Jordan is "transitioning to a new role."',
      },
      {
        text: 'No announcement. No explanation. Just... gone.',
      },
      {
        text: 'HR didn\'t protect you. They protected the company from liability. You just happened to benefit.',
        
      },
    ],
    nextSceneId: 'ending-outlasted',
  },

  // Scene 11C: Casey Result
  {
    id: 'boss-11-casey-result',
    backgroundId: 'office',
    dialog: [
      {
        text: 'One month later. Jordan\'s behavior hasn\'t changed publicly.',
      },
      {
        text: 'But Casey pulls you aside.',
      },
      {
        text: 'There\'s going to be a reorganization. You might want to have your resume ready.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'A tip-off. The wheels are turning.',
        
      },
    ],
    choices: [
      {
        id: 'boss-11c-a',
        text: 'Wait for the reorg. Trust the process.',
        nextSceneId: 'ending-outlasted',
        feedback: 'OPTIMAL: The escalation is working.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-11c-b',
        text: 'Start looking anyway. Don\'t count on internal changes.',
        nextSceneId: 'ending-clean-exit',
        feedback: 'Practical. You control your own destiny.',
        xpBonus: 12,
      },
    ],
  },
];
