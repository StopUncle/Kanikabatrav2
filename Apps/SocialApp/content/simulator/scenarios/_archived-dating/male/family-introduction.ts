// Scenario: The Family Introduction (Male Version)
// 3 paths: The Enmeshed, The Hostile, The Performative
// Navigate different family dynamics strategically

import type { Scenario } from '../../types';

export const familyIntroductionMaleScenario: Scenario = {
  id: 'family-introduction-male',
  title: 'Meeting Her Family',
  tagline: 'Survive the audition. Or don\'t.',
  description:
    "You've been dating Elena for four months. She's finally taking you to meet her parents. But what you walk into will test everything—your frame, your patience, your worth. Can you read the room and hold your ground?",
  tier: 'premium',
  estimatedMinutes: 20,
  difficulty: 'intermediate',
  category: 'healthy',
  xpReward: 175,
  badgeId: 'family-strategist',
  targetGender: 'male',

  templates: {
    partner: ['Elena', 'Sophia', 'Isabella', 'Victoria', 'Natasha'],
    mother: ['Laura', 'Margaret', 'Patricia', 'Catherine', 'Diana'],
    father: ['Michael', 'Robert', 'William', 'Richard', 'James'],
    brother: ['Kevin', 'Ryan', 'Tyler', 'Marcus', 'Jordan'],
  },

  tacticsLearned: [
    'Reading family power dynamics quickly',
    'Holding frame under parental pressure',
    'Recognizing partner loyalty (or lack of it)',
    'Detecting performative warmth vs. genuine connection',
    'Navigating provider identity tests',
    'Strategic family integration without submission',
  ],
  redFlagsTaught: [
    'Enmeshment (partner can\'t set boundaries with parents)',
    'Family hostility disguised as "just protecting our daughter"',
    'Performative perfection hiding dysfunction',
    'Partner silence during family attacks',
    'Status testing and provider auditions',
    'Triangulation and loyalty tests',
  ],

  characters: [
    {
      id: 'elena',
      name: 'Elena',
      description: 'Your girlfriend. Sweet, but her family dynamic may reveal things about her.',
      traits: ['loyal', 'family-oriented', 'nervous'],
      defaultEmotion: 'happy',
    },
    {
      id: 'laura',
      name: 'Laura',
      description: "Elena's mother. Her role in the family will become clear quickly.",
      traits: ['influential', 'observant', 'complex'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'michael',
      name: 'Michael',
      description: "Elena's father. His behavior often reveals the family power structure.",
      traits: ['protective', 'traditional', 'measured'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'kevin',
      name: 'Kevin',
      description: "Elena's brother. Often the most honest one in the family.",
      traits: ['sharp', 'loyal', 'observant'],
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
          text: "Sunday morning. You're driving to Elena's parents' house for lunch. She's been anxious all week. In the car, she finally says it: \"I should probably warn you about my family...\"",
          speakerId: 'elena',
          emotion: 'confused',
        },
        {
          text: "You wait. Whatever comes next will tell you what you're walking into. And how to play it.",
        },
        {
          speakerId: 'inner-voice',
          text: "Listen carefully. This warning is your recon briefing.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-enmeshed',
          text: '"My dad is... really involved in my life. Like, REALLY involved."',
          nextSceneId: 'enmesh-1',
          xpBonus: 5,
          feedback: 'The Enmeshed Family. Daddy\'s princess with no boundaries.',
        },
        {
          id: 'fork-hostile',
          text: '"They don\'t think anyone is good enough for me. They\'ve been hard on my exes."',
          nextSceneId: 'hostile-1',
          xpBonus: 5,
          feedback: 'The Hostile Family. You\'re walking into an audition.',
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
    // PATH A: THE ENMESHED FAMILY (Daddy's Princess)
    // ============================================
    {
      id: 'enmesh-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Really involved how?\" you ask. Elena sighs. \"He calls multiple times a day. Has opinions on everything. My last relationship... he kind of interfered a lot.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"Interfered how?\" \"Would grill my ex about his career, his 'five-year plan.' Told me he wasn't 'serious enough' about my future.\" She looks at you. \"Dad means well. He just... has high standards.\"",
          speakerId: 'elena',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "High standards, or control disguised as protection?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-1a',
          text: '"That sounds like a lot. How do YOU feel about his involvement?"',
          nextSceneId: 'enmesh-2-probe',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'diagnostic_question',
          feedback: 'Testing whether she sees the problem or defends it.',
        },
        {
          id: 'enmesh-1b',
          text: '"I\'m sure once he gets to know me, it\'ll be fine."',
          nextSceneId: 'enmesh-2-naive',
          feedback: 'Optimism without information. Enmeshed fathers don\'t change easily.',
        },
        {
          id: 'enmesh-1c',
          text: '"Does he respect your choices? Your boundaries?"',
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
          text: "Elena pauses. \"I mean... he's my dad. He just wants what's best for me.\" Deflection. She didn't answer how SHE feels. She explained HIS motivation.",
          speakerId: 'elena',
          emotion: 'confused',
        },
        {
          text: "\"But does his involvement ever bother you?\" you press gently. Another pause. \"Sometimes. But I don't want to hurt his feelings. He's sacrificed so much for our family.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "She can't say no to him without guilt. That's the pattern.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'enmesh-2a',
          text: '"A grown woman should be able to make her own choices without a permission slip."',
          nextSceneId: 'enmesh-3-boundary',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'boundary_principle',
          feedback: 'Stating your values early. This is information she needs.',
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
          text: "Elena brightens. \"You think so? My last boyfriend couldn't handle it.\" Red flag. She's relieved you're 'handling it' instead of her addressing the issue.",
        },
        {
          text: "You arrive at the house. Michael opens the door before you're out of the car. He was watching from the window.",
          speakerId: 'michael',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'enmesh-3-arrival',
    },
    {
      id: 'enmesh-2-direct',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Elena looks uncomfortable. \"Respect my choices? I mean, he's my dad. What am I supposed to do, cut him off?\"",
          speakerId: 'elena',
          emotion: 'angry',
        },
        {
          text: "All-or-nothing thinking. As if the only options are total access or total rejection. No healthy middle ground in her worldview.",
        },
      ],
      nextSceneId: 'enmesh-3-arrival',
    },
    {
      id: 'enmesh-3-boundary',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Elena is quiet for a moment. \"I know you're right. I just... it's hard.\" That's honest. She knows there's an issue even if she hasn't fixed it.",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "You arrive. Michael greets Elena with a bear hug, then looks you up and down like a drill sergeant assessing a recruit. \"So. THIS is him.\" Not hello. Assessment.",
          speakerId: 'michael',
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
          text: "You arrive. Michael is at the door before you're out of the car. He hugs Elena, whispers something in her ear. Then turns to you with a handshake that lasts a beat too long. Testing your grip.",
          speakerId: 'michael',
          emotion: 'neutral',
        },
        {
          text: "\"So you're the new one.\" New one. Not your name. Already positioning you as temporary.",
          speakerId: 'michael',
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
          text: "\"My princess!\" Michael pulls Elena into an embrace. Doesn't acknowledge you for a full minute. When he does, it's a measuring look. \"Elena didn't mention you were so... young-looking.\"",
          speakerId: 'michael',
          emotion: 'smirking',
        },
        {
          text: "Veiled comment. Implying immaturity. Elena misses it entirely. \"Daddy, be nice!\" He laughs. \"I'm always nice.\"",
        },
      ],
      nextSceneId: 'enmesh-4-test',
    },
    {
      id: 'enmesh-4-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "During lunch, Michael dominates. Every topic circles back to Elena. Her childhood. Her accomplishments. How well he knows her. \"No one knows my daughter like I do. A father just knows.\"",
          speakerId: 'michael',
          emotion: 'happy',
        },
        {
          text: "\"So,\" he turns to you, \"What's your five-year plan? Career trajectory? Earning potential?\" He's not asking to know you. He's auditing you.",
        },
        {
          speakerId: 'inner-voice',
          text: "Provider audition. He's assessing if you're 'worthy' of his princess.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'enmesh-4a',
          text: '"Michael, I\'m here to meet Elena\'s family—not apply for a loan. Let\'s talk about something else."',
          nextSceneId: 'enmesh-5-challenge',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'frame_hold',
          feedback: 'Redirecting without submission. Bold but necessary.',
        },
        {
          id: 'enmesh-4b',
          text: 'Answer his questions directly. Show you have nothing to hide.',
          nextSceneId: 'enmesh-5-answer',
          xpBonus: 10,
          feedback: 'Compliant but sets a precedent. He\'ll keep testing.',
        },
        {
          id: 'enmesh-4c',
          text: 'Look to Elena. Wait for her to intervene.',
          nextSceneId: 'enmesh-5-wait',
          feedback: 'Testing if she\'ll stand up. The answer tells you everything.',
        },
      ],
    },
    {
      id: 'enmesh-5-challenge',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Michael's eyes narrow. A beat of silence. Then, surprisingly, a small nod. \"Fair enough. Most of them just answer.\" Most of THEM. You're being compared to a line of predecessors.",
          speakerId: 'michael',
          emotion: 'neutral',
        },
        {
          text: "Kevin, the brother, catches your eye. A subtle nod of approval. Laura watches with interest. Elena looks mortified—and maybe a little impressed.",
          speakerId: 'kevin',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: "You held frame. He noticed. Now he's recalculating.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-5a',
          text: '"I\'m happy to share about myself. I just prefer conversation over interrogation."',
          nextSceneId: 'enmesh-6-graceful',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'soft_landing',
          feedback: 'De-escalating while holding ground. This is skill.',
        },
        {
          id: 'enmesh-5b',
          text: 'Let the moment sit. Don\'t break the tension.',
          nextSceneId: 'enmesh-6-silent',
          xpBonus: 10,
          feedback: 'Silence is power. But might feel confrontational.',
        },
      ],
    },
    {
      id: 'enmesh-5-answer',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You answer his questions. Career path. Salary trajectory. Retirement planning. Michael nods, taking mental notes. You passed the quiz—but now he knows you'll comply.",
          speakerId: 'michael',
          emotion: 'neutral',
        },
        {
          text: "\"Good, good,\" he says. \"My daughter deserves someone with a plan.\" Deserves. Like you're an asset being evaluated for purchase.",
        },
      ],
      nextSceneId: 'enmesh-6-decision',
    },
    {
      id: 'enmesh-5-wait',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You look to Elena. She shifts uncomfortably, then: \"Daddy, maybe we should talk about something else?\" Weak. Question mark instead of statement. Michael waves her off.",
          speakerId: 'elena',
          emotion: 'confused',
        },
        {
          text: "\"I'm just getting to know him, sweetheart.\" He turns back to you, waiting for answers. She tried—barely—and failed.",
        },
      ],
      nextSceneId: 'enmesh-6-decision',
    },
    {
      id: 'enmesh-6-graceful',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Michael actually smiles. \"Conversation. Right.\" He shifts gears, asking about your hobbies, your family. Still assessing, but less like an audit.",
          speakerId: 'michael',
          emotion: 'neutral',
        },
        {
          text: "Later, Kevin catches you in the hallway. \"Most guys either fold or fight. You did neither. That's new.\"",
          speakerId: 'kevin',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: "An ally. The brother sees through the dynamic.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-6a',
          text: '"How does Elena usually handle your dad\'s... intensity?"',
          nextSceneId: 'enmesh-7-intel',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'intelligence_gathering',
          feedback: 'Getting the inside view from someone honest.',
        },
        {
          id: 'enmesh-6b',
          text: '"Your sister seems caught in the middle."',
          nextSceneId: 'enmesh-7-observation',
          xpBonus: 10,
          feedback: 'Observation without asking. Still informative.',
        },
      ],
    },
    {
      id: 'enmesh-6-silent',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The silence stretches. Michael studies you. Finally, he nods slowly. \"You've got some spine. Most of them don't.\" Respect? Or marking you as a challenge?",
          speakerId: 'michael',
          emotion: 'neutral',
        },
        {
          text: "Laura changes the subject to safer territory. The tension eases. But you feel Michael watching you for the rest of lunch.",
        },
      ],
      nextSceneId: 'enmesh-7-car',
    },
    {
      id: 'enmesh-6-decision',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "At the end of the visit, Michael shakes your hand—grip test again. \"Interesting meeting you.\" Interesting. Not nice. Not welcome. Interesting.",
          speakerId: 'michael',
          emotion: 'cold',
        },
        {
          text: "In the car, you have to ask. \"Elena, where do I fit in this picture? Because your dad seems to take up a lot of space.\"",
        },
      ],
      nextSceneId: 'enmesh-7-car',
    },
    {
      id: 'enmesh-7-intel',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Kevin grimaces. \"She doesn't handle it. She just... goes along. I love my sister, but she's never told Dad no about anything that matters.\"",
          speakerId: 'kevin',
          emotion: 'sad',
        },
        {
          text: "\"Her exes?\" \"All ran. They'd try to pull her away from Dad, he'd apply pressure, she'd choose Dad. Every time.\" He looks at you. \"You seem different. Just... know what you're signing up for.\"",
          speakerId: 'kevin',
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'enmesh-7-car',
    },
    {
      id: 'enmesh-7-observation',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Kevin nods. \"She's Daddy's princess. Always has been. Our mom just... lets it happen. I checked out years ago.\" He shrugs. \"I love Elena. But she's gonna need a guy who can handle Dad, not fight him.\"",
          speakerId: 'kevin',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'enmesh-7-car',
    },
    {
      id: 'enmesh-7-car',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "In the car, Elena is quiet. Finally: \"I know my dad is a lot. But he really liked you. He said you have 'presence.'\"",
          speakerId: 'elena',
          emotion: 'hopeful',
        },
        {
          text: "\"Elena, I need to ask you something. If your dad disapproved of us—really put his foot down—what would you do?\"",
        },
        {
          speakerId: 'inner-voice',
          text: "This is the question. Her answer is everything.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-7a',
          text: 'Wait for her answer without prompting.',
          nextSceneId: 'enmesh-8-answer',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'silence_pressure',
          feedback: 'Letting her sit with the question. No easy outs.',
        },
        {
          id: 'enmesh-7b',
          text: '"Because I need to know I\'m dating you, not your father."',
          nextSceneId: 'enmesh-8-direct',
          xpBonus: 10,
          feedback: 'Direct, but might make her defensive. Still necessary.',
        },
        {
          id: 'enmesh-7c',
          text: '"Never mind. All families have their dynamics."',
          nextSceneId: 'enmesh-bad-ending',
          feedback: 'Backing off from the real question. You\'ll regret this.',
        },
      ],
    },
    {
      id: 'enmesh-8-answer',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Elena is quiet for a long moment. \"I... I'd fight for us. But I'd need to do it my way. Slowly. He respects strength, not ultimatums.\"",
          speakerId: 'elena',
          emotion: 'serious',
        },
        {
          text: "\"And if he never came around?\" Another pause. \"Then he'd have to accept it. But I really hope it doesn't come to that.\" Hope isn't a strategy. But at least she's being honest.",
        },
        {
          speakerId: 'inner-voice',
          text: "She's willing to try. That's more than most. Watch if words become action.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'enmesh-8a',
          text: '"I appreciate the honesty. Let\'s see how it goes."',
          nextSceneId: 'enmesh-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'conditional_trust',
          feedback: 'Trust but verify. Open but watching.',
        },
        {
          id: 'enmesh-8b',
          text: '"I hope so too. But I won\'t wait forever for your dad\'s permission."',
          nextSceneId: 'enmesh-neutral-ending',
          xpBonus: 10,
          feedback: 'Clear boundary. But might feel like pressure.',
        },
      ],
    },
    {
      id: 'enmesh-8-direct',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Elena winces. \"That's... intense.\" She's quiet. \"My last boyfriend said something similar before he left.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"And what did you do?\" \"I... I tried to balance them both. It didn't work.\" Tried to balance. Not set boundaries. Balance. Like her father and boyfriend were equal priorities.",
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
          text: "Six months later. Michael tested you twice. Both times, Elena handled it. \"Dad, this is my decision. I'm not discussing it with you.\" He backed off. Surprised, but backed off.",
        },
        {
          text: "\"I know he still has opinions,\" Elena says. \"But I'm learning to hear them without following them.\" Progress. Not perfect, but progress. She chose to grow rather than lose you. That's the win.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Emancipation',
      endingSummary: "You entered an enmeshed family dynamic with eyes open. Elena learned to set boundaries because you required them. Not every daddy's princess can break free—but she did.",
    },
    {
      id: 'enmesh-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A year later. Things are... okay. Michael still oversteps. Elena still struggles to push back. You've learned to pick your battles. It's exhausting, but manageable.",
        },
        {
          text: "Sometimes you wonder if 'managing' is enough. If her inability to fully separate is something you can live with forever. You're dating her—and her father's shadow.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Three-Way Relationship',
      endingSummary: "You're making it work, but the enmeshment is always there. Some boundaries hold, some don't. This is sustainable—but is it what you want long-term?",
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Want to understand enmeshment patterns better?',
    },
    {
      id: 'enmesh-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Two years in. Michael is everywhere. Your vacation plans. Your career decisions. Your wedding budget, which he's 'contributing to'—meaning controlling. Elena sees no issue.",
        },
        {
          text: "You find yourself on Instagram. Her ex posted photos from his engagement—to a woman whose father respects boundaries. He looks happy. Genuinely happy. You wonder what that feels like.",
        },
        {
          text: "\"Daddy just wants to help,\" she says. You married into a threesome you never agreed to. And the third wheel wears the pants.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: "Daddy's Approval Required",
      endingSummary: "You normalized the enmeshment until it became your normal. Now you need permission from a man who isn't your father for decisions in your own life.",
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Understanding how this happens can help you heal.',
    },

    // ============================================
    // PATH B: THE HOSTILE FAMILY (Not Good Enough)
    // ============================================
    {
      id: 'hostile-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Hard on exes how?\" you ask. Elena sighs. \"Just... cold. Judgmental. Mom does the 'subtle' comments. Dad does the career interrogation. They didn't think any of them were 'good enough.'\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"Did you ever stand up for them?\" She pauses too long. \"I tried. It's just... hard when your whole family is against someone.\"",
          speakerId: 'elena',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "She 'tried.' Past tense. What happened to those relationships?",
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
          feedback: 'Connecting with her, but you still need intel.',
        },
      ],
    },
    {
      id: 'hostile-2-intel',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Status, mostly. Career. Family background. Dad was first-generation wealth, worked his way up. Now he has... expectations.\" She looks embarrassed. \"And Mom follows his lead.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"What about Kevin?\" \"Kevin is the honest one. He'll tell you straight if they're being ridiculous. He's actually the ally if you can get him.\"",
          speakerId: 'elena',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Dad is status-focused. Brother is the honest one. Play accordingly.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'hostile-2a',
          text: '"So I don\'t try to win Dad over directly. I build real connections with Kevin."',
          nextSceneId: 'hostile-3-strategy',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'strategic_targeting',
          feedback: 'Win the winnable battles. Let the hostile ones reveal themselves.',
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
          text: "Elena looks relieved. \"Okay. Good. Just... don't take anything personally.\" Meaning: there will be things to take personally. Brace yourself.",
        },
      ],
      nextSceneId: 'hostile-3-arrival',
    },
    {
      id: 'hostile-2-empathy',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Elena squeezes your hand. \"Thanks for understanding. Most guys get defensive.\" Her vulnerability is real. The question is whether she can protect you from her family, or just apologize afterward.",
          speakerId: 'elena',
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
          text: "You arrive. Michael opens the door, assessing you in one sweep. Your watch: noted. Your shoes: noted. He offers a handshake that's slightly too firm. \"Elena has told us so little about you.\"",
          speakerId: 'michael',
          emotion: 'cold',
        },
        {
          text: "Translation: Why haven't we vetted you yet? Kevin appears behind him, giving you a subtle nod. An ally, maybe.",
          speakerId: 'kevin',
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
          text: "You arrive. The door opens to cool reception. Michael's handshake is firm, testing. Laura's smile doesn't reach her eyes. Kevin watches from the corner.",
          speakerId: 'michael',
          emotion: 'cold',
        },
        {
          text: "\"So,\" Michael begins immediately, \"What exactly do you do?\" Not 'nice to meet you.' Straight to the credential check.",
          speakerId: 'michael',
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
          text: "At the door, Michael appraises you like a vendor at a market. \"Interesting choice, Elena.\" Interesting. Not lovely. Not nice. Interesting.",
          speakerId: 'michael',
          emotion: 'smirking',
        },
        {
          text: "\"Interesting how?\" you ask before you can stop yourself. His smile sharpens. \"Just an observation.\" First blood. He's testing if you'll cower.",
        },
      ],
      nextSceneId: 'hostile-4-test',
    },
    {
      id: 'hostile-4-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Lunch is an interrogation. \"Where did you go to school?\" \"What's your earning potential?\" \"Where do you see yourself in five years?\" Michael doesn't blink between questions.",
          speakerId: 'michael',
          emotion: 'cold',
        },
        {
          text: "Laura adds subtle jabs. \"Elena's ex was at Goldman. Such a nice boy.\" The comparison is intentional. Elena is frozen, caught between defending you and not confronting her parents.",
        },
        {
          speakerId: 'inner-voice',
          text: "This is a test. Not of your answers, but of your frame under pressure.",
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
          text: '"Is this lunch, or a job interview?" with a calm smile.',
          nextSceneId: 'hostile-5-deflect',
          xpBonus: 15,
          feedback: 'Calling it out with composure. Risky but can work.',
        },
        {
          id: 'hostile-4c',
          text: 'Get defensive. "Why does my salary matter to you?"',
          nextSceneId: 'hostile-5-defensive',
          feedback: 'Defensiveness confirms you\'re rattled. They win this round.',
        },
      ],
    },
    {
      id: 'hostile-5-calm',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You answer each question with composure. Facts, but with warmth. Michael keeps probing, but you're unshakable. Eventually, something shifts in his expression. Not approval—respect. Grudging, but respect.",
          speakerId: 'michael',
          emotion: 'neutral',
        },
        {
          text: "Kevin catches you in the kitchen. \"Most guys either fold or get angry. You did neither. I like that.\"",
          speakerId: 'kevin',
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
          text: "Michael pauses. For a moment you think he's offended—then he actually nods. \"Fair enough. Elena warned me you were direct.\" You've surprised him. Good.",
          speakerId: 'michael',
          emotion: 'smirking',
        },
        {
          text: "The questioning softens slightly. You've shown spine. He respects that, even if he doesn't like it.",
        },
      ],
      nextSceneId: 'hostile-6-ally',
    },
    {
      id: 'hostile-5-defensive',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Michael's smile widens. \"Just curious. Elena's future matters to us.\" But he's seen the crack. You can be rattled. He'll use that.",
          speakerId: 'michael',
          emotion: 'smirking',
        },
        {
          text: "The rest of lunch is worse. Laura mentions Elena's ex again. 'He was so composed.' Direct comparison to your outburst. You're losing ground.",
        },
      ],
      nextSceneId: 'hostile-6-survival',
    },
    {
      id: 'hostile-6-ally',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "As you're leaving, Michael shakes your hand. Still not warm, but different. \"You're not like the others.\" \"Is that good?\" you ask. He considers. \"We'll see.\"",
          speakerId: 'michael',
          emotion: 'neutral',
        },
        {
          text: "In the car, Elena exhales. \"That was... way better than expected. Dad actually seemed to respect you.\"",
          speakerId: 'elena',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: "You survived the hazing. Now build on what you've earned.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'hostile-6a',
          text: '"Kevin seems like the honest one. I\'d like to build something there."',
          nextSceneId: 'hostile-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'ally_building',
          feedback: 'Win the winnable. Kevin will tell you the truth when others won\'t.',
        },
        {
          id: 'hostile-6b',
          text: '"Your dad is tough. But I think we\'ll be okay."',
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
          text: "You survived. Barely. At the door, Michael's goodbye is perfunctory. \"Safe travels.\" He's dismissed you already.",
          speakerId: 'michael',
          emotion: 'cold',
        },
        {
          text: "In the car, Elena is quiet. \"That could have gone better.\" She doesn't defend you or acknowledge their behavior. Just notes the failure.",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "She didn't defend you. And her first comment was about YOUR performance.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'hostile-6c',
          text: '"I noticed you didn\'t say anything when they were grilling me."',
          nextSceneId: 'hostile-7-confront',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'accountability',
          feedback: 'Naming her passivity. She needs to hear this.',
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
          text: "Elena looks stung. \"I... I was going to, but—\" \"But you didn't.\" She's quiet. \"You're right. I froze. I always freeze.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"That has to change,\" you say. \"I'm not going to fight your family alone.\" She nods slowly. \"I know. I need to work on this.\"",
          speakerId: 'elena',
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
          text: "A year later. Kevin texts you directly now. Inside jokes. Warnings when Michael is on a warpath. \"Heads up—Dad found your LinkedIn. Prepare commentary on your job title.\"",
        },
        {
          text: "Michael hasn't fully warmed up—maybe never will. But you've built real connections around him. Laura softened once she saw you weren't intimidated. Kevin is genuinely a friend. The hostile gatekeeper couldn't stop the real relationships from forming.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Respect Earned',
      endingSummary: "You survived the hostile family by staying calm, being strategic, and building allies where you could. The gatekeeper didn't approve you—but he couldn't stop you either.",
    },
    {
      id: 'hostile-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things improve. Slowly. Elena is learning to speak up—sometimes. Michael still makes comments, but you've developed armor. It's not warm, but it's workable.",
        },
        {
          text: "You wonder sometimes if 'workable' is enough. If you want to spend holidays defending your worth for the rest of your life. But for now, you're choosing to stay and see.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Uneasy Truce',
      endingSummary: "You're surviving the hostile family, but not thriving. Elena is growing, slowly. The question is whether you want to wait out her growth or find peace elsewhere.",
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Want to understand hostile family patterns?',
    },
    {
      id: 'hostile-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Two years in. Every holiday is a test. Every visit requires recovery time. Elena still doesn't stand up for you—she just apologizes afterward. \"You know how they are.\"",
        },
        {
          text: "Her ex—the Goldman guy—got engaged. Laura made sure Elena knew. Made sure you knew. \"Such a nice wedding. His family was so welcoming.\" The comparison is permanent.",
        },
        {
          text: "You've become smaller. Less yourself. The version of you that survives these visits isn't the version you like. They didn't destroy you—they're eroding you, slowly.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Never Good Enough',
      endingSummary: "You hoped the hostile family would change. They didn't. Now you're the one who changed—diminished, guarded, always proving your worth to people who will never approve.",
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
          text: "\"Tension how?\" you ask. Elena hesitates. \"They perform. The perfect family. But in private, there's... stuff. Dad and Mom barely speak when no one's watching. Kevin and I learned to pretend.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"What happens when the pretending stops?\" \"It doesn't. That's the rule. We're always 'on' for guests. I'm just warning you—what you see isn't what's real.\"",
          speakerId: 'elena',
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
          feedback: 'Connecting with her experience. Important context.',
        },
      ],
    },
    {
      id: 'perform-2-dig',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Elena goes quiet. \"Mom had an affair. Years ago. Dad never forgave her but never left either. Now they just... pretend. Happy in public, strangers in private.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"And you and Kevin?\" \"We learned early that feelings aren't discussed. You smile. You perform. You don't talk about what's real.\"",
          speakerId: 'elena',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "A family that buries emotion. Watch for where that pattern shows up in her.",
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
          feedback: 'She just showed vulnerability. Acknowledge it.',
        },
        {
          id: 'perform-2b',
          text: '"Do you still do that? Pretend instead of being real?"',
          nextSceneId: 'perform-3-probe',
          xpBonus: 10,
          feedback: 'Important question. She may not know the answer.',
        },
      ],
    },
    {
      id: 'perform-2-normalize',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"Not like this,\" Elena says. \"My friend's family argues at dinner. Has real conversations. We just... smile. It's exhausting. And no one ever says what they mean.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "She looks at you. \"I'm trying to not be like that. But I don't always know when I'm doing it.\"",
          speakerId: 'elena',
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
          text: "\"Honestly? I don't know anymore. It's just... normal now. Kevin and I developed a code. Two coughs means 'can we leave.' Three means 'intervention needed.'\"",
          speakerId: 'elena',
          emotion: 'smirking',
        },
        {
          text: "She's joking, but there's real pain underneath. This family taught her feelings are inconvenient.",
        },
      ],
      nextSceneId: 'perform-3-arrival',
    },
    {
      id: 'perform-3-aware',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You arrive. The house is immaculate. Laura greets you with a hug that feels rehearsed—perfect pressure, perfect duration. Michael's handshake is firm. Everyone is smiling. It's like a magazine shoot.",
          speakerId: 'laura',
          emotion: 'happy',
        },
        {
          text: "Kevin catches your eye. A flicker of something real—then the performance face returns. He mouths 'Good luck' when no one's looking.",
          speakerId: 'kevin',
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
          text: "Elena is quiet. \"Probably. I notice it sometimes—I'm saying one thing and feeling another. I'm working on it.\" She looks at you. \"Can you tell when I'm doing it?\"",
          speakerId: 'elena',
          emotion: 'confused',
        },
        {
          text: "That's a real question. She wants to know. \"Sometimes. But I'd rather you just told me.\"",
        },
      ],
      nextSceneId: 'perform-3-arrival',
    },
    {
      id: 'perform-3-arrival',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The house is beautiful. Perfect landscaping, perfect decor, perfect family photo on the mantle. Laura welcomes you with a smile that doesn't quite reach her eyes.",
          speakerId: 'laura',
          emotion: 'happy',
        },
        {
          text: "\"We're so thrilled to meet you!\" Too enthusiastic. Too polished. Michael appears with drinks. \"Welcome, welcome!\" Same energy. Same performance.",
        },
      ],
      nextSceneId: 'perform-4-dinner',
    },
    {
      id: 'perform-4-dinner',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Dinner is pleasant on the surface. Pleasant topics. Pleasant smiles. Laura asks about your job with practiced interest. Michael laughs at appropriate moments. But you notice—they never look at each other.",
          speakerId: 'laura',
          emotion: 'happy',
        },
        {
          text: "When Laura tells a story, Michael zones out. When he speaks, she checks her phone. Two people sharing a stage, not a life.",
        },
        {
          speakerId: 'inner-voice',
          text: "Perfect performance. Zero connection. This is what they modeled for Elena.",
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
          text: 'Ask something real. "What\'s the hardest thing about being married this long?"',
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
          text: "You match their energy. Pleasant questions, pleasant answers. Laura seems pleased—you've passed the social test. But you've learned nothing real.",
        },
        {
          text: "Later, Kevin corners you in the hallway. \"You're good at this. The performance.\" He doesn't say it as a compliment.",
          speakerId: 'kevin',
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
          text: "The table freezes. Laura coughs. Michael's smile tightens. \"Well. Marriage is... partnership.\" Non-answer. But Kevin is watching you with new interest.",
          speakerId: 'laura',
          emotion: 'cold',
        },
        {
          text: "\"Partnership,\" Michael echoes. They share a glance—the first real acknowledgment of each other all evening. And it's loaded with something unspoken.",
          speakerId: 'michael',
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
          text: '"Sorry, that was forward. I was just curious about long-term relationships."',
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
          text: "You watch. After dessert, Michael makes a comment about the wine choice. Laura snaps back—just a flash—then the smile returns. But you saw it. The mask slipped.",
          speakerId: 'laura',
          emotion: 'angry',
        },
        {
          text: "Kevin catches your eye. He saw you notice. A tiny nod. He's been watching too, his whole life.",
          speakerId: 'kevin',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'perform-6-aftermath',
    },
    {
      id: 'perform-6-retreat',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Laura visibly relaxes. \"No, no, it's a fair question. We've just learned to focus on the good.\" Focus on the good. Ignore the bad. Pretend problems don't exist.",
          speakerId: 'laura',
          emotion: 'happy',
        },
        {
          text: "Elena squeezes your hand under the table. Grateful or warning? Hard to tell.",
          speakerId: 'elena',
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
          text: "The silence stretches. Finally, Kevin speaks. \"The hardest thing is probably pretending everything is fine when it isn't.\" Laura's face freezes. Michael looks at his plate. Truth—finally.",
          speakerId: 'kevin',
          emotion: 'serious',
        },
        {
          text: "\"Kevin.\" Laura's voice is sharp. Then softens. \"We're a family. Families work through things.\" But she doesn't deny it. She can't.",
          speakerId: 'laura',
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
          text: "At the door, hugs are distributed. Michael's handshake for you is firm but impersonal. Laura's smile is perfect. Kevin gives you a real nod.",
          speakerId: 'laura',
          emotion: 'happy',
        },
        {
          text: "In the car, Elena is quiet. \"So... that's my family.\" She looks at you. \"What did you see?\"",
          speakerId: 'elena',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "She's asking if you saw through the performance. Be honest.",
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
          feedback: 'Honest but kind. Seeing her, not judging her.',
        },
        {
          id: 'perform-6b',
          text: '"They seem nice. Maybe a little formal."',
          nextSceneId: 'perform-7-polite',
          feedback: 'Performing back at her. She asked for truth; you gave her polish.',
        },
        {
          id: 'perform-6c',
          text: '"I\'m concerned about what you learned from them about relationships."',
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
          text: "Elena exhales. \"Yeah. That's... yeah.\" She's quiet for a moment. \"I don't want us to be like that. I want to be able to say when things are hard.\"",
          speakerId: 'elena',
          emotion: 'sad',
        },
        {
          text: "\"Good. Because I don't do performances.\" She smiles, and this time it's real. \"That's why I like you.\"",
          speakerId: 'elena',
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
          text: "Elena looks at you. Something closes in her eyes. \"Yeah. They're... fine.\" She's performing now. With you. The pattern continues.",
          speakerId: 'elena',
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
          text: "Elena stiffens. \"I'm not my parents.\" Defensive. But also—maybe—listening. \"I know I learned some things from them that aren't healthy. I'm working on it.\"",
          speakerId: 'elena',
          emotion: 'angry',
        },
        {
          text: "\"That's all I'm asking.\" She nods slowly. The conversation isn't over, but the door is open.",
          speakerId: 'elena',
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
          text: "Six months later. You and Elena have a rule: no performing with each other. If something's wrong, you say it. If you're upset, you name it. It's harder than pretending—and so much better.",
        },
        {
          text: "Her family still performs. But Elena has learned to step out of the stage when she's with you. Kevin texts sometimes: \"How do you get her to actually talk about feelings?\" She's breaking the cycle. One honest conversation at a time.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Behind the Curtain',
      endingSummary: "You saw through the performative family and helped Elena see it too. She's learning to be real instead of polished. The pattern ends with her—because you showed her there's another way.",
    },
    {
      id: 'perform-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things continue. Some days Elena is real with you. Other days, you catch her performing—saying what she thinks you want to hear instead of what's true.",
        },
        {
          text: "You're not sure if she's aware of it. You're not sure if you should keep pointing it out. The performative family is still running the show in her head, even when they're not in the room.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Lingering Script',
      endingSummary: "She's trying, but the performance habits run deep. Sometimes you get the real Elena. Sometimes you get the version her family trained. The question is whether you can wait for consistent authenticity.",
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
          text: "Years later, you catch yourself performing with Elena about things that matter. When did you stop saying what's real? When did pretending become your default too?",
        },
        {
          text: "You see her parents now. They remind you of yourselves. You joined the play. Now you don't know how to exit.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Method Actor',
      endingSummary: "You adapted to the performative family by becoming one of them. Now you perform too—even with yourself. The mask became your face.",
      endingLearnReference: 'family-dynamics-101',
      endingLearnPrompt: 'Understanding what happened can help you find yourself again.',
    },
  ],
};
