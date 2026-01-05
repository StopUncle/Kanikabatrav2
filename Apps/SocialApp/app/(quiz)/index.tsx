import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';
import { router } from 'expo-router';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Target,
  Shield,
  Heart,
  Crown,
  Check,
  Brain,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { UpgradePromptCard } from '../../components/upgrade/UpgradePromptCard';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { useAuthStore } from '../../stores/authStore';
import { quizAccessService } from '../../services/quizAccessService';
import { QUIZ_PRICE_USD } from '../../services/paymentService';

type FilterType = 'all' | 'free' | 'premium' | 'purchased';

// Icon mapping for quizzes
const quizIcons: Record<string, React.ReactNode> = {
  'dark-triad': <Sparkles size={28} color={colors.accent} strokeWidth={1.5} />,
  'manipulation-iq': <Target size={28} color="#E54545" strokeWidth={1.5} />,
  'emotional-armor': <Shield size={28} color="#4CAF50" strokeWidth={1.5} />,
  'attachment-style': <Heart size={28} color="#9C27B0" strokeWidth={1.5} />,
};

// Available quizzes
const quizzes = [
  {
    id: 'dark-triad',
    title: 'Dark Triad Assessment',
    subtitle: 'Discover your shadow traits',
    description: 'Measure your levels of Machiavellianism, Narcissism, and Psychopathy',
    questions: 27,
    duration: '8 min',
    iconId: 'dark-triad',
    color: colors.accent,
    isFree: true,
    contributesToProfile: false,
  },
  {
    id: 'manipulation-iq',
    title: 'Manipulation IQ Test',
    subtitle: 'How susceptible are you?',
    description: 'Discover your vulnerability to common manipulation tactics',
    questions: 20,
    duration: '6 min',
    iconId: 'manipulation-iq',
    color: '#E54545',
    isFree: true,
    contributesToProfile: false,
  },
  {
    id: 'emotional-armor',
    title: 'Emotional Armor Score',
    subtitle: 'Rate your defenses',
    description: 'Assess your emotional boundaries and resilience',
    questions: 35,
    duration: '15 min',
    iconId: 'emotional-armor',
    color: '#4CAF50',
    isFree: false,
    contributesToProfile: true,
  },
  {
    id: 'attachment-style',
    title: 'Attachment Style Quiz',
    subtitle: 'Understand your patterns',
    description: 'Identify your attachment style and relationship patterns',
    questions: 30,
    duration: '12 min',
    iconId: 'attachment-style',
    color: '#9C27B0',
    isFree: false,
    contributesToProfile: true,
  },
];

interface QuizCardProps {
  quiz: typeof quizzes[0];
  isPurchased: boolean;
  hasSubscription: boolean;
}

function QuizCard({ quiz, isPurchased, hasSubscription }: QuizCardProps) {
  const hasAccess = quiz.isFree || isPurchased || hasSubscription;

  return (
    <Pressable
      onPress={() => {
        haptics.medium();
        router.push(`/(quiz)/${quiz.id}`);
      }}
    >
      <Card style={styles.quizCard}>
        <View style={[styles.quizIcon, { backgroundColor: quiz.color + '20' }]}>
          {quizIcons[quiz.iconId]}
        </View>

        <View style={styles.quizContent}>
          <View style={styles.quizHeader}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            {!quiz.isFree && (
              isPurchased ? (
                <View style={styles.purchasedBadge}>
                  <Check size={10} color={colors.success} strokeWidth={3} />
                  <Text style={styles.purchasedText}>OWNED</Text>
                </View>
              ) : (
                <View style={styles.premiumBadge}>
                  <Crown size={10} color={colors.background} strokeWidth={2.5} />
                  <Text style={styles.premiumText}>PREMIUM</Text>
                </View>
              )
            )}
          </View>
          <Text style={styles.quizSubtitle}>{quiz.subtitle}</Text>
          <Text style={styles.quizDescription} numberOfLines={2}>
            {quiz.description}
          </Text>

          {/* Meta info row */}
          <View style={styles.quizMetaRow}>
            <Text style={styles.quizMetaText}>
              {quiz.questions} questions • {quiz.duration}
            </Text>

            {/* Profile contribution badge */}
            {quiz.contributesToProfile && (
              <View style={styles.profileBadge}>
                <Brain size={10} color={colors.accent} strokeWidth={2} />
                <Text style={styles.profileBadgeText}>Profile</Text>
              </View>
            )}
          </View>

          {/* Price or access indicator */}
          {!quiz.isFree && !hasAccess && (
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>${QUIZ_PRICE_USD} one-time</Text>
            </View>
          )}
        </View>

        <ChevronRight size={22} color={quiz.color} strokeWidth={2} />
      </Card>
    </Pressable>
  );
}

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'free', label: 'Free' },
  { id: 'premium', label: 'Premium' },
  { id: 'purchased', label: 'Purchased' },
];

