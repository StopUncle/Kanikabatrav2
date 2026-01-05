// Scenario: The Love Bomb (v3 - Enhanced)
// 3 completely different love bombing archetypes based on first choice
// Path A: The Wounded Soul (Vulnerable Narcissist)
// Path B: The Dream Builder (Communal Narcissist)
// Path C: The Grand Romantic (Classic Grandiose)

import type { Scenario } from '../types';

export const narcissistTrapScenario: Scenario = {
  id: 'narcissist-trap',
  title: 'The Love Bomb',
  tagline: 'Too good to be true?',
  description:
    "First date with someone magnetic. Three conversations, three very different traps. Your gut knows something your heart doesn't want to hear.",
  tier: 'free',
  estimatedMinutes: 12,
  difficulty: 'beginner',
  category: 'narcissist',
  xpReward: 120,
  badgeId: 'love-bomb-survivor',

  templates: {
    manipulator: ['Alex', 'Jordan', 'Marcus', 'Tyler', 'Cameron'],
    friend: ['Maya', 'Cate', 'Sarah', 'Lisa', 'Rachel'],
    destination: ['Paris', 'Santorini', 'Bali', 'Barcelona', 'Tokyo'],
  },

  tacticsLearned: [
    'Love bombing recognition',
    'Trauma bonding awareness',
    'Future faking detection',
    'Obligation trap identification',
    'Pace control in dating',
  ],
  redFlagsTaught: [
    'Excessive early vulnerability (manufactured intimacy)',
    'Shared vision fantasy (communal manipulation)',
    'Lavish gifts before trust (obligation creation)',
    'Rapid exclusivity demands',
    'Isolation from support systems',
  ],

  characters: [
    {
      id: 'alex',
      name: 'Alex',
      description: 'Charming, intense, and very interested. The mask is perfect.',
      traits: ['narcissist', 'love-bomber'],
      defaultEmotion: 'seductive',
    },
    {
      id: 'friend',
      name: 'Maya',
      description: 'Your best friend. Sees what you sometimes refuse to see.',
      traits: ['supportive', 'observant'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner',
      name: 'Your Gut',
      description: 'The quiet voice that notices before your mind catches up.',
      traits: ['intuitive'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'opening',

  scenes: [
    // ========================================
    // OPENING SCENE - THE FORK
    // ========================================
    {
      id: 'opening',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "First date. {manipulator} arrived early, already holding your drink order. 'I remembered from your profile - oat latte, right?' Their smile is warm. Their eye contact doesn't break. Your stomach flutters.",
        },
        {
          text: "'I'm so glad we're finally doing this. I feel like I already know you.' They lean forward, giving you their complete attention. The cafe fades. There's just you and them.",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "That flutter. Is it excitement... or something else?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-wounded',
          text: '"So tell me about yourself. The real stuff."',
          nextSceneId: 'wounded-1',
          xpBonus: 0,
          feedback: "You've invited vulnerability. Watch what they do with that invitation.",
        },
        {
          id: 'fork-dreamer',
          text: '"Where do you see yourself in five years?"',
          nextSceneId: 'dreamer-1',
          xpBonus: 0,
          feedback: "You've asked about the future. Some people answer. Others sell you one.",
        },
        {
          id: 'fork-romantic',
          text: '"Nice place. Come here often?"',
          nextSceneId: 'romantic-1',
          xpBonus: 0,
          feedback: "Small talk. Safe. Now watch how they escalate.",
        },
      ],
    },

    // ========================================
    // PATH A: THE WOUNDED SOUL
    // Vulnerable Narcissist - Trauma Bonding
    // ========================================
    {
      id: 'wounded-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator}'s expression shifts. Something softer. More vulnerable. 'The real stuff? God, nobody ever asks that.' A pause. Their eyes glisten slightly.",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          text: "'I... okay. I'm going to be honest with you. My last relationship really messed me up. She was emotionally abusive. I'm still healing.' They look down at their hands. 'Sorry. That was a lot for a first date.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "Deep confession, first fifteen minutes. Interesting timing.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'wounded-1a',
          text: '"I\'m so sorry. I want to help you heal from that."',
          nextSceneId: 'wounded-2-hooked',
          feedback: "You've volunteered as their healer. That's not a date - that's a job interview for caretaker.",
        },
        {
          id: 'wounded-1b',
          text: '"That sounds hard. Everyone carries something."',
          nextSceneId: 'wounded-2-balanced',
          xpBonus: 15,
          isOptimal: true,
          feedback: "Acknowledgment without absorption. You normalized pain without volunteering to fix it.",
        },
        {
          id: 'wounded-1c',
          text: '"We all have baggage. What else makes you... you?"',
          nextSceneId: 'wounded-2-redirect',
          xpBonus: 10,
          feedback: "Gentle redirect. You're testing if they have an identity beyond their wounds.",
        },
      ],
    },
    {
      id: 'wounded-2-hooked',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator}'s eyes light up. 'You... you actually care. Nobody's ever said that to me.' They reach across the table, touching your hand. 'I knew there was something different about you. I could feel it.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          text: "'Most people run when I open up. But you stayed. You listened.' Their grip tightens slightly. 'You're the first person who's really seen me.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "First person? First date. Something doesn't add up.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'wounded-2a-deep',
          text: '"I just want to understand you. Tell me more."',
          nextSceneId: 'wounded-3-savior',
          feedback: "You're now their emotional support on date one. The foundation is already skewed.",
        },
        {
          id: 'wounded-2a-pause',
          text: '"We just met. Let\'s slow down a bit."',
          nextSceneId: 'wounded-3-test',
          xpBonus: 20,
          isOptimal: true,
          feedback: "Boundary. Now watch how they handle it.",
        },
      ],
    },
    {
      id: 'wounded-2-balanced',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} tilts their head. A flicker of... something. Then the warmth returns. 'You're right. Everyone does carry something. But with you, I feel like I can put mine down.'",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          text: "'My therapist says I need to open up more. Stop protecting myself. And here you are, making that so easy.' They smile. 'Maybe the universe sent you at exactly the right time.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Universe timing. Therapy reference. Pressure hidden inside flattery.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'wounded-2b-flattered',
          text: '"That\'s sweet. I\'m glad you feel comfortable."',
          nextSceneId: 'wounded-3-slow',
          xpBonus: 5,
          feedback: "You accepted the compliment without escalating. Still, their pace is setting the rhythm.",
        },
        {
          id: 'wounded-2b-reality',
          text: '"Let\'s see if the feeling lasts past coffee."',
          nextSceneId: 'wounded-3-reality',
          xpBonus: 20,
          isOptimal: true,
          feedback: "Grounded. You reminded both of you that connection takes time.",
        },
      ],
    },
    {
      id: 'wounded-2-redirect',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} pauses. Their smile tightens almost imperceptibly. 'What else makes me... me?' They seem thrown. Like the script just got interrupted.",
          speakerId: 'alex',
          emotion: 'confused',
        },
        {
          text: "'I mean, I work in marketing. I like hiking, I guess. But honestly? My ex really defined so much of who I was. I'm still figuring out who I am without her.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "Every answer circles back to the wound. Identity or strategy?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'wounded-2c-sympathy',
          text: '"That takes courage to admit. I\'m here."',
          nextSceneId: 'wounded-3-savior',
          feedback: "You've reopened the door to the wound. They'll walk through it.",
        },
        {
          id: 'wounded-2c-note',
          text: 'Notice the pattern. Keep asking about the present.',
          nextSceneId: 'wounded-3-observe',
          xpBonus: 25,
          isOptimal: true,
          feedback: "You're testing if they exist outside their narrative. Important data.",
        },
      ],
    },
    {
      id: 'wounded-3-savior',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Date two. You picked a quiet restaurant. {manipulator} arrives with tired eyes. 'Rough week. My mom and I got into it again. She's so toxic.' They reach for your hand. 'But just seeing you makes it better.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          text: "'You're my safe place. The only person who really gets me.' Your phone buzzes. {friend}: 'How's the date?' You realize you haven't told your friends much about {manipulator} yet. It feels... private. Special.",
        },
        {
          speakerId: 'inner',
          text: "Why does 'special' feel like a secret?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'wounded-3a-absorb',
          text: '"Tell me everything. I\'m here for you."',
          nextSceneId: 'wounded-4-trapped',
          feedback: "You're now their emotional container. When did dating become therapy?",
        },
        {
          id: 'wounded-3a-share',
          text: '"That sounds hard. Hey, I should introduce you to my friends soon."',
          nextSceneId: 'wounded-4-test',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You've opened a window to your actual life. Watch their reaction.",
        },
      ],
    },
    {
      id: 'wounded-3-test',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} blinks. 'Slow down?' Their grip loosens. The warmth cools. 'I thought... I thought we were connecting. Was I reading this wrong?'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          text: "'I'm sorry. I just felt so safe with you. I don't open up like this with anyone.' They look away. 'Maybe I shared too much. I always do this. I always mess things up.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "You set a boundary. Now they're the victim of your boundary.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'wounded-3b-reassure',
          text: '"No, no, you didn\'t mess up! I still like you."',
          nextSceneId: 'wounded-4-trapped',
          feedback: "You abandoned your boundary to comfort their discomfort. They learned: push back = results.",
        },
        {
          id: 'wounded-3b-hold',
          text: '"You didn\'t mess up. I just like getting to know people gradually."',
          nextSceneId: 'wounded-4-test',
          xpBonus: 25,
          isOptimal: true,
          feedback: "You reassured without retreating. That's maturity.",
        },
      ],
    },
    {
      id: 'wounded-3-slow',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The date continues pleasantly. {manipulator} shares more - childhood stories, dreams, fears. Each story has a wound at its center. Each wound has a villain.",
        },
        {
          text: "'My last boss was a narcissist. My ex was emotionally unavailable. My dad was never there.' They sigh. 'I keep attracting the wrong people. Until now.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "Everyone in their life is a villain. You're the hero. Convenient casting.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'wounded-4-slow',
    },
    {
      id: 'wounded-3-reality',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} laughs, but it's slightly forced. 'Fair enough. I like that you're not swept away. Most people just... ' They trail off.",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          text: "'Most people fall for the intensity?' They nod. 'Yeah. I come on strong. I know that about myself. It's a defense mechanism, I think. If I give you everything upfront, you can't hurt me later.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "Self-awareness or another script? Time will tell.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'wounded-4-slow',
    },
    {
      id: 'wounded-3-observe',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You keep asking about the present. Hobbies. Friends. Work. Each answer is thin. 'I used to love painting, but after Sarah left, I couldn't even look at a canvas.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          text: "Every road leads back to the wound. It's the center of their universe. The sun everything orbits. You're being invited to orbit too.",
        },
        {
          speakerId: 'inner',
          text: "They have a wound, not an identity. What happens when the wound heals?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'wounded-3d-stay',
          text: '"I\'d love to see you paint someday."',
          nextSceneId: 'wounded-4-slow',
          xpBonus: 5,
          feedback: "You've offered hope without becoming responsible for their healing. Balanced.",
        },
        {
          id: 'wounded-3d-out',
          text: '"I think you might still need to heal before you date."',
          nextSceneId: 'wounded-good-ending',
          xpBonus: 25,
          isOptimal: true,
          feedback: "Hard truth. Not cruel - honest. Some people aren't ready, and that's okay.",
        },
      ],
    },
    {
      id: 'wounded-4-trapped',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Week three. You've become {manipulator}'s primary support. They call when upset. Text when anxious. You feel needed. Important. Exhausted.",
        },
        {
          text: "'I don't know what I'd do without you. You're literally saving my life.' They curl into you on their couch. 'Everyone else has abandoned me. But not you. You're different.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          text: "Your phone has 12 unread messages from {friend}. You've cancelled twice this week.",
        },
        {
          speakerId: 'inner',
          text: "When did 'dating' become 'rescuing'?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'wounded-4a-stay',
          text: 'They need you. Stay.',
          nextSceneId: 'wounded-bad-ending',
          feedback: "You've chosen their needs over your life. This isn't love - it's a hostage situation.",
        },
        {
          id: 'wounded-4a-see',
          text: '"I care about you, but I need to see my friends too."',
          nextSceneId: 'wounded-5-test',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You've remembered you exist. Now watch how they handle that.",
        },
      ],
    },
    {
      id: 'wounded-4-test',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Your friends?' {manipulator}'s face shifts. 'I... yeah, sure. I just thought what we had was special. Private. I'm not great with groups.'",
          speakerId: 'alex',
          emotion: 'concerned',
        },
        {
          text: "'You know how people are. They'll judge. They won't understand us.' Their hand squeezes yours. 'But if that's what you want... I guess I can try.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "Resistance to your world. Preference for isolation. Note taken.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'wounded-4b-defer',
          text: '"Okay, we can wait. No pressure."',
          nextSceneId: 'wounded-5-isolation',
          feedback: "You just let them veto your social life. How much more will you give up?",
        },
        {
          id: 'wounded-4b-insist',
          text: '"Just coffee with Maya. Low stakes. I\'d really like that."',
          nextSceneId: 'wounded-5-push',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You held your ground gently. Healthy relationships include other people.",
        },
      ],
    },
    {
      id: 'wounded-4-slow',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Next morning. Your phone lights up. {manipulator}: 'Last night was incredible. I've never felt so understood.' Then: 'I know it's crazy but I cancelled all my other dates. You're the only one I want to talk to.'",
        },
        {
          text: "Another text: 'I deleted the app. I don't need it anymore. Did you delete yours?'",
        },
        {
          speakerId: 'inner',
          text: "One date. Deleted apps. Cancelled competition. That's not devotion. That's pressure.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'wounded-4c-match',
          text: 'Delete your apps too. Show them you\'re serious.',
          nextSceneId: 'wounded-5-isolation',
          feedback: "You just abandoned your options for someone you've known 72 hours.",
        },
        {
          id: 'wounded-4c-keep',
          text: '"I like you. But I don\'t delete apps until we\'ve talked about exclusivity."',
          nextSceneId: 'wounded-5-push',
          xpBonus: 20,
          isOptimal: true,
          feedback: "Commitment requires a conversation, not a demand. You know this.",
        },
      ],
    },
    {
      id: 'wounded-5-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "{manipulator}'s face hardens. 'Your friends. Right.' They stand up, arms crossed. 'Fine. Go. I'll just be here. Alone. Again.'",
          speakerId: 'alex',
          emotion: 'cold',
        },
        {
          text: "'I thought you were different. I thought you actually cared. But you're just like everyone else. You'll leave when I need you most.'",
          speakerId: 'alex',
          emotion: 'angry',
        },
        {
          speakerId: 'inner',
          text: "You asked for one evening with friends. This is the response.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'wounded-5a-cave',
          text: '"I\'m sorry. I\'ll stay. I didn\'t mean to upset you."',
          nextSceneId: 'wounded-bad-ending',
          feedback: "You just apologized for having a life. The cage door clicked shut.",
        },
        {
          id: 'wounded-5a-leave',
          text: '"I\'ll call you tomorrow. But I\'m seeing my friends tonight."',
          nextSceneId: 'wounded-neutral-ending',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You held your boundary. Their reaction told you everything.",
        },
      ],
    },
    {
      id: 'wounded-5-isolation',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Week four. You've seen {manipulator} every day. Your friends have given up texting. Work feels like an interruption. You're tired all the time.",
        },
        {
          text: "'What would I do without you?' {manipulator} asks, not for the first time. 'You're the only good thing in my life. Promise you'll never leave.'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "You're not a partner. You're a life support system.",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'wounded-bad-ending',
    },
    {
      id: 'wounded-5-push',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Your phone buzzes. {manipulator}: 'I thought about what you said. You're right. I've been moving too fast.' A pause. 'I just get scared of losing good things.'",
        },
        {
          text: "'I'll try to slow down. But it's hard. You make me feel things I haven't felt in years.'",
        },
        {
          speakerId: 'inner',
          text: "Words of growth. Do the actions follow? Only time tells.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'wounded-neutral-ending',
    },

    // Wounded Soul Endings
    {
      id: 'wounded-good-ending',
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Clear Eyes',
      endingSummary: "You recognized the pattern early. Their wounds were real, but healing them wasn't your job. Walking away was an act of clarity, not cruelty.",
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You tell {manipulator} gently but clearly: you're not ready to be someone's anchor. They need to do their own work first.",
        },
        {
          text: "{friend} texts: 'Proud of you. That wasn't easy.' It wasn't. But it was right. Some people need healers. You're looking for a partner.",
        },
      ],
    },
    {
      id: 'wounded-neutral-ending',
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Late Exit',
      endingSummary: "You saw the pattern, but you stayed longer than you should have. You got out - but not before some damage was done. Trust your instincts faster next time.",
      endingLearnReference: 'trauma-bonding-101',
      endingLearnPrompt: 'Want to understand trauma bonding better?',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "It ended after two months. Not dramatically - you just stopped having the energy to be their everything. The exhaustion was real. The guilt was worse.",
        },
        {
          text: "'I gave everything to them,' you tell {friend}. 'Why do I feel like the bad guy?' 'Because they needed you to feel that way. That was the design.'",
        },
      ],
    },
    {
      id: 'wounded-bad-ending',
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Caretaker',
      endingSummary: "You became their therapist, their anchor, their everything. Dating became caregiving. Your needs disappeared. You learned that healing someone else's wounds cannot fill your own.",
      endingLearnReference: 'trauma-bonding-101',
      endingLearnPrompt: 'Learn to recognize trauma bonding patterns.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months. You don't remember the last time you saw your friends. Your world is {manipulator}'s crisis of the week. Their healing. Their needs.",
        },
        {
          text: "You're exhausted but you can't leave. What would happen to them? 'That's not love,' {friend}'s last message said. 'That's a trap.' You haven't replied. You don't know how.",
        },
      ],
    },

    // ========================================
    // PATH B: THE DREAM BUILDER
    // Communal Narcissist - Shared Vision Trap
    // ========================================
    {
      id: 'dreamer-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator}'s eyes light up. 'Five years? I love that question. Most people are so short-sighted.' They lean forward, energy crackling. 'I'm building something. Something big.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          text: "'I'm launching a company. Wellness tech. Revolutionary stuff. The market's wide open. I just need the right people around me.' Their eyes lock on yours. 'People with vision.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Big words. First date. What's the ask?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dreamer-1a',
          text: '"That sounds amazing! Tell me more about the plan."',
          nextSceneId: 'dreamer-2-hooked',
          feedback: "You've entered the vision. Now you're part of the sales pitch.",
        },
        {
          id: 'dreamer-1b',
          text: '"Cool. What have you built so far?"',
          nextSceneId: 'dreamer-2-grounded',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You asked for receipts. Dreamers hate receipts.",
        },
        {
          id: 'dreamer-1c',
          text: '"Interesting. What\'s your background in wellness tech?"',
          nextSceneId: 'dreamer-2-skeptic',
          xpBonus: 15,
          feedback: "Good question. Expertise versus enthusiasm tells you a lot.",
        },
      ],
    },
    {
      id: 'dreamer-2-hooked',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'Picture this.' {manipulator}'s hands move as they talk. 'An app that tracks emotional wellness. AI-driven. Personalized. The Calm app meets ChatGPT. We're talking billion-dollar valuation.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          text: "'I've been looking for someone like you. Someone who gets it. Someone to build this with.' They grab your hand. 'Partners. Not just in business. In everything.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Date one. Partnership offer. The fantasy is seductive. But what are they actually offering?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'dreamer-2a-in',
          text: '"I\'d love to be part of something bigger than myself."',
          nextSceneId: 'dreamer-3-trapped',
          feedback: "You've signed up for a role in their movie before knowing the script.",
        },
        {
          id: 'dreamer-2a-pause',
          text: '"What exactly would you need from me?"',
          nextSceneId: 'dreamer-3-test',
          xpBonus: 20,
          isOptimal: true,
          feedback: "The right question. Vague promises don't survive specific asks.",
        },
      ],
    },
    {
      id: 'dreamer-2-grounded',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} pauses. The momentum stalls. 'Built so far? I mean, we're in stealth mode. Early stages. The idea is solid. The execution is coming.'",
          speakerId: 'alex',
          emotion: 'confused',
        },
        {
          text: "'But that's the point - I'm looking for co-founders. People who can help turn vision into reality.' They recover. 'Not everyone can see what I see. But I knew you would.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Stealth mode. Early stages. Translation: nothing exists yet.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dreamer-2b-believe',
          text: '"I believe in you. What\'s the next step?"',
          nextSceneId: 'dreamer-3-trapped',
          feedback: "You just invested belief in someone with zero track record. Belief is capital. Spend it wisely.",
        },
        {
          id: 'dreamer-2b-wait',
          text: '"Let me know when there\'s something to see. I\'m interested."',
          nextSceneId: 'dreamer-3-distance',
          xpBonus: 25,
          isOptimal: true,
          feedback: "Interest without commitment. You can appreciate vision without funding it.",
        },
      ],
    },
    {
      id: 'dreamer-2-skeptic',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'Background?' {manipulator} waves dismissively. 'I mean, I've researched extensively. Read all the books. I know the space.' They shift slightly.",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          text: "'Traditional credentials are overrated anyway. The best founders are outsiders. Disruptors. People who see what the experts miss.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          speakerId: 'inner',
          text: "No credentials, reframed as strength. Common in dreamers. And grifters.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dreamer-2c-accept',
          text: '"You\'re right. Passion matters more than pedigree."',
          nextSceneId: 'dreamer-3-trapped',
          feedback: "You just validated skipping the work. Passion without preparation is just enthusiasm.",
        },
        {
          id: 'dreamer-2c-observe',
          text: 'Nod. Note the deflection. Keep listening.',
          nextSceneId: 'dreamer-3-observe',
          xpBonus: 20,
          isOptimal: true,
          feedback: "Data collection. You're learning who they are, not who they claim to be.",
        },
      ],
    },
    {
      id: 'dreamer-3-trapped',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Date three. Dinner at a nice restaurant. {manipulator}'s treat. 'This is what our life will look like. Success. Luxury. Together.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          text: "'I've been thinking. The app needs a content strategy. Your social media skills would be perfect. We could start small - just a few hours a week. Build from there.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "The ask arrives. Dressed as opportunity. But who benefits?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'dreamer-3a-yes',
          text: '"I\'d love to help. Let\'s do it."',
          nextSceneId: 'dreamer-4-used',
          feedback: "Free labor for someone else's dream. How much more will you give?",
        },
        {
          id: 'dreamer-3a-terms',
          text: '"What\'s the compensation structure for collaborators?"',
          nextSceneId: 'dreamer-4-pushback',
          xpBonus: 25,
          isOptimal: true,
          feedback: "You asked what your time is worth. Watch them scramble.",
        },
      ],
    },
    {
      id: 'dreamer-3-test',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'What would I need from you?' {manipulator} smiles. 'Your energy. Your skills. Your belief in the mission. We'd be partners. Equity. Once we launch.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          text: "'Right now, I just need people who can see the vision. Who can help without needing everything spelled out. That's rare.'",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "Equity 'once we launch.' Work now, pay later. A familiar song.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dreamer-3b-work',
          text: '"I can help with ideas. No commitment yet."',
          nextSceneId: 'dreamer-4-slow',
          xpBonus: 10,
          feedback: "Ideas are free. You've given nothing away. Smart.",
        },
        {
          id: 'dreamer-3b-out',
          text: '"I don\'t do equity-for-labor deals. But good luck!"',
          nextSceneId: 'dreamer-good-ending',
          xpBonus: 25,
          isOptimal: true,
          feedback: "Clean exit. Your time has value. You know it.",
        },
      ],
    },
    {
      id: 'dreamer-3-distance',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "{manipulator}'s texts shift. Less about 'us', more about 'the opportunity.' 'I met with investors. They're excited. This is happening with or without you.'",
        },
        {
          text: "'I thought you believed in this. In me. I guess I was wrong about you.'",
        },
        {
          speakerId: 'inner',
          text: "Pressure dressed as disappointment. Classic.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dreamer-3c-guilt',
          text: '"Wait, I didn\'t say no. Let\'s talk more."',
          nextSceneId: 'dreamer-4-slow',
          feedback: "You caved to guilt. They noticed. They'll use it again.",
        },
        {
          id: 'dreamer-3c-hold',
          text: '"Best of luck. Let me know when there\'s a product."',
          nextSceneId: 'dreamer-good-ending',
          xpBonus: 20,
          isOptimal: true,
          feedback: "Unmoved by pressure. This is how you protect your resources.",
        },
      ],
    },
    {
      id: 'dreamer-3-observe',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The date continues. {manipulator} paints ever-grander visions. Offices in three cities. Team of fifty. Media features.",
        },
        {
          text: "You ask about their current job. 'I left that. Had to go all-in on this. Risk everything. That's what visionaries do.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          speakerId: 'inner',
          text: "No income. All vision. Living on what, exactly?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'dreamer-3d-inspire',
          text: '"That\'s brave. I admire the commitment."',
          nextSceneId: 'dreamer-4-slow',
          feedback: "Admiration without investment. Safe enough.",
        },
        {
          id: 'dreamer-3d-practical',
          text: '"How are you funding life while you build?"',
          nextSceneId: 'dreamer-4-reveal',
          xpBonus: 20,
          isOptimal: true,
          feedback: "The practical question. Fantasy dissolves under practicality.",
        },
      ],
    },
    {
      id: 'dreamer-4-used',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Week three. You've spent 15 hours on 'the project.' Social posts, research, outreach. {manipulator} is always 'in meetings' when you have questions.",
        },
        {
          text: "'You're doing amazing work. This is going to change everything.' A kiss on the forehead. 'I couldn't do this without you.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          speakerId: 'inner',
          text: "You're the labor. They're the vision. Where's the partnership?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'dreamer-4a-more',
          text: 'Keep going. This is going to pay off.',
          nextSceneId: 'dreamer-bad-ending',
          feedback: "Hope is not a business plan. You're working for free and calling it investment.",
        },
        {
          id: 'dreamer-4a-stop',
          text: '"I need clarity on roles and compensation before I continue."',
          nextSceneId: 'dreamer-5-confrontation',
          xpBonus: 20,
          isOptimal: true,
          feedback: "Boundaries around your resources. Late but not too late.",
        },
      ],
    },
    {
      id: 'dreamer-4-pushback',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "{manipulator}'s smile freezes. 'Compensation? I thought this was about believing in something bigger. I'm not some corporation trying to exploit you.'",
          speakerId: 'alex',
          emotion: 'cold',
        },
        {
          text: "'I'm offering you equity. Ownership. But if all you care about is getting paid upfront...' They shake their head. 'Maybe I misread you.'",
          speakerId: 'alex',
          emotion: 'angry',
        },
        {
          speakerId: 'inner',
          text: "Asking for fair terms makes you the villain. Interesting.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dreamer-4b-fold',
          text: '"You\'re right. I got defensive. Let\'s forget I asked."',
          nextSceneId: 'dreamer-4-used',
          feedback: "You apologized for having standards. They won.",
        },
        {
          id: 'dreamer-4b-hold',
          text: '"Equity in nothing is still nothing. When there\'s a product, let\'s talk."',
          nextSceneId: 'dreamer-good-ending',
          xpBonus: 25,
          isOptimal: true,
          feedback: "Math. They hate math. You spoke the language of reality.",
        },
      ],
    },
    {
      id: 'dreamer-4-slow',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Weeks pass. {manipulator} has big news every date. Investor meetings. Advisor interest. Launch 'any day now.' Always almost there. Never there.",
        },
        {
          text: "'I know it's been a lot of talk. But trust the process. Big things take time. You're still with me, right?'",
          speakerId: 'alex',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner',
          text: "Process without progress. How long do you watch?",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'dreamer-neutral-ending',
    },
    {
      id: 'dreamer-4-reveal',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} shifts uncomfortably. 'I'm... between situations. Crashing with a friend. But that's temporary. Once this launches—'",
          speakerId: 'alex',
          emotion: 'sad',
        },
        {
          text: "'You don't understand. I'm not like other people. I see things. I just need someone who believes in me enough to help me get there.'",
          speakerId: 'alex',
          emotion: 'pleading',
        },
        {
          speakerId: 'inner',
          text: "No job. No home. Selling a vision. The ask is coming.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'dreamer-4d-help',
          text: '"Everyone needs help sometimes. How can I support you?"',
          nextSceneId: 'dreamer-bad-ending',
          feedback: "You've opened your wallet to a dream. Dreams don't pay rent.",
        },
        {
          id: 'dreamer-4d-exit',
          text: '"I wish you well. But this isn\'t the situation for me."',
          nextSceneId: 'dreamer-good-ending',
          xpBonus: 25,
          isOptimal: true,
          feedback: "Clear vision. Incompatible situations. Clean exit.",
        },
      ],
    },
    {
      id: 'dreamer-5-confrontation',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "{manipulator}'s texts arrive rapid-fire. 'I thought you believed in this.' 'I guess I was wrong about you.' 'You're just like everyone else - scared of real success.'",
        },
        {
          text: "'Fine. I'll find someone who actually has vision. Enjoy your safe little life.'",
        },
        {
          speakerId: 'inner',
          text: "You asked for fairness. They showed you who they are.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'dreamer-neutral-ending',
    },

    // Dream Builder Endings
    {
      id: 'dreamer-good-ending',
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Vision vs Reality',
      endingSummary: "You recognized the difference between a dream and a scheme. Visionaries build. Talkers recruit believers to build for them. You chose to invest in yourself instead.",
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You tell {friend} about {manipulator}. 'Sounds like my ex,' she laughs. 'Always selling. Never delivering.'",
        },
        {
          text: "Six months later, you check their social media. Same pitches. Different partners. The launch is still 'coming soon.' Some dreams are just dreams.",
        },
      ],
    },
    {
      id: 'dreamer-neutral-ending',
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Almost Invested',
      endingSummary: "You flirted with the fantasy but never fully committed. Some time was lost to someone else's dream. But you got out before the cost got real.",
      endingLearnReference: 'manipulation-tactics-101',
      endingLearnPrompt: 'Want to spot communal manipulation patterns?',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "It fades. {manipulator} finds someone else to 'partner' with. You see them post about the 'new co-founder' who 'finally gets the vision.'",
        },
        {
          text: "'That could have been me,' you think. Then: 'That almost was me.' Close call.",
        },
      ],
    },
    {
      id: 'dreamer-bad-ending',
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Investor',
      endingSummary: "You gave time, energy, and maybe money to someone else's dream. The launch never came. The partnership dissolved. You learned that vision without substance is just a story someone needed you to believe.",
      endingLearnReference: 'manipulation-tactics-101',
      endingLearnPrompt: 'Learn to recognize investment scams in relationships.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three months. Hundreds of hours. The app never launched. The investors never materialized. {manipulator} found a new partner - younger, more optimistic. You were 'too focused on the details.'",
        },
        {
          text: "What did you get? Experience. Expensive, painful experience. Next time, you'll remember: dreams are free. Labor isn't.",
        },
      ],
    },

    // ========================================
    // PATH C: THE GRAND ROMANTIC
    // Classic Grandiose Narcissist - Gifts & Intensity
    // ========================================
    {
      id: 'romantic-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} laughs. 'Come here often? That's adorable. This place is nice, but you deserve better.' They lean in conspiratorially. 'I know a spot. Rooftop bar. Best view in the city. What do you say we upgrade?'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          text: "Before you can answer, they've signaled the waiter. 'We'll close out here.' They hand over a black card. 'My treat. Obviously.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          speakerId: 'inner',
          text: "Moving fast. Paying fast. Is this generosity or a statement?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-1a',
          text: '"Wow. Lead the way!"',
          nextSceneId: 'romantic-2-swept',
          feedback: "You've surrendered control of the date. They're driving now.",
        },
        {
          id: 'romantic-1b',
          text: '"I appreciate it, but I like it here. Let\'s stay."',
          nextSceneId: 'romantic-2-grounded',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You rejected the redirect. Now watch them adjust.",
        },
        {
          id: 'romantic-1c',
          text: '"Let me get my half first."',
          nextSceneId: 'romantic-2-split',
          xpBonus: 15,
          feedback: "Independence. They didn't expect that.",
        },
      ],
    },
    {
      id: 'romantic-2-swept',
      backgroundId: 'bar',
      dialog: [
        {
          text: "The rooftop bar is stunning. Fairy lights. City spread below. Champagne appears without you ordering. {manipulator} knows everyone's name. The hostess hugs them.",
        },
        {
          text: "'I wanted tonight to be special. You're not like other people I date. You're different.' They raise a glass. 'To finding someone who finally matches my energy.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Champagne on date one. VIP treatment. The stage is expensive. But who's performing for whom?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-2a-match',
          text: '"This is incredible. You really know how to impress."',
          nextSceneId: 'romantic-3-trapped',
          feedback: "You validated the production. The bar will only go higher. Can you keep up?",
        },
        {
          id: 'romantic-2a-ground',
          text: '"It\'s beautiful. But I\'m more interested in getting to know you."',
          nextSceneId: 'romantic-3-test',
          xpBonus: 15,
          feedback: "You redirected from setting to substance. Smart.",
        },
      ],
    },
    {
      id: 'romantic-2-grounded',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator}'s smile flickers. Just a moment. 'You want to stay... here?' They look around like they're seeing the cafe for the first time.",
          speakerId: 'alex',
          emotion: 'confused',
        },
        {
          text: "'I mean, sure. Yeah. This is... cozy.' They're recalibrating. The script didn't account for 'no.' 'So tell me about yourself. The real stuff.'",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "They expected you to follow. You didn't. Data point.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-2b-open',
          text: 'Share something genuine about yourself.',
          nextSceneId: 'romantic-3-balanced',
          xpBonus: 10,
          feedback: "Reciprocal conversation. This is what dates should actually look like.",
        },
        {
          id: 'romantic-2b-observe',
          text: '"You first. What brings you to dating apps?"',
          nextSceneId: 'romantic-3-test',
          xpBonus: 15,
          isOptimal: true,
          feedback: "You're learning about them before exposing yourself. Wise.",
        },
      ],
    },
    {
      id: 'romantic-2-split',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} looks genuinely confused. 'Split? But I invited you.' They put a hand on yours. 'I make more than enough. Let me treat you. It's what I do.'",
          speakerId: 'alex',
          emotion: 'confused',
        },
        {
          text: "'Besides,' they smile, 'if things work out, you'll have plenty of chances to treat me. I believe in balance. Eventually.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Balance 'eventually.' Generosity with strings attached.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-2c-accept',
          text: '"Okay. Thank you. That\'s kind."',
          nextSceneId: 'romantic-3-balanced',
          xpBonus: 5,
          feedback: "You accepted graciously. Not wrong. But watch the pattern.",
        },
        {
          id: 'romantic-2c-insist',
          text: '"I prefer to pay my way. It\'s how I was raised."',
          nextSceneId: 'romantic-3-test',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You held your boundary. They're not used to that.",
        },
      ],
    },
    {
      id: 'romantic-3-trapped',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Date two. {manipulator} picks you up. New car smell. 'I know we just met, but I have a surprise.' They hand you an envelope. Two tickets to {destination}. First class. Next month.",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          text: "'I know it's fast. But when you know, you know. And I know.' They're looking at you with complete certainty. Like the answer is obvious.",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Two dates. International trip. What does this gift cost you?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'romantic-3a-yes',
          text: '"Yes! Oh my god, yes!"',
          nextSceneId: 'romantic-4-deep',
          feedback: "You've accepted an obligation you don't yet understand. The currency isn't money.",
        },
        {
          id: 'romantic-3a-no',
          text: '"This is too much. I can\'t accept this."',
          nextSceneId: 'romantic-4-pushback',
          xpBonus: 25,
          isOptimal: true,
          feedback: "You refused a gift that came with invisible strings. That takes strength.",
        },
      ],
    },
    {
      id: 'romantic-3-test',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} talks about themselves. Achievements. Connections. 'I know everyone in this industry.' Name drops. Humble brags. 'I don't like to brag, but...' followed by bragging.",
        },
        {
          text: "'Anyway, enough about me. What do you do?' A pause. 'Wait, let me guess.' They study you. 'Something creative. You have that energy.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          speakerId: 'inner',
          text: "Lots of 'I.' Not many questions about you.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-3b-share',
          text: 'Tell them about your actual job.',
          nextSceneId: 'romantic-4-balanced',
          xpBonus: 10,
          feedback: "You participated in normal conversation. Let's see if they listen.",
        },
        {
          id: 'romantic-3b-test',
          text: '"What makes you say creative?"',
          nextSceneId: 'romantic-4-observe',
          xpBonus: 15,
          isOptimal: true,
          feedback: "You're testing if they see you or just reflect themselves.",
        },
      ],
    },
    {
      id: 'romantic-3-balanced',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Date two. Restaurant. {manipulator} has already ordered wine. The expensive bottle. 'I hope you don't mind. I'm a bit particular about wine.'",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          text: "They ask about your family. Your dreams. They nod. Smile. Then steer back to themselves. Every conversation is a loop that returns to them.",
        },
        {
          speakerId: 'inner',
          text: "They ask questions but don't hear answers. The questions are transitions, not curiosity.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-3c-test',
          text: '"Tell me something you\'ve failed at."',
          nextSceneId: 'romantic-4-test',
          xpBonus: 20,
          isOptimal: true,
          feedback: "Vulnerability test. Narcissists struggle with failure narratives.",
        },
        {
          id: 'romantic-3c-flow',
          text: 'Let the conversation flow. Enjoy the evening.',
          nextSceneId: 'romantic-4-balanced',
          xpBonus: 5,
          feedback: "Sometimes dates are just dates. But patterns matter.",
        },
      ],
    },
    {
      id: 'romantic-4-deep',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Week three. {manipulator}'s apartment. Beautiful. Every surface designed. They're on the phone when you arrive. 'Hold on.' To you: 'Hey gorgeous.' Back to phone: 'I'll call you back.'",
        },
        {
          text: "'My ex. Keeps calling. Can't take a hint.' They roll their eyes. 'Anyway, I've been thinking. You should delete your dating apps. I already did. It's just us now.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Three weeks. Exclusivity demand. Ex 'can't take a hint.' What's the real story?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'romantic-4a-delete',
          text: 'Delete the apps. You\'re all in.',
          nextSceneId: 'romantic-5-isolation',
          feedback: "You've abandoned options for someone who hasn't earned exclusivity. The cage has a nice view.",
        },
        {
          id: 'romantic-4a-hold',
          text: '"Let\'s talk about exclusivity properly. Not just app deletion."',
          nextSceneId: 'romantic-5-boundary',
          xpBonus: 20,
          isOptimal: true,
          feedback: "You asked for a real conversation instead of accepting a demand. Mature.",
        },
      ],
    },
    {
      id: 'romantic-4-pushback',
      backgroundId: 'bar',
      dialog: [
        {
          text: "{manipulator}'s face shifts. Something cold underneath the charm. 'Too much? I just thought...' They pull back the envelope. 'Fine. I was trying to do something special.'",
          speakerId: 'alex',
          emotion: 'cold',
        },
        {
          text: "'Most people would be excited. But I respect your... caution.' The word 'caution' sounds like an insult. 'Maybe when you trust me more.'",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "You declined a gift. Now you're the problem. Interesting framing.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-4b-soften',
          text: '"I didn\'t mean to offend you. It\'s just fast."',
          nextSceneId: 'romantic-5-slow',
          xpBonus: 5,
          feedback: "You explained yourself. Not wrong, but you don't owe explanations for having standards.",
        },
        {
          id: 'romantic-4b-note',
          text: 'Note the reaction. Say nothing. Let them fill the silence.',
          nextSceneId: 'romantic-5-observe',
          xpBonus: 25,
          isOptimal: true,
          feedback: "Strategic silence. You learned more in that pause than in an hour of talking.",
        },
      ],
    },
    {
      id: 'romantic-4-balanced',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "The pattern continues. Expensive dates. Nice places. {manipulator} always knows someone. Always has access. You're a passenger in their world.",
        },
        {
          text: "'Let's do something you like next time,' they say. 'Whatever you want.' But when you suggest a simple walk in the park, they make a face. 'Really? Okay. If that's what you want.'",
          speakerId: 'alex',
          emotion: 'confused',
        },
        {
          speakerId: 'inner',
          text: "'Whatever you want' except anything that isn't impressive.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'romantic-5-slow',
    },
    {
      id: 'romantic-4-observe',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "{manipulator} pauses. 'What makes me say creative?' They laugh. 'I don't know. Energy. Vibe. You just seem like the type.' No specifics. No observation. Just assumptions.",
          speakerId: 'alex',
          emotion: 'happy',
        },
        {
          text: "They don't know you. They've decided who you are and cast you in a role. The question is whether you'll play it.",
        },
        {
          speakerId: 'inner',
          text: "They're not seeing you. They're seeing who they want you to be.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'romantic-5-slow',
    },
    {
      id: 'romantic-4-test',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "{manipulator} blinks. 'Failed at?' A pause. Too long. 'I mean, everyone fails. But I don't really dwell on that. I prefer to focus on wins.'",
          speakerId: 'alex',
          emotion: 'confused',
        },
        {
          text: "'I guess... I've had relationships that didn't work out. But honestly, that's usually the other person's issues. Not mine.'",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "No failures. Or no accountability. Hard to tell from here.",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'romantic-5-slow',
    },
    {
      id: 'romantic-5-isolation',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Month two. You've seen less of your friends. {manipulator} makes comments. 'Maya again? You guys just saw each other.' 'Your friends don't seem to like me much.'",
        },
        {
          text: "'I just want you to myself sometimes. Is that so wrong?' They pull you close. 'We have something special. Not everyone will understand it.'",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "Your world is shrinking. Their world is everything. How did this happen?",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'romantic-bad-ending',
    },
    {
      id: 'romantic-5-boundary',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "'Talk about exclusivity?' {manipulator} looks annoyed. 'I thought this was obvious. I deleted my apps. I'm exclusive. What more do you need?'",
          speakerId: 'alex',
          emotion: 'cold',
        },
        {
          text: "'Do you not trust me? After everything I've done for you? The trips I planned? The dinners? And you're questioning my commitment?'",
          speakerId: 'alex',
          emotion: 'angry',
        },
        {
          speakerId: 'inner',
          text: "Gifts as proof of commitment. Your concerns as ingratitude.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-5a-cave',
          text: '"You\'re right. I\'m sorry. I do trust you."',
          nextSceneId: 'romantic-bad-ending',
          feedback: "You apologized for having questions. The precedent is set.",
        },
        {
          id: 'romantic-5a-hold',
          text: '"This reaction is the conversation I wanted to have."',
          nextSceneId: 'romantic-good-ending',
          xpBonus: 25,
          isOptimal: true,
          feedback: "You named the pattern. Their anger told you everything.",
        },
      ],
    },
    {
      id: 'romantic-5-slow',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "{friend} texts: 'Haven't seen you in forever. Is everything okay?' You start to type, then stop. What do you say? Things are... fine? Great? Different?",
        },
        {
          text: "{manipulator} texts: 'Dinner tonight. I made reservations. Wear something nice.' Not a question. An instruction.",
        },
        {
          speakerId: 'inner',
          text: "When did you stop making your own plans?",
          emotion: 'concerned',
        },
      ],
      nextSceneId: 'romantic-neutral-ending',
    },
    {
      id: 'romantic-5-observe',
      backgroundId: 'bar',
      dialog: [
        {
          text: "The silence works. {manipulator} fills it. 'Look, I just... I'm not used to people saying no to me.' They laugh, but it's strained. 'I get a lot of yes.'",
          speakerId: 'alex',
          emotion: 'neutral',
        },
        {
          text: "'Maybe that's why I like you. You're a challenge.' They smile. But something about it feels like a competition. Not a connection.",
          speakerId: 'alex',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner',
          text: "A challenge to be won. Not a person to know.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'romantic-5c-stay',
          text: '"I\'m not a challenge. I\'m a person."',
          nextSceneId: 'romantic-good-ending',
          xpBonus: 25,
          isOptimal: true,
          feedback: "You corrected the frame. That's self-respect.",
        },
        {
          id: 'romantic-5c-play',
          text: '"Maybe I like being chased."',
          nextSceneId: 'romantic-neutral-ending',
          feedback: "You entered the game. Now you're playing by their rules.",
        },
      ],
    },

    // Grand Romantic Endings
    {
      id: 'romantic-good-ending',
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Exit',
      endingSummary: "You saw through the gifts and the intensity. The champagne was nice, but the price was too high. Real love doesn't need to buy you. It earns you.",
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You end it cleanly. {manipulator} doesn't take it well. 'You're making a huge mistake. Do you know what you're giving up?'",
        },
        {
          text: "'A lot of expensive dinners,' you think. 'And a lot of strings.' You tell {friend} everything. 'Proud of you,' she says. 'The gifts were the trap. You spotted it.'",
        },
      ],
    },
    {
      id: 'romantic-neutral-ending',
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Close Call',
      endingSummary: "You saw signs but stayed longer than you should have. You got out, but not before some damage was done. The gifts were memorable. So was the control.",
      endingLearnReference: 'love-bombing-101',
      endingLearnPrompt: 'Learn to recognize love bombing patterns.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "It ended after two months. The intensity became suffocating. The generosity came with receipts. 'After everything I did for you' became their favorite phrase.",
        },
        {
          text: "'I should have seen it earlier,' you tell {friend}. 'The gifts weren't gifts. They were investments. And they expected returns.'",
        },
      ],
    },
    {
      id: 'romantic-bad-ending',
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Gilded Cage',
      endingSummary: "You traded independence for intensity. The gifts became obligations. The attention became control. By the time you saw the bars, the door was closed.",
      endingLearnReference: 'love-bombing-101',
      endingLearnPrompt: 'Learn to recognize love bombing before it traps you.',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months. You've moved into their apartment. Given up your lease. Your friends call less. {manipulator} monitors your phone 'because they love you.'",
        },
        {
          text: "'I gave you everything,' they remind you when you question anything. 'Where's your gratitude?' The generosity was never free. It was a loan. And the interest is everything you are.",
        },
      ],
    },
  ],
};
