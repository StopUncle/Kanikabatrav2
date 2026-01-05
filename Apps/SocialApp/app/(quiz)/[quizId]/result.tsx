import { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../../lib/logger';
import { router, useLocalSearchParams } from 'expo-router';
import { X, Drama, Crown, HeartOff, Share2, RefreshCw, Image, Lock, Shield, Heart, Eye, Brain, Target, Zap } from 'lucide-react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ConfettiCelebration } from '../../../components/celebrations/ConfettiCelebration';
import { EmailCaptureModal } from '../../../components/quiz/EmailCaptureModal';
import { ShareResultCard } from '../../../components/quiz/ShareResultCard';
import { haptics } from '../../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../../lib/theme';
import { useAuthStore } from '../../../stores/authStore';
import { activityService } from '../../../services/activityService';
import { quizService } from '../../../services/quizService';
import { gamificationService } from '../../../services/gamificationService';
import { challengeService } from '../../../services/challengeService';
import { shareService } from '../../../services/shareService';

// Import quiz scoring functions
import {
  darkTriadQuiz,
  calculateDarkTriadScores,
  getTraitDescription,
  darkTriadDescriptions,
} from '../../../content/quizzes/dark-triad';
import {
  manipulationIQQuiz,
  calculateManipulationIQ,
  getManipulationIQInterpretation,
} from '../../../content/quizzes/manipulation-iq';
import {
  emotionalArmorQuiz,
  calculateArmorScore,
  getOverallInterpretation,
  getDimensionDescription,
  armorDimensions,
} from '../../../content/quizzes/emotional-armor';
import {
  attachmentStyleQuiz,
  calculateAttachmentStyle,
  attachmentStyles,
} from '../../../content/quizzes/attachment-style';

// Result categories based on score
const resultCategories = {
  low: { label: 'Low', color: '#4CAF50', description: 'Below average tendencies' },
  moderate: { label: 'Moderate', color: colors.warning, description: 'Average tendencies' },
  high: { label: 'High', color: '#E54545', description: 'Above average tendencies' },
};

// Quiz type definitions
type QuizType = 'dark-triad' | 'manipulation-iq' | 'emotional-armor' | 'attachment-style';

interface DarkTriadScores {
  type: 'dark-triad';
  machiavellianism: number;
  narcissism: number;
  psychopathy: number;
}

interface ManipulationIQScores {
  type: 'manipulation-iq';
  score: number;
  total: number;
  percentage: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}

interface EmotionalArmorScores {
  type: 'emotional-armor';
  overall: number;
  dimensions: {
    boundaries: number;
    detachment: number;
    realityTesting: number;
    recovery: number;
    selfWorth: number;
  };
}

interface AttachmentScores {
  type: 'attachment-style';
  scores: {
    secure: number;
    anxious: number;
    avoidant: number;
    disorganized: number;
  };
  primary: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
  secondary: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
}

type QuizScores = DarkTriadScores | ManipulationIQScores | EmotionalArmorScores | AttachmentScores;

export default function QuizResultScreen() {
  const resultCardRef = useRef<View>(null);
  const shareCardRef = useRef<View>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [quizTitle, setQuizTitle] = useState<string>('Assessment');
  const [showConfetti, setShowConfetti] = useState(true);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [hasCompletedEmailCapture, setHasCompletedEmailCapture] = useState(false);
  const { user, isGuest, guestEmail } = useAuthStore();

  const { quizId, answers, email, name } = useLocalSearchParams<{
    quizId: string;
    answers: string;
    email?: string;
    name?: string;
  }>();

  // Helper to create empty scores based on quiz type
  const getEmptyScores = (type: string): QuizScores => {
    switch (type) {
      case 'manipulation-iq':
        return { type: 'manipulation-iq', score: 0, total: 20, percentage: 0, categoryBreakdown: {} };
      case 'emotional-armor':
        return { type: 'emotional-armor', overall: 0, dimensions: { boundaries: 0, detachment: 0, realityTesting: 0, recovery: 0, selfWorth: 0 } };
      case 'attachment-style':
        return { type: 'attachment-style', scores: { secure: 50, anxious: 50, avoidant: 50, disorganized: 50 }, primary: 'secure', secondary: 'anxious' };
      default:
        return { type: 'dark-triad', machiavellianism: 0, narcissism: 0, psychopathy: 0 };
    }
  };

  // Calculate scores using the correct scoring function per quiz type
  const scores: QuizScores = useMemo(() => {
    if (!answers) {
      return getEmptyScores(quizId || 'dark-triad');
    }

    try {
      const parsedAnswers: Record<string, number> = JSON.parse(answers);

      switch (quizId) {
        case 'dark-triad': {
          const result = calculateDarkTriadScores(parsedAnswers);
          return { type: 'dark-triad', ...result };
        }
        case 'manipulation-iq': {
          // Manipulation IQ uses option index as answer value
          // Convert to option text for scoring
          const textAnswers: Record<string, string> = {};
          manipulationIQQuiz.scenarios.forEach(scenario => {
            const answerIndex = parsedAnswers[scenario.id];
            // Validate index is within bounds (1-based index, so must be 1 to options.length)
            if (answerIndex !== undefined && answerIndex >= 1 && answerIndex <= scenario.options.length) {
              const option = scenario.options[answerIndex - 1];
              if (option) {
                textAnswers[scenario.id] = option.text;
              }
            }
          });
          const result = calculateManipulationIQ(textAnswers);
          return { type: 'manipulation-iq', ...result };
        }
        case 'emotional-armor': {
          const result = calculateArmorScore(parsedAnswers);
          return { type: 'emotional-armor', ...result };
        }
        case 'attachment-style': {
          const result = calculateAttachmentStyle(parsedAnswers);
          return { type: 'attachment-style', ...result };
        }
        default:
          return getEmptyScores(quizId || 'dark-triad');
      }
    } catch (e) {
      logger.error('Failed to parse quiz answers:', e);
      return getEmptyScores(quizId || 'dark-triad');
    }
  }, [answers, quizId]);

  // Calculate overall score based on quiz type
  const overallScore = useMemo(() => {
    if (!scores || !scores.type) return 0;

    switch (scores.type) {
      case 'dark-triad':
        return Math.round(
          ((scores.machiavellianism ?? 0) + (scores.narcissism ?? 0) + (scores.psychopathy ?? 0)) / 3
        );
      case 'manipulation-iq':
        return scores.percentage ?? 0;
      case 'emotional-armor':
        return scores.overall ?? 0;
      case 'attachment-style':
        return scores.scores?.[scores.primary] ?? 0;
      default:
        return 0;
    }
  }, [scores]);

  // Generate traits for share card (only for dark triad)
  const traits = scores.type === 'dark-triad'
    ? shareService.generateDarkTriadTraits({
        machiavellianism: scores.machiavellianism,
        narcissism: scores.narcissism,
        psychopathy: scores.psychopathy,
      })
    : [];

  // Calculate percentile and comparison for premium users
  const percentile = user?.subscription_tier !== 'free'
    ? shareService.calculatePercentile(overallScore)
    : undefined;

  const comparisonFigure = user?.subscription_tier !== 'free' && traits.length > 0
    ? shareService.getComparisonFigure(traits)
    : undefined;

  const getCategory = (score: number) => {
    if (score < 40) return resultCategories.low;
    if (score < 70) return resultCategories.moderate;
    return resultCategories.high;
  };

  // Get quiz-specific title for overall score display
  const getScoreTitle = () => {
    switch (scores.type) {
      case 'dark-triad':
        return 'Dark Triad Score';
      case 'manipulation-iq':
        return 'Manipulation IQ';
      case 'emotional-armor':
        return 'Armor Strength';
      case 'attachment-style':
        return `Primary: ${attachmentStyles[scores.primary].name}`;
      default:
        return 'Overall Score';
    }
  };

  // Get interpretation text based on quiz type
  const getInterpretation = () => {
    switch (scores.type) {
      case 'manipulation-iq':
        return getManipulationIQInterpretation(scores.percentage);
      case 'emotional-armor':
        return getOverallInterpretation(scores.overall);
      case 'attachment-style':
        return attachmentStyles[scores.primary];
      default:
        return null;
    }
  };

  // Track activity when result is shown
  useEffect(() => {
    const trackQuizCompletion = async () => {
      if (!quizId) return;

      // Fetch quiz title
      const quizzes = await quizService.getQuizzes();
      const quiz = quizzes.find(q => q.id === quizId || q.slug === quizId);
      if (quiz) {
        setQuizTitle(quiz.title);
      }

      // Track activity if user is logged in (not a guest)
      if (user?.id && !isGuest) {
        await activityService.trackActivity(
          user.id,
          'quiz_completed',
          quizId,
          quiz?.title || 'a quiz',
          { score: overallScore }
        );

        // Award XP and check for badges
        await gamificationService.handleQuizCompleted(quizId, overallScore, user.id);

        // Update daily challenge progress
        await challengeService.updateProgress('quiz');
      }
    };

    void trackQuizCompletion();
  }, [quizId, user?.id, isGuest, overallScore]);

  // Show email capture modal for guest users after a delay
  useEffect(() => {
    if (isGuest && !guestEmail && !hasCompletedEmailCapture) {
      const timer = setTimeout(() => {
        setShowEmailCapture(true);
      }, 2000); // Show after 2 seconds to let them see their score first
      return () => clearTimeout(timer);
    }
  }, [isGuest, guestEmail, hasCompletedEmailCapture]);

  const handleEmailCaptureSuccess = () => {
    setShowEmailCapture(false);
    setHasCompletedEmailCapture(true);
    haptics.success();
    // Redirect to main app now that they have an account
    router.replace('/(tabs)');
  };

  const handleEmailCaptureClose = () => {
    setShowEmailCapture(false);
    setHasCompletedEmailCapture(true);
  };

  // Shareable result data
  const shareableResult = {
    quizTitle,
    quizId: quizId || 'dark-triad',
    overallScore,
    traits,
    percentile,
    comparisonFigure,
    userName: user?.full_name ?? undefined,
  };

  const handleShareText = async () => {
    haptics.medium();
    await shareService.shareText(shareableResult, {
      includePercentile: !!percentile,
      includeComparison: !!comparisonFigure,
    });
  };

  const handleShareImage = async () => {
    if (!shareCardRef.current) {
      // Fallback to old method if share card not ready
      if (!resultCardRef.current) return;
      haptics.medium();
      setIsCapturing(true);

      try {
        const uri = await captureRef(resultCardRef, {
          format: 'png',
          quality: 1,
          result: 'tmpfile',
        });

        const isAvailable = await Sharing.isAvailableAsync();

        if (isAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: 'image/png',
            dialogTitle: 'Share your Dark Triad results',
          });
        } else {
          await handleShareText();
        }
      } catch (error) {
        logger.error('Error capturing screenshot:', error);
        Alert.alert('Error', 'Failed to capture screenshot. Try sharing as text instead.');
      } finally {
        setIsCapturing(false);
      }
      return;
    }

    haptics.medium();
    setIsCapturing(true);

    try {
      const success = await shareService.shareImage(shareCardRef, shareableResult);
      if (!success) {
        Alert.alert('Error', 'Failed to share image. Try sharing as text instead.');
      }
    } catch (error) {
      logger.error('Error sharing image:', error);
      Alert.alert('Error', 'Failed to share. Try again later.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleRetake = () => {
    haptics.light();
    router.replace(`/(quiz)/${quizId}`);
  };

  const handleExploreContent = () => {
    haptics.medium();
    router.replace('/(tabs)/learn');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Celebration confetti */}
      <ConfettiCelebration
        trigger={showConfetti}
        onComplete={() => setShowConfetti(false)}
        count={120}
      />

      <View style={styles.header}>
        <View style={styles.placeholder} />
        <Text style={styles.headerTitle}>Your Results</Text>
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)');
          }}
        >
          <X size={20} color={colors.secondary} strokeWidth={2} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Shareable Result Card */}
        <View
          ref={resultCardRef}
          style={styles.shareableCard}
          collapsable={false}
        >
          {/* Overall Score */}
          <View style={styles.overallSection}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>
                {scores.type === 'manipulation-iq' ? `${scores.score}/${scores.total}` : overallScore}
              </Text>
              <Text style={styles.scoreLabel}>
                {scores.type === 'manipulation-iq' ? `${scores.percentage}%` : '/ 100'}
              </Text>
            </View>
            <Text style={styles.overallTitle}>{getScoreTitle()}</Text>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: getCategory(overallScore).color + '20' },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: getCategory(overallScore).color },
                ]}
              >
                {scores.type === 'manipulation-iq'
                  ? getManipulationIQInterpretation(scores.percentage).title
                  : scores.type === 'emotional-armor'
                  ? getOverallInterpretation(scores.overall).title
                  : scores.type === 'attachment-style'
                  ? attachmentStyles[scores.primary].name
                  : getCategory(overallScore).label}
              </Text>
            </View>
          </View>

          {/* Dynamic Trait/Dimension Display */}
          <View style={styles.traitsSection}>
            <Text style={styles.sectionTitle}>
              {scores.type === 'dark-triad' && 'Trait Breakdown'}
              {scores.type === 'manipulation-iq' && 'Category Breakdown'}
              {scores.type === 'emotional-armor' && 'Defense Dimensions'}
              {scores.type === 'attachment-style' && 'Attachment Styles'}
            </Text>

            {/* Dark Triad Traits */}
            {scores.type === 'dark-triad' && (
              <>
                <Card style={styles.traitCard}>
                  <View style={styles.traitHeader}>
                    <View style={[styles.traitIconContainer, { backgroundColor: 'rgba(139, 92, 246, 0.15)' }]}>
                      <Drama size={24} color="#8B5CF6" strokeWidth={1.5} />
                    </View>
                    <View style={styles.traitInfo}>
                      <Text style={styles.traitName}>Machiavellianism</Text>
                      <Text style={styles.traitDescription}>Strategic manipulation and cunning</Text>
                    </View>
                    <Text style={[styles.traitScore, { color: getCategory(scores.machiavellianism).color }]}>
                      {scores.machiavellianism}
                    </Text>
                  </View>
                  <View style={styles.traitBarContainer}>
                    <View style={[styles.traitBar, { width: `${scores.machiavellianism}%`, backgroundColor: getCategory(scores.machiavellianism).color }]} />
                  </View>
                </Card>

                <Card style={styles.traitCard}>
                  <View style={styles.traitHeader}>
                    <View style={[styles.traitIconContainer, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                      <Crown size={24} color="#F59E0B" strokeWidth={1.5} />
                    </View>
                    <View style={styles.traitInfo}>
                      <Text style={styles.traitName}>Narcissism</Text>
                      <Text style={styles.traitDescription}>Self-admiration and grandiosity</Text>
                    </View>
                    <Text style={[styles.traitScore, { color: getCategory(scores.narcissism).color }]}>
                      {scores.narcissism}
                    </Text>
                  </View>
                  <View style={styles.traitBarContainer}>
                    <View style={[styles.traitBar, { width: `${scores.narcissism}%`, backgroundColor: getCategory(scores.narcissism).color }]} />
                  </View>
                </Card>

                <Card style={styles.traitCard}>
                  <View style={styles.traitHeader}>
                    <View style={[styles.traitIconContainer, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                      <HeartOff size={24} color="#EF4444" strokeWidth={1.5} />
                    </View>
                    <View style={styles.traitInfo}>
                      <Text style={styles.traitName}>Psychopathy</Text>
                      <Text style={styles.traitDescription}>Low empathy and impulsivity</Text>
                    </View>
                    <Text style={[styles.traitScore, { color: getCategory(scores.psychopathy).color }]}>
                      {scores.psychopathy}
                    </Text>
                  </View>
                  <View style={styles.traitBarContainer}>
                    <View style={[styles.traitBar, { width: `${scores.psychopathy}%`, backgroundColor: getCategory(scores.psychopathy).color }]} />
                  </View>
                </Card>
              </>
            )}

            {/* Manipulation IQ Categories */}
            {scores.type === 'manipulation-iq' && (
              <>
                {Object.entries(scores.categoryBreakdown).map(([category, data]) => {
                  const percentage = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                  const categoryNames: Record<string, { name: string; icon: typeof Eye }> = {
                    'gaslighting': { name: 'Gaslighting', icon: Eye },
                    'guilt-trip': { name: 'Guilt-Tripping', icon: Heart },
                    'love-bombing': { name: 'Love-Bombing', icon: Heart },
                    'fear-induction': { name: 'Fear Induction', icon: Shield },
                    'triangulation': { name: 'Triangulation', icon: Target },
                    'intermittent-reinforcement': { name: 'Intermittent Reinforcement', icon: Zap },
                  };
                  const info = categoryNames[category] || { name: category, icon: Brain };
                  const IconComponent = info.icon;
                  return (
                    <Card key={category} style={styles.traitCard}>
                      <View style={styles.traitHeader}>
                        <View style={[styles.traitIconContainer, { backgroundColor: 'rgba(201, 169, 97, 0.15)' }]}>
                          <IconComponent size={24} color={colors.accent} strokeWidth={1.5} />
                        </View>
                        <View style={styles.traitInfo}>
                          <Text style={styles.traitName}>{info.name}</Text>
                          <Text style={styles.traitDescription}>{data.correct}/{data.total} correct</Text>
                        </View>
                        <Text style={[styles.traitScore, { color: getCategory(percentage).color }]}>{percentage}%</Text>
                      </View>
                      <View style={styles.traitBarContainer}>
                        <View style={[styles.traitBar, { width: `${percentage}%`, backgroundColor: getCategory(percentage).color }]} />
                      </View>
                    </Card>
                  );
                })}
              </>
            )}

            {/* Emotional Armor Dimensions */}
            {scores.type === 'emotional-armor' && (
              <>
                {Object.entries(scores.dimensions).map(([dimension, score]) => {
                  const dimensionInfo: Record<string, { name: string; desc: string; icon: typeof Shield }> = {
                    'boundaries': { name: 'Boundary Strength', desc: 'Ability to say no and protect your space', icon: Shield },
                    'detachment': { name: 'Emotional Detachment', desc: 'Resist absorbing others\' emotions', icon: Eye },
                    'realityTesting': { name: 'Reality Anchoring', desc: 'Trust your own perceptions', icon: Target },
                    'recovery': { name: 'Recovery Speed', desc: 'Bounce back from conflicts', icon: Zap },
                    'selfWorth': { name: 'Self-Worth Foundation', desc: 'Internal sense of value', icon: Crown },
                  };
                  const info = dimensionInfo[dimension] || { name: dimension, desc: '', icon: Brain };
                  const IconComponent = info.icon;
                  return (
                    <Card key={dimension} style={styles.traitCard}>
                      <View style={styles.traitHeader}>
                        <View style={[styles.traitIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                          <IconComponent size={24} color="#10B981" strokeWidth={1.5} />
                        </View>
                        <View style={styles.traitInfo}>
                          <Text style={styles.traitName}>{info.name}</Text>
                          <Text style={styles.traitDescription}>{info.desc}</Text>
                        </View>
                        <Text style={[styles.traitScore, { color: getCategory(score).color }]}>{score}</Text>
                      </View>
                      <View style={styles.traitBarContainer}>
                        <View style={[styles.traitBar, { width: `${score}%`, backgroundColor: getCategory(score).color }]} />
                      </View>
                    </Card>
                  );
                })}
              </>
            )}

            {/* Attachment Styles */}
            {scores.type === 'attachment-style' && (
              <>
                {Object.entries(scores.scores).map(([style, score]) => {
                  const styleInfo = attachmentStyles[style as keyof typeof attachmentStyles];
                  const isPrimary = style === scores.primary;
                  const isSecondary = style === scores.secondary;
                  return (
                    <Card key={style} style={{ ...styles.traitCard, ...(isPrimary ? styles.primaryCard : {}) }}>
                      <View style={styles.traitHeader}>
                        <View style={[styles.traitIconContainer, { backgroundColor: styleInfo.color + '20' }]}>
                          <Text style={{ fontSize: 20 }}>{styleInfo.icon}</Text>
                        </View>
                        <View style={styles.traitInfo}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Text style={styles.traitName}>{styleInfo.name}</Text>
                            {isPrimary && <Text style={[styles.badge, { backgroundColor: styleInfo.color }]}>Primary</Text>}
                            {isSecondary && <Text style={[styles.badge, { backgroundColor: colors.tertiary }]}>Secondary</Text>}
                          </View>
                          <Text style={styles.traitDescription}>{styleInfo.summary}</Text>
                        </View>
                        <Text style={[styles.traitScore, { color: styleInfo.color }]}>{score}</Text>
                      </View>
                      <View style={styles.traitBarContainer}>
                        <View style={[styles.traitBar, { width: `${score}%`, backgroundColor: styleInfo.color }]} />
                      </View>
                    </Card>
                  );
                })}
              </>
            )}
          </View>

          {/* App Branding for Screenshot */}
          <View style={styles.brandingFooter}>
            <Text style={styles.brandingText}>The Dark Mirror</Text>
            <Text style={styles.brandingUrl}>thedarkmirror.app</Text>
          </View>
        </View>

        {/* Dynamic Insights */}
        <Card style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Your Insights</Text>
          <Text style={styles.insightsText}>
            {scores.type === 'dark-triad' && (
              <>
                {getTraitDescription('machiavellianism', scores.machiavellianism)}
                {'\n\n'}
                {getTraitDescription('narcissism', scores.narcissism)}
                {'\n\n'}
                {getTraitDescription('psychopathy', scores.psychopathy)}
              </>
            )}
            {scores.type === 'manipulation-iq' && (
              <>
                {getManipulationIQInterpretation(scores.percentage).description}
                {'\n\n'}
                You correctly identified {scores.score} out of {scores.total} manipulation tactics.
                {scores.percentage < 70 && '\n\nFocus on studying the categories where you scored lowest - these represent your vulnerability areas.'}
              </>
            )}
            {scores.type === 'emotional-armor' && (
              <>
                {getOverallInterpretation(scores.overall).description}
                {'\n\n'}
                {(() => {
                  const dims = Object.entries(scores.dimensions);
                  const lowest = dims.reduce((a, b) => a[1] < b[1] ? a : b);
                  const highest = dims.reduce((a, b) => a[1] > b[1] ? a : b);
                  return `Your strongest dimension is ${highest[0]} (${highest[1]}%). Consider developing your ${lowest[0]} (${lowest[1]}%) for more balanced protection.`;
                })()}
              </>
            )}
            {scores.type === 'attachment-style' && (
              <>
                {attachmentStyles[scores.primary].description}
                {'\n\n'}
                <Text style={{ fontWeight: '600' as const }}>Manipulation Risk: </Text>
                {attachmentStyles[scores.primary].manipulationRisk}
              </>
            )}
          </Text>
        </Card>

        {/* Premium Insights Preview (for guests) */}
        {isGuest && (
          <Card style={styles.lockedCard}>
            <View style={styles.lockedHeader}>
              <Lock size={20} color={colors.accent} strokeWidth={2} />
              <Text style={styles.lockedTitle}>Premium Insights Locked</Text>
            </View>
            <View style={styles.lockedItems}>
              <View style={styles.lockedItem}>
                <Text style={styles.lockedItemText}>Your percentile ranking vs. all users</Text>
              </View>
              <View style={styles.lockedItem}>
                <Text style={styles.lockedItemText}>Personalized book recommendations</Text>
              </View>
              <View style={styles.lockedItem}>
                <Text style={styles.lockedItemText}>Complete psychological profile</Text>
              </View>
            </View>
            <Button
              title="Create Account to Unlock"
              onPress={() => setShowEmailCapture(true)}
            />
          </Card>
        )}

        {/* CTA */}
        <Card style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Want to learn more?</Text>
          <Text style={styles.ctaText}>
            Explore our courses on dark psychology to understand these traits
            better and learn how to use them ethically.
          </Text>
          <Button
            title="Explore Courses"
            onPress={handleExploreContent}
          />
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.actionButton, isCapturing && styles.actionButtonDisabled]}
            onPress={handleShareImage}
            disabled={isCapturing}
          >
            <Image size={18} color={colors.accent} strokeWidth={2} />
            <Text style={styles.actionText}>
              {isCapturing ? 'Capturing...' : 'Share Image'}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleShareText}>
            <Share2 size={18} color={colors.accent} strokeWidth={2} />
            <Text style={styles.actionText}>Share Text</Text>
          </Pressable>
        </View>
        <Pressable style={styles.retakeButton} onPress={handleRetake}>
          <RefreshCw size={18} color={colors.secondary} strokeWidth={2} />
          <Text style={styles.retakeText}>Retake Quiz</Text>
        </Pressable>
      </ScrollView>

      {/* Hidden Share Card for Screenshot - positioned off-screen */}
      <View style={styles.hiddenShareCard}>
        <ShareResultCard
          ref={shareCardRef}
          quizTitle={quizTitle}
          overallScore={overallScore}
          traits={traits}
          percentile={percentile}
          comparisonFigure={comparisonFigure}
          userName={user?.full_name ?? undefined}
        />
      </View>

      {/* Email Capture Modal for Guests */}
      <EmailCaptureModal
        visible={showEmailCapture}
        onClose={handleEmailCaptureClose}
        onSuccess={handleEmailCaptureSuccess}
        quizTitle={quizTitle}
        score={overallScore}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  placeholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  overallSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.surface,
    borderWidth: 4,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  scoreLabel: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  overallTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  categoryBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
  },
  categoryText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  traitsSection: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  traitCard: {
    gap: spacing.md,
  },
  primaryCard: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  badge: {
    fontSize: 10,
    fontWeight: typography.semibold,
    color: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  traitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  traitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitInfo: {
    flex: 1,
  },
  traitName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  traitDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  traitScore: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
  },
  traitBarContainer: {
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  traitBar: {
    height: '100%',
    borderRadius: 4,
  },
  insightsCard: {
    backgroundColor: colors.surfaceElevated,
    gap: spacing.md,
  },
  insightsTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  insightsText: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 24,
  },
  ctaCard: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
    borderWidth: 1,
    gap: spacing.md,
  },
  ctaTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  ctaText: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  actionText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  retakeText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  shareableCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.lg,
  },
  brandingFooter: {
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  brandingText: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  brandingUrl: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  lockedCard: {
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: spacing.md,
  },
  lockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  lockedTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  lockedItems: {
    gap: spacing.sm,
  },
  lockedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  lockedItemText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  hiddenShareCard: {
    position: 'absolute',
    left: -1000,
    top: -1000,
    opacity: 0,
  },
});
