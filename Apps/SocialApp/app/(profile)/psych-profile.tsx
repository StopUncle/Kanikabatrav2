import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Crown,
  Target,
  TrendingUp,
  ChevronRight,
  Lock,
  Sparkles,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { RadarChart } from '../../components/profile/RadarChart';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';
import { psychProfileService, UserPsychProfile, ProfileTraitData } from '../../services/psychProfileService';
import { quizAccessService } from '../../services/quizAccessService';
import { useAuthStore } from '../../stores/authStore';

// Recommended quizzes based on incomplete traits
const RECOMMENDED_QUIZZES = [
  { id: 'dark-triad', trait: 'machiavellianism', title: 'Dark Triad Assessment', icon: '🪞' },
  { id: 'manipulation-iq', trait: 'manipulationResist', title: 'Manipulation IQ', icon: '🎯' },
  { id: 'emotional-armor', trait: 'emotionalArmor', title: 'Emotional Armor', icon: '🛡️' },
  { id: 'attachment-style', trait: 'attachmentSecure', title: 'Attachment Style', icon: '💫' },
  { id: 'narcissism-scale', trait: 'narcissism', title: 'Narcissism Scale', icon: '👑' },
  { id: 'psychopathy-check', trait: 'psychopathy', title: 'Psychopathy Check', icon: '🧠' },
];

