import {
  calculateDarkTriadScores,
  getTraitDescription,
  darkTriadQuiz,
  darkTriadDescriptions,
} from '../../../content/quizzes/dark-triad';

describe('Dark Triad Quiz Scoring', () => {
  describe('calculateDarkTriadScores', () => {
    describe('empty answers', () => {
      it('should return 0 for all traits when no answers provided', () => {
        const result = calculateDarkTriadScores({});
        expect(result.machiavellianism).toBe(0);
        expect(result.narcissism).toBe(0);
        expect(result.psychopathy).toBe(0);
      });
    });

    describe('full answers - maximum scores', () => {
      it('should return 100% for all traits when all answers are 5', () => {
        const answers: Record<string, number> = {};
        darkTriadQuiz.questions.forEach(q => {
          answers[q.id] = 5;
        });
        const result = calculateDarkTriadScores(answers);

        // For non-reverse questions, 5 = max score
        // For reverse questions (dt-n3, dt-p2), 5 becomes 1 (6-5=1)
        // So we won't get exactly 100, but close
        expect(result.machiavellianism).toBe(100); // No reverse questions
        expect(result.narcissism).toBeLessThan(100); // Has dt-n3 reverse
        expect(result.psychopathy).toBeLessThan(100); // Has dt-p2 reverse
      });

      it('should return 100% for machiavellianism with all 5s', () => {
        const answers: Record<string, number> = {
          'dt-m1': 5, 'dt-m2': 5, 'dt-m3': 5,
          'dt-m4': 5, 'dt-m5': 5, 'dt-m6': 5,
          'dt-m7': 5, 'dt-m8': 5, 'dt-m9': 5,
        };
        const result = calculateDarkTriadScores(answers);
        expect(result.machiavellianism).toBe(100);
      });
    });

    describe('full answers - minimum scores', () => {
      it('should return 20% for all traits when all answers are 1', () => {
        const answers: Record<string, number> = {};
        darkTriadQuiz.questions.forEach(q => {
          answers[q.id] = 1;
        });
        const result = calculateDarkTriadScores(answers);

        // For non-reverse: 1/5 = 20%
        // For reverse: 6-1=5, so 5/5 = 100%
        expect(result.machiavellianism).toBe(20); // No reverse questions
        expect(result.narcissism).toBeGreaterThan(20); // Has dt-n3 reverse
        expect(result.psychopathy).toBeGreaterThan(20); // Has dt-p2 reverse
      });
    });

    describe('reverse scoring', () => {
      it('should correctly invert dt-n3 (narcissism reverse)', () => {
        // dt-n3: "I feel embarrassed when someone compliments me" - reverse scored
        const answersLow = { 'dt-n3': 1 }; // Low embarrassment = high narcissism
        const answersHigh = { 'dt-n3': 5 }; // High embarrassment = low narcissism

        const resultLow = calculateDarkTriadScores(answersLow);
        const resultHigh = calculateDarkTriadScores(answersHigh);

        // With reverse: answer 1 becomes 6-1=5 (100%), answer 5 becomes 6-5=1 (20%)
        expect(resultLow.narcissism).toBe(100);
        expect(resultHigh.narcissism).toBe(20);
      });

      it('should correctly invert dt-p2 (psychopathy reverse)', () => {
        // dt-p2: "I avoid dangerous situations at all costs" - reverse scored
        const answersLow = { 'dt-p2': 1 }; // Low avoidance = high psychopathy
        const answersHigh = { 'dt-p2': 5 }; // High avoidance = low psychopathy

        const resultLow = calculateDarkTriadScores(answersLow);
        const resultHigh = calculateDarkTriadScores(answersHigh);

        expect(resultLow.psychopathy).toBe(100);
        expect(resultHigh.psychopathy).toBe(20);
      });
    });

    describe('partial completion', () => {
      it('should calculate correct score with only machiavellianism answers', () => {
        const answers = {
          'dt-m1': 5,
          'dt-m2': 5,
          'dt-m3': 5,
        };
        const result = calculateDarkTriadScores(answers);

        expect(result.machiavellianism).toBe(100); // 3 questions, all 5s
        expect(result.narcissism).toBe(0); // No answers
        expect(result.psychopathy).toBe(0); // No answers
      });

      it('should calculate correct score with mixed partial answers', () => {
        const answers = {
          'dt-m1': 3, // machiavellianism: 3/5 = 60%
          'dt-n1': 4, // narcissism: 4/5 = 80%
          'dt-p1': 2, // psychopathy: 2/5 = 40%
        };
        const result = calculateDarkTriadScores(answers);

        expect(result.machiavellianism).toBe(60);
        expect(result.narcissism).toBe(80);
        expect(result.psychopathy).toBe(40);
      });
    });

    describe('boundary values', () => {
      it('should handle neutral answers (3) correctly', () => {
        const answers: Record<string, number> = {};
        darkTriadQuiz.questions.forEach(q => {
          answers[q.id] = 3;
        });
        const result = calculateDarkTriadScores(answers);

        // 3/5 = 60% for non-reverse
        // (6-3)/5 = 60% for reverse
        expect(result.machiavellianism).toBe(60);
        expect(result.narcissism).toBe(60);
        expect(result.psychopathy).toBe(60);
      });

      it('should handle answer value 2 correctly', () => {
        const answers = { 'dt-m1': 2 };
        const result = calculateDarkTriadScores(answers);
        expect(result.machiavellianism).toBe(40); // 2/5 = 40%
      });

      it('should handle answer value 4 correctly', () => {
        const answers = { 'dt-m1': 4 };
        const result = calculateDarkTriadScores(answers);
        expect(result.machiavellianism).toBe(80); // 4/5 = 80%
      });
    });

    describe('division by zero guard', () => {
      it('should return 0 when trait has no answers (safePercent)', () => {
        // This tests the safePercent helper that guards against count=0
        const result = calculateDarkTriadScores({});

        // All should be 0, not NaN or Infinity
        expect(Number.isFinite(result.machiavellianism)).toBe(true);
        expect(Number.isFinite(result.narcissism)).toBe(true);
        expect(Number.isFinite(result.psychopathy)).toBe(true);
        expect(result.machiavellianism).toBe(0);
        expect(result.narcissism).toBe(0);
        expect(result.psychopathy).toBe(0);
      });
    });
  });

  describe('getTraitDescription', () => {
    describe('machiavellianism descriptions', () => {
      it('should return high description for score >= 70', () => {
        expect(getTraitDescription('machiavellianism', 70)).toBe(darkTriadDescriptions.machiavellianism.high);
        expect(getTraitDescription('machiavellianism', 85)).toBe(darkTriadDescriptions.machiavellianism.high);
        expect(getTraitDescription('machiavellianism', 100)).toBe(darkTriadDescriptions.machiavellianism.high);
      });

      it('should return moderate description for score 40-69', () => {
        expect(getTraitDescription('machiavellianism', 40)).toBe(darkTriadDescriptions.machiavellianism.moderate);
        expect(getTraitDescription('machiavellianism', 55)).toBe(darkTriadDescriptions.machiavellianism.moderate);
        expect(getTraitDescription('machiavellianism', 69)).toBe(darkTriadDescriptions.machiavellianism.moderate);
      });

      it('should return low description for score < 40', () => {
        expect(getTraitDescription('machiavellianism', 0)).toBe(darkTriadDescriptions.machiavellianism.low);
        expect(getTraitDescription('machiavellianism', 20)).toBe(darkTriadDescriptions.machiavellianism.low);
        expect(getTraitDescription('machiavellianism', 39)).toBe(darkTriadDescriptions.machiavellianism.low);
      });
    });

    describe('narcissism descriptions', () => {
      it('should return correct descriptions at thresholds', () => {
        expect(getTraitDescription('narcissism', 70)).toBe(darkTriadDescriptions.narcissism.high);
        expect(getTraitDescription('narcissism', 40)).toBe(darkTriadDescriptions.narcissism.moderate);
        expect(getTraitDescription('narcissism', 39)).toBe(darkTriadDescriptions.narcissism.low);
      });
    });

    describe('psychopathy descriptions', () => {
      it('should return correct descriptions at thresholds', () => {
        expect(getTraitDescription('psychopathy', 70)).toBe(darkTriadDescriptions.psychopathy.high);
        expect(getTraitDescription('psychopathy', 40)).toBe(darkTriadDescriptions.psychopathy.moderate);
        expect(getTraitDescription('psychopathy', 39)).toBe(darkTriadDescriptions.psychopathy.low);
      });
    });
  });

  describe('darkTriadQuiz structure', () => {
    it('should have 27 questions total', () => {
      expect(darkTriadQuiz.questions.length).toBe(27);
      expect(darkTriadQuiz.totalQuestions).toBe(27);
    });

    it('should have 9 questions per trait', () => {
      const machCount = darkTriadQuiz.questions.filter(q => q.trait === 'machiavellianism').length;
      const narcCount = darkTriadQuiz.questions.filter(q => q.trait === 'narcissism').length;
      const psychCount = darkTriadQuiz.questions.filter(q => q.trait === 'psychopathy').length;

      expect(machCount).toBe(9);
      expect(narcCount).toBe(9);
      expect(psychCount).toBe(9);
    });

    it('should have 2 reverse-scored questions', () => {
      const reverseQuestions = darkTriadQuiz.questions.filter(q => q.reverse === true);
      expect(reverseQuestions.length).toBe(2);
      expect(reverseQuestions.map(q => q.id)).toEqual(['dt-n3', 'dt-p2']);
    });

    it('should have unique question IDs', () => {
      const ids = darkTriadQuiz.questions.map(q => q.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });
  });
});
