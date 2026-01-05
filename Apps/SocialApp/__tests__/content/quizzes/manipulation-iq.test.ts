import {
  calculateManipulationIQ,
  getManipulationIQInterpretation,
  manipulationIQQuiz,
  manipulationIQInterpretations,
} from '../../../content/quizzes/manipulation-iq';

describe('Manipulation IQ Quiz Scoring', () => {
  describe('calculateManipulationIQ', () => {
    describe('empty answers', () => {
      it('should return 0 score when no answers provided', () => {
        const result = calculateManipulationIQ({});

        expect(result.score).toBe(0);
        expect(result.total).toBe(20);
        expect(result.percentage).toBe(0);
      });

      it('should have all category totals but zero correct', () => {
        const result = calculateManipulationIQ({});

        expect(result.categoryBreakdown.gaslighting.correct).toBe(0);
        expect(result.categoryBreakdown.gaslighting.total).toBe(4);
        expect(result.categoryBreakdown['guilt-trip'].correct).toBe(0);
        expect(result.categoryBreakdown['guilt-trip'].total).toBe(4);
        expect(result.categoryBreakdown['love-bombing'].correct).toBe(0);
        expect(result.categoryBreakdown['love-bombing'].total).toBe(3);
        expect(result.categoryBreakdown['fear-induction'].correct).toBe(0);
        expect(result.categoryBreakdown['fear-induction'].total).toBe(3);
        expect(result.categoryBreakdown.triangulation.correct).toBe(0);
        expect(result.categoryBreakdown.triangulation.total).toBe(3);
        expect(result.categoryBreakdown['intermittent-reinforcement'].correct).toBe(0);
        expect(result.categoryBreakdown['intermittent-reinforcement'].total).toBe(3);
      });
    });

    describe('correct answer matching', () => {
      it('should count correct answer when text matches exactly', () => {
        // miq-g1 correct answer is "Memory manipulation / Gaslighting"
        const answers = {
          'miq-g1': 'Memory manipulation / Gaslighting',
        };
        const result = calculateManipulationIQ(answers);

        expect(result.score).toBe(1);
        expect(result.categoryBreakdown.gaslighting.correct).toBe(1);
      });

      it('should not count incorrect answer', () => {
        const answers = {
          'miq-g1': 'Honest miscommunication', // Wrong answer
        };
        const result = calculateManipulationIQ(answers);

        expect(result.score).toBe(0);
        expect(result.categoryBreakdown.gaslighting.correct).toBe(0);
      });

      it('should be case sensitive in matching', () => {
        const answers = {
          'miq-g1': 'memory manipulation / gaslighting', // Wrong case
        };
        const result = calculateManipulationIQ(answers);

        // Case mismatch should not count as correct
        expect(result.score).toBe(0);
      });
    });

    describe('full correct answers', () => {
      it('should return 100% when all answers are correct', () => {
        const answers: Record<string, string> = {};

        manipulationIQQuiz.scenarios.forEach(scenario => {
          const correctOption = scenario.options.find(o => o.isCorrect);
          if (correctOption) {
            answers[scenario.id] = correctOption.text;
          }
        });

        const result = calculateManipulationIQ(answers);

        expect(result.score).toBe(20);
        expect(result.total).toBe(20);
        expect(result.percentage).toBe(100);
      });

      it('should have all categories at 100% when all correct', () => {
        const answers: Record<string, string> = {};

        manipulationIQQuiz.scenarios.forEach(scenario => {
          const correctOption = scenario.options.find(o => o.isCorrect);
          if (correctOption) {
            answers[scenario.id] = correctOption.text;
          }
        });

        const result = calculateManipulationIQ(answers);

        Object.values(result.categoryBreakdown).forEach(category => {
          expect(category.correct).toBe(category.total);
        });
      });
    });

    describe('full incorrect answers', () => {
      it('should return 0% when all answers are incorrect', () => {
        const answers: Record<string, string> = {};

        manipulationIQQuiz.scenarios.forEach(scenario => {
          const wrongOption = scenario.options.find(o => !o.isCorrect);
          if (wrongOption) {
            answers[scenario.id] = wrongOption.text;
          }
        });

        const result = calculateManipulationIQ(answers);

        expect(result.score).toBe(0);
        expect(result.percentage).toBe(0);
      });
    });

    describe('partial answers', () => {
      it('should calculate percentage correctly for partial completion', () => {
        // Answer 10 correct out of 20
        const answers: Record<string, string> = {};

        manipulationIQQuiz.scenarios.slice(0, 10).forEach(scenario => {
          const correctOption = scenario.options.find(o => o.isCorrect);
          if (correctOption) {
            answers[scenario.id] = correctOption.text;
          }
        });

        const result = calculateManipulationIQ(answers);

        expect(result.score).toBe(10);
        expect(result.percentage).toBe(50);
      });

      it('should track category breakdown for partial answers', () => {
        // Answer only gaslighting questions correctly (4 questions)
        const answers: Record<string, string> = {};

        manipulationIQQuiz.scenarios
          .filter(s => s.category === 'gaslighting')
          .forEach(scenario => {
            const correctOption = scenario.options.find(o => o.isCorrect);
            if (correctOption) {
              answers[scenario.id] = correctOption.text;
            }
          });

        const result = calculateManipulationIQ(answers);

        expect(result.categoryBreakdown.gaslighting.correct).toBe(4);
        expect(result.categoryBreakdown.gaslighting.total).toBe(4);
        expect(result.categoryBreakdown['guilt-trip'].correct).toBe(0);
      });
    });

    describe('percentage calculation', () => {
      it('should round percentage to nearest integer', () => {
        // 7/20 = 35%
        const answers: Record<string, string> = {};

        manipulationIQQuiz.scenarios.slice(0, 7).forEach(scenario => {
          const correctOption = scenario.options.find(o => o.isCorrect);
          if (correctOption) {
            answers[scenario.id] = correctOption.text;
          }
        });

        const result = calculateManipulationIQ(answers);

        expect(result.score).toBe(7);
        expect(result.percentage).toBe(35); // 7/20 * 100 = 35
      });
    });

    describe('invalid answers', () => {
      it('should handle non-existent scenario IDs gracefully', () => {
        const answers = {
          'invalid-id': 'Some answer',
        };

        expect(() => calculateManipulationIQ(answers)).not.toThrow();
        const result = calculateManipulationIQ(answers);
        expect(result.score).toBe(0);
      });

      it('should handle answers that do not match any option', () => {
        const answers = {
          'miq-g1': 'This is not a valid option text',
        };

        const result = calculateManipulationIQ(answers);
        expect(result.score).toBe(0);
      });
    });
  });

  describe('getManipulationIQInterpretation', () => {
    it('should return high interpretation for 85%+', () => {
      expect(getManipulationIQInterpretation(85)).toBe(manipulationIQInterpretations.high);
      expect(getManipulationIQInterpretation(100)).toBe(manipulationIQInterpretations.high);
    });

    it('should return good interpretation for 70-84%', () => {
      expect(getManipulationIQInterpretation(70)).toBe(manipulationIQInterpretations.good);
      expect(getManipulationIQInterpretation(84)).toBe(manipulationIQInterpretations.good);
    });

    it('should return moderate interpretation for 50-69%', () => {
      expect(getManipulationIQInterpretation(50)).toBe(manipulationIQInterpretations.moderate);
      expect(getManipulationIQInterpretation(69)).toBe(manipulationIQInterpretations.moderate);
    });

    it('should return low interpretation for below 50%', () => {
      expect(getManipulationIQInterpretation(0)).toBe(manipulationIQInterpretations.low);
      expect(getManipulationIQInterpretation(49)).toBe(manipulationIQInterpretations.low);
    });

    it('should have correct titles for each level', () => {
      expect(manipulationIQInterpretations.high.title).toBe('Psychological Tactician');
      expect(manipulationIQInterpretations.good.title).toBe('Tactical Defender');
      expect(manipulationIQInterpretations.moderate.title).toBe('Developing Awareness');
      expect(manipulationIQInterpretations.low.title).toBe('High Vulnerability');
    });
  });

  describe('manipulationIQQuiz structure', () => {
    it('should have 20 scenarios total', () => {
      expect(manipulationIQQuiz.scenarios.length).toBe(20);
      expect(manipulationIQQuiz.totalQuestions).toBe(20);
    });

    it('should have correct category distribution', () => {
      const counts: Record<string, number> = {};
      manipulationIQQuiz.scenarios.forEach(s => {
        counts[s.category] = (counts[s.category] || 0) + 1;
      });

      expect(counts.gaslighting).toBe(4);
      expect(counts['guilt-trip']).toBe(4);
      expect(counts['love-bombing']).toBe(3);
      expect(counts['fear-induction']).toBe(3);
      expect(counts.triangulation).toBe(3);
      expect(counts['intermittent-reinforcement']).toBe(3);
    });

    it('should have exactly one correct option per scenario', () => {
      manipulationIQQuiz.scenarios.forEach(scenario => {
        const correctOptions = scenario.options.filter(o => o.isCorrect);
        expect(correctOptions.length).toBe(1);
      });
    });

    it('should have 4 options per scenario', () => {
      manipulationIQQuiz.scenarios.forEach(scenario => {
        expect(scenario.options.length).toBe(4);
      });
    });

    it('should have unique scenario IDs', () => {
      const ids = manipulationIQQuiz.scenarios.map(s => s.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have all required fields per scenario', () => {
      manipulationIQQuiz.scenarios.forEach(scenario => {
        expect(scenario.id).toBeDefined();
        expect(scenario.scenario).toBeDefined();
        expect(scenario.question).toBeDefined();
        expect(scenario.options).toBeDefined();
        expect(scenario.explanation).toBeDefined();
        expect(scenario.category).toBeDefined();
      });
    });

    it('should have all 6 categories defined', () => {
      expect(manipulationIQQuiz.categories).toEqual([
        'gaslighting',
        'guilt-trip',
        'love-bombing',
        'fear-induction',
        'triangulation',
        'intermittent-reinforcement',
      ]);
    });
  });

  describe('manipulationIQInterpretations metadata', () => {
    it('should have all 4 interpretation levels', () => {
      expect(manipulationIQInterpretations.high).toBeDefined();
      expect(manipulationIQInterpretations.good).toBeDefined();
      expect(manipulationIQInterpretations.moderate).toBeDefined();
      expect(manipulationIQInterpretations.low).toBeDefined();
    });

    it('should have required fields for each interpretation', () => {
      Object.values(manipulationIQInterpretations).forEach(interp => {
        expect(interp.range).toBeDefined();
        expect(interp.title).toBeDefined();
        expect(interp.description).toBeDefined();
      });
    });
  });
});
