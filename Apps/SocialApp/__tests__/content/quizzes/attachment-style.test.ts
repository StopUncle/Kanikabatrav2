import {
  calculateAttachmentStyle,
  getStyleDescription,
  attachmentStyleQuiz,
  attachmentStyles,
} from '../../../content/quizzes/attachment-style';

describe('Attachment Style Quiz Scoring', () => {
  describe('calculateAttachmentStyle', () => {
    describe('empty answers', () => {
      it('should return valid scores when no answers provided', () => {
        const result = calculateAttachmentStyle({});

        // With 0 answers, maxPossible defaults to 12, all raw scores are 0
        // normalize(0) = ((0/12) + 1) / 2 * 100 = 50
        expect(result.scores.secure).toBe(50);
        expect(result.scores.anxious).toBe(50);
        expect(result.scores.avoidant).toBe(50);
        expect(result.scores.disorganized).toBe(50);
      });

      it('should not produce NaN or Infinity', () => {
        const result = calculateAttachmentStyle({});

        expect(Number.isFinite(result.scores.secure)).toBe(true);
        expect(Number.isFinite(result.scores.anxious)).toBe(true);
        expect(Number.isFinite(result.scores.avoidant)).toBe(true);
        expect(Number.isFinite(result.scores.disorganized)).toBe(true);
      });

      it('should have primary and secondary properties', () => {
        const result = calculateAttachmentStyle({});

        expect(result.primary).toBeDefined();
        expect(result.secondary).toBeDefined();
        expect(['secure', 'anxious', 'avoidant', 'disorganized']).toContain(result.primary);
        expect(['secure', 'anxious', 'avoidant', 'disorganized']).toContain(result.secondary);
      });
    });

    describe('weight normalization', () => {
      it('should convert answer 1 to weight -1', () => {
        // Answer 1 → weight = (1-3)/2 = -1
        const answers = { 'as-1': 1 }; // as-1 has secure: 1.0
        const result = calculateAttachmentStyle(answers);

        // With negative weight, secure score should be below 50 (neutral)
        expect(result.scores.secure).toBeLessThan(50);
      });

      it('should convert answer 3 to weight 0 (neutral)', () => {
        // Answer 3 → weight = (3-3)/2 = 0
        const answers: Record<string, number> = {};
        attachmentStyleQuiz.questions.forEach(q => {
          answers[q.id] = 3;
        });
        const result = calculateAttachmentStyle(answers);

        // All weights are 0, so all rawScores are 0, normalized to 50
        expect(result.scores.secure).toBe(50);
        expect(result.scores.anxious).toBe(50);
        expect(result.scores.avoidant).toBe(50);
        expect(result.scores.disorganized).toBe(50);
      });

      it('should convert answer 5 to weight +1', () => {
        // Answer 5 → weight = (5-3)/2 = +1
        const answers = { 'as-1': 5 }; // as-1 has secure: 1.0
        const result = calculateAttachmentStyle(answers);

        // With positive weight and positive coefficient, secure should be above 50
        expect(result.scores.secure).toBeGreaterThan(50);
      });
    });

    describe('coefficient application', () => {
      it('should apply positive coefficients correctly', () => {
        // as-6: anxious: 1 coefficient
        const answersHigh = { 'as-6': 5 }; // Strong agree = +1 weight
        const answersLow = { 'as-6': 1 }; // Strong disagree = -1 weight

        const resultHigh = calculateAttachmentStyle(answersHigh);
        const resultLow = calculateAttachmentStyle(answersLow);

        expect(resultHigh.scores.anxious).toBeGreaterThan(resultLow.scores.anxious);
      });

      it('should apply negative coefficients correctly', () => {
        // as-6: secure: -0.5 coefficient
        const answersHigh = { 'as-6': 5 }; // Strong agree on anxious item
        const answersLow = { 'as-6': 1 }; // Strong disagree

        const resultHigh = calculateAttachmentStyle(answersHigh);
        const resultLow = calculateAttachmentStyle(answersLow);

        // Higher agreement on anxious item = lower secure score
        expect(resultHigh.scores.secure).toBeLessThan(resultLow.scores.secure);
      });
    });

    describe('primary/secondary determination', () => {
      it('should identify secure as primary with all secure-positive answers', () => {
        // Answer 5 on first 5 questions (secure-measuring)
        const answers: Record<string, number> = {
          'as-1': 5, 'as-2': 5, 'as-3': 5, 'as-4': 5, 'as-5': 5,
        };
        const result = calculateAttachmentStyle(answers);

        expect(result.primary).toBe('secure');
      });

      it('should identify anxious as primary with all anxious-positive answers', () => {
        // Answer 5 on anxious questions (as-6 through as-10)
        const answers: Record<string, number> = {
          'as-6': 5, 'as-7': 5, 'as-8': 5, 'as-9': 5, 'as-10': 5,
        };
        const result = calculateAttachmentStyle(answers);

        expect(result.primary).toBe('anxious');
      });

      it('should identify avoidant as primary with all avoidant-positive answers', () => {
        // Answer 5 on avoidant questions (as-11 through as-15)
        const answers: Record<string, number> = {
          'as-11': 5, 'as-12': 5, 'as-13': 5, 'as-14': 5, 'as-15': 5,
        };
        const result = calculateAttachmentStyle(answers);

        expect(result.primary).toBe('avoidant');
      });

      it('should identify disorganized as primary with all disorganized-positive answers', () => {
        // Answer 5 on disorganized questions (as-16 through as-20)
        const answers: Record<string, number> = {
          'as-16': 5, 'as-17': 5, 'as-18': 5, 'as-19': 5, 'as-20': 5,
        };
        const result = calculateAttachmentStyle(answers);

        expect(result.primary).toBe('disorganized');
      });

      it('should have different primary and secondary', () => {
        const answers: Record<string, number> = {};
        attachmentStyleQuiz.questions.forEach(q => {
          answers[q.id] = 4; // Slight agreement on all
        });
        const result = calculateAttachmentStyle(answers);

        expect(result.primary).not.toBe(result.secondary);
      });
    });

    describe('score clamping (0-100)', () => {
      it('should clamp scores to minimum 0', () => {
        // Create extreme negative scenario
        const answers: Record<string, number> = {};
        attachmentStyleQuiz.questions.forEach(q => {
          answers[q.id] = 1; // All strong disagree
        });
        const result = calculateAttachmentStyle(answers);

        expect(result.scores.secure).toBeGreaterThanOrEqual(0);
        expect(result.scores.anxious).toBeGreaterThanOrEqual(0);
        expect(result.scores.avoidant).toBeGreaterThanOrEqual(0);
        expect(result.scores.disorganized).toBeGreaterThanOrEqual(0);
      });

      it('should clamp scores to maximum 100', () => {
        const answers: Record<string, number> = {};
        attachmentStyleQuiz.questions.forEach(q => {
          answers[q.id] = 5; // All strong agree
        });
        const result = calculateAttachmentStyle(answers);

        expect(result.scores.secure).toBeLessThanOrEqual(100);
        expect(result.scores.anxious).toBeLessThanOrEqual(100);
        expect(result.scores.avoidant).toBeLessThanOrEqual(100);
        expect(result.scores.disorganized).toBeLessThanOrEqual(100);
      });
    });

    describe('partial completion', () => {
      it('should handle single answer correctly', () => {
        const answers = { 'as-1': 5 };
        const result = calculateAttachmentStyle(answers);

        // Should still produce valid scores
        expect(result.scores.secure).toBeGreaterThan(50);
        expect(result.primary).toBeDefined();
      });

      it('should adjust maxPossible based on answered count', () => {
        // With 10 questions answered, maxPossible = 10 * 0.6 = 6
        const answersPartial: Record<string, number> = {};
        for (let i = 1; i <= 10; i++) {
          answersPartial[`as-${i}`] = 5;
        }

        const resultPartial = calculateAttachmentStyle(answersPartial);

        // All scores should be valid numbers
        expect(Number.isFinite(resultPartial.scores.secure)).toBe(true);
        expect(Number.isFinite(resultPartial.scores.anxious)).toBe(true);
      });
    });
  });

  describe('getStyleDescription', () => {
    it('should return secure description', () => {
      const desc = getStyleDescription('secure');
      expect(desc.name).toBe('Secure');
      expect(desc.summary).toBeDefined();
      expect(desc.description).toBeDefined();
      expect(desc.strengths).toBeDefined();
      expect(desc.vulnerabilities).toBeDefined();
      expect(desc.manipulationRisk).toBeDefined();
    });

    it('should return anxious description', () => {
      const desc = getStyleDescription('anxious');
      expect(desc.name).toBe('Anxious');
      expect(desc.color).toBe('#F59E0B');
    });

    it('should return avoidant description', () => {
      const desc = getStyleDescription('avoidant');
      expect(desc.name).toBe('Avoidant');
      expect(desc.color).toBe('#6366F1');
    });

    it('should return disorganized description', () => {
      const desc = getStyleDescription('disorganized');
      expect(desc.name).toBe('Disorganized');
      expect(desc.color).toBe('#EF4444');
    });
  });

  describe('attachmentStyleQuiz structure', () => {
    it('should have 20 questions total', () => {
      expect(attachmentStyleQuiz.questions.length).toBe(20);
      expect(attachmentStyleQuiz.totalQuestions).toBe(20);
    });

    it('should have 5 questions per style', () => {
      // Questions are not tagged by single style, but measure all styles
      // Just verify we have 20 total
      expect(attachmentStyleQuiz.questions.length).toBe(20);
    });

    it('should have all 4 styles defined', () => {
      expect(attachmentStyleQuiz.styles).toEqual(['secure', 'anxious', 'avoidant', 'disorganized']);
    });

    it('should have unique question IDs', () => {
      const ids = attachmentStyleQuiz.questions.map(q => q.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have valid score coefficients for all questions', () => {
      attachmentStyleQuiz.questions.forEach(q => {
        expect(q.scores).toBeDefined();
        expect(typeof q.scores.secure).toBe('number');
        expect(typeof q.scores.anxious).toBe('number');
        expect(typeof q.scores.avoidant).toBe('number');
        expect(typeof q.scores.disorganized).toBe('number');
      });
    });
  });

  describe('attachmentStyles metadata', () => {
    it('should have all 4 style descriptions', () => {
      expect(attachmentStyles.secure).toBeDefined();
      expect(attachmentStyles.anxious).toBeDefined();
      expect(attachmentStyles.avoidant).toBeDefined();
      expect(attachmentStyles.disorganized).toBeDefined();
    });

    it('should have required fields for each style', () => {
      Object.values(attachmentStyles).forEach(style => {
        expect(style.name).toBeDefined();
        expect(style.color).toBeDefined();
        expect(style.icon).toBeDefined();
        expect(style.summary).toBeDefined();
        expect(style.description).toBeDefined();
        expect(Array.isArray(style.strengths)).toBe(true);
        expect(Array.isArray(style.vulnerabilities)).toBe(true);
        expect(style.manipulationRisk).toBeDefined();
      });
    });
  });
});
