// Scenario: The Hot & Cold (v3)
// Three avoidant attachment patterns
// Teaching recognition and strategic response

import type { Scenario } from '../types';

export const avoidantDanceScenario: Scenario = {
  id: 'avoidant-dance',
  title: 'The Hot & Cold',
  tagline: 'When they pull back, what do you do?',
  description:
    "They seemed so into you. Now they're distant. Is it you, or is it them? Three avoidant patterns, three different strategies.",
  tier: 'premium',
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  category: 'avoidant',
  xpReward: 150,
  badgeId: 'avoidant-expert',

  templates: {
    dismissive: ['Jordan', 'Alex', 'Taylor'],
    fearful: ['Riley', 'Morgan', 'Casey'],
    busy: ['Cameron', 'Avery', 'Drew'],
  },

  tacticsLearned: [
    'Avoidant attachment recognition',
    'Push-pull pattern awareness',
    'Strategic mirroring',
    'Breaking the chase cycle',
    'Recognizing work addiction as avoidance',
    'Chaos vs chemistry distinction',
  ],
  redFlagsTaught: [
    'Hot/cold behavior cycles',
    'Emotional unavailability after intimacy',
    'Excuses to avoid commitment',
    'Breadcrumbing tactics',
    '"I don\'t need anyone" mentality',
    'Constant work emergencies',
  ],

  characters: [
    {
      id: 'jordan',
      name: 'Jordan',
      description: 'Independent to a fault. Walls up. Needs no one.',
      traits: ['dismissive', 'independent', 'emotionally unavailable'],
      defaultEmotion: 'cold',
    },
    {
      id: 'riley',
      name: 'Riley',
      description: 'Hot one minute, cold the next. Push-pull chaos.',
      traits: ['fearful', 'intense', 'unpredictable'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'cameron',
      name: 'Cameron',
      description: 'Married to their job. Always has a work emergency.',
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
      backgroundId: 'office',
      dialog: [
        {
          text: "Therapy. Dr. Chen settles into her chair. 'So. You mentioned someone new. Tell me about them.' You hesitate. How do you describe this? They're amazing when they're present. But lately...",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'They're... complicated.'",
        },
        {
          speakerId: 'inner',
          text: "That's an understatement.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-dismissive',
          text: '"They\'re incredibly independent. Say they don\'t need anyone."',
          nextSceneId: 'dismissive-1',
          feedback: 'The Dismissive Avoidant. The emotional fortress.',
        },
        {
          id: 'fork-fearful',
          text: '"Hot one minute, cold the next. Push-pull chaos."',
          nextSceneId: 'fearful-1',
          feedback: 'The Fearful Avoidant. They want intimacy but run from it.',
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
          text: "'Incredibly independent.' Dr. Chen nods. 'Tell me more.' 'Jordan acts like they don't need anyone. Said their last relationship failed because the person was \"too needy.\" They value their space above everything.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And how does that make you feel?' 'Like I'm constantly proving I'm not \"too much.\" Like having normal relationship needs makes me weak.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner',
          text: "Since when is wanting connection a flaw?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dismissive-1a',
          text: '"I\'ve started pulling back too. Trying to match their energy."',
          nextSceneId: 'dismissive-2-mirror',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Strategic mirroring. Smart—but watch why.',
        },
        {
          id: 'dismissive-1b',
          text: '"I keep trying to show them I\'m worth opening up to."',
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
          text: "'Worth opening up to.' Dr. Chen pauses. 'Do you hear what you just said? You're trying to EARN vulnerability from them. As if their emotional availability is a prize you haven't won yet.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          text: "'Healthy partners don't make you audition for basic emotional connection.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "You're performing. They're watching.",
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
          text: "That night. Jordan texts after three days of silence: 'Hey. Free this weekend?' Classic. No acknowledgment of the gap. No explanation. Just picking up like nothing happened.",
          speakerId: 'jordan',
          emotion: 'neutral',
        },
        {
          text: "Your instinct: respond immediately. Show you're available. But you remember Dr. Chen's words.",
        },
        {
          speakerId: 'inner',
          text: "They took three days. What do you take?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dismissive-3a',
          text: 'Wait a few hours. Then respond casually, matching their energy.',
          nextSceneId: 'dismissive-4-matched',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Match the energy. Three days from them = few hours from you.',
        },
        {
          id: 'dismissive-3b',
          text: '"Finally! I was starting to worry about you!"',
          nextSceneId: 'dismissive-4-eager',
          feedback: 'You just showed you were waiting by the phone. They know now.',
        },
        {
          id: 'dismissive-3c',
          text: 'Don\'t respond at all. Let them wonder.',
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
          text: "'Haha yeah sorry, been slammed. Anyway gotta run, talk soon!' And just like that, they're gone again. They got what they needed—confirmation you're waiting. Now they can disappear guilt-free.",
          speakerId: 'jordan',
          emotion: 'neutral',
        },
        {
          text: "Your eagerness gave them permission to keep you on the shelf.",
        },
      ],
      nextSceneId: 'dismissive-bad-ending',
    },
    {
      id: 'dismissive-4-silent',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You don't respond. A day passes. 'Hello? Earth to you?' Another message: 'Did I do something wrong?' Interesting. When YOU don't respond, suddenly they're concerned.",
          speakerId: 'jordan',
          emotion: 'confused',
        },
        {
          speakerId: 'inner',
          text: "They can dish silence. Can they take it?",
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
          feedback: 'Their own excuse, returned. They\'ll recognize it.',
        },
        {
          id: 'dismissive-4sb',
          text: 'Explain you were giving them space.',
          nextSceneId: 'dismissive-5-explain',
          feedback: 'You\'re still adjusting to their rhythm.',
        },
      ],
    },
    {
      id: 'dismissive-5-explain',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'Giving me space? I didn't ask for space.' But they took it. Without asking. The rules only apply to you, apparently.",
          speakerId: 'jordan',
          emotion: 'cold',
        },
        {
          text: "You're playing by rules they made up and change whenever convenient.",
        },
      ],
      nextSceneId: 'dismissive-neutral-ending',
    },
    {
      id: 'dismissive-4-matched',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Saturday. You show up fashionably late. Jordan is already there, watching the door. Their face lights up when they see you. 'Hey! You look amazing.' They're making more effort tonight.",
          speakerId: 'jordan',
          emotion: 'happy',
        },
        {
          text: "'I know I've been distant lately. Work has been...' They trail off. 'But that's not an excuse.' They acknowledged it. That's rare.",
          speakerId: 'jordan',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
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
          feedback: 'You\'re excusing the pattern. Work stress doesn\'t take 3 days to send a text.',
        },
      ],
    },
    {
      id: 'dismissive-6-accept',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Jordan relaxes. 'See? This is why I like you. You get it. Most people are so needy.' You've been sorted into 'not needy.' Is that a compliment or a warning?",
          speakerId: 'jordan',
          emotion: 'happy',
        },
        {
          text: "They're praising you for having low standards. Something to think about.",
        },
      ],
      nextSceneId: 'dismissive-neutral-ending',
    },
    {
      id: 'dismissive-6-guarded',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Jordan studies you. 'Fair enough. You're different from other people I've dated.' You notice them watching you more carefully all night. Respecting you more.",
          speakerId: 'jordan',
          emotion: 'neutral',
        },
        {
          text: "Different is good. Different means they can't take you for granted.",
        },
      ],
      nextSceneId: 'dismissive-7-test',
    },
    {
      id: 'dismissive-6-vulnerable',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Jordan takes a breath. Something shifts. 'Honestly? When things start feeling real, I don't know how to handle it. My last relationship... she wanted too much. I got scared this was heading there.'",
          speakerId: 'jordan',
          emotion: 'sad',
        },
        {
          text: "'So you pulled back.' 'I pulled back.' At least they're naming the pattern.",
          speakerId: 'jordan',
          emotion: 'neutral',
        },
        {
          text: "Self-awareness. Can they do anything with it?",
        },
      ],
      nextSceneId: 'dismissive-7-test',
    },
    {
      id: 'dismissive-7-test',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Great night. Connected. Intimate. Then Jordan says: 'I don't want to ruin this by putting labels on it. Let's just see where it goes.'",
          speakerId: 'jordan',
          emotion: 'cold',
        },
        {
          text: "'See where it goes' = no commitment. Words without timelines are just delay tactics.",
        },
        {
          speakerId: 'inner',
          text: "What do YOU need?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'dismissive-7a',
          text: '"I understand. But I know what I need eventually. Let\'s see if actions match words."',
          nextSceneId: 'dismissive-good-ending',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Pleasant but not a pushover. Clear.',
        },
        {
          id: 'dismissive-7b',
          text: '"That\'s fair. I\'m not rushing anything."',
          nextSceneId: 'dismissive-neutral-ending',
          feedback: 'You just surrendered your needs to keep them comfortable.',
        },
        {
          id: 'dismissive-7c',
          text: '"Okay, no labels then."',
          nextSceneId: 'dismissive-bad-ending',
          feedback: 'You accepted their terms without stating yours.',
        },
      ],
    },
    // DISMISSIVE ENDINGS
    {
      id: 'dismissive-good-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Three months later. Back in therapy. 'How's Jordan?' 'We're taking it slow. When they pull back, I don't chase. When they come forward, I don't over-reward. They're actually working on their stuff.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And if they don't change?' 'Then I walk away knowing I did everything right.' 'That's growth.' You matched their energy without losing yourself.",
          speakerId: 'therapist',
          emotion: 'happy',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Balanced Dance',
      endingSummary: 'You recognized the pattern and navigated it with awareness. Whatever happens, you protected your peace.',
    },
    {
      id: 'dismissive-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Months pass. Good weeks. Cold weeks. You're getting comfortable in their hot-cold cycle. Not suffering, but not thriving either.",
        },
        {
          text: "You know the pattern now. You just haven't broken it. Awareness without action is just suffering with clarity.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Endless Cycle',
      endingSummary: 'You stayed in the pattern. Not terrible, but not thriving. Awareness without action.',
      endingLearnReference: 'avoidant-attachment-101',
      endingLearnPrompt: 'Learn to break the dismissive cycle.',
    },
    {
      id: 'dismissive-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You kept chasing. Every crumb felt like a feast. Confused chaos for chemistry. Eventually, Jordan found someone 'easier.' You're left wondering what you did wrong.",
        },
        {
          text: "The answer? You deserved more and didn't believe it. You can't earn what should be freely given.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Lost in the Chase',
      endingSummary: 'You gave away your power. Next time: match their energy. Never chase the fortress.',
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
          text: "'Hot and cold.' Dr. Chen nods knowingly. 'Describe the pattern.' 'Riley is INTENSELY into me one day. Love-bombing, future plans, can't get enough. Then suddenly—ice. Distant. Short texts. Like a different person.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And you?' 'I'm addicted to the hot phase. Keep trying to get back there. When they're cold, I double down, thinking I can bring the warmth back.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner',
          text: "The rollercoaster feels like excitement. It's not.",
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
          text: '"I think if I just love them enough, they\'ll stabilize."',
          nextSceneId: 'fearful-2-savior',
          feedback: 'You can\'t love someone out of an attachment disorder.',
        },
      ],
    },
    {
      id: 'fearful-2-savior',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Love them enough to stabilize.' Dr. Chen pauses. 'You're not their therapist. And love isn't a cure for attachment wounds. That's work THEY have to do—with professionals.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          text: "'The belief that your love can fix them is actually a trap. It keeps you invested in their potential instead of their reality.'",
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
          text: "'Here's what you need to understand about fearful avoidants: the intensity IS real. They genuinely feel it. But so is the fear. When intimacy gets too close, their nervous system panics.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'They don't push you away to hurt you. They push you away because closeness triggers a trauma response. The problem is—their healing isn't your job.'",
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
          text: "That weekend. You have an amazing date with Riley. Deep conversations. Holding hands. They look at you and say: 'I haven't felt this way about anyone in years.'",
          speakerId: 'riley',
          emotion: 'seductive',
        },
        {
          text: "You go home feeling incredible. Monday: nothing. Tuesday: one-word texts. Wednesday: 'Hey sorry been busy, talk later?' It's happening again.",
        },
        {
          speakerId: 'inner',
          text: "There it is. The pullback. Right when things got good.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-3a',
          text: 'Match their coolness. Give them space.',
          nextSceneId: 'fearful-4-space',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Don\'t chase the freeze. Let them come back.',
        },
        {
          id: 'fearful-3b',
          text: '"Is everything okay? You seem distant. What did I do?"',
          nextSceneId: 'fearful-4-chase',
          feedback: 'You\'re chasing. They\'ll pull back further.',
        },
        {
          id: 'fearful-3c',
          text: 'Send multiple messages trying to recreate the connection.',
          nextSceneId: 'fearful-4-flood',
          feedback: 'Flooding them when they\'re in freeze mode. This will backfire.',
        },
      ],
    },
    {
      id: 'fearful-4-flood',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'I thought we had something special.' 'Did I misread things?' 'Please talk to me.' Each message pushes them further away. Finally: 'You're being really intense right now. I need space.'",
          speakerId: 'riley',
          emotion: 'cold',
        },
        {
          text: "You became what they fear: too much, too close, too fast. Your anxiety triggered their avoidance.",
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
          speakerId: 'riley',
          emotion: 'cold',
        },
        {
          speakerId: 'inner',
          text: "The freeze. Don't take the bait.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-4ca',
          text: '"Okay. Let me know when you want to talk."',
          nextSceneId: 'fearful-5-wait',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Course correction. Give space without chasing.',
        },
        {
          id: 'fearful-4cb',
          text: '"I\'m sorry if I did something wrong."',
          nextSceneId: 'fearful-5-apologize',
          feedback: 'Apologizing for their avoidance. You didn\'t do anything wrong.',
        },
      ],
    },
    {
      id: 'fearful-5-apologize',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "'It's not you. I just need time.' But it's always 'time.' And you're always waiting. The pattern continues.",
          speakerId: 'riley',
          emotion: 'sad',
        },
        {
          text: "You've accepted their terms. Hot when they want, cold when they need, you always waiting.",
        },
      ],
      nextSceneId: 'fearful-neutral-ending',
    },
    {
      id: 'fearful-4-space',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You don't chase. Focus on your life. Gym. Friends. Work. Four days pass. Then: 'Hey... I'm sorry. I don't know what happened. Can we talk?'",
          speakerId: 'riley',
          emotion: 'sad',
        },
        {
          text: "When you didn't chase the freeze, they came out of it. Interesting.",
        },
        {
          text: "The pattern. Watch if they understand it.",
        },
      ],
      nextSceneId: 'fearful-5-talk',
    },
    {
      id: 'fearful-5-wait',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Three days of silence. Then: 'I'm sorry. I do this sometimes. Can we talk?' They reached out. Not you.",
          speakerId: 'riley',
          emotion: 'sad',
        },
        {
          text: "When you stopped chasing, they returned. That's useful information.",
        },
      ],
      nextSceneId: 'fearful-5-talk',
    },
    {
      id: 'fearful-5-talk',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'I don't know why I do this.' Riley looks genuinely distressed. 'When things get good, I panic. I pull away. I know it doesn't make sense. I'm working on it. Sort of.'",
          speakerId: 'riley',
          emotion: 'sad',
        },
        {
          text: "'Sort of?' 'I've been meaning to find a therapist. It's on my list.' On their list. For how long?",
          speakerId: 'riley',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "Self-awareness without action is just self-pity.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-5a',
          text: '"I appreciate the honesty. What are you actually DOING about it?"',
          nextSceneId: 'fearful-6-push',
          isOptimal: true,
          xpBonus: 20,
          feedback: 'Holding them accountable. Awareness isn\'t enough.',
        },
        {
          id: 'fearful-5b',
          text: '"It\'s okay. I understand. We can take things slow."',
          nextSceneId: 'fearful-6-enable',
          feedback: 'You\'re enabling the pattern. Understanding isn\'t accepting.',
        },
      ],
    },
    {
      id: 'fearful-6-enable',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "'Thank you for understanding. Most people wouldn't.' They seem relieved. Grateful. But nothing has actually changed. You've just agreed to accept the cycle.",
          speakerId: 'riley',
          emotion: 'happy',
        },
        {
          text: "Understanding their pattern isn't the same as accepting it as your reality.",
        },
      ],
      nextSceneId: 'fearful-neutral-ending',
    },
    {
      id: 'fearful-6-push',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Riley looks surprised. 'What am I doing?' 'Yeah. You know the pattern. You apologize every time. But what's different now? Are you in therapy? Reading about this? Actually changing?'",
          speakerId: 'riley',
          emotion: 'confused',
        },
        {
          text: "'I...' They pause. 'Not yet. But I will.' 'Will is future tense. I need present tense.'",
          speakerId: 'riley',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "Push. See what they do with it.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fearful-6a',
          text: '"I care about you. But I can\'t ride this rollercoaster forever."',
          nextSceneId: 'fearful-7-boundary',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Clear. Kind. Firm.',
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
          text: "Riley is quiet for a long moment. 'You're right. I've been saying I'll fix it for years. And I never do.' They look up. 'I called a therapist yesterday. First appointment is Thursday.'",
          speakerId: 'riley',
          emotion: 'neutral',
        },
        {
          text: "Action. Not words. That's new.",
          speakerId: 'riley',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "Thursday. That's specific. That's real.",
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
          feedback: 'Support with boundaries. Healthy.',
        },
        {
          id: 'fearful-7b',
          text: '"Great! I knew you could do it. We\'re going to be fine."',
          nextSceneId: 'fearful-neutral-ending',
          feedback: 'Premature celebration. One appointment isn\'t a cure.',
        },
      ],
    },
    // FEARFUL ENDINGS
    {
      id: 'fearful-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months. Riley is in therapy. Working on their attachment stuff. The cycles are less intense. Less frequent. They're learning to name the panic before it takes over.",
        },
        {
          text: "It's not perfect. But it's real. And you didn't lose yourself in their chaos. That's the win.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Stabilizing',
      endingSummary: 'They\'re doing the work. You held boundaries. The cycle is softening. Progress.',
    },
    {
      id: 'fearful-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Months pass. Hot weeks. Cold weeks. You've learned to predict the pattern. But predicting isn't the same as breaking.",
        },
        {
          text: "You're comfortable in the chaos now. That's not peace. That's just familiarity mistaken for stability.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Eternal Cycle',
      endingSummary: 'You adapted to the chaos instead of demanding change. Comfortable isn\'t the same as happy.',
      endingLearnReference: 'fearful-avoidant-101',
      endingLearnPrompt: 'Learn why chaos isn\'t chemistry.',
    },
    {
      id: 'fearful-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Your pursuit pushed them away for good. 'You're too intense. I need someone more chill.' Chill meant someone who wouldn't notice their pattern. Someone they could cycle on without consequence.",
        },
        {
          text: "The irony: their fear of intimacy made them leave the person who wanted to be close. And your fear of losing them made you push too hard. Two fears colliding.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Too Much, Too Fast',
      endingSummary: 'Your anxiety triggered their avoidance. Chasing the freeze pushed them further away.',
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
          text: "'Always working.' Dr. Chen tilts her head. 'Tell me about that.' 'Cameron is incredibly successful. But there's ALWAYS a work emergency. Cancelled dinners. Missed calls. \"Sorry babe, client crisis.\"'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'And how do you feel about it?' 'Proud? They're ambitious. But also... invisible. Like their phone is always more important than I am.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          speakerId: 'inner',
          text: "Busy is a choice. What are they avoiding?",
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
          feedback: 'Success requires sacrifice, but you shouldn\'t be the sacrifice.',
        },
      ],
    },
    {
      id: 'busy-2-excuse',
      backgroundId: 'office',
      dialog: [
        {
          text: "'Success requires sacrifice.' Dr. Chen pauses. 'Whose sacrifice? Theirs—or yours? Very successful people still find time to text back. Still keep dinner reservations. Busy is a choice about priorities.'",
          speakerId: 'therapist',
          emotion: 'concerned',
        },
        {
          text: "'The question isn't whether they're busy. The question is whether you're a priority.'",
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
          text: "'Work addiction is a socially acceptable form of avoidance. You get praised for it. \"They're so driven.\" But underneath—why can't they slow down? What happens when they're not producing?'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "'For some people, busyness is how they avoid feeling. Stillness brings emotions they'd rather not face.'",
          speakerId: 'therapist',
          emotion: 'neutral',
        },
        {
          text: "Do they ever just... stop?",
        },
      ],
      nextSceneId: 'busy-3-test',
    },
    {
      id: 'busy-3-test',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Date night. Actual in-person time. Cameron is present—for once. Then their phone buzzes. They glance at it. 'Sorry, give me one second.' One second becomes five minutes.",
          speakerId: 'cameron',
          emotion: 'neutral',
        },
        {
          text: "'Client emergency. This will just take a moment.' But you've heard this before. 'One moment' always stretches.",
        },
        {
          speakerId: 'inner',
          text: "Test time. What do you do?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'busy-3a',
          text: '"Take your time. I\'ll enjoy my wine." (But note it.)',
          nextSceneId: 'busy-4-observe',
          isOptimal: true,
          xpBonus: 10,
          feedback: 'Observe without reaction. Gather data.',
        },
        {
          id: 'busy-3b',
          text: '"This is our time. Can it wait?"',
          nextSceneId: 'busy-4-push',
          xpBonus: 15,
          feedback: 'Direct. Clear. See how they respond.',
        },
        {
          id: 'busy-3c',
          text: 'Wait quietly, checking your own phone.',
          nextSceneId: 'busy-4-passive',
          feedback: 'Passive acceptance. You\'re normalizing being second place.',
        },
      ],
    },
    {
      id: 'busy-4-passive',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Ten minutes pass. Cameron returns. 'Sorry about that. Where were we?' But the mood is broken. You've both retreated into your phones. This is what dates have become.",
        },
        {
          text: "Two people together, both elsewhere. Is this even a relationship?",
        },
      ],
      nextSceneId: 'busy-neutral-ending',
    },
    {
      id: 'busy-4-observe',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Fifteen minutes pass. Cameron returns. 'Sorry, really sorry. Crisis averted.' They notice your expression. 'You're upset.' 'Not upset. Just... noticing a pattern.'",
          speakerId: 'cameron',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "Let them sit with that.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'busy-4oa',
          text: '"I want to understand. Is work genuinely this demanding, or...?"',
          nextSceneId: 'busy-5-explore',
          isOptimal: true,
          xpBonus: 15,
          feedback: 'Curious, not accusatory. Opening a door.',
        },
        {
          id: 'busy-4ob',
          text: '"It\'s fine. Let\'s enjoy the rest of dinner."',
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
          text: "Cameron pauses. 'Can it wait?' They look at the phone. Then at you. 'I guess... yes. It can wait.' They put the phone face-down. Something shifts.",
          speakerId: 'cameron',
          emotion: 'neutral',
        },
        {
          text: "'I'm sorry. I do this a lot, don't I?' Self-awareness. Now see if it leads anywhere.",
          speakerId: 'cameron',
          emotion: 'sad',
        },
        {
          text: "They chose you over the phone. This time.",
        },
      ],
      nextSceneId: 'busy-5-explore',
    },
    {
      id: 'busy-5-explore',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'Do you ever wonder why you can't slow down?' Cameron shifts. Uncomfortable. 'What do you mean?' 'When's the last time you did nothing? Just... sat with yourself?'",
          speakerId: 'cameron',
          emotion: 'confused',
        },
        {
          text: "Long pause. 'I don't... like stillness. My mind goes places I don't want it to go.' Ah. There it is.",
          speakerId: 'cameron',
          emotion: 'sad',
        },
        {
          speakerId: 'inner',
          text: "Work is how they outrun their thoughts.",
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
          feedback: 'Go deeper. See what\'s underneath.',
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
          text: "'Work-life balance.' Cameron nods. 'You're right. I should be better about that.' But you can see it: the door that was opening just closed. Surface conversation resumed.",
          speakerId: 'cameron',
          emotion: 'neutral',
        },
        {
          text: "They'll say the right things. Make promises. And next week, another work emergency. Nothing has actually been addressed.",
        },
      ],
      nextSceneId: 'busy-neutral-ending',
    },
    {
      id: 'busy-6-vulnerable',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Cameron looks down. 'My dad. The divorce. Feeling like I have to prove something constantly or I'll... disappear? I don't know. It sounds stupid out loud.'",
          speakerId: 'cameron',
          emotion: 'sad',
        },
        {
          text: "'It doesn't sound stupid.' 'I've never said that to anyone.' The walls are coming down. Just a crack. But it's something.",
          speakerId: 'cameron',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "Vulnerability. Real vulnerability.",
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
          feedback: 'Acknowledge AND set expectations. Perfect.',
        },
        {
          id: 'busy-6b',
          text: '"I understand now. Take all the time you need with work."',
          nextSceneId: 'busy-neutral-ending',
          feedback: 'Understanding is good. But it shouldn\'t erase your needs.',
        },
      ],
    },
    {
      id: 'busy-7-boundary',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "'You're right. I use work to hide. And it's not fair to you.' Cameron takes a breath. 'What if... what if I tried therapy? Figured out why I can't stop?'",
          speakerId: 'cameron',
          emotion: 'neutral',
        },
        {
          text: "'What if' is hypothetical. 'Will you?' 'Yes. I think I need to.' Commitment. Action. Not just awareness.",
          speakerId: 'cameron',
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
          text: "Four months later. Cameron is in therapy. Learning why stillness terrified them. Work is still demanding—but there are boundaries now. Date nights that don't get cancelled.",
        },
        {
          text: "They're still ambitious. But they're also present. It took you asking 'what places' to open the door they'd kept locked. Your patience and boundaries made space for their growth.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Slowing Down',
      endingSummary: 'They\'re learning that stillness isn\'t dangerous. Work is still important—but so are you.',
    },
    {
      id: 'busy-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "The relationship continues. Cancelled plans. Work emergencies. Promises to do better. You've accepted being second to a career that will never love them back.",
        },
        {
          text: "Successful people still text back. Still show up. If they wanted to, they would. You're with someone who's chosen their laptop over your presence.",
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
          text: "Eventually you stopped trying. The relationship faded—not with drama, just with absence. Cameron barely noticed. They were too busy.",
        },
        {
          text: "A year later you see them on LinkedIn. Promoted again. Single again. Still running. You wonder if they ever stopped long enough to notice you were gone.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Fade',
      endingSummary: 'You faded out of a relationship that never fully let you in. They never noticed.',
      endingLearnReference: 'work-addiction-101',
      endingLearnPrompt: 'Learn why you can\'t compete with a career.',
    },
  ],
};
