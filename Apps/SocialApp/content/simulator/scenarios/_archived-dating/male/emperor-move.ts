// Scenario: The Emperor Move (Male Version of Empress Move)
// Power consolidation and final sovereignty
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../../types';

export const emperorMoveScenario: Scenario = {
  id: 'male-emperor-move',
  title: 'The Emperor Move',
  tagline: 'Stop surviving. Start reigning.',
  description:
    'She adores you. Her family loves you. But somewhere along the way, you stopped being the man she fell for. Time to reclaim your crown.',
  tier: 'vip',
  estimatedMinutes: 18,
  difficulty: 'advanced',
  category: 'healthy',
  xpReward: 200,
  badgeId: 'emperor',
  targetGender: 'male',

  templates: {
    partner: ['Michelle', 'Danielle', 'Stephanie', 'Christina', 'Jessica'],
    bestie: ['Mike', 'Connor', 'Jake', 'Tyler', 'Brandon'],
  },

  tacticsLearned: [
    'The Five Pillars (Financial, Physical, Emotional, Social, Strategic)',
    'Granting position (giving access vs. seeking validation)',
    'Selection mindset (you choose, not hope to be chosen)',
    'Sovereignty establishment (your kingdom, she lives in it)',
    'The Emperor Endgame (commitment from strength)',
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
      id: 'michelle',
      name: 'Michelle',
      description: 'Your devoted girlfriend. Consistent, invested, committed.',
      traits: ['devoted', 'reliable', 'loving'],
      defaultEmotion: 'happy',
    },
    {
      id: 'bestie',
      name: 'Mike',
      description: 'Your ride-or-die. Built his business. Lives by his own rules.',
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
    // ============================================
    // SCENE 1: The Wake-Up
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You wake up next to {partner}. One year together. She's still asleep. Your phone has three texts from her last night checking when you'd be home.",
        },
        {
          text: "You scroll back through your own messages. Mostly asking what she wants for dinner. When she's free. If she's upset. Your gym bag is dusty in the corner. You can't remember the last time you saw the boys.",
        },
        {
          speakerId: 'inner-voice',
          text: 'When did you become the one always checking in?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'Text {bestie}: "Beers later? I need to talk."',
          nextSceneId: 'scene-2-brunch',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'seeking_perspective',
          feedback: 'OPTIMAL: Sometimes you need outside eyes. The right friend tells you truth, not comfort.',
        },
        {
          id: 'choice-1b',
          text: 'It\'s fine. Everyone gets comfortable in relationships.',
          nextSceneId: 'scene-2-denial',
          xpBonus: 0,
          feedback: 'TRAP: Comfort is how empires fall. Slowly, then all at once.',
        },
        {
          id: 'choice-1c',
          text: 'Start journaling what\'s changed over the past year.',
          nextSceneId: 'scene-2-journal',
          xpBonus: 10,
          tactic: 'self_audit',
          feedback: 'Self-reflection is powerful. But alone, it can become rumination.',
        },
        {
          id: 'choice-1d',
          text: 'Wake {partner} up. Talk about how you\'re feeling.',
          nextSceneId: 'scene-2-talk',
          xpBonus: 5,
          feedback: 'Vulnerable, but premature. You don\'t yet know what you want. Clarity first.',
        },
      ],
    },

    // ============================================
    // SCENE 2-DENIAL: Comfort zone
    // ============================================
    {
      id: 'scene-2-denial',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} wakes up. Kisses your forehead. \"What do you want to do today?\" You realize you don't have an answer. Your weekends have become her weekends.",
          speakerId: 'michelle',
          emotion: 'happy',
        },
        {
          text: "Your phone buzzes. {bestie}: \"Haven't seen you in forever. Still alive bro?\"",
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
          xpBonus: 0,
          feedback: 'TRAP: You just handed her the remote to your life.',
        },
        {
          id: 'choice-2b',
          text: '"Actually, I need to see {bestie}. Guy time."',
          nextSceneId: 'scene-2-brunch',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good. Your friendships are a pillar. Don\'t let them crumble.',
        },
        {
          id: 'choice-2c',
          text: '"Let me check what\'s going on this weekend first."',
          nextSceneId: 'scene-2b-weak',
          xpBonus: 5,
          feedback: 'Close. But you\'re still asking for permission implicitly.',
        },
      ],
    },

    // ============================================
    // SCENE 2-TALK: Talked to her prematurely
    // ============================================
    {
      id: 'scene-2-talk',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} listens. \"What do you mean you feel like you've lost yourself?\" She's concerned but confused. \"I thought things were good between us.\"",
          speakerId: 'michelle',
          emotion: 'confused',
        },
        {
          text: "You can't articulate it. Because you don't fully understand it yet. The conversation ends with reassurance but no resolution. She looks at you slightly differently now.",
        },
        {
          speakerId: 'inner-voice',
          text: "You showed weakness without a plan. She's worried now—not attracted.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-2talk-a',
          text: 'Reach out to {bestie}. Get perspective.',
          nextSceneId: 'scene-2-brunch',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Good recovery. Get clarity before the next conversation.',
        },
        {
          id: 'choice-2talk-b',
          text: 'Double down. Keep processing with her.',
          nextSceneId: 'scene-therapist-trap',
          xpBonus: 0,
          feedback: 'TRAP: She\'s your partner, not your therapist.',
        },
      ],
    },

    // ============================================
    // SCENE THERAPIST-TRAP: Using her as therapist
    // ============================================
    {
      id: 'scene-therapist-trap',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The conversations continue. Night after night. Your doubts, your fears, your confusion. She listens. She's patient. But something shifts in how she looks at you.",
        },
        {
          text: "\"Babe, have you thought about talking to someone? A professional?\" Translation: I can't carry this anymore.",
          speakerId: 'michelle',
          emotion: 'sad',
        },
        {
          text: "You've been emotional with her. Constantly. She fell in love with a man who had his life together. Now she's mothering a project.",
        },
      ],
      nextSceneId: 'scene-early-bad',
    },

    // ============================================
    // SCENE EARLY-BAD: Lost attraction early
    // ============================================
    {
      id: 'scene-early-bad',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. The intimacy has disappeared. She says she still loves you, but she \"needs space to figure things out.\" Translation: she's lost attraction and doesn't know how to say it.",
        },
        {
          text: "You opened up without rebuilding. Showed vulnerability without showing strength. She wanted a partner. You gave her a patient.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Emotional Dump',
      endingSummary:
        'You used her as your therapist instead of your partner. Vulnerability without strength isn\'t attractive—it\'s exhausting. She wanted a king, not a project.',
      endingLearnReference: 'Process with friends or professionals. Rebuild with your partner watching.',
      endingLearnPrompt: 'Who should you have talked to first before processing with her?',
    },

    // ============================================
    // SCENE 2-JOURNAL: Self-reflection path
    // ============================================
    {
      id: 'scene-2-journal',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You write it down. The gym. The savings. The friendships. The career ambitions. All of them have slipped. You see the pattern clearly now.",
        },
        {
          text: "{bestie} texts: \"Bro, poker night Friday. You in or has {partner} got you on lockdown again?\"",
        },
        {
          speakerId: 'inner-voice',
          text: "He's noticed too. Everyone has.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2j-a',
          text: '"I\'m in. Actually, can we grab lunch before? Need to talk."',
          nextSceneId: 'scene-2-brunch',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'OPTIMAL: Self-reflection plus external perspective. The right combination.',
        },
        {
          id: 'choice-2j-b',
          text: '"Let me check with {partner}."',
          nextSceneId: 'scene-2b-weak',
          xpBonus: 0,
          feedback: 'TRAP: You just proved his point. You\'re on lockdown.',
        },
      ],
    },

    // ============================================
    // SCENE 2B-WEAK: The weak path
    // ============================================
    {
      id: 'scene-2b-weak',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} picks the movie. Then the restaurant. Then whether you stay in or go out. You catch yourself waiting for her approval before deciding anything.",
        },
        {
          text: "Later, {bestie} texts again: \"Seriously, beers tomorrow. Non-negotiable.\"",
        },
        {
          text: "You used to be the one with opinions. With plans. With a life.",
        },
      ],
      nextSceneId: 'scene-2-brunch',
    },

    // ============================================
    // SCENE 2-BRUNCH: The wake-up call
    // ============================================
    {
      id: 'scene-2-brunch',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{bestie} is in good shape. Sharp. Like someone who runs his life, not chases it.",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          text: "\"You look tired, bro.\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          text: "\"Thanks.\"",
        },
        {
          text: "\"I mean it. You used to walk in like you owned the place. Now you look like you're asking permission to exist.\"",
          speakerId: 'bestie',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: 'He sees it. The drift.',
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
          feedback: 'OPTIMAL: Admitting it is the first step to fixing it.',
        },
        {
          id: 'choice-3b',
          text: '"I\'m fine. Just tired."',
          nextSceneId: 'scene-3-deflect',
          xpBonus: 0,
          feedback: 'Deflecting won\'t fix the erosion.',
        },
        {
          id: 'choice-3c',
          text: '"It\'s {partner}. She\'s changed me."',
          nextSceneId: 'scene-3-blame',
          xpBonus: 0,
          feedback: 'TRAP: Blaming her won\'t help. You changed yourself. Own it.',
        },
      ],
    },

    // ============================================
    // SCENE 3-BLAME: Blaming her
    // ============================================
    {
      id: 'scene-3-blame',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{bestie} shakes his head. \"Nah. She didn't do this to you. You did this to you. Nobody made you skip the gym. Nobody made you ghost the boys. Nobody made you stop having opinions.\"",
          speakerId: 'bestie',
          emotion: 'cold',
        },
        {
          text: "\"You chose comfort. Chose easy. Chose being her accessory instead of being her partner.\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "He's right. And you know it.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-3blame-a',
          text: '"...Yeah. You\'re right."',
          nextSceneId: 'scene-3-honest',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Good. Taking responsibility is step one.',
        },
        {
          id: 'choice-3blame-b',
          text: '"It\'s more complicated than that."',
          nextSceneId: 'scene-3-honest',
          xpBonus: 5,
          feedback: 'Still deflecting, but he\'ll push through anyway.',
        },
      ],
    },

    // ============================================
    // SCENE 3-DEFLECT: Deflecting Mike
    // ============================================
    {
      id: 'scene-3-deflect',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{bestie} just stares at you. \"Bro. Your gym bag has cobwebs. You skipped my birthday for her work thing. You asked ME if it was okay to order another beer.\"",
          speakerId: 'bestie',
          emotion: 'cold',
        },
        {
          text: "\"When did you become someone who needs permission?\"",
          speakerId: 'bestie',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-3-honest',
    },

    // ============================================
    // SCENE 3-HONEST: The audit begins
    // ============================================
    {
      id: 'scene-3-honest',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{bestie} leans in. \"Let's do a quick audit. Answer honestly. Your savings account—better or worse than last year?\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: 'The Five Pillars audit begins.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: '"...Worse. I\'ve been covering a lot of stuff."',
          nextSceneId: 'scene-4-financial',
          xpBonus: 5,
          feedback: 'Financial drift is dangerous. Even with someone who loves you.',
        },
        {
          id: 'choice-4b',
          text: '"Same. I still handle my own."',
          nextSceneId: 'scene-4-physical',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good. At least that pillar is standing.',
        },
      ],
    },

    // ============================================
    // SCENE 4-FINANCIAL: Financial pillar down
    // ============================================
    {
      id: 'scene-4-financial',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Okay, first pillar down.\" {bestie} taps the table. \"Could you leave tomorrow and be fine? That's not cynical. That's freedom. That's leverage.\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          text: "\"When you can't leave, you can't negotiate. When you can't negotiate, you're a hostage, not a partner.\"",
          speakerId: 'bestie',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-4-physical',
    },

    // ============================================
    // SCENE 4-PHYSICAL: Physical pillar check
    // ============================================
    {
      id: 'scene-4-physical',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Next: When's the last time you worked out? Not a walk. Actually trained.\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: 'Your body is your kingdom.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: '"...I don\'t remember."',
          nextSceneId: 'scene-5-social',
          xpBonus: 5,
          feedback: 'Your body is your kingdom. You\'ve been neglecting the castle.',
        },
        {
          id: 'choice-5b',
          text: '"Last week. I\'ve kept that up."',
          nextSceneId: 'scene-5-social',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Physical pillar standing. That takes discipline.',
        },
      ],
    },

    // ============================================
    // SCENE 5-SOCIAL: Social pillar
    // ============================================
    {
      id: 'scene-5-social',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Last one: Name three things you do that don't involve {partner}.\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          text: "You open your mouth. Nothing comes. Her friends became your friends. Her plans became your plans.",
        },
        {
          speakerId: 'inner-voice',
          text: "You've been living in her world. You don't have one of your own anymore.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: '"I... can\'t."',
          nextSceneId: 'scene-6-plan',
          xpBonus: 5,
          feedback: 'Social pillar collapsed. You\'ve been living in her world.',
        },
        {
          id: 'choice-6b',
          text: '"This is embarrassing."',
          nextSceneId: 'scene-6-plan',
          xpBonus: 8,
          feedback: 'Embarrassment means you see the problem. Good.',
        },
        {
          id: 'choice-6c',
          text: '"Poker with you guys. That\'s still mine."',
          nextSceneId: 'scene-6-plan',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good. One thing. Build from there.',
        },
      ],
    },

    // ============================================
    // SCENE 6-PLAN: The rebuild
    // ============================================
    {
      id: 'scene-6-plan',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{bestie} signals for another round. \"Here's what you're going to do. Pick one thing and fix it this week. Financial, physical, or social. One pillar. Start rebuilding.\"",
          speakerId: 'bestie',
          emotion: 'smirking',
        },
        {
          text: "\"Don't try to fix everything at once. That's how you burn out. One pillar. Then the next. Momentum builds.\"",
          speakerId: 'bestie',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "He's not lecturing. He's offering a starting point.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: 'Book a gym session for tomorrow morning.',
          nextSceneId: 'scene-7-physical',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'physical_pillar',
          feedback: 'OPTIMAL: Physical is the fastest to rebuild. Energy creates momentum.',
        },
        {
          id: 'choice-7b',
          text: 'Text the group chat: "Poker night Friday. I\'m hosting."',
          nextSceneId: 'scene-7-social',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'social_pillar',
          feedback: 'OPTIMAL: Social pillar rebuilding. Your boys miss you.',
        },
        {
          id: 'choice-7c',
          text: 'Open your banking app. Set up auto-transfer to savings.',
          nextSceneId: 'scene-7-financial',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'financial_pillar',
          feedback: 'OPTIMAL: Financial independence is foundation. Smart first move.',
        },
        {
          id: 'choice-7d',
          text: '"I\'ll think about it and figure out what makes sense."',
          nextSceneId: 'scene-7-delay',
          xpBonus: 0,
          feedback: 'TRAP: Analysis paralysis. Action beats planning.',
        },
      ],
    },

    // ============================================
    // SCENE 7-DELAY: Didn't commit
    // ============================================
    {
      id: 'scene-7-delay',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{bestie} sighs. \"That's exactly the problem. You're always 'thinking about it.' You used to do things. Now you contemplate things.\"",
          speakerId: 'bestie',
          emotion: 'sad',
        },
        {
          text: "He's right. You leave without committing to anything. A week passes. Then a month. Nothing changes.",
        },
      ],
      nextSceneId: 'scene-slow-fade',
    },

    // ============================================
    // SCENE SLOW-FADE: Didn't change
    // ============================================
    {
      id: 'scene-slow-fade',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. Things with {partner} are fine. Comfortable. But that spark? Gone. She doesn't look at you the way she used to.",
        },
        {
          text: "\"You've changed,\" she says one night. \"You're just... there. Present but not really.\"",
          speakerId: 'michelle',
          emotion: 'sad',
        },
        {
          text: "She fell in love with a man who was going somewhere. Now you're going nowhere. Together.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Slow Fade',
      endingSummary:
        'You saw the problem but didn\'t act. Awareness without action is just regret with more steps. The throne sits empty because you never climbed back onto it.',
      endingLearnReference: 'Insight without action is worthless.',
      endingLearnPrompt: 'What stopped you from taking immediate action?',
    },

    // ============================================
    // SCENE 7-PHYSICAL: Chose gym
    // ============================================
    {
      id: 'scene-7-physical',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "5:30 AM. Your alarm goes off. {partner} stirs. \"Where are you going?\" \"Gym.\" She looks confused. You haven't said that word in months.",
        },
        {
          text: "The workout is brutal. You've lost ground. But you show up again Wednesday. Then Friday. Then it becomes habit.",
        },
      ],
      nextSceneId: 'scene-8-shift',
    },

    // ============================================
    // SCENE 7-SOCIAL: Chose social
    // ============================================
    {
      id: 'scene-7-social',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Friday night. The boys are at your place. Poker, whiskey, conversation that has nothing to do with relationships.",
        },
        {
          text: "{partner} texts: \"How long will this go?\" You respond: \"Late. Don't wait up.\" No apology. No explanation.",
        },
        {
          text: "She texts back a single heart. She's not upset. She respects it.",
        },
      ],
      nextSceneId: 'scene-8-shift',
    },

    // ============================================
    // SCENE 7-FINANCIAL: Chose financial
    // ============================================
    {
      id: 'scene-7-financial',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You set up the transfer. $500/month to savings. Then you audit your spending. The coffees. The dinners. The \"surprises\" you kept buying to make her happy.",
        },
        {
          text: "Not because you're cheap. Because you were seeking approval with money instead of building security.",
        },
      ],
      nextSceneId: 'scene-8-shift',
    },

    // ============================================
    // SCENE 8-SHIFT: She notices
    // ============================================
    {
      id: 'scene-8-shift',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three weeks later. You've kept your promise. {partner}'s been watching you. Her eyes follow you across the room.",
          speakerId: 'michelle',
          emotion: 'confused',
        },
        {
          text: "\"You've been busy lately.\"",
          speakerId: 'michelle',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: 'She feels the shift. Good. That\'s the point.',
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
          feedback: 'OPTIMAL: You framed it as a positive for her too. No defensiveness.',
        },
        {
          id: 'choice-8b',
          text: '"Sorry, I\'ve just been—"',
          nextSceneId: 'scene-8-apologize',
          xpBonus: 0,
          feedback: 'TRAP: Don\'t apologize for having a life.',
        },
        {
          id: 'choice-8c',
          text: '"What, is that a problem?"',
          nextSceneId: 'scene-8-defensive',
          xpBonus: 5,
          feedback: 'Defensive. She wasn\'t attacking. Don\'t create conflict.',
        },
        {
          id: 'choice-8d',
          text: '"Why do you ask?"',
          nextSceneId: 'scene-8-deflect',
          xpBonus: 10,
          feedback: 'Close. Neutral response. Could be better.',
        },
      ],
    },

    // ============================================
    // SCENE 8-APOLOGIZE: Apologized for sovereignty
    // ============================================
    {
      id: 'scene-8-apologize',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "She waves it off, but relaxes. You just reassured her she doesn't have to try harder.",
        },
        {
          text: "You apologized for sovereignty. That's not the move. The work continues, but you've shown her she can relax.",
        },
      ],
      nextSceneId: 'scene-9-future',
    },

    // ============================================
    // SCENE 8-DEFENSIVE: Got defensive
    // ============================================
    {
      id: 'scene-8-defensive',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} blinks. \"No, I was just asking.\" She backs off. But now there's tension where there didn't need to be.",
          speakerId: 'michelle',
          emotion: 'confused',
        },
        {
          text: "You created conflict from an observation. That's insecurity talking.",
        },
      ],
      nextSceneId: 'scene-9-future',
    },

    // ============================================
    // SCENE 8-DEFLECT: Deflected
    // ============================================
    {
      id: 'scene-8-deflect',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Just curious. You seem different.\" She studies you. \"More... you.\"",
          speakerId: 'michelle',
          emotion: 'neutral',
        },
        {
          text: "She noticed. She's recalibrating. Good.",
        },
      ],
      nextSceneId: 'scene-9-future',
    },

    // ============================================
    // SCENE 8-CONFIDENT: Confident response
    // ============================================
    {
      id: 'scene-8-confident',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} blinks. Then smiles slowly. \"I like it. You seem more... you.\"",
          speakerId: 'michelle',
          emotion: 'seductive',
        },
        {
          text: "Her energy shifts. She moves closer. Touches your arm. She fell for the man with his own life. He's back.",
        },
        {
          text: "There it is. Sovereignty is attractive.",
        },
      ],
      nextSceneId: 'scene-9-test',
    },

    // ============================================
    // SCENE 9-TEST: She tests the change
    // ============================================
    {
      id: 'scene-9-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A week later. {partner} suggests canceling your gym session to have brunch with her friends. \"They really want to see you.\"",
          speakerId: 'michelle',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: 'Test. Will you protect your pillar or fold for approval?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-9test-a',
          text: '"I can do brunch after. My gym time isn\'t negotiable."',
          nextSceneId: 'scene-9-passed',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'OPTIMAL: Protected your pillar without being rude. Boundary held.',
        },
        {
          id: 'choice-9test-b',
          text: '"Sure, I can skip this once."',
          nextSceneId: 'scene-9-failed',
          xpBonus: 0,
          feedback: 'TRAP: You passed the first test. Failed the second. Patterns matter.',
        },
        {
          id: 'choice-9test-c',
          text: '"Why can\'t you go without me?"',
          nextSceneId: 'scene-9-question',
          xpBonus: 8,
          feedback: 'Close. But it sounds like you need her permission to say no.',
        },
      ],
    },

    // ============================================
    // SCENE 9-PASSED: Passed the test
    // ============================================
    {
      id: 'scene-9-passed',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "She pauses. Then nods. \"Okay. Text me when you're done.\" No pouting. No guilt trip. She respected the boundary because you respected yourself.",
          speakerId: 'michelle',
          emotion: 'neutral',
        },
        {
          text: "Brunch is good. She looks at you differently. Like she's proud to show you off. Not because you accommodated her. Because you didn't need to.",
        },
      ],
      nextSceneId: 'scene-10-future',
    },

    // ============================================
    // SCENE 9-FAILED: Failed the test
    // ============================================
    {
      id: 'scene-9-failed',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You skip the gym. Brunch is fine. But something shifts. She got what she wanted easily. Too easily. The chase is over again.",
        },
        {
          text: "Two weeks later, you notice she's less affectionate. Less attentive. The spark you reignited is flickering.",
        },
      ],
      nextSceneId: 'scene-9-future',
    },

    // ============================================
    // SCENE 9-QUESTION: Questioned instead of stating
    // ============================================
    {
      id: 'scene-9-question',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Because they want to see both of us.\" She looks confused. \"Is that a problem?\"",
          speakerId: 'michelle',
          emotion: 'confused',
        },
        {
          text: "You asked a question instead of making a statement. Now you have to either justify or cave. Poor positioning.",
        },
      ],
      nextSceneId: 'scene-9-future',
    },

    // ============================================
    // SCENE 9-FUTURE: The conversation
    // ============================================
    {
      id: 'scene-9-future',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "A month later. Dinner at a nice place. Your idea.",
        },
        {
          text: "\"I've been thinking about us. About the future.\" Her heart beats faster. But you notice—yours doesn't race with desperation. With curiosity, maybe.",
          speakerId: 'michelle',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "This is different. You're not hoping. You're listening.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-10a',
          text: '"Tell me what you\'re thinking."',
          nextSceneId: 'scene-10-grant',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'granting_position',
          feedback: 'OPTIMAL: Interested but not desperate. Granting access, not begging for it.',
        },
        {
          id: 'choice-10b',
          text: '"Yes! I\'ve been hoping you\'d say that!"',
          nextSceneId: 'scene-10-eager',
          xpBonus: 0,
          feedback: 'TRAP: You just showed all your cards. Her work is done.',
        },
        {
          id: 'choice-10c',
          text: '"What kind of future?"',
          nextSceneId: 'scene-10-clarify',
          xpBonus: 10,
          feedback: 'Close. Neutral. But slightly guarded.',
        },
      ],
    },

    // ============================================
    // SCENE 10-FUTURE: Direct conversation path
    // ============================================
    {
      id: 'scene-10-future',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Two months later. {partner} brings up the future. \"Where do you see us going?\"",
          speakerId: 'michelle',
          emotion: 'neutral',
        },
        {
          text: "The question hangs. This is the moment. How you answer reveals everything.",
        },
        {
          speakerId: 'inner-voice',
          text: "Choose from strength. Not desperation. Not fear.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-10future-a',
          text: '"I want us to build something. But only if we both keep growing."',
          nextSceneId: 'scene-10-grant',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'OPTIMAL: Commitment with conditions. Standards intact.',
        },
        {
          id: 'choice-10future-b',
          text: '"I don\'t want to lose you. Whatever you want."',
          nextSceneId: 'scene-10-eager',
          xpBonus: 0,
          feedback: 'TRAP: Desperation. You just gave away your leverage.',
        },
      ],
    },

    // ============================================
    // SCENE 10-EAGER: Over-eager response
    // ============================================
    {
      id: 'scene-10-eager',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Something in her eyes relaxes. A micro-shift you almost miss. She just realized she doesn't have to try anymore. The chase is over.",
        },
        {
          text: "The conversation continues, but her energy has shifted. Slightly less attentive. She got what she needed. The work is done.",
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },

    // ============================================
    // SCENE 10-CLARIFY: Asked for clarification
    // ============================================
    {
      id: 'scene-10-clarify',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "\"Like, marriage. Kids. The whole thing.\" She looks nervous now. Vulnerable.",
          speakerId: 'michelle',
          emotion: 'confused',
        },
        {
          text: "You made her spell it out. She's exposed. You're protected. But this is also an opportunity.",
        },
        {
          speakerId: 'inner-voice',
          text: "She showed vulnerability. Now it's your turn.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-10c-a',
          text: '"I want that too. With the right person. I think you might be her."',
          nextSceneId: 'scene-10-grant',
          isOptimal: true,
          xpBonus: 18,
          feedback: 'Good. Vulnerability matched with confidence. "Might be" keeps it earned.',
        },
        {
          id: 'choice-10c-b',
          text: '"Let\'s see how things go."',
          nextSceneId: 'scene-10-cold',
          xpBonus: 5,
          feedback: 'Too cold. She was vulnerable. You shut her down.',
        },
      ],
    },

    // ============================================
    // SCENE 10-COLD: Too cold
    // ============================================
    {
      id: 'scene-10-cold',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Her face falls. \"Oh. Okay.\" The rest of dinner is quiet. You protected yourself, but at what cost?",
          speakerId: 'michelle',
          emotion: 'sad',
        },
        {
          text: "She was offering her heart. You gave her a corporate non-answer. Sovereignty isn't coldness.",
        },
      ],
      nextSceneId: 'scene-cold-ending',
    },

    // ============================================
    // SCENE COLD-ENDING: Too distant
    // ============================================
    {
      id: 'scene-cold-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three months later. She breaks up with you. \"I feel like I'm chasing someone who doesn't want to be caught.\"",
          speakerId: 'michelle',
          emotion: 'sad',
        },
        {
          text: "You overcorrected. Sovereignty isn't walls. It's having a kingdom worth entering. You built the castle but forgot to open the gate.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Ice King',
      endingSummary:
        'You rebuilt your pillars but forgot the purpose. Sovereignty isn\'t coldness. It\'s having your own kingdom AND inviting her in. You pushed her away.',
      endingLearnReference: 'Strength and warmth must coexist.',
      endingLearnPrompt: 'How could you have shown vulnerability without losing sovereignty?',
    },

    // ============================================
    // SCENE 10-GRANT: Granting position
    // ============================================
    {
      id: 'scene-10-grant',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "She leans closer. Eyes intense. \"You're different now. Stronger. I think about you more, not less. Like I have to keep earning you. It's... I like it.\"",
          speakerId: 'michelle',
          emotion: 'seductive',
        },
        {
          text: "She fell in love with the man who chose her. Who could leave but stayed. Who had options but selected her.",
        },
        {
          text: 'There it is. Sovereignty creates attraction. Selection beats desperation.',
        },
      ],
      nextSceneId: 'scene-good-ending',
    },

    // ============================================
    // ENDINGS
    // ============================================
    {
      id: 'scene-good-ending',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Six months later. You proposed. She said yes. But you proposed from choice, not desperation.",
        },
        {
          text: "Your savings are healthy. Your body is strong. Your boys see you regularly. You have a 5-year plan—YOUR plan.",
        },
        {
          text: "And {partner}? She still looks at you like she can't believe you chose her. That's the difference. You didn't hope to be chosen. You selected.",
        },
        {
          text: "You could leave tomorrow and be fine. That security is the foundation of real love.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Emperor',
      endingSummary:
        'You rebuilt your pillars. You entered commitment from power, not desperation. She chose you—but more importantly, you selected her. The throne is occupied.',
    },

    {
      id: 'scene-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things are better. She's more invested. You're more balanced. But you catch yourself slipping sometimes. Checking her mood before making plans.",
        },
        {
          text: "The work isn't done. Sovereignty isn't a destination—it's daily practice.",
        },
        {
          text: "You're better than before. But the emperor crown still awaits.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Work in Progress',
      endingSummary:
        'You started rebuilding. But sovereignty is daily practice. The crown is available. Keep reaching.',
      endingLearnReference: 'Progress is good. Completion is better.',
      endingLearnPrompt: 'What pillar still needs work?',
    },

    {
      id: 'scene-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A year later. The warnings went unheeded. Your world is her world. Your friends are her friends. Your plans are her plans.",
        },
        {
          text: "\"You used to be so driven. I miss that.\"",
          speakerId: 'michelle',
          emotion: 'sad',
        },
        {
          text: "She fell for a king. She got furniture. The relationship continues, but you're not equal partners. You're an accessory. The throne sits empty.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Surrender',
      endingSummary:
        'You lost yourself. She pursued a sovereign. She got a shadow. The throne sits empty because you never climbed back onto it.',
      endingLearnReference: 'A relationship should add to your kingdom, not replace it.',
      endingLearnPrompt: 'At what point did you stop being yourself?',
    },
  ],
};
