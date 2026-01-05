// The Transformation Protocol - Premium Course
// Strategic self-construction from the ground up

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: LessonContent[];
  keyTakeaways: string[];
  exercise?: Exercise;
}

export interface LessonContent {
  type: 'text' | 'quote' | 'list' | 'warning' | 'insight' | 'tactic';
  content: string;
  items?: string[];
}

export interface Exercise {
  title: string;
  description: string;
  steps: string[];
}

export const transformationProtocol: {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'vip';
  lessons: Lesson[];
} = {
  id: 'transformation-protocol',
  title: 'The Transformation Protocol',
  description: 'You are not born magnetic. Magnetism is a skill that can be learned, practiced, and perfected. This is your blueprint for strategic self-construction.',
  tier: 'premium',
  lessons: [
    {
      id: 'tp-1',
      title: 'The Philosophy of Self-Construction',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Most people approach self-improvement like they approach dieting: with good intentions, temporary motivation, and inevitable failure. They want to "be themselves" while somehow becoming more attractive. They want to "stay authentic" while magically becoming more magnetic.',
        },
        {
          type: 'insight',
          content: 'Authenticity is the enemy of transformation. Your authentic self is the person who got you into your current situation. If your authentic self was working, you would not be here seeking change.',
        },
        {
          type: 'text',
          content: 'The Transformation Protocol rejects authenticity in favor of strategic construction. You will not be discovering who you really are—you will be deciding who you want to be and then becoming that person through deliberate, systematic effort.',
        },
        {
          type: 'quote',
          content: '"The butterfly does not apologize to the caterpillar for abandoning its former identity. Neither will you."',
        },
        {
          type: 'list',
          content: 'The Core Transformation Principles:',
          items: [
            'Transformation is a decision, not a discovery—you choose who to become',
            'Personality is not fixed—it is fluid, adaptable, and under your conscious control',
            'Evolution requires letting go of who you were to become who you will be',
            'Strategic construction produces better results than hoping for organic change',
            'Every aspect of yourself can be weaponized in service of your goals',
          ],
        },
        {
          type: 'tactic',
          content: 'This is not about lying or pretending. This is about evolution. You are not becoming someone fake—you are becoming someone more effective. The women who seem naturally magnetic have simply mastered what you are about to learn.',
        },
        {
          type: 'text',
          content: 'You will learn to rebuild yourself from the ground up—your body, your mind, your voice, your presence. Not as the person you were born to be, but as the person you choose to become.',
        },
        {
          type: 'insight',
          content: 'The women who command attention without trying, who have men orbiting them like planets around the sun—they are not naturally superior. They have mastered the art of strategic self-construction. Now you will too.',
        },
      ],
      keyTakeaways: [
        'Authenticity keeps you where you are—strategy takes you where you want to go',
        'Transformation is a choice and a skill, not a gift',
        'Letting go of your old self is required for evolution',
        'Natural magnetism is learned, not inherited',
        'Every aspect of yourself can become a weapon',
      ],
      exercise: {
        title: 'The Transformation Audit',
        description: 'Honestly assess what needs to change and commit to the process.',
        steps: [
          'Write down five things about your "authentic self" that are not serving your goals',
          'For each, describe the transformed version you want to embody instead',
          'Identify which aspects of yourself you have been afraid to change',
          'Write a commitment statement: "I choose to become..." and describe your new self',
          'Set a 90-day deadline for noticeable transformation in at least one area',
        ],
      },
    },
    {
      id: 'tp-2',
      title: 'The Mask Collection',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Those who win understand something the rest refuse to accept: personality is not fixed. It is fluid, adaptable, and entirely under conscious control. They do not have "one true self"—they have a collection of masks deployed strategically based on the situation and desired outcome.',
        },
        {
          type: 'insight',
          content: 'You will learn to do the same. Your mask collection should include at least five distinct personas, each designed to appeal to different types of people and social situations.',
        },
        {
          type: 'list',
          content: 'The Five Essential Masks:',
          items: [
            'The Innocent: Sweet, slightly naive, in need of guidance. Appeals to protector types and traditional values. Makes others feel strong and needed.',
            'The Intellectual: Sharp, well-read, capable of sophisticated conversation. Appeals to those who pride themselves on intelligence. Makes others feel intellectually stimulated.',
            'The Adventurer: Spontaneous, fearless, always up for new experiences. Appeals to those who see themselves as exciting. Makes life feel like an adventure.',
            'The Nurturer: Caring, supportive, emotionally intelligent. Appeals to those who are stressed or dealing with difficulties. Makes others feel understood and cared for.',
            'The Mystery: Enigmatic, slightly aloof, impossible to fully understand. Appeals to those who enjoy the chase. Makes others feel like they are solving a fascinating puzzle.',
          ],
        },
        {
          type: 'tactic',
          content: 'The key to effective mask deployment is reading your audience. A venture capitalist might be attracted to The Intellectual, while a personal trainer might prefer The Adventurer. A stressed executive might need The Nurturer, while a successful CEO might be intrigued by The Mystery.',
        },
        {
          type: 'text',
          content: 'You are not being fake—you are being strategic. Every successful person understands the importance of adapting their presentation to their audience. Politicians do it. CEOs do it. Celebrities do it. You are simply applying this principle to all areas of life.',
        },
        {
          type: 'quote',
          content: '"We do not have a true self in the way you understand it. We have a collection of selves, each one calibrated for maximum effectiveness."',
        },
        {
          type: 'list',
          content: 'Reading Which Mask to Deploy:',
          items: [
            'Protector types respond to vulnerability—deploy The Innocent',
            'Intellectuals respond to wit—deploy The Intellectual',
            'Thrill-seekers respond to spontaneity—deploy The Adventurer',
            'The overwhelmed respond to comfort—deploy The Nurturer',
            'Pursuers respond to elusiveness—deploy The Mystery',
          ],
        },
        {
          type: 'insight',
          content: 'Most people are predictable in what they seek. Your job is to become unpredictably perfect for whatever they need. The mask you wear is not deception—it is communication in their language.',
        },
      ],
      keyTakeaways: [
        'Personality is fluid and controllable, not fixed',
        'Five masks cover most situations you will encounter',
        'Reading your audience determines which mask to deploy',
        'Adaptation is strategy, not fakeness',
        'The best communicators speak every emotional language',
      ],
      exercise: {
        title: 'Mask Development Practice',
        description: 'Develop your mask collection through deliberate practice.',
        steps: [
          'Choose the mask that feels least natural to you',
          'Write down specific mannerisms, phrases, and behaviors for that mask',
          'Practice in front of a mirror—voice, posture, facial expressions',
          'Deploy it in a low-stakes social situation this week',
          'Note what felt forced vs. what came surprisingly naturally',
        ],
      },
    },
    {
      id: 'tp-3',
      title: 'Physical Presence as Weapon',
      duration: '11 min',
      content: [
        {
          type: 'text',
          content: 'Your body is your most powerful tool. It is the first thing people notice, the primary factor in initial attraction, and the foundation upon which all other impressions are built. This is not about body positivity—this is about market positioning.',
        },
        {
          type: 'warning',
          content: 'The dating marketplace is brutal and unforgiving. Pretending otherwise is a luxury you cannot afford. You can love yourself while still demanding more from yourself.',
        },
        {
          type: 'list',
          content: 'The Non-Negotiable Physical Standards:',
          items: [
            'Fitness: Visible health, energy, and discipline. Not about a number—about projecting vitality.',
            'Posture: Move like a predator, not prey. Shoulders back, chin up, deliberate movements. Take up space unapologetically.',
            'Grooming: Every detail perfected. Hair, skin, nails—you are a work of art and every brushstroke matters.',
            'Wardrobe: Communicate status, taste, and intention in precisely calibrated doses. Quality over quantity.',
          ],
        },
        {
          type: 'tactic',
          content: 'Walk like you own every room you enter. Not aggressively—confidently. The difference between someone who belongs and someone who is hoping to belong is visible from across the room.',
        },
        {
          type: 'list',
          content: 'The 90-Day Physical Protocol:',
          items: [
            'Days 1-30 - Foundation: Establish daily habits (exercise, skincare, nutrition). Eliminate sabotaging behaviors. Invest in professional consultations.',
            'Days 31-60 - Refinement: Increase intensity. Add advanced treatments. Refine wardrobe. Begin movement training (dance, yoga, or martial arts).',
            'Days 61-90 - Optimization: Fine-tune everything. Master signature looks. Perfect posture until it is unconscious.',
          ],
        },
        {
          type: 'quote',
          content: '"By day 90, you should be unrecognizable from your former self. Not just improved—fundamentally transformed into a different category of person."',
        },
        {
          type: 'text',
          content: 'The goal is not perfection according to some external standard. The goal is becoming the most powerful version of yourself physically—someone who commands attention simply by existing in a space.',
        },
        {
          type: 'insight',
          content: 'Your physical presence communicates before you speak a single word. It announces your standards, your discipline, and your self-respect. It is the foundation that everything else is built upon.',
        },
      ],
      keyTakeaways: [
        'Physical presence is your most immediate form of communication',
        'Four non-negotiables: fitness, posture, grooming, wardrobe',
        '90 days of focused effort creates transformational change',
        'Movement and posture project power before words are spoken',
        'Your body announces your standards to everyone who sees you',
      ],
      exercise: {
        title: 'Physical Audit and Protocol',
        description: 'Create your personalized 90-day physical transformation plan.',
        steps: [
          'Take photos from multiple angles—this is your starting point',
          'Rate yourself 1-10 on each non-negotiable (fitness, posture, grooming, wardrobe)',
          'Identify your lowest score—this is your priority focus',
          'Create specific daily habits to address each area',
          'Schedule professional help for at least one area (trainer, stylist, dermatologist)',
        ],
      },
    },
    {
      id: 'tp-4',
      title: 'Mental Rewiring',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Physical transformation is only half the battle. The most beautiful person in the world will fail if they have the psychology of a victim. You must rewire your mental programming to think, feel, and react like someone who wins.',
        },
        {
          type: 'insight',
          content: 'Your empathic programming is the enemy of your success. It makes you prioritize others\' feelings over your own goals, seek approval instead of respect, and give away your power in exchange for temporary validation.',
        },
        {
          type: 'list',
          content: 'The Mental Rewiring Process:',
          items: [
            'From Guilt to Strategy: When you feel guilty about prioritizing yourself, remind yourself that everyone is prioritizing themselves. The only question is whether you are doing it effectively.',
            'From Anxiety to Analysis: When you feel anxious about a situation, shift into analytical mode. What are the power dynamics? What does each person want? How can you position yourself advantageously?',
            'From Attachment to Assessment: When you develop feelings for someone, begin assessing their value objectively. What do they bring to your life? How do they advance your goals?',
            'From Reaction to Response: When someone provokes you emotionally, pause and choose your response strategically. What outcome do you want? What response will achieve it?',
          ],
        },
        {
          type: 'list',
          content: 'The Core Beliefs to Adopt:',
          items: [
            '"I am the prize." You are not competing for attention; others are competing for yours. This is not arrogance—it is accurate self-positioning.',
            '"Everyone has an agenda." No one does anything purely out of kindness. Your job is to identify agendas and decide if engaging serves your interests.',
            '"Emotions are tools, not masters." You feel what you feel, then decide what to do based on strategy, not impulse.',
            '"Power is never given, only taken." No one will hand you the life you want. You must take it through superior strategy and execution.',
            '"Weakness is a choice." You are not a victim of circumstances. You are the author of your story, and you choose strength in every chapter.',
          ],
        },
        {
          type: 'tactic',
          content: 'When faced with an emotionally charged situation, pause for three seconds before responding. In those three seconds, ask: "What is the strategic response here?" Then respond from strategy, not emotion.',
        },
        {
          type: 'quote',
          content: '"The absence of anxiety is a superpower. While others agonize over what might go wrong, the strategist acts with precision."',
        },
      ],
      keyTakeaways: [
        'Mental programming can be rewritten through deliberate practice',
        'Shift from reactive emotion to strategic response',
        'Five core beliefs reprogram your default thinking',
        'Emotions inform but do not control your decisions',
        'Choosing strength over weakness is a daily practice',
      ],
      exercise: {
        title: 'The Belief Installation',
        description: 'Begin rewiring your mental programming with new beliefs.',
        steps: [
          'Write each of the five core beliefs on separate cards',
          'Read them aloud morning and night for 30 days',
          'When you catch yourself thinking a disempowering thought, replace it with the relevant belief',
          'Keep a log: What situation triggered old thinking? What belief did you install instead?',
          'At the end of 30 days, note which beliefs now feel natural vs. still require effort',
        ],
      },
    },
    {
      id: 'tp-5',
      title: 'Strategic Conversation',
      duration: '11 min',
      content: [
        {
          type: 'text',
          content: 'Social skills are not innate talents—they are learnable techniques. The people who seem naturally charismatic have simply mastered the mechanics of human psychology and social dynamics. Every conversation is a chess match where you exchange information while positioning yourself and influencing outcomes.',
        },
        {
          type: 'list',
          content: 'The Four Moves of Strategic Conversation:',
          items: [
            'The Opening Gambit: Your first words set the tone. Never open with something boring or predictable. "How are you?" is for amateurs. Something unexpected that sparks curiosity is for professionals.',
            'Information Asymmetry: You should always know more about them than they know about you. Ask revealing questions. Share about yourself strategically and sparingly.',
            'The Emotional Thermostat: Control the emotional temperature. If they are too serious, inject humor. If too casual, add depth. If too comfortable, create tension. You are the conductor.',
            'The Strategic Exit: Always leave them wanting more. End conversations at their peak, not when they decline. "I have to go, but this has been fascinating" is infinitely more powerful than letting it die naturally.',
          ],
        },
        {
          type: 'tactic',
          content: 'The Information Asymmetry Technique: For every piece of personal information you share, extract three from them. Ask follow-up questions. Show genuine curiosity. People love talking about themselves—use this.',
        },
        {
          type: 'list',
          content: 'The Power of Strategic Vulnerability:',
          items: [
            'Acceptable: Past challenges that show depth, ambitious goals that reveal drive, creative pursuits that showcase passion',
            'Unacceptable: Current instabilities, financial problems, relationship failures that reveal poor judgment, deep insecurities that make you seem weak',
            'Goal: Seem human and relatable without seeming damaged or high-maintenance',
          ],
        },
        {
          type: 'text',
          content: 'Vulnerability is a weapon when deployed correctly. The key is to be vulnerable about things that make you more attractive, not less. Share your ambitions, not your anxieties. Share growth from past struggles, not current spiraling.',
        },
        {
          type: 'quote',
          content: '"The person who controls the flow of conversation controls the power dynamic. Master the art of strategic interruption—not rudely, but by redirecting with such confidence it seems natural."',
        },
        {
          type: 'insight',
          content: 'Whoever asks the questions controls the conversation. Whoever controls the conversation controls the relationship. Questions are not just for gathering information—they are for establishing who is seeking and who is selecting.',
        },
      ],
      keyTakeaways: [
        'Charisma is a learnable skill, not an innate gift',
        'Four moves: opening, information asymmetry, emotional control, strategic exit',
        'Share vulnerabilities that enhance your image, not damage it',
        'Questions establish power dynamics—the asker often controls',
        'Leave every conversation with them wanting more',
      ],
      exercise: {
        title: 'Conversation Mastery Practice',
        description: 'Practice strategic conversation techniques in real interactions.',
        steps: [
          'Prepare three unexpected opening lines for different situations (networking, social, dating)',
          'In your next three conversations, practice 3:1 information ratio (get three facts for every one you share)',
          'Notice emotional temperature—practice adjusting it consciously',
          'End at least one conversation at its peak this week with a strategic exit',
          'Debrief each conversation: What worked? What felt forced? What to refine?',
        ],
      },
    },
    {
      id: 'tp-6',
      title: 'Lifestyle Architecture',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Your lifestyle is your personal brand made manifest. Every choice you make—where you live, what you do, how you spend your time—communicates something about your value and status. Strategic lifestyle architecture positions you in the same ecosystems as the people you want in your life.',
        },
        {
          type: 'list',
          content: 'The Hierarchy of Lifestyle Signals:',
          items: [
            'Tier 1 - High Impact: Physical appearance, living situation/neighborhood, professional success, social connections',
            'Tier 2 - Medium Impact: Wardrobe and style, hobbies and interests, travel experiences, cultural sophistication',
            'Tier 3 - Lower Impact: Possessions, gadgets, entertainment preferences, consumption patterns',
          ],
        },
        {
          type: 'tactic',
          content: 'Invest heavily in Tier 1 signals, moderately in Tier 2, and minimally in Tier 3. A small apartment in a prestigious area beats a large house in a mediocre one. Your social calendar should be a strategic document, not a random collection of activities.',
        },
        {
          type: 'list',
          content: 'Strategic Positioning Principles:',
          items: [
            'Geographic: Live in the right area, even if it means sacrificing space. Location is a constant signal.',
            'Professional: Choose paths that put you in contact with the people you want to know. Your career is networking.',
            'Social: Join the right organizations, attend the right events. Every social choice is a strategic choice.',
            'Digital: Your online presence should reflect the life you want, curated like an art exhibition.',
          ],
        },
        {
          type: 'text',
          content: 'You do not need to be wealthy, but you need to look like you belong in high-value environments. This is about understanding quality, appreciating excellence, and not embarrassing yourself in sophisticated situations.',
        },
        {
          type: 'list',
          content: 'The Strategic Investment Hierarchy:',
          items: [
            'Your body: The highest ROI investment you can make',
            'Your skills: Languages, cultural knowledge, social graces open doors',
            'Your experiences: Travel, dining, cultural events shape your perspective',
            'Your wardrobe: Few high-quality pieces beat many cheap ones',
            'Your possessions: Last priority—only if truly impressive',
          ],
        },
        {
          type: 'quote',
          content: '"True sophistication is quiet. New money is loud; old money whispers. If you are going to project wealth, study how truly wealthy people behave—they assume quality and expect service. Their confidence comes from security, not insecurity."',
        },
        {
          type: 'insight',
          content: 'Your lifestyle creates your social ecosystem. If you want to meet certain types of people, you must exist where they exist, participate in what they participate in, and signal that you belong in their world. Architecture your lifestyle to attract what you want.',
        },
      ],
      keyTakeaways: [
        'Lifestyle signals communicate your value before you speak',
        'Tier 1 signals deserve most of your investment',
        'Strategic positioning places you in the right ecosystems',
        'Quality over quantity in every category',
        'Build a life that attracts what you want',
      ],
      exercise: {
        title: 'Lifestyle Architecture Plan',
        description: 'Design and begin implementing strategic lifestyle changes.',
        steps: [
          'Audit your current Tier 1 signals—rate each 1-10',
          'Identify one Tier 1 signal to improve in the next 90 days',
          'List three events or organizations that would put you in strategic ecosystems',
          'Audit your social calendar for the past month—how much was strategic vs. default?',
          'Create a "lifestyle vision" for 12 months from now—what signals will you be projecting?',
        ],
      },
    },
  ],
};
