// Scenario: The Family Introduction (v3)
// 3 paths: The Enmeshed, The Hostile, The Performative
// Navigate different family dynamics strategically

import type { Scenario } from '../types';

export const familyIntroductionScenario: Scenario = {
  id: 'family-introduction',
  title: 'The Family Introduction',
  tagline: 'Win the family, win the war.',
  description:
    "You've been dating Ethan for four months. He's taking you to meet his parents. But the family dynamic you walk into will determine your strategy. Can you read the room and play it right?",
  tier: 'premium',
  estimatedMinutes: 18,
  difficulty: 'intermediate',
  category: 'healthy',
  xpReward: 175,
  badgeId: 'family-strategist',

  templates: {
    partner: ['Ethan', 'Connor', 'Nathan', 'Ryan', 'Tyler'],
    mother: ['Linda', 'Karen', 'Susan', 'Patricia', 'Barbara'],
    father: ['Mike', 'Robert', 'David', 'James', 'William'],
    sister: ['Katie', 'Jessica', 'Ashley', 'Amanda', 'Nicole'],
  },

  tacticsLearned: [
    'Reading family dynamics quickly',
    'Boundary protection in enmeshed families',
    'Grace under hostile fire',
    'Detecting performative warmth',
    'Strategic family integration',
  ],
  redFlagsTaught: [
    'Enmeshment (partner can\'t set boundaries with parents)',
    'Family hostility disguised as "protectiveness"',
    'Performative perfection hiding dysfunction',
    'Partner silence during family attacks',
    'Triangulation and loyalty tests',
  ],

  characters: [
    {
      id: 'ethan',
      name: 'Ethan',
      description: 'Your boyfriend. Good guy, but his family dynamic may reveal things about him.',
      traits: ['loyal', 'family-oriented', 'nervous'],
      defaultEmotion: 'happy',
    },
    {
      id: 'linda',
      name: 'Linda',
      description: "Ethan's mother. Her role in the family will become clear quickly.",
      traits: ['influential', 'observant', 'complex'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'katie',
      name: 'Katie',
      description: "Ethan's sister. Often the most honest one in the family.",
      traits: ['sharp', 'loyal', 'observant'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'mike',
      name: 'Mike',
      description: "Ethan's father. His behavior often reveals the family power structure.",
      traits: ['quiet', 'observant', 'measured'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'Your gut reading of family dynamics.',
      traits: ['intuitive'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    // ============================================
    // OPENING SCENE - The warning
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Sunday morning. You're heading to Ethan's parents' house for lunch. He's been nervous all week. In the car, he finally says it: \"I should probably warn you about my family...\"",
          speakerId: 'ethan',
          emotion: 'confused',
        },
        {
          text: "You wait. Whatever comes next will tell you what you're walking into. And how to play it.",
        },
        {
          speakerId: 'inner-voice',
          text: "Listen carefully. This warning is your briefing.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-enmeshed',
          text: '"My mom is... really involved in my life. Like, REALLY involved."',
          nextSceneId: 'enmesh-1',
          xpBonus: 5,
          feedback: 'The Enmeshed Family. Boundaries are about to be tested.',
        },
        {
          id: 'fork-hostile',
          text: '"They don\'t think anyone is good enough for me. They\'ve been rough on my exes."',
          nextSceneId: 'hostile-1',
          xpBonus: 5,
          feedback: 'The Hostile Family. You\'re walking into resistance.',
        },
        {
          id: 'fork-perform',
          text: '"They seem perfect on the surface. But there\'s... tension underneath."',
          nextSceneId: 'perform-1',
          xpBonus: 5,
          feedback: 'The Performative Family. Perfect surfaces hide messy interiors.',
        },
      ],
    },

    // ============================================
    // PATH A: THE ENMESHED FAMILY
    // ============================================
    {
      id: 'enmesh-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Really involved how?\" you ask. Ethan sighs. \"She calls multiple times a day. Has opinions on everything. My last relationship... she kind of interfered a lot.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"Interfered how?\" \"Would tell my ex she wasn't 'right' for me. My ex said it felt like dating two people.\" He looks at you. \"Mom means well. She's just... protective.\"",
          speakerId: 'ethan',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "Protective, or controlling? Important distinction.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-1a',
          text: '"That sounds challenging. How do YOU feel about her involvement?"',
          nextSceneId: 'enmesh-2-probe',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'diagnostic_question',
          feedback: 'Testing whether he sees the problem or defends it.',
        },
        {
          id: 'enmesh-1b',
          text: '"I\'m sure once she gets to know me, it\'ll be fine."',
          nextSceneId: 'enmesh-2-naive',
          feedback: 'Optimism without information. Enmeshed families don\'t change that easily.',
        },
        {
          id: 'enmesh-1c',
          text: '"That sounds like a lot. Does she respect your boundaries?"',
          nextSceneId: 'enmesh-2-direct',
          xpBonus: 10,
          feedback: 'Direct question about the core issue. Brave.',
        },
      ],
    },
    {
      id: 'enmesh-2-probe',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan pauses. \"I mean... she's my mom. She just wants what's best for me.\" Deflection. He didn't answer how HE feels. He explained HER motivation.",
          speakerId: 'ethan',
          emotion: 'confused',
        },
        {
          text: "\"But does her involvement ever bother you?\" you press gently. Another pause. \"Sometimes. But I don't want to hurt her feelings.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "He can't say no to her without guilt. That's the pattern.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'enmesh-2a',
          text: '"It\'s important that you can set boundaries even when it\'s uncomfortable."',
          nextSceneId: 'enmesh-3-boundary',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'boundary_principle',
          feedback: 'Stating your values early. This is information he needs.',
        },
        {
          id: 'enmesh-2b',
          text: '"That\'s understandable. Family is complicated."',
          nextSceneId: 'enmesh-3-accept',
          feedback: 'Validating without addressing the concern. You\'ll see the issue play out.',
        },
      ],
    },
    {
      id: 'enmesh-2-naive',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan brightens. \"You think so? My last girlfriend couldn't handle it.\" Red flag. He's relieved you're \"handling it\" instead of him addressing the issue.",
        },
        {
          text: "You arrive at the house. Linda opens the door before you even knock. She was watching from the window.",
          speakerId: 'linda',
          emotion: 'happy',
        },
      ],
      nextSceneId: 'enmesh-3-arrival',
    },
    {
      id: 'enmesh-2-direct',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan looks uncomfortable. \"Boundaries... I mean, she's my mom. What am I supposed to do, cut her off?\"",
          speakerId: 'ethan',
          emotion: 'angry',
        },
        {
          text: "All-or-nothing thinking. As if the only options are total access or total rejection. No healthy middle ground in his worldview.",
        },
      ],
      nextSceneId: 'enmesh-3-arrival',
    },
    {
      id: 'enmesh-3-boundary',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan is quiet for a moment. \"I know you're right. I just... it's hard.\" That's honest. He knows there's an issue even if he hasn't fixed it.",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "You arrive. Linda greets Ethan with a hug that lasts too long, then looks you up and down. \"So THIS is her.\" Not hello. Just assessment.",
          speakerId: 'linda',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'enmesh-4-test',
    },
    {
      id: 'enmesh-3-accept',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You arrive. Linda is at the door before you're out of the car. She hugs Ethan, whispers something to him that you can't hear. Then turns to you with a smile that doesn't reach her eyes.",
          speakerId: 'linda',
          emotion: 'neutral',
        },
        {
          text: "\"You must be the new one.\" New one. Not your name. Already positioning you as temporary.",
          speakerId: 'linda',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'enmesh-4-test',
    },
    {
      id: 'enmesh-3-arrival',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"My baby!\" Linda pulls Ethan into an embrace. Doesn't acknowledge you for a full minute. When she does, it's a quick once-over. \"Ethan didn't mention how... young you look.\"",
          speakerId: 'linda',
          emotion: 'smirking',
        },
        {
          text: "Veiled comment. Not quite an insult, but definitely not a compliment. Ethan misses it entirely.",
        },
      ],
      nextSceneId: 'enmesh-4-test',
    },
    {
      id: 'enmesh-4-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "During lunch, Linda dominates. Every topic circles back to Ethan. His childhood. His accomplishments. How well she knows him. \"I always know what he needs. A mother just knows.\"",
          speakerId: 'linda',
          emotion: 'happy',
        },
        {
          text: "Ethan's phone buzzes. Linda glances at it immediately. \"Who's that?\" He shows her. She nods approval. He didn't think to not share. Permission-seeking is automatic.",
        },
        {
          speakerId: 'inner-voice',
          text: "He shows her his phone like a child checking with a parent. Is this the dynamic you want?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'enmesh-4a',
          text: '"Linda, you and Ethan are so close. How do you handle his adult relationships?"',
          nextSceneId: 'enmesh-5-challenge',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'direct_inquiry',
          feedback: 'Naming the dynamic directly. Bold but clarifying.',
        },
        {
          id: 'enmesh-4b',
          text: 'Stay quiet. Observe the dynamic without commenting.',
          nextSceneId: 'enmesh-5-observe',
          xpBonus: 10,
          feedback: 'Gathering data before engaging. Strategic but passive.',
        },
        {
          id: 'enmesh-4c',
          text: 'Compete for Ethan\'s attention. Insert yourself into the dynamic.',
          nextSceneId: 'enmesh-5-compete',
          feedback: 'Competing with mom makes you the outsider fighting for scraps.',
        },
      ],
    },
    {
      id: 'enmesh-5-challenge',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Linda's smile freezes. \"Handle? I don't 'handle' anything. Ethan makes his own choices. I just... guide.\" Guide. Interesting word for control.",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "Ethan shifts uncomfortably. \"Mom, she didn't mean—\" \"No, it's fine.\" Linda cuts him off. \"I know how this looks to outsiders.\"",
          speakerId: 'linda',
          emotion: 'angry',
        },
        {
          speakerId: 'inner-voice',
          text: "Outsiders. You've been labeled. She sees you as a threat to her access.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-5a',
          text: '"I\'m not judging. I just want to understand the family dynamics."',
          nextSceneId: 'enmesh-6-graceful',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'soft_landing',
          feedback: 'De-escalating while holding ground. This is skill.',
        },
        {
          id: 'enmesh-5b',
          text: 'Look to Ethan. Wait for him to say something.',
          nextSceneId: 'enmesh-6-silent',
          feedback: 'Testing if he\'ll stand up. The answer will tell you everything.',
        },
      ],
    },
    {
      id: 'enmesh-5-observe',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You watch. Linda asks about your weekend plans—then immediately inserts herself. \"We should all do something together! Ethan, I'll check your calendar.\"",
          speakerId: 'linda',
          emotion: 'happy',
        },
        {
          text: "Check HIS calendar. Not ask. Check. And he doesn't blink at it.",
        },
      ],
      nextSceneId: 'enmesh-6-decision',
    },
    {
      id: 'enmesh-5-compete',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You try to redirect Ethan's attention. Touch his arm. Make a joke only he would get. Linda's eyes narrow. \"Ethan, honey, can you help me in the kitchen?\"",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "He goes immediately. You're left alone with Katie, who smirks. \"She doesn't share well.\"",
          speakerId: 'katie',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'enmesh-6-decision',
    },
    {
      id: 'enmesh-6-graceful',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Linda relaxes slightly. \"Well. At least you're direct. His last girlfriend just disappeared.\" Katie catches your eye and mouths: 'Mom drove her away.'",
          speakerId: 'linda',
          emotion: 'neutral',
        },
        {
          text: "Later, in the car, you turn to Ethan. \"I need to ask you something. If your mom disapproved of us, what would you do?\"",
        },
        {
          speakerId: 'inner-voice',
          text: "This is the question. His answer is everything.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-6a',
          text: 'Wait for his answer without prompting.',
          nextSceneId: 'enmesh-7-answer',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'silence_pressure',
          feedback: 'Letting him sit with the question. No easy outs.',
        },
        {
          id: 'enmesh-6b',
          text: '"Because I need to know I\'m dating you, not your mother."',
          nextSceneId: 'enmesh-7-direct',
          xpBonus: 10,
          feedback: 'Direct, but might make him defensive. Still necessary.',
        },
      ],
    },
    {
      id: 'enmesh-6-silent',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan says nothing. Linda fills the silence with a redirect. \"More wine, dear?\" The moment passes. He chose not to engage.",
          speakerId: 'ethan',
          emotion: 'neutral',
        },
        {
          text: "Later, Katie pulls you aside. \"He won't stand up to her. No one does. Dad stopped trying years ago.\"",
          speakerId: 'katie',
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'enmesh-7-answer',
    },
    {
      id: 'enmesh-6-decision',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "At the end of the visit, Linda hugs Ethan goodbye—then turns to you with a cool handshake. \"Interesting meeting you.\" Interesting. Not nice. Not lovely. Interesting.",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "In the car, you have to ask. \"Ethan, where do I fit in this picture? Because your mom seems to take up a lot of space.\"",
        },
      ],
      nextSceneId: 'enmesh-7-answer',
    },
    {
      id: 'enmesh-7-answer',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan is quiet for a long moment. \"I love my mom. But... I know she's a lot. I've been working on it.\" He looks at you. \"If she crossed a line with you, I'd say something. I promise.\"",
          speakerId: 'ethan',
          emotion: 'serious',
        },
        {
          text: "A promise. Words. You'll need to see if they translate to action.",
        },
        {
          speakerId: 'inner-voice',
          text: "Words are easy. Watch what happens when she actually tests him.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-7a',
          text: '"I appreciate that. Let\'s see how it goes. I\'ll give it a chance."',
          nextSceneId: 'enmesh-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'conditional_trust',
          feedback: 'Trust but verify. Open but watching.',
        },
        {
          id: 'enmesh-7b',
          text: '"I hope so. Because I won\'t compete with your mother for your attention."',
          nextSceneId: 'enmesh-neutral-ending',
          xpBonus: 10,
          feedback: 'Clear boundary. But harsh delivery might create defensiveness.',
        },
        {
          id: 'enmesh-7c',
          text: '"It\'s fine. All families are like that, right?"',
          nextSceneId: 'enmesh-bad-ending',
          feedback: 'Normalizing dysfunction. All families are NOT like that.',
        },
      ],
    },
    {
      id: 'enmesh-7-direct',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan winces. \"That's... intense.\" He's quiet, then: \"My ex said something similar before she left.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"And what did you do?\" you ask. \"I... I tried to balance them both. It didn't work.\" Tried to balance. Not set boundaries. Balance. Like his mother and girlfriend were equal priorities.",
        },
      ],
      nextSceneId: 'enmesh-neutral-ending',
    },
    // ENMESHED ENDINGS
    {
      id: 'enmesh-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Six months later. Linda tested the boundary twice. Both times, Ethan handled it. \"Mom, that's between me and her. I'm not discussing it.\" She backed off. Surprised but backed off.",
        },
        {
          text: "\"I know she still has opinions,\" Ethan says. \"But I'm learning to hear them without following them.\" Progress. Not perfect, but progress. He chose to grow rather than lose you. That's the win.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Boundaries Held',
      endingSummary: 'You entered an enmeshed family dynamic with eyes open. Ethan learned to set boundaries because you required them. Not every family situation is fixable—but this one was.',
    },
    {
      id: 'enmesh-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A year later. Things are... okay. Linda still oversteps. Ethan still struggles to push back. You've learned to pick your battles. It's exhausting, but manageable.",
        },
        {
          text: "Sometimes you wonder if \"managing\" is enough. If his inability to fully separate is something you can live with forever. The jury's still out.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Ongoing Negotiation',
      endingSummary: 'You\'re making it work, but the enmeshment is always there. Some boundaries hold, some don\'t. This is sustainable—but is it what you want long-term?',
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Want to understand enmeshment patterns better?',
    },
    {
      id: 'enmesh-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Two years in. Linda is everywhere. Your vacation plans. Your career decisions. Your wedding Pinterest board, which she started without asking. Ethan sees no issue.",
        },
        {
          text: "\"She's just excited for us,\" he says. You realize you married into a threesome you never agreed to. His mother is always in the room, even when she's not. You joined his family. You didn't build your own.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Third Wheel',
      endingSummary: 'You normalized the enmeshment until it became your normal. Now you share your relationship with his mother, and escape feels impossible.',
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Understanding how this happens can help you heal.',
    },

    // ============================================
    // PATH B: THE HOSTILE FAMILY
    // ============================================
    {
      id: 'hostile-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Rough on exes how?\" you ask. Ethan sighs. \"Just... cold. Judgmental. They didn't think any of them were 'good enough.' Mom especially.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"Did you ever stand up for them?\" He pauses too long. \"I tried. It's just... hard when your whole family is against someone.\"",
          speakerId: 'ethan',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "He 'tried.' Past tense. What happened to those relationships?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'hostile-1a',
          text: '"What specifically do they judge people on?"',
          nextSceneId: 'hostile-2-intel',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'intelligence_gathering',
          feedback: 'Know what you\'re walking into. Information is armor.',
        },
        {
          id: 'hostile-1b',
          text: '"I can handle myself. Don\'t worry about me."',
          nextSceneId: 'hostile-2-confident',
          xpBonus: 5,
          feedback: 'Confidence is good, but blind confidence gets ambushed.',
        },
        {
          id: 'hostile-1c',
          text: '"That sounds really hard. I\'m sorry your family puts you in that position."',
          nextSceneId: 'hostile-2-empathy',
          xpBonus: 10,
          feedback: 'Connecting with him, but you still need intel.',
        },
      ],
    },
    {
      id: 'hostile-2-intel',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Career, mostly. And background. Mom grew up poor, married up. Now she's... particular about status.\" He looks embarrassed. \"And dad follows her lead.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"What about Katie?\" \"Katie will be blunt but fair. She's actually the test you can pass.\"",
          speakerId: 'ethan',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Mom is status-focused. Sister is the honest one. Play accordingly.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'hostile-2a',
          text: '"Okay. So I don\'t try to win mom over. I build a real connection with Katie."',
          nextSceneId: 'hostile-3-strategy',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'strategic_targeting',
          feedback: 'Win the winnable battles. Let the hostile one reveal herself.',
        },
        {
          id: 'hostile-2b',
          text: '"I\'ll just be myself and hope for the best."',
          nextSceneId: 'hostile-3-hope',
          feedback: 'Hope is not a strategy with hostile families.',
        },
      ],
    },
    {
      id: 'hostile-2-confident',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan looks relieved. \"Okay. Good. Just... don't take anything personally.\" Meaning: there will be things to take personally. Brace yourself.",
        },
      ],
      nextSceneId: 'hostile-3-arrival',
    },
    {
      id: 'hostile-2-empathy',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan squeezes your hand. \"Thanks for understanding. Most people get defensive.\" His vulnerability is real. The question is whether he can protect you from his family, or just apologize afterward.",
          speakerId: 'ethan',
          emotion: 'hopeful',
        },
      ],
      nextSceneId: 'hostile-3-arrival',
    },
    {
      id: 'hostile-3-strategy',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You arrive. Linda opens the door, assessing you in one sweep. Designer bag: noted. Shoes: noted. She offers a cool smile. \"Ethan has told us so little about you.\"",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "Translation: Why haven't we approved you yet? Katie appears behind her, rolling her eyes at her mother's back. An ally, maybe.",
          speakerId: 'katie',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'hostile-4-test',
    },
    {
      id: 'hostile-3-hope',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You arrive. The door opens to a cool reception. Linda's smile is a performance. Mike shakes your hand like you're applying for a loan. Katie watches from the corner.",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "\"So,\" Linda begins immediately, \"What exactly do you do?\" Not 'nice to meet you.' Straight to the credential check.",
          speakerId: 'linda',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'hostile-4-test',
    },
    {
      id: 'hostile-3-arrival',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "At the door, Linda appraises you like a vendor at a market. \"Interesting choice, Ethan.\" Interesting. Not lovely. Not nice. Interesting.",
          speakerId: 'linda',
          emotion: 'smirking',
        },
        {
          text: "\"Interesting how?\" you ask before you can stop yourself. Her smile sharpens. \"Just an observation.\" First blood. She's testing if you'll cower.",
        },
      ],
      nextSceneId: 'hostile-4-test',
    },
    {
      id: 'hostile-4-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Lunch is an interrogation. \"Where did you go to school?\" \"What's your salary range?\" \"Where do you see yourself in five years?\" Linda doesn't blink between questions.",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "Mike nods along. Katie looks uncomfortable. Ethan is frozen, caught between defending you and not confronting his mother.",
        },
        {
          speakerId: 'inner-voice',
          text: "This is a test. Not of your answers, but of how you handle pressure.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'hostile-4a',
          text: 'Answer calmly and completely. Show you have nothing to hide.',
          nextSceneId: 'hostile-5-calm',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'unflappable',
          feedback: 'Grace under fire. They\'re testing your composure, not your resume.',
        },
        {
          id: 'hostile-4b',
          text: '"Is this an interview, or lunch?" with a light smile.',
          nextSceneId: 'hostile-5-deflect',
          xpBonus: 15,
          feedback: 'Calling it out with humor. Risky but can work.',
        },
        {
          id: 'hostile-4c',
          text: 'Get defensive. "Why does my salary matter to you?"',
          nextSceneId: 'hostile-5-defensive',
          feedback: 'Defensiveness confirms you\'re rattled. She wins this round.',
        },
      ],
    },
    {
      id: 'hostile-5-calm',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You answer each question with composure. Facts, but with warmth. Linda keeps probing, but you're unshakable. Eventually, something shifts in her expression. Not approval—respect. Grudging, but respect.",
          speakerId: 'linda',
          emotion: 'neutral',
        },
        {
          text: "Katie catches you in the kitchen. \"She's not used to people who don't fold. I like you.\"",
          speakerId: 'katie',
          emotion: 'happy',
        },
      ],
      nextSceneId: 'hostile-6-ally',
    },
    {
      id: 'hostile-5-deflect',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Linda pauses. For a moment you think she's offended—then she actually laughs. \"Fair point. Ethan warned me you were direct.\" You've surprised her. Good.",
          speakerId: 'linda',
          emotion: 'smirking',
        },
        {
          text: "The questioning softens slightly. You've shown spine. She respects that, even if she doesn't like it.",
        },
      ],
      nextSceneId: 'hostile-6-ally',
    },
    {
      id: 'hostile-5-defensive',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Linda's smile widens. \"Just curious. Ethan's future matters to us.\" But she's seen the crack. You can be rattled. She'll use that.",
          speakerId: 'linda',
          emotion: 'smirking',
        },
        {
          text: "The rest of lunch is slightly hostile. Ethan tries to change topics; Linda redirects back to you. You're on the defensive the whole time.",
        },
      ],
      nextSceneId: 'hostile-6-survival',
    },
    {
      id: 'hostile-6-ally',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "As you're leaving, Linda shakes your hand. Still not warm, but different. \"You're not like the others.\" \"Is that good?\" you ask. She considers. \"We'll see.\"",
          speakerId: 'linda',
          emotion: 'neutral',
        },
        {
          text: "In the car, Ethan exhales. \"That was... way better than expected. Mom actually seemed interested in you.\"",
          speakerId: 'ethan',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: "You survived the hazing. Now watch what you built.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'hostile-6a',
          text: '"I noticed Katie was the honest one. I\'d like to build something there."',
          nextSceneId: 'hostile-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'ally_building',
          feedback: 'Win the winnable. Katie will tell you the truth when others won\'t.',
        },
        {
          id: 'hostile-6b',
          text: '"Your mom is tough. But I think we\'ll be okay."',
          nextSceneId: 'hostile-neutral-ending',
          xpBonus: 10,
          feedback: 'Survived but not strategized. The next test will be harder.',
        },
      ],
    },
    {
      id: 'hostile-6-survival',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You survived. Barely. At the door, Linda's goodbye is perfunctory. \"Safe travels.\" She's dismissed you already.",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "In the car, Ethan is quiet. \"That could have gone better.\" He doesn't defend you or acknowledge her behavior. Just notes the failure.",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "He didn't defend you. And his first comment was about YOUR performance.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'hostile-6c',
          text: '"I noticed you didn\'t say anything when she was grilling me."',
          nextSceneId: 'hostile-7-confront',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'accountability',
          feedback: 'Naming his passivity. He needs to hear this.',
        },
        {
          id: 'hostile-6d',
          text: '"It was just one lunch. They\'ll warm up eventually."',
          nextSceneId: 'hostile-bad-ending',
          feedback: 'Wishful thinking. Hostile families don\'t warm without reason to change.',
        },
      ],
    },
    {
      id: 'hostile-7-confront',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan looks stung. \"I... I was going to, but—\" \"But you didn't.\" He's quiet. \"You're right. I froze. I always freeze.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"That has to change,\" you say. \"I'm not going to fight your family alone.\" He nods slowly. \"I know. I need to work on this.\"",
          speakerId: 'ethan',
          emotion: 'serious',
        },
      ],
      nextSceneId: 'hostile-neutral-ending',
    },
    // HOSTILE ENDINGS
    {
      id: 'hostile-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "A year later. Katie texts you directly now. Inside jokes. Warnings when Linda is on a warpath. \"Heads up, mom found your Instagram. Prepare commentary on post 34.\"",
        },
        {
          text: "Linda hasn't fully warmed up—maybe never will. But you've built real connections around her. Mike softened once he saw you weren't intimidated. Katie is genuinely a friend. The hostile gatekeeper couldn't stop the real relationships from forming.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Grace Under Fire',
      endingSummary: 'You survived the hostile family by staying calm, being strategic, and building allies where you could. The gatekeeper didn\'t approve you—but she couldn\'t stop you either.',
    },
    {
      id: 'hostile-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things improve. Slowly. Ethan is learning to speak up—sometimes. Linda still makes comments, but you've developed armor. It's not warm, but it's workable.",
        },
        {
          text: "You wonder sometimes if \"workable\" is enough. If you want to spend holidays managing hostility for the rest of your life. But for now, you're choosing to stay and see.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Uneasy Truce',
      endingSummary: 'You\'re surviving the hostile family, but not thriving. Ethan is growing, slowly. The question is whether you want to wait out his growth or find peace elsewhere.',
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Want to understand hostile family patterns?',
    },
    {
      id: 'hostile-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Two years in. Every holiday is a test. Every visit requires recovery time. Ethan still doesn't stand up for you—he just apologizes afterward. \"You know how they are.\"",
        },
        {
          text: "You've become smaller. Less yourself. The version of you that survives these visits isn't the version you like. The hostile family didn't destroy you—but they're eroding you, slowly.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Death by a Thousand Cuts',
      endingSummary: 'You hoped the hostile family would change. They didn\'t. Now you\'re the one who changed—diminished, guarded, tired. This isn\'t partnership. It\'s survival.',
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Understanding what happened can help you heal.',
    },

    // ============================================
    // PATH C: THE PERFORMATIVE FAMILY
    // ============================================
    {
      id: 'perform-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Tension how?\" you ask. Ethan hesitates. \"They perform. The perfect family. But in private, there's... stuff. Dad and Mom barely speak when no one's watching. Katie and I learned to pretend.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"What happens when the pretending stops?\" \"It doesn't. That's the rule. We're always 'on' for guests. I'm just warning you—what you see isn't what's real.\"",
          speakerId: 'ethan',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "A family that performs. What are they hiding?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'perform-1a',
          text: '"Why do they pretend? What are they covering for?"',
          nextSceneId: 'perform-2-dig',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'root_cause',
          feedback: 'Getting to the core. Pretense always covers something.',
        },
        {
          id: 'perform-1b',
          text: '"All families have their public face. That\'s normal."',
          nextSceneId: 'perform-2-normalize',
          feedback: 'Some performance is normal. Constant performance is a red flag.',
        },
        {
          id: 'perform-1c',
          text: '"That sounds exhausting. How do you cope?"',
          nextSceneId: 'perform-2-empathy',
          xpBonus: 10,
          feedback: 'Connecting with his experience. Important context.',
        },
      ],
    },
    {
      id: 'perform-2-dig',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan goes quiet. \"Dad had an affair. Years ago. Mom never forgave him but never left either. Now they just... pretend. Happy in public, strangers in private.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"And you and Katie?\" \"We learned early that feelings aren't discussed. You smile. You perform. You don't talk about what's real.\"",
          speakerId: 'ethan',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "A family that buries emotion. Watch for where that pattern shows up in him.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'perform-2a',
          text: '"Thank you for telling me. That helps me understand what I\'m walking into."',
          nextSceneId: 'perform-3-aware',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'grateful_clarity',
          feedback: 'He just showed vulnerability. Acknowledge it.',
        },
        {
          id: 'perform-2b',
          text: '"Do you still do that? Pretend instead of being real?"',
          nextSceneId: 'perform-3-probe',
          xpBonus: 10,
          feedback: 'Important question. He may not know the answer.',
        },
      ],
    },
    {
      id: 'perform-2-normalize',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Not like this,\" Ethan says. \"My friend's family argues at dinner. Has real conversations. We just... smile. It's exhausting. And no one ever says what they mean.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "He looks at you. \"I'm trying to not be like that. But I don't always know when I'm doing it.\"",
          speakerId: 'ethan',
          emotion: 'confused',
        },
      ],
      nextSceneId: 'perform-3-arrival',
    },
    {
      id: 'perform-2-empathy',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Honestly? I don't know anymore. It's just... normal now. Katie and I developed a code. Two coughs means 'can we leave.' Three means 'intervention needed.'\"",
          speakerId: 'ethan',
          emotion: 'smirking',
        },
        {
          text: "He's joking, but there's real pain underneath. This family taught him feelings are inconvenient.",
        },
      ],
      nextSceneId: 'perform-3-arrival',
    },
    {
      id: 'perform-3-aware',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You arrive. The house is immaculate. Linda greets you with a hug that feels rehearsed—perfect pressure, perfect duration. Mike's handshake is firm. Everyone is smiling. It's like a magazine shoot.",
          speakerId: 'linda',
          emotion: 'happy',
        },
        {
          text: "Katie catches your eye. A flicker of something real—then the performance face returns. She mouths 'Good luck' when no one's looking.",
          speakerId: 'katie',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'perform-4-dinner',
    },
    {
      id: 'perform-3-probe',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan is quiet. \"Probably. I notice it sometimes—I'm saying one thing and feeling another. I'm working on it.\" He looks at you. \"Can you tell when I'm doing it?\"",
          speakerId: 'ethan',
          emotion: 'confused',
        },
        {
          text: "That's a real question. He wants to know. \"Sometimes. But I'd rather you just told me.\"",
        },
      ],
      nextSceneId: 'perform-3-arrival',
    },
    {
      id: 'perform-3-arrival',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The house is beautiful. Perfect landscaping, perfect decor, perfect family photo on the mantle. Linda welcomes you with a smile that doesn't quite reach her eyes.",
          speakerId: 'linda',
          emotion: 'happy',
        },
        {
          text: "\"We're so thrilled to meet you!\" Too enthusiastic. Too polished. Mike appears with drinks. \"Welcome, welcome!\" Same energy. Same performance.",
        },
      ],
      nextSceneId: 'perform-4-dinner',
    },
    {
      id: 'perform-4-dinner',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Dinner is pleasant on the surface. Pleasant topics. Pleasant smiles. Linda asks about your job with practiced interest. Mike laughs at appropriate moments. But you notice—they never look at each other.",
          speakerId: 'linda',
          emotion: 'happy',
        },
        {
          text: "When Mike reaches for the salt, Linda moves away slightly. When she tells a story, he zones out. Two people sharing a stage, not a life.",
        },
        {
          speakerId: 'inner-voice',
          text: "Perfect performance. Zero connection. This is what they modeled for Ethan.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'perform-4a',
          text: 'Play along. Match their energy. Be pleasant.',
          nextSceneId: 'perform-5-play',
          xpBonus: 10,
          feedback: 'Strategic mirroring. Keeps the peace but doesn\'t reveal anything.',
        },
        {
          id: 'perform-4b',
          text: 'Ask something real. \"What\'s the hardest thing about being married this long?\"',
          nextSceneId: 'perform-5-real',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'reality_pierce',
          feedback: 'Piercing the performance. Risky but revealing.',
        },
        {
          id: 'perform-4c',
          text: 'Watch quietly. Let the mask slips show themselves.',
          nextSceneId: 'perform-5-watch',
          xpBonus: 15,
          feedback: 'Patient observation. The cracks always show eventually.',
        },
      ],
    },
    {
      id: 'perform-5-play',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You match their energy. Pleasant questions, pleasant answers. Linda seems pleased—you've passed the social test. But you've learned nothing real.",
        },
        {
          text: "Later, Katie corners you in the hallway. \"You're good at this. The performance.\" She doesn't say it as a compliment.",
          speakerId: 'katie',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'perform-6-aftermath',
    },
    {
      id: 'perform-5-real',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "The table freezes. Mike coughs. Linda's smile tightens. \"Well. Marriage is... teamwork.\" Non-answer. But Katie is watching you with new interest.",
          speakerId: 'linda',
          emotion: 'cold',
        },
        {
          text: "\"Teamwork,\" Mike echoes. They share a glance—the first real acknowledgment of each other all evening. And it's loaded with something unspoken.",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "You touched a nerve. That tells you everything about what's underneath.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'perform-5a',
          text: '"Sorry, that was too personal. I was just curious."',
          nextSceneId: 'perform-6-retreat',
          xpBonus: 10,
          feedback: 'Graceful retreat. You pushed, now you give them an out.',
        },
        {
          id: 'perform-5b',
          text: 'Let the silence sit. See who fills it.',
          nextSceneId: 'perform-6-silence',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'silence_pressure',
          feedback: 'Holding space for truth. Uncomfortable but effective.',
        },
      ],
    },
    {
      id: 'perform-5-watch',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You watch. After dessert, Linda snaps at Mike about the wine choice. Just a flash—then the smile returns. But you saw it. The mask slipped.",
          speakerId: 'linda',
          emotion: 'angry',
        },
        {
          text: "Katie catches your eye. She saw you notice. A tiny nod. She's been watching too, her whole life.",
          speakerId: 'katie',
          emotion: 'knowing',
        },
      ],
      nextSceneId: 'perform-6-aftermath',
    },
    {
      id: 'perform-6-retreat',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Linda visibly relaxes. \"No, no, it's a fair question. We've just learned to focus on the good.\" Focus on the good. Ignore the bad. Pretend problems don't exist.",
          speakerId: 'linda',
          emotion: 'happy',
        },
        {
          text: "Ethan squeezes your hand under the table. Grateful or warning? Hard to tell.",
          speakerId: 'ethan',
          emotion: 'confused',
        },
      ],
      nextSceneId: 'perform-6-aftermath',
    },
    {
      id: 'perform-6-silence',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "The silence stretches. Finally, Katie speaks. \"The hardest thing is probably pretending everything is fine when it isn't.\" Linda's face freezes. Mike looks at his plate. Truth—finally.",
          speakerId: 'katie',
          emotion: 'serious',
        },
        {
          text: "\"Katie.\" Linda's voice is sharp. Then softens. \"We're a family. Families work through things.\" But she doesn't deny it. She can't.",
          speakerId: 'linda',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'perform-6-aftermath',
    },
    {
      id: 'perform-6-aftermath',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "At the door, hugs are distributed. Linda's hug for Ethan is the warmest—genuine, even. Her hug for you is polished. Mike waves goodbye.",
          speakerId: 'linda',
          emotion: 'happy',
        },
        {
          text: "In the car, Ethan is quiet. \"So... that's my family.\" He looks at you. \"What did you see?\"",
          speakerId: 'ethan',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "He's asking if you saw through the performance. Be honest.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'perform-6a',
          text: '"I saw people trying very hard to look okay. And I saw you caught in the middle of it."',
          nextSceneId: 'perform-7-honest',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'compassionate_truth',
          feedback: 'Honest but kind. Seeing him, not judging him.',
        },
        {
          id: 'perform-6b',
          text: '"They seem nice. Maybe a little formal."',
          nextSceneId: 'perform-7-polite',
          feedback: 'Performing back at him. He asked for truth; you gave him polish.',
        },
        {
          id: 'perform-6c',
          text: '"I\'m worried about what you learned from them about relationships."',
          nextSceneId: 'perform-7-concern',
          xpBonus: 10,
          feedback: 'Direct but might feel like an attack. True, though.',
        },
      ],
    },
    {
      id: 'perform-7-honest',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan exhales. \"Yeah. That's... yeah.\" He's quiet for a moment. \"I don't want us to be like that. I want to be able to say when things are hard.\"",
          speakerId: 'ethan',
          emotion: 'sad',
        },
        {
          text: "\"Good. Because I don't do performances.\" He smiles, and this time it's real. \"That's why I like you.\"",
          speakerId: 'ethan',
          emotion: 'hopeful',
        },
      ],
      nextSceneId: 'perform-good-ending',
    },
    {
      id: 'perform-7-polite',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan looks at you. Something closes in his eyes. \"Yeah. They're... fine.\" He's performing now. With you. The pattern continues.",
          speakerId: 'ethan',
          emotion: 'neutral',
        },
        {
          text: "You missed a chance to break through. Now you're both performing.",
        },
      ],
      nextSceneId: 'perform-neutral-ending',
    },
    {
      id: 'perform-7-concern',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Ethan stiffens. \"I'm not my parents.\" Defensive. But also—maybe—listening. \"I know I learned some things from them that aren't healthy. I'm working on it.\"",
          speakerId: 'ethan',
          emotion: 'angry',
        },
        {
          text: "\"That's all I'm asking.\" He nods slowly. The conversation isn't over, but the door is open.",
          speakerId: 'ethan',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'perform-neutral-ending',
    },
    // PERFORMATIVE ENDINGS
    {
      id: 'perform-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Six months later. You and Ethan have a rule: no performing with each other. If something's wrong, you say it. If you're upset, you name it. It's harder than pretending—and so much better.",
        },
        {
          text: "His family still performs. But Ethan has learned to step out of the stage when he's with you. Katie texts sometimes: \"How do you get him to actually talk about feelings?\" He's breaking the cycle. One honest conversation at a time.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Behind the Curtain',
      endingSummary: 'You saw through the performative family and helped Ethan see it too. He\'s learning to be real instead of polished. The pattern ends with him—because you showed him there\'s another way.',
    },
    {
      id: 'perform-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things continue. Some days Ethan is real with you. Other days, you catch him performing—saying what he thinks you want to hear instead of what's true.",
        },
        {
          text: "You're not sure if he's aware of it. You're not sure if you should keep pointing it out. The performative family is still running the show in his head, even when they're not in the room.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Lingering Script',
      endingSummary: 'He\'s trying, but the performance habits run deep. Sometimes you get the real Ethan. Sometimes you get the version his family trained. The question is whether you can wait for consistent authenticity.',
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Want to understand performative family patterns?',
    },
    {
      id: 'perform-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You learn to play along. Pleasant dinners. Pleasant smiles. Pleasant lies about how you're feeling. It's easier than fighting for reality.",
        },
        {
          text: "Years later, you catch yourself performing with Ethan about things that matter. When did you stop saying what's real? When did pretending become your default too? You joined the play. Now you don't know how to exit.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Method Actor',
      endingSummary: 'You adapted to the performative family by becoming one of them. Now you perform too—even with yourself. The mask became your face.',
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Understanding what happened can help you find yourself again.',
    },
  ],
};
