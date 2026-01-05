// Scenario: The Green Flags (Male Version)
// Learn to recognize healthy relationship patterns without sabotaging them
// Adapted for male psychology - targeting ego, provider instincts, and chase addiction
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../../types';

export const maleHealthyConnectionScenario: Scenario = {
  id: 'male-healthy-connection',
  title: 'The Green Flags',
  tagline: 'What does healthy even look like?',
  description:
    "After dating women who kept you guessing, you've met Emma - someone who actually seems... stable. But can you trust peace? Or will you get bored because calm doesn't trigger your chase instinct?",
  tier: 'free',
  estimatedMinutes: 12,
  difficulty: 'beginner',
  category: 'healthy',
  xpReward: 125,
  badgeId: 'healthy-detector',
  targetGender: 'male',

  templates: {
    partner: ['Emma', 'Sophie', 'Rachel', 'Anna', 'Claire'],
    friend: ['Mike', 'Jake', 'Connor', 'Tyler', 'Brandon'],
  },

  tacticsLearned: [
    'Green flag recognition',
    'Healthy communication patterns',
    'Secure attachment behaviors',
    'Peace vs chase discernment',
    'Self-sabotage prevention',
  ],
  redFlagsTaught: [
    'Confusing "easy" with boring',
    'Chasing unavailable women from habit',
    'Testing stable partners to destruction',
    'Mistaking drama for passion',
    'Running when it gets real',
  ],

  characters: [
    {
      id: 'emma',
      name: 'Emma',
      description:
        'Emotionally available, direct, and consistent. No games, no drama. She gives you peace, not anxiety.',
      traits: ['secure', 'communicative', 'consistent'],
      defaultEmotion: 'happy',
    },
    {
      id: 'inner-voice',
      name: 'Your Inner Voice',
      description:
        'The part of you shaped by past experiences. Sometimes protective, sometimes self-sabotaging.',
      traits: ['cautious', 'healing'],
      defaultEmotion: 'confused',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    // ============================================
    // SCENE 1: The Late Text
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Third date with {partner}. You texted you'd be 10 minutes late. Traffic. Your phone buzzes: \"No worries! Already grabbed a table. Got you a coffee - hope black is okay?\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: "She's not upset. No passive-aggressive \"it's fine.\" Just understanding.",
          emotion: 'confused',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: '"Thanks! Sorry again, be there soon."',
          nextSceneId: 'scene-2a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'accepting_grace',
          feedback: 'OPTIMAL: She handled it well. You acknowledged it. No drama needed.',
        },
        {
          id: 'choice-1b',
          text: "Don't respond. Let her wait.",
          nextSceneId: 'scene-2b-ghost',
          xpBonus: 0,
          feedback: 'TRAP: Playing games with someone who gave you grace. Why?',
        },
        {
          id: 'choice-1c',
          text: "Feel suspicious. Why isn't she more upset?",
          nextSceneId: 'scene-2c',
          xpBonus: 5,
          feedback: "Past trauma talking. Healthy people don't punish honest communication.",
        },
        {
          id: 'choice-1d',
          text: '"You didn\'t have to do that." (Deflect the kindness)',
          nextSceneId: 'scene-2d-deflect',
          xpBonus: 8,
          feedback: 'Close. You struggle accepting care. Work on receiving.',
        },
      ],
    },

    // ============================================
    // SCENE 2A: Normal arrival
    // ============================================
    {
      id: 'scene-2a',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You arrive. {partner} waves from a corner booth, genuine smile. \"Traffic's brutal today. My friend got stuck for an hour on the bridge.\" She's making you feel better about being late.",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "\"So, big presentation this week, right? The Henderson account?\" She remembered. You mentioned it once.",
          speakerId: 'emma',
          emotion: 'happy',
        },
      ],
      nextSceneId: 'scene-3',
    },

    // ============================================
    // SCENE 2B-GHOST: You didn't respond
    // ============================================
    {
      id: 'scene-2b-ghost',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You arrive 25 minutes late. No text, no explanation. {partner} looks up from her phone. \"Hey! I was starting to worry. Everything okay?\"",
          speakerId: 'emma',
          emotion: 'concerned',
        },
        {
          text: "No accusation. No guilt trip. Just genuine concern. Your ex would have been ice-cold by now.",
        },
      ],
      nextSceneId: 'scene-2b-ghost-response',
    },
    {
      id: 'scene-2b-ghost-response',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"Just traffic,\" you say casually. She nods. \"Okay. Well, the coffee might be cold now. Want me to grab you a fresh one?\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: "She's being kind. You were rude. Why does her patience feel unsettling?",
          emotion: 'confused',
        },
      ],
      choices: [
        {
          id: 'choice-2b-a',
          text: '"Actually, I should have texted. Sorry about that."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Recovery. Owning your behavior when she gave you room to.',
        },
        {
          id: 'choice-2b-b',
          text: '"It\'s fine. Let\'s just eat."',
          nextSceneId: 'scene-3-cold',
          xpBonus: 5,
          feedback: "She noticed the distance. You're creating problems that don't exist.",
        },
        {
          id: 'choice-2b-c',
          text: 'Keep the mystery going. Don\'t over-explain.',
          nextSceneId: 'scene-mystery-backfire',
          xpBonus: 0,
          feedback: "TRAP: \"Mystery\" with a healthy person just reads as disinterest.",
        },
      ],
    },

    // ============================================
    // SCENE 2C: Suspicious arrival
    // ============================================
    {
      id: 'scene-2c',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You arrive, slightly guarded. \"You okay? You seem tense.\" She noticed. She asked directly instead of playing games.",
          speakerId: 'emma',
          emotion: 'concerned',
        },
        {
          text: "{partner} isn't your ex. Maybe that's the point.",
        },
      ],
      nextSceneId: 'scene-3',
    },

    // ============================================
    // SCENE 2D-DEFLECT: Deflecting kindness
    // ============================================
    {
      id: 'scene-2d-deflect',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "She tilts her head. \"I wanted to. That's what you do when you're excited to see someone.\" She said it simply. No manipulation. Just honesty.",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "The directness catches you off guard. Your ex weaponized kindness. {partner} just... does kind things.",
        },
      ],
      nextSceneId: 'scene-3',
    },

    // ============================================
    // SCENE MYSTERY-BACKFIRE: Games don't work on her
    // ============================================
    {
      id: 'scene-mystery-backfire',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The date continues but something's off. {partner} is present but measured. At the end: \"This was nice. But I'm getting mixed signals. Are you actually interested?\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "A secure woman doesn't chase mixed signals. She asks directly.",
        },
        {
          speakerId: 'inner-voice',
          text: "She's not playing the game. She's calling you out.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-mystery-a',
          text: '"Yeah, I am. Sorry - I think I\'m just used to... different dynamics."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: Honesty saves it. She appreciates vulnerability.',
        },
        {
          id: 'choice-mystery-b',
          text: '"I thought playing it cool was attractive."',
          nextSceneId: 'scene-3-salvage',
          xpBonus: 8,
          feedback: 'Semi-honest. She gets it but you showed your hand.',
        },
        {
          id: 'choice-mystery-c',
          text: '"If you can\'t handle a little mystery, maybe this won\'t work."',
          nextSceneId: 'scene-early-bad-ending',
          xpBonus: 0,
          feedback: 'TRAP: Doubling down on games with someone who values authenticity.',
        },
      ],
    },

    // ============================================
    // SCENE EARLY-BAD-ENDING: Lost her with games
    // ============================================
    {
      id: 'scene-early-bad-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{partner} nods slowly. \"Okay. I think we're looking for different things.\" She stands. \"I had a nice time. Take care.\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "No argument. No second chance. She simply... left. Your \"mystery\" worked exactly as designed. It pushed her away.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Game Player',
      endingSummary:
        "You tried to play games with a woman who doesn't play games. She didn't chase. She just left. The tactics that \"work\" on insecure women repel secure ones.",
      endingLearnReference: 'Secure women don\'t chase ambivalence - they walk.',
      endingLearnPrompt: 'What could you have done differently when she asked if you were interested?',
    },

    // ============================================
    // SCENE 3-SALVAGE: Recovered from games
    // ============================================
    {
      id: 'scene-3-salvage',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "She laughs softly. \"Look, I've been through the dating app circus. I don't need mystery. I need someone who shows up.\" She pauses. \"Can you do that?\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "It's a simple question. A real one. No games attached.",
        },
      ],
      nextSceneId: 'scene-3',
    },

    // ============================================
    // SCENE 3-COLD: Emotionally distant path
    // ============================================
    {
      id: 'scene-3-cold',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The date continues but there's a wall. {partner} notices. She doesn't push, but her warmth has cooled slightly.",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "\"So, how's work going?\" she asks. Safe territory. You've made her cautious.",
        },
      ],
      nextSceneId: 'scene-4-cold',
    },

    // ============================================
    // SCENE 3: The Good News
    // ============================================
    {
      id: 'scene-3',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The conversation flows easily. \"The Henderson thing went well. Boss said I nailed it.\" {partner}'s face lights up. \"That's amazing! I knew you would. You were so prepared.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "No jealousy. No subtle competition. Just happiness for you.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Your ex made everything about her. Even your wins.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: '"Thanks! What about you? How\'s the project going?"',
          nextSceneId: 'scene-4a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'reciprocity',
          feedback: 'OPTIMAL: Healthy relationships are mutual. Interest goes both ways.',
        },
        {
          id: 'choice-3b',
          text: '"It wasn\'t that big a deal..."',
          nextSceneId: 'scene-4b',
          xpBonus: 8,
          feedback: 'Deflecting genuine praise. Why are you uncomfortable being celebrated?',
        },
        {
          id: 'choice-3c',
          text: 'Feel suspicious. Is she buttering you up for something?',
          nextSceneId: 'scene-4c',
          xpBonus: 5,
          feedback: "Past experiences making you suspicious of kindness. Not everyone has an angle.",
        },
        {
          id: 'choice-3d',
          text: 'Downplay it to seem humble. "Anyone could have done it."',
          nextSceneId: 'scene-4b',
          xpBonus: 5,
          feedback: "False modesty. You worked hard. Owning success isn't arrogance.",
        },
      ],
    },

    // ============================================
    // SCENE 4-COLD: Still distant
    // ============================================
    {
      id: 'scene-4-cold',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"Pretty good. Got a promotion actually.\" You wait for more but she doesn't offer it. There's distance now. The warmth from earlier is gone.",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "You did this. She was open. You made her careful.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-4cold-a',
          text: '"Hey, I think I started this off weird. Can we reset?"',
          nextSceneId: 'scene-4a',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: Naming the elephant. Taking responsibility. Recovery.',
        },
        {
          id: 'choice-4cold-b',
          text: 'Keep pushing through. It\'ll get better.',
          nextSceneId: 'scene-5-distant',
          xpBonus: 5,
          feedback: 'Avoidance. The wall stays up. The connection weakens.',
        },
      ],
    },

    // ============================================
    // SCENE 4A: Reciprocity - she shares
    // ============================================
    {
      id: 'scene-4a',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{partner} sighs. \"Honestly? Rough week. Lost a client I'd been working on for months.\" She catches herself. \"Sorry, I don't want to bring down the mood.\"",
          speakerId: 'emma',
          emotion: 'sad',
        },
        {
          text: "She shared something real, then pulled back. Not hiding, not dumping.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Your ex either hid everything or made every night about her problems.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-4a-1',
          text: '"No, tell me. That sounds really hard."',
          nextSceneId: 'scene-5',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'holding_space',
          feedback: 'OPTIMAL: Creating space for her. This is how connection builds.',
        },
        {
          id: 'choice-4a-2',
          text: '"Yeah, let\'s keep it light."',
          nextSceneId: 'scene-5',
          xpBonus: 8,
          feedback: 'Not wrong, but you missed a chance to show you can handle depth.',
        },
        {
          id: 'choice-4a-3',
          text: 'Change subject. You don\'t want to hear about her problems.',
          nextSceneId: 'scene-5-shallow',
          xpBonus: 0,
          feedback: 'TRAP: She opened up. You shut it down. Emotional avoidance.',
        },
      ],
    },

    // ============================================
    // SCENE 4B: Deflecting praise
    // ============================================
    {
      id: 'scene-4b',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{partner} tilts her head. \"It clearly was a big deal. You worked hard for it. Own your wins.\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "She's not letting you shrink yourself.",
        },
      ],
      nextSceneId: 'scene-5',
    },

    // ============================================
    // SCENE 4C: Suspicious of kindness
    // ============================================
    {
      id: 'scene-4c',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You catch yourself scanning for the angle. The ask. The manipulation. It doesn't come. {partner} just keeps talking. Asking questions. Being present.",
        },
        {
          text: "Not everyone is playing a game. Some people are just genuine.",
        },
      ],
      nextSceneId: 'scene-5',
    },

    // ============================================
    // SCENE 5-SHALLOW: Avoided depth
    // ============================================
    {
      id: 'scene-5-shallow',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "She blinks. \"Oh. Okay.\" Her smile stays but something dims. You talked about safe topics. The weather. Movies. Nothing real.",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "At the end: \"This was nice. Let's do it again sometime.\" It sounded like politeness, not enthusiasm.",
        },
      ],
      nextSceneId: 'scene-5-shallow-2',
    },
    {
      id: 'scene-5-shallow-2',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Three days pass. You text her. \"Hey, free this weekend?\" She responds: \"Actually I've got plans. Maybe next week?\"",
        },
        {
          speakerId: 'inner-voice',
          text: "Vague. Non-committal. You kept her at arm's length. She's returning the energy.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-shallow-a',
          text: '"Sure, let me know when works." (Match her energy)',
          nextSceneId: 'scene-fade-neutral',
          xpBonus: 5,
          feedback: 'You matched the distance. The connection fades quietly.',
        },
        {
          id: 'choice-shallow-b',
          text: '"I\'d really like to see you. I think I was a bit guarded last time."',
          nextSceneId: 'scene-5',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: Vulnerability. Naming what happened. This could save it.',
        },
      ],
    },

    // ============================================
    // SCENE 5-DISTANT: Still avoiding
    // ============================================
    {
      id: 'scene-5-distant',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The date ends cordially. Awkward hug. \"This was nice,\" she says without conviction.",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "Two days later, you text. She responds after six hours. Short. Polite. The warmth is gone.",
        },
      ],
      nextSceneId: 'scene-fade-neutral',
    },

    // ============================================
    // SCENE FADE-NEUTRAL: Connection fades
    // ============================================
    {
      id: 'scene-fade-neutral',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A week passes. Then two. Texts get shorter. Plans get vaguer. You never officially end things. It just... stops.",
        },
        {
          text: "Three months later, you see her Instagram. She's dating someone. He looks relaxed. Happy. In the photos, she looks at him the way she used to look at you—that first date, before you put up walls.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Slow Fade',
      endingSummary:
        "No dramatic ending. Just distance creating distance. She found someone who could receive her warmth. You're still looking.",
      endingLearnReference: 'Emotional walls push away emotional availability.',
      endingLearnPrompt: 'At what point could you have opened up instead of protecting yourself?',
    },

    // ============================================
    // SCENE 5: Weekend Plans
    // ============================================
    {
      id: 'scene-5',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Later, she mentions weekend plans. \"I'm hiking with my sister Saturday. But Sunday I'm free if you want to do something.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "She has her own life. She's not orbiting you.",
        },
        {
          speakerId: 'inner-voice',
          text: "GREEN FLAG: Her own life AND making time for you. That's healthy independence.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: '"Sunday works. Have fun hiking."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'secure_response',
          feedback: "OPTIMAL: You're not threatened by her having a life. That's maturity.",
        },
        {
          id: 'choice-5b',
          text: '"Who are you hiking with? Just your sister?"',
          nextSceneId: 'scene-6b',
          xpBonus: 5,
          feedback: 'Jealousy showing. She told you: her sister. Why the interrogation?',
        },
        {
          id: 'choice-5c',
          text: '"Maybe. I might be busy. Let you know."',
          nextSceneId: 'scene-6c',
          xpBonus: 0,
          feedback: 'TRAP: Playing games. You want to see her. Why pretend otherwise?',
        },
        {
          id: 'choice-5d',
          text: '"Why not do something Saturday instead?"',
          nextSceneId: 'scene-6d-saturday',
          xpBonus: 8,
          feedback: 'Testing if she\'ll cancel plans for you. She shouldn\'t have to prove herself.',
        },
      ],
    },

    // ============================================
    // SCENE 6A: Secure response - Sunday date
    // ============================================
    {
      id: 'scene-6a',
      backgroundId: 'park',
      dialog: [
        {
          text: "Sunday. You meet at a farmer's market. {partner}'s wearing sunglasses, relaxed smile. \"The hike was brutal. My legs are dead.\" She shows you photos—her sister making stupid faces, the view from the summit.",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "\"My sister wants to meet you, by the way. No pressure.\" She's sharing her world. Naturally. No pressure.",
        },
      ],
      nextSceneId: 'scene-7',
    },

    // ============================================
    // SCENE 6B: Jealousy questioned
    // ============================================
    {
      id: 'scene-6b',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{partner} raises an eyebrow. \"Yeah, just Sarah. We try to hike once a month.\" She pauses. \"Why?\"",
          speakerId: 'emma',
          emotion: 'confused',
        },
        {
          text: "She noticed the energy shift. She's asking directly. A secure person doesn't let suspicious questions slide.",
        },
        {
          speakerId: 'inner-voice',
          text: 'She called it out. What do you say?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6b-a',
          text: '"Sorry, old habits. My ex was... complicated."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'owning_patterns',
          feedback: 'OPTIMAL: Acknowledging your patterns without blaming her. Growth.',
        },
        {
          id: 'choice-6b-b',
          text: '"Just asking. Never mind."',
          nextSceneId: 'scene-6b-deflect',
          xpBonus: 5,
          feedback: 'Deflecting when called out. You made it weird, then denied it.',
        },
        {
          id: 'choice-6b-c',
          text: '"Can\'t a guy just ask a question?"',
          nextSceneId: 'scene-6b-defensive',
          xpBonus: 0,
          feedback: 'TRAP: Getting defensive when she set a reasonable boundary.',
        },
      ],
    },

    // ============================================
    // SCENE 6B-DEFLECT: Deflected jealousy call-out
    // ============================================
    {
      id: 'scene-6b-deflect',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "She studies you for a moment. \"Okay.\" The subject changes but she's noted it. A small flag filed away.",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "Secure people track patterns. One odd question is nothing. A pattern of odd questions? That's data.",
        },
      ],
      nextSceneId: 'scene-6a',
    },

    // ============================================
    // SCENE 6B-DEFENSIVE: Got defensive
    // ============================================
    {
      id: 'scene-6b-defensive',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"Sure. But that question had energy behind it.\" She doesn't back down. Doesn't escalate either. \"I'm not going to pretend I didn't notice.\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "This is what secure looks like. Direct. Not aggressive. Not passive-aggressive. Just honest.",
        },
        {
          speakerId: 'inner-voice',
          text: "She's right. And she's not punishing you for it. She's just naming it.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6bdef-a',
          text: '"You\'re right. I\'m sorry. That was weird of me."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good recovery. Owning it instead of fighting.',
        },
        {
          id: 'choice-6bdef-b',
          text: '"Whatever. Can we move on?"',
          nextSceneId: 'scene-6-tension',
          xpBonus: 0,
          feedback: 'TRAP: Dismissive. She tried to have an adult conversation.',
        },
      ],
    },

    // ============================================
    // SCENE 6-TENSION: Created tension
    // ============================================
    {
      id: 'scene-6-tension',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The date ends early. \"I've got some stuff to do,\" she says. The kiss goodbye is brief.",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "A week later, she's \"busy.\" Two weeks later, she's still \"busy.\" You see her Instagram story—at a bar with friends. You weren't invited.",
        },
      ],
      nextSceneId: 'scene-lost-connection',
    },

    // ============================================
    // SCENE 6C: Playing games - maybe busy
    // ============================================
    {
      id: 'scene-6c',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{partner} nods. \"Cool, let me know.\" She doesn't chase. Doesn't get upset. Just respects your space.",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "Why doesn't that feel like a win?",
        },
        {
          speakerId: 'inner-voice',
          text: "Because you're used to women fighting for your attention. Her security isn't indifference. It's self-respect.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6c-a',
          text: 'Text her Saturday: "Sunday works actually. Where should we meet?"',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'RECOVERY: You caught yourself playing games and course-corrected.',
        },
        {
          id: 'choice-6c-b',
          text: 'Wait for her to reach out first.',
          nextSceneId: 'scene-6c-waiting',
          xpBonus: 0,
          feedback: 'TRAP: Playing chicken with a woman who has self-respect. You\'ll lose.',
        },
      ],
    },

    // ============================================
    // SCENE 6C-WAITING: Waited for her to chase
    // ============================================
    {
      id: 'scene-6c-waiting',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Saturday passes. Sunday comes. Your phone stays silent. She didn't text. She didn't chase.",
        },
        {
          text: "By Monday, you realize: she's not playing hard to get. She's just not getting played.",
        },
        {
          speakerId: 'inner-voice',
          text: "The games that worked on insecure women? They repel secure ones.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-6cwait-a',
          text: 'Text her: "Hey, sorry I went quiet. Can I take you out this week?"',
          nextSceneId: 'scene-6c-recovery',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'RECOVERY: Swallowing pride. Choosing connection over ego.',
        },
        {
          id: 'choice-6cwait-b',
          text: 'She should have texted. Next.',
          nextSceneId: 'scene-lost-connection',
          xpBonus: 0,
          feedback: 'TRAP: Your pride cost you someone good.',
        },
      ],
    },

    // ============================================
    // SCENE 6C-RECOVERY: Recovering from games
    // ============================================
    {
      id: 'scene-6c-recovery',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "She responds: \"I was wondering if I'd hear from you. :) Thursday works.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "No punishment. No \"where were you?\" Just... grace. Thursday, you show up on time. Present. No games.",
        },
      ],
      nextSceneId: 'scene-7',
    },

    // ============================================
    // SCENE 6D-SATURDAY: Testing if she'll cancel
    // ============================================
    {
      id: 'scene-6d-saturday',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"I have plans with my sister. We do this monthly—it's our thing.\" She smiles. \"But Sunday I'm all yours.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "She didn't cancel her life for you. And she's not apologizing for having one.",
        },
        {
          speakerId: 'inner-voice',
          text: "RED FLAG ON YOU: You wanted her to drop her plans. Why?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-6d-a',
          text: '"Sunday sounds great."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good. You recognized the test was yours, not hers.',
        },
        {
          id: 'choice-6d-b',
          text: '"It would be nice if you made me more of a priority."',
          nextSceneId: 'scene-6d-priority',
          xpBonus: 0,
          feedback: 'TRAP: Third date and you\'re demanding she rearrange her life.',
        },
      ],
    },

    // ============================================
    // SCENE 6D-PRIORITY: Demanded priority too soon
    // ============================================
    {
      id: 'scene-6d-priority',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{partner}'s smile fades. \"We've been on three dates. I like you. But I'm not going to cancel standing commitments for someone I'm still getting to know.\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "\"If that's a dealbreaker for you, I understand.\" She's not mean. She's just clear.",
        },
        {
          speakerId: 'inner-voice',
          text: "She's right. And you know it.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-6dpri-a',
          text: '"You\'re right. That was unfair. Sunday works."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Good recovery. Owning unreasonable expectations.',
        },
        {
          id: 'choice-6dpri-b',
          text: '"Fine. I just thought you were more interested."',
          nextSceneId: 'scene-lost-connection',
          xpBonus: 0,
          feedback: 'TRAP: Guilt trip. She IS interested. Within reason.',
        },
      ],
    },

    // ============================================
    // SCENE LOST-CONNECTION: Pushed her away
    // ============================================
    {
      id: 'scene-lost-connection',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A month later. You're telling {friend} about {partner}. \"I don't know what happened, man. She just got distant.\"",
        },
        {
          text: "\"Wait, which one was she? The one you kept testing?\"",
        },
        {
          text: "You don't answer. You scroll through the apps instead. Looking for someone who makes you feel that spark. That uncertainty.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Self-Sabotage',
      endingSummary:
        'You tested a good thing until it broke. Your need for drama pushed away someone who offered peace.',
      endingLearnReference: 'Secure partners don\'t tolerate endless testing.',
      endingLearnPrompt: 'What pattern of behavior pushed her away?',
    },

    // ============================================
    // SCENE 7: The Ex Text
    // ============================================
    {
      id: 'scene-7',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A few weeks in. You're at her place. Her phone lights up—text from \"Josh.\" \"Hey, hope the new guy treats you right. Miss hanging out.\"",
        },
        {
          text: "Your jaw tightens. {partner} sees you saw it. \"That's Josh. We dated briefly. Ended as friends. I'll respond later with something casual.\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "She didn't hide it. Explained before you asked. Invited conversation.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: '"Thanks for telling me. I appreciate the transparency."',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'trust_building',
          feedback: 'OPTIMAL: Recognizing transparency. This is how trust builds.',
        },
        {
          id: 'choice-7b',
          text: '"I don\'t want you talking to your ex."',
          nextSceneId: 'scene-8',
          xpBonus: 5,
          feedback: 'Control impulse. She did nothing wrong. She was honest first.',
        },
        {
          id: 'choice-7c',
          text: '"It\'s fine." (It\'s not fine.)',
          nextSceneId: 'scene-7-suppressed',
          xpBonus: 8,
          feedback: 'Suppressing instead of communicating. If it bothers you, say so.',
        },
        {
          id: 'choice-7d',
          text: '"Why is your ex texting you?"',
          nextSceneId: 'scene-7-accusation',
          xpBonus: 0,
          feedback: 'TRAP: Accusatory tone when she was proactively transparent.',
        },
      ],
    },

    // ============================================
    // SCENE 7-SUPPRESSED: Suppressed feelings
    // ============================================
    {
      id: 'scene-7-suppressed',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "She reads you. \"You sure? Your face says otherwise.\" She touches your arm. \"I'd rather you tell me if something bugs you. I can handle honesty.\"",
          speakerId: 'emma',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "She's inviting communication. Take the invitation.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-7sup-a',
          text: '"Yeah, it bugs me a little. Not sure why."',
          nextSceneId: 'scene-8-honest',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: Honest vulnerability. This builds intimacy.',
        },
        {
          id: 'choice-7sup-b',
          text: '"No, really, it\'s fine."',
          nextSceneId: 'scene-7-buried',
          xpBonus: 5,
          feedback: 'Doubling down on avoidance. The resentment will fester.',
        },
      ],
    },

    // ============================================
    // SCENE 7-BURIED: Buried feelings
    // ============================================
    {
      id: 'scene-7-buried',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "She lets it go. But you don't. Over the next few weeks, you bring up Josh twice. Indirectly. Passive-aggressively.",
        },
        {
          text: "\"You're doing that thing where you're upset but won't say why,\" she says one night. \"I've asked you to talk to me. I can't read your mind.\"",
          speakerId: 'emma',
          emotion: 'sad',
        },
        {
          text: "She's right. And you know it. But admitting it feels like losing.",
        },
      ],
      nextSceneId: 'scene-neutral-ending-2',
    },

    // ============================================
    // SCENE 7-ACCUSATION: Accused her
    // ============================================
    {
      id: 'scene-7-accusation',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner}'s expression shifts. \"I just told you why. He texted. I told you immediately. What else am I supposed to do?\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "She's not defensive. She's confused. She did everything right and you're treating her like she did something wrong.",
        },
        {
          speakerId: 'inner-voice',
          text: "This is your issue. Not hers.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-7acc-a',
          text: '"You\'re right. I\'m sorry. That wasn\'t fair."',
          nextSceneId: 'scene-8-honest',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good catch. You recognized the projection.',
        },
        {
          id: 'choice-7acc-b',
          text: '"I just find it weird that exes text."',
          nextSceneId: 'scene-8',
          xpBonus: 5,
          feedback: 'Doubling down on insecurity. She\'s still being patient.',
        },
      ],
    },

    // ============================================
    // SCENE 8-HONEST: Honest conversation
    // ============================================
    {
      id: 'scene-8-honest',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} softens. \"Thank you for telling me. That's all I want—for us to be honest with each other.\" She leans in. \"You're not competing with Josh. You're here. He's not.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "Simple. Direct. Reassuring without being performative.",
        },
      ],
      nextSceneId: 'scene-good-ending',
    },

    // ============================================
    // SCENE 8: Control impulse - boundary time
    // ============================================
    {
      id: 'scene-8',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} pauses. \"I hear that it makes you uncomfortable. But I can't cut off someone who's done nothing wrong. If you don't trust me based on my actions, controlling who I talk to won't fix that.\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "That's reasonable. She's setting a boundary.",
        },
        {
          speakerId: 'inner-voice',
          text: "A secure person doesn't abandon healthy friendships to soothe insecurity. They address the insecurity.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: '"You\'re right. I\'m sorry. Let me work on this."',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'self_reflection',
          feedback: 'OPTIMAL: Growth. Recognizing your pattern and choosing differently.',
        },
        {
          id: 'choice-8b',
          text: '"Whatever. Do what you want."',
          nextSceneId: 'scene-bad-ending',
          xpBonus: 0,
          feedback: 'TRAP: Shutting down. You wanted her to cave. She had boundaries.',
        },
        {
          id: 'choice-8c',
          text: '"If you cared about me, you\'d do this one thing."',
          nextSceneId: 'scene-ultimatum-ending',
          xpBonus: 0,
          feedback: 'TRAP: Manipulation. Healthy people don\'t issue ultimatums over nothing.',
        },
      ],
    },

    // ============================================
    // ENDINGS
    // ============================================
    {
      id: 'scene-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. You're telling {friend} about {partner}. \"It's weird, man. I don't have anxiety about where we stand. She texts back. She shows up. She communicates. No drama.\"",
        },
        {
          text: "\"Is it boring?\"",
        },
        {
          text: "\"No. It's peaceful. I didn't know relationships could feel this way.\"",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Learning to Receive',
      endingSummary:
        "You recognized healthy patterns and didn't self-sabotage. You chose peace over chaos, security over drama. This is growth.",
    },

    {
      id: 'scene-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things fizzle with {partner}. Not dramatically—she's not the type. \"I think we want different things,\" she says gently. \"I like you. But I can feel you holding back. Waiting for something to go wrong.\"",
        },
        {
          text: "She wasn't wrong.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The One That Got Away',
      endingSummary:
        'Your walls protected you from nothing and cost you something real. Healthy love requires vulnerability.',
      endingLearnReference: 'Emotional unavailability pushes away emotionally available partners.',
      endingLearnPrompt: 'What walls did you put up that prevented connection?',
    },

    {
      id: 'scene-neutral-ending-2',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Two months later. {partner} ends it. \"I've tried. You won't let me in. I don't think you're a bad guy. I just think you're not ready.\"",
          speakerId: 'emma',
          emotion: 'sad',
        },
        {
          text: "You want to argue but she's right. You buried every uncomfortable feeling until they poisoned the relationship.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Buried Truth',
      endingSummary:
        'Suppressing feelings doesn\'t make them go away. It makes them toxic. She needed a partner, not a puzzle.',
      endingLearnReference: 'Avoidance creates distance, not safety.',
      endingLearnPrompt: 'What would have changed if you\'d been honest about your feelings earlier?',
    },

    {
      id: 'scene-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You push {partner} away. She lets you. \"I wish you the best.\" No drama. No begging. Just a clean exit.",
        },
        {
          text: "You're back on the apps. Matching with someone \"exciting.\" Red flags everywhere. But that's familiar.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Choosing Chaos',
      endingSummary:
        "You rejected healthy because it felt unfamiliar. You called peace 'boring' and went back to chasing drama.",
      endingLearnReference: 'Mistaking anxiety for attraction leads back to toxic patterns.',
      endingLearnPrompt: 'Why did peace feel wrong to you?',
    },

    {
      id: 'scene-ultimatum-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{partner} stands up. \"I'm not going to be manipulated into cutting off friends. That's not how healthy relationships work.\" She grabs her keys. \"I think this was a mistake.\"",
          speakerId: 'emma',
          emotion: 'cold',
        },
        {
          text: "A month later, you see her tagged in a photo. Happy. With someone else. He looks like the type who doesn't play games.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Ultimatum',
      endingSummary:
        'You tried to control a woman who refused to be controlled. Secure people leave when they see manipulation. She saw it.',
      endingLearnReference: 'Ultimatums over healthy friendships signal insecurity, not care.',
      endingLearnPrompt: 'What drove the need for control in that moment?',
    },
  ],
};
