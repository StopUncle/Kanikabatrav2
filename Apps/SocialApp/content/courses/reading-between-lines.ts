// Reading Between Lines - VIP Course
// Advanced body language, microexpressions, and detecting deception

import { Lesson } from './dark-psychology-101';

export const readingBetweenLines: {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'vip';
  lessons: Lesson[];
} = {
  id: 'reading-between-lines',
  title: 'Reading Between Lines',
  description: 'Master the art of reading people. Decode body language, detect deception, and see what others desperately try to hide.',
  tier: 'vip',
  lessons: [
    {
      id: 'rbl-1',
      title: 'The Predator\'s Gaze',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Most people navigate the world through a fog of social conditioning—a soft-focus filter of empathy, reciprocity, and assumed good intentions. They see potential partners, friends, and allies. The predator sees something else entirely: a landscape of readable signals, a target-rich environment of truth hiding in plain sight.',
        },
        {
          type: 'quote',
          content: '"The ability to observe without evaluating is the highest form of intelligence." — Jiddu Krishnamurti',
        },
        {
          type: 'insight',
          content: 'The predator\'s gaze is not about cruelty—it\'s about clarity. It\'s the difference between being a pawn who reacts and a player who understands.',
        },
        {
          type: 'list',
          content: 'The Three Layers of Observation:',
          items: [
            'Surface: What they choose to show you (words, curated appearance)',
            'Behavioral: What they accidentally reveal (body language, micro-reactions)',
            'Pattern: What emerges over time (consistency, contradictions)',
          ],
        },
        {
          type: 'text',
          content: 'Most people only read the surface. They hear words and take them at face value. The student of human nature reads all three layers simultaneously, cross-referencing what is said against what is shown against what has been demonstrated over time.',
        },
        {
          type: 'list',
          content: 'Developing the Predator\'s Gaze:',
          items: [
            'Slow down your reactions—observe before responding',
            'Watch with soft focus—take in the whole person, not just their face',
            'Trust behavioral data over verbal claims',
            'Notice what doesn\'t happen (the absence of expected reactions)',
            'Stay emotionally detached—investment clouds observation',
          ],
        },
      ],
      keyTakeaways: [
        'Most people only read surface-level communication',
        'Body language and patterns reveal more than words',
        'Emotional detachment enables clear observation',
        'What doesn\'t happen is often as telling as what does',
      ],
      exercise: {
        title: 'The Coffee Shop Laboratory',
        description: 'Spend 45 minutes in a busy café observing human behavior.',
        steps: [
          'Choose a seat with a wide view of the room',
          'Watch 3-4 different interactions or conversations',
          'For each, note: Who is seeking? Who is granting? Who has power?',
          'Observe one person for 10 minutes—note every shift in posture, expression, attention',
          'Compare what you see to what you would have assumed at first glance',
        ],
      },
    },
    {
      id: 'rbl-2',
      title: 'Microexpressions Decoded',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'A microexpression is a brief, involuntary facial expression that occurs in response to an emotion. They last between 1/25 and 1/5 of a second—too fast for conscious control, too fast for most people to notice. But they never lie.',
        },
        {
          type: 'insight',
          content: 'The face is controlled by two neural pathways: the voluntary (conscious control) and involuntary (genuine emotion). Microexpressions emerge from the involuntary pathway before the conscious mind can suppress them.',
        },
        {
          type: 'list',
          content: 'The Seven Universal Microexpressions:',
          items: [
            'Happiness: Crow\'s feet at eyes, raised cheeks, lips pulled back symmetrically',
            'Sadness: Inner corners of eyebrows raised, lip corners pulled down',
            'Fear: Eyebrows raised and pulled together, wide eyes, slightly open mouth',
            'Anger: Lowered eyebrows, tightened lips, flared nostrils, intense stare',
            'Disgust: Wrinkled nose, raised upper lip, often asymmetrical',
            'Surprise: Raised eyebrows, wide eyes, dropped jaw (neutral, not positive/negative)',
            'Contempt: One-sided lip raise—the only asymmetrical microexpression',
          ],
        },
        {
          type: 'warning',
          content: 'Contempt is the most dangerous microexpression to receive. It signals that someone believes they are superior to you and often predicts relationship failure, betrayal, or dismissal.',
        },
        {
          type: 'list',
          content: 'Reading Microexpressions in Practice:',
          items: [
            'Watch the face at the moment of impact—when information lands',
            'The first flash (before the social mask) is the truth',
            'Look for incongruence: words saying one thing, face flashing another',
            'Pay attention to leakage in the eyes—hardest area to control',
            'Notice when someone\'s smile doesn\'t reach their eyes (social smile vs. genuine)',
          ],
        },
        {
          type: 'text',
          content: 'The Duchenne Marker: A genuine smile engages the orbicularis oculi muscle around the eyes, creating crow\'s feet. A fake smile only engages the mouth. This is nearly impossible to fake consciously.',
        },
      ],
      keyTakeaways: [
        'Microexpressions bypass conscious control',
        'The seven universal expressions are cross-cultural',
        'Contempt is the most dangerous expression to receive',
        'The eyes reveal what the mouth tries to hide',
      ],
      exercise: {
        title: 'The News Anchor Study',
        description: 'Watch video content on mute to practice reading faces.',
        steps: [
          'Find interview clips or reality TV content',
          'Watch with the sound off for 5 minutes',
          'Write down what emotions you observe in each person',
          'Note moments of incongruence (expression doesn\'t match context)',
          'Watch again with sound—compare your observations to what was said',
        ],
      },
    },
    {
      id: 'rbl-3',
      title: 'The Body Never Lies',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'The face can be trained, controlled, masked. The body is far more honest. While someone is carefully managing their expression, their feet are pointing toward the exit, their shoulders are creating barriers, and their hands are self-soothing in ways they\'ll never notice.',
        },
        {
          type: 'quote',
          content: '"The feet are the most honest part of the body." — Joe Navarro, FBI Body Language Expert',
        },
        {
          type: 'list',
          content: 'Lower Body Truth (Hardest to Control):',
          items: [
            'Feet pointing toward what they want (person, object, exit)',
            'Leg crossing toward = comfort; away = barrier',
            'Happy feet (bouncing, tapping) = positive anticipation',
            'Frozen feet = fear, anxiety, or extreme focus',
            'One foot pointed out = desire to leave the conversation',
          ],
        },
        {
          type: 'list',
          content: 'Torso and Arm Signals:',
          items: [
            'Open torso facing you = engagement and comfort',
            'Angled torso = partial attention, readiness to disengage',
            'Crossed arms = barrier (context-dependent—could be comfort too)',
            'Arm barrier with exposed wrists = defensive but not hostile',
            'Self-hugging = self-soothing, insecurity, need for comfort',
          ],
        },
        {
          type: 'list',
          content: 'Hand and Touch Signals:',
          items: [
            'Neck touching = vulnerability, discomfort, or self-soothing',
            'Face touching = stress, deception consideration, or anxiety',
            'Steepled fingers = confidence, authority',
            'Hidden hands = withholding, distrust, or discomfort',
            'Palm-up gestures = openness, honesty, seeking acceptance',
          ],
        },
        {
          type: 'insight',
          content: 'When words and body disagree, believe the body. It\'s operating on a much older and more honest neural system.',
        },
      ],
      keyTakeaways: [
        'Feet are the most honest body part',
        'Lower body is harder to consciously control',
        'Barriers (arms, torso) indicate discomfort',
        'Self-touch behaviors signal stress or anxiety',
      ],
      exercise: {
        title: 'The Foot Tracker',
        description: 'Practice reading lower body signals in conversations.',
        steps: [
          'In your next 3 conversations, consciously note foot direction',
          'Watch for changes in foot position as topics shift',
          'Notice when someone\'s feet point away while their face stays engaged',
          'Document: Topic that caused the shift + observable body change',
          'After 3 conversations, look for patterns in what causes disengagement',
        ],
      },
    },
    {
      id: 'rbl-4',
      title: 'Vocal Tells',
      duration: '8 min',
      content: [
        {
          type: 'text',
          content: 'The voice carries information beyond words. Pitch, pace, volume, and pause patterns reveal emotional states, confidence levels, and deception attempts. The trained ear hears truth hiding in the music of speech.',
        },
        {
          type: 'list',
          content: 'Pitch Signals:',
          items: [
            'Rising pitch at end = uncertainty, seeking validation',
            'Sudden pitch rise = surprise, anxiety, or stress',
            'Lower pitch = confidence, dominance, comfort',
            'Pitch instability = emotional volatility or deception stress',
            'Flat pitch = disengagement, depression, or rehearsed speech',
          ],
        },
        {
          type: 'list',
          content: 'Pace Signals:',
          items: [
            'Accelerated speech = anxiety, excitement, or trying to avoid challenge',
            'Slowed speech = careful thought, emphasis, or deception (constructing story)',
            'Sudden pace change = topic hit a nerve',
            'Rushed conclusion = desire to end topic',
            'Deliberate pausing = confidence, control, manipulation',
          ],
        },
        {
          type: 'list',
          content: 'Volume and Quality:',
          items: [
            'Volume drop = shame, guilt, or hiding information',
            'Volume increase = defensiveness, emphasis, or dominance assertion',
            'Throat clearing = discomfort, preparing to deceive, or stress',
            'Voice cracking = emotional overwhelm, fear',
            'Rehearsed smoothness = prepared script, potential deception',
          ],
        },
        {
          type: 'insight',
          content: 'Establish baseline first. Everyone has a natural speech pattern. Deviations from their personal baseline are what matter, not comparison to others.',
        },
      ],
      keyTakeaways: [
        'Voice carries emotional information beyond words',
        'Establish individual baseline before reading deviations',
        'Sudden changes in pace or pitch indicate emotional shift',
        'Over-smooth delivery may indicate rehearsed content',
      ],
      exercise: {
        title: 'The Baseline Builder',
        description: 'Establish vocal baselines for three people you interact with regularly.',
        steps: [
          'Choose 3 people: colleague, friend, family member',
          'During neutral conversations, note their normal pitch, pace, volume',
          'Document their baseline: "Normal speech = [description]"',
          'In future conversations, note any deviations from baseline',
          'Track: What topics or questions cause vocal shifts?',
        ],
      },
    },
    {
      id: 'rbl-5',
      title: 'The Digital Confession',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'A person\'s digital presence is not a reflection of their life—it is a confession of their psychological state. It is a curated museum of their insecurities, a public declaration of their needs, a real-time log of their emotional landscape. Learn to read it like tracks in snow.',
        },
        {
          type: 'list',
          content: 'Instagram/Social Media Tells:',
          items: [
            'Constant selfies with self-deprecating captions = insecurity seeking validation',
            'Gym photos with stats = vanity, need for admiration',
            'Endless "inspirational" quotes = compensation for felt inadequacy',
            'Check-ins at exclusive locations = status anxiety',
            'Polls asking for validation ("Should I...?") = decision paralysis, external locus',
            'Absence of risk in content = fear-based personality',
          ],
        },
        {
          type: 'list',
          content: 'Dating Profile Analysis:',
          items: [
            '"Just ask" = lazy, low investment, or emotionally unavailable',
            'List of demands ("no drama", "must have...") = control issues',
            'Novel-length bio = narcissistic tendencies, need to be understood',
            'Empty bio = either a player or socially avoidant',
            'Height listed to decimal = insecurity about that specific trait',
            'Sedated tiger photos = trying too hard, borrowed status',
          ],
        },
        {
          type: 'list',
          content: 'Red Flag Patterns:',
          items: [
            'No photos with friends = isolation or social difficulties',
            'Only group photos = hiding behind others, identity unclear',
            'Frequent posting then deletion = unstable self-image',
            'Aggressive ratio of followers to following = status-seeking',
            'Constant story posting = attention addiction, validation needs',
          ],
        },
        {
          type: 'insight',
          content: 'The gap between someone\'s curated digital presence and their actual life reveals their aspirational self-image—what they wish they were but aren\'t.',
        },
      ],
      keyTakeaways: [
        'Social media is psychological confession, not life reflection',
        'Patterns matter more than individual posts',
        'What\'s absent is as telling as what\'s present',
        'The gap between online and offline reveals aspirations',
      ],
      exercise: {
        title: 'The Profile Audit',
        description: 'Analyze 3 social media profiles for psychological patterns.',
        steps: [
          'Choose 3 profiles: one friend, one acquaintance, one stranger',
          'For each, note: What are they trying to project?',
          'Identify: What insecurity or need might drive this content?',
          'Look for: Inconsistencies between profile and reality (if you know them)',
          'Compare your analysis to what you know about each person',
        ],
      },
    },
    {
      id: 'rbl-6',
      title: 'Probing Without Detection',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'The probe is a question designed to elicit specific emotional responses and reveal hidden information—without the target realizing they\'re being assessed. It\'s not an interrogation. It\'s a dance of disclosure, carefully choreographed to make them feel safe while revealing their vulnerabilities.',
        },
        {
          type: 'list',
          content: 'The Confessional Probe:',
          items: [
            'Share a fabricated or exaggerated vulnerability of your own',
            'This creates reciprocity—they feel safe disclosing in return',
            'Example: "I\'m so ambitious that sometimes I worry I\'m too intimidating"',
            'This is a humble-brag that invites them to share their own concerns',
            'Their response reveals their relationship with ambition, insecurity, or intimidation',
          ],
        },
        {
          type: 'list',
          content: 'The Hypothetical Probe:',
          items: [
            'Pose a scenario that tests values without direct confrontation',
            'Example: "If you knew you\'d never be caught, would you cheat to get ahead?"',
            'Their answer reveals moral flexibility, risk tolerance, and guilt patterns',
            'Frame as philosophical discussion, not personal assessment',
            'Watch reaction as much as answer—hesitation, deflection, enthusiasm',
          ],
        },
        {
          type: 'list',
          content: 'The Third-Party Probe:',
          items: [
            'Ask about "a friend" or "someone you know" who has the trait you\'re assessing',
            'Example: "Do you know anyone who\'s really manipulative? How did you handle it?"',
            'Their stories about others reveal their own experiences and fears',
            'How they describe "bad" people reveals their own shadow',
            'Extreme reactions suggest personal experience',
          ],
        },
        {
          type: 'insight',
          content: 'The best probes feel like natural conversation. If they feel interrogated, you\'ve failed. The target should enjoy the exchange and never realize they\'ve been mapped.',
        },
      ],
      keyTakeaways: [
        'Probes feel like natural conversation, not interrogation',
        'Vulnerability invites reciprocal disclosure',
        'Hypotheticals reveal values without direct confrontation',
        'Reactions matter as much as answers',
      ],
      exercise: {
        title: 'The Probe Practice',
        description: 'Deploy one probe technique in a natural conversation.',
        steps: [
          'Choose one probe type: confessional, hypothetical, or third-party',
          'Prepare your question in advance—make it natural',
          'Deploy in casual conversation without signaling intent',
          'Observe: What did they reveal? How did they react?',
          'Document: Question asked + response + what you learned',
        ],
      },
    },
    {
      id: 'rbl-7',
      title: 'The Silence Probe',
      duration: '8 min',
      content: [
        {
          type: 'text',
          content: 'Silence is a weapon most people never learn to wield. In a world where everyone rushes to fill dead air, the person who is comfortable with silence holds extraordinary power. Strategic silence extracts information without asking questions.',
        },
        {
          type: 'quote',
          content: '"The most important thing in communication is hearing what isn\'t said." — Peter Drucker',
        },
        {
          type: 'list',
          content: 'The Mechanics of Silence:',
          items: [
            'After asking a question, wait. Do not fill the silence.',
            'Most people cannot tolerate silence beyond 4 seconds',
            'They will rush to fill it—often revealing far more than intended',
            'The longer you can stay silent, the more power you hold',
            'Silence after a weak answer forces them to elaborate or reconsider',
          ],
        },
        {
          type: 'list',
          content: 'Strategic Applications:',
          items: [
            'After a demand is made: Pause 5-7 seconds before responding',
            'After an excuse: Silence often produces the real reason',
            'After a partial answer: They\'ll usually complete it',
            'After a lie: The discomfort often produces confession or contradiction',
            'In negotiation: Whoever speaks first after the offer loses',
          ],
        },
        {
          type: 'text',
          content: 'Managing Your Own Discomfort:',
        },
        {
          type: 'list',
          content: 'Training yourself for silence:',
          items: [
            'Practice in low-stakes conversations first',
            'Mentally count to five after they finish speaking',
            'Focus on breathing to manage the urge to fill space',
            'Remind yourself: Their discomfort is revealing information',
            'The more you practice, the more natural it becomes',
          ],
        },
        {
          type: 'insight',
          content: 'The person who breaks silence first reveals who has the greater need for resolution. It\'s a power transfer in real-time.',
        },
      ],
      keyTakeaways: [
        'Silence is uncomfortable and people rush to fill it',
        'Strategic pause after questions extracts more information',
        'Whoever speaks first after tension has higher need',
        'Silence tolerance is a trainable skill',
      ],
      exercise: {
        title: 'The 5-Second Rule',
        description: 'Practice strategic silence in three conversations.',
        steps: [
          'In your next conversation, ask a meaningful question',
          'After they answer, count to 5 silently before responding',
          'Notice: Do they add more? Clarify? Get uncomfortable?',
          'Try this in 3 different conversations',
          'Document: What additional information emerged from the silence?',
        ],
      },
    },
    {
      id: 'rbl-8',
      title: 'Building Your Dossier',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'A dossier is a systematic psychological profile of an individual—a detailed map of their vulnerabilities, patterns, motivations, and predictable behaviors. It transforms scattered observations into actionable intelligence.',
        },
        {
          type: 'list',
          content: 'Core Dossier Components:',
          items: [
            'Primary Vulnerability: Insecurity, vanity, guilt, or fear?',
            'Secondary Patterns: What supporting weaknesses exist?',
            'Triggers: What topics or situations produce strong reactions?',
            'Values: What do they claim to care about vs. what do they actually protect?',
            'Patterns: How do they behave under stress? In conflict? When they want something?',
          ],
        },
        {
          type: 'list',
          content: 'Information Gathering Framework:',
          items: [
            'Observe without agenda in neutral situations first',
            'Note reactions when topics of status, money, relationships, or conflict arise',
            'Track consistency—do words match actions over time?',
            'Listen for what they criticize in others (often reveals their shadow)',
            'Watch how they treat people they don\'t need to impress',
          ],
        },
        {
          type: 'warning',
          content: 'This knowledge is for protection and understanding, not exploitation. Knowing someone\'s vulnerabilities means you have a responsibility to not weaponize that knowledge unnecessarily.',
        },
        {
          type: 'list',
          content: 'Maintaining Your Dossier:',
          items: [
            'Mental notes for casual connections',
            'Written notes for significant relationships',
            'Update as new information emerges',
            'Look for contradictions that reveal deeper truths',
            'Cross-reference behavior in different contexts',
          ],
        },
        {
          type: 'insight',
          content: 'Everyone creates a dossier on you whether they know it or not. Their impression is a collection of observations. The difference is whether you do it consciously and systematically.',
        },
      ],
      keyTakeaways: [
        'A dossier transforms observations into useful patterns',
        'Focus on primary vulnerability and supporting patterns',
        'Consistency between words and actions reveals truth',
        'How people treat those they don\'t need reveals character',
      ],
      exercise: {
        title: 'The First Dossier',
        description: 'Build a psychological profile on someone in your life.',
        steps: [
          'Choose someone you interact with regularly but don\'t know deeply',
          'Over one week, observe: reactions, patterns, topics that trigger them',
          'Document: Primary vulnerability, key triggers, behavioral patterns',
          'Note: What do they criticize in others? What do they brag about?',
          'Compile into a one-page profile: "This person is driven by... and vulnerable to..."',
        ],
      },
    },
  ],
};
