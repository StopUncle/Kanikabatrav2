// Scenario: The Hot & Cold (Male Version v2)
// Three avoidant attachment patterns - female manipulators
// Teaching recognition and strategic response for men
// v2 format: 3 paths, 9 endings, male psychology focus

import type { Scenario } from '../../types';

export const maleAvoidantDanceScenario: Scenario = {
  id: 'male-avoidant-dance',
  title: 'The Hot & Cold',
  tagline: 'When she pulls back, what do you do?',
  description:
    "She was incredibly into you. Now she's distant. Is it you, or is it her? Three avoidant patterns, three different strategies. Learn to recognize the game and stop chasing.",
  tier: 'premium',
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  category: 'avoidant',
  xpReward: 150,
  badgeId: 'avoidant-expert',
  targetGender: 'male',

  templates: {
    dismissive: ['Jessica', 'Brittany', 'Taylor'],
    fearful: ['Rachel', 'Morgan', 'Casey'],
    busy: ['Chelsea', 'Avery', 'Drew'],
  },

  tacticsLearned: [
    'Avoidant attachment recognition',
    'Push-pull pattern awareness',
    'Strategic mirroring (match her energy)',
    'Breaking the chase cycle',
    'Recognizing work addiction as avoidance',
    'Chaos vs chemistry distinction',
  ],
  redFlagsTaught: [
    'Hot/cold behavior cycles',
    'Emotional unavailability after intimacy',
    '"I don\'t need anyone" emotional fortress',
    'Breadcrumbing tactics',
    'Constant work emergencies',
    '"You\'re different from other guys" ego plays',
  ],

  characters: [
    {
      id: 'jessica',
      name: 'Jessica',
      description: 'Independent to a fault. Walls up. Says she needs no one.',
      traits: ['dismissive', 'independent', 'emotionally unavailable'],
      defaultEmotion: 'cold',
    },
    {
      id: 'rachel',
      name: 'Rachel',
      description: 'Hot one minute, cold the next. Push-pull chaos.',
      traits: ['fearful', 'intense', 'unpredictable'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'chelsea',
      name: 'Chelsea',
      description: 'Married to her career. Always has a work emergency.',
      traits: ['workaholic', 'ambitious', 'emotionally shielded'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'therapist',
      name: 'Dr. Chen',
      description: 'Your therapist who helps you see patterns clearly.',
      traits: ['wise', 'supportive', 'insightful'],
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
      backgroundId: 'office',
      dialog: [
        {
          text: "Therapy. Dr. Chen settles into his chair. 'So. You mentioned someone new. Tell me about her.' You hesitate. How do you describe this? She's amazing when she's present. But lately...",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'She's... complicated.'",
        },
        {
          speakerId: 'inner-voice',
          text: "That's an understatement.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-dismissive',
          text: '"She\'s incredibly independent. Says she doesn\'t need anyone."',
          nextSceneId: 'dismissive-1',
          feedback: 'The Dismissive Avoidant. The emotional fortress.',
        },
        {
          id: 'fork-fearful',
          text: '"Hot one minute, cold the next. Push-pull chaos."',
          nextSceneId: 'fearful-1',
          feedback: 'The Fearful Avoidant. She wants intimacy but runs from it.',
        },
        {
          id: 'fork-busy',
          text: '"Always working. There\'s always a work emergency."',
          nextSceneId: 'busy-1',
          feedback: 'The Busy Professional. Work as an emotional shield.',
        },
      ],
    },

    // ============================================
    // PATH A: THE DISMISSIVE AVOIDANT
    // "I don't need anyone"
    // ============================================
    {
      id: 'dismissive-1',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Incredibly independent.' Dr. Chen nods. 'Tell me more.' 'Jessica acts like she doesn't need anyone. Said her last relationship failed because the guy was \"too clingy.\" She values her space above everything.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And how does that make you feel?' 'Like I'm constantly proving I'm not \"too much.\" Like having normal relationship needs makes me weak. She actually said I was \"different from other guys\" because I give her space.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "\"Different from other guys.\" Classic ego play. Since when is wanting connection a flaw?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dismissive-1a',
          text: '"I\'ve started pulling back too. Matching her energy."',
          nextSceneId: 'dismissive-2-mirror',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Strategic mirroring. Smart—but watch why.',
        },
        {
          id: 'dismissive-1b',
          text: '"I keep trying to show her I\'m worth opening up to."',
          nextSceneId: 'dismissive-2-chase',
          feedback: 'Chasing the fortress. You\'ll exhaust yourself trying to earn what should be given.',
        },
      ],
    },
    {
      id: 'dismissive-2-chase',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Worth opening up to.' Dr. Chen pauses. 'Do you hear what you just said? You're trying to EARN vulnerability from her. As if her emotional availability is a prize you haven't won yet.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          text: "'Healthy partners don't make you audition for basic emotional connection. And that \"different from other guys\" line? That's her training you to suppress your own needs.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'dismissive-2-mirror',
    },
    {
      id: 'dismissive-2-mirror',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Strategic mirroring can work with dismissive types. When you pull back, they often come forward. But—' Dr. Chen leans in. 'There's a difference between matching energy and losing yourself.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'What's the difference?' 'Are you pulling back because it feels right, or because you're trying to trigger a reaction? One is self-respect. The other is still chasing—just with different tactics.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'dismissive-3-test',
    },
    {
      id: 'dismissive-3-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "That night. Jessica texts after three days of silence: 'Hey you. Free this weekend? Miss your face.' Classic. No acknowledgment of the gap. No explanation. Just picking up like nothing happened.",
          speakerId: 'jessica',
          emotion: 'seductive',
        },
        {
          text: "Your instinct: respond immediately. Show you're available. But you remember Dr. Chen's words. She took three days. And now the subtle flattery—'miss your face'—designed to reward your patience.",
        },
        {
          speakerId: 'inner-voice',
          text: "She took three days. What do you take?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dismissive-3a',
          text: 'Wait a few hours. Then respond casually, matching her energy.',
          nextSceneId: 'dismissive-4-matched',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Match the energy. Three days from her = few hours from you.',
        },
        {
          id: 'dismissive-3b',
          text: '"Finally! I was starting to worry about you!"',
          nextSceneId: 'dismissive-4-eager',
          feedback: 'You just showed you were waiting by the phone. She knows now.',
        },
        {
          id: 'dismissive-3c',
          text: "Don't respond at all. Let her wonder.",
          nextSceneId: 'dismissive-4-silent',
          xpBonus: 10,
          feedback: 'Bold. But maybe too cold for this stage.',
        },
      ],
    },
    {
      id: 'dismissive-4-eager',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'Haha aww, you're sweet. Anyway gotta run, talk soon!' And just like that, she's gone again. She got what she needed—confirmation you're waiting. Now she can disappear guilt-free.",
          speakerId: 'jessica',
          emotion: 'happy',
        },
        {
          text: "Your eagerness gave her permission to keep you on the shelf. The 'you're sweet' comment? Translates to: 'You're safe. Predictable. I can come and go as I please.'",
        },
      ],
      nextSceneId: 'dismissive-bad-ending',
    },
    {
      id: 'dismissive-4-silent',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You don't respond. A day passes. 'Hello? Earth to you?' Another message: 'Did I do something wrong?' Interesting. When YOU don't respond, suddenly she's concerned.",
          speakerId: 'jessica',
          emotion: 'confused',
        },
        {
          speakerId: 'inner-voice',
          text: "She can dish silence. Can she take it?",
          emotion: 'smirking',
        },
      ],
      choices: [
        {
          id: 'dismissive-4sa',
          text: '"Just busy living my life. What\'s up?"',
          nextSceneId: 'dismissive-4-matched',
          isOptimal: true,
          xpBonus: 15,
          feedback: "Her own excuse, returned. She'll recognize it.",
        },
        {
          id: 'dismissive-4sb',
          text: 'Explain you were giving her space.',
          nextSceneId: 'dismissive-5-explain',
          feedback: "You're still adjusting to her rhythm instead of yours.",
        },
      ],
    },
    {
      id: 'dismissive-5-explain',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'Giving me space? I didn't ask for space.' But she took it. Without asking. The rules only apply to you, apparently.",
          speakerId: 'jessica',
          emotion: 'cold',
        },
        {
          text: "You're playing by rules she made up and changes whenever convenient. Classic frame control—she sets the terms, you follow them.",
        },
      ],
      nextSceneId: 'dismissive-neutral-ending',
    },
    {
      id: 'dismissive-4-matched',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Saturday. You show up fashionably late. Jessica is already there, watching the door. Her face lights up when she sees you. 'Hey! You look good.' She's making more effort tonight. Touching your arm. Leaning in.",
          speakerId: 'jessica',
          emotion: 'happy',
        },
        {
          text: "'I know I've been distant lately. Work has been...' She trails off. 'But that's not an excuse.' She acknowledged it. That's rare from a dismissive.",
          speakerId: 'jessica',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "Acknowledgment is step one. Watch for step two.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dismissive-5a',
          text: '"I appreciate you saying that. What was going on?"',
          nextSceneId: 'dismissive-6-vulnerable',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Accept acknowledgment while seeking understanding. Good balance.',
        },
        {
          id: 'dismissive-5b',
          text: '"Actions speak louder. Let\'s see how tonight goes."',
          nextSceneId: 'dismissive-6-guarded',
          xpBonus: 10,
          feedback: 'Strong. Demanding consistency over words.',
        },
        {
          id: 'dismissive-5c',
          text: '"It\'s fine. I understand work stress."',
          nextSceneId: 'dismissive-6-accept',
          feedback: "You're excusing the pattern. Work stress doesn't take 3 days to send a text.",
        },
      ],
    },
    {
      id: 'dismissive-6-accept',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Jessica relaxes. 'See? This is why I like you. You're not needy like other guys.' You've been sorted into 'not needy.' But is that a compliment or a warning?",
          speakerId: 'jessica',
          emotion: 'happy',
        },
        {
          text: "She's praising you for having low standards. For not requiring what you deserve. Translation: 'You let me do whatever I want. Perfect.'",
        },
      ],
      nextSceneId: 'dismissive-neutral-ending',
    },
    {
      id: 'dismissive-6-guarded',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Jessica studies you. 'Fair enough. You're... different.' She watches you more carefully all night. Respecting you more. Testing you less.",
          speakerId: 'jessica',
          emotion: 'neutral',
        },
        {
          text: "Different is good here. Different means she can't take you for granted. Different means she has to earn YOU.",
        },
      ],
      nextSceneId: 'dismissive-7-test',
    },
    {
      id: 'dismissive-6-vulnerable',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Jessica takes a breath. Something shifts. 'Honestly? When things start feeling real, I don't know how to handle it. My last relationship... he wanted too much. I got scared this was heading there.'",
          speakerId: 'jessica',
          emotion: 'sad',
        },
        {
          text: "'So you pulled back.' 'I pulled back.' At least she's naming the pattern. Self-awareness from a dismissive is rare.",
          speakerId: 'jessica',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Self-awareness. But can she do anything with it?",
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'dismissive-7-test',
    },
    {
      id: 'dismissive-7-test',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Great night. Connected. She's even affectionate. Then she says: 'I don't want to ruin this by putting labels on it. Let's just see where it goes.'",
          speakerId: 'jessica',
          emotion: 'cold',
        },
        {
          text: "'See where it goes' = no commitment. Words without timelines are just delay tactics. She wants the benefits without the responsibility.",
        },
        {
          speakerId: 'inner-voice',
          text: "What do YOU need? Does she even know?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dismissive-7a',
          text: '"I hear you. But I know what I want eventually. Let\'s see if your actions match your words."',
          nextSceneId: 'dismissive-good-ending',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Pleasant but not a pushover. Clear about your standards.',
        },
        {
          id: 'dismissive-7b',
          text: '"That\'s fair. I\'m not rushing anything."',
          nextSceneId: 'dismissive-neutral-ending',
          feedback: 'You just surrendered your needs to keep her comfortable.',
        },
        {
          id: 'dismissive-7c',
          text: '"Okay, no labels then."',
          nextSceneId: 'dismissive-bad-ending',
          feedback: 'You accepted her terms without stating yours. Her frame, her rules.',
        },
      ],
    },
    // DISMISSIVE ENDINGS
    {
      id: 'dismissive-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Three months later. Back in therapy. 'How's Jessica?' 'Taking it slow. When she pulls back, I don't chase. When she comes forward, I don't over-reward. She's actually working on her stuff.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And if she doesn't change?' 'Then I walk away knowing I did everything right. My value doesn't depend on her availability.' 'That's growth.' You matched her energy without losing yourself.",
          speakerId: 'therapist',
          emotion: 'happy',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Balanced Dance',
      endingSummary: 'You recognized the pattern and navigated it with awareness. Whatever happens, you kept your frame.',
    },
    {
      id: 'dismissive-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Months pass. Good weeks. Cold weeks. You're getting comfortable in her hot-cold cycle. Not suffering, but not thriving either.",
        },
        {
          text: "She calls you 'the best guy she's ever dated' but won't commit. You know the pattern now. You just haven't broken it. Awareness without action is just suffering with clarity.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Endless Cycle',
      endingSummary: "You stayed in the pattern. Not terrible, but not thriving. She gets all the benefits while you wait.",
      endingLearnReference: 'avoidant-attachment-101',
      endingLearnPrompt: 'Learn to break the dismissive cycle.',
    },
    {
      id: 'dismissive-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You kept chasing. Every crumb felt like a feast. Confused her intermittent attention for chemistry. Then you see her Instagram story: her and some guy at a rooftop bar. The caption? 'Finally found someone who gets me.'",
        },
        {
          text: "Three weeks. That's how long it took her to replace you. The guy in the photo? He's not texting her back immediately. He's not available whenever she wants. He's 'challenging.' You were convenient. Next time: your frame or nothing.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Lost in the Chase',
      endingSummary: "She moved on in weeks. You were convenient, not desired. The new guy doesn't chase—and that's why she does.",
      endingLearnReference: 'avoidant-attachment-101',
      endingLearnPrompt: 'Learn why chasing avoidants never works.',
    },

    // ============================================
    // PATH B: THE FEARFUL AVOIDANT
    // Push-pull chaos
    // ============================================
    {
      id: 'fearful-1',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Hot and cold.' Dr. Chen nods knowingly. 'Describe the pattern.' 'Rachel is INTENSELY into me one day. Love-bombing, future plans, can't get enough. She said I'm the only guy who really gets her. Then suddenly—ice. Distant. Short texts. Like a different person.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And you?' 'I'm addicted to the hot phase. Keep trying to get back there. When she's cold, I double down, thinking I can bring the warmth back. The sex is incredible when she's ON, which makes the cold even worse.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "The rollercoaster feels like excitement. It's not. It's chaos.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-1a',
          text: '"Is the intensity real? Or is it manipulation?"',
          nextSceneId: 'fearful-2-question',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Good question. The answer is more complicated than either.',
        },
        {
          id: 'fearful-1b',
          text: '"I think if I just love her enough, she\'ll stabilize."',
          nextSceneId: 'fearful-2-savior',
          feedback: "White knight trap. You can't love someone out of an attachment disorder.",
        },
      ],
    },
    {
      id: 'fearful-2-savior',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Love her enough to stabilize.' Dr. Chen pauses. 'Classic rescue fantasy. You're not her therapist. And your love isn't a cure for attachment wounds. That's work SHE has to do—with professionals.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          text: "'The belief that your love can fix her is a trap. It keeps you invested in her potential instead of her reality. And it lets her off the hook for doing the actual work.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'fearful-2-question',
    },
    {
      id: 'fearful-2-question',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Here's what you need to understand about fearful avoidants: the intensity IS real. She genuinely feels it. But so is the fear. When intimacy gets too close, her nervous system panics.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'She doesn't push you away to hurt you. She pushes you away because closeness triggers something deeper. The problem is—her healing isn't your job. And her chaos isn't chemistry.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'fearful-3-incident',
    },
    {
      id: 'fearful-3-incident',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "That weekend. You have an incredible date with Rachel. Deep conversations. Physical chemistry off the charts. She looks at you and says: 'I haven't felt this way about anyone in years. You're different.'",
          speakerId: 'rachel',
          emotion: 'seductive',
        },
        {
          text: "You go home feeling incredible. You're 'different.' She 'hasn't felt this way.' Monday: nothing. Tuesday: one-word texts. Wednesday: 'Hey sorry been busy, talk later?' It's happening again.",
        },
        {
          speakerId: 'inner-voice',
          text: "There it is. The pullback. Right when things got good.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-3a',
          text: 'Match her coolness. Give her space. Focus on your life.',
          nextSceneId: 'fearful-4-space',
          isOptimal: true,
          xpBonus: 15,
          feedback: "Don't chase the freeze. Let her come back to you.",
        },
        {
          id: 'fearful-3b',
          text: '"Is everything okay? You seem distant. Did I do something wrong?"',
          nextSceneId: 'fearful-4-chase',
          feedback: "You're chasing. She'll pull back further.",
        },
        {
          id: 'fearful-3c',
          text: 'Send multiple messages trying to recreate the connection.',
          nextSceneId: 'fearful-4-flood',
          feedback: "Flooding her when she's in freeze mode. This will backfire hard.",
        },
      ],
    },
    {
      id: 'fearful-4-flood',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'I thought we had something special.' 'Did I misread things?' 'Just let me know if I did something.' Each message pushes her further away. Finally: 'You're being really intense right now. I need space.'",
          speakerId: 'rachel',
          emotion: 'cold',
        },
        {
          text: "You became what she fears: too much, too close, too fast. Your anxiety triggered her avoidance. She wanted a man who wouldn't crumble when she pulled back. You crumbled.",
        },
      ],
      nextSceneId: 'fearful-bad-ending',
    },
    {
      id: 'fearful-4-chase',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'What did you do?' A long pause. Then: 'Nothing. I'm just busy. Not everything is about you.' But three days ago everything was about the two of you. Now you're 'not everything.'",
          speakerId: 'rachel',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "The freeze. Don't take the bait. Don't chase.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-4ca',
          text: '"Cool. Let me know when you want to connect." Then go silent.',
          nextSceneId: 'fearful-5-wait',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Course correction. Give space without chasing.',
        },
        {
          id: 'fearful-4cb',
          text: '"I\'m sorry if I did something wrong."',
          nextSceneId: 'fearful-5-apologize',
          feedback: "Apologizing for her avoidance. You didn't do anything wrong.",
        },
      ],
    },
    {
      id: 'fearful-5-apologize',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'It's not you. I just need time.' But it's always 'time.' And you're always waiting. She's trained you to feel responsible for her withdrawal.",
          speakerId: 'rachel',
          emotion: 'sad',
        },
        {
          text: "You've accepted her terms. Hot when she wants, cold when she needs, you always waiting like a good boy. Is this what you signed up for?",
        },
      ],
      nextSceneId: 'fearful-neutral-ending',
    },
    {
      id: 'fearful-4-space',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You don't chase. Hit the gym. Meet up with the boys. Work on your projects. Four days pass. Then: 'Hey... I'm sorry. I don't know what happened. Can we talk?'",
          speakerId: 'rachel',
          emotion: 'sad',
        },
        {
          text: "When you didn't chase the freeze, she came out of it. Interesting. Your absence created value. Your pursuit would have destroyed it.",
        },
        {
          text: "The pattern. Watch if she understands it.",
        },
      ],
      nextSceneId: 'fearful-5-talk',
    },
    {
      id: 'fearful-5-wait',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three days of silence. Then: 'I'm sorry. I do this sometimes. Can we talk?' She reached out. Not you.",
          speakerId: 'rachel',
          emotion: 'sad',
        },
        {
          text: "When you stopped chasing, she returned. That's useful data. But apologies without change are just words.",
        },
      ],
      nextSceneId: 'fearful-5-talk',
    },
    {
      id: 'fearful-5-talk',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'I don't know why I do this.' Rachel looks genuinely distressed. 'When things get good, I panic. I pull away. I know it doesn't make sense. I'm working on it. Sort of.'",
          speakerId: 'rachel',
          emotion: 'sad',
        },
        {
          text: "'Sort of?' 'I've been meaning to find a therapist. It's on my list.' On her list. For how long?",
          speakerId: 'rachel',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Self-awareness without action is just self-pity. Push.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-5a',
          text: '"I appreciate the honesty. But what are you actually DOING about it?"',
          nextSceneId: 'fearful-6-push',
          isOptimal: true,
          xpBonus: 20,
          feedback: "Holding her accountable. Awareness isn't enough.",
        },
        {
          id: 'fearful-5b',
          text: '"It\'s okay. I understand. We can take things slow."',
          nextSceneId: 'fearful-6-enable',
          feedback: "You're enabling the pattern. Understanding isn't accepting.",
        },
      ],
    },
    {
      id: 'fearful-6-enable',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'Thank you for understanding. Most guys wouldn't.' She seems relieved. Grateful even. Rewarding you with warmth for accepting her chaos.",
          speakerId: 'rachel',
          emotion: 'happy',
        },
        {
          text: "But nothing has actually changed. You've just agreed to accept the cycle. She'll do this again. And again. And you've told her that's okay.",
        },
      ],
      nextSceneId: 'fearful-neutral-ending',
    },
    {
      id: 'fearful-6-push',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel looks surprised. 'What am I doing?' 'Yeah. You know the pattern. You apologize every time. But what's different now? Are you in therapy? Reading about this? Actually changing?'",
          speakerId: 'rachel',
          emotion: 'confused',
        },
        {
          text: "'I...' She pauses. 'Not yet. But I will.' 'Will is future tense. I need present tense.' She's not used to being held accountable. Most guys just accept her apology and wait for the next cycle.",
          speakerId: 'rachel',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "Push. See what she does with it. Words or action?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-6a',
          text: '"I care about you. But I\'m not going to ride this rollercoaster forever."',
          nextSceneId: 'fearful-7-boundary',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Clear. Kind. Firm. This is how you set standards.',
        },
        {
          id: 'fearful-6b',
          text: '"Let\'s give it one more try."',
          nextSceneId: 'fearful-neutral-ending',
          feedback: 'One more try on what terms? Nothing has changed.',
        },
      ],
    },
    {
      id: 'fearful-7-boundary',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel is quiet for a long moment. 'You're right. I've been saying I'll fix it for years. And I never do.' She looks up. 'I called a therapist yesterday. First appointment is Thursday.'",
          speakerId: 'rachel',
          emotion: 'neutral',
        },
        {
          text: "Action. Not words. That's new. Your boundary pushed her to actually do something instead of just apologizing.",
          speakerId: 'rachel',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Thursday. That's specific. That's real. But one appointment isn't a cure.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-7a',
          text: '"That\'s good. Let me know how it goes. I\'ll be here—but I won\'t wait forever."',
          nextSceneId: 'fearful-good-ending',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Support with boundaries. Healthy masculinity.',
        },
        {
          id: 'fearful-7b',
          text: '"Great! I knew you could do it. We\'re going to be fine."',
          nextSceneId: 'fearful-neutral-ending',
          feedback: "Premature celebration. One appointment isn't a cure. Keep your guard up.",
        },
      ],
    },
    // FEARFUL ENDINGS
    {
      id: 'fearful-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months. Rachel is in therapy. Working on her attachment stuff. The cycles are less intense. Less frequent. She's learning to name the panic before it takes over.",
        },
        {
          text: "It's not perfect. But she's doing the work. And you didn't lose yourself chasing her chaos. You held frame, set boundaries, and she rose to meet them. That's the win.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Stabilizing',
      endingSummary: "She's doing the work. You held boundaries. Your frame stayed solid. Progress.",
    },
    {
      id: 'fearful-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Months pass. Hot weeks. Cold weeks. You've learned to predict the pattern. But predicting isn't the same as breaking.",
        },
        {
          text: "You're comfortable in the chaos now. That's not peace—that's just familiarity mistaken for stability. Other guys would have left. You stayed. Is that loyalty or lack of options?",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Eternal Cycle',
      endingSummary: "You adapted to the chaos instead of demanding change. Comfortable isn't the same as happy.",
      endingLearnReference: 'fearful-avoidant-101',
      endingLearnPrompt: "Learn why chaos isn't chemistry.",
    },
    {
      id: 'fearful-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Your pursuit pushed her away for good. 'You're too intense. I need someone more chill.' A month later, your friend sends you a screenshot. Rachel's posting about her new guy—'he gives me so much space to be myself.' Space. The thing you gave her. But she's crediting him.",
        },
        {
          text: "Her pattern will destroy that relationship too. But you won't be there to see it. You'll just be the cautionary tale she tells her therapist: 'My ex was so clingy.' She rewrote your story. And you handed her the pen.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Too Much, Too Fast',
      endingSummary: "She left for someone 'chill.' He'll get the same chaos. But you're already the villain in her story.",
      endingLearnReference: 'fearful-avoidant-101',
      endingLearnPrompt: 'Learn why chasing the freeze never works.',
    },

    // ============================================
    // PATH C: THE BUSY PROFESSIONAL
    // Work as emotional shield
    // ============================================
    {
      id: 'busy-1',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Always working.' Dr. Chen tilts his head. 'Tell me about that.' 'Chelsea is incredibly successful. But there's ALWAYS a work emergency. Cancelled dinners. Missed calls. \"Sorry babe, client crisis.\" She's a workaholic.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And how do you feel about it?' 'Proud? She's ambitious. Impressive. But also... invisible. Like her phone is always more important than I am. Like I'm a nice-to-have, not a priority.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner-voice',
          text: "Busy is a choice. What is she avoiding?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'busy-1a',
          text: '"Sometimes I wonder if work is an excuse to avoid intimacy."',
          nextSceneId: 'busy-2-insight',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Smart observation. Work can be emotional armor.',
        },
        {
          id: 'busy-1b',
          text: '"I should be more understanding. Success requires sacrifice."',
          nextSceneId: 'busy-2-excuse',
          feedback: "Success requires sacrifice, but you shouldn't be the sacrifice.",
        },
      ],
    },
    {
      id: 'busy-2-excuse',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Success requires sacrifice.' Dr. Chen pauses. 'Whose sacrifice? Hers—or yours? Very successful people still find time to text back. Still keep dinner reservations. Busy is a choice about priorities.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          text: "'The question isn't whether she's busy. The question is whether you're a priority. CEOs respond to important emails within minutes. She can't text you back for hours?'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'busy-2-insight',
    },
    {
      id: 'busy-2-insight',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Work addiction is a socially acceptable form of avoidance. She gets praised for it. \"She's so driven.\" But underneath—why can't she slow down? What happens when she's not producing?'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'For some people, busyness is how they avoid feeling. Stillness brings emotions they'd rather not face. Achievement becomes armor.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "Does she ever just... stop? Or does stopping scare her?",
        },
      ],
      nextSceneId: 'busy-3-test',
    },
    {
      id: 'busy-3-test',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Date night. Actual in-person time. Chelsea is present—for once. Looking good. Giving you attention. Then her phone buzzes. She glances at it. 'Sorry, give me one second.' One second becomes five minutes.",
          speakerId: 'chelsea',
          emotion: 'neutral',
        },
        {
          text: "'Client emergency. This will just take a moment.' But you've heard this before. 'One moment' always stretches. And you're left sitting there while she types furiously.",
        },
        {
          speakerId: 'inner-voice',
          text: "Test time. What do you do?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'busy-3a',
          text: '"Take your time. I\'ll enjoy my wine." (But note the pattern.)',
          nextSceneId: 'busy-4-observe',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Observe without immediate reaction. Gather data.',
        },
        {
          id: 'busy-3b',
          text: '"This is our time. Can it wait?"',
          nextSceneId: 'busy-4-push',
          xpBonus: 15,
          feedback: 'Direct. Clear. See how she responds to boundaries.',
        },
        {
          id: 'busy-3c',
          text: 'Wait quietly, checking your own phone.',
          nextSceneId: 'busy-4-passive',
          feedback: "Passive acceptance. You're normalizing being second place.",
        },
      ],
    },
    {
      id: 'busy-4-passive',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Ten minutes pass. Chelsea returns. 'Sorry about that. Where were we?' But the mood is broken. You've both retreated into your phones. This is what dates have become.",
        },
        {
          text: "Two people together, both elsewhere. Is this even a relationship? Or just two people occasionally occupying the same space?",
        },
      ],
      nextSceneId: 'busy-neutral-ending',
    },
    {
      id: 'busy-4-observe',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Fifteen minutes pass. Chelsea returns. 'Sorry, really sorry. Crisis averted.' She notices your expression. 'You're upset.' 'Not upset. Just... noticing a pattern.'",
          speakerId: 'chelsea',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Let her sit with that. Don't explain it away.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'busy-4oa',
          text: '"I want to understand. Is work genuinely this demanding, or is there something else?"',
          nextSceneId: 'busy-5-explore',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Curious, not accusatory. Opening a door.',
        },
        {
          id: 'busy-4ob',
          text: '"It\'s fine. Let\'s just enjoy the rest of dinner."',
          nextSceneId: 'busy-neutral-ending',
          feedback: 'Letting it slide. The pattern continues.',
        },
      ],
    },
    {
      id: 'busy-4-push',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Chelsea pauses. 'Can it wait?' She looks at the phone. Then at you. 'I guess... yes. It can wait.' She puts the phone face-down. Something shifts.",
          speakerId: 'chelsea',
          emotion: 'neutral',
        },
        {
          text: "'I'm sorry. I do this a lot, don't I?' Self-awareness. Most men wouldn't have pushed. They'd have waited. You didn't.",
          speakerId: 'chelsea',
          emotion: 'sad',
        },
        {
          text: "She chose you over the phone. This time. Watch for the pattern.",
        },
      ],
      nextSceneId: 'busy-5-explore',
    },
    {
      id: 'busy-5-explore',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Do you ever wonder why you can't slow down?' Chelsea shifts. Uncomfortable. 'What do you mean?' 'When's the last time you did nothing? Just... sat with yourself without producing something?'",
          speakerId: 'chelsea',
          emotion: 'confused',
        },
        {
          text: "Long pause. 'I don't... like stillness. My mind goes places I don't want it to go.' There it is. Work isn't ambition. It's running.",
          speakerId: 'chelsea',
          emotion: 'sad',
        },
        {
          speakerId: 'inner-voice',
          text: "Work is how she outruns her thoughts. What's she running from?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'busy-5a',
          text: '"What places?"',
          nextSceneId: 'busy-6-vulnerable',
          isOptimal: true,
          xpBonus: 20,
          feedback: "Go deeper. See what's underneath the armor.",
        },
        {
          id: 'busy-5b',
          text: '"That sounds hard. Maybe work-life balance would help."',
          nextSceneId: 'busy-6-surface',
          feedback: 'Surface solution to a deep problem.',
        },
      ],
    },
    {
      id: 'busy-6-surface',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Work-life balance.' Chelsea nods. 'You're right. I should be better about that.' But you can see it: the door that was opening just closed. Surface conversation resumed.",
          speakerId: 'chelsea',
          emotion: 'neutral',
        },
        {
          text: "She'll say the right things. Make promises. And next week, another work emergency. Nothing has actually been addressed. You had a moment. You let it pass.",
        },
      ],
      nextSceneId: 'busy-neutral-ending',
    },
    {
      id: 'busy-6-vulnerable',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Chelsea looks down. 'My dad. His expectations. Never being good enough no matter what I achieved. Feeling like I have to prove something constantly or I'll... disappear? I don't know. It sounds stupid out loud.'",
          speakerId: 'chelsea',
          emotion: 'sad',
        },
        {
          text: "'It doesn't sound stupid.' 'I've never said that to anyone. Most guys just accept me being busy. They don't ask why.' The walls are coming down. Just a crack. But it's something.",
          speakerId: 'chelsea',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner-voice',
          text: "Vulnerability. Real vulnerability. She's showing you something nobody sees.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'busy-6a',
          text: '"Thank you for telling me. I\'m here. But I also need you to be here—with me, not just work."',
          nextSceneId: 'busy-7-boundary',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Acknowledge AND set expectations. Perfect balance.',
        },
        {
          id: 'busy-6b',
          text: '"I understand now. Take all the time you need with work."',
          nextSceneId: 'busy-neutral-ending',
          feedback: "Understanding is good. But it shouldn't erase your needs.",
        },
      ],
    },
    {
      id: 'busy-7-boundary',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'You're right. I use work to hide. And it's not fair to you.' Chelsea takes a breath. 'What if... what if I tried therapy? Figured out why I can't stop?'",
          speakerId: 'chelsea',
          emotion: 'neutral',
        },
        {
          text: "'What if' is hypothetical. 'Will you?' 'Yes. I think I need to.' Commitment. Action. Not just awareness. Your standards pushed her toward growth.",
          speakerId: 'chelsea',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'busy-good-ending',
    },
    // BUSY ENDINGS
    {
      id: 'busy-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Four months later. Chelsea is in therapy. Learning why stillness terrified her. Work is still demanding—but there are boundaries now. Date nights that don't get cancelled. Phone goes face-down.",
        },
        {
          text: "She's still ambitious. But she's also present. It took you asking 'what places' to open the door she'd kept locked. Your curiosity and standards made space for her growth.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Slowing Down',
      endingSummary: "She's learning that stillness isn't dangerous. Work is still important—but so are you.",
    },
    {
      id: 'busy-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The relationship continues. Cancelled plans. Work emergencies. Promises to do better. You've accepted being second to a career that will never love her back.",
        },
        {
          text: "Successful people still text back. Still show up. If she wanted to, she would. You're with someone who's chosen her laptop over your presence. Is that what you deserve?",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Second Place',
      endingSummary: 'You accepted crumbs and called them a feast. Work will always come first.',
      endingLearnReference: 'work-addiction-101',
      endingLearnPrompt: 'Learn to recognize work as avoidance.',
    },
    {
      id: 'busy-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Eventually you stopped trying. The relationship faded—not with drama, just with absence. Two months later, a mutual friend mentions Chelsea's seeing someone new. 'Some guy from her industry. They're always working together late.'",
        },
        {
          text: "Of course. She found someone who fits into her workaholism instead of challenging it. They'll burn out together. But at least she won't have to choose between him and her laptop—they're the same thing. You weren't her partner. You were an interruption.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Fade',
      endingSummary: "She found someone who enables her avoidance. You were the interruption to her real love: achievement.",
      endingLearnReference: 'work-addiction-101',
      endingLearnPrompt: "Learn why you can't compete with a career.",
    },
  ],
};

export default maleAvoidantDanceScenario;
