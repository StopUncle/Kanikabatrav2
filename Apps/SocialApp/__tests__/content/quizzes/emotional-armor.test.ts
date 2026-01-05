import {
  calculateArmorScore,
  getDimensionDescription,
  getOverallInterpretation,
  emotionalArmorQuiz,
  armorDimensions,
  overallArmorInterpretations,
} from '../../../content/quizzes/emotional-armor';

describe('Emotional Armor Quiz Scoring', () => {
  describe('calculateArmorScore', () => {
    describe('empty answers', () => {
      it('should return 0 for all dimensions when no answers provided', () => {
        const result = calculateArmorScore({});

        expect(result.overall).toBe(0);
        expect(result.dimensions.boundaries).toBe(0);
        expect(result.dimensions.detachment).toBe(0);
        expect(result.dimensions.realityTesting).toBe(0);
        expect(result.dimensions.recovery).toBe(0);
        expect(result.dimensions.selfWorth).toBe(0);
      });

      it('should not produce NaN or Infinity with empty answers', () => {
        const result = calculateArmorScore({});

        expect(Number.isFinite(result.overall)).toBe(true);
        expect(Number.isFinite(result.dimensions.boundaries)).toBe(true);
        expect(Number.isFinite(result.dimensions.detachment)).toBe(true);
        expect(Number.isFinite(result.dimensions.realityTesting)).toBe(true);
        expect(Number.isFinite(result.dimensions.recovery)).toBe(true);
        expect(Number.isFinite(result.dimensions.selfWorth)).toBe(true);
      });
    });

    describe('full answers - maximum scores', () => {
      it('should return 100% for all dimensions when all answers are 5 (non-reverse)', () => {
        const answers: Record<string, number> = {};
        emotionalArmorQuiz.questions.forEach(q => {
          // For reverse questions, answer 1 gives max score
          // For non-reverse questions, answer 5 gives max score
          answers[q.id] = q.reverse ? 1 : 5;
        });
        const result = calculateArmorScore(answers);

        expect(result.dimensions.boundaries).toBe(100);
        expect(result.dimensions.detachment).toBe(100);
        expect(result.dimensions.realityTesting).toBe(100);
        expect(result.dimensions.recovery).toBe(100);
        expect(result.dimensions.selfWorth).toBe(100);
        expect(result.overall).toBe(100);
      });
    });

    describe('full answers - minimum scores', () => {
      it('should return 20% for all dimensions when all answers give minimum', () => {
        const answers: Record<string, number> = {};
        emotionalArmorQuiz.questions.forEach(q => {
          // For reverse questions, answer 5 gives min score (becomes 1)
          // For non-reverse questions, answer 1 gives min score
          answers[q.id] = q.reverse ? 5 : 1;
        });
        const result = calculateArmorScore(answers);

        expect(result.dimensions.boundaries).toBe(20);
        expect(result.dimensions.detachment).toBe(20);
        expect(result.dimensions.realityTesting).toBe(20);
        expect(result.dimensions.recovery).toBe(20);
        expect(result.dimensions.selfWorth).toBe(20);
        expect(result.overall).toBe(20);
      });
    });

    describe('reverse scoring', () => {
      it('should correctly invert ea-b2 (boundaries reverse)', () => {
        // ea-b2: "I change my plans to accommodate others..." - reverse scored
        const answersLow = { 'ea-b2': 5 }; // High accommodation = low boundary strength
        const answersHigh = { 'ea-b2': 1 }; // Low accommodation = high boundary strength

        const resultLow = calculateArmorScore(answersLow);
        const resultHigh = calculateArmorScore(answersHigh);

        expect(resultLow.dimensions.boundaries).toBe(20); // (6-5)/5 * 100 = 20%
        expect(resultHigh.dimensions.boundaries).toBe(100); // (6-1)/5 * 100 = 100%
      });

      it('should correctly invert ea-d1 (detachment reverse)', () => {
        // ea-d1: "Other people's moods significantly affect..." - reverse scored
        const answersLow = { 'ea-d1': 5 }; // High affect = low detachment
        const answersHigh = { 'ea-d1': 1 }; // Low affect = high detachment

        const resultLow = calculateArmorScore(answersLow);
        const resultHigh = calculateArmorScore(answersHigh);

        expect(resultLow.dimensions.detachment).toBe(20);
        expect(resultHigh.dimensions.detachment).toBe(100);
      });
    });

    describe('partial completion', () => {
      it('should calculate only answered dimensions', () => {
        const answers = {
          'ea-b1': 5, // boundaries only
        };
        const result = calculateArmorScore(answers);

        expect(result.dimensions.boundaries).toBe(100);
        expect(result.dimensions.detachment).toBe(0);
        expect(result.dimensions.realityTesting).toBe(0);
        expect(result.dimensions.recovery).toBe(0);
        expect(result.dimensions.selfWorth).toBe(0);
      });

      it('should average partial dimensions correctly for overall', () => {
        // Only answer boundaries questions (3 questions, all 5s)
        const answers = {
          'ea-b1': 5,
          'ea-b2': 1, // reverse - 1 becomes 5
          'ea-b3': 5,
        };
        const result = calculateArmorScore(answers);

        expect(result.dimensions.boundaries).toBe(100);
        // Overall is average of all 5 dimensions (100 + 0 + 0 + 0 + 0) / 5 = 20
        expect(result.overall).toBe(20);
      });
    });

    describe('boundary values', () => {
      it('should handle neutral answers (3) correctly', () => {
        const answers: Record<string, number> = {};
        emotionalArmorQuiz.questions.forEach(q => {
          answers[q.id] = 3;
        });
        const result = calculateArmorScore(answers);

        // 3/5 = 60% for non-reverse, (6-3)/5 = 60% for reverse
        expect(result.dimensions.boundaries).toBe(60);
        expect(result.dimensions.detachment).toBe(60);
        expect(result.overall).toBe(60);
      });
    });

    describe('overall calculation', () => {
      it('should correctly average all 5 dimensions', () => {
        // Set up answers to get specific dimension scores
        const answers = {
          // Boundaries: all 5s = 100%
          'ea-b1': 5, 'ea-b2': 1, 'ea-b3': 5,
          // Detachment: all 3s = 60%
          'ea-d1': 3, 'ea-d2': 3, 'ea-d3': 3,
          // Reality-testing: all 4s = 80%
          'ea-r1': 4, 'ea-r2': 2, 'ea-r3': 4, // r2 is reverse: 6-2=4
          // Recovery: all 2s = 40%
          'ea-rc1': 2, 'ea-rc2': 4, 'ea-rc3': 2, // rc2 is reverse: 6-4=2
          // Self-worth: all 1s = 20%
          'ea-s1': 5, 'ea-s2': 1, 'ea-s3': 1, // s1 is reverse: 6-5=1
        };
        const result = calculateArmorScore(answers);

        // Overall should be (100 + 60 + 80 + 40 + 20) / 5 = 60
        expect(result.overall).toBe(60);
      });
    });
  });

  describe('getDimensionDescription', () => {
    describe('boundaries descriptions', () => {
      it('should return high description for score >= 70', () => {
        expect(getDimensionDescription('boundaries', 70)).toBe(armorDimensions.boundaries.high);
        expect(getDimensionDescription('boundaries', 100)).toBe(armorDimensions.boundaries.high);
      });

      it('should return moderate description for score 40-69', () => {
        expect(getDimensionDescription('boundaries', 40)).toBe(armorDimensions.boundaries.moderate);
        expect(getDimensionDescription('boundaries', 69)).toBe(armorDimensions.boundaries.moderate);
      });

      it('should return low description for score < 40', () => {
        expect(getDimensionDescription('boundaries', 0)).toBe(armorDimensions.boundaries.low);
        expect(getDimensionDescription('boundaries', 39)).toBe(armorDimensions.boundaries.low);
      });
    });

    describe('all dimensions', () => {
      // armorDimensions uses camelCase keys
      const dimensions = ['boundaries', 'detachment', 'realityTesting', 'recovery', 'selfWorth'] as const;

      dimensions.forEach(dimension => {
        it(`should handle ${dimension} at all thresholds`, () => {
          expect(getDimensionDescription(dimension, 70)).toBeDefined();
          expect(getDimensionDescription(dimension, 50)).toBeDefined();
          expect(getDimensionDescription(dimension, 30)).toBeDefined();
        });
      });
    });
  });

  describe('getOverallInterpretation', () => {
    it('should return fortified for score >= 80', () => {
      expect(getOverallInterpretation(80)).toBe(overallArmorInterpretations.fortified);
      expect(getOverallInterpretation(100)).toBe(overallArmorInterpretations.fortified);
    });

    it('should return protected for score 60-79', () => {
      expect(getOverallInterpretation(60)).toBe(overallArmorInterpretations.protected);
      expect(getOverallInterpretation(79)).toBe(overallArmorInterpretations.protected);
    });

    it('should return developing for score 40-59', () => {
      expect(getOverallInterpretation(40)).toBe(overallArmorInterpretations.developing);
      expect(getOverallInterpretation(59)).toBe(overallArmorInterpretations.developing);
    });

    it('should return exposed for score < 40', () => {
      expect(getOverallInterpretation(0)).toBe(overallArmorInterpretations.exposed);
      expect(getOverallInterpretation(39)).toBe(overallArmorInterpretations.exposed);
    });
  });

  describe('emotionalArmorQuiz structure', () => {
    it('should have 15 questions total', () => {
      expect(emotionalArmorQuiz.questions.length).toBe(15);
      expect(emotionalArmorQuiz.totalQuestions).toBe(15);
    });

    it('should have 3 questions per dimension', () => {
      const counts = {
        boundaries: 0,
        detachment: 0,
        'reality-testing': 0,
        recovery: 0,
        'self-worth': 0,
      };

      emotionalArmorQuiz.questions.forEach(q => {
        counts[q.dimension]++;
      });

      expect(counts.boundaries).toBe(3);
      expect(counts.detachment).toBe(3);
      expect(counts['reality-testing']).toBe(3);
      expect(counts.recovery).toBe(3);
      expect(counts['self-worth']).toBe(3);
    });

    it('should have 5 reverse-scored questions', () => {
      const reverseQuestions = emotionalArmorQuiz.questions.filter(q => q.reverse === true);
      expect(reverseQuestions.length).toBe(5);
    });

    it('should have unique question IDs', () => {
      const ids = emotionalArmorQuiz.questions.map(q => q.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });
  });
});