export default function QuizSelectionScreen() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [purchasedQuizIds, setPurchasedQuizIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasSubscription = user?.subscription_tier === 'premium' || user?.subscription_tier === 'vip';

  // Load purchased quizzes on mount
  useEffect(() => {
    const loadPurchases = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        const purchased = await quizAccessService.getUserPurchasedQuizzes(user.id);
        setPurchasedQuizIds(purchased);
      } catch (error) {
        logger.error('Failed to load purchased quizzes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void loadPurchases();
  }, [user?.id]);

  // Filter quizzes based on selected filter
  const filteredQuizzes = quizzes.filter(quiz => {
    switch (filter) {
      case 'free':
        return quiz.isFree;
      case 'premium':
        return !quiz.isFree;
      case 'purchased':
        return purchasedQuizIds.includes(quiz.id) || (hasSubscription && !quiz.isFree);
      default:
        return true;
    }
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)');
          }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={colors.primary} strokeWidth={2} />
        </Pressable>
        <Text style={styles.title}>Quizzes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconContainer}>
            <Sparkles size={48} color={colors.accent} strokeWidth={1.5} />
          </View>
          <Text style={styles.heroTitle}>Look Into The Mirror</Text>
          <Text style={styles.heroText}>
            These psychological assessments will reveal hidden aspects of your
            personality. Answer honestly for accurate insights.
          </Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {FILTERS.map(f => (
            <Pressable
              key={f.id}
              style={[
                styles.filterTab,
                filter === f.id && styles.filterTabActive,
              ]}
              onPress={() => {
                haptics.light();
                setFilter(f.id);
              }}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${f.label}`}
              accessibilityState={{ selected: filter === f.id }}
            >
              <Text
                style={[
                  styles.filterTabText,
                  filter === f.id && styles.filterTabTextActive,
                ]}
              >
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Upgrade prompt for free users */}
        {!hasSubscription && (
          <UpgradePromptCard
            variant="premium-quiz"
            customTitle="Unlock All Premium Quizzes"
            customSubtitle="Build your complete psychological profile with Premium"
          />
        )}

        {/* Quiz List */}
        <View style={styles.quizList}>
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                isPurchased={purchasedQuizIds.includes(quiz.id)}
                hasSubscription={hasSubscription}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {filter === 'purchased'
                  ? 'You haven\'t purchased any quizzes yet'
                  : 'No quizzes match this filter'}
              </Text>
            </View>
          )}
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          These quizzes are for educational purposes only and are not clinical
          diagnostic tools. For professional assessment, consult a licensed
          psychologist.
        </Text>
      </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  placeholder: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  heroText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  quizList: {
    gap: spacing.md,
  },
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  quizIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizContent: {
    flex: 1,
    gap: 2,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quizTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.accent,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  premiumText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.background,
  },
  quizSubtitle: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  quizDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  quizMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  quizMetaText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  purchasedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.success + '20',
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  purchasedText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.success,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.accentMuted,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  profileBadgeText: {
    fontSize: 9,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  priceRow: {
    marginTop: spacing.xs,
  },
  priceText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  filterTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterTabText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  filterTabTextActive: {
    color: colors.background,
  },
  emptyState: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.tertiary,
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    lineHeight: 18,
  },
});
