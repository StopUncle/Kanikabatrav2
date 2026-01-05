// Scenario: The Rotation Master (Male Version)
// Managing multiple prospects strategically
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../../types';

export const maleRotationMasterScenario: Scenario = {
  id: 'male-rotation-master',
  title: 'The Rotation Master',
  tagline: 'Options eliminate desperation.',
  description:
    "You've been fixated on Mia for months—and she knows it. Time to break the pattern. Enter Emma and Sophia. Your mission: build a rotation that restores your power.",
  tier: 'premium',
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  category: 'healthy',
  xpReward: 150,
  badgeId: 'options-king',
  targetGender: 'male',

  tacticsLearned: [
    'The Three-Minimum Rule',
    'Breaking intermittent reinforcement',
    'Genuine scarcity through options',
    'Comparison clarity',
    'Abundance vs. player mindset',
  ],
  redFlagsTaught: [
    'Hot/cold cycling (intermittent reinforcement)',
    'Minimum-effort responses',
    'Scarcity mindset tunnel vision',
    'Trading one fixation for another',
    'Confusing options with manipulation',
  ],

  characters: [
    {
      id: 'mia',
      name: 'Mia',
      description: 'Hot and cold. Inconsistent. The one you can\'t stop thinking about.',
      traits: ['inconsistent', 'charming', 'unavailable'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'emma',
      name: 'Emma',
      description: 'New match. Responds same day, makes plans. Feels almost too easy.',
      traits: ['consistent', 'attentive', 'genuine'],
      defaultEmotion: 'happy',
    },
    {
      id: 'sophia',
      name: 'Sophia',
      description: 'Friend of a friend. Funny, confident, doesn\'t take herself too seriously.',
      traits: ['funny', 'casual', 'confident'],
      defaultEmotion: 'smirking',
    },
    {
      id: 'mike',
      name: 'Mike',
      description: 'Your best friend. Calls out your bullshit.',
      traits: ['honest', 'supportive', 'direct'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'Your gut feeling.',
      traits: ['intuitive'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    // ============================================
    // SCENE 1: The Friday Night Spiral
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Friday night. You're staring at your phone again. Mia hasn't texted since Tuesday—classic. Three months of this hot-cold pattern, and you're still caught in it.",
        },
        {
          text: "You know this feeling. The waiting. The checking. The interpreting silence as meaning.",
        },
        {
          speakerId: 'inner-voice',
          text: 'How many Friday nights have you spent like this?',
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'Open your dating apps. See who\'s actually trying.',
          nextSceneId: 'scene-2-apps',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'option_building',
          feedback: 'OPTIMAL: Options break fixation. Action beats waiting.',
        },
        {
          id: 'choice-1b',
          text: 'Call Mike instead.',
          nextSceneId: 'scene-2-mike',
          xpBonus: 10,
          tactic: 'support_seeking',
          feedback: 'When you\'re spiraling, call someone who sees clearly.',
        },
        {
          id: 'choice-1c',
          text: 'Put the phone down. Hit the gym.',
          nextSceneId: 'scene-2-gym',
          xpBonus: 8,
          feedback: 'Self-improvement is good. But you\'re still stuck in the pattern.',
        },
        {
          id: 'choice-1d',
          text: 'Text her first. "Hey, how\'s your week?"',
          nextSceneId: 'scene-2-chase',
          xpBonus: 0,
          feedback: 'TRAP: Chasing the inconsistent one. She already knows you\'ll reach out.',
        },
      ],
    },

    // ============================================
    // SCENE 2-CHASE: Chased Mia
    // ============================================
    {
      id: 'scene-2-chase',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You send: \"Hey, how's your week been?\" Delivered. 9:14 PM.",
        },
        {
          text: "You check again at 10. At 11. Before bed. Saturday afternoon, finally: \"Good. Busy. You?\"",
          speakerId: 'mia',
          emotion: 'neutral',
        },
        {
          text: "Two words. Eighteen hours. And your heart still skipped when you saw her name.",
        },
        {
          speakerId: 'inner-voice',
          text: 'This feeling. You hate it. But you keep coming back.',
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-2-chase-a',
          text: 'Match her energy. Reply tomorrow.',
          nextSceneId: 'scene-3-stalemate',
          xpBonus: 5,
          tactic: 'energy_matching',
          feedback: 'Playing her game, not building your own.',
        },
        {
          id: 'choice-2-chase-b',
          text: 'Forget Mia. Open your apps.',
          nextSceneId: 'scene-2-apps',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'option_building',
          feedback: 'OPTIMAL: Redirect attention to people who earn it.',
        },
        {
          id: 'choice-2-chase-c',
          text: '"Good week. Free this weekend?"',
          nextSceneId: 'scene-2-chase-harder',
          xpBonus: 0,
          feedback: 'TRAP: Immediately available after her minimal response.',
        },
      ],
    },

    // ============================================
    // SCENE 2-CHASE-HARDER: Double down on Mia
    // ============================================
    {
      id: 'scene-2-chase-harder',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "She takes four hours to respond: \"Maybe Sunday? I'll let you know.\"",
          speakerId: 'mia',
          emotion: 'neutral',
        },
        {
          text: "Sunday comes. No text. Monday: \"Sorry, totally forgot. Crazy weekend. Next week?\"",
          speakerId: 'mia',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: "She 'forgot' you. And you're still waiting for her to remember.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-chase-hard-a',
          text: '"No worries! Let me know when works."',
          nextSceneId: 'scene-chase-bad-ending',
          xpBonus: 0,
          feedback: 'TRAP: You just taught her you\'ll always wait.',
        },
        {
          id: 'choice-chase-hard-b',
          text: 'Enough. Open the apps. Find other options.',
          nextSceneId: 'scene-2-apps',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good. Took a hit to realize it, but you\'re course-correcting.',
        },
      ],
    },

    // ============================================
    // SCENE CHASE-BAD-ENDING: Never stopped chasing
    // ============================================
    {
      id: 'scene-chase-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three months later. Same pattern. Mia texts when she's bored. You drop everything. Plans materialize 30% of the time.",
        },
        {
          text: "Emma? She met someone who was actually present. Sophia? She stopped responding after you flaked twice for Mia.",
        },
        {
          text: "You had options. You chose to chase someone who treated you like a backup plan.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Backup Plan',
      endingSummary:
        'You had options and burned them all chasing someone who barely noticed. The rotation was right there. You chose anxiety over peace.',
      endingLearnReference: 'Options only work if you actually engage with them.',
      endingLearnPrompt: 'What made Mia\'s inconsistency more attractive than Emma\'s effort?',
    },

    // ============================================
    // SCENE 2-GYM: Went to gym instead
    // ============================================
    {
      id: 'scene-2-gym',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You hit the gym. Good workout. Clear head. But walking back to your car, you check your phone. Still nothing from Mia.",
        },
        {
          text: "Mike texts: \"Bro, you good? You seem off lately. Poker tomorrow?\"",
        },
        {
          speakerId: 'inner-voice',
          text: 'Exercise helped. But the problem is still there.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2gym-a',
          text: '"Yeah, poker sounds good. Need to talk about something too."',
          nextSceneId: 'scene-2-mike',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Good. Combining self-care with perspective.',
        },
        {
          id: 'choice-2gym-b',
          text: 'Check your dating apps instead. Take action.',
          nextSceneId: 'scene-2-apps',
          xpBonus: 12,
          feedback: 'Direct action. Build options.',
        },
      ],
    },

    // ============================================
    // SCENE 2-MIKE: Called Mike
    // ============================================
    {
      id: 'scene-2-mike',
      backgroundId: 'phone-call',
      dialog: [
        {
          text: "\"Let me guess. Mia.\" Mike doesn't even wait for you to speak.",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "\"Bro. You only call me on Friday nights when you're spiraling about her. You need options. Plural. This fixation thing? It's killing you.\"",
          speakerId: 'mike',
          emotion: 'concerned',
        },
        {
          text: "\"What happened to that Emma girl? Or Sophia from Jake's party?\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "He's not wrong. You've been treating them like backups to someone who treats you like a backup.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-mike-a',
          text: '"Emma texts too much. It feels desperate."',
          nextSceneId: 'scene-mike-pushback',
          xpBonus: 0,
          feedback: 'Interesting. Consistent attention feels "desperate" now. Think about that.',
        },
        {
          id: 'choice-mike-b',
          text: '"Maybe you\'re right. I have their numbers."',
          nextSceneId: 'scene-2-apps',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'option_building',
          feedback: 'OPTIMAL: Taking advice from someone who sees clearly.',
        },
        {
          id: 'choice-mike-c',
          text: '"Mia is different though. When it\'s good, it\'s really good."',
          nextSceneId: 'scene-mike-pushback',
          xpBonus: 0,
          feedback: 'TRAP: The "when it\'s good" trap. Classic intermittent reinforcement defense.',
        },
      ],
    },

    // ============================================
    // SCENE MIKE-PUSHBACK: Mike calls you out
    // ============================================
    {
      id: 'scene-mike-pushback',
      backgroundId: 'phone-call',
      dialog: [
        {
          text: "\"Okay, I'm gonna be real with you. You know what Emma's 'desperation' actually is? Consistency. Interest. Effort.\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "\"Mia trained you to think that's weird. That hot-cold bullshit is not chemistry—it's anxiety. You're addicted to the uncertainty. It feels like passion because your nervous system is activated.\"",
          speakerId: 'mike',
          emotion: 'cold',
        },
        {
          text: "\"Just text Emma back. Or Sophia. Give yourself options. Please.\"",
          speakerId: 'mike',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "He might have a point. When did effort start feeling wrong?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-pushback-a',
          text: '"Fine. I\'ll text them both."',
          nextSceneId: 'scene-2-apps',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'option_building',
          feedback: 'OPTIMAL: Sometimes friends see what we can\'t.',
        },
        {
          id: 'choice-pushback-b',
          text: '"I\'ll think about it. Thanks, Mike."',
          nextSceneId: 'scene-2-apps',
          xpBonus: 8,
          feedback: 'Progress is progress.',
        },
        {
          id: 'choice-pushback-c',
          text: '"You don\'t understand. It\'s more complicated than that."',
          nextSceneId: 'scene-denial-path',
          xpBonus: 0,
          feedback: 'TRAP: Defending the pattern that\'s hurting you.',
        },
      ],
    },

    // ============================================
    // SCENE DENIAL-PATH: Stayed in denial
    // ============================================
    {
      id: 'scene-denial-path',
      backgroundId: 'phone-call',
      dialog: [
        {
          text: "Mike sighs. \"Alright man. Your call. Just... don't waste too much time on someone who isn't making time for you.\"",
          speakerId: 'mike',
          emotion: 'sad',
        },
        {
          text: "You hang up. Check your phone. Still nothing from Mia. Saturday morning comes. You see Emma and Sophia's messages sitting there. Unanswered.",
        },
        {
          speakerId: 'inner-voice',
          text: "Options are waiting. Will you take them?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-denial-a',
          text: 'Finally. Text Emma and Sophia.',
          nextSceneId: 'scene-2-apps',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Better late than never.',
        },
        {
          id: 'choice-denial-b',
          text: 'Wait for Mia. She\'ll text eventually.',
          nextSceneId: 'scene-chase-bad-ending',
          xpBonus: 0,
          feedback: 'TRAP: The wait continues. So does the pain.',
        },
      ],
    },

    // ============================================
    // SCENE 3-STALEMATE: Matched Mia's energy
    // ============================================
    {
      id: 'scene-3-stalemate',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You wait until Saturday night to respond: \"Been busy. Good weekend though.\" Mia takes even longer this time.",
        },
        {
          text: "\"You're usually more available. Everything okay?\"",
          speakerId: 'mia',
          emotion: 'confused',
        },
        {
          text: "She noticed. But questioning isn't pursuing. Matching energy just creates a stalemate. You need actual options—not games with the same person.",
        },
      ],
      nextSceneId: 'scene-2-apps',
    },

    // ============================================
    // SCENE 2-APPS: Building the rotation
    // ============================================
    {
      id: 'scene-2-apps',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You open your messages. Two conversations waiting.",
        },
        {
          text: "Emma's last message from three days ago: \"There's this new sushi place I've been wanting to try. Friday at 7?\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "Sophia's from Jake's party last week: \"So when are you buying me that drink you promised?\"",
          speakerId: 'sophia',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: 'Both waiting. Both actually trying. Unlike Mia.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-apps-a',
          text: 'Text Emma: "Friday works. Send me the address."',
          nextSceneId: 'scene-emma-confirmed',
          isOptimal: true,
          xpBonus: 12,
          tactic: 'option_building',
          feedback: 'Specific plans. Real effort. That\'s worth responding to.',
        },
        {
          id: 'choice-apps-b',
          text: 'Text Sophia: "How about Saturday? Pick the spot."',
          nextSceneId: 'scene-sophia-confirmed',
          isOptimal: true,
          xpBonus: 12,
          tactic: 'option_building',
          feedback: 'Casual but real. Options are building.',
        },
        {
          id: 'choice-apps-c',
          text: 'Text them both. Build the full rotation.',
          nextSceneId: 'scene-both-confirmed',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'rotation_building',
          feedback: 'OPTIMAL: Three options breaks fixation completely.',
        },
        {
          id: 'choice-apps-d',
          text: 'Text Emma something casual first. Don\'t want to seem too eager.',
          nextSceneId: 'scene-playing-games',
          xpBonus: 0,
          feedback: 'TRAP: Playing games with someone who\'s being genuine.',
        },
      ],
    },

    // ============================================
    // SCENE PLAYING-GAMES: Started playing games
    // ============================================
    {
      id: 'scene-playing-games',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You text Emma: \"Hey what's up\" - ignoring her specific sushi invite. She responds in an hour: \"Not much. Did you see my last message about Friday?\"",
          speakerId: 'emma',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "She made a plan. You ignored it to 'not seem eager.' That's playing games.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-games-a',
          text: '"Yeah, Friday works. That sushi place sounds good."',
          nextSceneId: 'scene-emma-confirmed',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Recovery. Stopped the game before it got worse.',
        },
        {
          id: 'choice-games-b',
          text: '"Maybe. I might have something. Let me check."',
          nextSceneId: 'scene-games-backfire',
          xpBonus: 0,
          feedback: 'TRAP: She made a specific plan. You\'re playing games.',
        },
      ],
    },

    // ============================================
    // SCENE GAMES-BACKFIRE: Games backfired
    // ============================================
    {
      id: 'scene-games-backfire',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Emma doesn't respond for two days. Then: \"Hey, I made plans with someone else for Friday since you seemed unsure. Maybe another time!\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "She wasn't playing games. She just moved on to someone who valued her time.",
        },
        {
          speakerId: 'inner-voice',
          text: 'You played games with someone genuine. She found someone who wasn\'t.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-backfire-a',
          text: 'Text Sophia before you lose her too.',
          nextSceneId: 'scene-sophia-confirmed',
          isOptimal: true,
          xpBonus: 8,
          feedback: 'Lesson learned. Don\'t lose Sophia the same way.',
        },
        {
          id: 'choice-backfire-b',
          text: 'Double down: "No worries. Your loss."',
          nextSceneId: 'scene-burned-emma',
          xpBonus: 0,
          feedback: 'TRAP: Ego protection. You played games and lost. Own it.',
        },
      ],
    },

    // ============================================
    // SCENE BURNED-EMMA: Burned the bridge
    // ============================================
    {
      id: 'scene-burned-emma',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "No response. Emma is gone. You tell yourself she wasn't that interesting anyway. But your phone feels emptier now.",
        },
        {
          text: "Sophia's message is still there. But how long before you play games with her too?",
        },
      ],
      nextSceneId: 'scene-sophia-confirmed',
    },

    // ============================================
    // SCENE EMMA-CONFIRMED: Emma date set
    // ============================================
    {
      id: 'scene-emma-confirmed',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "\"Perfect! It's called Sakura on Vine. I'll grab us a reservation. Looking forward to it 😊\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "She responded in two minutes. With enthusiasm. Made the reservation herself. One down. Sophia is still waiting.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Two minutes. Real interest looks like this. Strange how unfamiliar it feels.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-emma-a',
          text: 'Text Sophia too: "Saturday drinks?"',
          nextSceneId: 'scene-both-confirmed',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'rotation_building',
          feedback: 'OPTIMAL: Full rotation activated.',
        },
        {
          id: 'choice-emma-b',
          text: 'One at a time. See how Emma goes first.',
          nextSceneId: 'scene-friday-emma',
          xpBonus: 5,
          feedback: 'Progress, but two options is still fragile.',
        },
        {
          id: 'choice-emma-c',
          text: 'Focus completely on Emma. She seems great.',
          nextSceneId: 'scene-new-fixation',
          xpBonus: 0,
          feedback: 'TRAP: Trading one fixation for another.',
        },
      ],
    },

    // ============================================
    // SCENE NEW-FIXATION: Fixated on Emma instead
    // ============================================
    {
      id: 'scene-new-fixation',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You delete the apps. Cancel on Sophia with a vague excuse. Emma is the one. You can feel it.",
        },
        {
          text: "One date later, you're texting her constantly. Checking her last seen. Analyzing response times. Sound familiar?",
        },
        {
          speakerId: 'inner-voice',
          text: "Different name. Same pattern. You didn't learn—you just switched targets.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-fixation-a',
          text: 'Catch yourself. Reach back out to Sophia.',
          nextSceneId: 'scene-sophia-confirmed',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Good save. Recognized the pattern before it took hold.',
        },
        {
          id: 'choice-fixation-b',
          text: 'Keep going. This time is different.',
          nextSceneId: 'scene-fixation-bad',
          xpBonus: 0,
          feedback: 'TRAP: "This time is different" is the lie fixation tells.',
        },
      ],
    },

    // ============================================
    // SCENE FIXATION-BAD: New fixation ended badly
    // ============================================
    {
      id: 'scene-fixation-bad',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three weeks later. Emma likes you, but your energy is... intense. \"You're always available. Don't you have stuff going on?\"",
          speakerId: 'emma',
          emotion: 'confused',
        },
        {
          text: "\"I just want to spend time with you,\" you say. She smiles but her eyes say something else.",
        },
        {
          text: "Six weeks later, she ends it. \"You're really sweet, but I felt like I was your whole world. It was a lot of pressure.\"",
          speakerId: 'emma',
          emotion: 'sad',
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The New Obsession',
      endingSummary:
        'You traded Mia-fixation for Emma-fixation. The lesson wasn\'t about who—it was about how. Options create security. Obsession creates pressure.',
      endingLearnReference: 'Rotation isn\'t about backup plans. It\'s about emotional stability.',
      endingLearnPrompt: 'How did the fixation pattern show up with Emma?',
    },

    // ============================================
    // SCENE SOPHIA-CONFIRMED: Sophia date set
    // ============================================
    {
      id: 'scene-sophia-confirmed',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "\"Finally! I know a great cocktail bar. Saturday 8pm?\"",
          speakerId: 'sophia',
          emotion: 'smirking',
        },
        {
          text: "No games. Just plans. Emma's sushi offer is still sitting there.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Direct. Decisive. Refreshing.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-sophia-a',
          text: 'Accept Emma\'s dinner too. Friday and Saturday covered.',
          nextSceneId: 'scene-both-confirmed',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'rotation_building',
          feedback: 'OPTIMAL: Full rotation activated.',
        },
        {
          id: 'choice-sophia-b',
          text: 'Just Sophia for now. Don\'t overcomplicate it.',
          nextSceneId: 'scene-saturday-sophia',
          xpBonus: 5,
          feedback: 'Progress, but two options is still fragile.',
        },
      ],
    },

    // ============================================
    // SCENE BOTH-CONFIRMED: Full rotation
    // ============================================
    {
      id: 'scene-both-confirmed',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Friday: Dinner with Emma. Saturday: Drinks with Sophia. And Mia... still hasn't texted.",
        },
        {
          text: "Your weekend is full. For the first time in months, you're not waiting. You're living.",
        },
        {
          speakerId: 'inner-voice',
          text: "Interesting how Mia's silence doesn't sting as much right now.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-friday-emma',
    },

    // ============================================
    // SCENE FRIDAY-EMMA: The Emma date
    // ============================================
    {
      id: 'scene-friday-emma',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Friday. Sakura on Vine. Emma's already there, smiles wide when you walk in. \"Hey! You made it. I love that jacket.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "She asks real questions. Remembers things you mentioned. Actually listens.",
        },
        {
          text: "\"I read reviews for like an hour. Wanted tonight to be good.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: 'Effort. Planning. Presence. When did this start feeling unfamiliar?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-emma-date-a',
          text: '"I love that you planned this. Tell me about your week."',
          nextSceneId: 'scene-emma-date-good',
          isOptimal: true,
          xpBonus: 12,
          tactic: 'presence',
          feedback: 'OPTIMAL: Rewarding effort with attention. She earned it.',
        },
        {
          id: 'choice-emma-date-b',
          text: 'Be present but guard yourself. It\'s just a first date.',
          nextSceneId: 'scene-emma-date-good',
          xpBonus: 8,
          feedback: 'Cautious is fine. Just don\'t confuse walls with standards.',
        },
        {
          id: 'choice-emma-date-c',
          text: 'Compare her mentally to Mia throughout.',
          nextSceneId: 'scene-emma-distracted',
          xpBonus: 0,
          feedback: 'TRAP: Mia isn\'t here. Emma is. Be present.',
        },
      ],
    },

    // ============================================
    // SCENE EMMA-DISTRACTED: Not present with Emma
    // ============================================
    {
      id: 'scene-emma-distracted',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You're thinking about Mia. Would she plan a date like this? Would she remember details? Emma is talking about her job but you're only half-listening.",
        },
        {
          text: "\"You okay? You seem distracted.\"",
          speakerId: 'emma',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "She noticed. You're on a date with her body. Your mind is somewhere else.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-distracted-a',
          text: '"Sorry, work stuff. Tell me more about the Japan trip."',
          nextSceneId: 'scene-emma-date-good',
          isOptimal: true,
          xpBonus: 8,
          feedback: 'Recovery. You refocused.',
        },
        {
          id: 'choice-distracted-b',
          text: 'Stay distracted. Check your phone under the table.',
          nextSceneId: 'scene-emma-lost',
          xpBonus: 0,
          feedback: 'TRAP: She put in effort. You disrespected it.',
        },
      ],
    },

    // ============================================
    // SCENE EMMA-LOST: Lost Emma from inattention
    // ============================================
    {
      id: 'scene-emma-lost',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "The date ends early. \"This was nice,\" Emma says flatly. \"Let me know if you want to hang out again.\"",
          speakerId: 'emma',
          emotion: 'neutral',
        },
        {
          text: "You text her a few days later. She's polite but distant. Plans never materialize. You burned an option by not being present.",
        },
      ],
      nextSceneId: 'scene-saturday-sophia',
    },

    // ============================================
    // SCENE EMMA-DATE-GOOD: Good date with Emma
    // ============================================
    {
      id: 'scene-emma-date-good',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Halfway through dinner, your phone lights up. Mia: \"What are you up to tonight?\"",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          text: "Of course. NOW she texts. Emma is mid-sentence about her brother's wedding.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Of course. NOW she texts. When you\'re finally not available.',
          emotion: 'smirking',
        },
      ],
      choices: [
        {
          id: 'choice-mia-text-a',
          text: 'Flip your phone face-down. Stay present.',
          nextSceneId: 'scene-date-continues',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'presence_discipline',
          feedback: 'OPTIMAL: Real investment beats crumbs. Emma is here. Mia is not.',
        },
        {
          id: 'choice-mia-text-b',
          text: 'Silence your phone without looking.',
          nextSceneId: 'scene-date-continues',
          xpBonus: 12,
          tactic: 'tech_discipline',
          feedback: 'Close. You didn\'t look, but you made it obvious something happened.',
        },
        {
          id: 'choice-mia-text-c',
          text: 'Check it quickly but don\'t respond.',
          nextSceneId: 'scene-date-continues',
          xpBonus: 5,
          feedback: 'You looked. The hook still has hold.',
        },
        {
          id: 'choice-mia-text-d',
          text: '"Excuse me one second." Text back: "Out with friends."',
          nextSceneId: 'scene-date-interrupted',
          xpBonus: 0,
          feedback: 'TRAP: You left the present moment for someone who gives you nothing.',
        },
      ],
    },

    // ============================================
    // SCENE DATE-CONTINUES: Stayed present
    // ============================================
    {
      id: 'scene-date-continues',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You keep your attention on Emma. She notices your phone light up—you didn't reach for it.",
        },
        {
          text: "\"You didn't need to get that?\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "\"It can wait. You were telling me about the speech.\"",
        },
        {
          text: "Her smile widens. That mattered to her.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Presence is noticed. Attention is currency. You just invested in the right place.',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-saturday-sophia',
    },

    // ============================================
    // SCENE DATE-INTERRUPTED: Left to text Mia
    // ============================================
    {
      id: 'scene-date-interrupted',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You step away to text Mia: \"Out with friends. What's up?\" When you return, Emma's posture has shifted.",
        },
        {
          text: "\"Everything okay?\"",
          speakerId: 'emma',
          emotion: 'confused',
        },
        {
          text: "\"Yeah, just a friend.\"",
        },
        {
          text: "Mia never responds, by the way. Of course she doesn't.",
        },
        {
          speakerId: 'inner-voice',
          text: 'She knows. Perceptive people notice divided attention.',
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'scene-saturday-sophia',
    },

    // ============================================
    // SCENE SATURDAY-SOPHIA: The Sophia date
    // ============================================
    {
      id: 'scene-saturday-sophia',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Saturday. Cocktail bar with Sophia. Completely different energy. Easy. Funny. No pressure.",
          speakerId: 'sophia',
          emotion: 'smirking',
        },
        {
          text: "\"I like that you're hard to pin down. Most guys respond immediately.\"",
          speakerId: 'sophia',
          emotion: 'smirking',
        },
        {
          text: "\"Maybe I had other plans.\"",
        },
        {
          text: "\"Even better. Means you have a life.\"",
          speakerId: 'sophia',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: 'Your unavailability was real. No games needed. That\'s the difference.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-sophia-date-a',
          text: '"I do now. What\'s your excuse for being single?"',
          nextSceneId: 'scene-sophia-flirt',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'playful_challenge',
          feedback: 'OPTIMAL: Playful. Confident. This is the energy options create.',
        },
        {
          id: 'choice-sophia-date-b',
          text: '"Let\'s just say I\'m selective."',
          nextSceneId: 'scene-sophia-flirt',
          xpBonus: 10,
          tactic: 'mysterious_reply',
          feedback: 'Close. Intriguing but maybe a touch coy.',
        },
        {
          id: 'choice-sophia-date-c',
          text: 'Keep it light. Feel out the vibe first.',
          nextSceneId: 'scene-sophia-chill',
          xpBonus: 8,
          feedback: 'Measured approach. Nothing wrong with that.',
        },
        {
          id: 'choice-sophia-date-d',
          text: '"Yeah, I was seeing someone inconsistent. Getting over that."',
          nextSceneId: 'scene-sophia-mia-mention',
          xpBonus: 0,
          feedback: 'TRAP: Bringing up Mia on a date with Sophia. Her energy shifts.',
        },
      ],
    },

    // ============================================
    // SCENE SOPHIA-MIA-MENTION: Mentioned Mia
    // ============================================
    {
      id: 'scene-sophia-mia-mention',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Sophia's smile tightens slightly. \"Oh? Sounds like there's still something there.\"",
          speakerId: 'sophia',
          emotion: 'neutral',
        },
        {
          text: "The rest of the night is fine, but something's different. She's more guarded. You brought another woman's ghost into the room.",
        },
        {
          speakerId: 'inner-voice',
          text: "She's wondering if she's a rebound. Fair question, honestly.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-mia-mention-a',
          text: '"No, that\'s over. I\'m here now. Tell me about that trip you mentioned."',
          nextSceneId: 'scene-sophia-chill',
          isOptimal: true,
          xpBonus: 8,
          feedback: 'Good recovery. Redirect and be present.',
        },
        {
          id: 'choice-mia-mention-b',
          text: 'Keep explaining the Mia situation.',
          nextSceneId: 'scene-sophia-exit',
          xpBonus: 0,
          feedback: 'TRAP: You\'re on a date with Sophia. Stop talking about Mia.',
        },
      ],
    },

    // ============================================
    // SCENE SOPHIA-EXIT: Sophia lost interest
    // ============================================
    {
      id: 'scene-sophia-exit',
      backgroundId: 'bar',
      dialog: [
        {
          text: "The date ends early. \"This was fun,\" Sophia says. \"Let me know when you're over her.\"",
          speakerId: 'sophia',
          emotion: 'cold',
        },
        {
          text: "Ouch. Direct. But fair. You spent half the date talking about someone else.",
        },
      ],
      nextSceneId: 'scene-sunday-limited',
    },

    // ============================================
    // SCENE SOPHIA-FLIRT: Playful exchange
    // ============================================
    {
      id: 'scene-sophia-flirt',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Honestly? I was waiting for someone interesting enough.\" She holds eye contact a beat longer than necessary.",
          speakerId: 'sophia',
          emotion: 'seductive',
        },
        {
          text: "\"I think I found him.\"",
          speakerId: 'sophia',
          emotion: 'happy',
        },
        {
          text: "Two dates in two days. Both women actually present. Actually trying.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Mia feels... smaller now. Like a bad habit you\'re outgrowing.',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-sunday-clarity',
    },

    // ============================================
    // SCENE SOPHIA-CHILL: Casual good date
    // ============================================
    {
      id: 'scene-sophia-chill',
      backgroundId: 'bar',
      dialog: [
        {
          text: "You keep it easy. Fun conversation, good drinks. She walks you to your car.",
        },
        {
          text: "\"This was fun. Let me know when you're free again.\"",
          speakerId: 'sophia',
          emotion: 'happy',
        },
        {
          text: "Two dates in two days. Both women showed up. Actually tried.",
        },
        {
          speakerId: 'inner-voice',
          text: 'When did Mia last put in this much effort? You can\'t remember.',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-sunday-clarity',
    },

    // ============================================
    // SCENE SUNDAY-LIMITED: Only one option left
    // ============================================
    {
      id: 'scene-sunday-limited',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Sunday morning. You burned Sophia by talking about Mia. Emma is interested, but one option isn't a rotation. It's another fixation waiting to happen.",
        },
        {
          text: "Mia texts: \"Wanna hang this week?\"",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Two options down. Back to square one?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-limited-a',
          text: 'Ignore Mia. Focus on Emma and meet new people.',
          nextSceneId: 'scene-rebuild-partial',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good. Learn from mistakes and keep building.',
        },
        {
          id: 'choice-limited-b',
          text: '"Sure, when works?"',
          nextSceneId: 'scene-chase-bad-ending',
          xpBonus: 0,
          feedback: 'TRAP: You had options. Lost them. Went back to the pattern.',
        },
      ],
    },

    // ============================================
    // SCENE REBUILD-PARTIAL: Rebuilding after mistakes
    // ============================================
    {
      id: 'scene-rebuild-partial',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You made mistakes. But you learned. Emma is still interested. You start talking to a few new people. The rotation is rebuilding.",
        },
        {
          text: "Mia's texts go unanswered. She notices. Her messages increase. Then stop entirely when she realizes you're not coming back.",
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },

    // ============================================
    // SCENE SUNDAY-CLARITY: Full clarity
    // ============================================
    {
      id: 'scene-sunday-clarity',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Sunday morning. Coffee in hand. Three texts on your phone.",
        },
        {
          text: "Emma: \"Had an amazing time. Already thinking about date two.\"",
          speakerId: 'emma',
          emotion: 'happy',
        },
        {
          text: "Sophia: \"You're trouble. When can I see you again?\"",
          speakerId: 'sophia',
          emotion: 'smirking',
        },
        {
          text: "And Mia... finally responding from Friday night: \"Fell asleep. Wanna hang this week?\"",
          speakerId: 'mia',
          emotion: 'neutral',
        },
        {
          text: "Two days to respond. \"Fell asleep.\" That's her excuse.",
        },
        {
          speakerId: 'inner-voice',
          text: 'The contrast is impossible to ignore now.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-sunday-a',
          text: 'Reply to Emma and Sophia first. Mia can wait.',
          nextSceneId: 'scene-three-weeks',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'priority_setting',
          feedback: 'OPTIMAL: Attention goes to those who earn it.',
        },
        {
          id: 'choice-sunday-b',
          text: '"Maybe next week. I\'m pretty busy."',
          nextSceneId: 'scene-three-weeks',
          xpBonus: 12,
          tactic: 'honest_unavailability',
          feedback: 'Honest. Not rejecting, not prioritizing.',
        },
        {
          id: 'choice-sunday-c',
          text: 'Reply to all three equally. Keep your options open.',
          nextSceneId: 'scene-three-weeks',
          xpBonus: 8,
          tactic: 'rotation_maintenance',
          feedback: 'Close. You\'re not prioritizing effort, but at least you\'re not chasing.',
        },
        {
          id: 'choice-sunday-d',
          text: '"Sure! When works for you?"',
          nextSceneId: 'scene-relapse',
          xpBonus: 0,
          feedback: 'TRAP: The hook pulled. Two days of nothing and you jumped.',
        },
      ],
    },

    // ============================================
    // SCENE RELAPSE: Fell back to Mia
    // ============================================
    {
      id: 'scene-relapse',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You texted back immediately. She responded... three hours later. \"Maybe Wednesday? I'll let you know.\"",
          speakerId: 'mia',
          emotion: 'neutral',
        },
        {
          text: "Wednesday comes. No text. You had plans with Emma you almost cancelled. At least you didn't.",
        },
        {
          speakerId: 'inner-voice',
          text: 'The pattern continues. Will you break it this time?',
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-relapse-a',
          text: 'Focus on Emma and Sophia. Mia showed you who she is.',
          nextSceneId: 'scene-three-weeks',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'pattern_recognition',
          feedback: 'OPTIMAL: Learning from the data. Actions over words.',
        },
        {
          id: 'choice-relapse-b',
          text: 'Text Mia: "Did Wednesday not work?"',
          nextSceneId: 'scene-chase-bad-ending',
          xpBonus: 0,
          feedback: 'TRAP: Chasing someone who stood you up. The cycle continues.',
        },
      ],
    },

    // ============================================
    // SCENE THREE-WEEKS: Three weeks later
    // ============================================
    {
      id: 'scene-three-weeks',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Three weeks later. Second date with Emma. Third with Sophia. Mia has texted more in the past week than the previous three months combined. She senses the shift.",
        },
        {
          text: "You run into her at a coffee shop. She looks... different. Nervous? She approaches you.",
        },
        {
          text: "\"Hey. I feel like you've been distant lately. Did I do something?\"",
          speakerId: 'mia',
          emotion: 'confused',
        },
        {
          text: "Her jaw is tight. She's not used to this.",
        },
        {
          speakerId: 'inner-voice',
          text: 'She senses the shift. The question is: what do you do with it?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-confrontation-a',
          text: '"Just been busy. I have a lot going on."',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'mysterious_unavailability',
          feedback: 'OPTIMAL: Vague, true, powerful. Let her wonder.',
        },
        {
          id: 'choice-confrontation-b',
          text: '"I\'ve been seeing other people. You were inconsistent."',
          nextSceneId: 'scene-honest-ending',
          xpBonus: 15,
          tactic: 'direct_honesty',
          feedback: 'Bold honesty. Removes mystery but establishes clarity.',
        },
        {
          id: 'choice-confrontation-c',
          text: '"No, of course not! I miss you. Want to hang out tonight?"',
          nextSceneId: 'scene-chase-bad-ending',
          xpBonus: 0,
          feedback: 'TRAP: Three weeks of progress, gone in one sentence.',
        },
        {
          id: 'choice-confrontation-d',
          text: '"Now you want to talk? Where was this energy before?"',
          nextSceneId: 'scene-bitter-ending',
          xpBonus: 5,
          feedback: 'Bitter. She earned it, but this isn\'t power. It\'s resentment.',
        },
      ],
    },

    // ============================================
    // SCENE BITTER-ENDING: Bitter confrontation
    // ============================================
    {
      id: 'scene-bitter-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Mia's eyes widen. \"Okay, wow.\" She steps back. \"I didn't realize you were keeping score.\"",
          speakerId: 'mia',
          emotion: 'cold',
        },
        {
          text: "She walks away. You got to say your piece. But it felt hollow. Bitter, not powerful.",
        },
        {
          text: "You still have Emma and Sophia. But you're realizing the goal isn't revenge. It's freedom.",
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },

    // ============================================
    // SCENE HONEST-ENDING: Told her directly
    // ============================================
    {
      id: 'scene-honest-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Mia blinks. \"Oh.\" A pause. \"I didn't realize you were serious about dating.\"",
          speakerId: 'mia',
          emotion: 'confused',
        },
        {
          text: "\"I didn't realize you weren't.\"",
        },
        {
          text: "She nods slowly. \"Fair.\" And walks away. No drama. Just clarity. You both know where you stand now.",
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
          text: "Two months later. Mia faded out when you stopped being available. Predictable. Sophia was fun but nothing deeper developed. Emma kept showing up. Planning. Trying. Consistent.",
        },
        {
          text: "You chose her. But this time—from abundance, not desperation. You know what else is out there now. You're not afraid to be alone.",
        },
        {
          text: "You could rebuild the rotation tomorrow if needed. That security? That's what options provide. Not games. Freedom.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Options King',
      endingSummary:
        'You broke the fixation through options, not willpower. Comparison created clarity. You chose from abundance—and that changes everything.',
    },

    {
      id: 'scene-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You kept the rotation going. One or two options at a time. Better than before. Not checking Mia obsessively anymore.",
        },
        {
          text: "But sometimes you catch yourself wondering what she's doing. The hook isn't fully out yet.",
        },
        {
          text: "Two options is one away from fixation. Three breaks it completely. Progress, not perfection. The lesson continues.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Half Measure',
      endingSummary:
        'Partial rotation, partial freedom. Better than before—but the three-minimum rule exists for a reason.',
      endingLearnReference: 'Two options is fragile. Three creates security.',
      endingLearnPrompt: 'Why is three the magic number for breaking fixation?',
    },

    {
      id: 'scene-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. Same apartment. Same Friday night. Staring at your phone. Waiting for Mia. Emma stopped texting. She met someone who was actually present. Sophia did too.",
        },
        {
          text: "The rotation was right there. Options. Freedom. But the pull toward uncertainty was stronger than the peace of consistency.",
        },
        {
          text: "Some learn the lesson. Some keep repeating the pattern.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Fixation Trap',
      endingSummary:
        'The pattern won. Options were there—Emma, Sophia, freedom. But the addiction to inconsistency was stronger.',
      endingLearnReference: 'Fixation is addiction. Options are the cure.',
      endingLearnPrompt: 'What made the anxiety of uncertainty feel more compelling than peace?',
    },
  ],
};
