import { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { haptics } from '../../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../../lib/theme';

// Import actual quiz content
import { darkTriadQuiz, darkTriadOptions } from '../../../content/quizzes/dark-triad';
import { manipulationIQQuiz } from '../../../content/quizzes/manipulation-iq';
import { emotionalArmorQuiz, armorOptions } from '../../../content/quizzes/emotional-armor';
import { attachmentStyleQuiz, attachmentOptions } from '../../../content/quizzes/attachment-style';

interface QuizQuestion {
  id: string;
  text: string;
  trait: string;
  options?: { value: number; label: string }[];
  isScenario?: boolean;
}

// Get questions and options based on quiz ID
function getQuizContent(quizId: string): { questions: QuizQuestion[]; defaultOptions: { value: number; label: string }[] } {
  switch (quizId) {
    case 'dark-triad':
      return {
        questions: darkTriadQuiz.questions.map(q => ({
          id: q.id,
          text: q.text,
          trait: q.trait,
        })),
        defaultOptions: darkTriadOptions,
      };
    case 'manipulation-iq':
      return {
        questions: manipulationIQQuiz.scenarios.map(s => ({
          id: s.id,
          text: `${s.scenario}\n\n${s.question}`,
          trait: s.category,
          options: s.options.map((opt, i) => ({ value: i + 1, label: opt.text })),
          isScenario: true,
        })),
        defaultOptions: [], // Each question has its own options
      };
    case 'emotional-armor':
      return {
        questions: emotionalArmorQuiz.questions.map(q => ({
          id: q.id,
          text: q.text,
          trait: q.dimension,
        })),
        defaultOptions: armorOptions,
      };
    case 'attachment-style':
      return {
        questions: attachmentStyleQuiz.questions.map(q => ({
          id: q.id,
          text: q.text,
          trait: 'attachment',
        })),
        defaultOptions: attachmentOptions,
      };
    default:
      return { questions: [], defaultOptions: [] };
  }
}

export default function QuizQuestionScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Get quiz-specific content
  const { questions, defaultOptions } = useMemo(
    () => getQuizContent(quizId || 'dark-triad'),
    [quizId]
  );

  const currentQuestion = questions[currentIndex];
  const currentOptions = currentQuestion?.options || defaultOptions;
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = (value: number) => {
    haptics.light();
    setSelectedAnswer(value);
  };

  const handleNext = useCallback(() => {
    if (selectedAnswer === null || !currentQuestion) {
      haptics.error();
      return;
    }

    haptics.medium();

    // Save answer with string ID
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Go to results (or email capture for non-logged in users)
      router.push({
        pathname: `/(quiz)/${quizId}/result`,
        params: { answers: JSON.stringify(newAnswers) },
      });
    } else {
      // Next question
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  }, [selectedAnswer, currentQuestion, isLastQuestion, answers, quizId]);

  const handleBack = useCallback(() => {
    haptics.light();
    if (currentIndex === 0) {
      router.replace(`/(quiz)/${quizId}`);
    } else {
      const prevQuestion = questions[currentIndex - 1];
      setCurrentIndex(prev => prev - 1);
      setSelectedAnswer(prevQuestion ? answers[prevQuestion.id] || null : null);
    }
  }, [currentIndex, quizId, questions, answers]);

  // Handle empty questions - moved after all hooks
  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.replace('/(quiz)')}>
            <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
          </Pressable>
          <Text style={styles.progressText}>Quiz not found</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
        </Pressable>
        <Text style={styles.progressText}>
          {currentIndex + 1} of {questions.length}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Question */}
      <View style={[styles.questionContainer, currentQuestion.isScenario && styles.questionContainerScenario]}>
        <Text style={styles.questionNumber}>Question {currentIndex + 1}</Text>
        <ScrollView
          style={currentQuestion.isScenario ? styles.questionScroll : undefined}
          showsVerticalScrollIndicator={currentQuestion.isScenario}
        >
          <Text style={[styles.questionText, currentQuestion.isScenario && styles.questionTextScenario]}>
            {currentQuestion.text}
          </Text>
        </ScrollView>
      </View>

      {/* Answer Options */}
      <ScrollView style={styles.answersContainer} contentContainerStyle={styles.answersContent}>
        {currentOptions.map(option => (
          <Pressable
            key={option.value}
            style={[
              styles.answerButton,
              selectedAnswer === option.value && styles.answerButtonSelected,
              currentQuestion.isScenario && styles.answerButtonScenario,
            ]}
            onPress={() => handleSelectAnswer(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: selectedAnswer === option.value }}
            accessibilityLabel={option.label}
            accessibilityHint={`Select ${option.label} as your answer`}
          >
            <View
              style={[
                styles.answerRadio,
                selectedAnswer === option.value && styles.answerRadioSelected,
              ]}
            >
              {selectedAnswer === option.value && (
                <View style={styles.answerRadioInner} />
              )}
            </View>
            <Text
              style={[
                styles.answerText,
                selectedAnswer === option.value && styles.answerTextSelected,
                currentQuestion.isScenario && styles.answerTextScenario,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.nextButton,
            selectedAnswer === null && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={selectedAnswer === null}
        >
          <Text
            style={[
              styles.nextButtonText,
              selectedAnswer === null && styles.nextButtonTextDisabled,
            ]}
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  questionContainer: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  questionContainerScenario: {
    flex: 1,
    maxHeight: '40%',
  },
  questionScroll: {
    flex: 1,
  },
  questionNumber: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: typography.xl,
    fontWeight: typography.semibold,
    color: colors.primary,
    lineHeight: 32,
  },
  questionTextScenario: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    lineHeight: 24,
  },
  answersContainer: {
    flex: 1,
    padding: spacing.md,
  },
  answersContent: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  answerButtonSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  answerButtonScenario: {
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  answerRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerRadioSelected: {
    borderColor: colors.accent,
  },
  answerRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  answerText: {
    fontSize: typography.md,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  answerTextSelected: {
    color: colors.primary,
  },
  answerTextScenario: {
    flex: 1,
    flexWrap: 'wrap',
  },
  footer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  nextButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: colors.surface,
  },
  nextButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  nextButtonTextDisabled: {
    color: colors.tertiary,
  },
});
