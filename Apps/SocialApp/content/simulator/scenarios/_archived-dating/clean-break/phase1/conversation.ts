// Phase 1: The Decision - The Breakup Conversation
// Scenes 1-4: Breaking the news and facing the cycle

import type { Scene } from '../../../types';

export const conversationScenes: Scene[] = [
  // SCENE 1: THE CONVERSATION
  {
    id: 'scene-1-conversation',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You've rehearsed this a hundred times. You know what you're going to say. {ex} is relaxed on the couch, scrolling their phone. A normal evening. They don't know their world is about to change.",
      },
      {
        text: '"We need to talk." Their face shifts. They know that tone.',
        speakerId: 'drew',
        emotion: 'confused',
      },
      {
        speakerId: 'inner-voice',
        text: "You know what you have to say. Say it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-1a',
        text: '"I\'m ending this. We\'re done."',
        nextSceneId: 'scene-2-denial',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Clear. No room for misinterpretation.',
        tactic: 'direct_break',
      },
      {
        id: 'choice-1b',
        text: '"I think we\'ve grown apart. We should see other people."',
        nextSceneId: 'scene-2-denial',
        xpBonus: 8,
        feedback: "Softer, but 'growing apart' sounds fixable. They'll argue.",
        tactic: 'soft_break',
      },
      {
        id: 'choice-1c',
        text: '"I need to work on myself. I\'m not ready for a relationship."',
        nextSceneId: 'scene-2-bargaining-intense',
        xpBonus: 0,
        feedback: "TRAP: Now they'll offer to 'wait' or 'support your growth.'",
        tactic: 'self_blame',
      },
      {
        id: 'choice-1d',
        text: 'Launch into all the reasons why this isn\'t working.',
        nextSceneId: 'scene-2-denial-long',
        xpBonus: 3,
        feedback: 'Every reason is something they\'ll try to argue or fix. Less is more.',
        tactic: 'over_explain',
      },
    ],
  },

  // SCENE 2: DREW'S DENIAL
  {
    id: 'scene-2-denial',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{ex}'s face shifts through confusion, disbelief, then something harder. They sit up straight.",
        speakerId: 'drew',
        emotion: 'confused',
      },
      {
        text: '"Wait, what? No. You don\'t mean that." They shake their head. "We had a fight, okay, but we can work through this. Where is this coming from?"',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "They're trying to negotiate. There's nothing to negotiate.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-2a',
        text: '"This isn\'t a negotiation. My decision is made."',
        nextSceneId: 'scene-3-bargaining',
        xpBonus: 15,
        isOptimal: true,
        feedback: "Clear. They'll escalate, but you're not giving ground.",
        tactic: 'firm_boundary',
      },
      {
        id: 'choice-2b',
        text: 'Start listing the problems, the patterns, the incidents.',
        nextSceneId: 'scene-2-argument',
        xpBonus: 3,
        feedback: 'Every reason is a debate topic. You\'re extending a conversation that should be over.',
        tactic: 'explain_reasons',
      },
      {
        id: 'choice-2c',
        text: '"I\'m sorry. I know this hurts. But it\'s over."',
        nextSceneId: 'scene-3-bargaining',
        xpBonus: 10,
        feedback: "Apologizing is fine. But don't let sorry become a door they push through.",
        tactic: 'kind_but_firm',
      },
      {
        id: 'choice-2d',
        text: '"It\'s a lot of things. I\'ve been feeling..."',
        nextSceneId: 'scene-2-argument',
        xpBonus: 0,
        feedback: "Now you're in a therapy session about the relationship, not ending it.",
        tactic: 'drawn_in',
      },
    ],
  },

  // SCENE 2 VARIANT: Long denial after over-explaining
  {
    id: 'scene-2-denial-long',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You listed everything. The late nights with no texts. The cancelled plans. The way they made you feel small in front of their friends. {ex} listened. Now they're dismantling your points one by one.",
        speakerId: 'drew',
        emotion: 'neutral',
      },
      {
        text: '"Okay, I hear you. But the friends thing - that was a joke. You know how they are. And the texts - I told you, work has been crazy."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Every reason becomes a debate. This is what you wanted to avoid.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-2long-a',
        text: '"It doesn\'t matter. The relationship is over."',
        nextSceneId: 'scene-3-bargaining',
        xpBonus: 10,
        feedback: 'Pulling back to the main point. Good recovery.',
        tactic: 'refocus',
      },
      {
        id: 'choice-2long-b',
        text: 'Keep arguing each point.',
        nextSceneId: 'scene-2-argument',
        xpBonus: 0,
        feedback: "You're negotiating a foregone conclusion.",
        tactic: 'continue_debate',
      },
    ],
  },

  // SCENE 2 VARIANT: Intense bargaining after "I need to work on myself"
  {
    id: 'scene-2-bargaining-intense',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{ex}'s eyes light up. You gave them an opening and they're taking it.",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: '"Work on yourself? That\'s fine! I support that. I can give you space. We don\'t have to break up - I\'ll wait. However long you need."',
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        
        text: "This is why you don't give soft exits. Now they think there's hope.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-2intense-a',
        text: '"No. I don\'t want you to wait. I want to end the relationship."',
        nextSceneId: 'scene-3-bargaining',
        xpBonus: 10,
        feedback: 'Correcting course. Harder now that you gave an opening.',
        tactic: 'course_correct',
      },
      {
        id: 'choice-2intense-b',
        text: '"I... maybe some space would help?"',
        nextSceneId: 'scene-2-backslide',
        xpBonus: 0,
        feedback: 'TRAP: A break is not a breakup. You just delayed the inevitable.',
        tactic: 'backslide',
      },
    ],
  },

  // SCENE 2 VARIANT: The extended argument
  {
    id: 'scene-2-argument',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Thirty minutes. You've been going in circles for thirty minutes. Every point you make, they counter. Every example, they reframe.",
        speakerId: 'drew',
        emotion: 'neutral',
      },
      {
        text: '"So what, I\'m not perfect? Neither are you. That\'s relationships. You work through it."',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        
        text: "You're litigating instead of leaving.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-2arg-a',
        text: '"I\'m done debating. I\'m leaving."',
        nextSceneId: 'scene-4-guilt',
        xpBonus: 10,
        feedback: 'Finally. Actions, not words.',
        tactic: 'stop_debating',
      },
      {
        id: 'choice-2arg-b',
        text: 'Keep trying to make them understand.',
        nextSceneId: 'scene-3-bargaining',
        xpBonus: 0,
        feedback: "They don't want to understand. They want to win.",
        tactic: 'keep_explaining',
      },
    ],
  },

  // SCENE 2 VARIANT: Backslide into "a break"
  {
    id: 'scene-2-backslide',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{ex} smiles, relief flooding their face. \"Space. Yes. That's smart. Take all the time you need. I'll be here.\"",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: "They pull you into a hug. It feels wrong. This isn't what you wanted. Is it?",
      },
      {
        
        text: "You just traded a breakup for limbo. Was that the plan?",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-back-a',
        text: 'Pull away. "No. I said it wrong. This is over."',
        nextSceneId: 'scene-3-bargaining',
        xpBonus: 10,
        feedback: 'Finding your spine again. Good.',
        tactic: 'recover',
      },
      {
        id: 'choice-back-b',
        text: 'Accept the hug. Figure it out later.',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: 'TRAP: There is no later. You just stayed.',
        tactic: 'give_up',
      },
    ],
  },

  // SCENE 3: DREW'S BARGAINING
  {
    id: 'scene-3-bargaining',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Denial didn't work. Their strategy shifts. Tears form in their eyes. Their voice cracks.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"Tell me what I did wrong. I\'ll fix it. I swear." They reach for your hands. "We can go to therapy. Couples counseling. Whatever you want. Just give me one more chance. One more."',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "The tears. You've seen these tears before. They work on you.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-3a',
        text: '"I\'ve made my decision. I don\'t want counseling. I want out."',
        nextSceneId: 'scene-4-guilt',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Clear. Final. The only answer that matters.',
        tactic: 'hold_line',
      },
      {
        id: 'choice-3b',
        text: '"I\'m not saying you\'re a bad person. But this isn\'t right for me."',
        nextSceneId: 'scene-4-guilt',
        xpBonus: 10,
        feedback: 'Kind, but be careful. Kindness can become an opening.',
        tactic: 'kind_decline',
      },
      {
        id: 'choice-3c',
        text: '"Maybe... maybe counseling could help?"',
        nextSceneId: 'scene-3-therapy-trap',
        xpBonus: 0,
        feedback: 'TRAP: You just opened a door. They\'ll kick it wide open.',
        tactic: 'consider_therapy',
      },
      {
        id: 'choice-3d',
        text: 'Start crying yourself. "This is so hard..."',
        nextSceneId: 'scene-3-flip',
        xpBonus: 3,
        feedback: "Your pain is valid but they'll use it. The breakup becomes a cuddle session.",
        tactic: 'get_emotional',
      },
    ],
  },

  // SCENE 3 VARIANT: Therapy trap
  {
    id: 'scene-3-therapy-trap',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{ex}'s whole demeanor changes. They're nodding eagerly, wiping their tears.",
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        text: '"Yes! Counseling. I\'ll find someone tomorrow. We can start this week. See? We can fix this. Together."',
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        
        text: "You said 'maybe' and they heard 'yes.' Close the door or it stays open forever.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-3trap-a',
        text: '"No. I shouldn\'t have said maybe. My answer is no."',
        nextSceneId: 'scene-4-guilt',
        xpBonus: 10,
        feedback: 'Correcting the mistake. Harder than not making it.',
        tactic: 'close_door',
      },
      {
        id: 'choice-3trap-b',
        text: 'Agree to try counseling.',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: 'TRAP: Couples counseling requires two people who want to be a couple.',
        tactic: 'trap_accepted',
      },
    ],
  },

  // SCENE 3 VARIANT: Dynamic flips
  {
    id: 'scene-3-flip',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Your tears catch them off guard. Suddenly they're comforting you. Arms around you. Soft voice.",
        speakerId: 'drew',
        emotion: 'concerned',
      },
      {
        text: '"Hey. Hey. It\'s okay. We don\'t have to figure this out tonight. Let\'s just... let\'s just be here."',
        speakerId: 'drew',
        emotion: 'happy',
      },
      {
        
        text: "The breakup is becoming a make-up. How did this happen?",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-3flip-a',
        text: 'Pull away. "No. I need to go."',
        nextSceneId: 'scene-4-guilt',
        xpBonus: 10,
        feedback: "Breaking the moment. They won't make it easy.",
        tactic: 'pull_away',
      },
      {
        id: 'choice-3flip-b',
        text: 'Stay in the comfort. Deal with it tomorrow.',
        nextSceneId: 'ending-cycle',
        xpBonus: 0,
        feedback: 'TRAP: Tomorrow never comes. The cycle continues.',
        tactic: 'stay',
      },
    ],
  },

  // SCENE 4: DREW'S GUILT TRIP
  {
    id: 'scene-4-guilt',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Bargaining failed. The tears are drying. Something uglier is emerging.",
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"Eight months. Eight months and you\'re just... done?" They laugh bitterly. "After everything I\'ve done for you? After everything we\'ve been through?"',
        speakerId: 'drew',
        emotion: 'angry',
      },
      {
        text: '"My mother loves you. How am I supposed to tell her? You\'re destroying us. You know that, right?"',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Guilt. The favorite weapon.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-4a',
        text: '"I understand you\'re hurt. But my decision stands."',
        nextSceneId: 'scene-5-anger',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Acknowledged the emotion without taking responsibility for it.',
        tactic: 'acknowledge_not_absorb',
      },
      {
        id: 'choice-4b',
        text: '"I know, I\'m so sorry. I feel terrible about this."',
        nextSceneId: 'scene-5-anger',
        xpBonus: 5,
        feedback: 'Sorry is fine. Too much sorry becomes a weapon they can use.',
        tactic: 'excessive_sorry',
      },
      {
        id: 'choice-4c',
        text: '"It\'s not about what you did or didn\'t do, it\'s..."',
        nextSceneId: 'scene-4-extended-guilt',
        xpBonus: 0,
        feedback: "Now you're explaining again. The breakup is becoming a debate.",
        tactic: 'justify_again',
      },
      {
        id: 'choice-4d',
        text: '"Trying to guilt me isn\'t going to change my mind."',
        nextSceneId: 'scene-5-anger-fast',
        xpBonus: 12,
        feedback: "Direct. They won't like being called out.",
        tactic: 'call_out',
      },
    ],
  },

  // SCENE 4 VARIANT: Extended guilt
  {
    id: 'scene-4-extended-guilt',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "They seize on your hesitation. More ammunition.",
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        text: '"So it\'s not about me? Then why are you leaving? What did I ever do but love you?"',
        speakerId: 'drew',
        emotion: 'sad',
      },
      {
        
        text: "Stop explaining. Start leaving.",
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'choice-4ext-a',
        text: '"I\'m going to get my things now."',
        nextSceneId: 'scene-6-packing',
        xpBonus: 10,
        feedback: 'Action, not more words.',
        tactic: 'start_leaving',
      },
      {
        id: 'choice-4ext-b',
        text: 'Keep trying to explain without hurting them.',
        nextSceneId: 'scene-5-anger',
        xpBonus: 0,
        feedback: "There's no painless breakup. Stop trying to find one.",
        tactic: 'painless_fantasy',
      },
    ],
  },
];
