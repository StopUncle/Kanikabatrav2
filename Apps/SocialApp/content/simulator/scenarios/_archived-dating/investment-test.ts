// Scenario: The Investment Test
// Make him climb the ladder to earn access
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../types';

export const investmentTestScenario: Scenario = {
  id: 'investment-test',
  title: 'The Investment Test',
  tagline: 'What is freely given is never valued.',
  description:
    "Jake is charming, attractive, and moving fast—too fast. He wants commitment, exclusivity, access to your inner world. Before you give it, you need to see investment. Make him climb the ladder.",
  tier: 'free',
  estimatedMinutes: 12,
  difficulty: 'beginner',
  category: 'healthy',
  xpReward: 100,
  badgeId: 'gatekeeper',

  tacticsLearned: [
    'The Investment Ladder framework',
    'Holy Grail Doctrine (scarcity positioning)',
    'Rung-skipping recognition',
    'Enforcing earned access',
    'The Obligation Trap',
  ],
  redFlagsTaught: [
    'Love bombing and early intensity',
    'Pushing for commitment before investment',
    'Creating false urgency',
    'Entitlement to access',
    'Isolation tactics',
  ],

  characters: [
    {
      id: 'jake',
      name: 'Jake',
      description:
        "Charming, confident, and seemingly perfect. But he's moving very fast. Watch what he does, not what he says.",
      traits: ['charming', 'persistent', 'impatient'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'friend',
      name: 'Maya',
      description: 'Your best friend. Sharp observer, no-nonsense advice. The voice of reason.',
      traits: ['protective', 'wise', 'blunt'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner',
      name: 'Your Inner Voice',
      description: 'The part of you that sees clearly. Learning to trust it is the work.',
      traits: ['strategic', 'aware'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    {
      id: 'scene-1',
      backgroundId: 'bar',
      dialog: [
        {
          text: "You met Jake two weeks ago at a friend's party. Immediate chemistry. Great conversations. Third date now, nice restaurant, and he's been charming all evening. \"I have to be honest with you,\" he says, leaning in. \"I've never felt this way about anyone so quickly. I deleted the dating apps. I want to be exclusive.\"",
        },
        {
          speakerId: 'inner',
          text: 'Third date. Already asking for the whole thing. What has he actually done to earn exclusivity?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: '"That\'s so sweet. Yes, let\'s be exclusive!"',
          nextSceneId: 'scene-2a',
          feedback:
            "TRAP: Exclusivity on the third date? He hasn't climbed a single rung. You just handed him the prize without making him earn it.",
        },
        {
          id: 'choice-1b',
          text: '"I appreciate that. I\'m enjoying getting to know you, but I like to take things slow."',
          nextSceneId: 'scene-2b',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'investment_ladder',
          feedback:
            "OPTIMAL: You're not rejecting him—you're requiring investment. The Holy Grail Doctrine: the prize must be earned.",
        },
        {
          id: 'choice-1c',
          text: '"That seems really fast. I barely know you."',
          nextSceneId: 'scene-2c',
          xpBonus: 5,
          feedback:
            "Direct and honest. A bit blunt, but effective. You've established that words alone won't purchase access.",
        },
      ],
    },
    {
      id: 'scene-2a',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Jake beams. The rest of the date is amazing. The next morning, he texts: \"Good morning, girlfriend 💕\" A week later, things escalate. He wants to meet your family. Talks about moving in together. You gave him Rung 5 access. Now he expects 7, 8, 9... without climbing anything.",
        },
        {
          text: "He gets upset when you can't see him every night. \"I thought we were exclusive? Why are you pulling away?\" Maya calls you that night. \"This is love bombing. Classic pattern. He skipped to the top of the ladder without climbing it. Now he feels entitled to the whole building.\"",
          speakerId: 'friend',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-rescue',
    },
    {
      id: 'scene-2b',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Jake's smile flickers—just for a moment. Irritation. Gone as fast as it came. \"Take things slow? But I thought we had something special...\" He studies you. \"Is there someone else?\" Notice the pivot: from \"we're special\" to \"who's my competition?\" You answer calmly: \"This isn't about anyone else. It's about taking time to know each other.\"",
        },
        {
          text: "He presses: \"But we talk every day. What else is there to know?\" \"How you handle disappointment. Whether you respect my pace. What you do when you don't get what you want.\" He recovers his composure, charm returning. \"Fair enough. I respect that. When you know, you know, right?\"",
          speakerId: 'jake',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: '"When you know, you know." So what\'s the rush?',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-2b-1',
          text: '"Then you\'ll have no problem proving it over time."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'requiring_investment',
          feedback:
            "OPTIMAL: You're reframing his urgency as an opportunity to demonstrate value. If he truly 'knows,' he'll prove it through action.",
        },
        {
          id: 'choice-2b-2',
          text: '"Maybe you\'re right. I might be overthinking this."',
          nextSceneId: 'scene-2a',
          feedback:
            "TRAP: He's getting in your head. Your instincts said 'slow down.' Trust them.",
        },
      ],
    },
    {
      id: 'scene-2c',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Jake looks wounded. \"Barely know me? We've been talking every day. I've told you things I've never told anyone.\" Words and time. Easy to give. What has he actually done?",
        },
        {
          text: "\"And I appreciate that. But actions over time matter more than words over days.\" He takes a breath. Regroups. \"Fair. What do I need to do to prove I'm serious?\" Good question. He's asking how to climb. Now you make him actually do it.",
          speakerId: 'jake',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-3',
    },
    {
      id: 'scene-3',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Two weeks pass. Jake has been consistent—but you notice patterns. He always wants to meet at his place or yours. Never plans actual dates. He talks about the future constantly, but hasn't introduced you to a single friend. Big talk about tomorrow. No effort in the present.",
        },
        {
          text: "Today, you mention you have plans with your girls. \"Cancel them. I made reservations at this amazing place.\" He didn't ask. He told. And he expects your friends to be expendable.",
          speakerId: 'jake',
          emotion: 'cold',
        },
        {
          speakerId: 'inner',
          text: 'He expects you to drop everything. For a reservation you didn\'t ask for.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: '"I can\'t cancel on my friends. Let\'s do the restaurant another night."',
          nextSceneId: 'scene-4a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'boundary_enforcement',
          feedback:
            "OPTIMAL: Your existing life isn't negotiable. He needs to work around it, not replace it. Isolation is a control tactic.",
        },
        {
          id: 'choice-3b',
          text: '"Okay, let me see if they\'d be okay with rescheduling."',
          nextSceneId: 'scene-4b',
          feedback:
            "WARNING: You're already deprioritizing your support network for him. This is how isolation begins.",
        },
        {
          id: 'choice-3c',
          text: '"Why don\'t you join us? I\'d love for you to meet my friends."',
          nextSceneId: 'scene-4c',
          xpBonus: 10,
          tactic: 'integration_test',
          feedback:
            "Smart. You're testing if he wants to join your life, or just monopolize you. His response will be telling.",
        },
      ],
    },
    {
      id: 'scene-4a',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Jake's response is slow coming. Three minutes. Five minutes. Then: \"Fine. Have fun with your friends.\" No \"enjoy yourself.\" No \"when can I see you next?\" Just passive aggression. You had plans. He's punishing you for it.",
        },
        {
          text: "At brunch with your girls, Maya asks how things are going. You show her the text. Her face hardens. \"This? This is manipulation. He's punishing you for having a life outside of him. A secure man would say 'have fun, text me later.' This is a warning shot.\"",
          speakerId: 'friend',
          emotion: 'cold',
        },
        {
          speakerId: 'inner',
          text: 'She sees what you were trying not to see.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-4a-1',
          text: '"You\'re right. This is a pattern I need to address."',
          nextSceneId: 'scene-5a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'pattern_recognition',
          feedback:
            "OPTIMAL: Recognizing the pattern is the first step. Don't explain. Don't apologize. Observe and decide.",
        },
        {
          id: 'choice-4a-2',
          text: '"Maybe I should have cancelled. He was really excited about that restaurant."',
          nextSceneId: 'scene-4b',
          feedback:
            "WARNING: He's already conditioning you to feel guilty for having a life. This is the Guilt Horseman at work.",
        },
      ],
    },
    {
      id: 'scene-4b',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A month later. You've cancelled on friends three times. Your life is increasingly about Jake. He's still talking about your future—but somehow, you feel more anxious, not more secure. This is what love bombing looks like from the inside: all intensity, no substance.",
        },
        {
          text: "Maya corners you. \"I've barely seen you in weeks. You've changed. Where did you go?\" You went nowhere. Your life shrank to fit inside his demands.",
          speakerId: 'friend',
          emotion: 'sad',
        },
        {
          text: 'Your world is shrinking. His is staying the same.',
        },
      ],
      nextSceneId: 'scene-rescue',
    },
    {
      id: 'scene-4c',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Jake pauses. \"Your friends? I thought it was a girls' night.\" \"They'd love to meet you. Unless you'd rather wait?\" \"Uh, I actually have some stuff to do. You go ahead.\"",
          speakerId: 'jake',
          emotion: 'neutral',
        },
        {
          text: "He wants your full attention. But won't meet your friends. Interesting.",
        },
      ],
      nextSceneId: 'scene-5a',
    },
    {
      id: 'scene-5a',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You decide to run a real test. Time to see what Jake is made of. You're less available. Respond slower. Have plans he can't join. If he's genuinely invested, he'll rise to the challenge. If he's entitled, he'll crack.",
        },
        {
          text: "Day one: He texts four times. You respond once. Day three: He wants to \"talk about us.\" You suggest next week. Day five: His tone shifts. \"Can we meet? I feel like you're pulling away.\" You offer Saturday—five days away. \"Saturday? What's going on with you? After everything I've done for you?\"",
          speakerId: 'jake',
          emotion: 'angry',
        },
        {
          speakerId: 'inner',
          text: '"After everything I\'ve done" — what has he actually done?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-5a-1',
          text: '"What have you done for me, specifically? I\'m curious."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'calling_bluff',
          feedback:
            "OPTIMAL: The Audit. Make him name his actual investment. When he can't list concrete actions, the truth is revealed.",
        },
        {
          id: 'choice-5a-2',
          text: '"You\'re right, I\'m sorry. I\'ve just been stressed with work."',
          nextSceneId: 'scene-4b',
          feedback:
            "TRAP: Apologizing when you've done nothing wrong. You're giving him credit for investment that doesn't exist.",
        },
        {
          id: 'choice-5a-3',
          text: '"I think we need to slow down even more. This intensity isn\'t healthy."',
          nextSceneId: 'scene-good-ending',
          xpBonus: 15,
          tactic: 'direct_communication',
          feedback:
            'Clear, direct, and unapologetic. You called the pattern and set the boundary. Well done.',
        },
      ],
    },
    {
      id: 'scene-6a',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Jake sputters. \"What I've done? I—I've been here. I've been consistent. I deleted my apps for you.\" \"Deleting apps is not investment. That's a decision you made for yourself.\" \"I text you every morning. I call you every night—\" \"That's attention. Not investment.\" \"What's the difference?\"",
          speakerId: 'jake',
          emotion: 'angry',
        },
        {
          text: "\"Investment costs something. When have you planned something for us? Introduced me to someone important to you? Made a sacrifice?\" He opens his mouth. Closes it. \"What about all the time we've spent together?\" \"It means something. But it's not a down payment on exclusivity.\" He wanted the prize without climbing. Now he's upset the prize has standards.",
          speakerId: 'jake',
          emotion: 'confused',
        },
        {
          speakerId: 'inner',
          text: 'Time and talks. That\'s all he\'s given. And he thinks that buys exclusivity?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6a-1',
          text: '"I\'ve enjoyed our time. But I need to see investment beyond conversation before I commit."',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'investment_requirement',
          feedback:
            "OPTIMAL: You've communicated your standard without apology. The Holy Grail Doctrine: what is freely given is never valued.",
        },
        {
          id: 'choice-6a-2',
          text: '"Maybe I am being too demanding..."',
          nextSceneId: 'scene-neutral-ending',
          feedback:
            "WARNING: He almost got you to lower your standards. Don't confuse having standards with being demanding.",
        },
      ],
    },
    {
      id: 'scene-rescue',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Maya sits you down. \"I need you to hear this. You gave away the whole ladder without making him climb a single rung. Exclusivity. Access. Time. Priority. He got all of it for free. And now he's showing you who he really is: someone who feels entitled to everything without earning it.\"",
          speakerId: 'friend',
          emotion: 'cold',
        },
        {
          speakerId: 'inner',
          text: 'The Investment Ladder exists for a reason. It filters the takers from the builders.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'rescue-1',
          text: '"How do I fix this?"',
          nextSceneId: 'scene-recovery',
          xpBonus: 10,
          feedback:
            "Course correction is possible. It's not too late to implement the ladder—but expect resistance.",
        },
        {
          id: 'rescue-2',
          text: '"He just moves fast. Maybe I\'m the problem."',
          nextSceneId: 'scene-bad-ending',
          feedback:
            "TRAP: He's manipulated you into blaming yourself. Moving fast isn't a love language—it's a control tactic.",
        },
      ],
    },
    {
      id: 'scene-recovery',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You implement the Investment Ladder. Strategically reduce access. Jake does not respond well. \"Why are you changing? I thought we had something real.\" \"Real things are built slowly. I'm not going anywhere—just slowing down.\"",
        },
        {
          text: "He disappears within two weeks. The \"love of his life\" couldn't handle basic boundaries. Maya was right. \"Good riddance. The ladder works both ways—it shows who's willing to build, and who just wanted the view from the top.\"",
          speakerId: 'friend',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },
    {
      id: 'scene-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Three months later. Jake faded after you held your ground. Couldn't handle the ladder. But someone new has appeared. He plans real dates. Introduces you to friends. Respects your time. He's climbing the ladder one rung at a time. And it feels different—earned, not rushed.",
        },
        {
          text: "You feel secure, not anxious. Valued, not demanded. Maya approves. \"See? This is how it's supposed to feel. Steady investment. No love bombing. He's earning access.\" The Investment Ladder works. What's given freely is never valued. What's earned is treasured. Holy Grail Doctrine: You are the prize. Act like it.",
          speakerId: 'friend',
          emotion: 'happy',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Gatekeeper',
      endingSummary:
        "You held your standards and let the ladder do its work. Those who can't climb reveal themselves. Those who can are worth your investment.",
    },
    {
      id: 'scene-neutral-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "Jake is gone. The intensity faded as fast as it arrived. You're rebuilding—friendships you neglected, boundaries you gave away. The lesson cost you, but you learned it.",
        },
        {
          text: "Maya is still there. \"Next time, make them climb. Every rung. No exceptions. No fast passes.\" The Investment Ladder isn't about being cold. It's about being valued.",
          speakerId: 'friend',
          emotion: 'smirking',
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Lesson Learned',
      endingSummary:
        'You gave too much too fast, but you recognized it and corrected. Next time, the ladder stays in place. The Holy Grail is earned, not given.',
    },
    {
      id: 'scene-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. You and Jake are still together—if you can call it that. You've lost most of your friends. Your world has shrunk to just him. He controls everything. Where you go. Who you see. How you spend your time. And somehow, you still feel like you're not doing enough.",
        },
        {
          text: "This is what happens when you skip the Investment Ladder. He got the prize without climbing. Now he expects the whole kingdom. Maya tried to warn you. But you thought love bombing was love. The ladder existed for a reason. It protects you from people who can't build—only take.",
          speakerId: 'inner',
          emotion: 'cold',
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Surrender',
      endingSummary:
        'Without the Investment Ladder, you gave everything to someone who earned nothing. The cage was built with your own compliance. Next time, make them climb.',
    },
  ],
};
