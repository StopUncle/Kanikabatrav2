// Strategic Recommendations
// Context-aware advice based on analysis results

import { Recommendation, PowerScore, PowerBalance } from './types';

// Recommendations based on power balance
export const powerBalanceRecommendations: Record<PowerBalance, Recommendation[]> = {
  strong: [
    {
      id: 'strong_maintain',
      priority: 'low',
      title: 'Maintain Your Position',
      description: 'You\'re in a strong position. Don\'t sabotage it by over-investing.',
      action: 'Continue mirroring their energy and maintaining your standards.',
      category: 'power',
    },
    {
      id: 'strong_reward',
      priority: 'medium',
      title: 'Reward Good Behavior',
      description: 'When they invest, acknowledge it warmly.',
      action: 'Match their effort when they show up, but don\'t exceed it.',
      category: 'communication',
    },
  ],
  equal: [
    {
      id: 'equal_healthy',
      priority: 'low',
      title: 'Healthy Dynamic',
      description: 'This is a balanced exchange. Both parties are investing similarly.',
      action: 'Continue being yourself. This is sustainable.',
      category: 'communication',
    },
    {
      id: 'equal_authentic',
      priority: 'low',
      title: 'Stay Authentic',
      description: 'Don\'t play games when things are going well.',
      action: 'Be genuine and let connection develop naturally.',
      category: 'communication',
    },
  ],
  weak: [
    {
      id: 'weak_pullback',
      priority: 'high',
      title: 'Pull Back Strategically',
      description: 'You\'re over-investing compared to them.',
      action: 'Reduce your texting frequency. Match their response time.',
      category: 'power',
    },
    {
      id: 'weak_focus',
      priority: 'high',
      title: 'Focus on Yourself',
      description: 'Shift energy to your own life and interests.',
      action: 'Post about your activities. Be genuinely busy, not fake busy.',
      category: 'power',
    },
    {
      id: 'weak_boundaries',
      priority: 'medium',
      title: 'Set Clear Boundaries',
      description: 'Don\'t accept less than you deserve.',
      action: 'State what you need calmly and clearly. Be willing to walk away.',
      category: 'boundaries',
    },
  ],
  submissive: [
    {
      id: 'submissive_stop',
      priority: 'critical',
      title: 'Stop Chasing Immediately',
      description: 'You\'re pursuing someone who isn\'t meeting you halfway.',
      action: 'Go silent. Focus entirely on yourself for at least 2 weeks.',
      category: 'power',
    },
    {
      id: 'submissive_value',
      priority: 'critical',
      title: 'Recognize Your Value',
      description: 'You\'re giving away your power. This dynamic isn\'t healthy.',
      action: 'Ask yourself: would you accept this treatment for a friend?',
      category: 'boundaries',
    },
    {
      id: 'submissive_consider',
      priority: 'high',
      title: 'Consider Walking Away',
      description: 'Someone who makes you chase isn\'t your person.',
      action: 'Evaluate if this connection is worth your energy.',
      category: 'exit',
    },
  ],
};

// Recommendations based on specific patterns detected
export const patternRecommendations: Record<string, Recommendation> = {
  // Chase patterns
  double_texting: {
    id: 'rec_double_text',
    priority: 'high',
    title: 'Stop Double Texting',
    description: 'Multiple unanswered messages signals desperation.',
    action: 'One message, then wait. If they don\'t respond, they\'re not interested enough.',
    category: 'power',
  },
  over_explaining: {
    id: 'rec_over_explain',
    priority: 'medium',
    title: 'Stop Justifying Yourself',
    description: 'Over-explaining signals insecurity.',
    action: 'State your position once, clearly. Let them accept or reject it.',
    category: 'communication',
  },
  seeking_validation: {
    id: 'rec_validation',
    priority: 'high',
    title: 'Stop Seeking Reassurance',
    description: 'Constantly asking "are we okay?" pushes people away.',
    action: 'Assume positive intent. If unsure, give them space to come to you.',
    category: 'power',
  },

  // Red flags
  narc_devalue: {
    id: 'rec_narc_devalue',
    priority: 'critical',
    title: 'Recognize Devaluation',
    description: 'Backhanded compliments are a control tactic.',
    action: 'This is a major red flag. Consider if this person respects you.',
    category: 'exit',
  },
  narc_compare: {
    id: 'rec_narc_compare',
    priority: 'critical',
    title: 'Don\'t Compete',
    description: 'Triangulation is manipulation. You shouldn\'t have to compete.',
    action: 'Call it out calmly: "I\'m not interested in comparisons."',
    category: 'boundaries',
  },
  avoidant_distance: {
    id: 'rec_avoidant',
    priority: 'medium',
    title: 'Give Space, Don\'t Chase',
    description: 'Avoidants pull away when overwhelmed. Chasing makes it worse.',
    action: 'Say "I understand. Reach out when you\'re ready." Then go silent.',
    category: 'power',
  },
  player_vague: {
    id: 'rec_player_vague',
    priority: 'high',
    title: 'Ask for Clarity',
    description: 'Vague intentions protect their options, not your heart.',
    action: 'After reasonable time, ask directly what they\'re looking for.',
    category: 'boundaries',
  },
  breadcrumb_sporadic: {
    id: 'rec_breadcrumb',
    priority: 'high',
    title: 'Demand Consistency',
    description: 'Sporadic contact keeps you on the hook without commitment.',
    action: 'Stop responding immediately. Make them wait or don\'t respond at all.',
    category: 'power',
  },

  // Low effort
  low_effort: {
    id: 'rec_low_effort',
    priority: 'medium',
    title: 'Mirror Their Energy',
    description: 'Don\'t write paragraphs to someone sending single words.',
    action: 'Match their investment. If they send "k", you send nothing.',
    category: 'power',
  },
  low_plans: {
    id: 'rec_low_plans',
    priority: 'high',
    title: 'Stop Accepting "Maybe"',
    description: 'Vague plans are no plans. Interested people make time.',
    action: 'Say "Let me know when you have a specific day in mind." Then wait.',
    category: 'boundaries',
  },
};

