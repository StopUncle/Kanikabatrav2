// Scenario: The Investment Test (Male Version - Expanded)
// Make her earn your commitment
// Adapted for male psychology - targeting provider instincts and sexual validation
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../../types';

export const maleInvestmentTestScenario: Scenario = {
  id: 'male-investment-test',
  title: 'The Investment Test',
  tagline: 'What is freely given is never valued.',
  description:
    "She's beautiful, charming, and moving fast—talking commitment, meeting family, future plans. But what has she actually invested? Before you become her provider, make sure she's earned the position.",
  tier: 'free',
  estimatedMinutes: 14,
  difficulty: 'beginner',
  category: 'healthy',
  xpReward: 100,
  badgeId: 'gatekeeper',
  targetGender: 'male',

  templates: {
    manipulator: ['Mia', 'Sophia', 'Olivia', 'Isabella', 'Ava'],
    friend: ['Mike', 'Jake', 'Connor', 'Tyler', 'Brandon'],
  },

  tacticsLearned: [
    'Investment recognition',
    'Words vs actions framework',
    'Provider trap avoidance',
    'Requiring reciprocity',
    'The Obligation Trap',
  ],
  redFlagsTaught: [
    'Future faking (marriage talk on date 3)',
    'Taking without giving',
    'Using sex as currency',
    'Manufactured urgency',
    'Financial expectation creep',
  ],

  characters: [
    {
      id: 'mia',
      name: 'Mia',
      description:
        "Beautiful and attentive. But she's pushing for commitment while you pay for everything. Watch what she does, not says.",
      traits: ['charming', 'expectant', 'fast-moving'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'friend',
      name: 'Mike',
      description: 'Your best friend. Sees through the smoke. No-filter advice.',
      traits: ['protective', 'wise', 'blunt'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'The part of you that sees clearly.',
      traits: ['strategic', 'aware'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    // ============================================
    // SCENE 1: THE OPENING
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Third date with {manipulator}. You picked a nice restaurant. You're paying, obviously. The bill arrives. She doesn't even glance at it.",
        },
        {
          text: "\"I have to tell you something... I've never felt this way so quickly. I deleted my apps. I want us to be exclusive.\"",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: 'Third date. Exclusive already. What has she actually done to earn it?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: '"Yeah, let\'s be exclusive!"',
          nextSceneId: 'scene-2-hooked',
          feedback: "TRAP: Exclusivity on date three? She hasn't invested anything.",
        },
        {
          id: 'choice-1b',
          text: '"That\'s sweet. I\'m really enjoying getting to know you too."',
          nextSceneId: 'scene-2-soft',
          xpBonus: 8,
          feedback: 'Non-committal but warm. You acknowledged without agreeing.',
        },
        {
          id: 'choice-1c',
          text: '"I like where this is going, but I want to take things slow."',
          nextSceneId: 'scene-2-boundary',
          isOptimal: true,
          xpBonus: 18,
          tactic: 'pacing',
          feedback: "OPTIMAL: You're not rejecting her—you're requiring investment.",
        },
        {
          id: 'choice-1d',
          text: '"That\'s really fast. What\'s the rush?"',
          nextSceneId: 'scene-2-direct',
          xpBonus: 12,
          feedback: 'Direct. Calls out the pace. Now watch her reaction.',
        },
      ],
    },

    // ============================================
    // SCENE 2: RESPONSES TO OPENING
    // ============================================
    {
      id: 'scene-2-hooked',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{manipulator} beams. The next morning: \"Good morning, boyfriend! 💕\" A week later, things escalate. She wants to meet your family. Mentions moving in 'eventually.'",
        },
        {
          text: "You gave her girlfriend status. Now she expects the whole package. She's upset when you can't see her every night. \"I thought we were together? Why are you so busy?\"",
          speakerId: 'mia',
          emotion: 'angry',
        },
        {
          speakerId: 'inner-voice',
          text: 'Title without investment. Now she feels entitled to your time, money, everything.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-2h-1',
          text: '"You\'re right, I\'ll make more time for you."',
          nextSceneId: 'scene-3-provider',
          feedback: 'TRAP: You just rewarded the entitlement. It will only grow.',
        },
        {
          id: 'choice-2h-2',
          text: '"I have my own life. We\'re dating, not married."',
          nextSceneId: 'scene-3-pushback',
          xpBonus: 12,
          feedback: 'Late boundary. She already has the title. But it\'s something.',
        },
        {
          id: 'choice-2h-3',
          text: 'Text {friend}: "I think I moved too fast. What do I do?"',
          nextSceneId: 'scene-rescue',
          xpBonus: 8,
          feedback: 'Recognizing the problem. Your support system can help.',
        },
      ],
    },
    {
      id: 'scene-2-soft',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "She leans closer. \"So... that's a yes, right? To being exclusive?\" She's pushing through your non-answer.",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          text: "\"I just feel like we have something special. I don't want to lose you to some other girl.\"",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "She's manufacturing scarcity. 'Other girls' aren't the issue. Her investment is.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2s-1',
          text: '"There are no other girls. Fine, let\'s be exclusive."',
          nextSceneId: 'scene-2-hooked',
          feedback: 'TRAP: She pressured, you folded. The pattern is set.',
        },
        {
          id: 'choice-2s-2',
          text: '"I\'m not going anywhere. But I need more time."',
          nextSceneId: 'scene-3-testing',
          xpBonus: 12,
          feedback: 'Reassurance without commitment. Reasonable.',
        },
        {
          id: 'choice-2s-3',
          text: '"I don\'t respond to pressure. Slow down."',
          nextSceneId: 'scene-2-boundary',
          xpBonus: 15,
          isOptimal: true,
          feedback: 'OPTIMAL: Called out the pressure tactic directly.',
          tactic: 'frame_control',
        },
      ],
    },
    {
      id: 'scene-2-boundary',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "{manipulator}'s smile flickers. Irritation, then gone. \"Take things slow? But I thought we had something special...\"",
          speakerId: 'mia',
          emotion: 'cold',
        },
        {
          text: "\"We might. That's what I want to find out.\" Her eyes narrow slightly. \"Is there someone else?\"",
          speakerId: 'mia',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "From 'we're special' to jealousy accusation in seconds. Classic deflection.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2b-1',
          text: '"This isn\'t about anyone else. I just need to see more investment."',
          nextSceneId: 'scene-3-testing',
          isOptimal: true,
          xpBonus: 18,
          tactic: 'frame_control',
          feedback: "OPTIMAL: You held frame. She's testing. Don't explain yourself.",
        },
        {
          id: 'choice-2b-2',
          text: '"No! I just want to make sure we\'re compatible first."',
          nextSceneId: 'scene-3-testing',
          xpBonus: 8,
          feedback: 'Defensive. You explained yourself. But at least you held.',
        },
        {
          id: 'choice-2b-3',
          text: '"Maybe you\'re right, I\'m overthinking it."',
          nextSceneId: 'scene-2-hooked',
          feedback: 'TRAP: She got in your head. Your instincts were right.',
        },
      ],
    },
    {
      id: 'scene-2-direct',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "{manipulator} looks wounded. \"The rush? I just... when you know, you know. I've been hurt before. I don't want to waste time with the wrong person.\"",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "\"I appreciate your feelings. But commitment is earned, not assumed.\"",
        },
        {
          text: "\"What do I need to do to prove I'm serious?\"",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: 'Good question. Now make her actually answer it with actions.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2d-1',
          text: '"Show up consistently. Plan things. Invest time and energy."',
          nextSceneId: 'scene-3-testing',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'clear_standard',
          feedback: 'OPTIMAL: You stated clear expectations. Now watch.',
        },
        {
          id: 'choice-2d-2',
          text: '"Just keep being yourself."',
          nextSceneId: 'scene-3-provider',
          feedback: 'Vague. No actual standard set. She can interpret this however she wants.',
        },
      ],
    },

    // ============================================
    // SCENE 3: THE INVESTMENT TEST
    // ============================================
    {
      id: 'scene-3-provider',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Two weeks pass. She always suggests expensive restaurants. You pay every time. She never offers. \"You're such a gentleman. I love that about you.\"",
        },
        {
          text: "Your credit card statement this month: $800 on dates. Her contribution: zero. But she talks about 'the future' constantly.",
        },
        {
          speakerId: 'inner-voice',
          text: "Words about the future. Zero investment in the present.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-3p-1',
          text: '"Hey, how about you plan the next date?"',
          nextSceneId: 'scene-4-test',
          xpBonus: 12,
          feedback: 'Finally testing her investment. Late, but something.',
        },
        {
          id: 'choice-3p-2',
          text: 'Keep paying. She\'s worth it. Right?',
          nextSceneId: 'scene-bad-provider',
          feedback: 'TRAP: You\'re not dating. You\'re funding.',
        },
      ],
    },
    {
      id: 'scene-3-pushback',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Your own life?\" She looks hurt. \"I thought I was part of your life now. I guess I know where I stand.\" The guilt trip.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "Your phone buzzes. {friend}: \"Don't fall for it. She's testing if guilt controls you.\"",
        },
        {
          speakerId: 'inner-voice',
          text: "Having your own life isn't abandonment. It's healthy.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-3pb-1',
          text: '"I\'m sorry, I didn\'t mean to hurt you."',
          nextSceneId: 'scene-3-provider',
          feedback: 'TRAP: You apologized for having boundaries. The pattern is set.',
        },
        {
          id: 'choice-3pb-2',
          text: '"Having my own life doesn\'t mean you\'re not important."',
          nextSceneId: 'scene-4-test',
          xpBonus: 12,
          feedback: 'Reasonable. You held while offering reassurance.',
        },
        {
          id: 'choice-3pb-3',
          text: '"This reaction tells me a lot. We should talk."',
          nextSceneId: 'scene-confrontation',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: You named the issue. Her guilt trip is data.',
          tactic: 'pattern_recognition',
        },
      ],
    },
    {
      id: 'scene-3-testing',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Two weeks pass. She always suggests restaurants you pay for. Never offers to cook or plan anything. Talks about your future constantly but hasn't introduced you to a single friend.",
        },
        {
          text: "Today she texts: \"My birthday is coming up! There's this amazing restaurant I've been dying to try...\"",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "All words. No action. She's hinting at expensive dinner. On you, obviously.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-3t-1',
          text: '"I\'d love to plan something. What if you plan the next few dates and I\'ll handle your birthday?"',
          nextSceneId: 'scene-4-test',
          isOptimal: true,
          xpBonus: 18,
          tactic: 'reciprocity_test',
          feedback: 'OPTIMAL: You just tested her investment. Her reaction tells everything.',
        },
        {
          id: 'choice-3t-2',
          text: '"Sure, send me the link. I\'ll make a reservation."',
          nextSceneId: 'scene-bad-birthday',
          feedback: "Provider autopilot engaged. You're rewarding zero reciprocity.",
        },
        {
          id: 'choice-3t-3',
          text: '"How about you plan something fun for us first? I want to see your creative side."',
          nextSceneId: 'scene-4-test',
          xpBonus: 12,
          feedback: 'Smooth. You flipped the expectation without being confrontational.',
        },
        {
          id: 'choice-3t-4',
          text: '"I noticed I\'ve paid for everything so far. That needs to change."',
          nextSceneId: 'scene-4-direct',
          xpBonus: 15,
          feedback: 'Direct. Clear. She can\'t misinterpret this.',
        },
      ],
    },

    // ============================================
    // SCENE 4: HER RESPONSE TO TESTING
    // ============================================
    {
      id: 'scene-4-test',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Her response is slow. \"I'm not really good at planning things... I thought you liked taking charge?\"",
          speakerId: 'mia',
          emotion: 'confused',
        },
        {
          text: "An hour later: \"Are you mad at me? :(\" She felt you pull back. Now she's worried.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "Translation: I've never had to invest. Don't make me start now.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-4t-1',
          text: '"Not mad. Just looking for someone who puts in effort too."',
          nextSceneId: 'scene-5-boundary',
          isOptimal: true,
          xpBonus: 18,
          tactic: 'clear_standard',
          feedback: 'OPTIMAL: You stated your standard. Now watch if she rises or reveals.',
        },
        {
          id: 'choice-4t-2',
          text: '"No, of course not! I\'ll plan something great for your birthday."',
          nextSceneId: 'scene-bad-birthday',
          feedback: 'You folded. She learned that pouting resets expectations.',
        },
        {
          id: 'choice-4t-3',
          text: '"Taking charge doesn\'t mean doing everything alone."',
          nextSceneId: 'scene-5-boundary',
          xpBonus: 12,
          feedback: 'Good reframe. Leadership isn\'t synonymous with funding.',
        },
      ],
    },
    {
      id: 'scene-4-direct',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "\"Paid for everything?\" She seems surprised. \"I thought you liked doing that. You never said anything.\"",
          speakerId: 'mia',
          emotion: 'confused',
        },
        {
          text: "\"I offered once and you said 'no, I got it.' I thought you were being chivalrous.\"",
          speakerId: 'mia',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Once. She offered once. And accepted your refusal immediately.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-4d-1',
          text: '"Fair. Going forward, let\'s split things or take turns."',
          nextSceneId: 'scene-5-test',
          xpBonus: 15,
          isOptimal: true,
          feedback: 'OPTIMAL: You set a new standard clearly.',
          tactic: 'boundary_reset',
        },
        {
          id: 'choice-4d-2',
          text: '"You\'re right, I should have spoken up earlier."',
          nextSceneId: 'scene-5-test',
          xpBonus: 8,
          feedback: 'You took too much responsibility. But at least you\'re changing it.',
        },
        {
          id: 'choice-4d-3',
          text: '"One offer isn\'t investment. It\'s a token gesture."',
          nextSceneId: 'scene-confrontation',
          xpBonus: 12,
          feedback: 'Calling it out directly. Might feel harsh, but accurate.',
        },
      ],
    },
    {
      id: 'scene-confrontation',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You meet at a coffee shop. You pay attention—she doesn't reach for her wallet. \"So what did you want to talk about?\"",
          speakerId: 'mia',
          emotion: 'neutral',
        },
        {
          text: "\"I've noticed a pattern. I pay for everything. You talk about the future. But there's no actual investment from your side.\"",
        },
        {
          text: "Her face hardens. \"So this is about money? I thought you were different.\"",
          speakerId: 'mia',
          emotion: 'angry',
        },
        {
          speakerId: 'inner-voice',
          text: "She flipped it to make you the bad guy. Classic DARVO.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-conf-1',
          text: '"It\'s about reciprocity. Money is just one part of it."',
          nextSceneId: 'scene-5-boundary',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: You didn\'t let her flip the script.',
          tactic: 'darvo_resistance',
        },
        {
          id: 'choice-conf-2',
          text: '"You\'re right, forget I said anything."',
          nextSceneId: 'scene-bad-apologized',
          feedback: 'TRAP: She shamed you into silence. The pattern continues.',
        },
        {
          id: 'choice-conf-3',
          text: '"If me expecting effort makes me \'not different,\' maybe I\'m not."',
          nextSceneId: 'scene-good-exit',
          xpBonus: 15,
          feedback: 'Bold. You\'re not chasing her approval.',
        },
      ],
    },

    // ============================================
    // SCENE 5: THE REAL TEST
    // ============================================
    {
      id: 'scene-5-boundary',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The next day she texts: \"Fine. Movie night at my place Saturday? I'll cook.\" \"Cook\" turns out to be frozen pizza and boxed wine. But she did something. First time.",
        },
        {
          text: "A few days later, you mention a work event. \"Ooh! I need a new dress. There's this boutique...\"",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Baby steps. Or bare minimum? She's already expecting you to fund her outfit.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-5b-1',
          text: '"Wear something you already have. It\'s not a fashion show."',
          nextSceneId: 'scene-6-final',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'boundary',
          feedback: "OPTIMAL: You're not her ATM. She can dress herself.",
        },
        {
          id: 'choice-5b-2',
          text: '"How much are we talking?"',
          nextSceneId: 'scene-bad-dress',
          feedback: 'You opened the wallet. The expectation will only grow.',
        },
        {
          id: 'choice-5b-3',
          text: '"Actually, I think I\'ll go solo to this one."',
          nextSceneId: 'scene-6-solo',
          xpBonus: 15,
          tactic: 'independence',
          feedback: "Strong. You're not obligated to bring her everywhere.",
        },
        {
          id: 'choice-5b-4',
          text: '"You made frozen pizza. I\'m not buying you a dress."',
          nextSceneId: 'scene-6-final',
          xpBonus: 12,
          feedback: 'Blunt but fair. Minimal effort doesn\'t unlock maximum rewards.',
        },
      ],
    },
    {
      id: 'scene-5-test',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Next date. She suggests a cheaper place. Orders modestly. When the bill comes, she actually reaches for it. \"I got this one.\"",
        },
        {
          text: "It's a $40 bill. You've spent over $600 on her. But it's something.",
        },
        {
          speakerId: 'inner-voice',
          text: "Token or turning point? Only time will tell.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-5test-1',
          text: '"Thanks. I appreciate that."',
          nextSceneId: 'scene-6-continue',
          xpBonus: 12,
          feedback: 'Acknowledge the effort. See if it continues.',
        },
        {
          id: 'choice-5test-2',
          text: '"Finally. Took long enough."',
          nextSceneId: 'scene-6-awkward',
          feedback: 'Harsh. You\'re right, but timing matters.',
        },
        {
          id: 'choice-5test-3',
          text: 'Accept gracefully but keep watching.',
          nextSceneId: 'scene-6-continue',
          xpBonus: 15,
          isOptimal: true,
          feedback: 'OPTIMAL: One act doesn\'t change a pattern. Watch for consistency.',
          tactic: 'pattern_tracking',
        },
      ],
    },

    // ============================================
    // SCENE 6: RESOLUTION
    // ============================================
    {
      id: 'scene-6-final',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "{manipulator}'s face hardens. \"Most guys would want their girlfriend to look good...\" \"Girlfriend?\" You haven't made it official.",
          speakerId: 'mia',
          emotion: 'cold',
        },
        {
          text: "\"I thought we were... I mean, we've been exclusive, right?\" \"We're getting to know each other. Labels come with proof.\"",
        },
        {
          text: "She goes quiet. Then: \"I've never had to prove myself before.\" \"Maybe that's the problem.\"",
        },
        {
          text: "She assumed the title without earning it. Reality check delivered.",
        },
      ],
      nextSceneId: 'scene-good-ending',
    },
    {
      id: 'scene-6-solo',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Solo?\" She stares at you. \"You're going to a work event without me?\" \"It's a networking thing. I'll introduce you to my world when there's more stability here.\"",
          speakerId: 'mia',
          emotion: 'angry',
        },
        {
          text: "\"When there's more stability? What does that even mean?\"",
          speakerId: 'mia',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "She wants access without earning it. Your professional life is yours to share selectively.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6s-1',
          text: '"It means I need to see more investment before I integrate you further."',
          nextSceneId: 'scene-good-ending',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Clear. Direct. No ambiguity.',
          tactic: 'clear_boundary',
        },
        {
          id: 'choice-6s-2',
          text: '"Fine, you can come. But you\'re wearing something you already own."',
          nextSceneId: 'scene-neutral-ending',
          xpBonus: 8,
          feedback: 'Compromise. You caved on attendance but held on spending.',
        },
      ],
    },
    {
      id: 'scene-6-continue',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Weeks pass. She's making more effort. Not 50-50, but better. She planned a date (a park picnic with store-bought food). She bought you a small gift for no reason.",
        },
        {
          text: "{friend} notices. \"She's trying. Credit where due.\"",
          speakerId: 'friend',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Behavior change in response to standards. This is what growth looks like.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6c-1',
          text: 'Acknowledge the change. Give the relationship a real chance.',
          nextSceneId: 'scene-good-growth',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: She responded to standards. That\'s the point.',
          tactic: 'positive_reinforcement',
        },
        {
          id: 'choice-6c-2',
          text: '"It shouldn\'t have taken this long. I\'m out."',
          nextSceneId: 'scene-neutral-exit',
          xpBonus: 8,
          feedback: 'Your call. The damage might be too deep to reverse.',
        },
      ],
    },
    {
      id: 'scene-6-awkward',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "She looks hurt. \"I was trying. I thought you'd be happy.\" She puts down the check. \"You know what? You pay. I don't care anymore.\"",
          speakerId: 'mia',
          emotion: 'angry',
        },
        {
          text: "She leaves. You pay the bill. Again.",
        },
        {
          text: "She tried once. You punished her for it. Timing matters.",
        },
      ],
      nextSceneId: 'scene-neutral-exit',
    },
    {
      id: 'scene-rescue',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{friend} sits you down. \"I need you to hear this. You've given her everything and she's given you nothing. Money. Time. Access. Commitment. All free.\"",
          speakerId: 'friend',
          emotion: 'cold',
        },
        {
          text: "\"And now she feels entitled to everything without earning it. That's not a relationship. That's a transaction where you're the only one paying.\"",
          speakerId: 'friend',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: 'The Investment Test exists for a reason. It shows who builds and who just takes.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'rescue-1',
          text: '"How do I fix this?"',
          nextSceneId: 'scene-recovery',
          xpBonus: 10,
          feedback: 'Course correction possible. Expect resistance when you change the rules.',
        },
        {
          id: 'rescue-2',
          text: '"She\'s just traditional. I don\'t mind providing."',
          nextSceneId: 'scene-bad-provider',
          feedback: "TRAP: 'Traditional' means she invests other ways. She hasn't. This is just taking.",
        },
        {
          id: 'rescue-3',
          text: '"I\'m done. No point trying to change the dynamic now."',
          nextSceneId: 'scene-neutral-exit',
          xpBonus: 12,
          feedback: 'Sometimes a clean break is better than a slow fix.',
        },
      ],
    },
    {
      id: 'scene-recovery',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You implement standards. Stop funding everything. Require reciprocity. {manipulator} does not respond well.",
        },
        {
          text: "\"You've changed. What happened to the guy who treated me like a queen?\" \"Queens earn their crowns. They don't just receive them.\"",
          speakerId: 'mia',
          emotion: 'angry',
        },
        {
          text: "She disappears within two weeks. Found another provider. {friend}: \"Better to know now than after a ring.\"",
          speakerId: 'friend',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },

    // ============================================
    // BAD ENDINGS
    // ============================================
    {
      id: 'scene-bad-provider',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. You've paid for everything. Rent. Car repairs. \"Loans\" that never get repaid. She controls how you spend money while contributing nothing.",
        },
        {
          text: "And somehow, you still feel like you're not doing enough. Now she's talking about engagement rings. Expensive ones. Her Pinterest board is full of them.",
        },
        {
          text: "{friend} stopped reaching out. Said watching you get used was too painful. You're alone with your provider role.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Provider Trap',
      endingSummary:
        'Without the Investment Test, you gave everything to someone who earned nothing. The cage was built with your own compliance.',
      endingLearnReference: 'investment-balance-101',
      endingLearnPrompt: 'Learn to recognize the provider trap.',
    },
    {
      id: 'scene-bad-birthday',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You take her to the expensive restaurant. $400 dinner. Her birthday gift cost $300. Jewelry, like she hinted.",
        },
        {
          text: "A month later, YOUR birthday. Her gift: a card. \"I'm not good at gifts. I thought my presence was enough?\"",
          speakerId: 'mia',
          emotion: 'happy',
        },
        {
          text: "You spent $700. She spent $5. But she's already planning next year's birthday. At an even nicer place.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Expectation Escalator',
      endingSummary:
        "Every gift raised the bar. Every expense became the new baseline. You're not a boyfriend. You're an ATM with feelings.",
      endingLearnReference: 'financial-boundaries-101',
      endingLearnPrompt: 'Learn about financial boundary setting.',
    },
    {
      id: 'scene-bad-dress',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Just $400.\" You buy the dress. She looks amazing at your event. Coworkers are impressed.",
        },
        {
          text: "But now it's a pattern. Every event needs a new outfit. Your closet barely grows. Hers explodes. And she's noticed your hesitation.",
        },
        {
          text: "\"What happened to the guy who wanted me to look good? Are you not attracted to me anymore?\" Guilt. Weaponized.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "You see her ex on Instagram. New girlfriend. They look happy. And she doesn't have a $400 dress budget.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Kept Woman',
      endingSummary:
        "You funded a lifestyle she didn't earn. When you tried to stop, you became the bad guy. Her next provider won't hesitate like you did.",
      endingLearnReference: 'boundaries-101',
      endingLearnPrompt: 'Learn why early boundaries matter.',
    },
    {
      id: 'scene-bad-apologized',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You dropped the topic. She won. You keep paying. She keeps expecting. And now she's more careful—makes sure to seem grateful.",
        },
        {
          text: "But nothing changes. The words are there. The actions aren't. And you've learned to stop asking.",
        },
        {
          text: "A year later, she leaves. \"I found someone who appreciates me.\" He's older. Richer. More willing to fund the lifestyle. She upgraded providers.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Silent Compliance',
      endingSummary:
        "You raised the issue once, got shamed, and never mentioned it again. She learned your standards were negotiable. Then she traded up.",
      endingLearnReference: 'self-respect-101',
      endingLearnPrompt: 'Learn why holding standards matters.',
    },

    // ============================================
    // NEUTRAL ENDINGS
    // ============================================
    {
      id: 'scene-neutral-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "{manipulator} is gone. The intensity faded fast. You're rebuilding—finances, self-respect, standards. The lesson cost you, but you learned it.",
        },
        {
          text: "{friend} is still there. \"Next time, require proof. Anyone can say the right things. Watch what they do.\"",
          speakerId: 'friend',
          emotion: 'smirking',
        },
        {
          text: "The Investment Test isn't about being cheap. It's about being valued.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Lesson Learned',
      endingSummary:
        'You gave too much too fast, but you recognized it. Next time, investment is required upfront.',
      endingLearnReference: 'reciprocity-101',
      endingLearnPrompt: 'Learn about healthy reciprocity.',
    },
    {
      id: 'scene-neutral-exit',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "It's over. Not dramatically—just done. She's already on the apps, looking for the next provider. You see her profile: \"Looking for a gentleman who knows how to treat a lady.\"",
        },
        {
          text: "Translation: Looking for someone to fund me without questions. At least it won't be you.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Clean Break',
      endingSummary:
        "You ended it before the damage got worse. The money is gone, but the lesson is learned.",
      endingLearnReference: 'early-exit-101',
      endingLearnPrompt: 'Learn about recognizing exit points.',
    },

    // ============================================
    // GOOD ENDINGS
    // ============================================
    {
      id: 'scene-good-ending',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Three months later. {manipulator} faded when you held your ground. Couldn't handle the standards. Someone new now.",
        },
        {
          text: "She plans dates. Splits checks. Actually invests. She's building with you, not extracting from you. You feel valued, not used.",
        },
        {
          text: "{friend} approves. \"See? This is how it should feel. Mutual investment. Not a one-way ATM.\"",
          speakerId: 'friend',
          emotion: 'happy',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Gatekeeper',
      endingSummary:
        "You held your standards. Those who can't invest reveal themselves. Those who can are worth your commitment.",
    },
    {
      id: 'scene-good-exit',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You walked away. She was shocked—probably never happened before. \"You're really leaving over this?\" \"I'm leaving because you expected everything and offered nothing.\"",
        },
        {
          text: "{friend} meets you for a beer. \"That took guts. Most guys would've stayed and kept paying.\" \"I'm not most guys.\"",
          speakerId: 'friend',
          emotion: 'happy',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Walk Away',
      endingSummary:
        "You recognized the pattern and exited before you were trapped. Your standards aren't negotiable.",
    },
    {
      id: 'scene-good-growth',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Six months later. She's still growing. Not perfect—she still forgets to plan sometimes. But she catches herself. Apologizes. Tries again.",
        },
        {
          text: "\"I never had to try before,\" she admits. \"Every guy just gave me whatever I wanted. I didn't know what real effort looked like.\"",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "\"Now you do.\" She smiles. \"Now I do.\" The Investment Test didn't just screen her. It grew her. And you.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Growth Story',
      endingSummary:
        'She rose to your standards instead of running from them. Real investment, real growth, real partnership.',
    },
  ],
};
