// Scenario: The Breadcrumber
// Learn to recognize intermittent reinforcement and minimal effort dating tactics
// v2: Paragraphs (2 taps per scene), inner voice ONLY at choice points

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

export const breadcrumberScenario: Scenario = {
  id: 'breadcrumber',
  title: 'The Breadcrumber',
  tagline: 'Just enough to keep you starving',
  description:
    "They text just enough to keep you interested. Never makes real plans. Always 'busy' but somehow reaches out at 11pm. Learn to recognize when someone is keeping you on the hook with minimal effort.",
  tier: 'premium',
  estimatedMinutes: 15,
  difficulty: 'advanced',
  category: 'dating-tactics',
  xpReward: 150,
  badgeId: 'breadcrumb-detector',
  prerequisites: PREREQUISITES,

  templates: {
    breadcrumber: ['Riley', 'Jordan', 'Alex', 'Morgan', 'Taylor'],
    friend: ['Maya', 'Cate', 'Sarah', 'Lisa', 'Rachel'],
    otherMatch: ['Chris', 'Sam', 'Jamie', 'Drew'],
  },

  tacticsLearned: [
    'Intermittent reinforcement recognition',
    'Energy matching strategy',
    'Low effort vs high investment detection',
    'Strategic silence deployment',
    'Value demonstration through scarcity',
  ],
  redFlagsTaught: [
    'Late night only contact',
    'Vague plans that never solidify',
    'Hot and cold texting patterns',
    'Excuses that prevent real dates',
    'Just enough attention to keep hope alive',
  ],

  characters: [
    {
      id: 'riley',
      name: 'Riley',
      description: 'Charming. Flirty. Always "so busy" but never quite gone.',
      traits: ['breadcrumber', 'hot-cold', 'excuse-maker'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'maya',
      name: 'Maya',
      description: 'Your best friend who is tired of watching this pattern.',
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
      backgroundId: 'apartment',
      dialog: [
        { text: "Two months ago, you matched with {breadcrumber}. The chemistry was instant. Those first few days were intoxicating—constant texts, flirty banter. They seemed SO into you." },
        { text: "Then the pattern started. Now they text every few days. Always late at night. Never with real plans. Tonight is no different: 11:47pm on a Tuesday. Your phone lights up: 'Hey you. Been thinking about you 😏'" },
      ],
      nextSceneId: 'scene-2',
    },
    {
      id: 'scene-2',
      backgroundId: 'apartment',
      dialog: [
        { text: "Part of you wants to respond immediately. Another part remembers—they haven't asked you on a real date in three weeks. Your thumb hovers over the keyboard." },
        { speakerId: 'inner-voice', text: "They give you crumbs. You give them a full meal. Something's off balance.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'strategy-match',
          text: '"Match their energy" - Reply with the same effort they give you.',
          nextSceneId: 'match-1',
          xpBonus: 5,
          tactic: 'energy_matching',
          feedback: "Mirror their investment level. They take days? You take days.",
        },
        {
          id: 'strategy-silent',
          text: '"Go silent" - Don\'t respond. See what happens.',
          nextSceneId: 'silent-1',
          isOptimal: true,
          xpBonus: 10,
          tactic: 'strategic_silence',
          feedback: "The strongest message is sometimes no message at all.",
        },
        {
          id: 'strategy-direct',
          text: '"Force the issue" - Ask directly what you are to them.',
          nextSceneId: 'direct-1',
          xpBonus: 5,
          tactic: 'direct_communication',
          feedback: "Clarity has value. But timing matters. Let's see how this lands.",
        },
        {
          id: 'strategy-effort',
          text: '"Show extra interest" - Maybe they just need to see you\'re into them.',
          nextSceneId: 'effort-1',
          feedback: 'TRAP: You\'re about to reward low effort with high investment.',
        },
      ],
    },

    // ========== PATH A: MATCH THEIR ENERGY ==========
    {
      id: 'match-1',
      backgroundId: 'apartment',
      dialog: [
        { text: "You wait. Not desperately, but deliberately. They texted at 11:47pm—you'll reply tomorrow afternoon. At 4pm, you text back: 'Hey! Yeah, been busy lately. What's up?'" },
        { text: "Short. Light. No desperation. The reply comes an hour later: 'Oh nice! We should hang sometime.' Sometime. The vaguest word in dating." },
      ],
      nextSceneId: 'match-2',
    },
    {
      id: 'match-2',
      backgroundId: 'text-screen',
      dialog: [
        { text: "This is the moment. The 'sometime' test. You could mirror their vagueness, force specifics, or show enthusiasm." },
        { speakerId: 'inner-voice', text: "Vague plans are intentional. See if they can do specifics.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'match-2a',
          text: '"For sure! Let me know when you\'re free" - Ball in their court.',
          nextSceneId: 'match-3a',
          xpBonus: 8,
          tactic: 'return_vagueness',
          feedback: "You mirrored their vagueness. Now watch what they do with the power.",
        },
        {
          id: 'match-2b',
          text: '"I\'m free Thursday or Saturday. Pick one." - Force a choice.',
          nextSceneId: 'match-3b',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'force_specifics',
          feedback: "OPTIMAL: You gave options but forced a choice. No more vague 'sometime.'",
        },
        {
          id: 'match-2c',
          text: '"Yes! I\'d love that! When were you thinking?" - Show enthusiasm.',
          nextSceneId: 'match-3c',
          feedback: "You showed more excitement than they did. Energy imbalance.",
        },
      ],
    },
    {
      id: 'match-3a',
      backgroundId: 'text-screen',
      dialog: [
        { text: "Days pass. No follow-up. They had the ball. They didn't even bounce it. A week later, late again: 'Miss your face 🥺'" },
        { speakerId: 'inner-voice', text: "No mention of plans. No apology for going silent. Just another crumb.", emotion: 'concerned' },
      ],
      choices: [
        {
          id: 'match-4a',
          text: 'Don\'t respond. They showed you who they are.',
          nextSceneId: 'silent-exit',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'walk_away',
          feedback: "OPTIMAL: Words without action mean nothing. You got your answer.",
        },
        {
          id: 'match-4b',
          text: '"Then let\'s actually see each other? Thursday works."',
          nextSceneId: 'match-push',
          xpBonus: 10,
          tactic: 'call_bluff',
          feedback: "You're testing if their words mean anything. Smart.",
        },
        {
          id: 'match-4c',
          text: '"Aww miss you too! 💕"',
          nextSceneId: 'effort-cycle',
          feedback: "You rewarded another crumb. The cycle continues.",
        },
      ],
    },
    {
      id: 'match-3b',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Hmm let me check my schedule and get back to you!' Two days pass. No follow-up. They're 'checking their schedule' for 48 hours. That's a no." },
        { text: "Then, Thursday night at 10pm: 'Hey! Sorry been crazy. Still free tonight??'" },
      ],
      nextSceneId: 'match-3b-choice',
    },
    {
      id: 'match-3b-choice',
      backgroundId: 'text-screen',
      dialog: [
        { text: "Last-minute plans. After they ignored your concrete offer for days." },
        { speakerId: 'inner-voice', text: "They want you available on their terms. Not theirs on yours.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'match-5a',
          text: '"Tonight? Nope. But my offer for Saturday still stands."',
          nextSceneId: 'match-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'hold_standard',
          feedback: "OPTIMAL: You're not a last-minute option. You have standards.",
        },
        {
          id: 'match-5b',
          text: '"Actually yeah, want to grab a drink?"',
          nextSceneId: 'match-neutral-ending',
          xpBonus: 5,
          feedback: "You're available on short notice. They'll remember that.",
        },
        {
          id: 'match-5c',
          text: '"What happened to checking your schedule?"',
          nextSceneId: 'match-confront',
          xpBonus: 10,
          tactic: 'gentle_call_out',
          feedback: "You noticed the inconsistency. Let's see how they spin it.",
        },
      ],
    },
    {
      id: 'match-3c',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'This week is crazy but maybe next week!' Next week. The eternal postponement. When someone wants to see you, they find time. When they don't, they find excuses." },
        { text: "Next week comes. Nothing. Then another late-night text. The cycle continues." },
      ],
      nextSceneId: 'effort-cycle',
    },
    {
      id: 'match-push',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Thursday could work! I'll confirm tomorrow?' Tomorrow comes. Silence. Thursday arrives: 'Ugh something came up. Rain check? 🥺'" },
        { speakerId: 'inner-voice', text: "The pattern is the pattern. Words mean nothing without action.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'match-6a',
          text: '"No more rain checks. I need someone who can show up."',
          nextSceneId: 'match-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'final_boundary',
          feedback: "OPTIMAL: You value yourself more than the potential of what could be.",
        },
        {
          id: 'match-6b',
          text: '"Sure, just let me know when works."',
          nextSceneId: 'breadcrumb-cycle-ending',
          feedback: "Another rain check accepted. The cycle continues indefinitely.",
        },
      ],
    },
    {
      id: 'match-confront',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Lol I know I know, work has been INSANE. But I'm free now!' The excuse machine. Always a reason. Never a solution. Your friend {friend} texts: 'Don't you dare go. It's 10pm on a Thursday.'" },
        { speakerId: 'inner-voice', text: "If they wanted to see you, they'd have made it happen by now.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'match-7a',
          text: '"If you wanted to see me, you\'d have made it happen by now."',
          nextSceneId: 'match-truth-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'name_the_truth',
          feedback: "OPTIMAL: You see the pattern for what it is.",
        },
        {
          id: 'match-7b',
          text: '"Fine, but next time I need actual plans in advance."',
          nextSceneId: 'match-neutral-ending',
          xpBonus: 8,
          feedback: "You went but set a condition. Weak boundary, but it's something.",
        },
      ],
    },

    // ========== PATH B: GO SILENT ==========
    {
      id: 'silent-1',
      backgroundId: 'apartment',
      dialog: [
        { text: "You see the message. You don't respond. Not out of game-playing, but out of recognition. They text when they're bored. You're not a priority. You're an option." },
        { text: "Hours pass. Then a day. 'Hello?? You alive?' There's the follow-up that never came when they were supposed to make plans." },
      ],
      nextSceneId: 'silent-2',
    },
    {
      id: 'silent-2',
      backgroundId: 'text-screen',
      dialog: [
        { text: "Another day passes. 'Did I do something wrong?' Then: 'I miss talking to you. Can we get dinner this week? For real this time.' Suddenly, specific plans. All it took was you stopping." },
        { speakerId: 'inner-voice', text: "When you stopped chasing, they finally noticed. Interesting.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'silent-2a',
          text: '"Sure. You pick the day and restaurant. Text me details."',
          nextSceneId: 'silent-3a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'make_them_work',
          feedback: "OPTIMAL: You'll go—if THEY do the work this time.",
        },
        {
          id: 'silent-2b',
          text: '"What changed? You never wanted to make actual plans before."',
          nextSceneId: 'silent-3b',
          xpBonus: 12,
          tactic: 'question_shift',
          feedback: "Direct observation. Let's see if they have a real answer.",
        },
        {
          id: 'silent-2c',
          text: 'Keep ignoring. See how far they go.',
          nextSceneId: 'silent-3c',
          xpBonus: 8,
          tactic: 'extended_silence',
          feedback: "You want more data. Fair. But be careful—this can become a game.",
        },
      ],
    },
    {
      id: 'silent-3a',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'How about Saturday? There's this Italian place on Main. 7pm?' Specific day. Specific place. Specific time. This is new. Saturday arrives. They actually show up. On time." },
        { speakerId: 'riley', text: '"I\'m sorry I\'ve been so flaky. You deserve better than that."', emotion: 'sad' },
      ],
      choices: [
        {
          id: 'silent-4a',
          text: '"I appreciate that. Let\'s see if actions match words going forward."',
          nextSceneId: 'silent-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'watch_actions',
          feedback: "OPTIMAL: Acknowledge the effort. Reserve judgment for the pattern.",
        },
        {
          id: 'silent-4b',
          text: '"It\'s okay. I\'m just glad we\'re here now."',
          nextSceneId: 'silent-neutral-ending',
          xpBonus: 5,
          feedback: "You forgave quickly. Hope they don't slip back into old patterns.",
        },
      ],
    },
    {
      id: 'silent-3b',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'I don't know, I guess I got scared? You actually seem like someone real. I know I've been weird. Can I make it up to you? Real date. This weekend.'" },
        { speakerId: 'inner-voice', text: "Scared. Maybe. Or maybe they're just saying what works.", emotion: 'concerned' },
      ],
      choices: [
        {
          id: 'silent-5a',
          text: '"Actions, not words. You plan it. I\'ll show up if it\'s real."',
          nextSceneId: 'silent-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'actions_test',
          feedback: "OPTIMAL: You're giving them a chance—but they have to earn it.",
        },
        {
          id: 'silent-5b',
          text: '"I\'ve heard \'real date\' before. What makes this different?"',
          nextSceneId: 'silent-skeptic',
          xpBonus: 10,
          tactic: 'skepticism',
          feedback: "Healthy skepticism. The pattern speaks louder than promises.",
        },
      ],
    },
    {
      id: 'silent-3c',
      backgroundId: 'text-screen',
      dialog: [
        { text: "More silence. 'Okay I get it. You're done with me. I just want you to know I actually really liked you. I was just scared. If you ever want to try again, I'm here. For real.'" },
        { speakerId: 'inner-voice', text: "The 'scared' excuse. Classic. If they were scared, they would've said that... before.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'silent-6a',
          text: 'Continue silence. Let it end here.',
          nextSceneId: 'silent-walk-ending',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'clean_break',
          feedback: "You don't owe them a response. Sometimes silence IS the answer.",
        },
        {
          id: 'silent-6b',
          text: '"Scared of what exactly? Explain."',
          nextSceneId: 'silent-skeptic',
          xpBonus: 10,
          tactic: 'demand_explanation',
          feedback: "You want the full picture. Let's hear their story.",
        },
      ],
    },
    {
      id: 'silent-exit',
      backgroundId: 'apartment',
      dialog: [
        { text: "You don't respond. The pattern showed you everything. Days pass. They text a few more times, each message slightly more desperate. 'I really thought we had something...'" },
        { text: "Eventually, they stop texting. You feel... lighter. You freed up space for someone who won't make you wonder if you matter." },
      ],
      nextSceneId: 'silent-walk-ending',
    },
    {
      id: 'silent-skeptic',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Scared of actually liking someone. I know that sounds dumb. My last relationship really messed me up. I didn't want to get hurt again so I kept everyone at arm's length.'" },
        { speakerId: 'inner-voice', text: "Could be real. Could also be the perfect excuse. What matters isn't their past—it's whether they can show up NOW.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'silent-7a',
          text: '"I hear you. But I need consistency, not stories. Can you do that?"',
          nextSceneId: 'silent-good-ending',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'consistency_demand',
          feedback: "You're compassionate but firm. The real test starts now.",
        },
        {
          id: 'silent-7b',
          text: '"I get it. Let\'s take it slow and see what happens."',
          nextSceneId: 'silent-neutral-ending',
          xpBonus: 5,
          feedback: "You accepted the story. Hope it's genuine.",
        },
      ],
    },

    // ========== PATH C: FORCE THE ISSUE ==========
    {
      id: 'direct-1',
      backgroundId: 'text-screen',
      dialog: [
        { text: "You decide to cut through the noise. 'Can I ask you something directly? What are we doing here?' Read receipt. Typing... stops. Typing again. 'Wym?'" },
        { text: "You push forward: 'We've been talking for two months. Barely seen each other. Are you actually interested, or am I just someone to text when you're bored?'" },
      ],
      nextSceneId: 'direct-2',
    },
    {
      id: 'direct-2',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Wow okay. That came out of nowhere. I AM interested. I've just been super busy with work and stuff.' Work and stuff. The eternal shield." },
        { speakerId: 'inner-voice', text: "Deflecting with confusion, then the 'busy' excuse. Classic avoidance.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'direct-2a',
          text: '"Busy people make time for what matters. Do I matter to you?"',
          nextSceneId: 'direct-3a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'core_question',
          feedback: "Direct to the heart of it. No more dancing around.",
        },
        {
          id: 'direct-2b',
          text: '"I get being busy. But you have time to text. Why not time to meet?"',
          nextSceneId: 'direct-3b',
          xpBonus: 12,
          tactic: 'logical_question',
          feedback: "You pointed out the inconsistency. Let's see them explain.",
        },
        {
          id: 'direct-2c',
          text: '"Okay, I hear that. Let me know when things calm down."',
          nextSceneId: 'effort-cycle',
          feedback: "You backed off. The cycle continues.",
        },
      ],
    },
    {
      id: 'direct-3a',
      backgroundId: 'text-screen',
      dialog: [
        { text: "Silence. Longer than before. 'Of course you matter. That's not fair. You're putting me on the spot here. I don't like ultimatums.'" },
        { speakerId: 'inner-voice', text: "You asked a direct question and now you're 'not fair.' A question becomes an 'ultimatum.' Interesting reframe.", emotion: 'concerned' },
      ],
      choices: [
        {
          id: 'direct-4a',
          text: '"It\'s not an ultimatum. It\'s clarity. You\'re either in or you\'re not."',
          nextSceneId: 'direct-clarify-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'hold_ground',
          feedback: "OPTIMAL: You didn't accept the reframe. You held the truth.",
        },
        {
          id: 'direct-4b',
          text: '"I\'m not trying to pressure you. I just need to know where I stand."',
          nextSceneId: 'direct-soften',
          xpBonus: 8,
          feedback: "You softened. See if they meet you there.",
        },
      ],
    },
    {
      id: 'direct-3b',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Texting takes like two seconds. Meeting up is a whole thing. I promise I'll be better about it. Next week, for sure.' Next week. Always next week." },
        { speakerId: 'inner-voice', text: "'A whole thing.' You're 'a whole thing' to them.", emotion: 'concerned' },
      ],
      choices: [
        {
          id: 'direct-5a',
          text: '"Next week then. You pick the day and place. Ball\'s in your court."',
          nextSceneId: 'direct-test',
          xpBonus: 12,
          tactic: 'final_test',
          feedback: "You gave them one more chance. With clear ownership.",
        },
        {
          id: 'direct-5b',
          text: '"I\'ve heard \'next week\' before. I need something concrete."',
          nextSceneId: 'direct-push',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'demand_concrete',
          feedback: "You're not accepting vague promises anymore.",
        },
      ],
    },
    {
      id: 'direct-soften',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'I like you. I do. I just... have a lot going on. Can we just keep going like we are for now? See where it goes?'" },
        { speakerId: 'inner-voice', text: "'See where it goes.' Nowhere. It goes nowhere. You've seen where it goes.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'direct-6a',
          text: '"I need forward motion. \'Where it goes\' has been the same place for two months."',
          nextSceneId: 'direct-clarify-ending',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'reject_status_quo',
          feedback: "You named the truth. The status quo isn't working for you.",
        },
        {
          id: 'direct-6b',
          text: '"Okay. But I\'m not waiting forever."',
          nextSceneId: 'direct-neutral-ending',
          xpBonus: 5,
          feedback: "A soft ultimatum. Will you hold to it?",
        },
      ],
    },
    {
      id: 'direct-test',
      backgroundId: 'apartment',
      dialog: [
        { text: "You wait. Monday passes. Tuesday. Wednesday. 'Hey! Sorry been slammed. How's your week?' No mention of plans. The test failed." },
        { speakerId: 'inner-voice', text: "They forgot. Or they didn't care. Either way, you have your answer.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'direct-7a',
          text: '"We said you\'d make plans for this week. What happened?"',
          nextSceneId: 'direct-final-call',
          xpBonus: 15,
          tactic: 'accountability',
          feedback: "You're holding them to their word. Let's see what they do.",
        },
        {
          id: 'direct-7b',
          text: 'Don\'t respond. You got your answer.',
          nextSceneId: 'silent-walk-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'silent_conclusion',
          feedback: "OPTIMAL: Actions showed truth. No more words needed.",
        },
      ],
    },
    {
      id: 'direct-push',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Okay okay. Friday. 7pm. Dinner at that Thai place downtown?' Finally. Specifics. They CAN be specific when pushed. The question is why you had to push." },
        { speakerId: 'inner-voice', text: "Set the stakes clearly. If they cancel, you're done.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'direct-8a',
          text: '"See you then."',
          nextSceneId: 'direct-date-ending',
          xpBonus: 10,
          feedback: "You got what you wanted. Now see if they show up.",
        },
        {
          id: 'direct-8b',
          text: '"Great. If you cancel, this is done. Fair warning."',
          nextSceneId: 'direct-ultimatum-ending',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'clear_stakes',
          feedback: "Crystal clear stakes. They know exactly where you stand.",
        },
      ],
    },
    {
      id: 'direct-final-call',
      backgroundId: 'text-screen',
      dialog: [
        { text: "'Oh shit, you're right. I totally spaced. Can we do this weekend instead?' They 'spaced.' On something they committed to. After you pushed for it." },
        { speakerId: 'inner-voice', text: "The pattern reveals itself again. If you mattered, they would've remembered.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'direct-9a',
          text: '"No. If I mattered, you would\'ve remembered. Good luck out there."',
          nextSceneId: 'direct-clarify-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'clean_exit',
          feedback: "OPTIMAL: You valued yourself more than the potential. That's power.",
        },
        {
          id: 'direct-9b',
          text: '"This is your last chance. Saturday. You pick the place."',
          nextSceneId: 'direct-neutral-ending',
          xpBonus: 8,
          feedback: "One more chance. Final one. Mean it.",
        },
      ],
    },

    // ========== PATH D: DOUBLE YOUR EFFORT (TRAP) ==========
    {
      id: 'effort-1',
      backgroundId: 'text-screen',
      dialog: [
        { text: "You reply immediately. With enthusiasm. 'Hey you!! 💕 I've been thinking about you too! We should totally hang soon!' They sent three words. You sent three lines." },
        { text: "'Haha yeah for sure.' Three words again. No plans. No specifics. Just enough to keep you hoping." },
      ],
      nextSceneId: 'effort-2',
    },
    {
      id: 'effort-2',
      backgroundId: 'text-screen',
      dialog: [
        { text: "Days pass. You keep initiating. 'How was your day?' 'That meme made me think of you.' 'Free this weekend?' Their responses: 'Haha nice' '😂' 'Maybe, I'll let u know.'" },
        { text: "Your friend {friend} has been watching: 'Babe. You're always texting them. When do they ever text you first?'" },
      ],
      nextSceneId: 'effort-3',
    },
    {
      id: 'effort-3',
      backgroundId: 'coffee-shop',
      dialog: [
        { text: "You look at your text thread. Really look at it. You: wall of text. Them: two words. You: another wall. Them: emoji. The effort gap is not subtle. You just didn't want to see it." },
        { speakerId: 'maya', text: '"You know what I want you to do? Stop. Don\'t text them for a week. See what happens."', emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'effort-4a',
          text: '"You\'re right. I\'m going to try the silence thing."',
          nextSceneId: 'effort-recovery',
          xpBonus: 15,
          tactic: 'break_pattern',
          feedback: "You heard the truth and you're acting on it. Growth.",
        },
        {
          id: 'effort-4b',
          text: '"But what if they think I lost interest?"',
          nextSceneId: 'effort-trap-ending',
          feedback: "You're worried about their feelings. When do they worry about yours?",
        },
      ],
    },
    {
      id: 'effort-recovery',
      backgroundId: 'apartment',
      dialog: [
        { text: "You stop texting. It's harder than you thought. Day one. Day two. Day three. Nothing from them. Day five: still nothing. You usually text multiple times a day. They didn't even notice you stopped." },
        { text: "Day seven: 'Hey stranger 👋' One week of silence and this is what you get. A two-word 'hey.'" },
      ],
      nextSceneId: 'effort-recovery-choice',
    },
    {
      id: 'effort-recovery-choice',
      backgroundId: 'apartment',
      dialog: [
        { text: "Seven days of silence. And that's the effort they bring." },
        { speakerId: 'inner-voice', text: "When you stopped performing, they barely noticed. That tells you everything.", emotion: 'neutral' },
      ],
      choices: [
        {
          id: 'effort-5a',
          text: 'Don\'t respond. You have your answer.',
          nextSceneId: 'effort-wake-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'full_clarity',
          feedback: "OPTIMAL: Seven days and that's the effort? You're worth more than this.",
        },
        {
          id: 'effort-5b',
          text: '"Hey! Been busy. How are you?"',
          nextSceneId: 'effort-cycle',
          feedback: "You're back in the cycle. Breaking patterns is hard.",
        },
      ],
    },
    {
      id: 'effort-cycle',
      backgroundId: 'apartment',
      dialog: [
        { text: "Weeks turn into months. The pattern continues. Late night texts. Vague plans. Crumbs of attention that never become a meal. They know you'll always be there. Why would they try harder?" },
        { text: "You become an option they never choose, but never let go of either." },
      ],
      nextSceneId: 'breadcrumb-cycle-ending',
    },

    // ========== ENDINGS ==========
    {
      id: 'match-good-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "You held your standard. You weren't available on their terms. Maybe they'll step up. Maybe they won't. But you learned something important." },
        { speakerId: 'inner-voice', text: "People show you what you mean to them through effort, not words.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Standard Set',
      endingSummary: "You matched their energy and set a standard. They can meet it or move on. Either way, you win.",
    },
    {
      id: 'match-neutral-ending',
      backgroundId: 'restaurant',
      dialog: [
        { text: "You went. The date was... fine. But you notice you're watching them carefully now. Waiting to see if the pattern returns." },
        { speakerId: 'inner-voice', text: "You know what they're capable of. The question is whether they'll choose to change.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Wait and See',
      endingSummary: "You gave them a chance. Now watch their actions, not their words. The pattern reveals itself with time.",
    },
    {
      id: 'match-truth-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "You said what you've been thinking for weeks. 'That's not fair. I've been trying.' 'Have you though?' Silence. Because the answer is obvious." },
        { speakerId: 'inner-voice', text: "Truth is freeing. Even when it ends things.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Truth Spoken',
      endingSummary: "You named the reality. They couldn't argue because deep down, they knew. Clarity is its own reward.",
    },
    {
      id: 'silent-good-ending',
      backgroundId: 'restaurant',
      dialog: [
        { text: "They show up. They make effort. For now. You watch their actions over the coming weeks. Not perfectly consistent, but genuinely trying." },
        { speakerId: 'inner-voice', text: "When you stopped being easy, you became interesting. Remember that.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Reset',
      endingSummary: "Your silence spoke louder than words ever could. Now they know you're not a sure thing. Keep that energy.",
    },
    {
      id: 'silent-neutral-ending',
      backgroundId: 'restaurant',
      dialog: [
        { text: "Things improve. For a while. But you notice yourself waiting for the other shoe to drop. Old patterns die hard." },
        { speakerId: 'inner-voice', text: "Trust is rebuilt with consistent action over time. Watch. Wait. See.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Cautious Optimism',
      endingSummary: "They said the right things. Now they need to DO the right things. Consistently. Over time. You'll see.",
    },
    {
      id: 'silent-walk-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "You never replied. They eventually stopped trying. No dramatic ending. No closure conversation. Just... done." },
        { speakerId: 'inner-voice', text: "Some endings are quiet. That doesn't make them less complete.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Quiet Exit',
      endingSummary: "No confrontation. No explanation. You simply stopped participating in something that wasn't working. That's power.",
    },
    {
      id: 'direct-clarify-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "You asked for clarity. You got it—just not the kind they expected to give. Their defensiveness, their inability to commit, their reframes—that WAS the answer." },
        { speakerId: 'inner-voice', text: "When you demand clarity, people reveal themselves. They just did.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Clarity Achieved',
      endingSummary: "You forced the truth to the surface. Their non-answer was an answer. Now you know.",
    },
    {
      id: 'direct-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "You gave them more chances than they earned. Maybe it'll pay off. Only time will show if their words match their actions." },
        { speakerId: 'inner-voice', text: "Hope is not a strategy. Watch what they do, not what they promise.", emotion: 'concerned' },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'One More Chance',
      endingSummary: "You gave them the benefit of the doubt. Now hold them to it. If the pattern returns, you know what to do.",
    },
    {
      id: 'direct-date-ending',
      backgroundId: 'restaurant',
      dialog: [
        { text: "They showed up. The date happened. It was actually... good. Sometimes people need a push to do what they wanted to do anyway. Sometimes." },
        { speakerId: 'inner-voice', text: "Watch if this becomes a pattern or remains an exception.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Finally',
      endingSummary: "You pushed, they delivered. Once. Now see if consistency follows, or if you'll need to push again.",
    },
    {
      id: 'direct-ultimatum-ending',
      backgroundId: 'restaurant',
      dialog: [
        { text: "You set clear stakes. They showed up. For now. The relationship dynamic is set: you expect effort, or you're out." },
        { speakerId: 'inner-voice', text: "You shouldn't need to threaten to leave for someone to show up. But here you are.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Clear Stakes',
      endingSummary: "You laid down the law and they responded. That's something. Just remember: you shouldn't have to repeat this ultimatum.",
    },
    {
      id: 'effort-trap-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "You kept texting. Kept hoping. Kept being available. And they kept giving you just enough to hold on. Months pass. You're still in the same place." },
        { speakerId: 'inner-voice', text: "This is intermittent reinforcement. It's addictive by design. Casinos use it too.", emotion: 'concerned' },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Hamster Wheel',
      endingSummary: "You stayed hoping things would change. They didn't. The breadcrumber's whole strategy relies on people like you hoping. Next time, demand the whole loaf.",
    },
    {
      id: 'effort-wake-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "Seven days of silence and all you got was 'hey stranger.' That's the answer. That's the whole answer. You don't respond. And this time, you don't look back." },
        { speakerId: 'inner-voice', text: "When you stopped performing, they barely noticed. That tells you everything.", emotion: 'neutral' },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Eyes Open',
      endingSummary: "You saw the pattern clearly. Seven days of silence and minimal effort in return. You deserve someone who notices when you're quiet—and cares.",
    },
    {
      id: 'breadcrumb-cycle-ending',
      backgroundId: 'apartment',
      dialog: [
        { text: "You're still getting late-night texts. Still hoping 'sometime' becomes 'Saturday at 7.' It doesn't. It never does. Because they don't want it to." },
        { speakerId: 'inner-voice', text: "They want the option of you. Not the reality of you. Those are different things.", emotion: 'concerned' },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Endless Maybe',
      endingSummary: "You accepted 'maybe' instead of demanding 'yes.' The breadcrumber thanks you for being such a reliable backup option. Is that what you want to be?",
    },
  ],
};
