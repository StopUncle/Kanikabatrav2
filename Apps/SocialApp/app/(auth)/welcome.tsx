import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, ChevronRight, Sparkles } from 'lucide-react-native';
import { GradientButton } from '../../components/ui/GradientButton';
import { useAuthStore } from '../../stores/authStore';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, gradients } from '../../lib/theme';

export default function WelcomeScreen() {
  const { continueAsGuest, markWelcomeSeen } = useAuthStore();

  const handleBeginAssessment = () => {
    haptics.medium();
    continueAsGuest();
    markWelcomeSeen();
    router.replace('/(quiz)/dark-triad');
  };

  const handleSignIn = () => {
    haptics.light();
    markWelcomeSeen();
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(201, 169, 97, 0.08)', 'rgba(10, 10, 10, 1)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />

      <View style={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={gradients.goldVertical}
            style={styles.iconGradient}
          >
            <Eye size={48} color={colors.background} strokeWidth={1.5} />
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={styles.title}>The Dark Mirror</Text>
        <Text style={styles.subtitle}>See what others miss</Text>

        {/* Value Prop */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Sparkles size={16} color={colors.accent} strokeWidth={2} />
            <Text style={styles.featureText}>Discover your psychological profile</Text>
          </View>
          <View style={styles.featureItem}>
            <Sparkles size={16} color={colors.accent} strokeWidth={2} />
            <Text style={styles.featureText}>Understand manipulation tactics</Text>
          </View>
          <View style={styles.featureItem}>
            <Sparkles size={16} color={colors.accent} strokeWidth={2} />
            <Text style={styles.featureText}>Master the psychology of power</Text>
          </View>
        </View>

        {/* Main CTA */}
        <View style={styles.ctaContainer}>
          <GradientButton
            title="Begin Assessment"
            onPress={handleBeginAssessment}
            icon={<ChevronRight size={20} color={colors.background} strokeWidth={2.5} />}
            glow
            fullWidth
          />
          <Text style={styles.ctaSubtext}>
            27 questions • 8 minutes • No signup required
          </Text>
        </View>

        {/* Secondary CTA */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={handleSignIn}>
            <Text style={styles.link}>Sign In</Text>
          </Pressable>
        </View>
      </View>

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>
        For educational purposes only. Not a clinical diagnostic tool.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.lg,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  features: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  ctaSubtext: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  link: {
    fontSize: typography.md,
    color: colors.accent,
    fontWeight: typography.semibold,
  },
  disclaimer: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
});