export default function PsychProfileScreen() {
  const { user } = useAuthStore();

  const [profile, setProfile] = useState<UserPsychProfile | null>(null);
  const [traitData, setTraitData] = useState<ProfileTraitData[]>([]);
  const [archetype, setArchetype] = useState<{ name: string; description: string } | null>(null);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadProfile();
  }, [user?.id]);

  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Check if user has premium access
      const hasAccess = await quizAccessService.hasPremiumAccess(user.id);
      setHasPremiumAccess(hasAccess);

      // Dev mode - use mock profile data for testing UI
      const isDevMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
      if (isDevMode) {
        const mockProfile: UserPsychProfile = {
          userId: user.id,
          narcissism: 72,
          machiavellianism: 65,
          psychopathy: 45,
          manipulationResist: 69,
          emotionalArmor: 81,
          attachmentSecure: 58,
          quizzesTaken: 4,
          lastUpdated: new Date().toISOString(),
        };
        setProfile(mockProfile);
        setHasPremiumAccess(true);
        setTraitData([
          { trait: 'narcissism', score: 72, percentile: 78, label: 'Narcissism', description: 'Self-focus and need for admiration', color: '#E54545' },
          { trait: 'machiavellianism', score: 65, percentile: 70, label: 'Machiavellianism', description: 'Strategic thinking and willingness to manipulate', color: '#C9A961' },
          { trait: 'psychopathy', score: 45, percentile: 52, label: 'Psychopathy', description: 'Emotional detachment and impulsivity', color: '#8B5CF6' },
          { trait: 'manipulationResist', score: 69, percentile: 72, label: 'Manipulation Resistance', description: 'Ability to detect and resist manipulation', color: '#10B981' },
          { trait: 'emotionalArmor', score: 81, percentile: 85, label: 'Emotional Armor', description: 'Emotional resilience and self-protection', color: '#3B82F6' },
          { trait: 'attachmentSecure', score: 58, percentile: 45, label: 'Secure Attachment', description: 'Healthy relationship patterns', color: '#EC4899' },
        ]);
        setArchetype({ name: 'The Strategist', description: 'Calculated and perceptive, you understand power dynamics and use them wisely.' });
        setLoading(false);
        return;
      }

      // Load profile
      const userProfile = await psychProfileService.getProfile(user.id);
      setProfile(userProfile);

      if (userProfile) {
        // Get trait data with percentiles
        const traits = await psychProfileService.getProfileWithPercentiles(user.id);
        setTraitData(traits);

        // Get archetype
        const arch = psychProfileService.getArchetype(userProfile);
        setArchetype(arch);
      }
    } catch (error) {
      logger.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const completionPercent = profile ? psychProfileService.getProfileCompletion(profile) : 0;
  const remainingQuizzes = 6 - (profile?.quizzesTaken || 0);

  // Get chart data for radar
  const chartData = traitData.map(t => ({
    trait: t.trait,
    label: t.label.split(' ')[0], // Shorten for chart
    score: t.score,
    color: t.color,
  }));

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>Loading your profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // No premium access - show upgrade prompt
  if (!hasPremiumAccess && !profile) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace('/(tabs)/profile');
            }}
          >
            <ArrowLeft size={24} color={colors.primary} strokeWidth={2} />
          </Pressable>
          <Text style={styles.headerTitle}>Dark Psychology Profile</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Card variant="glassGold" glow style={styles.upgradeCard}>
            <View style={styles.upgradeIcon}>
              <LinearGradient colors={gradients.goldVertical} style={StyleSheet.absoluteFill} />
              <Lock size={40} color={colors.background} strokeWidth={2} />
            </View>

            <Text style={styles.upgradeTitle}>Unlock Your Full Profile</Text>
            <Text style={styles.upgradeDescription}>
              Take premium quizzes to build your comprehensive Dark Psychology Profile.
              See how you rank across all 6 major psychological traits.
            </Text>

            <View style={styles.upgradeFeatures}>
              <View style={styles.upgradeFeature}>
                <Target size={16} color={colors.accent} />
                <Text style={styles.upgradeFeatureText}>6 trait breakdown</Text>
              </View>
              <View style={styles.upgradeFeature}>
                <TrendingUp size={16} color={colors.accent} />
                <Text style={styles.upgradeFeatureText}>Percentile rankings</Text>
              </View>
              <View style={styles.upgradeFeature}>
                <Sparkles size={16} color={colors.accent} />
                <Text style={styles.upgradeFeatureText}>Personality archetype</Text>
              </View>
            </View>

            <GradientButton
              title="Upgrade to Premium"
              onPress={() => router.push('/(settings)/subscription')}
              icon={<Crown size={18} color={colors.background} />}
              fullWidth
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // No profile yet - prompt to take first quiz
  if (!profile || profile.quizzesTaken === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace('/(tabs)/profile');
            }}
          >
            <ArrowLeft size={24} color={colors.primary} strokeWidth={2} />
          </Pressable>
          <Text style={styles.headerTitle}>Dark Psychology Profile</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Card variant="glass" style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Target size={48} color={colors.accent} strokeWidth={1.5} />
            </View>

            <Text style={styles.emptyTitle}>Start Building Your Profile</Text>
            <Text style={styles.emptyDescription}>
              Take premium quizzes to discover your psychological makeup.
              Each quiz contributes to your overall profile.
            </Text>

            <GradientButton
              title="Take Your First Quiz"
              onPress={() => router.push('/(quiz)')}
              fullWidth
            />
          </Card>

          {/* Recommended Quizzes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended Quizzes</Text>
            {RECOMMENDED_QUIZZES.slice(0, 3).map((quiz) => (
              <Pressable
                key={quiz.id}
                style={styles.quizCard}
                onPress={() => {
                  haptics.medium();
                  router.push(`/(quiz)/${quiz.id}`);
                }}
              >
                <Text style={styles.quizIcon}>{quiz.icon}</Text>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizTrait}>Measures: {quiz.trait}</Text>
                </View>
                <ChevronRight size={20} color={colors.tertiary} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Full profile view
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace('/(tabs)/profile');
          }}
        >
          <ArrowLeft size={24} color={colors.primary} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Dark Psychology Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Archetype Card */}
        {archetype && (
          <Card variant="glassGold" glow style={styles.archetypeCard}>
            <View style={styles.archetypeHeader}>
              <Crown size={20} color={colors.accent} />
              <Text style={styles.archetypeLabel}>YOUR ARCHETYPE</Text>
            </View>
            <Text style={styles.archetypeName}>{archetype.name}</Text>
            <Text style={styles.archetypeDescription}>{archetype.description}</Text>
          </Card>
        )}

        {/* Completion Progress */}
        <Card variant="glass" style={styles.completionCard}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionTitle}>Profile Completion</Text>
            <Text style={styles.completionPercent}>{completionPercent}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={gradients.goldPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBar, { width: `${completionPercent}%` }]}
            />
          </View>
          {remainingQuizzes > 0 && (
            <Text style={styles.completionHint}>
              Take {remainingQuizzes} more quiz{remainingQuizzes > 1 ? 'zes' : ''} to complete your profile
            </Text>
          )}
        </Card>

        {/* Radar Chart */}
        {chartData.length > 0 && (
          <Card variant="glass" style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.chartTitle}>Trait Analysis</Text>
            </View>
            <RadarChart data={chartData} size={280} />
          </Card>
        )}

        {/* Trait Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>Trait Breakdown</Text>
          </View>

          {traitData.map((trait) => (
            <Card key={trait.trait} style={styles.traitCard}>
              <View style={styles.traitHeader}>
                <View style={[styles.traitDot, { backgroundColor: trait.color }]} />
                <Text style={styles.traitLabel}>{trait.label}</Text>
                <Text style={styles.traitScore}>{Math.round(trait.score)}%</Text>
              </View>
              <Text style={styles.traitDescription}>{trait.description}</Text>
              <View style={styles.traitBarContainer}>
                <View
                  style={[
                    styles.traitBar,
                    { width: `${trait.score}%`, backgroundColor: trait.color },
                  ]}
                />
              </View>
              {trait.percentile && (
                <View style={styles.percentileBadge}>
                  <TrendingUp size={12} color={colors.accent} />
                  <Text style={styles.percentileText}>
                    Top {100 - trait.percentile}% of users
                  </Text>
                </View>
              )}
            </Card>
          ))}
        </View>

        {/* Take More Quizzes */}
        {remainingQuizzes > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Complete Your Profile</Text>
            </View>

            {RECOMMENDED_QUIZZES.slice(0, remainingQuizzes).map((quiz) => (
              <Pressable
                key={quiz.id}
                style={styles.quizCard}
                onPress={() => {
                  haptics.medium();
                  router.push(`/(quiz)/${quiz.id}`);
                }}
              >
                <Text style={styles.quizIcon}>{quiz.icon}</Text>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizTrait}>Measures: {quiz.trait}</Text>
                </View>
                <ChevronRight size={20} color={colors.tertiary} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: typography.md,
    color: colors.secondary,
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
  headerTitle: {
    fontSize: typography.lg,
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
  // Upgrade Card
  upgradeCard: {
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  upgradeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  upgradeTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  upgradeDescription: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  upgradeFeatures: {
    gap: spacing.sm,
    width: '100%',
  },
  upgradeFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  upgradeFeatureText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  // Empty State
  emptyCard: {
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  // Archetype Card
  archetypeCard: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  archetypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  archetypeLabel: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1.5,
  },
  archetypeName: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  archetypeDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  // Completion Card
  completionCard: {
    gap: spacing.sm,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  completionPercent: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  completionHint: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  // Chart Card
  chartCard: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  chartTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  // Sections
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionAccent: {
    width: 3,
    height: 20,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  // Trait Card
  traitCard: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  traitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  traitDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    flexShrink: 0,
  },
  traitLabel: {
    flex: 1,
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  traitScore: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
    flexShrink: 0,
    minWidth: 48,
    textAlign: 'right',
  },
  traitDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  traitBarContainer: {
    height: 6,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  traitBar: {
    height: '100%',
    borderRadius: 3,
  },
  percentileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: colors.accentMuted,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  percentileText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  // Quiz Card
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quizIcon: {
    fontSize: 32,
  },
  quizInfo: {
    flex: 1,
    gap: 2,
  },
  quizTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  quizTrait: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
});
