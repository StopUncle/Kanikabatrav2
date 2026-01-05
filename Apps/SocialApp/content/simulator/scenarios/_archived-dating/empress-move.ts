// Scenario: The Empress Move
// Power consolidation and final sovereignty
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../types';

export const empressMoveScenario: Scenario = {
  id: 'empress-move',
  title: 'The Empress Move',
  tagline: 'Stop surviving. Start reigning.',
  description:
    'He adores you. His family loves you. But somewhere along the way, you stopped being the woman he fell for. Time to reclaim your crown.',
  tier: 'vip',
  estimatedMinutes: 15,
  difficulty: 'advanced',
  category: 'healthy',
  xpReward: 175,
  badgeId: 'empress',

  templates: {
    partner: ['Michael', 'Daniel', 'James', 'Christopher', 'Matthew'],
    bestie: ['Cate', 'Victoria', 'Alexandra', 'Isabelle', 'Sophia'],
  },

  tacticsLearned: [
    'The Five Pillars (Financial, Physical, Emotional, Social, Strategic)',
    'Granting position (giving access vs. seeking validation)',
    'Selection mindset (you choose, not hope to be chosen)',
    'Sovereignty establishment (your kingdom, he lives in it)',
    'The Empress Endgame (commitment from strength)',
  ],
  redFlagsTaught: [
    'Seeking validation instead of granting access',
    'Pillar erosion (comfort zone collapse)',
    'Identity merger (losing yourself in relationship)',
    'Desperation exposure (revealing need)',
    'Hoping to be chosen instead of choosing',
  ],

  characters: [
    {
      id: 'michael',
      name: 'Michael',
      description: 'Your devoted partner. Consistent, invested, committed.',
      traits: ['devoted', 'reliable', 'loving'],
      defaultEmotion: 'happy',
    },
    {
      id: 'bestie',
      name: 'Cate',
      description: 'Your ride-or-die. Married a CEO. Built her own empire.',
      traits: ['powerful', 'strategic', 'real'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'Your gut. The part of you that knows.',
      traits: ['honest', 'protective'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    {
      id: 'scene-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You wake up next to Michael. One year together. He's still asleep, and your phone has three texts from him last night checking when you'd be home. You scroll back through your own messages—mostly asking what he wants for dinner, when he's free, if he's mad. Your gym bag is dusty in the corner. You can't remember the last time you saw your girls.",
        },
        {
          speakerId: 'inner-voice',
          text: 'The woman who walked into this relationship had a life. Where did she go?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'Text {bestie}: "Brunch? I need to talk."',
          nextSceneId: 'scene-2-brunch',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'seeking_perspective',
          feedback: 'OPTIMAL: Sometimes you need outside eyes. The right friend tells you truth, not comfort.',
        },
        {
          id: 'choice-1b',
          text: "It's fine. Everyone gets comfortable in relationships.",
          nextSceneId: 'scene-2-denial',
          feedback: 'TRAP: Comfort is how empires fall. Slowly, then all at once.',
        },
        {
          id: 'choice-1c',
          text: "Start journaling what's changed over the past year.",
          nextSceneId: 'scene-2-brunch',
          xpBonus: 10,
          tactic: 'self_audit',
          feedback: 'Self-reflection is powerful. But alone, it can become rumination. Balance with outside perspective.',
        },
        {
          id: 'choice-1d',
          text: "Wake {partner} up. Talk about how you're feeling.",
          nextSceneId: 'scene-2-denial',
          xpBonus: 5,
          feedback: "Vulnerable, but premature. You don't yet know what you want. Clarity first, then conversation.",
        },
      ],
    },
    {
      id: 'scene-2-denial',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Michael wakes up, kisses your forehead. \"What do you want to do today?\" You realize you don't have an answer. Your weekends have become his weekends. Your phone buzzes—Cate: \"Haven't seen you in forever. Still alive?\"",
          speakerId: 'michael',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: 'When did you stop having your own plans?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: '"Whatever you want, babe."',
          nextSceneId: 'scene-2b-weak',
          feedback: 'You just handed him the remote to your life.',
        },
        {
          id: 'choice-2b',
          text: '"Actually, I need to see Cate. Girl time."',
          nextSceneId: 'scene-2-brunch',
          isOptimal: true,
          xpBonus: 10,
          feedback: "Good. Your friendships are a pillar. Don't let them crumble.",
        },
      ],
    },
    {
      id: 'scene-2b-weak',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Michael picks the movie. Then the restaurant. Then whether you stay in or go out. You catch yourself waiting for his approval before deciding anything. Later, Cate texts again: \"Seriously, brunch tomorrow. Non-negotiable.\"",
        },
        {
          text: "You used to be the one with opinions. With plans. With a life.",
        },
      ],
      nextSceneId: 'scene-2-brunch',
    },
    {
      id: 'scene-2-brunch',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Cate looks amazing. Put together. Like someone who runs her life, not chases it. \"You look tired,\" she says without preamble. \"I mean it. You used to walk in like you owned the place. Now you look like you're asking permission to exist.\"",
          speakerId: 'bestie',
          emotion: 'cold',
        },
        {
          
          text: 'She sees it. The drift.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: '"I don\'t know what happened to me."',
          nextSceneId: 'scene-3-honest',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'vulnerability',
          feedback: 'Admitting it is the first step to fixing it.',
        },
        {
          id: 'choice-3b',
          text: '"I\'m fine. Just tired."',
          nextSceneId: 'scene-3-deflect',
          feedback: "Deflecting won't fix the erosion.",
        },
      ],
    },
    {
      id: 'scene-3-deflect',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Cate just stares at you. \"Babe. Your gym bag has cobwebs. You skipped my birthday for his work thing. You asked ME if it was okay to order dessert. When did you become someone who needs permission?\"",
          speakerId: 'bestie',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-3-honest',
    },
    {
      id: 'scene-3-honest',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Cate leans in. \"Let's do a quick audit. Answer honestly. Your savings account—better or worse than last year?\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          
          text: "Could you leave tomorrow and be fine? That's not cynical. That's freedom.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: '"...Worse. I let him cover a lot."',
          nextSceneId: 'scene-4-financial',
          feedback: 'Financial dependence is a trap. Even with the nicest people.',
        },
        {
          id: 'choice-4b',
          text: '"Same. I still handle my own."',
          nextSceneId: 'scene-4-physical',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Good. At least that pillar is standing.',
        },
      ],
    },
    {
      id: 'scene-4-financial',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: '"Okay, first pillar down." Cate takes a breath, making a note in her mind. The audit continues.',
          speakerId: 'bestie',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-4-physical',
    },
    {
      id: 'scene-4-physical',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: '"Next: When\'s the last time you worked out? Not walked. Actually trained."',
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          
          text: "Your body is your kingdom. Have you been neglecting the castle?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: '"...I don\'t remember."',
          nextSceneId: 'scene-5-social',
          feedback: "Your body is your kingdom. You've been neglecting the castle.",
        },
        {
          id: 'choice-5b',
          text: '"Last week. I\'ve kept that up."',
          nextSceneId: 'scene-5-social',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Physical pillar standing. That takes discipline.',
        },
      ],
    },
    {
      id: 'scene-5-social',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: '"Last one: Name three things you do that don\'t involve Michael." You open your mouth. Nothing comes. His friends became your friends. His plans became your plans.',
          speakerId: 'bestie',
          emotion: 'cold',
        },
        {
          
          text: "Your social world shrank to fit inside his.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: '"I... can\'t."',
          nextSceneId: 'scene-6-plan',
          feedback: "Social pillar collapsed. You've been living in his world.",
        },
        {
          id: 'choice-6b',
          text: '"This is embarrassing."',
          nextSceneId: 'scene-6-plan',
          feedback: 'Embarrassment means you see the problem. Good.',
        },
      ],
    },
    {
      id: 'scene-6-plan',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Cate flags the waiter for more coffee. \"Here's what you're going to do. Pick one thing and fix it this week.\" She's not lecturing—she's offering a starting point.",
          speakerId: 'bestie',
          emotion: 'smirking',
        },
        {
          
          text: 'One pillar at a time. Start somewhere.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: 'Book a gym class for tomorrow morning.',
          nextSceneId: 'scene-7-action',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'physical_pillar',
          feedback: 'Physical is the fastest to rebuild. Energy creates momentum.',
        },
        {
          id: 'choice-7b',
          text: 'Text the group chat: "Drinks Friday. No boyfriends."',
          nextSceneId: 'scene-7-action',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'social_pillar',
          feedback: 'Social pillar rebuilding. Your friends miss you.',
        },
        {
          id: 'choice-7c',
          text: 'Open your banking app. Set up auto-transfer to savings.',
          nextSceneId: 'scene-7-action',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'financial_pillar',
          feedback: 'Financial independence is foundation. Smart first move.',
        },
      ],
    },
    {
      id: 'scene-7-action',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three weeks later. You've kept your promise. Michael's been watching you. His eyes follow you across the room. \"You've been busy lately,\" he says, a question mark in his voice.",
          speakerId: 'michael',
          emotion: 'confused',
        },
        {
          
          text: 'He feels the shift. Good.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: '"Yeah. Remembered I have a life outside of us. Good thing, right?"',
          nextSceneId: 'scene-8-confident',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'reframing',
          feedback: 'Brilliant. You framed it as a positive for him too.',
        },
        {
          id: 'choice-8b',
          text: '"Sorry, I\'ve just been—"',
          nextSceneId: 'scene-8-apologize',
          feedback: "Don't apologize for having a life.",
        },
      ],
    },
    {
      id: 'scene-8-apologize',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Something in his eyes relaxes. A micro-shift you almost miss. He just realized he doesn't have to try anymore. The chase is over. The conversation continues, but his energy has shifted. Slightly less attentive.",
        },
      ],
      nextSceneId: 'scene-9-future',
    },
    {
      id: 'scene-8-confident',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Michael blinks. Then smiles slowly. \"I like it. You seem more... you.\" Something shifts in his eyes—attraction, renewed interest.",
          speakerId: 'michael',
          emotion: 'seductive',
        },
        {
          
          text: "He fell for the woman with her own life. She's back.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-9-future',
    },
    {
      id: 'scene-9-future',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "A month later. Dinner at a nice place—his idea. \"I've been thinking about us. About the future,\" he says, eyes intense. Your heart beats faster. But not with desperation. With curiosity.",
          speakerId: 'michael',
          emotion: 'seductive',
        },
        {
          
          text: "This is different. You're not hoping. You're listening.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-9a',
          text: '"Tell me what you\'re thinking."',
          nextSceneId: 'scene-10-grant',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'granting_position',
          feedback: "Perfect. Interested but not desperate. You're granting access, not begging for it.",
        },
        {
          id: 'choice-9b',
          text: '"Yes! I\'ve been hoping you\'d say that!"',
          nextSceneId: 'scene-10-eager',
          feedback: "You just showed all your cards. His work is done.",
        },
      ],
    },
    {
      id: 'scene-10-eager',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Something in his eyes relaxes. A micro-shift you almost miss. He just realized he doesn't have to try anymore. The chase is over. The conversation continues, but his energy has shifted. Slightly less attentive.",
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },
    {
      id: 'scene-10-grant',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "He leans closer, eyes intense. \"You're different now. Stronger. I think about you more, not less. Like I have to keep earning you. It's... I like it.\"",
          speakerId: 'michael',
          emotion: 'seductive',
        },
        {
          
          text: 'There it is. Sovereignty creates attraction.',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-good-ending',
    },
    {
      id: 'scene-good-ending',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Six months later. He proposed. You said yes—but you said yes from choice, not desperation. Your savings are healthy. Your body is strong. Your friends see you regularly. You have a 5-year plan—YOUR plan.",
        },
        {
          text: "And Michael? He still looks at you like he can't believe you chose him. You could leave tomorrow and be fine. That security is the foundation of real love. You didn't hope to be chosen. You selected.",
          
          emotion: 'neutral',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Empress',
      endingSummary: 'You rebuilt your pillars. You entered commitment from power, not desperation. He chose you—but more importantly, you selected him.',
    },
    {
      id: 'scene-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things are better. He's more invested. You're more balanced. But you catch yourself slipping sometimes—checking his mood before making plans.",
        },
        {
          text: "The work isn't done. Sovereignty isn't a destination. You're better than before, but the empress crown still awaits.",
          
          emotion: 'neutral',
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Work in Progress',
      endingSummary: 'You started rebuilding. But sovereignty is daily practice. The crown is available. Keep reaching.',
    },
    {
      id: 'scene-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A year later. The warnings went unheeded. Your world is his world. Your friends are his friends. Your plans are his plans. \"You used to be so driven. I miss that,\" he says with genuine sadness.",
          speakerId: 'michael',
          emotion: 'sad',
        },
        {
          text: "He fell for a queen. He got furniture. The relationship continues, but you're not equal partners. You're an accessory. The throne sits empty.",
          
          emotion: 'cold',
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Surrender',
      endingSummary: 'You lost yourself. He pursued a sovereign. He got a shadow. The throne sits empty.',
    },
  ],
};
