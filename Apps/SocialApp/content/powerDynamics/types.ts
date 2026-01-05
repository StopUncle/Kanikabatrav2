// Power Dynamics Analysis Types
// For analyzing text conversations to identify power balance

export type PowerBalance = 'strong' | 'equal' | 'weak' | 'submissive';

export interface PowerIndicator {
  id: string;
  name: string;
  description: string;
  category: 'chase' | 'investment' | 'frame' | 'availability' | 'emotional';
  direction: 'positive' | 'negative'; // positive = increases YOUR power
  weight: number; // 1-10 impact on score
  patterns: RegExp[];
}

export interface ChasePattern {
  id: string;
  name: string;
  description: string;
  type: 'chasing' | 'being_chased' | 'push' | 'pull';
  severity: 'mild' | 'moderate' | 'severe';
  patterns: RegExp[];
  recommendation: string;
}

export interface RedFlag {
  id: string;
  name: string;
  description: string;
  category: 'avoidant' | 'narcissist' | 'player' | 'low_interest' | 'breadcrumb';
  severity: 1 | 2 | 3; // 1 = yellow, 2 = orange, 3 = red
  patterns: RegExp[];
  defense: string;
}

export interface GreenFlag {
  id: string;
  name: string;
  description: string;
  category: 'investment' | 'consistency' | 'respect' | 'effort';
  weight: number;
  patterns: RegExp[];
}

export interface PowerScore {
  you: number;      // 0-10
  them: number;     // 0-10
  balance: PowerBalance;
  balanceLabel: string;
  chaseRatio: number; // who's chasing more (-1 to 1, negative = you chasing)
}

export interface TextAnalysisResult {
  powerScore: PowerScore;
  chasePatterns: {
    pattern: ChasePattern;
    matches: string[];
  }[];
  redFlags: {
    flag: RedFlag;
    matches: string[];
  }[];
  greenFlags: {
    flag: GreenFlag;
    matches: string[];
  }[];
  recommendations: Recommendation[];
  summary: string;
}

export interface Recommendation {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  action: string;
  category: 'power' | 'boundaries' | 'communication' | 'exit';
}

export interface ConversationAnalysis {
  messageCount: {
    you: number;
    them: number;
  };
  wordCount: {
    you: number;
    them: number;
  };
  questionCount: {
    you: number;
    them: number;
  };
  initiationRatio: number; // who starts convos more
  responseTime: {
    youAvg: string;
    themAvg: string;
  };
  emojiUsage: {
    you: number;
    them: number;
  };
}
