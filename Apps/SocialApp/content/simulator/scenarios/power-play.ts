// Scenario: The Corporate Chess
// Navigate office politics and professional manipulation
// v2 format: consolidated dialog, inner voice only at choice points

import type { Scenario } from '../types';

export const powerPlayScenario: Scenario = {
  id: 'power-play',
  title: 'The Corporate Chess',
  tagline: "Politics isn't optional.",
  description:
    'Your new manager has taken a special interest in you - mentoring, opportunities, late-night strategy sessions. But something feels transactional. Is this mentorship or manipulation?',
  tier: 'premium',
  estimatedMinutes: 10,
  difficulty: 'advanced',
  category: 'professional',
  xpReward: 125,
  badgeId: 'corporate-survivor',

  templates: {
    boss: ['Marcus', 'David', 'Richard', 'James', 'Daniel'],
    colleague: ['Sarah', 'Jennifer', 'Laura', 'Michelle', 'Karen'],
    company: ['Nexus', 'Vertex', 'Summit', 'Apex', 'Meridian'],
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
      id: 'marcus',
      name: 'Marcus',
      description: 'Senior Director. Charismatic, ambitious, and always playing the long game.',
      traits: ['manipulative', 'charming', 'ambitious'],
      defaultEmotion: 'smirking',
    },
    {
      id: 'sarah',
      name: 'Sarah',
      description: "A colleague who's been at the company for years. Knows where the bodies are buried.",
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
    {
      id: 'scene-1',
      backgroundId: 'office',
      dialog: [
        {
          text: "Monday morning. You've been at this company for six months. Good performance, solid reviews. Your new manager Marcus calls you into his corner office. \"Close the door. I wanted to talk to you about your future here.\"",
          speakerId: 'marcus',
          emotion: 'neutral',
        },
        {
          text: "\"I've been watching you. You're different from the others. Hungrier. Smarter. I want to personally mentor you. Fast-track you. But it requires trust.\" No specifics. Just \"trust.\" Just access to him.",
          speakerId: 'marcus',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Flattery targeting your ambition. He sees what you want and is using it.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: '"I\'d be honored. What do you have in mind?"',
          nextSceneId: 'scene-2a',
          feedback: 'Eager acceptance without terms. He knows flattery works on you now.',
        },
        {
          id: 'choice-1b',
          text: '"I appreciate that. What would this mentorship involve?"',
          nextSceneId: 'scene-2b',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'seeking_clarity',
          feedback: 'Requesting specifics before commitment. Manipulators hate clarity—it creates accountability.',
        },
        {
          id: 'choice-1c',
          text: '"Thank you, but I prefer to grow through the standard process."',
          nextSceneId: 'scene-2c',
          xpBonus: 5,
          feedback: "Independence preserved. You're not in his pocket, but you're on his radar as \"uncontrollable.\"",
        },
        {
          id: 'choice-1d',
          text: '"I\'m interested. Can I have some time to think about it?"',
          nextSceneId: 'scene-2b',
          xpBonus: 10,
          feedback: "Smart delay tactic. But watch—he'll read hesitation as leverage and increase pressure.",
        },
      ],
    },
    {
      id: 'scene-2a',
      backgroundId: 'office',
      dialog: [
        {
          text: "Marcus smiles widely, shoulders relaxing. \"I knew I saw something in you. Here's what I'm thinking—you join my inner circle. Strategy sessions. Direct access to me. Visibility on high-profile projects.\" His laugh doesn't reach his eyes. A practiced performance.",
          speakerId: 'marcus',
          emotion: 'happy',
        },
        {
          text: "\"No catch. Just... loyalty. I need people who have my back. This stays between us. The others wouldn't understand. They'd think it's favoritism. Better to keep it quiet.\"",
          speakerId: 'marcus',
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
          text: "Over three weeks, Marcus delivers. Coffee meetings. Strategy calls. A seat at executive reviews. It feels good—almost too good. You work late reviewing his presentations, briefing him before meetings, becoming his shadow.",
        },
        {
          text: "\"You're a natural,\" he says after a successful presentation you helped craft. His hand briefly touches your shoulder. \"We're building something here.\" Later: \"Hey, I need those projections redone by tomorrow. I know it's late, but you get it, right?\"",
          speakerId: 'marcus',
          emotion: 'seductive',
        },
      ],
      nextSceneId: 'scene-3',
    },
    {
      id: 'scene-2b',
      backgroundId: 'office',
      dialog: [
        {
          text: "Marcus's pupils contract slightly. His smile tightens at the corners—you asked for specifics when he wanted blind enthusiasm. Then he recovers, warmth returning. \"Direct. I like that. Shows backbone. Monthly one-on-ones. Input on your projects. Introduction to key stakeholders.\"",
          speakerId: 'marcus',
          emotion: 'neutral',
        },
        {
          text: "\"What would you need from me?\" His jaw shifts—a micro-clench. \"I need people who have my back. This company is political. I need allies.\" You press: \"Allies for what, specifically?\" His nostrils flare. \"Look, I'm offering you something special here. Not everyone gets this opportunity.\"",
          speakerId: 'marcus',
          emotion: 'cold',
        },
        {
          
          text: '"Not everyone gets this." Translation: stop asking questions.',
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: '"I understand. I just want to make sure I can deliver on whatever you need."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 10,
          tactic: 'probing',
          feedback: 'Reframe pushback as helpfulness. He still has to define terms.',
        },
        {
          id: 'choice-2b',
          text: '"You\'re right. I don\'t want to miss this. I\'m in."',
          nextSceneId: 'scene-2a-hook',
          feedback: 'Scarcity pressure worked. He now knows pressure makes you comply.',
        },
      ],
    },
    {
      id: 'scene-2c',
      backgroundId: 'office',
      dialog: [
        {
          text: "Marcus's smile fades slightly. \"The standard process...\" He chuckles. \"That's for standard people.\" Subtle insult—implying \"standard\" means mediocre, trying to trigger your vanity. \"But I respect the independence. Just know—when you're ready, my door is open.\"",
          speakerId: 'marcus',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-4-alt',
    },
    {
      id: 'scene-3',
      backgroundId: 'office',
      dialog: [
        {
          text: "Over the next month, Marcus delivers on his promises. High-visibility projects. Executive meetings. But the asks start coming. \"Can you pull together those metrics for my presentation? I'll make sure people know you contributed.\" Vague promise: \"make sure people know.\" Not \"I'll credit you.\"",
          speakerId: 'marcus',
          emotion: 'smirking',
        },
        {
          text: "You do. The presentation goes well. Your name isn't mentioned. Later, in the elevator: \"Great work today. I put in a good word for you with the VP.\" Unverifiable claim. Did he? Can you ever know?",
          speakerId: 'marcus',
          emotion: 'seductive',
        },
        {
          
          text: 'This is how credit-taking works. Vague promises, unverifiable delivery.',
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
          feedback: "Direct but professional. He'll remember you don't stay quiet.",
        },
        {
          id: 'choice-3b',
          text: '"Thanks. Happy to help anytime."',
          nextSceneId: 'scene-4b',
          feedback: "\"Anytime\" just became a blank check. He'll cash it.",
        },
        {
          id: 'choice-3c',
          text: "Stay silent. Don't rock the boat.",
          nextSceneId: 'scene-4b',
          feedback: 'Silence is consent. Your boundaries just got tested—and failed.',
        },
      ],
    },
    {
      id: 'scene-4a',
      backgroundId: 'office',
      dialog: [
        {
          text: "Marcus's expression shifts for a microsecond. His left eye twitches. Then warmth returns. \"You're right. I should have mentioned you. Got caught up in the moment. It won't happen again.\" But then the reframe: \"Your work does speak for itself. That's why I chose you.\"",
          speakerId: 'marcus',
          emotion: 'neutral',
        },
        {
          text: "\"But if you want to go through normal channels, we can arrange that. Might slow things down though.\" Threat disguised as option. \"Normal channels\" = I'll withdraw my support.",
          speakerId: 'marcus',
          emotion: 'cold',
        },
        {
          
          text: '"I chose you." He\'s reminding you that you owe your position to him.',
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
          feedback: 'Hold the line while affirming value. Boundary maintained with diplomacy.',
        },
        {
          id: 'choice-4a-2',
          text: '"You\'re right. I don\'t want to rock the boat."',
          nextSceneId: 'scene-4b',
          feedback: 'Threat worked. He learned intimidation silences you.',
        },
      ],
    },
    {
      id: 'scene-4a-confront',
      backgroundId: 'office',
      dialog: [
        {
          text: "Marcus studies you, head tilting. He's recalculating—you're not as pliable as he thought. \"Fair enough.\" The next week is different. He CC's you on emails instead of calling. Meetings run exactly on time. No more \"quick chats.\" Withdrawal of intimacy as punishment.",
        },
        {
          text: "On Friday, he stops by your desk, body angled away. \"I'm putting together the quarterly review team. Was thinking of including you, but I wasn't sure if you wanted the extra visibility.\" Passive-aggressive callback. Using your own words against you.",
          speakerId: 'marcus',
          emotion: 'smirking',
        },
        {
          
          text: "He's testing if you'll apologize for having boundaries.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-4a-c1',
          text: '"I\'d love to contribute. Send me the details and I\'ll confirm."',
          nextSceneId: 'scene-5',
          isOptimal: true,
          xpBonus: 10,
          tactic: 'professional_neutral',
          feedback: 'Professional but not eager. He has to include you on terms, not feelings.',
        },
        {
          id: 'choice-4a-c2',
          text: '"I\'m sorry if I came across wrong before. I definitely want in."',
          nextSceneId: 'scene-4b',
          feedback: 'You apologized for having boundaries. Expect him to push harder next time.',
        },
      ],
    },
    {
      id: 'scene-4b',
      backgroundId: 'office',
      dialog: [
        {
          text: "The pattern continues. You do work. Marcus takes credit. He promises the recognition is coming—always coming, never here. Three months in, you've contributed to four major initiatives. Your name is on none of them.",
        },
        {
          text: "Sarah corners you by the coffee machine. \"We need to talk. Not here. Lunch?\"",
          speakerId: 'sarah',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-5',
    },
    {
      id: 'scene-4-alt',
      backgroundId: 'office',
      dialog: [
        {
          text: "Two months pass. You're doing solid work but nothing flashy. You notice Marcus's \"favorites\"—they're everywhere. Meetings, projects, visibility. But you also notice something else: they look exhausted. Available 24/7. Always on call.",
        },
        {
          text: "Sarah approaches you at a team lunch. \"Smart, staying independent. Let me tell you about Marcus.\"",
          speakerId: 'sarah',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-5',
    },
    {
      id: 'scene-5',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "You meet Sarah at a cafe down the block. She checks the door before sitting—nervous, which means what she's about to say is risky. \"I've been here seven years. I've seen three cycles of Marcus's 'favorites.'\"",
          speakerId: 'sarah',
          emotion: 'neutral',
        },
        {
          text: "\"Cycle one: Dev lead named Priya. Brilliant. 70-hour weeks on Marcus's projects. Got promoted to Senior—then blamed for a product failure she didn't cause. Resigned 'voluntarily.' Cycle two: Operations guy, David. Marcus's shadow for 18 months. When David started getting credit independently? Suddenly 'performance concerns.'\"",
          speakerId: 'sarah',
          emotion: 'neutral',
        },
        {
          
          text: "Specific names. Specific outcomes. This isn't speculation—she's reciting history.",
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
          feedback: 'Looking for a sustainable path. Not fight, not flight—navigate.',
        },
        {
          id: 'choice-5b',
          text: '"Maybe he\'s different with me."',
          nextSceneId: 'scene-6b',
          feedback: "He's not \"different with you.\" The pattern repeats.",
        },
        {
          id: 'choice-5c',
          text: '"I should go to HR."',
          nextSceneId: 'scene-6c',
          feedback: 'HR protects the company, not you. Think before you leap.',
        },
      ],
    },
    {
      id: 'scene-6a',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Sarah leans in, lowering her voice. \"Three things. First: document everything. Every contribution. Date, description, evidence—emails where he asks you to do something, screenshots of drafts with timestamps. Keep a log, handwritten if you have to. Just notes with dates and facts.\"",
          speakerId: 'sarah',
          emotion: 'neutral',
        },
        {
          text: "\"Second: build relationships with other leaders. Not as betrayal—insurance. Don't put all your sponsorship in one basket. Let Marcus notice. Frame it as 'learning from different perspectives.' Third: when he asks for something off-books, verbal? Get email confirmation. 'Just to confirm—you wanted X by Y date, correct?' Frame it as being thorough.\"",
          speakerId: 'sarah',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'scene-7',
    },
    {
      id: 'scene-6b',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Sarah sighs. \"Everyone thinks that. I thought that. Until I didn't.\" She was cycle three. The honest one. \"Just... keep your eyes open. And document your work. You'll need it eventually.\"",
          speakerId: 'sarah',
          emotion: 'sad',
        },
      ],
      nextSceneId: 'scene-7',
    },
    {
      id: 'scene-6c',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Sarah shakes her head firmly. \"No. HR protects the company, not you. Marcus has been here 12 years. You've been here six months. Unless you have documented, provable misconduct—not just bad vibes—you'll be the problem.\"",
          speakerId: 'sarah',
          emotion: 'angry',
        },
      ],
      nextSceneId: 'scene-7',
    },
    {
      id: 'scene-7',
      backgroundId: 'office',
      dialog: [
        {
          text: "A week later. Marcus calls you in. \"Quick chat.\" His voice is casual, posture leaning back—manufactured calm. \"There's a situation. The quarterly numbers look... challenging for our team. Nothing we can't explain, but it needs the right presentation. The right person.\"",
          speakerId: 'marcus',
          emotion: 'neutral',
        },
        {
          text: "He spreads his hands, palms up—the gesture of giving a gift. \"You. Great visibility opportunity. Executive face-time.\" You ask why he's not presenting. \"I have a conflict that day. Board prep. Very last-minute.\" His eyes flick right—constructing, not remembering.",
          speakerId: 'marcus',
          emotion: 'seductive',
        },
        {
          
          text: '"Great visibility" for bad news. Why isn\'t HE presenting?',
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
          feedback: "Enthusiastic but not alone. He can't make you the scapegoat now.",
        },
        {
          id: 'choice-7b',
          text: '"I\'ll do it. Thank you for the opportunity."',
          nextSceneId: 'scene-8b',
          feedback: 'You just volunteered for the firing squad. He stays clean.',
        },
        {
          id: 'choice-7c',
          text: '"I don\'t feel comfortable presenting numbers I didn\'t generate."',
          nextSceneId: 'scene-8c',
          xpBonus: 10,
          tactic: 'boundary',
          feedback: "Honest refusal. He won't forget it, but you won't be his fall guy.",
        },
      ],
    },
    {
      id: 'scene-8a',
      backgroundId: 'office',
      dialog: [
        {
          text: "Marcus's smile tightens. His fingers drum once on the desk—impatience. \"I wish I could join you, but I have a conflict that day.\" His gaze flickers right again. \"Unless... unless you don't feel ready? I can find someone else who wants the visibility...\"",
          speakerId: 'marcus',
          emotion: 'neutral',
        },
        {
          
          text: "He's questioning if you're \"ready.\" Don't take the bait.",
          emotion: 'cold',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: '"I\'m ready. But let me loop in Finance to validate the numbers first—don\'t want any surprises."',
          nextSceneId: 'scene-good-transition',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'cya',
          feedback: 'Paper trail. Multiple stakeholders. Shared accountability.',
        },
        {
          id: 'choice-8b',
          text: '"You\'re right, I should step up. I\'ll do it solo."',
          nextSceneId: 'scene-8b',
          feedback: 'Guilt-tripped into the scapegoat role. He wins.',
        },
      ],
    },
    {
      id: 'scene-8b',
      backgroundId: 'office',
      dialog: [
        {
          text: "The presentation does not go well. Leadership has questions you can't answer. \"Walk us through the methodology here.\" The VP's tone is sharp. \"I... the data was provided to me. I compiled the presentation but—\" \"Provided by whom?\" You look at Marcus. He's leaning back, arms crossed, completely neutral.",
          speakerId: 'marcus',
          emotion: 'neutral',
        },
        {
          text: "He shrugs slightly, letting the silence stretch. \"These were supposed to be vetted before this meeting,\" Marcus says finally, voice disappointed—like a parent catching a child in a lie. He holds up a hand, cutting you off. \"Let's not relitigate this here. I'll work with the team to understand what went wrong.\"",
          speakerId: 'marcus',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-bad-ending',
    },
    {
      id: 'scene-8c',
      backgroundId: 'office',
      dialog: [
        {
          text: "Marcus's expression hardens. His jaw sets. A vein pulses at his temple—anger he's struggling to control. He takes a breath, composes himself. \"That's... disappointing. I thought you wanted to grow here. I've invested a lot in your development.\"",
          speakerId: 'marcus',
          emotion: 'angry',
        },
        {
          text: "\"No, no.\" He waves a hand. \"I understand. Not everyone is ready for the big leagues.\" He stands, signaling the meeting is over. \"I'll remember this when opportunities come up.\" You say quietly: \"I hope you'll remember I didn't present numbers I couldn't defend.\" His eyes narrow for a fraction of a second.",
          speakerId: 'marcus',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-neutral-ending',
    },
    {
      id: 'scene-good-transition',
      backgroundId: 'office',
      dialog: [
        {
          text: "The presentation day arrives. You're ready—and you're not alone. Finance validated the numbers. Your email trail shows exactly when you received the data and from whom. The VP asks a tough question about methodology. \"I can speak to the presentation, but for methodology I'd defer to Finance. They validated these figures.\"",
        },
        {
          text: "Marcus shifts in his seat—he didn't expect you to have backup. The Finance rep confirms: \"The data is solid. We reviewed the inputs together.\" \"Together.\" That word just saved you. The meeting ends without incident. The numbers were bad, but explained. No one takes the fall. Marcus catches your eye as people file out. \"Well played,\" he murmurs.",
          speakerId: 'marcus',
          emotion: 'cold',
        },
      ],
      nextSceneId: 'scene-good-ending',
    },
    {
      id: 'scene-good-ending',
      backgroundId: 'office',
      dialog: [
        {
          text: "Six months later. You're in a new role—transferred to a different team. A lateral move you engineered yourself. Your documentation of contributions came in handy during performance reviews. You got credit for your work. The paper trail saved you.",
        },
        {
          text: "Marcus? Word is his latest \"favorite\" got burned badly on a project. Some are starting to see the pattern. Sarah texts: \"Heard Marcus is being 'asked' to take a different role. HR finally paid attention.\" You didn't take him down. You just played the long game and protected yourself.",
          speakerId: 'sarah',
          emotion: 'smirking',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Playing the Long Game',
      endingSummary: "You navigated corporate manipulation without becoming a victim. Documentation, multiple allies, and strategic positioning. Predators eventually expose themselves—your job is to survive until they do.",
    },
    {
      id: 'scene-neutral-ending',
      backgroundId: 'office',
      dialog: [
        {
          text: "The next few months are rocky. Marcus is cooler, and opportunities dry up. But you're not his scapegoat either. You keep your head down, do good work. Eventually, you find a new job at a different company. A lateral move, but a fresh start.",
        },
        {
          text: "Your exit interview is pleasant. No drama. No bodies buried. You escaped. Next time, you'll recognize the pattern earlier. Sometimes the win is just getting out clean.",
          
          emotion: 'neutral',
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Clean Exit',
      endingSummary: "You refused to be the scapegoat, which had costs. But you left on your own terms with reputation intact. Lesson: don't wait for \"different with me.\"",
    },
    {
      id: 'scene-bad-ending',
      backgroundId: 'office',
      dialog: [
        {
          text: "After the presentation disaster, you become the \"problem.\" Marcus distances himself publicly. \"I tried to mentor them, but...\" His final move: rewrite history. He \"tried.\" You \"failed.\" Your performance review reflects \"leadership concerns.\" You're put on a PIP.",
        },
        {
          text: "Three months later, you're \"managed out.\" The severance is fine, but your confidence is shot. He won this round. But now you know the game. You won't lose again. Never be someone's fall guy. Document everything. Trust no one completely.",
          
          emotion: 'neutral',
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Fall Guy',
      endingSummary: "You became the scapegoat. Lesson: document everything, diversify sponsors, never take solo ownership of someone else's problem. Paper trails save careers.",
    },
  ],
};
