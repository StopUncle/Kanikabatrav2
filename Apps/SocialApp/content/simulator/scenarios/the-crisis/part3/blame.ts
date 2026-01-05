// Part 3: The Blame Phase - Days 1-3, investigation, resolution

import type { Scene } from '../../../types';

export const blameScenes: Scene[] = [
  // Scene 23: The Investigation - Day 2
  {
    id: 'crisis-23',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'Day 2. External investigators are now involved.',
      },
      {
        text: 'We\'ve reviewed the emails. Your name appears in discussions about "optimizing" the data.',
      },
    ],
    nextSceneId: 'crisis-24',
  },
  {
    id: 'crisis-24',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'They slide a document across the table.',
      },
      {
        text: 'Did you instruct your team to modify the safety figures?',
      },
      {
        text: 'This is the moment. What you say here determines everything.',
        
      },
      {
        text: 'I\'ll remind you—this is under oath.',
      },
    ],
    choices: [
      {
        id: 'crisis-24-context',
        text: '"I asked for data review. Optimizing meant accuracy, not manipulation."',
        nextSceneId: 'crisis-25-context',
        feedback: 'Truth with context. Strong if you have evidence.',
        xpBonus: 12,
      },
      {
        id: 'crisis-24-deny',
        text: '"I never instructed anyone to falsify anything."',
        nextSceneId: 'crisis-25-deny',
        feedback: 'Clean denial. Better be true.',
        xpBonus: 10,
      },
      {
        id: 'crisis-24-counsel',
        text: '"I\'d like to consult with my attorney before answering."',
        nextSceneId: 'crisis-25-counsel',
        feedback: 'Smart for protection. Looks guilty to the board.',
        xpBonus: 8,
      },
      {
        id: 'crisis-24-accept',
        text: '"I may have created pressure that was misinterpreted. That\'s my failure."',
        nextSceneId: 'crisis-25-accept',
        feedback: 'Accountability without admission. Nuanced.',
        xpBonus: 15,
      },
    ],
  },

  // Scene 25: Investigation responses
  {
    id: 'crisis-25-context',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'We\'ll need to see that documentation.',
      },
      {
        text: 'If you secured evidence, now it matters.',
        
      },
    ],
    nextSceneId: 'crisis-26',
  },
  {
    id: 'crisis-25-deny',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'The email from your subordinate says otherwise.',
      },
      {
        text: 'They\'re testing. Don\'t panic.',
        
      },
    ],
    nextSceneId: 'crisis-26',
  },
  {
    id: 'crisis-25-counsel',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'That\'s your right. We\'ll note it.',
      },
      {
        text: 'Protection. At a cost.',
        
      },
    ],
    nextSceneId: 'crisis-26',
  },
  {
    id: 'crisis-25-accept',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'Could you elaborate on what pressure you created?',
      },
      {
        text: 'Careful. Accountability is different from confession.',
        
      },
    ],
    nextSceneId: 'crisis-26',
  },

  // Scene 26: The Offer - Day 3
  {
    id: 'crisis-26',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Day 3. Victor asks to see you. Privately.',
      },
      {
        speakerId: 'victor',
        text: 'The board wants resolution. Fast.',
        emotion: 'neutral',
      },
      {
        text: 'He doesn\'t look at you.',
      },
    ],
    nextSceneId: 'crisis-27',
  },
  {
    id: 'crisis-27',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'victor',
        text: 'I can protect you somewhat. But I need something in return.',
        emotion: 'cold',
      },
      {
        speakerId: 'victor',
        text: 'If you resign, we\'ll characterize it as mutual. No lawsuit, no investigation into your role. Full severance.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'crisis-28',
  },
  {
    id: 'crisis-28',
    backgroundId: 'office',
    dialog: [
      {
        text: 'He\'s offering you an exit. A golden parachute. And a permanent question mark on your record.',
        
      },
      {
        speakerId: 'victor',
        text: 'Or we fight this out. But I can\'t control where that goes.',
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'crisis-28-accept',
        text: '"I\'ll resign. Protect my reputation in the announcement."',
        nextSceneId: 'ending-parachute',
        feedback: 'The exit. Sometimes leaving well is winning.',
        xpBonus: 10,
      },
      {
        id: 'crisis-28-negotiate',
        text: '"I want 24 months severance and a letter stating I was not responsible."',
        nextSceneId: 'crisis-29-negotiate',
        feedback: 'Push for better terms. You have leverage.',
        xpBonus: 12,
      },
      {
        id: 'crisis-28-refuse',
        text: '"I\'m not resigning for something I didn\'t do. I\'ll fight."',
        nextSceneId: 'crisis-29-fight',
        feedback: 'All or nothing. High risk, high reward.',
        xpBonus: 8,
      },
      {
        id: 'crisis-28-expose',
        text: '"Elena\'s fingerprints are all over the leak. Let\'s talk about that first."',
        nextSceneId: 'crisis-29-expose',
        feedback: 'Redirect the blame. Risky but could work.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 29: Negotiation paths
  {
    id: 'crisis-29-negotiate',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'victor',
        text: 'Eighteen months. And a neutral letter. That\'s as far as I can go.',
        emotion: 'neutral',
      },
      {
        text: 'He blinked. You have more leverage than he wants you to know.',
        
      },
    ],
    choices: [
      {
        id: 'crisis-29-take-deal',
        text: 'Take the deal.',
        nextSceneId: 'ending-parachute-plus',
        feedback: 'Best possible exit. Well played.',
        xpBonus: 15,
      },
      {
        id: 'crisis-29-push-more',
        text: 'Push for more.',
        nextSceneId: 'crisis-30-push',
        feedback: 'Careful. Don\'t overplay.',
        xpBonus: 5,
      },
    ],
  },
  {
    id: 'crisis-30-push',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'victor',
        text: 'That\'s my final offer. Take it or we go to the board.',
        emotion: 'cold',
      },
      {
        text: 'You pushed too far. The deal is still on the table... barely.',
        
      },
    ],
    choices: [
      {
        id: 'crisis-30-accept-final',
        text: 'Accept the offer.',
        nextSceneId: 'ending-parachute-plus',
        feedback: 'Wisdom. Know when to take the win.',
        xpBonus: 10,
      },
      {
        id: 'crisis-30-walk',
        text: 'Walk away from the negotiation.',
        nextSceneId: 'crisis-31-board',
        feedback: 'You\'re going to the board. Better have evidence.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 29: Fight path
  {
    id: 'crisis-29-fight',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'victor',
        text: 'Your choice. The board meets tomorrow. I\'ll present the facts as they are.',
        emotion: 'cold',
      },
      {
        text: 'He\'s not threatening. He\'s warning.',
        
      },
    ],
    nextSceneId: 'crisis-31-board',
  },

  // Scene 29: Expose path
  {
    id: 'crisis-29-expose',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'victor',
        text: 'What are you suggesting?',
        emotion: 'neutral',
      },
      {
        text: 'He\'s listening. He cares about internal threats.',
        
      },
    ],
    choices: [
      {
        id: 'crisis-29-evidence',
        text: '"She briefed the board before I could. She\'s positioning for my job."',
        nextSceneId: 'crisis-30-evidence',
        feedback: 'If you have proof, use it. If not...',
        xpBonus: 8,
      },
      {
        id: 'crisis-29-back-off',
        text: '"Never mind. Let\'s discuss the terms."',
        nextSceneId: 'crisis-29-negotiate',
        feedback: 'Wise. You showed your card without playing it.',
        xpBonus: 5,
      },
    ],
  },
  {
    id: 'crisis-30-evidence',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'victor',
        text: 'That\'s politics. I need facts about the data issue.',
        emotion: 'neutral',
      },
      {
        text: 'He heard you. But it\'s not enough to save you alone.',
        
      },
    ],
    nextSceneId: 'crisis-31-board',
  },

  // Scene 31: The Board Meeting
  {
    id: 'crisis-31-board',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'Day 4. The board convenes. Full attendance.',
      },
      {
        speakerId: 'marcus',
        text: 'We\'ve reviewed the investigation findings. The board is prepared to vote.',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'crisis-32',
  },
  {
    id: 'crisis-32',
    backgroundId: 'conference-room',
    dialog: [
      {
        speakerId: 'marcus',
        text: 'Before we do: do you have anything to say?',
        emotion: 'neutral',
      },
      {
        text: 'Last chance. Everything you\'ve done leads to this moment.',
        
      },
    ],
    choices: [
      {
        id: 'crisis-32-defend',
        text: 'Present your evidence and defense.',
        nextSceneId: 'crisis-33-defend',
        feedback: 'If you secured documentation, this is your moment.',
        xpBonus: 15,
      },
      {
        id: 'crisis-32-accountability',
        text: 'Take accountability and propose reforms.',
        nextSceneId: 'crisis-33-accountability',
        feedback: 'Ownership with forward vision. Powerful if credible.',
        xpBonus: 12,
      },
      {
        id: 'crisis-32-attack',
        text: 'Expose Elena\'s maneuvering.',
        nextSceneId: 'crisis-33-attack',
        feedback: 'All-in attack. Better have proof.',
        xpBonus: 5,
      },
      {
        id: 'crisis-32-resign',
        text: 'Offer your resignation.',
        nextSceneId: 'ending-resignation',
        feedback: 'Surrender. With dignity, but still surrender.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 33: Final outcomes
  {
    id: 'crisis-33-defend',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'You present your documentation. The timeline. The context. The truth.',
      },
      {
        text: 'The board reviews. Marcus looks at Victor. Victor nods slightly.',
        
      },
    ],
    nextSceneId: 'crisis-34-verdict',
  },
  {
    id: 'crisis-33-accountability',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'You acknowledge failures while proposing solutions. Process improvements. Oversight.',
      },
      {
        speakerId: 'marcus',
        text: 'That\'s a responsible approach. Let\'s discuss.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'crisis-34-verdict',
  },
  {
    id: 'crisis-33-attack',
    backgroundId: 'conference-room',
    dialog: [
      {
        speakerId: 'elena',
        text: 'This is deflection. The facts are clear.',
        emotion: 'cold',
      },
      {
        speakerId: 'marcus',
        text: 'Let\'s stay focused on the data issue, not internal politics.',
        emotion: 'neutral',
      },
      {
        text: 'You overplayed. Now you look desperate.',
        
      },
    ],
    nextSceneId: 'crisis-34-verdict',
  },

  // Scene 34: The Verdict
  {
    id: 'crisis-34-verdict',
    backgroundId: 'conference-room',
    dialog: [
      {
        speakerId: 'marcus',
        text: 'The board will vote now.',
        emotion: 'neutral',
      },
      {
        text: 'Victor watches. Elena watches. Everyone is calculating.',
        
      },
      {
        text: 'After a moment, Marcus speaks.',
      },
    ],
    nextSceneId: 'crisis-35-result',
  },
  {
    id: 'crisis-35-result',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'The vote is in. Your fate is decided.',
      },
    ],
    nextSceneId: 'ending-branch',
  },

  // Branching to endings based on accumulated decisions
  {
    id: 'ending-branch',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'Everything you did—the documentation, the accountability, the politics—it all adds up to one outcome.',
        
      },
    ],
    choices: [
      {
        id: 'ending-branch-vindicated',
        text: '[If documentation strong + accountability taken]',
        nextSceneId: 'ending-vindicated',
        feedback: 'You played it right.',
        xpBonus: 20,
      },
      {
        id: 'ending-branch-scarred',
        text: '[If mixed performance, survived]',
        nextSceneId: 'ending-scarred',
        feedback: 'You survived. Barely.',
        xpBonus: 10,
      },
      {
        id: 'ending-branch-scapegoat',
        text: '[If documentation weak, blamed]',
        nextSceneId: 'ending-scapegoat',
        feedback: 'You became the sacrifice.',
        xpBonus: 0,
      },
    ],
  },
];
