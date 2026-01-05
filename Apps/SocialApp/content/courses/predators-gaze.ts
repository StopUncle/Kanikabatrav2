// Predator's Gaze - Premium Course
// A field guide to weakness detection

import { Lesson } from './dark-psychology-101';

export const predatorsGaze: {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'vip';
  lessons: Lesson[];
} = {
  id: 'predators-gaze',
  title: "The Predator's Gaze",
  description: 'See the world as it is, not as it pretends to be. A masterclass in detecting weakness and mapping the psychological terrain of everyone you meet.',
  tier: 'premium',
  lessons: [
    {
      id: 'pg-1',
      title: 'The Four Horsemen of Weakness',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Most people navigate the world through a fog of social conditioning—a soft-focus filter of empathy and mutual vulnerability. They see potential partners and friends. You will learn to see a landscape of exploitable weakness, a target-rich environment of emotional leverage points.',
        },
        {
          type: 'insight',
          content: 'A weakness is not a flaw. A flaw is a defect. A weakness is a feature—an inherent part of the system that can be used to influence it. A person\'s greatest strengths are often their greatest weaknesses, just viewed from a different angle.',
        },
        {
          type: 'list',
          content: 'The Four Horsemen:',
          items: [
            'INSECURITY: The Black Hole of Need. They seek external validation to fill an internal void. Core belief: "I am not enough." They need you to tell them they are special because they cannot believe it themselves.',
            'VANITY: The Peacock\'s Plume. They do not love you—they love their reflection in your eyes. Addicted to admiration. Core belief: "I must be seen as superior." Their need makes them incredibly predictable.',
            'GUILT: The Martyr\'s Cross. Self-flagellating martyrs constantly looking to atone and prove their goodness. Core belief: "I must earn love through sacrifice." They will give what they cannot afford.',
            'FEAR: The Rabbit\'s Heart. Prisoners of their own anxiety, constantly scanning for threats. Core belief: "The world is dangerous." They will trade freedom for safety without hesitation.',
          ],
        },
        {
          type: 'quote',
          content: '"The compassionate are easily guilted. The ambitious are easily flattered. The loyal are easily exploited. To identify weakness is not to judge it—it is to map it."',
        },
        {
          type: 'tactic',
          content: 'Everyone has a primary weakness and usually one or two secondary weaknesses. Your job is to identify the primary driver—the core wound that shapes their behavior. This becomes your point of entry.',
        },
        {
          type: 'text',
          content: 'The empath waits to be chosen. The predator surveys the landscape, assesses options, and identifies the target. You do not hope to be chosen—you decide who is weakest. And then, you choose.',
        },
      ],
      keyTakeaways: [
        'Four primary weaknesses: Insecurity, Vanity, Guilt, Fear',
        'Weakness is a feature of the system, not a flaw',
        'Strengths viewed from another angle become weaknesses',
        'Everyone has a primary weakness driving their behavior',
        'Diagnosis comes before any attempt at influence',
      ],
      exercise: {
        title: 'Weakness Mapping',
        description: 'Practice identifying the Four Horsemen in people around you.',
        steps: [
          'Choose three people you interact with regularly',
          'For each, hypothesize their primary weakness based on behavior',
          'List specific behaviors that support your hypothesis',
          'Identify their secondary weakness',
          'Note: What does this weakness make them seek? What does it make them avoid?',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'pg-1-q1',
            question: 'What is the core belief of someone driven by VANITY?',
            options: [
              '"I am not enough"',
              '"I must be seen as superior"',
              '"I must earn love through sacrifice"',
              '"The world is dangerous"',
            ],
            correctIndex: 1,
            explanation: 'The vain have the core belief "I must be seen as superior." They do not love you—they love their reflection in your eyes. Their need for admiration makes them predictable.',
          },
          {
            id: 'pg-1-q2',
            question: 'According to this lesson, a weakness is:',
            options: [
              'A character flaw that should be fixed',
              'A moral failing',
              'A feature of the system that can be used to influence it',
              'A sign of emotional immaturity',
            ],
            correctIndex: 2,
            explanation: 'A weakness is not a flaw—it is a feature. An inherent part of the system that can be used to influence it. Strengths viewed from another angle become weaknesses.',
          },
          {
            id: 'pg-1-q3',
            question: 'Someone driven by GUILT will:',
            options: [
              'Demand constant admiration',
              'Research decisions to death',
              'Give what they cannot afford to prove their goodness',
              'Trade freedom for safety',
            ],
            correctIndex: 2,
            explanation: 'The guilt-prone are self-flagellating martyrs looking to atone. Core belief: "I must earn love through sacrifice." They will give what they cannot afford.',
          },
        ],
      },
    },
    {
      id: 'pg-2',
      title: 'Diagnostic Tells',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Each weakness has specific diagnostic tells—behavioral patterns that reveal the underlying wound. Learning to read these tells is like learning a new language. Once you see them, you cannot unsee them.',
        },
        {
          type: 'list',
          content: 'Insecurity Tells:',
          items: [
            'Fishes for compliments with false modesty: "I look so tired today"',
            'Over-apologizes for minor or imagined infractions',
            'Constantly compares themselves to others',
            'Social media is a desperate cry for validation',
            'Speaks in rushed, breathless cadence—afraid of being interrupted',
            'Uses rising inflection, turning statements into questions seeking approval',
          ],
        },
        {
          type: 'list',
          content: 'Vanity Tells:',
          items: [
            'Name-drops shamelessly and constantly steers conversations to themselves',
            'Masters of the humblebrag: "So exhausted from my Monaco trip"',
            'Social media is a highlight reel of a life they are not actually living',
            'Positions themselves as expert on topics they barely understand',
            'Tags luxury brands, exclusive locations, influential people',
          ],
        },
        {
          type: 'list',
          content: 'Guilt Tells:',
          items: [
            'Overly accommodating to the point of self-neglect',
            'Apologizes for things that are not their fault',
            'History of being "taken advantage of" by friends and family',
            'Uses therapy-speak to pathologize their own exploitation',
            'Drawn to "fixer-upper" projects—they date broken people to prove their worth',
          ],
        },
        {
          type: 'list',
          content: 'Fear Tells:',
          items: [
            'Avoids conflict at all costs—will sacrifice truth for peace',
            'Seeks constant reassurance before any decision',
            'Overly reliant on routines and plans—deviation causes anxiety',
            'Researches everything to death—information hoarding',
            'Catastrophizes: every headache is a tumor, every missed call is disaster',
          ],
        },
        {
          type: 'insight',
          content: 'The tells are not hidden. People broadcast their weaknesses constantly. Most observers are too polite or too distracted to notice. You are neither.',
        },
      ],
      keyTakeaways: [
        'Each weakness has specific behavioral patterns',
        'Tells are displayed constantly—most people just do not notice',
        'Speech patterns reveal insecurity (rushing, rising inflection)',
        'Social media is a confession of weakness',
        'Once you learn to see the tells, they become obvious',
      ],
      exercise: {
        title: 'Tell Recognition',
        description: 'Spend one day actively looking for diagnostic tells.',
        steps: [
          'Choose one of the Four Horsemen to focus on today',
          'Throughout the day, look for the specific tells associated with it',
          'Note three instances where you observed the tells in action',
          'For each instance, what other behaviors confirmed the diagnosis?',
          'Tomorrow, focus on a different weakness',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'pg-2-q1',
            question: 'A rising inflection that turns statements into questions indicates:',
            options: [
              'Vanity',
              'Guilt',
              'Insecurity',
              'Fear',
            ],
            correctIndex: 2,
            explanation: 'Rising inflection (statement sounding like a question) is a tell for insecurity—a subconscious plea for validation: "Is what I am saying okay?"',
          },
          {
            id: 'pg-2-q2',
            question: 'The "humblebrag" (e.g., "So exhausted from my Monaco trip") is a tell for:',
            options: [
              'Guilt',
              'Fear',
              'Insecurity',
              'Vanity',
            ],
            correctIndex: 3,
            explanation: 'Humblebragging—boasting disguised as a complaint—is a classic vanity tell. They are not sharing a problem; they are advertising their status.',
          },
          {
            id: 'pg-2-q3',
            question: 'Someone who talks extensively about boundaries but never enforces them is driven by:',
            options: [
              'Vanity',
              'Fear',
              'Guilt',
              'Insecurity',
            ],
            correctIndex: 2,
            explanation: 'The "boundary myth" is a guilt-prone pattern. They talk about and read about boundaries, but causing discomfort to others terrifies them, so they never enforce them.',
          },
        ],
      },
    },
    {
      id: 'pg-3',
      title: 'Probing Techniques',
      duration: '11 min',
      content: [
        {
          type: 'text',
          content: 'Once you have a hypothesis about someone\'s weakness, you must test it. The probe is not an interrogation—it is a seduction. A carefully choreographed performance designed to make them feel safe, understood, and eager to reveal their vulnerabilities.',
        },
        {
          type: 'list',
          content: 'The Confessional Probe:',
          items: [
            'Share a fabricated vulnerability to encourage them to share a real one',
            'People disclose to those who appear equally flawed',
            'Example: "I am so ambitious that sometimes I worry I am too intimidating"',
            'This signals both high status and a hint of insecurity—perfect lure for vain and insecure targets',
            'Their confession in response confirms your diagnosis',
          ],
        },
        {
          type: 'list',
          content: 'The Hypothetical Probe:',
          items: [
            'Pose a hypothetical scenario to gauge moral compass and risk tolerance',
            'Example: "If you knew you could get away with it, would you cheat to get ahead?"',
            'Their answer reveals their relationship with guilt and fear',
            'Watch their body language as they answer—more revealing than words',
            'Follow up: "What would it depend on?"',
          ],
        },
        {
          type: 'tactic',
          content: 'The Silence Probe: Ask a slightly uncomfortable question and then simply wait. Do not fill the silence. The average person is so terrified of silence that they will rush to fill it, often revealing far more than they intended.',
        },
        {
          type: 'text',
          content: 'The power of the silence probe is immense. Ask "What is your biggest regret?" then take a slow sip of your drink. Do not speak again until they have answered. Time how long it takes them to break. That duration is a measure of their anxiety.',
        },
        {
          type: 'list',
          content: 'The Opinion Probe:',
          items: [
            'Ask their opinion on a controversial topic',
            'Then disagree with them—gently at first, then more firmly',
            'Observe: Do they get defensive? Try to convert you? Shut down?',
            'Tests emotional resilience, conflict tolerance, and ego attachment',
            'The vain will fight to be right. The fearful will capitulate. The guilty will apologize for having an opinion.',
          ],
        },
        {
          type: 'insight',
          content: 'The probe reveals not just what they think, but how they process challenge and discomfort. This is more valuable than any content they share.',
        },
      ],
      keyTakeaways: [
        'Probing tests your hypothesis about their weakness',
        'Share fake vulnerability to draw out real vulnerability',
        'Silence is a powerful diagnostic tool',
        'Their reaction to disagreement reveals core patterns',
        'How they respond matters more than what they say',
      ],
      exercise: {
        title: 'The Probe Practice',
        description: 'Practice one probing technique in a real conversation.',
        steps: [
          'Choose one probe technique to practice this week',
          'Identify an appropriate low-stakes situation',
          'Execute the probe and observe their response',
          'Note: What did their response reveal about their primary weakness?',
          'Document any body language tells you observed',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'pg-3-q1',
            question: 'The Confessional Probe works by:',
            options: [
              'Asking direct questions about weaknesses',
              'Sharing fabricated vulnerability to draw out real vulnerability',
              'Confronting them about their behavior',
              'Staying silent until they talk',
            ],
            correctIndex: 1,
            explanation: 'Share a fabricated vulnerability to encourage them to share a real one. People disclose to those who appear equally flawed.',
          },
          {
            id: 'pg-3-q2',
            question: 'In the Silence Probe, why is silence so powerful?',
            options: [
              'It makes you seem mysterious',
              'Most people are terrified of it and rush to fill it, revealing more than intended',
              'It confuses them',
              'It shows dominance',
            ],
            correctIndex: 1,
            explanation: 'The average person is so terrified of silence they will rush to fill it, often revealing far more than they intended. Time how long they take to break.',
          },
          {
            id: 'pg-3-q3',
            question: 'When using the Opinion Probe, what is most revealing?',
            options: [
              'The opinion they share',
              'How they react when you disagree with them',
              'How quickly they respond',
              'Whether they agree with you',
            ],
            correctIndex: 1,
            explanation: 'The probe reveals how they process challenge and discomfort. The vain fight to be right, the fearful capitulate, the guilty apologize for having an opinion.',
          },
        ],
      },
    },
    {
      id: 'pg-4',
      title: 'Digital Profiling',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'A person\'s social media is not a reflection of their life—it is a confession of their weaknesses. It is a curated museum of their insecurities, a public declaration of their vanities, a real-time log of their fears. You must learn to read it like a predator reads tracks in the snow.',
        },
        {
          type: 'list',
          content: 'Reading the Insecure:',
          items: [
            'Constant stream of selfies with self-deprecating captions',
            'Polls asking for validation: "Should I cut my hair?"',
            'Check-ins at every trendy location',
            'Excessive editing and filtering',
            'Their feed is a desperate plea: "Please, tell me I exist"',
          ],
        },
        {
          type: 'list',
          content: 'Reading the Vain:',
          items: [
            'Gym selfies, photos with luxury items, endless inspirational quotes',
            'The quotes are really just excuses to post another picture of themselves',
            'Tags luxury brands, exclusive locations, influential people',
            'Their life is not a life—it is a marketing campaign',
            'Bonus: The man holding a large fish. Universal signal of mediocrity.',
          ],
        },
        {
          type: 'list',
          content: 'Reading the Guilt-Prone:',
          items: [
            'Endless stream of social justice infographics',
            'Public apologies for perceived slights',
            'Photos of volunteer work and charitable acts',
            'Their feed is a performance of virtue',
            'Desperate attempt to prove they are a good person',
          ],
        },
        {
          type: 'list',
          content: 'Reading the Fearful:',
          items: [
            'Absence of risk—carefully curated collection of safe, predictable experiences',
            'All-inclusive resorts, not remote adventures',
            'Photos of pets, not controversial opinions',
            'Their feed is a beige landscape of anxiety avoidance',
            'Everything is comfortable, nothing is challenging',
          ],
        },
        {
          type: 'tactic',
          content: 'The dating app bio is a confession. "Just ask" = lazy. A list of demands = control freak. A novel = narcissist. Blank = either sociopath or tourist. All useful information before you even meet.',
        },
        {
          type: 'insight',
          content: 'Spotify playlists, LinkedIn profiles, comment patterns—every digital footprint is diagnostic data. The man listening to angry music is repressing rage. The one with "CEO" of a one-person firm is drowning in vanity. Read it all.',
        },
      ],
      keyTakeaways: [
        'Social media is a confession of weakness',
        'Each platform reveals different aspects of psychology',
        'The absence of content is as revealing as its presence',
        'Dating profiles are diagnostic documents',
        'Every digital footprint can be analyzed',
      ],
      exercise: {
        title: 'Digital Profiling Practice',
        description: 'Analyze a social media profile using diagnostic frameworks.',
        steps: [
          'Choose a public profile or dating app profile to analyze',
          'Apply the Four Horsemen framework—what is their primary weakness?',
          'List three specific posts or elements that support your diagnosis',
          'What does their content reveal about what they seek?',
          'Predict: What probe would be most effective with this person?',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'pg-4-q1',
            question: 'A social media feed with constant selfies and validation-seeking polls indicates:',
            options: [
              'Vanity',
              'Fear',
              'Guilt',
              'Insecurity',
            ],
            correctIndex: 3,
            explanation: 'Constant selfies with self-deprecating captions and polls asking for validation are the insecure person\'s desperate plea: "Please, tell me I exist."',
          },
          {
            id: 'pg-4-q2',
            question: 'A feed showing only safe, predictable experiences with no risk-taking indicates:',
            options: [
              'Insecurity',
              'Vanity',
              'Fear',
              'Guilt',
            ],
            correctIndex: 2,
            explanation: 'The fearful have feeds that are beige landscapes of anxiety avoidance—all-inclusive resorts not remote adventures, pets not controversial opinions. Everything comfortable, nothing challenging.',
          },
          {
            id: 'pg-4-q3',
            question: 'According to this lesson, a blank dating profile indicates:',
            options: [
              'Genuine humility',
              'Either sociopath or tourist',
              'High value person',
              'Someone focused on substance',
            ],
            correctIndex: 1,
            explanation: 'The dating bio is a confession. Blank profiles indicate either a sociopath (no social awareness) or a tourist (not seriously looking). Both useful data points.',
          },
        ],
      },
    },
    {
      id: 'pg-5',
      title: 'Body Language Decoding',
      duration: '9 min',
      content: [
        {
          type: 'text',
          content: 'The body does not lie. While a person can control their words, they cannot control the fleeting microexpressions and unconscious shifts that betray their true emotional state. You must become a student of these unspoken confessions.',
        },
        {
          type: 'list',
          content: 'Key Microexpressions:',
          items: [
            'The Lip Purse: Tightening of lips signals anger or disagreement, even while smiling. They are biting back true feelings.',
            'The Eyebrow Flash: Quick upward movement signals surprise or interest. An involuntary sign you have captured attention.',
            'The Neck Touch: Hand to throat indicates feeling vulnerable or threatened. You have hit a nerve.',
            'The Eye Block: Covering, touching, or closing eyes signals disagreement or discomfort with what they are hearing.',
          ],
        },
        {
          type: 'tactic',
          content: 'The feet never lie. A person\'s feet will point in the direction they want to go. If talking to someone whose feet point toward the door, they are looking for escape. They are not engaged.',
        },
        {
          type: 'list',
          content: 'Cluster Reading:',
          items: [
            'One signal means nothing—look for clusters of 3+ indicators',
            'Leaning in + open posture + sustained eye contact = genuine interest',
            'Crossed arms + angled body + minimal eye contact = defensive or disengaged',
            'Forced laugh + neck touch + feet toward door = wants to escape',
            'Mirroring your movements = seeking rapport and approval',
          ],
        },
        {
          type: 'text',
          content: 'When someone is mirroring you without awareness, they are subconsciously seeking your approval. The more they mirror, the more open they are to your influence. This is both a tell and an opportunity.',
        },
        {
          type: 'list',
          content: 'Stress Indicators:',
          items: [
            'Increased blink rate signals cognitive load or deception',
            'Self-soothing touches (rubbing arms, playing with jewelry) indicate anxiety',
            'Sudden stillness—"freezing"—indicates threat detection',
            'Voice pitch rises under stress—listen for the shift',
            'Breathing becomes shallow and faster when uncomfortable',
          ],
        },
        {
          type: 'insight',
          content: 'You will learn more about human nature in one hour of silent observation than in a lifetime of listening to what people say. Words are performances. Bodies are confessions.',
        },
      ],
      keyTakeaways: [
        'The body reveals what words conceal',
        'Look for clusters, not single indicators',
        'Feet direction indicates true interest or escape desire',
        'Mirroring signals openness to influence',
        'Practice observation in public spaces',
      ],
      exercise: {
        title: 'The Observation Hour',
        description: 'Spend one hour in a public place observing body language.',
        steps: [
          'Go to a busy cafe, bar, or public space',
          'Observe couples and groups interacting',
          'For each pair: Who is leaning in? Who is leaning away?',
          'Look for clusters: What do the feet, eyes, and posture say together?',
          'Identify three people and hypothesize their weakness based on body language alone',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'pg-5-q1',
            question: 'If someone\'s feet are pointing toward the door while talking to you, it means:',
            options: [
              'They are comfortable and relaxed',
              'They are interested in you',
              'They are looking for an escape route',
              'They are being submissive',
            ],
            correctIndex: 2,
            explanation: 'Feet point in the direction we want to go. Feet toward the door means they are looking for escape—they are not engaged.',
          },
          {
            id: 'pg-5-q2',
            question: 'When reading body language, you should look for:',
            options: [
              'One clear signal',
              'Clusters of 3+ indicators',
              'Only facial expressions',
              'Only hand gestures',
            ],
            correctIndex: 1,
            explanation: 'One signal means nothing—look for clusters of 3+ indicators. Leaning in + open posture + sustained eye contact together = genuine interest.',
          },
          {
            id: 'pg-5-q3',
            question: 'When someone mirrors your movements without awareness, they are:',
            options: [
              'Trying to mock you',
              'Showing disinterest',
              'Subconsciously seeking your approval',
              'Being defensive',
            ],
            correctIndex: 2,
            explanation: 'Mirroring without awareness means they are subconsciously seeking your approval. The more they mirror, the more open they are to your influence.',
          },
        ],
      },
    },
    {
      id: 'pg-6',
      title: 'Advanced Diagnostic Patterns',
      duration: '11 min',
      content: [
        {
          type: 'text',
          content: 'A true predator goes beyond surface tells into the deeper patterns of each weakness. You must understand the nuances, the textures, the specific manifestations. This is not quick diagnosis—this is psychological profiling.',
        },
        {
          type: 'list',
          content: 'Deep Dive: Insecurity Patterns',
          items: [
            'Social Positioning: Do they gravitate to group center (compensatory narcissism) or linger on periphery (classic low self-esteem)? Both exploitable, different approaches.',
            'Self-Deprecating Humor: Jokes at their own expense are pre-emptive strikes—controlling the narrative of their inadequacy before anyone else can.',
            'Overclaiming: They exaggerate connections and achievements to feel adequate. "My good friend" means they met once.',
          ],
        },
        {
          type: 'list',
          content: 'Deep Dive: Vanity Patterns',
          items: [
            'The "Expert" Complex: Positions themselves as authority on topics they barely understand. Needs to be smartest in room.',
            'Borrowed Status: Uses tags, name-drops, and association to inflate self-importance. Their status is always referenced, never inherent.',
            'The Performance: Everything is staged. Even "candid" moments are calculated. Life is a marketing campaign for Brand Me.',
          ],
        },
        {
          type: 'list',
          content: 'Deep Dive: Guilt Patterns',
          items: [
            'The "Rescuer" Complex: Drawn to fixer-uppers and projects. Dating broken people proves their worth.',
            'The Boundary Myth: Talks extensively about boundaries, reads books about them, but never actually enforces them.',
            'The Emotional Sponge: Absorbs others\' emotions. If you are sad, they are sad. No emotional differentiation.',
          ],
        },
        {
          type: 'list',
          content: 'Deep Dive: Fear Patterns',
          items: [
            'The Information Hoarder: Researches to death before any decision. Believes enough information eliminates risk.',
            'The Routine Tyrant: Any deviation from routine causes disproportionate anxiety. Become part of their routine to control them.',
            'The Catastrophizer: Every situation spirals to worst-case. A headache is a tumor. A missed call is a death. They live in a horror movie of their own creation.',
          ],
        },
        {
          type: 'insight',
          content: 'The deep patterns reveal not just what someone is, but how to approach them. The insecure need to feel special. The vain need an audience. The guilty need to rescue. The fearful need safety. Offer what they lack.',
        },
        {
          type: 'quote',
          content: '"The empath enters the world with an open heart, hoping to find connection. The predator enters with open eyes, mapping the terrain and tracking the movements of prey."',
        },
      ],
      keyTakeaways: [
        'Surface tells lead to deeper patterns',
        'Each weakness has multiple manifestations',
        'Understanding the pattern reveals the approach',
        'Deep diagnosis takes time but yields precision',
        'Know their pattern, know how to approach',
      ],
      exercise: {
        title: 'The Full Profile',
        description: 'Create a complete psychological profile of someone you want to understand.',
        steps: [
          'Choose one person for deep analysis',
          'Identify their primary weakness and two secondary weaknesses',
          'List specific behaviors supporting each diagnosis',
          'Analyze their social media using the frameworks',
          'Predict: What do they most want that they cannot give themselves?',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'pg-6-q1',
            question: 'The "Rescuer Complex" is a deep pattern of which weakness?',
            options: [
              'Insecurity',
              'Vanity',
              'Fear',
              'Guilt',
            ],
            correctIndex: 3,
            explanation: 'The guilt-prone are drawn to fixer-uppers and projects. Dating broken people proves their worth. They need to rescue to feel valuable.',
          },
          {
            id: 'pg-6-q2',
            question: 'Someone who uses self-deprecating humor frequently is:',
            options: [
              'Genuinely humble',
              'Making pre-emptive strikes against their own inadequacy',
              'Showing high confidence',
              'Being manipulative',
            ],
            correctIndex: 1,
            explanation: 'Self-deprecating humor in the insecure is a pre-emptive strike—controlling the narrative of their own inadequacy before anyone else can. It is a confession, not comedy.',
          },
          {
            id: 'pg-6-q3',
            question: 'Understanding deep patterns reveals:',
            options: [
              'Whether someone is a good person',
              'How to approach and influence them',
              'Their childhood trauma',
              'Their relationship history',
            ],
            correctIndex: 1,
            explanation: 'Deep patterns reveal not just what someone is, but how to approach them. The insecure need to feel special, the vain need an audience, the guilty need to rescue, the fearful need safety.',
          },
        ],
      },
    },
  ],
};
