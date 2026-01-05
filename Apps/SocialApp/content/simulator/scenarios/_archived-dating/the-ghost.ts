// Scenario: The Ghost (v3)
// Three paths: The Slow Fade, The Cliff Drop, The Zombie
// Teaching clean exits through different situations

import type { Scenario } from '../types';

export const theGhostScenario: Scenario = {
  id: 'the-ghost',
  title: 'The Ghost',
  tagline: 'Leave like smoke. Leave them wondering.',
  description:
    "Sometimes relationships end. How you exit determines whether you're remembered as a mystery or a disaster. Three situations, three exit strategies.",
  tier: 'vip',
  estimatedMinutes: 15,
  difficulty: 'advanced',
  category: 'healthy',
  xpReward: 175,
  badgeId: 'phantom',

  templates: {
    ex: ['Nathan', 'Ryan', 'Brandon', 'Justin', 'Kyle'],
    clingy: ['Derek', 'Tyler', 'Brett', 'Chad', 'Trevor'],
    zombie: ['Marcus', 'Jake', 'Evan', 'Cole', 'Mason'],
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
      id: 'nathan',
      name: 'Nathan',
      description: "A decent guy you've outgrown. No drama, just done.",
      traits: ['decent', 'comfortable', 'predictable'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'derek',
      name: 'Derek',
      description: "Won't take no for an answer. Texts constantly.",
      traits: ['clingy', 'desperate', 'boundary-blind'],
      defaultEmotion: 'sad',
    },
    {
      id: 'marcus',
      name: 'Marcus',
      description: 'Ghosted you three months ago. Now he wants to talk.',
      traits: ['avoidant', 'entitled', 'charming'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'victoria',
      name: 'Victoria',
      description: "Your sister. Been through every exit scenario.",
      traits: ['experienced', 'direct', 'protective'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner',
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
          text: "Your sister Victoria is over. Wine. The couch. That look on her face that says she knows something's up. 'So. What's going on with you? You've got that energy.'",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "She's not wrong. There's a situation. You need to figure out how to handle it.",
        },
        {
          speakerId: 'inner',
          text: "She's been through this. She'll know.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-fade',
          text: '"It\'s Nathan. He\'s fine, I just... outgrew it. Need to end things."',
          nextSceneId: 'fade-1',
          feedback: 'The Slow Fade. Ending a good guy gracefully.',
        },
        {
          id: 'fork-cliff',
          text: '"Derek. He won\'t give me space. I need OUT but he won\'t accept it."',
          nextSceneId: 'cliff-1',
          feedback: 'The Cliff Drop. When clean breaks need to be absolute.',
        },
        {
          id: 'fork-zombie',
          text: '"Remember Marcus? HE ghosted ME three months ago. Now he\'s back."',
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
          text: "'Nathan.' Victoria nods slowly. 'The nice one. Eight months?' 'Yeah. He's... fine. Good, even. I just don't feel it anymore.' 'Does he know?'",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "'No. That's the problem. He's planning trips. Talking about meeting his family. I feel like I'm lying by not saying anything.'",
        },
        {
          speakerId: 'inner',
          text: "The longer you wait, the worse it gets.",
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
          text: '"I should explain everything. He deserves to know why."',
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
          text: "'Explain what exactly?' Victoria tilts her head. 'What he did wrong?' 'Nothing specific. I just... grew out of it.' 'So you're going to explain nothing specific. For three hours. While he cries and promises to change.'",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "She lets that sit. 'Every detail you give him is something he can argue with. Something he can promise to fix. You want a clean exit, not a negotiation.'",
          speakerId: 'victoria',
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
          text: "'Another month?' Victoria laughs, not unkindly. 'Honey. What's going to change in a month that hasn't changed in eight?' She's right. You know she's right.",
          speakerId: 'victoria',
          emotion: 'concerned',
        },
        {
          text: "'Delay is how clean exits become disasters. You wait too long, then you blow up over something stupid, and suddenly you're the villain.'",
          speakerId: 'victoria',
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
          text: "'Here's the move.' Victoria sets down her wine. 'Exit at peak. Not after a fight. After a nice dinner. You become a good memory that ended mysteriously, not a disaster he's relieved escaped.'",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "'What do I even say?' 'As little as possible. \"This isn't working for me anymore.\" Period. He'll ask why. You say \"It's not about anything you did.\" No details. No negotiations.'",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "Minimal words. Maximum clarity. No threads to pull.",
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
          text: '"Can\'t I just text him? Less drama."',
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
          text: "Victoria winces. 'Eight months and you text? Even I wouldn't do that. You'll see him around. Mutual friends. Do you want the story to be \"she couldn't even face me\"?'",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "She has a point. The exit method becomes part of how you're remembered.",
        },
      ],
      nextSceneId: 'fade-3-dinner',
    },
    {
      id: 'fade-3-dinner',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Saturday. Nice restaurant. Nathan is relaxed, happy. Talking about a trip he wants to plan. 'I was thinking maybe a cabin in the mountains? Just us for a weekend.' He has no idea.",
          speakerId: 'nathan',
          emotion: 'happy',
        },
        {
          text: "Your heart pounds. The impulse to chicken out is strong.",
        },
        {
          speakerId: 'inner',
          text: "Not here. After dinner. In private.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fade-3a',
          text: 'Enjoy dinner. Do it after, at his place.',
          nextSceneId: 'fade-4-after',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Private conversation. No audience.',
        },
        {
          id: 'fade-3b',
          text: '"Nathan, I need to tell you something..." (do it now)',
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
          text: "'What? What's wrong?' Nathan's face shifts. Confusion. Then recognition. The next forty-five minutes are awful. He tears up. Other diners glance over. You feel like a monster.",
          speakerId: 'nathan',
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
          text: "You're out, but it's the messiest possible exit. Nathan has a complete villain narrative about you now. This is exactly what Victoria warned about.",
        },
      ],
      nextSceneId: 'fade-bad-ending',
    },
    {
      id: 'fade-4-after',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Back at his place. He's happy from dinner, relaxed from wine. 'That was nice. I love our nights.' Now. Before the moment passes. 'Nathan... I need to tell you something.' His smile fades. 'What's up?'",
          speakerId: 'nathan',
          emotion: 'happy',
        },
        {
          speakerId: 'inner',
          text: "Minimal words. Don't give him threads to pull.",
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
          feedback: 'Three details = three negotiations. You gave him ammunition.',
        },
      ],
    },
    {
      id: 'fade-5-overexplain',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Nathan grabs onto every thread. 'Unhappy for MONTHS? Why didn't you say something? The spark—we can get it back. What do you need? I'll try harder.'",
          speakerId: 'nathan',
          emotion: 'sad',
        },
        {
          text: "Two hours later, you're still talking. He's cried. You've cried. You still leave, but it's not clean. He has a complete narrative. No mystery. Just mess.",
        },
      ],
      nextSceneId: 'fade-neutral-ending',
    },
    {
      id: 'fade-5-clean',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Nathan looks stunned. 'What? Not working? We just had a great night.' 'I know. And I'm grateful for that. But I need to move on.' 'But WHY? What did I do?'",
          speakerId: 'nathan',
          emotion: 'confused',
        },
        {
          speakerId: 'inner',
          text: "He's looking for something to fix. Don't give him one.",
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
          speakerId: 'nathan',
          emotion: 'sad',
        },
        {
          text: "You gather your things. A final hug. And you leave. Clean. Complete.",
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
          speakerId: 'nathan',
          emotion: 'sad',
        },
        {
          text: "The pull to respond. To comfort. To explain. Victoria's words: 'Every response is a thread he pulls.'",
        },
        {
          speakerId: 'inner',
          text: "The conversation is over. Hold the line.",
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
          text: "'I just need time to figure things out.' 'Time? So there's a CHANCE?' You gave him hope. That wasn't the plan.",
          speakerId: 'nathan',
          emotion: 'hopeful',
        },
        {
          text: "He texts every few days now. Checking in. Asking if you've 'figured things out.' The exit is no longer clean. It's a slow fade that drags on for weeks.",
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
          text: "You don't respond. Days pass. He texts. You stay silent. It's hard. But it's clean. Weeks later, Victoria checks in. 'How you holding up?' 'It's hard. I keep wanting to explain.' 'Don't. Closure helps HIM move on. Mystery means you're remembered.'",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "Months later, a mutual friend mentions Nathan. 'He still talks about you. Says he doesn't understand what happened.' You're not a chapter he closed. You're a question he never answered.",
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
          text: "You left, but not cleanly. Too much explanation. Too much back and forth. Nathan has a complete narrative now. He processed it, understood it, moved on.",
        },
        {
          text: "Within months, he's dating someone new. You're a chapter that closed. Not bad. Just... ordinary.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Closed Chapter',
      endingSummary: "You got out, but gave away too much. He processed, understood, and moved on. Mystery destroyed.",
      endingLearnReference: 'clean-exit-101',
      endingLearnPrompt: 'Learn to exit without giving closure.',
    },
    {
      id: 'fade-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The exit was a disaster. Tears. Accusations. Hours of fighting. Nathan has a complete villain narrative about you now.",
        },
        {
          text: "No regret—just resentment. The relationship ended, but the exit scarred both of you.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Villain Arc',
      endingSummary: "Delay led to collapse. You're not a mystery—you're the bad guy in his story.",
      endingLearnReference: 'clean-exit-101',
      endingLearnPrompt: 'Learn why clean exits matter.',
    },

    // ============================================
    // PATH B: THE CLIFF DROP
    // When they won't let go
    // ============================================
    {
      id: 'cliff-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Derek.' Victoria's face hardens. 'The one who texts forty times a day?' 'I've tried ending it THREE times, Vic. He just... won't accept it. Cries. Makes promises. Shows up with flowers.'",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "'And you keep letting him back in.' 'I feel guilty! He gets so upset.' 'That's the trap. His emotions become your responsibility.'",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "His tears work because you let them.",
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
          text: '"Maybe if I explain better he\'ll understand."',
          nextSceneId: 'cliff-2-jade',
          feedback: "Explaining more won't work. He heard you. He's choosing not to accept it.",
        },
      ],
    },
    {
      id: 'cliff-2-jade',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Honey. You've explained. Multiple times. He HEARD you. He's just choosing not to accept it because your no hasn't had consequences yet.' She leans forward.",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          text: "'Stop JADEing. Justify, Argue, Defend, Explain. Every time you do that, you signal that your no is negotiable. It's not a debate. It's a statement.'",
          speakerId: 'victoria',
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
          text: "'Here's how you make it stick. One clear statement. No explanations. No reasons. Just: \"This is over. Please don't contact me.\" Then—this is crucial—you BLOCK him. Everywhere.'",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "'But what if—' 'No. You've given him three chances to accept it gracefully. He didn't. Now you protect yourself. His feelings are no longer your problem.'",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          speakerId: 'inner',
          text: "No is a complete sentence.",
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
          text: "'In person with a clinger? Absolutely not. He'll cry. He'll beg. He'll make it a three-hour negotiation. Text or call. Brief. Then block.' She pauses.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "'Actually, call. It's harder to screenshot and share a call. He seems like the type who'd show your text to everyone trying to get sympathy.'",
          speakerId: 'victoria',
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
          text: "You call Derek. He picks up immediately. 'Baby! I was just thinking about you. I got us tickets to that show you mentioned—' 'Derek. I need you to listen.'",
          speakerId: 'derek',
          emotion: 'happy',
        },
        {
          text: "His voice shifts. 'What's wrong? Whatever it is, we can work through it. I love you.' Here we go.",
        },
        {
          speakerId: 'inner',
          text: "One statement. No JADE. No negotiation.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'cliff-3a',
          text: '"This relationship is over. Please don\'t contact me again."',
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
          speakerId: 'derek',
          emotion: 'sad',
        },
        {
          text: "He didn't hear an ending. He heard a pause. You've just extended the cycle.",
        },
        {
          speakerId: 'inner',
          text: "Be clear or be stuck.",
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
          text: "'WHAT? Over? Baby, no. Whatever I did, I can fix it. Just tell me what's wrong. Don't do this to us.' His voice is cracking. The guilt hits. But you remember: his emotions aren't your responsibility.",
          speakerId: 'derek',
          emotion: 'sad',
        },
        {
          text: "'I just... I can't live without you. Please. PLEASE.'",
          speakerId: 'derek',
          emotion: 'pleading',
        },
        {
          speakerId: 'inner',
          text: "This is manipulation. Stay strong.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'cliff-4a',
          text: '"I wish you well, Derek. Goodbye." (Hang up. Block.)',
          nextSceneId: 'cliff-5-block',
          isOptimal: true,
          xpBonus: 25,
          feedback: 'Clean exit. No negotiation. Well done.',
        },
        {
          id: 'cliff-4b',
          text: 'Start explaining why you\'re leaving.',
          nextSceneId: 'cliff-5-jade-trap',
          feedback: 'Every explanation is a thread he pulls.',
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
          text: "'I just feel like you're too clingy, and I need independence, and—' 'Clingy? I'll give you space! How much space? I can change! Just tell me what you need.'",
          speakerId: 'derek',
          emotion: 'pleading',
        },
        {
          text: "Every reason you give becomes a promise he makes. Every complaint becomes a negotiation. You're back in the trap.",
        },
        {
          speakerId: 'inner',
          text: "Stop explaining. End the call.",
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
          text: 'Keep explaining, hoping he\'ll finally understand.',
          nextSceneId: 'cliff-neutral-ending',
          feedback: 'You JADE\'d. The exit drags on for weeks.',
        },
      ],
    },
    {
      id: 'cliff-5-block',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You hang up. Then: block on phone. Block on Instagram. Block on everything. Victoria texts: 'Did you do it?' 'Done. Blocked everywhere.' 'Proud of you. Now the hard part.'",
          speakerId: 'victoria',
          emotion: 'happy',
        },
        {
          text: "'The hard part?' 'Not unblocking him when you feel guilty. He'll find ways to reach out. Stay strong.'",
          speakerId: 'victoria',
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
          text: "Three days later. Email notification: 'I don't understand why you're doing this. I deserve an explanation. You owe me that much. Please unblock me. I just want to talk.'",
          speakerId: 'derek',
          emotion: 'sad',
        },
        {
          text: "He found a channel you forgot to block. The pull to respond. To explain. To give him 'closure.'",
        },
        {
          speakerId: 'inner',
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
          feedback: "Closure is a gift. He didn't earn it.",
        },
        {
          id: 'cliff-6b',
          text: 'Send one final explanation email.',
          nextSceneId: 'cliff-neutral-ending',
          feedback: 'You gave him another thread. The cycle extends.',
        },
      ],
    },
    // CLIFF ENDINGS
    {
      id: 'cliff-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Two months later. No contact. He tried a few more channels—LinkedIn message, text from a new number—but you never responded. Eventually, he stopped.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "'See?' Victoria says over coffee. 'He didn't die. He didn't fall apart. He just found someone else to obsess over. Your silence taught him what your words couldn't: no means no.'",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Clean Break',
      endingSummary: 'No JADE. No negotiations. Silence was the only explanation he respected.',
    },
    {
      id: 'cliff-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "It took three more weeks of back-and-forth before he finally accepted it. Three weeks of explanations, negotiations, promises, and tears.",
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
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. You're still with Derek. Every few weeks you try to leave. Every time, he cries, promises to change, shows up with flowers. And you cave.",
        },
        {
          text: "The exit that was supposed to take one day has taken... no days. You're still there. Trapped by guilt and his tears.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Guilt Trap',
      endingSummary: "His emotions became your responsibility. You couldn't hold the line.",
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
          text: "'MARCUS?' Victoria nearly spits her wine. 'The one who disappeared for three months? Just... vanished?' 'Yep. Radio silence. I thought he was dead. Then last night—' You show her your phone.",
          speakerId: 'victoria',
          emotion: 'angry',
        },
        {
          text: "'Hey stranger. Been thinking about you. I know I handled things badly. Can we talk?' The audacity. Victoria's eyes narrow.",
          speakerId: 'marcus',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Three months of nothing. Now he wants to 'talk.'",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'zombie-1a',
          text: '"Part of me wants to hear what he has to say..."',
          nextSceneId: 'zombie-2-curious',
          feedback: "Curiosity is natural. But don't let it trap you.",
        },
        {
          id: 'zombie-1b',
          text: '"I want to tell him exactly what I think of him."',
          nextSceneId: 'zombie-2-angry',
          feedback: 'Anger is valid. But giving him a reaction is still giving him something.',
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
          text: "'Hear what he has to say?' Victoria looks at you like you've lost your mind. 'He ghosted you. Disappeared. Let you wonder if he was alive or dead. What could he possibly say that matters?'",
          speakerId: 'victoria',
          emotion: 'concerned',
        },
        {
          text: "'Any explanation he gives now is just... words. He's had three months to reach out. He's reaching out now because something else didn't work out. You're the fallback.'",
          speakerId: 'victoria',
          emotion: 'cold',
        },
        {
          speakerId: 'inner',
          text: "Fallback. Not first choice.",
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
          text: "'Tell him off?' Victoria shrugs. 'You could. Get it all out. But think about it: you'd be giving him an hour of your emotional energy. For what? So he knows you're upset?'",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          text: "'He already knows. He KNOWS he ghosted you. He knows it was wrong. An angry response just tells him you still care enough to be angry. Silence says something different.'",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
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
          text: "Victoria nods approvingly. 'Smart. He gets nothing. No anger. No explanation. No closure. Just... silence. Let him wonder if you even got the message.'",
          speakerId: 'victoria',
          emotion: 'happy',
        },
        {
          text: "'But—' she holds up a finger '—the challenge is when he tries again. Because he will. Once won't be enough. The real test is staying silent when he escalates.'",
          speakerId: 'victoria',
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
          text: "You stare at his message. Three months of silence. Now this. 'Hey stranger. Been thinking about you. I know I handled things badly. Can we talk?'",
          speakerId: 'marcus',
          emotion: 'seductive',
        },
        {
          text: "What he wants: a response. Any response. Your attention. Your energy.",
        },
        {
          speakerId: 'inner',
          text: "What do YOU want?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'zombie-3a',
          text: "Don't respond. At all. Let him wonder.",
          nextSceneId: 'zombie-4-silence',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Silence is closure enough.',
        },
        {
          id: 'zombie-3b',
          text: '"I deserve an explanation. Meet me for coffee."',
          nextSceneId: 'zombie-4-meet',
          feedback: 'You\'re giving him what he wants: access to you.',
        },
        {
          id: 'zombie-3c',
          text: 'Send an angry message telling him exactly what you think.',
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
          text: "'Three months? THREE MONTHS of nothing and now you want to TALK? You ghosted me. You disappeared. You let me think you were dead. And now you waltz back like nothing happened?'",
        },
        {
          text: "Marcus responds within minutes. 'I know. I messed up. I was going through things. Can I explain in person? Please? I miss you.' He got what he wanted: your engagement.",
          speakerId: 'marcus',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "You're back in a conversation with someone who ghosted you.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'zombie-4aa',
          text: 'Stop responding now. Damage done, but don\'t make it worse.',
          nextSceneId: 'zombie-neutral-ending',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Course correction. Close the door.',
        },
        {
          id: 'zombie-4ab',
          text: '"Fine. Coffee. But you better have a good explanation."',
          nextSceneId: 'zombie-4-meet',
          feedback: 'You\'re meeting the person who abandoned you. Think about that.',
        },
      ],
    },
    {
      id: 'zombie-4-meet',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Coffee shop. He looks good. Confident. 'Thanks for meeting me. I know I don't deserve it.' He launches into an explanation: depression, family stuff, fear of commitment. It sounds reasonable. Almost.",
          speakerId: 'marcus',
          emotion: 'sad',
        },
        {
          text: "'I know it's not an excuse. But I want to try again. Properly this time. I've learned from my mistakes.' He reaches for your hand.",
          speakerId: 'marcus',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Words are cheap. Three months of silence spoke louder.",
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
          feedback: 'Heard him out. Still said no. Strength.',
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
          text: "His face falls. 'Just... think about it? I've changed.' 'I believe you believe that. But I can't risk it. Good luck, Marcus.' You leave money for your coffee and walk out.",
          speakerId: 'marcus',
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
          speakerId: 'marcus',
          emotion: 'sad',
        },
        {
          text: "Day three: 'I miss you. I think about you all the time. I made a mistake. A huge one.' Still nothing from you.",
          speakerId: 'marcus',
          emotion: 'pleading',
        },
        {
          speakerId: 'inner',
          text: "Let him wonder. Like you wondered for three months.",
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
          text: "Week two. He's tried calling. Texting. Instagram DM. Email. 'Please just tell me you're okay. I need to know you're alive.' The irony.",
          speakerId: 'marcus',
          emotion: 'pleading',
        },
        {
          text: "Victoria texts: 'How's operation radio silence?' 'He's losing his mind.' 'Good. Now he knows how you felt.'",
          speakerId: 'victoria',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner',
          text: "The urge to respond. Stay strong.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'zombie-5a',
          text: 'Continue the silence. He\'ll stop eventually.',
          nextSceneId: 'zombie-good-ending',
          isOptimal: true,
          xpBonus: 25,
          feedback: 'He disappeared for three months. You can disappear permanently.',
        },
        {
          id: 'zombie-5b',
          text: 'Send one message: "We\'re done. Stop contacting me."',
          nextSceneId: 'zombie-neutral-ending',
          feedback: 'Closure is a gift. He didn\'t earn it.',
        },
      ],
    },
    // ZOMBIE ENDINGS
    {
      id: 'zombie-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "A month passes. His messages slow, then stop. He finds someone else to pursue. You never gave him the satisfaction of a response.",
          speakerId: 'victoria',
          emotion: 'neutral',
        },
        {
          text: "'Perfect.' Victoria raises her glass. 'He ghosted you. You ghosted him back. But here's the difference: you're not coming back. You're moving forward. He's just... haunted.'",
          speakerId: 'victoria',
          emotion: 'happy',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Reversal',
      endingSummary: 'He ghosted you. You ghosted him back. But you\'re not coming back. You\'re moving forward.',
    },
    {
      id: 'zombie-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You engaged more than you needed to. Gave him attention—anger or explanation or time. He got some of what he wanted, even if you ultimately said no.",
        },
        {
          text: "You're free of him now. But he got to tell himself a story: 'We talked. She heard me out. It didn't work, but at least I tried.' You gave him that.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Response',
      endingSummary: 'You engaged when you didn\'t need to. He got some closure. You didn\'t owe him that.',
      endingLearnReference: 'zombie-101',
      endingLearnPrompt: 'Learn why zombies don\'t deserve responses.',
    },
    {
      id: 'zombie-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three months later. You and Marcus are back together. It's good—for a while. Then he starts getting distant again. The texts slow. The excuses start. You've seen this before.",
        },
        {
          text: "He ghosts you again. Of course he does. You taught him that ghosting has no consequences. That he can always come back. Patterns only change when you stop rewarding them.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'History Repeats',
      endingSummary: 'You rewarded his disappearance with another chance. He disappeared again. You taught him he could.',
      endingLearnReference: 'zombie-101',
      endingLearnPrompt: 'Learn why taking back a ghoster enables the pattern.',
    },
  ],
};
