// Scenario: The Ghost (Male Version v3)
// Three paths: The Slow Fade, The Cliff Drop, The Zombie
// Teaching clean exits through different situations

import type { Scenario } from '../../types';

export const maleTheGhostScenario: Scenario = {
  id: 'male-the-ghost',
  title: 'The Ghost',
  tagline: 'Leave like smoke. Leave her wondering.',
  description:
    "Sometimes relationships end. How you exit determines whether you're remembered as a mystery or a disaster. Three situations, three exit strategies.",
  tier: 'vip',
  estimatedMinutes: 15,
  difficulty: 'advanced',
  category: 'healthy',
  xpReward: 175,
  badgeId: 'phantom',
  targetGender: 'male',

  templates: {
    ex: ['Natalie', 'Rachel', 'Brittany', 'Ashley', 'Megan'],
    clingy: ['Diana', 'Jessica', 'Brittany', 'Tiffany', 'Crystal'],
    zombie: ['Mia', 'Jade', 'Vanessa', 'Chelsea', 'Amber'],
  },

  tacticsLearned: [
    'The clean exit (leave at peak)',
    'Minimal explanation',
    'Dignity preservation',
    'Post-exit silence',
    'Handling clingers',
    'Zombie defense',
  ],
  redFlagsTaught: [
    'Over-explaining (giving closure as a gift)',
    'Emotional departures (villain narratives)',
    'Delaying exits',
    'Post-exit contact',
    'JADE (Justify, Argue, Defend, Explain)',
    'Rewarding disappearance',
  ],

  characters: [
    {
      id: 'natalie',
      name: 'Natalie',
      description: "A decent woman you've outgrown. No drama, just done.",
      traits: ['decent', 'comfortable', 'predictable'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'diana',
      name: 'Diana',
      description: "Won't take no for an answer. Texts constantly. Shows up unannounced.",
      traits: ['clingy', 'desperate', 'boundary-blind'],
      defaultEmotion: 'sad',
    },
    {
      id: 'mia',
      name: 'Mia',
      description: 'Ghosted you three months ago. Now she wants to talk.',
      traits: ['avoidant', 'entitled', 'charming'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'victor',
      name: 'Victor',
      description: "Your older brother. Been through every exit scenario.",
      traits: ['experienced', 'direct', 'protective'],
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

  startSceneId: 'opening',

  scenes: [
    // ============================================
    // OPENING - THE FORK
    // ============================================
    {
      id: 'opening',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Your brother Victor is over. Beers. The couch. He has that look—the one that says he's reading you. 'What's going on? You've got that energy.'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
        {
          text: "He's not wrong. There's a situation. You need to figure out how to handle it.",
        },
        {
          speakerId: 'inner-voice',
          text: "He's been through this. He'll know.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-fade',
          text: '"It\'s Natalie. She\'s fine, I just... outgrew it. Need to end things."',
          nextSceneId: 'fade-1',
          feedback: 'The Slow Fade. Ending a good relationship gracefully.',
        },
        {
          id: 'fork-cliff',
          text: '"Diana. She won\'t give me space. I need OUT but she won\'t accept it."',
          nextSceneId: 'cliff-1',
          feedback: 'The Cliff Drop. When clean breaks need to be absolute.',
        },
        {
          id: 'fork-zombie',
          text: '"Remember Mia? SHE ghosted ME three months ago. Now she\'s back."',
          nextSceneId: 'zombie-1',
          feedback: 'The Zombie. When the ghoster comes back from the dead.',
        },
      ],
    },

    // ============================================
    // PATH A: THE SLOW FADE
    // Ending a decent relationship gracefully
    // ============================================
    {
      id: 'fade-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Natalie.' Victor nods slowly. 'The stable one. Eight months?' 'Yeah. She's... fine. Good, even. I just don't feel it anymore.' 'Does she know?'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          text: "'No. That's the problem. She's talking about moving in together. Making plans. I feel like I'm lying by not saying anything.'",
        },
        {
          speakerId: 'inner-voice',
          text: 'The longer you wait, the worse it gets.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fade-1a',
          text: '"I want to do this right. Minimal damage."',
          nextSceneId: 'fade-2-advice',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Clean exit mindset. Less is more.',
        },
        {
          id: 'fade-1b',
          text: '"I should explain everything. She deserves to know why."',
          nextSceneId: 'fade-2-pushback',
          feedback: 'Closure is a gift you give them. Mystery is a gift you keep.',
        },
        {
          id: 'fade-1c',
          text: '"Maybe I should wait another month. See if feelings change."',
          nextSceneId: 'fade-2-delay',
          feedback: "You know the answer. Delay just makes it worse.",
        },
      ],
    },
    {
      id: 'fade-2-pushback',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Explain what exactly?' Victor tilts his head. 'What she did wrong?' 'Nothing specific. I just... grew out of it.' 'So you're going to explain nothing specific. For three hours. While she cries and promises to change.'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
        {
          text: "He lets that sit. 'Every detail you give her is something she can argue with. Something she can promise to fix. You want a clean exit, not a negotiation.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'fade-2-advice',
    },
    {
      id: 'fade-2-delay',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Another month?' Victor laughs, not unkindly. 'Man, what's going to change in a month that hasn't changed in eight?' He's right. You know he's right.",
          speakerId: 'victor',
          emotion: 'concerned',
        },
        {
          text: "'Delay is how clean exits become disasters. You wait too long, then you blow up over something stupid, and suddenly you're the villain.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'fade-2-advice',
    },
    {
      id: 'fade-2-advice',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Here's the move.' Victor sets down his beer. 'Exit at peak. Not after a fight. After a nice dinner. You become a good memory that ended mysteriously, not a disaster she's relieved escaped.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          text: "'What do I even say?' 'As little as possible. \"This isn't working for me anymore.\" Period. She'll ask why. You say \"It's not about anything you did.\" No details. No negotiations.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: 'Minimal words. Maximum clarity. No threads to pull.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fade-2a',
          text: '"We have dinner Saturday. I\'ll do it after."',
          nextSceneId: 'fade-3-dinner',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Perfect timing. After a good night, in private.',
        },
        {
          id: 'fade-2b',
          text: '"Can\'t I just text her? Less drama."',
          nextSceneId: 'fade-3-text-pushback',
          feedback: 'Eight months deserves at least a face-to-face. Barely.',
        },
      ],
    },
    {
      id: 'fade-3-text-pushback',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Victor winces. 'Eight months and you text? Even I wouldn't do that. You'll see her around. Mutual friends. Do you want the story to be \"he couldn't even face me\"?'",
          speakerId: 'victor',
          emotion: 'cold',
        },
        {
          text: "He has a point. The exit method becomes part of how you're remembered.",
        },
      ],
      nextSceneId: 'fade-3-dinner',
    },
    {
      id: 'fade-3-dinner',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Saturday. Nice restaurant. Natalie is relaxed, happy. Talking about a trip she wants to plan. 'I was thinking maybe a cabin in the mountains? Just us for a weekend.' She has no idea.",
          speakerId: 'natalie',
          emotion: 'happy',
        },
        {
          text: 'Your heart pounds. The impulse to chicken out is strong.',
        },
        {
          speakerId: 'inner-voice',
          text: 'Not here. After dinner. In private.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fade-3a',
          text: 'Enjoy dinner. Do it after, at her place.',
          nextSceneId: 'fade-4-after',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Private conversation. No audience.',
        },
        {
          id: 'fade-3b',
          text: '"Natalie, I need to tell you something..." (do it now)',
          nextSceneId: 'fade-4-public',
          feedback: 'Public breakups create scenes. This deserved privacy.',
        },
        {
          id: 'fade-3c',
          text: "Postpone. You can't do this tonight.",
          nextSceneId: 'fade-bad-delay',
          feedback: 'Delay is how clean exits become disasters.',
        },
      ],
    },
    {
      id: 'fade-4-public',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'What? What's wrong?' Natalie's face shifts. Confusion. Then recognition. The next forty-five minutes are awful. She tears up. Other diners glance over. You feel like a monster.",
          speakerId: 'natalie',
          emotion: 'sad',
        },
        {
          text: "You're out, but it's messy. Half the restaurant witnessed your relationship end.",
        },
      ],
      nextSceneId: 'fade-neutral-ending',
    },
    {
      id: 'fade-bad-delay',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Two weeks later. You've delayed twice. Then you have a stupid fight about something trivial. All the resentment spills out. Tears. Accusations. Three hours of talking in circles.",
        },
        {
          text: "You're out, but it's the messiest possible exit. Natalie has a complete villain narrative about you now. This is exactly what Victor warned about.",
        },
      ],
      nextSceneId: 'fade-bad-ending',
    },
    {
      id: 'fade-4-after',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Back at her place. She's happy from dinner, relaxed from wine. 'That was nice. I love our nights.' Now. Before the moment passes. 'Natalie... I need to tell you something.' Her smile fades. 'What's up?'",
          speakerId: 'natalie',
          emotion: 'happy',
        },
        {
          speakerId: 'inner-voice',
          text: "Minimal words. Don't give her threads to pull.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fade-4a',
          text: '"This isn\'t working for me anymore. I need to step away."',
          nextSceneId: 'fade-5-clean',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Clean. Complete. Unarguable.',
        },
        {
          id: 'fade-4b',
          text: '"I\'ve been unhappy for months. The spark died. I feel like we\'ve grown apart..."',
          nextSceneId: 'fade-5-overexplain',
          feedback: 'Three details = three negotiations. You gave her ammunition.',
        },
      ],
    },
    {
      id: 'fade-5-overexplain',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Natalie grabs onto every thread. 'Unhappy for MONTHS? Why didn't you say something? The spark—we can get it back. What do you need? I'll try harder.'",
          speakerId: 'natalie',
          emotion: 'sad',
        },
        {
          text: "Two hours later, you're still talking. She's cried. You've felt like the bad guy. You still leave, but it's not clean. She has a complete narrative. No mystery. Just mess.",
        },
      ],
      nextSceneId: 'fade-neutral-ending',
    },
    {
      id: 'fade-5-clean',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Natalie looks stunned. 'What? Not working? We just had a great night.' 'I know. And I'm grateful for that. But I need to move on.' 'But WHY? What did I do?'",
          speakerId: 'natalie',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "She's looking for something to fix. Don't give her one.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fade-5a',
          text: '"It\'s not about anything you did. This is about me."',
          nextSceneId: 'fade-6-exit',
          isOptimal: true,
          xpBonus: 20,
          feedback: '"It\'s about me" is unarguable.',
        },
        {
          id: 'fade-5b',
          text: 'Start listing specific issues.',
          nextSceneId: 'fade-5-overexplain',
          feedback: 'Every detail is a negotiation point.',
        },
      ],
    },
    {
      id: 'fade-6-exit',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Can we at least try? Counseling?' 'I'm not in a place where that would help. I'm sorry.' 'I don't understand.' 'I know. That's one of the sad parts.'",
          speakerId: 'natalie',
          emotion: 'sad',
        },
        {
          text: 'You gather your things. A final hug. And you leave. Clean. Complete.',
        },
      ],
      nextSceneId: 'fade-7-aftermath',
    },
    {
      id: 'fade-7-aftermath',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Next morning. Your phone: 'I barely slept. Can we talk? Please.' 'I need to understand what changed.' 'I still love you. We can work through this.'",
          speakerId: 'natalie',
          emotion: 'sad',
        },
        {
          text: "The pull to respond. To comfort. To explain. Victor's words: 'Every response is a thread she pulls.'",
        },
        {
          speakerId: 'inner-voice',
          text: 'The conversation is over. Hold the line.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fade-7a',
          text: "Don't respond. The conversation is over.",
          nextSceneId: 'fade-good-ending',
          isOptimal: true,
          xpBonus: 25,
          feedback: 'Silence lets both of you move on.',
        },
        {
          id: 'fade-7b',
          text: 'Send one last explanatory message.',
          nextSceneId: 'fade-7-thread',
          feedback: 'One message becomes five.',
        },
      ],
    },
    {
      id: 'fade-7-thread',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'I just need time to figure things out.' 'Time? So there's a CHANCE?' You gave her hope. That wasn't the plan.",
          speakerId: 'natalie',
          emotion: 'happy',
        },
        {
          text: "She texts every few days now. Checking in. Asking if you've 'figured things out.' The exit is no longer clean. It's a slow fade that drags on for weeks.",
        },
      ],
      nextSceneId: 'fade-neutral-ending',
    },
    // FADE ENDINGS
    {
      id: 'fade-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "You don't respond. Days pass. She texts. You stay silent. It's hard. But it's clean. Weeks later, Victor checks in. 'How you holding up?' 'It's hard. I keep wanting to explain.' 'Don't. Closure helps HER move on. Mystery means you're remembered.'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
        {
          text: "Months later, a mutual friend mentions Natalie. 'She still talks about you. Says she doesn't understand what happened.' You're not a chapter she closed. You're a question she never answered.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Phantom',
      endingSummary: "Clean exit. Minimal words. No negotiations. You're not a resolved chapter—you're an open question.",
    },
    {
      id: 'fade-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You left, but not cleanly. Too much explanation. Too much back and forth. Natalie has a complete narrative now. She processed it, understood it, moved on.",
        },
        {
          text: "Within months, she's dating someone new. You're a chapter that closed. Not bad. Just... ordinary.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Closed Chapter',
      endingSummary: 'You got out, but gave away too much. She processed, understood, and moved on. Mystery destroyed.',
      endingLearnReference: 'clean-exit-101',
      endingLearnPrompt: 'Learn to exit without giving closure.',
    },
    {
      id: 'fade-bad-ending',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "The exit was a disaster. Tears. Accusations. Hours of fighting. Natalie has a complete villain narrative about you now.",
        },
        {
          text: "Three weeks later, you see it. Her Instagram. New guy. Arm around her. Big smile. Caption: 'When you find someone who actually communicates.' The comments: 'So happy for you!' 'You deserve this!' 'Upgrade!' You're not a mystery. You're the bad guy in her story. And she's already moved on.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Villain Arc',
      endingSummary: "Delay led to collapse. You're not a mystery—you're the bad guy in her story. And she's already replaced you.",
      endingLearnReference: 'clean-exit-101',
      endingLearnPrompt: 'Learn why clean exits matter.',
    },

    // ============================================
    // PATH B: THE CLIFF DROP
    // When she won't let go
    // ============================================
    {
      id: 'cliff-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Diana.' Victor's face hardens. 'The one who texts forty times a day? Shows up at your job?' 'I've tried ending it THREE times, Vic. She just... won't accept it. Cries. Makes promises. Shows up with flowers and lingerie.'",
          speakerId: 'victor',
          emotion: 'cold',
        },
        {
          text: "'And you keep letting her back in.' 'I feel guilty! She gets so upset.' 'That's the trap. Her emotions become your responsibility.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: 'Her tears work because you let them.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'cliff-1a',
          text: '"How do I make it stick this time?"',
          nextSceneId: 'cliff-2-advice',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Ready to learn the clean break.',
        },
        {
          id: 'cliff-1b',
          text: '"Maybe if I explain better she\'ll understand."',
          nextSceneId: 'cliff-2-jade',
          feedback: "Explaining more won't work. She heard you. She's choosing not to accept it.",
        },
      ],
    },
    {
      id: 'cliff-2-jade',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Man. You've explained. Multiple times. She HEARD you. She's just choosing not to accept it because your no hasn't had consequences yet.' He leans forward.",
          speakerId: 'victor',
          emotion: 'cold',
        },
        {
          text: "'Stop JADEing. Justify, Argue, Defend, Explain. Every time you do that, you signal that your no is negotiable. It's not a debate. It's a statement.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'cliff-2-advice',
    },
    {
      id: 'cliff-2-advice',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Here's how you make it stick. One clear statement. No explanations. No reasons. Just: \"This is over. Don't contact me.\" Then—this is crucial—you BLOCK her. Everywhere.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          text: "'But what if—' 'No. You've given her three chances to accept it gracefully. She didn't. Now you protect yourself. Her feelings are no longer your problem.'",
          speakerId: 'victor',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: 'No is a complete sentence.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'cliff-2a',
          text: '"You\'re right. I need to just... do it. And mean it."',
          nextSceneId: 'cliff-3-call',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Ready to hold the line.',
        },
        {
          id: 'cliff-2b',
          text: '"Should I do it in person? Text?"',
          nextSceneId: 'cliff-3-method',
          xpBonus: 10,
          feedback: 'Good question. Method matters.',
        },
      ],
    },
    {
      id: 'cliff-3-method',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'In person with a clinger? Absolutely not. She'll cry. She'll try to seduce you. She'll make it a three-hour negotiation. Text or call. Brief. Then block.' He pauses.",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          text: "'Actually, call. It's harder to screenshot and share a call. She seems like the type who'd show your text to everyone trying to get sympathy. \"Look what he said to me!\"'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'cliff-3-call',
    },
    {
      id: 'cliff-3-call',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You call Diana. She picks up immediately. 'Baby! I was just thinking about you. I got us tickets to that concert—' 'Diana. I need you to listen.'",
          speakerId: 'diana',
          emotion: 'happy',
        },
        {
          text: "Her voice shifts. 'What's wrong? Whatever it is, we can work through it. I love you.' Here we go.",
        },
        {
          speakerId: 'inner-voice',
          text: 'One statement. No JADE. No negotiation.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'cliff-3a',
          text: '"This relationship is over. Don\'t contact me again."',
          nextSceneId: 'cliff-4-pushback',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Clear. Final. Complete.',
        },
        {
          id: 'cliff-3b',
          text: '"I think we need some space. Maybe take a break..."',
          nextSceneId: 'cliff-4-weak',
          feedback: '"Space" and "break" aren\'t endings. They\'re intermissions.',
        },
      ],
    },
    {
      id: 'cliff-4-weak',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'A break? Okay, okay, I can do that. How long? A week? Two weeks? I'll give you space, but I'll be waiting. I love you too much to give up.'",
          speakerId: 'diana',
          emotion: 'sad',
        },
        {
          text: "She didn't hear an ending. She heard a pause. You've just extended the cycle.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Be clear or be stuck.',
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'cliff-4wa',
          text: '"No. Not a break. This is over. Completely."',
          nextSceneId: 'cliff-4-pushback',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Course correction. Clear it up.',
        },
        {
          id: 'cliff-4wb',
          text: '"Just... give me some time to think."',
          nextSceneId: 'cliff-bad-ending',
          feedback: "You couldn't hold the line. The cycle continues.",
        },
      ],
    },
    {
      id: 'cliff-4-pushback',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'WHAT? Over? Baby, no. Whatever I did, I can fix it. Just tell me what's wrong. Don't do this to us.' Her voice is cracking. The guilt hits. But you remember: her emotions aren't your responsibility.",
          speakerId: 'diana',
          emotion: 'sad',
        },
        {
          text: "'I can't live without you. I'll do ANYTHING. Come over. Please. I need to see you.'",
          speakerId: 'diana',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: 'Tears and seduction. Classic combo. Stay strong.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'cliff-4a',
          text: '"I wish you well, Diana. Goodbye." (Hang up. Block.)',
          nextSceneId: 'cliff-5-block',
          isOptimal: true,
          xpBonus: 25,
          feedback: 'Clean exit. No negotiation. Well done.',
        },
        {
          id: 'cliff-4b',
          text: "Start explaining why you're leaving.",
          nextSceneId: 'cliff-5-jade-trap',
          feedback: 'Every explanation is a thread she pulls.',
        },
        {
          id: 'cliff-4c',
          text: '"Maybe we should meet and talk about this..."',
          nextSceneId: 'cliff-bad-ending',
          feedback: 'You just reopened negotiations.',
        },
      ],
    },
    {
      id: 'cliff-5-jade-trap',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'I just feel like you're too clingy, and I need independence, and—' 'Clingy? I'll give you space! How much space? I can change! Just tell me what you need. I'll do anything.'",
          speakerId: 'diana',
          emotion: 'sad',
        },
        {
          text: "Every reason you give becomes a promise she makes. Every complaint becomes a negotiation. You're back in the trap.",
        },
        {
          speakerId: 'inner-voice',
          text: 'Stop explaining. End the call.',
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'cliff-5ja',
          text: '"This conversation is over. Goodbye." (Hang up. Block.)',
          nextSceneId: 'cliff-5-block',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Course correction. Close the door.',
        },
        {
          id: 'cliff-5jb',
          text: "Keep explaining, hoping she'll finally understand.",
          nextSceneId: 'cliff-neutral-ending',
          feedback: "You JADE'd. The exit drags on for weeks.",
        },
      ],
    },
    {
      id: 'cliff-5-block',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You hang up. Then: block on phone. Block on Instagram. Block on everything. Victor texts: 'Did you do it?' 'Done. Blocked everywhere.' 'Proud of you. Now the hard part.'",
          speakerId: 'victor',
          emotion: 'happy',
        },
        {
          text: "'The hard part?' 'Not unblocking her when you feel guilty. She'll find ways to reach out. Stay strong.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'cliff-6-test',
    },
    {
      id: 'cliff-6-test',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Three days later. Email notification: 'I don't understand why you're doing this. I deserve an explanation. You owe me that much. Please unblock me. I just want to talk. I sent photos.'",
          speakerId: 'diana',
          emotion: 'seductive',
        },
        {
          text: "She found a channel you forgot to block. The pull to respond. To explain. To give her 'closure.' The photos are... tempting.",
        },
        {
          speakerId: 'inner-voice',
          text: "You don't owe explanations to someone who won't accept them.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'cliff-6a',
          text: 'Delete. Block email too. Silence.',
          nextSceneId: 'cliff-good-ending',
          isOptimal: true,
          xpBonus: 20,
          feedback: "Closure is a gift. She didn't earn it.",
        },
        {
          id: 'cliff-6b',
          text: 'Send one final explanation email.',
          nextSceneId: 'cliff-neutral-ending',
          feedback: 'You gave her another thread. The cycle extends.',
        },
      ],
    },
    // CLIFF ENDINGS
    {
      id: 'cliff-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Two months later. No contact. She tried a few more channels—LinkedIn message, text from a new number, showing up at your gym—but you never responded. Eventually, she stopped.",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          text: "'See?' Victor says over coffee. 'She didn't die. She didn't fall apart. She just found someone else to obsess over. Your silence taught her what your words couldn't: no means no.'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Clean Break',
      endingSummary: 'No JADE. No negotiations. Silence was the only explanation she respected.',
    },
    {
      id: 'cliff-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "It took three more weeks of back-and-forth before she finally accepted it. Three weeks of explanations, negotiations, promises, and tears.",
        },
        {
          text: "You're out, but exhausted. The exit could have taken one call. Instead it took a month. Next time: no JADE. No exceptions.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Extended Exit',
      endingSummary: 'You got out, but not cleanly. Every explanation extended the cycle.',
      endingLearnReference: 'clean-exit-101',
      endingLearnPrompt: 'Learn why JADE prolongs breakups.',
    },
    {
      id: 'cliff-bad-ending',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Six months later. You're still with Diana. Every few weeks you try to leave. Every time, she cries, threatens to hurt herself, shows up in lingerie. And you cave.",
        },
        {
          text: "But then she gets bored. She finds someone else—someone who'll chase HER. You see them together at a bar. Her arm around some new guy, laughing. Making eye contact with you. Making sure you see. The clinger became the ghoster. And you're left wondering how you became the one who got played.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Flip',
      endingSummary: "Her emotions became your responsibility. Then she got bored and moved on. You couldn't leave, but she could.",
      endingLearnReference: 'clean-exit-101',
      endingLearnPrompt: 'Learn to break free from guilt manipulation.',
    },

    // ============================================
    // PATH C: THE ZOMBIE
    // When the ghoster comes back
    // ============================================
    {
      id: 'zombie-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'MIA?' Victor nearly spits his beer. 'The one who disappeared for three months? Just... vanished mid-conversation?' 'Yep. Radio silence. I thought something happened to her. Then last night—' You show him your phone.",
          speakerId: 'victor',
          emotion: 'angry',
        },
        {
          text: "'Hey stranger. Been thinking about you. I know I handled things badly. Can we talk?' The audacity. Victor's eyes narrow.",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Three months of nothing. Now she wants to 'talk.'",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'zombie-1a',
          text: '"Part of me wants to hear what she has to say..."',
          nextSceneId: 'zombie-2-curious',
          feedback: "Curiosity is natural. But don't let it trap you.",
        },
        {
          id: 'zombie-1b',
          text: '"I want to tell her exactly what I think of her."',
          nextSceneId: 'zombie-2-angry',
          feedback: 'Anger is valid. But giving her a reaction is still giving her something.',
        },
        {
          id: 'zombie-1c',
          text: '"I don\'t think I should respond at all."',
          nextSceneId: 'zombie-2-wise',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Silence is often the most powerful response.',
        },
      ],
    },
    {
      id: 'zombie-2-curious',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Hear what she has to say?' Victor looks at you like you've lost your mind. 'She ghosted you. Disappeared. Let you wonder if she was alive or dead. What could she possibly say that matters?'",
          speakerId: 'victor',
          emotion: 'concerned',
        },
        {
          text: "'Any explanation she gives now is just... words. She's had three months to reach out. She's reaching out now because something else didn't work out. You're the fallback.'",
          speakerId: 'victor',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: 'Fallback. Not first choice.',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'zombie-3-decision',
    },
    {
      id: 'zombie-2-angry',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Tell her off?' Victor shrugs. 'You could. Get it all out. But think about it: you'd be giving her an hour of your emotional energy. For what? So she knows you're upset?'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
        {
          text: "'She already knows. She KNOWS she ghosted you. She knows it was wrong. An angry response just tells her you still care enough to be angry. Silence says something different.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "The opposite of love isn't hate. It's indifference.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'zombie-3-decision',
    },
    {
      id: 'zombie-2-wise',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Victor nods approvingly. 'Smart. She gets nothing. No anger. No explanation. No closure. Just... silence. Let her wonder if you even got the message.'",
          speakerId: 'victor',
          emotion: 'happy',
        },
        {
          text: "'But—' he holds up a finger '—the challenge is when she tries again. Because she will. Once won't be enough. The real test is staying silent when she escalates.'",
          speakerId: 'victor',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'zombie-3-decision',
    },
    {
      id: 'zombie-3-decision',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You stare at her message. Three months of silence. Now this. 'Hey stranger. Been thinking about you. I know I handled things badly. Can we talk?'",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          text: 'What she wants: a response. Any response. Your attention. Your energy.',
        },
        {
          speakerId: 'inner-voice',
          text: 'What do YOU want?',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'zombie-3a',
          text: "Don't respond. At all. Let her wonder.",
          nextSceneId: 'zombie-4-silence',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Silence is closure enough.',
        },
        {
          id: 'zombie-3b',
          text: '"I deserve an explanation. Meet me for coffee."',
          nextSceneId: 'zombie-4-meet',
          feedback: "You're giving her what she wants: access to you.",
        },
        {
          id: 'zombie-3c',
          text: 'Send an angry message telling her exactly what you think.',
          nextSceneId: 'zombie-4-angry',
          feedback: 'Anger is attention. Attention is engagement.',
        },
      ],
    },
    {
      id: 'zombie-4-angry',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'Three months? THREE MONTHS of nothing and now you want to TALK? You ghosted me. You disappeared. You let me think something happened to you. And now you waltz back like nothing happened?'",
        },
        {
          text: "Mia responds within minutes. 'I know. I messed up. I was going through things. Can I explain in person? Please? I miss you.' She got what she wanted: your engagement.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "You're back in a conversation with someone who ghosted you.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'zombie-4aa',
          text: "Stop responding now. Damage done, but don't make it worse.",
          nextSceneId: 'zombie-neutral-ending',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Course correction. Close the door.',
        },
        {
          id: 'zombie-4ab',
          text: '"Fine. Coffee. But you better have a good explanation."',
          nextSceneId: 'zombie-4-meet',
          feedback: "You're meeting the person who abandoned you. Think about that.",
        },
      ],
    },
    {
      id: 'zombie-4-meet',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Coffee shop. She looks amazing. Confident. 'Thanks for meeting me. I know I don't deserve it.' She launches into an explanation: depression, ex came back, fear of commitment. It sounds reasonable. Almost.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "'I know it's not an excuse. But I want to try again. Properly this time. I've learned from my mistakes.' She touches your hand. Those eyes.",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: 'Words are cheap. Three months of silence spoke louder.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'zombie-4ma',
          text: '"I appreciate you explaining. But no. I can\'t trust someone who disappeared."',
          nextSceneId: 'zombie-5-decline',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Heard her out. Still said no. Strength.',
        },
        {
          id: 'zombie-4mb',
          text: '"Everyone deserves a second chance. Let\'s try again."',
          nextSceneId: 'zombie-bad-ending',
          feedback: 'You rewarded the behavior. What do you think happens next time?',
        },
      ],
    },
    {
      id: 'zombie-5-decline',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Her face falls. 'Just... think about it? I've changed.' 'I believe you believe that. But I can't risk it. Good luck, Mia.' You leave money for your coffee and walk out.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "In the car, you feel... light. You got your answers. You said no anyway. That's power.",
        },
      ],
      nextSceneId: 'zombie-neutral-ending',
    },
    {
      id: 'zombie-4-silence',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You don't respond. Hours pass. Then a day. Another message: 'I know you're mad. You have every right. But please just let me explain.' You don't respond.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "Day three: 'I miss you. I think about you all the time. I made a mistake. A huge one.' Still nothing from you.",
          speakerId: 'mia',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: 'Let her wonder. Like you wondered for three months.',
          emotion: 'smirking',
        },
      ],
      nextSceneId: 'zombie-5-escalation',
    },
    {
      id: 'zombie-5-escalation',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Week two. She's tried calling. Texting. Instagram DM. A voice message. 'Please just tell me you're okay. I need to know you're alive.' The irony.",
          speakerId: 'mia',
          emotion: 'sad',
        },
        {
          text: "Victor texts: 'How's operation radio silence?' 'She's losing her mind.' 'Good. Now she knows how you felt.'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: 'The urge to respond. Stay strong.',
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'zombie-5a',
          text: "Continue the silence. She'll stop eventually.",
          nextSceneId: 'zombie-good-ending',
          isOptimal: true,
          xpBonus: 25,
          feedback: 'She disappeared for three months. You can disappear permanently.',
        },
        {
          id: 'zombie-5b',
          text: 'Send one message: "We\'re done. Stop contacting me."',
          nextSceneId: 'zombie-neutral-ending',
          feedback: "Closure is a gift. She didn't earn it.",
        },
      ],
    },
    // ZOMBIE ENDINGS
    {
      id: 'zombie-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "A month passes. Her messages slow, then stop. She finds someone else to pursue. You never gave her the satisfaction of a response.",
          speakerId: 'victor',
          emotion: 'neutral',
        },
        {
          text: "'Perfect.' Victor raises his beer. 'She ghosted you. You ghosted her back. But here's the difference: you're not coming back. She's just... haunted. By you. By what could have been. By the silence.'",
          speakerId: 'victor',
          emotion: 'smirking',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Reversal',
      endingSummary: "She ghosted you. You ghosted her back. But you're not coming back. You're moving forward.",
    },
    {
      id: 'zombie-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You engaged more than you needed to. Gave her attention—anger or explanation or time. She got some of what she wanted, even if you ultimately said no.",
        },
        {
          text: "You're free of her now. But she got to tell herself a story: 'We talked. He heard me out. It didn't work, but at least I tried.' You gave her that.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Response',
      endingSummary: "You engaged when you didn't need to. She got some closure. You didn't owe her that.",
      endingLearnReference: 'zombie-101',
      endingLearnPrompt: "Learn why zombies don't deserve responses.",
    },
    {
      id: 'zombie-bad-ending',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Three months later. You and Mia are back together. It's good—for a while. The sex is incredible. She's attentive. Says all the right things. Then she starts getting distant again. The texts slow. The excuses start. You've seen this before.",
        },
        {
          text: "She ghosts you again. Of course she does. Six weeks later, you see it. Her Instagram. New guy. Arm around him. Beach vacation. Caption: 'When you find your person.' You weren't the person. You were the placeholder. You taught her that ghosting has no consequences. That she can always come back. And leave again.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'History Repeats',
      endingSummary: 'You rewarded her disappearance with another chance. She disappeared again. And found someone else. You taught her she could.',
      endingLearnReference: 'zombie-101',
      endingLearnPrompt: 'Learn why taking back a ghoster enables the pattern.',
    },
  ],
};
