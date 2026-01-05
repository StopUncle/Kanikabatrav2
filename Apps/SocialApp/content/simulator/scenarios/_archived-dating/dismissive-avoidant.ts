// Scenario: The Dismissive Avoidant (v2)
// Learn to recognize the "Lone Wolf" who treats intimacy as weakness

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

export const dismissiveAvoidantScenario: Scenario = {
  id: 'dismissive-avoidant',
  title: 'The Dismissive Avoidant',
  tagline: 'The closer you get, the faster they run',
  description:
    "Three months of great chemistry. But whenever you try to go deeper, they shut down. 'I just need my space.' Their walls are fortress-thick. Learn the Reverse Chase Protocol.",
  tier: 'premium',
  estimatedMinutes: 18,
  difficulty: 'advanced',
  category: 'avoidant',
  xpReward: 175,
  badgeId: 'avoidant-whisperer',
  prerequisites: PREREQUISITES,

  templates: {
    avoidant: ['Sam', 'Jordan', 'Alex', 'Morgan', 'Taylor'],
    friend: ['Maya', 'Cate', 'Sarah', 'Lisa', 'Rachel'],
    theirEx: ['their ex', 'their last partner'],
  },

  tacticsLearned: [
    'Dismissive avoidant recognition',
    'Reverse Chase Protocol',
    'Low-stakes emotional bids',
    'Independence vs intimacy fear',
    'Strategic patience without martyrdom',
  ],
  redFlagsTaught: [
    'Emotional shutdown under intimacy',
    '"I just need space" as default response',
    'Independence used as a shield',
    'Deactivating when things get good',
    'Making you feel needy for having needs',
  ],

  characters: [
    {
      id: 'sam',
      name: 'Sam',
      description: 'Charming, successful, independent to a fault. Runs when you get close.',
      traits: ['dismissive-avoidant', 'lone-wolf', 'fear-masked-as-independence'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'maya',
      name: 'Maya',
      description: 'Your friend who has watched this dance before.',
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
        {
          text: "Three months with {avoidant}. When you're together, it's electric—they're smart, successful, the sex is incredible. They make you laugh until you cry. But there's this wall. And the closer you get, the thicker it becomes.",
        },
        {
          text: "Last night was perfect. A home-cooked dinner, hours of talking, falling asleep together. This morning, they're different. Cold. 'Hey, I've got a lot of work today. I should probably head out soon.' It's Saturday. They don't work on Saturdays.",
          speakerId: 'sam',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-2',
    },
    {
      id: 'scene-2',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You feel the familiar sting. Last night meant something to you. To them, it seems to be something to escape from. 'This was really nice though. Let's do it again sometime.' Sometime. Not tonight. Not tomorrow. Sometime.",
          speakerId: 'sam',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "The push-pull. They give you everything, then take it all back.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'strategy-distance',
          text: '"Match their distance" - Become less available yourself.',
          nextSceneId: 'distance-1',
          isOptimal: true,
          xpBonus: 10,
          tactic: 'reverse_chase',
          feedback: "The Reverse Chase Protocol. Stop pursuing and watch what happens.",
        },
        {
          id: 'strategy-safe',
          text: '"Create safe vulnerability" - Make low-stakes emotional bids.',
          nextSceneId: 'safe-1',
          xpBonus: 5,
          tactic: 'low_stakes_bids',
          feedback: "Slow, steady, no pressure. See if they can meet you in small moments.",
        },
        {
          id: 'strategy-name',
          text: '"Name the pattern" - Have a direct conversation about the avoidance.',
          nextSceneId: 'name-1',
          xpBonus: 5,
          tactic: 'direct_address',
          feedback: "Direct communication can work. But timing and delivery matter.",
        },
        {
          id: 'strategy-push',
          text: '"Push for closeness" - Show them you\'re committed to breaking through.',
          nextSceneId: 'push-1',
          feedback: "TRAP: Chasing an avoidant makes them run faster.",
        },
      ],
    },

    // ========== PATH A: MATCH THEIR DISTANCE (Reverse Chase Protocol) ==========
    {
      id: 'distance-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Yeah, for sure. I actually have some things I should probably do today too.' You keep your voice casual. Easy. Like their leaving doesn't affect you. 'Oh, cool. What are you up to?' They expected you to resist. You didn't.",
          speakerId: 'sam',
          emotion: 'confused',
        },
        {
          text: "'Just errands, might grab brunch with {friend}. The usual.' They hesitate at the door—uncharacteristic. 'That sounds nice. I... yeah, I should go.' They leave. You don't text them. Not out of games. Out of genuinely living your life.",
          speakerId: 'sam',
          emotion: 'confused',
        },
      ],
      nextSceneId: 'distance-2',
    },
    {
      id: 'distance-2',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "That evening, your phone buzzes: 'Hey. How was brunch?' THEY texted first. That almost never happens. The reversal—they expect pursuit. What happens when it doesn't come?",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          
          text: "They're reaching because you're not reaching for them.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'distance-2a',
          text: '"Great! Got some shopping done too. How was your work thing?"',
          nextSceneId: 'distance-3a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'casual_response',
          feedback: "OPTIMAL: Warm but not eager. Match their energy, don't exceed it.",
        },
        {
          id: 'distance-2b',
          text: '"Good! I missed you though. Wish you\'d stayed."',
          nextSceneId: 'distance-3b',
          feedback: "Too much. You showed your hand when you had leverage.",
        },
        {
          id: 'distance-2c',
          text: 'Take a few hours to respond. Keep the dynamic going.',
          nextSceneId: 'distance-3c',
          xpBonus: 10,
          tactic: 'delayed_response',
          feedback: "Strategic delay. Let them wonder.",
        },
      ],
    },
    {
      id: 'distance-3a',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'It was fine. I finished early actually. What are you doing tonight?' They're pursuing. Something they almost never do. This is the Reverse Chase Protocol in action.",
          speakerId: 'sam',
          emotion: 'seductive',
        },
        {
          
          text: "When you stopped chasing, they started reaching.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'distance-4a',
          text: '"Actually have plans with friends. Tomorrow?"',
          nextSceneId: 'distance-4-unavailable',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'maintain_scarcity',
          feedback: "OPTIMAL: You have a life. They can wait their turn.",
        },
        {
          id: 'distance-4b',
          text: '"Nothing yet. What did you have in mind?"',
          nextSceneId: 'distance-4-available',
          xpBonus: 8,
          feedback: "You're available. That's fine—just don't make it a pattern.",
        },
      ],
    },
    {
      id: 'distance-3b',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "A long pause. Typing bubbles appear, disappear. Finally: 'That's sweet.' That's it. The warmth retreats. You showed need. They stepped back. Days pass before they reach out again.",
        },
        {
          
          text: "You showed your hand. They stepped back. The pattern continues.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'push-cycle',
    },
    {
      id: 'distance-3c',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You wait three hours. Then respond casually: 'Hey! Sorry was at the gym. What's up?' Their reply comes fast: 'Oh nice. I was just... free tonight if you wanted to do something.' They're pursuing. Something they almost never do.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          
          text: "They had to work for your attention. That changed something.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'distance-5a',
          text: '"Tonight could work. Your place or mine?"',
          nextSceneId: 'distance-good-path',
          xpBonus: 12,
          feedback: "You made yourself available—but they had to work for it.",
        },
        {
          id: 'distance-5b',
          text: '"Can\'t tonight but this week for sure. Thursday?"',
          nextSceneId: 'distance-4-unavailable',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'maintain_schedule',
          feedback: "You have your own life. They can schedule around it.",
        },
      ],
    },
    {
      id: 'distance-4-unavailable',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'Oh. Yeah, Thursday works.' There's something in their tone. They're not used to waiting for you. Unfamiliar territory—they're usually the one setting the pace.",
          speakerId: 'sam',
          emotion: 'confused',
        },
        {
          text: "Thursday arrives. They show up with flowers. Flowers. From the person who called emotion 'unnecessary.' 'I was thinking about you all week.' Something shifted when you stopped being available on demand.",
          speakerId: 'sam',
          emotion: 'seductive',
        },
        {
          
          text: "They're trying. Note the change. See if it lasts.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'distance-6a',
          text: '"These are beautiful. What brought this on?"',
          nextSceneId: 'distance-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'acknowledge_effort',
          feedback: "OPTIMAL: Appreciate the effort. Note the change. See if it lasts.",
        },
        {
          id: 'distance-6b',
          text: '"Is something wrong? This isn\'t like you."',
          nextSceneId: 'distance-question-path',
          xpBonus: 10,
          feedback: "You questioned their effort. They might retreat.",
        },
      ],
    },
    {
      id: 'distance-4-available',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You spend the evening together. They're more present than usual. 'I had a weird day. Was thinking about what you said last night. About wanting more.'",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          text: "'I don't know if I'm built for more. But I... I want to try.' They're opening up. Careful—don't pounce on it.",
          speakerId: 'sam',
          emotion: 'confused',
        },
        {
          
          text: "Their vulnerability is fragile. Don't crush it.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'distance-7a',
          text: '"I appreciate that. Just... show me. Words aren\'t enough anymore."',
          nextSceneId: 'distance-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'actions_over_words',
          feedback: "OPTIMAL: Acknowledge the opening but demand follow-through.",
        },
        {
          id: 'distance-7b',
          text: '"What does trying look like for you?"',
          nextSceneId: 'distance-neutral-ending',
          xpBonus: 10,
          feedback: "Good question. Let them define their terms.",
        },
      ],
    },
    {
      id: 'distance-good-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You spend the night together. For once, they don't flee in the morning. 'This is... nice. I usually can't do mornings after.' They're testing the waters. Seeing if it's safe to stay.",
          speakerId: 'sam',
          emotion: 'confused',
        },
        {
          text: "'You don't have to do anything you're not comfortable with.' They pause. 'I know. That's kind of the point. You don't... push.' When you stopped demanding closeness, they started offering it.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'distance-good-ending',
    },
    {
      id: 'distance-question-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'I... I'm trying. Is that not okay?' Their walls flicker. Ready to come back up. You questioned their effort when they were reaching out.",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          
          text: "Easy. Their vulnerability is fragile. Don't crush it.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'distance-8a',
          text: '"It\'s more than okay. I\'m just... surprised. In a good way."',
          nextSceneId: 'distance-good-ending',
          xpBonus: 15,
          tactic: 'reassure_gently',
          feedback: "You recovered. Kept the door open.",
        },
        {
          id: 'distance-8b',
          text: '"I just want to understand what changed."',
          nextSceneId: 'distance-neutral-ending',
          xpBonus: 8,
          feedback: "You need answers. That's fair. But avoidants don't always have them.",
        },
      ],
    },

    // ========== PATH B: CREATE SAFE VULNERABILITY ==========
    {
      id: 'safe-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Okay. Before you go though—I had a weird dream about my childhood home last night.' You share something small. Vulnerable but not heavy. 'Oh yeah? What happened in it?' They're curious. Engaged, even. Small bids work.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          text: "You tell them the dream. Nothing too intense. Just... sharing. 'That's interesting. I don't really remember my dreams.' They pause. 'My childhood house burned down when I was twelve. So. No dreaming about that.' They said it casually. Like reporting the weather.",
          speakerId: 'sam',
          emotion: 'cold',
        },
        {
          
          text: "A crack in the wall. They shared something real. Don't grab at it.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'safe-2a',
          text: '"That must have been hard."',
          nextSceneId: 'safe-3a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'simple_acknowledgment',
          feedback: "OPTIMAL: Simple acknowledgment. No probing. No therapy.",
        },
        {
          id: 'safe-2b',
          text: '"Oh my god, what happened? Were you okay?"',
          nextSceneId: 'safe-3b',
          feedback: "Too much energy. Watch them retreat.",
        },
        {
          id: 'safe-2c',
          text: 'Just nod. Let the silence hold.',
          nextSceneId: 'safe-3c',
          xpBonus: 12,
          tactic: 'comfortable_silence',
          feedback: "Sometimes presence is enough.",
        },
      ],
    },
    {
      id: 'safe-3a',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Yeah. It was.' They pause. Processing something. 'I don't usually talk about that.' You didn't push. So they kept talking.",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          text: "'Maybe I should... stick around a bit longer? If that's okay.' The work thing evaporated. Interesting.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          
          text: "Invitation without obligation. The avoidant's love language.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'safe-4a',
          text: '"I\'d like that. No pressure though."',
          nextSceneId: 'safe-good-path',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'open_door',
          feedback: "OPTIMAL: Invitation without obligation. The avoidant's love language.",
        },
        {
          id: 'safe-4b',
          text: '"Of course! I\'ll make more coffee."',
          nextSceneId: 'safe-neutral-path',
          xpBonus: 10,
          feedback: "Enthusiastic but not pressuring. Good middle ground.",
        },
      ],
    },
    {
      id: 'safe-3b',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Their face closes like a door slamming. 'It's fine. It was forever ago. Anyway, I should really go.' Too much interest. Felt like an interrogation. They practically sprint to the door.",
          speakerId: 'sam',
          emotion: 'cold',
        },
        {
          
          text: "Too much energy. They felt exposed. Gone.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'push-cycle',
    },
    {
      id: 'safe-3c',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You just sit with them. Let the moment breathe. 'You're not going to ask about it?' 'Only if you want to tell me.' 'That's... different.' They expected a push. You gave space.",
          speakerId: 'sam',
          emotion: 'confused',
        },
        {
          
          text: "Watch what they do when you don't demand more.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'safe-good-path',
    },
    {
      id: 'safe-good-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "They stay. Not just the morning—the whole day. Nothing dramatic. Just... being together. Quietly. 'I don't do this. Usually. Whole days feel like... too much. But this doesn't feel like too much.'",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          
          text: "You're teaching them that closeness isn't suffocating. One hour at a time.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'safe-good-ending',
    },
    {
      id: 'safe-neutral-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "They stay for another hour. Then the walls come back up. 'Okay, I really should go now. This was... good though.' Progress, but limited. They can only handle so much at once.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          
          text: "Small steps. That's how avoidants learn trust. Don't expect leaps.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'safe-neutral-ending',
    },

    // ========== PATH C: NAME THE PATTERN ==========
    {
      id: 'name-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Can we talk for a second before you go?' 'What about?' Their guard goes up immediately. They can feel something coming. Direct path—risky with avoidants. But sometimes necessary.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          text: "'I notice a pattern. We get close, really close. And then you disappear.' 'I don't disappear. I just... need space sometimes.' 'Space from what? From us?' 'From... everything. It's not about you.'",
          speakerId: 'sam',
          emotion: 'cold',
        },
        {
          
          text: "'Not about you.' Classic deflection. It IS about connection.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'name-2a',
          text: '"I\'m not saying it\'s bad. I\'m just noticing. Closeness triggers distance."',
          nextSceneId: 'name-3a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'observation_not_accusation',
          feedback: "OPTIMAL: Observation, not attack. Leaves room for them to reflect.",
        },
        {
          id: 'name-2b',
          text: '"It feels like it\'s about me. Every time we connect, you run."',
          nextSceneId: 'name-3b',
          xpBonus: 8,
          feedback: "You made it about your feelings. Valid, but watch their reaction.",
        },
        {
          id: 'name-2c',
          text: '"Look, if you don\'t want this, just tell me."',
          nextSceneId: 'name-3c',
          feedback: "Ultimatum energy. Avoidants flee from ultimatums.",
        },
      ],
    },
    {
      id: 'name-3a',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "They're quiet. Thinking. 'I guess... yeah. I do that.' Acknowledgment. That's rare. 'I don't know why. Close feels... dangerous. Like I'm losing myself.' Their 'work thing' is forgotten. This is more important.",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          
          text: "They're actually hearing you. Rare.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'name-4a',
          text: '"You\'re not losing yourself. But I get that it feels that way."',
          nextSceneId: 'name-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'validate_experience',
          feedback: "OPTIMAL: Validate the feeling without dismissing it. Perfect.",
        },
        {
          id: 'name-4b',
          text: '"What can I do to make it feel safer?"',
          nextSceneId: 'name-collaboration-path',
          xpBonus: 15,
          tactic: 'collaborative_approach',
          feedback: "Good. You're asking them to co-create safety.",
        },
      ],
    },
    {
      id: 'name-3b',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'It's not about you running. It's just... who I am. I told you from the beginning I'm independent. You knew what this was.' Defensive. They're making it your problem for having expectations.",
          speakerId: 'sam',
          emotion: 'angry',
        },
        {
          
          text: "They're reframing independence as identity. Harder to address now.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'name-5a',
          text: '"Independence is fine. But this feels like avoidance, not independence."',
          nextSceneId: 'name-truth-path',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'reframe_truth',
          feedback: "You named the real thing. Let's see if they can hear it.",
        },
        {
          id: 'name-5b',
          text: '"Maybe I did know. I just hoped it would change."',
          nextSceneId: 'name-neutral-ending',
          xpBonus: 5,
          feedback: "Honest, but now you're the one with the 'problem' of expectations.",
        },
      ],
    },
    {
      id: 'name-3c',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Whoa. Where is this coming from? I never said I don't want this. I just said I have work.' They grab their jacket. The conversation is over before it started. Ultimatums trigger flight. Every time.",
          speakerId: 'sam',
          emotion: 'angry',
        },
        {
          
          text: "Too much pressure. They're gone.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'push-cycle',
    },
    {
      id: 'name-collaboration-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'I don't know. Give me space when I need it? Without... making me feel guilty? And maybe I can try to... tell you when I'm overwhelmed. Instead of just disappearing.' They're offering a compromise. That's huge for an avoidant.",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          
          text: "A negotiation. Rare. Take it seriously.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'name-6a',
          text: '"I can do that. Space without guilt. Just communicate with me."',
          nextSceneId: 'name-good-ending',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'accept_terms',
          feedback: "You negotiated a workable middle ground. Well done.",
        },
        {
          id: 'name-6b',
          text: '"That\'s a start. Let\'s see if we can actually do it."',
          nextSceneId: 'name-neutral-ending',
          xpBonus: 8,
          feedback: "Cautious acceptance. Fair, given the history.",
        },
      ],
    },
    {
      id: 'name-truth-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "They freeze. That landed. 'That's... that's harsh.' 'Maybe. But is it wrong?' 'I don't know. Maybe not.' Painful truths open doors. If they can sit with it.",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          
          text: "You named the truth. Now see if they can handle it.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'name-neutral-ending',
    },

    // ========== PATH D: PUSH FOR CLOSENESS (TRAP) ==========
    {
      id: 'push-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Wait—don't go. Let's talk about this. About us.' 'Talk about what?' 'Where this is going. I feel like every time we get close, you pull away.' 'I just have work, it's not—' 'It's not just today. It's every time. And I need to know where I stand.'",
          speakerId: 'sam',
          emotion: 'cold',
        },
        {
          text: "'I don't do well with pressure. You're asking me to be something I'm not.' Their face is closing. This is flight mode activating. The chase triggered the flight.",
          speakerId: 'sam',
          emotion: 'angry',
        },
        {
          
          text: "They're already gone mentally. You pushed too hard.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'push-2a',
          text: '"I\'m not asking you to change. I just want consistency."',
          nextSceneId: 'push-3a',
          feedback: "Still pushing. Softer, but still pressure.",
        },
        {
          id: 'push-2b',
          text: '"Okay. I hear you. Go do your work thing."',
          nextSceneId: 'push-3b',
          xpBonus: 10,
          tactic: 'back_off',
          feedback: "You realized you were pushing too hard. Good recovery.",
        },
      ],
    },
    {
      id: 'push-3a',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Consistency? I told you who I am. Independent. I need my freedom. Maybe this isn't going to work if you can't handle that.' The conversation escalated. You pushed; they threatened to leave. The avoidant's nuclear option: 'Accept me completely or lose me.'",
          speakerId: 'sam',
          emotion: 'angry',
        },
        {
          
          text: "Fight or flight. And avoidants always choose flight.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'push-4a',
          text: '"Maybe it isn\'t. I can\'t keep being the only one trying."',
          nextSceneId: 'push-standoff-ending',
          xpBonus: 10,
          tactic: 'hold_ground',
          feedback: "You're not backing down. This might end things, but at least with dignity.",
        },
        {
          id: 'push-4b',
          text: '"Wait—I didn\'t mean to push. I\'m sorry."',
          nextSceneId: 'push-apologize-path',
          feedback: "You apologized for having needs. The dynamic is set.",
        },
      ],
    },
    {
      id: 'push-3b',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You back off. Give them space. '...I'll call you later, okay?' Later. Maybe. The pattern lives to see another day. You stopped the flight, but you didn't solve anything. This will happen again.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          
          text: "Temporary reprieve. The pattern remains.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'push-cycle',
    },
    {
      id: 'push-apologize-path',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'It's okay. I just... can't do pressure. You know that.' They leave. You feel smaller than before. You apologized for having needs. They didn't apologize for anything.",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          text: "This dynamic is now established. Your needs are 'pressure.' Their avoidance is 'who they are.'",
        },
        {
          
          text: "You made yourself wrong for wanting more. That won't end well.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'push-bad-ending',
    },
    {
      id: 'push-standoff-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "They leave. The door closes harder than usual. Days pass. Silence. You pushed and they ran. Classic. But at least you know now.",
        },
        {
          text: "Eventually, you realize: you can't chase someone into loving you. They have to choose it.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Standoff',
      endingSummary:
        "You demanded more than they could give. They left rather than try. It hurts, but now you know their ceiling.",
    },
    {
      id: 'push-cycle',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Days pass. They come back around. Things are good for a while. Then the distance returns. Then the closeness. Then the distance. The push-pull continues. They get close, feel scared, retreat, feel lonely, return.",
        },
        {
          text: "You become addicted to the good parts. Tolerant of the bad parts. This could go on for years.",
        },
      ],
      nextSceneId: 'push-bad-ending',
    },

    // ========== ENDINGS ==========
    {
      id: 'distance-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Something shifted when you stopped chasing. Over the next few weeks, they become more present. More consistent. Still not perfect—but trying. 'I don't know what you did. But I feel... safer somehow.'",
          speakerId: 'sam',
          emotion: 'neutral',
        },
        {
          text: "You stopped being a threat to their independence. Now they can choose closeness. The Reverse Chase Protocol worked. Not because you played games. Because you gave them space to come to you.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Reversal',
      endingSummary:
        "When you stopped chasing, they started choosing. The Reverse Chase Protocol isn't manipulation—it's giving avoidants the space they need to realize they want you.",
    },
    {
      id: 'distance-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things are better. Not fixed, but better. They still need space sometimes. But now they tell you instead of disappearing.",
        },
        {
          text: "Progress isn't perfection. Watch the trend, not the moments. This might work. Or it might not. But at least it's honest now.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Work in Progress',
      endingSummary:
        "The pattern is named and being worked on. Avoidants don't change overnight. Patience is required—but so are standards.",
    },
    {
      id: 'safe-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Small moments of vulnerability stack up over time. You don't push. They don't run. Slowly, trust builds. 'I've never had someone just... let me be. Without demanding more.'",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          text: "You showed them closeness without suffocation. That's rare. This is the long game. And it's working.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Safe Harbor',
      endingSummary:
        "You built trust through low-stakes vulnerability and zero pressure. They're learning that closeness doesn't mean losing themselves. Well played.",
    },
    {
      id: 'safe-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Progress, but slow. They can stay for a few hours now. Sometimes a whole day. But the pattern still surfaces. Closeness triggers distance.",
        },
        {
          text: "You're teaching them. But you can't want their growth more than they do. At some point, patience becomes enabling. Know the difference.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Slow Motion',
      endingSummary:
        "The safe approach is working, but slowly. Watch that your patience doesn't become martyrdom. They need to meet you halfway eventually.",
    },
    {
      id: 'name-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You named the pattern. They heard it. Really heard it. 'I don't want to be this way. I just... don't know how to be different. But I want to try. With you.'",
          speakerId: 'sam',
          emotion: 'sad',
        },
        {
          text: "Awareness is the first step. They see it now. That matters. Change is slow with avoidants. But it starts with acknowledgment. This was a breakthrough.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Breakthrough',
      endingSummary:
        "Direct communication worked. They acknowledged the pattern and want to change. This is rare and valuable. Hold them to it.",
    },
    {
      id: 'name-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You named the truth. They heard part of it. Things change a little. They communicate more. Sometimes.",
        },
        {
          text: "Partial awareness. Better than none, but not transformation. You'll see over time if understanding becomes change. Or just words.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Heard, Not Healed',
      endingSummary:
        "They heard you, but awareness isn't action. Watch if their behavior changes over time. Words without follow-through are just noise.",
    },
    {
      id: 'push-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The cycle continues. Close, distant, close, distant. You keep hoping this time will be different. It never is. You can't chase someone into loving you. All you can do is decide how long to wait.",
        },
        {
          text: "Months become years. The pattern calcifies. And you wonder what you're still doing here.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Carousel',
      endingSummary:
        "The push-pull cycle became your life. You kept chasing hoping they'd stop running. They didn't. Learn the lesson: stop chasing avoidants. Let them come to you—or let them go.",
    },
  ],
};
