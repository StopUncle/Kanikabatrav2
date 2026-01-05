// Scenario: The Love Bomb (Male Version - Expanded)
// Learn to recognize love bombing and narcissistic patterns
// Adapted for male psychology - targeting ego, provider identity, and sexual validation
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../../types';

export const maleNarcissistTrapScenario: Scenario = {
  id: 'male-narcissist-trap',
  title: 'The Love Bomb',
  tagline: 'Too good to be true?',
  description:
    'She seems perfect - beautiful, attentive, and completely into you. But that rush you feel? It\'s not chemistry. It\'s your instincts screaming a warning.',
  tier: 'free',
  estimatedMinutes: 12,
  difficulty: 'beginner',
  category: 'narcissist',
  xpReward: 100,
  badgeId: 'love-bomb-survivor',
  targetGender: 'male',

  templates: {
    manipulator: ['Alexa', 'Jessica', 'Mia', 'Sophia', 'Vanessa'],
    friend: ['Mike', 'Connor', 'Jake', 'Tyler', 'Brandon'],
    destination: ['Paris', 'Santorini', 'Bali', 'Barcelona', 'Tokyo'],
  },

  tacticsLearned: [
    'Love bombing recognition',
    'Future faking detection',
    'The Mask Slip identification',
    'Pace control in dating',
    'Recognizing ego manipulation',
  ],
  redFlagsTaught: [
    'Excessive early investment (targeting your provider identity)',
    'Future faking ("you\'re different from other guys")',
    'Sexual validation as control',
    'Isolation attempts',
    'Manufacturing urgency',
  ],

  characters: [
    {
      id: 'manipulator',
      name: 'Alexa',
      description:
        'Beautiful, attentive, and very interested in you. Almost too interested. Watch for the mask.',
      traits: ['narcissist', 'love-bomber', 'future-faker'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'friend',
      name: 'Mike',
      description: 'Your best friend who always has your back. The voice of reason.',
      traits: ['supportive', 'observant'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'The part of you that knows what your gut is telling you.',
      traits: ['intuitive', 'protective'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    // ============================================
    // SCENE 1: THE OPENING HOOK
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'bar',
      dialog: [
        {
          text: "You matched with {manipulator} last week. First date. She's even more attractive in person. That rush you feel... is it excitement or something else?",
        },
        {
          text: "\"I have to be honest with you... I've dated a lot of guys, but none of them made me feel this way. There's something different about you. You're not like other guys. You actually have substance.\"",
          speakerId: 'manipulator',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "\"Not like other guys\" - the classic ego play. She's targeting your identity.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c1-ego',
          text: '"I try to be different. Most guys are pretty basic."',
          nextSceneId: 'scene-2-hooked',
          feedback: 'TRAP: You took the bait. She just learned your ego is an easy target.',
        },
        {
          id: 'c1-deflect',
          text: '"So what made your last relationships not work out?"',
          nextSceneId: 'scene-2-testing',
          xpBonus: 10,
          feedback: 'Smart redirect. Getting her history reveals patterns. Watch if she blames everyone else.',
        },
        {
          id: 'c1-cautious',
          text: '"That\'s flattering, but we just met..."',
          nextSceneId: 'scene-2-cautious',
          xpBonus: 12,
          feedback: 'Good instinct. You acknowledged the pace mismatch. Watch her reaction carefully.',
        },
        {
          id: 'c1-skeptical',
          text: '"We\'ve talked for an hour. You don\'t really know me yet."',
          nextSceneId: 'scene-2-pushback',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Reality testing. You challenged the fantasy. Now watch the mask slip.',
          tactic: 'reality_testing',
        },
      ],
    },

    // ============================================
    // SCENE 2: BRANCHING RESPONSES
    // ============================================
    {
      id: 'scene-2-hooked',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"See? That's exactly what I mean. You get it.\" She puts her hand on yours. The touch feels electric. \"I deleted all my dating apps today. I don't need them anymore. You should do the same. Why keep looking when we both know this is it?\"",
          speakerId: 'manipulator',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "First date and she wants exclusivity? That's not romantic. That's manufactured urgency.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c2a-agree',
          text: "Delete your apps right there to show you're serious",
          nextSceneId: 'scene-3-trapped',
          feedback: "TRAP: You just gave up all leverage for someone who hasn't earned commitment.",
        },
        {
          id: 'c2a-consider',
          text: '"I\'ll think about it... you really deleted all of them?"',
          nextSceneId: 'scene-3-pressure',
          xpBonus: 5,
          feedback: 'Weak resistance. You\'re negotiating with urgency instead of rejecting it.',
        },
        {
          id: 'c2a-hesitate',
          text: '"Let\'s see where this goes first..."',
          nextSceneId: 'scene-3-testing',
          xpBonus: 15,
          feedback: 'Good. You resisted premature commitment. Keep your options until exclusivity is earned.',
        },
      ],
    },
    {
      id: 'scene-2-cautious',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Oh, I know it's fast. I just... when I know, I know.\" She leans closer. \"But I understand if you need more time. Men who take their time are actually... kind of hot.\" She's sexualizing your hesitation. Reframing your boundary as foreplay.",
          speakerId: 'manipulator',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "She just made your caution a turn-on. Watch how she handles actual resistance.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c2b-flattered',
          text: '"Well, I do like to take my time..." (play along)',
          nextSceneId: 'scene-3-pressure',
          xpBonus: 5,
          feedback: 'You entered her frame. She\'s directing the dance now.',
        },
        {
          id: 'c2b-probe',
          text: '"When you know, you know? How many times has that worked out?"',
          nextSceneId: 'scene-3-testing',
          xpBonus: 15,
          isOptimal: true,
          feedback: 'OPTIMAL: Probing her history. If everyone before you was wrong, maybe her picker is broken.',
          tactic: 'pattern_probe',
        },
        {
          id: 'c2b-direct',
          text: '"I appreciate the interest. But let\'s slow the pace down."',
          nextSceneId: 'scene-3-boundary',
          xpBonus: 12,
          feedback: 'Direct boundary. Good. Now watch if she respects it or works around it.',
        },
      ],
    },
    {
      id: 'scene-2-testing',
      backgroundId: 'bar',
      dialog: [
        {
          text: "She pauses. Then laughs. \"Ugh, my exes? All losers. One was obsessed with video games. Another was 'finding himself' at 32. The last one couldn't handle that I make more money than him.\" She hasn't taken responsibility for any of it.",
          speakerId: 'manipulator',
          emotion: 'smirking',
        },
        {
          text: "\"But you... you're driven. Ambitious. I can tell. I need a man who matches my energy.\"",
          speakerId: 'manipulator',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Three exes. All losers. Zero accountability. Pattern detected.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c2c-validate',
          text: '"Sounds like you\'ve had bad luck with guys."',
          nextSceneId: 'scene-3-pressure',
          feedback: 'You just validated her victim narrative. Everyone was the problem but her.',
        },
        {
          id: 'c2c-probe',
          text: '"What did they say about why things ended?"',
          nextSceneId: 'scene-3-testing',
          xpBonus: 15,
          isOptimal: true,
          feedback: 'OPTIMAL: Getting both sides. Her answer will reveal if she can see outside herself.',
          tactic: 'perspective_probe',
        },
        {
          id: 'c2c-note',
          text: 'Mentally note the pattern. Ask about her friends instead.',
          nextSceneId: 'scene-3-friends',
          xpBonus: 12,
          feedback: 'Smart pivot. Her relationship with female friends often mirrors romantic patterns.',
        },
      ],
    },
    {
      id: 'scene-2-pushback',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{manipulator}'s smile flickers. Just for a moment. But you caught it. That flash of irritation? That was the real her. She recovers: \"You're right. I just... feel things deeply. I've been hurt before.\"",
          speakerId: 'manipulator',
          emotion: 'sad',
        },
        {
          text: "Then her eyes shift. \"When I know, I know. But I understand if you need more time.\" A pause. \"A man who takes his time? That's actually... hot.\"",
          speakerId: 'manipulator',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Wounded dove, then sexual reframe. Two tactics in five seconds.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c2d-soften',
          text: '"I appreciate you understanding. That\'s mature of you."',
          nextSceneId: 'scene-3-testing',
          xpBonus: 8,
          feedback: 'You rewarded the recovery instead of addressing the slip.',
        },
        {
          id: 'c2d-observe',
          text: 'Note the quick emotional shift. Say nothing. Let the silence work.',
          nextSceneId: 'scene-3-aware',
          xpBonus: 20,
          isOptimal: true,
          feedback: 'OPTIMAL: The Silence Probe. You observed the mask slip and deployed strategic silence.',
          tactic: 'micro_expression_reading',
        },
        {
          id: 'c2d-call-out',
          text: '"That face just now—you looked annoyed for a second."',
          nextSceneId: 'scene-3-confrontation',
          xpBonus: 15,
          feedback: 'Bold. Direct confrontation. Her reaction will be very telling.',
        },
      ],
    },

    // ============================================
    // SCENE 3: ESCALATION
    // ============================================
    {
      id: 'scene-3-trapped',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Later that night. Your phone won't stop buzzing. 14 texts in 2 hours. \"Can't stop thinking about you. When can I see you again? Tomorrow? I told my sister about you. She wants to meet the guy who finally swept me off my feet!\"",
        },
        {
          speakerId: 'inner-voice',
          text: "This isn't excitement. This is love bombing. It's designed to overwhelm your judgment.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c3a-excited',
          text: '"Yes! I\'m free tomorrow. Can\'t wait!"',
          nextSceneId: 'ending-bad-trapped',
          feedback: 'The love bomb detonated. You matched her unsustainable pace.',
        },
        {
          id: 'c3a-flattered',
          text: '"Wow, you told your sister already? That\'s sweet..."',
          nextSceneId: 'scene-4-family-trap',
          xpBonus: 3,
          feedback: 'You\'re charmed by the intensity instead of alarmed by it.',
        },
        {
          id: 'c3a-slow',
          text: '"This is a lot. I need some space to process."',
          nextSceneId: 'scene-4-pullback',
          xpBonus: 15,
          feedback: 'Late boundary-setting, but you identified the pattern.',
        },
      ],
    },
    {
      id: 'scene-3-pressure',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Second date. She insisted on a nice restaurant. \"I have a surprise. I got us tickets to {destination} next month. Just you and me. It'll be magical.\"",
          speakerId: 'manipulator',
          emotion: 'happy',
        },
        {
          text: "Your phone buzzes. {friend}: \"A trip after 2 dates? That's not generous, that's a trap.\"",
        },
        {
          speakerId: 'inner-voice',
          text: "A trip this fast isn't romantic. It's creating obligation.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c3b-accept',
          text: 'Ignore {friend}. Say yes to {destination}. When will this happen again?',
          nextSceneId: 'ending-bad-isolation',
          feedback: 'Isolation begins. You dismissed the voice of reason for the voice of fantasy.',
        },
        {
          id: 'c3b-split',
          text: '"That\'s amazing! Let me pay for half."',
          nextSceneId: 'scene-4-obligation',
          xpBonus: 5,
          feedback: 'You accepted but tried to equalize. The obligation is already forming.',
        },
        {
          id: 'c3b-curious',
          text: '"Why would you book a trip for someone you barely know?"',
          nextSceneId: 'scene-4-questioned',
          xpBonus: 12,
          feedback: 'Probing her motives directly. Bold. Her reaction will be telling.',
        },
        {
          id: 'c3b-pause',
          text: '"That\'s incredibly generous, but I can\'t accept this. It\'s too much too fast."',
          nextSceneId: 'scene-4-mask-off',
          isOptimal: true,
          xpBonus: 20,
          feedback: "OPTIMAL: Gift refusal. A high-value man doesn't let gifts purchase his commitment.",
          tactic: 'obligation_refusal',
        },
      ],
    },
    {
      id: 'scene-3-testing',
      backgroundId: 'bar',
      dialog: [
        {
          text: "You've set boundaries. You're watching closely. \"You're not like the other guys I've dated. They never challenged me. You do. It's... frustrating.\"",
          speakerId: 'manipulator',
          emotion: 'neutral',
        },
        {
          text: "She traces her finger on the table. \"But also kind of hot. Sometimes I wonder if you're just playing hard to get.\"",
          speakerId: 'manipulator',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Boundaries = 'playing hard to get' in her mind. She's not used to them.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c3c-reassure',
          text: '"No, I really am into you. I just want to take things slow..."',
          nextSceneId: 'ending-neutral-stayed',
          feedback: 'You explained yourself when no explanation was needed.',
        },
        {
          id: 'c3c-flirt',
          text: '"Maybe I am playing a little..."',
          nextSceneId: 'scene-4-game',
          xpBonus: 5,
          feedback: 'You entered her frame. Now it\'s a game—and she wrote the rules.',
        },
        {
          id: 'c3c-confront',
          text: '"Hard to get? I just don\'t give exclusivity to people I just met."',
          nextSceneId: 'ending-good-walked',
          xpBonus: 18,
          feedback: 'Direct. Effective. She now knows you have standards.',
        },
        {
          id: 'c3c-hold',
          text: 'Say nothing. Hold eye contact. Let her fill the silence.',
          nextSceneId: 'ending-good-walked',
          xpBonus: 22,
          isOptimal: true,
          feedback: "OPTIMAL: Strategic Silence. You're not the one chasing. She is.",
          tactic: 'strategic_silence',
        },
      ],
    },
    {
      id: 'scene-3-boundary',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Slow the pace?\" Her smile tightens. \"I'm just being honest about my feelings. I didn't realize that was a problem.\" The wounded dove act—right on cue.",
          speakerId: 'manipulator',
          emotion: 'sad',
        },
        {
          text: "\"Most guys would kill for a woman who knows what she wants. But if you need to play games...\"",
          speakerId: 'manipulator',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "There it is. Boundary = 'playing games.' She's flipping the script.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c3d-apologize',
          text: '"You\'re right, I\'m sorry. I didn\'t mean to make you feel bad."',
          nextSceneId: 'ending-bad-apologized',
          feedback: 'TRAP: You apologized for having boundaries. The dynamic is set.',
        },
        {
          id: 'c3d-firm',
          text: '"Having standards isn\'t playing games."',
          nextSceneId: 'scene-4-mask-off',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Held frame under pressure. Now watch her escalate or fold.',
          tactic: 'frame_hold',
        },
        {
          id: 'c3d-question',
          text: '"What happened when other guys set boundaries with you?"',
          nextSceneId: 'scene-4-history',
          xpBonus: 12,
          feedback: 'Good probe. Her answer reveals how she handles not getting her way.',
        },
      ],
    },
    {
      id: 'scene-3-friends',
      backgroundId: 'bar',
      dialog: [
        {
          text: "You ask about her friends. \"Oh, I don't really do the girl friend thing. Too much drama. Women are so competitive with me. I get along better with guys.\"",
          speakerId: 'manipulator',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: "No female friends. 'Women are competitive with me.' Classic narcissist isolation pattern.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c3e-accept',
          text: '"I get that. Drama is exhausting."',
          nextSceneId: 'scene-4-obligation',
          feedback: 'You validated isolation as a reasonable choice.',
        },
        {
          id: 'c3e-probe',
          text: '"What kind of drama?"',
          nextSceneId: 'scene-4-history',
          xpBonus: 12,
          feedback: 'Digging deeper. Her answer will reveal more patterns.',
        },
        {
          id: 'c3e-note',
          text: 'Make a mental note. This is significant data. Change topics.',
          nextSceneId: 'scene-3-testing',
          xpBonus: 15,
          isOptimal: true,
          feedback: 'OPTIMAL: You catalogued the red flag without tipping your hand.',
          tactic: 'silent_observation',
        },
      ],
    },
    {
      id: 'scene-3-aware',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You've been cataloguing the data points. The patterns are clear. You tell {friend} everything—the intensity, the future talk, the mask slip.",
          speakerId: 'friend',
          emotion: 'concerned',
        },
        {
          text: "\"Bro. Classic love bombing. I've seen this before. My buddy dated one. Ghost her now before you're in too deep.\"",
          speakerId: 'friend',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "The intensity isn't real connection. It's a strategy.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c3f-second-chance',
          text: '"Maybe I\'m being paranoid. One more date to be sure?"',
          nextSceneId: 'scene-4-obligation',
          xpBonus: 3,
          feedback: 'Second-guessing your pattern recognition. The data was clear.',
        },
        {
          id: 'c3f-confront',
          text: '"I\'ll tell her what I\'ve noticed and see how she reacts."',
          nextSceneId: 'scene-4-confrontation',
          xpBonus: 12,
          feedback: 'Direct confrontation. Risky but informative.',
        },
        {
          id: 'c3f-trust',
          text: '"You\'re right. I\'m out. No explanation needed."',
          nextSceneId: 'ending-good-clean',
          xpBonus: 22,
          isOptimal: true,
          feedback: 'OPTIMAL: Early Exit. You can walk away from anyone, at any time. This is freedom.',
          tactic: 'early_exit',
        },
      ],
    },
    {
      id: 'scene-3-confrontation',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Annoyed?\" She laughs. Too hard. \"Babe, no. I was just surprised. You're very... perceptive.\" She touches your arm. \"I like that about you. Most guys don't notice anything.\"",
          speakerId: 'manipulator',
          emotion: 'seductive',
        },
        {
          text: "She's deflecting with flattery. But her eyes are calculating. You're not the easy mark she expected.",
        },
        {
          speakerId: 'inner-voice',
          text: "She's recalibrating. You're harder to manipulate than she thought.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c3g-accept',
          text: '"Thanks. I pay attention."',
          nextSceneId: 'scene-4-obligation',
          xpBonus: 5,
          feedback: 'You let the deflection slide. She knows you can be distracted.',
        },
        {
          id: 'c3g-push',
          text: '"You didn\'t answer the question."',
          nextSceneId: 'scene-4-mask-off',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Persistent. You won\'t be deflected. The mask will crack.',
          tactic: 'persistence',
        },
        {
          id: 'c3g-exit',
          text: '"I think I\'ve seen enough. Good luck out there."',
          nextSceneId: 'ending-good-walked',
          xpBonus: 15,
          feedback: 'Clean exit. You trusted your read.',
        },
      ],
    },

    // ============================================
    // SCENE 4: CONSEQUENCES
    // ============================================
    {
      id: 'scene-4-family-trap',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Second date. She brought her sister. \"I just couldn't wait for you two to meet!\" Now there are witnesses to your 'relationship.' Stakes are being manufactured.",
          speakerId: 'manipulator',
          emotion: 'happy',
        },
        {
          text: "The sister is sizing you up. \"She's told me SO much about you. You're all she talks about. Please don't break her heart like the others.\"",
        },
        {
          speakerId: 'inner-voice',
          text: "Family involvement on date two. The web is forming.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c4a-trapped',
          text: 'Be charming. You don\'t want to embarrass her in front of her sister.',
          nextSceneId: 'ending-bad-trapped',
          feedback: 'You prioritized her comfort over your instincts.',
        },
        {
          id: 'c4a-polite',
          text: 'Be polite but detached. This is too much too fast.',
          nextSceneId: 'scene-4-pullback',
          xpBonus: 12,
          feedback: 'Measured response. You\'re not playing along but not causing a scene.',
        },
        {
          id: 'c4a-honest',
          text: '"I appreciate meeting you, but this feels like a lot for a second date."',
          nextSceneId: 'ending-good-walked',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Honest in the moment. Uncomfortable but necessary.',
          tactic: 'honest_boundary',
        },
      ],
    },
    {
      id: 'scene-4-pullback',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You've been slower to respond. Taking more time between dates. She's noticed. \"Is everything okay? You seem distant. Did I do something wrong?\" The guilt play.",
        },
        {
          text: "Then: \"If you're not feeling this, just tell me. I can handle it. I'd rather know now than waste more time.\" Manufactured ultimatum.",
        },
        {
          speakerId: 'inner-voice',
          text: "Distance triggered urgency. Classic response to losing control.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c4b-reassure',
          text: '"No, you didn\'t do anything. I\'m just busy with work."',
          nextSceneId: 'ending-neutral-stayed',
          xpBonus: 5,
          feedback: 'You gave an excuse instead of truth. The pattern continues.',
        },
        {
          id: 'c4b-honest',
          text: '"I feel like things are moving really fast. I need to slow down."',
          nextSceneId: 'scene-4-mask-off',
          xpBonus: 15,
          isOptimal: true,
          feedback: 'OPTIMAL: Honest about your needs. Her reaction tells you everything.',
          tactic: 'honest_communication',
        },
        {
          id: 'c4b-end',
          text: '"You\'re right. I don\'t think this is working for me."',
          nextSceneId: 'ending-good-clean',
          xpBonus: 12,
          feedback: 'Clean break. Maybe abrupt, but sometimes that\'s best.',
        },
      ],
    },
    {
      id: 'scene-4-obligation',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Third date. She's already talking about Valentine's Day plans. About meeting her parents. About how her lease is up in three months and she's \"thinking about the future.\"",
          speakerId: 'manipulator',
          emotion: 'happy',
        },
        {
          text: "Your phone buzzes. {friend}: \"Dude, you've known her three weeks. Why is she talking about moving?\"",
        },
        {
          speakerId: 'inner-voice',
          text: "Three weeks. Already planning cohabitation. The timeline is insane.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c4c-swept',
          text: '"Maybe she\'s just really into me. This could be real."',
          nextSceneId: 'ending-bad-trapped',
          feedback: 'Hope isn\'t strategy. The pace is the warning, not the passion.',
        },
        {
          id: 'c4c-redirect',
          text: '"Let\'s focus on what\'s in front of us right now."',
          nextSceneId: 'ending-neutral-stayed',
          xpBonus: 8,
          feedback: 'Soft redirect. She\'ll hear it as "slow down" not "stop."',
        },
        {
          id: 'c4c-confront',
          text: '"Moving? We\'ve been on three dates. This is way too fast."',
          nextSceneId: 'scene-4-mask-off',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Direct reality check. The intensity isn\'t connection—it\'s love bombing.',
          tactic: 'reality_check',
        },
      ],
    },
    {
      id: 'scene-4-game',
      backgroundId: 'bar',
      dialog: [
        {
          text: "She leans in. \"Oh, you want to play games? I can play games.\" Her energy shifts. Less warm. More competitive. \"I always win, by the way.\"",
          speakerId: 'manipulator',
          emotion: 'smirking',
        },
        {
          text: "There's an edge now. The charm is still there but it feels different. Sharper.",
        },
        {
          speakerId: 'inner-voice',
          text: "The mask is thinning. You glimpsed the competitor underneath.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c4d-play',
          text: '"Game on then."',
          nextSceneId: 'ending-bad-game',
          feedback: 'You engaged on her terms. This isn\'t a game you want to win.',
        },
        {
          id: 'c4d-withdraw',
          text: '"I don\'t date people who think relationships are competitions."',
          nextSceneId: 'ending-good-walked',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Hard boundary. Relationships aren\'t conquest.',
          tactic: 'value_statement',
        },
      ],
    },
    {
      id: 'scene-4-history',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"When other guys set boundaries?\" She laughs, but it's hollow. \"They usually realized they were being ridiculous and apologized.\" She looks at you. \"The ones who didn't... well, they're exes for a reason.\"",
          speakerId: 'manipulator',
          emotion: 'cold',
        },
        {
          text: "There it is. Comply or be discarded. The subtext is clear.",
        },
        {
          speakerId: 'inner-voice',
          text: "She just told you: bend to her or be replaced. That's not a partner. That's a warden.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c4e-fold',
          text: '"I don\'t want to be an ex. Maybe I was being too cautious."',
          nextSceneId: 'ending-bad-apologized',
          feedback: 'TRAP: You just told her your boundaries are negotiable.',
        },
        {
          id: 'c4e-hold',
          text: '"Sounds like they had good instincts. So do I."',
          nextSceneId: 'ending-good-walked',
          xpBonus: 20,
          isOptimal: true,
          feedback: 'OPTIMAL: You heard the threat and responded with clarity. This is over.',
          tactic: 'dignified_exit',
        },
      ],
    },
    {
      id: 'scene-4-questioned',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "\"Why?\" She looks hurt. \"Because I see potential. Because when you know, you know. I've wasted so much time on guys who weren't sure. I just want someone who's all in.\"",
          speakerId: 'manipulator',
          emotion: 'sad',
        },
        {
          text: "The wounded dove. The pressure. The urgency. All wrapped in vulnerability.",
        },
        {
          speakerId: 'inner-voice',
          text: "She answered a question about her motives with a guilt trip about your uncertainty.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'c4f-guilt',
          text: '"I am sure about you. The trip sounds amazing."',
          nextSceneId: 'ending-bad-isolation',
          feedback: 'Guilt worked. You just traded your judgment for her approval.',
        },
        {
          id: 'c4f-firm',
          text: '"I need to build certainty at my own pace. This is too fast."',
          nextSceneId: 'scene-4-mask-off',
          xpBonus: 18,
          isOptimal: true,
          feedback: 'OPTIMAL: Unmoved by guilt. Your pace is your right.',
          tactic: 'guilt_resistance',
        },
      ],
    },
    {
      id: 'scene-4-confrontation',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You tell her what you've noticed. The intensity. The future talk. The pressure. She stares at you. Then: \"So you've been analyzing me this whole time? Like I'm some kind of specimen?\"",
          speakerId: 'manipulator',
          emotion: 'angry',
        },
        {
          text: "\"I was just excited about you. I was being REAL. And you were... what? Taking notes for your therapist?\"",
          speakerId: 'manipulator',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "DARVO in real time. Deny, Attack, Reverse Victim and Offender.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'c4g-backtrack',
          text: '"You\'re right, I\'m sorry. I think I\'ve been overthinking this."',
          nextSceneId: 'ending-bad-apologized',
          feedback: 'TRAP: You apologized for pattern recognition. Your instincts were right.',
        },
        {
          id: 'c4g-stand',
          text: '"I noticed what I noticed. Your reaction is telling me more."',
          nextSceneId: 'ending-good-confronted',
          xpBonus: 20,
          isOptimal: true,
          feedback: 'OPTIMAL: Unmoved by DARVO. The attack confirms the pattern.',
          tactic: 'darvo_resistance',
        },
      ],
    },
    {
      id: 'scene-4-mask-off',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You declined. Set a boundary. Said no. The mask comes off. \"I guess I misread this. I thought you were different but you're just like every other guy who can't handle a real woman.\"",
          speakerId: 'manipulator',
          emotion: 'angry',
        },
        {
          text: "\"Scared of commitment. Probably intimidated by my success. Good luck finding someone who puts up with your bullshit.\"",
          speakerId: 'manipulator',
          emotion: 'cold',
        },
        {
          text: "48 hours ago you were 'special.' Now you're 'intimidated.' Only her narrative changed.",
        },
      ],
      nextSceneId: 'ending-good-maskoff',
    },

    // ============================================
    // ENDINGS
    // ============================================
    {
      id: 'ending-bad-trapped',
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Trapped in the Web',
      endingSummary:
        "You got caught in the love bomb. The intensity that felt like passion was manufactured dependency. Those butterflies weren't attraction—they were your gut screaming danger.",
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three months later. The woman who adored you now criticizes everything you do. {friend} stopped reaching out—she said he was 'jealous of us.' The love bomb was just the hook. Devaluation is the real relationship.",
        },
        {
          text: "You see her posting on Instagram with some new guy. Same caption she used with you: 'Finally found my person.' The cycle continues—just not with you anymore. You were replaced before you saw it coming.",
        },
      ],
      endingLearnReference: 'narcissist-patterns-101',
      endingLearnPrompt: 'Learn to recognize these patterns earlier.',
    },
    {
      id: 'ending-bad-isolation',
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Isolated and Invested',
      endingSummary:
        "The trip happened. Then came the arguments. The accusations. The isolation. By the time you saw the pattern, you'd invested too much to easily walk away.",
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. You haven't seen {friend} in weeks—she always had a reason why he was 'bad for you.' Your family thinks you've changed. You have. Just not in a good way.",
        },
        {
          text: "Then she leaves. For someone else. Someone she met 'at work.' The trips, the intensity, the promises—they're his now. And you're left wondering how you got here.",
        },
      ],
      endingLearnReference: 'isolation-tactics-101',
      endingLearnPrompt: 'Understand how isolation works.',
    },
    {
      id: 'ending-bad-apologized',
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Apology Loop',
      endingSummary:
        "You apologized for having boundaries. That set the template. Now you apologize for everything—your feelings, your friends, your existence. And she still leaves.",
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You spent a year apologizing for things that weren't wrong. Your boundaries. Your friends. Your family. Your job. Nothing was ever enough. And then she found someone 'who actually appreciates me.'",
        },
        {
          text: "His Instagram shows them on a trip. {destination}. The same trip she offered you. Different target, same playbook.",
        },
      ],
      endingLearnReference: 'boundary-erosion-101',
      endingLearnPrompt: 'Learn why boundaries matter.',
    },
    {
      id: 'ending-bad-game',
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Game Over',
      endingSummary:
        "You thought you were playing a game. She was playing for keeps. The relationship became a competition—and she plays to win, not to love.",
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Every conversation became a battle. Every disagreement became a war. You were always on defense, always losing ground. Until she decided the game was over.",
        },
        {
          text: "She's already with someone new. He looks exhausted too. But he doesn't know yet what game he's playing.",
        },
      ],
      endingLearnReference: 'competitive-dynamics-101',
      endingLearnPrompt: 'Recognize when relationships become competitions.',
    },
    {
      id: 'ending-neutral-stayed',
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Close Call',
      endingSummary:
        'You saw red flags but hesitated. You got out, but not before some damage. Trust your instincts faster next time.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stayed a few more weeks. Against your better judgment. The cracks showed. The charm faded. The control began. You left before it got worse, but the experience left marks.",
        },
        {
          text: "Looking back, you wonder why you didn't trust what you saw sooner. The signs were there from date one.",
        },
      ],
      endingLearnReference: 'trust-instincts-101',
      endingLearnPrompt: 'Learn to trust your gut faster.',
    },
    {
      id: 'ending-good-walked',
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Clean Exit',
      endingSummary:
        'You recognized the patterns. Set boundaries. Walked away before you were hooked. This is awareness.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You ended it. No drama. No explanation. Just a clean exit. Your boundaries protected you. Your awareness saved you.",
        },
        {
          text: "{friend} buys you a beer. \"That could have been bad. You saw it coming.\" You did. And you trusted what you saw.",
        },
      ],
    },
    {
      id: 'ending-good-clean',
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Predator Walks Away',
      endingSummary:
        'You identified the pattern early. Consulted your support system. Made the call. This is what sovereignty looks like.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You never saw {manipulator} again. No drama. No explanation. Just a clean exit. {friend} was right, and you were wise enough to listen.",
        },
        {
          text: "A month later, she's already love-bombing someone else. You recognize the Instagram captions. But that's not your problem anymore.",
        },
      ],
    },
    {
      id: 'ending-good-confronted',
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Mirror',
      endingSummary:
        'You named the pattern to her face. Her reaction confirmed everything. The mask came off—and you walked through the door.',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You told her what you saw. She attacked. You held your ground. The woman who adored you became the woman who accused you. Both versions were masks.",
        },
        {
          text: "But you saw the real one underneath. And you chose to walk away from all of them.",
        },
      ],
    },
    {
      id: 'ending-good-maskoff',
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Reveal',
      endingSummary:
        'You set a boundary. She showed you who she really was. The love bomb turned to venom—proving the love was never real.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "48 hours ago, you were 'special.' 'Different.' 'The one.' Now you're 'intimidated' and 'can't handle a real woman.' Nothing changed about you. Everything changed about her mask.",
        },
        {
          text: "That rush you felt on date one? You recognized it now. Not chemistry. Warning. And you listened.",
        },
      ],
    },
  ],
};
