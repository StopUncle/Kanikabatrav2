// Scenario: The Corporate Chess (Male Version)
// Navigate office politics and professional manipulation
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../../types';

export const malePowerPlayScenario: Scenario = {
  id: 'male-power-play',
  title: 'The Corporate Chess',
  tagline: 'Politics isn\'t optional.',
  description:
    'Your new manager has taken a special interest in you - mentoring, opportunities, late-night strategy sessions. But something feels transactional. Is this mentorship or manipulation?',
  tier: 'premium',
  estimatedMinutes: 15,
  difficulty: 'advanced',
  category: 'professional',
  xpReward: 150,
  badgeId: 'corporate-survivor',
  targetGender: 'male',

  templates: {
    boss: ['Victoria', 'Rebecca', 'Alexandra', 'Diana', 'Vanessa'],
    colleague: ['Mike', 'Jake', 'Connor', 'Tyler', 'Brandon'],
  },

  tacticsLearned: [
    'Office politics navigation',
    'Ego-driven manipulation detection',
    'Documentation protocol',
    'Strategic positioning',
    'Credit-taking deflection',
  ],
  redFlagsTaught: [
    'Excessive "special access" (creating dependency)',
    'Creating isolation from other leaders',
    'Credit-taking with vague promises',
    'Setting you up as the scapegoat',
    'Quid pro quo without clear terms',
  ],

  characters: [
    {
      id: 'victoria',
      name: 'Victoria',
      description: 'Senior Director. Charismatic, ambitious, and always playing the long game.',
      traits: ['manipulative', 'charming', 'ambitious'],
      defaultEmotion: 'smirking',
    },
    {
      id: 'mike',
      name: 'Mike',
      description: 'A colleague who\'s been at the company for years. Knows where the bodies are buried.',
      traits: ['wise', 'cautious', 'experienced'],
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
    // ============================================
    // SCENE 1: The Offer
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'office',
      dialog: [
        {
          text: "Monday morning. You've been at this company for six months—good performance, solid reviews. Your new manager Victoria calls you into her corner office. \"Close the door.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "\"I wanted to talk to you about your future here. I've been watching you. You're different from the others. Hungrier. Smarter. I want to personally mentor you. Fast-track you. But it requires trust.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: 'Closed-door conversations. Secret access. No specifics. Just "trust."',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: '"I\'d be honored. Whatever you need."',
          nextSceneId: 'scene-2a-eager',
          xpBonus: 0,
          feedback: 'TRAP: Blank-check commitment. She knows ego flattery works on you now.',
        },
        {
          id: 'choice-1b',
          text: '"I appreciate that. What would this mentorship involve?"',
          nextSceneId: 'scene-2b',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'seeking_clarity',
          feedback: 'OPTIMAL: Requesting specifics before commitment. Manipulators hate clarity.',
        },
        {
          id: 'choice-1c',
          text: '"Thank you, but I prefer to grow through the standard process."',
          nextSceneId: 'scene-2c',
          xpBonus: 8,
          feedback: 'Independence preserved. But you\'re on her radar as "uncontrollable."',
        },
        {
          id: 'choice-1d',
          text: '"Can I have some time to think about it?"',
          nextSceneId: 'scene-2d-delay',
          xpBonus: 10,
          feedback: 'Smart delay. But watch—she\'ll increase pressure.',
        },
      ],
    },

    // ============================================
    // SCENE 2A-EAGER: Full buy-in (trap path)
    // ============================================
    {
      id: 'scene-2a-eager',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's smile widens. Her shoulders visibly relax—she expected resistance and got none. \"I knew I saw something in you.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "\"Here's what I'm thinking. You join my inner circle. Strategy sessions. Direct access to me. Visibility on high-profile projects.\" Her laugh doesn't reach her eyes. \"No catch. Just... loyalty. I need people who have my back.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          text: "\"This stays between us. The others wouldn't understand. They'd think it's favoritism. Better to keep it quiet.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'scene-2a-hook',
    },
    {
      id: 'scene-2a-hook',
      backgroundId: 'office',
      dialog: [
        {
          text: "Over the next three weeks, Victoria delivers. Coffee meetings. Strategy calls. A seat at executive reviews. You work late reviewing her presentations, brief her before meetings, become her shadow.",
        },
        {
          text: "\"You're a natural,\" she says after a successful presentation you helped craft. Her hand briefly touches your arm. \"We're building something here.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "She delivers. But notice what she's getting: free labor, loyalty, 24/7 availability.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2a-hook-1',
          text: 'You\'re building a career. This is worth it.',
          nextSceneId: 'scene-3-deep',
          xpBonus: 0,
          feedback: 'TRAP: You\'re building HER career. What\'s YOUR proof of contribution?',
        },
        {
          id: 'choice-2a-hook-2',
          text: 'Something feels off. Start documenting your contributions.',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good instinct. Paper trail starts now.',
        },
        {
          id: 'choice-2a-hook-3',
          text: '"This is great, but I want to make sure my work gets visibility too."',
          nextSceneId: 'scene-3-visibility',
          xpBonus: 10,
          feedback: 'Close. Raising the issue early. She\'ll test if you really mean it.',
        },
      ],
    },

    // ============================================
    // SCENE 2B: Asking for specifics
    // ============================================
    {
      id: 'scene-2b',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's pupils contract slightly. Her smile tightens at the corners. But then she recovers—the smile becomes warmer.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "\"Direct. I like that. Shows backbone.\" She pauses. \"Monthly one-on-ones. Input on your projects. Introduction to key stakeholders.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "When you ask what she needs from you, her jaw shifts—a micro-clench. \"I need people who have my back. This company is political. I need allies.\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: '"Not everyone gets this." Translation: stop asking questions.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-2b-1',
          text: '"I understand. I just want to make sure I can deliver on whatever you need."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 12,
          tactic: 'probing',
          feedback: 'OPTIMAL: Reframe pushback as helpfulness. She still has to define terms.',
        },
        {
          id: 'choice-2b-2',
          text: '"You\'re right. I don\'t want to miss this. I\'m in."',
          nextSceneId: 'scene-2a-hook',
          xpBonus: 0,
          feedback: 'TRAP: Scarcity pressure worked. She now knows pressure makes you comply.',
        },
        {
          id: 'choice-2b-3',
          text: '"Allies for what, specifically?"',
          nextSceneId: 'scene-2b-push',
          xpBonus: 8,
          feedback: 'Bold push. She\'ll remember you don\'t fold easily.',
        },
      ],
    },

    // ============================================
    // SCENE 2B-PUSH: Pushed harder for details
    // ============================================
    {
      id: 'scene-2b-push',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's nostrils flare slightly. \"Look, I'm offering you something special here. Not everyone gets this opportunity.\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "She leans back. \"But I respect directness. Let's start with a trial. Three months. You work closely with me on key initiatives. I sponsor your development. At the end, we both decide if we want to continue.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: 'She adapted. Gave you terms. But watch what she delivers vs promises.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2b-push-1',
          text: '"That sounds reasonable. I\'ll document my contributions as we go—just for my own tracking."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: Agreement with built-in protection. Smart.',
        },
        {
          id: 'choice-2b-push-2',
          text: '"Deal. Let\'s do it."',
          nextSceneId: 'scene-3',
          xpBonus: 8,
          feedback: 'In without explicit protection. Document anyway.',
        },
      ],
    },

    // ============================================
    // SCENE 2C: Declined - independence path
    // ============================================
    {
      id: 'scene-2c',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's smile fades just slightly. \"The standard process...\" She chuckles. \"That's for standard people.\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "\"But I respect the independence. Just know - when you're ready, my door is open.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "Something tells you this isn't the last you'll hear about this.",
        },
      ],
      nextSceneId: 'scene-4-alt',
    },

    // ============================================
    // SCENE 2D-DELAY: Asked for time
    // ============================================
    {
      id: 'scene-2d-delay',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's eyebrow arches slightly. \"Of course. Take... a day or two.\" Her tone suggests that's already too long.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "That evening, your phone buzzes. Victoria. \"Just checking in. Was thinking about what you could contribute to the Morrison project. Let me know when you've decided.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: 'A day or two. She already followed up. This is pressure.',
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-2d-1',
          text: 'Sleep on it. Respond tomorrow with specific questions.',
          nextSceneId: 'scene-2b',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'OPTIMAL: Maintained timeline. Didn\'t let pressure accelerate you.',
        },
        {
          id: 'choice-2d-2',
          text: 'Reply immediately: "I\'m in. Let\'s discuss tomorrow."',
          nextSceneId: 'scene-2a-hook',
          xpBonus: 0,
          feedback: 'TRAP: Pressure worked. You folded to create urgency.',
        },
        {
          id: 'choice-2d-3',
          text: '"I appreciate the interest. Let me think about how I can be most helpful."',
          nextSceneId: 'scene-2b',
          xpBonus: 8,
          feedback: 'Maintained composure while acknowledging. Good middle ground.',
        },
      ],
    },

    // ============================================
    // SCENE 3: The Pattern Begins
    // ============================================
    {
      id: 'scene-3',
      backgroundId: 'office',
      dialog: [
        {
          text: "Over the next month, Victoria delivers on her promises. High-visibility projects. Executive meetings. But the asks start coming.",
        },
        {
          text: "\"Can you pull together those metrics for my presentation? I'll make sure people know you contributed.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          text: "You do. The presentation goes well. Your name isn't mentioned. Later, in the elevator: \"Great work today. I put in a good word for you with the VP.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: 'Vague promise: "make sure people know." Did she? Can you ever verify that?',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: '"Thank you. I was hoping to get some credit in the meeting though."',
          nextSceneId: 'scene-4a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'speaking_up',
          feedback: 'OPTIMAL: Direct but professional. She\'ll remember you don\'t stay quiet.',
        },
        {
          id: 'choice-3b',
          text: '"Thanks. Happy to help anytime."',
          nextSceneId: 'scene-4b',
          xpBonus: 0,
          feedback: 'TRAP: "Anytime" just became a blank check. She\'ll cash it.',
        },
        {
          id: 'choice-3c',
          text: 'Stay silent. Don\'t rock the boat yet.',
          nextSceneId: 'scene-4b',
          xpBonus: 5,
          feedback: 'Silence is consent. Your boundaries just got tested—and failed.',
        },
        {
          id: 'choice-3d',
          text: '"What specifically did you tell the VP?"',
          nextSceneId: 'scene-3-verify',
          xpBonus: 10,
          feedback: 'Close. Verification attempt. She won\'t like this.',
        },
      ],
    },

    // ============================================
    // SCENE 3-VERIFY: Tried to verify her claims
    // ============================================
    {
      id: 'scene-3-verify',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's smile freezes for a microsecond. \"I mentioned your analytical work. Why?\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "Her tone shifts—warmer now. \"You know what, you're right to ask. Let me introduce you to her directly next week. You deserve the face time.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          text: "The meeting never gets scheduled. Three weeks later, you ask again. \"Still working on the timing. She's swamped.\"",
        },
        {
          speakerId: 'inner-voice',
          text: 'The promise renewed, never delivered. Classic stalling.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-3v-1',
          text: 'Accept the delay. Push again in a month.',
          nextSceneId: 'scene-4b',
          xpBonus: 5,
          feedback: 'Patient, but you\'re being trained to accept broken promises.',
        },
        {
          id: 'choice-3v-2',
          text: 'Start building your own relationship with the VP. Don\'t wait for permission.',
          nextSceneId: 'scene-4a',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: Taking initiative. Sponsors are earned, not assigned.',
        },
      ],
    },

    // ============================================
    // SCENE 3-VISIBILITY: Asked for visibility early
    // ============================================
    {
      id: 'scene-3-visibility',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria nods slowly. \"Of course. Your work matters. I just want to make sure we position it right—too early and you're a target for the politics. Let me handle the timing.\"",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "A month passes. Then two. You're doing significant work but your name is nowhere.",
        },
        {
          speakerId: 'inner-voice',
          text: '"Let me handle the timing." Translation: when it benefits me.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-3vis-1',
          text: 'Push back: "I appreciate the protection, but I need my contributions documented."',
          nextSceneId: 'scene-4a',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: Boundary with rationale. She can\'t argue with documentation.',
        },
        {
          id: 'choice-3vis-2',
          text: 'Trust her timing. She knows the politics better.',
          nextSceneId: 'scene-4b',
          xpBonus: 0,
          feedback: 'TRAP: Her "timing" is never. You\'re invisible.',
        },
      ],
    },

    // ============================================
    // SCENE 3-DEEP: Fully absorbed (bad path)
    // ============================================
    {
      id: 'scene-3-deep',
      backgroundId: 'office',
      dialog: [
        {
          text: "Four months in. You're Victoria's go-to person. Every project, every presentation, every late night. Your personal life has evaporated. But that's the cost of success, right?",
        },
        {
          text: "\"I don't know what I'd do without you,\" Victoria says one evening, reviewing slides at 9pm. \"You're the only one I can trust.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          text: "Your colleagues have stopped inviting you to things. You're \"Victoria's guy\" now. Not one of them.",
        },
      ],
      nextSceneId: 'scene-3-deep-2',
    },
    {
      id: 'scene-3-deep-2',
      backgroundId: 'office',
      dialog: [
        {
          text: "Mike catches you by the coffee machine. \"Hey, haven't seen you around much. Everything good?\"",
          speakerId: 'mike',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "You've been isolated. When did that happen?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'choice-3deep-1',
          text: '"Yeah, just busy with the mentorship stuff."',
          nextSceneId: 'scene-isolation-bad',
          xpBonus: 0,
          feedback: 'TRAP: You\'re defending your isolation. Red flag.',
        },
        {
          id: 'choice-3deep-2',
          text: '"Actually... can we grab coffee? I need perspective."',
          nextSceneId: 'scene-5',
          isOptimal: true,
          xpBonus: 12,
          feedback: 'Good. Breaking out of the bubble. Mike sees things you can\'t.',
        },
      ],
    },

    // ============================================
    // SCENE 4A: Spoke up about credit
    // ============================================
    {
      id: 'scene-4a',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's expression shifts for a microsecond. Her left eye twitches. Then the warmth returns.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "\"You're right. I should have mentioned you. Got caught up in the moment. It won't happen again.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "Her jaw sets. \"But if you want to go through normal channels, we can arrange that. Might slow things down though.\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: 'Notice the subtle reframe: threat disguised as option.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-4a-1',
          text: '"No, I value the mentorship. I just want visibility alongside it."',
          nextSceneId: 'scene-4a-confront',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'boundary_with_affirmation',
          feedback: 'OPTIMAL: Hold the line while affirming value.',
        },
        {
          id: 'choice-4a-2',
          text: '"You\'re right. I don\'t want to rock the boat."',
          nextSceneId: 'scene-4b',
          xpBonus: 0,
          feedback: 'TRAP: Threat worked. She learned intimidation silences you.',
        },
      ],
    },

    // ============================================
    // SCENE 4A-CONFRONT: Maintained boundary
    // ============================================
    {
      id: 'scene-4a-confront',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria studies you. Her head tilts slightly to the right—she's recalculating.",
        },
        {
          text: "\"Fair enough.\"",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "The next week is different. She CC's you on emails instead of calling. Meetings run exactly on time. No more \"quick chats.\" Withdrawal of intimacy as punishment.",
        },
      ],
      nextSceneId: 'scene-4a-test',
    },
    {
      id: 'scene-4a-test',
      backgroundId: 'office',
      dialog: [
        {
          text: "On Friday, she stops by your desk. Her body angled away, ready to leave.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "\"I'm putting together the quarterly review team. Was thinking of including you, but I wasn't sure if you wanted the extra visibility.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: "Passive-aggressive callback. Testing if you'll apologize for having boundaries.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-4a-t1',
          text: '"I\'d love to contribute. Send me the details and I\'ll confirm."',
          nextSceneId: 'scene-5',
          isOptimal: true,
          xpBonus: 12,
          tactic: 'professional_neutral',
          feedback: 'OPTIMAL: Professional but not eager. She has to include you on terms, not feelings.',
        },
        {
          id: 'choice-4a-t2',
          text: '"I\'m sorry if I came across wrong before. I definitely want in."',
          nextSceneId: 'scene-4b',
          xpBonus: 0,
          feedback: 'TRAP: You apologized for having boundaries. Expect her to push harder.',
        },
        {
          id: 'choice-4a-t3',
          text: '"Thanks for thinking of me. What\'s the time commitment?"',
          nextSceneId: 'scene-5',
          xpBonus: 10,
          feedback: 'Close. Practical question. Shows you\'re not desperate.',
        },
      ],
    },

    // ============================================
    // SCENE 4B: Compliant path (heading toward bad ending)
    // ============================================
    {
      id: 'scene-4b',
      backgroundId: 'office',
      dialog: [
        {
          text: "The pattern continues. You do work. Victoria takes credit. She promises the recognition is coming—always coming, never here.",
        },
        {
          text: "Three months in, you've contributed to four major initiatives. Your name is on none of them.",
        },
        {
          text: "Mike corners you by the coffee machine. \"We need to talk. Not here. Lunch?\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-5',
    },

    // ============================================
    // SCENE 4-ALT: Independent path (declined early)
    // ============================================
    {
      id: 'scene-4-alt',
      backgroundId: 'office',
      dialog: [
        {
          text: "Two months pass. You're doing solid work but nothing flashy. You notice Victoria's \"favorites\" - they're everywhere. Meetings, projects, visibility.",
        },
        {
          text: "But you also notice something else: they look exhausted. Available 24/7. Always on call. That's the real cost of \"special access.\"",
        },
        {
          text: "Mike approaches you at a team lunch. \"Smart, staying independent. Let me tell you about Victoria.\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-5',
    },

    // ============================================
    // SCENE ISOLATION-BAD: Fully isolated
    // ============================================
    {
      id: 'scene-isolation-bad',
      backgroundId: 'office',
      dialog: [
        {
          text: "Mike shrugs. \"Sure man. Just... keep your head up.\" He walks away. You don't see him again outside of meetings.",
        },
        {
          text: "Two weeks later, the layoffs hit. Your team is restructured. Victoria survives—of course she does. But in the new org, she doesn't need a \"shadow\" anymore.",
        },
        {
          text: "\"It's not personal,\" she says when your role is eliminated. \"The company is moving in a different direction. I'll give you a great reference.\"",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Discarded Shadow',
      endingSummary:
        'You became so absorbed in her orbit that you had no independent value. When she no longer needed you, there was no one to advocate for you. Isolation is the manipulator\'s greatest weapon.',
      endingLearnReference: 'Dependence without diverse sponsors leaves you vulnerable.',
      endingLearnPrompt: 'What could you have done differently when Mike reached out?',
    },

    // ============================================
    // SCENE 5: Mike's Warning
    // ============================================
    {
      id: 'scene-5',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You meet Mike at a cafe down the block. He checks the door before sitting.",
        },
        {
          text: "\"I've been here seven years. I've seen three cycles of Victoria's 'favorites.'\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "\"Cycle one: Dev lead named James. Brilliant. Worked 70-hour weeks on Victoria's projects. Got promoted to Senior—then blamed for a product failure he didn't cause. Resigned 'voluntarily.'\"",
          speakerId: 'mike',
          emotion: 'sad',
        },
        {
          text: "\"Cycle two: Operations guy, Derek. Victoria's shadow for 18 months. When Derek started getting credit independently? Suddenly there were 'performance concerns.'\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: 'Specific names. Specific outcomes. This isn\'t speculation—he\'s reciting history.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: '"How do I protect myself without torpedoing my career?"',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'strategic_thinking',
          feedback: 'OPTIMAL: Looking for a sustainable path. Not fight, not flight—navigate.',
        },
        {
          id: 'choice-5b',
          text: '"Maybe she\'s different with me."',
          nextSceneId: 'scene-6b',
          xpBonus: 0,
          feedback: 'TRAP: She\'s not "different with you." The pattern repeats.',
        },
        {
          id: 'choice-5c',
          text: '"I should go to HR right now."',
          nextSceneId: 'scene-6c',
          xpBonus: 5,
          feedback: 'HR protects the company, not you. Think before you leap.',
        },
        {
          id: 'choice-5d',
          text: '"I should confront her directly."',
          nextSceneId: 'scene-6d-confront',
          xpBonus: 0,
          feedback: 'TRAP: Without documentation, confrontation = career suicide.',
        },
      ],
    },

    // ============================================
    // SCENE 6A: Strategic protection advice
    // ============================================
    {
      id: 'scene-6a',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Mike leans in, lowering his voice.",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "\"Three things. First: document everything. Every contribution. Date, description, evidence. Emails where she asks you to do something. Screenshots of your drafts with timestamps.\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "\"Second: build relationships with other leaders. Not as a betrayal—insurance. Don't put all your sponsorship in one basket.\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "\"Third: when she asks for something off-books? Get email confirmation. 'Just to confirm our conversation—you wanted X by Y date, correct?' Frame it as being thorough.\"",
          speakerId: 'mike',
          emotion: 'smirking',
        },
        {
          text: 'Paper trail. Manipulators hate receipts. That\'s exactly why you need them.',
        },
      ],
      nextSceneId: 'scene-7',
    },

    // ============================================
    // SCENE 6B: Denial path
    // ============================================
    {
      id: 'scene-6b',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Mike sighs. \"Everyone thinks that. I thought that. Until I didn't.\"",
          speakerId: 'mike',
          emotion: 'sad',
        },
        {
          text: "\"She makes everyone feel special. That's the hook. You're not special to her—you're useful. Just... keep your eyes open. And document your work. You'll need it eventually.\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "She makes everyone feel special. That's the hook.",
        },
      ],
      nextSceneId: 'scene-7',
    },

    // ============================================
    // SCENE 6C: HR path
    // ============================================
    {
      id: 'scene-6c',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Mike shakes his head firmly. \"No. HR protects the company, not you.\"",
          speakerId: 'mike',
          emotion: 'cold',
        },
        {
          text: "\"Victoria has been here 12 years. You've been here six months. Power dynamics matter. She has tenure. You have ambition. Those aren't equal weapons.\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          text: "\"Unless you have documented, provable misconduct—not just bad vibes—you'll be the problem.\"",
          speakerId: 'mike',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Power dynamics matter. She has tenure. You have accusations without proof.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-6c-1',
          text: '"Okay. How do I build that documentation?"',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Good. Building the case properly.',
        },
        {
          id: 'choice-6c-2',
          text: '"I can\'t just let her get away with this."',
          nextSceneId: 'scene-6d-confront',
          xpBonus: 0,
          feedback: 'TRAP: Righteous anger without strategy = self-destruction.',
        },
      ],
    },

    // ============================================
    // SCENE 6D-CONFRONT: Confronted without evidence
    // ============================================
    {
      id: 'scene-6d-confront',
      backgroundId: 'office',
      dialog: [
        {
          text: "You march into Victoria's office. \"I know what you're doing. Using me, taking credit, setting people up to fail. I'm not going to be your next victim.\"",
        },
        {
          text: "Victoria's expression doesn't change. She sets down her pen carefully.",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "\"I'm sorry you feel that way. I thought we had a good working relationship. I've been championing you behind the scenes, but clearly I misjudged.\"",
          speakerId: 'victoria',
          emotion: 'sad',
        },
        {
          text: "Her voice carries through the thin walls. People are listening.",
          speakerId: 'victoria',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-confront-bad',
    },
    {
      id: 'scene-confront-bad',
      backgroundId: 'office',
      dialog: [
        {
          text: "The next day, you're called into HR. \"We've received reports of aggressive behavior toward your manager. Victoria is concerned but doesn't want to escalate.\"",
        },
        {
          text: "You try to explain. But you have no documentation. No evidence. Just accusations against someone with 12 years of tenure and a reputation for \"developing young talent.\"",
        },
        {
          text: "\"We think a cooling-off period would be best. Maybe a lateral move to a different team?\"",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Impulsive Crash',
      endingSummary:
        'You confronted a manipulator without evidence and became the aggressor in the narrative. She\'s the victim. You\'re the problem. Document first. Confront never—or only with receipts.',
      endingLearnReference: 'Righteous anger without documentation is career suicide.',
      endingLearnPrompt: 'What should you have gathered before confronting her?',
    },

    // ============================================
    // SCENE 7: The Test
    // ============================================
    {
      id: 'scene-7',
      backgroundId: 'office',
      dialog: [
        {
          text: "A week later. Victoria calls you into her office. \"Quick chat.\" Her voice is casual, but her posture is manufactured calm.",
        },
        {
          text: "\"There's a situation. The quarterly numbers look... challenging for our team. Nothing we can't explain, but it needs the right presentation. The right person.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "She spreads her hands, palms up—the gesture of giving a gift. \"You. Great visibility opportunity. Executive face-time.\"",
          speakerId: 'victoria',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: '"Great visibility" for bad news. Why isn\'t SHE presenting?',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: '"I\'d like to, but can we present together? I\'d learn a lot from watching you handle the questions."',
          nextSceneId: 'scene-8a',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'deflection',
          feedback: 'OPTIMAL: Enthusiastic but not alone. She can\'t make you the scapegoat now.',
        },
        {
          id: 'choice-7b',
          text: '"I\'ll do it. Thank you for the opportunity."',
          nextSceneId: 'scene-8b',
          xpBonus: 0,
          feedback: 'TRAP: You just volunteered for the firing squad. She stays clean.',
        },
        {
          id: 'choice-7c',
          text: '"I don\'t feel comfortable presenting numbers I didn\'t generate."',
          nextSceneId: 'scene-8c',
          xpBonus: 12,
          tactic: 'boundary',
          feedback: 'Honest refusal. She won\'t forget it, but you won\'t be her fall guy.',
        },
        {
          id: 'choice-7d',
          text: '"What\'s your conflict that day?"',
          nextSceneId: 'scene-8d-question',
          xpBonus: 10,
          feedback: 'Close. Probing the excuse. She\'ll have to fabricate more.',
        },
      ],
    },

    // ============================================
    // SCENE 8A: Asked to present together
    // ============================================
    {
      id: 'scene-8a',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's smile tightens almost imperceptibly. Her fingers drum once on the desk.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "\"I wish I could join you, but I have a conflict that day. Board prep. Very last-minute.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "Her gaze flickers right—constructing, not remembering. \"Unless you don't feel ready? I can find someone else who wants the visibility...\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: 'Single finger drum = impatience. She\'s questioning if you\'re "ready." Bait.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-8a-1',
          text: '"I\'m ready. But let me loop in Finance to validate the numbers first."',
          nextSceneId: 'scene-good-transition',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'cya',
          feedback: 'OPTIMAL: Paper trail. Multiple stakeholders. Shared accountability.',
        },
        {
          id: 'choice-8a-2',
          text: '"You\'re right, I should step up. I\'ll do it solo."',
          nextSceneId: 'scene-8b',
          xpBonus: 0,
          feedback: 'TRAP: Guilt-tripped into the scapegoat role. She wins.',
        },
        {
          id: 'choice-8a-3',
          text: '"If you\'re not available, maybe we should reschedule to a time when you can attend."',
          nextSceneId: 'scene-8a-push',
          xpBonus: 15,
          feedback: 'Bold. Forcing her to own the decision.',
        },
      ],
    },

    // ============================================
    // SCENE 8A-PUSH: Pushed back on her absence
    // ============================================
    {
      id: 'scene-8a-push',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's jaw clenches. \"The timeline is set by leadership. Not by me.\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "\"But fine. If you're not comfortable, I'll find someone else. Someone who understands opportunity.\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "She's trying to make you feel like you failed a test. You didn't—you just refused to be the fall guy.",
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },

    // ============================================
    // SCENE 8B: Agreed to present alone (bad path)
    // ============================================
    {
      id: 'scene-8b',
      backgroundId: 'office',
      dialog: [
        {
          text: "The presentation does not go well. Leadership has questions you can't answer.",
        },
        {
          text: "\"Walk us through the methodology here.\" The VP's tone is sharp.",
        },
        {
          text: "\"I... the data was provided to me. I compiled the presentation but—\"",
        },
        {
          text: "\"Provided by whom?\"",
        },
        {
          text: "You look at Victoria. She's leaning back in her chair, arms crossed. Completely neutral. She rehearsed this moment.",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "\"These were supposed to be vetted before this meeting,\" Victoria says finally. Her voice is disappointed.",
          speakerId: 'victoria',
          emotion: 'sad',
        },
      ],
      nextSceneId: 'scene-bad-ending',
    },

    // ============================================
    // SCENE 8C: Refused to present
    // ============================================
    {
      id: 'scene-8c',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria's expression hardens. Her jaw sets. A vein pulses at her temple.",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "\"That's... disappointing. I thought you wanted to grow here. I've invested a lot in your development.\"",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "\"No, no.\" She waves a hand. \"I understand. Not everyone is ready for the big leagues.\"",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "You respond: \"I hope you'll remember I didn't present numbers I couldn't defend.\" Her eyes narrow for a fraction of a second.",
        },
        {
          speakerId: 'inner-voice',
          text: "You're on her list now. But you're not her puppet. Document everything from here.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },

    // ============================================
    // SCENE 8D-QUESTION: Asked about her conflict
    // ============================================
    {
      id: 'scene-8d-question',
      backgroundId: 'office',
      dialog: [
        {
          text: "Victoria pauses. A micro-expression flickers—she didn't expect that question.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "\"Board prep. Very last-minute. The CEO wants alignment on Q4 strategy.\" The explanation is detailed. Too detailed.",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: 'Over-explanation. Classic tell. The excuse is fabricated.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-8d-1',
          text: '"Got it. Let me loop in Finance for validation and I\'ll handle it."',
          nextSceneId: 'scene-good-transition',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'OPTIMAL: You accepted but protected yourself.',
        },
        {
          id: 'choice-8d-2',
          text: '"I trust your judgment. I\'ll do it."',
          nextSceneId: 'scene-8b',
          xpBonus: 0,
          feedback: 'TRAP: You saw the tell and ignored it.',
        },
      ],
    },

    // ============================================
    // SCENE GOOD-TRANSITION: Protected presentation
    // ============================================
    {
      id: 'scene-good-transition',
      backgroundId: 'office',
      dialog: [
        {
          text: "The presentation day arrives. You're ready—and you're not alone. Finance validated the numbers. Your email trail shows exactly when you received the data and from whom.",
        },
        {
          text: "The VP asks a tough question about the methodology. \"I can speak to the presentation, but for methodology I'd defer to Finance. They validated these figures.\"",
        },
        {
          text: "Victoria shifts in her seat. She didn't expect you to have backup. The Finance rep confirms: \"The data is solid. We reviewed the inputs together.\"",
        },
        {
          text: "Victoria catches your eye as people file out. Her smile doesn't reach her eyes. \"Well played,\" she murmurs.",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: '"Together." That word just saved you. Compliment or threat? With her, always both.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-gt-1',
          text: 'Smile and say nothing. You don\'t need to explain yourself.',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'OPTIMAL: Let the silence speak. You won this round.',
        },
        {
          id: 'choice-gt-2',
          text: '"Just being thorough. Learned from the best."',
          nextSceneId: 'scene-good-ending',
          xpBonus: 8,
          feedback: 'Close. Gracious but slightly submissive.',
        },
      ],
    },

    // ============================================
    // ENDINGS
    // ============================================
    {
      id: 'scene-good-ending',
      backgroundId: 'office',
      dialog: [
        {
          text: "Six months later. You're in a new role - transferred to a different team. A lateral move you engineered yourself. Your documentation of contributions came in handy during performance reviews.",
        },
        {
          text: "You got credit for your work. Victoria? Word is her latest \"favorite\" got burned badly on a project. Some are starting to see the pattern.",
        },
        {
          text: "Mike texts you: \"Heard Victoria is being 'asked' to take a different role. HR finally paid attention.\"",
          speakerId: 'mike',
          emotion: 'smirking',
        },
        {
          text: "You didn't take her down. You just played the long game and protected yourself. Manipulators eventually expose themselves. Your job was to survive until they did.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Playing the Long Game',
      endingSummary:
        'You navigated corporate manipulation without becoming a victim. Documentation, multiple allies, and strategic positioning. Predators eventually expose themselves—your job is to survive until they do.',
    },

    {
      id: 'scene-neutral-ending',
      backgroundId: 'office',
      dialog: [
        {
          text: "The next few months are rocky. Victoria is cooler, and opportunities dry up. But you're not her scapegoat either.",
        },
        {
          text: "You keep your head down, do good work. Eventually, you find a new job at a different company. A lateral move, but a fresh start.",
        },
        {
          text: "Your exit interview is pleasant. No drama. No bodies buried. Sometimes the win is just getting out clean.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Clean Exit',
      endingSummary:
        'You refused to be the scapegoat, which had costs. But you left on your own terms with reputation intact. Next time, you\'ll recognize the pattern earlier.',
      endingLearnReference: 'Sometimes survival is victory.',
      endingLearnPrompt: 'What would you do differently if you encountered another Victoria?',
    },

    {
      id: 'scene-bad-ending',
      backgroundId: 'office',
      dialog: [
        {
          text: "After the presentation disaster, you become the \"problem.\" Victoria distances herself publicly. \"I tried to mentor him, but...\"",
        },
        {
          text: "Her final move: rewrite history. She \"tried.\" You \"failed.\" Your performance review reflects \"leadership concerns.\" You're put on a PIP.",
        },
        {
          text: "Three months later, you're \"managed out.\" The severance is fine, but your confidence is shot.",
        },
        {
          text: "Lesson learned: never be someone's fall guy. Document everything. Trust no one completely. She won this round. But now you know the game.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Fall Guy',
      endingSummary:
        'You became the scapegoat. Lesson: document everything, diversify sponsors, never take solo ownership of someone else\'s problem.',
      endingLearnReference: 'Visibility on bad news is not opportunity—it\'s a trap.',
      endingLearnPrompt: 'What was the first sign you should have pushed back?',
    },
  ],
};
