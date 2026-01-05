// Week 11: Digital Domination
// Master the online battlefield

import type { WeeklyMission } from './types';

export const week11Mission: WeeklyMission = {
  id: 'week-11-digital-domination',
  week: 11,
  title: 'Digital Domination',
  subtitle: 'The screen is a stage. Perform accordingly.',
  description: 'The digital realm is not separate from reality—it is an extension of the battlefield. Your social media, your texting patterns, your online presence—all are tools of influence or vulnerability. This week, you master digital strategy: positioning yourself as the prize across every platform.',
  icon: 'Smartphone',
  color: '#D946EF',
  tier: 'vip',

  tacticalBrief: {
    opening: 'Most people treat digital communication casually, revealing weakness with every double-text, every thirsty post, every too-quick response. But digital is warfare by other means. Your Instagram is your highlight reel, your texting pattern is your availability signal, your online presence shapes perception. Master the digital domain or be mastered by it.',

    concepts: [
      {
        title: 'The Curated Highlight Reel',
        content: 'Your social media should project abundance, adventure, and desirability—not desperation, boredom, or availability. No sad quotes, no vague posts seeking attention, no over-sharing of mundane life. Every post should make someone think: "They are living a life I want to be part of."',
      },
      {
        title: 'Texting as Power Display',
        content: 'Response time signals value. The person who responds instantly seems to have been waiting. The person who responds when convenient seems to have a life. Never double-text. Never send "?" when they do not reply. Calm, measured, unhurried communication projects confidence.',
      },
      {
        title: 'The Strategic Post',
        content: 'Timing matters. Post when you are doing something interesting, not when you are alone and bored. Let specific people see specific things. A photo with attractive friends. An interesting location. A skill being displayed. Social media is not a diary—it is a carefully curated advertisement for you.',
      },
      {
        title: 'Digital Scarcity',
        content: 'Less is more online. The person who posts constantly seems desperate for attention. The person who posts rarely seems to be living rather than documenting. Create gaps in your digital presence. Make your appearances events, not background noise.',
      },
    ],

    keyTakeaways: [
      'Social media is a highlight reel—curate it as such',
      'Response patterns signal your value and availability',
      'Every post should project abundance and desirability',
      'Digital scarcity creates intrigue, overposting creates noise',
      'The screen is a stage—never break character',
    ],
  },

  objectives: [
    {
      id: 'w11-obj-1',
      text: 'Audit your current digital presence across all platforms',
      type: 'practice',
    },
    {
      id: 'w11-obj-2',
      text: 'Clean up anything that projects weakness or desperation',
      type: 'practice',
    },
    {
      id: 'w11-obj-3',
      text: 'Implement strategic response timing for one week',
      type: 'practice',
    },
    {
      id: 'w11-obj-4',
      text: 'Create a content strategy for projecting abundance',
      type: 'practice',
    },
    {
      id: 'w11-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w11-ex-1',
      task: 'The Digital Audit',
      context: 'Review your entire social media presence.',
      successCriteria: 'Go through your last 20 posts/stories across all platforms. For each: Does this project abundance or scarcity? Confidence or insecurity? Adventure or boredom? Be ruthless. Flag everything that shows weakness.',
      difficulty: 'beginner',
    },
    {
      id: 'w11-ex-2',
      task: 'The Purge',
      context: 'Clean up your digital presence.',
      successCriteria: 'Delete or archive: Sad quotes, vague attention-seeking posts, photos where you look desperate or sloppy, too many selfies, mundane content. Your feed should look like someone living their best life.',
      difficulty: 'beginner',
    },
    {
      id: 'w11-ex-3',
      task: 'The Response Discipline',
      context: 'Texting for one full week.',
      successCriteria: 'Implement the rule: Never respond to romantic interests in under 1 hour (unless logistics). Never double-text. Never send "?" when ignored. Document: How difficult was this? Did their pursuit increase?',
      difficulty: 'intermediate',
    },
    {
      id: 'w11-ex-4',
      task: 'The Strategic Post',
      context: 'Plan and execute one high-value post.',
      successCriteria: 'Create content that projects: you doing something interesting, surrounded by attractive people, in an aspirational location, or displaying a desirable skill. Time the post strategically. Document the response.',
      difficulty: 'intermediate',
    },
    {
      id: 'w11-ex-5',
      task: 'The Digital Persona',
      context: 'Design your online presentation strategy.',
      successCriteria: 'Write your digital brand guidelines: What will you post? What will you never post? What energy do you project? What is your response timing rule? How often will you post? Create your rulebook.',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'What did your digital audit reveal about what you have been projecting?',
    'How difficult was the response discipline? What urges did you have to resist?',
    'What content performs best for projecting the image you want?',
    'How would someone who has never met you perceive you from your social media alone?',
    'What is your ongoing digital strategy to maintain high-value presentation?',
  ],

  quiz: {
    questions: [
      {
        id: 'w11-q1',
        question: 'According to the Curated Highlight Reel principle, your social media should project:',
        options: [
          'Your authentic daily life, including struggles',
          'Abundance, adventure, and desirability—not desperation or boredom',
          'Philosophical quotes and deep thoughts',
          'As many posts as possible to stay relevant',
        ],
        correctIndex: 1,
        explanation: 'Your social media should make someone think "They are living a life I want to be part of." No sad quotes, no vague attention-seeking posts, no over-sharing of mundane life.',
      },
      {
        id: 'w11-q2',
        question: 'In Texting as Power Display, responding instantly signals:',
        options: [
          'That you are efficient and responsible',
          'That you were waiting by your phone—low value',
          'That you are interested and engaged',
          'That you have excellent communication skills',
        ],
        correctIndex: 1,
        explanation: 'The person who responds instantly seems to have been waiting. The person who responds when convenient seems to have a life. Calm, measured, unhurried communication projects confidence.',
      },
      {
        id: 'w11-q3',
        question: 'What is the key principle of the Strategic Post?',
        options: [
          'Post frequently to stay visible',
          'Always include your face in photos',
          'Post when doing something interesting, not when alone and bored',
          'Use as many hashtags as possible',
        ],
        correctIndex: 2,
        explanation: 'Timing matters. Post when you are doing something interesting, not when you are alone and bored. Social media is not a diary—it is a carefully curated advertisement for you.',
      },
      {
        id: 'w11-q4',
        question: 'Digital Scarcity means:',
        options: [
          'Never posting on social media',
          'Only using expensive devices',
          'Posting rarely so your appearances become events, not background noise',
          'Keeping your follower count low',
        ],
        correctIndex: 2,
        explanation: 'Less is more online. The person who posts constantly seems desperate for attention. The person who posts rarely seems to be living rather than documenting. Create gaps in your digital presence.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
