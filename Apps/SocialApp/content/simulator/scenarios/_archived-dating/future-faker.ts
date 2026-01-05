// Scenario: The Future Faker (v2)
// Learn to recognize big promises with zero follow-through

import type { Scenario } from '../types';

// Checkpoint for long scenario
export const CHECKPOINTS = {
  MID_POINT: 'scene-2', // Right before main strategy choice
};

// Intermediate scenarios that must be completed first (need 3+)
const PREREQUISITES = [
  'avoidant-dance',
  'gaslighter-escape',
  'investment-test',
  'rotation-master',
  'family-introduction',
  'beige-escape',
  'the-ghost',
  'empress-move',
];

export const futureFakerScenario: Scenario = {
  id: 'future-faker',
  title: 'The Future Faker',
  tagline: 'Big dreams, empty hands',
  description:
    "They talk about Paris, meeting their family, 'when we move in together.' It all sounds so perfect. But nothing ever actually happens. Learn to measure people by their actions, not their promises.",
  tier: 'premium',
  estimatedMinutes: 18,
  difficulty: 'advanced',
  category: 'dating-tactics',
  xpReward: 200,
  badgeId: 'promise-detector',
  prerequisites: PREREQUISITES,

  templates: {
    faker: ['Drew', 'Jordan', 'Alex', 'Morgan', 'Casey'],
    friend: ['Maya', 'Cate', 'Sarah', 'Lisa', 'Rachel'],
    destination: ['Paris', 'Tokyo', 'Barcelona', 'Bali'],
  },

  tacticsLearned: [
    'Future faking recognition',
    'Action over promises framework',
    'Promise tracking technique',
    'Immediate action tests',
    'Fantasy vs reality distinction',
  ],
  redFlagsTaught: [
    'Repeated promises without follow-through',
    'Escalating commitments too quickly',
    'Using future to avoid present issues',
    'Words substituting for actions',
    'Getting defensive when promises are tracked',
  ],

  characters: [
    {
      id: 'drew',
      name: 'Drew',
      description: 'Intoxicating, romantic, full of plans. Just no execution.',
      traits: ['future-faker', 'romantic-fantasist', 'commitment-phobe'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'maya',
      name: 'Maya',
      description: 'Your grounded friend who tracks the receipts.',
      traits: ['wise', 'direct', 'supportive'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'Your gut.',
      traits: ['intuitive'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    // ========== SETUP ==========
    {
      id: 'scene-1',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Two months with {faker}. It's been a whirlwind. They talk about the future like it's already happened—like you're already there, together. 'I was thinking—we should go to {destination} in the spring. I know this little hotel...' 'And my mom would love you. We should visit her next month.' 'When we get a place together, I want a balcony. For morning coffee.'",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          text: "Your heart swells. This is everything you wanted to hear. But wait. They said {destination} three weeks ago. What happened to that? You start mentally cataloging. The trip they mentioned last month. The friends you were supposed to meet. The concert they'd 'definitely get tickets' for. None of it happened. But somehow, there are always NEW promises to replace the old ones.",
        },
      ],
      nextSceneId: 'scene-2',
    },
    {
      id: 'scene-2',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Babe? You okay? You look distracted.' How do you play this?",
          speakerId: 'drew',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "Words are cheap. Actions are the only currency that matters.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'strategy-action',
          text: '"Demand action now" - Test if they can commit in real-time.',
          nextSceneId: 'action-1',
          isOptimal: true,
          xpBonus: 10,
          tactic: 'action_test',
          feedback: "Call the bluff immediately. Can they back words with action?",
        },
        {
          id: 'strategy-observe',
          text: '"Silently observe" - Start tracking promises vs delivery.',
          nextSceneId: 'observe-1',
          xpBonus: 5,
          tactic: 'promise_tracking',
          feedback: "Data collection. Let the pattern reveal itself completely.",
        },
        {
          id: 'strategy-call',
          text: '"Name the pattern" - Ask directly about unfulfilled promises.',
          nextSceneId: 'call-1',
          xpBonus: 5,
          tactic: 'direct_confrontation',
          feedback: "Direct approach. Risky, but gets clarity fast.",
        },
        {
          id: 'strategy-swept',
          text: '"Get swept up" - This feels real. Let yourself enjoy it.',
          nextSceneId: 'swept-1',
          feedback: "TRAP: You're investing in fantasy, not reality.",
        },
      ],
    },

    // ========== PATH A: DEMAND ACTION NOW ==========
    {
      id: 'action-1',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'I'm great. Actually—{destination} sounds amazing. Let's look at flights right now.' You pull out your phone. Watch their face. 'Oh! Um, right now?' 'I mean, yeah, we should. But shouldn't we plan it properly? Research hotels and stuff?'",
          speakerId: 'drew',
          emotion: 'confused',
        },
        {
          text: "'I love planning. Let's start now. What dates work for you?' 'I'd have to check my calendar. Work is so unpredictable right now.' Deflection. They mentioned it, but committing is different.",
          speakerId: 'drew',
          emotion: 'neutral',
        },
        {
          
          text: "The test. Can they match words with action in the moment?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'action-2a',
          text: '"Let\'s look at your calendar now then. You have your phone."',
          nextSceneId: 'action-3a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'push_through',
          feedback: "OPTIMAL: Don't let them off the hook. Keep the test going.",
        },
        {
          id: 'action-2b',
          text: '"Okay. Let me know when you check and we can book."',
          nextSceneId: 'action-3b',
          xpBonus: 8,
          feedback: "You let them defer. Watch if they ever follow up.",
        },
        {
          id: 'action-2c',
          text: '"Yeah, work is tough. Another time then."',
          nextSceneId: 'swept-cycle',
          feedback: "You accepted the excuse. The pattern continues.",
        },
      ],
    },
    {
      id: 'action-3a',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "{faker} shifts uncomfortably. 'You're being kind of pushy about this.' You asked to act on THEIR idea. And now you're pushy.",
          speakerId: 'drew',
          emotion: 'cold',
        },
        {
          text: "'Can't we just enjoy the idea of it? Why does everything have to be locked down?' The mask slipped. The 'idea' of it. Not the reality.",
          speakerId: 'drew',
          emotion: 'angry',
        },
        {
          
          text: "They want the fantasy, not the booking confirmation.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'action-4a',
          text: '"Because you\'ve brought up trips three times and we\'ve booked zero. I want to actually go."',
          nextSceneId: 'action-truth-path',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'name_pattern',
          feedback: "OPTIMAL: You showed the evidence. No more hiding.",
        },
        {
          id: 'action-4b',
          text: '"Okay, okay. We can plan later. Sorry."',
          nextSceneId: 'action-retreat-path',
          feedback: "You apologized for asking them to act on their own promise.",
        },
      ],
    },
    {
      id: 'action-3b',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A week passes. No calendar check. No mention of {destination}. Instead: 'I was looking at houses today. Just dreaming. Found one that would be perfect for us.' New promise. Same pattern. The trip evaporated; now it's houses.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "Fresh fantasy, forgotten promise. The substitution is automatic.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'action-5a',
          text: '"What happened to {destination}? We were going to check your calendar."',
          nextSceneId: 'action-truth-path',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'track_back',
          feedback: "Good. Hold them to the previous promise before accepting new ones.",
        },
        {
          id: 'action-5b',
          text: '"Show me! Where is it?"',
          nextSceneId: 'swept-cycle',
          feedback: "New shiny promise, old one forgotten. You're in the cycle.",
        },
      ],
    },
    {
      id: 'action-truth-path',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'I... what? We talk about lots of things.' 'Yes. We TALK about lots of things. We do very few of them.' 'That's not fair. Life gets in the way.' Life doesn't get in the way. Priorities do. You're not one of them.",
          speakerId: 'drew',
          emotion: 'sad',
        },
        {
          text: "'I DO want to do all those things. With you. Eventually.' 'Eventually.' The future faker's favorite word.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "'Eventually' is a door that never opens.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'action-6a',
          text: '"Eventually isn\'t a date. Give me a real date or stop making promises."',
          nextSceneId: 'action-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'ultimatum_with_clarity',
          feedback: "OPTIMAL: Clear, direct, no more games. Real dates or nothing.",
        },
        {
          id: 'action-6b',
          text: '"I want to believe you. But I need to see it, not just hear it."',
          nextSceneId: 'action-neutral-ending',
          xpBonus: 10,
          tactic: 'request_change',
          feedback: "You asked for change without demanding it. See if they deliver.",
        },
      ],
    },
    {
      id: 'action-retreat-path',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'I just don't want things to feel transactional, you know? Let's keep it organic.' 'Organic' means nothing ever has to happen. Convenient. The rest of dinner is pleasant. More dreams. More plans. Nothing real.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "'Organic' is code for 'no accountability.'",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'swept-cycle',
    },

    // ========== PATH B: SILENT OBSERVATION ==========
    {
      id: 'observe-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Nothing, just thinking. What were you saying about {destination}?' You decide to track. Quietly. Methodically. Promises made. Promises kept. Let's count. Over the next month, you keep a mental (or actual) list.",
        },
        {
          text: "The data comes in: '{destination} in spring' - mentioned 4 times, never researched. 'Meet my mom' - mentioned 3 times, no date set. 'That art exhibit' - mentioned twice, never went. 'Get you a key to my place' - mentioned once, never happened. The pattern is clear.",
        },
      ],
      nextSceneId: 'observe-2',
    },
    {
      id: 'observe-2',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You share this with {friend}. 'Babe. That's called future faking. It's literally a manipulation tactic.'",
          speakerId: 'maya',
          emotion: 'neutral',
        },
        {
          
          text: "Words are their action. Nothing else follows.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'observe-2a',
          text: '"They might not realize they\'re doing it."',
          nextSceneId: 'observe-3a',
          xpBonus: 5,
          feedback: "Charitable interpretation. Maybe. Let's see.",
        },
        {
          id: 'observe-2b',
          text: '"So what do I do about it?"',
          nextSceneId: 'observe-3b',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'seek_strategy',
          feedback: "You have data. Now you need a plan.",
        },
        {
          id: 'observe-2c',
          text: '"Maybe I\'m being too harsh. They\'re just a dreamer."',
          nextSceneId: 'observe-3c',
          feedback: "You're making excuses for them. The pattern speaks.",
        },
      ],
    },
    {
      id: 'observe-3a',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'Whether they know or not, the result is the same. You're investing in a fantasy. Here's what I want you to do. Next time they make a promise, test it. Immediately.' Immediate action tests. The future faker's kryptonite.",
          speakerId: 'maya',
          emotion: 'neutral',
        },
        {
          
          text: "Make them commit in real-time. See what happens.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'observe-test-path',
    },
    {
      id: 'observe-3b',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'Two options. Test them—push for action when they make a promise. Or cut your losses. The worst thing you can do is stay silent and hope they change.'",
          speakerId: 'maya',
          emotion: 'neutral',
        },
        {
          
          text: "Data-driven decision. Test or exit.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'observe-4a',
          text: '"I\'ll test them. See if they can back it up."',
          nextSceneId: 'observe-test-path',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'choose_test',
          feedback: "Good. Data-driven decision. Let's get the final answer.",
        },
        {
          id: 'observe-4b',
          text: '"Maybe I should just confront them about the list."',
          nextSceneId: 'call-3a',
          xpBonus: 10,
          tactic: 'choose_confrontation',
          feedback: "Direct approach with evidence. That could work too.",
        },
      ],
    },
    {
      id: 'observe-3c',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'A dreamer who never makes anything real isn't a dreamer. They're a talker.' You push back. Maya sighs. 'Fine. Keep watching. But when you have enough data to see the truth, don't ignore it.'",
          speakerId: 'maya',
          emotion: 'concerned',
        },
        {
          
          text: "The data is there. You're just not ready to see it.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'swept-cycle',
    },
    {
      id: 'observe-test-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The next time {faker} makes a promise, you're ready. 'We should do a wine tasting next weekend. There's this vineyard I've been wanting to try.' 'That sounds perfect. Let me look it up right now—what's it called?' 'Oh, I'd have to find it. I saw it on Instagram somewhere.'",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          text: "'Cool, let's search together. What area was it in?' 'I... don't remember exactly. But we should totally find it.' A vineyard they 'wanted to try' that they can't name or locate. Interesting.",
          speakerId: 'drew',
          emotion: 'confused',
        },
        {
          
          text: "Vague promises can't be pinned down. That's the point.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'observe-5a',
          text: '"Okay, let\'s find one that looks good and actually book it. What day?"',
          nextSceneId: 'observe-action-test',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'force_commitment',
          feedback: "OPTIMAL: Pivot to a real plan. Make them commit.",
        },
        {
          id: 'observe-5b',
          text: '"Yeah, look for it and let me know."',
          nextSceneId: 'observe-fail-path',
          feedback: "You gave them an out. Watch if they take it.",
        },
      ],
    },
    {
      id: 'observe-action-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You find a vineyard together. Make a reservation for Saturday. Saturday arrives. Your phone buzzes: 'Hey... I'm so sorry but something came up. Can we raincheck?'",
          speakerId: 'drew',
          emotion: 'sad',
        },
        {
          
          text: "The raincheck. The future faker's emergency exit.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'observe-6a',
          text: '"This is the third thing that\'s \'come up.\' What\'s going on?"',
          nextSceneId: 'observe-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'pattern_confrontation',
          feedback: "OPTIMAL: You called the pattern with evidence. Game over.",
        },
        {
          id: 'observe-6b',
          text: '"Okay. I hope everything\'s alright."',
          nextSceneId: 'observe-neutral-ending',
          xpBonus: 5,
          feedback: "You accepted it. Again. The data is complete now.",
        },
      ],
    },
    {
      id: 'observe-fail-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A week passes. No vineyard search. No follow-up. But there are new promises: 'I want to take you to my favorite beach next month. You'd love it.' New promise to replace the forgotten one. The pattern is complete.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "Fresh fantasy, zero follow-through. Rinse and repeat.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'observe-neutral-ending',
    },

    // ========== PATH C: NAME THE PATTERN ==========
    {
      id: 'call-1',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Actually, can we talk about something?' 'Of course. What's up?' 'You mentioned {destination} a few weeks ago. And meeting your mom. And that art exhibit.' 'Yeah? All things I want to do with you.' 'Right. But... none of them have happened. Or been planned.'",
          speakerId: 'drew',
          emotion: 'happy',
        },
        {
          text: "'...' 'I mean... we're busy. Life happens.' The deflection. 'Life happens' to avoid accountability.",
          speakerId: 'drew',
          emotion: 'confused',
        },
        {
          
          text: "They blamed life, not themselves. Classic redirect.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'call-2a',
          text: '"Life happens to everyone. People who want to do things make them happen."',
          nextSceneId: 'call-3a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'counter_deflection',
          feedback: "OPTIMAL: You didn't accept the excuse. Good.",
        },
        {
          id: 'call-2b',
          text: '"I get that. I just wonder if these things will ever actually happen."',
          nextSceneId: 'call-3b',
          xpBonus: 8,
          feedback: "Softer approach. See how they respond to doubt.",
        },
        {
          id: 'call-2c',
          text: '"Yeah, you\'re right. I\'m probably overthinking it."',
          nextSceneId: 'swept-cycle',
          feedback: "You accepted the deflection. The pattern continues.",
        },
      ],
    },
    {
      id: 'call-3a',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Are you saying I don't want to do things with you?' 'I'm saying I can't tell the difference between wanting and planning.' 'That's really hurtful.' They flipped it. Your observation became an attack on them.",
          speakerId: 'drew',
          emotion: 'sad',
        },
        {
          
          text: "You stated a fact. They made it emotional warfare.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'call-4a',
          text: '"I\'m not trying to hurt you. I\'m trying to understand if words mean anything."',
          nextSceneId: 'call-4-path',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'hold_ground',
          feedback: "You stayed calm and clear. Well done.",
        },
        {
          id: 'call-4b',
          text: '"I\'m sorry if it came out harsh. I just want things to be real."',
          nextSceneId: 'call-soften-path',
          xpBonus: 8,
          feedback: "You softened. They may not change but you kept it peaceful.",
        },
      ],
    },
    {
      id: 'call-3b',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Of course they'll happen! You don't trust me?' Your doubt about actions became a question about trust. Clever redirect. 'I promise—{destination} will happen. I'll prove it.' Another promise. To prove the other promises were real.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "A promise to fix broken promises. Recursive fantasy.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'call-5a',
          text: '"Okay. Let\'s book it right now then."',
          nextSceneId: 'action-3a',
          isOptimal: true,
          xpBonus: 10,
          tactic: 'immediate_test',
          feedback: "Test the promise in real time. Smart.",
        },
        {
          id: 'call-5b',
          text: '"Okay. I\'ll hold you to that."',
          nextSceneId: 'call-neutral-ending',
          xpBonus: 5,
          feedback: "You accepted another promise. See if it lands differently.",
        },
      ],
    },
    {
      id: 'call-4-path',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'They mean something. I just... I get excited about ideas. Sometimes faster than I can execute. But I DO want those things. With you.' A moment of self-awareness. Rare. Is it real?",
          speakerId: 'drew',
          emotion: 'sad',
        },
        {
          
          text: "Acknowledgment without action is still just words. Test it.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'call-6a',
          text: '"Then let\'s make one thing happen. Just one. This month."',
          nextSceneId: 'call-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'one_test',
          feedback: "OPTIMAL: One concrete test. That's all you need.",
        },
        {
          id: 'call-6b',
          text: '"I appreciate you saying that. I hope it\'s true."',
          nextSceneId: 'call-neutral-ending',
          xpBonus: 8,
          feedback: "Hopeful but non-committal. You'll see what happens.",
        },
      ],
    },
    {
      id: 'call-soften-path',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'I want things to be real too. I'm sorry if I've been all talk. Give me a chance to show you. I'll plan something. Really.' The promise to plan. Instead of just... planning.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "They promised to plan. Not planned. Watch the difference.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'call-7a',
          text: '"I want that. Surprise me."',
          nextSceneId: 'call-test-ending',
          xpBonus: 10,
          feedback: "Ball's in their court. Will they actually do anything?",
        },
        {
          id: 'call-7b',
          text: '"Don\'t just promise to plan. Actually plan something. I\'ll wait."',
          nextSceneId: 'call-good-ending',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'clear_expectation',
          feedback: "Clear expectations. They know what's required now.",
        },
      ],
    },

    // ========== PATH D: GET SWEPT UP (TRAP) ==========
    {
      id: 'swept-1',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Nothing, just happy. Tell me more about this {destination} trip.' You lean in. Let the fantasy wash over you. 'Oh my god, okay so—there's this little café right by the Eiffel Tower... And we could stay in Montmartre. Very romantic. Very us.' Your heart soars. It all sounds so perfect.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "Perfect picture. No frame. No canvas. Just... words.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'swept-2',
    },
    {
      id: 'swept-2',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Weeks pass. {destination} never gets mentioned again. But there are new dreams: 'I was looking at apartments today. Just fantasizing about our future. What do you think about a loft? Exposed brick?' You haven't been to {destination}. You haven't met their mom. But now you're talking about apartments.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          
          text: "The future keeps moving forward. The present never catches up.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'swept-2a',
          text: 'Mention that {destination} never happened.',
          nextSceneId: 'swept-3a',
          xpBonus: 10,
          tactic: 'gentle_reminder',
          feedback: "A moment of clarity. See how they respond.",
        },
        {
          id: 'swept-2b',
          text: 'Get excited about the loft. This is progress.',
          nextSceneId: 'swept-3b',
          feedback: "New fantasy, same pattern. You're deeper in now.",
        },
      ],
    },
    {
      id: 'swept-3a',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'I love that idea. But... remember when we were going to {destination}?' 'Oh! Yeah. That's still on the list. Just haven't had time to plan it yet. But this apartment thing—we should start looking. For when we're ready.' Deflection to a bigger promise. {destination} disappeared into 'the list.'",
          speakerId: 'drew',
          emotion: 'neutral',
        },
        {
          
          text: "Bigger fantasy to bury the smaller broken one.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'swept-4a',
          text: '"I think we should do the small things before we talk about big things."',
          nextSceneId: 'swept-wake-path',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'reality_check',
          feedback: "You're trying to ground this. Good instinct.",
        },
        {
          id: 'swept-4b',
          text: '"Yeah, okay. For when we\'re ready. Show me what you found."',
          nextSceneId: 'swept-cycle',
          feedback: "Deeper into the fantasy. The awakening comes later.",
        },
      ],
    },
    {
      id: 'swept-3b',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You spend hours dreaming about exposed brick and morning light. No mention of where you actually are now. What's actually happening. You're planning a future that has no present. That's not building—that's dreaming.",
        },
        {
          
          text: "A castle in the sky with no foundation beneath it.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'swept-cycle',
    },
    {
      id: 'swept-wake-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'What do you mean? Can't we dream?' 'We can dream. But we can also... do. Sometimes.' 'You're being really negative right now. I'm trying to share my vision for us.' A 'vision' that never becomes reality isn't a vision. It's a mirage.",
          speakerId: 'drew',
          emotion: 'sad',
        },
        {
          
          text: "You asked for reality. They called you negative.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'swept-5a',
          text: '"I want actions, not visions. Pick one thing. Let\'s do it this month."',
          nextSceneId: 'swept-good-ending',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'demand_action',
          feedback: "You broke through the fantasy. Let's see if reality follows.",
        },
        {
          id: 'swept-5b',
          text: '"You\'re right, sorry. Let\'s dream."',
          nextSceneId: 'swept-cycle',
          feedback: "You apologized for asking for reality. The fantasy continues.",
        },
      ],
    },
    {
      id: 'swept-cycle',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Months pass. The promises pile up like autumn leaves. {destination}. Mom. The loft. A dog. A road trip. Christmas together. None of it happens. But the talking never stops. You're living in a future that will never come. The present is empty.",
        },
        {
          text: "One day, you realize: you've been in love with a fantasy. The person in front of you is just the narrator.",
        },
      ],
      nextSceneId: 'swept-bad-ending',
    },

    // ========== ENDINGS ==========
    {
      id: 'action-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You drew the line. Real dates or nothing. 'I... okay. March 15th. {destination}. I'll book the flights tonight.' Maybe they will. Maybe they won't. But you've set the standard.",
          speakerId: 'drew',
          emotion: 'confused',
        },
        {
          text: "Watch if they follow through. That's the only answer that matters. Either you get a trip, or you get clarity. Both are wins.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Real Deal Test',
      endingSummary:
        "You demanded action instead of accepting promises. Now you'll see who they really are. Talk is cheap; plane tickets aren't.",
    },
    {
      id: 'action-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "They promised to do better. To make things real. You want to believe them. But you're watching now. Tracking. Trust is rebuilt with action, not words. Give them a timeline.",
        },
        {
          text: "If nothing changes in the next month, you have your answer.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Trust But Verify',
      endingSummary:
        "You expressed your concerns; they heard them. Now comes the real test: will behavior change? Set a mental deadline and hold to it.",
    },
    {
      id: 'observe-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The evidence is undeniable. Three cancellations. Zero follow-through. 'You're keeping score? That's so clinical.' 'I'm keeping track of reality. Which is different from your promises.' They're mad that you noticed. Not that they failed to deliver.",
          speakerId: 'drew',
          emotion: 'angry',
        },
        {
          text: "You have clarity now. What you do with it is up to you.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Data Speaks',
      endingSummary:
        "You tracked promises against reality and let the data reveal the truth. Now you can make an informed decision about staying or leaving.",
    },
    {
      id: 'observe-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The pattern is clear. You've seen enough. But knowing isn't the same as acting. You're still here. The data is in. The question is what you'll do with it.",
        },
        {
          text: "At some point, accepting broken promises becomes enabling them.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Eyes Open',
      endingSummary:
        "You see the pattern clearly now. The question is whether seeing is enough, or if you'll demand change. Knowledge without action is just suffering with awareness.",
    },
    {
      id: 'call-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You set a clear expectation. One thing. This month. Actual planning, not promises. 'Okay. One thing. I'll prove it.' You wait. Not hopefully—watchfully.",
          speakerId: 'drew',
          emotion: 'neutral',
        },
        {
          text: "This is the test. Either something happens, or you have your answer. You're done with dreams. Now you need receipts.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Prove It',
      endingSummary:
        "You named the pattern and demanded one concrete action. If they deliver, maybe there's hope. If not, you've learned everything you need to know.",
    },
    {
      id: 'call-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "They understood your concern. Said they'd do better. Promises to fix the promise problem. Ironic.",
        },
        {
          text: "Change happens in behavior, not words. Watch. Wait. Decide.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Promise of Change',
      endingSummary:
        "They promised to stop making empty promises. We'll see. Set a deadline in your mind and hold them to it.",
    },
    {
      id: 'call-test-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You put the ball in their court. They said they'd surprise you. A week passes. Then two. 'I'm still planning that surprise! It's going to be great.' Still planning. Always planning. Never doing.",
          speakerId: 'drew',
          emotion: 'seductive',
        },
        {
          text: "Some surprises never come. But now you know.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Still Waiting',
      endingSummary:
        "The surprise is taking a while. And by 'a while' we mean 'probably forever.' You have data. Use it.",
    },
    {
      id: 'swept-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You broke through the fog. Demanded reality. 'One thing. Okay. What do you want to do?' 'YOU pick. And YOU make it happen. That's the test.' You shifted from fantasy to reality. Whatever happens now is truth.",
          speakerId: 'drew',
          emotion: 'confused',
        },
        {
          text: "Either they step up or they fade. Both answers serve you.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Reality Check',
      endingSummary:
        "You woke up from the dream and demanded something real. The fantasy might be over, but at least you'll know what's actually possible.",
    },
    {
      id: 'swept-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You're still together. On paper. In reality, you're in love with a future that doesn't exist. They sell dreams. You keep buying. The price is your time.",
        },
        {
          text: "One day you'll add it up. All the trips never taken. The promises never kept. The time lost to someone who was never going to show up. Words are free. Your life isn't.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Beautiful Lie',
      endingSummary:
        "You invested in a fantasy and paid with real time. The future faker got exactly what they wanted: your hope, without any effort. Learn this lesson: actions are the only currency that matters.",
    },
  ],
};