// General strategic advice
export const generalStrategies: Recommendation[] = [
  {
    id: 'gen_mirror',
    priority: 'medium',
    title: 'Mirror Their Energy',
    description: 'Match their investment level, don\'t exceed it.',
    action: 'Response time, message length, emoji usage - mirror it all.',
    category: 'power',
  },
  {
    id: 'gen_busy',
    priority: 'medium',
    title: 'Have Your Own Life',
    description: 'The most attractive trait is having options and interests.',
    action: 'Stay genuinely busy with friends, hobbies, and goals.',
    category: 'power',
  },
  {
    id: 'gen_mystery',
    priority: 'low',
    title: 'Maintain Some Mystery',
    description: 'Don\'t reveal everything too quickly.',
    action: 'Answer questions, but leave them wanting to know more.',
    category: 'communication',
  },
  {
    id: 'gen_walk',
    priority: 'high',
    title: 'Be Willing to Walk Away',
    description: 'The ultimate power is not needing the outcome.',
    action: 'Know your dealbreakers. Enforce them without drama.',
    category: 'boundaries',
  },
];

// Response templates for common situations
export const responseTemplates = {
  late_night_text: [
    'I\'m sleeping at healthy hours now 😴',
    'Text me during the day if you want to make plans.',
    '[No response]',
  ],
  breadcrumb_return: [
    'Hey! Yeah, been good. Pretty busy lately.',
    'Oh hey. What\'s up?',
    '[24-48 hour delay, then short response]',
  ],
  vague_plans: [
    'Sounds fun! Let me know when you have a specific day.',
    'Maybe works. Text me when you know for sure.',
    'I\'m pretty booked up. Need specifics to hold time.',
  ],
  guilt_trip: [
    'I\'m sorry you feel that way.',
    'I understand. I still need to [boundary].',
    'That\'s your choice to feel that way.',
  ],
  silent_treatment: [
    '[No chasing. Live your life.]',
    'I\'m here when you\'re ready to talk.',
    '[Wait for them to reach out]',
  ],
  hot_cold: [
    'Take your time. You know where to find me.',
    'I understand you need space. Reach out when ready.',
    '[Pull back and mirror their energy]',
  ],
};

// Function to get recommendations based on analysis
export function getRecommendations(
  powerScore: { balance: PowerBalance },
  detectedPatternIds: string[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Add power balance recommendations
  const balanceRecs = powerBalanceRecommendations[powerScore.balance];
  recommendations.push(...balanceRecs);

  // Add pattern-specific recommendations
  for (const patternId of detectedPatternIds) {
    if (patternRecommendations[patternId]) {
      recommendations.push(patternRecommendations[patternId]);
    }
  }

  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Deduplicate by category if too many
  const seen = new Set<string>();
  return recommendations.filter(r => {
    const key = `${r.category}-${r.priority}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 5); // Max 5 recommendations
}

// Priority colors
export const priorityColors = {
  critical: '#EF4444',
  high: '#F97316',
  medium: '#F59E0B',
  low: '#22C55E',
};

export const categoryIcons = {
  power: 'Crown',
  boundaries: 'Shield',
  communication: 'MessageSquare',
  exit: 'LogOut',
};
